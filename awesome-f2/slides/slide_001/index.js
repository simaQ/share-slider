pt.fullpageLine = pt.fullpageLine || {};
pt.fullpageLine.init = function () {
  var self = this;
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
    id: 'fullpageLineChart',
    padding: ['auto', 0],
    pixelRatio: window.devicePixelRatio
  });

  chart.source(data, {
    value: {
      tickCount: 5,
      min: 0
    },
    day: {
      range: [0, 1],
    }
  });
  chart.tooltip(false);
  chart.axis(false);

  const line = chart.line()
    .position('day*value')
    .shape('smooth')
    .size(8)
    .color('l(0) 0:#F0D70A 0.5:#7DEF83 1:#1BEECB')
    .animate({
      appear: {
        // duration: 1100,
        animation(shape, animateCfg, coord) {
          const start = coord.start;
          const end = coord.end;
          const width = end.x - start.x;
          const height = Math.abs(end.y - start.y);
          const clip = new F2.G.Shape.Rect({
            attrs: {
              x: start.x,
              y: end.y,
              width,
              height
            }
          });
          clip.isClip = true;
          clip.set('canvas', shape.get('canvas'));
          shape.attr('clip', clip);
          const endState = {
            width
          };
          clip.attr('width', 0);
          clip.animate().to({
            attrs: endState,
            duration: 1100,
            // delay,
            // easing
          }).onEnd(() => {
            shape.attr('clip', null);
            clip.remove(true);
          }).onUpdate((frame) => {
            $('#income').text(parseInt(frame * 879));
            $('#expense').text(parseInt(frame * 543));
            $('#balance').text(parseInt(frame * 336));
            $('#overview').text(parseInt(frame * 26802));
          });
        }
      }
    });

  chart.render();
  self.chart = chart;
};

pt.fullpageLine.destroy = function () {
  this.chart && !this.chart.destroyed && this.chart.destroy();
}
