url = '/api/v1.0/stock_data'
d3.json(url).then(function (response){

   createChart(response, 'WD')
})

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
          text:"StockChart with Date-Time Axis"
        },
        subtitles: [{
          text: `${dataset} Price (in USD)`
        }],
        rangeChanging: intervalTypeChanger,
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

    stockChart.render();
      
}