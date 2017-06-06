pt.example = pt.example || {};

pt.example.init = function() {


  this.chart = chart;
};

pt.example.destroy = function() {
  this.chart && this.chart.destroy();
}
