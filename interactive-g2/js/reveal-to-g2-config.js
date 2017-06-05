/* global d3 */

var pt = pt || {};

pt.slideIdToFunctions = {
  'scatter-chart': {
    'init': function() {
      pt.scatter.init();
    }
  },
  'line-to-radar': {
    'init': function() {
      pt.lineToRadar.init();
    },
    0: function() {
      pt.lineToRadar.drawLine();
    },
    1: function() {
      pt.lineToRadar.drawArea();
    },
    2: function() {
      pt.lineToRadar.drawPoint();
    },
    3: function() {
      pt.lineToRadar.toPolar();
    }
  },
  'compose': {
    'init': function() {
      pt.compose.init();
    },
    2: function(){
      pt.compose.changeShape();
    },
    3: function() {
      pt.compose.intervalDodge();
    },
    4: function() {
      pt.compose.intervalDodgeStack();
    },
    5: function() {
      pt.compose.toPolar();
    },
    6: function() {
      pt.compose.toPolarTranspose();
    }
  },
  'brush': {
    'init': function() {
      pt.brush.init();
    }
  },
  'highlight': {
    'init': function() {
      pt.highlight.init();
    }
  },
  'legend-filter': {
    'init': function() {
      pt.legendFilter.init();
    }
  },
  'select': {
    'init': function() {
      pt.select.init();
    }
  },
};

function destroyChart() {
  pt.scatter.destroy();
  pt.lineToRadar.destroy();
  pt.compose.destroy();
}
