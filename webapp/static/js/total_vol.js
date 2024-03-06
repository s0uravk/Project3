url = '/api/v1.0/stock_data/total_volume'
year = []
ticker = []
total_volume = []
sector = []

function createGraphs(sector) {
    d3.json(url).then(function (response) {
        year = [];
        ticker = [];
        total_volume = [];

        // -------------- GATHER DATA ------------------
        var filteredData = response.filter(element => element.Sector === sector);

        // -------------- FILTER DATA ------------------
        filteredData.forEach(element => {
            year.push(element.Year);
            ticker.push(element.Ticker);
            total_volume.push(element.Total_Volume);
        });
        // console.log(filteredData)

        // -------------- MAKE PLOT ------------------
        var trace1 = {
            x: year.slice(0, 15),
            y: total_volume.slice(0, 15),
            type: 'bar',
            text: ticker.slice(0, 15),
            marker: {
                color: total_volume.slice(0, 15),
                colorscale: 'Oryel',
                colorbar: {
                    title: 'Volume', // Add a color bar title
                }
            }
        };

        var data = [trace1];

        var layout = {
            title: 'Highest Volume',
            xaxis: {
                title: 'Year'
            },
            yaxis: {
                title: 'Volume'
            }
        };

        Plotly.newPlot('plotly-chart', data, layout);
    })
}

// -------- DROPDOWN SELECT ----------
var val = d3.select("#selSector").on("change", function() {
    var sector = d3.select(this).property("value");
    createGraphs(sector);
});

// ------- DROPDOWN FUNCTION --------
function populateDropdown(options) {
    let dropdown = d3.select("#selSector");

    options.forEach(option => {
        console.log(option)
        dropdown
            .append("option")
            .text(option)
            .property("value", option);
    });
}
let options = ['Automobiles', 'Finance', 'Technology', 'Healthcare']
populateDropdown(options);

// ------- INITIAL CALL --------
createGraphs('Automobiles')

function optionChanged2(sector) {
    createGraphs(sector);
};