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
  const o = !1;
  let i = globalThis.app;
  (() => {
    if (i) return;
    const e = {},
      t = (function t(i) {
        const a = i === e,
          s = a && o,
          l = {},
          u = (e) => Object.assign(i, e);
        return new Proxy(i, {
          get: function (e, o) {
            if ("assign" === o) return u;
            if (!(o in i)) {
              if (((i[o] = {}), a)) {
                const e = n.bind(null, "log", o, !1),
                  t = n.bind(null, "log", o, !0),
                  a = n.bind(null, "warn", o, !1),
                  s = n.bind(null, "warn", o, !0),
                  l = n.bind(null, "error", o, !1),
                  u = n.bind(null, "error", o, !0),
                  c = r.bind(null, o);
                Object.defineProperties(i[o], {
                  log: { get: () => e },
                  logDev: { get: () => t },
                  warn: { get: () => a },
                  warnDev: { get: () => s },
                  error: { get: () => l },
                  errorDev: { get: () => u },
                  Error: { get: () => c },
                });
              }
              (l[o] = t(i[o])), s && (globalThis[o] = i[o]);
            }
            return o in l ? l[o] : i[o];
          },
          set: function (e, t, n) {
            return (i[t] = n), (l[t] = n), s && (globalThis[t] = i[t]), !0;
          },
        });
      })(e);
    function n(e, t, n, ...r) {
      if (n) return;
      const [o, i, a] = (function (e) {
        let t = 0;
        e.split("").forEach((n, r) => {
          t = e.charCodeAt(r) + ((t << 5) - t);
        });
        return [(16711680 & t) >> 16, (65280 & t) >> 8, 255 & t];
      })(t);
      console[e](`%c[${t}]`, `color: rgb(${o}, ${i}, ${a})`, ...r);
    }
    function r(e, t, ...r) {
      return n("error", e, !1, t, ...r), new Error(`[${e}] ${t}`);
    }
    (globalThis.app = t), (i = t);
  })();
  const a = {
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
    s = chrome.runtime.getManifest(),
    l = s.version,
    u =
      a.get("env.is") ||
      (s.name.includes("DEV")
        ? "development"
        : s.name.includes("BETA")
        ? "beta"
        : "production");
  let c = {
    version: l,
    manifestVersion: chrome.runtime.getManifest().manifest_version,
    is: {
      popup: location.pathname.includes("inssist.html"),
      background: location.pathname.includes("background"),
      production: "development" !== u && "beta" !== u,
      beta: "beta" === u,
      development: "development" === u,
    },
  };
  c = {
    ...c,
    features: {
      fspring: a.get("env.features.fspring", !0),
      iframes: a.get("env.features.iframes", !0),
      trial: !0,
      log: a.get("env.features.log", c.is.beta || c.is.development),
    },
    options: {},
  };
  var d = c;
  var f = [
    {
      id: "schedule",
      icon: "sidebar-mediator.later",
      title: "Post Later",
      description:
        "\n      Schedule photos, videos, carousels, stories and reels.\n      Use Time Slots to schedule content rapidly.\n    ",
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
  var p = [
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
  const h = 5,
    g = 3,
    m = {
      dmAdvanced: (e) => e.dmAdvanced >= 50,
      insights: (e) => e.insights >= 2,
      analytics: (e) => e.analytics >= 5,
      coverAssist: (e) => e.coverAssist >= 2,
      musicAssist: (e) => e.musicAssist >= 2,
      storyAssist: (e) => e.storyAssist >= h,
      tagAssist: (e) => e.tagAssist >= 4,
      addLinkToStory: (e) => e.addLinkToStory >= 2,
      repost: (e) => e.repost >= 3,
      reels: (e) => e.reels >= 2,
      ghostStoryView: (e) => e.ghostStoryView >= g,
      later: (e) => e.later >= 5,
    },
    v = 6e4,
    y = 36e5,
    b = 864e5,
    w = 6048e5,
    _ = 26784e5;
  var x = {
      SECOND: 1e3,
      MINUTE: v,
      HOUR: y,
      DAY: b,
      WEEK: w,
      MONTH: _,
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
    S = {
      apiUrl: a.get(
        "env.options.tagAssist.apiUrl",
        (d.is.production || d.is.beta, "https://fc.inssist.com/api/v1/hashtag")
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
  d.options = {
    ...d.options,
    apiUrl: a.get("env.options.apiUrl", "https://api.inssist.com/api/v1"),
    collectBillingStats: a.get("env.options.collectBillingStats", !1),
    domain: a.get("env.options.domain", "inssist.com"),
    storefront: a.get(
      "env.options.storefront",
      d.is.production || d.is.beta
        ? "slashed.onfastspring.com"
        : "slashed.test.onfastspring.com"
    ),
    checkoutContainer: a.get(
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
    billingProFeaturesList: f,
    billingProFeaturesTable: p,
    trialFeaturesLimits: m,
    tagAssist: S,
  };
  var P = {
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
    hashCode: D,
    pseudorandom: function (e) {
      return ((16807 * Math.max(Math.abs(D(e)), 1)) % 2147483647) / 2147483646;
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
  function D(e) {
    if (!e) return 0;
    let t,
      n,
      r = 0;
    if (0 === e.length) return r;
    for (t = 0; t < e.length; t++)
      (n = e.charCodeAt(t)), (r = (r << 5) - r + n), (r |= 0);
    return r;
  }
  const I = async (e) => {
      const t = URL.createObjectURL(e),
        n = document.createElement("img");
      return (
        await new Promise((e, r) => {
          (n.onload = e), (n.onerror = r), (n.src = t);
        }),
        { img: n, width: n.width, height: n.height, ratio: n.width / n.height }
      );
    },
    E = async (e, { type: t = "image/jpeg", quality: n = 0.8 } = {}) =>
      await new Promise((r, o) => {
        e.toBlob(
          (e) => {
            e ? r(e) : o("canvas.toBlob failed");
          },
          t,
          n
        );
      }),
    T = {
      scaleToFitSize: async function (
        e,
        t,
        n,
        { type: r = "image/jpeg", quality: o = 0.8 } = {}
      ) {
        const { img: i, width: a, height: s } = await I(e),
          l = t / a,
          u = n / s,
          c = Math.min(l, u),
          d = document.createElement("canvas");
        (d.width = a * c), (d.height = s * c);
        return (
          d.getContext("2d").drawImage(i, 0, 0, a, s, 0, 0, d.width, d.height),
          await E(d, { type: r, quality: o })
        );
      },
      scaleToFitRatio: async function (
        e,
        t,
        { type: n = "image/jpeg", quality: r = 0.8 } = {}
      ) {
        const { img: o, width: i, height: a, ratio: s } = await I(e),
          l = document.createElement("canvas");
        s > t
          ? ((l.width = i), (l.height = i / t))
          : ((l.height = a), (l.width = a * t));
        const u = l.getContext("2d"),
          c = (l.width - i) / 2,
          d = (l.height - a) / 2;
        return u.drawImage(o, c, d, i, a), await E(l, { type: n, quality: r });
      },
    };
  function C(e, t, n) {
    return n.indexOf(e) === t;
  }
  function F(e) {
    return Object.keys(e)
      .map((t) => {
        const n = e[t];
        return O(n)
          ? A(t, n)
          : Array.isArray(n)
          ? n.map((e) => A(t, e)).join("&")
          : null;
      })
      .filter(Boolean)
      .join("&")
      .replace(/%5B/g, "[")
      .replace(/%5D/g, "]");
  }
  function A(e, t) {
    return (
      O(t) || (t = JSON.stringify(t)),
      `${encodeURIComponent(e)}=${encodeURIComponent(t)}`
    );
  }
  function O(e) {
    return (
      "string" == typeof e || "number" == typeof e || "boolean" == typeof e
    );
  }
  function M(e, t = {}) {
    const n = F(t);
    return n ? `${e}?${n}` : e;
  }
  function R(e) {
    return Array.isArray(e) ? e : [e];
  }
  let U, N;
  function B({ hashOptional: e = !1 } = {}) {
    return (
      U ||
        ((U =
          /()([#\uFF03])((?:[A-Za-zªµºÀ-ÖØ-öø-Ɂɐ-ˁˆ-ˑˠ-ˤˮͺΆΈ-ΊΌΎ-ΡΣ-ώϐ-ϵϷ-ҁҊ-ӎ-ӹԀ-ԏԱ-Ֆՙա-ևא-תװ-ײء-غـ-يٮ-ٯٱ-ۓەۥ-ۦۮ-ۯۺ-ۼۿܐܒ-ܯݍ-ݭހ-ޥޱऄ-हऽॐक़-ॡॽঅ-ঌএ-ঐও-নপ-রলশ-হঽৎড়-ঢ়য়-ৡৰ-ৱਅ-ਊਏ-ਐਓ-ਨਪ-ਰਲ-ਲ਼ਵ-ਸ਼ਸ-ਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલ-ળવ-હઽૐૠ-ૡଅ-ଌଏ-ଐଓ-ନପ-ରଲ-ଳଵ-ହଽଡ଼-ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கங-சஜஞ-டண-தந-பம-ஹఅ-ఌఎ-ఐఒ-నప-ళవ-హౠ-ౡಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠ-ೡഅ-ഌഎ-ഐഒ-നപ-ഹൠ-ൡඅ-ඖක-නඳ-රලව-ෆก-ะา-ำเ-ๆກ-ຂຄງ-ຈຊຍດ-ທນ-ຟມ-ຣລວສ-ຫອ-ະາ-ຳຽເ-ໄໆໜ-ໝༀཀ-ཇཉ-ཪྈ-ྋက-အဣ-ဧဩ-ဪၐ-ၕႠ-Ⴥა-ჺჼᄀ-ᅙᅟ-ᆢᆨ-ᇹሀ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏ-Ᏼᐁ-ᙬᙯ-ᙶᚁ-ᚚᚠ-ᛪᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡷᢀ-ᢨᤀ-ᤜᥐ-ᥭᥰ-ᥴᦀ-ᦩᧁ-ᧇᨀ-ᨖᴀ-ᶿḀ-ẛẠ-ỹἀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₔℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℱℳ-ℹℼ-ℿⅅ-ⅉⰀ-Ⱞⰰ-ⱞⲀ-ⳤⵥⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞ々-〆〱-〵〻-〼ぁ-ゖゝ-ゟァ-ヺー-ヿㄅ-ㄬㄱ-ㆎㆠ-ㆷㇰ-ㇿ-䶵一-龻ꀀ-ꒌꠀ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢ가-힣豈-鶴侮-頻並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּ-לּמּנּ-סּףּ-פּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ̀ﾡ-ￜァ-ヺー-ヾｦ-ﾟ０-９Ａ-Ｚａ-ｚぁ-ゖ゙-ゞ㐀-䶿一-鿿꜀-뜿띀-렟-﨟〃々〻0-9٠-٩۰-۹०-९০-৯੦-੯૦-૯୦-୯௦-௯౦-౯೦-೯൦-൯๐-๙໐-໙༠-༩၀-၉០-៩᠐-᠙᥆-᥏᧐-᧙０-９_]|(?:[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u2388\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2648-\u2653\u2660\u2663\u2665\u2666\u2668\u267B\u267F\u2692-\u2694\u2696\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD79\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED0\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3]|\uD83E[\uDD10-\uDD18\uDD80-\uDD84\uDDC0]|(?:0\u20E3|1\u20E3|2\u20E3|3\u20E3|4\u20E3|5\u20E3|6\u20E3|7\u20E3|8\u20E3|9\u20E3|#\u20E3|\\*\u20E3|\uD83C(?:\uDDE6\uD83C(?:\uDDEB|\uDDFD|\uDDF1|\uDDF8|\uDDE9|\uDDF4|\uDDEE|\uDDF6|\uDDEC|\uDDF7|\uDDF2|\uDDFC|\uDDE8|\uDDFA|\uDDF9|\uDDFF|\uDDEA)|\uDDE7\uD83C(?:\uDDF8|\uDDED|\uDDE9|\uDDE7|\uDDFE|\uDDEA|\uDDFF|\uDDEF|\uDDF2|\uDDF9|\uDDF4|\uDDE6|\uDDFC|\uDDFB|\uDDF7|\uDDF3|\uDDEC|\uDDEB|\uDDEE|\uDDF6|\uDDF1)|\uDDE8\uD83C(?:\uDDF2|\uDDE6|\uDDFB|\uDDEB|\uDDF1|\uDDF3|\uDDFD|\uDDF5|\uDDE8|\uDDF4|\uDDEC|\uDDE9|\uDDF0|\uDDF7|\uDDEE|\uDDFA|\uDDFC|\uDDFE|\uDDFF|\uDDED)|\uDDE9\uD83C(?:\uDDFF|\uDDF0|\uDDEC|\uDDEF|\uDDF2|\uDDF4|\uDDEA)|\uDDEA\uD83C(?:\uDDE6|\uDDE8|\uDDEC|\uDDF7|\uDDEA|\uDDF9|\uDDFA|\uDDF8|\uDDED)|\uDDEB\uD83C(?:\uDDF0|\uDDF4|\uDDEF|\uDDEE|\uDDF7|\uDDF2)|\uDDEC\uD83C(?:\uDDF6|\uDDEB|\uDDE6|\uDDF2|\uDDEA|\uDDED|\uDDEE|\uDDF7|\uDDF1|\uDDE9|\uDDF5|\uDDFA|\uDDF9|\uDDEC|\uDDF3|\uDDFC|\uDDFE|\uDDF8|\uDDE7)|\uDDED\uD83C(?:\uDDF7|\uDDF9|\uDDF2|\uDDF3|\uDDF0|\uDDFA)|\uDDEE\uD83C(?:\uDDF4|\uDDE8|\uDDF8|\uDDF3|\uDDE9|\uDDF7|\uDDF6|\uDDEA|\uDDF2|\uDDF1|\uDDF9)|\uDDEF\uD83C(?:\uDDF2|\uDDF5|\uDDEA|\uDDF4)|\uDDF0\uD83C(?:\uDDED|\uDDFE|\uDDF2|\uDDFF|\uDDEA|\uDDEE|\uDDFC|\uDDEC|\uDDF5|\uDDF7|\uDDF3)|\uDDF1\uD83C(?:\uDDE6|\uDDFB|\uDDE7|\uDDF8|\uDDF7|\uDDFE|\uDDEE|\uDDF9|\uDDFA|\uDDF0|\uDDE8)|\uDDF2\uD83C(?:\uDDF4|\uDDF0|\uDDEC|\uDDFC|\uDDFE|\uDDFB|\uDDF1|\uDDF9|\uDDED|\uDDF6|\uDDF7|\uDDFA|\uDDFD|\uDDE9|\uDDE8|\uDDF3|\uDDEA|\uDDF8|\uDDE6|\uDDFF|\uDDF2|\uDDF5|\uDDEB)|\uDDF3\uD83C(?:\uDDE6|\uDDF7|\uDDF5|\uDDF1|\uDDE8|\uDDFF|\uDDEE|\uDDEA|\uDDEC|\uDDFA|\uDDEB|\uDDF4)|\uDDF4\uD83C\uDDF2|\uDDF5\uD83C(?:\uDDEB|\uDDF0|\uDDFC|\uDDF8|\uDDE6|\uDDEC|\uDDFE|\uDDEA|\uDDED|\uDDF3|\uDDF1|\uDDF9|\uDDF7|\uDDF2)|\uDDF6\uD83C\uDDE6|\uDDF7\uD83C(?:\uDDEA|\uDDF4|\uDDFA|\uDDFC|\uDDF8)|\uDDF8\uD83C(?:\uDDFB|\uDDF2|\uDDF9|\uDDE6|\uDDF3|\uDDE8|\uDDF1|\uDDEC|\uDDFD|\uDDF0|\uDDEE|\uDDE7|\uDDF4|\uDDF8|\uDDED|\uDDE9|\uDDF7|\uDDEF|\uDDFF|\uDDEA|\uDDFE)|\uDDF9\uD83C(?:\uDDE9|\uDDEB|\uDDFC|\uDDEF|\uDDFF|\uDDED|\uDDF1|\uDDEC|\uDDF0|\uDDF4|\uDDF9|\uDDE6|\uDDF3|\uDDF7|\uDDF2|\uDDE8|\uDDFB)|\uDDFA\uD83C(?:\uDDEC|\uDDE6|\uDDF8|\uDDFE|\uDDF2|\uDDFF)|\uDDFB\uD83C(?:\uDDEC|\uDDE8|\uDDEE|\uDDFA|\uDDE6|\uDDEA|\uDDF3)|\uDDFC\uD83C(?:\uDDF8|\uDDEB)|\uDDFD\uD83C\uDDF0|\uDDFE\uD83C(?:\uDDF9|\uDDEA)|\uDDFF\uD83C(?:\uDDE6|\uDDF2|\uDDFC))))[\uFE00-\uFE0F\u200D]*)+)/gi),
        (N = new RegExp(
          U.toString()
            .replace("/", "")
            .replace("/gi", "")
            .replace("[#\\uFF03]", "[#\\uFF03]?"),
          "gi"
        ))),
      e ? N : U
    );
  }
  var j = {};
  Object.assign(j, {
    ls: a,
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
            o = t + P.gaussianInt(0, r);
          if (0 === o) return;
          await new Promise((e) => setTimeout(e, o));
        }
      }
    },
    scaler: T,
    unique: C,
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
    loadImage: I,
    callAsync: async function (e, ...t) {
      return new Promise((n) => {
        e(...t, n);
      });
    },
    createUrl: M,
    jsonEscape: function (e) {
      return e.replace(/[\n\r\t]/g, " ");
    },
    ensureArray: R,
    createAlarm: function (e, { delay: t, period: n, when: r }, o) {
      const i = {};
      "number" == typeof t && (i.delayInMinutes = t / v),
        "number" == typeof n && (i.periodInMinutes = n / v),
        "number" == typeof r && (i.when = r),
        chrome.alarms.create(e, i),
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
    getHashtagRegex: B,
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
    createQueryString: F,
    createResolvablePromise: function () {
      let e;
      const t = new Promise((t) => {
        e = t;
      });
      return Object.defineProperty(t, "resolve", { get: () => e }), t;
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
    time: x,
  });
  const { $chromeBus: L } = app;
  L.assign({
    on: function (e, t) {
      H();
      (V[e] || (V[e] = [])).push(t);
    },
    off: function (e, t) {
      const n = V[e];
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
        chrome.runtime.sendMessage({ [$]: e, [z]: t }, (e) => {
          chrome.runtime.lastError || (n && n(e), r(e));
        });
      });
    },
  });
  const V = {},
    $ = "__$chromeBus.name",
    z = "__$chromeBus.args";
  function H() {
    const e = H;
    e.init ||
      ((e.init = !0),
      chrome.runtime.onMessage.addListener((e, t, n) => {
        const r = e["__$chromeBus.name"];
        if (!r) return !1;
        const o = e["__$chromeBus.args"] || [],
          i = V[r] || [];
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
  const { $influx: q } = app;
  q.action = (e, t) => ((t.type = e), (t.dispatch = G), t);
  const G = function (...e) {
    q.model.dispatch(this, e);
  };
  var W,
    J,
    Q,
    Y,
    K = !1;
  function X(e) {
    if (null == e)
      throw new TypeError(
        "Object.assign cannot be called with null or undefined"
      );
    return Object(e);
  }
  function Z() {
    (W = {}),
      (J = Object.getOwnPropertySymbols),
      (Q = Object.prototype.hasOwnProperty),
      (Y = Object.prototype.propertyIsEnumerable),
      (W = (function () {
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
            for (var n, r, o = X(e), i = 1; i < arguments.length; i++) {
              for (var a in (n = Object(arguments[i])))
                Q.call(n, a) && (o[a] = n[a]);
              if (J) {
                r = J(n);
                for (var s = 0; s < r.length; s++)
                  Y.call(n, r[s]) && (o[r[s]] = n[r[s]]);
              }
            }
            return o;
          });
  }
  function ee() {
    return K || ((K = !0), Z()), W;
  }
  var te,
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
    ye,
    be,
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
    Be,
    je,
    Le,
    Ve,
    $e,
    ze,
    He,
    qe,
    Ge,
    We,
    Je,
    Qe,
    Ye,
    Ke,
    Xe,
    Ze = !1;
  function et(e) {
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
  function tt(e, t, n) {
    (this.props = e),
      (this.context = t),
      (this.refs = ve),
      (this.updater = n || me);
  }
  function nt() {}
  function rt(e, t, n) {
    (this.props = e),
      (this.context = t),
      (this.refs = ve),
      (this.updater = n || me);
  }
  function ot(e, t, n) {
    var r,
      o = {},
      i = null,
      a = null;
    if (null != t)
      for (r in (void 0 !== t.ref && (a = t.ref),
      void 0 !== t.key && (i = "" + t.key),
      t))
        we.call(t, r) && !_e.hasOwnProperty(r) && (o[r] = t[r]);
    var s = arguments.length - 2;
    if (1 === s) o.children = n;
    else if (1 < s) {
      for (var l = Array(s), u = 0; u < s; u++) l[u] = arguments[u + 2];
      o.children = l;
    }
    if (e && e.defaultProps)
      for (r in (s = e.defaultProps)) void 0 === o[r] && (o[r] = s[r]);
    return {
      $$typeof: oe,
      type: e,
      key: i,
      ref: a,
      props: o,
      _owner: be.current,
    };
  }
  function it(e) {
    return "object" == typeof e && null !== e && e.$$typeof === oe;
  }
  function at(e, t, n, r) {
    if (Se.length) {
      var o = Se.pop();
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
  function st(e) {
    (e.result = null),
      (e.keyPrefix = null),
      (e.func = null),
      (e.context = null),
      (e.count = 0),
      10 > Se.length && Se.push(e);
  }
  function lt(e, t, n, r) {
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
            case oe:
            case ie:
              i = !0;
          }
      }
    if (i) return n(r, e, "" === t ? "." + ct(e, 0) : t), 1;
    if (((i = 0), (t = "" === t ? "." : t + ":"), Array.isArray(e)))
      for (var a = 0; a < e.length; a++) {
        var s = t + ct((o = e[a]), a);
        i += lt(o, s, n, r);
      }
    else if (
      (null === e || "object" != typeof e
        ? (s = null)
        : (s =
            "function" == typeof (s = (ge && e[ge]) || e["@@iterator"])
              ? s
              : null),
      "function" == typeof s)
    )
      for (e = s.call(e), a = 0; !(o = e.next()).done; )
        i += lt((o = o.value), (s = t + ct(o, a++)), n, r);
    else if ("object" === o)
      throw (
        ((n = "" + e),
        Error(
          et(
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
  function ut(e, t, n) {
    return null == e ? 0 : lt(e, "", t, n);
  }
  function ct(e, t) {
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
  function dt(e, t) {
    e.func.call(e.context, t, e.count++);
  }
  function ft(e, t, n) {
    var r = e.result,
      o = e.keyPrefix;
    (e = e.func.call(e.context, t, e.count++)),
      Array.isArray(e)
        ? pt(e, r, n, function (e) {
            return e;
          })
        : null != e &&
          (it(e) &&
            (e = (function (e, t) {
              return {
                $$typeof: oe,
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
                  : ("" + e.key).replace(xe, "$&/") + "/") +
                n
            )),
          r.push(e));
  }
  function pt(e, t, n, r, o) {
    var i = "";
    null != n && (i = ("" + n).replace(xe, "$&/") + "/"),
      ut(e, ft, (t = at(t, i, r, o))),
      st(t);
  }
  function ht() {
    var e = Pe.current;
    if (null === e) throw Error(et(321));
    return e;
  }
  function gt() {
    return (
      Ze ||
        ((Ze = !0),
        (te = {}),
        (ne = ee()),
        (re = "function" == typeof Symbol && Symbol.for),
        (oe = re ? Symbol.for("react.element") : 60103),
        (ie = re ? Symbol.for("react.portal") : 60106),
        (ae = re ? Symbol.for("react.fragment") : 60107),
        (se = re ? Symbol.for("react.strict_mode") : 60108),
        (le = re ? Symbol.for("react.profiler") : 60114),
        (ue = re ? Symbol.for("react.provider") : 60109),
        (ce = re ? Symbol.for("react.context") : 60110),
        (de = re ? Symbol.for("react.forward_ref") : 60112),
        (fe = re ? Symbol.for("react.suspense") : 60113),
        (pe = re ? Symbol.for("react.memo") : 60115),
        (he = re ? Symbol.for("react.lazy") : 60116),
        (ge = "function" == typeof Symbol && Symbol.iterator),
        (me = {
          isMounted: function () {
            return !1;
          },
          enqueueForceUpdate: function () {},
          enqueueReplaceState: function () {},
          enqueueSetState: function () {},
        }),
        (ve = {}),
        (tt.prototype.isReactComponent = {}),
        (tt.prototype.setState = function (e, t) {
          if ("object" != typeof e && "function" != typeof e && null != e)
            throw Error(et(85));
          this.updater.enqueueSetState(this, e, t, "setState");
        }),
        (tt.prototype.forceUpdate = function (e) {
          this.updater.enqueueForceUpdate(this, e, "forceUpdate");
        }),
        (nt.prototype = tt.prototype),
        ((ye = rt.prototype = new nt()).constructor = rt),
        ne(ye, tt.prototype),
        (ye.isPureReactComponent = !0),
        (be = { current: null }),
        (we = Object.prototype.hasOwnProperty),
        (_e = { key: !0, ref: !0, __self: !0, __source: !0 }),
        (xe = /\/+/g),
        (Se = []),
        (ke = {
          ReactCurrentDispatcher: (Pe = { current: null }),
          ReactCurrentBatchConfig: { suspense: null },
          ReactCurrentOwner: be,
          IsSomeRendererActing: { current: !1 },
          assign: ne,
        }),
        (De = {
          map: function (e, t, n) {
            if (null == e) return e;
            var r = [];
            return pt(e, r, null, t, n), r;
          },
          forEach: function (e, t, n) {
            if (null == e) return e;
            ut(e, dt, (t = at(null, null, t, n))), st(t);
          },
          count: function (e) {
            return ut(
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
              pt(e, t, null, function (e) {
                return e;
              }),
              t
            );
          },
          only: function (e) {
            if (!it(e)) throw Error(et(143));
            return e;
          },
        }),
        (te.Children = De),
        (Ie = tt),
        (te.Component = Ie),
        (Ee = ae),
        (te.Fragment = Ee),
        (Te = le),
        (te.Profiler = Te),
        (Ce = rt),
        (te.PureComponent = Ce),
        (Fe = se),
        (te.StrictMode = Fe),
        (Ae = fe),
        (te.Suspense = Ae),
        (Oe = ke),
        (te.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Oe),
        (Me = function (e, t, n) {
          if (null == e) throw Error(et(267, e));
          var r = ne({}, e.props),
            o = e.key,
            i = e.ref,
            a = e._owner;
          if (null != t) {
            if (
              (void 0 !== t.ref && ((i = t.ref), (a = be.current)),
              void 0 !== t.key && (o = "" + t.key),
              e.type && e.type.defaultProps)
            )
              var s = e.type.defaultProps;
            for (l in t)
              we.call(t, l) &&
                !_e.hasOwnProperty(l) &&
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
            $$typeof: oe,
            type: e.type,
            key: o,
            ref: i,
            props: r,
            _owner: a,
          };
        }),
        (te.cloneElement = Me),
        (Re = function (e, t) {
          return (
            void 0 === t && (t = null),
            ((e = {
              $$typeof: ce,
              _calculateChangedBits: t,
              _currentValue: e,
              _currentValue2: e,
              _threadCount: 0,
              Provider: null,
              Consumer: null,
            }).Provider = { $$typeof: ue, _context: e }),
            (e.Consumer = e)
          );
        }),
        (te.createContext = Re),
        (Ue = ot),
        (te.createElement = Ue),
        (Ne = function (e) {
          var t = ot.bind(null, e);
          return (t.type = e), t;
        }),
        (te.createFactory = Ne),
        (Be = function () {
          return { current: null };
        }),
        (te.createRef = Be),
        (je = function (e) {
          return { $$typeof: de, render: e };
        }),
        (te.forwardRef = je),
        (Le = it),
        (te.isValidElement = Le),
        (Ve = function (e) {
          return { $$typeof: he, _ctor: e, _status: -1, _result: null };
        }),
        (te.lazy = Ve),
        ($e = function (e, t) {
          return { $$typeof: pe, type: e, compare: void 0 === t ? null : t };
        }),
        (te.memo = $e),
        (ze = function (e, t) {
          return ht().useCallback(e, t);
        }),
        (te.useCallback = ze),
        (He = function (e, t) {
          return ht().useContext(e, t);
        }),
        (te.useContext = He),
        (qe = function () {}),
        (te.useDebugValue = qe),
        (Ge = function (e, t) {
          return ht().useEffect(e, t);
        }),
        (te.useEffect = Ge),
        (We = function (e, t, n) {
          return ht().useImperativeHandle(e, t, n);
        }),
        (te.useImperativeHandle = We),
        (Je = function (e, t) {
          return ht().useLayoutEffect(e, t);
        }),
        (te.useLayoutEffect = Je),
        (Qe = function (e, t) {
          return ht().useMemo(e, t);
        }),
        (te.useMemo = Qe),
        (Ye = function (e, t, n) {
          return ht().useReducer(e, t, n);
        }),
        (te.useReducer = Ye),
        (Ke = function (e) {
          return ht().useRef(e);
        }),
        (te.useRef = Ke),
        (Xe = function (e) {
          return ht().useState(e);
        }),
        (te.useState = Xe),
        "16.13.1",
        (te.version = "16.13.1")),
      te
    );
  }
  var mt,
    vt,
    yt = !1;
  function bt() {
    return yt || ((yt = !0), (mt = {}), (mt = gt()), (vt = t(mt))), mt;
  }
  bt();
  var wt,
    _t = !1;
  function xt() {
    return (
      _t ||
        ((_t = !0),
        (wt = {}),
        "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED",
        (wt = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED")),
      wt
    );
  }
  var St,
    Pt,
    kt = !1;
  function Dt() {}
  function It() {}
  (kt ||
    ((kt = !0),
    (St = {}),
    (Pt = xt()),
    (It.resetWarningCache = Dt),
    (St = function () {
      function e(e, t, n, r, o, i) {
        if (i !== Pt) {
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
        checkPropTypes: It,
        resetWarningCache: Dt,
      };
      return (n.PropTypes = n), n;
    })),
  St)();
  bt();
  var Et = vt.createContext(null);
  var Tt = function (e) {
      e();
    },
    Ct = { notify: function () {} };
  function Ft() {
    var e = Tt,
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
  var At = (function () {
    function e(e, t) {
      (this.store = e),
        (this.parentSub = t),
        (this.unsubscribe = null),
        (this.listeners = Ct),
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
          (this.listeners = Ft()));
      }),
      (t.tryUnsubscribe = function () {
        this.unsubscribe &&
          (this.unsubscribe(),
          (this.unsubscribe = null),
          this.listeners.clear(),
          (this.listeners = Ct));
      }),
      e
    );
  })();
  function Ot() {
    return (Ot =
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
  var Mt = Ot;
  function Rt(e, t) {
    if (null == e) return {};
    var n,
      r,
      o = {},
      i = Object.keys(e);
    for (r = 0; r < i.length; r++)
      (n = i[r]), t.indexOf(n) >= 0 || (o[n] = e[n]);
    return o;
  }
  var Ut,
    Nt,
    Bt,
    jt,
    Lt,
    Vt,
    $t,
    zt,
    Ht,
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
    vn,
    yn,
    bn,
    wn,
    _n,
    xn,
    Sn,
    Pn,
    kn,
    Dn,
    In,
    En,
    Tn,
    Cn,
    Fn = !1;
  function An(e) {
    if ("object" == typeof e && null !== e) {
      var t = e.$$typeof;
      switch (t) {
        case Bt:
          switch ((e = e.type)) {
            case qt:
            case Gt:
            case Lt:
            case $t:
            case Vt:
            case Jt:
              return e;
            default:
              switch ((e = e && e.$$typeof)) {
                case Ht:
                case Wt:
                case Kt:
                case Yt:
                case zt:
                  return e;
                default:
                  return t;
              }
          }
        case jt:
          return t;
      }
    }
  }
  function On(e) {
    return An(e) === Gt;
  }
  var Mn = {};
  Fn ||
    ((Fn = !0),
    (Ut = {}),
    (Nt = "function" == typeof Symbol && Symbol.for),
    (Bt = Nt ? Symbol.for("react.element") : 60103),
    (jt = Nt ? Symbol.for("react.portal") : 60106),
    (Lt = Nt ? Symbol.for("react.fragment") : 60107),
    (Vt = Nt ? Symbol.for("react.strict_mode") : 60108),
    ($t = Nt ? Symbol.for("react.profiler") : 60114),
    (zt = Nt ? Symbol.for("react.provider") : 60109),
    (Ht = Nt ? Symbol.for("react.context") : 60110),
    (qt = Nt ? Symbol.for("react.async_mode") : 60111),
    (Gt = Nt ? Symbol.for("react.concurrent_mode") : 60111),
    (Wt = Nt ? Symbol.for("react.forward_ref") : 60112),
    (Jt = Nt ? Symbol.for("react.suspense") : 60113),
    (Qt = Nt ? Symbol.for("react.suspense_list") : 60120),
    (Yt = Nt ? Symbol.for("react.memo") : 60115),
    (Kt = Nt ? Symbol.for("react.lazy") : 60116),
    (Xt = Nt ? Symbol.for("react.block") : 60121),
    (Zt = Nt ? Symbol.for("react.fundamental") : 60117),
    (en = Nt ? Symbol.for("react.responder") : 60118),
    (tn = Nt ? Symbol.for("react.scope") : 60119),
    (nn = qt),
    (Ut.AsyncMode = nn),
    (rn = Gt),
    (Ut.ConcurrentMode = rn),
    (on = Ht),
    (Ut.ContextConsumer = on),
    (an = zt),
    (Ut.ContextProvider = an),
    (sn = Bt),
    (Ut.Element = sn),
    (ln = Wt),
    (Ut.ForwardRef = ln),
    (un = Lt),
    (Ut.Fragment = un),
    (cn = Kt),
    (Ut.Lazy = cn),
    (dn = Yt),
    (Ut.Memo = dn),
    (fn = jt),
    (Ut.Portal = fn),
    (pn = $t),
    (Ut.Profiler = pn),
    (hn = Vt),
    (Ut.StrictMode = hn),
    (gn = Jt),
    (Ut.Suspense = gn),
    (mn = function (e) {
      return On(e) || An(e) === qt;
    }),
    (Ut.isAsyncMode = mn),
    (vn = On),
    (Ut.isConcurrentMode = vn),
    (yn = function (e) {
      return An(e) === Ht;
    }),
    (Ut.isContextConsumer = yn),
    (bn = function (e) {
      return An(e) === zt;
    }),
    (Ut.isContextProvider = bn),
    (wn = function (e) {
      return "object" == typeof e && null !== e && e.$$typeof === Bt;
    }),
    (Ut.isElement = wn),
    (_n = function (e) {
      return An(e) === Wt;
    }),
    (Ut.isForwardRef = _n),
    (xn = function (e) {
      return An(e) === Lt;
    }),
    (Ut.isFragment = xn),
    (Sn = function (e) {
      return An(e) === Kt;
    }),
    (Ut.isLazy = Sn),
    (Pn = function (e) {
      return An(e) === Yt;
    }),
    (Ut.isMemo = Pn),
    (kn = function (e) {
      return An(e) === jt;
    }),
    (Ut.isPortal = kn),
    (Dn = function (e) {
      return An(e) === $t;
    }),
    (Ut.isProfiler = Dn),
    (In = function (e) {
      return An(e) === Vt;
    }),
    (Ut.isStrictMode = In),
    (En = function (e) {
      return An(e) === Jt;
    }),
    (Ut.isSuspense = En),
    (Tn = function (e) {
      return (
        "string" == typeof e ||
        "function" == typeof e ||
        e === Lt ||
        e === Gt ||
        e === $t ||
        e === Vt ||
        e === Jt ||
        e === Qt ||
        ("object" == typeof e &&
          null !== e &&
          (e.$$typeof === Kt ||
            e.$$typeof === Yt ||
            e.$$typeof === zt ||
            e.$$typeof === Ht ||
            e.$$typeof === Wt ||
            e.$$typeof === Zt ||
            e.$$typeof === en ||
            e.$$typeof === tn ||
            e.$$typeof === Xt))
      );
    }),
    (Ut.isValidElementType = Tn),
    (Cn = An),
    (Ut.typeOf = Cn));
  var Rn = {
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
    Un = {
      name: !0,
      length: !0,
      prototype: !0,
      caller: !0,
      callee: !0,
      arguments: !0,
      arity: !0,
    },
    Nn = {
      $$typeof: !0,
      compare: !0,
      defaultProps: !0,
      displayName: !0,
      propTypes: !0,
      type: !0,
    },
    Bn = {};
  function jn(e) {
    return Mn.isMemo(e) ? Nn : Bn[e.$$typeof] || Rn;
  }
  (Bn[(Mn = Ut).ForwardRef] = {
    $$typeof: !0,
    render: !0,
    defaultProps: !0,
    displayName: !0,
    propTypes: !0,
  }),
    (Bn[Mn.Memo] = Nn);
  var Ln = Object.defineProperty,
    Vn = Object.getOwnPropertyNames,
    $n = Object.getOwnPropertySymbols,
    zn = Object.getOwnPropertyDescriptor,
    Hn = Object.getPrototypeOf,
    qn = Object.prototype;
  var Gn = t(function e(t, n, r) {
    if ("string" != typeof n) {
      if (qn) {
        var o = Hn(n);
        o && o !== qn && e(t, o, r);
      }
      var i = Vn(n);
      $n && (i = i.concat($n(n)));
      for (var a = jn(t), s = jn(n), l = 0; l < i.length; ++l) {
        var u = i[l];
        if (!(Un[u] || (r && r[u]) || (s && s[u]) || (a && a[u]))) {
          var c = zn(n, u);
          try {
            Ln(t, u, c);
          } catch (e) {}
        }
      }
    }
    return t;
  });
  bt(), bt();
  var Wn =
      "undefined" != typeof window &&
      void 0 !== window.document &&
      void 0 !== window.document.createElement
        ? bt().useLayoutEffect
        : bt().useEffect,
    Jn = [],
    Qn = [null, null];
  function Yn(e, t) {
    var n = e[1];
    return [t.payload, n + 1];
  }
  function Kn(e, t, n) {
    Wn(function () {
      return e.apply(void 0, t);
    }, n);
  }
  function Xn(e, t, n, r, o, i, a) {
    (e.current = r),
      (t.current = o),
      (n.current = !1),
      i.current && ((i.current = null), a());
  }
  function Zn(e, t, n, r, o, i, a, s, l, u) {
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
  var er = function () {
    return [null, 0];
  };
  function tr(e, t) {
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
      m = void 0 === g ? Et : g,
      v = Rt(n, [
        "getDisplayName",
        "methodName",
        "renderCountProp",
        "shouldHandleStateChanges",
        "storeKey",
        "withRef",
        "forwardRef",
        "context",
      ]),
      y = m;
    return function (t) {
      var n = t.displayName || t.name || "Component",
        r = o(n),
        i = Mt({}, v, {
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
        ? bt().useMemo
        : function (e) {
            return e();
          };
      function d(n) {
        var r = bt().useMemo(
            function () {
              var e = n.reactReduxForwardedRef,
                t = Rt(n, ["reactReduxForwardedRef"]);
              return [n.context, e, t];
            },
            [n]
          ),
          o = r[0],
          a = r[1],
          s = r[2],
          l = bt().useMemo(
            function () {
              return o &&
                o.Consumer &&
                Mn.isContextConsumer(vt.createElement(o.Consumer, null))
                ? o
                : y;
            },
            [o, y]
          ),
          d = bt().useContext(l),
          f =
            Boolean(n.store) &&
            Boolean(n.store.getState) &&
            Boolean(n.store.dispatch);
        Boolean(d) && Boolean(d.store);
        var p = f ? n.store : d.store,
          h = bt().useMemo(
            function () {
              return (function (t) {
                return e(t.dispatch, i);
              })(p);
            },
            [p]
          ),
          g = bt().useMemo(
            function () {
              if (!c) return Qn;
              var e = new At(p, f ? null : d.subscription),
                t = e.notifyNestedSubs.bind(e);
              return [e, t];
            },
            [p, f, d]
          ),
          m = g[0],
          v = g[1],
          b = bt().useMemo(
            function () {
              return f ? d : Mt({}, d, { subscription: m });
            },
            [f, d, m]
          ),
          w = bt().useReducer(Yn, Jn, er),
          _ = w[0][0],
          x = w[1];
        if (_ && _.error) throw _.error;
        var S = bt().useRef(),
          P = bt().useRef(s),
          k = bt().useRef(),
          D = bt().useRef(!1),
          I = u(
            function () {
              return k.current && s === P.current
                ? k.current
                : h(p.getState(), s);
            },
            [p, _, s]
          );
        Kn(Xn, [P, S, D, s, I, k, v]),
          Kn(Zn, [c, p, m, h, P, S, D, k, v, x], [p, m, h]);
        var E = bt().useMemo(
          function () {
            return vt.createElement(t, Mt({}, I, { ref: a }));
          },
          [a, t, I]
        );
        return bt().useMemo(
          function () {
            return c ? vt.createElement(l.Provider, { value: b }, E) : E;
          },
          [l, E, b]
        );
      }
      var p = s ? vt.memo(d) : d;
      if (((p.WrappedComponent = t), (p.displayName = r), h)) {
        var g = vt.forwardRef(function (e, t) {
          return vt.createElement(p, Mt({}, e, { reactReduxForwardedRef: t }));
        });
        return (g.displayName = r), (g.WrappedComponent = t), Gn(g, t);
      }
      return Gn(p, t);
    };
  }
  function nr(e, t) {
    return e === t ? 0 !== e || 0 !== t || 1 / e == 1 / t : e != e && t != t;
  }
  function rr(e, t) {
    if (nr(e, t)) return !0;
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
        !nr(e[n[o]], t[n[o]])
      )
        return !1;
    return !0;
  }
  var or = function () {
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
    ir = function () {
      return Math.random().toString(36).substring(7).split("").join(".");
    },
    ar = {
      INIT: "@@redux/INIT" + ir(),
      REPLACE: "@@redux/REPLACE" + ir(),
      PROBE_UNKNOWN_ACTION: function () {
        return "@@redux/PROBE_UNKNOWN_ACTION" + ir();
      },
    };
  function sr(e) {
    if ("object" != typeof e || null === e) return !1;
    for (var t = e; null !== Object.getPrototypeOf(t); )
      t = Object.getPrototypeOf(t);
    return Object.getPrototypeOf(e) === t;
  }
  function lr(e, t, n) {
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
      return n(lr)(e, t);
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
      if (!sr(e))
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
      (o = e), f({ type: ar.REPLACE });
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
        })[or.default] = function () {
          return this;
        }),
        e
      );
    }
    return (
      f({ type: ar.INIT }),
      ((r = { dispatch: f, subscribe: d, getState: c, replaceReducer: p })[
        or.default
      ] = h),
      r
    );
  }
  function ur(e, t) {
    return function () {
      return t(e.apply(this, arguments));
    };
  }
  function cr(e) {
    return function (t, n) {
      var r = e(t, n);
      function o() {
        return r;
      }
      return (o.dependsOnOwnProps = !1), o;
    };
  }
  function dr(e) {
    return null !== e.dependsOnOwnProps && void 0 !== e.dependsOnOwnProps
      ? Boolean(e.dependsOnOwnProps)
      : 1 !== e.length;
  }
  function fr(e, t) {
    return function (t, n) {
      n.displayName;
      var r = function (e, t) {
        return r.dependsOnOwnProps ? r.mapToProps(e, t) : r.mapToProps(e);
      };
      return (
        (r.dependsOnOwnProps = !0),
        (r.mapToProps = function (t, n) {
          (r.mapToProps = e), (r.dependsOnOwnProps = dr(e));
          var o = r(t, n);
          return (
            "function" == typeof o &&
              ((r.mapToProps = o),
              (r.dependsOnOwnProps = dr(o)),
              (o = r(t, n))),
            o
          );
        }),
        r
      );
    };
  }
  var pr = [
    function (e) {
      return "function" == typeof e ? fr(e) : void 0;
    },
    function (e) {
      return e
        ? void 0
        : cr(function (e) {
            return { dispatch: e };
          });
    },
    function (e) {
      return e && "object" == typeof e
        ? cr(function (t) {
            return (function (e, t) {
              if ("function" == typeof e) return ur(e, t);
              if ("object" != typeof e || null === e)
                throw new Error(
                  "bindActionCreators expected an object or a function, instead received " +
                    (null === e ? "null" : typeof e) +
                    '. Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?'
                );
              var n = {};
              for (var r in e) {
                var o = e[r];
                "function" == typeof o && (n[r] = ur(o, t));
              }
              return n;
            })(e, t);
          })
        : void 0;
    },
  ];
  var hr = [
    function (e) {
      return "function" == typeof e ? fr(e) : void 0;
    },
    function (e) {
      return e
        ? void 0
        : cr(function () {
            return {};
          });
    },
  ];
  function gr(e, t, n) {
    return Mt({}, n, {}, e, {}, t);
  }
  var mr = [
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
            return gr;
          };
    },
  ];
  function vr(e, t, n, r) {
    return function (o, i) {
      return n(e(o, i), t(r, i), i);
    };
  }
  function yr(e, t, n, r, o) {
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
  function br(e, t) {
    var n = t.initMapStateToProps,
      r = t.initMapDispatchToProps,
      o = t.initMergeProps,
      i = Rt(t, [
        "initMapStateToProps",
        "initMapDispatchToProps",
        "initMergeProps",
      ]),
      a = n(e, i),
      s = r(e, i),
      l = o(e, i);
    return (i.pure ? yr : vr)(a, s, l, e, i);
  }
  function wr(e, t, n) {
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
  function _r(e, t) {
    return e === t;
  }
  function xr(e) {
    var t = void 0 === e ? {} : e,
      n = t.connectHOC,
      r = void 0 === n ? tr : n,
      o = t.mapStateToPropsFactories,
      i = void 0 === o ? hr : o,
      a = t.mapDispatchToPropsFactories,
      s = void 0 === a ? pr : a,
      l = t.mergePropsFactories,
      u = void 0 === l ? mr : l,
      c = t.selectorFactory,
      d = void 0 === c ? br : c;
    return function (e, t, n, o) {
      void 0 === o && (o = {});
      var a = o,
        l = a.pure,
        c = void 0 === l || l,
        f = a.areStatesEqual,
        p = void 0 === f ? _r : f,
        h = a.areOwnPropsEqual,
        g = void 0 === h ? rr : h,
        m = a.areStatePropsEqual,
        v = void 0 === m ? rr : m,
        y = a.areMergedPropsEqual,
        b = void 0 === y ? rr : y,
        w = Rt(a, [
          "pure",
          "areStatesEqual",
          "areOwnPropsEqual",
          "areStatePropsEqual",
          "areMergedPropsEqual",
        ]),
        _ = wr(e, i, "mapStateToProps"),
        x = wr(t, s, "mapDispatchToProps"),
        S = wr(n, u, "mergeProps");
      return r(
        d,
        Mt(
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
            areMergedPropsEqual: b,
          },
          w
        )
      );
    };
  }
  var Sr = xr();
  bt(), bt();
  bt();
  var Pr,
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
    Br,
    jr,
    Lr,
    Vr,
    $r,
    zr,
    Hr,
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
    to,
    no,
    ro,
    oo,
    io,
    ao,
    so,
    lo,
    uo,
    co,
    fo,
    po,
    ho,
    go,
    mo = !1;
  function vo(e, t) {
    var n = e.length;
    e.push(t);
    e: for (;;) {
      var r = (n - 1) >>> 1,
        o = e[r];
      if (!(void 0 !== o && 0 < wo(o, t))) break e;
      (e[r] = t), (e[n] = o), (n = r);
    }
  }
  function yo(e) {
    return void 0 === (e = e[0]) ? null : e;
  }
  function bo(e) {
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
          if (void 0 !== a && 0 > wo(a, n))
            void 0 !== l && 0 > wo(l, a)
              ? ((e[r] = l), (e[s] = n), (r = s))
              : ((e[r] = a), (e[i] = n), (r = i));
          else {
            if (!(void 0 !== l && 0 > wo(l, n))) break e;
            (e[r] = l), (e[s] = n), (r = s);
          }
        }
      }
      return t;
    }
    return null;
  }
  function wo(e, t) {
    var n = e.sortIndex - t.sortIndex;
    return 0 !== n ? n : e.id - t.id;
  }
  function _o(e) {
    for (var t = yo(Yr); null !== t; ) {
      if (null === t.callback) bo(Yr);
      else {
        if (!(t.startTime <= e)) break;
        bo(Yr), (t.sortIndex = t.expirationTime), vo(Qr, t);
      }
      t = yo(Yr);
    }
  }
  function xo(e) {
    if (((no = !1), _o(e), !to))
      if (null !== yo(Qr)) (to = !0), Ir(So);
      else {
        var t = yo(Yr);
        null !== t && Er(xo, t.startTime - e);
      }
  }
  function So(e, t) {
    (to = !1), no && ((no = !1), Tr()), (eo = !0);
    var n = Zr;
    try {
      for (
        _o(t), Xr = yo(Qr);
        null !== Xr && (!(Xr.expirationTime > t) || (e && !Cr()));

      ) {
        var r = Xr.callback;
        if (null !== r) {
          (Xr.callback = null), (Zr = Xr.priorityLevel);
          var o = r(Xr.expirationTime <= t);
          (t = Pr()),
            "function" == typeof o
              ? (Xr.callback = o)
              : Xr === yo(Qr) && bo(Qr),
            _o(t);
        } else bo(Qr);
        Xr = yo(Qr);
      }
      if (null !== Xr) var i = !0;
      else {
        var a = yo(Yr);
        null !== a && Er(xo, a.startTime - t), (i = !1);
      }
      return i;
    } finally {
      (Xr = null), (Zr = n), (eo = !1);
    }
  }
  function Po(e) {
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
  function ko() {
    return (
      mo ||
        ((mo = !0),
        (Dr = {}),
        "undefined" == typeof window || "function" != typeof MessageChannel
          ? ((Ar = null),
            (Or = null),
            (Mr = function () {
              if (null !== Ar)
                try {
                  var e = Pr();
                  Ar(!0, e), (Ar = null);
                } catch (e) {
                  throw (setTimeout(Mr, 0), e);
                }
            }),
            (Rr = Date.now()),
            (Pr = function () {
              return Date.now() - Rr;
            }),
            (Dr.unstable_now = Pr),
            (Ir = function (e) {
              null !== Ar
                ? setTimeout(Ir, 0, e)
                : ((Ar = e), setTimeout(Mr, 0));
            }),
            (Er = function (e, t) {
              Or = setTimeout(e, t);
            }),
            (Tr = function () {
              clearTimeout(Or);
            }),
            (Cr = function () {
              return !1;
            }),
            (kr = function () {}),
            (Fr = Dr.unstable_forceFrameRate = kr))
          : ((Ur = window.performance),
            (Nr = window.Date),
            (Br = window.setTimeout),
            (jr = window.clearTimeout),
            "undefined" != typeof console &&
              ((Lr = window.cancelAnimationFrame),
              "function" != typeof window.requestAnimationFrame &&
                console.error(
                  "This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills"
                ),
              "function" != typeof Lr &&
                console.error(
                  "This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills"
                )),
            "object" == typeof Ur && "function" == typeof Ur.now
              ? ((Pr = function () {
                  return Ur.now();
                }),
                (Dr.unstable_now = Pr))
              : ((Vr = Nr.now()),
                (Pr = function () {
                  return Nr.now() - Vr;
                }),
                (Dr.unstable_now = Pr)),
            ($r = !1),
            (zr = null),
            (Hr = -1),
            (qr = 5),
            (Gr = 0),
            (Cr = function () {
              return Pr() >= Gr;
            }),
            (Fr = function () {}),
            (kr = function (e) {
              0 > e || 125 < e
                ? console.error(
                    "forceFrameRate takes a positive int between 0 and 125, forcing framerates higher than 125 fps is not unsupported"
                  )
                : (qr = 0 < e ? Math.floor(1e3 / e) : 5);
            }),
            (Dr.unstable_forceFrameRate = kr),
            (Wr = new MessageChannel()),
            (Jr = Wr.port2),
            (Wr.port1.onmessage = function () {
              if (null !== zr) {
                var e = Pr();
                Gr = e + qr;
                try {
                  zr(!0, e) ? Jr.postMessage(null) : (($r = !1), (zr = null));
                } catch (e) {
                  throw (Jr.postMessage(null), e);
                }
              } else $r = !1;
            }),
            (Ir = function (e) {
              (zr = e), $r || (($r = !0), Jr.postMessage(null));
            }),
            (Er = function (e, t) {
              Hr = Br(function () {
                e(Pr());
              }, t);
            }),
            (Tr = function () {
              jr(Hr), (Hr = -1);
            })),
        (Qr = []),
        (Yr = []),
        (Kr = 1),
        (Xr = null),
        (Zr = 3),
        (eo = !1),
        (to = !1),
        (no = !1),
        (ro = Fr),
        5,
        (Dr.unstable_IdlePriority = 5),
        1,
        (Dr.unstable_ImmediatePriority = 1),
        4,
        (Dr.unstable_LowPriority = 4),
        3,
        (Dr.unstable_NormalPriority = 3),
        null,
        (Dr.unstable_Profiling = null),
        2,
        (Dr.unstable_UserBlockingPriority = 2),
        (oo = function (e) {
          e.callback = null;
        }),
        (Dr.unstable_cancelCallback = oo),
        (io = function () {
          to || eo || ((to = !0), Ir(So));
        }),
        (Dr.unstable_continueExecution = io),
        (ao = function () {
          return Zr;
        }),
        (Dr.unstable_getCurrentPriorityLevel = ao),
        (so = function () {
          return yo(Qr);
        }),
        (Dr.unstable_getFirstCallbackNode = so),
        (lo = function (e) {
          switch (Zr) {
            case 1:
            case 2:
            case 3:
              var t = 3;
              break;
            default:
              t = Zr;
          }
          var n = Zr;
          Zr = t;
          try {
            return e();
          } finally {
            Zr = n;
          }
        }),
        (Dr.unstable_next = lo),
        (uo = function () {}),
        (Dr.unstable_pauseExecution = uo),
        (co = ro),
        (Dr.unstable_requestPaint = co),
        (fo = function (e, t) {
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
          var n = Zr;
          Zr = e;
          try {
            return t();
          } finally {
            Zr = n;
          }
        }),
        (Dr.unstable_runWithPriority = fo),
        (po = function (e, t, n) {
          var r = Pr();
          if ("object" == typeof n && null !== n) {
            var o = n.delay;
            (o = "number" == typeof o && 0 < o ? r + o : r),
              (n = "number" == typeof n.timeout ? n.timeout : Po(e));
          } else (n = Po(e)), (o = r);
          return (
            (e = {
              id: Kr++,
              callback: t,
              priorityLevel: e,
              startTime: o,
              expirationTime: (n = o + n),
              sortIndex: -1,
            }),
            o > r
              ? ((e.sortIndex = o),
                vo(Yr, e),
                null === yo(Qr) &&
                  e === yo(Yr) &&
                  (no ? Tr() : (no = !0), Er(xo, o - r)))
              : ((e.sortIndex = n), vo(Qr, e), to || eo || ((to = !0), Ir(So))),
            e
          );
        }),
        (Dr.unstable_scheduleCallback = po),
        (ho = function () {
          var e = Pr();
          _o(e);
          var t = yo(Qr);
          return (
            (t !== Xr &&
              null !== Xr &&
              null !== t &&
              null !== t.callback &&
              t.startTime <= e &&
              t.expirationTime < Xr.expirationTime) ||
            Cr()
          );
        }),
        (Dr.unstable_shouldYield = ho),
        (go = function (e) {
          var t = Zr;
          return function () {
            var n = Zr;
            Zr = t;
            try {
              return e.apply(this, arguments);
            } finally {
              Zr = n;
            }
          };
        }),
        (Dr.unstable_wrapCallback = go)),
      Dr
    );
  }
  var Do,
    Io = !1;
  function Eo() {
    return Io || ((Io = !0), (Do = {}), (Do = ko())), Do;
  }
  var To,
    Co,
    Fo,
    Ao,
    Oo,
    Mo,
    Ro,
    Uo,
    No,
    Bo,
    jo,
    Lo,
    Vo,
    $o,
    zo,
    Ho,
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
    yi,
    bi,
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
    Bi,
    ji,
    Li,
    Vi,
    $i,
    zi,
    Hi,
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
    ya,
    ba,
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
    Ba,
    ja,
    La,
    Va,
    $a,
    za,
    Ha,
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
    ys,
    bs,
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
    Bs,
    js,
    Ls,
    Vs,
    $s,
    zs,
    Hs,
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
    yl,
    bl,
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
    Bl,
    jl,
    Ll,
    Vl,
    $l,
    zl,
    Hl,
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
    du,
    fu,
    pu,
    hu,
    gu,
    mu,
    vu,
    yu,
    bu,
    wu,
    _u,
    xu,
    Su,
    Pu,
    ku = !1;
  function Du(e) {
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
  function Iu(e, t, n, r, o, i, a, s, l) {
    var u = Array.prototype.slice.call(arguments, 3);
    try {
      t.apply(n, u);
    } catch (e) {
      this.onError(e);
    }
  }
  function Eu(e, t, n, r, o, i, a, s, l) {
    (Ao = !1), (Oo = null), Iu.apply(Uo, arguments);
  }
  function Tu(e, t, n) {
    var r = e.type || "unknown-event";
    (e.currentTarget = jo(n)),
      (function (e, t, n, r, o, i, a, s, l) {
        if ((Eu.apply(this, arguments), Ao)) {
          if (!Ao) throw Error(Du(198));
          var u = Oo;
          (Ao = !1), (Oo = null), Mo || ((Mo = !0), (Ro = u));
        }
      })(r, t, void 0, e),
      (e.currentTarget = null);
  }
  function Cu() {
    if (Lo)
      for (var e in Vo) {
        var t = Vo[e],
          n = Lo.indexOf(e);
        if (!(-1 < n)) throw Error(Du(96, e));
        if (!$o[n]) {
          if (!t.extractEvents) throw Error(Du(97, e));
          for (var r in (($o[n] = t), (n = t.eventTypes))) {
            var o = void 0,
              i = n[r],
              a = t,
              s = r;
            if (zo.hasOwnProperty(s)) throw Error(Du(99, s));
            zo[s] = i;
            var l = i.phasedRegistrationNames;
            if (l) {
              for (o in l) l.hasOwnProperty(o) && Fu(l[o], a, s);
              o = !0;
            } else
              i.registrationName
                ? (Fu(i.registrationName, a, s), (o = !0))
                : (o = !1);
            if (!o) throw Error(Du(98, r, e));
          }
        }
      }
  }
  function Fu(e, t, n) {
    if (Ho[e]) throw Error(Du(100, e));
    (Ho[e] = t), (qo[e] = t.eventTypes[n].dependencies);
  }
  function Au(e) {
    var t,
      n = !1;
    for (t in e)
      if (e.hasOwnProperty(t)) {
        var r = e[t];
        if (!Vo.hasOwnProperty(t) || Vo[t] !== r) {
          if (Vo[t]) throw Error(Du(102, t));
          (Vo[t] = r), (n = !0);
        }
      }
    n && Cu();
  }
  function Ou(e) {
    if ((e = Bo(e))) {
      if ("function" != typeof Wo) throw Error(Du(280));
      var t = e.stateNode;
      t && ((t = No(t)), Wo(e.stateNode, e.type, t));
    }
  }
  function Mu(e) {
    Jo ? (Qo ? Qo.push(e) : (Qo = [e])) : (Jo = e);
  }
  function Ru() {
    if (Jo) {
      var e = Jo,
        t = Qo;
      if (((Qo = Jo = null), Ou(e), t)) for (e = 0; e < t.length; e++) Ou(t[e]);
    }
  }
  function Uu(e, t) {
    return e(t);
  }
  function Nu(e, t, n, r, o) {
    return e(t, n, r, o);
  }
  function Bu() {}
  function ju() {
    (null === Jo && null === Qo) || (Bu(), Ru());
  }
  function Lu(e, t, n) {
    if (Xo) return e(t, n);
    Xo = !0;
    try {
      return Yo(e, t, n);
    } finally {
      (Xo = !1), ju();
    }
  }
  function Vu(e, t, n, r, o, i) {
    (this.acceptsBooleans = 2 === t || 3 === t || 4 === t),
      (this.attributeName = r),
      (this.attributeNamespace = o),
      (this.mustUseProperty = n),
      (this.propertyName = e),
      (this.type = t),
      (this.sanitizeURL = i);
  }
  function $u(e) {
    return e[1].toUpperCase();
  }
  function zu(e, t, n, r) {
    var o = ri.hasOwnProperty(t) ? ri[t] : null;
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
              !!ei.call(ni, e) ||
              (!ei.call(ti, e) &&
                (Zo.test(e) ? (ni[e] = !0) : ((ti[e] = !0), !1)))
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
  function Hu(e) {
    return null === e || "object" != typeof e
      ? null
      : "function" == typeof (e = (xi && e[xi]) || e["@@iterator"])
      ? e
      : null;
  }
  function qu(e) {
    if (null == e) return null;
    if ("function" == typeof e) return e.displayName || e.name || null;
    if ("string" == typeof e) return e;
    switch (e) {
      case ci:
        return "Fragment";
      case ui:
        return "Portal";
      case fi:
        return "Profiler";
      case di:
        return "StrictMode";
      case vi:
        return "Suspense";
      case yi:
        return "SuspenseList";
    }
    if ("object" == typeof e)
      switch (e.$$typeof) {
        case hi:
          return "Context.Consumer";
        case pi:
          return "Context.Provider";
        case mi:
          var t = e.render;
          return (
            (t = t.displayName || t.name || ""),
            e.displayName || ("" !== t ? "ForwardRef(" + t + ")" : "ForwardRef")
          );
        case bi:
          return qu(e.type);
        case _i:
          return qu(e.render);
        case wi:
          if ((e = 1 === e._status ? e._result : null)) return qu(e);
      }
    return null;
  }
  function Gu(e) {
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
            i = qu(e.type);
          (n = null),
            r && (n = qu(r.type)),
            (r = i),
            (i = ""),
            o
              ? (i =
                  " (at " +
                  o.fileName.replace(ai, "") +
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
  function Wu(e) {
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
  function Ju(e) {
    var t = e.type;
    return (
      (e = e.nodeName) &&
      "input" === e.toLowerCase() &&
      ("checkbox" === t || "radio" === t)
    );
  }
  function Qu(e) {
    e._valueTracker ||
      (e._valueTracker = (function (e) {
        var t = Ju(e) ? "checked" : "value",
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
  function Yu(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var n = t.getValue(),
      r = "";
    return (
      e && (r = Ju(e) ? (e.checked ? "true" : "false") : e.value),
      (e = r) !== n && (t.setValue(e), !0)
    );
  }
  function Ku(e, t) {
    var n = t.checked;
    return Fo({}, t, {
      defaultChecked: void 0,
      defaultValue: void 0,
      value: void 0,
      checked: null != n ? n : e._wrapperState.initialChecked,
    });
  }
  function Xu(e, t) {
    var n = null == t.defaultValue ? "" : t.defaultValue,
      r = null != t.checked ? t.checked : t.defaultChecked;
    (n = Wu(null != t.value ? t.value : n)),
      (e._wrapperState = {
        initialChecked: r,
        initialValue: n,
        controlled:
          "checkbox" === t.type || "radio" === t.type
            ? null != t.checked
            : null != t.value,
      });
  }
  function Zu(e, t) {
    null != (t = t.checked) && zu(e, "checked", t, !1);
  }
  function ec(e, t) {
    Zu(e, t);
    var n = Wu(t.value),
      r = t.type;
    if (null != n)
      "number" === r
        ? ((0 === n && "" === e.value) || e.value != n) && (e.value = "" + n)
        : e.value !== "" + n && (e.value = "" + n);
    else if ("submit" === r || "reset" === r)
      return void e.removeAttribute("value");
    t.hasOwnProperty("value")
      ? nc(e, t.type, n)
      : t.hasOwnProperty("defaultValue") && nc(e, t.type, Wu(t.defaultValue)),
      null == t.checked &&
        null != t.defaultChecked &&
        (e.defaultChecked = !!t.defaultChecked);
  }
  function tc(e, t, n) {
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
  function nc(e, t, n) {
    ("number" === t && e.ownerDocument.activeElement === e) ||
      (null == n
        ? (e.defaultValue = "" + e._wrapperState.initialValue)
        : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
  }
  function rc(e, t) {
    return (
      (e = Fo({ children: void 0 }, t)),
      (t = (function (e) {
        var t = "";
        return (
          Co.Children.forEach(e, function (e) {
            null != e && (t += e);
          }),
          t
        );
      })(t.children)) && (e.children = t),
      e
    );
  }
  function oc(e, t, n, r) {
    if (((e = e.options), t)) {
      t = {};
      for (var o = 0; o < n.length; o++) t["$" + n[o]] = !0;
      for (n = 0; n < e.length; n++)
        (o = t.hasOwnProperty("$" + e[n].value)),
          e[n].selected !== o && (e[n].selected = o),
          o && r && (e[n].defaultSelected = !0);
    } else {
      for (n = "" + Wu(n), t = null, o = 0; o < e.length; o++) {
        if (e[o].value === n)
          return (e[o].selected = !0), void (r && (e[o].defaultSelected = !0));
        null !== t || e[o].disabled || (t = e[o]);
      }
      null !== t && (t.selected = !0);
    }
  }
  function ic(e, t) {
    if (null != t.dangerouslySetInnerHTML) throw Error(Du(91));
    return Fo({}, t, {
      value: void 0,
      defaultValue: void 0,
      children: "" + e._wrapperState.initialValue,
    });
  }
  function ac(e, t) {
    var n = t.value;
    if (null == n) {
      if (((n = t.children), (t = t.defaultValue), null != n)) {
        if (null != t) throw Error(Du(92));
        if (Array.isArray(n)) {
          if (!(1 >= n.length)) throw Error(Du(93));
          n = n[0];
        }
        t = n;
      }
      null == t && (t = ""), (n = t);
    }
    e._wrapperState = { initialValue: Wu(n) };
  }
  function sc(e, t) {
    var n = Wu(t.value),
      r = Wu(t.defaultValue);
    null != n &&
      ((n = "" + n) !== e.value && (e.value = n),
      null == t.defaultValue && e.defaultValue !== n && (e.defaultValue = n)),
      null != r && (e.defaultValue = "" + r);
  }
  function lc(e) {
    var t = e.textContent;
    t === e._wrapperState.initialValue &&
      "" !== t &&
      null !== t &&
      (e.value = t);
  }
  function uc(e) {
    switch (e) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function cc(e, t) {
    return null == e || "http://www.w3.org/1999/xhtml" === e
      ? uc(t)
      : "http://www.w3.org/2000/svg" === e && "foreignObject" === t
      ? "http://www.w3.org/1999/xhtml"
      : e;
  }
  function dc(e, t) {
    if (t) {
      var n = e.firstChild;
      if (n && n === e.lastChild && 3 === n.nodeType)
        return void (n.nodeValue = t);
    }
    e.textContent = t;
  }
  function fc(e, t) {
    var n = {};
    return (
      (n[e.toLowerCase()] = t.toLowerCase()),
      (n["Webkit" + e] = "webkit" + t),
      (n["Moz" + e] = "moz" + t),
      n
    );
  }
  function pc(e) {
    if (Ii[e]) return Ii[e];
    if (!Di[e]) return e;
    var t,
      n = Di[e];
    for (t in n) if (n.hasOwnProperty(t) && t in Ei) return (Ii[e] = n[t]);
    return e;
  }
  function hc(e) {
    var t = Mi.get(e);
    return void 0 === t && ((t = new Map()), Mi.set(e, t)), t;
  }
  function gc(e) {
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
  function mc(e) {
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
  function vc(e) {
    if (gc(e) !== e) throw Error(Du(188));
  }
  function yc(e) {
    if (
      !(e = (function (e) {
        var t = e.alternate;
        if (!t) {
          if (null === (t = gc(e))) throw Error(Du(188));
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
              if (i === n) return vc(o), e;
              if (i === r) return vc(o), t;
              i = i.sibling;
            }
            throw Error(Du(188));
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
              if (!a) throw Error(Du(189));
            }
          }
          if (n.alternate !== r) throw Error(Du(190));
        }
        if (3 !== n.tag) throw Error(Du(188));
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
  function bc(e, t) {
    if (null == t) throw Error(Du(30));
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
  function wc(e, t, n) {
    Array.isArray(e) ? e.forEach(t, n) : e && t.call(n, e);
  }
  function _c(e) {
    if (e) {
      var t = e._dispatchListeners,
        n = e._dispatchInstances;
      if (Array.isArray(t))
        for (var r = 0; r < t.length && !e.isPropagationStopped(); r++)
          Tu(e, t[r], n[r]);
      else t && Tu(e, t, n);
      (e._dispatchListeners = null),
        (e._dispatchInstances = null),
        e.isPersistent() || e.constructor.release(e);
    }
  }
  function xc(e) {
    if ((null !== e && (Ri = bc(Ri, e)), (e = Ri), (Ri = null), e)) {
      if ((wc(e, _c), Ri)) throw Error(Du(95));
      if (Mo) throw ((e = Ro), (Mo = !1), (Ro = null), e);
    }
  }
  function Sc(e) {
    return (
      (e = e.target || e.srcElement || window).correspondingUseElement &&
        (e = e.correspondingUseElement),
      3 === e.nodeType ? e.parentNode : e
    );
  }
  function Pc(e) {
    if (!Go) return !1;
    var t = (e = "on" + e) in document;
    return (
      t ||
        ((t = document.createElement("div")).setAttribute(e, "return;"),
        (t = "function" == typeof t[e])),
      t
    );
  }
  function kc(e) {
    (e.topLevelType = null),
      (e.nativeEvent = null),
      (e.targetInst = null),
      (e.ancestors.length = 0),
      10 > Ui.length && Ui.push(e);
  }
  function Dc(e, t, n, r) {
    if (Ui.length) {
      var o = Ui.pop();
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
  function Ic(e) {
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
      (5 !== (t = n.tag) && 6 !== t) || e.ancestors.push(n), (n = sd(r));
    } while (n);
    for (n = 0; n < e.ancestors.length; n++) {
      t = e.ancestors[n];
      var o = Sc(e.nativeEvent);
      r = e.topLevelType;
      var i = e.nativeEvent,
        a = e.eventSystemFlags;
      0 === n && (a |= 64);
      for (var s = null, l = 0; l < $o.length; l++) {
        var u = $o[l];
        u && (u = u.extractEvents(r, t, i, o, a)) && (s = bc(s, u));
      }
      xc(s);
    }
  }
  function Ec(e, t, n) {
    if (!n.has(e)) {
      switch (e) {
        case "scroll":
          Lc(t, "scroll", !0);
          break;
        case "focus":
        case "blur":
          Lc(t, "focus", !0),
            Lc(t, "blur", !0),
            n.set("blur", null),
            n.set("focus", null);
          break;
        case "cancel":
        case "close":
          Pc(e) && Lc(t, e, !0);
          break;
        case "invalid":
        case "submit":
        case "reset":
          break;
        default:
          -1 === Oi.indexOf(e) && jc(e, t);
      }
      n.set(e, null);
    }
  }
  function Tc(e, t, n, r, o) {
    return {
      blockedOn: e,
      topLevelType: t,
      eventSystemFlags: 32 | n,
      nativeEvent: o,
      container: r,
    };
  }
  function Cc(e, t) {
    switch (e) {
      case "focus":
      case "blur":
        $i = null;
        break;
      case "dragenter":
      case "dragleave":
        zi = null;
        break;
      case "mouseover":
      case "mouseout":
        Hi = null;
        break;
      case "pointerover":
      case "pointerout":
        qi.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Gi.delete(t.pointerId);
    }
  }
  function Fc(e, t, n, r, o, i) {
    return null === e || e.nativeEvent !== i
      ? ((e = Tc(t, n, r, o, i)),
        null !== t && null !== (t = ld(t)) && Bi(t),
        e)
      : ((e.eventSystemFlags |= r), e);
  }
  function Ac(e) {
    var t = sd(e.target);
    if (null !== t) {
      var n = gc(t);
      if (null !== n)
        if (13 === (t = n.tag)) {
          if (null !== (t = mc(n)))
            return (
              (e.blockedOn = t),
              void Eo().unstable_runWithPriority(e.priority, function () {
                ji(n);
              })
            );
        } else if (3 === t && n.stateNode.hydrate)
          return void (e.blockedOn =
            3 === n.tag ? n.stateNode.containerInfo : null);
    }
    e.blockedOn = null;
  }
  function Oc(e) {
    if (null !== e.blockedOn) return !1;
    var t = Hc(e.topLevelType, e.eventSystemFlags, e.container, e.nativeEvent);
    if (null !== t) {
      var n = ld(t);
      return null !== n && Bi(n), (e.blockedOn = t), !1;
    }
    return !0;
  }
  function Mc(e, t, n) {
    Oc(e) && n.delete(t);
  }
  function Rc() {
    for (Li = !1; 0 < Vi.length; ) {
      var e = Vi[0];
      if (null !== e.blockedOn) {
        null !== (e = ld(e.blockedOn)) && Ni(e);
        break;
      }
      var t = Hc(
        e.topLevelType,
        e.eventSystemFlags,
        e.container,
        e.nativeEvent
      );
      null !== t ? (e.blockedOn = t) : Vi.shift();
    }
    null !== $i && Oc($i) && ($i = null),
      null !== zi && Oc(zi) && (zi = null),
      null !== Hi && Oc(Hi) && (Hi = null),
      qi.forEach(Mc),
      Gi.forEach(Mc);
  }
  function Uc(e, t) {
    e.blockedOn === t &&
      ((e.blockedOn = null),
      Li ||
        ((Li = !0),
        Eo().unstable_scheduleCallback(Eo().unstable_NormalPriority, Rc)));
  }
  function Nc(e) {
    function t(t) {
      return Uc(t, e);
    }
    if (0 < Vi.length) {
      Uc(Vi[0], e);
      for (var n = 1; n < Vi.length; n++) {
        var r = Vi[n];
        r.blockedOn === e && (r.blockedOn = null);
      }
    }
    for (
      null !== $i && Uc($i, e),
        null !== zi && Uc(zi, e),
        null !== Hi && Uc(Hi, e),
        qi.forEach(t),
        Gi.forEach(t),
        n = 0;
      n < Wi.length;
      n++
    )
      (r = Wi[n]).blockedOn === e && (r.blockedOn = null);
    for (; 0 < Wi.length && null === (n = Wi[0]).blockedOn; )
      Ac(n), null === n.blockedOn && Wi.shift();
  }
  function Bc(e, t) {
    for (var n = 0; n < e.length; n += 2) {
      var r = e[n],
        o = e[n + 1],
        i = "on" + (o[0].toUpperCase() + o.slice(1));
      (i = {
        phasedRegistrationNames: { bubbled: i, captured: i + "Capture" },
        dependencies: [r],
        eventPriority: t,
      }),
        Xi.set(r, t),
        Ki.set(r, i),
        (Yi[o] = i);
    }
  }
  function jc(e, t) {
    Lc(t, e, !1);
  }
  function Lc(e, t, n) {
    var r = Xi.get(t);
    switch (void 0 === r ? 2 : r) {
      case 0:
        r = Vc.bind(null, t, 1, e);
        break;
      case 1:
        r = $c.bind(null, t, 1, e);
        break;
      default:
        r = zc.bind(null, t, 1, e);
    }
    n ? e.addEventListener(t, r, !0) : e.addEventListener(t, r, !1);
  }
  function Vc(e, t, n, r) {
    Ko || Bu();
    var o = zc,
      i = Ko;
    Ko = !0;
    try {
      Nu(o, e, t, n, r);
    } finally {
      (Ko = i) || ju();
    }
  }
  function $c(e, t, n, r) {
    ra(na, zc.bind(null, e, t, n, r));
  }
  function zc(e, t, n, r) {
    if (oa)
      if (0 < Vi.length && -1 < Ji.indexOf(e))
        (e = Tc(null, e, t, n, r)), Vi.push(e);
      else {
        var o = Hc(e, t, n, r);
        if (null === o) Cc(e, r);
        else if (-1 < Ji.indexOf(e)) (e = Tc(o, e, t, n, r)), Vi.push(e);
        else if (
          !(function (e, t, n, r, o) {
            switch (t) {
              case "focus":
                return ($i = Fc($i, e, t, n, r, o)), !0;
              case "dragenter":
                return (zi = Fc(zi, e, t, n, r, o)), !0;
              case "mouseover":
                return (Hi = Fc(Hi, e, t, n, r, o)), !0;
              case "pointerover":
                var i = o.pointerId;
                return qi.set(i, Fc(qi.get(i) || null, e, t, n, r, o)), !0;
              case "gotpointercapture":
                return (
                  (i = o.pointerId),
                  Gi.set(i, Fc(Gi.get(i) || null, e, t, n, r, o)),
                  !0
                );
            }
            return !1;
          })(o, e, t, n, r)
        ) {
          Cc(e, r), (e = Dc(e, r, null, t));
          try {
            Lu(Ic, e);
          } finally {
            kc(e);
          }
        }
      }
  }
  function Hc(e, t, n, r) {
    if (null !== (n = sd((n = Sc(r))))) {
      var o = gc(n);
      if (null === o) n = null;
      else {
        var i = o.tag;
        if (13 === i) {
          if (null !== (n = mc(o))) return n;
          n = null;
        } else if (3 === i) {
          if (o.stateNode.hydrate)
            return 3 === o.tag ? o.stateNode.containerInfo : null;
          n = null;
        } else o !== n && (n = null);
      }
    }
    e = Dc(e, r, n, t);
    try {
      Lu(Ic, e);
    } finally {
      kc(e);
    }
    return null;
  }
  function qc(e, t, n) {
    return null == t || "boolean" == typeof t || "" === t
      ? ""
      : n || "number" != typeof t || 0 === t || (ia.hasOwnProperty(e) && ia[e])
      ? ("" + t).trim()
      : t + "px";
  }
  function Gc(e, t) {
    for (var n in ((e = e.style), t))
      if (t.hasOwnProperty(n)) {
        var r = 0 === n.indexOf("--"),
          o = qc(n, t[n], r);
        "float" === n && (n = "cssFloat"), r ? e.setProperty(n, o) : (e[n] = o);
      }
  }
  function Wc(e, t) {
    if (t) {
      if (sa[e] && (null != t.children || null != t.dangerouslySetInnerHTML))
        throw Error(Du(137, e, ""));
      if (null != t.dangerouslySetInnerHTML) {
        if (null != t.children) throw Error(Du(60));
        if (
          "object" != typeof t.dangerouslySetInnerHTML ||
          !("__html" in t.dangerouslySetInnerHTML)
        )
          throw Error(Du(61));
      }
      if (null != t.style && "object" != typeof t.style)
        throw Error(Du(62, ""));
    }
  }
  function Jc(e, t) {
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
  function Qc(e, t) {
    var n = hc(
      (e = 9 === e.nodeType || 11 === e.nodeType ? e : e.ownerDocument)
    );
    t = qo[t];
    for (var r = 0; r < t.length; r++) Ec(t[r], e, n);
  }
  function Yc() {}
  function Kc(e) {
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
  function Xc(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Zc(e, t) {
    var n,
      r = Xc(e);
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
      r = Xc(r);
    }
  }
  function ed(e, t) {
    return (
      !(!e || !t) &&
      (e === t ||
        ((!e || 3 !== e.nodeType) &&
          (t && 3 === t.nodeType
            ? ed(e, t.parentNode)
            : "contains" in e
            ? e.contains(t)
            : !!e.compareDocumentPosition &&
              !!(16 & e.compareDocumentPosition(t)))))
    );
  }
  function td() {
    for (var e = window, t = Kc(); t instanceof e.HTMLIFrameElement; ) {
      try {
        var n = "string" == typeof t.contentWindow.location.href;
      } catch (e) {
        n = !1;
      }
      if (!n) break;
      t = Kc((e = t.contentWindow).document);
    }
    return t;
  }
  function nd(e) {
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
  function rd(e, t) {
    switch (e) {
      case "button":
      case "input":
      case "select":
      case "textarea":
        return !!t.autoFocus;
    }
    return !1;
  }
  function od(e, t) {
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
  function id(e) {
    for (; null != e; e = e.nextSibling) {
      var t = e.nodeType;
      if (1 === t || 3 === t) break;
    }
    return e;
  }
  function ad(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
      if (8 === e.nodeType) {
        var n = e.data;
        if (n === ua || n === fa || n === da) {
          if (0 === t) return e;
          t--;
        } else n === ca && t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  function sd(e) {
    var t = e[ya];
    if (t) return t;
    for (var n = e.parentNode; n; ) {
      if ((t = n[wa] || n[ya])) {
        if (
          ((n = t.alternate),
          null !== t.child || (null !== n && null !== n.child))
        )
          for (e = ad(e); null !== e; ) {
            if ((n = e[ya])) return n;
            e = ad(e);
          }
        return t;
      }
      n = (e = n).parentNode;
    }
    return null;
  }
  function ld(e) {
    return !(e = e[ya] || e[wa]) ||
      (5 !== e.tag && 6 !== e.tag && 13 !== e.tag && 3 !== e.tag)
      ? null
      : e;
  }
  function ud(e) {
    if (5 === e.tag || 6 === e.tag) return e.stateNode;
    throw Error(Du(33));
  }
  function cd(e) {
    return e[ba] || null;
  }
  function dd(e) {
    do {
      e = e.return;
    } while (e && 5 !== e.tag);
    return e || null;
  }
  function fd(e, t) {
    var n = e.stateNode;
    if (!n) return null;
    var r = No(n);
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
    if (n && "function" != typeof n) throw Error(Du(231, t, typeof n));
    return n;
  }
  function pd(e, t, n) {
    (t = fd(e, n.dispatchConfig.phasedRegistrationNames[t])) &&
      ((n._dispatchListeners = bc(n._dispatchListeners, t)),
      (n._dispatchInstances = bc(n._dispatchInstances, e)));
  }
  function hd(e) {
    if (e && e.dispatchConfig.phasedRegistrationNames) {
      for (var t = e._targetInst, n = []; t; ) n.push(t), (t = dd(t));
      for (t = n.length; 0 < t--; ) pd(n[t], "captured", e);
      for (t = 0; t < n.length; t++) pd(n[t], "bubbled", e);
    }
  }
  function gd(e, t, n) {
    e &&
      n &&
      n.dispatchConfig.registrationName &&
      (t = fd(e, n.dispatchConfig.registrationName)) &&
      ((n._dispatchListeners = bc(n._dispatchListeners, t)),
      (n._dispatchInstances = bc(n._dispatchInstances, e)));
  }
  function md(e) {
    e && e.dispatchConfig.registrationName && gd(e._targetInst, null, e);
  }
  function vd(e) {
    wc(e, hd);
  }
  function yd() {
    if (Sa) return Sa;
    var e,
      t,
      n = xa,
      r = n.length,
      o = "value" in _a ? _a.value : _a.textContent,
      i = o.length;
    for (e = 0; e < r && n[e] === o[e]; e++);
    var a = r - e;
    for (t = 1; t <= a && n[r - t] === o[i - t]; t++);
    return (Sa = o.slice(e, 1 < t ? 1 - t : void 0));
  }
  function bd() {
    return !0;
  }
  function wd() {
    return !1;
  }
  function _d(e, t, n, r) {
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
        ? bd
        : wd),
      (this.isPropagationStopped = wd),
      this
    );
  }
  function xd(e, t, n, r) {
    if (this.eventPool.length) {
      var o = this.eventPool.pop();
      return this.call(o, e, t, n, r), o;
    }
    return new this(e, t, n, r);
  }
  function Sd(e) {
    if (!(e instanceof this)) throw Error(Du(279));
    e.destructor(), 10 > this.eventPool.length && this.eventPool.push(e);
  }
  function Pd(e) {
    (e.eventPool = []), (e.getPooled = xd), (e.release = Sd);
  }
  function kd(e, t) {
    switch (e) {
      case "keyup":
        return -1 !== Da.indexOf(t.keyCode);
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
  function Dd(e) {
    return "object" == typeof (e = e.detail) && "data" in e ? e.data : null;
  }
  function Id(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return "input" === t ? !!Ua[e.type] : "textarea" === t;
  }
  function Ed(e, t, n) {
    return (
      ((e = _d.getPooled(Na.change, e, t, n)).type = "change"), Mu(n), vd(e), e
    );
  }
  function Td(e) {
    xc(e);
  }
  function Cd(e) {
    if (Yu(ud(e))) return e;
  }
  function Fd(e, t) {
    if ("change" === e) return t;
  }
  function Ad() {
    Ba && (Ba.detachEvent("onpropertychange", Od), (ja = Ba = null));
  }
  function Od(e) {
    if ("value" === e.propertyName && Cd(ja))
      if (((e = Ed(ja, e, Sc(e))), Ko)) xc(e);
      else {
        Ko = !0;
        try {
          Uu(Td, e);
        } finally {
          (Ko = !1), ju();
        }
      }
  }
  function Md(e, t, n) {
    "focus" === e
      ? (Ad(), (ja = n), (Ba = t).attachEvent("onpropertychange", Od))
      : "blur" === e && Ad();
  }
  function Rd(e) {
    if ("selectionchange" === e || "keyup" === e || "keydown" === e)
      return Cd(ja);
  }
  function Ud(e, t) {
    if ("click" === e) return Cd(t);
  }
  function Nd(e, t) {
    if ("input" === e || "change" === e) return Cd(t);
  }
  function Bd(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : !!(e = za[e]) && !!t[e];
  }
  function jd() {
    return Bd;
  }
  function Ld(e, t) {
    return (e === t && (0 !== e || 1 / e == 1 / t)) || (e != e && t != t);
  }
  function Vd(e, t) {
    if (Xa(e, t)) return !0;
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
      if (!Za.call(t, n[r]) || !Xa(e[n[r]], t[n[r]])) return !1;
    return !0;
  }
  function $d(e, t) {
    var n =
      t.window === t ? t.document : 9 === t.nodeType ? t : t.ownerDocument;
    return is || null == ns || ns !== Kc(n)
      ? null
      : ("selectionStart" in (n = ns) && nd(n)
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
        os && Vd(os, n)
          ? null
          : ((os = n),
            ((e = _d.getPooled(ts.select, rs, e, t)).type = "select"),
            (e.target = ns),
            vd(e),
            e));
  }
  function zd(e) {
    var t = e.keyCode;
    return (
      "charCode" in e
        ? 0 === (e = e.charCode) && 13 === t && (e = 13)
        : (e = t),
      10 === e && (e = 13),
      32 <= e || 13 === e ? e : 0
    );
  }
  function Hd(e) {
    0 > bs || ((e.current = ys[bs]), (ys[bs] = null), bs--);
  }
  function qd(e, t) {
    bs++, (ys[bs] = e.current), (e.current = t);
  }
  function Gd(e, t) {
    var n = e.type.contextTypes;
    if (!n) return ws;
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
  function Wd(e) {
    return null != (e = e.childContextTypes);
  }
  function Jd() {
    Hd(xs), Hd(_s);
  }
  function Qd(e, t, n) {
    if (_s.current !== ws) throw Error(Du(168));
    qd(_s, t), qd(xs, n);
  }
  function Yd(e, t, n) {
    var r = e.stateNode;
    if (((e = t.childContextTypes), "function" != typeof r.getChildContext))
      return n;
    for (var o in (r = r.getChildContext()))
      if (!(o in e)) throw Error(Du(108, qu(t) || "Unknown", o));
    return Fo({}, n, {}, r);
  }
  function Kd(e) {
    return (
      (e =
        ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) ||
        ws),
      (Ss = _s.current),
      qd(_s, e),
      qd(xs, xs.current),
      !0
    );
  }
  function Xd(e, t, n) {
    var r = e.stateNode;
    if (!r) throw Error(Du(169));
    n
      ? ((e = Yd(e, t, Ss)),
        (r.__reactInternalMemoizedMergedChildContext = e),
        Hd(xs),
        Hd(_s),
        qd(_s, e))
      : Hd(xs),
      qd(xs, n);
  }
  function Zd() {
    switch (Ts()) {
      case Cs:
        return 99;
      case Fs:
        return 98;
      case As:
        return 97;
      case Os:
        return 96;
      case Ms:
        return 95;
      default:
        throw Error(Du(332));
    }
  }
  function ef(e) {
    switch (e) {
      case 99:
        return Cs;
      case 98:
        return Fs;
      case 97:
        return As;
      case 96:
        return Os;
      case 95:
        return Ms;
      default:
        throw Error(Du(332));
    }
  }
  function tf(e, t) {
    return (e = ef(e)), Ps(e, t);
  }
  function nf(e, t, n) {
    return (e = ef(e)), ks(e, t, n);
  }
  function rf(e) {
    return null === Bs ? ((Bs = [e]), (js = ks(Cs, af))) : Bs.push(e), Rs;
  }
  function of() {
    if (null !== js) {
      var e = js;
      (js = null), Ds(e);
    }
    af();
  }
  function af() {
    if (!Ls && null !== Bs) {
      Ls = !0;
      var e = 0;
      try {
        var t = Bs;
        tf(99, function () {
          for (; e < t.length; e++) {
            var n = t[e];
            do {
              n = n(!0);
            } while (null !== n);
          }
        }),
          (Bs = null);
      } catch (t) {
        throw (null !== Bs && (Bs = Bs.slice(e + 1)), ks(Cs, of), t);
      } finally {
        Ls = !1;
      }
    }
  }
  function sf(e, t, n) {
    return 1073741821 - (1 + (((1073741821 - e + t / 10) / (n /= 10)) | 0)) * n;
  }
  function lf(e, t) {
    if (e && e.defaultProps)
      for (var n in ((t = Fo({}, t)), (e = e.defaultProps)))
        void 0 === t[n] && (t[n] = e[n]);
    return t;
  }
  function uf() {
    Gs = qs = Hs = null;
  }
  function cf(e) {
    var t = zs.current;
    Hd(zs), (e.type._context._currentValue = t);
  }
  function df(e, t) {
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
  function ff(e, t) {
    (Hs = e),
      (Gs = qs = null),
      null !== (e = e.dependencies) &&
        null !== e.firstContext &&
        (e.expirationTime >= t && (wl = !0), (e.firstContext = null));
  }
  function pf(e, t) {
    if (Gs !== e && !1 !== t && 0 !== t)
      if (
        (("number" == typeof t && 1073741823 !== t) ||
          ((Gs = e), (t = 1073741823)),
        (t = { context: e, observedBits: t, next: null }),
        null === qs)
      ) {
        if (null === Hs) throw Error(Du(308));
        (qs = t),
          (Hs.dependencies = {
            expirationTime: 0,
            firstContext: t,
            responders: null,
          });
      } else qs = qs.next = t;
    return e._currentValue;
  }
  function hf(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      baseQueue: null,
      shared: { pending: null },
      effects: null,
    };
  }
  function gf(e, t) {
    (e = e.updateQueue),
      t.updateQueue === e &&
        (t.updateQueue = {
          baseState: e.baseState,
          baseQueue: e.baseQueue,
          shared: e.shared,
          effects: e.effects,
        });
  }
  function mf(e, t) {
    return ((e = {
      expirationTime: e,
      suspenseConfig: t,
      tag: 0,
      payload: null,
      callback: null,
      next: null,
    }).next = e);
  }
  function vf(e, t) {
    if (null !== (e = e.updateQueue)) {
      var n = (e = e.shared).pending;
      null === n ? (t.next = t) : ((t.next = n.next), (n.next = t)),
        (e.pending = t);
    }
  }
  function yf(e, t) {
    var n = e.alternate;
    null !== n && gf(n, e),
      null === (n = (e = e.updateQueue).baseQueue)
        ? ((e.baseQueue = t.next = t), (t.next = t))
        : ((t.next = n.next), (n.next = t));
  }
  function bf(e, t, n, r) {
    var o = e.updateQueue;
    Ws = !1;
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
              ah(a, p.suspenseConfig);
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
                  l = Fo({}, l, a);
                  break e;
                case 2:
                  Ws = !0;
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
        sh(u),
        (e.expirationTime = u),
        (e.memoizedState = l);
    }
  }
  function wf(e, t, n) {
    if (((e = t.effects), (t.effects = null), null !== e))
      for (t = 0; t < e.length; t++) {
        var r = e[t],
          o = r.callback;
        if (null !== o) {
          if (((r.callback = null), (r = o), (o = n), "function" != typeof r))
            throw Error(Du(191, r));
          r.call(o);
        }
      }
  }
  function _f(e, t, n, r) {
    (n = null == (n = n(r, (t = e.memoizedState))) ? t : Fo({}, t, n)),
      (e.memoizedState = n),
      0 === e.expirationTime && (e.updateQueue.baseState = n);
  }
  function xf(e, t, n, r, o, i, a) {
    return "function" == typeof (e = e.stateNode).shouldComponentUpdate
      ? e.shouldComponentUpdate(r, i, a)
      : !t.prototype ||
          !t.prototype.isPureReactComponent ||
          !Vd(n, r) ||
          !Vd(o, i);
  }
  function Sf(e, t, n) {
    var r = !1,
      o = ws,
      i = t.contextType;
    return (
      "object" == typeof i && null !== i
        ? (i = pf(i))
        : ((o = Wd(t) ? Ss : _s.current),
          (i = (r = null != (r = t.contextTypes)) ? Gd(e, o) : ws)),
      (t = new t(n, i)),
      (e.memoizedState =
        null !== t.state && void 0 !== t.state ? t.state : null),
      (t.updater = Ys),
      (e.stateNode = t),
      (t._reactInternalFiber = e),
      r &&
        (((e = e.stateNode).__reactInternalMemoizedUnmaskedChildContext = o),
        (e.__reactInternalMemoizedMaskedChildContext = i)),
      t
    );
  }
  function Pf(e, t, n, r) {
    (e = t.state),
      "function" == typeof t.componentWillReceiveProps &&
        t.componentWillReceiveProps(n, r),
      "function" == typeof t.UNSAFE_componentWillReceiveProps &&
        t.UNSAFE_componentWillReceiveProps(n, r),
      t.state !== e && Ys.enqueueReplaceState(t, t.state, null);
  }
  function kf(e, t, n, r) {
    var o = e.stateNode;
    (o.props = n), (o.state = e.memoizedState), (o.refs = Qs), hf(e);
    var i = t.contextType;
    "object" == typeof i && null !== i
      ? (o.context = pf(i))
      : ((i = Wd(t) ? Ss : _s.current), (o.context = Gd(e, i))),
      bf(e, n, o, r),
      (o.state = e.memoizedState),
      "function" == typeof (i = t.getDerivedStateFromProps) &&
        (_f(e, t, i, n), (o.state = e.memoizedState)),
      "function" == typeof t.getDerivedStateFromProps ||
        "function" == typeof o.getSnapshotBeforeUpdate ||
        ("function" != typeof o.UNSAFE_componentWillMount &&
          "function" != typeof o.componentWillMount) ||
        ((t = o.state),
        "function" == typeof o.componentWillMount && o.componentWillMount(),
        "function" == typeof o.UNSAFE_componentWillMount &&
          o.UNSAFE_componentWillMount(),
        t !== o.state && Ys.enqueueReplaceState(o, o.state, null),
        bf(e, n, o, r),
        (o.state = e.memoizedState)),
      "function" == typeof o.componentDidMount && (e.effectTag |= 4);
  }
  function Df(e, t, n) {
    if (
      null !== (e = n.ref) &&
      "function" != typeof e &&
      "object" != typeof e
    ) {
      if (n._owner) {
        if ((n = n._owner)) {
          if (1 !== n.tag) throw Error(Du(309));
          var r = n.stateNode;
        }
        if (!r) throw Error(Du(147, e));
        var o = "" + e;
        return null !== t &&
          null !== t.ref &&
          "function" == typeof t.ref &&
          t.ref._stringRef === o
          ? t.ref
          : (((t = function (e) {
              var t = r.refs;
              t === Qs && (t = r.refs = {}),
                null === e ? delete t[o] : (t[o] = e);
            })._stringRef = o),
            t);
      }
      if ("string" != typeof e) throw Error(Du(284));
      if (!n._owner) throw Error(Du(290, e));
    }
    return e;
  }
  function If(e, t) {
    if ("textarea" !== e.type)
      throw Error(
        Du(
          31,
          "[object Object]" === Object.prototype.toString.call(t)
            ? "object with keys {" + Object.keys(t).join(", ") + "}"
            : t,
          ""
        )
      );
  }
  function Ef(e) {
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
      return ((e = kh(e, t)).index = 0), (e.sibling = null), e;
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
        ? (((t = Eh(n, e.mode, r)).return = e), t)
        : (((t = o(t, n)).return = e), t);
    }
    function l(e, t, n, r) {
      return null !== t && t.elementType === n.type
        ? (((r = o(t, n.props)).ref = Df(e, t, n)), (r.return = e), r)
        : (((r = Dh(n.type, n.key, n.props, null, e.mode, r)).ref = Df(
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
        ? (((t = Th(n, e.mode, r)).return = e), t)
        : (((t = o(t, n.children || [])).return = e), t);
    }
    function c(e, t, n, r, i) {
      return null === t || 7 !== t.tag
        ? (((t = Ih(n, e.mode, r, i)).return = e), t)
        : (((t = o(t, n)).return = e), t);
    }
    function d(e, t, n) {
      if ("string" == typeof t || "number" == typeof t)
        return ((t = Eh("" + t, e.mode, n)).return = e), t;
      if ("object" == typeof t && null !== t) {
        switch (t.$$typeof) {
          case li:
            return (
              ((n = Dh(t.type, t.key, t.props, null, e.mode, n)).ref = Df(
                e,
                null,
                t
              )),
              (n.return = e),
              n
            );
          case ui:
            return ((t = Th(t, e.mode, n)).return = e), t;
        }
        if (Ks(t) || Hu(t)) return ((t = Ih(t, e.mode, n, null)).return = e), t;
        If(e, t);
      }
      return null;
    }
    function f(e, t, n, r) {
      var o = null !== t ? t.key : null;
      if ("string" == typeof n || "number" == typeof n)
        return null !== o ? null : s(e, t, "" + n, r);
      if ("object" == typeof n && null !== n) {
        switch (n.$$typeof) {
          case li:
            return n.key === o
              ? n.type === ci
                ? c(e, t, n.props.children, r, o)
                : l(e, t, n, r)
              : null;
          case ui:
            return n.key === o ? u(e, t, n, r) : null;
        }
        if (Ks(n) || Hu(n)) return null !== o ? null : c(e, t, n, r, null);
        If(e, n);
      }
      return null;
    }
    function p(e, t, n, r, o) {
      if ("string" == typeof r || "number" == typeof r)
        return s(t, (e = e.get(n) || null), "" + r, o);
      if ("object" == typeof r && null !== r) {
        switch (r.$$typeof) {
          case li:
            return (
              (e = e.get(null === r.key ? n : r.key) || null),
              r.type === ci
                ? c(t, e, r.props.children, o, r.key)
                : l(t, e, r, o)
            );
          case ui:
            return u(t, (e = e.get(null === r.key ? n : r.key) || null), r, o);
        }
        if (Ks(r) || Hu(r)) return c(t, (e = e.get(n) || null), r, o, null);
        If(t, r);
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
      var u = Hu(s);
      if ("function" != typeof u) throw Error(Du(150));
      if (null == (s = u.call(s))) throw Error(Du(151));
      for (
        var c = (u = null), h = a, g = (a = 0), m = null, v = s.next();
        null !== h && !v.done;
        g++, v = s.next()
      ) {
        h.index > g ? ((m = h), (h = null)) : (m = h.sibling);
        var y = f(o, h, v.value, l);
        if (null === y) {
          null === h && (h = m);
          break;
        }
        e && h && null === y.alternate && t(o, h),
          (a = i(y, a, g)),
          null === c ? (u = y) : (c.sibling = y),
          (c = y),
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
        "object" == typeof i && null !== i && i.type === ci && null === i.key;
      l && (i = i.props.children);
      var u = "object" == typeof i && null !== i;
      if (u)
        switch (i.$$typeof) {
          case li:
            e: {
              for (u = i.key, l = r; null !== l; ) {
                if (l.key === u) {
                  switch (l.tag) {
                    case 7:
                      if (i.type === ci) {
                        n(e, l.sibling),
                          ((r = o(l, i.props.children)).return = e),
                          (e = r);
                        break e;
                      }
                      break;
                    default:
                      if (l.elementType === i.type) {
                        n(e, l.sibling),
                          ((r = o(l, i.props)).ref = Df(e, l, i)),
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
              i.type === ci
                ? (((r = Ih(i.props.children, e.mode, s, i.key)).return = e),
                  (e = r))
                : (((s = Dh(i.type, i.key, i.props, null, e.mode, s)).ref = Df(
                    e,
                    r,
                    i
                  )),
                  (s.return = e),
                  (e = s));
            }
            return a(e);
          case ui:
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
              ((r = Th(i, e.mode, s)).return = e), (e = r);
            }
            return a(e);
        }
      if ("string" == typeof i || "number" == typeof i)
        return (
          (i = "" + i),
          null !== r && 6 === r.tag
            ? (n(e, r.sibling), ((r = o(r, i)).return = e), (e = r))
            : (n(e, r), ((r = Eh(i, e.mode, s)).return = e), (e = r)),
          a(e)
        );
      if (Ks(i)) return h(e, r, i, s);
      if (Hu(i)) return g(e, r, i, s);
      if ((u && If(e, i), void 0 === i && !l))
        switch (e.tag) {
          case 1:
          case 0:
            throw (
              ((e = e.type),
              Error(Du(152, e.displayName || e.name || "Component")))
            );
        }
      return n(e, r);
    };
  }
  function Tf(e) {
    if (e === el) throw Error(Du(174));
    return e;
  }
  function Cf(e, t) {
    switch ((qd(rl, t), qd(nl, e), qd(tl, el), (e = t.nodeType))) {
      case 9:
      case 11:
        t = (t = t.documentElement) ? t.namespaceURI : cc(null, "");
        break;
      default:
        t = cc(
          (t = (e = 8 === e ? t.parentNode : t).namespaceURI || null),
          (e = e.tagName)
        );
    }
    Hd(tl), qd(tl, t);
  }
  function Ff() {
    Hd(tl), Hd(nl), Hd(rl);
  }
  function Af(e) {
    Tf(rl.current);
    var t = Tf(tl.current),
      n = cc(t, e.type);
    t !== n && (qd(nl, e), qd(tl, n));
  }
  function Of(e) {
    nl.current === e && (Hd(tl), Hd(nl));
  }
  function Mf(e) {
    for (var t = e; null !== t; ) {
      if (13 === t.tag) {
        var n = t.memoizedState;
        if (
          null !== n &&
          (null === (n = n.dehydrated) || n.data === da || n.data === fa)
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
  function Rf(e, t) {
    return { responder: e, props: t };
  }
  function Uf() {
    throw Error(Du(321));
  }
  function Nf(e, t) {
    if (null === t) return !1;
    for (var n = 0; n < t.length && n < e.length; n++)
      if (!Xa(e[n], t[n])) return !1;
    return !0;
  }
  function Bf(e, t, n, r, o, i) {
    if (
      ((sl = i),
      (ll = t),
      (t.memoizedState = null),
      (t.updateQueue = null),
      (t.expirationTime = 0),
      (il.current = null === e || null === e.memoizedState ? pl : hl),
      (e = n(r, o)),
      t.expirationTime === sl)
    ) {
      i = 0;
      do {
        if (((t.expirationTime = 0), !(25 > i))) throw Error(Du(301));
        (i += 1),
          (cl = ul = null),
          (t.updateQueue = null),
          (il.current = gl),
          (e = n(r, o));
      } while (t.expirationTime === sl);
    }
    if (
      ((il.current = fl),
      (t = null !== ul && null !== ul.next),
      (sl = 0),
      (cl = ul = ll = null),
      (dl = !1),
      t)
    )
      throw Error(Du(300));
    return e;
  }
  function jf() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null,
    };
    return null === cl ? (ll.memoizedState = cl = e) : (cl = cl.next = e), cl;
  }
  function Lf() {
    if (null === ul) {
      var e = ll.alternate;
      e = null !== e ? e.memoizedState : null;
    } else e = ul.next;
    var t = null === cl ? ll.memoizedState : cl.next;
    if (null !== t) (cl = t), (ul = e);
    else {
      if (null === e) throw Error(Du(310));
      (e = {
        memoizedState: (ul = e).memoizedState,
        baseState: ul.baseState,
        baseQueue: ul.baseQueue,
        queue: ul.queue,
        next: null,
      }),
        null === cl ? (ll.memoizedState = cl = e) : (cl = cl.next = e);
    }
    return cl;
  }
  function Vf(e, t) {
    return "function" == typeof t ? t(e) : t;
  }
  function $f(e) {
    var t = Lf(),
      n = t.queue;
    if (null === n) throw Error(Du(311));
    n.lastRenderedReducer = e;
    var r = ul,
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
        if (u < sl) {
          var c = {
            expirationTime: l.expirationTime,
            suspenseConfig: l.suspenseConfig,
            action: l.action,
            eagerReducer: l.eagerReducer,
            eagerState: l.eagerState,
            next: null,
          };
          null === s ? ((a = s = c), (i = r)) : (s = s.next = c),
            u > ll.expirationTime && ((ll.expirationTime = u), sh(u));
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
            ah(u, l.suspenseConfig),
            (r = l.eagerReducer === e ? l.eagerState : e(r, l.action));
        l = l.next;
      } while (null !== l && l !== o);
      null === s ? (i = r) : (s.next = a),
        Xa(r, t.memoizedState) || (wl = !0),
        (t.memoizedState = r),
        (t.baseState = i),
        (t.baseQueue = s),
        (n.lastRenderedState = r);
    }
    return [t.memoizedState, n.dispatch];
  }
  function zf(e) {
    var t = Lf(),
      n = t.queue;
    if (null === n) throw Error(Du(311));
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
      Xa(i, t.memoizedState) || (wl = !0),
        (t.memoizedState = i),
        null === t.baseQueue && (t.baseState = i),
        (n.lastRenderedState = i);
    }
    return [i, r];
  }
  function Hf(e) {
    var t = jf();
    return (
      "function" == typeof e && (e = e()),
      (t.memoizedState = t.baseState = e),
      (e = (e = t.queue =
        {
          pending: null,
          dispatch: null,
          lastRenderedReducer: Vf,
          lastRenderedState: e,
        }).dispatch =
        ip.bind(null, ll, e)),
      [t.memoizedState, e]
    );
  }
  function qf(e, t, n, r) {
    return (
      (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
      null === (t = ll.updateQueue)
        ? ((t = { lastEffect: null }),
          (ll.updateQueue = t),
          (t.lastEffect = e.next = e))
        : null === (n = t.lastEffect)
        ? (t.lastEffect = e.next = e)
        : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e)),
      e
    );
  }
  function Gf() {
    return Lf().memoizedState;
  }
  function Wf(e, t, n, r) {
    var o = jf();
    (ll.effectTag |= e),
      (o.memoizedState = qf(1 | t, n, void 0, void 0 === r ? null : r));
  }
  function Jf(e, t, n, r) {
    var o = Lf();
    r = void 0 === r ? null : r;
    var i = void 0;
    if (null !== ul) {
      var a = ul.memoizedState;
      if (((i = a.destroy), null !== r && Nf(r, a.deps)))
        return void qf(t, n, i, r);
    }
    (ll.effectTag |= e), (o.memoizedState = qf(1 | t, n, i, r));
  }
  function Qf(e, t) {
    return Wf(516, 4, e, t);
  }
  function Yf(e, t) {
    return Jf(516, 4, e, t);
  }
  function Kf(e, t) {
    return Jf(4, 2, e, t);
  }
  function Xf(e, t) {
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
  function Zf(e, t, n) {
    return (
      (n = null != n ? n.concat([e]) : null), Jf(4, 2, Xf.bind(null, t, e), n)
    );
  }
  function ep() {}
  function tp(e, t) {
    return (jf().memoizedState = [e, void 0 === t ? null : t]), e;
  }
  function np(e, t) {
    var n = Lf();
    t = void 0 === t ? null : t;
    var r = n.memoizedState;
    return null !== r && null !== t && Nf(t, r[1])
      ? r[0]
      : ((n.memoizedState = [e, t]), e);
  }
  function rp(e, t) {
    var n = Lf();
    t = void 0 === t ? null : t;
    var r = n.memoizedState;
    return null !== r && null !== t && Nf(t, r[1])
      ? r[0]
      : ((e = e()), (n.memoizedState = [e, t]), e);
  }
  function op(e, t, n) {
    var r = Zd();
    tf(98 > r ? 98 : r, function () {
      e(!0);
    }),
      tf(97 < r ? 97 : r, function () {
        var r = al.suspense;
        al.suspense = void 0 === t ? null : t;
        try {
          e(!1), n();
        } finally {
          al.suspense = r;
        }
      });
  }
  function ip(e, t, n) {
    var r = Wp(),
      o = Js.suspense;
    o = {
      expirationTime: (r = Jp(r, e, o)),
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
      e === ll || (null !== i && i === ll))
    )
      (dl = !0), (o.expirationTime = sl), (ll.expirationTime = sl);
    else {
      if (
        0 === e.expirationTime &&
        (null === i || 0 === i.expirationTime) &&
        null !== (i = t.lastRenderedReducer)
      )
        try {
          var a = t.lastRenderedState,
            s = i(a, n);
          if (((o.eagerReducer = i), (o.eagerState = s), Xa(s, a))) return;
        } catch (e) {}
      Qp(e, r);
    }
  }
  function ap(e, t) {
    var n = Sh(5, null, null, 0);
    (n.elementType = "DELETED"),
      (n.type = "DELETED"),
      (n.stateNode = t),
      (n.return = e),
      (n.effectTag = 8),
      null !== e.lastEffect
        ? ((e.lastEffect.nextEffect = n), (e.lastEffect = n))
        : (e.firstEffect = e.lastEffect = n);
  }
  function sp(e, t) {
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
  function lp(e) {
    if (yl) {
      var t = vl;
      if (t) {
        var n = t;
        if (!sp(e, t)) {
          if (!(t = id(n.nextSibling)) || !sp(e, t))
            return (
              (e.effectTag = (-1025 & e.effectTag) | 2),
              (yl = !1),
              void (ml = e)
            );
          ap(ml, n);
        }
        (ml = e), (vl = id(t.firstChild));
      } else (e.effectTag = (-1025 & e.effectTag) | 2), (yl = !1), (ml = e);
    }
  }
  function up(e) {
    for (
      e = e.return;
      null !== e && 5 !== e.tag && 3 !== e.tag && 13 !== e.tag;

    )
      e = e.return;
    ml = e;
  }
  function cp(e) {
    if (e !== ml) return !1;
    if (!yl) return up(e), (yl = !0), !1;
    var t = e.type;
    if (
      5 !== e.tag ||
      ("head" !== t && "body" !== t && !od(t, e.memoizedProps))
    )
      for (t = vl; t; ) ap(e, t), (t = id(t.nextSibling));
    if ((up(e), 13 === e.tag)) {
      if (!(e = null !== (e = e.memoizedState) ? e.dehydrated : null))
        throw Error(Du(317));
      e: {
        for (e = e.nextSibling, t = 0; e; ) {
          if (8 === e.nodeType) {
            var n = e.data;
            if (n === ca) {
              if (0 === t) {
                vl = id(e.nextSibling);
                break e;
              }
              t--;
            } else (n !== ua && n !== fa && n !== da) || t++;
          }
          e = e.nextSibling;
        }
        vl = null;
      }
    } else vl = ml ? id(e.stateNode.nextSibling) : null;
    return !0;
  }
  function dp() {
    (vl = ml = null), (yl = !1);
  }
  function fp(e, t, n, r) {
    t.child = null === e ? Zs(t, null, n, r) : Xs(t, e.child, n, r);
  }
  function pp(e, t, n, r, o) {
    n = n.render;
    var i = t.ref;
    return (
      ff(t, o),
      (r = Bf(e, t, n, r, i, o)),
      null === e || wl
        ? ((t.effectTag |= 1), fp(e, t, r, o), t.child)
        : ((t.updateQueue = e.updateQueue),
          (t.effectTag &= -517),
          e.expirationTime <= o && (e.expirationTime = 0),
          kp(e, t, o))
    );
  }
  function hp(e, t, n, r, o, i) {
    if (null === e) {
      var a = n.type;
      return "function" != typeof a ||
        Ph(a) ||
        void 0 !== a.defaultProps ||
        null !== n.compare ||
        void 0 !== n.defaultProps
        ? (((e = Dh(n.type, null, r, null, t.mode, i)).ref = t.ref),
          (e.return = t),
          (t.child = e))
        : ((t.tag = 15), (t.type = a), gp(e, t, a, r, o, i));
    }
    return (
      (a = e.child),
      o < i &&
      ((o = a.memoizedProps),
      (n = null !== (n = n.compare) ? n : Vd)(o, r) && e.ref === t.ref)
        ? kp(e, t, i)
        : ((t.effectTag |= 1),
          ((e = kh(a, r)).ref = t.ref),
          (e.return = t),
          (t.child = e))
    );
  }
  function gp(e, t, n, r, o, i) {
    return null !== e &&
      Vd(e.memoizedProps, r) &&
      e.ref === t.ref &&
      ((wl = !1), o < i)
      ? ((t.expirationTime = e.expirationTime), kp(e, t, i))
      : vp(e, t, n, r, i);
  }
  function mp(e, t) {
    var n = t.ref;
    ((null === e && null !== n) || (null !== e && e.ref !== n)) &&
      (t.effectTag |= 128);
  }
  function vp(e, t, n, r, o) {
    var i = Wd(n) ? Ss : _s.current;
    return (
      (i = Gd(t, i)),
      ff(t, o),
      (n = Bf(e, t, n, r, i, o)),
      null === e || wl
        ? ((t.effectTag |= 1), fp(e, t, n, o), t.child)
        : ((t.updateQueue = e.updateQueue),
          (t.effectTag &= -517),
          e.expirationTime <= o && (e.expirationTime = 0),
          kp(e, t, o))
    );
  }
  function yp(e, t, n, r, o) {
    if (Wd(n)) {
      var i = !0;
      Kd(t);
    } else i = !1;
    if ((ff(t, o), null === t.stateNode))
      null !== e &&
        ((e.alternate = null), (t.alternate = null), (t.effectTag |= 2)),
        Sf(t, n, r),
        kf(t, n, r, o),
        (r = !0);
    else if (null === e) {
      var a = t.stateNode,
        s = t.memoizedProps;
      a.props = s;
      var l = a.context,
        u = n.contextType;
      "object" == typeof u && null !== u
        ? (u = pf(u))
        : (u = Gd(t, (u = Wd(n) ? Ss : _s.current)));
      var c = n.getDerivedStateFromProps,
        d =
          "function" == typeof c ||
          "function" == typeof a.getSnapshotBeforeUpdate;
      d ||
        ("function" != typeof a.UNSAFE_componentWillReceiveProps &&
          "function" != typeof a.componentWillReceiveProps) ||
        ((s !== r || l !== u) && Pf(t, a, r, u)),
        (Ws = !1);
      var f = t.memoizedState;
      (a.state = f),
        bf(t, r, a, o),
        (l = t.memoizedState),
        s !== r || f !== l || xs.current || Ws
          ? ("function" == typeof c && (_f(t, n, c, r), (l = t.memoizedState)),
            (s = Ws || xf(t, n, s, r, f, l, u))
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
        gf(e, t),
        (s = t.memoizedProps),
        (a.props = t.type === t.elementType ? s : lf(t.type, s)),
        (l = a.context),
        "object" == typeof (u = n.contextType) && null !== u
          ? (u = pf(u))
          : (u = Gd(t, (u = Wd(n) ? Ss : _s.current))),
        (d =
          "function" == typeof (c = n.getDerivedStateFromProps) ||
          "function" == typeof a.getSnapshotBeforeUpdate) ||
          ("function" != typeof a.UNSAFE_componentWillReceiveProps &&
            "function" != typeof a.componentWillReceiveProps) ||
          ((s !== r || l !== u) && Pf(t, a, r, u)),
        (Ws = !1),
        (l = t.memoizedState),
        (a.state = l),
        bf(t, r, a, o),
        (f = t.memoizedState),
        s !== r || l !== f || xs.current || Ws
          ? ("function" == typeof c && (_f(t, n, c, r), (f = t.memoizedState)),
            (c = Ws || xf(t, n, s, r, l, f, u))
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
    return bp(e, t, n, r, i, o);
  }
  function bp(e, t, n, r, o, i) {
    mp(e, t);
    var a = 0 != (64 & t.effectTag);
    if (!r && !a) return o && Xd(t, n, !1), kp(e, t, i);
    (r = t.stateNode), (bl.current = t);
    var s =
      a && "function" != typeof n.getDerivedStateFromError ? null : r.render();
    return (
      (t.effectTag |= 1),
      null !== e && a
        ? ((t.child = Xs(t, e.child, null, i)), (t.child = Xs(t, null, s, i)))
        : fp(e, t, s, i),
      (t.memoizedState = r.state),
      o && Xd(t, n, !0),
      t.child
    );
  }
  function wp(e) {
    var t = e.stateNode;
    t.pendingContext
      ? Qd(0, t.pendingContext, t.pendingContext !== t.context)
      : t.context && Qd(0, t.context, !1),
      Cf(e, t.containerInfo);
  }
  function _p(e, t, n) {
    var r,
      o = t.mode,
      i = t.pendingProps,
      a = ol.current,
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
      qd(ol, 1 & a),
      null === e)
    ) {
      if ((void 0 !== i.fallback && lp(t), s)) {
        if (
          ((s = i.fallback),
          ((i = Ih(null, o, 0, null)).return = t),
          0 == (2 & t.mode))
        )
          for (
            e = null !== t.memoizedState ? t.child.child : t.child, i.child = e;
            null !== e;

          )
            (e.return = i), (e = e.sibling);
        return (
          ((n = Ih(s, o, n, null)).return = t),
          (i.sibling = n),
          (t.memoizedState = _l),
          (t.child = i),
          n
        );
      }
      return (
        (o = i.children),
        (t.memoizedState = null),
        (t.child = Zs(t, null, o, n))
      );
    }
    if (null !== e.memoizedState) {
      if (((o = (e = e.child).sibling), s)) {
        if (
          ((i = i.fallback),
          ((n = kh(e, e.pendingProps)).return = t),
          0 == (2 & t.mode) &&
            (s = null !== t.memoizedState ? t.child.child : t.child) !==
              e.child)
        )
          for (n.child = s; null !== s; ) (s.return = n), (s = s.sibling);
        return (
          ((o = kh(o, i)).return = t),
          (n.sibling = o),
          (n.childExpirationTime = 0),
          (t.memoizedState = _l),
          (t.child = n),
          o
        );
      }
      return (
        (n = Xs(t, e.child, i.children, n)),
        (t.memoizedState = null),
        (t.child = n)
      );
    }
    if (((e = e.child), s)) {
      if (
        ((s = i.fallback),
        ((i = Ih(null, o, 0, null)).return = t),
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
        ((n = Ih(s, o, n, null)).return = t),
        (i.sibling = n),
        (n.effectTag |= 2),
        (i.childExpirationTime = 0),
        (t.memoizedState = _l),
        (t.child = i),
        n
      );
    }
    return (t.memoizedState = null), (t.child = Xs(t, e, i.children, n));
  }
  function xp(e, t) {
    e.expirationTime < t && (e.expirationTime = t);
    var n = e.alternate;
    null !== n && n.expirationTime < t && (n.expirationTime = t),
      df(e.return, t);
  }
  function Sp(e, t, n, r, o, i) {
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
  function Pp(e, t, n) {
    var r = t.pendingProps,
      o = r.revealOrder,
      i = r.tail;
    if ((fp(e, t, r.children, n), 0 != (2 & (r = ol.current))))
      (r = (1 & r) | 2), (t.effectTag |= 64);
    else {
      if (null !== e && 0 != (64 & e.effectTag))
        e: for (e = t.child; null !== e; ) {
          if (13 === e.tag) null !== e.memoizedState && xp(e, n);
          else if (19 === e.tag) xp(e, n);
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
    if ((qd(ol, r), 0 == (2 & t.mode))) t.memoizedState = null;
    else
      switch (o) {
        case "forwards":
          for (n = t.child, o = null; null !== n; )
            null !== (e = n.alternate) && null === Mf(e) && (o = n),
              (n = n.sibling);
          null === (n = o)
            ? ((o = t.child), (t.child = null))
            : ((o = n.sibling), (n.sibling = null)),
            Sp(t, !1, o, n, i, t.lastEffect);
          break;
        case "backwards":
          for (n = null, o = t.child, t.child = null; null !== o; ) {
            if (null !== (e = o.alternate) && null === Mf(e)) {
              t.child = o;
              break;
            }
            (e = o.sibling), (o.sibling = n), (n = o), (o = e);
          }
          Sp(t, !0, n, null, i, t.lastEffect);
          break;
        case "together":
          Sp(t, !1, null, null, void 0, t.lastEffect);
          break;
        default:
          t.memoizedState = null;
      }
    return t.child;
  }
  function kp(e, t, n) {
    null !== e && (t.dependencies = e.dependencies);
    var r = t.expirationTime;
    if ((0 !== r && sh(r), t.childExpirationTime < n)) return null;
    if (null !== e && t.child !== e.child) throw Error(Du(153));
    if (null !== t.child) {
      for (
        n = kh((e = t.child), e.pendingProps), t.child = n, n.return = t;
        null !== e.sibling;

      )
        (e = e.sibling), ((n = n.sibling = kh(e, e.pendingProps)).return = t);
      n.sibling = null;
    }
    return t.child;
  }
  function Dp(e, t) {
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
  function Ip(e, t, n) {
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
        return Wd(t.type) && Jd(), null;
      case 3:
        return (
          Ff(),
          Hd(xs),
          Hd(_s),
          (n = t.stateNode).pendingContext &&
            ((n.context = n.pendingContext), (n.pendingContext = null)),
          (null !== e && null !== e.child) || !cp(t) || (t.effectTag |= 4),
          Sl(t),
          null
        );
      case 5:
        Of(t), (n = Tf(rl.current));
        var o = t.type;
        if (null !== e && null != t.stateNode)
          Pl(e, t, o, r, n), e.ref !== t.ref && (t.effectTag |= 128);
        else {
          if (!r) {
            if (null === t.stateNode) throw Error(Du(166));
            return null;
          }
          if (((e = Tf(tl.current)), cp(t))) {
            (r = t.stateNode), (o = t.type);
            var i = t.memoizedProps;
            switch (((r[ya] = t), (r[ba] = i), o)) {
              case "iframe":
              case "object":
              case "embed":
                jc("load", r);
                break;
              case "video":
              case "audio":
                for (e = 0; e < Oi.length; e++) jc(Oi[e], r);
                break;
              case "source":
                jc("error", r);
                break;
              case "img":
              case "image":
              case "link":
                jc("error", r), jc("load", r);
                break;
              case "form":
                jc("reset", r), jc("submit", r);
                break;
              case "details":
                jc("toggle", r);
                break;
              case "input":
                Xu(r, i), jc("invalid", r), Qc(n, "onChange");
                break;
              case "select":
                (r._wrapperState = { wasMultiple: !!i.multiple }),
                  jc("invalid", r),
                  Qc(n, "onChange");
                break;
              case "textarea":
                ac(r, i), jc("invalid", r), Qc(n, "onChange");
            }
            for (var a in (Wc(o, i), (e = null), i))
              if (i.hasOwnProperty(a)) {
                var s = i[a];
                "children" === a
                  ? "string" == typeof s
                    ? r.textContent !== s && (e = ["children", s])
                    : "number" == typeof s &&
                      r.textContent !== "" + s &&
                      (e = ["children", "" + s])
                  : Ho.hasOwnProperty(a) && null != s && Qc(n, a);
              }
            switch (o) {
              case "input":
                Qu(r), tc(r, i, !0);
                break;
              case "textarea":
                Qu(r), lc(r);
                break;
              case "select":
              case "option":
                break;
              default:
                "function" == typeof i.onClick && (r.onclick = Yc);
            }
            (n = e), (t.updateQueue = n), null !== n && (t.effectTag |= 4);
          } else {
            switch (
              ((a = 9 === n.nodeType ? n : n.ownerDocument),
              e === la && (e = uc(o)),
              e === la
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
              (e[ya] = t),
              (e[ba] = r),
              xl(e, t, !1, !1),
              (t.stateNode = e),
              (a = Jc(o, r)),
              o)
            ) {
              case "iframe":
              case "object":
              case "embed":
                jc("load", e), (s = r);
                break;
              case "video":
              case "audio":
                for (s = 0; s < Oi.length; s++) jc(Oi[s], e);
                s = r;
                break;
              case "source":
                jc("error", e), (s = r);
                break;
              case "img":
              case "image":
              case "link":
                jc("error", e), jc("load", e), (s = r);
                break;
              case "form":
                jc("reset", e), jc("submit", e), (s = r);
                break;
              case "details":
                jc("toggle", e), (s = r);
                break;
              case "input":
                Xu(e, r), (s = Ku(e, r)), jc("invalid", e), Qc(n, "onChange");
                break;
              case "option":
                s = rc(e, r);
                break;
              case "select":
                (e._wrapperState = { wasMultiple: !!r.multiple }),
                  (s = Fo({}, r, { value: void 0 })),
                  jc("invalid", e),
                  Qc(n, "onChange");
                break;
              case "textarea":
                ac(e, r), (s = ic(e, r)), jc("invalid", e), Qc(n, "onChange");
                break;
              default:
                s = r;
            }
            Wc(o, s);
            var l = s;
            for (i in l)
              if (l.hasOwnProperty(i)) {
                var u = l[i];
                "style" === i
                  ? Gc(e, u)
                  : "dangerouslySetInnerHTML" === i
                  ? null != (u = u ? u.__html : void 0) && ki(e, u)
                  : "children" === i
                  ? "string" == typeof u
                    ? ("textarea" !== o || "" !== u) && dc(e, u)
                    : "number" == typeof u && dc(e, "" + u)
                  : "suppressContentEditableWarning" !== i &&
                    "suppressHydrationWarning" !== i &&
                    "autoFocus" !== i &&
                    (Ho.hasOwnProperty(i)
                      ? null != u && Qc(n, i)
                      : null != u && zu(e, i, u, a));
              }
            switch (o) {
              case "input":
                Qu(e), tc(e, r, !1);
                break;
              case "textarea":
                Qu(e), lc(e);
                break;
              case "option":
                null != r.value && e.setAttribute("value", "" + Wu(r.value));
                break;
              case "select":
                (e.multiple = !!r.multiple),
                  null != (n = r.value)
                    ? oc(e, !!r.multiple, n, !1)
                    : null != r.defaultValue &&
                      oc(e, !!r.multiple, r.defaultValue, !0);
                break;
              default:
                "function" == typeof s.onClick && (e.onclick = Yc);
            }
            rd(o, r) && (t.effectTag |= 4);
          }
          null !== t.ref && (t.effectTag |= 128);
        }
        return null;
      case 6:
        if (e && null != t.stateNode) kl(e, t, e.memoizedProps, r);
        else {
          if ("string" != typeof r && null === t.stateNode)
            throw Error(Du(166));
          (n = Tf(rl.current)),
            Tf(tl.current),
            cp(t)
              ? ((n = t.stateNode),
                (r = t.memoizedProps),
                (n[ya] = t),
                n.nodeValue !== r && (t.effectTag |= 4))
              : (((n = (9 === n.nodeType ? n : n.ownerDocument).createTextNode(
                  r
                ))[ya] = t),
                (t.stateNode = n));
        }
        return null;
      case 13:
        return (
          Hd(ol),
          (r = t.memoizedState),
          0 != (64 & t.effectTag)
            ? ((t.expirationTime = n), t)
            : ((n = null !== r),
              (r = !1),
              null === e
                ? void 0 !== t.memoizedProps.fallback && cp(t)
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
                0 != (1 & ol.current)
                  ? ql === Rl && (ql = Bl)
                  : ((ql !== Rl && ql !== Bl) || (ql = jl),
                    0 !== Yl && null !== $l && (Ah($l, Hl), Oh($l, Yl)))),
              (n || r) && (t.effectTag |= 4),
              null)
        );
      case 4:
        return Ff(), Sl(t), null;
      case 10:
        return cf(t), null;
      case 17:
        return Wd(t.type) && Jd(), null;
      case 19:
        if ((Hd(ol), null === (r = t.memoizedState))) return null;
        if (((o = 0 != (64 & t.effectTag)), null === (i = r.rendering))) {
          if (o) Dp(r, !1);
          else if (ql !== Rl || (null !== e && 0 != (64 & e.effectTag)))
            for (i = t.child; null !== i; ) {
              if (null !== (e = Mf(i))) {
                for (
                  t.effectTag |= 64,
                    Dp(r, !1),
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
                return qd(ol, (1 & ol.current) | 2), t.child;
              }
              i = i.sibling;
            }
        } else {
          if (!o)
            if (null !== (e = Mf(i))) {
              if (
                ((t.effectTag |= 64),
                (o = !0),
                null !== (n = e.updateQueue) &&
                  ((t.updateQueue = n), (t.effectTag |= 4)),
                Dp(r, !0),
                null === r.tail && "hidden" === r.tailMode && !i.alternate)
              )
                return (
                  null !== (t = t.lastEffect = r.lastEffect) &&
                    (t.nextEffect = null),
                  null
                );
            } else
              2 * $s() - r.renderingStartTime > r.tailExpiration &&
                1 < n &&
                ((t.effectTag |= 64),
                (o = !0),
                Dp(r, !1),
                (t.expirationTime = t.childExpirationTime = n - 1));
          r.isBackwards
            ? ((i.sibling = t.child), (t.child = i))
            : (null !== (n = r.last) ? (n.sibling = i) : (t.child = i),
              (r.last = i));
        }
        return null !== r.tail
          ? (0 === r.tailExpiration && (r.tailExpiration = $s() + 500),
            (n = r.tail),
            (r.rendering = n),
            (r.tail = n.sibling),
            (r.lastEffect = t.lastEffect),
            (r.renderingStartTime = $s()),
            (n.sibling = null),
            (t = ol.current),
            qd(ol, o ? (1 & t) | 2 : 1 & t),
            n)
          : null;
    }
    throw Error(Du(156, t.tag));
  }
  function Ep(e) {
    switch (e.tag) {
      case 1:
        Wd(e.type) && Jd();
        var t = e.effectTag;
        return 4096 & t ? ((e.effectTag = (-4097 & t) | 64), e) : null;
      case 3:
        if ((Ff(), Hd(xs), Hd(_s), 0 != (64 & (t = e.effectTag))))
          throw Error(Du(285));
        return (e.effectTag = (-4097 & t) | 64), e;
      case 5:
        return Of(e), null;
      case 13:
        return (
          Hd(ol),
          4096 & (t = e.effectTag)
            ? ((e.effectTag = (-4097 & t) | 64), e)
            : null
        );
      case 19:
        return Hd(ol), null;
      case 4:
        return Ff(), null;
      case 10:
        return cf(e), null;
      default:
        return null;
    }
  }
  function Tp(e, t) {
    return { value: e, source: t, stack: Gu(t) };
  }
  function Cp(e, t) {
    var n = t.source,
      r = t.stack;
    null === r && null !== n && (r = Gu(n)),
      null !== n && qu(n.type),
      (t = t.value),
      null !== e && 1 === e.tag && qu(e.type);
    try {
      console.error(t);
    } catch (e) {
      setTimeout(function () {
        throw e;
      });
    }
  }
  function Fp(e) {
    var t = e.ref;
    if (null !== t)
      if ("function" == typeof t)
        try {
          t(null);
        } catch (t) {
          bh(e, t);
        }
      else t.current = null;
  }
  function Ap(e, t) {
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
            t.elementType === t.type ? n : lf(t.type, n),
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
    throw Error(Du(163));
  }
  function Op(e, t) {
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
  function Mp(e, t) {
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
  function Rp(e, t, n) {
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
      case 22:
        return void Mp(3, n);
      case 1:
        if (((e = n.stateNode), 4 & n.effectTag))
          if (null === t) e.componentDidMount();
          else {
            var r =
              n.elementType === n.type
                ? t.memoizedProps
                : lf(n.type, t.memoizedProps);
            e.componentDidUpdate(
              r,
              t.memoizedState,
              e.__reactInternalSnapshotBeforeUpdate
            );
          }
        return void (null !== (t = n.updateQueue) && wf(n, t, e));
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
          wf(n, t, e);
        }
        return;
      case 5:
        return (
          (e = n.stateNode),
          void (
            null === t &&
            4 & n.effectTag &&
            rd(n.type, n.memoizedProps) &&
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
            null !== n && ((n = n.dehydrated), null !== n && Nc(n))))
        );
      case 19:
      case 17:
      case 20:
      case 21:
        return;
    }
    throw Error(Du(163));
  }
  function Up(e, t, n) {
    switch (("function" == typeof pu && pu(t), t.tag)) {
      case 0:
      case 11:
      case 14:
      case 15:
      case 22:
        if (null !== (e = t.updateQueue) && null !== (e = e.lastEffect)) {
          var r = e.next;
          tf(97 < n ? 97 : n, function () {
            var e = r;
            do {
              var n = e.destroy;
              if (void 0 !== n) {
                var o = t;
                try {
                  n();
                } catch (e) {
                  bh(o, e);
                }
              }
              e = e.next;
            } while (e !== r);
          });
        }
        break;
      case 1:
        Fp(t),
          "function" == typeof (n = t.stateNode).componentWillUnmount &&
            (function (e, t) {
              try {
                (t.props = e.memoizedProps),
                  (t.state = e.memoizedState),
                  t.componentWillUnmount();
              } catch (t) {
                bh(e, t);
              }
            })(t, n);
        break;
      case 5:
        Fp(t);
        break;
      case 4:
        $p(e, t, n);
    }
  }
  function Np(e) {
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
      null !== t && Np(t);
  }
  function Bp(e) {
    return 5 === e.tag || 3 === e.tag || 4 === e.tag;
  }
  function jp(e) {
    e: {
      for (var t = e.return; null !== t; ) {
        if (Bp(t)) {
          var n = t;
          break e;
        }
        t = t.return;
      }
      throw Error(Du(160));
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
        throw Error(Du(161));
    }
    16 & n.effectTag && (dc(t, ""), (n.effectTag &= -17));
    e: t: for (n = e; ; ) {
      for (; null === n.sibling; ) {
        if (null === n.return || Bp(n.return)) {
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
    r ? Lp(e, n, t) : Vp(e, n, t);
  }
  function Lp(e, t, n) {
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
              (t.onclick = Yc));
    else if (4 !== r && null !== (e = e.child))
      for (Lp(e, t, n), e = e.sibling; null !== e; )
        Lp(e, t, n), (e = e.sibling);
  }
  function Vp(e, t, n) {
    var r = e.tag,
      o = 5 === r || 6 === r;
    if (o)
      (e = o ? e.stateNode : e.stateNode.instance),
        t ? n.insertBefore(e, t) : n.appendChild(e);
    else if (4 !== r && null !== (e = e.child))
      for (Vp(e, t, n), e = e.sibling; null !== e; )
        Vp(e, t, n), (e = e.sibling);
  }
  function $p(e, t, n) {
    for (var r, o, i = t, a = !1; ; ) {
      if (!a) {
        a = i.return;
        e: for (;;) {
          if (null === a) throw Error(Du(160));
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
          if ((Up(s, c, u), null !== c.child && 4 !== c.tag))
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
      } else if ((Up(e, i, n), null !== i.child)) {
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
  function zp(e, t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
      case 22:
        return void Op(3, t);
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
              n[ba] = r,
                "input" === e &&
                  "radio" === r.type &&
                  null != r.name &&
                  Zu(n, r),
                Jc(e, o),
                t = Jc(e, r),
                o = 0;
              o < i.length;
              o += 2
            ) {
              var a = i[o],
                s = i[o + 1];
              "style" === a
                ? Gc(n, s)
                : "dangerouslySetInnerHTML" === a
                ? ki(n, s)
                : "children" === a
                ? dc(n, s)
                : zu(n, a, s, t);
            }
            switch (e) {
              case "input":
                ec(n, r);
                break;
              case "textarea":
                sc(n, r);
                break;
              case "select":
                (t = n._wrapperState.wasMultiple),
                  (n._wrapperState.wasMultiple = !!r.multiple),
                  null != (e = r.value)
                    ? oc(n, !!r.multiple, e, !1)
                    : t !== !!r.multiple &&
                      (null != r.defaultValue
                        ? oc(n, !!r.multiple, r.defaultValue, !0)
                        : oc(n, !!r.multiple, r.multiple ? [] : "", !1));
            }
          }
        }
        return;
      case 6:
        if (null === t.stateNode) throw Error(Du(162));
        return void (t.stateNode.nodeValue = t.memoizedProps);
      case 3:
        return void (
          (t = t.stateNode).hydrate && ((t.hydrate = !1), Nc(t.containerInfo))
        );
      case 12:
        return;
      case 13:
        if (
          ((n = t),
          null === t.memoizedState
            ? (r = !1)
            : ((r = !0), (n = t.child), (Xl = $s())),
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
                    (i.style.display = qc("display", o)));
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
        return void Hp(t);
      case 19:
        return void Hp(t);
      case 17:
        return;
    }
    throw Error(Du(163));
  }
  function Hp(e) {
    var t = e.updateQueue;
    if (null !== t) {
      e.updateQueue = null;
      var n = e.stateNode;
      null === n && (n = e.stateNode = new Dl()),
        t.forEach(function (t) {
          var r = _h.bind(null, e, t);
          n.has(t) || (n.add(t), t.then(r, r));
        });
    }
  }
  function qp(e, t, n) {
    ((n = mf(n, null)).tag = 3), (n.payload = { element: null });
    var r = t.value;
    return (
      (n.callback = function () {
        tu || ((tu = !0), (nu = r)), Cp(e, t);
      }),
      n
    );
  }
  function Gp(e, t, n) {
    (n = mf(n, null)).tag = 3;
    var r = e.type.getDerivedStateFromError;
    if ("function" == typeof r) {
      var o = t.value;
      n.payload = function () {
        return Cp(e, t), r(o);
      };
    }
    var i = e.stateNode;
    return (
      null !== i &&
        "function" == typeof i.componentDidCatch &&
        (n.callback = function () {
          "function" != typeof r &&
            (null === ru ? (ru = new Set([this])) : ru.add(this), Cp(e, t));
          var n = t.stack;
          this.componentDidCatch(t.value, {
            componentStack: null !== n ? n : "",
          });
        }),
      n
    );
  }
  function Wp() {
    return (Vl & (Ol | Ml)) !== Fl
      ? 1073741821 - (($s() / 10) | 0)
      : 0 !== cu
      ? cu
      : (cu = 1073741821 - (($s() / 10) | 0));
  }
  function Jp(e, t, n) {
    if (0 == (2 & (t = t.mode))) return 1073741823;
    var r = Zd();
    if (0 == (4 & t)) return 99 === r ? 1073741823 : 1073741822;
    if ((Vl & Ol) !== Fl) return Hl;
    if (null !== n) e = sf(e, 0 | n.timeoutMs || 5e3, 250);
    else
      switch (r) {
        case 99:
          e = 1073741823;
          break;
        case 98:
          e = sf(e, 150, 100);
          break;
        case 97:
        case 96:
          e = sf(e, 5e3, 250);
          break;
        case 95:
          e = 2;
          break;
        default:
          throw Error(Du(326));
      }
    return null !== $l && e === Hl && --e, e;
  }
  function Qp(e, t) {
    if (50 < lu) throw ((lu = 0), (uu = null), Error(Du(185)));
    if (null !== (e = Yp(e, t))) {
      var n = Zd();
      1073741823 === t
        ? (Vl & Al) !== Fl && (Vl & (Ol | Ml)) === Fl
          ? eh(e)
          : (Xp(e), Vl === Fl && of())
        : Xp(e),
        (4 & Vl) === Fl ||
          (98 !== n && 99 !== n) ||
          (null === su
            ? (su = new Map([[e, t]]))
            : (void 0 === (n = su.get(e)) || n > t) && su.set(e, t));
    }
  }
  function Yp(e, t) {
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
      null !== o && ($l === o && (sh(t), ql === jl && Ah(o, Hl)), Oh(o, t)), o
    );
  }
  function Kp(e) {
    var t = e.lastExpiredTime;
    if (0 !== t) return t;
    if (!Fh(e, (t = e.firstPendingTime))) return t;
    var n = e.lastPingedTime;
    return 2 >= (e = n > (e = e.nextKnownPendingLevel) ? n : e) && t !== e
      ? 0
      : e;
  }
  function Xp(e) {
    if (0 !== e.lastExpiredTime)
      (e.callbackExpirationTime = 1073741823),
        (e.callbackPriority = 99),
        (e.callbackNode = rf(eh.bind(null, e)));
    else {
      var t = Kp(e),
        n = e.callbackNode;
      if (0 === t)
        null !== n &&
          ((e.callbackNode = null),
          (e.callbackExpirationTime = 0),
          (e.callbackPriority = 90));
      else {
        var r = Wp();
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
          n !== Rs && Ds(n);
        }
        (e.callbackExpirationTime = t),
          (e.callbackPriority = r),
          (t =
            1073741823 === t
              ? rf(eh.bind(null, e))
              : nf(r, Zp.bind(null, e), {
                  timeout: 10 * (1073741821 - t) - $s(),
                })),
          (e.callbackNode = t);
      }
    }
  }
  function Zp(e, t) {
    if (((cu = 0), t)) return Mh(e, (t = Wp())), Xp(e), null;
    var n = Kp(e);
    if (0 !== n) {
      if (((t = e.callbackNode), (Vl & (Ol | Ml)) !== Fl)) throw Error(Du(327));
      if ((mh(), (e === $l && n === Hl) || rh(e, n), null !== zl)) {
        var r = Vl;
        Vl |= Ol;
        for (var o = ih(); ; )
          try {
            uh();
            break;
          } catch (t) {
            oh(e, t);
          }
        if ((uf(), (Vl = r), (Tl.current = o), ql === Ul))
          throw ((t = Gl), rh(e, n), Ah(e, n), Xp(e), t);
        if (null === zl)
          switch (
            ((o = e.finishedWork = e.current.alternate),
            (e.finishedExpirationTime = n),
            (r = ql),
            ($l = null),
            r)
          ) {
            case Rl:
            case Ul:
              throw Error(Du(345));
            case Nl:
              Mh(e, 2 < n ? 2 : n);
              break;
            case Bl:
              if (
                (Ah(e, n),
                n === (r = e.lastSuspendedTime) &&
                  (e.nextKnownPendingLevel = fh(o)),
                1073741823 === Wl && 10 < (o = Xl + Zl - $s()))
              ) {
                if (Kl) {
                  var i = e.lastPingedTime;
                  if (0 === i || i >= n) {
                    (e.lastPingedTime = n), rh(e, n);
                    break;
                  }
                }
                if (0 !== (i = Kp(e)) && i !== n) break;
                if (0 !== r && r !== n) {
                  e.lastPingedTime = r;
                  break;
                }
                e.timeoutHandle = ga(ph.bind(null, e), o);
                break;
              }
              ph(e);
              break;
            case jl:
              if (
                (Ah(e, n),
                n === (r = e.lastSuspendedTime) &&
                  (e.nextKnownPendingLevel = fh(o)),
                Kl && (0 === (o = e.lastPingedTime) || o >= n))
              ) {
                (e.lastPingedTime = n), rh(e, n);
                break;
              }
              if (0 !== (o = Kp(e)) && o !== n) break;
              if (0 !== r && r !== n) {
                e.lastPingedTime = r;
                break;
              }
              if (
                (1073741823 !== Jl
                  ? (r = 10 * (1073741821 - Jl) - $s())
                  : 1073741823 === Wl
                  ? (r = 0)
                  : ((r = 10 * (1073741821 - Wl) - 5e3),
                    0 > (r = (o = $s()) - r) && (r = 0),
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
                          : 1960 * El(r / 1960)) - r) && (r = n)),
                10 < r)
              ) {
                e.timeoutHandle = ga(ph.bind(null, e), r);
                break;
              }
              ph(e);
              break;
            case Ll:
              if (1073741823 !== Wl && null !== Ql) {
                i = Wl;
                var a = Ql;
                if (
                  (0 >= (r = 0 | a.busyMinDurationMs)
                    ? (r = 0)
                    : ((o = 0 | a.busyDelayMs),
                      (r =
                        (i =
                          $s() -
                          (10 * (1073741821 - i) - (0 | a.timeoutMs || 5e3))) <=
                        o
                          ? 0
                          : o + r - i)),
                  10 < r)
                ) {
                  Ah(e, n), (e.timeoutHandle = ga(ph.bind(null, e), r));
                  break;
                }
              }
              ph(e);
              break;
            default:
              throw Error(Du(329));
          }
        if ((Xp(e), e.callbackNode === t)) return Zp.bind(null, e);
      }
    }
    return null;
  }
  function eh(e) {
    var t = e.lastExpiredTime;
    if (((t = 0 !== t ? t : 1073741823), (Vl & (Ol | Ml)) !== Fl))
      throw Error(Du(327));
    if ((mh(), (e === $l && t === Hl) || rh(e, t), null !== zl)) {
      var n = Vl;
      Vl |= Ol;
      for (var r = ih(); ; )
        try {
          lh();
          break;
        } catch (t) {
          oh(e, t);
        }
      if ((uf(), (Vl = n), (Tl.current = r), ql === Ul))
        throw ((n = Gl), rh(e, t), Ah(e, t), Xp(e), n);
      if (null !== zl) throw Error(Du(261));
      (e.finishedWork = e.current.alternate),
        (e.finishedExpirationTime = t),
        ($l = null),
        ph(e),
        Xp(e);
    }
    return null;
  }
  function th(e, t) {
    var n = Vl;
    Vl |= 1;
    try {
      return e(t);
    } finally {
      (Vl = n) === Fl && of();
    }
  }
  function nh(e, t) {
    var n = Vl;
    (Vl &= -2), (Vl |= Al);
    try {
      return e(t);
    } finally {
      (Vl = n) === Fl && of();
    }
  }
  function rh(e, t) {
    (e.finishedWork = null), (e.finishedExpirationTime = 0);
    var n = e.timeoutHandle;
    if ((-1 !== n && ((e.timeoutHandle = -1), ma(n)), null !== zl))
      for (n = zl.return; null !== n; ) {
        var r = n;
        switch (r.tag) {
          case 1:
            null != (r = r.type.childContextTypes) && Jd();
            break;
          case 3:
            Ff(), Hd(xs), Hd(_s);
            break;
          case 5:
            Of(r);
            break;
          case 4:
            Ff();
            break;
          case 13:
          case 19:
            Hd(ol);
            break;
          case 10:
            cf(r);
        }
        n = n.return;
      }
    ($l = e),
      (zl = kh(e.current, null)),
      (Hl = t),
      (ql = Rl),
      (Gl = null),
      (Jl = Wl = 1073741823),
      (Ql = null),
      (Yl = 0),
      (Kl = !1);
  }
  function oh(e, t) {
    for (;;) {
      try {
        if ((uf(), (il.current = fl), dl))
          for (var n = ll.memoizedState; null !== n; ) {
            var r = n.queue;
            null !== r && (r.pending = null), (n = n.next);
          }
        if (
          ((sl = 0),
          (cl = ul = ll = null),
          (dl = !1),
          null === zl || null === zl.return)
        )
          return (ql = Ul), (Gl = t), (zl = null);
        e: {
          var o = e,
            i = zl.return,
            a = zl,
            s = t;
          if (
            ((t = Hl),
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
            var c = 0 != (1 & ol.current),
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
                      var v = mf(1073741823, null);
                      (v.tag = 2), vf(a, v);
                    }
                  a.expirationTime = 1073741823;
                  break e;
                }
                (s = void 0), (a = t);
                var y = o.pingCache;
                if (
                  (null === y
                    ? ((y = o.pingCache = new Il()),
                      (s = new Set()),
                      y.set(l, s))
                    : void 0 === (s = y.get(l)) &&
                      ((s = new Set()), y.set(l, s)),
                  !s.has(a))
                ) {
                  s.add(a);
                  var b = wh.bind(null, o, l, a);
                  l.then(b, b);
                }
                (d.effectTag |= 4096), (d.expirationTime = t);
                break e;
              }
              d = d.return;
            } while (null !== d);
            s = Error(
              (qu(a.type) || "A React component") +
                " suspended while rendering, but no fallback UI was specified.\n\nAdd a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display." +
                Gu(a)
            );
          }
          ql !== Ll && (ql = Nl), (s = Tp(s, a)), (d = i);
          do {
            switch (d.tag) {
              case 3:
                (l = s),
                  (d.effectTag |= 4096),
                  (d.expirationTime = t),
                  yf(d, qp(d, l, t));
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
                      (null === ru || !ru.has(_))))
                ) {
                  (d.effectTag |= 4096),
                    (d.expirationTime = t),
                    yf(d, Gp(d, l, t));
                  break e;
                }
            }
            d = d.return;
          } while (null !== d);
        }
        zl = dh(zl);
      } catch (e) {
        t = e;
        continue;
      }
      break;
    }
  }
  function ih() {
    var e = Tl.current;
    return (Tl.current = fl), null === e ? fl : e;
  }
  function ah(e, t) {
    e < Wl && 2 < e && (Wl = e),
      null !== t && e < Jl && 2 < e && ((Jl = e), (Ql = t));
  }
  function sh(e) {
    e > Yl && (Yl = e);
  }
  function lh() {
    for (; null !== zl; ) zl = ch(zl);
  }
  function uh() {
    for (; null !== zl && !Us(); ) zl = ch(zl);
  }
  function ch(e) {
    var t = du(e.alternate, e, Hl);
    return (
      (e.memoizedProps = e.pendingProps),
      null === t && (t = dh(e)),
      (Cl.current = null),
      t
    );
  }
  function dh(e) {
    zl = e;
    do {
      var t = zl.alternate;
      if (((e = zl.return), 0 == (2048 & zl.effectTag))) {
        if (((t = Ip(t, zl, Hl)), 1 === Hl || 1 !== zl.childExpirationTime)) {
          for (var n = 0, r = zl.child; null !== r; ) {
            var o = r.expirationTime,
              i = r.childExpirationTime;
            o > n && (n = o), i > n && (n = i), (r = r.sibling);
          }
          zl.childExpirationTime = n;
        }
        if (null !== t) return t;
        null !== e &&
          0 == (2048 & e.effectTag) &&
          (null === e.firstEffect && (e.firstEffect = zl.firstEffect),
          null !== zl.lastEffect &&
            (null !== e.lastEffect &&
              (e.lastEffect.nextEffect = zl.firstEffect),
            (e.lastEffect = zl.lastEffect)),
          1 < zl.effectTag &&
            (null !== e.lastEffect
              ? (e.lastEffect.nextEffect = zl)
              : (e.firstEffect = zl),
            (e.lastEffect = zl)));
      } else {
        if (null !== (t = Ep(zl))) return (t.effectTag &= 2047), t;
        null !== e &&
          ((e.firstEffect = e.lastEffect = null), (e.effectTag |= 2048));
      }
      if (null !== (t = zl.sibling)) return t;
      zl = e;
    } while (null !== zl);
    return ql === Rl && (ql = Ll), null;
  }
  function fh(e) {
    var t = e.expirationTime;
    return t > (e = e.childExpirationTime) ? t : e;
  }
  function ph(e) {
    var t = Zd();
    return tf(99, hh.bind(null, e, t)), null;
  }
  function hh(e, t) {
    do {
      mh();
    } while (null !== iu);
    if ((Vl & (Ol | Ml)) !== Fl) throw Error(Du(327));
    var n = e.finishedWork,
      r = e.finishedExpirationTime;
    if (null === n) return null;
    if (
      ((e.finishedWork = null), (e.finishedExpirationTime = 0), n === e.current)
    )
      throw Error(Du(177));
    (e.callbackNode = null),
      (e.callbackExpirationTime = 0),
      (e.callbackPriority = 90),
      (e.nextKnownPendingLevel = 0);
    var o = fh(n);
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
      e === $l && ((zl = $l = null), (Hl = 0)),
      1 < n.effectTag
        ? null !== n.lastEffect
          ? ((n.lastEffect.nextEffect = n), (o = n.firstEffect))
          : (o = n)
        : (o = n.firstEffect),
      null !== o)
    ) {
      var i = Vl;
      (Vl |= Ml), (Cl.current = null), (pa = oa);
      var a = td();
      if (nd(a)) {
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
                  var y;
                  m !== s || (0 !== u && 3 !== m.nodeType) || (f = d + u),
                    m !== c || (0 !== l && 3 !== m.nodeType) || (p = d + l),
                    3 === m.nodeType && (d += m.nodeValue.length),
                    null !== (y = m.firstChild);

                )
                  (v = m), (m = y);
                for (;;) {
                  if (m === a) break t;
                  if (
                    (v === s && ++h === u && (f = d),
                    v === c && ++g === l && (p = d),
                    null !== (y = m.nextSibling))
                  )
                    break;
                  v = (m = v).parentNode;
                }
                m = y;
              }
              s = -1 === f || -1 === p ? null : { start: f, end: p };
            } else s = null;
          }
        s = s || { start: 0, end: 0 };
      } else s = null;
      (ha = { activeElementDetached: null, focusedElem: a, selectionRange: s }),
        (oa = !1),
        (eu = o);
      do {
        try {
          gh();
        } catch (e) {
          if (null === eu) throw Error(Du(330));
          bh(eu, e), (eu = eu.nextEffect);
        }
      } while (null !== eu);
      eu = o;
      do {
        try {
          for (a = e, s = t; null !== eu; ) {
            var b = eu.effectTag;
            if ((16 & b && dc(eu.stateNode, ""), 128 & b)) {
              var w = eu.alternate;
              if (null !== w) {
                var _ = w.ref;
                null !== _ &&
                  ("function" == typeof _ ? _(null) : (_.current = null));
              }
            }
            switch (1038 & b) {
              case 2:
                jp(eu), (eu.effectTag &= -3);
                break;
              case 6:
                jp(eu), (eu.effectTag &= -3), zp(eu.alternate, eu);
                break;
              case 1024:
                eu.effectTag &= -1025;
                break;
              case 1028:
                (eu.effectTag &= -1025), zp(eu.alternate, eu);
                break;
              case 4:
                zp(eu.alternate, eu);
                break;
              case 8:
                $p(a, (u = eu), s), Np(u);
            }
            eu = eu.nextEffect;
          }
        } catch (e) {
          if (null === eu) throw Error(Du(330));
          bh(eu, e), (eu = eu.nextEffect);
        }
      } while (null !== eu);
      if (
        ((_ = ha),
        (w = td()),
        (b = _.focusedElem),
        (s = _.selectionRange),
        w !== b &&
          b &&
          b.ownerDocument &&
          ed(b.ownerDocument.documentElement, b))
      ) {
        null !== s &&
          nd(b) &&
          ((w = s.start),
          void 0 === (_ = s.end) && (_ = w),
          "selectionStart" in b
            ? ((b.selectionStart = w),
              (b.selectionEnd = Math.min(_, b.value.length)))
            : (_ =
                ((w = b.ownerDocument || document) && w.defaultView) || window)
                .getSelection &&
              ((_ = _.getSelection()),
              (u = b.textContent.length),
              (a = Math.min(s.start, u)),
              (s = void 0 === s.end ? a : Math.min(s.end, u)),
              !_.extend && a > s && ((u = s), (s = a), (a = u)),
              (u = Zc(b, a)),
              (c = Zc(b, s)),
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
        for (_ = b; (_ = _.parentNode); )
          1 === _.nodeType &&
            w.push({ element: _, left: _.scrollLeft, top: _.scrollTop });
        for (
          "function" == typeof b.focus && b.focus(), b = 0;
          b < w.length;
          b++
        )
          ((_ = w[b]).element.scrollLeft = _.left),
            (_.element.scrollTop = _.top);
      }
      (oa = !!pa), (ha = pa = null), (e.current = n), (eu = o);
      do {
        try {
          for (b = e; null !== eu; ) {
            var x = eu.effectTag;
            if ((36 & x && Rp(b, eu.alternate, eu), 128 & x)) {
              w = void 0;
              var S = eu.ref;
              if (null !== S) {
                var P = eu.stateNode;
                switch (eu.tag) {
                  case 5:
                    w = P;
                    break;
                  default:
                    w = P;
                }
                "function" == typeof S ? S(w) : (S.current = w);
              }
            }
            eu = eu.nextEffect;
          }
        } catch (e) {
          if (null === eu) throw Error(Du(330));
          bh(eu, e), (eu = eu.nextEffect);
        }
      } while (null !== eu);
      (eu = null), Ns(), (Vl = i);
    } else e.current = n;
    if (ou) (ou = !1), (iu = e), (au = t);
    else
      for (eu = o; null !== eu; )
        (t = eu.nextEffect), (eu.nextEffect = null), (eu = t);
    if (
      (0 === (t = e.firstPendingTime) && (ru = null),
      1073741823 === t ? (e === uu ? lu++ : ((lu = 0), (uu = e))) : (lu = 0),
      "function" == typeof fu && fu(n.stateNode, r),
      Xp(e),
      tu)
    )
      throw ((tu = !1), (e = nu), (nu = null), e);
    return (Vl & Al) !== Fl || of(), null;
  }
  function gh() {
    for (; null !== eu; ) {
      var e = eu.effectTag;
      0 != (256 & e) && Ap(eu.alternate, eu),
        0 == (512 & e) ||
          ou ||
          ((ou = !0),
          nf(97, function () {
            return mh(), null;
          })),
        (eu = eu.nextEffect);
    }
  }
  function mh() {
    if (90 !== au) {
      var e = 97 < au ? 97 : au;
      return (au = 90), tf(e, vh);
    }
  }
  function vh() {
    if (null === iu) return !1;
    var e = iu;
    if (((iu = null), (Vl & (Ol | Ml)) !== Fl)) throw Error(Du(331));
    var t = Vl;
    for (Vl |= Ml, e = e.current.firstEffect; null !== e; ) {
      try {
        var n = e;
        if (0 != (512 & n.effectTag))
          switch (n.tag) {
            case 0:
            case 11:
            case 15:
            case 22:
              Op(5, n), Mp(5, n);
          }
      } catch (t) {
        if (null === e) throw Error(Du(330));
        bh(e, t);
      }
      (n = e.nextEffect), (e.nextEffect = null), (e = n);
    }
    return (Vl = t), of(), !0;
  }
  function yh(e, t, n) {
    vf(e, (t = qp(e, (t = Tp(n, t)), 1073741823))),
      null !== (e = Yp(e, 1073741823)) && Xp(e);
  }
  function bh(e, t) {
    if (3 === e.tag) yh(e, e, t);
    else
      for (var n = e.return; null !== n; ) {
        if (3 === n.tag) {
          yh(n, e, t);
          break;
        }
        if (1 === n.tag) {
          var r = n.stateNode;
          if (
            "function" == typeof n.type.getDerivedStateFromError ||
            ("function" == typeof r.componentDidCatch &&
              (null === ru || !ru.has(r)))
          ) {
            vf(n, (e = Gp(n, (e = Tp(t, e)), 1073741823))),
              null !== (n = Yp(n, 1073741823)) && Xp(n);
            break;
          }
        }
        n = n.return;
      }
  }
  function wh(e, t, n) {
    var r = e.pingCache;
    null !== r && r.delete(t),
      $l === e && Hl === n
        ? ql === jl || (ql === Bl && 1073741823 === Wl && $s() - Xl < Zl)
          ? rh(e, Hl)
          : (Kl = !0)
        : Fh(e, n) &&
          ((0 !== (t = e.lastPingedTime) && t < n) ||
            ((e.lastPingedTime = n), Xp(e)));
  }
  function _h(e, t) {
    var n = e.stateNode;
    null !== n && n.delete(t),
      0 === (t = 0) && (t = Jp((t = Wp()), e, null)),
      null !== (e = Yp(e, t)) && Xp(e);
  }
  function xh(e, t, n, r) {
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
  function Sh(e, t, n, r) {
    return new xh(e, t, n, r);
  }
  function Ph(e) {
    return !(!(e = e.prototype) || !e.isReactComponent);
  }
  function kh(e, t) {
    var n = e.alternate;
    return (
      null === n
        ? (((n = Sh(e.tag, t, e.key, e.mode)).elementType = e.elementType),
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
  function Dh(e, t, n, r, o, i) {
    var a = 2;
    if (((r = e), "function" == typeof e)) Ph(e) && (a = 1);
    else if ("string" == typeof e) a = 5;
    else
      e: switch (e) {
        case ci:
          return Ih(n.children, o, i, t);
        case gi:
          (a = 8), (o |= 7);
          break;
        case di:
          (a = 8), (o |= 1);
          break;
        case fi:
          return (
            ((e = Sh(12, n, t, 8 | o)).elementType = fi),
            (e.type = fi),
            (e.expirationTime = i),
            e
          );
        case vi:
          return (
            ((e = Sh(13, n, t, o)).type = vi),
            (e.elementType = vi),
            (e.expirationTime = i),
            e
          );
        case yi:
          return (
            ((e = Sh(19, n, t, o)).elementType = yi), (e.expirationTime = i), e
          );
        default:
          if ("object" == typeof e && null !== e)
            switch (e.$$typeof) {
              case pi:
                a = 10;
                break e;
              case hi:
                a = 9;
                break e;
              case mi:
                a = 11;
                break e;
              case bi:
                a = 14;
                break e;
              case wi:
                (a = 16), (r = null);
                break e;
              case _i:
                a = 22;
                break e;
            }
          throw Error(Du(130, null == e ? e : typeof e, ""));
      }
    return (
      ((t = Sh(a, n, t, o)).elementType = e),
      (t.type = r),
      (t.expirationTime = i),
      t
    );
  }
  function Ih(e, t, n, r) {
    return ((e = Sh(7, e, r, t)).expirationTime = n), e;
  }
  function Eh(e, t, n) {
    return ((e = Sh(6, e, null, t)).expirationTime = n), e;
  }
  function Th(e, t, n) {
    return (
      ((t = Sh(
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
  function Ch(e, t, n) {
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
  function Fh(e, t) {
    var n = e.firstSuspendedTime;
    return (e = e.lastSuspendedTime), 0 !== n && n >= t && e <= t;
  }
  function Ah(e, t) {
    var n = e.firstSuspendedTime,
      r = e.lastSuspendedTime;
    n < t && (e.firstSuspendedTime = t),
      (r > t || 0 === n) && (e.lastSuspendedTime = t),
      t <= e.lastPingedTime && (e.lastPingedTime = 0),
      t <= e.lastExpiredTime && (e.lastExpiredTime = 0);
  }
  function Oh(e, t) {
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
  function Mh(e, t) {
    var n = e.lastExpiredTime;
    (0 === n || n > t) && (e.lastExpiredTime = t);
  }
  function Rh(e, t, n, r) {
    var o = t.current,
      i = Wp(),
      a = Js.suspense;
    i = Jp(i, o, a);
    e: if (n) {
      t: {
        if (gc((n = n._reactInternalFiber)) !== n || 1 !== n.tag)
          throw Error(Du(170));
        var s = n;
        do {
          switch (s.tag) {
            case 3:
              s = s.stateNode.context;
              break t;
            case 1:
              if (Wd(s.type)) {
                s = s.stateNode.__reactInternalMemoizedMergedChildContext;
                break t;
              }
          }
          s = s.return;
        } while (null !== s);
        throw Error(Du(171));
      }
      if (1 === n.tag) {
        var l = n.type;
        if (Wd(l)) {
          n = Yd(n, l, s);
          break e;
        }
      }
      n = s;
    } else n = ws;
    return (
      null === t.context ? (t.context = n) : (t.pendingContext = n),
      ((t = mf(i, a)).payload = { element: e }),
      null !== (r = void 0 === r ? null : r) && (t.callback = r),
      vf(o, t),
      Qp(o, i),
      i
    );
  }
  function Uh(e) {
    if (!(e = e.current).child) return null;
    switch (e.child.tag) {
      case 5:
      default:
        return e.child.stateNode;
    }
  }
  function Nh(e, t) {
    null !== (e = e.memoizedState) &&
      null !== e.dehydrated &&
      e.retryTime < t &&
      (e.retryTime = t);
  }
  function Bh(e, t) {
    Nh(e, t), (e = e.alternate) && Nh(e, t);
  }
  function jh(e, t, n) {
    var r = new Ch(e, t, (n = null != n && !0 === n.hydrate)),
      o = Sh(3, null, null, 2 === t ? 7 : 1 === t ? 3 : 0);
    (r.current = o),
      (o.stateNode = r),
      hf(o),
      (e[wa] = r.current),
      n &&
        0 !== t &&
        (function (e, t) {
          var n = hc(t);
          Ji.forEach(function (e) {
            Ec(e, t, n);
          }),
            Qi.forEach(function (e) {
              Ec(e, t, n);
            });
        })(0, 9 === e.nodeType ? e : e.ownerDocument),
      (this._internalRoot = r);
  }
  function Lh(e) {
    return !(
      !e ||
      (1 !== e.nodeType &&
        9 !== e.nodeType &&
        11 !== e.nodeType &&
        (8 !== e.nodeType || " react-mount-point-unstable " !== e.nodeValue))
    );
  }
  function Vh(e, t, n, r, o) {
    var i = n._reactRootContainer;
    if (i) {
      var a = i._internalRoot;
      if ("function" == typeof o) {
        var s = o;
        o = function () {
          var e = Uh(a);
          s.call(e);
        };
      }
      Rh(t, a, e, o);
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
            return new jh(e, 0, t ? { hydrate: !0 } : void 0);
          })(n, r)),
        (a = i._internalRoot),
        "function" == typeof o)
      ) {
        var l = o;
        o = function () {
          var e = Uh(a);
          l.call(e);
        };
      }
      nh(function () {
        Rh(t, a, e, o);
      });
    }
    return Uh(a);
  }
  function $h(e, t, n) {
    var r =
      3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
    return {
      $$typeof: ui,
      key: null == r ? null : "" + r,
      children: e,
      containerInfo: t,
      implementation: n,
    };
  }
  function zh(e, t) {
    var n =
      2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
    if (!Lh(t)) throw Error(Du(200));
    return $h(e, t, null, n);
  }
  function Hh() {
    if (((To = {}), (Co = bt()), (Fo = ee()), Eo(), !Co)) throw Error(Du(227));
    var e;
    (Ao = !1),
      (Oo = null),
      (Mo = !1),
      (Ro = null),
      (Uo = {
        onError: function (e) {
          (Ao = !0), (Oo = e);
        },
      }),
      (No = null),
      (Bo = null),
      (jo = null),
      (Lo = null),
      (Vo = {}),
      ($o = []),
      (zo = {}),
      (Ho = {}),
      (qo = {}),
      (Go = !(
        "undefined" == typeof window ||
        void 0 === window.document ||
        void 0 === window.document.createElement
      )),
      (Wo = null),
      (Jo = null),
      (Qo = null),
      (Yo = Uu),
      (Ko = !1),
      (Xo = !1),
      (Zo =
        /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/),
      (ei = Object.prototype.hasOwnProperty),
      (ti = {}),
      (ni = {}),
      (ri = {}),
      "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
        .split(" ")
        .forEach(function (e) {
          ri[e] = new Vu(e, 0, !1, e, null, !1);
        }),
      [
        ["acceptCharset", "accept-charset"],
        ["className", "class"],
        ["htmlFor", "for"],
        ["httpEquiv", "http-equiv"],
      ].forEach(function (e) {
        var t = e[0];
        ri[t] = new Vu(t, 1, !1, e[1], null, !1);
      }),
      ["contentEditable", "draggable", "spellCheck", "value"].forEach(function (
        e
      ) {
        ri[e] = new Vu(e, 2, !1, e.toLowerCase(), null, !1);
      }),
      [
        "autoReverse",
        "externalResourcesRequired",
        "focusable",
        "preserveAlpha",
      ].forEach(function (e) {
        ri[e] = new Vu(e, 2, !1, e, null, !1);
      }),
      "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
        .split(" ")
        .forEach(function (e) {
          ri[e] = new Vu(e, 3, !1, e.toLowerCase(), null, !1);
        }),
      ["checked", "multiple", "muted", "selected"].forEach(function (e) {
        ri[e] = new Vu(e, 3, !0, e, null, !1);
      }),
      ["capture", "download"].forEach(function (e) {
        ri[e] = new Vu(e, 4, !1, e, null, !1);
      }),
      ["cols", "rows", "size", "span"].forEach(function (e) {
        ri[e] = new Vu(e, 6, !1, e, null, !1);
      }),
      ["rowSpan", "start"].forEach(function (e) {
        ri[e] = new Vu(e, 5, !1, e.toLowerCase(), null, !1);
      }),
      (oi = /[\-:]([a-z])/g),
      "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
        .split(" ")
        .forEach(function (e) {
          var t = e.replace(oi, $u);
          ri[t] = new Vu(t, 1, !1, e, null, !1);
        }),
      "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
        .split(" ")
        .forEach(function (e) {
          var t = e.replace(oi, $u);
          ri[t] = new Vu(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1);
        }),
      ["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
        var t = e.replace(oi, $u);
        ri[t] = new Vu(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1);
      }),
      ["tabIndex", "crossOrigin"].forEach(function (e) {
        ri[e] = new Vu(e, 1, !1, e.toLowerCase(), null, !1);
      }),
      (ri.xlinkHref = new Vu(
        "xlinkHref",
        1,
        !1,
        "xlink:href",
        "http://www.w3.org/1999/xlink",
        !0
      )),
      ["src", "href", "action", "formAction"].forEach(function (e) {
        ri[e] = new Vu(e, 1, !1, e.toLowerCase(), null, !0);
      }),
      (ii =
        Co.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED).hasOwnProperty(
        "ReactCurrentDispatcher"
      ) || (ii.ReactCurrentDispatcher = { current: null }),
      ii.hasOwnProperty("ReactCurrentBatchConfig") ||
        (ii.ReactCurrentBatchConfig = { suspense: null }),
      (ai = /^(.*)[\\\/]/),
      (si = "function" == typeof Symbol && Symbol.for),
      (li = si ? Symbol.for("react.element") : 60103),
      (ui = si ? Symbol.for("react.portal") : 60106),
      (ci = si ? Symbol.for("react.fragment") : 60107),
      (di = si ? Symbol.for("react.strict_mode") : 60108),
      (fi = si ? Symbol.for("react.profiler") : 60114),
      (pi = si ? Symbol.for("react.provider") : 60109),
      (hi = si ? Symbol.for("react.context") : 60110),
      (gi = si ? Symbol.for("react.concurrent_mode") : 60111),
      (mi = si ? Symbol.for("react.forward_ref") : 60112),
      (vi = si ? Symbol.for("react.suspense") : 60113),
      (yi = si ? Symbol.for("react.suspense_list") : 60120),
      (bi = si ? Symbol.for("react.memo") : 60115),
      (wi = si ? Symbol.for("react.lazy") : 60116),
      (_i = si ? Symbol.for("react.block") : 60121),
      (xi = "function" == typeof Symbol && Symbol.iterator),
      (Si = {
        html: "http://www.w3.org/1999/xhtml",
        mathml: "http://www.w3.org/1998/Math/MathML",
        svg: "http://www.w3.org/2000/svg",
      }),
      (e = function (e, t) {
        if (e.namespaceURI !== Si.svg || "innerHTML" in e) e.innerHTML = t;
        else {
          for (
            (Pi = Pi || document.createElement("div")).innerHTML =
              "<svg>" + t.valueOf().toString() + "</svg>",
              t = Pi.firstChild;
            e.firstChild;

          )
            e.removeChild(e.firstChild);
          for (; t.firstChild; ) e.appendChild(t.firstChild);
        }
      }),
      (ki =
        "undefined" != typeof MSApp && MSApp.execUnsafeLocalFunction
          ? function (t, n, r, o) {
              MSApp.execUnsafeLocalFunction(function () {
                return e(t, n);
              });
            }
          : e),
      (Di = {
        animationend: fc("Animation", "AnimationEnd"),
        animationiteration: fc("Animation", "AnimationIteration"),
        animationstart: fc("Animation", "AnimationStart"),
        transitionend: fc("Transition", "TransitionEnd"),
      }),
      (Ii = {}),
      (Ei = {}),
      Go &&
        ((Ei = document.createElement("div").style),
        "AnimationEvent" in window ||
          (delete Di.animationend.animation,
          delete Di.animationiteration.animation,
          delete Di.animationstart.animation),
        "TransitionEvent" in window || delete Di.transitionend.transition),
      (Ti = pc("animationend")),
      (Ci = pc("animationiteration")),
      (Fi = pc("animationstart")),
      (Ai = pc("transitionend")),
      (Oi =
        "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange seeked seeking stalled suspend timeupdate volumechange waiting".split(
          " "
        )),
      (Mi = new ("function" == typeof WeakMap ? WeakMap : Map)()),
      (Ri = null),
      (Ui = []),
      (Li = !1),
      (Vi = []),
      ($i = null),
      (zi = null),
      (Hi = null),
      (qi = new Map()),
      (Gi = new Map()),
      (Wi = []),
      (Ji =
        "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput close cancel copy cut paste click change contextmenu reset submit".split(
          " "
        )),
      (Qi =
        "focus blur dragenter dragleave mouseover mouseout pointerover pointerout gotpointercapture lostpointercapture".split(
          " "
        )),
      (Yi = {}),
      (Ki = new Map()),
      (Xi = new Map()),
      (Zi = [
        "abort",
        "abort",
        Ti,
        "animationEnd",
        Ci,
        "animationIteration",
        Fi,
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
        Ai,
        "transitionEnd",
        "waiting",
        "waiting",
      ]),
      Bc(
        "blur blur cancel cancel click click close close contextmenu contextMenu copy copy cut cut auxclick auxClick dblclick doubleClick dragend dragEnd dragstart dragStart drop drop focus focus input input invalid invalid keydown keyDown keypress keyPress keyup keyUp mousedown mouseDown mouseup mouseUp paste paste pause pause play play pointercancel pointerCancel pointerdown pointerDown pointerup pointerUp ratechange rateChange reset reset seeked seeked submit submit touchcancel touchCancel touchend touchEnd touchstart touchStart volumechange volumeChange".split(
          " "
        ),
        0
      ),
      Bc(
        "drag drag dragenter dragEnter dragexit dragExit dragleave dragLeave dragover dragOver mousemove mouseMove mouseout mouseOut mouseover mouseOver pointermove pointerMove pointerout pointerOut pointerover pointerOver scroll scroll toggle toggle touchmove touchMove wheel wheel".split(
          " "
        ),
        1
      ),
      Bc(Zi, 2);
    for (
      ea =
        "change selectionchange textInput compositionstart compositionend compositionupdate".split(
          " "
        ),
        ta = 0;
      ta < ea.length;
      ta++
    )
      Xi.set(ea[ta], 0);
    if (
      ((na = Eo().unstable_UserBlockingPriority),
      (ra = Eo().unstable_runWithPriority),
      (oa = !0),
      (ia = {
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
      (aa = ["Webkit", "ms", "Moz", "O"]),
      Object.keys(ia).forEach(function (e) {
        aa.forEach(function (t) {
          (t = t + e.charAt(0).toUpperCase() + e.substring(1)), (ia[t] = ia[e]);
        });
      }),
      (sa = Fo(
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
      (la = Si.html),
      (ua = "$"),
      (ca = "/$"),
      (da = "$?"),
      (fa = "$!"),
      (pa = null),
      (ha = null),
      (ga = "function" == typeof setTimeout ? setTimeout : void 0),
      (ma = "function" == typeof clearTimeout ? clearTimeout : void 0),
      (va = Math.random().toString(36).slice(2)),
      (ya = "__reactInternalInstance$" + va),
      (ba = "__reactEventHandlers$" + va),
      (wa = "__reactContainere$" + va),
      (_a = null),
      (xa = null),
      (Sa = null),
      Fo(_d.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var e = this.nativeEvent;
          e &&
            (e.preventDefault
              ? e.preventDefault()
              : "unknown" != typeof e.returnValue && (e.returnValue = !1),
            (this.isDefaultPrevented = bd));
        },
        stopPropagation: function () {
          var e = this.nativeEvent;
          e &&
            (e.stopPropagation
              ? e.stopPropagation()
              : "unknown" != typeof e.cancelBubble && (e.cancelBubble = !0),
            (this.isPropagationStopped = bd));
        },
        persist: function () {
          this.isPersistent = bd;
        },
        isPersistent: wd,
        destructor: function () {
          var e,
            t = this.constructor.Interface;
          for (e in t) this[e] = null;
          (this.nativeEvent = this._targetInst = this.dispatchConfig = null),
            (this.isPropagationStopped = this.isDefaultPrevented = wd),
            (this._dispatchInstances = this._dispatchListeners = null);
        },
      }),
      (_d.Interface = {
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
      (_d.extend = function (e) {
        function t() {}
        function n() {
          return r.apply(this, arguments);
        }
        var r = this;
        t.prototype = r.prototype;
        var o = new t();
        return (
          Fo(o, n.prototype),
          (n.prototype = o),
          (n.prototype.constructor = n),
          (n.Interface = Fo({}, r.Interface, e)),
          (n.extend = r.extend),
          Pd(n),
          n
        );
      }),
      Pd(_d),
      (Pa = _d.extend({ data: null })),
      (ka = _d.extend({ data: null })),
      (Da = [9, 13, 27, 32]),
      (Ia = Go && "CompositionEvent" in window),
      (Ea = null),
      Go && "documentMode" in document && (Ea = document.documentMode),
      (Ta = Go && "TextEvent" in window && !Ea),
      (Ca = Go && (!Ia || (Ea && 8 < Ea && 11 >= Ea))),
      (Fa = String.fromCharCode(32)),
      (Aa = {
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
      (Oa = !1),
      (Ma = !1),
      (Ra = {
        eventTypes: Aa,
        extractEvents: function (e, t, n, r) {
          var o;
          if (Ia)
            e: {
              switch (e) {
                case "compositionstart":
                  var i = Aa.compositionStart;
                  break e;
                case "compositionend":
                  i = Aa.compositionEnd;
                  break e;
                case "compositionupdate":
                  i = Aa.compositionUpdate;
                  break e;
              }
              i = void 0;
            }
          else
            Ma
              ? kd(e, n) && (i = Aa.compositionEnd)
              : "keydown" === e &&
                229 === n.keyCode &&
                (i = Aa.compositionStart);
          return (
            i
              ? (Ca &&
                  "ko" !== n.locale &&
                  (Ma || i !== Aa.compositionStart
                    ? i === Aa.compositionEnd && Ma && (o = yd())
                    : ((xa = "value" in (_a = r) ? _a.value : _a.textContent),
                      (Ma = !0))),
                (i = Pa.getPooled(i, t, n, r)),
                o ? (i.data = o) : null !== (o = Dd(n)) && (i.data = o),
                vd(i),
                (o = i))
              : (o = null),
            (e = Ta
              ? (function (e, t) {
                  switch (e) {
                    case "compositionend":
                      return Dd(t);
                    case "keypress":
                      return 32 !== t.which ? null : ((Oa = !0), Fa);
                    case "textInput":
                      return (e = t.data) === Fa && Oa ? null : e;
                    default:
                      return null;
                  }
                })(e, n)
              : (function (e, t) {
                  if (Ma)
                    return "compositionend" === e || (!Ia && kd(e, t))
                      ? ((e = yd()), (Sa = xa = _a = null), (Ma = !1), e)
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
                      return Ca && "ko" !== t.locale ? null : t.data;
                    default:
                      return null;
                  }
                })(e, n))
              ? (((t = ka.getPooled(Aa.beforeInput, t, n, r)).data = e), vd(t))
              : (t = null),
            null === o ? t : null === t ? o : [o, t]
          );
        },
      }),
      (Ua = {
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
      (Na = {
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
      (Ba = null),
      (ja = null),
      (La = !1),
      Go &&
        (La =
          Pc("input") && (!document.documentMode || 9 < document.documentMode)),
      (Va = {
        eventTypes: Na,
        _isInputEventSupported: La,
        extractEvents: function (e, t, n, r) {
          var o = t ? ud(t) : window,
            i = o.nodeName && o.nodeName.toLowerCase();
          if ("select" === i || ("input" === i && "file" === o.type))
            var a = Fd;
          else if (Id(o))
            if (La) a = Nd;
            else {
              a = Rd;
              var s = Md;
            }
          else
            (i = o.nodeName) &&
              "input" === i.toLowerCase() &&
              ("checkbox" === o.type || "radio" === o.type) &&
              (a = Ud);
          if (a && (a = a(e, t))) return Ed(a, n, r);
          s && s(e, o, t),
            "blur" === e &&
              (e = o._wrapperState) &&
              e.controlled &&
              "number" === o.type &&
              nc(o, "number", o.value);
        },
      }),
      ($a = _d.extend({ view: null, detail: null })),
      (za = {
        Alt: "altKey",
        Control: "ctrlKey",
        Meta: "metaKey",
        Shift: "shiftKey",
      }),
      (Ha = 0),
      (qa = 0),
      (Ga = !1),
      (Wa = !1),
      (Ja = $a.extend({
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
        getModifierState: jd,
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
          var t = Ha;
          return (
            (Ha = e.screenX),
            Ga ? ("mousemove" === e.type ? e.screenX - t : 0) : ((Ga = !0), 0)
          );
        },
        movementY: function (e) {
          if ("movementY" in e) return e.movementY;
          var t = qa;
          return (
            (qa = e.screenY),
            Wa ? ("mousemove" === e.type ? e.screenY - t : 0) : ((Wa = !0), 0)
          );
        },
      })),
      (Qa = Ja.extend({
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
      (Ka = {
        eventTypes: (Ya = {
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
                (t = (t = n.relatedTarget || n.toElement) ? sd(t) : null) &&
                (t !== gc(t) || (5 !== t.tag && 6 !== t.tag)) &&
                (t = null))
            : (a = null);
          if (a === t) return null;
          if ("mouseout" === e || "mouseover" === e)
            var s = Ja,
              l = Ya.mouseLeave,
              u = Ya.mouseEnter,
              c = "mouse";
          else
            ("pointerout" !== e && "pointerover" !== e) ||
              ((s = Qa),
              (l = Ya.pointerLeave),
              (u = Ya.pointerEnter),
              (c = "pointer"));
          if (
            ((e = null == a ? i : ud(a)),
            (i = null == t ? i : ud(t)),
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
              for (u = c, a = 0, e = s = r; e; e = dd(e)) a++;
              for (e = 0, t = u; t; t = dd(t)) e++;
              for (; 0 < a - e; ) (s = dd(s)), a--;
              for (; 0 < e - a; ) (u = dd(u)), e--;
              for (; a--; ) {
                if (s === u || s === u.alternate) break e;
                (s = dd(s)), (u = dd(u));
              }
              s = null;
            }
          else s = null;
          for (
            u = s, s = [];
            r && r !== u && (null === (a = r.alternate) || a !== u);

          )
            s.push(r), (r = dd(r));
          for (
            r = [];
            c && c !== u && (null === (a = c.alternate) || a !== u);

          )
            r.push(c), (c = dd(c));
          for (c = 0; c < s.length; c++) gd(s[c], "bubbled", l);
          for (c = r.length; 0 < c--; ) gd(r[c], "captured", n);
          return 0 == (64 & o) ? [l] : [l, n];
        },
      }),
      (Xa = "function" == typeof Object.is ? Object.is : Ld),
      (Za = Object.prototype.hasOwnProperty),
      (es = Go && "documentMode" in document && 11 >= document.documentMode),
      (ts = {
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
      (ns = null),
      (rs = null),
      (os = null),
      (is = !1),
      (as = {
        eventTypes: ts,
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
              (o = hc(o)), (i = qo.onSelect);
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
          switch (((o = t ? ud(t) : window), e)) {
            case "focus":
              (Id(o) || "true" === o.contentEditable) &&
                ((ns = o), (rs = t), (os = null));
              break;
            case "blur":
              os = rs = ns = null;
              break;
            case "mousedown":
              is = !0;
              break;
            case "contextmenu":
            case "mouseup":
            case "dragend":
              return (is = !1), $d(n, r);
            case "selectionchange":
              if (es) break;
            case "keydown":
            case "keyup":
              return $d(n, r);
          }
          return null;
        },
      }),
      (ss = _d.extend({
        animationName: null,
        elapsedTime: null,
        pseudoElement: null,
      })),
      (ls = _d.extend({
        clipboardData: function (e) {
          return "clipboardData" in e ? e.clipboardData : window.clipboardData;
        },
      })),
      (us = $a.extend({ relatedTarget: null })),
      (cs = {
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
      (ds = {
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
      (fs = $a.extend({
        key: function (e) {
          if (e.key) {
            var t = cs[e.key] || e.key;
            if ("Unidentified" !== t) return t;
          }
          return "keypress" === e.type
            ? 13 === (e = zd(e))
              ? "Enter"
              : String.fromCharCode(e)
            : "keydown" === e.type || "keyup" === e.type
            ? ds[e.keyCode] || "Unidentified"
            : "";
        },
        location: null,
        ctrlKey: null,
        shiftKey: null,
        altKey: null,
        metaKey: null,
        repeat: null,
        locale: null,
        getModifierState: jd,
        charCode: function (e) {
          return "keypress" === e.type ? zd(e) : 0;
        },
        keyCode: function (e) {
          return "keydown" === e.type || "keyup" === e.type ? e.keyCode : 0;
        },
        which: function (e) {
          return "keypress" === e.type
            ? zd(e)
            : "keydown" === e.type || "keyup" === e.type
            ? e.keyCode
            : 0;
        },
      })),
      (ps = Ja.extend({ dataTransfer: null })),
      (hs = $a.extend({
        touches: null,
        targetTouches: null,
        changedTouches: null,
        altKey: null,
        metaKey: null,
        ctrlKey: null,
        shiftKey: null,
        getModifierState: jd,
      })),
      (gs = _d.extend({
        propertyName: null,
        elapsedTime: null,
        pseudoElement: null,
      })),
      (ms = Ja.extend({
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
      (vs = {
        eventTypes: Yi,
        extractEvents: function (e, t, n, r) {
          var o = Ki.get(e);
          if (!o) return null;
          switch (e) {
            case "keypress":
              if (0 === zd(n)) return null;
            case "keydown":
            case "keyup":
              e = fs;
              break;
            case "blur":
            case "focus":
              e = us;
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
              e = Ja;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              e = ps;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              e = hs;
              break;
            case Ti:
            case Ci:
            case Fi:
              e = ss;
              break;
            case Ai:
              e = gs;
              break;
            case "scroll":
              e = $a;
              break;
            case "wheel":
              e = ms;
              break;
            case "copy":
            case "cut":
            case "paste":
              e = ls;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              e = Qa;
              break;
            default:
              e = _d;
          }
          return vd((t = e.getPooled(o, t, n, r))), t;
        },
      }),
      Lo)
    )
      throw Error(Du(101));
    (Lo = Array.prototype.slice.call(
      "ResponderEventPlugin SimpleEventPlugin EnterLeaveEventPlugin ChangeEventPlugin SelectEventPlugin BeforeInputEventPlugin".split(
        " "
      )
    )),
      Cu(),
      (No = cd),
      (Bo = ld),
      (jo = ud),
      Au({
        SimpleEventPlugin: vs,
        EnterLeaveEventPlugin: Ka,
        ChangeEventPlugin: Va,
        SelectEventPlugin: as,
        BeforeInputEventPlugin: Ra,
      }),
      (ys = []),
      (bs = -1),
      (_s = { current: (ws = {}) }),
      (xs = { current: !1 }),
      (Ss = ws),
      (Ps = Eo().unstable_runWithPriority),
      (ks = Eo().unstable_scheduleCallback),
      (Ds = Eo().unstable_cancelCallback),
      (Is = Eo().unstable_requestPaint),
      (Es = Eo().unstable_now),
      (Ts = Eo().unstable_getCurrentPriorityLevel),
      (Cs = Eo().unstable_ImmediatePriority),
      (Fs = Eo().unstable_UserBlockingPriority),
      (As = Eo().unstable_NormalPriority),
      (Os = Eo().unstable_LowPriority),
      (Ms = Eo().unstable_IdlePriority),
      (Rs = {}),
      (Us = Eo().unstable_shouldYield),
      (Ns = void 0 !== Is ? Is : function () {}),
      (Bs = null),
      (js = null),
      (Ls = !1),
      (Vs = Es()),
      ($s =
        1e4 > Vs
          ? Es
          : function () {
              return Es() - Vs;
            }),
      (zs = { current: null }),
      (Hs = null),
      (qs = null),
      (Gs = null),
      (Ws = !1),
      (Js = ii.ReactCurrentBatchConfig),
      (Qs = new Co.Component().refs),
      (Ys = {
        isMounted: function (e) {
          return !!(e = e._reactInternalFiber) && gc(e) === e;
        },
        enqueueSetState: function (e, t, n) {
          e = e._reactInternalFiber;
          var r = Wp(),
            o = Js.suspense;
          ((o = mf((r = Jp(r, e, o)), o)).payload = t),
            null != n && (o.callback = n),
            vf(e, o),
            Qp(e, r);
        },
        enqueueReplaceState: function (e, t, n) {
          e = e._reactInternalFiber;
          var r = Wp(),
            o = Js.suspense;
          ((o = mf((r = Jp(r, e, o)), o)).tag = 1),
            (o.payload = t),
            null != n && (o.callback = n),
            vf(e, o),
            Qp(e, r);
        },
        enqueueForceUpdate: function (e, t) {
          e = e._reactInternalFiber;
          var n = Wp(),
            r = Js.suspense;
          ((r = mf((n = Jp(n, e, r)), r)).tag = 2),
            null != t && (r.callback = t),
            vf(e, r),
            Qp(e, n);
        },
      }),
      (Ks = Array.isArray),
      (Xs = Ef(!0)),
      (Zs = Ef(!1)),
      (tl = { current: (el = {}) }),
      (nl = { current: el }),
      (rl = { current: el }),
      (ol = { current: 0 }),
      (il = ii.ReactCurrentDispatcher),
      (al = ii.ReactCurrentBatchConfig),
      (sl = 0),
      (ll = null),
      (ul = null),
      (cl = null),
      (dl = !1),
      (fl = {
        readContext: pf,
        useCallback: Uf,
        useContext: Uf,
        useEffect: Uf,
        useImperativeHandle: Uf,
        useLayoutEffect: Uf,
        useMemo: Uf,
        useReducer: Uf,
        useRef: Uf,
        useState: Uf,
        useDebugValue: Uf,
        useResponder: Uf,
        useDeferredValue: Uf,
        useTransition: Uf,
      }),
      (pl = {
        readContext: pf,
        useCallback: tp,
        useContext: pf,
        useEffect: Qf,
        useImperativeHandle: function (e, t, n) {
          return (
            (n = null != n ? n.concat([e]) : null),
            Wf(4, 2, Xf.bind(null, t, e), n)
          );
        },
        useLayoutEffect: function (e, t) {
          return Wf(4, 2, e, t);
        },
        useMemo: function (e, t) {
          var n = jf();
          return (
            (t = void 0 === t ? null : t),
            (e = e()),
            (n.memoizedState = [e, t]),
            e
          );
        },
        useReducer: function (e, t, n) {
          var r = jf();
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
              ip.bind(null, ll, e)),
            [r.memoizedState, e]
          );
        },
        useRef: function (e) {
          return (e = { current: e }), (jf().memoizedState = e);
        },
        useState: Hf,
        useDebugValue: ep,
        useResponder: Rf,
        useDeferredValue: function (e, t) {
          var n = Hf(e),
            r = n[0],
            o = n[1];
          return (
            Qf(
              function () {
                var n = al.suspense;
                al.suspense = void 0 === t ? null : t;
                try {
                  o(e);
                } finally {
                  al.suspense = n;
                }
              },
              [e, t]
            ),
            r
          );
        },
        useTransition: function (e) {
          var t = Hf(!1),
            n = t[0];
          return (t = t[1]), [tp(op.bind(null, t, e), [t, e]), n];
        },
      }),
      (hl = {
        readContext: pf,
        useCallback: np,
        useContext: pf,
        useEffect: Yf,
        useImperativeHandle: Zf,
        useLayoutEffect: Kf,
        useMemo: rp,
        useReducer: $f,
        useRef: Gf,
        useState: function () {
          return $f(Vf);
        },
        useDebugValue: ep,
        useResponder: Rf,
        useDeferredValue: function (e, t) {
          var n = $f(Vf),
            r = n[0],
            o = n[1];
          return (
            Yf(
              function () {
                var n = al.suspense;
                al.suspense = void 0 === t ? null : t;
                try {
                  o(e);
                } finally {
                  al.suspense = n;
                }
              },
              [e, t]
            ),
            r
          );
        },
        useTransition: function (e) {
          var t = $f(Vf),
            n = t[0];
          return (t = t[1]), [np(op.bind(null, t, e), [t, e]), n];
        },
      }),
      (gl = {
        readContext: pf,
        useCallback: np,
        useContext: pf,
        useEffect: Yf,
        useImperativeHandle: Zf,
        useLayoutEffect: Kf,
        useMemo: rp,
        useReducer: zf,
        useRef: Gf,
        useState: function () {
          return zf(Vf);
        },
        useDebugValue: ep,
        useResponder: Rf,
        useDeferredValue: function (e, t) {
          var n = zf(Vf),
            r = n[0],
            o = n[1];
          return (
            Yf(
              function () {
                var n = al.suspense;
                al.suspense = void 0 === t ? null : t;
                try {
                  o(e);
                } finally {
                  al.suspense = n;
                }
              },
              [e, t]
            ),
            r
          );
        },
        useTransition: function (e) {
          var t = zf(Vf),
            n = t[0];
          return (t = t[1]), [np(op.bind(null, t, e), [t, e]), n];
        },
      }),
      (ml = null),
      (vl = null),
      (yl = !1),
      (bl = ii.ReactCurrentOwner),
      (wl = !1),
      (_l = { dehydrated: null, retryTime: 0 }),
      (xl = function (e, t) {
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
      (Sl = function () {}),
      (Pl = function (e, t, n, r, o) {
        var i = e.memoizedProps;
        if (i !== r) {
          var a,
            s,
            l = t.stateNode;
          switch ((Tf(tl.current), (e = null), n)) {
            case "input":
              (i = Ku(l, i)), (r = Ku(l, r)), (e = []);
              break;
            case "option":
              (i = rc(l, i)), (r = rc(l, r)), (e = []);
              break;
            case "select":
              (i = Fo({}, i, { value: void 0 })),
                (r = Fo({}, r, { value: void 0 })),
                (e = []);
              break;
            case "textarea":
              (i = ic(l, i)), (r = ic(l, r)), (e = []);
              break;
            default:
              "function" != typeof i.onClick &&
                "function" == typeof r.onClick &&
                (l.onclick = Yc);
          }
          for (a in (Wc(n, r), (n = null), i))
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
                  (Ho.hasOwnProperty(a)
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
                    (Ho.hasOwnProperty(a)
                      ? (null != u && Qc(o, a), e || l === u || (e = []))
                      : (e = e || []).push(a, u));
          }
          n && (e = e || []).push("style", n),
            (o = e),
            (t.updateQueue = o) && (t.effectTag |= 4);
        }
      }),
      (kl = function (e, t, n, r) {
        n !== r && (t.effectTag |= 4);
      }),
      (Dl = "function" == typeof WeakSet ? WeakSet : Set),
      (Il = "function" == typeof WeakMap ? WeakMap : Map),
      (El = Math.ceil),
      (Tl = ii.ReactCurrentDispatcher),
      (Cl = ii.ReactCurrentOwner),
      (Al = 8),
      (Ol = 16),
      (Ml = 32),
      (Ul = 1),
      (Nl = 2),
      (Bl = 3),
      (jl = 4),
      (Ll = 5),
      (Vl = Fl = 0),
      ($l = null),
      (zl = null),
      (Hl = 0),
      (ql = Rl = 0),
      (Gl = null),
      (Wl = 1073741823),
      (Jl = 1073741823),
      (Ql = null),
      (Yl = 0),
      (Kl = !1),
      (Xl = 0),
      (Zl = 500),
      (eu = null),
      (tu = !1),
      (nu = null),
      (ru = null),
      (ou = !1),
      (iu = null),
      (au = 90),
      (su = null),
      (lu = 0),
      (uu = null),
      (cu = 0),
      (du = function (e, t, n) {
        var r = t.expirationTime;
        if (null !== e) {
          var o = t.pendingProps;
          if (e.memoizedProps !== o || xs.current) wl = !0;
          else {
            if (r < n) {
              switch (((wl = !1), t.tag)) {
                case 3:
                  wp(t), dp();
                  break;
                case 5:
                  if ((Af(t), 4 & t.mode && 1 !== n && o.hidden))
                    return (t.expirationTime = t.childExpirationTime = 1), null;
                  break;
                case 1:
                  Wd(t.type) && Kd(t);
                  break;
                case 4:
                  Cf(t, t.stateNode.containerInfo);
                  break;
                case 10:
                  (r = t.memoizedProps.value),
                    (o = t.type._context),
                    qd(zs, o._currentValue),
                    (o._currentValue = r);
                  break;
                case 13:
                  if (null !== t.memoizedState)
                    return 0 !== (r = t.child.childExpirationTime) && r >= n
                      ? _p(e, t, n)
                      : (qd(ol, 1 & ol.current),
                        null !== (t = kp(e, t, n)) ? t.sibling : null);
                  qd(ol, 1 & ol.current);
                  break;
                case 19:
                  if (
                    ((r = t.childExpirationTime >= n), 0 != (64 & e.effectTag))
                  ) {
                    if (r) return Pp(e, t, n);
                    t.effectTag |= 64;
                  }
                  if (
                    (null !== (o = t.memoizedState) &&
                      ((o.rendering = null), (o.tail = null)),
                    qd(ol, ol.current),
                    !r)
                  )
                    return null;
              }
              return kp(e, t, n);
            }
            wl = !1;
          }
        } else wl = !1;
        switch (((t.expirationTime = 0), t.tag)) {
          case 2:
            if (
              ((r = t.type),
              null !== e &&
                ((e.alternate = null),
                (t.alternate = null),
                (t.effectTag |= 2)),
              (e = t.pendingProps),
              (o = Gd(t, _s.current)),
              ff(t, n),
              (o = Bf(null, t, r, e, o, n)),
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
                Wd(r))
              ) {
                var i = !0;
                Kd(t);
              } else i = !1;
              (t.memoizedState =
                null !== o.state && void 0 !== o.state ? o.state : null),
                hf(t);
              var a = r.getDerivedStateFromProps;
              "function" == typeof a && _f(t, r, a, e),
                (o.updater = Ys),
                (t.stateNode = o),
                (o._reactInternalFiber = t),
                kf(t, r, e, n),
                (t = bp(null, t, r, !0, i, n));
            } else (t.tag = 0), fp(null, t, o, n), (t = t.child);
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
                    if ("function" == typeof e) return Ph(e) ? 1 : 0;
                    if (null != e) {
                      if ((e = e.$$typeof) === mi) return 11;
                      if (e === bi) return 14;
                    }
                    return 2;
                  })(o)),
                (e = lf(o, e)),
                i)
              ) {
                case 0:
                  t = vp(null, t, o, e, n);
                  break e;
                case 1:
                  t = yp(null, t, o, e, n);
                  break e;
                case 11:
                  t = pp(null, t, o, e, n);
                  break e;
                case 14:
                  t = hp(null, t, o, lf(o.type, e), r, n);
                  break e;
              }
              throw Error(Du(306, o, ""));
            }
            return t;
          case 0:
            return (
              (r = t.type),
              (o = t.pendingProps),
              vp(e, t, r, (o = t.elementType === r ? o : lf(r, o)), n)
            );
          case 1:
            return (
              (r = t.type),
              (o = t.pendingProps),
              yp(e, t, r, (o = t.elementType === r ? o : lf(r, o)), n)
            );
          case 3:
            if ((wp(t), (r = t.updateQueue), null === e || null === r))
              throw Error(Du(282));
            if (
              ((r = t.pendingProps),
              (o = null !== (o = t.memoizedState) ? o.element : null),
              gf(e, t),
              bf(t, r, null, n),
              (r = t.memoizedState.element) === o)
            )
              dp(), (t = kp(e, t, n));
            else {
              if (
                ((o = t.stateNode.hydrate) &&
                  ((vl = id(t.stateNode.containerInfo.firstChild)),
                  (ml = t),
                  (o = yl = !0)),
                o)
              )
                for (n = Zs(t, null, r, n), t.child = n; n; )
                  (n.effectTag = (-3 & n.effectTag) | 1024), (n = n.sibling);
              else fp(e, t, r, n), dp();
              t = t.child;
            }
            return t;
          case 5:
            return (
              Af(t),
              null === e && lp(t),
              (r = t.type),
              (o = t.pendingProps),
              (i = null !== e ? e.memoizedProps : null),
              (a = o.children),
              od(r, o)
                ? (a = null)
                : null !== i && od(r, i) && (t.effectTag |= 16),
              mp(e, t),
              4 & t.mode && 1 !== n && o.hidden
                ? ((t.expirationTime = t.childExpirationTime = 1), (t = null))
                : (fp(e, t, a, n), (t = t.child)),
              t
            );
          case 6:
            return null === e && lp(t), null;
          case 13:
            return _p(e, t, n);
          case 4:
            return (
              Cf(t, t.stateNode.containerInfo),
              (r = t.pendingProps),
              null === e ? (t.child = Xs(t, null, r, n)) : fp(e, t, r, n),
              t.child
            );
          case 11:
            return (
              (r = t.type),
              (o = t.pendingProps),
              pp(e, t, r, (o = t.elementType === r ? o : lf(r, o)), n)
            );
          case 7:
            return fp(e, t, t.pendingProps, n), t.child;
          case 8:
          case 12:
            return fp(e, t, t.pendingProps.children, n), t.child;
          case 10:
            e: {
              (r = t.type._context),
                (o = t.pendingProps),
                (a = t.memoizedProps),
                (i = o.value);
              var s = t.type._context;
              if ((qd(zs, s._currentValue), (s._currentValue = i), null !== a))
                if (
                  ((s = a.value),
                  0 ===
                    (i = Xa(s, i)
                      ? 0
                      : 0 |
                        ("function" == typeof r._calculateChangedBits
                          ? r._calculateChangedBits(s, i)
                          : 1073741823)))
                ) {
                  if (a.children === o.children && !xs.current) {
                    t = kp(e, t, n);
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
                            (((u = mf(n, null)).tag = 2), vf(s, u)),
                            s.expirationTime < n && (s.expirationTime = n),
                            null !== (u = s.alternate) &&
                              u.expirationTime < n &&
                              (u.expirationTime = n),
                            df(s.return, n),
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
              fp(e, t, o.children, n), (t = t.child);
            }
            return t;
          case 9:
            return (
              (o = t.type),
              (r = (i = t.pendingProps).children),
              ff(t, n),
              (r = r((o = pf(o, i.unstable_observedBits)))),
              (t.effectTag |= 1),
              fp(e, t, r, n),
              t.child
            );
          case 14:
            return (
              (i = lf((o = t.type), t.pendingProps)),
              hp(e, t, o, (i = lf(o.type, i)), r, n)
            );
          case 15:
            return gp(e, t, t.type, t.pendingProps, r, n);
          case 17:
            return (
              (r = t.type),
              (o = t.pendingProps),
              (o = t.elementType === r ? o : lf(r, o)),
              null !== e &&
                ((e.alternate = null),
                (t.alternate = null),
                (t.effectTag |= 2)),
              (t.tag = 1),
              Wd(r) ? ((e = !0), Kd(t)) : (e = !1),
              ff(t, n),
              Sf(t, r, o),
              kf(t, r, o, n),
              bp(null, t, r, !0, e, n)
            );
          case 19:
            return Pp(e, t, n);
        }
        throw Error(Du(156, t.tag));
      }),
      (fu = null),
      (pu = null),
      (jh.prototype.render = function (e) {
        Rh(e, this._internalRoot, null, null);
      }),
      (jh.prototype.unmount = function () {
        var e = this._internalRoot,
          t = e.containerInfo;
        Rh(null, e, null, function () {
          t[wa] = null;
        });
      }),
      (Ni = function (e) {
        if (13 === e.tag) {
          var t = sf(Wp(), 150, 100);
          Qp(e, t), Bh(e, t);
        }
      }),
      (Bi = function (e) {
        13 === e.tag && (Qp(e, 3), Bh(e, 3));
      }),
      (ji = function (e) {
        if (13 === e.tag) {
          var t = Wp();
          Qp(e, (t = Jp(t, e, null))), Bh(e, t);
        }
      }),
      (Wo = function (e, t, n) {
        switch (t) {
          case "input":
            if ((ec(e, n), (t = n.name), "radio" === n.type && null != t)) {
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
                  var o = cd(r);
                  if (!o) throw Error(Du(90));
                  Yu(r), ec(r, o);
                }
              }
            }
            break;
          case "textarea":
            sc(e, n);
            break;
          case "select":
            null != (t = n.value) && oc(e, !!n.multiple, t, !1);
        }
      }),
      (Uu = th),
      (Nu = function (e, t, n, r, o) {
        var i = Vl;
        Vl |= 4;
        try {
          return tf(98, e.bind(null, t, n, r, o));
        } finally {
          (Vl = i) === Fl && of();
        }
      }),
      (Bu = function () {
        (Vl & (1 | Ol | Ml)) === Fl &&
          ((function () {
            if (null !== su) {
              var e = su;
              (su = null),
                e.forEach(function (e, t) {
                  Mh(t, e), Xp(t);
                }),
                of();
            }
          })(),
          mh());
      }),
      (Yo = function (e, t) {
        var n = Vl;
        Vl |= 2;
        try {
          return e(t);
        } finally {
          (Vl = n) === Fl && of();
        }
      }),
      (hu = {
        Events: [
          ld,
          ud,
          cd,
          Au,
          zo,
          vd,
          function (e) {
            wc(e, md);
          },
          Mu,
          Ru,
          zc,
          xc,
          mh,
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
            (fu = function (e) {
              try {
                t.onCommitFiberRoot(
                  n,
                  e,
                  void 0,
                  64 == (64 & e.current.effectTag)
                );
              } catch (e) {}
            }),
              (pu = function (e) {
                try {
                  t.onCommitFiberUnmount(n, e);
                } catch (e) {}
              });
          } catch (e) {}
        })(
          Fo({}, e, {
            overrideHookState: null,
            overrideProps: null,
            setSuspenseHandler: null,
            scheduleUpdate: null,
            currentDispatcherRef: ii.ReactCurrentDispatcher,
            findHostInstanceByFiber: function (e) {
              return null === (e = yc(e)) ? null : e.stateNode;
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
        findFiberByHostInstance: sd,
        bundleType: 0,
        version: "16.13.1",
        rendererPackageName: "react-dom",
      }),
      (gu = hu),
      (To.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = gu),
      (mu = zh),
      (To.createPortal = mu),
      (vu = function (e) {
        if (null == e) return null;
        if (1 === e.nodeType) return e;
        var t = e._reactInternalFiber;
        if (void 0 === t) {
          if ("function" == typeof e.render) throw Error(Du(188));
          throw Error(Du(268, Object.keys(e)));
        }
        return (e = null === (e = yc(t)) ? null : e.stateNode);
      }),
      (To.findDOMNode = vu),
      (yu = function (e, t) {
        if ((Vl & (Ol | Ml)) !== Fl) throw Error(Du(187));
        var n = Vl;
        Vl |= 1;
        try {
          return tf(99, e.bind(null, t));
        } finally {
          (Vl = n), of();
        }
      }),
      (To.flushSync = yu),
      (bu = function (e, t, n) {
        if (!Lh(t)) throw Error(Du(200));
        return Vh(null, e, t, !0, n);
      }),
      (To.hydrate = bu),
      (wu = function (e, t, n) {
        if (!Lh(t)) throw Error(Du(200));
        return Vh(null, e, t, !1, n);
      }),
      (To.render = wu),
      (_u = function (e) {
        if (!Lh(e)) throw Error(Du(40));
        return (
          !!e._reactRootContainer &&
          (nh(function () {
            Vh(null, null, e, !1, function () {
              (e._reactRootContainer = null), (e[wa] = null);
            });
          }),
          !0)
        );
      }),
      (To.unmountComponentAtNode = _u),
      (xu = th),
      (To.unstable_batchedUpdates = xu),
      (Su = function (e, t) {
        return zh(
          e,
          t,
          2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null
        );
      }),
      (To.unstable_createPortal = Su),
      (Pu = function (e, t, n, r) {
        if (!Lh(n)) throw Error(Du(200));
        if (null == e || void 0 === e._reactInternalFiber) throw Error(Du(38));
        return Vh(e, t, n, !1, r);
      }),
      (To.unstable_renderSubtreeIntoContainer = Pu),
      "16.13.1",
      (To.version = "16.13.1");
  }
  var qh,
    Gh = {};
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
    ku || ((ku = !0), Hh()),
    (Gh = To),
    r({}, "unstable_batchedUpdates", function () {
      return Gh.unstable_batchedUpdates;
    }),
    (qh = Gh.unstable_batchedUpdates),
    (Tt = qh);
  const { $influx: Wh } = app;
  Wh.connect = (e) => (t) =>
    Sr((t, n) => e(t, n), null, null, { forwardRef: !0 })(t);
  const { $influx: Jh } = app;
  Jh.model = {
    store: null,
    init: function (e = {}) {
      if (this.store) return;
      const t = this._reduce.bind(this);
      return (
        d.is.development && globalThis.devToolsExtension
          ? (this.store = lr(t, e, globalThis.devToolsExtension()))
          : (this.store = lr(t, e)),
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
  const { $influx: Qh } = app,
    Yh = Symbol("isProxy"),
    Kh = Symbol("isProxifiedArray");
  let Xh = !1;
  function Zh(e) {
    if (Array.isArray(e)) {
      const t = e.map(Zh);
      return (t[Kh] = !0), t;
    }
    if ("[object Object]" !== Object.prototype.toString.call(e)) return e;
    const t = { ...e },
      n = new Set(),
      r = new Proxy(t, {
        get: function (e, r) {
          if (r in t)
            return Xh && !n.has(r) && ((t[r] = Zh(t[r])), n.add(r)), t[r];
        },
        set: function (e, n, r) {
          return (t[n] = r), !0;
        },
        deleteProperty: function (e, n) {
          return delete t[n], !0;
        },
      });
    return (r[Yh] = !0), r;
  }
  function eg(e) {
    if (e && e[Kh]) return delete e[Kh], e.map(eg);
    if (
      (Array.isArray(e) &&
        e.forEach((t, n) => {
          t && t[Yh] && (e[n] = eg(t));
        }),
      !e || !e[Yh])
    )
      return e;
    const t = {};
    for (const n in e) t[n] = eg(e[n]);
    return t;
  }
  Qh.safeModify = (e, t) => {
    const n = Zh(e),
      r = Xh;
    return (Xh = !0), t(n), (Xh = r), eg(n);
  };
  const { $influx: tg } = app;
  tg.transaction = (e) => {
    const t = tg.safeModify(tg.model.state, e);
    ng.dispatch(t);
  };
  const ng = tg.action("influx.set-state", (e, t) => t);
  var rg = {},
    og = {},
    ig = {},
    ag = {},
    sg = 1;
  ag = {
    nextValue: function () {
      return (sg = (9301 * sg + 49297) % 233280) / 233280;
    },
    seed: function (e) {
      sg = e;
    },
  };
  var lg,
    ug,
    cg,
    dg = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-";
  function fg() {
    cg = !1;
  }
  function pg(e) {
    if (e) {
      if (e !== lg) {
        if (e.length !== dg.length)
          throw new Error(
            "Custom alphabet for shortid must be " +
              dg.length +
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
              dg.length +
              " unique characters. These characters were not unique: " +
              t.join(", ")
          );
        (lg = e), fg();
      }
    } else lg !== dg && ((lg = dg), fg());
  }
  function hg() {
    return (
      cg ||
      (cg = (function () {
        lg || pg(dg);
        for (
          var e, t = lg.split(""), n = [], r = ag.nextValue();
          t.length > 0;

        )
          (r = ag.nextValue()),
            (e = Math.floor(r * t.length)),
            n.push(t.splice(e, 1)[0]);
        return n.join("");
      })())
    );
  }
  ig = {
    get: function () {
      return lg || dg;
    },
    characters: function (e) {
      return pg(e), lg;
    },
    seed: function (e) {
      ag.seed(e), ug !== e && (fg(), (ug = e));
    },
    lookup: function (e) {
      return hg()[e];
    },
    shuffled: hg,
  };
  var gg = "object" == typeof window && (window.crypto || window.msCrypto),
    mg =
      gg && gg.getRandomValues
        ? function (e) {
            return gg.getRandomValues(new Uint8Array(e));
          }
        : function (e) {
            for (var t = [], n = 0; n < e; n++)
              t.push(Math.floor(256 * Math.random()));
            return t;
          },
    vg = function (e, t, n) {
      for (
        var r = (2 << (Math.log(t.length - 1) / Math.LN2)) - 1,
          o = -~((1.6 * r * n) / t.length),
          i = "";
        ;

      )
        for (var a = e(o), s = o; s--; )
          if ((i += t[a[s] & r] || "").length === +n) return i;
    };
  var yg,
    bg,
    wg = function (e) {
      for (var t, n = 0, r = ""; !t; )
        (r += vg(mg, ig.get(), 1)), (t = e < Math.pow(16, n + 1)), n++;
      return r;
    };
  var _g = function (e) {
    var t = "",
      n = Math.floor(0.001 * (Date.now() - 1567752802062));
    return (
      n === bg ? yg++ : ((yg = 0), (bg = n)),
      (t += wg(7)),
      (t += wg(e)),
      yg > 0 && (t += wg(yg)),
      (t += wg(n))
    );
  };
  var xg,
    Sg = function (e) {
      return (
        !(!e || "string" != typeof e || e.length < 6) &&
        !new RegExp(
          "[^" + ig.get().replace(/[|\\{}()[\]^$+*?.-]/g, "\\$&") + "]"
        ).test(e)
      );
    },
    Pg = !1;
  var kg = (Pg || ((Pg = !0), (xg = {}), (xg = 0)), xg || 0);
  function Dg() {
    return _g(kg);
  }
  var Ig = Dg;
  (og = Dg).generate = Ig;
  var Eg = function (e) {
    return ig.seed(e), og;
  };
  og.seed = Eg;
  var Tg = function (e) {
    return (kg = e), og;
  };
  og.worker = Tg;
  var Cg = function (e) {
    return void 0 !== e && ig.characters(e), ig.shuffled();
  };
  og.characters = Cg;
  var Fg = Sg;
  og.isValid = Fg;
  var Ag,
    Og,
    Mg,
    Rg = t((rg = og)),
    Ug = {},
    Ng = (Ag = {});
  function Bg() {
    throw new Error("setTimeout has not been defined");
  }
  function jg() {
    throw new Error("clearTimeout has not been defined");
  }
  function Lg(e) {
    if (Og === setTimeout) return setTimeout(e, 0);
    if ((Og === Bg || !Og) && setTimeout)
      return (Og = setTimeout), setTimeout(e, 0);
    try {
      return Og(e, 0);
    } catch (t) {
      try {
        return Og.call(null, e, 0);
      } catch (t) {
        return Og.call(this, e, 0);
      }
    }
  }
  !(function () {
    try {
      Og = "function" == typeof setTimeout ? setTimeout : Bg;
    } catch (e) {
      Og = Bg;
    }
    try {
      Mg = "function" == typeof clearTimeout ? clearTimeout : jg;
    } catch (e) {
      Mg = jg;
    }
  })();
  var Vg,
    $g = [],
    zg = !1,
    Hg = -1;
  function qg() {
    zg &&
      Vg &&
      ((zg = !1),
      Vg.length ? ($g = Vg.concat($g)) : (Hg = -1),
      $g.length && Gg());
  }
  function Gg() {
    if (!zg) {
      var e = Lg(qg);
      zg = !0;
      for (var t = $g.length; t; ) {
        for (Vg = $g, $g = []; ++Hg < t; ) Vg && Vg[Hg].run();
        (Hg = -1), (t = $g.length);
      }
      (Vg = null),
        (zg = !1),
        (function (e) {
          if (Mg === clearTimeout) return clearTimeout(e);
          if ((Mg === jg || !Mg) && clearTimeout)
            return (Mg = clearTimeout), clearTimeout(e);
          try {
            Mg(e);
          } catch (t) {
            try {
              return Mg.call(null, e);
            } catch (t) {
              return Mg.call(this, e);
            }
          }
        })(e);
    }
  }
  function Wg(e, t) {
    (this.fun = e), (this.array = t);
  }
  function Jg() {}
  (Ng.nextTick = function (e) {
    var t = new Array(arguments.length - 1);
    if (arguments.length > 1)
      for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
    $g.push(new Wg(e, t)), 1 !== $g.length || zg || Lg(Gg);
  }),
    (Wg.prototype.run = function () {
      this.fun.apply(null, this.array);
    }),
    (Ng.title = "browser"),
    (Ng.browser = !0),
    (Ng.env = {}),
    (Ng.argv = []),
    (Ng.version = ""),
    (Ng.versions = {}),
    (Ng.on = Jg),
    (Ng.addListener = Jg),
    (Ng.once = Jg),
    (Ng.off = Jg),
    (Ng.removeListener = Jg),
    (Ng.removeAllListeners = Jg),
    (Ng.emit = Jg),
    (Ng.prependListener = Jg),
    (Ng.prependOnceListener = Jg),
    (Ng.listeners = function (e) {
      return [];
    }),
    (Ng.binding = function (e) {
      throw new Error("process.binding is not supported");
    }),
    (Ng.cwd = function () {
      return "/";
    }),
    (Ng.chdir = function (e) {
      throw new Error("process.chdir is not supported");
    }),
    (Ng.umask = function () {
      return 0;
    });
  var Qg = Ag;
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
        "object" == typeof Qg &&
        Qg.versions &&
        Qg.versions.node;
    i ? (r = e) : o && (r = self);
    var a = !r.JS_SHA256_NO_COMMON_JS && Ug,
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
          return new b(t, !0).update(n)[e]();
        };
      },
      g = function (e) {
        var t = h("hex", e);
        i && (t = m(t, e)),
          (t.create = function () {
            return new b(e);
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
      y = function (e) {
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
    function b(e, t) {
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
      e.length > 64 && (e = new b(n, !0).update(e).array());
      var d = [],
        f = [];
      for (o = 0; o < 64; ++o) {
        var p = e[o] || 0;
        (d[o] = 92 ^ p), (f[o] = 54 ^ p);
      }
      b.call(this, n, r),
        this.update(f),
        (this.oKeyPad = d),
        (this.inner = !0),
        (this.sharedMemory = r);
    }
    (b.prototype.update = function (e) {
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
      (b.prototype.finalize = function () {
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
      (b.prototype.hash = function () {
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
          y = this.blocks;
        for (e = 16; e < 64; ++e)
          (t =
            (((o = y[e - 15]) >>> 7) | (o << 25)) ^
            ((o >>> 18) | (o << 14)) ^
            (o >>> 3)),
            (n =
              (((o = y[e - 2]) >>> 17) | (o << 15)) ^
              ((o >>> 19) | (o << 13)) ^
              (o >>> 10)),
            (y[e] = (y[e - 16] + t + y[e - 7] + n) << 0);
        for (l = c & f, e = 0; e < 64; e += 4)
          this.first
            ? (this.is224
                ? ((i = 300032),
                  (v = ((o = y[0] - 1413257819) - 150054599) << 0),
                  (p = (o + 24177077) << 0))
                : ((i = 704751109),
                  (v = ((o = y[0] - 210244248) - 1521486534) << 0),
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
                    y[e])) <<
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
                  y[e + 1])) <<
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
                  y[e + 2])) <<
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
                  y[e + 3])) <<
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
      (b.prototype.hex = function () {
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
      (b.prototype.toString = b.prototype.hex),
      (b.prototype.digest = function () {
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
      (b.prototype.array = b.prototype.digest),
      (b.prototype.arrayBuffer = function () {
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
      (w.prototype = new b()),
      (w.prototype.finalize = function () {
        if ((b.prototype.finalize.call(this), this.inner)) {
          this.inner = !1;
          var e = this.array();
          b.call(this, this.is224, this.sharedMemory),
            this.update(this.oKeyPad),
            this.update(e),
            b.prototype.finalize.call(this);
        }
      });
    var _ = g();
    (_.sha256 = _),
      (_.sha224 = g(!0)),
      (_.sha256.hmac = y()),
      (_.sha224.hmac = y(!0)),
      a ? (Ug = _) : ((r.sha256 = _.sha256), (r.sha224 = _.sha224));
  })();
  var Yg = t(Ug);
  class Kg {
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
          t = rg.generate(),
          r = Kg._hash(this.options.secret, t);
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
        fetch(e, { body: r, method: o, headers: i }).then(Kg._toJson)
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
      return Yg(`${e}${t}`);
    }
  }
  var Xg = { Sender: Kg },
    Zg = {};
  Zg.controller = {
    init: function () {
      (this.apiSender = new Xg.Sender({ urlPrefix: d.options.apiUrl })),
        Zg.promocodeController.init({ parent: this }),
        Zg.trialController.init({ parent: this }),
        Zg.fspringController.init({ parent: this });
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
        Zg.promocodeController.updatePro(),
        Zg.trialController.updatePro(),
        Zg.fspringController.updatePro(),
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
  var em = function (e, t) {
    return (em =
      Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array &&
        function (e, t) {
          e.__proto__ = t;
        }) ||
      function (e, t) {
        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
      })(e, t);
  };
  function tm(e, t) {
    function n() {
      this.constructor = e;
    }
    em(e, t),
      (e.prototype =
        null === t ? Object.create(t) : ((n.prototype = t.prototype), new n()));
  }
  var nm = function () {
    return (nm =
      Object.assign ||
      function (e) {
        for (var t, n = 1, r = arguments.length; n < r; n++)
          for (var o in (t = arguments[n]))
            Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
        return e;
      }).apply(this, arguments);
  };
  function rm(e) {
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
  function om(e, t) {
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
  function im() {
    for (var e = [], t = 0; t < arguments.length; t++)
      e = e.concat(om(arguments[t]));
    return e;
  }
  var am = {};
  function sm(e) {
    switch (Object.prototype.toString.call(e)) {
      case "[object Error]":
      case "[object Exception]":
      case "[object DOMException]":
        return !0;
      default:
        return bm(e, Error);
    }
  }
  function lm(e) {
    return "[object ErrorEvent]" === Object.prototype.toString.call(e);
  }
  function um(e) {
    return "[object DOMError]" === Object.prototype.toString.call(e);
  }
  function cm(e) {
    return "[object DOMException]" === Object.prototype.toString.call(e);
  }
  function dm(e) {
    return "[object String]" === Object.prototype.toString.call(e);
  }
  function fm(e) {
    return null === e || ("object" != typeof e && "function" != typeof e);
  }
  function pm(e) {
    return "[object Object]" === Object.prototype.toString.call(e);
  }
  function hm(e) {
    return "undefined" != typeof Event && bm(e, Event);
  }
  function gm(e) {
    return "undefined" != typeof Element && bm(e, Element);
  }
  function mm(e) {
    return "[object RegExp]" === Object.prototype.toString.call(e);
  }
  function vm(e) {
    return Boolean(e && e.then && "function" == typeof e.then);
  }
  function ym(e) {
    return (
      pm(e) &&
      "nativeEvent" in e &&
      "preventDefault" in e &&
      "stopPropagation" in e
    );
  }
  function bm(e, t) {
    try {
      return e instanceof t;
    } catch (e) {
      return !1;
    }
  }
  function wm(e) {
    try {
      for (
        var t = e, n = [], r = 0, o = 0, i = " > ".length, a = void 0;
        t &&
        r++ < 5 &&
        !(
          "html" === (a = _m(t)) ||
          (r > 1 && o + n.length * i + a.length >= 80)
        );

      )
        n.push(a), (o += a.length), (t = t.parentNode);
      return n.reverse().join(" > ");
    } catch (e) {
      return "<unknown>";
    }
  }
  function _m(e) {
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
      (t = a.className) && dm(t))
    )
      for (n = t.split(/\s+/), i = 0; i < n.length; i++) s.push("." + n[i]);
    var l = ["type", "name", "title", "alt"];
    for (i = 0; i < l.length; i++)
      (r = l[i]), (o = a.getAttribute(r)) && s.push("[" + r + '="' + o + '"]');
    return s.join("");
  }
  r(am, "isError", function () {
    return sm;
  }),
    r(am, "isErrorEvent", function () {
      return lm;
    }),
    r(am, "isDOMError", function () {
      return um;
    }),
    r(am, "isDOMException", function () {
      return cm;
    }),
    r(am, "isString", function () {
      return dm;
    }),
    r(am, "isPrimitive", function () {
      return fm;
    }),
    r(am, "isPlainObject", function () {
      return pm;
    }),
    r(am, "isEvent", function () {
      return hm;
    }),
    r(am, "isElement", function () {
      return gm;
    }),
    r(am, "isRegExp", function () {
      return mm;
    }),
    r(am, "isThenable", function () {
      return vm;
    }),
    r(am, "isSyntheticEvent", function () {
      return ym;
    }),
    r(am, "isInstanceOf", function () {
      return bm;
    }),
    r({}, "htmlTreeAsString", function () {
      return wm;
    });
  var xm =
    Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array
      ? function (e, t) {
          return (e.__proto__ = t), e;
        }
      : function (e, t) {
          for (var n in t) e.hasOwnProperty(n) || (e[n] = t[n]);
          return e;
        });
  var Sm = (function (e) {
    function t(t) {
      var n = this.constructor,
        r = e.call(this, t) || this;
      return (
        (r.message = t),
        (r.name = n.prototype.constructor.name),
        xm(r, n.prototype),
        r
      );
    }
    return tm(t, e), t;
  })(Error);
  r({}, "SentryError", function () {
    return Sm;
  });
  var Pm = /^(?:(\w+):)\/\/(?:(\w+)(?::(\w+))?@)([\w.-]+)(?::(\d+))?\/(.+)/,
    km = "Invalid Dsn",
    Dm = (function () {
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
          var t = Pm.exec(e);
          if (!t) throw new Sm(km);
          var n = om(t.slice(1), 6),
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
              if (!e[t]) throw new Sm("Invalid Dsn: " + t + " missing");
            }),
            !this.projectId.match(/^\d+$/))
          )
            throw new Sm("Invalid Dsn: Invalid projectId " + this.projectId);
          if ("http" !== this.protocol && "https" !== this.protocol)
            throw new Sm("Invalid Dsn: Invalid protocol " + this.protocol);
          if (this.port && isNaN(parseInt(this.port, 10)))
            throw new Sm("Invalid Dsn: Invalid port " + this.port);
        }),
        e
      );
    })();
  r({}, "Dsn", function () {
    return Dm;
  });
  var Im = {},
    Em = {},
    Tm = (function () {
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
    return Tm;
  });
  var Cm = "<anonymous>";
  function Fm(e) {
    try {
      return (e && "function" == typeof e && e.name) || Cm;
    } catch (e) {
      return Cm;
    }
  }
  r({}, "getFunctionName", function () {
    return Fm;
  });
  var Am = {};
  function Om(e, t) {
    return (
      void 0 === t && (t = 0),
      "string" != typeof e || 0 === t || e.length <= t
        ? e
        : e.substr(0, t) + "..."
    );
  }
  function Mm(e, t) {
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
  function Rm(e, t) {
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
  function Um(e, t) {
    return (
      !!dm(e) &&
      (mm(t) ? t.test(e) : "string" == typeof t && -1 !== e.indexOf(t))
    );
  }
  function Nm(e, t, n) {
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
  function Bm(e) {
    return Object.keys(e)
      .map(function (t) {
        return encodeURIComponent(t) + "=" + encodeURIComponent(e[t]);
      })
      .join("&");
  }
  function jm(e) {
    if (sm(e)) {
      var t = e,
        n = { message: t.message, name: t.name, stack: t.stack };
      for (var r in t)
        Object.prototype.hasOwnProperty.call(t, r) && (n[r] = t[r]);
      return n;
    }
    if (hm(e)) {
      var o = e,
        i = {};
      i.type = o.type;
      try {
        i.target = gm(o.target)
          ? wm(o.target)
          : Object.prototype.toString.call(o.target);
      } catch (e) {
        i.target = "<unknown>";
      }
      try {
        i.currentTarget = gm(o.currentTarget)
          ? wm(o.currentTarget)
          : Object.prototype.toString.call(o.currentTarget);
      } catch (e) {
        i.currentTarget = "<unknown>";
      }
      for (var r in ("undefined" != typeof CustomEvent &&
        bm(e, CustomEvent) &&
        (i.detail = o.detail),
      o))
        Object.prototype.hasOwnProperty.call(o, r) && (i[r] = o);
      return i;
    }
    return e;
  }
  function Lm(e) {
    return (function (e) {
      return ~-encodeURI(e).split(/%..|./).length;
    })(JSON.stringify(e));
  }
  function Vm(e, t, n) {
    void 0 === t && (t = 3), void 0 === n && (n = 102400);
    var r = Hm(e, t);
    return Lm(r) > n ? Vm(e, t - 1, n) : r;
  }
  function $m(t, n) {
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
      : ym(t)
      ? "[SyntheticEvent]"
      : "number" == typeof t && t != t
      ? "[NaN]"
      : void 0 === t
      ? "[undefined]"
      : "function" == typeof t
      ? "[Function: " + Fm(t) + "]"
      : t;
  }
  function zm(e, t, n, r) {
    if ((void 0 === n && (n = 1 / 0), void 0 === r && (r = new Tm()), 0 === n))
      return (function (e) {
        var t = Object.prototype.toString.call(e);
        if ("string" == typeof e) return e;
        if ("[object Object]" === t) return "[Object]";
        if ("[object Array]" === t) return "[Array]";
        var n = $m(e);
        return fm(n) ? n : t;
      })(t);
    if (null != t && "function" == typeof t.toJSON) return t.toJSON();
    var o = $m(t, e);
    if (fm(o)) return o;
    var i = jm(t),
      a = Array.isArray(t) ? [] : {};
    if (r.memoize(t)) return "[Circular ~]";
    for (var s in i)
      Object.prototype.hasOwnProperty.call(i, s) &&
        (a[s] = zm(s, i[s], n - 1, r));
    return r.unmemoize(t), a;
  }
  function Hm(e, t) {
    try {
      return JSON.parse(
        JSON.stringify(e, function (e, n) {
          return zm(e, n, t);
        })
      );
    } catch (e) {
      return "**non-serializable**";
    }
  }
  function qm(e, t) {
    void 0 === t && (t = 40);
    var n = Object.keys(jm(e));
    if ((n.sort(), !n.length)) return "[object has no keys]";
    if (n[0].length >= t) return Om(n[0], t);
    for (var r = n.length; r > 0; r--) {
      var o = n.slice(0, r).join(", ");
      if (!(o.length > t)) return r === n.length ? o : Om(o, t);
    }
    return "";
  }
  r(Am, "truncate", function () {
    return Om;
  }),
    r(Am, "snipLine", function () {
      return Mm;
    }),
    r(Am, "safeJoin", function () {
      return Rm;
    }),
    r(Am, "isMatchingPattern", function () {
      return Um;
    }),
    r(Em, "fill", function () {
      return Nm;
    }),
    r(Em, "urlEncode", function () {
      return Bm;
    }),
    r(Em, "normalizeToSize", function () {
      return Vm;
    }),
    r(Em, "normalize", function () {
      return Hm;
    }),
    r(Em, "extractExceptionKeysForMessage", function () {
      return qm;
    });
  var Gm = function () {
      var e = this,
        t = { exports: this };
      e.__esModule = !0;
      var n = Ag;
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
                  (r.data = dm(e.body) ? e.body : JSON.stringify(Hm(e.body)));
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
    Wm = {};
  function Jm() {
    return Gm.isNodeEnv()
      ? e
      : "undefined" != typeof window
      ? window
      : "undefined" != typeof self
      ? self
      : Wm;
  }
  function Qm() {
    var e = Jm(),
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
  function Ym(e) {
    if (!e) return {};
    var t = e.match(
      /^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/
    );
    if (!t) return {};
    var n = t[6] || "",
      r = t[8] || "";
    return { host: t[4], path: t[5], protocol: t[2], relative: t[5] + n + r };
  }
  function Km(e) {
    if (e.message) return e.message;
    if (e.exception && e.exception.values && e.exception.values[0]) {
      var t = e.exception.values[0];
      return t.type && t.value
        ? t.type + ": " + t.value
        : t.type || t.value || e.event_id || "<unknown>";
    }
    return e.event_id || "<unknown>";
  }
  function Xm(e) {
    var t = Jm();
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
  function Zm(e, t, n) {
    (e.exception = e.exception || {}),
      (e.exception.values = e.exception.values || []),
      (e.exception.values[0] = e.exception.values[0] || {}),
      (e.exception.values[0].value = e.exception.values[0].value || t || ""),
      (e.exception.values[0].type = e.exception.values[0].type || n || "Error");
  }
  function ev(e, t) {
    void 0 === t && (t = {});
    try {
      (e.exception.values[0].mechanism = e.exception.values[0].mechanism || {}),
        Object.keys(t).forEach(function (n) {
          e.exception.values[0].mechanism[n] = t[n];
        });
    } catch (e) {}
  }
  function tv() {
    try {
      return document.location.href;
    } catch (e) {
      return "";
    }
  }
  r(Im, "getGlobalObject", function () {
    return Jm;
  }),
    r(Im, "uuid4", function () {
      return Qm;
    }),
    r(Im, "parseUrl", function () {
      return Ym;
    }),
    r(Im, "getEventDescription", function () {
      return Km;
    }),
    r(Im, "consoleSandbox", function () {
      return Xm;
    }),
    r(Im, "addExceptionTypeValue", function () {
      return Zm;
    }),
    r(Im, "addExceptionMechanism", function () {
      return ev;
    }),
    r(Im, "getLocationHref", function () {
      return tv;
    });
  function nv(e, t) {
    if (!t) return 6e4;
    var n = parseInt("" + t, 10);
    if (!isNaN(n)) return 1e3 * n;
    var r = Date.parse("" + t);
    return isNaN(r) ? 6e4 : r - e;
  }
  r(Im, "parseRetryAfterHeader", function () {
    return nv;
  });
  var rv = Jm(),
    ov = (function () {
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
            Xm(function () {
              rv.console.log("Sentry Logger [Log]: " + e.join(" "));
            });
        }),
        (e.prototype.warn = function () {
          for (var e = [], t = 0; t < arguments.length; t++)
            e[t] = arguments[t];
          this._enabled &&
            Xm(function () {
              rv.console.warn("Sentry Logger [Warn]: " + e.join(" "));
            });
        }),
        (e.prototype.error = function () {
          for (var e = [], t = 0; t < arguments.length; t++)
            e[t] = arguments[t];
          this._enabled &&
            Xm(function () {
              rv.console.error("Sentry Logger [Error]: " + e.join(" "));
            });
        }),
        e
      );
    })();
  rv.__SENTRY__ = rv.__SENTRY__ || {};
  var iv = rv.__SENTRY__.logger || (rv.__SENTRY__.logger = new ov());
  r({}, "logger", function () {
    return iv;
  });
  var av = {};
  function sv() {
    if (!("fetch" in Jm())) return !1;
    try {
      return new Headers(), new Request(""), new Response(), !0;
    } catch (e) {
      return !1;
    }
  }
  function lv(e) {
    return (
      e && /^function fetch\(\)\s+\{\s+\[native code\]\s+\}$/.test(e.toString())
    );
  }
  function uv() {
    if (!sv()) return !1;
    var e = Jm();
    if (lv(e.fetch)) return !0;
    var t = !1,
      n = e.document;
    if (n && "function" == typeof n.createElement)
      try {
        var r = n.createElement("iframe");
        (r.hidden = !0),
          n.head.appendChild(r),
          r.contentWindow &&
            r.contentWindow.fetch &&
            (t = lv(r.contentWindow.fetch)),
          n.head.removeChild(r);
      } catch (e) {
        iv.warn(
          "Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ",
          e
        );
      }
    return t;
  }
  function cv() {
    if (!sv()) return !1;
    try {
      return new Request("_", { referrerPolicy: "origin" }), !0;
    } catch (e) {
      return !1;
    }
  }
  function dv() {
    var e = Jm(),
      t = e.chrome,
      n = t && t.app && t.app.runtime,
      r = "history" in e && !!e.history.pushState && !!e.history.replaceState;
    return !n && r;
  }
  r(av, "supportsFetch", function () {
    return sv;
  }),
    r(av, "supportsNativeFetch", function () {
      return uv;
    }),
    r(av, "supportsReferrerPolicy", function () {
      return cv;
    }),
    r(av, "supportsHistory", function () {
      return dv;
    });
  var fv,
    pv = Jm(),
    hv = {},
    gv = {};
  function mv(e) {
    if (!gv[e])
      switch (((gv[e] = !0), e)) {
        case "console":
          !(function () {
            if (!("console" in pv)) return;
            ["debug", "info", "warn", "error", "log", "assert"].forEach(
              function (e) {
                e in pv.console &&
                  Nm(pv.console, e, function (t) {
                    return function () {
                      for (var n = [], r = 0; r < arguments.length; r++)
                        n[r] = arguments[r];
                      yv("console", { args: n, level: e }),
                        t && Function.prototype.apply.call(t, pv.console, n);
                    };
                  });
              }
            );
          })();
          break;
        case "dom":
          !(function () {
            if (!("document" in pv)) return;
            pv.document.addEventListener(
              "click",
              Pv("click", yv.bind(null, "dom")),
              !1
            ),
              pv.document.addEventListener(
                "keypress",
                kv(yv.bind(null, "dom")),
                !1
              ),
              ["EventTarget", "Node"].forEach(function (e) {
                var t = pv[e] && pv[e].prototype;
                t &&
                  t.hasOwnProperty &&
                  t.hasOwnProperty("addEventListener") &&
                  (Nm(t, "addEventListener", function (e) {
                    return function (t, n, r) {
                      return (
                        n && n.handleEvent
                          ? ("click" === t &&
                              Nm(n, "handleEvent", function (e) {
                                return function (t) {
                                  return (
                                    Pv("click", yv.bind(null, "dom"))(t),
                                    e.call(this, t)
                                  );
                                };
                              }),
                            "keypress" === t &&
                              Nm(n, "handleEvent", function (e) {
                                return function (t) {
                                  return (
                                    kv(yv.bind(null, "dom"))(t), e.call(this, t)
                                  );
                                };
                              }))
                          : ("click" === t &&
                              Pv("click", yv.bind(null, "dom"), !0)(this),
                            "keypress" === t && kv(yv.bind(null, "dom"))(this)),
                        e.call(this, t, n, r)
                      );
                    };
                  }),
                  Nm(t, "removeEventListener", function (e) {
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
            if (!("XMLHttpRequest" in pv)) return;
            var e = [],
              t = [],
              n = XMLHttpRequest.prototype;
            Nm(n, "open", function (n) {
              return function () {
                for (var r = [], o = 0; o < arguments.length; o++)
                  r[o] = arguments[o];
                var i = this,
                  a = r[1];
                (i.__sentry_xhr__ = {
                  method: dm(r[0]) ? r[0].toUpperCase() : r[0],
                  url: r[1],
                }),
                  dm(a) &&
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
                    yv("xhr", {
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
                    ? Nm(i, "onreadystatechange", function (e) {
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
              Nm(n, "send", function (n) {
                return function () {
                  for (var r = [], o = 0; o < arguments.length; o++)
                    r[o] = arguments[o];
                  return (
                    e.push(this),
                    t.push(r),
                    yv("xhr", {
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
            if (!uv()) return;
            Nm(pv, "fetch", function (e) {
              return function () {
                for (var t = [], n = 0; n < arguments.length; n++)
                  t[n] = arguments[n];
                var r = {
                  args: t,
                  fetchData: { method: bv(t), url: wv(t) },
                  startTimestamp: Date.now(),
                };
                return (
                  yv("fetch", nm({}, r)),
                  e.apply(pv, t).then(
                    function (e) {
                      return (
                        yv(
                          "fetch",
                          nm(nm({}, r), {
                            endTimestamp: Date.now(),
                            response: e,
                          })
                        ),
                        e
                      );
                    },
                    function (e) {
                      throw (
                        (yv(
                          "fetch",
                          nm(nm({}, r), { endTimestamp: Date.now(), error: e })
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
            if (!dv()) return;
            var e = pv.onpopstate;
            function t(e) {
              return function () {
                for (var t = [], n = 0; n < arguments.length; n++)
                  t[n] = arguments[n];
                var r = t.length > 2 ? t[2] : void 0;
                if (r) {
                  var o = fv,
                    i = String(r);
                  (fv = i), yv("history", { from: o, to: i });
                }
                return e.apply(this, t);
              };
            }
            (pv.onpopstate = function () {
              for (var t = [], n = 0; n < arguments.length; n++)
                t[n] = arguments[n];
              var r = pv.location.href,
                o = fv;
              if (((fv = r), yv("history", { from: o, to: r }), e))
                return e.apply(this, t);
            }),
              Nm(pv.history, "pushState", t),
              Nm(pv.history, "replaceState", t);
          })();
          break;
        case "error":
          (Dv = pv.onerror),
            (pv.onerror = function (e, t, n, r, o) {
              return (
                yv("error", { column: r, error: o, line: n, msg: e, url: t }),
                !!Dv && Dv.apply(this, arguments)
              );
            });
          break;
        case "unhandledrejection":
          (Iv = pv.onunhandledrejection),
            (pv.onunhandledrejection = function (e) {
              return (
                yv("unhandledrejection", e), !Iv || Iv.apply(this, arguments)
              );
            });
          break;
        default:
          iv.warn("unknown instrumentation type:", e);
      }
  }
  function vv(e) {
    e &&
      "string" == typeof e.type &&
      "function" == typeof e.callback &&
      ((hv[e.type] = hv[e.type] || []),
      hv[e.type].push(e.callback),
      mv(e.type));
  }
  function yv(e, t) {
    var n, r;
    if (e && hv[e])
      try {
        for (var o = rm(hv[e] || []), i = o.next(); !i.done; i = o.next()) {
          var a = i.value;
          try {
            a(t);
          } catch (t) {
            iv.error(
              "Error while triggering instrumentation handler.\nType: " +
                e +
                "\nName: " +
                Fm(a) +
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
  function bv(e) {
    return (
      void 0 === e && (e = []),
      "Request" in pv && bm(e[0], Request) && e[0].method
        ? String(e[0].method).toUpperCase()
        : e[1] && e[1].method
        ? String(e[1].method).toUpperCase()
        : "GET"
    );
  }
  function wv(e) {
    return (
      void 0 === e && (e = []),
      "string" == typeof e[0]
        ? e[0]
        : "Request" in pv && bm(e[0], Request)
        ? e[0].url
        : String(e[0])
    );
  }
  r({}, "addInstrumentationHandler", function () {
    return vv;
  });
  var _v,
    xv,
    Sv = 0;
  function Pv(e, t, n) {
    return (
      void 0 === n && (n = !1),
      function (r) {
        (_v = void 0),
          r &&
            xv !== r &&
            ((xv = r),
            Sv && clearTimeout(Sv),
            n
              ? (Sv = setTimeout(function () {
                  t({ event: r, name: e });
                }))
              : t({ event: r, name: e }));
      }
    );
  }
  function kv(e) {
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
        (_v || Pv("input", e)(t),
        clearTimeout(_v),
        (_v = setTimeout(function () {
          _v = void 0;
        }, 1e3)));
    };
  }
  var Dv = null;
  var Iv = null;
  var Ev, Tv;
  ((Tv = Ev || (Ev = {})).PENDING = "PENDING"),
    (Tv.RESOLVED = "RESOLVED"),
    (Tv.REJECTED = "REJECTED");
  var Cv = (function () {
    function e(e) {
      var t = this;
      (this._state = Ev.PENDING),
        (this._handlers = []),
        (this._resolve = function (e) {
          t._setResult(Ev.RESOLVED, e);
        }),
        (this._reject = function (e) {
          t._setResult(Ev.REJECTED, e);
        }),
        (this._setResult = function (e, n) {
          t._state === Ev.PENDING &&
            (vm(n)
              ? n.then(t._resolve, t._reject)
              : ((t._state = e), (t._value = n), t._executeHandlers()));
        }),
        (this._attachHandler = function (e) {
          (t._handlers = t._handlers.concat(e)), t._executeHandlers();
        }),
        (this._executeHandlers = function () {
          if (t._state !== Ev.PENDING) {
            var e = t._handlers.slice();
            (t._handlers = []),
              e.forEach(function (e) {
                e.done ||
                  (t._state === Ev.RESOLVED &&
                    e.onfulfilled &&
                    e.onfulfilled(t._value),
                  t._state === Ev.REJECTED &&
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
    return Cv;
  });
  var Fv = (function () {
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
          : Cv.reject(
              new Sm("Not adding Promise due to buffer limit reached.")
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
        return new Cv(function (n) {
          var r = setTimeout(function () {
            e && e > 0 && n(!1);
          }, e);
          Cv.all(t._buffer)
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
    return Fv;
  });
  var Av = function () {
      var e = this,
        t = { exports: this };
      e.__esModule = !0;
      var n = {
        nowSeconds: function () {
          return Date.now() / 1e3;
        },
      };
      var o = Gm.isNodeEnv()
          ? (function () {
              try {
                return Gm.dynamicRequire(t, "perf_hooks").performance;
              } catch (e) {
                return;
              }
            })()
          : (function () {
              var e = Jm().performance;
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
        var e = Jm().performance;
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
    Ov = (function () {
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
              ((n._breadcrumbs = im(t._breadcrumbs)),
              (n._tags = nm({}, t._tags)),
              (n._extra = nm({}, t._extra)),
              (n._contexts = nm({}, t._contexts)),
              (n._user = t._user),
              (n._level = t._level),
              (n._span = t._span),
              (n._transactionName = t._transactionName),
              (n._fingerprint = t._fingerprint),
              (n._eventProcessors = im(t._eventProcessors))),
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
            (this._tags = nm(nm({}, this._tags), e)),
            this._notifyScopeListeners(),
            this
          );
        }),
        (e.prototype.setTag = function (e, t) {
          var n;
          return (
            (this._tags = nm(nm({}, this._tags), (((n = {})[e] = t), n))),
            this._notifyScopeListeners(),
            this
          );
        }),
        (e.prototype.setExtras = function (e) {
          return (
            (this._extra = nm(nm({}, this._extra), e)),
            this._notifyScopeListeners(),
            this
          );
        }),
        (e.prototype.setExtra = function (e, t) {
          var n;
          return (
            (this._extra = nm(nm({}, this._extra), (((n = {})[e] = t), n))),
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
              : (this._contexts = nm(
                  nm({}, this._contexts),
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
              ? ((this._tags = nm(nm({}, this._tags), t._tags)),
                (this._extra = nm(nm({}, this._extra), t._extra)),
                (this._contexts = nm(nm({}, this._contexts), t._contexts)),
                t._user && (this._user = t._user),
                t._level && (this._level = t._level),
                t._fingerprint && (this._fingerprint = t._fingerprint))
              : pm(t) &&
                ((t = t),
                (this._tags = nm(nm({}, this._tags), t.tags)),
                (this._extra = nm(nm({}, this._extra), t.extra)),
                (this._contexts = nm(nm({}, this._contexts), t.contexts)),
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
          var n = nm({ timestamp: Av.dateTimestampInSeconds() }, e);
          return (
            (this._breadcrumbs =
              void 0 !== t && t >= 0
                ? im(this._breadcrumbs, [n]).slice(-t)
                : im(this._breadcrumbs, [n])),
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
              (e.extra = nm(nm({}, this._extra), e.extra)),
            this._tags &&
              Object.keys(this._tags).length &&
              (e.tags = nm(nm({}, this._tags), e.tags)),
            this._user &&
              Object.keys(this._user).length &&
              (e.user = nm(nm({}, this._user), e.user)),
            this._contexts &&
              Object.keys(this._contexts).length &&
              (e.contexts = nm(nm({}, this._contexts), e.contexts)),
            this._level && (e.level = this._level),
            this._transactionName && (e.transaction = this._transactionName),
            this._span &&
              (e.contexts = nm(
                { trace: this._span.getTraceContext() },
                e.contexts
              )),
            this._applyFingerprint(e),
            (e.breadcrumbs = im(e.breadcrumbs || [], this._breadcrumbs)),
            (e.breadcrumbs = e.breadcrumbs.length > 0 ? e.breadcrumbs : void 0),
            this._notifyEventProcessors(im(Mv(), this._eventProcessors), e, t)
          );
        }),
        (e.prototype._notifyEventProcessors = function (e, t, n, r) {
          var o = this;
          return (
            void 0 === r && (r = 0),
            new Cv(function (i, a) {
              var s = e[r];
              if (null === t || "function" != typeof s) i(t);
              else {
                var l = s(nm({}, t), n);
                vm(l)
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
  function Mv() {
    var e = Jm();
    return (
      (e.__SENTRY__ = e.__SENTRY__ || {}),
      (e.__SENTRY__.globalEventProcessors =
        e.__SENTRY__.globalEventProcessors || []),
      e.__SENTRY__.globalEventProcessors
    );
  }
  function Rv(e) {
    Mv().push(e);
  }
  var Uv = (function () {
    function e(e, t, n) {
      void 0 === t && (t = new Ov()),
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
          n = Ov.clone(t);
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
        var n = (this._lastEventId = Qm()),
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
            nm(nm({}, r), { event_id: n })
          ),
          n
        );
      }),
      (e.prototype.captureMessage = function (e, t, n) {
        var r = (this._lastEventId = Qm()),
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
            nm(nm({}, o), { event_id: r })
          ),
          r
        );
      }),
      (e.prototype.captureEvent = function (e, t) {
        var n = (this._lastEventId = Qm());
        return (
          this._invokeClient("captureEvent", e, nm(nm({}, t), { event_id: n })),
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
            var l = Av.dateTimestampInSeconds(),
              u = nm({ timestamp: l }, e),
              c = i
                ? Xm(function () {
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
        var t = Bv(this);
        try {
          e(this);
        } finally {
          Bv(t);
        }
      }),
      (e.prototype.getIntegration = function (e) {
        var t = this.getClient();
        if (!t) return null;
        try {
          return t.getIntegration(e);
        } catch (t) {
          return (
            iv.warn(
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
          (t = o.client)[e].apply(t, im(n, [o.scope]));
      }),
      (e.prototype._callExtensionMethod = function (e) {
        for (var t = [], n = 1; n < arguments.length; n++)
          t[n - 1] = arguments[n];
        var r = Nv(),
          o = r.__SENTRY__;
        if (o && o.extensions && "function" == typeof o.extensions[e])
          return o.extensions[e].apply(this, t);
        iv.warn("Extension method " + e + " couldn't be found, doing nothing.");
      }),
      e
    );
  })();
  function Nv() {
    var e = Jm();
    return (e.__SENTRY__ = e.__SENTRY__ || { extensions: {}, hub: void 0 }), e;
  }
  function Bv(e) {
    var t = Nv(),
      n = Vv(t);
    return $v(t, e), n;
  }
  function jv() {
    var e = Nv();
    return (
      (Lv(e) && !Vv(e).isOlderThan(3)) || $v(e, new Uv()),
      Gm.isNodeEnv()
        ? (function (e) {
            try {
              var t =
                (r = Nv().__SENTRY__) &&
                r.extensions &&
                r.extensions.domain &&
                r.extensions.domain.active;
              if (!t) return Vv(e);
              if (!Lv(t) || Vv(t).isOlderThan(3)) {
                var n = Vv(e).getStackTop();
                $v(t, new Uv(n.client, Ov.clone(n.scope)));
              }
              return Vv(t);
            } catch (t) {
              return Vv(e);
            }
            var r;
          })(e)
        : Vv(e)
    );
  }
  function Lv(e) {
    return !!(e && e.__SENTRY__ && e.__SENTRY__.hub);
  }
  function Vv(e) {
    return (
      (e && e.__SENTRY__ && e.__SENTRY__.hub) ||
        ((e.__SENTRY__ = e.__SENTRY__ || {}), (e.__SENTRY__.hub = new Uv())),
      e.__SENTRY__.hub
    );
  }
  function $v(e, t) {
    return (
      !!e && ((e.__SENTRY__ = e.__SENTRY__ || {}), (e.__SENTRY__.hub = t), !0)
    );
  }
  function zv(e) {
    for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
    var r = jv();
    if (r && r[e]) return r[e].apply(r, im(t));
    throw new Error(
      "No hub defined or " +
        e +
        " was not found on the hub, please open a bug report."
    );
  }
  function Hv(e, t) {
    var n;
    try {
      throw new Error("Sentry syntheticException");
    } catch (e) {
      n = e;
    }
    return zv("captureException", e, {
      captureContext: t,
      originalException: e,
      syntheticException: n,
    });
  }
  function qv(e) {
    zv("withScope", e);
  }
  var Gv = (function () {
      function e(e) {
        (this.dsn = e), (this._dsnObject = new Dm(e));
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
          return Bm({ sentry_key: this._dsnObject.user, sentry_version: "7" });
        }),
        e
      );
    })(),
    Wv = [];
  function Jv(e) {
    var t = {};
    return (
      (function (e) {
        var t = (e.defaultIntegrations && im(e.defaultIntegrations)) || [],
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
            : (r = im(t));
        var a = r.map(function (e) {
            return e.name;
          }),
          s = "Debug";
        return (
          -1 !== a.indexOf(s) && r.push.apply(r, im(r.splice(a.indexOf(s), 1))),
          r
        );
      })(e).forEach(function (e) {
        (t[e.name] = e),
          (function (e) {
            -1 === Wv.indexOf(e.name) &&
              (e.setupOnce(Rv, jv),
              Wv.push(e.name),
              iv.log("Integration installed: " + e.name));
          })(e);
      }),
      t
    );
  }
  var Qv,
    Yv,
    Kv,
    Xv,
    Zv = (function () {
      function e(e, t) {
        (this._integrations = {}),
          (this._processing = !1),
          (this._backend = new e(t)),
          (this._options = t),
          t.dsn && (this._dsn = new Dm(t.dsn));
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
            (fm(e)
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
                iv.error(e), (r._processing = !1);
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
          this._isEnabled() && (this._integrations = Jv(this._options));
        }),
        (e.prototype.getIntegration = function (e) {
          try {
            return this._integrations[e.id] || null;
          } catch (t) {
            return (
              iv.warn(
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
          return new Cv(function (n) {
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
            a = nm(nm({}, e), {
              event_id: e.event_id || (n && n.event_id ? n.event_id : Qm()),
              timestamp: e.timestamp || Av.dateTimestampInSeconds(),
            });
          this._applyClientOptions(a), this._applyIntegrationsMetadata(a);
          var s = t;
          n && n.captureContext && (s = Ov.clone(s).update(n.captureContext));
          var l = Cv.resolve(a);
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
          var n = nm(
            nm(
              nm(
                nm(
                  nm({}, e),
                  e.breadcrumbs && {
                    breadcrumbs: e.breadcrumbs.map(function (e) {
                      return nm(nm({}, e), e.data && { data: Hm(e.data, t) });
                    }),
                  }
                ),
                e.user && { user: Hm(e.user, t) }
              ),
              e.contexts && { contexts: Hm(e.contexts, t) }
            ),
            e.extra && { extra: Hm(e.extra, t) }
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
            e.message && (e.message = Om(e.message, a));
          var s = e.exception && e.exception.values && e.exception.values[0];
          s && s.value && (s.value = Om(s.value, a));
          var l = e.request;
          l && l.url && (l.url = Om(l.url, a));
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
            return Cv.reject("SDK not enabled, will not send event.");
          var s = "transaction" === e.type;
          return !s && "number" == typeof a && Math.random() > a
            ? Cv.reject("This event has been sampled, will not send event.")
            : new Cv(function (o, a) {
                r._prepareEvent(e, n, t)
                  .then(function (e) {
                    if (null !== e) {
                      var n = e;
                      if ((t && t.data && !0 === t.data.__sentry__) || !i || s)
                        return r._sendEvent(n), void o(n);
                      var l = i(e, t);
                      if (void 0 === l)
                        iv.error(
                          "`beforeSend` method has to return `null` or a valid event."
                        );
                      else if (vm(l)) r._handleAsyncBeforeSend(l, o, a);
                      else {
                        if (null === (n = l))
                          return (
                            iv.log(
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
  ((Yv = Qv || (Qv = {})).Fatal = "fatal"),
    (Yv.Error = "error"),
    (Yv.Warning = "warning"),
    (Yv.Log = "log"),
    (Yv.Info = "info"),
    (Yv.Debug = "debug"),
    (Yv.Critical = "critical"),
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
    })(Qv || (Qv = {})),
    ((Xv = Kv || (Kv = {})).Unknown = "unknown"),
    (Xv.Skipped = "skipped"),
    (Xv.Success = "success"),
    (Xv.RateLimit = "rate_limit"),
    (Xv.Invalid = "invalid"),
    (Xv.Failed = "failed"),
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
    })(Kv || (Kv = {}));
  var ey = (function () {
      function e() {}
      return (
        (e.prototype.sendEvent = function (e) {
          return Cv.resolve({
            reason:
              "NoopTransport: Event has been skipped because no Dsn is configured.",
            status: Kv.Skipped,
          });
        }),
        (e.prototype.close = function (e) {
          return Cv.resolve(!0);
        }),
        e
      );
    })(),
    ty = (function () {
      function e(e) {
        (this._options = e),
          this._options.dsn ||
            iv.warn("No DSN provided, backend will not do anything."),
          (this._transport = this._setupTransport());
      }
      return (
        (e.prototype.eventFromException = function (e, t) {
          throw new Sm("Backend has to implement `eventFromException` method");
        }),
        (e.prototype.eventFromMessage = function (e, t, n) {
          throw new Sm("Backend has to implement `eventFromMessage` method");
        }),
        (e.prototype.sendEvent = function (e) {
          this._transport.sendEvent(e).then(null, function (e) {
            iv.error("Error while sending event: " + e);
          });
        }),
        (e.prototype.getTransport = function () {
          return this._transport;
        }),
        (e.prototype._setupTransport = function () {
          return new ey();
        }),
        e
      );
    })();
  function ny(e, t) {
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
  var ry,
    oy = {},
    iy = (function () {
      function e() {
        this.name = e.id;
      }
      return (
        (e.prototype.setupOnce = function () {
          (ry = Function.prototype.toString),
            (Function.prototype.toString = function () {
              for (var e = [], t = 0; t < arguments.length; t++)
                e[t] = arguments[t];
              var n = this.__sentry_original__ || this;
              return ry.apply(n, e);
            });
        }),
        (e.id = "FunctionToString"),
        e
      );
    })(),
    ay = [/^Script error\.?$/, /^Javascript error: Script error\.? on line 0$/],
    sy = (function () {
      function e(t) {
        void 0 === t && (t = {}), (this._options = t), (this.name = e.id);
      }
      return (
        (e.prototype.setupOnce = function () {
          Rv(function (t) {
            var n = jv();
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
            ? (iv.warn(
                "Event dropped due to being internal Sentry Error.\nEvent: " +
                  Km(e)
              ),
              !0)
            : this._isIgnoredError(e, t)
            ? (iv.warn(
                "Event dropped due to being matched by `ignoreErrors` option.\nEvent: " +
                  Km(e)
              ),
              !0)
            : this._isDeniedUrl(e, t)
            ? (iv.warn(
                "Event dropped due to being matched by `denyUrls` option.\nEvent: " +
                  Km(e) +
                  ".\nUrl: " +
                  this._getEventFilterUrl(e)
              ),
              !0)
            : !this._isAllowedUrl(e, t) &&
              (iv.warn(
                "Event dropped due to not being matched by `allowUrls` option.\nEvent: " +
                  Km(e) +
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
                return Um(e, t);
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
              return Um(n, e);
            })
          );
        }),
        (e.prototype._isAllowedUrl = function (e, t) {
          if (!t.allowUrls || !t.allowUrls.length) return !0;
          var n = this._getEventFilterUrl(e);
          return (
            !n ||
            t.allowUrls.some(function (e) {
              return Um(n, e);
            })
          );
        }),
        (e.prototype._mergeOptions = function (e) {
          return (
            void 0 === e && (e = {}),
            {
              allowUrls: im(
                this._options.whitelistUrls || [],
                this._options.allowUrls || [],
                e.whitelistUrls || [],
                e.allowUrls || []
              ),
              denyUrls: im(
                this._options.blacklistUrls || [],
                this._options.denyUrls || [],
                e.blacklistUrls || [],
                e.denyUrls || []
              ),
              ignoreErrors: im(
                this._options.ignoreErrors || [],
                e.ignoreErrors || [],
                ay
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
              return iv.error("Cannot extract message for event " + Km(e)), [];
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
            return iv.error("Cannot extract url for event " + Km(e)), null;
          }
        }),
        (e.id = "InboundFilters"),
        e
      );
    })();
  r(oy, "FunctionToString", function () {
    return iy;
  }),
    r(oy, "InboundFilters", function () {
      return sy;
    });
  var ly = "?",
    uy =
      /^\s*at (?:(.*?) ?\()?((?:file|https?|blob|chrome-extension|address|native|eval|webpack|<anonymous>|[-a-z]+:|.*bundle|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i,
    cy =
      /^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:file|https?|blob|chrome|webpack|resource|moz-extension|capacitor).*?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js))(?::(\d+))?(?::(\d+))?\s*$/i,
    dy =
      /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i,
    fy = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i,
    py = /\((\S*)(?::(\d+))(?::(\d+))\)/,
    hy = /Minified React error #\d+;/i;
  function gy(e) {
    var t = null,
      n = 0;
    e &&
      ("number" == typeof e.framesToPop
        ? (n = e.framesToPop)
        : hy.test(e.message) && (n = 1));
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
              l && (!l.func && l.line && (l.func = ly), a.push(l));
          }
          if (!a.length) return null;
          return { message: vy(e), name: e.name, stack: a };
        })(e))
      )
        return my(t, n);
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
            if ((n = uy.exec(i[a]))) {
              var s = n[2] && 0 === n[2].indexOf("native");
              n[2] &&
                0 === n[2].indexOf("eval") &&
                (t = py.exec(n[2])) &&
                ((n[2] = t[1]), (n[3] = t[2]), (n[4] = t[3])),
                (r = {
                  url:
                    n[2] && 0 === n[2].indexOf("address at ")
                      ? n[2].substr("address at ".length)
                      : n[2],
                  func: n[1] || ly,
                  args: s ? [n[2]] : [],
                  line: n[3] ? +n[3] : null,
                  column: n[4] ? +n[4] : null,
                });
            } else if ((n = dy.exec(i[a])))
              r = {
                url: n[2],
                func: n[1] || ly,
                args: [],
                line: +n[3],
                column: n[4] ? +n[4] : null,
              };
            else {
              if (!(n = cy.exec(i[a]))) continue;
              n[3] && n[3].indexOf(" > eval") > -1 && (t = fy.exec(n[3]))
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
                  func: n[1] || ly,
                  args: n[2] ? n[2].split(",") : [],
                  line: n[4] ? +n[4] : null,
                  column: n[5] ? +n[5] : null,
                });
            }
            !r.func && r.line && (r.func = ly), o.push(r);
          }
          if (!o.length) return null;
          return { message: vy(e), name: e.name, stack: o };
        })(e))
      )
        return my(t, n);
    } catch (e) {}
    return { message: vy(e), name: e && e.name, stack: [], failed: !0 };
  }
  function my(e, t) {
    try {
      return nm(nm({}, e), { stack: e.stack.slice(t) });
    } catch (t) {
      return e;
    }
  }
  function vy(e) {
    var t = e && e.message;
    return t
      ? t.error && "string" == typeof t.error.message
        ? t.error.message
        : t
      : "No error message";
  }
  function yy(e) {
    var t = wy(e.stack),
      n = { type: e.name, value: e.message };
    return (
      t && t.length && (n.stacktrace = { frames: t }),
      void 0 === n.type &&
        "" === n.value &&
        (n.value = "Unrecoverable error caught"),
      n
    );
  }
  function by(e) {
    return { exception: { values: [yy(e)] } };
  }
  function wy(e) {
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
  function _y(e, t, n) {
    var r;
    if ((void 0 === n && (n = {}), lm(e) && e.error))
      return (r = by(gy((e = e.error))));
    if (um(e) || cm(e)) {
      var o = e,
        i = o.name || (um(o) ? "DOMError" : "DOMException"),
        a = o.message ? i + ": " + o.message : i;
      return Zm((r = xy(a, t, n)), a), r;
    }
    return sm(e)
      ? (r = by(gy(e)))
      : pm(e) || hm(e)
      ? (ev(
          (r = (function (e, t, n) {
            var r = {
              exception: {
                values: [
                  {
                    type: hm(e)
                      ? e.constructor.name
                      : n
                      ? "UnhandledRejection"
                      : "Error",
                    value:
                      "Non-Error " +
                      (n ? "promise rejection" : "exception") +
                      " captured with keys: " +
                      qm(e),
                  },
                ],
              },
              extra: { __serialized__: Vm(e) },
            };
            if (t) {
              var o = wy(gy(t).stack);
              r.stacktrace = { frames: o };
            }
            return r;
          })(e, t, n.rejection)),
          { synthetic: !0 }
        ),
        r)
      : (Zm((r = xy(e, t, n)), "" + e, void 0), ev(r, { synthetic: !0 }), r);
  }
  function xy(e, t, n) {
    void 0 === n && (n = {});
    var r = { message: e };
    if (n.attachStacktrace && t) {
      var o = wy(gy(t).stack);
      r.stacktrace = { frames: o };
    }
    return r;
  }
  var Sy = {},
    Py = (function () {
      function e(e) {
        (this.options = e),
          (this._buffer = new Fv(30)),
          (this._api = new Gv(this.options.dsn)),
          (this.url = this._api.getStoreEndpointWithUrlEncodedAuth());
      }
      return (
        (e.prototype.sendEvent = function (e) {
          throw new Sm("Transport Class has to implement `sendEvent` method");
        }),
        (e.prototype.close = function (e) {
          return this._buffer.drain(e);
        }),
        e
      );
    })(),
    ky = Jm(),
    Dy = (function (e) {
      function t() {
        var t = (null !== e && e.apply(this, arguments)) || this;
        return (t._disabledUntil = new Date(Date.now())), t;
      }
      return (
        tm(t, e),
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
          var n = ny(e, this._api),
            r = {
              body: n.body,
              method: "POST",
              referrerPolicy: cv() ? "origin" : "",
            };
          return (
            void 0 !== this.options.fetchParameters &&
              Object.assign(r, this.options.fetchParameters),
            void 0 !== this.options.headers &&
              (r.headers = this.options.headers),
            this._buffer.add(
              new Cv(function (e, o) {
                ky.fetch(n.url, r)
                  .then(function (n) {
                    var r = Kv.fromHttpCode(n.status);
                    if (r !== Kv.Success) {
                      if (r === Kv.RateLimit) {
                        var i = Date.now(),
                          a = n.headers.get("Retry-After");
                        (t._disabledUntil = new Date(i + nv(i, a))),
                          iv.warn(
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
    })(Py),
    Iy = (function (e) {
      function t() {
        var t = (null !== e && e.apply(this, arguments)) || this;
        return (t._disabledUntil = new Date(Date.now())), t;
      }
      return (
        tm(t, e),
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
          var n = ny(e, this._api);
          return this._buffer.add(
            new Cv(function (e, r) {
              var o = new XMLHttpRequest();
              for (var i in ((o.onreadystatechange = function () {
                if (4 === o.readyState) {
                  var n = Kv.fromHttpCode(o.status);
                  if (n !== Kv.Success) {
                    if (n === Kv.RateLimit) {
                      var i = Date.now(),
                        a = o.getResponseHeader("Retry-After");
                      (t._disabledUntil = new Date(i + nv(i, a))),
                        iv.warn(
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
    })(Py);
  r(Sy, "BaseTransport", function () {
    return Py;
  }),
    r(Sy, "FetchTransport", function () {
      return Dy;
    }),
    r(Sy, "XHRTransport", function () {
      return Iy;
    });
  var Ey = (function (e) {
      function t() {
        return (null !== e && e.apply(this, arguments)) || this;
      }
      return (
        tm(t, e),
        (t.prototype.eventFromException = function (e, t) {
          return (function (e, t, n) {
            var r = _y(t, (n && n.syntheticException) || void 0, {
              attachStacktrace: e.attachStacktrace,
            });
            return (
              ev(r, { handled: !0, type: "generic" }),
              (r.level = Qv.Error),
              n && n.event_id && (r.event_id = n.event_id),
              Cv.resolve(r)
            );
          })(this._options, e, t);
        }),
        (t.prototype.eventFromMessage = function (e, t, n) {
          return (
            void 0 === t && (t = Qv.Info),
            (function (e, t, n, r) {
              void 0 === n && (n = Qv.Info);
              var o = xy(t, (r && r.syntheticException) || void 0, {
                attachStacktrace: e.attachStacktrace,
              });
              return (
                (o.level = n),
                r && r.event_id && (o.event_id = r.event_id),
                Cv.resolve(o)
              );
            })(this._options, e, t, n)
          );
        }),
        (t.prototype._setupTransport = function () {
          if (!this._options.dsn) return e.prototype._setupTransport.call(this);
          var t = nm(nm({}, this._options.transportOptions), {
            dsn: this._options.dsn,
          });
          return this._options.transport
            ? new this._options.transport(t)
            : sv()
            ? new Dy(t)
            : new Iy(t);
        }),
        t
      );
    })(ty),
    Ty = 0;
  function Cy() {
    return Ty > 0;
  }
  function Fy() {
    (Ty += 1),
      setTimeout(function () {
        Ty -= 1;
      });
  }
  function Ay(e, t, n) {
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
          return Ay(e, t);
        });
        return e.handleEvent ? e.handleEvent.apply(this, o) : e.apply(this, o);
      } catch (e) {
        throw (
          (Fy(),
          qv(function (n) {
            n.addEventProcessor(function (e) {
              var n = nm({}, e);
              return (
                t.mechanism && (Zm(n, void 0, void 0), ev(n, t.mechanism)),
                (n.extra = nm(nm({}, n.extra), { arguments: r })),
                n
              );
            }),
              Hv(e);
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
  function Oy(e) {
    if ((void 0 === e && (e = {}), e.eventId))
      if (e.dsn) {
        var t = document.createElement("script");
        (t.async = !0),
          (t.src = new Gv(e.dsn).getReportDialogEndpoint(e)),
          e.onLoad && (t.onload = e.onLoad),
          (document.head || document.body).appendChild(t);
      } else iv.error("Missing dsn option in showReportDialog call");
    else iv.error("Missing eventId option in showReportDialog call");
  }
  var My = {},
    Ry = (function () {
      function e(t) {
        (this.name = e.id),
          (this._onErrorHandlerInstalled = !1),
          (this._onUnhandledRejectionHandlerInstalled = !1),
          (this._options = nm({ onerror: !0, onunhandledrejection: !0 }, t));
      }
      return (
        (e.prototype.setupOnce = function () {
          (Error.stackTraceLimit = 50),
            this._options.onerror &&
              (iv.log("Global Handler attached: onerror"),
              this._installGlobalOnErrorHandler()),
            this._options.onunhandledrejection &&
              (iv.log("Global Handler attached: onunhandledrejection"),
              this._installGlobalOnUnhandledRejectionHandler());
        }),
        (e.prototype._installGlobalOnErrorHandler = function () {
          var t = this;
          this._onErrorHandlerInstalled ||
            (vv({
              callback: function (n) {
                var r = n.error,
                  o = jv(),
                  i = o.getIntegration(e),
                  a = r && !0 === r.__sentry_own_request__;
                if (i && !Cy() && !a) {
                  var s = o.getClient(),
                    l = fm(r)
                      ? t._eventFromIncompleteOnError(
                          n.msg,
                          n.url,
                          n.line,
                          n.column
                        )
                      : t._enhanceEventWithInitialFrame(
                          _y(r, void 0, {
                            attachStacktrace:
                              s && s.getOptions().attachStacktrace,
                            rejection: !1,
                          }),
                          n.url,
                          n.line,
                          n.column
                        );
                  ev(l, { handled: !1, type: "onerror" }),
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
            (vv({
              callback: function (n) {
                var r = n;
                try {
                  "reason" in n
                    ? (r = n.reason)
                    : "detail" in n &&
                      "reason" in n.detail &&
                      (r = n.detail.reason);
                } catch (e) {}
                var o = jv(),
                  i = o.getIntegration(e),
                  a = r && !0 === r.__sentry_own_request__;
                if (!i || Cy() || a) return !0;
                var s = o.getClient(),
                  l = fm(r)
                    ? t._eventFromIncompleteRejection(r)
                    : _y(r, void 0, {
                        attachStacktrace: s && s.getOptions().attachStacktrace,
                        rejection: !0,
                      });
                (l.level = Qv.Error),
                  ev(l, { handled: !1, type: "onunhandledrejection" }),
                  o.captureEvent(l, { originalException: r });
              },
              type: "unhandledrejection",
            }),
            (this._onUnhandledRejectionHandlerInstalled = !0));
        }),
        (e.prototype._eventFromIncompleteOnError = function (e, t, n, r) {
          var o,
            i = lm(e) ? e.message : e;
          if (dm(i)) {
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
            a = dm(t) && t.length > 0 ? t : tv();
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
    Uy = [
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
    Ny = (function () {
      function e(t) {
        (this.name = e.id),
          (this._options = nm(
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
          var e = Jm();
          (this._options.setTimeout &&
            Nm(e, "setTimeout", this._wrapTimeFunction.bind(this)),
          this._options.setInterval &&
            Nm(e, "setInterval", this._wrapTimeFunction.bind(this)),
          this._options.requestAnimationFrame &&
            Nm(e, "requestAnimationFrame", this._wrapRAF.bind(this)),
          this._options.XMLHttpRequest &&
            "XMLHttpRequest" in e &&
            Nm(XMLHttpRequest.prototype, "send", this._wrapXHR.bind(this)),
          this._options.eventTarget) &&
            (Array.isArray(this._options.eventTarget)
              ? this._options.eventTarget
              : Uy
            ).forEach(this._wrapEventTarget.bind(this));
        }),
        (e.prototype._wrapTimeFunction = function (e) {
          return function () {
            for (var t = [], n = 0; n < arguments.length; n++)
              t[n] = arguments[n];
            var r = t[0];
            return (
              (t[0] = Ay(r, {
                mechanism: {
                  data: { function: Fm(e) },
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
              Ay(t, {
                mechanism: {
                  data: { function: "requestAnimationFrame", handler: Fm(e) },
                  handled: !0,
                  type: "instrument",
                },
              })
            );
          };
        }),
        (e.prototype._wrapEventTarget = function (e) {
          var t = Jm(),
            n = t[e] && t[e].prototype;
          n &&
            n.hasOwnProperty &&
            n.hasOwnProperty("addEventListener") &&
            (Nm(n, "addEventListener", function (t) {
              return function (n, r, o) {
                try {
                  "function" == typeof r.handleEvent &&
                    (r.handleEvent = Ay(r.handleEvent.bind(r), {
                      mechanism: {
                        data: {
                          function: "handleEvent",
                          handler: Fm(r),
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
                  Ay(r, {
                    mechanism: {
                      data: {
                        function: "addEventListener",
                        handler: Fm(r),
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
            Nm(n, "removeEventListener", function (e) {
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
                  Nm(r, e, function (t) {
                    var n = {
                      mechanism: {
                        data: { function: e, handler: Fm(t) },
                        handled: !0,
                        type: "instrument",
                      },
                    };
                    return (
                      t.__sentry_original__ &&
                        (n.mechanism.data.handler = Fm(t.__sentry_original__)),
                      Ay(t, n)
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
    By = (function () {
      function e(t) {
        (this.name = e.id),
          (this._options = nm(
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
            jv().addBreadcrumb(
              {
                category:
                  "sentry." +
                  ("transaction" === e.type ? "transaction" : "event"),
                event_id: e.event_id,
                level: e.level,
                message: Km(e),
              },
              { event: e }
            );
        }),
        (e.prototype.setupOnce = function () {
          var e = this;
          this._options.console &&
            vv({
              callback: function () {
                for (var t = [], n = 0; n < arguments.length; n++)
                  t[n] = arguments[n];
                e._consoleBreadcrumb.apply(e, im(t));
              },
              type: "console",
            }),
            this._options.dom &&
              vv({
                callback: function () {
                  for (var t = [], n = 0; n < arguments.length; n++)
                    t[n] = arguments[n];
                  e._domBreadcrumb.apply(e, im(t));
                },
                type: "dom",
              }),
            this._options.xhr &&
              vv({
                callback: function () {
                  for (var t = [], n = 0; n < arguments.length; n++)
                    t[n] = arguments[n];
                  e._xhrBreadcrumb.apply(e, im(t));
                },
                type: "xhr",
              }),
            this._options.fetch &&
              vv({
                callback: function () {
                  for (var t = [], n = 0; n < arguments.length; n++)
                    t[n] = arguments[n];
                  e._fetchBreadcrumb.apply(e, im(t));
                },
                type: "fetch",
              }),
            this._options.history &&
              vv({
                callback: function () {
                  for (var t = [], n = 0; n < arguments.length; n++)
                    t[n] = arguments[n];
                  e._historyBreadcrumb.apply(e, im(t));
                },
                type: "history",
              });
        }),
        (e.prototype._consoleBreadcrumb = function (e) {
          var t = {
            category: "console",
            data: { arguments: e.args, logger: "console" },
            level: Qv.fromString(e.level),
            message: Rm(e.args, " "),
          };
          if ("assert" === e.level) {
            if (!1 !== e.args[0]) return;
            (t.message =
              "Assertion failed: " +
              (Rm(e.args.slice(1), " ") || "console.assert")),
              (t.data.arguments = e.args.slice(1));
          }
          jv().addBreadcrumb(t, { input: e.args, level: e.level });
        }),
        (e.prototype._domBreadcrumb = function (e) {
          var t;
          try {
            t = e.event.target ? wm(e.event.target) : wm(e.event);
          } catch (e) {
            t = "<unknown>";
          }
          0 !== t.length &&
            jv().addBreadcrumb(
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
            jv().addBreadcrumb(
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
                ? jv().addBreadcrumb(
                    {
                      category: "fetch",
                      data: e.fetchData,
                      level: Qv.Error,
                      type: "http",
                    },
                    { data: e.error, input: e.args }
                  )
                : jv().addBreadcrumb(
                    {
                      category: "fetch",
                      data: nm(nm({}, e.fetchData), {
                        status_code: e.response.status,
                      }),
                      type: "http",
                    },
                    { input: e.args, response: e.response }
                  )));
        }),
        (e.prototype._historyBreadcrumb = function (e) {
          var t = Jm(),
            n = e.from,
            r = e.to,
            o = Ym(t.location.href),
            i = Ym(n),
            a = Ym(r);
          i.path || (i = o),
            o.protocol === a.protocol && o.host === a.host && (r = a.relative),
            o.protocol === i.protocol && o.host === i.host && (n = i.relative),
            jv().addBreadcrumb({
              category: "navigation",
              data: { from: n, to: r },
            });
        }),
        (e.id = "Breadcrumbs"),
        e
      );
    })(),
    jy = (function () {
      function e(t) {
        void 0 === t && (t = {}),
          (this.name = e.id),
          (this._key = t.key || "cause"),
          (this._limit = t.limit || 5);
      }
      return (
        (e.prototype.setupOnce = function () {
          Rv(function (t, n) {
            var r = jv().getIntegration(e);
            return r ? r._handler(t, n) : t;
          });
        }),
        (e.prototype._handler = function (e, t) {
          if (
            !(
              e.exception &&
              e.exception.values &&
              t &&
              bm(t.originalException, Error)
            )
          )
            return e;
          var n = this._walkErrorTree(t.originalException, this._key);
          return (e.exception.values = im(n, e.exception.values)), e;
        }),
        (e.prototype._walkErrorTree = function (e, t, n) {
          if (
            (void 0 === n && (n = []),
            !bm(e[t], Error) || n.length + 1 >= this._limit)
          )
            return n;
          var r = yy(gy(e[t]));
          return this._walkErrorTree(e[t], t, im([r], n));
        }),
        (e.id = "LinkedErrors"),
        e
      );
    })(),
    Ly = Jm(),
    Vy = (function () {
      function e() {
        this.name = e.id;
      }
      return (
        (e.prototype.setupOnce = function () {
          Rv(function (t) {
            var n, r, o;
            if (jv().getIntegration(e)) {
              if (!Ly.navigator && !Ly.location && !Ly.document) return t;
              var i =
                  (null === (n = t.request) || void 0 === n ? void 0 : n.url) ||
                  (null === (r = Ly.location) || void 0 === r
                    ? void 0
                    : r.href),
                a = (Ly.document || {}).referrer,
                s = (Ly.navigator || {}).userAgent,
                l = nm(
                  nm(
                    nm(
                      {},
                      null === (o = t.request) || void 0 === o
                        ? void 0
                        : o.headers
                    ),
                    a && { Referer: a }
                  ),
                  s && { "User-Agent": s }
                ),
                u = nm(nm({}, i && { url: i }), { headers: l });
              return nm(nm({}, t), { request: u });
            }
            return t;
          });
        }),
        (e.id = "UserAgent"),
        e
      );
    })();
  r(My, "GlobalHandlers", function () {
    return Ry;
  }),
    r(My, "TryCatch", function () {
      return Ny;
    }),
    r(My, "Breadcrumbs", function () {
      return By;
    }),
    r(My, "LinkedErrors", function () {
      return jy;
    }),
    r(My, "UserAgent", function () {
      return Vy;
    });
  var $y = "5.25.0",
    zy = (function (e) {
      function t(t) {
        return void 0 === t && (t = {}), e.call(this, Ey, t) || this;
      }
      return (
        tm(t, e),
        (t.prototype.showReportDialog = function (e) {
          void 0 === e && (e = {}),
            Jm().document &&
              (this._isEnabled()
                ? Oy(nm(nm({}, e), { dsn: e.dsn || this.getDsn() }))
                : iv.error(
                    "Trying to call showReportDialog with Sentry Client disabled"
                  ));
        }),
        (t.prototype._prepareEvent = function (t, n, r) {
          return (
            (t.platform = t.platform || "javascript"),
            (t.sdk = nm(nm({}, t.sdk), {
              name: "sentry.javascript.browser",
              packages: im((t.sdk && t.sdk.packages) || [], [
                { name: "npm:@sentry/browser", version: $y },
              ]),
              version: $y,
            })),
            e.prototype._prepareEvent.call(this, t, n, r)
          );
        }),
        (t.prototype._sendEvent = function (t) {
          var n = this.getIntegration(By);
          n && n.addSentryBreadcrumb(t), e.prototype._sendEvent.call(this, t);
        }),
        t
      );
    })(Zv),
    Hy = [
      new oy.InboundFilters(),
      new oy.FunctionToString(),
      new Ny(),
      new By(),
      new Ry(),
      new jy(),
      new Vy(),
    ];
  function qy(e) {
    if (
      (void 0 === e && (e = {}),
      void 0 === e.defaultIntegrations && (e.defaultIntegrations = Hy),
      void 0 === e.release)
    ) {
      var t = Jm();
      t.SENTRY_RELEASE &&
        t.SENTRY_RELEASE.id &&
        (e.release = t.SENTRY_RELEASE.id);
    }
    !(function (e, t) {
      !0 === t.debug && iv.enable();
      var n = jv(),
        r = new e(t);
      n.bindClient(r);
    })(zy, e);
  }
  const { $influx: Gy, $chromeBus: Wy } = app,
    Jy = [
      "ResizeObserver loop limit exceeded",
      "Unable to preventDefault inside passive event listener",
      "Extension context invalidated.",
      "Invalid or unexpected token",
      "AbortError: The play() request was interrupted by a call to pause(). https://goo.gl/LdLk22",
      "InvalidStateError: Failed to execute 'transaction' on 'IDBDatabase'",
      "Timed out",
      "Failed to fetch",
    ];
  var Qy = {
    controller: {
      throttle: !1,
      init: function ({ throttleBy: e = 10, dsn: t }) {
        if (t) {
          if (((this.dsn = t), d.is.development)) this.throttle = !1;
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
        d.is.development ||
          (qy({
            dsn: this.dsn,
            release: d.version,
            debug: d.is.development,
            ignoreErrors: Jy,
            environment: d.is.development
              ? "development"
              : d.is.production
              ? "production"
              : "unknown",
            beforeSend: (e, t) => {
              if (d.is.production && "debug" === e.level) return null;
              if (this.throttle) return null;
              const n = Gy.model;
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
              return o && Jy.some((e) => o.includes(e)) ? null : e;
            },
          }),
          log("sentry-controller: initialisation succeeded"));
      },
      sendError: function (e, t = "error", n = null, r = null) {
        console.log("%csentry", "color: #c818dc", e, n),
          d.is.background &&
            Wy.send(
              "popup.log",
              "%csentry error [background]",
              "color: #c818dc",
              e,
              n
            ),
          "string" == typeof e && (e = new Error(e)),
          zv("configureScope", (o) => {
            o.setFingerprint([e.message]), o.setLevel(t);
            const i = Gy.model;
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
          Hv(e);
      },
    },
  };
  const { $influx: Yy } = app;
  Zg.fspringController = {
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
        Yy.model.observe(
          (e) => (e.authStatus ? e.authStatus.username : null),
          () => {
            this.recordUsernames();
          },
          !0
        ),
        Yy.model.observe(
          (e) =>
            e.billing && e.billing.account ? e.billing.account.token : null,
          () => {
            this.recordUsernames();
          },
          !1
        ),
        Yy.model.observe(
          (e) =>
            e.billing && e.billing.account ? e.billing.account.token : null,
          () => {
            this.updateFSpringStatus();
          },
          !1
        );
    },
    recordUsernames: function () {
      const { billing: e, authStatus: t } = Yy.model.state,
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
          Yy.transaction((e) => {
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
      const { billing: t } = Yy.model.state,
        n = t.account ? t.account.token : null;
      if (n) {
        const t = "/fspring/data";
        this.parent.apiSender
          .send(t, { token: n })
          .then((t) => {
            if (!t || "ok" !== t.status) throw t;
            Yy.transaction((e) => {
              (e.billing.subscriptions = t.subscriptions || {}),
                (e.billing.products = t.products || {}),
                (e.billing.orders = t.orders || []);
            }),
              this.parent.reply(e, Yy.model.state.billing);
          })
          .catch((n) => {
            ("TypeError" === n.name && "Failed to fetch" === n.message) ||
              ("forbidden" === n.status ||
              "unauthorized" === n.status ||
              "account-not-found" === n.status ||
              "account-is-not-active" === n.status
                ? Yy.transaction((e) => {
                    (e.billing.account.email = null),
                      (e.billing.account.token = null);
                  })
                : Qy.controller.sendError(
                    `Unexpected API error at ${t}`,
                    "error",
                    { error: n },
                    { actor: "auth" }
                  )),
              this.parent.reply(e, Yy.model.state.billing);
          });
      } else
        Yy.transaction((e) => {
          (e.billing.optimistic = null),
            (e.billing.subscriptions = {}),
            (e.billing.products = {}),
            (e.billing.orders = []);
        }),
          this.parent.reply(e, Yy.model.state.billing);
      return !!e;
    },
    onFSpringSubscriptionSuccess: function (e, t) {
      log("billing: handling fspring subscription success..."),
        Yy.transaction((e) => {
          (e.billing.optimistic = {
            on: Date.now(),
            plan: e.billing.purchasingPlan.id,
          }),
            (e.billing.purchasingPlan = null);
        });
      const n = JSON.stringify({
          subscriptions: Yy.model.state.billing.subscriptions,
          products: Yy.model.state.billing.products,
          orders: Yy.model.state.billing.orders,
        }),
        r = Date.now();
      let o = 3e3;
      const i = () => {
        log("billing: polling server for status update..."),
          Yy.model.state.billing.optimistic &&
            this.updateFSpringStatus((e) => {
              const t = Date.now();
              t - r > 36e5
                ? Yy.transaction((e) => {
                    e.billing.optimistic = null;
                  })
                : ((e = JSON.stringify({
                    subscriptions: e.subscriptions,
                    products: e.products,
                    orders: e.orders,
                  })),
                  n === e
                    ? ((o = t - r > 3e4 ? 6e5 : 3e3), setTimeout(i, o))
                    : Yy.transaction((e) => {
                        e.billing.optimistic = null;
                      }));
            });
      };
      return setTimeout(i, o), !!t;
    },
    onFSpringSubscriptionFailure: function (e, t) {
      return (
        log("billing: handling fspring subscription failure..."),
        Yy.transaction((e) => {
          e.billing.purchasingPlan = null;
        }),
        !!t
      );
    },
  };
  const { $influx: Ky } = app;
  Zg.promocodeController = {
    init: function ({ parent: e }) {
      (this.parent = e),
        Ky.model.observe(
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
      const { username: t, userId: n } = Ky.model.state.authStatus;
      if (t) {
        const r = { username: t, userId: n };
        if (d.options.collectBillingStats) {
          const {
            followersCount: e,
            followingsCount: t,
            postsCount: o,
          } = Ky.model.state.userDetails[n] || {};
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
            Ky.model.state.billing.promocode !== n &&
              Ky.transaction((e) => (e.billing.promocode = n)),
              this.parent.reply(e, n);
          })
          .catch((t) => {
            log(`  retrieving promocode failed: ${JSON.stringify(t)}`),
              this.parent.reply(e, Ky.model.state.billing.promocode);
          });
      } else
        log("  no username to retrieve promocode for"),
          this.parent.reply(e, Ky.model.state.billing.promocode);
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
          (de.call(e, t) && M(r, n) && (n !== H || t in e)) || y(e, t, n);
        }
        function v(e, t) {
          for (var n = e.length; n--; ) if (M(e[n][0], t)) return n;
          return -1;
        }
        function y(e, t, n) {
          "__proto__" == t && Pe
            ? Pe(e, t, {
                configurable: !0,
                enumerable: !0,
                value: n,
                writable: !0,
              })
            : (e[t] = n);
        }
        function b(e, t, n, r, o, i) {
          var a,
            s = 1 & t,
            l = 2 & t,
            u = 4 & t;
          if ((n && (a = o ? n(e, r, o, i) : n(e)), a !== H)) return a;
          if (!B(e)) return e;
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
            var c = He(e),
              d = "[object Function]" == c || "[object GeneratorFunction]" == c;
            if (We(e))
              return (function (e, t) {
                if (t) return e.slice();
                var n = e.length;
                n = ye ? ye(n) : new e.constructor(n);
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
                    : Ve(be(e))),
                !s)
              )
                return l
                  ? (function (e, t) {
                      return k(e, ze(e), t);
                    })(
                      e,
                      (function (e, t) {
                        return e && k(t, V(t), e);
                      })(a, e)
                    )
                  : (function (e, t) {
                      return k(e, $e(e), t);
                    })(
                      e,
                      (function (e, t) {
                        return e && k(t, L(t), e);
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
                    return Le ? Object(Le.call(e)) : {};
                }
              })(e, c, s);
            }
          }
          if ((i || (i = new h()), (o = i.get(e)))) return o;
          if ((i.set(e, a), Qe(e)))
            return (
              e.forEach(function (r) {
                a.add(b(r, t, n, r, e, i));
              }),
              a
            );
          if (Je(e))
            return (
              e.forEach(function (r, o) {
                a.set(o, b(r, t, n, o, e, i));
              }),
              a
            );
          l = u ? (l ? T : E) : l ? V : L;
          var f = r ? H : l(e);
          return (
            (function (e, t) {
              for (
                var n = -1, r = null == e ? 0 : e.length;
                ++n < r && !1 !== t(e[n], n, e);

              );
            })(f || e, function (r, o) {
              f && (r = e[(o = r)]), m(a, o, b(r, t, n, o, e, i));
            }),
            a
          );
        }
        function w(e, t, n) {
          return (t = t(e)), Ge(e) ? t : r(t, n(e));
        }
        function _(e) {
          if (null == e) e = e === H ? "[object Undefined]" : "[object Null]";
          else if (Se && Se in Object(e)) {
            var t = de.call(e, Se),
              n = e[Se];
            try {
              e[Se] = H;
              var r = !0;
            } catch (e) {}
            var o = pe.call(e);
            r && (t ? (e[Se] = n) : delete e[Se]), (e = o);
          } else e = pe.call(e);
          return e;
        }
        function x(e) {
          return j(e) && "[object Arguments]" == _(e);
        }
        function S(e, t, n, r, o) {
          if (e === t) t = !0;
          else if (null == e || null == t || (!j(e) && !j(t)))
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
                    "[object Arguments]" == (i = s ? "[object Array]" : He(e))
                      ? "[object Object]"
                      : i);
              l =
                "[object Object]" ==
                (a =
                  "[object Arguments]" == (a = l ? "[object Array]" : He(t))
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
                        if (g === H ? f !== p && !S(f, p, n, r, o) : !g) {
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
              s = H;
            s === H && (s = e[a]), r ? y(n, a, s) : m(n, a, s);
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
            d = 2 & n ? new p() : H;
          for (a.set(e, t), a.set(t, e); ++u < l; ) {
            var f = e[u],
              h = t[u];
            if (r) var g = s ? r(h, f, u, t, e, a) : r(f, h, u, e, t, a);
            if (g !== H) {
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
              if (Le) return Le.call(e) == Le.call(t);
          }
          return !1;
        }
        function E(e) {
          return w(e, L, $e);
        }
        function T(e) {
          return w(e, V, ze);
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
          var n = null == e ? H : e[t];
          return !B(n) || (fe && fe in n) || !(U(n) ? he : G).test(O(n))
            ? H
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
            !!B(e) &&
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
        function B(e) {
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
          } else e = Ie(e);
          return e;
        }
        function V(e) {
          if (R(e)) e = g(e, !0);
          else if (B(e)) {
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
        function $() {
          return [];
        }
        function z() {
          return !1;
        }
        var H,
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
          ge = ne ? Z.Buffer : H,
          me = Z.Symbol,
          ve = Z.Uint8Array,
          ye = ge ? ge.a : H,
          be = s(Object.getPrototypeOf),
          we = Object.create,
          _e = le.propertyIsEnumerable,
          xe = se.splice,
          Se = me ? me.toStringTag : H,
          Pe = (function () {
            try {
              var e = F(Object, "defineProperty");
              return e({}, "", {}), e;
            } catch (e) {}
          })(),
          ke = Object.getOwnPropertySymbols,
          De = ge ? ge.isBuffer : H,
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
          Be = O(Ae),
          je = me ? me.prototype : H,
          Le = je ? je.valueOf : H,
          Ve = (function () {
            function e() {}
            return function (t) {
              return B(t)
                ? we
                  ? we(t)
                  : ((e.prototype = t), (t = new e()), (e.prototype = H), t)
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
                ? H
                : e
              : de.call(t, e)
              ? t[e]
              : H;
          }),
          (c.prototype.has = function (e) {
            var t = this.__data__;
            return Oe ? t[e] !== H : de.call(t, e);
          }),
          (c.prototype.set = function (e, t) {
            var n = this.__data__;
            return (
              (this.size += this.has(e) ? 0 : 1),
              (n[e] = Oe && t === H ? "__lodash_hash_undefined__" : t),
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
            return 0 > (e = v(t, e)) ? H : t[e][1];
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
        var $e = ke
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
            : $,
          ze = ke
            ? function (e) {
                for (var t = []; e; ) r(t, $e(e)), (e = be(e));
                return t;
              }
            : $,
          He = _;
        ((Ee && "[object DataView]" != He(new Ee(new ArrayBuffer(1)))) ||
          (Te && "[object Map]" != He(new Te())) ||
          (Ce && "[object Promise]" != He(Ce.resolve())) ||
          (Fe && "[object Set]" != He(new Fe())) ||
          (Ae && "[object WeakMap]" != He(new Ae()))) &&
          (He = function (e) {
            var t = _(e);
            if (
              (e = (e = "[object Object]" == t ? e.constructor : H) ? O(e) : "")
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
                case Be:
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
                return j(e) && de.call(e, "callee") && !_e.call(e, "callee");
              },
          Ge = Array.isArray,
          We = De || z,
          Je = oe
            ? i(oe)
            : function (e) {
                return j(e) && "[object Map]" == He(e);
              },
          Qe = ie
            ? i(ie)
            : function (e) {
                return j(e) && "[object Set]" == He(e);
              },
          Ye = ae
            ? i(ae)
            : function (e) {
                return j(e) && N(e.length) && !!J[_(e)];
              };
        (u.keys = L),
          (u.keysIn = V),
          (u.cloneDeep = function (e) {
            return b(e, 5);
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
          (u.isObject = B),
          (u.isObjectLike = j),
          (u.isSet = Qe),
          (u.isTypedArray = Ye),
          (u.stubArray = $),
          (u.stubFalse = z),
          (u.VERSION = "4.17.5"),
          (Z._ = u);
      }.call(this),
      n.exports
    );
  }).call({});
  const Xy = globalThis._;
  delete globalThis._;
  const { $influx: Zy } = app;
  Zg.trialController = {
    init: function ({ parent: e }) {
      (this.parent = e),
        Zy.model.observe(
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
      const t = Zy.model.state.billing.trial,
        n = await this._getCookie({ name: "tsd" });
      if (this._isCookieEmpty(n)) return void this.parent.reply(e, t);
      const r = this._mergeTrialValues(t, n);
      r.installedOn || (r.installedOn = Date.now()),
        Xy.isEqual(t, r) || Zy.transaction((e) => (e.billing.trial = r)),
        Xy.isEqual(n, r) || this._setCookie({ name: "tsd", value: r }),
        this.parent.reply(e, r);
    },
    updateCookie: async function (e) {
      const t = await this._getCookie({ name: "tsd" });
      this._isCookieEmpty(t) || (e = this._mergeTrialValues(t, e)),
        Xy.isEqual(t, e) || this._setCookie({ name: "tsd", value: e });
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
        chrome.cookies.getAll({ url: `https://${d.options.domain}` }, (n) => {
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
            url: `https://${d.options.domain}`,
            path: "/",
            httpOnly: !1,
            secure: !1,
            storeId: "0",
            domain: d.options.domain,
            sameSite: "strict",
            expirationDate: r,
          },
          n
        );
      });
    },
  };
  const { $influx: eb } = app;
  Zg.proxy = {
    isLoggedIn: function () {
      return !!eb.model.state.billing.account.token;
    },
    hasPro: function ({ feature: e } = {}) {
      var t;
      return (true);
    },
    hasTrialFeature: function (e = "*") {
      if (!d.features.trial) return !1;
      const t = eb.model.state.billing.trial;
      if (!t) return !1;
      if ("*" === e) {
        for (e in t)
          if (
            d.options.trialFeaturesLimits[e] &&
            d.options.trialFeaturesLimits[e](t)
          )
            return !1;
        return !0;
      }
      return (
        !!e &&
        (!d.options.trialFeaturesLimits[e] ||
          !d.options.trialFeaturesLimits[e](t))
      );
    },
    hasProPaid: function (e = null) {
      if (!this.isLoggedIn()) return !1;
      const t = eb.model.state.billing,
        n = Date.now(),
        r = t.optimistic || { on: 0, plan: null };
      if (r.plan === e && r.on <= n && n - r.on <= 36e5) return !0;
      for (const r in d.options.billingPlans) {
        if (e && e !== r) continue;
        const a = d.options.billingPlans[r];
        if (a.isActive) {
          if (a.isActive(eb.model.state)) return !0;
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
      const e = eb.model.state.billing.promocode;
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
      const t = eb.model.state.billing,
        n = (t.subscriptions && t.subscriptions[e]) || {};
      return n.active && "canceled" === n.state
        ? new Date(n.next).toLocaleDateString()
        : null;
    },
  };
  const tb = new Xg.Sender({ urlPrefix: d.options.apiUrl });
  function nb(e, t, n) {
    return (
      (e = e || {
        updateSnapshot: () => {},
        applySnapshot: () => {},
        getSnapshot: () => ({}),
      }).updateSnapshot((e) => {
        e.loading = !0;
      }),
      tb
        .send(t, n)
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
                Qy.controller.sendError(
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
                Qy.controller.sendError(
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
  Zg.connector = {
    isTaken: function (e, t) {
      return nb(e, "/auth/is-taken", { body: { email: t } });
    },
    login: function (e, t, n) {
      return nb(e, "/auth/login", { body: { email: t, password: n } });
    },
    register: function (e, t, n, r, o, i) {
      return nb(e, "/auth/register", {
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
      return nb(e, "/auth/verify-email", { body: { email: t, otp: n } });
    },
    changePassword: function (e, t, n, r) {
      return nb(e, "/auth/change-password", {
        body: { email: t, otp: n, newPassword: r },
      });
    },
    resendOtp: function (e, t, n) {
      return nb(e, "/auth/resend-otp", { body: { email: t, password: n } });
    },
    recoverPassword: function (e, t) {
      return nb(e, "/auth/recover-password", { body: { email: t } });
    },
    deleteAccount: function (e, t) {
      return nb(e, "/auth/delete-account", { method: "POST", token: t });
    },
    accountManagementUrl: function (e, t) {
      return nb(e, "/fspring/account-management-url", {
        method: "GET",
        token: t,
      });
    },
  };
  var rb = {
    fetch: ub,
    fetchText: async function (...e) {
      const t = await ub(...e);
      return await t.text();
    },
    fetchJson: async function (...e) {
      const t = await ub(...e);
      return await t.json();
    },
    getCache: function () {
      return ob;
    },
    cleanCache: function () {
      cb("cleaning fetcher cache"), (ob = []);
    },
    ignoreCache: function (e = 1) {
      ib += e;
    },
    isIgnoreCache: function () {
      return ib > 0;
    },
  };
  let ob = [],
    ib = 0;
  const ab = 2e4,
    sb = 864e5,
    lb = !1;
  async function ub(e, t = {}, n = ab) {
    return new Promise((r, o) => {
      (async () => {
        let i = setTimeout(() => {
          i && ((i = null), o({ message: "Timed out" }));
        }, n);
        try {
          const n = await (async function (e, t) {
            if (
              (cb(`fetching ${e}`),
              ((t = t || {}).method = t.method || "GET"),
              t.method && "GET" !== t.method)
            )
              return fetch(e, t);
            if (ib <= 0) {
              const t = Date.now();
              ob = ob.filter((e) => t - e.on < sb);
              const n = ob.find((t) => t.url === e);
              if (n) return cb("  fetch cache hit"), n.res.clone();
            } else cb("  ignoring fetch cache");
            ib > 0 && ib--;
            const n = await fetch(e, t);
            return ob.push({ url: e, on: Date.now(), res: n.clone() }), n;
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
  function cb(e) {
    lb && console.log(`%c${e}`, "color: #00ec91");
  }
  var db = rb;
  const fb = "https://www.instagram.com/",
    pb = {
      maxMentions: 30,
      base: fb,
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
      home: { url: fb },
      loginActivity: {
        url: "https://i.instagram.com/api/v1/session/login_activity/?__a=1",
      },
      post: { url: (e) => `https://www.instagram.com/p/${e}/` },
      hashtag: {
        url: (e, { json: t = !1 } = {}) =>
          t
            ? M("https://i.instagram.com/api/v1/tags/web_info", { tag_name: e })
            : `https://www.instagram.com/explore/tags/${e}/`,
      },
      explore: { url: "https://www.instagram.com/explore/grid/" },
      user: { url: (e = null) => (e ? `https://www.instagram.com/${e}/` : fb) },
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
      locale: { url: fb, regexp: /"locale":"([^"]+)"/ },
    };
  var hb = {};
  const { $influx: gb } = app,
    mb = {
      ...Zg.proxy,
      isAcknowledged: function (e) {
        return -1 !== gb.model.state.acknowledged[e];
      },
      userId: function () {
        return gb.model.state.authStatus.userId;
      },
      username: function () {
        return gb.model.state.authStatus.username;
      },
      allUsernames: function () {
        const e = gb.model.state,
          t = [],
          n = (e) => t.push(e.authStatus.username);
        n(e);
        for (const t in e.userStates) n(e.userStates[t]);
        return t;
      },
    },
    { $influx: vb } = app;
  var yb = vb.action("state.replace-state", (e, t) => t);
  const { $influx: bb } = app;
  var wb = bb.action("state.acknowledge", (e, t) => {
      const n = P.getUnixTime();
      return { ...e, acknowledged: { ...e.acknowledged, [t]: n } };
    }),
    _b = () => [
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
    xb = () => ({
      version: 248,
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
      dm: { badgeText: "", ghostModeEnabled: !0, ghostModeFailed: !1 },
      reels: { creating: !1 },
      igTask: { actionBlockCode: null, followStatus: {}, likeStatus: {} },
      later: {
        cookies: null,
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
        posts: [],
      },
      inspiration: { prefilled: !1, posts: [] },
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
    Sb = () =>
      "Hello {@name}! 👋\n\n\n  {Thank you|Thanks} {@name}! 🙏\n\n\n  /tnx follow\n  {Hi|Hey|Hello|Greetings} {@name}! Thank you so much for following! Feel free to send me a DM!\n\n\n  /tnx contact\n  {Thank you for contacting us.|Thank you for reaching out to us.|Thank you for contacting us here.} {We have received your message and will be in touch shortly.|We will be in touch shortly, and you may also find answers to some of your questions on our FAQ page.|We will be in touch soon.}\n\n\n  /sorry missed\n  Hi {@name}! I am sorry I missed your message. I will get back to you as soon as possible. I look forward to speaking with you!\n\n\n  /ask feedback\n  {Hi|Hello|Hey|Greetings}! Just wanted to follow back with you and check how you find the product? Feel free to send me your feedback, suggestions or ideas.\n\n\n  /tmm\n  Thank you for contacting us. Due to an unusual level of activity, responses are delayed. We anticipate responding to your message within two business days. In the meantime, please feel free to reach out to us via email with any urgent needs or requests.\n  "
        .split("\n")
        .map((e) => e.trim())
        .join("\n"),
    Pb = () => ({
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
      quickReplies: { shown: !1, content: Sb(), total: 7 },
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
  var kb = {
      proxy: mb,
      replaceState: yb,
      getWhatsNewItems: _b,
      getTemplateUserState: xb,
      getTemplateSharedState: Pb,
      actions: { acknowledge: wb },
    },
    Db = {},
    Ib = {};
  const { $later: Eb, $influx: Tb, $cleanup: Cb, $chromeBus: Fb } = app;
  let Ab = null,
    Ob = !1;
  Ib.controller = {
    init: async function () {
      await this._setAuthStatusIfAbsent(),
        this._refreshUserOnSessionIdChange(),
        this._watchAndSaveFbCookies(),
        this._updateUserOnPopupStart(),
        Fb.on("auth.set-ig-initial-url", this._setIgInitialUrl.bind(this)),
        Fb.on("auth.login", this._login.bind(this)),
        Fb.on("auth.logout", this._logout.bind(this));
    },
    toggleSessionWatcher: function (e) {
      Ob = !e;
    },
    updateUser: async function (e = !1) {
      log("auth-controller: updating user id...");
      const t = await this.refreshUser();
      t && (await Eb.actualizeCookies()),
        !t && e && this._navigateToInstagram();
    },
    refreshUser: async function () {
      const e = this.refreshUser,
        t = rg.generate();
      (e.requestId = t), db.ignoreCache();
      const n = await hb.api.fetchViewerInfo();
      if (e.requestId !== t) return !1;
      if (n.error) return !1;
      const r = n.result || null,
        o = r && Tb.model.state.authStatus.userId === r.userId;
      return (
        Tb.transaction((e) => {
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
                j.removeFromArray(t, e.multiaccount.selectedUserId),
              t.includes(r.userId) || t.push(r.userId),
              (e.multiaccount.selectedUserId = r.userId);
          }
          if (e.authStatus.userId) {
            e.userStates[e.authStatus.userId] = {};
            const t = kb.getTemplateUserState();
            for (const n in t) e.userStates[e.authStatus.userId][n] = e[n];
          }
          let t = null;
          r && e.userStates[r.userId]
            ? ((t = e.userStates[r.userId]), delete e.userStates[r.userId])
            : (t = kb.getTemplateUserState()),
            (t.authStatus.userId = (null == r ? void 0 : r.userId) || null),
            (t.authStatus.username = (null == r ? void 0 : r.username) || null),
            (t.authStatus.avatarUrl =
              (null == r ? void 0 : r.avatarUrl) || null),
            (t.authStatus.isLoggedIn = !!r),
            Object.assign(e, t);
        }),
        await this._actualizeCoookies(),
        o ||
          (Fb.send("iframe-bus", "ig.clear-and-show-spinner"),
          r
            ? Ab
              ? Fb.send("iframe-bus", "ig.hard-go", Ab)
              : (Cb.controller.cleanUpState(), Fb.send("igView.refresh"))
            : Fb.send("iframe-bus", "ig.hard-go", "/accounts/login/"),
          Fb.send("iframe-bus", "dm.refresh"),
          Fb.send("iframe-bus", "schedule.fcs-refresh-page")),
        (Ab = null),
        Fb.send("auth.refreshed"),
        !!r
      );
    },
    _clearCookies: async function (e) {
      const t = await j.callAsync(chrome.cookies.getAll, { domain: `.${e}` });
      for (const n of t)
        await j.callAsync(chrome.cookies.remove, {
          url: `https://*.${e}`,
          name: n.name,
        });
    },
    _updateUserOnPopupStart: function () {
      let e = null;
      Fb.on("popup.start", async () => {
        var t, n;
        const r = await j.callAsync(chrome.cookies.get, {
            url: "https://*.instagram.com",
            name: "sessionid",
          }),
          o =
            null === (t = Tb.model.state.authStatus) ||
            void 0 === t ||
            null === (n = t.cookies) ||
            void 0 === n
              ? void 0
              : n.igSessionId,
          i = Date.now();
        (r && o === r.value && e && i - e <= 6 * j.time.HOUR) ||
          ((e = i), await this.updateUser());
      });
    },
    _navigateToInstagram: function () {
      chrome.tabs.update({ url: pb.login.url });
    },
    _setAuthStatusIfAbsent: async function () {
      if ("username" in Tb.model.state.authStatus) return;
      db.ignoreCache();
      const e = await hb.api.fetchViewerInfo();
      if (e.error) return;
      const t = e.result || null;
      Tb.transaction((e) => {
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
      Db.controller.onRequest(({ details: n, isResponse: r, checkHost: o }) => {
        if (r && o("facebook.com")) {
          !!n.responseHeaders.find((e) => "set-cookie" === e.name) &&
            (clearTimeout(e), (e = setTimeout(t)));
        }
      });
      const t = async () => {
        const e = await j.callAsync(chrome.cookies.getAll, {
          domain: ".facebook.com",
        });
        Tb.transaction((t) => {
          t.authStatus.cookies.fb = e;
        });
      };
    },
    _setIgInitialUrl: function (e) {
      Ab = e;
    },
    _login: async function (e) {
      var t;
      const n =
        null === (t = Tb.model.state.userStates[e]) || void 0 === t
          ? void 0
          : t.authStatus;
      if (n) {
        this.toggleSessionWatcher(!1);
        try {
          await this._clearCookies("facebook.com"),
            await this._applyCookies("facebook.com", n.cookies.fb),
            await this._clearCookies("instagram.com"),
            await this._applyCookies("instagram.com", n.cookies.ig),
            await j.callAsync(chrome.cookies.set, {
              url: "https://*.instagram.com",
              name: "sessionid",
              value: n.cookies.igSessionId,
              domain: ".instagram.com",
              path: "/",
              secure: !0,
              httpOnly: !1,
              sameSite: "no_restriction",
              expirationDate: Math.round((Date.now() + 365 * j.time.DAY) / 1e3),
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
          (await j.callAsync(chrome.cookies.set, {
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
      return Ob;
    },
    _actualizeCoookies: async function () {
      const e = await j.callAsync(chrome.cookies.get, {
          url: "https://*.instagram.com",
          name: "sessionid",
        }),
        t = await j.callAsync(chrome.cookies.getAll, {
          domain: ".facebook.com",
        }),
        n = await j.callAsync(chrome.cookies.getAll, {
          domain: ".instagram.com",
        });
      Tb.transaction((r) => {
        (r.authStatus.cookies.igSessionId =
          (null == e ? void 0 : e.value) || null),
          (r.authStatus.cookies.ig = n),
          (r.authStatus.cookies.fb = t);
      });
    },
  };
  var Mb = {};
  const { $influx: Rb } = app;
  (Mb.controller = {
    status: null,
    init: function () {
      this._subscribeToInflux();
    },
    _subscribeToInflux: function () {
      Rb.model.observe(
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
    (hb.ec = {
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
  const Ub = hb.ec,
    Nb = {
      "Failed to fetch": Ub.noNetwork,
      "Timed out": Ub.timedOut,
      "Redirect to login": Ub.redirectToLogin,
      "Missing user": Ub.missingUser,
      400: Ub.suspended,
      "400x": Ub.missingPost,
      403: Ub.forbidden,
      404: Ub.notFound,
      429: Ub.tooManyRequests,
      500: Ub.serverIsDown,
      502: Ub.badGateway,
      503: Ub.serviceUnavailable,
      560: Ub.serviceDown,
    };
  hb.Response = class e {
    constructor(e, t, n, r) {
      (this.result = e),
        (this.error = t ? { code: t, message: n, body: r } : null);
    }
    isSuccess() {
      return !this.error;
    }
    reportError(e, t) {
      return (
        this.error.code === Ub.other &&
          Qy.controller.sendError(
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
      const n = (t && t.message && Nb[t.message]) || Ub.other,
        r = (t && t.message) || null,
        o = (t && t.body) || null;
      return new e(null, n, r, o);
    }
  };
  const { $chromeBus: Bb } = app,
    jb = { headers: { "x-ig-app-id": "1217981644879628" } };
  function Lb(e, t) {
    const n = Date.now();
    return e * (Math.log(0.061 * j.time.DAY) / Math.log(0.061 * (n - t)));
  }
  function Vb(e) {
    if (e && e.includes(pb.challenge)) {
      const e = new Error();
      throw ((e.message = "400"), (e.body = "Challenge"), e);
    }
    return e;
  }
  function $b(e) {
    if (e && e.includes(pb.login.link)) {
      const e = new Error();
      throw (
        ((e.message = "Redirect to login"), (e.body = "Redirect to login"), e)
      );
    }
    return e;
  }
  function zb(e, t) {
    const n = async function (...n) {
      try {
        const t = await e(...n);
        return hb.Response.ofResult(t);
      } catch (e) {
        return hb.Response.ofNetworkError(e).reportError(t, e);
      }
    };
    return Bb.on(`ig-api.${t}`, n), n;
  }
  (hb.api = {
    fetchViewerInfo: zb(async function () {
      try {
        return await (async function () {
          db.ignoreCache();
          const e = (await db.fetchText("https://instagram.com"))
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
          return {
            userId: n("viewerId"),
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
          const e =
            "https://i.instagram.com/api/v1/accounts/edit/web_form_data/";
          db.ignoreCache();
          const t = await db.fetchText(e, jb),
            n = j.safeJsonParse(t);
          if (!n) return null;
          const r = n.form_data.username,
            o = await (async function (e) {
              var t;
              const n = j.createUrl(
                  "https://i.instagram.com/api/v1/users/web_profile_info/",
                  { username: e }
                ),
                r = await db.fetchJson(n, jb);
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
    }, "fetch-viewer-info"),
    fetchLoginActivity: zb(async function () {
      return db.fetchJson(pb.loginActivity.url, jb);
    }, "fetch-login-activity"),
    fetchTag: zb(async function (e, { incognito: t = !1 } = {}) {
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
        const n = pb.hashtag.url(e, { json: !0 }),
          o = t ? "omit" : "include";
        db.ignoreCache(),
          (r = await db.fetchText(n, { credentials: o, ...jb }));
      } catch (e) {
        if ("404" !== e.message) throw e;
        o = !0;
      }
      if ((Vb(r), $b(r), o)) return (n.isBanned = !0), (n.isFlagged = !1), n;
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
              return { likes: Lb(r, n), comments: Lb(o, n) };
            })
            .sort(
              (e, t) =>
                j.calcEngagement(e.likes, t.comments) -
                j.calcEngagement(t.likes, t.comments)
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
          a = Math.round(j.time.DAY / r);
        }
        let u = [];
        {
          const t = {},
            n = [
              { edges: r, relevance: 2 },
              { edges: o, relevance: 1 },
            ];
          for (const e of n) {
            const n = j.getHashtagRegex(),
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
              return { likes: Lb(n, t), comments: Lb(r, t) };
            })
            .sort(
              (e, t) =>
                j.calcEngagement(e.likes, t.comments) -
                j.calcEngagement(t.likes, t.comments)
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
            l = Math.round(j.time.DAY / n);
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
            const n = j.getHashtagRegex(),
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
    fetchUserPosts: zb(async function e(t, n = 10, r = [], o = null) {
      const i = j.createUrl(
          `https://i.instagram.com/api/v1/feed/user/${t}/username/`,
          { count: 33, ...(o && { max_id: o }) }
        ),
        a = await db.fetchJson(i, jb);
      r.push(...a.items),
        r.length < n && a.more_available && (await e(t, n, r, a.next_max_id));
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
      });
    }, "fetch-user-posts"),
    searchProfiles: zb(async function (e) {
      const t = j.createUrl(`${pb.base}web/search/topsearch/`, {
        context: "user",
        query: e,
      });
      return (await db.fetchJson(t)).users.map((e) => ({
        id: e.user.pk,
        username: e.user.username,
        fullName: e.user.full_name,
        avatar: e.user.profile_pic_url,
      }));
    }, "search-profiles"),
    normalizePostStat24h: Lb,
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
  }),
    (hb.Publisher = class {
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
        const r = await j.extractFrame(e, 0);
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
            j.file.isVideo(t)
              ? (this._log(`⏳ ${r} upload video...`),
                await this._uploadVideo(o, t, { type: "carousel" }),
                this._log(`⏳ ${r} upload video cover...`),
                a || (a = await j.extractFrame(t, 0.5)),
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
        const { width: o, height: i } = await j.loadImage(t);
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
      async _fetch({
        url: e,
        opts: t = {},
        attempts: n = 1,
        checkResponse: r,
      }) {
        r || (r = (e) => 200 === e.status),
          this._cookies
            ? (t.headers || (t.headers = {}),
              (t.headers["x-inssist-cookies"] = JSON.stringify(this._cookies)))
            : (t.credentials = "include");
        const o = async (o = "Failed to fetch") => {
          if ((n -= 1) <= 0) throw new Error(o);
          await j.sleep(3 * j.time.SECOND);
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
            console.error("Failed to call res.text()", {
              url: e,
              opts: t,
              e: n,
            }),
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
    });
  var Hb = {};
  Hb.controller = {
    init: function () {
      j.ls.remove("ab-testing-hash");
    },
  };
  const { $later: qb, $influx: Gb } = app;
  qb.actualizeCookies = async () => {
    const e = await j.callAsync(chrome.cookies.getAll, {
      domain: ".instagram.com",
    });
    Gb.transaction((t) => {
      t.later.cookies = {};
      for (const n of e) t.later.cookies[n.name] = n.value;
    });
  };
  const { $later: Wb } = app;
  Wb.config = {
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
    minTimeBetweenPublishing: 10 * j.time.SECOND,
    minTimeFromNow: 5 * j.time.MINUTE,
  };
  const { $later: Jb, $chromeBus: Qb, $files: Yb } = app;
  Jb.cleanupController = {
    init: function () {
      (this._lastIdbCleanupAt = 0),
        Qb.on("popup.start", () => this._cleanupIdb());
    },
    _cleanupIdb: async function () {
      const e = Date.now();
      if (e - this._lastIdbCleanupAt < 5 * j.time.MINUTE) return;
      this._lastIdbCleanupAt = e;
      const t = await Yb.controller.getFileIds("later"),
        n = Jb.proxy.getAllPosts();
      for (const e of t) {
        !!n.find((t) =>
          t.mediaList.some(
            (t) => t.fileId === e || t.coverId === e || t.previewId === e
          )
        ) || (await Yb.controller.remove(e));
      }
    },
  };
  const { $later: Kb, $influx: Xb } = app;
  Kb.controller = {
    init: function () {
      this._cleanupState(), Kb.scheduler.init(), Kb.cleanupController.init();
    },
    _cleanupState: function () {
      Xb.transaction((e) => {
        e.later.posts
          .filter((e) => "posting" === e.status)
          .forEach((e) => (e.status = "scheduled"));
      });
    },
  };
  var Zb = {};
  var ew = {
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
    tw = {};
  const { $later: nw, $influx: rw, $files: ow } = app;
  nw.scheduler = {
    init: function () {
      (this._timer = null),
        (this._debug = !0),
        (this._publishing = !1),
        (this._lastPublishedAt = 0),
        this._setup();
    },
    _setup: function () {
      this._schedule(),
        rw.model.observe(
          () =>
            nw.proxy
              .getConnectedUsersPosts()
              .map((e) => `${e.id}-${e.date}-${e.status}`)
              .join(":"),
          () => this._schedule(),
          !1
        ),
        rw.model.observe(
          (e) => e.later.selectedPostId,
          () => this._schedule(),
          !1
        );
    },
    _schedule: function () {
      if (this._publishing) return;
      this._timer && this._timer.clear();
      const e = rw.model.state,
        t = nw.proxy
          .getConnectedUsersPosts()
          .filter((e) => "scheduled" === e.status)
          .sort((e, t) => e.date - t.date)
          .at(0);
      if (!t) return void this._log("no posts to publish");
      const n = nw.proxy.getPostOwnerState(e, t.id),
        r = (null == n ? void 0 : n.authStatus.username) || null,
        o = { post: t, owner: r };
      let i;
      const a = Date.now();
      if (
        ((i =
          0 === e.settings.laterAutoRetry
            ? t.date < a - 5 * j.time.MINUTE
            : -1 !== e.settings.laterAutoRetry &&
              t.date < a - e.settings.laterAutoRetry),
        i)
      )
        return (
          this._log("too old to publish", o),
          void nw.proxy.updatePost(t.id, (e) => {
            (e.status = "failed"),
              (e.error = { message: "Chrome was offline at the given time" });
          })
        );
      if (t.date > a) {
        const e = new Date(t.date).toLocaleString();
        return (
          this._log(`scheduled for ${e}`, o),
          void (this._timer = j.setTimer(() => this._schedule(), t.date - a))
        );
      }
      (async () => {
        this._log("publish", o),
          (this._publishing = !0),
          tw.controller.online
            ? await this._publishSafe(t)
            : await tw.controller.waitForOnline(),
          (this._publishing = !1),
          this._schedule();
      })();
    },
    _publishSafe: async function (e) {
      const t = nw.proxy.getPostPublishTypeForAnalytics(e);
      Ib.controller.toggleSessionWatcher(!1);
      try {
        await this._publish(e),
          Zb.controller.sendEvent("user", "later:publish-success", t);
      } catch (r) {
        var n;
        console.error(r);
        const o =
          (null === (n = r.message) || void 0 === n
            ? void 0
            : n.slice(0, 100)) || "unknown";
        Zb.controller.sendEvent("user", "later:publish-error", t),
          Zb.controller.sendEvent("user", "later:publish-error-message", o),
          nw.proxy.updatePost(e.id, (e) => {
            (e.status = "failed"),
              (e.error = {
                message: "Error happened during posting",
                details: r.message ? r.message.slice(0, 300) : null,
              });
          });
      }
      Ib.controller.toggleSessionWatcher(!0),
        (this._lastPublishedAt = Date.now());
    },
    _publish: async function (e) {
      const t = rw.model.state,
        n = () => nw.proxy.getPostOwnerState(t, e.id);
      nw.proxy.updatePost(e.id, (e) => {
        (e.status = "posting"), (e.error = null);
      });
      n().authStatus.userId === t.authStatus.userId &&
        (await nw.actualizeCookies());
      const r = Date.now() - this._lastPublishedAt,
        o = nw.config.minTimeBetweenPublishing;
      r < o && (await j.sleep(o - r));
      const i = n().later.cookies;
      if (!i)
        return void nw.proxy.updatePost(e.id, (e) => {
          (e.status = "failed"),
            (e.error = {
              message: "Error happened during posting",
              details:
                "Login session for this account has expired. Please login again to schedule.",
            });
        });
      if (tw.controller.offline)
        return void nw.proxy.updatePost(e.id, (e) => (e.status = "scheduled"));
      const a = (e.caption || "").slice(0, nw.config.maxCaptionLength),
        s = new hb.Publisher(i);
      if ("post" === e.type || "reel" === e.type) {
        const t = ew.validateCaption(a);
        if (t)
          return void nw.proxy.updatePost(e.id, (e) => {
            (e.status = "failed"),
              (e.error = {
                message: "Error happened during posting",
                details: t,
              });
          });
      }
      for (const t of e.mediaList) {
        const n = nw.proxy.getMediaError(e, t);
        if (n)
          return void nw.proxy.updatePost(e.id, (e) => {
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
          await s.postCarousel(t, { caption: a });
        } else if (e.mediaList[0].isVideo) {
          const t = await ow.controller.read(e.mediaList[0].fileId),
            n = await ow.controller.read(e.mediaList[0].coverId);
          await s.postVideo(t, n, {
            caption: a,
            location: e.location,
            mentions: e.mentions,
          });
        } else {
          const t = await ow.controller.read(e.mediaList[0].fileId);
          await s.postPhoto(t, {
            caption: a,
            location: e.location,
            mentions: e.mentions,
          });
        }
      else if ("reel" === e.type)
        for (const t of e.mediaList) {
          const n = t === e.mediaList[0],
            r = await ow.controller.read(t.fileId),
            o = await ow.controller.read(t.coverId);
          await s.postReel(r, o, {
            caption: n ? a : "",
            location: e.location,
            mentions: n ? e.mentions : [],
            shareToFeed: !!e.shareToFeed,
          }),
            await j.sleep(nw.config.minTimeBetweenPublishing);
        }
      else if ("story" === e.type)
        for (const t of e.mediaList) {
          const n = t === e.mediaList[0],
            r = await ow.controller.read(t.fileId),
            o = { mentions: n ? e.mentions : [] };
          t.isVideo
            ? await s.postStoryVideo(r, o)
            : await s.postStoryPhoto(r, o),
            await j.sleep(nw.config.minTimeBetweenPublishing);
        }
      e.instant ||
        (rw.transaction((e) => (e.billing.trial.later += 1)),
        true &&
          Zb.controller.sendEvent("user", "pro-paid-usage:later")),
        nw.proxy.updatePost(e.id, (e) => {
          (e.status = "posted"), (e.date = Date.now());
        });
    },
    _prepareCarouselFiles: async function (e) {
      const t = [];
      for (const n of e.mediaList) {
        const e = await ow.controller.read(n.fileId),
          r = n.coverId && (await ow.controller.read(n.coverId));
        t.push({ file: e, cover: r, isVideo: n.isVideo });
      }
      let n, r;
      {
        const e = t[0];
        if (e.isVideo) {
          n = (await j.loadVideoMetadata(e.file)).ratio;
        } else {
          n = (await j.loadImage(e.file)).ratio;
        }
      }
      {
        const e = nw.config.minImageRatio,
          t = nw.config.maxImageRatio;
        r = Math.max(e, Math.min(n, t));
      }
      for (const e of t) {
        (e === t[0] && n === r) ||
          e.isVideo ||
          (e.file = await j.scaler.scaleToFitRatio(e.file, r));
      }
      return t
        .filter((e) => {
          const t = nw.config.maxCarouselVideoDurationSec;
          return !(e.isVideo && e.duration > t);
        })
        .map((e) => ({ blob: e.file, ...(e.cover && { coverBlob: e.cover }) }));
    },
    _log: function (...e) {
      this._debug && console.log("%c[$later]", "color: #e07a00", ...e);
    },
  };
  const { $later: iw, $influx: aw } = app;
  iw.proxy = {
    getAllStates: function (e = aw.model.state) {
      return [e, ...Object.values(e.userStates)];
    },
    getAllConnectedStates: function (e = aw.model.state) {
      return this.getAllStates(e).filter((t) => {
        const n = t.authStatus.userId;
        return e.multiaccount.userIds.includes(n);
      });
    },
    getSelectedUserState: function (e = aw.model.state) {
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
      const t = [...e.later.posts];
      return t.sort((e, n) => {
        if ("draft" !== e.status && "draft" === n.status) return 1;
        if ("draft" === e.status && "draft" !== n.status) return -1;
        if (e.date && n.date) return n.date - e.date;
        if (e.date) return 1;
        if (n.date) return -1;
        const r = t.indexOf(e);
        return t.indexOf(n) - r;
      });
    },
    getAllPosts: function (e = aw.model.state) {
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
      const e = aw.model.state;
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
      aw.transaction((n) => {
        const r = (n = this.getPostOwnerState(n, e)).later.posts.find(
          (t) => t.id === e
        );
        r && t(r);
      });
    },
    deletePost: function (e) {
      aw.transaction((t) => {
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
        t.duration > iw.config.maxCarouselVideoDurationSec
        ? {
            message:
              "Instagram does not support videos longer than 1 minute for carousels.",
          }
        : "story" === e.type &&
          t.isVideo &&
          t.duration > iw.config.maxStoryDurationSec
        ? {
            message:
              "Instagram does not support videos longer than 5 minutes for stories.",
          }
        : "reel" !== e.type || t.isVideo
        ? null
        : { message: "Instagram does not support photos as reels." };
    },
  };
  var sw = {
    get: async function (e) {
      const t = await uw();
      return (
        await lw,
        (lw = new Promise((n, r) => {
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
        lw
      );
    },
    set: async function (e, t) {
      const n = await uw();
      return (
        await lw,
        (lw = new Promise((r, o) => {
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
        lw
      );
    },
    delete: async function (e) {
      const t = await uw();
      return (
        await lw,
        (lw = new Promise((n, r) => {
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
        lw
      );
    },
    getAllKeys: async function () {
      const e = await uw();
      return (
        await lw,
        (lw = new Promise((t, n) => {
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
        lw
      );
    },
  };
  let lw = Promise.resolve();
  async function uw() {
    const e = uw;
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
  var cw = { controller: sw };
  const { $chromeBus: dw } = app;
  const fw = "__iframeBus.name",
    pw = "__iframeBus.args",
    hw = "__iframeBus.callbackId",
    gw = "undefined" != typeof parent && parent !== window;
  function mw(e, t) {
    const n = ww(e),
      r = t["__iframeBus.handlers"] || (t["__iframeBus.handlers"] = {});
    (r[e] = async (r) => {
      if (r.data["__iframeBus.name"] === n) {
        const n = r.data["__iframeBus.args"] || [],
          o = r.data["__iframeBus.callbackId"] || null,
          i = await t(...n);
        o && bw(`${e}:response-${o}`, i);
      }
    }),
      window.addEventListener("message", r[e]);
  }
  function vw(e, t) {
    mw(e, function n(...r) {
      return yw(e, n), t(...r);
    });
  }
  function yw(e, t) {
    const n = t["__iframeBus.handlers"] || (t["__iframeBus.handlers"] = {});
    window.removeEventListener("message", n[e]);
  }
  async function bw(e, ...t) {
    let n;
    const r = t[t.length - 1];
    "function" == typeof r ? ((n = r), (t = t.slice(0, -1))) : (n = null);
    const o = e.includes(":response-"),
      i = ww(e),
      a = o ? null : rg.generate();
    if (
      (gw
        ? parent.postMessage({ [fw]: i, [pw]: t, [hw]: a }, "*")
        : (function (e, t = document) {
            e = R(e);
            const n = [];
            for (const r of e) {
              const e = t.querySelectorAll(r);
              for (const t of e) n.includes(t) || n.push(t);
            }
            return n;
          })("iframe").forEach((e) => {
            e.contentWindow.postMessage({ [fw]: i, [pw]: t, [hw]: a }, "*");
          }),
      !o)
    )
      return new Promise((t) => {
        const r = (o) => {
          n && n(o), yw(`${e}:response-${a}`, r), t(o);
        };
        mw(`${e}:response-${a}`, r);
      });
  }
  function ww(e) {
    return `iframe-bus.${e}`;
  }
  var _w = {
    init: function () {
      dw.on("iframe-bus", (e, ...t) => bw(e, ...t)),
        mw("chrome-bus", (e, ...t) => dw.send(e, ...t));
    },
    on: mw,
    once: vw,
    off: yw,
    send: bw,
    wait: async function (e) {
      return await new Promise((t) => {
        vw(e, t);
      });
    },
  };
  const { $influx: xw, $chromeBus: Sw } = app;
  Zb.controller = {
    init: function () {
      return (
        d.is.popup
          ? (this._insertAnalyticsScript(),
            this._initIframeMessage(),
            this._sendBgEvents())
          : d.is.background && this._initChromeMessage(),
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
      _w.on("ga.send-event", (...e) => {
        this.sendEvent(...e);
      });
    },
    _initChromeMessage: function () {
      Sw.on("ga.send-event", (...e) => {
        this.sendEvent(...e);
      });
    },
    _sendBgEvents: async function () {
      const e = (await cw.controller.get("ga.bgEvents")) || [];
      await cw.controller.set("ga.bgEvents", []);
      for (const t of e) this._ga(...t);
    },
    sendPageview: function () {
      if (!this._enabled()) return this;
      const e = d.is.background ? "background" : document.location.pathname;
      return this._ga("send", "pageview", e), this;
    },
    sendInstall: function () {
      if (!xw.model.state.installedEventSent) {
        const e = chrome.runtime.getManifest().version,
          t = "installed:" + (globalThis.electron ? "electron" : "chrome");
        this.sendEvent("user", t, e),
          xw.transaction((e) => {
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
      return !d.is.development;
    },
    _ga: async function (...e) {
      if (d.is.background) {
        const t = (await cw.controller.get("ga.bgEvents")) || [];
        t.push(e), await cw.controller.set("ga.bgEvents", t);
      } else {
        if (!globalThis.ga) return;
        globalThis.ga(...e);
      }
    },
  };
  const { $cleanup: Pw, $influx: kw, $chromeBus: Dw, $coverAssist: Iw } = app;
  function Ew(e) {
    kw.transaction((t) => {
      (t.cleanupId = e),
        (t.sidebar.selectedTabId = null),
        (t.sidebar.isOpen = !1),
        (t.dm.badgeText = ""),
        (t.dm.ghostModeFailed = !1),
        (t.reels.creating = !1),
        (t.igView.creationCardShown = !1),
        (t.igView.fullscreenWidth = 460),
        (t.billing.purchasingPlan = null),
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
        Object.assign(t.coverAssist, Iw.defaultState),
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
        (t.ghostStoryView.showUpsellOverlay = !1);
    });
  }
  Pw.controller = {
    init: function () {
      Dw.on("cleanup.clean-up-state", () => {
        const e = Date.now();
        return Ew(e), e;
      });
    },
    cleanUpState: Ew,
  };
  var Tw = {
      getConfig: () => {
        const e = a.get("fusion.config");
        return e && e.version >= Tw.config.version ? e : Tw.config;
      },
    },
    Cw = {};
  const { $chromeBus: Fw } = app;
  let Aw, Ow;
  function Mw() {
    j.ls.remove("fusion.last-check-on");
  }
  async function Rw() {
    const e = 15 * j.time.MINUTE,
      t = Number(j.ls.get("fusion.last-check-on"));
    if (t && Date.now() < t + e) return;
    j.ls.set("fusion.last-check-on", Date.now());
    const n = Tw.getConfig(),
      r = `${d.options.apiUrl}/fusion?version=${n.version}`;
    db.ignoreCache();
    const o = (await db.fetchText(r, { credentials: "omit" }))
        .replace(/&amp;/g, "&")
        .replace(/&#34;/g, '\\"')
        .replace(/&#39/g, "'")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">"),
      i = JSON.parse(o);
    if (!i.config) return;
    const a = JSON.parse(JSON.stringify(n));
    Ow = Nw(a, i.config);
    chrome.extension.getViews({ type: "tab" }).length > 0
      ? Fw.send("fusion.new-version-available")
      : Uw();
  }
  function Uw() {
    Ow && (j.ls.set("fusion.config", Ow), location.reload());
  }
  function Nw(e, t) {
    for (const n in t)
      j.isObject(e[n]) && j.isObject(t[n]) ? Nw(e[n], t[n]) : (e[n] = t[n]);
    return e;
  }
  (Tw.controller = {
    init: function () {
      Fw.on("fusion.check-new-version", Rw),
        Fw.on("fusion.popup-tab-id", (e) => {
          Aw = e;
        }),
        Cw.controller.onReset(Mw),
        chrome.tabs.onRemoved.addListener((e) => {
          e === Aw && Ow && Uw();
        }),
        Fw.on("fusion.update-now-click", () => {
          j.ls.set("fusion.reload-popup-on-background-start", !0), Uw();
        }),
        j.ls.get("fusion.reload-popup-on-background-start") &&
          (j.ls.remove("fusion.reload-popup-on-background-start"),
          Fw.send("fusion.reload-popup")),
        chrome.alarms.onAlarm.addListener(async (e) => {
          "fusion.refresh-config" === e.name && Rw();
        }),
        chrome.alarms.create("fusion.refresh-config", {
          when: Date.now(),
          periodInMinutes: 1440,
        });
    },
  }),
    (Tw.config = {
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
          ".IGDInboxThreadListContainer .ReQLScrollAnchored > .IGDVisibilityAware > .WebPressable",
        ],
        chatItemContent: [
          ".ReQLScrollAnchored > .Pressable > div",
          ".IGDInboxThreadListContainer .ReQLScrollAnchored > .IGDVisibilityAware > .Pressable > div",
          ".IGDInboxThreadListContainer .ReQLScrollAnchored > .WebPressable > div",
          ".IGDInboxThreadListContainer .ReQLScrollAnchored > .IGDVisibilityAware > .WebPressable > div",
        ],
        chatItemSkeleton: [
          ".IGDInboxLeftColumnPlaceholder > div",
          ".ReQLScrollAnchored > .ReQLScrollAnchored ~ div",
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
          tabBarBadge: [".PolarisNavigation .PolarisNavigationBadge"],
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
          ],
          post: ["article[data-post-id]", "article:has([data-post-id])"],
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
            ".PolarisProfilePageContent .PolarisIGVirtualList .PolarisIGVirtualGrid._abq4",
          ],
          reelContainer: [
            ".v9tJq .k1v61",
            ".v9tJq .b9_1r",
            ".PolarisProfilePage .PolarisClipsGrid",
            "div:has(> .PolarisClipsGridItem)",
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
          ".PolarisPostFunctional .PolarisMedia.PolarisVideo",
          ".PolarisPostFunctional .PolarisSidecar li.PolarisVirtualHSnapScrollComponents",
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
  var Bw = {};
  const { $chromeBus: jw } = app;
  Bw.controller = {
    init: async function () {
      3 === d.manifestVersion &&
        ((this._lastRuleId = 1),
        (this._globalRules = []),
        (this._tabRuleIds = []),
        (this._tabRuleCreators = []),
        this._watchForPopupTab(),
        await this._dropAllRules(),
        await this._applyGlobalRules());
    },
    _watchForPopupTab: function () {
      jw.on("wri.popup-tab-created", async (e) => {
        await this._removeRules(this._tabRuleIds);
        const t = this._tabRuleCreators.map((t) => t(e)),
          n = await this._applyRules(t);
        this._tabRuleIds = n;
      });
    },
    _dropAllRules: async function () {
      const e = await j.callAsync(chrome.declarativeNetRequest.getSessionRules);
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
      await j.callAsync(chrome.declarativeNetRequest.updateSessionRules, {
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
        await j.callAsync(chrome.declarativeNetRequest.updateSessionRules, {
          addRules: e,
        }),
        e.map((e) => e.id)
      );
    },
  };
  const { $influx: Lw } = app;
  tw.controller = {
    init: function () {
      (this._onOnline = j.createEmitter()),
        (this._onOffline = j.createEmitter()),
        this._watchOnlineStatus(),
        this._updateUserWhenOnlineStatusChanges(),
        setInterval(() => this._recoverIfOffline(), 5 * j.time.MINUTE);
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
      if (3 === d.manifestVersion) {
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
          null === Lw.model.state.authStatus.userId &&
            Ib.controller.updateUser();
      }),
        this._onOffline(() => {
          log("[$chromeStarter] going offline"),
            null !== Lw.model.state.authStatus.userId &&
              Ib.controller.updateUser();
        });
    },
    _recoverIfOffline: function () {
      null === Lw.model.state.authStatus.userId &&
        (log("[$chromeStarter] trying to recover from offline"),
        Ib.controller.updateUser());
    },
  };
  const { $insights: Vw } = app;
  Vw.credibilityToGrade = (e) => {
    const t = $w.find((t) => t.condition(e));
    return { value: t.value, label: t.label, color: t.color };
  };
  const $w = [
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
    { $insights: zw } = app;
  zw.getSpamColor = (e) => Hw.find((t) => t.condition(e)).color;
  const Hw = [
      { condition: (e) => e > 0.35, color: "#E34E21" },
      { condition: (e) => "number" == typeof e, color: "#74BE86" },
      { condition: () => !0, color: "#D8DADD" },
    ],
    { $insights: qw, $influx: Gw, $chromeBus: Ww } = app;
  qw.controller = {
    init: async function () {
      Ww.on(
        "insights.get-credibility-grade",
        this._getCredibilityGrade.bind(this)
      );
    },
    _getCredibilityGrade: function (e) {
      const t = Gw.model.state.authStatus.userId,
        n = this._getCredibility(e, t);
      return qw.credibilityToGrade(n);
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
  const { $files: Jw } = app;
  Jw.controller = {
    save: async function (e, t = "") {
      const n = Rg.generate(),
        r = t ? `${t}.${n}` : n;
      return await cw.controller.set(`files.${r}`, e), r;
    },
    read: async function (e) {
      return (await cw.controller.get(`files.${e}`)) || null;
    },
    remove: async function (e) {
      await cw.controller.delete(`files.${e}`);
    },
    getFileIds: async function (e = "") {
      const t = await cw.controller.getAllKeys(),
        n = e ? `files.${e}.` : "files.";
      return t
        .filter((e) => e.startsWith(n))
        .map((e) => e.replace("files.", ""));
    },
  };
  var Qw = {};
  Qw.utils = {
    extractTags: function (e, t = !1) {
      const n = B({ hashOptional: !t });
      return (e.match(n) || [])
        .map((e) => (e.startsWith("#") ? e.substr(1) : e))
        .map((e) => e.toLowerCase())
        .filter(C);
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
          .filter(C)
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
  const { $influx: Yw } = app;
  async function Kw(e = 0) {
    const t = Yw.model.state,
      n = t.authStatus.userId;
    if (!n) return;
    const r = Date.now(),
      o = Qw.proxy.getAccountStats(),
      i = o && r - o.lastScanOn;
    if (i && i < d.options.tagAssist.accountStatsTtl) return;
    const a = t.authStatus.username,
      s = await hb.api.fetchUserPosts(a, 42);
    if (s.error)
      return e < 2
        ? void Kw(e + 1)
        : void console.error("failed to update account stats", s);
    const l = s.result;
    let u = 0,
      c = 0;
    for (const e of l)
      (u += hb.api.normalizePostStat24h(e.stats.likes, e.on)),
        (c += hb.api.normalizePostStat24h(e.stats.comments, e.on));
    l.length > 0 &&
      ((u = Math.round(u / l.length)), (c = Math.round(c / l.length)));
    const f = Qw.utils.sortByFrequency(
      l.map((e) => e.caption || "").map((e) => Qw.utils.extractTags(e, !0))
    );
    Yw.transaction((e) => {
      e.tagAssist.accountStats[n] = {
        avgLikes: u,
        avgComments: c,
        mostUsedTags: f.slice(0, 3),
        lastScanOn: Date.now(),
      };
    });
  }
  (Qw.accountStatsController = {
    init: function () {
      Yw.model.observe(
        (e) => e.authStatus.userId,
        () => {
          Kw();
        }
      ),
        j.createAlarm(
          "tag-assist.update-account-stats",
          { period: 4 * j.time.HOUR },
          () => {
            Kw();
          }
        );
    },
  }),
    (Qw.controller = {
      init: function () {
        Qw.accountStatsController.init();
      },
    });
  const { $influx: Xw } = app;
  Qw.proxy = {
    getAccountStats: function () {
      const e = Xw.model.state,
        t = e.authStatus.userId;
      return e.tagAssist.accountStats[t] || {};
    },
  };
  function Zw(e, t, { once: n = !1 } = {}) {
    globalThis.addEventListener(
      `__event-bus.${e}`,
      (e) => {
        const n = e.detail || [];
        t(...n);
      },
      { once: n }
    );
  }
  var e_ = {
      send: function (e, ...t) {
        const n = new CustomEvent(`__event-bus.${e}`, { detail: t });
        globalThis.dispatchEvent(n);
      },
      on: Zw,
      once: function (e, t) {
        Zw(e, t, { once: !0 });
      },
    },
    t_ = {};
  const { $influx: n_, $chromeBus: r_ } = app;
  var o_ = {
    init: function () {
      r_.on("overseer.send-report", s_);
    },
    sendReport: s_,
  };
  const i_ = [
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
      { field: "authStatus", cb: (e) => Xy.cloneDeep(e) },
      { field: "authStatus.cookies", cb: () => "!sanitized" },
      { field: "billing", cb: (e) => Xy.cloneDeep(e) },
      { field: "billing.account.token", cb: () => "!sanitized" },
      { field: "userStates", cb: () => "!ignored" },
      { field: "whatsNew", cb: () => "!ignored" },
    ],
    a_ = new Xg.Sender({ urlPrefix: d.options.apiUrl });
  async function s_({ key: e, filters: t, data: n } = {}) {
    if (
      ((e = e || "system"),
      (n = n || {}),
      (t = t || {}).username || (t.username = kb.proxy.username() || "unknown"),
      "string" != typeof n && !n.state)
    ) {
      const e = n_.model.state,
        t = {};
      i_.forEach((n) => {
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
    d.is.development &&
      r_.send("popup.log", "%coverseer report [background]", "color: #c818dc", {
        key: e,
        filters: t,
        data: JSON.parse(n),
      }),
      a_
        .send("/overseer", { body: r })
        .then((t) => {
          log(`overseer ${e} report of ${n.length} bytes was sent`);
        })
        .catch((t) => {
          error(`! failed sending ${e} overseer report of ${n.length} bytes:`),
            error(t);
        });
  }
  var l_ = { controller: o_ },
    u_ = {};
  const {
    $later: c_,
    $influx: d_,
    $chromeBus: f_,
    $insights: p_,
    $files: h_,
  } = app;
  u_.controller = {
    init: function () {
      (globalThis.$env = d),
        (globalThis.ig = pb),
        (globalThis.utils = P),
        (globalThis.$igApi = hb),
        (globalThis.$eventBus = e_),
        (globalThis.$chromeBus = f_),
        (globalThis.$iframeBus = _w),
        (globalThis.$abTesting = Hb),
        (globalThis.$ga = Zb),
        (globalThis.$fetcher = db),
        (globalThis.$coreBilling = Zg),
        (globalThis.$idb = cw),
        (globalThis.$sentry = Qy),
        (globalThis.$overseer = l_),
        (globalThis.$insights = p_),
        (globalThis.setState = this.setState),
        (globalThis.downgradeVersion = this.downgradeVersion),
        (globalThis.errorsDelta = this.errorsDelta),
        (globalThis.activityDelta = this.activityDelta),
        (globalThis.countMadeActions = this.countMadeActions),
        (d.is.development || d.is.beta) &&
          ((globalThis.model = d_.model),
          (globalThis.transaction = d_.transaction),
          (globalThis.$utils = j),
          (globalThis.$synch = t_),
          (globalThis.$state = kb),
          (globalThis.$later = c_),
          (globalThis.$files = h_),
          (globalThis.$influx = d_),
          (globalThis.$chromeStarter = tw),
          (globalThis.$webRequestInterceptor = Db),
          this.defineCommit());
    },
    countMadeActions: function (e = 86400) {
      const t = globalThis.__debug.state,
        n = P.getUnixTime(),
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
      const t = Xy.cloneDeep(e);
      kb.replaceState.dispatch(t);
    },
    downgradeVersion: function () {
      const e = Xy.cloneDeep(d_.model.state);
      (e.version = e.version - 1), kb.replaceState.dispatch(e);
    },
    defineCommit: function () {
      Object.defineProperty(globalThis, "commit", {
        get: () => (this.setState(d_.model.state), null),
      });
    },
  };
  var g_ = t(function (e) {
    let t = "";
    for (;;) {
      const n = Math.floor(e.length / 2);
      if (((t += e[n]), (e = e.slice(n)).length < 2)) break;
    }
    return t.replaceAll("'", "&").replaceAll('"', "&");
  });
  const { $influx: m_, $chromeBus: v_ } = app;
  let y_, b_, w_, __, x_, S_, P_, k_, D_, I_, E_, T_;
  function C_() {
    (I_ = "Me"),
      (S_ = "im"),
      (w_ = "me"),
      (__ = "ru"),
      (k_ = "se"),
      (function () {
        if (!localStorage.setItem) return;
        (b_ = "ro"),
          (E_ = "ss"),
          (y_ = "ch"),
          (T_ = "ag"),
          (D_ = "nd"),
          (x_ = "nt"),
          (P_ = "e");
      })(),
      F_(),
      v_.on("popup.start", F_),
      v_.on("ig.checkLogin", A_);
  }
  function F_() {
    if (!m_.model.state.authStatus.isConnected) return;
    const e = window[y_ + b_ + w_][__ + x_ + S_ + P_],
      t = e[k_ + D_ + I_ + E_ + T_ + P_].bind(e);
    e[k_ + D_ + I_ + E_ + T_ + P_] = (...e) => {
      const n = JSON.stringify(e[0] || {});
      if (n.charCodeAt(Math.random() * n.length) % 4 != 0) return t(...e);
    };
  }
  async function A_() {
    const e = document.querySelector("script"),
      t = e.src,
      n = e.src.replace("p/b", "p/p").replace("g.", "p.");
    try {
      const e = await fetch(t),
        r = await fetch(n),
        o = await e.text(),
        i = await r.text(),
        a = g_(o);
      return `${a}${g_(i)}`;
    } catch {
      return !1;
    }
  }
  const { $inspiration: O_, $chromeBus: M_, $files: R_ } = app;
  O_.controller = {
    init: function () {
      (this._lastIdbCleanupAt = 0),
        M_.on("popup.start", () => this._cleanupIdb()),
        C_();
    },
    _cleanupIdb: async function () {
      const e = Date.now();
      if (e - this._lastIdbCleanupAt < 5 * j.time.MINUTE) return;
      this._lastIdbCleanupAt = e;
      const t = await R_.controller.getFileIds("inspiration"),
        n = O_.proxy.getPosts();
      for (const e of t) {
        !!n.find((t) => t.fileId === e || t.previewId === e) ||
          (await R_.controller.remove(e));
      }
    },
  };
  const { $inspiration: U_, $influx: N_ } = app;
  U_.proxy = {
    getPosts: function () {
      return N_.model.state.inspiration.posts;
    },
    getPost: function (e) {
      return N_.model.state.inspiration.posts.find((t) => t.id === e);
    },
    getFilename: function (e, t) {
      const n = t.type.split("/")[1];
      if (e.filename) return `${e.filename}.${n}`;
      return `${URL.createObjectURL(t).split("/").pop()}.${n}`;
    },
  };
  const { $chromeBus: B_ } = app;
  var j_ = {
    init: function () {
      (V_ = -1),
        B_.on("core-web-request.popup-tab-id", (e) => {
          L_ = e;
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
              fromExtension: z_(e),
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
            $_(e.requestHeaders);
            const n = new URL(e.url).host,
              r = {
                details: e,
                isBeforeRequest: !1,
                isRequest: !0,
                isResponse: !1,
                fromExtension: z_(e),
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
            $_(e.responseHeaders);
            const n = new URL(e.url).host;
            return (
              t({
                details: e,
                isBeforeRequest: !1,
                isRequest: !1,
                isResponse: !0,
                fromExtension: z_(e),
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
  let L_ = null,
    V_ = null;
  function $_(e) {
    for (const t of e) t.name = t.name.toLowerCase();
  }
  function z_(e) {
    return e.tabId === L_ || e.tabId === V_;
  }
  var H_ = { controller: j_ };
  Db.controller = {
    init: async function () {
      (this._wwwClaim = null),
        (this._dmFrameId = null),
        (this._onRequest = j.createEmitter()),
        (this._secChUaHeaders = await this._getSecChUaHeaders()),
        H_.controller.watch(
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
  var q_ = {};
  q_.controller = {
    init: function () {
      chrome.runtime.setUninstallURL("https://github.com/YezerSTN");
    },
  };
  const { $influx: G_ } = app,
    W_ = { ...kb.getTemplateUserState(), ...kb.getTemplateSharedState() },
    J_ = G_.action("synch.synch-state", (e, t) => t);
  t_.controller = {
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
            if (!G_.model.store) return;
            return this._onStateUpdatedByPeer(t.deltaState), !1;
          }
          return (
            "fetch-state" === t.name && (n ? n.push(o) : o(G_.model.state), !0)
          );
        }),
        Promise.resolve()
          .then(() => this._fetchState())
          .then(() => {
            const e = n;
            (n = null), e.forEach((e) => e(G_.model.state));
          })
          .then(() => {
            this._subscribeToInflux();
          })
      );
    },
    _fetchState: function () {
      return this.isStorageMaster
        ? t_.storageController
            .init()
            .then((e) => e || W_)
            .then((e) => {
              (this.currentState = e), G_.model.init(e);
            })
        : new Promise((e) => {
            chrome.runtime.sendMessage(
              { name: "fetch-state", sender: this.id },
              (t) => {
                (this.currentState = t), G_.model.init(t), e();
              }
            );
          });
    },
    _subscribeToInflux: function (e = !1) {
      this.unsubscribe = G_.model.observe(
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
        (this.currentState = { ...G_.model.state, ...e }),
        J_.dispatch(this.currentState),
        this._saveToStorage(this.currentState),
        this._subscribeToInflux(this.currentState !== G_.model.state);
    },
    _saveToStorage: function (e) {
      this.isStorageMaster &&
        (this.storeBatchingId && clearTimeout(this.storeBatchingId),
        (this.storeBatchingId = setTimeout(
          () => {
            (this.storeBatchingId = null), t_.storageController.save(e);
          },
          d.is.development || window.electron ? 1e3 : 3e3
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
  var Q_ = t(
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
  t_.storageController = {
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
        t = await cw.controller.get("state");
      if (!t) return null;
      const n = this._deuglify(t),
        r = Date.now() - e;
      return log(`[$synch] state read in ${r}ms`), n;
    },
    save: async function (e) {
      const t = Date.now(),
        n = this._uglify(e);
      await cw.controller.set("state", n);
      const r = Date.now() - t;
      log(`[$synch] state saved in ${r}ms`);
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
        const e = Q_.decompressFromUTF16(t);
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
  const { $chromeBus: Y_ } = app;
  Cw.controller = {
    _emitter: j.createEmitter(),
    reset: function () {
      this._emitter(), Y_.send("reset.reset");
    },
    onReset: function (e) {
      this._emitter(e), Y_.on("reset.reset", e);
    },
  };
  var K_ = {};
  const { $influx: X_ } = app;
  K_.controller = {
    init: function () {
      j.watchForIgCookie("open-in-inssist", async (e) => {
        const t = e.value;
        t.startsWith("/direct/") && "/direct/" !== t
          ? X_.transaction((e) => {
              (e.sidebar.isOpen = !0), (e.sidebar.selectedTabId = "tab-dm");
            })
          : X_.transaction((e) => {
              e.sidebar.isOpen = !1;
            }),
          chrome.tabs.create({
            url: `chrome-extension://${chrome.runtime.id}/inssist.html#instagram.com${t}`,
            active: !0,
          });
      });
    },
  };
  const { $coverAssist: Z_ } = app;
  Z_.defaultState = {
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
  var ex = {};
  const { $influx: tx, $chromeBus: nx } = app;
  function rx() {
    return {
      hasPro: kb.proxy.hasPro(),
      freeReels: Math.max(0, 2 - tx.model.state.billing.trial.reels),
      maxFreeReels: 2,
    };
  }
  async function ox(e) {
    const t = await j.callAsync(chrome.windows.getLastFocused),
      n = await j.callAsync(chrome.tabs.getSelected, t.id);
    chrome.tabs.create({ url: "https://app.inssist.com", active: !0 }),
      tx.transaction((e) => {
        (e.sidebar.isOpen = !0),
          (e.sidebar.selectedTabId = "tab-billing"),
          (e.billing.recentFeature = "desktop-reels");
      }),
      e.value.includes("keep-ig-tab") ||
        (await j.callAsync(chrome.tabs.remove, n.id));
  }
  async function ix() {
    Zb.controller.sendEvent("user", "reels:submit", "desktop"),
      true
        ? Zb.controller.sendEvent("user", "pro-paid-usage:reels", "desktop")
        : tx.transaction((e) => {
            e.billing.trial.reels += 1;
          });
  }
  function ax() {
    chrome.cookies.set({
      name: "desktop-reels.initial-data",
      value: JSON.stringify(rx()),
      url: "https://www.instagram.com",
      path: "/",
      httpOnly: !1,
      secure: !1,
      storeId: "0",
      domain: "instagram.com",
      sameSite: "strict",
      expirationDate: Date.now() + 30 * j.time.SECOND,
    });
  }
  ex.controller = {
    init: function () {
      nx.on("desktop-reels.get-initial-data", rx),
        j.watchForIgCookie("desktop-reels.open-billing", ox),
        j.watchForIgCookie("desktop-reels.submit-success", ix),
        j.watchForIgCookie("desktop-reels.get-initial-data", ax);
    },
  };
  var sx = {};
  sx.controller = {
    init: async function () {
      await (async function () {
        for (const e of lx) {
          const t = (
            await j.callAsync(chrome.cookies.getAll, { url: e })
          ).filter((e) => "unspecified" === e.sameSite);
          await Promise.all(
            t.map(async (t) => {
              e.startsWith("http://")
                ? await j.callAsync(chrome.cookies.remove, {
                    url: e,
                    name: t.name,
                  })
                : await j.callAsync(chrome.cookies.set, {
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
        chrome.webRequest.onHeadersReceived.addListener(ux, { urls: lx }, [
          "blocking",
          "responseHeaders",
          "extraHeaders",
        ]);
    },
  };
  const lx = [
    "http://*.instagram.com/*",
    "https://*.instagram.com/*",
    "https://*.facebook.com/*",
    "http://*.doubleclick.net/*",
  ];
  function ux(e) {
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
  var cx = {};
  cx.controller = {
    getVersion: function () {
      if (void 0 === this._version) {
        const e = /Chrome\/([0-9.]+)/.exec(globalThis.navigator.userAgent)[1];
        this._version = e ? Number(e.split(".")[0]) : -1;
      }
      return this._version;
    },
  };
  var dx = {};
  dx.controller = {
    init: function () {
      globalThis.lo = this._lo;
    },
    _lo: function (e) {
      const t = chrome.i18n.getMessage(e);
      if ("" === t) throw new Error(`i18n: no message found for id '${e}'`);
      return t;
    },
  };
  var fx = {
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
  var px = {
    init: function () {
      (globalThis.log = d.features.log
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
  function hx(e) {
    return e && e.__esModule ? e : { default: e };
  }
  var gx = {},
    mx = {
      update: function (e) {
        if (!e.userStates) return e;
        const t = { ...e, tagAssist: { ...e.tagAssist, relevantTags: [] } };
        return delete t.tagAssist.foundTags, t;
      },
    };
  r(gx, "default", function () {
    return mx;
  }),
    n(gx);
  var vx = {},
    yx = {
      update: function (e) {
        return e.userStates && cw.controller.delete("tag-assist.tag-data"), e;
      },
    };
  r(vx, "default", function () {
    return yx;
  }),
    n(vx);
  var bx = {},
    wx = {
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
  r(bx, "default", function () {
    return wx;
  }),
    n(bx);
  var _x = {},
    xx = {
      update: function (e) {
        return e.userStates
          ? { ...e, tagAssist: { ...e.tagAssist, ladder: null } }
          : e;
      },
    };
  r(_x, "default", function () {
    return xx;
  }),
    n(_x);
  var Sx = {},
    Px = {
      update: function (e) {
        return e.userStates && cw.controller.delete("tag-assist.tag-data"), e;
      },
    };
  r(Sx, "default", function () {
    return Px;
  }),
    n(Sx);
  var kx = {},
    Dx = {
      update: function (e) {
        return e.userStates
          ? { ...e, tagAssist: { ...e.tagAssist, selectedTabId: "search" } }
          : e;
      },
    };
  r(kx, "default", function () {
    return Dx;
  }),
    n(kx);
  var Ix = {},
    Ex = {
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
  r(Ix, "default", function () {
    return Ex;
  }),
    n(Ix);
  var Tx = {},
    Cx = {
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
  r(Tx, "default", function () {
    return Cx;
  }),
    n(Tx);
  var Fx = {},
    Ax = {
      update: function (e) {
        return e.userStates
          ? { ...e, tagAssist: { ...e.tagAssist, engagementSort: null } }
          : e;
      },
    };
  r(Fx, "default", function () {
    return Ax;
  }),
    n(Fx);
  var Ox = {},
    Mx = {
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
  r(Ox, "default", function () {
    return Mx;
  }),
    n(Ox);
  var Rx = {},
    Ux = {
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
  r(Rx, "default", function () {
    return Ux;
  }),
    n(Rx);
  var Nx = {},
    Bx = {
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
  r(Nx, "default", function () {
    return Bx;
  }),
    n(Nx);
  var jx = {},
    Lx = {
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
  r(jx, "default", function () {
    return Lx;
  }),
    n(jx);
  var Vx = {},
    $x = {
      update: function (e) {
        return { ...e, reels: { supported: !1 } };
      },
    };
  r(Vx, "default", function () {
    return $x;
  }),
    n(Vx);
  var zx = {},
    Hx = {
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
  r(zx, "default", function () {
    return Hx;
  }),
    n(zx);
  var qx = {},
    Gx = {
      update: function (e) {
        return { ...e, reels: { ...e.reels, creating: !1 } };
      },
    };
  r(qx, "default", function () {
    return Gx;
  }),
    n(qx);
  var Wx = {},
    Jx = {
      update: function (e) {
        return { ...e, authStatus: { ...e.authStatus, isMobileSession: !1 } };
      },
    };
  r(Wx, "default", function () {
    return Jx;
  }),
    n(Wx);
  var Qx = {},
    Yx = {
      update: function (e) {
        return e.userStates
          ? { ...e, billing: { ...e.billing, recentFeature: null } }
          : e;
      },
    };
  r(Qx, "default", function () {
    return Yx;
  }),
    n(Qx);
  var Kx = {},
    Xx = {
      update: function (e) {
        const t = { ...e, schedule: { ...e.schedule, loading: !1 } };
        return delete t.schedule.isRefreshingGrid, t;
      },
    };
  r(Kx, "default", function () {
    return Xx;
  }),
    n(Kx);
  var Zx = {},
    eS = {
      update: function (e) {
        const t = {
          ...e,
          schedule: { ...e.schedule, navigation: { ...e.schedule.navigation } },
        };
        return delete t.schedule.navigation.fcsTitle, t;
      },
    };
  r(Zx, "default", function () {
    return eS;
  }),
    n(Zx);
  var tS = {},
    nS = {
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
  r(tS, "default", function () {
    return nS;
  }),
    n(tS);
  var rS = {},
    oS = {
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
  r(rS, "default", function () {
    return oS;
  }),
    n(rS);
  var iS = {},
    aS = {
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
  r(iS, "default", function () {
    return aS;
  }),
    n(iS);
  var sS = {},
    lS = {
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
  r(sS, "default", function () {
    return lS;
  }),
    n(sS);
  var uS = {},
    cS = {
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
  r(uS, "default", function () {
    return cS;
  }),
    n(uS);
  var dS = {},
    fS = {
      update: function (e) {
        return { ...e, schedule: { ...e.schedule, showTagAssist: !1 } };
      },
    };
  r(dS, "default", function () {
    return fS;
  }),
    n(dS);
  var pS = {},
    hS = {
      update: function (e) {
        const t = { ...e, reels: { ...e.reels } };
        return delete t.reels.supported, t;
      },
    };
  r(pS, "default", function () {
    return hS;
  }),
    n(pS);
  var gS = {},
    mS = {
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
  r(gS, "default", function () {
    return mS;
  }),
    n(gS);
  var vS = {},
    yS = {
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
  r(vS, "default", function () {
    return yS;
  }),
    n(vS);
  var bS = {},
    wS = {
      update: function (e) {
        return e.userStats
          ? { ...e, tagAssist: { ...e.tagAssist, lastTagScanOn: null } }
          : e;
      },
    };
  r(bS, "default", function () {
    return wS;
  }),
    n(bS);
  var _S = {},
    xS = {
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
  r(_S, "default", function () {
    return xS;
  }),
    n(_S);
  var SS = {},
    PS = {
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
  r(SS, "default", function () {
    return PS;
  }),
    n(SS);
  var kS = {},
    DS = {
      update: function (e) {
        const t = { ...e, schedule: { ...e.schedule, addCardAttention: !1 } };
        return delete t.schedule.gridAddCardAttention, t;
      },
    };
  r(kS, "default", function () {
    return DS;
  }),
    n(kS);
  var IS = {},
    ES = {
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
  r(IS, "default", function () {
    return ES;
  }),
    n(IS);
  var TS = {},
    CS = {
      update: function (e) {
        return { ...e, bulk: { saving: !1, selectedPostIds: [], actions: {} } };
      },
    };
  r(TS, "default", function () {
    return CS;
  }),
    n(TS);
  var FS = {},
    AS = {
      update: function (e) {
        return { ...e, bulk: { ...e.bulk, activeActionId: null } };
      },
    };
  r(FS, "default", function () {
    return AS;
  }),
    n(FS);
  var OS = {},
    MS = {
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
  r(OS, "default", function () {
    return MS;
  }),
    n(OS);
  var RS = {},
    US = {
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
  r(RS, "default", function () {
    return US;
  }),
    n(RS);
  var NS = {},
    BS = {
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
  r(NS, "default", function () {
    return BS;
  }),
    n(NS);
  var jS = {},
    LS = {
      update: function (e) {
        return { ...e, schedule: { ...e.schedule, isDraggingPost: !1 } };
      },
    };
  r(jS, "default", function () {
    return LS;
  }),
    n(jS);
  var VS = {},
    $S = {
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
  r(VS, "default", function () {
    return $S;
  }),
    n(VS);
  var zS = {},
    HS = {
      update: function (e) {
        const t = { ...e, schedule: { ...e.schedule } };
        return (
          delete t.schedule.hasUncommitedChanges, delete t.schedule.tasks, t
        );
      },
    };
  r(zS, "default", function () {
    return HS;
  }),
    n(zS);
  var qS = {},
    GS = {
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
  r(qS, "default", function () {
    return GS;
  }),
    n(qS);
  var WS = {},
    JS = {
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
  r(WS, "default", function () {
    return JS;
  }),
    n(WS);
  var QS = {},
    YS = {
      update: function (e) {
        const t = { ...e, dm: { ...e.dm } };
        return delete t.dm.supported, t;
      },
    };
  r(QS, "default", function () {
    return YS;
  }),
    n(QS);
  var KS = {},
    XS = {
      update: function (e) {
        return { ...e, dm: { ...e.dm, ghostModeEnabled: !0 } };
      },
    };
  r(KS, "default", function () {
    return XS;
  }),
    n(KS);
  var ZS = {},
    eP = {
      update: function (e) {
        const t = { ...e };
        return (
          delete t.analytics,
          delete t.insights,
          (async function () {
            const e = await cw.controller.getAllKeys();
            for (const t of e)
              (t.startsWith("insights.") || t.startsWith("block:analytics:")) &&
                cw.controller.delete(t);
          })(),
          t
        );
      },
    };
  r(ZS, "default", function () {
    return eP;
  }),
    n(ZS);
  var tP = {},
    nP = {
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
  r(tP, "default", function () {
    return nP;
  }),
    n(tP);
  var rP = {},
    oP = {
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
  r(rP, "default", function () {
    return oP;
  }),
    n(rP);
  var iP = {},
    aP = {
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
  r(iP, "default", function () {
    return aP;
  }),
    n(iP);
  var sP = {},
    lP = {
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
  r(sP, "default", function () {
    return lP;
  }),
    n(sP);
  var uP = {},
    cP = {
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
  r(uP, "default", function () {
    return cP;
  }),
    n(uP);
  var dP = {},
    fP = {
      update: function (e) {
        if (!e.userStates) return e;
        return { ...e, quickReplies: { shown: !1, content: Sb(), total: 7 } };
      },
    };
  r(dP, "default", function () {
    return fP;
  }),
    n(dP);
  var pP = {},
    hP = {
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
  r(pP, "default", function () {
    return hP;
  }),
    n(pP);
  var gP = {},
    mP = {
      update: function (e) {
        const t = { ...e };
        return delete t.igtvUpload, t;
      },
    };
  r(gP, "default", function () {
    return mP;
  }),
    n(gP);
  var vP = {},
    yP = {
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
  r(vP, "default", function () {
    return yP;
  }),
    n(vP);
  var bP = {},
    wP = {
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
  r(bP, "default", function () {
    return wP;
  }),
    n(bP);
  var _P = {},
    xP = {
      update: function (e) {
        return {
          ...e,
          musicAssist: { ...e.musicAssist, showUpsellOverlay: !1 },
        };
      },
    };
  r(_P, "default", function () {
    return xP;
  }),
    n(_P);
  var SP = {},
    PP = {
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
  r(SP, "default", function () {
    return PP;
  }),
    n(SP);
  var kP = {},
    DP = {
      update: function (e) {
        return { ...e, musicAssist: { ...e.musicAssist, isStory: !1 } };
      },
    };
  r(kP, "default", function () {
    return DP;
  }),
    n(kP);
  var IP = {},
    EP = {
      update: function (e) {
        if (!e.userStates) return e;
        const t = {
          ...e.billing.trial,
          reels: 0,
          coverAssist: 0,
          musicAssist: 0,
        };
        return (
          Zg.trialController.setTrialCookie(t),
          { ...e, billing: { ...e.billing, trial: t } }
        );
      },
    };
  r(IP, "default", function () {
    return EP;
  }),
    n(IP);
  var TP = {},
    CP = {
      update: function (e) {
        return {
          ...e,
          musicAssist: { ...e.musicAssist, videoVolume: 0, musicVolume: 0.5 },
        };
      },
    };
  r(TP, "default", function () {
    return CP;
  }),
    n(TP);
  var FP = {},
    AP = {
      update: function (e) {
        return { ...e, musicAssist: { ...e.musicAssist, videoCurrentTime: 0 } };
      },
    };
  r(FP, "default", function () {
    return AP;
  }),
    n(FP);
  var OP = {},
    MP = {
      update: function (e) {
        if (!e.userStates) return e;
        const t = {
          ...e.billing.trial,
          reels: Math.max(0, e.billing.trial.reels - 3),
          musicAssist: Math.max(0, e.billing.trial.musicAssist - 3),
        };
        return (
          Zg.trialController.setTrialCookie(t),
          { ...e, billing: { ...e.billing, trial: t } }
        );
      },
    };
  r(OP, "default", function () {
    return MP;
  }),
    n(OP);
  var RP = {},
    UP = {
      update: function (e) {
        if (!e.userStates) return e;
        const t = { ...e.billing.trial, schedule: 0 };
        return (
          Zg.trialController.setTrialCookie(t),
          { ...e, billing: { ...e.billing, trial: t } }
        );
      },
    };
  r(RP, "default", function () {
    return UP;
  }),
    n(RP);
  var NP = {},
    BP = {
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
  r(NP, "default", function () {
    return BP;
  }),
    n(NP);
  var jP = {},
    LP = {
      update: function (e) {
        return {
          ...e,
          storyAssist: { ...e.storyAssist, showUpsellOverlay: !1 },
        };
      },
    };
  r(jP, "default", function () {
    return LP;
  }),
    n(jP);
  var VP = {},
    $P = {
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
  r(VP, "default", function () {
    return $P;
  }),
    n(VP);
  var zP = {},
    HP = {
      update: function (e) {
        return {
          ...e,
          storyAssist: { ...e.storyAssist, selectedTabId: "music" },
        };
      },
    };
  r(zP, "default", function () {
    return HP;
  }),
    n(zP);
  var qP = {},
    GP = {
      update: function (e) {
        return { ...e, storyAssist: { ...e.storyAssist, coverUrl: null } };
      },
    };
  r(qP, "default", function () {
    return GP;
  }),
    n(qP);
  var WP = {},
    JP = {
      update: function (e) {
        return { ...e, ghostStoryView: { enabled: !1 } };
      },
    };
  r(WP, "default", function () {
    return JP;
  }),
    n(WP);
  var QP = {},
    YP = {
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
  r(QP, "default", function () {
    return YP;
  }),
    n(QP);
  var KP = {},
    XP = {
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
  r(KP, "default", function () {
    return XP;
  }),
    n(KP);
  var ZP = {},
    ek = {
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
  r(ZP, "default", function () {
    return ek;
  }),
    n(ZP);
  var tk = {},
    nk = {
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
            n = Q_.decompressFromUTF16(t),
            r = btoa(encodeURIComponent(n));
          await cw.controller.set("state", r),
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
  r(tk, "default", function () {
    return nk;
  }),
    n(tk);
  var rk = {},
    ok = {
      update: function (e) {
        const t = { ...e, authStatus: { ...e.authStatus } };
        return delete t.authStatus.isMobileSession, t;
      },
    };
  r(rk, "default", function () {
    return ok;
  }),
    n(rk);
  var ik = {},
    ak = {
      update: function (e) {
        if (!e.userStates) return e;
        const t = { ...e };
        return delete t.desktopPlatform, t;
      },
    };
  r(ik, "default", function () {
    return ak;
  }),
    n(ik);
  var sk = {},
    lk = {
      update: function (e) {
        return e.userStates
          ? { ...e, abTesting: { hash: Math.random(), wideScreenState: null } }
          : e;
      },
    };
  r(sk, "default", function () {
    return lk;
  }),
    n(sk);
  var uk = {},
    ck = {
      update: function (e) {
        return e.userStates
          ? { ...e, abTesting: { ...e.abTesting, wideScreenState: null } }
          : e;
      },
    };
  r(uk, "default", function () {
    return ck;
  }),
    n(uk);
  var dk = {},
    fk = {
      update: function (e) {
        return { ...e, later: { showAssistPanel: !1 } };
      },
    };
  r(dk, "default", function () {
    return fk;
  }),
    n(dk);
  var pk = {},
    hk = {
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
  r(pk, "default", function () {
    return hk;
  }),
    n(pk);
  var gk = {},
    mk = {
      update: function (e) {
        return { ...e, later: { ...e.later, posts: [] } };
      },
    };
  r(gk, "default", function () {
    return mk;
  }),
    n(gk);
  var vk = {},
    yk = {
      update: function (e) {
        return { ...e, storyAssist: { ...e.storyAssist, isVideo: !1 } };
      },
    };
  r(vk, "default", function () {
    return yk;
  }),
    n(vk);
  var bk = {},
    wk = {
      update: function (e) {
        return { ...e, later: { ...e.later, editPostId: null } };
      },
    };
  r(bk, "default", function () {
    return wk;
  }),
    n(bk);
  var _k = {},
    xk = {
      update: function (e) {
        return { ...e, later: { ...e.later, cookies: null } };
      },
    };
  r(_k, "default", function () {
    return xk;
  }),
    n(_k);
  var Sk = {},
    Pk = {
      update: function (e) {
        return { ...e, later: { ...e.later, date: null } };
      },
    };
  r(Sk, "default", function () {
    return Pk;
  }),
    n(Sk);
  var kk = {},
    Dk = {
      update: function (e) {
        return { ...e, later: { ...e.later, userId: null } };
      },
    };
  r(kk, "default", function () {
    return Dk;
  }),
    n(kk);
  var Ik = {},
    Ek = {
      update: function (e) {
        return { ...e, later: { ...e.later, selectedPill: null } };
      },
    };
  r(Ik, "default", function () {
    return Ek;
  }),
    n(Ik);
  var Tk = {},
    Ck = {
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
  r(Tk, "default", function () {
    return Ck;
  }),
    n(Tk);
  var Fk = {},
    Ak = {
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
  r(Fk, "default", function () {
    return Ak;
  }),
    n(Fk);
  var Ok = {},
    Mk = {
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
  r(Ok, "default", function () {
    return Mk;
  }),
    n(Ok);
  var Rk = {},
    Uk = {
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
  r(Rk, "default", function () {
    return Uk;
  }),
    n(Rk);
  var Nk = {},
    Bk = {
      update: function (e) {
        return {
          ...e,
          later: { ...e.later, timeSlots: [...e.schedule.timeSlots] },
        };
      },
    };
  r(Nk, "default", function () {
    return Bk;
  }),
    n(Nk);
  var jk = {},
    Lk = {
      update: function (e) {
        return e.userStates
          ? { ...e, settings: { laterAutoRetry: 12 * j.time.HOUR } }
          : e;
      },
    };
  r(jk, "default", function () {
    return Lk;
  }),
    n(jk);
  var Vk = {},
    $k = {
      update: function (e) {
        return { ...e, later: { ...e.later, errors: [] } };
      },
    };
  r(Vk, "default", function () {
    return $k;
  }),
    n(Vk);
  var zk = {},
    Hk = {
      update: async function (e) {
        const t = {
          ...e,
          later: { ...e.later, posts: e.later.posts.map((e) => ({ ...e })) },
        };
        for (const e of t.later.posts) {
          if (!e.isVideo) continue;
          let t, n;
          try {
            t = await cw.controller.get(`later.post-${e.id}`);
          } catch (e) {
            console.error(e);
            continue;
          }
          try {
            n = await j.loadVideoMetadata(t.blob);
          } catch (e) {
            console.error(e);
            continue;
          }
          e.duration = n.duration;
        }
        return t;
      },
    };
  r(zk, "default", function () {
    return Hk;
  }),
    n(zk);
  var qk = {},
    Gk = {
      update: function (e) {
        return { ...e, later: { ...e.later, lastDate: null } };
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
  r(Wk, "default", function () {
    return Jk;
  }),
    n(Wk);
  var Qk = {},
    Yk = {
      update: function (e) {
        return { ...e, later: { ...e.later, processing: !1 } };
      },
    };
  r(Qk, "default", function () {
    return Yk;
  }),
    n(Qk);
  var Kk = {};
  const { $files: Xk } = app;
  var Zk = {
    update: async function (e) {
      const t = {
        ...e,
        later: { ...e.later, posts: e.later.posts.map((e) => ({ ...e })) },
      };
      for (const e of t.later.posts) {
        let t, n, r, o;
        try {
          t = await cw.controller.get(`later.post-${e.id}`);
        } catch (e) {
          console.error(e);
        }
        if (t) {
          if (t.blob)
            try {
              n = await Xk.controller.save(t.blob, "later");
            } catch (e) {
              console.error(e);
            }
          if (t.previewBlob)
            try {
              r = await Xk.controller.save(t.previewBlob, "later");
            } catch (e) {
              console.error(e);
            }
          if (t.coverBlob)
            try {
              o = await Xk.controller.save(t.coverBlob, "later");
            } catch (e) {
              console.error(e);
            }
          try {
            await cw.controller.delete(`later.post-${e.id}`);
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
  r(Kk, "default", function () {
    return Zk;
  }),
    n(Kk);
  var eD = {},
    tD = {
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
  r(eD, "default", function () {
    return tD;
  }),
    n(eD);
  var nD = {},
    rD = {
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
  r(nD, "default", function () {
    return rD;
  }),
    n(nD);
  var oD = {},
    iD = {
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
  r(oD, "default", function () {
    return iD;
  }),
    n(oD);
  var aD = {};
  const { $files: sD } = app;
  var lD = {
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
            const e = await sD.controller.read(t.fileId);
            if (!e) continue;
            const n = await j.loadVideoMetadata(e);
            t.duration = n.duration;
          } catch (e) {
            console.error(e);
          }
      return t;
    },
  };
  r(aD, "default", function () {
    return lD;
  }),
    n(aD);
  var uD = {},
    cD = {
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
  r(uD, "default", function () {
    return cD;
  }),
    n(uD);
  var dD = {},
    fD = {
      update: function (e) {
        if (e.later.cookies) return e;
        const t = {};
        for (const n of e.authStatus.cookies.ig) t[n.name] = n.value;
        return { ...e, later: { ...e.later, cookies: t } };
      },
    };
  r(dD, "default", function () {
    return fD;
  }),
    n(dD);
  var pD = {},
    hD = {
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
  r(pD, "default", function () {
    return hD;
  }),
    n(pD);
  var gD = {},
    mD = {
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
  r(gD, "default", function () {
    return mD;
  }),
    n(gD);
  var vD = {},
    yD = {
      update: function (e) {
        return { ...e, later: { ...e.later, showUpsell: !1 } };
      },
    };
  r(vD, "default", function () {
    return yD;
  }),
    n(vD);
  var bD = {},
    wD = {
      update: function (e) {
        return { ...e, inspiration: { posts: [] } };
      },
    };
  r(bD, "default", function () {
    return wD;
  }),
    n(bD);
  var _D = {},
    xD = {
      update: function (e) {
        return { ...e, inspiration: { ...e.inspiration, prefilled: !1 } };
      },
    };
  r(_D, "default", function () {
    return xD;
  }),
    n(_D);
  var SD = {},
    PD = {
      update: function (e) {
        const t = { ...e };
        return delete t.schedule, t;
      },
    };
  r(SD, "default", function () {
    return PD;
  }),
    n(SD);
  var kD = {},
    DD = {
      update: function (e) {
        if (!e.userStates) return e;
        const t = { ...e };
        return delete t.zen, t;
      },
    };
  r(kD, "default", function () {
    return DD;
  }),
    n(kD);
  var ID = {},
    ED = {
      update: function (e) {
        const t = { ...e, authStatus: { ...e.authStatus } };
        return delete t.authStatus.isConnected, t;
      },
    };
  r(ID, "default", function () {
    return ED;
  }),
    n(ID);
  var TD = {},
    CD = {
      update: function (e) {
        return e.userStates
          ? {
              ...e,
              settings: {
                ...e.settings,
                laterAutoRetry:
                  e.settings.laterAutoRetry === 12 * j.time.HOUR
                    ? -1
                    : e.settings.laterAutoRetry,
              },
            }
          : e;
      },
    };
  r(TD, "default", function () {
    return CD;
  }),
    n(TD);
  var FD = {},
    AD = {
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
  r(FD, "default", function () {
    return AD;
  }),
    n(FD);
  var OD = {},
    MD = {
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
  r(OD, "default", function () {
    return MD;
  }),
    n(OD);
  var RD = {},
    UD = {
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
  r(RD, "default", function () {
    return UD;
  }),
    n(RD);
  var ND = {},
    BD = {
      update: function (e) {
        return e.userStates
          ? {
              ...e,
              settings: {
                ...e.settings,
                laterAutoRetry:
                  e.settings.laterAutoRetry === 12 * j.time.HOUR
                    ? -1
                    : e.settings.laterAutoRetry,
              },
            }
          : e;
      },
    };
  r(ND, "default", function () {
    return BD;
  }),
    n(ND);
  const jD = {
      "version-130": hx(gx).default,
      "version-131": hx(vx).default,
      "version-132": hx(bx).default,
      "version-133": hx(_x).default,
      "version-134": hx(Sx).default,
      "version-135": hx(kx).default,
      "version-136": hx(Ix).default,
      "version-137": hx(Tx).default,
      "version-138": hx(Fx).default,
      "version-139": hx(Ox).default,
      "version-140": hx(Rx).default,
      "version-141": hx(Nx).default,
      "version-142": hx(jx).default,
      "version-143": hx(Vx).default,
      "version-144": hx(zx).default,
      "version-145": hx(qx).default,
      "version-146": hx(Wx).default,
      "version-147": hx(Qx).default,
      "version-148": hx(Kx).default,
      "version-149": hx(Zx).default,
      "version-150": hx(tS).default,
      "version-151": hx(rS).default,
      "version-152": hx(iS).default,
      "version-153": hx(sS).default,
      "version-154": hx(uS).default,
      "version-155": hx(dS).default,
      "version-156": hx(pS).default,
      "version-157": hx(gS).default,
      "version-158": hx(vS).default,
      "version-159": hx(bS).default,
      "version-160": hx(_S).default,
      "version-161": hx(SS).default,
      "version-162": hx(kS).default,
      "version-163": hx(IS).default,
      "version-164": hx(TS).default,
      "version-165": hx(FS).default,
      "version-166": hx(OS).default,
      "version-167": hx(RS).default,
      "version-168": hx(NS).default,
      "version-169": hx(jS).default,
      "version-170": hx(VS).default,
      "version-171": hx(zS).default,
      "version-172": hx(qS).default,
      "version-173": hx(WS).default,
      "version-174": hx(QS).default,
      "version-175": hx(KS).default,
      "version-176": hx(ZS).default,
      "version-177": hx(tP).default,
      "version-178": hx(rP).default,
      "version-179": hx(iP).default,
      "version-180": hx(sP).default,
      "version-181": hx(uP).default,
      "version-182": hx(dP).default,
      "version-183": hx(pP).default,
      "version-184": hx(gP).default,
      "version-185": hx(vP).default,
      "version-186": hx(bP).default,
      "version-187": hx(_P).default,
      "version-188": hx(SP).default,
      "version-189": hx(kP).default,
      "version-190": hx(IP).default,
      "version-191": hx(TP).default,
      "version-192": hx(FP).default,
      "version-193": hx(OP).default,
      "version-194": hx(RP).default,
      "version-195": hx(NP).default,
      "version-196": hx(jP).default,
      "version-197": hx(VP).default,
      "version-198": hx(zP).default,
      "version-199": hx(qP).default,
      "version-200": hx(WP).default,
      "version-201": hx(QP).default,
      "version-202": hx(KP).default,
      "version-203": hx(ZP).default,
      "version-204": hx(tk).default,
      "version-205": hx(rk).default,
      "version-206": hx(ik).default,
      "version-207": hx(sk).default,
      "version-208": hx(uk).default,
      "version-209": hx(dk).default,
      "version-210": hx(pk).default,
      "version-211": hx(gk).default,
      "version-212": hx(vk).default,
      "version-213": hx(bk).default,
      "version-214": hx(_k).default,
      "version-215": hx(Sk).default,
      "version-216": hx(kk).default,
      "version-217": hx(Ik).default,
      "version-218": hx(Tk).default,
      "version-219": hx(Fk).default,
      "version-220": hx(Ok).default,
      "version-221": hx(Rk).default,
      "version-222": hx(Nk).default,
      "version-223": hx(jk).default,
      "version-224": hx(Vk).default,
      "version-225": hx(zk).default,
      "version-226": hx(qk).default,
      "version-227": hx(Wk).default,
      "version-228": hx(Qk).default,
      "version-229": hx(Kk).default,
      "version-230": hx(eD).default,
      "version-231": hx(nD).default,
      "version-232": hx(oD).default,
      "version-233": hx(aD).default,
      "version-234": hx(uD).default,
      "version-235": hx(dD).default,
      "version-236": hx(pD).default,
      "version-237": hx(gD).default,
      "version-238": hx(vD).default,
      "version-239": hx(bD).default,
      "version-240": hx(_D).default,
      "version-241": hx(SD).default,
      "version-242": hx(kD).default,
      "version-243": hx(ID).default,
      "version-244": hx(TD).default,
      "version-245": hx(FD).default,
      "version-246": hx(OD).default,
      "version-247": hx(RD).default,
      "version-248": hx(ND).default,
    },
    LD = {
      versioners: {},
      init: function () {
        const e = /version-(\d+)/i;
        Object.keys(jD)
          .map((t) => {
            const n = parseInt(t.match(e)[1]);
            return { key: t, version: n };
          })
          .sort((e, t) => e.version - t.version)
          .forEach((e) => {
            this.versioners[e.version] = jD[e.key];
          });
      },
      update: async function (e) {
        let t = e,
          n = t.version || 0;
        log(`versioner: model version is ${n}`);
        const r = xb().version;
        for (; n < r; ) {
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
  LD.init();
  const VD = function (e) {
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
    { $influx: $D } = app;
  var zD = $D.action("state.setup-default-state", (e) =>
    e.whatsNew ? e : { ...xb(), ...Pb() }
  );
  const { $influx: HD } = app;
  var qD = {
    controller: {
      init: async function () {
        zD.dispatch(), await this._update();
      },
      _update: async function () {
        let e = HD.model.state;
        (e = await LD.update(e)),
          (e = VD(e)),
          e !== HD.model.state && yb.dispatch(e);
      },
    },
  };
  const {
    $startup: GD,
    $later: WD,
    $chromeBus: JD,
    $insights: QD,
    $inspiration: YD,
    $cleanup: KD,
  } = app;
  (GD.controller = {
    init: async function () {
      let e = !1;
      JD.on("bg.is-ready", () => e),
        (globalThis._ = Xy),
        fx.controller.init(),
        await this._clearTimerAlarms();
      const t = cx.controller.getVersion();
      console.log(`chrome version is: ${t}`),
        px.init(),
        await sx.controller.init(),
        Qy.controller.init({
          dsn: "https://bea0900834f541bca8157710f7fd31fe@sentry.io/1547551",
        }),
        dx.controller.init(),
        await Bw.controller.init(),
        H_.controller.init(),
        await Db.controller.init(),
        q_.controller.init(),
        await t_.controller.init("background", !0),
        await qD.controller.init(),
        KD.controller.init(),
        l_.controller.init(),
        u_.controller.init(),
        QD.controller.init(),
        K_.controller.init(),
        Tw.controller.init(),
        Qw.controller.init(),
        ex.controller.init(),
        Hb.controller.init(),
        WD.controller.init(),
        YD.controller.init(),
        Zb.controller.init().sendPageview().sendInstall(),
        Ib.controller.init(),
        await Ib.controller.updateUser(),
        Zg.controller.init(),
        await Zg.controller.updatePro(),
        Mb.controller.init(),
        tw.controller.init(),
        (e = !0);
    },
    _clearTimerAlarms: async function () {
      const e = (await j.callAsync(chrome.alarms.getAll)).filter((e) =>
        e.name.startsWith("timer-")
      );
      for (const t of e) await j.callAsync(chrome.alarms.clear, t.name);
    },
  }),
    GD.controller.init();
})();
