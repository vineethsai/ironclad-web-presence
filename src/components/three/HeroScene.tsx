import React, { useMemo, useRef, useEffect, Component, ReactNode } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useReducedMotion } from 'framer-motion';

const NODE_COUNT = 130;
const RADIUS = 2.1;
const LINK_DISTANCE = 0.85;
const REPEL_RADIUS = 1.0;
const REPEL_STRENGTH = 0.5;

interface NetworkData {
  nodePositions: Float32Array;
  linePositions: Float32Array;
  pairs: Array<[number, number]>;
}

/** Random nodes in a spherical shell + line segments linking near neighbours. */
function buildNetwork(): NetworkData {
  const nodes: THREE.Vector3[] = [];

  for (let i = 0; i < NODE_COUNT; i++) {
    const u = Math.random();
    const v = Math.random();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);
    const r = RADIUS * (0.55 + Math.random() * 0.45);
    nodes.push(
      new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      )
    );
  }

  const nodePositions = new Float32Array(NODE_COUNT * 3);
  nodes.forEach((n, i) => {
    nodePositions[i * 3] = n.x;
    nodePositions[i * 3 + 1] = n.y;
    nodePositions[i * 3 + 2] = n.z;
  });

  const lineVerts: number[] = [];
  const pairs: Array<[number, number]> = [];
  for (let i = 0; i < NODE_COUNT; i++) {
    for (let j = i + 1; j < NODE_COUNT; j++) {
      if (nodes[i].distanceTo(nodes[j]) < LINK_DISTANCE) {
        pairs.push([i, j]);
        lineVerts.push(nodes[i].x, nodes[i].y, nodes[i].z, nodes[j].x, nodes[j].y, nodes[j].z);
      }
    }
  }

  return { nodePositions, linePositions: new Float32Array(lineVerts), pairs };
}

type MouseRef = React.MutableRefObject<{ x: number; y: number; active: boolean }>;

const NetworkMesh: React.FC<{ reduceMotion: boolean; mouse: MouseRef }> = ({ reduceMotion, mouse }) => {
  const group = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const { nodePositions, linePositions, pairs } = useMemo(buildNetwork, []);

  // Current (animated) node positions — eased toward base ± cursor repulsion
  const current = useMemo(() => new Float32Array(nodePositions), [nodePositions]);
  const scratchLinePositions = useMemo(() => new Float32Array(linePositions), [linePositions]);
  const mouseWorld = useMemo(() => new THREE.Vector3(), []);
  const unprojectVec = useMemo(() => new THREE.Vector3(), []);
  const nodeVec = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;

    // Shrink the network on narrow/portrait viewports so it never overflows
    const targetScale = THREE.MathUtils.clamp(state.viewport.aspect * 1.05, 0.5, 1);
    g.scale.setScalar(THREE.MathUtils.lerp(g.scale.x, targetScale, 0.08));

    if (!reduceMotion) {
      g.rotation.y += delta * 0.06;
      const targetX = mouse.current.y * 0.18;
      const targetZ = mouse.current.x * 0.12;
      g.rotation.x += (targetX - g.rotation.x) * 0.04;
      g.rotation.z += (targetZ - g.rotation.z) * 0.04;
    }

    // Cursor repulsion — unproject pointer to the z=0 plane, then into group-local space
    if (!reduceMotion && mouse.current.active && pointsRef.current && linesRef.current) {
      unprojectVec.set(mouse.current.x, mouse.current.y, 0.5).unproject(state.camera);
      const dir = unprojectVec.sub(state.camera.position).normalize();
      const dist = -state.camera.position.z / dir.z;
      mouseWorld.copy(state.camera.position).addScaledVector(dir, dist);
      g.worldToLocal(mouseWorld);

      for (let i = 0; i < NODE_COUNT; i++) {
        const bx = nodePositions[i * 3];
        const by = nodePositions[i * 3 + 1];
        const bz = nodePositions[i * 3 + 2];

        nodeVec.set(bx, by, bz).sub(mouseWorld);
        const d = nodeVec.length();
        let tx = bx, ty = by, tz = bz;
        if (d < REPEL_RADIUS && d > 0.0001) {
          const falloff = 1 - d / REPEL_RADIUS;
          const push = REPEL_STRENGTH * falloff * falloff;
          nodeVec.normalize().multiplyScalar(push);
          tx = bx + nodeVec.x;
          ty = by + nodeVec.y;
          tz = bz + nodeVec.z;
        }

        // Ease current toward target
        current[i * 3] += (tx - current[i * 3]) * 0.09;
        current[i * 3 + 1] += (ty - current[i * 3 + 1]) * 0.09;
        current[i * 3 + 2] += (tz - current[i * 3 + 2]) * 0.09;
      }

      // Rebuild line positions from animated node positions
      for (let p = 0; p < pairs.length; p++) {
        const [a, b] = pairs[p];
        scratchLinePositions[p * 6] = current[a * 3];
        scratchLinePositions[p * 6 + 1] = current[a * 3 + 1];
        scratchLinePositions[p * 6 + 2] = current[a * 3 + 2];
        scratchLinePositions[p * 6 + 3] = current[b * 3];
        scratchLinePositions[p * 6 + 4] = current[b * 3 + 1];
        scratchLinePositions[p * 6 + 5] = current[b * 3 + 2];
      }

      const pointsGeo = pointsRef.current.geometry;
      (pointsGeo.attributes.position as THREE.BufferAttribute).copyArray(current);
      pointsGeo.attributes.position.needsUpdate = true;

      const linesGeo = linesRef.current.geometry;
      (linesGeo.attributes.position as THREE.BufferAttribute).copyArray(scratchLinePositions);
      linesGeo.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group ref={group}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nodePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color="#5CE68A"
          size={0.045}
          sizeAttenuation
          transparent
          opacity={0.9}
          depthWrite={false}
        />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#33CC66" transparent opacity={0.16} depthWrite={false} />
      </lineSegments>
    </group>
  );
};

/** Sparse drifting dust for depth. */
const DustField: React.FC = () => {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(320 * 3);
    for (let i = 0; i < 320; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6 - 2;
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.012;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#33CC66"
        size={0.02}
        sizeAttenuation
        transparent
        opacity={0.45}
        depthWrite={false}
      />
    </points>
  );
};

/** Error boundary so a WebGL failure degrades to the static grid backdrop. */
class SceneBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (this.state.failed) return this.props.fallback;
    return this.props.children;
  }
}

const StaticFallback: React.FC = () => (
  <div className="absolute inset-0 z-0" aria-hidden>
    <div className="absolute inset-0 bg-grid opacity-60" />
    <div className="glow-blob w-[40rem] h-[40rem] top-1/4 left-1/2 -translate-x-1/2" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,#0A0A0A_92%)]" />
  </div>
);

/** Full-viewport 3D hero background: rotating particle network sphere that reacts to the cursor. */
const HeroScene: React.FC = () => {
  const reduceMotion = useReducedMotion();
  const mouse = useRef({ x: 0, y: 0, active: false });

  // Track on window: the vignette overlay above the canvas swallows canvas-level pointer events
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouse.current.active = true;
    };
    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <SceneBoundary fallback={<StaticFallback />}>
      <div className="absolute inset-0 z-0" aria-hidden>
        <Canvas
          dpr={[1, 1.75]}
          camera={{ position: [0, 0, 5.4], fov: 48 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        >
          <NetworkMesh reduceMotion={!!reduceMotion} mouse={mouse} />
          <DustField />
        </Canvas>
        {/* Soft vignette so text stays readable */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,#0A0A0A_92%)]" />
      </div>
    </SceneBoundary>
  );
};

export default HeroScene;
