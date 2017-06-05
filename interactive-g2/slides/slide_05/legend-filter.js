pt.legendFilter = pt.legendFilter || {};

pt.legendFilter.init = function() {
  var data = [[0,0,10],[0,1,19],[0,2,8],[0,3,24],[0,4,67],[1,0,92],[1,1,58],[1,2,78],[1,3,117],[1,4,48],[2,0,35],[2,1,15],[2,2,123],[2,3,64],[2,4,52],[3,0,72],[3,1,132],[3,2,114],[3,3,19],[3,4,16],[4,0,38],[4,1,5],[4,2,8],[4,3,117],[4,4,115],[5,0,88],[5,1,32],[5,2,12],[5,3,6],[5,4,120],[6,0,13],[6,1,44],[6,2,88],[6,3,98],[6,4,96],[7,0,31],[7,1,1],[7,2,82],[7,3,32],[7,4,30],[8,0,85],[8,1,97],[8,2,123],[8,3,64],[8,4,84],[9,0,47],[9,1,114],[9,2,31],[9,3,48],[9,4,91]];
  var source = [];
  for (var i = 0; i < data.length; i++) {
    var item = data[i];
    var obj = {};
    obj.name = item[0];
    obj.day = item[1];
    obj.sales = item[2];
    source.push(obj);
  }
  var chart = new G2.Chart({
    id: 'catLegend',
    forceFit: true,
    height: 400,
    plotCfg: {
      margin: [5, 100, 80]
    }
  });
  chart.setMode('select');
  chart.select('rangeXY');
  chart.source(source, {
    name: {
      type: 'cat',
      values: ['Alexander', 'Marie', 'Maximilian', 'Sophia', 'Lukas', 'Maria', 'Leon', 'Anna', 'Tim', 'Laura']
    },
    day: {
      type: 'cat',
      values: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    },
    sales: {
      nice: false
    }
  });
  chart.axis('name', {
    title: null,
    labels: null,
    ticks: null,
    tickLine: null,
    line: null,
    grid: {
      line: {
        stroke: '#d9d9d9',
        lineWidth: 1,
        lineDash: [2, 2]
      }
    }
  });
  chart.axis('day', {
    title: null,
    labels: null,
    ticks: null,
    tickLine: null,
    line: null
  });
  chart.polygon()
    .position('name*day')
    .color('sales', '#f2f2f2-#36B3C3')
    .label('sales', {
      offset: -2,
      label: {
        fill: '#444',
        fontWeight: 'bold'
      }
    })
    .style({
      lineWidth: 1,
      stroke: '#fff'
    })
    .selected({
      selectedMode: 'single',
      style: {
        fill: '#f80',
        fillOpacity: 0.5
      }
  });
  chart.render();

  chart.on('plotdbclick', function(ev) {
    chart.set('filters', {});
    chart.repaint();
  });
  this.chart = chart;
};

pt.legendFilter.destroy = function() {
  this.chart && this.chart.destroy();
}

pt.conLegendFilter = pt.conLegendFilter || {};
pt.conLegendFilter.init = function() {
  var data = [{"部门":"部门0","小组":"组名0","完成人数":37,"未完成人数":9},{"部门":"部门0","小组":"组名2","完成人数":29,"未完成人数":10},{"部门":"部门0","小组":"组名8","完成人数":59,"未完成人数":14},{"部门":"部门0","小组":"组名9","完成人数":60,"未完成人数":8},{"部门":"部门0","小组":"组名10","完成人数":83,"未完成人数":14},{"部门":"部门0","小组":"组名12","完成人数":67,"未完成人数":21},{"部门":"部门0","小组":"组名14","完成人数":46,"未完成人数":18},{"部门":"部门0","小组":"组名17","完成人数":19,"未完成人数":27},{"部门":"部门0","小组":"组名19","完成人数":74,"未完成人数":17},{"部门":"部门1","小组":"组名15","完成人数":34,"未完成人数":19},{"部门":"部门1","小组":"组名20","完成人数":71,"未完成人数":25},{"部门":"部门1","小组":"组名26","完成人数":28,"未完成人数":23},{"部门":"部门1","小组":"组名29","完成人数":90,"未完成人数":24},{"部门":"部门2","小组":"组名7","完成人数":50,"未完成人数":5},{"部门":"部门2","小组":"组名11","完成人数":86,"未完成人数":26},{"部门":"部门2","小组":"组名13","完成人数":63,"未完成人数":16},{"部门":"部门2","小组":"组名27","完成人数":76,"未完成人数":2},{"部门":"部门2","小组":"组名28","完成人数":13,"未完成人数":28},{"部门":"部门3","小组":"组名1","完成人数":33,"未完成人数":16},{"部门":"部门3","小组":"组名3","完成人数":14,"未完成人数":1},{"部门":"部门3","小组":"组名4","完成人数":43,"未完成人数":25},{"部门":"部门3","小组":"组名16","完成人数":45,"未完成人数":13},{"部门":"部门3","小组":"组名18","完成人数":50,"未完成人数":21},{"部门":"部门3","小组":"组名22","完成人数":43,"未完成人数":7},{"部门":"部门3","小组":"组名23","完成人数":38,"未完成人数":6},{"部门":"部门3","小组":"组名24","完成人数":33,"未完成人数":24},{"部门":"部门3","小组":"组名25","完成人数":13,"未完成人数":27},{"部门":"部门4","小组":"组名5","完成人数":98,"未完成人数":4},{"部门":"部门4","小组":"组名6","完成人数":88,"未完成人数":12},{"部门":"部门4","小组":"组名21","完成人数":52,"未完成人数":9}];
  // 按照部门排序
  data.sort(function(obj1, obj2) {
    return obj1['部门'] > obj2['部门'] ? 1 : -1;
  });
  data.forEach(function(obj) {
    obj['完成人数'] *= -1; // 将完成人数转换成负数
  });
  var Frame = G2.Frame;
  var frame = new Frame(data);
  // 将'完成人数','未完成人数' 合并成一列，增加完成状态字段
  frame = Frame.combinColumns(frame, ['完成人数', '未完成人数'], '人数', '完成状态');
  var chart = new G2.Chart({
    id: 'conLegend',
    forceFit: true,
    height: 400,
    plotCfg: {
      margin: [5, 100, 80]
    }
  });
  chart.source(frame);
  chart.filter('部门', ['部门0']);
  chart.coord().transpose();
  // 关键代码：设置对应图例的选择模式
  chart.legend('部门', {
    mode: 'single', // G2@2.3.0 及以上使用 `mode`，2.3.0 以下版本请使用 `selectedMode`
  });
  // 关键代码：关闭对应图例的选择功能
  chart.legend('完成状态', {
    mode: false, // G2@2.3.0 及以上使用 `mode`，2.3.0 以下版本请使用 `selectedMode`
    position: 'bottom'
  })
  chart.axis('小组', {
    title: null
  });
  chart.axis('人数', {
    formatter: function(value) {
      value = parseInt(value);
      return Math.abs(value); // 将负数格式化成正数
    },
    title: null
  });
  chart.interval().position('小组*人数').color('部门').shape('完成状态', ['rect', 'hollowRect']).style({
    lineWidth: 2
  });
  chart.render();
  this.chart = chart;
};
pt.conLegendFilter.destroy = function() {
  this.chart && this.chart.destroy();
}
