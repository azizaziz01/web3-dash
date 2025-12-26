'use client';

import React from 'react';
import Plotly from 'plotly.js-dist-min';
import createPlotlyComponent from 'react-plotly.js/factory';

const Plot = createPlotlyComponent(Plotly);

interface TradeChartProps {
  data: {
    x: string[];
    open: number[];
    high: number[];
    low: number[];
    close: number[];
  };
}

export default function TradeChart({ data }: TradeChartProps) {
  const [revision, setRevision] = React.useState(0);
  
  React.useEffect(() => {
    setRevision(prev => prev + 1);
  }, [data]);

  return (
    <Plot
      revision={revision}
      data={[
        {
          x: data.x,
          open: data.open,
          high: data.high,
          low: data.low,
          close: data.close,
          type: 'candlestick',
          xaxis: 'x',
          yaxis: 'y',
          increasing: { line: { color: '#00c087' } },
          decreasing: { line: { color: '#ff3b69' } },
        }
      ]}

      layout={{
        dragmode: 'zoom',
        showlegend: false,
        xaxis: {
          rangeslider: { visible: false },
          type: 'date',
          color: '#707a8a',
          gridcolor: '#23282e',
        },
        yaxis: {
          autorange: true,
          color: '#707a8a',
          gridcolor: '#23282e',
          side: 'right'
        },
        margin: { t: 10, b: 30, l: 10, r: 50 },
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent',
        autosize: true,
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
