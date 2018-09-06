pt.smoothLine = pt.smoothLine || {};
pt.smoothLine.init = function () {
    const self = this;
    const chart1 = drawLineChart();
    self.chart1 = chart1;

    const chart2 = drawPieChart();
    self.chart2 = chart2;
};

pt.smoothLine.destroy = function () {
  this.chart1 && !this.chart1.destroyed && this.chart1.destroy();
  this.chart2 && !this.chart2.destroyed && this.chart2.destroy();
}

function numberToMoney(n) {
  return String(Math.floor(n * 100) / 100).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function drawLineChart() {
  const data = [
      { weekday: 'SUN1', temperature: 10 },
      { weekday: 'MON', temperature: 25 },
      { weekday: 'TUE', temperature: 28 },
      { weekday: 'WED', temperature: 26 },
      { weekday: 'THU', temperature: 32 },
      { weekday: 'FRI', temperature: 18 },
      { weekday: 'SAT', temperature: 22 },
      { weekday: 'SUN', temperature: 37 },
      { weekday: 'MON1', temperature: 30 }
    ];

    const chart = new F2.Chart({
      id: 'chart2',
      padding:  [ 30, 0, 30 ],
      pixelRatio: window.devicePixelRatio
    });
    const range = 1 / data.length;
    chart.source(data, {
      weekday: {
        range: [ -range /2, 1 + range / 2 ]
      }
    });
    chart.axis(false);
    data.map((obj, index) => {
      if (index >= 1 && index < data.length-2) {
        chart.guide().line({
          start: [index + 0.5, 0],
          end: [index + 0.5, 'max'],
          top: false,
          style: {
            stroke: 'l(90) 0:#364063 1:#575f7b'
          }
        });
      }

    });
    chart.line()
      .position('weekday*temperature')
      .color('l(0) 0:#5797FF 0.5:#6C74FF 0.75:#956EEB 1:#F997AC')
      .shape('smooth')
      .size(4)
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
              attrs: endState
            }).onEnd(() => {
              shape.attr('clip', null);
              clip.remove(true);
            }).onUpdate((frame) => {
              $('#money').text('$' + numberToMoney((frame * 20823.6).toFixed(2) * 1));
            });
          }
        }
      });
    chart.guide().text({
      position: [ 'min', 'max' ],
      content: 'Earnings Trend',
      style: {
        textAlign: 'start',
        fill: '#999EB0',
        fontSize: 13
      },
      offsetX: 15,
      offsetY: -10
    });
    chart.animate({
      'guide-point': {
        appear: {
          animation: 'fadeIn',
          delay: 500
        }
      },
      'guide-rect': {
        appear: {
          animation: 'fadeIn',
          delay: 500
        }
      },
      'guide-text': {
        appear: {
          animation(shape) {
            shape.attr('fillOpacity', 0);
            shape.animate().to({
              attrs: {
                fillOpacity: 1
              },
              delay: 500,
              duration: 450
            }).onStart(() => {
              $('#highlight').text('');
            });
          }
        }
      }
    });
    chart.guide().point({
      position: [ 'THU', 32 ],
      style: {
        r: 12,
        fill: '#7C84F1',
        fillOpacity: 0.3,
        lineWidth: 0
      }
    });
    chart.guide().point({
      position: ['THU', 32],
      style: {
        r: 7,
        fill: '#7C84F1',
        lineWidth: 0
      }
    });
    chart.guide().point({
      position: ['THU', 32],
      style: {
        r: 3,
        fill: '#6C73FF',
        lineWidth: 0
      }
    });
    chart.guide().rect({
      start: [ 3.5, 0 ],
      end: [ 4.5, 'max' ],
      style: {
        fillOpacity: 0.15,
        fill: 'l(90) 0:#364063 1:#575f7b'
      },
      top: false
    });
    chart.guide().text({
      position: [ 4, 'min' ],
      content: '04',
      top: true,
      style: {
        fill: '#fff',
        fontSize: 14
      },
      offsetY: 20
    });
    chart.render();
    return chart;
}

function drawPieChart() {
  var Shape = F2.Shape;
  var Global = F2.Global;
  var Util = F2.Util;
  var { Vector2 } = F2.G;

  Shape.registerShape('interval', 'radius', {
    draw(cfg, container) {
      const points = this.parsePoints(cfg.points);
      const style = Util.mix({
        stroke: cfg.color
      }, Global.shape.interval, cfg.style);
      const newPoints = [ points[0], points[3], points[2], points[1] ];

      const { x, y } = cfg.center;
      const v = [ 1, 0 ];
      const v0 = [ newPoints[0].x - x, newPoints[0].y - y ];
      const v1 = [ newPoints[1].x - x, newPoints[1].y - y ];
      const v2 = [ newPoints[2].x - x, newPoints[2].y - y ];

      let startAngle = Vector2.angleTo(v, v1);
      let endAngle = Vector2.angleTo(v, v2);
      const r = Vector2.length(v1);

      if (startAngle >= 1.5 * Math.PI) {
        startAngle = startAngle - 2 * Math.PI;
      }

      if (endAngle >= 1.5 * Math.PI) {
        endAngle = endAngle - 2 * Math.PI;
      }

      const radiusLine = container.addShape('Arc', {
        className: 'interval',
        attrs: Util.mix({
          x,
          y,
          r,
          startAngle: startAngle + (Math.PI / 28),
          endAngle: endAngle - (Math.PI / 28),
          lineCap: 'round',
          lineWidth: 6,
        }, style)
      });

      return radiusLine;
    }
  });

  var data = [
    { name: 'Funds', percent: 30, a: '1' },
    { name: 'Fixed Term', percent: 30, a: '1' },
    { name: 'Stock', percent: 30, a: '1' }
  ];

  var chart = new F2.Chart({
    id: 'chart3',
    pixelRatio: window.devicePixelRatio,
    padding: [ 0, 215, 0, 0 ]
  });
  chart.source(data, {
    percent: {
      formatter: function(val) {
        return val + '%';
      }
    }
  });
  chart.tooltip(false);
  chart.legend({
    position: 'right',
    offsetX: -50,
    custom: true,
    items: [
      { name: '$65.5  Funds', marker: { fill: '#343F63', stroke: '#FB97AB', lineWidth: 2 } },
      { name: '$65.5  Fixed Term', marker: { fill: '#343F63', stroke: '#5BB3FF', lineWidth: 2 } },
      { name: '$65.5  Stock', marker: { fill: '#343F63', stroke: '#7580F7', lineWidth: 2 } }
    ],
    nameStyle: {
      fill: '#70778D',
      fontSize: 12
    }
  });
  chart.coord('polar', {
    transposed: true,
    innerRadius: 0.7,
    radius: 0.85
  });
  chart.axis(false);
  chart.interval()
    .position('a*percent')
    .shape('radius') // 使用自定义的 shape, radius
    .color('name', ['#FB97AB', '#5BB3FF', '#7580F7'])
    .adjust('stack')
    .animate({
      appear: {
        animation(shape) {
          const { startAngle, endAngle } = shape.attr();
          shape.attr('endAngle', startAngle);
          const index = shape.get('index');
          shape.animate().to({
            attrs: {
              endAngle
            },
            duration: 1200,
            easing: 'bounceOut'
          });
        }
      }
    });

  chart.guide().html({
    position: [ '50%', '48%' ],
    html: '<div style="width: 250px;height: 40px;text-align: center;">' +
          '<div style="font-size: 28px;color:#C7F96F">+196.8</div>' +
          '<div style="font-size: 14px;color: #70778D;">Today\'s Income</div>' +
          '</div>'
  });
  chart.render();
  return chart;
}
