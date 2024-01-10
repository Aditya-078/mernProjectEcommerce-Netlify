import React  from 'react';
import './Chart.css';

const Chart = ({ chartId, height, width }) => {
  

 
  

  return (
    <div className="chart-container">
      <br />
      <br />
      <h1 className='heading'>Mongo Charts Analytics</h1>
      <iframe
        className="chart-iframe"
        src="https://charts.mongodb.com/charts-mern_ecommerce-uzchv/embed/dashboards?id=6560919e-2bce-4c90-89ca-e177b0cadf71&theme=dark&autoRefresh=true&maxDataAge=3600&showTitleAndDesc=false&scalingWidth=fixed&scalingHeight=fixed"
        title="MongoDB Charts"
      ></iframe>
    </div>
  );
};

export default Chart;
