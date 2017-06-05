pt.highlight = pt.highlight || {};

pt.highlight.init = function() {
  var self = this;
  $.getJSON('./slides/slide_05/Iris-flower.json', function(data) {
    var Stat = G2.Stat;
    var chart = new G2.Chart({
      id: 'scatterMatrix',
      forceFit: true,
      height: 500,
      plotCfg: {
        margin: [20, 95]
      }
    });
    var items = ['SepalLength', 'SepalWidth', 'PetalLength', 'PetalWidth'];
    var x = 0;
    var y = 0;
    for (var v = 0; v < items.length; v++) {
      for (var h = 0; h < items.length; h++) {
        var view = chart.createView({
          index: h + v,
          start: {
            x: x,
            y: y
          },
          end: {
            x: x + 0.2,
            y: y + 0.2
          }
        });
        view.source(data);
        view.axis(items[h], {
          title: null,
          labels: null,
          line: {
            stroke: '#000'
          },
          tickLine: {
            stroke: '#000'
          }
        });
        view.axis(items[v], {
          title: null,
          labels: null,
          line: {
            stroke: '#000'
          },
          tickLine: {
            stroke: '#000'
          }
        });
        view.point().position(items[h] + "*" + items[v])
          .color('Species', ['#880000', '#008800', '#000088'])
          .opacity(0.5)
          .shape('circle')
          .size(3);
        if (v === 3) {
          // 横向维度显示
          chart.guide().text([x + 0.02, 0.95 - (y + 0.2)], items[h]);
        }
        x += 0.25;
      }
      x = 0;
      y += 0.25;
      // 纵向维度显示
      chart.guide().text([x - 0.015, 1.07 - y], items[v], {
        rotate: -90
      });
    }
    chart.render();
    self.chart = chart;
  });
};

pt.highlight.destroy = function() {
  this.chart && this.chart.destroy();
};
