/* global d3 */

var pt = pt || {};

pt.slideIdToFunctions = {
  'slide_001': {
    'init': function () {
      pt.fullpageLine.init();
    }
  },
  'slide_01': {
    'init': function() {
      pt.line.init();
    }
  },
  'slide_02': {
    'init': function () {
      pt.smoothLine.init();
    }
  },
  'slide_03': {
    'init': function () {
      pt.ipadDashboard.init();
    }
  },
  'slide0003': {
    'init': function () {
      pt.charts.init();
    }
  },
  'slide_04': {
    'init': function () {
      pt.iwatch.init();
    }
  },
};

function destroyChart() {
  pt.fullpageLine.destroy();
  pt.line.destroy();
  pt.smoothLine.destroy();
  pt.ipadDashboard.destroy();
  pt.iwatch.destroy();
  pt.charts.destroy();
  // pt.lineToRadar.destroy();
  // pt.compose.destroy();
  // pt.brush.destroy();
  // pt.highlight.destroy();
  // pt.select.destroy();
  // pt.legendFilter.destroy();
  // pt.conLegendFilter.destroy();
  // pt.chartCommunication.destroy();
  // pt.example.destroy();
}
