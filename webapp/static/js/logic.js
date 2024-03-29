//init function
function init(){
  let url = '/api/v1.0/stock_data'
  d3.json(url).then(function (response){

    let firstElement = d3.select('select').select('option').attr('value');
    infoPanel(firstElement)
    createChart(response, firstElement);
  })
}

//on change function
function optionChanged(){
  let url = '/api/v1.0/stock_data'
  d3.json(url).then(function (response){

    let selDataset = d3.select('#selDataset').property('value');

    infoPanel(selDataset);
    createChart(response, selDataset);
  })
}
//appending ticker to select tag
d3.json('/api/v1.0/stock_data/summary').then(response =>{

  console.log('Start processing')
  tickers = response.map(row => row.Ticker);
  console.log(tickers)
  tickers.forEach(ticker => {
    d3.select('#selDataset').append('option').text(ticker).attr('value', ticker);
  });
  console.log('Finished processing')

});

//Candle stick chart
function createChart(data, dataset){
    let dps1 = []
    let dps2 = []
    let selData = data.filter(row => row.Ticker == dataset);

    selData.forEach(element => {
        let open = Number(element.Open);
        let high = Number(element.High);
        let low = Number(element.Low);
        let close = Number(element.Close);

        dps1.push({x: new Date(element.Date), y: [open, high, low, close]});
        dps2.push({x: new Date(element.Date), y: close});
        
    });
   
    var stockChart = new CanvasJS.StockChart("line_chart",{
        theme: "light2",
        exportEnabled: true,
        title:{
          text:"Stock Performance"
        },
        subtitles: [{
          text: `${dataset} Price (in USD)`
        }],
        charts: [{
          axisX: {
            tickThickness: 0,
            margin: 10,
          labelFormatter: function(e) {
            return "";
          },
          crosshair: {
            enabled: true,
            snapToDataPoint: true
          },
          scaleBreaks: {
            spacing: 0,
            lineThickness: 0
          }
        },
          axisY: {
            prefix: "$"
          },
          toolTip: {
            shared: true
          },
          data: [{
            type: "candlestick",
            yValueFormatString: "$#,###.##",
            dataPoints : dps1
          }]
        }],
        navigator: {
          data: [{
            dataPoints: dps2
          }],
          slider: {
            minimum: new Date(2018, 0o1, 0o2),
            maximum: new Date(2020, 0o2, 0o26)
          }
        }
      });

    d3.select('line_chart').html('');

    stockChart.render();

};
//Info Panel
function infoPanel(dataset){
  
  summaryUrl = '/api/v1.0/stock_data/summary';

  d3.json(summaryUrl).then(response =>{

    // Extracting keys and values for the selected dataset
    let demoArrKey = Object.keys(response.filter(data => data.Ticker == dataset)[0]);
    let demoArrVal = Object.values(response.filter(data => data.Ticker == dataset)[0]);   

    d3.select('#info').html('');

  for (let i = 0; i < demoArrKey.length; i++) {
    d3.select('#info').append('div').text(`${demoArrKey[i]} : ${demoArrVal[i]}`)
  }

  })      
};

// Initialize the visualization
init();

// Event listener for dropdown change
d3.selectAll("#selDataset").on("change", optionChanged);