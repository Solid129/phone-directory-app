import React from 'react';
import { Line } from 'react-chartjs-2';

const LineGraph = (props) => {
  let labels = [];
  const datasets = [
    {
      label: 'Views in Last Seven Days',
      fill: false,
      lineTension: 0.5,
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: []
    }
  ]

  props.sevenDaysViews.sort((a, b) => a._id - b._id);
  props.sevenDaysViews.map(v => {
    const date = String(v._id)
    labels.push(date.slice(6, 8) + "/" + date.slice(4, 6));
    datasets[0].data.push(v.views)
  })

  const data = { labels, datasets }

  return (
    <div>
      <Line
        data={data}
        options={{
          title: {
            display: true,
            text: 'Views In Last Seven Days',
            fontSize: 20
          },
          legend: {
            display: true,
            position: 'right'
          }
        }}
      />
    </div>
  )
}

export default LineGraph;