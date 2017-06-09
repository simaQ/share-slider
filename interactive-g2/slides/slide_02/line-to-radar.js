pt.lineToRadar = pt.lineToRadar || {};
pt.lineToRadar.init = function() {
  var chart = new G2.Chart({
    id: 'lineToRadar',
    // width: 1350,
    forceFit: true,
    height: 450,
    plotCfg: {
      margin: [60, 80, 30]
    }
  });
  chart.source([], {
    // axis: {
    //   range: [0, 1]
    // }
  });
  chart.axis('value', {
    formatter: function(val) {
      return val * 100 + '%';
    }
  });
  chart.axis('axis', {
    labels: {
      autoRotate: false,
      label: {
        textAlign: 'center'
      }
    }
  });
  chart.legend({
    position: 'top'
  });

  chart.line().position('axis*value').color('phone', ["#EDC951","#CC333F","#00A0B0"])
    .shape('smooth');
  chart.render();
  this.chart = chart;
};

pt.lineToRadar.drawLine = function() {
  var data = [
    {axis:"Battery",value:0.22, phone: 'iPhone'},
    {axis:"Brand",value:0.28, phone: 'iPhone'},
    {axis:"Contract",value:0.29, phone: 'iPhone'},
    {axis:"Design",value:0.17, phone: 'iPhone'},
    {axis:"Internet",value:0.22, phone: 'iPhone'},
    {axis:"Large",value:0.02, phone: 'iPhone'},
    {axis:"Price",value:0.21, phone: 'iPhone'},
    {axis:"Smartphone",value:0.50, phone: 'iPhone'},
    {axis:"Battery",value:0.27, phone: 'Samsung'},
    {axis:"Brand",value:0.16, phone: 'Samsung'},
    {axis:"Contract",value:0.35, phone: 'Samsung'},
    {axis:"Design",value:0.13, phone: 'Samsung'},
    {axis:"Internet",value:0.20, phone: 'Samsung'},
    {axis:"Large",value:0.13, phone: 'Samsung'},
    {axis:"Price",value:0.35, phone: 'Samsung'},
    {axis:"Smartphone",value:0.38, phone: 'Samsung'},
    {axis:"Battery",value:0.26, phone: 'Nokia Smartphone'},
    {axis:"Brand",value:0.10, phone: 'Nokia Smartphone'},
    {axis:"Contract",value:0.30, phone: 'Nokia Smartphone'},
    {axis:"Design",value:0.14, phone: 'Nokia Smartphone'},
    {axis:"Internet",value:0.22, phone: 'Nokia Smartphone'},
    {axis:"Large",value:0.04, phone: 'Nokia Smartphone'},
    {axis:"Price",value:0.41, phone: 'Nokia Smartphone'},
    {axis:"Smartphone",value:0.30, phone: 'Nokia Smartphone'}
  ];
  var chart = this.chart;
  chart.changeData(data);
  pt.lineToRadar.updateCode(
    "<br>" +
    "chart.line().position('axis*value')<br>" +
    "  .color('phone', ['#EDC951', '#CC333F', '#00A0B0'])<br>" +
    "  .shape('smooth');" + "<br>"
  );
};

pt.lineToRadar.drawArea = function() {
  var chart = this.chart;
  if (chart) {
    chart.area().position('axis*value').color('phone', ["#EDC951","#CC333F","#00A0B0"])
      .opacity(0.35)
      .shape('smooth');
    chart.repaint();
    pt.lineToRadar.updateCode(
      "<br>" +
      "chart.line().position('axis*value')<br>" +
      "  .color('phone', ['#EDC951', '#CC333F', '#00A0B0'])<br>" +
      "  .shape('smooth');<br>" +
      "chart.area().position('axis*value')<br>" +
      "  .color('phone', ['#EDC951', '#CC333F', '#00A0B0'])<br>" +
      "  .opacity(0.35)<br>" +
      "  .shape('smooth')" + "<br>"
    );
  }
};

pt.lineToRadar.drawPoint = function() {
  var chart = this.chart;
  if (chart) {
    chart.point().position('axis*value').color('phone', ["#EDC951","#CC333F","#00A0B0"])
      .shape('circle').size(4);
    chart.repaint();

    pt.lineToRadar.updateCode(
      "<br>" +
      "chart.line().position('axis*value')<br>" +
      "  .color('phone', ['#EDC951', '#CC333F', '#00A0B0'])<br>" +
      "  .shape('smooth');<br>" +
      "chart.area().position('axis*value')<br>" +
      "  .color('phone', ['#EDC951', '#CC333F', '#00A0B0'])<br>" +
      "  .opacity(0.35)<br>" +
      "  .shape('smooth')<br>" +
      "chart.point().position('axis*value')<br>" +
      "  .color('phone', ['#EDC951', '#CC333F', '#00A0B0'])<br>" +
      "  .shape('circle').size(4);" + "<br>"
    );
  }
};

pt.lineToRadar.toPolar = function() {
  var chart = this.chart;
  if (chart) {
    chart.coord('polar');
    // chart.col('axis', {
    //   range: [0.0625, 0.9375]
    // });
    chart.repaint();
    pt.lineToRadar.updateCode(
      "<br>" +
      "chart.line().position('axis*value')<br>" +
      "  .color('phone', ['#EDC951', '#CC333F', '#00A0B0'])<br>" +
      "  .shape('smooth');<br>" +
      "chart.area().position('axis*value')<br>" +
      "  .color('phone', ['#EDC951', '#CC333F', '#00A0B0'])<br>" +
      "  .opacity(0.35)<br>" +
      "  .shape('smooth')<br>" +
      "chart.point().position('axis*value')<br>" +
      "  .color('phone', ['#EDC951', '#CC333F', '#00A0B0'])<br>" +
      "  .shape('circle').size(4);" + "<br><br>" +
      "chart.coord('polar'); // 切换至极坐标"
    );
  }
};

pt.lineToRadar.updateCode = function(str) {
  $("#line-to-radar pre code")
    .html(str);
  //Update the code to its javascript highlight
  $("#line-to-radar pre code").each(function(i, block) {
     hljs.highlightBlock(block);
  });
}

pt.lineToRadar.destroy = function() {
  this.chart && this.chart.destroy();
};
