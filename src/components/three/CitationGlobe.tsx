import React, { useMemo, useRef, useState, useEffect, Component, ReactNode } from 'react';
import { Canvas, useFrame, ThreeEvent } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import { feature } from 'topojson-client';
import type { Topology, GeometryCollection } from 'topojson-specification';
import type { Feature, FeatureCollection } from 'geojson';
import countriesTopo from 'world-atlas/countries-110m.json';
import { useReducedMotion } from 'framer-motion';
import type { CitationLocation } from '@/types/citations';

const GLOBE_RADIUS = 1.9;
const DOT_COUNT = 1500;
const HUB = { lat: 40.7128, lng: -74.006 }; // New York — arcs converge on the researcher's home base
const ARC_COUNT = 40; // arcs for the top-N locations by citation count

function latLngToVec3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

/** Country border line segments projected onto the sphere (with chord subdivision). */
function buildCountryBorders(): Float32Array {
  const topo = countriesTopo as unknown as Topology;
  const geo = feature(topo, topo.objects.countries as GeometryCollection) as Feature | FeatureCollection;
  const R = GLOBE_RADIUS * 1.002;
  const verts: number[] = [];

  const pushSegment = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    // Subdivide long chords so they hug the sphere surface
    const steps = Math.max(1, Math.ceil(Math.max(Math.abs(lng2 - lng1), Math.abs(lat2 - lat1)) / 2.5));
    let prev = latLngToVec3(lat1, lng1, R);
    for (let s = 1; s <= steps; s++) {
      const t = s / steps;
      const next = latLngToVec3(lat1 + (lat2 - lat1) * t, lng1 + (lng2 - lng1) * t, R);
      verts.push(prev.x, prev.y, prev.z, next.x, next.y, next.z);
      prev = next;
    }
  };

  const features = geo.type === 'FeatureCollection' ? geo.features : [geo];
  for (const f of features) {
    const geom = f.geometry;
    if (!geom) continue;
    const polys =
      geom.type === 'Polygon'
        ? [geom.coordinates]
        : geom.type === 'MultiPolygon'
          ? geom.coordinates
          : [];
    for (const poly of polys) {
      for (const ring of poly) {
        for (let i = 0; i < ring.length - 1; i++) {
          const [lng1, lat1] = ring[i];
          const [lng2, lat2] = ring[i + 1];
          // Skip anti-meridian jumps
          if (Math.abs(lng1 - lng2) > 180) continue;
          pushSegment(lat1, lng1, lat2, lng2);
        }
      }
    }
  }

  return new Float32Array(verts);
}

/** Glowing country outlines so markers have geographic context. */
const CountryBorders: React.FC = () => {
  const positions = useMemo(buildCountryBorders, []);

  return (
    <lineSegments>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <lineBasicMaterial
        color="#4CE084"
        transparent
        opacity={0.6}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  );
};

/** Stylized dotted globe surface (fibonacci lattice). */
const GlobeDots: React.FC = () => {
  const positions = useMemo(() => {
    const arr = new Float32Array(DOT_COUNT * 3);
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < DOT_COUNT; i++) {
      const y = 1 - (i / (DOT_COUNT - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = goldenAngle * i;
      arr[i * 3] = Math.cos(theta) * radiusAtY * GLOBE_RADIUS;
      arr[i * 3 + 1] = y * GLOBE_RADIUS;
      arr[i * 3 + 2] = Math.sin(theta) * radiusAtY * GLOBE_RADIUS;
    }
    return arr;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#33CC66"
        size={0.022}
        sizeAttenuation
        transparent
        opacity={0.22}
        depthWrite={false}
      />
    </points>
  );
};

interface MarkerProps {
  location: CitationLocation;
  maxCount: number;
  onSelect?: (location: CitationLocation) => void;
}

const LocationMarker: React.FC<MarkerProps> = ({ location, maxCount, onSelect }) => {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null);

  const position = useMemo(
    () => latLngToVec3(location.latitude, location.longitude, GLOBE_RADIUS),
    [location.latitude, location.longitude]
  );

  // Scale marker area roughly with citation count
  const scale = 0.028 + 0.075 * Math.sqrt(location.count / maxCount);

  useFrame(({ clock }) => {
    const m = meshRef.current;
    if (!m) return;
    const pulse = hovered ? 1.5 : 1 + Math.sin(clock.elapsedTime * 2.2 + position.x * 5) * 0.14;
    m.scale.setScalar(pulse);
  });

  const handleOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHovered(true);
    document.body.style.cursor = 'pointer';
  };

  const handleOut = () => {
    setHovered(false);
    document.body.style.cursor = 'auto';
  };

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        scale={scale / 0.05}
        onPointerOver={handleOver}
        onPointerOut={handleOut}
        onClick={(e) => {
          e.stopPropagation();
          onSelect?.(location);
        }}
      >
        <sphereGeometry args={[0.05, 14, 14]} />
        <meshBasicMaterial color={hovered ? '#A7F3C7' : '#5CE68A'} toneMapped={false} />
      </mesh>
      {/* Halo */}
      <mesh scale={(scale / 0.05) * 1.55}>
        <sphereGeometry args={[0.05, 12, 12]} />
        <meshBasicMaterial color="#33CC66" transparent opacity={hovered ? 0.3 : 0.09} depthWrite={false} />
      </mesh>
      {hovered && (
        <Html distanceFactor={9} position={[0, 0.16, 0]} center zIndexRange={[100, 0]}>
          <div className="pointer-events-none whitespace-nowrap rounded-md border border-cyber-green/40 bg-cyber-darker/95 px-3 py-2 shadow-glow">
            <div className="text-xs font-semibold text-white">
              {location.city ? `${location.city}, ` : ''}{location.country}
            </div>
            <div className="text-[11px] font-mono text-cyber-green">
              {location.count} citation{location.count === 1 ? '' : 's'}
            </div>
          </div>
        </Html>
      )}
    </group>
  );
};

/** Animated arc from a citation location to the hub, drawn in with a stagger. */
const CitationArc: React.FC<{ from: THREE.Vector3; delay: number }> = ({ from, delay }) => {
  const line = useMemo(() => {
    const to = latLngToVec3(HUB.lat, HUB.lng, GLOBE_RADIUS);
    const distance = from.distanceTo(to);
    const mid = from
      .clone()
      .add(to)
      .multiplyScalar(0.5)
      .normalize()
      .multiplyScalar(GLOBE_RADIUS + 0.22 + distance * 0.3);
    const curve = new THREE.QuadraticBezierCurve3(from, mid, to);
    const points = curve.getPoints(56);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
      color: '#5CE68A',
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    geometry.setDrawRange(0, 0);
    return new THREE.Line(geometry, material);
  }, [from]);

  useFrame(({ clock }) => {
    const progress = THREE.MathUtils.clamp((clock.elapsedTime - delay) / 1.6, 0, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    line.geometry.setDrawRange(0, Math.floor(eased * 57));
  });

  useEffect(() => () => {
    line.geometry.dispose();
    (line.material as THREE.Material).dispose();
  }, [line]);

  return <primitive object={line} />;
};

const GlobeGroup: React.FC<{
  locations: CitationLocation[];
  autoRotate: boolean;
  onSelect?: (location: CitationLocation) => void;
}> = ({ locations, autoRotate, onSelect }) => {
  const group = useRef<THREE.Group>(null);
  const maxCount = useMemo(
    () => Math.max(1, ...locations.map((l) => l.count)),
    [locations]
  );

  const arcOrigins = useMemo(
    () =>
      [...locations]
        .sort((a, b) => b.count - a.count)
        .slice(0, ARC_COUNT)
        .map((l) => latLngToVec3(l.latitude, l.longitude, GLOBE_RADIUS * 1.01)),
    [locations]
  );

  useFrame((_, delta) => {
    if (group.current && autoRotate) {
      group.current.rotation.y += delta * 0.12;
    }
  });

  return (
    <group ref={group} rotation={[0.28, 0, 0]}>
      <GlobeDots />
      <CountryBorders />
      {arcOrigins.map((origin, i) => (
        <CitationArc key={i} from={origin} delay={0.4 + i * 0.06} />
      ))}
      {/* Inner occlusion sphere so back-face dots are hidden */}
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS * 0.985, 48, 48]} />
        <meshBasicMaterial color="#0A0A0A" transparent opacity={0.92} />
      </mesh>
      {/* Atmosphere glow */}
      <mesh scale={1.08}>
        <sphereGeometry args={[GLOBE_RADIUS, 48, 48]} />
        <meshBasicMaterial
          color="#33CC66"
          transparent
          opacity={0.045}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>
      {locations.map((loc, i) => (
        <LocationMarker key={`${loc.city}-${loc.country}-${i}`} location={loc} maxCount={maxCount} onSelect={onSelect} />
      ))}
    </group>
  );
};

/** Error boundary so a WebGL failure degrades gracefully. */
class GlobeBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (this.state.failed) return this.props.fallback;
    return this.props.children;
  }
}

interface CitationGlobeProps {
  locations: CitationLocation[];
  height?: number;
  fallback?: ReactNode;
  onSelectLocation?: (location: CitationLocation) => void;
}

/** Interactive 3D globe of citation locations. Drag to orbit; hover/click markers for details. */
const CitationGlobe: React.FC<CitationGlobeProps> = ({
  locations,
  height = 560,
  fallback = null,
  onSelectLocation,
}) => {
  const reduceMotion = useReducedMotion();

  return (
    <GlobeBoundary fallback={fallback}>
      <div
        className="relative w-full overflow-hidden rounded-xl border border-cyber-green/20 bg-cyber-darker"
        style={{ height }}
      >
        <Canvas
          dpr={[1, 1.75]}
          camera={{ position: [0, 0.4, 5.1], fov: 45 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        >
          <ambientLight intensity={0.6} />
          <GlobeGroup locations={locations} autoRotate={!reduceMotion} onSelect={onSelectLocation} />
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            enableDamping
            dampingFactor={0.08}
            rotateSpeed={0.5}
          />
        </Canvas>
        <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-cyber-green/25 bg-cyber-darker/80 px-4 py-1.5 backdrop-blur-sm">
          <span className="font-mono text-[11px] tracking-wider text-cyber-green/80">
            drag to orbit · hover a marker · click for papers
          </span>
        </div>
      </div>
    </GlobeBoundary>
  );
};

export default CitationGlobe;
