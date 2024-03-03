url = '/api/v1.0/total_volume'

close_prices = []
dates = []
d3.json(url).then(function (response){
    response.forEach(element=>close_prices.push(element.Close))
    response.forEach(element=>dates.push(element.Date))
    // console.log(dates)
    rollingAverage(response)
    })

// Sample data
var values = close_prices

// Calculate rolling average
function rollingAverage(data, windowSize) {
var result = [];
for (var i = 0; i < data.length; i++) {
    var sum = 0;
    var count = 0;
    for (var j = Math.max(0, i - windowSize + 1); j <= i; j++) {
    sum += data[j];
    count++;
    }
    result.push(sum / count);
}
return result;
}

// Calculate rolling average with window size of 3
var rollingAvgValues = rollingAverage(values, 3);

// Create Plotly trace for original data
var trace1 = {
x: dates,
y: values,
mode: 'lines',
name: 'Original Data'
};

// Create Plotly trace for rolling average data
var trace2 = {
x: dates,
y: rollingAvgValues,
mode: 'lines',
name: 'Rolling Average (window size = 3)'
};

// Plot the data
var data = [trace1, trace2];

var layout = {
title: 'Original Data and Rolling Average',
xaxis: {
    title: 'Date'
},
yaxis: {
    title: 'Value'
}
};

Plotly.newPlot('plotly-chart', data, layout);