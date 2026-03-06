'use client';

import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
    Tooltip
} from 'recharts';

const data = [
    { subject: 'Frontend (React/Next.js)', A: 95, fullMark: 100 },
    { subject: 'Backend (Node.js)', A: 85, fullMark: 100 },
    { subject: 'Database (SQL/NoSQL)', A: 80, fullMark: 100 },
    { subject: '3D/WebGL', A: 75, fullMark: 100 },
    { subject: 'DevOps & CI/CD', A: 70, fullMark: 100 },
    { subject: 'AI Integration', A: 85, fullMark: 100 },
];

export default function SkillChart() {
    return (
        <div className="w-full max-w-3xl mx-auto h-[500px] glass rounded-3xl p-6 mt-10">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                    <PolarGrid stroke="#333" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#aaa', fontSize: 14 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar
                        name="Skill Level"
                        dataKey="A"
                        stroke="#818cf8"
                        fill="#818cf8"
                        fillOpacity={0.4}
                    />
                    <Tooltip
                        contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid #333', borderRadius: '8px' }}
                        itemStyle={{ color: '#818cf8' }}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
}
