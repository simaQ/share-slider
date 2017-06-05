pt.select = pt.select || {};

pt.select.init = function() {
  function processData(mapData) {
    var result = [];
    var features = mapData.features;
    for (var i = 0; i < features.length; i++) {
      var name = features[i].properties.name;
      result.push({
        "name": name,
        "value": Math.round(Math.random() * 1000)
      });
    }
    return result;
  }

  function renderProvinceChart(provinceChart, name) {
    var provinceData = ChinaGeoJSON[name];
    provinceChart.clear();
    provinceChart.source(processData(provinceData));
    provinceChart.polygon().position(Stat.map.region('name', provinceData))
      .label('name', {
        label: {
          fill: '#333'
        }
      })
      .style({
        stroke: '#fff',
        lineWidth: 1
      })
      .color('value', '#e5f5e0-#31a354');
    provinceChart.render();
  }
  var Stat = G2.Stat;
  var mapData = ChinaGeoJSON['China'];
  var chart = new G2.Chart({
    id: 'china',
    width: 200,
    height: 120,
    plotCfg: {
      margin: [0, 10]
    }
  });
  chart.source(processData(mapData));
  chart.tooltip({
    title: null
  });
  chart.polygon().position(Stat.map.region('name', mapData)).tooltip('name')
    .style({
      stroke: '#999',
      lineWidth: 1,
      fill: '#ccc',
      globalAlpha: 0.9,
      cursor: 'pointer' // 设置鼠标手势
    }).selected({ // 设置是否允许选中以及选中样式
      mode: 'single', // 多选还是单选
      style: {
        fill: '#fe9929' // 选中的样式
      }
    });
  chart.render();
  this.chart = chart;
  var provinceChart = new G2.Chart({
    id: 'province',
    width: 700,
    height: 450,
    plotCfg: {
      margin: [60, 100, 40, 200]
    }
  });
  this.provinceChart = provinceChart;
  var shapeData = chart.getAllGeoms()[0].getData();
  for (var i = 0, len = shapeData.length; i < len; i++) {
    var item = shapeData[i];
    var origin = item['_origin'];
    var name = origin.name;
    if (name === '浙江') {
      renderProvinceChart(provinceChart, name);
      chart.getAllGeoms()[0].setSelected(item);
    }
  }
  chart.on('plotclick', function(ev) {
    var shape = ev.shape;
    if (shape && shape.get('selected')) {
      var item = shape.get('origin');
      var data = item['_origin'];
      var name = data.name;
      renderProvinceChart(provinceChart, name);
    } else {
      provinceChart.clear();
    }
  });
};

pt.select.destroy = function() {
  this.chart && this.chart.destroy();
  this.provinceChart && this.provinceChart.destroy();
};
