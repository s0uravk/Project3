url = '/api/v1.0/stock_data'
d3.json(url).then(function (response){

   createChart(response)
})

function createChart(data){
    let date = []
    let close = []

    data.forEach(element => {
        date.push(element.Date);
        close.push(element.Close);
    });

    let trace1 = {
        x: date,
        y: close,
        name: 'Close',
        text: data.map(value => 'Close: ' + value.Close + ' Ticker: ' + value.Ticker),
        mode: 'lines' // Include markers for clarity
    };

    let layout = {
        title: 'Close Price by Year',
        xaxis: { 
            title: 'Year',
            tickmode: 'linear', // Use linear tick mode
            dtick: 1, // Set the tick interval to 1 (one year)
            tick0: date[0], // Set the starting tick to the first year in the dataset
            tickformat: '%Y' // Format tick labels as four-digit years
        },
        yaxis: { title: 'Close Price' }
    };
    
    let plot = [trace1]

    Plotly.newPlot('line_chart', plot, layout)
}