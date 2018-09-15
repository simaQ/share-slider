pt.iwatch = pt.iwatch || {};
pt.iwatch.init = function () {
  const self = this;
  const chart10 = drawRadial();
  self.chart10 = chart10;

  const chart11 = drawBar();
  self.chart11 = chart11;

  const chart12 = drawLine();
  self.chart12 = chart12;
};

pt.iwatch.destroy = function () {
  this.chart10 && !this.chart10.destroyed && this.chart10.destroy();
  this.chart11 && !this.chart11.destroyed && this.chart11.destroy();
  this.chart12 && !this.chart12.destroyed && this.chart12.destroy();
}

function drawRadial() {
  // customize shape and animation
  const { Shape, Util, Global, G, Animate } = F2;
  const { Vector2 } = G;
  Shape.registerShape('interval', 'tick', {
    draw(cfg, container) {
      const points = this.parsePoints(cfg.points);
      const style = Util.mix({
        stroke: cfg.color
      }, Global.shape.interval, cfg.style);
      if (cfg.isInCircle) {
        let newPoints = points.slice(0);
        if (this._coord.transposed) {
          newPoints = [ points[0], points[3], points[2], points[1] ];
        }

        const { x, y } = cfg.center;
        const v = [ 1, 0 ];
        const v0 = [ newPoints[0].x - x, newPoints[0].y - y ];
        const v1 = [ newPoints[1].x - x, newPoints[1].y - y ];
        const v2 = [ newPoints[2].x - x, newPoints[2].y - y ];

        let startAngle = Vector2.angleTo(v, v1);
        let endAngle = Vector2.angleTo(v, v2);
        const r0 = Vector2.length(v0);
        const r = Vector2.length(v1);

        if (startAngle >= 1.5 * Math.PI) {
          startAngle = startAngle - 2 * Math.PI;
        }

        if (endAngle >= 1.5 * Math.PI) {
          endAngle = endAngle - 2 * Math.PI;
        }

        const lineWidth = r - r0;
        const newRadius = r - (lineWidth / 2);

        return container.addShape('Arc', {
          className: 'interval',
          attrs: Util.mix({
            x,
            y,
            startAngle,
            endAngle,
            r: newRadius,
            lineWidth,
            lineCap: 'round',
            shadowColor: "rgba(0, 0, 0, 0.6)",
            shadowOffsetX: 0,
            shadowOffsetY: -5,
            shadowBlur: 50
          }, style)
        });
      }
    }
  });

  Animate.registerAnimation('waveIn', function(shape, animateCfg) {
    const startAngle = shape.attr('startAngle');
    const endAngle = shape.attr('endAngle');
    shape.attr('endAngle', startAngle);
    shape.animate().to(Util.mix({
      attrs: {
        endAngle: endAngle
      }
    }, animateCfg));
  });
  // ------

  const data = [
    {name:'activity1',percent:2370,color:'#1ad5de',icon:'stand.png', bgColor: '#183C3D'},
    {name:'activity2',percent:80,color:'#a0ff03',icon:'walk.png', bgColor: '#324214'},
    {name:'activity3',percent:65,color:'#e90b3a',icon:'run.png', bgColor: '#40131D'}
  ];

  const chart = new F2.Chart({
    id: 'watchRadial',
    pixelRatio: window.devicePixelRatio
  });

  chart.source(data, {
    percent: {
      max: 100
    }
  });
  chart.legend(false);
  chart.coord('polar', {
    transposed: true,
    innerRadius: 0.382,
    radius: 0.8
  });
  chart.axis(false);
  chart.interval()
    .position('name*percent')
    .color('color', val => {
      return val;
    })
    .shape('tick')
    .size(16)
    .animate({
      appear: {
        animation: 'waveIn',
        duration: 1200,
        easing: 'elasticOut'
      },
      update: {
        duration: 1200,
        easing: 'elasticOut'
      }
    });

  data.map((obj) => {
    // background
    chart.guide().arc({
      start: [obj.name, 0],
      end: [obj.name, 99.98],
      top: false,
      style: {
        lineWidth: 16,
        stroke: obj.bgColor
      }
    });
    chart.guide().html({
      position: [ obj.name, 0 ],
      html: '<div style="width: 16px;height: 16px;">'
            + '<img style="width: 16px;height: 16px;display: block;" src="http://www.adeveloperdiary.com/wp-content/uploads/2015/11/'+  obj.icon + '" />'
            + '</div>'
    });
  });
  chart.render();
  return chart;
}

function drawBar() {
  var Animate = F2.Animate;
  var Util = F2.Util;
  var G = F2.G;
  Animate.registerAnimation('delayScaleInY', function(shape, animateCfg) {
    var box = shape.getBBox();
    var origin = shape.get('origin');
    var points = origin.points; // 获取柱子顶点
    var centerX = (box.minX + box.maxX) / 2;
    var centerY;
    if (points[0].y - points[1].y <= 0) {
      // 当顶点在零点之下
      centerY = box.maxY;
    } else {
      centerY = box.minY;
    }

    shape.transform([['t', centerX, centerY], ['s', 1, 0.1], ['t', -centerX, -centerY]]);
    var index = shape.get('index');
    var delay = animateCfg.delay;
    if (Util.isFunction(delay)) {
      delay = animateCfg.delay(index);
    }
    var easing = animateCfg.easing;

    var matrix = shape.getMatrix();
    var endMatrix = G.Matrix.transform(matrix, [['t', centerX, centerY], ['s', 1, 10], ['t', -centerX, -centerY]]);

    shape.animate().to({
      attrs: {
        matrix: endMatrix
      },
      delay: delay,
      easing: easing,
      duration: animateCfg.duration
    });
  });
  const data = [
    { date: '2018-05-06', steps: 19461 },
    { date: '2018-05-07', steps: 22487 },
    { date: '2018-05-08', steps: 11062 },
    { date: '2018-05-09', steps: 0 },
    { date: '2018-05-10', steps: 12776 },
    { date: '2018-05-11', steps: 12919 },
    { date: '2018-05-12', steps: 7216 },
    { date: '2018-05-13', steps: 4867 },
    { date: '2018-05-14', steps: 8725 },
    { date: '2018-05-15', steps: 8983 },
    { date: '2018-05-16', steps: 22348 },
    { date: '2018-05-17', steps: 17142 },
    { date: '2018-05-18', steps: 8715 }
  ];
  const chart = new F2.Chart({
    id: 'watchBar',
    padding: [ 5, 'auto', 5, 30 ],
    pixelRatio: window.devicePixelRatio
  });
  chart.source(data, {
    date: {
      type: 'timeCat'
    }
  });
  chart.axis('date', false);
  chart.axis('steps', {
    position: 'right',
    grid: null,
    label: {
      fill: '#B06790'
    }
  })
  chart.interval()
    .position('date*steps')
    .color('#F1428E')
    .style({
      radius: 3
    })
    .animate({
      appear: {
        animation: 'delayScaleInY',
        easing: 'elasticOut',
        duration: 1200,
        delay: function delay(index) {
          return index * 50;
        }
      }
    });;
  chart.render();

  return chart;
}

function drawLine() {
  var data = [
    { date: "2017-06-05", value: 11.6, tag: 0 },
    { date: "2017-06-06", value: 12.9, tag: 0 },
    { date: "2017-06-07", value: 13.5, tag: 0 },
    { date: "2017-06-08", value: 8.6, tag: 2 },
    { date: "2017-06-09", value: 7.3, tag: 2 },
    { date: "2017-06-10", value: 8.5, tag: 0 },
    { date: "2017-06-11", value: 7.3, tag: 0 },
    { date: "2017-06-12", value: 6.8, tag: 0 },
    { date: "2017-06-13", value: 9.2, tag: 0 },
    { date: "2017-06-14", value: 13.0, tag: 1 },
    { date: "2017-06-15", value: 24.5, tag: 0 },
    { date: "2017-06-16", value: 13, tag: 0 },
    { date: "2017-06-17", value: 11.5, tag: 1 },
    { date: "2017-06-18", value: 11.1, tag: 0 },
    { date: "2017-06-19", value: 30.9, tag: 0 },
    { date: "2017-06-20", value: 20.6, tag: 1 },
    { date: "2017-06-21", value: 13.7, tag: 1 },
    { date: "2017-06-22", value: 12.8, tag: 1 },
    { date: "2017-06-23", value: 8.5, tag: 0 },
    { date: "2017-06-24", value: 9.4, tag: 1},
    { date: "2017-06-25", value: 7.1, tag: 0 },
    { date: "2017-06-26", value: 10.6, tag: 0 },
    { date: "2017-06-27", value: 8.4, tag: 0 },
    { date: "2017-06-28", value: 9.3, tag: 0 },
    { date: "2017-06-29", value: 8.5, tag: 0 },
    { date: "2017-06-30", value: 7.3, tag: 0 }
  ];

  const chart = new F2.Chart({
    id: 'watchLine',
    pixelRatio: window.devicePixelRatio,
    padding: [25, 30, 'auto']
  });
  chart.source(data, {
    date: {
      type: 'timeCat',
      range: [0, 1],
      mask: 'MM-DD',
      tickCount: 3
    }
  });
  chart.axis('date', {
    line: null,
    label: {
      fill: '#848484'
    },
    grid: {
      lineWidth: 1,
      lineDash: null,
      stroke: '#2e2e2e'
    }
  });
  chart.axis('value', false);
  chart.guide().text({
    position: [ 'min', 'max' ],
    content: '620 RPTS',
    style: {
      fill: '#fff',
      fontSize: 18,
      textAlign: 'start'
    },
    offsetY: -15,
    offsetX: -4
  });
  chart.line().position('date*value')
    .color('l(0) 0:#EEE805 0.5:#FB6F3C 1:#E9255F')
    .size(3)
    .shape('smooth')
    .animate({
      appear: {
        duration: 1200
      }
    });
  chart.render();
  return chart;
}
