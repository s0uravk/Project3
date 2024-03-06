//init function
function init(){
  let url = '/api/v1.0/stock_data/sector_volume'
  d3.json(url).then(function (response){
    console.log(response)
    createPieChart(response, 'Automobiles');
  })
}

function optionChanged3(){
  let url = '/api/v1.0/stock_data/sector_volume'
  d3.json(url).then(function (response){
    let selDataset = d3.select('#sel_Sector').property('value');
    // Check if a chart instance already exists
if (window.myChart !== undefined && window.myChart instanceof Chart) {
  // Destroy the existing chart
  window.myChart.destroy();
}
    createPieChart(response, selDataset);
  })
}

let ops = ['Automobiles', 'Finance', 'Healthcare', 'Technology']

ops.forEach(sec => {
  d3.select('#sel_Sector').append('option').text(sec).attr('value', sec)
});

function createPieChart(info, selection){
  let selectedData = info.filter(row => row.Sector == selection);
  console.log(selectedData)
  let volume = []
  let industry = []
  selectedData.forEach(element => {
     industry.push(element.Industry);
     volume.push(Number(element.Total_Volume));

   
    })

    console.log(industry)
    console.log(volume)

      
    var ctx = document.getElementById('myChart').getContext('2d');
    // <block:setup:1>
const data = {
  labels: industry,
  datasets: [{
    label: 'Total Volume',
    data: volume,
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)',
      'rgb(55, 20, 86)'
    ],
    hoverOffset: 4
  }]
};

window.myChart = new Chart(ctx, {
  type: 'doughnut',
  data: data,
  options: {
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context) {
            var label = context.label || '';
            var value = context.parsed || 0;
            var total = context.dataset.data.reduce(function(acc, val) {
              return acc + val;
            });
            var percentage = Math.round((value / total) * 100);
            return label + ': ' + percentage + '%';
          }
        }
      }
    }
  }
});

  }

init();

d3.selectAll('#sel_Sector').on("change", optionChanged3);