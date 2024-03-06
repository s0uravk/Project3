url = '/api/v1.0/stock_data/moving_average'

close_prices = []
dates = []

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

d3.json(url).then(function (response) {
    response.forEach(element => close_prices.push(element.Close_Price))
    response.forEach(element => dates.push(element.Date))

    // dates.forEach(date => console.log(date))
    console.log(response)

    // --------- PLOT GRAPHS ------------
    var trace1 = {
        x: dates,
        y: values,
        mode: 'lines',
        name: 'Original Data'
    };

    var data = [trace1]

    var layout = {
        title: 'Original Data and Rolling Average',
        xaxis: {
            title: 'Date',
            type: 'Date'
        },
        yaxis: {
            title: 'Value'
        }
    };

    Plotly.newPlot('plotly-chart', data, layout);
})

var values = close_prices

// Calculate rolling average with window size of 3
var rollingAvgValues = rollingAverage(values, 3);

// Create Plotly trace for original data


// Create Plotly trace for rolling average data
// var trace2 = {
//     x: dates,
//     y: rollingAvgValues,
//     mode: 'lines',
//     name: 'Rolling Average (window size = 3)'
// };

// Plot the data
// var data = [trace1, trace2];




// Sample data

