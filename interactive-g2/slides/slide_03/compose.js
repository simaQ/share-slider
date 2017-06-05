pt.compose = pt.compose || {};
pt.compose.init = function() {
  var self = this;
  self.colorMap = {
    'J': '#4E7CCC',
    'G': '#36B3C3',
    'F': '#4ECDA5',
    'H': '#94E08A',
    'I': '#E2F194',
    'E': '#EDCC72',
    'D': '#F8AB60'
  };
  var Stat = G2.Stat;
  $.getJSON('./slides/slide_03/diamond.json', function(data) {
    var Frame = G2.Frame;
    var frame = new Frame(data);
    frame.addCol('level', function(obj) {
      var key = obj.clarity;
      var level;
      if (key === 'VVS1' || key === 'VVS2'　|| key === 'VS2' || key === 'VS1') {
        level = 'I';
      } else if (key === 'SI1' || key === 'SI2') {
        level = 'II';
      } else {
        level = 'III';
      }
      return level;
    });
    var chart = new G2.Chart({
      id: 'diamond',
      forceFit: true,
      height: 400,
      plotCfg: {
        margin: [20, 90, 60, 80]
      }
    });
    chart.source(frame);
    chart.interval()
      .position(Stat.summary.mean('cut*price'))
      .color('cut');
    chart.render();
    self.chart = chart;
  })
};

pt.compose.changeShape = function() {
  var chart = this.chart;
  if (chart) {
    chart.clear();
    chart.interval().position(G2.Stat.summary.mean('cut*price')).color('cut').shape('tick');
    chart.render();
    pt.compose.updateCode(
      "chart.interval()" + "<br>" +
      "  .position(G2.Stat.summary.mean('cut*price'))" + "<br>" +
      "  .color('cut')" + "<br>" +
      "  .shape('tick')"
    );
  }
}

pt.compose.intervalDodge = function() {
  var chart = this.chart;
  if (chart) {
    var colorMap = this.colorMap;
    chart.clear();
    chart.interval('dodge').position(G2.Stat.summary.mean('cut*price')).color('color', function(val) {
      return colorMap[val];
    });
    chart.render();
    pt.compose.updateCode(
      "chart.interval('dodge')" + "<br>" +
      "  .position(G2.Stat.summary.mean('cut*price'))" + "<br>" +
      "  .color('color', function(val) {" + "<br>" +
      "    return colorMap[val];" + "<br>" +
      "  });"
    );
  }
}

pt.compose.intervalDodgeStack = function() {
  var chart = this.chart;
  if (chart) {
    var colorMap = this.colorMap;
    chart.clear();
    chart.interval(['dodge', 'stack']).position(G2.Stat.summary.mean('cut*price')).color('level*color', function(level, color) {
      return colorMap[color];
    }).size(8);
    chart.render();
    pt.compose.updateCode(
      "chart.interval(['dodge', 'stack'])" + "<br>" +
      "  .position(G2.Stat.summary.mean('cut*price'))" + "<br>" +
      "  .size(8)" + "<br>" +
      "  .color('level*color', function(level, color) {" + "<br>" +
      "    return colorMap[color];" + "<br>" +
      "  });"
    );
  }
}

pt.compose.toPolar = function() {
  var chart = this.chart;
  if (chart) {
    var colorMap = this.colorMap;

    chart.clear();
    chart.coord('polar');
    chart.interval(['dodge', 'stack']).position(G2.Stat.summary.mean('cut*price')).color('level*color', function(level, color) {
      return colorMap[color];
    }).size(8);
    chart.render();
    pt.compose.updateCode(
      "chart.coord('polar');" + "<br>" +
      "chart.interval(['dodge', 'stack'])" + "<br>" +
      "  .position(G2.Stat.summary.mean('cut*price'))" + "<br>" +
      "  .size(8)" + "<br>" +
      "  .color('level*color', function(level, color) {" + "<br>" +
      "    return colorMap[color];" + "<br>" +
      "  });"
    );
  }
}

pt.compose.toPolarTranspose = function() {
  var chart = this.chart;
  if (chart) {
    var colorMap = this.colorMap;

    chart.clear();
    chart.coord('polar').transpose();
    chart.interval(['dodge', 'stack']).position(G2.Stat.summary.mean('cut*price')).color('level*color', function(level, color) {
      return colorMap[color];
    }).size(8);
    chart.render();
    pt.compose.updateCode(
      "chart.coord('polar').transpose();" + "<br>" +
      "chart.interval(['dodge', 'stack'])" + "<br>" +
      "  .position(G2.Stat.summary.mean('cut*price'))" + "<br>" +
      "  .size(8)" + "<br>" +
      "  .color('level*color', function(level, color) {" + "<br>" +
      "    return colorMap[color];" + "<br>" +
      "  });"
    );
  }
}

pt.compose.updateCode = function(str) {
  $("#compose pre code")
    .html(str);
  //Update the code to its javascript highlight
  $("#compose pre code").each(function(i, block) {
     hljs.highlightBlock(block);
  });
}

pt.compose.destroy = function() {
  this.chart && this.chart.destroy();
}
