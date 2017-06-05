pt.brush = pt.brush || {};

pt.brush.init = function() {
  var self = this;
  $.getJSON('https://os.alipayobjects.com/rmsportal/gazxAlTidnkUNpXUFipS.json', function(data) {
      var Frame = G2.Frame;
      var frame = new Frame(data);
      frame = Frame.combinColumns(frame, ['New York', 'San Francisco', 'Austin'], 'value', 'city', 'date');
      chart = new G2.Chart({
        id: 'lineChart',
        forceFit: true,
        height: 400,
        plotCfg: {
          margin: [20, 110, 80]
        }
      });
      chart.setMode('select'); // 开启框选模式
      chart.select('rangeX'); // 设置框选方式，框选 x 维度
      chart.source(frame, {
        date: {
          type: 'time'
        },
        value: {
          alias: 'Temperature, ºF'
        }
      });
      chart.axis('date', {
        line: null,
        tickLine: {
          stroke: '#000',
          value: 6 // 刻度线长度
        },
        title: null
      });
      chart.axis('value', {
        title: null,
        tickLine: {
          stroke: '#000',
          value: 6 // 刻度线长度
        },
        labels: {
          label: {
            fill: '#000'
          }
        },
        line: {
          stroke: '#000'
        },
        grid: null
      });
      chart.line().position('date*value').color('city', ['#1f77b4', '#ff7f0e', '#2ca02c']).shape('spline').size(2);
      chart.render();
      // 监听双击事件，这里用于复原图表
      chart.on('plotdblclick', function(ev) {
        chart.get('options').filters = {};
        chart.repaint();
      });
      self.chart = chart;

      $('#brushX').click(function() {
        chart.setMode('select');
        chart.select('rangeX');
        chart.repaint();
      });

      $('#brushY').click(function() {
        chart.setMode('select');
        chart.select('rangeY');
        chart.repaint();
      });

      $('#brushXY').click(function() {
        chart.setMode('select');
        chart.select('rangeXY');
        chart.repaint();
      });

      $('#brushClosed').click(function() {
        chart.setMode(false);
        chart.repaint();
      });
  });
};

pt.brush.destroy = function() {
  this.chart && this.chart.destroy();
}
