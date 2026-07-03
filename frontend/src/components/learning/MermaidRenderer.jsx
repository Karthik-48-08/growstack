import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

/**
 * Renders a Mermaid diagram source as SVG.
 * Uses a stable per-instance ID so React doesn't get confused when the
 * diagram remounts (mermaid mutates the DOM directly).
 *
 * Theme is forced to dark to match the rest of the GrowStack UI; can be
 * flipped to 'default' for light mode by checking a context prop.
 */
export default function MermaidRenderer({ source, id }) {
  const containerRef = useRef(null);
  const [svg, setSvg] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!source) return;

    // Unique-ish id scoped per instance + source-hash so we re-render on change
    const safeId = `mermaid-${id || Math.random().toString(36).slice(2, 10)}`;

    let cancelled = false;
    try {
      mermaid.initialize({
        startOnLoad: false,
        theme: 'dark',
        securityLevel: 'loose',
        fontFamily: 'inherit',
        themeVariables: {
          background: '#0b0b0b',
          primaryColor: '#1f1f1f',
          primaryTextColor: '#fff',
          primaryBorderColor: '#ff6b00',
          lineColor: '#00d4ff',
          secondaryColor: '#1a1a1a',
          tertiaryColor: '#101010',
        },
      });

      mermaid
        .render(safeId, source.trim())
        .then(({ svg }) => {
          if (!cancelled) {
            setSvg(svg);
            setError(null);
          }
        })
        .catch((err) => {
          if (!cancelled) setError(err.message || 'Failed to render diagram');
        });
    } catch (e) {
      if (!cancelled) setError(e.message);
    }

    return () => {
      cancelled = true;
    };
  }, [source, id]);

  if (error) {
    return (
      <div className="my-4 p-4 border border-red-500/40 bg-red-500/10 rounded-lg text-sm text-red-300">
        <p className="font-semibold mb-2">Diagram error</p>
        <pre className="whitespace-pre-wrap text-xs">{error}</pre>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="my-6 p-4 bg-black/40 border border-white/10 rounded-xl overflow-x-auto flex justify-center"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
