var dpi = Ti.Platform.displayCaps.dpi, density = Ti.Platform.displayCaps.density;

exports.dpToPX = function(val) {
    switch (density) {
      case "xhigh":
        return 3 * val;

      case "high":
        return 2 * val;

      default:
        return val;
    }
};

exports.pxToDP = function(val) {
    switch (density) {
      case "xhigh":
        return val / 3;

      case "high":
        return val / 2;

      default:
        return val;
    }
};

exports.pointPXToDP = function(pt) {
    return {
        x: exports.pxToDP(pt.x),
        y: exports.pxToDP(pt.y)
    };
};