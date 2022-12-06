!(function () {
  var e =
    "undefined" != typeof globalThis
      ? globalThis
      : "undefined" != typeof self
      ? self
      : "undefined" != typeof window
      ? window
      : "undefined" != typeof global
      ? global
      : {};
  function t(e) {
    return e && e.__esModule ? e.default : e;
  }
  function n(e) {
    Object.defineProperty(e, "__esModule", { value: !0 });
  }
  function r(e, t, n) {
    Object.defineProperty(e, t, { get: n, enumerable: !0 });
  }
  const o = {
      get: function (e, t) {
        if (!this._supported()) return t;
        const n = localStorage.getItem(e);
        if (null == n) return t;
        if ("true" === n) return !0;
        if ("false" === n) return !1;
        if (n.startsWith("[") || n.startsWith("{")) return JSON.parse(n);
        const r = Number(n);
        return Number.isNaN(r) ? n : r;
      },
      set: function (e, t) {
        if (this._supported())
          try {
            "string" == typeof t
              ? localStorage.setItem(e, t)
              : localStorage.setItem(e, JSON.stringify(t));
          } catch (n) {
            console.error("local-storage-json: failed to set", {
              key: e,
              value: t,
              details: n,
            });
          }
      },
      has: function (e) {
        return !!this._supported() && e in localStorage;
      },
      remove: function (e) {
        this._supported() && localStorage.removeItem(e);
      },
      _supported: function () {
        return "undefined" != typeof window && !!window.localStorage;
      },
    },
    i = chrome.runtime.getManifest(),
    a = i.version,
    s =
      o.get("env.is") ||
      (i.name.includes("DEV")
        ? "development"
        : i.name.includes("BETA")
        ? "beta"
        : "production");
  let l = {
    version: a,
    manifestVersion: chrome.runtime.getManifest().manifest_version,
    is: {
      popup: location.pathname.includes("inssist.html"),
      background: location.pathname.includes("background"),
      production: "development" !== s && "beta" !== s,
      beta: "beta" === s,
      development: "development" === s,
    },
  };
  l = {
    ...l,
    features: {
      fspring: o.get("env.features.fspring", !0),
      iframes: o.get("env.features.iframes", !0),
      trial: !0,
      log: o.get("env.features.log", l.is.beta || l.is.development),
    },
    options: {},
  };
  var u = l;
  var c = [
    {
      id: "schedule",
      icon: "sidebar-mediator.schedule",
      title: "Post Assistant",
      description:
        "\n      Schedule and pre-plan posts in a Grid or Calendar.\n      Use Time Slots to schedule content rapidly.\n    ",
    },
    {
      id: "hashtags",
      icon: "sidebar-mediator.hashtags",
      title: "Hashtag Assistant",
      description:
        "\n      Find effective hashtags to increase your posts engagement.\n      Create hashtag collections.\n    ",
    },
    {
      id: "reels",
      icon: "sidebar-mediator.covers",
      title: "Reels and Video Stories",
      description:
        "\n      Publish Video Reels and Instagram Video Stories from your desktop PC / Mac.\n    ",
    },
    {
      id: "music",
      icon: "sidebar-mediator.music",
      title: "Music, Covers, Ghost View",
      description:
        "\n      Add music to your videos. Select or upload custom covers.\n      View stories anonymously.\n    ",
    },
  ];
  var d = [
    { title: "Post Photos & Videos, Photo Stories", isFree: !0, isPro: !0 },
    { title: "Send Direct Messages", isFree: !0, isPro: !0 },
    { title: "Search for Relevant Hashtags", isFree: !0, isPro: !0 },
    { title: "Multiaccount Support", isFree: !0, isPro: !0 },
    { title: "Dark Mode", isFree: !0, isPro: !0 },
    { title: "Zen Mode", isFree: !0, isPro: !0, isPaddedBottom: !0 },
    {
      title: "Post Reels",
      isPro: !0,
      icons: [
        "sidebar-mediator.schedule",
        "sidebar-mediator.covers",
        "sidebar-mediator.hashtags",
      ],
      tooltip: {
        text: "Reels are supported for countries where Instagram Reels are available",
      },
    },
    { title: "Video Stories", isPro: !0 },
    { title: "Add Music to Videos", isPro: !0 },
    {
      title: "Ghost Story View",
      isPro: !0,
      tooltip: { text: "Stay anonymous while viewing Instagram stories" },
    },
    { title: "Post and Schedule Carousels", isPro: !0, isPaddedBottom: !0 },
    { title: "Schedule and Bulk Draft Posts", isPro: !0 },
    { title: "Posting Calendar", isPro: !0 },
    { title: "Posting Time Slots", isPro: !0 },
    { title: "CSV-powered Scheduling", isPro: !0, isPaddedBottom: !0 },
    { title: "Custom Video Covers", isPro: !0 },
    { title: "Cross-posting to Facebook Pages", isPro: !0, isPaddedBottom: !0 },
    { title: "Hashtags Metrics & Collections", isPro: !0 },
  ];
  const f = 5,
    p = 3,
    h = {
      dmAdvanced: (e) => e.dmAdvanced >= 50,
      schedule: (e) => e.schedule >= 2,
      insights: (e) => e.insights >= 2,
      analytics: (e) => e.analytics >= 5,
      coverAssist: (e) => e.coverAssist >= 2,
      musicAssist: (e) => e.musicAssist >= 2,
      storyAssist: (e) => e.storyAssist >= f,
      tagAssist: (e) => e.tagAssist >= 4,
      addLinkToStory: (e) => e.addLinkToStory >= 2,
      repost: (e) => e.repost >= 3,
      reels: (e) => e.reels >= 2,
      ghostStoryView: (e) => e.ghostStoryView >= p,
    },
    g = 6e4,
    m = 36e5,
    v = 864e5,
    b = 6048e5,
    y = 26784e5;
  var w = { SECOND: 1e3, MINUTE: g, HOUR: m, DAY: v, WEEK: b, MONTH: y },
    _ = {
      apiUrl: o.get(
        "env.options.tagAssist.apiUrl",
        (u.is.production || u.is.beta, "https://fc.inssist.com/api/v1/hashtag")
      ),
      collectionsTagDataTtl: 26784e5,
      userTagScanTtl: 6048e5,
      userTagScanPeriod: 2592e5,
      userTagScanCount: 30,
      sendCollectedTagsTimeout: 6e5,
      maxTagsToQuery: 5,
      maxRelevantTagsToKeep: 100,
      accountStatsTtl: 864e5,
    };
  u.options = {
    ...u.options,
    apiUrl: o.get("env.options.apiUrl", "https://api.inssist.com/api/v1"),
    collectBillingStats: o.get("env.options.collectBillingStats", !1),
    domain: o.get("env.options.domain", "inssist.com"),
    storefront: o.get(
      "env.options.storefront",
      u.is.production || u.is.beta
        ? "slashed.onfastspring.com"
        : "slashed.test.onfastspring.com"
    ),
    checkoutContainer: o.get(
      "env.options.checkoutContainer",
      "https://inssist.com"
    ),
    billingPlans: {
      "inssist-pro-monthly": {
        type: "subscription",
        pricing: { US: { currency: "USD", price: 4.99 } },
      },
      "inssist-pro-lifetime": {
        type: "product",
        pricing: { US: { currency: "USD", price: 45 } },
        isActive: (e) => {
          const { billing: t, authStatus: n } = e;
          return (t.orders || []).some((e) => {
            var t, r;
            return (
              "inssist-pro-lifetime" === e.product &&
              (null === (t = e.tags) ||
              void 0 === t ||
              null === (r = t.accounts) ||
              void 0 === r
                ? void 0
                : r.some(
                    (e) =>
                      e.id === (null == n ? void 0 : n.userId) ||
                      e.name === (null == n ? void 0 : n.username)
                  ))
            );
          });
        },
      },
      "inssist-pro-infinite": {
        type: "product",
        pricing: { US: { currency: "USD", price: 240 } },
      },
    },
    billingProFeaturesList: c,
    billingProFeaturesTable: d,
    trialFeaturesLimits: h,
    tagAssist: _,
  };
  (function () {
    var t = this,
      n = { exports: this };
    return (
      function () {
        function r(e, t) {
          for (var n = -1, r = t.length, o = e.length; ++n < r; )
            e[o + n] = t[n];
          return e;
        }
        function o(e, t) {
          for (var n = -1, r = null == e ? 0 : e.length; ++n < r; )
            if (t(e[n], n, e)) return !0;
          return !1;
        }
        function i(e) {
          return function (t) {
            return e(t);
          };
        }
        function a(e) {
          var t = -1,
            n = Array(e.size);
          return (
            e.forEach(function (e, r) {
              n[++t] = [r, e];
            }),
            n
          );
        }
        function s(e) {
          var t = Object;
          return function (n) {
            return e(t(n));
          };
        }
        function l(e) {
          var t = -1,
            n = Array(e.size);
          return (
            e.forEach(function (e) {
              n[++t] = e;
            }),
            n
          );
        }
        function u() {}
        function c(e) {
          var t = -1,
            n = null == e ? 0 : e.length;
          for (this.clear(); ++t < n; ) {
            var r = e[t];
            this.set(r[0], r[1]);
          }
        }
        function d(e) {
          var t = -1,
            n = null == e ? 0 : e.length;
          for (this.clear(); ++t < n; ) {
            var r = e[t];
            this.set(r[0], r[1]);
          }
        }
        function f(e) {
          var t = -1,
            n = null == e ? 0 : e.length;
          for (this.clear(); ++t < n; ) {
            var r = e[t];
            this.set(r[0], r[1]);
          }
        }
        function p(e) {
          var t = -1,
            n = null == e ? 0 : e.length;
          for (this.__data__ = new f(); ++t < n; ) this.add(e[t]);
        }
        function h(e) {
          this.size = (this.__data__ = new d(e)).size;
        }
        function g(e, t) {
          var n = $e(e),
            r = !n && Ge(e),
            o = !n && !r && We(e),
            i = !n && !r && !o && Je(e);
          if ((n = n || r || o || i)) {
            r = e.length;
            for (var a = String, s = -1, l = Array(r); ++s < r; ) l[s] = a(s);
            r = l;
          } else r = [];
          var u;
          a = r.length;
          for (u in e) {
            if (
              !(s = !t && !de.call(e, u)) &&
              (s = n) &&
              !(s =
                "length" == u ||
                (o && ("offset" == u || "parent" == u)) ||
                (i &&
                  ("buffer" == u || "byteLength" == u || "byteOffset" == u)))
            ) {
              var c = typeof (s = u);
              s =
                !!(l = null == (l = a) ? 9007199254740991 : l) &&
                ("number" == c || ("symbol" != c && W.test(s))) &&
                -1 < s &&
                0 == s % 1 &&
                s < l;
            }
            s || r.push(u);
          }
          return r;
        }
        function m(e, t, n) {
          var r = e[t];
          (de.call(e, t) && M(r, n) && (n !== z || t in e)) || b(e, t, n);
        }
        function v(e, t) {
          for (var n = e.length; n--; ) if (M(e[n][0], t)) return n;
          return -1;
        }
        function b(e, t, n) {
          "__proto__" == t && Pe
            ? Pe(e, t, {
                configurable: !0,
                enumerable: !0,
                value: n,
                writable: !0,
              })
            : (e[t] = n);
        }
        function y(e, t, n, r, o, i) {
          var a,
            s = 1 & t,
            l = 2 & t,
            u = 4 & t;
          if ((n && (a = o ? n(e, r, o, i) : n(e)), a !== z)) return a;
          if (!U(e)) return e;
          if ((r = $e(e))) {
            if (
              ((a = (function (e) {
                var t = e.length,
                  n = new e.constructor(t);
                return (
                  t &&
                    "string" == typeof e[0] &&
                    de.call(e, "index") &&
                    ((n.index = e.index), (n.input = e.input)),
                  n
                );
              })(e)),
              !s)
            )
              return (function (e, t) {
                var n = -1,
                  r = e.length;
                for (t || (t = Array(r)); ++n < r; ) t[n] = e[n];
                return t;
              })(e, a);
          } else {
            var c = ze(e),
              d = "[object Function]" == c || "[object GeneratorFunction]" == c;
            if (We(e))
              return (function (e, t) {
                if (t) return e.slice();
                var n = e.length;
                n = be ? be(n) : new e.constructor(n);
                return e.copy(n), n;
              })(e, s);
            if (
              "[object Object]" == c ||
              "[object Arguments]" == c ||
              (d && !o)
            ) {
              if (
                ((a =
                  l || d || "function" != typeof e.constructor || A(e)
                    ? {}
                    : qe(ye(e))),
                !s)
              )
                return l
                  ? (function (e, t) {
                      return D(e, Ve(e), t);
                    })(
                      e,
                      (function (e, t) {
                        return e && D(t, q(t), e);
                      })(a, e)
                    )
                  : (function (e, t) {
                      return D(e, He(e), t);
                    })(
                      e,
                      (function (e, t) {
                        return e && D(t, L(t), e);
                      })(a, e)
                    );
            } else {
              if (!Q[c]) return o ? e : {};
              a = (function (e, t, n) {
                var r = e.constructor;
                switch (t) {
                  case "[object ArrayBuffer]":
                    return P(e);
                  case "[object Boolean]":
                  case "[object Date]":
                    return new r(+e);
                  case "[object DataView]":
                    return (
                      (t = n ? P(e.buffer) : e.buffer),
                      new e.constructor(t, e.byteOffset, e.byteLength)
                    );
                  case "[object Float32Array]":
                  case "[object Float64Array]":
                  case "[object Int8Array]":
                  case "[object Int16Array]":
                  case "[object Int32Array]":
                  case "[object Uint8Array]":
                  case "[object Uint8ClampedArray]":
                  case "[object Uint16Array]":
                  case "[object Uint32Array]":
                    return (
                      (t = n ? P(e.buffer) : e.buffer),
                      new e.constructor(t, e.byteOffset, e.length)
                    );
                  case "[object Map]":
                    return new r();
                  case "[object Number]":
                  case "[object String]":
                    return new r(e);
                  case "[object RegExp]":
                    return (
                      ((t = new e.constructor(e.source, G.exec(e))).lastIndex =
                        e.lastIndex),
                      t
                    );
                  case "[object Set]":
                    return new r();
                  case "[object Symbol]":
                    return Le ? Object(Le.call(e)) : {};
                }
              })(e, c, s);
            }
          }
          if ((i || (i = new h()), (o = i.get(e)))) return o;
          if ((i.set(e, a), Qe(e)))
            return (
              e.forEach(function (r) {
                a.add(y(r, t, n, r, e, i));
              }),
              a
            );
          if (Ye(e))
            return (
              e.forEach(function (r, o) {
                a.set(o, y(r, t, n, o, e, i));
              }),
              a
            );
          l = u ? (l ? I : T) : l ? q : L;
          var f = r ? z : l(e);
          return (
            (function (e, t) {
              for (
                var n = -1, r = null == e ? 0 : e.length;
                ++n < r && !1 !== t(e[n], n, e);

              );
            })(f || e, function (r, o) {
              f && (r = e[(o = r)]), m(a, o, y(r, t, n, o, e, i));
            }),
            a
          );
        }
        function w(e, t, n) {
          return (t = t(e)), $e(e) ? t : r(t, n(e));
        }
        function _(e) {
          if (null == e) e = e === z ? "[object Undefined]" : "[object Null]";
          else if (xe && xe in Object(e)) {
            var t = de.call(e, xe),
              n = e[xe];
            try {
              e[xe] = z;
              var r = !0;
            } catch (e) {}
            var o = pe.call(e);
            r && (t ? (e[xe] = n) : delete e[xe]), (e = o);
          } else e = pe.call(e);
          return e;
        }
        function S(e) {
          return j(e) && "[object Arguments]" == _(e);
        }
        function x(e, t, n, r, o) {
          if (e === t) t = !0;
          else if (null == e || null == t || (!j(e) && !j(t)))
            t = e != e && t != t;
          else
            e: {
              var i,
                a,
                s = $e(e),
                l = $e(t),
                u =
                  "[object Object]" ==
                  (i =
                    "[object Arguments]" == (i = s ? "[object Array]" : ze(e))
                      ? "[object Object]"
                      : i);
              l =
                "[object Object]" ==
                (a =
                  "[object Arguments]" == (a = l ? "[object Array]" : ze(t))
                    ? "[object Object]"
                    : a);
              if ((a = i == a) && We(e)) {
                if (!We(t)) {
                  t = !1;
                  break e;
                }
                (s = !0), (u = !1);
              }
              if (a && !u)
                o || (o = new h()),
                  (t =
                    s || Je(e) ? k(e, t, n, r, x, o) : E(e, t, i, n, r, x, o));
              else {
                if (
                  !(1 & n) &&
                  ((s = u && de.call(e, "__wrapped__")),
                  (i = l && de.call(t, "__wrapped__")),
                  s || i)
                ) {
                  (e = s ? e.value() : e),
                    (t = i ? t.value() : t),
                    o || (o = new h()),
                    (t = x(e, t, n, r, o));
                  break e;
                }
                if (a)
                  t: if (
                    (o || (o = new h()),
                    (s = 1 & n),
                    (i = T(e)),
                    (l = i.length),
                    (a = T(t).length),
                    l == a || s)
                  ) {
                    for (u = l; u--; ) {
                      var c = i[u];
                      if (!(s ? c in t : de.call(t, c))) {
                        t = !1;
                        break t;
                      }
                    }
                    if ((a = o.get(e)) && o.get(t)) t = a == t;
                    else {
                      (a = !0), o.set(e, t), o.set(t, e);
                      for (var d = s; ++u < l; ) {
                        var f = e[(c = i[u])],
                          p = t[c];
                        if (r)
                          var g = s ? r(p, f, c, t, e, o) : r(f, p, c, e, t, o);
                        if (g === z ? f !== p && !x(f, p, n, r, o) : !g) {
                          a = !1;
                          break;
                        }
                        d || (d = "constructor" == c);
                      }
                      a &&
                        !d &&
                        (n = e.constructor) != (r = t.constructor) &&
                        "constructor" in e &&
                        "constructor" in t &&
                        !(
                          "function" == typeof n &&
                          n instanceof n &&
                          "function" == typeof r &&
                          r instanceof r
                        ) &&
                        (a = !1),
                        o.delete(e),
                        o.delete(t),
                        (t = a);
                    }
                  } else t = !1;
                else t = !1;
              }
            }
          return t;
        }
        function P(e) {
          var t = new e.constructor(e.byteLength);
          return new ve(t).set(new ve(e)), t;
        }
        function D(e, t, n) {
          var r = !n;
          n || (n = {});
          for (var o = -1, i = t.length; ++o < i; ) {
            var a = t[o],
              s = z;
            s === z && (s = e[a]), r ? b(n, a, s) : m(n, a, s);
          }
          return n;
        }
        function k(e, t, n, r, i, a) {
          var s = 1 & n,
            l = e.length;
          if (l != (u = t.length) && !(s && u > l)) return !1;
          if ((u = a.get(e)) && a.get(t)) return u == t;
          var u = -1,
            c = !0,
            d = 2 & n ? new p() : z;
          for (a.set(e, t), a.set(t, e); ++u < l; ) {
            var f = e[u],
              h = t[u];
            if (r) var g = s ? r(h, f, u, t, e, a) : r(f, h, u, e, t, a);
            if (g !== z) {
              if (g) continue;
              c = !1;
              break;
            }
            if (d) {
              if (
                !o(t, function (e, t) {
                  if (!d.has(t) && (f === e || i(f, e, n, r, a)))
                    return d.push(t);
                })
              ) {
                c = !1;
                break;
              }
            } else if (f !== h && !i(f, h, n, r, a)) {
              c = !1;
              break;
            }
          }
          return a.delete(e), a.delete(t), c;
        }
        function E(e, t, n, r, o, i, s) {
          switch (n) {
            case "[object DataView]":
              if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
                break;
              (e = e.buffer), (t = t.buffer);
            case "[object ArrayBuffer]":
              if (e.byteLength != t.byteLength || !i(new ve(e), new ve(t)))
                break;
              return !0;
            case "[object Boolean]":
            case "[object Date]":
            case "[object Number]":
              return M(+e, +t);
            case "[object Error]":
              return e.name == t.name && e.message == t.message;
            case "[object RegExp]":
            case "[object String]":
              return e == t + "";
            case "[object Map]":
              var u = a;
            case "[object Set]":
              if ((u || (u = l), e.size != t.size && !(1 & r))) break;
              return (n = s.get(e))
                ? n == t
                : ((r |= 2),
                  s.set(e, t),
                  (t = k(u(e), u(t), r, o, i, s)),
                  s.delete(e),
                  t);
            case "[object Symbol]":
              if (Le) return Le.call(e) == Le.call(t);
          }
          return !1;
        }
        function T(e) {
          return w(e, L, He);
        }
        function I(e) {
          return w(e, q, Ve);
        }
        function C(e, t) {
          var n = e.__data__,
            r = typeof t;
          return (
            "string" == r || "number" == r || "symbol" == r || "boolean" == r
              ? "__proto__" !== t
              : null === t
          )
            ? n["string" == typeof t ? "string" : "hash"]
            : n.map;
        }
        function F(e, t) {
          var n = null == e ? z : e[t];
          return !U(n) || (fe && fe in n) || !(N(n) ? he : $).test(O(n))
            ? z
            : n;
        }
        function A(e) {
          var t = e && e.constructor;
          return e === (("function" == typeof t && t.prototype) || le);
        }
        function O(e) {
          if (null != e) {
            try {
              return ce.call(e);
            } catch (e) {}
            return e + "";
          }
          return "";
        }
        function M(e, t) {
          return e === t || (e != e && t != t);
        }
        function R(e) {
          return null != e && B(e.length) && !N(e);
        }
        function N(e) {
          return (
            !!U(e) &&
            ("[object Function]" == (e = _(e)) ||
              "[object GeneratorFunction]" == e ||
              "[object AsyncFunction]" == e ||
              "[object Proxy]" == e)
          );
        }
        function B(e) {
          return (
            "number" == typeof e &&
            -1 < e &&
            0 == e % 1 &&
            9007199254740991 >= e
          );
        }
        function U(e) {
          var t = typeof e;
          return null != e && ("object" == t || "function" == t);
        }
        function j(e) {
          return null != e && "object" == typeof e;
        }
        function L(e) {
          if (R(e)) e = g(e);
          else if (A(e)) {
            var t,
              n = [];
            for (t in Object(e))
              de.call(e, t) && "constructor" != t && n.push(t);
            e = n;
          } else e = Ee(e);
          return e;
        }
        function q(e) {
          if (R(e)) e = g(e, !0);
          else if (U(e)) {
            var t,
              n = A(e),
              r = [];
            for (t in e)
              ("constructor" != t || (!n && de.call(e, t))) && r.push(t);
            e = r;
          } else {
            if (((t = []), null != e)) for (n in Object(e)) t.push(n);
            e = t;
          }
          return e;
        }
        function H() {
          return [];
        }
        function V() {
          return !1;
        }
        var z,
          G = /\w*$/,
          $ = /^\[object .+?Constructor\]$/,
          W = /^(?:0|[1-9]\d*)$/,
          Y = {};
        (Y["[object Float32Array]"] =
          Y["[object Float64Array]"] =
          Y["[object Int8Array]"] =
          Y["[object Int16Array]"] =
          Y["[object Int32Array]"] =
          Y["[object Uint8Array]"] =
          Y["[object Uint8ClampedArray]"] =
          Y["[object Uint16Array]"] =
          Y["[object Uint32Array]"] =
            !0),
          (Y["[object Arguments]"] =
            Y["[object Array]"] =
            Y["[object ArrayBuffer]"] =
            Y["[object Boolean]"] =
            Y["[object DataView]"] =
            Y["[object Date]"] =
            Y["[object Error]"] =
            Y["[object Function]"] =
            Y["[object Map]"] =
            Y["[object Number]"] =
            Y["[object Object]"] =
            Y["[object RegExp]"] =
            Y["[object Set]"] =
            Y["[object String]"] =
            Y["[object WeakMap]"] =
              !1);
        var Q = {};
        (Q["[object Arguments]"] =
          Q["[object Array]"] =
          Q["[object ArrayBuffer]"] =
          Q["[object DataView]"] =
          Q["[object Boolean]"] =
          Q["[object Date]"] =
          Q["[object Float32Array]"] =
          Q["[object Float64Array]"] =
          Q["[object Int8Array]"] =
          Q["[object Int16Array]"] =
          Q["[object Int32Array]"] =
          Q["[object Map]"] =
          Q["[object Number]"] =
          Q["[object Object]"] =
          Q["[object RegExp]"] =
          Q["[object Set]"] =
          Q["[object String]"] =
          Q["[object Symbol]"] =
          Q["[object Uint8Array]"] =
          Q["[object Uint8ClampedArray]"] =
          Q["[object Uint16Array]"] =
          Q["[object Uint32Array]"] =
            !0),
          (Q["[object Error]"] =
            Q["[object Function]"] =
            Q["[object WeakMap]"] =
              !1);
        var J,
          K = "object" == typeof e && e && e.Object === Object && e,
          X = "object" == typeof self && self && self.Object === Object && self,
          Z = K || X || Function("return this")(),
          ee = "object" == typeof t && t && !t.nodeType && t,
          te = ee && "object" == typeof n && n && !n.nodeType && n,
          ne = te && te.exports === ee,
          re = ne && K.process;
        e: {
          try {
            J = re && re.binding && re.binding("util");
            break e;
          } catch (e) {}
          J = void 0;
        }
        var oe = J && J.isMap,
          ie = J && J.isSet,
          ae = J && J.isTypedArray,
          se = Array.prototype,
          le = Object.prototype,
          ue = Z["__core-js_shared__"],
          ce = Function.prototype.toString,
          de = le.hasOwnProperty,
          fe = (function () {
            var e = /[^.]+$/.exec((ue && ue.keys && ue.keys.IE_PROTO) || "");
            return e ? "Symbol(src)_1." + e : "";
          })(),
          pe = le.toString,
          he = RegExp(
            "^" +
              ce
                .call(de)
                .replace(/[\\^$.*+?()[\]{}|]/g, "\\$&")
                .replace(
                  /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
                  "$1.*?"
                ) +
              "$"
          ),
          ge = ne ? Z.Buffer : z,
          me = Z.Symbol,
          ve = Z.Uint8Array,
          be = ge ? ge.a : z,
          ye = s(Object.getPrototypeOf),
          we = Object.create,
          _e = le.propertyIsEnumerable,
          Se = se.splice,
          xe = me ? me.toStringTag : z,
          Pe = (function () {
            try {
              var e = F(Object, "defineProperty");
              return e({}, "", {}), e;
            } catch (e) {}
          })(),
          De = Object.getOwnPropertySymbols,
          ke = ge ? ge.isBuffer : z,
          Ee = s(Object.keys),
          Te = F(Z, "DataView"),
          Ie = F(Z, "Map"),
          Ce = F(Z, "Promise"),
          Fe = F(Z, "Set"),
          Ae = F(Z, "WeakMap"),
          Oe = F(Object, "create"),
          Me = O(Te),
          Re = O(Ie),
          Ne = O(Ce),
          Be = O(Fe),
          Ue = O(Ae),
          je = me ? me.prototype : z,
          Le = je ? je.valueOf : z,
          qe = (function () {
            function e() {}
            return function (t) {
              return U(t)
                ? we
                  ? we(t)
                  : ((e.prototype = t), (t = new e()), (e.prototype = z), t)
                : {};
            };
          })();
        (c.prototype.clear = function () {
          (this.__data__ = Oe ? Oe(null) : {}), (this.size = 0);
        }),
          (c.prototype.delete = function (e) {
            return (
              (e = this.has(e) && delete this.__data__[e]),
              (this.size -= e ? 1 : 0),
              e
            );
          }),
          (c.prototype.get = function (e) {
            var t = this.__data__;
            return Oe
              ? "__lodash_hash_undefined__" === (e = t[e])
                ? z
                : e
              : de.call(t, e)
              ? t[e]
              : z;
          }),
          (c.prototype.has = function (e) {
            var t = this.__data__;
            return Oe ? t[e] !== z : de.call(t, e);
          }),
          (c.prototype.set = function (e, t) {
            var n = this.__data__;
            return (
              (this.size += this.has(e) ? 0 : 1),
              (n[e] = Oe && t === z ? "__lodash_hash_undefined__" : t),
              this
            );
          }),
          (d.prototype.clear = function () {
            (this.__data__ = []), (this.size = 0);
          }),
          (d.prototype.delete = function (e) {
            var t = this.__data__;
            return !(
              0 > (e = v(t, e)) ||
              (e == t.length - 1 ? t.pop() : Se.call(t, e, 1), --this.size, 0)
            );
          }),
          (d.prototype.get = function (e) {
            var t = this.__data__;
            return 0 > (e = v(t, e)) ? z : t[e][1];
          }),
          (d.prototype.has = function (e) {
            return -1 < v(this.__data__, e);
          }),
          (d.prototype.set = function (e, t) {
            var n = this.__data__,
              r = v(n, e);
            return 0 > r ? (++this.size, n.push([e, t])) : (n[r][1] = t), this;
          }),
          (f.prototype.clear = function () {
            (this.size = 0),
              (this.__data__ = {
                hash: new c(),
                map: new (Ie || d)(),
                string: new c(),
              });
          }),
          (f.prototype.delete = function (e) {
            return (e = C(this, e).delete(e)), (this.size -= e ? 1 : 0), e;
          }),
          (f.prototype.get = function (e) {
            return C(this, e).get(e);
          }),
          (f.prototype.has = function (e) {
            return C(this, e).has(e);
          }),
          (f.prototype.set = function (e, t) {
            var n = C(this, e),
              r = n.size;
            return n.set(e, t), (this.size += n.size == r ? 0 : 1), this;
          }),
          (p.prototype.add = p.prototype.push =
            function (e) {
              return this.__data__.set(e, "__lodash_hash_undefined__"), this;
            }),
          (p.prototype.has = function (e) {
            return this.__data__.has(e);
          }),
          (h.prototype.clear = function () {
            (this.__data__ = new d()), (this.size = 0);
          }),
          (h.prototype.delete = function (e) {
            var t = this.__data__;
            return (e = t.delete(e)), (this.size = t.size), e;
          }),
          (h.prototype.get = function (e) {
            return this.__data__.get(e);
          }),
          (h.prototype.has = function (e) {
            return this.__data__.has(e);
          }),
          (h.prototype.set = function (e, t) {
            var n = this.__data__;
            if (n instanceof d) {
              var r = n.__data__;
              if (!Ie || 199 > r.length)
                return r.push([e, t]), (this.size = ++n.size), this;
              n = this.__data__ = new f(r);
            }
            return n.set(e, t), (this.size = n.size), this;
          });
        var He = De
            ? function (e) {
                return null == e
                  ? []
                  : ((e = Object(e)),
                    (function (e, t) {
                      for (
                        var n = -1, r = null == e ? 0 : e.length, o = 0, i = [];
                        ++n < r;

                      ) {
                        var a = e[n];
                        t(a, n, e) && (i[o++] = a);
                      }
                      return i;
                    })(De(e), function (t) {
                      return _e.call(e, t);
                    }));
              }
            : H,
          Ve = De
            ? function (e) {
                for (var t = []; e; ) r(t, He(e)), (e = ye(e));
                return t;
              }
            : H,
          ze = _;
        ((Te && "[object DataView]" != ze(new Te(new ArrayBuffer(1)))) ||
          (Ie && "[object Map]" != ze(new Ie())) ||
          (Ce && "[object Promise]" != ze(Ce.resolve())) ||
          (Fe && "[object Set]" != ze(new Fe())) ||
          (Ae && "[object WeakMap]" != ze(new Ae()))) &&
          (ze = function (e) {
            var t = _(e);
            if (
              (e = (e = "[object Object]" == t ? e.constructor : z) ? O(e) : "")
            )
              switch (e) {
                case Me:
                  return "[object DataView]";
                case Re:
                  return "[object Map]";
                case Ne:
                  return "[object Promise]";
                case Be:
                  return "[object Set]";
                case Ue:
                  return "[object WeakMap]";
              }
            return t;
          });
        var Ge = S(
            (function () {
              return arguments;
            })()
          )
            ? S
            : function (e) {
                return j(e) && de.call(e, "callee") && !_e.call(e, "callee");
              },
          $e = Array.isArray,
          We = ke || V,
          Ye = oe
            ? i(oe)
            : function (e) {
                return j(e) && "[object Map]" == ze(e);
              },
          Qe = ie
            ? i(ie)
            : function (e) {
                return j(e) && "[object Set]" == ze(e);
              },
          Je = ae
            ? i(ae)
            : function (e) {
                return j(e) && B(e.length) && !!Y[_(e)];
              };
        (u.keys = L),
          (u.keysIn = q),
          (u.cloneDeep = function (e) {
            return y(e, 5);
          }),
          (u.eq = M),
          (u.isArguments = Ge),
          (u.isArray = $e),
          (u.isArrayLike = R),
          (u.isBuffer = We),
          (u.isEqual = function (e, t) {
            return x(e, t);
          }),
          (u.isFunction = N),
          (u.isLength = B),
          (u.isMap = Ye),
          (u.isNil = function (e) {
            return null == e;
          }),
          (u.isObject = U),
          (u.isObjectLike = j),
          (u.isSet = Qe),
          (u.isTypedArray = Je),
          (u.stubArray = H),
          (u.stubFalse = V),
          (u.VERSION = "4.17.5"),
          (Z._ = u);
      }.call(this),
      n.exports
    );
  }.call({}));
  const S = globalThis._;
  delete globalThis._;
  var x = {
    controller: {
      init: function () {
        (function () {
          if (Array.prototype.flat) return;
          Array.prototype.flat = function () {
            const e = [...this],
              t = [];
            for (const n of e) Array.isArray(n) ? t.push(...n) : t.push(n);
            return t;
          };
        })(),
          String.prototype.replaceAll ||
            (String.prototype.replaceAll = function (e, t) {
              return this.split(e).join(t);
            });
      },
    },
  };
  var P = {
    init: function () {
      (globalThis.log = u.features.log
        ? (...e) => {
            console.log(...e);
          }
        : () => {}),
        (globalThis.error = (...e) => {
          console.error(...e);
        }),
        (globalThis.warn = (...e) => {
          console.warn(...e);
        }),
        (globalThis.dir = (...e) => {
          console.dir(...e);
        });
    },
  };
  var D = {
    unique: function (e) {
      return Array.from(new Set(e));
    },
    gaussian: k,
    gaussianInt: function (e, t) {
      return Math.round(e + k() * (t - e));
    },
    forceLayout: function () {
      document.body.getBoundingClientRect();
    },
    hashCode: E,
    pseudorandom: function (e) {
      return ((16807 * Math.max(Math.abs(E(e)), 1)) % 2147483647) / 2147483646;
    },
    rotate: function (e, t = 1) {
      const n = "slashed.io";
      let r = "";
      return (
        Array.from(e).forEach((e, o) => {
          const i = n[o % n.length].charCodeAt(),
            a = (e.charCodeAt() + t * i + 65536) % 65536;
          r += String.fromCharCode(a);
        }),
        r
      );
    },
    getUnixTime: function () {
      return Math.round(Date.now() / 1e3);
    },
    takeBetween: function (e, t, n) {
      const r = e.split(t)[1];
      if (!r) return null;
      return r.split(n)[0] || null;
    },
    takeAllBetween: function (e, t, n) {
      return e
        .split(t)
        .slice(1)
        .map((e) => e.split(n)[0]);
    },
    capitalize: function (e) {
      return e.charAt(0).toUpperCase() + e.substr(1).toLowerCase();
    },
    getIntegralNumberPart: function (e) {
      const t = Math.abs(e);
      return e > 0 ? Math.floor(t) : -Math.floor(t);
    },
    getFractalNumberPart: function (e) {
      const t = Math.abs(e);
      return Number((t - Math.floor(t)).toFixed(12));
    },
  };
  function k() {
    let e = 0;
    for (let t = 0; t < 6; t += 1) e += Math.random();
    return e / 6;
  }
  function E(e) {
    if (!e) return 0;
    let t,
      n,
      r = 0;
    if (0 === e.length) return r;
    for (t = 0; t < e.length; t++)
      (n = e.charCodeAt(t)), (r = (r << 5) - r + n), (r |= 0);
    return r;
  }
  async function T(e) {
    if ("number" == typeof e && Number.isFinite(e)) {
      const t = e;
      await new Promise((e) => setTimeout(e, t));
    } else {
      if (!e || "object" != typeof e || e.constructor !== Object)
        throw new Error(
          "unexpected sleep function argument: number or object expected, got",
          e
        );
      {
        const { min: t, max: n } =
            e.longBreak &&
            Math.random() < 1 - Math.pow(0.5, 1 / e.longBreak.every)
              ? { min: 0, max: 0, ...e.longBreak }
              : { min: 0, max: 0, ...e },
          r = n - t,
          o = t + D.gaussianInt(0, r);
        if (0 === o) return;
        await new Promise((e) => setTimeout(e, o));
      }
    }
  }
  async function I(e, ...t) {
    return new Promise((n) => {
      e(...t, n);
    });
  }
  function C(e) {
    return Object.keys(e)
      .map((t) => {
        const n = e[t];
        return A(n)
          ? F(t, n)
          : Array.isArray(n)
          ? n.map((e) => F(t, e)).join("&")
          : null;
      })
      .filter(Boolean)
      .join("&")
      .replace(/%5B/g, "[")
      .replace(/%5D/g, "]");
  }
  function F(e, t) {
    return (
      A(t) || (t = JSON.stringify(t)),
      `${encodeURIComponent(e)}=${encodeURIComponent(t)}`
    );
  }
  function A(e) {
    return (
      "string" == typeof e || "number" == typeof e || "boolean" == typeof e
    );
  }
  function O(e, t = {}) {
    const n = C(t);
    return n ? `${e}?${n}` : e;
  }
  function M(e) {
    return e.replace(/[\n\r\t]/g, " ");
  }
  var R = {
      ls: o,
      safe: function (e, t = null) {
        try {
          const n = e();
          return n instanceof Promise
            ? new Promise((e, r) => {
                n.then(e).catch((n) => {
                  n && console.error(n), e(t);
                });
              })
            : n;
        } catch (e) {
          return console.error(e), t;
        }
      },
      sleep: T,
      isObject: function (e) {
        return "[object Object]" === Object.prototype.toString.call(e);
      },
      callAsync: I,
      createUrl: O,
      jsonEscape: M,
      createAlarm: function (e, { delay: t, period: n, when: r }, o) {
        const i = {};
        "number" == typeof t && (i.delayInMinutes = t / g),
          "number" == typeof n && (i.periodInMinutes = n / g),
          "number" == typeof r && (i.when = r),
          chrome.alarms.create(e, i),
          chrome.alarms.onAlarm.addListener((t) => {
            t.name === e && o();
          });
      },
      watchForIgCookie: function (e, t) {
        chrome.cookies.onChanged.addListener(
          async ({ cookie: n, cause: r, removed: o }) => {
            n.domain.includes("instagram.com") &&
              n.name === e &&
              "explicit" === r &&
              (o ||
                (await t(n),
                chrome.cookies.remove({
                  url: "https://www.instagram.com",
                  name: e,
                }),
                chrome.cookies.onChanged.removeListener()));
          }
        );
      },
      createQueryString: C,
      createResolvablePromise: function () {
        let e;
        const t = new Promise((t) => {
          e = t;
        });
        return Object.defineProperty(t, "resolve", { get: () => e }), t;
      },
      time: w,
    },
    N = {
      on: function (e, t) {
        L();
        (B[e] || (B[e] = [])).push(t);
      },
      off: function (e, t) {
        const n = B[e];
        if (!n) return;
        for (;;) {
          const e = n.findIndex((e) => e === t);
          if (-1 === e) break;
          n.splice(e, 1);
        }
      },
      send: function (e, ...t) {
        let n;
        const r = t[t.length - 1];
        "function" == typeof r ? ((n = r), (t = t.slice(0, -1))) : (n = null);
        return new Promise((r) => {
          chrome.runtime.sendMessage({ [U]: e, [j]: t }, (e) => {
            chrome.runtime.lastError || (n && n(e), r(e));
          });
        });
      },
    };
  const B = {},
    U = "__$chromeBus.name",
    j = "__$chromeBus.args";
  function L() {
    const e = L;
    e.init ||
      ((e.init = !0),
      chrome.runtime.onMessage.addListener((e, t, n) => {
        const r = e["__$chromeBus.name"];
        if (!r) return !1;
        const o = e["__$chromeBus.args"] || [],
          i = B[r] || [];
        return (
          0 !== i.length &&
          ((async () => {
            const e = await Promise.all(i.map((e) => e(...o))),
              t = e[e.length - 1];
            n(t);
          })(),
          !!n)
        );
      }));
  }
  var q = N;
  var H = {
      controller: {
        init: async function () {
          3 === u.manifestVersion &&
            ((this._lastRuleId = 1),
            (this._globalRules = []),
            (this._tabRuleIds = []),
            (this._tabRuleCreators = []),
            this._watchForPopupTab(),
            await this._dropAllRules(),
            await this._applyGlobalRules());
        },
        _watchForPopupTab: function () {
          q.on("wri.popup-tab-created", async (e) => {
            await this._removeRules(this._tabRuleIds);
            const t = this._tabRuleCreators.map((t) => t(e)),
              n = await this._applyRules(t);
            this._tabRuleIds = n;
          });
        },
        _dropAllRules: async function () {
          const e = await R.callAsync(
            chrome.declarativeNetRequest.getSessionRules
          );
          this._removeRules(e.map((e) => e.id));
        },
        _applyGlobalRules: async function () {
          await this._applyRules(this._globalRules);
        },
        _addRule: async function (e) {
          "function" == typeof e
            ? this._tabRuleCreators.push(e)
            : this._globalRules.push(e);
        },
        _removeRules: async function (e) {
          await R.callAsync(chrome.declarativeNetRequest.updateSessionRules, {
            removeRuleIds: e,
          });
        },
        _applyRules: async function (e) {
          return (
            (e = e.map((e) => ({
              id: this._lastRuleId++,
              priority: 1,
              ...e,
              condition: {
                resourceTypes: [
                  "main_frame",
                  "sub_frame",
                  "stylesheet",
                  "script",
                  "image",
                  "font",
                  "object",
                  "xmlhttprequest",
                  "ping",
                  "csp_report",
                  "media",
                  "websocket",
                  "webtransport",
                  "webbundle",
                ],
                ...e.condition,
              },
            }))),
            await R.callAsync(chrome.declarativeNetRequest.updateSessionRules, {
              addRules: e,
            }),
            e.map((e) => e.id)
          );
        },
      },
    },
    V = function (e, t) {
      return (V =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (e, t) {
            e.__proto__ = t;
          }) ||
        function (e, t) {
          for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
        })(e, t);
    };
  /*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
  
  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
  
  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ******************************************************************************/ function z(
    e,
    t
  ) {
    function n() {
      this.constructor = e;
    }
    V(e, t),
      (e.prototype =
        null === t ? Object.create(t) : ((n.prototype = t.prototype), new n()));
  }
  var G = function () {
    return (G =
      Object.assign ||
      function (e) {
        for (var t, n = 1, r = arguments.length; n < r; n++)
          for (var o in (t = arguments[n]))
            Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
        return e;
      }).apply(this, arguments);
  };
  function $(e) {
    var t = "function" == typeof Symbol && Symbol.iterator,
      n = t && e[t],
      r = 0;
    if (n) return n.call(e);
    if (e && "number" == typeof e.length)
      return {
        next: function () {
          return (
            e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e }
          );
        },
      };
    throw new TypeError(
      t ? "Object is not iterable." : "Symbol.iterator is not defined."
    );
  }
  function W(e, t) {
    var n = "function" == typeof Symbol && e[Symbol.iterator];
    if (!n) return e;
    var r,
      o,
      i = n.call(e),
      a = [];
    try {
      for (; (void 0 === t || t-- > 0) && !(r = i.next()).done; )
        a.push(r.value);
    } catch (e) {
      o = { error: e };
    } finally {
      try {
        r && !r.done && (n = i.return) && n.call(i);
      } finally {
        if (o) throw o.error;
      }
    }
    return a;
  }
  function Y() {
    for (var e = [], t = 0; t < arguments.length; t++)
      e = e.concat(W(arguments[t]));
    return e;
  }
  var Q = {};
  function J(e) {
    switch (Object.prototype.toString.call(e)) {
      case "[object Error]":
      case "[object Exception]":
      case "[object DOMException]":
        return !0;
      default:
        return le(e, Error);
    }
  }
  function K(e) {
    return "[object ErrorEvent]" === Object.prototype.toString.call(e);
  }
  function X(e) {
    return "[object DOMError]" === Object.prototype.toString.call(e);
  }
  function Z(e) {
    return "[object DOMException]" === Object.prototype.toString.call(e);
  }
  function ee(e) {
    return "[object String]" === Object.prototype.toString.call(e);
  }
  function te(e) {
    return null === e || ("object" != typeof e && "function" != typeof e);
  }
  function ne(e) {
    return "[object Object]" === Object.prototype.toString.call(e);
  }
  function re(e) {
    return "undefined" != typeof Event && le(e, Event);
  }
  function oe(e) {
    return "undefined" != typeof Element && le(e, Element);
  }
  function ie(e) {
    return "[object RegExp]" === Object.prototype.toString.call(e);
  }
  function ae(e) {
    return Boolean(e && e.then && "function" == typeof e.then);
  }
  function se(e) {
    return (
      ne(e) &&
      "nativeEvent" in e &&
      "preventDefault" in e &&
      "stopPropagation" in e
    );
  }
  function le(e, t) {
    try {
      return e instanceof t;
    } catch (e) {
      return !1;
    }
  }
  function ue(e) {
    try {
      for (
        var t = e, n = [], r = 0, o = 0, i = " > ".length, a = void 0;
        t &&
        r++ < 5 &&
        !(
          "html" === (a = ce(t)) ||
          (r > 1 && o + n.length * i + a.length >= 80)
        );

      )
        n.push(a), (o += a.length), (t = t.parentNode);
      return n.reverse().join(" > ");
    } catch (e) {
      return "<unknown>";
    }
  }
  function ce(e) {
    var t,
      n,
      r,
      o,
      i,
      a = e,
      s = [];
    if (!a || !a.tagName) return "";
    if (
      (s.push(a.tagName.toLowerCase()),
      a.id && s.push("#" + a.id),
      (t = a.className) && ee(t))
    )
      for (n = t.split(/\s+/), i = 0; i < n.length; i++) s.push("." + n[i]);
    var l = ["type", "name", "title", "alt"];
    for (i = 0; i < l.length; i++)
      (r = l[i]), (o = a.getAttribute(r)) && s.push("[" + r + '="' + o + '"]');
    return s.join("");
  }
  r(Q, "isError", function () {
    return J;
  }),
    r(Q, "isErrorEvent", function () {
      return K;
    }),
    r(Q, "isDOMError", function () {
      return X;
    }),
    r(Q, "isDOMException", function () {
      return Z;
    }),
    r(Q, "isString", function () {
      return ee;
    }),
    r(Q, "isPrimitive", function () {
      return te;
    }),
    r(Q, "isPlainObject", function () {
      return ne;
    }),
    r(Q, "isEvent", function () {
      return re;
    }),
    r(Q, "isElement", function () {
      return oe;
    }),
    r(Q, "isRegExp", function () {
      return ie;
    }),
    r(Q, "isThenable", function () {
      return ae;
    }),
    r(Q, "isSyntheticEvent", function () {
      return se;
    }),
    r(Q, "isInstanceOf", function () {
      return le;
    }),
    r({}, "htmlTreeAsString", function () {
      return ue;
    });
  var de =
    Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array
      ? function (e, t) {
          return (e.__proto__ = t), e;
        }
      : function (e, t) {
          for (var n in t) e.hasOwnProperty(n) || (e[n] = t[n]);
          return e;
        });
  var fe = (function (e) {
    function t(t) {
      var n = this.constructor,
        r = e.call(this, t) || this;
      return (
        (r.message = t),
        (r.name = n.prototype.constructor.name),
        de(r, n.prototype),
        r
      );
    }
    return z(t, e), t;
  })(Error);
  r({}, "SentryError", function () {
    return fe;
  });
  var pe = /^(?:(\w+):)\/\/(?:(\w+)(?::(\w+))?@)([\w.-]+)(?::(\d+))?\/(.+)/,
    he = "Invalid Dsn",
    ge = (function () {
      function e(e) {
        "string" == typeof e ? this._fromString(e) : this._fromComponents(e),
          this._validate();
      }
      return (
        (e.prototype.toString = function (e) {
          void 0 === e && (e = !1);
          var t = this,
            n = t.host,
            r = t.path,
            o = t.pass,
            i = t.port,
            a = t.projectId;
          return (
            t.protocol +
            "://" +
            t.user +
            (e && o ? ":" + o : "") +
            "@" +
            n +
            (i ? ":" + i : "") +
            "/" +
            (r ? r + "/" : r) +
            a
          );
        }),
        (e.prototype._fromString = function (e) {
          var t = pe.exec(e);
          if (!t) throw new fe(he);
          var n = W(t.slice(1), 6),
            r = n[0],
            o = n[1],
            i = n[2],
            a = void 0 === i ? "" : i,
            s = n[3],
            l = n[4],
            u = void 0 === l ? "" : l,
            c = "",
            d = n[5],
            f = d.split("/");
          if (
            (f.length > 1 && ((c = f.slice(0, -1).join("/")), (d = f.pop())), d)
          ) {
            var p = d.match(/^\d+/);
            p && (d = p[0]);
          }
          this._fromComponents({
            host: s,
            pass: a,
            path: c,
            projectId: d,
            port: u,
            protocol: r,
            user: o,
          });
        }),
        (e.prototype._fromComponents = function (e) {
          (this.protocol = e.protocol),
            (this.user = e.user),
            (this.pass = e.pass || ""),
            (this.host = e.host),
            (this.port = e.port || ""),
            (this.path = e.path || ""),
            (this.projectId = e.projectId);
        }),
        (e.prototype._validate = function () {
          var e = this;
          if (
            (["protocol", "user", "host", "projectId"].forEach(function (t) {
              if (!e[t]) throw new fe("Invalid Dsn: " + t + " missing");
            }),
            !this.projectId.match(/^\d+$/))
          )
            throw new fe("Invalid Dsn: Invalid projectId " + this.projectId);
          if ("http" !== this.protocol && "https" !== this.protocol)
            throw new fe("Invalid Dsn: Invalid protocol " + this.protocol);
          if (this.port && isNaN(parseInt(this.port, 10)))
            throw new fe("Invalid Dsn: Invalid port " + this.port);
        }),
        e
      );
    })();
  r({}, "Dsn", function () {
    return ge;
  });
  var me,
    ve,
    be,
    ye = {},
    we = (me = {});
  function _e() {
    throw new Error("setTimeout has not been defined");
  }
  function Se() {
    throw new Error("clearTimeout has not been defined");
  }
  function xe(e) {
    if (ve === setTimeout) return setTimeout(e, 0);
    if ((ve === _e || !ve) && setTimeout)
      return (ve = setTimeout), setTimeout(e, 0);
    try {
      return ve(e, 0);
    } catch (t) {
      try {
        return ve.call(null, e, 0);
      } catch (t) {
        return ve.call(this, e, 0);
      }
    }
  }
  !(function () {
    try {
      ve = "function" == typeof setTimeout ? setTimeout : _e;
    } catch (e) {
      ve = _e;
    }
    try {
      be = "function" == typeof clearTimeout ? clearTimeout : Se;
    } catch (e) {
      be = Se;
    }
  })();
  var Pe,
    De = [],
    ke = !1,
    Ee = -1;
  function Te() {
    ke &&
      Pe &&
      ((ke = !1),
      Pe.length ? (De = Pe.concat(De)) : (Ee = -1),
      De.length && Ie());
  }
  function Ie() {
    if (!ke) {
      var e = xe(Te);
      ke = !0;
      for (var t = De.length; t; ) {
        for (Pe = De, De = []; ++Ee < t; ) Pe && Pe[Ee].run();
        (Ee = -1), (t = De.length);
      }
      (Pe = null),
        (ke = !1),
        (function (e) {
          if (be === clearTimeout) return clearTimeout(e);
          if ((be === Se || !be) && clearTimeout)
            return (be = clearTimeout), clearTimeout(e);
          try {
            be(e);
          } catch (t) {
            try {
              return be.call(null, e);
            } catch (t) {
              return be.call(this, e);
            }
          }
        })(e);
    }
  }
  function Ce(e, t) {
    (this.fun = e), (this.array = t);
  }
  function Fe() {}
  (we.nextTick = function (e) {
    var t = new Array(arguments.length - 1);
    if (arguments.length > 1)
      for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
    De.push(new Ce(e, t)), 1 !== De.length || ke || xe(Ie);
  }),
    (Ce.prototype.run = function () {
      this.fun.apply(null, this.array);
    }),
    (we.title = "browser"),
    (we.browser = !0),
    (we.env = {}),
    (we.argv = []),
    (we.version = ""),
    (we.versions = {}),
    (we.on = Fe),
    (we.addListener = Fe),
    (we.once = Fe),
    (we.off = Fe),
    (we.removeListener = Fe),
    (we.removeAllListeners = Fe),
    (we.emit = Fe),
    (we.prependListener = Fe),
    (we.prependOnceListener = Fe),
    (we.listeners = function (e) {
      return [];
    }),
    (we.binding = function (e) {
      throw new Error("process.binding is not supported");
    }),
    (we.cwd = function () {
      return "/";
    }),
    (we.chdir = function (e) {
      throw new Error("process.chdir is not supported");
    }),
    (we.umask = function () {
      return 0;
    });
  var Ae = {},
    Oe = (function () {
      function e() {
        (this._hasWeakSet = "function" == typeof WeakSet),
          (this._inner = this._hasWeakSet ? new WeakSet() : []);
      }
      return (
        (e.prototype.memoize = function (e) {
          if (this._hasWeakSet)
            return !!this._inner.has(e) || (this._inner.add(e), !1);
          for (var t = 0; t < this._inner.length; t++) {
            if (this._inner[t] === e) return !0;
          }
          return this._inner.push(e), !1;
        }),
        (e.prototype.unmemoize = function (e) {
          if (this._hasWeakSet) this._inner.delete(e);
          else
            for (var t = 0; t < this._inner.length; t++)
              if (this._inner[t] === e) {
                this._inner.splice(t, 1);
                break;
              }
        }),
        e
      );
    })();
  r({}, "Memo", function () {
    return Oe;
  });
  var Me = "<anonymous>";
  function Re(e) {
    try {
      return (e && "function" == typeof e && e.name) || Me;
    } catch (e) {
      return Me;
    }
  }
  r({}, "getFunctionName", function () {
    return Re;
  });
  var Ne = {};
  function Be(e, t) {
    return (
      void 0 === t && (t = 0),
      "string" != typeof e || 0 === t || e.length <= t
        ? e
        : e.substr(0, t) + "..."
    );
  }
  function Ue(e, t) {
    var n = e,
      r = n.length;
    if (r <= 150) return n;
    t > r && (t = r);
    var o = Math.max(t - 60, 0);
    o < 5 && (o = 0);
    var i = Math.min(o + 140, r);
    return (
      i > r - 5 && (i = r),
      i === r && (o = Math.max(i - 140, 0)),
      (n = n.slice(o, i)),
      o > 0 && (n = "'{snip} " + n),
      i < r && (n += " {snip}"),
      n
    );
  }
  function je(e, t) {
    if (!Array.isArray(e)) return "";
    for (var n = [], r = 0; r < e.length; r++) {
      var o = e[r];
      try {
        n.push(String(o));
      } catch (e) {
        n.push("[value cannot be serialized]");
      }
    }
    return n.join(t);
  }
  function Le(e, t) {
    return (
      !!ee(e) &&
      (ie(t) ? t.test(e) : "string" == typeof t && -1 !== e.indexOf(t))
    );
  }
  function qe(e, t, n) {
    if (t in e) {
      var r = e[t],
        o = n(r);
      if ("function" == typeof o)
        try {
          (o.prototype = o.prototype || {}),
            Object.defineProperties(o, {
              __sentry_original__: { enumerable: !1, value: r },
            });
        } catch (e) {}
      e[t] = o;
    }
  }
  function He(e) {
    return Object.keys(e)
      .map(function (t) {
        return encodeURIComponent(t) + "=" + encodeURIComponent(e[t]);
      })
      .join("&");
  }
  function Ve(e) {
    if (J(e)) {
      var t = e,
        n = { message: t.message, name: t.name, stack: t.stack };
      for (var r in t)
        Object.prototype.hasOwnProperty.call(t, r) && (n[r] = t[r]);
      return n;
    }
    if (re(e)) {
      var o = e,
        i = {};
      i.type = o.type;
      try {
        i.target = oe(o.target)
          ? ue(o.target)
          : Object.prototype.toString.call(o.target);
      } catch (e) {
        i.target = "<unknown>";
      }
      try {
        i.currentTarget = oe(o.currentTarget)
          ? ue(o.currentTarget)
          : Object.prototype.toString.call(o.currentTarget);
      } catch (e) {
        i.currentTarget = "<unknown>";
      }
      for (var r in ("undefined" != typeof CustomEvent &&
        le(e, CustomEvent) &&
        (i.detail = o.detail),
      o))
        Object.prototype.hasOwnProperty.call(o, r) && (i[r] = o);
      return i;
    }
    return e;
  }
  function ze(e) {
    return (function (e) {
      return ~-encodeURI(e).split(/%..|./).length;
    })(JSON.stringify(e));
  }
  function Ge(e, t, n) {
    void 0 === t && (t = 3), void 0 === n && (n = 102400);
    var r = Ye(e, t);
    return ze(r) > n ? Ge(e, t - 1, n) : r;
  }
  function $e(t, n) {
    return "domain" === n && t && "object" == typeof t && t._events
      ? "[Domain]"
      : "domainEmitter" === n
      ? "[DomainEmitter]"
      : void 0 !== e && t === e
      ? "[Global]"
      : "undefined" != typeof window && t === window
      ? "[Window]"
      : "undefined" != typeof document && t === document
      ? "[Document]"
      : se(t)
      ? "[SyntheticEvent]"
      : "number" == typeof t && t != t
      ? "[NaN]"
      : void 0 === t
      ? "[undefined]"
      : "function" == typeof t
      ? "[Function: " + Re(t) + "]"
      : t;
  }
  function We(e, t, n, r) {
    if ((void 0 === n && (n = 1 / 0), void 0 === r && (r = new Oe()), 0 === n))
      return (function (e) {
        var t = Object.prototype.toString.call(e);
        if ("string" == typeof e) return e;
        if ("[object Object]" === t) return "[Object]";
        if ("[object Array]" === t) return "[Array]";
        var n = $e(e);
        return te(n) ? n : t;
      })(t);
    if (null != t && "function" == typeof t.toJSON) return t.toJSON();
    var o = $e(t, e);
    if (te(o)) return o;
    var i = Ve(t),
      a = Array.isArray(t) ? [] : {};
    if (r.memoize(t)) return "[Circular ~]";
    for (var s in i)
      Object.prototype.hasOwnProperty.call(i, s) &&
        (a[s] = We(s, i[s], n - 1, r));
    return r.unmemoize(t), a;
  }
  function Ye(e, t) {
    try {
      return JSON.parse(
        JSON.stringify(e, function (e, n) {
          return We(e, n, t);
        })
      );
    } catch (e) {
      return "**non-serializable**";
    }
  }
  function Qe(e, t) {
    void 0 === t && (t = 40);
    var n = Object.keys(Ve(e));
    if ((n.sort(), !n.length)) return "[object has no keys]";
    if (n[0].length >= t) return Be(n[0], t);
    for (var r = n.length; r > 0; r--) {
      var o = n.slice(0, r).join(", ");
      if (!(o.length > t)) return r === n.length ? o : Be(o, t);
    }
    return "";
  }
  r(Ne, "truncate", function () {
    return Be;
  }),
    r(Ne, "snipLine", function () {
      return Ue;
    }),
    r(Ne, "safeJoin", function () {
      return je;
    }),
    r(Ne, "isMatchingPattern", function () {
      return Le;
    }),
    r(Ae, "fill", function () {
      return qe;
    }),
    r(Ae, "urlEncode", function () {
      return He;
    }),
    r(Ae, "normalizeToSize", function () {
      return Ge;
    }),
    r(Ae, "normalize", function () {
      return Ye;
    }),
    r(Ae, "extractExceptionKeysForMessage", function () {
      return Qe;
    });
  var Je = function () {
      var e = this,
        t = { exports: this };
      e.__esModule = !0;
      var n = me;
      function o() {
        return (
          "[object process]" ===
          Object.prototype.toString.call(void 0 !== n ? n : 0)
        );
      }
      function i(e, t) {
        return e.require(t);
      }
      r(e, "isNodeEnv", function () {
        return o;
      }),
        r(e, "dynamicRequire", function () {
          return i;
        });
      var a = ["cookies", "data", "headers", "method", "query_string", "url"];
      function s(e, n) {
        if ((void 0 === n && (n = a), !o()))
          throw new Error(
            "Can't get node request data outside of a node environment"
          );
        var r = {},
          s = e.headers || e.header || {},
          l = e.method,
          u = e.hostname || e.host || s.host || "<no host>",
          c =
            "https" === e.protocol || e.secure || (e.socket || {}).encrypted
              ? "https"
              : "http",
          d = e.originalUrl || e.url,
          f = c + "://" + u + d;
        return (
          n.forEach(function (n) {
            switch (n) {
              case "headers":
                r.headers = s;
                break;
              case "method":
                r.method = l;
                break;
              case "url":
                r.url = f;
                break;
              case "cookies":
                r.cookies = i(t, "cookie").parse(s.cookie || "");
                break;
              case "query_string":
                r.query_string = i(t, "url").parse(d || "", !1).query;
                break;
              case "data":
                if ("GET" === l || "HEAD" === l) break;
                void 0 !== e.body &&
                  (r.data = ee(e.body) ? e.body : JSON.stringify(Ye(e.body)));
                break;
              default:
                ({}.hasOwnProperty.call(e, n) && (r[n] = e[n]));
            }
          }),
          r
        );
      }
      return (
        r(e, "extractNodeRequestData", function () {
          return s;
        }),
        t.exports
      );
    }.call({}),
    Ke = {};
  function Xe() {
    return Je.isNodeEnv()
      ? e
      : "undefined" != typeof window
      ? window
      : "undefined" != typeof self
      ? self
      : Ke;
  }
  function Ze() {
    var e = Xe(),
      t = e.crypto || e.msCrypto;
    if (void 0 !== t && t.getRandomValues) {
      var n = new Uint16Array(8);
      t.getRandomValues(n),
        (n[3] = (4095 & n[3]) | 16384),
        (n[4] = (16383 & n[4]) | 32768);
      var r = function (e) {
        for (var t = e.toString(16); t.length < 4; ) t = "0" + t;
        return t;
      };
      return (
        r(n[0]) +
        r(n[1]) +
        r(n[2]) +
        r(n[3]) +
        r(n[4]) +
        r(n[5]) +
        r(n[6]) +
        r(n[7])
      );
    }
    return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, function (e) {
      var t = (16 * Math.random()) | 0;
      return ("x" === e ? t : (3 & t) | 8).toString(16);
    });
  }
  function et(e) {
    if (!e) return {};
    var t = e.match(
      /^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/
    );
    if (!t) return {};
    var n = t[6] || "",
      r = t[8] || "";
    return { host: t[4], path: t[5], protocol: t[2], relative: t[5] + n + r };
  }
  function tt(e) {
    if (e.message) return e.message;
    if (e.exception && e.exception.values && e.exception.values[0]) {
      var t = e.exception.values[0];
      return t.type && t.value
        ? t.type + ": " + t.value
        : t.type || t.value || e.event_id || "<unknown>";
    }
    return e.event_id || "<unknown>";
  }
  function nt(e) {
    var t = Xe();
    if (!("console" in t)) return e();
    var n = t.console,
      r = {};
    ["debug", "info", "warn", "error", "log", "assert"].forEach(function (e) {
      e in t.console &&
        n[e].__sentry_original__ &&
        ((r[e] = n[e]), (n[e] = n[e].__sentry_original__));
    });
    var o = e();
    return (
      Object.keys(r).forEach(function (e) {
        n[e] = r[e];
      }),
      o
    );
  }
  function rt(e, t, n) {
    (e.exception = e.exception || {}),
      (e.exception.values = e.exception.values || []),
      (e.exception.values[0] = e.exception.values[0] || {}),
      (e.exception.values[0].value = e.exception.values[0].value || t || ""),
      (e.exception.values[0].type = e.exception.values[0].type || n || "Error");
  }
  function ot(e, t) {
    void 0 === t && (t = {});
    try {
      (e.exception.values[0].mechanism = e.exception.values[0].mechanism || {}),
        Object.keys(t).forEach(function (n) {
          e.exception.values[0].mechanism[n] = t[n];
        });
    } catch (e) {}
  }
  function it() {
    try {
      return document.location.href;
    } catch (e) {
      return "";
    }
  }
  r(ye, "getGlobalObject", function () {
    return Xe;
  }),
    r(ye, "uuid4", function () {
      return Ze;
    }),
    r(ye, "parseUrl", function () {
      return et;
    }),
    r(ye, "getEventDescription", function () {
      return tt;
    }),
    r(ye, "consoleSandbox", function () {
      return nt;
    }),
    r(ye, "addExceptionTypeValue", function () {
      return rt;
    }),
    r(ye, "addExceptionMechanism", function () {
      return ot;
    }),
    r(ye, "getLocationHref", function () {
      return it;
    });
  function at(e, t) {
    if (!t) return 6e4;
    var n = parseInt("" + t, 10);
    if (!isNaN(n)) return 1e3 * n;
    var r = Date.parse("" + t);
    return isNaN(r) ? 6e4 : r - e;
  }
  r(ye, "parseRetryAfterHeader", function () {
    return at;
  });
  var st = Xe(),
    lt = (function () {
      function e() {
        this._enabled = !1;
      }
      return (
        (e.prototype.disable = function () {
          this._enabled = !1;
        }),
        (e.prototype.enable = function () {
          this._enabled = !0;
        }),
        (e.prototype.log = function () {
          for (var e = [], t = 0; t < arguments.length; t++)
            e[t] = arguments[t];
          this._enabled &&
            nt(function () {
              st.console.log("Sentry Logger [Log]: " + e.join(" "));
            });
        }),
        (e.prototype.warn = function () {
          for (var e = [], t = 0; t < arguments.length; t++)
            e[t] = arguments[t];
          this._enabled &&
            nt(function () {
              st.console.warn("Sentry Logger [Warn]: " + e.join(" "));
            });
        }),
        (e.prototype.error = function () {
          for (var e = [], t = 0; t < arguments.length; t++)
            e[t] = arguments[t];
          this._enabled &&
            nt(function () {
              st.console.error("Sentry Logger [Error]: " + e.join(" "));
            });
        }),
        e
      );
    })();
  st.__SENTRY__ = st.__SENTRY__ || {};
  var ut = st.__SENTRY__.logger || (st.__SENTRY__.logger = new lt());
  r({}, "logger", function () {
    return ut;
  });
  var ct = {};
  function dt() {
    if (!("fetch" in Xe())) return !1;
    try {
      return new Headers(), new Request(""), new Response(), !0;
    } catch (e) {
      return !1;
    }
  }
  function ft(e) {
    return (
      e && /^function fetch\(\)\s+\{\s+\[native code\]\s+\}$/.test(e.toString())
    );
  }
  function pt() {
    if (!dt()) return !1;
    var e = Xe();
    if (ft(e.fetch)) return !0;
    var t = !1,
      n = e.document;
    if (n && "function" == typeof n.createElement)
      try {
        var r = n.createElement("iframe");
        (r.hidden = !0),
          n.head.appendChild(r),
          r.contentWindow &&
            r.contentWindow.fetch &&
            (t = ft(r.contentWindow.fetch)),
          n.head.removeChild(r);
      } catch (e) {
        ut.warn(
          "Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ",
          e
        );
      }
    return t;
  }
  function ht() {
    if (!dt()) return !1;
    try {
      return new Request("_", { referrerPolicy: "origin" }), !0;
    } catch (e) {
      return !1;
    }
  }
  function gt() {
    var e = Xe(),
      t = e.chrome,
      n = t && t.app && t.app.runtime,
      r = "history" in e && !!e.history.pushState && !!e.history.replaceState;
    return !n && r;
  }
  r(ct, "supportsFetch", function () {
    return dt;
  }),
    r(ct, "supportsNativeFetch", function () {
      return pt;
    }),
    r(ct, "supportsReferrerPolicy", function () {
      return ht;
    }),
    r(ct, "supportsHistory", function () {
      return gt;
    });
  var mt,
    vt = Xe(),
    bt = {},
    yt = {};
  function wt(e) {
    if (!yt[e])
      switch (((yt[e] = !0), e)) {
        case "console":
          !(function () {
            if (!("console" in vt)) return;
            ["debug", "info", "warn", "error", "log", "assert"].forEach(
              function (e) {
                e in vt.console &&
                  qe(vt.console, e, function (t) {
                    return function () {
                      for (var n = [], r = 0; r < arguments.length; r++)
                        n[r] = arguments[r];
                      St("console", { args: n, level: e }),
                        t && Function.prototype.apply.call(t, vt.console, n);
                    };
                  });
              }
            );
          })();
          break;
        case "dom":
          !(function () {
            if (!("document" in vt)) return;
            vt.document.addEventListener(
              "click",
              Tt("click", St.bind(null, "dom")),
              !1
            ),
              vt.document.addEventListener(
                "keypress",
                It(St.bind(null, "dom")),
                !1
              ),
              ["EventTarget", "Node"].forEach(function (e) {
                var t = vt[e] && vt[e].prototype;
                t &&
                  t.hasOwnProperty &&
                  t.hasOwnProperty("addEventListener") &&
                  (qe(t, "addEventListener", function (e) {
                    return function (t, n, r) {
                      return (
                        n && n.handleEvent
                          ? ("click" === t &&
                              qe(n, "handleEvent", function (e) {
                                return function (t) {
                                  return (
                                    Tt("click", St.bind(null, "dom"))(t),
                                    e.call(this, t)
                                  );
                                };
                              }),
                            "keypress" === t &&
                              qe(n, "handleEvent", function (e) {
                                return function (t) {
                                  return (
                                    It(St.bind(null, "dom"))(t), e.call(this, t)
                                  );
                                };
                              }))
                          : ("click" === t &&
                              Tt("click", St.bind(null, "dom"), !0)(this),
                            "keypress" === t && It(St.bind(null, "dom"))(this)),
                        e.call(this, t, n, r)
                      );
                    };
                  }),
                  qe(t, "removeEventListener", function (e) {
                    return function (t, n, r) {
                      try {
                        e.call(this, t, n.__sentry_wrapped__, r);
                      } catch (e) {}
                      return e.call(this, t, n, r);
                    };
                  }));
              });
          })();
          break;
        case "xhr":
          !(function () {
            if (!("XMLHttpRequest" in vt)) return;
            var e = [],
              t = [],
              n = XMLHttpRequest.prototype;
            qe(n, "open", function (n) {
              return function () {
                for (var r = [], o = 0; o < arguments.length; o++)
                  r[o] = arguments[o];
                var i = this,
                  a = r[1];
                (i.__sentry_xhr__ = {
                  method: ee(r[0]) ? r[0].toUpperCase() : r[0],
                  url: r[1],
                }),
                  ee(a) &&
                    "POST" === i.__sentry_xhr__.method &&
                    a.match(/sentry_key/) &&
                    (i.__sentry_own_request__ = !0);
                var s = function () {
                  if (4 === i.readyState) {
                    try {
                      i.__sentry_xhr__ &&
                        (i.__sentry_xhr__.status_code = i.status);
                    } catch (e) {}
                    try {
                      var n = e.indexOf(i);
                      if (-1 !== n) {
                        e.splice(n);
                        var o = t.splice(n)[0];
                        i.__sentry_xhr__ &&
                          void 0 !== o[0] &&
                          (i.__sentry_xhr__.body = o[0]);
                      }
                    } catch (e) {}
                    St("xhr", {
                      args: r,
                      endTimestamp: Date.now(),
                      startTimestamp: Date.now(),
                      xhr: i,
                    });
                  }
                };
                return (
                  "onreadystatechange" in i &&
                  "function" == typeof i.onreadystatechange
                    ? qe(i, "onreadystatechange", function (e) {
                        return function () {
                          for (var t = [], n = 0; n < arguments.length; n++)
                            t[n] = arguments[n];
                          return s(), e.apply(i, t);
                        };
                      })
                    : i.addEventListener("readystatechange", s),
                  n.apply(i, r)
                );
              };
            }),
              qe(n, "send", function (n) {
                return function () {
                  for (var r = [], o = 0; o < arguments.length; o++)
                    r[o] = arguments[o];
                  return (
                    e.push(this),
                    t.push(r),
                    St("xhr", {
                      args: r,
                      startTimestamp: Date.now(),
                      xhr: this,
                    }),
                    n.apply(this, r)
                  );
                };
              });
          })();
          break;
        case "fetch":
          !(function () {
            if (!pt()) return;
            qe(vt, "fetch", function (e) {
              return function () {
                for (var t = [], n = 0; n < arguments.length; n++)
                  t[n] = arguments[n];
                var r = {
                  args: t,
                  fetchData: { method: xt(t), url: Pt(t) },
                  startTimestamp: Date.now(),
                };
                return (
                  St("fetch", G({}, r)),
                  e.apply(vt, t).then(
                    function (e) {
                      return (
                        St(
                          "fetch",
                          G(G({}, r), { endTimestamp: Date.now(), response: e })
                        ),
                        e
                      );
                    },
                    function (e) {
                      throw (
                        (St(
                          "fetch",
                          G(G({}, r), { endTimestamp: Date.now(), error: e })
                        ),
                        e)
                      );
                    }
                  )
                );
              };
            });
          })();
          break;
        case "history":
          !(function () {
            if (!gt()) return;
            var e = vt.onpopstate;
            function t(e) {
              return function () {
                for (var t = [], n = 0; n < arguments.length; n++)
                  t[n] = arguments[n];
                var r = t.length > 2 ? t[2] : void 0;
                if (r) {
                  var o = mt,
                    i = String(r);
                  (mt = i), St("history", { from: o, to: i });
                }
                return e.apply(this, t);
              };
            }
            (vt.onpopstate = function () {
              for (var t = [], n = 0; n < arguments.length; n++)
                t[n] = arguments[n];
              var r = vt.location.href,
                o = mt;
              if (((mt = r), St("history", { from: o, to: r }), e))
                return e.apply(this, t);
            }),
              qe(vt.history, "pushState", t),
              qe(vt.history, "replaceState", t);
          })();
          break;
        case "error":
          (Ct = vt.onerror),
            (vt.onerror = function (e, t, n, r, o) {
              return (
                St("error", { column: r, error: o, line: n, msg: e, url: t }),
                !!Ct && Ct.apply(this, arguments)
              );
            });
          break;
        case "unhandledrejection":
          (Ft = vt.onunhandledrejection),
            (vt.onunhandledrejection = function (e) {
              return (
                St("unhandledrejection", e), !Ft || Ft.apply(this, arguments)
              );
            });
          break;
        default:
          ut.warn("unknown instrumentation type:", e);
      }
  }
  function _t(e) {
    e &&
      "string" == typeof e.type &&
      "function" == typeof e.callback &&
      ((bt[e.type] = bt[e.type] || []),
      bt[e.type].push(e.callback),
      wt(e.type));
  }
  function St(e, t) {
    var n, r;
    if (e && bt[e])
      try {
        for (var o = $(bt[e] || []), i = o.next(); !i.done; i = o.next()) {
          var a = i.value;
          try {
            a(t);
          } catch (t) {
            ut.error(
              "Error while triggering instrumentation handler.\nType: " +
                e +
                "\nName: " +
                Re(a) +
                "\nError: " +
                t
            );
          }
        }
      } catch (e) {
        n = { error: e };
      } finally {
        try {
          i && !i.done && (r = o.return) && r.call(o);
        } finally {
          if (n) throw n.error;
        }
      }
  }
  function xt(e) {
    return (
      void 0 === e && (e = []),
      "Request" in vt && le(e[0], Request) && e[0].method
        ? String(e[0].method).toUpperCase()
        : e[1] && e[1].method
        ? String(e[1].method).toUpperCase()
        : "GET"
    );
  }
  function Pt(e) {
    return (
      void 0 === e && (e = []),
      "string" == typeof e[0]
        ? e[0]
        : "Request" in vt && le(e[0], Request)
        ? e[0].url
        : String(e[0])
    );
  }
  r({}, "addInstrumentationHandler", function () {
    return _t;
  });
  var Dt,
    kt,
    Et = 0;
  function Tt(e, t, n) {
    return (
      void 0 === n && (n = !1),
      function (r) {
        (Dt = void 0),
          r &&
            kt !== r &&
            ((kt = r),
            Et && clearTimeout(Et),
            n
              ? (Et = setTimeout(function () {
                  t({ event: r, name: e });
                }))
              : t({ event: r, name: e }));
      }
    );
  }
  function It(e) {
    return function (t) {
      var n;
      try {
        n = t.target;
      } catch (e) {
        return;
      }
      var r = n && n.tagName;
      r &&
        ("INPUT" === r || "TEXTAREA" === r || n.isContentEditable) &&
        (Dt || Tt("input", e)(t),
        clearTimeout(Dt),
        (Dt = setTimeout(function () {
          Dt = void 0;
        }, 1e3)));
    };
  }
  var Ct = null;
  var Ft = null;
  var At, Ot;
  ((Ot = At || (At = {})).PENDING = "PENDING"),
    (Ot.RESOLVED = "RESOLVED"),
    (Ot.REJECTED = "REJECTED");
  var Mt = (function () {
    function e(e) {
      var t = this;
      (this._state = At.PENDING),
        (this._handlers = []),
        (this._resolve = function (e) {
          t._setResult(At.RESOLVED, e);
        }),
        (this._reject = function (e) {
          t._setResult(At.REJECTED, e);
        }),
        (this._setResult = function (e, n) {
          t._state === At.PENDING &&
            (ae(n)
              ? n.then(t._resolve, t._reject)
              : ((t._state = e), (t._value = n), t._executeHandlers()));
        }),
        (this._attachHandler = function (e) {
          (t._handlers = t._handlers.concat(e)), t._executeHandlers();
        }),
        (this._executeHandlers = function () {
          if (t._state !== At.PENDING) {
            var e = t._handlers.slice();
            (t._handlers = []),
              e.forEach(function (e) {
                e.done ||
                  (t._state === At.RESOLVED &&
                    e.onfulfilled &&
                    e.onfulfilled(t._value),
                  t._state === At.REJECTED &&
                    e.onrejected &&
                    e.onrejected(t._value),
                  (e.done = !0));
              });
          }
        });
      try {
        e(this._resolve, this._reject);
      } catch (e) {
        this._reject(e);
      }
    }
    return (
      (e.resolve = function (t) {
        return new e(function (e) {
          e(t);
        });
      }),
      (e.reject = function (t) {
        return new e(function (e, n) {
          n(t);
        });
      }),
      (e.all = function (t) {
        return new e(function (n, r) {
          if (Array.isArray(t))
            if (0 !== t.length) {
              var o = t.length,
                i = [];
              t.forEach(function (t, a) {
                e.resolve(t)
                  .then(function (e) {
                    (i[a] = e), 0 === (o -= 1) && n(i);
                  })
                  .then(null, r);
              });
            } else n([]);
          else r(new TypeError("Promise.all requires an array as input."));
        });
      }),
      (e.prototype.then = function (t, n) {
        var r = this;
        return new e(function (e, o) {
          r._attachHandler({
            done: !1,
            onfulfilled: function (n) {
              if (t)
                try {
                  return void e(t(n));
                } catch (e) {
                  return void o(e);
                }
              else e(n);
            },
            onrejected: function (t) {
              if (n)
                try {
                  return void e(n(t));
                } catch (e) {
                  return void o(e);
                }
              else o(t);
            },
          });
        });
      }),
      (e.prototype.catch = function (e) {
        return this.then(function (e) {
          return e;
        }, e);
      }),
      (e.prototype.finally = function (t) {
        var n = this;
        return new e(function (e, r) {
          var o, i;
          return n
            .then(
              function (e) {
                (i = !1), (o = e), t && t();
              },
              function (e) {
                (i = !0), (o = e), t && t();
              }
            )
            .then(function () {
              i ? r(o) : e(o);
            });
        });
      }),
      (e.prototype.toString = function () {
        return "[object SyncPromise]";
      }),
      e
    );
  })();
  r({}, "SyncPromise", function () {
    return Mt;
  });
  var Rt = (function () {
    function e(e) {
      (this._limit = e), (this._buffer = []);
    }
    return (
      (e.prototype.isReady = function () {
        return void 0 === this._limit || this.length() < this._limit;
      }),
      (e.prototype.add = function (e) {
        var t = this;
        return this.isReady()
          ? (-1 === this._buffer.indexOf(e) && this._buffer.push(e),
            e
              .then(function () {
                return t.remove(e);
              })
              .then(null, function () {
                return t.remove(e).then(null, function () {});
              }),
            e)
          : Mt.reject(
              new fe("Not adding Promise due to buffer limit reached.")
            );
      }),
      (e.prototype.remove = function (e) {
        return this._buffer.splice(this._buffer.indexOf(e), 1)[0];
      }),
      (e.prototype.length = function () {
        return this._buffer.length;
      }),
      (e.prototype.drain = function (e) {
        var t = this;
        return new Mt(function (n) {
          var r = setTimeout(function () {
            e && e > 0 && n(!1);
          }, e);
          Mt.all(t._buffer)
            .then(function () {
              clearTimeout(r), n(!0);
            })
            .then(null, function () {
              n(!0);
            });
        });
      }),
      e
    );
  })();
  r({}, "PromiseBuffer", function () {
    return Rt;
  });
  var Nt = function () {
      var e = this,
        t = { exports: this };
      e.__esModule = !0;
      var n = {
        nowSeconds: function () {
          return Date.now() / 1e3;
        },
      };
      var o = Je.isNodeEnv()
          ? (function () {
              try {
                return Je.dynamicRequire(t, "perf_hooks").performance;
              } catch (e) {
                return;
              }
            })()
          : (function () {
              var e = Xe().performance;
              if (e && e.now)
                return {
                  now: function () {
                    return e.now();
                  },
                  timeOrigin: Date.now() - e.now(),
                };
            })(),
        i =
          void 0 === o
            ? n
            : {
                nowSeconds: function () {
                  return (o.timeOrigin + o.now()) / 1e3;
                },
              },
        a = n.nowSeconds.bind(n);
      r(e, "dateTimestampInSeconds", function () {
        return a;
      });
      var s = i.nowSeconds.bind(i);
      r(e, "timestampInSeconds", function () {
        return s;
      });
      var l = s;
      r(e, "timestampWithMs", function () {
        return l;
      });
      var u = void 0 !== o;
      r(e, "usingPerformanceAPI", function () {
        return u;
      });
      var c = (function () {
        var e = Xe().performance;
        if (e)
          return e.timeOrigin
            ? e.timeOrigin
            : (e.timing && e.timing.navigationStart) || Date.now();
      })();
      return (
        r(e, "browserPerformanceTimeOrigin", function () {
          return c;
        }),
        t.exports
      );
    }.call({}),
    Bt = (function () {
      function e() {
        (this._notifyingListeners = !1),
          (this._scopeListeners = []),
          (this._eventProcessors = []),
          (this._breadcrumbs = []),
          (this._user = {}),
          (this._tags = {}),
          (this._extra = {}),
          (this._contexts = {});
      }
      return (
        (e.clone = function (t) {
          var n = new e();
          return (
            t &&
              ((n._breadcrumbs = Y(t._breadcrumbs)),
              (n._tags = G({}, t._tags)),
              (n._extra = G({}, t._extra)),
              (n._contexts = G({}, t._contexts)),
              (n._user = t._user),
              (n._level = t._level),
              (n._span = t._span),
              (n._transactionName = t._transactionName),
              (n._fingerprint = t._fingerprint),
              (n._eventProcessors = Y(t._eventProcessors))),
            n
          );
        }),
        (e.prototype.addScopeListener = function (e) {
          this._scopeListeners.push(e);
        }),
        (e.prototype.addEventProcessor = function (e) {
          return this._eventProcessors.push(e), this;
        }),
        (e.prototype.setUser = function (e) {
          return (this._user = e || {}), this._notifyScopeListeners(), this;
        }),
        (e.prototype.setTags = function (e) {
          return (
            (this._tags = G(G({}, this._tags), e)),
            this._notifyScopeListeners(),
            this
          );
        }),
        (e.prototype.setTag = function (e, t) {
          var n;
          return (
            (this._tags = G(G({}, this._tags), (((n = {})[e] = t), n))),
            this._notifyScopeListeners(),
            this
          );
        }),
        (e.prototype.setExtras = function (e) {
          return (
            (this._extra = G(G({}, this._extra), e)),
            this._notifyScopeListeners(),
            this
          );
        }),
        (e.prototype.setExtra = function (e, t) {
          var n;
          return (
            (this._extra = G(G({}, this._extra), (((n = {})[e] = t), n))),
            this._notifyScopeListeners(),
            this
          );
        }),
        (e.prototype.setFingerprint = function (e) {
          return (this._fingerprint = e), this._notifyScopeListeners(), this;
        }),
        (e.prototype.setLevel = function (e) {
          return (this._level = e), this._notifyScopeListeners(), this;
        }),
        (e.prototype.setTransactionName = function (e) {
          return (
            (this._transactionName = e), this._notifyScopeListeners(), this
          );
        }),
        (e.prototype.setTransaction = function (e) {
          return this.setTransactionName(e);
        }),
        (e.prototype.setContext = function (e, t) {
          var n;
          return (
            null === t
              ? delete this._contexts[e]
              : (this._contexts = G(
                  G({}, this._contexts),
                  (((n = {})[e] = t), n)
                )),
            this._notifyScopeListeners(),
            this
          );
        }),
        (e.prototype.setSpan = function (e) {
          return (this._span = e), this._notifyScopeListeners(), this;
        }),
        (e.prototype.getSpan = function () {
          return this._span;
        }),
        (e.prototype.getTransaction = function () {
          var e,
            t,
            n,
            r,
            o = this.getSpan();
          return (null === (e = o) || void 0 === e ? void 0 : e.transaction)
            ? null === (t = o) || void 0 === t
              ? void 0
              : t.transaction
            : (
                null ===
                  (r =
                    null === (n = o) || void 0 === n
                      ? void 0
                      : n.spanRecorder) || void 0 === r
                  ? void 0
                  : r.spans[0]
              )
            ? o.spanRecorder.spans[0]
            : void 0;
        }),
        (e.prototype.update = function (t) {
          if (!t) return this;
          if ("function" == typeof t) {
            var n = t(this);
            return n instanceof e ? n : this;
          }
          return (
            t instanceof e
              ? ((this._tags = G(G({}, this._tags), t._tags)),
                (this._extra = G(G({}, this._extra), t._extra)),
                (this._contexts = G(G({}, this._contexts), t._contexts)),
                t._user && (this._user = t._user),
                t._level && (this._level = t._level),
                t._fingerprint && (this._fingerprint = t._fingerprint))
              : ne(t) &&
                ((t = t),
                (this._tags = G(G({}, this._tags), t.tags)),
                (this._extra = G(G({}, this._extra), t.extra)),
                (this._contexts = G(G({}, this._contexts), t.contexts)),
                t.user && (this._user = t.user),
                t.level && (this._level = t.level),
                t.fingerprint && (this._fingerprint = t.fingerprint)),
            this
          );
        }),
        (e.prototype.clear = function () {
          return (
            (this._breadcrumbs = []),
            (this._tags = {}),
            (this._extra = {}),
            (this._user = {}),
            (this._contexts = {}),
            (this._level = void 0),
            (this._transactionName = void 0),
            (this._fingerprint = void 0),
            (this._span = void 0),
            this._notifyScopeListeners(),
            this
          );
        }),
        (e.prototype.addBreadcrumb = function (e, t) {
          var n = G({ timestamp: Nt.dateTimestampInSeconds() }, e);
          return (
            (this._breadcrumbs =
              void 0 !== t && t >= 0
                ? Y(this._breadcrumbs, [n]).slice(-t)
                : Y(this._breadcrumbs, [n])),
            this._notifyScopeListeners(),
            this
          );
        }),
        (e.prototype.clearBreadcrumbs = function () {
          return (this._breadcrumbs = []), this._notifyScopeListeners(), this;
        }),
        (e.prototype.applyToEvent = function (e, t) {
          return (
            this._extra &&
              Object.keys(this._extra).length &&
              (e.extra = G(G({}, this._extra), e.extra)),
            this._tags &&
              Object.keys(this._tags).length &&
              (e.tags = G(G({}, this._tags), e.tags)),
            this._user &&
              Object.keys(this._user).length &&
              (e.user = G(G({}, this._user), e.user)),
            this._contexts &&
              Object.keys(this._contexts).length &&
              (e.contexts = G(G({}, this._contexts), e.contexts)),
            this._level && (e.level = this._level),
            this._transactionName && (e.transaction = this._transactionName),
            this._span &&
              (e.contexts = G(
                { trace: this._span.getTraceContext() },
                e.contexts
              )),
            this._applyFingerprint(e),
            (e.breadcrumbs = Y(e.breadcrumbs || [], this._breadcrumbs)),
            (e.breadcrumbs = e.breadcrumbs.length > 0 ? e.breadcrumbs : void 0),
            this._notifyEventProcessors(Y(Ut(), this._eventProcessors), e, t)
          );
        }),
        (e.prototype._notifyEventProcessors = function (e, t, n, r) {
          var o = this;
          return (
            void 0 === r && (r = 0),
            new Mt(function (i, a) {
              var s = e[r];
              if (null === t || "function" != typeof s) i(t);
              else {
                var l = s(G({}, t), n);
                ae(l)
                  ? l
                      .then(function (t) {
                        return o._notifyEventProcessors(e, t, n, r + 1).then(i);
                      })
                      .then(null, a)
                  : o
                      ._notifyEventProcessors(e, l, n, r + 1)
                      .then(i)
                      .then(null, a);
              }
            })
          );
        }),
        (e.prototype._notifyScopeListeners = function () {
          var e = this;
          this._notifyingListeners ||
            ((this._notifyingListeners = !0),
            setTimeout(function () {
              e._scopeListeners.forEach(function (t) {
                t(e);
              }),
                (e._notifyingListeners = !1);
            }));
        }),
        (e.prototype._applyFingerprint = function (e) {
          (e.fingerprint = e.fingerprint
            ? Array.isArray(e.fingerprint)
              ? e.fingerprint
              : [e.fingerprint]
            : []),
            this._fingerprint &&
              (e.fingerprint = e.fingerprint.concat(this._fingerprint)),
            e.fingerprint && !e.fingerprint.length && delete e.fingerprint;
        }),
        e
      );
    })();
  function Ut() {
    var e = Xe();
    return (
      (e.__SENTRY__ = e.__SENTRY__ || {}),
      (e.__SENTRY__.globalEventProcessors =
        e.__SENTRY__.globalEventProcessors || []),
      e.__SENTRY__.globalEventProcessors
    );
  }
  function jt(e) {
    Ut().push(e);
  }
  var Lt = (function () {
    function e(e, t, n) {
      void 0 === t && (t = new Bt()),
        void 0 === n && (n = 3),
        (this._version = n),
        (this._stack = []),
        this._stack.push({ client: e, scope: t }),
        this.bindClient(e);
    }
    return (
      (e.prototype.isOlderThan = function (e) {
        return this._version < e;
      }),
      (e.prototype.bindClient = function (e) {
        (this.getStackTop().client = e),
          e && e.setupIntegrations && e.setupIntegrations();
      }),
      (e.prototype.pushScope = function () {
        var e = this.getStack(),
          t = e.length > 0 ? e[e.length - 1].scope : void 0,
          n = Bt.clone(t);
        return this.getStack().push({ client: this.getClient(), scope: n }), n;
      }),
      (e.prototype.popScope = function () {
        return void 0 !== this.getStack().pop();
      }),
      (e.prototype.withScope = function (e) {
        var t = this.pushScope();
        try {
          e(t);
        } finally {
          this.popScope();
        }
      }),
      (e.prototype.getClient = function () {
        return this.getStackTop().client;
      }),
      (e.prototype.getScope = function () {
        return this.getStackTop().scope;
      }),
      (e.prototype.getStack = function () {
        return this._stack;
      }),
      (e.prototype.getStackTop = function () {
        return this._stack[this._stack.length - 1];
      }),
      (e.prototype.captureException = function (e, t) {
        var n = (this._lastEventId = Ze()),
          r = t;
        if (!t) {
          var o = void 0;
          try {
            throw new Error("Sentry syntheticException");
          } catch (e) {
            o = e;
          }
          r = { originalException: e, syntheticException: o };
        }
        return (
          this._invokeClient(
            "captureException",
            e,
            G(G({}, r), { event_id: n })
          ),
          n
        );
      }),
      (e.prototype.captureMessage = function (e, t, n) {
        var r = (this._lastEventId = Ze()),
          o = n;
        if (!n) {
          var i = void 0;
          try {
            throw new Error(e);
          } catch (e) {
            i = e;
          }
          o = { originalException: e, syntheticException: i };
        }
        return (
          this._invokeClient(
            "captureMessage",
            e,
            t,
            G(G({}, o), { event_id: r })
          ),
          r
        );
      }),
      (e.prototype.captureEvent = function (e, t) {
        var n = (this._lastEventId = Ze());
        return (
          this._invokeClient("captureEvent", e, G(G({}, t), { event_id: n })), n
        );
      }),
      (e.prototype.lastEventId = function () {
        return this._lastEventId;
      }),
      (e.prototype.addBreadcrumb = function (e, t) {
        var n = this.getStackTop();
        if (n.scope && n.client) {
          var r = (n.client.getOptions && n.client.getOptions()) || {},
            o = r.beforeBreadcrumb,
            i = void 0 === o ? null : o,
            a = r.maxBreadcrumbs,
            s = void 0 === a ? 100 : a;
          if (!(s <= 0)) {
            var l = Nt.dateTimestampInSeconds(),
              u = G({ timestamp: l }, e),
              c = i
                ? nt(function () {
                    return i(u, t);
                  })
                : u;
            null !== c && n.scope.addBreadcrumb(c, Math.min(s, 100));
          }
        }
      }),
      (e.prototype.setUser = function (e) {
        var t = this.getStackTop();
        t.scope && t.scope.setUser(e);
      }),
      (e.prototype.setTags = function (e) {
        var t = this.getStackTop();
        t.scope && t.scope.setTags(e);
      }),
      (e.prototype.setExtras = function (e) {
        var t = this.getStackTop();
        t.scope && t.scope.setExtras(e);
      }),
      (e.prototype.setTag = function (e, t) {
        var n = this.getStackTop();
        n.scope && n.scope.setTag(e, t);
      }),
      (e.prototype.setExtra = function (e, t) {
        var n = this.getStackTop();
        n.scope && n.scope.setExtra(e, t);
      }),
      (e.prototype.setContext = function (e, t) {
        var n = this.getStackTop();
        n.scope && n.scope.setContext(e, t);
      }),
      (e.prototype.configureScope = function (e) {
        var t = this.getStackTop();
        t.scope && t.client && e(t.scope);
      }),
      (e.prototype.run = function (e) {
        var t = Ht(this);
        try {
          e(this);
        } finally {
          Ht(t);
        }
      }),
      (e.prototype.getIntegration = function (e) {
        var t = this.getClient();
        if (!t) return null;
        try {
          return t.getIntegration(e);
        } catch (t) {
          return (
            ut.warn(
              "Cannot retrieve integration " + e.id + " from the current Hub"
            ),
            null
          );
        }
      }),
      (e.prototype.startSpan = function (e) {
        return this._callExtensionMethod("startSpan", e);
      }),
      (e.prototype.startTransaction = function (e, t) {
        return this._callExtensionMethod("startTransaction", e, t);
      }),
      (e.prototype.traceHeaders = function () {
        return this._callExtensionMethod("traceHeaders");
      }),
      (e.prototype._invokeClient = function (e) {
        for (var t, n = [], r = 1; r < arguments.length; r++)
          n[r - 1] = arguments[r];
        var o = this.getStackTop();
        o &&
          o.client &&
          o.client[e] &&
          (t = o.client)[e].apply(t, Y(n, [o.scope]));
      }),
      (e.prototype._callExtensionMethod = function (e) {
        for (var t = [], n = 1; n < arguments.length; n++)
          t[n - 1] = arguments[n];
        var r = qt(),
          o = r.__SENTRY__;
        if (o && o.extensions && "function" == typeof o.extensions[e])
          return o.extensions[e].apply(this, t);
        ut.warn("Extension method " + e + " couldn't be found, doing nothing.");
      }),
      e
    );
  })();
  function qt() {
    var e = Xe();
    return (e.__SENTRY__ = e.__SENTRY__ || { extensions: {}, hub: void 0 }), e;
  }
  function Ht(e) {
    var t = qt(),
      n = Gt(t);
    return $t(t, e), n;
  }
  function Vt() {
    var e = qt();
    return (
      (zt(e) && !Gt(e).isOlderThan(3)) || $t(e, new Lt()),
      Je.isNodeEnv()
        ? (function (e) {
            try {
              var t =
                (r = qt().__SENTRY__) &&
                r.extensions &&
                r.extensions.domain &&
                r.extensions.domain.active;
              if (!t) return Gt(e);
              if (!zt(t) || Gt(t).isOlderThan(3)) {
                var n = Gt(e).getStackTop();
                $t(t, new Lt(n.client, Bt.clone(n.scope)));
              }
              return Gt(t);
            } catch (t) {
              return Gt(e);
            }
            var r;
          })(e)
        : Gt(e)
    );
  }
  function zt(e) {
    return !!(e && e.__SENTRY__ && e.__SENTRY__.hub);
  }
  function Gt(e) {
    return (
      (e && e.__SENTRY__ && e.__SENTRY__.hub) ||
        ((e.__SENTRY__ = e.__SENTRY__ || {}), (e.__SENTRY__.hub = new Lt())),
      e.__SENTRY__.hub
    );
  }
  function $t(e, t) {
    return (
      !!e && ((e.__SENTRY__ = e.__SENTRY__ || {}), (e.__SENTRY__.hub = t), !0)
    );
  }
  function Wt(e) {
    for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
    var r = Vt();
    if (r && r[e]) return r[e].apply(r, Y(t));
    throw new Error(
      "No hub defined or " +
        e +
        " was not found on the hub, please open a bug report."
    );
  }
  function Yt(e, t) {
    var n;
    try {
      throw new Error("Sentry syntheticException");
    } catch (e) {
      n = e;
    }
    return Wt("captureException", e, {
      captureContext: t,
      originalException: e,
      syntheticException: n,
    });
  }
  function Qt(e) {
    Wt("withScope", e);
  }
  var Jt = (function () {
      function e(e) {
        (this.dsn = e), (this._dsnObject = new ge(e));
      }
      return (
        (e.prototype.getDsn = function () {
          return this._dsnObject;
        }),
        (e.prototype.getBaseApiEndpoint = function () {
          var e = this._dsnObject,
            t = e.protocol ? e.protocol + ":" : "",
            n = e.port ? ":" + e.port : "";
          return t + "//" + e.host + n + (e.path ? "/" + e.path : "") + "/api/";
        }),
        (e.prototype.getStoreEndpoint = function () {
          return this._getIngestEndpoint("store");
        }),
        (e.prototype.getStoreEndpointWithUrlEncodedAuth = function () {
          return this.getStoreEndpoint() + "?" + this._encodedAuth();
        }),
        (e.prototype.getEnvelopeEndpointWithUrlEncodedAuth = function () {
          return this._getEnvelopeEndpoint() + "?" + this._encodedAuth();
        }),
        (e.prototype.getStoreEndpointPath = function () {
          var e = this._dsnObject;
          return (
            (e.path ? "/" + e.path : "") + "/api/" + e.projectId + "/store/"
          );
        }),
        (e.prototype.getRequestHeaders = function (e, t) {
          var n = this._dsnObject,
            r = ["Sentry sentry_version=7"];
          return (
            r.push("sentry_client=" + e + "/" + t),
            r.push("sentry_key=" + n.user),
            n.pass && r.push("sentry_secret=" + n.pass),
            {
              "Content-Type": "application/json",
              "X-Sentry-Auth": r.join(", "),
            }
          );
        }),
        (e.prototype.getReportDialogEndpoint = function (e) {
          void 0 === e && (e = {});
          var t = this._dsnObject,
            n = this.getBaseApiEndpoint() + "embed/error-page/",
            r = [];
          for (var o in (r.push("dsn=" + t.toString()), e))
            if ("user" === o) {
              if (!e.user) continue;
              e.user.name && r.push("name=" + encodeURIComponent(e.user.name)),
                e.user.email &&
                  r.push("email=" + encodeURIComponent(e.user.email));
            } else
              r.push(encodeURIComponent(o) + "=" + encodeURIComponent(e[o]));
          return r.length ? n + "?" + r.join("&") : n;
        }),
        (e.prototype._getEnvelopeEndpoint = function () {
          return this._getIngestEndpoint("envelope");
        }),
        (e.prototype._getIngestEndpoint = function (e) {
          return (
            "" +
            this.getBaseApiEndpoint() +
            this._dsnObject.projectId +
            "/" +
            e +
            "/"
          );
        }),
        (e.prototype._encodedAuth = function () {
          return He({ sentry_key: this._dsnObject.user, sentry_version: "7" });
        }),
        e
      );
    })(),
    Kt = [];
  function Xt(e) {
    var t = {};
    return (
      (function (e) {
        var t = (e.defaultIntegrations && Y(e.defaultIntegrations)) || [],
          n = e.integrations,
          r = [];
        if (Array.isArray(n)) {
          var o = n.map(function (e) {
              return e.name;
            }),
            i = [];
          t.forEach(function (e) {
            -1 === o.indexOf(e.name) &&
              -1 === i.indexOf(e.name) &&
              (r.push(e), i.push(e.name));
          }),
            n.forEach(function (e) {
              -1 === i.indexOf(e.name) && (r.push(e), i.push(e.name));
            });
        } else
          "function" == typeof n
            ? ((r = n(t)), (r = Array.isArray(r) ? r : [r]))
            : (r = Y(t));
        var a = r.map(function (e) {
            return e.name;
          }),
          s = "Debug";
        return (
          -1 !== a.indexOf(s) && r.push.apply(r, Y(r.splice(a.indexOf(s), 1))),
          r
        );
      })(e).forEach(function (e) {
        (t[e.name] = e),
          (function (e) {
            -1 === Kt.indexOf(e.name) &&
              (e.setupOnce(jt, Vt),
              Kt.push(e.name),
              ut.log("Integration installed: " + e.name));
          })(e);
      }),
      t
    );
  }
  var Zt,
    en,
    tn,
    nn,
    rn = (function () {
      function e(e, t) {
        (this._integrations = {}),
          (this._processing = !1),
          (this._backend = new e(t)),
          (this._options = t),
          t.dsn && (this._dsn = new ge(t.dsn));
      }
      return (
        (e.prototype.captureException = function (e, t, n) {
          var r = this,
            o = t && t.event_id;
          return (
            (this._processing = !0),
            this._getBackend()
              .eventFromException(e, t)
              .then(function (e) {
                o = r.captureEvent(e, t, n);
              }),
            o
          );
        }),
        (e.prototype.captureMessage = function (e, t, n, r) {
          var o = this,
            i = n && n.event_id;
          return (
            (this._processing = !0),
            (te(e)
              ? this._getBackend().eventFromMessage("" + e, t, n)
              : this._getBackend().eventFromException(e, n)
            ).then(function (e) {
              i = o.captureEvent(e, n, r);
            }),
            i
          );
        }),
        (e.prototype.captureEvent = function (e, t, n) {
          var r = this,
            o = t && t.event_id;
          return (
            (this._processing = !0),
            this._processEvent(e, t, n)
              .then(function (e) {
                (o = e && e.event_id), (r._processing = !1);
              })
              .then(null, function (e) {
                ut.error(e), (r._processing = !1);
              }),
            o
          );
        }),
        (e.prototype.getDsn = function () {
          return this._dsn;
        }),
        (e.prototype.getOptions = function () {
          return this._options;
        }),
        (e.prototype.flush = function (e) {
          var t = this;
          return this._isClientProcessing(e).then(function (n) {
            return (
              clearInterval(n.interval),
              t
                ._getBackend()
                .getTransport()
                .close(e)
                .then(function (e) {
                  return n.ready && e;
                })
            );
          });
        }),
        (e.prototype.close = function (e) {
          var t = this;
          return this.flush(e).then(function (e) {
            return (t.getOptions().enabled = !1), e;
          });
        }),
        (e.prototype.setupIntegrations = function () {
          this._isEnabled() && (this._integrations = Xt(this._options));
        }),
        (e.prototype.getIntegration = function (e) {
          try {
            return this._integrations[e.id] || null;
          } catch (t) {
            return (
              ut.warn(
                "Cannot retrieve integration " +
                  e.id +
                  " from the current Client"
              ),
              null
            );
          }
        }),
        (e.prototype._isClientProcessing = function (e) {
          var t = this;
          return new Mt(function (n) {
            var r = 0,
              o = 0;
            clearInterval(o),
              (o = setInterval(function () {
                t._processing
                  ? ((r += 1), e && r >= e && n({ interval: o, ready: !1 }))
                  : n({ interval: o, ready: !0 });
              }, 1));
          });
        }),
        (e.prototype._getBackend = function () {
          return this._backend;
        }),
        (e.prototype._isEnabled = function () {
          return !1 !== this.getOptions().enabled && void 0 !== this._dsn;
        }),
        (e.prototype._prepareEvent = function (e, t, n) {
          var r = this,
            o = this.getOptions().normalizeDepth,
            i = void 0 === o ? 3 : o,
            a = G(G({}, e), {
              event_id: e.event_id || (n && n.event_id ? n.event_id : Ze()),
              timestamp: e.timestamp || Nt.dateTimestampInSeconds(),
            });
          this._applyClientOptions(a), this._applyIntegrationsMetadata(a);
          var s = t;
          n && n.captureContext && (s = Bt.clone(s).update(n.captureContext));
          var l = Mt.resolve(a);
          return (
            s && (l = s.applyToEvent(a, n)),
            l.then(function (e) {
              return "number" == typeof i && i > 0
                ? r._normalizeEvent(e, i)
                : e;
            })
          );
        }),
        (e.prototype._normalizeEvent = function (e, t) {
          if (!e) return null;
          var n = G(
            G(
              G(
                G(
                  G({}, e),
                  e.breadcrumbs && {
                    breadcrumbs: e.breadcrumbs.map(function (e) {
                      return G(G({}, e), e.data && { data: Ye(e.data, t) });
                    }),
                  }
                ),
                e.user && { user: Ye(e.user, t) }
              ),
              e.contexts && { contexts: Ye(e.contexts, t) }
            ),
            e.extra && { extra: Ye(e.extra, t) }
          );
          return (
            e.contexts &&
              e.contexts.trace &&
              (n.contexts.trace = e.contexts.trace),
            n
          );
        }),
        (e.prototype._applyClientOptions = function (e) {
          var t = this.getOptions(),
            n = t.environment,
            r = t.release,
            o = t.dist,
            i = t.maxValueLength,
            a = void 0 === i ? 250 : i;
          void 0 === e.environment && void 0 !== n && (e.environment = n),
            void 0 === e.release && void 0 !== r && (e.release = r),
            void 0 === e.dist && void 0 !== o && (e.dist = o),
            e.message && (e.message = Be(e.message, a));
          var s = e.exception && e.exception.values && e.exception.values[0];
          s && s.value && (s.value = Be(s.value, a));
          var l = e.request;
          l && l.url && (l.url = Be(l.url, a));
        }),
        (e.prototype._applyIntegrationsMetadata = function (e) {
          var t = e.sdk,
            n = Object.keys(this._integrations);
          t && n.length > 0 && (t.integrations = n);
        }),
        (e.prototype._sendEvent = function (e) {
          this._getBackend().sendEvent(e);
        }),
        (e.prototype._processEvent = function (e, t, n) {
          var r = this,
            o = this.getOptions(),
            i = o.beforeSend,
            a = o.sampleRate;
          if (!this._isEnabled())
            return Mt.reject("SDK not enabled, will not send event.");
          var s = "transaction" === e.type;
          return !s && "number" == typeof a && Math.random() > a
            ? Mt.reject("This event has been sampled, will not send event.")
            : new Mt(function (o, a) {
                r._prepareEvent(e, n, t)
                  .then(function (e) {
                    if (null !== e) {
                      var n = e;
                      if ((t && t.data && !0 === t.data.__sentry__) || !i || s)
                        return r._sendEvent(n), void o(n);
                      var l = i(e, t);
                      if (void 0 === l)
                        ut.error(
                          "`beforeSend` method has to return `null` or a valid event."
                        );
                      else if (ae(l)) r._handleAsyncBeforeSend(l, o, a);
                      else {
                        if (null === (n = l))
                          return (
                            ut.log(
                              "`beforeSend` returned `null`, will not send event."
                            ),
                            void o(null)
                          );
                        r._sendEvent(n), o(n);
                      }
                    } else a("An event processor returned null, will not send event.");
                  })
                  .then(null, function (e) {
                    r.captureException(e, {
                      data: { __sentry__: !0 },
                      originalException: e,
                    }),
                      a(
                        "Event processing pipeline threw an error, original event will not be sent. Details have been sent as a new event.\nReason: " +
                          e
                      );
                  });
              });
        }),
        (e.prototype._handleAsyncBeforeSend = function (e, t, n) {
          var r = this;
          e.then(function (e) {
            null !== e
              ? (r._sendEvent(e), t(e))
              : n("`beforeSend` returned `null`, will not send event.");
          }).then(null, function (e) {
            n("beforeSend rejected with " + e);
          });
        }),
        e
      );
    })();
  ((en = Zt || (Zt = {})).Fatal = "fatal"),
    (en.Error = "error"),
    (en.Warning = "warning"),
    (en.Log = "log"),
    (en.Info = "info"),
    (en.Debug = "debug"),
    (en.Critical = "critical"),
    (function (e) {
      e.fromString = function (t) {
        switch (t) {
          case "debug":
            return e.Debug;
          case "info":
            return e.Info;
          case "warn":
          case "warning":
            return e.Warning;
          case "error":
            return e.Error;
          case "fatal":
            return e.Fatal;
          case "critical":
            return e.Critical;
          case "log":
          default:
            return e.Log;
        }
      };
    })(Zt || (Zt = {})),
    ((nn = tn || (tn = {})).Unknown = "unknown"),
    (nn.Skipped = "skipped"),
    (nn.Success = "success"),
    (nn.RateLimit = "rate_limit"),
    (nn.Invalid = "invalid"),
    (nn.Failed = "failed"),
    (function (e) {
      e.fromHttpCode = function (t) {
        return t >= 200 && t < 300
          ? e.Success
          : 429 === t
          ? e.RateLimit
          : t >= 400 && t < 500
          ? e.Invalid
          : t >= 500
          ? e.Failed
          : e.Unknown;
      };
    })(tn || (tn = {}));
  var on = (function () {
      function e() {}
      return (
        (e.prototype.sendEvent = function (e) {
          return Mt.resolve({
            reason:
              "NoopTransport: Event has been skipped because no Dsn is configured.",
            status: tn.Skipped,
          });
        }),
        (e.prototype.close = function (e) {
          return Mt.resolve(!0);
        }),
        e
      );
    })(),
    an = (function () {
      function e(e) {
        (this._options = e),
          this._options.dsn ||
            ut.warn("No DSN provided, backend will not do anything."),
          (this._transport = this._setupTransport());
      }
      return (
        (e.prototype.eventFromException = function (e, t) {
          throw new fe("Backend has to implement `eventFromException` method");
        }),
        (e.prototype.eventFromMessage = function (e, t, n) {
          throw new fe("Backend has to implement `eventFromMessage` method");
        }),
        (e.prototype.sendEvent = function (e) {
          this._transport.sendEvent(e).then(null, function (e) {
            ut.error("Error while sending event: " + e);
          });
        }),
        (e.prototype.getTransport = function () {
          return this._transport;
        }),
        (e.prototype._setupTransport = function () {
          return new on();
        }),
        e
      );
    })();
  function sn(e, t) {
    var n = "transaction" === e.type,
      r = {
        body: JSON.stringify(e),
        url: n
          ? t.getEnvelopeEndpointWithUrlEncodedAuth()
          : t.getStoreEndpointWithUrlEncodedAuth(),
      };
    if (n) {
      var o =
        JSON.stringify({
          event_id: e.event_id,
          sent_at: new Date().toISOString(),
        }) +
        "\n" +
        JSON.stringify({ type: e.type }) +
        "\n" +
        r.body;
      r.body = o;
    }
    return r;
  }
  var ln,
    un = {},
    cn = (function () {
      function e() {
        this.name = e.id;
      }
      return (
        (e.prototype.setupOnce = function () {
          (ln = Function.prototype.toString),
            (Function.prototype.toString = function () {
              for (var e = [], t = 0; t < arguments.length; t++)
                e[t] = arguments[t];
              var n = this.__sentry_original__ || this;
              return ln.apply(n, e);
            });
        }),
        (e.id = "FunctionToString"),
        e
      );
    })(),
    dn = [/^Script error\.?$/, /^Javascript error: Script error\.? on line 0$/],
    fn = (function () {
      function e(t) {
        void 0 === t && (t = {}), (this._options = t), (this.name = e.id);
      }
      return (
        (e.prototype.setupOnce = function () {
          jt(function (t) {
            var n = Vt();
            if (!n) return t;
            var r = n.getIntegration(e);
            if (r) {
              var o = n.getClient(),
                i = o ? o.getOptions() : {},
                a = r._mergeOptions(i);
              if (r._shouldDropEvent(t, a)) return null;
            }
            return t;
          });
        }),
        (e.prototype._shouldDropEvent = function (e, t) {
          return this._isSentryError(e, t)
            ? (ut.warn(
                "Event dropped due to being internal Sentry Error.\nEvent: " +
                  tt(e)
              ),
              !0)
            : this._isIgnoredError(e, t)
            ? (ut.warn(
                "Event dropped due to being matched by `ignoreErrors` option.\nEvent: " +
                  tt(e)
              ),
              !0)
            : this._isDeniedUrl(e, t)
            ? (ut.warn(
                "Event dropped due to being matched by `denyUrls` option.\nEvent: " +
                  tt(e) +
                  ".\nUrl: " +
                  this._getEventFilterUrl(e)
              ),
              !0)
            : !this._isAllowedUrl(e, t) &&
              (ut.warn(
                "Event dropped due to not being matched by `allowUrls` option.\nEvent: " +
                  tt(e) +
                  ".\nUrl: " +
                  this._getEventFilterUrl(e)
              ),
              !0);
        }),
        (e.prototype._isSentryError = function (e, t) {
          if (!t.ignoreInternal) return !1;
          try {
            return (
              (e &&
                e.exception &&
                e.exception.values &&
                e.exception.values[0] &&
                "SentryError" === e.exception.values[0].type) ||
              !1
            );
          } catch (e) {
            return !1;
          }
        }),
        (e.prototype._isIgnoredError = function (e, t) {
          return (
            !(!t.ignoreErrors || !t.ignoreErrors.length) &&
            this._getPossibleEventMessages(e).some(function (e) {
              return t.ignoreErrors.some(function (t) {
                return Le(e, t);
              });
            })
          );
        }),
        (e.prototype._isDeniedUrl = function (e, t) {
          if (!t.denyUrls || !t.denyUrls.length) return !1;
          var n = this._getEventFilterUrl(e);
          return (
            !!n &&
            t.denyUrls.some(function (e) {
              return Le(n, e);
            })
          );
        }),
        (e.prototype._isAllowedUrl = function (e, t) {
          if (!t.allowUrls || !t.allowUrls.length) return !0;
          var n = this._getEventFilterUrl(e);
          return (
            !n ||
            t.allowUrls.some(function (e) {
              return Le(n, e);
            })
          );
        }),
        (e.prototype._mergeOptions = function (e) {
          return (
            void 0 === e && (e = {}),
            {
              allowUrls: Y(
                this._options.whitelistUrls || [],
                this._options.allowUrls || [],
                e.whitelistUrls || [],
                e.allowUrls || []
              ),
              denyUrls: Y(
                this._options.blacklistUrls || [],
                this._options.denyUrls || [],
                e.blacklistUrls || [],
                e.denyUrls || []
              ),
              ignoreErrors: Y(
                this._options.ignoreErrors || [],
                e.ignoreErrors || [],
                dn
              ),
              ignoreInternal:
                void 0 === this._options.ignoreInternal ||
                this._options.ignoreInternal,
            }
          );
        }),
        (e.prototype._getPossibleEventMessages = function (e) {
          if (e.message) return [e.message];
          if (e.exception)
            try {
              var t = (e.exception.values && e.exception.values[0]) || {},
                n = t.type,
                r = void 0 === n ? "" : n,
                o = t.value,
                i = void 0 === o ? "" : o;
              return ["" + i, r + ": " + i];
            } catch (t) {
              return ut.error("Cannot extract message for event " + tt(e)), [];
            }
          return [];
        }),
        (e.prototype._getEventFilterUrl = function (e) {
          try {
            if (e.stacktrace) {
              var t = e.stacktrace.frames;
              return (t && t[t.length - 1].filename) || null;
            }
            if (e.exception) {
              var n =
                e.exception.values &&
                e.exception.values[0].stacktrace &&
                e.exception.values[0].stacktrace.frames;
              return (n && n[n.length - 1].filename) || null;
            }
            return null;
          } catch (t) {
            return ut.error("Cannot extract url for event " + tt(e)), null;
          }
        }),
        (e.id = "InboundFilters"),
        e
      );
    })();
  r(un, "FunctionToString", function () {
    return cn;
  }),
    r(un, "InboundFilters", function () {
      return fn;
    });
  var pn = "?",
    hn =
      /^\s*at (?:(.*?) ?\()?((?:file|https?|blob|chrome-extension|address|native|eval|webpack|<anonymous>|[-a-z]+:|.*bundle|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i,
    gn =
      /^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:file|https?|blob|chrome|webpack|resource|moz-extension|capacitor).*?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js))(?::(\d+))?(?::(\d+))?\s*$/i,
    mn =
      /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i,
    vn = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i,
    bn = /\((\S*)(?::(\d+))(?::(\d+))\)/,
    yn = /Minified React error #\d+;/i;
  function wn(e) {
    var t = null,
      n = 0;
    e &&
      ("number" == typeof e.framesToPop
        ? (n = e.framesToPop)
        : yn.test(e.message) && (n = 1));
    try {
      if (
        (t = (function (e) {
          if (!e || !e.stacktrace) return null;
          for (
            var t,
              n = e.stacktrace,
              r = / line (\d+).*script (?:in )?(\S+)(?:: in function (\S+))?$/i,
              o =
                / line (\d+), column (\d+)\s*(?:in (?:<anonymous function: ([^>]+)>|([^)]+))\((.*)\))? in (.*):\s*$/i,
              i = n.split("\n"),
              a = [],
              s = 0;
            s < i.length;
            s += 2
          ) {
            var l = null;
            (t = r.exec(i[s]))
              ? (l = {
                  url: t[2],
                  func: t[3],
                  args: [],
                  line: +t[1],
                  column: null,
                })
              : (t = o.exec(i[s])) &&
                (l = {
                  url: t[6],
                  func: t[3] || t[4],
                  args: t[5] ? t[5].split(",") : [],
                  line: +t[1],
                  column: +t[2],
                }),
              l && (!l.func && l.line && (l.func = pn), a.push(l));
          }
          if (!a.length) return null;
          return { message: Sn(e), name: e.name, stack: a };
        })(e))
      )
        return _n(t, n);
    } catch (e) {}
    try {
      if (
        (t = (function (e) {
          if (!e || !e.stack) return null;
          for (
            var t, n, r, o = [], i = e.stack.split("\n"), a = 0;
            a < i.length;
            ++a
          ) {
            if ((n = hn.exec(i[a]))) {
              var s = n[2] && 0 === n[2].indexOf("native");
              n[2] &&
                0 === n[2].indexOf("eval") &&
                (t = bn.exec(n[2])) &&
                ((n[2] = t[1]), (n[3] = t[2]), (n[4] = t[3])),
                (r = {
                  url:
                    n[2] && 0 === n[2].indexOf("address at ")
                      ? n[2].substr("address at ".length)
                      : n[2],
                  func: n[1] || pn,
                  args: s ? [n[2]] : [],
                  line: n[3] ? +n[3] : null,
                  column: n[4] ? +n[4] : null,
                });
            } else if ((n = mn.exec(i[a])))
              r = {
                url: n[2],
                func: n[1] || pn,
                args: [],
                line: +n[3],
                column: n[4] ? +n[4] : null,
              };
            else {
              if (!(n = gn.exec(i[a]))) continue;
              n[3] && n[3].indexOf(" > eval") > -1 && (t = vn.exec(n[3]))
                ? ((n[1] = n[1] || "eval"),
                  (n[3] = t[1]),
                  (n[4] = t[2]),
                  (n[5] = ""))
                : 0 !== a ||
                  n[5] ||
                  void 0 === e.columnNumber ||
                  (o[0].column = e.columnNumber + 1),
                (r = {
                  url: n[3],
                  func: n[1] || pn,
                  args: n[2] ? n[2].split(",") : [],
                  line: n[4] ? +n[4] : null,
                  column: n[5] ? +n[5] : null,
                });
            }
            !r.func && r.line && (r.func = pn), o.push(r);
          }
          if (!o.length) return null;
          return { message: Sn(e), name: e.name, stack: o };
        })(e))
      )
        return _n(t, n);
    } catch (e) {}
    return { message: Sn(e), name: e && e.name, stack: [], failed: !0 };
  }
  function _n(e, t) {
    try {
      return G(G({}, e), { stack: e.stack.slice(t) });
    } catch (t) {
      return e;
    }
  }
  function Sn(e) {
    var t = e && e.message;
    return t
      ? t.error && "string" == typeof t.error.message
        ? t.error.message
        : t
      : "No error message";
  }
  function xn(e) {
    var t = Dn(e.stack),
      n = { type: e.name, value: e.message };
    return (
      t && t.length && (n.stacktrace = { frames: t }),
      void 0 === n.type &&
        "" === n.value &&
        (n.value = "Unrecoverable error caught"),
      n
    );
  }
  function Pn(e) {
    return { exception: { values: [xn(e)] } };
  }
  function Dn(e) {
    if (!e || !e.length) return [];
    var t = e,
      n = t[0].func || "",
      r = t[t.length - 1].func || "";
    return (
      (-1 === n.indexOf("captureMessage") &&
        -1 === n.indexOf("captureException")) ||
        (t = t.slice(1)),
      -1 !== r.indexOf("sentryWrapped") && (t = t.slice(0, -1)),
      t
        .slice(0, 50)
        .map(function (e) {
          return {
            colno: null === e.column ? void 0 : e.column,
            filename: e.url || t[0].url,
            function: e.func || "?",
            in_app: !0,
            lineno: null === e.line ? void 0 : e.line,
          };
        })
        .reverse()
    );
  }
  function kn(e, t, n) {
    var r;
    if ((void 0 === n && (n = {}), K(e) && e.error))
      return (r = Pn(wn((e = e.error))));
    if (X(e) || Z(e)) {
      var o = e,
        i = o.name || (X(o) ? "DOMError" : "DOMException"),
        a = o.message ? i + ": " + o.message : i;
      return rt((r = En(a, t, n)), a), r;
    }
    return J(e)
      ? (r = Pn(wn(e)))
      : ne(e) || re(e)
      ? (ot(
          (r = (function (e, t, n) {
            var r = {
              exception: {
                values: [
                  {
                    type: re(e)
                      ? e.constructor.name
                      : n
                      ? "UnhandledRejection"
                      : "Error",
                    value:
                      "Non-Error " +
                      (n ? "promise rejection" : "exception") +
                      " captured with keys: " +
                      Qe(e),
                  },
                ],
              },
              extra: { __serialized__: Ge(e) },
            };
            if (t) {
              var o = Dn(wn(t).stack);
              r.stacktrace = { frames: o };
            }
            return r;
          })(e, t, n.rejection)),
          { synthetic: !0 }
        ),
        r)
      : (rt((r = En(e, t, n)), "" + e, void 0), ot(r, { synthetic: !0 }), r);
  }
  function En(e, t, n) {
    void 0 === n && (n = {});
    var r = { message: e };
    if (n.attachStacktrace && t) {
      var o = Dn(wn(t).stack);
      r.stacktrace = { frames: o };
    }
    return r;
  }
  var Tn = {},
    In = (function () {
      function e(e) {
        (this.options = e),
          (this._buffer = new Rt(30)),
          (this._api = new Jt(this.options.dsn)),
          (this.url = this._api.getStoreEndpointWithUrlEncodedAuth());
      }
      return (
        (e.prototype.sendEvent = function (e) {
          throw new fe("Transport Class has to implement `sendEvent` method");
        }),
        (e.prototype.close = function (e) {
          return this._buffer.drain(e);
        }),
        e
      );
    })(),
    Cn = Xe(),
    Fn = (function (e) {
      function t() {
        var t = (null !== e && e.apply(this, arguments)) || this;
        return (t._disabledUntil = new Date(Date.now())), t;
      }
      return (
        z(t, e),
        (t.prototype.sendEvent = function (e) {
          var t = this;
          if (new Date(Date.now()) < this._disabledUntil)
            return Promise.reject({
              event: e,
              reason:
                "Transport locked till " +
                this._disabledUntil +
                " due to too many requests.",
              status: 429,
            });
          var n = sn(e, this._api),
            r = {
              body: n.body,
              method: "POST",
              referrerPolicy: ht() ? "origin" : "",
            };
          return (
            void 0 !== this.options.fetchParameters &&
              Object.assign(r, this.options.fetchParameters),
            void 0 !== this.options.headers &&
              (r.headers = this.options.headers),
            this._buffer.add(
              new Mt(function (e, o) {
                Cn.fetch(n.url, r)
                  .then(function (n) {
                    var r = tn.fromHttpCode(n.status);
                    if (r !== tn.Success) {
                      if (r === tn.RateLimit) {
                        var i = Date.now(),
                          a = n.headers.get("Retry-After");
                        (t._disabledUntil = new Date(i + at(i, a))),
                          ut.warn(
                            "Too many requests, backing off till: " +
                              t._disabledUntil
                          );
                      }
                      o(n);
                    } else e({ status: r });
                  })
                  .catch(o);
              })
            )
          );
        }),
        t
      );
    })(In),
    An = (function (e) {
      function t() {
        var t = (null !== e && e.apply(this, arguments)) || this;
        return (t._disabledUntil = new Date(Date.now())), t;
      }
      return (
        z(t, e),
        (t.prototype.sendEvent = function (e) {
          var t = this;
          if (new Date(Date.now()) < this._disabledUntil)
            return Promise.reject({
              event: e,
              reason:
                "Transport locked till " +
                this._disabledUntil +
                " due to too many requests.",
              status: 429,
            });
          var n = sn(e, this._api);
          return this._buffer.add(
            new Mt(function (e, r) {
              var o = new XMLHttpRequest();
              for (var i in ((o.onreadystatechange = function () {
                if (4 === o.readyState) {
                  var n = tn.fromHttpCode(o.status);
                  if (n !== tn.Success) {
                    if (n === tn.RateLimit) {
                      var i = Date.now(),
                        a = o.getResponseHeader("Retry-After");
                      (t._disabledUntil = new Date(i + at(i, a))),
                        ut.warn(
                          "Too many requests, backing off till: " +
                            t._disabledUntil
                        );
                    }
                    r(o);
                  } else e({ status: n });
                }
              }),
              o.open("POST", n.url),
              t.options.headers))
                t.options.headers.hasOwnProperty(i) &&
                  o.setRequestHeader(i, t.options.headers[i]);
              o.send(n.body);
            })
          );
        }),
        t
      );
    })(In);
  r(Tn, "BaseTransport", function () {
    return In;
  }),
    r(Tn, "FetchTransport", function () {
      return Fn;
    }),
    r(Tn, "XHRTransport", function () {
      return An;
    });
  var On = (function (e) {
      function t() {
        return (null !== e && e.apply(this, arguments)) || this;
      }
      return (
        z(t, e),
        (t.prototype.eventFromException = function (e, t) {
          return (function (e, t, n) {
            var r = kn(t, (n && n.syntheticException) || void 0, {
              attachStacktrace: e.attachStacktrace,
            });
            return (
              ot(r, { handled: !0, type: "generic" }),
              (r.level = Zt.Error),
              n && n.event_id && (r.event_id = n.event_id),
              Mt.resolve(r)
            );
          })(this._options, e, t);
        }),
        (t.prototype.eventFromMessage = function (e, t, n) {
          return (
            void 0 === t && (t = Zt.Info),
            (function (e, t, n, r) {
              void 0 === n && (n = Zt.Info);
              var o = En(t, (r && r.syntheticException) || void 0, {
                attachStacktrace: e.attachStacktrace,
              });
              return (
                (o.level = n),
                r && r.event_id && (o.event_id = r.event_id),
                Mt.resolve(o)
              );
            })(this._options, e, t, n)
          );
        }),
        (t.prototype._setupTransport = function () {
          if (!this._options.dsn) return e.prototype._setupTransport.call(this);
          var t = G(G({}, this._options.transportOptions), {
            dsn: this._options.dsn,
          });
          return this._options.transport
            ? new this._options.transport(t)
            : dt()
            ? new Fn(t)
            : new An(t);
        }),
        t
      );
    })(an),
    Mn = 0;
  function Rn() {
    return Mn > 0;
  }
  function Nn() {
    (Mn += 1),
      setTimeout(function () {
        Mn -= 1;
      });
  }
  function Bn(e, t, n) {
    if ((void 0 === t && (t = {}), "function" != typeof e)) return e;
    try {
      if (e.__sentry__) return e;
      if (e.__sentry_wrapped__) return e.__sentry_wrapped__;
    } catch (t) {
      return e;
    }
    var r = function () {
      var r = Array.prototype.slice.call(arguments);
      try {
        n && "function" == typeof n && n.apply(this, arguments);
        var o = r.map(function (e) {
          return Bn(e, t);
        });
        return e.handleEvent ? e.handleEvent.apply(this, o) : e.apply(this, o);
      } catch (e) {
        throw (
          (Nn(),
          Qt(function (n) {
            n.addEventProcessor(function (e) {
              var n = G({}, e);
              return (
                t.mechanism && (rt(n, void 0, void 0), ot(n, t.mechanism)),
                (n.extra = G(G({}, n.extra), { arguments: r })),
                n
              );
            }),
              Yt(e);
          }),
          e)
        );
      }
    };
    try {
      for (var o in e)
        Object.prototype.hasOwnProperty.call(e, o) && (r[o] = e[o]);
    } catch (e) {}
    (e.prototype = e.prototype || {}),
      (r.prototype = e.prototype),
      Object.defineProperty(e, "__sentry_wrapped__", {
        enumerable: !1,
        value: r,
      }),
      Object.defineProperties(r, {
        __sentry__: { enumerable: !1, value: !0 },
        __sentry_original__: { enumerable: !1, value: e },
      });
    try {
      Object.getOwnPropertyDescriptor(r, "name").configurable &&
        Object.defineProperty(r, "name", {
          get: function () {
            return e.name;
          },
        });
    } catch (e) {}
    return r;
  }
  function Un(e) {
    if ((void 0 === e && (e = {}), e.eventId))
      if (e.dsn) {
        var t = document.createElement("script");
        (t.async = !0),
          (t.src = new Jt(e.dsn).getReportDialogEndpoint(e)),
          e.onLoad && (t.onload = e.onLoad),
          (document.head || document.body).appendChild(t);
      } else ut.error("Missing dsn option in showReportDialog call");
    else ut.error("Missing eventId option in showReportDialog call");
  }
  var jn = {},
    Ln = (function () {
      function e(t) {
        (this.name = e.id),
          (this._onErrorHandlerInstalled = !1),
          (this._onUnhandledRejectionHandlerInstalled = !1),
          (this._options = G({ onerror: !0, onunhandledrejection: !0 }, t));
      }
      return (
        (e.prototype.setupOnce = function () {
          (Error.stackTraceLimit = 50),
            this._options.onerror &&
              (ut.log("Global Handler attached: onerror"),
              this._installGlobalOnErrorHandler()),
            this._options.onunhandledrejection &&
              (ut.log("Global Handler attached: onunhandledrejection"),
              this._installGlobalOnUnhandledRejectionHandler());
        }),
        (e.prototype._installGlobalOnErrorHandler = function () {
          var t = this;
          this._onErrorHandlerInstalled ||
            (_t({
              callback: function (n) {
                var r = n.error,
                  o = Vt(),
                  i = o.getIntegration(e),
                  a = r && !0 === r.__sentry_own_request__;
                if (i && !Rn() && !a) {
                  var s = o.getClient(),
                    l = te(r)
                      ? t._eventFromIncompleteOnError(
                          n.msg,
                          n.url,
                          n.line,
                          n.column
                        )
                      : t._enhanceEventWithInitialFrame(
                          kn(r, void 0, {
                            attachStacktrace:
                              s && s.getOptions().attachStacktrace,
                            rejection: !1,
                          }),
                          n.url,
                          n.line,
                          n.column
                        );
                  ot(l, { handled: !1, type: "onerror" }),
                    o.captureEvent(l, { originalException: r });
                }
              },
              type: "error",
            }),
            (this._onErrorHandlerInstalled = !0));
        }),
        (e.prototype._installGlobalOnUnhandledRejectionHandler = function () {
          var t = this;
          this._onUnhandledRejectionHandlerInstalled ||
            (_t({
              callback: function (n) {
                var r = n;
                try {
                  "reason" in n
                    ? (r = n.reason)
                    : "detail" in n &&
                      "reason" in n.detail &&
                      (r = n.detail.reason);
                } catch (e) {}
                var o = Vt(),
                  i = o.getIntegration(e),
                  a = r && !0 === r.__sentry_own_request__;
                if (!i || Rn() || a) return !0;
                var s = o.getClient(),
                  l = te(r)
                    ? t._eventFromIncompleteRejection(r)
                    : kn(r, void 0, {
                        attachStacktrace: s && s.getOptions().attachStacktrace,
                        rejection: !0,
                      });
                (l.level = Zt.Error),
                  ot(l, { handled: !1, type: "onunhandledrejection" }),
                  o.captureEvent(l, { originalException: r });
              },
              type: "unhandledrejection",
            }),
            (this._onUnhandledRejectionHandlerInstalled = !0));
        }),
        (e.prototype._eventFromIncompleteOnError = function (e, t, n, r) {
          var o,
            i = K(e) ? e.message : e;
          if (ee(i)) {
            var a = i.match(
              /^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/i
            );
            a && ((o = a[1]), (i = a[2]));
          }
          var s = { exception: { values: [{ type: o || "Error", value: i }] } };
          return this._enhanceEventWithInitialFrame(s, t, n, r);
        }),
        (e.prototype._eventFromIncompleteRejection = function (e) {
          return {
            exception: {
              values: [
                {
                  type: "UnhandledRejection",
                  value:
                    "Non-Error promise rejection captured with value: " + e,
                },
              ],
            },
          };
        }),
        (e.prototype._enhanceEventWithInitialFrame = function (e, t, n, r) {
          (e.exception = e.exception || {}),
            (e.exception.values = e.exception.values || []),
            (e.exception.values[0] = e.exception.values[0] || {}),
            (e.exception.values[0].stacktrace =
              e.exception.values[0].stacktrace || {}),
            (e.exception.values[0].stacktrace.frames =
              e.exception.values[0].stacktrace.frames || []);
          var o = isNaN(parseInt(r, 10)) ? void 0 : r,
            i = isNaN(parseInt(n, 10)) ? void 0 : n,
            a = ee(t) && t.length > 0 ? t : it();
          return (
            0 === e.exception.values[0].stacktrace.frames.length &&
              e.exception.values[0].stacktrace.frames.push({
                colno: o,
                filename: a,
                function: "?",
                in_app: !0,
                lineno: i,
              }),
            e
          );
        }),
        (e.id = "GlobalHandlers"),
        e
      );
    })(),
    qn = [
      "EventTarget",
      "Window",
      "Node",
      "ApplicationCache",
      "AudioTrackList",
      "ChannelMergerNode",
      "CryptoOperation",
      "EventSource",
      "FileReader",
      "HTMLUnknownElement",
      "IDBDatabase",
      "IDBRequest",
      "IDBTransaction",
      "KeyOperation",
      "MediaController",
      "MessagePort",
      "ModalWindow",
      "Notification",
      "SVGElementInstance",
      "Screen",
      "TextTrack",
      "TextTrackCue",
      "TextTrackList",
      "WebSocket",
      "WebSocketWorker",
      "Worker",
      "XMLHttpRequest",
      "XMLHttpRequestEventTarget",
      "XMLHttpRequestUpload",
    ],
    Hn = (function () {
      function e(t) {
        (this.name = e.id),
          (this._options = G(
            {
              XMLHttpRequest: !0,
              eventTarget: !0,
              requestAnimationFrame: !0,
              setInterval: !0,
              setTimeout: !0,
            },
            t
          ));
      }
      return (
        (e.prototype.setupOnce = function () {
          var e = Xe();
          (this._options.setTimeout &&
            qe(e, "setTimeout", this._wrapTimeFunction.bind(this)),
          this._options.setInterval &&
            qe(e, "setInterval", this._wrapTimeFunction.bind(this)),
          this._options.requestAnimationFrame &&
            qe(e, "requestAnimationFrame", this._wrapRAF.bind(this)),
          this._options.XMLHttpRequest &&
            "XMLHttpRequest" in e &&
            qe(XMLHttpRequest.prototype, "send", this._wrapXHR.bind(this)),
          this._options.eventTarget) &&
            (Array.isArray(this._options.eventTarget)
              ? this._options.eventTarget
              : qn
            ).forEach(this._wrapEventTarget.bind(this));
        }),
        (e.prototype._wrapTimeFunction = function (e) {
          return function () {
            for (var t = [], n = 0; n < arguments.length; n++)
              t[n] = arguments[n];
            var r = t[0];
            return (
              (t[0] = Bn(r, {
                mechanism: {
                  data: { function: Re(e) },
                  handled: !0,
                  type: "instrument",
                },
              })),
              e.apply(this, t)
            );
          };
        }),
        (e.prototype._wrapRAF = function (e) {
          return function (t) {
            return e.call(
              this,
              Bn(t, {
                mechanism: {
                  data: { function: "requestAnimationFrame", handler: Re(e) },
                  handled: !0,
                  type: "instrument",
                },
              })
            );
          };
        }),
        (e.prototype._wrapEventTarget = function (e) {
          var t = Xe(),
            n = t[e] && t[e].prototype;
          n &&
            n.hasOwnProperty &&
            n.hasOwnProperty("addEventListener") &&
            (qe(n, "addEventListener", function (t) {
              return function (n, r, o) {
                try {
                  "function" == typeof r.handleEvent &&
                    (r.handleEvent = Bn(r.handleEvent.bind(r), {
                      mechanism: {
                        data: {
                          function: "handleEvent",
                          handler: Re(r),
                          target: e,
                        },
                        handled: !0,
                        type: "instrument",
                      },
                    }));
                } catch (e) {}
                return t.call(
                  this,
                  n,
                  Bn(r, {
                    mechanism: {
                      data: {
                        function: "addEventListener",
                        handler: Re(r),
                        target: e,
                      },
                      handled: !0,
                      type: "instrument",
                    },
                  }),
                  o
                );
              };
            }),
            qe(n, "removeEventListener", function (e) {
              return function (t, n, r) {
                try {
                  e.call(this, t, n.__sentry_wrapped__, r);
                } catch (e) {}
                return e.call(this, t, n, r);
              };
            }));
        }),
        (e.prototype._wrapXHR = function (e) {
          return function () {
            for (var t = [], n = 0; n < arguments.length; n++)
              t[n] = arguments[n];
            var r = this,
              o = ["onload", "onerror", "onprogress", "onreadystatechange"];
            return (
              o.forEach(function (e) {
                e in r &&
                  "function" == typeof r[e] &&
                  qe(r, e, function (t) {
                    var n = {
                      mechanism: {
                        data: { function: e, handler: Re(t) },
                        handled: !0,
                        type: "instrument",
                      },
                    };
                    return (
                      t.__sentry_original__ &&
                        (n.mechanism.data.handler = Re(t.__sentry_original__)),
                      Bn(t, n)
                    );
                  });
              }),
              e.apply(this, t)
            );
          };
        }),
        (e.id = "TryCatch"),
        e
      );
    })(),
    Vn = (function () {
      function e(t) {
        (this.name = e.id),
          (this._options = G(
            {
              console: !0,
              dom: !0,
              fetch: !0,
              history: !0,
              sentry: !0,
              xhr: !0,
            },
            t
          ));
      }
      return (
        (e.prototype.addSentryBreadcrumb = function (e) {
          this._options.sentry &&
            Vt().addBreadcrumb(
              {
                category:
                  "sentry." +
                  ("transaction" === e.type ? "transaction" : "event"),
                event_id: e.event_id,
                level: e.level,
                message: tt(e),
              },
              { event: e }
            );
        }),
        (e.prototype.setupOnce = function () {
          var e = this;
          this._options.console &&
            _t({
              callback: function () {
                for (var t = [], n = 0; n < arguments.length; n++)
                  t[n] = arguments[n];
                e._consoleBreadcrumb.apply(e, Y(t));
              },
              type: "console",
            }),
            this._options.dom &&
              _t({
                callback: function () {
                  for (var t = [], n = 0; n < arguments.length; n++)
                    t[n] = arguments[n];
                  e._domBreadcrumb.apply(e, Y(t));
                },
                type: "dom",
              }),
            this._options.xhr &&
              _t({
                callback: function () {
                  for (var t = [], n = 0; n < arguments.length; n++)
                    t[n] = arguments[n];
                  e._xhrBreadcrumb.apply(e, Y(t));
                },
                type: "xhr",
              }),
            this._options.fetch &&
              _t({
                callback: function () {
                  for (var t = [], n = 0; n < arguments.length; n++)
                    t[n] = arguments[n];
                  e._fetchBreadcrumb.apply(e, Y(t));
                },
                type: "fetch",
              }),
            this._options.history &&
              _t({
                callback: function () {
                  for (var t = [], n = 0; n < arguments.length; n++)
                    t[n] = arguments[n];
                  e._historyBreadcrumb.apply(e, Y(t));
                },
                type: "history",
              });
        }),
        (e.prototype._consoleBreadcrumb = function (e) {
          var t = {
            category: "console",
            data: { arguments: e.args, logger: "console" },
            level: Zt.fromString(e.level),
            message: je(e.args, " "),
          };
          if ("assert" === e.level) {
            if (!1 !== e.args[0]) return;
            (t.message =
              "Assertion failed: " +
              (je(e.args.slice(1), " ") || "console.assert")),
              (t.data.arguments = e.args.slice(1));
          }
          Vt().addBreadcrumb(t, { input: e.args, level: e.level });
        }),
        (e.prototype._domBreadcrumb = function (e) {
          var t;
          try {
            t = e.event.target ? ue(e.event.target) : ue(e.event);
          } catch (e) {
            t = "<unknown>";
          }
          0 !== t.length &&
            Vt().addBreadcrumb(
              { category: "ui." + e.name, message: t },
              { event: e.event, name: e.name }
            );
        }),
        (e.prototype._xhrBreadcrumb = function (e) {
          if (e.endTimestamp) {
            if (e.xhr.__sentry_own_request__) return;
            var t = e.xhr.__sentry_xhr__ || {},
              n = t.method,
              r = t.url,
              o = t.status_code,
              i = t.body;
            Vt().addBreadcrumb(
              {
                category: "xhr",
                data: { method: n, url: r, status_code: o },
                type: "http",
              },
              { xhr: e.xhr, input: i }
            );
          } else;
        }),
        (e.prototype._fetchBreadcrumb = function (e) {
          e.endTimestamp &&
            ((e.fetchData.url.match(/sentry_key/) &&
              "POST" === e.fetchData.method) ||
              (e.error
                ? Vt().addBreadcrumb(
                    {
                      category: "fetch",
                      data: e.fetchData,
                      level: Zt.Error,
                      type: "http",
                    },
                    { data: e.error, input: e.args }
                  )
                : Vt().addBreadcrumb(
                    {
                      category: "fetch",
                      data: G(G({}, e.fetchData), {
                        status_code: e.response.status,
                      }),
                      type: "http",
                    },
                    { input: e.args, response: e.response }
                  )));
        }),
        (e.prototype._historyBreadcrumb = function (e) {
          var t = Xe(),
            n = e.from,
            r = e.to,
            o = et(t.location.href),
            i = et(n),
            a = et(r);
          i.path || (i = o),
            o.protocol === a.protocol && o.host === a.host && (r = a.relative),
            o.protocol === i.protocol && o.host === i.host && (n = i.relative),
            Vt().addBreadcrumb({
              category: "navigation",
              data: { from: n, to: r },
            });
        }),
        (e.id = "Breadcrumbs"),
        e
      );
    })(),
    zn = (function () {
      function e(t) {
        void 0 === t && (t = {}),
          (this.name = e.id),
          (this._key = t.key || "cause"),
          (this._limit = t.limit || 5);
      }
      return (
        (e.prototype.setupOnce = function () {
          jt(function (t, n) {
            var r = Vt().getIntegration(e);
            return r ? r._handler(t, n) : t;
          });
        }),
        (e.prototype._handler = function (e, t) {
          if (
            !(
              e.exception &&
              e.exception.values &&
              t &&
              le(t.originalException, Error)
            )
          )
            return e;
          var n = this._walkErrorTree(t.originalException, this._key);
          return (e.exception.values = Y(n, e.exception.values)), e;
        }),
        (e.prototype._walkErrorTree = function (e, t, n) {
          if (
            (void 0 === n && (n = []),
            !le(e[t], Error) || n.length + 1 >= this._limit)
          )
            return n;
          var r = xn(wn(e[t]));
          return this._walkErrorTree(e[t], t, Y([r], n));
        }),
        (e.id = "LinkedErrors"),
        e
      );
    })(),
    Gn = Xe(),
    $n = (function () {
      function e() {
        this.name = e.id;
      }
      return (
        (e.prototype.setupOnce = function () {
          jt(function (t) {
            var n, r, o;
            if (Vt().getIntegration(e)) {
              if (!Gn.navigator && !Gn.location && !Gn.document) return t;
              var i =
                  (null === (n = t.request) || void 0 === n ? void 0 : n.url) ||
                  (null === (r = Gn.location) || void 0 === r
                    ? void 0
                    : r.href),
                a = (Gn.document || {}).referrer,
                s = (Gn.navigator || {}).userAgent,
                l = G(
                  G(
                    G(
                      {},
                      null === (o = t.request) || void 0 === o
                        ? void 0
                        : o.headers
                    ),
                    a && { Referer: a }
                  ),
                  s && { "User-Agent": s }
                ),
                u = G(G({}, i && { url: i }), { headers: l });
              return G(G({}, t), { request: u });
            }
            return t;
          });
        }),
        (e.id = "UserAgent"),
        e
      );
    })();
  r(jn, "GlobalHandlers", function () {
    return Ln;
  }),
    r(jn, "TryCatch", function () {
      return Hn;
    }),
    r(jn, "Breadcrumbs", function () {
      return Vn;
    }),
    r(jn, "LinkedErrors", function () {
      return zn;
    }),
    r(jn, "UserAgent", function () {
      return $n;
    });
  var Wn = "5.25.0",
    Yn = (function (e) {
      function t(t) {
        return void 0 === t && (t = {}), e.call(this, On, t) || this;
      }
      return (
        z(t, e),
        (t.prototype.showReportDialog = function (e) {
          void 0 === e && (e = {}),
            Xe().document &&
              (this._isEnabled()
                ? Un(G(G({}, e), { dsn: e.dsn || this.getDsn() }))
                : ut.error(
                    "Trying to call showReportDialog with Sentry Client disabled"
                  ));
        }),
        (t.prototype._prepareEvent = function (t, n, r) {
          return (
            (t.platform = t.platform || "javascript"),
            (t.sdk = G(G({}, t.sdk), {
              name: "sentry.javascript.browser",
              packages: Y((t.sdk && t.sdk.packages) || [], [
                { name: "npm:@sentry/browser", version: Wn },
              ]),
              version: Wn,
            })),
            e.prototype._prepareEvent.call(this, t, n, r)
          );
        }),
        (t.prototype._sendEvent = function (t) {
          var n = this.getIntegration(Vn);
          n && n.addSentryBreadcrumb(t), e.prototype._sendEvent.call(this, t);
        }),
        t
      );
    })(rn),
    Qn = [
      new un.InboundFilters(),
      new un.FunctionToString(),
      new Hn(),
      new Vn(),
      new Ln(),
      new zn(),
      new $n(),
    ];
  function Jn(e) {
    if (
      (void 0 === e && (e = {}),
      void 0 === e.defaultIntegrations && (e.defaultIntegrations = Qn),
      void 0 === e.release)
    ) {
      var t = Xe();
      t.SENTRY_RELEASE &&
        t.SENTRY_RELEASE.id &&
        (e.release = t.SENTRY_RELEASE.id);
    }
    !(function (e, t) {
      !0 === t.debug && ut.enable();
      var n = Vt(),
        r = new e(t);
      n.bindClient(r);
    })(Yn, e);
  }
  var Kn = function () {
      var t = { exports: this };
      this.__esModule = !0;
      var n = (function (e) {
        var t,
          n = e.Symbol;
        return (
          "function" == typeof n
            ? n.observable
              ? (t = n.observable)
              : ((t = n("observable")), (n.observable = t))
            : (t = "@@observable"),
          t
        );
      })(
        "undefined" != typeof self
          ? self
          : "undefined" != typeof window
          ? window
          : void 0 !== e
          ? e
          : void 0 !== t
          ? t
          : Function("return this")()
      );
      return (
        r(this, "default", function () {
          return n;
        }),
        t.exports
      );
    }.call({}),
    Xn = function () {
      return Math.random().toString(36).substring(7).split("").join(".");
    },
    Zn = {
      INIT: "@@redux/INIT" + Xn(),
      REPLACE: "@@redux/REPLACE" + Xn(),
      PROBE_UNKNOWN_ACTION: function () {
        return "@@redux/PROBE_UNKNOWN_ACTION" + Xn();
      },
    };
  function er(e) {
    if ("object" != typeof e || null === e) return !1;
    for (var t = e; null !== Object.getPrototypeOf(t); )
      t = Object.getPrototypeOf(t);
    return Object.getPrototypeOf(e) === t;
  }
  function tr(e, t, n) {
    var r;
    if (
      ("function" == typeof t && "function" == typeof n) ||
      ("function" == typeof n && "function" == typeof arguments[3])
    )
      throw new Error(
        "It looks like you are passing several store enhancers to createStore(). This is not supported. Instead, compose them together to a single function."
      );
    if (
      ("function" == typeof t && void 0 === n && ((n = t), (t = void 0)),
      void 0 !== n)
    ) {
      if ("function" != typeof n)
        throw new Error("Expected the enhancer to be a function.");
      return n(tr)(e, t);
    }
    if ("function" != typeof e)
      throw new Error("Expected the reducer to be a function.");
    var o = e,
      i = t,
      a = [],
      s = a,
      l = !1;
    function u() {
      s === a && (s = a.slice());
    }
    function c() {
      if (l)
        throw new Error(
          "You may not call store.getState() while the reducer is executing. The reducer has already received the state as an argument. Pass it down from the top reducer instead of reading it from the store."
        );
      return i;
    }
    function d(e) {
      if ("function" != typeof e)
        throw new Error("Expected the listener to be a function.");
      if (l)
        throw new Error(
          "You may not call store.subscribe() while the reducer is executing. If you would like to be notified after the store has been updated, subscribe from a component and invoke store.getState() in the callback to access the latest state. See https://redux.js.org/api-reference/store#subscribelistener for more details."
        );
      var t = !0;
      return (
        u(),
        s.push(e),
        function () {
          if (t) {
            if (l)
              throw new Error(
                "You may not unsubscribe from a store listener while the reducer is executing. See https://redux.js.org/api-reference/store#subscribelistener for more details."
              );
            (t = !1), u();
            var n = s.indexOf(e);
            s.splice(n, 1), (a = null);
          }
        }
      );
    }
    function f(e) {
      if (!er(e))
        throw new Error(
          "Actions must be plain objects. Use custom middleware for async actions."
        );
      if (void 0 === e.type)
        throw new Error(
          'Actions may not have an undefined "type" property. Have you misspelled a constant?'
        );
      if (l) throw new Error("Reducers may not dispatch actions.");
      try {
        (l = !0), (i = o(i, e));
      } finally {
        l = !1;
      }
      for (var t = (a = s), n = 0; n < t.length; n++) {
        (0, t[n])();
      }
      return e;
    }
    function p(e) {
      if ("function" != typeof e)
        throw new Error("Expected the nextReducer to be a function.");
      (o = e), f({ type: Zn.REPLACE });
    }
    function h() {
      var e,
        t = d;
      return (
        ((e = {
          subscribe: function (e) {
            if ("object" != typeof e || null === e)
              throw new TypeError("Expected the observer to be an object.");
            function n() {
              e.next && e.next(c());
            }
            return n(), { unsubscribe: t(n) };
          },
        })[Kn.default] = function () {
          return this;
        }),
        e
      );
    }
    return (
      f({ type: Zn.INIT }),
      ((r = { dispatch: f, subscribe: d, getState: c, replaceReducer: p })[
        Kn.default
      ] = h),
      r
    );
  }
  function nr(e, t) {
    return function () {
      return t(e.apply(this, arguments));
    };
  }
  const rr = {
    store: null,
    init: function (e = {}) {
      if (this.store) return;
      const t = this._reduce.bind(this);
      return (
        u.is.development && globalThis.devToolsExtension
          ? (this.store = tr(t, e, globalThis.devToolsExtension()))
          : (this.store = tr(t, e)),
        this.store
      );
    },
    get state() {
      return this.store.getState();
    },
    dispatch: function (e, t) {
      "influx.set-state" !== e.type &&
        log(
          `%cdispatching %c${e.type}`,
          "color: #0091ec",
          "color: #0091ec; font-weight: bold;"
        ),
        this.store.dispatch({ type: e.type, perform: e, payload: t });
    },
    observe: function (e, t, n = !0) {
      let r = e(this.state);
      const o = this.store.subscribe(() => {
        const n = e(this.state);
        if (n !== r) {
          const e = r;
          (r = n), t(r, e);
        }
      });
      return n && t(r, void 0), o;
    },
    _reduce: function (e = {}, t) {
      return t.perform ? t.perform(e, ...t.payload) : e;
    },
  };
  var or,
    ir,
    ar,
    sr,
    lr = !1;
  function ur(e) {
    if (null == e)
      throw new TypeError(
        "Object.assign cannot be called with null or undefined"
      );
    return Object(e);
  }
  function cr() {
    (or = {}),
      (ir = Object.getOwnPropertySymbols),
      (ar = Object.prototype.hasOwnProperty),
      (sr = Object.prototype.propertyIsEnumerable),
      (or = (function () {
        try {
          if (!Object.assign) return !1;
          var e = new String("abc");
          if (((e[5] = "de"), "5" === Object.getOwnPropertyNames(e)[0]))
            return !1;
          for (var t = {}, n = 0; n < 10; n++)
            t["_" + String.fromCharCode(n)] = n;
          if (
            "0123456789" !==
            Object.getOwnPropertyNames(t)
              .map(function (e) {
                return t[e];
              })
              .join("")
          )
            return !1;
          var r = {};
          return (
            "abcdefghijklmnopqrst".split("").forEach(function (e) {
              r[e] = e;
            }),
            "abcdefghijklmnopqrst" ===
              Object.keys(Object.assign({}, r)).join("")
          );
        } catch (e) {
          return !1;
        }
      })()
        ? Object.assign
        : function (e, t) {
            for (var n, r, o = ur(e), i = 1; i < arguments.length; i++) {
              for (var a in (n = Object(arguments[i])))
                ar.call(n, a) && (o[a] = n[a]);
              if (ir) {
                r = ir(n);
                for (var s = 0; s < r.length; s++)
                  sr.call(n, r[s]) && (o[r[s]] = n[r[s]]);
              }
            }
            return o;
          });
  }
  function dr() {
    return lr || ((lr = !0), cr()), or;
  }
  var fr,
    pr,
    hr,
    gr,
    mr,
    vr,
    br,
    yr,
    wr,
    _r,
    Sr,
    xr,
    Pr,
    Dr,
    kr,
    Er,
    Tr,
    Ir,
    Cr,
    Fr,
    Ar,
    Or,
    Mr,
    Rr,
    Nr,
    Br,
    Ur,
    jr,
    Lr,
    qr,
    Hr,
    Vr,
    zr,
    Gr,
    $r,
    Wr,
    Yr,
    Qr,
    Jr,
    Kr,
    Xr,
    Zr,
    eo,
    to,
    no,
    ro,
    oo,
    io,
    ao,
    so,
    lo,
    uo,
    co = !1;
  function fo(e) {
    for (
      var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e,
        n = 1;
      n < arguments.length;
      n++
    )
      t += "&args[]=" + encodeURIComponent(arguments[n]);
    return (
      "Minified React error #" +
      e +
      "; visit " +
      t +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function po(e, t, n) {
    (this.props = e),
      (this.context = t),
      (this.refs = Tr),
      (this.updater = n || Er);
  }
  function ho() {}
  function go(e, t, n) {
    (this.props = e),
      (this.context = t),
      (this.refs = Tr),
      (this.updater = n || Er);
  }
  function mo(e, t, n) {
    var r,
      o = {},
      i = null,
      a = null;
    if (null != t)
      for (r in (void 0 !== t.ref && (a = t.ref),
      void 0 !== t.key && (i = "" + t.key),
      t))
        Fr.call(t, r) && !Ar.hasOwnProperty(r) && (o[r] = t[r]);
    var s = arguments.length - 2;
    if (1 === s) o.children = n;
    else if (1 < s) {
      for (var l = Array(s), u = 0; u < s; u++) l[u] = arguments[u + 2];
      o.children = l;
    }
    if (e && e.defaultProps)
      for (r in (s = e.defaultProps)) void 0 === o[r] && (o[r] = s[r]);
    return {
      $$typeof: gr,
      type: e,
      key: i,
      ref: a,
      props: o,
      _owner: Cr.current,
    };
  }
  function vo(e) {
    return "object" == typeof e && null !== e && e.$$typeof === gr;
  }
  function bo(e, t, n, r) {
    if (Mr.length) {
      var o = Mr.pop();
      return (
        (o.result = e),
        (o.keyPrefix = t),
        (o.func = n),
        (o.context = r),
        (o.count = 0),
        o
      );
    }
    return { result: e, keyPrefix: t, func: n, context: r, count: 0 };
  }
  function yo(e) {
    (e.result = null),
      (e.keyPrefix = null),
      (e.func = null),
      (e.context = null),
      (e.count = 0),
      10 > Mr.length && Mr.push(e);
  }
  function wo(e, t, n, r) {
    var o = typeof e;
    ("undefined" !== o && "boolean" !== o) || (e = null);
    var i = !1;
    if (null === e) i = !0;
    else
      switch (o) {
        case "string":
        case "number":
          i = !0;
          break;
        case "object":
          switch (e.$$typeof) {
            case gr:
            case mr:
              i = !0;
          }
      }
    if (i) return n(r, e, "" === t ? "." + So(e, 0) : t), 1;
    if (((i = 0), (t = "" === t ? "." : t + ":"), Array.isArray(e)))
      for (var a = 0; a < e.length; a++) {
        var s = t + So((o = e[a]), a);
        i += wo(o, s, n, r);
      }
    else if (
      (null === e || "object" != typeof e
        ? (s = null)
        : (s =
            "function" == typeof (s = (kr && e[kr]) || e["@@iterator"])
              ? s
              : null),
      "function" == typeof s)
    )
      for (e = s.call(e), a = 0; !(o = e.next()).done; )
        i += wo((o = o.value), (s = t + So(o, a++)), n, r);
    else if ("object" === o)
      throw (
        ((n = "" + e),
        Error(
          fo(
            31,
            "[object Object]" === n
              ? "object with keys {" + Object.keys(e).join(", ") + "}"
              : n,
            ""
          )
        ))
      );
    return i;
  }
  function _o(e, t, n) {
    return null == e ? 0 : wo(e, "", t, n);
  }
  function So(e, t) {
    return "object" == typeof e && null !== e && null != e.key
      ? (function (e) {
          var t = { "=": "=0", ":": "=2" };
          return (
            "$" +
            ("" + e).replace(/[=:]/g, function (e) {
              return t[e];
            })
          );
        })(e.key)
      : t.toString(36);
  }
  function xo(e, t) {
    e.func.call(e.context, t, e.count++);
  }
  function Po(e, t, n) {
    var r = e.result,
      o = e.keyPrefix;
    (e = e.func.call(e.context, t, e.count++)),
      Array.isArray(e)
        ? Do(e, r, n, function (e) {
            return e;
          })
        : null != e &&
          (vo(e) &&
            (e = (function (e, t) {
              return {
                $$typeof: gr,
                type: e.type,
                key: t,
                ref: e.ref,
                props: e.props,
                _owner: e._owner,
              };
            })(
              e,
              o +
                (!e.key || (t && t.key === e.key)
                  ? ""
                  : ("" + e.key).replace(Or, "$&/") + "/") +
                n
            )),
          r.push(e));
  }
  function Do(e, t, n, r, o) {
    var i = "";
    null != n && (i = ("" + n).replace(Or, "$&/") + "/"),
      _o(e, Po, (t = bo(t, i, r, o))),
      yo(t);
  }
  function ko() {
    var e = Rr.current;
    if (null === e) throw Error(fo(321));
    return e;
  }
  function Eo() {
    return (
      co ||
        ((co = !0),
        (fr = {}),
        (pr = dr()),
        (hr = "function" == typeof Symbol && Symbol.for),
        (gr = hr ? Symbol.for("react.element") : 60103),
        (mr = hr ? Symbol.for("react.portal") : 60106),
        (vr = hr ? Symbol.for("react.fragment") : 60107),
        (br = hr ? Symbol.for("react.strict_mode") : 60108),
        (yr = hr ? Symbol.for("react.profiler") : 60114),
        (wr = hr ? Symbol.for("react.provider") : 60109),
        (_r = hr ? Symbol.for("react.context") : 60110),
        (Sr = hr ? Symbol.for("react.forward_ref") : 60112),
        (xr = hr ? Symbol.for("react.suspense") : 60113),
        (Pr = hr ? Symbol.for("react.memo") : 60115),
        (Dr = hr ? Symbol.for("react.lazy") : 60116),
        (kr = "function" == typeof Symbol && Symbol.iterator),
        (Er = {
          isMounted: function () {
            return !1;
          },
          enqueueForceUpdate: function () {},
          enqueueReplaceState: function () {},
          enqueueSetState: function () {},
        }),
        (Tr = {}),
        (po.prototype.isReactComponent = {}),
        (po.prototype.setState = function (e, t) {
          if ("object" != typeof e && "function" != typeof e && null != e)
            throw Error(fo(85));
          this.updater.enqueueSetState(this, e, t, "setState");
        }),
        (po.prototype.forceUpdate = function (e) {
          this.updater.enqueueForceUpdate(this, e, "forceUpdate");
        }),
        (ho.prototype = po.prototype),
        ((Ir = go.prototype = new ho()).constructor = go),
        pr(Ir, po.prototype),
        (Ir.isPureReactComponent = !0),
        (Cr = { current: null }),
        (Fr = Object.prototype.hasOwnProperty),
        (Ar = { key: !0, ref: !0, __self: !0, __source: !0 }),
        (Or = /\/+/g),
        (Mr = []),
        (Nr = {
          ReactCurrentDispatcher: (Rr = { current: null }),
          ReactCurrentBatchConfig: { suspense: null },
          ReactCurrentOwner: Cr,
          IsSomeRendererActing: { current: !1 },
          assign: pr,
        }),
        (Br = {
          map: function (e, t, n) {
            if (null == e) return e;
            var r = [];
            return Do(e, r, null, t, n), r;
          },
          forEach: function (e, t, n) {
            if (null == e) return e;
            _o(e, xo, (t = bo(null, null, t, n))), yo(t);
          },
          count: function (e) {
            return _o(
              e,
              function () {
                return null;
              },
              null
            );
          },
          toArray: function (e) {
            var t = [];
            return (
              Do(e, t, null, function (e) {
                return e;
              }),
              t
            );
          },
          only: function (e) {
            if (!vo(e)) throw Error(fo(143));
            return e;
          },
        }),
        (fr.Children = Br),
        (Ur = po),
        (fr.Component = Ur),
        (jr = vr),
        (fr.Fragment = jr),
        (Lr = yr),
        (fr.Profiler = Lr),
        (qr = go),
        (fr.PureComponent = qr),
        (Hr = br),
        (fr.StrictMode = Hr),
        (Vr = xr),
        (fr.Suspense = Vr),
        (zr = Nr),
        (fr.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = zr),
        (Gr = function (e, t, n) {
          if (null == e) throw Error(fo(267, e));
          var r = pr({}, e.props),
            o = e.key,
            i = e.ref,
            a = e._owner;
          if (null != t) {
            if (
              (void 0 !== t.ref && ((i = t.ref), (a = Cr.current)),
              void 0 !== t.key && (o = "" + t.key),
              e.type && e.type.defaultProps)
            )
              var s = e.type.defaultProps;
            for (l in t)
              Fr.call(t, l) &&
                !Ar.hasOwnProperty(l) &&
                (r[l] = void 0 === t[l] && void 0 !== s ? s[l] : t[l]);
          }
          var l = arguments.length - 2;
          if (1 === l) r.children = n;
          else if (1 < l) {
            s = Array(l);
            for (var u = 0; u < l; u++) s[u] = arguments[u + 2];
            r.children = s;
          }
          return {
            $$typeof: gr,
            type: e.type,
            key: o,
            ref: i,
            props: r,
            _owner: a,
          };
        }),
        (fr.cloneElement = Gr),
        ($r = function (e, t) {
          return (
            void 0 === t && (t = null),
            ((e = {
              $$typeof: _r,
              _calculateChangedBits: t,
              _currentValue: e,
              _currentValue2: e,
              _threadCount: 0,
              Provider: null,
              Consumer: null,
            }).Provider = { $$typeof: wr, _context: e }),
            (e.Consumer = e)
          );
        }),
        (fr.createContext = $r),
        (Wr = mo),
        (fr.createElement = Wr),
        (Yr = function (e) {
          var t = mo.bind(null, e);
          return (t.type = e), t;
        }),
        (fr.createFactory = Yr),
        (Qr = function () {
          return { current: null };
        }),
        (fr.createRef = Qr),
        (Jr = function (e) {
          return { $$typeof: Sr, render: e };
        }),
        (fr.forwardRef = Jr),
        (Kr = vo),
        (fr.isValidElement = Kr),
        (Xr = function (e) {
          return { $$typeof: Dr, _ctor: e, _status: -1, _result: null };
        }),
        (fr.lazy = Xr),
        (Zr = function (e, t) {
          return { $$typeof: Pr, type: e, compare: void 0 === t ? null : t };
        }),
        (fr.memo = Zr),
        (eo = function (e, t) {
          return ko().useCallback(e, t);
        }),
        (fr.useCallback = eo),
        (to = function (e, t) {
          return ko().useContext(e, t);
        }),
        (fr.useContext = to),
        (no = function () {}),
        (fr.useDebugValue = no),
        (ro = function (e, t) {
          return ko().useEffect(e, t);
        }),
        (fr.useEffect = ro),
        (oo = function (e, t, n) {
          return ko().useImperativeHandle(e, t, n);
        }),
        (fr.useImperativeHandle = oo),
        (io = function (e, t) {
          return ko().useLayoutEffect(e, t);
        }),
        (fr.useLayoutEffect = io),
        (ao = function (e, t) {
          return ko().useMemo(e, t);
        }),
        (fr.useMemo = ao),
        (so = function (e, t, n) {
          return ko().useReducer(e, t, n);
        }),
        (fr.useReducer = so),
        (lo = function (e) {
          return ko().useRef(e);
        }),
        (fr.useRef = lo),
        (uo = function (e) {
          return ko().useState(e);
        }),
        (fr.useState = uo),
        "16.13.1",
        (fr.version = "16.13.1")),
      fr
    );
  }
  var To,
    Io,
    Co = !1;
  function Fo() {
    return Co || ((Co = !0), (To = {}), (To = Eo()), (Io = t(To))), To;
  }
  Fo();
  var Ao,
    Oo = !1;
  function Mo() {
    return (
      Oo ||
        ((Oo = !0),
        (Ao = {}),
        "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED",
        (Ao = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED")),
      Ao
    );
  }
  var Ro,
    No,
    Bo = !1;
  function Uo() {}
  function jo() {}
  (Bo ||
    ((Bo = !0),
    (Ro = {}),
    (No = Mo()),
    (jo.resetWarningCache = Uo),
    (Ro = function () {
      function e(e, t, n, r, o, i) {
        if (i !== No) {
          var a = new Error(
            "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
          );
          throw ((a.name = "Invariant Violation"), a);
        }
      }
      function t() {
        return e;
      }
      e.isRequired = e;
      var n = {
        array: e,
        bool: e,
        func: e,
        number: e,
        object: e,
        string: e,
        symbol: e,
        any: e,
        arrayOf: t,
        element: e,
        elementType: e,
        instanceOf: t,
        node: e,
        objectOf: t,
        oneOf: t,
        oneOfType: t,
        shape: t,
        exact: t,
        checkPropTypes: jo,
        resetWarningCache: Uo,
      };
      return (n.PropTypes = n), n;
    })),
  Ro)();
  Fo();
  var Lo = Io.createContext(null);
  var qo = function (e) {
      e();
    },
    Ho = { notify: function () {} };
  function Vo() {
    var e = qo,
      t = null,
      n = null;
    return {
      clear: function () {
        (t = null), (n = null);
      },
      notify: function () {
        e(function () {
          for (var e = t; e; ) e.callback(), (e = e.next);
        });
      },
      get: function () {
        for (var e = [], n = t; n; ) e.push(n), (n = n.next);
        return e;
      },
      subscribe: function (e) {
        var r = !0,
          o = (n = { callback: e, next: null, prev: n });
        return (
          o.prev ? (o.prev.next = o) : (t = o),
          function () {
            r &&
              null !== t &&
              ((r = !1),
              o.next ? (o.next.prev = o.prev) : (n = o.prev),
              o.prev ? (o.prev.next = o.next) : (t = o.next));
          }
        );
      },
    };
  }
  var zo = (function () {
    function e(e, t) {
      (this.store = e),
        (this.parentSub = t),
        (this.unsubscribe = null),
        (this.listeners = Ho),
        (this.handleChangeWrapper = this.handleChangeWrapper.bind(this));
    }
    var t = e.prototype;
    return (
      (t.addNestedSub = function (e) {
        return this.trySubscribe(), this.listeners.subscribe(e);
      }),
      (t.notifyNestedSubs = function () {
        this.listeners.notify();
      }),
      (t.handleChangeWrapper = function () {
        this.onStateChange && this.onStateChange();
      }),
      (t.isSubscribed = function () {
        return Boolean(this.unsubscribe);
      }),
      (t.trySubscribe = function () {
        this.unsubscribe ||
          ((this.unsubscribe = this.parentSub
            ? this.parentSub.addNestedSub(this.handleChangeWrapper)
            : this.store.subscribe(this.handleChangeWrapper)),
          (this.listeners = Vo()));
      }),
      (t.tryUnsubscribe = function () {
        this.unsubscribe &&
          (this.unsubscribe(),
          (this.unsubscribe = null),
          this.listeners.clear(),
          (this.listeners = Ho));
      }),
      e
    );
  })();
  function Go() {
    return (Go =
      Object.assign ||
      function (e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = arguments[t];
          for (var r in n)
            Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
        }
        return e;
      }).apply(this, arguments);
  }
  var $o = Go;
  function Wo(e, t) {
    if (null == e) return {};
    var n,
      r,
      o = {},
      i = Object.keys(e);
    for (r = 0; r < i.length; r++)
      (n = i[r]), t.indexOf(n) >= 0 || (o[n] = e[n]);
    return o;
  }
  var Yo,
    Qo,
    Jo,
    Ko,
    Xo,
    Zo,
    ei,
    ti,
    ni,
    ri,
    oi,
    ii,
    ai,
    si,
    li,
    ui,
    ci,
    di,
    fi,
    pi,
    hi,
    gi,
    mi,
    vi,
    bi,
    yi,
    wi,
    _i,
    Si,
    xi,
    Pi,
    Di,
    ki,
    Ei,
    Ti,
    Ii,
    Ci,
    Fi,
    Ai,
    Oi,
    Mi,
    Ri,
    Ni,
    Bi,
    Ui,
    ji,
    Li,
    qi,
    Hi = !1;
  function Vi(e) {
    if ("object" == typeof e && null !== e) {
      var t = e.$$typeof;
      switch (t) {
        case Jo:
          switch ((e = e.type)) {
            case ri:
            case oi:
            case Xo:
            case ei:
            case Zo:
            case ai:
              return e;
            default:
              switch ((e = e && e.$$typeof)) {
                case ni:
                case ii:
                case ui:
                case li:
                case ti:
                  return e;
                default:
                  return t;
              }
          }
        case Ko:
          return t;
      }
    }
  }
  function zi(e) {
    return Vi(e) === oi;
  }
  var Gi = {};
  Hi ||
    ((Hi = !0),
    (Yo = {}),
    (Qo = "function" == typeof Symbol && Symbol.for),
    (Jo = Qo ? Symbol.for("react.element") : 60103),
    (Ko = Qo ? Symbol.for("react.portal") : 60106),
    (Xo = Qo ? Symbol.for("react.fragment") : 60107),
    (Zo = Qo ? Symbol.for("react.strict_mode") : 60108),
    (ei = Qo ? Symbol.for("react.profiler") : 60114),
    (ti = Qo ? Symbol.for("react.provider") : 60109),
    (ni = Qo ? Symbol.for("react.context") : 60110),
    (ri = Qo ? Symbol.for("react.async_mode") : 60111),
    (oi = Qo ? Symbol.for("react.concurrent_mode") : 60111),
    (ii = Qo ? Symbol.for("react.forward_ref") : 60112),
    (ai = Qo ? Symbol.for("react.suspense") : 60113),
    (si = Qo ? Symbol.for("react.suspense_list") : 60120),
    (li = Qo ? Symbol.for("react.memo") : 60115),
    (ui = Qo ? Symbol.for("react.lazy") : 60116),
    (ci = Qo ? Symbol.for("react.block") : 60121),
    (di = Qo ? Symbol.for("react.fundamental") : 60117),
    (fi = Qo ? Symbol.for("react.responder") : 60118),
    (pi = Qo ? Symbol.for("react.scope") : 60119),
    (hi = ri),
    (Yo.AsyncMode = hi),
    (gi = oi),
    (Yo.ConcurrentMode = gi),
    (mi = ni),
    (Yo.ContextConsumer = mi),
    (vi = ti),
    (Yo.ContextProvider = vi),
    (bi = Jo),
    (Yo.Element = bi),
    (yi = ii),
    (Yo.ForwardRef = yi),
    (wi = Xo),
    (Yo.Fragment = wi),
    (_i = ui),
    (Yo.Lazy = _i),
    (Si = li),
    (Yo.Memo = Si),
    (xi = Ko),
    (Yo.Portal = xi),
    (Pi = ei),
    (Yo.Profiler = Pi),
    (Di = Zo),
    (Yo.StrictMode = Di),
    (ki = ai),
    (Yo.Suspense = ki),
    (Ei = function (e) {
      return zi(e) || Vi(e) === ri;
    }),
    (Yo.isAsyncMode = Ei),
    (Ti = zi),
    (Yo.isConcurrentMode = Ti),
    (Ii = function (e) {
      return Vi(e) === ni;
    }),
    (Yo.isContextConsumer = Ii),
    (Ci = function (e) {
      return Vi(e) === ti;
    }),
    (Yo.isContextProvider = Ci),
    (Fi = function (e) {
      return "object" == typeof e && null !== e && e.$$typeof === Jo;
    }),
    (Yo.isElement = Fi),
    (Ai = function (e) {
      return Vi(e) === ii;
    }),
    (Yo.isForwardRef = Ai),
    (Oi = function (e) {
      return Vi(e) === Xo;
    }),
    (Yo.isFragment = Oi),
    (Mi = function (e) {
      return Vi(e) === ui;
    }),
    (Yo.isLazy = Mi),
    (Ri = function (e) {
      return Vi(e) === li;
    }),
    (Yo.isMemo = Ri),
    (Ni = function (e) {
      return Vi(e) === Ko;
    }),
    (Yo.isPortal = Ni),
    (Bi = function (e) {
      return Vi(e) === ei;
    }),
    (Yo.isProfiler = Bi),
    (Ui = function (e) {
      return Vi(e) === Zo;
    }),
    (Yo.isStrictMode = Ui),
    (ji = function (e) {
      return Vi(e) === ai;
    }),
    (Yo.isSuspense = ji),
    (Li = function (e) {
      return (
        "string" == typeof e ||
        "function" == typeof e ||
        e === Xo ||
        e === oi ||
        e === ei ||
        e === Zo ||
        e === ai ||
        e === si ||
        ("object" == typeof e &&
          null !== e &&
          (e.$$typeof === ui ||
            e.$$typeof === li ||
            e.$$typeof === ti ||
            e.$$typeof === ni ||
            e.$$typeof === ii ||
            e.$$typeof === di ||
            e.$$typeof === fi ||
            e.$$typeof === pi ||
            e.$$typeof === ci))
      );
    }),
    (Yo.isValidElementType = Li),
    (qi = Vi),
    (Yo.typeOf = qi));
  var $i = {
      childContextTypes: !0,
      contextType: !0,
      contextTypes: !0,
      defaultProps: !0,
      displayName: !0,
      getDefaultProps: !0,
      getDerivedStateFromError: !0,
      getDerivedStateFromProps: !0,
      mixins: !0,
      propTypes: !0,
      type: !0,
    },
    Wi = {
      name: !0,
      length: !0,
      prototype: !0,
      caller: !0,
      callee: !0,
      arguments: !0,
      arity: !0,
    },
    Yi = {
      $$typeof: !0,
      compare: !0,
      defaultProps: !0,
      displayName: !0,
      propTypes: !0,
      type: !0,
    },
    Qi = {};
  function Ji(e) {
    return Gi.isMemo(e) ? Yi : Qi[e.$$typeof] || $i;
  }
  (Qi[(Gi = Yo).ForwardRef] = {
    $$typeof: !0,
    render: !0,
    defaultProps: !0,
    displayName: !0,
    propTypes: !0,
  }),
    (Qi[Gi.Memo] = Yi);
  var Ki = Object.defineProperty,
    Xi = Object.getOwnPropertyNames,
    Zi = Object.getOwnPropertySymbols,
    ea = Object.getOwnPropertyDescriptor,
    ta = Object.getPrototypeOf,
    na = Object.prototype;
  var ra = t(function e(t, n, r) {
    if ("string" != typeof n) {
      if (na) {
        var o = ta(n);
        o && o !== na && e(t, o, r);
      }
      var i = Xi(n);
      Zi && (i = i.concat(Zi(n)));
      for (var a = Ji(t), s = Ji(n), l = 0; l < i.length; ++l) {
        var u = i[l];
        if (!(Wi[u] || (r && r[u]) || (s && s[u]) || (a && a[u]))) {
          var c = ea(n, u);
          try {
            Ki(t, u, c);
          } catch (e) {}
        }
      }
    }
    return t;
  });
  Fo(), Fo();
  var oa =
      "undefined" != typeof window &&
      void 0 !== window.document &&
      void 0 !== window.document.createElement
        ? Fo().useLayoutEffect
        : Fo().useEffect,
    ia = [],
    aa = [null, null];
  function sa(e, t) {
    var n = e[1];
    return [t.payload, n + 1];
  }
  function la(e, t, n) {
    oa(function () {
      return e.apply(void 0, t);
    }, n);
  }
  function ua(e, t, n, r, o, i, a) {
    (e.current = r),
      (t.current = o),
      (n.current = !1),
      i.current && ((i.current = null), a());
  }
  function ca(e, t, n, r, o, i, a, s, l, u) {
    if (e) {
      var c = !1,
        d = null,
        f = function () {
          if (!c) {
            var e,
              n,
              f = t.getState();
            try {
              e = r(f, o.current);
            } catch (e) {
              (n = e), (d = e);
            }
            n || (d = null),
              e === i.current
                ? a.current || l()
                : ((i.current = e),
                  (s.current = e),
                  (a.current = !0),
                  u({ type: "STORE_UPDATED", payload: { error: n } }));
          }
        };
      (n.onStateChange = f), n.trySubscribe(), f();
      return function () {
        if (((c = !0), n.tryUnsubscribe(), (n.onStateChange = null), d))
          throw d;
      };
    }
  }
  var da = function () {
    return [null, 0];
  };
  function fa(e, t) {
    void 0 === t && (t = {});
    var n = t,
      r = n.getDisplayName,
      o =
        void 0 === r
          ? function (e) {
              return "ConnectAdvanced(" + e + ")";
            }
          : r,
      i = n.methodName,
      a = void 0 === i ? "connectAdvanced" : i,
      s = n.renderCountProp,
      l = void 0 === s ? void 0 : s,
      u = n.shouldHandleStateChanges,
      c = void 0 === u || u,
      d = n.storeKey,
      f = void 0 === d ? "store" : d,
      p = (n.withRef, n.forwardRef),
      h = void 0 !== p && p,
      g = n.context,
      m = void 0 === g ? Lo : g,
      v = Wo(n, [
        "getDisplayName",
        "methodName",
        "renderCountProp",
        "shouldHandleStateChanges",
        "storeKey",
        "withRef",
        "forwardRef",
        "context",
      ]),
      b = m;
    return function (t) {
      var n = t.displayName || t.name || "Component",
        r = o(n),
        i = $o({}, v, {
          getDisplayName: o,
          methodName: a,
          renderCountProp: l,
          shouldHandleStateChanges: c,
          storeKey: f,
          displayName: r,
          wrappedComponentName: n,
          WrappedComponent: t,
        }),
        s = v.pure;
      var u = s
        ? Fo().useMemo
        : function (e) {
            return e();
          };
      function d(n) {
        var r = Fo().useMemo(
            function () {
              var e = n.reactReduxForwardedRef,
                t = Wo(n, ["reactReduxForwardedRef"]);
              return [n.context, e, t];
            },
            [n]
          ),
          o = r[0],
          a = r[1],
          s = r[2],
          l = Fo().useMemo(
            function () {
              return o &&
                o.Consumer &&
                Gi.isContextConsumer(Io.createElement(o.Consumer, null))
                ? o
                : b;
            },
            [o, b]
          ),
          d = Fo().useContext(l),
          f =
            Boolean(n.store) &&
            Boolean(n.store.getState) &&
            Boolean(n.store.dispatch);
        Boolean(d) && Boolean(d.store);
        var p = f ? n.store : d.store,
          h = Fo().useMemo(
            function () {
              return (function (t) {
                return e(t.dispatch, i);
              })(p);
            },
            [p]
          ),
          g = Fo().useMemo(
            function () {
              if (!c) return aa;
              var e = new zo(p, f ? null : d.subscription),
                t = e.notifyNestedSubs.bind(e);
              return [e, t];
            },
            [p, f, d]
          ),
          m = g[0],
          v = g[1],
          y = Fo().useMemo(
            function () {
              return f ? d : $o({}, d, { subscription: m });
            },
            [f, d, m]
          ),
          w = Fo().useReducer(sa, ia, da),
          _ = w[0][0],
          S = w[1];
        if (_ && _.error) throw _.error;
        var x = Fo().useRef(),
          P = Fo().useRef(s),
          D = Fo().useRef(),
          k = Fo().useRef(!1),
          E = u(
            function () {
              return D.current && s === P.current
                ? D.current
                : h(p.getState(), s);
            },
            [p, _, s]
          );
        la(ua, [P, x, k, s, E, D, v]),
          la(ca, [c, p, m, h, P, x, k, D, v, S], [p, m, h]);
        var T = Fo().useMemo(
          function () {
            return Io.createElement(t, $o({}, E, { ref: a }));
          },
          [a, t, E]
        );
        return Fo().useMemo(
          function () {
            return c ? Io.createElement(l.Provider, { value: y }, T) : T;
          },
          [l, T, y]
        );
      }
      var p = s ? Io.memo(d) : d;
      if (((p.WrappedComponent = t), (p.displayName = r), h)) {
        var g = Io.forwardRef(function (e, t) {
          return Io.createElement(p, $o({}, e, { reactReduxForwardedRef: t }));
        });
        return (g.displayName = r), (g.WrappedComponent = t), ra(g, t);
      }
      return ra(p, t);
    };
  }
  function pa(e, t) {
    return e === t ? 0 !== e || 0 !== t || 1 / e == 1 / t : e != e && t != t;
  }
  function ha(e, t) {
    if (pa(e, t)) return !0;
    if (
      "object" != typeof e ||
      null === e ||
      "object" != typeof t ||
      null === t
    )
      return !1;
    var n = Object.keys(e),
      r = Object.keys(t);
    if (n.length !== r.length) return !1;
    for (var o = 0; o < n.length; o++)
      if (
        !Object.prototype.hasOwnProperty.call(t, n[o]) ||
        !pa(e[n[o]], t[n[o]])
      )
        return !1;
    return !0;
  }
  function ga(e) {
    return function (t, n) {
      var r = e(t, n);
      function o() {
        return r;
      }
      return (o.dependsOnOwnProps = !1), o;
    };
  }
  function ma(e) {
    return null !== e.dependsOnOwnProps && void 0 !== e.dependsOnOwnProps
      ? Boolean(e.dependsOnOwnProps)
      : 1 !== e.length;
  }
  function va(e, t) {
    return function (t, n) {
      n.displayName;
      var r = function (e, t) {
        return r.dependsOnOwnProps ? r.mapToProps(e, t) : r.mapToProps(e);
      };
      return (
        (r.dependsOnOwnProps = !0),
        (r.mapToProps = function (t, n) {
          (r.mapToProps = e), (r.dependsOnOwnProps = ma(e));
          var o = r(t, n);
          return (
            "function" == typeof o &&
              ((r.mapToProps = o),
              (r.dependsOnOwnProps = ma(o)),
              (o = r(t, n))),
            o
          );
        }),
        r
      );
    };
  }
  var ba = [
    function (e) {
      return "function" == typeof e ? va(e) : void 0;
    },
    function (e) {
      return e
        ? void 0
        : ga(function (e) {
            return { dispatch: e };
          });
    },
    function (e) {
      return e && "object" == typeof e
        ? ga(function (t) {
            return (function (e, t) {
              if ("function" == typeof e) return nr(e, t);
              if ("object" != typeof e || null === e)
                throw new Error(
                  "bindActionCreators expected an object or a function, instead received " +
                    (null === e ? "null" : typeof e) +
                    '. Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?'
                );
              var n = {};
              for (var r in e) {
                var o = e[r];
                "function" == typeof o && (n[r] = nr(o, t));
              }
              return n;
            })(e, t);
          })
        : void 0;
    },
  ];
  var ya = [
    function (e) {
      return "function" == typeof e ? va(e) : void 0;
    },
    function (e) {
      return e
        ? void 0
        : ga(function () {
            return {};
          });
    },
  ];
  function wa(e, t, n) {
    return $o({}, n, {}, e, {}, t);
  }
  var _a = [
    function (e) {
      return "function" == typeof e
        ? (function (e) {
            return function (t, n) {
              n.displayName;
              var r,
                o = n.pure,
                i = n.areMergedPropsEqual,
                a = !1;
              return function (t, n, s) {
                var l = e(t, n, s);
                return a ? (o && i(l, r)) || (r = l) : ((a = !0), (r = l)), r;
              };
            };
          })(e)
        : void 0;
    },
    function (e) {
      return e
        ? void 0
        : function () {
            return wa;
          };
    },
  ];
  function Sa(e, t, n, r) {
    return function (o, i) {
      return n(e(o, i), t(r, i), i);
    };
  }
  function xa(e, t, n, r, o) {
    var i,
      a,
      s,
      l,
      u,
      c = o.areStatesEqual,
      d = o.areOwnPropsEqual,
      f = o.areStatePropsEqual,
      p = !1;
    function h(o, p) {
      var h,
        g,
        m = !d(p, a),
        v = !c(o, i);
      return (
        (i = o),
        (a = p),
        m && v
          ? ((s = e(i, a)),
            t.dependsOnOwnProps && (l = t(r, a)),
            (u = n(s, l, a)))
          : m
          ? (e.dependsOnOwnProps && (s = e(i, a)),
            t.dependsOnOwnProps && (l = t(r, a)),
            (u = n(s, l, a)))
          : v
          ? ((h = e(i, a)), (g = !f(h, s)), (s = h), g && (u = n(s, l, a)), u)
          : u
      );
    }
    return function (o, c) {
      return p
        ? h(o, c)
        : ((s = e((i = o), (a = c))),
          (l = t(r, a)),
          (u = n(s, l, a)),
          (p = !0),
          u);
    };
  }
  function Pa(e, t) {
    var n = t.initMapStateToProps,
      r = t.initMapDispatchToProps,
      o = t.initMergeProps,
      i = Wo(t, [
        "initMapStateToProps",
        "initMapDispatchToProps",
        "initMergeProps",
      ]),
      a = n(e, i),
      s = r(e, i),
      l = o(e, i);
    return (i.pure ? xa : Sa)(a, s, l, e, i);
  }
  function Da(e, t, n) {
    for (var r = t.length - 1; r >= 0; r--) {
      var o = t[r](e);
      if (o) return o;
    }
    return function (t, r) {
      throw new Error(
        "Invalid value of type " +
          typeof e +
          " for " +
          n +
          " argument when connecting component " +
          r.wrappedComponentName +
          "."
      );
    };
  }
  function ka(e, t) {
    return e === t;
  }
  function Ea(e) {
    var t = void 0 === e ? {} : e,
      n = t.connectHOC,
      r = void 0 === n ? fa : n,
      o = t.mapStateToPropsFactories,
      i = void 0 === o ? ya : o,
      a = t.mapDispatchToPropsFactories,
      s = void 0 === a ? ba : a,
      l = t.mergePropsFactories,
      u = void 0 === l ? _a : l,
      c = t.selectorFactory,
      d = void 0 === c ? Pa : c;
    return function (e, t, n, o) {
      void 0 === o && (o = {});
      var a = o,
        l = a.pure,
        c = void 0 === l || l,
        f = a.areStatesEqual,
        p = void 0 === f ? ka : f,
        h = a.areOwnPropsEqual,
        g = void 0 === h ? ha : h,
        m = a.areStatePropsEqual,
        v = void 0 === m ? ha : m,
        b = a.areMergedPropsEqual,
        y = void 0 === b ? ha : b,
        w = Wo(a, [
          "pure",
          "areStatesEqual",
          "areOwnPropsEqual",
          "areStatePropsEqual",
          "areMergedPropsEqual",
        ]),
        _ = Da(e, i, "mapStateToProps"),
        S = Da(t, s, "mapDispatchToProps"),
        x = Da(n, u, "mergeProps");
      return r(
        d,
        $o(
          {
            methodName: "connect",
            getDisplayName: function (e) {
              return "Connect(" + e + ")";
            },
            shouldHandleStateChanges: Boolean(e),
            initMapStateToProps: _,
            initMapDispatchToProps: S,
            initMergeProps: x,
            pure: c,
            areStatesEqual: p,
            areOwnPropsEqual: g,
            areStatePropsEqual: v,
            areMergedPropsEqual: y,
          },
          w
        )
      );
    };
  }
  var Ta = Ea();
  Fo(), Fo();
  Fo();
  var Ia,
    Ca,
    Fa,
    Aa,
    Oa,
    Ma,
    Ra,
    Na,
    Ba,
    Ua,
    ja,
    La,
    qa,
    Ha,
    Va,
    za,
    Ga,
    $a,
    Wa,
    Ya,
    Qa,
    Ja,
    Ka,
    Xa,
    Za,
    es,
    ts,
    ns,
    rs,
    os,
    is,
    as,
    ss,
    ls,
    us,
    cs,
    ds,
    fs,
    ps,
    hs,
    gs,
    ms,
    vs,
    bs,
    ys,
    ws = !1;
  function _s(e, t) {
    var n = e.length;
    e.push(t);
    e: for (;;) {
      var r = (n - 1) >>> 1,
        o = e[r];
      if (!(void 0 !== o && 0 < Ps(o, t))) break e;
      (e[r] = t), (e[n] = o), (n = r);
    }
  }
  function Ss(e) {
    return void 0 === (e = e[0]) ? null : e;
  }
  function xs(e) {
    var t = e[0];
    if (void 0 !== t) {
      var n = e.pop();
      if (n !== t) {
        e[0] = n;
        e: for (var r = 0, o = e.length; r < o; ) {
          var i = 2 * (r + 1) - 1,
            a = e[i],
            s = i + 1,
            l = e[s];
          if (void 0 !== a && 0 > Ps(a, n))
            void 0 !== l && 0 > Ps(l, a)
              ? ((e[r] = l), (e[s] = n), (r = s))
              : ((e[r] = a), (e[i] = n), (r = i));
          else {
            if (!(void 0 !== l && 0 > Ps(l, n))) break e;
            (e[r] = l), (e[s] = n), (r = s);
          }
        }
      }
      return t;
    }
    return null;
  }
  function Ps(e, t) {
    var n = e.sortIndex - t.sortIndex;
    return 0 !== n ? n : e.id - t.id;
  }
  function Ds(e) {
    for (var t = Ss(ts); null !== t; ) {
      if (null === t.callback) xs(ts);
      else {
        if (!(t.startTime <= e)) break;
        xs(ts), (t.sortIndex = t.expirationTime), _s(es, t);
      }
      t = Ss(ts);
    }
  }
  function ks(e) {
    if (((ss = !1), Ds(e), !as))
      if (null !== Ss(es)) (as = !0), Aa(Es);
      else {
        var t = Ss(ts);
        null !== t && Oa(ks, t.startTime - e);
      }
  }
  function Es(e, t) {
    (as = !1), ss && ((ss = !1), Ma()), (is = !0);
    var n = os;
    try {
      for (
        Ds(t), rs = Ss(es);
        null !== rs && (!(rs.expirationTime > t) || (e && !Ra()));

      ) {
        var r = rs.callback;
        if (null !== r) {
          (rs.callback = null), (os = rs.priorityLevel);
          var o = r(rs.expirationTime <= t);
          (t = Ia()),
            "function" == typeof o
              ? (rs.callback = o)
              : rs === Ss(es) && xs(es),
            Ds(t);
        } else xs(es);
        rs = Ss(es);
      }
      if (null !== rs) var i = !0;
      else {
        var a = Ss(ts);
        null !== a && Oa(ks, a.startTime - t), (i = !1);
      }
      return i;
    } finally {
      (rs = null), (os = n), (is = !1);
    }
  }
  function Ts(e) {
    switch (e) {
      case 1:
        return -1;
      case 2:
        return 250;
      case 5:
        return 1073741823;
      case 4:
        return 1e4;
      default:
        return 5e3;
    }
  }
  function Is() {
    return (
      ws ||
        ((ws = !0),
        (Fa = {}),
        "undefined" == typeof window || "function" != typeof MessageChannel
          ? ((Ba = null),
            (Ua = null),
            (ja = function () {
              if (null !== Ba)
                try {
                  var e = Ia();
                  Ba(!0, e), (Ba = null);
                } catch (e) {
                  throw (setTimeout(ja, 0), e);
                }
            }),
            (La = Date.now()),
            (Ia = function () {
              return Date.now() - La;
            }),
            (Fa.unstable_now = Ia),
            (Aa = function (e) {
              null !== Ba
                ? setTimeout(Aa, 0, e)
                : ((Ba = e), setTimeout(ja, 0));
            }),
            (Oa = function (e, t) {
              Ua = setTimeout(e, t);
            }),
            (Ma = function () {
              clearTimeout(Ua);
            }),
            (Ra = function () {
              return !1;
            }),
            (Ca = function () {}),
            (Na = Fa.unstable_forceFrameRate = Ca))
          : ((qa = window.performance),
            (Ha = window.Date),
            (Va = window.setTimeout),
            (za = window.clearTimeout),
            "undefined" != typeof console &&
              ((Ga = window.cancelAnimationFrame),
              "function" != typeof window.requestAnimationFrame &&
                console.error(
                  "This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills"
                ),
              "function" != typeof Ga &&
                console.error(
                  "This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills"
                )),
            "object" == typeof qa && "function" == typeof qa.now
              ? ((Ia = function () {
                  return qa.now();
                }),
                (Fa.unstable_now = Ia))
              : (($a = Ha.now()),
                (Ia = function () {
                  return Ha.now() - $a;
                }),
                (Fa.unstable_now = Ia)),
            (Wa = !1),
            (Ya = null),
            (Qa = -1),
            (Ja = 5),
            (Ka = 0),
            (Ra = function () {
              return Ia() >= Ka;
            }),
            (Na = function () {}),
            (Ca = function (e) {
              0 > e || 125 < e
                ? console.error(
                    "forceFrameRate takes a positive int between 0 and 125, forcing framerates higher than 125 fps is not unsupported"
                  )
                : (Ja = 0 < e ? Math.floor(1e3 / e) : 5);
            }),
            (Fa.unstable_forceFrameRate = Ca),
            (Xa = new MessageChannel()),
            (Za = Xa.port2),
            (Xa.port1.onmessage = function () {
              if (null !== Ya) {
                var e = Ia();
                Ka = e + Ja;
                try {
                  Ya(!0, e) ? Za.postMessage(null) : ((Wa = !1), (Ya = null));
                } catch (e) {
                  throw (Za.postMessage(null), e);
                }
              } else Wa = !1;
            }),
            (Aa = function (e) {
              (Ya = e), Wa || ((Wa = !0), Za.postMessage(null));
            }),
            (Oa = function (e, t) {
              Qa = Va(function () {
                e(Ia());
              }, t);
            }),
            (Ma = function () {
              za(Qa), (Qa = -1);
            })),
        (es = []),
        (ts = []),
        (ns = 1),
        (rs = null),
        (os = 3),
        (is = !1),
        (as = !1),
        (ss = !1),
        (ls = Na),
        5,
        (Fa.unstable_IdlePriority = 5),
        1,
        (Fa.unstable_ImmediatePriority = 1),
        4,
        (Fa.unstable_LowPriority = 4),
        3,
        (Fa.unstable_NormalPriority = 3),
        null,
        (Fa.unstable_Profiling = null),
        2,
        (Fa.unstable_UserBlockingPriority = 2),
        (us = function (e) {
          e.callback = null;
        }),
        (Fa.unstable_cancelCallback = us),
        (cs = function () {
          as || is || ((as = !0), Aa(Es));
        }),
        (Fa.unstable_continueExecution = cs),
        (ds = function () {
          return os;
        }),
        (Fa.unstable_getCurrentPriorityLevel = ds),
        (fs = function () {
          return Ss(es);
        }),
        (Fa.unstable_getFirstCallbackNode = fs),
        (ps = function (e) {
          switch (os) {
            case 1:
            case 2:
            case 3:
              var t = 3;
              break;
            default:
              t = os;
          }
          var n = os;
          os = t;
          try {
            return e();
          } finally {
            os = n;
          }
        }),
        (Fa.unstable_next = ps),
        (hs = function () {}),
        (Fa.unstable_pauseExecution = hs),
        (gs = ls),
        (Fa.unstable_requestPaint = gs),
        (ms = function (e, t) {
          switch (e) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
              break;
            default:
              e = 3;
          }
          var n = os;
          os = e;
          try {
            return t();
          } finally {
            os = n;
          }
        }),
        (Fa.unstable_runWithPriority = ms),
        (vs = function (e, t, n) {
          var r = Ia();
          if ("object" == typeof n && null !== n) {
            var o = n.delay;
            (o = "number" == typeof o && 0 < o ? r + o : r),
              (n = "number" == typeof n.timeout ? n.timeout : Ts(e));
          } else (n = Ts(e)), (o = r);
          return (
            (e = {
              id: ns++,
              callback: t,
              priorityLevel: e,
              startTime: o,
              expirationTime: (n = o + n),
              sortIndex: -1,
            }),
            o > r
              ? ((e.sortIndex = o),
                _s(ts, e),
                null === Ss(es) &&
                  e === Ss(ts) &&
                  (ss ? Ma() : (ss = !0), Oa(ks, o - r)))
              : ((e.sortIndex = n), _s(es, e), as || is || ((as = !0), Aa(Es))),
            e
          );
        }),
        (Fa.unstable_scheduleCallback = vs),
        (bs = function () {
          var e = Ia();
          Ds(e);
          var t = Ss(es);
          return (
            (t !== rs &&
              null !== rs &&
              null !== t &&
              null !== t.callback &&
              t.startTime <= e &&
              t.expirationTime < rs.expirationTime) ||
            Ra()
          );
        }),
        (Fa.unstable_shouldYield = bs),
        (ys = function (e) {
          var t = os;
          return function () {
            var n = os;
            os = t;
            try {
              return e.apply(this, arguments);
            } finally {
              os = n;
            }
          };
        }),
        (Fa.unstable_wrapCallback = ys)),
      Fa
    );
  }
  var Cs,
    Fs = !1;
  function As() {
    return Fs || ((Fs = !0), (Cs = {}), (Cs = Is())), Cs;
  }
  var Os,
    Ms,
    Rs,
    Ns,
    Bs,
    Us,
    js,
    Ls,
    qs,
    Hs,
    Vs,
    zs,
    Gs,
    $s,
    Ws,
    Ys,
    Qs,
    Js,
    Ks,
    Xs,
    Zs,
    el,
    tl,
    nl,
    rl,
    ol,
    il,
    al,
    sl,
    ll,
    ul,
    cl,
    dl,
    fl,
    pl,
    hl,
    gl,
    ml,
    vl,
    bl,
    yl,
    wl,
    _l,
    Sl,
    xl,
    Pl,
    Dl,
    kl,
    El,
    Tl,
    Il,
    Cl,
    Fl,
    Al,
    Ol,
    Ml,
    Rl,
    Nl,
    Bl,
    Ul,
    jl,
    Ll,
    ql,
    Hl,
    Vl,
    zl,
    Gl,
    $l,
    Wl,
    Yl,
    Ql,
    Jl,
    Kl,
    Xl,
    Zl,
    eu,
    tu,
    nu,
    ru,
    ou,
    iu,
    au,
    su,
    lu,
    uu,
    cu,
    du,
    fu,
    pu,
    hu,
    gu,
    mu,
    vu,
    bu,
    yu,
    wu,
    _u,
    Su,
    xu,
    Pu,
    Du,
    ku,
    Eu,
    Tu,
    Iu,
    Cu,
    Fu,
    Au,
    Ou,
    Mu,
    Ru,
    Nu,
    Bu,
    Uu,
    ju,
    Lu,
    qu,
    Hu,
    Vu,
    zu,
    Gu,
    $u,
    Wu,
    Yu,
    Qu,
    Ju,
    Ku,
    Xu,
    Zu,
    ec,
    tc,
    nc,
    rc,
    oc,
    ic,
    ac,
    sc,
    lc,
    uc,
    cc,
    dc,
    fc,
    pc,
    hc,
    gc,
    mc,
    vc,
    bc,
    yc,
    wc,
    _c,
    Sc,
    xc,
    Pc,
    Dc,
    kc,
    Ec,
    Tc,
    Ic,
    Cc,
    Fc,
    Ac,
    Oc,
    Mc,
    Rc,
    Nc,
    Bc,
    Uc,
    jc,
    Lc,
    qc,
    Hc,
    Vc,
    zc,
    Gc,
    $c,
    Wc,
    Yc,
    Qc,
    Jc,
    Kc,
    Xc,
    Zc,
    ed,
    td,
    nd,
    rd,
    od,
    id,
    ad,
    sd,
    ld,
    ud,
    cd,
    dd,
    fd,
    pd,
    hd,
    gd,
    md,
    vd,
    bd,
    yd,
    wd,
    _d,
    Sd,
    xd,
    Pd,
    Dd,
    kd,
    Ed,
    Td,
    Id,
    Cd,
    Fd,
    Ad,
    Od,
    Md,
    Rd,
    Nd,
    Bd,
    Ud,
    jd,
    Ld,
    qd,
    Hd,
    Vd,
    zd,
    Gd,
    $d,
    Wd,
    Yd,
    Qd,
    Jd,
    Kd,
    Xd,
    Zd,
    ef,
    tf,
    nf,
    rf,
    of,
    af,
    sf,
    lf,
    uf,
    cf,
    df,
    ff,
    pf,
    hf,
    gf,
    mf,
    vf,
    bf,
    yf,
    wf,
    _f,
    Sf,
    xf,
    Pf,
    Df,
    kf,
    Ef,
    Tf,
    If,
    Cf = !1;
  function Ff(e) {
    for (
      var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e,
        n = 1;
      n < arguments.length;
      n++
    )
      t += "&args[]=" + encodeURIComponent(arguments[n]);
    return (
      "Minified React error #" +
      e +
      "; visit " +
      t +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function Af(e, t, n, r, o, i, a, s, l) {
    var u = Array.prototype.slice.call(arguments, 3);
    try {
      t.apply(n, u);
    } catch (e) {
      this.onError(e);
    }
  }
  function Of(e, t, n, r, o, i, a, s, l) {
    (Ns = !1), (Bs = null), Af.apply(Ls, arguments);
  }
  function Mf(e, t, n) {
    var r = e.type || "unknown-event";
    (e.currentTarget = Vs(n)),
      (function (e, t, n, r, o, i, a, s, l) {
        if ((Of.apply(this, arguments), Ns)) {
          if (!Ns) throw Error(Ff(198));
          var u = Bs;
          (Ns = !1), (Bs = null), Us || ((Us = !0), (js = u));
        }
      })(r, t, void 0, e),
      (e.currentTarget = null);
  }
  function Rf() {
    if (zs)
      for (var e in Gs) {
        var t = Gs[e],
          n = zs.indexOf(e);
        if (!(-1 < n)) throw Error(Ff(96, e));
        if (!$s[n]) {
          if (!t.extractEvents) throw Error(Ff(97, e));
          for (var r in (($s[n] = t), (n = t.eventTypes))) {
            var o = void 0,
              i = n[r],
              a = t,
              s = r;
            if (Ws.hasOwnProperty(s)) throw Error(Ff(99, s));
            Ws[s] = i;
            var l = i.phasedRegistrationNames;
            if (l) {
              for (o in l) l.hasOwnProperty(o) && Nf(l[o], a, s);
              o = !0;
            } else
              i.registrationName
                ? (Nf(i.registrationName, a, s), (o = !0))
                : (o = !1);
            if (!o) throw Error(Ff(98, r, e));
          }
        }
      }
  }
  function Nf(e, t, n) {
    if (Ys[e]) throw Error(Ff(100, e));
    (Ys[e] = t), (Qs[e] = t.eventTypes[n].dependencies);
  }
  function Bf(e) {
    var t,
      n = !1;
    for (t in e)
      if (e.hasOwnProperty(t)) {
        var r = e[t];
        if (!Gs.hasOwnProperty(t) || Gs[t] !== r) {
          if (Gs[t]) throw Error(Ff(102, t));
          (Gs[t] = r), (n = !0);
        }
      }
    n && Rf();
  }
  function Uf(e) {
    if ((e = Hs(e))) {
      if ("function" != typeof Ks) throw Error(Ff(280));
      var t = e.stateNode;
      t && ((t = qs(t)), Ks(e.stateNode, e.type, t));
    }
  }
  function jf(e) {
    Xs ? (Zs ? Zs.push(e) : (Zs = [e])) : (Xs = e);
  }
  function Lf() {
    if (Xs) {
      var e = Xs,
        t = Zs;
      if (((Zs = Xs = null), Uf(e), t)) for (e = 0; e < t.length; e++) Uf(t[e]);
    }
  }
  function qf(e, t) {
    return e(t);
  }
  function Hf(e, t, n, r, o) {
    return e(t, n, r, o);
  }
  function Vf() {}
  function zf() {
    (null === Xs && null === Zs) || (Vf(), Lf());
  }
  function Gf(e, t, n) {
    if (nl) return e(t, n);
    nl = !0;
    try {
      return el(e, t, n);
    } finally {
      (nl = !1), zf();
    }
  }
  function $f(e, t, n, r, o, i) {
    (this.acceptsBooleans = 2 === t || 3 === t || 4 === t),
      (this.attributeName = r),
      (this.attributeNamespace = o),
      (this.mustUseProperty = n),
      (this.propertyName = e),
      (this.type = t),
      (this.sanitizeURL = i);
  }
  function Wf(e) {
    return e[1].toUpperCase();
  }
  function Yf(e, t, n, r) {
    var o = sl.hasOwnProperty(t) ? sl[t] : null;
    (null !== o
      ? 0 === o.type
      : !r &&
        2 < t.length &&
        ("o" === t[0] || "O" === t[0]) &&
        ("n" === t[1] || "N" === t[1])) ||
      ((function (e, t, n, r) {
        if (
          null == t ||
          (function (e, t, n, r) {
            if (null !== n && 0 === n.type) return !1;
            switch (typeof t) {
              case "function":
              case "symbol":
                return !0;
              case "boolean":
                return (
                  !r &&
                  (null !== n
                    ? !n.acceptsBooleans
                    : "data-" !== (e = e.toLowerCase().slice(0, 5)) &&
                      "aria-" !== e)
                );
              default:
                return !1;
            }
          })(e, t, n, r)
        )
          return !0;
        if (r) return !1;
        if (null !== n)
          switch (n.type) {
            case 3:
              return !t;
            case 4:
              return !1 === t;
            case 5:
              return isNaN(t);
            case 6:
              return isNaN(t) || 1 > t;
          }
        return !1;
      })(t, n, o, r) && (n = null),
      r || null === o
        ? (function (e) {
            return (
              !!ol.call(al, e) ||
              (!ol.call(il, e) &&
                (rl.test(e) ? (al[e] = !0) : ((il[e] = !0), !1)))
            );
          })(t) &&
          (null === n ? e.removeAttribute(t) : e.setAttribute(t, "" + n))
        : o.mustUseProperty
        ? (e[o.propertyName] = null === n ? 3 !== o.type && "" : n)
        : ((t = o.attributeName),
          (r = o.attributeNamespace),
          null === n
            ? e.removeAttribute(t)
            : ((n = 3 === (o = o.type) || (4 === o && !0 === n) ? "" : "" + n),
              r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
  }
  function Qf(e) {
    return null === e || "object" != typeof e
      ? null
      : "function" == typeof (e = (kl && e[kl]) || e["@@iterator"])
      ? e
      : null;
  }
  function Jf(e) {
    if (null == e) return null;
    if ("function" == typeof e) return e.displayName || e.name || null;
    if ("string" == typeof e) return e;
    switch (e) {
      case hl:
        return "Fragment";
      case pl:
        return "Portal";
      case ml:
        return "Profiler";
      case gl:
        return "StrictMode";
      case _l:
        return "Suspense";
      case Sl:
        return "SuspenseList";
    }
    if ("object" == typeof e)
      switch (e.$$typeof) {
        case bl:
          return "Context.Consumer";
        case vl:
          return "Context.Provider";
        case wl:
          var t = e.render;
          return (
            (t = t.displayName || t.name || ""),
            e.displayName || ("" !== t ? "ForwardRef(" + t + ")" : "ForwardRef")
          );
        case xl:
          return Jf(e.type);
        case Dl:
          return Jf(e.render);
        case Pl:
          if ((e = 1 === e._status ? e._result : null)) return Jf(e);
      }
    return null;
  }
  function Kf(e) {
    var t = "";
    do {
      e: switch (e.tag) {
        case 3:
        case 4:
        case 6:
        case 7:
        case 10:
        case 9:
          var n = "";
          break e;
        default:
          var r = e._debugOwner,
            o = e._debugSource,
            i = Jf(e.type);
          (n = null),
            r && (n = Jf(r.type)),
            (r = i),
            (i = ""),
            o
              ? (i =
                  " (at " +
                  o.fileName.replace(cl, "") +
                  ":" +
                  o.lineNumber +
                  ")")
              : n && (i = " (created by " + n + ")"),
            (n = "\n    in " + (r || "Unknown") + i);
      }
      (t += n), (e = e.return);
    } while (e);
    return t;
  }
  function Xf(e) {
    switch (typeof e) {
      case "boolean":
      case "number":
      case "object":
      case "string":
      case "undefined":
        return e;
      default:
        return "";
    }
  }
  function Zf(e) {
    var t = e.type;
    return (
      (e = e.nodeName) &&
      "input" === e.toLowerCase() &&
      ("checkbox" === t || "radio" === t)
    );
  }
  function ep(e) {
    e._valueTracker ||
      (e._valueTracker = (function (e) {
        var t = Zf(e) ? "checked" : "value",
          n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
          r = "" + e[t];
        if (
          !e.hasOwnProperty(t) &&
          void 0 !== n &&
          "function" == typeof n.get &&
          "function" == typeof n.set
        ) {
          var o = n.get,
            i = n.set;
          return (
            Object.defineProperty(e, t, {
              configurable: !0,
              get: function () {
                return o.call(this);
              },
              set: function (e) {
                (r = "" + e), i.call(this, e);
              },
            }),
            Object.defineProperty(e, t, { enumerable: n.enumerable }),
            {
              getValue: function () {
                return r;
              },
              setValue: function (e) {
                r = "" + e;
              },
              stopTracking: function () {
                (e._valueTracker = null), delete e[t];
              },
            }
          );
        }
      })(e));
  }
  function tp(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var n = t.getValue(),
      r = "";
    return (
      e && (r = Zf(e) ? (e.checked ? "true" : "false") : e.value),
      (e = r) !== n && (t.setValue(e), !0)
    );
  }
  function np(e, t) {
    var n = t.checked;
    return Rs({}, t, {
      defaultChecked: void 0,
      defaultValue: void 0,
      value: void 0,
      checked: null != n ? n : e._wrapperState.initialChecked,
    });
  }
  function rp(e, t) {
    var n = null == t.defaultValue ? "" : t.defaultValue,
      r = null != t.checked ? t.checked : t.defaultChecked;
    (n = Xf(null != t.value ? t.value : n)),
      (e._wrapperState = {
        initialChecked: r,
        initialValue: n,
        controlled:
          "checkbox" === t.type || "radio" === t.type
            ? null != t.checked
            : null != t.value,
      });
  }
  function op(e, t) {
    null != (t = t.checked) && Yf(e, "checked", t, !1);
  }
  function ip(e, t) {
    op(e, t);
    var n = Xf(t.value),
      r = t.type;
    if (null != n)
      "number" === r
        ? ((0 === n && "" === e.value) || e.value != n) && (e.value = "" + n)
        : e.value !== "" + n && (e.value = "" + n);
    else if ("submit" === r || "reset" === r)
      return void e.removeAttribute("value");
    t.hasOwnProperty("value")
      ? sp(e, t.type, n)
      : t.hasOwnProperty("defaultValue") && sp(e, t.type, Xf(t.defaultValue)),
      null == t.checked &&
        null != t.defaultChecked &&
        (e.defaultChecked = !!t.defaultChecked);
  }
  function ap(e, t, n) {
    if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
      var r = t.type;
      if (
        !(
          ("submit" !== r && "reset" !== r) ||
          (void 0 !== t.value && null !== t.value)
        )
      )
        return;
      (t = "" + e._wrapperState.initialValue),
        n || t === e.value || (e.value = t),
        (e.defaultValue = t);
    }
    "" !== (n = e.name) && (e.name = ""),
      (e.defaultChecked = !!e._wrapperState.initialChecked),
      "" !== n && (e.name = n);
  }
  function sp(e, t, n) {
    ("number" === t && e.ownerDocument.activeElement === e) ||
      (null == n
        ? (e.defaultValue = "" + e._wrapperState.initialValue)
        : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
  }
  function lp(e, t) {
    return (
      (e = Rs({ children: void 0 }, t)),
      (t = (function (e) {
        var t = "";
        return (
          Ms.Children.forEach(e, function (e) {
            null != e && (t += e);
          }),
          t
        );
      })(t.children)) && (e.children = t),
      e
    );
  }
  function up(e, t, n, r) {
    if (((e = e.options), t)) {
      t = {};
      for (var o = 0; o < n.length; o++) t["$" + n[o]] = !0;
      for (n = 0; n < e.length; n++)
        (o = t.hasOwnProperty("$" + e[n].value)),
          e[n].selected !== o && (e[n].selected = o),
          o && r && (e[n].defaultSelected = !0);
    } else {
      for (n = "" + Xf(n), t = null, o = 0; o < e.length; o++) {
        if (e[o].value === n)
          return (e[o].selected = !0), void (r && (e[o].defaultSelected = !0));
        null !== t || e[o].disabled || (t = e[o]);
      }
      null !== t && (t.selected = !0);
    }
  }
  function cp(e, t) {
    if (null != t.dangerouslySetInnerHTML) throw Error(Ff(91));
    return Rs({}, t, {
      value: void 0,
      defaultValue: void 0,
      children: "" + e._wrapperState.initialValue,
    });
  }
  function dp(e, t) {
    var n = t.value;
    if (null == n) {
      if (((n = t.children), (t = t.defaultValue), null != n)) {
        if (null != t) throw Error(Ff(92));
        if (Array.isArray(n)) {
          if (!(1 >= n.length)) throw Error(Ff(93));
          n = n[0];
        }
        t = n;
      }
      null == t && (t = ""), (n = t);
    }
    e._wrapperState = { initialValue: Xf(n) };
  }
  function fp(e, t) {
    var n = Xf(t.value),
      r = Xf(t.defaultValue);
    null != n &&
      ((n = "" + n) !== e.value && (e.value = n),
      null == t.defaultValue && e.defaultValue !== n && (e.defaultValue = n)),
      null != r && (e.defaultValue = "" + r);
  }
  function pp(e) {
    var t = e.textContent;
    t === e._wrapperState.initialValue &&
      "" !== t &&
      null !== t &&
      (e.value = t);
  }
  function hp(e) {
    switch (e) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function gp(e, t) {
    return null == e || "http://www.w3.org/1999/xhtml" === e
      ? hp(t)
      : "http://www.w3.org/2000/svg" === e && "foreignObject" === t
      ? "http://www.w3.org/1999/xhtml"
      : e;
  }
  function mp(e, t) {
    if (t) {
      var n = e.firstChild;
      if (n && n === e.lastChild && 3 === n.nodeType)
        return void (n.nodeValue = t);
    }
    e.textContent = t;
  }
  function vp(e, t) {
    var n = {};
    return (
      (n[e.toLowerCase()] = t.toLowerCase()),
      (n["Webkit" + e] = "webkit" + t),
      (n["Moz" + e] = "moz" + t),
      n
    );
  }
  function bp(e) {
    if (Fl[e]) return Fl[e];
    if (!Cl[e]) return e;
    var t,
      n = Cl[e];
    for (t in n) if (n.hasOwnProperty(t) && t in Al) return (Fl[e] = n[t]);
    return e;
  }
  function yp(e) {
    var t = Ul.get(e);
    return void 0 === t && ((t = new Map()), Ul.set(e, t)), t;
  }
  function wp(e) {
    var t = e,
      n = e;
    if (e.alternate) for (; t.return; ) t = t.return;
    else {
      e = t;
      do {
        0 != (1026 & (t = e).effectTag) && (n = t.return), (e = t.return);
      } while (e);
    }
    return 3 === t.tag ? n : null;
  }
  function _p(e) {
    if (13 === e.tag) {
      var t = e.memoizedState;
      if (
        (null === t && null !== (e = e.alternate) && (t = e.memoizedState),
        null !== t)
      )
        return t.dehydrated;
    }
    return null;
  }
  function Sp(e) {
    if (wp(e) !== e) throw Error(Ff(188));
  }
  function xp(e) {
    if (
      !(e = (function (e) {
        var t = e.alternate;
        if (!t) {
          if (null === (t = wp(e))) throw Error(Ff(188));
          return t !== e ? null : e;
        }
        for (var n = e, r = t; ; ) {
          var o = n.return;
          if (null === o) break;
          var i = o.alternate;
          if (null === i) {
            if (null !== (r = o.return)) {
              n = r;
              continue;
            }
            break;
          }
          if (o.child === i.child) {
            for (i = o.child; i; ) {
              if (i === n) return Sp(o), e;
              if (i === r) return Sp(o), t;
              i = i.sibling;
            }
            throw Error(Ff(188));
          }
          if (n.return !== r.return) (n = o), (r = i);
          else {
            for (var a = !1, s = o.child; s; ) {
              if (s === n) {
                (a = !0), (n = o), (r = i);
                break;
              }
              if (s === r) {
                (a = !0), (r = o), (n = i);
                break;
              }
              s = s.sibling;
            }
            if (!a) {
              for (s = i.child; s; ) {
                if (s === n) {
                  (a = !0), (n = i), (r = o);
                  break;
                }
                if (s === r) {
                  (a = !0), (r = i), (n = o);
                  break;
                }
                s = s.sibling;
              }
              if (!a) throw Error(Ff(189));
            }
          }
          if (n.alternate !== r) throw Error(Ff(190));
        }
        if (3 !== n.tag) throw Error(Ff(188));
        return n.stateNode.current === n ? e : t;
      })(e))
    )
      return null;
    for (var t = e; ; ) {
      if (5 === t.tag || 6 === t.tag) return t;
      if (t.child) (t.child.return = t), (t = t.child);
      else {
        if (t === e) break;
        for (; !t.sibling; ) {
          if (!t.return || t.return === e) return null;
          t = t.return;
        }
        (t.sibling.return = t.return), (t = t.sibling);
      }
    }
    return null;
  }
  function Pp(e, t) {
    if (null == t) throw Error(Ff(30));
    return null == e
      ? t
      : Array.isArray(e)
      ? Array.isArray(t)
        ? (e.push.apply(e, t), e)
        : (e.push(t), e)
      : Array.isArray(t)
      ? [e].concat(t)
      : [e, t];
  }
  function Dp(e, t, n) {
    Array.isArray(e) ? e.forEach(t, n) : e && t.call(n, e);
  }
  function kp(e) {
    if (e) {
      var t = e._dispatchListeners,
        n = e._dispatchInstances;
      if (Array.isArray(t))
        for (var r = 0; r < t.length && !e.isPropagationStopped(); r++)
          Mf(e, t[r], n[r]);
      else t && Mf(e, t, n);
      (e._dispatchListeners = null),
        (e._dispatchInstances = null),
        e.isPersistent() || e.constructor.release(e);
    }
  }
  function Ep(e) {
    if ((null !== e && (jl = Pp(jl, e)), (e = jl), (jl = null), e)) {
      if ((Dp(e, kp), jl)) throw Error(Ff(95));
      if (Us) throw ((e = js), (Us = !1), (js = null), e);
    }
  }
  function Tp(e) {
    return (
      (e = e.target || e.srcElement || window).correspondingUseElement &&
        (e = e.correspondingUseElement),
      3 === e.nodeType ? e.parentNode : e
    );
  }
  function Ip(e) {
    if (!Js) return !1;
    var t = (e = "on" + e) in document;
    return (
      t ||
        ((t = document.createElement("div")).setAttribute(e, "return;"),
        (t = "function" == typeof t[e])),
      t
    );
  }
  function Cp(e) {
    (e.topLevelType = null),
      (e.nativeEvent = null),
      (e.targetInst = null),
      (e.ancestors.length = 0),
      10 > Ll.length && Ll.push(e);
  }
  function Fp(e, t, n, r) {
    if (Ll.length) {
      var o = Ll.pop();
      return (
        (o.topLevelType = e),
        (o.eventSystemFlags = r),
        (o.nativeEvent = t),
        (o.targetInst = n),
        o
      );
    }
    return {
      topLevelType: e,
      eventSystemFlags: r,
      nativeEvent: t,
      targetInst: n,
      ancestors: [],
    };
  }
  function Ap(e) {
    var t = e.targetInst,
      n = t;
    do {
      if (!n) {
        e.ancestors.push(n);
        break;
      }
      var r = n;
      if (3 === r.tag) r = r.stateNode.containerInfo;
      else {
        for (; r.return; ) r = r.return;
        r = 3 !== r.tag ? null : r.stateNode.containerInfo;
      }
      if (!r) break;
      (5 !== (t = n.tag) && 6 !== t) || e.ancestors.push(n), (n = fh(r));
    } while (n);
    for (n = 0; n < e.ancestors.length; n++) {
      t = e.ancestors[n];
      var o = Tp(e.nativeEvent);
      r = e.topLevelType;
      var i = e.nativeEvent,
        a = e.eventSystemFlags;
      0 === n && (a |= 64);
      for (var s = null, l = 0; l < $s.length; l++) {
        var u = $s[l];
        u && (u = u.extractEvents(r, t, i, o, a)) && (s = Pp(s, u));
      }
      Ep(s);
    }
  }
  function Op(e, t, n) {
    if (!n.has(e)) {
      switch (e) {
        case "scroll":
          Gp(t, "scroll", !0);
          break;
        case "focus":
        case "blur":
          Gp(t, "focus", !0),
            Gp(t, "blur", !0),
            n.set("blur", null),
            n.set("focus", null);
          break;
        case "cancel":
        case "close":
          Ip(e) && Gp(t, e, !0);
          break;
        case "invalid":
        case "submit":
        case "reset":
          break;
        default:
          -1 === Bl.indexOf(e) && zp(e, t);
      }
      n.set(e, null);
    }
  }
  function Mp(e, t, n, r, o) {
    return {
      blockedOn: e,
      topLevelType: t,
      eventSystemFlags: 32 | n,
      nativeEvent: o,
      container: r,
    };
  }
  function Rp(e, t) {
    switch (e) {
      case "focus":
      case "blur":
        $l = null;
        break;
      case "dragenter":
      case "dragleave":
        Wl = null;
        break;
      case "mouseover":
      case "mouseout":
        Yl = null;
        break;
      case "pointerover":
      case "pointerout":
        Ql.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Jl.delete(t.pointerId);
    }
  }
  function Np(e, t, n, r, o, i) {
    return null === e || e.nativeEvent !== i
      ? ((e = Mp(t, n, r, o, i)),
        null !== t && null !== (t = ph(t)) && Hl(t),
        e)
      : ((e.eventSystemFlags |= r), e);
  }
  function Bp(e) {
    var t = fh(e.target);
    if (null !== t) {
      var n = wp(t);
      if (null !== n)
        if (13 === (t = n.tag)) {
          if (null !== (t = _p(n)))
            return (
              (e.blockedOn = t),
              void As().unstable_runWithPriority(e.priority, function () {
                Vl(n);
              })
            );
        } else if (3 === t && n.stateNode.hydrate)
          return void (e.blockedOn =
            3 === n.tag ? n.stateNode.containerInfo : null);
    }
    e.blockedOn = null;
  }
  function Up(e) {
    if (null !== e.blockedOn) return !1;
    var t = Qp(e.topLevelType, e.eventSystemFlags, e.container, e.nativeEvent);
    if (null !== t) {
      var n = ph(t);
      return null !== n && Hl(n), (e.blockedOn = t), !1;
    }
    return !0;
  }
  function jp(e, t, n) {
    Up(e) && n.delete(t);
  }
  function Lp() {
    for (zl = !1; 0 < Gl.length; ) {
      var e = Gl[0];
      if (null !== e.blockedOn) {
        null !== (e = ph(e.blockedOn)) && ql(e);
        break;
      }
      var t = Qp(
        e.topLevelType,
        e.eventSystemFlags,
        e.container,
        e.nativeEvent
      );
      null !== t ? (e.blockedOn = t) : Gl.shift();
    }
    null !== $l && Up($l) && ($l = null),
      null !== Wl && Up(Wl) && (Wl = null),
      null !== Yl && Up(Yl) && (Yl = null),
      Ql.forEach(jp),
      Jl.forEach(jp);
  }
  function qp(e, t) {
    e.blockedOn === t &&
      ((e.blockedOn = null),
      zl ||
        ((zl = !0),
        As().unstable_scheduleCallback(As().unstable_NormalPriority, Lp)));
  }
  function Hp(e) {
    function t(t) {
      return qp(t, e);
    }
    if (0 < Gl.length) {
      qp(Gl[0], e);
      for (var n = 1; n < Gl.length; n++) {
        var r = Gl[n];
        r.blockedOn === e && (r.blockedOn = null);
      }
    }
    for (
      null !== $l && qp($l, e),
        null !== Wl && qp(Wl, e),
        null !== Yl && qp(Yl, e),
        Ql.forEach(t),
        Jl.forEach(t),
        n = 0;
      n < Kl.length;
      n++
    )
      (r = Kl[n]).blockedOn === e && (r.blockedOn = null);
    for (; 0 < Kl.length && null === (n = Kl[0]).blockedOn; )
      Bp(n), null === n.blockedOn && Kl.shift();
  }
  function Vp(e, t) {
    for (var n = 0; n < e.length; n += 2) {
      var r = e[n],
        o = e[n + 1],
        i = "on" + (o[0].toUpperCase() + o.slice(1));
      (i = {
        phasedRegistrationNames: { bubbled: i, captured: i + "Capture" },
        dependencies: [r],
        eventPriority: t,
      }),
        nu.set(r, t),
        tu.set(r, i),
        (eu[o] = i);
    }
  }
  function zp(e, t) {
    Gp(t, e, !1);
  }
  function Gp(e, t, n) {
    var r = nu.get(t);
    switch (void 0 === r ? 2 : r) {
      case 0:
        r = $p.bind(null, t, 1, e);
        break;
      case 1:
        r = Wp.bind(null, t, 1, e);
        break;
      default:
        r = Yp.bind(null, t, 1, e);
    }
    n ? e.addEventListener(t, r, !0) : e.addEventListener(t, r, !1);
  }
  function $p(e, t, n, r) {
    tl || Vf();
    var o = Yp,
      i = tl;
    tl = !0;
    try {
      Hf(o, e, t, n, r);
    } finally {
      (tl = i) || zf();
    }
  }
  function Wp(e, t, n, r) {
    su(au, Yp.bind(null, e, t, n, r));
  }
  function Yp(e, t, n, r) {
    if (lu)
      if (0 < Gl.length && -1 < Xl.indexOf(e))
        (e = Mp(null, e, t, n, r)), Gl.push(e);
      else {
        var o = Qp(e, t, n, r);
        if (null === o) Rp(e, r);
        else if (-1 < Xl.indexOf(e)) (e = Mp(o, e, t, n, r)), Gl.push(e);
        else if (
          !(function (e, t, n, r, o) {
            switch (t) {
              case "focus":
                return ($l = Np($l, e, t, n, r, o)), !0;
              case "dragenter":
                return (Wl = Np(Wl, e, t, n, r, o)), !0;
              case "mouseover":
                return (Yl = Np(Yl, e, t, n, r, o)), !0;
              case "pointerover":
                var i = o.pointerId;
                return Ql.set(i, Np(Ql.get(i) || null, e, t, n, r, o)), !0;
              case "gotpointercapture":
                return (
                  (i = o.pointerId),
                  Jl.set(i, Np(Jl.get(i) || null, e, t, n, r, o)),
                  !0
                );
            }
            return !1;
          })(o, e, t, n, r)
        ) {
          Rp(e, r), (e = Fp(e, r, null, t));
          try {
            Gf(Ap, e);
          } finally {
            Cp(e);
          }
        }
      }
  }
  function Qp(e, t, n, r) {
    if (null !== (n = fh((n = Tp(r))))) {
      var o = wp(n);
      if (null === o) n = null;
      else {
        var i = o.tag;
        if (13 === i) {
          if (null !== (n = _p(o))) return n;
          n = null;
        } else if (3 === i) {
          if (o.stateNode.hydrate)
            return 3 === o.tag ? o.stateNode.containerInfo : null;
          n = null;
        } else o !== n && (n = null);
      }
    }
    e = Fp(e, r, n, t);
    try {
      Gf(Ap, e);
    } finally {
      Cp(e);
    }
    return null;
  }
  function Jp(e, t, n) {
    return null == t || "boolean" == typeof t || "" === t
      ? ""
      : n || "number" != typeof t || 0 === t || (uu.hasOwnProperty(e) && uu[e])
      ? ("" + t).trim()
      : t + "px";
  }
  function Kp(e, t) {
    for (var n in ((e = e.style), t))
      if (t.hasOwnProperty(n)) {
        var r = 0 === n.indexOf("--"),
          o = Jp(n, t[n], r);
        "float" === n && (n = "cssFloat"), r ? e.setProperty(n, o) : (e[n] = o);
      }
  }
  function Xp(e, t) {
    if (t) {
      if (du[e] && (null != t.children || null != t.dangerouslySetInnerHTML))
        throw Error(Ff(137, e, ""));
      if (null != t.dangerouslySetInnerHTML) {
        if (null != t.children) throw Error(Ff(60));
        if (
          "object" != typeof t.dangerouslySetInnerHTML ||
          !("__html" in t.dangerouslySetInnerHTML)
        )
          throw Error(Ff(61));
      }
      if (null != t.style && "object" != typeof t.style)
        throw Error(Ff(62, ""));
    }
  }
  function Zp(e, t) {
    if (-1 === e.indexOf("-")) return "string" == typeof t.is;
    switch (e) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  function eh(e, t) {
    var n = yp(
      (e = 9 === e.nodeType || 11 === e.nodeType ? e : e.ownerDocument)
    );
    t = Qs[t];
    for (var r = 0; r < t.length; r++) Op(t[r], e, n);
  }
  function th() {}
  function nh(e) {
    if (
      void 0 === (e = e || ("undefined" != typeof document ? document : void 0))
    )
      return null;
    try {
      return e.activeElement || e.body;
    } catch (t) {
      return e.body;
    }
  }
  function rh(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function oh(e, t) {
    var n,
      r = rh(e);
    for (e = 0; r; ) {
      if (3 === r.nodeType) {
        if (((n = e + r.textContent.length), e <= t && n >= t))
          return { node: r, offset: t - e };
        e = n;
      }
      e: {
        for (; r; ) {
          if (r.nextSibling) {
            r = r.nextSibling;
            break e;
          }
          r = r.parentNode;
        }
        r = void 0;
      }
      r = rh(r);
    }
  }
  function ih(e, t) {
    return (
      !(!e || !t) &&
      (e === t ||
        ((!e || 3 !== e.nodeType) &&
          (t && 3 === t.nodeType
            ? ih(e, t.parentNode)
            : "contains" in e
            ? e.contains(t)
            : !!e.compareDocumentPosition &&
              !!(16 & e.compareDocumentPosition(t)))))
    );
  }
  function ah() {
    for (var e = window, t = nh(); t instanceof e.HTMLIFrameElement; ) {
      try {
        var n = "string" == typeof t.contentWindow.location.href;
      } catch (e) {
        n = !1;
      }
      if (!n) break;
      t = nh((e = t.contentWindow).document);
    }
    return t;
  }
  function sh(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return (
      t &&
      (("input" === t &&
        ("text" === e.type ||
          "search" === e.type ||
          "tel" === e.type ||
          "url" === e.type ||
          "password" === e.type)) ||
        "textarea" === t ||
        "true" === e.contentEditable)
    );
  }
  function lh(e, t) {
    switch (e) {
      case "button":
      case "input":
      case "select":
      case "textarea":
        return !!t.autoFocus;
    }
    return !1;
  }
  function uh(e, t) {
    return (
      "textarea" === e ||
      "option" === e ||
      "noscript" === e ||
      "string" == typeof t.children ||
      "number" == typeof t.children ||
      ("object" == typeof t.dangerouslySetInnerHTML &&
        null !== t.dangerouslySetInnerHTML &&
        null != t.dangerouslySetInnerHTML.__html)
    );
  }
  function ch(e) {
    for (; null != e; e = e.nextSibling) {
      var t = e.nodeType;
      if (1 === t || 3 === t) break;
    }
    return e;
  }
  function dh(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
      if (8 === e.nodeType) {
        var n = e.data;
        if (n === pu || n === mu || n === gu) {
          if (0 === t) return e;
          t--;
        } else n === hu && t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  function fh(e) {
    var t = e[Su];
    if (t) return t;
    for (var n = e.parentNode; n; ) {
      if ((t = n[Pu] || n[Su])) {
        if (
          ((n = t.alternate),
          null !== t.child || (null !== n && null !== n.child))
        )
          for (e = dh(e); null !== e; ) {
            if ((n = e[Su])) return n;
            e = dh(e);
          }
        return t;
      }
      n = (e = n).parentNode;
    }
    return null;
  }
  function ph(e) {
    return !(e = e[Su] || e[Pu]) ||
      (5 !== e.tag && 6 !== e.tag && 13 !== e.tag && 3 !== e.tag)
      ? null
      : e;
  }
  function hh(e) {
    if (5 === e.tag || 6 === e.tag) return e.stateNode;
    throw Error(Ff(33));
  }
  function gh(e) {
    return e[xu] || null;
  }
  function mh(e) {
    do {
      e = e.return;
    } while (e && 5 !== e.tag);
    return e || null;
  }
  function vh(e, t) {
    var n = e.stateNode;
    if (!n) return null;
    var r = qs(n);
    if (!r) return null;
    n = r[t];
    e: switch (t) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (r = !r.disabled) ||
          (r = !(
            "button" === (e = e.type) ||
            "input" === e ||
            "select" === e ||
            "textarea" === e
          )),
          (e = !r);
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (n && "function" != typeof n) throw Error(Ff(231, t, typeof n));
    return n;
  }
  function bh(e, t, n) {
    (t = vh(e, n.dispatchConfig.phasedRegistrationNames[t])) &&
      ((n._dispatchListeners = Pp(n._dispatchListeners, t)),
      (n._dispatchInstances = Pp(n._dispatchInstances, e)));
  }
  function yh(e) {
    if (e && e.dispatchConfig.phasedRegistrationNames) {
      for (var t = e._targetInst, n = []; t; ) n.push(t), (t = mh(t));
      for (t = n.length; 0 < t--; ) bh(n[t], "captured", e);
      for (t = 0; t < n.length; t++) bh(n[t], "bubbled", e);
    }
  }
  function wh(e, t, n) {
    e &&
      n &&
      n.dispatchConfig.registrationName &&
      (t = vh(e, n.dispatchConfig.registrationName)) &&
      ((n._dispatchListeners = Pp(n._dispatchListeners, t)),
      (n._dispatchInstances = Pp(n._dispatchInstances, e)));
  }
  function _h(e) {
    e && e.dispatchConfig.registrationName && wh(e._targetInst, null, e);
  }
  function Sh(e) {
    Dp(e, yh);
  }
  function xh() {
    if (Eu) return Eu;
    var e,
      t,
      n = ku,
      r = n.length,
      o = "value" in Du ? Du.value : Du.textContent,
      i = o.length;
    for (e = 0; e < r && n[e] === o[e]; e++);
    var a = r - e;
    for (t = 1; t <= a && n[r - t] === o[i - t]; t++);
    return (Eu = o.slice(e, 1 < t ? 1 - t : void 0));
  }
  function Ph() {
    return !0;
  }
  function Dh() {
    return !1;
  }
  function kh(e, t, n, r) {
    for (var o in ((this.dispatchConfig = e),
    (this._targetInst = t),
    (this.nativeEvent = n),
    (e = this.constructor.Interface)))
      e.hasOwnProperty(o) &&
        ((t = e[o])
          ? (this[o] = t(n))
          : "target" === o
          ? (this.target = r)
          : (this[o] = n[o]));
    return (
      (this.isDefaultPrevented = (
        null != n.defaultPrevented ? n.defaultPrevented : !1 === n.returnValue
      )
        ? Ph
        : Dh),
      (this.isPropagationStopped = Dh),
      this
    );
  }
  function Eh(e, t, n, r) {
    if (this.eventPool.length) {
      var o = this.eventPool.pop();
      return this.call(o, e, t, n, r), o;
    }
    return new this(e, t, n, r);
  }
  function Th(e) {
    if (!(e instanceof this)) throw Error(Ff(279));
    e.destructor(), 10 > this.eventPool.length && this.eventPool.push(e);
  }
  function Ih(e) {
    (e.eventPool = []), (e.getPooled = Eh), (e.release = Th);
  }
  function Ch(e, t) {
    switch (e) {
      case "keyup":
        return -1 !== Cu.indexOf(t.keyCode);
      case "keydown":
        return 229 !== t.keyCode;
      case "keypress":
      case "mousedown":
      case "blur":
        return !0;
      default:
        return !1;
    }
  }
  function Fh(e) {
    return "object" == typeof (e = e.detail) && "data" in e ? e.data : null;
  }
  function Ah(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return "input" === t ? !!Lu[e.type] : "textarea" === t;
  }
  function Oh(e, t, n) {
    return (
      ((e = kh.getPooled(qu.change, e, t, n)).type = "change"), jf(n), Sh(e), e
    );
  }
  function Mh(e) {
    Ep(e);
  }
  function Rh(e) {
    if (tp(hh(e))) return e;
  }
  function Nh(e, t) {
    if ("change" === e) return t;
  }
  function Bh() {
    Hu && (Hu.detachEvent("onpropertychange", Uh), (Vu = Hu = null));
  }
  function Uh(e) {
    if ("value" === e.propertyName && Rh(Vu))
      if (((e = Oh(Vu, e, Tp(e))), tl)) Ep(e);
      else {
        tl = !0;
        try {
          qf(Mh, e);
        } finally {
          (tl = !1), zf();
        }
      }
  }
  function jh(e, t, n) {
    "focus" === e
      ? (Bh(), (Vu = n), (Hu = t).attachEvent("onpropertychange", Uh))
      : "blur" === e && Bh();
  }
  function Lh(e) {
    if ("selectionchange" === e || "keyup" === e || "keydown" === e)
      return Rh(Vu);
  }
  function qh(e, t) {
    if ("click" === e) return Rh(t);
  }
  function Hh(e, t) {
    if ("input" === e || "change" === e) return Rh(t);
  }
  function Vh(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : !!(e = Wu[e]) && !!t[e];
  }
  function zh() {
    return Vh;
  }
  function Gh(e, t) {
    return (e === t && (0 !== e || 1 / e == 1 / t)) || (e != e && t != t);
  }
  function $h(e, t) {
    if (nc(e, t)) return !0;
    if (
      "object" != typeof e ||
      null === e ||
      "object" != typeof t ||
      null === t
    )
      return !1;
    var n = Object.keys(e),
      r = Object.keys(t);
    if (n.length !== r.length) return !1;
    for (r = 0; r < n.length; r++)
      if (!rc.call(t, n[r]) || !nc(e[n[r]], t[n[r]])) return !1;
    return !0;
  }
  function Wh(e, t) {
    var n =
      t.window === t ? t.document : 9 === t.nodeType ? t : t.ownerDocument;
    return uc || null == ac || ac !== nh(n)
      ? null
      : ("selectionStart" in (n = ac) && sh(n)
          ? (n = { start: n.selectionStart, end: n.selectionEnd })
          : (n = {
              anchorNode: (n = (
                (n.ownerDocument && n.ownerDocument.defaultView) ||
                window
              ).getSelection()).anchorNode,
              anchorOffset: n.anchorOffset,
              focusNode: n.focusNode,
              focusOffset: n.focusOffset,
            }),
        lc && $h(lc, n)
          ? null
          : ((lc = n),
            ((e = kh.getPooled(ic.select, sc, e, t)).type = "select"),
            (e.target = ac),
            Sh(e),
            e));
  }
  function Yh(e) {
    var t = e.keyCode;
    return (
      "charCode" in e
        ? 0 === (e = e.charCode) && 13 === t && (e = 13)
        : (e = t),
      10 === e && (e = 13),
      32 <= e || 13 === e ? e : 0
    );
  }
  function Qh(e) {
    0 > xc || ((e.current = Sc[xc]), (Sc[xc] = null), xc--);
  }
  function Jh(e, t) {
    xc++, (Sc[xc] = e.current), (e.current = t);
  }
  function Kh(e, t) {
    var n = e.type.contextTypes;
    if (!n) return Pc;
    var r = e.stateNode;
    if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
      return r.__reactInternalMemoizedMaskedChildContext;
    var o,
      i = {};
    for (o in n) i[o] = t[o];
    return (
      r &&
        (((e = e.stateNode).__reactInternalMemoizedUnmaskedChildContext = t),
        (e.__reactInternalMemoizedMaskedChildContext = i)),
      i
    );
  }
  function Xh(e) {
    return null != (e = e.childContextTypes);
  }
  function Zh() {
    Qh(kc), Qh(Dc);
  }
  function eg(e, t, n) {
    if (Dc.current !== Pc) throw Error(Ff(168));
    Jh(Dc, t), Jh(kc, n);
  }
  function tg(e, t, n) {
    var r = e.stateNode;
    if (((e = t.childContextTypes), "function" != typeof r.getChildContext))
      return n;
    for (var o in (r = r.getChildContext()))
      if (!(o in e)) throw Error(Ff(108, Jf(t) || "Unknown", o));
    return Rs({}, n, {}, r);
  }
  function ng(e) {
    return (
      (e =
        ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) ||
        Pc),
      (Ec = Dc.current),
      Jh(Dc, e),
      Jh(kc, kc.current),
      !0
    );
  }
  function rg(e, t, n) {
    var r = e.stateNode;
    if (!r) throw Error(Ff(169));
    n
      ? ((e = tg(e, t, Ec)),
        (r.__reactInternalMemoizedMergedChildContext = e),
        Qh(kc),
        Qh(Dc),
        Jh(Dc, e))
      : Qh(kc),
      Jh(kc, n);
  }
  function og() {
    switch (Oc()) {
      case Mc:
        return 99;
      case Rc:
        return 98;
      case Nc:
        return 97;
      case Bc:
        return 96;
      case Uc:
        return 95;
      default:
        throw Error(Ff(332));
    }
  }
  function ig(e) {
    switch (e) {
      case 99:
        return Mc;
      case 98:
        return Rc;
      case 97:
        return Nc;
      case 96:
        return Bc;
      case 95:
        return Uc;
      default:
        throw Error(Ff(332));
    }
  }
  function ag(e, t) {
    return (e = ig(e)), Tc(e, t);
  }
  function sg(e, t, n) {
    return (e = ig(e)), Ic(e, t, n);
  }
  function lg(e) {
    return null === Hc ? ((Hc = [e]), (Vc = Ic(Mc, cg))) : Hc.push(e), jc;
  }
  function ug() {
    if (null !== Vc) {
      var e = Vc;
      (Vc = null), Cc(e);
    }
    cg();
  }
  function cg() {
    if (!zc && null !== Hc) {
      zc = !0;
      var e = 0;
      try {
        var t = Hc;
        ag(99, function () {
          for (; e < t.length; e++) {
            var n = t[e];
            do {
              n = n(!0);
            } while (null !== n);
          }
        }),
          (Hc = null);
      } catch (t) {
        throw (null !== Hc && (Hc = Hc.slice(e + 1)), Ic(Mc, ug), t);
      } finally {
        zc = !1;
      }
    }
  }
  function dg(e, t, n) {
    return 1073741821 - (1 + (((1073741821 - e + t / 10) / (n /= 10)) | 0)) * n;
  }
  function fg(e, t) {
    if (e && e.defaultProps)
      for (var n in ((t = Rs({}, t)), (e = e.defaultProps)))
        void 0 === t[n] && (t[n] = e[n]);
    return t;
  }
  function pg() {
    Jc = Qc = Yc = null;
  }
  function hg(e) {
    var t = Wc.current;
    Qh(Wc), (e.type._context._currentValue = t);
  }
  function gg(e, t) {
    for (; null !== e; ) {
      var n = e.alternate;
      if (e.childExpirationTime < t)
        (e.childExpirationTime = t),
          null !== n &&
            n.childExpirationTime < t &&
            (n.childExpirationTime = t);
      else {
        if (!(null !== n && n.childExpirationTime < t)) break;
        n.childExpirationTime = t;
      }
      e = e.return;
    }
  }
  function mg(e, t) {
    (Yc = e),
      (Jc = Qc = null),
      null !== (e = e.dependencies) &&
        null !== e.firstContext &&
        (e.expirationTime >= t && (Pd = !0), (e.firstContext = null));
  }
  function vg(e, t) {
    if (Jc !== e && !1 !== t && 0 !== t)
      if (
        (("number" == typeof t && 1073741823 !== t) ||
          ((Jc = e), (t = 1073741823)),
        (t = { context: e, observedBits: t, next: null }),
        null === Qc)
      ) {
        if (null === Yc) throw Error(Ff(308));
        (Qc = t),
          (Yc.dependencies = {
            expirationTime: 0,
            firstContext: t,
            responders: null,
          });
      } else Qc = Qc.next = t;
    return e._currentValue;
  }
  function bg(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      baseQueue: null,
      shared: { pending: null },
      effects: null,
    };
  }
  function yg(e, t) {
    (e = e.updateQueue),
      t.updateQueue === e &&
        (t.updateQueue = {
          baseState: e.baseState,
          baseQueue: e.baseQueue,
          shared: e.shared,
          effects: e.effects,
        });
  }
  function wg(e, t) {
    return ((e = {
      expirationTime: e,
      suspenseConfig: t,
      tag: 0,
      payload: null,
      callback: null,
      next: null,
    }).next = e);
  }
  function _g(e, t) {
    if (null !== (e = e.updateQueue)) {
      var n = (e = e.shared).pending;
      null === n ? (t.next = t) : ((t.next = n.next), (n.next = t)),
        (e.pending = t);
    }
  }
  function Sg(e, t) {
    var n = e.alternate;
    null !== n && yg(n, e),
      null === (n = (e = e.updateQueue).baseQueue)
        ? ((e.baseQueue = t.next = t), (t.next = t))
        : ((t.next = n.next), (n.next = t));
  }
  function xg(e, t, n, r) {
    var o = e.updateQueue;
    Kc = !1;
    var i = o.baseQueue,
      a = o.shared.pending;
    if (null !== a) {
      if (null !== i) {
        var s = i.next;
        (i.next = a.next), (a.next = s);
      }
      (i = a),
        (o.shared.pending = null),
        null !== (s = e.alternate) &&
          null !== (s = s.updateQueue) &&
          (s.baseQueue = a);
    }
    if (null !== i) {
      s = i.next;
      var l = o.baseState,
        u = 0,
        c = null,
        d = null,
        f = null;
      if (null !== s)
        for (var p = s; ; ) {
          if ((a = p.expirationTime) < r) {
            var h = {
              expirationTime: p.expirationTime,
              suspenseConfig: p.suspenseConfig,
              tag: p.tag,
              payload: p.payload,
              callback: p.callback,
              next: null,
            };
            null === f ? ((d = f = h), (c = l)) : (f = f.next = h),
              a > u && (u = a);
          } else {
            null !== f &&
              (f = f.next =
                {
                  expirationTime: 1073741823,
                  suspenseConfig: p.suspenseConfig,
                  tag: p.tag,
                  payload: p.payload,
                  callback: p.callback,
                  next: null,
                }),
              cv(a, p.suspenseConfig);
            e: {
              var g = e,
                m = p;
              switch (((a = t), (h = n), m.tag)) {
                case 1:
                  if ("function" == typeof (g = m.payload)) {
                    l = g.call(h, l, a);
                    break e;
                  }
                  l = g;
                  break e;
                case 3:
                  g.effectTag = (-4097 & g.effectTag) | 64;
                case 0:
                  if (
                    null ==
                    (a =
                      "function" == typeof (g = m.payload)
                        ? g.call(h, l, a)
                        : g)
                  )
                    break e;
                  l = Rs({}, l, a);
                  break e;
                case 2:
                  Kc = !0;
              }
            }
            null !== p.callback &&
              ((e.effectTag |= 32),
              null === (a = o.effects) ? (o.effects = [p]) : a.push(p));
          }
          if (null === (p = p.next) || p === s) {
            if (null === (a = o.shared.pending)) break;
            (p = i.next = a.next),
              (a.next = s),
              (o.baseQueue = i = a),
              (o.shared.pending = null);
          }
        }
      null === f ? (c = l) : (f.next = d),
        (o.baseState = c),
        (o.baseQueue = f),
        dv(u),
        (e.expirationTime = u),
        (e.memoizedState = l);
    }
  }
  function Pg(e, t, n) {
    if (((e = t.effects), (t.effects = null), null !== e))
      for (t = 0; t < e.length; t++) {
        var r = e[t],
          o = r.callback;
        if (null !== o) {
          if (((r.callback = null), (r = o), (o = n), "function" != typeof r))
            throw Error(Ff(191, r));
          r.call(o);
        }
      }
  }
  function Dg(e, t, n, r) {
    (n = null == (n = n(r, (t = e.memoizedState))) ? t : Rs({}, t, n)),
      (e.memoizedState = n),
      0 === e.expirationTime && (e.updateQueue.baseState = n);
  }
  function kg(e, t, n, r, o, i, a) {
    return "function" == typeof (e = e.stateNode).shouldComponentUpdate
      ? e.shouldComponentUpdate(r, i, a)
      : !t.prototype ||
          !t.prototype.isPureReactComponent ||
          !$h(n, r) ||
          !$h(o, i);
  }
  function Eg(e, t, n) {
    var r = !1,
      o = Pc,
      i = t.contextType;
    return (
      "object" == typeof i && null !== i
        ? (i = vg(i))
        : ((o = Xh(t) ? Ec : Dc.current),
          (i = (r = null != (r = t.contextTypes)) ? Kh(e, o) : Pc)),
      (t = new t(n, i)),
      (e.memoizedState =
        null !== t.state && void 0 !== t.state ? t.state : null),
      (t.updater = ed),
      (e.stateNode = t),
      (t._reactInternalFiber = e),
      r &&
        (((e = e.stateNode).__reactInternalMemoizedUnmaskedChildContext = o),
        (e.__reactInternalMemoizedMaskedChildContext = i)),
      t
    );
  }
  function Tg(e, t, n, r) {
    (e = t.state),
      "function" == typeof t.componentWillReceiveProps &&
        t.componentWillReceiveProps(n, r),
      "function" == typeof t.UNSAFE_componentWillReceiveProps &&
        t.UNSAFE_componentWillReceiveProps(n, r),
      t.state !== e && ed.enqueueReplaceState(t, t.state, null);
  }
  function Ig(e, t, n, r) {
    var o = e.stateNode;
    (o.props = n), (o.state = e.memoizedState), (o.refs = Zc), bg(e);
    var i = t.contextType;
    "object" == typeof i && null !== i
      ? (o.context = vg(i))
      : ((i = Xh(t) ? Ec : Dc.current), (o.context = Kh(e, i))),
      xg(e, n, o, r),
      (o.state = e.memoizedState),
      "function" == typeof (i = t.getDerivedStateFromProps) &&
        (Dg(e, t, i, n), (o.state = e.memoizedState)),
      "function" == typeof t.getDerivedStateFromProps ||
        "function" == typeof o.getSnapshotBeforeUpdate ||
        ("function" != typeof o.UNSAFE_componentWillMount &&
          "function" != typeof o.componentWillMount) ||
        ((t = o.state),
        "function" == typeof o.componentWillMount && o.componentWillMount(),
        "function" == typeof o.UNSAFE_componentWillMount &&
          o.UNSAFE_componentWillMount(),
        t !== o.state && ed.enqueueReplaceState(o, o.state, null),
        xg(e, n, o, r),
        (o.state = e.memoizedState)),
      "function" == typeof o.componentDidMount && (e.effectTag |= 4);
  }
  function Cg(e, t, n) {
    if (
      null !== (e = n.ref) &&
      "function" != typeof e &&
      "object" != typeof e
    ) {
      if (n._owner) {
        if ((n = n._owner)) {
          if (1 !== n.tag) throw Error(Ff(309));
          var r = n.stateNode;
        }
        if (!r) throw Error(Ff(147, e));
        var o = "" + e;
        return null !== t &&
          null !== t.ref &&
          "function" == typeof t.ref &&
          t.ref._stringRef === o
          ? t.ref
          : (((t = function (e) {
              var t = r.refs;
              t === Zc && (t = r.refs = {}),
                null === e ? delete t[o] : (t[o] = e);
            })._stringRef = o),
            t);
      }
      if ("string" != typeof e) throw Error(Ff(284));
      if (!n._owner) throw Error(Ff(290, e));
    }
    return e;
  }
  function Fg(e, t) {
    if ("textarea" !== e.type)
      throw Error(
        Ff(
          31,
          "[object Object]" === Object.prototype.toString.call(t)
            ? "object with keys {" + Object.keys(t).join(", ") + "}"
            : t,
          ""
        )
      );
  }
  function Ag(e) {
    function t(t, n) {
      if (e) {
        var r = t.lastEffect;
        null !== r
          ? ((r.nextEffect = n), (t.lastEffect = n))
          : (t.firstEffect = t.lastEffect = n),
          (n.nextEffect = null),
          (n.effectTag = 8);
      }
    }
    function n(n, r) {
      if (!e) return null;
      for (; null !== r; ) t(n, r), (r = r.sibling);
      return null;
    }
    function r(e, t) {
      for (e = new Map(); null !== t; )
        null !== t.key ? e.set(t.key, t) : e.set(t.index, t), (t = t.sibling);
      return e;
    }
    function o(e, t) {
      return ((e = Iv(e, t)).index = 0), (e.sibling = null), e;
    }
    function i(t, n, r) {
      return (
        (t.index = r),
        e
          ? null !== (r = t.alternate)
            ? (r = r.index) < n
              ? ((t.effectTag = 2), n)
              : r
            : ((t.effectTag = 2), n)
          : n
      );
    }
    function a(t) {
      return e && null === t.alternate && (t.effectTag = 2), t;
    }
    function s(e, t, n, r) {
      return null === t || 6 !== t.tag
        ? (((t = Av(n, e.mode, r)).return = e), t)
        : (((t = o(t, n)).return = e), t);
    }
    function l(e, t, n, r) {
      return null !== t && t.elementType === n.type
        ? (((r = o(t, n.props)).ref = Cg(e, t, n)), (r.return = e), r)
        : (((r = Cv(n.type, n.key, n.props, null, e.mode, r)).ref = Cg(
            e,
            t,
            n
          )),
          (r.return = e),
          r);
    }
    function u(e, t, n, r) {
      return null === t ||
        4 !== t.tag ||
        t.stateNode.containerInfo !== n.containerInfo ||
        t.stateNode.implementation !== n.implementation
        ? (((t = Ov(n, e.mode, r)).return = e), t)
        : (((t = o(t, n.children || [])).return = e), t);
    }
    function c(e, t, n, r, i) {
      return null === t || 7 !== t.tag
        ? (((t = Fv(n, e.mode, r, i)).return = e), t)
        : (((t = o(t, n)).return = e), t);
    }
    function d(e, t, n) {
      if ("string" == typeof t || "number" == typeof t)
        return ((t = Av("" + t, e.mode, n)).return = e), t;
      if ("object" == typeof t && null !== t) {
        switch (t.$$typeof) {
          case fl:
            return (
              ((n = Cv(t.type, t.key, t.props, null, e.mode, n)).ref = Cg(
                e,
                null,
                t
              )),
              (n.return = e),
              n
            );
          case pl:
            return ((t = Ov(t, e.mode, n)).return = e), t;
        }
        if (td(t) || Qf(t)) return ((t = Fv(t, e.mode, n, null)).return = e), t;
        Fg(e, t);
      }
      return null;
    }
    function f(e, t, n, r) {
      var o = null !== t ? t.key : null;
      if ("string" == typeof n || "number" == typeof n)
        return null !== o ? null : s(e, t, "" + n, r);
      if ("object" == typeof n && null !== n) {
        switch (n.$$typeof) {
          case fl:
            return n.key === o
              ? n.type === hl
                ? c(e, t, n.props.children, r, o)
                : l(e, t, n, r)
              : null;
          case pl:
            return n.key === o ? u(e, t, n, r) : null;
        }
        if (td(n) || Qf(n)) return null !== o ? null : c(e, t, n, r, null);
        Fg(e, n);
      }
      return null;
    }
    function p(e, t, n, r, o) {
      if ("string" == typeof r || "number" == typeof r)
        return s(t, (e = e.get(n) || null), "" + r, o);
      if ("object" == typeof r && null !== r) {
        switch (r.$$typeof) {
          case fl:
            return (
              (e = e.get(null === r.key ? n : r.key) || null),
              r.type === hl
                ? c(t, e, r.props.children, o, r.key)
                : l(t, e, r, o)
            );
          case pl:
            return u(t, (e = e.get(null === r.key ? n : r.key) || null), r, o);
        }
        if (td(r) || Qf(r)) return c(t, (e = e.get(n) || null), r, o, null);
        Fg(t, r);
      }
      return null;
    }
    function h(o, a, s, l) {
      for (
        var u = null, c = null, h = a, g = (a = 0), m = null;
        null !== h && g < s.length;
        g++
      ) {
        h.index > g ? ((m = h), (h = null)) : (m = h.sibling);
        var v = f(o, h, s[g], l);
        if (null === v) {
          null === h && (h = m);
          break;
        }
        e && h && null === v.alternate && t(o, h),
          (a = i(v, a, g)),
          null === c ? (u = v) : (c.sibling = v),
          (c = v),
          (h = m);
      }
      if (g === s.length) return n(o, h), u;
      if (null === h) {
        for (; g < s.length; g++)
          null !== (h = d(o, s[g], l)) &&
            ((a = i(h, a, g)), null === c ? (u = h) : (c.sibling = h), (c = h));
        return u;
      }
      for (h = r(o, h); g < s.length; g++)
        null !== (m = p(h, o, g, s[g], l)) &&
          (e && null !== m.alternate && h.delete(null === m.key ? g : m.key),
          (a = i(m, a, g)),
          null === c ? (u = m) : (c.sibling = m),
          (c = m));
      return (
        e &&
          h.forEach(function (e) {
            return t(o, e);
          }),
        u
      );
    }
    function g(o, a, s, l) {
      var u = Qf(s);
      if ("function" != typeof u) throw Error(Ff(150));
      if (null == (s = u.call(s))) throw Error(Ff(151));
      for (
        var c = (u = null), h = a, g = (a = 0), m = null, v = s.next();
        null !== h && !v.done;
        g++, v = s.next()
      ) {
        h.index > g ? ((m = h), (h = null)) : (m = h.sibling);
        var b = f(o, h, v.value, l);
        if (null === b) {
          null === h && (h = m);
          break;
        }
        e && h && null === b.alternate && t(o, h),
          (a = i(b, a, g)),
          null === c ? (u = b) : (c.sibling = b),
          (c = b),
          (h = m);
      }
      if (v.done) return n(o, h), u;
      if (null === h) {
        for (; !v.done; g++, v = s.next())
          null !== (v = d(o, v.value, l)) &&
            ((a = i(v, a, g)), null === c ? (u = v) : (c.sibling = v), (c = v));
        return u;
      }
      for (h = r(o, h); !v.done; g++, v = s.next())
        null !== (v = p(h, o, g, v.value, l)) &&
          (e && null !== v.alternate && h.delete(null === v.key ? g : v.key),
          (a = i(v, a, g)),
          null === c ? (u = v) : (c.sibling = v),
          (c = v));
      return (
        e &&
          h.forEach(function (e) {
            return t(o, e);
          }),
        u
      );
    }
    return function (e, r, i, s) {
      var l =
        "object" == typeof i && null !== i && i.type === hl && null === i.key;
      l && (i = i.props.children);
      var u = "object" == typeof i && null !== i;
      if (u)
        switch (i.$$typeof) {
          case fl:
            e: {
              for (u = i.key, l = r; null !== l; ) {
                if (l.key === u) {
                  switch (l.tag) {
                    case 7:
                      if (i.type === hl) {
                        n(e, l.sibling),
                          ((r = o(l, i.props.children)).return = e),
                          (e = r);
                        break e;
                      }
                      break;
                    default:
                      if (l.elementType === i.type) {
                        n(e, l.sibling),
                          ((r = o(l, i.props)).ref = Cg(e, l, i)),
                          (r.return = e),
                          (e = r);
                        break e;
                      }
                  }
                  n(e, l);
                  break;
                }
                t(e, l), (l = l.sibling);
              }
              i.type === hl
                ? (((r = Fv(i.props.children, e.mode, s, i.key)).return = e),
                  (e = r))
                : (((s = Cv(i.type, i.key, i.props, null, e.mode, s)).ref = Cg(
                    e,
                    r,
                    i
                  )),
                  (s.return = e),
                  (e = s));
            }
            return a(e);
          case pl:
            e: {
              for (l = i.key; null !== r; ) {
                if (r.key === l) {
                  if (
                    4 === r.tag &&
                    r.stateNode.containerInfo === i.containerInfo &&
                    r.stateNode.implementation === i.implementation
                  ) {
                    n(e, r.sibling),
                      ((r = o(r, i.children || [])).return = e),
                      (e = r);
                    break e;
                  }
                  n(e, r);
                  break;
                }
                t(e, r), (r = r.sibling);
              }
              ((r = Ov(i, e.mode, s)).return = e), (e = r);
            }
            return a(e);
        }
      if ("string" == typeof i || "number" == typeof i)
        return (
          (i = "" + i),
          null !== r && 6 === r.tag
            ? (n(e, r.sibling), ((r = o(r, i)).return = e), (e = r))
            : (n(e, r), ((r = Av(i, e.mode, s)).return = e), (e = r)),
          a(e)
        );
      if (td(i)) return h(e, r, i, s);
      if (Qf(i)) return g(e, r, i, s);
      if ((u && Fg(e, i), void 0 === i && !l))
        switch (e.tag) {
          case 1:
          case 0:
            throw (
              ((e = e.type),
              Error(Ff(152, e.displayName || e.name || "Component")))
            );
        }
      return n(e, r);
    };
  }
  function Og(e) {
    if (e === od) throw Error(Ff(174));
    return e;
  }
  function Mg(e, t) {
    switch ((Jh(sd, t), Jh(ad, e), Jh(id, od), (e = t.nodeType))) {
      case 9:
      case 11:
        t = (t = t.documentElement) ? t.namespaceURI : gp(null, "");
        break;
      default:
        t = gp(
          (t = (e = 8 === e ? t.parentNode : t).namespaceURI || null),
          (e = e.tagName)
        );
    }
    Qh(id), Jh(id, t);
  }
  function Rg() {
    Qh(id), Qh(ad), Qh(sd);
  }
  function Ng(e) {
    Og(sd.current);
    var t = Og(id.current),
      n = gp(t, e.type);
    t !== n && (Jh(ad, e), Jh(id, n));
  }
  function Bg(e) {
    ad.current === e && (Qh(id), Qh(ad));
  }
  function Ug(e) {
    for (var t = e; null !== t; ) {
      if (13 === t.tag) {
        var n = t.memoizedState;
        if (
          null !== n &&
          (null === (n = n.dehydrated) || n.data === gu || n.data === mu)
        )
          return t;
      } else if (19 === t.tag && void 0 !== t.memoizedProps.revealOrder) {
        if (0 != (64 & t.effectTag)) return t;
      } else if (null !== t.child) {
        (t.child.return = t), (t = t.child);
        continue;
      }
      if (t === e) break;
      for (; null === t.sibling; ) {
        if (null === t.return || t.return === e) return null;
        t = t.return;
      }
      (t.sibling.return = t.return), (t = t.sibling);
    }
    return null;
  }
  function jg(e, t) {
    return { responder: e, props: t };
  }
  function Lg() {
    throw Error(Ff(321));
  }
  function qg(e, t) {
    if (null === t) return !1;
    for (var n = 0; n < t.length && n < e.length; n++)
      if (!nc(e[n], t[n])) return !1;
    return !0;
  }
  function Hg(e, t, n, r, o, i) {
    if (
      ((dd = i),
      (fd = t),
      (t.memoizedState = null),
      (t.updateQueue = null),
      (t.expirationTime = 0),
      (ud.current = null === e || null === e.memoizedState ? vd : bd),
      (e = n(r, o)),
      t.expirationTime === dd)
    ) {
      i = 0;
      do {
        if (((t.expirationTime = 0), !(25 > i))) throw Error(Ff(301));
        (i += 1),
          (hd = pd = null),
          (t.updateQueue = null),
          (ud.current = yd),
          (e = n(r, o));
      } while (t.expirationTime === dd);
    }
    if (
      ((ud.current = md),
      (t = null !== pd && null !== pd.next),
      (dd = 0),
      (hd = pd = fd = null),
      (gd = !1),
      t)
    )
      throw Error(Ff(300));
    return e;
  }
  function Vg() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null,
    };
    return null === hd ? (fd.memoizedState = hd = e) : (hd = hd.next = e), hd;
  }
  function zg() {
    if (null === pd) {
      var e = fd.alternate;
      e = null !== e ? e.memoizedState : null;
    } else e = pd.next;
    var t = null === hd ? fd.memoizedState : hd.next;
    if (null !== t) (hd = t), (pd = e);
    else {
      if (null === e) throw Error(Ff(310));
      (e = {
        memoizedState: (pd = e).memoizedState,
        baseState: pd.baseState,
        baseQueue: pd.baseQueue,
        queue: pd.queue,
        next: null,
      }),
        null === hd ? (fd.memoizedState = hd = e) : (hd = hd.next = e);
    }
    return hd;
  }
  function Gg(e, t) {
    return "function" == typeof t ? t(e) : t;
  }
  function $g(e) {
    var t = zg(),
      n = t.queue;
    if (null === n) throw Error(Ff(311));
    n.lastRenderedReducer = e;
    var r = pd,
      o = r.baseQueue,
      i = n.pending;
    if (null !== i) {
      if (null !== o) {
        var a = o.next;
        (o.next = i.next), (i.next = a);
      }
      (r.baseQueue = o = i), (n.pending = null);
    }
    if (null !== o) {
      (o = o.next), (r = r.baseState);
      var s = (a = i = null),
        l = o;
      do {
        var u = l.expirationTime;
        if (u < dd) {
          var c = {
            expirationTime: l.expirationTime,
            suspenseConfig: l.suspenseConfig,
            action: l.action,
            eagerReducer: l.eagerReducer,
            eagerState: l.eagerState,
            next: null,
          };
          null === s ? ((a = s = c), (i = r)) : (s = s.next = c),
            u > fd.expirationTime && ((fd.expirationTime = u), dv(u));
        } else
          null !== s &&
            (s = s.next =
              {
                expirationTime: 1073741823,
                suspenseConfig: l.suspenseConfig,
                action: l.action,
                eagerReducer: l.eagerReducer,
                eagerState: l.eagerState,
                next: null,
              }),
            cv(u, l.suspenseConfig),
            (r = l.eagerReducer === e ? l.eagerState : e(r, l.action));
        l = l.next;
      } while (null !== l && l !== o);
      null === s ? (i = r) : (s.next = a),
        nc(r, t.memoizedState) || (Pd = !0),
        (t.memoizedState = r),
        (t.baseState = i),
        (t.baseQueue = s),
        (n.lastRenderedState = r);
    }
    return [t.memoizedState, n.dispatch];
  }
  function Wg(e) {
    var t = zg(),
      n = t.queue;
    if (null === n) throw Error(Ff(311));
    n.lastRenderedReducer = e;
    var r = n.dispatch,
      o = n.pending,
      i = t.memoizedState;
    if (null !== o) {
      n.pending = null;
      var a = (o = o.next);
      do {
        (i = e(i, a.action)), (a = a.next);
      } while (a !== o);
      nc(i, t.memoizedState) || (Pd = !0),
        (t.memoizedState = i),
        null === t.baseQueue && (t.baseState = i),
        (n.lastRenderedState = i);
    }
    return [i, r];
  }
  function Yg(e) {
    var t = Vg();
    return (
      "function" == typeof e && (e = e()),
      (t.memoizedState = t.baseState = e),
      (e = (e = t.queue =
        {
          pending: null,
          dispatch: null,
          lastRenderedReducer: Gg,
          lastRenderedState: e,
        }).dispatch =
        um.bind(null, fd, e)),
      [t.memoizedState, e]
    );
  }
  function Qg(e, t, n, r) {
    return (
      (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
      null === (t = fd.updateQueue)
        ? ((t = { lastEffect: null }),
          (fd.updateQueue = t),
          (t.lastEffect = e.next = e))
        : null === (n = t.lastEffect)
        ? (t.lastEffect = e.next = e)
        : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e)),
      e
    );
  }
  function Jg() {
    return zg().memoizedState;
  }
  function Kg(e, t, n, r) {
    var o = Vg();
    (fd.effectTag |= e),
      (o.memoizedState = Qg(1 | t, n, void 0, void 0 === r ? null : r));
  }
  function Xg(e, t, n, r) {
    var o = zg();
    r = void 0 === r ? null : r;
    var i = void 0;
    if (null !== pd) {
      var a = pd.memoizedState;
      if (((i = a.destroy), null !== r && qg(r, a.deps)))
        return void Qg(t, n, i, r);
    }
    (fd.effectTag |= e), (o.memoizedState = Qg(1 | t, n, i, r));
  }
  function Zg(e, t) {
    return Kg(516, 4, e, t);
  }
  function em(e, t) {
    return Xg(516, 4, e, t);
  }
  function tm(e, t) {
    return Xg(4, 2, e, t);
  }
  function nm(e, t) {
    return "function" == typeof t
      ? ((e = e()),
        t(e),
        function () {
          t(null);
        })
      : null != t
      ? ((e = e()),
        (t.current = e),
        function () {
          t.current = null;
        })
      : void 0;
  }
  function rm(e, t, n) {
    return (
      (n = null != n ? n.concat([e]) : null), Xg(4, 2, nm.bind(null, t, e), n)
    );
  }
  function om() {}
  function im(e, t) {
    return (Vg().memoizedState = [e, void 0 === t ? null : t]), e;
  }
  function am(e, t) {
    var n = zg();
    t = void 0 === t ? null : t;
    var r = n.memoizedState;
    return null !== r && null !== t && qg(t, r[1])
      ? r[0]
      : ((n.memoizedState = [e, t]), e);
  }
  function sm(e, t) {
    var n = zg();
    t = void 0 === t ? null : t;
    var r = n.memoizedState;
    return null !== r && null !== t && qg(t, r[1])
      ? r[0]
      : ((e = e()), (n.memoizedState = [e, t]), e);
  }
  function lm(e, t, n) {
    var r = og();
    ag(98 > r ? 98 : r, function () {
      e(!0);
    }),
      ag(97 < r ? 97 : r, function () {
        var r = cd.suspense;
        cd.suspense = void 0 === t ? null : t;
        try {
          e(!1), n();
        } finally {
          cd.suspense = r;
        }
      });
  }
  function um(e, t, n) {
    var r = Km(),
      o = Xc.suspense;
    o = {
      expirationTime: (r = Xm(r, e, o)),
      suspenseConfig: o,
      action: n,
      eagerReducer: null,
      eagerState: null,
      next: null,
    };
    var i = t.pending;
    if (
      (null === i ? (o.next = o) : ((o.next = i.next), (i.next = o)),
      (t.pending = o),
      (i = e.alternate),
      e === fd || (null !== i && i === fd))
    )
      (gd = !0), (o.expirationTime = dd), (fd.expirationTime = dd);
    else {
      if (
        0 === e.expirationTime &&
        (null === i || 0 === i.expirationTime) &&
        null !== (i = t.lastRenderedReducer)
      )
        try {
          var a = t.lastRenderedState,
            s = i(a, n);
          if (((o.eagerReducer = i), (o.eagerState = s), nc(s, a))) return;
        } catch (e) {}
      Zm(e, r);
    }
  }
  function cm(e, t) {
    var n = Ev(5, null, null, 0);
    (n.elementType = "DELETED"),
      (n.type = "DELETED"),
      (n.stateNode = t),
      (n.return = e),
      (n.effectTag = 8),
      null !== e.lastEffect
        ? ((e.lastEffect.nextEffect = n), (e.lastEffect = n))
        : (e.firstEffect = e.lastEffect = n);
  }
  function dm(e, t) {
    switch (e.tag) {
      case 5:
        var n = e.type;
        return (
          null !==
            (t =
              1 !== t.nodeType || n.toLowerCase() !== t.nodeName.toLowerCase()
                ? null
                : t) && ((e.stateNode = t), !0)
        );
      case 6:
        return (
          null !== (t = "" === e.pendingProps || 3 !== t.nodeType ? null : t) &&
          ((e.stateNode = t), !0)
        );
      case 13:
      default:
        return !1;
    }
  }
  function fm(e) {
    if (Sd) {
      var t = _d;
      if (t) {
        var n = t;
        if (!dm(e, t)) {
          if (!(t = ch(n.nextSibling)) || !dm(e, t))
            return (
              (e.effectTag = (-1025 & e.effectTag) | 2),
              (Sd = !1),
              void (wd = e)
            );
          cm(wd, n);
        }
        (wd = e), (_d = ch(t.firstChild));
      } else (e.effectTag = (-1025 & e.effectTag) | 2), (Sd = !1), (wd = e);
    }
  }
  function pm(e) {
    for (
      e = e.return;
      null !== e && 5 !== e.tag && 3 !== e.tag && 13 !== e.tag;

    )
      e = e.return;
    wd = e;
  }
  function hm(e) {
    if (e !== wd) return !1;
    if (!Sd) return pm(e), (Sd = !0), !1;
    var t = e.type;
    if (
      5 !== e.tag ||
      ("head" !== t && "body" !== t && !uh(t, e.memoizedProps))
    )
      for (t = _d; t; ) cm(e, t), (t = ch(t.nextSibling));
    if ((pm(e), 13 === e.tag)) {
      if (!(e = null !== (e = e.memoizedState) ? e.dehydrated : null))
        throw Error(Ff(317));
      e: {
        for (e = e.nextSibling, t = 0; e; ) {
          if (8 === e.nodeType) {
            var n = e.data;
            if (n === hu) {
              if (0 === t) {
                _d = ch(e.nextSibling);
                break e;
              }
              t--;
            } else (n !== pu && n !== mu && n !== gu) || t++;
          }
          e = e.nextSibling;
        }
        _d = null;
      }
    } else _d = wd ? ch(e.stateNode.nextSibling) : null;
    return !0;
  }
  function gm() {
    (_d = wd = null), (Sd = !1);
  }
  function mm(e, t, n, r) {
    t.child = null === e ? rd(t, null, n, r) : nd(t, e.child, n, r);
  }
  function vm(e, t, n, r, o) {
    n = n.render;
    var i = t.ref;
    return (
      mg(t, o),
      (r = Hg(e, t, n, r, i, o)),
      null === e || Pd
        ? ((t.effectTag |= 1), mm(e, t, r, o), t.child)
        : ((t.updateQueue = e.updateQueue),
          (t.effectTag &= -517),
          e.expirationTime <= o && (e.expirationTime = 0),
          Im(e, t, o))
    );
  }
  function bm(e, t, n, r, o, i) {
    if (null === e) {
      var a = n.type;
      return "function" != typeof a ||
        Tv(a) ||
        void 0 !== a.defaultProps ||
        null !== n.compare ||
        void 0 !== n.defaultProps
        ? (((e = Cv(n.type, null, r, null, t.mode, i)).ref = t.ref),
          (e.return = t),
          (t.child = e))
        : ((t.tag = 15), (t.type = a), ym(e, t, a, r, o, i));
    }
    return (
      (a = e.child),
      o < i &&
      ((o = a.memoizedProps),
      (n = null !== (n = n.compare) ? n : $h)(o, r) && e.ref === t.ref)
        ? Im(e, t, i)
        : ((t.effectTag |= 1),
          ((e = Iv(a, r)).ref = t.ref),
          (e.return = t),
          (t.child = e))
    );
  }
  function ym(e, t, n, r, o, i) {
    return null !== e &&
      $h(e.memoizedProps, r) &&
      e.ref === t.ref &&
      ((Pd = !1), o < i)
      ? ((t.expirationTime = e.expirationTime), Im(e, t, i))
      : _m(e, t, n, r, i);
  }
  function wm(e, t) {
    var n = t.ref;
    ((null === e && null !== n) || (null !== e && e.ref !== n)) &&
      (t.effectTag |= 128);
  }
  function _m(e, t, n, r, o) {
    var i = Xh(n) ? Ec : Dc.current;
    return (
      (i = Kh(t, i)),
      mg(t, o),
      (n = Hg(e, t, n, r, i, o)),
      null === e || Pd
        ? ((t.effectTag |= 1), mm(e, t, n, o), t.child)
        : ((t.updateQueue = e.updateQueue),
          (t.effectTag &= -517),
          e.expirationTime <= o && (e.expirationTime = 0),
          Im(e, t, o))
    );
  }
  function Sm(e, t, n, r, o) {
    if (Xh(n)) {
      var i = !0;
      ng(t);
    } else i = !1;
    if ((mg(t, o), null === t.stateNode))
      null !== e &&
        ((e.alternate = null), (t.alternate = null), (t.effectTag |= 2)),
        Eg(t, n, r),
        Ig(t, n, r, o),
        (r = !0);
    else if (null === e) {
      var a = t.stateNode,
        s = t.memoizedProps;
      a.props = s;
      var l = a.context,
        u = n.contextType;
      "object" == typeof u && null !== u
        ? (u = vg(u))
        : (u = Kh(t, (u = Xh(n) ? Ec : Dc.current)));
      var c = n.getDerivedStateFromProps,
        d =
          "function" == typeof c ||
          "function" == typeof a.getSnapshotBeforeUpdate;
      d ||
        ("function" != typeof a.UNSAFE_componentWillReceiveProps &&
          "function" != typeof a.componentWillReceiveProps) ||
        ((s !== r || l !== u) && Tg(t, a, r, u)),
        (Kc = !1);
      var f = t.memoizedState;
      (a.state = f),
        xg(t, r, a, o),
        (l = t.memoizedState),
        s !== r || f !== l || kc.current || Kc
          ? ("function" == typeof c && (Dg(t, n, c, r), (l = t.memoizedState)),
            (s = Kc || kg(t, n, s, r, f, l, u))
              ? (d ||
                  ("function" != typeof a.UNSAFE_componentWillMount &&
                    "function" != typeof a.componentWillMount) ||
                  ("function" == typeof a.componentWillMount &&
                    a.componentWillMount(),
                  "function" == typeof a.UNSAFE_componentWillMount &&
                    a.UNSAFE_componentWillMount()),
                "function" == typeof a.componentDidMount && (t.effectTag |= 4))
              : ("function" == typeof a.componentDidMount && (t.effectTag |= 4),
                (t.memoizedProps = r),
                (t.memoizedState = l)),
            (a.props = r),
            (a.state = l),
            (a.context = u),
            (r = s))
          : ("function" == typeof a.componentDidMount && (t.effectTag |= 4),
            (r = !1));
    } else
      (a = t.stateNode),
        yg(e, t),
        (s = t.memoizedProps),
        (a.props = t.type === t.elementType ? s : fg(t.type, s)),
        (l = a.context),
        "object" == typeof (u = n.contextType) && null !== u
          ? (u = vg(u))
          : (u = Kh(t, (u = Xh(n) ? Ec : Dc.current))),
        (d =
          "function" == typeof (c = n.getDerivedStateFromProps) ||
          "function" == typeof a.getSnapshotBeforeUpdate) ||
          ("function" != typeof a.UNSAFE_componentWillReceiveProps &&
            "function" != typeof a.componentWillReceiveProps) ||
          ((s !== r || l !== u) && Tg(t, a, r, u)),
        (Kc = !1),
        (l = t.memoizedState),
        (a.state = l),
        xg(t, r, a, o),
        (f = t.memoizedState),
        s !== r || l !== f || kc.current || Kc
          ? ("function" == typeof c && (Dg(t, n, c, r), (f = t.memoizedState)),
            (c = Kc || kg(t, n, s, r, l, f, u))
              ? (d ||
                  ("function" != typeof a.UNSAFE_componentWillUpdate &&
                    "function" != typeof a.componentWillUpdate) ||
                  ("function" == typeof a.componentWillUpdate &&
                    a.componentWillUpdate(r, f, u),
                  "function" == typeof a.UNSAFE_componentWillUpdate &&
                    a.UNSAFE_componentWillUpdate(r, f, u)),
                "function" == typeof a.componentDidUpdate && (t.effectTag |= 4),
                "function" == typeof a.getSnapshotBeforeUpdate &&
                  (t.effectTag |= 256))
              : ("function" != typeof a.componentDidUpdate ||
                  (s === e.memoizedProps && l === e.memoizedState) ||
                  (t.effectTag |= 4),
                "function" != typeof a.getSnapshotBeforeUpdate ||
                  (s === e.memoizedProps && l === e.memoizedState) ||
                  (t.effectTag |= 256),
                (t.memoizedProps = r),
                (t.memoizedState = f)),
            (a.props = r),
            (a.state = f),
            (a.context = u),
            (r = c))
          : ("function" != typeof a.componentDidUpdate ||
              (s === e.memoizedProps && l === e.memoizedState) ||
              (t.effectTag |= 4),
            "function" != typeof a.getSnapshotBeforeUpdate ||
              (s === e.memoizedProps && l === e.memoizedState) ||
              (t.effectTag |= 256),
            (r = !1));
    return xm(e, t, n, r, i, o);
  }
  function xm(e, t, n, r, o, i) {
    wm(e, t);
    var a = 0 != (64 & t.effectTag);
    if (!r && !a) return o && rg(t, n, !1), Im(e, t, i);
    (r = t.stateNode), (xd.current = t);
    var s =
      a && "function" != typeof n.getDerivedStateFromError ? null : r.render();
    return (
      (t.effectTag |= 1),
      null !== e && a
        ? ((t.child = nd(t, e.child, null, i)), (t.child = nd(t, null, s, i)))
        : mm(e, t, s, i),
      (t.memoizedState = r.state),
      o && rg(t, n, !0),
      t.child
    );
  }
  function Pm(e) {
    var t = e.stateNode;
    t.pendingContext
      ? eg(0, t.pendingContext, t.pendingContext !== t.context)
      : t.context && eg(0, t.context, !1),
      Mg(e, t.containerInfo);
  }
  function Dm(e, t, n) {
    var r,
      o = t.mode,
      i = t.pendingProps,
      a = ld.current,
      s = !1;
    if (
      ((r = 0 != (64 & t.effectTag)) ||
        (r = 0 != (2 & a) && (null === e || null !== e.memoizedState)),
      r
        ? ((s = !0), (t.effectTag &= -65))
        : (null !== e && null === e.memoizedState) ||
          void 0 === i.fallback ||
          !0 === i.unstable_avoidThisFallback ||
          (a |= 1),
      Jh(ld, 1 & a),
      null === e)
    ) {
      if ((void 0 !== i.fallback && fm(t), s)) {
        if (
          ((s = i.fallback),
          ((i = Fv(null, o, 0, null)).return = t),
          0 == (2 & t.mode))
        )
          for (
            e = null !== t.memoizedState ? t.child.child : t.child, i.child = e;
            null !== e;

          )
            (e.return = i), (e = e.sibling);
        return (
          ((n = Fv(s, o, n, null)).return = t),
          (i.sibling = n),
          (t.memoizedState = Dd),
          (t.child = i),
          n
        );
      }
      return (
        (o = i.children),
        (t.memoizedState = null),
        (t.child = rd(t, null, o, n))
      );
    }
    if (null !== e.memoizedState) {
      if (((o = (e = e.child).sibling), s)) {
        if (
          ((i = i.fallback),
          ((n = Iv(e, e.pendingProps)).return = t),
          0 == (2 & t.mode) &&
            (s = null !== t.memoizedState ? t.child.child : t.child) !==
              e.child)
        )
          for (n.child = s; null !== s; ) (s.return = n), (s = s.sibling);
        return (
          ((o = Iv(o, i)).return = t),
          (n.sibling = o),
          (n.childExpirationTime = 0),
          (t.memoizedState = Dd),
          (t.child = n),
          o
        );
      }
      return (
        (n = nd(t, e.child, i.children, n)),
        (t.memoizedState = null),
        (t.child = n)
      );
    }
    if (((e = e.child), s)) {
      if (
        ((s = i.fallback),
        ((i = Fv(null, o, 0, null)).return = t),
        (i.child = e),
        null !== e && (e.return = i),
        0 == (2 & t.mode))
      )
        for (
          e = null !== t.memoizedState ? t.child.child : t.child, i.child = e;
          null !== e;

        )
          (e.return = i), (e = e.sibling);
      return (
        ((n = Fv(s, o, n, null)).return = t),
        (i.sibling = n),
        (n.effectTag |= 2),
        (i.childExpirationTime = 0),
        (t.memoizedState = Dd),
        (t.child = i),
        n
      );
    }
    return (t.memoizedState = null), (t.child = nd(t, e, i.children, n));
  }
  function km(e, t) {
    e.expirationTime < t && (e.expirationTime = t);
    var n = e.alternate;
    null !== n && n.expirationTime < t && (n.expirationTime = t),
      gg(e.return, t);
  }
  function Em(e, t, n, r, o, i) {
    var a = e.memoizedState;
    null === a
      ? (e.memoizedState = {
          isBackwards: t,
          rendering: null,
          renderingStartTime: 0,
          last: r,
          tail: n,
          tailExpiration: 0,
          tailMode: o,
          lastEffect: i,
        })
      : ((a.isBackwards = t),
        (a.rendering = null),
        (a.renderingStartTime = 0),
        (a.last = r),
        (a.tail = n),
        (a.tailExpiration = 0),
        (a.tailMode = o),
        (a.lastEffect = i));
  }
  function Tm(e, t, n) {
    var r = t.pendingProps,
      o = r.revealOrder,
      i = r.tail;
    if ((mm(e, t, r.children, n), 0 != (2 & (r = ld.current))))
      (r = (1 & r) | 2), (t.effectTag |= 64);
    else {
      if (null !== e && 0 != (64 & e.effectTag))
        e: for (e = t.child; null !== e; ) {
          if (13 === e.tag) null !== e.memoizedState && km(e, n);
          else if (19 === e.tag) km(e, n);
          else if (null !== e.child) {
            (e.child.return = e), (e = e.child);
            continue;
          }
          if (e === t) break e;
          for (; null === e.sibling; ) {
            if (null === e.return || e.return === t) break e;
            e = e.return;
          }
          (e.sibling.return = e.return), (e = e.sibling);
        }
      r &= 1;
    }
    if ((Jh(ld, r), 0 == (2 & t.mode))) t.memoizedState = null;
    else
      switch (o) {
        case "forwards":
          for (n = t.child, o = null; null !== n; )
            null !== (e = n.alternate) && null === Ug(e) && (o = n),
              (n = n.sibling);
          null === (n = o)
            ? ((o = t.child), (t.child = null))
            : ((o = n.sibling), (n.sibling = null)),
            Em(t, !1, o, n, i, t.lastEffect);
          break;
        case "backwards":
          for (n = null, o = t.child, t.child = null; null !== o; ) {
            if (null !== (e = o.alternate) && null === Ug(e)) {
              t.child = o;
              break;
            }
            (e = o.sibling), (o.sibling = n), (n = o), (o = e);
          }
          Em(t, !0, n, null, i, t.lastEffect);
          break;
        case "together":
          Em(t, !1, null, null, void 0, t.lastEffect);
          break;
        default:
          t.memoizedState = null;
      }
    return t.child;
  }
  function Im(e, t, n) {
    null !== e && (t.dependencies = e.dependencies);
    var r = t.expirationTime;
    if ((0 !== r && dv(r), t.childExpirationTime < n)) return null;
    if (null !== e && t.child !== e.child) throw Error(Ff(153));
    if (null !== t.child) {
      for (
        n = Iv((e = t.child), e.pendingProps), t.child = n, n.return = t;
        null !== e.sibling;

      )
        (e = e.sibling), ((n = n.sibling = Iv(e, e.pendingProps)).return = t);
      n.sibling = null;
    }
    return t.child;
  }
  function Cm(e, t) {
    switch (e.tailMode) {
      case "hidden":
        t = e.tail;
        for (var n = null; null !== t; )
          null !== t.alternate && (n = t), (t = t.sibling);
        null === n ? (e.tail = null) : (n.sibling = null);
        break;
      case "collapsed":
        n = e.tail;
        for (var r = null; null !== n; )
          null !== n.alternate && (r = n), (n = n.sibling);
        null === r
          ? t || null === e.tail
            ? (e.tail = null)
            : (e.tail.sibling = null)
          : (r.sibling = null);
    }
  }
  function Fm(e, t, n) {
    var r = t.pendingProps;
    switch (t.tag) {
      case 2:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return null;
      case 1:
        return Xh(t.type) && Zh(), null;
      case 3:
        return (
          Rg(),
          Qh(kc),
          Qh(Dc),
          (n = t.stateNode).pendingContext &&
            ((n.context = n.pendingContext), (n.pendingContext = null)),
          (null !== e && null !== e.child) || !hm(t) || (t.effectTag |= 4),
          Ed(t),
          null
        );
      case 5:
        Bg(t), (n = Og(sd.current));
        var o = t.type;
        if (null !== e && null != t.stateNode)
          Td(e, t, o, r, n), e.ref !== t.ref && (t.effectTag |= 128);
        else {
          if (!r) {
            if (null === t.stateNode) throw Error(Ff(166));
            return null;
          }
          if (((e = Og(id.current)), hm(t))) {
            (r = t.stateNode), (o = t.type);
            var i = t.memoizedProps;
            switch (((r[Su] = t), (r[xu] = i), o)) {
              case "iframe":
              case "object":
              case "embed":
                zp("load", r);
                break;
              case "video":
              case "audio":
                for (e = 0; e < Bl.length; e++) zp(Bl[e], r);
                break;
              case "source":
                zp("error", r);
                break;
              case "img":
              case "image":
              case "link":
                zp("error", r), zp("load", r);
                break;
              case "form":
                zp("reset", r), zp("submit", r);
                break;
              case "details":
                zp("toggle", r);
                break;
              case "input":
                rp(r, i), zp("invalid", r), eh(n, "onChange");
                break;
              case "select":
                (r._wrapperState = { wasMultiple: !!i.multiple }),
                  zp("invalid", r),
                  eh(n, "onChange");
                break;
              case "textarea":
                dp(r, i), zp("invalid", r), eh(n, "onChange");
            }
            for (var a in (Xp(o, i), (e = null), i))
              if (i.hasOwnProperty(a)) {
                var s = i[a];
                "children" === a
                  ? "string" == typeof s
                    ? r.textContent !== s && (e = ["children", s])
                    : "number" == typeof s &&
                      r.textContent !== "" + s &&
                      (e = ["children", "" + s])
                  : Ys.hasOwnProperty(a) && null != s && eh(n, a);
              }
            switch (o) {
              case "input":
                ep(r), ap(r, i, !0);
                break;
              case "textarea":
                ep(r), pp(r);
                break;
              case "select":
              case "option":
                break;
              default:
                "function" == typeof i.onClick && (r.onclick = th);
            }
            (n = e), (t.updateQueue = n), null !== n && (t.effectTag |= 4);
          } else {
            switch (
              ((a = 9 === n.nodeType ? n : n.ownerDocument),
              e === fu && (e = hp(o)),
              e === fu
                ? "script" === o
                  ? (((e = a.createElement("div")).innerHTML =
                      "<script></script>"),
                    (e = e.removeChild(e.firstChild)))
                  : "string" == typeof r.is
                  ? (e = a.createElement(o, { is: r.is }))
                  : ((e = a.createElement(o)),
                    "select" === o &&
                      ((a = e),
                      r.multiple
                        ? (a.multiple = !0)
                        : r.size && (a.size = r.size)))
                : (e = a.createElementNS(e, o)),
              (e[Su] = t),
              (e[xu] = r),
              kd(e, t, !1, !1),
              (t.stateNode = e),
              (a = Zp(o, r)),
              o)
            ) {
              case "iframe":
              case "object":
              case "embed":
                zp("load", e), (s = r);
                break;
              case "video":
              case "audio":
                for (s = 0; s < Bl.length; s++) zp(Bl[s], e);
                s = r;
                break;
              case "source":
                zp("error", e), (s = r);
                break;
              case "img":
              case "image":
              case "link":
                zp("error", e), zp("load", e), (s = r);
                break;
              case "form":
                zp("reset", e), zp("submit", e), (s = r);
                break;
              case "details":
                zp("toggle", e), (s = r);
                break;
              case "input":
                rp(e, r), (s = np(e, r)), zp("invalid", e), eh(n, "onChange");
                break;
              case "option":
                s = lp(e, r);
                break;
              case "select":
                (e._wrapperState = { wasMultiple: !!r.multiple }),
                  (s = Rs({}, r, { value: void 0 })),
                  zp("invalid", e),
                  eh(n, "onChange");
                break;
              case "textarea":
                dp(e, r), (s = cp(e, r)), zp("invalid", e), eh(n, "onChange");
                break;
              default:
                s = r;
            }
            Xp(o, s);
            var l = s;
            for (i in l)
              if (l.hasOwnProperty(i)) {
                var u = l[i];
                "style" === i
                  ? Kp(e, u)
                  : "dangerouslySetInnerHTML" === i
                  ? null != (u = u ? u.__html : void 0) && Il(e, u)
                  : "children" === i
                  ? "string" == typeof u
                    ? ("textarea" !== o || "" !== u) && mp(e, u)
                    : "number" == typeof u && mp(e, "" + u)
                  : "suppressContentEditableWarning" !== i &&
                    "suppressHydrationWarning" !== i &&
                    "autoFocus" !== i &&
                    (Ys.hasOwnProperty(i)
                      ? null != u && eh(n, i)
                      : null != u && Yf(e, i, u, a));
              }
            switch (o) {
              case "input":
                ep(e), ap(e, r, !1);
                break;
              case "textarea":
                ep(e), pp(e);
                break;
              case "option":
                null != r.value && e.setAttribute("value", "" + Xf(r.value));
                break;
              case "select":
                (e.multiple = !!r.multiple),
                  null != (n = r.value)
                    ? up(e, !!r.multiple, n, !1)
                    : null != r.defaultValue &&
                      up(e, !!r.multiple, r.defaultValue, !0);
                break;
              default:
                "function" == typeof s.onClick && (e.onclick = th);
            }
            lh(o, r) && (t.effectTag |= 4);
          }
          null !== t.ref && (t.effectTag |= 128);
        }
        return null;
      case 6:
        if (e && null != t.stateNode) Id(e, t, e.memoizedProps, r);
        else {
          if ("string" != typeof r && null === t.stateNode)
            throw Error(Ff(166));
          (n = Og(sd.current)),
            Og(id.current),
            hm(t)
              ? ((n = t.stateNode),
                (r = t.memoizedProps),
                (n[Su] = t),
                n.nodeValue !== r && (t.effectTag |= 4))
              : (((n = (9 === n.nodeType ? n : n.ownerDocument).createTextNode(
                  r
                ))[Su] = t),
                (t.stateNode = n));
        }
        return null;
      case 13:
        return (
          Qh(ld),
          (r = t.memoizedState),
          0 != (64 & t.effectTag)
            ? ((t.expirationTime = n), t)
            : ((n = null !== r),
              (r = !1),
              null === e
                ? void 0 !== t.memoizedProps.fallback && hm(t)
                : ((r = null !== (o = e.memoizedState)),
                  n ||
                    null === o ||
                    (null !== (o = e.child.sibling) &&
                      (null !== (i = t.firstEffect)
                        ? ((t.firstEffect = o), (o.nextEffect = i))
                        : ((t.firstEffect = t.lastEffect = o),
                          (o.nextEffect = null)),
                      (o.effectTag = 8)))),
              n &&
                !r &&
                0 != (2 & t.mode) &&
                ((null === e &&
                  !0 !== t.memoizedProps.unstable_avoidThisFallback) ||
                0 != (1 & ld.current)
                  ? Qd === jd && (Qd = Hd)
                  : ((Qd !== jd && Qd !== Hd) || (Qd = Vd),
                    0 !== ef && null !== $d && (Nv($d, Yd), Bv($d, ef)))),
              (n || r) && (t.effectTag |= 4),
              null)
        );
      case 4:
        return Rg(), Ed(t), null;
      case 10:
        return hg(t), null;
      case 17:
        return Xh(t.type) && Zh(), null;
      case 19:
        if ((Qh(ld), null === (r = t.memoizedState))) return null;
        if (((o = 0 != (64 & t.effectTag)), null === (i = r.rendering))) {
          if (o) Cm(r, !1);
          else if (Qd !== jd || (null !== e && 0 != (64 & e.effectTag)))
            for (i = t.child; null !== i; ) {
              if (null !== (e = Ug(i))) {
                for (
                  t.effectTag |= 64,
                    Cm(r, !1),
                    null !== (o = e.updateQueue) &&
                      ((t.updateQueue = o), (t.effectTag |= 4)),
                    null === r.lastEffect && (t.firstEffect = null),
                    t.lastEffect = r.lastEffect,
                    r = t.child;
                  null !== r;

                )
                  (i = n),
                    ((o = r).effectTag &= 2),
                    (o.nextEffect = null),
                    (o.firstEffect = null),
                    (o.lastEffect = null),
                    null === (e = o.alternate)
                      ? ((o.childExpirationTime = 0),
                        (o.expirationTime = i),
                        (o.child = null),
                        (o.memoizedProps = null),
                        (o.memoizedState = null),
                        (o.updateQueue = null),
                        (o.dependencies = null))
                      : ((o.childExpirationTime = e.childExpirationTime),
                        (o.expirationTime = e.expirationTime),
                        (o.child = e.child),
                        (o.memoizedProps = e.memoizedProps),
                        (o.memoizedState = e.memoizedState),
                        (o.updateQueue = e.updateQueue),
                        (i = e.dependencies),
                        (o.dependencies =
                          null === i
                            ? null
                            : {
                                expirationTime: i.expirationTime,
                                firstContext: i.firstContext,
                                responders: i.responders,
                              })),
                    (r = r.sibling);
                return Jh(ld, (1 & ld.current) | 2), t.child;
              }
              i = i.sibling;
            }
        } else {
          if (!o)
            if (null !== (e = Ug(i))) {
              if (
                ((t.effectTag |= 64),
                (o = !0),
                null !== (n = e.updateQueue) &&
                  ((t.updateQueue = n), (t.effectTag |= 4)),
                Cm(r, !0),
                null === r.tail && "hidden" === r.tailMode && !i.alternate)
              )
                return (
                  null !== (t = t.lastEffect = r.lastEffect) &&
                    (t.nextEffect = null),
                  null
                );
            } else
              2 * $c() - r.renderingStartTime > r.tailExpiration &&
                1 < n &&
                ((t.effectTag |= 64),
                (o = !0),
                Cm(r, !1),
                (t.expirationTime = t.childExpirationTime = n - 1));
          r.isBackwards
            ? ((i.sibling = t.child), (t.child = i))
            : (null !== (n = r.last) ? (n.sibling = i) : (t.child = i),
              (r.last = i));
        }
        return null !== r.tail
          ? (0 === r.tailExpiration && (r.tailExpiration = $c() + 500),
            (n = r.tail),
            (r.rendering = n),
            (r.tail = n.sibling),
            (r.lastEffect = t.lastEffect),
            (r.renderingStartTime = $c()),
            (n.sibling = null),
            (t = ld.current),
            Jh(ld, o ? (1 & t) | 2 : 1 & t),
            n)
          : null;
    }
    throw Error(Ff(156, t.tag));
  }
  function Am(e) {
    switch (e.tag) {
      case 1:
        Xh(e.type) && Zh();
        var t = e.effectTag;
        return 4096 & t ? ((e.effectTag = (-4097 & t) | 64), e) : null;
      case 3:
        if ((Rg(), Qh(kc), Qh(Dc), 0 != (64 & (t = e.effectTag))))
          throw Error(Ff(285));
        return (e.effectTag = (-4097 & t) | 64), e;
      case 5:
        return Bg(e), null;
      case 13:
        return (
          Qh(ld),
          4096 & (t = e.effectTag)
            ? ((e.effectTag = (-4097 & t) | 64), e)
            : null
        );
      case 19:
        return Qh(ld), null;
      case 4:
        return Rg(), null;
      case 10:
        return hg(e), null;
      default:
        return null;
    }
  }
  function Om(e, t) {
    return { value: e, source: t, stack: Kf(t) };
  }
  function Mm(e, t) {
    var n = t.source,
      r = t.stack;
    null === r && null !== n && (r = Kf(n)),
      null !== n && Jf(n.type),
      (t = t.value),
      null !== e && 1 === e.tag && Jf(e.type);
    try {
      console.error(t);
    } catch (e) {
      setTimeout(function () {
        throw e;
      });
    }
  }
  function Rm(e) {
    var t = e.ref;
    if (null !== t)
      if ("function" == typeof t)
        try {
          t(null);
        } catch (t) {
          xv(e, t);
        }
      else t.current = null;
  }
  function Nm(e, t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
      case 22:
        return;
      case 1:
        if (256 & t.effectTag && null !== e) {
          var n = e.memoizedProps,
            r = e.memoizedState;
          (t = (e = t.stateNode).getSnapshotBeforeUpdate(
            t.elementType === t.type ? n : fg(t.type, n),
            r
          )),
            (e.__reactInternalSnapshotBeforeUpdate = t);
        }
        return;
      case 3:
      case 5:
      case 6:
      case 4:
      case 17:
        return;
    }
    throw Error(Ff(163));
  }
  function Bm(e, t) {
    if (null !== (t = null !== (t = t.updateQueue) ? t.lastEffect : null)) {
      var n = (t = t.next);
      do {
        if ((n.tag & e) === e) {
          var r = n.destroy;
          (n.destroy = void 0), void 0 !== r && r();
        }
        n = n.next;
      } while (n !== t);
    }
  }
  function Um(e, t) {
    if (null !== (t = null !== (t = t.updateQueue) ? t.lastEffect : null)) {
      var n = (t = t.next);
      do {
        if ((n.tag & e) === e) {
          var r = n.create;
          n.destroy = r();
        }
        n = n.next;
      } while (n !== t);
    }
  }
  function jm(e, t, n) {
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
      case 22:
        return void Um(3, n);
      case 1:
        if (((e = n.stateNode), 4 & n.effectTag))
          if (null === t) e.componentDidMount();
          else {
            var r =
              n.elementType === n.type
                ? t.memoizedProps
                : fg(n.type, t.memoizedProps);
            e.componentDidUpdate(
              r,
              t.memoizedState,
              e.__reactInternalSnapshotBeforeUpdate
            );
          }
        return void (null !== (t = n.updateQueue) && Pg(n, t, e));
      case 3:
        if (null !== (t = n.updateQueue)) {
          if (((e = null), null !== n.child))
            switch (n.child.tag) {
              case 5:
                e = n.child.stateNode;
                break;
              case 1:
                e = n.child.stateNode;
            }
          Pg(n, t, e);
        }
        return;
      case 5:
        return (
          (e = n.stateNode),
          void (
            null === t &&
            4 & n.effectTag &&
            lh(n.type, n.memoizedProps) &&
            e.focus()
          )
        );
      case 6:
      case 4:
      case 12:
        return;
      case 13:
        return void (
          null === n.memoizedState &&
          ((n = n.alternate),
          null !== n &&
            ((n = n.memoizedState),
            null !== n && ((n = n.dehydrated), null !== n && Hp(n))))
        );
      case 19:
      case 17:
      case 20:
      case 21:
        return;
    }
    throw Error(Ff(163));
  }
  function Lm(e, t, n) {
    switch (("function" == typeof bf && bf(t), t.tag)) {
      case 0:
      case 11:
      case 14:
      case 15:
      case 22:
        if (null !== (e = t.updateQueue) && null !== (e = e.lastEffect)) {
          var r = e.next;
          ag(97 < n ? 97 : n, function () {
            var e = r;
            do {
              var n = e.destroy;
              if (void 0 !== n) {
                var o = t;
                try {
                  n();
                } catch (e) {
                  xv(o, e);
                }
              }
              e = e.next;
            } while (e !== r);
          });
        }
        break;
      case 1:
        Rm(t),
          "function" == typeof (n = t.stateNode).componentWillUnmount &&
            (function (e, t) {
              try {
                (t.props = e.memoizedProps),
                  (t.state = e.memoizedState),
                  t.componentWillUnmount();
              } catch (t) {
                xv(e, t);
              }
            })(t, n);
        break;
      case 5:
        Rm(t);
        break;
      case 4:
        $m(e, t, n);
    }
  }
  function qm(e) {
    var t = e.alternate;
    (e.return = null),
      (e.child = null),
      (e.memoizedState = null),
      (e.updateQueue = null),
      (e.dependencies = null),
      (e.alternate = null),
      (e.firstEffect = null),
      (e.lastEffect = null),
      (e.pendingProps = null),
      (e.memoizedProps = null),
      (e.stateNode = null),
      null !== t && qm(t);
  }
  function Hm(e) {
    return 5 === e.tag || 3 === e.tag || 4 === e.tag;
  }
  function Vm(e) {
    e: {
      for (var t = e.return; null !== t; ) {
        if (Hm(t)) {
          var n = t;
          break e;
        }
        t = t.return;
      }
      throw Error(Ff(160));
    }
    switch (((t = n.stateNode), n.tag)) {
      case 5:
        var r = !1;
        break;
      case 3:
      case 4:
        (t = t.containerInfo), (r = !0);
        break;
      default:
        throw Error(Ff(161));
    }
    16 & n.effectTag && (mp(t, ""), (n.effectTag &= -17));
    e: t: for (n = e; ; ) {
      for (; null === n.sibling; ) {
        if (null === n.return || Hm(n.return)) {
          n = null;
          break e;
        }
        n = n.return;
      }
      for (
        n.sibling.return = n.return, n = n.sibling;
        5 !== n.tag && 6 !== n.tag && 18 !== n.tag;

      ) {
        if (2 & n.effectTag) continue t;
        if (null === n.child || 4 === n.tag) continue t;
        (n.child.return = n), (n = n.child);
      }
      if (!(2 & n.effectTag)) {
        n = n.stateNode;
        break e;
      }
    }
    r ? zm(e, n, t) : Gm(e, n, t);
  }
  function zm(e, t, n) {
    var r = e.tag,
      o = 5 === r || 6 === r;
    if (o)
      (e = o ? e.stateNode : e.stateNode.instance),
        t
          ? 8 === n.nodeType
            ? n.parentNode.insertBefore(e, t)
            : n.insertBefore(e, t)
          : (8 === n.nodeType
              ? (t = n.parentNode).insertBefore(e, n)
              : (t = n).appendChild(e),
            null != (n = n._reactRootContainer) ||
              null !== t.onclick ||
              (t.onclick = th));
    else if (4 !== r && null !== (e = e.child))
      for (zm(e, t, n), e = e.sibling; null !== e; )
        zm(e, t, n), (e = e.sibling);
  }
  function Gm(e, t, n) {
    var r = e.tag,
      o = 5 === r || 6 === r;
    if (o)
      (e = o ? e.stateNode : e.stateNode.instance),
        t ? n.insertBefore(e, t) : n.appendChild(e);
    else if (4 !== r && null !== (e = e.child))
      for (Gm(e, t, n), e = e.sibling; null !== e; )
        Gm(e, t, n), (e = e.sibling);
  }
  function $m(e, t, n) {
    for (var r, o, i = t, a = !1; ; ) {
      if (!a) {
        a = i.return;
        e: for (;;) {
          if (null === a) throw Error(Ff(160));
          switch (((r = a.stateNode), a.tag)) {
            case 5:
              o = !1;
              break e;
            case 3:
            case 4:
              (r = r.containerInfo), (o = !0);
              break e;
          }
          a = a.return;
        }
        a = !0;
      }
      if (5 === i.tag || 6 === i.tag) {
        e: for (var s = e, l = i, u = n, c = l; ; )
          if ((Lm(s, c, u), null !== c.child && 4 !== c.tag))
            (c.child.return = c), (c = c.child);
          else {
            if (c === l) break e;
            for (; null === c.sibling; ) {
              if (null === c.return || c.return === l) break e;
              c = c.return;
            }
            (c.sibling.return = c.return), (c = c.sibling);
          }
        o
          ? ((s = r),
            (l = i.stateNode),
            8 === s.nodeType ? s.parentNode.removeChild(l) : s.removeChild(l))
          : r.removeChild(i.stateNode);
      } else if (4 === i.tag) {
        if (null !== i.child) {
          (r = i.stateNode.containerInfo),
            (o = !0),
            (i.child.return = i),
            (i = i.child);
          continue;
        }
      } else if ((Lm(e, i, n), null !== i.child)) {
        (i.child.return = i), (i = i.child);
        continue;
      }
      if (i === t) break;
      for (; null === i.sibling; ) {
        if (null === i.return || i.return === t) return;
        4 === (i = i.return).tag && (a = !1);
      }
      (i.sibling.return = i.return), (i = i.sibling);
    }
  }
  function Wm(e, t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
      case 22:
        return void Bm(3, t);
      case 1:
        return;
      case 5:
        var n = t.stateNode;
        if (null != n) {
          var r = t.memoizedProps,
            o = null !== e ? e.memoizedProps : r;
          e = t.type;
          var i = t.updateQueue;
          if (((t.updateQueue = null), null !== i)) {
            for (
              n[xu] = r,
                "input" === e &&
                  "radio" === r.type &&
                  null != r.name &&
                  op(n, r),
                Zp(e, o),
                t = Zp(e, r),
                o = 0;
              o < i.length;
              o += 2
            ) {
              var a = i[o],
                s = i[o + 1];
              "style" === a
                ? Kp(n, s)
                : "dangerouslySetInnerHTML" === a
                ? Il(n, s)
                : "children" === a
                ? mp(n, s)
                : Yf(n, a, s, t);
            }
            switch (e) {
              case "input":
                ip(n, r);
                break;
              case "textarea":
                fp(n, r);
                break;
              case "select":
                (t = n._wrapperState.wasMultiple),
                  (n._wrapperState.wasMultiple = !!r.multiple),
                  null != (e = r.value)
                    ? up(n, !!r.multiple, e, !1)
                    : t !== !!r.multiple &&
                      (null != r.defaultValue
                        ? up(n, !!r.multiple, r.defaultValue, !0)
                        : up(n, !!r.multiple, r.multiple ? [] : "", !1));
            }
          }
        }
        return;
      case 6:
        if (null === t.stateNode) throw Error(Ff(162));
        return void (t.stateNode.nodeValue = t.memoizedProps);
      case 3:
        return void (
          (t = t.stateNode).hydrate && ((t.hydrate = !1), Hp(t.containerInfo))
        );
      case 12:
        return;
      case 13:
        if (
          ((n = t),
          null === t.memoizedState
            ? (r = !1)
            : ((r = !0), (n = t.child), (nf = $c())),
          null !== n)
        )
          e: for (e = n; ; ) {
            if (5 === e.tag)
              (i = e.stateNode),
                r
                  ? "function" == typeof (i = i.style).setProperty
                    ? i.setProperty("display", "none", "important")
                    : (i.display = "none")
                  : ((i = e.stateNode),
                    (o =
                      null != (o = e.memoizedProps.style) &&
                      o.hasOwnProperty("display")
                        ? o.display
                        : null),
                    (i.style.display = Jp("display", o)));
            else if (6 === e.tag)
              e.stateNode.nodeValue = r ? "" : e.memoizedProps;
            else {
              if (
                13 === e.tag &&
                null !== e.memoizedState &&
                null === e.memoizedState.dehydrated
              ) {
                ((i = e.child.sibling).return = e), (e = i);
                continue;
              }
              if (null !== e.child) {
                (e.child.return = e), (e = e.child);
                continue;
              }
            }
            if (e === n) break;
            for (; null === e.sibling; ) {
              if (null === e.return || e.return === n) break e;
              e = e.return;
            }
            (e.sibling.return = e.return), (e = e.sibling);
          }
        return void Ym(t);
      case 19:
        return void Ym(t);
      case 17:
        return;
    }
    throw Error(Ff(163));
  }
  function Ym(e) {
    var t = e.updateQueue;
    if (null !== t) {
      e.updateQueue = null;
      var n = e.stateNode;
      null === n && (n = e.stateNode = new Cd()),
        t.forEach(function (t) {
          var r = Dv.bind(null, e, t);
          n.has(t) || (n.add(t), t.then(r, r));
        });
    }
  }
  function Qm(e, t, n) {
    ((n = wg(n, null)).tag = 3), (n.payload = { element: null });
    var r = t.value;
    return (
      (n.callback = function () {
        af || ((af = !0), (sf = r)), Mm(e, t);
      }),
      n
    );
  }
  function Jm(e, t, n) {
    (n = wg(n, null)).tag = 3;
    var r = e.type.getDerivedStateFromError;
    if ("function" == typeof r) {
      var o = t.value;
      n.payload = function () {
        return Mm(e, t), r(o);
      };
    }
    var i = e.stateNode;
    return (
      null !== i &&
        "function" == typeof i.componentDidCatch &&
        (n.callback = function () {
          "function" != typeof r &&
            (null === lf ? (lf = new Set([this])) : lf.add(this), Mm(e, t));
          var n = t.stack;
          this.componentDidCatch(t.value, {
            componentStack: null !== n ? n : "",
          });
        }),
      n
    );
  }
  function Km() {
    return (Gd & (Bd | Ud)) !== Rd
      ? 1073741821 - (($c() / 10) | 0)
      : 0 !== gf
      ? gf
      : (gf = 1073741821 - (($c() / 10) | 0));
  }
  function Xm(e, t, n) {
    if (0 == (2 & (t = t.mode))) return 1073741823;
    var r = og();
    if (0 == (4 & t)) return 99 === r ? 1073741823 : 1073741822;
    if ((Gd & Bd) !== Rd) return Yd;
    if (null !== n) e = dg(e, 0 | n.timeoutMs || 5e3, 250);
    else
      switch (r) {
        case 99:
          e = 1073741823;
          break;
        case 98:
          e = dg(e, 150, 100);
          break;
        case 97:
        case 96:
          e = dg(e, 5e3, 250);
          break;
        case 95:
          e = 2;
          break;
        default:
          throw Error(Ff(326));
      }
    return null !== $d && e === Yd && --e, e;
  }
  function Zm(e, t) {
    if (50 < pf) throw ((pf = 0), (hf = null), Error(Ff(185)));
    if (null !== (e = ev(e, t))) {
      var n = og();
      1073741823 === t
        ? (Gd & Nd) !== Rd && (Gd & (Bd | Ud)) === Rd
          ? ov(e)
          : (nv(e), Gd === Rd && ug())
        : nv(e),
        (4 & Gd) === Rd ||
          (98 !== n && 99 !== n) ||
          (null === ff
            ? (ff = new Map([[e, t]]))
            : (void 0 === (n = ff.get(e)) || n > t) && ff.set(e, t));
    }
  }
  function ev(e, t) {
    e.expirationTime < t && (e.expirationTime = t);
    var n = e.alternate;
    null !== n && n.expirationTime < t && (n.expirationTime = t);
    var r = e.return,
      o = null;
    if (null === r && 3 === e.tag) o = e.stateNode;
    else
      for (; null !== r; ) {
        if (
          ((n = r.alternate),
          r.childExpirationTime < t && (r.childExpirationTime = t),
          null !== n &&
            n.childExpirationTime < t &&
            (n.childExpirationTime = t),
          null === r.return && 3 === r.tag)
        ) {
          o = r.stateNode;
          break;
        }
        r = r.return;
      }
    return (
      null !== o && ($d === o && (dv(t), Qd === Vd && Nv(o, Yd)), Bv(o, t)), o
    );
  }
  function tv(e) {
    var t = e.lastExpiredTime;
    if (0 !== t) return t;
    if (!Rv(e, (t = e.firstPendingTime))) return t;
    var n = e.lastPingedTime;
    return 2 >= (e = n > (e = e.nextKnownPendingLevel) ? n : e) && t !== e
      ? 0
      : e;
  }
  function nv(e) {
    if (0 !== e.lastExpiredTime)
      (e.callbackExpirationTime = 1073741823),
        (e.callbackPriority = 99),
        (e.callbackNode = lg(ov.bind(null, e)));
    else {
      var t = tv(e),
        n = e.callbackNode;
      if (0 === t)
        null !== n &&
          ((e.callbackNode = null),
          (e.callbackExpirationTime = 0),
          (e.callbackPriority = 90));
      else {
        var r = Km();
        if (
          (1073741823 === t
            ? (r = 99)
            : 1 === t || 2 === t
            ? (r = 95)
            : (r =
                0 >= (r = 10 * (1073741821 - t) - 10 * (1073741821 - r))
                  ? 99
                  : 250 >= r
                  ? 98
                  : 5250 >= r
                  ? 97
                  : 95),
          null !== n)
        ) {
          var o = e.callbackPriority;
          if (e.callbackExpirationTime === t && o >= r) return;
          n !== jc && Cc(n);
        }
        (e.callbackExpirationTime = t),
          (e.callbackPriority = r),
          (t =
            1073741823 === t
              ? lg(ov.bind(null, e))
              : sg(r, rv.bind(null, e), {
                  timeout: 10 * (1073741821 - t) - $c(),
                })),
          (e.callbackNode = t);
      }
    }
  }
  function rv(e, t) {
    if (((gf = 0), t)) return Uv(e, (t = Km())), nv(e), null;
    var n = tv(e);
    if (0 !== n) {
      if (((t = e.callbackNode), (Gd & (Bd | Ud)) !== Rd)) throw Error(Ff(327));
      if ((wv(), (e === $d && n === Yd) || sv(e, n), null !== Wd)) {
        var r = Gd;
        Gd |= Bd;
        for (var o = uv(); ; )
          try {
            pv();
            break;
          } catch (t) {
            lv(e, t);
          }
        if ((pg(), (Gd = r), (Od.current = o), Qd === Ld))
          throw ((t = Jd), sv(e, n), Nv(e, n), nv(e), t);
        if (null === Wd)
          switch (
            ((o = e.finishedWork = e.current.alternate),
            (e.finishedExpirationTime = n),
            (r = Qd),
            ($d = null),
            r)
          ) {
            case jd:
            case Ld:
              throw Error(Ff(345));
            case qd:
              Uv(e, 2 < n ? 2 : n);
              break;
            case Hd:
              if (
                (Nv(e, n),
                n === (r = e.lastSuspendedTime) &&
                  (e.nextKnownPendingLevel = mv(o)),
                1073741823 === Kd && 10 < (o = nf + rf - $c()))
              ) {
                if (tf) {
                  var i = e.lastPingedTime;
                  if (0 === i || i >= n) {
                    (e.lastPingedTime = n), sv(e, n);
                    break;
                  }
                }
                if (0 !== (i = tv(e)) && i !== n) break;
                if (0 !== r && r !== n) {
                  e.lastPingedTime = r;
                  break;
                }
                e.timeoutHandle = yu(vv.bind(null, e), o);
                break;
              }
              vv(e);
              break;
            case Vd:
              if (
                (Nv(e, n),
                n === (r = e.lastSuspendedTime) &&
                  (e.nextKnownPendingLevel = mv(o)),
                tf && (0 === (o = e.lastPingedTime) || o >= n))
              ) {
                (e.lastPingedTime = n), sv(e, n);
                break;
              }
              if (0 !== (o = tv(e)) && o !== n) break;
              if (0 !== r && r !== n) {
                e.lastPingedTime = r;
                break;
              }
              if (
                (1073741823 !== Xd
                  ? (r = 10 * (1073741821 - Xd) - $c())
                  : 1073741823 === Kd
                  ? (r = 0)
                  : ((r = 10 * (1073741821 - Kd) - 5e3),
                    0 > (r = (o = $c()) - r) && (r = 0),
                    (n = 10 * (1073741821 - n) - o) <
                      (r =
                        (120 > r
                          ? 120
                          : 480 > r
                          ? 480
                          : 1080 > r
                          ? 1080
                          : 1920 > r
                          ? 1920
                          : 3e3 > r
                          ? 3e3
                          : 4320 > r
                          ? 4320
                          : 1960 * Ad(r / 1960)) - r) && (r = n)),
                10 < r)
              ) {
                e.timeoutHandle = yu(vv.bind(null, e), r);
                break;
              }
              vv(e);
              break;
            case zd:
              if (1073741823 !== Kd && null !== Zd) {
                i = Kd;
                var a = Zd;
                if (
                  (0 >= (r = 0 | a.busyMinDurationMs)
                    ? (r = 0)
                    : ((o = 0 | a.busyDelayMs),
                      (r =
                        (i =
                          $c() -
                          (10 * (1073741821 - i) - (0 | a.timeoutMs || 5e3))) <=
                        o
                          ? 0
                          : o + r - i)),
                  10 < r)
                ) {
                  Nv(e, n), (e.timeoutHandle = yu(vv.bind(null, e), r));
                  break;
                }
              }
              vv(e);
              break;
            default:
              throw Error(Ff(329));
          }
        if ((nv(e), e.callbackNode === t)) return rv.bind(null, e);
      }
    }
    return null;
  }
  function ov(e) {
    var t = e.lastExpiredTime;
    if (((t = 0 !== t ? t : 1073741823), (Gd & (Bd | Ud)) !== Rd))
      throw Error(Ff(327));
    if ((wv(), (e === $d && t === Yd) || sv(e, t), null !== Wd)) {
      var n = Gd;
      Gd |= Bd;
      for (var r = uv(); ; )
        try {
          fv();
          break;
        } catch (t) {
          lv(e, t);
        }
      if ((pg(), (Gd = n), (Od.current = r), Qd === Ld))
        throw ((n = Jd), sv(e, t), Nv(e, t), nv(e), n);
      if (null !== Wd) throw Error(Ff(261));
      (e.finishedWork = e.current.alternate),
        (e.finishedExpirationTime = t),
        ($d = null),
        vv(e),
        nv(e);
    }
    return null;
  }
  function iv(e, t) {
    var n = Gd;
    Gd |= 1;
    try {
      return e(t);
    } finally {
      (Gd = n) === Rd && ug();
    }
  }
  function av(e, t) {
    var n = Gd;
    (Gd &= -2), (Gd |= Nd);
    try {
      return e(t);
    } finally {
      (Gd = n) === Rd && ug();
    }
  }
  function sv(e, t) {
    (e.finishedWork = null), (e.finishedExpirationTime = 0);
    var n = e.timeoutHandle;
    if ((-1 !== n && ((e.timeoutHandle = -1), wu(n)), null !== Wd))
      for (n = Wd.return; null !== n; ) {
        var r = n;
        switch (r.tag) {
          case 1:
            null != (r = r.type.childContextTypes) && Zh();
            break;
          case 3:
            Rg(), Qh(kc), Qh(Dc);
            break;
          case 5:
            Bg(r);
            break;
          case 4:
            Rg();
            break;
          case 13:
          case 19:
            Qh(ld);
            break;
          case 10:
            hg(r);
        }
        n = n.return;
      }
    ($d = e),
      (Wd = Iv(e.current, null)),
      (Yd = t),
      (Qd = jd),
      (Jd = null),
      (Xd = Kd = 1073741823),
      (Zd = null),
      (ef = 0),
      (tf = !1);
  }
  function lv(e, t) {
    for (;;) {
      try {
        if ((pg(), (ud.current = md), gd))
          for (var n = fd.memoizedState; null !== n; ) {
            var r = n.queue;
            null !== r && (r.pending = null), (n = n.next);
          }
        if (
          ((dd = 0),
          (hd = pd = fd = null),
          (gd = !1),
          null === Wd || null === Wd.return)
        )
          return (Qd = Ld), (Jd = t), (Wd = null);
        e: {
          var o = e,
            i = Wd.return,
            a = Wd,
            s = t;
          if (
            ((t = Yd),
            (a.effectTag |= 2048),
            (a.firstEffect = a.lastEffect = null),
            null !== s && "object" == typeof s && "function" == typeof s.then)
          ) {
            var l = s;
            if (0 == (2 & a.mode)) {
              var u = a.alternate;
              u
                ? ((a.updateQueue = u.updateQueue),
                  (a.memoizedState = u.memoizedState),
                  (a.expirationTime = u.expirationTime))
                : ((a.updateQueue = null), (a.memoizedState = null));
            }
            var c = 0 != (1 & ld.current),
              d = i;
            do {
              var f;
              if ((f = 13 === d.tag)) {
                var p = d.memoizedState;
                if (null !== p) f = null !== p.dehydrated;
                else {
                  var h = d.memoizedProps;
                  f =
                    void 0 !== h.fallback &&
                    (!0 !== h.unstable_avoidThisFallback || !c);
                }
              }
              if (f) {
                var g = d.updateQueue;
                if (null === g) {
                  var m = new Set();
                  m.add(l), (d.updateQueue = m);
                } else g.add(l);
                if (0 == (2 & d.mode)) {
                  if (
                    ((d.effectTag |= 64), (a.effectTag &= -2981), 1 === a.tag)
                  )
                    if (null === a.alternate) a.tag = 17;
                    else {
                      var v = wg(1073741823, null);
                      (v.tag = 2), _g(a, v);
                    }
                  a.expirationTime = 1073741823;
                  break e;
                }
                (s = void 0), (a = t);
                var b = o.pingCache;
                if (
                  (null === b
                    ? ((b = o.pingCache = new Fd()),
                      (s = new Set()),
                      b.set(l, s))
                    : void 0 === (s = b.get(l)) &&
                      ((s = new Set()), b.set(l, s)),
                  !s.has(a))
                ) {
                  s.add(a);
                  var y = Pv.bind(null, o, l, a);
                  l.then(y, y);
                }
                (d.effectTag |= 4096), (d.expirationTime = t);
                break e;
              }
              d = d.return;
            } while (null !== d);
            s = Error(
              (Jf(a.type) || "A React component") +
                " suspended while rendering, but no fallback UI was specified.\n\nAdd a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display." +
                Kf(a)
            );
          }
          Qd !== zd && (Qd = qd), (s = Om(s, a)), (d = i);
          do {
            switch (d.tag) {
              case 3:
                (l = s),
                  (d.effectTag |= 4096),
                  (d.expirationTime = t),
                  Sg(d, Qm(d, l, t));
                break e;
              case 1:
                l = s;
                var w = d.type,
                  _ = d.stateNode;
                if (
                  0 == (64 & d.effectTag) &&
                  ("function" == typeof w.getDerivedStateFromError ||
                    (null !== _ &&
                      "function" == typeof _.componentDidCatch &&
                      (null === lf || !lf.has(_))))
                ) {
                  (d.effectTag |= 4096),
                    (d.expirationTime = t),
                    Sg(d, Jm(d, l, t));
                  break e;
                }
            }
            d = d.return;
          } while (null !== d);
        }
        Wd = gv(Wd);
      } catch (e) {
        t = e;
        continue;
      }
      break;
    }
  }
  function uv() {
    var e = Od.current;
    return (Od.current = md), null === e ? md : e;
  }
  function cv(e, t) {
    e < Kd && 2 < e && (Kd = e),
      null !== t && e < Xd && 2 < e && ((Xd = e), (Zd = t));
  }
  function dv(e) {
    e > ef && (ef = e);
  }
  function fv() {
    for (; null !== Wd; ) Wd = hv(Wd);
  }
  function pv() {
    for (; null !== Wd && !Lc(); ) Wd = hv(Wd);
  }
  function hv(e) {
    var t = mf(e.alternate, e, Yd);
    return (
      (e.memoizedProps = e.pendingProps),
      null === t && (t = gv(e)),
      (Md.current = null),
      t
    );
  }
  function gv(e) {
    Wd = e;
    do {
      var t = Wd.alternate;
      if (((e = Wd.return), 0 == (2048 & Wd.effectTag))) {
        if (((t = Fm(t, Wd, Yd)), 1 === Yd || 1 !== Wd.childExpirationTime)) {
          for (var n = 0, r = Wd.child; null !== r; ) {
            var o = r.expirationTime,
              i = r.childExpirationTime;
            o > n && (n = o), i > n && (n = i), (r = r.sibling);
          }
          Wd.childExpirationTime = n;
        }
        if (null !== t) return t;
        null !== e &&
          0 == (2048 & e.effectTag) &&
          (null === e.firstEffect && (e.firstEffect = Wd.firstEffect),
          null !== Wd.lastEffect &&
            (null !== e.lastEffect &&
              (e.lastEffect.nextEffect = Wd.firstEffect),
            (e.lastEffect = Wd.lastEffect)),
          1 < Wd.effectTag &&
            (null !== e.lastEffect
              ? (e.lastEffect.nextEffect = Wd)
              : (e.firstEffect = Wd),
            (e.lastEffect = Wd)));
      } else {
        if (null !== (t = Am(Wd))) return (t.effectTag &= 2047), t;
        null !== e &&
          ((e.firstEffect = e.lastEffect = null), (e.effectTag |= 2048));
      }
      if (null !== (t = Wd.sibling)) return t;
      Wd = e;
    } while (null !== Wd);
    return Qd === jd && (Qd = zd), null;
  }
  function mv(e) {
    var t = e.expirationTime;
    return t > (e = e.childExpirationTime) ? t : e;
  }
  function vv(e) {
    var t = og();
    return ag(99, bv.bind(null, e, t)), null;
  }
  function bv(e, t) {
    do {
      wv();
    } while (null !== cf);
    if ((Gd & (Bd | Ud)) !== Rd) throw Error(Ff(327));
    var n = e.finishedWork,
      r = e.finishedExpirationTime;
    if (null === n) return null;
    if (
      ((e.finishedWork = null), (e.finishedExpirationTime = 0), n === e.current)
    )
      throw Error(Ff(177));
    (e.callbackNode = null),
      (e.callbackExpirationTime = 0),
      (e.callbackPriority = 90),
      (e.nextKnownPendingLevel = 0);
    var o = mv(n);
    if (
      ((e.firstPendingTime = o),
      r <= e.lastSuspendedTime
        ? (e.firstSuspendedTime =
            e.lastSuspendedTime =
            e.nextKnownPendingLevel =
              0)
        : r <= e.firstSuspendedTime && (e.firstSuspendedTime = r - 1),
      r <= e.lastPingedTime && (e.lastPingedTime = 0),
      r <= e.lastExpiredTime && (e.lastExpiredTime = 0),
      e === $d && ((Wd = $d = null), (Yd = 0)),
      1 < n.effectTag
        ? null !== n.lastEffect
          ? ((n.lastEffect.nextEffect = n), (o = n.firstEffect))
          : (o = n)
        : (o = n.firstEffect),
      null !== o)
    ) {
      var i = Gd;
      (Gd |= Ud), (Md.current = null), (vu = lu);
      var a = ah();
      if (sh(a)) {
        if ("selectionStart" in a)
          var s = { start: a.selectionStart, end: a.selectionEnd };
        else
          e: {
            var l =
              (s = ((s = a.ownerDocument) && s.defaultView) || window)
                .getSelection && s.getSelection();
            if (l && 0 !== l.rangeCount) {
              s = l.anchorNode;
              var u = l.anchorOffset,
                c = l.focusNode;
              l = l.focusOffset;
              try {
                s.nodeType, c.nodeType;
              } catch (e) {
                s = null;
                break e;
              }
              var d = 0,
                f = -1,
                p = -1,
                h = 0,
                g = 0,
                m = a,
                v = null;
              t: for (;;) {
                for (
                  var b;
                  m !== s || (0 !== u && 3 !== m.nodeType) || (f = d + u),
                    m !== c || (0 !== l && 3 !== m.nodeType) || (p = d + l),
                    3 === m.nodeType && (d += m.nodeValue.length),
                    null !== (b = m.firstChild);

                )
                  (v = m), (m = b);
                for (;;) {
                  if (m === a) break t;
                  if (
                    (v === s && ++h === u && (f = d),
                    v === c && ++g === l && (p = d),
                    null !== (b = m.nextSibling))
                  )
                    break;
                  v = (m = v).parentNode;
                }
                m = b;
              }
              s = -1 === f || -1 === p ? null : { start: f, end: p };
            } else s = null;
          }
        s = s || { start: 0, end: 0 };
      } else s = null;
      (bu = { activeElementDetached: null, focusedElem: a, selectionRange: s }),
        (lu = !1),
        (of = o);
      do {
        try {
          yv();
        } catch (e) {
          if (null === of) throw Error(Ff(330));
          xv(of, e), (of = of.nextEffect);
        }
      } while (null !== of);
      of = o;
      do {
        try {
          for (a = e, s = t; null !== of; ) {
            var y = of.effectTag;
            if ((16 & y && mp(of.stateNode, ""), 128 & y)) {
              var w = of.alternate;
              if (null !== w) {
                var _ = w.ref;
                null !== _ &&
                  ("function" == typeof _ ? _(null) : (_.current = null));
              }
            }
            switch (1038 & y) {
              case 2:
                Vm(of), (of.effectTag &= -3);
                break;
              case 6:
                Vm(of), (of.effectTag &= -3), Wm(of.alternate, of);
                break;
              case 1024:
                of.effectTag &= -1025;
                break;
              case 1028:
                (of.effectTag &= -1025), Wm(of.alternate, of);
                break;
              case 4:
                Wm(of.alternate, of);
                break;
              case 8:
                $m(a, (u = of), s), qm(u);
            }
            of = of.nextEffect;
          }
        } catch (e) {
          if (null === of) throw Error(Ff(330));
          xv(of, e), (of = of.nextEffect);
        }
      } while (null !== of);
      if (
        ((_ = bu),
        (w = ah()),
        (y = _.focusedElem),
        (s = _.selectionRange),
        w !== y &&
          y &&
          y.ownerDocument &&
          ih(y.ownerDocument.documentElement, y))
      ) {
        null !== s &&
          sh(y) &&
          ((w = s.start),
          void 0 === (_ = s.end) && (_ = w),
          "selectionStart" in y
            ? ((y.selectionStart = w),
              (y.selectionEnd = Math.min(_, y.value.length)))
            : (_ =
                ((w = y.ownerDocument || document) && w.defaultView) || window)
                .getSelection &&
              ((_ = _.getSelection()),
              (u = y.textContent.length),
              (a = Math.min(s.start, u)),
              (s = void 0 === s.end ? a : Math.min(s.end, u)),
              !_.extend && a > s && ((u = s), (s = a), (a = u)),
              (u = oh(y, a)),
              (c = oh(y, s)),
              u &&
                c &&
                (1 !== _.rangeCount ||
                  _.anchorNode !== u.node ||
                  _.anchorOffset !== u.offset ||
                  _.focusNode !== c.node ||
                  _.focusOffset !== c.offset) &&
                ((w = w.createRange()).setStart(u.node, u.offset),
                _.removeAllRanges(),
                a > s
                  ? (_.addRange(w), _.extend(c.node, c.offset))
                  : (w.setEnd(c.node, c.offset), _.addRange(w))))),
          (w = []);
        for (_ = y; (_ = _.parentNode); )
          1 === _.nodeType &&
            w.push({ element: _, left: _.scrollLeft, top: _.scrollTop });
        for (
          "function" == typeof y.focus && y.focus(), y = 0;
          y < w.length;
          y++
        )
          ((_ = w[y]).element.scrollLeft = _.left),
            (_.element.scrollTop = _.top);
      }
      (lu = !!vu), (bu = vu = null), (e.current = n), (of = o);
      do {
        try {
          for (y = e; null !== of; ) {
            var S = of.effectTag;
            if ((36 & S && jm(y, of.alternate, of), 128 & S)) {
              w = void 0;
              var x = of.ref;
              if (null !== x) {
                var P = of.stateNode;
                switch (of.tag) {
                  case 5:
                    w = P;
                    break;
                  default:
                    w = P;
                }
                "function" == typeof x ? x(w) : (x.current = w);
              }
            }
            of = of.nextEffect;
          }
        } catch (e) {
          if (null === of) throw Error(Ff(330));
          xv(of, e), (of = of.nextEffect);
        }
      } while (null !== of);
      (of = null), qc(), (Gd = i);
    } else e.current = n;
    if (uf) (uf = !1), (cf = e), (df = t);
    else
      for (of = o; null !== of; )
        (t = of.nextEffect), (of.nextEffect = null), (of = t);
    if (
      (0 === (t = e.firstPendingTime) && (lf = null),
      1073741823 === t ? (e === hf ? pf++ : ((pf = 0), (hf = e))) : (pf = 0),
      "function" == typeof vf && vf(n.stateNode, r),
      nv(e),
      af)
    )
      throw ((af = !1), (e = sf), (sf = null), e);
    return (Gd & Nd) !== Rd || ug(), null;
  }
  function yv() {
    for (; null !== of; ) {
      var e = of.effectTag;
      0 != (256 & e) && Nm(of.alternate, of),
        0 == (512 & e) ||
          uf ||
          ((uf = !0),
          sg(97, function () {
            return wv(), null;
          })),
        (of = of.nextEffect);
    }
  }
  function wv() {
    if (90 !== df) {
      var e = 97 < df ? 97 : df;
      return (df = 90), ag(e, _v);
    }
  }
  function _v() {
    if (null === cf) return !1;
    var e = cf;
    if (((cf = null), (Gd & (Bd | Ud)) !== Rd)) throw Error(Ff(331));
    var t = Gd;
    for (Gd |= Ud, e = e.current.firstEffect; null !== e; ) {
      try {
        var n = e;
        if (0 != (512 & n.effectTag))
          switch (n.tag) {
            case 0:
            case 11:
            case 15:
            case 22:
              Bm(5, n), Um(5, n);
          }
      } catch (t) {
        if (null === e) throw Error(Ff(330));
        xv(e, t);
      }
      (n = e.nextEffect), (e.nextEffect = null), (e = n);
    }
    return (Gd = t), ug(), !0;
  }
  function Sv(e, t, n) {
    _g(e, (t = Qm(e, (t = Om(n, t)), 1073741823))),
      null !== (e = ev(e, 1073741823)) && nv(e);
  }
  function xv(e, t) {
    if (3 === e.tag) Sv(e, e, t);
    else
      for (var n = e.return; null !== n; ) {
        if (3 === n.tag) {
          Sv(n, e, t);
          break;
        }
        if (1 === n.tag) {
          var r = n.stateNode;
          if (
            "function" == typeof n.type.getDerivedStateFromError ||
            ("function" == typeof r.componentDidCatch &&
              (null === lf || !lf.has(r)))
          ) {
            _g(n, (e = Jm(n, (e = Om(t, e)), 1073741823))),
              null !== (n = ev(n, 1073741823)) && nv(n);
            break;
          }
        }
        n = n.return;
      }
  }
  function Pv(e, t, n) {
    var r = e.pingCache;
    null !== r && r.delete(t),
      $d === e && Yd === n
        ? Qd === Vd || (Qd === Hd && 1073741823 === Kd && $c() - nf < rf)
          ? sv(e, Yd)
          : (tf = !0)
        : Rv(e, n) &&
          ((0 !== (t = e.lastPingedTime) && t < n) ||
            ((e.lastPingedTime = n), nv(e)));
  }
  function Dv(e, t) {
    var n = e.stateNode;
    null !== n && n.delete(t),
      0 === (t = 0) && (t = Xm((t = Km()), e, null)),
      null !== (e = ev(e, t)) && nv(e);
  }
  function kv(e, t, n, r) {
    (this.tag = e),
      (this.key = n),
      (this.sibling =
        this.child =
        this.return =
        this.stateNode =
        this.type =
        this.elementType =
          null),
      (this.index = 0),
      (this.ref = null),
      (this.pendingProps = t),
      (this.dependencies =
        this.memoizedState =
        this.updateQueue =
        this.memoizedProps =
          null),
      (this.mode = r),
      (this.effectTag = 0),
      (this.lastEffect = this.firstEffect = this.nextEffect = null),
      (this.childExpirationTime = this.expirationTime = 0),
      (this.alternate = null);
  }
  function Ev(e, t, n, r) {
    return new kv(e, t, n, r);
  }
  function Tv(e) {
    return !(!(e = e.prototype) || !e.isReactComponent);
  }
  function Iv(e, t) {
    var n = e.alternate;
    return (
      null === n
        ? (((n = Ev(e.tag, t, e.key, e.mode)).elementType = e.elementType),
          (n.type = e.type),
          (n.stateNode = e.stateNode),
          (n.alternate = e),
          (e.alternate = n))
        : ((n.pendingProps = t),
          (n.effectTag = 0),
          (n.nextEffect = null),
          (n.firstEffect = null),
          (n.lastEffect = null)),
      (n.childExpirationTime = e.childExpirationTime),
      (n.expirationTime = e.expirationTime),
      (n.child = e.child),
      (n.memoizedProps = e.memoizedProps),
      (n.memoizedState = e.memoizedState),
      (n.updateQueue = e.updateQueue),
      (t = e.dependencies),
      (n.dependencies =
        null === t
          ? null
          : {
              expirationTime: t.expirationTime,
              firstContext: t.firstContext,
              responders: t.responders,
            }),
      (n.sibling = e.sibling),
      (n.index = e.index),
      (n.ref = e.ref),
      n
    );
  }
  function Cv(e, t, n, r, o, i) {
    var a = 2;
    if (((r = e), "function" == typeof e)) Tv(e) && (a = 1);
    else if ("string" == typeof e) a = 5;
    else
      e: switch (e) {
        case hl:
          return Fv(n.children, o, i, t);
        case yl:
          (a = 8), (o |= 7);
          break;
        case gl:
          (a = 8), (o |= 1);
          break;
        case ml:
          return (
            ((e = Ev(12, n, t, 8 | o)).elementType = ml),
            (e.type = ml),
            (e.expirationTime = i),
            e
          );
        case _l:
          return (
            ((e = Ev(13, n, t, o)).type = _l),
            (e.elementType = _l),
            (e.expirationTime = i),
            e
          );
        case Sl:
          return (
            ((e = Ev(19, n, t, o)).elementType = Sl), (e.expirationTime = i), e
          );
        default:
          if ("object" == typeof e && null !== e)
            switch (e.$$typeof) {
              case vl:
                a = 10;
                break e;
              case bl:
                a = 9;
                break e;
              case wl:
                a = 11;
                break e;
              case xl:
                a = 14;
                break e;
              case Pl:
                (a = 16), (r = null);
                break e;
              case Dl:
                a = 22;
                break e;
            }
          throw Error(Ff(130, null == e ? e : typeof e, ""));
      }
    return (
      ((t = Ev(a, n, t, o)).elementType = e),
      (t.type = r),
      (t.expirationTime = i),
      t
    );
  }
  function Fv(e, t, n, r) {
    return ((e = Ev(7, e, r, t)).expirationTime = n), e;
  }
  function Av(e, t, n) {
    return ((e = Ev(6, e, null, t)).expirationTime = n), e;
  }
  function Ov(e, t, n) {
    return (
      ((t = Ev(
        4,
        null !== e.children ? e.children : [],
        e.key,
        t
      )).expirationTime = n),
      (t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation,
      }),
      t
    );
  }
  function Mv(e, t, n) {
    (this.tag = t),
      (this.current = null),
      (this.containerInfo = e),
      (this.pingCache = this.pendingChildren = null),
      (this.finishedExpirationTime = 0),
      (this.finishedWork = null),
      (this.timeoutHandle = -1),
      (this.pendingContext = this.context = null),
      (this.hydrate = n),
      (this.callbackNode = null),
      (this.callbackPriority = 90),
      (this.lastExpiredTime =
        this.lastPingedTime =
        this.nextKnownPendingLevel =
        this.lastSuspendedTime =
        this.firstSuspendedTime =
        this.firstPendingTime =
          0);
  }
  function Rv(e, t) {
    var n = e.firstSuspendedTime;
    return (e = e.lastSuspendedTime), 0 !== n && n >= t && e <= t;
  }
  function Nv(e, t) {
    var n = e.firstSuspendedTime,
      r = e.lastSuspendedTime;
    n < t && (e.firstSuspendedTime = t),
      (r > t || 0 === n) && (e.lastSuspendedTime = t),
      t <= e.lastPingedTime && (e.lastPingedTime = 0),
      t <= e.lastExpiredTime && (e.lastExpiredTime = 0);
  }
  function Bv(e, t) {
    t > e.firstPendingTime && (e.firstPendingTime = t);
    var n = e.firstSuspendedTime;
    0 !== n &&
      (t >= n
        ? (e.firstSuspendedTime =
            e.lastSuspendedTime =
            e.nextKnownPendingLevel =
              0)
        : t >= e.lastSuspendedTime && (e.lastSuspendedTime = t + 1),
      t > e.nextKnownPendingLevel && (e.nextKnownPendingLevel = t));
  }
  function Uv(e, t) {
    var n = e.lastExpiredTime;
    (0 === n || n > t) && (e.lastExpiredTime = t);
  }
  function jv(e, t, n, r) {
    var o = t.current,
      i = Km(),
      a = Xc.suspense;
    i = Xm(i, o, a);
    e: if (n) {
      t: {
        if (wp((n = n._reactInternalFiber)) !== n || 1 !== n.tag)
          throw Error(Ff(170));
        var s = n;
        do {
          switch (s.tag) {
            case 3:
              s = s.stateNode.context;
              break t;
            case 1:
              if (Xh(s.type)) {
                s = s.stateNode.__reactInternalMemoizedMergedChildContext;
                break t;
              }
          }
          s = s.return;
        } while (null !== s);
        throw Error(Ff(171));
      }
      if (1 === n.tag) {
        var l = n.type;
        if (Xh(l)) {
          n = tg(n, l, s);
          break e;
        }
      }
      n = s;
    } else n = Pc;
    return (
      null === t.context ? (t.context = n) : (t.pendingContext = n),
      ((t = wg(i, a)).payload = { element: e }),
      null !== (r = void 0 === r ? null : r) && (t.callback = r),
      _g(o, t),
      Zm(o, i),
      i
    );
  }
  function Lv(e) {
    if (!(e = e.current).child) return null;
    switch (e.child.tag) {
      case 5:
      default:
        return e.child.stateNode;
    }
  }
  function qv(e, t) {
    null !== (e = e.memoizedState) &&
      null !== e.dehydrated &&
      e.retryTime < t &&
      (e.retryTime = t);
  }
  function Hv(e, t) {
    qv(e, t), (e = e.alternate) && qv(e, t);
  }
  function Vv(e, t, n) {
    var r = new Mv(e, t, (n = null != n && !0 === n.hydrate)),
      o = Ev(3, null, null, 2 === t ? 7 : 1 === t ? 3 : 0);
    (r.current = o),
      (o.stateNode = r),
      bg(o),
      (e[Pu] = r.current),
      n &&
        0 !== t &&
        (function (e, t) {
          var n = yp(t);
          Xl.forEach(function (e) {
            Op(e, t, n);
          }),
            Zl.forEach(function (e) {
              Op(e, t, n);
            });
        })(0, 9 === e.nodeType ? e : e.ownerDocument),
      (this._internalRoot = r);
  }
  function zv(e) {
    return !(
      !e ||
      (1 !== e.nodeType &&
        9 !== e.nodeType &&
        11 !== e.nodeType &&
        (8 !== e.nodeType || " react-mount-point-unstable " !== e.nodeValue))
    );
  }
  function Gv(e, t, n, r, o) {
    var i = n._reactRootContainer;
    if (i) {
      var a = i._internalRoot;
      if ("function" == typeof o) {
        var s = o;
        o = function () {
          var e = Lv(a);
          s.call(e);
        };
      }
      jv(t, a, e, o);
    } else {
      if (
        ((i = n._reactRootContainer =
          (function (e, t) {
            if (
              (t ||
                (t = !(
                  !(t = e
                    ? 9 === e.nodeType
                      ? e.documentElement
                      : e.firstChild
                    : null) ||
                  1 !== t.nodeType ||
                  !t.hasAttribute("data-reactroot")
                )),
              !t)
            )
              for (var n; (n = e.lastChild); ) e.removeChild(n);
            return new Vv(e, 0, t ? { hydrate: !0 } : void 0);
          })(n, r)),
        (a = i._internalRoot),
        "function" == typeof o)
      ) {
        var l = o;
        o = function () {
          var e = Lv(a);
          l.call(e);
        };
      }
      av(function () {
        jv(t, a, e, o);
      });
    }
    return Lv(a);
  }
  function $v(e, t, n) {
    var r =
      3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
    return {
      $$typeof: pl,
      key: null == r ? null : "" + r,
      children: e,
      containerInfo: t,
      implementation: n,
    };
  }
  function Wv(e, t) {
    var n =
      2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
    if (!zv(t)) throw Error(Ff(200));
    return $v(e, t, null, n);
  }
  function Yv() {
    if (((Os = {}), (Ms = Fo()), (Rs = dr()), As(), !Ms)) throw Error(Ff(227));
    var e;
    (Ns = !1),
      (Bs = null),
      (Us = !1),
      (js = null),
      (Ls = {
        onError: function (e) {
          (Ns = !0), (Bs = e);
        },
      }),
      (qs = null),
      (Hs = null),
      (Vs = null),
      (zs = null),
      (Gs = {}),
      ($s = []),
      (Ws = {}),
      (Ys = {}),
      (Qs = {}),
      (Js = !(
        "undefined" == typeof window ||
        void 0 === window.document ||
        void 0 === window.document.createElement
      )),
      (Ks = null),
      (Xs = null),
      (Zs = null),
      (el = qf),
      (tl = !1),
      (nl = !1),
      (rl =
        /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/),
      (ol = Object.prototype.hasOwnProperty),
      (il = {}),
      (al = {}),
      (sl = {}),
      "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
        .split(" ")
        .forEach(function (e) {
          sl[e] = new $f(e, 0, !1, e, null, !1);
        }),
      [
        ["acceptCharset", "accept-charset"],
        ["className", "class"],
        ["htmlFor", "for"],
        ["httpEquiv", "http-equiv"],
      ].forEach(function (e) {
        var t = e[0];
        sl[t] = new $f(t, 1, !1, e[1], null, !1);
      }),
      ["contentEditable", "draggable", "spellCheck", "value"].forEach(function (
        e
      ) {
        sl[e] = new $f(e, 2, !1, e.toLowerCase(), null, !1);
      }),
      [
        "autoReverse",
        "externalResourcesRequired",
        "focusable",
        "preserveAlpha",
      ].forEach(function (e) {
        sl[e] = new $f(e, 2, !1, e, null, !1);
      }),
      "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
        .split(" ")
        .forEach(function (e) {
          sl[e] = new $f(e, 3, !1, e.toLowerCase(), null, !1);
        }),
      ["checked", "multiple", "muted", "selected"].forEach(function (e) {
        sl[e] = new $f(e, 3, !0, e, null, !1);
      }),
      ["capture", "download"].forEach(function (e) {
        sl[e] = new $f(e, 4, !1, e, null, !1);
      }),
      ["cols", "rows", "size", "span"].forEach(function (e) {
        sl[e] = new $f(e, 6, !1, e, null, !1);
      }),
      ["rowSpan", "start"].forEach(function (e) {
        sl[e] = new $f(e, 5, !1, e.toLowerCase(), null, !1);
      }),
      (ll = /[\-:]([a-z])/g),
      "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
        .split(" ")
        .forEach(function (e) {
          var t = e.replace(ll, Wf);
          sl[t] = new $f(t, 1, !1, e, null, !1);
        }),
      "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
        .split(" ")
        .forEach(function (e) {
          var t = e.replace(ll, Wf);
          sl[t] = new $f(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1);
        }),
      ["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
        var t = e.replace(ll, Wf);
        sl[t] = new $f(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1);
      }),
      ["tabIndex", "crossOrigin"].forEach(function (e) {
        sl[e] = new $f(e, 1, !1, e.toLowerCase(), null, !1);
      }),
      (sl.xlinkHref = new $f(
        "xlinkHref",
        1,
        !1,
        "xlink:href",
        "http://www.w3.org/1999/xlink",
        !0
      )),
      ["src", "href", "action", "formAction"].forEach(function (e) {
        sl[e] = new $f(e, 1, !1, e.toLowerCase(), null, !0);
      }),
      (ul =
        Ms.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED).hasOwnProperty(
        "ReactCurrentDispatcher"
      ) || (ul.ReactCurrentDispatcher = { current: null }),
      ul.hasOwnProperty("ReactCurrentBatchConfig") ||
        (ul.ReactCurrentBatchConfig = { suspense: null }),
      (cl = /^(.*)[\\\/]/),
      (dl = "function" == typeof Symbol && Symbol.for),
      (fl = dl ? Symbol.for("react.element") : 60103),
      (pl = dl ? Symbol.for("react.portal") : 60106),
      (hl = dl ? Symbol.for("react.fragment") : 60107),
      (gl = dl ? Symbol.for("react.strict_mode") : 60108),
      (ml = dl ? Symbol.for("react.profiler") : 60114),
      (vl = dl ? Symbol.for("react.provider") : 60109),
      (bl = dl ? Symbol.for("react.context") : 60110),
      (yl = dl ? Symbol.for("react.concurrent_mode") : 60111),
      (wl = dl ? Symbol.for("react.forward_ref") : 60112),
      (_l = dl ? Symbol.for("react.suspense") : 60113),
      (Sl = dl ? Symbol.for("react.suspense_list") : 60120),
      (xl = dl ? Symbol.for("react.memo") : 60115),
      (Pl = dl ? Symbol.for("react.lazy") : 60116),
      (Dl = dl ? Symbol.for("react.block") : 60121),
      (kl = "function" == typeof Symbol && Symbol.iterator),
      (El = {
        html: "http://www.w3.org/1999/xhtml",
        mathml: "http://www.w3.org/1998/Math/MathML",
        svg: "http://www.w3.org/2000/svg",
      }),
      (e = function (e, t) {
        if (e.namespaceURI !== El.svg || "innerHTML" in e) e.innerHTML = t;
        else {
          for (
            (Tl = Tl || document.createElement("div")).innerHTML =
              "<svg>" + t.valueOf().toString() + "</svg>",
              t = Tl.firstChild;
            e.firstChild;

          )
            e.removeChild(e.firstChild);
          for (; t.firstChild; ) e.appendChild(t.firstChild);
        }
      }),
      (Il =
        "undefined" != typeof MSApp && MSApp.execUnsafeLocalFunction
          ? function (t, n, r, o) {
              MSApp.execUnsafeLocalFunction(function () {
                return e(t, n);
              });
            }
          : e),
      (Cl = {
        animationend: vp("Animation", "AnimationEnd"),
        animationiteration: vp("Animation", "AnimationIteration"),
        animationstart: vp("Animation", "AnimationStart"),
        transitionend: vp("Transition", "TransitionEnd"),
      }),
      (Fl = {}),
      (Al = {}),
      Js &&
        ((Al = document.createElement("div").style),
        "AnimationEvent" in window ||
          (delete Cl.animationend.animation,
          delete Cl.animationiteration.animation,
          delete Cl.animationstart.animation),
        "TransitionEvent" in window || delete Cl.transitionend.transition),
      (Ol = bp("animationend")),
      (Ml = bp("animationiteration")),
      (Rl = bp("animationstart")),
      (Nl = bp("transitionend")),
      (Bl =
        "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange seeked seeking stalled suspend timeupdate volumechange waiting".split(
          " "
        )),
      (Ul = new ("function" == typeof WeakMap ? WeakMap : Map)()),
      (jl = null),
      (Ll = []),
      (zl = !1),
      (Gl = []),
      ($l = null),
      (Wl = null),
      (Yl = null),
      (Ql = new Map()),
      (Jl = new Map()),
      (Kl = []),
      (Xl =
        "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput close cancel copy cut paste click change contextmenu reset submit".split(
          " "
        )),
      (Zl =
        "focus blur dragenter dragleave mouseover mouseout pointerover pointerout gotpointercapture lostpointercapture".split(
          " "
        )),
      (eu = {}),
      (tu = new Map()),
      (nu = new Map()),
      (ru = [
        "abort",
        "abort",
        Ol,
        "animationEnd",
        Ml,
        "animationIteration",
        Rl,
        "animationStart",
        "canplay",
        "canPlay",
        "canplaythrough",
        "canPlayThrough",
        "durationchange",
        "durationChange",
        "emptied",
        "emptied",
        "encrypted",
        "encrypted",
        "ended",
        "ended",
        "error",
        "error",
        "gotpointercapture",
        "gotPointerCapture",
        "load",
        "load",
        "loadeddata",
        "loadedData",
        "loadedmetadata",
        "loadedMetadata",
        "loadstart",
        "loadStart",
        "lostpointercapture",
        "lostPointerCapture",
        "playing",
        "playing",
        "progress",
        "progress",
        "seeking",
        "seeking",
        "stalled",
        "stalled",
        "suspend",
        "suspend",
        "timeupdate",
        "timeUpdate",
        Nl,
        "transitionEnd",
        "waiting",
        "waiting",
      ]),
      Vp(
        "blur blur cancel cancel click click close close contextmenu contextMenu copy copy cut cut auxclick auxClick dblclick doubleClick dragend dragEnd dragstart dragStart drop drop focus focus input input invalid invalid keydown keyDown keypress keyPress keyup keyUp mousedown mouseDown mouseup mouseUp paste paste pause pause play play pointercancel pointerCancel pointerdown pointerDown pointerup pointerUp ratechange rateChange reset reset seeked seeked submit submit touchcancel touchCancel touchend touchEnd touchstart touchStart volumechange volumeChange".split(
          " "
        ),
        0
      ),
      Vp(
        "drag drag dragenter dragEnter dragexit dragExit dragleave dragLeave dragover dragOver mousemove mouseMove mouseout mouseOut mouseover mouseOver pointermove pointerMove pointerout pointerOut pointerover pointerOver scroll scroll toggle toggle touchmove touchMove wheel wheel".split(
          " "
        ),
        1
      ),
      Vp(ru, 2);
    for (
      ou =
        "change selectionchange textInput compositionstart compositionend compositionupdate".split(
          " "
        ),
        iu = 0;
      iu < ou.length;
      iu++
    )
      nu.set(ou[iu], 0);
    if (
      ((au = As().unstable_UserBlockingPriority),
      (su = As().unstable_runWithPriority),
      (lu = !0),
      (uu = {
        animationIterationCount: !0,
        borderImageOutset: !0,
        borderImageSlice: !0,
        borderImageWidth: !0,
        boxFlex: !0,
        boxFlexGroup: !0,
        boxOrdinalGroup: !0,
        columnCount: !0,
        columns: !0,
        flex: !0,
        flexGrow: !0,
        flexPositive: !0,
        flexShrink: !0,
        flexNegative: !0,
        flexOrder: !0,
        gridArea: !0,
        gridRow: !0,
        gridRowEnd: !0,
        gridRowSpan: !0,
        gridRowStart: !0,
        gridColumn: !0,
        gridColumnEnd: !0,
        gridColumnSpan: !0,
        gridColumnStart: !0,
        fontWeight: !0,
        lineClamp: !0,
        lineHeight: !0,
        opacity: !0,
        order: !0,
        orphans: !0,
        tabSize: !0,
        widows: !0,
        zIndex: !0,
        zoom: !0,
        fillOpacity: !0,
        floodOpacity: !0,
        stopOpacity: !0,
        strokeDasharray: !0,
        strokeDashoffset: !0,
        strokeMiterlimit: !0,
        strokeOpacity: !0,
        strokeWidth: !0,
      }),
      (cu = ["Webkit", "ms", "Moz", "O"]),
      Object.keys(uu).forEach(function (e) {
        cu.forEach(function (t) {
          (t = t + e.charAt(0).toUpperCase() + e.substring(1)), (uu[t] = uu[e]);
        });
      }),
      (du = Rs(
        { menuitem: !0 },
        {
          area: !0,
          base: !0,
          br: !0,
          col: !0,
          embed: !0,
          hr: !0,
          img: !0,
          input: !0,
          keygen: !0,
          link: !0,
          meta: !0,
          param: !0,
          source: !0,
          track: !0,
          wbr: !0,
        }
      )),
      (fu = El.html),
      (pu = "$"),
      (hu = "/$"),
      (gu = "$?"),
      (mu = "$!"),
      (vu = null),
      (bu = null),
      (yu = "function" == typeof setTimeout ? setTimeout : void 0),
      (wu = "function" == typeof clearTimeout ? clearTimeout : void 0),
      (_u = Math.random().toString(36).slice(2)),
      (Su = "__reactInternalInstance$" + _u),
      (xu = "__reactEventHandlers$" + _u),
      (Pu = "__reactContainere$" + _u),
      (Du = null),
      (ku = null),
      (Eu = null),
      Rs(kh.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var e = this.nativeEvent;
          e &&
            (e.preventDefault
              ? e.preventDefault()
              : "unknown" != typeof e.returnValue && (e.returnValue = !1),
            (this.isDefaultPrevented = Ph));
        },
        stopPropagation: function () {
          var e = this.nativeEvent;
          e &&
            (e.stopPropagation
              ? e.stopPropagation()
              : "unknown" != typeof e.cancelBubble && (e.cancelBubble = !0),
            (this.isPropagationStopped = Ph));
        },
        persist: function () {
          this.isPersistent = Ph;
        },
        isPersistent: Dh,
        destructor: function () {
          var e,
            t = this.constructor.Interface;
          for (e in t) this[e] = null;
          (this.nativeEvent = this._targetInst = this.dispatchConfig = null),
            (this.isPropagationStopped = this.isDefaultPrevented = Dh),
            (this._dispatchInstances = this._dispatchListeners = null);
        },
      }),
      (kh.Interface = {
        type: null,
        target: null,
        currentTarget: function () {
          return null;
        },
        eventPhase: null,
        bubbles: null,
        cancelable: null,
        timeStamp: function (e) {
          return e.timeStamp || Date.now();
        },
        defaultPrevented: null,
        isTrusted: null,
      }),
      (kh.extend = function (e) {
        function t() {}
        function n() {
          return r.apply(this, arguments);
        }
        var r = this;
        t.prototype = r.prototype;
        var o = new t();
        return (
          Rs(o, n.prototype),
          (n.prototype = o),
          (n.prototype.constructor = n),
          (n.Interface = Rs({}, r.Interface, e)),
          (n.extend = r.extend),
          Ih(n),
          n
        );
      }),
      Ih(kh),
      (Tu = kh.extend({ data: null })),
      (Iu = kh.extend({ data: null })),
      (Cu = [9, 13, 27, 32]),
      (Fu = Js && "CompositionEvent" in window),
      (Au = null),
      Js && "documentMode" in document && (Au = document.documentMode),
      (Ou = Js && "TextEvent" in window && !Au),
      (Mu = Js && (!Fu || (Au && 8 < Au && 11 >= Au))),
      (Ru = String.fromCharCode(32)),
      (Nu = {
        beforeInput: {
          phasedRegistrationNames: {
            bubbled: "onBeforeInput",
            captured: "onBeforeInputCapture",
          },
          dependencies: ["compositionend", "keypress", "textInput", "paste"],
        },
        compositionEnd: {
          phasedRegistrationNames: {
            bubbled: "onCompositionEnd",
            captured: "onCompositionEndCapture",
          },
          dependencies:
            "blur compositionend keydown keypress keyup mousedown".split(" "),
        },
        compositionStart: {
          phasedRegistrationNames: {
            bubbled: "onCompositionStart",
            captured: "onCompositionStartCapture",
          },
          dependencies:
            "blur compositionstart keydown keypress keyup mousedown".split(" "),
        },
        compositionUpdate: {
          phasedRegistrationNames: {
            bubbled: "onCompositionUpdate",
            captured: "onCompositionUpdateCapture",
          },
          dependencies:
            "blur compositionupdate keydown keypress keyup mousedown".split(
              " "
            ),
        },
      }),
      (Bu = !1),
      (Uu = !1),
      (ju = {
        eventTypes: Nu,
        extractEvents: function (e, t, n, r) {
          var o;
          if (Fu)
            e: {
              switch (e) {
                case "compositionstart":
                  var i = Nu.compositionStart;
                  break e;
                case "compositionend":
                  i = Nu.compositionEnd;
                  break e;
                case "compositionupdate":
                  i = Nu.compositionUpdate;
                  break e;
              }
              i = void 0;
            }
          else
            Uu
              ? Ch(e, n) && (i = Nu.compositionEnd)
              : "keydown" === e &&
                229 === n.keyCode &&
                (i = Nu.compositionStart);
          return (
            i
              ? (Mu &&
                  "ko" !== n.locale &&
                  (Uu || i !== Nu.compositionStart
                    ? i === Nu.compositionEnd && Uu && (o = xh())
                    : ((ku = "value" in (Du = r) ? Du.value : Du.textContent),
                      (Uu = !0))),
                (i = Tu.getPooled(i, t, n, r)),
                o ? (i.data = o) : null !== (o = Fh(n)) && (i.data = o),
                Sh(i),
                (o = i))
              : (o = null),
            (e = Ou
              ? (function (e, t) {
                  switch (e) {
                    case "compositionend":
                      return Fh(t);
                    case "keypress":
                      return 32 !== t.which ? null : ((Bu = !0), Ru);
                    case "textInput":
                      return (e = t.data) === Ru && Bu ? null : e;
                    default:
                      return null;
                  }
                })(e, n)
              : (function (e, t) {
                  if (Uu)
                    return "compositionend" === e || (!Fu && Ch(e, t))
                      ? ((e = xh()), (Eu = ku = Du = null), (Uu = !1), e)
                      : null;
                  switch (e) {
                    case "paste":
                      return null;
                    case "keypress":
                      if (
                        !(t.ctrlKey || t.altKey || t.metaKey) ||
                        (t.ctrlKey && t.altKey)
                      ) {
                        if (t.char && 1 < t.char.length) return t.char;
                        if (t.which) return String.fromCharCode(t.which);
                      }
                      return null;
                    case "compositionend":
                      return Mu && "ko" !== t.locale ? null : t.data;
                    default:
                      return null;
                  }
                })(e, n))
              ? (((t = Iu.getPooled(Nu.beforeInput, t, n, r)).data = e), Sh(t))
              : (t = null),
            null === o ? t : null === t ? o : [o, t]
          );
        },
      }),
      (Lu = {
        color: !0,
        date: !0,
        datetime: !0,
        "datetime-local": !0,
        email: !0,
        month: !0,
        number: !0,
        password: !0,
        range: !0,
        search: !0,
        tel: !0,
        text: !0,
        time: !0,
        url: !0,
        week: !0,
      }),
      (qu = {
        change: {
          phasedRegistrationNames: {
            bubbled: "onChange",
            captured: "onChangeCapture",
          },
          dependencies:
            "blur change click focus input keydown keyup selectionchange".split(
              " "
            ),
        },
      }),
      (Hu = null),
      (Vu = null),
      (zu = !1),
      Js &&
        (zu =
          Ip("input") && (!document.documentMode || 9 < document.documentMode)),
      (Gu = {
        eventTypes: qu,
        _isInputEventSupported: zu,
        extractEvents: function (e, t, n, r) {
          var o = t ? hh(t) : window,
            i = o.nodeName && o.nodeName.toLowerCase();
          if ("select" === i || ("input" === i && "file" === o.type))
            var a = Nh;
          else if (Ah(o))
            if (zu) a = Hh;
            else {
              a = Lh;
              var s = jh;
            }
          else
            (i = o.nodeName) &&
              "input" === i.toLowerCase() &&
              ("checkbox" === o.type || "radio" === o.type) &&
              (a = qh);
          if (a && (a = a(e, t))) return Oh(a, n, r);
          s && s(e, o, t),
            "blur" === e &&
              (e = o._wrapperState) &&
              e.controlled &&
              "number" === o.type &&
              sp(o, "number", o.value);
        },
      }),
      ($u = kh.extend({ view: null, detail: null })),
      (Wu = {
        Alt: "altKey",
        Control: "ctrlKey",
        Meta: "metaKey",
        Shift: "shiftKey",
      }),
      (Yu = 0),
      (Qu = 0),
      (Ju = !1),
      (Ku = !1),
      (Xu = $u.extend({
        screenX: null,
        screenY: null,
        clientX: null,
        clientY: null,
        pageX: null,
        pageY: null,
        ctrlKey: null,
        shiftKey: null,
        altKey: null,
        metaKey: null,
        getModifierState: zh,
        button: null,
        buttons: null,
        relatedTarget: function (e) {
          return (
            e.relatedTarget ||
            (e.fromElement === e.srcElement ? e.toElement : e.fromElement)
          );
        },
        movementX: function (e) {
          if ("movementX" in e) return e.movementX;
          var t = Yu;
          return (
            (Yu = e.screenX),
            Ju ? ("mousemove" === e.type ? e.screenX - t : 0) : ((Ju = !0), 0)
          );
        },
        movementY: function (e) {
          if ("movementY" in e) return e.movementY;
          var t = Qu;
          return (
            (Qu = e.screenY),
            Ku ? ("mousemove" === e.type ? e.screenY - t : 0) : ((Ku = !0), 0)
          );
        },
      })),
      (Zu = Xu.extend({
        pointerId: null,
        width: null,
        height: null,
        pressure: null,
        tangentialPressure: null,
        tiltX: null,
        tiltY: null,
        twist: null,
        pointerType: null,
        isPrimary: null,
      })),
      (tc = {
        eventTypes: (ec = {
          mouseEnter: {
            registrationName: "onMouseEnter",
            dependencies: ["mouseout", "mouseover"],
          },
          mouseLeave: {
            registrationName: "onMouseLeave",
            dependencies: ["mouseout", "mouseover"],
          },
          pointerEnter: {
            registrationName: "onPointerEnter",
            dependencies: ["pointerout", "pointerover"],
          },
          pointerLeave: {
            registrationName: "onPointerLeave",
            dependencies: ["pointerout", "pointerover"],
          },
        }),
        extractEvents: function (e, t, n, r, o) {
          var i = "mouseover" === e || "pointerover" === e,
            a = "mouseout" === e || "pointerout" === e;
          if (
            (i && 0 == (32 & o) && (n.relatedTarget || n.fromElement)) ||
            (!a && !i)
          )
            return null;
          ((i =
            r.window === r
              ? r
              : (i = r.ownerDocument)
              ? i.defaultView || i.parentWindow
              : window),
          a)
            ? ((a = t),
              null !==
                (t = (t = n.relatedTarget || n.toElement) ? fh(t) : null) &&
                (t !== wp(t) || (5 !== t.tag && 6 !== t.tag)) &&
                (t = null))
            : (a = null);
          if (a === t) return null;
          if ("mouseout" === e || "mouseover" === e)
            var s = Xu,
              l = ec.mouseLeave,
              u = ec.mouseEnter,
              c = "mouse";
          else
            ("pointerout" !== e && "pointerover" !== e) ||
              ((s = Zu),
              (l = ec.pointerLeave),
              (u = ec.pointerEnter),
              (c = "pointer"));
          if (
            ((e = null == a ? i : hh(a)),
            (i = null == t ? i : hh(t)),
            ((l = s.getPooled(l, a, n, r)).type = c + "leave"),
            (l.target = e),
            (l.relatedTarget = i),
            ((n = s.getPooled(u, t, n, r)).type = c + "enter"),
            (n.target = i),
            (n.relatedTarget = e),
            (c = t),
            (r = a) && c)
          )
            e: {
              for (u = c, a = 0, e = s = r; e; e = mh(e)) a++;
              for (e = 0, t = u; t; t = mh(t)) e++;
              for (; 0 < a - e; ) (s = mh(s)), a--;
              for (; 0 < e - a; ) (u = mh(u)), e--;
              for (; a--; ) {
                if (s === u || s === u.alternate) break e;
                (s = mh(s)), (u = mh(u));
              }
              s = null;
            }
          else s = null;
          for (
            u = s, s = [];
            r && r !== u && (null === (a = r.alternate) || a !== u);

          )
            s.push(r), (r = mh(r));
          for (
            r = [];
            c && c !== u && (null === (a = c.alternate) || a !== u);

          )
            r.push(c), (c = mh(c));
          for (c = 0; c < s.length; c++) wh(s[c], "bubbled", l);
          for (c = r.length; 0 < c--; ) wh(r[c], "captured", n);
          return 0 == (64 & o) ? [l] : [l, n];
        },
      }),
      (nc = "function" == typeof Object.is ? Object.is : Gh),
      (rc = Object.prototype.hasOwnProperty),
      (oc = Js && "documentMode" in document && 11 >= document.documentMode),
      (ic = {
        select: {
          phasedRegistrationNames: {
            bubbled: "onSelect",
            captured: "onSelectCapture",
          },
          dependencies:
            "blur contextmenu dragend focus keydown keyup mousedown mouseup selectionchange".split(
              " "
            ),
        },
      }),
      (ac = null),
      (sc = null),
      (lc = null),
      (uc = !1),
      (cc = {
        eventTypes: ic,
        extractEvents: function (e, t, n, r, o, i) {
          if (
            !(i = !(o =
              i ||
              (r.window === r
                ? r.document
                : 9 === r.nodeType
                ? r
                : r.ownerDocument)))
          ) {
            e: {
              (o = yp(o)), (i = Qs.onSelect);
              for (var a = 0; a < i.length; a++)
                if (!o.has(i[a])) {
                  o = !1;
                  break e;
                }
              o = !0;
            }
            i = !o;
          }
          if (i) return null;
          switch (((o = t ? hh(t) : window), e)) {
            case "focus":
              (Ah(o) || "true" === o.contentEditable) &&
                ((ac = o), (sc = t), (lc = null));
              break;
            case "blur":
              lc = sc = ac = null;
              break;
            case "mousedown":
              uc = !0;
              break;
            case "contextmenu":
            case "mouseup":
            case "dragend":
              return (uc = !1), Wh(n, r);
            case "selectionchange":
              if (oc) break;
            case "keydown":
            case "keyup":
              return Wh(n, r);
          }
          return null;
        },
      }),
      (dc = kh.extend({
        animationName: null,
        elapsedTime: null,
        pseudoElement: null,
      })),
      (fc = kh.extend({
        clipboardData: function (e) {
          return "clipboardData" in e ? e.clipboardData : window.clipboardData;
        },
      })),
      (pc = $u.extend({ relatedTarget: null })),
      (hc = {
        Esc: "Escape",
        Spacebar: " ",
        Left: "ArrowLeft",
        Up: "ArrowUp",
        Right: "ArrowRight",
        Down: "ArrowDown",
        Del: "Delete",
        Win: "OS",
        Menu: "ContextMenu",
        Apps: "ContextMenu",
        Scroll: "ScrollLock",
        MozPrintableKey: "Unidentified",
      }),
      (gc = {
        8: "Backspace",
        9: "Tab",
        12: "Clear",
        13: "Enter",
        16: "Shift",
        17: "Control",
        18: "Alt",
        19: "Pause",
        20: "CapsLock",
        27: "Escape",
        32: " ",
        33: "PageUp",
        34: "PageDown",
        35: "End",
        36: "Home",
        37: "ArrowLeft",
        38: "ArrowUp",
        39: "ArrowRight",
        40: "ArrowDown",
        45: "Insert",
        46: "Delete",
        112: "F1",
        113: "F2",
        114: "F3",
        115: "F4",
        116: "F5",
        117: "F6",
        118: "F7",
        119: "F8",
        120: "F9",
        121: "F10",
        122: "F11",
        123: "F12",
        144: "NumLock",
        145: "ScrollLock",
        224: "Meta",
      }),
      (mc = $u.extend({
        key: function (e) {
          if (e.key) {
            var t = hc[e.key] || e.key;
            if ("Unidentified" !== t) return t;
          }
          return "keypress" === e.type
            ? 13 === (e = Yh(e))
              ? "Enter"
              : String.fromCharCode(e)
            : "keydown" === e.type || "keyup" === e.type
            ? gc[e.keyCode] || "Unidentified"
            : "";
        },
        location: null,
        ctrlKey: null,
        shiftKey: null,
        altKey: null,
        metaKey: null,
        repeat: null,
        locale: null,
        getModifierState: zh,
        charCode: function (e) {
          return "keypress" === e.type ? Yh(e) : 0;
        },
        keyCode: function (e) {
          return "keydown" === e.type || "keyup" === e.type ? e.keyCode : 0;
        },
        which: function (e) {
          return "keypress" === e.type
            ? Yh(e)
            : "keydown" === e.type || "keyup" === e.type
            ? e.keyCode
            : 0;
        },
      })),
      (vc = Xu.extend({ dataTransfer: null })),
      (bc = $u.extend({
        touches: null,
        targetTouches: null,
        changedTouches: null,
        altKey: null,
        metaKey: null,
        ctrlKey: null,
        shiftKey: null,
        getModifierState: zh,
      })),
      (yc = kh.extend({
        propertyName: null,
        elapsedTime: null,
        pseudoElement: null,
      })),
      (wc = Xu.extend({
        deltaX: function (e) {
          return "deltaX" in e
            ? e.deltaX
            : "wheelDeltaX" in e
            ? -e.wheelDeltaX
            : 0;
        },
        deltaY: function (e) {
          return "deltaY" in e
            ? e.deltaY
            : "wheelDeltaY" in e
            ? -e.wheelDeltaY
            : "wheelDelta" in e
            ? -e.wheelDelta
            : 0;
        },
        deltaZ: null,
        deltaMode: null,
      })),
      (_c = {
        eventTypes: eu,
        extractEvents: function (e, t, n, r) {
          var o = tu.get(e);
          if (!o) return null;
          switch (e) {
            case "keypress":
              if (0 === Yh(n)) return null;
            case "keydown":
            case "keyup":
              e = mc;
              break;
            case "blur":
            case "focus":
              e = pc;
              break;
            case "click":
              if (2 === n.button) return null;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              e = Xu;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              e = vc;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              e = bc;
              break;
            case Ol:
            case Ml:
            case Rl:
              e = dc;
              break;
            case Nl:
              e = yc;
              break;
            case "scroll":
              e = $u;
              break;
            case "wheel":
              e = wc;
              break;
            case "copy":
            case "cut":
            case "paste":
              e = fc;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              e = Zu;
              break;
            default:
              e = kh;
          }
          return Sh((t = e.getPooled(o, t, n, r))), t;
        },
      }),
      zs)
    )
      throw Error(Ff(101));
    (zs = Array.prototype.slice.call(
      "ResponderEventPlugin SimpleEventPlugin EnterLeaveEventPlugin ChangeEventPlugin SelectEventPlugin BeforeInputEventPlugin".split(
        " "
      )
    )),
      Rf(),
      (qs = gh),
      (Hs = ph),
      (Vs = hh),
      Bf({
        SimpleEventPlugin: _c,
        EnterLeaveEventPlugin: tc,
        ChangeEventPlugin: Gu,
        SelectEventPlugin: cc,
        BeforeInputEventPlugin: ju,
      }),
      (Sc = []),
      (xc = -1),
      (Dc = { current: (Pc = {}) }),
      (kc = { current: !1 }),
      (Ec = Pc),
      (Tc = As().unstable_runWithPriority),
      (Ic = As().unstable_scheduleCallback),
      (Cc = As().unstable_cancelCallback),
      (Fc = As().unstable_requestPaint),
      (Ac = As().unstable_now),
      (Oc = As().unstable_getCurrentPriorityLevel),
      (Mc = As().unstable_ImmediatePriority),
      (Rc = As().unstable_UserBlockingPriority),
      (Nc = As().unstable_NormalPriority),
      (Bc = As().unstable_LowPriority),
      (Uc = As().unstable_IdlePriority),
      (jc = {}),
      (Lc = As().unstable_shouldYield),
      (qc = void 0 !== Fc ? Fc : function () {}),
      (Hc = null),
      (Vc = null),
      (zc = !1),
      (Gc = Ac()),
      ($c =
        1e4 > Gc
          ? Ac
          : function () {
              return Ac() - Gc;
            }),
      (Wc = { current: null }),
      (Yc = null),
      (Qc = null),
      (Jc = null),
      (Kc = !1),
      (Xc = ul.ReactCurrentBatchConfig),
      (Zc = new Ms.Component().refs),
      (ed = {
        isMounted: function (e) {
          return !!(e = e._reactInternalFiber) && wp(e) === e;
        },
        enqueueSetState: function (e, t, n) {
          e = e._reactInternalFiber;
          var r = Km(),
            o = Xc.suspense;
          ((o = wg((r = Xm(r, e, o)), o)).payload = t),
            null != n && (o.callback = n),
            _g(e, o),
            Zm(e, r);
        },
        enqueueReplaceState: function (e, t, n) {
          e = e._reactInternalFiber;
          var r = Km(),
            o = Xc.suspense;
          ((o = wg((r = Xm(r, e, o)), o)).tag = 1),
            (o.payload = t),
            null != n && (o.callback = n),
            _g(e, o),
            Zm(e, r);
        },
        enqueueForceUpdate: function (e, t) {
          e = e._reactInternalFiber;
          var n = Km(),
            r = Xc.suspense;
          ((r = wg((n = Xm(n, e, r)), r)).tag = 2),
            null != t && (r.callback = t),
            _g(e, r),
            Zm(e, n);
        },
      }),
      (td = Array.isArray),
      (nd = Ag(!0)),
      (rd = Ag(!1)),
      (id = { current: (od = {}) }),
      (ad = { current: od }),
      (sd = { current: od }),
      (ld = { current: 0 }),
      (ud = ul.ReactCurrentDispatcher),
      (cd = ul.ReactCurrentBatchConfig),
      (dd = 0),
      (fd = null),
      (pd = null),
      (hd = null),
      (gd = !1),
      (md = {
        readContext: vg,
        useCallback: Lg,
        useContext: Lg,
        useEffect: Lg,
        useImperativeHandle: Lg,
        useLayoutEffect: Lg,
        useMemo: Lg,
        useReducer: Lg,
        useRef: Lg,
        useState: Lg,
        useDebugValue: Lg,
        useResponder: Lg,
        useDeferredValue: Lg,
        useTransition: Lg,
      }),
      (vd = {
        readContext: vg,
        useCallback: im,
        useContext: vg,
        useEffect: Zg,
        useImperativeHandle: function (e, t, n) {
          return (
            (n = null != n ? n.concat([e]) : null),
            Kg(4, 2, nm.bind(null, t, e), n)
          );
        },
        useLayoutEffect: function (e, t) {
          return Kg(4, 2, e, t);
        },
        useMemo: function (e, t) {
          var n = Vg();
          return (
            (t = void 0 === t ? null : t),
            (e = e()),
            (n.memoizedState = [e, t]),
            e
          );
        },
        useReducer: function (e, t, n) {
          var r = Vg();
          return (
            (t = void 0 !== n ? n(t) : t),
            (r.memoizedState = r.baseState = t),
            (e = (e = r.queue =
              {
                pending: null,
                dispatch: null,
                lastRenderedReducer: e,
                lastRenderedState: t,
              }).dispatch =
              um.bind(null, fd, e)),
            [r.memoizedState, e]
          );
        },
        useRef: function (e) {
          return (e = { current: e }), (Vg().memoizedState = e);
        },
        useState: Yg,
        useDebugValue: om,
        useResponder: jg,
        useDeferredValue: function (e, t) {
          var n = Yg(e),
            r = n[0],
            o = n[1];
          return (
            Zg(
              function () {
                var n = cd.suspense;
                cd.suspense = void 0 === t ? null : t;
                try {
                  o(e);
                } finally {
                  cd.suspense = n;
                }
              },
              [e, t]
            ),
            r
          );
        },
        useTransition: function (e) {
          var t = Yg(!1),
            n = t[0];
          return (t = t[1]), [im(lm.bind(null, t, e), [t, e]), n];
        },
      }),
      (bd = {
        readContext: vg,
        useCallback: am,
        useContext: vg,
        useEffect: em,
        useImperativeHandle: rm,
        useLayoutEffect: tm,
        useMemo: sm,
        useReducer: $g,
        useRef: Jg,
        useState: function () {
          return $g(Gg);
        },
        useDebugValue: om,
        useResponder: jg,
        useDeferredValue: function (e, t) {
          var n = $g(Gg),
            r = n[0],
            o = n[1];
          return (
            em(
              function () {
                var n = cd.suspense;
                cd.suspense = void 0 === t ? null : t;
                try {
                  o(e);
                } finally {
                  cd.suspense = n;
                }
              },
              [e, t]
            ),
            r
          );
        },
        useTransition: function (e) {
          var t = $g(Gg),
            n = t[0];
          return (t = t[1]), [am(lm.bind(null, t, e), [t, e]), n];
        },
      }),
      (yd = {
        readContext: vg,
        useCallback: am,
        useContext: vg,
        useEffect: em,
        useImperativeHandle: rm,
        useLayoutEffect: tm,
        useMemo: sm,
        useReducer: Wg,
        useRef: Jg,
        useState: function () {
          return Wg(Gg);
        },
        useDebugValue: om,
        useResponder: jg,
        useDeferredValue: function (e, t) {
          var n = Wg(Gg),
            r = n[0],
            o = n[1];
          return (
            em(
              function () {
                var n = cd.suspense;
                cd.suspense = void 0 === t ? null : t;
                try {
                  o(e);
                } finally {
                  cd.suspense = n;
                }
              },
              [e, t]
            ),
            r
          );
        },
        useTransition: function (e) {
          var t = Wg(Gg),
            n = t[0];
          return (t = t[1]), [am(lm.bind(null, t, e), [t, e]), n];
        },
      }),
      (wd = null),
      (_d = null),
      (Sd = !1),
      (xd = ul.ReactCurrentOwner),
      (Pd = !1),
      (Dd = { dehydrated: null, retryTime: 0 }),
      (kd = function (e, t) {
        for (var n = t.child; null !== n; ) {
          if (5 === n.tag || 6 === n.tag) e.appendChild(n.stateNode);
          else if (4 !== n.tag && null !== n.child) {
            (n.child.return = n), (n = n.child);
            continue;
          }
          if (n === t) break;
          for (; null === n.sibling; ) {
            if (null === n.return || n.return === t) return;
            n = n.return;
          }
          (n.sibling.return = n.return), (n = n.sibling);
        }
      }),
      (Ed = function () {}),
      (Td = function (e, t, n, r, o) {
        var i = e.memoizedProps;
        if (i !== r) {
          var a,
            s,
            l = t.stateNode;
          switch ((Og(id.current), (e = null), n)) {
            case "input":
              (i = np(l, i)), (r = np(l, r)), (e = []);
              break;
            case "option":
              (i = lp(l, i)), (r = lp(l, r)), (e = []);
              break;
            case "select":
              (i = Rs({}, i, { value: void 0 })),
                (r = Rs({}, r, { value: void 0 })),
                (e = []);
              break;
            case "textarea":
              (i = cp(l, i)), (r = cp(l, r)), (e = []);
              break;
            default:
              "function" != typeof i.onClick &&
                "function" == typeof r.onClick &&
                (l.onclick = th);
          }
          for (a in (Xp(n, r), (n = null), i))
            if (!r.hasOwnProperty(a) && i.hasOwnProperty(a) && null != i[a])
              if ("style" === a)
                for (s in (l = i[a]))
                  l.hasOwnProperty(s) && (n || (n = {}), (n[s] = ""));
              else
                "dangerouslySetInnerHTML" !== a &&
                  "children" !== a &&
                  "suppressContentEditableWarning" !== a &&
                  "suppressHydrationWarning" !== a &&
                  "autoFocus" !== a &&
                  (Ys.hasOwnProperty(a)
                    ? e || (e = [])
                    : (e = e || []).push(a, null));
          for (a in r) {
            var u = r[a];
            if (
              ((l = null != i ? i[a] : void 0),
              r.hasOwnProperty(a) && u !== l && (null != u || null != l))
            )
              if ("style" === a)
                if (l) {
                  for (s in l)
                    !l.hasOwnProperty(s) ||
                      (u && u.hasOwnProperty(s)) ||
                      (n || (n = {}), (n[s] = ""));
                  for (s in u)
                    u.hasOwnProperty(s) &&
                      l[s] !== u[s] &&
                      (n || (n = {}), (n[s] = u[s]));
                } else n || (e || (e = []), e.push(a, n)), (n = u);
              else
                "dangerouslySetInnerHTML" === a
                  ? ((u = u ? u.__html : void 0),
                    (l = l ? l.__html : void 0),
                    null != u && l !== u && (e = e || []).push(a, u))
                  : "children" === a
                  ? l === u ||
                    ("string" != typeof u && "number" != typeof u) ||
                    (e = e || []).push(a, "" + u)
                  : "suppressContentEditableWarning" !== a &&
                    "suppressHydrationWarning" !== a &&
                    (Ys.hasOwnProperty(a)
                      ? (null != u && eh(o, a), e || l === u || (e = []))
                      : (e = e || []).push(a, u));
          }
          n && (e = e || []).push("style", n),
            (o = e),
            (t.updateQueue = o) && (t.effectTag |= 4);
        }
      }),
      (Id = function (e, t, n, r) {
        n !== r && (t.effectTag |= 4);
      }),
      (Cd = "function" == typeof WeakSet ? WeakSet : Set),
      (Fd = "function" == typeof WeakMap ? WeakMap : Map),
      (Ad = Math.ceil),
      (Od = ul.ReactCurrentDispatcher),
      (Md = ul.ReactCurrentOwner),
      (Nd = 8),
      (Bd = 16),
      (Ud = 32),
      (Ld = 1),
      (qd = 2),
      (Hd = 3),
      (Vd = 4),
      (zd = 5),
      (Gd = Rd = 0),
      ($d = null),
      (Wd = null),
      (Yd = 0),
      (Qd = jd = 0),
      (Jd = null),
      (Kd = 1073741823),
      (Xd = 1073741823),
      (Zd = null),
      (ef = 0),
      (tf = !1),
      (nf = 0),
      (rf = 500),
      (of = null),
      (af = !1),
      (sf = null),
      (lf = null),
      (uf = !1),
      (cf = null),
      (df = 90),
      (ff = null),
      (pf = 0),
      (hf = null),
      (gf = 0),
      (mf = function (e, t, n) {
        var r = t.expirationTime;
        if (null !== e) {
          var o = t.pendingProps;
          if (e.memoizedProps !== o || kc.current) Pd = !0;
          else {
            if (r < n) {
              switch (((Pd = !1), t.tag)) {
                case 3:
                  Pm(t), gm();
                  break;
                case 5:
                  if ((Ng(t), 4 & t.mode && 1 !== n && o.hidden))
                    return (t.expirationTime = t.childExpirationTime = 1), null;
                  break;
                case 1:
                  Xh(t.type) && ng(t);
                  break;
                case 4:
                  Mg(t, t.stateNode.containerInfo);
                  break;
                case 10:
                  (r = t.memoizedProps.value),
                    (o = t.type._context),
                    Jh(Wc, o._currentValue),
                    (o._currentValue = r);
                  break;
                case 13:
                  if (null !== t.memoizedState)
                    return 0 !== (r = t.child.childExpirationTime) && r >= n
                      ? Dm(e, t, n)
                      : (Jh(ld, 1 & ld.current),
                        null !== (t = Im(e, t, n)) ? t.sibling : null);
                  Jh(ld, 1 & ld.current);
                  break;
                case 19:
                  if (
                    ((r = t.childExpirationTime >= n), 0 != (64 & e.effectTag))
                  ) {
                    if (r) return Tm(e, t, n);
                    t.effectTag |= 64;
                  }
                  if (
                    (null !== (o = t.memoizedState) &&
                      ((o.rendering = null), (o.tail = null)),
                    Jh(ld, ld.current),
                    !r)
                  )
                    return null;
              }
              return Im(e, t, n);
            }
            Pd = !1;
          }
        } else Pd = !1;
        switch (((t.expirationTime = 0), t.tag)) {
          case 2:
            if (
              ((r = t.type),
              null !== e &&
                ((e.alternate = null),
                (t.alternate = null),
                (t.effectTag |= 2)),
              (e = t.pendingProps),
              (o = Kh(t, Dc.current)),
              mg(t, n),
              (o = Hg(null, t, r, e, o, n)),
              (t.effectTag |= 1),
              "object" == typeof o &&
                null !== o &&
                "function" == typeof o.render &&
                void 0 === o.$$typeof)
            ) {
              if (
                ((t.tag = 1),
                (t.memoizedState = null),
                (t.updateQueue = null),
                Xh(r))
              ) {
                var i = !0;
                ng(t);
              } else i = !1;
              (t.memoizedState =
                null !== o.state && void 0 !== o.state ? o.state : null),
                bg(t);
              var a = r.getDerivedStateFromProps;
              "function" == typeof a && Dg(t, r, a, e),
                (o.updater = ed),
                (t.stateNode = o),
                (o._reactInternalFiber = t),
                Ig(t, r, e, n),
                (t = xm(null, t, r, !0, i, n));
            } else (t.tag = 0), mm(null, t, o, n), (t = t.child);
            return t;
          case 16:
            e: {
              if (
                ((o = t.elementType),
                null !== e &&
                  ((e.alternate = null),
                  (t.alternate = null),
                  (t.effectTag |= 2)),
                (e = t.pendingProps),
                (function (e) {
                  if (-1 === e._status) {
                    e._status = 0;
                    var t = e._ctor;
                    (t = t()),
                      (e._result = t),
                      t.then(
                        function (t) {
                          0 === e._status &&
                            ((t = t.default), (e._status = 1), (e._result = t));
                        },
                        function (t) {
                          0 === e._status && ((e._status = 2), (e._result = t));
                        }
                      );
                  }
                })(o),
                1 !== o._status)
              )
                throw o._result;
              switch (
                ((o = o._result),
                (t.type = o),
                (i = t.tag =
                  (function (e) {
                    if ("function" == typeof e) return Tv(e) ? 1 : 0;
                    if (null != e) {
                      if ((e = e.$$typeof) === wl) return 11;
                      if (e === xl) return 14;
                    }
                    return 2;
                  })(o)),
                (e = fg(o, e)),
                i)
              ) {
                case 0:
                  t = _m(null, t, o, e, n);
                  break e;
                case 1:
                  t = Sm(null, t, o, e, n);
                  break e;
                case 11:
                  t = vm(null, t, o, e, n);
                  break e;
                case 14:
                  t = bm(null, t, o, fg(o.type, e), r, n);
                  break e;
              }
              throw Error(Ff(306, o, ""));
            }
            return t;
          case 0:
            return (
              (r = t.type),
              (o = t.pendingProps),
              _m(e, t, r, (o = t.elementType === r ? o : fg(r, o)), n)
            );
          case 1:
            return (
              (r = t.type),
              (o = t.pendingProps),
              Sm(e, t, r, (o = t.elementType === r ? o : fg(r, o)), n)
            );
          case 3:
            if ((Pm(t), (r = t.updateQueue), null === e || null === r))
              throw Error(Ff(282));
            if (
              ((r = t.pendingProps),
              (o = null !== (o = t.memoizedState) ? o.element : null),
              yg(e, t),
              xg(t, r, null, n),
              (r = t.memoizedState.element) === o)
            )
              gm(), (t = Im(e, t, n));
            else {
              if (
                ((o = t.stateNode.hydrate) &&
                  ((_d = ch(t.stateNode.containerInfo.firstChild)),
                  (wd = t),
                  (o = Sd = !0)),
                o)
              )
                for (n = rd(t, null, r, n), t.child = n; n; )
                  (n.effectTag = (-3 & n.effectTag) | 1024), (n = n.sibling);
              else mm(e, t, r, n), gm();
              t = t.child;
            }
            return t;
          case 5:
            return (
              Ng(t),
              null === e && fm(t),
              (r = t.type),
              (o = t.pendingProps),
              (i = null !== e ? e.memoizedProps : null),
              (a = o.children),
              uh(r, o)
                ? (a = null)
                : null !== i && uh(r, i) && (t.effectTag |= 16),
              wm(e, t),
              4 & t.mode && 1 !== n && o.hidden
                ? ((t.expirationTime = t.childExpirationTime = 1), (t = null))
                : (mm(e, t, a, n), (t = t.child)),
              t
            );
          case 6:
            return null === e && fm(t), null;
          case 13:
            return Dm(e, t, n);
          case 4:
            return (
              Mg(t, t.stateNode.containerInfo),
              (r = t.pendingProps),
              null === e ? (t.child = nd(t, null, r, n)) : mm(e, t, r, n),
              t.child
            );
          case 11:
            return (
              (r = t.type),
              (o = t.pendingProps),
              vm(e, t, r, (o = t.elementType === r ? o : fg(r, o)), n)
            );
          case 7:
            return mm(e, t, t.pendingProps, n), t.child;
          case 8:
          case 12:
            return mm(e, t, t.pendingProps.children, n), t.child;
          case 10:
            e: {
              (r = t.type._context),
                (o = t.pendingProps),
                (a = t.memoizedProps),
                (i = o.value);
              var s = t.type._context;
              if ((Jh(Wc, s._currentValue), (s._currentValue = i), null !== a))
                if (
                  ((s = a.value),
                  0 ===
                    (i = nc(s, i)
                      ? 0
                      : 0 |
                        ("function" == typeof r._calculateChangedBits
                          ? r._calculateChangedBits(s, i)
                          : 1073741823)))
                ) {
                  if (a.children === o.children && !kc.current) {
                    t = Im(e, t, n);
                    break e;
                  }
                } else
                  for (null !== (s = t.child) && (s.return = t); null !== s; ) {
                    var l = s.dependencies;
                    if (null !== l) {
                      a = s.child;
                      for (var u = l.firstContext; null !== u; ) {
                        if (u.context === r && 0 != (u.observedBits & i)) {
                          1 === s.tag &&
                            (((u = wg(n, null)).tag = 2), _g(s, u)),
                            s.expirationTime < n && (s.expirationTime = n),
                            null !== (u = s.alternate) &&
                              u.expirationTime < n &&
                              (u.expirationTime = n),
                            gg(s.return, n),
                            l.expirationTime < n && (l.expirationTime = n);
                          break;
                        }
                        u = u.next;
                      }
                    } else
                      a = 10 === s.tag && s.type === t.type ? null : s.child;
                    if (null !== a) a.return = s;
                    else
                      for (a = s; null !== a; ) {
                        if (a === t) {
                          a = null;
                          break;
                        }
                        if (null !== (s = a.sibling)) {
                          (s.return = a.return), (a = s);
                          break;
                        }
                        a = a.return;
                      }
                    s = a;
                  }
              mm(e, t, o.children, n), (t = t.child);
            }
            return t;
          case 9:
            return (
              (o = t.type),
              (r = (i = t.pendingProps).children),
              mg(t, n),
              (r = r((o = vg(o, i.unstable_observedBits)))),
              (t.effectTag |= 1),
              mm(e, t, r, n),
              t.child
            );
          case 14:
            return (
              (i = fg((o = t.type), t.pendingProps)),
              bm(e, t, o, (i = fg(o.type, i)), r, n)
            );
          case 15:
            return ym(e, t, t.type, t.pendingProps, r, n);
          case 17:
            return (
              (r = t.type),
              (o = t.pendingProps),
              (o = t.elementType === r ? o : fg(r, o)),
              null !== e &&
                ((e.alternate = null),
                (t.alternate = null),
                (t.effectTag |= 2)),
              (t.tag = 1),
              Xh(r) ? ((e = !0), ng(t)) : (e = !1),
              mg(t, n),
              Eg(t, r, o),
              Ig(t, r, o, n),
              xm(null, t, r, !0, e, n)
            );
          case 19:
            return Tm(e, t, n);
        }
        throw Error(Ff(156, t.tag));
      }),
      (vf = null),
      (bf = null),
      (Vv.prototype.render = function (e) {
        jv(e, this._internalRoot, null, null);
      }),
      (Vv.prototype.unmount = function () {
        var e = this._internalRoot,
          t = e.containerInfo;
        jv(null, e, null, function () {
          t[Pu] = null;
        });
      }),
      (ql = function (e) {
        if (13 === e.tag) {
          var t = dg(Km(), 150, 100);
          Zm(e, t), Hv(e, t);
        }
      }),
      (Hl = function (e) {
        13 === e.tag && (Zm(e, 3), Hv(e, 3));
      }),
      (Vl = function (e) {
        if (13 === e.tag) {
          var t = Km();
          Zm(e, (t = Xm(t, e, null))), Hv(e, t);
        }
      }),
      (Ks = function (e, t, n) {
        switch (t) {
          case "input":
            if ((ip(e, n), (t = n.name), "radio" === n.type && null != t)) {
              for (n = e; n.parentNode; ) n = n.parentNode;
              for (
                n = n.querySelectorAll(
                  "input[name=" + JSON.stringify("" + t) + '][type="radio"]'
                ),
                  t = 0;
                t < n.length;
                t++
              ) {
                var r = n[t];
                if (r !== e && r.form === e.form) {
                  var o = gh(r);
                  if (!o) throw Error(Ff(90));
                  tp(r), ip(r, o);
                }
              }
            }
            break;
          case "textarea":
            fp(e, n);
            break;
          case "select":
            null != (t = n.value) && up(e, !!n.multiple, t, !1);
        }
      }),
      (qf = iv),
      (Hf = function (e, t, n, r, o) {
        var i = Gd;
        Gd |= 4;
        try {
          return ag(98, e.bind(null, t, n, r, o));
        } finally {
          (Gd = i) === Rd && ug();
        }
      }),
      (Vf = function () {
        (Gd & (1 | Bd | Ud)) === Rd &&
          ((function () {
            if (null !== ff) {
              var e = ff;
              (ff = null),
                e.forEach(function (e, t) {
                  Uv(t, e), nv(t);
                }),
                ug();
            }
          })(),
          wv());
      }),
      (el = function (e, t) {
        var n = Gd;
        Gd |= 2;
        try {
          return e(t);
        } finally {
          (Gd = n) === Rd && ug();
        }
      }),
      (yf = {
        Events: [
          ph,
          hh,
          gh,
          Bf,
          Ws,
          Sh,
          function (e) {
            Dp(e, _h);
          },
          jf,
          Lf,
          Yp,
          Ep,
          wv,
          { current: !1 },
        ],
      }),
      (function (e) {
        var t = e.findFiberByHostInstance;
        (function (e) {
          if ("undefined" == typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) return !1;
          var t = __REACT_DEVTOOLS_GLOBAL_HOOK__;
          if (t.isDisabled || !t.supportsFiber) return !0;
          try {
            var n = t.inject(e);
            (vf = function (e) {
              try {
                t.onCommitFiberRoot(
                  n,
                  e,
                  void 0,
                  64 == (64 & e.current.effectTag)
                );
              } catch (e) {}
            }),
              (bf = function (e) {
                try {
                  t.onCommitFiberUnmount(n, e);
                } catch (e) {}
              });
          } catch (e) {}
        })(
          Rs({}, e, {
            overrideHookState: null,
            overrideProps: null,
            setSuspenseHandler: null,
            scheduleUpdate: null,
            currentDispatcherRef: ul.ReactCurrentDispatcher,
            findHostInstanceByFiber: function (e) {
              return null === (e = xp(e)) ? null : e.stateNode;
            },
            findFiberByHostInstance: function (e) {
              return t ? t(e) : null;
            },
            findHostInstancesForRefresh: null,
            scheduleRefresh: null,
            scheduleRoot: null,
            setRefreshHandler: null,
            getCurrentFiber: null,
          })
        );
      })({
        findFiberByHostInstance: fh,
        bundleType: 0,
        version: "16.13.1",
        rendererPackageName: "react-dom",
      }),
      (wf = yf),
      (Os.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = wf),
      (_f = Wv),
      (Os.createPortal = _f),
      (Sf = function (e) {
        if (null == e) return null;
        if (1 === e.nodeType) return e;
        var t = e._reactInternalFiber;
        if (void 0 === t) {
          if ("function" == typeof e.render) throw Error(Ff(188));
          throw Error(Ff(268, Object.keys(e)));
        }
        return (e = null === (e = xp(t)) ? null : e.stateNode);
      }),
      (Os.findDOMNode = Sf),
      (xf = function (e, t) {
        if ((Gd & (Bd | Ud)) !== Rd) throw Error(Ff(187));
        var n = Gd;
        Gd |= 1;
        try {
          return ag(99, e.bind(null, t));
        } finally {
          (Gd = n), ug();
        }
      }),
      (Os.flushSync = xf),
      (Pf = function (e, t, n) {
        if (!zv(t)) throw Error(Ff(200));
        return Gv(null, e, t, !0, n);
      }),
      (Os.hydrate = Pf),
      (Df = function (e, t, n) {
        if (!zv(t)) throw Error(Ff(200));
        return Gv(null, e, t, !1, n);
      }),
      (Os.render = Df),
      (kf = function (e) {
        if (!zv(e)) throw Error(Ff(40));
        return (
          !!e._reactRootContainer &&
          (av(function () {
            Gv(null, null, e, !1, function () {
              (e._reactRootContainer = null), (e[Pu] = null);
            });
          }),
          !0)
        );
      }),
      (Os.unmountComponentAtNode = kf),
      (Ef = iv),
      (Os.unstable_batchedUpdates = Ef),
      (Tf = function (e, t) {
        return Wv(
          e,
          t,
          2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null
        );
      }),
      (Os.unstable_createPortal = Tf),
      (If = function (e, t, n, r) {
        if (!zv(n)) throw Error(Ff(200));
        if (null == e || void 0 === e._reactInternalFiber) throw Error(Ff(38));
        return Gv(e, t, n, !1, r);
      }),
      (Os.unstable_renderSubtreeIntoContainer = If),
      "16.13.1",
      (Os.version = "16.13.1");
  }
  var Qv,
    Jv = {};
  !(function e() {
    if (
      "undefined" != typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ &&
      "function" == typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
      } catch (e) {
        console.error(e);
      }
  })(),
    Cf || ((Cf = !0), Yv()),
    (Jv = Os),
    r({}, "unstable_batchedUpdates", function () {
      return Jv.unstable_batchedUpdates;
    }),
    (Qv = Jv.unstable_batchedUpdates),
    (qo = Qv);
  const Kv = function (...e) {
    rr.dispatch(this, e);
  };
  function Xv(e, t) {
    return (t.type = e), (t.dispatch = Kv), t;
  }
  const Zv = Symbol("isProxy"),
    eb = Symbol("isProxifiedArray");
  let tb = !1;
  function nb(e) {
    if (Array.isArray(e)) {
      const t = e.map(nb);
      return (t[eb] = !0), t;
    }
    if ("[object Object]" !== Object.prototype.toString.call(e)) return e;
    const t = { ...e },
      n = new Set(),
      r = new Proxy(t, {
        get: function (e, r) {
          if (r in t)
            return tb && !n.has(r) && ((t[r] = nb(t[r])), n.add(r)), t[r];
        },
        set: function (e, n, r) {
          return (t[n] = r), !0;
        },
        deleteProperty: function (e, n) {
          return delete t[n], !0;
        },
      });
    return (r[Zv] = !0), r;
  }
  function rb(e) {
    if (e && e[eb]) return delete e[eb], e.map(rb);
    if (
      (Array.isArray(e) &&
        e.forEach((t, n) => {
          t && t[Zv] && (e[n] = rb(t));
        }),
      !e || !e[Zv])
    )
      return e;
    const t = {};
    for (const n in e) t[n] = rb(e[n]);
    return t;
  }
  const ob = Xv("influx.set-state", (e, t) => t);
  var ib = {
    model: rr,
    influx: (e) => (t) =>
      Ta((t, n) => e(t, n), null, null, { forwardRef: !0 })(t),
    action: Xv,
    transaction: function (e) {
      const t = (function (e, t) {
        const n = nb(e),
          r = tb;
        return (tb = !0), t(n), (tb = r), rb(n);
      })(rr.state, e);
      ob.dispatch(t);
    },
  };
  const { model: ab } = ib,
    sb = [
      "ResizeObserver loop limit exceeded",
      "Unable to preventDefault inside passive event listener",
      "Extension context invalidated.",
      "Invalid or unexpected token",
      "AbortError: The play() request was interrupted by a call to pause(). https://goo.gl/LdLk22",
      "InvalidStateError: Failed to execute 'transaction' on 'IDBDatabase'",
      "Timed out",
      "Failed to fetch",
    ];
  var lb = {
    controller: {
      throttle: !1,
      init: function ({ throttleBy: e = 10, dsn: t }) {
        if (t) {
          if (((this.dsn = t), u.is.development)) this.throttle = !1;
          else if (e <= 1) this.throttle = !1;
          else {
            let t = localStorage.getItem("sentry-user-hash");
            t ||
              ((t = Math.floor(1e13 * Math.random())),
              localStorage.setItem("sentry-user-hash", t)),
              (this.throttle = t % e != 0);
          }
          this._setup();
        } else console.error("sentry init failed: dsn is not provided");
      },
      _setup: function () {
        u.is.development ||
          (Jn({
            dsn: this.dsn,
            release: u.version,
            debug: u.is.development,
            ignoreErrors: sb,
            environment: u.is.development
              ? "development"
              : u.is.production
              ? "production"
              : "unknown",
            beforeSend: (e, t) => {
              if (u.is.production && "debug" === e.level) return null;
              if (this.throttle) return null;
              if (ab.store && ab.state) {
                let t = { ...ab.state, authStatus: { ...ab.state.authStatus } };
                delete t.authStatus.cookies,
                  (t = JSON.stringify(t)),
                  (t =
                    t.length > 102400 ? t.substr(0, 102400) + "..." : ab.state),
                  (e.extra = { ...(e.extra || {}), state: t });
              }
              const n = t.originalException,
                r = (n && n.message) || String(n);
              return r && sb.some((e) => r.includes(e)) ? null : e;
            },
          }),
          log("sentry-controller: initialisation succeeded"));
      },
      sendError: function (e, t = "error", n = null, r = null) {
        console.log("%csentry", "color: #c818dc", e, n),
          u.is.background &&
            q.send(
              "popup.log",
              "%csentry error [background]",
              "color: #c818dc",
              e,
              n
            ),
          "string" == typeof e && (e = new Error(e)),
          Wt("configureScope", (o) => {
            if (
              (o.setFingerprint([e.message]),
              o.setLevel(t),
              ab.store &&
                ab.state &&
                ab.state.authStatus &&
                o.setUser({ username: ab.state.authStatus.username }),
              n)
            )
              for (const e in n) {
                let t = n[e];
                "string" == typeof t &&
                  t.length > 15500 &&
                  (t = t.substr(0, 15500)),
                  o.setExtra(e, t);
              }
            if (r)
              for (const e in r) {
                const t = r[e];
                o.setTag(e, t);
              }
          }),
          Yt(e);
      },
    },
  };
  function ub(e) {
    const t = chrome.i18n.getMessage(e);
    if ("" === t) throw new Error(`i18n: no message found for id '${e}'`);
    return t;
  }
  var cb = {
    controller: {
      init: function () {
        globalThis.lo = ub;
      },
    },
  };
  const db = "https://www.instagram.com/",
    fb = {
      maxMentions: 30,
      base: db,
      challenge:
        '<link rel="alternate" href="https://www.instagram.com/challenge/',
      scriptPath: {
        followings: {
          regexp: [
            /(?:src|href)="\/(static\/bundles\/[\S]+\/Consumer\.js\/[\S]+)"/i,
            /(?:src|href)="\/\/www.instagram.com\/(static\/bundles\/[\S]+\/Consumer\.js\/[\S]+)"/i,
            /(?:src|href)="\/\/z-p3.www.instagram.com\/(static\/bundles\/[\S]+\/Consumer\.js\/[\S]+)"/i,
          ],
        },
        followers: {
          regexp: [
            /(?:src|href)="\/(static\/bundles\/[\S]+\/Consumer\.js\/[\S]+)"/i,
            /(?:src|href)="\/\/www.instagram.com\/(static\/bundles\/[\S]+\/Consumer\.js\/[\S]+)"/i,
            /(?:src|href)="\/\/z-p3.www.instagram.com\/(static\/bundles\/[\S]+\/Consumer\.js\/[\S]+)"/i,
          ],
        },
        timeline: {
          regexp: [
            /(?:src|href)="\/(static\/bundles\/[\S]+\/ConsumerLibCommons\.js\/[\S]+)"/i,
            /(?:src|href)="\/\/www.instagram.com\/(static\/bundles\/[\S]+\/ConsumerLibCommons\.js\/[\S]+)"/i,
            /(?:src|href)="\/\/z-p3.www.instagram.com\/(static\/bundles\/[\S]+\/ConsumerLibCommons\.js\/[\S]+)"/i,
          ],
        },
        "user-posts": {
          regexp: [
            /(?:src|href)="\/(static\/bundles\/[\S]+\/Consumer\.js\/[\S]+)"/i,
            /(?:src|href)="\/\/www.instagram.com\/(static\/bundles\/[\S]+\/Consumer\.js\/[\S]+)"/i,
            /(?:src|href)="\/\/z-p3.www.instagram.com\/(static\/bundles\/[\S]+\/Consumer\.js\/[\S]+)"/i,
          ],
        },
      },
      queryHash: {
        followings: {
          regexp: [
            /,o="([\dabcdef]{32})",u=1/,
            /,s="([\dabcdef]{32})",f=1/,
            /,l="([\dabcdef]{32})",s=1/,
            /,l="([\dabcdef]{32})",u=1/,
            /,n="([\dabcdef]{32})",u=1/,
          ],
        },
        followers: {
          regexp: [
            /\),u="([\dabcdef]{32})",l="/,
            /\),c="([\dabcdef]{32})",l="/,
            /\),l="([\dabcdef]{32})",s="/,
            /\),a="([\dabcdef]{32})",l="/,
            /;var n="([\dabcdef]{32})",o="/,
            /;var t="([\dabcdef]{32})",n="/,
            /;const c="([\dabcdef]{32})",l="/,
            /;const s="([\dabcdef]{32})",l="/,
            /;const t="([\dabcdef]{32})",n="/,
          ],
        },
        timeline: { regexp: [/,e\.FEED_QUERY_ID="([\dabcdef]{32})",/] },
        "user-posts": {
          regexp: [
            /l.pagination},queryId:"([\dabcdef]{32})",/,
            /c.pagination},queryId:"([\dabcdef]{32})",/,
          ],
        },
      },
      sharedData: {
        prefix: '<script type="text/javascript">window._sharedData =',
        suffix: ";</script>",
      },
      additionalData: {
        prefix: '<script type="text/javascript">window.__additionalDataLoaded(',
        suffix: ");</script>",
      },
      home: { url: db },
      loginActivity: {
        url: "https://i.instagram.com/api/v1/session/login_activity/?__a=1",
      },
      post: { url: (e) => `https://www.instagram.com/p/${e}/` },
      hashtag: {
        url: (e, { json: t = !1 } = {}) =>
          t
            ? O("https://i.instagram.com/api/v1/tags/web_info", { tag_name: e })
            : `https://www.instagram.com/explore/tags/${e}/`,
      },
      explore: { url: "https://www.instagram.com/explore/grid/" },
      user: { url: (e = null) => (e ? `https://www.instagram.com/${e}/` : db) },
      userPage: { url: (e) => `https://www.instagram.com/${e}/` },
      editAccount: { url: "https://www.instagram.com/accounts/edit/" },
      rootTagPosts: {
        url: (e) =>
          `https://www.instagram.com/explore/tags/${e.toLowerCase()}/`,
      },
      rootTimelinePosts: {
        url: (e, t) => {
          const n = JSON.stringify({
            cached_feed_item_ids: [],
            fetch_media_item_count: 12,
            fetch_media_item_cursor: null,
            fetch_comment_count: 4,
            fetch_like: 3,
            has_stories: !1,
            has_threaded_comments: !0,
          });
          return `https://www.instagram.com/graphql/query/?${
            t && t.timeline
              ? `query_hash=${t.timeline}`
              : "query_hash=6b838488258d7a4820e48d209ef79eb1"
          }&variables=${encodeURI(n)}`;
        },
      },
      moreTimelinePosts: {
        url: (e, t) => {
          const n = JSON.stringify(
            t || {
              cached_feed_item_ids: [],
              fetch_media_item_count: 12,
              fetch_media_item_cursor: e.lastCursor,
              fetch_comment_count: 4,
              fetch_like: 3,
              has_stories: !1,
              has_threaded_comments: !0,
            }
          );
          return `https://www.instagram.com/graphql/query/?${
            e.queryHash && e.queryHash.timeline
              ? `query_hash=${e.queryHash.timeline}`
              : "query_hash=6b838488258d7a4820e48d209ef79eb1"
          }&variables=${encodeURI(n)}`;
        },
      },
      rootUserPosts: {
        url: (e) => {
          const t = JSON.stringify({ id: e, first: 50, after: null });
          return `https://www.instagram.com/graphql/query/?query_hash=003056d32c2554def87228bc3fd9668a&variables=${encodeURI(
            t
          )}`;
        },
      },
      moreUserPosts: {
        url: (e, t) => {
          const n = JSON.stringify(
            t || { id: e.userId, first: 50, after: e.lastCursor }
          );
          return `https://www.instagram.com/graphql/query/?query_hash=003056d32c2554def87228bc3fd9668a&variables=${encodeURI(
            n
          )}`;
        },
      },
      rootUserFollowers: {
        url: (e, t) => {
          const n = JSON.stringify({
            id: e,
            first: 24,
            include_reel: !0,
            fetch_mutual: !1,
          });
          return `https://www.instagram.com/graphql/query/?${
            t && t.followers
              ? `query_hash=${t.followers}`
              : "query_hash=c76146de99bb02f6415203be841dd25a"
          }&variables=${encodeURI(n)}`;
        },
      },
      moreUserFollowers: {
        url: (e, t) => {
          const n = JSON.stringify(
            t || {
              id: e.userId,
              first: 50,
              after: e.lastCursor,
              include_reel: !0,
              fetch_mutual: !1,
            }
          );
          return `https://www.instagram.com/graphql/query/?${
            e.queryHash && e.queryHash.followers
              ? `query_hash=${e.queryHash.followers}`
              : "query_hash=c76146de99bb02f6415203be841dd25a"
          }&variables=${encodeURI(n)}`;
        },
      },
      rootUserFollowings: {
        url: (e, t) => {
          const n = JSON.stringify({
            id: e,
            first: 24,
            include_reel: !0,
            fetch_mutual: !1,
          });
          return `https://www.instagram.com/graphql/query/?${
            t && t.followings
              ? `query_hash=${t.followings}`
              : "query_hash=d04b0a864b4b54837c0d870b0e77e076"
          }&variables=${encodeURI(n)}`;
        },
      },
      moreUserFollowings: {
        url: (e, t) => {
          const n = JSON.stringify(
            t || {
              id: e.userId,
              first: 50,
              after: e.lastCursor,
              include_reel: !0,
              fetch_mutual: !1,
            }
          );
          return `https://www.instagram.com/graphql/query/?${
            e.queryHash && e.queryHash.followings
              ? `query_hash=${e.queryHash.followings}`
              : "query_hash=d04b0a864b4b54837c0d870b0e77e076"
          }&variables=${encodeURI(n)}`;
        },
      },
      logout: { url: "https://www.instagram.com/accounts/logout" },
      login: {
        link: '<link rel="canonical" href="https://www.instagram.com/accounts/login/',
        url: "https://www.instagram.com/accounts/login/?source=auth_switcher",
      },
      locale: { url: db, regexp: /"locale":"([^"]+)"/ },
    },
    pb = { min: 1e3, max: 6e3 },
    hb = { min: 600, max: 7e3 };
  function gb(e, t, { once: n = !1 } = {}) {
    globalThis.addEventListener(
      `__event-bus.${e}`,
      (e) => {
        const n = e.detail || [];
        t(...n);
      },
      { once: n }
    );
  }
  var mb = {
      send: function (e, ...t) {
        const n = new CustomEvent(`__event-bus.${e}`, { detail: t });
        globalThis.dispatchEvent(n);
      },
      on: gb,
      once: function (e, t) {
        gb(e, t, { once: !0 });
      },
    },
    vb = {},
    bb = {},
    yb = {},
    wb = {},
    _b = 1;
  wb = {
    nextValue: function () {
      return (_b = (9301 * _b + 49297) % 233280) / 233280;
    },
    seed: function (e) {
      _b = e;
    },
  };
  var Sb,
    xb,
    Pb,
    Db = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-";
  function kb() {
    Pb = !1;
  }
  function Eb(e) {
    if (e) {
      if (e !== Sb) {
        if (e.length !== Db.length)
          throw new Error(
            "Custom alphabet for shortid must be " +
              Db.length +
              " unique characters. You submitted " +
              e.length +
              " characters: " +
              e
          );
        var t = e.split("").filter(function (e, t, n) {
          return t !== n.lastIndexOf(e);
        });
        if (t.length)
          throw new Error(
            "Custom alphabet for shortid must be " +
              Db.length +
              " unique characters. These characters were not unique: " +
              t.join(", ")
          );
        (Sb = e), kb();
      }
    } else Sb !== Db && ((Sb = Db), kb());
  }
  function Tb() {
    return (
      Pb ||
      (Pb = (function () {
        Sb || Eb(Db);
        for (
          var e, t = Sb.split(""), n = [], r = wb.nextValue();
          t.length > 0;

        )
          (r = wb.nextValue()),
            (e = Math.floor(r * t.length)),
            n.push(t.splice(e, 1)[0]);
        return n.join("");
      })())
    );
  }
  yb = {
    get: function () {
      return Sb || Db;
    },
    characters: function (e) {
      return Eb(e), Sb;
    },
    seed: function (e) {
      wb.seed(e), xb !== e && (kb(), (xb = e));
    },
    lookup: function (e) {
      return Tb()[e];
    },
    shuffled: Tb,
  };
  var Ib = "object" == typeof window && (window.crypto || window.msCrypto),
    Cb =
      Ib && Ib.getRandomValues
        ? function (e) {
            return Ib.getRandomValues(new Uint8Array(e));
          }
        : function (e) {
            for (var t = [], n = 0; n < e; n++)
              t.push(Math.floor(256 * Math.random()));
            return t;
          },
    Fb = function (e, t, n) {
      for (
        var r = (2 << (Math.log(t.length - 1) / Math.LN2)) - 1,
          o = -~((1.6 * r * n) / t.length),
          i = "";
        ;

      )
        for (var a = e(o), s = o; s--; )
          if ((i += t[a[s] & r] || "").length === +n) return i;
    };
  var Ab,
    Ob,
    Mb = function (e) {
      for (var t, n = 0, r = ""; !t; )
        (r += Fb(Cb, yb.get(), 1)), (t = e < Math.pow(16, n + 1)), n++;
      return r;
    };
  var Rb = function (e) {
    var t = "",
      n = Math.floor(0.001 * (Date.now() - 1567752802062));
    return (
      n === Ob ? Ab++ : ((Ab = 0), (Ob = n)),
      (t += Mb(7)),
      (t += Mb(e)),
      Ab > 0 && (t += Mb(Ab)),
      (t += Mb(n))
    );
  };
  var Nb,
    Bb = function (e) {
      return (
        !(!e || "string" != typeof e || e.length < 6) &&
        !new RegExp(
          "[^" + yb.get().replace(/[|\\{}()[\]^$+*?.-]/g, "\\$&") + "]"
        ).test(e)
      );
    },
    Ub = !1;
  var jb = (Ub || ((Ub = !0), (Nb = {}), (Nb = 0)), Nb || 0);
  function Lb() {
    return Rb(jb);
  }
  var qb = Lb;
  (bb = Lb).generate = qb;
  var Hb = function (e) {
    return yb.seed(e), bb;
  };
  bb.seed = Hb;
  var Vb = function (e) {
    return (jb = e), bb;
  };
  bb.worker = Vb;
  var zb = function (e) {
    return void 0 !== e && yb.characters(e), yb.shuffled();
  };
  bb.characters = zb;
  var Gb = Bb;
  function $b(e) {
    return Array.isArray(e) ? e : [e];
  }
  (bb.isValid = Gb), (vb = bb);
  const Wb = "__iframeBus.name",
    Yb = "__iframeBus.args",
    Qb = "__iframeBus.callbackId",
    Jb = "undefined" != typeof parent && parent !== window;
  function Kb(e, t) {
    const n = ty(e),
      r = t["__iframeBus.handlers"] || (t["__iframeBus.handlers"] = {});
    (r[e] = async (r) => {
      if (r.data["__iframeBus.name"] === n) {
        const n = r.data["__iframeBus.args"] || [],
          o = r.data["__iframeBus.callbackId"] || null,
          i = await t(...n);
        o && ey(`${e}:response-${o}`, i);
      }
    }),
      window.addEventListener("message", r[e]);
  }
  function Xb(e, t) {
    Kb(e, function n(...r) {
      return Zb(e, n), t(...r);
    });
  }
  function Zb(e, t) {
    const n = t["__iframeBus.handlers"] || (t["__iframeBus.handlers"] = {});
    window.removeEventListener("message", n[e]);
  }
  async function ey(e, ...t) {
    let n;
    const r = t[t.length - 1];
    "function" == typeof r ? ((n = r), (t = t.slice(0, -1))) : (n = null);
    const o = e.includes(":response-"),
      i = ty(e),
      a = o ? null : vb.generate();
    if (
      (Jb
        ? parent.postMessage({ [Wb]: i, [Yb]: t, [Qb]: a }, "*")
        : (function (e, t = document) {
            e = $b(e);
            const n = [];
            for (const r of e) {
              const e = t.querySelectorAll(r);
              for (const t of e) n.includes(t) || n.push(t);
            }
            return n;
          })("iframe").forEach((e) => {
            e.contentWindow.postMessage({ [Wb]: i, [Yb]: t, [Qb]: a }, "*");
          }),
      !o)
    )
      return new Promise((t) => {
        const r = (o) => {
          n && n(o), Zb(`${e}:response-${a}`, r), t(o);
        };
        Kb(`${e}:response-${a}`, r);
      });
  }
  function ty(e) {
    return `iframe-bus.${e}`;
  }
  var ny = {
    init: function () {
      q.on("iframe-bus", (e, ...t) => ey(e, ...t)),
        Kb("chrome-bus", (e, ...t) => q.send(e, ...t));
    },
    on: Kb,
    once: Xb,
    off: Zb,
    send: ey,
    wait: async function (e) {
      return await new Promise((t) => {
        Xb(e, t);
      });
    },
  };
  function ry(e, t, n) {
    return n.indexOf(e) === t;
  }
  function oy(e, t) {
    return (e || 0) + 10 * (t || 0);
  }
  let iy, ay;
  function sy({ hashOptional: e = !1 } = {}) {
    return (
      iy ||
        ((iy =
          /()([#\uFF03])((?:[A-Za-zªµºÀ-ÖØ-öø-Ɂɐ-ˁˆ-ˑˠ-ˤˮͺΆΈ-ΊΌΎ-ΡΣ-ώϐ-ϵϷ-ҁҊ-ӎ-ӹԀ-ԏԱ-Ֆՙա-ևא-תװ-ײء-غـ-يٮ-ٯٱ-ۓەۥ-ۦۮ-ۯۺ-ۼۿܐܒ-ܯݍ-ݭހ-ޥޱऄ-हऽॐक़-ॡॽঅ-ঌএ-ঐও-নপ-রলশ-হঽৎড়-ঢ়য়-ৡৰ-ৱਅ-ਊਏ-ਐਓ-ਨਪ-ਰਲ-ਲ਼ਵ-ਸ਼ਸ-ਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલ-ળવ-હઽૐૠ-ૡଅ-ଌଏ-ଐଓ-ନପ-ରଲ-ଳଵ-ହଽଡ଼-ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கங-சஜஞ-டண-தந-பம-ஹఅ-ఌఎ-ఐఒ-నప-ళవ-హౠ-ౡಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠ-ೡഅ-ഌഎ-ഐഒ-നപ-ഹൠ-ൡඅ-ඖක-නඳ-රලව-ෆก-ะา-ำเ-ๆກ-ຂຄງ-ຈຊຍດ-ທນ-ຟມ-ຣລວສ-ຫອ-ະາ-ຳຽເ-ໄໆໜ-ໝༀཀ-ཇཉ-ཪྈ-ྋက-အဣ-ဧဩ-ဪၐ-ၕႠ-Ⴥა-ჺჼᄀ-ᅙᅟ-ᆢᆨ-ᇹሀ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏ-Ᏼᐁ-ᙬᙯ-ᙶᚁ-ᚚᚠ-ᛪᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡷᢀ-ᢨᤀ-ᤜᥐ-ᥭᥰ-ᥴᦀ-ᦩᧁ-ᧇᨀ-ᨖᴀ-ᶿḀ-ẛẠ-ỹἀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₔℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℱℳ-ℹℼ-ℿⅅ-ⅉⰀ-Ⱞⰰ-ⱞⲀ-ⳤⵥⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞ々-〆〱-〵〻-〼ぁ-ゖゝ-ゟァ-ヺー-ヿㄅ-ㄬㄱ-ㆎㆠ-ㆷㇰ-ㇿ-䶵一-龻ꀀ-ꒌꠀ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢ가-힣豈-鶴侮-頻並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּ-לּמּנּ-סּףּ-פּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ̀ﾡ-ￜァ-ヺー-ヾｦ-ﾟ０-９Ａ-Ｚａ-ｚぁ-ゖ゙-ゞ㐀-䶿一-鿿꜀-뜿띀-렟-﨟〃々〻0-9٠-٩۰-۹०-९০-৯੦-੯૦-૯୦-୯௦-௯౦-౯೦-೯൦-൯๐-๙໐-໙༠-༩၀-၉០-៩᠐-᠙᥆-᥏᧐-᧙０-９_]|(?:[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u2388\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2648-\u2653\u2660\u2663\u2665\u2666\u2668\u267B\u267F\u2692-\u2694\u2696\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD79\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED0\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3]|\uD83E[\uDD10-\uDD18\uDD80-\uDD84\uDDC0]|(?:0\u20E3|1\u20E3|2\u20E3|3\u20E3|4\u20E3|5\u20E3|6\u20E3|7\u20E3|8\u20E3|9\u20E3|#\u20E3|\\*\u20E3|\uD83C(?:\uDDE6\uD83C(?:\uDDEB|\uDDFD|\uDDF1|\uDDF8|\uDDE9|\uDDF4|\uDDEE|\uDDF6|\uDDEC|\uDDF7|\uDDF2|\uDDFC|\uDDE8|\uDDFA|\uDDF9|\uDDFF|\uDDEA)|\uDDE7\uD83C(?:\uDDF8|\uDDED|\uDDE9|\uDDE7|\uDDFE|\uDDEA|\uDDFF|\uDDEF|\uDDF2|\uDDF9|\uDDF4|\uDDE6|\uDDFC|\uDDFB|\uDDF7|\uDDF3|\uDDEC|\uDDEB|\uDDEE|\uDDF6|\uDDF1)|\uDDE8\uD83C(?:\uDDF2|\uDDE6|\uDDFB|\uDDEB|\uDDF1|\uDDF3|\uDDFD|\uDDF5|\uDDE8|\uDDF4|\uDDEC|\uDDE9|\uDDF0|\uDDF7|\uDDEE|\uDDFA|\uDDFC|\uDDFE|\uDDFF|\uDDED)|\uDDE9\uD83C(?:\uDDFF|\uDDF0|\uDDEC|\uDDEF|\uDDF2|\uDDF4|\uDDEA)|\uDDEA\uD83C(?:\uDDE6|\uDDE8|\uDDEC|\uDDF7|\uDDEA|\uDDF9|\uDDFA|\uDDF8|\uDDED)|\uDDEB\uD83C(?:\uDDF0|\uDDF4|\uDDEF|\uDDEE|\uDDF7|\uDDF2)|\uDDEC\uD83C(?:\uDDF6|\uDDEB|\uDDE6|\uDDF2|\uDDEA|\uDDED|\uDDEE|\uDDF7|\uDDF1|\uDDE9|\uDDF5|\uDDFA|\uDDF9|\uDDEC|\uDDF3|\uDDFC|\uDDFE|\uDDF8|\uDDE7)|\uDDED\uD83C(?:\uDDF7|\uDDF9|\uDDF2|\uDDF3|\uDDF0|\uDDFA)|\uDDEE\uD83C(?:\uDDF4|\uDDE8|\uDDF8|\uDDF3|\uDDE9|\uDDF7|\uDDF6|\uDDEA|\uDDF2|\uDDF1|\uDDF9)|\uDDEF\uD83C(?:\uDDF2|\uDDF5|\uDDEA|\uDDF4)|\uDDF0\uD83C(?:\uDDED|\uDDFE|\uDDF2|\uDDFF|\uDDEA|\uDDEE|\uDDFC|\uDDEC|\uDDF5|\uDDF7|\uDDF3)|\uDDF1\uD83C(?:\uDDE6|\uDDFB|\uDDE7|\uDDF8|\uDDF7|\uDDFE|\uDDEE|\uDDF9|\uDDFA|\uDDF0|\uDDE8)|\uDDF2\uD83C(?:\uDDF4|\uDDF0|\uDDEC|\uDDFC|\uDDFE|\uDDFB|\uDDF1|\uDDF9|\uDDED|\uDDF6|\uDDF7|\uDDFA|\uDDFD|\uDDE9|\uDDE8|\uDDF3|\uDDEA|\uDDF8|\uDDE6|\uDDFF|\uDDF2|\uDDF5|\uDDEB)|\uDDF3\uD83C(?:\uDDE6|\uDDF7|\uDDF5|\uDDF1|\uDDE8|\uDDFF|\uDDEE|\uDDEA|\uDDEC|\uDDFA|\uDDEB|\uDDF4)|\uDDF4\uD83C\uDDF2|\uDDF5\uD83C(?:\uDDEB|\uDDF0|\uDDFC|\uDDF8|\uDDE6|\uDDEC|\uDDFE|\uDDEA|\uDDED|\uDDF3|\uDDF1|\uDDF9|\uDDF7|\uDDF2)|\uDDF6\uD83C\uDDE6|\uDDF7\uD83C(?:\uDDEA|\uDDF4|\uDDFA|\uDDFC|\uDDF8)|\uDDF8\uD83C(?:\uDDFB|\uDDF2|\uDDF9|\uDDE6|\uDDF3|\uDDE8|\uDDF1|\uDDEC|\uDDFD|\uDDF0|\uDDEE|\uDDE7|\uDDF4|\uDDF8|\uDDED|\uDDE9|\uDDF7|\uDDEF|\uDDFF|\uDDEA|\uDDFE)|\uDDF9\uD83C(?:\uDDE9|\uDDEB|\uDDFC|\uDDEF|\uDDFF|\uDDED|\uDDF1|\uDDEC|\uDDF0|\uDDF4|\uDDF9|\uDDE6|\uDDF3|\uDDF7|\uDDF2|\uDDE8|\uDDFB)|\uDDFA\uD83C(?:\uDDEC|\uDDE6|\uDDF8|\uDDFE|\uDDF2|\uDDFF)|\uDDFB\uD83C(?:\uDDEC|\uDDE8|\uDDEE|\uDDFA|\uDDE6|\uDDEA|\uDDF3)|\uDDFC\uD83C(?:\uDDF8|\uDDEB)|\uDDFD\uD83C\uDDF0|\uDDFE\uD83C(?:\uDDF9|\uDDEA)|\uDDFF\uD83C(?:\uDDE6|\uDDF2|\uDDFC))))[\uFE00-\uFE0F\u200D]*)+)/gi),
        (ay = new RegExp(
          iy
            .toString()
            .replace("/", "")
            .replace("/gi", "")
            .replace("[#\\uFF03]", "[#\\uFF03]?"),
          "gi"
        ))),
      e ? ay : iy
    );
  }
  var ly = {
    fetch: hy,
    fetchText: async function (...e) {
      const t = await hy(...e);
      return await t.text();
    },
    fetchJson: async function (...e) {
      const t = await hy(...e);
      return await t.json();
    },
    getCache: function () {
      return uy;
    },
    cleanCache: function () {
      gy("cleaning fetcher cache"), (uy = []);
    },
    ignoreCache: function (e = 1) {
      cy += e;
    },
    isIgnoreCache: function () {
      return cy > 0;
    },
  };
  let uy = [],
    cy = 0;
  const dy = 2e4,
    fy = 864e5,
    py = !1;
  async function hy(e, t = {}, n = dy) {
    return new Promise((r, o) => {
      (async () => {
        let i = setTimeout(() => {
          i && ((i = null), o({ message: "Timed out" }));
        }, n);
        try {
          const n = await (async function (e, t) {
            if (
              (gy(`fetching ${e}`),
              ((t = t || {}).method = t.method || "GET"),
              t.method && "GET" !== t.method)
            )
              return fetch(e, t);
            if (cy <= 0) {
              const t = Date.now();
              uy = uy.filter((e) => t - e.on < fy);
              const n = uy.find((t) => t.url === e);
              if (n) return gy("  fetch cache hit"), n.res.clone();
            } else gy("  ignoring fetch cache");
            cy > 0 && cy--;
            const n = await fetch(e, t);
            return uy.push({ url: e, on: Date.now(), res: n.clone() }), n;
          })(e, { credentials: "include", ...t });
          if (!i) return;
          if ((clearTimeout(i), (i = null), n.ok)) return void r(n);
          if (400 !== n.status) return void o({ message: String(n.status) });
          try {
            const e = await n.text();
            o({ message: String(n.status), body: e });
          } catch (e) {
            o({ message: String(n.status), body: null });
          }
        } catch (e) {
          if (!i) return;
          clearTimeout(i), (i = null), o(e);
        }
      })();
    });
  }
  function gy(e) {
    py && console.log(`%c${e}`, "color: #00ec91");
  }
  var my = ly,
    vy = {
      get: async function (e) {
        const t = await yy();
        return (
          await by,
          (by = new Promise((n, r) => {
            const o = t
              .transaction("data", "readonly")
              .objectStore("data")
              .get(e);
            (o.onsuccess = (e) => {
              n(e.target.result ? e.target.result.value : void 0);
            }),
              (o.onerror = () => {
                console.error("idb-controller → get", {
                  key: e,
                  req: o,
                  error: o.error,
                }),
                  r(o.error);
              });
          })),
          by
        );
      },
      set: async function (e, t) {
        const n = await yy();
        return (
          await by,
          (by = new Promise((r, o) => {
            const i = n
              .transaction("data", "readwrite")
              .objectStore("data")
              .put({ id: e, value: t });
            (i.onsuccess = () => {
              r();
            }),
              (i.onerror = () => {
                console.error("idb-controller → set", {
                  key: e,
                  req: i,
                  error: i.error,
                }),
                  o(i.error);
              });
          })),
          by
        );
      },
      delete: async function (e) {
        const t = await yy();
        return (
          await by,
          (by = new Promise((n, r) => {
            const o = t
              .transaction("data", "readwrite")
              .objectStore("data")
              .delete(e);
            (o.onsuccess = () => {
              n();
            }),
              (o.onerror = () => {
                console.error("idb-controller → delete", {
                  key: e,
                  req: o,
                  error: o.error,
                }),
                  r(o.error);
              });
          })),
          by
        );
      },
      getAllKeys: async function () {
        const e = await yy();
        return (
          await by,
          (by = new Promise((t, n) => {
            const r = e
              .transaction("data", "readonly")
              .objectStore("data")
              .getAllKeys();
            (r.onsuccess = (e) => {
              const n = e.target.result;
              t(n);
            }),
              (r.onerror = () => {
                n(r.error);
              });
          })),
          by
        );
      },
    };
  let by = Promise.resolve();
  async function yy() {
    const e = yy;
    return (
      e.db ||
        (e.db = await new Promise((e, t) => {
          const n = indexedDB.open("inssist", 1);
          (n.onupgradeneeded = (e) => {
            e.target.result.createObjectStore("data", { keyPath: "id" });
          }),
            (n.onsuccess = (t) => {
              e(t.target.result);
            }),
            (n.onerror = () => {
              console.error("idb-controller → getDb", {
                req: n,
                error: n.error,
              }),
                t(n.error);
            });
        })),
      e.db
    );
  }
  var wy = { controller: vy };
  const { model: _y, transaction: Sy } = ib;
  var xy = {
    controller: {
      init: function () {
        return (
          u.is.popup &&
            (this._insertAnalyticsScript(),
            this._initIframeMessage(),
            this._sendBgEvents()),
          this
        );
      },
      _insertAnalyticsScript: function () {
        globalThis.ga = (...e) => {
          (globalThis.ga.q = globalThis.ga.q || []).push(e);
        };
        const e = document.createElement("script");
        (e.src = "/js/analytics.js"), document.body.appendChild(e);
        const t = "ga:clientId";
        globalThis.ga("create", "UA-146823118-1", {
          storage: "none",
          clientId: localStorage.getItem(t),
        }),
          globalThis.ga(function (e) {
            localStorage.setItem(t, e.get("clientId"));
          }),
          globalThis.ga("set", "checkProtocolTask", () => {}),
          globalThis.ga("require", "displayfeatures");
      },
      _initIframeMessage: function () {
        ny.on("ga.send-event", (...e) => {
          this.sendEvent(...e);
        });
      },
      _sendBgEvents: async function () {
        const e = (await wy.controller.get("ga.bgEvents")) || [];
        await wy.controller.set("ga.bgEvents", []);
        for (const t of e) this._ga(...t);
      },
      sendPageview: function () {
        if (!this._enabled()) return this;
        const e = u.is.background ? "background" : document.location.pathname;
        return this._ga("send", "pageview", e), this;
      },
      sendInstall: function () {
        if (!_y.state.installedEventSent) {
          const e = chrome.runtime.getManifest().version,
            t = "installed:" + (globalThis.electron ? "electron" : "chrome");
          this.sendEvent("user", t, e),
            Sy((e) => {
              e.installedEventSent = !0;
            });
        }
        return this;
      },
      sendEvent: function (e, t, n, r, o = { nonInteraction: 1 }) {
        if (!e) throw new Error("[$ga] category is required");
        if (!t) throw new Error("[$ga] action is required");
        if (r && !Number.isInteger(r))
          throw new Error("[$ga] value must be an integer");
        return this._enabled()
          ? (this._ga("send", "event", e, t, n || null, r || null, o || null),
            this)
          : (console.log("%c[$ga]", "color: #00c579", ...arguments), this);
      },
      _enabled: function () {
        return !u.is.development;
      },
      _ga: async function (...e) {
        if (u.is.background) {
          const t = (await wy.controller.get("ga.bgEvents")) || [];
          t.push(e), await wy.controller.set("ga.bgEvents", t);
        } else {
          if (!globalThis.ga) return;
          globalThis.ga(...e);
        }
      },
    },
  };
  const Py = {
      noNetwork: "no-network",
      timedOut: "timed-out",
      redirectToLogin: "redirect-to-login",
      suspended: "suspended-400",
      missingPost: "missing-post-400x",
      missingUser: "missing-user",
      forbidden: "forbidden-403",
      notFound: "not-found-404",
      tooManyRequests: "too-many-requests-429",
      serverIsDown: "server-is-down-500",
      badGateway: "bad-gateway-502",
      serviceUnavailable: "service-unavailable-503",
      serviceDown: "service-down-560",
      other: "other",
    },
    Dy = {
      "Failed to fetch": Py.noNetwork,
      "Timed out": Py.timedOut,
      "Redirect to login": Py.redirectToLogin,
      "Missing user": Py.missingUser,
      400: Py.suspended,
      "400x": Py.missingPost,
      403: Py.forbidden,
      404: Py.notFound,
      429: Py.tooManyRequests,
      500: Py.serverIsDown,
      502: Py.badGateway,
      503: Py.serviceUnavailable,
      560: Py.serviceDown,
    };
  class ky {
    constructor(e, t, n, r) {
      (this.result = e),
        (this.error = t ? { code: t, message: n, body: r } : null);
    }
    isSuccess() {
      return !this.error;
    }
    reportError(e, t) {
      return (
        this.error.code === Py.other &&
          lb.controller.sendError(
            `ig-api.${e}: unknown error`,
            "error",
            { details: t },
            { actor: "ig-api" }
          ),
        this
      );
    }
    static ofResult(e) {
      return new ky(e);
    }
    static ofNetworkError(e) {
      e &&
        e.message &&
        "400" === e.message &&
        ((e && "missing media" === e.body) ||
          (e && "Sorry, this photo has been deleted" === e.body)) &&
        (e.message = "400x");
      const t = (e && e.message && Dy[e.message]) || Py.other,
        n = (e && e.message) || null,
        r = (e && e.body) || null;
      return new ky(null, t, n, r);
    }
  }
  const Ey = { headers: { "x-ig-app-id": "1217981644879628" } };
  async function Ty(e) {
    var t;
    const n = O("https://i.instagram.com/api/v1/users/web_profile_info/", {
        username: e,
      }),
      r = await my.fetchJson(n, Ey);
    return (
      (null == r || null === (t = r.data) || void 0 === t ? void 0 : t.user) ||
      null
    );
  }
  function Iy(e, t) {
    const n = Date.now();
    return e * (Math.log(5270400) / Math.log(0.061 * (n - t)));
  }
  function Cy(e) {
    if (e && e.includes(fb.challenge)) {
      const e = new Error();
      throw ((e.message = "400"), (e.body = "Challenge"), e);
    }
    return e;
  }
  function Fy(e) {
    if (e && e.includes(fb.login.link)) {
      const e = new Error();
      throw (
        ((e.message = "Redirect to login"), (e.body = "Redirect to login"), e)
      );
    }
    return e;
  }
  function Ay(e, t) {
    if (t.regexp) {
      const n = $b(t.regexp);
      for (const t of n) {
        const n = e.match(t);
        if (n && n.length >= 2) return n[1];
      }
      return null;
    }
    if (t.prefix && t.suffix) {
      let n = e.indexOf(t.prefix);
      if (-1 === n) return null;
      n += t.prefix.length;
      const r = e.indexOf(t.suffix, n);
      return -1 === r ? null : e.substring(n, r);
    }
    return t(e);
  }
  function Oy(e, t) {
    const n = async function (...n) {
      try {
        const t = await e(...n);
        return ky.ofResult(t);
      } catch (e) {
        return ky.ofNetworkError(e).reportError(t, e);
      }
    };
    return q.on(`ig-api.${t}`, n), n;
  }
  var My = {
      api: {
        fetchUserId: Oy(async function (e) {
          const t = await Ty(e);
          return (null == t ? void 0 : t.id) || null;
        }, "fetch-user-id"),
        fetchViewerInfo: Oy(async function () {
          let e;
          try {
            e = await (async function () {
              const e =
                "https://i.instagram.com/api/v1/accounts/edit/web_form_data/";
              my.ignoreCache();
              const t = (function (e) {
                try {
                  return JSON.parse(e);
                } catch (e) {
                  return null;
                }
              })(await my.fetchText(e, Ey));
              if (!t) return null;
              const n = t.form_data.username,
                r = await Ty(n);
              if (!r) return null;
              return {
                userId: r.id,
                username: n,
                fullName: r.full_name,
                email: t.form_data.email,
                avatarUrl: r.profile_pic_url_hd,
                isProfessionalAccount:
                  r.is_professional_account || r.is_business_account,
              };
            })();
          } catch {
            e = await (async function () {
              var e, t, n, r, o;
              const i = await my.fetchText(fb.editAccount.url);
              Cy(i);
              const a = (function (e) {
                  try {
                    var t, n;
                    const r = JSON.parse(M(Ay(e, fb.sharedData))),
                      o =
                        null == r || null === (t = r.entry_data) || void 0 === t
                          ? void 0
                          : t.ProfilePage;
                    if (o && o[0] && !o[0].graphql)
                      try {
                        const t = Ay(e, fb.additionalData);
                        r.entry_data.ProfilePage[0] = JSON.parse(
                          M(t.split("/',").splice(1).join("/',"))
                        );
                      } catch (e) {}
                    const i =
                      null == r || null === (n = r.entry_data) || void 0 === n
                        ? void 0
                        : n.PostPage;
                    if (i && i[0] && !i[0].graphql)
                      try {
                        const t = Ay(e, fb.additionalData);
                        r.entry_data.PostPage[0] = JSON.parse(
                          M(t.split("/',").splice(1).join("/',"))
                        );
                      } catch (e) {}
                    return r;
                  } catch (e) {
                    return (
                      xy.controller.sendEvent("net", "data-extraction-failed"),
                      null
                    );
                  }
                })(i),
                s =
                  null == a || null === (e = a.config) || void 0 === e
                    ? void 0
                    : e.viewer;
              if (!s) return null;
              return {
                userId: s.id,
                username: s.username,
                fullName: s.full_name,
                email:
                  (null == a ||
                  null === (t = a.entry_data) ||
                  void 0 === t ||
                  null === (n = t.SettingsPages) ||
                  void 0 === n ||
                  null === (r = n[0]) ||
                  void 0 === r ||
                  null === (o = r.form_data) ||
                  void 0 === o
                    ? void 0
                    : o.email) || null,
                avatarUrl: s.profile_pic_url,
                isProfessionalAccount: s.is_professional_account,
              };
            })();
          }
          return e;
        }, "fetch-viewer-info"),
        fetchLoginActivity: Oy(async function () {
          return my.fetchJson(fb.loginActivity.url, Ey);
        }, "fetch-login-activity"),
        fetchTag: Oy(async function (e, { incognito: t = !1 } = {}) {
          const n = {
            name: e,
            isBanned: null,
            isFlagged: null,
            avgLikes: null,
            avgComments: null,
            avgPosts: null,
            totalPosts: null,
            relevantTags: [],
          };
          let r,
            o = !1;
          try {
            const n = fb.hashtag.url(e, { json: !0 }),
              o = t ? "omit" : "include";
            my.ignoreCache(),
              (r = await my.fetchText(n, { credentials: o, ...Ey }));
          } catch (e) {
            if ("404" !== e.message) throw e;
            o = !0;
          }
          if ((Cy(r), Fy(r), o))
            return (n.isBanned = !0), (n.isFlagged = !1), n;
          const i = JSON.parse(r);
          if ("graphql" in i) {
            const t = i.graphql.hashtag,
              r = t.edge_hashtag_to_top_posts.edges,
              o = t.edge_hashtag_to_media.edges;
            let a,
              s = 0,
              l = 0;
            {
              const e = r
                .map((e) => {
                  const t = e.node,
                    n = 1e3 * t.taken_at_timestamp,
                    r = t.edge_liked_by.count,
                    o = t.edge_media_to_comment.count;
                  return { likes: Iy(r, n), comments: Iy(o, n) };
                })
                .sort(
                  (e, t) => oy(e.likes, t.comments) - oy(t.likes, t.comments)
                )
                .slice(
                  Math.floor(r.length / 2 - Math.min(5, r.length / 3 / 2)),
                  Math.floor(r.length / 2 + Math.min(5, r.length / 3 / 2))
                );
              if (e.length > 0) {
                for (const t of e) (s += t.likes), (l += t.comments);
                (s = Math.round(s / e.length)), (l = Math.round(l / e.length));
              }
            }
            {
              const e = new Set(),
                t = o
                  .map((e) => ({
                    ts: 1e3 * e.node.taken_at_timestamp,
                    ownerId: e.node.owner.id,
                  }))
                  .sort((e, t) => t.ts - e.ts)
                  .slice(0, 30)
                  .filter((t) => {
                    const n = t.ownerId;
                    return !e.has(n) && (e.add(n), !0);
                  })
                  .map((e) => e.ts),
                n = t[0] - t[t.length - 1],
                r = Math.max(100, n / t.length);
              a = Math.round(v / r);
            }
            let u = [];
            {
              const t = {},
                n = [
                  { edges: r, relevance: 2 },
                  { edges: o, relevance: 1 },
                ];
              for (const e of n) {
                const n = sy(),
                  r = e.edges
                    .map((e) => {
                      var t, n, r, o, i;
                      return (
                        (null === (t = e.node) ||
                        void 0 === t ||
                        null === (n = t.edge_media_to_caption) ||
                        void 0 === n ||
                        null === (r = n.edges) ||
                        void 0 === r ||
                        null === (o = r[0]) ||
                        void 0 === o ||
                        null === (i = o.node) ||
                        void 0 === i
                          ? void 0
                          : i.text) || ""
                      );
                    })
                    .map((e) => e.match(n) || [])
                    .flat()
                    .map((e) => e.replace("#", ""));
                for (const n of r) t[n] = (t[n] || 0) + e.relevance;
              }
              for (const n in t) {
                if (n === e) continue;
                const r = t[n];
                u.push({ tag: n, relevance: r });
              }
              u = u.sort((e, t) => t.relevance - e.relevance).map((e) => e.tag);
            }
            (n.isBanned = !1),
              (n.isFlagged = t.is_top_media_only && !t.allow_following),
              (n.totalPosts = t.edge_hashtag_to_media.count),
              (n.avgLikes = s),
              (n.avgComments = l),
              (n.avgPosts = a),
              (n.relevantTags = u);
          } else {
            const t = i.data,
              r = t.top.sections
                .map((e) => e.layout_content.medias)
                .flat()
                .map((e) => e.media),
              o = t.recent.sections
                .map((e) => e.layout_content.medias)
                .flat()
                .map((e) => e.media);
            let a = 0,
              s = 0;
            {
              const e = r
                .map((e) => {
                  const t = 1e3 * e.taken_at,
                    n = e.like_count,
                    r = e.comment_count;
                  return { likes: Iy(n, t), comments: Iy(r, t) };
                })
                .sort(
                  (e, t) => oy(e.likes, t.comments) - oy(t.likes, t.comments)
                )
                .slice(
                  Math.floor(r.length / 2 - Math.min(5, r.length / 3 / 2)),
                  Math.floor(r.length / 2 + Math.min(5, r.length / 3 / 2))
                );
              if (e.length > 0) {
                for (const t of e) (a += t.likes), (s += t.comments);
                (a = Math.round(a / e.length)), (s = Math.round(s / e.length));
              }
            }
            let l = 0;
            {
              const e = new Set(),
                t = o
                  .map((e) => ({ ts: 1e3 * e.taken_at, ownerId: e.user.pk }))
                  .sort((e, t) => t.ts - e.ts)
                  .slice(0, 15)
                  .filter((t) => {
                    const n = t.ownerId;
                    return !e.has(n) && (e.add(n), !0);
                  })
                  .map((e) => e.ts);
              if (t.length > 2) {
                const e = t[0] - t[t.length - 1],
                  n = Math.max(100, e / t.length);
                l = Math.round(v / n);
              }
            }
            let u = [];
            {
              const t = {},
                n = [
                  { posts: r, relevance: 2 },
                  { posts: o, relevance: 1 },
                ];
              for (const e of n) {
                const n = sy(),
                  r = e.posts
                    .map((e) => {
                      var t;
                      return (
                        (null === (t = e.caption) || void 0 === t
                          ? void 0
                          : t.text) || ""
                      );
                    })
                    .map((e) => e.match(n) || [])
                    .flat()
                    .map((e) => e.replace("#", ""));
                for (const n of r) t[n] = (t[n] || 0) + e.relevance;
              }
              for (const n in t) {
                if (n === e) continue;
                const r = t[n];
                u.push({ tag: n, relevance: r });
              }
              u = u.sort((e, t) => t.relevance - e.relevance).map((e) => e.tag);
            }
            (n.isBanned = !1),
              (n.isFlagged = !t.allow_following && !!t.recent.warning_message),
              (n.totalPosts = t.media_count),
              (n.avgLikes = a),
              (n.avgComments = s),
              (n.avgPosts = l),
              (n.relevantTags = u);
          }
          return n;
        }, "fetch-tag"),
        fetchUserPosts: Oy(async function e(t, n = 10, r = [], o = null) {
          const i = O(
              `https://i.instagram.com/api/v1/feed/user/${t}/username/`,
              { count: 33, ...(o && { max_id: o }) }
            ),
            a = await my.fetchJson(i, Ey);
          r.push(...a.items),
            r.length < n &&
              a.more_available &&
              (await e(t, n, r, a.next_max_id));
          return (r = r.slice(0, n)).map((e) => {
            var t, n, r, o, i, a, s, l, u, c;
            const d =
              (null === (t = e.carousel_media) ||
              void 0 === t ||
              null === (n = t[0].image_versions2) ||
              void 0 === n
                ? void 0
                : n.candidates) ||
              (null === (r = e.image_versions2) || void 0 === r
                ? void 0
                : r.candidates) ||
              [];
            return {
              id: String(e.pk),
              code: e.code,
              stats: {
                likes: Number(e.like_count) || 0,
                comments: Number(e.comment_count) || 0,
              },
              on: 1e3 * e.taken_at,
              caption:
                (null === (o = e.caption) || void 0 === o ? void 0 : o.text) ||
                "",
              owner: String(
                (null === (i = e.user) || void 0 === i ? void 0 : i.pk) || ""
              ),
              ownerName:
                (null === (a = e.user) || void 0 === a ? void 0 : a.username) ||
                "",
              type:
                { 1: "photo", 2: "video", 8: "carousel" }[e.media_type] ||
                "photo",
              isLiked: e.has_liked,
              isVideo: "view_count" in e,
              imgx:
                (null === (s = d[0]) || void 0 === s ? void 0 : s.url) || null,
              img:
                (null === (l = d.at(-1)) || void 0 === l ? void 0 : l.url) ||
                null,
              imgMedium:
                (null === (u = d.find((e) => 320 === e.width)) || void 0 === u
                  ? void 0
                  : u.url) ||
                (null === (c = d[0]) || void 0 === c ? void 0 : c.url) ||
                null,
            };
          });
        }, "fetch-user-posts"),
        fetchExplorePageUsernames: Oy(async function () {
          my.ignoreCache();
          const e = await my.fetchText(fb.explore.url);
          Cy(e), Fy(e);
          const t = /"username": ?"([^"]+)"/gi;
          return e
            .match(t)
            .map((e) => e.replace(t, "$1"))
            .filter(ry);
        }, "fetch-explore-page-usernames"),
        searchProfiles: Oy(async function (e) {
          const t = O(`${fb.base}web/search/topsearch/`, {
            context: "user",
            query: e,
          });
          return (await my.fetchJson(t)).users.map((e) => ({
            id: e.user.pk,
            username: e.user.username,
            fullName: e.user.full_name,
            avatar: e.user.profile_pic_url,
          }));
        }, "search-profiles"),
        normalizePostStat24h: Iy,
        createUserObject: function (e) {
          return {
            userId: e.id,
            username: e.username,
            fullName: e.full_name,
            avatarUrl: e.profile_pic_url,
            bio: e.biography,
            postsCount: e.edge_owner_to_timeline_media.count,
            followersCount: e.edge_followed_by.count,
            followingsCount: e.edge_follow.count,
            isFresh: e.is_joined_recently,
            isPrivate: e.is_private,
            isVerified: e.is_verified,
            isBusiness: e.is_business_account,
            businessCategory: e.category_name,
            isFollowingViewer: e.follows_viewer,
            isFollowedByViewer: e.followed_by_viewer,
            hasAvatar: e.profile_pic_url.includes("150x150"),
            hasHighlights: e.highlight_reel_count > 0,
            hasIgtv: e.edge_felix_video_timeline.count > 0,
            lastPosts: e.edge_owner_to_timeline_media.edges.map((e) => ({
              ts: 1e3 * e.node.taken_at_timestamp,
            })),
          };
        },
      },
      Response: ky,
      ec: Py,
    },
    Ry = "fb-api.fb-error",
    Ny = "fb-api.unknown",
    By = {
      isError: function (e, t = null) {
        return e && e[Uy] && (!t || e.code === t);
      },
      checkAuth: qy(async function e(t = !0) {
        let n;
        try {
          my.ignoreCache(),
            (n = await my.fetch(
              "https://www.facebook.com/settings?tab=your_facebook_information"
            ));
        } catch (n) {
          return t
            ? e(!1)
            : (lb.controller.sendError(
                "fbApi.checkAuth: failed",
                "error",
                { details: n },
                { actor: "fb-api" }
              ),
              !1);
        }
        if (n.redirected) return !1;
        return !0;
      }, "check-auth"),
      switchToFcs: qy(async function () {
        await Ly({
          url: "https://business.facebook.com/api/graphql/",
          body: {
            doc_id: "7406802046028852",
            variables: JSON.stringify({
              config: { user_saved_tailoring_experience: "DEFAULT" },
            }),
          },
        });
      }, "switch-to-fcs"),
      fcsDeletePost: qy(async function (e) {
        await Ly({
          url: R.createUrl(
            "https://business.facebook.com/media/manager/instagram_media/delete/",
            { id: e }
          ),
        });
      }, "fcs-delete-post"),
      fcsSaveAsDraft: qy(async function (e, { caption: t = null } = {}) {
        await Ly({
          url: R.createUrl(
            "https://business.facebook.com/media/manager/instagram_media/edit/save/",
            {
              "edit_data[media_id]": e,
              "edit_data[save_as_draft]": !0,
              "edit_data[source_product_name]": "MEDIA_MANAGER",
              ...(t && { "edit_data[caption]": t }),
            }
          ),
        });
      }, "fcs-save-as-draft"),
      fcsSaveAsScheduled: qy(async function (e, t, { caption: n = null } = {}) {
        await Ly({
          url: R.createUrl(
            "https://business.facebook.com/media/manager/instagram_media/edit/save/",
            {
              "edit_data[media_id]": e,
              "edit_data[save_as_scheduled]": !0,
              "edit_data[scheduled_publish_time]": Math.round(t / 1e3),
              "edit_data[source_product_name]": "MEDIA_MANAGER",
              ...(n && { "edit_data[caption]": n }),
            }
          ),
        });
      }, "fcs-save-as-scheduled"),
      fcsSaveAsPublished: qy(async function (e, { caption: t = null } = {}) {
        await Ly({
          url: R.createUrl(
            "https://business.facebook.com/media/manager/instagram_media/edit/save/",
            {
              "edit_data[media_id]": e,
              "edit_data[publish_now]": !0,
              "edit_data[source_product_name]": "MEDIA_MANAGER",
              ...(t && { "edit_data[caption]": t }),
            }
          ),
        });
      }, "fcs-save-as-published"),
    };
  const Uy = Symbol("isFbApiError");
  function jy(e = {}) {
    return { ...e, [Uy]: !0 };
  }
  async function Ly({ url: e, incognito: t = !1, body: n = {} }) {
    var r;
    my.ignoreCache();
    const o =
        (null ===
          (r = (
            await my.fetchText("https://business.facebook.com/creatorstudio")
          ).match(/"DTSGInitialData"[^"]*"token":"([^"]*)"/)) || void 0 === r
          ? void 0
          : r[1]) || null,
      i =
        (
          await my.fetchText(e, {
            method: "POST",
            headers: { "content-type": "application/x-www-form-urlencoded" },
            body: R.createQueryString({
              __a: 1,
              locale: "en_US",
              ...(o && { fb_dtsg: o }),
              ...n,
            }),
          })
        ).replace("for (;;);", "") || "{}",
      a = JSON.parse(R.jsonEscape(i)),
      s = a.payload || {};
    if (
      (Array.isArray(s.error) && s.error.length) ||
      (R.isObject(s.error) && Object.keys(s.error).length) ||
      s.error_code ||
      s.errorCode ||
      s.errorMessage
    )
      throw jy({ code: Ry, payload: s });
    return a;
  }
  function qy(e, t) {
    const n = async (...n) => {
      try {
        return await e(...n);
      } catch (e) {
        if (e && e[Uy]) throw ((e.method = t), e);
        throw (
          (lb.controller.sendError(
            `fb-api.${t}`,
            "error",
            { details: e },
            { actor: "fb-api" }
          ),
          jy({ code: Ny, method: t, details: e }))
        );
      }
    };
    return (
      q.on(`fb-api.${t}`, async (...e) => {
        let t, r;
        try {
          t = await n(...e);
        } catch (e) {
          r = e;
        }
        return { result: t, error: r };
      }),
      n
    );
  }
  var Hy = { api: By };
  const { model: Vy } = ib,
    zy = {
      isLoggedIn: function () {
        return !!Vy.state.billing.account.token;
      },
      hasPro: function ({ feature: e } = {}) {
        var t;
        return (
          !(
            !u.is.development ||
            !(null === (t = Vy.state.experiments) || void 0 === t
              ? void 0
              : t.enabled)
          ) ||
          !!zy.hasProPaid() ||
          !!zy.hasProPromocode() ||
          !(!e || !zy.hasTrialFeature(e))
        );
      },
      hasTrialFeature: function (e = "*") {
        if (!u.features.trial) return !1;
        const t = Vy.state.billing.trial;
        if (!t) return !1;
        if ("*" === e) {
          for (e in t)
            if (
              u.options.trialFeaturesLimits[e] &&
              u.options.trialFeaturesLimits[e](t)
            )
              return !1;
          return !0;
        }
        return (
          !!e &&
          (!u.options.trialFeaturesLimits[e] ||
            !u.options.trialFeaturesLimits[e](t))
        );
      },
      hasProPaid: function (e = null) {
        if (!zy.isLoggedIn()) return !1;
        const t = Vy.state.billing,
          n = Date.now(),
          r = t.optimistic || { on: 0, plan: null };
        if (r.plan === e && r.on <= n && n - r.on <= 36e5) return !0;
        for (const r in u.options.billingPlans) {
          if (e && e !== r) continue;
          const a = u.options.billingPlans[r];
          if (a.isActive) {
            if (a.isActive(Vy.state)) return !0;
          } else if ("subscription" === a.type) {
            var o;
            const e =
              (null === (o = t.subscriptions) || void 0 === o
                ? void 0
                : o[r]) || {};
            if ("active" === e.state) return !0;
            if ("canceled" === e.state && n <= e.next) return !0;
          } else if ("product" === a.type) {
            var i;
            if (
              ((null === (i = t.products) || void 0 === i ? void 0 : i[r]) ||
                0) > 0
            )
              return !0;
          }
        }
        return !1;
      },
      hasProPromocode: function () {
        const e = Vy.state.billing.promocode;
        if (!e) return !1;
        const t = Date.now(),
          [n, r, o] = e.split("."),
          i = new Date(`${r}-${n}-${o}`);
        return (
          i.setHours(23), i.setMinutes(59), i.setSeconds(59), i.getTime() >= t
        );
      },
      fspringExpirationDate: function (e) {
        if (!e) return null;
        const t = Vy.state.billing,
          n = (t.subscriptions && t.subscriptions[e]) || {};
        return n.active && "canceled" === n.state
          ? new Date(n.next).toLocaleDateString()
          : null;
      },
    };
  var Gy = {},
    $y = me;
  /**
   * [js-sha256]{@link https://github.com/emn178/js-sha256}
   *
   * @version 0.9.0
   * @author Chen, Yi-Cyuan [emn178@gmail.com]
   * @copyright Chen, Yi-Cyuan 2014-2017
   * @license MIT
   */
  !(function () {
    var t = "input is invalid type",
      n = "object" == typeof window,
      r = n ? window : {};
    r.JS_SHA256_NO_WINDOW && (n = !1);
    var o = !n && "object" == typeof self,
      i =
        !r.JS_SHA256_NO_NODE_JS &&
        "object" == typeof $y &&
        $y.versions &&
        $y.versions.node;
    i ? (r = e) : o && (r = self);
    var a = !r.JS_SHA256_NO_COMMON_JS && Gy,
      s = !r.JS_SHA256_NO_ARRAY_BUFFER && "undefined" != typeof ArrayBuffer,
      l = "0123456789abcdef".split(""),
      u = [-2147483648, 8388608, 32768, 128],
      c = [24, 16, 8, 0],
      d = [
        1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993,
        2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987,
        1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774,
        264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986,
        2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711,
        113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291,
        1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411,
        3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344,
        430227734, 506948616, 659060556, 883997877, 958139571, 1322822218,
        1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424,
        2428436474, 2756734187, 3204031479, 3329325298,
      ],
      f = ["hex", "array", "digest", "arrayBuffer"],
      p = [];
    (!r.JS_SHA256_NO_NODE_JS && Array.isArray) ||
      (Array.isArray = function (e) {
        return "[object Array]" === Object.prototype.toString.call(e);
      }),
      !s ||
        (!r.JS_SHA256_NO_ARRAY_BUFFER_IS_VIEW && ArrayBuffer.isView) ||
        (ArrayBuffer.isView = function (e) {
          return (
            "object" == typeof e &&
            e.buffer &&
            e.buffer.constructor === ArrayBuffer
          );
        });
    var h = function (e, t) {
        return function (n) {
          return new y(t, !0).update(n)[e]();
        };
      },
      g = function (e) {
        var t = h("hex", e);
        i && (t = m(t, e)),
          (t.create = function () {
            return new y(e);
          }),
          (t.update = function (e) {
            return t.create().update(e);
          });
        for (var n = 0; n < f.length; ++n) {
          var r = f[n];
          t[r] = h(r, e);
        }
        return t;
      },
      m = function (e, t) {},
      v = function (e, t) {
        return function (n, r) {
          return new w(n, t, !0).update(r)[e]();
        };
      },
      b = function (e) {
        var t = v("hex", e);
        (t.create = function (t) {
          return new w(t, e);
        }),
          (t.update = function (e, n) {
            return t.create(e).update(n);
          });
        for (var n = 0; n < f.length; ++n) {
          var r = f[n];
          t[r] = v(r, e);
        }
        return t;
      };
    function y(e, t) {
      t
        ? ((p[0] =
            p[16] =
            p[1] =
            p[2] =
            p[3] =
            p[4] =
            p[5] =
            p[6] =
            p[7] =
            p[8] =
            p[9] =
            p[10] =
            p[11] =
            p[12] =
            p[13] =
            p[14] =
            p[15] =
              0),
          (this.blocks = p))
        : (this.blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
        e
          ? ((this.h0 = 3238371032),
            (this.h1 = 914150663),
            (this.h2 = 812702999),
            (this.h3 = 4144912697),
            (this.h4 = 4290775857),
            (this.h5 = 1750603025),
            (this.h6 = 1694076839),
            (this.h7 = 3204075428))
          : ((this.h0 = 1779033703),
            (this.h1 = 3144134277),
            (this.h2 = 1013904242),
            (this.h3 = 2773480762),
            (this.h4 = 1359893119),
            (this.h5 = 2600822924),
            (this.h6 = 528734635),
            (this.h7 = 1541459225)),
        (this.block = this.start = this.bytes = this.hBytes = 0),
        (this.finalized = this.hashed = !1),
        (this.first = !0),
        (this.is224 = e);
    }
    function w(e, n, r) {
      var o,
        i = typeof e;
      if ("string" === i) {
        var a,
          l = [],
          u = e.length,
          c = 0;
        for (o = 0; o < u; ++o)
          (a = e.charCodeAt(o)) < 128
            ? (l[c++] = a)
            : a < 2048
            ? ((l[c++] = 192 | (a >> 6)), (l[c++] = 128 | (63 & a)))
            : a < 55296 || a >= 57344
            ? ((l[c++] = 224 | (a >> 12)),
              (l[c++] = 128 | ((a >> 6) & 63)),
              (l[c++] = 128 | (63 & a)))
            : ((a = 65536 + (((1023 & a) << 10) | (1023 & e.charCodeAt(++o)))),
              (l[c++] = 240 | (a >> 18)),
              (l[c++] = 128 | ((a >> 12) & 63)),
              (l[c++] = 128 | ((a >> 6) & 63)),
              (l[c++] = 128 | (63 & a)));
        e = l;
      } else {
        if ("object" !== i) throw new Error(t);
        if (null === e) throw new Error(t);
        if (s && e.constructor === ArrayBuffer) e = new Uint8Array(e);
        else if (!(Array.isArray(e) || (s && ArrayBuffer.isView(e))))
          throw new Error(t);
      }
      e.length > 64 && (e = new y(n, !0).update(e).array());
      var d = [],
        f = [];
      for (o = 0; o < 64; ++o) {
        var p = e[o] || 0;
        (d[o] = 92 ^ p), (f[o] = 54 ^ p);
      }
      y.call(this, n, r),
        this.update(f),
        (this.oKeyPad = d),
        (this.inner = !0),
        (this.sharedMemory = r);
    }
    (y.prototype.update = function (e) {
      if (!this.finalized) {
        var n,
          r = typeof e;
        if ("string" !== r) {
          if ("object" !== r) throw new Error(t);
          if (null === e) throw new Error(t);
          if (s && e.constructor === ArrayBuffer) e = new Uint8Array(e);
          else if (!(Array.isArray(e) || (s && ArrayBuffer.isView(e))))
            throw new Error(t);
          n = !0;
        }
        for (var o, i, a = 0, l = e.length, u = this.blocks; a < l; ) {
          if (
            (this.hashed &&
              ((this.hashed = !1),
              (u[0] = this.block),
              (u[16] =
                u[1] =
                u[2] =
                u[3] =
                u[4] =
                u[5] =
                u[6] =
                u[7] =
                u[8] =
                u[9] =
                u[10] =
                u[11] =
                u[12] =
                u[13] =
                u[14] =
                u[15] =
                  0)),
            n)
          )
            for (i = this.start; a < l && i < 64; ++a)
              u[i >> 2] |= e[a] << c[3 & i++];
          else
            for (i = this.start; a < l && i < 64; ++a)
              (o = e.charCodeAt(a)) < 128
                ? (u[i >> 2] |= o << c[3 & i++])
                : o < 2048
                ? ((u[i >> 2] |= (192 | (o >> 6)) << c[3 & i++]),
                  (u[i >> 2] |= (128 | (63 & o)) << c[3 & i++]))
                : o < 55296 || o >= 57344
                ? ((u[i >> 2] |= (224 | (o >> 12)) << c[3 & i++]),
                  (u[i >> 2] |= (128 | ((o >> 6) & 63)) << c[3 & i++]),
                  (u[i >> 2] |= (128 | (63 & o)) << c[3 & i++]))
                : ((o =
                    65536 + (((1023 & o) << 10) | (1023 & e.charCodeAt(++a)))),
                  (u[i >> 2] |= (240 | (o >> 18)) << c[3 & i++]),
                  (u[i >> 2] |= (128 | ((o >> 12) & 63)) << c[3 & i++]),
                  (u[i >> 2] |= (128 | ((o >> 6) & 63)) << c[3 & i++]),
                  (u[i >> 2] |= (128 | (63 & o)) << c[3 & i++]));
          (this.lastByteIndex = i),
            (this.bytes += i - this.start),
            i >= 64
              ? ((this.block = u[16]),
                (this.start = i - 64),
                this.hash(),
                (this.hashed = !0))
              : (this.start = i);
        }
        return (
          this.bytes > 4294967295 &&
            ((this.hBytes += (this.bytes / 4294967296) << 0),
            (this.bytes = this.bytes % 4294967296)),
          this
        );
      }
    }),
      (y.prototype.finalize = function () {
        if (!this.finalized) {
          this.finalized = !0;
          var e = this.blocks,
            t = this.lastByteIndex;
          (e[16] = this.block),
            (e[t >> 2] |= u[3 & t]),
            (this.block = e[16]),
            t >= 56 &&
              (this.hashed || this.hash(),
              (e[0] = this.block),
              (e[16] =
                e[1] =
                e[2] =
                e[3] =
                e[4] =
                e[5] =
                e[6] =
                e[7] =
                e[8] =
                e[9] =
                e[10] =
                e[11] =
                e[12] =
                e[13] =
                e[14] =
                e[15] =
                  0)),
            (e[14] = (this.hBytes << 3) | (this.bytes >>> 29)),
            (e[15] = this.bytes << 3),
            this.hash();
        }
      }),
      (y.prototype.hash = function () {
        var e,
          t,
          n,
          r,
          o,
          i,
          a,
          s,
          l,
          u = this.h0,
          c = this.h1,
          f = this.h2,
          p = this.h3,
          h = this.h4,
          g = this.h5,
          m = this.h6,
          v = this.h7,
          b = this.blocks;
        for (e = 16; e < 64; ++e)
          (t =
            (((o = b[e - 15]) >>> 7) | (o << 25)) ^
            ((o >>> 18) | (o << 14)) ^
            (o >>> 3)),
            (n =
              (((o = b[e - 2]) >>> 17) | (o << 15)) ^
              ((o >>> 19) | (o << 13)) ^
              (o >>> 10)),
            (b[e] = (b[e - 16] + t + b[e - 7] + n) << 0);
        for (l = c & f, e = 0; e < 64; e += 4)
          this.first
            ? (this.is224
                ? ((i = 300032),
                  (v = ((o = b[0] - 1413257819) - 150054599) << 0),
                  (p = (o + 24177077) << 0))
                : ((i = 704751109),
                  (v = ((o = b[0] - 210244248) - 1521486534) << 0),
                  (p = (o + 143694565) << 0)),
              (this.first = !1))
            : ((t =
                ((u >>> 2) | (u << 30)) ^
                ((u >>> 13) | (u << 19)) ^
                ((u >>> 22) | (u << 10))),
              (r = (i = u & c) ^ (u & f) ^ l),
              (v =
                (p +
                  (o =
                    v +
                    (n =
                      ((h >>> 6) | (h << 26)) ^
                      ((h >>> 11) | (h << 21)) ^
                      ((h >>> 25) | (h << 7))) +
                    ((h & g) ^ (~h & m)) +
                    d[e] +
                    b[e])) <<
                0),
              (p = (o + (t + r)) << 0)),
            (t =
              ((p >>> 2) | (p << 30)) ^
              ((p >>> 13) | (p << 19)) ^
              ((p >>> 22) | (p << 10))),
            (r = (a = p & u) ^ (p & c) ^ i),
            (m =
              (f +
                (o =
                  m +
                  (n =
                    ((v >>> 6) | (v << 26)) ^
                    ((v >>> 11) | (v << 21)) ^
                    ((v >>> 25) | (v << 7))) +
                  ((v & h) ^ (~v & g)) +
                  d[e + 1] +
                  b[e + 1])) <<
              0),
            (t =
              (((f = (o + (t + r)) << 0) >>> 2) | (f << 30)) ^
              ((f >>> 13) | (f << 19)) ^
              ((f >>> 22) | (f << 10))),
            (r = (s = f & p) ^ (f & u) ^ a),
            (g =
              (c +
                (o =
                  g +
                  (n =
                    ((m >>> 6) | (m << 26)) ^
                    ((m >>> 11) | (m << 21)) ^
                    ((m >>> 25) | (m << 7))) +
                  ((m & v) ^ (~m & h)) +
                  d[e + 2] +
                  b[e + 2])) <<
              0),
            (t =
              (((c = (o + (t + r)) << 0) >>> 2) | (c << 30)) ^
              ((c >>> 13) | (c << 19)) ^
              ((c >>> 22) | (c << 10))),
            (r = (l = c & f) ^ (c & p) ^ s),
            (h =
              (u +
                (o =
                  h +
                  (n =
                    ((g >>> 6) | (g << 26)) ^
                    ((g >>> 11) | (g << 21)) ^
                    ((g >>> 25) | (g << 7))) +
                  ((g & m) ^ (~g & v)) +
                  d[e + 3] +
                  b[e + 3])) <<
              0),
            (u = (o + (t + r)) << 0);
        (this.h0 = (this.h0 + u) << 0),
          (this.h1 = (this.h1 + c) << 0),
          (this.h2 = (this.h2 + f) << 0),
          (this.h3 = (this.h3 + p) << 0),
          (this.h4 = (this.h4 + h) << 0),
          (this.h5 = (this.h5 + g) << 0),
          (this.h6 = (this.h6 + m) << 0),
          (this.h7 = (this.h7 + v) << 0);
      }),
      (y.prototype.hex = function () {
        this.finalize();
        var e = this.h0,
          t = this.h1,
          n = this.h2,
          r = this.h3,
          o = this.h4,
          i = this.h5,
          a = this.h6,
          s = this.h7,
          u =
            l[(e >> 28) & 15] +
            l[(e >> 24) & 15] +
            l[(e >> 20) & 15] +
            l[(e >> 16) & 15] +
            l[(e >> 12) & 15] +
            l[(e >> 8) & 15] +
            l[(e >> 4) & 15] +
            l[15 & e] +
            l[(t >> 28) & 15] +
            l[(t >> 24) & 15] +
            l[(t >> 20) & 15] +
            l[(t >> 16) & 15] +
            l[(t >> 12) & 15] +
            l[(t >> 8) & 15] +
            l[(t >> 4) & 15] +
            l[15 & t] +
            l[(n >> 28) & 15] +
            l[(n >> 24) & 15] +
            l[(n >> 20) & 15] +
            l[(n >> 16) & 15] +
            l[(n >> 12) & 15] +
            l[(n >> 8) & 15] +
            l[(n >> 4) & 15] +
            l[15 & n] +
            l[(r >> 28) & 15] +
            l[(r >> 24) & 15] +
            l[(r >> 20) & 15] +
            l[(r >> 16) & 15] +
            l[(r >> 12) & 15] +
            l[(r >> 8) & 15] +
            l[(r >> 4) & 15] +
            l[15 & r] +
            l[(o >> 28) & 15] +
            l[(o >> 24) & 15] +
            l[(o >> 20) & 15] +
            l[(o >> 16) & 15] +
            l[(o >> 12) & 15] +
            l[(o >> 8) & 15] +
            l[(o >> 4) & 15] +
            l[15 & o] +
            l[(i >> 28) & 15] +
            l[(i >> 24) & 15] +
            l[(i >> 20) & 15] +
            l[(i >> 16) & 15] +
            l[(i >> 12) & 15] +
            l[(i >> 8) & 15] +
            l[(i >> 4) & 15] +
            l[15 & i] +
            l[(a >> 28) & 15] +
            l[(a >> 24) & 15] +
            l[(a >> 20) & 15] +
            l[(a >> 16) & 15] +
            l[(a >> 12) & 15] +
            l[(a >> 8) & 15] +
            l[(a >> 4) & 15] +
            l[15 & a];
        return (
          this.is224 ||
            (u +=
              l[(s >> 28) & 15] +
              l[(s >> 24) & 15] +
              l[(s >> 20) & 15] +
              l[(s >> 16) & 15] +
              l[(s >> 12) & 15] +
              l[(s >> 8) & 15] +
              l[(s >> 4) & 15] +
              l[15 & s]),
          u
        );
      }),
      (y.prototype.toString = y.prototype.hex),
      (y.prototype.digest = function () {
        this.finalize();
        var e = this.h0,
          t = this.h1,
          n = this.h2,
          r = this.h3,
          o = this.h4,
          i = this.h5,
          a = this.h6,
          s = this.h7,
          l = [
            (e >> 24) & 255,
            (e >> 16) & 255,
            (e >> 8) & 255,
            255 & e,
            (t >> 24) & 255,
            (t >> 16) & 255,
            (t >> 8) & 255,
            255 & t,
            (n >> 24) & 255,
            (n >> 16) & 255,
            (n >> 8) & 255,
            255 & n,
            (r >> 24) & 255,
            (r >> 16) & 255,
            (r >> 8) & 255,
            255 & r,
            (o >> 24) & 255,
            (o >> 16) & 255,
            (o >> 8) & 255,
            255 & o,
            (i >> 24) & 255,
            (i >> 16) & 255,
            (i >> 8) & 255,
            255 & i,
            (a >> 24) & 255,
            (a >> 16) & 255,
            (a >> 8) & 255,
            255 & a,
          ];
        return (
          this.is224 ||
            l.push((s >> 24) & 255, (s >> 16) & 255, (s >> 8) & 255, 255 & s),
          l
        );
      }),
      (y.prototype.array = y.prototype.digest),
      (y.prototype.arrayBuffer = function () {
        this.finalize();
        var e = new ArrayBuffer(this.is224 ? 28 : 32),
          t = new DataView(e);
        return (
          t.setUint32(0, this.h0),
          t.setUint32(4, this.h1),
          t.setUint32(8, this.h2),
          t.setUint32(12, this.h3),
          t.setUint32(16, this.h4),
          t.setUint32(20, this.h5),
          t.setUint32(24, this.h6),
          this.is224 || t.setUint32(28, this.h7),
          e
        );
      }),
      (w.prototype = new y()),
      (w.prototype.finalize = function () {
        if ((y.prototype.finalize.call(this), this.inner)) {
          this.inner = !1;
          var e = this.array();
          y.call(this, this.is224, this.sharedMemory),
            this.update(this.oKeyPad),
            this.update(e),
            y.prototype.finalize.call(this);
        }
      });
    var _ = g();
    (_.sha256 = _),
      (_.sha224 = g(!0)),
      (_.sha256.hmac = b()),
      (_.sha224.hmac = b(!0)),
      a ? (Gy = _) : ((r.sha256 = _.sha256), (r.sha224 = _.sha224));
  })();
  var Wy = t(Gy);
  class Yy {
    constructor(e = {}) {
      this.options = e;
    }
    send(
      e,
      { params: t, query: n, body: r, method: o, headers: i, token: a } = {}
    ) {
      if (!e) throw new Error("url parameter is mandatory");
      if (this.options.by && this.options.secret) {
        const e = this.options.by,
          t = vb.generate(),
          r = Yy._hash(this.options.secret, t);
        n = { ...n, by: e, salt: t, hash: r };
      }
      return (
        (o = o || (r ? "POST" : "GET")),
        (r = JSON.stringify(r)),
        (e = `${this._inject(e, t)}?${this._encode(n)}`),
        this.options.urlPrefix &&
          !e.startsWith("http") &&
          (e = `${this.options.urlPrefix}${e}`),
        "POST" === o && (i = { ...i, "content-type": "application/json" }),
        a && (i = { ...i, Authorization: `Bearer ${a}` }),
        fetch(e, { body: r, method: o, headers: i }).then(Yy._toJson)
      );
    }
    _inject(e, t) {
      if (!t) return e;
      for (const n in t) {
        const r = t[n];
        e = e.replace(`:${n}`, encodeURIComponent(r));
      }
      return e;
    }
    _encode(e) {
      return e
        ? Object.keys(e)
            .map((t) => `${encodeURIComponent(t)}=${encodeURIComponent(e[t])}`)
            .join("&")
        : "";
    }
    static _toJson(e) {
      return e.json();
    }
    static _hash(e, t) {
      return Wy(`${e}${t}`);
    }
  }
  var Qy = { Sender: Yy };
  new Qy.Sender({ urlPrefix: u.options.apiUrl });
  var Jy = zy;
  const { model: Ky } = ib,
    Xy = {
      ...Jy,
      isAcknowledged: function (e) {
        return -1 !== Ky.state.acknowledged[e];
      },
      userId: function () {
        return Ky.state.authStatus.userId;
      },
      username: function () {
        return Ky.state.authStatus.username;
      },
      allUsernames: function () {
        const e = Ky.state,
          t = [],
          n = (e) => t.push(e.authStatus.username);
        n(e);
        for (const t in e.userStates) n(e.userStates[t]);
        return t;
      },
    },
    { action: Zy } = ib;
  var ew = Zy("state.replace-state", (e, t) => t);
  const { action: tw } = ib;
  var nw = tw("state.acknowledge", (e, t) => {
      const n = D.getUnixTime();
      return { ...e, acknowledged: { ...e.acknowledged, [t]: n } };
    }),
    rw = () => [
      {
        id: "v23.6.0",
        header: "Fixes and Future Plans",
        subheader: "v23.6.0",
        hexImage: "hex-schedule",
      },
      {
        id: "v23.3.0",
        header: "Major Functionality Fixes",
        subheader: "v23.3.0",
        hexImage: "hex-bug",
        content: [
          "Restored all app functions broken due to recent changes introduced by Instagram update to internal data and media handling systems.",
        ],
      },
      {
        id: "v23.1.0",
        header: "Instagram Update Bug Fixes",
        subheader: "v23.1.0",
        hexImage: "hex-bug",
        content: [
          "Fixed a number of bugs introduced by Instagram in the recent mobile and desktop app update: reels failed to be published through instagram.com, posted videos were duplicated under reels tab and showing with a wrong icon, restored search panel functionality of the explore page, and other improvements and fixes.",
        ],
      },
      {
        id: "v23.0.0",
        header: "Ghost View Mode for Stories",
        subheader: "v23.0.0",
        hexImage: "hex-ghost",
        content: [
          "Switch to a Ghost View Mode and watch stories anonymously. Story owner won’t know if you watched their story.",
        ],
      },
      {
        id: "v22.0.0",
        header: "Story Assist",
        subheader: "v22.0.0",
        hexImage: "hex-story",
        content: [
          "Added user tagging feature in stories, fixed avatars rendering Instagram bug, fixed reels API connectivity and other issues.",
        ],
      },
      {
        id: "v21.1.0",
        header: "Improvements and Bug Fixes",
        subheader: "v21.1.0",
        hexImage: "hex-update",
        content: [
          "Fixed custom video covers and music file uploads to fail in certain scenarios. Styling and usability improvements in the app. Fixed tooltips rendering in the IG frame. Fixed app rendering artifacts on slow Internet connection and more.",
        ],
      },
      {
        id: "v21.0.0",
        header: "Posting Functionality Restored",
        subheader: "v21.0.0",
        hexImage: "hex-bug",
        content: [
          "Restored posting functionality and fixed problems caused by the IG platform overhaul.",
          "Improved app stability, dark theme, custom cover feature, videos autoplay on carousels and fixed multiple bugs.",
        ],
      },
      {
        id: "v20.2.0",
        header: "Reels Improvements",
        subheader: "v20.2.0",
        hexImage: "hex-bug",
        content: [
          "Added support for locations and people mentions (tagging) on Reels posting.",
          "Fixed original audio automatically muted by Chrome v100. Fixed followers and followings not showing up correctly in the wide mode. Fixed DM not showing DM folders.",
        ],
      },
      {
        id: "v20.1.0",
        header: "Bug Fixing",
        subheader: "v20.1.0",
        hexImage: "hex-bug",
        content: [
          "Fixed scheduling connection setup, fixed isolation policy error, improved reels posting, post management error handling and usability.",
        ],
      },
      {
        id: "v20.0.0",
        header: "Music",
        subheader: "v20.0.0",
        hexImage: "hex-music",
        content: [
          "Add music or upload your tracks to Reels, Stories and Videos. Royalty-free music is provided by tunetank.com.",
        ],
      },
      {
        id: "v19.0.0",
        header: "Quick Replies in DM",
        subheader: "v19.0.0",
        hexImage: "hex-dm",
        content: [
          "Send Quick Replies in chats by typing / symbol followed by reply shortcut. Configure an unlimited number of replies for business or personal use.",
          "Inssist Quick Replies support template messages and @name, @username variables.",
        ],
      },
      {
        id: "v18.0.9",
        header: "Bug Fixing",
        subheader: "v18.0.9",
        hexImage: "hex-bug",
        content: [
          "Fixed Instagram bug that caused a blank screen to load for some users. Fixed Zen mode, story mentions and other issues.",
        ],
      },
      {
        id: "posting-from-website",
        header: "Posting from website",
        subheader: "v18.0.0",
        hexImage: "hex-igswiss",
      },
      {
        id: "v17.3.0",
        header: "60s Reels",
        subheader: "v17.3.0",
        hexImage: "hex-reels",
        content: [
          "Inssist can now post Reels of up to 60s long, up from 30s before.",
          "CSV import now supports “multiline \\n captions” and break lines with \\n symbols.",
          "This release improves posting stability.",
        ],
      },
      {
        id: "v17.0.0",
        header: "Bulk & CSV Scheduling",
        subheader: "v17.0.0",
        hexImage: "hex-schedule",
        content: [
          "Added “BULK” section to the Scheduling module that supports applying bulk commands: scheduling, drafting, deleting posts.",
          "You can now reschedule posts across time-slots or intervals with a few clicks and edit captions of all scheduled posts from a single screen.",
          "Inssist now knows how to parse CSV files so that you can drag and drop those and schedule posts even faster.",
          "Scheduling interface has been significantly speed up comparing to the previous versions.",
        ],
      },
      {
        id: "macos",
        header: "Experimental MacOS version",
        subheader: "v15.2.3",
        hexImage: "hex-macos",
      },
      {
        id: "v15.1.0",
        header: "Usability & Bug Fixes",
        subheader: "v15.1.0",
        hexImage: "hex-bug",
        content: [
          "Post Assistant now supports custom aspect ratios for images in addition to default square, portrait and landscape ones.",
          "Fix for the Instagram “video failed to post” and other bugs.",
        ],
      },
      {
        id: "v15.0.3",
        header: "Bug Fixing",
        subheader: "v15.0.3",
        hexImage: "hex-bug",
        content: [
          "Fixed missing delete button in Post Assistant. Fixed dark theme Reels UI. Fixed “Post did not upload” video publishing issue.",
        ],
      },
      {
        id: "reels",
        header: "Reels",
        subheader: "v15.0.0",
        hexImage: "hex-reels",
        content: [
          "Inssist can now post Reels! It ensures the best quality and does not compress your videos.",
          "Instagram Reels is a short-video format, similar to TikTok. Instagram platform limits Reels to 50 countries, including the United States.",
          "Posting Reels is a PRO feature, and you can repost Reels from other accounts and apply custom covers with Inssist.",
        ],
      },
      {
        id: "v13.1.0",
        header: "Hashtag Collections",
        subheader: "v13.1.0",
        hexImage: "hex-tag",
        content: [
          "Now you can create and manage your Hashtag collections with Inssist.",
        ],
      },
      {
        id: "v11.5.0",
        header: "Lifetime Deal",
        subheader: "v11.5.0",
        hexImage: "hex-lifetime",
        content: [
          "Claim your Inssist PRO Lifetime Deal!",
          "Now you can get Inssist PRO license for life with a one time purchase, before only a monthly subscription option was available.",
          "For businesses managing many accounts there is a special Infinite plan. Check it out!",
        ],
      },
      {
        id: "v11.2.0",
        header: "Swipe Up",
        subheader: "v11.2.0",
        hexImage: "hex-swipe-up",
        content: [
          "Swipe Up feature (adding links to stories) is now available for accounts of more than 10k followers.",
        ],
      },
      {
        id: "v11.1.0",
        header: "Editing Captions",
        subheader: "v11.1.0",
        hexImage: "hex-caption",
        content: [
          "This version brings support for editing posts. You can now edit posts and update post captions after they are published without a need to connect to Facebook API.",
        ],
      },
      {
        id: "v11.0.0",
        header: "Video Thumbnails / Covers",
        subheader: "v11.0.0",
        hexImage: "hex-video",
        content: [
          "Version 11 brings support for covers to video posting.",
          "Whenever you upload a video to post you can choose a thumbnail from a list of auto-generated covers, a specific video frame or even upload a custom image to be used.",
          "You can also preview your Instagram grid with the selected cover before posting.",
        ],
      },
      {
        id: "v10.1.0",
        header: "Zen Mode",
        subheader: "v10.1.0",
        hexImage: "hex-zen",
        content: [
          "Make your Instagram browsing experience cleaner with the new Zen mode.",
          "Switch Instagram home feed into Zen hides post captions and comments on the posts. Give it a try!",
          "This release also fixes a number of bugs, making posting Stories more stable in particular.",
        ],
      },
      {
        id: "v10.0.1",
        header: "Share Post to Story",
        subheader: "v10.0.1",
        hexImage: "hex-story",
        content: [
          "Version 10 brings support for sharing any post to your story in a few clicks.",
          "Locate a share icon below any post, video or photo, click it and select “Share to Story”. A photo will then be shared to your story.",
          "This feature is free. Enjoy!",
        ],
      },
      {
        id: "v10.0.0",
        header: "Bug Fixing",
        subheader: "v10.0.0",
        hexImage: "hex-bug",
        content: [
          "Fixed comments scrolling caused the app to refresh the page.",
          "Post Assistant now supports uploading and previewing posts in a grid without a Facebook API connection.",
          "Changed the dark theme background not to be so dark. Redesigned side bar and Facebook API connection setup dialogs.",
          "And a host of other improvements and stability enhancements under the hood.",
        ],
      },
      {
        id: "v9.0.0",
        header: "Bulk Scheduling",
        subheader: "v9.0.0",
        hexImage: "hex-ship",
        content: [
          "Inssist Scheduling now supports uploading multiple photos at once to speed up posting.",
          "You can also drag & drop photos and videos from the system to Inssist to schedule or publish them.",
          "Scheduling engine has been significantly improved to support bulk upload and future improvements coming down the line.",
        ],
      },
      {
        id: "v8.9.1",
        header: "Bug Fixing & Usability",
        subheader: "v8.9.1",
        hexImage: "hex-bug",
        content: [
          "Stories uploaded with Inssist are now uploaded in the best quality possible.",
          "Fixed internal bugs and improved DM module stability.",
        ],
      },
      {
        id: "v8.8.5",
        header: "Bug Fixing & Usability",
        subheader: "v8.8.5",
        hexImage: "hex-bug",
        content: [
          "Inssist now prevents Instagram from blurring photos when switching between screen modes.",
          "Inssist now shows @usernames upon hovering over accounts in multiaccount box.",
          "Increased DM text input size, fixed elements positioning on Instagram authorization screen, fixed wordings across the application and other improvements.",
          "Added support for sending debug reports if Inssist fails to connect Scheduling.",
        ],
      },
      {
        id: "v8.6.0",
        header: "Scheduling patch",
        subheader: "v8.6.0",
        hexImage: "hex-bug",
        content: [
          "Fixed a bug preventing scheduling connection setup to reliably connect Instagram account to Scheduling API.",
          "Fixed a cross-posting bug preventing Facebook Page selection from rendering.",
          "Fixed sending post from the home feed to Direct Messages. Other internal fixes.",
        ],
      },
      {
        id: "v8.5.1",
        header: "Story and Scheduling fixes",
        subheader: "v8.5.1",
        hexImage: "hex-bug",
        content: [
          "Improved aspect ratio detection on stories: video stories should upload to Instagram more reliably.",
          "Uploaded stories now have the first frame selected as a cover rather than a random one.",
          "Fixed Infinite Loading loop bug on scheduling.",
        ],
      },
      {
        id: "v8.5.0",
        header: "Story Improvements",
        subheader: "v8.5.0",
        hexImage: "hex-bug",
        content: [
          "Photo Stories are no longer cut in preview when they do not fit the aspect ratios. Inssist now detects and warns about unsupported Video Story lengths: shorter than 1 second and longer than 15 seconds. Other internal improvements.",
        ],
      },
      {
        id: "v8.4.0",
        header: "Story Mentions",
        subheader: "v8.4.0",
        hexImage: "hex-mentions",
        content: [
          "Support for @mentions (account tagging) has arrived for photo stories. This is a free feature available on all plans.",
        ],
      },
      {
        id: "v8.3.0",
        header: "Bug Fixing",
        subheader: "v8.3.0",
        hexImage: "hex-bug",
        content: [
          "Added mouse scroll to stories panel. Added photo upload spinner during posting.",
          "Fixed modal windows positioning bug in Instagram. Fixed tab buttons spacing on Instagram profile page.",
        ],
      },
      {
        id: "v8.2.1",
        header: "Bug Fixing",
        subheader: "v8.2.1",
        hexImage: "hex-bug",
        content: [
          "Fixed excess image rotation on new and scheduled posts.",
          "Fixed a black screen scheduling state bug caused by selecting a Custom Time interval.",
        ],
      },
      {
        id: "v8.2.0",
        header: "Facebook Cross-Posting",
        subheader: "v8.2.0",
        hexImage: "hex-schedule",
        content: [
          "If your Instagram @account is connected to a custom Facebook Page, Inssist will let you clone posts to that Facebook Page during scheduling.",
        ],
      },
      {
        id: "v8.1.0",
        header: "Scheduling Performance",
        subheader: "v8.1.0",
        hexImage: "hex-schedule",
        content: [
          "Over the past few weeks we have redesigned and rebuilt Scheduling engine from ground-up, making it far more stable and performing much better than before. Give it a try!",
          "A few User Interface fixes are delivered with this update.",
        ],
      },
      {
        id: "v8.0.0",
        header: "Multiaccount Support",
        subheader: "v8.0.0",
        hexImage: "hex-multiaccount",
        content: [
          "Got more than one Instagram account? Connect them all to Inssist and seamlessly switch between them without a need to relogin. Handy!",
        ],
      },
      {
        id: "v6.2.0",
        header: "Wide Screen",
        subheader: "v6.2.0",
        hexImage: "hex-monitor",
        content: [
          "Wide screen mode has been redesigned with images taking more space and page layouts improved.",
        ],
      },
      {
        id: "v6.1.0",
        header: "Bug Fixing",
        subheader: "v6.1.0",
        hexImage: "hex-bug",
        content: [
          "Stories can now be scrolled with LEFT / RIGHT keys and exited with ESC key. Fixed polls styling on stories in dark theme.",
          "Fixed videos playing sound for a split second upon navigation within plugin. Fixed an Instagram bug with videos refusing to playing on click.",
          "Fixed Scheduling incorrectly ordering posts upon updating post caption. Improved Scheduling interface buttons styling.",
          "Plugin URL now contains Instagram page URL for quick navigation.",
          "Direct Messages no longer marked as read while DM module is hidden. Fixed DM module buttons overlap. Clicking Back button no longer causes navigation in Direct Messaging module. Videos sent in Direct Messages can now be viewed in a separate tab.",
        ],
      },
      {
        id: "v6.0.1",
        header: "Carousels",
        subheader: "v6.0.1",
        hexImage: "hex-carousel",
        content: [
          "Inssist now supports carousel posts through the Post Assistant. Check it out!",
          "Multiaccount support is coming next!",
        ],
      },
      {
        id: "v6.0.0",
        header: "Scheduling",
        subheader: "v6.0.0",
        hexImage: "hex-schedule",
        content: [
          "Scheduling now supports drag&drop operations both on Grid and Calendar. Scheduling is out of Beta and has been substantially improved, debugged and redesigned.",
        ],
      },
      {
        id: "v5.0.1",
        header: "Bug Fixing",
        subheader: "v5.0.1",
        hexImage: "hex-bug",
        content: [
          "Fixed Instagram bug when adding multiline text on stories caused Instagram UI to break. Captions containing emojis are no longer cut off.",
        ],
      },
      {
        id: "v4.0.5",
        header: "Bug Fixing",
        subheader: "v4.0.5",
        hexImage: "hex-bug",
        content: [
          "A ton of bug fixes and improvements:",
          "You can now send DMs to any account without following them first. Images in DM module are no longer cropped and take all available space.",
          "Added a button to open image in a new tab in DM module. Requests tab in DM no longer overflows the new DM button and DM actions tooltips is no longer cut off. Fixed fonts in DM module.\n",
          "Added “Open in Inssist” button on Instagram website. Added DM US button to reach out to us quickly. Icons in side bar no longer overlap on small screens.",
          "Fixed “show more” button on post captions and other small fixes across UI.",
        ],
      },
      {
        id: "v4.0.0",
        header: "Direct Messages",
        subheader: "v4.0.0",
        hexImage: "hex-dm",
        content: [
          "Psst… Check out the brand new Direct Messages panel on the left. You can now send DMs while having the Instagram view on the right simultaneously. Handy! 💌",
          "The next feature we’re working on is Scheduling drag & drop support.",
        ],
      },
      {
        id: "v3.1.0",
        header: "Bug fixing",
        subheader: "v3.1.0",
        hexImage: "hex-bug",
        content: [
          "Bug fixes and improvements: fixed emojis 🤧 in the dark theme, better scheduling setup logic and setup errors interception, permissions verification screen, scheduling migrated onto optimistic transactions mechanism, image pre-caching and scheduling loading speed-up, fixed IGTV screen and UI cleanup.",
        ],
      },
      {
        id: "v3.0.0",
        header: "Dark Mode",
        subheader: "v3.0.0",
        hexImage: "hex-moon",
        content: [
          "Join the Dark Side! Switch Inssist to Dark mode which is less strenuous on your beautiful 👀 with a click of a button. Instagram web interface has been thoroughly restyled to Dark mode as well.",
        ],
      },
      {
        id: "v2.3.0",
        header: "Calendar and Time Slots",
        subheader: "v2.3.0",
        hexImage: "hex-schedule",
        content: [
          "Configure Time Slots to schedule posts efficiently. Browse posts in a weekly and monthly post calendars. Fixed scheduling setup, auto-logout and freezing bugs.",
        ],
      },
      {
        id: "v2.2.0",
        header: "Scheduling Usability",
        subheader: "v2.2.0",
        hexImage: "hex-schedule",
        content: [
          "Added scheduling time & date selection calendar. Improved Posts Grid performance. Fixed scheduling connection setup problems.",
        ],
      },
      {
        id: "v2.1.0",
        header: "Scheduling Beta",
        subheader: "v2.1.0",
        hexImage: "hex-schedule",
        content: [
          "Scheduling has arrived.",
          "Upload photos, videos, IGTVs and carousel posts. Preview them in a grid, save as draft, publish or schedule for auto-publish.",
          "Scheduled media are published automatically, no need to install extra software, Inssist handles auto-publish for you even if you are offline.",
          "Scheduling is currently available through our Beta program. You can enable Beta features for free by sharing a word about Inssist.",
          "All bug reports and feature requests are welcomed at inssist@slashed.io  🐜🐜🐜",
        ],
      },
      {
        id: "v1.6.0",
        header: "IGTV Support",
        subheader: "v1.6.0",
        hexImage: "hex-igtv",
        content: [
          "Plugin now supports uploading IGTV videos.",
          "To publish IGTV, simply upload a video as you would normally do. If the video is longer than 1 minute, Inssist will present an IGTV video upload interface to you.",
        ],
      },
      {
        id: "v1.3.0",
        header: "Relevant Hashtags",
        subheader: "v1.3.0",
        hexImage: "hex-tag",
        content: ["Inssist now suggests relevant hashtags. Try it out!"],
      },
      {
        id: "v1.2.2",
        header: "Bug fixing",
        subheader: "v1.2.2",
        hexImage: "hex-bug",
        content: [
          "Fixed “Instagram.com refused to connect” issue. If you still experience “Instagram.com refused to connect” error, please try to relogin to Instagram.com from a separate browser tab and reinstall Inssist from get.inssist.com.",
          "Fixed video playback jittering.",
        ],
      },
      {
        id: "v1.2.0",
        header: "Autoplay for Videos",
        subheader: "v1.2.0",
        hexImage: "hex-update",
        content: [
          "Videos on the feed will now autoplay (muted) when scrolled into the view. Clicking videos un-mutes them.",
          "Improved posting screen usability, stability and bundle size.",
        ],
      },
      {
        id: "v1.1.0",
        header: "Usability Improvements",
        subheader: "v1.1.0",
        hexImage: "hex-update",
        content: [
          "Text inside the Instagram view can now be selected and copied to clipboard.",
          "Posting photos and videos now supports locations tagging.",
          "Fixed issue with instagram.com not connecting after navigation to direct messages.",
          "Fixed issue with opening facebook.com links from DM messages caused a browser page error.",
          "Pressing Enter in DM screen now sends the message right away.",
          "Other miscellaneous usability improvements.",
        ],
      },
      {
        id: "v0.9.12",
        header: "Bug fixing & Performance",
        subheader: "v0.9.12",
        hexImage: "hex-bug",
        content: [
          "Extension rebranded to Inssist.",
          "Loading and rendering speed improved. Fixed an issue when replying to comments rendered an unnecessary actions popup.",
        ],
      },
      {
        id: "v0.9.5",
        header: "Improved Image Quality",
        subheader: "v0.9.5",
        hexImage: "hex-quality",
        content: [
          "Landscape and Portrait photos now retain high image quality when uploaded with the plugin.",
        ],
      },
      {
        id: "v0.9.2",
        header: "Video Support",
        subheader: "v0.9.2",
        hexImage: "hex-video",
        content: ["Plugin now supports Video uploads."],
      },
      {
        id: "v0.8.9",
        header: "Stickers and Markers Support",
        subheader: "v0.8.9",
        hexImage: "hex-marker",
        content: ["Stories can now be uploaded with stickers and markers."],
      },
      {
        id: "v0.8.3",
        header: "Improved UI",
        subheader: "v0.8.3",
        hexImage: "hex-bug",
        content: [
          "User profile, stories reel and other parts of user interface and user experience were improved. Fixed stories viewer not showing stories on a first click.",
        ],
      },
      {
        id: "v0.8.0",
        header: "Basic version",
        subheader: "v0.8.0",
        hexImage: "hex-igswiss",
        content: [
          "Plugin now supports photos and stories upload and direct messages.",
        ],
      },
    ],
    ow = () => ({
      version: 208,
      authStatus: {
        userId: null,
        username: null,
        fullName: null,
        email: null,
        avatarUrl: null,
        isLoggedIn: !1,
        cookies: { igSessionId: null, fb: [] },
      },
      coverAssist: {
        shown: !1,
        loading: !0,
        videoUrl: null,
        coverUrl: null,
        selectedTabId: "auto",
        showGrid: !1,
        gridImages: [],
        frameGalleryImages: [],
        frameGallerySelectedImage: null,
        frameSelectImage: null,
        frameSelectValue: null,
        frameUploadImage: null,
      },
      musicAssist: {
        shown: !1,
        videoUrl: null,
        videoVolume: 0,
        musicVolume: 0.5,
        videoCurrentTime: 0,
        categoryIdsOrder: [],
        selectedCategoryId: 0,
        selectedTrackId: null,
        selectedTrackStart: 0,
        customTrack: null,
        showUpsellOverlay: !1,
        isStory: !1,
      },
      storyAssist: {
        shown: !1,
        selectedTabId: "music",
        showUpsellOverlay: !1,
        coverUrl: null,
        mentions: { query: "", foundUsers: [], selectedUsers: [] },
      },
      ghostStoryView: { enabled: !1, lastUsedOn: null, showUpsellOverlay: !1 },
      dm: { badgeText: "", ghostModeEnabled: !0, ghostModeFailed: !1 },
      reels: { creating: !1 },
      igTask: { actionBlockCode: null, followStatus: {}, likeStatus: {} },
      schedule: {
        posts: [],
        timeSlots: [
          { time: 288e5 },
          { time: 468e5 },
          { time: 576e5 },
          { time: 72e6 },
        ],
        addCard: {
          saved: !1,
          fileCount: 0,
          attention: !1,
          draggingFiles: !1,
          selectedOption: "multiple",
          savingTitle: null,
          savingText: null,
          savingPreview: null,
        },
        loading: !1,
        recentScheduledOn: null,
        lastFcsPostsUpdateOn: null,
        lastIgPostsUpdateOn: null,
        fcsError: null,
        fcsFailed: !1,
        isErrorShown: !1,
        isUpsellShown: !1,
        isDraggingPost: !1,
        showTagAssist: !1,
        addingFiles: !1,
        fileUploadErrors: [],
        fallback: {
          isEnabled: !1,
          isFailedToReconnect: !1,
          isRetryingFbConnection: !1,
          hideSwitchToFallbackButton: !1,
        },
        navigation: {
          isOpen: !1,
          selectedTabId: null,
          isFcsLoading: !1,
          withBackToCalendarButton: !1,
        },
        filters: {
          showInfo: !0,
          showLocalLabel: !0,
          photo: !0,
          video: !0,
          carousel: !0,
          posted: !0,
          local: !0,
          draft: !0,
          scheduled: !0,
        },
        fcsSetup: {
          screen: "welcome",
          checking: !1,
          connected: !1,
          connecting: !1,
          showPanel: !1,
          errorCode: null,
          steps: {
            fbLogin: null,
            igProfessional: null,
            igConnectedToFbPage: null,
          },
          failed: !1,
        },
        dateDialog: {
          isOpen: !1,
          selectedOption: "publish-now",
          periodStart: null,
          selectedDay: null,
          selectedSlotTime: null,
          customTime: null,
          timezone: null,
          isTimeError: !1,
        },
        calendar: { periodType: "month", periodStart: null, showTimeSlots: !0 },
      },
      bulk: {
        saving: !1,
        selectedPostIds: [],
        activeActionId: null,
        actions: {},
        dateDialog: {
          show: !1,
          selectedTypeId: "interval",
          startingDay: {
            selectedTypeId: "today",
            periodStart: null,
            selectedDay: null,
          },
          calendar: {
            periodStart: null,
            selectedDay: null,
            selectedSlotTime: null,
            customTime: null,
            errorMessage: null,
          },
          interval: { frequency: "1:1", timeList: [] },
          week: {
            selectedDays: [],
            selectedSlotTime: null,
            customTime: null,
            dayErrorMessage: null,
            timeErrorMessage: null,
          },
          timeSlots: { errorMessage: null },
        },
      },
    }),
    iw = () =>
      "Hello {@name}! 👋\n\n\n  {Thank you|Thanks} {@name}! 🙏\n\n\n  /tnx follow\n  {Hi|Hey|Hello|Greetings} {@name}! Thank you so much for following! Feel free to send me a DM!\n\n\n  /tnx contact\n  {Thank you for contacting us.|Thank you for reaching out to us.|Thank you for contacting us here.} {We have received your message and will be in touch shortly.|We will be in touch shortly, and you may also find answers to some of your questions on our FAQ page.|We will be in touch soon.}\n\n\n  /sorry missed\n  Hi {@username}! I am sorry I missed your message. I will get back to you as soon as possible. I look forward to speaking with you!\n\n\n  /ask feedback\n  {Hi|Hello|Hey|Greetings}! Just wanted to follow back with you and check how you find the product? Feel free to send me your feedback, suggestions or ideas.\n\n\n  /tmm\n  Thank you for contacting us. Due to an unusual level of activity, responses are delayed. We anticipate responding to your message within two business days. In the meantime, please feel free to reach out to us via email with any urgent needs or requests.\n  "
        .split("\n")
        .map((e) => e.trim())
        .join("\n"),
    aw = () => ({
      installedAt: Date.now(),
      installedEventSent: !1,
      isAfterTheEndUser: !0,
      userStates: {},
      experiments: { enabled: !1 },
      abTesting: { hash: Math.random(), wideScreenState: null },
      multiaccount: { userIds: [], selectedUserId: null, addingNewAccount: !1 },
      welcome: { shown: !0 },
      sidebar: { selectedTabId: null, isOpen: !1 },
      igView: {
        fullscreen: !1,
        fullscreenWidth: 460,
        withBorder: !0,
        creationCardShown: !1,
      },
      zen: { enabled: !1 },
      quickReplies: { shown: !1, content: iw(), total: 7 },
      tagAssist: {
        shown: !1,
        query: "",
        tagMetricsUpsellDismissed: !1,
        searching: !1,
        latinOnly: !1,
        errorCode: null,
        selectedTabId: "search",
        selectedGroupId: "low",
        igSelectedTags: [],
        fcsSelectedTags: [],
        sidebarSelectedTags: [],
        sidebarSelectedTagsAsText: "",
        lastDayUsedOn: null,
        ladderEngagementSort: null,
        summaryEngagementSort: null,
        ladderPostCountSort: null,
        summaryPostCountSort: null,
        lastTagScanOn: null,
        accountStats: {},
        ladder: null,
        ladderLoadingTags: [],
        ladderConfig: {
          lastUpdateOn: Date.now(),
          tiers: { low: 0.7, medium: 1.5, high: 5 },
        },
        collections: [],
        newCollection: { name: "", text: "", showForm: !1 },
        collectionsTagData: {},
        collectionsLoadingTags: [],
      },
      acknowledged: {
        upsell: -1,
        postLimitations: -1,
        storyLimitations: -1,
        tosSummary: -1,
        scheduleTip: -1,
        scheduleDndTip: -1,
        followUs: -1,
        rateUs: -1,
        theEnd: -1,
      },
      followUs: { shown: !1 },
      rateUs: { shown: !1, rate: null },
      whatsNew: [
        {
          id: "v23.6.0",
          header: "Fixes and Future Plans",
          subheader: "v23.6.0",
          hexImage: "hex-schedule",
        },
        {
          id: "v23.3.0",
          header: "Major Functionality Fixes",
          subheader: "v23.3.0",
          hexImage: "hex-bug",
          content: [
            "Restored all app functions broken due to recent changes introduced by Instagram update to internal data and media handling systems.",
          ],
        },
        {
          id: "v23.1.0",
          header: "Instagram Update Bug Fixes",
          subheader: "v23.1.0",
          hexImage: "hex-bug",
          content: [
            "Fixed a number of bugs introduced by Instagram in the recent mobile and desktop app update: reels failed to be published through instagram.com, posted videos were duplicated under reels tab and showing with a wrong icon, restored search panel functionality of the explore page, and other improvements and fixes.",
          ],
        },
        {
          id: "v23.0.0",
          header: "Ghost View Mode for Stories",
          subheader: "v23.0.0",
          hexImage: "hex-ghost",
          content: [
            "Switch to a Ghost View Mode and watch stories anonymously. Story owner won’t know if you watched their story.",
          ],
        },
        {
          id: "v22.0.0",
          header: "Story Assist",
          subheader: "v22.0.0",
          hexImage: "hex-story",
          content: [
            "Added user tagging feature in stories, fixed avatars rendering Instagram bug, fixed reels API connectivity and other issues.",
          ],
        },
        {
          id: "v21.1.0",
          header: "Improvements and Bug Fixes",
          subheader: "v21.1.0",
          hexImage: "hex-update",
          content: [
            "Fixed custom video covers and music file uploads to fail in certain scenarios. Styling and usability improvements in the app. Fixed tooltips rendering in the IG frame. Fixed app rendering artifacts on slow Internet connection and more.",
          ],
        },
        {
          id: "v21.0.0",
          header: "Posting Functionality Restored",
          subheader: "v21.0.0",
          hexImage: "hex-bug",
          content: [
            "Restored posting functionality and fixed problems caused by the IG platform overhaul.",
            "Improved app stability, dark theme, custom cover feature, videos autoplay on carousels and fixed multiple bugs.",
          ],
        },
        {
          id: "v20.2.0",
          header: "Reels Improvements",
          subheader: "v20.2.0",
          hexImage: "hex-bug",
          content: [
            "Added support for locations and people mentions (tagging) on Reels posting.",
            "Fixed original audio automatically muted by Chrome v100. Fixed followers and followings not showing up correctly in the wide mode. Fixed DM not showing DM folders.",
          ],
        },
        {
          id: "v20.1.0",
          header: "Bug Fixing",
          subheader: "v20.1.0",
          hexImage: "hex-bug",
          content: [
            "Fixed scheduling connection setup, fixed isolation policy error, improved reels posting, post management error handling and usability.",
          ],
        },
        {
          id: "v20.0.0",
          header: "Music",
          subheader: "v20.0.0",
          hexImage: "hex-music",
          content: [
            "Add music or upload your tracks to Reels, Stories and Videos. Royalty-free music is provided by tunetank.com.",
          ],
        },
        {
          id: "v19.0.0",
          header: "Quick Replies in DM",
          subheader: "v19.0.0",
          hexImage: "hex-dm",
          content: [
            "Send Quick Replies in chats by typing / symbol followed by reply shortcut. Configure an unlimited number of replies for business or personal use.",
            "Inssist Quick Replies support template messages and @name, @username variables.",
          ],
        },
        {
          id: "v18.0.9",
          header: "Bug Fixing",
          subheader: "v18.0.9",
          hexImage: "hex-bug",
          content: [
            "Fixed Instagram bug that caused a blank screen to load for some users. Fixed Zen mode, story mentions and other issues.",
          ],
        },
        {
          id: "posting-from-website",
          header: "Posting from website",
          subheader: "v18.0.0",
          hexImage: "hex-igswiss",
        },
        {
          id: "v17.3.0",
          header: "60s Reels",
          subheader: "v17.3.0",
          hexImage: "hex-reels",
          content: [
            "Inssist can now post Reels of up to 60s long, up from 30s before.",
            "CSV import now supports “multiline \\n captions” and break lines with \\n symbols.",
            "This release improves posting stability.",
          ],
        },
        {
          id: "v17.0.0",
          header: "Bulk & CSV Scheduling",
          subheader: "v17.0.0",
          hexImage: "hex-schedule",
          content: [
            "Added “BULK” section to the Scheduling module that supports applying bulk commands: scheduling, drafting, deleting posts.",
            "You can now reschedule posts across time-slots or intervals with a few clicks and edit captions of all scheduled posts from a single screen.",
            "Inssist now knows how to parse CSV files so that you can drag and drop those and schedule posts even faster.",
            "Scheduling interface has been significantly speed up comparing to the previous versions.",
          ],
        },
        {
          id: "macos",
          header: "Experimental MacOS version",
          subheader: "v15.2.3",
          hexImage: "hex-macos",
        },
        {
          id: "v15.1.0",
          header: "Usability & Bug Fixes",
          subheader: "v15.1.0",
          hexImage: "hex-bug",
          content: [
            "Post Assistant now supports custom aspect ratios for images in addition to default square, portrait and landscape ones.",
            "Fix for the Instagram “video failed to post” and other bugs.",
          ],
        },
        {
          id: "v15.0.3",
          header: "Bug Fixing",
          subheader: "v15.0.3",
          hexImage: "hex-bug",
          content: [
            "Fixed missing delete button in Post Assistant. Fixed dark theme Reels UI. Fixed “Post did not upload” video publishing issue.",
          ],
        },
        {
          id: "reels",
          header: "Reels",
          subheader: "v15.0.0",
          hexImage: "hex-reels",
          content: [
            "Inssist can now post Reels! It ensures the best quality and does not compress your videos.",
            "Instagram Reels is a short-video format, similar to TikTok. Instagram platform limits Reels to 50 countries, including the United States.",
            "Posting Reels is a PRO feature, and you can repost Reels from other accounts and apply custom covers with Inssist.",
          ],
        },
        {
          id: "v13.1.0",
          header: "Hashtag Collections",
          subheader: "v13.1.0",
          hexImage: "hex-tag",
          content: [
            "Now you can create and manage your Hashtag collections with Inssist.",
          ],
        },
        {
          id: "v11.5.0",
          header: "Lifetime Deal",
          subheader: "v11.5.0",
          hexImage: "hex-lifetime",
          content: [
            "Claim your Inssist PRO Lifetime Deal!",
            "Now you can get Inssist PRO license for life with a one time purchase, before only a monthly subscription option was available.",
            "For businesses managing many accounts there is a special Infinite plan. Check it out!",
          ],
        },
        {
          id: "v11.2.0",
          header: "Swipe Up",
          subheader: "v11.2.0",
          hexImage: "hex-swipe-up",
          content: [
            "Swipe Up feature (adding links to stories) is now available for accounts of more than 10k followers.",
          ],
        },
        {
          id: "v11.1.0",
          header: "Editing Captions",
          subheader: "v11.1.0",
          hexImage: "hex-caption",
          content: [
            "This version brings support for editing posts. You can now edit posts and update post captions after they are published without a need to connect to Facebook API.",
          ],
        },
        {
          id: "v11.0.0",
          header: "Video Thumbnails / Covers",
          subheader: "v11.0.0",
          hexImage: "hex-video",
          content: [
            "Version 11 brings support for covers to video posting.",
            "Whenever you upload a video to post you can choose a thumbnail from a list of auto-generated covers, a specific video frame or even upload a custom image to be used.",
            "You can also preview your Instagram grid with the selected cover before posting.",
          ],
        },
        {
          id: "v10.1.0",
          header: "Zen Mode",
          subheader: "v10.1.0",
          hexImage: "hex-zen",
          content: [
            "Make your Instagram browsing experience cleaner with the new Zen mode.",
            "Switch Instagram home feed into Zen hides post captions and comments on the posts. Give it a try!",
            "This release also fixes a number of bugs, making posting Stories more stable in particular.",
          ],
        },
        {
          id: "v10.0.1",
          header: "Share Post to Story",
          subheader: "v10.0.1",
          hexImage: "hex-story",
          content: [
            "Version 10 brings support for sharing any post to your story in a few clicks.",
            "Locate a share icon below any post, video or photo, click it and select “Share to Story”. A photo will then be shared to your story.",
            "This feature is free. Enjoy!",
          ],
        },
        {
          id: "v10.0.0",
          header: "Bug Fixing",
          subheader: "v10.0.0",
          hexImage: "hex-bug",
          content: [
            "Fixed comments scrolling caused the app to refresh the page.",
            "Post Assistant now supports uploading and previewing posts in a grid without a Facebook API connection.",
            "Changed the dark theme background not to be so dark. Redesigned side bar and Facebook API connection setup dialogs.",
            "And a host of other improvements and stability enhancements under the hood.",
          ],
        },
        {
          id: "v9.0.0",
          header: "Bulk Scheduling",
          subheader: "v9.0.0",
          hexImage: "hex-ship",
          content: [
            "Inssist Scheduling now supports uploading multiple photos at once to speed up posting.",
            "You can also drag & drop photos and videos from the system to Inssist to schedule or publish them.",
            "Scheduling engine has been significantly improved to support bulk upload and future improvements coming down the line.",
          ],
        },
        {
          id: "v8.9.1",
          header: "Bug Fixing & Usability",
          subheader: "v8.9.1",
          hexImage: "hex-bug",
          content: [
            "Stories uploaded with Inssist are now uploaded in the best quality possible.",
            "Fixed internal bugs and improved DM module stability.",
          ],
        },
        {
          id: "v8.8.5",
          header: "Bug Fixing & Usability",
          subheader: "v8.8.5",
          hexImage: "hex-bug",
          content: [
            "Inssist now prevents Instagram from blurring photos when switching between screen modes.",
            "Inssist now shows @usernames upon hovering over accounts in multiaccount box.",
            "Increased DM text input size, fixed elements positioning on Instagram authorization screen, fixed wordings across the application and other improvements.",
            "Added support for sending debug reports if Inssist fails to connect Scheduling.",
          ],
        },
        {
          id: "v8.6.0",
          header: "Scheduling patch",
          subheader: "v8.6.0",
          hexImage: "hex-bug",
          content: [
            "Fixed a bug preventing scheduling connection setup to reliably connect Instagram account to Scheduling API.",
            "Fixed a cross-posting bug preventing Facebook Page selection from rendering.",
            "Fixed sending post from the home feed to Direct Messages. Other internal fixes.",
          ],
        },
        {
          id: "v8.5.1",
          header: "Story and Scheduling fixes",
          subheader: "v8.5.1",
          hexImage: "hex-bug",
          content: [
            "Improved aspect ratio detection on stories: video stories should upload to Instagram more reliably.",
            "Uploaded stories now have the first frame selected as a cover rather than a random one.",
            "Fixed Infinite Loading loop bug on scheduling.",
          ],
        },
        {
          id: "v8.5.0",
          header: "Story Improvements",
          subheader: "v8.5.0",
          hexImage: "hex-bug",
          content: [
            "Photo Stories are no longer cut in preview when they do not fit the aspect ratios. Inssist now detects and warns about unsupported Video Story lengths: shorter than 1 second and longer than 15 seconds. Other internal improvements.",
          ],
        },
        {
          id: "v8.4.0",
          header: "Story Mentions",
          subheader: "v8.4.0",
          hexImage: "hex-mentions",
          content: [
            "Support for @mentions (account tagging) has arrived for photo stories. This is a free feature available on all plans.",
          ],
        },
        {
          id: "v8.3.0",
          header: "Bug Fixing",
          subheader: "v8.3.0",
          hexImage: "hex-bug",
          content: [
            "Added mouse scroll to stories panel. Added photo upload spinner during posting.",
            "Fixed modal windows positioning bug in Instagram. Fixed tab buttons spacing on Instagram profile page.",
          ],
        },
        {
          id: "v8.2.1",
          header: "Bug Fixing",
          subheader: "v8.2.1",
          hexImage: "hex-bug",
          content: [
            "Fixed excess image rotation on new and scheduled posts.",
            "Fixed a black screen scheduling state bug caused by selecting a Custom Time interval.",
          ],
        },
        {
          id: "v8.2.0",
          header: "Facebook Cross-Posting",
          subheader: "v8.2.0",
          hexImage: "hex-schedule",
          content: [
            "If your Instagram @account is connected to a custom Facebook Page, Inssist will let you clone posts to that Facebook Page during scheduling.",
          ],
        },
        {
          id: "v8.1.0",
          header: "Scheduling Performance",
          subheader: "v8.1.0",
          hexImage: "hex-schedule",
          content: [
            "Over the past few weeks we have redesigned and rebuilt Scheduling engine from ground-up, making it far more stable and performing much better than before. Give it a try!",
            "A few User Interface fixes are delivered with this update.",
          ],
        },
        {
          id: "v8.0.0",
          header: "Multiaccount Support",
          subheader: "v8.0.0",
          hexImage: "hex-multiaccount",
          content: [
            "Got more than one Instagram account? Connect them all to Inssist and seamlessly switch between them without a need to relogin. Handy!",
          ],
        },
        {
          id: "v6.2.0",
          header: "Wide Screen",
          subheader: "v6.2.0",
          hexImage: "hex-monitor",
          content: [
            "Wide screen mode has been redesigned with images taking more space and page layouts improved.",
          ],
        },
        {
          id: "v6.1.0",
          header: "Bug Fixing",
          subheader: "v6.1.0",
          hexImage: "hex-bug",
          content: [
            "Stories can now be scrolled with LEFT / RIGHT keys and exited with ESC key. Fixed polls styling on stories in dark theme.",
            "Fixed videos playing sound for a split second upon navigation within plugin. Fixed an Instagram bug with videos refusing to playing on click.",
            "Fixed Scheduling incorrectly ordering posts upon updating post caption. Improved Scheduling interface buttons styling.",
            "Plugin URL now contains Instagram page URL for quick navigation.",
            "Direct Messages no longer marked as read while DM module is hidden. Fixed DM module buttons overlap. Clicking Back button no longer causes navigation in Direct Messaging module. Videos sent in Direct Messages can now be viewed in a separate tab.",
          ],
        },
        {
          id: "v6.0.1",
          header: "Carousels",
          subheader: "v6.0.1",
          hexImage: "hex-carousel",
          content: [
            "Inssist now supports carousel posts through the Post Assistant. Check it out!",
            "Multiaccount support is coming next!",
          ],
        },
        {
          id: "v6.0.0",
          header: "Scheduling",
          subheader: "v6.0.0",
          hexImage: "hex-schedule",
          content: [
            "Scheduling now supports drag&drop operations both on Grid and Calendar. Scheduling is out of Beta and has been substantially improved, debugged and redesigned.",
          ],
        },
        {
          id: "v5.0.1",
          header: "Bug Fixing",
          subheader: "v5.0.1",
          hexImage: "hex-bug",
          content: [
            "Fixed Instagram bug when adding multiline text on stories caused Instagram UI to break. Captions containing emojis are no longer cut off.",
          ],
        },
        {
          id: "v4.0.5",
          header: "Bug Fixing",
          subheader: "v4.0.5",
          hexImage: "hex-bug",
          content: [
            "A ton of bug fixes and improvements:",
            "You can now send DMs to any account without following them first. Images in DM module are no longer cropped and take all available space.",
            "Added a button to open image in a new tab in DM module. Requests tab in DM no longer overflows the new DM button and DM actions tooltips is no longer cut off. Fixed fonts in DM module.\n",
            "Added “Open in Inssist” button on Instagram website. Added DM US button to reach out to us quickly. Icons in side bar no longer overlap on small screens.",
            "Fixed “show more” button on post captions and other small fixes across UI.",
          ],
        },
        {
          id: "v4.0.0",
          header: "Direct Messages",
          subheader: "v4.0.0",
          hexImage: "hex-dm",
          content: [
            "Psst… Check out the brand new Direct Messages panel on the left. You can now send DMs while having the Instagram view on the right simultaneously. Handy! 💌",
            "The next feature we’re working on is Scheduling drag & drop support.",
          ],
        },
        {
          id: "v3.1.0",
          header: "Bug fixing",
          subheader: "v3.1.0",
          hexImage: "hex-bug",
          content: [
            "Bug fixes and improvements: fixed emojis 🤧 in the dark theme, better scheduling setup logic and setup errors interception, permissions verification screen, scheduling migrated onto optimistic transactions mechanism, image pre-caching and scheduling loading speed-up, fixed IGTV screen and UI cleanup.",
          ],
        },
        {
          id: "v3.0.0",
          header: "Dark Mode",
          subheader: "v3.0.0",
          hexImage: "hex-moon",
          content: [
            "Join the Dark Side! Switch Inssist to Dark mode which is less strenuous on your beautiful 👀 with a click of a button. Instagram web interface has been thoroughly restyled to Dark mode as well.",
          ],
        },
        {
          id: "v2.3.0",
          header: "Calendar and Time Slots",
          subheader: "v2.3.0",
          hexImage: "hex-schedule",
          content: [
            "Configure Time Slots to schedule posts efficiently. Browse posts in a weekly and monthly post calendars. Fixed scheduling setup, auto-logout and freezing bugs.",
          ],
        },
        {
          id: "v2.2.0",
          header: "Scheduling Usability",
          subheader: "v2.2.0",
          hexImage: "hex-schedule",
          content: [
            "Added scheduling time & date selection calendar. Improved Posts Grid performance. Fixed scheduling connection setup problems.",
          ],
        },
        {
          id: "v2.1.0",
          header: "Scheduling Beta",
          subheader: "v2.1.0",
          hexImage: "hex-schedule",
          content: [
            "Scheduling has arrived.",
            "Upload photos, videos, IGTVs and carousel posts. Preview them in a grid, save as draft, publish or schedule for auto-publish.",
            "Scheduled media are published automatically, no need to install extra software, Inssist handles auto-publish for you even if you are offline.",
            "Scheduling is currently available through our Beta program. You can enable Beta features for free by sharing a word about Inssist.",
            "All bug reports and feature requests are welcomed at inssist@slashed.io  🐜🐜🐜",
          ],
        },
        {
          id: "v1.6.0",
          header: "IGTV Support",
          subheader: "v1.6.0",
          hexImage: "hex-igtv",
          content: [
            "Plugin now supports uploading IGTV videos.",
            "To publish IGTV, simply upload a video as you would normally do. If the video is longer than 1 minute, Inssist will present an IGTV video upload interface to you.",
          ],
        },
        {
          id: "v1.3.0",
          header: "Relevant Hashtags",
          subheader: "v1.3.0",
          hexImage: "hex-tag",
          content: ["Inssist now suggests relevant hashtags. Try it out!"],
        },
        {
          id: "v1.2.2",
          header: "Bug fixing",
          subheader: "v1.2.2",
          hexImage: "hex-bug",
          content: [
            "Fixed “Instagram.com refused to connect” issue. If you still experience “Instagram.com refused to connect” error, please try to relogin to Instagram.com from a separate browser tab and reinstall Inssist from get.inssist.com.",
            "Fixed video playback jittering.",
          ],
        },
        {
          id: "v1.2.0",
          header: "Autoplay for Videos",
          subheader: "v1.2.0",
          hexImage: "hex-update",
          content: [
            "Videos on the feed will now autoplay (muted) when scrolled into the view. Clicking videos un-mutes them.",
            "Improved posting screen usability, stability and bundle size.",
          ],
        },
        {
          id: "v1.1.0",
          header: "Usability Improvements",
          subheader: "v1.1.0",
          hexImage: "hex-update",
          content: [
            "Text inside the Instagram view can now be selected and copied to clipboard.",
            "Posting photos and videos now supports locations tagging.",
            "Fixed issue with instagram.com not connecting after navigation to direct messages.",
            "Fixed issue with opening facebook.com links from DM messages caused a browser page error.",
            "Pressing Enter in DM screen now sends the message right away.",
            "Other miscellaneous usability improvements.",
          ],
        },
        {
          id: "v0.9.12",
          header: "Bug fixing & Performance",
          subheader: "v0.9.12",
          hexImage: "hex-bug",
          content: [
            "Extension rebranded to Inssist.",
            "Loading and rendering speed improved. Fixed an issue when replying to comments rendered an unnecessary actions popup.",
          ],
        },
        {
          id: "v0.9.5",
          header: "Improved Image Quality",
          subheader: "v0.9.5",
          hexImage: "hex-quality",
          content: [
            "Landscape and Portrait photos now retain high image quality when uploaded with the plugin.",
          ],
        },
        {
          id: "v0.9.2",
          header: "Video Support",
          subheader: "v0.9.2",
          hexImage: "hex-video",
          content: ["Plugin now supports Video uploads."],
        },
        {
          id: "v0.8.9",
          header: "Stickers and Markers Support",
          subheader: "v0.8.9",
          hexImage: "hex-marker",
          content: ["Stories can now be uploaded with stickers and markers."],
        },
        {
          id: "v0.8.3",
          header: "Improved UI",
          subheader: "v0.8.3",
          hexImage: "hex-bug",
          content: [
            "User profile, stories reel and other parts of user interface and user experience were improved. Fixed stories viewer not showing stories on a first click.",
          ],
        },
        {
          id: "v0.8.0",
          header: "Basic version",
          subheader: "v0.8.0",
          hexImage: "hex-igswiss",
          content: [
            "Plugin now supports photos and stories upload and direct messages.",
          ],
        },
      ].map((e) => ({ id: e.id, acknowledged: !0 })),
      userDetails: {},
      billing: {
        navigation: { isBodyOpen: !1 },
        discount: { availableTill: -1, showSnackbarMessage: !1 },
        account: { email: null, token: null },
        recordedUsernames: [],
        promocode: null,
        recentFeature: null,
        trial: {
          installedOn: Date.now(),
          dmAdvanced: 0,
          schedule: 0,
          insights: 0,
          analytics: 0,
          coverAssist: 0,
          musicAssist: 0,
          tagAssist: 0,
          storyAssist: 0,
          addLinkToStory: 0,
          repost: 0,
          reels: 0,
          ghostStoryView: 0,
          postsPublished: 0,
          storiesPublished: 0,
          dmsSent: 0,
        },
        optimistic: null,
        subscriptions: {},
        products: {},
        orders: [],
        selectedPlan: null,
        purchasingPlan: null,
        countryIso: null,
        pricing: null,
        snapshot: {},
        verificationCodeEmail: null,
      },
    });
  var sw = {
      proxy: Xy,
      replaceState: ew,
      getWhatsNewItems: rw,
      getTemplateUserState: ow,
      getTemplateSharedState: aw,
      actions: { acknowledge: nw },
    },
    lw = t(
      function () {
        var e = { exports: this },
          t = (function () {
            var e = String.fromCharCode,
              t =
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
              n =
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",
              r = {};
            function o(e, t) {
              if (!r[e]) {
                r[e] = {};
                for (var n = 0; n < e.length; n++) r[e][e.charAt(n)] = n;
              }
              return r[e][t];
            }
            var i = {
              compressToBase64: function (e) {
                if (null == e) return "";
                var n = i._compress(e, 6, function (e) {
                  return t.charAt(e);
                });
                switch (n.length % 4) {
                  default:
                  case 0:
                    return n;
                  case 1:
                    return n + "===";
                  case 2:
                    return n + "==";
                  case 3:
                    return n + "=";
                }
              },
              decompressFromBase64: function (e) {
                return null == e
                  ? ""
                  : "" == e
                  ? null
                  : i._decompress(e.length, 32, function (n) {
                      return o(t, e.charAt(n));
                    });
              },
              compressToUTF16: function (t) {
                return null == t
                  ? ""
                  : i._compress(t, 15, function (t) {
                      return e(t + 32);
                    }) + " ";
              },
              decompressFromUTF16: function (e) {
                return null == e
                  ? ""
                  : "" == e
                  ? null
                  : i._decompress(e.length, 16384, function (t) {
                      return e.charCodeAt(t) - 32;
                    });
              },
              compressToUint8Array: function (e) {
                for (
                  var t = i.compress(e),
                    n = new Uint8Array(2 * t.length),
                    r = 0,
                    o = t.length;
                  r < o;
                  r++
                ) {
                  var a = t.charCodeAt(r);
                  (n[2 * r] = a >>> 8), (n[2 * r + 1] = a % 256);
                }
                return n;
              },
              decompressFromUint8Array: function (t) {
                if (null == t) return i.decompress(t);
                for (
                  var n = new Array(t.length / 2), r = 0, o = n.length;
                  r < o;
                  r++
                )
                  n[r] = 256 * t[2 * r] + t[2 * r + 1];
                var a = [];
                return (
                  n.forEach(function (t) {
                    a.push(e(t));
                  }),
                  i.decompress(a.join(""))
                );
              },
              compressToEncodedURIComponent: function (e) {
                return null == e
                  ? ""
                  : i._compress(e, 6, function (e) {
                      return n.charAt(e);
                    });
              },
              decompressFromEncodedURIComponent: function (e) {
                return null == e
                  ? ""
                  : "" == e
                  ? null
                  : ((e = e.replace(/ /g, "+")),
                    i._decompress(e.length, 32, function (t) {
                      return o(n, e.charAt(t));
                    }));
              },
              compress: function (t) {
                return i._compress(t, 16, function (t) {
                  return e(t);
                });
              },
              _compress: function (e, t, n) {
                if (null == e) return "";
                var r,
                  o,
                  i,
                  a = {},
                  s = {},
                  l = "",
                  u = "",
                  c = "",
                  d = 2,
                  f = 3,
                  p = 2,
                  h = [],
                  g = 0,
                  m = 0;
                for (i = 0; i < e.length; i += 1)
                  if (
                    ((l = e.charAt(i)),
                    Object.prototype.hasOwnProperty.call(a, l) ||
                      ((a[l] = f++), (s[l] = !0)),
                    (u = c + l),
                    Object.prototype.hasOwnProperty.call(a, u))
                  )
                    c = u;
                  else {
                    if (Object.prototype.hasOwnProperty.call(s, c)) {
                      if (c.charCodeAt(0) < 256) {
                        for (r = 0; r < p; r++)
                          (g <<= 1),
                            m == t - 1 ? ((m = 0), h.push(n(g)), (g = 0)) : m++;
                        for (o = c.charCodeAt(0), r = 0; r < 8; r++)
                          (g = (g << 1) | (1 & o)),
                            m == t - 1 ? ((m = 0), h.push(n(g)), (g = 0)) : m++,
                            (o >>= 1);
                      } else {
                        for (o = 1, r = 0; r < p; r++)
                          (g = (g << 1) | o),
                            m == t - 1 ? ((m = 0), h.push(n(g)), (g = 0)) : m++,
                            (o = 0);
                        for (o = c.charCodeAt(0), r = 0; r < 16; r++)
                          (g = (g << 1) | (1 & o)),
                            m == t - 1 ? ((m = 0), h.push(n(g)), (g = 0)) : m++,
                            (o >>= 1);
                      }
                      0 == --d && ((d = Math.pow(2, p)), p++), delete s[c];
                    } else
                      for (o = a[c], r = 0; r < p; r++)
                        (g = (g << 1) | (1 & o)),
                          m == t - 1 ? ((m = 0), h.push(n(g)), (g = 0)) : m++,
                          (o >>= 1);
                    0 == --d && ((d = Math.pow(2, p)), p++),
                      (a[u] = f++),
                      (c = String(l));
                  }
                if ("" !== c) {
                  if (Object.prototype.hasOwnProperty.call(s, c)) {
                    if (c.charCodeAt(0) < 256) {
                      for (r = 0; r < p; r++)
                        (g <<= 1),
                          m == t - 1 ? ((m = 0), h.push(n(g)), (g = 0)) : m++;
                      for (o = c.charCodeAt(0), r = 0; r < 8; r++)
                        (g = (g << 1) | (1 & o)),
                          m == t - 1 ? ((m = 0), h.push(n(g)), (g = 0)) : m++,
                          (o >>= 1);
                    } else {
                      for (o = 1, r = 0; r < p; r++)
                        (g = (g << 1) | o),
                          m == t - 1 ? ((m = 0), h.push(n(g)), (g = 0)) : m++,
                          (o = 0);
                      for (o = c.charCodeAt(0), r = 0; r < 16; r++)
                        (g = (g << 1) | (1 & o)),
                          m == t - 1 ? ((m = 0), h.push(n(g)), (g = 0)) : m++,
                          (o >>= 1);
                    }
                    0 == --d && ((d = Math.pow(2, p)), p++), delete s[c];
                  } else
                    for (o = a[c], r = 0; r < p; r++)
                      (g = (g << 1) | (1 & o)),
                        m == t - 1 ? ((m = 0), h.push(n(g)), (g = 0)) : m++,
                        (o >>= 1);
                  0 == --d && ((d = Math.pow(2, p)), p++);
                }
                for (o = 2, r = 0; r < p; r++)
                  (g = (g << 1) | (1 & o)),
                    m == t - 1 ? ((m = 0), h.push(n(g)), (g = 0)) : m++,
                    (o >>= 1);
                for (;;) {
                  if (((g <<= 1), m == t - 1)) {
                    h.push(n(g));
                    break;
                  }
                  m++;
                }
                return h.join("");
              },
              decompress: function (e) {
                return null == e
                  ? ""
                  : "" == e
                  ? null
                  : i._decompress(e.length, 32768, function (t) {
                      return e.charCodeAt(t);
                    });
              },
              _decompress: function (t, n, r) {
                var o,
                  i,
                  a,
                  s,
                  l,
                  u,
                  c,
                  d = [],
                  f = 4,
                  p = 4,
                  h = 3,
                  g = "",
                  m = [],
                  v = { val: r(0), position: n, index: 1 };
                for (o = 0; o < 3; o += 1) d[o] = o;
                for (a = 0, l = Math.pow(2, 2), u = 1; u != l; )
                  (s = v.val & v.position),
                    (v.position >>= 1),
                    0 == v.position &&
                      ((v.position = n), (v.val = r(v.index++))),
                    (a |= (s > 0 ? 1 : 0) * u),
                    (u <<= 1);
                switch (a) {
                  case 0:
                    for (a = 0, l = Math.pow(2, 8), u = 1; u != l; )
                      (s = v.val & v.position),
                        (v.position >>= 1),
                        0 == v.position &&
                          ((v.position = n), (v.val = r(v.index++))),
                        (a |= (s > 0 ? 1 : 0) * u),
                        (u <<= 1);
                    c = e(a);
                    break;
                  case 1:
                    for (a = 0, l = Math.pow(2, 16), u = 1; u != l; )
                      (s = v.val & v.position),
                        (v.position >>= 1),
                        0 == v.position &&
                          ((v.position = n), (v.val = r(v.index++))),
                        (a |= (s > 0 ? 1 : 0) * u),
                        (u <<= 1);
                    c = e(a);
                    break;
                  case 2:
                    return "";
                }
                for (d[3] = c, i = c, m.push(c); ; ) {
                  if (v.index > t) return "";
                  for (a = 0, l = Math.pow(2, h), u = 1; u != l; )
                    (s = v.val & v.position),
                      (v.position >>= 1),
                      0 == v.position &&
                        ((v.position = n), (v.val = r(v.index++))),
                      (a |= (s > 0 ? 1 : 0) * u),
                      (u <<= 1);
                  switch ((c = a)) {
                    case 0:
                      for (a = 0, l = Math.pow(2, 8), u = 1; u != l; )
                        (s = v.val & v.position),
                          (v.position >>= 1),
                          0 == v.position &&
                            ((v.position = n), (v.val = r(v.index++))),
                          (a |= (s > 0 ? 1 : 0) * u),
                          (u <<= 1);
                      (d[p++] = e(a)), (c = p - 1), f--;
                      break;
                    case 1:
                      for (a = 0, l = Math.pow(2, 16), u = 1; u != l; )
                        (s = v.val & v.position),
                          (v.position >>= 1),
                          0 == v.position &&
                            ((v.position = n), (v.val = r(v.index++))),
                          (a |= (s > 0 ? 1 : 0) * u),
                          (u <<= 1);
                      (d[p++] = e(a)), (c = p - 1), f--;
                      break;
                    case 2:
                      return m.join("");
                  }
                  if ((0 == f && ((f = Math.pow(2, h)), h++), d[c])) g = d[c];
                  else {
                    if (c !== p) return null;
                    g = i + i.charAt(0);
                  }
                  m.push(g),
                    (d[p++] = i + g.charAt(0)),
                    (i = g),
                    0 == --f && ((f = Math.pow(2, h)), h++);
                }
              },
            };
            return i;
          })();
        return void 0 !== e && null != e && (e.exports = t), e.exports;
      }.call({})
    );
  const uw = {
      init: async function () {
        {
          const e = await this.read();
          if (e) return e;
        }
        {
          const e = await this._readStateFromDeprecatedStorage();
          if (e) return e;
        }
        return null;
      },
      read: async function () {
        const e = Date.now(),
          t = await wy.controller.get("state");
        if (!t) return null;
        const n = this._deuglify(t),
          r = Date.now() - e;
        return log(`[$synch] state read in ${r}ms`), n;
      },
      save: async function (e) {
        const t = Date.now(),
          n = this._uglify(e);
        await wy.controller.set("state", n);
        const r = Date.now() - t;
        log(`[$synch] state saved in ${r}ms`);
      },
      _readStateFromDeprecatedStorage: async function () {
        if (
          !!!(await indexedDB.databases()).find(
            (e) => "keyval-store" === e.name
          )
        )
          return null;
        let e, t, n;
        try {
          e = await new Promise((e, t) => {
            const n = indexedDB.open("keyval-store", 1);
            (n.onerror = () => t(n.error)), (n.onsuccess = () => e(n.result));
          });
        } catch (e) {
          return console.error(e), null;
        }
        try {
          t = await new Promise((t, n) => {
            const r = e
              .transaction("keyval", "readonly")
              .objectStore("keyval")
              .get("state");
            (r.onerror = () => n(r.error)), (r.onsuccess = () => t(r.result));
          });
        } catch (e) {
          return console.error(e), null;
        }
        if (
          (t || "undefined" == typeof localStorage || (t = localStorage.state),
          !t)
        )
          return null;
        try {
          const e = lw.decompressFromUTF16(t);
          n = JSON.parse(e);
        } catch (e) {
          return console.error(e), null;
        }
        return n;
      },
      _uglify: function (e) {
        return btoa(encodeURIComponent(JSON.stringify(e)));
      },
      _deuglify: function (e) {
        return JSON.parse(decodeURIComponent(atob(e)));
      },
    },
    { action: cw } = ib;
  var dw = cw("synch.synch-state", (e, t) => {
    if (u.is.popup) {
      t.schedule.addCard.saved = e.schedule.addCard.saved;
      for (const n of t.schedule.posts) {
        const t = e.schedule.posts.find((e) => e.id === n.id);
        t && (n.saveStatus = t.saveStatus);
      }
    }
    return t;
  });
  const { model: fw } = ib,
    pw = { ...sw.getTemplateUserState(), ...sw.getTemplateSharedState() };
  var hw = {
    controller: {
      isStorageMaster: !1,
      currentState: null,
      unsubscribe: null,
      storeBatchingId: null,
      synchBatchingId: null,
      init: function (e, t) {
        (this.id = e), (this.isStorageMaster = t);
        let n = [];
        return (
          chrome.runtime.onMessage.addListener((t, r, o) => {
            if (t.sender === e) return !1;
            if ("synch-state" === t.name) {
              if (!fw.store) return;
              return this._onStateUpdatedByPeer(t.deltaState), !1;
            }
            return (
              "fetch-state" === t.name && (n ? n.push(o) : o(fw.state), !0)
            );
          }),
          Promise.resolve()
            .then(() => this._fetchState())
            .then(() => {
              const e = n;
              (n = null), e.forEach((e) => e(fw.state));
            })
            .then(() => {
              this._subscribeToInflux();
            })
        );
      },
      _fetchState: function () {
        return this.isStorageMaster
          ? uw
              .init()
              .then((e) => e || pw)
              .then((e) => {
                (this.currentState = e), fw.init(e);
              })
          : new Promise((e) => {
              chrome.runtime.sendMessage(
                { name: "fetch-state", sender: this.id },
                (t) => {
                  (this.currentState = t), fw.init(t), e();
                }
              );
            });
      },
      _subscribeToInflux: function (e = !1) {
        this.unsubscribe = fw.observe(
          (e) => e,
          (e) => {
            this.synchBatchingId && clearTimeout(this.synchBatchingId),
              (this.synchBatchingId = setTimeout(() => {
                this.synchBatchingId = null;
                const t = this._deltaState(e, this.currentState);
                (this.currentState = e),
                  this._saveToStorage(e),
                  chrome.runtime.sendMessage({
                    name: "synch-state",
                    sender: this.id,
                    deltaState: t,
                  });
              }));
          },
          e
        );
      },
      _onStateUpdatedByPeer: function (e) {
        this.unsubscribe && this.unsubscribe(),
          (this.currentState = { ...fw.state, ...e }),
          dw.dispatch(this.currentState),
          this._saveToStorage(this.currentState),
          this._subscribeToInflux(this.currentState !== fw.state);
      },
      _saveToStorage: function (e) {
        this.isStorageMaster &&
          (this.storeBatchingId && clearTimeout(this.storeBatchingId),
          (this.storeBatchingId = setTimeout(
            () => {
              (this.storeBatchingId = null), uw.save(e);
            },
            u.is.development || window.electron ? 1e3 : 3e3
          )));
      },
      _deltaState: function (e, t) {
        const n = {};
        for (const r in e) {
          const o = e[r];
          (t && t[r] === o) || (n[r] = o);
        }
        return n;
      },
    },
    storageController: uw,
  };
  const { model: gw, transaction: mw } = ib,
    vw = {
      init: function ({ parent: e }) {
        (this.parent = e),
          gw.observe(
            (e) => (e.authStatus ? e.authStatus.username : null),
            () => {
              this.updatePromocode();
            },
            !1
          );
      },
      updatePro: async function () {
        await new Promise((e) => this.updatePromocode(e));
      },
      updatePromocode: function (e) {
        log("billing: updating promocode...");
        const { username: t, userId: n } = gw.state.authStatus;
        if (t) {
          const r = { username: t, userId: n };
          if (u.options.collectBillingStats) {
            const {
              followersCount: e,
              followingsCount: t,
              postsCount: o,
            } = gw.state.userDetails[n] || {};
            "number" == typeof e && (r.followers = e),
              "number" == typeof t && (r.followings = t),
              "number" == typeof o && (r.posts = o);
          }
          this.parent.apiSender
            .send("/promo", { query: r })
            .then((t) => {
              if (!t || "ok" !== t.status) throw t;
              log(`  received promocode: ${JSON.stringify(t)}`);
              const n = t && t.expiresAt;
              gw.state.billing.promocode !== n &&
                mw((e) => {
                  e.billing.promocode = n;
                }),
                this.parent.reply(e, n);
            })
            .catch((t) => {
              log(`  retrieving promocode failed: ${JSON.stringify(t)}`),
                this.parent.reply(e, gw.state.billing.promocode);
            });
        } else
          log("  no username to retrieve promocode for"),
            this.parent.reply(e, gw.state.billing.promocode);
        return !!e;
      },
    },
    { model: bw, transaction: yw } = ib,
    ww = {
      init: function ({ parent: e }) {
        (this.parent = e),
          bw.observe(
            (e) => e.billing.trial,
            (e) => {
              this.updateCookie(e);
            },
            !1
          );
      },
      updatePro: async function () {
        await new Promise((e) => this.updateTrial(e));
      },
      setTrialCookie: async function (e) {
        await this._setCookie({ name: "tsd", value: e });
      },
      updateTrial: async function (e) {
        log("billing: updating trial period...");
        const t = bw.state.billing.trial,
          n = await this._getCookie({ name: "tsd" });
        if (this._isCookieEmpty(n)) return void this.parent.reply(e, t);
        const r = this._mergeTrialValues(t, n);
        r.installedOn || (r.installedOn = Date.now()),
          S.isEqual(t, r) ||
            yw((e) => {
              e.billing.trial = r;
            }),
          S.isEqual(n, r) || this._setCookie({ name: "tsd", value: r }),
          this.parent.reply(e, r);
      },
      updateCookie: async function (e) {
        const t = await this._getCookie({ name: "tsd" });
        this._isCookieEmpty(t) || (e = this._mergeTrialValues(t, e)),
          S.isEqual(t, e) || this._setCookie({ name: "tsd", value: e });
      },
      _isCookieEmpty: function (e) {
        return !e || 1 === Object.keys(e).length;
      },
      _mergeTrialValues: function (e, t) {
        const n = { ...e, ...t };
        n.installedOn > e.installedOn && (n.installedOn = e.installedOn);
        for (const t in n) (e[t] || 0) > (n[t] || 0) && (n[t] = e[t] || 0);
        return n;
      },
      _getCookie: async function ({ name: e }) {
        return new Promise((t) => {
          chrome.cookies.getAll({ url: `https://${u.options.domain}` }, (n) => {
            let r = (n || []).filter((t) => t.name === e)[0] || { value: "" };
            r = r.value;
            try {
              r = atob(r);
            } catch (e) {}
            try {
              r = JSON.parse(r);
            } catch (e) {
              r = null;
            }
            t(r);
          });
        });
      },
      _setCookie: async function ({ name: e, value: t }) {
        const n = Math.round(Date.now() / 1e3),
          r = n + 31536e4 > 2147483647 ? n + 31536e4 : 2147483647;
        return new Promise((n) => {
          chrome.cookies.set(
            {
              name: e || "cookie",
              value: btoa(JSON.stringify(t)),
              url: `https://${u.options.domain}`,
              path: "/",
              httpOnly: !1,
              secure: !1,
              storeId: "0",
              domain: u.options.domain,
              sameSite: "strict",
              expirationDate: r,
            },
            n
          );
        });
      },
    },
    { model: _w, transaction: Sw } = ib,
    xw = {
      init: function ({ parent: e }) {
        (this.parent = e),
          chrome.runtime.onMessage.addListener((e, t, n) =>
            "fspring.subscription-success" === e.name
              ? this.onFSpringSubscriptionSuccess(e, n)
              : "fspring.subscription-failure" === e.name
              ? this.onFSpringSubscriptionFailure(e, n)
              : void 0
          ),
          chrome.runtime.onMessage.addListener(
            (e, t, n) =>
              "update-fspring-status" === e.name && this.updateFSpringStatus(n)
          ),
          _w.observe(
            (e) => (e.authStatus ? e.authStatus.username : null),
            () => {
              this.recordUsernames();
            },
            !0
          ),
          _w.observe(
            (e) =>
              e.billing && e.billing.account ? e.billing.account.token : null,
            () => {
              this.recordUsernames();
            },
            !1
          ),
          _w.observe(
            (e) =>
              e.billing && e.billing.account ? e.billing.account.token : null,
            () => {
              this.updateFSpringStatus();
            },
            !1
          );
      },
      recordUsernames: function () {
        const { billing: e, authStatus: t } = _w.state,
          n = t.username;
        if (!n) return;
        const r = e.account ? e.account.token : null;
        if (!r) return;
        if (-1 !== e.recordedUsernames.indexOf(n)) return;
        log("billing: updating associated fspring account usernames...");
        const o = { usernames: [n] };
        this.parent.apiSender
          .send("/auth/record-usernames", { body: o, token: r })
          .then(() => {
            Sw((e) => {
              e.billing.recordedUsernames = [...e.billing.recordedUsernames, n];
            });
          })
          .catch(() => {});
      },
      updatePro: async function () {
        return new Promise((e) => this.updateFSpringStatus(e));
      },
      updateFSpringStatus: function (e) {
        log("billing: updating fspring status...");
        const { billing: t } = _w.state,
          n = t.account ? t.account.token : null;
        if (n) {
          const t = "/fspring/data";
          this.parent.apiSender
            .send(t, { token: n })
            .then((t) => {
              if (!t || "ok" !== t.status) throw t;
              Sw((e) => {
                (e.billing.subscriptions = t.subscriptions || {}),
                  (e.billing.products = t.products || {}),
                  (e.billing.orders = t.orders || []);
              }),
                this.parent.reply(e, _w.state.billing);
            })
            .catch((n) => {
              ("TypeError" === n.name && "Failed to fetch" === n.message) ||
                ("forbidden" === n.status ||
                "unauthorized" === n.status ||
                "account-not-found" === n.status ||
                "account-is-not-active" === n.status
                  ? Sw((e) => {
                      (e.billing.account.email = null),
                        (e.billing.account.token = null);
                    })
                  : lb.controller.sendError(
                      `Unexpected API error at ${t}`,
                      "error",
                      { error: n },
                      { actor: "auth" }
                    )),
                this.parent.reply(e, _w.state.billing);
            });
        } else
          Sw((e) => {
            (e.billing.optimistic = null),
              (e.billing.subscriptions = {}),
              (e.billing.products = {}),
              (e.billing.orders = []);
          }),
            this.parent.reply(e, _w.state.billing);
        return !!e;
      },
      onFSpringSubscriptionSuccess: function (e, t) {
        log("billing: handling fspring subscription success..."),
          Sw((e) => {
            (e.billing.optimistic = {
              on: Date.now(),
              plan: e.billing.purchasingPlan.id,
            }),
              (e.billing.purchasingPlan = null);
          });
        const n = JSON.stringify({
            subscriptions: _w.state.billing.subscriptions,
            products: _w.state.billing.products,
            orders: _w.state.billing.orders,
          }),
          r = Date.now();
        let o = 3e3;
        const i = () => {
          log("billing: polling server for status update..."),
            _w.state.billing.optimistic &&
              this.updateFSpringStatus((e) => {
                const t = Date.now();
                t - r > 36e5
                  ? Sw((e) => {
                      e.billing.optimistic = null;
                    })
                  : ((e = JSON.stringify({
                      subscriptions: e.subscriptions,
                      products: e.products,
                      orders: e.orders,
                    })),
                    n === e
                      ? ((o = t - r > 3e4 ? 6e5 : 3e3), setTimeout(i, o))
                      : Sw((e) => {
                          e.billing.optimistic = null;
                        }));
              });
        };
        return setTimeout(i, o), !!t;
      },
      onFSpringSubscriptionFailure: function (e, t) {
        return (
          log("billing: handling fspring subscription failure..."),
          Sw((e) => {
            e.billing.purchasingPlan = null;
          }),
          !!t
        );
      },
    };
  var Pw = {
    controller: {
      init: function () {
        (this.apiSender = new Qy.Sender({ urlPrefix: u.options.apiUrl })),
          vw.init({ parent: this }),
          ww.init({ parent: this }),
          xw.init({ parent: this });
        return (
          chrome.alarms.create("update-pro", {
            delayInMinutes: 1440,
            periodInMinutes: 1440,
          }),
          chrome.alarms.onAlarm.addListener((e) => {
            "update-pro" === e.name && this.updatePro();
          }),
          chrome.runtime.onMessage.addListener(
            (e, t, n) => "update-pro" === e.name && this.updatePro()
          ),
          this
        );
      },
      updatePro: async function () {
        await Promise.all([vw.updatePro(), ww.updatePro(), xw.updatePro()]);
      },
      reply: function (e, t) {
        if (e)
          try {
            e(t);
          } catch (e) {}
      },
    },
    trialController: ww,
  };
  var Dw = {
    shown: !1,
    loading: !0,
    videoUrl: null,
    coverUrl: null,
    selectedTabId: "auto",
    showGrid: !1,
    gridImages: [],
    frameGalleryImages: [],
    frameGallerySelectedImage: null,
    frameSelectImage: null,
    frameSelectValue: 0.5,
    frameUploadImage: null,
  };
  const { transaction: kw } = ib;
  function Ew(e) {
    const t = sw.getTemplateUserState();
    kw((n) => {
      var r;
      (n.cleanupId = e),
        (n.dm.badgeText = ""),
        (n.dm.ghostModeFailed = !1),
        (n.reels.creating = !1),
        (n.igView.creationCardShown = !1),
        (n.igView.fullscreenWidth = 460),
        (n.billing.purchasingPlan = null),
        (n.tagAssist.shown = !1),
        (n.tagAssist.query = ""),
        (n.tagAssist.searching = !1),
        (n.tagAssist.errorCode = null),
        (n.tagAssist.selectedTabId = "search"),
        (n.tagAssist.selectedGroupId = "medium"),
        (n.tagAssist.igSelectedTags = []),
        (n.tagAssist.fcsSelectedTags = []),
        (n.tagAssist.sidebarSelectedTags = []),
        (n.tagAssist.sidebarSelectedTagsAsText = ""),
        (n.tagAssist.ladderEngagementSort = null),
        (n.tagAssist.summaryEngagementSort = "descending"),
        (n.tagAssist.ladderPostCountSort = null),
        (n.tagAssist.summaryPostCountSort = null),
        (n.tagAssist.ladder = null),
        (n.tagAssist.ladderLoadingTags = []),
        (n.tagAssist.newCollection.name = ""),
        (n.tagAssist.newCollection.text = ""),
        (n.tagAssist.newCollection.showForm = !1),
        (n.tagAssist.collectionsLoadingTags = []);
      for (const e of n.tagAssist.collections)
        (e.editing = !1), (e.editName = ""), (e.editText = "");
      const o = n.tagAssist.accountStats[n.authStatus.userId] || null,
        i = (null == o ? void 0 : o.mostUsedTags) || [];
      i.length > 0 &&
        ((n.tagAssist.searching = !0),
        (n.tagAssist.query = i
          .slice(0, 2)
          .map((e) => `#${e}`)
          .join(" "))),
        Object.assign(n.coverAssist, Dw),
        (n.musicAssist.shown = !1),
        (n.storyAssist.shown = !1),
        (n.storyAssist.coverUrl = null),
        (n.storyAssist.showUpsellOverlay = !1),
        (n.storyAssist.mentions.query = ""),
        (n.storyAssist.mentions.foundUsers = []),
        (n.storyAssist.mentions.selectedUsers = []),
        (n.ghostStoryView.showUpsellOverlay = !1),
        (n.schedule.loading = !0),
        (n.schedule.fcsError = null),
        (n.schedule.fcsFailed = !1),
        (n.schedule.isErrorShown = !1),
        (n.schedule.isUpsellShown = !1),
        (n.schedule.isDraggingPost = !1),
        (n.schedule.showTagAssist = !1),
        (n.schedule.addingFiles = !1),
        (n.schedule.fileUploadErrors = []),
        (n.schedule.posts = n.schedule.posts
          .filter((e) => "saving" !== e.saveStatus)
          .filter((e) => "deleting" !== e.saveStatus)),
        (n.schedule.fallback.isFailedToReconnect = !1),
        (n.schedule.fallback.isRetryingFbConnection = !1),
        (n.schedule.fallback.hideSwitchToFallbackButton = !1),
        (n.schedule.navigation.isOpen = !1),
        (n.schedule.navigation.selectedTabId = null),
        (n.schedule.navigation.withBackToCalendarButton = !1),
        (n.schedule.fcsSetup.screen = "welcome"),
        (n.schedule.fcsSetup.checking = !0),
        (n.schedule.fcsSetup.connected = !1),
        (n.schedule.fcsSetup.connecting = !1),
        (n.schedule.fcsSetup.showPanel = !1),
        (n.schedule.fcsSetup.errorCode = null),
        (n.schedule.fcsSetup.failed = !1),
        (n.schedule.fcsSetup.steps.fbLogin = null),
        (n.schedule.fcsSetup.steps.igProfessional = null),
        (n.schedule.fcsSetup.steps.igConnectedToFbPage = null),
        (n.schedule.calendar.periodStart = null),
        (n.schedule.dateDialog = w_.getDefaultDateDialogState(n)),
        (n.schedule.addCard = t.schedule.addCard),
        (n.bulk = t.bulk);
      const a = Date.now() + R.time.DAY,
        s =
          (null === (r = n.schedule.timeSlots[0]) || void 0 === r
            ? void 0
            : r.time) || null;
      (n.bulk.dateDialog.week.selectedSlotTime = s),
        (n.bulk.dateDialog.calendar.periodStart = a),
        (n.bulk.dateDialog.calendar.selectedDay = a),
        (n.bulk.dateDialog.calendar.selectedSlotTime = s),
        (n.bulk.dateDialog.startingDay.periodStart = a),
        (n.bulk.dateDialog.startingDay.selectedDay = a);
    });
  }
  var Tw = {
      controller: {
        init: function () {
          q.on("cleanup.clean-up-state", () => {
            const e = Date.now();
            return Ew(e), e;
          });
        },
        cleanUpState: Ew,
      },
    },
    Iw = {
      init: async function () {
        return void (await wy.controller.delete("image-proxy.cache"));
        (Aw = (await wy.controller.get("image-proxy.cache")) || {}),
          Fw.resolve(),
          q.on("image-proxy.save", Ow),
          q.on("image-proxy.cache-item-used", Mw);
      },
      save: Ow,
    };
  const Cw = 15 * R.time.SECOND,
    Fw = R.createResolvablePromise();
  let Aw;
  async function Ow(e) {}
  async function Mw(e) {
    Aw[e] && ((Aw[e].lastUsedAt = Date.now()), Rw());
  }
  function Rw() {
    const e = Rw;
    clearTimeout(e.timeout),
      (e.timeout = setTimeout(async () => {
        wy.controller.set("image-proxy.cache", Aw);
      }, Cw));
  }
  var Nw = { controller: Iw };
  function Bw() {
    const e = [];
    return Object.assign(t, {
      handle: function (e) {
        if ("function" != typeof e)
          return void console.error("function is expected");
        t(e);
      },
      clear: function () {
        e.length = 0;
      },
      off: function (t) {
        const n = e.indexOf(t);
        -1 !== n && e.splice(n, 1);
      },
      isEmpty: function () {
        return 0 === e.length;
      },
    });
    function t(...t) {
      "function" == typeof t[0] ? e.push(t[0]) : e.forEach((e) => e(...t));
    }
  }
  var Uw = {
    init: function () {
      (Lw = -1),
        q.on("core-web-request.popup-tab-id", (e) => {
          jw = e;
        });
    },
    watch: function (e, t) {
      chrome.webRequest.onBeforeRequest.addListener(
        (e) => {
          let n = null;
          const r = new URL(e.url).host;
          return (
            t({
              details: e,
              isBeforeRequest: !0,
              isRequest: !1,
              isResponse: !1,
              fromExtension: Hw(e),
              checkUrl: function (t) {
                return e.url.includes(t);
              },
              checkHost: function (e) {
                return r.includes(e);
              },
              redirect: function (e) {
                n = { redirectUrl: e };
              },
              cancel: function () {
                n = { cancel: !0 };
              },
              getHeader: function () {},
              setHeader: function () {},
            }),
            n
          );
        },
        { urls: e },
        ["blocking"]
      ),
        chrome.webRequest.onBeforeSendHeaders.addListener(
          (e) => {
            qw(e.requestHeaders);
            const n = new URL(e.url).host;
            return (
              t({
                details: e,
                isBeforeRequest: !1,
                isRequest: !0,
                isResponse: !1,
                fromExtension: Hw(e),
                redirect: function () {},
                cancel: function () {},
                checkUrl: function (t) {
                  return e.url.includes(t);
                },
                checkHost: function (e) {
                  return n.includes(e);
                },
                getHeader: function (t) {
                  return (
                    (t = t.toLowerCase()),
                    e.requestHeaders.find((e) => e.name === t)
                  );
                },
                setHeader: function (t, n) {
                  (t = t.toLowerCase()),
                    (e.requestHeaders = e.requestHeaders.filter(
                      (e) => e.name !== t
                    )),
                    e.requestHeaders.push({ name: t, value: n });
                },
                removeHeader: function (t) {
                  (t = t.toLowerCase()),
                    (e.requestHeaders = e.requestHeaders.filter(
                      (e) => e.name !== t
                    ));
                },
              }),
              { requestHeaders: e.requestHeaders }
            );
          },
          { urls: e },
          ["blocking", "requestHeaders", "extraHeaders"]
        ),
        chrome.webRequest.onHeadersReceived.addListener(
          (e) => {
            qw(e.responseHeaders);
            const n = new URL(e.url).host;
            return (
              t({
                details: e,
                isBeforeRequest: !1,
                isRequest: !1,
                isResponse: !0,
                fromExtension: Hw(e),
                redirect: function () {},
                cancel: function () {},
                checkUrl: function (t) {
                  return e.url.includes(t);
                },
                checkHost: function (e) {
                  return n.includes(e);
                },
                getHeader: function (t) {
                  return (
                    (t = t.toLowerCase()),
                    e.responseHeaders.find((e) => e.name === t)
                  );
                },
                setHeader: function (t, n) {
                  (t = t.toLowerCase()),
                    (e.responseHeaders = e.responseHeaders.filter(
                      (e) => e.name !== t
                    )),
                    e.responseHeaders.push({ name: t, value: n });
                },
                removeHeader: function (t) {
                  (t = t.toLowerCase()),
                    (e.responseHeaders = e.responseHeaders.filter(
                      (e) => e.name !== t
                    ));
                },
              }),
              { responseHeaders: e.responseHeaders }
            );
          },
          { urls: e },
          ["blocking", "responseHeaders", "extraHeaders"]
        );
    },
  };
  let jw = null,
    Lw = null;
  function qw(e) {
    for (const t of e) t.name = t.name.toLowerCase();
  }
  function Hw(e) {
    return e.tabId === jw || e.tabId === Lw;
  }
  var Vw = { controller: Uw };
  const zw = Bw();
  function Gw({
    details: e,
    isBeforeRequest: t,
    isRequest: n,
    isResponse: r,
    fromExtension: o,
    redirect: i,
    cancel: a,
    getHeader: s,
    setHeader: l,
    removeHeader: u,
    checkUrl: c,
    checkHost: d,
  }) {
    if (
      (zw(arguments[0]),
      t && d("app.inssist.com") && i(chrome.runtime.getURL("/inssist.html")),
      t &&
        d("instagram.com") &&
        c("service-worker") &&
        i(chrome.runtime.getURL("/js/ig-service-worker.js")),
      n &&
        o &&
        (d("instagram.com") || d("facebook.com") || d("fastspring.com")))
    ) {
      const t = s("origin");
      if (!t || (null == t ? void 0 : t.value.startsWith("chrome-extension"))) {
        l("origin", new URL(e.url).origin);
      }
    }
    n && o && d("instagram.com") && l("sec-fetch-dest", "document");
    const f = n && o && d("instagram.com");
    if (f) {
      l(
        "user-agent",
        "Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.1 Mobile/15E148 Safari/604.1"
      );
    }
    r &&
      d("instagram.com") &&
      l("access-control-expose-headers", "*, Authorization"),
      r &&
        (d("instagram.com") ||
          d("facebook.com") ||
          d("inssist.com") ||
          d("onfastspring.com")) &&
        (e.responseHeaders = e.responseHeaders.filter(
          (e) => "x-frame-options" !== e.name
        )),
      r &&
        (d("instagram.com") ||
          d("facebook.com") ||
          d("inssist.com") ||
          d("onfastspring.com")) &&
        (e.responseHeaders = e.responseHeaders.filter(
          (e) =>
            "content-security-policy" !== e.name &&
            "content-security-policy-report-only" !== e.name
        )),
      t && c("/csp/reporting") && a();
  }
  var $w = {
    controller: {
      init: function () {
        Vw.controller.watch(
          [
            "https://*.onfastspring.com/*",
            "https://*.instagram.com/*",
            "https://*.facebook.com/*",
            "https://*.inssist.com/*",
          ],
          Gw
        );
      },
      onRequest: zw,
    },
  };
  const { model: Ww, transaction: Yw } = ib;
  var Qw = {
    init: async function () {
      await (async function () {
        if ("username" in Ww.state.authStatus) return;
        my.ignoreCache();
        const e = await My.api.fetchViewerInfo();
        if (e.error) return;
        const t = e.result || null;
        Yw((e) => {
          (e.authStatus.userId = (null == t ? void 0 : t.userId) || null),
            (e.authStatus.username = (null == t ? void 0 : t.username) || null),
            (e.authStatus.fullName = (null == t ? void 0 : t.fullName) || null),
            (e.authStatus.email = (null == t ? void 0 : t.email) || null),
            (e.authStatus.avatarUrl =
              (null == t ? void 0 : t.avatarUrl) || null),
            (e.authStatus.isLoggedIn = !!t),
            (e.authStatus.cookies = (null == t ? void 0 : t.cookies) || {
              igSessionId: null,
              fb: [],
            });
        }),
          await a_();
      })(),
        (function () {
          let e;
          chrome.cookies.onChanged.addListener(({ cookie: t, removed: n }) => {
            Kw ||
              Ww.state.schedule.fcsSetup.connecting ||
              (".instagram.com" === t.domain &&
                "sessionid" === t.name &&
                (clearTimeout(e), (e = setTimeout(() => Zw()))));
          });
        })(),
        (function () {
          let e;
          $w.controller.onRequest(
            ({ details: n, isResponse: r, checkHost: o }) => {
              if (r && o("facebook.com")) {
                !!n.responseHeaders.find((e) => "set-cookie" === e.name) &&
                  (clearTimeout(e), (e = setTimeout(t)));
              }
            }
          );
          const t = async () => {
            const e = await I(chrome.cookies.getAll, {
              domain: ".facebook.com",
            });
            Yw((t) => {
              t.authStatus.cookies.fb = e;
            });
          };
        })(),
        q.on("auth.set-ig-initial-url", e_),
        q.on("auth.login", t_),
        q.on("auth.logout", n_),
        q.on("auth.refresh-user", Zw),
        q.on("auth.toggle-session-watcher", i_),
        chrome.runtime.onMessage.addListener(
          (e, t, n) => "update-user" === e.name && Xw()
        );
    },
    updateUser: Xw,
    refreshUser: Zw,
    clearFbCookies: r_,
  };
  let Jw = null,
    Kw = !1;
  async function Xw(e = !1) {
    log("auth-controller: updating user id...");
    !(await Zw()) && e && chrome.tabs.update({ url: fb.login.url });
  }
  async function Zw() {
    const e = Zw,
      t = vb.generate();
    (e.requestId = t), my.ignoreCache();
    const n = await My.api.fetchViewerInfo();
    if (e.requestId !== t) return;
    if (n.error) return;
    const r = n.result || null,
      o = r && Ww.state.authStatus.userId === r.userId;
    return (
      r && Nw.controller.save(r.avatarUrl),
      Yw((e) => {
        if (r && e.authStatus.userId === r.userId)
          return (
            (e.authStatus.username = r.username),
            (e.authStatus.avatarUrl = r.avatarUrl),
            void (e.multiaccount.selectedUserId = r.userId)
          );
        if (r) {
          const t = e.multiaccount.userIds;
          e.multiaccount.addingNewAccount
            ? (e.multiaccount.addingNewAccount = !1)
            : e.authStatus.isLoggedIn ||
              (function (e, t) {
                let n;
                (n = "function" == typeof t ? e.findIndex(t) : e.indexOf(t)),
                  -1 !== n && e.splice(n, 1);
              })(t, e.multiaccount.selectedUserId),
            t.includes(r.userId) || t.push(r.userId),
            (e.multiaccount.selectedUserId = r.userId);
        }
        if (e.authStatus.userId) {
          e.userStates[e.authStatus.userId] = {};
          const t = sw.getTemplateUserState();
          for (const n in t) e.userStates[e.authStatus.userId][n] = e[n];
        }
        let t = null;
        r && e.userStates[r.userId]
          ? ((t = e.userStates[r.userId]), delete e.userStates[r.userId])
          : (t = sw.getTemplateUserState()),
          (t.authStatus.userId = (null == r ? void 0 : r.userId) || null),
          (t.authStatus.username = (null == r ? void 0 : r.username) || null),
          (t.authStatus.avatarUrl = (null == r ? void 0 : r.avatarUrl) || null),
          (t.authStatus.isLoggedIn = !!r),
          Object.assign(e, t);
      }),
      await a_(),
      o ||
        (q.send("iframe-bus", "ig.clear-and-show-spinner"),
        r
          ? Jw
            ? q.send("iframe-bus", "ig.hard-go", Jw)
            : (Tw.controller.cleanUpState(), q.send("iframe-bus", "ig.refresh"))
          : q.send("iframe-bus", "ig.hard-go", "/accounts/login/"),
        q.send("iframe-bus", "dm.refresh"),
        q.send("iframe-bus", "schedule.fcs-refresh-page")),
      (Jw = null),
      q.send("auth.refreshed"),
      r
    );
  }
  function e_(e) {
    Jw = e;
  }
  async function t_(e) {
    var t;
    const n =
      null === (t = Ww.state.userStates[e]) || void 0 === t
        ? void 0
        : t.authStatus;
    if (n) {
      i_(!1);
      try {
        await r_();
        for (const e of n.cookies.fb)
          await I(chrome.cookies.set, {
            url: "https://*.facebook.com",
            name: e.name,
            value: e.value,
            domain: e.domain,
            path: e.path,
            secure: e.secure,
            httpOnly: e.httpOnly,
            sameSite: e.sameSite,
            storeId: e.storeId,
            expirationDate: e.expirationDate,
          });
        await o_(),
          await I(chrome.cookies.set, {
            url: "https://*.instagram.com",
            name: "sessionid",
            value: n.cookies.igSessionId,
            domain: ".instagram.com",
            path: "/",
            secure: !0,
            httpOnly: !1,
            sameSite: "no_restriction",
            expirationDate: Math.round((Date.now() + 31536e6) / 1e3),
          });
      } catch (e) {
        console.error(e);
      }
      i_(!0), setTimeout(() => Zw());
    } else console.error("auth status not found", { userId: e });
  }
  async function n_() {
    await r_(), await o_();
  }
  async function r_() {
    const e = await I(chrome.cookies.getAll, { domain: ".facebook.com" });
    for (const t of e)
      await I(chrome.cookies.remove, {
        url: "https://*.facebook.com",
        name: t.name,
      });
  }
  async function o_() {
    await I(chrome.cookies.remove, {
      url: "https://*.instagram.com/*",
      name: "sessionid",
    });
  }
  function i_(e) {
    Kw = !e;
  }
  async function a_() {
    const e = await I(chrome.cookies.get, {
        url: "https://*.instagram.com",
        name: "sessionid",
      }),
      t = await I(chrome.cookies.getAll, { domain: ".facebook.com" });
    Yw((n) => {
      (n.authStatus.cookies.igSessionId =
        (null == e ? void 0 : e.value) || null),
        (n.authStatus.cookies.fb = t);
    });
  }
  var s_ = { controller: Qw };
  const { model: l_, transaction: u_ } = ib;
  var c_ = {
    init: function () {
      q.on("schedule.connect-to-fcs", d_),
        q.on("schedule.drop-fb-xs-cookie", g_);
    },
  };
  async function d_({ skipFbLogin: e = !1 } = {}) {
    if (l_.state.schedule.fcsSetup.connecting) return;
    u_((e) => {
      (e.schedule.fcsSetup.screen = "steps"),
        (e.schedule.fcsSetup.connecting = !0);
    }),
      f_(
        e
          ? {
              fbLogin: "skipped",
              igProfessional: "loading",
              igConnectedToFbPage: null,
            }
          : {
              fbLogin: "loading",
              igProfessional: null,
              igConnectedToFbPage: null,
            }
      );
    if (await h_()) return;
    if (!e) {
      let e;
      try {
        e = await Hy.api.checkAuth();
      } catch (e) {
        return (
          console.error("[fcs setup] failed to check fb auth", e),
          f_({ fbLogin: "failed" }),
          void u_((e) => (e.schedule.fcsSetup.connecting = !1))
        );
      }
      if (!e)
        return (
          f_({ fbLogin: "nok" }),
          void u_((e) => (e.schedule.fcsSetup.connecting = !1))
        );
    }
    f_({ fbLogin: e ? "skipped" : "ok", igProfessional: "loading" }),
      await R.sleep(1e3),
      my.ignoreCache();
    const t = (await My.api.fetchViewerInfo()).result;
    if (!t)
      return (
        f_({ igProfessional: "failed" }),
        void u_((e) => (e.schedule.fcsSetup.connecting = !1))
      );
    if (!t.isProfessionalAccount)
      return (
        f_({ igProfessional: "nok" }),
        void u_((e) => (e.schedule.fcsSetup.connecting = !1))
      );
    f_({ igProfessional: "ok", igConnectedToFbPage: "loading" });
    if (await h_()) return;
    let n;
    if (
      ((n = e
        ? await q.send("iframe-bus", "schedule.connect-via-ig")
        : await q.send("iframe-bus", "schedule.connect-via-fb")),
      n.error)
    )
      return (
        e && g_(),
        "not-connected-to-fb-page" === n.error
          ? f_({ igConnectedToFbPage: "nok" })
          : "auth-window-closed-by-user" === n.error
          ? (f_({ igConnectedToFbPage: "failed" }), s_.controller.refreshUser())
          : (console.error("[fcs setup]", n.error),
            f_({ igConnectedToFbPage: "failed" }, n.error)),
        void u_((e) => (e.schedule.fcsSetup.connecting = !1))
      );
    if (e) {
      const { fcsConnected: e } = await p_();
      if (!e)
        return (
          g_(),
          f_({ igConnectedToFbPage: "failed" }, "failed-to-skip-fb-login"),
          void u_((e) => (e.schedule.fcsSetup.connecting = !1))
        );
    }
    try {
      await s_.controller.refreshUser();
    } catch (e) {
      return (
        console.error("[fcs setup] failed to refresh user", e),
        f_({ igConnectedToFbPage: "failed" }, "failed-to-refresh-user"),
        void u_((e) => (e.schedule.fcsSetup.connecting = !1))
      );
    }
    f_({ igConnectedToFbPage: "ok" }),
      await R.sleep(1e3),
      u_((e) => {
        (e.schedule.fcsSetup.connecting = !1),
          (e.schedule.fcsSetup.showPanel = !1),
          (e.schedule.loading = !0);
      }),
      q.send("iframe-bus", "schedule.fcs-refresh-page"),
      xy.controller.sendEvent("user", "schedule:setup-connection-success");
  }
  function f_(e = {}, t = null) {
    for (const n in e)
      if ("failed" === e[n]) {
        const e = t ? `${n}_${t}` : n;
        xy.controller.sendEvent("user", "schedule:setup-connection-error", e);
        break;
      }
    u_((t) => {
      Object.assign(t.schedule.fcsSetup.steps, e);
    });
  }
  async function p_() {
    return (
      q.send("iframe-bus", "schedule.fcs-refresh-page"),
      new Promise((e) => {
        q.on("schedule.fcs-connection-status", function t({ fcsConnected: n }) {
          q.off("schedule.fcs-connection-status", t), e({ fcsConnected: n });
        });
      })
    );
  }
  async function h_() {
    const { fcsConnected: e } = await p_();
    return (
      !!e &&
      (q.send("iframe-bus", "schedule.fcs-refresh-page"),
      u_((e) => {
        (e.schedule.fcsSetup.connecting = !1),
          (e.schedule.fcsSetup.showPanel = !1),
          (e.schedule.loading = !0);
      }),
      !0)
    );
  }
  async function g_() {
    await R.callAsync(chrome.cookies.remove, {
      url: "https://*.facebook.com/*",
      name: "xs",
    });
  }
  var m_ = {
    init: function () {
      !(function () {
        let e;
        q.on("schedule.upload-99", (t) => {
          clearTimeout(e),
            (e = setTimeout(() => {
              lb.controller.sendError(
                "Upload stuck at 99.9%",
                "error",
                { debugData: t },
                { actor: "schedule" }
              );
            }, 20 * R.time.SECOND));
        }),
          q.on("schedule.upload-100", () => {
            clearTimeout(e);
          });
      })();
    },
  };
  const { model: v_, transaction: b_ } = ib;
  async function y_(e = !1) {
    const t = v_.state,
      n = t.authStatus.username;
    if (!n) return;
    if (!e) {
      if (t.schedule.fcsSetup.checking) return;
      if (t.schedule.fcsSetup.connected) return;
    }
    my.ignoreCache();
    const r = await My.api.fetchUserPosts(n, 50);
    if (t.authStatus.username !== n) return;
    const o = (r.result || [])
      .map((e) => {
        const t = { photo: "photo", video: "video", carousel: "carousel" }[
          e.type
        ];
        return t
          ? (function (e) {
              const t = (t, n) => (
                t in e ||
                  console.error(
                    `error in post object generation: no ${t} provided`
                  ),
                e[t] || n
              );
              return {
                id: t("id"),
                source: t("source"),
                type: t("type"),
                isIgtv: e.isIgtv || !1,
                status: t("status"),
                image: t("image", null),
                preview: t("preview", null),
                imageAvgColor: t("imageAvgColor", null),
                on: t("on", null),
                createdOn: t("createdOn", null),
                stats: t("stats", null),
                crosspostToFb: t("crosspostToFb", !1),
                saveStatus: t("saveStatus", null),
                draftOrder: t("draftOrder", null),
                caption: t("caption", ""),
              };
            })({
              id: e.id,
              source: "ig",
              type: t,
              status: "posted",
              image: e.imgMedium || e.img || e.imgx,
              preview: e.imgMedium || e.img || e.imgx,
              imageAvgColor: null,
              on: e.on,
              createdOn: e.on,
              stats: { likes: e.stats.likes, comments: e.stats.comments },
              crosspostToFb: null,
              saveStatus: null,
              draftOrder: null,
              caption: "",
            })
          : null;
      })
      .filter(Boolean);
    b_((e) => {
      (e.schedule.loading = !1),
        (e.schedule.lastIgPostsUpdateOn = Date.now()),
        (e.schedule.posts = e.schedule.posts
          .filter((e) => "local" === e.source)
          .concat(o));
    });
  }
  var w_ = {
    controller: {
      init: function () {
        c_.init(),
          m_.init(),
          (async function () {
            q.on("popup.start", async () => {
              const e = [v_.state, ...Object.values(v_.state.userStates)],
                t = e
                  .map((e) => e.schedule.posts)
                  .flat()
                  .filter((e) => "fcs" === e.source)
                  .map((e) => e.id.toString()),
                n = e
                  .map((e) => e.schedule.posts)
                  .flat()
                  .filter((e) => "local" === e.source)
                  .map((e) => e.id.toString()),
                r = await wy.controller.getAllKeys();
              for (const e of r)
                if (e.startsWith("schedule.fcs-post-preview:")) {
                  const n = e.split(":")[1];
                  if (t.includes(n)) continue;
                  await R.safe(() => wy.controller.delete(e));
                } else if (e.startsWith("schedule.local-post:")) {
                  const t = e.split(":")[1];
                  if (n.includes(t)) continue;
                  await R.safe(() => wy.controller.delete(e));
                }
            });
          })(),
          q.on("schedule.update-ig-posts", y_),
          mb.on("schedule.update-ig-posts", y_);
      },
      getReport: async function () {
        return await q.send("iframe-bus", "schedule.fcs-get-report");
      },
    },
    getDefaultDateDialogState: function (e) {
      const t = e.schedule.timeSlots;
      return {
        isOpen: !1,
        selectedOption: "publish-now",
        periodStart: null,
        selectedDay: null,
        selectedSlotTime: t.length > 0 ? t[0].time : null,
        customTime: null,
        timezone: null,
        isTimeError: !1,
      };
    },
  };
  const { model: __ } = ib;
  var S_ = {
    init: function () {
      q.on("overseer.send-report", D_);
    },
    sendReport: D_,
  };
  const x_ = [
      "acknowledged",
      "analytics",
      "dm",
      "experiments",
      "followUs",
      "igTask",
      "igView",
      "insights",
      "multiaccount",
      "rateUs",
      "sidebar",
      "tagAssist",
      "userDetails",
      "welcome",
      { field: "authStatus", cb: (e) => S.cloneDeep(e) },
      { field: "authStatus.cookies", cb: () => "!sanitized" },
      { field: "billing", cb: (e) => S.cloneDeep(e) },
      { field: "billing.account.token", cb: () => "!sanitized" },
      {
        field: "schedule",
        cb: (e) => {
          const t = S.cloneDeep(e);
          return (
            t &&
              t.posts &&
              (t.posts = t.posts.map(
                (e) => (delete e.image, delete e.preview, e)
              )),
            t
          );
        },
      },
      { field: "userStates", cb: () => "!ignored" },
      { field: "whatsNew", cb: () => "!ignored" },
    ],
    P_ = new Qy.Sender({ urlPrefix: u.options.apiUrl });
  async function D_({ key: e, filters: t, data: n } = {}) {
    if (
      ((e = e || "system"),
      (n = n || {}),
      (t = t || {}).username || (t.username = sw.proxy.username() || "unknown"),
      "string" != typeof n && !n.state)
    ) {
      const e = __.state,
        t = {};
      x_.forEach((n) => {
        if ("string" == typeof n) t[n] = e[n];
        else {
          const r = e[n.field];
          t[n.field] = n.cb(r);
        }
      }),
        (n.state = t);
    }
    "string" == typeof n ||
      n.schedule ||
      (n.schedule = await w_.controller.getReport());
    try {
      n = JSON.stringify(n);
    } catch (e) {
      n = e.message;
    }
    const r = { key: e, filters: t, data: n };
    u.is.development &&
      q.send("popup.log", "%coverseer report [background]", "color: #c818dc", {
        key: e,
        filters: t,
        data: JSON.parse(n),
      }),
      P_.send("/overseer", { body: r })
        .then((t) => {
          log(`overseer ${e} report of ${n.length} bytes was sent`);
        })
        .catch((t) => {
          error(`! failed sending ${e} overseer report of ${n.length} bytes:`),
            error(t);
        });
  }
  var k_ = { controller: S_ },
    E_ = {
      getCredibility: function (e, t = null, { forcePrivate: n = !1 } = {}) {
        const r = e.userId === t;
        if (e.isPrivate && !r && !n) return null;
        if (e.isVerified) return 1;
        if ("inssistapp" === e.username) return 1;
        let o = 0,
          i = 0;
        Object.values(T_).forEach((t) => {
          (o += t.getValue(e) * t.weight), (i += Math.max(t.weight, 0));
        });
        const a =
            e.followingsCount > 7e3
              ? 0.45
              : e.followingsCount > 6500
              ? 0.4
              : e.followingsCount > 6e3
              ? 0.35
              : e.followingsCount > 5500
              ? 0.25
              : e.followingsCount > 5e3
              ? 0.1
              : 0,
          s = 1 - I_(o / i + a);
        return Math.round(100 * s) / 100;
      },
    };
  const T_ = {
    "followings-to-followers-ratio": {
      weight: 150,
      getValue: function (e) {
        return I_(Math.log2(e.followingsCount / e.followersCount / 4) / 1.5);
      },
    },
    "short-bio": {
      weight: 30,
      getValue: function (e) {
        if (!e.bio) return 1;
        return I_((20 - e.bio.length) / 20);
      },
    },
    "no-avatar": {
      weight: 100,
      getValue: function (e) {
        return e.hasAvatar ? 0 : 1;
      },
    },
    "few-posts": {
      weight: 200,
      getValue: function (e) {
        return I_((24 - e.postsCount) / 24);
      },
    },
    "username-ends-with-digits": {
      weight: 100,
      getValue: function (e) {
        if (!e.username) return 0;
        const t = e.username.replace(/[_.]*/g, "").match(/.*(\d{4,})$/),
          n = t && t[1];
        if (!n) return 0;
        const r = Number(n);
        return r > 1950 && r < 2030 ? 0 : 1;
      },
    },
    "has-highlights": {
      weight: -25,
      getValue: function (e) {
        return e.hasHighlights ? 1 : 0;
      },
    },
    "posts-frequency": {
      weight: 150,
      getValue: function (e) {
        if (e.isPrivate) return 0;
        const t = e.lastPosts ? e.lastPosts.length : 0;
        if (0 === t) return 1;
        const n = Date.now(),
          r = 2592e6,
          o = e.lastPosts.map((e) => e.ts).sort();
        if (o.some((e) => n - e < r)) return 0;
        let i = 0,
          a = 0,
          s = 0;
        for (;;) {
          if (
            (o[a] - o[i] < r && a < t ? (a++, (s = Math.max(s, a - i))) : i++,
            i === t - 1)
          )
            break;
        }
        return I_((s / t - 0.6) / 0.4);
      },
    },
  };
  function I_(e) {
    return Math.min(Math.max(0, e), 1);
  }
  var C_ = E_;
  const F_ = [
      {
        condition: (e) => e > 0.85,
        value: "A",
        label: "credible",
        color: "#74BE86",
      },
      {
        condition: (e) => e > 0.7,
        value: "B",
        label: "credible",
        color: "#74BE86",
      },
      {
        condition: (e) => e > 0.55,
        value: "C",
        label: "could be spam",
        color: "#BAD043",
      },
      {
        condition: (e) => e > 0.35,
        value: "D",
        label: "likely spam",
        color: "#FFCC24",
      },
      {
        condition: (e) => "number" == typeof e,
        value: "F",
        label: "spam / inactive",
        color: "#E34E21",
      },
      {
        condition: (e) => "failed" === e,
        value: "N/A",
        label: "check failed",
        color: "#D8DADD",
      },
      {
        condition: () => !0,
        value: "N/A",
        label: "user is private",
        color: "#D8DADD",
      },
    ],
    { model: A_ } = ib;
  function O_(e) {
    const t = A_.state.authStatus.userId;
    return (function (e) {
      const t = F_.find((t) => t.condition(e));
      return { value: t.value, label: t.label, color: t.color };
    })(C_.getCredibility(e, t));
  }
  var M_ = {
    controller: {
      init: async function () {
        q.on("insights.get-credibility-grade", O_);
      },
    },
  };
  const R_ = {};
  R_.controller = {
    init: function () {
      R.ls.remove("ab-testing-hash");
    },
  };
  var N_ = R_;
  const { model: B_, transaction: U_ } = ib,
    j_ = (e) =>
      "string" != typeof e && "boolean" != typeof e && "number" != typeof e
        ? JSON.stringify(e)
        : e,
    L_ = function (e) {
      console.log(`%c[test] ${j_(e)}`, "color: #3d9d30");
    },
    q_ = function (e) {
      console.log(`%c[test] ${j_(e)}`, "color: #e94b35");
    },
    H_ = function (e) {
      console.log(j_(e));
    },
    V_ = {
      init: function () {
        (globalThis.$env = u),
          (globalThis.ig = fb),
          (globalThis.utils = D),
          (globalThis.$igApi = My),
          (globalThis.$fbApi = Hy),
          (globalThis.$eventBus = mb),
          (globalThis.$chromeBus = q),
          (globalThis.$iframeBus = ny),
          (globalThis.$abTesting = N_),
          (globalThis.$ga = xy),
          (globalThis.$fetcher = my),
          (globalThis.$coreBilling = Pw),
          (globalThis.$idb = wy),
          (globalThis.$sentry = lb),
          (globalThis.$overseer = k_),
          (globalThis.$insights = M_),
          (globalThis.setState = this.setState),
          (globalThis.downgradeVersion = this.downgradeVersion),
          (globalThis.testGetSkuDetails = this.testGetSkuDetails),
          (globalThis.testGetPurchases = this.testGetPurchases),
          (globalThis.testAll = this.testAll),
          (globalThis.errorsDelta = this.errorsDelta),
          (globalThis.activityDelta = this.activityDelta),
          (globalThis.countMadeActions = this.countMadeActions),
          (u.is.development || u.is.beta) &&
            ((globalThis.model = B_),
            (globalThis.transaction = U_),
            (globalThis.$utils = R),
            (globalThis.$synch = hw),
            (globalThis.$state = sw),
            (globalThis.unbanAllTasks = this.unbanAllTasks),
            this.defineCommit());
      },
      countMadeActions: function (e = 86400) {
        const t = globalThis.__debug.state,
          n = D.getUnixTime(),
          r = { likes: 0 };
        for (let o = 0; o < t.stats.activity.length; o++) {
          const i = t.stats.activity[o];
          if (n - i.on > e) break;
          "like" === i.type && r.likes++;
        }
        return r;
      },
      errorsDelta: function () {
        const e = globalThis.__debug.errors;
        let t = e[0].on;
        e.forEach((e) => {
          log((t - e.on) / 60), (t = e.on);
        });
      },
      activityDelta: function () {
        const e = globalThis.__debug.state.stats.activity;
        let t = e[0].on;
        globalThis.__debug.state.stats.activity = e.map((e) => {
          const n = t;
          return (t = e.on), { ...e, since: Math.floor((n - e.on) / 60) };
        });
      },
      setState: function (e) {
        const t = S.cloneDeep(e);
        sw.replaceState.dispatch(t);
      },
      downgradeVersion: function () {
        const e = S.cloneDeep(B_.state);
        (e.version = e.version - 1), sw.replaceState.dispatch(e);
      },
      unbanAllTasks: function () {
        const e = S.cloneDeep(B_.state);
        (e.stats.activity = e.stats.activity.filter((e) => "ban" !== e.type)),
          sw.replaceState.dispatch(e);
      },
      testGetSkuDetails: function () {
        return (
          L_("billing.getSkuDetails..."),
          new Promise((e) => {
            google.payments.inapp.getSkuDetails({
              parameters: { env: "prod" },
              success: (t) => {
                L_("  success:"), H_(t), e();
              },
              failure: (t) => {
                u.is.development &&
                t &&
                t.response &&
                "INVALID_RESPONSE_ERROR" === t.response.errorType
                  ? L_("  success:")
                  : q_("  failure:"),
                  H_(t),
                  e();
              },
            });
          })
        );
      },
      testGetPurchases: function () {
        return (
          L_("billing.getPurchases..."),
          new Promise((e) => {
            google.payments.inapp.getPurchases({
              parameters: { env: "prod" },
              success: (t) => {
                L_("  success:"), H_(t), e();
              },
              failure: (t) => {
                q_("  failure:"), H_(t), e();
              },
            });
          })
        );
      },
      testAll: function () {
        new Promise((e) => {
          setTimeout(e, 0);
        })
          .then(V_.testGetSkuDetails)
          .then(V_.testGetPurchases);
      },
      defineCommit: function () {
        Object.defineProperty(globalThis, "commit", {
          get: () => (this.setState(B_.state), null),
        });
      },
    };
  var z_ = { controller: V_ },
    G_ = {
      init: async function () {
        await (async function () {
          for (const e of $_) {
            const t = (
              await R.callAsync(chrome.cookies.getAll, { url: e })
            ).filter((e) => "unspecified" === e.sameSite);
            await Promise.all(
              t.map(async (t) => {
                e.startsWith("http://")
                  ? await R.callAsync(chrome.cookies.remove, {
                      url: e,
                      name: t.name,
                    })
                  : await R.callAsync(chrome.cookies.set, {
                      url: e,
                      name: t.name,
                      value: t.value,
                      domain: t.domain,
                      path: t.path,
                      secure: !0,
                      httpOnly: t.httpOnly,
                      sameSite: "no_restriction",
                      expirationDate: t.expirationDate,
                      storeId: t.storeId,
                    });
              })
            );
          }
        })(),
          chrome.webRequest.onHeadersReceived.addListener(W_, { urls: $_ }, [
            "blocking",
            "responseHeaders",
            "extraHeaders",
          ]);
      },
    };
  const $_ = [
    "http://*.instagram.com/*",
    "https://*.instagram.com/*",
    "https://*.facebook.com/*",
    "http://*.doubleclick.net/*",
  ];
  function W_(e) {
    return (
      e.responseHeaders.forEach((e) => {
        "set-cookie" === e.name &&
          -1 !== e.value.indexOf("Secure") &&
          (-1 !== e.value.indexOf("SameSite=Strict")
            ? (e.value = e.value.replace(/SameSite=Strict/g, "SameSite=None"))
            : -1 !== e.value.indexOf("SameSite=Lax")
            ? (e.value = e.value.replace(/SameSite=Lax/g, "SameSite=None"))
            : (e.value = e.value.replace(
                /; Secure/g,
                "; SameSite=None; Secure"
              )));
      }),
      { responseHeaders: e.responseHeaders }
    );
  }
  var Y_ = { controller: G_ };
  function Q_(e) {
    return e && e.__esModule ? e : { default: e };
  }
  var J_ = {},
    K_ = {
      update: function (e) {
        if (!e.userStates) return e;
        const t = { ...e, tagAssist: { ...e.tagAssist, relevantTags: [] } };
        return delete t.tagAssist.foundTags, t;
      },
    };
  r(J_, "default", function () {
    return K_;
  }),
    n(J_);
  var X_ = {},
    Z_ = {
      update: function (e) {
        return e.userStates && wy.controller.delete("tag-assist.tag-data"), e;
      },
    };
  r(X_, "default", function () {
    return Z_;
  }),
    n(X_);
  var eS = {},
    tS = {
      update: function (e) {
        return e.userStates
          ? {
              ...e,
              tagAssist: {
                ...e.tagAssist,
                ladderConfig: {
                  lastUpdateOn: Date.now(),
                  tiers: { low: 0.7, medium: 1.5, high: 5 },
                },
              },
            }
          : e;
      },
    };
  r(eS, "default", function () {
    return tS;
  }),
    n(eS);
  var nS = {},
    rS = {
      update: function (e) {
        return e.userStates
          ? { ...e, tagAssist: { ...e.tagAssist, ladder: null } }
          : e;
      },
    };
  r(nS, "default", function () {
    return rS;
  }),
    n(nS);
  var oS = {},
    iS = {
      update: function (e) {
        return e.userStates && wy.controller.delete("tag-assist.tag-data"), e;
      },
    };
  r(oS, "default", function () {
    return iS;
  }),
    n(oS);
  var aS = {},
    sS = {
      update: function (e) {
        return e.userStates
          ? { ...e, tagAssist: { ...e.tagAssist, selectedTabId: "search" } }
          : e;
      },
    };
  r(aS, "default", function () {
    return sS;
  }),
    n(aS);
  var lS = {},
    uS = {
      update: function (e) {
        return e.userStates
          ? {
              ...e,
              tagAssist: {
                ...e.tagAssist,
                newCollection: { name: "", text: "", showForm: !1 },
                collections: e.tagAssist.collections.map((e) => ({
                  ...e,
                  editing: !1,
                  editName: "",
                  editText: "",
                })),
              },
            }
          : e;
      },
    };
  r(lS, "default", function () {
    return uS;
  }),
    n(lS);
  var cS = {},
    dS = {
      update: function (e) {
        if (!e.userStates) return e;
        const t = {
          ...e,
          tagAssist: {
            ...e.tagAssist,
            selectedGroupId: "low",
            ladderLoadingTags: [],
            collectionsTagData: {},
            collectionsLoadingTags: [],
          },
        };
        return (
          delete t.tagAssist.relevantTags, delete t.tagAssist.loadingTags, t
        );
      },
    };
  r(cS, "default", function () {
    return dS;
  }),
    n(cS);
  var fS = {},
    pS = {
      update: function (e) {
        return e.userStates
          ? { ...e, tagAssist: { ...e.tagAssist, engagementSort: null } }
          : e;
      },
    };
  r(fS, "default", function () {
    return pS;
  }),
    n(fS);
  var hS = {},
    gS = {
      update: function (e) {
        return e.userStates
          ? {
              ...e,
              tagAssist: { ...e.tagAssist, lastDayUsedOn: null },
              billing: {
                ...e.billing,
                trial: { ...e.billing.trial, tagAssist: 0 },
              },
            }
          : e;
      },
    };
  r(hS, "default", function () {
    return gS;
  }),
    n(hS);
  var mS = {},
    vS = {
      update: function (e) {
        if (!e.userStates) return e;
        const t = e.billing.trial;
        return {
          ...e,
          billing: {
            ...e.billing,
            trial: {
              ...t,
              installedOn: t.installedOn || Date.now(),
              dmAdvanced: t.dmAdvanced || 0,
              schedule: t.schedule || 0,
              insights: t.insights || 0,
              analytics: t.analytics || 0,
              zen: t.zen || 0,
              coverAssist: t.coverAssist || 0,
              tagAssist: t.tagAssist || 0,
              addLinkToStory: t.addLinkToStory || 0,
              postsPublished: t.postsPublished || 0,
              storiesPublished: t.storiesPublished || 0,
              dmsSent: t.dmsSent || 0,
              repost: t.repost || 0,
            },
          },
        };
      },
    };
  r(mS, "default", function () {
    return vS;
  }),
    n(mS);
  var bS = {},
    yS = {
      update: function (e) {
        if (!e.userStates) return e;
        const t = {
          ...e,
          tagAssist: {
            ...e.tagAssist,
            ladderEngagementSort: e.tagAssist.engagementSort,
            summaryEngagementSort: null,
          },
        };
        return delete t.tagAssist.engagementSort, t;
      },
    };
  r(bS, "default", function () {
    return yS;
  }),
    n(bS);
  var wS = {},
    _S = {
      update: function (e) {
        return e.userStates
          ? {
              ...e,
              tagAssist: {
                ...e.tagAssist,
                preselectedTags: [],
                preselectedText: "",
              },
            }
          : e;
      },
    };
  r(wS, "default", function () {
    return _S;
  }),
    n(wS);
  var SS = {},
    xS = {
      update: function (e) {
        return { ...e, reels: { supported: !1 } };
      },
    };
  r(SS, "default", function () {
    return xS;
  }),
    n(SS);
  var PS = {},
    DS = {
      update: function (e) {
        return e.userStates
          ? {
              ...e,
              billing: {
                ...e.billing,
                trial: { ...e.billing.trial, reels: 0 },
              },
            }
          : e;
      },
    };
  r(PS, "default", function () {
    return DS;
  }),
    n(PS);
  var kS = {},
    ES = {
      update: function (e) {
        return { ...e, reels: { ...e.reels, creating: !1 } };
      },
    };
  r(kS, "default", function () {
    return ES;
  }),
    n(kS);
  var TS = {},
    IS = {
      update: function (e) {
        return { ...e, authStatus: { ...e.authStatus, isMobileSession: !1 } };
      },
    };
  r(TS, "default", function () {
    return IS;
  }),
    n(TS);
  var CS = {},
    FS = {
      update: function (e) {
        return e.userStates
          ? { ...e, billing: { ...e.billing, recentFeature: null } }
          : e;
      },
    };
  r(CS, "default", function () {
    return FS;
  }),
    n(CS);
  var AS = {},
    OS = {
      update: function (e) {
        const t = { ...e, schedule: { ...e.schedule, loading: !1 } };
        return delete t.schedule.isRefreshingGrid, t;
      },
    };
  r(AS, "default", function () {
    return OS;
  }),
    n(AS);
  var MS = {},
    RS = {
      update: function (e) {
        const t = {
          ...e,
          schedule: { ...e.schedule, navigation: { ...e.schedule.navigation } },
        };
        return delete t.schedule.navigation.fcsTitle, t;
      },
    };
  r(MS, "default", function () {
    return RS;
  }),
    n(MS);
  var NS = {},
    BS = {
      update: function (e) {
        return {
          ...e,
          schedule: {
            ...e.schedule,
            filters: {
              ...e.schedule.filters,
              mediaTypes: e.schedule.filters.mediaTypes.filter(
                (e) => "igtv" !== e
              ),
            },
          },
        };
      },
    };
  r(NS, "default", function () {
    return BS;
  }),
    n(NS);
  var US = {},
    jS = {
      update: function (e) {
        const t = {
          ...e,
          schedule: {
            ...e.schedule,
            posts: [
              ...e.schedule.localPosts.map((e) => ({
                id: e.id,
                source: "local",
                type: e.type,
                status: "draft",
                image: e.image,
                preview: null,
                imageAvgColor: e.imageAverageColor,
                on: e.on,
                createdOn: Date.now(),
                stats: null,
                crosspostToFb: null,
                draftOrder: e.draftOrder,
              })),
              ...e.schedule.fcsPosts.map((e) => ({
                id: e.id,
                source: "fcs",
                type: e.type,
                status: e.status,
                image: e.image,
                preview: e.preview,
                imageAvgColor: e.imageAverageColor,
                on: e.on,
                stats: e.stats ? { ...e.stats } : null,
                crosspostToFb: e.crosspostToFb,
                draftOrder: e.draftOrder,
              })),
            ],
          },
        };
        return (
          delete t.schedule.igPosts,
          delete t.schedule.fcsPosts,
          delete t.schedule.localPosts,
          t
        );
      },
    };
  r(US, "default", function () {
    return jS;
  }),
    n(US);
  var LS = {},
    qS = {
      update: function (e) {
        const t = { ...e, schedule: { ...e.schedule } };
        if (e.userStates) {
          const n = [e, ...Object.values(e.userStates)];
          t.acknowledged = {
            ...e.acknowledged,
            scheduleDndTip: n.some((e) => e.schedule.isDndTipAcknowledged)
              ? Date.now()
              : -1,
          };
        }
        return delete t.schedule.isDndTipAcknowledged, t;
      },
    };
  r(LS, "default", function () {
    return qS;
  }),
    n(LS);
  var HS = {},
    VS = {
      update: function (e) {
        return e.userStates
          ? {
              ...e,
              installedEventSent: !0,
              tagAssist: { ...e.tagAssist, tagMetricsUpsellDismissed: !1 },
            }
          : e;
      },
    };
  r(HS, "default", function () {
    return VS;
  }),
    n(HS);
  var zS = {},
    GS = {
      update: function (e) {
        if (!e.userStates) return e;
        const t = {
          ...e,
          tagAssist: {
            ...e.tagAssist,
            igSelectedTags: [...e.tagAssist.selectedTags],
            fcsSelectedTags: [],
            sidebarSelectedTags: [...e.tagAssist.preselectedTags],
            sidebarSelectedTagsAsText: [...e.tagAssist.preselectedText],
          },
        };
        return (
          delete t.tagAssist.selectedTags,
          delete t.tagAssist.preselectedTags,
          delete t.tagAssist.preselectedText,
          t
        );
      },
    };
  r(zS, "default", function () {
    return GS;
  }),
    n(zS);
  var $S = {},
    WS = {
      update: function (e) {
        return { ...e, schedule: { ...e.schedule, showTagAssist: !1 } };
      },
    };
  r($S, "default", function () {
    return WS;
  }),
    n($S);
  var YS = {},
    QS = {
      update: function (e) {
        const t = { ...e, reels: { ...e.reels } };
        return delete t.reels.supported, t;
      },
    };
  r(YS, "default", function () {
    return QS;
  }),
    n(YS);
  var JS = {},
    KS = {
      update: function (e) {
        return (
          chrome.alarms.clearAll(),
          {
            ...e,
            analytics: { ...e.analytics, scheduleDay: -1, scheduleHour: 21 },
          }
        );
      },
    };
  r(JS, "default", function () {
    return KS;
  }),
    n(JS);
  var XS = {},
    ZS = {
      update: function (e) {
        let t;
        if (e.userStats) {
          delete {
            ...e,
            billing: { ...e.billing, trial: { ...e.billing.trial } },
          }.billing.trial.zen;
        } else
          (t = { ...e, zen: { ...e.zen } }), delete t.zen.lastTrialUpdateOn;
        return t;
      },
    };
  r(XS, "default", function () {
    return ZS;
  }),
    n(XS);
  var ex = {},
    tx = {
      update: function (e) {
        return e.userStats
          ? { ...e, tagAssist: { ...e.tagAssist, lastTagScanOn: null } }
          : e;
      },
    };
  r(ex, "default", function () {
    return tx;
  }),
    n(ex);
  var nx = {},
    rx = {
      update: function (e) {
        return {
          ...e,
          schedule: {
            ...e.schedule,
            filters: {
              showInfo: e.schedule.filters.showInfo,
              photo: e.schedule.filters.mediaTypes.includes("photo"),
              video: e.schedule.filters.mediaTypes.includes("video"),
              carousel: e.schedule.filters.mediaTypes.includes("carousel"),
              posted: e.schedule.filters.statuses.includes("posted"),
              local: e.schedule.filters.statuses.includes("local"),
              draft: e.schedule.filters.statuses.includes("draft"),
              scheduled: e.schedule.filters.statuses.includes("scheduled"),
            },
          },
        };
      },
    };
  r(nx, "default", function () {
    return rx;
  }),
    n(nx);
  var ox = {},
    ix = {
      update: function (e) {
        const t = {
          ...e,
          schedule: {
            ...e.schedule,
            fileUploadErrors: [...e.schedule.bulkUploadErrors],
          },
        };
        return delete t.schedule.bulkUploadErrors, t;
      },
    };
  r(ox, "default", function () {
    return ix;
  }),
    n(ox);
  var ax = {},
    sx = {
      update: function (e) {
        const t = { ...e, schedule: { ...e.schedule, addCardAttention: !1 } };
        return delete t.schedule.gridAddCardAttention, t;
      },
    };
  r(ax, "default", function () {
    return sx;
  }),
    n(ax);
  var lx = {},
    ux = {
      update: function (e) {
        const t = {
          ...e,
          schedule: {
            ...e.schedule,
            addCard: {
              saved: !1,
              fileCount: 0,
              attention: e.schedule.addCardAttention,
              draggingFiles: !1,
              selectedOption: "multiple",
            },
          },
        };
        return delete t.schedule.addCardAttention, t;
      },
    };
  r(lx, "default", function () {
    return ux;
  }),
    n(lx);
  var cx = {},
    dx = {
      update: function (e) {
        return { ...e, bulk: { saving: !1, selectedPostIds: [], actions: {} } };
      },
    };
  r(cx, "default", function () {
    return dx;
  }),
    n(cx);
  var fx = {},
    px = {
      update: function (e) {
        return { ...e, bulk: { ...e.bulk, activeActionId: null } };
      },
    };
  r(fx, "default", function () {
    return px;
  }),
    n(fx);
  var hx = {},
    gx = {
      update: function (e) {
        return {
          ...e,
          bulk: {
            ...e.bulk,
            dateDialog: {
              selectedTypeId: "interval",
              calendar: {
                periodStart: null,
                selectedDay: null,
                selectedSlotTime: null,
                customTime: null,
                timezone: null,
                isTimeError: !1,
              },
              interval: {
                frequency: "1:1",
                timeListetuser: [{ selectedSlotTime: null, customTime: null }],
              },
              week: {
                selectedDays: [],
                selectedSlotTime: null,
                customTime: null,
              },
            },
          },
        };
      },
    };
  r(hx, "default", function () {
    return gx;
  }),
    n(hx);
  var mx = {},
    vx = {
      update: function (e) {
        const t = {
          ...e,
          bulk: {
            ...e.bulk,
            dateDialog: {
              show: !1,
              ...e.bulk.dateDialog,
              calendar: { ...e.bulk.dateDialog.calendar, errorMessage: null },
            },
          },
        };
        return delete t.bulk.dateDialog.calendar.isTimeError, t;
      },
    };
  r(mx, "default", function () {
    return vx;
  }),
    n(mx);
  var bx = {},
    yx = {
      update: function (e) {
        return {
          ...e,
          bulk: {
            ...e.bulk,
            dateDialog: {
              ...e.bulk.dateDialog,
              week: {
                ...e.bulk.dateDialog.week,
                dayErrorMessage: null,
                timeErrorMessage: null,
              },
              timeSlots: { errorMessage: null },
            },
          },
        };
      },
    };
  r(bx, "default", function () {
    return yx;
  }),
    n(bx);
  var wx = {},
    _x = {
      update: function (e) {
        return { ...e, schedule: { ...e.schedule, isDraggingPost: !1 } };
      },
    };
  r(wx, "default", function () {
    return _x;
  }),
    n(wx);
  var Sx = {},
    xx = {
      update: function (e) {
        return {
          ...e,
          schedule: {
            ...e.schedule,
            addCard: {
              ...e.schedule.addCard,
              savingTitle: null,
              savingText: null,
            },
          },
        };
      },
    };
  r(Sx, "default", function () {
    return xx;
  }),
    n(Sx);
  var Px = {},
    Dx = {
      update: function (e) {
        const t = { ...e, schedule: { ...e.schedule } };
        return (
          delete t.schedule.hasUncommitedChanges, delete t.schedule.tasks, t
        );
      },
    };
  r(Px, "default", function () {
    return Dx;
  }),
    n(Px);
  var kx = {},
    Ex = {
      update: function (e) {
        return {
          ...e,
          schedule: {
            ...e.schedule,
            addCard: { ...e.schedule.addCard, savingPreview: null },
          },
        };
      },
    };
  r(kx, "default", function () {
    return Ex;
  }),
    n(kx);
  var Tx = {},
    Ix = {
      update: function (e) {
        return {
          ...e,
          bulk: {
            ...e.bulk,
            startingDay: {
              selectedTypeId: "today",
              periodStart: null,
              selectedDay: null,
            },
          },
        };
      },
    };
  r(Tx, "default", function () {
    return Ix;
  }),
    n(Tx);
  var Cx = {},
    Fx = {
      update: function (e) {
        const t = { ...e, dm: { ...e.dm } };
        return delete t.dm.supported, t;
      },
    };
  r(Cx, "default", function () {
    return Fx;
  }),
    n(Cx);
  var Ax = {},
    Ox = {
      update: function (e) {
        return { ...e, dm: { ...e.dm, ghostModeEnabled: !0 } };
      },
    };
  r(Ax, "default", function () {
    return Ox;
  }),
    n(Ax);
  var Mx = {},
    Rx = {
      update: function (e) {
        const t = { ...e };
        return (
          delete t.analytics,
          delete t.insights,
          (async function () {
            const e = await wy.controller.getAllKeys();
            for (const t of e)
              (t.startsWith("insights.") || t.startsWith("block:analytics:")) &&
                wy.controller.delete(t);
          })(),
          t
        );
      },
    };
  r(Mx, "default", function () {
    return Rx;
  }),
    n(Mx);
  var Nx = {},
    Bx = {
      update: function (e) {
        return {
          ...e,
          schedule: {
            ...e.schedule,
            fcsSetup: { ...e.schedule.fcsSetup, newApi: !0, flipApiOnFail: !1 },
          },
        };
      },
    };
  r(Nx, "default", function () {
    return Bx;
  }),
    n(Nx);
  var Ux = {},
    jx = {
      update: function (e) {
        const t = {
          ...e,
          schedule: {
            ...e.schedule,
            fcsSetup: { ...e.schedule.fcsSetup, attempted: !1, failed: !1 },
          },
        };
        return delete t.schedule.fcsSetup.flipApiOnFail, t;
      },
    };
  r(Ux, "default", function () {
    return jx;
  }),
    n(Ux);
  var Lx = {},
    qx = {
      update: function (e) {
        return e.userStates
          ? {
              ...e,
              acknowledged: { ...e.acknowledged, discount: -1 },
              billing: {
                ...e.billing,
                discount: { available: !1, showSnackbarMessage: !1 },
              },
            }
          : e;
      },
    };
  r(Lx, "default", function () {
    return qx;
  }),
    n(Lx);
  var Hx = {},
    Vx = {
      update: function (e) {
        const t = {
          ...e,
          schedule: {
            ...e.schedule,
            fcsSetup: {
              ...e.schedule.fcsSetup,
              steps: {
                fbLogin: null,
                igProfessional: null,
                igConnectedToFbPage: null,
              },
            },
          },
        };
        return (
          delete t.schedule.fcsSetup.newApi,
          delete t.schedule.fcsSetup.attempted,
          t
        );
      },
    };
  r(Hx, "default", function () {
    return Vx;
  }),
    n(Hx);
  var zx = {},
    Gx = {
      update: function (e) {
        if (!e.userStates) return e;
        const t = {
          ...e,
          acknowledged: { ...e.acknowledged },
          billing: {
            ...e.billing,
            discount: { ...e.billing.discount, availableTill: -1 },
          },
        };
        return (
          delete t.acknowledged.discount, delete t.billing.discount.available, t
        );
      },
    };
  r(zx, "default", function () {
    return Gx;
  }),
    n(zx);
  var $x = {},
    Wx = {
      update: function (e) {
        if (!e.userStates) return e;
        return { ...e, quickReplies: { shown: !1, content: iw(), total: 7 } };
      },
    };
  r($x, "default", function () {
    return Wx;
  }),
    n($x);
  var Yx = {},
    Qx = {
      update: function (e) {
        return {
          ...e,
          schedule: {
            ...e.schedule,
            filters: { ...e.schedule.filters, showLocalLabel: !0 },
          },
        };
      },
    };
  r(Yx, "default", function () {
    return Qx;
  }),
    n(Yx);
  var Jx = {},
    Kx = {
      update: function (e) {
        const t = { ...e };
        return delete t.igtvUpload, t;
      },
    };
  r(Jx, "default", function () {
    return Kx;
  }),
    n(Jx);
  var Xx = {},
    Zx = {
      update: function (e) {
        return {
          ...e,
          schedule: {
            ...e.schedule,
            fcsSetup: { ...e.schedule.fcsSetup, screen: "welcome" },
          },
        };
      },
    };
  r(Xx, "default", function () {
    return Zx;
  }),
    n(Xx);
  var eP = {},
    tP = {
      update: function (e) {
        return {
          ...e,
          musicAssist: {
            shown: !1,
            videoUrl: null,
            videoVolume: 0,
            musicVolume: 0,
            categoryIdsOrder: [],
            selectedCategoryId: "popular",
            selectedTrackId: null,
            selectedTrackStart: 0,
            customTrack: null,
          },
        };
      },
    };
  r(eP, "default", function () {
    return tP;
  }),
    n(eP);
  var nP = {},
    rP = {
      update: function (e) {
        return {
          ...e,
          musicAssist: { ...e.musicAssist, showUpsellOverlay: !1 },
        };
      },
    };
  r(nP, "default", function () {
    return rP;
  }),
    n(nP);
  var oP = {},
    iP = {
      update: function (e) {
        return e.userStates
          ? {
              ...e,
              billing: {
                ...e.billing,
                trial: { ...e.billing.trial, musicAssist: 0 },
              },
            }
          : e;
      },
    };
  r(oP, "default", function () {
    return iP;
  }),
    n(oP);
  var aP = {},
    sP = {
      update: function (e) {
        return { ...e, musicAssist: { ...e.musicAssist, isStory: !1 } };
      },
    };
  r(aP, "default", function () {
    return sP;
  }),
    n(aP);
  var lP = {},
    uP = {
      update: function (e) {
        if (!e.userStates) return e;
        const t = {
          ...e.billing.trial,
          reels: 0,
          coverAssist: 0,
          musicAssist: 0,
        };
        return (
          Pw.trialController.setTrialCookie(t),
          { ...e, billing: { ...e.billing, trial: t } }
        );
      },
    };
  r(lP, "default", function () {
    return uP;
  }),
    n(lP);
  var cP = {},
    dP = {
      update: function (e) {
        return {
          ...e,
          musicAssist: { ...e.musicAssist, videoVolume: 0, musicVolume: 0.5 },
        };
      },
    };
  r(cP, "default", function () {
    return dP;
  }),
    n(cP);
  var fP = {},
    pP = {
      update: function (e) {
        return { ...e, musicAssist: { ...e.musicAssist, videoCurrentTime: 0 } };
      },
    };
  r(fP, "default", function () {
    return pP;
  }),
    n(fP);
  var hP = {},
    gP = {
      update: function (e) {
        if (!e.userStates) return e;
        const t = {
          ...e.billing.trial,
          reels: Math.max(0, e.billing.trial.reels - 3),
          musicAssist: Math.max(0, e.billing.trial.musicAssist - 3),
        };
        return (
          Pw.trialController.setTrialCookie(t),
          { ...e, billing: { ...e.billing, trial: t } }
        );
      },
    };
  r(hP, "default", function () {
    return gP;
  }),
    n(hP);
  var mP = {},
    vP = {
      update: function (e) {
        if (!e.userStates) return e;
        const t = { ...e.billing.trial, schedule: 0 };
        return (
          Pw.trialController.setTrialCookie(t),
          { ...e, billing: { ...e.billing, trial: t } }
        );
      },
    };
  r(mP, "default", function () {
    return vP;
  }),
    n(mP);
  var bP = {},
    yP = {
      update: function (e) {
        return {
          ...e,
          storyAssist: {
            shown: !1,
            selectedTabId: "mentions",
            mentions: { query: "", foundUsers: [], selectedUsers: [] },
          },
        };
      },
    };
  r(bP, "default", function () {
    return yP;
  }),
    n(bP);
  var wP = {},
    _P = {
      update: function (e) {
        return {
          ...e,
          storyAssist: { ...e.storyAssist, showUpsellOverlay: !1 },
        };
      },
    };
  r(wP, "default", function () {
    return _P;
  }),
    n(wP);
  var SP = {},
    xP = {
      update: function (e) {
        return e.userStates
          ? {
              ...e,
              billing: {
                ...e.billing,
                trial: { ...e.billing.trial, storyAssist: 0 },
              },
            }
          : e;
      },
    };
  r(SP, "default", function () {
    return xP;
  }),
    n(SP);
  var PP = {},
    DP = {
      update: function (e) {
        return {
          ...e,
          storyAssist: { ...e.storyAssist, selectedTabId: "music" },
        };
      },
    };
  r(PP, "default", function () {
    return DP;
  }),
    n(PP);
  var kP = {},
    EP = {
      update: function (e) {
        return { ...e, storyAssist: { ...e.storyAssist, coverUrl: null } };
      },
    };
  r(kP, "default", function () {
    return EP;
  }),
    n(kP);
  var TP = {},
    IP = {
      update: function (e) {
        return { ...e, ghostStoryView: { enabled: !1 } };
      },
    };
  r(TP, "default", function () {
    return IP;
  }),
    n(TP);
  var CP = {},
    FP = {
      update: function (e) {
        return e.userStates
          ? {
              ...e,
              billing: {
                ...e.billing,
                trial: { ...e.billing.trial, ghostStoryView: 0 },
              },
            }
          : e;
      },
    };
  r(CP, "default", function () {
    return FP;
  }),
    n(CP);
  var AP = {},
    OP = {
      update: function (e) {
        return {
          ...e,
          ghostStoryView: {
            ...e.ghostStoryView,
            lastUsedOn: null,
            showUpsellOverlay: !1,
          },
        };
      },
    };
  r(AP, "default", function () {
    return OP;
  }),
    n(AP);
  var MP = {},
    RP = {
      update: function (e) {
        return {
          ...e,
          musicAssist: {
            ...e.musicAssist,
            categoryIdsOrder: [],
            selectedCategoryId: 0,
          },
        };
      },
    };
  r(MP, "default", function () {
    return RP;
  }),
    n(MP);
  var NP = {},
    BP = {
      update: async function (e) {
        if (!e.userStates) return e;
        try {
          const e = await new Promise((e, t) => {
              const n = indexedDB.open("keyval-store", 1);
              (n.onerror = () => t(n.error)), (n.onsuccess = () => e(n.result));
            }),
            t = await new Promise((t, n) => {
              const r = e
                .transaction("keyval", "readonly")
                .objectStore("keyval")
                .get("state");
              (r.onerror = () => n(r.error)), (r.onsuccess = () => t(r.result));
            }),
            n = lw.decompressFromUTF16(t),
            r = btoa(encodeURIComponent(n));
          await wy.controller.set("state", r),
            await new Promise((t, n) => {
              const r = e
                .transaction("keyval", "readwrite")
                .objectStore("keyval")
                .delete("state");
              (r.onerror = () => n(r.error)), (r.onsuccess = () => t());
            }),
            delete localStorage.state;
        } catch (e) {
          console.error("failed to apply version-204", e);
        }
        return e;
      },
    };
  r(NP, "default", function () {
    return BP;
  }),
    n(NP);
  var UP = {},
    jP = {
      update: function (e) {
        const t = { ...e, authStatus: { ...e.authStatus } };
        return delete t.authStatus.isMobileSession, t;
      },
    };
  r(UP, "default", function () {
    return jP;
  }),
    n(UP);
  var LP = {},
    qP = {
      update: function (e) {
        if (!e.userStates) return e;
        const t = { ...e };
        return delete t.desktopPlatform, t;
      },
    };
  r(LP, "default", function () {
    return qP;
  }),
    n(LP);
  var HP = {},
    VP = {
      update: function (e) {
        return e.userStates
          ? { ...e, abTesting: { hash: Math.random(), wideScreenState: null } }
          : e;
      },
    };
  r(HP, "default", function () {
    return VP;
  }),
    n(HP);
  var zP = {},
    GP = {
      update: function (e) {
        return e.userStates
          ? { ...e, abTesting: { ...e.abTesting, wideScreenState: null } }
          : e;
      },
    };
  r(zP, "default", function () {
    return GP;
  }),
    n(zP);
  const $P = {
      "version-130": Q_(J_).default,
      "version-131": Q_(X_).default,
      "version-132": Q_(eS).default,
      "version-133": Q_(nS).default,
      "version-134": Q_(oS).default,
      "version-135": Q_(aS).default,
      "version-136": Q_(lS).default,
      "version-137": Q_(cS).default,
      "version-138": Q_(fS).default,
      "version-139": Q_(hS).default,
      "version-140": Q_(mS).default,
      "version-141": Q_(bS).default,
      "version-142": Q_(wS).default,
      "version-143": Q_(SS).default,
      "version-144": Q_(PS).default,
      "version-145": Q_(kS).default,
      "version-146": Q_(TS).default,
      "version-147": Q_(CS).default,
      "version-148": Q_(AS).default,
      "version-149": Q_(MS).default,
      "version-150": Q_(NS).default,
      "version-151": Q_(US).default,
      "version-152": Q_(LS).default,
      "version-153": Q_(HS).default,
      "version-154": Q_(zS).default,
      "version-155": Q_($S).default,
      "version-156": Q_(YS).default,
      "version-157": Q_(JS).default,
      "version-158": Q_(XS).default,
      "version-159": Q_(ex).default,
      "version-160": Q_(nx).default,
      "version-161": Q_(ox).default,
      "version-162": Q_(ax).default,
      "version-163": Q_(lx).default,
      "version-164": Q_(cx).default,
      "version-165": Q_(fx).default,
      "version-166": Q_(hx).default,
      "version-167": Q_(mx).default,
      "version-168": Q_(bx).default,
      "version-169": Q_(wx).default,
      "version-170": Q_(Sx).default,
      "version-171": Q_(Px).default,
      "version-172": Q_(kx).default,
      "version-173": Q_(Tx).default,
      "version-174": Q_(Cx).default,
      "version-175": Q_(Ax).default,
      "version-176": Q_(Mx).default,
      "version-177": Q_(Nx).default,
      "version-178": Q_(Ux).default,
      "version-179": Q_(Lx).default,
      "version-180": Q_(Hx).default,
      "version-181": Q_(zx).default,
      "version-182": Q_($x).default,
      "version-183": Q_(Yx).default,
      "version-184": Q_(Jx).default,
      "version-185": Q_(Xx).default,
      "version-186": Q_(eP).default,
      "version-187": Q_(nP).default,
      "version-188": Q_(oP).default,
      "version-189": Q_(aP).default,
      "version-190": Q_(lP).default,
      "version-191": Q_(cP).default,
      "version-192": Q_(fP).default,
      "version-193": Q_(hP).default,
      "version-194": Q_(mP).default,
      "version-195": Q_(bP).default,
      "version-196": Q_(wP).default,
      "version-197": Q_(SP).default,
      "version-198": Q_(PP).default,
      "version-199": Q_(kP).default,
      "version-200": Q_(TP).default,
      "version-201": Q_(CP).default,
      "version-202": Q_(AP).default,
      "version-203": Q_(MP).default,
      "version-204": Q_(NP).default,
      "version-205": Q_(UP).default,
      "version-206": Q_(LP).default,
      "version-207": Q_(HP).default,
      "version-208": Q_(zP).default,
    },
    WP = {
      versioners: {},
      init: function () {
        const e = /version-(\d+)/i;
        Object.keys($P)
          .map((t) => {
            const n = parseInt(t.match(e)[1]);
            return { key: t, version: n };
          })
          .sort((e, t) => e.version - t.version)
          .forEach((e) => {
            this.versioners[e.version] = $P[e.key];
          });
      },
      update: async function (e) {
        let t = e,
          n = t.version || 0;
        log(`versioner: model version is ${n}`);
        for (; n < 208; ) {
          log(`versioner: applying versioner ${n + 1}`);
          const e = this.versioners[n + 1];
          (t = await e.update(t)), (t.version = n + 1);
          const r = t.backups || t.userStates;
          for (const t in r) {
            const o = r[t];
            try {
              (r[t] = await e.update(o)), (r[t].version = n + 1);
            } catch (e) {
              delete r[t];
            }
          }
          n++;
        }
        return t;
      },
    };
  WP.init();
  const YP = function (e) {
      const t = Array.isArray(e.whatsNew) ? e.whatsNew : [];
      let n = !1;
      const r = [
        {
          id: "v23.6.0",
          header: "Fixes and Future Plans",
          subheader: "v23.6.0",
          hexImage: "hex-schedule",
        },
        {
          id: "v23.3.0",
          header: "Major Functionality Fixes",
          subheader: "v23.3.0",
          hexImage: "hex-bug",
          content: [
            "Restored all app functions broken due to recent changes introduced by Instagram update to internal data and media handling systems.",
          ],
        },
        {
          id: "v23.1.0",
          header: "Instagram Update Bug Fixes",
          subheader: "v23.1.0",
          hexImage: "hex-bug",
          content: [
            "Fixed a number of bugs introduced by Instagram in the recent mobile and desktop app update: reels failed to be published through instagram.com, posted videos were duplicated under reels tab and showing with a wrong icon, restored search panel functionality of the explore page, and other improvements and fixes.",
          ],
        },
        {
          id: "v23.0.0",
          header: "Ghost View Mode for Stories",
          subheader: "v23.0.0",
          hexImage: "hex-ghost",
          content: [
            "Switch to a Ghost View Mode and watch stories anonymously. Story owner won’t know if you watched their story.",
          ],
        },
        {
          id: "v22.0.0",
          header: "Story Assist",
          subheader: "v22.0.0",
          hexImage: "hex-story",
          content: [
            "Added user tagging feature in stories, fixed avatars rendering Instagram bug, fixed reels API connectivity and other issues.",
          ],
        },
        {
          id: "v21.1.0",
          header: "Improvements and Bug Fixes",
          subheader: "v21.1.0",
          hexImage: "hex-update",
          content: [
            "Fixed custom video covers and music file uploads to fail in certain scenarios. Styling and usability improvements in the app. Fixed tooltips rendering in the IG frame. Fixed app rendering artifacts on slow Internet connection and more.",
          ],
        },
        {
          id: "v21.0.0",
          header: "Posting Functionality Restored",
          subheader: "v21.0.0",
          hexImage: "hex-bug",
          content: [
            "Restored posting functionality and fixed problems caused by the IG platform overhaul.",
            "Improved app stability, dark theme, custom cover feature, videos autoplay on carousels and fixed multiple bugs.",
          ],
        },
        {
          id: "v20.2.0",
          header: "Reels Improvements",
          subheader: "v20.2.0",
          hexImage: "hex-bug",
          content: [
            "Added support for locations and people mentions (tagging) on Reels posting.",
            "Fixed original audio automatically muted by Chrome v100. Fixed followers and followings not showing up correctly in the wide mode. Fixed DM not showing DM folders.",
          ],
        },
        {
          id: "v20.1.0",
          header: "Bug Fixing",
          subheader: "v20.1.0",
          hexImage: "hex-bug",
          content: [
            "Fixed scheduling connection setup, fixed isolation policy error, improved reels posting, post management error handling and usability.",
          ],
        },
        {
          id: "v20.0.0",
          header: "Music",
          subheader: "v20.0.0",
          hexImage: "hex-music",
          content: [
            "Add music or upload your tracks to Reels, Stories and Videos. Royalty-free music is provided by tunetank.com.",
          ],
        },
        {
          id: "v19.0.0",
          header: "Quick Replies in DM",
          subheader: "v19.0.0",
          hexImage: "hex-dm",
          content: [
            "Send Quick Replies in chats by typing / symbol followed by reply shortcut. Configure an unlimited number of replies for business or personal use.",
            "Inssist Quick Replies support template messages and @name, @username variables.",
          ],
        },
        {
          id: "v18.0.9",
          header: "Bug Fixing",
          subheader: "v18.0.9",
          hexImage: "hex-bug",
          content: [
            "Fixed Instagram bug that caused a blank screen to load for some users. Fixed Zen mode, story mentions and other issues.",
          ],
        },
        {
          id: "posting-from-website",
          header: "Posting from website",
          subheader: "v18.0.0",
          hexImage: "hex-igswiss",
        },
        {
          id: "v17.3.0",
          header: "60s Reels",
          subheader: "v17.3.0",
          hexImage: "hex-reels",
          content: [
            "Inssist can now post Reels of up to 60s long, up from 30s before.",
            "CSV import now supports “multiline \\n captions” and break lines with \\n symbols.",
            "This release improves posting stability.",
          ],
        },
        {
          id: "v17.0.0",
          header: "Bulk & CSV Scheduling",
          subheader: "v17.0.0",
          hexImage: "hex-schedule",
          content: [
            "Added “BULK” section to the Scheduling module that supports applying bulk commands: scheduling, drafting, deleting posts.",
            "You can now reschedule posts across time-slots or intervals with a few clicks and edit captions of all scheduled posts from a single screen.",
            "Inssist now knows how to parse CSV files so that you can drag and drop those and schedule posts even faster.",
            "Scheduling interface has been significantly speed up comparing to the previous versions.",
          ],
        },
        {
          id: "macos",
          header: "Experimental MacOS version",
          subheader: "v15.2.3",
          hexImage: "hex-macos",
        },
        {
          id: "v15.1.0",
          header: "Usability & Bug Fixes",
          subheader: "v15.1.0",
          hexImage: "hex-bug",
          content: [
            "Post Assistant now supports custom aspect ratios for images in addition to default square, portrait and landscape ones.",
            "Fix for the Instagram “video failed to post” and other bugs.",
          ],
        },
        {
          id: "v15.0.3",
          header: "Bug Fixing",
          subheader: "v15.0.3",
          hexImage: "hex-bug",
          content: [
            "Fixed missing delete button in Post Assistant. Fixed dark theme Reels UI. Fixed “Post did not upload” video publishing issue.",
          ],
        },
        {
          id: "reels",
          header: "Reels",
          subheader: "v15.0.0",
          hexImage: "hex-reels",
          content: [
            "Inssist can now post Reels! It ensures the best quality and does not compress your videos.",
            "Instagram Reels is a short-video format, similar to TikTok. Instagram platform limits Reels to 50 countries, including the United States.",
            "Posting Reels is a PRO feature, and you can repost Reels from other accounts and apply custom covers with Inssist.",
          ],
        },
        {
          id: "v13.1.0",
          header: "Hashtag Collections",
          subheader: "v13.1.0",
          hexImage: "hex-tag",
          content: [
            "Now you can create and manage your Hashtag collections with Inssist.",
          ],
        },
        {
          id: "v11.5.0",
          header: "Lifetime Deal",
          subheader: "v11.5.0",
          hexImage: "hex-lifetime",
          content: [
            "Claim your Inssist PRO Lifetime Deal!",
            "Now you can get Inssist PRO license for life with a one time purchase, before only a monthly subscription option was available.",
            "For businesses managing many accounts there is a special Infinite plan. Check it out!",
          ],
        },
        {
          id: "v11.2.0",
          header: "Swipe Up",
          subheader: "v11.2.0",
          hexImage: "hex-swipe-up",
          content: [
            "Swipe Up feature (adding links to stories) is now available for accounts of more than 10k followers.",
          ],
        },
        {
          id: "v11.1.0",
          header: "Editing Captions",
          subheader: "v11.1.0",
          hexImage: "hex-caption",
          content: [
            "This version brings support for editing posts. You can now edit posts and update post captions after they are published without a need to connect to Facebook API.",
          ],
        },
        {
          id: "v11.0.0",
          header: "Video Thumbnails / Covers",
          subheader: "v11.0.0",
          hexImage: "hex-video",
          content: [
            "Version 11 brings support for covers to video posting.",
            "Whenever you upload a video to post you can choose a thumbnail from a list of auto-generated covers, a specific video frame or even upload a custom image to be used.",
            "You can also preview your Instagram grid with the selected cover before posting.",
          ],
        },
        {
          id: "v10.1.0",
          header: "Zen Mode",
          subheader: "v10.1.0",
          hexImage: "hex-zen",
          content: [
            "Make your Instagram browsing experience cleaner with the new Zen mode.",
            "Switch Instagram home feed into Zen hides post captions and comments on the posts. Give it a try!",
            "This release also fixes a number of bugs, making posting Stories more stable in particular.",
          ],
        },
        {
          id: "v10.0.1",
          header: "Share Post to Story",
          subheader: "v10.0.1",
          hexImage: "hex-story",
          content: [
            "Version 10 brings support for sharing any post to your story in a few clicks.",
            "Locate a share icon below any post, video or photo, click it and select “Share to Story”. A photo will then be shared to your story.",
            "This feature is free. Enjoy!",
          ],
        },
        {
          id: "v10.0.0",
          header: "Bug Fixing",
          subheader: "v10.0.0",
          hexImage: "hex-bug",
          content: [
            "Fixed comments scrolling caused the app to refresh the page.",
            "Post Assistant now supports uploading and previewing posts in a grid without a Facebook API connection.",
            "Changed the dark theme background not to be so dark. Redesigned side bar and Facebook API connection setup dialogs.",
            "And a host of other improvements and stability enhancements under the hood.",
          ],
        },
        {
          id: "v9.0.0",
          header: "Bulk Scheduling",
          subheader: "v9.0.0",
          hexImage: "hex-ship",
          content: [
            "Inssist Scheduling now supports uploading multiple photos at once to speed up posting.",
            "You can also drag & drop photos and videos from the system to Inssist to schedule or publish them.",
            "Scheduling engine has been significantly improved to support bulk upload and future improvements coming down the line.",
          ],
        },
        {
          id: "v8.9.1",
          header: "Bug Fixing & Usability",
          subheader: "v8.9.1",
          hexImage: "hex-bug",
          content: [
            "Stories uploaded with Inssist are now uploaded in the best quality possible.",
            "Fixed internal bugs and improved DM module stability.",
          ],
        },
        {
          id: "v8.8.5",
          header: "Bug Fixing & Usability",
          subheader: "v8.8.5",
          hexImage: "hex-bug",
          content: [
            "Inssist now prevents Instagram from blurring photos when switching between screen modes.",
            "Inssist now shows @usernames upon hovering over accounts in multiaccount box.",
            "Increased DM text input size, fixed elements positioning on Instagram authorization screen, fixed wordings across the application and other improvements.",
            "Added support for sending debug reports if Inssist fails to connect Scheduling.",
          ],
        },
        {
          id: "v8.6.0",
          header: "Scheduling patch",
          subheader: "v8.6.0",
          hexImage: "hex-bug",
          content: [
            "Fixed a bug preventing scheduling connection setup to reliably connect Instagram account to Scheduling API.",
            "Fixed a cross-posting bug preventing Facebook Page selection from rendering.",
            "Fixed sending post from the home feed to Direct Messages. Other internal fixes.",
          ],
        },
        {
          id: "v8.5.1",
          header: "Story and Scheduling fixes",
          subheader: "v8.5.1",
          hexImage: "hex-bug",
          content: [
            "Improved aspect ratio detection on stories: video stories should upload to Instagram more reliably.",
            "Uploaded stories now have the first frame selected as a cover rather than a random one.",
            "Fixed Infinite Loading loop bug on scheduling.",
          ],
        },
        {
          id: "v8.5.0",
          header: "Story Improvements",
          subheader: "v8.5.0",
          hexImage: "hex-bug",
          content: [
            "Photo Stories are no longer cut in preview when they do not fit the aspect ratios. Inssist now detects and warns about unsupported Video Story lengths: shorter than 1 second and longer than 15 seconds. Other internal improvements.",
          ],
        },
        {
          id: "v8.4.0",
          header: "Story Mentions",
          subheader: "v8.4.0",
          hexImage: "hex-mentions",
          content: [
            "Support for @mentions (account tagging) has arrived for photo stories. This is a free feature available on all plans.",
          ],
        },
        {
          id: "v8.3.0",
          header: "Bug Fixing",
          subheader: "v8.3.0",
          hexImage: "hex-bug",
          content: [
            "Added mouse scroll to stories panel. Added photo upload spinner during posting.",
            "Fixed modal windows positioning bug in Instagram. Fixed tab buttons spacing on Instagram profile page.",
          ],
        },
        {
          id: "v8.2.1",
          header: "Bug Fixing",
          subheader: "v8.2.1",
          hexImage: "hex-bug",
          content: [
            "Fixed excess image rotation on new and scheduled posts.",
            "Fixed a black screen scheduling state bug caused by selecting a Custom Time interval.",
          ],
        },
        {
          id: "v8.2.0",
          header: "Facebook Cross-Posting",
          subheader: "v8.2.0",
          hexImage: "hex-schedule",
          content: [
            "If your Instagram @account is connected to a custom Facebook Page, Inssist will let you clone posts to that Facebook Page during scheduling.",
          ],
        },
        {
          id: "v8.1.0",
          header: "Scheduling Performance",
          subheader: "v8.1.0",
          hexImage: "hex-schedule",
          content: [
            "Over the past few weeks we have redesigned and rebuilt Scheduling engine from ground-up, making it far more stable and performing much better than before. Give it a try!",
            "A few User Interface fixes are delivered with this update.",
          ],
        },
        {
          id: "v8.0.0",
          header: "Multiaccount Support",
          subheader: "v8.0.0",
          hexImage: "hex-multiaccount",
          content: [
            "Got more than one Instagram account? Connect them all to Inssist and seamlessly switch between them without a need to relogin. Handy!",
          ],
        },
        {
          id: "v6.2.0",
          header: "Wide Screen",
          subheader: "v6.2.0",
          hexImage: "hex-monitor",
          content: [
            "Wide screen mode has been redesigned with images taking more space and page layouts improved.",
          ],
        },
        {
          id: "v6.1.0",
          header: "Bug Fixing",
          subheader: "v6.1.0",
          hexImage: "hex-bug",
          content: [
            "Stories can now be scrolled with LEFT / RIGHT keys and exited with ESC key. Fixed polls styling on stories in dark theme.",
            "Fixed videos playing sound for a split second upon navigation within plugin. Fixed an Instagram bug with videos refusing to playing on click.",
            "Fixed Scheduling incorrectly ordering posts upon updating post caption. Improved Scheduling interface buttons styling.",
            "Plugin URL now contains Instagram page URL for quick navigation.",
            "Direct Messages no longer marked as read while DM module is hidden. Fixed DM module buttons overlap. Clicking Back button no longer causes navigation in Direct Messaging module. Videos sent in Direct Messages can now be viewed in a separate tab.",
          ],
        },
        {
          id: "v6.0.1",
          header: "Carousels",
          subheader: "v6.0.1",
          hexImage: "hex-carousel",
          content: [
            "Inssist now supports carousel posts through the Post Assistant. Check it out!",
            "Multiaccount support is coming next!",
          ],
        },
        {
          id: "v6.0.0",
          header: "Scheduling",
          subheader: "v6.0.0",
          hexImage: "hex-schedule",
          content: [
            "Scheduling now supports drag&drop operations both on Grid and Calendar. Scheduling is out of Beta and has been substantially improved, debugged and redesigned.",
          ],
        },
        {
          id: "v5.0.1",
          header: "Bug Fixing",
          subheader: "v5.0.1",
          hexImage: "hex-bug",
          content: [
            "Fixed Instagram bug when adding multiline text on stories caused Instagram UI to break. Captions containing emojis are no longer cut off.",
          ],
        },
        {
          id: "v4.0.5",
          header: "Bug Fixing",
          subheader: "v4.0.5",
          hexImage: "hex-bug",
          content: [
            "A ton of bug fixes and improvements:",
            "You can now send DMs to any account without following them first. Images in DM module are no longer cropped and take all available space.",
            "Added a button to open image in a new tab in DM module. Requests tab in DM no longer overflows the new DM button and DM actions tooltips is no longer cut off. Fixed fonts in DM module.\n",
            "Added “Open in Inssist” button on Instagram website. Added DM US button to reach out to us quickly. Icons in side bar no longer overlap on small screens.",
            "Fixed “show more” button on post captions and other small fixes across UI.",
          ],
        },
        {
          id: "v4.0.0",
          header: "Direct Messages",
          subheader: "v4.0.0",
          hexImage: "hex-dm",
          content: [
            "Psst… Check out the brand new Direct Messages panel on the left. You can now send DMs while having the Instagram view on the right simultaneously. Handy! 💌",
            "The next feature we’re working on is Scheduling drag & drop support.",
          ],
        },
        {
          id: "v3.1.0",
          header: "Bug fixing",
          subheader: "v3.1.0",
          hexImage: "hex-bug",
          content: [
            "Bug fixes and improvements: fixed emojis 🤧 in the dark theme, better scheduling setup logic and setup errors interception, permissions verification screen, scheduling migrated onto optimistic transactions mechanism, image pre-caching and scheduling loading speed-up, fixed IGTV screen and UI cleanup.",
          ],
        },
        {
          id: "v3.0.0",
          header: "Dark Mode",
          subheader: "v3.0.0",
          hexImage: "hex-moon",
          content: [
            "Join the Dark Side! Switch Inssist to Dark mode which is less strenuous on your beautiful 👀 with a click of a button. Instagram web interface has been thoroughly restyled to Dark mode as well.",
          ],
        },
        {
          id: "v2.3.0",
          header: "Calendar and Time Slots",
          subheader: "v2.3.0",
          hexImage: "hex-schedule",
          content: [
            "Configure Time Slots to schedule posts efficiently. Browse posts in a weekly and monthly post calendars. Fixed scheduling setup, auto-logout and freezing bugs.",
          ],
        },
        {
          id: "v2.2.0",
          header: "Scheduling Usability",
          subheader: "v2.2.0",
          hexImage: "hex-schedule",
          content: [
            "Added scheduling time & date selection calendar. Improved Posts Grid performance. Fixed scheduling connection setup problems.",
          ],
        },
        {
          id: "v2.1.0",
          header: "Scheduling Beta",
          subheader: "v2.1.0",
          hexImage: "hex-schedule",
          content: [
            "Scheduling has arrived.",
            "Upload photos, videos, IGTVs and carousel posts. Preview them in a grid, save as draft, publish or schedule for auto-publish.",
            "Scheduled media are published automatically, no need to install extra software, Inssist handles auto-publish for you even if you are offline.",
            "Scheduling is currently available through our Beta program. You can enable Beta features for free by sharing a word about Inssist.",
            "All bug reports and feature requests are welcomed at inssist@slashed.io  🐜🐜🐜",
          ],
        },
        {
          id: "v1.6.0",
          header: "IGTV Support",
          subheader: "v1.6.0",
          hexImage: "hex-igtv",
          content: [
            "Plugin now supports uploading IGTV videos.",
            "To publish IGTV, simply upload a video as you would normally do. If the video is longer than 1 minute, Inssist will present an IGTV video upload interface to you.",
          ],
        },
        {
          id: "v1.3.0",
          header: "Relevant Hashtags",
          subheader: "v1.3.0",
          hexImage: "hex-tag",
          content: ["Inssist now suggests relevant hashtags. Try it out!"],
        },
        {
          id: "v1.2.2",
          header: "Bug fixing",
          subheader: "v1.2.2",
          hexImage: "hex-bug",
          content: [
            "Fixed “Instagram.com refused to connect” issue. If you still experience “Instagram.com refused to connect” error, please try to relogin to Instagram.com from a separate browser tab and reinstall Inssist from get.inssist.com.",
            "Fixed video playback jittering.",
          ],
        },
        {
          id: "v1.2.0",
          header: "Autoplay for Videos",
          subheader: "v1.2.0",
          hexImage: "hex-update",
          content: [
            "Videos on the feed will now autoplay (muted) when scrolled into the view. Clicking videos un-mutes them.",
            "Improved posting screen usability, stability and bundle size.",
          ],
        },
        {
          id: "v1.1.0",
          header: "Usability Improvements",
          subheader: "v1.1.0",
          hexImage: "hex-update",
          content: [
            "Text inside the Instagram view can now be selected and copied to clipboard.",
            "Posting photos and videos now supports locations tagging.",
            "Fixed issue with instagram.com not connecting after navigation to direct messages.",
            "Fixed issue with opening facebook.com links from DM messages caused a browser page error.",
            "Pressing Enter in DM screen now sends the message right away.",
            "Other miscellaneous usability improvements.",
          ],
        },
        {
          id: "v0.9.12",
          header: "Bug fixing & Performance",
          subheader: "v0.9.12",
          hexImage: "hex-bug",
          content: [
            "Extension rebranded to Inssist.",
            "Loading and rendering speed improved. Fixed an issue when replying to comments rendered an unnecessary actions popup.",
          ],
        },
        {
          id: "v0.9.5",
          header: "Improved Image Quality",
          subheader: "v0.9.5",
          hexImage: "hex-quality",
          content: [
            "Landscape and Portrait photos now retain high image quality when uploaded with the plugin.",
          ],
        },
        {
          id: "v0.9.2",
          header: "Video Support",
          subheader: "v0.9.2",
          hexImage: "hex-video",
          content: ["Plugin now supports Video uploads."],
        },
        {
          id: "v0.8.9",
          header: "Stickers and Markers Support",
          subheader: "v0.8.9",
          hexImage: "hex-marker",
          content: ["Stories can now be uploaded with stickers and markers."],
        },
        {
          id: "v0.8.3",
          header: "Improved UI",
          subheader: "v0.8.3",
          hexImage: "hex-bug",
          content: [
            "User profile, stories reel and other parts of user interface and user experience were improved. Fixed stories viewer not showing stories on a first click.",
          ],
        },
        {
          id: "v0.8.0",
          header: "Basic version",
          subheader: "v0.8.0",
          hexImage: "hex-igswiss",
          content: [
            "Plugin now supports photos and stories upload and direct messages.",
          ],
        },
      ].map((e) => {
        let r;
        if (n) r = !0;
        else {
          const o = t.find((t) => t.id === e.id);
          (r = (o && o.acknowledged) || !1), r && (n = !0);
        }
        return { id: e.id, acknowledged: r };
      });
      return { ...e, whatsNew: r };
    },
    { action: QP } = ib;
  var JP = QP("state.setup-default-state", (e) =>
    e.whatsNew
      ? e
      : {
          version: 208,
          authStatus: {
            userId: null,
            username: null,
            fullName: null,
            email: null,
            avatarUrl: null,
            isLoggedIn: !1,
            cookies: { igSessionId: null, fb: [] },
          },
          coverAssist: {
            shown: !1,
            loading: !0,
            videoUrl: null,
            coverUrl: null,
            selectedTabId: "auto",
            showGrid: !1,
            gridImages: [],
            frameGalleryImages: [],
            frameGallerySelectedImage: null,
            frameSelectImage: null,
            frameSelectValue: null,
            frameUploadImage: null,
          },
          musicAssist: {
            shown: !1,
            videoUrl: null,
            videoVolume: 0,
            musicVolume: 0.5,
            videoCurrentTime: 0,
            categoryIdsOrder: [],
            selectedCategoryId: 0,
            selectedTrackId: null,
            selectedTrackStart: 0,
            customTrack: null,
            showUpsellOverlay: !1,
            isStory: !1,
          },
          storyAssist: {
            shown: !1,
            selectedTabId: "music",
            showUpsellOverlay: !1,
            coverUrl: null,
            mentions: { query: "", foundUsers: [], selectedUsers: [] },
          },
          ghostStoryView: {
            enabled: !1,
            lastUsedOn: null,
            showUpsellOverlay: !1,
          },
          dm: { badgeText: "", ghostModeEnabled: !0, ghostModeFailed: !1 },
          reels: { creating: !1 },
          igTask: { actionBlockCode: null, followStatus: {}, likeStatus: {} },
          schedule: {
            posts: [],
            timeSlots: [
              { time: 288e5 },
              { time: 468e5 },
              { time: 576e5 },
              { time: 72e6 },
            ],
            addCard: {
              saved: !1,
              fileCount: 0,
              attention: !1,
              draggingFiles: !1,
              selectedOption: "multiple",
              savingTitle: null,
              savingText: null,
              savingPreview: null,
            },
            loading: !1,
            recentScheduledOn: null,
            lastFcsPostsUpdateOn: null,
            lastIgPostsUpdateOn: null,
            fcsError: null,
            fcsFailed: !1,
            isErrorShown: !1,
            isUpsellShown: !1,
            isDraggingPost: !1,
            showTagAssist: !1,
            addingFiles: !1,
            fileUploadErrors: [],
            fallback: {
              isEnabled: !1,
              isFailedToReconnect: !1,
              isRetryingFbConnection: !1,
              hideSwitchToFallbackButton: !1,
            },
            navigation: {
              isOpen: !1,
              selectedTabId: null,
              isFcsLoading: !1,
              withBackToCalendarButton: !1,
            },
            filters: {
              showInfo: !0,
              showLocalLabel: !0,
              photo: !0,
              video: !0,
              carousel: !0,
              posted: !0,
              local: !0,
              draft: !0,
              scheduled: !0,
            },
            fcsSetup: {
              screen: "welcome",
              checking: !1,
              connected: !1,
              connecting: !1,
              showPanel: !1,
              errorCode: null,
              steps: {
                fbLogin: null,
                igProfessional: null,
                igConnectedToFbPage: null,
              },
              failed: !1,
            },
            dateDialog: {
              isOpen: !1,
              selectedOption: "publish-now",
              periodStart: null,
              selectedDay: null,
              selectedSlotTime: null,
              customTime: null,
              timezone: null,
              isTimeError: !1,
            },
            calendar: {
              periodType: "month",
              periodStart: null,
              showTimeSlots: !0,
            },
          },
          bulk: {
            saving: !1,
            selectedPostIds: [],
            activeActionId: null,
            actions: {},
            dateDialog: {
              show: !1,
              selectedTypeId: "interval",
              startingDay: {
                selectedTypeId: "today",
                periodStart: null,
                selectedDay: null,
              },
              calendar: {
                periodStart: null,
                selectedDay: null,
                selectedSlotTime: null,
                customTime: null,
                errorMessage: null,
              },
              interval: { frequency: "1:1", timeList: [] },
              week: {
                selectedDays: [],
                selectedSlotTime: null,
                customTime: null,
                dayErrorMessage: null,
                timeErrorMessage: null,
              },
              timeSlots: { errorMessage: null },
            },
          },
          ...aw(),
        }
  );
  const { model: KP } = ib;
  var XP = {
    controller: {
      init: async function () {
        JP.dispatch(), await this._update();
      },
      _update: async function () {
        let e = KP.state;
        (e = await WP.update(e)), (e = YP(e)), e !== KP.state && ew.dispatch(e);
      },
    },
  };
  const { model: ZP } = ib;
  var eD = {
    controller: {
      status: null,
      init: function () {
        this._subscribeToInflux();
      },
      _subscribeToInflux: function () {
        ZP.observe(
          (e) =>
            e.whatsNew.some((e) => !e.acknowledged) ? "updated" : "normal",
          (e) => {
            this._updateBadge(e);
          }
        );
      },
      _updateBadge: function (e) {
        if (this.status === e) return;
        (chrome.browserAction || chrome.action).setIcon({
          path: { 48: `/img/icon-badge-48-${e}.png` },
        });
      },
    },
  };
  var tD = {
    controller: {
      init: function () {
        chrome.runtime.setUninstallURL("https://github.com/YezerSTN/INSSIST/");
      },
    },
  };
  const { model: nD } = ib;
  var rD = {
    controller: {
      init: function () {
        (this._goOnline = this._goOnline.bind(this)),
          (this._goOffline = this._goOffline.bind(this)),
          (this._recoverIfOffline = this._recoverIfOffline.bind(this)),
          this._updateUserWhenOnlineStatusChanges(),
          setInterval(this._recoverIfOffline, 3e5);
      },
      _goOnline: function () {
        log("[$chromeStarter] going online"),
          null === nD.state.authStatus.userId && s_.controller.updateUser();
      },
      _goOffline: function () {
        log("[$chromeStarter] going offline"),
          null !== nD.state.authStatus.userId && s_.controller.updateUser();
      },
      _recoverIfOffline: function () {
        null === nD.state.authStatus.userId &&
          (log("[$chromeStarter] trying to recover from offline"),
          s_.controller.updateUser());
      },
      _updateUserWhenOnlineStatusChanges: function () {
        if (3 === u.manifestVersion) {
          if (!navigator.connection) return;
          let e = navigator.onLine;
          navigator.connection.addEventListener("change", () => {
            navigator.onLine !== e &&
              ((e = navigator.onLine),
              e ? this._goOnline() : this._goOffline());
          });
        } else
          globalThis.addEventListener("online", () => this._goOnline()),
            globalThis.addEventListener("offline", () => this._goOffline());
      },
    },
  };
  class oD {
    constructor(e) {
      (this.defaultDelay = e),
        (this.queue = Promise.resolve()),
        (this.totalTasks = 0),
        (this.cleanupIndex = -1);
    }
    async addTask(e, t) {
      const n = this.totalTasks++;
      return new Promise((r, o) => {
        (this.queue = this.queue.then(async () => {
          if (n <= this.cleanupIndex) t ? r(await t()) : r();
          else
            try {
              r(await e());
            } catch (e) {
              o(e);
            }
        })),
          this.defaultDelay && this.addDelay(this.defaultDelay);
      });
    }
    async addDelay(e) {
      const t = this.totalTasks++;
      return new Promise((n) => {
        this.queue = this.queue.then(async () => {
          t <= this.cleanupIndex || (await T(e)), n();
        });
      });
    }
    enqueueTask(e, t) {
      const n = this.totalTasks++;
      return (
        (this.queue = this.queue.then(async () => {
          if (n <= this.cleanupIndex) t && (await t());
          else
            try {
              await e();
            } catch (e) {}
        })),
        this.defaultDelay && this.enqueueDelay(this.defaultDelay),
        this
      );
    }
    enqueueDelay(e) {
      const t = this.totalTasks++;
      return (
        (this.queue = this.queue.then(async () => {
          t <= this.cleanupIndex || (await T(e));
        })),
        this
      );
    }
    cleanup() {
      this.cleanupIndex = this.totalTasks - 1;
    }
  }
  const iD = new oD(pb),
    { model: aD } = ib;
  var sD = {
    controller: {
      init: async function () {
        log("ig-task: initialisation succeeded"),
          aD.observe(
            () => sw.proxy.userId(),
            () => iD.cleanup(),
            !1
          );
      },
    },
    peersQueue: new oD(hb),
    actionsQueue: iD,
  };
  var lD = {
    controller: {
      init: function () {
        R.watchForIgCookie("open-in-inssist", async (e) => {
          const t = e.value;
          t.startsWith("/direct/") && "/direct/" !== t
            ? ib.transaction((e) => {
                (e.sidebar.isOpen = !0), (e.sidebar.selectedTabId = "tab-dm");
              })
            : ib.transaction((e) => {
                e.sidebar.isOpen = !1;
              }),
            chrome.tabs.create({
              url: `chrome-extension://${chrome.runtime.id}/inssist.html#instagram.com${t}`,
              active: !0,
            });
        });
      },
    },
  };
  let uD;
  var cD = {
      controller: {
        getVersion: function () {
          if (void 0 === uD) {
            const e = /Chrome\/([0-9.]+)/.exec(
              globalThis.navigator.userAgent
            )[1];
            uD = e ? Number(e.split(".")[0]) : -1;
          }
          return uD;
        },
      },
    },
    dD = {
      reset: function () {
        fD(), q.send("reset.reset");
      },
      onReset: function (e) {
        fD(e), q.on("reset.reset", e);
      },
    };
  const fD = Bw();
  var pD = { controller: dD },
    hD = {
      version: 128,
      dmSelectors: {
        general: {
          reactRoot: ["#react-root", '[id^="mount"]'],
          page: [
            ".t30g8",
            ".PolarisDirectShell._a9-0",
            "section.PolarisBaseShell > ._a9-0",
          ],
          header: ["._lz6s", ".PolarisDesktopNav._acum"],
          dmTopButton: [".XrOey:nth-child(2)", "._acut:nth-child(2)"],
          iconButton: [".wpO6b", "._abl-"],
          blueButton: [
            ".y3zKF:not(.yWX7d)",
            ".PolarisIGCoreButton:not(._acao)",
          ],
          postActionsTooltip: [".eeDIk", "._a3gq ._acqw"],
          postActionsTooltipMe: [".AeyYE", "._a3gq ._acqx"],
          postActionsTooltipPeer: [".DgKgc", "._a3gq ._acqy"],
          postActionsTooltipTail: ["._18Jen", "._a3gq ._abwl"],
          errorReportPixel: 'body > img[src*="Error"]',
          mediaViewerContainer: [
            '.RnEpo [role="dialog"] [style*="max-width"][style*="max-height"] > div',
            '.BaseDialog [role="dialog"] [style*="max-width"][style*="max-height"] > div',
          ],
          mediaViewerImage: [
            '.RnEpo [role="dialog"] [style*="max-width"][style*="max-height"] img',
            '.BaseDialog [role="dialog"] [style*="max-width"][style*="max-height"] img',
          ],
          mediaViewerVideo: [
            '.RnEpo [role="dialog"] [style*="max-width"][style*="max-height"] video',
            '.BaseDialog [role="dialog"] [style*="max-width"][style*="max-height"] video',
          ],
          writeBar: [".HcJZg .X3a-9", ".PolarisDirectComposer._acrb"],
          addMediaButton: [
            ".X3a-9 div + .wpO6b",
            ".PolarisDirectComposer > button:nth-of-type(1)",
          ],
          textarea: [".X3a-9 textarea", ".PolarisDirectComposer textarea"],
          messageBody: [".hjZTB", ".PolarisIGCoreText._aadf"],
          emojiPicker: ["._01UL2", ".PolarisIGCorePopover._aa61"],
          postPreview: [".z82Jr", ".PolarisDirectMessageMediaShare._acfr"],
          postViewerModal: ["._Yhr4"],
          portal: ".BasePortal",
          threadHeader: [
            ".PolarisDirectThreadViewHeader > .PolarisGenericDesktopHeader",
          ],
          threadDetailsHeader: [
            ".PolarisDirectThreadView > .PolarisGenericDesktopHeader",
          ],
          threadDetailsMuteSection: [
            ".PolarisDirectThreadDetailsView > div:first-child",
          ],
          content: ["section.PolarisRefreshedBaseShell"],
          navigation: [".createKeyCommandWrapper > .PolarisNavigation"],
        },
        leftPanel: {
          header: [
            ".oNO81 .S-mcP",
            ".PolarisDesktopDirectPage._aa5c .PolarisGenericDesktopHeader._aa4j",
          ],
          subheaderWhenNoFolders: [
            ".oNO81 .iHqQ7",
            ".PolarisDesktopDirectPage._aa5c ._abbz",
          ],
          switchAccountButton: [
            ".oNO81 .S-mcP .m7ETg button",
            ".PolarisDesktopDirectPage._aa5c .PolarisIGCoreBox > button",
          ],
          newMessageButton: [
            ".oNO81 .S-mcP .EQ1Mr button",
            ".PolarisDesktopDirectPage._aa5c button._abm2",
          ],
          tabsContainer: [
            ".emXTk > div:first-child",
            ".PolarisDesktopDirectPage > div.PolarisDirectInboxTabbedHeader > div:first-child",
          ],
          folderTab: [".k8Vux", "nav.PolarisDirectInboxTabbedHeader > div"],
          folderTabGeneral: [
            ".k8Vux:nth-child(2)",
            "nav.PolarisDirectInboxTabbedHeader > div:nth-child(2)",
          ],
          folderTabsContainer: [
            '.emXTk [style*="60%"]',
            '.PolarisDirectInboxTabbedHeader [style*="60%"]',
          ],
          requestsDescription: [
            ".tHaIX",
            ".PolarisDirectPendingRequests > div:first-child",
          ],
          requestsTab: [
            ".jCRms",
            '.PolarisDirectInboxTabbedHeader [style*="40%"] > span',
          ],
          requestsTabText: ["h5.gtFbE", ".PolarisDirectInboxTabbedHeader h5"],
          requestsTabContainer: [
            '.emXTk [style*="40%"]',
            '.PolarisDirectInboxTabbedHeader [style*="40%"]',
          ],
          conversationItemWrap: [
            ".DPiy6._4EzTm",
            ".L-sTb:not(.HcJZg)",
            ".PolarisDirectInboxList > div > .PolarisIGCoreBox._ab99",
          ],
          conversationItemWrapActive: [
            ".QOqBd",
            ".PolarisDirectInboxList > div > .PolarisIGCoreBox._ab99._ab8o",
          ],
          conversationItemWrapSkeleton: [
            ".PolarisDirectInboxList > div > .PolarisIGCoreBox._ab9k",
          ],
          conversationItem: [
            ".-qQT3",
            ".rOtsg",
            ".PolarisDirectInboxList > div > .PolarisIGCoreBox._ab99 > *:first-child",
          ],
          conversationItemActive: [
            ".QOqBd .-qQT3",
            ".QOqBd .rOtsg",
            ".PolarisDirectInboxList > div > .PolarisIGCoreBox._ab99._ab8o > *:first-child",
          ],
          conversationUnreadDot: [".Sapc9", '._ab8n[style*="height: 8px"]'],
          threadListWrap: [
            ".N9abW",
            ".PolarisIGVirtualList.PolarisDirectInboxList",
          ],
          threadList: [
            ".N9abW > div",
            ".PolarisIGVirtualList.PolarisDirectInboxList > div",
          ],
          threadListSpinner: [
            ".N9abW .HVWg4",
            ".PolarisIGVirtualList.PolarisDirectInboxList > div > ._ab9h",
          ],
        },
        dialog: {
          root: [
            ".RnEpo",
            '.BasePortal[style]:not([style*="display: none"]) .createKeyCommandWrapper > .BaseDialog',
          ],
          background: ".BaseCometModal > .BaseCometModal",
          window: [
            '.RnEpo [role="dialog"]',
            '.createKeyCommandWrapper > .BaseDialog .IGDSDialog[role="dialog"]',
          ],
          header: [
            ".CpMFL .S-mcP",
            ".PolarisDirectThreadViewHeader > .PolarisGenericDesktopHeader",
          ],
          searchRow: [
            '.RnEpo [role="dialog"] .TGYkm',
            ".PolarisDirectSearchUserContainer._aag-",
          ],
          searchRowLabel: [
            '.RnEpo [role="dialog"] .TGYkm .BI4qX',
            ".PolarisDirectSearchUserContainerTokenField > .PolarisIGCoreBox",
          ],
          submitButton: [
            ".RnEpo button.cB_4K",
            ".PolarisIGCoreModalHeader .PolarisIGCoreButton",
          ],
          mediaViewerCloseButton: [".RnEpo ._5AwC2", ".IGDSDialog .ped7jm3c"],
        },
      },
      igSelectors: {
        general: {
          reactRoot: ["#react-root", '[id^="mount"]'],
          root: [
            "#react-root > section",
            "#react-root > div > div > section",
            "section.PolarisBaseShell",
            "section.PolarisRefreshedBaseShell",
          ],
          rootNewNavDesign: ["section.PolarisRefreshedBaseShell"],
          content: [
            "#react-root > section > *:nth-child(2)",
            "main.PolarisShellContent",
            "main.PolarisRefreshedShellContent",
          ],
          contentSection: [
            "main.PolarisShellContent > section",
            "main.PolarisRefreshedShellContent > section",
          ],
          header: ["._9ezyW", "header.PolarisGenericMobileHeader"],
          headerContent: [".b5itu", "header.PolarisGenericMobileHeader ._ab16"],
          headerTitle: [".K3Sf1", "h1.PolarisGenericMobileHeader"],
          footer: [".PolarisShellFooter"],
          main: [
            ".uzKWK",
            ".PolarisBaseShell main.PolarisShellContent._a996",
            ".PolarisRefreshedBaseShell main",
          ],
          pageLayoutNewNavDesign: [".PolarisPageLayoutHandler"],
          nextPageLoaderProfile: ["._4emnV", ".PolarisVirtualPostsGrid._aanh"],
          nextPageLoaderExplore: [
            'html[data-page="exploreLandingPage"] .Id0Rh',
            'html[data-page="exploreLandingPage"] .PolarisGenericVirtualFeed._aalg',
          ],
          nextPageLoaderFeed: [
            'html[data-page="feedPage"] .Id0Rh',
            'html[data-page="feedPage"] .PolarisGenericVirtualFeed._aalg',
          ],
          creationPopup: [
            ".PolarisMobileCreationNavItem ._aa5x",
            ".PolarisMobileCreationNavItem ._ad8j",
            ".PolarisMobileCreationNavItem ._aa5-",
          ],
          creationPopupPostButton: [
            '.PolarisMobileCreationNavItem ._aa5x [role="button"]:first-child',
            '.PolarisMobileCreationNavItem ._ad8j [role="button"]:first-child',
            '.PolarisMobileCreationNavItem ._aa5- [role="button"]:first-child',
          ],
          creationPopupStoryButton: [
            '.PolarisMobileCreationNavItem ._aa5x [role="button"]:last-child',
            '.PolarisMobileCreationNavItem ._ad8j [role="button"]:last-child',
            '.PolarisMobileCreationNavItem ._aa5- [role="button"]:last-child',
          ],
          tabBar: [
            ".KGiwt",
            ".PolarisNavigation > ._abpb",
            '.PolarisNavigation[style*="transform"]',
          ],
          tabBarWrap: [
            ".ZoygQ",
            ".PolarisNavigation",
            ".IGDSBox > .PolarisNavigation",
          ],
          tabBarContainer: [".IGDSBox > .PolarisNavigation > div"],
          tabBarTopContainer: [".IGDSBox > .IGDSBox"],
          tabBarInput: [
            ".ZoygQ input",
            ".PolarisNavigation input.PolarisImageFileForm",
          ],
          tabBarCreatePostInput: [
            ".PolarisMobileCreationNavItem > form:last-child > input",
          ],
          tabBarButton: ['.PolarisNavigation[style*="transform"] > div'],
          tabBarCreatePostButton: [
            "._0TPg",
            ".BvyAW > div:nth-child(3)",
            '[data-testid="new-post-button"]',
            ".PolarisMobileNavLoggedIn._abp8",
            ".PolarisMobileNavLoggedIn > div:nth-child(3)",
            '.PolarisNavigation[style*="transform"] > div:nth-child(3)',
          ],
          tabBarCreatePostButtonLink: [
            '[data-testid="new-post-button"] a',
            ".PolarisMobileNavLoggedIn._abp8 a",
            ".PolarisMobileNavLoggedIn > div:nth-child(3) a",
            '.PolarisNavigation[style*="transform"] > div:nth-child(3) a',
          ],
          tabBarCreatePostIconOldNavDesign: [".PolarisMobileNavLoggedIn > svg"],
          tabBarAvatarContainer: [
            ".PolarisMobileNavLoggedInButton span.PolarisUserAvatar",
          ],
          storyTrayViewerAvatarContainer: [
            ".PolarisStoryTray .PolarisStoryTray._aauk:first-child span.PolarisUserAvatar",
          ],
          tabBarLink: [
            ".PolarisMobileNavLoggedIn a",
            '.PolarisNavigation[style*="transform"] a',
          ],
          storyFooter: [
            ".mLi3m",
            "footer.PolarisMobileStoriesFooter",
            "footer.PolarisMobileOwnerStoriesOverlay",
          ],
          storyQuickReactionsBackground: ".x4U7z",
          storyPreviewContainer: [
            ".zGtbP",
            ".PolarisShellContent ._aac4",
            ".PolarisRefreshedShellContent ._aac4",
          ],
          settingsRectangle: ".BvMHM",
          recommendationsContainer: [
            ".bq3Mi",
            ".tHaIX",
            ".PolarisSuggestedUserFeedUnit",
          ],
          modal: [".RnEpo", '.PolarisIGCoreModalBackdrop[role="presentation"]'],
          modalWindow: [
            '.RnEpo [role="dialog"]',
            '.PolarisIGCoreModalBackdrop[role="presentation"] [role="dialog"]',
          ],
          modalWindowHashtagContent: ['.RnEpo [role="dialog"] ._8zyFd'],
          bottomNotification: ".Z2m7o",
          createStoryHeaderButton: [
            ".mTGkH",
            ".PLytv",
            "button.PolarisFeedPageMobileHeader",
          ],
          peersPage: '[data-page="followList"]',
          peersPageHeader: [
            '[data-page="followList"] .b5itu',
            '[data-page="followList"] .PolarisGenericMobileHeader > ._ab16',
          ],
          peersModalHeader: ".HYpXt .eiUFA",
          storiesBar: [".qf6s4", ".PolarisIGVirtualList.PolarisStoryTray"],
          storiesBarLoadingPanel: [
            ".PolarisFeedLoadingSpinner._ab6o",
            ".PolarisFeedPage ._ab6o",
          ],
          blueLinkButton: ".UP43G",
          actionSheet: [".xkuux", ".PolarisIGCoreModalBackdrop > ._ac7o"],
          useAppGradientBar: [".xZ2Xk", ".PolarisMobileNav + section._aa9n"],
          actionDialog: [".mt3GC", ".IGCoreDialog._a9-z"],
          actionDialogItem: [".mt3GC .aOOlW", ".IGCoreDialog._a9--"],
          actionDialogWithoutHeader: [
            ".mt3GC:first-child",
            ".IGCoreDialog._a9-z:first-child",
          ],
          iconButton: [".wpO6b", "._abl-"],
          planeIcon: '[points*="11.698 20.334 22 3.001"]',
          post: "article[data-post-id]",
          postThreeDotsButton: [
            ".MEAGs button",
            ".PolarisPostOptionsButtonPicker button",
          ],
          postVideoContainer: ["._5wCQW", ".PolarisDeclarativeVideo._ab1c"],
          publishingBarText: [".o5gub span", ".PolarisUploadProgressBar._aaug"],
          uploadPanel: [".TExId", ".PolarisUploadProgressBar._aauh"],
          uploadPanelText: [".PolarisUploadProgressBar._aaug"],
          uploadPanelVideoIcon: ".TExId .cRc_w",
          expandVideoButton: "._7zNgw",
          continueWatchingOverlay: ".oNYBg",
          cookieModalContent: ".RnEpo ._74vy-",
          carouselNavButton: ".PolarisSidecar .PolarisHSnapScroll > button",
          blueButton: "button._acas:not(._acao)",
          toastMessage: [".PolarisToastWrapper._a999"],
          postCaption: [
            ".PolarisPostPreviewCommentsPicker ._ab9o > span:last-child > span:first-child",
          ],
          postCaptionLink: [
            ".PolarisPostPreviewCommentsPicker ._ab9o > span:last-child > span:first-child a",
          ],
          exceptionDialogOkButton: [
            '.CometExceptionDialog .PressableText[role="button"]',
          ],
          errorPageContent: ["._a3gq ._ab8q"],
          dialogRoot: [".BasePortal > .BaseView"],
          postPhotoOverlay: [".PolarisPhoto._aagw"],
          tryMbsSection: [".PolarisQPBloksRenderer._a9_9"],
        },
        dragPanel: {
          root: [".RnEpo.xpORG._9Mt7n", ".PolarisIGCoreModalBackdrop > ._ac7o"],
          handle: [".BHY8D", ".PolarisIGCoreSheet._ac7m"],
          igIcon: ".glyphsSpriteApp_Icon_36.u-__7",
          sendEmailLink: [
            '.-qQT3[href^="mailto:"]',
            '._abm4[href^="mailto:"]',
            '._abm4 [href^="mailto:"]',
          ],
          shareMenuItem: [
            ".RnEpo.xpORG._9Mt7n .-qQT3",
            ".PolarisIGCoreModalBackdrop > ._ac7o ._abm4",
          ],
        },
        authScreen: {
          loginContainer: ".rxwpz",
          loginContainerParagraph: ".rxwpz p",
          loginFormParagraph: ".HmktE p",
          avatar: ".rxwpz img",
          username: [
            'html[data-page="unifiedHome"] .l9hKg',
            'html[data-page="loginPage"] .l9hKg',
          ],
          footer: [
            'html[data-page="unifiedHome"] footer',
            'html[data-page="loginPage"] footer',
          ],
          fromFacebookBar: [
            'html[data-page="unifiedHome"] .O1flK',
            'html[data-page="loginPage"] .O1flK',
          ],
        },
        storyViewer: {
          root: [
            ".PolarisMobileOwnerStories.PolarisStoriesReel",
            ".PolarisMobileStoriesPage > .PolarisMobileStories",
          ],
          avatar: [
            ".PolarisMobileOwnerStories img.PolarisUserAvatar",
            ".PolarisMobileOwnerStoriesOverlay img.PolarisUserAvatar",
          ],
          time: ["time.PwV9z", "time.PolarisStoriesHeaderOwner"],
          pollContainer: ".tj63N",
          pollButtons: ".tj63N",
          pollAnswerDigitOrEmoji: ".KUQv0",
          closeButton: [
            ".kj03O .afkep",
            ".PolarisMobileOwnerStoriesOverlay button:last-child",
          ],
          prevButton: [
            ".r2nYK",
            ".PolarisMobileStoryEventZone > button:nth-child(2)",
          ],
          nextButton: [
            "._4sLyX",
            ".PolarisMobileStoryEventZone > button:nth-child(3)",
          ],
          videoPoster: "img.PolarisStoryVideo",
          mediaContainer: ".PolarisStoryMediaLayout._aa64",
          image: ".PolarisStoryImage img.PolarisStoryImage",
          video: ["video.PolarisStoryVideo", ".PolarisMobileStoryViewer video"],
          viewAsAvatar: [".PolarisStoryMediaLayout img.PolarisUserAvatar"],
        },
        storyCreation: {
          root: ["._650Zr", ".PolarisStoryCreationPage"],
          canvas: [".PolarisStoryCreationPage canvas"],
          headerButton: [
            '[data-page="StoryCreationPage"] header button',
            ".PolarisStoryCreationPage header button",
          ],
          textInput: [
            "[contenteditable]",
            ".PolarisStoryCreationTextInput[contenteditable]",
          ],
          topRightButtonsContainer: [
            ".o4NXM",
            ".PolarisStoryCreationPage header > div.PolarisStoryImageCreationContainer",
          ],
          topRightButton: [
            ".o4NXM button",
            ".PolarisStoryCreationPage header > div button",
          ],
          downloadButton: [
            '[class*="storiesSpriteDownload"]',
            ".PolarisStoryCreationPage header > div button:nth-child(1)",
          ],
          mentionBarContainer: [
            ".uPlSl",
            ".PolarisTypeahead.PolarisStoryCreationTextInput",
          ],
          mentionBar: [
            ".imGmP",
            ".PolarisTypeahead.PolarisStoryCreationTextInput > div",
          ],
          mentionReel: [
            ".imGmP > div",
            ".PolarisTypeahead.PolarisStoryCreationTextInput > div > div",
          ],
          mentionReelRow: [
            ".imGmP > div > div",
            ".PolarisTypeahead.PolarisStoryCreationTextInput > div > div > div",
          ],
          mentionReelItem: [
            "#touch_mention.qOsKV",
            "#touch_mention.PolarisStoryTypeaheadResultsList._acn7",
          ],
          mentionReelItemName: [
            "#touch_mention.qOsKV .KMpYj",
            "#touch_mention.PolarisStoryTypeaheadResultsList ._acn9",
          ],
          mentionReelItemAvatar: [
            "#touch_mention.PolarisStoryTypeaheadResultsList img.PolarisStoryTypeaheadResultsList",
          ],
          videoHeader: ["._9o3e0", "header.PolarisStoryVideoCreationContainer"],
          videoWrap: [
            "header.PolarisStoryVideoCreationContainer + .PolarisStoryVideoCreationContainer",
          ],
          video: [".JHXak", "video.PolarisStoryVideoCreationContainer"],
          videoPoster: [
            ".pSeby",
            "video.PolarisStoryVideoCreationContainer + img",
          ],
          footer: [".GRPvx ~ footer", "footer.PolarisStoryCreationShareFooter"],
          videoPlayButton: [
            ".JHXak ~ .videoSpritePlayButton",
            "div.PolarisStoryVideoCreationContainer > span",
          ],
          videoCreationExitButton: [
            "header.PolarisStoryVideoCreationContainer > button.PolarisIGCoreIconButton",
          ],
          submitButton: [".PolarisStoryCreationShareFooter > button"],
          uploadHeader: [
            ".PolarisStoryCreationPage .PolarisSharingProgressModal header",
          ],
          uploadBar: [
            ".PolarisStoryCreationPage .PolarisSharingProgressModal header > div",
          ],
          uploadText: [
            ".PolarisStoryCreationPage .PolarisSharingProgressModal header h1",
          ],
          textColorPicker: [
            ".PolarisStoryCreationColorPicker.PolarisStoryCreationTextInput",
          ],
          drawColorPicker: [
            ".PolarisStoryCreationDrawColorPicker.PolarisStoryCreationDrawing",
          ],
          colorPickerSelectedCircle: [
            "button.PolarisStoryCreationColorPicker > ._aa87",
            "button.PolarisStoryCreationDrawColorPicker > ._aa82",
          ],
        },
        explorePage: {
          nav: [
            'html[data-page="exploreLandingPage"] nav.PolarisShellMobileHeader',
          ],
          header: "header.PolarisExploreMobileHeader",
          searchInputPlaceholder: [
            ".PolarisDynamicExplorePageContentWrapper input.PolarisIGCoreSearchInput::placeholder",
          ],
          searchContainer: [
            ".PolarisDynamicExplorePageContentWrapper > .PolarisIGCoreBox",
          ],
          search: [
            ".PolarisDynamicExplorePageContentWrapper > .PolarisIGCoreBox > .PolarisIGCoreBox:first-child",
          ],
          main: ["main > .PolarisDynamicExplorePageContentWrapper"],
          content: [
            ".mJ2Qv",
            ".PolarisDynamicExplorePageSharedContent",
            ".PolarisDynamicExplorePageContentWrapper",
          ],
          contentInner: [
            ".K6yM_",
            ".PolarisDynamicExplorePageSharedContent > *",
            ".PolarisDynamicExplorePageContentWrapper > *",
          ],
          post: [".pKKVh", ".PolarisDynamicExploreSectionalItem"],
          searchResults: [
            ".gJlPN",
            ".PolarisDynamicExplorePageSharedContent > .PolarisSearchResultsList",
            ".PolarisDynamicExplorePageContentWrapper > .PolarisSearchResultsList",
          ],
        },
        profilePage: {
          content: [
            ".v9tJq",
            "main.PolarisShellContent > .PolarisProfilePage",
            "main.PolarisRefreshedShellContent > .PolarisProfilePage",
          ],
          header: [".zw3Ow", ".PolarisProfilePage header"],
          username: [
            ".KV-D4",
            "section.PolarisProfilePageHeader h2.PolarisIGCoreText",
          ],
          avatarWithStoryWrap: [
            ".RR-M-.h5uC0",
            ".PolarisProfilePageHeader div.PolarisUserAvatarWithStories",
          ],
          avatarStoryRing: [
            'html[data-page="profilePage"] .RR-M-.h5uC0 canvas',
            ".PolarisProfilePageHeader canvas.PolarisStoryRing",
          ],
          followButton: [
            ".nZSzR .y3zKF.sqdOP",
            ".XBGH5 ._4EzTm .soMvl:last-child",
            '[data-page="profilePage"] .PolarisFollowButton button',
          ],
          toggleSuggestionsButton: [
            ".PolarisFollowButton > .PolarisDropdownButton:last-child",
          ],
          writeButton: [
            ".JI_ht.vwCYk",
            'html[data-page="profilePage"] .i0EQd',
            ".PolarisProfilePageHeader ._ab9s",
          ],
          subscribeButtonWrap: [".vBF20"],
          blueButtonsWrap: [".nZSzR .vwCYk"],
          buttonsRow: [".Y2E37 > div:first-child"],
          settingsMenuWrap: ["._7XkEo", ".PolarisNavigationalHeader + ._ac8b"],
          settingsMenu: [
            "._7XkEo > div",
            ".PolarisNavigationalHeader + ._ac8b > div",
          ],
          postRow: [
            ".v9tJq .weEfm",
            ".PolarisProfileMediaBrowser .PolarisIGVirtualGrid",
            ".PolarisProfileTabChannel .PolarisIGVirtualGrid",
          ],
          postContainer: [
            ".v9tJq ._bz0w",
            ".PolarisProfileMediaBrowser .PolarisPostsGridItem",
            ".PolarisProfileTabChannel .PolarisVirtualPostsGrid",
          ],
          post: [
            '.v9tJq ._bz0w a[href^="/p/"]',
            '.PolarisProfileMediaBrowser .PolarisPostsGridItem > a[href^="/p/"]',
          ],
          reelRow: [
            ".v9tJq .gmGWn",
            ".v9tJq .Nnq7C",
            ".PolarisProfilePage .PolarisIGVirtualList .PolarisIGVirtualGrid._abq4",
          ],
          reelContainer: [
            ".v9tJq .k1v61",
            ".v9tJq .b9_1r",
            ".PolarisProfilePage .PolarisClipsGrid",
          ],
          reelPreviewStats: [
            ".v9tJq .b9_1r .qn-0x",
            ".PolarisPostsGridItemOverlay._ac2d",
          ],
          reelIcon: [
            '.PolarisPostsGridItemMediaIndicator path[d*="m12.823 1 2.974"]',
          ],
          moreButton: [
            ".VMs3J",
            "section.PolarisProfilePageHeader > .PolarisProfilePageHeader > div.PolarisProfilePageHeader",
          ],
          tab: [
            "._9VEo1",
            ".PolarisProfilePage .PolarisTabbedContent > .PressableText",
          ],
          activeTab: [
            '.PolarisProfilePage .PolarisTabbedContent > .PressableText[aria-selected="true"]',
          ],
          postVideoIcon: [".CzVzU svg"],
          postVideoOverlay: [".qn-0x"],
          followersFollowingsLink: ".Y8-fY a",
        },
        profilePageFeedTab: {
          postFooter: ["article.PolarisPost ._ae3w"],
          addCommentSection: [
            "article.PolarisPost ._ae3w section.PolarisPostCommentInput",
          ],
          addCommentTypeahead: ["article.PolarisPost ._ae3w .PolarisTypeahead"],
        },
        postPage: {
          postHeader: [
            ".PolarisPostPage ._aasi",
            ".PolarisPostPage article > div > div:first-child",
          ],
          postFooter: [
            ".PolarisPostPage ._aast",
            ".PolarisPostPage article > div > div:last-child > div",
          ],
        },
        commentsPage: {
          body: 'html[data-page="mobileAllCommentsPage"] .CometMainContentWrapper',
          footer:
            'html[data-page="mobileAllCommentsPage"] nav.PolarisNavWrapper',
          scrollContainer: [".XQXOT", ".PolarisThreadedComments > ul"],
          showMoreButton: [
            "li > div > .wpO6b",
            ".PolarisThreadedComments > ul > li:last-child",
          ],
          lastListItem: ".PolarisThreadedComments > ul > *:last-child",
          comment: [".C4VMK", ".PolarisPostComment._a9zr"],
        },
        feedPage: {
          body: [".Wamc7", "section > ._aam1"],
          followSuggestions: [".bq3Mi", ".PolarisSuggestedUserFeedUnit"],
          post: [
            "article._8Rm4L",
            "article.PolarisPost",
            "article.PolarisPostFunctional",
          ],
          postLocationRow: [".M30cS", ".PolarisPostHeader._aaql"],
          postHashtagLocation: ".M30cS > div:not(:empty) + .JF9hh",
          postHeader: [".UE9AK", ".PolarisIGCoreBox > ._aaqw"],
          postHeaderBeforePseudo: [
            ".UE9AK::before",
            ".PolarisIGCoreBox > ._aaqw::before",
          ],
          postHeaderItem: ".UE9AK > *",
          postBody: [
            "article.PolarisPost ._aatk",
            "article.PolarisPost ._ab12",
          ],
          postFooterWrap1: [
            "article._8Rm4L ._97aPb + div",
            "._aatk + .PolarisIGCoreBox",
            "._ab12 + .PolarisIGCoreBox",
          ],
          postFooterWrap2: [
            "article._8Rm4L .cv3IO",
            "._aatk + .PolarisIGCoreBox > ._aast",
            "._ab12 + .PolarisIGCoreBox > div",
            "._aatk + .PolarisIGCoreBox > div",
          ],
          postFooter: [
            ".eo2As",
            "._aatk + .PolarisIGCoreBox > ._aast > ._aasx",
            "._ab12 + .PolarisIGCoreBox > div > div",
            "._aatk + .PolarisIGCoreBox > div > div",
          ],
          postActions: [".Slqrh", ".PolarisPostFeedbackControls._aamu"],
          postAfterActions: [".PolarisPostFeedbackControls._aamu ~ *"],
          postThreeDotsButtonWrap: [".PolarisPostOptionsButtonPicker"],
          postThreeDotsButton: [
            ".MEAGs",
            ".PolarisPostOptionsButtonPicker > button",
          ],
          postAction: [".Slqrh > *", ".PolarisPostFeedbackControls._aamu > *"],
          postActionIconDefault: [
            ".rrUvL",
            ".PolarisPostFeedbackControls button._abl- > div:last-child",
          ],
          postActionIconHovered: [
            ".B58H7",
            ".PolarisPostFeedbackControls button._abl- .PolarisIGCoreSVGIconButton",
          ],
          postUnderActionsContent: [
            ".eo2As > *:not(.Slqrh)",
            "._aasx > *:not(.PolarisPostFeedbackControls)",
          ],
          postPhoto: [
            ".KL4Bh img",
            "article.PolarisPost .PolarisPhoto img",
            "article.PolarisPostFunctional .PolarisPhoto img",
          ],
          postVideo: [
            "article._8Rm4L video",
            "article.PolarisPost .PolarisVideo video",
            "article.PolarisPostFunctional .PolarisVideo video",
          ],
          postMediaContainer: ["._97aPb", ".PolarisPhoto._aagu"],
          postPhotoContainer: [
            "._9AhH0",
            ".PolarisPost .PolarisPost.PolarisPhoto",
            ".PolarisPost .PolarisPost.PolarisPhotoWithIndicator",
            ".PolarisPostFunctional .PolarisPostFunctional.PolarisPhoto",
            ".PolarisPostFunctional .PolarisPostFunctional.PolarisPhotoWithIndicator",
          ],
          postVideoContainer: [
            ".GRtmf",
            ".PolarisPost .PolarisMedia.PolarisVideo",
            ".PolarisPostFunctional .PolarisMedia.PolarisVideo",
            '[data-media-actions-post-type="igtv"] > .PolarisIGCoreBox',
          ],
          postCarouselContainer: [".rQDP3", ".PolarisSidecar._aamn"],
          carouselDots: [".ijCUd", ".PolarisStepIndicator"],
          carouselDot: [".Yi5aA", ".PolarisStepIndicator ._acnb"],
        },
        postCreation: {
          body: [
            ".A9bvI",
            '[data-page="CreationDetailsPage"] .PolarisCreationShell',
          ],
          nextButton: [
            '[data-page="CreationStylePage"] .UP43G',
            '[data-page="CreationStylePage"] .PolarisNavigationalHeader ._ab5p',
          ],
          closeButton: [
            ".PolarisCreationShell .PolarisGenericMobileHeader._ab19 button.PolarisNavigationalHeader",
          ],
          captionContainer: [".IpSxo", ".PolarisCreationDetailsPage._abru"],
          captionTextarea: [
            ".IpSxo textarea",
            "textarea.PolarisCreationCaptionInput",
            ".PolarisCreationCaptionInput textarea",
          ],
          userAvatar: [
            ".IpSxo .GsWMc",
            ".IpSxo ._2dbep",
            ".PolarisUserAvatar.PolarisCreationDetailsPage",
          ],
          imageContainer: [".N7f6u", ".PolarisCreationCroppingUnit._abqh"],
          videoContainer: [".YMoW3", ".PolarisCreationStyleVideoUnit._abe_"],
          video: [".YMoW3 video", ".PolarisCreationStyleVideoUnit._abe_ video"],
          videoPoster: [
            ".YMoW3 img",
            ".PolarisCreationStyleVideoUnit._abe_ img",
          ],
          videoPlayButton: [
            '.PolarisCreationStyleVideoUnit._abe_ span._abf6[role="button"]',
          ],
          filtersReel: [
            ".PDNx9",
            ".PolarisIGVirtualList.PolarisCreationFilteringUnit",
          ],
          submitPostButton: [
            ".hfWwk .UP43G",
            '[data-page="CreationDetailsPage"] ._ab5p',
          ],
          rowButton: ["._2OfRz", ".PolarisCreationDetailsPage._abrf"],
          previewContainer: [
            'html[data-page="CreationDetailsPage"] .g5kp1',
            ".PolarisCreationDetailsPage ._aau7",
          ],
          previewPostTypeIcon: [
            ".cRc_w",
            ".PolarisCreationDetailsPage .PolarisMediaPreviewThumbnail svg",
          ],
          previewPostImage: [
            ".IpSxo .FuaTR",
            "img.PolarisMediaPreviewThumbnail",
          ],
          expandImageButton: [".pHnkA", ".PolarisCroppableImage._abfb"],
          mentionsOverlay: [".cDEf6", ".PolarisCreationCaptionInput._aby4"],
          tagPeopleButton: [".DG8Ws", "button.PolarisCreationTagVideo._a9z-"],
        },
        loginBar: {
          root: ".Xwp_P .KGiwt",
          content: ".Xwp_P .KGiwt .ryLs_",
          openAppButton: [
            ".Xwp_P .KGiwt button",
            ".PolarisMobileTopNavLoggedOut button._acap",
          ],
        },
        activityPage: {
          headerBottomLine: [
            'html[data-page="ActivityFeedPage"] .PolarisGenericMobileHeader::before',
          ],
          topListContainer: [
            'html[data-page="ActivityFeedPage"] .PolarisShellContent > .PolarisIGVirtualList > div',
          ],
        },
        "general_use-application-bar": [".Z_Gl2", ".MFkQJ", "._acc8"],
        "post-item": [
          "._97aPb",
          ".PolarisPost div:first-child:last-child:not([class]) > .PolarisPhoto",
          ".PolarisPost .PolarisMedia.PolarisVideo",
          ".PolarisPost .PolarisSidecar li.PolarisVirtualHSnapScrollComponents",
          ".PolarisPostFunctional .PolarisPostFunctional.PolarisPhoto",
          ".PolarisPostFunctional .PolarisPostFunctional.PolarisPhotoWithIndicator",
          ".PolarisPostFunctional .PolarisMedia.PolarisVideo",
          ".PolarisPostFunctional .PolarisSidecar li.PolarisVirtualHSnapScrollComponents",
          ".PolarisPostVideoPlayerWrapper[style]",
        ],
        "post-video": [
          ".GRtmf video",
          ".PolarisPost ._aatk video",
          ".PolarisPostFunctional ._ab12 video",
        ],
        "post-video-poster": [
          ".GRtmf video + img",
          ".PolarisPost ._aatk video + img",
          ".PolarisPostFunctional ._ab12 video + img",
        ],
        "post-video-overlay": [
          ".B1JlO .fXIG0",
          ".PolarisVideoPlayButton._aakl",
          ".PolarisVideoPlayButton._aakh",
          ".PolarisPost .VideoPlayerComponentContainer[data-visualcompletion]",
        ],
        "post-tagged-people-button": [
          ".G_hoz",
          "._a3gq ._a9-6",
          ".PolarisVideo ._a9-6",
        ],
        "story-container": [
          ".qbCDp",
          ".PolarisMobileOwnerStories._aa2i",
          "section > .PolarisMobileStories",
        ],
        "story-image": [".qbCDp img", "img.PolarisStoryImage"],
        "story-video": [
          ".qbCDp video",
          "video.PolarisStoryVideo",
          ".PolarisMobileStoryViewer video",
        ],
        "story-loading-preview": ".qbCDp canvas",
        "story-video-play-button": [
          ".qbCDp .videoSpritePlayButton",
          ".PolarisMobileStoryEventZone._9zwu",
        ],
        "stories-viewer": [".UIujo", ".PolarisMobileStoriesPage"],
        "highlights-container": [
          ".YlNGR",
          ".PolarisProfileStoryHighlightsTray .PolarisHSnapScroll._aap0",
        ],
        "comments-list-on-comments-page": ".XQXOT",
        "profile-page-stat-container": ".LH36I",
        "profile-page-stat-item": "._81NM2",
        "profile-page-grid-stretch-element":
          "._2z6nI article:first-child:empty",
        "profile-send-message-button": ".fAR91",
        "header-top-level-button": [
          ".HOQT4",
          ".PolarisGenericMobileHeader._ab18._ab1b",
        ],
        "your-story-button-text": [".XdXBI", ".PolarisOwnStoryTrayItem._aac2"],
        "comment-form": [".RxpZH", ".PolarisPostCommentInput._aaof"],
        "comment-form-avatar": [
          ".RxpZH ._2dbep",
          ".PolarisPostCommentInput > img.PolarisUserAvatar",
        ],
        "comment-form-form": [".RxpZH form", "form.PolarisPostCommentInput"],
        "comment-form-textarea": [
          ".RxpZH textarea",
          "textarea.PolarisPostCommentInput",
        ],
        "comment-form-submit-button": [
          '.RxpZH button[type="submit"]',
          "form.PolarisPostCommentInput button",
        ],
        "post-creation": [".Scmby", ".PolarisCreationShell"],
        "story-creation": [".GRPvx", ".Ld4Da", ".PolarisStoryCreationPage"],
        "new-post_tag-people-image-container": ".qJfNm",
      },
      ig: {
        gatekeeperIds: ["159", "166", "ig_reels_v2_launch"],
        STORY_REELS_ITEM_SEEN: "STORY_REELS_ITEM_SEEN",
      },
      fcs: {
        MIN_MINUTES_FROM_NOW: 10,
        MAX_DAYS_FROM_NOW: 74,
        MediaManagerDispatcher: "MediaManagerDispatcher",
        MediaManagerInstagramComposerMetaDataActions:
          "MediaManagerInstagramComposerMetaDataActions",
        MediaManagerInstagramComposerMetaDataStore:
          "MediaManagerInstagramComposerMetaDataStore",
        MediaManagerInstagramComposerRootActions:
          "MediaManagerInstagramComposerRootActions",
        MediaManagerInstagramComposerUploadStore:
          "MediaManagerInstagramComposerUploadStore",
        DateTime: "DateTime",
        ImageExifRotation: "ImageExifRotation",
        TimezoneNamesData: "TimezoneNamesData",
        CurrentUserInitialData: "CurrentUserInitialData",
        SWITCH_CROSSPOST_POST_MODE: "SWITCH_CROSSPOST_POST_MODE",
        SWITCH_POST_MODE: "SWITCH_POST_MODE",
        postMode: "postMode",
        postModeDraft: "draft",
        postModePublish: "publish",
        postModeSchedule: "schedule",
        isEditComposer: "isEditComposer",
        SELECT_CROSSPOST_SCHEDULED_DATE: "SELECT_CROSSPOST_SCHEDULED_DATE",
        SELECT_SCHEDULED_DATE: "SELECT_SCHEDULED_DATE",
        scheduledDate: "scheduledDate",
        SUBMIT_MEDIA_ORDER: "SUBMIT_MEDIA_ORDER",
        mediaOrderId: "id",
        prevIndex: "prevIndex",
        newIndexString: "newIndexString",
        totalMedia: "totalMedia",
        postDetailsTrayPost: "post",
        CONTENT_INSTAGRAM_EDIT_POST: "CONTENT_INSTAGRAM_EDIT_POST",
        FILES_ADDED: "FILES_ADDED",
        files: "files",
        LOAD_TAB_START: "LOAD_TAB_START",
        LOAD_TAB_FINISHED: "LOAD_TAB_FINISHED",
        tab: "tab",
        instagram_content_posts: "instagram_content_posts",
        SELECT_IG_PROFILES: "SELECT_IG_PROFILES",
        selectedProfileIDs: "selectedProfileIDs",
        LOAD_CONTENT_TABLE_FINISHED: "LOAD_CONTENT_TABLE_FINISHED",
        rows: "rows",
        CONTENT_TABLE_REFRESH_ROWS_FINISHED:
          "CONTENT_TABLE_REFRESH_ROWS_FINISHED",
        rowsByIDs: "rowsByIDs",
        PUSH_NOTIFICATION: "PUSH_NOTIFICATION",
        CLOSE_NOTIFICATION: "CLOSE_NOTIFICATION",
        isSuccess: "isSuccess",
        notificationData: "notificationData",
        notificationDataLabel: "label",
        CLOSE_COMPOSER: "CLOSE_COMPOSER",
        INSTAGRAM_COMPOSER: "INSTAGRAM_COMPOSER",
        SHOW_EXIT_COMPOSER_CONFIRM_DIALOG: "SHOW_EXIT_COMPOSER_CONFIRM_DIALOG",
        UPDATE_CAPTION: "UPDATE_CAPTION",
        TOGGLE_CROSSPOST_TO_FACEBOOK_CHECKBOX:
          "TOGGLE_CROSSPOST_TO_FACEBOOK_CHECKBOX",
        post_type: "post_type",
        post_status: "post_status",
        limit: "limit",
        POST_TYPE_ALL: "ALL",
        POST_TYPE_PHOTOS: "PHOTOS",
        POST_TYPE_IG_STORIES: "IG_STORIES",
        POST_TYPE_CAROUSELS: "CAROUSELS",
        POST_TYPE_IGTV: "IGTV",
        POST_TYPE_VIDEOS: "VIDEOS",
        POST_STATUS_DRAFT: "DRAFT",
        POST_STATUS_SCHEDULED: "SCHEDULED",
        POST_STATUS_PUBLISHED: "PUBLISHED",
        immutable: "immutable",
        queryIGMediaData: "queryIGMediaData",
        MediaManagerInstagramContentActions:
          "MediaManagerInstagramContentActions",
        MediaManagerLazyLoadActions: "MediaManagerLazyLoadActions",
        instagram_content_library_posts: "instagram_content_library_posts",
        REFRESH_TAB: "REFRESH_TAB",
        SELECT_CONTENT_TABLE: "SELECT_CONTENT_TABLE",
        SELECT_INSTAGRAM_ACCOUNT: "SELECT_INSTAGRAM_ACCOUNT",
        SET_CONTENT_LIBRARY_DATA: "SET_CONTENT_LIBRARY_DATA",
        INSTAGRAM_VIDEO_POSTS: "INSTAGRAM_VIDEO_POSTS",
        INSTAGRAM_PHOTO_POSTS: "INSTAGRAM_PHOTO_POSTS",
        INSTAGRAM_CAROUSEL_POSTS: "INSTAGRAM_CAROUSEL_POSTS",
        INSTAGRAM_IGTV_POSTS: "INSTAGRAM_IGTV_POSTS",
        IG_FEED_ORGANIC: "IG_FEED_ORGANIC",
        "/media_manager/content_library": "/media_manager/content_library",
        "/media_manager/media_manager_instagram_content":
          "/media_manager/media_manager_instagram_content",
        "/media/manager/instagram_media/edit/save":
          "/media/manager/instagram_media/edit/save",
        "/media/manager/instagram_composer/create_post":
          "/media/manager/instagram_composer/create_post",
        "https://www.facebook.com/confirmemail.php":
          "https://www.facebook.com/confirmemail.php",
        'action="/confirm_code/': 'action="/confirm_code/',
        "edit_data[save_as_draft]": "edit_data[save_as_draft]",
        "edit_data[save_as_scheduled]": "edit_data[save_as_scheduled]",
      },
      fcsSelectors: {
        welcome: {
          getStartedButton: "._7iri button._1qjd._271m._271k",
          acceptCookieButton: "button[data-cookiebanner]",
        },
        whatsNew: {
          closeButton:
            'body:not(.bizsitePage) ._9l2g[role="dialog"] [role="button"]',
        },
        general: {
          pandaErrorImage: "._1ldz",
          cookieBannerTitle: "#cookie_banner_title",
          fbLoginRequiredContainer: ".UIPage_LoggedOut",
          headerMessageIconContainer:
            ".MediaManagerInstagramComposerHeaderMessage",
        },
        sidePanel: {
          root: "#creator_studio_sliding_tray_root",
          loadingOverlay: "._8eef",
          captionScrollContainer: "._5yk1",
          captionTextarea: "._5yk1 [contenteditable]",
          locationRoot: "._7yq5",
          locationInput: "._7yq5 input",
          mediaPreview: "._5i4g",
          mediaPreviewContainer: ".BackgroundImage",
          mediaPreviewControls: "._9aiv",
          mediaPreviewVideo: "._80o3 video",
          uploadingVideo: "video._ox1",
          uploadingVideoPlayButton: "video._ox1 ~ i",
          uploadingVideoCustomControls: "video._ox1 ~ ._27db",
          coverSelectionRadioBox: "._6epv",
          goToPostButton:
            "#creator_studio_sliding_tray_root ._6qig div:nth-child(1)",
          editPostButton:
            ".MediaManagerInstagramPostDetailsTray > .FlexLayout button",
          doneButton:
            "#creator_studio_sliding_tray_root ._6qig div:nth-child(3)",
          save: "#creator_studio_sliding_tray_root ._85h_ button:not([id]):not(.delete-post-button)",
          dateDialogTrigger:
            "#creator_studio_sliding_tray_root ._85h_ button:not([id]):not(.delete-post-button) + * button",
          editPostTitle: "#creator_studio_sliding_tray_root ._6y1b ._3qn7",
          editPostBottomRow: "#creator_studio_sliding_tray_root ._85h_",
          mediaList: "._80o3",
          body: "._7-i-",
          bodyContent: ["._7-i- > .FlexLayout", "._7-i- > ._3qn7"],
          sidebar: "._7yqd",
          sidebarTab:
            '.MediaManagerInstagramComposerBodyTabSections[role="button"]',
          sidebarTabIcon:
            '.MediaManagerInstagramComposerBodyTabSections[role="button"] .ImageCore',
          sidebarTabTitle:
            '.MediaManagerInstagramComposerBodyTabSections[role="button"] .ImageCore + span',
          postPreviewCaption: ".MediaManagerInstagramPostPreview > p",
          uploadProgress: "._6eqx",
          postPerformancePane: ".MediaManagerInstagramPostDetailsBody._75fj",
        },
        postToFb: {
          root: "#creator_studio_sliding_tray_root ._3qn7._61-3._2fyh._3qnf",
          title:
            '#creator_studio_sliding_tray_root ._3qn7._61-3._2fyh._3qnf [role="heading"]',
          checkboxRow:
            "#creator_studio_sliding_tray_root ._3qn7._61-3._2fyh._3qnf ._8ung > div",
          checkboxButton:
            "#creator_studio_sliding_tray_root ._3qn7._61-3._2fyh._3qnf ._8ung button",
          checkboxText:
            "#creator_studio_sliding_tray_root ._3qn7._61-3._2fyh._3qnf ._8ung > div > div:first-child > div:last-child",
          body: "#creator_studio_sliding_tray_root ._3qn7._61-3._2fyh._3qnf ._83li",
          publishTypeButton:
            '#creator_studio_sliding_tray_root ._3qn7._61-3._2fyh._3qnf button[aria-haspopup="true"]',
        },
        tooltip: {
          root: ".uiContextualLayerPositioner",
          bubbleWrap: ".uiContextualLayer",
          bubble: ".uiTooltipX",
        },
        upload: {
          root: "._7_8t",
          button: "._7_8t button",
          buttonWrap: "._7_8t ._82ht",
          addContentButton: 'div[aria-haspopup="true"][id^="js_"] button',
          addContentButtonWrap: 'div[aria-haspopup="true"][id^="js_"]',
          input: 'input[accept^="video"]',
        },
        confirmDialog: { yes: '[action="confirm"]' },
        dateDialog: {
          root: [
            "._53ii ._53ik",
            '[style*="right: 30px"][style*="z-index: 400"] > div > div',
          ],
          rootOpen: [
            "._53ii:not(.hidden_elem) ._53ik",
            '[style*="right: 30px"][style*="z-index: 400"]:not(.hidden_elem) > div > div',
          ],
        },
      },
    };
  let gD, mD;
  function vD() {
    R.ls.remove("fusion.last-check-on");
  }
  async function bD() {
    const e = 15 * R.time.MINUTE,
      t = Number(R.ls.get("fusion.last-check-on"));
    if (t && Date.now() < t + e) return;
    R.ls.set("fusion.last-check-on", Date.now());
    const n = (function () {
        const e = o.get("fusion.config");
        return e && e.version >= hD.version ? e : hD;
      })(),
      r = `${u.options.apiUrl}/fusion?version=${n.version}`;
    my.ignoreCache();
    const i = (await my.fetchText(r, { credentials: "omit" }))
        .replace(/&amp;/g, "&")
        .replace(/&#34;/g, '\\"')
        .replace(/&#39/g, "'")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">"),
      a = JSON.parse(i);
    if (!a.config) return;
    const s = JSON.parse(JSON.stringify(n));
    mD = wD(s, a.config);
    chrome.extension.getViews({ type: "tab" }).length > 0
      ? q.send("fusion.new-version-available")
      : yD();
  }
  function yD() {
    mD && (R.ls.set("fusion.config", mD), location.reload());
  }
  function wD(e, t) {
    for (const n in t)
      R.isObject(e[n]) && R.isObject(t[n]) ? wD(e[n], t[n]) : (e[n] = t[n]);
    return e;
  }
  var _D = {
    controller: {
      init: function () {
        q.on("fusion.check-new-version", bD),
          q.on("fusion.popup-tab-id", (e) => {
            gD = e;
          }),
          pD.controller.onReset(vD),
          chrome.tabs.onRemoved.addListener((e) => {
            e === gD && mD && yD();
          }),
          q.on("fusion.update-now-click", () => {
            R.ls.set("fusion.reload-popup-on-background-start", !0), yD();
          }),
          R.ls.get("fusion.reload-popup-on-background-start") &&
            (R.ls.remove("fusion.reload-popup-on-background-start"),
            q.send("fusion.reload-popup")),
          chrome.alarms.onAlarm.addListener(async (e) => {
            "fusion.refresh-config" === e.name && bD();
          }),
          chrome.alarms.create("fusion.refresh-config", {
            when: Date.now(),
            periodInMinutes: 1440,
          });
      },
    },
  };
  var SD = function () {
    const e = ib.model.state,
      t = e.authStatus.userId;
    return e.tagAssist.accountStats[t] || {};
  };
  const { model: xD, transaction: PD } = ib;
  var DD = {
    init: function () {
      xD.observe(
        (e) => e.authStatus.userId,
        () => {
          kD();
        }
      ),
        R.createAlarm(
          "tag-assist.update-account-stats",
          { period: 4 * R.time.HOUR },
          () => {
            kD();
          }
        );
    },
  };
  async function kD(e = 0) {
    const t = xD.state,
      n = t.authStatus.userId;
    if (!n) return;
    const r = Date.now(),
      o = SD(),
      i = o && r - o.lastScanOn;
    if (i && i < u.options.tagAssist.accountStatsTtl) return;
    const a = t.authStatus.username,
      s = await My.api.fetchUserPosts(a, 42);
    if (s.error)
      return e < 2
        ? void kD(e + 1)
        : void console.error("failed to update account stats", s);
    const l = s.result;
    let c = 0,
      d = 0;
    for (const e of l)
      (c += My.api.normalizePostStat24h(e.stats.likes, e.on)),
        (d += My.api.normalizePostStat24h(e.stats.comments, e.on));
    l.length > 0 &&
      ((c = Math.round(c / l.length)), (d = Math.round(d / l.length)));
    const f = (function (e) {
      const t = [];
      {
        const n = {},
          r = e.flat();
        for (const e of r) n[e] = (n[e] || 0) + 1;
        for (const e in n) {
          const r = n[e];
          let o = t.find((e) => e.frequency === r);
          o || ((o = { frequency: r, strs: [] }), t.push(o)), o.strs.push(e);
        }
        t.sort((e, t) => t.frequency - e.frequency);
      }
      for (const n of t) {
        const t = {};
        for (const r of e) {
          let e = 0;
          for (const o of r)
            n.strs.includes(o) && ((t[o] = (t[o] || 0) + e), (e += 1));
        }
        n.strs.sort((e, n) => t[e] - t[n]);
      }
      return t.map((e) => e.strs).flat();
    })(
      l
        .map((e) => e.caption || "")
        .map((e) =>
          (function (e, t = !1) {
            const n = sy({ hashOptional: !t });
            return (e.match(n) || [])
              .map((e) => (e.startsWith("#") ? e.substr(1) : e))
              .map((e) => e.toLowerCase())
              .filter(ry);
          })(e, !0)
        )
    );
    PD((e) => {
      e.tagAssist.accountStats[n] = {
        avgLikes: c,
        avgComments: d,
        mostUsedTags: f.slice(0, 3),
        lastScanOn: Date.now(),
      };
    });
  }
  var ED = {
    controller: {
      init: function () {
        DD.init();
      },
    },
  };
  const { model: TD, transaction: ID } = ib;
  function CD() {
    return {
      hasPro: true,
      freeReels: Math.max(0, 2 - TD.state.billing.trial.reels),
      maxFreeReels: 2,
    };
  }
  async function FD(e) {
    const t = await R.callAsync(chrome.windows.getLastFocused),
      n = await R.callAsync(chrome.tabs.getSelected, t.id);
    chrome.tabs.create({ url: "https://app.inssist.com", active: !0 }),
      ID((e) => {
        (e.sidebar.isOpen = !0),
          (e.sidebar.selectedTabId = "tab-billing"),
          (e.billing.recentFeature = "desktop-reels");
      }),
      e.value.includes("keep-ig-tab") ||
        (await R.callAsync(chrome.tabs.remove, n.id));
  }
  async function AD() {
    xy.controller.sendEvent("user", "reels:submit", "desktop"),
      true
        ? xy.controller.sendEvent("user", "pro-paid-usage:reels", "desktop")
        : ID((e) => {
            e.billing.trial.reels += 1;
          });
  }
  function OD() {
    chrome.cookies.set({
      name: "desktop-reels.initial-data",
      value: JSON.stringify(CD()),
      url: "https://www.instagram.com",
      path: "/",
      httpOnly: !1,
      secure: !1,
      storeId: "0",
      domain: "instagram.com",
      sameSite: "strict",
      expirationDate: Date.now() + 30 * R.time.SECOND,
    });
  }
  var MD = {
    controller: {
      init: function () {
        q.on("desktop-reels.get-initial-data", CD),
          R.watchForIgCookie("desktop-reels.open-billing", FD),
          R.watchForIgCookie("desktop-reels.submit-success", AD),
          R.watchForIgCookie("desktop-reels.get-initial-data", OD);
      },
    },
  };
  !(async function () {
    let e = !1;
    q.on("bg.is-ready", () => e), (globalThis._ = S), x.controller.init();
    const t = cD.controller.getVersion();
    console.log(`chrome version is: ${t}`),
      P.init(),
      await Y_.controller.init(),
      lb.controller.init({
        dsn: "https://bea0900834f541bca8157710f7fd31fe@sentry.io/1547551",
      }),
      cb.controller.init(),
      await H.controller.init(),
      Vw.controller.init(),
      $w.controller.init(),
      tD.controller.init(),
      await hw.controller.init("background", !0),
      await XP.controller.init(),
      Tw.controller.init(),
      k_.controller.init(),
      z_.controller.init(),
      sD.controller.init(),
      M_.controller.init(),
      w_.controller.init(),
      lD.controller.init(),
      _D.controller.init(),
      Nw.controller.init(),
      ED.controller.init(),
      MD.controller.init(),
      N_.controller.init(),
      xy.controller.init().sendPageview().sendInstall(),
      s_.controller.init(),
      await s_.controller.updateUser(),
      Pw.controller.init(),
      await Pw.controller.updatePro(),
      eD.controller.init(),
      rD.controller.init(),
      (e = !0);
  })();
})();
