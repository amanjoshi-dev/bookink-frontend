'use client';
/**
 * LineChart — Chart.js wrapper for Next.js
 *
 * Fixes:
 *  - Destroys any previous chart instance before creating a new one
 *  - Cleans up on unmount (prevents "Canvas is already in use / Chart with ID '0'..." error)
 *  - Uses dynamic import to avoid SSR
 *
 * Props:
 *  - labels: string[]          → x-axis labels
 *  - series: number[]          → y values
 *  - height: number            → canvas height in px (default 280)
 *  - datasetLabel: string      → legend label (default 'Traffic')
 */
import { useEffect, useRef } from 'react';

export default function LineChart({
  labels = [],
  series = [],
  height = 280,
  datasetLabel = 'Traffic',
}) {
  const canvasRef = useRef(null); // <canvas> element
  const chartRef = useRef(null);  // Chart.js instance

  useEffect(() => {
    let disposed = false;

    (async () => {
      // Lazy-load Chart.js in the client only
      const { default: ChartJS } = await import('chart.js/auto');
      if (disposed) return;

      // Destroy a previously created chart bound to this canvas
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }

      const ctx = canvasRef.current?.getContext('2d');
      if (!ctx) return;

      chartRef.current = new ChartJS(ctx, {
        type: 'line',
        data: {
          labels,
          datasets: [
            {
              label: datasetLabel,
              data: series,
              tension: 0.35,
              fill: false,
              // Let Chart.js pick default colors; your theme can override via CSS vars if needed
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false }, // Hide legend to match Playbook vibe
            tooltip: { mode: 'index', intersect: false },
          },
          interaction: { mode: 'nearest', intersect: false },
          scales: {
            x: { grid: { display: false } },
            y: { grid: { color: 'rgba(255,255,255,.08)' } },
          },
        },
      });
    })();

    // Cleanup on unmount or before next render
    return () => {
      disposed = true;
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
    // Using JSON-stringified deps prevents missed updates when arrays are recreated
  }, [JSON.stringify(labels), JSON.stringify(series), datasetLabel]);

  return (
    <div style={{ width: '100%', height }}>
      <canvas ref={canvasRef} />
    </div>
  );
}
