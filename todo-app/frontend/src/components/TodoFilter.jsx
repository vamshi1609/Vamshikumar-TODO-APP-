/**
 * TodoFilter — three-button filter bar (All / Active / Completed)
 */
export default function TodoFilter({ filter, onFilterChange, total, completed }) {
  const buttons = [
    { label: 'All',       value: null  },
    { label: 'Active',    value: false },
    { label: 'Completed', value: true  },
  ];

  return (
    <div style={styles.wrapper}>
      <span style={styles.summary}>
        {total} todo{total !== 1 ? 's' : ''} · {completed} completed
      </span>

      <div style={styles.btnGroup}>
        {buttons.map(({ label, value }) => (
          <button
            key={label}
            onClick={() => onFilterChange(value)}
            style={{
              ...styles.btn,
              background: filter === value ? '#4f46e5' : '#f3f4f6',
              color: filter === value ? '#fff' : '#374151',
              fontWeight: filter === value ? 600 : 400,
            }}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    flexWrap: 'wrap',
    gap: 8,
  },
  summary: { fontSize: 14, color: '#6b7280' },
  btnGroup: { display: 'flex', gap: 6 },
  btn: {
    border: 'none',
    borderRadius: 6,
    padding: '7px 14px',
    cursor: 'pointer',
    fontSize: 14,
    transition: 'all 0.15s',
  },
};
