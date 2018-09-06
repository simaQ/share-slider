pt.line = pt.line || {};
pt.line.init = function () {
  var self = this;
  var data = [
    { day: 'last-Sun', value: 250 },
    { day: 'Mon', value: 300 },
    { day: 'Tue', value: 400 },
    { day: 'Wed', value: 80 },
    { day: 'Thu', value: 500 },
    { day: 'Fri', value: 490 },
    { day: 'Sat', value: 900 },
    { day: 'Sun', value: 850 },
    { day: 'next-Mon', value: 820 },
  ];
  var chart = new F2.Chart({
    id: 'mountNode',
    padding: [ 'auto', 0 ],
    pixelRatio: window.devicePixelRatio
  });

  chart.source(data, {
    value: {
      tickCount: 5,
      min: 0
    },
    day: {
      range: [ 0, 1 ],
    }
  });
  chart.tooltip(false);
  chart.axis('value', false);
  chart.axis('day', {
    line: null,
    labelOffset: 25,
    label: function(text, index, total) {
      var textCfg = {
        fill: '#fff',
      };
      if (index === 0 || index === total - 1) {
        textCfg.text = '';
      }
      return textCfg;
    }
  });

  const line = chart.line()
    .position('day*value')
    .shape('smooth')
    .size(8)
    .color('l(0) 0:#F0D70A 0.5:#7DEF83 1:#1BEECB')
    .animate({
      appear: {
        // duration: 1100,
        animation(shape, animateCfg, coord) {
          const start = coord.start;
          const end = coord.end;
          const width = end.x - start.x;
          const height = Math.abs(end.y - start.y);
          const clip = new F2.G.Shape.Rect({
            attrs: {
              x: start.x,
              y: end.y,
              width,
              height
            }
          });
          clip.isClip = true;
          clip.set('canvas', shape.get('canvas'));
          shape.attr('clip', clip);
          const endState = {
            width
          };
          clip.attr('width', 0);
          clip.animate().to({
            attrs: endState,
            duration: 1100,
            // delay,
            // easing
          }).onEnd(() => {
            shape.attr('clip', null);
            clip.remove(true);
          }).onUpdate((frame) => {
            $('#income').text(parseInt(frame * 879));
            $('#expense').text(parseInt(frame * 543));
            $('#balance').text(parseInt(frame * 336));
            $('#overview').text(parseInt(frame * 26802));
          });
        }
      }
    });
  chart.animate({
    'guide-point': {
      appear: {
        animation: 'fadeIn',
        duration: 400,
        delay: 1100
      }
    },
    'guide-line': {
      appear: {
        animation(shape) {
          const y2 = shape.attr('y2');
          const y1 = shape.attr('y1');
          shape.attr('y2', y1);
          shape.animate().to({
            attrs: {
              y2: y2
            },
            delay: 1100,
            duration: 400
          }).onEnd(() => {
            line.style({
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.35)',
              shadowOffsetY: 5
            });

            chart.repaint();
          });
        }
      }
    }
  });
  data.map((obj, index) => {
    if (index >= 1 && index <= data.length - 2) {
      chart.guide().point({
        position: [obj.day, 'min'],
        style: {
          r: 2,
          fill: '#6B6DB0',
          lineWidth: 0
        }
      });
      chart.guide().line({
        start: [obj.day, 'min'],
        end: [obj.day, obj.value],
        top: false,
        style: {
          stroke: '#6B6DB0'
        }
      });
    }
  });
  // setTimeout(() => {
    chart.render();
  // }, 400);


  self.chart = chart;
};

pt.line.destroy = function () {
  this.chart && !this.chart.destroyed && this.chart.destroy();
}
