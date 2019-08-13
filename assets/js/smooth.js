function SmoothScroll(e, t, n) {
  e === document &&
    (e =
      document.scrollingElement ||
      document.documentElement ||
      document.body.parentNode ||
      document.body);
  var o = !1,
    i = e.scrollTop,
    a =
      e === document.body && document.documentElement
        ? document.documentElement
        : e;
  function m(n) {
    n.preventDefault();
    var m = (function(e) {
      return e.detail
        ? e.wheelDelta
          ? (e.wheelDelta / e.detail / 40) * (e.detail > 0 ? 1 : -1)
          : -e.detail / 3
        : e.wheelDelta / 120;
    })(n);
    (i += -m * t),
      (i = Math.max(0, Math.min(i, e.scrollHeight - a.clientHeight))),
      o || l();
  }
  function l() {
    o = !0;
    var t = (i - e.scrollTop) / n;
    (e.scrollTop += t), Math.abs(t) > 0.5 ? d(l) : (o = !1);
  }
  e.addEventListener("mousewheel", m, { passive: !1 }),
    e.addEventListener("DOMMouseScroll", m, { passive: !1 });
  var d =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(e) {
      window.setTimeout(e, 20);
    };
}
