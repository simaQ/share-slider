pt.charts = pt.charts || {};
pt.charts.init = function () {
  this.chart_1 = drawColumn003();
  this.chart_2 = drawLine003();
  this.chart_3 = drawStackColumn003();
  this.chart_4 = drawArea003();
  this.chart_5 = drawPie003();
  this.chart_6 = drawRadar003();
  this.chart_7 = drawRadial003();
  this.chart_8 = drawDodge003();
};

pt.charts.destroy = function () {
  this.chart_1 && !this.chart_1.destroyed && this.chart_1.destroy();
  this.chart_2 && !this.chart_2.destroyed && this.chart_2.destroy();
  this.chart_3 && !this.chart_3.destroyed && this.chart_3.destroy();
  this.chart_4 && !this.chart_4.destroyed && this.chart_4.destroy();
  this.chart_5 && !this.chart_5.destroyed && this.chart_5.destroy();
  this.chart_6 && !this.chart_6.destroyed && this.chart_6.destroy();
  this.chart_7 && !this.chart_7.destroyed && this.chart_7.destroy();
  this.chart_8 && !this.chart_8.destroyed && this.chart_8.destroy();
}

function drawColumn003() {
  var data = [
    { year: 'JAN.', sales: 38 },
    { year: 'FEB.', sales: 52 },
    { year: 'MAR.', sales: 61 },
    { year: 'APR.', sales: 145 },
    { year: 'MAY.', sales: 48 },
    { year: 'JUN.', sales: 38 },
    { year: 'JUL.', sales: 38 },
    { year: 'AUG.', sales: 38 },
  ];
  var chart = new F2.Chart({
    id: 'column003',
    padding: [ 50, 'auto', 20 ],
    pixelRatio: window.devicePixelRatio
  });

  chart.source(data, {
    sales: {
      tickCount: 5
    }
  });
  chart.axis('year', {
    label: {
      fill: '#79798A'
    }
  });
  chart.axis('sales', {
    label: {
      fill: '#79798A'
    },
    grid: {
      lineDash: null,
      stroke: '#32323F'
    }
  });
  chart.tooltip(false);
  data.map(obj => {
    chart.guide().line({
      start: [ obj.year, 'min' ],
      end: [ obj.year, 'max' ],
      style: {
        lineWidth: 20,
        stroke: '#333344'
      },
      top: false
    });
  });

  chart.guide().text({
    position: [ '0%', '0%' ],
    content: '柱状图',
    style: {
      fill: '#fff',
      textAlign: 'start'
    },
    offsetX: -20,
    offsetY: -25
  });
  chart.interval()
    .position('year*sales')
    .color('#38C6C4')
    .size(20)
    .animate({
      appear: {
        duration: 1500
      }
    });
  chart.render();

  return chart;
}

function drawLine003() {
  var data = [
    { date: "2017-06-05", value: 116 },
    { date: "2017-06-06", value: 129 },
    { date: "2017-06-07", value: 135 },
    { date: "2017-06-08", value: 86 },
    { date: "2017-06-09", value: 73 },
    { date: "2017-06-10", value: 85 },
    { date: "2017-06-11", value: 73 },
    { date: "2017-06-12", value: 68 },
    { date: "2017-06-13", value: 92 },
    { date: "2017-06-14", value: 130 },
    { date: "2017-06-15", value: 245 },
    { date: "2017-06-16", value: 139 },
    { date: "2017-06-17", value: 115 },
    { date: "2017-06-18", value: 111 },
    { date: "2017-06-19", value: 309 },
    { date: "2017-06-20", value: 206 },
    { date: "2017-06-21", value: 137 },
    { date: "2017-06-22", value: 128 },
    { date: "2017-06-23", value: 85 },
    { date: "2017-06-24", value: 94 },
    { date: "2017-06-25", value: 71 },
    { date: "2017-06-26", value: 106 },
    { date: "2017-06-27", value: 84 },
    { date: "2017-06-28", value: 93 },
    { date: "2017-06-29", value: 85 },
    { date: "2017-06-30", value: 73 },
    { date: "2017-07-01", value: 83 },
    { date: "2017-07-02", value: 125 },
    { date: "2017-07-03", value: 107 },
    { date: "2017-07-04", value: 82 },
    { date: "2017-07-05", value: 44 },
    { date: "2017-07-06", value: 72 },
    { date: "2017-07-07", value: 106 },
    { date: "2017-07-08", value: 107 },
    { date: "2017-07-09", value: 66 },
    { date: "2017-07-10", value: 91 },
    { date: "2017-07-11", value: 92 },
    { date: "2017-07-12", value: 113 },
    { date: "2017-07-13", value: 107 },
    { date: "2017-07-14", value: 131 },
    { date: "2017-07-15", value: 111 },
    { date: "2017-07-16", value: 64 },
    { date: "2017-07-17", value: 69 },
    { date: "2017-07-18", value: 88 },
    { date: "2017-07-19", value: 77 },
    { date: "2017-07-20", value: 83 },
    { date: "2017-07-21", value: 111 },
    { date: "2017-07-22", value: 57 },
    { date: "2017-07-23", value: 55 },
    { date: "2017-07-24", value: 60 }
  ];
  var chart = new F2.Chart({
    id: 'line003',
    padding: [50, 'auto', 20],
    pixelRatio: window.devicePixelRatio
  });

  chart.source(data, {
    value: {
      tickCount: 5,
      min: 0
    },
    date: {
      type: 'timeCat',
      range: [ 0, 1 ],
      tickCount: 3
    }
  });
  chart.axis('date', {
    label: {
      fill: '#79798A'
    }
  });
  chart.axis('value', {
    label: {
      fill: '#79798A'
    },
    grid: {
      lineDash: null,
      stroke: '#32323F'
    }
  });
  chart.tooltip(false);
  chart.axis('date', {
    label: function(text, index, total) {
      var textCfg = {};
      if (index === 0) {
        textCfg.textAlign = 'left';
      } else if (index === total - 1) {
        textCfg.textAlign = 'right';
      }
      return textCfg;
    }
  });
  chart.area()
    .position('date*value')
    .style({
      fill: '#5DCECC',
      fillOpacity: 0.2
    })
    .animate({
      appear: {
        duration: 1500
      }
    });
  chart.line()
    .position('date*value')
    .color('#5DCECC')
    .animate({
      appear: {
        duration: 1500
      }
    });

  chart.guide().text({
    position: ['0%', '0%'],
    content: '折线图',
    style: {
      fill: '#fff',
      textAlign: 'start'
    },
    offsetX: -20,
    offsetY: -25
  });
  chart.render();
  return chart;
}

function drawArea003() {
 var data = [
    { value: 63.4, city: 'New York', date: '2011-10-01' },
    { value: 62.7, city: 'Alaska', date: '2011-10-01' },
    { value: 72.2, city: 'Austin', date: '2011-10-01' },
    { value: 58, city: 'New York', date: '2011-10-02' },
    { value: 59.9, city: 'Alaska', date: '2011-10-02' },
    { value: 67.7, city: 'Austin', date: '2011-10-02' },
    { value: 53.3, city: 'New York', date: '2011-10-03' },
    { value: 59.1, city: 'Alaska', date: '2011-10-03' },
    { value: 69.4, city: 'Austin', date: '2011-10-03' },
    { value: 55.7, city: 'New York', date: '2011-10-04' },
    { value: 58.8, city: 'Alaska', date: '2011-10-04' },
    { value: 68, city: 'Austin', date: '2011-10-04' },
    { value: 64.2, city: 'New York', date: '2011-10-05' },
    { value: 58.7, city: 'Alaska', date: '2011-10-05' },
    { value: 72.4, city: 'Austin', date: '2011-10-05' },
    { value: 58.8, city: 'New York', date: '2011-10-06' },
    { value: 57, city: 'Alaska', date: '2011-10-06' },
    { value: 77, city: 'Austin', date: '2011-10-06' },
    { value: 57.9, city: 'New York', date: '2011-10-07' },
    { value: 56.7, city: 'Alaska', date: '2011-10-07' },
    { value: 82.3, city: 'Austin', date: '2011-10-07' },
    { value: 61.8, city: 'New York', date: '2011-10-08' },
    { value: 56.8, city: 'Alaska', date: '2011-10-08' },
    { value: 78.9, city: 'Austin', date: '2011-10-08' },
    { value: 69.3, city: 'New York', date: '2011-10-09' },
    { value: 56.7, city: 'Alaska', date: '2011-10-09' },
    { value: 68.8, city: 'Austin', date: '2011-10-09' },
    { value: 71.2, city: 'New York', date: '2011-10-10' },
    { value: 60.1, city: 'Alaska', date: '2011-10-10' },
    { value: 68.7, city: 'Austin', date: '2011-10-10' },
    { value: 68.7, city: 'New York', date: '2011-10-11' },
    { value: 61.1, city: 'Alaska', date: '2011-10-11' },
    { value: 70.3, city: 'Austin', date: '2011-10-11' },
    { value: 61.8, city: 'New York', date: '2011-10-12' },
    { value: 61.5, city: 'Alaska', date: '2011-10-12' },
    { value: 75.3, city: 'Austin', date: '2011-10-12' },
    { value: 63, city: 'New York', date: '2011-10-13' },
    { value: 64.3, city: 'Alaska', date: '2011-10-13' },
    { value: 76.6, city: 'Austin', date: '2011-10-13' },
    { value: 66.9, city: 'New York', date: '2011-10-14' },
    { value: 67.1, city: 'Alaska', date: '2011-10-14' },
    { value: 66.6, city: 'Austin', date: '2011-10-14' },
    { value: 61.7, city: 'New York', date: '2011-10-15' },
    { value: 64.6, city: 'Alaska', date: '2011-10-15' },
    { value: 68, city: 'Austin', date: '2011-10-15' },
    { value: 61.8, city: 'New York', date: '2011-10-16' },
    { value: 61.6, city: 'Alaska', date: '2011-10-16' },
    { value: 70.6, city: 'Austin', date: '2011-10-16' },
    { value: 62.8, city: 'New York', date: '2011-10-17' },
    { value: 61.1, city: 'Alaska', date: '2011-10-17' },
    { value: 71.1, city: 'Austin', date: '2011-10-17' },
    { value: 60.8, city: 'New York', date: '2011-10-18' },
    { value: 59.2, city: 'Alaska', date: '2011-10-18' },
    { value: 70, city: 'Austin', date: '2011-10-18' },
    { value: 62.1, city: 'New York', date: '2011-10-19' },
    { value: 58.9, city: 'Alaska', date: '2011-10-19' },
    { value: 61.6, city: 'Austin', date: '2011-10-19' },
    { value: 65.1, city: 'New York', date: '2011-10-20' },
    { value: 57.2, city: 'Alaska', date: '2011-10-20' },
    { value: 57.4, city: 'Austin', date: '2011-10-20' },
    { value: 55.6, city: 'New York', date: '2011-10-21' },
    { value: 56.4, city: 'Alaska', date: '2011-10-21' },
    { value: 64.3, city: 'Austin', date: '2011-10-21' },
    { value: 54.4, city: 'New York', date: '2011-10-22' },
    { value: 60.7, city: 'Alaska', date: '2011-10-22' },
    { value: 72.4, city: 'Austin', date: '2011-10-22' },
    { value: 54.4, city: 'New York', date: '2011-10-23' },
    { value: 65.1, city: 'Alaska', date: '2011-10-23' },
    { value: 72.4, city: 'Austin', date: '2011-10-23' },
    { value: 54.8, city: 'New York', date: '2011-10-24' },
    { value: 60.9, city: 'Alaska', date: '2011-10-24' },
    { value: 72.5, city: 'Austin', date: '2011-10-24' },
    { value: 57.9, city: 'New York', date: '2011-10-25' },
    { value: 56.1, city: 'Alaska', date: '2011-10-25' },
    { value: 72.7, city: 'Austin', date: '2011-10-25' },
    { value: 54.6, city: 'New York', date: '2011-10-26' },
    { value: 54.6, city: 'Alaska', date: '2011-10-26' },
    { value: 73.4, city: 'Austin', date: '2011-10-26' },
    { value: 54.4, city: 'New York', date: '2011-10-27' },
    { value: 56.1, city: 'Alaska', date: '2011-10-27' },
    { value: 70.7, city: 'Austin', date: '2011-10-27' },
    { value: 42.5, city: 'New York', date: '2011-10-28' },
    { value: 58.1, city: 'Alaska', date: '2011-10-28' },
    { value: 56.8, city: 'Austin', date: '2011-10-28' },
    { value: 40.9, city: 'New York', date: '2011-10-29' },
    { value: 57.5, city: 'Alaska', date: '2011-10-29' },
    { value: 51, city: 'Austin', date: '2011-10-29' },
    { value: 38.6, city: 'New York', date: '2011-10-30' },
    { value: 57.7, city: 'Alaska', date: '2011-10-30' },
    { value: 54.9, city: 'Austin', date: '2011-10-30' },
    { value: 44.2, city: 'New York', date: '2011-10-31' },
    { value: 55.1, city: 'Alaska', date: '2011-10-31' },
    { value: 58.8, city: 'Austin', date: '2011-10-31' },
    { value: 49.6, city: 'New York', date: '2011-11-01' },
    { value: 57.9, city: 'Alaska', date: '2011-11-01' },
    { value: 62.6, city: 'Austin', date: '2011-11-01' },
    { value: 47.2, city: 'New York', date: '2011-11-02' },
    { value: 64.6, city: 'Alaska', date: '2011-11-02' },
    { value: 71, city: 'Austin', date: '2011-11-02' }
  ];
  var chart = new F2.Chart({
    id: 'area003',
    padding: [50, 'auto', 20],
    pixelRatio: window.devicePixelRatio
  });

  chart.source(data, {
    date: {
      range: [ 0, 1 ],
      type: 'timeCat',
      mask: 'MM-DD'
    },
    value: {
      max: 300,
      tickCount: 4
    }
  });
  chart.tooltip(false);
  chart.legend({
    align: 'right',
    itemWidth: null,
    offsetY: 15
  });
  chart.axis('value', {
    label: {
      fill: '#79798A'
    },
    grid: {
      lineDash: null,
      stroke: '#32323F'
    }
  });
  chart.axis('date', {
    label: function(text, index, total) {
      var textCfg = {
        fill: '#79798A'
      };
      if (index === 0) {
        textCfg.textAlign = 'left';
      } else if (index === total - 1) {
        textCfg.textAlign = 'right';
      }
      return textCfg;
    }
  });
  chart.guide().text({
    position: ['0%', '0%'],
    content: '层叠面积图',
    style: {
      fill: '#fff',
      textAlign: 'start'
    },
    offsetX: -20,
    offsetY: -25
  });
  chart.area()
    .position('date*value')
    .color('city', ['#25ACE2', '#8FF5EC', '#FEE872'])
    .adjust('stack')
    .style({
      fillOpacity: 0.3
    })
    .animate({
      appear: {
        duration: 1500
      }
    });
  chart.line()
    .position('date*value')
    .color('city', ['#25ACE2', '#8FF5EC', '#FEE872'])
    .adjust('stack')
    .animate({
      appear: {
        duration: 1500
      }
    });
  chart.render();

  return chart;
}

function drawPie003() {
  const data = [
    { amount: 16, ratio: 0.1, memo: 'REVENUE', const: 'const' },
    { amount: 16, ratio: 0.5, memo: 'FEES', const: 'const' },
    { amount: 2, ratio: 0.15, memo: 'OTHERS', const: 'const' },
  ];

  const chart = new F2.Chart({
    id: 'pie003',
    padding: [50, 'auto', 20],
    pixelRatio: window.devicePixelRatio
  });

  chart.source(data);
  chart.coord('polar', {
    transposed: true,
    innerRadius: 0.6,
    radius: 0.75
  });
  chart.axis(false);
  chart.legend(false);
  chart.tooltip(false);
  chart.guide().text({
    position: ['0%', '0%'],
    content: '饼图',
    style: {
      fill: '#fff',
      textAlign: 'start'
    },
    // offsetX: -20,
    offsetY: -25
  });
  chart.guide().html({
    position: ['50%', '50%'],
    html: '<div style="width: 55px;height: 20px;font-size: 14px;text-align: center;line-height: 20px;color:#3B827D;">REPORT</div>'
  });
  chart.interval().position('const*ratio')
    .color('memo', ['#1890FF', '#13C2C2', '#2FC25B', '#FACC14', '#F04864', '#8543E0', '#3436C7', '#223273'])
    .adjust('stack')
    .animate({
      appear: {
        duration: 1500
      }
    })
    .style({
      stroke: '#272634',
      lineWidth: 2
    });
  chart.render();

  // 绘制内阴影
  const frontPlot = chart.get('frontPlot');
  const coord = chart.get('coord'); // 获取坐标系对象
  frontPlot.addShape('sector', {
    attrs: {
      x: coord.center.x,
      y: coord.center.y,
      r: coord.circleRadius * coord.innerRadius * 1.25, // 全半径
      r0: coord.circleRadius * coord.innerRadius,
      fill: '#000',
      opacity: 0.15
    }
  });

  // 开始绘制文本
  const ANCHOR_OFFSET = 5; // 锚点偏移量
  const OFFSET = 18; // 连接线拐弯点偏移量
  const APPEND_OFFSET = 60; // 文本同 canvas 四边的偏移值
  const center = coord.center; // 极坐标圆心坐标
  const r = coord.circleRadius; // 极坐标半径
  const canvas = chart.get('canvas'); // 获取 canvas 对象
  const canvasWidth = chart.get('width'); // 获取 canvas 的宽度

  let drawnLabels = []; // 用于存储被绘制的文本图形对象
  const labelGroup = canvas.addGroup(); // 用于存储文本以及文本连接线

  // 判断两个矩形是否相交
  function _isOverlap(label1, label2) {
    const label1BBox = label1.getBBox();
    const label2BBox = label2.getBBox();
    return (
      (Math.max(label1BBox.minX, label2BBox.minX) <= Math.min(label1BBox.maxX, label2BBox.minX))
      &&
      (Math.max(label1BBox.minY, label2BBox.minY) <= Math.min(label1BBox.maxY, label2BBox.maxY))
    );
  }

  function _getEndPoint(center, angle, r) {
    return {
      x: center.x + r * Math.cos(angle),
      y: center.y + r * Math.sin(angle)
    };
  }

  // 绘制文本连接线
  function _drawLabelLine(label, labelGroup) {
    const { _anchor, _router, fill, y, _side } = label;
    const lastPoint = {
      x: _side === 'left' ? APPEND_OFFSET : canvasWidth - APPEND_OFFSET,
      y
    };

    // 绘制锚点
    labelGroup.addShape('Circle', {
      attrs: {
        x: _anchor.x,
        y: _anchor.y,
        r: 2,
        fill
      }
    });

    // 绘制文本连接线
    labelGroup.addShape('Polyline', {
      attrs: {
        points: [
          _anchor,
          _router,
          lastPoint
        ],
        lineWidth: 1,
        stroke: fill
      }
    });
  }

  // 绘制文本
  function _drawLabel(label) {
    const { _data, y, _side } = label;
    const group = new F2.G.Group({
      origin: _data // 存储原始数据
    });
    // 新建分类名的 text shape, 加入到 group 中
    group.addShape('text', {
      attrs: {
        x: _side === 'left' ? APPEND_OFFSET : canvasWidth - APPEND_OFFSET,
        y,
        fontSize: 12, // 字体大小
        fill: '#565661',
        text: _data.memo,
        textBaseline: 'bottom',
        textAlign: _side === 'left' ? 'left' : 'right',
        lineHeight: 16
      },
      origin: _data // 存储原始数据
    });
    // 新建数字 text shaoe，加入到 group 中
    group.addShape('text', {
      attrs: {
        x: _side === 'left' ? APPEND_OFFSET : canvasWidth - APPEND_OFFSET,
        y,
        fontSize: 12, // 字体大小
        fill: '#565661',
        text: '$' + _data.amount.toFixed(2),
        textBaseline: 'top',
        textAlign: _side === 'left' ? 'left' : 'right',
        lineHeight: 16,
        fontWeight: 'bold'
      },
      origin: _data // 存储原始数据
    });


    return group;
  }
  // 开始添加饼图的文本
  function addPieLabel(chart) {
    labelGroup && labelGroup.clear();
    const labels = []; // 存储要绘制的文本
    // 获取文本的信息
    const geom = chart.get('geoms')[0];
    const shapes = geom.get('container').get('children');
    shapes.forEach(shape => {
      const shapeAttrs = shape.attr();
      const origin = shape.get('origin');
      const { startAngle, endAngle } = shapeAttrs;
      const middleAngle = (startAngle + endAngle) / 2;
      const edgePoint = _getEndPoint(center, middleAngle, r + ANCHOR_OFFSET);
      const routerPoint = _getEndPoint(center, middleAngle, r + OFFSET);
      const label = {
        _anchor: edgePoint,
        _router: routerPoint,
        _data: origin._origin,
        x: routerPoint.x,
        y: routerPoint.y,
        r: r + OFFSET,
        fill: origin.color // 字体颜色
      };
      // 判断文本的方向
      if (edgePoint.x < center.x) {
        label._side = 'left';
        labels.push(label);
      } else {
        label._side = 'right';
        labels.push(label);
      }
    });

    let last_label; // 存储上一个 label 对象，用于检测文本是否重叠
    for (let i = 0; i < labels.length; i++) {
      const label = labels[i];
      const labelShape = _drawLabel(label); // 绘制文本图形对象

      if (last_label) {
        if (_isOverlap(labelShape, last_label)) { // 重叠了就不绘制
          last_label = labelShape;
          continue;
        }
      }
      drawnLabels.push(labelShape);

      labelGroup.add(labelShape);
      _drawLabelLine(label, labelGroup);
      last_label = labelShape;
    }

    canvas.draw();
  }

  addPieLabel(chart);
}

function drawRadar003() {
  var data = [
    { item: 'Design', user: '用户 A', score: 70 },
    { item: 'Development', user: '用户 A', score: 60 },
    { item: 'Marketing', user: '用户 A', score: 50 },
    { item: 'Users', user: '用户 A', score: 40 },
    { item: 'Test', user: '用户 A', score: 60 },
    { item: 'Language', user: '用户 A', score: 70 },
    // { item: 'Language', user: '用户 B', score: 50 },
    // { item: 'Technology', user: '用户 A', score: 70 },
    // { item: 'Technology', user: '用户 B', score: 40 },
    // { item: 'Support', user: '用户 A', score: 60 },
    // { item: 'Support', user: '用户 B', score: 40 }
  ];
  var chart = new F2.Chart({
    id: 'radar003',
    padding: [50, 20, 20],
    pixelRatio: window.devicePixelRatio
  });

  chart.coord('polar');
  chart.source(data, {
    score: {
      min: 0,
      max: 120,
      nice: false,
      tickCount: 4
    }
  });
  chart.tooltip(false);
  chart.axis('score', {
    label: function label(text, index, total) {
      if (index === total - 1) {
        return null;
      }
      return {
        top: true,
        fill: '#79798A'
      };
    },
    grid: function grid(text) {
      if (text === '120') {
        return {
          lineDash: null,
          stroke: '#32323F',
        };
      }
      return {
        stroke: '#32323F'
      };
    },
    line: {
      top: false,
      stroke: '#32323F'
    }
  });
  chart.axis('item', {
    grid: {
      lineDash: null,
      stroke: '#32323F'
    }
  });
  chart.legend({
    position: 'bottom',
    align: 'center',
    itemWidth: null,
    offsetY: 15
  });
  chart.area().position('item*score').color('#5DCECC').style({
    fillOpacity: 0.2
  }).animate({
    appear: {
      animation: 'groupWaveIn',
      duration:1000
    }
  });
  chart.line().position('item*score').color('#5DCECC').size(1).animate({
    appear: {
      animation: 'groupWaveIn',
      duration: 1500
    }
  });
  chart.point().position('item*score').color('#5DCECC').animate({
    appear: {
      delay: 300,
      duration: 1500
    }
  });

  chart.guide().text({
    position: ['0%', '0%'],
    content: '雷达图',
    style: {
      fill: '#fff',
      textAlign: 'start'
    },
    // offsetX: -20,
    offsetY: -25
  });
  chart.render();

  return chart;
}

function drawStackColumn003() {
  var data =[
    { name: 'London', 月份: 'Jan.', 月均降雨量: 18.9 },
    { name: 'London', 月份: 'Feb.', 月均降雨量: 28.8 },
    { name: 'London', 月份: 'Mar.', 月均降雨量: 39.3 },
    { name: 'London', 月份: 'Apr.', 月均降雨量: 81.4 },
    { name: 'London', 月份: 'May.', 月均降雨量: 47 },
    { name: 'London', 月份: 'Jun.', 月均降雨量: 20.3 },
    { name: 'London', 月份: 'Jul.', 月均降雨量: 24 },
    { name: 'London', 月份: 'Aug.', 月均降雨量: 35.6 },
    { name: 'Berlin', 月份: 'Jan.', 月均降雨量: 12.4 },
    { name: 'Berlin', 月份: 'Feb.', 月均降雨量: 23.2 },
    { name: 'Berlin', 月份: 'Mar.', 月均降雨量: 34.5 },
    { name: 'Berlin', 月份: 'Apr.', 月均降雨量: 99.7 },
    { name: 'Berlin', 月份: 'May.', 月均降雨量: 52.6 },
    { name: 'Berlin', 月份: 'Jun.', 月均降雨量: 35.5 },
    { name: 'Berlin', 月份: 'Jul.', 月均降雨量: 37.4 },
    { name: 'Berlin', 月份: 'Aug.', 月均降雨量: 42.4 }
  ];
  var chart = new F2.Chart({
    id: 'stackColumn003',
    padding: [50, 'auto', 20],
    pixelRatio: window.devicePixelRatio
  });
  chart.source(data, {
    '月均降雨量': {
      tickCount: 5
    }
  });

  chart.tooltip(false);
  chart.axis('月份', {
    label: {
      fill: '#79798A'
    }
  });
  chart.axis('月均降雨量', {
    label: {
      fill: '#79798A'
    },
    grid: {
      lineDash: null,
      stroke: '#32323F'
    }
  });
  chart.legend({
    align: 'right',
    itemWidth: 55,
    offsetY: 15,
    marker: 'square'
  });
  chart.interval()
    .position('月份*月均降雨量')
    .color('name', [ '#5DCECC', '#FFE771' ])
    .adjust('stack')
    .animate({
      appear: {
        duration: 1500
      }
    });

  data.map(obj => {
    chart.guide().line({
      start: [obj.月份, 'min'],
      end: [obj.月份, 'max'],
      style: {
        lineWidth: 20,
        stroke: '#333344'
      },
      top: false
    });
  });

  chart.guide().text({
    position: ['0%', '0%'],
    content: '层叠柱状图',
    style: {
      fill: '#fff',
      textAlign: 'start'
    },
    offsetX: -20,
    offsetY: -25
  });
  chart.render();
  return chart;
}

function drawRadial003() {
  var Util = F2.Util;
  var data = [
    { x: '1', y: 85 }
  ];
  var chart = new F2.Chart({
    id: 'radial003',
    padding: [ 50, 'auto', 20 ],
    pixelRatio: window.devicePixelRatio
  });
  chart.source(data, {
    y: {
      max: 100,
      min: 0
    }
  });
  chart.axis(false); // hide all axis
  chart.tooltip(false); // hide tooltip
  chart.coord('polar', {
    transposed: true,
    innerRadius: 0.8,
    radius: 0.75
  }); // set polar coordinate

  chart.guide().arc({
    start: [0, 0],
    end: [1, 99.98],
    top: false,
    style: {
      lineWidth: 10,
      stroke: '#1D1D29'
    }
  }); // draw a cricle
  chart.guide().html({
    position: ['50%', '50%'],
    html: '<p id="number" style="font-size: 18px;margin: 0;color: #5FCDCC;">0%</p>'
  }); // draw a text
  chart.guide().text({
    position: ['0%', '0%'],
    content: '环形进度条',
    style: {
      fill: '#fff',
      textAlign: 'start'
    },
    // offsetX: -20,
    offsetY: -25
  });
  chart.interval()
    .position('x*y')
    .size(10)
    .color('#5FCDCC')
    // .shape('tick')
    .animate({
      appear: {
        duration: 1500,
        easing: 'cubicIn',
        animation: function (shape, animateCfg) {
          const startAngle = shape.attr('startAngle');
          const endAngle = shape.attr('endAngle');
          shape.attr('endAngle', startAngle);
          shape.animate()
            .to(Util.mix({
              attrs: {
                endAngle: endAngle
              }
            }, animateCfg))
            .onUpdate((frame) => {
              $('#number').text(parseInt(frame * 85) + '%');
            });
        }
      }
    });
  chart.render();

  return chart;
}

function drawDodge003() {
  function numberToMoney(n) {
    return String(Math.floor(n * 100) / 100).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  var data = [
    { brand: 'Kenmore', sales: 103902, const: 100 },
    { brand: 'Craftsman', sales: 112352, const: 100 },
    { brand: 'DieHard', sales: 121823, const: 100 },
    { brand: 'Lands End', sales: 154092, const: 100 },
  ];
  var chart = new F2.Chart({
    id: 'dodge003',
    pixelRatio: window.devicePixelRatio,
    padding: [ 50, 'auto', 0 ]
  });
  chart.source(data);
  chart.coord({
    transposed: true
  });
  chart.axis(false);
  chart.tooltip(false);
  chart.interval().position('brand*const').color('#1D1D29').size(8).animate(false);
  chart.interval().position('brand*sales').color('#5FCDCC').size(8).animate({
    appear: {
      duration: 1500
    }
  });

  chart.guide().text({
    position: ['0%', '0%'],
    content: '条形图',
    style: {
      fill: '#fff',
      textAlign: 'start'
    },
    // offsetX: -20,
    offsetY: -25
  });
  // 绘制文本
  data.map(function(obj) {
    chart.guide().text({
      position: [ obj.brand, 'min' ],
      content: obj.brand,
      style: {
        textAlign: 'start',
        textBaseline: 'bottom',
        fill: '#79798A'
      },
      offsetY: -8
    });
    chart.guide().text({
      position: [ obj.brand, 'max' ],
      content: '$' + numberToMoney(obj.sales),
      style: {
        textAlign: 'end',
        textBaseline: 'bottom',
        fill: '#79798A'
      },
      offsetY: -8
    });
  });
  chart.render();
}
