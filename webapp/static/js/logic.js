//init function
function init(){
  let url = '/api/v1.0/stock_data'
  d3.json(url).then(function (response){

    let firstElement = d3.select('select').select('option').attr('value');
    infoPanel(firstElement)
    createChart(response, firstElement);
    news(firstElement);
    renderTopGainers();
  })
}

//on change function
function optionChanged(){
  let url = '/api/v1.0/stock_data'
  d3.json(url).then(function (response){

    let selDataset = d3.select('#selDataset').property('value');

    infoPanel(selDataset);
    createChart(response, selDataset);
    news(selDataset)
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
    let dataPoints = []
    let selData = data.filter(row => row.Ticker == dataset);

    selData.forEach(element => {
        let open = Number(element.Open);
        let high = Number(element.High);
        let low = Number(element.Low);
        let close = Number(element.Close);
        //dataPoints.push({x: new Date(data[i].date), y: Number(data[i].price)});
        dataPoints.push({x: new Date(element.Date), y: close});
        //dps2.push({x: new Date(element.Date), y: close});
        
    });
   
    var stockChart = new CanvasJS.StockChart("line_chart",{
      title:{
        text:`${dataset} Price (in USD)`
      },
      charts: [{
        data: [{
          type: "splineArea",
          color: "#3698C5",
          yValueFormatString: "$1 = $#,###.##",
          dataPoints : dataPoints
        }]
      }],
      navigator: {
        slider: {
          minimum: new Date(2020, 12, 0o1),
          maximum: new Date(2022, 0o3, 0o1)
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
function news(dataset){

  // Get today's date
  var today = new Date();
  // Get the date 3 days ago
  var from_date = new Date(today);
  from_date.setDate(from_date.getDate() - 3);

  // Format the dates in YYYY-MM-DD format
  var formatted_today = today.toISOString().split('T')[0];
  var formatted_from_date = from_date.toISOString().split('T')[0];

  apiKey = 'cockid1r01qknpft0bpgcockid1r01qknpft0bq0'
  // Define the API endpoint URL
  var apiUrl = `https://finnhub.io/api/v1/company-news?symbol=${dataset}&from=${formatted_from_date}&to=${formatted_today}&token=${apiKey}`;
  console.log(apiUrl)
  // Make an HTTP GET request to fetch the data
  d3.json(apiUrl).then(function(response) {
      // Handle the fetched data here
      console.log(response);
      d3.select('#news').html('');

      // Create a div element to display the extracted data
      var div = d3.select('#news').append('div');

      // Append related, summary, and headline to the div
      div.append('p').text('Ticker: ' + response[0].related);
      div.append('p').text('Headline: ' + response[0].headline);
      div.append('p').text('Summary: ' + response[0].summary);

    })
    .catch(function(error) {
      // Handle errors here
      console.error('Error fetching data:', error);
    });
}



// Function to render top gainers panel
function renderTopGainers() {
  d3.select("#topGainersList").html("");

  api_key = '0FE1BNEKXM2YALTG'
  // Define the API endpoint URL
  var apiUrl = `https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=${api_key}`;
  console.log(apiUrl)
  d3.json(apiUrl).then(response=>{
    console.log(response.top_gainers)
    top_gainers = response.top_gainers.slice(0,5)
     // Loop through top gainers data and create list items
    top_gainers.forEach(function(d) {
      var gainerBlock = d3.select("#topGainersList").append("div").classed("gainerBlock", true);
      //gainerBlock.append("div").text(d.ticker);
      gainerBlock.append("div").text(d.ticker + " (" + Number(d.change_percentage.replace("%", "")).toFixed(2) + "%)" + " ▲");
  });
  })


}

// Initialize the visualization
init();

// Event listener for dropdown change
d3.selectAll("#selDataset").on("change", optionChanged);