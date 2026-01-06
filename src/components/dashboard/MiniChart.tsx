'use client';

import React from 'react';
import Plotly from 'plotly.js-dist-min';
import createPlotlyComponent from 'react-plotly.js/factory';

const Plot = createPlotlyComponent(Plotly);

export interface MiniChartProps {
  color: string;
  data: number[];
}

export default function MiniChart({ color, data }: MiniChartProps) {
  return (
    <Plot
      data={[
        {
          y: data,
          type: 'scatter',
          mode: 'lines',
          line: {
            color: color,
            width: 2,
            shape: 'spline'
          },
          fill: 'tozeroy',
          fillcolor: `${color}15`, // Add 15 for transparency in hex
          hoverinfo: 'none',
        }
      ]}
      layout={{
        autosize: true,
        margin: { t: 0, b: 0, l: 0, r: 0 },
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent',
        xaxis: { visible: false, fixedrange: true },
        yaxis: { visible: false, fixedrange: true },
        showlegend: false,
      }}
      useResizeHandler={true}
      style={{ width: '100%', height: '100%' }}
      config={{ displayModeBar: false, staticPlot: true }}
    />
  );
}
