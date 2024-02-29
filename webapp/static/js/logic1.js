let url1 = '/api/v1.0/stock_data/close_price';

// Fetch data from the URL
d3.json(url1).then(function(response) {
    console.log(response)}
//     // Extract unique sectors
//     const sectors = [...new Set(response.map(entry => entry.Sector))];
    
//     // Populate dropdown menu with sectors
//     const dropdown = document.getElementById('selDataset');
//     sectors.forEach(sector => {
//         const option = document.createElement('option');
//         option.text = sector;
//         dropdown.add(option);
//     });

//     // Listen for changes in the dropdown menu
//     dropdown.addEventListener('change', function() {
//         const selectedSector = dropdown.value;
//         const filteredData = response.filter(entry => entry.Sector === selectedSector);

//         // Extract close prices for each industry within the selected sector
//         const industries = [...new Set(filteredData.map(entry => entry.Industry))];
//         const closePrices = industries.map(industry => {
//             return filteredData
//                 .filter(entry => entry.Industry === industry)
//                 .map(entry => entry.Close);
//         });

//         // Calculate the correlation matrix
//         const correlationMatrix = calculateCorrelationMatrix(closePrices);

//         // Plot heatmap using Plotly.js
//         plotHeatmap(industries, correlationMatrix);
//     });
// }).catch(function(error) {
//     console.error('Error fetching data:', error);
// });

// // Define the optionChanged function
// function optionChanged(selectedValue) {
//     // This function will be called when the dropdown selection changes
//     // console.log('Selected value:', selectedValue);
// }

// function calculateCorrelationMatrix(data) {
//     const correlationMatrix = [];
//     for (let i = 0; i < data.length; i++) {
//         const row = [];
//         for (let j = 0; j < data.length; j++) {
//             row.push(calculateCorrelation(data[i], data[j]));
//         }
//         correlationMatrix.push(row);
//     }
//     return correlationMatrix;
// }

// function calculateCorrelation(x, y) {
//     if (x.length !== y.length) {
//         throw new Error('Array lengths must match');
//     }

//     const n = x.length;

//     // Calculate means
//     const meanX = x.reduce((acc, val) => acc + val, 0) / n;
//     const meanY = y.reduce((acc, val) => acc + val, 0) / n;

//     // Calculate standard deviations
//     const stdDevX = Math.sqrt(x.reduce((acc, val) => acc + Math.pow(val - meanX, 2), 0) / n);
//     const stdDevY = Math.sqrt(y.reduce((acc, val) => acc + Math.pow(val - meanY, 2), 0) / n);

//     // Calculate covariance
//     const covariance = x.reduce((acc, val, i) => acc + ((val - meanX) * (y[i] - meanY)), 0) / n;

//     // Calculate correlation
//     const correlation = covariance / (stdDevX * stdDevY);

//     return correlation;
// }

// function plotHeatmap(labels, correlationMatrix) {
//     const data = [{
//         z: correlationMatrix,
//         x: labels,
//         y: labels,
//         type: 'heatmap'
//     }];

//     const layout = {
//         title: 'Correlation Heatmap',
//         xaxis: { title: 'Industries' },
//         yaxis: { title: 'Industries' }
//     };

//     Plotly.newPlot('heatmap', data, layout);
)