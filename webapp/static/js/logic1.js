let url1 = '/api/v1.0/stock_data/close_price';

// Fetch data from the URL
d3.json(url1).then(function(response) {
    console.log(response);
    // Extract unique sectors
    const sectors = [...new Set(response.map(entry => entry.Sector))];
    
    // Populate dropdown menu with sectors
    const dropdown = document.getElementById('selDataset1');
    sectors.forEach(sector => {
        const option = document.createElement('option');
        option.text = sector;
        dropdown.add(option);
    });

    // Listen for changes in the dropdown menu
    dropdown.addEventListener('change', function() {
        plotHeatmapForSelectedSector(response);
    });

    // Call init function to show heatmap for the first option in dropdown
    init(response);
});


// Define the optionChanged function
function optionChanged(selectedValue) {
    // This function will be called when the dropdown selection changes
    // console.log('Selected value:', selectedValue);
}

// Initialize the visualization
function init(data) {
    // Get the first option in the dropdown
    const firstOption = document.getElementById('selDataset1').getElementsByTagName('option')[0].value;
    const filteredData = data.filter(entry => entry.Sector === firstOption);
    
    // Plot heatmap for the first option
    plotHeatmapForSelectedSector(filteredData);
}

// Plot heatmap for the selected sector
function plotHeatmapForSelectedSector(data) {
    const selectedSector = document.getElementById('selDataset1').value;
    const filteredData = data.filter(entry => entry.Sector === selectedSector);
    
    // Extract close prices for each industry within the selected sector
    const industries = [...new Set(filteredData.map(entry => entry.Industry))];
    const industryData = {};
    industries.forEach(industry => {
        industryData[industry] = [];
    });

    // Populate arrays with close prices for each industry
    filteredData.forEach(entry => {
        industryData[entry.Industry].push(entry.Close);
    });

    // Calculate the correlation matrix
    const correlationMatrix = calculateCorrelationMatrix(Object.values(industryData));

    // Plot heatmap using Plotly.js
    plotHeatmap(industries, correlationMatrix);
}

// Function to calculate correlation matrix
function calculateCorrelationMatrix(data) {
    const correlationMatrix = [];
    for (let i = 0; i < data.length; i++) {
        const row = [];
        for (let j = 0; j < data.length; j++) {
            row.push(calculateCorrelation(data[i], data[j]));
        }
        correlationMatrix.push(row);
    }
    return correlationMatrix;
}

// Function to calculate correlation coefficient
function calculateCorrelation(x, y) {
    const minLength = Math.min(x.length, y.length); // Get the minimum length

    // Take only the common elements up to the minimum length
    const xSlice = x.slice(0, minLength);
    const ySlice = y.slice(0, minLength);

    // Perform correlation calculation using the sliced arrays
    const n = minLength;
    const meanX = xSlice.reduce((acc, val) => acc + val, 0) / n;
    const meanY = ySlice.reduce((acc, val) => acc + val, 0) / n;

    const covariance = xSlice.reduce((acc, val, i) => acc + ((val - meanX) * (ySlice[i] - meanY)), 0) / n;
    const stdDevX = Math.sqrt(xSlice.reduce((acc, val) => acc + Math.pow(val - meanX, 2), 0) / n);
    const stdDevY = Math.sqrt(ySlice.reduce((acc, val) => acc + Math.pow(val - meanY, 2), 0) / n);

    const correlation = covariance / (stdDevX * stdDevY);

    return correlation;
}

// Function to plot heatmap
function plotHeatmap(labels, correlationMatrix) {
    const data = [{
        z: correlationMatrix,
        x: labels,
        y: labels,
        type: 'heatmap'
    }];

    const layout = {
        title: 'Correlation Heatmap',
        xaxis: { title: 'Industries' },
        yaxis: { automargin: true}, 
        paper_bgcolor:'white'
    };

    Plotly.newPlot('heatmap', data, layout);
}