export default function PathTracingDiagram() {
  const scatterLines = [
    { x2: 80, y2: 150 },
    { x2: 130, y2: 100 },
    { x2: 220, y2: 120 },
    { x2: 270, y2: 170 },
    { x2: 90, y2: 310 },
    { x2: 60, y2: 240 },
  ];

  return (
    <figure className="path-tracing-diagram" aria-label="A simplified path tracing diagram">
      <svg viewBox="0 0 400 400" role="img" aria-hidden="true">
        <defs>
          <marker id="path-tracing-arrow-primary" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent)" />
          </marker>
          <marker id="path-tracing-arrow-scatter" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--text-subtle)" />
          </marker>
        </defs>

        <polygon
          points="200,260 340,320 200,380 60,320"
          fill="none"
          stroke="var(--border-strong)"
          strokeWidth="1.5"
          strokeDasharray="8 4"
        />

        <polygon
          points="200,140 269,180 200,220 131,180"
          fill="var(--surface-strong)"
          stroke="var(--text)"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <polygon
          points="200,220 269,180 269,260 200,300"
          fill="var(--surface-tint)"
          stroke="var(--text)"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <polygon
          points="131,180 200,220 200,300 131,260"
          fill="var(--bg-alt)"
          stroke="var(--text)"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        <g className="path-tracing-diagram__scatter" opacity="0.9">
          {scatterLines.map((line, index) => (
            <line
              key={`line-${line.x2}-${line.y2}`}
              className={`path-tracing-diagram__scatter-line path-tracing-diagram__scatter-line--${index + 1}`}
              x1="165"
              y1="240"
              x2={line.x2}
              y2={line.y2}
              pathLength="1"
              stroke="var(--text-subtle)"
              strokeWidth="1.5"
              markerEnd="url(#path-tracing-arrow-scatter)"
            />
          ))}
        </g>

        <line
          className="path-tracing-diagram__primary-ray"
          x1="75"
          y1="95"
          x2="162"
          y2="236"
          pathLength="1"
          stroke="var(--accent)"
          strokeWidth="2.5"
        />
        <path
          className="path-tracing-diagram__primary-arrowhead"
          d="M 162 236 L 152.9 229.8 L 160.6 225.1 z"
          fill="var(--accent)"
        />
        <circle className="path-tracing-diagram__impact" cx="165" cy="240" r="4.5" fill="var(--accent)" />

        <g>
          <line x1="70" y1="65" x2="70" y2="75" stroke="var(--text)" strokeWidth="1.5" />
          <line x1="70" y1="105" x2="70" y2="115" stroke="var(--text)" strokeWidth="1.5" />
          <line x1="45" y1="90" x2="55" y2="90" stroke="var(--text)" strokeWidth="1.5" />
          <line x1="85" y1="90" x2="95" y2="90" stroke="var(--text)" strokeWidth="1.5" />
          <line x1="52" y1="72" x2="59" y2="79" stroke="var(--text)" strokeWidth="1.5" />
          <line x1="88" y1="108" x2="81" y2="101" stroke="var(--text)" strokeWidth="1.5" />
          <line x1="88" y1="72" x2="81" y2="79" stroke="var(--text)" strokeWidth="1.5" />
          <line x1="52" y1="108" x2="59" y2="101" stroke="var(--text)" strokeWidth="1.5" />
          <circle cx="70" cy="90" r="10" fill="var(--surface-strong)" stroke="var(--text)" strokeWidth="2" />
        </g>
      </svg>
      <figcaption>
        Single ray of light bouncing off a cube
      </figcaption>
    </figure>
  );
}
