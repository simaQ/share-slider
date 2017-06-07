pt.example = pt.example || {};

pt.example.init = function() {
  var arr = [
    { 'gender': 'male', jobCat: 'A', salary: 10000 },
    { 'gender': 'male', jobCat: 'B', salary: 10000 },
    { 'gender': 'male', jobCat: 'A', salary: 34400 },
    { 'gender': 'male', jobCat: 'A', salary: 12000 },
    { 'gender': 'male', jobCat: 'A', salary: 11111 },
    { 'gender': 'male', jobCat: 'B', salary: 10000 },
    { 'gender': 'female', jobCat: 'A', salary: 12333 },
    { 'gender': 'female', jobCat: 'A', salary: 14000 },
    { 'gender': 'female', jobCat: 'A', salary: 23400 },
    { 'gender': 'female', jobCat: 'B', salary: 30000 },
    { 'gender': 'female', jobCat: 'B', salary: 14000 },
    { 'gender': 'female', jobCat: 'B', salary: 10030 },
    { 'gender': 'female', jobCat: 'C', salary: 22222 },
  ];
  var chart = new G2.Chart({
    id: 'exampleChart',
    width: 700,
    height: 450,
    plotCfg: {
      margin: [80, 80, 80, 100]
    }
  });
  chart.axis('salary', {
    titleOffset: 90
  })

  var view1 = chart.createView();
  view1.source(arr);
  view1.intervalDodge().position(G2.Stat.summary.mean('gender*salary')).color('jobCat');
  chart.render();

  var isMainShow = true;
  var view2;

  function drawChartByGender(data, gender) {
    view2 = chart.createView();
    view2.source(data);
    view2.interval().position(G2.Stat.summary.mean('jobCat*salary')).color('jobCat');
    view2.guide().text([-0.45, 'max'], G2.Util.ucfirst(gender), {
      fontSize: 30,
      fill: '#f80',
      fontWeight: 'bold'
    })
  }

  chart.on('plotclick', function(ev) {
    // 判定是否点击了
    if(isMainShow && ev.shape) {
      var gender = ev.data._origin.gender;
      var filteredData = arr.filter(function(obj) {
        return obj.gender === gender;
      });
      view1.clear();
      drawChartByGender(filteredData, gender);
      chart.repaint();
      isMainShow = false;
    }
  });

  chart.on('plotdblclick',function(ev) {
    if (!isMainShow && view2) {
      view2.clear();
      view1.intervalDodge().position(G2.Stat.summary.mean('gender*salary')).color('jobCat');
      chart.repaint();
      isMainShow = true;
    }
  });

  this.chart = chart;
};

pt.example.destroy = function() {
  this.chart && this.chart.destroy();
}
