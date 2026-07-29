import React from 'react';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
} from 'recharts';

const data = [
  { domain: 'AI/ML Security', level: 95 },
  { domain: 'Threat Modeling', level: 90 },
  { domain: 'Vulnerability Mgmt', level: 92 },
  { domain: 'Cloud Security', level: 88 },
  { domain: 'AppSec', level: 85 },
  { domain: 'Malware Analysis', level: 80 },
];

const tooltipStyle = {
  backgroundColor: '#111111',
  border: '1px solid rgba(51, 204, 102, 0.35)',
  borderRadius: '8px',
  color: '#fff',
  fontSize: '13px',
};

/** Security-domain radar visualization. Lazy-loaded (recharts stays out of the main bundle). */
const SkillsRadar: React.FC = () => {
  return (
    <div className="h-[340px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} cx="50%" cy="50%" outerRadius="72%">
          <PolarGrid stroke="rgba(51, 204, 102, 0.15)" />
          <PolarAngleAxis
            dataKey="domain"
            tick={{ fill: '#D1D5DB', fontSize: 11.5 }}
          />
          <PolarRadiusAxis
            domain={[0, 100]}
            tick={false}
            axisLine={false}
          />
          <Radar
            name="Proficiency"
            dataKey="level"
            stroke="#33CC66"
            fill="#33CC66"
            fillOpacity={0.22}
            strokeWidth={2}
            dot={{ r: 3, fill: '#5CE68A', strokeWidth: 0 }}
            isAnimationActive
            animationDuration={900}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            formatter={(value: number) => [`${value}%`, 'Proficiency']}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SkillsRadar;
