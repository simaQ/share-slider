pt.ipadDashboard = pt.ipadDashboard || {};
pt.ipadDashboard.init = function () {
  const self = this;
  const chart3 = drawBarChart();
  self.chart3 = chart3;

  const chart4 = drawGaugeChart();
  self.chart4 = chart4;

  const chart5 = drawAreaChart();
  self.chart5 = chart5;

  const chart6 = drawMilestoneChart();
  self.chart6 = chart6;

  const chart7 = drawDodgeBar();
  self.chart7 = chart7;

  const chart8 = drawRadialChart();
  self.chart8 = chart8;

  const chart9 = drawMultLineChart();
  self.chart9 = chart9;
};

pt.ipadDashboard.destroy = function () {
  this.chart3 && !this.chart3.destroyed && this.chart3.destroy();
  this.chart4 && !this.chart4.destroyed && this.chart4.destroy();
  this.chart5 && !this.chart5.destroyed && this.chart5.destroy();
  this.chart6 && !this.chart6.destroyed && this.chart6.destroy();
  this.chart7 && !this.chart7.destroyed && this.chart7.destroy();
  this.chart8 && !this.chart8.destroyed && this.chart8.destroy();
  this.chart9 && !this.chart9.destroyed && this.chart9.destroy();
}

function drawBarChart() {
  const data = [
    { name: '74%', value: 74, target: 100 }
  ];
  const chart = new F2.Chart({
    id: 'progressBar',
    padding: [ 15, 'auto' ],
    pixelRatio: window.devicePixelRatio
  });
  chart.source(data);
  chart.coord({
    transposed: true
  });
  chart.axis('value', false);
  chart.axis('target', false);
  chart.axis('name', {
    grid: null,
    labelOffset: 20,
    label: {
      fontSize: 14,
      fill: '#E9ECF6'
    }
  });
  chart.interval()
    .position('name*target')
    .size(6)
    .animate(false)
    .color('#252A40')
    .style({
      radius: 4
    });
  chart.interval()
  .position('name*value')
  .size(6)
  .color('l(0) 0:#FB8F92 1:#FBCE8B')
  .style({
    radius: 4
  });

  chart.render();
  return chart;
}

function drawGaugeChart() {
  var Shape = F2.Shape;
  var data = [
    { pointer: '当前收益', value: 5, length: 2, y: 1.05 }
  ];
  //自定义绘制数据的的形状
  Shape.registerShape('point', 'dashBoard', {
    getPoints: function(cfg){
      var x = cfg.x;
      var y = cfg.y;

      return [
        { x: x, y: y },
        { x: x, y: 0.4 }
      ];
    },
    draw: function(cfg, container) {
      var point1 = cfg.points[0];
      var point2 = cfg.points[1];
      point1 = this.parsePoint(point1);
      point2 = this.parsePoint(point2);

      var line = container.addShape('Polyline', {
        attrs: {
          points: [ point1, point2 ],
          stroke: '#FB8F92',
          lineWidth: 4,
          lineCap: 'round'
        }
      });

      var text = cfg.origin._origin.value.toString();
      var text1 = container.addShape('Text', {
        attrs: {
          text: text + '%',
          x: cfg.center.x,
          y: cfg.center.y + 6,
          fill: '#FF8787',
          fontSize: 28,
          textAlign: 'center',
          textBaseline: 'middle'
        }
      });

      return [ line, text1 ];
    }
  });

  var chart = new F2.Chart({
    id: 'guage',
    animate: false,
    padding: [ 80, 50, 50 ],
    pixelRatio: window.devicePixelRatio
  });
  chart.source(data, {
    value: {
      type: 'linear',
      min: 0,
      max: 15,
      ticks: [ 0, 5, 7.5, 10, 15 ],
      nice: false
     },
    length: { type: 'linear', min: 0, max: 10 },
    y: { type: 'linear', min: 0, max: 1 }
  });

  chart.coord('polar',{
    inner: 0,
    startAngle: -1.25 * Math.PI,
    endAngle: 0.25 * Math.PI
  });

  //配置value轴刻度线
  chart.axis('value', {
    tickLine: {
      strokeStyle: '#464B61',
      lineWidth: 2,
      length: -5
    },
    label: null,
    grid: null,
    line: null
  });

  chart.axis('y', false);

  //绘制仪表盘辅助元素
  chart.guide().arc({
    start: [ 0, 1.05 ],
    end: [ 4.8, 1.05 ],
    style: {
      strokeStyle: '#FB8F92',
      lineWidth:5,
      lineCap: 'round'
    }
  });
  chart.guide().arc({
    start: [ 5.2, 1.05 ],
    end: [ 9.8, 1.05 ],
    style: {
      strokeStyle: '#464B61',
      lineWidth:5,
      lineCap: 'round'
    }
  });
  chart.guide().arc({
    start: [ 10.2, 1.05 ],
    end: [ 15, 1.05 ],
    style: {
      strokeStyle: '#464B61',
      lineWidth: 5,
      lineCap: 'round'
    }
  });
  chart.guide().arc({
    start: [ 0, 1.2 ],
    end: [ 15, 1.2 ],
    style: {
      strokeStyle: '#464B61',
      lineWidth:1
    }
  });

  chart.guide().text({
    position: [ -0.5, 1.3 ],
    content: '0.00%',
    style: {
      fillStyle: '#464B61',
      font:'18px Arial',
      textAlign: 'center'
    }
  });
  chart.guide().text({
    position: [ 7.5, 0.7 ],
    content: '7.50%',
    style: {
      fillStyle: '#464B61',
      font:'18px Arial',
      textAlign: 'center'
    }
  });
  chart.guide().text({
    position: [ 15.5, 1.3 ],
    content: '15.00%',
    style: {
      fillStyle: '#464B61',
      font:'18px Arial',
      textAlign: 'center'
    }
  });
  chart.guide().text({
    position: [ '0%', '0%' ],
    content: 'Annual Goal',
    style: {
      fontSize: 14,
      fill: '#C3C6CC'
    },
    offsetY: -60
  });
  chart.point().position('value*y')
    .size('length')
    .shape('dashBoard');
  chart.render();
  return chart;
}

function drawAreaChart() {
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
    id: 'area',
    padding: [ 30, 0, 20 ],
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
    labelOffset: 2,
    label: function(text, index, total) {
      var textCfg = {
        fill: '#2E3348',
      };
      if (index === 0 || index === total - 1) {
        textCfg.text = '';
      }
      if (text === 'Sat') {
        textCfg.fill = '#FBCE8B';
      }
      return textCfg;
    }
  });

  chart.line().position('day*value').shape('smooth').color('#2D2F45');

  chart.guide().regionFilter({
    start: ['last-Sun', 'min'],
    end: ['Sat', 900],
    color: 'l(0) 0:#FB8F92 1:#FBCE8B'
  });
  chart.guide().point({
    position: [ 'Sat', 900 ],
    style: {
      r: 4,
      fill: '#FBCE8B',
      stroke: '#1D2238',
      lineWidth: 3
    }
  });
  chart.guide().line({
    start: ['Sat', 'min'],
    end: [ 'Sat', 900 ],
    style: {
      stroke: '#FBCE8B',
      strokeOpacity: 0.4,
      lineWidth: 1
    }
  });
  chart.guide().text({
    position: ['Sat', 900],
    content: '900',
    style: {
      fill: '#FBCE8B',
    },
    offsetY: -15
  });
  chart.guide().text({
    position: ['min', 'max'],
    content: 'Clients',
    style: {
      fill: '#C3C6CC',
      fontSize: 14,
      textAlign: 'start'
    },
    offsetY: -10,
    offsetX: 20
  });
  chart.render();
  return chart;
}

function drawMilestoneChart() {
  var data = [
    { brand: 'Kenmore', sales: 103902, const: 100 },
    { brand: 'Craftsman', sales: 112352, const: 100 },
    { brand: 'DieHard', sales: 121823, const: 100 },
  ];
  var chart = new F2.Chart({
    id: 'bar',
    pixelRatio: window.devicePixelRatio,
    padding: [ 30, 20, 30 ]
  });
  chart.source(data);
  chart.coord({
    transposed: true
  });
  chart.axis(false);
  chart.tooltip(false);
  chart.legend(false);
  chart.interval().position('brand*const')
    .color('#292E44')
    .size(4)
    .animate(false)
    .style({
      radius: 2
    });
  chart.interval()
    .position('brand*sales')
    .size(4)
    .color('brand', ['#F9E3E1', '#FFD3C4', '#F29897' ])
    .style({
      radius: 2
    });
  chart.guide().text({
    position: ['max', 0],
    content: 'Milestones',
    style: {
      fill: '#C3C6CC',
      fontSize: 14,
      textAlign: 'start'
    },
    offsetY: -10,
    // offsetX: 20
  });

  chart.render();
  return chart;
}

function drawDodgeBar() {
  var data =[
    { name: 'London', 月份: 'Jan.', 月均降雨量: 18.9 },
    { name: 'London', 月份: 'Feb.', 月均降雨量: 28.8 },
    { name: 'London', 月份: 'Mar.', 月均降雨量: 39.3 },
    { name: 'London', 月份: 'Apr.', 月均降雨量: 81.4 },
    { name: 'London', 月份: 'May.', 月均降雨量: 47 },
    { name: 'London', 月份: 'Jun.', 月均降雨量: 20.3 },
    { name: 'London', 月份: 'Jul.', 月均降雨量: 24 },
    { name: 'London', 月份: 'Aug.', 月均降雨量: 35.6 },
    { name: 'London', 月份: 'Sep.', 月均降雨量: 15.6 },
    { name: 'London', 月份: 'Oct.', 月均降雨量: 35.6 },
    { name: 'London', 月份: 'Nov.', 月均降雨量: 40.6 },
    { name: 'London', 月份: 'Dec.', 月均降雨量: 22.6 },
    { name: 'Berlin', 月份: 'Jan.', 月均降雨量: 12.4 },
    { name: 'Berlin', 月份: 'Feb.', 月均降雨量: 23.2 },
    { name: 'Berlin', 月份: 'Mar.', 月均降雨量: 34.5 },
    { name: 'Berlin', 月份: 'Apr.', 月均降雨量: 99.7 },
    { name: 'Berlin', 月份: 'May.', 月均降雨量: 52.6 },
    { name: 'Berlin', 月份: 'Jun.', 月均降雨量: 35.5 },
    { name: 'Berlin', 月份: 'Jul.', 月均降雨量: 37.4 },
    { name: 'Berlin', 月份: 'Aug.', 月均降雨量: 42.4 },
    { name: 'Berlin', 月份: 'Sep.', 月均降雨量: 32.4 },
    { name: 'Berlin', 月份: 'Oct.', 月均降雨量: 32.4 },
    { name: 'Berlin', 月份: 'Nov.', 月均降雨量: 30.1 },
    { name: 'Berlin', 月份: 'Dec.', 月均降雨量: 28.1 },
  ];
  var chart = new F2.Chart({
    id: 'dodgeBar',
    pixelRatio: window.devicePixelRatio
  });
  chart.source(data);
  chart.legend(false);
  chart.axis('月均降雨量', false);
  chart.axis('月份', {
    line: null,
    label: {
      fill: '#2E3348'
    }
  })
  chart.guide().text({
    position: ['min', 'max'],
    content: 'Last 3 Month',
    style: {
      fill: '#C3C6CC',
      textAlign: 'start',
      fontSize: 14
    },
    offsetY: -10,
  });
  chart.interval().position('月份*月均降雨量')
    .color('name', ['#8F8E9C', '#FF9D9E'])
    .size(4)
    .style({
      radius: 2,
    })
    .adjust({
      type: 'dodge',
      marginRatio: 0.005
    });
  chart.render();
  return chart;
}

function drawRadialChart() {
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
  var data = [
    {name: 'Samsung',percent: 70.2},
    {name: 'Apple',percent: 34.6},
    {name: 'Huawei',percent: 18}
  ];
  const chart = new F2.Chart({
    id: 'radial',
    padding: [ 10, 'auto', 150 ],
    pixelRatio: window.devicePixelRatio
  });
  chart.coord('polar', {
    transposed: true,
    innerRadius: 0.5
  });

  chart.source(data.reverse(), {
    percent: {
      max: 100
    }
  });
  chart.axis(false);
  chart.tooltip(false);
  chart.legend({
    position: 'bottom',
    align: 'center',
    offsetY: -70
  });
  chart.guide().text({
    position: [ '50%', '100%' ],
    content: 'Milestones',
    style: {
      textAlign: 'center',
      textBaseline: 'middle',
      fill: '#C3C6CC',
      fontSize: 14
    },
    offsetY: 125
  });
  chart
    .interval()
    .position('name*percent')
    .color('name', ['#F9E3E1', '#FFD3C4', '#F29897'])
    .shape('tick')
    .size(4)
    .animate({
        appear: {
          animation: 'waveIn',
          duration: 1500,
          easing: 'elasticOut'
        },
        update: {
          duration: 1500,
          easing: 'elasticOut'
        }
      });;

  chart.render();
  return chart;
}

function drawMultLineChart() {
  var data = [{"country":"Attended","value":null,"year":1940},{"country":"Attended","value":null,"year":1941},{"country":"Attended","value":null,"year":1942},{"country":"Attended","value":null,"year":1943},{"country":"Attended","value":null,"year":1944},{"country":"Attended","value":6,"year":1945},{"country":"Attended","value":11,"year":1946},{"country":"Attended","value":32,"year":1947},{"country":"Attended","value":110,"year":1948},{"country":"Attended","value":235,"year":1949},{"country":"Attended","value":369,"year":1950},{"country":"Attended","value":640,"year":1951},{"country":"Attended","value":1005,"year":1952},{"country":"Attended","value":1436,"year":1953},{"country":"Attended","value":2063,"year":1954},{"country":"Attended","value":3057,"year":1955},{"country":"Attended","value":4618,"year":1956},{"country":"Attended","value":6444,"year":1957},{"country":"Attended","value":9822,"year":1958},{"country":"Attended","value":15468,"year":1959},{"country":"Attended","value":20434,"year":1960},{"country":"Attended","value":24126,"year":1961},{"country":"Attended","value":27387,"year":1962},{"country":"Attended","value":29459,"year":1963},{"country":"Attended","value":31056,"year":1964},{"country":"Attended","value":31982,"year":1965},{"country":"Attended","value":32040,"year":1966},{"country":"Attended","value":31233,"year":1967},{"country":"Attended","value":29224,"year":1968},{"country":"Attended","value":27342,"year":1969},{"country":"Attended","value":26662,"year":1970},{"country":"Attended","value":26956,"year":1971},{"country":"Attended","value":27912,"year":1972},{"country":"Attended","value":28999,"year":1973},{"country":"Attended","value":28965,"year":1974},{"country":"Attended","value":27826,"year":1975},{"country":"Attended","value":25579,"year":1976},{"country":"Attended","value":25722,"year":1977},{"country":"Attended","value":24826,"year":1978},{"country":"Attended","value":24605,"year":1979},{"country":"Attended","value":24304,"year":1980},{"country":"Attended","value":23464,"year":1981},{"country":"Attended","value":23708,"year":1982},{"country":"Attended","value":24099,"year":1983},{"country":"Attended","value":24357,"year":1984},{"country":"Attended","value":24237,"year":1985},{"country":"Attended","value":24401,"year":1986},{"country":"Attended","value":24344,"year":1987},{"country":"Attended","value":23586,"year":1988},{"country":"Attended","value":22380,"year":1989},{"country":"Attended","value":21004,"year":1990},{"country":"Attended","value":17287,"year":1991},{"country":"Attended","value":14747,"year":1992},{"country":"Attended","value":13076,"year":1993},{"country":"Attended","value":12555,"year":1994},{"country":"Attended","value":12144,"year":1995},{"country":"Attended","value":11009,"year":1996},{"country":"Attended","value":10950,"year":1997},{"country":"Attended","value":10871,"year":1998},{"country":"Attended","value":10824,"year":1999},{"country":"Attended","value":10577,"year":2000},{"country":"Attended","value":10527,"year":2001},{"country":"Attended","value":10475,"year":2002},{"country":"Attended","value":10421,"year":2003},{"country":"Attended","value":10358,"year":2004},{"country":"Attended","value":10295,"year":2005},{"country":"Attended","value":10104,"year":2006},{"country":"Attended","value":9914,"year":2007},{"country":"Attended","value":9620,"year":2008},{"country":"Attended","value":9326,"year":2009},{"country":"Attended","value":5113,"year":2010},{"country":"Attended","value":5113,"year":2011},{"country":"Attended","value":4954,"year":2012},{"country":"Attended","value":4804,"year":2013},{"country":"Attended","value":4761,"year":2014},{"country":"Attended","value":4717,"year":2015},{"country":"Attended","value":4368,"year":2016},{"country":"Attended","value":4018,"year":2017},{"country":"Canceled","value":null,"year":1940},{"country":"Canceled","value":null,"year":1941},{"country":"Canceled","value":null,"year":1942},{"country":"Canceled","value":null,"year":1943},{"country":"Canceled","value":null,"year":1944},{"country":"Canceled","value":null,"year":1945},{"country":"Canceled","value":null,"year":1946},{"country":"Canceled","value":null,"year":1947},{"country":"Canceled","value":null,"year":1948},{"country":"Canceled","value":null,"year":1949},{"country":"Canceled","value":5,"year":1950},{"country":"Canceled","value":25,"year":1951},{"country":"Canceled","value":50,"year":1952},{"country":"Canceled","value":120,"year":1953},{"country":"Canceled","value":150,"year":1954},{"country":"Canceled","value":200,"year":1955},{"country":"Canceled","value":426,"year":1956},{"country":"Canceled","value":660,"year":1957},{"country":"Canceled","value":869,"year":1958},{"country":"Canceled","value":1060,"year":1959},{"country":"Canceled","value":1605,"year":1960},{"country":"Canceled","value":2471,"year":1961},{"country":"Canceled","value":3322,"year":1962},{"country":"Canceled","value":4238,"year":1963},{"country":"Canceled","value":5221,"year":1964},{"country":"Canceled","value":6129,"year":1965},{"country":"Canceled","value":7089,"year":1966},{"country":"Canceled","value":8339,"year":1967},{"country":"Canceled","value":9399,"year":1968},{"country":"Canceled","value":10538,"year":1969},{"country":"Canceled","value":11643,"year":1970},{"country":"Canceled","value":13092,"year":1971},{"country":"Canceled","value":14478,"year":1972},{"country":"Canceled","value":15915,"year":1973},{"country":"Canceled","value":17385,"year":1974},{"country":"Canceled","value":19055,"year":1975},{"country":"Canceled","value":21205,"year":1976},{"country":"Canceled","value":23044,"year":1977},{"country":"Canceled","value":25393,"year":1978},{"country":"Canceled","value":27935,"year":1979},{"country":"Canceled","value":30062,"year":1980},{"country":"Canceled","value":32049,"year":1981},{"country":"Canceled","value":33952,"year":1982},{"country":"Canceled","value":35804,"year":1983},{"country":"Canceled","value":37431,"year":1984},{"country":"Canceled","value":39197,"year":1985},{"country":"Canceled","value":45000,"year":1986},{"country":"Canceled","value":43000,"year":1987},{"country":"Canceled","value":41000,"year":1988},{"country":"Canceled","value":39000,"year":1989},{"country":"Canceled","value":37000,"year":1990},{"country":"Canceled","value":35000,"year":1991},{"country":"Canceled","value":33000,"year":1992},{"country":"Canceled","value":31000,"year":1993},{"country":"Canceled","value":29000,"year":1994},{"country":"Canceled","value":27000,"year":1995},{"country":"Canceled","value":25000,"year":1996},{"country":"Canceled","value":24000,"year":1997},{"country":"Canceled","value":23000,"year":1998},{"country":"Canceled","value":22000,"year":1999},{"country":"Canceled","value":21000,"year":2000},{"country":"Canceled","value":20000,"year":2001},{"country":"Canceled","value":19000,"year":2002},{"country":"Canceled","value":18000,"year":2003},{"country":"Canceled","value":18000,"year":2004},{"country":"Canceled","value":17000,"year":2005},{"country":"Canceled","value":16000,"year":2006},{"country":"Canceled","value":15537,"year":2007},{"country":"Canceled","value":14162,"year":2008},{"country":"Canceled","value":12787,"year":2009},{"country":"Canceled","value":12600,"year":2010},{"country":"Canceled","value":11400,"year":2011},{"country":"Canceled","value":5500,"year":2012},{"country":"Canceled","value":4512,"year":2013},{"country":"Canceled","value":4502,"year":2014},{"country":"Canceled","value":4502,"year":2015},{"country":"Canceled","value":4500,"year":2016},{"country":"Canceled","value":4500,"year":2017}];
    var chart = new F2.Chart({
      id: 'multLine',
      pixelRatio: window.devicePixelRatio
    });
    chart.source(data, {
      value: {
        tickCount: 3
      }
    });
    chart.scale('year', {
      tickCount: 5
    });
    chart.axis('year', {
      line: null,
      label: function(text, index, total) {
        var textCfg = {
          fill: '#2E3348'
        };
        if (index === 0) {
          textCfg.textAlign = 'left';
        } else if (index === total - 1) {
          textCfg.textAlign = 'right';
        }
        return textCfg;
      }
    });
    chart.axis('value', {
      grid: {
        lineDash: null,
        stroke: '#24293F'
      },
      label: null
    });
    chart.legend({
      align: 'right',
      itemWidth: 150,
      nameStyle: {
        fill: '#DCDCDB'
      }
    });
    chart.guide().text({
      position: ['min', 'max'],
      content: 'Events',
      style: {
        fill: '#C3C6CC',
        textAlign: 'start',
        fontSize: 14
      },
      offsetY: -35,
    });
    chart.area().position('year*value').color('country', [ '#FB8482', '#DCDCDB' ]).shape('smooth');
    chart.line().position('year*value').color('country', ['#FB8482', '#DCDCDB']).shape('smooth');
    chart.render();

  return chart;
}
