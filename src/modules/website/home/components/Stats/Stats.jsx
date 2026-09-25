import { useOnScreen } from '../../../../../hooks/useOnScreen';
import { useCounter } from '../../../../../hooks/useCounter';
import './Stats.css';

function StatCounterItem({ stat, isTriggered }) {
  // Extract numeric target and suffix
  const targetNumber =
    typeof stat.target === 'number'
      ? stat.target
      : parseInt(String(stat.value || '0').replace(/\D/g, ''), 10) || 0;

  const suffix =
    stat.suffix !== undefined
      ? stat.suffix
      : String(stat.value || '').replace(/[0-9]/g, '');

  const animatedValue = useCounter(targetNumber, isTriggered, 2200);

  return (
    <div className="stat-item">
      <div className="stat-number-wrap">
        <span className="stat-number">{animatedValue}</span>
        <span className="stat-suffix">{suffix}</span>
      </div>
      <div className="stat-label">{stat.label}</div>
      {stat.description && <p className="stat-description">{stat.description}</p>}
    </div>
  );
}

export default function Stats({ data }) {
  const [ref, isVisible] = useOnScreen({ threshold: 0.3 });
  const statsList = Array.isArray(data) ? data : data?.stats || [];

  return (
    <section
      ref={ref}
      className={`stats-section reveal-hidden ${
        isVisible ? 'reveal-visible' : ''
      }`}
      aria-label="Key Company Statistics"
    >
      <div className="container">
        <div className="stats-grid">
          {statsList.map((stat, idx) => (
            <StatCounterItem
              key={stat.id || idx}
              stat={stat}
              isTriggered={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
