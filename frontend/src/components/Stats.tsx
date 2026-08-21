import type { Statistics } from '../types';

export const Stats = ({ stats }: { stats: Statistics | null }) => {
  if (!stats) return null;

  return (
    <div className="stats">
      <div className="stat-box">
        <span className="stat-value">{stats.total}</span>
        <span className="stat-label">Total students</span>
      </div>
      {stats.byGroup.map((g) => (
        <div className="stat-box" key={g.group}>
          <span className="stat-value">{g.total}</span>
          <span className="stat-label">Group {g.group}</span>
        </div>
      ))}
    </div>
  );
};