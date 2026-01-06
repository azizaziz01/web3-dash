'use client';

import React from 'react';
import Plotly from 'plotly.js-dist-min';
import createPlotlyComponent from 'react-plotly.js/factory';

const Plot = createPlotlyComponent(Plotly);

export interface WalletChartProps {
  data: any[];
}

export default function WalletChart({ data }: WalletChartProps) {
  const [revision, setRevision] = React.useState(0);
  
  React.useEffect(() => {
    setRevision(prev => prev + 1);
  }, [data]);

  const x = data.map(d => d.time);
  const y = data.map(d => d.value);

  return (
    <Plot
      revision={revision}
      data={[
        {
          x: x,
          y: y,
          type: 'scatter',
          mode: 'lines',
          fill: 'tozeroy',
          line: {
            color: '#00e676',
            width: 2,
            shape: 'spline'
          },
          fillcolor: 'rgba(0, 230, 118, 0.1)',
          hoverinfo: 'y',
        }
      ]}

      layout={{
        autosize: true,
        margin: { t: 0, b: 30, l: 0, r: 0 },
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent',
        xaxis: {
          showgrid: false,
          zeroline: false,
          color: '#707a8a',
          tickfont: { size: 10 }
        },
        yaxis: {
          showgrid: true,
          gridcolor: '#23282e',
          zeroline: false,
          showticklabels: false
        },
        hovermode: 'x unified',
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
