!function (e) {
    var t = {};

    function n(r) {
        if (t[r]) return t[r].exports;
        var o = t[r] = {i: r, l: !1, exports: {}};
        return e[r].call(o.exports, o, o.exports, n), o.l = !0, o.exports
    }

    n.m = e, n.c = t, n.d = function (e, t, r) {
        n.o(e, t) || Object.defineProperty(e, t, {enumerable: !0, get: r})
    }, n.r = function (e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(e, "__esModule", {value: !0})
    }, n.t = function (e, t) {
        if (1 & t && (e = n(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var r = Object.create(null);
        if (n.r(r), Object.defineProperty(r, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e) for (var o in e) n.d(r, o, function (t) {
            return e[t]
        }.bind(null, o));
        return r
    }, n.n = function (e) {
        var t = e && e.__esModule ? function () {
            return e.default
        } : function () {
            return e
        };
        return n.d(t, "a", t), t
    }, n.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, n.p = "", n(n.s = 3)
}({
    3: function (e, t, n) {
        "use strict";
        var r = function () {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }

            return function (t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t
            }
        }();
        var o = function (e) {
            function t() {
                !function (e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, t);
                var e = function (e, t) {
                    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !t || "object" != typeof t && "function" != typeof t ? e : t
                }(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
                return e.state = {orderId: common.param("orderId")}, e
            }

            return function (e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }(t, React.Component), r(t, [{
                key: "componentDidMount", value: function () {
                    MF.setTitle("影像")
                }
            }, {
                key: "next", value: function () {
                    // MF.navi("apply/preview.html?orderId=" + this.state.orderId)
                    MF.navi("xinhua_lx/autograph_xh.html)
                }
            }, {
                key: "render", value: function () {
                    return React.createElement("div", null, React.createElement("div", {className: "bottom text18 tc-primary"}, React.createElement("div", {
                        className: "ml-3 mr-0",
                        style: {width: "300px"}
                    }), React.createElement("div", {
                        className: "divx",
                        onClick: this.next.bind(this)
                    }, React.createElement("div", {
                        className: "ml-0 mr-0",
                        style: {width: "390px", textAlign: "right"}
                    }, "预览"), React.createElement("div", {
                        className: "ml-1 mr-2",
                        style: {width: "30px"}
                    }, React.createElement("img", {
                        className: "mt-3",
                        style: {width: "27px", height: "39px"},
                        src: "../images/blueright.png"
                    })))))
                }
            }]), t
        }();
        $(document).ready(function () {
            ReactDOM.render(React.createElement(o, null), document.getElementById("root"))
        })
    }
});