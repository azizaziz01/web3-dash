'use client';

import React from 'react';
import Plotly from 'plotly.js-dist-min';
import createPlotlyComponent from 'react-plotly.js/factory';

const Plot = createPlotlyComponent(Plotly);

interface VolumeChartProps {
  data: any[];
}

export default function VolumeChart({ data }: VolumeChartProps) {
  const [revision, setRevision] = React.useState(0);
  
  React.useEffect(() => {
    setRevision(prev => prev + 1);
  }, [data]);

  const x = data.map(d => d.name);
  const y = data.map(d => d.volume);

  return (
    <Plot
      revision={revision}
      data={[
        {
          x: x,
          y: y,
          type: 'bar',
          marker: {
            color: '#00e676'
          }
        }
      ]}
      layout={{
        autosize: true,
        margin: { t: 10, b: 30, l: 40, r: 10 },
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent',
        xaxis: {
          showgrid: false,
          color: '#707a8a',
          tickfont: { size: 12 }
        },
        yaxis: {
          showgrid: true,
          gridcolor: '#23282e',
          color: '#707a8a',
          tickfont: { size: 12 }
        },
        transition: {
          duration: 500,
          easing: 'cubic-in-out'
        },
        uirevision: 'true'
      }}
      useResizeHandler={true}
      style={{ width: '100%', height: '100%' }}
      config={{ displayModeBar: false }}
    />
  );
}
