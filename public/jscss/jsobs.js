!(function (e, t) {
    "object" == typeof exports && "undefined" != typeof module ? (module.exports = t()) : "function" == typeof define && define.amd ? define(t) : (e.lozad = t());
})(this, function () {
    "use strict";
    var e = "undefined" != typeof document && document.documentMode,
        t = {
            rootMargin: "0px",
            threshold: 0,
            load: function (t) {
                if ("picture" === t.nodeName.toLowerCase()) {
                    var n = document.createElement("img");
                    e && t.getAttribute("data-iesrc") && (n.src = t.getAttribute("data-iesrc")), t.getAttribute("data-alt") && (n.alt = t.getAttribute("data-alt")), t.append(n);
                }
                if ("video" === t.nodeName.toLowerCase() && !t.getAttribute("data-src") && t.children) {
                    for (var r = t.children, o = void 0, i = 0; i <= r.length - 1; i++) (o = r[i].getAttribute("data-src")) && (r[i].src = o);
                    t.load();
                }
                if (
                    (t.getAttribute("data-poster") && (t.poster = t.getAttribute("data-poster")),
                    t.getAttribute("data-src") && (t.src = t.getAttribute("data-src")),
                    t.getAttribute("data-srcset") && t.setAttribute("srcset", t.getAttribute("data-srcset")),
                    t.getAttribute("data-background-image"))
                )
                    t.style.backgroundImage = "url('" + t.getAttribute("data-background-image").split(",").join("'),url('") + "')";
                else if (t.getAttribute("data-background-image-set")) {
                    var s = t.getAttribute("data-background-image-set").split(","),
                        a = s[0].substr(0, s[0].indexOf(" ")) || s[0];
                    (a = -1 === a.indexOf("url(") ? "url(" + a + ")" : a),
                        1 === s.length
                            ? (t.style.backgroundImage = a)
                            : t.setAttribute("style", (t.getAttribute("style") || "") + "background-image: " + a + "; background-image: -webkit-image-set(" + s + "); background-image: image-set(" + s + ")");
                }
                t.getAttribute("data-toggle-class") && t.classList.toggle(t.getAttribute("data-toggle-class"));
            },
            loaded: function () {},
        };
    function n(e) {
        e.setAttribute("data-loaded", !0);
    }
    var r = function (e) {
        return "true" === e.getAttribute("data-loaded");
    };
    return function () {
        var e,
            o,
            i = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : ".lozad",
            s = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {},
            a = Object.assign({}, t, s),
            u = a.root,
            l = a.rootMargin,
            c = a.threshold,
            d = a.load,
            f = a.loaded,
            p = void 0;
        return (
            "undefined" != typeof window &&
                window.IntersectionObserver &&
                (p = new IntersectionObserver(
                    ((e = d),
                    (o = f),
                    function (t, i) {
                        t.forEach(function (t) {
                            (0 < t.intersectionRatio || t.isIntersecting) && (i.unobserve(t.target), r(t.target) || (e(t.target), n(t.target), o(t.target)));
                        });
                    }),
                    { root: u, rootMargin: l, threshold: c }
                )),
            {
                observe: function () {
                    for (
                        var e = (function (e) {
                                var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : document;
                                return e instanceof Element ? [e] : e instanceof NodeList ? e : t.querySelectorAll(e);
                            })(i, u),
                            t = 0;
                        t < e.length;
                        t++
                    )
                        r(e[t]) || (p ? p.observe(e[t]) : (d(e[t]), n(e[t]), f(e[t])));
                },
                triggerLoad: function (e) {
                    r(e) || (d(e), n(e), f(e));
                },
                observer: p,
            }
        );
    };
});
var autoComplete = function (e) {
    function t(e, t) {
        return e.classList ? e.classList.contains(t) : new RegExp("\\b" + t + "\\b").test(e.className);
    }
    function n(e, t, n) {
        e.attachEvent ? e.attachEvent("on" + t, n) : e.addEventListener(t, n);
    }
    function r(e, t, n) {
        e.detachEvent ? e.detachEvent("on" + t, n) : e.removeEventListener(t, n);
    }
    function o(e, r, o, i) {
        n(i || document, r, function (n) {
            for (var r, i = n.target || n.srcElement; i && !(r = t(i, e)); ) i = i.parentElement;
            r && o.call(i, n);
        });
    }
    if (document.querySelector) {
        var i = {
            selector: 0,
            source: 0,
            minChars: 1,
            delay: 10,
            offsetLeft: 0,
            offsetTop: 1,
            cache: 1,
            menuClass: "",
            renderItem: function (e, t, n) {
                var r = e.replace(t, "<b>" + t + "</b>");
                let o = "" != n ? '<img class="searchimg" height="20px" width="20px" src="' + n + '">' : '<span class="noimgs"></span>';
                return r.length, '<div class="autocomplete-suggestion" data-val="' + e + '"><span class="keywords">' + o + r + '</span><a href="javascript:void(0);">&nbsp;</a></div>';
            },
            onSelect: function (e, t, n) {},
        };
        for (var s in e) e.hasOwnProperty(s) && (i[s] = e[s]);
        for (var a = "object" == typeof i.selector ? [i.selector] : document.querySelectorAll(i.selector), u = 0; u < a.length; u++) {
            var l = a[u];
            document.getElementsByClassName("autocomplete-suggestions").length ? ((l.sc = document.getElementsByClassName("autocomplete-suggestions")[0]), (l.sc.innerHTML = "")) : (l.sc = document.createElement("div")),
                (l.sc.className = "autocomplete-suggestions " + i.menuClass),
                (l.autocompleteAttr = l.getAttribute("autocomplete")),
                l.setAttribute("autocomplete", "off"),
                (l.cache = {}),
                (l.last_val = ""),
                (l.updateSC = function (e, t) {
                    var n = l.getBoundingClientRect();
                    if (
                        ((l.sc.style.left = Math.round(n.left + (window.pageXOffset || document.documentElement.scrollLeft) + i.offsetLeft) + "px"),
                        (l.sc.style.right = Math.round(n.right + (window.pageXOffset || document.documentElement.scrollRight) + i.offsetRight) + "px"),
                        (l.sc.style.top = Math.round(n.bottom + 7 + (window.pageYOffset || document.documentElement.scrollTop) + i.offsetTop) + "px"),
                        (l.sc.style.width = Math.round(n.right - n.left + 33) + "px"),
                        !e &&
                            ((l.sc.style.display = "block"),
                            l.sc.maxHeight || (l.sc.maxHeight = parseInt((window.getComputedStyle ? getComputedStyle(l.sc, null) : l.sc.currentStyle).maxHeight)),
                            l.sc.suggestionHeight || (l.sc.suggestionHeight = l.sc.querySelector(".autocomplete-suggestion").offsetHeight),
                            l.sc.suggestionHeight))
                    )
                        if (t) {
                            var r = l.sc.scrollTop,
                                o = t.getBoundingClientRect().top - l.sc.getBoundingClientRect().top;
                            o + l.sc.suggestionHeight - l.sc.maxHeight > 0 ? (l.sc.scrollTop = o + l.sc.suggestionHeight + r - l.sc.maxHeight) : 0 > o && (l.sc.scrollTop = o + r);
                        } else l.sc.scrollTop = 0;
                }),
                n(window, "resize", l.updateSC),
                document.body.appendChild(l.sc),
                o(
                    "autocomplete-suggestion",
                    "mouseleave",
                    function (e) {
                        var t = l.sc.querySelector(".autocomplete-suggestion.selected");
                        t &&
                            setTimeout(function () {
                                t.className = "autocomplete-suggestion";
                            }, 20);
                    },
                    l.sc
                ),
                o(
                    "autocomplete-suggestion",
                    "mouseout",
                    function (e) {
                        var t = l.sc.querySelector(".autocomplete-suggestion.selected");
                        t &&
                            setTimeout(function () {
                                t.className = "autocomplete-suggestion";
                            }, 20),
                            (this.className = "autocomplete-suggestion");
                    },
                    l.sc
                ),
                o(
                    "autocomplete-suggestion",
                    "mouseover",
                    function (e) {
                        var t = l.sc.querySelector(".autocomplete-suggestion.selected");
                        t && (t.className = "autocomplete-suggestion"), (this.className = "autocomplete-suggestion selected");
                    },
                    l.sc
                ),
                (l.blurHandler = function () {
                    try {
                        var e = document.querySelector(".autocomplete-suggestions:hover");
                    } catch (e) {
                        var e;
                    }
                    e
                        ? l !== document.activeElement &&
                          setTimeout(function () {
                              l.focus();
                          }, 20)
                        : ((l.last_val = l.value),
                          (l.sc.style.display = "none"),
                          setTimeout(function () {
                              l.sc.style.display = "none";
                          }, 200));
                }),
                n(l, "blur", l.blurHandler);
            var c = 0,
                d = function (e, t = []) {
                    var n = l.value;
                    if (c === n.length && 0 === e.length) return $(".autocomplete-suggestions ").css("display", "none").html("");
                    if (((c = n.length), (l.cache[n] = e), e.length && n.length >= i.minChars)) {
                        for (var r = "", o = 0; o < e.length; o++) r += i.renderItem(e[o], n, t[o]);
                        (l.sc.innerHTML = r), l.updateSC(0);
                    }
                };
            (l.keydownHandler = function (e) {
                var t,
                    n = window.event ? e.keyCode : e.which;
                if ((40 == n || 38 == n) && l.sc.innerHTML)
                    return (
                        (r = l.sc.querySelector(".autocomplete-suggestion.selected"))
                            ? (t = 40 == n ? r.nextSibling : r.previousSibling)
                                ? ((r.className = r.className.replace("selected", "")), (t.className += " selected"), (l.value = t.getAttribute("data-val")))
                                : ((r.className = r.className.replace("selected", "")), (l.value = l.last_val), (t = 0))
                            : (((t = 40 == n ? l.sc.querySelector(".autocomplete-suggestion") : l.sc.childNodes[l.sc.childNodes.length - 1]).className += " selected"), (l.value = t.getAttribute("data-val"))),
                        l.updateSC(0, t),
                        !1
                    );
                if (27 == n) (l.value = l.last_val), (l.sc.style.display = "none");
                else if (13 == n || 9 == n) {
                    var r;
                    (r = l.sc.querySelector(".autocomplete-suggestion.selected")) &&
                        "none" != l.sc.style.display &&
                        (i.onSelect(e, r.getAttribute("data-val"), r),
                        setTimeout(function () {
                            l.sc.style.display = "none";
                        }, 20));
                }
            }),
                n(l, "keydown", l.keydownHandler),
                (l.keyupHandler = function (e) {
                    var t = window.event ? e.keyCode : e.which;
                    if (!t || ((35 > t || t > 40) && 13 != t && 27 != t)) {
                        var n = l.value;
                        if (n.length >= i.minChars) {
                            if (n != l.last_val) {
                                if (((l.last_val = n), clearTimeout(l.timer), i.cache)) {
                                    if (n in l.cache) return void d(l.cache[n]);
                                    for (var r = 1; r < n.length - i.minChars; r++) {
                                        var o = n.slice(0, n.length - r);
                                        if (o in l.cache && !l.cache[o].length) return void d([]);
                                    }
                                }
                                l.timer = setTimeout(function () {
                                    i.source(n, d);
                                }, i.delay);
                            }
                        } else (l.last_val = n), (l.sc.style.display = "none");
                    }
                }),
                n(l, "keyup", l.keyupHandler),
                (l.focusHandler = function (e) {
                    (l.last_val = "\n"), l.keyupHandler(e);
                }),
                i.minChars || n(l, "focus", l.focusHandler);
        }
        (this.destroy = function () {
            for (var e = 0; e < a.length; e++) {
                var t = a[e];
                r(window, "resize", t.updateSC),
                    r(t, "blur", t.blurHandler),
                    r(t, "focus", t.focusHandler),
                    r(t, "keydown", t.keydownHandler),
                    r(t, "keyup", t.keyupHandler),
                    t.autocompleteAttr ? t.setAttribute("autocomplete", t.autocompleteAttr) : t.removeAttribute("autocomplete"),
                    document.body.removeChild(t.sc),
                    (t = null);
            }
        }),
            (this.updatesource = function (e, t = []) {
                d(e, t);
            });
    }
};
if (
    ("function" == typeof define && define.amd
        ? define("autoComplete", function () {
              return autoComplete;
          })
        : "undefined" != typeof module && module.exports
        ? (module.exports = autoComplete)
        : (window.autoComplete = autoComplete),
    (function (e, t) {
        "object" == typeof module && "object" == typeof module.exports
            ? (module.exports = e.document
                  ? t(e, !0)
                  : function (e) {
                        if (!e.document) throw new Error("jQuery requires a window with a document");
                        return t(e);
                    })
            : t(e);
    })("undefined" != typeof window ? window : this, function (e, t) {
        function n(e) {
            var t = !!e && "length" in e && e.length,
                n = Z.type(e);
            return "function" !== n && !Z.isWindow(e) && ("array" === n || 0 === t || ("number" == typeof t && t > 0 && t - 1 in e));
        }
        function r(e, t, n) {
            if (Z.isFunction(t))
                return Z.grep(e, function (e, r) {
                    return !!t.call(e, r, e) !== n;
                });
            if (t.nodeType)
                return Z.grep(e, function (e) {
                    return (e === t) !== n;
                });
            if ("string" == typeof t) {
                if (le.test(t)) return Z.filter(t, e, n);
                t = Z.filter(t, e);
            }
            return Z.grep(e, function (e) {
                return V.call(t, e) > -1 !== n;
            });
        }
        function o(e, t) {
            for (; (e = e[t]) && 1 !== e.nodeType; );
            return e;
        }
        function i() {
            z.removeEventListener("DOMContentLoaded", i), e.removeEventListener("load", i), Z.ready();
        }
        function s() {
            this.expando = Z.expando + s.uid++;
        }
        function a(e, t, n) {
            var r;
            if (void 0 === n && 1 === e.nodeType)
                if (((r = "data-" + t.replace(we, "-$&").toLowerCase()), "string" == typeof (n = e.getAttribute(r)))) {
                    try {
                        n = "true" === n || ("false" !== n && ("null" === n ? null : +n + "" === n ? +n : be.test(n) ? Z.parseJSON(n) : n));
                    } catch (e) {}
                    xe.set(e, t, n);
                } else n = void 0;
            return n;
        }
        function u(e, t, n, r) {
            var o,
                i = 1,
                s = 20,
                a = r
                    ? function () {
                          return r.cur();
                      }
                    : function () {
                          return Z.css(e, t, "");
                      },
                u = a(),
                l = (n && n[3]) || (Z.cssNumber[t] ? "" : "px"),
                c = (Z.cssNumber[t] || ("px" !== l && +u)) && Te.exec(Z.css(e, t));
            if (c && c[3] !== l) {
                (l = l || c[3]), (n = n || []), (c = +u || 1);
                do {
                    (c /= i = i || ".5"), Z.style(e, t, c + l);
                } while (i !== (i = a() / u) && 1 !== i && --s);
            }
            return n && ((c = +c || +u || 0), (o = n[1] ? c + (n[1] + 1) * n[2] : +n[2]), r && ((r.unit = l), (r.start = c), (r.end = o))), o;
        }
        function l(e, t) {
            var n = void 0 !== e.getElementsByTagName ? e.getElementsByTagName(t || "*") : void 0 !== e.querySelectorAll ? e.querySelectorAll(t || "*") : [];
            return void 0 === t || (t && Z.nodeName(e, t)) ? Z.merge([e], n) : n;
        }
        function c(e, t) {
            for (var n = 0, r = e.length; r > n; n++) ye.set(e[n], "globalEval", !t || ye.get(t[n], "globalEval"));
        }
        function d(e, t, n, r, o) {
            for (var i, s, a, u, d, f, p = t.createDocumentFragment(), h = [], g = 0, m = e.length; m > g; g++)
                if ((i = e[g]) || 0 === i)
                    if ("object" === Z.type(i)) Z.merge(h, i.nodeType ? [i] : i);
                    else if (Le.test(i)) {
                        for (s = s || p.appendChild(t.createElement("div")), a = (Ae.exec(i) || ["", ""])[1].toLowerCase(), u = je[a] || je._default, s.innerHTML = u[1] + Z.htmlPrefilter(i) + u[2], f = u[0]; f--; ) s = s.lastChild;
                        Z.merge(h, s.childNodes), ((s = p.firstChild).textContent = "");
                    } else h.push(t.createTextNode(i));
            for (p.textContent = "", g = 0; (i = h[g++]); )
                if (r && Z.inArray(i, r) > -1) o && o.push(i);
                else if (((d = Z.contains(i.ownerDocument, i)), (s = l(p.appendChild(i), "script")), d && c(s), n)) for (f = 0; (i = s[f++]); ) Ne.test(i.type || "") && n.push(i);
            return p;
        }
        function f() {
            return !0;
        }
        function p() {
            return !1;
        }
        function h() {
            try {
                return z.activeElement;
            } catch (e) {}
        }
        function g(e, t, n, r, o, i) {
            var s, a;
            if ("object" == typeof t) {
                for (a in ("string" != typeof n && ((r = r || n), (n = void 0)), t)) g(e, a, n, r, t[a], i);
                return e;
            }
            if ((null == r && null == o ? ((o = n), (r = n = void 0)) : null == o && ("string" == typeof n ? ((o = r), (r = void 0)) : ((o = r), (r = n), (n = void 0))), !1 === o)) o = p;
            else if (!o) return e;
            return (
                1 === i &&
                    ((s = o),
                    ((o = function (e) {
                        return Z().off(e), s.apply(this, arguments);
                    }).guid = s.guid || (s.guid = Z.guid++))),
                e.each(function () {
                    Z.event.add(this, t, o, r, n);
                })
            );
        }
        function m(e, t) {
            return Z.nodeName(e, "table") && Z.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e;
        }
        function v(e) {
            return (e.type = (null !== e.getAttribute("type")) + "/" + e.type), e;
        }
        function y(e) {
            var t = Fe.exec(e.type);
            return t ? (e.type = t[1]) : e.removeAttribute("type"), e;
        }
        function x(e, t) {
            var n, r, o, i, s, a, u, l;
            if (1 === t.nodeType) {
                if (ye.hasData(e) && ((i = ye.access(e)), (s = ye.set(t, i)), (l = i.events))) for (o in (delete s.handle, (s.events = {}), l)) for (n = 0, r = l[o].length; r > n; n++) Z.event.add(t, o, l[o][n]);
                xe.hasData(e) && ((a = xe.access(e)), (u = Z.extend({}, a)), xe.set(t, u));
            }
        }
        function b(e, t) {
            var n = t.nodeName.toLowerCase();
            "input" === n && Se.test(e.type) ? (t.checked = e.checked) : ("input" !== n && "textarea" !== n) || (t.defaultValue = e.defaultValue);
        }
        function w(e, t, n, r) {
            t = Q.apply([], t);
            var o,
                i,
                s,
                a,
                u,
                c,
                f = 0,
                p = e.length,
                h = p - 1,
                g = t[0],
                m = Z.isFunction(g);
            if (m || (p > 1 && "string" == typeof g && !K.checkClone && Re.test(g)))
                return e.each(function (o) {
                    var i = e.eq(o);
                    m && (t[0] = g.call(this, o, i.html())), w(i, t, n, r);
                });
            if (p && ((i = (o = d(t, e[0].ownerDocument, !1, e, r)).firstChild), 1 === o.childNodes.length && (o = i), i || r)) {
                for (a = (s = Z.map(l(o, "script"), v)).length; p > f; f++) (u = o), f !== h && ((u = Z.clone(u, !0, !0)), a && Z.merge(s, l(u, "script"))), n.call(e[f], u, f);
                if (a)
                    for (c = s[s.length - 1].ownerDocument, Z.map(s, y), f = 0; a > f; f++)
                        (u = s[f]), Ne.test(u.type || "") && !ye.access(u, "globalEval") && Z.contains(c, u) && (u.src ? Z._evalUrl && Z._evalUrl(u.src) : Z.globalEval(u.textContent.replace(Me, "")));
            }
            return e;
        }
        function C(e, t, n) {
            for (var r, o = t ? Z.filter(t, e) : e, i = 0; null != (r = o[i]); i++) n || 1 !== r.nodeType || Z.cleanData(l(r)), r.parentNode && (n && Z.contains(r.ownerDocument, r) && c(l(r, "script")), r.parentNode.removeChild(r));
            return e;
        }
        function T(e, t) {
            var n = Z(t.createElement(e)).appendTo(t.body),
                r = Z.css(n[0], "display");
            return n.detach(), r;
        }
        function k(e) {
            var t = z,
                n = Pe[e];
            return (
                n || (("none" !== (n = T(e, t)) && n) || ((t = (Ie = (Ie || Z("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement))[0].contentDocument).write(), t.close(), (n = T(e, t)), Ie.detach()), (Pe[e] = n)),
                n
            );
        }
        function E(e, t, n) {
            var r,
                o,
                i,
                s,
                a = e.style;
            return (
                ("" !== (s = (n = n || _e(e)) ? n.getPropertyValue(t) || n[t] : void 0) && void 0 !== s) || Z.contains(e.ownerDocument, e) || (s = Z.style(e, t)),
                n && !K.pixelMarginRight() && Be.test(s) && We.test(t) && ((r = a.width), (o = a.minWidth), (i = a.maxWidth), (a.minWidth = a.maxWidth = a.width = s), (s = n.width), (a.width = r), (a.minWidth = o), (a.maxWidth = i)),
                void 0 !== s ? s + "" : s
            );
        }
        function S(e, t) {
            return {
                get: function () {
                    return e() ? void delete this.get : (this.get = t).apply(this, arguments);
                },
            };
        }
        function A(e) {
            if (e in Je) return e;
            for (var t = e[0].toUpperCase() + e.slice(1), n = Ye.length; n--; ) if ((e = Ye[n] + t) in Je) return e;
        }
        function N(e, t, n) {
            var r = Te.exec(t);
            return r ? Math.max(0, r[2] - (n || 0)) + (r[3] || "px") : t;
        }
        function j(e, t, n, r, o) {
            for (var i = n === (r ? "border" : "content") ? 4 : "width" === t ? 1 : 0, s = 0; 4 > i; i += 2)
                "margin" === n && (s += Z.css(e, n + ke[i], !0, o)),
                    r
                        ? ("content" === n && (s -= Z.css(e, "padding" + ke[i], !0, o)), "margin" !== n && (s -= Z.css(e, "border" + ke[i] + "Width", !0, o)))
                        : ((s += Z.css(e, "padding" + ke[i], !0, o)), "padding" !== n && (s += Z.css(e, "border" + ke[i] + "Width", !0, o)));
            return s;
        }
        function L(e, t, n) {
            var r = !0,
                o = "width" === t ? e.offsetWidth : e.offsetHeight,
                i = _e(e),
                s = "border-box" === Z.css(e, "boxSizing", !1, i);
            if (0 >= o || null == o) {
                if (((0 > (o = E(e, t, i)) || null == o) && (o = e.style[t]), Be.test(o))) return o;
                (r = s && (K.boxSizingReliable() || o === e.style[t])), (o = parseFloat(o) || 0);
            }
            return o + j(e, t, n || (s ? "border" : "content"), r, i) + "px";
        }
        function D(e, t) {
            for (var n, r, o, i = [], s = 0, a = e.length; a > s; s++)
                (r = e[s]).style &&
                    ((i[s] = ye.get(r, "olddisplay")),
                    (n = r.style.display),
                    t
                        ? (i[s] || "none" !== n || (r.style.display = ""), "" === r.style.display && Ee(r) && (i[s] = ye.access(r, "olddisplay", k(r.nodeName))))
                        : ((o = Ee(r)), ("none" === n && o) || ye.set(r, "olddisplay", o ? n : Z.css(r, "display"))));
            for (s = 0; a > s; s++) (r = e[s]).style && ((t && "none" !== r.style.display && "" !== r.style.display) || (r.style.display = t ? i[s] || "" : "none"));
            return e;
        }
        function $(e, t, n, r, o) {
            return new $.prototype.init(e, t, n, r, o);
        }
        function q() {
            return (
                e.setTimeout(function () {
                    Ge = void 0;
                }),
                (Ge = Z.now())
            );
        }
        function H(e, t) {
            var n,
                r = 0,
                o = { height: e };
            for (t = t ? 1 : 0; 4 > r; r += 2 - t) o["margin" + (n = ke[r])] = o["padding" + n] = e;
            return t && (o.opacity = o.width = e), o;
        }
        function O(e, t, n) {
            for (var r, o = (R.tweeners[t] || []).concat(R.tweeners["*"]), i = 0, s = o.length; s > i; i++) if ((r = o[i].call(n, t, e))) return r;
        }
        function R(e, t, n) {
            var r,
                o,
                i = 0,
                s = R.prefilters.length,
                a = Z.Deferred().always(function () {
                    delete u.elem;
                }),
                u = function () {
                    if (o) return !1;
                    for (var t = Ge || q(), n = Math.max(0, l.startTime + l.duration - t), r = 1 - (n / l.duration || 0), i = 0, s = l.tweens.length; s > i; i++) l.tweens[i].run(r);
                    return a.notifyWith(e, [l, r, n]), 1 > r && s ? n : (a.resolveWith(e, [l]), !1);
                },
                l = a.promise({
                    elem: e,
                    props: Z.extend({}, t),
                    opts: Z.extend(!0, { specialEasing: {}, easing: Z.easing._default }, n),
                    originalProperties: t,
                    originalOptions: n,
                    startTime: Ge || q(),
                    duration: n.duration,
                    tweens: [],
                    createTween: function (t, n) {
                        var r = Z.Tween(e, l.opts, t, n, l.opts.specialEasing[t] || l.opts.easing);
                        return l.tweens.push(r), r;
                    },
                    stop: function (t) {
                        var n = 0,
                            r = t ? l.tweens.length : 0;
                        if (o) return this;
                        for (o = !0; r > n; n++) l.tweens[n].run(1);
                        return t ? (a.notifyWith(e, [l, 1, 0]), a.resolveWith(e, [l, t])) : a.rejectWith(e, [l, t]), this;
                    },
                }),
                c = l.props;
            for (
                (function (e, t) {
                    var n, r, o, i, s;
                    for (n in e)
                        if (((o = t[(r = Z.camelCase(n))]), (i = e[n]), Z.isArray(i) && ((o = i[1]), (i = e[n] = i[0])), n !== r && ((e[r] = i), delete e[n]), (s = Z.cssHooks[r]) && ("expand" in s)))
                            for (n in ((i = s.expand(i)), delete e[r], i)) (n in e) || ((e[n] = i[n]), (t[n] = o));
                        else t[r] = o;
                })(c, l.opts.specialEasing);
                s > i;
                i++
            )
                if ((r = R.prefilters[i].call(l, e, c, l.opts))) return Z.isFunction(r.stop) && (Z._queueHooks(l.elem, l.opts.queue).stop = Z.proxy(r.stop, r)), r;
            return (
                Z.map(c, O, l),
                Z.isFunction(l.opts.start) && l.opts.start.call(e, l),
                Z.fx.timer(Z.extend(u, { elem: e, anim: l, queue: l.opts.queue })),
                l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always)
            );
        }
        function F(e) {
            return (e.getAttribute && e.getAttribute("class")) || "";
        }
        function M(e) {
            return function (t, n) {
                "string" != typeof t && ((n = t), (t = "*"));
                var r,
                    o = 0,
                    i = t.toLowerCase().match(ge) || [];
                if (Z.isFunction(n)) for (; (r = i[o++]); ) "+" === r[0] ? ((r = r.slice(1) || "*"), (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n);
            };
        }
        function I(e, t, n, r) {
            function o(a) {
                var u;
                return (
                    (i[a] = !0),
                    Z.each(e[a] || [], function (e, a) {
                        var l = a(t, n, r);
                        return "string" != typeof l || s || i[l] ? (s ? !(u = l) : void 0) : (t.dataTypes.unshift(l), o(l), !1);
                    }),
                    u
                );
            }
            var i = {},
                s = e === yt;
            return o(t.dataTypes[0]) || (!i["*"] && o("*"));
        }
        function P(e, t) {
            var n,
                r,
                o = Z.ajaxSettings.flatOptions || {};
            for (n in t) void 0 !== t[n] && ((o[n] ? e : r || (r = {}))[n] = t[n]);
            return r && Z.extend(!0, e, r), e;
        }
        function W(e, t, n, r) {
            var o;
            if (Z.isArray(t))
                Z.each(t, function (t, o) {
                    n || Ct.test(e) ? r(e, o) : W(e + "[" + ("object" == typeof o && null != o ? t : "") + "]", o, n, r);
                });
            else if (n || "object" !== Z.type(t)) r(e, t);
            else for (o in t) W(e + "[" + o + "]", t[o], n, r);
        }
        function B(e) {
            return Z.isWindow(e) ? e : 9 === e.nodeType && e.defaultView;
        }
        var _ = [],
            z = e.document,
            X = _.slice,
            Q = _.concat,
            U = _.push,
            V = _.indexOf,
            Y = {},
            J = Y.toString,
            G = Y.hasOwnProperty,
            K = {},
            Z = function (e, t) {
                return new Z.fn.init(e, t);
            },
            ee = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
            te = /^-ms-/,
            ne = /-([\da-z])/gi,
            re = function (e, t) {
                return t.toUpperCase();
            };
        (Z.fn = Z.prototype = {
            jquery: "2.2.4",
            constructor: Z,
            selector: "",
            length: 0,
            toArray: function () {
                return X.call(this);
            },
            get: function (e) {
                return null != e ? (0 > e ? this[e + this.length] : this[e]) : X.call(this);
            },
            pushStack: function (e) {
                var t = Z.merge(this.constructor(), e);
                return (t.prevObject = this), (t.context = this.context), t;
            },
            each: function (e) {
                return Z.each(this, e);
            },
            map: function (e) {
                return this.pushStack(
                    Z.map(this, function (t, n) {
                        return e.call(t, n, t);
                    })
                );
            },
            slice: function () {
                return this.pushStack(X.apply(this, arguments));
            },
            first: function () {
                return this.eq(0);
            },
            last: function () {
                return this.eq(-1);
            },
            eq: function (e) {
                var t = this.length,
                    n = +e + (0 > e ? t : 0);
                return this.pushStack(n >= 0 && t > n ? [this[n]] : []);
            },
            end: function () {
                return this.prevObject || this.constructor();
            },
            push: U,
            sort: _.sort,
            splice: _.splice,
        }),
            (Z.extend = Z.fn.extend = function () {
                var e,
                    t,
                    n,
                    r,
                    o,
                    i,
                    s = arguments[0] || {},
                    a = 1,
                    u = arguments.length,
                    l = !1;
                for ("boolean" == typeof s && ((l = s), (s = arguments[a] || {}), a++), "object" == typeof s || Z.isFunction(s) || (s = {}), a === u && ((s = this), a--); u > a; a++)
                    if (null != (e = arguments[a]))
                        for (t in e)
                            (n = s[t]),
                                s !== (r = e[t]) &&
                                    (l && r && (Z.isPlainObject(r) || (o = Z.isArray(r)))
                                        ? (o ? ((o = !1), (i = n && Z.isArray(n) ? n : [])) : (i = n && Z.isPlainObject(n) ? n : {}), (s[t] = Z.extend(l, i, r)))
                                        : void 0 !== r && (s[t] = r));
                return s;
            }),
            Z.extend({
                expando: "jQuery" + ("2.2.4" + Math.random()).replace(/\D/g, ""),
                isReady: !0,
                error: function (e) {
                    throw new Error(e);
                },
                noop: function () {},
                isFunction: function (e) {
                    return "function" === Z.type(e);
                },
                isArray: Array.isArray,
                isWindow: function (e) {
                    return null != e && e === e.window;
                },
                isNumeric: function (e) {
                    var t = e && e.toString();
                    return !Z.isArray(e) && t - parseFloat(t) + 1 >= 0;
                },
                isPlainObject: function (e) {
                    var t;
                    if ("object" !== Z.type(e) || e.nodeType || Z.isWindow(e)) return !1;
                    if (e.constructor && !G.call(e, "constructor") && !G.call(e.constructor.prototype || {}, "isPrototypeOf")) return !1;
                    for (t in e);
                    return void 0 === t || G.call(e, t);
                },
                isEmptyObject: function (e) {
                    var t;
                    for (t in e) return !1;
                    return !0;
                },
                type: function (e) {
                    return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? Y[J.call(e)] || "object" : typeof e;
                },
                globalEval: function (e) {
                    var t,
                        n = eval;
                    (e = Z.trim(e)) && (1 === e.indexOf("use strict") ? (((t = z.createElement("script")).text = e), z.head.appendChild(t).parentNode.removeChild(t)) : n(e));
                },
                camelCase: function (e) {
                    return e.replace(te, "ms-").replace(ne, re);
                },
                nodeName: function (e, t) {
                    return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase();
                },
                each: function (e, t) {
                    var r,
                        o = 0;
                    if (n(e)) for (r = e.length; r > o && !1 !== t.call(e[o], o, e[o]); o++);
                    else for (o in e) if (!1 === t.call(e[o], o, e[o])) break;
                    return e;
                },
                trim: function (e) {
                    return null == e ? "" : (e + "").replace(ee, "");
                },
                makeArray: function (e, t) {
                    var r = t || [];
                    return null != e && (n(Object(e)) ? Z.merge(r, "string" == typeof e ? [e] : e) : U.call(r, e)), r;
                },
                inArray: function (e, t, n) {
                    return null == t ? -1 : V.call(t, e, n);
                },
                merge: function (e, t) {
                    for (var n = +t.length, r = 0, o = e.length; n > r; r++) e[o++] = t[r];
                    return (e.length = o), e;
                },
                grep: function (e, t, n) {
                    for (var r = [], o = 0, i = e.length, s = !n; i > o; o++) !t(e[o], o) !== s && r.push(e[o]);
                    return r;
                },
                map: function (e, t, r) {
                    var o,
                        i,
                        s = 0,
                        a = [];
                    if (n(e)) for (o = e.length; o > s; s++) null != (i = t(e[s], s, r)) && a.push(i);
                    else for (s in e) null != (i = t(e[s], s, r)) && a.push(i);
                    return Q.apply([], a);
                },
                guid: 1,
                proxy: function (e, t) {
                    var n, r, o;
                    return (
                        "string" == typeof t && ((n = e[t]), (t = e), (e = n)),
                        Z.isFunction(e)
                            ? ((r = X.call(arguments, 2)),
                              ((o = function () {
                                  return e.apply(t || this, r.concat(X.call(arguments)));
                              }).guid = e.guid = e.guid || Z.guid++),
                              o)
                            : void 0
                    );
                },
                now: Date.now,
                support: K,
            }),
            "function" == typeof Symbol && (Z.fn[Symbol.iterator] = _[Symbol.iterator]),
            Z.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (e, t) {
                Y["[object " + t + "]"] = t.toLowerCase();
            });
        var oe = (function (e) {
            function t(e, t, n, r) {
                var o,
                    i,
                    s,
                    a,
                    u,
                    l,
                    d,
                    p,
                    h = t && t.ownerDocument,
                    g = t ? t.nodeType : 9;
                if (((n = n || []), "string" != typeof e || !e || (1 !== g && 9 !== g && 11 !== g))) return n;
                if (!r && ((t ? t.ownerDocument || t : P) !== $ && D(t), (t = t || $), H)) {
                    if (11 !== g && (l = ve.exec(e)))
                        if ((o = l[1])) {
                            if (9 === g) {
                                if (!(s = t.getElementById(o))) return n;
                                if (s.id === o) return n.push(s), n;
                            } else if (h && (s = h.getElementById(o)) && M(t, s) && s.id === o) return n.push(s), n;
                        } else {
                            if (l[2]) return K.apply(n, t.getElementsByTagName(e)), n;
                            if ((o = l[3]) && w.getElementsByClassName && t.getElementsByClassName) return K.apply(n, t.getElementsByClassName(o)), n;
                        }
                    if (w.qsa && !X[e + " "] && (!O || !O.test(e))) {
                        if (1 !== g) (h = t), (p = e);
                        else if ("object" !== t.nodeName.toLowerCase()) {
                            for ((a = t.getAttribute("id")) ? (a = a.replace(xe, "\\$&")) : t.setAttribute("id", (a = I)), i = (d = E(e)).length, u = fe.test(a) ? "#" + a : "[id='" + a + "']"; i--; ) d[i] = u + " " + f(d[i]);
                            (p = d.join(",")), (h = (ye.test(e) && c(t.parentNode)) || t);
                        }
                        if (p)
                            try {
                                return K.apply(n, h.querySelectorAll(p)), n;
                            } catch (e) {
                            } finally {
                                a === I && t.removeAttribute("id");
                            }
                    }
                }
                return A(e.replace(ae, "$1"), t, n, r);
            }
            function n() {
                var e = [];
                return function t(n, r) {
                    return e.push(n + " ") > C.cacheLength && delete t[e.shift()], (t[n + " "] = r);
                };
            }
            function r(e) {
                return (e[I] = !0), e;
            }
            function o(e) {
                var t = $.createElement("div");
                try {
                    return !!e(t);
                } catch (e) {
                    return !1;
                } finally {
                    t.parentNode && t.parentNode.removeChild(t), (t = null);
                }
            }
            function i(e, t) {
                for (var n = e.split("|"), r = n.length; r--; ) C.attrHandle[n[r]] = t;
            }
            function s(e, t) {
                var n = t && e,
                    r = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || U) - (~e.sourceIndex || U);
                if (r) return r;
                if (n) for (; (n = n.nextSibling); ) if (n === t) return -1;
                return e ? 1 : -1;
            }
            function a(e) {
                return function (t) {
                    return "input" === t.nodeName.toLowerCase() && t.type === e;
                };
            }
            function u(e) {
                return function (t) {
                    var n = t.nodeName.toLowerCase();
                    return ("input" === n || "button" === n) && t.type === e;
                };
            }
            function l(e) {
                return r(function (t) {
                    return (
                        (t = +t),
                        r(function (n, r) {
                            for (var o, i = e([], n.length, t), s = i.length; s--; ) n[(o = i[s])] && (n[o] = !(r[o] = n[o]));
                        })
                    );
                });
            }
            function c(e) {
                return e && void 0 !== e.getElementsByTagName && e;
            }
            function d() {}
            function f(e) {
                for (var t = 0, n = e.length, r = ""; n > t; t++) r += e[t].value;
                return r;
            }
            function p(e, t, n) {
                var r = t.dir,
                    o = n && "parentNode" === r,
                    i = B++;
                return t.first
                    ? function (t, n, i) {
                          for (; (t = t[r]); ) if (1 === t.nodeType || o) return e(t, n, i);
                      }
                    : function (t, n, s) {
                          var a,
                              u,
                              l,
                              c = [W, i];
                          if (s) {
                              for (; (t = t[r]); ) if ((1 === t.nodeType || o) && e(t, n, s)) return !0;
                          } else
                              for (; (t = t[r]); )
                                  if (1 === t.nodeType || o) {
                                      if ((a = (u = (l = t[I] || (t[I] = {}))[t.uniqueID] || (l[t.uniqueID] = {}))[r]) && a[0] === W && a[1] === i) return (c[2] = a[2]);
                                      if (((u[r] = c), (c[2] = e(t, n, s)))) return !0;
                                  }
                      };
            }
            function h(e) {
                return e.length > 1
                    ? function (t, n, r) {
                          for (var o = e.length; o--; ) if (!e[o](t, n, r)) return !1;
                          return !0;
                      }
                    : e[0];
            }
            function g(e, n, r) {
                for (var o = 0, i = n.length; i > o; o++) t(e, n[o], r);
                return r;
            }
            function m(e, t, n, r, o) {
                for (var i, s = [], a = 0, u = e.length, l = null != t; u > a; a++) (i = e[a]) && ((n && !n(i, r, o)) || (s.push(i), l && t.push(a)));
                return s;
            }
            function v(e, t, n, o, i, s) {
                return (
                    o && !o[I] && (o = v(o)),
                    i && !i[I] && (i = v(i, s)),
                    r(function (r, s, a, u) {
                        var l,
                            c,
                            d,
                            f = [],
                            p = [],
                            h = s.length,
                            v = r || g(t || "*", a.nodeType ? [a] : a, []),
                            y = !e || (!r && t) ? v : m(v, f, e, a, u),
                            x = n ? (i || (r ? e : h || o) ? [] : s) : y;
                        if ((n && n(y, x, a, u), o)) for (l = m(x, p), o(l, [], a, u), c = l.length; c--; ) (d = l[c]) && (x[p[c]] = !(y[p[c]] = d));
                        if (r) {
                            if (i || e) {
                                if (i) {
                                    for (l = [], c = x.length; c--; ) (d = x[c]) && l.push((y[c] = d));
                                    i(null, (x = []), l, u);
                                }
                                for (c = x.length; c--; ) (d = x[c]) && (l = i ? ee(r, d) : f[c]) > -1 && (r[l] = !(s[l] = d));
                            }
                        } else (x = m(x === s ? x.splice(h, x.length) : x)), i ? i(null, s, x, u) : K.apply(s, x);
                    })
                );
            }
            function y(e) {
                for (
                    var t,
                        n,
                        r,
                        o = e.length,
                        i = C.relative[e[0].type],
                        s = i || C.relative[" "],
                        a = i ? 1 : 0,
                        u = p(
                            function (e) {
                                return e === t;
                            },
                            s,
                            !0
                        ),
                        l = p(
                            function (e) {
                                return ee(t, e) > -1;
                            },
                            s,
                            !0
                        ),
                        c = [
                            function (e, n, r) {
                                var o = (!i && (r || n !== N)) || ((t = n).nodeType ? u(e, n, r) : l(e, n, r));
                                return (t = null), o;
                            },
                        ];
                    o > a;
                    a++
                )
                    if ((n = C.relative[e[a].type])) c = [p(h(c), n)];
                    else {
                        if ((n = C.filter[e[a].type].apply(null, e[a].matches))[I]) {
                            for (r = ++a; o > r && !C.relative[e[r].type]; r++);
                            return v(a > 1 && h(c), a > 1 && f(e.slice(0, a - 1).concat({ value: " " === e[a - 2].type ? "*" : "" })).replace(ae, "$1"), n, r > a && y(e.slice(a, r)), o > r && y((e = e.slice(r))), o > r && f(e));
                        }
                        c.push(n);
                    }
                return h(c);
            }
            function x(e, n) {
                var o = n.length > 0,
                    i = e.length > 0,
                    s = function (r, s, a, u, l) {
                        var c,
                            d,
                            f,
                            p = 0,
                            h = "0",
                            g = r && [],
                            v = [],
                            y = N,
                            x = r || (i && C.find.TAG("*", l)),
                            b = (W += null == y ? 1 : Math.random() || 0.1),
                            w = x.length;
                        for (l && (N = s === $ || s || l); h !== w && null != (c = x[h]); h++) {
                            if (i && c) {
                                for (d = 0, s || c.ownerDocument === $ || (D(c), (a = !H)); (f = e[d++]); )
                                    if (f(c, s || $, a)) {
                                        u.push(c);
                                        break;
                                    }
                                l && (W = b);
                            }
                            o && ((c = !f && c) && p--, r && g.push(c));
                        }
                        if (((p += h), o && h !== p)) {
                            for (d = 0; (f = n[d++]); ) f(g, v, s, a);
                            if (r) {
                                if (p > 0) for (; h--; ) g[h] || v[h] || (v[h] = J.call(u));
                                v = m(v);
                            }
                            K.apply(u, v), l && !r && v.length > 0 && p + n.length > 1 && t.uniqueSort(u);
                        }
                        return l && ((W = b), (N = y)), g;
                    };
                return o ? r(s) : s;
            }
            var b,
                w,
                C,
                T,
                k,
                E,
                S,
                A,
                N,
                j,
                L,
                D,
                $,
                q,
                H,
                O,
                R,
                F,
                M,
                I = "sizzle" + 1 * new Date(),
                P = e.document,
                W = 0,
                B = 0,
                _ = n(),
                z = n(),
                X = n(),
                Q = function (e, t) {
                    return e === t && (L = !0), 0;
                },
                U = 1 << 31,
                V = {}.hasOwnProperty,
                Y = [],
                J = Y.pop,
                G = Y.push,
                K = Y.push,
                Z = Y.slice,
                ee = function (e, t) {
                    for (var n = 0, r = e.length; r > n; n++) if (e[n] === t) return n;
                    return -1;
                },
                te = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                ne = "[\\x20\\t\\r\\n\\f]",
                re = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
                oe = "\\[" + ne + "*(" + re + ")(?:" + ne + "*([*^$|!~]?=)" + ne + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + re + "))|)" + ne + "*\\]",
                ie = ":(" + re + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + oe + ")*)|.*)\\)|)",
                se = new RegExp(ne + "+", "g"),
                ae = new RegExp("^" + ne + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ne + "+$", "g"),
                ue = new RegExp("^" + ne + "*," + ne + "*"),
                le = new RegExp("^" + ne + "*([>+~]|" + ne + ")" + ne + "*"),
                ce = new RegExp("=" + ne + "*([^\\]'\"]*?)" + ne + "*\\]", "g"),
                de = new RegExp(ie),
                fe = new RegExp("^" + re + "$"),
                pe = {
                    ID: new RegExp("^#(" + re + ")"),
                    CLASS: new RegExp("^\\.(" + re + ")"),
                    TAG: new RegExp("^(" + re + "|[*])"),
                    ATTR: new RegExp("^" + oe),
                    PSEUDO: new RegExp("^" + ie),
                    CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ne + "*(even|odd|(([+-]|)(\\d*)n|)" + ne + "*(?:([+-]|)" + ne + "*(\\d+)|))" + ne + "*\\)|)", "i"),
                    bool: new RegExp("^(?:" + te + ")$", "i"),
                    needsContext: new RegExp("^" + ne + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ne + "*((?:-\\d)?\\d*)" + ne + "*\\)|)(?=[^-]|$)", "i"),
                },
                he = /^(?:input|select|textarea|button)$/i,
                ge = /^h\d$/i,
                me = /^[^{]+\{\s*\[native \w/,
                ve = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                ye = /[+~]/,
                xe = /'|\\/g,
                be = new RegExp("\\\\([\\da-f]{1,6}" + ne + "?|(" + ne + ")|.)", "ig"),
                we = function (e, t, n) {
                    var r = "0x" + t - 65536;
                    return r != r || n ? t : 0 > r ? String.fromCharCode(r + 65536) : String.fromCharCode((r >> 10) | 55296, (1023 & r) | 56320);
                },
                Ce = function () {
                    D();
                };
            try {
                K.apply((Y = Z.call(P.childNodes)), P.childNodes), Y[P.childNodes.length].nodeType;
            } catch (e) {
                K = {
                    apply: Y.length
                        ? function (e, t) {
                              G.apply(e, Z.call(t));
                          }
                        : function (e, t) {
                              for (var n = e.length, r = 0; (e[n++] = t[r++]); );
                              e.length = n - 1;
                          },
                };
            }
            for (b in ((w = t.support = {}),
            (k = t.isXML = function (e) {
                var t = e && (e.ownerDocument || e).documentElement;
                return !!t && "HTML" !== t.nodeName;
            }),
            (D = t.setDocument = function (e) {
                var t,
                    n,
                    r = e ? e.ownerDocument || e : P;
                return r !== $ && 9 === r.nodeType && r.documentElement
                    ? ((q = ($ = r).documentElement),
                      (H = !k($)),
                      (n = $.defaultView) && n.top !== n && (n.addEventListener ? n.addEventListener("unload", Ce, !1) : n.attachEvent && n.attachEvent("onunload", Ce)),
                      (w.attributes = o(function (e) {
                          return (e.className = "i"), !e.getAttribute("className");
                      })),
                      (w.getElementsByTagName = o(function (e) {
                          return e.appendChild($.createComment("")), !e.getElementsByTagName("*").length;
                      })),
                      (w.getElementsByClassName = me.test($.getElementsByClassName)),
                      (w.getById = o(function (e) {
                          return (q.appendChild(e).id = I), !$.getElementsByName || !$.getElementsByName(I).length;
                      })),
                      w.getById
                          ? ((C.find.ID = function (e, t) {
                                if (void 0 !== t.getElementById && H) {
                                    var n = t.getElementById(e);
                                    return n ? [n] : [];
                                }
                            }),
                            (C.filter.ID = function (e) {
                                var t = e.replace(be, we);
                                return function (e) {
                                    return e.getAttribute("id") === t;
                                };
                            }))
                          : (delete C.find.ID,
                            (C.filter.ID = function (e) {
                                var t = e.replace(be, we);
                                return function (e) {
                                    var n = void 0 !== e.getAttributeNode && e.getAttributeNode("id");
                                    return n && n.value === t;
                                };
                            })),
                      (C.find.TAG = w.getElementsByTagName
                          ? function (e, t) {
                                return void 0 !== t.getElementsByTagName ? t.getElementsByTagName(e) : w.qsa ? t.querySelectorAll(e) : void 0;
                            }
                          : function (e, t) {
                                var n,
                                    r = [],
                                    o = 0,
                                    i = t.getElementsByTagName(e);
                                if ("*" === e) {
                                    for (; (n = i[o++]); ) 1 === n.nodeType && r.push(n);
                                    return r;
                                }
                                return i;
                            }),
                      (C.find.CLASS =
                          w.getElementsByClassName &&
                          function (e, t) {
                              return void 0 !== t.getElementsByClassName && H ? t.getElementsByClassName(e) : void 0;
                          }),
                      (R = []),
                      (O = []),
                      (w.qsa = me.test($.querySelectorAll)) &&
                          (o(function (e) {
                              (q.appendChild(e).innerHTML = "<a id='" + I + "'></a><select id='" + I + "-\r\\' msallowcapture=''><option selected=''></option></select>"),
                                  e.querySelectorAll("[msallowcapture^='']").length && O.push("[*^$]=" + ne + "*(?:''|\"\")"),
                                  e.querySelectorAll("[selected]").length || O.push("\\[" + ne + "*(?:value|" + te + ")"),
                                  e.querySelectorAll("[id~=" + I + "-]").length || O.push("~="),
                                  e.querySelectorAll(":checked").length || O.push(":checked"),
                                  e.querySelectorAll("a#" + I + "+*").length || O.push(".#.+[+~]");
                          }),
                          o(function (e) {
                              var t = $.createElement("input");
                              t.setAttribute("type", "hidden"),
                                  e.appendChild(t).setAttribute("name", "D"),
                                  e.querySelectorAll("[name=d]").length && O.push("name" + ne + "*[*^$|!~]?="),
                                  e.querySelectorAll(":enabled").length || O.push(":enabled", ":disabled"),
                                  e.querySelectorAll("*,:x"),
                                  O.push(",.*:");
                          })),
                      (w.matchesSelector = me.test((F = q.matches || q.webkitMatchesSelector || q.mozMatchesSelector || q.oMatchesSelector || q.msMatchesSelector))) &&
                          o(function (e) {
                              (w.disconnectedMatch = F.call(e, "div")), F.call(e, "[s!='']:x"), R.push("!=", ie);
                          }),
                      (O = O.length && new RegExp(O.join("|"))),
                      (R = R.length && new RegExp(R.join("|"))),
                      (t = me.test(q.compareDocumentPosition)),
                      (M =
                          t || me.test(q.contains)
                              ? function (e, t) {
                                    var n = 9 === e.nodeType ? e.documentElement : e,
                                        r = t && t.parentNode;
                                    return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)));
                                }
                              : function (e, t) {
                                    if (t) for (; (t = t.parentNode); ) if (t === e) return !0;
                                    return !1;
                                }),
                      (Q = t
                          ? function (e, t) {
                                if (e === t) return (L = !0), 0;
                                var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
                                return (
                                    n ||
                                    (1 & (n = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1) || (!w.sortDetached && t.compareDocumentPosition(e) === n)
                                        ? e === $ || (e.ownerDocument === P && M(P, e))
                                            ? -1
                                            : t === $ || (t.ownerDocument === P && M(P, t))
                                            ? 1
                                            : j
                                            ? ee(j, e) - ee(j, t)
                                            : 0
                                        : 4 & n
                                        ? -1
                                        : 1)
                                );
                            }
                          : function (e, t) {
                                if (e === t) return (L = !0), 0;
                                var n,
                                    r = 0,
                                    o = e.parentNode,
                                    i = t.parentNode,
                                    a = [e],
                                    u = [t];
                                if (!o || !i) return e === $ ? -1 : t === $ ? 1 : o ? -1 : i ? 1 : j ? ee(j, e) - ee(j, t) : 0;
                                if (o === i) return s(e, t);
                                for (n = e; (n = n.parentNode); ) a.unshift(n);
                                for (n = t; (n = n.parentNode); ) u.unshift(n);
                                for (; a[r] === u[r]; ) r++;
                                return r ? s(a[r], u[r]) : a[r] === P ? -1 : u[r] === P ? 1 : 0;
                            }),
                      $)
                    : $;
            }),
            (t.matches = function (e, n) {
                return t(e, null, null, n);
            }),
            (t.matchesSelector = function (e, n) {
                if (((e.ownerDocument || e) !== $ && D(e), (n = n.replace(ce, "='$1']")), w.matchesSelector && H && !X[n + " "] && (!R || !R.test(n)) && (!O || !O.test(n))))
                    try {
                        var r = F.call(e, n);
                        if (r || w.disconnectedMatch || (e.document && 11 !== e.document.nodeType)) return r;
                    } catch (e) {}
                return t(n, $, null, [e]).length > 0;
            }),
            (t.contains = function (e, t) {
                return (e.ownerDocument || e) !== $ && D(e), M(e, t);
            }),
            (t.attr = function (e, t) {
                (e.ownerDocument || e) !== $ && D(e);
                var n = C.attrHandle[t.toLowerCase()],
                    r = n && V.call(C.attrHandle, t.toLowerCase()) ? n(e, t, !H) : void 0;
                return void 0 !== r ? r : w.attributes || !H ? e.getAttribute(t) : (r = e.getAttributeNode(t)) && r.specified ? r.value : null;
            }),
            (t.error = function (e) {
                throw new Error("Syntax error, unrecognized expression: " + e);
            }),
            (t.uniqueSort = function (e) {
                var t,
                    n = [],
                    r = 0,
                    o = 0;
                if (((L = !w.detectDuplicates), (j = !w.sortStable && e.slice(0)), e.sort(Q), L)) {
                    for (; (t = e[o++]); ) t === e[o] && (r = n.push(o));
                    for (; r--; ) e.splice(n[r], 1);
                }
                return (j = null), e;
            }),
            (T = t.getText = function (e) {
                var t,
                    n = "",
                    r = 0,
                    o = e.nodeType;
                if (o) {
                    if (1 === o || 9 === o || 11 === o) {
                        if ("string" == typeof e.textContent) return e.textContent;
                        for (e = e.firstChild; e; e = e.nextSibling) n += T(e);
                    } else if (3 === o || 4 === o) return e.nodeValue;
                } else for (; (t = e[r++]); ) n += T(t);
                return n;
            }),
            ((C = t.selectors = {
                cacheLength: 50,
                createPseudo: r,
                match: pe,
                attrHandle: {},
                find: {},
                relative: { ">": { dir: "parentNode", first: !0 }, " ": { dir: "parentNode" }, "+": { dir: "previousSibling", first: !0 }, "~": { dir: "previousSibling" } },
                preFilter: {
                    ATTR: function (e) {
                        return (e[1] = e[1].replace(be, we)), (e[3] = (e[3] || e[4] || e[5] || "").replace(be, we)), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4);
                    },
                    CHILD: function (e) {
                        return (
                            (e[1] = e[1].toLowerCase()),
                            "nth" === e[1].slice(0, 3) ? (e[3] || t.error(e[0]), (e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3]))), (e[5] = +(e[7] + e[8] || "odd" === e[3]))) : e[3] && t.error(e[0]),
                            e
                        );
                    },
                    PSEUDO: function (e) {
                        var t,
                            n = !e[6] && e[2];
                        return pe.CHILD.test(e[0])
                            ? null
                            : (e[3] ? (e[2] = e[4] || e[5] || "") : n && de.test(n) && (t = E(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && ((e[0] = e[0].slice(0, t)), (e[2] = n.slice(0, t))), e.slice(0, 3));
                    },
                },
                filter: {
                    TAG: function (e) {
                        var t = e.replace(be, we).toLowerCase();
                        return "*" === e
                            ? function () {
                                  return !0;
                              }
                            : function (e) {
                                  return e.nodeName && e.nodeName.toLowerCase() === t;
                              };
                    },
                    CLASS: function (e) {
                        var t = _[e + " "];
                        return (
                            t ||
                            ((t = new RegExp("(^|" + ne + ")" + e + "(" + ne + "|$)")) &&
                                _(e, function (e) {
                                    return t.test(("string" == typeof e.className && e.className) || (void 0 !== e.getAttribute && e.getAttribute("class")) || "");
                                }))
                        );
                    },
                    ATTR: function (e, n, r) {
                        return function (o) {
                            var i = t.attr(o, e);
                            return null == i
                                ? "!=" === n
                                : !n ||
                                      ((i += ""),
                                      "=" === n
                                          ? i === r
                                          : "!=" === n
                                          ? i !== r
                                          : "^=" === n
                                          ? r && 0 === i.indexOf(r)
                                          : "*=" === n
                                          ? r && i.indexOf(r) > -1
                                          : "$=" === n
                                          ? r && i.slice(-r.length) === r
                                          : "~=" === n
                                          ? (" " + i.replace(se, " ") + " ").indexOf(r) > -1
                                          : "|=" === n && (i === r || i.slice(0, r.length + 1) === r + "-"));
                        };
                    },
                    CHILD: function (e, t, n, r, o) {
                        var i = "nth" !== e.slice(0, 3),
                            s = "last" !== e.slice(-4),
                            a = "of-type" === t;
                        return 1 === r && 0 === o
                            ? function (e) {
                                  return !!e.parentNode;
                              }
                            : function (t, n, u) {
                                  var l,
                                      c,
                                      d,
                                      f,
                                      p,
                                      h,
                                      g = i !== s ? "nextSibling" : "previousSibling",
                                      m = t.parentNode,
                                      v = a && t.nodeName.toLowerCase(),
                                      y = !u && !a,
                                      x = !1;
                                  if (m) {
                                      if (i) {
                                          for (; g; ) {
                                              for (f = t; (f = f[g]); ) if (a ? f.nodeName.toLowerCase() === v : 1 === f.nodeType) return !1;
                                              h = g = "only" === e && !h && "nextSibling";
                                          }
                                          return !0;
                                      }
                                      if (((h = [s ? m.firstChild : m.lastChild]), s && y)) {
                                          for (
                                              x = (p = (l = (c = (d = (f = m)[I] || (f[I] = {}))[f.uniqueID] || (d[f.uniqueID] = {}))[e] || [])[0] === W && l[1]) && l[2], f = p && m.childNodes[p];
                                              (f = (++p && f && f[g]) || (x = p = 0) || h.pop());

                                          )
                                              if (1 === f.nodeType && ++x && f === t) {
                                                  c[e] = [W, p, x];
                                                  break;
                                              }
                                      } else if ((y && (x = p = (l = (c = (d = (f = t)[I] || (f[I] = {}))[f.uniqueID] || (d[f.uniqueID] = {}))[e] || [])[0] === W && l[1]), !1 === x))
                                          for (
                                              ;
                                              (f = (++p && f && f[g]) || (x = p = 0) || h.pop()) &&
                                              ((a ? f.nodeName.toLowerCase() !== v : 1 !== f.nodeType) || !++x || (y && ((c = (d = f[I] || (f[I] = {}))[f.uniqueID] || (d[f.uniqueID] = {}))[e] = [W, x]), f !== t));

                                          );
                                      return (x -= o) === r || (x % r == 0 && x / r >= 0);
                                  }
                              };
                    },
                    PSEUDO: function (e, n) {
                        var o,
                            i = C.pseudos[e] || C.setFilters[e.toLowerCase()] || t.error("unsupported pseudo: " + e);
                        return i[I]
                            ? i(n)
                            : i.length > 1
                            ? ((o = [e, e, "", n]),
                              C.setFilters.hasOwnProperty(e.toLowerCase())
                                  ? r(function (e, t) {
                                        for (var r, o = i(e, n), s = o.length; s--; ) e[(r = ee(e, o[s]))] = !(t[r] = o[s]);
                                    })
                                  : function (e) {
                                        return i(e, 0, o);
                                    })
                            : i;
                    },
                },
                pseudos: {
                    not: r(function (e) {
                        var t = [],
                            n = [],
                            o = S(e.replace(ae, "$1"));
                        return o[I]
                            ? r(function (e, t, n, r) {
                                  for (var i, s = o(e, null, r, []), a = e.length; a--; ) (i = s[a]) && (e[a] = !(t[a] = i));
                              })
                            : function (e, r, i) {
                                  return (t[0] = e), o(t, null, i, n), (t[0] = null), !n.pop();
                              };
                    }),
                    has: r(function (e) {
                        return function (n) {
                            return t(e, n).length > 0;
                        };
                    }),
                    contains: r(function (e) {
                        return (
                            (e = e.replace(be, we)),
                            function (t) {
                                return (t.textContent || t.innerText || T(t)).indexOf(e) > -1;
                            }
                        );
                    }),
                    lang: r(function (e) {
                        return (
                            fe.test(e || "") || t.error("unsupported lang: " + e),
                            (e = e.replace(be, we).toLowerCase()),
                            function (t) {
                                var n;
                                do {
                                    if ((n = H ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang"))) return (n = n.toLowerCase()) === e || 0 === n.indexOf(e + "-");
                                } while ((t = t.parentNode) && 1 === t.nodeType);
                                return !1;
                            }
                        );
                    }),
                    target: function (t) {
                        var n = e.location && e.location.hash;
                        return n && n.slice(1) === t.id;
                    },
                    root: function (e) {
                        return e === q;
                    },
                    focus: function (e) {
                        return e === $.activeElement && (!$.hasFocus || $.hasFocus()) && !!(e.type || e.href || ~e.tabIndex);
                    },
                    enabled: function (e) {
                        return !1 === e.disabled;
                    },
                    disabled: function (e) {
                        return !0 === e.disabled;
                    },
                    checked: function (e) {
                        var t = e.nodeName.toLowerCase();
                        return ("input" === t && !!e.checked) || ("option" === t && !!e.selected);
                    },
                    selected: function (e) {
                        return e.parentNode && e.parentNode.selectedIndex, !0 === e.selected;
                    },
                    empty: function (e) {
                        for (e = e.firstChild; e; e = e.nextSibling) if (e.nodeType < 6) return !1;
                        return !0;
                    },
                    parent: function (e) {
                        return !C.pseudos.empty(e);
                    },
                    header: function (e) {
                        return ge.test(e.nodeName);
                    },
                    input: function (e) {
                        return he.test(e.nodeName);
                    },
                    button: function (e) {
                        var t = e.nodeName.toLowerCase();
                        return ("input" === t && "button" === e.type) || "button" === t;
                    },
                    text: function (e) {
                        var t;
                        return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase());
                    },
                    first: l(function () {
                        return [0];
                    }),
                    last: l(function (e, t) {
                        return [t - 1];
                    }),
                    eq: l(function (e, t, n) {
                        return [0 > n ? n + t : n];
                    }),
                    even: l(function (e, t) {
                        for (var n = 0; t > n; n += 2) e.push(n);
                        return e;
                    }),
                    odd: l(function (e, t) {
                        for (var n = 1; t > n; n += 2) e.push(n);
                        return e;
                    }),
                    lt: l(function (e, t, n) {
                        for (var r = 0 > n ? n + t : n; --r >= 0; ) e.push(r);
                        return e;
                    }),
                    gt: l(function (e, t, n) {
                        for (var r = 0 > n ? n + t : n; ++r < t; ) e.push(r);
                        return e;
                    }),
                },
            }).pseudos.nth = C.pseudos.eq),
            { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }))
                C.pseudos[b] = a(b);
            for (b in { submit: !0, reset: !0 }) C.pseudos[b] = u(b);
            return (
                (d.prototype = C.filters = C.pseudos),
                (C.setFilters = new d()),
                (E = t.tokenize = function (e, n) {
                    var r,
                        o,
                        i,
                        s,
                        a,
                        u,
                        l,
                        c = z[e + " "];
                    if (c) return n ? 0 : c.slice(0);
                    for (a = e, u = [], l = C.preFilter; a; ) {
                        for (s in ((r && !(o = ue.exec(a))) || (o && (a = a.slice(o[0].length) || a), u.push((i = []))),
                        (r = !1),
                        (o = le.exec(a)) && ((r = o.shift()), i.push({ value: r, type: o[0].replace(ae, " ") }), (a = a.slice(r.length))),
                        C.filter))
                            !(o = pe[s].exec(a)) || (l[s] && !(o = l[s](o))) || ((r = o.shift()), i.push({ value: r, type: s, matches: o }), (a = a.slice(r.length)));
                        if (!r) break;
                    }
                    return n ? a.length : a ? t.error(e) : z(e, u).slice(0);
                }),
                (S = t.compile = function (e, t) {
                    var n,
                        r = [],
                        o = [],
                        i = X[e + " "];
                    if (!i) {
                        for (t || (t = E(e)), n = t.length; n--; ) (i = y(t[n]))[I] ? r.push(i) : o.push(i);
                        (i = X(e, x(o, r))).selector = e;
                    }
                    return i;
                }),
                (A = t.select = function (e, t, n, r) {
                    var o,
                        i,
                        s,
                        a,
                        u,
                        l = "function" == typeof e && e,
                        d = !r && E((e = l.selector || e));
                    if (((n = n || []), 1 === d.length)) {
                        if ((i = d[0] = d[0].slice(0)).length > 2 && "ID" === (s = i[0]).type && w.getById && 9 === t.nodeType && H && C.relative[i[1].type]) {
                            if (!(t = (C.find.ID(s.matches[0].replace(be, we), t) || [])[0])) return n;
                            l && (t = t.parentNode), (e = e.slice(i.shift().value.length));
                        }
                        for (o = pe.needsContext.test(e) ? 0 : i.length; o-- && ((s = i[o]), !C.relative[(a = s.type)]); )
                            if ((u = C.find[a]) && (r = u(s.matches[0].replace(be, we), (ye.test(i[0].type) && c(t.parentNode)) || t))) {
                                if ((i.splice(o, 1), !(e = r.length && f(i)))) return K.apply(n, r), n;
                                break;
                            }
                    }
                    return (l || S(e, d))(r, t, !H, n, !t || (ye.test(e) && c(t.parentNode)) || t), n;
                }),
                (w.sortStable = I.split("").sort(Q).join("") === I),
                (w.detectDuplicates = !!L),
                D(),
                (w.sortDetached = o(function (e) {
                    return 1 & e.compareDocumentPosition($.createElement("div"));
                })),
                o(function (e) {
                    return (e.innerHTML = "<a href='#'></a>"), "#" === e.firstChild.getAttribute("href");
                }) ||
                    i("type|href|height|width", function (e, t, n) {
                        return n ? void 0 : e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2);
                    }),
                (w.attributes &&
                    o(function (e) {
                        return (e.innerHTML = "<input/>"), e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value");
                    })) ||
                    i("value", function (e, t, n) {
                        return n || "input" !== e.nodeName.toLowerCase() ? void 0 : e.defaultValue;
                    }),
                o(function (e) {
                    return null == e.getAttribute("disabled");
                }) ||
                    i(te, function (e, t, n) {
                        var r;
                        return n ? void 0 : !0 === e[t] ? t.toLowerCase() : (r = e.getAttributeNode(t)) && r.specified ? r.value : null;
                    }),
                t
            );
        })(e);
        (Z.find = oe), (Z.expr = oe.selectors), (Z.expr[":"] = Z.expr.pseudos), (Z.uniqueSort = Z.unique = oe.uniqueSort), (Z.text = oe.getText), (Z.isXMLDoc = oe.isXML), (Z.contains = oe.contains);
        var ie = function (e, t, n) {
                for (var r = [], o = void 0 !== n; (e = e[t]) && 9 !== e.nodeType; )
                    if (1 === e.nodeType) {
                        if (o && Z(e).is(n)) break;
                        r.push(e);
                    }
                return r;
            },
            se = function (e, t) {
                for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
                return n;
            },
            ae = Z.expr.match.needsContext,
            ue = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,
            le = /^.[^:#\[\.,]*$/;
        (Z.filter = function (e, t, n) {
            var r = t[0];
            return (
                n && (e = ":not(" + e + ")"),
                1 === t.length && 1 === r.nodeType
                    ? Z.find.matchesSelector(r, e)
                        ? [r]
                        : []
                    : Z.find.matches(
                          e,
                          Z.grep(t, function (e) {
                              return 1 === e.nodeType;
                          })
                      )
            );
        }),
            Z.fn.extend({
                find: function (e) {
                    var t,
                        n = this.length,
                        r = [],
                        o = this;
                    if ("string" != typeof e)
                        return this.pushStack(
                            Z(e).filter(function () {
                                for (t = 0; n > t; t++) if (Z.contains(o[t], this)) return !0;
                            })
                        );
                    for (t = 0; n > t; t++) Z.find(e, o[t], r);
                    return ((r = this.pushStack(n > 1 ? Z.unique(r) : r)).selector = this.selector ? this.selector + " " + e : e), r;
                },
                filter: function (e) {
                    return this.pushStack(r(this, e || [], !1));
                },
                not: function (e) {
                    return this.pushStack(r(this, e || [], !0));
                },
                is: function (e) {
                    return !!r(this, "string" == typeof e && ae.test(e) ? Z(e) : e || [], !1).length;
                },
            });
        var ce,
            de = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/;
        ((Z.fn.init = function (e, t, n) {
            var r, o;
            if (!e) return this;
            if (((n = n || ce), "string" == typeof e)) {
                if (!(r = "<" === e[0] && ">" === e[e.length - 1] && e.length >= 3 ? [null, e, null] : de.exec(e)) || (!r[1] && t)) return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
                if (r[1]) {
                    if (((t = t instanceof Z ? t[0] : t), Z.merge(this, Z.parseHTML(r[1], t && t.nodeType ? t.ownerDocument || t : z, !0)), ue.test(r[1]) && Z.isPlainObject(t)))
                        for (r in t) Z.isFunction(this[r]) ? this[r](t[r]) : this.attr(r, t[r]);
                    return this;
                }
                return (o = z.getElementById(r[2])) && o.parentNode && ((this.length = 1), (this[0] = o)), (this.context = z), (this.selector = e), this;
            }
            return e.nodeType
                ? ((this.context = this[0] = e), (this.length = 1), this)
                : Z.isFunction(e)
                ? void 0 !== n.ready
                    ? n.ready(e)
                    : e(Z)
                : (void 0 !== e.selector && ((this.selector = e.selector), (this.context = e.context)), Z.makeArray(e, this));
        }).prototype = Z.fn),
            (ce = Z(z));
        var fe = /^(?:parents|prev(?:Until|All))/,
            pe = { children: !0, contents: !0, next: !0, prev: !0 };
        Z.fn.extend({
            has: function (e) {
                var t = Z(e, this),
                    n = t.length;
                return this.filter(function () {
                    for (var e = 0; n > e; e++) if (Z.contains(this, t[e])) return !0;
                });
            },
            closest: function (e, t) {
                for (var n, r = 0, o = this.length, i = [], s = ae.test(e) || "string" != typeof e ? Z(e, t || this.context) : 0; o > r; r++)
                    for (n = this[r]; n && n !== t; n = n.parentNode)
                        if (n.nodeType < 11 && (s ? s.index(n) > -1 : 1 === n.nodeType && Z.find.matchesSelector(n, e))) {
                            i.push(n);
                            break;
                        }
                return this.pushStack(i.length > 1 ? Z.uniqueSort(i) : i);
            },
            index: function (e) {
                return e ? ("string" == typeof e ? V.call(Z(e), this[0]) : V.call(this, e.jquery ? e[0] : e)) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
            },
            add: function (e, t) {
                return this.pushStack(Z.uniqueSort(Z.merge(this.get(), Z(e, t))));
            },
            addBack: function (e) {
                return this.add(null == e ? this.prevObject : this.prevObject.filter(e));
            },
        }),
            Z.each(
                {
                    parent: function (e) {
                        var t = e.parentNode;
                        return t && 11 !== t.nodeType ? t : null;
                    },
                    parents: function (e) {
                        return ie(e, "parentNode");
                    },
                    parentsUntil: function (e, t, n) {
                        return ie(e, "parentNode", n);
                    },
                    next: function (e) {
                        return o(e, "nextSibling");
                    },
                    prev: function (e) {
                        return o(e, "previousSibling");
                    },
                    nextAll: function (e) {
                        return ie(e, "nextSibling");
                    },
                    prevAll: function (e) {
                        return ie(e, "previousSibling");
                    },
                    nextUntil: function (e, t, n) {
                        return ie(e, "nextSibling", n);
                    },
                    prevUntil: function (e, t, n) {
                        return ie(e, "previousSibling", n);
                    },
                    siblings: function (e) {
                        return se((e.parentNode || {}).firstChild, e);
                    },
                    children: function (e) {
                        return se(e.firstChild);
                    },
                    contents: function (e) {
                        return e.contentDocument || Z.merge([], e.childNodes);
                    },
                },
                function (e, t) {
                    Z.fn[e] = function (n, r) {
                        var o = Z.map(this, t, n);
                        return "Until" !== e.slice(-5) && (r = n), r && "string" == typeof r && (o = Z.filter(r, o)), this.length > 1 && (pe[e] || Z.uniqueSort(o), fe.test(e) && o.reverse()), this.pushStack(o);
                    };
                }
            );
        var he,
            ge = /\S+/g;
        (Z.Callbacks = function (e) {
            e =
                "string" == typeof e
                    ? (function (e) {
                          var t = {};
                          return (
                              Z.each(e.match(ge) || [], function (e, n) {
                                  t[n] = !0;
                              }),
                              t
                          );
                      })(e)
                    : Z.extend({}, e);
            var t,
                n,
                r,
                o,
                i = [],
                s = [],
                a = -1,
                u = function () {
                    for (o = e.once, r = t = !0; s.length; a = -1) for (n = s.shift(); ++a < i.length; ) !1 === i[a].apply(n[0], n[1]) && e.stopOnFalse && ((a = i.length), (n = !1));
                    e.memory || (n = !1), (t = !1), o && (i = n ? [] : "");
                },
                l = {
                    add: function () {
                        return (
                            i &&
                                (n && !t && ((a = i.length - 1), s.push(n)),
                                (function t(n) {
                                    Z.each(n, function (n, r) {
                                        Z.isFunction(r) ? (e.unique && l.has(r)) || i.push(r) : r && r.length && "string" !== Z.type(r) && t(r);
                                    });
                                })(arguments),
                                n && !t && u()),
                            this
                        );
                    },
                    remove: function () {
                        return (
                            Z.each(arguments, function (e, t) {
                                for (var n; (n = Z.inArray(t, i, n)) > -1; ) i.splice(n, 1), a >= n && a--;
                            }),
                            this
                        );
                    },
                    has: function (e) {
                        return e ? Z.inArray(e, i) > -1 : i.length > 0;
                    },
                    empty: function () {
                        return i && (i = []), this;
                    },
                    disable: function () {
                        return (o = s = []), (i = n = ""), this;
                    },
                    disabled: function () {
                        return !i;
                    },
                    lock: function () {
                        return (o = s = []), n || (i = n = ""), this;
                    },
                    locked: function () {
                        return !!o;
                    },
                    fireWith: function (e, n) {
                        return o || ((n = [e, (n = n || []).slice ? n.slice() : n]), s.push(n), t || u()), this;
                    },
                    fire: function () {
                        return l.fireWith(this, arguments), this;
                    },
                    fired: function () {
                        return !!r;
                    },
                };
            return l;
        }),
            Z.extend({
                Deferred: function (e) {
                    var t = [
                            ["resolve", "done", Z.Callbacks("once memory"), "resolved"],
                            ["reject", "fail", Z.Callbacks("once memory"), "rejected"],
                            ["notify", "progress", Z.Callbacks("memory")],
                        ],
                        n = "pending",
                        r = {
                            state: function () {
                                return n;
                            },
                            always: function () {
                                return o.done(arguments).fail(arguments), this;
                            },
                            then: function () {
                                var e = arguments;
                                return Z.Deferred(function (n) {
                                    Z.each(t, function (t, i) {
                                        var s = Z.isFunction(e[t]) && e[t];
                                        o[i[1]](function () {
                                            var e = s && s.apply(this, arguments);
                                            e && Z.isFunction(e.promise) ? e.promise().progress(n.notify).done(n.resolve).fail(n.reject) : n[i[0] + "With"](this === r ? n.promise() : this, s ? [e] : arguments);
                                        });
                                    }),
                                        (e = null);
                                }).promise();
                            },
                            promise: function (e) {
                                return null != e ? Z.extend(e, r) : r;
                            },
                        },
                        o = {};
                    return (
                        (r.pipe = r.then),
                        Z.each(t, function (e, i) {
                            var s = i[2],
                                a = i[3];
                            (r[i[1]] = s.add),
                                a &&
                                    s.add(
                                        function () {
                                            n = a;
                                        },
                                        t[1 ^ e][2].disable,
                                        t[2][2].lock
                                    ),
                                (o[i[0]] = function () {
                                    return o[i[0] + "With"](this === o ? r : this, arguments), this;
                                }),
                                (o[i[0] + "With"] = s.fireWith);
                        }),
                        r.promise(o),
                        e && e.call(o, o),
                        o
                    );
                },
                when: function (e) {
                    var t,
                        n,
                        r,
                        o = 0,
                        i = X.call(arguments),
                        s = i.length,
                        a = 1 !== s || (e && Z.isFunction(e.promise)) ? s : 0,
                        u = 1 === a ? e : Z.Deferred(),
                        l = function (e, n, r) {
                            return function (o) {
                                (n[e] = this), (r[e] = arguments.length > 1 ? X.call(arguments) : o), r === t ? u.notifyWith(n, r) : --a || u.resolveWith(n, r);
                            };
                        };
                    if (s > 1) for (t = new Array(s), n = new Array(s), r = new Array(s); s > o; o++) i[o] && Z.isFunction(i[o].promise) ? i[o].promise().progress(l(o, n, t)).done(l(o, r, i)).fail(u.reject) : --a;
                    return a || u.resolveWith(r, i), u.promise();
                },
            }),
            (Z.fn.ready = function (e) {
                return Z.ready.promise().done(e), this;
            }),
            Z.extend({
                isReady: !1,
                readyWait: 1,
                holdReady: function (e) {
                    e ? Z.readyWait++ : Z.ready(!0);
                },
                ready: function (e) {
                    (!0 === e ? --Z.readyWait : Z.isReady) || ((Z.isReady = !0), (!0 !== e && --Z.readyWait > 0) || (he.resolveWith(z, [Z]), Z.fn.triggerHandler && (Z(z).triggerHandler("ready"), Z(z).off("ready"))));
                },
            }),
            (Z.ready.promise = function (t) {
                return (
                    he ||
                        ((he = Z.Deferred()), "complete" === z.readyState || ("loading" !== z.readyState && !z.documentElement.doScroll) ? e.setTimeout(Z.ready) : (z.addEventListener("DOMContentLoaded", i), e.addEventListener("load", i))),
                    he.promise(t)
                );
            }),
            Z.ready.promise();
        var me = function (e, t, n, r, o, i, s) {
                var a = 0,
                    u = e.length,
                    l = null == n;
                if ("object" === Z.type(n)) for (a in ((o = !0), n)) me(e, t, a, n[a], !0, i, s);
                else if (
                    void 0 !== r &&
                    ((o = !0),
                    Z.isFunction(r) || (s = !0),
                    l &&
                        (s
                            ? (t.call(e, r), (t = null))
                            : ((l = t),
                              (t = function (e, t, n) {
                                  return l.call(Z(e), n);
                              }))),
                    t)
                )
                    for (; u > a; a++) t(e[a], n, s ? r : r.call(e[a], a, t(e[a], n)));
                return o ? e : l ? t.call(e) : u ? t(e[0], n) : i;
            },
            ve = function (e) {
                return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType;
            };
        (s.uid = 1),
            (s.prototype = {
                register: function (e, t) {
                    var n = t || {};
                    return e.nodeType ? (e[this.expando] = n) : Object.defineProperty(e, this.expando, { value: n, writable: !0, configurable: !0 }), e[this.expando];
                },
                cache: function (e) {
                    if (!ve(e)) return {};
                    var t = e[this.expando];
                    return t || ((t = {}), ve(e) && (e.nodeType ? (e[this.expando] = t) : Object.defineProperty(e, this.expando, { value: t, configurable: !0 }))), t;
                },
                set: function (e, t, n) {
                    var r,
                        o = this.cache(e);
                    if ("string" == typeof t) o[t] = n;
                    else for (r in t) o[r] = t[r];
                    return o;
                },
                get: function (e, t) {
                    return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][t];
                },
                access: function (e, t, n) {
                    var r;
                    return void 0 === t || (t && "string" == typeof t && void 0 === n) ? (void 0 !== (r = this.get(e, t)) ? r : this.get(e, Z.camelCase(t))) : (this.set(e, t, n), void 0 !== n ? n : t);
                },
                remove: function (e, t) {
                    var n,
                        r,
                        o,
                        i = e[this.expando];
                    if (void 0 !== i) {
                        if (void 0 === t) this.register(e);
                        else {
                            Z.isArray(t) ? (r = t.concat(t.map(Z.camelCase))) : ((o = Z.camelCase(t)), (r = t in i ? [t, o] : (r = o) in i ? [r] : r.match(ge) || [])), (n = r.length);
                            for (; n--; ) delete i[r[n]];
                        }
                        (void 0 === t || Z.isEmptyObject(i)) && (e.nodeType ? (e[this.expando] = void 0) : delete e[this.expando]);
                    }
                },
                hasData: function (e) {
                    var t = e[this.expando];
                    return void 0 !== t && !Z.isEmptyObject(t);
                },
            });
        var ye = new s(),
            xe = new s(),
            be = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
            we = /[A-Z]/g;
        Z.extend({
            hasData: function (e) {
                return xe.hasData(e) || ye.hasData(e);
            },
            data: function (e, t, n) {
                return xe.access(e, t, n);
            },
            removeData: function (e, t) {
                xe.remove(e, t);
            },
            _data: function (e, t, n) {
                return ye.access(e, t, n);
            },
            _removeData: function (e, t) {
                ye.remove(e, t);
            },
        }),
            Z.fn.extend({
                data: function (e, t) {
                    var n,
                        r,
                        o,
                        i = this[0],
                        s = i && i.attributes;
                    if (void 0 === e) {
                        if (this.length && ((o = xe.get(i)), 1 === i.nodeType && !ye.get(i, "hasDataAttrs"))) {
                            for (n = s.length; n--; ) s[n] && 0 === (r = s[n].name).indexOf("data-") && ((r = Z.camelCase(r.slice(5))), a(i, r, o[r]));
                            ye.set(i, "hasDataAttrs", !0);
                        }
                        return o;
                    }
                    return "object" == typeof e
                        ? this.each(function () {
                              xe.set(this, e);
                          })
                        : me(
                              this,
                              function (t) {
                                  var n, r;
                                  if (i && void 0 === t) {
                                      if (void 0 !== (n = xe.get(i, e) || xe.get(i, e.replace(we, "-$&").toLowerCase()))) return n;
                                      if (((r = Z.camelCase(e)), void 0 !== (n = xe.get(i, r)))) return n;
                                      if (void 0 !== (n = a(i, r, void 0))) return n;
                                  } else
                                      (r = Z.camelCase(e)),
                                          this.each(function () {
                                              var n = xe.get(this, r);
                                              xe.set(this, r, t), e.indexOf("-") > -1 && void 0 !== n && xe.set(this, e, t);
                                          });
                              },
                              null,
                              t,
                              arguments.length > 1,
                              null,
                              !0
                          );
                },
                removeData: function (e) {
                    return this.each(function () {
                        xe.remove(this, e);
                    });
                },
            }),
            Z.extend({
                queue: function (e, t, n) {
                    var r;
                    return e ? ((t = (t || "fx") + "queue"), (r = ye.get(e, t)), n && (!r || Z.isArray(n) ? (r = ye.access(e, t, Z.makeArray(n))) : r.push(n)), r || []) : void 0;
                },
                dequeue: function (e, t) {
                    t = t || "fx";
                    var n = Z.queue(e, t),
                        r = n.length,
                        o = n.shift(),
                        i = Z._queueHooks(e, t);
                    "inprogress" === o && ((o = n.shift()), r--),
                        o &&
                            ("fx" === t && n.unshift("inprogress"),
                            delete i.stop,
                            o.call(
                                e,
                                function () {
                                    Z.dequeue(e, t);
                                },
                                i
                            )),
                        !r && i && i.empty.fire();
                },
                _queueHooks: function (e, t) {
                    var n = t + "queueHooks";
                    return (
                        ye.get(e, n) ||
                        ye.access(e, n, {
                            empty: Z.Callbacks("once memory").add(function () {
                                ye.remove(e, [t + "queue", n]);
                            }),
                        })
                    );
                },
            }),
            Z.fn.extend({
                queue: function (e, t) {
                    var n = 2;
                    return (
                        "string" != typeof e && ((t = e), (e = "fx"), n--),
                        arguments.length < n
                            ? Z.queue(this[0], e)
                            : void 0 === t
                            ? this
                            : this.each(function () {
                                  var n = Z.queue(this, e, t);
                                  Z._queueHooks(this, e), "fx" === e && "inprogress" !== n[0] && Z.dequeue(this, e);
                              })
                    );
                },
                dequeue: function (e) {
                    return this.each(function () {
                        Z.dequeue(this, e);
                    });
                },
                clearQueue: function (e) {
                    return this.queue(e || "fx", []);
                },
                promise: function (e, t) {
                    var n,
                        r = 1,
                        o = Z.Deferred(),
                        i = this,
                        s = this.length,
                        a = function () {
                            --r || o.resolveWith(i, [i]);
                        };
                    for ("string" != typeof e && ((t = e), (e = void 0)), e = e || "fx"; s--; ) (n = ye.get(i[s], e + "queueHooks")) && n.empty && (r++, n.empty.add(a));
                    return a(), o.promise(t);
                },
            });
        var Ce = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
            Te = new RegExp("^(?:([+-])=|)(" + Ce + ")([a-z%]*)$", "i"),
            ke = ["Top", "Right", "Bottom", "Left"],
            Ee = function (e, t) {
                return (e = t || e), "none" === Z.css(e, "display") || !Z.contains(e.ownerDocument, e);
            },
            Se = /^(?:checkbox|radio)$/i,
            Ae = /<([\w:-]+)/,
            Ne = /^$|\/(?:java|ecma)script/i,
            je = {
                option: [1, "<select multiple='multiple'>", "</select>"],
                thead: [1, "<table>", "</table>"],
                col: [2, "<table><colgroup>", "</colgroup></table>"],
                tr: [2, "<table><tbody>", "</tbody></table>"],
                td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                _default: [0, "", ""],
            };
        (je.optgroup = je.option), (je.tbody = je.tfoot = je.colgroup = je.caption = je.thead), (je.th = je.td);
        var Le = /<|&#?\w+;/;
        !(function () {
            var e = z.createDocumentFragment().appendChild(z.createElement("div")),
                t = z.createElement("input");
            t.setAttribute("type", "radio"),
                t.setAttribute("checked", "checked"),
                t.setAttribute("name", "t"),
                e.appendChild(t),
                (K.checkClone = e.cloneNode(!0).cloneNode(!0).lastChild.checked),
                (e.innerHTML = "<textarea>x</textarea>"),
                (K.noCloneChecked = !!e.cloneNode(!0).lastChild.defaultValue);
        })();
        var De = /^key/,
            $e = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
            qe = /^([^.]*)(?:\.(.+)|)/;
        (Z.event = {
            global: {},
            add: function (e, t, n, r, o) {
                var i,
                    s,
                    a,
                    u,
                    l,
                    c,
                    d,
                    f,
                    p,
                    h,
                    g,
                    m = ye.get(e);
                if (m)
                    for (
                        n.handler && ((n = (i = n).handler), (o = i.selector)),
                            n.guid || (n.guid = Z.guid++),
                            (u = m.events) || (u = m.events = {}),
                            (s = m.handle) ||
                                (s = m.handle = function (t) {
                                    return void 0 !== Z && Z.event.triggered !== t.type ? Z.event.dispatch.apply(e, arguments) : void 0;
                                }),
                            l = (t = (t || "").match(ge) || [""]).length;
                        l--;

                    )
                        (p = g = (a = qe.exec(t[l]) || [])[1]),
                            (h = (a[2] || "").split(".").sort()),
                            p &&
                                ((d = Z.event.special[p] || {}),
                                (p = (o ? d.delegateType : d.bindType) || p),
                                (d = Z.event.special[p] || {}),
                                (c = Z.extend({ type: p, origType: g, data: r, handler: n, guid: n.guid, selector: o, needsContext: o && Z.expr.match.needsContext.test(o), namespace: h.join(".") }, i)),
                                (f = u[p]) || (((f = u[p] = []).delegateCount = 0), (d.setup && !1 !== d.setup.call(e, r, h, s)) || (e.addEventListener && e.addEventListener(p, s))),
                                d.add && (d.add.call(e, c), c.handler.guid || (c.handler.guid = n.guid)),
                                o ? f.splice(f.delegateCount++, 0, c) : f.push(c),
                                (Z.event.global[p] = !0));
            },
            remove: function (e, t, n, r, o) {
                var i,
                    s,
                    a,
                    u,
                    l,
                    c,
                    d,
                    f,
                    p,
                    h,
                    g,
                    m = ye.hasData(e) && ye.get(e);
                if (m && (u = m.events)) {
                    for (l = (t = (t || "").match(ge) || [""]).length; l--; )
                        if (((p = g = (a = qe.exec(t[l]) || [])[1]), (h = (a[2] || "").split(".").sort()), p)) {
                            for (d = Z.event.special[p] || {}, f = u[(p = (r ? d.delegateType : d.bindType) || p)] || [], a = a[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), s = i = f.length; i--; )
                                (c = f[i]),
                                    (!o && g !== c.origType) ||
                                        (n && n.guid !== c.guid) ||
                                        (a && !a.test(c.namespace)) ||
                                        (r && r !== c.selector && ("**" !== r || !c.selector)) ||
                                        (f.splice(i, 1), c.selector && f.delegateCount--, d.remove && d.remove.call(e, c));
                            s && !f.length && ((d.teardown && !1 !== d.teardown.call(e, h, m.handle)) || Z.removeEvent(e, p, m.handle), delete u[p]);
                        } else for (p in u) Z.event.remove(e, p + t[l], n, r, !0);
                    Z.isEmptyObject(u) && ye.remove(e, "handle events");
                }
            },
            dispatch: function (e) {
                e = Z.event.fix(e);
                var t,
                    n,
                    r,
                    o,
                    i,
                    s = [],
                    a = X.call(arguments),
                    u = (ye.get(this, "events") || {})[e.type] || [],
                    l = Z.event.special[e.type] || {};
                if (((a[0] = e), (e.delegateTarget = this), !l.preDispatch || !1 !== l.preDispatch.call(this, e))) {
                    for (s = Z.event.handlers.call(this, e, u), t = 0; (o = s[t++]) && !e.isPropagationStopped(); )
                        for (e.currentTarget = o.elem, n = 0; (i = o.handlers[n++]) && !e.isImmediatePropagationStopped(); )
                            (e.rnamespace && !e.rnamespace.test(i.namespace)) ||
                                ((e.handleObj = i), (e.data = i.data), void 0 !== (r = ((Z.event.special[i.origType] || {}).handle || i.handler).apply(o.elem, a)) && !1 === (e.result = r) && (e.preventDefault(), e.stopPropagation()));
                    return l.postDispatch && l.postDispatch.call(this, e), e.result;
                }
            },
            handlers: function (e, t) {
                var n,
                    r,
                    o,
                    i,
                    s = [],
                    a = t.delegateCount,
                    u = e.target;
                if (a && u.nodeType && ("click" !== e.type || isNaN(e.button) || e.button < 1))
                    for (; u !== this; u = u.parentNode || this)
                        if (1 === u.nodeType && (!0 !== u.disabled || "click" !== e.type)) {
                            for (r = [], n = 0; a > n; n++) void 0 === r[(o = (i = t[n]).selector + " ")] && (r[o] = i.needsContext ? Z(o, this).index(u) > -1 : Z.find(o, this, null, [u]).length), r[o] && r.push(i);
                            r.length && s.push({ elem: u, handlers: r });
                        }
                return a < t.length && s.push({ elem: this, handlers: t.slice(a) }), s;
            },
            props: "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
            fixHooks: {},
            keyHooks: {
                props: "char charCode key keyCode".split(" "),
                filter: function (e, t) {
                    return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e;
                },
            },
            mouseHooks: {
                props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                filter: function (e, t) {
                    var n,
                        r,
                        o,
                        i = t.button;
                    return (
                        null == e.pageX &&
                            null != t.clientX &&
                            ((r = (n = e.target.ownerDocument || z).documentElement),
                            (o = n.body),
                            (e.pageX = t.clientX + ((r && r.scrollLeft) || (o && o.scrollLeft) || 0) - ((r && r.clientLeft) || (o && o.clientLeft) || 0)),
                            (e.pageY = t.clientY + ((r && r.scrollTop) || (o && o.scrollTop) || 0) - ((r && r.clientTop) || (o && o.clientTop) || 0))),
                        e.which || void 0 === i || (e.which = 1 & i ? 1 : 2 & i ? 3 : 4 & i ? 2 : 0),
                        e
                    );
                },
            },
            fix: function (e) {
                if (e[Z.expando]) return e;
                var t,
                    n,
                    r,
                    o = e.type,
                    i = e,
                    s = this.fixHooks[o];
                for (s || (this.fixHooks[o] = s = $e.test(o) ? this.mouseHooks : De.test(o) ? this.keyHooks : {}), r = s.props ? this.props.concat(s.props) : this.props, e = new Z.Event(i), t = r.length; t--; ) e[(n = r[t])] = i[n];
                return e.target || (e.target = z), 3 === e.target.nodeType && (e.target = e.target.parentNode), s.filter ? s.filter(e, i) : e;
            },
            special: {
                load: { noBubble: !0 },
                focus: {
                    trigger: function () {
                        return this !== h() && this.focus ? (this.focus(), !1) : void 0;
                    },
                    delegateType: "focusin",
                },
                blur: {
                    trigger: function () {
                        return this === h() && this.blur ? (this.blur(), !1) : void 0;
                    },
                    delegateType: "focusout",
                },
                click: {
                    trigger: function () {
                        return "checkbox" === this.type && this.click && Z.nodeName(this, "input") ? (this.click(), !1) : void 0;
                    },
                    _default: function (e) {
                        return Z.nodeName(e.target, "a");
                    },
                },
                beforeunload: {
                    postDispatch: function (e) {
                        void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result);
                    },
                },
            },
        }),
            (Z.removeEvent = function (e, t, n) {
                e.removeEventListener && e.removeEventListener(t, n);
            }),
            (Z.Event = function (e, t) {
                return this instanceof Z.Event
                    ? (e && e.type ? ((this.originalEvent = e), (this.type = e.type), (this.isDefaultPrevented = e.defaultPrevented || (void 0 === e.defaultPrevented && !1 === e.returnValue) ? f : p)) : (this.type = e),
                      t && Z.extend(this, t),
                      (this.timeStamp = (e && e.timeStamp) || Z.now()),
                      void (this[Z.expando] = !0))
                    : new Z.Event(e, t);
            }),
            (Z.Event.prototype = {
                constructor: Z.Event,
                isDefaultPrevented: p,
                isPropagationStopped: p,
                isImmediatePropagationStopped: p,
                isSimulated: !1,
                preventDefault: function () {
                    var e = this.originalEvent;
                    (this.isDefaultPrevented = f), e && !this.isSimulated && e.preventDefault();
                },
                stopPropagation: function () {
                    var e = this.originalEvent;
                    (this.isPropagationStopped = f), e && !this.isSimulated && e.stopPropagation();
                },
                stopImmediatePropagation: function () {
                    var e = this.originalEvent;
                    (this.isImmediatePropagationStopped = f), e && !this.isSimulated && e.stopImmediatePropagation(), this.stopPropagation();
                },
            }),
            Z.each({ mouseenter: "mouseover", mouseleave: "mouseout", pointerenter: "pointerover", pointerleave: "pointerout" }, function (e, t) {
                Z.event.special[e] = {
                    delegateType: t,
                    bindType: t,
                    handle: function (e) {
                        var n,
                            r = e.relatedTarget,
                            o = e.handleObj;
                        return (r && (r === this || Z.contains(this, r))) || ((e.type = o.origType), (n = o.handler.apply(this, arguments)), (e.type = t)), n;
                    },
                };
            }),
            Z.fn.extend({
                on: function (e, t, n, r) {
                    return g(this, e, t, n, r);
                },
                one: function (e, t, n, r) {
                    return g(this, e, t, n, r, 1);
                },
                off: function (e, t, n) {
                    var r, o;
                    if (e && e.preventDefault && e.handleObj) return (r = e.handleObj), Z(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;
                    if ("object" == typeof e) {
                        for (o in e) this.off(o, t, e[o]);
                        return this;
                    }
                    return (
                        (!1 !== t && "function" != typeof t) || ((n = t), (t = void 0)),
                        !1 === n && (n = p),
                        this.each(function () {
                            Z.event.remove(this, e, n, t);
                        })
                    );
                },
            });
        var He = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,
            Oe = /<script|<style|<link/i,
            Re = /checked\s*(?:[^=]|=\s*.checked.)/i,
            Fe = /^true\/(.*)/,
            Me = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
        Z.extend({
            htmlPrefilter: function (e) {
                return e.replace(He, "<$1></$2>");
            },
            clone: function (e, t, n) {
                var r,
                    o,
                    i,
                    s,
                    a = e.cloneNode(!0),
                    u = Z.contains(e.ownerDocument, e);
                if (!(K.noCloneChecked || (1 !== e.nodeType && 11 !== e.nodeType) || Z.isXMLDoc(e))) for (s = l(a), r = 0, o = (i = l(e)).length; o > r; r++) b(i[r], s[r]);
                if (t)
                    if (n) for (i = i || l(e), s = s || l(a), r = 0, o = i.length; o > r; r++) x(i[r], s[r]);
                    else x(e, a);
                return (s = l(a, "script")).length > 0 && c(s, !u && l(e, "script")), a;
            },
            cleanData: function (e) {
                for (var t, n, r, o = Z.event.special, i = 0; void 0 !== (n = e[i]); i++)
                    if (ve(n)) {
                        if ((t = n[ye.expando])) {
                            if (t.events) for (r in t.events) o[r] ? Z.event.remove(n, r) : Z.removeEvent(n, r, t.handle);
                            n[ye.expando] = void 0;
                        }
                        n[xe.expando] && (n[xe.expando] = void 0);
                    }
            },
        }),
            Z.fn.extend({
                domManip: w,
                detach: function (e) {
                    return C(this, e, !0);
                },
                remove: function (e) {
                    return C(this, e);
                },
                text: function (e) {
                    return me(
                        this,
                        function (e) {
                            return void 0 === e
                                ? Z.text(this)
                                : this.empty().each(function () {
                                      (1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType) || (this.textContent = e);
                                  });
                        },
                        null,
                        e,
                        arguments.length
                    );
                },
                append: function () {
                    return w(this, arguments, function (e) {
                        (1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType) || m(this, e).appendChild(e);
                    });
                },
                prepend: function () {
                    return w(this, arguments, function (e) {
                        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                            var t = m(this, e);
                            t.insertBefore(e, t.firstChild);
                        }
                    });
                },
                before: function () {
                    return w(this, arguments, function (e) {
                        this.parentNode && this.parentNode.insertBefore(e, this);
                    });
                },
                after: function () {
                    return w(this, arguments, function (e) {
                        this.parentNode && this.parentNode.insertBefore(e, this.nextSibling);
                    });
                },
                empty: function () {
                    for (var e, t = 0; null != (e = this[t]); t++) 1 === e.nodeType && (Z.cleanData(l(e, !1)), (e.textContent = ""));
                    return this;
                },
                clone: function (e, t) {
                    return (
                        (e = null != e && e),
                        (t = null == t ? e : t),
                        this.map(function () {
                            return Z.clone(this, e, t);
                        })
                    );
                },
                html: function (e) {
                    return me(
                        this,
                        function (e) {
                            var t = this[0] || {},
                                n = 0,
                                r = this.length;
                            if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
                            if ("string" == typeof e && !Oe.test(e) && !je[(Ae.exec(e) || ["", ""])[1].toLowerCase()]) {
                                e = Z.htmlPrefilter(e);
                                try {
                                    for (; r > n; n++) 1 === (t = this[n] || {}).nodeType && (Z.cleanData(l(t, !1)), (t.innerHTML = e));
                                    t = 0;
                                } catch (e) {}
                            }
                            t && this.empty().append(e);
                        },
                        null,
                        e,
                        arguments.length
                    );
                },
                replaceWith: function () {
                    var e = [];
                    return w(
                        this,
                        arguments,
                        function (t) {
                            var n = this.parentNode;
                            Z.inArray(this, e) < 0 && (Z.cleanData(l(this)), n && n.replaceChild(t, this));
                        },
                        e
                    );
                },
            }),
            Z.each({ appendTo: "append", prependTo: "prepend", insertBefore: "before", insertAfter: "after", replaceAll: "replaceWith" }, function (e, t) {
                Z.fn[e] = function (e) {
                    for (var n, r = [], o = Z(e), i = o.length - 1, s = 0; i >= s; s++) (n = s === i ? this : this.clone(!0)), Z(o[s])[t](n), U.apply(r, n.get());
                    return this.pushStack(r);
                };
            });
        var Ie,
            Pe = { HTML: "block", BODY: "block" },
            We = /^margin/,
            Be = new RegExp("^(" + Ce + ")(?!px)[a-z%]+$", "i"),
            _e = function (t) {
                var n = t.ownerDocument.defaultView;
                return (n && n.opener) || (n = e), n.getComputedStyle(t);
            },
            ze = function (e, t, n, r) {
                var o,
                    i,
                    s = {};
                for (i in t) (s[i] = e.style[i]), (e.style[i] = t[i]);
                for (i in ((o = n.apply(e, r || [])), t)) e.style[i] = s[i];
                return o;
            },
            Xe = z.documentElement;
        !(function () {
            function t() {
                (a.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%"), (a.innerHTML = ""), Xe.appendChild(s);
                var t = e.getComputedStyle(a);
                (n = "1%" !== t.top), (i = "2px" === t.marginLeft), (r = "4px" === t.width), (a.style.marginRight = "50%"), (o = "4px" === t.marginRight), Xe.removeChild(s);
            }
            var n,
                r,
                o,
                i,
                s = z.createElement("div"),
                a = z.createElement("div");
            a.style &&
                ((a.style.backgroundClip = "content-box"),
                (a.cloneNode(!0).style.backgroundClip = ""),
                (K.clearCloneStyle = "content-box" === a.style.backgroundClip),
                (s.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute"),
                s.appendChild(a),
                Z.extend(K, {
                    pixelPosition: function () {
                        return t(), n;
                    },
                    boxSizingReliable: function () {
                        return null == r && t(), r;
                    },
                    pixelMarginRight: function () {
                        return null == r && t(), o;
                    },
                    reliableMarginLeft: function () {
                        return null == r && t(), i;
                    },
                    reliableMarginRight: function () {
                        var t,
                            n = a.appendChild(z.createElement("div"));
                        return (
                            (n.style.cssText = a.style.cssText = "-webkit-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0"),
                            (n.style.marginRight = n.style.width = "0"),
                            (a.style.width = "1px"),
                            Xe.appendChild(s),
                            (t = !parseFloat(e.getComputedStyle(n).marginRight)),
                            Xe.removeChild(s),
                            a.removeChild(n),
                            t
                        );
                    },
                }));
        })();
        var Qe = /^(none|table(?!-c[ea]).+)/,
            Ue = { position: "absolute", visibility: "hidden", display: "block" },
            Ve = { letterSpacing: "0", fontWeight: "400" },
            Ye = ["Webkit", "O", "Moz", "ms"],
            Je = z.createElement("div").style;
        Z.extend({
            cssHooks: {
                opacity: {
                    get: function (e, t) {
                        if (t) {
                            var n = E(e, "opacity");
                            return "" === n ? "1" : n;
                        }
                    },
                },
            },
            cssNumber: { animationIterationCount: !0, columnCount: !0, fillOpacity: !0, flexGrow: !0, flexShrink: !0, fontWeight: !0, lineHeight: !0, opacity: !0, order: !0, orphans: !0, widows: !0, zIndex: !0, zoom: !0 },
            cssProps: { float: "cssFloat" },
            style: function (e, t, n, r) {
                if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                    var o,
                        i,
                        s,
                        a = Z.camelCase(t),
                        l = e.style;
                    return (
                        (t = Z.cssProps[a] || (Z.cssProps[a] = A(a) || a)),
                        (s = Z.cssHooks[t] || Z.cssHooks[a]),
                        void 0 === n
                            ? s && "get" in s && void 0 !== (o = s.get(e, !1, r))
                                ? o
                                : l[t]
                            : ("string" == (i = typeof n) && (o = Te.exec(n)) && o[1] && ((n = u(e, t, o)), (i = "number")),
                              void (
                                  null != n &&
                                  n == n &&
                                  ("number" === i && (n += (o && o[3]) || (Z.cssNumber[a] ? "" : "px")),
                                  K.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (l[t] = "inherit"),
                                  (s && "set" in s && void 0 === (n = s.set(e, n, r))) || (l[t] = n))
                              ))
                    );
                }
            },
            css: function (e, t, n, r) {
                var o,
                    i,
                    s,
                    a = Z.camelCase(t);
                return (
                    (t = Z.cssProps[a] || (Z.cssProps[a] = A(a) || a)),
                    (s = Z.cssHooks[t] || Z.cssHooks[a]) && "get" in s && (o = s.get(e, !0, n)),
                    void 0 === o && (o = E(e, t, r)),
                    "normal" === o && t in Ve && (o = Ve[t]),
                    "" === n || n ? ((i = parseFloat(o)), !0 === n || isFinite(i) ? i || 0 : o) : o
                );
            },
        }),
            Z.each(["height", "width"], function (e, t) {
                Z.cssHooks[t] = {
                    get: function (e, n, r) {
                        return n
                            ? Qe.test(Z.css(e, "display")) && 0 === e.offsetWidth
                                ? ze(e, Ue, function () {
                                      return L(e, t, r);
                                  })
                                : L(e, t, r)
                            : void 0;
                    },
                    set: function (e, n, r) {
                        var o,
                            i = r && _e(e),
                            s = r && j(e, t, r, "border-box" === Z.css(e, "boxSizing", !1, i), i);
                        return s && (o = Te.exec(n)) && "px" !== (o[3] || "px") && ((e.style[t] = n), (n = Z.css(e, t))), N(0, n, s);
                    },
                };
            }),
            (Z.cssHooks.marginLeft = S(K.reliableMarginLeft, function (e, t) {
                return t
                    ? (parseFloat(E(e, "marginLeft")) ||
                          e.getBoundingClientRect().left -
                              ze(e, { marginLeft: 0 }, function () {
                                  return e.getBoundingClientRect().left;
                              })) + "px"
                    : void 0;
            })),
            (Z.cssHooks.marginRight = S(K.reliableMarginRight, function (e, t) {
                return t ? ze(e, { display: "inline-block" }, E, [e, "marginRight"]) : void 0;
            })),
            Z.each({ margin: "", padding: "", border: "Width" }, function (e, t) {
                (Z.cssHooks[e + t] = {
                    expand: function (n) {
                        for (var r = 0, o = {}, i = "string" == typeof n ? n.split(" ") : [n]; 4 > r; r++) o[e + ke[r] + t] = i[r] || i[r - 2] || i[0];
                        return o;
                    },
                }),
                    We.test(e) || (Z.cssHooks[e + t].set = N);
            }),
            Z.fn.extend({
                css: function (e, t) {
                    return me(
                        this,
                        function (e, t, n) {
                            var r,
                                o,
                                i = {},
                                s = 0;
                            if (Z.isArray(t)) {
                                for (r = _e(e), o = t.length; o > s; s++) i[t[s]] = Z.css(e, t[s], !1, r);
                                return i;
                            }
                            return void 0 !== n ? Z.style(e, t, n) : Z.css(e, t);
                        },
                        e,
                        t,
                        arguments.length > 1
                    );
                },
                show: function () {
                    return D(this, !0);
                },
                hide: function () {
                    return D(this);
                },
                toggle: function (e) {
                    return "boolean" == typeof e
                        ? e
                            ? this.show()
                            : this.hide()
                        : this.each(function () {
                              Ee(this) ? Z(this).show() : Z(this).hide();
                          });
                },
            }),
            (Z.Tween = $),
            ($.prototype = {
                constructor: $,
                init: function (e, t, n, r, o, i) {
                    (this.elem = e), (this.prop = n), (this.easing = o || Z.easing._default), (this.options = t), (this.start = this.now = this.cur()), (this.end = r), (this.unit = i || (Z.cssNumber[n] ? "" : "px"));
                },
                cur: function () {
                    var e = $.propHooks[this.prop];
                    return e && e.get ? e.get(this) : $.propHooks._default.get(this);
                },
                run: function (e) {
                    var t,
                        n = $.propHooks[this.prop];
                    return (
                        this.options.duration ? (this.pos = t = Z.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration)) : (this.pos = t = e),
                        (this.now = (this.end - this.start) * t + this.start),
                        this.options.step && this.options.step.call(this.elem, this.now, this),
                        n && n.set ? n.set(this) : $.propHooks._default.set(this),
                        this
                    );
                },
            }),
            ($.prototype.init.prototype = $.prototype),
            ($.propHooks = {
                _default: {
                    get: function (e) {
                        var t;
                        return 1 !== e.elem.nodeType || (null != e.elem[e.prop] && null == e.elem.style[e.prop]) ? e.elem[e.prop] : (t = Z.css(e.elem, e.prop, "")) && "auto" !== t ? t : 0;
                    },
                    set: function (e) {
                        Z.fx.step[e.prop] ? Z.fx.step[e.prop](e) : 1 !== e.elem.nodeType || (null == e.elem.style[Z.cssProps[e.prop]] && !Z.cssHooks[e.prop]) ? (e.elem[e.prop] = e.now) : Z.style(e.elem, e.prop, e.now + e.unit);
                    },
                },
            }),
            ($.propHooks.scrollTop = $.propHooks.scrollLeft = {
                set: function (e) {
                    e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now);
                },
            }),
            (Z.easing = {
                linear: function (e) {
                    return e;
                },
                swing: function (e) {
                    return 0.5 - Math.cos(e * Math.PI) / 2;
                },
                _default: "swing",
            }),
            (Z.fx = $.prototype.init),
            (Z.fx.step = {});
        var Ge,
            Ke,
            Ze = /^(?:toggle|show|hide)$/,
            et = /queueHooks$/;
        (Z.Animation = Z.extend(R, {
            tweeners: {
                "*": [
                    function (e, t) {
                        var n = this.createTween(e, t);
                        return u(n.elem, e, Te.exec(t), n), n;
                    },
                ],
            },
            tweener: function (e, t) {
                Z.isFunction(e) ? ((t = e), (e = ["*"])) : (e = e.match(ge));
                for (var n, r = 0, o = e.length; o > r; r++) (n = e[r]), (R.tweeners[n] = R.tweeners[n] || []), R.tweeners[n].unshift(t);
            },
            prefilters: [
                function (e, t, n) {
                    var r,
                        o,
                        i,
                        s,
                        a,
                        u,
                        l,
                        c = this,
                        d = {},
                        f = e.style,
                        p = e.nodeType && Ee(e),
                        h = ye.get(e, "fxshow");
                    for (r in (n.queue ||
                        (null == (a = Z._queueHooks(e, "fx")).unqueued &&
                            ((a.unqueued = 0),
                            (u = a.empty.fire),
                            (a.empty.fire = function () {
                                a.unqueued || u();
                            })),
                        a.unqueued++,
                        c.always(function () {
                            c.always(function () {
                                a.unqueued--, Z.queue(e, "fx").length || a.empty.fire();
                            });
                        })),
                    1 === e.nodeType &&
                        ("height" in t || "width" in t) &&
                        ((n.overflow = [f.overflow, f.overflowX, f.overflowY]),
                        "inline" === ("none" === (l = Z.css(e, "display")) ? ye.get(e, "olddisplay") || k(e.nodeName) : l) && "none" === Z.css(e, "float") && (f.display = "inline-block")),
                    n.overflow &&
                        ((f.overflow = "hidden"),
                        c.always(function () {
                            (f.overflow = n.overflow[0]), (f.overflowX = n.overflow[1]), (f.overflowY = n.overflow[2]);
                        })),
                    t))
                        if (((o = t[r]), Ze.exec(o))) {
                            if ((delete t[r], (i = i || "toggle" === o), o === (p ? "hide" : "show"))) {
                                if ("show" !== o || !h || void 0 === h[r]) continue;
                                p = !0;
                            }
                            d[r] = (h && h[r]) || Z.style(e, r);
                        } else l = void 0;
                    if (Z.isEmptyObject(d)) "inline" === ("none" === l ? k(e.nodeName) : l) && (f.display = l);
                    else
                        for (r in (h ? "hidden" in h && (p = h.hidden) : (h = ye.access(e, "fxshow", {})),
                        i && (h.hidden = !p),
                        p
                            ? Z(e).show()
                            : c.done(function () {
                                  Z(e).hide();
                              }),
                        c.done(function () {
                            var t;
                            for (t in (ye.remove(e, "fxshow"), d)) Z.style(e, t, d[t]);
                        }),
                        d))
                            (s = O(p ? h[r] : 0, r, c)), r in h || ((h[r] = s.start), p && ((s.end = s.start), (s.start = "width" === r || "height" === r ? 1 : 0)));
                },
            ],
            prefilter: function (e, t) {
                t ? R.prefilters.unshift(e) : R.prefilters.push(e);
            },
        })),
            (Z.speed = function (e, t, n) {
                var r = e && "object" == typeof e ? Z.extend({}, e) : { complete: n || (!n && t) || (Z.isFunction(e) && e), duration: e, easing: (n && t) || (t && !Z.isFunction(t) && t) };
                return (
                    (r.duration = Z.fx.off ? 0 : "number" == typeof r.duration ? r.duration : r.duration in Z.fx.speeds ? Z.fx.speeds[r.duration] : Z.fx.speeds._default),
                    (null != r.queue && !0 !== r.queue) || (r.queue = "fx"),
                    (r.old = r.complete),
                    (r.complete = function () {
                        Z.isFunction(r.old) && r.old.call(this), r.queue && Z.dequeue(this, r.queue);
                    }),
                    r
                );
            }),
            Z.fn.extend({
                fadeTo: function (e, t, n, r) {
                    return this.filter(Ee).css("opacity", 0).show().end().animate({ opacity: t }, e, n, r);
                },
                animate: function (e, t, n, r) {
                    var o = Z.isEmptyObject(e),
                        i = Z.speed(t, n, r),
                        s = function () {
                            var t = R(this, Z.extend({}, e), i);
                            (o || ye.get(this, "finish")) && t.stop(!0);
                        };
                    return (s.finish = s), o || !1 === i.queue ? this.each(s) : this.queue(i.queue, s);
                },
                stop: function (e, t, n) {
                    var r = function (e) {
                        var t = e.stop;
                        delete e.stop, t(n);
                    };
                    return (
                        "string" != typeof e && ((n = t), (t = e), (e = void 0)),
                        t && !1 !== e && this.queue(e || "fx", []),
                        this.each(function () {
                            var t = !0,
                                o = null != e && e + "queueHooks",
                                i = Z.timers,
                                s = ye.get(this);
                            if (o) s[o] && s[o].stop && r(s[o]);
                            else for (o in s) s[o] && s[o].stop && et.test(o) && r(s[o]);
                            for (o = i.length; o--; ) i[o].elem !== this || (null != e && i[o].queue !== e) || (i[o].anim.stop(n), (t = !1), i.splice(o, 1));
                            (!t && n) || Z.dequeue(this, e);
                        })
                    );
                },
                finish: function (e) {
                    return (
                        !1 !== e && (e = e || "fx"),
                        this.each(function () {
                            var t,
                                n = ye.get(this),
                                r = n[e + "queue"],
                                o = n[e + "queueHooks"],
                                i = Z.timers,
                                s = r ? r.length : 0;
                            for (n.finish = !0, Z.queue(this, e, []), o && o.stop && o.stop.call(this, !0), t = i.length; t--; ) i[t].elem === this && i[t].queue === e && (i[t].anim.stop(!0), i.splice(t, 1));
                            for (t = 0; s > t; t++) r[t] && r[t].finish && r[t].finish.call(this);
                            delete n.finish;
                        })
                    );
                },
            }),
            Z.each(["toggle", "show", "hide"], function (e, t) {
                var n = Z.fn[t];
                Z.fn[t] = function (e, r, o) {
                    return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(H(t, !0), e, r, o);
                };
            }),
            Z.each({ slideDown: H("show"), slideUp: H("hide"), slideToggle: H("toggle"), fadeIn: { opacity: "show" }, fadeOut: { opacity: "hide" }, fadeToggle: { opacity: "toggle" } }, function (e, t) {
                Z.fn[e] = function (e, n, r) {
                    return this.animate(t, e, n, r);
                };
            }),
            (Z.timers = []),
            (Z.fx.tick = function () {
                var e,
                    t = 0,
                    n = Z.timers;
                for (Ge = Z.now(); t < n.length; t++) (e = n[t])() || n[t] !== e || n.splice(t--, 1);
                n.length || Z.fx.stop(), (Ge = void 0);
            }),
            (Z.fx.timer = function (e) {
                Z.timers.push(e), e() ? Z.fx.start() : Z.timers.pop();
            }),
            (Z.fx.interval = 13),
            (Z.fx.start = function () {
                Ke || (Ke = e.setInterval(Z.fx.tick, Z.fx.interval));
            }),
            (Z.fx.stop = function () {
                e.clearInterval(Ke), (Ke = null);
            }),
            (Z.fx.speeds = { slow: 600, fast: 200, _default: 400 }),
            (Z.fn.delay = function (t, n) {
                return (
                    (t = (Z.fx && Z.fx.speeds[t]) || t),
                    (n = n || "fx"),
                    this.queue(n, function (n, r) {
                        var o = e.setTimeout(n, t);
                        r.stop = function () {
                            e.clearTimeout(o);
                        };
                    })
                );
            }),
            (function () {
                var e = z.createElement("input"),
                    t = z.createElement("select"),
                    n = t.appendChild(z.createElement("option"));
                (e.type = "checkbox"),
                    (K.checkOn = "" !== e.value),
                    (K.optSelected = n.selected),
                    (t.disabled = !0),
                    (K.optDisabled = !n.disabled),
                    ((e = z.createElement("input")).value = "t"),
                    (e.type = "radio"),
                    (K.radioValue = "t" === e.value);
            })();
        var tt,
            nt = Z.expr.attrHandle;
        Z.fn.extend({
            attr: function (e, t) {
                return me(this, Z.attr, e, t, arguments.length > 1);
            },
            removeAttr: function (e) {
                return this.each(function () {
                    Z.removeAttr(this, e);
                });
            },
        }),
            Z.extend({
                attr: function (e, t, n) {
                    var r,
                        o,
                        i = e.nodeType;
                    return 3 !== i && 8 !== i && 2 !== i
                        ? void 0 === e.getAttribute
                            ? Z.prop(e, t, n)
                            : ((1 === i && Z.isXMLDoc(e)) || ((t = t.toLowerCase()), (o = Z.attrHooks[t] || (Z.expr.match.bool.test(t) ? tt : void 0))),
                              void 0 !== n
                                  ? null === n
                                      ? void Z.removeAttr(e, t)
                                      : o && "set" in o && void 0 !== (r = o.set(e, n, t))
                                      ? r
                                      : (e.setAttribute(t, n + ""), n)
                                  : o && "get" in o && null !== (r = o.get(e, t))
                                  ? r
                                  : null == (r = Z.find.attr(e, t))
                                  ? void 0
                                  : r)
                        : void 0;
                },
                attrHooks: {
                    type: {
                        set: function (e, t) {
                            if (!K.radioValue && "radio" === t && Z.nodeName(e, "input")) {
                                var n = e.value;
                                return e.setAttribute("type", t), n && (e.value = n), t;
                            }
                        },
                    },
                },
                removeAttr: function (e, t) {
                    var n,
                        r,
                        o = 0,
                        i = t && t.match(ge);
                    if (i && 1 === e.nodeType) for (; (n = i[o++]); ) (r = Z.propFix[n] || n), Z.expr.match.bool.test(n) && (e[r] = !1), e.removeAttribute(n);
                },
            }),
            (tt = {
                set: function (e, t, n) {
                    return !1 === t ? Z.removeAttr(e, n) : e.setAttribute(n, n), n;
                },
            }),
            Z.each(Z.expr.match.bool.source.match(/\w+/g), function (e, t) {
                var n = nt[t] || Z.find.attr;
                nt[t] = function (e, t, r) {
                    var o, i;
                    return r || ((i = nt[t]), (nt[t] = o), (o = null != n(e, t, r) ? t.toLowerCase() : null), (nt[t] = i)), o;
                };
            });
        var rt = /^(?:input|select|textarea|button)$/i,
            ot = /^(?:a|area)$/i;
        Z.fn.extend({
            prop: function (e, t) {
                return me(this, Z.prop, e, t, arguments.length > 1);
            },
            removeProp: function (e) {
                return this.each(function () {
                    delete this[Z.propFix[e] || e];
                });
            },
        }),
            Z.extend({
                prop: function (e, t, n) {
                    var r,
                        o,
                        i = e.nodeType;
                    return 3 !== i && 8 !== i && 2 !== i
                        ? ((1 === i && Z.isXMLDoc(e)) || ((t = Z.propFix[t] || t), (o = Z.propHooks[t])),
                          void 0 !== n ? (o && "set" in o && void 0 !== (r = o.set(e, n, t)) ? r : (e[t] = n)) : o && "get" in o && null !== (r = o.get(e, t)) ? r : e[t])
                        : void 0;
                },
                propHooks: {
                    tabIndex: {
                        get: function (e) {
                            var t = Z.find.attr(e, "tabindex");
                            return t ? parseInt(t, 10) : rt.test(e.nodeName) || (ot.test(e.nodeName) && e.href) ? 0 : -1;
                        },
                    },
                },
                propFix: { for: "htmlFor", class: "className" },
            }),
            K.optSelected ||
                (Z.propHooks.selected = {
                    get: function (e) {
                        var t = e.parentNode;
                        return t && t.parentNode && t.parentNode.selectedIndex, null;
                    },
                    set: function (e) {
                        var t = e.parentNode;
                        t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex);
                    },
                }),
            Z.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
                Z.propFix[this.toLowerCase()] = this;
            });
        var it = /[\t\r\n\f]/g;
        Z.fn.extend({
            addClass: function (e) {
                var t,
                    n,
                    r,
                    o,
                    i,
                    s,
                    a,
                    u = 0;
                if (Z.isFunction(e))
                    return this.each(function (t) {
                        Z(this).addClass(e.call(this, t, F(this)));
                    });
                if ("string" == typeof e && e)
                    for (t = e.match(ge) || []; (n = this[u++]); )
                        if (((o = F(n)), (r = 1 === n.nodeType && (" " + o + " ").replace(it, " ")))) {
                            for (s = 0; (i = t[s++]); ) r.indexOf(" " + i + " ") < 0 && (r += i + " ");
                            o !== (a = Z.trim(r)) && n.setAttribute("class", a);
                        }
                return this;
            },
            removeClass: function (e) {
                var t,
                    n,
                    r,
                    o,
                    i,
                    s,
                    a,
                    u = 0;
                if (Z.isFunction(e))
                    return this.each(function (t) {
                        Z(this).removeClass(e.call(this, t, F(this)));
                    });
                if (!arguments.length) return this.attr("class", "");
                if ("string" == typeof e && e)
                    for (t = e.match(ge) || []; (n = this[u++]); )
                        if (((o = F(n)), (r = 1 === n.nodeType && (" " + o + " ").replace(it, " ")))) {
                            for (s = 0; (i = t[s++]); ) for (; r.indexOf(" " + i + " ") > -1; ) r = r.replace(" " + i + " ", " ");
                            o !== (a = Z.trim(r)) && n.setAttribute("class", a);
                        }
                return this;
            },
            toggleClass: function (e, t) {
                var n = typeof e;
                return "boolean" == typeof t && "string" === n
                    ? t
                        ? this.addClass(e)
                        : this.removeClass(e)
                    : Z.isFunction(e)
                    ? this.each(function (n) {
                          Z(this).toggleClass(e.call(this, n, F(this), t), t);
                      })
                    : this.each(function () {
                          var t, r, o, i;
                          if ("string" === n) for (r = 0, o = Z(this), i = e.match(ge) || []; (t = i[r++]); ) o.hasClass(t) ? o.removeClass(t) : o.addClass(t);
                          else (void 0 !== e && "boolean" !== n) || ((t = F(this)) && ye.set(this, "__className__", t), this.setAttribute && this.setAttribute("class", t || !1 === e ? "" : ye.get(this, "__className__") || ""));
                      });
            },
            hasClass: function (e) {
                var t,
                    n,
                    r = 0;
                for (t = " " + e + " "; (n = this[r++]); ) if (1 === n.nodeType && (" " + F(n) + " ").replace(it, " ").indexOf(t) > -1) return !0;
                return !1;
            },
        });
        var st = /\r/g,
            at = /[\x20\t\r\n\f]+/g;
        Z.fn.extend({
            val: function (e) {
                var t,
                    n,
                    r,
                    o = this[0];
                return arguments.length
                    ? ((r = Z.isFunction(e)),
                      this.each(function (n) {
                          var o;
                          1 === this.nodeType &&
                              (null == (o = r ? e.call(this, n, Z(this).val()) : e)
                                  ? (o = "")
                                  : "number" == typeof o
                                  ? (o += "")
                                  : Z.isArray(o) &&
                                    (o = Z.map(o, function (e) {
                                        return null == e ? "" : e + "";
                                    })),
                              ((t = Z.valHooks[this.type] || Z.valHooks[this.nodeName.toLowerCase()]) && "set" in t && void 0 !== t.set(this, o, "value")) || (this.value = o));
                      }))
                    : o
                    ? (t = Z.valHooks[o.type] || Z.valHooks[o.nodeName.toLowerCase()]) && "get" in t && void 0 !== (n = t.get(o, "value"))
                        ? n
                        : "string" == typeof (n = o.value)
                        ? n.replace(st, "")
                        : null == n
                        ? ""
                        : n
                    : void 0;
            },
        }),
            Z.extend({
                valHooks: {
                    option: {
                        get: function (e) {
                            var t = Z.find.attr(e, "value");
                            return null != t ? t : Z.trim(Z.text(e)).replace(at, " ");
                        },
                    },
                    select: {
                        get: function (e) {
                            for (var t, n, r = e.options, o = e.selectedIndex, i = "select-one" === e.type || 0 > o, s = i ? null : [], a = i ? o + 1 : r.length, u = 0 > o ? a : i ? o : 0; a > u; u++)
                                if (((n = r[u]).selected || u === o) && (K.optDisabled ? !n.disabled : null === n.getAttribute("disabled")) && (!n.parentNode.disabled || !Z.nodeName(n.parentNode, "optgroup"))) {
                                    if (((t = Z(n).val()), i)) return t;
                                    s.push(t);
                                }
                            return s;
                        },
                        set: function (e, t) {
                            for (var n, r, o = e.options, i = Z.makeArray(t), s = o.length; s--; ) ((r = o[s]).selected = Z.inArray(Z.valHooks.option.get(r), i) > -1) && (n = !0);
                            return n || (e.selectedIndex = -1), i;
                        },
                    },
                },
            }),
            Z.each(["radio", "checkbox"], function () {
                (Z.valHooks[this] = {
                    set: function (e, t) {
                        return Z.isArray(t) ? (e.checked = Z.inArray(Z(e).val(), t) > -1) : void 0;
                    },
                }),
                    K.checkOn ||
                        (Z.valHooks[this].get = function (e) {
                            return null === e.getAttribute("value") ? "on" : e.value;
                        });
            });
        var ut = /^(?:focusinfocus|focusoutblur)$/;
        Z.extend(Z.event, {
            trigger: function (t, n, r, o) {
                var i,
                    s,
                    a,
                    u,
                    l,
                    c,
                    d,
                    f = [r || z],
                    p = G.call(t, "type") ? t.type : t,
                    h = G.call(t, "namespace") ? t.namespace.split(".") : [];
                if (
                    ((s = a = r = r || z),
                    3 !== r.nodeType &&
                        8 !== r.nodeType &&
                        !ut.test(p + Z.event.triggered) &&
                        (p.indexOf(".") > -1 && ((h = p.split(".")), (p = h.shift()), h.sort()),
                        (l = p.indexOf(":") < 0 && "on" + p),
                        ((t = t[Z.expando] ? t : new Z.Event(p, "object" == typeof t && t)).isTrigger = o ? 2 : 3),
                        (t.namespace = h.join(".")),
                        (t.rnamespace = t.namespace ? new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)") : null),
                        (t.result = void 0),
                        t.target || (t.target = r),
                        (n = null == n ? [t] : Z.makeArray(n, [t])),
                        (d = Z.event.special[p] || {}),
                        o || !d.trigger || !1 !== d.trigger.apply(r, n)))
                ) {
                    if (!o && !d.noBubble && !Z.isWindow(r)) {
                        for (u = d.delegateType || p, ut.test(u + p) || (s = s.parentNode); s; s = s.parentNode) f.push(s), (a = s);
                        a === (r.ownerDocument || z) && f.push(a.defaultView || a.parentWindow || e);
                    }
                    for (i = 0; (s = f[i++]) && !t.isPropagationStopped(); )
                        (t.type = i > 1 ? u : d.bindType || p),
                            (c = (ye.get(s, "events") || {})[t.type] && ye.get(s, "handle")) && c.apply(s, n),
                            (c = l && s[l]) && c.apply && ve(s) && ((t.result = c.apply(s, n)), !1 === t.result && t.preventDefault());
                    return (
                        (t.type = p),
                        o ||
                            t.isDefaultPrevented() ||
                            (d._default && !1 !== d._default.apply(f.pop(), n)) ||
                            !ve(r) ||
                            (l && Z.isFunction(r[p]) && !Z.isWindow(r) && ((a = r[l]) && (r[l] = null), (Z.event.triggered = p), r[p](), (Z.event.triggered = void 0), a && (r[l] = a))),
                        t.result
                    );
                }
            },
            simulate: function (e, t, n) {
                var r = Z.extend(new Z.Event(), n, { type: e, isSimulated: !0 });
                Z.event.trigger(r, null, t);
            },
        }),
            Z.fn.extend({
                trigger: function (e, t) {
                    return this.each(function () {
                        Z.event.trigger(e, t, this);
                    });
                },
                triggerHandler: function (e, t) {
                    var n = this[0];
                    return n ? Z.event.trigger(e, t, n, !0) : void 0;
                },
            }),
            Z.each(
                "blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),
                function (e, t) {
                    Z.fn[t] = function (e, n) {
                        return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t);
                    };
                }
            ),
            Z.fn.extend({
                hover: function (e, t) {
                    return this.mouseenter(e).mouseleave(t || e);
                },
            }),
            (K.focusin = "onfocusin" in e),
            K.focusin ||
                Z.each({ focus: "focusin", blur: "focusout" }, function (e, t) {
                    var n = function (e) {
                        Z.event.simulate(t, e.target, Z.event.fix(e));
                    };
                    Z.event.special[t] = {
                        setup: function () {
                            var r = this.ownerDocument || this,
                                o = ye.access(r, t);
                            o || r.addEventListener(e, n, !0), ye.access(r, t, (o || 0) + 1);
                        },
                        teardown: function () {
                            var r = this.ownerDocument || this,
                                o = ye.access(r, t) - 1;
                            o ? ye.access(r, t, o) : (r.removeEventListener(e, n, !0), ye.remove(r, t));
                        },
                    };
                });
        var lt = e.location,
            ct = Z.now(),
            dt = /\?/;
        (Z.parseJSON = function (e) {
            return JSON.parse(e + "");
        }),
            (Z.parseXML = function (e) {
                var t;
                if (!e || "string" != typeof e) return null;
                try {
                    t = new n.DOMParser().parseFromString(e, "text/xml");
                } catch (e) {
                    t = void 0;
                }
                return (t && !t.getElementsByTagName("parsererror").length) || Z.error("Invalid XML: " + e), t;
            });
        var ft = /#.*$/,
            pt = /([?&])_=[^&]*/,
            ht = /^(.*?):[ \t]*([^\r\n]*)$/gm,
            gt = /^(?:GET|HEAD)$/,
            mt = /^\/\//,
            vt = {},
            yt = {},
            xt = "*/".concat("*"),
            bt = z.createElement("a");
        (bt.href = lt.href),
            Z.extend({
                active: 0,
                lastModified: {},
                etag: {},
                ajaxSettings: {
                    url: lt.href,
                    type: "GET",
                    isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(lt.protocol),
                    global: !0,
                    processData: !0,
                    async: !0,
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    accepts: { "*": xt, text: "text/plain", html: "text/html", xml: "application/xml, text/xml", json: "application/json, text/javascript" },
                    contents: { xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/ },
                    responseFields: { xml: "responseXML", text: "responseText", json: "responseJSON" },
                    converters: { "* text": String, "text html": !0, "text json": Z.parseJSON, "text xml": Z.parseXML },
                    flatOptions: { url: !0, context: !0 },
                },
                ajaxSetup: function (e, t) {
                    return t ? P(P(e, Z.ajaxSettings), t) : P(Z.ajaxSettings, e);
                },
                ajaxPrefilter: M(vt),
                ajaxTransport: M(yt),
                ajax: function (e, t) {
                    function n(e, t, n, s) {
                        var u,
                            c,
                            v,
                            y,
                            b,
                            T = t;
                        2 !== x &&
                            ((x = 2),
                            a && C.clearTimeout(a),
                            (r = void 0),
                            (i = s || ""),
                            (w.readyState = e > 0 ? 4 : 0),
                            (u = (e >= 200 && 300 > e) || 304 === e),
                            n &&
                                (y = (function (e, t, n) {
                                    for (var r, o, i, s, a = e.contents, u = e.dataTypes; "*" === u[0]; ) u.shift(), void 0 === r && (r = e.mimeType || t.getResponseHeader("Content-Type"));
                                    if (r)
                                        for (o in a)
                                            if (a[o] && a[o].test(r)) {
                                                u.unshift(o);
                                                break;
                                            }
                                    if (u[0] in n) i = u[0];
                                    else {
                                        for (o in n) {
                                            if (!u[0] || e.converters[o + " " + u[0]]) {
                                                i = o;
                                                break;
                                            }
                                            s || (s = o);
                                        }
                                        i = i || s;
                                    }
                                    return i ? (i !== u[0] && u.unshift(i), n[i]) : void 0;
                                })(d, w, n)),
                            (y = (function (e, t, n, r) {
                                var o,
                                    i,
                                    s,
                                    a,
                                    u,
                                    l = {},
                                    c = e.dataTypes.slice();
                                if (c[1]) for (s in e.converters) l[s.toLowerCase()] = e.converters[s];
                                for (i = c.shift(); i; )
                                    if ((e.responseFields[i] && (n[e.responseFields[i]] = t), !u && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), (u = i), (i = c.shift())))
                                        if ("*" === i) i = u;
                                        else if ("*" !== u && u !== i) {
                                            if (!(s = l[u + " " + i] || l["* " + i]))
                                                for (o in l)
                                                    if ((a = o.split(" "))[1] === i && (s = l[u + " " + a[0]] || l["* " + a[0]])) {
                                                        !0 === s ? (s = l[o]) : !0 !== l[o] && ((i = a[0]), c.unshift(a[1]));
                                                        break;
                                                    }
                                            if (!0 !== s)
                                                if (s && e.throws) t = s(t);
                                                else
                                                    try {
                                                        t = s(t);
                                                    } catch (e) {
                                                        return { state: "parsererror", error: s ? e : "No conversion from " + u + " to " + i };
                                                    }
                                        }
                                return { state: "success", data: t };
                            })(d, y, w, u)),
                            u
                                ? (d.ifModified && ((b = w.getResponseHeader("Last-Modified")) && (Z.lastModified[o] = b), (b = w.getResponseHeader("etag")) && (Z.etag[o] = b)),
                                  204 === e || "HEAD" === d.type ? (T = "nocontent") : 304 === e ? (T = "notmodified") : ((T = y.state), (c = y.data), (u = !(v = y.error))))
                                : ((v = T), (!e && T) || ((T = "error"), 0 > e && (e = 0))),
                            (w.status = e),
                            (w.statusText = (t || T) + ""),
                            u ? h.resolveWith(f, [c, T, w]) : h.rejectWith(f, [w, T, v]),
                            w.statusCode(m),
                            (m = void 0),
                            l && p.trigger(u ? "ajaxSuccess" : "ajaxError", [w, d, u ? c : v]),
                            g.fireWith(f, [w, T]),
                            l && (p.trigger("ajaxComplete", [w, d]), --Z.active || Z.event.trigger("ajaxStop")));
                    }
                    "object" == typeof e && ((t = e), (e = void 0)), (t = t || {});
                    var r,
                        o,
                        i,
                        s,
                        a,
                        u,
                        l,
                        c,
                        d = Z.ajaxSetup({}, t),
                        f = d.context || d,
                        p = d.context && (f.nodeType || f.jquery) ? Z(f) : Z.event,
                        h = Z.Deferred(),
                        g = Z.Callbacks("once memory"),
                        m = d.statusCode || {},
                        v = {},
                        y = {},
                        x = 0,
                        b = "canceled",
                        w = {
                            readyState: 0,
                            getResponseHeader: function (e) {
                                var t;
                                if (2 === x) {
                                    if (!s) for (s = {}; (t = ht.exec(i)); ) s[t[1].toLowerCase()] = t[2];
                                    t = s[e.toLowerCase()];
                                }
                                return null == t ? null : t;
                            },
                            getAllResponseHeaders: function () {
                                return 2 === x ? i : null;
                            },
                            setRequestHeader: function (e, t) {
                                var n = e.toLowerCase();
                                return x || ((e = y[n] = y[n] || e), (v[e] = t)), this;
                            },
                            overrideMimeType: function (e) {
                                return x || (d.mimeType = e), this;
                            },
                            statusCode: function (e) {
                                var t;
                                if (e)
                                    if (2 > x) for (t in e) m[t] = [m[t], e[t]];
                                    else w.always(e[w.status]);
                                return this;
                            },
                            abort: function (e) {
                                var t = e || b;
                                return r && r.abort(t), n(0, t), this;
                            },
                        };
                    if (
                        ((h.promise(w).complete = g.add),
                        (w.success = w.done),
                        (w.error = w.fail),
                        (d.url = ((e || d.url || lt.href) + "").replace(ft, "").replace(mt, lt.protocol + "//")),
                        (d.type = t.method || t.type || d.method || d.type),
                        (d.dataTypes = Z.trim(d.dataType || "*")
                            .toLowerCase()
                            .match(ge) || [""]),
                        null == d.crossDomain)
                    ) {
                        u = z.createElement("a");
                        try {
                            (u.href = d.url), (u.href = u.href), (d.crossDomain = bt.protocol + "//" + bt.host != u.protocol + "//" + u.host);
                        } catch (e) {
                            d.crossDomain = !0;
                        }
                    }
                    if ((d.data && d.processData && "string" != typeof d.data && (d.data = Z.param(d.data, d.traditional)), I(vt, d, t, w), 2 === x)) return w;
                    for (c in ((l = Z.event && d.global) && 0 == Z.active++ && Z.event.trigger("ajaxStart"),
                    (d.type = d.type.toUpperCase()),
                    (d.hasContent = !gt.test(d.type)),
                    (o = d.url),
                    d.hasContent || (d.data && ((o = d.url += (dt.test(o) ? "&" : "?") + d.data), delete d.data), !1 === d.cache && (d.url = pt.test(o) ? o.replace(pt, "$1_=" + ct++) : o + (dt.test(o) ? "&" : "?") + "_=" + ct++)),
                    d.ifModified && (Z.lastModified[o] && w.setRequestHeader("If-Modified-Since", Z.lastModified[o]), Z.etag[o] && w.setRequestHeader("If-None-Match", Z.etag[o])),
                    ((d.data && d.hasContent && !1 !== d.contentType) || t.contentType) && w.setRequestHeader("Content-Type", d.contentType),
                    w.setRequestHeader("Accept", d.dataTypes[0] && d.accepts[d.dataTypes[0]] ? d.accepts[d.dataTypes[0]] + ("*" !== d.dataTypes[0] ? ", " + xt + "; q=0.01" : "") : d.accepts["*"]),
                    d.headers))
                        w.setRequestHeader(c, d.headers[c]);
                    if (d.beforeSend && (!1 === d.beforeSend.call(f, w, d) || 2 === x)) return w.abort();
                    for (c in ((b = "abort"), { success: 1, error: 1, complete: 1 })) w[c](d[c]);
                    if ((r = I(yt, d, t, w))) {
                        if (((w.readyState = 1), l && p.trigger("ajaxSend", [w, d]), 2 === x)) return w;
                        d.async &&
                            d.timeout > 0 &&
                            (a = C.setTimeout(function () {
                                w.abort("timeout");
                            }, d.timeout));
                        try {
                            (x = 1), r.send(v, n);
                        } catch (e) {
                            if (!(2 > x)) throw e;
                            n(-1, e);
                        }
                    } else n(-1, "No Transport");
                    return w;
                },
                getJSON: function (e, t, n) {
                    return Z.get(e, t, n, "json");
                },
                getScript: function (e, t) {
                    return Z.get(e, void 0, t, "script");
                },
            }),
            Z.each(["get", "post"], function (e, t) {
                Z[t] = function (e, n, r, o) {
                    return Z.isFunction(n) && ((o = o || r), (r = n), (n = void 0)), Z.ajax(Z.extend({ url: e, type: t, dataType: o, data: n, success: r }, Z.isPlainObject(e) && e));
                };
            }),
            (Z._evalUrl = function (e) {
                return Z.ajax({ url: e, type: "GET", dataType: "script", async: !1, global: !1, throws: !0 });
            }),
            Z.fn.extend({
                wrapAll: function (e) {
                    var t;
                    return Z.isFunction(e)
                        ? this.each(function (t) {
                              Z(this).wrapAll(e.call(this, t));
                          })
                        : (this[0] &&
                              ((t = Z(e, this[0].ownerDocument).eq(0).clone(!0)),
                              this[0].parentNode && t.insertBefore(this[0]),
                              t
                                  .map(function () {
                                      for (var e = this; e.firstElementChild; ) e = e.firstElementChild;
                                      return e;
                                  })
                                  .append(this)),
                          this);
                },
                wrapInner: function (e) {
                    return Z.isFunction(e)
                        ? this.each(function (t) {
                              Z(this).wrapInner(e.call(this, t));
                          })
                        : this.each(function () {
                              var t = Z(this),
                                  n = t.contents();
                              n.length ? n.wrapAll(e) : t.append(e);
                          });
                },
                wrap: function (e) {
                    var t = Z.isFunction(e);
                    return this.each(function (n) {
                        Z(this).wrapAll(t ? e.call(this, n) : e);
                    });
                },
                unwrap: function () {
                    return this.parent()
                        .each(function () {
                            Z.nodeName(this, "body") || Z(this).replaceWith(this.childNodes);
                        })
                        .end();
                },
            }),
            (Z.expr.filters.hidden = function (e) {
                return !Z.expr.filters.visible(e);
            }),
            (Z.expr.filters.visible = function (e) {
                return e.offsetWidth > 0 || e.offsetHeight > 0 || e.getClientRects().length > 0;
            });
        var wt = /%20/g,
            Ct = /\[\]$/,
            Tt = /\r?\n/g,
            kt = /^(?:submit|button|image|reset|file)$/i,
            Et = /^(?:input|select|textarea|keygen)/i;
        (Z.param = function (e, t) {
            var n,
                r = [],
                o = function (e, t) {
                    (t = Z.isFunction(t) ? t() : null == t ? "" : t), (r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t));
                };
            if ((void 0 === t && (t = Z.ajaxSettings && Z.ajaxSettings.traditional), Z.isArray(e) || (e.jquery && !Z.isPlainObject(e))))
                Z.each(e, function () {
                    o(this.name, this.value);
                });
            else for (n in e) W(n, e[n], t, o);
            return r.join("&").replace(wt, "+");
        }),
            Z.fn.extend({
                serialize: function () {
                    return Z.param(this.serializeArray());
                },
                serializeArray: function () {
                    return this.map(function () {
                        var e = Z.prop(this, "elements");
                        return e ? Z.makeArray(e) : this;
                    })
                        .filter(function () {
                            var e = this.type;
                            return this.name && !Z(this).is(":disabled") && Et.test(this.nodeName) && !kt.test(e) && (this.checked || !Se.test(e));
                        })
                        .map(function (e, t) {
                            var n = Z(this).val();
                            return null == n
                                ? null
                                : Z.isArray(n)
                                ? Z.map(n, function (e) {
                                      return { name: t.name, value: e.replace(Tt, "\r\n") };
                                  })
                                : { name: t.name, value: n.replace(Tt, "\r\n") };
                        })
                        .get();
                },
            }),
            (Z.ajaxSettings.xhr = function () {
                try {
                    return new e.XMLHttpRequest();
                } catch (e) {}
            });
        var St = { 0: 200, 1223: 204 },
            At = Z.ajaxSettings.xhr();
        (K.cors = !!At && "withCredentials" in At),
            (K.ajax = At = !!At),
            Z.ajaxTransport(function (e) {
                var t, n;
                return K.cors || (At && !e.crossDomain)
                    ? {
                          send: function (r, o) {
                              var i,
                                  s = e.xhr();
                              if ((s.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields)) for (i in e.xhrFields) s[i] = e.xhrFields[i];
                              for (i in (e.mimeType && s.overrideMimeType && s.overrideMimeType(e.mimeType), e.crossDomain || r["X-Requested-With"] || (r["X-Requested-With"] = "XMLHttpRequest"), r)) s.setRequestHeader(i, r[i]);
                              (t = function (e) {
                                  return function () {
                                      t &&
                                          ((t = n = s.onload = s.onerror = s.onabort = s.onreadystatechange = null),
                                          "abort" === e
                                              ? s.abort()
                                              : "error" === e
                                              ? "number" != typeof s.status
                                                  ? o(0, "error")
                                                  : o(s.status, s.statusText)
                                              : o(
                                                    St[s.status] || s.status,
                                                    s.statusText,
                                                    "text" !== (s.responseType || "text") || "string" != typeof s.responseText ? { binary: s.response } : { text: s.responseText },
                                                    s.getAllResponseHeaders()
                                                ));
                                  };
                              }),
                                  (s.onload = t()),
                                  (n = s.onerror = t("error")),
                                  void 0 !== s.onabort
                                      ? (s.onabort = n)
                                      : (s.onreadystatechange = function () {
                                            4 === s.readyState &&
                                                a.setTimeout(function () {
                                                    t && n();
                                                });
                                        }),
                                  (t = t("abort"));
                              try {
                                  s.send((e.hasContent && e.data) || null);
                              } catch (e) {
                                  if (t) throw e;
                              }
                          },
                          abort: function () {
                              t && t();
                          },
                      }
                    : void 0;
            }),
            Z.ajaxSetup({
                accepts: { script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript" },
                contents: { script: /\b(?:java|ecma)script\b/ },
                converters: {
                    "text script": function (e) {
                        return Z.globalEval(e), e;
                    },
                },
            }),
            Z.ajaxPrefilter("script", function (e) {
                void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET");
            }),
            Z.ajaxTransport("script", function (e) {
                var t, n;
                return e.crossDomain
                    ? {
                          send: function (r, o) {
                              (t = Z("<script>")
                                  .prop({ charset: e.scriptCharset, src: e.url })
                                  .on(
                                      "load error",
                                      (n = function (e) {
                                          t.remove(), (n = null), e && o("error" === e.type ? 404 : 200, e.type);
                                      })
                                  )),
                                  z.head.appendChild(t[0]);
                          },
                          abort: function () {
                              n && n();
                          },
                      }
                    : void 0;
            });
        var Nt = [],
            jt = /(=)\?(?=&|$)|\?\?/;
        Z.ajaxSetup({
            jsonp: "callback",
            jsonpCallback: function () {
                var e = Nt.pop() || Z.expando + "_" + ct++;
                return (this[e] = !0), e;
            },
        }),
            Z.ajaxPrefilter("json jsonp", function (t, n, r) {
                var o,
                    i,
                    s,
                    a = !1 !== t.jsonp && (jt.test(t.url) ? "url" : "string" == typeof t.data && 0 === (t.contentType || "").indexOf("application/x-www-form-urlencoded") && jt.test(t.data) && "data");
                return a || "jsonp" === t.dataTypes[0]
                    ? ((o = t.jsonpCallback = Z.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback),
                      a ? (t[a] = t[a].replace(jt, "$1" + o)) : !1 !== t.jsonp && (t.url += (dt.test(t.url) ? "&" : "?") + t.jsonp + "=" + o),
                      (t.converters["script json"] = function () {
                          return s || Z.error(o + " was not called"), s[0];
                      }),
                      (t.dataTypes[0] = "json"),
                      (i = e[o]),
                      (e[o] = function () {
                          s = arguments;
                      }),
                      r.always(function () {
                          void 0 === i ? Z(e).removeProp(o) : (e[o] = i), t[o] && ((t.jsonpCallback = n.jsonpCallback), Nt.push(o)), s && Z.isFunction(i) && i(s[0]), (s = i = void 0);
                      }),
                      "script")
                    : void 0;
            }),
            (Z.parseHTML = function (e, t, n) {
                if (!e || "string" != typeof e) return null;
                "boolean" == typeof t && ((n = t), (t = !1)), (t = t || z);
                var r = ue.exec(e),
                    o = !n && [];
                return r ? [t.createElement(r[1])] : ((r = d([e], t, o)), o && o.length && Z(o).remove(), Z.merge([], r.childNodes));
            });
        var Lt = Z.fn.load;
        (Z.fn.load = function (e, t, n) {
            if ("string" != typeof e && Lt) return Lt.apply(this, arguments);
            var r,
                o,
                i,
                s = this,
                a = e.indexOf(" ");
            return (
                a > -1 && ((r = Z.trim(e.slice(a))), (e = e.slice(0, a))),
                Z.isFunction(t) ? ((n = t), (t = void 0)) : t && "object" == typeof t && (o = "POST"),
                s.length > 0 &&
                    Z.ajax({ url: e, type: o || "GET", dataType: "html", data: t })
                        .done(function (e) {
                            (i = arguments), s.html(r ? Z("<div>").append(Z.parseHTML(e)).find(r) : e);
                        })
                        .always(
                            n &&
                                function (e, t) {
                                    s.each(function () {
                                        n.apply(this, i || [e.responseText, t, e]);
                                    });
                                }
                        ),
                this
            );
        }),
            Z.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (e, t) {
                Z.fn[t] = function (e) {
                    return this.on(t, e);
                };
            }),
            (Z.expr.filters.animated = function (e) {
                return Z.grep(Z.timers, function (t) {
                    return e === t.elem;
                }).length;
            }),
            (Z.offset = {
                setOffset: function (e, t, n) {
                    var r,
                        o,
                        i,
                        s,
                        a,
                        u,
                        l = Z.css(e, "position"),
                        c = Z(e),
                        d = {};
                    "static" === l && (e.style.position = "relative"),
                        (a = c.offset()),
                        (i = Z.css(e, "top")),
                        (u = Z.css(e, "left")),
                        ("absolute" === l || "fixed" === l) && (i + u).indexOf("auto") > -1 ? ((s = (r = c.position()).top), (o = r.left)) : ((s = parseFloat(i) || 0), (o = parseFloat(u) || 0)),
                        Z.isFunction(t) && (t = t.call(e, n, Z.extend({}, a))),
                        null != t.top && (d.top = t.top - a.top + s),
                        null != t.left && (d.left = t.left - a.left + o),
                        "using" in t ? t.using.call(e, d) : c.css(d);
                },
            }),
            Z.fn.extend({
                offset: function (e) {
                    if (arguments.length)
                        return void 0 === e
                            ? this
                            : this.each(function (t) {
                                  Z.offset.setOffset(this, e, t);
                              });
                    var t,
                        n,
                        r = this[0],
                        o = { top: 0, left: 0 },
                        i = r && r.ownerDocument;
                    return i ? ((t = i.documentElement), Z.contains(t, r) ? ((o = r.getBoundingClientRect()), (n = B(i)), { top: o.top + n.pageYOffset - t.clientTop, left: o.left + n.pageXOffset - t.clientLeft }) : o) : void 0;
                },
                position: function () {
                    if (this[0]) {
                        var e,
                            t,
                            n = this[0],
                            r = { top: 0, left: 0 };
                        return (
                            "fixed" === Z.css(n, "position")
                                ? (t = n.getBoundingClientRect())
                                : ((e = this.offsetParent()), (t = this.offset()), Z.nodeName(e[0], "html") || (r = e.offset()), (r.top += Z.css(e[0], "borderTopWidth", !0)), (r.left += Z.css(e[0], "borderLeftWidth", !0))),
                            { top: t.top - r.top - Z.css(n, "marginTop", !0), left: t.left - r.left - Z.css(n, "marginLeft", !0) }
                        );
                    }
                },
                offsetParent: function () {
                    return this.map(function () {
                        for (var e = this.offsetParent; e && "static" === Z.css(e, "position"); ) e = e.offsetParent;
                        return e || Xe;
                    });
                },
            }),
            Z.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function (e, t) {
                var n = "pageYOffset" === t;
                Z.fn[e] = function (r) {
                    return me(
                        this,
                        function (e, r, o) {
                            var i = B(e);
                            return void 0 === o ? (i ? i[t] : e[r]) : void (i ? i.scrollTo(n ? i.pageXOffset : o, n ? o : i.pageYOffset) : (e[r] = o));
                        },
                        e,
                        r,
                        arguments.length
                    );
                };
            }),
            Z.each(["top", "left"], function (e, t) {
                Z.cssHooks[t] = S(K.pixelPosition, function (e, n) {
                    return n ? ((n = E(e, t)), Be.test(n) ? Z(e).position()[t] + "px" : n) : void 0;
                });
            }),
            Z.each({ Height: "height", Width: "width" }, function (e, t) {
                Z.each({ padding: "inner" + e, content: t, "": "outer" + e }, function (n, r) {
                    Z.fn[r] = function (r, o) {
                        var i = arguments.length && (n || "boolean" != typeof r),
                            s = n || (!0 === r || !0 === o ? "margin" : "border");
                        return me(
                            this,
                            function (t, n, r) {
                                var o;
                                return Z.isWindow(t)
                                    ? t.document.documentElement["client" + e]
                                    : 9 === t.nodeType
                                    ? ((o = t.documentElement), Math.max(t.body["scroll" + e], o["scroll" + e], t.body["offset" + e], o["offset" + e], o["client" + e]))
                                    : void 0 === r
                                    ? Z.css(t, n, s)
                                    : Z.style(t, n, r, s);
                            },
                            t,
                            i ? r : void 0,
                            i,
                            null
                        );
                    };
                });
            }),
            Z.fn.extend({
                bind: function (e, t, n) {
                    return this.on(e, null, t, n);
                },
                unbind: function (e, t) {
                    return this.off(e, null, t);
                },
                delegate: function (e, t, n, r) {
                    return this.on(t, e, n, r);
                },
                undelegate: function (e, t, n) {
                    return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n);
                },
                size: function () {
                    return this.length;
                },
            }),
            (Z.fn.andSelf = Z.fn.addBack),
            "function" == typeof define &&
                define.amd &&
                define("jquery", [], function () {
                    return Z;
                });
        var Dt = e.jQuery,
            $t = e.$;
        return (
            (Z.noConflict = function (t) {
                return e.$ === Z && (e.$ = $t), t && e.jQuery === Z && (e.jQuery = Dt), Z;
            }),
            t || (e.jQuery = e.$ = Z),
            Z
        );
    }),
    "undefined" == typeof jQuery)
)
    throw new Error("Bootstrap's JavaScript requires jQuery");
!(function (e) {
    "use strict";
    var t = jQuery.fn.jquery.split(" ")[0].split(".");
    if ((t[0] < 2 && t[1] < 9) || (1 == t[0] && 9 == t[1] && t[2] < 1) || t[0] > 3) throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4");
})(),
    (function (e) {
        "use strict";
        function t(t) {
            var n = t.attr("data-target");
            n || (n = (n = t.attr("href")) && /#[A-Za-z]/.test(n) && n.replace(/.*(?=#[^\s]*$)/, ""));
            var r = n && e(n);
            return r && r.length ? r : t.parent();
        }
        function n(n) {
            (n && 3 === n.which) ||
                (e(r).remove(),
                e(o).each(function () {
                    var r = e(this),
                        o = t(r),
                        i = { relatedTarget: this };
                    o.hasClass("open") &&
                        ((n && "click" == n.type && /input|textarea/i.test(n.target.tagName) && e.contains(o[0], n.target)) ||
                            (o.trigger((n = e.Event("hide.bs.dropdown", i))), n.isDefaultPrevented() || (r.attr("aria-expanded", "false"), o.removeClass("open").trigger(e.Event("hidden.bs.dropdown", i)))));
                }));
        }
        var r = ".dropdown-backdrop",
            o = '[data-toggle="dropdown"]',
            i = function (t) {
                e(t).on("click.bs.dropdown", this.toggle);
            };
        (i.VERSION = "3.3.7"),
            (i.prototype.toggle = function (r) {
                var o = e(this);
                if (!o.is(".disabled, :disabled")) {
                    var i = t(o),
                        s = i.hasClass("open");
                    if ((n(), !s)) {
                        "ontouchstart" in document.documentElement && !i.closest(".navbar-nav").length && e(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(e(this)).on("click", n);
                        var a = { relatedTarget: this };
                        if ((i.trigger((r = e.Event("show.bs.dropdown", a))), r.isDefaultPrevented())) return;
                        o.trigger("focus").attr("aria-expanded", "true"), i.toggleClass("open").trigger(e.Event("shown.bs.dropdown", a));
                    }
                    return !1;
                }
            }),
            (i.prototype.keydown = function (n) {
                if (/(38|40|27|32)/.test(n.which) && !/input|textarea/i.test(n.target.tagName)) {
                    var r = e(this);
                    if ((n.preventDefault(), n.stopPropagation(), !r.is(".disabled, :disabled"))) {
                        var i = t(r),
                            s = i.hasClass("open");
                        if ((!s && 27 != n.which) || (s && 27 == n.which)) return 27 == n.which && i.find(o).trigger("focus"), r.trigger("click");
                        var a = i.find(".dropdown-menu li:not(.disabled):visible a");
                        if (a.length) {
                            var u = a.index(n.target);
                            38 == n.which && u > 0 && u--, 40 == n.which && u < a.length - 1 && u++, ~u || (u = 0), a.eq(u).trigger("focus");
                        }
                    }
                }
            });
        var s = e.fn.dropdown;
        (e.fn.dropdown = function (t) {
            return this.each(function () {
                var n = e(this),
                    r = n.data("bs.dropdown");
                r || n.data("bs.dropdown", (r = new i(this))), "string" == typeof t && r[t].call(n);
            });
        }),
            (e.fn.dropdown.Constructor = i),
            (e.fn.dropdown.noConflict = function () {
                return (e.fn.dropdown = s), this;
            }),
            e(document)
                .on("click.bs.dropdown.data-api", n)
                .on("click.bs.dropdown.data-api", ".dropdown form", function (e) {
                    e.stopPropagation();
                })
                .on("click.bs.dropdown.data-api", o, i.prototype.toggle)
                .on("keydown.bs.dropdown.data-api", o, i.prototype.keydown)
                .on("keydown.bs.dropdown.data-api", ".dropdown-menu", i.prototype.keydown);
    })(jQuery),
    jQuery;
var URL_BASE = window.location.origin,
    demo1 = new autoComplete({
        selector: ".suggest input[name='q']",
        minChars: 1,
        source: function (e, t) {
            var n = [],
                r = [];
            for (i = 0; i < n.length; i++) ~n[i].toLowerCase().indexOf("") && r.push(n[i]);
            t(r);
        },
        onSelect: function () {
            $(".suggest input[name='q']").closest("form").submit();
        },
    });
$(".suggest input[name='q']").keyup(function (e) {
    var t = window.event ? e.keyCode : e.which;
    if (40 == t || 37 == t || 39 == t || 38 == t) return !1;
    var n = $(this).val().trim();
    if (n.length < 3) return !1;
    var r = new Date().getTime();
    $.get(
        URL_BASE + "/ajax/searchtags?index=" + r + "&q=" + n,
        function (e) {
            if (e) {
                if ((console.log(e), 1 == e.error)) return (d = []), demo1.updatesource(d, []), !1;
                if (e.index != r) return !1;
                demo1.updatesource(e.data, e.image),
                    $(".autocomplete-suggestion span").click(function (e) {
                        e.preventDefault();
                        var t = $(this).parent().html();
                        return $(".suggest input[name='q']").val($.trim($(t).text())), $("div.autocomplete-suggestions").hide(), $(".suggest button[type='submit']").trigger("click"), !1;
                    }),
                    $(".autocomplete-suggestion a").click(function (e) {
                        e.preventDefault();
                        var t = $(this).parent().html();
                        return $(".suggest input[name='q']").focus(), $(".suggest input[name='q']").val($.trim($(t).text())), $("div.autocomplete-suggestions").open(), !1;
                    });
            }
        },
        "json"
    );
});
var demo2 = new autoComplete({
    selector: ".hsearch input[name='q']",
    minChars: 1,
    source: function (e, t) {
        var n = [],
            r = [];
        for (i = 0; i < n.length; i++) ~n[i].toLowerCase().indexOf("") && r.push(n[i]);
        t(r);
    },
    onSelect: function () {
        $(".hsearch input[name='q']").closest("form").submit();
    },
});
function toggleNavbarMethod() {
    $(window).width() > 768
        ? $(".dropdown").hover(
              function () {
                  $(this).addClass("open");
              },
              function () {
                  $(this).removeClass("open");
              }
          )
        : $(".navbar .dropdown").off("mouseover").off("mouseout");
}
function vibrateSimple() {
    navigator.vibrate(50);
}
function slide(e) {
    $(e).prop("scrollWidth") > $(e).parent().width() && $(e).next(".right-button").show();
    const t = document.querySelector(e),
        n = (e) => {
            e.preventDefault(), e.stopImmediatePropagation();
        };
    let r,
        o,
        i = !1,
        s = !1;
    t &&
        (t.addEventListener("mousedown", (e) => {
            (i = !0), t.classList.add("active"), (r = e.pageX - t.offsetLeft), (o = t.scrollLeft);
        }),
        t.addEventListener("mouseleave", () => {
            (i = !1), t.classList.remove("active");
        }),
        t.addEventListener("mouseup", (e) => {
            i = !1;
            const r = document.querySelectorAll("a");
            if (s) for (let e = 0; e < r.length; e++) r[e].addEventListener("click", n);
            else for (let e = 0; e < r.length; e++) r[e].removeEventListener("click", n);
            t.classList.remove("active"), (s = !1);
        }),
        t.addEventListener("mousemove", (e) => {
            if (!i) return;
            (s = !0), e.preventDefault();
            const n = 2 * (e.pageX - t.offsetLeft - r);
            t.scrollLeft = o - n;
        }));
    var a = $(e).parent().width() - 20;
    $(e).prev().hide(),
        $(e)
            .prev()
            .click(function () {
                $(e).next().show(), $(e).animate({ scrollLeft: "-=" + a + "px" });
            }),
        $(e)
            .next()
            .click(function () {
                $(e).prev().show(), $(e).animate({ scrollLeft: "+=" + a + "px" });
            }),
        $(function () {
            $(e).scroll(function () {
                var t = $(e).outerWidth(),
                    n = $(e)[0].scrollWidth,
                    r = $(e).scrollLeft();
                (matchright = parseInt(n - t)), (matchleft = parseInt(r)), (differencerl = matchright - matchleft), differencerl <= 5 ? $(e).next().hide() : 0 === r ? $(e).prev().hide() : ($(e).prev().show(), $(e).next().show());
            });
        });
}
function scrollElement(e) {
    var t = $(e).offset().top;
    $("html, body").animate({ scrollTop: t }, 500);
}
$(".hsearch input[name='q']").keyup(function (e) {
    var t = window.event ? e.keyCode : e.which;
    if (40 == t || 37 == t || 39 == t || 38 == t) return !1;
    var n = $(this).val().trim();
    if (n.length < 3) return !1;
    var r = new Date().getTime();
    $.get(
        URL_BASE + "/ajax/searchtags?index=" + r + "&q=" + n,
        function (e) {
            if (e) {
                if (1 == e.error) return (d = []), demo2.updatesource(d, []), !1;
                if (e.index != r) return !1;
                demo2.updatesource(e.data, e.image),
                    $(".autocomplete-suggestion span").click(function (e) {
                        e.preventDefault();
                        var t = $(this).parent().html();
                        return $(".hsearch input[name='q']").val($.trim($(t).text())), $("div.autocomplete-suggestions").hide(), $("button[type='submit']").trigger("click"), !1;
                    }),
                    $(".autocomplete-suggestion a").click(function (e) {
                        e.preventDefault();
                        var t = $(this).parent().html();
                        return $(".hsearch input[name='q']").focus(), $(".hsearch input[name='q']").val($.trim($(t).text())), $("div.autocomplete-suggestions").hide(), !1;
                    });
            }
        },
        "json"
    );
}),
    $(document).ready(function () {
        $("#downloadthisimage").trigger("click");
    }),
    $(".disableRightClick").click(function (e) {
        switch ((e.preventDefault(), e.which)) {
            case 1:
            case 2:
            case 3:
                alert("See download button below! ");
                break;
            default:
                alert("See download button below! ");
        }
    }),
    $(".disableRightClick").on("contextmenu", function (e) {
        e.preventDefault();
    }),
    $(".read-more").click(function () {
        $(this).siblings(".more-text").contents().unwrap(), $(this).remove();
    }),
    toggleNavbarMethod(),
    $(window).resize(toggleNavbarMethod),
    $(document).ready(function () {
        $(".navbar-toggle").click(function () {
            $(".nc").toggleClass("in"),
                setTimeout(function () {
                    $(".nc").hasClass("in")
                        ? ($("body").addClass("posFixed"), $(".oc_K_s, #nvbrcls").show(), $(".nc").animate({ right: "0px" }, 50))
                        : ($("body").removeClass("posFixed"), $(".oc_K_s, #nvbrcls").hide(), $(".nc").animate({ right: "-300px" }, 30));
                }, 20);
        }),
            $("#ncc").click(function () {
                $(".nc").toggleClass("in"),
                    $(".nc").animate({ right: "-300px" }, 90),
                    $("body").removeClass("posFixed"),
                    setTimeout(function () {
                        $(".oc_K_s, #nvbrcls").hide();
                    }, 90);
            });
    }),
    "serviceWorker" in navigator &&
        (navigator.serviceWorker.register("/service-worker.js", { scope: "/" }),
        (function () {
            "use strict";
            var e = function (e) {
                var t,
                    n = function () {
                        t &&
                            (t.prompt(),
                            t.userChoice
                                .then(function (n) {
                                    (t = null), ga("send", "event", "install", "install", n), e.classList.remove("available");
                                })
                                .catch(function () {
                                    (t = null), ga("send", "event", "error", "error"), e.classList.remove("available");
                                }));
                    };
                window.addEventListener("beforeinstallprompt", function (n) {
                    return (t = n), ga("send", "event", "available", "available"), e.classList.add("available"), !1;
                }),
                    window.addEventListener("appinstalled", function () {
                        (document.body.querySelector(".btnApp").style.display = "none"), (t = null), ga("send", "event", "installed", "installed"), e.classList.remove("available");
                    }),
                    e.addEventListener("click", n.bind(this)),
                    e.addEventListener("touchend", n.bind(this));
            };
            window.addEventListener("load", function () {
                var t = document.body.querySelector(".btnApp");
                new e(t);
            });
        })()),
    (window.onclick = function (e) {
        document.body.contains(document.getElementById("myPopup")) &&
            (document.getElementById("myPopup").classList.toggle("show"), e.target.matches("myPopup1") || e.target.matches(".tooltip") || document.getElementById("myPopup").classList.remove("show"));
    }),
    slide(".sliderWrapper1"),
    slide(".sliderWrapper2"),
    (function (e) {
        function t(e, n, r, o) {
            function s(e) {
                (r.maxRows && c > r.maxRows) || (r.truncate && e && c > 1) ? (f[a][0].style.display = "none") : ((f[a][0].style.width = u + "px"), (f[a][0].style.height = g + "px"), (f[a][0].style.display = "block"));
            }
            var a,
                u,
                l = 1,
                c = 1,
                d = e.width() - 2,
                f = [],
                p = 0,
                g = r.rowHeight;
            for (d || (d = e.width() - 2), i = 0; i < n.length; i++)
                if ((f.push(n[i]), (p += n[i][2] + r.margin) >= d)) {
                    var m = f.length * r.margin;
                    for (l = (d - m) / (p - m), g = Math.ceil(r.rowHeight * l), exact_w = 0, a = 0; a < f.length; a++) (u = Math.ceil(f[a][2] * l)), (exact_w += u + r.margin), exact_w > d && (u -= exact_w - d), s();
                    (f = []), (p = 0), c++;
                }
            for (a = 0; a < f.length; a++) (u = Math.floor(f[a][2] * l)), (h = Math.floor(r.rowHeight * l)), s(!0);
            o || d == e.width() || t(e, n, r, !0);
        }
        e.fn.flexImages = function (n) {
            var r = e.extend({ container: ".item", object: "img", rowHeight: 180, maxRows: 0, truncate: 0 }, n);
            return this.each(function () {
                var n = e(this),
                    o = e(n).find(r.container),
                    i = [],
                    s = new Date().getTime(),
                    a = window.getComputedStyle ? getComputedStyle(o[0], null) : o[0].currentStyle;
                for (r.margin = (parseInt(a.marginLeft) || 0) + (parseInt(a.marginRight) || 0) + (Math.round(parseFloat(a.borderLeftWidth)) || 0) + (Math.round(parseFloat(a.borderRightWidth)) || 0), j = 0; j < o.length; j++) {
                    var u = o[j],
                        l = parseInt(u.getAttribute("data-w")),
                        c = l * (r.rowHeight / parseInt(u.getAttribute("data-h"))),
                        d = e(u).find(r.object);
                    i.push([u, l, c, d, d.data("src")]);
                }
                t(n, i, r),
                    e(window).off("resize.flexImages" + n.data("flex-t")),
                    e(window).on("resize.flexImages" + s, function () {
                        t(n, i, r);
                    }),
                    n.data("flex-t", s);
            });
        };
    })(jQuery),
    $(".imagesFlex2").flexImages({ rowHeight: 320 }),
    $(document).on("click", ".pagination a", function () {
        $("ul.pagination").html('<div class="col-md-12"><div class="spinner"></div></div>');
    }),
    $(document).on("click", ".pagination a", function (e) {
        e.preventDefault();
        var t = $(this).attr("href").split("page=")[1];
        $.ajax({ headers: { "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content") }, url: ajaxlink + t }).done(function (e) {
            e ? (scrollElement(".imagesFlex2"), $(".dataResult").html(e), $(".imagesFlex2").flexImages({ rowHeight: 300 })) : sweetAlert("{{trans('misc.error_oops')}}", "{{trans('misc.error')}}", "error");
        });
    });
const observer = lozad();
function downloadJSAtOnload() {
    var e = document.createElement("script");
    (e.src = googleadslink), (e.async = !0), e.setAttribute("crossorigin", "anonymous"), document.body.appendChild(e);
}
observer.observe(),
    (function (e) {
        "use strict";
        e(document).ready(function () {
            var t = document.querySelector(".progress-wrap path"),
                n = t.getTotalLength();
            (t.style.transition = t.style.WebkitTransition = "none"),
                (t.style.strokeDasharray = n + " " + n),
                (t.style.strokeDashoffset = n),
                t.getBoundingClientRect(),
                (t.style.transition = t.style.WebkitTransition = "stroke-dashoffset 10ms linear");
            var r = function () {
                var r = e(window).scrollTop(),
                    o = e(document).height() - e(window).height(),
                    i = n - (r * n) / o;
                t.style.strokeDashoffset = i;
            };
            r(),
                e(window).scroll(r),
                jQuery(window).on("scroll", function () {
                    jQuery(this).scrollTop() > 50 ? jQuery(".progress-wrap").addClass("active-progress") : jQuery(".progress-wrap").removeClass("active-progress");
                }),
                jQuery(".progress-wrap").on("click", function (e) {
                    return e.preventDefault(), jQuery("html, body").animate({ scrollTop: 0 }, 550), !1;
                });
        });
    })(jQuery),
    window.addEventListener ? window.addEventListener("load", downloadJSAtOnload, !1) : window.attachEvent ? window.attachEvent("onload", downloadJSAtOnload) : (window.onload = downloadJSAtOnload);
