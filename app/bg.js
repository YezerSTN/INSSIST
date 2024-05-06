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
  let o;
  (() => {
    const e = "app",
      t = "production",
      n = !1;
    if (((o = globalThis.app), o)) return;
    const r = { name: e, env: t },
      i = (function e(t) {
        const o = t === r,
          i = o && n,
          l = {},
          u = (e) => Object.assign(t, e);
        return new Proxy(t, {
          get: function (n, r) {
            if ("assign" === r) return u;
            if (!(r in t)) {
              if (((t[r] = {}), o)) {
                const e = a.bind(null, "log", r, !1),
                  n = a.bind(null, "log", r, !0),
                  o = a.bind(null, "warn", r, !1),
                  i = a.bind(null, "warn", r, !0),
                  l = a.bind(null, "error", r, !1),
                  u = a.bind(null, "error", r, !0),
                  c = s.bind(null, r);
                Object.defineProperties(t[r], {
                  log: { get: () => e },
                  logDev: { get: () => n },
                  warn: { get: () => o },
                  warnDev: { get: () => i },
                  error: { get: () => l },
                  errorDev: { get: () => u },
                  Error: { get: () => c },
                });
              }
              (l[r] = e(t[r])), i && (globalThis[r] = t[r]);
            }
            return r in l ? l[r] : t[r];
          },
          set: function (e, n, r) {
            return (t[n] = r), (l[n] = r), i && (globalThis[n] = t[n]), !0;
          },
        });
      })(r);
    function a(e, t, n, ...r) {
      if (n) return;
      const [o, i, a] = l(t);
      console[e](`%c[${t}]`, `color: rgb(${o}, ${i}, ${a})`, ...r);
    }
    function s(e, t, ...n) {
      return (
        n.length > 0 && a("error", e, !1, t, ...n), new Error(`[${e}] ${t}`)
      );
    }
    function l(e) {
      let t = 0;
      e.split("").forEach((n, r) => {
        t = e.charCodeAt(r) + ((t << 5) - t);
      });
      const n = (16711680 & t) >> 16,
        r = (65280 & t) >> 8,
        o = 255 & t;
      return n + r + o < 300 ? l(`$${e}`) : [n, r, o];
    }
    (globalThis.app = i), (o = i);
  })();
  const i = 6e4,
    a = 36e5,
    s = 864e5;
  var l = {
      SECOND: 1e3,
      MINUTE: i,
      HOUR: a,
      DAY: s,
      WEEK: 6048e5,
      MONTH: 26784e5,
      weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    },
    u = {
      null: (e) => null === e,
      defined: (e) => void 0 !== e,
      undefined: (e) => void 0 === e,
      boolean: (e) => "boolean" == typeof e,
      number: (e) => "number" == typeof e,
      string: (e) => "string" == typeof e,
      symbol: (e) => "symbol" == typeof e,
      fn: (e) => "function" == typeof e,
      blob: (e) => e instanceof Blob,
      set: (e) => e instanceof Set,
      map: (e) => e instanceof Map,
      array: (e) => Array.isArray(e),
      object: (e) => "[object Object]" === Object.prototype.toString.call(e),
    };
  const c = {
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
  };
  var d = {
    unique: function (e) {
      return Array.from(new Set(e));
    },
    gaussian: f,
    gaussianInt: function (e, t) {
      return Math.round(e + f() * (t - e));
    },
    forceLayout: function () {
      document.body.getBoundingClientRect();
    },
    hashCode: p,
    pseudorandom: function (e) {
      return ((16807 * Math.max(Math.abs(p(e)), 1)) % 2147483647) / 2147483646;
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
  function f() {
    let e = 0;
    for (let t = 0; t < 6; t += 1) e += Math.random();
    return e / 6;
  }
  function p(e) {
    if (!e) return 0;
    let t,
      n,
      r = 0;
    if (0 === e.length) return r;
    for (t = 0; t < e.length; t++)
      (n = e.charCodeAt(t)), (r = (r << 5) - r + n), (r |= 0);
    return r;
  }
  const h = async (e) => {
      const t = URL.createObjectURL(e),
        n = document.createElement("img");
      return (
        await new Promise((e, r) => {
          (n.onload = e), (n.onerror = r), (n.src = t);
        }),
        { img: n, width: n.width, height: n.height, ratio: n.width / n.height }
      );
    },
    g = async (e, { type: t = "image/jpeg", quality: n = 0.8 } = {}) =>
      await new Promise((r, o) => {
        e.toBlob(
          (e) => {
            e ? r(e) : o("canvas.toBlob failed");
          },
          t,
          n
        );
      }),
    m = {
      scaleToFitSize: async function (
        e,
        t,
        n,
        { type: r = "image/jpeg", quality: o = 0.8 } = {}
      ) {
        const { img: i, width: a, height: s } = await h(e),
          l = t / a,
          u = n / s,
          c = Math.min(l, u),
          d = document.createElement("canvas");
        (d.width = a * c), (d.height = s * c);
        return (
          d.getContext("2d").drawImage(i, 0, 0, a, s, 0, 0, d.width, d.height),
          await g(d, { type: r, quality: o })
        );
      },
      scaleToFitRatio: async function (
        e,
        t,
        { type: n = "image/jpeg", quality: r = 0.8 } = {}
      ) {
        const { img: o, width: i, height: a, ratio: s } = await h(e),
          l = document.createElement("canvas");
        s > t
          ? ((l.width = i), (l.height = i / t))
          : ((l.height = a), (l.width = a * t));
        const u = l.getContext("2d"),
          c = (l.width - i) / 2,
          d = (l.height - a) / 2;
        return u.drawImage(o, c, d, i, a), await g(l, { type: n, quality: r });
      },
    };
  function v(e, t, n) {
    return n.indexOf(e) === t;
  }
  function b(e) {
    return Object.keys(e)
      .map((t) => {
        const n = e[t];
        return w(n)
          ? y(t, n)
          : Array.isArray(n)
          ? n.map((e) => y(t, e)).join("&")
          : null;
      })
      .filter(Boolean)
      .join("&")
      .replace(/%5B/g, "[")
      .replace(/%5D/g, "]");
  }
  function y(e, t) {
    return (
      w(t) || (t = JSON.stringify(t)),
      `${encodeURIComponent(e)}=${encodeURIComponent(t)}`
    );
  }
  function w(e) {
    return (
      "string" == typeof e || "number" == typeof e || "boolean" == typeof e
    );
  }
  function _(e, t = {}) {
    const n = b(t);
    return n ? `${e}?${n}` : e;
  }
  let x, S;
  function P({ hashOptional: e = !1 } = {}) {
    return (
      x ||
        ((x =
          /()([#\uFF03])((?:[A-Za-zªµºÀ-ÖØ-öø-Ɂɐ-ˁˆ-ˑˠ-ˤˮͺΆΈ-ΊΌΎ-ΡΣ-ώϐ-ϵϷ-ҁҊ-ӎ-ӹԀ-ԏԱ-Ֆՙա-ևא-תװ-ײء-غـ-يٮ-ٯٱ-ۓەۥ-ۦۮ-ۯۺ-ۼۿܐܒ-ܯݍ-ݭހ-ޥޱऄ-हऽॐक़-ॡॽঅ-ঌএ-ঐও-নপ-রলশ-হঽৎড়-ঢ়য়-ৡৰ-ৱਅ-ਊਏ-ਐਓ-ਨਪ-ਰਲ-ਲ਼ਵ-ਸ਼ਸ-ਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલ-ળવ-હઽૐૠ-ૡଅ-ଌଏ-ଐଓ-ନପ-ରଲ-ଳଵ-ହଽଡ଼-ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கங-சஜஞ-டண-தந-பம-ஹఅ-ఌఎ-ఐఒ-నప-ళవ-హౠ-ౡಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠ-ೡഅ-ഌഎ-ഐഒ-നപ-ഹൠ-ൡඅ-ඖක-නඳ-රලව-ෆก-ะา-ำเ-ๆກ-ຂຄງ-ຈຊຍດ-ທນ-ຟມ-ຣລວສ-ຫອ-ະາ-ຳຽເ-ໄໆໜ-ໝༀཀ-ཇཉ-ཪྈ-ྋက-အဣ-ဧဩ-ဪၐ-ၕႠ-Ⴥა-ჺჼᄀ-ᅙᅟ-ᆢᆨ-ᇹሀ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏ-Ᏼᐁ-ᙬᙯ-ᙶᚁ-ᚚᚠ-ᛪᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡷᢀ-ᢨᤀ-ᤜᥐ-ᥭᥰ-ᥴᦀ-ᦩᧁ-ᧇᨀ-ᨖᴀ-ᶿḀ-ẛẠ-ỹἀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₔℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℱℳ-ℹℼ-ℿⅅ-ⅉⰀ-Ⱞⰰ-ⱞⲀ-ⳤⵥⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞ々-〆〱-〵〻-〼ぁ-ゖゝ-ゟァ-ヺー-ヿㄅ-ㄬㄱ-ㆎㆠ-ㆷㇰ-ㇿ-䶵一-龻ꀀ-ꒌꠀ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢ가-힣豈-鶴侮-頻並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּ-לּמּנּ-סּףּ-פּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ̀ﾡ-ￜァ-ヺー-ヾｦ-ﾟ０-９Ａ-Ｚａ-ｚぁ-ゖ゙-ゞ㐀-䶿一-鿿꜀-뜿띀-렟-﨟〃々〻0-9٠-٩۰-۹०-९০-৯੦-੯૦-૯୦-୯௦-௯౦-౯೦-೯൦-൯๐-๙໐-໙༠-༩၀-၉០-៩᠐-᠙᥆-᥏᧐-᧙０-９_]|(?:[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u2388\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2648-\u2653\u2660\u2663\u2665\u2666\u2668\u267B\u267F\u2692-\u2694\u2696\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD79\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED0\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3]|\uD83E[\uDD10-\uDD18\uDD80-\uDD84\uDDC0]|(?:0\u20E3|1\u20E3|2\u20E3|3\u20E3|4\u20E3|5\u20E3|6\u20E3|7\u20E3|8\u20E3|9\u20E3|#\u20E3|\\*\u20E3|\uD83C(?:\uDDE6\uD83C(?:\uDDEB|\uDDFD|\uDDF1|\uDDF8|\uDDE9|\uDDF4|\uDDEE|\uDDF6|\uDDEC|\uDDF7|\uDDF2|\uDDFC|\uDDE8|\uDDFA|\uDDF9|\uDDFF|\uDDEA)|\uDDE7\uD83C(?:\uDDF8|\uDDED|\uDDE9|\uDDE7|\uDDFE|\uDDEA|\uDDFF|\uDDEF|\uDDF2|\uDDF9|\uDDF4|\uDDE6|\uDDFC|\uDDFB|\uDDF7|\uDDF3|\uDDEC|\uDDEB|\uDDEE|\uDDF6|\uDDF1)|\uDDE8\uD83C(?:\uDDF2|\uDDE6|\uDDFB|\uDDEB|\uDDF1|\uDDF3|\uDDFD|\uDDF5|\uDDE8|\uDDF4|\uDDEC|\uDDE9|\uDDF0|\uDDF7|\uDDEE|\uDDFA|\uDDFC|\uDDFE|\uDDFF|\uDDED)|\uDDE9\uD83C(?:\uDDFF|\uDDF0|\uDDEC|\uDDEF|\uDDF2|\uDDF4|\uDDEA)|\uDDEA\uD83C(?:\uDDE6|\uDDE8|\uDDEC|\uDDF7|\uDDEA|\uDDF9|\uDDFA|\uDDF8|\uDDED)|\uDDEB\uD83C(?:\uDDF0|\uDDF4|\uDDEF|\uDDEE|\uDDF7|\uDDF2)|\uDDEC\uD83C(?:\uDDF6|\uDDEB|\uDDE6|\uDDF2|\uDDEA|\uDDED|\uDDEE|\uDDF7|\uDDF1|\uDDE9|\uDDF5|\uDDFA|\uDDF9|\uDDEC|\uDDF3|\uDDFC|\uDDFE|\uDDF8|\uDDE7)|\uDDED\uD83C(?:\uDDF7|\uDDF9|\uDDF2|\uDDF3|\uDDF0|\uDDFA)|\uDDEE\uD83C(?:\uDDF4|\uDDE8|\uDDF8|\uDDF3|\uDDE9|\uDDF7|\uDDF6|\uDDEA|\uDDF2|\uDDF1|\uDDF9)|\uDDEF\uD83C(?:\uDDF2|\uDDF5|\uDDEA|\uDDF4)|\uDDF0\uD83C(?:\uDDED|\uDDFE|\uDDF2|\uDDFF|\uDDEA|\uDDEE|\uDDFC|\uDDEC|\uDDF5|\uDDF7|\uDDF3)|\uDDF1\uD83C(?:\uDDE6|\uDDFB|\uDDE7|\uDDF8|\uDDF7|\uDDFE|\uDDEE|\uDDF9|\uDDFA|\uDDF0|\uDDE8)|\uDDF2\uD83C(?:\uDDF4|\uDDF0|\uDDEC|\uDDFC|\uDDFE|\uDDFB|\uDDF1|\uDDF9|\uDDED|\uDDF6|\uDDF7|\uDDFA|\uDDFD|\uDDE9|\uDDE8|\uDDF3|\uDDEA|\uDDF8|\uDDE6|\uDDFF|\uDDF2|\uDDF5|\uDDEB)|\uDDF3\uD83C(?:\uDDE6|\uDDF7|\uDDF5|\uDDF1|\uDDE8|\uDDFF|\uDDEE|\uDDEA|\uDDEC|\uDDFA|\uDDEB|\uDDF4)|\uDDF4\uD83C\uDDF2|\uDDF5\uD83C(?:\uDDEB|\uDDF0|\uDDFC|\uDDF8|\uDDE6|\uDDEC|\uDDFE|\uDDEA|\uDDED|\uDDF3|\uDDF1|\uDDF9|\uDDF7|\uDDF2)|\uDDF6\uD83C\uDDE6|\uDDF7\uD83C(?:\uDDEA|\uDDF4|\uDDFA|\uDDFC|\uDDF8)|\uDDF8\uD83C(?:\uDDFB|\uDDF2|\uDDF9|\uDDE6|\uDDF3|\uDDE8|\uDDF1|\uDDEC|\uDDFD|\uDDF0|\uDDEE|\uDDE7|\uDDF4|\uDDF8|\uDDED|\uDDE9|\uDDF7|\uDDEF|\uDDFF|\uDDEA|\uDDFE)|\uDDF9\uD83C(?:\uDDE9|\uDDEB|\uDDFC|\uDDEF|\uDDFF|\uDDED|\uDDF1|\uDDEC|\uDDF0|\uDDF4|\uDDF9|\uDDE6|\uDDF3|\uDDF7|\uDDF2|\uDDE8|\uDDFB)|\uDDFA\uD83C(?:\uDDEC|\uDDE6|\uDDF8|\uDDFE|\uDDF2|\uDDFF)|\uDDFB\uD83C(?:\uDDEC|\uDDE8|\uDDEE|\uDDFA|\uDDE6|\uDDEA|\uDDF3)|\uDDFC\uD83C(?:\uDDF8|\uDDEB)|\uDDFD\uD83C\uDDF0|\uDDFE\uD83C(?:\uDDF9|\uDDEA)|\uDDFF\uD83C(?:\uDDE6|\uDDF2|\uDDFC))))[\uFE00-\uFE0F\u200D]*)+)/gi),
        (S = new RegExp(
          x
            .toString()
            .replace("/", "")
            .replace("/gi", "")
            .replace("[#\\uFF03]", "[#\\uFF03]?"),
          "gi"
        ))),
      e ? S : x
    );
  }
  const { $utils: k } = app;
  Object.assign(k, {
    is: u,
    ls: c,
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
    sleep: async function (e) {
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
            o = t + d.gaussianInt(0, r);
          if (0 === o) return;
          await new Promise((e) => setTimeout(e, o));
        }
      }
    },
    scaler: m,
    unique: v,
    isObject: function (e) {
      return "[object Object]" === Object.prototype.toString.call(e);
    },
    setTimer: function (e, t = 0) {
      const n = `timer-${Math.random().toString().slice(2)}`,
        r = Date.now() + Math.max(t, 0),
        o = (t) => {
          t.name === n && (i(), e());
        },
        i = () => {
          chrome.alarms.clear(n), chrome.alarms.onAlarm.removeListener(o);
        };
      return (
        chrome.alarms.create(n, { when: r }),
        chrome.alarms.onAlarm.addListener(o),
        { clear: i }
      );
    },
    loadImage: h,
    callAsync: async function (e, ...t) {
      return new Promise((n) => {
        e(...t, n);
      });
    },
    createUrl: _,
    jsonEscape: function (e) {
      return e.replace(/[\n\r\t]/g, " ");
    },
    ensureArray: function (e) {
      return Array.isArray(e) ? e : [e];
    },
    createAlarm: function (e, { delay: t, period: n, when: r }, o) {
      const a = {};
      "number" == typeof t && (a.delayInMinutes = t / i),
        "number" == typeof n && (a.periodInMinutes = n / i),
        "number" == typeof r && (a.when = r),
        chrome.alarms.create(e, a),
        chrome.alarms.onAlarm.addListener((t) => {
          t.name === e && o();
        });
    },
    extractFrame: async (e, t = 0) => {
      const n = URL.createObjectURL(e),
        r = document.createElement("video");
      (r.src = n),
        (r.muted = !0),
        await new Promise((e) => r.addEventListener("loadedmetadata", e)),
        (r.currentTime = t * r.duration),
        await new Promise((e) => r.addEventListener("timeupdate", e));
      const o = document.createElement("canvas"),
        i = o.getContext("2d");
      (o.width = r.videoWidth),
        (o.height = r.videoHeight),
        i.drawImage(r, 0, 0);
      return await new Promise((e) => o.toBlob(e, "image/jpeg"));
    },
    createEmitter: function () {
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
    },
    safeJsonParse: function (e) {
      try {
        return JSON.parse(e);
      } catch (e) {
        return null;
      }
    },
    calcEngagement: function (e, t) {
      return (e || 0) + 10 * (t || 0);
    },
    getHashtagRegex: P,
    removeFromArray: function (e, t) {
      let n;
      (n = "function" == typeof t ? e.findIndex(t) : e.indexOf(t)),
        -1 !== n && e.splice(n, 1);
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
    loadVideoMetadata: async function (e) {
      const t = "string" == typeof e ? e : URL.createObjectURL(e),
        n = document.createElement("video");
      (n.src = t),
        (n.muted = !0),
        (n.volume = 0),
        (n.preload = "metadata"),
        n.play();
      const r = {};
      return (
        await new Promise((e, t) => {
          n.addEventListener("loadedmetadata", async () => {
            await (async function (e, t = null) {
              let n, r;
              return (
                "number" == typeof t
                  ? ((n = t), (r = 100))
                  : t
                  ? ((n = t.timeout || 3e4), (r = t.frequency || 100))
                  : ((n = 3e4), (r = 100)),
                new Promise((t, o) => {
                  const i = e();
                  if (i) return void t(i);
                  const a = setInterval(() => {
                    const n = e();
                    n && (clearInterval(a), t(n));
                  }, r);
                  setTimeout(() => {
                    clearInterval(a), t(null);
                  }, n);
                })
              );
            })(() => n.webkitAudioDecodedByteCount, 100),
              (r.width = n.videoWidth),
              (r.height = n.videoHeight),
              (r.ratio = n.videoWidth / n.videoHeight),
              (r.duration = n.duration),
              (r.hasAudio = n.webkitAudioDecodedByteCount > 0),
              e();
          }),
            n.addEventListener("error", () => {
              t(n.error);
            });
        }),
        n.remove(),
        r
      );
    },
    createQueryString: b,
    createResolvablePromise: function () {
      let e = null,
        t = null;
      const n = new Promise((n, r) => {
        (e = n), (t = r);
      });
      return (
        n.__defineGetter__("resolve", () => e),
        n.__defineGetter__("reject", () => t),
        n
      );
    },
    file: {
      isCsv: function (e) {
        return "text/csv" === e.type;
      },
      isImage: function (e) {
        return e.type.startsWith("image/");
      },
      isVideo: function (e) {
        return e.type.startsWith("video/");
      },
    },
    time: l,
  });
  const { $env: D, $utils: I } = app;
  D.controller = {
    init: function () {
      var e, t;
      const n =
          (null === (e = chrome.runtime) ||
          void 0 === e ||
          null === (t = e.getManifest) ||
          void 0 === t
            ? void 0
            : t.call(e)) || null,
        r = this._getLocus(),
        o = I.ls.get("env.is") || app.env;
      (this._production = "production" === o),
        (this._development = "development" === o),
        Object.assign(D, {
          version: n ? n.version : void 0,
          manifestVersion: n ? n.manifest_version : void 0,
          backup: this._backup,
          features: this._features,
          options: this._options,
          locus: r,
          is: {
            pp: "pp" === r,
            bg: "bg" === r,
            cs: "cs" === r,
            nj: "nj" === r,
            production: this._production,
            development: this._development,
          },
        });
    },
    _getLocus: function () {
      const e = "chrome-extension:" === location.protocol;
      return e && location.pathname.includes("inssist.html")
        ? "pp"
        : e && location.pathname.includes("background")
        ? "bg"
        : chrome.runtime && chrome.runtime.id
        ? "cs"
        : "nj";
    },
    get _backup() {
      return { url: "https://inssist.com/backup" };
    },
    get _features() {
      return {
        fspring: I.ls.get("env.features.fspring", !0),
        iframes: I.ls.get("env.features.iframes", !0),
        trial: !0,
        log: I.ls.get("env.features.log", this._development),
      };
    },
    get _options() {
      return {
        apiUrl: I.ls.get(
          "env.options.apiUrl",
          "https://api.inssist.com/api/v1"
        ),
        collectBillingStats: I.ls.get("env.options.collectBillingStats", !1),
        domain: I.ls.get("env.options.domain", "inssist.com"),
        storefront: I.ls.get(
          "env.options.storefront",
          this._production
            ? "slashed.onfastspring.com"
            : "slashed.test.onfastspring.com"
        ),
        checkoutContainer: I.ls.get(
          "env.options.checkoutContainer",
          "https://inssist.com"
        ),
        billingPlans: this._billingPlans,
        billingProFeaturesList: this._billingProFeaturesList,
        billingProFeaturesTable: this._billingProFeaturesTable,
        trialFeaturesLimits: this._trialFeaturesLimits,
        tagAssist: this._tagAssist,
      };
    },
    get _billingPlans() {
      return {
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
      };
    },
    get _billingProFeaturesList() {
      return [
        {
          id: "schedule",
          icon: "sidebar-mediator.later",
          title: "Post Later",
          description:
            "\n          Schedule photos, videos, carousels, stories and reels.\n          Use Time Slots to schedule content rapidly.\n        ",
        },
        {
          id: "hashtags",
          icon: "sidebar-mediator.hashtags",
          title: "Hashtag Assistant",
          description:
            "\n          Find effective hashtags to increase your posts engagement.\n          Create hashtag collections.\n        ",
        },
        {
          id: "reels",
          icon: "sidebar-mediator.covers",
          title: "Reels and Video Stories",
          description:
            "\n          Publish Video Reels and Instagram Video Stories from your desktop PC / Mac.\n        ",
        },
        {
          id: "music",
          icon: "sidebar-mediator.music",
          title: "Music, Covers, Ghost View",
          description:
            "\n          Add music to your videos. Select or upload custom covers.\n          View stories anonymously.\n        ",
        },
      ];
    },
    get _billingProFeaturesTable() {
      return [
        { title: "Post Photos and Videos", isFree: !0, isPro: !0 },
        { title: "Post Photo Stories", isFree: !0, isPro: !0 },
        { title: "Multiaccount Support", isFree: !0, isPro: !0 },
        { title: "Relevant Hashtags", isFree: !0, isPro: !0 },
        { title: "Direct Messages", isFree: !0, isPro: !0 },
        { title: "Inspirations", isFree: !0, isPro: !0 },
        { title: "Dark Mode", isFree: !0, isPro: !0, isPaddedBottom: !0 },
        {
          title: "Post Reels",
          isPro: !0,
          icons: [
            "sidebar-mediator.later",
            "sidebar-mediator.covers",
            "sidebar-mediator.hashtags",
          ],
        },
        { title: "Post Video Stories", isPro: !0 },
        { title: "Schedule Posts", isPro: !0 },
        { title: "Schedule Reels", isPro: !0 },
        { title: "Schedule Stories", isPro: !0 },
        {
          title: "Ghost Story View",
          isPro: !0,
          tooltip: { text: "Stay anonymous while viewing Instagram stories" },
        },
        { title: "Add Music to Videos", isPro: !0 },
        { title: "Custom Video Covers", isPro: !0 },
        { title: "Hashtags Metrics & Collections", isPro: !0 },
      ];
    },
    get _tagAssist() {
      return {
        apiUrl: I.ls.get(
          "env.options.tagAssist.apiUrl",
          (this._production, "https://fc.inssist.com/api/v1/hashtag")
        ),
        collectionsTagDataTtl: 1 * I.time.MONTH,
        userTagScanTtl: 1 * I.time.WEEK,
        userTagScanPeriod: 3 * I.time.DAY,
        userTagScanCount: 30,
        sendCollectedTagsTimeout: 10 * I.time.MINUTE,
        maxTagsToQuery: 5,
        maxRelevantTagsToKeep: 100,
        accountStatsTtl: 1 * I.time.DAY,
      };
    },
    get _trialFeaturesLimits() {
      return {
        dmAdvanced: (e) => e.dmAdvanced >= 50,
        insights: (e) => e.insights >= 2,
        analytics: (e) => e.analytics >= 5,
        coverAssist: (e) => e.coverAssist >= 2,
        musicAssist: (e) => e.musicAssist >= 2,
        storyAssist: (e) => e.storyAssist >= 5,
        tagAssist: (e) => e.tagAssist >= 4,
        addLinkToStory: (e) => e.addLinkToStory >= 2,
        repost: (e) => e.repost >= 3,
        reels: (e) => e.reels >= 2,
        ghostStoryView: (e) => e.ghostStoryView >= 3,
        later: (e) => e.later >= 5,
      };
    },
  };
  const { $bus: E, $utils: T, $env: C } = app;
  E.controller = {
    init: function () {
      (E.on = this._on.bind(this)),
        (E.off = this._off.bind(this)),
        (E.once = this._once.bind(this)),
        (E.send = this._sendSerialized.bind(this)),
        (E.sendRaw = this._sendRaw.bind(this)),
        (E.sendLocal = this._sendLocal.bind(this)),
        (E.getTabId = this._getTabId.bind(this)),
        (E.getWindowId = this._getWindowId.bind(this)),
        (this._id = `${C.locus}:${this._generateId()}`),
        (this._skip = "__$bus:skip__"),
        (this._handlers = []),
        this._setup();
    },
    _getTabId: async function () {
      if (C.is.bg) return null;
      const { tabId: e } = await this._send("bus.getTabData");
      return e;
    },
    _getWindowId: async function () {
      if (C.is.bg) return null;
      const { windowId: e } = await this._send("bus.getTabData");
      return e;
    },
    _on: function (e, t, n = null) {
      n && (t = t.bind(n)), this._handlers.push({ name: e, fn: t });
    },
    _off: function (e, t = null) {
      this._handlers = this._handlers.filter(
        (n) => !!(n.name !== e || (t && n.fn !== t))
      );
    },
    _once: function (e, t) {
      const n = async (...r) => (this._off(e, n), await t(...r));
      this._on(e, n);
    },
    _sendSerialized: async function (e, ...t) {
      return await this._send(e, t, !1);
    },
    _sendRaw: async function (e, ...t) {
      return await this._send(e, t, !0);
    },
    _sendLocal: async function (e, ...t) {
      return await this._callHandlers({ name: e, args: t, raw: !0 });
    },
    _send: async function (e, t, n = !1) {
      const r = {
        $bus: !0,
        raw: n,
        name: e,
        args: this._serialize(t, n),
        senderId: this._id,
      };
      let o;
      return (
        C.is.bg
          ? ((r.fromBg = !0),
            (o = await this._sendToTabs(r).then((e) =>
              this._deserialize(e, n)
            )))
          : (C.is.pp || C.is.cs) &&
            (o = await this._sendToExt(r).then((e) => this._deserialize(e, n))),
        o
      );
    },
    _setup: function () {
      C.is.bg &&
        chrome.runtime.onMessage.addListener((e, t, n) => {
          var r, o;
          if (!(!e || !e.$bus))
            return "bus.getTabData" === e.name
              ? (n({
                  tabId:
                    (null === (r = t.tab) || void 0 === r ? void 0 : r.id) ||
                    null,
                  windowId:
                    (null === (o = t.tab) || void 0 === o
                      ? void 0
                      : o.windowId) || null,
                }),
                !0)
              : ((e.fromBg = !0),
                this._pick([
                  this._callHandlers(e),
                  this._sendToTabs(e).then((t) => this._deserialize(t, e.raw)),
                ])
                  .then((t) => this._serialize(t, e.raw))
                  .then(n),
                !0);
        }),
        (C.is.pp || C.is.cs) &&
          chrome.runtime.onMessage.addListener((e, t, n) => {
            if (!!!(e && e.$bus && e.fromBg)) return;
            if (e.senderId === this._id) return;
            const r = this._filterHandlers(e);
            return 0 !== r.length
              ? (this._callHandlers(e, r)
                  .then((t) => this._serialize(t, e.raw))
                  .then(n),
                !0)
              : void 0;
          });
    },
    _filterHandlers: function (e) {
      return this._handlers.filter((t) => t.name === e.name);
    },
    _callHandlers: async function (e, t = null) {
      if ((t || (t = this._filterHandlers(e)), 0 === t.length)) return;
      const n = await this._deserialize(e.args, e.raw);
      return await this._pick(t.map((e) => e.fn(...n)));
    },
    _sendToExt: async function (e) {
      return await new Promise((t) => {
        chrome.runtime.sendMessage(e, (e) => {
          chrome.runtime.lastError ? t(void 0) : t(e);
        });
      });
    },
    _sendToTabs: async function (e) {
      const t = await T.callAsync(chrome.tabs.query, {});
      if (0 !== t.length)
        return await this._pick(
          t.map(
            async (t) =>
              await new Promise((n) => {
                chrome.tabs.sendMessage(t.id, e, (e) => {
                  chrome.runtime.lastError ? n(void 0) : n(e);
                });
              })
          )
        );
    },
    _generateId: function () {
      return `${Date.now()}_${Math.random().toString(36).slice(2)}`;
    },
    _pick: async function (e = []) {
      let t = 0;
      const n = e.length;
      return await Promise.race(
        e.map(
          (e) =>
            new Promise(async (r) => {
              let o;
              try {
                o = await e;
              } catch (e) {
                (o = void 0), console.error(e);
              }
              (t += 1), (t === n || (T.is.defined(o) && !T.is.null(o))) && r(o);
            })
        )
      );
    },
    _serialize: function (e, t = !1) {
      return t
        ? e
        : this._walkSync(e, (e) => {
            if (T.is.blob(e)) {
              return { $bus: !0, type: "blob", url: URL.createObjectURL(e) };
            }
            return T.is.null(e) ||
              T.is.boolean(e) ||
              T.is.number(e) ||
              T.is.string(e) ||
              T.is.array(e) ||
              T.is.object(e)
              ? e
              : this._skip;
          });
    },
    _deserialize: async function (e, t = !1) {
      return t
        ? e
        : await this._walkAsync(e, async (e) => {
            if (e && e.$bus && "blob" === e.type) {
              return await fetch(e.url).then((e) => e.blob());
            }
            return e;
          });
    },
    _walkSync: function (e, t, n = !1) {
      const r = t(e);
      if (r === this._skip) return n ? this._skip : null;
      if (e !== r) return r;
      if (T.is.array(e)) {
        const n = [];
        for (let r = 0; r < e.length; r++) {
          const o = this._walkSync(e[r], t);
          n.push(o);
        }
        return n;
      }
      if (T.is.object(e)) {
        const n = {};
        for (const r in e) {
          const o = this._walkSync(e[r], t, !0);
          o !== this._skip && (n[r] = o);
        }
        return n;
      }
      return e;
    },
    _walkAsync: async function (e, t, n = !1) {
      const r = await t(e);
      if (r === this._skip) return n ? this._skip : null;
      if (e !== r) return r;
      if (T.is.array(e)) {
        const n = [];
        for (let r = 0; r < e.length; r++) {
          const o = await this._walkAsync(e[r], t);
          n.push(o);
        }
        return n;
      }
      if (T.is.object(e)) {
        const n = {};
        for (const r in e) {
          const o = await this._walkAsync(e[r], t, !0);
          o !== this._skip && (n[r] = o);
        }
        return n;
      }
      return e;
    },
  };
  const { $influx: F } = app;
  F.action = (e, t) => ((t.type = e), (t.dispatch = A), t);
  const A = function (...e) {
    F.model.dispatch(this, e);
  };
  var O,
    M,
    R,
    U,
    N = !1;
  function j(e) {
    if (null == e)
      throw new TypeError(
        "Object.assign cannot be called with null or undefined"
      );
    return Object(e);
  }
  function L() {
    (O = {}),
      (M = Object.getOwnPropertySymbols),
      (R = Object.prototype.hasOwnProperty),
      (U = Object.prototype.propertyIsEnumerable),
      (O = (function () {
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
            for (var n, r, o = j(e), i = 1; i < arguments.length; i++) {
              for (var a in (n = Object(arguments[i])))
                R.call(n, a) && (o[a] = n[a]);
              if (M) {
                r = M(n);
                for (var s = 0; s < r.length; s++)
                  U.call(n, r[s]) && (o[r[s]] = n[r[s]]);
              }
            }
            return o;
          });
  }
  function B() {
    return N || ((N = !0), L()), O;
  }
  var $,
    V,
    H,
    z,
    q,
    G,
    W,
    J,
    Q,
    Y,
    K,
    X,
    Z,
    ee,
    te,
    ne,
    re,
    oe,
    ie,
    ae,
    se,
    le,
    ue,
    ce,
    de,
    fe,
    pe,
    he,
    ge,
    me,
    ve,
    be,
    ye,
    we,
    _e,
    xe,
    Se,
    Pe,
    ke,
    De,
    Ie,
    Ee,
    Te,
    Ce,
    Fe,
    Ae,
    Oe,
    Me,
    Re,
    Ue,
    Ne,
    je,
    Le = !1;
  function Be(e) {
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
  function $e(e, t, n) {
    (this.props = e),
      (this.context = t),
      (this.refs = re),
      (this.updater = n || ne);
  }
  function Ve() {}
  function He(e, t, n) {
    (this.props = e),
      (this.context = t),
      (this.refs = re),
      (this.updater = n || ne);
  }
  function ze(e, t, n) {
    var r,
      o = {},
      i = null,
      a = null;
    if (null != t)
      for (r in (void 0 !== t.ref && (a = t.ref),
      void 0 !== t.key && (i = "" + t.key),
      t))
        ae.call(t, r) && !se.hasOwnProperty(r) && (o[r] = t[r]);
    var s = arguments.length - 2;
    if (1 === s) o.children = n;
    else if (1 < s) {
      for (var l = Array(s), u = 0; u < s; u++) l[u] = arguments[u + 2];
      o.children = l;
    }
    if (e && e.defaultProps)
      for (r in (s = e.defaultProps)) void 0 === o[r] && (o[r] = s[r]);
    return {
      $$typeof: z,
      type: e,
      key: i,
      ref: a,
      props: o,
      _owner: ie.current,
    };
  }
  function qe(e) {
    return "object" == typeof e && null !== e && e.$$typeof === z;
  }
  function Ge(e, t, n, r) {
    if (ue.length) {
      var o = ue.pop();
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
  function We(e) {
    (e.result = null),
      (e.keyPrefix = null),
      (e.func = null),
      (e.context = null),
      (e.count = 0),
      10 > ue.length && ue.push(e);
  }
  function Je(e, t, n, r) {
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
            case z:
            case q:
              i = !0;
          }
      }
    if (i) return n(r, e, "" === t ? "." + Ye(e, 0) : t), 1;
    if (((i = 0), (t = "" === t ? "." : t + ":"), Array.isArray(e)))
      for (var a = 0; a < e.length; a++) {
        var s = t + Ye((o = e[a]), a);
        i += Je(o, s, n, r);
      }
    else if (
      (null === e || "object" != typeof e
        ? (s = null)
        : (s =
            "function" == typeof (s = (te && e[te]) || e["@@iterator"])
              ? s
              : null),
      "function" == typeof s)
    )
      for (e = s.call(e), a = 0; !(o = e.next()).done; )
        i += Je((o = o.value), (s = t + Ye(o, a++)), n, r);
    else if ("object" === o)
      throw (
        ((n = "" + e),
        Error(
          Be(
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
  function Qe(e, t, n) {
    return null == e ? 0 : Je(e, "", t, n);
  }
  function Ye(e, t) {
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
  function Ke(e, t) {
    e.func.call(e.context, t, e.count++);
  }
  function Xe(e, t, n) {
    var r = e.result,
      o = e.keyPrefix;
    (e = e.func.call(e.context, t, e.count++)),
      Array.isArray(e)
        ? Ze(e, r, n, function (e) {
            return e;
          })
        : null != e &&
          (qe(e) &&
            (e = (function (e, t) {
              return {
                $$typeof: z,
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
                  : ("" + e.key).replace(le, "$&/") + "/") +
                n
            )),
          r.push(e));
  }
  function Ze(e, t, n, r, o) {
    var i = "";
    null != n && (i = ("" + n).replace(le, "$&/") + "/"),
      Qe(e, Xe, (t = Ge(t, i, r, o))),
      We(t);
  }
  function et() {
    var e = ce.current;
    if (null === e) throw Error(Be(321));
    return e;
  }
  function tt() {
    return (
      Le ||
        ((Le = !0),
        ($ = {}),
        (V = B()),
        (H = "function" == typeof Symbol && Symbol.for),
        (z = H ? Symbol.for("react.element") : 60103),
        (q = H ? Symbol.for("react.portal") : 60106),
        (G = H ? Symbol.for("react.fragment") : 60107),
        (W = H ? Symbol.for("react.strict_mode") : 60108),
        (J = H ? Symbol.for("react.profiler") : 60114),
        (Q = H ? Symbol.for("react.provider") : 60109),
        (Y = H ? Symbol.for("react.context") : 60110),
        (K = H ? Symbol.for("react.forward_ref") : 60112),
        (X = H ? Symbol.for("react.suspense") : 60113),
        (Z = H ? Symbol.for("react.memo") : 60115),
        (ee = H ? Symbol.for("react.lazy") : 60116),
        (te = "function" == typeof Symbol && Symbol.iterator),
        (ne = {
          isMounted: function () {
            return !1;
          },
          enqueueForceUpdate: function () {},
          enqueueReplaceState: function () {},
          enqueueSetState: function () {},
        }),
        (re = {}),
        ($e.prototype.isReactComponent = {}),
        ($e.prototype.setState = function (e, t) {
          if ("object" != typeof e && "function" != typeof e && null != e)
            throw Error(Be(85));
          this.updater.enqueueSetState(this, e, t, "setState");
        }),
        ($e.prototype.forceUpdate = function (e) {
          this.updater.enqueueForceUpdate(this, e, "forceUpdate");
        }),
        (Ve.prototype = $e.prototype),
        ((oe = He.prototype = new Ve()).constructor = He),
        V(oe, $e.prototype),
        (oe.isPureReactComponent = !0),
        (ie = { current: null }),
        (ae = Object.prototype.hasOwnProperty),
        (se = { key: !0, ref: !0, __self: !0, __source: !0 }),
        (le = /\/+/g),
        (ue = []),
        (de = {
          ReactCurrentDispatcher: (ce = { current: null }),
          ReactCurrentBatchConfig: { suspense: null },
          ReactCurrentOwner: ie,
          IsSomeRendererActing: { current: !1 },
          assign: V,
        }),
        (fe = {
          map: function (e, t, n) {
            if (null == e) return e;
            var r = [];
            return Ze(e, r, null, t, n), r;
          },
          forEach: function (e, t, n) {
            if (null == e) return e;
            Qe(e, Ke, (t = Ge(null, null, t, n))), We(t);
          },
          count: function (e) {
            return Qe(
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
              Ze(e, t, null, function (e) {
                return e;
              }),
              t
            );
          },
          only: function (e) {
            if (!qe(e)) throw Error(Be(143));
            return e;
          },
        }),
        ($.Children = fe),
        (pe = $e),
        ($.Component = pe),
        (he = G),
        ($.Fragment = he),
        (ge = J),
        ($.Profiler = ge),
        (me = He),
        ($.PureComponent = me),
        (ve = W),
        ($.StrictMode = ve),
        (be = X),
        ($.Suspense = be),
        (ye = de),
        ($.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ye),
        (we = function (e, t, n) {
          if (null == e) throw Error(Be(267, e));
          var r = V({}, e.props),
            o = e.key,
            i = e.ref,
            a = e._owner;
          if (null != t) {
            if (
              (void 0 !== t.ref && ((i = t.ref), (a = ie.current)),
              void 0 !== t.key && (o = "" + t.key),
              e.type && e.type.defaultProps)
            )
              var s = e.type.defaultProps;
            for (l in t)
              ae.call(t, l) &&
                !se.hasOwnProperty(l) &&
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
            $$typeof: z,
            type: e.type,
            key: o,
            ref: i,
            props: r,
            _owner: a,
          };
        }),
        ($.cloneElement = we),
        (_e = function (e, t) {
          return (
            void 0 === t && (t = null),
            ((e = {
              $$typeof: Y,
              _calculateChangedBits: t,
              _currentValue: e,
              _currentValue2: e,
              _threadCount: 0,
              Provider: null,
              Consumer: null,
            }).Provider = { $$typeof: Q, _context: e }),
            (e.Consumer = e)
          );
        }),
        ($.createContext = _e),
        (xe = ze),
        ($.createElement = xe),
        (Se = function (e) {
          var t = ze.bind(null, e);
          return (t.type = e), t;
        }),
        ($.createFactory = Se),
        (Pe = function () {
          return { current: null };
        }),
        ($.createRef = Pe),
        (ke = function (e) {
          return { $$typeof: K, render: e };
        }),
        ($.forwardRef = ke),
        (De = qe),
        ($.isValidElement = De),
        (Ie = function (e) {
          return { $$typeof: ee, _ctor: e, _status: -1, _result: null };
        }),
        ($.lazy = Ie),
        (Ee = function (e, t) {
          return { $$typeof: Z, type: e, compare: void 0 === t ? null : t };
        }),
        ($.memo = Ee),
        (Te = function (e, t) {
          return et().useCallback(e, t);
        }),
        ($.useCallback = Te),
        (Ce = function (e, t) {
          return et().useContext(e, t);
        }),
        ($.useContext = Ce),
        (Fe = function () {}),
        ($.useDebugValue = Fe),
        (Ae = function (e, t) {
          return et().useEffect(e, t);
        }),
        ($.useEffect = Ae),
        (Oe = function (e, t, n) {
          return et().useImperativeHandle(e, t, n);
        }),
        ($.useImperativeHandle = Oe),
        (Me = function (e, t) {
          return et().useLayoutEffect(e, t);
        }),
        ($.useLayoutEffect = Me),
        (Re = function (e, t) {
          return et().useMemo(e, t);
        }),
        ($.useMemo = Re),
        (Ue = function (e, t, n) {
          return et().useReducer(e, t, n);
        }),
        ($.useReducer = Ue),
        (Ne = function (e) {
          return et().useRef(e);
        }),
        ($.useRef = Ne),
        (je = function (e) {
          return et().useState(e);
        }),
        ($.useState = je),
        "16.13.1",
        ($.version = "16.13.1")),
      $
    );
  }
  var nt,
    rt,
    ot = !1;
  function it() {
    return ot || ((ot = !0), (nt = {}), (nt = tt()), (rt = t(nt))), nt;
  }
  it();
  var at,
    st = !1;
  function lt() {
    return (
      st ||
        ((st = !0),
        (at = {}),
        "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED",
        (at = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED")),
      at
    );
  }
  var ut,
    ct,
    dt = !1;
  function ft() {}
  function pt() {}
  (dt ||
    ((dt = !0),
    (ut = {}),
    (ct = lt()),
    (pt.resetWarningCache = ft),
    (ut = function () {
      function e(e, t, n, r, o, i) {
        if (i !== ct) {
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
        checkPropTypes: pt,
        resetWarningCache: ft,
      };
      return (n.PropTypes = n), n;
    })),
  ut)();
  it();
  var ht = rt.createContext(null);
  var gt = function (e) {
      e();
    },
    mt = { notify: function () {} };
  function vt() {
    var e = gt,
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
  var bt = (function () {
    function e(e, t) {
      (this.store = e),
        (this.parentSub = t),
        (this.unsubscribe = null),
        (this.listeners = mt),
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
          (this.listeners = vt()));
      }),
      (t.tryUnsubscribe = function () {
        this.unsubscribe &&
          (this.unsubscribe(),
          (this.unsubscribe = null),
          this.listeners.clear(),
          (this.listeners = mt));
      }),
      e
    );
  })();
  function yt() {
    return (yt =
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
  var wt = yt;
  function _t(e, t) {
    if (null == e) return {};
    var n,
      r,
      o = {},
      i = Object.keys(e);
    for (r = 0; r < i.length; r++)
      (n = i[r]), t.indexOf(n) >= 0 || (o[n] = e[n]);
    return o;
  }
  var xt,
    St,
    Pt,
    kt,
    Dt,
    It,
    Et,
    Tt,
    Ct,
    Ft,
    At,
    Ot,
    Mt,
    Rt,
    Ut,
    Nt,
    jt,
    Lt,
    Bt,
    $t,
    Vt,
    Ht,
    zt,
    qt,
    Gt,
    Wt,
    Jt,
    Qt,
    Yt,
    Kt,
    Xt,
    Zt,
    en,
    tn,
    nn,
    rn,
    on,
    an,
    sn,
    ln,
    un,
    cn,
    dn,
    fn,
    pn,
    hn,
    gn,
    mn,
    vn = !1;
  function bn(e) {
    if ("object" == typeof e && null !== e) {
      var t = e.$$typeof;
      switch (t) {
        case Pt:
          switch ((e = e.type)) {
            case Ft:
            case At:
            case Dt:
            case Et:
            case It:
            case Mt:
              return e;
            default:
              switch ((e = e && e.$$typeof)) {
                case Ct:
                case Ot:
                case Nt:
                case Ut:
                case Tt:
                  return e;
                default:
                  return t;
              }
          }
        case kt:
          return t;
      }
    }
  }
  function yn(e) {
    return bn(e) === At;
  }
  var wn = {};
  vn ||
    ((vn = !0),
    (xt = {}),
    (St = "function" == typeof Symbol && Symbol.for),
    (Pt = St ? Symbol.for("react.element") : 60103),
    (kt = St ? Symbol.for("react.portal") : 60106),
    (Dt = St ? Symbol.for("react.fragment") : 60107),
    (It = St ? Symbol.for("react.strict_mode") : 60108),
    (Et = St ? Symbol.for("react.profiler") : 60114),
    (Tt = St ? Symbol.for("react.provider") : 60109),
    (Ct = St ? Symbol.for("react.context") : 60110),
    (Ft = St ? Symbol.for("react.async_mode") : 60111),
    (At = St ? Symbol.for("react.concurrent_mode") : 60111),
    (Ot = St ? Symbol.for("react.forward_ref") : 60112),
    (Mt = St ? Symbol.for("react.suspense") : 60113),
    (Rt = St ? Symbol.for("react.suspense_list") : 60120),
    (Ut = St ? Symbol.for("react.memo") : 60115),
    (Nt = St ? Symbol.for("react.lazy") : 60116),
    (jt = St ? Symbol.for("react.block") : 60121),
    (Lt = St ? Symbol.for("react.fundamental") : 60117),
    (Bt = St ? Symbol.for("react.responder") : 60118),
    ($t = St ? Symbol.for("react.scope") : 60119),
    (Vt = Ft),
    (xt.AsyncMode = Vt),
    (Ht = At),
    (xt.ConcurrentMode = Ht),
    (zt = Ct),
    (xt.ContextConsumer = zt),
    (qt = Tt),
    (xt.ContextProvider = qt),
    (Gt = Pt),
    (xt.Element = Gt),
    (Wt = Ot),
    (xt.ForwardRef = Wt),
    (Jt = Dt),
    (xt.Fragment = Jt),
    (Qt = Nt),
    (xt.Lazy = Qt),
    (Yt = Ut),
    (xt.Memo = Yt),
    (Kt = kt),
    (xt.Portal = Kt),
    (Xt = Et),
    (xt.Profiler = Xt),
    (Zt = It),
    (xt.StrictMode = Zt),
    (en = Mt),
    (xt.Suspense = en),
    (tn = function (e) {
      return yn(e) || bn(e) === Ft;
    }),
    (xt.isAsyncMode = tn),
    (nn = yn),
    (xt.isConcurrentMode = nn),
    (rn = function (e) {
      return bn(e) === Ct;
    }),
    (xt.isContextConsumer = rn),
    (on = function (e) {
      return bn(e) === Tt;
    }),
    (xt.isContextProvider = on),
    (an = function (e) {
      return "object" == typeof e && null !== e && e.$$typeof === Pt;
    }),
    (xt.isElement = an),
    (sn = function (e) {
      return bn(e) === Ot;
    }),
    (xt.isForwardRef = sn),
    (ln = function (e) {
      return bn(e) === Dt;
    }),
    (xt.isFragment = ln),
    (un = function (e) {
      return bn(e) === Nt;
    }),
    (xt.isLazy = un),
    (cn = function (e) {
      return bn(e) === Ut;
    }),
    (xt.isMemo = cn),
    (dn = function (e) {
      return bn(e) === kt;
    }),
    (xt.isPortal = dn),
    (fn = function (e) {
      return bn(e) === Et;
    }),
    (xt.isProfiler = fn),
    (pn = function (e) {
      return bn(e) === It;
    }),
    (xt.isStrictMode = pn),
    (hn = function (e) {
      return bn(e) === Mt;
    }),
    (xt.isSuspense = hn),
    (gn = function (e) {
      return (
        "string" == typeof e ||
        "function" == typeof e ||
        e === Dt ||
        e === At ||
        e === Et ||
        e === It ||
        e === Mt ||
        e === Rt ||
        ("object" == typeof e &&
          null !== e &&
          (e.$$typeof === Nt ||
            e.$$typeof === Ut ||
            e.$$typeof === Tt ||
            e.$$typeof === Ct ||
            e.$$typeof === Ot ||
            e.$$typeof === Lt ||
            e.$$typeof === Bt ||
            e.$$typeof === $t ||
            e.$$typeof === jt))
      );
    }),
    (xt.isValidElementType = gn),
    (mn = bn),
    (xt.typeOf = mn));
  var _n = {
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
    xn = {
      name: !0,
      length: !0,
      prototype: !0,
      caller: !0,
      callee: !0,
      arguments: !0,
      arity: !0,
    },
    Sn = {
      $$typeof: !0,
      compare: !0,
      defaultProps: !0,
      displayName: !0,
      propTypes: !0,
      type: !0,
    },
    Pn = {};
  function kn(e) {
    return wn.isMemo(e) ? Sn : Pn[e.$$typeof] || _n;
  }
  (Pn[(wn = xt).ForwardRef] = {
    $$typeof: !0,
    render: !0,
    defaultProps: !0,
    displayName: !0,
    propTypes: !0,
  }),
    (Pn[wn.Memo] = Sn);
  var Dn = Object.defineProperty,
    In = Object.getOwnPropertyNames,
    En = Object.getOwnPropertySymbols,
    Tn = Object.getOwnPropertyDescriptor,
    Cn = Object.getPrototypeOf,
    Fn = Object.prototype;
  var An = t(function e(t, n, r) {
    if ("string" != typeof n) {
      if (Fn) {
        var o = Cn(n);
        o && o !== Fn && e(t, o, r);
      }
      var i = In(n);
      En && (i = i.concat(En(n)));
      for (var a = kn(t), s = kn(n), l = 0; l < i.length; ++l) {
        var u = i[l];
        if (!(xn[u] || (r && r[u]) || (s && s[u]) || (a && a[u]))) {
          var c = Tn(n, u);
          try {
            Dn(t, u, c);
          } catch (e) {}
        }
      }
    }
    return t;
  });
  it(), it();
  var On =
      "undefined" != typeof window &&
      void 0 !== window.document &&
      void 0 !== window.document.createElement
        ? it().useLayoutEffect
        : it().useEffect,
    Mn = [],
    Rn = [null, null];
  function Un(e, t) {
    var n = e[1];
    return [t.payload, n + 1];
  }
  function Nn(e, t, n) {
    On(function () {
      return e.apply(void 0, t);
    }, n);
  }
  function jn(e, t, n, r, o, i, a) {
    (e.current = r),
      (t.current = o),
      (n.current = !1),
      i.current && ((i.current = null), a());
  }
  function Ln(e, t, n, r, o, i, a, s, l, u) {
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
  var Bn = function () {
    return [null, 0];
  };
  function $n(e, t) {
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
      m = void 0 === g ? ht : g,
      v = _t(n, [
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
        i = wt({}, v, {
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
        ? it().useMemo
        : function (e) {
            return e();
          };
      function d(n) {
        var r = it().useMemo(
            function () {
              var e = n.reactReduxForwardedRef,
                t = _t(n, ["reactReduxForwardedRef"]);
              return [n.context, e, t];
            },
            [n]
          ),
          o = r[0],
          a = r[1],
          s = r[2],
          l = it().useMemo(
            function () {
              return o &&
                o.Consumer &&
                wn.isContextConsumer(rt.createElement(o.Consumer, null))
                ? o
                : b;
            },
            [o, b]
          ),
          d = it().useContext(l),
          f =
            Boolean(n.store) &&
            Boolean(n.store.getState) &&
            Boolean(n.store.dispatch);
        Boolean(d) && Boolean(d.store);
        var p = f ? n.store : d.store,
          h = it().useMemo(
            function () {
              return (function (t) {
                return e(t.dispatch, i);
              })(p);
            },
            [p]
          ),
          g = it().useMemo(
            function () {
              if (!c) return Rn;
              var e = new bt(p, f ? null : d.subscription),
                t = e.notifyNestedSubs.bind(e);
              return [e, t];
            },
            [p, f, d]
          ),
          m = g[0],
          v = g[1],
          y = it().useMemo(
            function () {
              return f ? d : wt({}, d, { subscription: m });
            },
            [f, d, m]
          ),
          w = it().useReducer(Un, Mn, Bn),
          _ = w[0][0],
          x = w[1];
        if (_ && _.error) throw _.error;
        var S = it().useRef(),
          P = it().useRef(s),
          k = it().useRef(),
          D = it().useRef(!1),
          I = u(
            function () {
              return k.current && s === P.current
                ? k.current
                : h(p.getState(), s);
            },
            [p, _, s]
          );
        Nn(jn, [P, S, D, s, I, k, v]),
          Nn(Ln, [c, p, m, h, P, S, D, k, v, x], [p, m, h]);
        var E = it().useMemo(
          function () {
            return rt.createElement(t, wt({}, I, { ref: a }));
          },
          [a, t, I]
        );
        return it().useMemo(
          function () {
            return c ? rt.createElement(l.Provider, { value: y }, E) : E;
          },
          [l, E, y]
        );
      }
      var p = s ? rt.memo(d) : d;
      if (((p.WrappedComponent = t), (p.displayName = r), h)) {
        var g = rt.forwardRef(function (e, t) {
          return rt.createElement(p, wt({}, e, { reactReduxForwardedRef: t }));
        });
        return (g.displayName = r), (g.WrappedComponent = t), An(g, t);
      }
      return An(p, t);
    };
  }
  function Vn(e, t) {
    return e === t ? 0 !== e || 0 !== t || 1 / e == 1 / t : e != e && t != t;
  }
  function Hn(e, t) {
    if (Vn(e, t)) return !0;
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
        !Vn(e[n[o]], t[n[o]])
      )
        return !1;
    return !0;
  }
  var zn = function () {
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
    qn = function () {
      return Math.random().toString(36).substring(7).split("").join(".");
    },
    Gn = {
      INIT: "@@redux/INIT" + qn(),
      REPLACE: "@@redux/REPLACE" + qn(),
      PROBE_UNKNOWN_ACTION: function () {
        return "@@redux/PROBE_UNKNOWN_ACTION" + qn();
      },
    };
  function Wn(e) {
    if ("object" != typeof e || null === e) return !1;
    for (var t = e; null !== Object.getPrototypeOf(t); )
      t = Object.getPrototypeOf(t);
    return Object.getPrototypeOf(e) === t;
  }
  function Jn(e, t, n) {
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
      return n(Jn)(e, t);
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
      if (!Wn(e))
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
      (o = e), f({ type: Gn.REPLACE });
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
        })[zn.default] = function () {
          return this;
        }),
        e
      );
    }
    return (
      f({ type: Gn.INIT }),
      ((r = { dispatch: f, subscribe: d, getState: c, replaceReducer: p })[
        zn.default
      ] = h),
      r
    );
  }
  function Qn(e, t) {
    return function () {
      return t(e.apply(this, arguments));
    };
  }
  function Yn(e) {
    return function (t, n) {
      var r = e(t, n);
      function o() {
        return r;
      }
      return (o.dependsOnOwnProps = !1), o;
    };
  }
  function Kn(e) {
    return null !== e.dependsOnOwnProps && void 0 !== e.dependsOnOwnProps
      ? Boolean(e.dependsOnOwnProps)
      : 1 !== e.length;
  }
  function Xn(e, t) {
    return function (t, n) {
      n.displayName;
      var r = function (e, t) {
        return r.dependsOnOwnProps ? r.mapToProps(e, t) : r.mapToProps(e);
      };
      return (
        (r.dependsOnOwnProps = !0),
        (r.mapToProps = function (t, n) {
          (r.mapToProps = e), (r.dependsOnOwnProps = Kn(e));
          var o = r(t, n);
          return (
            "function" == typeof o &&
              ((r.mapToProps = o),
              (r.dependsOnOwnProps = Kn(o)),
              (o = r(t, n))),
            o
          );
        }),
        r
      );
    };
  }
  var Zn = [
    function (e) {
      return "function" == typeof e ? Xn(e) : void 0;
    },
    function (e) {
      return e
        ? void 0
        : Yn(function (e) {
            return { dispatch: e };
          });
    },
    function (e) {
      return e && "object" == typeof e
        ? Yn(function (t) {
            return (function (e, t) {
              if ("function" == typeof e) return Qn(e, t);
              if ("object" != typeof e || null === e)
                throw new Error(
                  "bindActionCreators expected an object or a function, instead received " +
                    (null === e ? "null" : typeof e) +
                    '. Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?'
                );
              var n = {};
              for (var r in e) {
                var o = e[r];
                "function" == typeof o && (n[r] = Qn(o, t));
              }
              return n;
            })(e, t);
          })
        : void 0;
    },
  ];
  var er = [
    function (e) {
      return "function" == typeof e ? Xn(e) : void 0;
    },
    function (e) {
      return e
        ? void 0
        : Yn(function () {
            return {};
          });
    },
  ];
  function tr(e, t, n) {
    return wt({}, n, {}, e, {}, t);
  }
  var nr = [
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
            return tr;
          };
    },
  ];
  function rr(e, t, n, r) {
    return function (o, i) {
      return n(e(o, i), t(r, i), i);
    };
  }
  function or(e, t, n, r, o) {
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
  function ir(e, t) {
    var n = t.initMapStateToProps,
      r = t.initMapDispatchToProps,
      o = t.initMergeProps,
      i = _t(t, [
        "initMapStateToProps",
        "initMapDispatchToProps",
        "initMergeProps",
      ]),
      a = n(e, i),
      s = r(e, i),
      l = o(e, i);
    return (i.pure ? or : rr)(a, s, l, e, i);
  }
  function ar(e, t, n) {
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
  function sr(e, t) {
    return e === t;
  }
  function lr(e) {
    var t = void 0 === e ? {} : e,
      n = t.connectHOC,
      r = void 0 === n ? $n : n,
      o = t.mapStateToPropsFactories,
      i = void 0 === o ? er : o,
      a = t.mapDispatchToPropsFactories,
      s = void 0 === a ? Zn : a,
      l = t.mergePropsFactories,
      u = void 0 === l ? nr : l,
      c = t.selectorFactory,
      d = void 0 === c ? ir : c;
    return function (e, t, n, o) {
      void 0 === o && (o = {});
      var a = o,
        l = a.pure,
        c = void 0 === l || l,
        f = a.areStatesEqual,
        p = void 0 === f ? sr : f,
        h = a.areOwnPropsEqual,
        g = void 0 === h ? Hn : h,
        m = a.areStatePropsEqual,
        v = void 0 === m ? Hn : m,
        b = a.areMergedPropsEqual,
        y = void 0 === b ? Hn : b,
        w = _t(a, [
          "pure",
          "areStatesEqual",
          "areOwnPropsEqual",
          "areStatePropsEqual",
          "areMergedPropsEqual",
        ]),
        _ = ar(e, i, "mapStateToProps"),
        x = ar(t, s, "mapDispatchToProps"),
        S = ar(n, u, "mergeProps");
      return r(
        d,
        wt(
          {
            methodName: "connect",
            getDisplayName: function (e) {
              return "Connect(" + e + ")";
            },
            shouldHandleStateChanges: Boolean(e),
            initMapStateToProps: _,
            initMapDispatchToProps: x,
            initMergeProps: S,
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
  var ur = lr();
  it(), it();
  it();
  var cr,
    dr,
    fr,
    pr,
    hr,
    gr,
    mr,
    vr,
    br,
    yr,
    wr,
    _r,
    xr,
    Sr,
    Pr,
    kr,
    Dr,
    Ir,
    Er,
    Tr,
    Cr,
    Fr,
    Ar,
    Or,
    Mr,
    Rr,
    Ur,
    Nr,
    jr,
    Lr,
    Br,
    $r,
    Vr,
    Hr,
    zr,
    qr,
    Gr,
    Wr,
    Jr,
    Qr,
    Yr,
    Kr,
    Xr,
    Zr,
    eo,
    to = !1;
  function no(e, t) {
    var n = e.length;
    e.push(t);
    e: for (;;) {
      var r = (n - 1) >>> 1,
        o = e[r];
      if (!(void 0 !== o && 0 < io(o, t))) break e;
      (e[r] = t), (e[n] = o), (n = r);
    }
  }
  function ro(e) {
    return void 0 === (e = e[0]) ? null : e;
  }
  function oo(e) {
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
          if (void 0 !== a && 0 > io(a, n))
            void 0 !== l && 0 > io(l, a)
              ? ((e[r] = l), (e[s] = n), (r = s))
              : ((e[r] = a), (e[i] = n), (r = i));
          else {
            if (!(void 0 !== l && 0 > io(l, n))) break e;
            (e[r] = l), (e[s] = n), (r = s);
          }
        }
      }
      return t;
    }
    return null;
  }
  function io(e, t) {
    var n = e.sortIndex - t.sortIndex;
    return 0 !== n ? n : e.id - t.id;
  }
  function ao(e) {
    for (var t = ro(Ur); null !== t; ) {
      if (null === t.callback) oo(Ur);
      else {
        if (!(t.startTime <= e)) break;
        oo(Ur), (t.sortIndex = t.expirationTime), no(Rr, t);
      }
      t = ro(Ur);
    }
  }
  function so(e) {
    if (((Vr = !1), ao(e), !$r))
      if (null !== ro(Rr)) ($r = !0), pr(lo);
      else {
        var t = ro(Ur);
        null !== t && hr(so, t.startTime - e);
      }
  }
  function lo(e, t) {
    ($r = !1), Vr && ((Vr = !1), gr()), (Br = !0);
    var n = Lr;
    try {
      for (
        ao(t), jr = ro(Rr);
        null !== jr && (!(jr.expirationTime > t) || (e && !mr()));

      ) {
        var r = jr.callback;
        if (null !== r) {
          (jr.callback = null), (Lr = jr.priorityLevel);
          var o = r(jr.expirationTime <= t);
          (t = cr()),
            "function" == typeof o
              ? (jr.callback = o)
              : jr === ro(Rr) && oo(Rr),
            ao(t);
        } else oo(Rr);
        jr = ro(Rr);
      }
      if (null !== jr) var i = !0;
      else {
        var a = ro(Ur);
        null !== a && hr(so, a.startTime - t), (i = !1);
      }
      return i;
    } finally {
      (jr = null), (Lr = n), (Br = !1);
    }
  }
  function uo(e) {
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
  function co() {
    return (
      to ||
        ((to = !0),
        (fr = {}),
        "undefined" == typeof window || "function" != typeof MessageChannel
          ? ((br = null),
            (yr = null),
            (wr = function () {
              if (null !== br)
                try {
                  var e = cr();
                  br(!0, e), (br = null);
                } catch (e) {
                  throw (setTimeout(wr, 0), e);
                }
            }),
            (_r = Date.now()),
            (cr = function () {
              return Date.now() - _r;
            }),
            (fr.unstable_now = cr),
            (pr = function (e) {
              null !== br
                ? setTimeout(pr, 0, e)
                : ((br = e), setTimeout(wr, 0));
            }),
            (hr = function (e, t) {
              yr = setTimeout(e, t);
            }),
            (gr = function () {
              clearTimeout(yr);
            }),
            (mr = function () {
              return !1;
            }),
            (dr = function () {}),
            (vr = fr.unstable_forceFrameRate = dr))
          : ((xr = window.performance),
            (Sr = window.Date),
            (Pr = window.setTimeout),
            (kr = window.clearTimeout),
            "undefined" != typeof console &&
              ((Dr = window.cancelAnimationFrame),
              "function" != typeof window.requestAnimationFrame &&
                console.error(
                  "This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills"
                ),
              "function" != typeof Dr &&
                console.error(
                  "This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills"
                )),
            "object" == typeof xr && "function" == typeof xr.now
              ? ((cr = function () {
                  return xr.now();
                }),
                (fr.unstable_now = cr))
              : ((Ir = Sr.now()),
                (cr = function () {
                  return Sr.now() - Ir;
                }),
                (fr.unstable_now = cr)),
            (Er = !1),
            (Tr = null),
            (Cr = -1),
            (Fr = 5),
            (Ar = 0),
            (mr = function () {
              return cr() >= Ar;
            }),
            (vr = function () {}),
            (dr = function (e) {
              0 > e || 125 < e
                ? console.error(
                    "forceFrameRate takes a positive int between 0 and 125, forcing framerates higher than 125 fps is not unsupported"
                  )
                : (Fr = 0 < e ? Math.floor(1e3 / e) : 5);
            }),
            (fr.unstable_forceFrameRate = dr),
            (Or = new MessageChannel()),
            (Mr = Or.port2),
            (Or.port1.onmessage = function () {
              if (null !== Tr) {
                var e = cr();
                Ar = e + Fr;
                try {
                  Tr(!0, e) ? Mr.postMessage(null) : ((Er = !1), (Tr = null));
                } catch (e) {
                  throw (Mr.postMessage(null), e);
                }
              } else Er = !1;
            }),
            (pr = function (e) {
              (Tr = e), Er || ((Er = !0), Mr.postMessage(null));
            }),
            (hr = function (e, t) {
              Cr = Pr(function () {
                e(cr());
              }, t);
            }),
            (gr = function () {
              kr(Cr), (Cr = -1);
            })),
        (Rr = []),
        (Ur = []),
        (Nr = 1),
        (jr = null),
        (Lr = 3),
        (Br = !1),
        ($r = !1),
        (Vr = !1),
        (Hr = vr),
        5,
        (fr.unstable_IdlePriority = 5),
        1,
        (fr.unstable_ImmediatePriority = 1),
        4,
        (fr.unstable_LowPriority = 4),
        3,
        (fr.unstable_NormalPriority = 3),
        null,
        (fr.unstable_Profiling = null),
        2,
        (fr.unstable_UserBlockingPriority = 2),
        (zr = function (e) {
          e.callback = null;
        }),
        (fr.unstable_cancelCallback = zr),
        (qr = function () {
          $r || Br || (($r = !0), pr(lo));
        }),
        (fr.unstable_continueExecution = qr),
        (Gr = function () {
          return Lr;
        }),
        (fr.unstable_getCurrentPriorityLevel = Gr),
        (Wr = function () {
          return ro(Rr);
        }),
        (fr.unstable_getFirstCallbackNode = Wr),
        (Jr = function (e) {
          switch (Lr) {
            case 1:
            case 2:
            case 3:
              var t = 3;
              break;
            default:
              t = Lr;
          }
          var n = Lr;
          Lr = t;
          try {
            return e();
          } finally {
            Lr = n;
          }
        }),
        (fr.unstable_next = Jr),
        (Qr = function () {}),
        (fr.unstable_pauseExecution = Qr),
        (Yr = Hr),
        (fr.unstable_requestPaint = Yr),
        (Kr = function (e, t) {
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
          var n = Lr;
          Lr = e;
          try {
            return t();
          } finally {
            Lr = n;
          }
        }),
        (fr.unstable_runWithPriority = Kr),
        (Xr = function (e, t, n) {
          var r = cr();
          if ("object" == typeof n && null !== n) {
            var o = n.delay;
            (o = "number" == typeof o && 0 < o ? r + o : r),
              (n = "number" == typeof n.timeout ? n.timeout : uo(e));
          } else (n = uo(e)), (o = r);
          return (
            (e = {
              id: Nr++,
              callback: t,
              priorityLevel: e,
              startTime: o,
              expirationTime: (n = o + n),
              sortIndex: -1,
            }),
            o > r
              ? ((e.sortIndex = o),
                no(Ur, e),
                null === ro(Rr) &&
                  e === ro(Ur) &&
                  (Vr ? gr() : (Vr = !0), hr(so, o - r)))
              : ((e.sortIndex = n), no(Rr, e), $r || Br || (($r = !0), pr(lo))),
            e
          );
        }),
        (fr.unstable_scheduleCallback = Xr),
        (Zr = function () {
          var e = cr();
          ao(e);
          var t = ro(Rr);
          return (
            (t !== jr &&
              null !== jr &&
              null !== t &&
              null !== t.callback &&
              t.startTime <= e &&
              t.expirationTime < jr.expirationTime) ||
            mr()
          );
        }),
        (fr.unstable_shouldYield = Zr),
        (eo = function (e) {
          var t = Lr;
          return function () {
            var n = Lr;
            Lr = t;
            try {
              return e.apply(this, arguments);
            } finally {
              Lr = n;
            }
          };
        }),
        (fr.unstable_wrapCallback = eo)),
      fr
    );
  }
  var fo,
    po = !1;
  function ho() {
    return po || ((po = !0), (fo = {}), (fo = co())), fo;
  }
  var go,
    mo,
    vo,
    bo,
    yo,
    wo,
    _o,
    xo,
    So,
    Po,
    ko,
    Do,
    Io,
    Eo,
    To,
    Co,
    Fo,
    Ao,
    Oo,
    Mo,
    Ro,
    Uo,
    No,
    jo,
    Lo,
    Bo,
    $o,
    Vo,
    Ho,
    zo,
    qo,
    Go,
    Wo,
    Jo,
    Qo,
    Yo,
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
    xi,
    Si,
    Pi,
    ki,
    Di,
    Ii,
    Ei,
    Ti,
    Ci,
    Fi,
    Ai,
    Oi,
    Mi,
    Ri,
    Ui,
    Ni,
    ji,
    Li,
    Bi,
    $i,
    Vi,
    Hi,
    zi,
    qi,
    Gi,
    Wi,
    Ji,
    Qi,
    Yi,
    Ki,
    Xi,
    Zi,
    ea,
    ta,
    na,
    ra,
    oa,
    ia,
    aa,
    sa,
    la,
    ua,
    ca,
    da,
    fa,
    pa,
    ha,
    ga,
    ma,
    va,
    ba,
    ya,
    wa,
    _a,
    xa,
    Sa,
    Pa,
    ka,
    Da,
    Ia,
    Ea,
    Ta,
    Ca,
    Fa,
    Aa,
    Oa,
    Ma,
    Ra,
    Ua,
    Na,
    ja,
    La,
    Ba,
    $a,
    Va,
    Ha,
    za,
    qa,
    Ga,
    Wa,
    Ja,
    Qa,
    Ya,
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
    ws,
    _s,
    xs,
    Ss,
    Ps,
    ks,
    Ds,
    Is,
    Es,
    Ts,
    Cs,
    Fs,
    As,
    Os,
    Ms,
    Rs,
    Us,
    Ns,
    js,
    Ls,
    Bs,
    $s,
    Vs,
    Hs,
    zs,
    qs,
    Gs,
    Ws,
    Js,
    Qs,
    Ys,
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
    xl,
    Sl,
    Pl,
    kl,
    Dl,
    Il,
    El,
    Tl,
    Cl,
    Fl,
    Al,
    Ol,
    Ml,
    Rl,
    Ul,
    Nl,
    jl,
    Ll,
    Bl,
    $l,
    Vl,
    Hl,
    zl,
    ql,
    Gl,
    Wl,
    Jl,
    Ql,
    Yl,
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
    du = !1;
  function fu(e) {
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
  function pu(e, t, n, r, o, i, a, s, l) {
    var u = Array.prototype.slice.call(arguments, 3);
    try {
      t.apply(n, u);
    } catch (e) {
      this.onError(e);
    }
  }
  function hu(e, t, n, r, o, i, a, s, l) {
    (bo = !1), (yo = null), pu.apply(xo, arguments);
  }
  function gu(e, t, n) {
    var r = e.type || "unknown-event";
    (e.currentTarget = ko(n)),
      (function (e, t, n, r, o, i, a, s, l) {
        if ((hu.apply(this, arguments), bo)) {
          if (!bo) throw Error(fu(198));
          var u = yo;
          (bo = !1), (yo = null), wo || ((wo = !0), (_o = u));
        }
      })(r, t, void 0, e),
      (e.currentTarget = null);
  }
  function mu() {
    if (Do)
      for (var e in Io) {
        var t = Io[e],
          n = Do.indexOf(e);
        if (!(-1 < n)) throw Error(fu(96, e));
        if (!Eo[n]) {
          if (!t.extractEvents) throw Error(fu(97, e));
          for (var r in ((Eo[n] = t), (n = t.eventTypes))) {
            var o = void 0,
              i = n[r],
              a = t,
              s = r;
            if (To.hasOwnProperty(s)) throw Error(fu(99, s));
            To[s] = i;
            var l = i.phasedRegistrationNames;
            if (l) {
              for (o in l) l.hasOwnProperty(o) && vu(l[o], a, s);
              o = !0;
            } else
              i.registrationName
                ? (vu(i.registrationName, a, s), (o = !0))
                : (o = !1);
            if (!o) throw Error(fu(98, r, e));
          }
        }
      }
  }
  function vu(e, t, n) {
    if (Co[e]) throw Error(fu(100, e));
    (Co[e] = t), (Fo[e] = t.eventTypes[n].dependencies);
  }
  function bu(e) {
    var t,
      n = !1;
    for (t in e)
      if (e.hasOwnProperty(t)) {
        var r = e[t];
        if (!Io.hasOwnProperty(t) || Io[t] !== r) {
          if (Io[t]) throw Error(fu(102, t));
          (Io[t] = r), (n = !0);
        }
      }
    n && mu();
  }
  function yu(e) {
    if ((e = Po(e))) {
      if ("function" != typeof Oo) throw Error(fu(280));
      var t = e.stateNode;
      t && ((t = So(t)), Oo(e.stateNode, e.type, t));
    }
  }
  function wu(e) {
    Mo ? (Ro ? Ro.push(e) : (Ro = [e])) : (Mo = e);
  }
  function _u() {
    if (Mo) {
      var e = Mo,
        t = Ro;
      if (((Ro = Mo = null), yu(e), t)) for (e = 0; e < t.length; e++) yu(t[e]);
    }
  }
  function xu(e, t) {
    return e(t);
  }
  function Su(e, t, n, r, o) {
    return e(t, n, r, o);
  }
  function Pu() {}
  function ku() {
    (null === Mo && null === Ro) || (Pu(), _u());
  }
  function Du(e, t, n) {
    if (jo) return e(t, n);
    jo = !0;
    try {
      return Uo(e, t, n);
    } finally {
      (jo = !1), ku();
    }
  }
  function Iu(e, t, n, r, o, i) {
    (this.acceptsBooleans = 2 === t || 3 === t || 4 === t),
      (this.attributeName = r),
      (this.attributeNamespace = o),
      (this.mustUseProperty = n),
      (this.propertyName = e),
      (this.type = t),
      (this.sanitizeURL = i);
  }
  function Eu(e) {
    return e[1].toUpperCase();
  }
  function Tu(e, t, n, r) {
    var o = Ho.hasOwnProperty(t) ? Ho[t] : null;
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
              !!Bo.call(Vo, e) ||
              (!Bo.call($o, e) &&
                (Lo.test(e) ? (Vo[e] = !0) : (($o[e] = !0), !1)))
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
  function Cu(e) {
    return null === e || "object" != typeof e
      ? null
      : "function" == typeof (e = (li && e[li]) || e["@@iterator"])
      ? e
      : null;
  }
  function Fu(e) {
    if (null == e) return null;
    if ("function" == typeof e) return e.displayName || e.name || null;
    if ("string" == typeof e) return e;
    switch (e) {
      case Yo:
        return "Fragment";
      case Qo:
        return "Portal";
      case Xo:
        return "Profiler";
      case Ko:
        return "StrictMode";
      case ri:
        return "Suspense";
      case oi:
        return "SuspenseList";
    }
    if ("object" == typeof e)
      switch (e.$$typeof) {
        case ei:
          return "Context.Consumer";
        case Zo:
          return "Context.Provider";
        case ni:
          var t = e.render;
          return (
            (t = t.displayName || t.name || ""),
            e.displayName || ("" !== t ? "ForwardRef(" + t + ")" : "ForwardRef")
          );
        case ii:
          return Fu(e.type);
        case si:
          return Fu(e.render);
        case ai:
          if ((e = 1 === e._status ? e._result : null)) return Fu(e);
      }
    return null;
  }
  function Au(e) {
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
            i = Fu(e.type);
          (n = null),
            r && (n = Fu(r.type)),
            (r = i),
            (i = ""),
            o
              ? (i =
                  " (at " +
                  o.fileName.replace(Go, "") +
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
  function Ou(e) {
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
  function Mu(e) {
    var t = e.type;
    return (
      (e = e.nodeName) &&
      "input" === e.toLowerCase() &&
      ("checkbox" === t || "radio" === t)
    );
  }
  function Ru(e) {
    e._valueTracker ||
      (e._valueTracker = (function (e) {
        var t = Mu(e) ? "checked" : "value",
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
  function Uu(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var n = t.getValue(),
      r = "";
    return (
      e && (r = Mu(e) ? (e.checked ? "true" : "false") : e.value),
      (e = r) !== n && (t.setValue(e), !0)
    );
  }
  function Nu(e, t) {
    var n = t.checked;
    return vo({}, t, {
      defaultChecked: void 0,
      defaultValue: void 0,
      value: void 0,
      checked: null != n ? n : e._wrapperState.initialChecked,
    });
  }
  function ju(e, t) {
    var n = null == t.defaultValue ? "" : t.defaultValue,
      r = null != t.checked ? t.checked : t.defaultChecked;
    (n = Ou(null != t.value ? t.value : n)),
      (e._wrapperState = {
        initialChecked: r,
        initialValue: n,
        controlled:
          "checkbox" === t.type || "radio" === t.type
            ? null != t.checked
            : null != t.value,
      });
  }
  function Lu(e, t) {
    null != (t = t.checked) && Tu(e, "checked", t, !1);
  }
  function Bu(e, t) {
    Lu(e, t);
    var n = Ou(t.value),
      r = t.type;
    if (null != n)
      "number" === r
        ? ((0 === n && "" === e.value) || e.value != n) && (e.value = "" + n)
        : e.value !== "" + n && (e.value = "" + n);
    else if ("submit" === r || "reset" === r)
      return void e.removeAttribute("value");
    t.hasOwnProperty("value")
      ? Vu(e, t.type, n)
      : t.hasOwnProperty("defaultValue") && Vu(e, t.type, Ou(t.defaultValue)),
      null == t.checked &&
        null != t.defaultChecked &&
        (e.defaultChecked = !!t.defaultChecked);
  }
  function $u(e, t, n) {
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
  function Vu(e, t, n) {
    ("number" === t && e.ownerDocument.activeElement === e) ||
      (null == n
        ? (e.defaultValue = "" + e._wrapperState.initialValue)
        : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
  }
  function Hu(e, t) {
    return (
      (e = vo({ children: void 0 }, t)),
      (t = (function (e) {
        var t = "";
        return (
          mo.Children.forEach(e, function (e) {
            null != e && (t += e);
          }),
          t
        );
      })(t.children)) && (e.children = t),
      e
    );
  }
  function zu(e, t, n, r) {
    if (((e = e.options), t)) {
      t = {};
      for (var o = 0; o < n.length; o++) t["$" + n[o]] = !0;
      for (n = 0; n < e.length; n++)
        (o = t.hasOwnProperty("$" + e[n].value)),
          e[n].selected !== o && (e[n].selected = o),
          o && r && (e[n].defaultSelected = !0);
    } else {
      for (n = "" + Ou(n), t = null, o = 0; o < e.length; o++) {
        if (e[o].value === n)
          return (e[o].selected = !0), void (r && (e[o].defaultSelected = !0));
        null !== t || e[o].disabled || (t = e[o]);
      }
      null !== t && (t.selected = !0);
    }
  }
  function qu(e, t) {
    if (null != t.dangerouslySetInnerHTML) throw Error(fu(91));
    return vo({}, t, {
      value: void 0,
      defaultValue: void 0,
      children: "" + e._wrapperState.initialValue,
    });
  }
  function Gu(e, t) {
    var n = t.value;
    if (null == n) {
      if (((n = t.children), (t = t.defaultValue), null != n)) {
        if (null != t) throw Error(fu(92));
        if (Array.isArray(n)) {
          if (!(1 >= n.length)) throw Error(fu(93));
          n = n[0];
        }
        t = n;
      }
      null == t && (t = ""), (n = t);
    }
    e._wrapperState = { initialValue: Ou(n) };
  }
  function Wu(e, t) {
    var n = Ou(t.value),
      r = Ou(t.defaultValue);
    null != n &&
      ((n = "" + n) !== e.value && (e.value = n),
      null == t.defaultValue && e.defaultValue !== n && (e.defaultValue = n)),
      null != r && (e.defaultValue = "" + r);
  }
  function Ju(e) {
    var t = e.textContent;
    t === e._wrapperState.initialValue &&
      "" !== t &&
      null !== t &&
      (e.value = t);
  }
  function Qu(e) {
    switch (e) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function Yu(e, t) {
    return null == e || "http://www.w3.org/1999/xhtml" === e
      ? Qu(t)
      : "http://www.w3.org/2000/svg" === e && "foreignObject" === t
      ? "http://www.w3.org/1999/xhtml"
      : e;
  }
  function Ku(e, t) {
    if (t) {
      var n = e.firstChild;
      if (n && n === e.lastChild && 3 === n.nodeType)
        return void (n.nodeValue = t);
    }
    e.textContent = t;
  }
  function Xu(e, t) {
    var n = {};
    return (
      (n[e.toLowerCase()] = t.toLowerCase()),
      (n["Webkit" + e] = "webkit" + t),
      (n["Moz" + e] = "moz" + t),
      n
    );
  }
  function Zu(e) {
    if (pi[e]) return pi[e];
    if (!fi[e]) return e;
    var t,
      n = fi[e];
    for (t in n) if (n.hasOwnProperty(t) && t in hi) return (pi[e] = n[t]);
    return e;
  }
  function ec(e) {
    var t = wi.get(e);
    return void 0 === t && ((t = new Map()), wi.set(e, t)), t;
  }
  function tc(e) {
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
  function nc(e) {
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
  function rc(e) {
    if (tc(e) !== e) throw Error(fu(188));
  }
  function oc(e) {
    if (
      !(e = (function (e) {
        var t = e.alternate;
        if (!t) {
          if (null === (t = tc(e))) throw Error(fu(188));
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
              if (i === n) return rc(o), e;
              if (i === r) return rc(o), t;
              i = i.sibling;
            }
            throw Error(fu(188));
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
              if (!a) throw Error(fu(189));
            }
          }
          if (n.alternate !== r) throw Error(fu(190));
        }
        if (3 !== n.tag) throw Error(fu(188));
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
  function ic(e, t) {
    if (null == t) throw Error(fu(30));
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
  function ac(e, t, n) {
    Array.isArray(e) ? e.forEach(t, n) : e && t.call(n, e);
  }
  function sc(e) {
    if (e) {
      var t = e._dispatchListeners,
        n = e._dispatchInstances;
      if (Array.isArray(t))
        for (var r = 0; r < t.length && !e.isPropagationStopped(); r++)
          gu(e, t[r], n[r]);
      else t && gu(e, t, n);
      (e._dispatchListeners = null),
        (e._dispatchInstances = null),
        e.isPersistent() || e.constructor.release(e);
    }
  }
  function lc(e) {
    if ((null !== e && (_i = ic(_i, e)), (e = _i), (_i = null), e)) {
      if ((ac(e, sc), _i)) throw Error(fu(95));
      if (wo) throw ((e = _o), (wo = !1), (_o = null), e);
    }
  }
  function uc(e) {
    return (
      (e = e.target || e.srcElement || window).correspondingUseElement &&
        (e = e.correspondingUseElement),
      3 === e.nodeType ? e.parentNode : e
    );
  }
  function cc(e) {
    if (!Ao) return !1;
    var t = (e = "on" + e) in document;
    return (
      t ||
        ((t = document.createElement("div")).setAttribute(e, "return;"),
        (t = "function" == typeof t[e])),
      t
    );
  }
  function dc(e) {
    (e.topLevelType = null),
      (e.nativeEvent = null),
      (e.targetInst = null),
      (e.ancestors.length = 0),
      10 > xi.length && xi.push(e);
  }
  function fc(e, t, n, r) {
    if (xi.length) {
      var o = xi.pop();
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
  function pc(e) {
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
      (5 !== (t = n.tag) && 6 !== t) || e.ancestors.push(n), (n = Wc(r));
    } while (n);
    for (n = 0; n < e.ancestors.length; n++) {
      t = e.ancestors[n];
      var o = uc(e.nativeEvent);
      r = e.topLevelType;
      var i = e.nativeEvent,
        a = e.eventSystemFlags;
      0 === n && (a |= 64);
      for (var s = null, l = 0; l < Eo.length; l++) {
        var u = Eo[l];
        u && (u = u.extractEvents(r, t, i, o, a)) && (s = ic(s, u));
      }
      lc(s);
    }
  }
  function hc(e, t, n) {
    if (!n.has(e)) {
      switch (e) {
        case "scroll":
          Dc(t, "scroll", !0);
          break;
        case "focus":
        case "blur":
          Dc(t, "focus", !0),
            Dc(t, "blur", !0),
            n.set("blur", null),
            n.set("focus", null);
          break;
        case "cancel":
        case "close":
          cc(e) && Dc(t, e, !0);
          break;
        case "invalid":
        case "submit":
        case "reset":
          break;
        default:
          -1 === yi.indexOf(e) && kc(e, t);
      }
      n.set(e, null);
    }
  }
  function gc(e, t, n, r, o) {
    return {
      blockedOn: e,
      topLevelType: t,
      eventSystemFlags: 32 | n,
      nativeEvent: o,
      container: r,
    };
  }
  function mc(e, t) {
    switch (e) {
      case "focus":
      case "blur":
        Ei = null;
        break;
      case "dragenter":
      case "dragleave":
        Ti = null;
        break;
      case "mouseover":
      case "mouseout":
        Ci = null;
        break;
      case "pointerover":
      case "pointerout":
        Fi.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Ai.delete(t.pointerId);
    }
  }
  function vc(e, t, n, r, o, i) {
    return null === e || e.nativeEvent !== i
      ? ((e = gc(t, n, r, o, i)),
        null !== t && null !== (t = Jc(t)) && Pi(t),
        e)
      : ((e.eventSystemFlags |= r), e);
  }
  function bc(e) {
    var t = Wc(e.target);
    if (null !== t) {
      var n = tc(t);
      if (null !== n)
        if (13 === (t = n.tag)) {
          if (null !== (t = nc(n)))
            return (
              (e.blockedOn = t),
              void ho().unstable_runWithPriority(e.priority, function () {
                ki(n);
              })
            );
        } else if (3 === t && n.stateNode.hydrate)
          return void (e.blockedOn =
            3 === n.tag ? n.stateNode.containerInfo : null);
    }
    e.blockedOn = null;
  }
  function yc(e) {
    if (null !== e.blockedOn) return !1;
    var t = Cc(e.topLevelType, e.eventSystemFlags, e.container, e.nativeEvent);
    if (null !== t) {
      var n = Jc(t);
      return null !== n && Pi(n), (e.blockedOn = t), !1;
    }
    return !0;
  }
  function wc(e, t, n) {
    yc(e) && n.delete(t);
  }
  function _c() {
    for (Di = !1; 0 < Ii.length; ) {
      var e = Ii[0];
      if (null !== e.blockedOn) {
        null !== (e = Jc(e.blockedOn)) && Si(e);
        break;
      }
      var t = Cc(
        e.topLevelType,
        e.eventSystemFlags,
        e.container,
        e.nativeEvent
      );
      null !== t ? (e.blockedOn = t) : Ii.shift();
    }
    null !== Ei && yc(Ei) && (Ei = null),
      null !== Ti && yc(Ti) && (Ti = null),
      null !== Ci && yc(Ci) && (Ci = null),
      Fi.forEach(wc),
      Ai.forEach(wc);
  }
  function xc(e, t) {
    e.blockedOn === t &&
      ((e.blockedOn = null),
      Di ||
        ((Di = !0),
        ho().unstable_scheduleCallback(ho().unstable_NormalPriority, _c)));
  }
  function Sc(e) {
    function t(t) {
      return xc(t, e);
    }
    if (0 < Ii.length) {
      xc(Ii[0], e);
      for (var n = 1; n < Ii.length; n++) {
        var r = Ii[n];
        r.blockedOn === e && (r.blockedOn = null);
      }
    }
    for (
      null !== Ei && xc(Ei, e),
        null !== Ti && xc(Ti, e),
        null !== Ci && xc(Ci, e),
        Fi.forEach(t),
        Ai.forEach(t),
        n = 0;
      n < Oi.length;
      n++
    )
      (r = Oi[n]).blockedOn === e && (r.blockedOn = null);
    for (; 0 < Oi.length && null === (n = Oi[0]).blockedOn; )
      bc(n), null === n.blockedOn && Oi.shift();
  }
  function Pc(e, t) {
    for (var n = 0; n < e.length; n += 2) {
      var r = e[n],
        o = e[n + 1],
        i = "on" + (o[0].toUpperCase() + o.slice(1));
      (i = {
        phasedRegistrationNames: { bubbled: i, captured: i + "Capture" },
        dependencies: [r],
        eventPriority: t,
      }),
        ji.set(r, t),
        Ni.set(r, i),
        (Ui[o] = i);
    }
  }
  function kc(e, t) {
    Dc(t, e, !1);
  }
  function Dc(e, t, n) {
    var r = ji.get(t);
    switch (void 0 === r ? 2 : r) {
      case 0:
        r = Ic.bind(null, t, 1, e);
        break;
      case 1:
        r = Ec.bind(null, t, 1, e);
        break;
      default:
        r = Tc.bind(null, t, 1, e);
    }
    n ? e.addEventListener(t, r, !0) : e.addEventListener(t, r, !1);
  }
  function Ic(e, t, n, r) {
    No || Pu();
    var o = Tc,
      i = No;
    No = !0;
    try {
      Su(o, e, t, n, r);
    } finally {
      (No = i) || ku();
    }
  }
  function Ec(e, t, n, r) {
    Hi(Vi, Tc.bind(null, e, t, n, r));
  }
  function Tc(e, t, n, r) {
    if (zi)
      if (0 < Ii.length && -1 < Mi.indexOf(e))
        (e = gc(null, e, t, n, r)), Ii.push(e);
      else {
        var o = Cc(e, t, n, r);
        if (null === o) mc(e, r);
        else if (-1 < Mi.indexOf(e)) (e = gc(o, e, t, n, r)), Ii.push(e);
        else if (
          !(function (e, t, n, r, o) {
            switch (t) {
              case "focus":
                return (Ei = vc(Ei, e, t, n, r, o)), !0;
              case "dragenter":
                return (Ti = vc(Ti, e, t, n, r, o)), !0;
              case "mouseover":
                return (Ci = vc(Ci, e, t, n, r, o)), !0;
              case "pointerover":
                var i = o.pointerId;
                return Fi.set(i, vc(Fi.get(i) || null, e, t, n, r, o)), !0;
              case "gotpointercapture":
                return (
                  (i = o.pointerId),
                  Ai.set(i, vc(Ai.get(i) || null, e, t, n, r, o)),
                  !0
                );
            }
            return !1;
          })(o, e, t, n, r)
        ) {
          mc(e, r), (e = fc(e, r, null, t));
          try {
            Du(pc, e);
          } finally {
            dc(e);
          }
        }
      }
  }
  function Cc(e, t, n, r) {
    if (null !== (n = Wc((n = uc(r))))) {
      var o = tc(n);
      if (null === o) n = null;
      else {
        var i = o.tag;
        if (13 === i) {
          if (null !== (n = nc(o))) return n;
          n = null;
        } else if (3 === i) {
          if (o.stateNode.hydrate)
            return 3 === o.tag ? o.stateNode.containerInfo : null;
          n = null;
        } else o !== n && (n = null);
      }
    }
    e = fc(e, r, n, t);
    try {
      Du(pc, e);
    } finally {
      dc(e);
    }
    return null;
  }
  function Fc(e, t, n) {
    return null == t || "boolean" == typeof t || "" === t
      ? ""
      : n || "number" != typeof t || 0 === t || (qi.hasOwnProperty(e) && qi[e])
      ? ("" + t).trim()
      : t + "px";
  }
  function Ac(e, t) {
    for (var n in ((e = e.style), t))
      if (t.hasOwnProperty(n)) {
        var r = 0 === n.indexOf("--"),
          o = Fc(n, t[n], r);
        "float" === n && (n = "cssFloat"), r ? e.setProperty(n, o) : (e[n] = o);
      }
  }
  function Oc(e, t) {
    if (t) {
      if (Wi[e] && (null != t.children || null != t.dangerouslySetInnerHTML))
        throw Error(fu(137, e, ""));
      if (null != t.dangerouslySetInnerHTML) {
        if (null != t.children) throw Error(fu(60));
        if (
          "object" != typeof t.dangerouslySetInnerHTML ||
          !("__html" in t.dangerouslySetInnerHTML)
        )
          throw Error(fu(61));
      }
      if (null != t.style && "object" != typeof t.style)
        throw Error(fu(62, ""));
    }
  }
  function Mc(e, t) {
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
  function Rc(e, t) {
    var n = ec(
      (e = 9 === e.nodeType || 11 === e.nodeType ? e : e.ownerDocument)
    );
    t = Fo[t];
    for (var r = 0; r < t.length; r++) hc(t[r], e, n);
  }
  function Uc() {}
  function Nc(e) {
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
  function jc(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Lc(e, t) {
    var n,
      r = jc(e);
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
      r = jc(r);
    }
  }
  function Bc(e, t) {
    return (
      !(!e || !t) &&
      (e === t ||
        ((!e || 3 !== e.nodeType) &&
          (t && 3 === t.nodeType
            ? Bc(e, t.parentNode)
            : "contains" in e
            ? e.contains(t)
            : !!e.compareDocumentPosition &&
              !!(16 & e.compareDocumentPosition(t)))))
    );
  }
  function $c() {
    for (var e = window, t = Nc(); t instanceof e.HTMLIFrameElement; ) {
      try {
        var n = "string" == typeof t.contentWindow.location.href;
      } catch (e) {
        n = !1;
      }
      if (!n) break;
      t = Nc((e = t.contentWindow).document);
    }
    return t;
  }
  function Vc(e) {
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
  function Hc(e, t) {
    switch (e) {
      case "button":
      case "input":
      case "select":
      case "textarea":
        return !!t.autoFocus;
    }
    return !1;
  }
  function zc(e, t) {
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
  function qc(e) {
    for (; null != e; e = e.nextSibling) {
      var t = e.nodeType;
      if (1 === t || 3 === t) break;
    }
    return e;
  }
  function Gc(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
      if (8 === e.nodeType) {
        var n = e.data;
        if (n === Qi || n === Xi || n === Ki) {
          if (0 === t) return e;
          t--;
        } else n === Yi && t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  function Wc(e) {
    var t = e[oa];
    if (t) return t;
    for (var n = e.parentNode; n; ) {
      if ((t = n[aa] || n[oa])) {
        if (
          ((n = t.alternate),
          null !== t.child || (null !== n && null !== n.child))
        )
          for (e = Gc(e); null !== e; ) {
            if ((n = e[oa])) return n;
            e = Gc(e);
          }
        return t;
      }
      n = (e = n).parentNode;
    }
    return null;
  }
  function Jc(e) {
    return !(e = e[oa] || e[aa]) ||
      (5 !== e.tag && 6 !== e.tag && 13 !== e.tag && 3 !== e.tag)
      ? null
      : e;
  }
  function Qc(e) {
    if (5 === e.tag || 6 === e.tag) return e.stateNode;
    throw Error(fu(33));
  }
  function Yc(e) {
    return e[ia] || null;
  }
  function Kc(e) {
    do {
      e = e.return;
    } while (e && 5 !== e.tag);
    return e || null;
  }
  function Xc(e, t) {
    var n = e.stateNode;
    if (!n) return null;
    var r = So(n);
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
    if (n && "function" != typeof n) throw Error(fu(231, t, typeof n));
    return n;
  }
  function Zc(e, t, n) {
    (t = Xc(e, n.dispatchConfig.phasedRegistrationNames[t])) &&
      ((n._dispatchListeners = ic(n._dispatchListeners, t)),
      (n._dispatchInstances = ic(n._dispatchInstances, e)));
  }
  function ed(e) {
    if (e && e.dispatchConfig.phasedRegistrationNames) {
      for (var t = e._targetInst, n = []; t; ) n.push(t), (t = Kc(t));
      for (t = n.length; 0 < t--; ) Zc(n[t], "captured", e);
      for (t = 0; t < n.length; t++) Zc(n[t], "bubbled", e);
    }
  }
  function td(e, t, n) {
    e &&
      n &&
      n.dispatchConfig.registrationName &&
      (t = Xc(e, n.dispatchConfig.registrationName)) &&
      ((n._dispatchListeners = ic(n._dispatchListeners, t)),
      (n._dispatchInstances = ic(n._dispatchInstances, e)));
  }
  function nd(e) {
    e && e.dispatchConfig.registrationName && td(e._targetInst, null, e);
  }
  function rd(e) {
    ac(e, ed);
  }
  function od() {
    if (ua) return ua;
    var e,
      t,
      n = la,
      r = n.length,
      o = "value" in sa ? sa.value : sa.textContent,
      i = o.length;
    for (e = 0; e < r && n[e] === o[e]; e++);
    var a = r - e;
    for (t = 1; t <= a && n[r - t] === o[i - t]; t++);
    return (ua = o.slice(e, 1 < t ? 1 - t : void 0));
  }
  function id() {
    return !0;
  }
  function ad() {
    return !1;
  }
  function sd(e, t, n, r) {
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
        ? id
        : ad),
      (this.isPropagationStopped = ad),
      this
    );
  }
  function ld(e, t, n, r) {
    if (this.eventPool.length) {
      var o = this.eventPool.pop();
      return this.call(o, e, t, n, r), o;
    }
    return new this(e, t, n, r);
  }
  function ud(e) {
    if (!(e instanceof this)) throw Error(fu(279));
    e.destructor(), 10 > this.eventPool.length && this.eventPool.push(e);
  }
  function cd(e) {
    (e.eventPool = []), (e.getPooled = ld), (e.release = ud);
  }
  function dd(e, t) {
    switch (e) {
      case "keyup":
        return -1 !== fa.indexOf(t.keyCode);
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
  function fd(e) {
    return "object" == typeof (e = e.detail) && "data" in e ? e.data : null;
  }
  function pd(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return "input" === t ? !!xa[e.type] : "textarea" === t;
  }
  function hd(e, t, n) {
    return (
      ((e = sd.getPooled(Sa.change, e, t, n)).type = "change"), wu(n), rd(e), e
    );
  }
  function gd(e) {
    lc(e);
  }
  function md(e) {
    if (Uu(Qc(e))) return e;
  }
  function vd(e, t) {
    if ("change" === e) return t;
  }
  function bd() {
    Pa && (Pa.detachEvent("onpropertychange", yd), (ka = Pa = null));
  }
  function yd(e) {
    if ("value" === e.propertyName && md(ka))
      if (((e = hd(ka, e, uc(e))), No)) lc(e);
      else {
        No = !0;
        try {
          xu(gd, e);
        } finally {
          (No = !1), ku();
        }
      }
  }
  function wd(e, t, n) {
    "focus" === e
      ? (bd(), (ka = n), (Pa = t).attachEvent("onpropertychange", yd))
      : "blur" === e && bd();
  }
  function _d(e) {
    if ("selectionchange" === e || "keyup" === e || "keydown" === e)
      return md(ka);
  }
  function xd(e, t) {
    if ("click" === e) return md(t);
  }
  function Sd(e, t) {
    if ("input" === e || "change" === e) return md(t);
  }
  function Pd(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : !!(e = Ta[e]) && !!t[e];
  }
  function kd() {
    return Pd;
  }
  function Dd(e, t) {
    return (e === t && (0 !== e || 1 / e == 1 / t)) || (e != e && t != t);
  }
  function Id(e, t) {
    if (ja(e, t)) return !0;
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
      if (!La.call(t, n[r]) || !ja(e[n[r]], t[n[r]])) return !1;
    return !0;
  }
  function Ed(e, t) {
    var n =
      t.window === t ? t.document : 9 === t.nodeType ? t : t.ownerDocument;
    return qa || null == Va || Va !== Nc(n)
      ? null
      : ("selectionStart" in (n = Va) && Vc(n)
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
        za && Id(za, n)
          ? null
          : ((za = n),
            ((e = sd.getPooled($a.select, Ha, e, t)).type = "select"),
            (e.target = Va),
            rd(e),
            e));
  }
  function Td(e) {
    var t = e.keyCode;
    return (
      "charCode" in e
        ? 0 === (e = e.charCode) && 13 === t && (e = 13)
        : (e = t),
      10 === e && (e = 13),
      32 <= e || 13 === e ? e : 0
    );
  }
  function Cd(e) {
    0 > is || ((e.current = os[is]), (os[is] = null), is--);
  }
  function Fd(e, t) {
    is++, (os[is] = e.current), (e.current = t);
  }
  function Ad(e, t) {
    var n = e.type.contextTypes;
    if (!n) return as;
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
  function Od(e) {
    return null != (e = e.childContextTypes);
  }
  function Md() {
    Cd(ls), Cd(ss);
  }
  function Rd(e, t, n) {
    if (ss.current !== as) throw Error(fu(168));
    Fd(ss, t), Fd(ls, n);
  }
  function Ud(e, t, n) {
    var r = e.stateNode;
    if (((e = t.childContextTypes), "function" != typeof r.getChildContext))
      return n;
    for (var o in (r = r.getChildContext()))
      if (!(o in e)) throw Error(fu(108, Fu(t) || "Unknown", o));
    return vo({}, n, {}, r);
  }
  function Nd(e) {
    return (
      (e =
        ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) ||
        as),
      (us = ss.current),
      Fd(ss, e),
      Fd(ls, ls.current),
      !0
    );
  }
  function jd(e, t, n) {
    var r = e.stateNode;
    if (!r) throw Error(fu(169));
    n
      ? ((e = Ud(e, t, us)),
        (r.__reactInternalMemoizedMergedChildContext = e),
        Cd(ls),
        Cd(ss),
        Fd(ss, e))
      : Cd(ls),
      Fd(ls, n);
  }
  function Ld() {
    switch (gs()) {
      case ms:
        return 99;
      case vs:
        return 98;
      case bs:
        return 97;
      case ys:
        return 96;
      case ws:
        return 95;
      default:
        throw Error(fu(332));
    }
  }
  function Bd(e) {
    switch (e) {
      case 99:
        return ms;
      case 98:
        return vs;
      case 97:
        return bs;
      case 96:
        return ys;
      case 95:
        return ws;
      default:
        throw Error(fu(332));
    }
  }
  function $d(e, t) {
    return (e = Bd(e)), cs(e, t);
  }
  function Vd(e, t, n) {
    return (e = Bd(e)), ds(e, t, n);
  }
  function Hd(e) {
    return null === Ps ? ((Ps = [e]), (ks = ds(ms, qd))) : Ps.push(e), _s;
  }
  function zd() {
    if (null !== ks) {
      var e = ks;
      (ks = null), fs(e);
    }
    qd();
  }
  function qd() {
    if (!Ds && null !== Ps) {
      Ds = !0;
      var e = 0;
      try {
        var t = Ps;
        $d(99, function () {
          for (; e < t.length; e++) {
            var n = t[e];
            do {
              n = n(!0);
            } while (null !== n);
          }
        }),
          (Ps = null);
      } catch (t) {
        throw (null !== Ps && (Ps = Ps.slice(e + 1)), ds(ms, zd), t);
      } finally {
        Ds = !1;
      }
    }
  }
  function Gd(e, t, n) {
    return 1073741821 - (1 + (((1073741821 - e + t / 10) / (n /= 10)) | 0)) * n;
  }
  function Wd(e, t) {
    if (e && e.defaultProps)
      for (var n in ((t = vo({}, t)), (e = e.defaultProps)))
        void 0 === t[n] && (t[n] = e[n]);
    return t;
  }
  function Jd() {
    As = Fs = Cs = null;
  }
  function Qd(e) {
    var t = Ts.current;
    Cd(Ts), (e.type._context._currentValue = t);
  }
  function Yd(e, t) {
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
  function Kd(e, t) {
    (Cs = e),
      (As = Fs = null),
      null !== (e = e.dependencies) &&
        null !== e.firstContext &&
        (e.expirationTime >= t && (al = !0), (e.firstContext = null));
  }
  function Xd(e, t) {
    if (As !== e && !1 !== t && 0 !== t)
      if (
        (("number" == typeof t && 1073741823 !== t) ||
          ((As = e), (t = 1073741823)),
        (t = { context: e, observedBits: t, next: null }),
        null === Fs)
      ) {
        if (null === Cs) throw Error(fu(308));
        (Fs = t),
          (Cs.dependencies = {
            expirationTime: 0,
            firstContext: t,
            responders: null,
          });
      } else Fs = Fs.next = t;
    return e._currentValue;
  }
  function Zd(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      baseQueue: null,
      shared: { pending: null },
      effects: null,
    };
  }
  function ef(e, t) {
    (e = e.updateQueue),
      t.updateQueue === e &&
        (t.updateQueue = {
          baseState: e.baseState,
          baseQueue: e.baseQueue,
          shared: e.shared,
          effects: e.effects,
        });
  }
  function tf(e, t) {
    return ((e = {
      expirationTime: e,
      suspenseConfig: t,
      tag: 0,
      payload: null,
      callback: null,
      next: null,
    }).next = e);
  }
  function nf(e, t) {
    if (null !== (e = e.updateQueue)) {
      var n = (e = e.shared).pending;
      null === n ? (t.next = t) : ((t.next = n.next), (n.next = t)),
        (e.pending = t);
    }
  }
  function rf(e, t) {
    var n = e.alternate;
    null !== n && ef(n, e),
      null === (n = (e = e.updateQueue).baseQueue)
        ? ((e.baseQueue = t.next = t), (t.next = t))
        : ((t.next = n.next), (n.next = t));
  }
  function of(e, t, n, r) {
    var o = e.updateQueue;
    Os = !1;
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
              Gp(a, p.suspenseConfig);
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
                  l = vo({}, l, a);
                  break e;
                case 2:
                  Os = !0;
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
        Wp(u),
        (e.expirationTime = u),
        (e.memoizedState = l);
    }
  }
  function af(e, t, n) {
    if (((e = t.effects), (t.effects = null), null !== e))
      for (t = 0; t < e.length; t++) {
        var r = e[t],
          o = r.callback;
        if (null !== o) {
          if (((r.callback = null), (r = o), (o = n), "function" != typeof r))
            throw Error(fu(191, r));
          r.call(o);
        }
      }
  }
  function sf(e, t, n, r) {
    (n = null == (n = n(r, (t = e.memoizedState))) ? t : vo({}, t, n)),
      (e.memoizedState = n),
      0 === e.expirationTime && (e.updateQueue.baseState = n);
  }
  function lf(e, t, n, r, o, i, a) {
    return "function" == typeof (e = e.stateNode).shouldComponentUpdate
      ? e.shouldComponentUpdate(r, i, a)
      : !t.prototype ||
          !t.prototype.isPureReactComponent ||
          !Id(n, r) ||
          !Id(o, i);
  }
  function uf(e, t, n) {
    var r = !1,
      o = as,
      i = t.contextType;
    return (
      "object" == typeof i && null !== i
        ? (i = Xd(i))
        : ((o = Od(t) ? us : ss.current),
          (i = (r = null != (r = t.contextTypes)) ? Ad(e, o) : as)),
      (t = new t(n, i)),
      (e.memoizedState =
        null !== t.state && void 0 !== t.state ? t.state : null),
      (t.updater = Us),
      (e.stateNode = t),
      (t._reactInternalFiber = e),
      r &&
        (((e = e.stateNode).__reactInternalMemoizedUnmaskedChildContext = o),
        (e.__reactInternalMemoizedMaskedChildContext = i)),
      t
    );
  }
  function cf(e, t, n, r) {
    (e = t.state),
      "function" == typeof t.componentWillReceiveProps &&
        t.componentWillReceiveProps(n, r),
      "function" == typeof t.UNSAFE_componentWillReceiveProps &&
        t.UNSAFE_componentWillReceiveProps(n, r),
      t.state !== e && Us.enqueueReplaceState(t, t.state, null);
  }
  function df(e, t, n, r) {
    var o = e.stateNode;
    (o.props = n), (o.state = e.memoizedState), (o.refs = Rs), Zd(e);
    var i = t.contextType;
    "object" == typeof i && null !== i
      ? (o.context = Xd(i))
      : ((i = Od(t) ? us : ss.current), (o.context = Ad(e, i))),
      of(e, n, o, r),
      (o.state = e.memoizedState),
      "function" == typeof (i = t.getDerivedStateFromProps) &&
        (sf(e, t, i, n), (o.state = e.memoizedState)),
      "function" == typeof t.getDerivedStateFromProps ||
        "function" == typeof o.getSnapshotBeforeUpdate ||
        ("function" != typeof o.UNSAFE_componentWillMount &&
          "function" != typeof o.componentWillMount) ||
        ((t = o.state),
        "function" == typeof o.componentWillMount && o.componentWillMount(),
        "function" == typeof o.UNSAFE_componentWillMount &&
          o.UNSAFE_componentWillMount(),
        t !== o.state && Us.enqueueReplaceState(o, o.state, null),
        of(e, n, o, r),
        (o.state = e.memoizedState)),
      "function" == typeof o.componentDidMount && (e.effectTag |= 4);
  }
  function ff(e, t, n) {
    if (
      null !== (e = n.ref) &&
      "function" != typeof e &&
      "object" != typeof e
    ) {
      if (n._owner) {
        if ((n = n._owner)) {
          if (1 !== n.tag) throw Error(fu(309));
          var r = n.stateNode;
        }
        if (!r) throw Error(fu(147, e));
        var o = "" + e;
        return null !== t &&
          null !== t.ref &&
          "function" == typeof t.ref &&
          t.ref._stringRef === o
          ? t.ref
          : (((t = function (e) {
              var t = r.refs;
              t === Rs && (t = r.refs = {}),
                null === e ? delete t[o] : (t[o] = e);
            })._stringRef = o),
            t);
      }
      if ("string" != typeof e) throw Error(fu(284));
      if (!n._owner) throw Error(fu(290, e));
    }
    return e;
  }
  function pf(e, t) {
    if ("textarea" !== e.type)
      throw Error(
        fu(
          31,
          "[object Object]" === Object.prototype.toString.call(t)
            ? "object with keys {" + Object.keys(t).join(", ") + "}"
            : t,
          ""
        )
      );
  }
  function hf(e) {
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
      return ((e = dh(e, t)).index = 0), (e.sibling = null), e;
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
        ? (((t = hh(n, e.mode, r)).return = e), t)
        : (((t = o(t, n)).return = e), t);
    }
    function l(e, t, n, r) {
      return null !== t && t.elementType === n.type
        ? (((r = o(t, n.props)).ref = ff(e, t, n)), (r.return = e), r)
        : (((r = fh(n.type, n.key, n.props, null, e.mode, r)).ref = ff(
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
        ? (((t = gh(n, e.mode, r)).return = e), t)
        : (((t = o(t, n.children || [])).return = e), t);
    }
    function c(e, t, n, r, i) {
      return null === t || 7 !== t.tag
        ? (((t = ph(n, e.mode, r, i)).return = e), t)
        : (((t = o(t, n)).return = e), t);
    }
    function d(e, t, n) {
      if ("string" == typeof t || "number" == typeof t)
        return ((t = hh("" + t, e.mode, n)).return = e), t;
      if ("object" == typeof t && null !== t) {
        switch (t.$$typeof) {
          case Jo:
            return (
              ((n = fh(t.type, t.key, t.props, null, e.mode, n)).ref = ff(
                e,
                null,
                t
              )),
              (n.return = e),
              n
            );
          case Qo:
            return ((t = gh(t, e.mode, n)).return = e), t;
        }
        if (Ns(t) || Cu(t)) return ((t = ph(t, e.mode, n, null)).return = e), t;
        pf(e, t);
      }
      return null;
    }
    function f(e, t, n, r) {
      var o = null !== t ? t.key : null;
      if ("string" == typeof n || "number" == typeof n)
        return null !== o ? null : s(e, t, "" + n, r);
      if ("object" == typeof n && null !== n) {
        switch (n.$$typeof) {
          case Jo:
            return n.key === o
              ? n.type === Yo
                ? c(e, t, n.props.children, r, o)
                : l(e, t, n, r)
              : null;
          case Qo:
            return n.key === o ? u(e, t, n, r) : null;
        }
        if (Ns(n) || Cu(n)) return null !== o ? null : c(e, t, n, r, null);
        pf(e, n);
      }
      return null;
    }
    function p(e, t, n, r, o) {
      if ("string" == typeof r || "number" == typeof r)
        return s(t, (e = e.get(n) || null), "" + r, o);
      if ("object" == typeof r && null !== r) {
        switch (r.$$typeof) {
          case Jo:
            return (
              (e = e.get(null === r.key ? n : r.key) || null),
              r.type === Yo
                ? c(t, e, r.props.children, o, r.key)
                : l(t, e, r, o)
            );
          case Qo:
            return u(t, (e = e.get(null === r.key ? n : r.key) || null), r, o);
        }
        if (Ns(r) || Cu(r)) return c(t, (e = e.get(n) || null), r, o, null);
        pf(t, r);
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
      var u = Cu(s);
      if ("function" != typeof u) throw Error(fu(150));
      if (null == (s = u.call(s))) throw Error(fu(151));
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
        "object" == typeof i && null !== i && i.type === Yo && null === i.key;
      l && (i = i.props.children);
      var u = "object" == typeof i && null !== i;
      if (u)
        switch (i.$$typeof) {
          case Jo:
            e: {
              for (u = i.key, l = r; null !== l; ) {
                if (l.key === u) {
                  switch (l.tag) {
                    case 7:
                      if (i.type === Yo) {
                        n(e, l.sibling),
                          ((r = o(l, i.props.children)).return = e),
                          (e = r);
                        break e;
                      }
                      break;
                    default:
                      if (l.elementType === i.type) {
                        n(e, l.sibling),
                          ((r = o(l, i.props)).ref = ff(e, l, i)),
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
              i.type === Yo
                ? (((r = ph(i.props.children, e.mode, s, i.key)).return = e),
                  (e = r))
                : (((s = fh(i.type, i.key, i.props, null, e.mode, s)).ref = ff(
                    e,
                    r,
                    i
                  )),
                  (s.return = e),
                  (e = s));
            }
            return a(e);
          case Qo:
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
              ((r = gh(i, e.mode, s)).return = e), (e = r);
            }
            return a(e);
        }
      if ("string" == typeof i || "number" == typeof i)
        return (
          (i = "" + i),
          null !== r && 6 === r.tag
            ? (n(e, r.sibling), ((r = o(r, i)).return = e), (e = r))
            : (n(e, r), ((r = hh(i, e.mode, s)).return = e), (e = r)),
          a(e)
        );
      if (Ns(i)) return h(e, r, i, s);
      if (Cu(i)) return g(e, r, i, s);
      if ((u && pf(e, i), void 0 === i && !l))
        switch (e.tag) {
          case 1:
          case 0:
            throw (
              ((e = e.type),
              Error(fu(152, e.displayName || e.name || "Component")))
            );
        }
      return n(e, r);
    };
  }
  function gf(e) {
    if (e === Bs) throw Error(fu(174));
    return e;
  }
  function mf(e, t) {
    switch ((Fd(Hs, t), Fd(Vs, e), Fd($s, Bs), (e = t.nodeType))) {
      case 9:
      case 11:
        t = (t = t.documentElement) ? t.namespaceURI : Yu(null, "");
        break;
      default:
        t = Yu(
          (t = (e = 8 === e ? t.parentNode : t).namespaceURI || null),
          (e = e.tagName)
        );
    }
    Cd($s), Fd($s, t);
  }
  function vf() {
    Cd($s), Cd(Vs), Cd(Hs);
  }
  function bf(e) {
    gf(Hs.current);
    var t = gf($s.current),
      n = Yu(t, e.type);
    t !== n && (Fd(Vs, e), Fd($s, n));
  }
  function yf(e) {
    Vs.current === e && (Cd($s), Cd(Vs));
  }
  function wf(e) {
    for (var t = e; null !== t; ) {
      if (13 === t.tag) {
        var n = t.memoizedState;
        if (
          null !== n &&
          (null === (n = n.dehydrated) || n.data === Ki || n.data === Xi)
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
  function _f(e, t) {
    return { responder: e, props: t };
  }
  function xf() {
    throw Error(fu(321));
  }
  function Sf(e, t) {
    if (null === t) return !1;
    for (var n = 0; n < t.length && n < e.length; n++)
      if (!ja(e[n], t[n])) return !1;
    return !0;
  }
  function Pf(e, t, n, r, o, i) {
    if (
      ((Ws = i),
      (Js = t),
      (t.memoizedState = null),
      (t.updateQueue = null),
      (t.expirationTime = 0),
      (qs.current = null === e || null === e.memoizedState ? Zs : el),
      (e = n(r, o)),
      t.expirationTime === Ws)
    ) {
      i = 0;
      do {
        if (((t.expirationTime = 0), !(25 > i))) throw Error(fu(301));
        (i += 1),
          (Ys = Qs = null),
          (t.updateQueue = null),
          (qs.current = tl),
          (e = n(r, o));
      } while (t.expirationTime === Ws);
    }
    if (
      ((qs.current = Xs),
      (t = null !== Qs && null !== Qs.next),
      (Ws = 0),
      (Ys = Qs = Js = null),
      (Ks = !1),
      t)
    )
      throw Error(fu(300));
    return e;
  }
  function kf() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null,
    };
    return null === Ys ? (Js.memoizedState = Ys = e) : (Ys = Ys.next = e), Ys;
  }
  function Df() {
    if (null === Qs) {
      var e = Js.alternate;
      e = null !== e ? e.memoizedState : null;
    } else e = Qs.next;
    var t = null === Ys ? Js.memoizedState : Ys.next;
    if (null !== t) (Ys = t), (Qs = e);
    else {
      if (null === e) throw Error(fu(310));
      (e = {
        memoizedState: (Qs = e).memoizedState,
        baseState: Qs.baseState,
        baseQueue: Qs.baseQueue,
        queue: Qs.queue,
        next: null,
      }),
        null === Ys ? (Js.memoizedState = Ys = e) : (Ys = Ys.next = e);
    }
    return Ys;
  }
  function If(e, t) {
    return "function" == typeof t ? t(e) : t;
  }
  function Ef(e) {
    var t = Df(),
      n = t.queue;
    if (null === n) throw Error(fu(311));
    n.lastRenderedReducer = e;
    var r = Qs,
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
        if (u < Ws) {
          var c = {
            expirationTime: l.expirationTime,
            suspenseConfig: l.suspenseConfig,
            action: l.action,
            eagerReducer: l.eagerReducer,
            eagerState: l.eagerState,
            next: null,
          };
          null === s ? ((a = s = c), (i = r)) : (s = s.next = c),
            u > Js.expirationTime && ((Js.expirationTime = u), Wp(u));
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
            Gp(u, l.suspenseConfig),
            (r = l.eagerReducer === e ? l.eagerState : e(r, l.action));
        l = l.next;
      } while (null !== l && l !== o);
      null === s ? (i = r) : (s.next = a),
        ja(r, t.memoizedState) || (al = !0),
        (t.memoizedState = r),
        (t.baseState = i),
        (t.baseQueue = s),
        (n.lastRenderedState = r);
    }
    return [t.memoizedState, n.dispatch];
  }
  function Tf(e) {
    var t = Df(),
      n = t.queue;
    if (null === n) throw Error(fu(311));
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
      ja(i, t.memoizedState) || (al = !0),
        (t.memoizedState = i),
        null === t.baseQueue && (t.baseState = i),
        (n.lastRenderedState = i);
    }
    return [i, r];
  }
  function Cf(e) {
    var t = kf();
    return (
      "function" == typeof e && (e = e()),
      (t.memoizedState = t.baseState = e),
      (e = (e = t.queue =
        {
          pending: null,
          dispatch: null,
          lastRenderedReducer: If,
          lastRenderedState: e,
        }).dispatch =
        qf.bind(null, Js, e)),
      [t.memoizedState, e]
    );
  }
  function Ff(e, t, n, r) {
    return (
      (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
      null === (t = Js.updateQueue)
        ? ((t = { lastEffect: null }),
          (Js.updateQueue = t),
          (t.lastEffect = e.next = e))
        : null === (n = t.lastEffect)
        ? (t.lastEffect = e.next = e)
        : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e)),
      e
    );
  }
  function Af() {
    return Df().memoizedState;
  }
  function Of(e, t, n, r) {
    var o = kf();
    (Js.effectTag |= e),
      (o.memoizedState = Ff(1 | t, n, void 0, void 0 === r ? null : r));
  }
  function Mf(e, t, n, r) {
    var o = Df();
    r = void 0 === r ? null : r;
    var i = void 0;
    if (null !== Qs) {
      var a = Qs.memoizedState;
      if (((i = a.destroy), null !== r && Sf(r, a.deps)))
        return void Ff(t, n, i, r);
    }
    (Js.effectTag |= e), (o.memoizedState = Ff(1 | t, n, i, r));
  }
  function Rf(e, t) {
    return Of(516, 4, e, t);
  }
  function Uf(e, t) {
    return Mf(516, 4, e, t);
  }
  function Nf(e, t) {
    return Mf(4, 2, e, t);
  }
  function jf(e, t) {
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
  function Lf(e, t, n) {
    return (
      (n = null != n ? n.concat([e]) : null), Mf(4, 2, jf.bind(null, t, e), n)
    );
  }
  function Bf() {}
  function $f(e, t) {
    return (kf().memoizedState = [e, void 0 === t ? null : t]), e;
  }
  function Vf(e, t) {
    var n = Df();
    t = void 0 === t ? null : t;
    var r = n.memoizedState;
    return null !== r && null !== t && Sf(t, r[1])
      ? r[0]
      : ((n.memoizedState = [e, t]), e);
  }
  function Hf(e, t) {
    var n = Df();
    t = void 0 === t ? null : t;
    var r = n.memoizedState;
    return null !== r && null !== t && Sf(t, r[1])
      ? r[0]
      : ((e = e()), (n.memoizedState = [e, t]), e);
  }
  function zf(e, t, n) {
    var r = Ld();
    $d(98 > r ? 98 : r, function () {
      e(!0);
    }),
      $d(97 < r ? 97 : r, function () {
        var r = Gs.suspense;
        Gs.suspense = void 0 === t ? null : t;
        try {
          e(!1), n();
        } finally {
          Gs.suspense = r;
        }
      });
  }
  function qf(e, t, n) {
    var r = Op(),
      o = Ms.suspense;
    o = {
      expirationTime: (r = Mp(r, e, o)),
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
      e === Js || (null !== i && i === Js))
    )
      (Ks = !0), (o.expirationTime = Ws), (Js.expirationTime = Ws);
    else {
      if (
        0 === e.expirationTime &&
        (null === i || 0 === i.expirationTime) &&
        null !== (i = t.lastRenderedReducer)
      )
        try {
          var a = t.lastRenderedState,
            s = i(a, n);
          if (((o.eagerReducer = i), (o.eagerState = s), ja(s, a))) return;
        } catch (e) {}
      Rp(e, r);
    }
  }
  function Gf(e, t) {
    var n = uh(5, null, null, 0);
    (n.elementType = "DELETED"),
      (n.type = "DELETED"),
      (n.stateNode = t),
      (n.return = e),
      (n.effectTag = 8),
      null !== e.lastEffect
        ? ((e.lastEffect.nextEffect = n), (e.lastEffect = n))
        : (e.firstEffect = e.lastEffect = n);
  }
  function Wf(e, t) {
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
  function Jf(e) {
    if (ol) {
      var t = rl;
      if (t) {
        var n = t;
        if (!Wf(e, t)) {
          if (!(t = qc(n.nextSibling)) || !Wf(e, t))
            return (
              (e.effectTag = (-1025 & e.effectTag) | 2),
              (ol = !1),
              void (nl = e)
            );
          Gf(nl, n);
        }
        (nl = e), (rl = qc(t.firstChild));
      } else (e.effectTag = (-1025 & e.effectTag) | 2), (ol = !1), (nl = e);
    }
  }
  function Qf(e) {
    for (
      e = e.return;
      null !== e && 5 !== e.tag && 3 !== e.tag && 13 !== e.tag;

    )
      e = e.return;
    nl = e;
  }
  function Yf(e) {
    if (e !== nl) return !1;
    if (!ol) return Qf(e), (ol = !0), !1;
    var t = e.type;
    if (
      5 !== e.tag ||
      ("head" !== t && "body" !== t && !zc(t, e.memoizedProps))
    )
      for (t = rl; t; ) Gf(e, t), (t = qc(t.nextSibling));
    if ((Qf(e), 13 === e.tag)) {
      if (!(e = null !== (e = e.memoizedState) ? e.dehydrated : null))
        throw Error(fu(317));
      e: {
        for (e = e.nextSibling, t = 0; e; ) {
          if (8 === e.nodeType) {
            var n = e.data;
            if (n === Yi) {
              if (0 === t) {
                rl = qc(e.nextSibling);
                break e;
              }
              t--;
            } else (n !== Qi && n !== Xi && n !== Ki) || t++;
          }
          e = e.nextSibling;
        }
        rl = null;
      }
    } else rl = nl ? qc(e.stateNode.nextSibling) : null;
    return !0;
  }
  function Kf() {
    (rl = nl = null), (ol = !1);
  }
  function Xf(e, t, n, r) {
    t.child = null === e ? Ls(t, null, n, r) : js(t, e.child, n, r);
  }
  function Zf(e, t, n, r, o) {
    n = n.render;
    var i = t.ref;
    return (
      Kd(t, o),
      (r = Pf(e, t, n, r, i, o)),
      null === e || al
        ? ((t.effectTag |= 1), Xf(e, t, r, o), t.child)
        : ((t.updateQueue = e.updateQueue),
          (t.effectTag &= -517),
          e.expirationTime <= o && (e.expirationTime = 0),
          dp(e, t, o))
    );
  }
  function ep(e, t, n, r, o, i) {
    if (null === e) {
      var a = n.type;
      return "function" != typeof a ||
        ch(a) ||
        void 0 !== a.defaultProps ||
        null !== n.compare ||
        void 0 !== n.defaultProps
        ? (((e = fh(n.type, null, r, null, t.mode, i)).ref = t.ref),
          (e.return = t),
          (t.child = e))
        : ((t.tag = 15), (t.type = a), tp(e, t, a, r, o, i));
    }
    return (
      (a = e.child),
      o < i &&
      ((o = a.memoizedProps),
      (n = null !== (n = n.compare) ? n : Id)(o, r) && e.ref === t.ref)
        ? dp(e, t, i)
        : ((t.effectTag |= 1),
          ((e = dh(a, r)).ref = t.ref),
          (e.return = t),
          (t.child = e))
    );
  }
  function tp(e, t, n, r, o, i) {
    return null !== e &&
      Id(e.memoizedProps, r) &&
      e.ref === t.ref &&
      ((al = !1), o < i)
      ? ((t.expirationTime = e.expirationTime), dp(e, t, i))
      : rp(e, t, n, r, i);
  }
  function np(e, t) {
    var n = t.ref;
    ((null === e && null !== n) || (null !== e && e.ref !== n)) &&
      (t.effectTag |= 128);
  }
  function rp(e, t, n, r, o) {
    var i = Od(n) ? us : ss.current;
    return (
      (i = Ad(t, i)),
      Kd(t, o),
      (n = Pf(e, t, n, r, i, o)),
      null === e || al
        ? ((t.effectTag |= 1), Xf(e, t, n, o), t.child)
        : ((t.updateQueue = e.updateQueue),
          (t.effectTag &= -517),
          e.expirationTime <= o && (e.expirationTime = 0),
          dp(e, t, o))
    );
  }
  function op(e, t, n, r, o) {
    if (Od(n)) {
      var i = !0;
      Nd(t);
    } else i = !1;
    if ((Kd(t, o), null === t.stateNode))
      null !== e &&
        ((e.alternate = null), (t.alternate = null), (t.effectTag |= 2)),
        uf(t, n, r),
        df(t, n, r, o),
        (r = !0);
    else if (null === e) {
      var a = t.stateNode,
        s = t.memoizedProps;
      a.props = s;
      var l = a.context,
        u = n.contextType;
      "object" == typeof u && null !== u
        ? (u = Xd(u))
        : (u = Ad(t, (u = Od(n) ? us : ss.current)));
      var c = n.getDerivedStateFromProps,
        d =
          "function" == typeof c ||
          "function" == typeof a.getSnapshotBeforeUpdate;
      d ||
        ("function" != typeof a.UNSAFE_componentWillReceiveProps &&
          "function" != typeof a.componentWillReceiveProps) ||
        ((s !== r || l !== u) && cf(t, a, r, u)),
        (Os = !1);
      var f = t.memoizedState;
      (a.state = f),
        of(t, r, a, o),
        (l = t.memoizedState),
        s !== r || f !== l || ls.current || Os
          ? ("function" == typeof c && (sf(t, n, c, r), (l = t.memoizedState)),
            (s = Os || lf(t, n, s, r, f, l, u))
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
        ef(e, t),
        (s = t.memoizedProps),
        (a.props = t.type === t.elementType ? s : Wd(t.type, s)),
        (l = a.context),
        "object" == typeof (u = n.contextType) && null !== u
          ? (u = Xd(u))
          : (u = Ad(t, (u = Od(n) ? us : ss.current))),
        (d =
          "function" == typeof (c = n.getDerivedStateFromProps) ||
          "function" == typeof a.getSnapshotBeforeUpdate) ||
          ("function" != typeof a.UNSAFE_componentWillReceiveProps &&
            "function" != typeof a.componentWillReceiveProps) ||
          ((s !== r || l !== u) && cf(t, a, r, u)),
        (Os = !1),
        (l = t.memoizedState),
        (a.state = l),
        of(t, r, a, o),
        (f = t.memoizedState),
        s !== r || l !== f || ls.current || Os
          ? ("function" == typeof c && (sf(t, n, c, r), (f = t.memoizedState)),
            (c = Os || lf(t, n, s, r, l, f, u))
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
    return ip(e, t, n, r, i, o);
  }
  function ip(e, t, n, r, o, i) {
    np(e, t);
    var a = 0 != (64 & t.effectTag);
    if (!r && !a) return o && jd(t, n, !1), dp(e, t, i);
    (r = t.stateNode), (il.current = t);
    var s =
      a && "function" != typeof n.getDerivedStateFromError ? null : r.render();
    return (
      (t.effectTag |= 1),
      null !== e && a
        ? ((t.child = js(t, e.child, null, i)), (t.child = js(t, null, s, i)))
        : Xf(e, t, s, i),
      (t.memoizedState = r.state),
      o && jd(t, n, !0),
      t.child
    );
  }
  function ap(e) {
    var t = e.stateNode;
    t.pendingContext
      ? Rd(0, t.pendingContext, t.pendingContext !== t.context)
      : t.context && Rd(0, t.context, !1),
      mf(e, t.containerInfo);
  }
  function sp(e, t, n) {
    var r,
      o = t.mode,
      i = t.pendingProps,
      a = zs.current,
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
      Fd(zs, 1 & a),
      null === e)
    ) {
      if ((void 0 !== i.fallback && Jf(t), s)) {
        if (
          ((s = i.fallback),
          ((i = ph(null, o, 0, null)).return = t),
          0 == (2 & t.mode))
        )
          for (
            e = null !== t.memoizedState ? t.child.child : t.child, i.child = e;
            null !== e;

          )
            (e.return = i), (e = e.sibling);
        return (
          ((n = ph(s, o, n, null)).return = t),
          (i.sibling = n),
          (t.memoizedState = sl),
          (t.child = i),
          n
        );
      }
      return (
        (o = i.children),
        (t.memoizedState = null),
        (t.child = Ls(t, null, o, n))
      );
    }
    if (null !== e.memoizedState) {
      if (((o = (e = e.child).sibling), s)) {
        if (
          ((i = i.fallback),
          ((n = dh(e, e.pendingProps)).return = t),
          0 == (2 & t.mode) &&
            (s = null !== t.memoizedState ? t.child.child : t.child) !==
              e.child)
        )
          for (n.child = s; null !== s; ) (s.return = n), (s = s.sibling);
        return (
          ((o = dh(o, i)).return = t),
          (n.sibling = o),
          (n.childExpirationTime = 0),
          (t.memoizedState = sl),
          (t.child = n),
          o
        );
      }
      return (
        (n = js(t, e.child, i.children, n)),
        (t.memoizedState = null),
        (t.child = n)
      );
    }
    if (((e = e.child), s)) {
      if (
        ((s = i.fallback),
        ((i = ph(null, o, 0, null)).return = t),
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
        ((n = ph(s, o, n, null)).return = t),
        (i.sibling = n),
        (n.effectTag |= 2),
        (i.childExpirationTime = 0),
        (t.memoizedState = sl),
        (t.child = i),
        n
      );
    }
    return (t.memoizedState = null), (t.child = js(t, e, i.children, n));
  }
  function lp(e, t) {
    e.expirationTime < t && (e.expirationTime = t);
    var n = e.alternate;
    null !== n && n.expirationTime < t && (n.expirationTime = t),
      Yd(e.return, t);
  }
  function up(e, t, n, r, o, i) {
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
  function cp(e, t, n) {
    var r = t.pendingProps,
      o = r.revealOrder,
      i = r.tail;
    if ((Xf(e, t, r.children, n), 0 != (2 & (r = zs.current))))
      (r = (1 & r) | 2), (t.effectTag |= 64);
    else {
      if (null !== e && 0 != (64 & e.effectTag))
        e: for (e = t.child; null !== e; ) {
          if (13 === e.tag) null !== e.memoizedState && lp(e, n);
          else if (19 === e.tag) lp(e, n);
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
    if ((Fd(zs, r), 0 == (2 & t.mode))) t.memoizedState = null;
    else
      switch (o) {
        case "forwards":
          for (n = t.child, o = null; null !== n; )
            null !== (e = n.alternate) && null === wf(e) && (o = n),
              (n = n.sibling);
          null === (n = o)
            ? ((o = t.child), (t.child = null))
            : ((o = n.sibling), (n.sibling = null)),
            up(t, !1, o, n, i, t.lastEffect);
          break;
        case "backwards":
          for (n = null, o = t.child, t.child = null; null !== o; ) {
            if (null !== (e = o.alternate) && null === wf(e)) {
              t.child = o;
              break;
            }
            (e = o.sibling), (o.sibling = n), (n = o), (o = e);
          }
          up(t, !0, n, null, i, t.lastEffect);
          break;
        case "together":
          up(t, !1, null, null, void 0, t.lastEffect);
          break;
        default:
          t.memoizedState = null;
      }
    return t.child;
  }
  function dp(e, t, n) {
    null !== e && (t.dependencies = e.dependencies);
    var r = t.expirationTime;
    if ((0 !== r && Wp(r), t.childExpirationTime < n)) return null;
    if (null !== e && t.child !== e.child) throw Error(fu(153));
    if (null !== t.child) {
      for (
        n = dh((e = t.child), e.pendingProps), t.child = n, n.return = t;
        null !== e.sibling;

      )
        (e = e.sibling), ((n = n.sibling = dh(e, e.pendingProps)).return = t);
      n.sibling = null;
    }
    return t.child;
  }
  function fp(e, t) {
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
  function pp(e, t, n) {
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
        return Od(t.type) && Md(), null;
      case 3:
        return (
          vf(),
          Cd(ls),
          Cd(ss),
          (n = t.stateNode).pendingContext &&
            ((n.context = n.pendingContext), (n.pendingContext = null)),
          (null !== e && null !== e.child) || !Yf(t) || (t.effectTag |= 4),
          ul(t),
          null
        );
      case 5:
        yf(t), (n = gf(Hs.current));
        var o = t.type;
        if (null !== e && null != t.stateNode)
          cl(e, t, o, r, n), e.ref !== t.ref && (t.effectTag |= 128);
        else {
          if (!r) {
            if (null === t.stateNode) throw Error(fu(166));
            return null;
          }
          if (((e = gf($s.current)), Yf(t))) {
            (r = t.stateNode), (o = t.type);
            var i = t.memoizedProps;
            switch (((r[oa] = t), (r[ia] = i), o)) {
              case "iframe":
              case "object":
              case "embed":
                kc("load", r);
                break;
              case "video":
              case "audio":
                for (e = 0; e < yi.length; e++) kc(yi[e], r);
                break;
              case "source":
                kc("error", r);
                break;
              case "img":
              case "image":
              case "link":
                kc("error", r), kc("load", r);
                break;
              case "form":
                kc("reset", r), kc("submit", r);
                break;
              case "details":
                kc("toggle", r);
                break;
              case "input":
                ju(r, i), kc("invalid", r), Rc(n, "onChange");
                break;
              case "select":
                (r._wrapperState = { wasMultiple: !!i.multiple }),
                  kc("invalid", r),
                  Rc(n, "onChange");
                break;
              case "textarea":
                Gu(r, i), kc("invalid", r), Rc(n, "onChange");
            }
            for (var a in (Oc(o, i), (e = null), i))
              if (i.hasOwnProperty(a)) {
                var s = i[a];
                "children" === a
                  ? "string" == typeof s
                    ? r.textContent !== s && (e = ["children", s])
                    : "number" == typeof s &&
                      r.textContent !== "" + s &&
                      (e = ["children", "" + s])
                  : Co.hasOwnProperty(a) && null != s && Rc(n, a);
              }
            switch (o) {
              case "input":
                Ru(r), $u(r, i, !0);
                break;
              case "textarea":
                Ru(r), Ju(r);
                break;
              case "select":
              case "option":
                break;
              default:
                "function" == typeof i.onClick && (r.onclick = Uc);
            }
            (n = e), (t.updateQueue = n), null !== n && (t.effectTag |= 4);
          } else {
            switch (
              ((a = 9 === n.nodeType ? n : n.ownerDocument),
              e === Ji && (e = Qu(o)),
              e === Ji
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
              (e[oa] = t),
              (e[ia] = r),
              ll(e, t, !1, !1),
              (t.stateNode = e),
              (a = Mc(o, r)),
              o)
            ) {
              case "iframe":
              case "object":
              case "embed":
                kc("load", e), (s = r);
                break;
              case "video":
              case "audio":
                for (s = 0; s < yi.length; s++) kc(yi[s], e);
                s = r;
                break;
              case "source":
                kc("error", e), (s = r);
                break;
              case "img":
              case "image":
              case "link":
                kc("error", e), kc("load", e), (s = r);
                break;
              case "form":
                kc("reset", e), kc("submit", e), (s = r);
                break;
              case "details":
                kc("toggle", e), (s = r);
                break;
              case "input":
                ju(e, r), (s = Nu(e, r)), kc("invalid", e), Rc(n, "onChange");
                break;
              case "option":
                s = Hu(e, r);
                break;
              case "select":
                (e._wrapperState = { wasMultiple: !!r.multiple }),
                  (s = vo({}, r, { value: void 0 })),
                  kc("invalid", e),
                  Rc(n, "onChange");
                break;
              case "textarea":
                Gu(e, r), (s = qu(e, r)), kc("invalid", e), Rc(n, "onChange");
                break;
              default:
                s = r;
            }
            Oc(o, s);
            var l = s;
            for (i in l)
              if (l.hasOwnProperty(i)) {
                var u = l[i];
                "style" === i
                  ? Ac(e, u)
                  : "dangerouslySetInnerHTML" === i
                  ? null != (u = u ? u.__html : void 0) && di(e, u)
                  : "children" === i
                  ? "string" == typeof u
                    ? ("textarea" !== o || "" !== u) && Ku(e, u)
                    : "number" == typeof u && Ku(e, "" + u)
                  : "suppressContentEditableWarning" !== i &&
                    "suppressHydrationWarning" !== i &&
                    "autoFocus" !== i &&
                    (Co.hasOwnProperty(i)
                      ? null != u && Rc(n, i)
                      : null != u && Tu(e, i, u, a));
              }
            switch (o) {
              case "input":
                Ru(e), $u(e, r, !1);
                break;
              case "textarea":
                Ru(e), Ju(e);
                break;
              case "option":
                null != r.value && e.setAttribute("value", "" + Ou(r.value));
                break;
              case "select":
                (e.multiple = !!r.multiple),
                  null != (n = r.value)
                    ? zu(e, !!r.multiple, n, !1)
                    : null != r.defaultValue &&
                      zu(e, !!r.multiple, r.defaultValue, !0);
                break;
              default:
                "function" == typeof s.onClick && (e.onclick = Uc);
            }
            Hc(o, r) && (t.effectTag |= 4);
          }
          null !== t.ref && (t.effectTag |= 128);
        }
        return null;
      case 6:
        if (e && null != t.stateNode) dl(e, t, e.memoizedProps, r);
        else {
          if ("string" != typeof r && null === t.stateNode)
            throw Error(fu(166));
          (n = gf(Hs.current)),
            gf($s.current),
            Yf(t)
              ? ((n = t.stateNode),
                (r = t.memoizedProps),
                (n[oa] = t),
                n.nodeValue !== r && (t.effectTag |= 4))
              : (((n = (9 === n.nodeType ? n : n.ownerDocument).createTextNode(
                  r
                ))[oa] = t),
                (t.stateNode = n));
        }
        return null;
      case 13:
        return (
          Cd(zs),
          (r = t.memoizedState),
          0 != (64 & t.effectTag)
            ? ((t.expirationTime = n), t)
            : ((n = null !== r),
              (r = !1),
              null === e
                ? void 0 !== t.memoizedProps.fallback && Yf(t)
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
                0 != (1 & zs.current)
                  ? Fl === _l && (Fl = Pl)
                  : ((Fl !== _l && Fl !== Pl) || (Fl = kl),
                    0 !== Ul && null !== El && (bh(El, Cl), yh(El, Ul)))),
              (n || r) && (t.effectTag |= 4),
              null)
        );
      case 4:
        return vf(), ul(t), null;
      case 10:
        return Qd(t), null;
      case 17:
        return Od(t.type) && Md(), null;
      case 19:
        if ((Cd(zs), null === (r = t.memoizedState))) return null;
        if (((o = 0 != (64 & t.effectTag)), null === (i = r.rendering))) {
          if (o) fp(r, !1);
          else if (Fl !== _l || (null !== e && 0 != (64 & e.effectTag)))
            for (i = t.child; null !== i; ) {
              if (null !== (e = wf(i))) {
                for (
                  t.effectTag |= 64,
                    fp(r, !1),
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
                return Fd(zs, (1 & zs.current) | 2), t.child;
              }
              i = i.sibling;
            }
        } else {
          if (!o)
            if (null !== (e = wf(i))) {
              if (
                ((t.effectTag |= 64),
                (o = !0),
                null !== (n = e.updateQueue) &&
                  ((t.updateQueue = n), (t.effectTag |= 4)),
                fp(r, !0),
                null === r.tail && "hidden" === r.tailMode && !i.alternate)
              )
                return (
                  null !== (t = t.lastEffect = r.lastEffect) &&
                    (t.nextEffect = null),
                  null
                );
            } else
              2 * Es() - r.renderingStartTime > r.tailExpiration &&
                1 < n &&
                ((t.effectTag |= 64),
                (o = !0),
                fp(r, !1),
                (t.expirationTime = t.childExpirationTime = n - 1));
          r.isBackwards
            ? ((i.sibling = t.child), (t.child = i))
            : (null !== (n = r.last) ? (n.sibling = i) : (t.child = i),
              (r.last = i));
        }
        return null !== r.tail
          ? (0 === r.tailExpiration && (r.tailExpiration = Es() + 500),
            (n = r.tail),
            (r.rendering = n),
            (r.tail = n.sibling),
            (r.lastEffect = t.lastEffect),
            (r.renderingStartTime = Es()),
            (n.sibling = null),
            (t = zs.current),
            Fd(zs, o ? (1 & t) | 2 : 1 & t),
            n)
          : null;
    }
    throw Error(fu(156, t.tag));
  }
  function hp(e) {
    switch (e.tag) {
      case 1:
        Od(e.type) && Md();
        var t = e.effectTag;
        return 4096 & t ? ((e.effectTag = (-4097 & t) | 64), e) : null;
      case 3:
        if ((vf(), Cd(ls), Cd(ss), 0 != (64 & (t = e.effectTag))))
          throw Error(fu(285));
        return (e.effectTag = (-4097 & t) | 64), e;
      case 5:
        return yf(e), null;
      case 13:
        return (
          Cd(zs),
          4096 & (t = e.effectTag)
            ? ((e.effectTag = (-4097 & t) | 64), e)
            : null
        );
      case 19:
        return Cd(zs), null;
      case 4:
        return vf(), null;
      case 10:
        return Qd(e), null;
      default:
        return null;
    }
  }
  function gp(e, t) {
    return { value: e, source: t, stack: Au(t) };
  }
  function mp(e, t) {
    var n = t.source,
      r = t.stack;
    null === r && null !== n && (r = Au(n)),
      null !== n && Fu(n.type),
      (t = t.value),
      null !== e && 1 === e.tag && Fu(e.type);
    try {
      console.error(t);
    } catch (e) {
      setTimeout(function () {
        throw e;
      });
    }
  }
  function vp(e) {
    var t = e.ref;
    if (null !== t)
      if ("function" == typeof t)
        try {
          t(null);
        } catch (t) {
          ih(e, t);
        }
      else t.current = null;
  }
  function bp(e, t) {
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
            t.elementType === t.type ? n : Wd(t.type, n),
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
    throw Error(fu(163));
  }
  function yp(e, t) {
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
  function wp(e, t) {
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
  function _p(e, t, n) {
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
      case 22:
        return void wp(3, n);
      case 1:
        if (((e = n.stateNode), 4 & n.effectTag))
          if (null === t) e.componentDidMount();
          else {
            var r =
              n.elementType === n.type
                ? t.memoizedProps
                : Wd(n.type, t.memoizedProps);
            e.componentDidUpdate(
              r,
              t.memoizedState,
              e.__reactInternalSnapshotBeforeUpdate
            );
          }
        return void (null !== (t = n.updateQueue) && af(n, t, e));
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
          af(n, t, e);
        }
        return;
      case 5:
        return (
          (e = n.stateNode),
          void (
            null === t &&
            4 & n.effectTag &&
            Hc(n.type, n.memoizedProps) &&
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
            null !== n && ((n = n.dehydrated), null !== n && Sc(n))))
        );
      case 19:
      case 17:
      case 20:
      case 21:
        return;
    }
    throw Error(fu(163));
  }
  function xp(e, t, n) {
    switch (("function" == typeof Zl && Zl(t), t.tag)) {
      case 0:
      case 11:
      case 14:
      case 15:
      case 22:
        if (null !== (e = t.updateQueue) && null !== (e = e.lastEffect)) {
          var r = e.next;
          $d(97 < n ? 97 : n, function () {
            var e = r;
            do {
              var n = e.destroy;
              if (void 0 !== n) {
                var o = t;
                try {
                  n();
                } catch (e) {
                  ih(o, e);
                }
              }
              e = e.next;
            } while (e !== r);
          });
        }
        break;
      case 1:
        vp(t),
          "function" == typeof (n = t.stateNode).componentWillUnmount &&
            (function (e, t) {
              try {
                (t.props = e.memoizedProps),
                  (t.state = e.memoizedState),
                  t.componentWillUnmount();
              } catch (t) {
                ih(e, t);
              }
            })(t, n);
        break;
      case 5:
        vp(t);
        break;
      case 4:
        Ep(e, t, n);
    }
  }
  function Sp(e) {
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
      null !== t && Sp(t);
  }
  function Pp(e) {
    return 5 === e.tag || 3 === e.tag || 4 === e.tag;
  }
  function kp(e) {
    e: {
      for (var t = e.return; null !== t; ) {
        if (Pp(t)) {
          var n = t;
          break e;
        }
        t = t.return;
      }
      throw Error(fu(160));
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
        throw Error(fu(161));
    }
    16 & n.effectTag && (Ku(t, ""), (n.effectTag &= -17));
    e: t: for (n = e; ; ) {
      for (; null === n.sibling; ) {
        if (null === n.return || Pp(n.return)) {
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
    r ? Dp(e, n, t) : Ip(e, n, t);
  }
  function Dp(e, t, n) {
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
              (t.onclick = Uc));
    else if (4 !== r && null !== (e = e.child))
      for (Dp(e, t, n), e = e.sibling; null !== e; )
        Dp(e, t, n), (e = e.sibling);
  }
  function Ip(e, t, n) {
    var r = e.tag,
      o = 5 === r || 6 === r;
    if (o)
      (e = o ? e.stateNode : e.stateNode.instance),
        t ? n.insertBefore(e, t) : n.appendChild(e);
    else if (4 !== r && null !== (e = e.child))
      for (Ip(e, t, n), e = e.sibling; null !== e; )
        Ip(e, t, n), (e = e.sibling);
  }
  function Ep(e, t, n) {
    for (var r, o, i = t, a = !1; ; ) {
      if (!a) {
        a = i.return;
        e: for (;;) {
          if (null === a) throw Error(fu(160));
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
          if ((xp(s, c, u), null !== c.child && 4 !== c.tag))
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
      } else if ((xp(e, i, n), null !== i.child)) {
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
  function Tp(e, t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
      case 22:
        return void yp(3, t);
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
              n[ia] = r,
                "input" === e &&
                  "radio" === r.type &&
                  null != r.name &&
                  Lu(n, r),
                Mc(e, o),
                t = Mc(e, r),
                o = 0;
              o < i.length;
              o += 2
            ) {
              var a = i[o],
                s = i[o + 1];
              "style" === a
                ? Ac(n, s)
                : "dangerouslySetInnerHTML" === a
                ? di(n, s)
                : "children" === a
                ? Ku(n, s)
                : Tu(n, a, s, t);
            }
            switch (e) {
              case "input":
                Bu(n, r);
                break;
              case "textarea":
                Wu(n, r);
                break;
              case "select":
                (t = n._wrapperState.wasMultiple),
                  (n._wrapperState.wasMultiple = !!r.multiple),
                  null != (e = r.value)
                    ? zu(n, !!r.multiple, e, !1)
                    : t !== !!r.multiple &&
                      (null != r.defaultValue
                        ? zu(n, !!r.multiple, r.defaultValue, !0)
                        : zu(n, !!r.multiple, r.multiple ? [] : "", !1));
            }
          }
        }
        return;
      case 6:
        if (null === t.stateNode) throw Error(fu(162));
        return void (t.stateNode.nodeValue = t.memoizedProps);
      case 3:
        return void (
          (t = t.stateNode).hydrate && ((t.hydrate = !1), Sc(t.containerInfo))
        );
      case 12:
        return;
      case 13:
        if (
          ((n = t),
          null === t.memoizedState
            ? (r = !1)
            : ((r = !0), (n = t.child), (jl = Es())),
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
                    (i.style.display = Fc("display", o)));
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
        return void Cp(t);
      case 19:
        return void Cp(t);
      case 17:
        return;
    }
    throw Error(fu(163));
  }
  function Cp(e) {
    var t = e.updateQueue;
    if (null !== t) {
      e.updateQueue = null;
      var n = e.stateNode;
      null === n && (n = e.stateNode = new fl()),
        t.forEach(function (t) {
          var r = sh.bind(null, e, t);
          n.has(t) || (n.add(t), t.then(r, r));
        });
    }
  }
  function Fp(e, t, n) {
    ((n = tf(n, null)).tag = 3), (n.payload = { element: null });
    var r = t.value;
    return (
      (n.callback = function () {
        $l || (($l = !0), (Vl = r)), mp(e, t);
      }),
      n
    );
  }
  function Ap(e, t, n) {
    (n = tf(n, null)).tag = 3;
    var r = e.type.getDerivedStateFromError;
    if ("function" == typeof r) {
      var o = t.value;
      n.payload = function () {
        return mp(e, t), r(o);
      };
    }
    var i = e.stateNode;
    return (
      null !== i &&
        "function" == typeof i.componentDidCatch &&
        (n.callback = function () {
          "function" != typeof r &&
            (null === Hl ? (Hl = new Set([this])) : Hl.add(this), mp(e, t));
          var n = t.stack;
          this.componentDidCatch(t.value, {
            componentStack: null !== n ? n : "",
          });
        }),
      n
    );
  }
  function Op() {
    return (Il & (yl | wl)) !== vl
      ? 1073741821 - ((Es() / 10) | 0)
      : 0 !== Yl
      ? Yl
      : (Yl = 1073741821 - ((Es() / 10) | 0));
  }
  function Mp(e, t, n) {
    if (0 == (2 & (t = t.mode))) return 1073741823;
    var r = Ld();
    if (0 == (4 & t)) return 99 === r ? 1073741823 : 1073741822;
    if ((Il & yl) !== vl) return Cl;
    if (null !== n) e = Gd(e, 0 | n.timeoutMs || 5e3, 250);
    else
      switch (r) {
        case 99:
          e = 1073741823;
          break;
        case 98:
          e = Gd(e, 150, 100);
          break;
        case 97:
        case 96:
          e = Gd(e, 5e3, 250);
          break;
        case 95:
          e = 2;
          break;
        default:
          throw Error(fu(326));
      }
    return null !== El && e === Cl && --e, e;
  }
  function Rp(e, t) {
    if (50 < Jl) throw ((Jl = 0), (Ql = null), Error(fu(185)));
    if (null !== (e = Up(e, t))) {
      var n = Ld();
      1073741823 === t
        ? (Il & bl) !== vl && (Il & (yl | wl)) === vl
          ? Bp(e)
          : (jp(e), Il === vl && zd())
        : jp(e),
        (4 & Il) === vl ||
          (98 !== n && 99 !== n) ||
          (null === Wl
            ? (Wl = new Map([[e, t]]))
            : (void 0 === (n = Wl.get(e)) || n > t) && Wl.set(e, t));
    }
  }
  function Up(e, t) {
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
      null !== o && (El === o && (Wp(t), Fl === kl && bh(o, Cl)), yh(o, t)), o
    );
  }
  function Np(e) {
    var t = e.lastExpiredTime;
    if (0 !== t) return t;
    if (!vh(e, (t = e.firstPendingTime))) return t;
    var n = e.lastPingedTime;
    return 2 >= (e = n > (e = e.nextKnownPendingLevel) ? n : e) && t !== e
      ? 0
      : e;
  }
  function jp(e) {
    if (0 !== e.lastExpiredTime)
      (e.callbackExpirationTime = 1073741823),
        (e.callbackPriority = 99),
        (e.callbackNode = Hd(Bp.bind(null, e)));
    else {
      var t = Np(e),
        n = e.callbackNode;
      if (0 === t)
        null !== n &&
          ((e.callbackNode = null),
          (e.callbackExpirationTime = 0),
          (e.callbackPriority = 90));
      else {
        var r = Op();
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
          n !== _s && fs(n);
        }
        (e.callbackExpirationTime = t),
          (e.callbackPriority = r),
          (t =
            1073741823 === t
              ? Hd(Bp.bind(null, e))
              : Vd(r, Lp.bind(null, e), {
                  timeout: 10 * (1073741821 - t) - Es(),
                })),
          (e.callbackNode = t);
      }
    }
  }
  function Lp(e, t) {
    if (((Yl = 0), t)) return wh(e, (t = Op())), jp(e), null;
    var n = Np(e);
    if (0 !== n) {
      if (((t = e.callbackNode), (Il & (yl | wl)) !== vl)) throw Error(fu(327));
      if ((nh(), (e === El && n === Cl) || Hp(e, n), null !== Tl)) {
        var r = Il;
        Il |= yl;
        for (var o = qp(); ; )
          try {
            Qp();
            break;
          } catch (t) {
            zp(e, t);
          }
        if ((Jd(), (Il = r), (gl.current = o), Fl === xl))
          throw ((t = Al), Hp(e, n), bh(e, n), jp(e), t);
        if (null === Tl)
          switch (
            ((o = e.finishedWork = e.current.alternate),
            (e.finishedExpirationTime = n),
            (r = Fl),
            (El = null),
            r)
          ) {
            case _l:
            case xl:
              throw Error(fu(345));
            case Sl:
              wh(e, 2 < n ? 2 : n);
              break;
            case Pl:
              if (
                (bh(e, n),
                n === (r = e.lastSuspendedTime) &&
                  (e.nextKnownPendingLevel = Xp(o)),
                1073741823 === Ol && 10 < (o = jl + Ll - Es()))
              ) {
                if (Nl) {
                  var i = e.lastPingedTime;
                  if (0 === i || i >= n) {
                    (e.lastPingedTime = n), Hp(e, n);
                    break;
                  }
                }
                if (0 !== (i = Np(e)) && i !== n) break;
                if (0 !== r && r !== n) {
                  e.lastPingedTime = r;
                  break;
                }
                e.timeoutHandle = ta(Zp.bind(null, e), o);
                break;
              }
              Zp(e);
              break;
            case kl:
              if (
                (bh(e, n),
                n === (r = e.lastSuspendedTime) &&
                  (e.nextKnownPendingLevel = Xp(o)),
                Nl && (0 === (o = e.lastPingedTime) || o >= n))
              ) {
                (e.lastPingedTime = n), Hp(e, n);
                break;
              }
              if (0 !== (o = Np(e)) && o !== n) break;
              if (0 !== r && r !== n) {
                e.lastPingedTime = r;
                break;
              }
              if (
                (1073741823 !== Ml
                  ? (r = 10 * (1073741821 - Ml) - Es())
                  : 1073741823 === Ol
                  ? (r = 0)
                  : ((r = 10 * (1073741821 - Ol) - 5e3),
                    0 > (r = (o = Es()) - r) && (r = 0),
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
                          : 1960 * hl(r / 1960)) - r) && (r = n)),
                10 < r)
              ) {
                e.timeoutHandle = ta(Zp.bind(null, e), r);
                break;
              }
              Zp(e);
              break;
            case Dl:
              if (1073741823 !== Ol && null !== Rl) {
                i = Ol;
                var a = Rl;
                if (
                  (0 >= (r = 0 | a.busyMinDurationMs)
                    ? (r = 0)
                    : ((o = 0 | a.busyDelayMs),
                      (r =
                        (i =
                          Es() -
                          (10 * (1073741821 - i) - (0 | a.timeoutMs || 5e3))) <=
                        o
                          ? 0
                          : o + r - i)),
                  10 < r)
                ) {
                  bh(e, n), (e.timeoutHandle = ta(Zp.bind(null, e), r));
                  break;
                }
              }
              Zp(e);
              break;
            default:
              throw Error(fu(329));
          }
        if ((jp(e), e.callbackNode === t)) return Lp.bind(null, e);
      }
    }
    return null;
  }
  function Bp(e) {
    var t = e.lastExpiredTime;
    if (((t = 0 !== t ? t : 1073741823), (Il & (yl | wl)) !== vl))
      throw Error(fu(327));
    if ((nh(), (e === El && t === Cl) || Hp(e, t), null !== Tl)) {
      var n = Il;
      Il |= yl;
      for (var r = qp(); ; )
        try {
          Jp();
          break;
        } catch (t) {
          zp(e, t);
        }
      if ((Jd(), (Il = n), (gl.current = r), Fl === xl))
        throw ((n = Al), Hp(e, t), bh(e, t), jp(e), n);
      if (null !== Tl) throw Error(fu(261));
      (e.finishedWork = e.current.alternate),
        (e.finishedExpirationTime = t),
        (El = null),
        Zp(e),
        jp(e);
    }
    return null;
  }
  function $p(e, t) {
    var n = Il;
    Il |= 1;
    try {
      return e(t);
    } finally {
      (Il = n) === vl && zd();
    }
  }
  function Vp(e, t) {
    var n = Il;
    (Il &= -2), (Il |= bl);
    try {
      return e(t);
    } finally {
      (Il = n) === vl && zd();
    }
  }
  function Hp(e, t) {
    (e.finishedWork = null), (e.finishedExpirationTime = 0);
    var n = e.timeoutHandle;
    if ((-1 !== n && ((e.timeoutHandle = -1), na(n)), null !== Tl))
      for (n = Tl.return; null !== n; ) {
        var r = n;
        switch (r.tag) {
          case 1:
            null != (r = r.type.childContextTypes) && Md();
            break;
          case 3:
            vf(), Cd(ls), Cd(ss);
            break;
          case 5:
            yf(r);
            break;
          case 4:
            vf();
            break;
          case 13:
          case 19:
            Cd(zs);
            break;
          case 10:
            Qd(r);
        }
        n = n.return;
      }
    (El = e),
      (Tl = dh(e.current, null)),
      (Cl = t),
      (Fl = _l),
      (Al = null),
      (Ml = Ol = 1073741823),
      (Rl = null),
      (Ul = 0),
      (Nl = !1);
  }
  function zp(e, t) {
    for (;;) {
      try {
        if ((Jd(), (qs.current = Xs), Ks))
          for (var n = Js.memoizedState; null !== n; ) {
            var r = n.queue;
            null !== r && (r.pending = null), (n = n.next);
          }
        if (
          ((Ws = 0),
          (Ys = Qs = Js = null),
          (Ks = !1),
          null === Tl || null === Tl.return)
        )
          return (Fl = xl), (Al = t), (Tl = null);
        e: {
          var o = e,
            i = Tl.return,
            a = Tl,
            s = t;
          if (
            ((t = Cl),
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
            var c = 0 != (1 & zs.current),
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
                      var v = tf(1073741823, null);
                      (v.tag = 2), nf(a, v);
                    }
                  a.expirationTime = 1073741823;
                  break e;
                }
                (s = void 0), (a = t);
                var b = o.pingCache;
                if (
                  (null === b
                    ? ((b = o.pingCache = new pl()),
                      (s = new Set()),
                      b.set(l, s))
                    : void 0 === (s = b.get(l)) &&
                      ((s = new Set()), b.set(l, s)),
                  !s.has(a))
                ) {
                  s.add(a);
                  var y = ah.bind(null, o, l, a);
                  l.then(y, y);
                }
                (d.effectTag |= 4096), (d.expirationTime = t);
                break e;
              }
              d = d.return;
            } while (null !== d);
            s = Error(
              (Fu(a.type) || "A React component") +
                " suspended while rendering, but no fallback UI was specified.\n\nAdd a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display." +
                Au(a)
            );
          }
          Fl !== Dl && (Fl = Sl), (s = gp(s, a)), (d = i);
          do {
            switch (d.tag) {
              case 3:
                (l = s),
                  (d.effectTag |= 4096),
                  (d.expirationTime = t),
                  rf(d, Fp(d, l, t));
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
                      (null === Hl || !Hl.has(_))))
                ) {
                  (d.effectTag |= 4096),
                    (d.expirationTime = t),
                    rf(d, Ap(d, l, t));
                  break e;
                }
            }
            d = d.return;
          } while (null !== d);
        }
        Tl = Kp(Tl);
      } catch (e) {
        t = e;
        continue;
      }
      break;
    }
  }
  function qp() {
    var e = gl.current;
    return (gl.current = Xs), null === e ? Xs : e;
  }
  function Gp(e, t) {
    e < Ol && 2 < e && (Ol = e),
      null !== t && e < Ml && 2 < e && ((Ml = e), (Rl = t));
  }
  function Wp(e) {
    e > Ul && (Ul = e);
  }
  function Jp() {
    for (; null !== Tl; ) Tl = Yp(Tl);
  }
  function Qp() {
    for (; null !== Tl && !xs(); ) Tl = Yp(Tl);
  }
  function Yp(e) {
    var t = Kl(e.alternate, e, Cl);
    return (
      (e.memoizedProps = e.pendingProps),
      null === t && (t = Kp(e)),
      (ml.current = null),
      t
    );
  }
  function Kp(e) {
    Tl = e;
    do {
      var t = Tl.alternate;
      if (((e = Tl.return), 0 == (2048 & Tl.effectTag))) {
        if (((t = pp(t, Tl, Cl)), 1 === Cl || 1 !== Tl.childExpirationTime)) {
          for (var n = 0, r = Tl.child; null !== r; ) {
            var o = r.expirationTime,
              i = r.childExpirationTime;
            o > n && (n = o), i > n && (n = i), (r = r.sibling);
          }
          Tl.childExpirationTime = n;
        }
        if (null !== t) return t;
        null !== e &&
          0 == (2048 & e.effectTag) &&
          (null === e.firstEffect && (e.firstEffect = Tl.firstEffect),
          null !== Tl.lastEffect &&
            (null !== e.lastEffect &&
              (e.lastEffect.nextEffect = Tl.firstEffect),
            (e.lastEffect = Tl.lastEffect)),
          1 < Tl.effectTag &&
            (null !== e.lastEffect
              ? (e.lastEffect.nextEffect = Tl)
              : (e.firstEffect = Tl),
            (e.lastEffect = Tl)));
      } else {
        if (null !== (t = hp(Tl))) return (t.effectTag &= 2047), t;
        null !== e &&
          ((e.firstEffect = e.lastEffect = null), (e.effectTag |= 2048));
      }
      if (null !== (t = Tl.sibling)) return t;
      Tl = e;
    } while (null !== Tl);
    return Fl === _l && (Fl = Dl), null;
  }
  function Xp(e) {
    var t = e.expirationTime;
    return t > (e = e.childExpirationTime) ? t : e;
  }
  function Zp(e) {
    var t = Ld();
    return $d(99, eh.bind(null, e, t)), null;
  }
  function eh(e, t) {
    do {
      nh();
    } while (null !== ql);
    if ((Il & (yl | wl)) !== vl) throw Error(fu(327));
    var n = e.finishedWork,
      r = e.finishedExpirationTime;
    if (null === n) return null;
    if (
      ((e.finishedWork = null), (e.finishedExpirationTime = 0), n === e.current)
    )
      throw Error(fu(177));
    (e.callbackNode = null),
      (e.callbackExpirationTime = 0),
      (e.callbackPriority = 90),
      (e.nextKnownPendingLevel = 0);
    var o = Xp(n);
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
      e === El && ((Tl = El = null), (Cl = 0)),
      1 < n.effectTag
        ? null !== n.lastEffect
          ? ((n.lastEffect.nextEffect = n), (o = n.firstEffect))
          : (o = n)
        : (o = n.firstEffect),
      null !== o)
    ) {
      var i = Il;
      (Il |= wl), (ml.current = null), (Zi = zi);
      var a = $c();
      if (Vc(a)) {
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
      (ea = { activeElementDetached: null, focusedElem: a, selectionRange: s }),
        (zi = !1),
        (Bl = o);
      do {
        try {
          th();
        } catch (e) {
          if (null === Bl) throw Error(fu(330));
          ih(Bl, e), (Bl = Bl.nextEffect);
        }
      } while (null !== Bl);
      Bl = o;
      do {
        try {
          for (a = e, s = t; null !== Bl; ) {
            var y = Bl.effectTag;
            if ((16 & y && Ku(Bl.stateNode, ""), 128 & y)) {
              var w = Bl.alternate;
              if (null !== w) {
                var _ = w.ref;
                null !== _ &&
                  ("function" == typeof _ ? _(null) : (_.current = null));
              }
            }
            switch (1038 & y) {
              case 2:
                kp(Bl), (Bl.effectTag &= -3);
                break;
              case 6:
                kp(Bl), (Bl.effectTag &= -3), Tp(Bl.alternate, Bl);
                break;
              case 1024:
                Bl.effectTag &= -1025;
                break;
              case 1028:
                (Bl.effectTag &= -1025), Tp(Bl.alternate, Bl);
                break;
              case 4:
                Tp(Bl.alternate, Bl);
                break;
              case 8:
                Ep(a, (u = Bl), s), Sp(u);
            }
            Bl = Bl.nextEffect;
          }
        } catch (e) {
          if (null === Bl) throw Error(fu(330));
          ih(Bl, e), (Bl = Bl.nextEffect);
        }
      } while (null !== Bl);
      if (
        ((_ = ea),
        (w = $c()),
        (y = _.focusedElem),
        (s = _.selectionRange),
        w !== y &&
          y &&
          y.ownerDocument &&
          Bc(y.ownerDocument.documentElement, y))
      ) {
        null !== s &&
          Vc(y) &&
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
              (u = Lc(y, a)),
              (c = Lc(y, s)),
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
      (zi = !!Zi), (ea = Zi = null), (e.current = n), (Bl = o);
      do {
        try {
          for (y = e; null !== Bl; ) {
            var x = Bl.effectTag;
            if ((36 & x && _p(y, Bl.alternate, Bl), 128 & x)) {
              w = void 0;
              var S = Bl.ref;
              if (null !== S) {
                var P = Bl.stateNode;
                switch (Bl.tag) {
                  case 5:
                    w = P;
                    break;
                  default:
                    w = P;
                }
                "function" == typeof S ? S(w) : (S.current = w);
              }
            }
            Bl = Bl.nextEffect;
          }
        } catch (e) {
          if (null === Bl) throw Error(fu(330));
          ih(Bl, e), (Bl = Bl.nextEffect);
        }
      } while (null !== Bl);
      (Bl = null), Ss(), (Il = i);
    } else e.current = n;
    if (zl) (zl = !1), (ql = e), (Gl = t);
    else
      for (Bl = o; null !== Bl; )
        (t = Bl.nextEffect), (Bl.nextEffect = null), (Bl = t);
    if (
      (0 === (t = e.firstPendingTime) && (Hl = null),
      1073741823 === t ? (e === Ql ? Jl++ : ((Jl = 0), (Ql = e))) : (Jl = 0),
      "function" == typeof Xl && Xl(n.stateNode, r),
      jp(e),
      $l)
    )
      throw (($l = !1), (e = Vl), (Vl = null), e);
    return (Il & bl) !== vl || zd(), null;
  }
  function th() {
    for (; null !== Bl; ) {
      var e = Bl.effectTag;
      0 != (256 & e) && bp(Bl.alternate, Bl),
        0 == (512 & e) ||
          zl ||
          ((zl = !0),
          Vd(97, function () {
            return nh(), null;
          })),
        (Bl = Bl.nextEffect);
    }
  }
  function nh() {
    if (90 !== Gl) {
      var e = 97 < Gl ? 97 : Gl;
      return (Gl = 90), $d(e, rh);
    }
  }
  function rh() {
    if (null === ql) return !1;
    var e = ql;
    if (((ql = null), (Il & (yl | wl)) !== vl)) throw Error(fu(331));
    var t = Il;
    for (Il |= wl, e = e.current.firstEffect; null !== e; ) {
      try {
        var n = e;
        if (0 != (512 & n.effectTag))
          switch (n.tag) {
            case 0:
            case 11:
            case 15:
            case 22:
              yp(5, n), wp(5, n);
          }
      } catch (t) {
        if (null === e) throw Error(fu(330));
        ih(e, t);
      }
      (n = e.nextEffect), (e.nextEffect = null), (e = n);
    }
    return (Il = t), zd(), !0;
  }
  function oh(e, t, n) {
    nf(e, (t = Fp(e, (t = gp(n, t)), 1073741823))),
      null !== (e = Up(e, 1073741823)) && jp(e);
  }
  function ih(e, t) {
    if (3 === e.tag) oh(e, e, t);
    else
      for (var n = e.return; null !== n; ) {
        if (3 === n.tag) {
          oh(n, e, t);
          break;
        }
        if (1 === n.tag) {
          var r = n.stateNode;
          if (
            "function" == typeof n.type.getDerivedStateFromError ||
            ("function" == typeof r.componentDidCatch &&
              (null === Hl || !Hl.has(r)))
          ) {
            nf(n, (e = Ap(n, (e = gp(t, e)), 1073741823))),
              null !== (n = Up(n, 1073741823)) && jp(n);
            break;
          }
        }
        n = n.return;
      }
  }
  function ah(e, t, n) {
    var r = e.pingCache;
    null !== r && r.delete(t),
      El === e && Cl === n
        ? Fl === kl || (Fl === Pl && 1073741823 === Ol && Es() - jl < Ll)
          ? Hp(e, Cl)
          : (Nl = !0)
        : vh(e, n) &&
          ((0 !== (t = e.lastPingedTime) && t < n) ||
            ((e.lastPingedTime = n), jp(e)));
  }
  function sh(e, t) {
    var n = e.stateNode;
    null !== n && n.delete(t),
      0 === (t = 0) && (t = Mp((t = Op()), e, null)),
      null !== (e = Up(e, t)) && jp(e);
  }
  function lh(e, t, n, r) {
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
  function uh(e, t, n, r) {
    return new lh(e, t, n, r);
  }
  function ch(e) {
    return !(!(e = e.prototype) || !e.isReactComponent);
  }
  function dh(e, t) {
    var n = e.alternate;
    return (
      null === n
        ? (((n = uh(e.tag, t, e.key, e.mode)).elementType = e.elementType),
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
  function fh(e, t, n, r, o, i) {
    var a = 2;
    if (((r = e), "function" == typeof e)) ch(e) && (a = 1);
    else if ("string" == typeof e) a = 5;
    else
      e: switch (e) {
        case Yo:
          return ph(n.children, o, i, t);
        case ti:
          (a = 8), (o |= 7);
          break;
        case Ko:
          (a = 8), (o |= 1);
          break;
        case Xo:
          return (
            ((e = uh(12, n, t, 8 | o)).elementType = Xo),
            (e.type = Xo),
            (e.expirationTime = i),
            e
          );
        case ri:
          return (
            ((e = uh(13, n, t, o)).type = ri),
            (e.elementType = ri),
            (e.expirationTime = i),
            e
          );
        case oi:
          return (
            ((e = uh(19, n, t, o)).elementType = oi), (e.expirationTime = i), e
          );
        default:
          if ("object" == typeof e && null !== e)
            switch (e.$$typeof) {
              case Zo:
                a = 10;
                break e;
              case ei:
                a = 9;
                break e;
              case ni:
                a = 11;
                break e;
              case ii:
                a = 14;
                break e;
              case ai:
                (a = 16), (r = null);
                break e;
              case si:
                a = 22;
                break e;
            }
          throw Error(fu(130, null == e ? e : typeof e, ""));
      }
    return (
      ((t = uh(a, n, t, o)).elementType = e),
      (t.type = r),
      (t.expirationTime = i),
      t
    );
  }
  function ph(e, t, n, r) {
    return ((e = uh(7, e, r, t)).expirationTime = n), e;
  }
  function hh(e, t, n) {
    return ((e = uh(6, e, null, t)).expirationTime = n), e;
  }
  function gh(e, t, n) {
    return (
      ((t = uh(
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
  function mh(e, t, n) {
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
  function vh(e, t) {
    var n = e.firstSuspendedTime;
    return (e = e.lastSuspendedTime), 0 !== n && n >= t && e <= t;
  }
  function bh(e, t) {
    var n = e.firstSuspendedTime,
      r = e.lastSuspendedTime;
    n < t && (e.firstSuspendedTime = t),
      (r > t || 0 === n) && (e.lastSuspendedTime = t),
      t <= e.lastPingedTime && (e.lastPingedTime = 0),
      t <= e.lastExpiredTime && (e.lastExpiredTime = 0);
  }
  function yh(e, t) {
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
  function wh(e, t) {
    var n = e.lastExpiredTime;
    (0 === n || n > t) && (e.lastExpiredTime = t);
  }
  function _h(e, t, n, r) {
    var o = t.current,
      i = Op(),
      a = Ms.suspense;
    i = Mp(i, o, a);
    e: if (n) {
      t: {
        if (tc((n = n._reactInternalFiber)) !== n || 1 !== n.tag)
          throw Error(fu(170));
        var s = n;
        do {
          switch (s.tag) {
            case 3:
              s = s.stateNode.context;
              break t;
            case 1:
              if (Od(s.type)) {
                s = s.stateNode.__reactInternalMemoizedMergedChildContext;
                break t;
              }
          }
          s = s.return;
        } while (null !== s);
        throw Error(fu(171));
      }
      if (1 === n.tag) {
        var l = n.type;
        if (Od(l)) {
          n = Ud(n, l, s);
          break e;
        }
      }
      n = s;
    } else n = as;
    return (
      null === t.context ? (t.context = n) : (t.pendingContext = n),
      ((t = tf(i, a)).payload = { element: e }),
      null !== (r = void 0 === r ? null : r) && (t.callback = r),
      nf(o, t),
      Rp(o, i),
      i
    );
  }
  function xh(e) {
    if (!(e = e.current).child) return null;
    switch (e.child.tag) {
      case 5:
      default:
        return e.child.stateNode;
    }
  }
  function Sh(e, t) {
    null !== (e = e.memoizedState) &&
      null !== e.dehydrated &&
      e.retryTime < t &&
      (e.retryTime = t);
  }
  function Ph(e, t) {
    Sh(e, t), (e = e.alternate) && Sh(e, t);
  }
  function kh(e, t, n) {
    var r = new mh(e, t, (n = null != n && !0 === n.hydrate)),
      o = uh(3, null, null, 2 === t ? 7 : 1 === t ? 3 : 0);
    (r.current = o),
      (o.stateNode = r),
      Zd(o),
      (e[aa] = r.current),
      n &&
        0 !== t &&
        (function (e, t) {
          var n = ec(t);
          Mi.forEach(function (e) {
            hc(e, t, n);
          }),
            Ri.forEach(function (e) {
              hc(e, t, n);
            });
        })(0, 9 === e.nodeType ? e : e.ownerDocument),
      (this._internalRoot = r);
  }
  function Dh(e) {
    return !(
      !e ||
      (1 !== e.nodeType &&
        9 !== e.nodeType &&
        11 !== e.nodeType &&
        (8 !== e.nodeType || " react-mount-point-unstable " !== e.nodeValue))
    );
  }
  function Ih(e, t, n, r, o) {
    var i = n._reactRootContainer;
    if (i) {
      var a = i._internalRoot;
      if ("function" == typeof o) {
        var s = o;
        o = function () {
          var e = xh(a);
          s.call(e);
        };
      }
      _h(t, a, e, o);
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
            return new kh(e, 0, t ? { hydrate: !0 } : void 0);
          })(n, r)),
        (a = i._internalRoot),
        "function" == typeof o)
      ) {
        var l = o;
        o = function () {
          var e = xh(a);
          l.call(e);
        };
      }
      Vp(function () {
        _h(t, a, e, o);
      });
    }
    return xh(a);
  }
  function Eh(e, t, n) {
    var r =
      3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
    return {
      $$typeof: Qo,
      key: null == r ? null : "" + r,
      children: e,
      containerInfo: t,
      implementation: n,
    };
  }
  function Th(e, t) {
    var n =
      2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
    if (!Dh(t)) throw Error(fu(200));
    return Eh(e, t, null, n);
  }
  function Ch() {
    if (((go = {}), (mo = it()), (vo = B()), ho(), !mo)) throw Error(fu(227));
    var e;
    (bo = !1),
      (yo = null),
      (wo = !1),
      (_o = null),
      (xo = {
        onError: function (e) {
          (bo = !0), (yo = e);
        },
      }),
      (So = null),
      (Po = null),
      (ko = null),
      (Do = null),
      (Io = {}),
      (Eo = []),
      (To = {}),
      (Co = {}),
      (Fo = {}),
      (Ao = !(
        "undefined" == typeof window ||
        void 0 === window.document ||
        void 0 === window.document.createElement
      )),
      (Oo = null),
      (Mo = null),
      (Ro = null),
      (Uo = xu),
      (No = !1),
      (jo = !1),
      (Lo =
        /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/),
      (Bo = Object.prototype.hasOwnProperty),
      ($o = {}),
      (Vo = {}),
      (Ho = {}),
      "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
        .split(" ")
        .forEach(function (e) {
          Ho[e] = new Iu(e, 0, !1, e, null, !1);
        }),
      [
        ["acceptCharset", "accept-charset"],
        ["className", "class"],
        ["htmlFor", "for"],
        ["httpEquiv", "http-equiv"],
      ].forEach(function (e) {
        var t = e[0];
        Ho[t] = new Iu(t, 1, !1, e[1], null, !1);
      }),
      ["contentEditable", "draggable", "spellCheck", "value"].forEach(function (
        e
      ) {
        Ho[e] = new Iu(e, 2, !1, e.toLowerCase(), null, !1);
      }),
      [
        "autoReverse",
        "externalResourcesRequired",
        "focusable",
        "preserveAlpha",
      ].forEach(function (e) {
        Ho[e] = new Iu(e, 2, !1, e, null, !1);
      }),
      "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
        .split(" ")
        .forEach(function (e) {
          Ho[e] = new Iu(e, 3, !1, e.toLowerCase(), null, !1);
        }),
      ["checked", "multiple", "muted", "selected"].forEach(function (e) {
        Ho[e] = new Iu(e, 3, !0, e, null, !1);
      }),
      ["capture", "download"].forEach(function (e) {
        Ho[e] = new Iu(e, 4, !1, e, null, !1);
      }),
      ["cols", "rows", "size", "span"].forEach(function (e) {
        Ho[e] = new Iu(e, 6, !1, e, null, !1);
      }),
      ["rowSpan", "start"].forEach(function (e) {
        Ho[e] = new Iu(e, 5, !1, e.toLowerCase(), null, !1);
      }),
      (zo = /[\-:]([a-z])/g),
      "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
        .split(" ")
        .forEach(function (e) {
          var t = e.replace(zo, Eu);
          Ho[t] = new Iu(t, 1, !1, e, null, !1);
        }),
      "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
        .split(" ")
        .forEach(function (e) {
          var t = e.replace(zo, Eu);
          Ho[t] = new Iu(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1);
        }),
      ["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
        var t = e.replace(zo, Eu);
        Ho[t] = new Iu(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1);
      }),
      ["tabIndex", "crossOrigin"].forEach(function (e) {
        Ho[e] = new Iu(e, 1, !1, e.toLowerCase(), null, !1);
      }),
      (Ho.xlinkHref = new Iu(
        "xlinkHref",
        1,
        !1,
        "xlink:href",
        "http://www.w3.org/1999/xlink",
        !0
      )),
      ["src", "href", "action", "formAction"].forEach(function (e) {
        Ho[e] = new Iu(e, 1, !1, e.toLowerCase(), null, !0);
      }),
      (qo =
        mo.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED).hasOwnProperty(
        "ReactCurrentDispatcher"
      ) || (qo.ReactCurrentDispatcher = { current: null }),
      qo.hasOwnProperty("ReactCurrentBatchConfig") ||
        (qo.ReactCurrentBatchConfig = { suspense: null }),
      (Go = /^(.*)[\\\/]/),
      (Wo = "function" == typeof Symbol && Symbol.for),
      (Jo = Wo ? Symbol.for("react.element") : 60103),
      (Qo = Wo ? Symbol.for("react.portal") : 60106),
      (Yo = Wo ? Symbol.for("react.fragment") : 60107),
      (Ko = Wo ? Symbol.for("react.strict_mode") : 60108),
      (Xo = Wo ? Symbol.for("react.profiler") : 60114),
      (Zo = Wo ? Symbol.for("react.provider") : 60109),
      (ei = Wo ? Symbol.for("react.context") : 60110),
      (ti = Wo ? Symbol.for("react.concurrent_mode") : 60111),
      (ni = Wo ? Symbol.for("react.forward_ref") : 60112),
      (ri = Wo ? Symbol.for("react.suspense") : 60113),
      (oi = Wo ? Symbol.for("react.suspense_list") : 60120),
      (ii = Wo ? Symbol.for("react.memo") : 60115),
      (ai = Wo ? Symbol.for("react.lazy") : 60116),
      (si = Wo ? Symbol.for("react.block") : 60121),
      (li = "function" == typeof Symbol && Symbol.iterator),
      (ui = {
        html: "http://www.w3.org/1999/xhtml",
        mathml: "http://www.w3.org/1998/Math/MathML",
        svg: "http://www.w3.org/2000/svg",
      }),
      (e = function (e, t) {
        if (e.namespaceURI !== ui.svg || "innerHTML" in e) e.innerHTML = t;
        else {
          for (
            (ci = ci || document.createElement("div")).innerHTML =
              "<svg>" + t.valueOf().toString() + "</svg>",
              t = ci.firstChild;
            e.firstChild;

          )
            e.removeChild(e.firstChild);
          for (; t.firstChild; ) e.appendChild(t.firstChild);
        }
      }),
      (di =
        "undefined" != typeof MSApp && MSApp.execUnsafeLocalFunction
          ? function (t, n, r, o) {
              MSApp.execUnsafeLocalFunction(function () {
                return e(t, n);
              });
            }
          : e),
      (fi = {
        animationend: Xu("Animation", "AnimationEnd"),
        animationiteration: Xu("Animation", "AnimationIteration"),
        animationstart: Xu("Animation", "AnimationStart"),
        transitionend: Xu("Transition", "TransitionEnd"),
      }),
      (pi = {}),
      (hi = {}),
      Ao &&
        ((hi = document.createElement("div").style),
        "AnimationEvent" in window ||
          (delete fi.animationend.animation,
          delete fi.animationiteration.animation,
          delete fi.animationstart.animation),
        "TransitionEvent" in window || delete fi.transitionend.transition),
      (gi = Zu("animationend")),
      (mi = Zu("animationiteration")),
      (vi = Zu("animationstart")),
      (bi = Zu("transitionend")),
      (yi =
        "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange seeked seeking stalled suspend timeupdate volumechange waiting".split(
          " "
        )),
      (wi = new ("function" == typeof WeakMap ? WeakMap : Map)()),
      (_i = null),
      (xi = []),
      (Di = !1),
      (Ii = []),
      (Ei = null),
      (Ti = null),
      (Ci = null),
      (Fi = new Map()),
      (Ai = new Map()),
      (Oi = []),
      (Mi =
        "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput close cancel copy cut paste click change contextmenu reset submit".split(
          " "
        )),
      (Ri =
        "focus blur dragenter dragleave mouseover mouseout pointerover pointerout gotpointercapture lostpointercapture".split(
          " "
        )),
      (Ui = {}),
      (Ni = new Map()),
      (ji = new Map()),
      (Li = [
        "abort",
        "abort",
        gi,
        "animationEnd",
        mi,
        "animationIteration",
        vi,
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
        bi,
        "transitionEnd",
        "waiting",
        "waiting",
      ]),
      Pc(
        "blur blur cancel cancel click click close close contextmenu contextMenu copy copy cut cut auxclick auxClick dblclick doubleClick dragend dragEnd dragstart dragStart drop drop focus focus input input invalid invalid keydown keyDown keypress keyPress keyup keyUp mousedown mouseDown mouseup mouseUp paste paste pause pause play play pointercancel pointerCancel pointerdown pointerDown pointerup pointerUp ratechange rateChange reset reset seeked seeked submit submit touchcancel touchCancel touchend touchEnd touchstart touchStart volumechange volumeChange".split(
          " "
        ),
        0
      ),
      Pc(
        "drag drag dragenter dragEnter dragexit dragExit dragleave dragLeave dragover dragOver mousemove mouseMove mouseout mouseOut mouseover mouseOver pointermove pointerMove pointerout pointerOut pointerover pointerOver scroll scroll toggle toggle touchmove touchMove wheel wheel".split(
          " "
        ),
        1
      ),
      Pc(Li, 2);
    for (
      Bi =
        "change selectionchange textInput compositionstart compositionend compositionupdate".split(
          " "
        ),
        $i = 0;
      $i < Bi.length;
      $i++
    )
      ji.set(Bi[$i], 0);
    if (
      ((Vi = ho().unstable_UserBlockingPriority),
      (Hi = ho().unstable_runWithPriority),
      (zi = !0),
      (qi = {
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
      (Gi = ["Webkit", "ms", "Moz", "O"]),
      Object.keys(qi).forEach(function (e) {
        Gi.forEach(function (t) {
          (t = t + e.charAt(0).toUpperCase() + e.substring(1)), (qi[t] = qi[e]);
        });
      }),
      (Wi = vo(
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
      (Ji = ui.html),
      (Qi = "$"),
      (Yi = "/$"),
      (Ki = "$?"),
      (Xi = "$!"),
      (Zi = null),
      (ea = null),
      (ta = "function" == typeof setTimeout ? setTimeout : void 0),
      (na = "function" == typeof clearTimeout ? clearTimeout : void 0),
      (ra = Math.random().toString(36).slice(2)),
      (oa = "__reactInternalInstance$" + ra),
      (ia = "__reactEventHandlers$" + ra),
      (aa = "__reactContainere$" + ra),
      (sa = null),
      (la = null),
      (ua = null),
      vo(sd.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var e = this.nativeEvent;
          e &&
            (e.preventDefault
              ? e.preventDefault()
              : "unknown" != typeof e.returnValue && (e.returnValue = !1),
            (this.isDefaultPrevented = id));
        },
        stopPropagation: function () {
          var e = this.nativeEvent;
          e &&
            (e.stopPropagation
              ? e.stopPropagation()
              : "unknown" != typeof e.cancelBubble && (e.cancelBubble = !0),
            (this.isPropagationStopped = id));
        },
        persist: function () {
          this.isPersistent = id;
        },
        isPersistent: ad,
        destructor: function () {
          var e,
            t = this.constructor.Interface;
          for (e in t) this[e] = null;
          (this.nativeEvent = this._targetInst = this.dispatchConfig = null),
            (this.isPropagationStopped = this.isDefaultPrevented = ad),
            (this._dispatchInstances = this._dispatchListeners = null);
        },
      }),
      (sd.Interface = {
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
      (sd.extend = function (e) {
        function t() {}
        function n() {
          return r.apply(this, arguments);
        }
        var r = this;
        t.prototype = r.prototype;
        var o = new t();
        return (
          vo(o, n.prototype),
          (n.prototype = o),
          (n.prototype.constructor = n),
          (n.Interface = vo({}, r.Interface, e)),
          (n.extend = r.extend),
          cd(n),
          n
        );
      }),
      cd(sd),
      (ca = sd.extend({ data: null })),
      (da = sd.extend({ data: null })),
      (fa = [9, 13, 27, 32]),
      (pa = Ao && "CompositionEvent" in window),
      (ha = null),
      Ao && "documentMode" in document && (ha = document.documentMode),
      (ga = Ao && "TextEvent" in window && !ha),
      (ma = Ao && (!pa || (ha && 8 < ha && 11 >= ha))),
      (va = String.fromCharCode(32)),
      (ba = {
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
      (ya = !1),
      (wa = !1),
      (_a = {
        eventTypes: ba,
        extractEvents: function (e, t, n, r) {
          var o;
          if (pa)
            e: {
              switch (e) {
                case "compositionstart":
                  var i = ba.compositionStart;
                  break e;
                case "compositionend":
                  i = ba.compositionEnd;
                  break e;
                case "compositionupdate":
                  i = ba.compositionUpdate;
                  break e;
              }
              i = void 0;
            }
          else
            wa
              ? dd(e, n) && (i = ba.compositionEnd)
              : "keydown" === e &&
                229 === n.keyCode &&
                (i = ba.compositionStart);
          return (
            i
              ? (ma &&
                  "ko" !== n.locale &&
                  (wa || i !== ba.compositionStart
                    ? i === ba.compositionEnd && wa && (o = od())
                    : ((la = "value" in (sa = r) ? sa.value : sa.textContent),
                      (wa = !0))),
                (i = ca.getPooled(i, t, n, r)),
                o ? (i.data = o) : null !== (o = fd(n)) && (i.data = o),
                rd(i),
                (o = i))
              : (o = null),
            (e = ga
              ? (function (e, t) {
                  switch (e) {
                    case "compositionend":
                      return fd(t);
                    case "keypress":
                      return 32 !== t.which ? null : ((ya = !0), va);
                    case "textInput":
                      return (e = t.data) === va && ya ? null : e;
                    default:
                      return null;
                  }
                })(e, n)
              : (function (e, t) {
                  if (wa)
                    return "compositionend" === e || (!pa && dd(e, t))
                      ? ((e = od()), (ua = la = sa = null), (wa = !1), e)
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
                      return ma && "ko" !== t.locale ? null : t.data;
                    default:
                      return null;
                  }
                })(e, n))
              ? (((t = da.getPooled(ba.beforeInput, t, n, r)).data = e), rd(t))
              : (t = null),
            null === o ? t : null === t ? o : [o, t]
          );
        },
      }),
      (xa = {
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
      (Sa = {
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
      (Pa = null),
      (ka = null),
      (Da = !1),
      Ao &&
        (Da =
          cc("input") && (!document.documentMode || 9 < document.documentMode)),
      (Ia = {
        eventTypes: Sa,
        _isInputEventSupported: Da,
        extractEvents: function (e, t, n, r) {
          var o = t ? Qc(t) : window,
            i = o.nodeName && o.nodeName.toLowerCase();
          if ("select" === i || ("input" === i && "file" === o.type))
            var a = vd;
          else if (pd(o))
            if (Da) a = Sd;
            else {
              a = _d;
              var s = wd;
            }
          else
            (i = o.nodeName) &&
              "input" === i.toLowerCase() &&
              ("checkbox" === o.type || "radio" === o.type) &&
              (a = xd);
          if (a && (a = a(e, t))) return hd(a, n, r);
          s && s(e, o, t),
            "blur" === e &&
              (e = o._wrapperState) &&
              e.controlled &&
              "number" === o.type &&
              Vu(o, "number", o.value);
        },
      }),
      (Ea = sd.extend({ view: null, detail: null })),
      (Ta = {
        Alt: "altKey",
        Control: "ctrlKey",
        Meta: "metaKey",
        Shift: "shiftKey",
      }),
      (Ca = 0),
      (Fa = 0),
      (Aa = !1),
      (Oa = !1),
      (Ma = Ea.extend({
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
        getModifierState: kd,
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
          var t = Ca;
          return (
            (Ca = e.screenX),
            Aa ? ("mousemove" === e.type ? e.screenX - t : 0) : ((Aa = !0), 0)
          );
        },
        movementY: function (e) {
          if ("movementY" in e) return e.movementY;
          var t = Fa;
          return (
            (Fa = e.screenY),
            Oa ? ("mousemove" === e.type ? e.screenY - t : 0) : ((Oa = !0), 0)
          );
        },
      })),
      (Ra = Ma.extend({
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
      (Na = {
        eventTypes: (Ua = {
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
                (t = (t = n.relatedTarget || n.toElement) ? Wc(t) : null) &&
                (t !== tc(t) || (5 !== t.tag && 6 !== t.tag)) &&
                (t = null))
            : (a = null);
          if (a === t) return null;
          if ("mouseout" === e || "mouseover" === e)
            var s = Ma,
              l = Ua.mouseLeave,
              u = Ua.mouseEnter,
              c = "mouse";
          else
            ("pointerout" !== e && "pointerover" !== e) ||
              ((s = Ra),
              (l = Ua.pointerLeave),
              (u = Ua.pointerEnter),
              (c = "pointer"));
          if (
            ((e = null == a ? i : Qc(a)),
            (i = null == t ? i : Qc(t)),
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
              for (u = c, a = 0, e = s = r; e; e = Kc(e)) a++;
              for (e = 0, t = u; t; t = Kc(t)) e++;
              for (; 0 < a - e; ) (s = Kc(s)), a--;
              for (; 0 < e - a; ) (u = Kc(u)), e--;
              for (; a--; ) {
                if (s === u || s === u.alternate) break e;
                (s = Kc(s)), (u = Kc(u));
              }
              s = null;
            }
          else s = null;
          for (
            u = s, s = [];
            r && r !== u && (null === (a = r.alternate) || a !== u);

          )
            s.push(r), (r = Kc(r));
          for (
            r = [];
            c && c !== u && (null === (a = c.alternate) || a !== u);

          )
            r.push(c), (c = Kc(c));
          for (c = 0; c < s.length; c++) td(s[c], "bubbled", l);
          for (c = r.length; 0 < c--; ) td(r[c], "captured", n);
          return 0 == (64 & o) ? [l] : [l, n];
        },
      }),
      (ja = "function" == typeof Object.is ? Object.is : Dd),
      (La = Object.prototype.hasOwnProperty),
      (Ba = Ao && "documentMode" in document && 11 >= document.documentMode),
      ($a = {
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
      (Va = null),
      (Ha = null),
      (za = null),
      (qa = !1),
      (Ga = {
        eventTypes: $a,
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
              (o = ec(o)), (i = Fo.onSelect);
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
          switch (((o = t ? Qc(t) : window), e)) {
            case "focus":
              (pd(o) || "true" === o.contentEditable) &&
                ((Va = o), (Ha = t), (za = null));
              break;
            case "blur":
              za = Ha = Va = null;
              break;
            case "mousedown":
              qa = !0;
              break;
            case "contextmenu":
            case "mouseup":
            case "dragend":
              return (qa = !1), Ed(n, r);
            case "selectionchange":
              if (Ba) break;
            case "keydown":
            case "keyup":
              return Ed(n, r);
          }
          return null;
        },
      }),
      (Wa = sd.extend({
        animationName: null,
        elapsedTime: null,
        pseudoElement: null,
      })),
      (Ja = sd.extend({
        clipboardData: function (e) {
          return "clipboardData" in e ? e.clipboardData : window.clipboardData;
        },
      })),
      (Qa = Ea.extend({ relatedTarget: null })),
      (Ya = {
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
      (Ka = {
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
      (Xa = Ea.extend({
        key: function (e) {
          if (e.key) {
            var t = Ya[e.key] || e.key;
            if ("Unidentified" !== t) return t;
          }
          return "keypress" === e.type
            ? 13 === (e = Td(e))
              ? "Enter"
              : String.fromCharCode(e)
            : "keydown" === e.type || "keyup" === e.type
            ? Ka[e.keyCode] || "Unidentified"
            : "";
        },
        location: null,
        ctrlKey: null,
        shiftKey: null,
        altKey: null,
        metaKey: null,
        repeat: null,
        locale: null,
        getModifierState: kd,
        charCode: function (e) {
          return "keypress" === e.type ? Td(e) : 0;
        },
        keyCode: function (e) {
          return "keydown" === e.type || "keyup" === e.type ? e.keyCode : 0;
        },
        which: function (e) {
          return "keypress" === e.type
            ? Td(e)
            : "keydown" === e.type || "keyup" === e.type
            ? e.keyCode
            : 0;
        },
      })),
      (Za = Ma.extend({ dataTransfer: null })),
      (es = Ea.extend({
        touches: null,
        targetTouches: null,
        changedTouches: null,
        altKey: null,
        metaKey: null,
        ctrlKey: null,
        shiftKey: null,
        getModifierState: kd,
      })),
      (ts = sd.extend({
        propertyName: null,
        elapsedTime: null,
        pseudoElement: null,
      })),
      (ns = Ma.extend({
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
      (rs = {
        eventTypes: Ui,
        extractEvents: function (e, t, n, r) {
          var o = Ni.get(e);
          if (!o) return null;
          switch (e) {
            case "keypress":
              if (0 === Td(n)) return null;
            case "keydown":
            case "keyup":
              e = Xa;
              break;
            case "blur":
            case "focus":
              e = Qa;
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
              e = Ma;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              e = Za;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              e = es;
              break;
            case gi:
            case mi:
            case vi:
              e = Wa;
              break;
            case bi:
              e = ts;
              break;
            case "scroll":
              e = Ea;
              break;
            case "wheel":
              e = ns;
              break;
            case "copy":
            case "cut":
            case "paste":
              e = Ja;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              e = Ra;
              break;
            default:
              e = sd;
          }
          return rd((t = e.getPooled(o, t, n, r))), t;
        },
      }),
      Do)
    )
      throw Error(fu(101));
    (Do = Array.prototype.slice.call(
      "ResponderEventPlugin SimpleEventPlugin EnterLeaveEventPlugin ChangeEventPlugin SelectEventPlugin BeforeInputEventPlugin".split(
        " "
      )
    )),
      mu(),
      (So = Yc),
      (Po = Jc),
      (ko = Qc),
      bu({
        SimpleEventPlugin: rs,
        EnterLeaveEventPlugin: Na,
        ChangeEventPlugin: Ia,
        SelectEventPlugin: Ga,
        BeforeInputEventPlugin: _a,
      }),
      (os = []),
      (is = -1),
      (ss = { current: (as = {}) }),
      (ls = { current: !1 }),
      (us = as),
      (cs = ho().unstable_runWithPriority),
      (ds = ho().unstable_scheduleCallback),
      (fs = ho().unstable_cancelCallback),
      (ps = ho().unstable_requestPaint),
      (hs = ho().unstable_now),
      (gs = ho().unstable_getCurrentPriorityLevel),
      (ms = ho().unstable_ImmediatePriority),
      (vs = ho().unstable_UserBlockingPriority),
      (bs = ho().unstable_NormalPriority),
      (ys = ho().unstable_LowPriority),
      (ws = ho().unstable_IdlePriority),
      (_s = {}),
      (xs = ho().unstable_shouldYield),
      (Ss = void 0 !== ps ? ps : function () {}),
      (Ps = null),
      (ks = null),
      (Ds = !1),
      (Is = hs()),
      (Es =
        1e4 > Is
          ? hs
          : function () {
              return hs() - Is;
            }),
      (Ts = { current: null }),
      (Cs = null),
      (Fs = null),
      (As = null),
      (Os = !1),
      (Ms = qo.ReactCurrentBatchConfig),
      (Rs = new mo.Component().refs),
      (Us = {
        isMounted: function (e) {
          return !!(e = e._reactInternalFiber) && tc(e) === e;
        },
        enqueueSetState: function (e, t, n) {
          e = e._reactInternalFiber;
          var r = Op(),
            o = Ms.suspense;
          ((o = tf((r = Mp(r, e, o)), o)).payload = t),
            null != n && (o.callback = n),
            nf(e, o),
            Rp(e, r);
        },
        enqueueReplaceState: function (e, t, n) {
          e = e._reactInternalFiber;
          var r = Op(),
            o = Ms.suspense;
          ((o = tf((r = Mp(r, e, o)), o)).tag = 1),
            (o.payload = t),
            null != n && (o.callback = n),
            nf(e, o),
            Rp(e, r);
        },
        enqueueForceUpdate: function (e, t) {
          e = e._reactInternalFiber;
          var n = Op(),
            r = Ms.suspense;
          ((r = tf((n = Mp(n, e, r)), r)).tag = 2),
            null != t && (r.callback = t),
            nf(e, r),
            Rp(e, n);
        },
      }),
      (Ns = Array.isArray),
      (js = hf(!0)),
      (Ls = hf(!1)),
      ($s = { current: (Bs = {}) }),
      (Vs = { current: Bs }),
      (Hs = { current: Bs }),
      (zs = { current: 0 }),
      (qs = qo.ReactCurrentDispatcher),
      (Gs = qo.ReactCurrentBatchConfig),
      (Ws = 0),
      (Js = null),
      (Qs = null),
      (Ys = null),
      (Ks = !1),
      (Xs = {
        readContext: Xd,
        useCallback: xf,
        useContext: xf,
        useEffect: xf,
        useImperativeHandle: xf,
        useLayoutEffect: xf,
        useMemo: xf,
        useReducer: xf,
        useRef: xf,
        useState: xf,
        useDebugValue: xf,
        useResponder: xf,
        useDeferredValue: xf,
        useTransition: xf,
      }),
      (Zs = {
        readContext: Xd,
        useCallback: $f,
        useContext: Xd,
        useEffect: Rf,
        useImperativeHandle: function (e, t, n) {
          return (
            (n = null != n ? n.concat([e]) : null),
            Of(4, 2, jf.bind(null, t, e), n)
          );
        },
        useLayoutEffect: function (e, t) {
          return Of(4, 2, e, t);
        },
        useMemo: function (e, t) {
          var n = kf();
          return (
            (t = void 0 === t ? null : t),
            (e = e()),
            (n.memoizedState = [e, t]),
            e
          );
        },
        useReducer: function (e, t, n) {
          var r = kf();
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
              qf.bind(null, Js, e)),
            [r.memoizedState, e]
          );
        },
        useRef: function (e) {
          return (e = { current: e }), (kf().memoizedState = e);
        },
        useState: Cf,
        useDebugValue: Bf,
        useResponder: _f,
        useDeferredValue: function (e, t) {
          var n = Cf(e),
            r = n[0],
            o = n[1];
          return (
            Rf(
              function () {
                var n = Gs.suspense;
                Gs.suspense = void 0 === t ? null : t;
                try {
                  o(e);
                } finally {
                  Gs.suspense = n;
                }
              },
              [e, t]
            ),
            r
          );
        },
        useTransition: function (e) {
          var t = Cf(!1),
            n = t[0];
          return (t = t[1]), [$f(zf.bind(null, t, e), [t, e]), n];
        },
      }),
      (el = {
        readContext: Xd,
        useCallback: Vf,
        useContext: Xd,
        useEffect: Uf,
        useImperativeHandle: Lf,
        useLayoutEffect: Nf,
        useMemo: Hf,
        useReducer: Ef,
        useRef: Af,
        useState: function () {
          return Ef(If);
        },
        useDebugValue: Bf,
        useResponder: _f,
        useDeferredValue: function (e, t) {
          var n = Ef(If),
            r = n[0],
            o = n[1];
          return (
            Uf(
              function () {
                var n = Gs.suspense;
                Gs.suspense = void 0 === t ? null : t;
                try {
                  o(e);
                } finally {
                  Gs.suspense = n;
                }
              },
              [e, t]
            ),
            r
          );
        },
        useTransition: function (e) {
          var t = Ef(If),
            n = t[0];
          return (t = t[1]), [Vf(zf.bind(null, t, e), [t, e]), n];
        },
      }),
      (tl = {
        readContext: Xd,
        useCallback: Vf,
        useContext: Xd,
        useEffect: Uf,
        useImperativeHandle: Lf,
        useLayoutEffect: Nf,
        useMemo: Hf,
        useReducer: Tf,
        useRef: Af,
        useState: function () {
          return Tf(If);
        },
        useDebugValue: Bf,
        useResponder: _f,
        useDeferredValue: function (e, t) {
          var n = Tf(If),
            r = n[0],
            o = n[1];
          return (
            Uf(
              function () {
                var n = Gs.suspense;
                Gs.suspense = void 0 === t ? null : t;
                try {
                  o(e);
                } finally {
                  Gs.suspense = n;
                }
              },
              [e, t]
            ),
            r
          );
        },
        useTransition: function (e) {
          var t = Tf(If),
            n = t[0];
          return (t = t[1]), [Vf(zf.bind(null, t, e), [t, e]), n];
        },
      }),
      (nl = null),
      (rl = null),
      (ol = !1),
      (il = qo.ReactCurrentOwner),
      (al = !1),
      (sl = { dehydrated: null, retryTime: 0 }),
      (ll = function (e, t) {
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
      (ul = function () {}),
      (cl = function (e, t, n, r, o) {
        var i = e.memoizedProps;
        if (i !== r) {
          var a,
            s,
            l = t.stateNode;
          switch ((gf($s.current), (e = null), n)) {
            case "input":
              (i = Nu(l, i)), (r = Nu(l, r)), (e = []);
              break;
            case "option":
              (i = Hu(l, i)), (r = Hu(l, r)), (e = []);
              break;
            case "select":
              (i = vo({}, i, { value: void 0 })),
                (r = vo({}, r, { value: void 0 })),
                (e = []);
              break;
            case "textarea":
              (i = qu(l, i)), (r = qu(l, r)), (e = []);
              break;
            default:
              "function" != typeof i.onClick &&
                "function" == typeof r.onClick &&
                (l.onclick = Uc);
          }
          for (a in (Oc(n, r), (n = null), i))
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
                  (Co.hasOwnProperty(a)
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
                    (Co.hasOwnProperty(a)
                      ? (null != u && Rc(o, a), e || l === u || (e = []))
                      : (e = e || []).push(a, u));
          }
          n && (e = e || []).push("style", n),
            (o = e),
            (t.updateQueue = o) && (t.effectTag |= 4);
        }
      }),
      (dl = function (e, t, n, r) {
        n !== r && (t.effectTag |= 4);
      }),
      (fl = "function" == typeof WeakSet ? WeakSet : Set),
      (pl = "function" == typeof WeakMap ? WeakMap : Map),
      (hl = Math.ceil),
      (gl = qo.ReactCurrentDispatcher),
      (ml = qo.ReactCurrentOwner),
      (bl = 8),
      (yl = 16),
      (wl = 32),
      (xl = 1),
      (Sl = 2),
      (Pl = 3),
      (kl = 4),
      (Dl = 5),
      (Il = vl = 0),
      (El = null),
      (Tl = null),
      (Cl = 0),
      (Fl = _l = 0),
      (Al = null),
      (Ol = 1073741823),
      (Ml = 1073741823),
      (Rl = null),
      (Ul = 0),
      (Nl = !1),
      (jl = 0),
      (Ll = 500),
      (Bl = null),
      ($l = !1),
      (Vl = null),
      (Hl = null),
      (zl = !1),
      (ql = null),
      (Gl = 90),
      (Wl = null),
      (Jl = 0),
      (Ql = null),
      (Yl = 0),
      (Kl = function (e, t, n) {
        var r = t.expirationTime;
        if (null !== e) {
          var o = t.pendingProps;
          if (e.memoizedProps !== o || ls.current) al = !0;
          else {
            if (r < n) {
              switch (((al = !1), t.tag)) {
                case 3:
                  ap(t), Kf();
                  break;
                case 5:
                  if ((bf(t), 4 & t.mode && 1 !== n && o.hidden))
                    return (t.expirationTime = t.childExpirationTime = 1), null;
                  break;
                case 1:
                  Od(t.type) && Nd(t);
                  break;
                case 4:
                  mf(t, t.stateNode.containerInfo);
                  break;
                case 10:
                  (r = t.memoizedProps.value),
                    (o = t.type._context),
                    Fd(Ts, o._currentValue),
                    (o._currentValue = r);
                  break;
                case 13:
                  if (null !== t.memoizedState)
                    return 0 !== (r = t.child.childExpirationTime) && r >= n
                      ? sp(e, t, n)
                      : (Fd(zs, 1 & zs.current),
                        null !== (t = dp(e, t, n)) ? t.sibling : null);
                  Fd(zs, 1 & zs.current);
                  break;
                case 19:
                  if (
                    ((r = t.childExpirationTime >= n), 0 != (64 & e.effectTag))
                  ) {
                    if (r) return cp(e, t, n);
                    t.effectTag |= 64;
                  }
                  if (
                    (null !== (o = t.memoizedState) &&
                      ((o.rendering = null), (o.tail = null)),
                    Fd(zs, zs.current),
                    !r)
                  )
                    return null;
              }
              return dp(e, t, n);
            }
            al = !1;
          }
        } else al = !1;
        switch (((t.expirationTime = 0), t.tag)) {
          case 2:
            if (
              ((r = t.type),
              null !== e &&
                ((e.alternate = null),
                (t.alternate = null),
                (t.effectTag |= 2)),
              (e = t.pendingProps),
              (o = Ad(t, ss.current)),
              Kd(t, n),
              (o = Pf(null, t, r, e, o, n)),
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
                Od(r))
              ) {
                var i = !0;
                Nd(t);
              } else i = !1;
              (t.memoizedState =
                null !== o.state && void 0 !== o.state ? o.state : null),
                Zd(t);
              var a = r.getDerivedStateFromProps;
              "function" == typeof a && sf(t, r, a, e),
                (o.updater = Us),
                (t.stateNode = o),
                (o._reactInternalFiber = t),
                df(t, r, e, n),
                (t = ip(null, t, r, !0, i, n));
            } else (t.tag = 0), Xf(null, t, o, n), (t = t.child);
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
                    if ("function" == typeof e) return ch(e) ? 1 : 0;
                    if (null != e) {
                      if ((e = e.$$typeof) === ni) return 11;
                      if (e === ii) return 14;
                    }
                    return 2;
                  })(o)),
                (e = Wd(o, e)),
                i)
              ) {
                case 0:
                  t = rp(null, t, o, e, n);
                  break e;
                case 1:
                  t = op(null, t, o, e, n);
                  break e;
                case 11:
                  t = Zf(null, t, o, e, n);
                  break e;
                case 14:
                  t = ep(null, t, o, Wd(o.type, e), r, n);
                  break e;
              }
              throw Error(fu(306, o, ""));
            }
            return t;
          case 0:
            return (
              (r = t.type),
              (o = t.pendingProps),
              rp(e, t, r, (o = t.elementType === r ? o : Wd(r, o)), n)
            );
          case 1:
            return (
              (r = t.type),
              (o = t.pendingProps),
              op(e, t, r, (o = t.elementType === r ? o : Wd(r, o)), n)
            );
          case 3:
            if ((ap(t), (r = t.updateQueue), null === e || null === r))
              throw Error(fu(282));
            if (
              ((r = t.pendingProps),
              (o = null !== (o = t.memoizedState) ? o.element : null),
              ef(e, t),
              of(t, r, null, n),
              (r = t.memoizedState.element) === o)
            )
              Kf(), (t = dp(e, t, n));
            else {
              if (
                ((o = t.stateNode.hydrate) &&
                  ((rl = qc(t.stateNode.containerInfo.firstChild)),
                  (nl = t),
                  (o = ol = !0)),
                o)
              )
                for (n = Ls(t, null, r, n), t.child = n; n; )
                  (n.effectTag = (-3 & n.effectTag) | 1024), (n = n.sibling);
              else Xf(e, t, r, n), Kf();
              t = t.child;
            }
            return t;
          case 5:
            return (
              bf(t),
              null === e && Jf(t),
              (r = t.type),
              (o = t.pendingProps),
              (i = null !== e ? e.memoizedProps : null),
              (a = o.children),
              zc(r, o)
                ? (a = null)
                : null !== i && zc(r, i) && (t.effectTag |= 16),
              np(e, t),
              4 & t.mode && 1 !== n && o.hidden
                ? ((t.expirationTime = t.childExpirationTime = 1), (t = null))
                : (Xf(e, t, a, n), (t = t.child)),
              t
            );
          case 6:
            return null === e && Jf(t), null;
          case 13:
            return sp(e, t, n);
          case 4:
            return (
              mf(t, t.stateNode.containerInfo),
              (r = t.pendingProps),
              null === e ? (t.child = js(t, null, r, n)) : Xf(e, t, r, n),
              t.child
            );
          case 11:
            return (
              (r = t.type),
              (o = t.pendingProps),
              Zf(e, t, r, (o = t.elementType === r ? o : Wd(r, o)), n)
            );
          case 7:
            return Xf(e, t, t.pendingProps, n), t.child;
          case 8:
          case 12:
            return Xf(e, t, t.pendingProps.children, n), t.child;
          case 10:
            e: {
              (r = t.type._context),
                (o = t.pendingProps),
                (a = t.memoizedProps),
                (i = o.value);
              var s = t.type._context;
              if ((Fd(Ts, s._currentValue), (s._currentValue = i), null !== a))
                if (
                  ((s = a.value),
                  0 ===
                    (i = ja(s, i)
                      ? 0
                      : 0 |
                        ("function" == typeof r._calculateChangedBits
                          ? r._calculateChangedBits(s, i)
                          : 1073741823)))
                ) {
                  if (a.children === o.children && !ls.current) {
                    t = dp(e, t, n);
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
                            (((u = tf(n, null)).tag = 2), nf(s, u)),
                            s.expirationTime < n && (s.expirationTime = n),
                            null !== (u = s.alternate) &&
                              u.expirationTime < n &&
                              (u.expirationTime = n),
                            Yd(s.return, n),
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
              Xf(e, t, o.children, n), (t = t.child);
            }
            return t;
          case 9:
            return (
              (o = t.type),
              (r = (i = t.pendingProps).children),
              Kd(t, n),
              (r = r((o = Xd(o, i.unstable_observedBits)))),
              (t.effectTag |= 1),
              Xf(e, t, r, n),
              t.child
            );
          case 14:
            return (
              (i = Wd((o = t.type), t.pendingProps)),
              ep(e, t, o, (i = Wd(o.type, i)), r, n)
            );
          case 15:
            return tp(e, t, t.type, t.pendingProps, r, n);
          case 17:
            return (
              (r = t.type),
              (o = t.pendingProps),
              (o = t.elementType === r ? o : Wd(r, o)),
              null !== e &&
                ((e.alternate = null),
                (t.alternate = null),
                (t.effectTag |= 2)),
              (t.tag = 1),
              Od(r) ? ((e = !0), Nd(t)) : (e = !1),
              Kd(t, n),
              uf(t, r, o),
              df(t, r, o, n),
              ip(null, t, r, !0, e, n)
            );
          case 19:
            return cp(e, t, n);
        }
        throw Error(fu(156, t.tag));
      }),
      (Xl = null),
      (Zl = null),
      (kh.prototype.render = function (e) {
        _h(e, this._internalRoot, null, null);
      }),
      (kh.prototype.unmount = function () {
        var e = this._internalRoot,
          t = e.containerInfo;
        _h(null, e, null, function () {
          t[aa] = null;
        });
      }),
      (Si = function (e) {
        if (13 === e.tag) {
          var t = Gd(Op(), 150, 100);
          Rp(e, t), Ph(e, t);
        }
      }),
      (Pi = function (e) {
        13 === e.tag && (Rp(e, 3), Ph(e, 3));
      }),
      (ki = function (e) {
        if (13 === e.tag) {
          var t = Op();
          Rp(e, (t = Mp(t, e, null))), Ph(e, t);
        }
      }),
      (Oo = function (e, t, n) {
        switch (t) {
          case "input":
            if ((Bu(e, n), (t = n.name), "radio" === n.type && null != t)) {
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
                  var o = Yc(r);
                  if (!o) throw Error(fu(90));
                  Uu(r), Bu(r, o);
                }
              }
            }
            break;
          case "textarea":
            Wu(e, n);
            break;
          case "select":
            null != (t = n.value) && zu(e, !!n.multiple, t, !1);
        }
      }),
      (xu = $p),
      (Su = function (e, t, n, r, o) {
        var i = Il;
        Il |= 4;
        try {
          return $d(98, e.bind(null, t, n, r, o));
        } finally {
          (Il = i) === vl && zd();
        }
      }),
      (Pu = function () {
        (Il & (1 | yl | wl)) === vl &&
          ((function () {
            if (null !== Wl) {
              var e = Wl;
              (Wl = null),
                e.forEach(function (e, t) {
                  wh(t, e), jp(t);
                }),
                zd();
            }
          })(),
          nh());
      }),
      (Uo = function (e, t) {
        var n = Il;
        Il |= 2;
        try {
          return e(t);
        } finally {
          (Il = n) === vl && zd();
        }
      }),
      (eu = {
        Events: [
          Jc,
          Qc,
          Yc,
          bu,
          To,
          rd,
          function (e) {
            ac(e, nd);
          },
          wu,
          _u,
          Tc,
          lc,
          nh,
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
            (Xl = function (e) {
              try {
                t.onCommitFiberRoot(
                  n,
                  e,
                  void 0,
                  64 == (64 & e.current.effectTag)
                );
              } catch (e) {}
            }),
              (Zl = function (e) {
                try {
                  t.onCommitFiberUnmount(n, e);
                } catch (e) {}
              });
          } catch (e) {}
        })(
          vo({}, e, {
            overrideHookState: null,
            overrideProps: null,
            setSuspenseHandler: null,
            scheduleUpdate: null,
            currentDispatcherRef: qo.ReactCurrentDispatcher,
            findHostInstanceByFiber: function (e) {
              return null === (e = oc(e)) ? null : e.stateNode;
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
        findFiberByHostInstance: Wc,
        bundleType: 0,
        version: "16.13.1",
        rendererPackageName: "react-dom",
      }),
      (tu = eu),
      (go.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = tu),
      (nu = Th),
      (go.createPortal = nu),
      (ru = function (e) {
        if (null == e) return null;
        if (1 === e.nodeType) return e;
        var t = e._reactInternalFiber;
        if (void 0 === t) {
          if ("function" == typeof e.render) throw Error(fu(188));
          throw Error(fu(268, Object.keys(e)));
        }
        return (e = null === (e = oc(t)) ? null : e.stateNode);
      }),
      (go.findDOMNode = ru),
      (ou = function (e, t) {
        if ((Il & (yl | wl)) !== vl) throw Error(fu(187));
        var n = Il;
        Il |= 1;
        try {
          return $d(99, e.bind(null, t));
        } finally {
          (Il = n), zd();
        }
      }),
      (go.flushSync = ou),
      (iu = function (e, t, n) {
        if (!Dh(t)) throw Error(fu(200));
        return Ih(null, e, t, !0, n);
      }),
      (go.hydrate = iu),
      (au = function (e, t, n) {
        if (!Dh(t)) throw Error(fu(200));
        return Ih(null, e, t, !1, n);
      }),
      (go.render = au),
      (su = function (e) {
        if (!Dh(e)) throw Error(fu(40));
        return (
          !!e._reactRootContainer &&
          (Vp(function () {
            Ih(null, null, e, !1, function () {
              (e._reactRootContainer = null), (e[aa] = null);
            });
          }),
          !0)
        );
      }),
      (go.unmountComponentAtNode = su),
      (lu = $p),
      (go.unstable_batchedUpdates = lu),
      (uu = function (e, t) {
        return Th(
          e,
          t,
          2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null
        );
      }),
      (go.unstable_createPortal = uu),
      (cu = function (e, t, n, r) {
        if (!Dh(n)) throw Error(fu(200));
        if (null == e || void 0 === e._reactInternalFiber) throw Error(fu(38));
        return Ih(e, t, n, !1, r);
      }),
      (go.unstable_renderSubtreeIntoContainer = cu),
      "16.13.1",
      (go.version = "16.13.1");
  }
  var Fh,
    Ah = {};
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
    du || ((du = !0), Ch()),
    (Ah = go),
    r({}, "unstable_batchedUpdates", function () {
      return Ah.unstable_batchedUpdates;
    }),
    (Fh = Ah.unstable_batchedUpdates),
    (gt = Fh);
  const { $influx: Oh } = app;
  Oh.connect = (e) => (t) =>
    ur((t, n) => e(t, n), null, null, { forwardRef: !0 })(t);
  const { $influx: Mh, $env: Rh } = app;
  Mh.model = {
    store: null,
    init: function (e = {}) {
      if (((this._debug = !1), this.store)) return;
      const t = this._reduce.bind(this);
      return (
        Rh.is.development && globalThis.devToolsExtension
          ? (this.store = Jn(t, e, globalThis.devToolsExtension()))
          : (this.store = Jn(t, e)),
        this.store
      );
    },
    get state() {
      return this.store.getState();
    },
    dispatch: function (e, t) {
      "influx.set-state" !== e.type &&
        this._debug &&
        Mh.log(`dispatch "${e.type}"`),
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
  const { $influx: Uh } = app,
    Nh = Symbol("isProxy"),
    jh = Symbol("isProxifiedArray");
  let Lh = !1;
  function Bh(e) {
    if (Array.isArray(e)) {
      const t = e.map(Bh);
      return (t[jh] = !0), t;
    }
    if ("[object Object]" !== Object.prototype.toString.call(e)) return e;
    const t = { ...e },
      n = new Set(),
      r = new Proxy(t, {
        get: function (e, r) {
          if (r in t)
            return Lh && !n.has(r) && ((t[r] = Bh(t[r])), n.add(r)), t[r];
        },
        set: function (e, n, r) {
          return (t[n] = r), !0;
        },
        deleteProperty: function (e, n) {
          return delete t[n], !0;
        },
      });
    return (r[Nh] = !0), r;
  }
  function $h(e) {
    if (e && e[jh]) return delete e[jh], e.map($h);
    if (
      (Array.isArray(e) &&
        e.forEach((t, n) => {
          t && t[Nh] && (e[n] = $h(t));
        }),
      !e || !e[Nh])
    )
      return e;
    const t = {};
    for (const n in e) t[n] = $h(e[n]);
    return t;
  }
  Uh.safeModify = (e, t) => {
    const n = Bh(e),
      r = Lh;
    return (Lh = !0), t(n), (Lh = r), $h(n);
  };
  const { $influx: Vh } = app;
  Vh.transaction = (e) => {
    const t = Vh.safeModify(Vh.model.state, e);
    Hh.dispatch(t);
  };
  const Hh = Vh.action("influx.set-state", (e, t) => t);
  var zh = {},
    qh = {},
    Gh = {},
    Wh = {},
    Jh = 1;
  Wh = {
    nextValue: function () {
      return (Jh = (9301 * Jh + 49297) % 233280) / 233280;
    },
    seed: function (e) {
      Jh = e;
    },
  };
  var Qh,
    Yh,
    Kh,
    Xh = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-";
  function Zh() {
    Kh = !1;
  }
  function eg(e) {
    if (e) {
      if (e !== Qh) {
        if (e.length !== Xh.length)
          throw new Error(
            "Custom alphabet for shortid must be " +
              Xh.length +
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
              Xh.length +
              " unique characters. These characters were not unique: " +
              t.join(", ")
          );
        (Qh = e), Zh();
      }
    } else Qh !== Xh && ((Qh = Xh), Zh());
  }
  function tg() {
    return (
      Kh ||
      (Kh = (function () {
        Qh || eg(Xh);
        for (
          var e, t = Qh.split(""), n = [], r = Wh.nextValue();
          t.length > 0;

        )
          (r = Wh.nextValue()),
            (e = Math.floor(r * t.length)),
            n.push(t.splice(e, 1)[0]);
        return n.join("");
      })())
    );
  }
  Gh = {
    get: function () {
      return Qh || Xh;
    },
    characters: function (e) {
      return eg(e), Qh;
    },
    seed: function (e) {
      Wh.seed(e), Yh !== e && (Zh(), (Yh = e));
    },
    lookup: function (e) {
      return tg()[e];
    },
    shuffled: tg,
  };
  var ng = "object" == typeof window && (window.crypto || window.msCrypto),
    rg =
      ng && ng.getRandomValues
        ? function (e) {
            return ng.getRandomValues(new Uint8Array(e));
          }
        : function (e) {
            for (var t = [], n = 0; n < e; n++)
              t.push(Math.floor(256 * Math.random()));
            return t;
          },
    og = function (e, t, n) {
      for (
        var r = (2 << (Math.log(t.length - 1) / Math.LN2)) - 1,
          o = -~((1.6 * r * n) / t.length),
          i = "";
        ;

      )
        for (var a = e(o), s = o; s--; )
          if ((i += t[a[s] & r] || "").length === +n) return i;
    };
  var ig,
    ag,
    sg = function (e) {
      for (var t, n = 0, r = ""; !t; )
        (r += og(rg, Gh.get(), 1)), (t = e < Math.pow(16, n + 1)), n++;
      return r;
    };
  var lg = function (e) {
    var t = "",
      n = Math.floor(0.001 * (Date.now() - 1567752802062));
    return (
      n === ag ? ig++ : ((ig = 0), (ag = n)),
      (t += sg(7)),
      (t += sg(e)),
      ig > 0 && (t += sg(ig)),
      (t += sg(n))
    );
  };
  var ug,
    cg = function (e) {
      return (
        !(!e || "string" != typeof e || e.length < 6) &&
        !new RegExp(
          "[^" + Gh.get().replace(/[|\\{}()[\]^$+*?.-]/g, "\\$&") + "]"
        ).test(e)
      );
    },
    dg = !1;
  var fg = (dg || ((dg = !0), (ug = {}), (ug = 0)), ug || 0);
  function pg() {
    return lg(fg);
  }
  var hg = pg;
  (qh = pg).generate = hg;
  var gg = function (e) {
    return Gh.seed(e), qh;
  };
  qh.seed = gg;
  var mg = function (e) {
    return (fg = e), qh;
  };
  qh.worker = mg;
  var vg = function (e) {
    return void 0 !== e && Gh.characters(e), Gh.shuffled();
  };
  qh.characters = vg;
  var bg = cg;
  qh.isValid = bg;
  var yg,
    wg,
    _g,
    xg = t((zh = qh)),
    Sg = {},
    Pg = (yg = {});
  function kg() {
    throw new Error("setTimeout has not been defined");
  }
  function Dg() {
    throw new Error("clearTimeout has not been defined");
  }
  function Ig(e) {
    if (wg === setTimeout) return setTimeout(e, 0);
    if ((wg === kg || !wg) && setTimeout)
      return (wg = setTimeout), setTimeout(e, 0);
    try {
      return wg(e, 0);
    } catch (t) {
      try {
        return wg.call(null, e, 0);
      } catch (t) {
        return wg.call(this, e, 0);
      }
    }
  }
  !(function () {
    try {
      wg = "function" == typeof setTimeout ? setTimeout : kg;
    } catch (e) {
      wg = kg;
    }
    try {
      _g = "function" == typeof clearTimeout ? clearTimeout : Dg;
    } catch (e) {
      _g = Dg;
    }
  })();
  var Eg,
    Tg = [],
    Cg = !1,
    Fg = -1;
  function Ag() {
    Cg &&
      Eg &&
      ((Cg = !1),
      Eg.length ? (Tg = Eg.concat(Tg)) : (Fg = -1),
      Tg.length && Og());
  }
  function Og() {
    if (!Cg) {
      var e = Ig(Ag);
      Cg = !0;
      for (var t = Tg.length; t; ) {
        for (Eg = Tg, Tg = []; ++Fg < t; ) Eg && Eg[Fg].run();
        (Fg = -1), (t = Tg.length);
      }
      (Eg = null),
        (Cg = !1),
        (function (e) {
          if (_g === clearTimeout) return clearTimeout(e);
          if ((_g === Dg || !_g) && clearTimeout)
            return (_g = clearTimeout), clearTimeout(e);
          try {
            _g(e);
          } catch (t) {
            try {
              return _g.call(null, e);
            } catch (t) {
              return _g.call(this, e);
            }
          }
        })(e);
    }
  }
  function Mg(e, t) {
    (this.fun = e), (this.array = t);
  }
  function Rg() {}
  (Pg.nextTick = function (e) {
    var t = new Array(arguments.length - 1);
    if (arguments.length > 1)
      for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
    Tg.push(new Mg(e, t)), 1 !== Tg.length || Cg || Ig(Og);
  }),
    (Mg.prototype.run = function () {
      this.fun.apply(null, this.array);
    }),
    (Pg.title = "browser"),
    (Pg.browser = !0),
    (Pg.env = {}),
    (Pg.argv = []),
    (Pg.version = ""),
    (Pg.versions = {}),
    (Pg.on = Rg),
    (Pg.addListener = Rg),
    (Pg.once = Rg),
    (Pg.off = Rg),
    (Pg.removeListener = Rg),
    (Pg.removeAllListeners = Rg),
    (Pg.emit = Rg),
    (Pg.prependListener = Rg),
    (Pg.prependOnceListener = Rg),
    (Pg.listeners = function (e) {
      return [];
    }),
    (Pg.binding = function (e) {
      throw new Error("process.binding is not supported");
    }),
    (Pg.cwd = function () {
      return "/";
    }),
    (Pg.chdir = function (e) {
      throw new Error("process.chdir is not supported");
    }),
    (Pg.umask = function () {
      return 0;
    });
  var Ug = yg;
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
        "object" == typeof Ug &&
        Ug.versions &&
        Ug.versions.node;
    i ? (r = e) : o && (r = self);
    var a = !r.JS_SHA256_NO_COMMON_JS && Sg,
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
      a ? (Sg = _) : ((r.sha256 = _.sha256), (r.sha224 = _.sha224));
  })();
  var Ng = t(Sg);
  class jg {
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
          t = zh.generate(),
          r = jg._hash(this.options.secret, t);
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
        fetch(e, { body: r, method: o, headers: i }).then(jg._toJson)
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
      return Ng(`${e}${t}`);
    }
  }
  var Lg = { Sender: jg },
    Bg = {};
  const { $env: $g } = app;
  Bg.controller = {
    init: function () {
      (this.apiSender = new Lg.Sender({ urlPrefix: $g.options.apiUrl })),
        Bg.promocodeController.init({ parent: this }),
        Bg.trialController.init({ parent: this }),
        Bg.fspringController.init({ parent: this });
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
      await Promise.all([
        Bg.promocodeController.updatePro(),
        Bg.trialController.updatePro(),
        Bg.fspringController.updatePro(),
      ]);
    },
    reply: function (e, t) {
      if (e)
        try {
          e(t);
        } catch (e) {}
    },
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
  ******************************************************************************/
  var Vg = function (e, t) {
    return (Vg =
      Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array &&
        function (e, t) {
          e.__proto__ = t;
        }) ||
      function (e, t) {
        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
      })(e, t);
  };
  function Hg(e, t) {
    function n() {
      this.constructor = e;
    }
    Vg(e, t),
      (e.prototype =
        null === t ? Object.create(t) : ((n.prototype = t.prototype), new n()));
  }
  var zg = function () {
    return (zg =
      Object.assign ||
      function (e) {
        for (var t, n = 1, r = arguments.length; n < r; n++)
          for (var o in (t = arguments[n]))
            Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
        return e;
      }).apply(this, arguments);
  };
  function qg(e) {
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
  function Gg(e, t) {
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
  function Wg() {
    for (var e = [], t = 0; t < arguments.length; t++)
      e = e.concat(Gg(arguments[t]));
    return e;
  }
  var Jg = {};
  function Qg(e) {
    switch (Object.prototype.toString.call(e)) {
      case "[object Error]":
      case "[object Exception]":
      case "[object DOMException]":
        return !0;
      default:
        return sm(e, Error);
    }
  }
  function Yg(e) {
    return "[object ErrorEvent]" === Object.prototype.toString.call(e);
  }
  function Kg(e) {
    return "[object DOMError]" === Object.prototype.toString.call(e);
  }
  function Xg(e) {
    return "[object DOMException]" === Object.prototype.toString.call(e);
  }
  function Zg(e) {
    return "[object String]" === Object.prototype.toString.call(e);
  }
  function em(e) {
    return null === e || ("object" != typeof e && "function" != typeof e);
  }
  function tm(e) {
    return "[object Object]" === Object.prototype.toString.call(e);
  }
  function nm(e) {
    return "undefined" != typeof Event && sm(e, Event);
  }
  function rm(e) {
    return "undefined" != typeof Element && sm(e, Element);
  }
  function om(e) {
    return "[object RegExp]" === Object.prototype.toString.call(e);
  }
  function im(e) {
    return Boolean(e && e.then && "function" == typeof e.then);
  }
  function am(e) {
    return (
      tm(e) &&
      "nativeEvent" in e &&
      "preventDefault" in e &&
      "stopPropagation" in e
    );
  }
  function sm(e, t) {
    try {
      return e instanceof t;
    } catch (e) {
      return !1;
    }
  }
  function lm(e) {
    try {
      for (
        var t = e, n = [], r = 0, o = 0, i = " > ".length, a = void 0;
        t &&
        r++ < 5 &&
        !(
          "html" === (a = um(t)) ||
          (r > 1 && o + n.length * i + a.length >= 80)
        );

      )
        n.push(a), (o += a.length), (t = t.parentNode);
      return n.reverse().join(" > ");
    } catch (e) {
      return "<unknown>";
    }
  }
  function um(e) {
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
      (t = a.className) && Zg(t))
    )
      for (n = t.split(/\s+/), i = 0; i < n.length; i++) s.push("." + n[i]);
    var l = ["type", "name", "title", "alt"];
    for (i = 0; i < l.length; i++)
      (r = l[i]), (o = a.getAttribute(r)) && s.push("[" + r + '="' + o + '"]');
    return s.join("");
  }
  r(Jg, "isError", function () {
    return Qg;
  }),
    r(Jg, "isErrorEvent", function () {
      return Yg;
    }),
    r(Jg, "isDOMError", function () {
      return Kg;
    }),
    r(Jg, "isDOMException", function () {
      return Xg;
    }),
    r(Jg, "isString", function () {
      return Zg;
    }),
    r(Jg, "isPrimitive", function () {
      return em;
    }),
    r(Jg, "isPlainObject", function () {
      return tm;
    }),
    r(Jg, "isEvent", function () {
      return nm;
    }),
    r(Jg, "isElement", function () {
      return rm;
    }),
    r(Jg, "isRegExp", function () {
      return om;
    }),
    r(Jg, "isThenable", function () {
      return im;
    }),
    r(Jg, "isSyntheticEvent", function () {
      return am;
    }),
    r(Jg, "isInstanceOf", function () {
      return sm;
    }),
    r({}, "htmlTreeAsString", function () {
      return lm;
    });
  var cm =
    Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array
      ? function (e, t) {
          return (e.__proto__ = t), e;
        }
      : function (e, t) {
          for (var n in t) e.hasOwnProperty(n) || (e[n] = t[n]);
          return e;
        });
  var dm = (function (e) {
    function t(t) {
      var n = this.constructor,
        r = e.call(this, t) || this;
      return (
        (r.message = t),
        (r.name = n.prototype.constructor.name),
        cm(r, n.prototype),
        r
      );
    }
    return Hg(t, e), t;
  })(Error);
  r({}, "SentryError", function () {
    return dm;
  });
  var fm = /^(?:(\w+):)\/\/(?:(\w+)(?::(\w+))?@)([\w.-]+)(?::(\d+))?\/(.+)/,
    pm = "Invalid Dsn",
    hm = (function () {
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
          var t = fm.exec(e);
          if (!t) throw new dm(pm);
          var n = Gg(t.slice(1), 6),
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
              if (!e[t]) throw new dm("Invalid Dsn: " + t + " missing");
            }),
            !this.projectId.match(/^\d+$/))
          )
            throw new dm("Invalid Dsn: Invalid projectId " + this.projectId);
          if ("http" !== this.protocol && "https" !== this.protocol)
            throw new dm("Invalid Dsn: Invalid protocol " + this.protocol);
          if (this.port && isNaN(parseInt(this.port, 10)))
            throw new dm("Invalid Dsn: Invalid port " + this.port);
        }),
        e
      );
    })();
  r({}, "Dsn", function () {
    return hm;
  });
  var gm = {},
    mm = {},
    vm = (function () {
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
    return vm;
  });
  var bm = "<anonymous>";
  function ym(e) {
    try {
      return (e && "function" == typeof e && e.name) || bm;
    } catch (e) {
      return bm;
    }
  }
  r({}, "getFunctionName", function () {
    return ym;
  });
  var wm = {};
  function _m(e, t) {
    return (
      void 0 === t && (t = 0),
      "string" != typeof e || 0 === t || e.length <= t
        ? e
        : e.substr(0, t) + "..."
    );
  }
  function xm(e, t) {
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
  function Sm(e, t) {
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
  function Pm(e, t) {
    return (
      !!Zg(e) &&
      (om(t) ? t.test(e) : "string" == typeof t && -1 !== e.indexOf(t))
    );
  }
  function km(e, t, n) {
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
  function Dm(e) {
    return Object.keys(e)
      .map(function (t) {
        return encodeURIComponent(t) + "=" + encodeURIComponent(e[t]);
      })
      .join("&");
  }
  function Im(e) {
    if (Qg(e)) {
      var t = e,
        n = { message: t.message, name: t.name, stack: t.stack };
      for (var r in t)
        Object.prototype.hasOwnProperty.call(t, r) && (n[r] = t[r]);
      return n;
    }
    if (nm(e)) {
      var o = e,
        i = {};
      i.type = o.type;
      try {
        i.target = rm(o.target)
          ? lm(o.target)
          : Object.prototype.toString.call(o.target);
      } catch (e) {
        i.target = "<unknown>";
      }
      try {
        i.currentTarget = rm(o.currentTarget)
          ? lm(o.currentTarget)
          : Object.prototype.toString.call(o.currentTarget);
      } catch (e) {
        i.currentTarget = "<unknown>";
      }
      for (var r in ("undefined" != typeof CustomEvent &&
        sm(e, CustomEvent) &&
        (i.detail = o.detail),
      o))
        Object.prototype.hasOwnProperty.call(o, r) && (i[r] = o);
      return i;
    }
    return e;
  }
  function Em(e) {
    return (function (e) {
      return ~-encodeURI(e).split(/%..|./).length;
    })(JSON.stringify(e));
  }
  function Tm(e, t, n) {
    void 0 === t && (t = 3), void 0 === n && (n = 102400);
    var r = Am(e, t);
    return Em(r) > n ? Tm(e, t - 1, n) : r;
  }
  function Cm(t, n) {
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
      : am(t)
      ? "[SyntheticEvent]"
      : "number" == typeof t && t != t
      ? "[NaN]"
      : void 0 === t
      ? "[undefined]"
      : "function" == typeof t
      ? "[Function: " + ym(t) + "]"
      : t;
  }
  function Fm(e, t, n, r) {
    if ((void 0 === n && (n = 1 / 0), void 0 === r && (r = new vm()), 0 === n))
      return (function (e) {
        var t = Object.prototype.toString.call(e);
        if ("string" == typeof e) return e;
        if ("[object Object]" === t) return "[Object]";
        if ("[object Array]" === t) return "[Array]";
        var n = Cm(e);
        return em(n) ? n : t;
      })(t);
    if (null != t && "function" == typeof t.toJSON) return t.toJSON();
    var o = Cm(t, e);
    if (em(o)) return o;
    var i = Im(t),
      a = Array.isArray(t) ? [] : {};
    if (r.memoize(t)) return "[Circular ~]";
    for (var s in i)
      Object.prototype.hasOwnProperty.call(i, s) &&
        (a[s] = Fm(s, i[s], n - 1, r));
    return r.unmemoize(t), a;
  }
  function Am(e, t) {
    try {
      return JSON.parse(
        JSON.stringify(e, function (e, n) {
          return Fm(e, n, t);
        })
      );
    } catch (e) {
      return "**non-serializable**";
    }
  }
  function Om(e, t) {
    void 0 === t && (t = 40);
    var n = Object.keys(Im(e));
    if ((n.sort(), !n.length)) return "[object has no keys]";
    if (n[0].length >= t) return _m(n[0], t);
    for (var r = n.length; r > 0; r--) {
      var o = n.slice(0, r).join(", ");
      if (!(o.length > t)) return r === n.length ? o : _m(o, t);
    }
    return "";
  }
  r(wm, "truncate", function () {
    return _m;
  }),
    r(wm, "snipLine", function () {
      return xm;
    }),
    r(wm, "safeJoin", function () {
      return Sm;
    }),
    r(wm, "isMatchingPattern", function () {
      return Pm;
    }),
    r(mm, "fill", function () {
      return km;
    }),
    r(mm, "urlEncode", function () {
      return Dm;
    }),
    r(mm, "normalizeToSize", function () {
      return Tm;
    }),
    r(mm, "normalize", function () {
      return Am;
    }),
    r(mm, "extractExceptionKeysForMessage", function () {
      return Om;
    });
  var Mm = function () {
      var e = this,
        t = { exports: this };
      e.__esModule = !0;
      var n = yg;
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
                  (r.data = Zg(e.body) ? e.body : JSON.stringify(Am(e.body)));
                break;
              default:
                ({}).hasOwnProperty.call(e, n) && (r[n] = e[n]);
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
    Rm = {};
  function Um() {
    return Mm.isNodeEnv()
      ? e
      : "undefined" != typeof window
      ? window
      : "undefined" != typeof self
      ? self
      : Rm;
  }
  function Nm() {
    var e = Um(),
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
  function jm(e) {
    if (!e) return {};
    var t = e.match(
      /^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/
    );
    if (!t) return {};
    var n = t[6] || "",
      r = t[8] || "";
    return { host: t[4], path: t[5], protocol: t[2], relative: t[5] + n + r };
  }
  function Lm(e) {
    if (e.message) return e.message;
    if (e.exception && e.exception.values && e.exception.values[0]) {
      var t = e.exception.values[0];
      return t.type && t.value
        ? t.type + ": " + t.value
        : t.type || t.value || e.event_id || "<unknown>";
    }
    return e.event_id || "<unknown>";
  }
  function Bm(e) {
    var t = Um();
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
  function $m(e, t, n) {
    (e.exception = e.exception || {}),
      (e.exception.values = e.exception.values || []),
      (e.exception.values[0] = e.exception.values[0] || {}),
      (e.exception.values[0].value = e.exception.values[0].value || t || ""),
      (e.exception.values[0].type = e.exception.values[0].type || n || "Error");
  }
  function Vm(e, t) {
    void 0 === t && (t = {});
    try {
      (e.exception.values[0].mechanism = e.exception.values[0].mechanism || {}),
        Object.keys(t).forEach(function (n) {
          e.exception.values[0].mechanism[n] = t[n];
        });
    } catch (e) {}
  }
  function Hm() {
    try {
      return document.location.href;
    } catch (e) {
      return "";
    }
  }
  r(gm, "getGlobalObject", function () {
    return Um;
  }),
    r(gm, "uuid4", function () {
      return Nm;
    }),
    r(gm, "parseUrl", function () {
      return jm;
    }),
    r(gm, "getEventDescription", function () {
      return Lm;
    }),
    r(gm, "consoleSandbox", function () {
      return Bm;
    }),
    r(gm, "addExceptionTypeValue", function () {
      return $m;
    }),
    r(gm, "addExceptionMechanism", function () {
      return Vm;
    }),
    r(gm, "getLocationHref", function () {
      return Hm;
    });
  function zm(e, t) {
    if (!t) return 6e4;
    var n = parseInt("" + t, 10);
    if (!isNaN(n)) return 1e3 * n;
    var r = Date.parse("" + t);
    return isNaN(r) ? 6e4 : r - e;
  }
  r(gm, "parseRetryAfterHeader", function () {
    return zm;
  });
  var qm = Um(),
    Gm = (function () {
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
            Bm(function () {
              qm.console.log("Sentry Logger [Log]: " + e.join(" "));
            });
        }),
        (e.prototype.warn = function () {
          for (var e = [], t = 0; t < arguments.length; t++)
            e[t] = arguments[t];
          this._enabled &&
            Bm(function () {
              qm.console.warn("Sentry Logger [Warn]: " + e.join(" "));
            });
        }),
        (e.prototype.error = function () {
          for (var e = [], t = 0; t < arguments.length; t++)
            e[t] = arguments[t];
          this._enabled &&
            Bm(function () {
              qm.console.error("Sentry Logger [Error]: " + e.join(" "));
            });
        }),
        e
      );
    })();
  qm.__SENTRY__ = qm.__SENTRY__ || {};
  var Wm = qm.__SENTRY__.logger || (qm.__SENTRY__.logger = new Gm());
  r({}, "logger", function () {
    return Wm;
  });
  var Jm = {};
  function Qm() {
    if (!("fetch" in Um())) return !1;
    try {
      return new Headers(), new Request(""), new Response(), !0;
    } catch (e) {
      return !1;
    }
  }
  function Ym(e) {
    return (
      e && /^function fetch\(\)\s+\{\s+\[native code\]\s+\}$/.test(e.toString())
    );
  }
  function Km() {
    if (!Qm()) return !1;
    var e = Um();
    if (Ym(e.fetch)) return !0;
    var t = !1,
      n = e.document;
    if (n && "function" == typeof n.createElement)
      try {
        var r = n.createElement("iframe");
        (r.hidden = !0),
          n.head.appendChild(r),
          r.contentWindow &&
            r.contentWindow.fetch &&
            (t = Ym(r.contentWindow.fetch)),
          n.head.removeChild(r);
      } catch (e) {
        Wm.warn(
          "Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ",
          e
        );
      }
    return t;
  }
  function Xm() {
    if (!Qm()) return !1;
    try {
      return new Request("_", { referrerPolicy: "origin" }), !0;
    } catch (e) {
      return !1;
    }
  }
  function Zm() {
    var e = Um(),
      t = e.chrome,
      n = t && t.app && t.app.runtime,
      r = "history" in e && !!e.history.pushState && !!e.history.replaceState;
    return !n && r;
  }
  r(Jm, "supportsFetch", function () {
    return Qm;
  }),
    r(Jm, "supportsNativeFetch", function () {
      return Km;
    }),
    r(Jm, "supportsReferrerPolicy", function () {
      return Xm;
    }),
    r(Jm, "supportsHistory", function () {
      return Zm;
    });
  var ev,
    tv = Um(),
    nv = {},
    rv = {};
  function ov(e) {
    if (!rv[e])
      switch (((rv[e] = !0), e)) {
        case "console":
          !(function () {
            if (!("console" in tv)) return;
            ["debug", "info", "warn", "error", "log", "assert"].forEach(
              function (e) {
                e in tv.console &&
                  km(tv.console, e, function (t) {
                    return function () {
                      for (var n = [], r = 0; r < arguments.length; r++)
                        n[r] = arguments[r];
                      av("console", { args: n, level: e }),
                        t && Function.prototype.apply.call(t, tv.console, n);
                    };
                  });
              }
            );
          })();
          break;
        case "dom":
          !(function () {
            if (!("document" in tv)) return;
            tv.document.addEventListener(
              "click",
              fv("click", av.bind(null, "dom")),
              !1
            ),
              tv.document.addEventListener(
                "keypress",
                pv(av.bind(null, "dom")),
                !1
              ),
              ["EventTarget", "Node"].forEach(function (e) {
                var t = tv[e] && tv[e].prototype;
                t &&
                  t.hasOwnProperty &&
                  t.hasOwnProperty("addEventListener") &&
                  (km(t, "addEventListener", function (e) {
                    return function (t, n, r) {
                      return (
                        n && n.handleEvent
                          ? ("click" === t &&
                              km(n, "handleEvent", function (e) {
                                return function (t) {
                                  return (
                                    fv("click", av.bind(null, "dom"))(t),
                                    e.call(this, t)
                                  );
                                };
                              }),
                            "keypress" === t &&
                              km(n, "handleEvent", function (e) {
                                return function (t) {
                                  return (
                                    pv(av.bind(null, "dom"))(t), e.call(this, t)
                                  );
                                };
                              }))
                          : ("click" === t &&
                              fv("click", av.bind(null, "dom"), !0)(this),
                            "keypress" === t && pv(av.bind(null, "dom"))(this)),
                        e.call(this, t, n, r)
                      );
                    };
                  }),
                  km(t, "removeEventListener", function (e) {
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
            if (!("XMLHttpRequest" in tv)) return;
            var e = [],
              t = [],
              n = XMLHttpRequest.prototype;
            km(n, "open", function (n) {
              return function () {
                for (var r = [], o = 0; o < arguments.length; o++)
                  r[o] = arguments[o];
                var i = this,
                  a = r[1];
                (i.__sentry_xhr__ = {
                  method: Zg(r[0]) ? r[0].toUpperCase() : r[0],
                  url: r[1],
                }),
                  Zg(a) &&
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
                    av("xhr", {
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
                    ? km(i, "onreadystatechange", function (e) {
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
              km(n, "send", function (n) {
                return function () {
                  for (var r = [], o = 0; o < arguments.length; o++)
                    r[o] = arguments[o];
                  return (
                    e.push(this),
                    t.push(r),
                    av("xhr", {
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
            if (!Km()) return;
            km(tv, "fetch", function (e) {
              return function () {
                for (var t = [], n = 0; n < arguments.length; n++)
                  t[n] = arguments[n];
                var r = {
                  args: t,
                  fetchData: { method: sv(t), url: lv(t) },
                  startTimestamp: Date.now(),
                };
                return (
                  av("fetch", zg({}, r)),
                  e.apply(tv, t).then(
                    function (e) {
                      return (
                        av(
                          "fetch",
                          zg(zg({}, r), {
                            endTimestamp: Date.now(),
                            response: e,
                          })
                        ),
                        e
                      );
                    },
                    function (e) {
                      throw (
                        (av(
                          "fetch",
                          zg(zg({}, r), { endTimestamp: Date.now(), error: e })
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
            if (!Zm()) return;
            var e = tv.onpopstate;
            function t(e) {
              return function () {
                for (var t = [], n = 0; n < arguments.length; n++)
                  t[n] = arguments[n];
                var r = t.length > 2 ? t[2] : void 0;
                if (r) {
                  var o = ev,
                    i = String(r);
                  (ev = i), av("history", { from: o, to: i });
                }
                return e.apply(this, t);
              };
            }
            (tv.onpopstate = function () {
              for (var t = [], n = 0; n < arguments.length; n++)
                t[n] = arguments[n];
              var r = tv.location.href,
                o = ev;
              if (((ev = r), av("history", { from: o, to: r }), e))
                return e.apply(this, t);
            }),
              km(tv.history, "pushState", t),
              km(tv.history, "replaceState", t);
          })();
          break;
        case "error":
          (hv = tv.onerror),
            (tv.onerror = function (e, t, n, r, o) {
              return (
                av("error", { column: r, error: o, line: n, msg: e, url: t }),
                !!hv && hv.apply(this, arguments)
              );
            });
          break;
        case "unhandledrejection":
          (gv = tv.onunhandledrejection),
            (tv.onunhandledrejection = function (e) {
              return (
                av("unhandledrejection", e), !gv || gv.apply(this, arguments)
              );
            });
          break;
        default:
          Wm.warn("unknown instrumentation type:", e);
      }
  }
  function iv(e) {
    e &&
      "string" == typeof e.type &&
      "function" == typeof e.callback &&
      ((nv[e.type] = nv[e.type] || []),
      nv[e.type].push(e.callback),
      ov(e.type));
  }
  function av(e, t) {
    var n, r;
    if (e && nv[e])
      try {
        for (var o = qg(nv[e] || []), i = o.next(); !i.done; i = o.next()) {
          var a = i.value;
          try {
            a(t);
          } catch (t) {
            Wm.error(
              "Error while triggering instrumentation handler.\nType: " +
                e +
                "\nName: " +
                ym(a) +
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
  function sv(e) {
    return (
      void 0 === e && (e = []),
      "Request" in tv && sm(e[0], Request) && e[0].method
        ? String(e[0].method).toUpperCase()
        : e[1] && e[1].method
        ? String(e[1].method).toUpperCase()
        : "GET"
    );
  }
  function lv(e) {
    return (
      void 0 === e && (e = []),
      "string" == typeof e[0]
        ? e[0]
        : "Request" in tv && sm(e[0], Request)
        ? e[0].url
        : String(e[0])
    );
  }
  r({}, "addInstrumentationHandler", function () {
    return iv;
  });
  var uv,
    cv,
    dv = 0;
  function fv(e, t, n) {
    return (
      void 0 === n && (n = !1),
      function (r) {
        (uv = void 0),
          r &&
            cv !== r &&
            ((cv = r),
            dv && clearTimeout(dv),
            n
              ? (dv = setTimeout(function () {
                  t({ event: r, name: e });
                }))
              : t({ event: r, name: e }));
      }
    );
  }
  function pv(e) {
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
        (uv || fv("input", e)(t),
        clearTimeout(uv),
        (uv = setTimeout(function () {
          uv = void 0;
        }, 1e3)));
    };
  }
  var hv = null;
  var gv = null;
  var mv, vv;
  ((vv = mv || (mv = {})).PENDING = "PENDING"),
    (vv.RESOLVED = "RESOLVED"),
    (vv.REJECTED = "REJECTED");
  var bv = (function () {
    function e(e) {
      var t = this;
      (this._state = mv.PENDING),
        (this._handlers = []),
        (this._resolve = function (e) {
          t._setResult(mv.RESOLVED, e);
        }),
        (this._reject = function (e) {
          t._setResult(mv.REJECTED, e);
        }),
        (this._setResult = function (e, n) {
          t._state === mv.PENDING &&
            (im(n)
              ? n.then(t._resolve, t._reject)
              : ((t._state = e), (t._value = n), t._executeHandlers()));
        }),
        (this._attachHandler = function (e) {
          (t._handlers = t._handlers.concat(e)), t._executeHandlers();
        }),
        (this._executeHandlers = function () {
          if (t._state !== mv.PENDING) {
            var e = t._handlers.slice();
            (t._handlers = []),
              e.forEach(function (e) {
                e.done ||
                  (t._state === mv.RESOLVED &&
                    e.onfulfilled &&
                    e.onfulfilled(t._value),
                  t._state === mv.REJECTED &&
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
    return bv;
  });
  var yv = (function () {
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
          : bv.reject(
              new dm("Not adding Promise due to buffer limit reached.")
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
        return new bv(function (n) {
          var r = setTimeout(function () {
            e && e > 0 && n(!1);
          }, e);
          bv.all(t._buffer)
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
    return yv;
  });
  var wv = function () {
      var e = this,
        t = { exports: this };
      e.__esModule = !0;
      var n = {
        nowSeconds: function () {
          return Date.now() / 1e3;
        },
      };
      var o = Mm.isNodeEnv()
          ? (function () {
              try {
                return Mm.dynamicRequire(t, "perf_hooks").performance;
              } catch (e) {
                return;
              }
            })()
          : (function () {
              var e = Um().performance;
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
        var e = Um().performance;
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
    _v = (function () {
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
              ((n._breadcrumbs = Wg(t._breadcrumbs)),
              (n._tags = zg({}, t._tags)),
              (n._extra = zg({}, t._extra)),
              (n._contexts = zg({}, t._contexts)),
              (n._user = t._user),
              (n._level = t._level),
              (n._span = t._span),
              (n._transactionName = t._transactionName),
              (n._fingerprint = t._fingerprint),
              (n._eventProcessors = Wg(t._eventProcessors))),
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
            (this._tags = zg(zg({}, this._tags), e)),
            this._notifyScopeListeners(),
            this
          );
        }),
        (e.prototype.setTag = function (e, t) {
          var n;
          return (
            (this._tags = zg(zg({}, this._tags), (((n = {})[e] = t), n))),
            this._notifyScopeListeners(),
            this
          );
        }),
        (e.prototype.setExtras = function (e) {
          return (
            (this._extra = zg(zg({}, this._extra), e)),
            this._notifyScopeListeners(),
            this
          );
        }),
        (e.prototype.setExtra = function (e, t) {
          var n;
          return (
            (this._extra = zg(zg({}, this._extra), (((n = {})[e] = t), n))),
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
              : (this._contexts = zg(
                  zg({}, this._contexts),
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
              ? ((this._tags = zg(zg({}, this._tags), t._tags)),
                (this._extra = zg(zg({}, this._extra), t._extra)),
                (this._contexts = zg(zg({}, this._contexts), t._contexts)),
                t._user && (this._user = t._user),
                t._level && (this._level = t._level),
                t._fingerprint && (this._fingerprint = t._fingerprint))
              : tm(t) &&
                ((t = t),
                (this._tags = zg(zg({}, this._tags), t.tags)),
                (this._extra = zg(zg({}, this._extra), t.extra)),
                (this._contexts = zg(zg({}, this._contexts), t.contexts)),
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
          var n = zg({ timestamp: wv.dateTimestampInSeconds() }, e);
          return (
            (this._breadcrumbs =
              void 0 !== t && t >= 0
                ? Wg(this._breadcrumbs, [n]).slice(-t)
                : Wg(this._breadcrumbs, [n])),
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
              (e.extra = zg(zg({}, this._extra), e.extra)),
            this._tags &&
              Object.keys(this._tags).length &&
              (e.tags = zg(zg({}, this._tags), e.tags)),
            this._user &&
              Object.keys(this._user).length &&
              (e.user = zg(zg({}, this._user), e.user)),
            this._contexts &&
              Object.keys(this._contexts).length &&
              (e.contexts = zg(zg({}, this._contexts), e.contexts)),
            this._level && (e.level = this._level),
            this._transactionName && (e.transaction = this._transactionName),
            this._span &&
              (e.contexts = zg(
                { trace: this._span.getTraceContext() },
                e.contexts
              )),
            this._applyFingerprint(e),
            (e.breadcrumbs = Wg(e.breadcrumbs || [], this._breadcrumbs)),
            (e.breadcrumbs = e.breadcrumbs.length > 0 ? e.breadcrumbs : void 0),
            this._notifyEventProcessors(Wg(xv(), this._eventProcessors), e, t)
          );
        }),
        (e.prototype._notifyEventProcessors = function (e, t, n, r) {
          var o = this;
          return (
            void 0 === r && (r = 0),
            new bv(function (i, a) {
              var s = e[r];
              if (null === t || "function" != typeof s) i(t);
              else {
                var l = s(zg({}, t), n);
                im(l)
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
  function xv() {
    var e = Um();
    return (
      (e.__SENTRY__ = e.__SENTRY__ || {}),
      (e.__SENTRY__.globalEventProcessors =
        e.__SENTRY__.globalEventProcessors || []),
      e.__SENTRY__.globalEventProcessors
    );
  }
  function Sv(e) {
    xv().push(e);
  }
  var Pv = (function () {
    function e(e, t, n) {
      void 0 === t && (t = new _v()),
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
          n = _v.clone(t);
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
        var n = (this._lastEventId = Nm()),
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
            zg(zg({}, r), { event_id: n })
          ),
          n
        );
      }),
      (e.prototype.captureMessage = function (e, t, n) {
        var r = (this._lastEventId = Nm()),
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
            zg(zg({}, o), { event_id: r })
          ),
          r
        );
      }),
      (e.prototype.captureEvent = function (e, t) {
        var n = (this._lastEventId = Nm());
        return (
          this._invokeClient("captureEvent", e, zg(zg({}, t), { event_id: n })),
          n
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
            var l = wv.dateTimestampInSeconds(),
              u = zg({ timestamp: l }, e),
              c = i
                ? Bm(function () {
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
        var t = Dv(this);
        try {
          e(this);
        } finally {
          Dv(t);
        }
      }),
      (e.prototype.getIntegration = function (e) {
        var t = this.getClient();
        if (!t) return null;
        try {
          return t.getIntegration(e);
        } catch (t) {
          return (
            Wm.warn(
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
          (t = o.client)[e].apply(t, Wg(n, [o.scope]));
      }),
      (e.prototype._callExtensionMethod = function (e) {
        for (var t = [], n = 1; n < arguments.length; n++)
          t[n - 1] = arguments[n];
        var r = kv(),
          o = r.__SENTRY__;
        if (o && o.extensions && "function" == typeof o.extensions[e])
          return o.extensions[e].apply(this, t);
        Wm.warn("Extension method " + e + " couldn't be found, doing nothing.");
      }),
      e
    );
  })();
  function kv() {
    var e = Um();
    return (e.__SENTRY__ = e.__SENTRY__ || { extensions: {}, hub: void 0 }), e;
  }
  function Dv(e) {
    var t = kv(),
      n = Tv(t);
    return Cv(t, e), n;
  }
  function Iv() {
    var e = kv();
    return (
      (Ev(e) && !Tv(e).isOlderThan(3)) || Cv(e, new Pv()),
      Mm.isNodeEnv()
        ? (function (e) {
            try {
              var t =
                (r = kv().__SENTRY__) &&
                r.extensions &&
                r.extensions.domain &&
                r.extensions.domain.active;
              if (!t) return Tv(e);
              if (!Ev(t) || Tv(t).isOlderThan(3)) {
                var n = Tv(e).getStackTop();
                Cv(t, new Pv(n.client, _v.clone(n.scope)));
              }
              return Tv(t);
            } catch (t) {
              return Tv(e);
            }
            var r;
          })(e)
        : Tv(e)
    );
  }
  function Ev(e) {
    return !!(e && e.__SENTRY__ && e.__SENTRY__.hub);
  }
  function Tv(e) {
    return (
      (e && e.__SENTRY__ && e.__SENTRY__.hub) ||
        ((e.__SENTRY__ = e.__SENTRY__ || {}), (e.__SENTRY__.hub = new Pv())),
      e.__SENTRY__.hub
    );
  }
  function Cv(e, t) {
    return (
      !!e && ((e.__SENTRY__ = e.__SENTRY__ || {}), (e.__SENTRY__.hub = t), !0)
    );
  }
  function Fv(e) {
    for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
    var r = Iv();
    if (r && r[e]) return r[e].apply(r, Wg(t));
    throw new Error(
      "No hub defined or " +
        e +
        " was not found on the hub, please open a bug report."
    );
  }
  function Av(e, t) {
    var n;
    try {
      throw new Error("Sentry syntheticException");
    } catch (e) {
      n = e;
    }
    return Fv("captureException", e, {
      captureContext: t,
      originalException: e,
      syntheticException: n,
    });
  }
  function Ov(e) {
    Fv("withScope", e);
  }
  var Mv = (function () {
      function e(e) {
        (this.dsn = e), (this._dsnObject = new hm(e));
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
          return Dm({ sentry_key: this._dsnObject.user, sentry_version: "7" });
        }),
        e
      );
    })(),
    Rv = [];
  function Uv(e) {
    var t = {};
    return (
      (function (e) {
        var t = (e.defaultIntegrations && Wg(e.defaultIntegrations)) || [],
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
            : (r = Wg(t));
        var a = r.map(function (e) {
            return e.name;
          }),
          s = "Debug";
        return (
          -1 !== a.indexOf(s) && r.push.apply(r, Wg(r.splice(a.indexOf(s), 1))),
          r
        );
      })(e).forEach(function (e) {
        (t[e.name] = e),
          (function (e) {
            -1 === Rv.indexOf(e.name) &&
              (e.setupOnce(Sv, Iv),
              Rv.push(e.name),
              Wm.log("Integration installed: " + e.name));
          })(e);
      }),
      t
    );
  }
  var Nv,
    jv,
    Lv,
    Bv,
    $v = (function () {
      function e(e, t) {
        (this._integrations = {}),
          (this._processing = !1),
          (this._backend = new e(t)),
          (this._options = t),
          t.dsn && (this._dsn = new hm(t.dsn));
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
            (em(e)
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
                Wm.error(e), (r._processing = !1);
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
          this._isEnabled() && (this._integrations = Uv(this._options));
        }),
        (e.prototype.getIntegration = function (e) {
          try {
            return this._integrations[e.id] || null;
          } catch (t) {
            return (
              Wm.warn(
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
          return new bv(function (n) {
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
            a = zg(zg({}, e), {
              event_id: e.event_id || (n && n.event_id ? n.event_id : Nm()),
              timestamp: e.timestamp || wv.dateTimestampInSeconds(),
            });
          this._applyClientOptions(a), this._applyIntegrationsMetadata(a);
          var s = t;
          n && n.captureContext && (s = _v.clone(s).update(n.captureContext));
          var l = bv.resolve(a);
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
          var n = zg(
            zg(
              zg(
                zg(
                  zg({}, e),
                  e.breadcrumbs && {
                    breadcrumbs: e.breadcrumbs.map(function (e) {
                      return zg(zg({}, e), e.data && { data: Am(e.data, t) });
                    }),
                  }
                ),
                e.user && { user: Am(e.user, t) }
              ),
              e.contexts && { contexts: Am(e.contexts, t) }
            ),
            e.extra && { extra: Am(e.extra, t) }
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
            e.message && (e.message = _m(e.message, a));
          var s = e.exception && e.exception.values && e.exception.values[0];
          s && s.value && (s.value = _m(s.value, a));
          var l = e.request;
          l && l.url && (l.url = _m(l.url, a));
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
            return bv.reject("SDK not enabled, will not send event.");
          var s = "transaction" === e.type;
          return !s && "number" == typeof a && Math.random() > a
            ? bv.reject("This event has been sampled, will not send event.")
            : new bv(function (o, a) {
                r._prepareEvent(e, n, t)
                  .then(function (e) {
                    if (null !== e) {
                      var n = e;
                      if ((t && t.data && !0 === t.data.__sentry__) || !i || s)
                        return r._sendEvent(n), void o(n);
                      var l = i(e, t);
                      if (void 0 === l)
                        Wm.error(
                          "`beforeSend` method has to return `null` or a valid event."
                        );
                      else if (im(l)) r._handleAsyncBeforeSend(l, o, a);
                      else {
                        if (null === (n = l))
                          return (
                            Wm.log(
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
  ((jv = Nv || (Nv = {})).Fatal = "fatal"),
    (jv.Error = "error"),
    (jv.Warning = "warning"),
    (jv.Log = "log"),
    (jv.Info = "info"),
    (jv.Debug = "debug"),
    (jv.Critical = "critical"),
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
    })(Nv || (Nv = {})),
    ((Bv = Lv || (Lv = {})).Unknown = "unknown"),
    (Bv.Skipped = "skipped"),
    (Bv.Success = "success"),
    (Bv.RateLimit = "rate_limit"),
    (Bv.Invalid = "invalid"),
    (Bv.Failed = "failed"),
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
    })(Lv || (Lv = {}));
  var Vv = (function () {
      function e() {}
      return (
        (e.prototype.sendEvent = function (e) {
          return bv.resolve({
            reason:
              "NoopTransport: Event has been skipped because no Dsn is configured.",
            status: Lv.Skipped,
          });
        }),
        (e.prototype.close = function (e) {
          return bv.resolve(!0);
        }),
        e
      );
    })(),
    Hv = (function () {
      function e(e) {
        (this._options = e),
          this._options.dsn ||
            Wm.warn("No DSN provided, backend will not do anything."),
          (this._transport = this._setupTransport());
      }
      return (
        (e.prototype.eventFromException = function (e, t) {
          throw new dm("Backend has to implement `eventFromException` method");
        }),
        (e.prototype.eventFromMessage = function (e, t, n) {
          throw new dm("Backend has to implement `eventFromMessage` method");
        }),
        (e.prototype.sendEvent = function (e) {
          this._transport.sendEvent(e).then(null, function (e) {
            Wm.error("Error while sending event: " + e);
          });
        }),
        (e.prototype.getTransport = function () {
          return this._transport;
        }),
        (e.prototype._setupTransport = function () {
          return new Vv();
        }),
        e
      );
    })();
  function zv(e, t) {
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
  var qv,
    Gv = {},
    Wv = (function () {
      function e() {
        this.name = e.id;
      }
      return (
        (e.prototype.setupOnce = function () {
          (qv = Function.prototype.toString),
            (Function.prototype.toString = function () {
              for (var e = [], t = 0; t < arguments.length; t++)
                e[t] = arguments[t];
              var n = this.__sentry_original__ || this;
              return qv.apply(n, e);
            });
        }),
        (e.id = "FunctionToString"),
        e
      );
    })(),
    Jv = [/^Script error\.?$/, /^Javascript error: Script error\.? on line 0$/],
    Qv = (function () {
      function e(t) {
        void 0 === t && (t = {}), (this._options = t), (this.name = e.id);
      }
      return (
        (e.prototype.setupOnce = function () {
          Sv(function (t) {
            var n = Iv();
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
            ? (Wm.warn(
                "Event dropped due to being internal Sentry Error.\nEvent: " +
                  Lm(e)
              ),
              !0)
            : this._isIgnoredError(e, t)
            ? (Wm.warn(
                "Event dropped due to being matched by `ignoreErrors` option.\nEvent: " +
                  Lm(e)
              ),
              !0)
            : this._isDeniedUrl(e, t)
            ? (Wm.warn(
                "Event dropped due to being matched by `denyUrls` option.\nEvent: " +
                  Lm(e) +
                  ".\nUrl: " +
                  this._getEventFilterUrl(e)
              ),
              !0)
            : !this._isAllowedUrl(e, t) &&
              (Wm.warn(
                "Event dropped due to not being matched by `allowUrls` option.\nEvent: " +
                  Lm(e) +
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
                return Pm(e, t);
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
              return Pm(n, e);
            })
          );
        }),
        (e.prototype._isAllowedUrl = function (e, t) {
          if (!t.allowUrls || !t.allowUrls.length) return !0;
          var n = this._getEventFilterUrl(e);
          return (
            !n ||
            t.allowUrls.some(function (e) {
              return Pm(n, e);
            })
          );
        }),
        (e.prototype._mergeOptions = function (e) {
          return (
            void 0 === e && (e = {}),
            {
              allowUrls: Wg(
                this._options.whitelistUrls || [],
                this._options.allowUrls || [],
                e.whitelistUrls || [],
                e.allowUrls || []
              ),
              denyUrls: Wg(
                this._options.blacklistUrls || [],
                this._options.denyUrls || [],
                e.blacklistUrls || [],
                e.denyUrls || []
              ),
              ignoreErrors: Wg(
                this._options.ignoreErrors || [],
                e.ignoreErrors || [],
                Jv
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
              return Wm.error("Cannot extract message for event " + Lm(e)), [];
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
            return Wm.error("Cannot extract url for event " + Lm(e)), null;
          }
        }),
        (e.id = "InboundFilters"),
        e
      );
    })();
  r(Gv, "FunctionToString", function () {
    return Wv;
  }),
    r(Gv, "InboundFilters", function () {
      return Qv;
    });
  var Yv = "?",
    Kv =
      /^\s*at (?:(.*?) ?\()?((?:file|https?|blob|chrome-extension|address|native|eval|webpack|<anonymous>|[-a-z]+:|.*bundle|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i,
    Xv =
      /^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:file|https?|blob|chrome|webpack|resource|moz-extension|capacitor).*?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js))(?::(\d+))?(?::(\d+))?\s*$/i,
    Zv =
      /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i,
    eb = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i,
    tb = /\((\S*)(?::(\d+))(?::(\d+))\)/,
    nb = /Minified React error #\d+;/i;
  function rb(e) {
    var t = null,
      n = 0;
    e &&
      ("number" == typeof e.framesToPop
        ? (n = e.framesToPop)
        : nb.test(e.message) && (n = 1));
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
              l && (!l.func && l.line && (l.func = Yv), a.push(l));
          }
          if (!a.length) return null;
          return { message: ib(e), name: e.name, stack: a };
        })(e))
      )
        return ob(t, n);
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
            if ((n = Kv.exec(i[a]))) {
              var s = n[2] && 0 === n[2].indexOf("native");
              n[2] &&
                0 === n[2].indexOf("eval") &&
                (t = tb.exec(n[2])) &&
                ((n[2] = t[1]), (n[3] = t[2]), (n[4] = t[3])),
                (r = {
                  url:
                    n[2] && 0 === n[2].indexOf("address at ")
                      ? n[2].substr("address at ".length)
                      : n[2],
                  func: n[1] || Yv,
                  args: s ? [n[2]] : [],
                  line: n[3] ? +n[3] : null,
                  column: n[4] ? +n[4] : null,
                });
            } else if ((n = Zv.exec(i[a])))
              r = {
                url: n[2],
                func: n[1] || Yv,
                args: [],
                line: +n[3],
                column: n[4] ? +n[4] : null,
              };
            else {
              if (!(n = Xv.exec(i[a]))) continue;
              n[3] && n[3].indexOf(" > eval") > -1 && (t = eb.exec(n[3]))
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
                  func: n[1] || Yv,
                  args: n[2] ? n[2].split(",") : [],
                  line: n[4] ? +n[4] : null,
                  column: n[5] ? +n[5] : null,
                });
            }
            !r.func && r.line && (r.func = Yv), o.push(r);
          }
          if (!o.length) return null;
          return { message: ib(e), name: e.name, stack: o };
        })(e))
      )
        return ob(t, n);
    } catch (e) {}
    return { message: ib(e), name: e && e.name, stack: [], failed: !0 };
  }
  function ob(e, t) {
    try {
      return zg(zg({}, e), { stack: e.stack.slice(t) });
    } catch (t) {
      return e;
    }
  }
  function ib(e) {
    var t = e && e.message;
    return t
      ? t.error && "string" == typeof t.error.message
        ? t.error.message
        : t
      : "No error message";
  }
  function ab(e) {
    var t = lb(e.stack),
      n = { type: e.name, value: e.message };
    return (
      t && t.length && (n.stacktrace = { frames: t }),
      void 0 === n.type &&
        "" === n.value &&
        (n.value = "Unrecoverable error caught"),
      n
    );
  }
  function sb(e) {
    return { exception: { values: [ab(e)] } };
  }
  function lb(e) {
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
  function ub(e, t, n) {
    var r;
    if ((void 0 === n && (n = {}), Yg(e) && e.error))
      return (r = sb(rb((e = e.error))));
    if (Kg(e) || Xg(e)) {
      var o = e,
        i = o.name || (Kg(o) ? "DOMError" : "DOMException"),
        a = o.message ? i + ": " + o.message : i;
      return $m((r = cb(a, t, n)), a), r;
    }
    return Qg(e)
      ? (r = sb(rb(e)))
      : tm(e) || nm(e)
      ? (Vm(
          (r = (function (e, t, n) {
            var r = {
              exception: {
                values: [
                  {
                    type: nm(e)
                      ? e.constructor.name
                      : n
                      ? "UnhandledRejection"
                      : "Error",
                    value:
                      "Non-Error " +
                      (n ? "promise rejection" : "exception") +
                      " captured with keys: " +
                      Om(e),
                  },
                ],
              },
              extra: { __serialized__: Tm(e) },
            };
            if (t) {
              var o = lb(rb(t).stack);
              r.stacktrace = { frames: o };
            }
            return r;
          })(e, t, n.rejection)),
          { synthetic: !0 }
        ),
        r)
      : ($m((r = cb(e, t, n)), "" + e, void 0), Vm(r, { synthetic: !0 }), r);
  }
  function cb(e, t, n) {
    void 0 === n && (n = {});
    var r = { message: e };
    if (n.attachStacktrace && t) {
      var o = lb(rb(t).stack);
      r.stacktrace = { frames: o };
    }
    return r;
  }
  var db = {},
    fb = (function () {
      function e(e) {
        (this.options = e),
          (this._buffer = new yv(30)),
          (this._api = new Mv(this.options.dsn)),
          (this.url = this._api.getStoreEndpointWithUrlEncodedAuth());
      }
      return (
        (e.prototype.sendEvent = function (e) {
          throw new dm("Transport Class has to implement `sendEvent` method");
        }),
        (e.prototype.close = function (e) {
          return this._buffer.drain(e);
        }),
        e
      );
    })(),
    pb = Um(),
    hb = (function (e) {
      function t() {
        var t = (null !== e && e.apply(this, arguments)) || this;
        return (t._disabledUntil = new Date(Date.now())), t;
      }
      return (
        Hg(t, e),
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
          var n = zv(e, this._api),
            r = {
              body: n.body,
              method: "POST",
              referrerPolicy: Xm() ? "origin" : "",
            };
          return (
            void 0 !== this.options.fetchParameters &&
              Object.assign(r, this.options.fetchParameters),
            void 0 !== this.options.headers &&
              (r.headers = this.options.headers),
            this._buffer.add(
              new bv(function (e, o) {
                pb.fetch(n.url, r)
                  .then(function (n) {
                    var r = Lv.fromHttpCode(n.status);
                    if (r !== Lv.Success) {
                      if (r === Lv.RateLimit) {
                        var i = Date.now(),
                          a = n.headers.get("Retry-After");
                        (t._disabledUntil = new Date(i + zm(i, a))),
                          Wm.warn(
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
    })(fb),
    gb = (function (e) {
      function t() {
        var t = (null !== e && e.apply(this, arguments)) || this;
        return (t._disabledUntil = new Date(Date.now())), t;
      }
      return (
        Hg(t, e),
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
          var n = zv(e, this._api);
          return this._buffer.add(
            new bv(function (e, r) {
              var o = new XMLHttpRequest();
              for (var i in ((o.onreadystatechange = function () {
                if (4 === o.readyState) {
                  var n = Lv.fromHttpCode(o.status);
                  if (n !== Lv.Success) {
                    if (n === Lv.RateLimit) {
                      var i = Date.now(),
                        a = o.getResponseHeader("Retry-After");
                      (t._disabledUntil = new Date(i + zm(i, a))),
                        Wm.warn(
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
    })(fb);
  r(db, "BaseTransport", function () {
    return fb;
  }),
    r(db, "FetchTransport", function () {
      return hb;
    }),
    r(db, "XHRTransport", function () {
      return gb;
    });
  var mb = (function (e) {
      function t() {
        return (null !== e && e.apply(this, arguments)) || this;
      }
      return (
        Hg(t, e),
        (t.prototype.eventFromException = function (e, t) {
          return (function (e, t, n) {
            var r = ub(t, (n && n.syntheticException) || void 0, {
              attachStacktrace: e.attachStacktrace,
            });
            return (
              Vm(r, { handled: !0, type: "generic" }),
              (r.level = Nv.Error),
              n && n.event_id && (r.event_id = n.event_id),
              bv.resolve(r)
            );
          })(this._options, e, t);
        }),
        (t.prototype.eventFromMessage = function (e, t, n) {
          return (
            void 0 === t && (t = Nv.Info),
            (function (e, t, n, r) {
              void 0 === n && (n = Nv.Info);
              var o = cb(t, (r && r.syntheticException) || void 0, {
                attachStacktrace: e.attachStacktrace,
              });
              return (
                (o.level = n),
                r && r.event_id && (o.event_id = r.event_id),
                bv.resolve(o)
              );
            })(this._options, e, t, n)
          );
        }),
        (t.prototype._setupTransport = function () {
          if (!this._options.dsn) return e.prototype._setupTransport.call(this);
          var t = zg(zg({}, this._options.transportOptions), {
            dsn: this._options.dsn,
          });
          return this._options.transport
            ? new this._options.transport(t)
            : Qm()
            ? new hb(t)
            : new gb(t);
        }),
        t
      );
    })(Hv),
    vb = 0;
  function bb() {
    return vb > 0;
  }
  function yb() {
    (vb += 1),
      setTimeout(function () {
        vb -= 1;
      });
  }
  function wb(e, t, n) {
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
          return wb(e, t);
        });
        return e.handleEvent ? e.handleEvent.apply(this, o) : e.apply(this, o);
      } catch (e) {
        throw (
          (yb(),
          Ov(function (n) {
            n.addEventProcessor(function (e) {
              var n = zg({}, e);
              return (
                t.mechanism && ($m(n, void 0, void 0), Vm(n, t.mechanism)),
                (n.extra = zg(zg({}, n.extra), { arguments: r })),
                n
              );
            }),
              Av(e);
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
  function _b(e) {
    if ((void 0 === e && (e = {}), e.eventId))
      if (e.dsn) {
        var t = document.createElement("script");
        (t.async = !0),
          (t.src = new Mv(e.dsn).getReportDialogEndpoint(e)),
          e.onLoad && (t.onload = e.onLoad),
          (document.head || document.body).appendChild(t);
      } else Wm.error("Missing dsn option in showReportDialog call");
    else Wm.error("Missing eventId option in showReportDialog call");
  }
  var xb = {},
    Sb = (function () {
      function e(t) {
        (this.name = e.id),
          (this._onErrorHandlerInstalled = !1),
          (this._onUnhandledRejectionHandlerInstalled = !1),
          (this._options = zg({ onerror: !0, onunhandledrejection: !0 }, t));
      }
      return (
        (e.prototype.setupOnce = function () {
          (Error.stackTraceLimit = 50),
            this._options.onerror &&
              (Wm.log("Global Handler attached: onerror"),
              this._installGlobalOnErrorHandler()),
            this._options.onunhandledrejection &&
              (Wm.log("Global Handler attached: onunhandledrejection"),
              this._installGlobalOnUnhandledRejectionHandler());
        }),
        (e.prototype._installGlobalOnErrorHandler = function () {
          var t = this;
          this._onErrorHandlerInstalled ||
            (iv({
              callback: function (n) {
                var r = n.error,
                  o = Iv(),
                  i = o.getIntegration(e),
                  a = r && !0 === r.__sentry_own_request__;
                if (i && !bb() && !a) {
                  var s = o.getClient(),
                    l = em(r)
                      ? t._eventFromIncompleteOnError(
                          n.msg,
                          n.url,
                          n.line,
                          n.column
                        )
                      : t._enhanceEventWithInitialFrame(
                          ub(r, void 0, {
                            attachStacktrace:
                              s && s.getOptions().attachStacktrace,
                            rejection: !1,
                          }),
                          n.url,
                          n.line,
                          n.column
                        );
                  Vm(l, { handled: !1, type: "onerror" }),
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
            (iv({
              callback: function (n) {
                var r = n;
                try {
                  "reason" in n
                    ? (r = n.reason)
                    : "detail" in n &&
                      "reason" in n.detail &&
                      (r = n.detail.reason);
                } catch (e) {}
                var o = Iv(),
                  i = o.getIntegration(e),
                  a = r && !0 === r.__sentry_own_request__;
                if (!i || bb() || a) return !0;
                var s = o.getClient(),
                  l = em(r)
                    ? t._eventFromIncompleteRejection(r)
                    : ub(r, void 0, {
                        attachStacktrace: s && s.getOptions().attachStacktrace,
                        rejection: !0,
                      });
                (l.level = Nv.Error),
                  Vm(l, { handled: !1, type: "onunhandledrejection" }),
                  o.captureEvent(l, { originalException: r });
              },
              type: "unhandledrejection",
            }),
            (this._onUnhandledRejectionHandlerInstalled = !0));
        }),
        (e.prototype._eventFromIncompleteOnError = function (e, t, n, r) {
          var o,
            i = Yg(e) ? e.message : e;
          if (Zg(i)) {
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
            a = Zg(t) && t.length > 0 ? t : Hm();
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
    Pb = [
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
    kb = (function () {
      function e(t) {
        (this.name = e.id),
          (this._options = zg(
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
          var e = Um();
          (this._options.setTimeout &&
            km(e, "setTimeout", this._wrapTimeFunction.bind(this)),
          this._options.setInterval &&
            km(e, "setInterval", this._wrapTimeFunction.bind(this)),
          this._options.requestAnimationFrame &&
            km(e, "requestAnimationFrame", this._wrapRAF.bind(this)),
          this._options.XMLHttpRequest &&
            "XMLHttpRequest" in e &&
            km(XMLHttpRequest.prototype, "send", this._wrapXHR.bind(this)),
          this._options.eventTarget) &&
            (Array.isArray(this._options.eventTarget)
              ? this._options.eventTarget
              : Pb
            ).forEach(this._wrapEventTarget.bind(this));
        }),
        (e.prototype._wrapTimeFunction = function (e) {
          return function () {
            for (var t = [], n = 0; n < arguments.length; n++)
              t[n] = arguments[n];
            var r = t[0];
            return (
              (t[0] = wb(r, {
                mechanism: {
                  data: { function: ym(e) },
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
              wb(t, {
                mechanism: {
                  data: { function: "requestAnimationFrame", handler: ym(e) },
                  handled: !0,
                  type: "instrument",
                },
              })
            );
          };
        }),
        (e.prototype._wrapEventTarget = function (e) {
          var t = Um(),
            n = t[e] && t[e].prototype;
          n &&
            n.hasOwnProperty &&
            n.hasOwnProperty("addEventListener") &&
            (km(n, "addEventListener", function (t) {
              return function (n, r, o) {
                try {
                  "function" == typeof r.handleEvent &&
                    (r.handleEvent = wb(r.handleEvent.bind(r), {
                      mechanism: {
                        data: {
                          function: "handleEvent",
                          handler: ym(r),
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
                  wb(r, {
                    mechanism: {
                      data: {
                        function: "addEventListener",
                        handler: ym(r),
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
            km(n, "removeEventListener", function (e) {
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
                  km(r, e, function (t) {
                    var n = {
                      mechanism: {
                        data: { function: e, handler: ym(t) },
                        handled: !0,
                        type: "instrument",
                      },
                    };
                    return (
                      t.__sentry_original__ &&
                        (n.mechanism.data.handler = ym(t.__sentry_original__)),
                      wb(t, n)
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
    Db = (function () {
      function e(t) {
        (this.name = e.id),
          (this._options = zg(
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
            Iv().addBreadcrumb(
              {
                category:
                  "sentry." +
                  ("transaction" === e.type ? "transaction" : "event"),
                event_id: e.event_id,
                level: e.level,
                message: Lm(e),
              },
              { event: e }
            );
        }),
        (e.prototype.setupOnce = function () {
          var e = this;
          this._options.console &&
            iv({
              callback: function () {
                for (var t = [], n = 0; n < arguments.length; n++)
                  t[n] = arguments[n];
                e._consoleBreadcrumb.apply(e, Wg(t));
              },
              type: "console",
            }),
            this._options.dom &&
              iv({
                callback: function () {
                  for (var t = [], n = 0; n < arguments.length; n++)
                    t[n] = arguments[n];
                  e._domBreadcrumb.apply(e, Wg(t));
                },
                type: "dom",
              }),
            this._options.xhr &&
              iv({
                callback: function () {
                  for (var t = [], n = 0; n < arguments.length; n++)
                    t[n] = arguments[n];
                  e._xhrBreadcrumb.apply(e, Wg(t));
                },
                type: "xhr",
              }),
            this._options.fetch &&
              iv({
                callback: function () {
                  for (var t = [], n = 0; n < arguments.length; n++)
                    t[n] = arguments[n];
                  e._fetchBreadcrumb.apply(e, Wg(t));
                },
                type: "fetch",
              }),
            this._options.history &&
              iv({
                callback: function () {
                  for (var t = [], n = 0; n < arguments.length; n++)
                    t[n] = arguments[n];
                  e._historyBreadcrumb.apply(e, Wg(t));
                },
                type: "history",
              });
        }),
        (e.prototype._consoleBreadcrumb = function (e) {
          var t = {
            category: "console",
            data: { arguments: e.args, logger: "console" },
            level: Nv.fromString(e.level),
            message: Sm(e.args, " "),
          };
          if ("assert" === e.level) {
            if (!1 !== e.args[0]) return;
            (t.message =
              "Assertion failed: " +
              (Sm(e.args.slice(1), " ") || "console.assert")),
              (t.data.arguments = e.args.slice(1));
          }
          Iv().addBreadcrumb(t, { input: e.args, level: e.level });
        }),
        (e.prototype._domBreadcrumb = function (e) {
          var t;
          try {
            t = e.event.target ? lm(e.event.target) : lm(e.event);
          } catch (e) {
            t = "<unknown>";
          }
          0 !== t.length &&
            Iv().addBreadcrumb(
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
            Iv().addBreadcrumb(
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
                ? Iv().addBreadcrumb(
                    {
                      category: "fetch",
                      data: e.fetchData,
                      level: Nv.Error,
                      type: "http",
                    },
                    { data: e.error, input: e.args }
                  )
                : Iv().addBreadcrumb(
                    {
                      category: "fetch",
                      data: zg(zg({}, e.fetchData), {
                        status_code: e.response.status,
                      }),
                      type: "http",
                    },
                    { input: e.args, response: e.response }
                  )));
        }),
        (e.prototype._historyBreadcrumb = function (e) {
          var t = Um(),
            n = e.from,
            r = e.to,
            o = jm(t.location.href),
            i = jm(n),
            a = jm(r);
          i.path || (i = o),
            o.protocol === a.protocol && o.host === a.host && (r = a.relative),
            o.protocol === i.protocol && o.host === i.host && (n = i.relative),
            Iv().addBreadcrumb({
              category: "navigation",
              data: { from: n, to: r },
            });
        }),
        (e.id = "Breadcrumbs"),
        e
      );
    })(),
    Ib = (function () {
      function e(t) {
        void 0 === t && (t = {}),
          (this.name = e.id),
          (this._key = t.key || "cause"),
          (this._limit = t.limit || 5);
      }
      return (
        (e.prototype.setupOnce = function () {
          Sv(function (t, n) {
            var r = Iv().getIntegration(e);
            return r ? r._handler(t, n) : t;
          });
        }),
        (e.prototype._handler = function (e, t) {
          if (
            !(
              e.exception &&
              e.exception.values &&
              t &&
              sm(t.originalException, Error)
            )
          )
            return e;
          var n = this._walkErrorTree(t.originalException, this._key);
          return (e.exception.values = Wg(n, e.exception.values)), e;
        }),
        (e.prototype._walkErrorTree = function (e, t, n) {
          if (
            (void 0 === n && (n = []),
            !sm(e[t], Error) || n.length + 1 >= this._limit)
          )
            return n;
          var r = ab(rb(e[t]));
          return this._walkErrorTree(e[t], t, Wg([r], n));
        }),
        (e.id = "LinkedErrors"),
        e
      );
    })(),
    Eb = Um(),
    Tb = (function () {
      function e() {
        this.name = e.id;
      }
      return (
        (e.prototype.setupOnce = function () {
          Sv(function (t) {
            var n, r, o;
            if (Iv().getIntegration(e)) {
              if (!Eb.navigator && !Eb.location && !Eb.document) return t;
              var i =
                  (null === (n = t.request) || void 0 === n ? void 0 : n.url) ||
                  (null === (r = Eb.location) || void 0 === r
                    ? void 0
                    : r.href),
                a = (Eb.document || {}).referrer,
                s = (Eb.navigator || {}).userAgent,
                l = zg(
                  zg(
                    zg(
                      {},
                      null === (o = t.request) || void 0 === o
                        ? void 0
                        : o.headers
                    ),
                    a && { Referer: a }
                  ),
                  s && { "User-Agent": s }
                ),
                u = zg(zg({}, i && { url: i }), { headers: l });
              return zg(zg({}, t), { request: u });
            }
            return t;
          });
        }),
        (e.id = "UserAgent"),
        e
      );
    })();
  r(xb, "GlobalHandlers", function () {
    return Sb;
  }),
    r(xb, "TryCatch", function () {
      return kb;
    }),
    r(xb, "Breadcrumbs", function () {
      return Db;
    }),
    r(xb, "LinkedErrors", function () {
      return Ib;
    }),
    r(xb, "UserAgent", function () {
      return Tb;
    });
  var Cb = "5.25.0",
    Fb = (function (e) {
      function t(t) {
        return void 0 === t && (t = {}), e.call(this, mb, t) || this;
      }
      return (
        Hg(t, e),
        (t.prototype.showReportDialog = function (e) {
          void 0 === e && (e = {}),
            Um().document &&
              (this._isEnabled()
                ? _b(zg(zg({}, e), { dsn: e.dsn || this.getDsn() }))
                : Wm.error(
                    "Trying to call showReportDialog with Sentry Client disabled"
                  ));
        }),
        (t.prototype._prepareEvent = function (t, n, r) {
          return (
            (t.platform = t.platform || "javascript"),
            (t.sdk = zg(zg({}, t.sdk), {
              name: "sentry.javascript.browser",
              packages: Wg((t.sdk && t.sdk.packages) || [], [
                { name: "npm:@sentry/browser", version: Cb },
              ]),
              version: Cb,
            })),
            e.prototype._prepareEvent.call(this, t, n, r)
          );
        }),
        (t.prototype._sendEvent = function (t) {
          var n = this.getIntegration(Db);
          n && n.addSentryBreadcrumb(t), e.prototype._sendEvent.call(this, t);
        }),
        t
      );
    })($v),
    Ab = [
      new Gv.InboundFilters(),
      new Gv.FunctionToString(),
      new kb(),
      new Db(),
      new Sb(),
      new Ib(),
      new Tb(),
    ];
  function Ob(e) {
    if (
      (void 0 === e && (e = {}),
      void 0 === e.defaultIntegrations && (e.defaultIntegrations = Ab),
      void 0 === e.release)
    ) {
      var t = Um();
      t.SENTRY_RELEASE &&
        t.SENTRY_RELEASE.id &&
        (e.release = t.SENTRY_RELEASE.id);
    }
    !(function (e, t) {
      !0 === t.debug && Wm.enable();
      var n = Iv(),
        r = new e(t);
      n.bindClient(r);
    })(Fb, e);
  }
  const { $influx: Mb, $bus: Rb, $env: Ub } = app,
    Nb = [
      "ResizeObserver loop limit exceeded",
      "Unable to preventDefault inside passive event listener",
      "Extension context invalidated.",
      "Invalid or unexpected token",
      "AbortError: The play() request was interrupted by a call to pause(). https://goo.gl/LdLk22",
      "InvalidStateError: Failed to execute 'transaction' on 'IDBDatabase'",
      "Timed out",
      "Failed to fetch",
    ];
  var jb = {
    controller: {
      throttle: !1,
      init: function ({ throttleBy: e = 10, dsn: t }) {
        if (t) {
          if (((this.dsn = t), Ub.is.development)) this.throttle = !1;
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
        Ub.is.development ||
          (Ob({
            dsn: this.dsn,
            release: Ub.version,
            debug: Ub.is.development,
            ignoreErrors: Nb,
            environment: Ub.is.development
              ? "development"
              : Ub.is.production
              ? "production"
              : "unknown",
            beforeSend: (e, t) => {
              if (Ub.is.production && "debug" === e.level) return null;
              if (this.throttle) return null;
              const n = Mb.model;
              if (n.store && n.state) {
                let t = { ...n.state, authStatus: { ...n.state.authStatus } };
                delete t.authStatus.cookies,
                  (t = JSON.stringify(t)),
                  (t =
                    t.length > 102400 ? t.substr(0, 102400) + "..." : n.state),
                  (e.extra = { ...(e.extra || {}), state: t });
              }
              const r = t.originalException,
                o = (r && r.message) || String(r);
              return o && Nb.some((e) => o.includes(e)) ? null : e;
            },
          }),
          log("sentry-controller: initialisation succeeded"));
      },
      sendError: function (e, t = "error", n = null, r = null) {
        console.log("%csentry", "color: #c818dc", e, n),
          Ub.is.bg &&
            Rb.send(
              "popup.log",
              "%csentry error [background]",
              "color: #c818dc",
              e,
              n
            ),
          "string" == typeof e && (e = new Error(e)),
          Fv("configureScope", (o) => {
            o.setFingerprint([e.message]), o.setLevel(t);
            const i = Mb.model;
            if (
              (i.store &&
                i.state &&
                i.state.authStatus &&
                o.setUser({ username: i.state.authStatus.username }),
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
          Av(e);
      },
    },
  };
  const { $influx: Lb } = app;
  Bg.fspringController = {
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
        Lb.model.observe(
          (e) => (e.authStatus ? e.authStatus.username : null),
          () => {
            this.recordUsernames();
          },
          !0
        ),
        Lb.model.observe(
          (e) =>
            e.billing && e.billing.account ? e.billing.account.token : null,
          () => {
            this.recordUsernames();
          },
          !1
        ),
        Lb.model.observe(
          (e) =>
            e.billing && e.billing.account ? e.billing.account.token : null,
          () => {
            this.updateFSpringStatus();
          },
          !1
        );
    },
    recordUsernames: function () {
      const { billing: e, authStatus: t } = Lb.model.state,
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
          Lb.transaction((e) => {
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
      const { billing: t } = Lb.model.state,
        n = t.account ? t.account.token : null;
      if (n) {
        const t = "/fspring/data";
        this.parent.apiSender
          .send(t, { token: n })
          .then((t) => {
            if (!t || "ok" !== t.status) throw t;
            Lb.transaction((e) => {
              (e.billing.subscriptions = t.subscriptions || {}),
                (e.billing.products = t.products || {}),
                (e.billing.orders = t.orders || []);
            }),
              this.parent.reply(e, Lb.model.state.billing);
          })
          .catch((n) => {
            ("TypeError" === n.name && "Failed to fetch" === n.message) ||
              ("forbidden" === n.status ||
              "unauthorized" === n.status ||
              "account-not-found" === n.status ||
              "account-is-not-active" === n.status
                ? Lb.transaction((e) => {
                    (e.billing.account.email = null),
                      (e.billing.account.token = null);
                  })
                : jb.controller.sendError(
                    `Unexpected API error at ${t}`,
                    "error",
                    { error: n },
                    { actor: "auth" }
                  )),
              this.parent.reply(e, Lb.model.state.billing);
          });
      } else
        Lb.transaction((e) => {
          (e.billing.optimistic = null),
            (e.billing.subscriptions = {}),
            (e.billing.products = {}),
            (e.billing.orders = []);
        }),
          this.parent.reply(e, Lb.model.state.billing);
      return !!e;
    },
    onFSpringSubscriptionSuccess: function (e, t) {
      log("billing: handling fspring subscription success..."),
        Lb.transaction((e) => {
          (e.billing.optimistic = {
            on: Date.now(),
            plan: e.billing.purchasingPlan.id,
          }),
            (e.billing.purchasingPlan = null);
        });
      const n = JSON.stringify({
          subscriptions: Lb.model.state.billing.subscriptions,
          products: Lb.model.state.billing.products,
          orders: Lb.model.state.billing.orders,
        }),
        r = Date.now();
      let o = 3e3;
      const i = () => {
        log("billing: polling server for status update..."),
          Lb.model.state.billing.optimistic &&
            this.updateFSpringStatus((e) => {
              const t = Date.now();
              t - r > 36e5
                ? Lb.transaction((e) => {
                    e.billing.optimistic = null;
                  })
                : ((e = JSON.stringify({
                    subscriptions: e.subscriptions,
                    products: e.products,
                    orders: e.orders,
                  })),
                  n === e
                    ? ((o = t - r > 3e4 ? 6e5 : 3e3), setTimeout(i, o))
                    : Lb.transaction((e) => {
                        e.billing.optimistic = null;
                      }));
            });
      };
      return setTimeout(i, o), !!t;
    },
    onFSpringSubscriptionFailure: function (e, t) {
      return (
        log("billing: handling fspring subscription failure..."),
        Lb.transaction((e) => {
          e.billing.purchasingPlan = null;
        }),
        !!t
      );
    },
  };
  const { $influx: Bb, $env: $b } = app;
  Bg.promocodeController = {
    init: function ({ parent: e }) {
      (this.parent = e),
        Bb.model.observe(
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
      const { username: t, userId: n } = Bb.model.state.authStatus;
      if (t) {
        const r = { username: t, userId: n };
        if ($b.options.collectBillingStats) {
          const {
            followersCount: e,
            followingsCount: t,
            postsCount: o,
          } = Bb.model.state.userDetails[n] || {};
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
            Bb.model.state.billing.promocode !== n &&
              Bb.transaction((e) => (e.billing.promocode = n)),
              this.parent.reply(e, n);
          })
          .catch((t) => {
            log(`  retrieving promocode failed: ${JSON.stringify(t)}`),
              this.parent.reply(e, Bb.model.state.billing.promocode);
          });
      } else
        log("  no username to retrieve promocode for"),
          this.parent.reply(e, Bb.model.state.billing.promocode);
      return !!e;
    },
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
          var n = Ge(e),
            r = !n && qe(e),
            o = !n && !r && We(e),
            i = !n && !r && !o && Ye(e);
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
          if (!j(e)) return e;
          if ((r = Ge(e))) {
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
                    : $e(ye(e))),
                !s)
              )
                return l
                  ? (function (e, t) {
                      return k(e, He(e), t);
                    })(
                      e,
                      (function (e, t) {
                        return e && k(t, $(t), e);
                      })(a, e)
                    )
                  : (function (e, t) {
                      return k(e, Ve(e), t);
                    })(
                      e,
                      (function (e, t) {
                        return e && k(t, B(t), e);
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
                      ((t = new e.constructor(e.source, q.exec(e))).lastIndex =
                        e.lastIndex),
                      t
                    );
                  case "[object Set]":
                    return new r();
                  case "[object Symbol]":
                    return Be ? Object(Be.call(e)) : {};
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
          if (Je(e))
            return (
              e.forEach(function (r, o) {
                a.set(o, y(r, t, n, o, e, i));
              }),
              a
            );
          l = u ? (l ? T : E) : l ? $ : B;
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
          return (t = t(e)), Ge(e) ? t : r(t, n(e));
        }
        function _(e) {
          if (null == e) e = e === z ? "[object Undefined]" : "[object Null]";
          else if (Se && Se in Object(e)) {
            var t = de.call(e, Se),
              n = e[Se];
            try {
              e[Se] = z;
              var r = !0;
            } catch (e) {}
            var o = pe.call(e);
            r && (t ? (e[Se] = n) : delete e[Se]), (e = o);
          } else e = pe.call(e);
          return e;
        }
        function x(e) {
          return L(e) && "[object Arguments]" == _(e);
        }
        function S(e, t, n, r, o) {
          if (e === t) t = !0;
          else if (null == e || null == t || (!L(e) && !L(t)))
            t = e != e && t != t;
          else
            e: {
              var i,
                a,
                s = Ge(e),
                l = Ge(t),
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
                    s || Ye(e) ? D(e, t, n, r, S, o) : I(e, t, i, n, r, S, o));
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
                    (t = S(e, t, n, r, o));
                  break e;
                }
                if (a)
                  t: if (
                    (o || (o = new h()),
                    (s = 1 & n),
                    (i = E(e)),
                    (l = i.length),
                    (a = E(t).length),
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
                        if (g === z ? f !== p && !S(f, p, n, r, o) : !g) {
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
        function k(e, t, n) {
          var r = !n;
          n || (n = {});
          for (var o = -1, i = t.length; ++o < i; ) {
            var a = t[o],
              s = z;
            s === z && (s = e[a]), r ? b(n, a, s) : m(n, a, s);
          }
          return n;
        }
        function D(e, t, n, r, i, a) {
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
        function I(e, t, n, r, o, i, s) {
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
                  (t = D(u(e), u(t), r, o, i, s)),
                  s.delete(e),
                  t);
            case "[object Symbol]":
              if (Be) return Be.call(e) == Be.call(t);
          }
          return !1;
        }
        function E(e) {
          return w(e, B, Ve);
        }
        function T(e) {
          return w(e, $, He);
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
          return !j(n) || (fe && fe in n) || !(U(n) ? he : G).test(O(n))
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
          return null != e && N(e.length) && !U(e);
        }
        function U(e) {
          return (
            !!j(e) &&
            ("[object Function]" == (e = _(e)) ||
              "[object GeneratorFunction]" == e ||
              "[object AsyncFunction]" == e ||
              "[object Proxy]" == e)
          );
        }
        function N(e) {
          return (
            "number" == typeof e &&
            -1 < e &&
            0 == e % 1 &&
            9007199254740991 >= e
          );
        }
        function j(e) {
          var t = typeof e;
          return null != e && ("object" == t || "function" == t);
        }
        function L(e) {
          return null != e && "object" == typeof e;
        }
        function B(e) {
          if (R(e)) e = g(e);
          else if (A(e)) {
            var t,
              n = [];
            for (t in Object(e))
              de.call(e, t) && "constructor" != t && n.push(t);
            e = n;
          } else e = Ie(e);
          return e;
        }
        function $(e) {
          if (R(e)) e = g(e, !0);
          else if (j(e)) {
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
        function V() {
          return [];
        }
        function H() {
          return !1;
        }
        var z,
          q = /\w*$/,
          G = /^\[object .+?Constructor\]$/,
          W = /^(?:0|[1-9]\d*)$/,
          J = {};
        (J["[object Float32Array]"] =
          J["[object Float64Array]"] =
          J["[object Int8Array]"] =
          J["[object Int16Array]"] =
          J["[object Int32Array]"] =
          J["[object Uint8Array]"] =
          J["[object Uint8ClampedArray]"] =
          J["[object Uint16Array]"] =
          J["[object Uint32Array]"] =
            !0),
          (J["[object Arguments]"] =
            J["[object Array]"] =
            J["[object ArrayBuffer]"] =
            J["[object Boolean]"] =
            J["[object DataView]"] =
            J["[object Date]"] =
            J["[object Error]"] =
            J["[object Function]"] =
            J["[object Map]"] =
            J["[object Number]"] =
            J["[object Object]"] =
            J["[object RegExp]"] =
            J["[object Set]"] =
            J["[object String]"] =
            J["[object WeakMap]"] =
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
        var Y,
          K = "object" == typeof e && e && e.Object === Object && e,
          X = "object" == typeof self && self && self.Object === Object && self,
          Z = K || X || Function("return this")(),
          ee = "object" == typeof t && t && !t.nodeType && t,
          te = ee && "object" == typeof n && n && !n.nodeType && n,
          ne = te && te.exports === ee,
          re = ne && K.process;
        e: {
          try {
            Y = re && re.binding && re.binding("util");
            break e;
          } catch (e) {}
          Y = void 0;
        }
        var oe = Y && Y.isMap,
          ie = Y && Y.isSet,
          ae = Y && Y.isTypedArray,
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
          xe = se.splice,
          Se = me ? me.toStringTag : z,
          Pe = (function () {
            try {
              var e = F(Object, "defineProperty");
              return e({}, "", {}), e;
            } catch (e) {}
          })(),
          ke = Object.getOwnPropertySymbols,
          De = ge ? ge.isBuffer : z,
          Ie = s(Object.keys),
          Ee = F(Z, "DataView"),
          Te = F(Z, "Map"),
          Ce = F(Z, "Promise"),
          Fe = F(Z, "Set"),
          Ae = F(Z, "WeakMap"),
          Oe = F(Object, "create"),
          Me = O(Ee),
          Re = O(Te),
          Ue = O(Ce),
          Ne = O(Fe),
          je = O(Ae),
          Le = me ? me.prototype : z,
          Be = Le ? Le.valueOf : z,
          $e = (function () {
            function e() {}
            return function (t) {
              return j(t)
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
              (e == t.length - 1 ? t.pop() : xe.call(t, e, 1), --this.size, 0)
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
                map: new (Te || d)(),
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
              if (!Te || 199 > r.length)
                return r.push([e, t]), (this.size = ++n.size), this;
              n = this.__data__ = new f(r);
            }
            return n.set(e, t), (this.size = n.size), this;
          });
        var Ve = ke
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
                    })(ke(e), function (t) {
                      return _e.call(e, t);
                    }));
              }
            : V,
          He = ke
            ? function (e) {
                for (var t = []; e; ) r(t, Ve(e)), (e = ye(e));
                return t;
              }
            : V,
          ze = _;
        ((Ee && "[object DataView]" != ze(new Ee(new ArrayBuffer(1)))) ||
          (Te && "[object Map]" != ze(new Te())) ||
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
                case Ue:
                  return "[object Promise]";
                case Ne:
                  return "[object Set]";
                case je:
                  return "[object WeakMap]";
              }
            return t;
          });
        var qe = x(
            (function () {
              return arguments;
            })()
          )
            ? x
            : function (e) {
                return L(e) && de.call(e, "callee") && !_e.call(e, "callee");
              },
          Ge = Array.isArray,
          We = De || H,
          Je = oe
            ? i(oe)
            : function (e) {
                return L(e) && "[object Map]" == ze(e);
              },
          Qe = ie
            ? i(ie)
            : function (e) {
                return L(e) && "[object Set]" == ze(e);
              },
          Ye = ae
            ? i(ae)
            : function (e) {
                return L(e) && N(e.length) && !!J[_(e)];
              };
        (u.keys = B),
          (u.keysIn = $),
          (u.cloneDeep = function (e) {
            return y(e, 5);
          }),
          (u.eq = M),
          (u.isArguments = qe),
          (u.isArray = Ge),
          (u.isArrayLike = R),
          (u.isBuffer = We),
          (u.isEqual = function (e, t) {
            return S(e, t);
          }),
          (u.isFunction = U),
          (u.isLength = N),
          (u.isMap = Je),
          (u.isNil = function (e) {
            return null == e;
          }),
          (u.isObject = j),
          (u.isObjectLike = L),
          (u.isSet = Qe),
          (u.isTypedArray = Ye),
          (u.stubArray = V),
          (u.stubFalse = H),
          (u.VERSION = "4.17.5"),
          (Z._ = u);
      }.call(this),
      n.exports
    );
  }).call({});
  const Vb = globalThis._;
  delete globalThis._;
  const { $influx: Hb, $env: zb } = app;
  Bg.trialController = {
    init: function ({ parent: e }) {
      (this.parent = e),
        Hb.model.observe(
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
      const t = Hb.model.state.billing.trial,
        n = await this._getCookie({ name: "tsd" });
      if (this._isCookieEmpty(n)) return void this.parent.reply(e, t);
      const r = this._mergeTrialValues(t, n);
      r.installedOn || (r.installedOn = Date.now()),
        Vb.isEqual(t, r) || Hb.transaction((e) => (e.billing.trial = r)),
        Vb.isEqual(n, r) || this._setCookie({ name: "tsd", value: r }),
        this.parent.reply(e, r);
    },
    updateCookie: async function (e) {
      const t = await this._getCookie({ name: "tsd" });
      this._isCookieEmpty(t) || (e = this._mergeTrialValues(t, e)),
        Vb.isEqual(t, e) || this._setCookie({ name: "tsd", value: e });
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
        chrome.cookies.getAll({ url: `https://${zb.options.domain}` }, (n) => {
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
            url: `https://${zb.options.domain}`,
            path: "/",
            httpOnly: !1,
            secure: !1,
            storeId: "0",
            domain: zb.options.domain,
            sameSite: "strict",
            expirationDate: r,
          },
          n
        );
      });
    },
  };
  const { $influx: qb, $env: Gb } = app;
  Bg.proxy = {
    isLoggedIn: function () {
      return !!qb.model.state.billing.account.token;
    },
    hasPro: function ({ feature: e } = {}) {
      var t;
      return (
        !(
          !Gb.is.development ||
          !(null === (t = qb.model.state.experiments) || void 0 === t
            ? void 0
            : t.enabled)
        ) ||
        !!this.hasProPaid() ||
        !!this.hasProPromocode() ||
        !(!e || !this.hasTrialFeature(e))
      );
    },
    hasTrialFeature: function (e = "*") {
      if (!Gb.features.trial) return !1;
      const t = qb.model.state.billing.trial;
      if (!t) return !1;
      if ("*" === e) {
        for (e in t)
          if (
            Gb.options.trialFeaturesLimits[e] &&
            Gb.options.trialFeaturesLimits[e](t)
          )
            return !1;
        return !0;
      }
      return (
        !!e &&
        (!Gb.options.trialFeaturesLimits[e] ||
          !Gb.options.trialFeaturesLimits[e](t))
      );
    },
    hasProPaid: function (e = null) {
      if (!this.isLoggedIn()) return !1;
      const t = qb.model.state.billing,
        n = Date.now(),
        r = t.optimistic || { on: 0, plan: null };
      if (r.plan === e && r.on <= n && n - r.on <= 36e5) return !0;
      for (const r in Gb.options.billingPlans) {
        if (e && e !== r) continue;
        const a = Gb.options.billingPlans[r];
        if (a.isActive) {
          if (a.isActive(qb.model.state)) return !0;
        } else if ("subscription" === a.type) {
          var o;
          const e =
            (null === (o = t.subscriptions) || void 0 === o ? void 0 : o[r]) ||
            {};
          if ("active" === e.state) return !0;
          if ("canceled" === e.state && n <= e.next) return !0;
        } else if ("product" === a.type) {
          var i;
          if (
            ((null === (i = t.products) || void 0 === i ? void 0 : i[r]) || 0) >
            0
          )
            return !0;
        }
      }
      return !1;
    },
    hasProPromocode: function () {
      const e = qb.model.state.billing.promocode;
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
      const t = qb.model.state.billing,
        n = (t.subscriptions && t.subscriptions[e]) || {};
      return n.active && "canceled" === n.state
        ? new Date(n.next).toLocaleDateString()
        : null;
    },
  };
  const { $env: Wb } = app;
  let Jb;
  function Qb(e, t, n) {
    return (
      (e = e || {
        updateSnapshot: () => {},
        applySnapshot: () => {},
        getSnapshot: () => ({}),
      }).updateSnapshot((e) => {
        e.loading = !0;
      }),
      Jb || (Jb = new Lg.Sender({ urlPrefix: Wb.options.apiUrl })),
      Jb.send(t, n)
        .then((t) => {
          if (!t || "ok" !== t.status) throw t;
          return (
            e.updateSnapshot((e) => {
              e.loading = !1;
            }),
            t
          );
        })
        .catch((n) => {
          const r = e.getSnapshot();
          throw (
            ((r.loading = !1),
            "TypeError" === n.name && "Failed to fetch" === n.message
              ? ((r.statusText =
                  "Billing server is not responding. Please check that you are online or try again later."),
                jb.controller.sendError(
                  `API is not responding at ${t}`,
                  "error",
                  { error: n },
                  { actor: "auth" }
                ))
              : "bad-query" === n.status
              ? (r.statusText =
                  "Malformed email address. Please check your email address and try again.")
              : "account-not-found" === n.status
              ? ((r.statusText =
                  "Account for this email not found. Please check the email address you entered or create a new account instead."),
                (r.statusButtons = [{ label: "CREATE NEW ACCOUNT" }]))
              : "wrong-password" === n.status
              ? ((r.statusText =
                  "Incorrect email / password combination. Please check the password or recover it."),
                (r.statusButtons = [{ label: "I FORGOT MY PASSWORD" }]))
              : "account-is-not-active" === n.status
              ? (r.statusText =
                  "This account has been disabled. Please create a new account instead.")
              : "email-already-verified" === n.status
              ? ((r.confirmationCodeText = null),
                (r.statusText =
                  "This email address has been verified. Please login instead."))
              : "otp-does-not-match" === n.status
              ? (r.statusText =
                  "Verification code does not match our records. Please check your inbox for the code we sent.")
              : "email-already-in-use" === n.status
              ? ((r.statusText =
                  "This email is already in use, please try to login instead or use a different email address."),
                (r.statusButtons = [{ label: "LOGIN INSTEAD" }]))
              : "email-is-not-verified" === n.status ||
                ((r.statusText =
                  "Oops... Something went wrong. Please try to login again later."),
                jb.controller.sendError(
                  `Unexpected API error at ${t}`,
                  "error",
                  { error: n },
                  { actor: "auth" }
                )),
            e.applySnapshot(r),
            n)
          );
        })
    );
  }
  Bg.connector = {
    isTaken: function (e, t) {
      return Qb(e, "/auth/is-taken", { body: { email: t } });
    },
    login: function (e, t, n) {
      return Qb(e, "/auth/login", { body: { email: t, password: n } });
    },
    register: function (e, t, n, r, o, i) {
      return Qb(e, "/auth/register", {
        body: {
          email: t,
          password: n,
          firstName: r,
          lastName: o,
          usernames: i,
        },
      });
    },
    verifyEmail: function (e, t, n) {
      return Qb(e, "/auth/verify-email", { body: { email: t, otp: n } });
    },
    changePassword: function (e, t, n, r) {
      return Qb(e, "/auth/change-password", {
        body: { email: t, otp: n, newPassword: r },
      });
    },
    resendOtp: function (e, t, n) {
      return Qb(e, "/auth/resend-otp", { body: { email: t, password: n } });
    },
    recoverPassword: function (e, t) {
      return Qb(e, "/auth/recover-password", { body: { email: t } });
    },
    deleteAccount: function (e, t) {
      return Qb(e, "/auth/delete-account", { method: "POST", token: t });
    },
    accountManagementUrl: function (e, t) {
      return Qb(e, "/fspring/account-management-url", {
        method: "GET",
        token: t,
      });
    },
  };
  var Yb = {
    fetch: ny,
    fetchText: async function (...e) {
      const t = await ny(...e);
      return await t.text();
    },
    fetchJson: async function (...e) {
      const t = await ny(...e);
      return await t.json();
    },
    getCache: function () {
      return Kb;
    },
    cleanCache: function () {
      ry("cleaning fetcher cache"), (Kb = []);
    },
    ignoreCache: function (e = 1) {
      Xb += e;
    },
    isIgnoreCache: function () {
      return Xb > 0;
    },
  };
  let Kb = [],
    Xb = 0;
  const Zb = 2e4,
    ey = 864e5,
    ty = !1;
  async function ny(e, t = {}, n = Zb) {
    return new Promise((r, o) => {
      (async () => {
        let i = setTimeout(() => {
          i && ((i = null), o({ message: "Timed out" }));
        }, n);
        try {
          const n = await (async function (e, t) {
            if (
              (ry(`fetching ${e}`),
              ((t = t || {}).method = t.method || "GET"),
              t.method && "GET" !== t.method)
            )
              return fetch(e, t);
            if (Xb <= 0) {
              const t = Date.now();
              Kb = Kb.filter((e) => t - e.on < ey);
              const n = Kb.find((t) => t.url === e);
              if (n) return ry("  fetch cache hit"), n.res.clone();
            } else ry("  ignoring fetch cache");
            Xb > 0 && Xb--;
            const n = await fetch(e, t);
            return Kb.push({ url: e, on: Date.now(), res: n.clone() }), n;
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
  function ry(e) {
    ty && console.log(`%c${e}`, "color: #00ec91");
  }
  var oy = Yb;
  const iy = "https://www.instagram.com/",
    ay = {
      maxMentions: 30,
      base: iy,
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
      home: { url: iy },
      loginActivity: {
        url: "https://i.instagram.com/api/v1/session/login_activity/?__a=1",
      },
      post: { url: (e) => `https://www.instagram.com/p/${e}/` },
      hashtag: {
        url: (e, { json: t = !1 } = {}) =>
          t
            ? _("https://i.instagram.com/api/v1/tags/web_info", { tag_name: e })
            : `https://www.instagram.com/explore/tags/${e}/`,
      },
      explore: { url: "https://www.instagram.com/explore/grid/" },
      user: { url: (e = null) => (e ? `https://www.instagram.com/${e}/` : iy) },
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
      locale: { url: iy, regexp: /"locale":"([^"]+)"/ },
    };
  var sy = {};
  const { $influx: ly } = app,
    uy = {
      ...Bg.proxy,
      isAcknowledged: function (e) {
        return -1 !== ly.model.state.acknowledged[e];
      },
      userId: function () {
        return ly.model.state.authStatus.userId;
      },
      username: function () {
        return ly.model.state.authStatus.username;
      },
      allUsernames: function () {
        const e = ly.model.state,
          t = [],
          n = (e) => t.push(e.authStatus.username);
        n(e);
        for (const t in e.userStates) n(e.userStates[t]);
        return t;
      },
    },
    { $influx: cy } = app;
  var dy = cy.action("state.replace-state", (e, t) => t);
  const { $influx: fy } = app;
  var py = fy.action("state.acknowledge", (e, t) => {
      const n = d.getUnixTime();
      return { ...e, acknowledged: { ...e.acknowledged, [t]: n } };
    }),
    hy = () => [
      {
        id: "v25.1.0",
        header: "Carousels Post Later",
        subheader: "v25.1.0",
        hexImage: "hex-schedule",
        content: [
          "Upload or drag & drop multiple files to Post Later to schedule them for posting as a carousel.",
        ],
      },
      {
        id: "v25.0.0",
        header: "Advanced Post Later",
        subheader: "v25.0.0",
        hexImage: "hex-schedule",
        content: [
          "Improved Post Later interface and auto-publishing stability. Manage multiple accounts in Post Later interface seamlessly. Bulk upload files for scheduling.",
        ],
      },
      {
        id: "v24.0.0",
        header: "Post Later",
        subheader: "v24.0.0",
        hexImage: "hex-schedule",
        content: [
          "INSSIST now supports Delayed Posting for Posts, Photo and Video Stories and Reels. Facebook account is not required to schedule posts with delayed posting.",
        ],
      },
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
    gy = () => ({
      version: 253,
      authStatus: {
        userId: null,
        username: null,
        fullName: null,
        email: null,
        avatarUrl: null,
        isLoggedIn: !1,
        cookies: { igSessionId: null, ig: [], fb: [] },
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
        isVideo: !1,
        selectedTabId: "later",
        showUpsellOverlay: !1,
        coverUrl: null,
        mentions: { query: "", foundUsers: [], selectedUsers: [] },
      },
      ghostStoryView: { enabled: !1, lastUsedOn: null, showUpsellOverlay: !1 },
      dm: { ghostModeEnabled: !0, ghostModeFailed: !1 },
      reels: { creating: !1 },
      igTask: { actionBlockCode: null, followStatus: {}, likeStatus: {} },
      later: {
        cookies: null,
        showGrid: !1,
        showUpsell: !1,
        showBodyPanel: !1,
        showAssistPanel: !1,
        selectedUserId: null,
        selectedPostId: null,
        selectedPillId: null,
        selectedIgDate: null,
        errors: [],
        lastDate: null,
        processing: !1,
        timeSlots: [
          { time: 288e5 },
          { time: 468e5 },
          { time: 576e5 },
          { time: 72e6 },
        ],
        calendar: {
          periodType: "month",
          periodStart: Date.now(),
          showSlots: !0,
        },
        dnd: {
          dragPostId: null,
          dragOverPostId: null,
          dragOverDay: null,
          dragOverTime: null,
        },
        ig: { loading: !1, error: null, updatedAt: -1, posts: [] },
        posts: [],
      },
      inspiration: { posts: [] },
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
    my = () =>
      "Hello {@name}! 👋\n\n\n  {Thank you|Thanks} {@name}! 🙏\n\n\n  /tnx follow\n  {Hi|Hey|Hello|Greetings} {@name}! Thank you so much for following! Feel free to send me a DM!\n\n\n  /tnx contact\n  {Thank you for contacting us.|Thank you for reaching out to us.|Thank you for contacting us here.} {We have received your message and will be in touch shortly.|We will be in touch shortly, and you may also find answers to some of your questions on our FAQ page.|We will be in touch soon.}\n\n\n  /sorry missed\n  Hi {@name}! I am sorry I missed your message. I will get back to you as soon as possible. I look forward to speaking with you!\n\n\n  /ask feedback\n  {Hi|Hello|Hey|Greetings}! Just wanted to follow back with you and check how you find the product? Feel free to send me your feedback, suggestions or ideas.\n\n\n  /tmm\n  Thank you for contacting us. Due to an unusual level of activity, responses are delayed. We anticipate responding to your message within two business days. In the meantime, please feel free to reach out to us via email with any urgent needs or requests.\n  "
        .split("\n")
        .map((e) => e.trim())
        .join("\n"),
    vy = () => ({
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
      quickReplies: { shown: !1, content: my(), total: 7 },
      settings: { laterAutoRetry: -1 },
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
          id: "v25.1.0",
          header: "Carousels Post Later",
          subheader: "v25.1.0",
          hexImage: "hex-schedule",
          content: [
            "Upload or drag & drop multiple files to Post Later to schedule them for posting as a carousel.",
          ],
        },
        {
          id: "v25.0.0",
          header: "Advanced Post Later",
          subheader: "v25.0.0",
          hexImage: "hex-schedule",
          content: [
            "Improved Post Later interface and auto-publishing stability. Manage multiple accounts in Post Later interface seamlessly. Bulk upload files for scheduling.",
          ],
        },
        {
          id: "v24.0.0",
          header: "Post Later",
          subheader: "v24.0.0",
          hexImage: "hex-schedule",
          content: [
            "INSSIST now supports Delayed Posting for Posts, Photo and Video Stories and Reels. Facebook account is not required to schedule posts with delayed posting.",
          ],
        },
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
          later: 0,
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
  var by = {
      proxy: uy,
      replaceState: dy,
      getWhatsNewItems: hy,
      getTemplateUserState: gy,
      getTemplateSharedState: vy,
      actions: { acknowledge: py },
    },
    yy = {};
  const {
    $auth: wy,
    $later: _y,
    $influx: xy,
    $cleanup: Sy,
    $bus: Py,
    $utils: ky,
  } = app;
  let Dy = null,
    Iy = !1;
  wy.controller = {
    init: async function () {
      await this._setAuthStatusIfAbsent(),
        this._refreshUserOnSessionIdChange(),
        this._watchAndSaveFbCookies(),
        this._updateUserOnPopupStart(),
        Py.on("auth.set-ig-initial-url", this._setIgInitialUrl.bind(this)),
        Py.on("auth.login", this._login.bind(this)),
        Py.on("auth.logout", this._logout.bind(this));
    },
    toggleSessionWatcher: function (e) {
      Iy = !e;
    },
    updateUser: async function (e = !1) {
      wy.log("updating user id...");
      const t = await this.refreshUser();
      t && (await _y.actualizeCookies()),
        !t && e && this._navigateToInstagram();
    },
    refreshUser: async function () {
      const e = this.refreshUser,
        t = zh.generate();
      (e.requestId = t), oy.ignoreCache();
      const n = await sy.api.fetchViewerInfo();
      if (e.requestId !== t) return !1;
      if (n.error) return !1;
      const r = n.result || null,
        o = r && xy.model.state.authStatus.userId === r.userId;
      return (
        xy.transaction((e) => {
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
                ky.removeFromArray(t, e.multiaccount.selectedUserId),
              t.includes(r.userId) || t.push(r.userId),
              (e.multiaccount.selectedUserId = r.userId);
          }
          if (e.authStatus.userId) {
            e.userStates[e.authStatus.userId] = {};
            const t = by.getTemplateUserState();
            for (const n in t) e.userStates[e.authStatus.userId][n] = e[n];
          }
          let t = null;
          r && e.userStates[r.userId]
            ? ((t = e.userStates[r.userId]), delete e.userStates[r.userId])
            : (t = by.getTemplateUserState()),
            (t.authStatus.userId = (null == r ? void 0 : r.userId) || null),
            (t.authStatus.username = (null == r ? void 0 : r.username) || null),
            (t.authStatus.avatarUrl =
              (null == r ? void 0 : r.avatarUrl) || null),
            (t.authStatus.isLoggedIn = !!r),
            Object.assign(e, t);
        }),
        await this._actualizeCoookies(),
        o ||
          (Py.send("iframe-bus", "ig.clear-and-show-spinner"),
          r
            ? Dy
              ? Py.send("iframe-bus", "ig.hard-go", Dy)
              : (Sy.controller.cleanUpState(), Py.send("igView.refresh"))
            : Py.send("iframe-bus", "ig.hard-go", "/accounts/login/"),
          Py.send("iframe-bus", "dm.refresh"),
          Py.send("iframe-bus", "schedule.fcs-refresh-page")),
        (Dy = null),
        Py.send("auth.refreshed"),
        !!r
      );
    },
    _clearCookies: async function (e) {
      const t = await ky.callAsync(chrome.cookies.getAll, { domain: `.${e}` });
      for (const n of t)
        await ky.callAsync(chrome.cookies.remove, {
          url: `https://*.${e}`,
          name: n.name,
        });
    },
    _updateUserOnPopupStart: function () {
      let e = null;
      Py.on("popup.start", async () => {
        var t, n;
        const r = await ky.callAsync(chrome.cookies.get, {
            url: "https://*.instagram.com",
            name: "sessionid",
          }),
          o =
            null === (t = xy.model.state.authStatus) ||
            void 0 === t ||
            null === (n = t.cookies) ||
            void 0 === n
              ? void 0
              : n.igSessionId,
          i = Date.now();
        (r && o === r.value && e && i - e <= 6 * ky.time.HOUR) ||
          ((e = i), await this.updateUser());
      });
    },
    _navigateToInstagram: function () {
      chrome.tabs.update({ url: ay.login.url });
    },
    _setAuthStatusIfAbsent: async function () {
      if ("username" in xy.model.state.authStatus) return;
      oy.ignoreCache();
      const e = await sy.api.fetchViewerInfo();
      if (e.error) return;
      const t = e.result || null;
      xy.transaction((e) => {
        (e.authStatus.userId = (null == t ? void 0 : t.userId) || null),
          (e.authStatus.username = (null == t ? void 0 : t.username) || null),
          (e.authStatus.fullName = (null == t ? void 0 : t.fullName) || null),
          (e.authStatus.email = (null == t ? void 0 : t.email) || null),
          (e.authStatus.avatarUrl = (null == t ? void 0 : t.avatarUrl) || null),
          (e.authStatus.isLoggedIn = !!t),
          (e.authStatus.cookies = (null == t ? void 0 : t.cookies) || {
            igSessionId: null,
            fb: [],
          });
      }),
        await this._actualizeCoookies();
    },
    _refreshUserOnSessionIdChange: function () {
      let e;
      chrome.cookies.onChanged.addListener(({ cookie: t, removed: n }) => {
        this._isSessionWatcherPaused() ||
          (".instagram.com" === t.domain &&
            "sessionid" === t.name &&
            (clearTimeout(e), (e = setTimeout(() => this.refreshUser()))));
      });
    },
    _watchAndSaveFbCookies: function () {
      let e;
      yy.controller.onRequest(({ details: n, isResponse: r, checkHost: o }) => {
        if (r && o("facebook.com")) {
          !!n.responseHeaders.find((e) => "set-cookie" === e.name) &&
            (clearTimeout(e), (e = setTimeout(t)));
        }
      });
      const t = async () => {
        const e = await ky.callAsync(chrome.cookies.getAll, {
          domain: ".facebook.com",
        });
        xy.transaction((t) => {
          t.authStatus.cookies.fb = e;
        });
      };
    },
    _setIgInitialUrl: function (e) {
      Dy = e;
    },
    _login: async function (e) {
      var t;
      const n =
        null === (t = xy.model.state.userStates[e]) || void 0 === t
          ? void 0
          : t.authStatus;
      if (n) {
        this.toggleSessionWatcher(!1);
        try {
          await this._clearCookies("facebook.com"),
            await this._applyCookies("facebook.com", n.cookies.fb),
            await this._clearCookies("instagram.com"),
            await this._applyCookies("instagram.com", n.cookies.ig),
            await ky.callAsync(chrome.cookies.set, {
              url: "https://*.instagram.com",
              name: "sessionid",
              value: n.cookies.igSessionId,
              domain: ".instagram.com",
              path: "/",
              secure: !0,
              httpOnly: !1,
              sameSite: "no_restriction",
              expirationDate: Math.round(
                (Date.now() + 365 * ky.time.DAY) / 1e3
              ),
            });
        } catch (e) {
          console.error(e);
        }
        this.toggleSessionWatcher(!0), setTimeout(() => this.refreshUser());
      } else console.error("auth status not found", { userId: e });
    },
    _applyCookies: async function (e, t) {
      for (const n of t)
        ("facebook.com" === e && "_js_datr" === n.name) ||
          (await ky.callAsync(chrome.cookies.set, {
            url: `https://*.${e}`,
            name: n.name,
            value: n.value,
            domain: n.domain,
            path: n.path,
            secure: n.secure,
            httpOnly: n.httpOnly,
            sameSite: n.sameSite,
            storeId: n.storeId,
            expirationDate: n.expirationDate,
          }));
    },
    _logout: async function () {
      await this._clearCookies("facebook.com"),
        await this._clearCookies("instagram.com");
    },
    _isSessionWatcherPaused: function () {
      return Iy;
    },
    _actualizeCoookies: async function () {
      const e = await ky.callAsync(chrome.cookies.get, {
          url: "https://*.instagram.com",
          name: "sessionid",
        }),
        t = await ky.callAsync(chrome.cookies.getAll, {
          domain: ".facebook.com",
        }),
        n = await ky.callAsync(chrome.cookies.getAll, {
          domain: ".instagram.com",
        });
      xy.transaction((r) => {
        (r.authStatus.cookies.igSessionId =
          (null == e ? void 0 : e.value) || null),
          (r.authStatus.cookies.ig = n),
          (r.authStatus.cookies.fb = t);
      });
    },
  };
  var Ey = {};
  const { $influx: Ty } = app;
  (Ey.controller = {
    status: null,
    init: function () {
      this._subscribeToInflux();
    },
    _subscribeToInflux: function () {
      Ty.model.observe(
        (e) => (e.whatsNew.some((e) => !e.acknowledged) ? "updated" : "normal"),
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
  }),
    (sy.ec = {
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
    });
  const Cy = sy.ec,
    Fy = {
      "Failed to fetch": Cy.noNetwork,
      "Timed out": Cy.timedOut,
      "Redirect to login": Cy.redirectToLogin,
      "Missing user": Cy.missingUser,
      400: Cy.suspended,
      "400x": Cy.missingPost,
      403: Cy.forbidden,
      404: Cy.notFound,
      429: Cy.tooManyRequests,
      500: Cy.serverIsDown,
      502: Cy.badGateway,
      503: Cy.serviceUnavailable,
      560: Cy.serviceDown,
    };
  sy.Response = class e {
    constructor(e, t, n, r) {
      (this.result = e),
        (this.error = t ? { code: t, message: n, body: r } : null);
    }
    isSuccess() {
      return !this.error;
    }
    reportError(e, t) {
      return (
        this.error.code === Cy.other &&
          jb.controller.sendError(
            `ig-api.${e}: unknown error`,
            "error",
            { details: t },
            { actor: "ig-api" }
          ),
        this
      );
    }
    static ofResult(t) {
      return new e(t);
    }
    static ofNetworkError(t) {
      t &&
        t.message &&
        "400" === t.message &&
        ((t && "missing media" === t.body) ||
          (t && "Sorry, this photo has been deleted" === t.body)) &&
        (t.message = "400x");
      const n = (t && t.message && Fy[t.message]) || Cy.other,
        r = (t && t.message) || null,
        o = (t && t.body) || null;
      return new e(null, n, r, o);
    }
  };
  const { $bus: Ay, $utils: Oy } = app,
    My = { headers: { "x-ig-app-id": "1217981644879628" } };
  async function Ry() {
    try {
      return await (async function () {
        oy.ignoreCache();
        const e = (await oy.fetchText("https://instagram.com"))
          .split("\n")
          .find((e) => e.includes("is_professional_account"));
        if (!e) return null;
        const t = e
            .split("XIGSharedData")[1]
            .replaceAll('\\"', '"')
            .replaceAll("\\/", "/")
            .replaceAll("\\u", "u"),
          n = (e, n = "string") => {
            try {
              let r;
              return (
                "string" === n
                  ? (r = t.split(`"${e}":"`)[1].split('"')[0])
                  : "bool" === n &&
                    ((r = t.split(`"${e}":`)[1].split(",")[0]),
                    (r = "false" !== r)),
                r
              );
            } catch (t) {
              return console.error(`Failed to extract "${e}"`, t), null;
            }
          };
        let r = n("profile_pic_url");
        r && (r = r.replaceAll("\\u0026", "&"));
        const o = n("appScopedIdentity") || n("id") || n("viewerId");
        if (!o) throw new Error("failed to fetch viewer id");
        return {
          userId: o,
          username: n("username"),
          fullName: n("full_name"),
          email: null,
          avatarUrl: r,
          isProfessionalAccount: n("is_professional_account", "bool"),
        };
      })();
    } catch (e) {
      console.error("Failed to fetch viewer info (v2)", e);
    }
    try {
      return await (async function () {
        const e = "https://i.instagram.com/api/v1/accounts/edit/web_form_data/";
        oy.ignoreCache();
        const t = await oy.fetchText(e, My),
          n = Oy.safeJsonParse(t);
        if (!n) return null;
        const r = n.form_data.username,
          o = await (async function (e) {
            var t;
            const n = Oy.createUrl(
                "https://i.instagram.com/api/v1/users/web_profile_info/",
                { username: e }
              ),
              r = await oy.fetchJson(n, My);
            return (
              (null == r || null === (t = r.data) || void 0 === t
                ? void 0
                : t.user) || null
            );
          })(r);
        if (!o) return null;
        return {
          userId: o.id,
          username: r,
          fullName: o.full_name,
          email: n.form_data.email,
          avatarUrl: o.profile_pic_url_hd,
          isProfessionalAccount:
            o.is_professional_account || o.is_business_account,
        };
      })();
    } catch (e) {
      console.error("Failed to fetch viewer info (v1)", e);
    }
    throw new Error("Failed to fetch viewer info");
  }
  async function Uy() {
    return oy.fetchJson(ay.loginActivity.url, My);
  }
  async function Ny(e, { incognito: t = !1 } = {}) {
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
      const n = ay.hashtag.url(e, { json: !0 }),
        o = t ? "omit" : "include";
      oy.ignoreCache(), (r = await oy.fetchText(n, { credentials: o, ...My }));
    } catch (e) {
      if ("404" !== e.message) throw e;
      o = !0;
    }
    if (
      ((function (e) {
        if (e && e.includes(ay.challenge)) {
          const e = new Error();
          throw ((e.message = "400"), (e.body = "Challenge"), e);
        }
      })(r),
      (function (e) {
        if (e && e.includes(ay.login.link)) {
          const e = new Error();
          throw (
            ((e.message = "Redirect to login"),
            (e.body = "Redirect to login"),
            e)
          );
        }
      })(r),
      o)
    )
      return (n.isBanned = !0), (n.isFlagged = !1), n;
    const i = JSON.parse(r);
    if (!("graphql" in i)) {
      const t = i.data,
        r = t.top.sections
          .map((e) => e.layout_content.medias)
          .flat()
          .filter(Boolean)
          .map((e) => e.media),
        o = t.recent.sections
          .map((e) => e.layout_content.medias)
          .flat()
          .filter(Boolean)
          .map((e) => e.media);
      let a = 0,
        s = 0;
      {
        const e = r
          .map((e) => {
            const t = 1e3 * e.taken_at,
              n = e.like_count,
              r = e.comment_count;
            return { likes: By(n, t), comments: By(r, t) };
          })
          .sort(
            (e, t) =>
              Oy.calcEngagement(e.likes, t.comments) -
              Oy.calcEngagement(t.likes, t.comments)
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
          l = Math.round(Oy.time.DAY / n);
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
          const n = Oy.getHashtagRegex(),
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
    } else {
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
            return { likes: By(r, n), comments: By(o, n) };
          })
          .sort(
            (e, t) =>
              Oy.calcEngagement(e.likes, t.comments) -
              Oy.calcEngagement(t.likes, t.comments)
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
        a = Math.round(Oy.time.DAY / r);
      }
      let u = [];
      {
        const t = {},
          n = [
            { edges: r, relevance: 2 },
            { edges: o, relevance: 1 },
          ];
        for (const e of n) {
          const n = Oy.getHashtagRegex(),
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
    }
    return n;
  }
  async function jy(e, t = 10, n = [], r = null) {
    const o = Oy.createUrl(
        `https://i.instagram.com/api/v1/feed/user/${e}/username/`,
        { count: 33, ...(r && { max_id: r }) }
      ),
      i = await oy.fetchJson(o, My);
    return (
      n.push(...i.items),
      n.length < t && i.more_available && (await jy(e, t, n, i.next_max_id)),
      (n = n.slice(0, t)).map((e) => {
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
            (null === (o = e.caption) || void 0 === o ? void 0 : o.text) || "",
          owner: String(
            (null === (i = e.user) || void 0 === i ? void 0 : i.pk) || ""
          ),
          ownerName:
            (null === (a = e.user) || void 0 === a ? void 0 : a.username) || "",
          type:
            { 1: "photo", 2: "video", 8: "carousel" }[e.media_type] || "photo",
          isLiked: e.has_liked,
          isVideo: "view_count" in e,
          imgx: (null === (s = d[0]) || void 0 === s ? void 0 : s.url) || null,
          img:
            (null === (l = d.at(-1)) || void 0 === l ? void 0 : l.url) || null,
          imgMedium:
            (null === (u = d.find((e) => 320 === e.width)) || void 0 === u
              ? void 0
              : u.url) ||
            (null === (c = d[0]) || void 0 === c ? void 0 : c.url) ||
            null,
        };
      })
    );
  }
  async function Ly(e) {
    const t = Oy.createUrl(`${ay.base}web/search/topsearch/`, {
      context: "user",
      query: e,
    });
    return (await oy.fetchJson(t)).users.map((e) => ({
      id: e.user.pk,
      username: e.user.username,
      fullName: e.user.full_name,
      avatar: e.user.profile_pic_url,
    }));
  }
  function By(e, t) {
    const n = Date.now();
    return e * (Math.log(0.061 * Oy.time.DAY) / Math.log(0.061 * (n - t)));
  }
  function $y(e) {
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
  }
  function Vy(e, t) {
    const n = async function (...n) {
      try {
        const t = await e(...n);
        return sy.Response.ofResult(t);
      } catch (e) {
        return sy.Response.ofNetworkError(e).reportError(t, e);
      }
    };
    return Ay.on(`ig-api.${t}`, n), n;
  }
  sy.api = {
    init: function () {
      (this.fetchViewerInfo = Vy(Ry, "fetch-viewer-info")),
        (this.fetchLoginActivity = Vy(Uy, "fetch-login-activity")),
        (this.fetchTag = Vy(Ny, "fetch-tag")),
        (this.fetchUserPosts = Vy(jy, "fetch-user-posts")),
        (this.searchProfiles = Vy(Ly, "search-profiles")),
        (this.normalizePostStat24h = By),
        (this.createUserObject = $y);
    },
  };
  const { $utils: Hy } = app;
  sy.Publisher = class {
    constructor(e = null) {
      (this._debug = !0),
        (this._igAppId = "1217981644879628"),
        (this._cookies = e);
    }
    async postPhoto(
      e,
      { caption: t = "", mentions: n = null, location: r = null }
    ) {
      const o = this._generateUploadName();
      this._log("⏳ upload photo..."),
        await this._uploadPhoto(o, e),
        this._log("⏳ publish photo..."),
        await this._configure("/api/v1/media/configure/", {
          caption: t,
          source_type: "library",
          upload_id: this._getUploadId(o),
          ...(n && { usertags: JSON.stringify(n) }),
          ...(r && { location: JSON.stringify(r), geotag_enabled: !0 }),
        }),
        this._log("✅ success");
    }
    async postVideo(
      e,
      t,
      { caption: n = "", mentions: r = null, location: o = null }
    ) {
      const i = this._generateUploadName();
      this._log("⏳ upload video..."),
        await this._uploadVideo(i, e, { type: "post" }),
        this._log("⏳ upload video cover..."),
        await this._uploadPhoto(i, t, { isVideoCover: !0 }),
        this._log("⏳ publish video..."),
        await this._configure("/igtv/configure_to_igtv/", {
          caption: n,
          source_type: "library",
          is_unified_video: 1,
          igtv_share_preview_to_feed: 1,
          upload_id: this._getUploadId(i),
          ...(r && { usertags: JSON.stringify(r) }),
          ...(o && { location: JSON.stringify(o), geotag_enabled: !0 }),
        }),
        this._log("✅ success");
    }
    async postReel(
      e,
      t,
      {
        caption: n = "",
        mentions: r = null,
        location: o = null,
        shareToFeed: i = !1,
      }
    ) {
      const a = this._generateUploadName();
      this._log("⏳ upload reel..."),
        await this._uploadVideo(a, e, { type: "reel" }),
        this._log("⏳ upload reel cover..."),
        await this._uploadPhoto(a, t, { isVideoCover: !0 }),
        this._log("⏳ publish reel..."),
        await this._configure("/api/v1/media/configure_to_clips/", {
          caption: n,
          is_unified_video: 1,
          disable_comments: 0,
          source_type: "library",
          disable_oa_reuse: !1,
          video_subtitles_enabled: 0,
          igtv_share_preview_to_feed: 1,
          like_and_view_counts_disabled: 0,
          clips_share_preview_to_feed: i ? 1 : 0,
          upload_id: this._getUploadId(a),
          ...(r && { usertags: JSON.stringify(r) }),
          ...(o && { location: JSON.stringify(o), geotag_enabled: !0 }),
        }),
        this._log("✅ success");
    }
    async postStoryPhoto(e, { mentions: t = null }) {
      const n = this._generateUploadName("story");
      this._log("⏳ upload story photo..."),
        await this._uploadPhoto(n, e),
        this._log("⏳ publish story photo..."),
        await this._configure("/api/v1/web/create/configure_to_story/", {
          upload_id: this._getUploadId(n),
          ...(t && { reel_mentions: JSON.stringify(t) }),
        }),
        this._log("✅ success");
    }
    async postStoryVideo(e, { mentions: t = null }) {
      const n = this._generateUploadName("story");
      this._log("⏳ upload story video..."),
        await this._uploadVideo(n, e, { type: "story" }),
        this._log("⏳ upload story video cover...");
      const r = await Hy.extractFrame(e, 0);
      await this._uploadPhoto(n, r, { isVideoCover: !0 }),
        this._log("⏳ publish story video..."),
        await this._configure("/api/v1/web/create/configure_to_story/", {
          upload_id: this._getUploadId(n),
          ...(t && { reel_mentions: JSON.stringify(t) }),
        }),
        this._log("✅ success");
    }
    async postCarousel(e, { caption: t = "" } = {}) {
      const n = [];
      for (let t of e) {
        const r = `carousel [${n.length + 1}/${e.length}]:`,
          o = this._generateUploadName(),
          i = this._getUploadId(o);
        n.push(i);
        let a = null;
        t instanceof Blob || ((a = t.coverBlob), (t = t.blob)),
          Hy.file.isVideo(t)
            ? (this._log(`⏳ ${r} upload video...`),
              await this._uploadVideo(o, t, { type: "carousel" }),
              this._log(`⏳ ${r} upload video cover...`),
              a || (a = await Hy.extractFrame(t, 0.5)),
              await this._uploadPhoto(o, a, { isVideoCover: !0 }))
            : (this._log(`⏳ ${r} upload photo...`),
              await this._uploadPhoto(o, t));
      }
      this._log("⏳ publish carousel..."),
        await this._configureJson("/api/v1/media/configure_sidecar/", {
          caption: t,
          source_type: "library",
          disable_comments: 0,
          like_and_view_counts_disabled: 0,
          client_sidecar_id: this._generateUploadId(),
          children_metadata: n.map((e) => ({ upload_id: e })),
        }),
        this._log("✅ success");
    }
    async _uploadPhoto(e, t, { isVideoCover: n = !1, cookies: r } = {}) {
      const { width: o, height: i } = await Hy.loadImage(t);
      (t = await this._toJpeg(t)),
        await this._fetch({
          attempts: 2,
          url: `https://i.instagram.com/rupload_igphoto/${e}`,
          opts: {
            method: "POST",
            body: t,
            headers: {
              accept: "*/*",
              offset: "0",
              "x-entity-name": e,
              "x-entity-length": t.size,
              "x-ig-app-id": this._igAppId,
              "x-instagram-rupload-params": JSON.stringify({
                upload_id: this._getUploadId(e),
                media_type: n ? 2 : 1,
                upload_media_width: o,
                upload_media_height: i,
              }),
            },
          },
        });
    }
    async _uploadVideo(e, t, { type: n }) {
      await this._fetch({
        url: `https://i.instagram.com/rupload_igvideo/${e}`,
        opts: {
          method: "POST",
          body: t,
          headers: {
            accept: "*/*",
            offset: "0",
            "x-entity-name": e,
            "x-entity-length": t.size,
            "x-ig-app-id": this._igAppId,
            "x-instagram-rupload-params": JSON.stringify({
              is_sidecar: 0,
              media_type: 2,
              "client-passthrough": 1,
              upload_id: this._getUploadId(e),
              ...("post" === n && {
                for_album: !1,
                is_igtv_video: !0,
                is_unified_video: 1,
              }),
              ...("reel" === n && { for_album: !1, is_clips_video: 1 }),
              ...("carousel" === n && {
                is_sidecar: "1",
                for_album: !1,
                is_unified_video: 0,
                video_format: "",
              }),
              ...("story" === n && { for_album: !0, is_unified_video: 0 }),
            }),
          },
        },
      });
    }
    _generateUploadId() {
      return String(Date.now());
    }
    _generateUploadName(e = "fb_uploader") {
      return `${e}_${this._generateUploadId()}`;
    }
    _getUploadId(e) {
      return e.split("_").pop();
    }
    _log(...e) {
      this._debug && console.log("%c[$igApi]", "color: #bb57d1", ...e);
    }
    async _fetchCsrfToken() {
      if (this._cookies && this._cookies.csrftoken)
        return this._cookies.csrftoken;
      return (await this._fetch({ url: "https://www.instagram.com/" }))
        .replaceAll("\\", "")
        .split("csrf_token")
        .slice(1)
        .find((e) => !e.includes("biography"))
        .split('"')[2];
    }
    async _configure(e, t, n = !1) {
      let r, o;
      n
        ? ((r = JSON.stringify(t)), (o = "application/json; charset=utf-8"))
        : ((r = new URLSearchParams(t).toString()),
          (o = "application/x-www-form-urlencoded")),
        await this._fetch({
          attempts: 5,
          url: `https://www.instagram.com${e}`,
          opts: {
            method: "POST",
            credentials: "include",
            body: r,
            headers: {
              accept: "*/*",
              "content-type": o,
              "x-csrftoken": await this._fetchCsrfToken(),
              "x-ig-app-id": this._igAppId,
            },
          },
        });
    }
    async _configureJson(e, t) {
      await this._configure(e, t, !0);
    }
    async _fetch({ url: e, opts: t = {}, attempts: n = 1, checkResponse: r }) {
      r || (r = (e) => 200 === e.status),
        this._cookies
          ? (t.headers || (t.headers = {}),
            (t.headers["x-inssist-cookies"] = JSON.stringify(this._cookies)))
          : (t.credentials = "include");
      const o = async (o = "Failed to fetch") => {
        if ((n -= 1) <= 0) throw new Error(o);
        await Hy.sleep(3 * Hy.time.SECOND);
        return await this._fetch({
          url: e,
          opts: t,
          attempts: n,
          checkResponse: r,
        });
      };
      let i, a;
      try {
        i = await fetch(e, t);
      } catch (n) {
        return (
          console.error("Failed to fetch", { url: e, opts: t, e: n }),
          o(n.message)
        );
      }
      try {
        a = await i.text();
      } catch (n) {
        return (
          console.error("Failed to call res.text()", { url: e, opts: t, e: n }),
          o(`Failed to call res.text(): ${n.message}`)
        );
      }
      return r(i)
        ? a
        : (console.error("Invalid response", { url: e, opts: t, text: a }),
          o(`Response: ${a}`));
    }
    async _toJpeg(e) {
      const t = document.createElement("img");
      (t.src = URL.createObjectURL(e)),
        await new Promise((e) => t.addEventListener("load", e));
      const n = document.createElement("canvas");
      (n.width = t.width), (n.height = t.height);
      n.getContext("2d").drawImage(t, 0, 0);
      return await new Promise((e) => n.toBlob(e, "image/jpeg", 0.8));
    }
  };
  const { $abTesting: zy, $utils: qy } = app;
  zy.controller = {
    init: function () {
      qy.ls.remove("ab-testing-hash");
    },
  };
  const { $later: Gy, $influx: Wy, $utils: Jy } = app;
  Gy.actualizeCookies = async () => {
    const e = await Jy.callAsync(chrome.cookies.getAll, {
      domain: ".instagram.com",
    });
    Wy.transaction((t) => {
      t.later.cookies = {};
      for (const n of e) t.later.cookies[n.name] = n.value;
    });
  };
  const { $later: Qy, $utils: Yy } = app;
  Qy.config = {
    mimeTypes: [
      "image/jpeg",
      "image/png",
      "video/quicktime",
      "video/mp4",
      "video/webm",
      "text/csv",
    ],
    maxFileSize: 524288e3,
    maxCarouselFiles: 10,
    minVideoDurationSec: 1,
    maxVideoDurationSec: 900.9,
    maxCarouselVideoDurationSec: 60.9,
    maxStoryDurationSec: 300.9,
    minVideoRatio: 0.12,
    maxVideoRatio: 1.91,
    minImageRatio: 0.6,
    maxImageRatio: 1.91,
    maxImageWidth: 4e3,
    maxImageHeight: 4e3,
    maxCaptionLength: 2200,
    minTimeBetweenPublishing: 10 * Yy.time.SECOND,
    minTimeFromNow: 5 * Yy.time.MINUTE,
  };
  const { $later: Ky, $bus: Xy, $files: Zy, $utils: ew } = app;
  Ky.cleanupController = {
    init: function () {
      (this._lastIdbCleanupAt = 0),
        this._dropOldIgPreviews(),
        Xy.on("popup.start", () => this._cleanupIdb()),
        Xy.on("later.dropOldIgPreviews", this._dropOldIgPreviews, this);
    },
    _cleanupIdb: async function () {
      const e = Date.now();
      if (e - this._lastIdbCleanupAt < 5 * ew.time.MINUTE) return;
      this._lastIdbCleanupAt = e;
      const t = await Zy.controller.getFileIds("later"),
        n = Ky.proxy.getAllPosts();
      for (const e of t) {
        !!n.find((t) =>
          t.mediaList.some(
            (t) => t.fileId === e || t.coverId === e || t.previewId === e
          )
        ) || (await Zy.controller.remove(e));
      }
    },
    _dropOldIgPreviews: async function () {
      const e = Ky.proxy
          .getAllStates()
          .map((e) => e.later.ig.posts.map((e) => e.previewId))
          .flat(),
        t = await Zy.controller.getFileIds("later:ig");
      for (const n of t) {
        e.includes(n) || (await Zy.controller.remove(n));
      }
    },
  };
  const { $later: tw, $influx: nw, $bus: rw } = app;
  tw.controller = {
    init: function () {
      this._cleanupState(),
        tw.scheduler.init(),
        tw.cleanupController.init(),
        rw.on("later.ignoreFetchCache", this._ignoreFetchCache.bind(this));
    },
    _cleanupState: function () {
      nw.transaction((e) => {
        e.later.posts
          .filter((e) => "posting" === e.status)
          .forEach((e) => (e.status = "scheduled"));
      });
    },
    _ignoreFetchCache: function () {
      oy.ignoreCache();
    },
  };
  var ow = {
      validateCaption: function (e) {
        const t = 2200,
          n = 30,
          r = 30,
          o = (e.match(/@[\p{L}\d_]+/gu) || []).length,
          i = (e.match(/#[\p{L}\d_]+/gu) || []).length;
        return e.length > t
          ? `Caption length exceeded: ${e.length} / ${t}`
          : o > n
          ? `Mention limit exceeded: ${o} / ${n}`
          : i > r
          ? `Hashtag limit exceeded: ${i} / ${r}`
          : null;
      },
    },
    iw = {};
  const {
    $later: aw,
    $influx: sw,
    $files: lw,
    $utils: uw,
    $auth: cw,
    $bus: dw,
    $analytics: fw,
  } = app;
  function pw(e, t) {
    if (t.length < e)
      throw new TypeError(
        e +
          " argument" +
          (e > 1 ? "s" : "") +
          " required, but only " +
          t.length +
          " present"
      );
  }
  function hw(e) {
    pw(1, arguments);
    var t = Object.prototype.toString.call(e);
    return e instanceof Date || ("object" == typeof e && "[object Date]" === t)
      ? new Date(e.getTime())
      : "number" == typeof e || "[object Number]" === t
      ? new Date(e)
      : (("string" != typeof e && "[object String]" !== t) ||
          "undefined" == typeof console ||
          (console.warn(
            "Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"
          ),
          console.warn(new Error().stack)),
        new Date(NaN));
  }
  function gw(e) {
    pw(1, arguments);
    var t = hw(e);
    return t.setHours(0, 0, 0, 0), t;
  }
  aw.scheduler = {
    init: function () {
      (this._timer = null),
        (this._publishing = !1),
        (this._lastPublishedAt = 0),
        this._setup();
    },
    _setup: function () {
      this._schedule(),
        sw.model.observe(
          () =>
            aw.proxy
              .getConnectedUsersPosts()
              .map((e) => `${e.id}-${e.date}-${e.status}`)
              .join(":"),
          () => this._schedule(),
          !1
        ),
        sw.model.observe(
          (e) => e.later.selectedPostId,
          () => this._schedule(),
          !1
        );
    },
    _schedule: function () {
      if (this._publishing) return;
      this._timer && this._timer.clear();
      const e = sw.model.state,
        t = aw.proxy
          .getConnectedUsersPosts()
          .filter((e) => "scheduled" === e.status)
          .sort((e, t) => e.date - t.date)
          .at(0);
      if (!t) return void aw.log("no posts to publish");
      const n = aw.proxy.getPostOwnerState(e, t.id),
        r = (null == n ? void 0 : n.authStatus.username) || null,
        o = { post: t, owner: r };
      let i;
      const a = Date.now();
      if (
        ((i =
          0 === e.settings.laterAutoRetry
            ? t.date < a - 5 * uw.time.MINUTE
            : -1 !== e.settings.laterAutoRetry &&
              t.date < a - e.settings.laterAutoRetry),
        i)
      )
        return (
          aw.log("too old to publish", o),
          void aw.proxy.updatePost(t.id, (e) => {
            (e.status = "failed"),
              (e.error = { message: "Chrome was offline at the given time" });
          })
        );
      if (t.date > a) {
        const e = new Date(t.date).toString().split(" ").slice(1, 4).join(" ");
        return (
          aw.log(`scheduled for ${e}`, o),
          void (this._timer = uw.setTimer(() => this._schedule(), t.date - a))
        );
      }
      (async () => {
        aw.log("publish", o),
          (this._publishing = !0),
          iw.controller.online
            ? await this._publishSafe(t)
            : await iw.controller.waitForOnline(),
          (this._publishing = !1),
          this._schedule();
      })();
    },
    _publishSafe: async function (e) {
      const t = aw.proxy.getPostPublishTypeForAnalytics(e);
      cw.controller.toggleSessionWatcher(!1);
      try {
        await this._publish(e),
          fw.controller.sendEvent("user", "later:publish-success", t);
      } catch (r) {
        var n;
        console.error(r);
        const o =
          (null === (n = r.message) || void 0 === n
            ? void 0
            : n.slice(0, 100)) || "unknown";
        fw.controller.sendEvent("user", "later:publish-error", t),
          fw.controller.sendEvent("user", "later:publish-error-message", o),
          aw.proxy.updatePost(e.id, (e) => {
            (e.status = "failed"),
              (e.error = {
                message: "Error happened during posting",
                details: r.message ? r.message.slice(0, 300) : null,
              });
          });
      }
      cw.controller.toggleSessionWatcher(!0),
        (this._lastPublishedAt = Date.now());
    },
    _publish: async function (e) {
      const t = () => {
        const t = sw.model.state;
        return aw.proxy.getPostOwnerState(t, e.id);
      };
      aw.proxy.updatePost(e.id, (e) => {
        (e.status = "posting"), (e.error = null);
      });
      const n = sw.model.state.authStatus.userId,
        r = t().authStatus.userId;
      n === r && (await aw.actualizeCookies());
      const o = Date.now() - this._lastPublishedAt,
        i = aw.config.minTimeBetweenPublishing;
      o < i && (await uw.sleep(i - o));
      const a = t().later.cookies;
      if (!a)
        return void aw.proxy.updatePost(e.id, (e) => {
          (e.status = "failed"),
            (e.error = {
              message: "Error happened during posting",
              details:
                "Login session for this account has expired. Please login again to schedule.",
            });
        });
      if (iw.controller.offline)
        return void aw.proxy.updatePost(e.id, (e) => (e.status = "scheduled"));
      const s = (e.caption || "").slice(0, aw.config.maxCaptionLength),
        l = new sy.Publisher(a);
      if ("post" === e.type || "reel" === e.type) {
        const t = ow.validateCaption(s);
        if (t)
          return void aw.proxy.updatePost(e.id, (e) => {
            (e.status = "failed"),
              (e.error = {
                message: "Error happened during posting",
                details: t,
              });
          });
      }
      for (const t of e.mediaList) {
        const n = aw.proxy.getMediaError(e, t);
        if (n)
          return void aw.proxy.updatePost(e.id, (e) => {
            (e.status = "failed"),
              (e.error = {
                message: "Error happened during posting",
                details: n.message,
              });
          });
      }
      if ("post" === e.type)
        if (e.mediaList.length > 1) {
          const t = await this._prepareCarouselFiles(e);
          await l.postCarousel(t, { caption: s });
        } else if (e.mediaList[0].isVideo) {
          const t = await lw.controller.read(e.mediaList[0].fileId),
            n = await lw.controller.read(e.mediaList[0].coverId);
          await l.postVideo(t, n, {
            caption: s,
            location: e.location,
            mentions: e.mentions,
          });
        } else {
          const t = await lw.controller.read(e.mediaList[0].fileId);
          await l.postPhoto(t, {
            caption: s,
            location: e.location,
            mentions: e.mentions,
          });
        }
      else if ("reel" === e.type)
        for (const t of e.mediaList) {
          const n = t === e.mediaList[0],
            r = await lw.controller.read(t.fileId),
            o = await lw.controller.read(t.coverId);
          await l.postReel(r, o, {
            caption: n ? s : "",
            location: e.location,
            mentions: n ? e.mentions : [],
            shareToFeed: !!e.shareToFeed,
          }),
            await uw.sleep(aw.config.minTimeBetweenPublishing);
        }
      else if ("story" === e.type)
        for (const t of e.mediaList) {
          const n = t === e.mediaList[0],
            r = await lw.controller.read(t.fileId),
            o = { mentions: n ? e.mentions : [] };
          t.isVideo
            ? await l.postStoryVideo(r, o)
            : await l.postStoryPhoto(r, o),
            await uw.sleep(aw.config.minTimeBetweenPublishing);
        }
      e.instant ||
        (sw.transaction((e) => (e.billing.trial.later += 1)),
        true &&
          fw.controller.sendEvent("user", "pro-paid-usage:later")),
        aw.proxy.updatePost(e.id, (e) => {
          (e.status = "posted"), (e.date = Date.now());
        }),
        setTimeout(() => {
          dw.send("later.updateIgPosts", r, !0);
        });
    },
    _prepareCarouselFiles: async function (e) {
      const t = [];
      for (const n of e.mediaList) {
        const e = await lw.controller.read(n.fileId),
          r = n.coverId && (await lw.controller.read(n.coverId));
        t.push({ file: e, cover: r, isVideo: n.isVideo });
      }
      let n, r;
      {
        const e = t[0];
        if (e.isVideo) {
          n = (await uw.loadVideoMetadata(e.file)).ratio;
        } else {
          n = (await uw.loadImage(e.file)).ratio;
        }
      }
      {
        const e = aw.config.minImageRatio,
          t = aw.config.maxImageRatio;
        r = Math.max(e, Math.min(n, t));
      }
      for (const e of t) {
        (e === t[0] && n === r) ||
          e.isVideo ||
          (e.file = await uw.scaler.scaleToFitRatio(e.file, r));
      }
      return t
        .filter((e) => {
          const t = aw.config.maxCarouselVideoDurationSec;
          return !(e.isVideo && e.duration > t);
        })
        .map((e) => ({ blob: e.file, ...(e.cover && { coverBlob: e.cover }) }));
    },
  };
  const { $later: mw, $influx: vw, $utils: bw } = app;
  mw.proxy = {
    getAllStates: function (e = vw.model.state) {
      return [e, ...Object.values(e.userStates)];
    },
    getAllConnectedStates: function (e = vw.model.state) {
      return this.getAllStates(e).filter((t) => {
        const n = t.authStatus.userId;
        return e.multiaccount.userIds.includes(n);
      });
    },
    getSelectedUserState: function (e = vw.model.state) {
      return this.getUserState(e, e.later.selectedUserId);
    },
    getUserState: function (e, t) {
      return (
        this.getAllStates(e).find((e) => e.authStatus.userId === t) || null
      );
    },
    getPostOwnerState: function (e, t) {
      const n = this.getAllStates(e).find((e) =>
        e.later.posts.some((e) => e.id === t)
      );
      return n || null;
    },
    getSelectedUserPosts: function () {
      const e = this.getSelectedUserState();
      if (!e) return [];
      const t = structuredClone(e.later.posts);
      this._sortPosts(t);
      const n = vw.model.state.later.dnd;
      return this._applyDndToPosts(n, t), t;
    },
    getAllPosts: function (e = vw.model.state) {
      return this.getAllStates(e)
        .map((e) => e.later.posts)
        .flat();
    },
    getConnectedUsersPosts: function () {
      return this.getAllConnectedStates()
        .map((e) => e.later.posts)
        .flat();
    },
    getSelectedPost: function () {
      const e = vw.model.state;
      return this.getAllPosts().find((t) => t.id === e.later.selectedPostId);
    },
    getPost: function (e) {
      const t = this.getAllConnectedStates();
      for (const n of t) {
        const t = n.later.posts.find((t) => t.id === e);
        if (t) return t;
      }
      return null;
    },
    getPostPublishTypeForAnalytics: function (e) {
      return "post" === e.type
        ? e.mediaList.length > 1
          ? "carousel"
          : e.mediaList[0].isVideo
          ? "video"
          : "photo"
        : "story" === e.type
        ? e.mediaList.length > 1
          ? "story-series"
          : e.mediaList[0].isVideo
          ? "story-video"
          : "story-photo"
        : "reel" === e.type
        ? e.mediaList.length > 1
          ? "reel-series"
          : "reel"
        : void 0;
    },
    updatePost: function (e, t = () => {}) {
      vw.transaction((n) => {
        const r = (n = this.getPostOwnerState(n, e)).later.posts.find(
          (t) => t.id === e
        );
        r && t(r);
      });
    },
    deletePost: function (e) {
      vw.transaction((t) => {
        const n = (t = this.getPostOwnerState(t, e)).later.posts.findIndex(
          (t) => t.id === e
        );
        t.later.posts.splice(n, 1);
      });
    },
    isPostEditable: function (e) {
      return "posted" !== e.status && "posting" !== e.status;
    },
    getMediaError: function (e, t) {
      return "post" === e.type &&
        e.mediaList.length > 1 &&
        t.isVideo &&
        t.duration > mw.config.maxCarouselVideoDurationSec
        ? {
            message:
              "Instagram does not support videos longer than 1 minute for carousels.",
          }
        : "story" === e.type &&
          t.isVideo &&
          t.duration > mw.config.maxStoryDurationSec
        ? {
            message:
              "Instagram does not support videos longer than 5 minutes for stories.",
          }
        : "reel" !== e.type || t.isVideo
        ? null
        : { message: "Instagram does not support photos as reels." };
    },
    updateSelectedUserState: function (e = () => {}) {
      vw.transaction((t) => {
        (t = this.getSelectedUserState(t)), e(t);
      });
    },
    updateUserState: function (e, t = () => {}) {
      vw.transaction((n) => {
        (n = mw.proxy.getUserState(n, e)), t(n);
      });
    },
    applyDnd: function () {
      vw.transaction((e) => {
        const t = e.later.dnd,
          n = this.getSelectedUserState(e);
        this._applyDndToPosts(t, n.later.posts),
          e.later.selectedPostId &&
            (e.later.selectedPostId =
              t.dragPostId === e.later.selectedPostId
                ? t.dragOverPostId
                : t.dragOverPostId === e.later.selectedPostId
                ? t.dragPostId
                : e.later.selectedPostId),
          (t.dragPostId = null),
          (t.dragOverPostId = null),
          (t.dragOverDay = null),
          (t.dragOverTime = null);
      });
    },
    _sortPosts: function (e) {
      e.sort((t, n) => {
        if ("draft" !== t.status && "draft" === n.status) return 1;
        if ("draft" === t.status && "draft" !== n.status) return -1;
        if (t.date && n.date) return n.date - t.date;
        if (t.date) return 1;
        if (n.date) return -1;
        const r = e.indexOf(t);
        return e.indexOf(n) - r;
      });
    },
    _applyDndToPosts: function (e, t) {
      if (e.dragPostId)
        if (e.dragOverDay && e.dragOverTime) {
          const n = t.find((t) => t.id === e.dragPostId);
          (n.date = e.dragOverDay + e.dragOverTime), (n.status = "scheduled");
        } else if (e.dragOverDay) {
          const n = e.dragOverDay,
            r = t.find((t) => t.id === e.dragPostId),
            o = Date.now() + bw.time.HOUR,
            i = (function (e) {
              pw(1, arguments);
              var t = hw(e);
              return t.setHours(23, 59, 59, 999), t;
            })(n).getTime();
          if (o > i) return;
          let a;
          if (r.date) a = r.date - gw(r.date);
          else {
            const e = t.findLast((e) =>
              (function (e, t) {
                pw(2, arguments);
                var n = gw(e),
                  r = gw(t);
                return n.getTime() === r.getTime();
              })(e.date, n)
            );
            a = e ? e.date - n + bw.time.HOUR : 12 * bw.time.HOUR;
          }
          let s = n + a;
          s < o && (s = o),
            s > i && (s = i),
            (r.date = s),
            (r.status = "scheduled");
        } else if (e.dragOverPostId) {
          const n = t.find((t) => t.id === e.dragPostId),
            r = t.find((t) => t.id === e.dragOverPostId);
          if (!n || !r) return;
          const o = { ...r, id: n.id, date: n.date, status: n.status },
            i = { ...n, id: r.id, date: r.date, status: r.status };
          Object.assign(n, o), Object.assign(r, i);
        }
    },
  };
  const {
    $analytics: yw,
    $influx: ww,
    $bus: _w,
    $idb: xw,
    $iframeBus: Sw,
    $env: Pw,
  } = app;
  yw.controller = {
    init: function () {
      return (
        Pw.is.pp
          ? (this._insertAnalyticsScript(),
            this._initIframeMessage(),
            this._sendBgEvents())
          : Pw.is.bg && this._initChromeMessage(),
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
      Sw.on("ga.send-event", (...e) => {
        this.sendEvent(...e);
      });
    },
    _initChromeMessage: function () {
      _w.on("ga.send-event", (...e) => {
        this.sendEvent(...e);
      });
    },
    _sendBgEvents: async function () {
      const e = (await xw.get("ga.bgEvents")) || [];
      await xw.set("ga.bgEvents", []);
      for (const t of e) this._ga(...t);
    },
    sendPageview: function () {
      if (!this._enabled()) return this;
      const e = Pw.is.bg ? "background" : document.location.pathname;
      return this._ga("send", "pageview", e), this;
    },
    sendInstall: function () {
      if (!ww.model.state.installedEventSent) {
        const e = chrome.runtime.getManifest().version,
          t = "installed:" + (globalThis.electron ? "electron" : "chrome");
        this.sendEvent("user", t, e),
          ww.transaction((e) => {
            e.installedEventSent = !0;
          });
      }
      return this;
    },
    sendEvent: function (e, t, n, r, o = { nonInteraction: 1 }) {
      if (!e) throw new yw.Error("category is required");
      if (!t) throw new yw.Error("action is required");
      if (r && !Number.isInteger(r))
        throw new yw.Error("value must be an integer");
      return this._enabled()
        ? (this._ga("send", "event", e, t, n || null, r || null, o || null),
          this)
        : (yw.log(...arguments), this);
    },
    _enabled: function () {
      return !Pw.is.development;
    },
    _ga: async function (...e) {
      if (Pw.is.bg) {
        const t = (await xw.get("ga.bgEvents")) || [];
        t.push(e), await xw.set("ga.bgEvents", t);
      } else {
        if (!globalThis.ga) return;
        globalThis.ga(...e);
      }
    },
  };
  const { $cleanup: kw, $influx: Dw, $bus: Iw, $coverAssist: Ew } = app;
  function Tw(e) {
    Dw.transaction((t) => {
      (t.cleanupId = e),
        (t.sidebar.selectedTabId = null),
        (t.sidebar.isOpen = !1),
        (t.dm.ghostModeFailed = !1),
        (t.reels.creating = !1),
        (t.igView.creationCardShown = !1),
        (t.igView.fullscreenWidth = 460),
        (t.billing.purchasingPlan = null),
        (t.billing.snapshot.loading = !1),
        (t.billing.snapshot.accountScreen = null),
        (t.tagAssist.shown = !1),
        (t.tagAssist.query = ""),
        (t.tagAssist.searching = !1),
        (t.tagAssist.errorCode = null),
        (t.tagAssist.selectedTabId = "search"),
        (t.tagAssist.selectedGroupId = "medium"),
        (t.tagAssist.igSelectedTags = []),
        (t.tagAssist.fcsSelectedTags = []),
        (t.tagAssist.sidebarSelectedTags = []),
        (t.tagAssist.sidebarSelectedTagsAsText = ""),
        (t.tagAssist.ladderEngagementSort = null),
        (t.tagAssist.summaryEngagementSort = "descending"),
        (t.tagAssist.ladderPostCountSort = null),
        (t.tagAssist.summaryPostCountSort = null),
        (t.tagAssist.ladder = null),
        (t.tagAssist.ladderLoadingTags = []),
        (t.tagAssist.newCollection.name = ""),
        (t.tagAssist.newCollection.text = ""),
        (t.tagAssist.newCollection.showForm = !1),
        (t.tagAssist.collectionsLoadingTags = []);
      for (const e of t.tagAssist.collections)
        (e.editing = !1), (e.editName = ""), (e.editText = "");
      const n = t.tagAssist.accountStats[t.authStatus.userId] || null,
        r = (null == n ? void 0 : n.mostUsedTags) || [];
      r.length > 0 &&
        ((t.tagAssist.searching = !0),
        (t.tagAssist.query = r
          .slice(0, 2)
          .map((e) => `#${e}`)
          .join(" "))),
        Object.assign(t.coverAssist, Ew.defaultState),
        (t.musicAssist.shown = !1),
        (t.storyAssist.shown = !1),
        (t.storyAssist.isVideo = !1),
        (t.storyAssist.coverUrl = null),
        (t.storyAssist.showUpsellOverlay = !1),
        (t.storyAssist.mentions.query = ""),
        (t.storyAssist.mentions.foundUsers = []),
        (t.storyAssist.mentions.selectedUsers = []),
        (t.later.showUpsell = !1),
        (t.later.showBodyPanel = !1),
        (t.later.showAssistPanel = !1),
        (t.later.selectedUserId = t.authStatus.userId),
        (t.later.selectedPostId = null),
        (t.later.selectedPillId = null),
        (t.later.selectedIgDate = null),
        (t.later.errors = []),
        (t.later.processing = !1),
        (t.later.calendar.periodStart = Date.now()),
        (t.later.ig.loading = !1),
        (t.later.dnd.dragPostId = null),
        (t.later.dnd.dragOverPostId = null),
        (t.later.dnd.dragOverDay = null),
        (t.later.dnd.dragOverTime = null),
        (t.ghostStoryView.showUpsellOverlay = !1);
    });
  }
  kw.controller = {
    init: function () {
      Iw.on("cleanup.clean-up-state", () => {
        const e = Date.now();
        return Tw(e), e;
      });
    },
    cleanUpState: Tw,
  };
  var Cw = {
      getConfig: () => {
        const e = c.get("fusion.config");
        return e && e.version >= Cw.config.version ? e : Cw.config;
      },
    },
    Fw = {};
  const { $bus: Aw, $utils: Ow, $env: Mw } = app;
  let Rw, Uw;
  function Nw() {
    Ow.ls.remove("fusion.last-check-on");
  }
  async function jw() {
    const e = 15 * Ow.time.MINUTE,
      t = Number(Ow.ls.get("fusion.last-check-on"));
    if (t && Date.now() < t + e) return;
    Ow.ls.set("fusion.last-check-on", Date.now());
    const n = Cw.getConfig(),
      r = `${Mw.options.apiUrl}/fusion?version=${n.version}`;
    oy.ignoreCache();
    const o = (await oy.fetchText(r, { credentials: "omit" }))
        .replace(/&amp;/g, "&")
        .replace(/&#34;/g, '\\"')
        .replace(/&#39/g, "'")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">"),
      i = JSON.parse(o);
    if (!i.config) return;
    const a = JSON.parse(JSON.stringify(n));
    Uw = Bw(a, i.config);
    chrome.extension.getViews({ type: "tab" }).length > 0
      ? Aw.send("fusion.new-version-available")
      : Lw();
  }
  function Lw() {
    Uw && (Ow.ls.set("fusion.config", Uw), location.reload());
  }
  function Bw(e, t) {
    for (const n in t)
      Ow.isObject(e[n]) && Ow.isObject(t[n]) ? Bw(e[n], t[n]) : (e[n] = t[n]);
    return e;
  }
  (Cw.controller = {
    init: function () {
      Aw.on("fusion.check-new-version", jw),
        Aw.on("fusion.popup-tab-id", (e) => {
          Rw = e;
        }),
        Fw.controller.onReset(Nw),
        chrome.tabs.onRemoved.addListener((e) => {
          e === Rw && Uw && Lw();
        }),
        Aw.on("fusion.update-now-click", () => {
          Ow.ls.set("fusion.reload-popup-on-background-start", !0), Lw();
        }),
        Ow.ls.get("fusion.reload-popup-on-background-start") &&
          (Ow.ls.remove("fusion.reload-popup-on-background-start"),
          Aw.send("fusion.reload-popup")),
        chrome.alarms.onAlarm.addListener(async (e) => {
          "fusion.refresh-config" === e.name && jw();
        }),
        chrome.alarms.create("fusion.refresh-config", {
          when: Date.now(),
          periodInMinutes: 1440,
        });
    },
  }),
    (Cw.config = {
      version: 128,
      dmSelectors: {
        bottomToolbarHeightVar: "--revamp-nav-bottom-toolbar-height",
        menuPanel: ['.IGDSBox[style*="height: 100%"] > div:first-child'],
        pageContent: ['.IGDSBox[style*="height: 100%"] > div:last-child'],
        header: [".IGDLeftRailContainer > div:first-child"],
        headerUserSelect: [
          ".IGDLeftRailContainer > div:first-child > div:first-child",
        ],
        headerWriteButton: [
          ".IGDLeftRailContainer > div:first-child > div:last-child",
        ],
        headerNoFoldersContainer: [
          ".IGDLeftRailContainer > .IGDThreadListTitleLayout",
        ],
        headerNoFoldersTab: [
          ".IGDLeftRailContainer > .IGDThreadListTitleLayout > *",
        ],
        folderTab: [".IGDProFolderMenu > .PressableText"],
        requestsTab: [".IGDProFolderMenu > .PressableText:nth-child(3)"],
        requestsTabContent: [
          ".IGDProFolderMenu > .PressableText:nth-child(3) > span",
        ],
        requestsTabText: [
          ".IGDProFolderMenu > .PressableText:nth-child(3) > span > span",
        ],
        requestsDescription: [".IGDMessageRequestLeftRailLayout:nth-child(2)"],
        chatItem: [
          ".ReQLScrollAnchored > .Pressable",
          ".IGDInboxThreadListContainer .ReQLScrollAnchored > .IGDVisibilityAware > .Pressable",
          ".IGDInboxThreadListContainer .ReQLScrollAnchored > .WebPressable",
          ".IGDInboxThreadListContainer .ReQLScrollAnchored .IGDVisibilityAware > .WebPressable",
        ],
        chatItemContent: [
          ".ReQLScrollAnchored > .Pressable > div",
          ".IGDInboxThreadListContainer .ReQLScrollAnchored > .IGDVisibilityAware > .Pressable > div",
          ".IGDInboxThreadListContainer .ReQLScrollAnchored > .WebPressable > div",
          ".IGDInboxThreadListContainer .ReQLScrollAnchored .IGDVisibilityAware > .WebPressable > div",
        ],
        chatItemSkeleton: [
          ".IGDInboxLeftColumnPlaceholder > .IGDListCellPlaceholder",
          ".ReQLScrollAnchored > .IGDListCellPlaceholder",
        ],
        chatItemTitle: [
          '.ReQLScrollAnchored > .Pressable div[style*="width: 244px"]',
          '.ReQLScrollAnchored > .WebPressable div[style*="width: 244px"]',
        ],
        chatHeader: [".IGDThreadDetail:has(.IGDSectionHeaderLayout) > div"],
        chatHeaderAvatar: [
          ".IGDThreadDetail:has(.IGDSectionHeaderLayout) .IGDSAvatar",
        ],
        chatHeaderAvatarContainer: [
          ".IGDThreadDetail:has(.IGDSectionHeaderLayout) .IGDSingleAvatar",
        ],
        chatHeaderTitle: [
          ".IGDThreadDetail:has(.IGDSectionHeaderLayout) a > .IGDSBox",
        ],
        writeInput: [".MWPCometComposerInner > .CometLexicalContentEditable"],
        writeInputContainer: ["div:has(> .MWPCometComposerInner)"],
        writePanel: [".MWV2FileDropzone > div:not([class]) > .IGDComposerView"],
        writePanelVoiceButton: [
          '.IGDComposerView:has(> input) > div:has(path[d^="M19.5 10.671v"])',
        ],
        mediaViewerVideo: [".IGDMediaViewer video"],
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
          tabBar: [
            ".KGiwt",
            ".PolarisNavigation > ._abpb",
            '.PolarisNavigation[style*="transform"]',
            ".xaeubzz",
          ],
          tabBarWrap: [
            ".ZoygQ",
            ".IGDSBox > .PolarisNavigation",
            ".createKeyCommandWrapper > .PolarisNavigation",
          ],
          tabBarContainer: [
            ".IGDSBox > .PolarisNavigation > div",
            ".createKeyCommandWrapper .PolarisNavigation[style]:has(> .PolarisNavigation)",
          ],
          tabBarTopContainer: [".IGDSBox:has(> .createKeyCommandWrapper)"],
          tabBarInput: [
            ".ZoygQ input",
            ".PolarisNavigation input.PolarisImageFileForm",
          ],
          tabBarButton: [
            '.PolarisNavigation[style*="transform"] > div > div:not([class])',
            ".PolarisNavigationIcons > div",
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
            ".createKeyCommandWrapper .PolarisNavigationItem a",
          ],
          tabBarDm: [
            '.PolarisNavigation div:not(:first-child):not(:last-child):not([class]):has(polygon[points^="11.698 20.334"])',
            '.PolarisNavigation div:not(:first-child):not(:last-child):not([class]):has(polygon[points^="11.698 20.334"])',
            '.PolarisNavigation div:not(:first-child):not(:last-child):not([class]):has(path[d^="M12.003 2.001a9"])',
          ],
          tabBarReels: [
            '.PolarisNavigation div:not(:first-child):not(:last-child):not([class]):has(path[d^="M2 12.001v3.449c0"])',
            '.PolarisNavigation div:not(:first-child):not(:last-child):not([class]):has(path[d^="m12.823 1 2.974"])',
          ],
          tabBarBadge: [
            ".PolarisNavigation .PolarisNavigationBadge",
            ".PolarisDirectNavItemBadge",
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
          postDmButton: [
            'article button.PolarisIGCoreSVGIconButton:has(polygon[points*="11.698 20.334 22 3.001"])',
            '.PolarisMobilePost_next button.PolarisIGCoreSVGIconButton:has(polygon[points*="11.698 20.334 22 3.001"])',
          ],
          post: [
            "article[data-post-id]",
            "article:has([data-post-id])",
            ".PolarisMobilePost_next[data-post-id]",
          ],
          postThreeDotsButton: [
            ".MEAGs button",
            ".PolarisPostOptionsButtonPicker button",
            '.PressableText:has(circle[cx="18"][cy="12"][r="1.5"])',
          ],
          postVideoContainer: ["._5wCQW", ".PolarisDeclarativeVideo._ab1c"],
          publishingBarText: [
            ".o5gub span",
            ".PolarisUploadProgressBar._aaug",
            ".UploadBar__text",
          ],
          uploadPanel: [
            ".TExId",
            ".PolarisUploadProgressBar._aauh",
            ".UploadBar",
          ],
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
          postPhotoOverlay: [".PolarisPhoto._aagw"],
          tryMbsSection: [".PolarisQPBloksRenderer._a9_9"],
          splashScreen: ["body > #splash-screen"],
        },
        creationPopup: {
          root: [
            ".PolarisMobileCreationNavItem ._aa5x",
            ".PolarisMobileCreationNavItem ._ad8j",
            ".PolarisMobileCreationNavItem ._aa5-",
            ".IGDSPopover:has(.PolarisMobileCreationMenuContent)",
            ".PolarisMobileCreationMenuContent",
          ],
          triggerButton: [
            ".PolarisGenericMobileHeader .PolarisMobileCreationNavItem a",
          ],
          postButton: [
            '.PolarisMobileCreationNavItem ._aa5x [role="button"]:first-child',
            '.PolarisMobileCreationNavItem ._ad8j [role="button"]:first-child',
            '.PolarisMobileCreationNavItem ._aa5- [role="button"]:first-child',
            '.PolarisMobileCreationMenuContent [role="button"]:first-child',
          ],
          storyButton: [
            '.PolarisMobileCreationNavItem ._aa5x [role="button"]:last-child',
            '.PolarisMobileCreationNavItem ._ad8j [role="button"]:last-child',
            '.PolarisMobileCreationNavItem ._aa5- [role="button"]:last-child',
            '.PolarisMobileCreationMenuContent [role="button"]:last-child',
          ],
          postInput: [
            ".PolarisMobileCreationNavItem > form:last-child > input",
          ],
        },
        dragPanel: {
          root: [".RnEpo.xpORG._9Mt7n", ".PolarisIGCoreModalBackdrop > ._ac7o"],
          handle: [".BHY8D", ".PolarisIGCoreSheet._ac7m"],
          igIcon: ".glyphsSpriteApp_Icon_36.u-__7",
          sendEmailLink: [
            '.-qQT3[href^="mailto:"]',
            '._abm4[href^="mailto:"]',
            '._abm4 [href^="mailto:"]',
            'a.Pressable[target="_top"][href^="mailto:"]',
            'a.WebPressable:has(polygon[points*="11.698 20.334 22 3.001"])',
          ],
          shareToThreadsLink: [
            'a.WebPressable:has(path[d*="M141.537 88.9883C140.71 88.5919 139.87"])',
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
            "section.PolarisBaseShell > .PolarisMobileStories",
          ],
          container: [".PolarisBaseShell:has(> .PolarisMobileStories)"],
          videoPlayer: [
            '.PolarisStoryVideoPlayerWrapper > div[style*="top: 0"]',
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
          root: [
            "._650Zr",
            ".PolarisStoryCreationPage",
            'body[data-page="StoryCreationPage"] section.PolarisBaseShell',
          ],
          canvas: [
            ".PolarisStoryCreationPage canvas",
            'body[data-page="StoryCreationPage"] canvas',
          ],
          headerButton: [
            ".PolarisStoryCreationPage header button",
            'body[data-page="StoryCreationPage"] header button',
          ],
          textInput: [
            "[contenteditable]",
            ".PolarisStoryCreationTextInput[contenteditable]",
          ],
          topRightButtonsContainer: [
            ".o4NXM",
            ".PolarisStoryCreationPage header > div.PolarisStoryImageCreationContainer",
            'body[data-page="StoryCreationPage"] header > div.PolarisStoryImageCreationContainer',
          ],
          topRightButton: [
            ".o4NXM button",
            ".PolarisStoryCreationPage header > div button",
            'body[data-page="StoryCreationPage"] header > div button',
          ],
          downloadButton: [
            '[class*="storiesSpriteDownload"]',
            ".PolarisStoryCreationPage header > div button:nth-child(1)",
            'body[data-page="StoryCreationPage"] header > div button:nth-child(1)',
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
          photoControls: [
            ".PolarisStoryImageCreationContainer._aa3f",
            "header.PolarisStoryImageCreationContainer > div:last-child",
          ],
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
          submitButtonText: [
            ".PolarisStoryCreationShareFooter > button .PolarisStoryCreationShareFooter",
          ],
          uploadHeader: [
            ".PolarisStoryCreationPage .PolarisSharingProgressModal header",
            'body[data-page="StoryCreationPage"] .PolarisSharingProgressModal header',
          ],
          uploadBar: [
            ".PolarisStoryCreationPage .PolarisSharingProgressModal header > div",
            'body[data-page="StoryCreationPage"] .PolarisSharingProgressModal header > div',
          ],
          uploadText: [
            ".PolarisStoryCreationPage .PolarisSharingProgressModal header h1",
            'body[data-page="StoryCreationPage"] .PolarisSharingProgressModal header h1',
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
          addStickerButton: [
            ".PolarisStoryImageCreationContainer > button:nth-child(2)",
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
            "main.PolarisRefreshedShellContent > .PolarisProfilePageContent",
            "main > .PolarisProfilePageContent",
          ],
          header: [
            ".zw3Ow",
            ".PolarisProfilePage header",
            ".PolarisProfilePageContent header",
          ],
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
            'div:has(+ div[style*="width: 34px"]):not(:has(button))',
            ".PolarisProfilePageHeader .IGDSBox > .WebPressable",
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
            ".PolarisProfilePageContent .PolarisIGVirtualGrid",
          ],
          postContainer: [
            ".v9tJq ._bz0w",
            ".PolarisProfileMediaBrowser .PolarisPostsGridItem",
            ".PolarisProfilePageContent .PolarisPostsGridItem_next",
            ".PolarisProfileTabChannel .PolarisVirtualPostsGrid",
            ".PolarisProfilePageContent .PolarisClipsGrid_next",
          ],
          post: [
            '.v9tJq ._bz0w a[href^="/p/"]',
            '.PolarisProfileMediaBrowser .PolarisPostsGridItem > a[href^="/p/"]',
            '.PolarisPostsGridItem_next a[href^="/p/"]',
          ],
          reelRow: [
            ".v9tJq .gmGWn",
            ".v9tJq .Nnq7C",
            ".PolarisProfilePage .PolarisIGVirtualList .PolarisIGVirtualGrid._abq4",
            ".PolarisProfilePageContent .PolarisIGVirtualList .PolarisIGVirtualGrid._abq4",
          ],
          reelContainer: [
            ".v9tJq .k1v61",
            ".v9tJq .b9_1r",
            ".PolarisProfilePage .PolarisClipsGrid",
            "div:has(> .PolarisClipsGridItem)",
            ".PolarisIGVirtualGrid > .PolarisClipsGrid",
          ],
          reelPreviewStats: [
            ".v9tJq .b9_1r .qn-0x",
            ".PolarisPostsGridItemOverlay._ac2d",
          ],
          reelIcon: ['svg:has(path[d*="m12.823 1 2.974"])'],
          pinnedIcon: ['svg:has(path[d*="m22.707 7.583-6.29-6.29a1"])'],
          moreButton: [
            ".VMs3J",
            "section.PolarisProfilePageHeader > .PolarisProfilePageHeader > div.PolarisProfilePageHeader",
          ],
          tab: [
            "._9VEo1",
            ".PolarisProfilePage .PolarisTabbedContent > .PressableText",
            ".PolarisProfilePageContent .PolarisTabbedContent > .PressableText",
          ],
          activeTab: [
            '.PolarisProfilePage .PolarisTabbedContent > .PressableText[aria-selected="true"]',
            '.PolarisProfilePageContent .PolarisTabbedContent > .PressableText[aria-selected="true"]',
          ],
          openMbsButton: [
            'div:has(> a[href*="https://business.facebook.com/business/loginpage/"])',
            'div:has(> a[href*="instagram.com/?u=https%3A%2F%2Fbusiness.facebook.com"])',
          ],
          profileButton: ["section.PolarisProfilePageHeader .WebPressable"],
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
          postsContainer: [".IGDSBox > .PolarisFeedPage"],
          nextPostsContainer: [
            ".PolarisFeedWrapper_next .IGDSBox:has(> .PolarisIGVirtualList)",
          ],
          followSuggestions: [".bq3Mi", ".PolarisSuggestedUserFeedUnit"],
          createPostTopButton: [
            '.PolarisGenericMobileHeader a:has(path[d^="M2 12v3.45c0"])',
          ],
          feed: [
            "section.PolarisFeedPage",
            ".PolarisFeedContainerLayout > div > .PolarisFeedWrapper_next",
          ],
          post: [
            "article._8Rm4L",
            "article.PolarisPost",
            "article.PolarisPostFunctional",
            "article.PolarisFeedCard_next",
          ],
          postContainer: [
            ".PolarisFeedCard_next:has(> .PolarisDoubleTappable)",
          ],
          postContainerChild: [
            ".PolarisFeedCard_next:has(> .PolarisDoubleTappable) > div",
          ],
          postContainerChild2: [
            ".PolarisFeedCard_next:has(> .PolarisDoubleTappable) > div > div",
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
            "article.PolarisFeedCard_next > div > div:nth-child(2)",
          ],
          postContentLimit: '[style*="min(470px, 100vw)"]',
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
            "article.PolarisFeedCard_next .PolarisPhoto img",
          ],
          postVideo: [
            "article._8Rm4L video",
            "article.PolarisPost .PolarisVideo video",
            "article.PolarisPostFunctional .PolarisVideo video",
            "article.PolarisFeedCard_next video",
          ],
          postMediaContainer: ["._97aPb", ".PolarisPhoto._aagu"],
          postPhotoContainer: [
            "._9AhH0",
            ".PolarisPost .PolarisPost.PolarisPhoto",
            ".PolarisPost .PolarisPost.PolarisPhotoWithIndicator",
            ".PolarisPostFunctional .PolarisPostFunctional.PolarisPhoto",
            ".PolarisPostFunctional .PolarisPostFunctional.PolarisPhotoWithIndicator",
            ".PolarisFeedCard_next .PolarisPhoto._aagu",
          ],
          postVideoContainer: [
            ".GRtmf",
            ".PolarisPost .PolarisMedia.PolarisVideo",
            ".PolarisPostFunctional .PolarisMedia.PolarisVideo",
            '[data-media-actions-post-type="igtv"] > .PolarisIGCoreBox',
            "[data-visualcompletion] > .PolarisPostVideoPlayerWrapper",
          ],
          postCarouselContainer: [".rQDP3", ".PolarisSidecar._aamn"],
          carouselDots: [".ijCUd", ".PolarisStepIndicator.PolarisSidecar"],
          carouselDot: [".Yi5aA", ".PolarisStepIndicator ._acnb"],
        },
        postCreation: {
          body: [
            '[data-page="CreationDetailsPage"] .PolarisCreationShell',
            '[data-page="CreationDetailsPage"] .PolarisBaseShell',
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
          ".PolarisPost div:first-child:last-child:not([class]) > .PolarisPhotoWithIndicator > .PolarisPhoto",
          ".PolarisPost .PolarisMedia.PolarisVideo",
          ".PolarisPost .PolarisSidecar li.PolarisVirtualHSnapScrollComponents",
          ".PolarisPostFunctional .PolarisPostFunctional.PolarisPhoto",
          ".PolarisPostFunctional .PolarisPostFunctional.PolarisPhotoWithIndicator",
          ".PolarisFeedCard_next .PolarisPhoto._aagu",
          ".PolarisPostFunctional .PolarisMedia.PolarisVideo",
          "[data-visualcompletion] > .PolarisPostVideoPlayerWrapper",
          ".PolarisPostFunctional .PolarisSidecar li.PolarisVirtualHSnapScrollComponents",
          ".PolarisFeedCard_next .PolarisSidecar li.PolarisVirtualHSnapScrollComponents",
          ".PolarisPostVideoPlayerWrapper[style]",
          ".PolarisMediaItem_next",
          ".PolarisVideoLegacy",
        ],
        "post-video": [
          ".GRtmf video",
          ".PolarisPost ._aatk video",
          ".PolarisPostFunctional ._ab12 video",
          "video.VideoPlayerImplementationReactVideoElement",
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
          ".VideoPlayerComponentContainer:has(> .VideoPlayerInteractionOverlay)",
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
        postCreationPage: ['html[data-page="CreationStylePage"]'],
        storyCreationPage: ['html[data-page="StoryCreationPage"]'],
        "new-post_tag-people-image-container": ".qJfNm",
      },
      ig: { STORY_REELS_ITEM_SEEN: "STORY_REELS_ITEM_SEEN" },
    });
  var $w = {};
  const { $bus: Vw, $utils: Hw, $env: zw } = app;
  $w.controller = {
    init: async function () {
      3 === zw.manifestVersion &&
        ((this._lastRuleId = 1),
        (this._globalRules = []),
        (this._tabRuleIds = []),
        (this._tabRuleCreators = []),
        this._watchForPopupTab(),
        await this._dropAllRules(),
        await this._applyGlobalRules());
    },
    _watchForPopupTab: function () {
      Vw.on("wri.popup-tab-created", async (e) => {
        await this._removeRules(this._tabRuleIds);
        const t = this._tabRuleCreators.map((t) => t(e)),
          n = await this._applyRules(t);
        this._tabRuleIds = n;
      });
    },
    _dropAllRules: async function () {
      const e = await Hw.callAsync(
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
      await Hw.callAsync(chrome.declarativeNetRequest.updateSessionRules, {
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
        await Hw.callAsync(chrome.declarativeNetRequest.updateSessionRules, {
          addRules: e,
        }),
        e.map((e) => e.id)
      );
    },
  };
  const { $influx: qw, $utils: Gw, $auth: Ww, $env: Jw } = app;
  iw.controller = {
    init: function () {
      (this._onOnline = Gw.createEmitter()),
        (this._onOffline = Gw.createEmitter()),
        this._watchOnlineStatus(),
        this._updateUserWhenOnlineStatusChanges(),
        setInterval(() => this._recoverIfOffline(), 5 * Gw.time.MINUTE);
    },
    get online() {
      return navigator.onLine;
    },
    get offline() {
      return !this.online;
    },
    waitForOnline: async function () {
      this.online ||
        (await new Promise((e) => {
          const t = () => {
            e(), this._onOnline.off(t);
          };
          this._onOnline(t);
        }));
    },
    _watchOnlineStatus: function () {
      if (3 === Jw.manifestVersion) {
        if (!navigator.connection) return;
        let e = navigator.onLine;
        navigator.connection.addEventListener("change", () => {
          navigator.onLine !== e &&
            ((e = navigator.onLine), e ? this._onOnline() : this._onOffline());
        });
      } else
        globalThis.addEventListener("online", () => this._onOnline()),
          globalThis.addEventListener("offline", () => this._onOffline());
    },
    _updateUserWhenOnlineStatusChanges: function () {
      this._onOnline(() => {
        log("[$chromeStarter] going online"),
          null === qw.model.state.authStatus.userId &&
            Ww.controller.updateUser();
      }),
        this._onOffline(() => {
          log("[$chromeStarter] going offline"),
            null !== qw.model.state.authStatus.userId &&
              Ww.controller.updateUser();
        });
    },
    _recoverIfOffline: function () {
      null === qw.model.state.authStatus.userId &&
        (log("[$chromeStarter] trying to recover from offline"),
        Ww.controller.updateUser());
    },
  };
  const { $insights: Qw } = app;
  Qw.credibilityToGrade = (e) => {
    const t = Yw.find((t) => t.condition(e));
    return { value: t.value, label: t.label, color: t.color };
  };
  const Yw = [
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
    { $insights: Kw } = app;
  Kw.getSpamColor = (e) => Xw.find((t) => t.condition(e)).color;
  const Xw = [
      { condition: (e) => e > 0.35, color: "#E34E21" },
      { condition: (e) => "number" == typeof e, color: "#74BE86" },
      { condition: () => !0, color: "#D8DADD" },
    ],
    { $insights: Zw, $influx: e_, $bus: t_ } = app;
  Zw.controller = {
    init: async function () {
      t_.on(
        "insights.get-credibility-grade",
        this._getCredibilityGrade.bind(this)
      );
    },
    _getCredibilityGrade: function (e) {
      const t = e_.model.state.authStatus.userId,
        n = this._getCredibility(e, t);
      return Zw.credibilityToGrade(n);
    },
    _getCredibility: function (e, t = null, { forcePrivate: n = !1 } = {}) {
      const r = e.userId === t;
      if (r) return 1;
      if (e.isPrivate && !r && !n) return null;
      if (e.isVerified) return 1;
      if ("inssistapp" === e.username) return 1;
      let o = 0,
        i = 0;
      Object.values(this._getRules()).forEach((t) => {
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
        s = 1 - this._between01(o / i + a);
      return Math.round(100 * s) / 100;
    },
    _getRules: function () {
      return {
        "followings-to-followers-ratio": {
          weight: 150,
          getValue: (e) => {
            const t = Math.log2(e.followingsCount / e.followersCount / 4) / 1.5;
            return this._between01(t);
          },
        },
        "short-bio": {
          weight: 30,
          getValue: (e) => {
            if (!e.bio) return 1;
            const t = (20 - e.bio.length) / 20;
            return this._between01(t);
          },
        },
        "no-avatar": { weight: 100, getValue: (e) => (e.hasAvatar ? 0 : 1) },
        "few-posts": {
          weight: 200,
          getValue: (e) => {
            const t = (24 - e.postsCount) / 24;
            return this._between01(t);
          },
        },
        "username-ends-with-digits": {
          weight: 100,
          getValue: (e) => {
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
          getValue: (e) => (e.hasHighlights ? 1 : 0),
        },
        "posts-frequency": {
          weight: 150,
          getValue: (e) => {
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
                (o[a] - o[i] < r && a < t
                  ? (a++, (s = Math.max(s, a - i)))
                  : i++,
                i === t - 1)
              )
                break;
            }
            const l = (s / t - 0.6) / 0.4;
            return this._between01(l);
          },
        },
      };
    },
    _between01: function (e) {
      return Math.min(Math.max(0, e), 1);
    },
  };
  const { $files: n_, $idb: r_ } = app;
  n_.controller = {
    save: async function (e, t = "") {
      const n = xg.generate(),
        r = t ? `${t}.${n}` : n;
      return await r_.set(`files.${r}`, e), r;
    },
    read: async function (e) {
      return (await r_.get(`files.${e}`)) || null;
    },
    remove: async function (e) {
      await r_.remove(`files.${e}`);
    },
    getFileIds: async function (e = "") {
      const t = await r_.keys(),
        n = e ? `files.${e}.` : "files.";
      return t
        .filter((e) => e.startsWith(n))
        .map((e) => e.replace("files.", ""));
    },
  };
  var o_ = {};
  o_.utils = {
    extractTags: function (e, t = !1) {
      const n = P({ hashOptional: !t });
      return (e.match(n) || [])
        .map((e) => (e.startsWith("#") ? e.substr(1) : e))
        .map((e) => e.toLowerCase())
        .filter(v);
    },
    compressTag: function (e) {
      return [
        e.name,
        e.lastScanOn,
        e.isBanned ? 1 : 0,
        e.isFlagged ? 1 : 0,
        e.avgLikes,
        e.avgComments,
        e.avgPosts,
        (e.relevantTags || []).map((t) => t.split(e.name).join("~")).join(","),
      ].join(":");
    },
    decompressTag: function (e) {
      const t = e.split(":");
      if (1 === t.length) return { name: t[0] };
      const [n, r, o, i, a, s, l, u] = t;
      return {
        name: n,
        lastScanOn: Number(r),
        isBanned: 1 === Number(o),
        isFlagged: 1 === Number(i),
        avgLikes: Number(a),
        avgComments: Number(s),
        avgPosts: Number(l),
        relevantTags: (u || "")
          .split(",")
          .filter(Boolean)
          .filter(v)
          .map((e) => e.split("~").join(n)),
      };
    },
    sortByFrequency: function (e) {
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
    },
  };
  const { $influx: i_, $utils: a_, $env: s_ } = app;
  async function l_(e = 0) {
    const t = i_.model.state,
      n = t.authStatus.userId;
    if (!n) return;
    const r = Date.now(),
      o = o_.proxy.getAccountStats(),
      i = o && r - o.lastScanOn;
    if (i && i < s_.options.tagAssist.accountStatsTtl) return;
    const a = t.authStatus.username,
      s = await sy.api.fetchUserPosts(a, 42);
    if (s.error)
      return e < 2
        ? void l_(e + 1)
        : void console.error("failed to update account stats", s);
    const l = s.result;
    let u = 0,
      c = 0;
    for (const e of l)
      (u += sy.api.normalizePostStat24h(e.stats.likes, e.on)),
        (c += sy.api.normalizePostStat24h(e.stats.comments, e.on));
    l.length > 0 &&
      ((u = Math.round(u / l.length)), (c = Math.round(c / l.length)));
    const d = o_.utils.sortByFrequency(
      l.map((e) => e.caption || "").map((e) => o_.utils.extractTags(e, !0))
    );
    i_.transaction((e) => {
      e.tagAssist.accountStats[n] = {
        avgLikes: u,
        avgComments: c,
        mostUsedTags: d.slice(0, 3),
        lastScanOn: Date.now(),
      };
    });
  }
  (o_.accountStatsController = {
    init: function () {
      i_.model.observe(
        (e) => e.authStatus.userId,
        () => {
          l_();
        }
      ),
        a_.createAlarm(
          "tag-assist.update-account-stats",
          { period: 4 * a_.time.HOUR },
          () => {
            l_();
          }
        );
    },
  }),
    (o_.controller = {
      init: function () {
        o_.accountStatsController.init();
      },
    });
  const { $influx: u_ } = app;
  o_.proxy = {
    getAccountStats: function () {
      const e = u_.model.state,
        t = e.authStatus.userId;
      return e.tagAssist.accountStats[t] || {};
    },
  };
  function c_(e, t, { once: n = !1 } = {}) {
    globalThis.addEventListener(
      `__event-bus.${e}`,
      (e) => {
        const n = e.detail || [];
        t(...n);
      },
      { once: n }
    );
  }
  var d_ = {
    send: function (e, ...t) {
      const n = new CustomEvent(`__event-bus.${e}`, { detail: t });
      globalThis.dispatchEvent(n);
    },
    on: c_,
    once: function (e, t) {
      c_(e, t, { once: !0 });
    },
  };
  const { $influx: f_, $bus: p_, $env: h_ } = app;
  let g_;
  const m_ = [
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
    { field: "authStatus", cb: (e) => Vb.cloneDeep(e) },
    { field: "authStatus.cookies", cb: () => "!sanitized" },
    { field: "billing", cb: (e) => Vb.cloneDeep(e) },
    { field: "billing.account.token", cb: () => "!sanitized" },
    { field: "userStates", cb: () => "!ignored" },
    { field: "whatsNew", cb: () => "!ignored" },
  ];
  async function v_({ key: e, filters: t, data: n } = {}) {
    if (
      ((e = e || "system"),
      (n = n || {}),
      (t = t || {}).username || (t.username = by.proxy.username() || "unknown"),
      "string" != typeof n && !n.state)
    ) {
      const e = f_.model.state,
        t = {};
      m_.forEach((n) => {
        if ("string" == typeof n) t[n] = e[n];
        else {
          const r = e[n.field];
          t[n.field] = n.cb(r);
        }
      }),
        (n.state = t);
    }
    try {
      n = JSON.stringify(n);
    } catch (e) {
      n = e.message;
    }
    const r = { key: e, filters: t, data: n };
    h_.is.development &&
      p_.send("popup.log", "%coverseer report [background]", "color: #c818dc", {
        key: e,
        filters: t,
        data: JSON.parse(n),
      }),
      g_
        .send("/overseer", { body: r })
        .then((t) => {
          log(`overseer ${e} report of ${n.length} bytes was sent`);
        })
        .catch((t) => {
          error(`! failed sending ${e} overseer report of ${n.length} bytes:`),
            error(t);
        });
  }
  var b_ = {
      controller: {
        init: function () {
          (g_ = new Lg.Sender({ urlPrefix: h_.options.apiUrl })),
            p_.on("overseer.send-report", v_);
        },
        sendReport: v_,
      },
    },
    y_ = {};
  const {
    $later: w_,
    $influx: __,
    $bus: x_,
    $insights: S_,
    $files: P_,
    $utils: k_,
    $idb: D_,
    $synch: I_,
    $iframeBus: E_,
    $abTesting: T_,
    $env: C_,
  } = app;
  y_.controller = {
    init: function () {
      (globalThis.$env = C_),
        (globalThis.ig = ay),
        (globalThis.utils = d),
        (globalThis.$igApi = sy),
        (globalThis.$eventBus = d_),
        (globalThis.$bus = x_),
        (globalThis.$iframeBus = E_),
        (globalThis.$abTesting = T_),
        (globalThis.$fetcher = oy),
        (globalThis.$coreBilling = Bg),
        (globalThis.$idb = D_),
        (globalThis.$sentry = jb),
        (globalThis.$overseer = b_),
        (globalThis.$insights = S_),
        (globalThis.setState = this.setState),
        (globalThis.downgradeVersion = this.downgradeVersion),
        (globalThis.errorsDelta = this.errorsDelta),
        (globalThis.activityDelta = this.activityDelta),
        (globalThis.countMadeActions = this.countMadeActions),
        (C_.is.development || C_.is.beta) &&
          ((globalThis.model = __.model),
          (globalThis.transaction = __.transaction),
          (globalThis.$utils = k_),
          (globalThis.$synch = I_),
          (globalThis.$state = by),
          (globalThis.$later = w_),
          (globalThis.$files = P_),
          (globalThis.$influx = __),
          (globalThis.$chromeStarter = iw),
          (globalThis.$webRequestInterceptor = yy),
          this.defineCommit());
    },
    countMadeActions: function (e = 86400) {
      const t = globalThis.__debug.state,
        n = d.getUnixTime(),
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
      const t = Vb.cloneDeep(e);
      by.replaceState.dispatch(t);
    },
    downgradeVersion: function () {
      const e = Vb.cloneDeep(__.model.state);
      (e.version = e.version - 1), by.replaceState.dispatch(e);
    },
    defineCommit: function () {
      Object.defineProperty(globalThis, "commit", {
        get: () => (this.setState(__.model.state), null),
      });
    },
  };
  var F_ = t(function (e) {
    let t = "";
    for (;;) {
      const n = Math.floor(e.length / 2);
      if (((t += e[n]), (e = e.slice(n)).length < 2)) break;
    }
    return t.replaceAll("'", "&").replaceAll('"', "&");
  });
  const { $influx: A_, $bus: O_ } = app;
  let M_, R_, U_, N_, j_, L_, B_, $_, V_, H_, z_, q_;
  function G_() {
    (H_ = "Me"),
      (L_ = "im"),
      (U_ = "me"),
      (N_ = "ru"),
      ($_ = "se"),
      (function () {
        if (!localStorage.setItem) return;
        (R_ = "ro"),
          (z_ = "ss"),
          (M_ = "ch"),
          (q_ = "ag"),
          (V_ = "nd"),
          (j_ = "nt"),
          (B_ = "e");
      })(),
      W_(),
      O_.on("popup.start", W_),
      O_.on("ig.checkLogin", J_);
  }
  function W_() {
    if (!A_.model.state.authStatus.isConnected) return;
    const e = window[M_ + R_ + U_][N_ + j_ + L_ + B_],
      t = e[$_ + V_ + H_ + z_ + q_ + B_].bind(e);
    e[$_ + V_ + H_ + z_ + q_ + B_] = (...e) => {
      const n = JSON.stringify(e[0] || {});
      if (n.charCodeAt(Math.random() * n.length) % 4 != 0) return t(...e);
    };
  }
  async function J_() {
    const e = document.querySelector("script"),
      t = e.src,
      n = e.src.replace("p/b", "p/p").replace("g.", "p.");
    try {
      const e = await fetch(t),
        r = await fetch(n),
        o = await e.text(),
        i = await r.text(),
        a = F_(o);
      return `${a}${F_(i)}`;
    } catch {
      return !1;
    }
  }
  const { $inspiration: Q_, $bus: Y_, $files: K_, $utils: X_ } = app;
  Q_.controller = {
    init: function () {
      (this._lastIdbCleanupAt = 0),
        Y_.on("popup.start", () => this._cleanupIdb()),
        G_();
    },
    _cleanupIdb: async function () {
      const e = Date.now();
      if (e - this._lastIdbCleanupAt < 5 * X_.time.MINUTE) return;
      this._lastIdbCleanupAt = e;
      const t = await K_.controller.getFileIds("inspiration"),
        n = Q_.proxy.getPosts();
      for (const e of t) {
        !!n.find((t) => t.fileId === e || t.previewId === e) ||
          (await K_.controller.remove(e));
      }
    },
  };
  const { $inspiration: Z_, $influx: ex } = app;
  Z_.proxy = {
    getPosts: function () {
      return ex.model.state.inspiration.posts;
    },
    getPost: function (e) {
      return ex.model.state.inspiration.posts.find((t) => t.id === e);
    },
    getFilename: function (e, t) {
      const n = t.type.split("/")[1];
      if (e.filename) return `${e.filename}.${n}`;
      return `${URL.createObjectURL(t).split("/").pop()}.${n}`;
    },
  };
  const { $bus: tx } = app;
  var nx = {
    init: function () {
      (ox = -1),
        tx.on("core-web-request.popup-tab-id", (e) => {
          rx = e;
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
              fromExtension: ax(e),
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
            ix(e.requestHeaders);
            const n = new URL(e.url).host,
              r = {
                details: e,
                isBeforeRequest: !1,
                isRequest: !0,
                isResponse: !1,
                fromExtension: ax(e),
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
              };
            return t(r), { requestHeaders: e.requestHeaders };
          },
          { urls: e },
          ["blocking", "requestHeaders", "extraHeaders"]
        ),
        chrome.webRequest.onHeadersReceived.addListener(
          (e) => {
            ix(e.responseHeaders);
            const n = new URL(e.url).host;
            return (
              t({
                details: e,
                isBeforeRequest: !1,
                isRequest: !1,
                isResponse: !0,
                fromExtension: ax(e),
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
  let rx = null,
    ox = null;
  function ix(e) {
    for (const t of e) t.name = t.name.toLowerCase();
  }
  function ax(e) {
    return e.tabId === rx || e.tabId === ox;
  }
  var sx = { controller: nx };
  const { $utils: lx } = app;
  yy.controller = {
    init: async function () {
      (this._wwwClaim = null),
        (this._dmFrameId = null),
        (this._onRequest = lx.createEmitter()),
        (this._secChUaHeaders = await this._getSecChUaHeaders()),
        sx.controller.watch(
          [
            "https://*.onfastspring.com/*",
            "https://*.instagram.com/*",
            "https://*.facebook.com/*",
            "https://*.inssist.com/*",
          ],
          this._handle.bind(this)
        );
    },
    get onRequest() {
      return this._onRequest;
    },
    _getSecChUaHeaders: async function () {
      const e = await navigator.userAgentData.getHighEntropyValues([
        "model",
        "platformVersion",
        "fullVersionList",
      ]);
      return {
        "sec-ch-ua-model": `"${e.model}"`,
        "sec-ch-ua-platform-version": `"${e.platformVersion}"`,
        "sec-ch-ua-full-version-list": e.fullVersionList
          .map((e) => `"${e.brand}";v="${e.version}"`)
          .join(", "),
      };
    },
    _handle: function ({
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
      this._onRequest(arguments[0]);
      const f = e.frameId === this._dmFrameId;
      if (n && d("instagram.com") && s("x-inssist-cookies")) {
        u("cookie");
        const e = s("x-inssist-cookies");
        try {
          const t = JSON.parse(e.value);
          l(
            "cookie",
            Object.entries(t)
              .map(([e, t]) => `${e}=${t}`)
              .join("; ")
          );
        } catch (e) {
          console.error(e);
        }
        u("x-inssist-cookies");
      }
      if (
        (t && d("app.inssist.com") && i(chrome.runtime.getURL("/inssist.html")),
        t &&
          d("instagram.com") &&
          c("service-worker") &&
          i(chrome.runtime.getURL("/js/ig-service-worker.js")),
        n && o && (d("instagram.com") || d("fastspring.com")))
      ) {
        const t = s("origin");
        if (null == t ? void 0 : t.value.startsWith("chrome-extension")) {
          l("origin", new URL(e.url).origin);
        }
      }
      if (
        ("sub_frame" === e.type &&
          d("instagram.com") &&
          c("/direct/") &&
          (this._dmFrameId = e.frameId),
        n && o && d("instagram.com") && !f)
      ) {
        l(
          "user-agent",
          "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1"
        );
      }
      if (
        (r &&
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
        t && c("/csp/reporting") && a(),
        r && d("instagram.com"))
      ) {
        const e = s("x-ig-set-www-claim");
        e && this._wwwClaim !== e.value && (this._wwwClaim = e.value);
      }
      if (n && d("instagram.com") && !f) {
        !s("x-ig-www-claim") &&
          this._wwwClaim &&
          l("x-ig-www-claim", this._wwwClaim);
      }
      if (n && o && d("instagram.com")) {
        "iframe" === s("sec-fetch-dest").value &&
          l("sec-fetch-dest", "document");
      }
      if (
        (n &&
          o &&
          d("instagram.com") &&
          !f &&
          (l("dpr", "2"),
          u("sec-ch-ua"),
          u("sec-ch-ua-mobile"),
          u("sec-ch-ua-platform"),
          l("sec-ch-prefers-color-scheme", "light"),
          l("sec-fetch-site", "none"),
          l("sec-fetch-user", "?1")),
        n && o && d("instagram.com") && f)
      ) {
        const e = this._secChUaHeaders;
        l("dpr", "2"),
          l("sec-ch-prefers-color-scheme", "light"),
          l("sec-ch-ua-full-version-list", e["sec-ch-ua-full-version-list"]),
          l("sec-ch-ua-model", e["sec-ch-ua-model"]),
          l("sec-ch-ua-platform-version", e["sec-ch-ua-platform-version"]),
          l("sec-fetch-site", "none");
      }
    },
  };
  const { $uninstall: ux } = app;
  ux.controller = {
    init: function () {
      chrome.runtime.setUninstallURL("https://github.com/YezerSTN");
    },
  };
  const { $synch: cx, $influx: dx, $env: fx } = app,
    px = { ...by.getTemplateUserState(), ...by.getTemplateSharedState() },
    hx = dx.action("synch.synch-state", (e, t) => t);
  cx.controller = {
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
            if (!dx.model.store) return;
            return this._onStateUpdatedByPeer(t.deltaState), !1;
          }
          return (
            "fetch-state" === t.name && (n ? n.push(o) : o(dx.model.state), !0)
          );
        }),
        Promise.resolve()
          .then(() => this._fetchState())
          .then(() => {
            const e = n;
            (n = null), e.forEach((e) => e(dx.model.state));
          })
          .then(() => {
            this._subscribeToInflux();
          })
      );
    },
    _fetchState: function () {
      return this.isStorageMaster
        ? cx.storageController
            .init()
            .then((e) => e || px)
            .then((e) => {
              (this.currentState = e), dx.model.init(e);
            })
        : new Promise((e) => {
            chrome.runtime.sendMessage(
              { name: "fetch-state", sender: this.id },
              (t) => {
                (this.currentState = t), dx.model.init(t), e();
              }
            );
          });
    },
    _subscribeToInflux: function (e = !1) {
      this.unsubscribe = dx.model.observe(
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
        (this.currentState = { ...dx.model.state, ...e }),
        hx.dispatch(this.currentState),
        this._saveToStorage(this.currentState),
        this._subscribeToInflux(this.currentState !== dx.model.state);
    },
    _saveToStorage: function (e) {
      this.isStorageMaster &&
        (this.storeBatchingId && clearTimeout(this.storeBatchingId),
        (this.storeBatchingId = setTimeout(
          () => {
            (this.storeBatchingId = null), cx.storageController.save(e);
          },
          fx.is.development || window.electron ? 1e3 : 3e3
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
  };
  var gx = t(
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
                  0 == v.position && ((v.position = n), (v.val = r(v.index++))),
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
  const { $synch: mx, $idb: vx } = app;
  mx.storageController = {
    init: async function () {
      this._debug = !1;
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
        t = await vx.get("state");
      if (!t) return null;
      const n = this._deuglify(t),
        r = Date.now() - e;
      return this._debug && mx.log(`state read in ${r}ms`), n;
    },
    save: async function (e) {
      const t = Date.now(),
        n = this._uglify(e);
      await vx.set("state", n);
      const r = Date.now() - t;
      this._debug && mx.log(`state saved in ${r}ms`);
    },
    _readStateFromDeprecatedStorage: async function () {
      if (
        !!!(await indexedDB.databases()).find((e) => "keyval-store" === e.name)
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
        const e = gx.decompressFromUTF16(t);
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
  };
  const { $bus: bx, $utils: yx } = app;
  Fw.controller = {
    _emitter: yx.createEmitter(),
    reset: function () {
      this._emitter(), bx.send("reset.reset");
    },
    onReset: function (e) {
      this._emitter(e), bx.on("reset.reset", e);
    },
  };
  var wx = {};
  const { $influx: _x, $utils: xx } = app;
  wx.controller = {
    init: function () {
      xx.watchForIgCookie("open-in-inssist", async (e) => {
        const t = e.value;
        t.startsWith("/direct/") && "/direct/" !== t
          ? _x.transaction((e) => {
              (e.sidebar.isOpen = !0), (e.sidebar.selectedTabId = "tab-dm");
            })
          : _x.transaction((e) => {
              e.sidebar.isOpen = !1;
            }),
          chrome.tabs.create({
            url: `chrome-extension://${chrome.runtime.id}/inssist.html#instagram.com${t}`,
            active: !0,
          });
      });
    },
  };
  const { $coverAssist: Sx } = app;
  Sx.defaultState = {
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
  var Px = {};
  const { $influx: kx, $bus: Dx, $utils: Ix, $analytics: Ex } = app;
  function Tx() {
    return {
      hasPro: true,
      freeReels: Math.max(0, 2 - kx.model.state.billing.trial.reels),
      maxFreeReels: 2,
    };
  }
  async function Cx(e) {
    const t = await Ix.callAsync(chrome.windows.getLastFocused),
      n = await Ix.callAsync(chrome.tabs.getSelected, t.id);
    chrome.tabs.create({ url: "https://app.inssist.com", active: !0 }),
      kx.transaction((e) => {
        (e.sidebar.isOpen = !0),
          (e.sidebar.selectedTabId = "tab-billing"),
          (e.billing.recentFeature = "desktop-reels");
      }),
      e.value.includes("keep-ig-tab") ||
        (await Ix.callAsync(chrome.tabs.remove, n.id));
  }
  async function Fx() {
    Ex.controller.sendEvent("user", "reels:submit", "desktop"),
      true
        ? Ex.controller.sendEvent("user", "pro-paid-usage:reels", "desktop")
        : kx.transaction((e) => {
            e.billing.trial.reels += 1;
          });
  }
  function Ax() {
    chrome.cookies.set({
      name: "desktop-reels.initial-data",
      value: JSON.stringify(Tx()),
      url: "https://www.instagram.com",
      path: "/",
      httpOnly: !1,
      secure: !1,
      storeId: "0",
      domain: "instagram.com",
      sameSite: "strict",
      expirationDate: Date.now() + 30 * Ix.time.SECOND,
    });
  }
  Px.controller = {
    init: function () {
      Dx.on("desktop-reels.get-initial-data", Tx),
        Ix.watchForIgCookie("desktop-reels.open-billing", Cx),
        Ix.watchForIgCookie("desktop-reels.submit-success", Fx),
        Ix.watchForIgCookie("desktop-reels.get-initial-data", Ax);
    },
  };
  var Ox = {};
  const { $utils: Mx } = app;
  Ox.controller = {
    init: async function () {
      await (async function () {
        for (const e of Rx) {
          const t = (
            await Mx.callAsync(chrome.cookies.getAll, { url: e })
          ).filter((e) => "unspecified" === e.sameSite);
          await Promise.all(
            t.map(async (t) => {
              e.startsWith("http://")
                ? await Mx.callAsync(chrome.cookies.remove, {
                    url: e,
                    name: t.name,
                  })
                : await Mx.callAsync(chrome.cookies.set, {
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
        chrome.webRequest.onHeadersReceived.addListener(Ux, { urls: Rx }, [
          "blocking",
          "responseHeaders",
          "extraHeaders",
        ]);
    },
  };
  const Rx = [
    "http://*.instagram.com/*",
    "https://*.instagram.com/*",
    "https://*.facebook.com/*",
    "http://*.doubleclick.net/*",
  ];
  function Ux(e) {
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
  var Nx = {};
  Nx.controller = {
    init: function () {
      globalThis.lo = this._lo;
    },
    _lo: function (e) {
      const t = chrome.i18n.getMessage(e);
      if ("" === t) throw new Error(`i18n: no message found for id '${e}'`);
      return t;
    },
  };
  const { $idb: jx, $env: Lx, $bus: Bx } = app;
  jx.controller = {
    init: async function () {
      if (Lx.is.pp) {
        const e = await this._createDbApi(),
          t = this._createBusApi();
        return (
          (jx.get = e.get),
          (jx.set = t.set),
          (jx.keys = e.keys),
          (jx.clear = t.clear),
          void (jx.remove = t.remove)
        );
      }
      if (Lx.is.bg) {
        const e = await this._createDbApi();
        return (
          Object.assign(jx, e),
          Bx.on("idb.get", e.get),
          Bx.on("idb.set", e.set),
          Bx.on("idb.keys", e.keys),
          Bx.on("idb.clear", e.clear),
          void Bx.on("idb.remove", e.remove)
        );
      }
      if (Lx.is.cs) {
        const e = await this._createDbApi(),
          t = this._createBusApi();
        return Object.assign(jx, t), void (jx.db = e);
      }
    },
    _createDbApi: async function () {
      const e = new jx.Database("inssist", 1);
      return (
        await e.init(),
        await this._enablePersistentStorage(),
        {
          get: e.get.bind(e),
          set: e.set.bind(e),
          keys: e.keys.bind(e),
          clear: e.clear.bind(e),
          remove: e.remove.bind(e),
          onChange: e.onChange.bind(e),
        }
      );
    },
    _createBusApi: function () {
      return {
        get: (e) => Bx.send("idb.get", e),
        set: (e, t) => Bx.send("idb.set", e, t),
        keys: () => Bx.send("idb.keys"),
        clear: () => Bx.send("idb.clear"),
        remove: (e) => Bx.send("idb.remove", e),
      };
    },
    _enablePersistentStorage: async function () {
      navigator.storage.persist && (await navigator.storage.persist());
    },
  };
  const $x = (e, t) => t.some((t) => e instanceof t);
  let Vx, Hx;
  const zx = new WeakMap(),
    qx = new WeakMap(),
    Gx = new WeakMap();
  let Wx = {
    get: function (e, t, n) {
      if (e instanceof IDBTransaction) {
        if ("done" === t) return zx.get(e);
        if ("store" === t)
          return n.objectStoreNames[1]
            ? void 0
            : n.objectStore(n.objectStoreNames[0]);
      }
      return Kx(e[t]);
    },
    set: function (e, t, n) {
      return (e[t] = n), !0;
    },
    has: function (e, t) {
      return (
        (e instanceof IDBTransaction && ("done" === t || "store" === t)) ||
        t in e
      );
    },
  };
  function Jx(e) {
    Wx = e(Wx);
  }
  function Qx(e) {
    return (
      Hx ||
      (Hx = [
        IDBCursor.prototype.advance,
        IDBCursor.prototype.continue,
        IDBCursor.prototype.continuePrimaryKey,
      ])
    ).includes(e)
      ? function (...t) {
          return e.apply(Xx(this), t), Kx(this.request);
        }
      : function (...t) {
          return Kx(e.apply(Xx(this), t));
        };
  }
  function Yx(e) {
    return "function" == typeof e
      ? Qx(e)
      : (e instanceof IDBTransaction &&
          (function (e) {
            if (zx.has(e)) return;
            const t = new Promise((t, n) => {
              const r = () => {
                  e.removeEventListener("complete", o),
                    e.removeEventListener("error", i),
                    e.removeEventListener("abort", i);
                },
                o = () => {
                  t(), r();
                },
                i = () => {
                  n(e.error || new DOMException("AbortError", "AbortError")),
                    r();
                };
              e.addEventListener("complete", o),
                e.addEventListener("error", i),
                e.addEventListener("abort", i);
            });
            zx.set(e, t);
          })(e),
        $x(
          e,
          Vx ||
            (Vx = [
              IDBDatabase,
              IDBObjectStore,
              IDBIndex,
              IDBCursor,
              IDBTransaction,
            ])
        )
          ? new Proxy(e, Wx)
          : e);
  }
  function Kx(e) {
    if (e instanceof IDBRequest)
      return (function (e) {
        const t = new Promise((t, n) => {
          const r = () => {
              e.removeEventListener("success", o),
                e.removeEventListener("error", i);
            },
            o = () => {
              t(Kx(e.result)), r();
            },
            i = () => {
              n(e.error), r();
            };
          e.addEventListener("success", o), e.addEventListener("error", i);
        });
        return Gx.set(t, e), t;
      })(e);
    if (qx.has(e)) return qx.get(e);
    const t = Yx(e);
    return t !== e && (qx.set(e, t), Gx.set(t, e)), t;
  }
  const Xx = (e) => Gx.get(e);
  const Zx = ["get", "getKey", "getAll", "getAllKeys", "count"],
    eS = ["put", "add", "delete", "clear"],
    tS = new Map();
  function nS(e, t) {
    if (!(e instanceof IDBDatabase) || t in e || "string" != typeof t) return;
    if (tS.get(t)) return tS.get(t);
    const n = t.replace(/FromIndex$/, ""),
      r = t !== n,
      o = eS.includes(n);
    if (
      !(n in (r ? IDBIndex : IDBObjectStore).prototype) ||
      (!o && !Zx.includes(n))
    )
      return;
    const i = async function (e, ...t) {
      const i = this.transaction(e, o ? "readwrite" : "readonly");
      let a = i.store;
      return (
        r && (a = a.index(t.shift())),
        (await Promise.all([a[n](...t), o && i.done]))[0]
      );
    };
    return tS.set(t, i), i;
  }
  Jx((e) => ({
    ...e,
    get: (t, n, r) => nS(t, n) || e.get(t, n, r),
    has: (t, n) => !!nS(t, n) || e.has(t, n),
  }));
  const rS = ["continue", "continuePrimaryKey", "advance"],
    oS = {},
    iS = new WeakMap(),
    aS = new WeakMap(),
    sS = {
      get: function (e, t) {
        if (!rS.includes(t)) return e[t];
        let n = oS[t];
        return (
          n ||
            (n = oS[t] =
              function (...e) {
                iS.set(this, aS.get(this)[t](...e));
              }),
          n
        );
      },
    };
  async function* lS(...e) {
    let t = this;
    if ((t instanceof IDBCursor || (t = await t.openCursor(...e)), !t)) return;
    t = t;
    const n = new Proxy(t, sS);
    for (aS.set(n, t), Gx.set(n, Xx(t)); t; )
      yield n, (t = await (iS.get(n) || t.continue())), iS.delete(n);
  }
  function uS(e, t) {
    return (
      (t === Symbol.asyncIterator &&
        $x(e, [IDBIndex, IDBObjectStore, IDBCursor])) ||
      ("iterate" === t && $x(e, [IDBIndex, IDBObjectStore]))
    );
  }
  Jx((e) => ({
    ...e,
    get: function (t, n, r) {
      return uS(t, n) ? lS : e.get(t, n, r);
    },
    has: function (t, n) {
      return uS(t, n) || e.has(t, n);
    },
  }));
  const { $idb: cS } = app;
  cS.Database = class {
    constructor(e, t) {
      (this._db = null),
        (this._name = e),
        (this._version = t),
        (this._changeHandlers = []);
    }
    async init() {
      this._db = await (function (
        e,
        t,
        { blocked: n, upgrade: r, blocking: o, terminated: i } = {}
      ) {
        const a = indexedDB.open(e, t),
          s = Kx(a);
        return (
          r &&
            a.addEventListener("upgradeneeded", (e) => {
              r(Kx(a.result), e.oldVersion, e.newVersion, Kx(a.transaction), e);
            }),
          n &&
            a.addEventListener("blocked", (e) =>
              n(e.oldVersion, e.newVersion, e)
            ),
          s
            .then((e) => {
              i && e.addEventListener("close", () => i()),
                o &&
                  e.addEventListener("versionchange", (e) =>
                    o(e.oldVersion, e.newVersion, e)
                  );
            })
            .catch(() => {}),
          s
        );
      })(this._name, this._version, {
        upgrade: function (e) {
          e.objectStoreNames.contains("data") ||
            e.createObjectStore("data", { keyPath: "id" });
        },
      });
    }
    async get(e) {
      const t = await this._db.get("data", e);
      return null == t ? void 0 : t.value;
    }
    async set(e, t) {
      await this._db.put("data", { id: e, value: t }),
        this._emitChange({ type: "set", key: e, value: t });
    }
    async keys() {
      return await this._db.getAllKeys("data");
    }
    async clear() {
      await this._db.clear("data"), this._emitChange({ type: "clear" });
    }
    async remove(e) {
      await this._db.delete("data", e),
        this._emitChange({ type: "remove", key: e });
    }
    onChange(e) {
      this._changeHandlers.push(e);
    }
    _emitChange(...e) {
      this._changeHandlers.forEach((t) => t(...e));
    }
  };
  const { $backup: dS, $idb: fS, $bus: pS, $utils: hS, $env: gS } = app;
  dS.controller = {
    init: async function () {},
    _restoreOrSave: async function () {
      !(await fS.get("state"))
        ? await this._restore()
        : this._saveAll().then(() => {});
    },
    _restore: async function () {
      if (!navigator.onLine) return void dS.log("offline, skipping restore");
      const e = Date.now();
      dS.log("restoring...");
      const t = await this._send("read");
      if (!t) return void dS.log("no backup found");
      for (const e in t) "backup" !== e && (await fS.set(e, t[e]));
      const n = Date.now() - e;
      dS.log(`restored in ${n}ms`);
    },
    _saveAll: async function () {
      dS.log("saving...");
      const e = {},
        t = await fS.keys();
      for (const n of t) e[n] = await fS.get(n);
      await this._send("save", e), dS.log("saved");
    },
    _broadcastChanges: function () {
      const e = {},
        t = {},
        n = {};
      fS.onChange((r) => {
        const o = r.key;
        (n[o] = async () => {
          delete n[o],
            await this._send("change", r),
            this._debug &&
              ("clear" === r.type
                ? dS.log(r.type)
                : dS.log(`${r.type} "${o}"`));
        }),
          clearTimeout(e[o]),
          (e[o] = setTimeout(() => {
            clearTimeout(t[o]), delete t[o], n[o]();
          }, this._debounceDelay)),
          t[o] ||
            (t[o] = setTimeout(() => {
              clearTimeout(e[o]), delete t[o], n[o]();
            }, this._throttleDelay));
      });
    },
    _periodicallyDropIframe: function () {
      const e = 24 * hS.time.HOUR;
      hS.createAlarm("backup.dropIframe", { period: e }, () => {
        if (!this._iframePromise) return;
        this._iframePromise = null;
        const e = document.querySelector("iframe[backup]");
        e && e.remove();
      });
    },
    _send: async function (e, ...t) {
      const n = await this._ensureIframe();
      if (!n) return;
      const r = this._generateId();
      n.contentWindow.postMessage(
        { $backup: !0, reqId: r, name: e, args: t },
        "*"
      );
      return await new Promise((e) => {
        const t = (n) => {
          const o = n.data;
          !(!o || !o.$backup || o.resId !== r) &&
            (window.removeEventListener("message", t), e(o.result));
        };
        window.addEventListener("message", t);
      });
    },
    _ensureIframe: async function () {
      if (this._iframePromise) return this._iframePromise;
      this._iframePromise = hS.createResolvablePromise();
      const e = hS.createResolvablePromise();
      pS.on("backup.ready", () => e.resolve());
      const t = document.createElement("iframe");
      (t.src = gS.backup.url),
        t.setAttribute("backup", ""),
        document.body.appendChild(t);
      const n = await Promise.any([
        e.then(() => !0),
        hS.sleep(5 * hS.time.SECOND).then(() => !1),
      ]);
      return (
        pS.off("backup.ready"),
        n
          ? this._iframePromise.resolve(t)
          : (console.error("failed to init iframe"),
            this._iframePromise.resolve(null)),
        this._iframePromise
      );
    },
    _generateId: function () {
      return `${Date.now()}_${Math.random().toString(36).slice(2)}`;
    },
  };
  var mS = {
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
  const { $env: vS } = app;
  var bS = {
    init: function () {
      (globalThis.log = vS.features.log
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
  function yS(e) {
    return e && e.__esModule ? e : { default: e };
  }
  var wS = {},
    _S = {
      update: function (e) {
        if (!e.userStates) return e;
        const t = { ...e, tagAssist: { ...e.tagAssist, relevantTags: [] } };
        return delete t.tagAssist.foundTags, t;
      },
    };
  r(wS, "default", function () {
    return _S;
  }),
    n(wS);
  var xS = {};
  const { $idb: SS } = app;
  var PS = {
    update: function (e) {
      return e.userStates && SS.remove("tag-assist.tag-data"), e;
    },
  };
  r(xS, "default", function () {
    return PS;
  }),
    n(xS);
  var kS = {},
    DS = {
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
  r(kS, "default", function () {
    return DS;
  }),
    n(kS);
  var IS = {},
    ES = {
      update: function (e) {
        return e.userStates
          ? { ...e, tagAssist: { ...e.tagAssist, ladder: null } }
          : e;
      },
    };
  r(IS, "default", function () {
    return ES;
  }),
    n(IS);
  var TS = {};
  const { $idb: CS } = app;
  var FS = {
    update: function (e) {
      return e.userStates && CS.remove("tag-assist.tag-data"), e;
    },
  };
  r(TS, "default", function () {
    return FS;
  }),
    n(TS);
  var AS = {},
    OS = {
      update: function (e) {
        return e.userStates
          ? { ...e, tagAssist: { ...e.tagAssist, selectedTabId: "search" } }
          : e;
      },
    };
  r(AS, "default", function () {
    return OS;
  }),
    n(AS);
  var MS = {},
    RS = {
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
  r(MS, "default", function () {
    return RS;
  }),
    n(MS);
  var US = {},
    NS = {
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
  r(US, "default", function () {
    return NS;
  }),
    n(US);
  var jS = {},
    LS = {
      update: function (e) {
        return e.userStates
          ? { ...e, tagAssist: { ...e.tagAssist, engagementSort: null } }
          : e;
      },
    };
  r(jS, "default", function () {
    return LS;
  }),
    n(jS);
  var BS = {},
    $S = {
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
  r(BS, "default", function () {
    return $S;
  }),
    n(BS);
  var VS = {},
    HS = {
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
  r(VS, "default", function () {
    return HS;
  }),
    n(VS);
  var zS = {},
    qS = {
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
  r(zS, "default", function () {
    return qS;
  }),
    n(zS);
  var GS = {},
    WS = {
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
  r(GS, "default", function () {
    return WS;
  }),
    n(GS);
  var JS = {},
    QS = {
      update: function (e) {
        return { ...e, reels: { supported: !1 } };
      },
    };
  r(JS, "default", function () {
    return QS;
  }),
    n(JS);
  var YS = {},
    KS = {
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
  r(YS, "default", function () {
    return KS;
  }),
    n(YS);
  var XS = {},
    ZS = {
      update: function (e) {
        return { ...e, reels: { ...e.reels, creating: !1 } };
      },
    };
  r(XS, "default", function () {
    return ZS;
  }),
    n(XS);
  var eP = {},
    tP = {
      update: function (e) {
        return { ...e, authStatus: { ...e.authStatus, isMobileSession: !1 } };
      },
    };
  r(eP, "default", function () {
    return tP;
  }),
    n(eP);
  var nP = {},
    rP = {
      update: function (e) {
        return e.userStates
          ? { ...e, billing: { ...e.billing, recentFeature: null } }
          : e;
      },
    };
  r(nP, "default", function () {
    return rP;
  }),
    n(nP);
  var oP = {},
    iP = {
      update: function (e) {
        const t = { ...e, schedule: { ...e.schedule, loading: !1 } };
        return delete t.schedule.isRefreshingGrid, t;
      },
    };
  r(oP, "default", function () {
    return iP;
  }),
    n(oP);
  var aP = {},
    sP = {
      update: function (e) {
        const t = {
          ...e,
          schedule: { ...e.schedule, navigation: { ...e.schedule.navigation } },
        };
        return delete t.schedule.navigation.fcsTitle, t;
      },
    };
  r(aP, "default", function () {
    return sP;
  }),
    n(aP);
  var lP = {},
    uP = {
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
  r(lP, "default", function () {
    return uP;
  }),
    n(lP);
  var cP = {},
    dP = {
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
  r(cP, "default", function () {
    return dP;
  }),
    n(cP);
  var fP = {},
    pP = {
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
  r(fP, "default", function () {
    return pP;
  }),
    n(fP);
  var hP = {},
    gP = {
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
  r(hP, "default", function () {
    return gP;
  }),
    n(hP);
  var mP = {},
    vP = {
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
  r(mP, "default", function () {
    return vP;
  }),
    n(mP);
  var bP = {},
    yP = {
      update: function (e) {
        return { ...e, schedule: { ...e.schedule, showTagAssist: !1 } };
      },
    };
  r(bP, "default", function () {
    return yP;
  }),
    n(bP);
  var wP = {},
    _P = {
      update: function (e) {
        const t = { ...e, reels: { ...e.reels } };
        return delete t.reels.supported, t;
      },
    };
  r(wP, "default", function () {
    return _P;
  }),
    n(wP);
  var xP = {},
    SP = {
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
  r(xP, "default", function () {
    return SP;
  }),
    n(xP);
  var PP = {},
    kP = {
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
  r(PP, "default", function () {
    return kP;
  }),
    n(PP);
  var DP = {},
    IP = {
      update: function (e) {
        return e.userStats
          ? { ...e, tagAssist: { ...e.tagAssist, lastTagScanOn: null } }
          : e;
      },
    };
  r(DP, "default", function () {
    return IP;
  }),
    n(DP);
  var EP = {},
    TP = {
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
  r(EP, "default", function () {
    return TP;
  }),
    n(EP);
  var CP = {},
    FP = {
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
  r(CP, "default", function () {
    return FP;
  }),
    n(CP);
  var AP = {},
    OP = {
      update: function (e) {
        const t = { ...e, schedule: { ...e.schedule, addCardAttention: !1 } };
        return delete t.schedule.gridAddCardAttention, t;
      },
    };
  r(AP, "default", function () {
    return OP;
  }),
    n(AP);
  var MP = {},
    RP = {
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
  r(MP, "default", function () {
    return RP;
  }),
    n(MP);
  var UP = {},
    NP = {
      update: function (e) {
        return { ...e, bulk: { saving: !1, selectedPostIds: [], actions: {} } };
      },
    };
  r(UP, "default", function () {
    return NP;
  }),
    n(UP);
  var jP = {},
    LP = {
      update: function (e) {
        return { ...e, bulk: { ...e.bulk, activeActionId: null } };
      },
    };
  r(jP, "default", function () {
    return LP;
  }),
    n(jP);
  var BP = {},
    $P = {
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
  r(BP, "default", function () {
    return $P;
  }),
    n(BP);
  var VP = {},
    HP = {
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
  r(VP, "default", function () {
    return HP;
  }),
    n(VP);
  var zP = {},
    qP = {
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
  r(zP, "default", function () {
    return qP;
  }),
    n(zP);
  var GP = {},
    WP = {
      update: function (e) {
        return { ...e, schedule: { ...e.schedule, isDraggingPost: !1 } };
      },
    };
  r(GP, "default", function () {
    return WP;
  }),
    n(GP);
  var JP = {},
    QP = {
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
  r(JP, "default", function () {
    return QP;
  }),
    n(JP);
  var YP = {},
    KP = {
      update: function (e) {
        const t = { ...e, schedule: { ...e.schedule } };
        return (
          delete t.schedule.hasUncommitedChanges, delete t.schedule.tasks, t
        );
      },
    };
  r(YP, "default", function () {
    return KP;
  }),
    n(YP);
  var XP = {},
    ZP = {
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
  r(XP, "default", function () {
    return ZP;
  }),
    n(XP);
  var ek = {},
    tk = {
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
  r(ek, "default", function () {
    return tk;
  }),
    n(ek);
  var nk = {},
    rk = {
      update: function (e) {
        const t = { ...e, dm: { ...e.dm } };
        return delete t.dm.supported, t;
      },
    };
  r(nk, "default", function () {
    return rk;
  }),
    n(nk);
  var ok = {},
    ik = {
      update: function (e) {
        return { ...e, dm: { ...e.dm, ghostModeEnabled: !0 } };
      },
    };
  r(ok, "default", function () {
    return ik;
  }),
    n(ok);
  var ak = {};
  const { $idb: sk } = app;
  var lk = {
    update: function (e) {
      const t = { ...e };
      return (
        delete t.analytics,
        delete t.insights,
        (async function () {
          const e = await sk.keys();
          for (const t of e)
            (t.startsWith("insights.") || t.startsWith("block:analytics:")) &&
              sk.remove(t);
        })(),
        t
      );
    },
  };
  r(ak, "default", function () {
    return lk;
  }),
    n(ak);
  var uk = {},
    ck = {
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
  r(uk, "default", function () {
    return ck;
  }),
    n(uk);
  var dk = {},
    fk = {
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
  r(dk, "default", function () {
    return fk;
  }),
    n(dk);
  var pk = {},
    hk = {
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
  r(pk, "default", function () {
    return hk;
  }),
    n(pk);
  var gk = {},
    mk = {
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
  r(gk, "default", function () {
    return mk;
  }),
    n(gk);
  var vk = {},
    bk = {
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
  r(vk, "default", function () {
    return bk;
  }),
    n(vk);
  var yk = {},
    wk = {
      update: function (e) {
        if (!e.userStates) return e;
        return { ...e, quickReplies: { shown: !1, content: my(), total: 7 } };
      },
    };
  r(yk, "default", function () {
    return wk;
  }),
    n(yk);
  var _k = {},
    xk = {
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
  r(_k, "default", function () {
    return xk;
  }),
    n(_k);
  var Sk = {},
    Pk = {
      update: function (e) {
        const t = { ...e };
        return delete t.igtvUpload, t;
      },
    };
  r(Sk, "default", function () {
    return Pk;
  }),
    n(Sk);
  var kk = {},
    Dk = {
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
  r(kk, "default", function () {
    return Dk;
  }),
    n(kk);
  var Ik = {},
    Ek = {
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
  r(Ik, "default", function () {
    return Ek;
  }),
    n(Ik);
  var Tk = {},
    Ck = {
      update: function (e) {
        return {
          ...e,
          musicAssist: { ...e.musicAssist, showUpsellOverlay: !1 },
        };
      },
    };
  r(Tk, "default", function () {
    return Ck;
  }),
    n(Tk);
  var Fk = {},
    Ak = {
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
  r(Fk, "default", function () {
    return Ak;
  }),
    n(Fk);
  var Ok = {},
    Mk = {
      update: function (e) {
        return { ...e, musicAssist: { ...e.musicAssist, isStory: !1 } };
      },
    };
  r(Ok, "default", function () {
    return Mk;
  }),
    n(Ok);
  var Rk = {},
    Uk = {
      update: function (e) {
        if (!e.userStates) return e;
        const t = {
          ...e.billing.trial,
          reels: 0,
          coverAssist: 0,
          musicAssist: 0,
        };
        return (
          Bg.trialController.setTrialCookie(t),
          { ...e, billing: { ...e.billing, trial: t } }
        );
      },
    };
  r(Rk, "default", function () {
    return Uk;
  }),
    n(Rk);
  var Nk = {},
    jk = {
      update: function (e) {
        return {
          ...e,
          musicAssist: { ...e.musicAssist, videoVolume: 0, musicVolume: 0.5 },
        };
      },
    };
  r(Nk, "default", function () {
    return jk;
  }),
    n(Nk);
  var Lk = {},
    Bk = {
      update: function (e) {
        return { ...e, musicAssist: { ...e.musicAssist, videoCurrentTime: 0 } };
      },
    };
  r(Lk, "default", function () {
    return Bk;
  }),
    n(Lk);
  var $k = {},
    Vk = {
      update: function (e) {
        if (!e.userStates) return e;
        const t = {
          ...e.billing.trial,
          reels: Math.max(0, e.billing.trial.reels - 3),
          musicAssist: Math.max(0, e.billing.trial.musicAssist - 3),
        };
        return (
          Bg.trialController.setTrialCookie(t),
          { ...e, billing: { ...e.billing, trial: t } }
        );
      },
    };
  r($k, "default", function () {
    return Vk;
  }),
    n($k);
  var Hk = {},
    zk = {
      update: function (e) {
        if (!e.userStates) return e;
        const t = { ...e.billing.trial, schedule: 0 };
        return (
          Bg.trialController.setTrialCookie(t),
          { ...e, billing: { ...e.billing, trial: t } }
        );
      },
    };
  r(Hk, "default", function () {
    return zk;
  }),
    n(Hk);
  var qk = {},
    Gk = {
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
  r(qk, "default", function () {
    return Gk;
  }),
    n(qk);
  var Wk = {},
    Jk = {
      update: function (e) {
        return {
          ...e,
          storyAssist: { ...e.storyAssist, showUpsellOverlay: !1 },
        };
      },
    };
  r(Wk, "default", function () {
    return Jk;
  }),
    n(Wk);
  var Qk = {},
    Yk = {
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
  r(Qk, "default", function () {
    return Yk;
  }),
    n(Qk);
  var Kk = {},
    Xk = {
      update: function (e) {
        return {
          ...e,
          storyAssist: { ...e.storyAssist, selectedTabId: "music" },
        };
      },
    };
  r(Kk, "default", function () {
    return Xk;
  }),
    n(Kk);
  var Zk = {},
    eD = {
      update: function (e) {
        return { ...e, storyAssist: { ...e.storyAssist, coverUrl: null } };
      },
    };
  r(Zk, "default", function () {
    return eD;
  }),
    n(Zk);
  var tD = {},
    nD = {
      update: function (e) {
        return { ...e, ghostStoryView: { enabled: !1 } };
      },
    };
  r(tD, "default", function () {
    return nD;
  }),
    n(tD);
  var rD = {},
    oD = {
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
  r(rD, "default", function () {
    return oD;
  }),
    n(rD);
  var iD = {},
    aD = {
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
  r(iD, "default", function () {
    return aD;
  }),
    n(iD);
  var sD = {},
    lD = {
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
  r(sD, "default", function () {
    return lD;
  }),
    n(sD);
  var uD = {};
  const { $idb: cD } = app;
  var dD = {
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
          n = gx.decompressFromUTF16(t),
          r = btoa(encodeURIComponent(n));
        await cD.set("state", r),
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
  r(uD, "default", function () {
    return dD;
  }),
    n(uD);
  var fD = {},
    pD = {
      update: function (e) {
        const t = { ...e, authStatus: { ...e.authStatus } };
        return delete t.authStatus.isMobileSession, t;
      },
    };
  r(fD, "default", function () {
    return pD;
  }),
    n(fD);
  var hD = {},
    gD = {
      update: function (e) {
        if (!e.userStates) return e;
        const t = { ...e };
        return delete t.desktopPlatform, t;
      },
    };
  r(hD, "default", function () {
    return gD;
  }),
    n(hD);
  var mD = {},
    vD = {
      update: function (e) {
        return e.userStates
          ? { ...e, abTesting: { hash: Math.random(), wideScreenState: null } }
          : e;
      },
    };
  r(mD, "default", function () {
    return vD;
  }),
    n(mD);
  var bD = {},
    yD = {
      update: function (e) {
        return e.userStates
          ? { ...e, abTesting: { ...e.abTesting, wideScreenState: null } }
          : e;
      },
    };
  r(bD, "default", function () {
    return yD;
  }),
    n(bD);
  var wD = {},
    _D = {
      update: function (e) {
        return { ...e, later: { showAssistPanel: !1 } };
      },
    };
  r(wD, "default", function () {
    return _D;
  }),
    n(wD);
  var xD = {},
    SD = {
      update: function (e) {
        return {
          ...e,
          authStatus: {
            ...e.authStatus,
            cookies: { ...e.authStatus.cookies, ig: [] },
          },
        };
      },
    };
  r(xD, "default", function () {
    return SD;
  }),
    n(xD);
  var PD = {},
    kD = {
      update: function (e) {
        return { ...e, later: { ...e.later, posts: [] } };
      },
    };
  r(PD, "default", function () {
    return kD;
  }),
    n(PD);
  var DD = {},
    ID = {
      update: function (e) {
        return { ...e, storyAssist: { ...e.storyAssist, isVideo: !1 } };
      },
    };
  r(DD, "default", function () {
    return ID;
  }),
    n(DD);
  var ED = {},
    TD = {
      update: function (e) {
        return { ...e, later: { ...e.later, editPostId: null } };
      },
    };
  r(ED, "default", function () {
    return TD;
  }),
    n(ED);
  var CD = {},
    FD = {
      update: function (e) {
        return { ...e, later: { ...e.later, cookies: null } };
      },
    };
  r(CD, "default", function () {
    return FD;
  }),
    n(CD);
  var AD = {},
    OD = {
      update: function (e) {
        return { ...e, later: { ...e.later, date: null } };
      },
    };
  r(AD, "default", function () {
    return OD;
  }),
    n(AD);
  var MD = {},
    RD = {
      update: function (e) {
        return { ...e, later: { ...e.later, userId: null } };
      },
    };
  r(MD, "default", function () {
    return RD;
  }),
    n(MD);
  var UD = {},
    ND = {
      update: function (e) {
        return { ...e, later: { ...e.later, selectedPill: null } };
      },
    };
  r(UD, "default", function () {
    return ND;
  }),
    n(UD);
  var jD = {},
    LD = {
      update: function (e) {
        const t = {
          ...e,
          later: {
            ...e.later,
            showBodyPanel: !1,
            selectedUserId: e.later.userId || e.authStatus.userId,
            selectedPostId: e.later.editPostId,
            selectedPillId: e.later.selectedPill,
          },
        };
        return (
          delete t.later.userId,
          delete t.later.editPostId,
          delete t.later.selectedPill,
          t
        );
      },
    };
  r(jD, "default", function () {
    return LD;
  }),
    n(jD);
  var BD = {},
    $D = {
      update: function (e) {
        const t = {
          ...e,
          later: {
            ...e.later,
            posts: e.later.posts.map((e) => ({
              ...e,
              previewColor: e.previewAvgColor,
            })),
          },
        };
        return t.later.posts.forEach((e) => delete e.previewAvgColor), t;
      },
    };
  r(BD, "default", function () {
    return $D;
  }),
    n(BD);
  var VD = {},
    HD = {
      update: function (e) {
        return {
          ...e,
          later: {
            ...e.later,
            posts: e.later.posts.map((e) => {
              const [t, n] = {
                "story-photo": ["story", !1],
                "story-video": ["story", !0],
                photo: ["post", !1],
                video: ["post", !0],
                reel: ["reel", !0],
              }[e.type];
              return { ...e, type: t, isVideo: n, changes: {} };
            }),
          },
        };
      },
    };
  r(VD, "default", function () {
    return HD;
  }),
    n(VD);
  var zD = {},
    qD = {
      update: function (e) {
        return {
          ...e,
          later: {
            ...e.later,
            posts: e.later.posts.map((e) => {
              const t = { ...e };
              return delete t.changes, t;
            }),
          },
        };
      },
    };
  r(zD, "default", function () {
    return qD;
  }),
    n(zD);
  var GD = {},
    WD = {
      update: function (e) {
        return {
          ...e,
          later: { ...e.later, timeSlots: [...e.schedule.timeSlots] },
        };
      },
    };
  r(GD, "default", function () {
    return WD;
  }),
    n(GD);
  var JD = {};
  const { $utils: QD } = app;
  var YD = {
    update: function (e) {
      return e.userStates
        ? { ...e, settings: { laterAutoRetry: 12 * QD.time.HOUR } }
        : e;
    },
  };
  r(JD, "default", function () {
    return YD;
  }),
    n(JD);
  var KD = {},
    XD = {
      update: function (e) {
        return { ...e, later: { ...e.later, errors: [] } };
      },
    };
  r(KD, "default", function () {
    return XD;
  }),
    n(KD);
  var ZD = {};
  const { $utils: eI, $idb: tI } = app;
  var nI = {
    update: async function (e) {
      const t = {
        ...e,
        later: { ...e.later, posts: e.later.posts.map((e) => ({ ...e })) },
      };
      for (const e of t.later.posts) {
        if (!e.isVideo) continue;
        let t, n;
        try {
          t = await tI.get(`later.post-${e.id}`);
        } catch (e) {
          console.error(e);
          continue;
        }
        try {
          n = await eI.loadVideoMetadata(t.blob);
        } catch (e) {
          console.error(e);
          continue;
        }
        e.duration = n.duration;
      }
      return t;
    },
  };
  r(ZD, "default", function () {
    return nI;
  }),
    n(ZD);
  var rI = {},
    oI = {
      update: function (e) {
        return { ...e, later: { ...e.later, lastDate: null } };
      },
    };
  r(rI, "default", function () {
    return oI;
  }),
    n(rI);
  var iI = {},
    aI = {
      update: function (e) {
        return {
          ...e,
          later: {
            ...e.later,
            posts: e.later.posts.map((e) => {
              let t;
              t =
                "failed" !== e.status || e.errorMessage
                  ? e.errorMessage
                  : "Chrome was offline at the given time";
              const n = { ...e };
              return t && (n.error = { message: t }), delete n.errorMessage, n;
            }),
          },
        };
      },
    };
  r(iI, "default", function () {
    return aI;
  }),
    n(iI);
  var sI = {},
    lI = {
      update: function (e) {
        return { ...e, later: { ...e.later, processing: !1 } };
      },
    };
  r(sI, "default", function () {
    return lI;
  }),
    n(sI);
  var uI = {};
  const { $files: cI, $idb: dI } = app;
  var fI = {
    update: async function (e) {
      const t = {
        ...e,
        later: { ...e.later, posts: e.later.posts.map((e) => ({ ...e })) },
      };
      for (const e of t.later.posts) {
        let t, n, r, o;
        try {
          t = await dI.get(`later.post-${e.id}`);
        } catch (e) {
          console.error(e);
        }
        if (t) {
          if (t.blob)
            try {
              n = await cI.controller.save(t.blob, "later");
            } catch (e) {
              console.error(e);
            }
          if (t.previewBlob)
            try {
              r = await cI.controller.save(t.previewBlob, "later");
            } catch (e) {
              console.error(e);
            }
          if (t.coverBlob)
            try {
              o = await cI.controller.save(t.coverBlob, "later");
            } catch (e) {
              console.error(e);
            }
          try {
            await dI.remove(`later.post-${e.id}`);
          } catch (e) {
            console.error(e);
          }
          delete e.previewUrl,
            (e.files = [
              {
                fileId: n || null,
                previewId: r || null,
                ...(o && { coverId: o }),
              },
            ]);
        } else e.files = [];
      }
      return t;
    },
  };
  r(uI, "default", function () {
    return fI;
  }),
    n(uI);
  var pI = {},
    hI = {
      update: function (e) {
        return {
          ...e,
          later: {
            ...e.later,
            posts: e.later.posts.map((e) => {
              const t = {
                ...e,
                files:
                  e.files.length > 0
                    ? [{ ...e.files[0], duration: e.duration }]
                    : [],
              };
              return delete t.isVideo, delete t.duration, t;
            }),
          },
        };
      },
    };
  r(pI, "default", function () {
    return hI;
  }),
    n(pI);
  var gI = {},
    mI = {
      update: function (e) {
        return {
          ...e,
          later: {
            ...e.later,
            posts: e.later.posts.map((e) => {
              const t = {
                ...e,
                mediaList: e.files.map((e) => ({ ...e, isVideo: !!e.coverId })),
              };
              return delete t.files, t;
            }),
          },
        };
      },
    };
  r(gI, "default", function () {
    return mI;
  }),
    n(gI);
  var vI = {},
    bI = {
      update: function (e) {
        return {
          ...e,
          later: {
            ...e.later,
            posts: e.later.posts.map((e) => {
              const t = {
                ...e,
                mediaList: [{ ...e.mediaList[0], color: e.previewColor }],
              };
              return delete t.previewColor, t;
            }),
          },
        };
      },
    };
  r(vI, "default", function () {
    return bI;
  }),
    n(vI);
  var yI = {};
  const { $files: wI, $utils: _I } = app;
  var xI = {
    update: async function (e) {
      const t = {
        ...e,
        later: {
          ...e.later,
          posts: e.later.posts.map((e) => ({
            ...e,
            mediaList: e.mediaList.map((e) => ({ ...e })),
          })),
        },
      };
      for (const e of t.later.posts)
        for (const t of e.mediaList)
          try {
            if (!t.isVideo) continue;
            const e = await wI.controller.read(t.fileId);
            if (!e) continue;
            const n = await _I.loadVideoMetadata(e);
            t.duration = n.duration;
          } catch (e) {
            console.error(e);
          }
      return t;
    },
  };
  r(yI, "default", function () {
    return xI;
  }),
    n(yI);
  var SI = {},
    PI = {
      update: function (e) {
        return {
          ...e,
          later: {
            ...e.later,
            posts: e.later.posts.map((e) => ({
              ...e,
              mediaList: e.mediaList.filter(Boolean),
            })),
          },
        };
      },
    };
  r(SI, "default", function () {
    return PI;
  }),
    n(SI);
  var kI = {},
    DI = {
      update: function (e) {
        if (e.later.cookies) return e;
        const t = {};
        for (const n of e.authStatus.cookies.ig) t[n.name] = n.value;
        return { ...e, later: { ...e.later, cookies: t } };
      },
    };
  r(kI, "default", function () {
    return DI;
  }),
    n(kI);
  var II = {},
    EI = {
      update: function (e) {
        return {
          ...e,
          later: {
            ...e.later,
            posts: e.later.posts.map((e) => ({
              ...e,
              caption: e.caption || "",
            })),
          },
        };
      },
    };
  r(II, "default", function () {
    return EI;
  }),
    n(II);
  var TI = {},
    CI = {
      update: function (e) {
        return e.userStates
          ? {
              ...e,
              billing: {
                ...e.billing,
                trial: { ...e.billing.trial, later: 0 },
              },
            }
          : e;
      },
    };
  r(TI, "default", function () {
    return CI;
  }),
    n(TI);
  var FI = {},
    AI = {
      update: function (e) {
        return { ...e, later: { ...e.later, showUpsell: !1 } };
      },
    };
  r(FI, "default", function () {
    return AI;
  }),
    n(FI);
  var OI = {},
    MI = {
      update: function (e) {
        return { ...e, inspiration: { posts: [] } };
      },
    };
  r(OI, "default", function () {
    return MI;
  }),
    n(OI);
  var RI = {},
    UI = {
      update: function (e) {
        return { ...e, inspiration: { ...e.inspiration, prefilled: !1 } };
      },
    };
  r(RI, "default", function () {
    return UI;
  }),
    n(RI);
  var NI = {},
    jI = {
      update: function (e) {
        const t = { ...e };
        return delete t.schedule, t;
      },
    };
  r(NI, "default", function () {
    return jI;
  }),
    n(NI);
  var LI = {},
    BI = {
      update: function (e) {
        if (!e.userStates) return e;
        const t = { ...e };
        return delete t.zen, t;
      },
    };
  r(LI, "default", function () {
    return BI;
  }),
    n(LI);
  var $I = {},
    VI = {
      update: function (e) {
        const t = { ...e, authStatus: { ...e.authStatus } };
        return delete t.authStatus.isConnected, t;
      },
    };
  r($I, "default", function () {
    return VI;
  }),
    n($I);
  var HI = {};
  const { $utils: zI } = app;
  var qI = {
    update: function (e) {
      return e.userStates
        ? {
            ...e,
            settings: {
              ...e.settings,
              laterAutoRetry:
                e.settings.laterAutoRetry === 12 * zI.time.HOUR
                  ? -1
                  : e.settings.laterAutoRetry,
            },
          }
        : e;
    },
  };
  r(HI, "default", function () {
    return qI;
  }),
    n(HI);
  var GI = {},
    WI = {
      update: function (e) {
        return {
          ...e,
          later: {
            ...e.later,
            calendar: { periodType: "month", periodStart: Date.now() },
          },
        };
      },
    };
  r(GI, "default", function () {
    return WI;
  }),
    n(GI);
  var JI = {},
    QI = {
      update: function (e) {
        return {
          ...e,
          later: {
            ...e.later,
            calendar: { ...e.later.calendar, showSlots: !0 },
          },
        };
      },
    };
  r(JI, "default", function () {
    return QI;
  }),
    n(JI);
  var YI = {},
    KI = {
      update: function (e) {
        return {
          ...e,
          later: {
            ...e.later,
            timeSlots: [...e.later.timeSlots].sort((e, t) => e.time - t.time),
          },
        };
      },
    };
  r(YI, "default", function () {
    return KI;
  }),
    n(YI);
  var XI = {};
  const { $utils: ZI } = app;
  var eE = {
    update: function (e) {
      return e.userStates
        ? {
            ...e,
            settings: {
              ...e.settings,
              laterAutoRetry:
                e.settings.laterAutoRetry === 12 * ZI.time.HOUR
                  ? -1
                  : e.settings.laterAutoRetry,
            },
          }
        : e;
    },
  };
  r(XI, "default", function () {
    return eE;
  }),
    n(XI);
  var tE = {},
    nE = {
      update: function (e) {
        return {
          ...e,
          later: {
            ...e.later,
            showGrid: !1,
            ig: { loading: !1, error: null, posts: [] },
          },
        };
      },
    };
  r(tE, "default", function () {
    return nE;
  }),
    n(tE);
  var rE = {},
    oE = {
      update: function (e) {
        return {
          ...e,
          later: { ...e.later, ig: { ...e.later.ig, updatedAt: -1 } },
        };
      },
    };
  r(rE, "default", function () {
    return oE;
  }),
    n(rE);
  var iE = {},
    aE = {
      update: function (e) {
        return {
          ...e,
          later: {
            ...e.later,
            dnd: {
              dragPostId: null,
              dragOverPostId: null,
              dragOverDay: null,
              dragOverTime: null,
            },
          },
        };
      },
    };
  r(iE, "default", function () {
    return aE;
  }),
    n(iE);
  var sE = {},
    lE = {
      update: function (e) {
        const t = { ...e, inspiration: { ...e.inspiration } };
        return delete t.inspiration.prefilled, t;
      },
    };
  r(sE, "default", function () {
    return lE;
  }),
    n(sE);
  var uE = {},
    cE = {
      update: function (e) {
        const t = { ...e, dm: { ...e.dm } };
        return delete t.dm.badgeText, t;
      },
    };
  r(uE, "default", function () {
    return cE;
  }),
    n(uE);
  const dE = {
      "version-130": yS(wS).default,
      "version-131": yS(xS).default,
      "version-132": yS(kS).default,
      "version-133": yS(IS).default,
      "version-134": yS(TS).default,
      "version-135": yS(AS).default,
      "version-136": yS(MS).default,
      "version-137": yS(US).default,
      "version-138": yS(jS).default,
      "version-139": yS(BS).default,
      "version-140": yS(VS).default,
      "version-141": yS(zS).default,
      "version-142": yS(GS).default,
      "version-143": yS(JS).default,
      "version-144": yS(YS).default,
      "version-145": yS(XS).default,
      "version-146": yS(eP).default,
      "version-147": yS(nP).default,
      "version-148": yS(oP).default,
      "version-149": yS(aP).default,
      "version-150": yS(lP).default,
      "version-151": yS(cP).default,
      "version-152": yS(fP).default,
      "version-153": yS(hP).default,
      "version-154": yS(mP).default,
      "version-155": yS(bP).default,
      "version-156": yS(wP).default,
      "version-157": yS(xP).default,
      "version-158": yS(PP).default,
      "version-159": yS(DP).default,
      "version-160": yS(EP).default,
      "version-161": yS(CP).default,
      "version-162": yS(AP).default,
      "version-163": yS(MP).default,
      "version-164": yS(UP).default,
      "version-165": yS(jP).default,
      "version-166": yS(BP).default,
      "version-167": yS(VP).default,
      "version-168": yS(zP).default,
      "version-169": yS(GP).default,
      "version-170": yS(JP).default,
      "version-171": yS(YP).default,
      "version-172": yS(XP).default,
      "version-173": yS(ek).default,
      "version-174": yS(nk).default,
      "version-175": yS(ok).default,
      "version-176": yS(ak).default,
      "version-177": yS(uk).default,
      "version-178": yS(dk).default,
      "version-179": yS(pk).default,
      "version-180": yS(gk).default,
      "version-181": yS(vk).default,
      "version-182": yS(yk).default,
      "version-183": yS(_k).default,
      "version-184": yS(Sk).default,
      "version-185": yS(kk).default,
      "version-186": yS(Ik).default,
      "version-187": yS(Tk).default,
      "version-188": yS(Fk).default,
      "version-189": yS(Ok).default,
      "version-190": yS(Rk).default,
      "version-191": yS(Nk).default,
      "version-192": yS(Lk).default,
      "version-193": yS($k).default,
      "version-194": yS(Hk).default,
      "version-195": yS(qk).default,
      "version-196": yS(Wk).default,
      "version-197": yS(Qk).default,
      "version-198": yS(Kk).default,
      "version-199": yS(Zk).default,
      "version-200": yS(tD).default,
      "version-201": yS(rD).default,
      "version-202": yS(iD).default,
      "version-203": yS(sD).default,
      "version-204": yS(uD).default,
      "version-205": yS(fD).default,
      "version-206": yS(hD).default,
      "version-207": yS(mD).default,
      "version-208": yS(bD).default,
      "version-209": yS(wD).default,
      "version-210": yS(xD).default,
      "version-211": yS(PD).default,
      "version-212": yS(DD).default,
      "version-213": yS(ED).default,
      "version-214": yS(CD).default,
      "version-215": yS(AD).default,
      "version-216": yS(MD).default,
      "version-217": yS(UD).default,
      "version-218": yS(jD).default,
      "version-219": yS(BD).default,
      "version-220": yS(VD).default,
      "version-221": yS(zD).default,
      "version-222": yS(GD).default,
      "version-223": yS(JD).default,
      "version-224": yS(KD).default,
      "version-225": yS(ZD).default,
      "version-226": yS(rI).default,
      "version-227": yS(iI).default,
      "version-228": yS(sI).default,
      "version-229": yS(uI).default,
      "version-230": yS(pI).default,
      "version-231": yS(gI).default,
      "version-232": yS(vI).default,
      "version-233": yS(yI).default,
      "version-234": yS(SI).default,
      "version-235": yS(kI).default,
      "version-236": yS(II).default,
      "version-237": yS(TI).default,
      "version-238": yS(FI).default,
      "version-239": yS(OI).default,
      "version-240": yS(RI).default,
      "version-241": yS(NI).default,
      "version-242": yS(LI).default,
      "version-243": yS($I).default,
      "version-244": yS(HI).default,
      "version-245": yS(GI).default,
      "version-246": yS(JI).default,
      "version-247": yS(YI).default,
      "version-248": yS(XI).default,
      "version-249": yS(tE).default,
      "version-250": yS(rE).default,
      "version-251": yS(iE).default,
      "version-252": yS(sE).default,
      "version-253": yS(uE).default,
    },
    { $state: fE } = app,
    pE = {
      versioners: {},
      init: function () {
        const e = /version-(\d+)/i;
        Object.keys(dE)
          .map((t) => {
            const n = parseInt(t.match(e)[1]);
            return { key: t, version: n };
          })
          .sort((e, t) => e.version - t.version)
          .forEach((e) => {
            this.versioners[e.version] = dE[e.key];
          });
      },
      update: async function (e) {
        let t = e,
          n = t.version || 0;
        const r = gy().version;
        for (; n < r; ) {
          fE.log(`applying v${n + 1}`);
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
  pE.init();
  const hE = function (e) {
      const t = Array.isArray(e.whatsNew) ? e.whatsNew : [];
      let n = !1;
      const r = [
        {
          id: "v25.1.0",
          header: "Carousels Post Later",
          subheader: "v25.1.0",
          hexImage: "hex-schedule",
          content: [
            "Upload or drag & drop multiple files to Post Later to schedule them for posting as a carousel.",
          ],
        },
        {
          id: "v25.0.0",
          header: "Advanced Post Later",
          subheader: "v25.0.0",
          hexImage: "hex-schedule",
          content: [
            "Improved Post Later interface and auto-publishing stability. Manage multiple accounts in Post Later interface seamlessly. Bulk upload files for scheduling.",
          ],
        },
        {
          id: "v24.0.0",
          header: "Post Later",
          subheader: "v24.0.0",
          hexImage: "hex-schedule",
          content: [
            "INSSIST now supports Delayed Posting for Posts, Photo and Video Stories and Reels. Facebook account is not required to schedule posts with delayed posting.",
          ],
        },
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
    { $influx: gE } = app;
  var mE = gE.action("state.setup-default-state", (e) =>
    e.whatsNew ? e : { ...gy(), ...vy() }
  );
  const { $influx: vE } = app;
  var bE = {
    controller: {
      init: async function () {
        mE.dispatch(), await this._update();
      },
      _update: async function () {
        let e = vE.model.state;
        (e = await pE.update(e)),
          (e = hE(e)),
          e !== vE.model.state && dy.dispatch(e);
      },
    },
  };
  const {
    $startup: yE,
    $later: wE,
    $bus: _E,
    $insights: xE,
    $inspiration: SE,
    $cleanup: PE,
    $utils: kE,
    $idb: DE,
    $synch: IE,
    $auth: EE,
    $analytics: TE,
    $abTesting: CE,
    $uninstall: FE,
    $backup: AE,
    $env: OE,
  } = app;
  (yE.controller = {
    init: async function () {
      let e = !1;
      (globalThis._ = Vb),
        mS.controller.init(),
        OE.controller.init(),
        this._handleExtButtonClick(),
        await _E.controller.init(),
        _E.on("bg.is-ready", () => e),
        await this._clearTimerAlarms(),
        bS.init(),
        await DE.controller.init(),
        await Ox.controller.init(),
        jb.controller.init({
          dsn: "https://bea0900834f541bca8157710f7fd31fe@sentry.io/1547551",
        }),
        Nx.controller.init(),
        await $w.controller.init(),
        sx.controller.init(),
        await yy.controller.init(),
        FE.controller.init(),
        await AE.controller.init(),
        await IE.controller.init("background", !0),
        await bE.controller.init(),
        sy.api.init(),
        PE.controller.init(),
        b_.controller.init(),
        y_.controller.init(),
        xE.controller.init(),
        wx.controller.init(),
        Cw.controller.init(),
        o_.controller.init(),
        Px.controller.init(),
        CE.controller.init(),
        wE.controller.init(),
        SE.controller.init(),
        TE.controller.init().sendPageview().sendInstall(),
        EE.controller.init(),
        await EE.controller.updateUser(),
        Bg.controller.init(),
        await Bg.controller.updatePro(),
        Ey.controller.init(),
        iw.controller.init(),
        (e = !0),
        yE.log("bg ready");
    },
    _clearTimerAlarms: async function () {
      const e = (await kE.callAsync(chrome.alarms.getAll)).filter((e) =>
        e.name.startsWith("timer-")
      );
      for (const t of e) await kE.callAsync(chrome.alarms.clear, t.name);
    },
    _handleExtButtonClick: function () {
      chrome.browserAction.onClicked.addListener(() => {
        chrome.tabs.create({
          url: chrome.runtime.getURL("/inssist.html"),
          active: !0,
        });
      });
    },
  }),
    yE.controller.init();
})();
