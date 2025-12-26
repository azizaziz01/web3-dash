'use client';

import React from 'react';
import Plotly from 'plotly.js-dist-min';
import createPlotlyComponent from 'react-plotly.js/factory';

const Plot = createPlotlyComponent(Plotly);

interface AllocationChartProps {
  data: {
    labels: string[];
    values: number[];
    colors: string[];
  };
}

export default function AllocationChart({ data }: AllocationChartProps) {
  const [revision, setRevision] = React.useState(0);
  
  React.useEffect(() => {
    setRevision(prev => prev + 1);
  }, [data]);

  return (
    <Plot
      revision={revision}
      data={[
        {
          values: data.values,
          labels: data.labels,
          type: 'pie',
          hole: 0.7,
          marker: {
            colors: data.colors
          },
          textinfo: 'none',
          hoverinfo: 'label+percent',
          showlegend: false
        }
      ]}

      layout={{
        autosize: true,
        margin: { t: 0, b: 0, l: 0, r: 0 },
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent',
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
