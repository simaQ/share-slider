pt.scatter = pt.scatter || {};
pt.scatter.init = function() {
  var self = this;
  $.getJSON('slides/slide_02/scatter.json', function(data){
        var frame = new G2.Frame(data);
        var hAvg = G2.Frame.mean(frame,'height'); // 计算体重的均值
        var wAvg = G2.Frame.mean(frame,'weight'); // 计算身高均值
        var lineCfg = { // 线的配置信息
          stroke: '#94E08A'
        };
        var chart = new G2.Chart({
          id: 'scatter',
          // width: 800,
          forceFit: true,
          height: 450
        });
        chart.source(data, {
          weight: {
            alias: '体重（kg）'
          },
          height: {
            alias: '身高（cm）'
          }
        });
        chart.tooltip({
          title: null,
          crosshairs: {
            type: 'cross'
          }
        });
        chart.point().position('height*weight')
          .color('gender', ['rgba(223, 83, 83, 0.7)', 'rgba(119, 152, 191, 0.7)'])
          .size(5)
          .shape('circle')
          .tooltip('gender*height*weight');
        // chart.guide().tag([hAvg, 'min'], [hAvg, 'max'], '身高平均值: ' + hAvg.toFixed(2), {line:lineCfg});
        // chart.guide().tag(['min', wAvg], ['max', wAvg], '体重平均值: ' + wAvg.toFixed(2), {line:lineCfg});
        chart.render();
        self.chart = chart;
  });
};

pt.scatter.destroy = function() {
  this.chart && this.chart.destroy();
}
