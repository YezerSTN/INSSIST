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
    { title: "Custom Video Covers", isPro: !0 },
    { title: "Hashtags Metrics & Collections", isPro: !0 },
    { title: "Schedule Posts", isPro: !0 },
    { title: "Schedule Reels", isPro: !0 },
    { title: "Schedule Photo / Video Stories", isPro: !0 },
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
  var S = {
    unique: function (e) {
      return Array.from(new Set(e));
    },
    gaussian: x,
    gaussianInt: function (e, t) {
      return Math.round(e + x() * (t - e));
    },
    forceLayout: function () {
      document.body.getBoundingClientRect();
    },
    hashCode: P,
    pseudorandom: function (e) {
      return ((16807 * Math.max(Math.abs(P(e)), 1)) % 2147483647) / 2147483646;
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
  function x() {
    let e = 0;
    for (let t = 0; t < 6; t += 1) e += Math.random();
    return e / 6;
  }
  function P(e) {
    if (!e) return 0;
    let t,
      n,
      r = 0;
    if (0 === e.length) return r;
    for (t = 0; t < e.length; t++)
      (n = e.charCodeAt(t)), (r = (r << 5) - r + n), (r |= 0);
    return r;
  }
  async function k(e) {
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
          o = t + S.gaussianInt(0, r);
        if (0 === o) return;
        await new Promise((e) => setTimeout(e, o));
      }
    }
  }
  function D(e, t, n) {
    return n.indexOf(e) === t;
  }
  function E(e) {
    return Object.keys(e)
      .map((t) => {
        const n = e[t];
        return I(n)
          ? T(t, n)
          : Array.isArray(n)
          ? n.map((e) => T(t, e)).join("&")
          : null;
      })
      .filter(Boolean)
      .join("&")
      .replace(/%5B/g, "[")
      .replace(/%5D/g, "]");
  }
  function T(e, t) {
    return (
      I(t) || (t = JSON.stringify(t)),
      `${encodeURIComponent(e)}=${encodeURIComponent(t)}`
    );
  }
  function I(e) {
    return (
      "string" == typeof e || "number" == typeof e || "boolean" == typeof e
    );
  }
  function C(e, t = {}) {
    const n = E(t);
    return n ? `${e}?${n}` : e;
  }
  function A(e) {
    return Array.isArray(e) ? e : [e];
  }
  function F() {
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
  let O, M;
  function R({ hashOptional: e = !1 } = {}) {
    return (
      O ||
        ((O =
          /()([#\uFF03])((?:[A-Za-zªµºÀ-ÖØ-öø-Ɂɐ-ˁˆ-ˑˠ-ˤˮͺΆΈ-ΊΌΎ-ΡΣ-ώϐ-ϵϷ-ҁҊ-ӎ-ӹԀ-ԏԱ-Ֆՙա-ևא-תװ-ײء-غـ-يٮ-ٯٱ-ۓەۥ-ۦۮ-ۯۺ-ۼۿܐܒ-ܯݍ-ݭހ-ޥޱऄ-हऽॐक़-ॡॽঅ-ঌএ-ঐও-নপ-রলশ-হঽৎড়-ঢ়য়-ৡৰ-ৱਅ-ਊਏ-ਐਓ-ਨਪ-ਰਲ-ਲ਼ਵ-ਸ਼ਸ-ਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલ-ળવ-હઽૐૠ-ૡଅ-ଌଏ-ଐଓ-ନପ-ରଲ-ଳଵ-ହଽଡ଼-ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கங-சஜஞ-டண-தந-பம-ஹఅ-ఌఎ-ఐఒ-నప-ళవ-హౠ-ౡಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠ-ೡഅ-ഌഎ-ഐഒ-നപ-ഹൠ-ൡඅ-ඖක-නඳ-රලව-ෆก-ะา-ำเ-ๆກ-ຂຄງ-ຈຊຍດ-ທນ-ຟມ-ຣລວສ-ຫອ-ະາ-ຳຽເ-ໄໆໜ-ໝༀཀ-ཇཉ-ཪྈ-ྋက-အဣ-ဧဩ-ဪၐ-ၕႠ-Ⴥა-ჺჼᄀ-ᅙᅟ-ᆢᆨ-ᇹሀ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏ-Ᏼᐁ-ᙬᙯ-ᙶᚁ-ᚚᚠ-ᛪᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡷᢀ-ᢨᤀ-ᤜᥐ-ᥭᥰ-ᥴᦀ-ᦩᧁ-ᧇᨀ-ᨖᴀ-ᶿḀ-ẛẠ-ỹἀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₔℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℱℳ-ℹℼ-ℿⅅ-ⅉⰀ-Ⱞⰰ-ⱞⲀ-ⳤⵥⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞ々-〆〱-〵〻-〼ぁ-ゖゝ-ゟァ-ヺー-ヿㄅ-ㄬㄱ-ㆎㆠ-ㆷㇰ-ㇿ-䶵一-龻ꀀ-ꒌꠀ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢ가-힣豈-鶴侮-頻並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּ-לּמּנּ-סּףּ-פּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ̀ﾡ-ￜァ-ヺー-ヾｦ-ﾟ０-９Ａ-Ｚａ-ｚぁ-ゖ゙-ゞ㐀-䶿一-鿿꜀-뜿띀-렟-﨟〃々〻0-9٠-٩۰-۹०-९০-৯੦-੯૦-૯୦-୯௦-௯౦-౯೦-೯൦-൯๐-๙໐-໙༠-༩၀-၉០-៩᠐-᠙᥆-᥏᧐-᧙０-９_]|(?:[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u2388\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2648-\u2653\u2660\u2663\u2665\u2666\u2668\u267B\u267F\u2692-\u2694\u2696\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD79\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED0\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3]|\uD83E[\uDD10-\uDD18\uDD80-\uDD84\uDDC0]|(?:0\u20E3|1\u20E3|2\u20E3|3\u20E3|4\u20E3|5\u20E3|6\u20E3|7\u20E3|8\u20E3|9\u20E3|#\u20E3|\\*\u20E3|\uD83C(?:\uDDE6\uD83C(?:\uDDEB|\uDDFD|\uDDF1|\uDDF8|\uDDE9|\uDDF4|\uDDEE|\uDDF6|\uDDEC|\uDDF7|\uDDF2|\uDDFC|\uDDE8|\uDDFA|\uDDF9|\uDDFF|\uDDEA)|\uDDE7\uD83C(?:\uDDF8|\uDDED|\uDDE9|\uDDE7|\uDDFE|\uDDEA|\uDDFF|\uDDEF|\uDDF2|\uDDF9|\uDDF4|\uDDE6|\uDDFC|\uDDFB|\uDDF7|\uDDF3|\uDDEC|\uDDEB|\uDDEE|\uDDF6|\uDDF1)|\uDDE8\uD83C(?:\uDDF2|\uDDE6|\uDDFB|\uDDEB|\uDDF1|\uDDF3|\uDDFD|\uDDF5|\uDDE8|\uDDF4|\uDDEC|\uDDE9|\uDDF0|\uDDF7|\uDDEE|\uDDFA|\uDDFC|\uDDFE|\uDDFF|\uDDED)|\uDDE9\uD83C(?:\uDDFF|\uDDF0|\uDDEC|\uDDEF|\uDDF2|\uDDF4|\uDDEA)|\uDDEA\uD83C(?:\uDDE6|\uDDE8|\uDDEC|\uDDF7|\uDDEA|\uDDF9|\uDDFA|\uDDF8|\uDDED)|\uDDEB\uD83C(?:\uDDF0|\uDDF4|\uDDEF|\uDDEE|\uDDF7|\uDDF2)|\uDDEC\uD83C(?:\uDDF6|\uDDEB|\uDDE6|\uDDF2|\uDDEA|\uDDED|\uDDEE|\uDDF7|\uDDF1|\uDDE9|\uDDF5|\uDDFA|\uDDF9|\uDDEC|\uDDF3|\uDDFC|\uDDFE|\uDDF8|\uDDE7)|\uDDED\uD83C(?:\uDDF7|\uDDF9|\uDDF2|\uDDF3|\uDDF0|\uDDFA)|\uDDEE\uD83C(?:\uDDF4|\uDDE8|\uDDF8|\uDDF3|\uDDE9|\uDDF7|\uDDF6|\uDDEA|\uDDF2|\uDDF1|\uDDF9)|\uDDEF\uD83C(?:\uDDF2|\uDDF5|\uDDEA|\uDDF4)|\uDDF0\uD83C(?:\uDDED|\uDDFE|\uDDF2|\uDDFF|\uDDEA|\uDDEE|\uDDFC|\uDDEC|\uDDF5|\uDDF7|\uDDF3)|\uDDF1\uD83C(?:\uDDE6|\uDDFB|\uDDE7|\uDDF8|\uDDF7|\uDDFE|\uDDEE|\uDDF9|\uDDFA|\uDDF0|\uDDE8)|\uDDF2\uD83C(?:\uDDF4|\uDDF0|\uDDEC|\uDDFC|\uDDFE|\uDDFB|\uDDF1|\uDDF9|\uDDED|\uDDF6|\uDDF7|\uDDFA|\uDDFD|\uDDE9|\uDDE8|\uDDF3|\uDDEA|\uDDF8|\uDDE6|\uDDFF|\uDDF2|\uDDF5|\uDDEB)|\uDDF3\uD83C(?:\uDDE6|\uDDF7|\uDDF5|\uDDF1|\uDDE8|\uDDFF|\uDDEE|\uDDEA|\uDDEC|\uDDFA|\uDDEB|\uDDF4)|\uDDF4\uD83C\uDDF2|\uDDF5\uD83C(?:\uDDEB|\uDDF0|\uDDFC|\uDDF8|\uDDE6|\uDDEC|\uDDFE|\uDDEA|\uDDED|\uDDF3|\uDDF1|\uDDF9|\uDDF7|\uDDF2)|\uDDF6\uD83C\uDDE6|\uDDF7\uD83C(?:\uDDEA|\uDDF4|\uDDFA|\uDDFC|\uDDF8)|\uDDF8\uD83C(?:\uDDFB|\uDDF2|\uDDF9|\uDDE6|\uDDF3|\uDDE8|\uDDF1|\uDDEC|\uDDFD|\uDDF0|\uDDEE|\uDDE7|\uDDF4|\uDDF8|\uDDED|\uDDE9|\uDDF7|\uDDEF|\uDDFF|\uDDEA|\uDDFE)|\uDDF9\uD83C(?:\uDDE9|\uDDEB|\uDDFC|\uDDEF|\uDDFF|\uDDED|\uDDF1|\uDDEC|\uDDF0|\uDDF4|\uDDF9|\uDDE6|\uDDF3|\uDDF7|\uDDF2|\uDDE8|\uDDFB)|\uDDFA\uD83C(?:\uDDEC|\uDDE6|\uDDF8|\uDDFE|\uDDF2|\uDDFF)|\uDDFB\uD83C(?:\uDDEC|\uDDE8|\uDDEE|\uDDFA|\uDDE6|\uDDEA|\uDDF3)|\uDDFC\uD83C(?:\uDDF8|\uDDEB)|\uDDFD\uD83C\uDDF0|\uDDFE\uD83C(?:\uDDF9|\uDDEA)|\uDDFF\uD83C(?:\uDDE6|\uDDF2|\uDDFC))))[\uFE00-\uFE0F\u200D]*)+)/gi),
        (M = new RegExp(
          O.toString()
            .replace("/", "")
            .replace("/gi", "")
            .replace("[#\\uFF03]", "[#\\uFF03]?"),
          "gi"
        ))),
      e ? M : O
    );
  }
  var N = {};
  Object.assign(N, {
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
    sleep: k,
    unique: D,
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
    callAsync: async function (e, ...t) {
      return new Promise((n) => {
        e(...t, n);
      });
    },
    createUrl: C,
    jsonEscape: function (e) {
      return e.replace(/[\n\r\t]/g, " ");
    },
    ensureArray: A,
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
    createEmitter: F,
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
    getHashtagRegex: R,
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
    createQueryString: E,
    createResolvablePromise: function () {
      let e;
      const t = new Promise((t) => {
        e = t;
      });
      return Object.defineProperty(t, "resolve", { get: () => e }), t;
    },
    time: w,
  });
  var U = {},
    B = {},
    L = {},
    j = {},
    V = 1;
  j = {
    nextValue: function () {
      return (V = (9301 * V + 49297) % 233280) / 233280;
    },
    seed: function (e) {
      V = e;
    },
  };
  var H,
    q,
    z,
    G = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-";
  function $() {
    z = !1;
  }
  function W(e) {
    if (e) {
      if (e !== H) {
        if (e.length !== G.length)
          throw new Error(
            "Custom alphabet for shortid must be " +
              G.length +
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
              G.length +
              " unique characters. These characters were not unique: " +
              t.join(", ")
          );
        (H = e), $();
      }
    } else H !== G && ((H = G), $());
  }
  function Y() {
    return (
      z ||
      (z = (function () {
        H || W(G);
        for (var e, t = H.split(""), n = [], r = j.nextValue(); t.length > 0; )
          (r = j.nextValue()),
            (e = Math.floor(r * t.length)),
            n.push(t.splice(e, 1)[0]);
        return n.join("");
      })())
    );
  }
  L = {
    get: function () {
      return H || G;
    },
    characters: function (e) {
      return W(e), H;
    },
    seed: function (e) {
      j.seed(e), q !== e && ($(), (q = e));
    },
    lookup: function (e) {
      return Y()[e];
    },
    shuffled: Y,
  };
  var J = "object" == typeof window && (window.crypto || window.msCrypto),
    Q =
      J && J.getRandomValues
        ? function (e) {
            return J.getRandomValues(new Uint8Array(e));
          }
        : function (e) {
            for (var t = [], n = 0; n < e; n++)
              t.push(Math.floor(256 * Math.random()));
            return t;
          },
    K = function (e, t, n) {
      for (
        var r = (2 << (Math.log(t.length - 1) / Math.LN2)) - 1,
          o = -~((1.6 * r * n) / t.length),
          i = "";
        ;

      )
        for (var a = e(o), s = o; s--; )
          if ((i += t[a[s] & r] || "").length === +n) return i;
    };
  var X,
    Z,
    ee = function (e) {
      for (var t, n = 0, r = ""; !t; )
        (r += K(Q, L.get(), 1)), (t = e < Math.pow(16, n + 1)), n++;
      return r;
    };
  var te = function (e) {
    var t = "",
      n = Math.floor(0.001 * (Date.now() - 1567752802062));
    return (
      n === Z ? X++ : ((X = 0), (Z = n)),
      (t += ee(7)),
      (t += ee(e)),
      X > 0 && (t += ee(X)),
      (t += ee(n))
    );
  };
  var ne,
    re = function (e) {
      return (
        !(!e || "string" != typeof e || e.length < 6) &&
        !new RegExp(
          "[^" + L.get().replace(/[|\\{}()[\]^$+*?.-]/g, "\\$&") + "]"
        ).test(e)
      );
    },
    oe = !1;
  var ie = (oe || ((oe = !0), (ne = {}), (ne = 0)), ne || 0);
  function ae() {
    return te(ie);
  }
  var se = ae;
  (B = ae).generate = se;
  var le = function (e) {
    return L.seed(e), B;
  };
  B.seed = le;
  var ue = function (e) {
    return (ie = e), B;
  };
  B.worker = ue;
  var ce = function (e) {
    return void 0 !== e && L.characters(e), L.shuffled();
  };
  B.characters = ce;
  var de = re;
  (B.isValid = de), (U = B);
  var fe = function () {
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
    pe = function () {
      return Math.random().toString(36).substring(7).split("").join(".");
    },
    he = {
      INIT: "@@redux/INIT" + pe(),
      REPLACE: "@@redux/REPLACE" + pe(),
      PROBE_UNKNOWN_ACTION: function () {
        return "@@redux/PROBE_UNKNOWN_ACTION" + pe();
      },
    };
  function ge(e) {
    if ("object" != typeof e || null === e) return !1;
    for (var t = e; null !== Object.getPrototypeOf(t); )
      t = Object.getPrototypeOf(t);
    return Object.getPrototypeOf(e) === t;
  }
  function me(e, t, n) {
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
      return n(me)(e, t);
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
      if (!ge(e))
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
      (o = e), f({ type: he.REPLACE });
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
        })[fe.default] = function () {
          return this;
        }),
        e
      );
    }
    return (
      f({ type: he.INIT }),
      ((r = { dispatch: f, subscribe: d, getState: c, replaceReducer: p })[
        fe.default
      ] = h),
      r
    );
  }
  function ve(e, t) {
    return function () {
      return t(e.apply(this, arguments));
    };
  }
  const be = {
    store: null,
    init: function (e = {}) {
      if (this.store) return;
      const t = this._reduce.bind(this);
      return (
        u.is.development && globalThis.devToolsExtension
          ? (this.store = me(t, e, globalThis.devToolsExtension()))
          : (this.store = me(t, e)),
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
  var ye,
    we,
    _e,
    Se,
    xe = !1;
  function Pe(e) {
    if (null == e)
      throw new TypeError(
        "Object.assign cannot be called with null or undefined"
      );
    return Object(e);
  }
  function ke() {
    (ye = {}),
      (we = Object.getOwnPropertySymbols),
      (_e = Object.prototype.hasOwnProperty),
      (Se = Object.prototype.propertyIsEnumerable),
      (ye = (function () {
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
            for (var n, r, o = Pe(e), i = 1; i < arguments.length; i++) {
              for (var a in (n = Object(arguments[i])))
                _e.call(n, a) && (o[a] = n[a]);
              if (we) {
                r = we(n);
                for (var s = 0; s < r.length; s++)
                  Se.call(n, r[s]) && (o[r[s]] = n[r[s]]);
              }
            }
            return o;
          });
  }
  function De() {
    return xe || ((xe = !0), ke()), ye;
  }
  var Ee,
    Te,
    Ie,
    Ce,
    Ae,
    Fe,
    Oe,
    Me,
    Re,
    Ne,
    Ue,
    Be,
    Le,
    je,
    Ve,
    He,
    qe,
    ze,
    Ge,
    $e,
    We,
    Ye,
    Je,
    Qe,
    Ke,
    Xe,
    Ze,
    et,
    tt,
    nt,
    rt,
    ot,
    it,
    at,
    st,
    lt,
    ut,
    ct,
    dt,
    ft,
    pt,
    ht,
    gt,
    mt,
    vt,
    bt,
    yt,
    wt,
    _t,
    St,
    xt,
    Pt,
    kt = !1;
  function Dt(e) {
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
  function Et(e, t, n) {
    (this.props = e),
      (this.context = t),
      (this.refs = qe),
      (this.updater = n || He);
  }
  function Tt() {}
  function It(e, t, n) {
    (this.props = e),
      (this.context = t),
      (this.refs = qe),
      (this.updater = n || He);
  }
  function Ct(e, t, n) {
    var r,
      o = {},
      i = null,
      a = null;
    if (null != t)
      for (r in (void 0 !== t.ref && (a = t.ref),
      void 0 !== t.key && (i = "" + t.key),
      t))
        $e.call(t, r) && !We.hasOwnProperty(r) && (o[r] = t[r]);
    var s = arguments.length - 2;
    if (1 === s) o.children = n;
    else if (1 < s) {
      for (var l = Array(s), u = 0; u < s; u++) l[u] = arguments[u + 2];
      o.children = l;
    }
    if (e && e.defaultProps)
      for (r in (s = e.defaultProps)) void 0 === o[r] && (o[r] = s[r]);
    return {
      $$typeof: Ce,
      type: e,
      key: i,
      ref: a,
      props: o,
      _owner: Ge.current,
    };
  }
  function At(e) {
    return "object" == typeof e && null !== e && e.$$typeof === Ce;
  }
  function Ft(e, t, n, r) {
    if (Je.length) {
      var o = Je.pop();
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
  function Ot(e) {
    (e.result = null),
      (e.keyPrefix = null),
      (e.func = null),
      (e.context = null),
      (e.count = 0),
      10 > Je.length && Je.push(e);
  }
  function Mt(e, t, n, r) {
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
            case Ce:
            case Ae:
              i = !0;
          }
      }
    if (i) return n(r, e, "" === t ? "." + Nt(e, 0) : t), 1;
    if (((i = 0), (t = "" === t ? "." : t + ":"), Array.isArray(e)))
      for (var a = 0; a < e.length; a++) {
        var s = t + Nt((o = e[a]), a);
        i += Mt(o, s, n, r);
      }
    else if (
      (null === e || "object" != typeof e
        ? (s = null)
        : (s =
            "function" == typeof (s = (Ve && e[Ve]) || e["@@iterator"])
              ? s
              : null),
      "function" == typeof s)
    )
      for (e = s.call(e), a = 0; !(o = e.next()).done; )
        i += Mt((o = o.value), (s = t + Nt(o, a++)), n, r);
    else if ("object" === o)
      throw (
        ((n = "" + e),
        Error(
          Dt(
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
  function Rt(e, t, n) {
    return null == e ? 0 : Mt(e, "", t, n);
  }
  function Nt(e, t) {
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
  function Ut(e, t) {
    e.func.call(e.context, t, e.count++);
  }
  function Bt(e, t, n) {
    var r = e.result,
      o = e.keyPrefix;
    (e = e.func.call(e.context, t, e.count++)),
      Array.isArray(e)
        ? Lt(e, r, n, function (e) {
            return e;
          })
        : null != e &&
          (At(e) &&
            (e = (function (e, t) {
              return {
                $$typeof: Ce,
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
                  : ("" + e.key).replace(Ye, "$&/") + "/") +
                n
            )),
          r.push(e));
  }
  function Lt(e, t, n, r, o) {
    var i = "";
    null != n && (i = ("" + n).replace(Ye, "$&/") + "/"),
      Rt(e, Bt, (t = Ft(t, i, r, o))),
      Ot(t);
  }
  function jt() {
    var e = Qe.current;
    if (null === e) throw Error(Dt(321));
    return e;
  }
  function Vt() {
    return (
      kt ||
        ((kt = !0),
        (Ee = {}),
        (Te = De()),
        (Ie = "function" == typeof Symbol && Symbol.for),
        (Ce = Ie ? Symbol.for("react.element") : 60103),
        (Ae = Ie ? Symbol.for("react.portal") : 60106),
        (Fe = Ie ? Symbol.for("react.fragment") : 60107),
        (Oe = Ie ? Symbol.for("react.strict_mode") : 60108),
        (Me = Ie ? Symbol.for("react.profiler") : 60114),
        (Re = Ie ? Symbol.for("react.provider") : 60109),
        (Ne = Ie ? Symbol.for("react.context") : 60110),
        (Ue = Ie ? Symbol.for("react.forward_ref") : 60112),
        (Be = Ie ? Symbol.for("react.suspense") : 60113),
        (Le = Ie ? Symbol.for("react.memo") : 60115),
        (je = Ie ? Symbol.for("react.lazy") : 60116),
        (Ve = "function" == typeof Symbol && Symbol.iterator),
        (He = {
          isMounted: function () {
            return !1;
          },
          enqueueForceUpdate: function () {},
          enqueueReplaceState: function () {},
          enqueueSetState: function () {},
        }),
        (qe = {}),
        (Et.prototype.isReactComponent = {}),
        (Et.prototype.setState = function (e, t) {
          if ("object" != typeof e && "function" != typeof e && null != e)
            throw Error(Dt(85));
          this.updater.enqueueSetState(this, e, t, "setState");
        }),
        (Et.prototype.forceUpdate = function (e) {
          this.updater.enqueueForceUpdate(this, e, "forceUpdate");
        }),
        (Tt.prototype = Et.prototype),
        ((ze = It.prototype = new Tt()).constructor = It),
        Te(ze, Et.prototype),
        (ze.isPureReactComponent = !0),
        (Ge = { current: null }),
        ($e = Object.prototype.hasOwnProperty),
        (We = { key: !0, ref: !0, __self: !0, __source: !0 }),
        (Ye = /\/+/g),
        (Je = []),
        (Ke = {
          ReactCurrentDispatcher: (Qe = { current: null }),
          ReactCurrentBatchConfig: { suspense: null },
          ReactCurrentOwner: Ge,
          IsSomeRendererActing: { current: !1 },
          assign: Te,
        }),
        (Xe = {
          map: function (e, t, n) {
            if (null == e) return e;
            var r = [];
            return Lt(e, r, null, t, n), r;
          },
          forEach: function (e, t, n) {
            if (null == e) return e;
            Rt(e, Ut, (t = Ft(null, null, t, n))), Ot(t);
          },
          count: function (e) {
            return Rt(
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
              Lt(e, t, null, function (e) {
                return e;
              }),
              t
            );
          },
          only: function (e) {
            if (!At(e)) throw Error(Dt(143));
            return e;
          },
        }),
        (Ee.Children = Xe),
        (Ze = Et),
        (Ee.Component = Ze),
        (et = Fe),
        (Ee.Fragment = et),
        (tt = Me),
        (Ee.Profiler = tt),
        (nt = It),
        (Ee.PureComponent = nt),
        (rt = Oe),
        (Ee.StrictMode = rt),
        (ot = Be),
        (Ee.Suspense = ot),
        (it = Ke),
        (Ee.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = it),
        (at = function (e, t, n) {
          if (null == e) throw Error(Dt(267, e));
          var r = Te({}, e.props),
            o = e.key,
            i = e.ref,
            a = e._owner;
          if (null != t) {
            if (
              (void 0 !== t.ref && ((i = t.ref), (a = Ge.current)),
              void 0 !== t.key && (o = "" + t.key),
              e.type && e.type.defaultProps)
            )
              var s = e.type.defaultProps;
            for (l in t)
              $e.call(t, l) &&
                !We.hasOwnProperty(l) &&
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
            $$typeof: Ce,
            type: e.type,
            key: o,
            ref: i,
            props: r,
            _owner: a,
          };
        }),
        (Ee.cloneElement = at),
        (st = function (e, t) {
          return (
            void 0 === t && (t = null),
            ((e = {
              $$typeof: Ne,
              _calculateChangedBits: t,
              _currentValue: e,
              _currentValue2: e,
              _threadCount: 0,
              Provider: null,
              Consumer: null,
            }).Provider = { $$typeof: Re, _context: e }),
            (e.Consumer = e)
          );
        }),
        (Ee.createContext = st),
        (lt = Ct),
        (Ee.createElement = lt),
        (ut = function (e) {
          var t = Ct.bind(null, e);
          return (t.type = e), t;
        }),
        (Ee.createFactory = ut),
        (ct = function () {
          return { current: null };
        }),
        (Ee.createRef = ct),
        (dt = function (e) {
          return { $$typeof: Ue, render: e };
        }),
        (Ee.forwardRef = dt),
        (ft = At),
        (Ee.isValidElement = ft),
        (pt = function (e) {
          return { $$typeof: je, _ctor: e, _status: -1, _result: null };
        }),
        (Ee.lazy = pt),
        (ht = function (e, t) {
          return { $$typeof: Le, type: e, compare: void 0 === t ? null : t };
        }),
        (Ee.memo = ht),
        (gt = function (e, t) {
          return jt().useCallback(e, t);
        }),
        (Ee.useCallback = gt),
        (mt = function (e, t) {
          return jt().useContext(e, t);
        }),
        (Ee.useContext = mt),
        (vt = function () {}),
        (Ee.useDebugValue = vt),
        (bt = function (e, t) {
          return jt().useEffect(e, t);
        }),
        (Ee.useEffect = bt),
        (yt = function (e, t, n) {
          return jt().useImperativeHandle(e, t, n);
        }),
        (Ee.useImperativeHandle = yt),
        (wt = function (e, t) {
          return jt().useLayoutEffect(e, t);
        }),
        (Ee.useLayoutEffect = wt),
        (_t = function (e, t) {
          return jt().useMemo(e, t);
        }),
        (Ee.useMemo = _t),
        (St = function (e, t, n) {
          return jt().useReducer(e, t, n);
        }),
        (Ee.useReducer = St),
        (xt = function (e) {
          return jt().useRef(e);
        }),
        (Ee.useRef = xt),
        (Pt = function (e) {
          return jt().useState(e);
        }),
        (Ee.useState = Pt),
        "16.13.1",
        (Ee.version = "16.13.1")),
      Ee
    );
  }
  var Ht,
    qt,
    zt = !1;
  function Gt() {
    return zt || ((zt = !0), (Ht = {}), (Ht = Vt()), (qt = t(Ht))), Ht;
  }
  Gt();
  var $t,
    Wt = !1;
  function Yt() {
    return (
      Wt ||
        ((Wt = !0),
        ($t = {}),
        "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED",
        ($t = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED")),
      $t
    );
  }
  var Jt,
    Qt,
    Kt = !1;
  function Xt() {}
  function Zt() {}
  (Kt ||
    ((Kt = !0),
    (Jt = {}),
    (Qt = Yt()),
    (Zt.resetWarningCache = Xt),
    (Jt = function () {
      function e(e, t, n, r, o, i) {
        if (i !== Qt) {
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
        checkPropTypes: Zt,
        resetWarningCache: Xt,
      };
      return (n.PropTypes = n), n;
    })),
  Jt)();
  Gt();
  var en = qt.createContext(null);
  var tn = function (e) {
      e();
    },
    nn = { notify: function () {} };
  function rn() {
    var e = tn,
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
  var on = (function () {
    function e(e, t) {
      (this.store = e),
        (this.parentSub = t),
        (this.unsubscribe = null),
        (this.listeners = nn),
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
          (this.listeners = rn()));
      }),
      (t.tryUnsubscribe = function () {
        this.unsubscribe &&
          (this.unsubscribe(),
          (this.unsubscribe = null),
          this.listeners.clear(),
          (this.listeners = nn));
      }),
      e
    );
  })();
  function an() {
    return (an =
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
  var sn = an;
  function ln(e, t) {
    if (null == e) return {};
    var n,
      r,
      o = {},
      i = Object.keys(e);
    for (r = 0; r < i.length; r++)
      (n = i[r]), t.indexOf(n) >= 0 || (o[n] = e[n]);
    return o;
  }
  var un,
    cn,
    dn,
    fn,
    pn,
    hn,
    gn,
    mn,
    vn,
    bn,
    yn,
    wn,
    _n,
    Sn,
    xn,
    Pn,
    kn,
    Dn,
    En,
    Tn,
    In,
    Cn,
    An,
    Fn,
    On,
    Mn,
    Rn,
    Nn,
    Un,
    Bn,
    Ln,
    jn,
    Vn,
    Hn,
    qn,
    zn,
    Gn,
    $n,
    Wn,
    Yn,
    Jn,
    Qn,
    Kn,
    Xn,
    Zn,
    er,
    tr,
    nr,
    rr = !1;
  function or(e) {
    if ("object" == typeof e && null !== e) {
      var t = e.$$typeof;
      switch (t) {
        case dn:
          switch ((e = e.type)) {
            case bn:
            case yn:
            case pn:
            case gn:
            case hn:
            case _n:
              return e;
            default:
              switch ((e = e && e.$$typeof)) {
                case vn:
                case wn:
                case Pn:
                case xn:
                case mn:
                  return e;
                default:
                  return t;
              }
          }
        case fn:
          return t;
      }
    }
  }
  function ir(e) {
    return or(e) === yn;
  }
  var ar = {};
  rr ||
    ((rr = !0),
    (un = {}),
    (cn = "function" == typeof Symbol && Symbol.for),
    (dn = cn ? Symbol.for("react.element") : 60103),
    (fn = cn ? Symbol.for("react.portal") : 60106),
    (pn = cn ? Symbol.for("react.fragment") : 60107),
    (hn = cn ? Symbol.for("react.strict_mode") : 60108),
    (gn = cn ? Symbol.for("react.profiler") : 60114),
    (mn = cn ? Symbol.for("react.provider") : 60109),
    (vn = cn ? Symbol.for("react.context") : 60110),
    (bn = cn ? Symbol.for("react.async_mode") : 60111),
    (yn = cn ? Symbol.for("react.concurrent_mode") : 60111),
    (wn = cn ? Symbol.for("react.forward_ref") : 60112),
    (_n = cn ? Symbol.for("react.suspense") : 60113),
    (Sn = cn ? Symbol.for("react.suspense_list") : 60120),
    (xn = cn ? Symbol.for("react.memo") : 60115),
    (Pn = cn ? Symbol.for("react.lazy") : 60116),
    (kn = cn ? Symbol.for("react.block") : 60121),
    (Dn = cn ? Symbol.for("react.fundamental") : 60117),
    (En = cn ? Symbol.for("react.responder") : 60118),
    (Tn = cn ? Symbol.for("react.scope") : 60119),
    (In = bn),
    (un.AsyncMode = In),
    (Cn = yn),
    (un.ConcurrentMode = Cn),
    (An = vn),
    (un.ContextConsumer = An),
    (Fn = mn),
    (un.ContextProvider = Fn),
    (On = dn),
    (un.Element = On),
    (Mn = wn),
    (un.ForwardRef = Mn),
    (Rn = pn),
    (un.Fragment = Rn),
    (Nn = Pn),
    (un.Lazy = Nn),
    (Un = xn),
    (un.Memo = Un),
    (Bn = fn),
    (un.Portal = Bn),
    (Ln = gn),
    (un.Profiler = Ln),
    (jn = hn),
    (un.StrictMode = jn),
    (Vn = _n),
    (un.Suspense = Vn),
    (Hn = function (e) {
      return ir(e) || or(e) === bn;
    }),
    (un.isAsyncMode = Hn),
    (qn = ir),
    (un.isConcurrentMode = qn),
    (zn = function (e) {
      return or(e) === vn;
    }),
    (un.isContextConsumer = zn),
    (Gn = function (e) {
      return or(e) === mn;
    }),
    (un.isContextProvider = Gn),
    ($n = function (e) {
      return "object" == typeof e && null !== e && e.$$typeof === dn;
    }),
    (un.isElement = $n),
    (Wn = function (e) {
      return or(e) === wn;
    }),
    (un.isForwardRef = Wn),
    (Yn = function (e) {
      return or(e) === pn;
    }),
    (un.isFragment = Yn),
    (Jn = function (e) {
      return or(e) === Pn;
    }),
    (un.isLazy = Jn),
    (Qn = function (e) {
      return or(e) === xn;
    }),
    (un.isMemo = Qn),
    (Kn = function (e) {
      return or(e) === fn;
    }),
    (un.isPortal = Kn),
    (Xn = function (e) {
      return or(e) === gn;
    }),
    (un.isProfiler = Xn),
    (Zn = function (e) {
      return or(e) === hn;
    }),
    (un.isStrictMode = Zn),
    (er = function (e) {
      return or(e) === _n;
    }),
    (un.isSuspense = er),
    (tr = function (e) {
      return (
        "string" == typeof e ||
        "function" == typeof e ||
        e === pn ||
        e === yn ||
        e === gn ||
        e === hn ||
        e === _n ||
        e === Sn ||
        ("object" == typeof e &&
          null !== e &&
          (e.$$typeof === Pn ||
            e.$$typeof === xn ||
            e.$$typeof === mn ||
            e.$$typeof === vn ||
            e.$$typeof === wn ||
            e.$$typeof === Dn ||
            e.$$typeof === En ||
            e.$$typeof === Tn ||
            e.$$typeof === kn))
      );
    }),
    (un.isValidElementType = tr),
    (nr = or),
    (un.typeOf = nr));
  var sr = {
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
    lr = {
      name: !0,
      length: !0,
      prototype: !0,
      caller: !0,
      callee: !0,
      arguments: !0,
      arity: !0,
    },
    ur = {
      $$typeof: !0,
      compare: !0,
      defaultProps: !0,
      displayName: !0,
      propTypes: !0,
      type: !0,
    },
    cr = {};
  function dr(e) {
    return ar.isMemo(e) ? ur : cr[e.$$typeof] || sr;
  }
  (cr[(ar = un).ForwardRef] = {
    $$typeof: !0,
    render: !0,
    defaultProps: !0,
    displayName: !0,
    propTypes: !0,
  }),
    (cr[ar.Memo] = ur);
  var fr = Object.defineProperty,
    pr = Object.getOwnPropertyNames,
    hr = Object.getOwnPropertySymbols,
    gr = Object.getOwnPropertyDescriptor,
    mr = Object.getPrototypeOf,
    vr = Object.prototype;
  var br = t(function e(t, n, r) {
    if ("string" != typeof n) {
      if (vr) {
        var o = mr(n);
        o && o !== vr && e(t, o, r);
      }
      var i = pr(n);
      hr && (i = i.concat(hr(n)));
      for (var a = dr(t), s = dr(n), l = 0; l < i.length; ++l) {
        var u = i[l];
        if (!(lr[u] || (r && r[u]) || (s && s[u]) || (a && a[u]))) {
          var c = gr(n, u);
          try {
            fr(t, u, c);
          } catch (e) {}
        }
      }
    }
    return t;
  });
  Gt(), Gt();
  var yr =
      "undefined" != typeof window &&
      void 0 !== window.document &&
      void 0 !== window.document.createElement
        ? Gt().useLayoutEffect
        : Gt().useEffect,
    wr = [],
    _r = [null, null];
  function Sr(e, t) {
    var n = e[1];
    return [t.payload, n + 1];
  }
  function xr(e, t, n) {
    yr(function () {
      return e.apply(void 0, t);
    }, n);
  }
  function Pr(e, t, n, r, o, i, a) {
    (e.current = r),
      (t.current = o),
      (n.current = !1),
      i.current && ((i.current = null), a());
  }
  function kr(e, t, n, r, o, i, a, s, l, u) {
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
  var Dr = function () {
    return [null, 0];
  };
  function Er(e, t) {
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
      m = void 0 === g ? en : g,
      v = ln(n, [
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
        i = sn({}, v, {
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
        ? Gt().useMemo
        : function (e) {
            return e();
          };
      function d(n) {
        var r = Gt().useMemo(
            function () {
              var e = n.reactReduxForwardedRef,
                t = ln(n, ["reactReduxForwardedRef"]);
              return [n.context, e, t];
            },
            [n]
          ),
          o = r[0],
          a = r[1],
          s = r[2],
          l = Gt().useMemo(
            function () {
              return o &&
                o.Consumer &&
                ar.isContextConsumer(qt.createElement(o.Consumer, null))
                ? o
                : b;
            },
            [o, b]
          ),
          d = Gt().useContext(l),
          f =
            Boolean(n.store) &&
            Boolean(n.store.getState) &&
            Boolean(n.store.dispatch);
        Boolean(d) && Boolean(d.store);
        var p = f ? n.store : d.store,
          h = Gt().useMemo(
            function () {
              return (function (t) {
                return e(t.dispatch, i);
              })(p);
            },
            [p]
          ),
          g = Gt().useMemo(
            function () {
              if (!c) return _r;
              var e = new on(p, f ? null : d.subscription),
                t = e.notifyNestedSubs.bind(e);
              return [e, t];
            },
            [p, f, d]
          ),
          m = g[0],
          v = g[1],
          y = Gt().useMemo(
            function () {
              return f ? d : sn({}, d, { subscription: m });
            },
            [f, d, m]
          ),
          w = Gt().useReducer(Sr, wr, Dr),
          _ = w[0][0],
          S = w[1];
        if (_ && _.error) throw _.error;
        var x = Gt().useRef(),
          P = Gt().useRef(s),
          k = Gt().useRef(),
          D = Gt().useRef(!1),
          E = u(
            function () {
              return k.current && s === P.current
                ? k.current
                : h(p.getState(), s);
            },
            [p, _, s]
          );
        xr(Pr, [P, x, D, s, E, k, v]),
          xr(kr, [c, p, m, h, P, x, D, k, v, S], [p, m, h]);
        var T = Gt().useMemo(
          function () {
            return qt.createElement(t, sn({}, E, { ref: a }));
          },
          [a, t, E]
        );
        return Gt().useMemo(
          function () {
            return c ? qt.createElement(l.Provider, { value: y }, T) : T;
          },
          [l, T, y]
        );
      }
      var p = s ? qt.memo(d) : d;
      if (((p.WrappedComponent = t), (p.displayName = r), h)) {
        var g = qt.forwardRef(function (e, t) {
          return qt.createElement(p, sn({}, e, { reactReduxForwardedRef: t }));
        });
        return (g.displayName = r), (g.WrappedComponent = t), br(g, t);
      }
      return br(p, t);
    };
  }
  function Tr(e, t) {
    return e === t ? 0 !== e || 0 !== t || 1 / e == 1 / t : e != e && t != t;
  }
  function Ir(e, t) {
    if (Tr(e, t)) return !0;
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
        !Tr(e[n[o]], t[n[o]])
      )
        return !1;
    return !0;
  }
  function Cr(e) {
    return function (t, n) {
      var r = e(t, n);
      function o() {
        return r;
      }
      return (o.dependsOnOwnProps = !1), o;
    };
  }
  function Ar(e) {
    return null !== e.dependsOnOwnProps && void 0 !== e.dependsOnOwnProps
      ? Boolean(e.dependsOnOwnProps)
      : 1 !== e.length;
  }
  function Fr(e, t) {
    return function (t, n) {
      n.displayName;
      var r = function (e, t) {
        return r.dependsOnOwnProps ? r.mapToProps(e, t) : r.mapToProps(e);
      };
      return (
        (r.dependsOnOwnProps = !0),
        (r.mapToProps = function (t, n) {
          (r.mapToProps = e), (r.dependsOnOwnProps = Ar(e));
          var o = r(t, n);
          return (
            "function" == typeof o &&
              ((r.mapToProps = o),
              (r.dependsOnOwnProps = Ar(o)),
              (o = r(t, n))),
            o
          );
        }),
        r
      );
    };
  }
  var Or = [
    function (e) {
      return "function" == typeof e ? Fr(e) : void 0;
    },
    function (e) {
      return e
        ? void 0
        : Cr(function (e) {
            return { dispatch: e };
          });
    },
    function (e) {
      return e && "object" == typeof e
        ? Cr(function (t) {
            return (function (e, t) {
              if ("function" == typeof e) return ve(e, t);
              if ("object" != typeof e || null === e)
                throw new Error(
                  "bindActionCreators expected an object or a function, instead received " +
                    (null === e ? "null" : typeof e) +
                    '. Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?'
                );
              var n = {};
              for (var r in e) {
                var o = e[r];
                "function" == typeof o && (n[r] = ve(o, t));
              }
              return n;
            })(e, t);
          })
        : void 0;
    },
  ];
  var Mr = [
    function (e) {
      return "function" == typeof e ? Fr(e) : void 0;
    },
    function (e) {
      return e
        ? void 0
        : Cr(function () {
            return {};
          });
    },
  ];
  function Rr(e, t, n) {
    return sn({}, n, {}, e, {}, t);
  }
  var Nr = [
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
            return Rr;
          };
    },
  ];
  function Ur(e, t, n, r) {
    return function (o, i) {
      return n(e(o, i), t(r, i), i);
    };
  }
  function Br(e, t, n, r, o) {
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
  function Lr(e, t) {
    var n = t.initMapStateToProps,
      r = t.initMapDispatchToProps,
      o = t.initMergeProps,
      i = ln(t, [
        "initMapStateToProps",
        "initMapDispatchToProps",
        "initMergeProps",
      ]),
      a = n(e, i),
      s = r(e, i),
      l = o(e, i);
    return (i.pure ? Br : Ur)(a, s, l, e, i);
  }
  function jr(e, t, n) {
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
  function Vr(e, t) {
    return e === t;
  }
  function Hr(e) {
    var t = void 0 === e ? {} : e,
      n = t.connectHOC,
      r = void 0 === n ? Er : n,
      o = t.mapStateToPropsFactories,
      i = void 0 === o ? Mr : o,
      a = t.mapDispatchToPropsFactories,
      s = void 0 === a ? Or : a,
      l = t.mergePropsFactories,
      u = void 0 === l ? Nr : l,
      c = t.selectorFactory,
      d = void 0 === c ? Lr : c;
    return function (e, t, n, o) {
      void 0 === o && (o = {});
      var a = o,
        l = a.pure,
        c = void 0 === l || l,
        f = a.areStatesEqual,
        p = void 0 === f ? Vr : f,
        h = a.areOwnPropsEqual,
        g = void 0 === h ? Ir : h,
        m = a.areStatePropsEqual,
        v = void 0 === m ? Ir : m,
        b = a.areMergedPropsEqual,
        y = void 0 === b ? Ir : b,
        w = ln(a, [
          "pure",
          "areStatesEqual",
          "areOwnPropsEqual",
          "areStatePropsEqual",
          "areMergedPropsEqual",
        ]),
        _ = jr(e, i, "mapStateToProps"),
        S = jr(t, s, "mapDispatchToProps"),
        x = jr(n, u, "mergeProps");
      return r(
        d,
        sn(
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
  var qr = Hr();
  Gt(), Gt();
  Gt();
  var zr,
    Gr,
    $r,
    Wr,
    Yr,
    Jr,
    Qr,
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
    mo,
    vo,
    bo,
    yo,
    wo,
    _o,
    So,
    xo,
    Po,
    ko,
    Do,
    Eo,
    To,
    Io,
    Co,
    Ao,
    Fo,
    Oo,
    Mo,
    Ro,
    No = !1;
  function Uo(e, t) {
    var n = e.length;
    e.push(t);
    e: for (;;) {
      var r = (n - 1) >>> 1,
        o = e[r];
      if (!(void 0 !== o && 0 < jo(o, t))) break e;
      (e[r] = t), (e[n] = o), (n = r);
    }
  }
  function Bo(e) {
    return void 0 === (e = e[0]) ? null : e;
  }
  function Lo(e) {
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
          if (void 0 !== a && 0 > jo(a, n))
            void 0 !== l && 0 > jo(l, a)
              ? ((e[r] = l), (e[s] = n), (r = s))
              : ((e[r] = a), (e[i] = n), (r = i));
          else {
            if (!(void 0 !== l && 0 > jo(l, n))) break e;
            (e[r] = l), (e[s] = n), (r = s);
          }
        }
      }
      return t;
    }
    return null;
  }
  function jo(e, t) {
    var n = e.sortIndex - t.sortIndex;
    return 0 !== n ? n : e.id - t.id;
  }
  function Vo(e) {
    for (var t = Bo(vo); null !== t; ) {
      if (null === t.callback) Lo(vo);
      else {
        if (!(t.startTime <= e)) break;
        Lo(vo), (t.sortIndex = t.expirationTime), Uo(mo, t);
      }
      t = Bo(vo);
    }
  }
  function Ho(e) {
    if (((xo = !1), Vo(e), !So))
      if (null !== Bo(mo)) (So = !0), Wr(qo);
      else {
        var t = Bo(vo);
        null !== t && Yr(Ho, t.startTime - e);
      }
  }
  function qo(e, t) {
    (So = !1), xo && ((xo = !1), Jr()), (_o = !0);
    var n = wo;
    try {
      for (
        Vo(t), yo = Bo(mo);
        null !== yo && (!(yo.expirationTime > t) || (e && !Qr()));

      ) {
        var r = yo.callback;
        if (null !== r) {
          (yo.callback = null), (wo = yo.priorityLevel);
          var o = r(yo.expirationTime <= t);
          (t = zr()),
            "function" == typeof o
              ? (yo.callback = o)
              : yo === Bo(mo) && Lo(mo),
            Vo(t);
        } else Lo(mo);
        yo = Bo(mo);
      }
      if (null !== yo) var i = !0;
      else {
        var a = Bo(vo);
        null !== a && Yr(Ho, a.startTime - t), (i = !1);
      }
      return i;
    } finally {
      (yo = null), (wo = n), (_o = !1);
    }
  }
  function zo(e) {
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
  function Go() {
    return (
      No ||
        ((No = !0),
        ($r = {}),
        "undefined" == typeof window || "function" != typeof MessageChannel
          ? ((Xr = null),
            (Zr = null),
            (eo = function () {
              if (null !== Xr)
                try {
                  var e = zr();
                  Xr(!0, e), (Xr = null);
                } catch (e) {
                  throw (setTimeout(eo, 0), e);
                }
            }),
            (to = Date.now()),
            (zr = function () {
              return Date.now() - to;
            }),
            ($r.unstable_now = zr),
            (Wr = function (e) {
              null !== Xr
                ? setTimeout(Wr, 0, e)
                : ((Xr = e), setTimeout(eo, 0));
            }),
            (Yr = function (e, t) {
              Zr = setTimeout(e, t);
            }),
            (Jr = function () {
              clearTimeout(Zr);
            }),
            (Qr = function () {
              return !1;
            }),
            (Gr = function () {}),
            (Kr = $r.unstable_forceFrameRate = Gr))
          : ((no = window.performance),
            (ro = window.Date),
            (oo = window.setTimeout),
            (io = window.clearTimeout),
            "undefined" != typeof console &&
              ((ao = window.cancelAnimationFrame),
              "function" != typeof window.requestAnimationFrame &&
                console.error(
                  "This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills"
                ),
              "function" != typeof ao &&
                console.error(
                  "This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills"
                )),
            "object" == typeof no && "function" == typeof no.now
              ? ((zr = function () {
                  return no.now();
                }),
                ($r.unstable_now = zr))
              : ((so = ro.now()),
                (zr = function () {
                  return ro.now() - so;
                }),
                ($r.unstable_now = zr)),
            (lo = !1),
            (uo = null),
            (co = -1),
            (fo = 5),
            (po = 0),
            (Qr = function () {
              return zr() >= po;
            }),
            (Kr = function () {}),
            (Gr = function (e) {
              0 > e || 125 < e
                ? console.error(
                    "forceFrameRate takes a positive int between 0 and 125, forcing framerates higher than 125 fps is not unsupported"
                  )
                : (fo = 0 < e ? Math.floor(1e3 / e) : 5);
            }),
            ($r.unstable_forceFrameRate = Gr),
            (ho = new MessageChannel()),
            (go = ho.port2),
            (ho.port1.onmessage = function () {
              if (null !== uo) {
                var e = zr();
                po = e + fo;
                try {
                  uo(!0, e) ? go.postMessage(null) : ((lo = !1), (uo = null));
                } catch (e) {
                  throw (go.postMessage(null), e);
                }
              } else lo = !1;
            }),
            (Wr = function (e) {
              (uo = e), lo || ((lo = !0), go.postMessage(null));
            }),
            (Yr = function (e, t) {
              co = oo(function () {
                e(zr());
              }, t);
            }),
            (Jr = function () {
              io(co), (co = -1);
            })),
        (mo = []),
        (vo = []),
        (bo = 1),
        (yo = null),
        (wo = 3),
        (_o = !1),
        (So = !1),
        (xo = !1),
        (Po = Kr),
        5,
        ($r.unstable_IdlePriority = 5),
        1,
        ($r.unstable_ImmediatePriority = 1),
        4,
        ($r.unstable_LowPriority = 4),
        3,
        ($r.unstable_NormalPriority = 3),
        null,
        ($r.unstable_Profiling = null),
        2,
        ($r.unstable_UserBlockingPriority = 2),
        (ko = function (e) {
          e.callback = null;
        }),
        ($r.unstable_cancelCallback = ko),
        (Do = function () {
          So || _o || ((So = !0), Wr(qo));
        }),
        ($r.unstable_continueExecution = Do),
        (Eo = function () {
          return wo;
        }),
        ($r.unstable_getCurrentPriorityLevel = Eo),
        (To = function () {
          return Bo(mo);
        }),
        ($r.unstable_getFirstCallbackNode = To),
        (Io = function (e) {
          switch (wo) {
            case 1:
            case 2:
            case 3:
              var t = 3;
              break;
            default:
              t = wo;
          }
          var n = wo;
          wo = t;
          try {
            return e();
          } finally {
            wo = n;
          }
        }),
        ($r.unstable_next = Io),
        (Co = function () {}),
        ($r.unstable_pauseExecution = Co),
        (Ao = Po),
        ($r.unstable_requestPaint = Ao),
        (Fo = function (e, t) {
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
          var n = wo;
          wo = e;
          try {
            return t();
          } finally {
            wo = n;
          }
        }),
        ($r.unstable_runWithPriority = Fo),
        (Oo = function (e, t, n) {
          var r = zr();
          if ("object" == typeof n && null !== n) {
            var o = n.delay;
            (o = "number" == typeof o && 0 < o ? r + o : r),
              (n = "number" == typeof n.timeout ? n.timeout : zo(e));
          } else (n = zo(e)), (o = r);
          return (
            (e = {
              id: bo++,
              callback: t,
              priorityLevel: e,
              startTime: o,
              expirationTime: (n = o + n),
              sortIndex: -1,
            }),
            o > r
              ? ((e.sortIndex = o),
                Uo(vo, e),
                null === Bo(mo) &&
                  e === Bo(vo) &&
                  (xo ? Jr() : (xo = !0), Yr(Ho, o - r)))
              : ((e.sortIndex = n), Uo(mo, e), So || _o || ((So = !0), Wr(qo))),
            e
          );
        }),
        ($r.unstable_scheduleCallback = Oo),
        (Mo = function () {
          var e = zr();
          Vo(e);
          var t = Bo(mo);
          return (
            (t !== yo &&
              null !== yo &&
              null !== t &&
              null !== t.callback &&
              t.startTime <= e &&
              t.expirationTime < yo.expirationTime) ||
            Qr()
          );
        }),
        ($r.unstable_shouldYield = Mo),
        (Ro = function (e) {
          var t = wo;
          return function () {
            var n = wo;
            wo = t;
            try {
              return e.apply(this, arguments);
            } finally {
              wo = n;
            }
          };
        }),
        ($r.unstable_wrapCallback = Ro)),
      $r
    );
  }
  var $o,
    Wo = !1;
  function Yo() {
    return Wo || ((Wo = !0), ($o = {}), ($o = Go())), $o;
  }
  var Jo,
    Qo,
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
    ki,
    Di,
    Ei,
    Ti,
    Ii,
    Ci,
    Ai,
    Fi,
    Oi,
    Mi,
    Ri,
    Ni,
    Ui,
    Bi,
    Li,
    ji,
    Vi,
    Hi,
    qi,
    zi,
    Gi,
    $i,
    Wi,
    Yi,
    Ji,
    Qi,
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
    Sa,
    xa,
    Pa,
    ka,
    Da,
    Ea,
    Ta,
    Ia,
    Ca,
    Aa,
    Fa,
    Oa,
    Ma,
    Ra,
    Na,
    Ua,
    Ba,
    La,
    ja,
    Va,
    Ha,
    qa,
    za,
    Ga,
    $a,
    Wa,
    Ya,
    Ja,
    Qa,
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
    Ss,
    xs,
    Ps,
    ks,
    Ds,
    Es,
    Ts,
    Is,
    Cs,
    As,
    Fs,
    Os,
    Ms,
    Rs,
    Ns,
    Us,
    Bs,
    Ls,
    js,
    Vs,
    Hs,
    qs,
    zs,
    Gs,
    $s,
    Ws,
    Ys,
    Js,
    Qs,
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
    kl,
    Dl,
    El,
    Tl,
    Il,
    Cl,
    Al,
    Fl,
    Ol,
    Ml,
    Rl,
    Nl,
    Ul,
    Bl,
    Ll,
    jl,
    Vl,
    Hl,
    ql,
    zl,
    Gl,
    $l,
    Wl,
    Yl,
    Jl,
    Ql,
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
    ku,
    Du,
    Eu,
    Tu,
    Iu,
    Cu,
    Au,
    Fu,
    Ou,
    Mu,
    Ru,
    Nu,
    Uu,
    Bu,
    Lu,
    ju,
    Vu,
    Hu,
    qu,
    zu,
    Gu = !1;
  function $u(e) {
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
  function Wu(e, t, n, r, o, i, a, s, l) {
    var u = Array.prototype.slice.call(arguments, 3);
    try {
      t.apply(n, u);
    } catch (e) {
      this.onError(e);
    }
  }
  function Yu(e, t, n, r, o, i, a, s, l) {
    (Xo = !1), (Zo = null), Wu.apply(ni, arguments);
  }
  function Ju(e, t, n) {
    var r = e.type || "unknown-event";
    (e.currentTarget = ii(n)),
      (function (e, t, n, r, o, i, a, s, l) {
        if ((Yu.apply(this, arguments), Xo)) {
          if (!Xo) throw Error($u(198));
          var u = Zo;
          (Xo = !1), (Zo = null), ei || ((ei = !0), (ti = u));
        }
      })(r, t, void 0, e),
      (e.currentTarget = null);
  }
  function Qu() {
    if (ai)
      for (var e in si) {
        var t = si[e],
          n = ai.indexOf(e);
        if (!(-1 < n)) throw Error($u(96, e));
        if (!li[n]) {
          if (!t.extractEvents) throw Error($u(97, e));
          for (var r in ((li[n] = t), (n = t.eventTypes))) {
            var o = void 0,
              i = n[r],
              a = t,
              s = r;
            if (ui.hasOwnProperty(s)) throw Error($u(99, s));
            ui[s] = i;
            var l = i.phasedRegistrationNames;
            if (l) {
              for (o in l) l.hasOwnProperty(o) && Ku(l[o], a, s);
              o = !0;
            } else
              i.registrationName
                ? (Ku(i.registrationName, a, s), (o = !0))
                : (o = !1);
            if (!o) throw Error($u(98, r, e));
          }
        }
      }
  }
  function Ku(e, t, n) {
    if (ci[e]) throw Error($u(100, e));
    (ci[e] = t), (di[e] = t.eventTypes[n].dependencies);
  }
  function Xu(e) {
    var t,
      n = !1;
    for (t in e)
      if (e.hasOwnProperty(t)) {
        var r = e[t];
        if (!si.hasOwnProperty(t) || si[t] !== r) {
          if (si[t]) throw Error($u(102, t));
          (si[t] = r), (n = !0);
        }
      }
    n && Qu();
  }
  function Zu(e) {
    if ((e = oi(e))) {
      if ("function" != typeof pi) throw Error($u(280));
      var t = e.stateNode;
      t && ((t = ri(t)), pi(e.stateNode, e.type, t));
    }
  }
  function ec(e) {
    hi ? (gi ? gi.push(e) : (gi = [e])) : (hi = e);
  }
  function tc() {
    if (hi) {
      var e = hi,
        t = gi;
      if (((gi = hi = null), Zu(e), t)) for (e = 0; e < t.length; e++) Zu(t[e]);
    }
  }
  function nc(e, t) {
    return e(t);
  }
  function rc(e, t, n, r, o) {
    return e(t, n, r, o);
  }
  function oc() {}
  function ic() {
    (null === hi && null === gi) || (oc(), tc());
  }
  function ac(e, t, n) {
    if (bi) return e(t, n);
    bi = !0;
    try {
      return mi(e, t, n);
    } finally {
      (bi = !1), ic();
    }
  }
  function sc(e, t, n, r, o, i) {
    (this.acceptsBooleans = 2 === t || 3 === t || 4 === t),
      (this.attributeName = r),
      (this.attributeNamespace = o),
      (this.mustUseProperty = n),
      (this.propertyName = e),
      (this.type = t),
      (this.sanitizeURL = i);
  }
  function lc(e) {
    return e[1].toUpperCase();
  }
  function uc(e, t, n, r) {
    var o = xi.hasOwnProperty(t) ? xi[t] : null;
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
              !!wi.call(Si, e) ||
              (!wi.call(_i, e) &&
                (yi.test(e) ? (Si[e] = !0) : ((_i[e] = !0), !1)))
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
  function cc(e) {
    return null === e || "object" != typeof e
      ? null
      : "function" == typeof (e = (Hi && e[Hi]) || e["@@iterator"])
      ? e
      : null;
  }
  function dc(e) {
    if (null == e) return null;
    if ("function" == typeof e) return e.displayName || e.name || null;
    if ("string" == typeof e) return e;
    switch (e) {
      case Ci:
        return "Fragment";
      case Ii:
        return "Portal";
      case Fi:
        return "Profiler";
      case Ai:
        return "StrictMode";
      case Ui:
        return "Suspense";
      case Bi:
        return "SuspenseList";
    }
    if ("object" == typeof e)
      switch (e.$$typeof) {
        case Mi:
          return "Context.Consumer";
        case Oi:
          return "Context.Provider";
        case Ni:
          var t = e.render;
          return (
            (t = t.displayName || t.name || ""),
            e.displayName || ("" !== t ? "ForwardRef(" + t + ")" : "ForwardRef")
          );
        case Li:
          return dc(e.type);
        case Vi:
          return dc(e.render);
        case ji:
          if ((e = 1 === e._status ? e._result : null)) return dc(e);
      }
    return null;
  }
  function fc(e) {
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
            i = dc(e.type);
          (n = null),
            r && (n = dc(r.type)),
            (r = i),
            (i = ""),
            o
              ? (i =
                  " (at " +
                  o.fileName.replace(Di, "") +
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
  function pc(e) {
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
  function hc(e) {
    var t = e.type;
    return (
      (e = e.nodeName) &&
      "input" === e.toLowerCase() &&
      ("checkbox" === t || "radio" === t)
    );
  }
  function gc(e) {
    e._valueTracker ||
      (e._valueTracker = (function (e) {
        var t = hc(e) ? "checked" : "value",
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
  function mc(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var n = t.getValue(),
      r = "";
    return (
      e && (r = hc(e) ? (e.checked ? "true" : "false") : e.value),
      (e = r) !== n && (t.setValue(e), !0)
    );
  }
  function vc(e, t) {
    var n = t.checked;
    return Ko({}, t, {
      defaultChecked: void 0,
      defaultValue: void 0,
      value: void 0,
      checked: null != n ? n : e._wrapperState.initialChecked,
    });
  }
  function bc(e, t) {
    var n = null == t.defaultValue ? "" : t.defaultValue,
      r = null != t.checked ? t.checked : t.defaultChecked;
    (n = pc(null != t.value ? t.value : n)),
      (e._wrapperState = {
        initialChecked: r,
        initialValue: n,
        controlled:
          "checkbox" === t.type || "radio" === t.type
            ? null != t.checked
            : null != t.value,
      });
  }
  function yc(e, t) {
    null != (t = t.checked) && uc(e, "checked", t, !1);
  }
  function wc(e, t) {
    yc(e, t);
    var n = pc(t.value),
      r = t.type;
    if (null != n)
      "number" === r
        ? ((0 === n && "" === e.value) || e.value != n) && (e.value = "" + n)
        : e.value !== "" + n && (e.value = "" + n);
    else if ("submit" === r || "reset" === r)
      return void e.removeAttribute("value");
    t.hasOwnProperty("value")
      ? Sc(e, t.type, n)
      : t.hasOwnProperty("defaultValue") && Sc(e, t.type, pc(t.defaultValue)),
      null == t.checked &&
        null != t.defaultChecked &&
        (e.defaultChecked = !!t.defaultChecked);
  }
  function _c(e, t, n) {
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
  function Sc(e, t, n) {
    ("number" === t && e.ownerDocument.activeElement === e) ||
      (null == n
        ? (e.defaultValue = "" + e._wrapperState.initialValue)
        : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
  }
  function xc(e, t) {
    return (
      (e = Ko({ children: void 0 }, t)),
      (t = (function (e) {
        var t = "";
        return (
          Qo.Children.forEach(e, function (e) {
            null != e && (t += e);
          }),
          t
        );
      })(t.children)) && (e.children = t),
      e
    );
  }
  function Pc(e, t, n, r) {
    if (((e = e.options), t)) {
      t = {};
      for (var o = 0; o < n.length; o++) t["$" + n[o]] = !0;
      for (n = 0; n < e.length; n++)
        (o = t.hasOwnProperty("$" + e[n].value)),
          e[n].selected !== o && (e[n].selected = o),
          o && r && (e[n].defaultSelected = !0);
    } else {
      for (n = "" + pc(n), t = null, o = 0; o < e.length; o++) {
        if (e[o].value === n)
          return (e[o].selected = !0), void (r && (e[o].defaultSelected = !0));
        null !== t || e[o].disabled || (t = e[o]);
      }
      null !== t && (t.selected = !0);
    }
  }
  function kc(e, t) {
    if (null != t.dangerouslySetInnerHTML) throw Error($u(91));
    return Ko({}, t, {
      value: void 0,
      defaultValue: void 0,
      children: "" + e._wrapperState.initialValue,
    });
  }
  function Dc(e, t) {
    var n = t.value;
    if (null == n) {
      if (((n = t.children), (t = t.defaultValue), null != n)) {
        if (null != t) throw Error($u(92));
        if (Array.isArray(n)) {
          if (!(1 >= n.length)) throw Error($u(93));
          n = n[0];
        }
        t = n;
      }
      null == t && (t = ""), (n = t);
    }
    e._wrapperState = { initialValue: pc(n) };
  }
  function Ec(e, t) {
    var n = pc(t.value),
      r = pc(t.defaultValue);
    null != n &&
      ((n = "" + n) !== e.value && (e.value = n),
      null == t.defaultValue && e.defaultValue !== n && (e.defaultValue = n)),
      null != r && (e.defaultValue = "" + r);
  }
  function Tc(e) {
    var t = e.textContent;
    t === e._wrapperState.initialValue &&
      "" !== t &&
      null !== t &&
      (e.value = t);
  }
  function Ic(e) {
    switch (e) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function Cc(e, t) {
    return null == e || "http://www.w3.org/1999/xhtml" === e
      ? Ic(t)
      : "http://www.w3.org/2000/svg" === e && "foreignObject" === t
      ? "http://www.w3.org/1999/xhtml"
      : e;
  }
  function Ac(e, t) {
    if (t) {
      var n = e.firstChild;
      if (n && n === e.lastChild && 3 === n.nodeType)
        return void (n.nodeValue = t);
    }
    e.textContent = t;
  }
  function Fc(e, t) {
    var n = {};
    return (
      (n[e.toLowerCase()] = t.toLowerCase()),
      (n["Webkit" + e] = "webkit" + t),
      (n["Moz" + e] = "moz" + t),
      n
    );
  }
  function Oc(e) {
    if (Wi[e]) return Wi[e];
    if (!$i[e]) return e;
    var t,
      n = $i[e];
    for (t in n) if (n.hasOwnProperty(t) && t in Yi) return (Wi[e] = n[t]);
    return e;
  }
  function Mc(e) {
    var t = ea.get(e);
    return void 0 === t && ((t = new Map()), ea.set(e, t)), t;
  }
  function Rc(e) {
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
  function Nc(e) {
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
  function Uc(e) {
    if (Rc(e) !== e) throw Error($u(188));
  }
  function Bc(e) {
    if (
      !(e = (function (e) {
        var t = e.alternate;
        if (!t) {
          if (null === (t = Rc(e))) throw Error($u(188));
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
              if (i === n) return Uc(o), e;
              if (i === r) return Uc(o), t;
              i = i.sibling;
            }
            throw Error($u(188));
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
              if (!a) throw Error($u(189));
            }
          }
          if (n.alternate !== r) throw Error($u(190));
        }
        if (3 !== n.tag) throw Error($u(188));
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
  function Lc(e, t) {
    if (null == t) throw Error($u(30));
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
  function jc(e, t, n) {
    Array.isArray(e) ? e.forEach(t, n) : e && t.call(n, e);
  }
  function Vc(e) {
    if (e) {
      var t = e._dispatchListeners,
        n = e._dispatchInstances;
      if (Array.isArray(t))
        for (var r = 0; r < t.length && !e.isPropagationStopped(); r++)
          Ju(e, t[r], n[r]);
      else t && Ju(e, t, n);
      (e._dispatchListeners = null),
        (e._dispatchInstances = null),
        e.isPersistent() || e.constructor.release(e);
    }
  }
  function Hc(e) {
    if ((null !== e && (ta = Lc(ta, e)), (e = ta), (ta = null), e)) {
      if ((jc(e, Vc), ta)) throw Error($u(95));
      if (ei) throw ((e = ti), (ei = !1), (ti = null), e);
    }
  }
  function qc(e) {
    return (
      (e = e.target || e.srcElement || window).correspondingUseElement &&
        (e = e.correspondingUseElement),
      3 === e.nodeType ? e.parentNode : e
    );
  }
  function zc(e) {
    if (!fi) return !1;
    var t = (e = "on" + e) in document;
    return (
      t ||
        ((t = document.createElement("div")).setAttribute(e, "return;"),
        (t = "function" == typeof t[e])),
      t
    );
  }
  function Gc(e) {
    (e.topLevelType = null),
      (e.nativeEvent = null),
      (e.targetInst = null),
      (e.ancestors.length = 0),
      10 > na.length && na.push(e);
  }
  function $c(e, t, n, r) {
    if (na.length) {
      var o = na.pop();
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
  function Wc(e) {
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
      (5 !== (t = n.tag) && 6 !== t) || e.ancestors.push(n), (n = Ed(r));
    } while (n);
    for (n = 0; n < e.ancestors.length; n++) {
      t = e.ancestors[n];
      var o = qc(e.nativeEvent);
      r = e.topLevelType;
      var i = e.nativeEvent,
        a = e.eventSystemFlags;
      0 === n && (a |= 64);
      for (var s = null, l = 0; l < li.length; l++) {
        var u = li[l];
        u && (u = u.extractEvents(r, t, i, o, a)) && (s = Lc(s, u));
      }
      Hc(s);
    }
  }
  function Yc(e, t, n) {
    if (!n.has(e)) {
      switch (e) {
        case "scroll":
          ad(t, "scroll", !0);
          break;
        case "focus":
        case "blur":
          ad(t, "focus", !0),
            ad(t, "blur", !0),
            n.set("blur", null),
            n.set("focus", null);
          break;
        case "cancel":
        case "close":
          zc(e) && ad(t, e, !0);
          break;
        case "invalid":
        case "submit":
        case "reset":
          break;
        default:
          -1 === Zi.indexOf(e) && id(e, t);
      }
      n.set(e, null);
    }
  }
  function Jc(e, t, n, r, o) {
    return {
      blockedOn: e,
      topLevelType: t,
      eventSystemFlags: 32 | n,
      nativeEvent: o,
      container: r,
    };
  }
  function Qc(e, t) {
    switch (e) {
      case "focus":
      case "blur":
        la = null;
        break;
      case "dragenter":
      case "dragleave":
        ua = null;
        break;
      case "mouseover":
      case "mouseout":
        ca = null;
        break;
      case "pointerover":
      case "pointerout":
        da.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        fa.delete(t.pointerId);
    }
  }
  function Kc(e, t, n, r, o, i) {
    return null === e || e.nativeEvent !== i
      ? ((e = Jc(t, n, r, o, i)),
        null !== t && null !== (t = Td(t)) && oa(t),
        e)
      : ((e.eventSystemFlags |= r), e);
  }
  function Xc(e) {
    var t = Ed(e.target);
    if (null !== t) {
      var n = Rc(t);
      if (null !== n)
        if (13 === (t = n.tag)) {
          if (null !== (t = Nc(n)))
            return (
              (e.blockedOn = t),
              void Yo().unstable_runWithPriority(e.priority, function () {
                ia(n);
              })
            );
        } else if (3 === t && n.stateNode.hydrate)
          return void (e.blockedOn =
            3 === n.tag ? n.stateNode.containerInfo : null);
    }
    e.blockedOn = null;
  }
  function Zc(e) {
    if (null !== e.blockedOn) return !1;
    var t = cd(e.topLevelType, e.eventSystemFlags, e.container, e.nativeEvent);
    if (null !== t) {
      var n = Td(t);
      return null !== n && oa(n), (e.blockedOn = t), !1;
    }
    return !0;
  }
  function ed(e, t, n) {
    Zc(e) && n.delete(t);
  }
  function td() {
    for (aa = !1; 0 < sa.length; ) {
      var e = sa[0];
      if (null !== e.blockedOn) {
        null !== (e = Td(e.blockedOn)) && ra(e);
        break;
      }
      var t = cd(
        e.topLevelType,
        e.eventSystemFlags,
        e.container,
        e.nativeEvent
      );
      null !== t ? (e.blockedOn = t) : sa.shift();
    }
    null !== la && Zc(la) && (la = null),
      null !== ua && Zc(ua) && (ua = null),
      null !== ca && Zc(ca) && (ca = null),
      da.forEach(ed),
      fa.forEach(ed);
  }
  function nd(e, t) {
    e.blockedOn === t &&
      ((e.blockedOn = null),
      aa ||
        ((aa = !0),
        Yo().unstable_scheduleCallback(Yo().unstable_NormalPriority, td)));
  }
  function rd(e) {
    function t(t) {
      return nd(t, e);
    }
    if (0 < sa.length) {
      nd(sa[0], e);
      for (var n = 1; n < sa.length; n++) {
        var r = sa[n];
        r.blockedOn === e && (r.blockedOn = null);
      }
    }
    for (
      null !== la && nd(la, e),
        null !== ua && nd(ua, e),
        null !== ca && nd(ca, e),
        da.forEach(t),
        fa.forEach(t),
        n = 0;
      n < pa.length;
      n++
    )
      (r = pa[n]).blockedOn === e && (r.blockedOn = null);
    for (; 0 < pa.length && null === (n = pa[0]).blockedOn; )
      Xc(n), null === n.blockedOn && pa.shift();
  }
  function od(e, t) {
    for (var n = 0; n < e.length; n += 2) {
      var r = e[n],
        o = e[n + 1],
        i = "on" + (o[0].toUpperCase() + o.slice(1));
      (i = {
        phasedRegistrationNames: { bubbled: i, captured: i + "Capture" },
        dependencies: [r],
        eventPriority: t,
      }),
        ba.set(r, t),
        va.set(r, i),
        (ma[o] = i);
    }
  }
  function id(e, t) {
    ad(t, e, !1);
  }
  function ad(e, t, n) {
    var r = ba.get(t);
    switch (void 0 === r ? 2 : r) {
      case 0:
        r = sd.bind(null, t, 1, e);
        break;
      case 1:
        r = ld.bind(null, t, 1, e);
        break;
      default:
        r = ud.bind(null, t, 1, e);
    }
    n ? e.addEventListener(t, r, !0) : e.addEventListener(t, r, !1);
  }
  function sd(e, t, n, r) {
    vi || oc();
    var o = ud,
      i = vi;
    vi = !0;
    try {
      rc(o, e, t, n, r);
    } finally {
      (vi = i) || ic();
    }
  }
  function ld(e, t, n, r) {
    xa(Sa, ud.bind(null, e, t, n, r));
  }
  function ud(e, t, n, r) {
    if (Pa)
      if (0 < sa.length && -1 < ha.indexOf(e))
        (e = Jc(null, e, t, n, r)), sa.push(e);
      else {
        var o = cd(e, t, n, r);
        if (null === o) Qc(e, r);
        else if (-1 < ha.indexOf(e)) (e = Jc(o, e, t, n, r)), sa.push(e);
        else if (
          !(function (e, t, n, r, o) {
            switch (t) {
              case "focus":
                return (la = Kc(la, e, t, n, r, o)), !0;
              case "dragenter":
                return (ua = Kc(ua, e, t, n, r, o)), !0;
              case "mouseover":
                return (ca = Kc(ca, e, t, n, r, o)), !0;
              case "pointerover":
                var i = o.pointerId;
                return da.set(i, Kc(da.get(i) || null, e, t, n, r, o)), !0;
              case "gotpointercapture":
                return (
                  (i = o.pointerId),
                  fa.set(i, Kc(fa.get(i) || null, e, t, n, r, o)),
                  !0
                );
            }
            return !1;
          })(o, e, t, n, r)
        ) {
          Qc(e, r), (e = $c(e, r, null, t));
          try {
            ac(Wc, e);
          } finally {
            Gc(e);
          }
        }
      }
  }
  function cd(e, t, n, r) {
    if (null !== (n = Ed((n = qc(r))))) {
      var o = Rc(n);
      if (null === o) n = null;
      else {
        var i = o.tag;
        if (13 === i) {
          if (null !== (n = Nc(o))) return n;
          n = null;
        } else if (3 === i) {
          if (o.stateNode.hydrate)
            return 3 === o.tag ? o.stateNode.containerInfo : null;
          n = null;
        } else o !== n && (n = null);
      }
    }
    e = $c(e, r, n, t);
    try {
      ac(Wc, e);
    } finally {
      Gc(e);
    }
    return null;
  }
  function dd(e, t, n) {
    return null == t || "boolean" == typeof t || "" === t
      ? ""
      : n || "number" != typeof t || 0 === t || (ka.hasOwnProperty(e) && ka[e])
      ? ("" + t).trim()
      : t + "px";
  }
  function fd(e, t) {
    for (var n in ((e = e.style), t))
      if (t.hasOwnProperty(n)) {
        var r = 0 === n.indexOf("--"),
          o = dd(n, t[n], r);
        "float" === n && (n = "cssFloat"), r ? e.setProperty(n, o) : (e[n] = o);
      }
  }
  function pd(e, t) {
    if (t) {
      if (Ea[e] && (null != t.children || null != t.dangerouslySetInnerHTML))
        throw Error($u(137, e, ""));
      if (null != t.dangerouslySetInnerHTML) {
        if (null != t.children) throw Error($u(60));
        if (
          "object" != typeof t.dangerouslySetInnerHTML ||
          !("__html" in t.dangerouslySetInnerHTML)
        )
          throw Error($u(61));
      }
      if (null != t.style && "object" != typeof t.style)
        throw Error($u(62, ""));
    }
  }
  function hd(e, t) {
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
  function gd(e, t) {
    var n = Mc(
      (e = 9 === e.nodeType || 11 === e.nodeType ? e : e.ownerDocument)
    );
    t = di[t];
    for (var r = 0; r < t.length; r++) Yc(t[r], e, n);
  }
  function md() {}
  function vd(e) {
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
  function bd(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function yd(e, t) {
    var n,
      r = bd(e);
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
      r = bd(r);
    }
  }
  function wd(e, t) {
    return (
      !(!e || !t) &&
      (e === t ||
        ((!e || 3 !== e.nodeType) &&
          (t && 3 === t.nodeType
            ? wd(e, t.parentNode)
            : "contains" in e
            ? e.contains(t)
            : !!e.compareDocumentPosition &&
              !!(16 & e.compareDocumentPosition(t)))))
    );
  }
  function _d() {
    for (var e = window, t = vd(); t instanceof e.HTMLIFrameElement; ) {
      try {
        var n = "string" == typeof t.contentWindow.location.href;
      } catch (e) {
        n = !1;
      }
      if (!n) break;
      t = vd((e = t.contentWindow).document);
    }
    return t;
  }
  function Sd(e) {
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
  function xd(e, t) {
    switch (e) {
      case "button":
      case "input":
      case "select":
      case "textarea":
        return !!t.autoFocus;
    }
    return !1;
  }
  function Pd(e, t) {
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
  function kd(e) {
    for (; null != e; e = e.nextSibling) {
      var t = e.nodeType;
      if (1 === t || 3 === t) break;
    }
    return e;
  }
  function Dd(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
      if (8 === e.nodeType) {
        var n = e.data;
        if (n === Ia || n === Fa || n === Aa) {
          if (0 === t) return e;
          t--;
        } else n === Ca && t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  function Ed(e) {
    var t = e[Ba];
    if (t) return t;
    for (var n = e.parentNode; n; ) {
      if ((t = n[ja] || n[Ba])) {
        if (
          ((n = t.alternate),
          null !== t.child || (null !== n && null !== n.child))
        )
          for (e = Dd(e); null !== e; ) {
            if ((n = e[Ba])) return n;
            e = Dd(e);
          }
        return t;
      }
      n = (e = n).parentNode;
    }
    return null;
  }
  function Td(e) {
    return !(e = e[Ba] || e[ja]) ||
      (5 !== e.tag && 6 !== e.tag && 13 !== e.tag && 3 !== e.tag)
      ? null
      : e;
  }
  function Id(e) {
    if (5 === e.tag || 6 === e.tag) return e.stateNode;
    throw Error($u(33));
  }
  function Cd(e) {
    return e[La] || null;
  }
  function Ad(e) {
    do {
      e = e.return;
    } while (e && 5 !== e.tag);
    return e || null;
  }
  function Fd(e, t) {
    var n = e.stateNode;
    if (!n) return null;
    var r = ri(n);
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
    if (n && "function" != typeof n) throw Error($u(231, t, typeof n));
    return n;
  }
  function Od(e, t, n) {
    (t = Fd(e, n.dispatchConfig.phasedRegistrationNames[t])) &&
      ((n._dispatchListeners = Lc(n._dispatchListeners, t)),
      (n._dispatchInstances = Lc(n._dispatchInstances, e)));
  }
  function Md(e) {
    if (e && e.dispatchConfig.phasedRegistrationNames) {
      for (var t = e._targetInst, n = []; t; ) n.push(t), (t = Ad(t));
      for (t = n.length; 0 < t--; ) Od(n[t], "captured", e);
      for (t = 0; t < n.length; t++) Od(n[t], "bubbled", e);
    }
  }
  function Rd(e, t, n) {
    e &&
      n &&
      n.dispatchConfig.registrationName &&
      (t = Fd(e, n.dispatchConfig.registrationName)) &&
      ((n._dispatchListeners = Lc(n._dispatchListeners, t)),
      (n._dispatchInstances = Lc(n._dispatchInstances, e)));
  }
  function Nd(e) {
    e && e.dispatchConfig.registrationName && Rd(e._targetInst, null, e);
  }
  function Ud(e) {
    jc(e, Md);
  }
  function Bd() {
    if (qa) return qa;
    var e,
      t,
      n = Ha,
      r = n.length,
      o = "value" in Va ? Va.value : Va.textContent,
      i = o.length;
    for (e = 0; e < r && n[e] === o[e]; e++);
    var a = r - e;
    for (t = 1; t <= a && n[r - t] === o[i - t]; t++);
    return (qa = o.slice(e, 1 < t ? 1 - t : void 0));
  }
  function Ld() {
    return !0;
  }
  function jd() {
    return !1;
  }
  function Vd(e, t, n, r) {
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
        ? Ld
        : jd),
      (this.isPropagationStopped = jd),
      this
    );
  }
  function Hd(e, t, n, r) {
    if (this.eventPool.length) {
      var o = this.eventPool.pop();
      return this.call(o, e, t, n, r), o;
    }
    return new this(e, t, n, r);
  }
  function qd(e) {
    if (!(e instanceof this)) throw Error($u(279));
    e.destructor(), 10 > this.eventPool.length && this.eventPool.push(e);
  }
  function zd(e) {
    (e.eventPool = []), (e.getPooled = Hd), (e.release = qd);
  }
  function Gd(e, t) {
    switch (e) {
      case "keyup":
        return -1 !== $a.indexOf(t.keyCode);
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
  function $d(e) {
    return "object" == typeof (e = e.detail) && "data" in e ? e.data : null;
  }
  function Wd(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return "input" === t ? !!ns[e.type] : "textarea" === t;
  }
  function Yd(e, t, n) {
    return (
      ((e = Vd.getPooled(rs.change, e, t, n)).type = "change"), ec(n), Ud(e), e
    );
  }
  function Jd(e) {
    Hc(e);
  }
  function Qd(e) {
    if (mc(Id(e))) return e;
  }
  function Kd(e, t) {
    if ("change" === e) return t;
  }
  function Xd() {
    os && (os.detachEvent("onpropertychange", Zd), (is = os = null));
  }
  function Zd(e) {
    if ("value" === e.propertyName && Qd(is))
      if (((e = Yd(is, e, qc(e))), vi)) Hc(e);
      else {
        vi = !0;
        try {
          nc(Jd, e);
        } finally {
          (vi = !1), ic();
        }
      }
  }
  function ef(e, t, n) {
    "focus" === e
      ? (Xd(), (is = n), (os = t).attachEvent("onpropertychange", Zd))
      : "blur" === e && Xd();
  }
  function tf(e) {
    if ("selectionchange" === e || "keyup" === e || "keydown" === e)
      return Qd(is);
  }
  function nf(e, t) {
    if ("click" === e) return Qd(t);
  }
  function rf(e, t) {
    if ("input" === e || "change" === e) return Qd(t);
  }
  function of(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : !!(e = us[e]) && !!t[e];
  }
  function af() {
    return of;
  }
  function sf(e, t) {
    return (e === t && (0 !== e || 1 / e == 1 / t)) || (e != e && t != t);
  }
  function lf(e, t) {
    if (bs(e, t)) return !0;
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
      if (!ys.call(t, n[r]) || !bs(e[n[r]], t[n[r]])) return !1;
    return !0;
  }
  function uf(e, t) {
    var n =
      t.window === t ? t.document : 9 === t.nodeType ? t : t.ownerDocument;
    return ks || null == Ss || Ss !== vd(n)
      ? null
      : ("selectionStart" in (n = Ss) && Sd(n)
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
        Ps && lf(Ps, n)
          ? null
          : ((Ps = n),
            ((e = Vd.getPooled(_s.select, xs, e, t)).type = "select"),
            (e.target = Ss),
            Ud(e),
            e));
  }
  function cf(e) {
    var t = e.keyCode;
    return (
      "charCode" in e
        ? 0 === (e = e.charCode) && 13 === t && (e = 13)
        : (e = t),
      10 === e && (e = 13),
      32 <= e || 13 === e ? e : 0
    );
  }
  function df(e) {
    0 > Ls || ((e.current = Bs[Ls]), (Bs[Ls] = null), Ls--);
  }
  function ff(e, t) {
    Ls++, (Bs[Ls] = e.current), (e.current = t);
  }
  function pf(e, t) {
    var n = e.type.contextTypes;
    if (!n) return js;
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
  function hf(e) {
    return null != (e = e.childContextTypes);
  }
  function gf() {
    df(Hs), df(Vs);
  }
  function mf(e, t, n) {
    if (Vs.current !== js) throw Error($u(168));
    ff(Vs, t), ff(Hs, n);
  }
  function vf(e, t, n) {
    var r = e.stateNode;
    if (((e = t.childContextTypes), "function" != typeof r.getChildContext))
      return n;
    for (var o in (r = r.getChildContext()))
      if (!(o in e)) throw Error($u(108, dc(t) || "Unknown", o));
    return Ko({}, n, {}, r);
  }
  function bf(e) {
    return (
      (e =
        ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) ||
        js),
      (qs = Vs.current),
      ff(Vs, e),
      ff(Hs, Hs.current),
      !0
    );
  }
  function yf(e, t, n) {
    var r = e.stateNode;
    if (!r) throw Error($u(169));
    n
      ? ((e = vf(e, t, qs)),
        (r.__reactInternalMemoizedMergedChildContext = e),
        df(Hs),
        df(Vs),
        ff(Vs, e))
      : df(Hs),
      ff(Hs, n);
  }
  function wf() {
    switch (Js()) {
      case Qs:
        return 99;
      case Ks:
        return 98;
      case Xs:
        return 97;
      case Zs:
        return 96;
      case el:
        return 95;
      default:
        throw Error($u(332));
    }
  }
  function _f(e) {
    switch (e) {
      case 99:
        return Qs;
      case 98:
        return Ks;
      case 97:
        return Xs;
      case 96:
        return Zs;
      case 95:
        return el;
      default:
        throw Error($u(332));
    }
  }
  function Sf(e, t) {
    return (e = _f(e)), zs(e, t);
  }
  function xf(e, t, n) {
    return (e = _f(e)), Gs(e, t, n);
  }
  function Pf(e) {
    return null === ol ? ((ol = [e]), (il = Gs(Qs, Df))) : ol.push(e), tl;
  }
  function kf() {
    if (null !== il) {
      var e = il;
      (il = null), $s(e);
    }
    Df();
  }
  function Df() {
    if (!al && null !== ol) {
      al = !0;
      var e = 0;
      try {
        var t = ol;
        Sf(99, function () {
          for (; e < t.length; e++) {
            var n = t[e];
            do {
              n = n(!0);
            } while (null !== n);
          }
        }),
          (ol = null);
      } catch (t) {
        throw (null !== ol && (ol = ol.slice(e + 1)), Gs(Qs, kf), t);
      } finally {
        al = !1;
      }
    }
  }
  function Ef(e, t, n) {
    return 1073741821 - (1 + (((1073741821 - e + t / 10) / (n /= 10)) | 0)) * n;
  }
  function Tf(e, t) {
    if (e && e.defaultProps)
      for (var n in ((t = Ko({}, t)), (e = e.defaultProps)))
        void 0 === t[n] && (t[n] = e[n]);
    return t;
  }
  function If() {
    fl = dl = cl = null;
  }
  function Cf(e) {
    var t = ul.current;
    df(ul), (e.type._context._currentValue = t);
  }
  function Af(e, t) {
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
  function Ff(e, t) {
    (cl = e),
      (fl = dl = null),
      null !== (e = e.dependencies) &&
        null !== e.firstContext &&
        (e.expirationTime >= t && (jl = !0), (e.firstContext = null));
  }
  function Of(e, t) {
    if (fl !== e && !1 !== t && 0 !== t)
      if (
        (("number" == typeof t && 1073741823 !== t) ||
          ((fl = e), (t = 1073741823)),
        (t = { context: e, observedBits: t, next: null }),
        null === dl)
      ) {
        if (null === cl) throw Error($u(308));
        (dl = t),
          (cl.dependencies = {
            expirationTime: 0,
            firstContext: t,
            responders: null,
          });
      } else dl = dl.next = t;
    return e._currentValue;
  }
  function Mf(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      baseQueue: null,
      shared: { pending: null },
      effects: null,
    };
  }
  function Rf(e, t) {
    (e = e.updateQueue),
      t.updateQueue === e &&
        (t.updateQueue = {
          baseState: e.baseState,
          baseQueue: e.baseQueue,
          shared: e.shared,
          effects: e.effects,
        });
  }
  function Nf(e, t) {
    return ((e = {
      expirationTime: e,
      suspenseConfig: t,
      tag: 0,
      payload: null,
      callback: null,
      next: null,
    }).next = e);
  }
  function Uf(e, t) {
    if (null !== (e = e.updateQueue)) {
      var n = (e = e.shared).pending;
      null === n ? (t.next = t) : ((t.next = n.next), (n.next = t)),
        (e.pending = t);
    }
  }
  function Bf(e, t) {
    var n = e.alternate;
    null !== n && Rf(n, e),
      null === (n = (e = e.updateQueue).baseQueue)
        ? ((e.baseQueue = t.next = t), (t.next = t))
        : ((t.next = n.next), (n.next = t));
  }
  function Lf(e, t, n, r) {
    var o = e.updateQueue;
    pl = !1;
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
              Dh(a, p.suspenseConfig);
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
                  l = Ko({}, l, a);
                  break e;
                case 2:
                  pl = !0;
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
        Eh(u),
        (e.expirationTime = u),
        (e.memoizedState = l);
    }
  }
  function jf(e, t, n) {
    if (((e = t.effects), (t.effects = null), null !== e))
      for (t = 0; t < e.length; t++) {
        var r = e[t],
          o = r.callback;
        if (null !== o) {
          if (((r.callback = null), (r = o), (o = n), "function" != typeof r))
            throw Error($u(191, r));
          r.call(o);
        }
      }
  }
  function Vf(e, t, n, r) {
    (n = null == (n = n(r, (t = e.memoizedState))) ? t : Ko({}, t, n)),
      (e.memoizedState = n),
      0 === e.expirationTime && (e.updateQueue.baseState = n);
  }
  function Hf(e, t, n, r, o, i, a) {
    return "function" == typeof (e = e.stateNode).shouldComponentUpdate
      ? e.shouldComponentUpdate(r, i, a)
      : !t.prototype ||
          !t.prototype.isPureReactComponent ||
          !lf(n, r) ||
          !lf(o, i);
  }
  function qf(e, t, n) {
    var r = !1,
      o = js,
      i = t.contextType;
    return (
      "object" == typeof i && null !== i
        ? (i = Of(i))
        : ((o = hf(t) ? qs : Vs.current),
          (i = (r = null != (r = t.contextTypes)) ? pf(e, o) : js)),
      (t = new t(n, i)),
      (e.memoizedState =
        null !== t.state && void 0 !== t.state ? t.state : null),
      (t.updater = ml),
      (e.stateNode = t),
      (t._reactInternalFiber = e),
      r &&
        (((e = e.stateNode).__reactInternalMemoizedUnmaskedChildContext = o),
        (e.__reactInternalMemoizedMaskedChildContext = i)),
      t
    );
  }
  function zf(e, t, n, r) {
    (e = t.state),
      "function" == typeof t.componentWillReceiveProps &&
        t.componentWillReceiveProps(n, r),
      "function" == typeof t.UNSAFE_componentWillReceiveProps &&
        t.UNSAFE_componentWillReceiveProps(n, r),
      t.state !== e && ml.enqueueReplaceState(t, t.state, null);
  }
  function Gf(e, t, n, r) {
    var o = e.stateNode;
    (o.props = n), (o.state = e.memoizedState), (o.refs = gl), Mf(e);
    var i = t.contextType;
    "object" == typeof i && null !== i
      ? (o.context = Of(i))
      : ((i = hf(t) ? qs : Vs.current), (o.context = pf(e, i))),
      Lf(e, n, o, r),
      (o.state = e.memoizedState),
      "function" == typeof (i = t.getDerivedStateFromProps) &&
        (Vf(e, t, i, n), (o.state = e.memoizedState)),
      "function" == typeof t.getDerivedStateFromProps ||
        "function" == typeof o.getSnapshotBeforeUpdate ||
        ("function" != typeof o.UNSAFE_componentWillMount &&
          "function" != typeof o.componentWillMount) ||
        ((t = o.state),
        "function" == typeof o.componentWillMount && o.componentWillMount(),
        "function" == typeof o.UNSAFE_componentWillMount &&
          o.UNSAFE_componentWillMount(),
        t !== o.state && ml.enqueueReplaceState(o, o.state, null),
        Lf(e, n, o, r),
        (o.state = e.memoizedState)),
      "function" == typeof o.componentDidMount && (e.effectTag |= 4);
  }
  function $f(e, t, n) {
    if (
      null !== (e = n.ref) &&
      "function" != typeof e &&
      "object" != typeof e
    ) {
      if (n._owner) {
        if ((n = n._owner)) {
          if (1 !== n.tag) throw Error($u(309));
          var r = n.stateNode;
        }
        if (!r) throw Error($u(147, e));
        var o = "" + e;
        return null !== t &&
          null !== t.ref &&
          "function" == typeof t.ref &&
          t.ref._stringRef === o
          ? t.ref
          : (((t = function (e) {
              var t = r.refs;
              t === gl && (t = r.refs = {}),
                null === e ? delete t[o] : (t[o] = e);
            })._stringRef = o),
            t);
      }
      if ("string" != typeof e) throw Error($u(284));
      if (!n._owner) throw Error($u(290, e));
    }
    return e;
  }
  function Wf(e, t) {
    if ("textarea" !== e.type)
      throw Error(
        $u(
          31,
          "[object Object]" === Object.prototype.toString.call(t)
            ? "object with keys {" + Object.keys(t).join(", ") + "}"
            : t,
          ""
        )
      );
  }
  function Yf(e) {
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
      return ((e = Gh(e, t)).index = 0), (e.sibling = null), e;
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
        ? (((t = Yh(n, e.mode, r)).return = e), t)
        : (((t = o(t, n)).return = e), t);
    }
    function l(e, t, n, r) {
      return null !== t && t.elementType === n.type
        ? (((r = o(t, n.props)).ref = $f(e, t, n)), (r.return = e), r)
        : (((r = $h(n.type, n.key, n.props, null, e.mode, r)).ref = $f(
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
        ? (((t = Jh(n, e.mode, r)).return = e), t)
        : (((t = o(t, n.children || [])).return = e), t);
    }
    function c(e, t, n, r, i) {
      return null === t || 7 !== t.tag
        ? (((t = Wh(n, e.mode, r, i)).return = e), t)
        : (((t = o(t, n)).return = e), t);
    }
    function d(e, t, n) {
      if ("string" == typeof t || "number" == typeof t)
        return ((t = Yh("" + t, e.mode, n)).return = e), t;
      if ("object" == typeof t && null !== t) {
        switch (t.$$typeof) {
          case Ti:
            return (
              ((n = $h(t.type, t.key, t.props, null, e.mode, n)).ref = $f(
                e,
                null,
                t
              )),
              (n.return = e),
              n
            );
          case Ii:
            return ((t = Jh(t, e.mode, n)).return = e), t;
        }
        if (vl(t) || cc(t)) return ((t = Wh(t, e.mode, n, null)).return = e), t;
        Wf(e, t);
      }
      return null;
    }
    function f(e, t, n, r) {
      var o = null !== t ? t.key : null;
      if ("string" == typeof n || "number" == typeof n)
        return null !== o ? null : s(e, t, "" + n, r);
      if ("object" == typeof n && null !== n) {
        switch (n.$$typeof) {
          case Ti:
            return n.key === o
              ? n.type === Ci
                ? c(e, t, n.props.children, r, o)
                : l(e, t, n, r)
              : null;
          case Ii:
            return n.key === o ? u(e, t, n, r) : null;
        }
        if (vl(n) || cc(n)) return null !== o ? null : c(e, t, n, r, null);
        Wf(e, n);
      }
      return null;
    }
    function p(e, t, n, r, o) {
      if ("string" == typeof r || "number" == typeof r)
        return s(t, (e = e.get(n) || null), "" + r, o);
      if ("object" == typeof r && null !== r) {
        switch (r.$$typeof) {
          case Ti:
            return (
              (e = e.get(null === r.key ? n : r.key) || null),
              r.type === Ci
                ? c(t, e, r.props.children, o, r.key)
                : l(t, e, r, o)
            );
          case Ii:
            return u(t, (e = e.get(null === r.key ? n : r.key) || null), r, o);
        }
        if (vl(r) || cc(r)) return c(t, (e = e.get(n) || null), r, o, null);
        Wf(t, r);
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
      var u = cc(s);
      if ("function" != typeof u) throw Error($u(150));
      if (null == (s = u.call(s))) throw Error($u(151));
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
        "object" == typeof i && null !== i && i.type === Ci && null === i.key;
      l && (i = i.props.children);
      var u = "object" == typeof i && null !== i;
      if (u)
        switch (i.$$typeof) {
          case Ti:
            e: {
              for (u = i.key, l = r; null !== l; ) {
                if (l.key === u) {
                  switch (l.tag) {
                    case 7:
                      if (i.type === Ci) {
                        n(e, l.sibling),
                          ((r = o(l, i.props.children)).return = e),
                          (e = r);
                        break e;
                      }
                      break;
                    default:
                      if (l.elementType === i.type) {
                        n(e, l.sibling),
                          ((r = o(l, i.props)).ref = $f(e, l, i)),
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
              i.type === Ci
                ? (((r = Wh(i.props.children, e.mode, s, i.key)).return = e),
                  (e = r))
                : (((s = $h(i.type, i.key, i.props, null, e.mode, s)).ref = $f(
                    e,
                    r,
                    i
                  )),
                  (s.return = e),
                  (e = s));
            }
            return a(e);
          case Ii:
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
              ((r = Jh(i, e.mode, s)).return = e), (e = r);
            }
            return a(e);
        }
      if ("string" == typeof i || "number" == typeof i)
        return (
          (i = "" + i),
          null !== r && 6 === r.tag
            ? (n(e, r.sibling), ((r = o(r, i)).return = e), (e = r))
            : (n(e, r), ((r = Yh(i, e.mode, s)).return = e), (e = r)),
          a(e)
        );
      if (vl(i)) return h(e, r, i, s);
      if (cc(i)) return g(e, r, i, s);
      if ((u && Wf(e, i), void 0 === i && !l))
        switch (e.tag) {
          case 1:
          case 0:
            throw (
              ((e = e.type),
              Error($u(152, e.displayName || e.name || "Component")))
            );
        }
      return n(e, r);
    };
  }
  function Jf(e) {
    if (e === wl) throw Error($u(174));
    return e;
  }
  function Qf(e, t) {
    switch ((ff(xl, t), ff(Sl, e), ff(_l, wl), (e = t.nodeType))) {
      case 9:
      case 11:
        t = (t = t.documentElement) ? t.namespaceURI : Cc(null, "");
        break;
      default:
        t = Cc(
          (t = (e = 8 === e ? t.parentNode : t).namespaceURI || null),
          (e = e.tagName)
        );
    }
    df(_l), ff(_l, t);
  }
  function Kf() {
    df(_l), df(Sl), df(xl);
  }
  function Xf(e) {
    Jf(xl.current);
    var t = Jf(_l.current),
      n = Cc(t, e.type);
    t !== n && (ff(Sl, e), ff(_l, n));
  }
  function Zf(e) {
    Sl.current === e && (df(_l), df(Sl));
  }
  function ep(e) {
    for (var t = e; null !== t; ) {
      if (13 === t.tag) {
        var n = t.memoizedState;
        if (
          null !== n &&
          (null === (n = n.dehydrated) || n.data === Aa || n.data === Fa)
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
  function tp(e, t) {
    return { responder: e, props: t };
  }
  function np() {
    throw Error($u(321));
  }
  function rp(e, t) {
    if (null === t) return !1;
    for (var n = 0; n < t.length && n < e.length; n++)
      if (!bs(e[n], t[n])) return !1;
    return !0;
  }
  function op(e, t, n, r, o, i) {
    if (
      ((El = i),
      (Tl = t),
      (t.memoizedState = null),
      (t.updateQueue = null),
      (t.expirationTime = 0),
      (kl.current = null === e || null === e.memoizedState ? Ol : Ml),
      (e = n(r, o)),
      t.expirationTime === El)
    ) {
      i = 0;
      do {
        if (((t.expirationTime = 0), !(25 > i))) throw Error($u(301));
        (i += 1),
          (Cl = Il = null),
          (t.updateQueue = null),
          (kl.current = Rl),
          (e = n(r, o));
      } while (t.expirationTime === El);
    }
    if (
      ((kl.current = Fl),
      (t = null !== Il && null !== Il.next),
      (El = 0),
      (Cl = Il = Tl = null),
      (Al = !1),
      t)
    )
      throw Error($u(300));
    return e;
  }
  function ip() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null,
    };
    return null === Cl ? (Tl.memoizedState = Cl = e) : (Cl = Cl.next = e), Cl;
  }
  function ap() {
    if (null === Il) {
      var e = Tl.alternate;
      e = null !== e ? e.memoizedState : null;
    } else e = Il.next;
    var t = null === Cl ? Tl.memoizedState : Cl.next;
    if (null !== t) (Cl = t), (Il = e);
    else {
      if (null === e) throw Error($u(310));
      (e = {
        memoizedState: (Il = e).memoizedState,
        baseState: Il.baseState,
        baseQueue: Il.baseQueue,
        queue: Il.queue,
        next: null,
      }),
        null === Cl ? (Tl.memoizedState = Cl = e) : (Cl = Cl.next = e);
    }
    return Cl;
  }
  function sp(e, t) {
    return "function" == typeof t ? t(e) : t;
  }
  function lp(e) {
    var t = ap(),
      n = t.queue;
    if (null === n) throw Error($u(311));
    n.lastRenderedReducer = e;
    var r = Il,
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
        if (u < El) {
          var c = {
            expirationTime: l.expirationTime,
            suspenseConfig: l.suspenseConfig,
            action: l.action,
            eagerReducer: l.eagerReducer,
            eagerState: l.eagerState,
            next: null,
          };
          null === s ? ((a = s = c), (i = r)) : (s = s.next = c),
            u > Tl.expirationTime && ((Tl.expirationTime = u), Eh(u));
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
            Dh(u, l.suspenseConfig),
            (r = l.eagerReducer === e ? l.eagerState : e(r, l.action));
        l = l.next;
      } while (null !== l && l !== o);
      null === s ? (i = r) : (s.next = a),
        bs(r, t.memoizedState) || (jl = !0),
        (t.memoizedState = r),
        (t.baseState = i),
        (t.baseQueue = s),
        (n.lastRenderedState = r);
    }
    return [t.memoizedState, n.dispatch];
  }
  function up(e) {
    var t = ap(),
      n = t.queue;
    if (null === n) throw Error($u(311));
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
      bs(i, t.memoizedState) || (jl = !0),
        (t.memoizedState = i),
        null === t.baseQueue && (t.baseState = i),
        (n.lastRenderedState = i);
    }
    return [i, r];
  }
  function cp(e) {
    var t = ip();
    return (
      "function" == typeof e && (e = e()),
      (t.memoizedState = t.baseState = e),
      (e = (e = t.queue =
        {
          pending: null,
          dispatch: null,
          lastRenderedReducer: sp,
          lastRenderedState: e,
        }).dispatch =
        kp.bind(null, Tl, e)),
      [t.memoizedState, e]
    );
  }
  function dp(e, t, n, r) {
    return (
      (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
      null === (t = Tl.updateQueue)
        ? ((t = { lastEffect: null }),
          (Tl.updateQueue = t),
          (t.lastEffect = e.next = e))
        : null === (n = t.lastEffect)
        ? (t.lastEffect = e.next = e)
        : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e)),
      e
    );
  }
  function fp() {
    return ap().memoizedState;
  }
  function pp(e, t, n, r) {
    var o = ip();
    (Tl.effectTag |= e),
      (o.memoizedState = dp(1 | t, n, void 0, void 0 === r ? null : r));
  }
  function hp(e, t, n, r) {
    var o = ap();
    r = void 0 === r ? null : r;
    var i = void 0;
    if (null !== Il) {
      var a = Il.memoizedState;
      if (((i = a.destroy), null !== r && rp(r, a.deps)))
        return void dp(t, n, i, r);
    }
    (Tl.effectTag |= e), (o.memoizedState = dp(1 | t, n, i, r));
  }
  function gp(e, t) {
    return pp(516, 4, e, t);
  }
  function mp(e, t) {
    return hp(516, 4, e, t);
  }
  function vp(e, t) {
    return hp(4, 2, e, t);
  }
  function bp(e, t) {
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
  function yp(e, t, n) {
    return (
      (n = null != n ? n.concat([e]) : null), hp(4, 2, bp.bind(null, t, e), n)
    );
  }
  function wp() {}
  function _p(e, t) {
    return (ip().memoizedState = [e, void 0 === t ? null : t]), e;
  }
  function Sp(e, t) {
    var n = ap();
    t = void 0 === t ? null : t;
    var r = n.memoizedState;
    return null !== r && null !== t && rp(t, r[1])
      ? r[0]
      : ((n.memoizedState = [e, t]), e);
  }
  function xp(e, t) {
    var n = ap();
    t = void 0 === t ? null : t;
    var r = n.memoizedState;
    return null !== r && null !== t && rp(t, r[1])
      ? r[0]
      : ((e = e()), (n.memoizedState = [e, t]), e);
  }
  function Pp(e, t, n) {
    var r = wf();
    Sf(98 > r ? 98 : r, function () {
      e(!0);
    }),
      Sf(97 < r ? 97 : r, function () {
        var r = Dl.suspense;
        Dl.suspense = void 0 === t ? null : t;
        try {
          e(!1), n();
        } finally {
          Dl.suspense = r;
        }
      });
  }
  function kp(e, t, n) {
    var r = ph(),
      o = hl.suspense;
    o = {
      expirationTime: (r = hh(r, e, o)),
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
      e === Tl || (null !== i && i === Tl))
    )
      (Al = !0), (o.expirationTime = El), (Tl.expirationTime = El);
    else {
      if (
        0 === e.expirationTime &&
        (null === i || 0 === i.expirationTime) &&
        null !== (i = t.lastRenderedReducer)
      )
        try {
          var a = t.lastRenderedState,
            s = i(a, n);
          if (((o.eagerReducer = i), (o.eagerState = s), bs(s, a))) return;
        } catch (e) {}
      gh(e, r);
    }
  }
  function Dp(e, t) {
    var n = qh(5, null, null, 0);
    (n.elementType = "DELETED"),
      (n.type = "DELETED"),
      (n.stateNode = t),
      (n.return = e),
      (n.effectTag = 8),
      null !== e.lastEffect
        ? ((e.lastEffect.nextEffect = n), (e.lastEffect = n))
        : (e.firstEffect = e.lastEffect = n);
  }
  function Ep(e, t) {
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
  function Tp(e) {
    if (Bl) {
      var t = Ul;
      if (t) {
        var n = t;
        if (!Ep(e, t)) {
          if (!(t = kd(n.nextSibling)) || !Ep(e, t))
            return (
              (e.effectTag = (-1025 & e.effectTag) | 2),
              (Bl = !1),
              void (Nl = e)
            );
          Dp(Nl, n);
        }
        (Nl = e), (Ul = kd(t.firstChild));
      } else (e.effectTag = (-1025 & e.effectTag) | 2), (Bl = !1), (Nl = e);
    }
  }
  function Ip(e) {
    for (
      e = e.return;
      null !== e && 5 !== e.tag && 3 !== e.tag && 13 !== e.tag;

    )
      e = e.return;
    Nl = e;
  }
  function Cp(e) {
    if (e !== Nl) return !1;
    if (!Bl) return Ip(e), (Bl = !0), !1;
    var t = e.type;
    if (
      5 !== e.tag ||
      ("head" !== t && "body" !== t && !Pd(t, e.memoizedProps))
    )
      for (t = Ul; t; ) Dp(e, t), (t = kd(t.nextSibling));
    if ((Ip(e), 13 === e.tag)) {
      if (!(e = null !== (e = e.memoizedState) ? e.dehydrated : null))
        throw Error($u(317));
      e: {
        for (e = e.nextSibling, t = 0; e; ) {
          if (8 === e.nodeType) {
            var n = e.data;
            if (n === Ca) {
              if (0 === t) {
                Ul = kd(e.nextSibling);
                break e;
              }
              t--;
            } else (n !== Ia && n !== Fa && n !== Aa) || t++;
          }
          e = e.nextSibling;
        }
        Ul = null;
      }
    } else Ul = Nl ? kd(e.stateNode.nextSibling) : null;
    return !0;
  }
  function Ap() {
    (Ul = Nl = null), (Bl = !1);
  }
  function Fp(e, t, n, r) {
    t.child = null === e ? yl(t, null, n, r) : bl(t, e.child, n, r);
  }
  function Op(e, t, n, r, o) {
    n = n.render;
    var i = t.ref;
    return (
      Ff(t, o),
      (r = op(e, t, n, r, i, o)),
      null === e || jl
        ? ((t.effectTag |= 1), Fp(e, t, r, o), t.child)
        : ((t.updateQueue = e.updateQueue),
          (t.effectTag &= -517),
          e.expirationTime <= o && (e.expirationTime = 0),
          Gp(e, t, o))
    );
  }
  function Mp(e, t, n, r, o, i) {
    if (null === e) {
      var a = n.type;
      return "function" != typeof a ||
        zh(a) ||
        void 0 !== a.defaultProps ||
        null !== n.compare ||
        void 0 !== n.defaultProps
        ? (((e = $h(n.type, null, r, null, t.mode, i)).ref = t.ref),
          (e.return = t),
          (t.child = e))
        : ((t.tag = 15), (t.type = a), Rp(e, t, a, r, o, i));
    }
    return (
      (a = e.child),
      o < i &&
      ((o = a.memoizedProps),
      (n = null !== (n = n.compare) ? n : lf)(o, r) && e.ref === t.ref)
        ? Gp(e, t, i)
        : ((t.effectTag |= 1),
          ((e = Gh(a, r)).ref = t.ref),
          (e.return = t),
          (t.child = e))
    );
  }
  function Rp(e, t, n, r, o, i) {
    return null !== e &&
      lf(e.memoizedProps, r) &&
      e.ref === t.ref &&
      ((jl = !1), o < i)
      ? ((t.expirationTime = e.expirationTime), Gp(e, t, i))
      : Up(e, t, n, r, i);
  }
  function Np(e, t) {
    var n = t.ref;
    ((null === e && null !== n) || (null !== e && e.ref !== n)) &&
      (t.effectTag |= 128);
  }
  function Up(e, t, n, r, o) {
    var i = hf(n) ? qs : Vs.current;
    return (
      (i = pf(t, i)),
      Ff(t, o),
      (n = op(e, t, n, r, i, o)),
      null === e || jl
        ? ((t.effectTag |= 1), Fp(e, t, n, o), t.child)
        : ((t.updateQueue = e.updateQueue),
          (t.effectTag &= -517),
          e.expirationTime <= o && (e.expirationTime = 0),
          Gp(e, t, o))
    );
  }
  function Bp(e, t, n, r, o) {
    if (hf(n)) {
      var i = !0;
      bf(t);
    } else i = !1;
    if ((Ff(t, o), null === t.stateNode))
      null !== e &&
        ((e.alternate = null), (t.alternate = null), (t.effectTag |= 2)),
        qf(t, n, r),
        Gf(t, n, r, o),
        (r = !0);
    else if (null === e) {
      var a = t.stateNode,
        s = t.memoizedProps;
      a.props = s;
      var l = a.context,
        u = n.contextType;
      "object" == typeof u && null !== u
        ? (u = Of(u))
        : (u = pf(t, (u = hf(n) ? qs : Vs.current)));
      var c = n.getDerivedStateFromProps,
        d =
          "function" == typeof c ||
          "function" == typeof a.getSnapshotBeforeUpdate;
      d ||
        ("function" != typeof a.UNSAFE_componentWillReceiveProps &&
          "function" != typeof a.componentWillReceiveProps) ||
        ((s !== r || l !== u) && zf(t, a, r, u)),
        (pl = !1);
      var f = t.memoizedState;
      (a.state = f),
        Lf(t, r, a, o),
        (l = t.memoizedState),
        s !== r || f !== l || Hs.current || pl
          ? ("function" == typeof c && (Vf(t, n, c, r), (l = t.memoizedState)),
            (s = pl || Hf(t, n, s, r, f, l, u))
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
        Rf(e, t),
        (s = t.memoizedProps),
        (a.props = t.type === t.elementType ? s : Tf(t.type, s)),
        (l = a.context),
        "object" == typeof (u = n.contextType) && null !== u
          ? (u = Of(u))
          : (u = pf(t, (u = hf(n) ? qs : Vs.current))),
        (d =
          "function" == typeof (c = n.getDerivedStateFromProps) ||
          "function" == typeof a.getSnapshotBeforeUpdate) ||
          ("function" != typeof a.UNSAFE_componentWillReceiveProps &&
            "function" != typeof a.componentWillReceiveProps) ||
          ((s !== r || l !== u) && zf(t, a, r, u)),
        (pl = !1),
        (l = t.memoizedState),
        (a.state = l),
        Lf(t, r, a, o),
        (f = t.memoizedState),
        s !== r || l !== f || Hs.current || pl
          ? ("function" == typeof c && (Vf(t, n, c, r), (f = t.memoizedState)),
            (c = pl || Hf(t, n, s, r, l, f, u))
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
    return Lp(e, t, n, r, i, o);
  }
  function Lp(e, t, n, r, o, i) {
    Np(e, t);
    var a = 0 != (64 & t.effectTag);
    if (!r && !a) return o && yf(t, n, !1), Gp(e, t, i);
    (r = t.stateNode), (Ll.current = t);
    var s =
      a && "function" != typeof n.getDerivedStateFromError ? null : r.render();
    return (
      (t.effectTag |= 1),
      null !== e && a
        ? ((t.child = bl(t, e.child, null, i)), (t.child = bl(t, null, s, i)))
        : Fp(e, t, s, i),
      (t.memoizedState = r.state),
      o && yf(t, n, !0),
      t.child
    );
  }
  function jp(e) {
    var t = e.stateNode;
    t.pendingContext
      ? mf(0, t.pendingContext, t.pendingContext !== t.context)
      : t.context && mf(0, t.context, !1),
      Qf(e, t.containerInfo);
  }
  function Vp(e, t, n) {
    var r,
      o = t.mode,
      i = t.pendingProps,
      a = Pl.current,
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
      ff(Pl, 1 & a),
      null === e)
    ) {
      if ((void 0 !== i.fallback && Tp(t), s)) {
        if (
          ((s = i.fallback),
          ((i = Wh(null, o, 0, null)).return = t),
          0 == (2 & t.mode))
        )
          for (
            e = null !== t.memoizedState ? t.child.child : t.child, i.child = e;
            null !== e;

          )
            (e.return = i), (e = e.sibling);
        return (
          ((n = Wh(s, o, n, null)).return = t),
          (i.sibling = n),
          (t.memoizedState = Vl),
          (t.child = i),
          n
        );
      }
      return (
        (o = i.children),
        (t.memoizedState = null),
        (t.child = yl(t, null, o, n))
      );
    }
    if (null !== e.memoizedState) {
      if (((o = (e = e.child).sibling), s)) {
        if (
          ((i = i.fallback),
          ((n = Gh(e, e.pendingProps)).return = t),
          0 == (2 & t.mode) &&
            (s = null !== t.memoizedState ? t.child.child : t.child) !==
              e.child)
        )
          for (n.child = s; null !== s; ) (s.return = n), (s = s.sibling);
        return (
          ((o = Gh(o, i)).return = t),
          (n.sibling = o),
          (n.childExpirationTime = 0),
          (t.memoizedState = Vl),
          (t.child = n),
          o
        );
      }
      return (
        (n = bl(t, e.child, i.children, n)),
        (t.memoizedState = null),
        (t.child = n)
      );
    }
    if (((e = e.child), s)) {
      if (
        ((s = i.fallback),
        ((i = Wh(null, o, 0, null)).return = t),
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
        ((n = Wh(s, o, n, null)).return = t),
        (i.sibling = n),
        (n.effectTag |= 2),
        (i.childExpirationTime = 0),
        (t.memoizedState = Vl),
        (t.child = i),
        n
      );
    }
    return (t.memoizedState = null), (t.child = bl(t, e, i.children, n));
  }
  function Hp(e, t) {
    e.expirationTime < t && (e.expirationTime = t);
    var n = e.alternate;
    null !== n && n.expirationTime < t && (n.expirationTime = t),
      Af(e.return, t);
  }
  function qp(e, t, n, r, o, i) {
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
  function zp(e, t, n) {
    var r = t.pendingProps,
      o = r.revealOrder,
      i = r.tail;
    if ((Fp(e, t, r.children, n), 0 != (2 & (r = Pl.current))))
      (r = (1 & r) | 2), (t.effectTag |= 64);
    else {
      if (null !== e && 0 != (64 & e.effectTag))
        e: for (e = t.child; null !== e; ) {
          if (13 === e.tag) null !== e.memoizedState && Hp(e, n);
          else if (19 === e.tag) Hp(e, n);
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
    if ((ff(Pl, r), 0 == (2 & t.mode))) t.memoizedState = null;
    else
      switch (o) {
        case "forwards":
          for (n = t.child, o = null; null !== n; )
            null !== (e = n.alternate) && null === ep(e) && (o = n),
              (n = n.sibling);
          null === (n = o)
            ? ((o = t.child), (t.child = null))
            : ((o = n.sibling), (n.sibling = null)),
            qp(t, !1, o, n, i, t.lastEffect);
          break;
        case "backwards":
          for (n = null, o = t.child, t.child = null; null !== o; ) {
            if (null !== (e = o.alternate) && null === ep(e)) {
              t.child = o;
              break;
            }
            (e = o.sibling), (o.sibling = n), (n = o), (o = e);
          }
          qp(t, !0, n, null, i, t.lastEffect);
          break;
        case "together":
          qp(t, !1, null, null, void 0, t.lastEffect);
          break;
        default:
          t.memoizedState = null;
      }
    return t.child;
  }
  function Gp(e, t, n) {
    null !== e && (t.dependencies = e.dependencies);
    var r = t.expirationTime;
    if ((0 !== r && Eh(r), t.childExpirationTime < n)) return null;
    if (null !== e && t.child !== e.child) throw Error($u(153));
    if (null !== t.child) {
      for (
        n = Gh((e = t.child), e.pendingProps), t.child = n, n.return = t;
        null !== e.sibling;

      )
        (e = e.sibling), ((n = n.sibling = Gh(e, e.pendingProps)).return = t);
      n.sibling = null;
    }
    return t.child;
  }
  function $p(e, t) {
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
  function Wp(e, t, n) {
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
        return hf(t.type) && gf(), null;
      case 3:
        return (
          Kf(),
          df(Hs),
          df(Vs),
          (n = t.stateNode).pendingContext &&
            ((n.context = n.pendingContext), (n.pendingContext = null)),
          (null !== e && null !== e.child) || !Cp(t) || (t.effectTag |= 4),
          ql(t),
          null
        );
      case 5:
        Zf(t), (n = Jf(xl.current));
        var o = t.type;
        if (null !== e && null != t.stateNode)
          zl(e, t, o, r, n), e.ref !== t.ref && (t.effectTag |= 128);
        else {
          if (!r) {
            if (null === t.stateNode) throw Error($u(166));
            return null;
          }
          if (((e = Jf(_l.current)), Cp(t))) {
            (r = t.stateNode), (o = t.type);
            var i = t.memoizedProps;
            switch (((r[Ba] = t), (r[La] = i), o)) {
              case "iframe":
              case "object":
              case "embed":
                id("load", r);
                break;
              case "video":
              case "audio":
                for (e = 0; e < Zi.length; e++) id(Zi[e], r);
                break;
              case "source":
                id("error", r);
                break;
              case "img":
              case "image":
              case "link":
                id("error", r), id("load", r);
                break;
              case "form":
                id("reset", r), id("submit", r);
                break;
              case "details":
                id("toggle", r);
                break;
              case "input":
                bc(r, i), id("invalid", r), gd(n, "onChange");
                break;
              case "select":
                (r._wrapperState = { wasMultiple: !!i.multiple }),
                  id("invalid", r),
                  gd(n, "onChange");
                break;
              case "textarea":
                Dc(r, i), id("invalid", r), gd(n, "onChange");
            }
            for (var a in (pd(o, i), (e = null), i))
              if (i.hasOwnProperty(a)) {
                var s = i[a];
                "children" === a
                  ? "string" == typeof s
                    ? r.textContent !== s && (e = ["children", s])
                    : "number" == typeof s &&
                      r.textContent !== "" + s &&
                      (e = ["children", "" + s])
                  : ci.hasOwnProperty(a) && null != s && gd(n, a);
              }
            switch (o) {
              case "input":
                gc(r), _c(r, i, !0);
                break;
              case "textarea":
                gc(r), Tc(r);
                break;
              case "select":
              case "option":
                break;
              default:
                "function" == typeof i.onClick && (r.onclick = md);
            }
            (n = e), (t.updateQueue = n), null !== n && (t.effectTag |= 4);
          } else {
            switch (
              ((a = 9 === n.nodeType ? n : n.ownerDocument),
              e === Ta && (e = Ic(o)),
              e === Ta
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
              (e[Ba] = t),
              (e[La] = r),
              Hl(e, t, !1, !1),
              (t.stateNode = e),
              (a = hd(o, r)),
              o)
            ) {
              case "iframe":
              case "object":
              case "embed":
                id("load", e), (s = r);
                break;
              case "video":
              case "audio":
                for (s = 0; s < Zi.length; s++) id(Zi[s], e);
                s = r;
                break;
              case "source":
                id("error", e), (s = r);
                break;
              case "img":
              case "image":
              case "link":
                id("error", e), id("load", e), (s = r);
                break;
              case "form":
                id("reset", e), id("submit", e), (s = r);
                break;
              case "details":
                id("toggle", e), (s = r);
                break;
              case "input":
                bc(e, r), (s = vc(e, r)), id("invalid", e), gd(n, "onChange");
                break;
              case "option":
                s = xc(e, r);
                break;
              case "select":
                (e._wrapperState = { wasMultiple: !!r.multiple }),
                  (s = Ko({}, r, { value: void 0 })),
                  id("invalid", e),
                  gd(n, "onChange");
                break;
              case "textarea":
                Dc(e, r), (s = kc(e, r)), id("invalid", e), gd(n, "onChange");
                break;
              default:
                s = r;
            }
            pd(o, s);
            var l = s;
            for (i in l)
              if (l.hasOwnProperty(i)) {
                var u = l[i];
                "style" === i
                  ? fd(e, u)
                  : "dangerouslySetInnerHTML" === i
                  ? null != (u = u ? u.__html : void 0) && Gi(e, u)
                  : "children" === i
                  ? "string" == typeof u
                    ? ("textarea" !== o || "" !== u) && Ac(e, u)
                    : "number" == typeof u && Ac(e, "" + u)
                  : "suppressContentEditableWarning" !== i &&
                    "suppressHydrationWarning" !== i &&
                    "autoFocus" !== i &&
                    (ci.hasOwnProperty(i)
                      ? null != u && gd(n, i)
                      : null != u && uc(e, i, u, a));
              }
            switch (o) {
              case "input":
                gc(e), _c(e, r, !1);
                break;
              case "textarea":
                gc(e), Tc(e);
                break;
              case "option":
                null != r.value && e.setAttribute("value", "" + pc(r.value));
                break;
              case "select":
                (e.multiple = !!r.multiple),
                  null != (n = r.value)
                    ? Pc(e, !!r.multiple, n, !1)
                    : null != r.defaultValue &&
                      Pc(e, !!r.multiple, r.defaultValue, !0);
                break;
              default:
                "function" == typeof s.onClick && (e.onclick = md);
            }
            xd(o, r) && (t.effectTag |= 4);
          }
          null !== t.ref && (t.effectTag |= 128);
        }
        return null;
      case 6:
        if (e && null != t.stateNode) Gl(e, t, e.memoizedProps, r);
        else {
          if ("string" != typeof r && null === t.stateNode)
            throw Error($u(166));
          (n = Jf(xl.current)),
            Jf(_l.current),
            Cp(t)
              ? ((n = t.stateNode),
                (r = t.memoizedProps),
                (n[Ba] = t),
                n.nodeValue !== r && (t.effectTag |= 4))
              : (((n = (9 === n.nodeType ? n : n.ownerDocument).createTextNode(
                  r
                ))[Ba] = t),
                (t.stateNode = n));
        }
        return null;
      case 13:
        return (
          df(Pl),
          (r = t.memoizedState),
          0 != (64 & t.effectTag)
            ? ((t.expirationTime = n), t)
            : ((n = null !== r),
              (r = !1),
              null === e
                ? void 0 !== t.memoizedProps.fallback && Cp(t)
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
                0 != (1 & Pl.current)
                  ? du === tu && (du = ou)
                  : ((du !== tu && du !== ou) || (du = iu),
                    0 !== mu && null !== lu && (Xh(lu, cu), Zh(lu, mu)))),
              (n || r) && (t.effectTag |= 4),
              null)
        );
      case 4:
        return Kf(), ql(t), null;
      case 10:
        return Cf(t), null;
      case 17:
        return hf(t.type) && gf(), null;
      case 19:
        if ((df(Pl), null === (r = t.memoizedState))) return null;
        if (((o = 0 != (64 & t.effectTag)), null === (i = r.rendering))) {
          if (o) $p(r, !1);
          else if (du !== tu || (null !== e && 0 != (64 & e.effectTag)))
            for (i = t.child; null !== i; ) {
              if (null !== (e = ep(i))) {
                for (
                  t.effectTag |= 64,
                    $p(r, !1),
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
                return ff(Pl, (1 & Pl.current) | 2), t.child;
              }
              i = i.sibling;
            }
        } else {
          if (!o)
            if (null !== (e = ep(i))) {
              if (
                ((t.effectTag |= 64),
                (o = !0),
                null !== (n = e.updateQueue) &&
                  ((t.updateQueue = n), (t.effectTag |= 4)),
                $p(r, !0),
                null === r.tail && "hidden" === r.tailMode && !i.alternate)
              )
                return (
                  null !== (t = t.lastEffect = r.lastEffect) &&
                    (t.nextEffect = null),
                  null
                );
            } else
              2 * ll() - r.renderingStartTime > r.tailExpiration &&
                1 < n &&
                ((t.effectTag |= 64),
                (o = !0),
                $p(r, !1),
                (t.expirationTime = t.childExpirationTime = n - 1));
          r.isBackwards
            ? ((i.sibling = t.child), (t.child = i))
            : (null !== (n = r.last) ? (n.sibling = i) : (t.child = i),
              (r.last = i));
        }
        return null !== r.tail
          ? (0 === r.tailExpiration && (r.tailExpiration = ll() + 500),
            (n = r.tail),
            (r.rendering = n),
            (r.tail = n.sibling),
            (r.lastEffect = t.lastEffect),
            (r.renderingStartTime = ll()),
            (n.sibling = null),
            (t = Pl.current),
            ff(Pl, o ? (1 & t) | 2 : 1 & t),
            n)
          : null;
    }
    throw Error($u(156, t.tag));
  }
  function Yp(e) {
    switch (e.tag) {
      case 1:
        hf(e.type) && gf();
        var t = e.effectTag;
        return 4096 & t ? ((e.effectTag = (-4097 & t) | 64), e) : null;
      case 3:
        if ((Kf(), df(Hs), df(Vs), 0 != (64 & (t = e.effectTag))))
          throw Error($u(285));
        return (e.effectTag = (-4097 & t) | 64), e;
      case 5:
        return Zf(e), null;
      case 13:
        return (
          df(Pl),
          4096 & (t = e.effectTag)
            ? ((e.effectTag = (-4097 & t) | 64), e)
            : null
        );
      case 19:
        return df(Pl), null;
      case 4:
        return Kf(), null;
      case 10:
        return Cf(e), null;
      default:
        return null;
    }
  }
  function Jp(e, t) {
    return { value: e, source: t, stack: fc(t) };
  }
  function Qp(e, t) {
    var n = t.source,
      r = t.stack;
    null === r && null !== n && (r = fc(n)),
      null !== n && dc(n.type),
      (t = t.value),
      null !== e && 1 === e.tag && dc(e.type);
    try {
      console.error(t);
    } catch (e) {
      setTimeout(function () {
        throw e;
      });
    }
  }
  function Kp(e) {
    var t = e.ref;
    if (null !== t)
      if ("function" == typeof t)
        try {
          t(null);
        } catch (t) {
          Lh(e, t);
        }
      else t.current = null;
  }
  function Xp(e, t) {
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
            t.elementType === t.type ? n : Tf(t.type, n),
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
    throw Error($u(163));
  }
  function Zp(e, t) {
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
  function eh(e, t) {
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
  function th(e, t, n) {
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
      case 22:
        return void eh(3, n);
      case 1:
        if (((e = n.stateNode), 4 & n.effectTag))
          if (null === t) e.componentDidMount();
          else {
            var r =
              n.elementType === n.type
                ? t.memoizedProps
                : Tf(n.type, t.memoizedProps);
            e.componentDidUpdate(
              r,
              t.memoizedState,
              e.__reactInternalSnapshotBeforeUpdate
            );
          }
        return void (null !== (t = n.updateQueue) && jf(n, t, e));
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
          jf(n, t, e);
        }
        return;
      case 5:
        return (
          (e = n.stateNode),
          void (
            null === t &&
            4 & n.effectTag &&
            xd(n.type, n.memoizedProps) &&
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
            null !== n && ((n = n.dehydrated), null !== n && rd(n))))
        );
      case 19:
      case 17:
      case 20:
      case 21:
        return;
    }
    throw Error($u(163));
  }
  function nh(e, t, n) {
    switch (("function" == typeof Ou && Ou(t), t.tag)) {
      case 0:
      case 11:
      case 14:
      case 15:
      case 22:
        if (null !== (e = t.updateQueue) && null !== (e = e.lastEffect)) {
          var r = e.next;
          Sf(97 < n ? 97 : n, function () {
            var e = r;
            do {
              var n = e.destroy;
              if (void 0 !== n) {
                var o = t;
                try {
                  n();
                } catch (e) {
                  Lh(o, e);
                }
              }
              e = e.next;
            } while (e !== r);
          });
        }
        break;
      case 1:
        Kp(t),
          "function" == typeof (n = t.stateNode).componentWillUnmount &&
            (function (e, t) {
              try {
                (t.props = e.memoizedProps),
                  (t.state = e.memoizedState),
                  t.componentWillUnmount();
              } catch (t) {
                Lh(e, t);
              }
            })(t, n);
        break;
      case 5:
        Kp(t);
        break;
      case 4:
        lh(e, t, n);
    }
  }
  function rh(e) {
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
      null !== t && rh(t);
  }
  function oh(e) {
    return 5 === e.tag || 3 === e.tag || 4 === e.tag;
  }
  function ih(e) {
    e: {
      for (var t = e.return; null !== t; ) {
        if (oh(t)) {
          var n = t;
          break e;
        }
        t = t.return;
      }
      throw Error($u(160));
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
        throw Error($u(161));
    }
    16 & n.effectTag && (Ac(t, ""), (n.effectTag &= -17));
    e: t: for (n = e; ; ) {
      for (; null === n.sibling; ) {
        if (null === n.return || oh(n.return)) {
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
    r ? ah(e, n, t) : sh(e, n, t);
  }
  function ah(e, t, n) {
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
              (t.onclick = md));
    else if (4 !== r && null !== (e = e.child))
      for (ah(e, t, n), e = e.sibling; null !== e; )
        ah(e, t, n), (e = e.sibling);
  }
  function sh(e, t, n) {
    var r = e.tag,
      o = 5 === r || 6 === r;
    if (o)
      (e = o ? e.stateNode : e.stateNode.instance),
        t ? n.insertBefore(e, t) : n.appendChild(e);
    else if (4 !== r && null !== (e = e.child))
      for (sh(e, t, n), e = e.sibling; null !== e; )
        sh(e, t, n), (e = e.sibling);
  }
  function lh(e, t, n) {
    for (var r, o, i = t, a = !1; ; ) {
      if (!a) {
        a = i.return;
        e: for (;;) {
          if (null === a) throw Error($u(160));
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
          if ((nh(s, c, u), null !== c.child && 4 !== c.tag))
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
      } else if ((nh(e, i, n), null !== i.child)) {
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
  function uh(e, t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
      case 22:
        return void Zp(3, t);
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
              n[La] = r,
                "input" === e &&
                  "radio" === r.type &&
                  null != r.name &&
                  yc(n, r),
                hd(e, o),
                t = hd(e, r),
                o = 0;
              o < i.length;
              o += 2
            ) {
              var a = i[o],
                s = i[o + 1];
              "style" === a
                ? fd(n, s)
                : "dangerouslySetInnerHTML" === a
                ? Gi(n, s)
                : "children" === a
                ? Ac(n, s)
                : uc(n, a, s, t);
            }
            switch (e) {
              case "input":
                wc(n, r);
                break;
              case "textarea":
                Ec(n, r);
                break;
              case "select":
                (t = n._wrapperState.wasMultiple),
                  (n._wrapperState.wasMultiple = !!r.multiple),
                  null != (e = r.value)
                    ? Pc(n, !!r.multiple, e, !1)
                    : t !== !!r.multiple &&
                      (null != r.defaultValue
                        ? Pc(n, !!r.multiple, r.defaultValue, !0)
                        : Pc(n, !!r.multiple, r.multiple ? [] : "", !1));
            }
          }
        }
        return;
      case 6:
        if (null === t.stateNode) throw Error($u(162));
        return void (t.stateNode.nodeValue = t.memoizedProps);
      case 3:
        return void (
          (t = t.stateNode).hydrate && ((t.hydrate = !1), rd(t.containerInfo))
        );
      case 12:
        return;
      case 13:
        if (
          ((n = t),
          null === t.memoizedState
            ? (r = !1)
            : ((r = !0), (n = t.child), (bu = ll())),
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
                    (i.style.display = dd("display", o)));
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
        return void ch(t);
      case 19:
        return void ch(t);
      case 17:
        return;
    }
    throw Error($u(163));
  }
  function ch(e) {
    var t = e.updateQueue;
    if (null !== t) {
      e.updateQueue = null;
      var n = e.stateNode;
      null === n && (n = e.stateNode = new $l()),
        t.forEach(function (t) {
          var r = Vh.bind(null, e, t);
          n.has(t) || (n.add(t), t.then(r, r));
        });
    }
  }
  function dh(e, t, n) {
    ((n = Nf(n, null)).tag = 3), (n.payload = { element: null });
    var r = t.value;
    return (
      (n.callback = function () {
        _u || ((_u = !0), (Su = r)), Qp(e, t);
      }),
      n
    );
  }
  function fh(e, t, n) {
    (n = Nf(n, null)).tag = 3;
    var r = e.type.getDerivedStateFromError;
    if ("function" == typeof r) {
      var o = t.value;
      n.payload = function () {
        return Qp(e, t), r(o);
      };
    }
    var i = e.stateNode;
    return (
      null !== i &&
        "function" == typeof i.componentDidCatch &&
        (n.callback = function () {
          "function" != typeof r &&
            (null === xu ? (xu = new Set([this])) : xu.add(this), Qp(e, t));
          var n = t.stack;
          this.componentDidCatch(t.value, {
            componentStack: null !== n ? n : "",
          });
        }),
      n
    );
  }
  function ph() {
    return (su & (Zl | eu)) !== Kl
      ? 1073741821 - ((ll() / 10) | 0)
      : 0 !== Cu
      ? Cu
      : (Cu = 1073741821 - ((ll() / 10) | 0));
  }
  function hh(e, t, n) {
    if (0 == (2 & (t = t.mode))) return 1073741823;
    var r = wf();
    if (0 == (4 & t)) return 99 === r ? 1073741823 : 1073741822;
    if ((su & Zl) !== Kl) return cu;
    if (null !== n) e = Ef(e, 0 | n.timeoutMs || 5e3, 250);
    else
      switch (r) {
        case 99:
          e = 1073741823;
          break;
        case 98:
          e = Ef(e, 150, 100);
          break;
        case 97:
        case 96:
          e = Ef(e, 5e3, 250);
          break;
        case 95:
          e = 2;
          break;
        default:
          throw Error($u(326));
      }
    return null !== lu && e === cu && --e, e;
  }
  function gh(e, t) {
    if (50 < Tu) throw ((Tu = 0), (Iu = null), Error($u(185)));
    if (null !== (e = mh(e, t))) {
      var n = wf();
      1073741823 === t
        ? (su & Xl) !== Kl && (su & (Zl | eu)) === Kl
          ? wh(e)
          : (bh(e), su === Kl && kf())
        : bh(e),
        (4 & su) === Kl ||
          (98 !== n && 99 !== n) ||
          (null === Eu
            ? (Eu = new Map([[e, t]]))
            : (void 0 === (n = Eu.get(e)) || n > t) && Eu.set(e, t));
    }
  }
  function mh(e, t) {
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
      null !== o && (lu === o && (Eh(t), du === iu && Xh(o, cu)), Zh(o, t)), o
    );
  }
  function vh(e) {
    var t = e.lastExpiredTime;
    if (0 !== t) return t;
    if (!Kh(e, (t = e.firstPendingTime))) return t;
    var n = e.lastPingedTime;
    return 2 >= (e = n > (e = e.nextKnownPendingLevel) ? n : e) && t !== e
      ? 0
      : e;
  }
  function bh(e) {
    if (0 !== e.lastExpiredTime)
      (e.callbackExpirationTime = 1073741823),
        (e.callbackPriority = 99),
        (e.callbackNode = Pf(wh.bind(null, e)));
    else {
      var t = vh(e),
        n = e.callbackNode;
      if (0 === t)
        null !== n &&
          ((e.callbackNode = null),
          (e.callbackExpirationTime = 0),
          (e.callbackPriority = 90));
      else {
        var r = ph();
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
          n !== tl && $s(n);
        }
        (e.callbackExpirationTime = t),
          (e.callbackPriority = r),
          (t =
            1073741823 === t
              ? Pf(wh.bind(null, e))
              : xf(r, yh.bind(null, e), {
                  timeout: 10 * (1073741821 - t) - ll(),
                })),
          (e.callbackNode = t);
      }
    }
  }
  function yh(e, t) {
    if (((Cu = 0), t)) return eg(e, (t = ph())), bh(e), null;
    var n = vh(e);
    if (0 !== n) {
      if (((t = e.callbackNode), (su & (Zl | eu)) !== Kl)) throw Error($u(327));
      if ((Nh(), (e === lu && n === cu) || xh(e, n), null !== uu)) {
        var r = su;
        su |= Zl;
        for (var o = kh(); ; )
          try {
            Ih();
            break;
          } catch (t) {
            Ph(e, t);
          }
        if ((If(), (su = r), (Jl.current = o), du === nu))
          throw ((t = fu), xh(e, n), Xh(e, n), bh(e), t);
        if (null === uu)
          switch (
            ((o = e.finishedWork = e.current.alternate),
            (e.finishedExpirationTime = n),
            (r = du),
            (lu = null),
            r)
          ) {
            case tu:
            case nu:
              throw Error($u(345));
            case ru:
              eg(e, 2 < n ? 2 : n);
              break;
            case ou:
              if (
                (Xh(e, n),
                n === (r = e.lastSuspendedTime) &&
                  (e.nextKnownPendingLevel = Fh(o)),
                1073741823 === pu && 10 < (o = bu + yu - ll()))
              ) {
                if (vu) {
                  var i = e.lastPingedTime;
                  if (0 === i || i >= n) {
                    (e.lastPingedTime = n), xh(e, n);
                    break;
                  }
                }
                if (0 !== (i = vh(e)) && i !== n) break;
                if (0 !== r && r !== n) {
                  e.lastPingedTime = r;
                  break;
                }
                e.timeoutHandle = Ra(Oh.bind(null, e), o);
                break;
              }
              Oh(e);
              break;
            case iu:
              if (
                (Xh(e, n),
                n === (r = e.lastSuspendedTime) &&
                  (e.nextKnownPendingLevel = Fh(o)),
                vu && (0 === (o = e.lastPingedTime) || o >= n))
              ) {
                (e.lastPingedTime = n), xh(e, n);
                break;
              }
              if (0 !== (o = vh(e)) && o !== n) break;
              if (0 !== r && r !== n) {
                e.lastPingedTime = r;
                break;
              }
              if (
                (1073741823 !== hu
                  ? (r = 10 * (1073741821 - hu) - ll())
                  : 1073741823 === pu
                  ? (r = 0)
                  : ((r = 10 * (1073741821 - pu) - 5e3),
                    0 > (r = (o = ll()) - r) && (r = 0),
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
                          : 1960 * Yl(r / 1960)) - r) && (r = n)),
                10 < r)
              ) {
                e.timeoutHandle = Ra(Oh.bind(null, e), r);
                break;
              }
              Oh(e);
              break;
            case au:
              if (1073741823 !== pu && null !== gu) {
                i = pu;
                var a = gu;
                if (
                  (0 >= (r = 0 | a.busyMinDurationMs)
                    ? (r = 0)
                    : ((o = 0 | a.busyDelayMs),
                      (r =
                        (i =
                          ll() -
                          (10 * (1073741821 - i) - (0 | a.timeoutMs || 5e3))) <=
                        o
                          ? 0
                          : o + r - i)),
                  10 < r)
                ) {
                  Xh(e, n), (e.timeoutHandle = Ra(Oh.bind(null, e), r));
                  break;
                }
              }
              Oh(e);
              break;
            default:
              throw Error($u(329));
          }
        if ((bh(e), e.callbackNode === t)) return yh.bind(null, e);
      }
    }
    return null;
  }
  function wh(e) {
    var t = e.lastExpiredTime;
    if (((t = 0 !== t ? t : 1073741823), (su & (Zl | eu)) !== Kl))
      throw Error($u(327));
    if ((Nh(), (e === lu && t === cu) || xh(e, t), null !== uu)) {
      var n = su;
      su |= Zl;
      for (var r = kh(); ; )
        try {
          Th();
          break;
        } catch (t) {
          Ph(e, t);
        }
      if ((If(), (su = n), (Jl.current = r), du === nu))
        throw ((n = fu), xh(e, t), Xh(e, t), bh(e), n);
      if (null !== uu) throw Error($u(261));
      (e.finishedWork = e.current.alternate),
        (e.finishedExpirationTime = t),
        (lu = null),
        Oh(e),
        bh(e);
    }
    return null;
  }
  function _h(e, t) {
    var n = su;
    su |= 1;
    try {
      return e(t);
    } finally {
      (su = n) === Kl && kf();
    }
  }
  function Sh(e, t) {
    var n = su;
    (su &= -2), (su |= Xl);
    try {
      return e(t);
    } finally {
      (su = n) === Kl && kf();
    }
  }
  function xh(e, t) {
    (e.finishedWork = null), (e.finishedExpirationTime = 0);
    var n = e.timeoutHandle;
    if ((-1 !== n && ((e.timeoutHandle = -1), Na(n)), null !== uu))
      for (n = uu.return; null !== n; ) {
        var r = n;
        switch (r.tag) {
          case 1:
            null != (r = r.type.childContextTypes) && gf();
            break;
          case 3:
            Kf(), df(Hs), df(Vs);
            break;
          case 5:
            Zf(r);
            break;
          case 4:
            Kf();
            break;
          case 13:
          case 19:
            df(Pl);
            break;
          case 10:
            Cf(r);
        }
        n = n.return;
      }
    (lu = e),
      (uu = Gh(e.current, null)),
      (cu = t),
      (du = tu),
      (fu = null),
      (hu = pu = 1073741823),
      (gu = null),
      (mu = 0),
      (vu = !1);
  }
  function Ph(e, t) {
    for (;;) {
      try {
        if ((If(), (kl.current = Fl), Al))
          for (var n = Tl.memoizedState; null !== n; ) {
            var r = n.queue;
            null !== r && (r.pending = null), (n = n.next);
          }
        if (
          ((El = 0),
          (Cl = Il = Tl = null),
          (Al = !1),
          null === uu || null === uu.return)
        )
          return (du = nu), (fu = t), (uu = null);
        e: {
          var o = e,
            i = uu.return,
            a = uu,
            s = t;
          if (
            ((t = cu),
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
            var c = 0 != (1 & Pl.current),
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
                      var v = Nf(1073741823, null);
                      (v.tag = 2), Uf(a, v);
                    }
                  a.expirationTime = 1073741823;
                  break e;
                }
                (s = void 0), (a = t);
                var b = o.pingCache;
                if (
                  (null === b
                    ? ((b = o.pingCache = new Wl()),
                      (s = new Set()),
                      b.set(l, s))
                    : void 0 === (s = b.get(l)) &&
                      ((s = new Set()), b.set(l, s)),
                  !s.has(a))
                ) {
                  s.add(a);
                  var y = jh.bind(null, o, l, a);
                  l.then(y, y);
                }
                (d.effectTag |= 4096), (d.expirationTime = t);
                break e;
              }
              d = d.return;
            } while (null !== d);
            s = Error(
              (dc(a.type) || "A React component") +
                " suspended while rendering, but no fallback UI was specified.\n\nAdd a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display." +
                fc(a)
            );
          }
          du !== au && (du = ru), (s = Jp(s, a)), (d = i);
          do {
            switch (d.tag) {
              case 3:
                (l = s),
                  (d.effectTag |= 4096),
                  (d.expirationTime = t),
                  Bf(d, dh(d, l, t));
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
                      (null === xu || !xu.has(_))))
                ) {
                  (d.effectTag |= 4096),
                    (d.expirationTime = t),
                    Bf(d, fh(d, l, t));
                  break e;
                }
            }
            d = d.return;
          } while (null !== d);
        }
        uu = Ah(uu);
      } catch (e) {
        t = e;
        continue;
      }
      break;
    }
  }
  function kh() {
    var e = Jl.current;
    return (Jl.current = Fl), null === e ? Fl : e;
  }
  function Dh(e, t) {
    e < pu && 2 < e && (pu = e),
      null !== t && e < hu && 2 < e && ((hu = e), (gu = t));
  }
  function Eh(e) {
    e > mu && (mu = e);
  }
  function Th() {
    for (; null !== uu; ) uu = Ch(uu);
  }
  function Ih() {
    for (; null !== uu && !nl(); ) uu = Ch(uu);
  }
  function Ch(e) {
    var t = Au(e.alternate, e, cu);
    return (
      (e.memoizedProps = e.pendingProps),
      null === t && (t = Ah(e)),
      (Ql.current = null),
      t
    );
  }
  function Ah(e) {
    uu = e;
    do {
      var t = uu.alternate;
      if (((e = uu.return), 0 == (2048 & uu.effectTag))) {
        if (((t = Wp(t, uu, cu)), 1 === cu || 1 !== uu.childExpirationTime)) {
          for (var n = 0, r = uu.child; null !== r; ) {
            var o = r.expirationTime,
              i = r.childExpirationTime;
            o > n && (n = o), i > n && (n = i), (r = r.sibling);
          }
          uu.childExpirationTime = n;
        }
        if (null !== t) return t;
        null !== e &&
          0 == (2048 & e.effectTag) &&
          (null === e.firstEffect && (e.firstEffect = uu.firstEffect),
          null !== uu.lastEffect &&
            (null !== e.lastEffect &&
              (e.lastEffect.nextEffect = uu.firstEffect),
            (e.lastEffect = uu.lastEffect)),
          1 < uu.effectTag &&
            (null !== e.lastEffect
              ? (e.lastEffect.nextEffect = uu)
              : (e.firstEffect = uu),
            (e.lastEffect = uu)));
      } else {
        if (null !== (t = Yp(uu))) return (t.effectTag &= 2047), t;
        null !== e &&
          ((e.firstEffect = e.lastEffect = null), (e.effectTag |= 2048));
      }
      if (null !== (t = uu.sibling)) return t;
      uu = e;
    } while (null !== uu);
    return du === tu && (du = au), null;
  }
  function Fh(e) {
    var t = e.expirationTime;
    return t > (e = e.childExpirationTime) ? t : e;
  }
  function Oh(e) {
    var t = wf();
    return Sf(99, Mh.bind(null, e, t)), null;
  }
  function Mh(e, t) {
    do {
      Nh();
    } while (null !== ku);
    if ((su & (Zl | eu)) !== Kl) throw Error($u(327));
    var n = e.finishedWork,
      r = e.finishedExpirationTime;
    if (null === n) return null;
    if (
      ((e.finishedWork = null), (e.finishedExpirationTime = 0), n === e.current)
    )
      throw Error($u(177));
    (e.callbackNode = null),
      (e.callbackExpirationTime = 0),
      (e.callbackPriority = 90),
      (e.nextKnownPendingLevel = 0);
    var o = Fh(n);
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
      e === lu && ((uu = lu = null), (cu = 0)),
      1 < n.effectTag
        ? null !== n.lastEffect
          ? ((n.lastEffect.nextEffect = n), (o = n.firstEffect))
          : (o = n)
        : (o = n.firstEffect),
      null !== o)
    ) {
      var i = su;
      (su |= eu), (Ql.current = null), (Oa = Pa);
      var a = _d();
      if (Sd(a)) {
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
      (Ma = { activeElementDetached: null, focusedElem: a, selectionRange: s }),
        (Pa = !1),
        (wu = o);
      do {
        try {
          Rh();
        } catch (e) {
          if (null === wu) throw Error($u(330));
          Lh(wu, e), (wu = wu.nextEffect);
        }
      } while (null !== wu);
      wu = o;
      do {
        try {
          for (a = e, s = t; null !== wu; ) {
            var y = wu.effectTag;
            if ((16 & y && Ac(wu.stateNode, ""), 128 & y)) {
              var w = wu.alternate;
              if (null !== w) {
                var _ = w.ref;
                null !== _ &&
                  ("function" == typeof _ ? _(null) : (_.current = null));
              }
            }
            switch (1038 & y) {
              case 2:
                ih(wu), (wu.effectTag &= -3);
                break;
              case 6:
                ih(wu), (wu.effectTag &= -3), uh(wu.alternate, wu);
                break;
              case 1024:
                wu.effectTag &= -1025;
                break;
              case 1028:
                (wu.effectTag &= -1025), uh(wu.alternate, wu);
                break;
              case 4:
                uh(wu.alternate, wu);
                break;
              case 8:
                lh(a, (u = wu), s), rh(u);
            }
            wu = wu.nextEffect;
          }
        } catch (e) {
          if (null === wu) throw Error($u(330));
          Lh(wu, e), (wu = wu.nextEffect);
        }
      } while (null !== wu);
      if (
        ((_ = Ma),
        (w = _d()),
        (y = _.focusedElem),
        (s = _.selectionRange),
        w !== y &&
          y &&
          y.ownerDocument &&
          wd(y.ownerDocument.documentElement, y))
      ) {
        null !== s &&
          Sd(y) &&
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
              (u = yd(y, a)),
              (c = yd(y, s)),
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
      (Pa = !!Oa), (Ma = Oa = null), (e.current = n), (wu = o);
      do {
        try {
          for (y = e; null !== wu; ) {
            var S = wu.effectTag;
            if ((36 & S && th(y, wu.alternate, wu), 128 & S)) {
              w = void 0;
              var x = wu.ref;
              if (null !== x) {
                var P = wu.stateNode;
                switch (wu.tag) {
                  case 5:
                    w = P;
                    break;
                  default:
                    w = P;
                }
                "function" == typeof x ? x(w) : (x.current = w);
              }
            }
            wu = wu.nextEffect;
          }
        } catch (e) {
          if (null === wu) throw Error($u(330));
          Lh(wu, e), (wu = wu.nextEffect);
        }
      } while (null !== wu);
      (wu = null), rl(), (su = i);
    } else e.current = n;
    if (Pu) (Pu = !1), (ku = e), (Du = t);
    else
      for (wu = o; null !== wu; )
        (t = wu.nextEffect), (wu.nextEffect = null), (wu = t);
    if (
      (0 === (t = e.firstPendingTime) && (xu = null),
      1073741823 === t ? (e === Iu ? Tu++ : ((Tu = 0), (Iu = e))) : (Tu = 0),
      "function" == typeof Fu && Fu(n.stateNode, r),
      bh(e),
      _u)
    )
      throw ((_u = !1), (e = Su), (Su = null), e);
    return (su & Xl) !== Kl || kf(), null;
  }
  function Rh() {
    for (; null !== wu; ) {
      var e = wu.effectTag;
      0 != (256 & e) && Xp(wu.alternate, wu),
        0 == (512 & e) ||
          Pu ||
          ((Pu = !0),
          xf(97, function () {
            return Nh(), null;
          })),
        (wu = wu.nextEffect);
    }
  }
  function Nh() {
    if (90 !== Du) {
      var e = 97 < Du ? 97 : Du;
      return (Du = 90), Sf(e, Uh);
    }
  }
  function Uh() {
    if (null === ku) return !1;
    var e = ku;
    if (((ku = null), (su & (Zl | eu)) !== Kl)) throw Error($u(331));
    var t = su;
    for (su |= eu, e = e.current.firstEffect; null !== e; ) {
      try {
        var n = e;
        if (0 != (512 & n.effectTag))
          switch (n.tag) {
            case 0:
            case 11:
            case 15:
            case 22:
              Zp(5, n), eh(5, n);
          }
      } catch (t) {
        if (null === e) throw Error($u(330));
        Lh(e, t);
      }
      (n = e.nextEffect), (e.nextEffect = null), (e = n);
    }
    return (su = t), kf(), !0;
  }
  function Bh(e, t, n) {
    Uf(e, (t = dh(e, (t = Jp(n, t)), 1073741823))),
      null !== (e = mh(e, 1073741823)) && bh(e);
  }
  function Lh(e, t) {
    if (3 === e.tag) Bh(e, e, t);
    else
      for (var n = e.return; null !== n; ) {
        if (3 === n.tag) {
          Bh(n, e, t);
          break;
        }
        if (1 === n.tag) {
          var r = n.stateNode;
          if (
            "function" == typeof n.type.getDerivedStateFromError ||
            ("function" == typeof r.componentDidCatch &&
              (null === xu || !xu.has(r)))
          ) {
            Uf(n, (e = fh(n, (e = Jp(t, e)), 1073741823))),
              null !== (n = mh(n, 1073741823)) && bh(n);
            break;
          }
        }
        n = n.return;
      }
  }
  function jh(e, t, n) {
    var r = e.pingCache;
    null !== r && r.delete(t),
      lu === e && cu === n
        ? du === iu || (du === ou && 1073741823 === pu && ll() - bu < yu)
          ? xh(e, cu)
          : (vu = !0)
        : Kh(e, n) &&
          ((0 !== (t = e.lastPingedTime) && t < n) ||
            ((e.lastPingedTime = n), bh(e)));
  }
  function Vh(e, t) {
    var n = e.stateNode;
    null !== n && n.delete(t),
      0 === (t = 0) && (t = hh((t = ph()), e, null)),
      null !== (e = mh(e, t)) && bh(e);
  }
  function Hh(e, t, n, r) {
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
  function qh(e, t, n, r) {
    return new Hh(e, t, n, r);
  }
  function zh(e) {
    return !(!(e = e.prototype) || !e.isReactComponent);
  }
  function Gh(e, t) {
    var n = e.alternate;
    return (
      null === n
        ? (((n = qh(e.tag, t, e.key, e.mode)).elementType = e.elementType),
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
  function $h(e, t, n, r, o, i) {
    var a = 2;
    if (((r = e), "function" == typeof e)) zh(e) && (a = 1);
    else if ("string" == typeof e) a = 5;
    else
      e: switch (e) {
        case Ci:
          return Wh(n.children, o, i, t);
        case Ri:
          (a = 8), (o |= 7);
          break;
        case Ai:
          (a = 8), (o |= 1);
          break;
        case Fi:
          return (
            ((e = qh(12, n, t, 8 | o)).elementType = Fi),
            (e.type = Fi),
            (e.expirationTime = i),
            e
          );
        case Ui:
          return (
            ((e = qh(13, n, t, o)).type = Ui),
            (e.elementType = Ui),
            (e.expirationTime = i),
            e
          );
        case Bi:
          return (
            ((e = qh(19, n, t, o)).elementType = Bi), (e.expirationTime = i), e
          );
        default:
          if ("object" == typeof e && null !== e)
            switch (e.$$typeof) {
              case Oi:
                a = 10;
                break e;
              case Mi:
                a = 9;
                break e;
              case Ni:
                a = 11;
                break e;
              case Li:
                a = 14;
                break e;
              case ji:
                (a = 16), (r = null);
                break e;
              case Vi:
                a = 22;
                break e;
            }
          throw Error($u(130, null == e ? e : typeof e, ""));
      }
    return (
      ((t = qh(a, n, t, o)).elementType = e),
      (t.type = r),
      (t.expirationTime = i),
      t
    );
  }
  function Wh(e, t, n, r) {
    return ((e = qh(7, e, r, t)).expirationTime = n), e;
  }
  function Yh(e, t, n) {
    return ((e = qh(6, e, null, t)).expirationTime = n), e;
  }
  function Jh(e, t, n) {
    return (
      ((t = qh(
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
  function Qh(e, t, n) {
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
  function Kh(e, t) {
    var n = e.firstSuspendedTime;
    return (e = e.lastSuspendedTime), 0 !== n && n >= t && e <= t;
  }
  function Xh(e, t) {
    var n = e.firstSuspendedTime,
      r = e.lastSuspendedTime;
    n < t && (e.firstSuspendedTime = t),
      (r > t || 0 === n) && (e.lastSuspendedTime = t),
      t <= e.lastPingedTime && (e.lastPingedTime = 0),
      t <= e.lastExpiredTime && (e.lastExpiredTime = 0);
  }
  function Zh(e, t) {
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
  function eg(e, t) {
    var n = e.lastExpiredTime;
    (0 === n || n > t) && (e.lastExpiredTime = t);
  }
  function tg(e, t, n, r) {
    var o = t.current,
      i = ph(),
      a = hl.suspense;
    i = hh(i, o, a);
    e: if (n) {
      t: {
        if (Rc((n = n._reactInternalFiber)) !== n || 1 !== n.tag)
          throw Error($u(170));
        var s = n;
        do {
          switch (s.tag) {
            case 3:
              s = s.stateNode.context;
              break t;
            case 1:
              if (hf(s.type)) {
                s = s.stateNode.__reactInternalMemoizedMergedChildContext;
                break t;
              }
          }
          s = s.return;
        } while (null !== s);
        throw Error($u(171));
      }
      if (1 === n.tag) {
        var l = n.type;
        if (hf(l)) {
          n = vf(n, l, s);
          break e;
        }
      }
      n = s;
    } else n = js;
    return (
      null === t.context ? (t.context = n) : (t.pendingContext = n),
      ((t = Nf(i, a)).payload = { element: e }),
      null !== (r = void 0 === r ? null : r) && (t.callback = r),
      Uf(o, t),
      gh(o, i),
      i
    );
  }
  function ng(e) {
    if (!(e = e.current).child) return null;
    switch (e.child.tag) {
      case 5:
      default:
        return e.child.stateNode;
    }
  }
  function rg(e, t) {
    null !== (e = e.memoizedState) &&
      null !== e.dehydrated &&
      e.retryTime < t &&
      (e.retryTime = t);
  }
  function og(e, t) {
    rg(e, t), (e = e.alternate) && rg(e, t);
  }
  function ig(e, t, n) {
    var r = new Qh(e, t, (n = null != n && !0 === n.hydrate)),
      o = qh(3, null, null, 2 === t ? 7 : 1 === t ? 3 : 0);
    (r.current = o),
      (o.stateNode = r),
      Mf(o),
      (e[ja] = r.current),
      n &&
        0 !== t &&
        (function (e, t) {
          var n = Mc(t);
          ha.forEach(function (e) {
            Yc(e, t, n);
          }),
            ga.forEach(function (e) {
              Yc(e, t, n);
            });
        })(0, 9 === e.nodeType ? e : e.ownerDocument),
      (this._internalRoot = r);
  }
  function ag(e) {
    return !(
      !e ||
      (1 !== e.nodeType &&
        9 !== e.nodeType &&
        11 !== e.nodeType &&
        (8 !== e.nodeType || " react-mount-point-unstable " !== e.nodeValue))
    );
  }
  function sg(e, t, n, r, o) {
    var i = n._reactRootContainer;
    if (i) {
      var a = i._internalRoot;
      if ("function" == typeof o) {
        var s = o;
        o = function () {
          var e = ng(a);
          s.call(e);
        };
      }
      tg(t, a, e, o);
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
            return new ig(e, 0, t ? { hydrate: !0 } : void 0);
          })(n, r)),
        (a = i._internalRoot),
        "function" == typeof o)
      ) {
        var l = o;
        o = function () {
          var e = ng(a);
          l.call(e);
        };
      }
      Sh(function () {
        tg(t, a, e, o);
      });
    }
    return ng(a);
  }
  function lg(e, t, n) {
    var r =
      3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
    return {
      $$typeof: Ii,
      key: null == r ? null : "" + r,
      children: e,
      containerInfo: t,
      implementation: n,
    };
  }
  function ug(e, t) {
    var n =
      2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
    if (!ag(t)) throw Error($u(200));
    return lg(e, t, null, n);
  }
  function cg() {
    if (((Jo = {}), (Qo = Gt()), (Ko = De()), Yo(), !Qo)) throw Error($u(227));
    var e;
    (Xo = !1),
      (Zo = null),
      (ei = !1),
      (ti = null),
      (ni = {
        onError: function (e) {
          (Xo = !0), (Zo = e);
        },
      }),
      (ri = null),
      (oi = null),
      (ii = null),
      (ai = null),
      (si = {}),
      (li = []),
      (ui = {}),
      (ci = {}),
      (di = {}),
      (fi = !(
        "undefined" == typeof window ||
        void 0 === window.document ||
        void 0 === window.document.createElement
      )),
      (pi = null),
      (hi = null),
      (gi = null),
      (mi = nc),
      (vi = !1),
      (bi = !1),
      (yi =
        /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/),
      (wi = Object.prototype.hasOwnProperty),
      (_i = {}),
      (Si = {}),
      (xi = {}),
      "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
        .split(" ")
        .forEach(function (e) {
          xi[e] = new sc(e, 0, !1, e, null, !1);
        }),
      [
        ["acceptCharset", "accept-charset"],
        ["className", "class"],
        ["htmlFor", "for"],
        ["httpEquiv", "http-equiv"],
      ].forEach(function (e) {
        var t = e[0];
        xi[t] = new sc(t, 1, !1, e[1], null, !1);
      }),
      ["contentEditable", "draggable", "spellCheck", "value"].forEach(function (
        e
      ) {
        xi[e] = new sc(e, 2, !1, e.toLowerCase(), null, !1);
      }),
      [
        "autoReverse",
        "externalResourcesRequired",
        "focusable",
        "preserveAlpha",
      ].forEach(function (e) {
        xi[e] = new sc(e, 2, !1, e, null, !1);
      }),
      "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
        .split(" ")
        .forEach(function (e) {
          xi[e] = new sc(e, 3, !1, e.toLowerCase(), null, !1);
        }),
      ["checked", "multiple", "muted", "selected"].forEach(function (e) {
        xi[e] = new sc(e, 3, !0, e, null, !1);
      }),
      ["capture", "download"].forEach(function (e) {
        xi[e] = new sc(e, 4, !1, e, null, !1);
      }),
      ["cols", "rows", "size", "span"].forEach(function (e) {
        xi[e] = new sc(e, 6, !1, e, null, !1);
      }),
      ["rowSpan", "start"].forEach(function (e) {
        xi[e] = new sc(e, 5, !1, e.toLowerCase(), null, !1);
      }),
      (Pi = /[\-:]([a-z])/g),
      "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
        .split(" ")
        .forEach(function (e) {
          var t = e.replace(Pi, lc);
          xi[t] = new sc(t, 1, !1, e, null, !1);
        }),
      "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
        .split(" ")
        .forEach(function (e) {
          var t = e.replace(Pi, lc);
          xi[t] = new sc(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1);
        }),
      ["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
        var t = e.replace(Pi, lc);
        xi[t] = new sc(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1);
      }),
      ["tabIndex", "crossOrigin"].forEach(function (e) {
        xi[e] = new sc(e, 1, !1, e.toLowerCase(), null, !1);
      }),
      (xi.xlinkHref = new sc(
        "xlinkHref",
        1,
        !1,
        "xlink:href",
        "http://www.w3.org/1999/xlink",
        !0
      )),
      ["src", "href", "action", "formAction"].forEach(function (e) {
        xi[e] = new sc(e, 1, !1, e.toLowerCase(), null, !0);
      }),
      (ki =
        Qo.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED).hasOwnProperty(
        "ReactCurrentDispatcher"
      ) || (ki.ReactCurrentDispatcher = { current: null }),
      ki.hasOwnProperty("ReactCurrentBatchConfig") ||
        (ki.ReactCurrentBatchConfig = { suspense: null }),
      (Di = /^(.*)[\\\/]/),
      (Ei = "function" == typeof Symbol && Symbol.for),
      (Ti = Ei ? Symbol.for("react.element") : 60103),
      (Ii = Ei ? Symbol.for("react.portal") : 60106),
      (Ci = Ei ? Symbol.for("react.fragment") : 60107),
      (Ai = Ei ? Symbol.for("react.strict_mode") : 60108),
      (Fi = Ei ? Symbol.for("react.profiler") : 60114),
      (Oi = Ei ? Symbol.for("react.provider") : 60109),
      (Mi = Ei ? Symbol.for("react.context") : 60110),
      (Ri = Ei ? Symbol.for("react.concurrent_mode") : 60111),
      (Ni = Ei ? Symbol.for("react.forward_ref") : 60112),
      (Ui = Ei ? Symbol.for("react.suspense") : 60113),
      (Bi = Ei ? Symbol.for("react.suspense_list") : 60120),
      (Li = Ei ? Symbol.for("react.memo") : 60115),
      (ji = Ei ? Symbol.for("react.lazy") : 60116),
      (Vi = Ei ? Symbol.for("react.block") : 60121),
      (Hi = "function" == typeof Symbol && Symbol.iterator),
      (qi = {
        html: "http://www.w3.org/1999/xhtml",
        mathml: "http://www.w3.org/1998/Math/MathML",
        svg: "http://www.w3.org/2000/svg",
      }),
      (e = function (e, t) {
        if (e.namespaceURI !== qi.svg || "innerHTML" in e) e.innerHTML = t;
        else {
          for (
            (zi = zi || document.createElement("div")).innerHTML =
              "<svg>" + t.valueOf().toString() + "</svg>",
              t = zi.firstChild;
            e.firstChild;

          )
            e.removeChild(e.firstChild);
          for (; t.firstChild; ) e.appendChild(t.firstChild);
        }
      }),
      (Gi =
        "undefined" != typeof MSApp && MSApp.execUnsafeLocalFunction
          ? function (t, n, r, o) {
              MSApp.execUnsafeLocalFunction(function () {
                return e(t, n);
              });
            }
          : e),
      ($i = {
        animationend: Fc("Animation", "AnimationEnd"),
        animationiteration: Fc("Animation", "AnimationIteration"),
        animationstart: Fc("Animation", "AnimationStart"),
        transitionend: Fc("Transition", "TransitionEnd"),
      }),
      (Wi = {}),
      (Yi = {}),
      fi &&
        ((Yi = document.createElement("div").style),
        "AnimationEvent" in window ||
          (delete $i.animationend.animation,
          delete $i.animationiteration.animation,
          delete $i.animationstart.animation),
        "TransitionEvent" in window || delete $i.transitionend.transition),
      (Ji = Oc("animationend")),
      (Qi = Oc("animationiteration")),
      (Ki = Oc("animationstart")),
      (Xi = Oc("transitionend")),
      (Zi =
        "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange seeked seeking stalled suspend timeupdate volumechange waiting".split(
          " "
        )),
      (ea = new ("function" == typeof WeakMap ? WeakMap : Map)()),
      (ta = null),
      (na = []),
      (aa = !1),
      (sa = []),
      (la = null),
      (ua = null),
      (ca = null),
      (da = new Map()),
      (fa = new Map()),
      (pa = []),
      (ha =
        "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput close cancel copy cut paste click change contextmenu reset submit".split(
          " "
        )),
      (ga =
        "focus blur dragenter dragleave mouseover mouseout pointerover pointerout gotpointercapture lostpointercapture".split(
          " "
        )),
      (ma = {}),
      (va = new Map()),
      (ba = new Map()),
      (ya = [
        "abort",
        "abort",
        Ji,
        "animationEnd",
        Qi,
        "animationIteration",
        Ki,
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
        Xi,
        "transitionEnd",
        "waiting",
        "waiting",
      ]),
      od(
        "blur blur cancel cancel click click close close contextmenu contextMenu copy copy cut cut auxclick auxClick dblclick doubleClick dragend dragEnd dragstart dragStart drop drop focus focus input input invalid invalid keydown keyDown keypress keyPress keyup keyUp mousedown mouseDown mouseup mouseUp paste paste pause pause play play pointercancel pointerCancel pointerdown pointerDown pointerup pointerUp ratechange rateChange reset reset seeked seeked submit submit touchcancel touchCancel touchend touchEnd touchstart touchStart volumechange volumeChange".split(
          " "
        ),
        0
      ),
      od(
        "drag drag dragenter dragEnter dragexit dragExit dragleave dragLeave dragover dragOver mousemove mouseMove mouseout mouseOut mouseover mouseOver pointermove pointerMove pointerout pointerOut pointerover pointerOver scroll scroll toggle toggle touchmove touchMove wheel wheel".split(
          " "
        ),
        1
      ),
      od(ya, 2);
    for (
      wa =
        "change selectionchange textInput compositionstart compositionend compositionupdate".split(
          " "
        ),
        _a = 0;
      _a < wa.length;
      _a++
    )
      ba.set(wa[_a], 0);
    if (
      ((Sa = Yo().unstable_UserBlockingPriority),
      (xa = Yo().unstable_runWithPriority),
      (Pa = !0),
      (ka = {
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
      (Da = ["Webkit", "ms", "Moz", "O"]),
      Object.keys(ka).forEach(function (e) {
        Da.forEach(function (t) {
          (t = t + e.charAt(0).toUpperCase() + e.substring(1)), (ka[t] = ka[e]);
        });
      }),
      (Ea = Ko(
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
      (Ta = qi.html),
      (Ia = "$"),
      (Ca = "/$"),
      (Aa = "$?"),
      (Fa = "$!"),
      (Oa = null),
      (Ma = null),
      (Ra = "function" == typeof setTimeout ? setTimeout : void 0),
      (Na = "function" == typeof clearTimeout ? clearTimeout : void 0),
      (Ua = Math.random().toString(36).slice(2)),
      (Ba = "__reactInternalInstance$" + Ua),
      (La = "__reactEventHandlers$" + Ua),
      (ja = "__reactContainere$" + Ua),
      (Va = null),
      (Ha = null),
      (qa = null),
      Ko(Vd.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var e = this.nativeEvent;
          e &&
            (e.preventDefault
              ? e.preventDefault()
              : "unknown" != typeof e.returnValue && (e.returnValue = !1),
            (this.isDefaultPrevented = Ld));
        },
        stopPropagation: function () {
          var e = this.nativeEvent;
          e &&
            (e.stopPropagation
              ? e.stopPropagation()
              : "unknown" != typeof e.cancelBubble && (e.cancelBubble = !0),
            (this.isPropagationStopped = Ld));
        },
        persist: function () {
          this.isPersistent = Ld;
        },
        isPersistent: jd,
        destructor: function () {
          var e,
            t = this.constructor.Interface;
          for (e in t) this[e] = null;
          (this.nativeEvent = this._targetInst = this.dispatchConfig = null),
            (this.isPropagationStopped = this.isDefaultPrevented = jd),
            (this._dispatchInstances = this._dispatchListeners = null);
        },
      }),
      (Vd.Interface = {
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
      (Vd.extend = function (e) {
        function t() {}
        function n() {
          return r.apply(this, arguments);
        }
        var r = this;
        t.prototype = r.prototype;
        var o = new t();
        return (
          Ko(o, n.prototype),
          (n.prototype = o),
          (n.prototype.constructor = n),
          (n.Interface = Ko({}, r.Interface, e)),
          (n.extend = r.extend),
          zd(n),
          n
        );
      }),
      zd(Vd),
      (za = Vd.extend({ data: null })),
      (Ga = Vd.extend({ data: null })),
      ($a = [9, 13, 27, 32]),
      (Wa = fi && "CompositionEvent" in window),
      (Ya = null),
      fi && "documentMode" in document && (Ya = document.documentMode),
      (Ja = fi && "TextEvent" in window && !Ya),
      (Qa = fi && (!Wa || (Ya && 8 < Ya && 11 >= Ya))),
      (Ka = String.fromCharCode(32)),
      (Xa = {
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
      (Za = !1),
      (es = !1),
      (ts = {
        eventTypes: Xa,
        extractEvents: function (e, t, n, r) {
          var o;
          if (Wa)
            e: {
              switch (e) {
                case "compositionstart":
                  var i = Xa.compositionStart;
                  break e;
                case "compositionend":
                  i = Xa.compositionEnd;
                  break e;
                case "compositionupdate":
                  i = Xa.compositionUpdate;
                  break e;
              }
              i = void 0;
            }
          else
            es
              ? Gd(e, n) && (i = Xa.compositionEnd)
              : "keydown" === e &&
                229 === n.keyCode &&
                (i = Xa.compositionStart);
          return (
            i
              ? (Qa &&
                  "ko" !== n.locale &&
                  (es || i !== Xa.compositionStart
                    ? i === Xa.compositionEnd && es && (o = Bd())
                    : ((Ha = "value" in (Va = r) ? Va.value : Va.textContent),
                      (es = !0))),
                (i = za.getPooled(i, t, n, r)),
                o ? (i.data = o) : null !== (o = $d(n)) && (i.data = o),
                Ud(i),
                (o = i))
              : (o = null),
            (e = Ja
              ? (function (e, t) {
                  switch (e) {
                    case "compositionend":
                      return $d(t);
                    case "keypress":
                      return 32 !== t.which ? null : ((Za = !0), Ka);
                    case "textInput":
                      return (e = t.data) === Ka && Za ? null : e;
                    default:
                      return null;
                  }
                })(e, n)
              : (function (e, t) {
                  if (es)
                    return "compositionend" === e || (!Wa && Gd(e, t))
                      ? ((e = Bd()), (qa = Ha = Va = null), (es = !1), e)
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
                      return Qa && "ko" !== t.locale ? null : t.data;
                    default:
                      return null;
                  }
                })(e, n))
              ? (((t = Ga.getPooled(Xa.beforeInput, t, n, r)).data = e), Ud(t))
              : (t = null),
            null === o ? t : null === t ? o : [o, t]
          );
        },
      }),
      (ns = {
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
      (rs = {
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
      (os = null),
      (is = null),
      (as = !1),
      fi &&
        (as =
          zc("input") && (!document.documentMode || 9 < document.documentMode)),
      (ss = {
        eventTypes: rs,
        _isInputEventSupported: as,
        extractEvents: function (e, t, n, r) {
          var o = t ? Id(t) : window,
            i = o.nodeName && o.nodeName.toLowerCase();
          if ("select" === i || ("input" === i && "file" === o.type))
            var a = Kd;
          else if (Wd(o))
            if (as) a = rf;
            else {
              a = tf;
              var s = ef;
            }
          else
            (i = o.nodeName) &&
              "input" === i.toLowerCase() &&
              ("checkbox" === o.type || "radio" === o.type) &&
              (a = nf);
          if (a && (a = a(e, t))) return Yd(a, n, r);
          s && s(e, o, t),
            "blur" === e &&
              (e = o._wrapperState) &&
              e.controlled &&
              "number" === o.type &&
              Sc(o, "number", o.value);
        },
      }),
      (ls = Vd.extend({ view: null, detail: null })),
      (us = {
        Alt: "altKey",
        Control: "ctrlKey",
        Meta: "metaKey",
        Shift: "shiftKey",
      }),
      (cs = 0),
      (ds = 0),
      (fs = !1),
      (ps = !1),
      (hs = ls.extend({
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
        getModifierState: af,
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
          var t = cs;
          return (
            (cs = e.screenX),
            fs ? ("mousemove" === e.type ? e.screenX - t : 0) : ((fs = !0), 0)
          );
        },
        movementY: function (e) {
          if ("movementY" in e) return e.movementY;
          var t = ds;
          return (
            (ds = e.screenY),
            ps ? ("mousemove" === e.type ? e.screenY - t : 0) : ((ps = !0), 0)
          );
        },
      })),
      (gs = hs.extend({
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
      (vs = {
        eventTypes: (ms = {
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
                (t = (t = n.relatedTarget || n.toElement) ? Ed(t) : null) &&
                (t !== Rc(t) || (5 !== t.tag && 6 !== t.tag)) &&
                (t = null))
            : (a = null);
          if (a === t) return null;
          if ("mouseout" === e || "mouseover" === e)
            var s = hs,
              l = ms.mouseLeave,
              u = ms.mouseEnter,
              c = "mouse";
          else
            ("pointerout" !== e && "pointerover" !== e) ||
              ((s = gs),
              (l = ms.pointerLeave),
              (u = ms.pointerEnter),
              (c = "pointer"));
          if (
            ((e = null == a ? i : Id(a)),
            (i = null == t ? i : Id(t)),
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
              for (u = c, a = 0, e = s = r; e; e = Ad(e)) a++;
              for (e = 0, t = u; t; t = Ad(t)) e++;
              for (; 0 < a - e; ) (s = Ad(s)), a--;
              for (; 0 < e - a; ) (u = Ad(u)), e--;
              for (; a--; ) {
                if (s === u || s === u.alternate) break e;
                (s = Ad(s)), (u = Ad(u));
              }
              s = null;
            }
          else s = null;
          for (
            u = s, s = [];
            r && r !== u && (null === (a = r.alternate) || a !== u);

          )
            s.push(r), (r = Ad(r));
          for (
            r = [];
            c && c !== u && (null === (a = c.alternate) || a !== u);

          )
            r.push(c), (c = Ad(c));
          for (c = 0; c < s.length; c++) Rd(s[c], "bubbled", l);
          for (c = r.length; 0 < c--; ) Rd(r[c], "captured", n);
          return 0 == (64 & o) ? [l] : [l, n];
        },
      }),
      (bs = "function" == typeof Object.is ? Object.is : sf),
      (ys = Object.prototype.hasOwnProperty),
      (ws = fi && "documentMode" in document && 11 >= document.documentMode),
      (_s = {
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
      (Ss = null),
      (xs = null),
      (Ps = null),
      (ks = !1),
      (Ds = {
        eventTypes: _s,
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
              (o = Mc(o)), (i = di.onSelect);
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
          switch (((o = t ? Id(t) : window), e)) {
            case "focus":
              (Wd(o) || "true" === o.contentEditable) &&
                ((Ss = o), (xs = t), (Ps = null));
              break;
            case "blur":
              Ps = xs = Ss = null;
              break;
            case "mousedown":
              ks = !0;
              break;
            case "contextmenu":
            case "mouseup":
            case "dragend":
              return (ks = !1), uf(n, r);
            case "selectionchange":
              if (ws) break;
            case "keydown":
            case "keyup":
              return uf(n, r);
          }
          return null;
        },
      }),
      (Es = Vd.extend({
        animationName: null,
        elapsedTime: null,
        pseudoElement: null,
      })),
      (Ts = Vd.extend({
        clipboardData: function (e) {
          return "clipboardData" in e ? e.clipboardData : window.clipboardData;
        },
      })),
      (Is = ls.extend({ relatedTarget: null })),
      (Cs = {
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
      (As = {
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
      (Fs = ls.extend({
        key: function (e) {
          if (e.key) {
            var t = Cs[e.key] || e.key;
            if ("Unidentified" !== t) return t;
          }
          return "keypress" === e.type
            ? 13 === (e = cf(e))
              ? "Enter"
              : String.fromCharCode(e)
            : "keydown" === e.type || "keyup" === e.type
            ? As[e.keyCode] || "Unidentified"
            : "";
        },
        location: null,
        ctrlKey: null,
        shiftKey: null,
        altKey: null,
        metaKey: null,
        repeat: null,
        locale: null,
        getModifierState: af,
        charCode: function (e) {
          return "keypress" === e.type ? cf(e) : 0;
        },
        keyCode: function (e) {
          return "keydown" === e.type || "keyup" === e.type ? e.keyCode : 0;
        },
        which: function (e) {
          return "keypress" === e.type
            ? cf(e)
            : "keydown" === e.type || "keyup" === e.type
            ? e.keyCode
            : 0;
        },
      })),
      (Os = hs.extend({ dataTransfer: null })),
      (Ms = ls.extend({
        touches: null,
        targetTouches: null,
        changedTouches: null,
        altKey: null,
        metaKey: null,
        ctrlKey: null,
        shiftKey: null,
        getModifierState: af,
      })),
      (Rs = Vd.extend({
        propertyName: null,
        elapsedTime: null,
        pseudoElement: null,
      })),
      (Ns = hs.extend({
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
      (Us = {
        eventTypes: ma,
        extractEvents: function (e, t, n, r) {
          var o = va.get(e);
          if (!o) return null;
          switch (e) {
            case "keypress":
              if (0 === cf(n)) return null;
            case "keydown":
            case "keyup":
              e = Fs;
              break;
            case "blur":
            case "focus":
              e = Is;
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
              e = hs;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              e = Os;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              e = Ms;
              break;
            case Ji:
            case Qi:
            case Ki:
              e = Es;
              break;
            case Xi:
              e = Rs;
              break;
            case "scroll":
              e = ls;
              break;
            case "wheel":
              e = Ns;
              break;
            case "copy":
            case "cut":
            case "paste":
              e = Ts;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              e = gs;
              break;
            default:
              e = Vd;
          }
          return Ud((t = e.getPooled(o, t, n, r))), t;
        },
      }),
      ai)
    )
      throw Error($u(101));
    (ai = Array.prototype.slice.call(
      "ResponderEventPlugin SimpleEventPlugin EnterLeaveEventPlugin ChangeEventPlugin SelectEventPlugin BeforeInputEventPlugin".split(
        " "
      )
    )),
      Qu(),
      (ri = Cd),
      (oi = Td),
      (ii = Id),
      Xu({
        SimpleEventPlugin: Us,
        EnterLeaveEventPlugin: vs,
        ChangeEventPlugin: ss,
        SelectEventPlugin: Ds,
        BeforeInputEventPlugin: ts,
      }),
      (Bs = []),
      (Ls = -1),
      (Vs = { current: (js = {}) }),
      (Hs = { current: !1 }),
      (qs = js),
      (zs = Yo().unstable_runWithPriority),
      (Gs = Yo().unstable_scheduleCallback),
      ($s = Yo().unstable_cancelCallback),
      (Ws = Yo().unstable_requestPaint),
      (Ys = Yo().unstable_now),
      (Js = Yo().unstable_getCurrentPriorityLevel),
      (Qs = Yo().unstable_ImmediatePriority),
      (Ks = Yo().unstable_UserBlockingPriority),
      (Xs = Yo().unstable_NormalPriority),
      (Zs = Yo().unstable_LowPriority),
      (el = Yo().unstable_IdlePriority),
      (tl = {}),
      (nl = Yo().unstable_shouldYield),
      (rl = void 0 !== Ws ? Ws : function () {}),
      (ol = null),
      (il = null),
      (al = !1),
      (sl = Ys()),
      (ll =
        1e4 > sl
          ? Ys
          : function () {
              return Ys() - sl;
            }),
      (ul = { current: null }),
      (cl = null),
      (dl = null),
      (fl = null),
      (pl = !1),
      (hl = ki.ReactCurrentBatchConfig),
      (gl = new Qo.Component().refs),
      (ml = {
        isMounted: function (e) {
          return !!(e = e._reactInternalFiber) && Rc(e) === e;
        },
        enqueueSetState: function (e, t, n) {
          e = e._reactInternalFiber;
          var r = ph(),
            o = hl.suspense;
          ((o = Nf((r = hh(r, e, o)), o)).payload = t),
            null != n && (o.callback = n),
            Uf(e, o),
            gh(e, r);
        },
        enqueueReplaceState: function (e, t, n) {
          e = e._reactInternalFiber;
          var r = ph(),
            o = hl.suspense;
          ((o = Nf((r = hh(r, e, o)), o)).tag = 1),
            (o.payload = t),
            null != n && (o.callback = n),
            Uf(e, o),
            gh(e, r);
        },
        enqueueForceUpdate: function (e, t) {
          e = e._reactInternalFiber;
          var n = ph(),
            r = hl.suspense;
          ((r = Nf((n = hh(n, e, r)), r)).tag = 2),
            null != t && (r.callback = t),
            Uf(e, r),
            gh(e, n);
        },
      }),
      (vl = Array.isArray),
      (bl = Yf(!0)),
      (yl = Yf(!1)),
      (_l = { current: (wl = {}) }),
      (Sl = { current: wl }),
      (xl = { current: wl }),
      (Pl = { current: 0 }),
      (kl = ki.ReactCurrentDispatcher),
      (Dl = ki.ReactCurrentBatchConfig),
      (El = 0),
      (Tl = null),
      (Il = null),
      (Cl = null),
      (Al = !1),
      (Fl = {
        readContext: Of,
        useCallback: np,
        useContext: np,
        useEffect: np,
        useImperativeHandle: np,
        useLayoutEffect: np,
        useMemo: np,
        useReducer: np,
        useRef: np,
        useState: np,
        useDebugValue: np,
        useResponder: np,
        useDeferredValue: np,
        useTransition: np,
      }),
      (Ol = {
        readContext: Of,
        useCallback: _p,
        useContext: Of,
        useEffect: gp,
        useImperativeHandle: function (e, t, n) {
          return (
            (n = null != n ? n.concat([e]) : null),
            pp(4, 2, bp.bind(null, t, e), n)
          );
        },
        useLayoutEffect: function (e, t) {
          return pp(4, 2, e, t);
        },
        useMemo: function (e, t) {
          var n = ip();
          return (
            (t = void 0 === t ? null : t),
            (e = e()),
            (n.memoizedState = [e, t]),
            e
          );
        },
        useReducer: function (e, t, n) {
          var r = ip();
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
              kp.bind(null, Tl, e)),
            [r.memoizedState, e]
          );
        },
        useRef: function (e) {
          return (e = { current: e }), (ip().memoizedState = e);
        },
        useState: cp,
        useDebugValue: wp,
        useResponder: tp,
        useDeferredValue: function (e, t) {
          var n = cp(e),
            r = n[0],
            o = n[1];
          return (
            gp(
              function () {
                var n = Dl.suspense;
                Dl.suspense = void 0 === t ? null : t;
                try {
                  o(e);
                } finally {
                  Dl.suspense = n;
                }
              },
              [e, t]
            ),
            r
          );
        },
        useTransition: function (e) {
          var t = cp(!1),
            n = t[0];
          return (t = t[1]), [_p(Pp.bind(null, t, e), [t, e]), n];
        },
      }),
      (Ml = {
        readContext: Of,
        useCallback: Sp,
        useContext: Of,
        useEffect: mp,
        useImperativeHandle: yp,
        useLayoutEffect: vp,
        useMemo: xp,
        useReducer: lp,
        useRef: fp,
        useState: function () {
          return lp(sp);
        },
        useDebugValue: wp,
        useResponder: tp,
        useDeferredValue: function (e, t) {
          var n = lp(sp),
            r = n[0],
            o = n[1];
          return (
            mp(
              function () {
                var n = Dl.suspense;
                Dl.suspense = void 0 === t ? null : t;
                try {
                  o(e);
                } finally {
                  Dl.suspense = n;
                }
              },
              [e, t]
            ),
            r
          );
        },
        useTransition: function (e) {
          var t = lp(sp),
            n = t[0];
          return (t = t[1]), [Sp(Pp.bind(null, t, e), [t, e]), n];
        },
      }),
      (Rl = {
        readContext: Of,
        useCallback: Sp,
        useContext: Of,
        useEffect: mp,
        useImperativeHandle: yp,
        useLayoutEffect: vp,
        useMemo: xp,
        useReducer: up,
        useRef: fp,
        useState: function () {
          return up(sp);
        },
        useDebugValue: wp,
        useResponder: tp,
        useDeferredValue: function (e, t) {
          var n = up(sp),
            r = n[0],
            o = n[1];
          return (
            mp(
              function () {
                var n = Dl.suspense;
                Dl.suspense = void 0 === t ? null : t;
                try {
                  o(e);
                } finally {
                  Dl.suspense = n;
                }
              },
              [e, t]
            ),
            r
          );
        },
        useTransition: function (e) {
          var t = up(sp),
            n = t[0];
          return (t = t[1]), [Sp(Pp.bind(null, t, e), [t, e]), n];
        },
      }),
      (Nl = null),
      (Ul = null),
      (Bl = !1),
      (Ll = ki.ReactCurrentOwner),
      (jl = !1),
      (Vl = { dehydrated: null, retryTime: 0 }),
      (Hl = function (e, t) {
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
      (ql = function () {}),
      (zl = function (e, t, n, r, o) {
        var i = e.memoizedProps;
        if (i !== r) {
          var a,
            s,
            l = t.stateNode;
          switch ((Jf(_l.current), (e = null), n)) {
            case "input":
              (i = vc(l, i)), (r = vc(l, r)), (e = []);
              break;
            case "option":
              (i = xc(l, i)), (r = xc(l, r)), (e = []);
              break;
            case "select":
              (i = Ko({}, i, { value: void 0 })),
                (r = Ko({}, r, { value: void 0 })),
                (e = []);
              break;
            case "textarea":
              (i = kc(l, i)), (r = kc(l, r)), (e = []);
              break;
            default:
              "function" != typeof i.onClick &&
                "function" == typeof r.onClick &&
                (l.onclick = md);
          }
          for (a in (pd(n, r), (n = null), i))
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
                  (ci.hasOwnProperty(a)
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
                    (ci.hasOwnProperty(a)
                      ? (null != u && gd(o, a), e || l === u || (e = []))
                      : (e = e || []).push(a, u));
          }
          n && (e = e || []).push("style", n),
            (o = e),
            (t.updateQueue = o) && (t.effectTag |= 4);
        }
      }),
      (Gl = function (e, t, n, r) {
        n !== r && (t.effectTag |= 4);
      }),
      ($l = "function" == typeof WeakSet ? WeakSet : Set),
      (Wl = "function" == typeof WeakMap ? WeakMap : Map),
      (Yl = Math.ceil),
      (Jl = ki.ReactCurrentDispatcher),
      (Ql = ki.ReactCurrentOwner),
      (Xl = 8),
      (Zl = 16),
      (eu = 32),
      (nu = 1),
      (ru = 2),
      (ou = 3),
      (iu = 4),
      (au = 5),
      (su = Kl = 0),
      (lu = null),
      (uu = null),
      (cu = 0),
      (du = tu = 0),
      (fu = null),
      (pu = 1073741823),
      (hu = 1073741823),
      (gu = null),
      (mu = 0),
      (vu = !1),
      (bu = 0),
      (yu = 500),
      (wu = null),
      (_u = !1),
      (Su = null),
      (xu = null),
      (Pu = !1),
      (ku = null),
      (Du = 90),
      (Eu = null),
      (Tu = 0),
      (Iu = null),
      (Cu = 0),
      (Au = function (e, t, n) {
        var r = t.expirationTime;
        if (null !== e) {
          var o = t.pendingProps;
          if (e.memoizedProps !== o || Hs.current) jl = !0;
          else {
            if (r < n) {
              switch (((jl = !1), t.tag)) {
                case 3:
                  jp(t), Ap();
                  break;
                case 5:
                  if ((Xf(t), 4 & t.mode && 1 !== n && o.hidden))
                    return (t.expirationTime = t.childExpirationTime = 1), null;
                  break;
                case 1:
                  hf(t.type) && bf(t);
                  break;
                case 4:
                  Qf(t, t.stateNode.containerInfo);
                  break;
                case 10:
                  (r = t.memoizedProps.value),
                    (o = t.type._context),
                    ff(ul, o._currentValue),
                    (o._currentValue = r);
                  break;
                case 13:
                  if (null !== t.memoizedState)
                    return 0 !== (r = t.child.childExpirationTime) && r >= n
                      ? Vp(e, t, n)
                      : (ff(Pl, 1 & Pl.current),
                        null !== (t = Gp(e, t, n)) ? t.sibling : null);
                  ff(Pl, 1 & Pl.current);
                  break;
                case 19:
                  if (
                    ((r = t.childExpirationTime >= n), 0 != (64 & e.effectTag))
                  ) {
                    if (r) return zp(e, t, n);
                    t.effectTag |= 64;
                  }
                  if (
                    (null !== (o = t.memoizedState) &&
                      ((o.rendering = null), (o.tail = null)),
                    ff(Pl, Pl.current),
                    !r)
                  )
                    return null;
              }
              return Gp(e, t, n);
            }
            jl = !1;
          }
        } else jl = !1;
        switch (((t.expirationTime = 0), t.tag)) {
          case 2:
            if (
              ((r = t.type),
              null !== e &&
                ((e.alternate = null),
                (t.alternate = null),
                (t.effectTag |= 2)),
              (e = t.pendingProps),
              (o = pf(t, Vs.current)),
              Ff(t, n),
              (o = op(null, t, r, e, o, n)),
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
                hf(r))
              ) {
                var i = !0;
                bf(t);
              } else i = !1;
              (t.memoizedState =
                null !== o.state && void 0 !== o.state ? o.state : null),
                Mf(t);
              var a = r.getDerivedStateFromProps;
              "function" == typeof a && Vf(t, r, a, e),
                (o.updater = ml),
                (t.stateNode = o),
                (o._reactInternalFiber = t),
                Gf(t, r, e, n),
                (t = Lp(null, t, r, !0, i, n));
            } else (t.tag = 0), Fp(null, t, o, n), (t = t.child);
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
                    if ("function" == typeof e) return zh(e) ? 1 : 0;
                    if (null != e) {
                      if ((e = e.$$typeof) === Ni) return 11;
                      if (e === Li) return 14;
                    }
                    return 2;
                  })(o)),
                (e = Tf(o, e)),
                i)
              ) {
                case 0:
                  t = Up(null, t, o, e, n);
                  break e;
                case 1:
                  t = Bp(null, t, o, e, n);
                  break e;
                case 11:
                  t = Op(null, t, o, e, n);
                  break e;
                case 14:
                  t = Mp(null, t, o, Tf(o.type, e), r, n);
                  break e;
              }
              throw Error($u(306, o, ""));
            }
            return t;
          case 0:
            return (
              (r = t.type),
              (o = t.pendingProps),
              Up(e, t, r, (o = t.elementType === r ? o : Tf(r, o)), n)
            );
          case 1:
            return (
              (r = t.type),
              (o = t.pendingProps),
              Bp(e, t, r, (o = t.elementType === r ? o : Tf(r, o)), n)
            );
          case 3:
            if ((jp(t), (r = t.updateQueue), null === e || null === r))
              throw Error($u(282));
            if (
              ((r = t.pendingProps),
              (o = null !== (o = t.memoizedState) ? o.element : null),
              Rf(e, t),
              Lf(t, r, null, n),
              (r = t.memoizedState.element) === o)
            )
              Ap(), (t = Gp(e, t, n));
            else {
              if (
                ((o = t.stateNode.hydrate) &&
                  ((Ul = kd(t.stateNode.containerInfo.firstChild)),
                  (Nl = t),
                  (o = Bl = !0)),
                o)
              )
                for (n = yl(t, null, r, n), t.child = n; n; )
                  (n.effectTag = (-3 & n.effectTag) | 1024), (n = n.sibling);
              else Fp(e, t, r, n), Ap();
              t = t.child;
            }
            return t;
          case 5:
            return (
              Xf(t),
              null === e && Tp(t),
              (r = t.type),
              (o = t.pendingProps),
              (i = null !== e ? e.memoizedProps : null),
              (a = o.children),
              Pd(r, o)
                ? (a = null)
                : null !== i && Pd(r, i) && (t.effectTag |= 16),
              Np(e, t),
              4 & t.mode && 1 !== n && o.hidden
                ? ((t.expirationTime = t.childExpirationTime = 1), (t = null))
                : (Fp(e, t, a, n), (t = t.child)),
              t
            );
          case 6:
            return null === e && Tp(t), null;
          case 13:
            return Vp(e, t, n);
          case 4:
            return (
              Qf(t, t.stateNode.containerInfo),
              (r = t.pendingProps),
              null === e ? (t.child = bl(t, null, r, n)) : Fp(e, t, r, n),
              t.child
            );
          case 11:
            return (
              (r = t.type),
              (o = t.pendingProps),
              Op(e, t, r, (o = t.elementType === r ? o : Tf(r, o)), n)
            );
          case 7:
            return Fp(e, t, t.pendingProps, n), t.child;
          case 8:
          case 12:
            return Fp(e, t, t.pendingProps.children, n), t.child;
          case 10:
            e: {
              (r = t.type._context),
                (o = t.pendingProps),
                (a = t.memoizedProps),
                (i = o.value);
              var s = t.type._context;
              if ((ff(ul, s._currentValue), (s._currentValue = i), null !== a))
                if (
                  ((s = a.value),
                  0 ===
                    (i = bs(s, i)
                      ? 0
                      : 0 |
                        ("function" == typeof r._calculateChangedBits
                          ? r._calculateChangedBits(s, i)
                          : 1073741823)))
                ) {
                  if (a.children === o.children && !Hs.current) {
                    t = Gp(e, t, n);
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
                            (((u = Nf(n, null)).tag = 2), Uf(s, u)),
                            s.expirationTime < n && (s.expirationTime = n),
                            null !== (u = s.alternate) &&
                              u.expirationTime < n &&
                              (u.expirationTime = n),
                            Af(s.return, n),
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
              Fp(e, t, o.children, n), (t = t.child);
            }
            return t;
          case 9:
            return (
              (o = t.type),
              (r = (i = t.pendingProps).children),
              Ff(t, n),
              (r = r((o = Of(o, i.unstable_observedBits)))),
              (t.effectTag |= 1),
              Fp(e, t, r, n),
              t.child
            );
          case 14:
            return (
              (i = Tf((o = t.type), t.pendingProps)),
              Mp(e, t, o, (i = Tf(o.type, i)), r, n)
            );
          case 15:
            return Rp(e, t, t.type, t.pendingProps, r, n);
          case 17:
            return (
              (r = t.type),
              (o = t.pendingProps),
              (o = t.elementType === r ? o : Tf(r, o)),
              null !== e &&
                ((e.alternate = null),
                (t.alternate = null),
                (t.effectTag |= 2)),
              (t.tag = 1),
              hf(r) ? ((e = !0), bf(t)) : (e = !1),
              Ff(t, n),
              qf(t, r, o),
              Gf(t, r, o, n),
              Lp(null, t, r, !0, e, n)
            );
          case 19:
            return zp(e, t, n);
        }
        throw Error($u(156, t.tag));
      }),
      (Fu = null),
      (Ou = null),
      (ig.prototype.render = function (e) {
        tg(e, this._internalRoot, null, null);
      }),
      (ig.prototype.unmount = function () {
        var e = this._internalRoot,
          t = e.containerInfo;
        tg(null, e, null, function () {
          t[ja] = null;
        });
      }),
      (ra = function (e) {
        if (13 === e.tag) {
          var t = Ef(ph(), 150, 100);
          gh(e, t), og(e, t);
        }
      }),
      (oa = function (e) {
        13 === e.tag && (gh(e, 3), og(e, 3));
      }),
      (ia = function (e) {
        if (13 === e.tag) {
          var t = ph();
          gh(e, (t = hh(t, e, null))), og(e, t);
        }
      }),
      (pi = function (e, t, n) {
        switch (t) {
          case "input":
            if ((wc(e, n), (t = n.name), "radio" === n.type && null != t)) {
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
                  var o = Cd(r);
                  if (!o) throw Error($u(90));
                  mc(r), wc(r, o);
                }
              }
            }
            break;
          case "textarea":
            Ec(e, n);
            break;
          case "select":
            null != (t = n.value) && Pc(e, !!n.multiple, t, !1);
        }
      }),
      (nc = _h),
      (rc = function (e, t, n, r, o) {
        var i = su;
        su |= 4;
        try {
          return Sf(98, e.bind(null, t, n, r, o));
        } finally {
          (su = i) === Kl && kf();
        }
      }),
      (oc = function () {
        (su & (1 | Zl | eu)) === Kl &&
          ((function () {
            if (null !== Eu) {
              var e = Eu;
              (Eu = null),
                e.forEach(function (e, t) {
                  eg(t, e), bh(t);
                }),
                kf();
            }
          })(),
          Nh());
      }),
      (mi = function (e, t) {
        var n = su;
        su |= 2;
        try {
          return e(t);
        } finally {
          (su = n) === Kl && kf();
        }
      }),
      (Mu = {
        Events: [
          Td,
          Id,
          Cd,
          Xu,
          ui,
          Ud,
          function (e) {
            jc(e, Nd);
          },
          ec,
          tc,
          ud,
          Hc,
          Nh,
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
            (Fu = function (e) {
              try {
                t.onCommitFiberRoot(
                  n,
                  e,
                  void 0,
                  64 == (64 & e.current.effectTag)
                );
              } catch (e) {}
            }),
              (Ou = function (e) {
                try {
                  t.onCommitFiberUnmount(n, e);
                } catch (e) {}
              });
          } catch (e) {}
        })(
          Ko({}, e, {
            overrideHookState: null,
            overrideProps: null,
            setSuspenseHandler: null,
            scheduleUpdate: null,
            currentDispatcherRef: ki.ReactCurrentDispatcher,
            findHostInstanceByFiber: function (e) {
              return null === (e = Bc(e)) ? null : e.stateNode;
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
        findFiberByHostInstance: Ed,
        bundleType: 0,
        version: "16.13.1",
        rendererPackageName: "react-dom",
      }),
      (Ru = Mu),
      (Jo.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Ru),
      (Nu = ug),
      (Jo.createPortal = Nu),
      (Uu = function (e) {
        if (null == e) return null;
        if (1 === e.nodeType) return e;
        var t = e._reactInternalFiber;
        if (void 0 === t) {
          if ("function" == typeof e.render) throw Error($u(188));
          throw Error($u(268, Object.keys(e)));
        }
        return (e = null === (e = Bc(t)) ? null : e.stateNode);
      }),
      (Jo.findDOMNode = Uu),
      (Bu = function (e, t) {
        if ((su & (Zl | eu)) !== Kl) throw Error($u(187));
        var n = su;
        su |= 1;
        try {
          return Sf(99, e.bind(null, t));
        } finally {
          (su = n), kf();
        }
      }),
      (Jo.flushSync = Bu),
      (Lu = function (e, t, n) {
        if (!ag(t)) throw Error($u(200));
        return sg(null, e, t, !0, n);
      }),
      (Jo.hydrate = Lu),
      (ju = function (e, t, n) {
        if (!ag(t)) throw Error($u(200));
        return sg(null, e, t, !1, n);
      }),
      (Jo.render = ju),
      (Vu = function (e) {
        if (!ag(e)) throw Error($u(40));
        return (
          !!e._reactRootContainer &&
          (Sh(function () {
            sg(null, null, e, !1, function () {
              (e._reactRootContainer = null), (e[ja] = null);
            });
          }),
          !0)
        );
      }),
      (Jo.unmountComponentAtNode = Vu),
      (Hu = _h),
      (Jo.unstable_batchedUpdates = Hu),
      (qu = function (e, t) {
        return ug(
          e,
          t,
          2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null
        );
      }),
      (Jo.unstable_createPortal = qu),
      (zu = function (e, t, n, r) {
        if (!ag(n)) throw Error($u(200));
        if (null == e || void 0 === e._reactInternalFiber) throw Error($u(38));
        return sg(e, t, n, !1, r);
      }),
      (Jo.unstable_renderSubtreeIntoContainer = zu),
      "16.13.1",
      (Jo.version = "16.13.1");
  }
  var dg,
    fg = {};
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
    Gu || ((Gu = !0), cg()),
    (fg = Jo),
    r({}, "unstable_batchedUpdates", function () {
      return fg.unstable_batchedUpdates;
    }),
    (dg = fg.unstable_batchedUpdates),
    (tn = dg);
  const pg = (e) => (t) =>
      qr((t, n) => e(t, n), null, null, { forwardRef: !0 })(t),
    hg = function (...e) {
      be.dispatch(this, e);
    };
  function gg(e, t) {
    return (t.type = e), (t.dispatch = hg), t;
  }
  const mg = Symbol("isProxy"),
    vg = Symbol("isProxifiedArray");
  let bg = !1;
  function yg(e) {
    if (Array.isArray(e)) {
      const t = e.map(yg);
      return (t[vg] = !0), t;
    }
    if ("[object Object]" !== Object.prototype.toString.call(e)) return e;
    const t = { ...e },
      n = new Set(),
      r = new Proxy(t, {
        get: function (e, r) {
          if (r in t)
            return bg && !n.has(r) && ((t[r] = yg(t[r])), n.add(r)), t[r];
        },
        set: function (e, n, r) {
          return (t[n] = r), !0;
        },
        deleteProperty: function (e, n) {
          return delete t[n], !0;
        },
      });
    return (r[mg] = !0), r;
  }
  function wg(e) {
    if (e && e[vg]) return delete e[vg], e.map(wg);
    if (
      (Array.isArray(e) &&
        e.forEach((t, n) => {
          t && t[mg] && (e[n] = wg(t));
        }),
      !e || !e[mg])
    )
      return e;
    const t = {};
    for (const n in e) t[n] = wg(e[n]);
    return t;
  }
  const _g = gg("influx.set-state", (e, t) => t);
  var Sg = {
      model: be,
      influx: pg,
      action: gg,
      transaction: function (e) {
        const t = (function (e, t) {
          const n = yg(e),
            r = bg;
          return (bg = !0), t(n), (bg = r), wg(n);
        })(be.state, e);
        _g.dispatch(t);
      },
      connect: pg,
    },
    xg = {
      fetch: Ig,
      fetchText: async function (...e) {
        const t = await Ig(...e);
        return await t.text();
      },
      fetchJson: async function (...e) {
        const t = await Ig(...e);
        return await t.json();
      },
      getCache: function () {
        return Pg;
      },
      cleanCache: function () {
        Cg("cleaning fetcher cache"), (Pg = []);
      },
      ignoreCache: function (e = 1) {
        kg += e;
      },
      isIgnoreCache: function () {
        return kg > 0;
      },
    };
  let Pg = [],
    kg = 0;
  const Dg = 2e4,
    Eg = 864e5,
    Tg = !1;
  async function Ig(e, t = {}, n = Dg) {
    return new Promise((r, o) => {
      (async () => {
        let i = setTimeout(() => {
          i && ((i = null), o({ message: "Timed out" }));
        }, n);
        try {
          const n = await (async function (e, t) {
            if (
              (Cg(`fetching ${e}`),
              ((t = t || {}).method = t.method || "GET"),
              t.method && "GET" !== t.method)
            )
              return fetch(e, t);
            if (kg <= 0) {
              const t = Date.now();
              Pg = Pg.filter((e) => t - e.on < Eg);
              const n = Pg.find((t) => t.url === e);
              if (n) return Cg("  fetch cache hit"), n.res.clone();
            } else Cg("  ignoring fetch cache");
            kg > 0 && kg--;
            const n = await fetch(e, t);
            return Pg.push({ url: e, on: Date.now(), res: n.clone() }), n;
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
  function Cg(e) {
    Tg && console.log(`%c${e}`, "color: #00ec91");
  }
  var Ag = xg;
  const Fg = "https://www.instagram.com/",
    Og = {
      maxMentions: 30,
      base: Fg,
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
      home: { url: Fg },
      loginActivity: {
        url: "https://i.instagram.com/api/v1/session/login_activity/?__a=1",
      },
      post: { url: (e) => `https://www.instagram.com/p/${e}/` },
      hashtag: {
        url: (e, { json: t = !1 } = {}) =>
          t
            ? C("https://i.instagram.com/api/v1/tags/web_info", { tag_name: e })
            : `https://www.instagram.com/explore/tags/${e}/`,
      },
      explore: { url: "https://www.instagram.com/explore/grid/" },
      user: { url: (e = null) => (e ? `https://www.instagram.com/${e}/` : Fg) },
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
      locale: { url: Fg, regexp: /"locale":"([^"]+)"/ },
    },
    Mg = { min: 1e3, max: 6e3 },
    Rg = { min: 600, max: 7e3 };
  var Ng = {},
    Ug = {
      on: function (e, t) {
        Vg();
        (Bg[e] || (Bg[e] = [])).push(t);
      },
      off: function (e, t) {
        const n = Bg[e];
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
          chrome.runtime.sendMessage({ [Lg]: e, [jg]: t }, (e) => {
            chrome.runtime.lastError || (n && n(e), r(e));
          });
        });
      },
    };
  const Bg = {},
    Lg = "__$chromeBus.name",
    jg = "__$chromeBus.args";
  function Vg() {
    const e = Vg;
    e.init ||
      ((e.init = !0),
      chrome.runtime.onMessage.addListener((e, t, n) => {
        const r = e["__$chromeBus.name"];
        if (!r) return !1;
        const o = e["__$chromeBus.args"] || [],
          i = Bg[r] || [];
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
  var Hg = Ug,
    qg = {};
  const { model: zg } = Sg,
    Gg = {
      isLoggedIn: function () {
        return !!zg.state.billing.account.token;
      },
      hasPro: function ({ feature: e } = {}) {
        var t;
        return (
          !(
            !u.is.development ||
            !(null === (t = zg.state.experiments) || void 0 === t
              ? void 0
              : t.enabled)
          ) ||
          !!Gg.hasProPaid() ||
          !!Gg.hasProPromocode() ||
          !(!e || !Gg.hasTrialFeature(e))
        );
      },
      hasTrialFeature: function (e = "*") {
        if (!u.features.trial) return !1;
        const t = zg.state.billing.trial;
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
        if (!Gg.isLoggedIn()) return !1;
        const t = zg.state.billing,
          n = Date.now(),
          r = t.optimistic || { on: 0, plan: null };
        if (r.plan === e && r.on <= n && n - r.on <= 36e5) return !0;
        for (const r in u.options.billingPlans) {
          if (e && e !== r) continue;
          const a = u.options.billingPlans[r];
          if (a.isActive) {
            if (a.isActive(zg.state)) return !0;
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
        const e = zg.state.billing.promocode;
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
        const t = zg.state.billing,
          n = (t.subscriptions && t.subscriptions[e]) || {};
        return n.active && "canceled" === n.state
          ? new Date(n.next).toLocaleDateString()
          : null;
      },
    };
  var $g,
    Wg,
    Yg,
    Jg = {},
    Qg = ($g = {});
  function Kg() {
    throw new Error("setTimeout has not been defined");
  }
  function Xg() {
    throw new Error("clearTimeout has not been defined");
  }
  function Zg(e) {
    if (Wg === setTimeout) return setTimeout(e, 0);
    if ((Wg === Kg || !Wg) && setTimeout)
      return (Wg = setTimeout), setTimeout(e, 0);
    try {
      return Wg(e, 0);
    } catch (t) {
      try {
        return Wg.call(null, e, 0);
      } catch (t) {
        return Wg.call(this, e, 0);
      }
    }
  }
  !(function () {
    try {
      Wg = "function" == typeof setTimeout ? setTimeout : Kg;
    } catch (e) {
      Wg = Kg;
    }
    try {
      Yg = "function" == typeof clearTimeout ? clearTimeout : Xg;
    } catch (e) {
      Yg = Xg;
    }
  })();
  var em,
    tm = [],
    nm = !1,
    rm = -1;
  function om() {
    nm &&
      em &&
      ((nm = !1),
      em.length ? (tm = em.concat(tm)) : (rm = -1),
      tm.length && im());
  }
  function im() {
    if (!nm) {
      var e = Zg(om);
      nm = !0;
      for (var t = tm.length; t; ) {
        for (em = tm, tm = []; ++rm < t; ) em && em[rm].run();
        (rm = -1), (t = tm.length);
      }
      (em = null),
        (nm = !1),
        (function (e) {
          if (Yg === clearTimeout) return clearTimeout(e);
          if ((Yg === Xg || !Yg) && clearTimeout)
            return (Yg = clearTimeout), clearTimeout(e);
          try {
            Yg(e);
          } catch (t) {
            try {
              return Yg.call(null, e);
            } catch (t) {
              return Yg.call(this, e);
            }
          }
        })(e);
    }
  }
  function am(e, t) {
    (this.fun = e), (this.array = t);
  }
  function sm() {}
  (Qg.nextTick = function (e) {
    var t = new Array(arguments.length - 1);
    if (arguments.length > 1)
      for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
    tm.push(new am(e, t)), 1 !== tm.length || nm || Zg(im);
  }),
    (am.prototype.run = function () {
      this.fun.apply(null, this.array);
    }),
    (Qg.title = "browser"),
    (Qg.browser = !0),
    (Qg.env = {}),
    (Qg.argv = []),
    (Qg.version = ""),
    (Qg.versions = {}),
    (Qg.on = sm),
    (Qg.addListener = sm),
    (Qg.once = sm),
    (Qg.off = sm),
    (Qg.removeListener = sm),
    (Qg.removeAllListeners = sm),
    (Qg.emit = sm),
    (Qg.prependListener = sm),
    (Qg.prependOnceListener = sm),
    (Qg.listeners = function (e) {
      return [];
    }),
    (Qg.binding = function (e) {
      throw new Error("process.binding is not supported");
    }),
    (Qg.cwd = function () {
      return "/";
    }),
    (Qg.chdir = function (e) {
      throw new Error("process.chdir is not supported");
    }),
    (Qg.umask = function () {
      return 0;
    });
  var lm = $g;
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
        "object" == typeof lm &&
        lm.versions &&
        lm.versions.node;
    i ? (r = e) : o && (r = self);
    var a = !r.JS_SHA256_NO_COMMON_JS && Jg,
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
      a ? (Jg = _) : ((r.sha256 = _.sha256), (r.sha224 = _.sha224));
  })();
  var um = t(Jg);
  class cm {
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
          t = U.generate(),
          r = cm._hash(this.options.secret, t);
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
        fetch(e, { body: r, method: o, headers: i }).then(cm._toJson)
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
      return um(`${e}${t}`);
    }
  }
  var dm = { Sender: cm },
    fm = function (e, t) {
      return (fm =
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
  ******************************************************************************/ function pm(
    e,
    t
  ) {
    function n() {
      this.constructor = e;
    }
    fm(e, t),
      (e.prototype =
        null === t ? Object.create(t) : ((n.prototype = t.prototype), new n()));
  }
  var hm = function () {
    return (hm =
      Object.assign ||
      function (e) {
        for (var t, n = 1, r = arguments.length; n < r; n++)
          for (var o in (t = arguments[n]))
            Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
        return e;
      }).apply(this, arguments);
  };
  function gm(e) {
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
  function mm(e, t) {
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
  function vm() {
    for (var e = [], t = 0; t < arguments.length; t++)
      e = e.concat(mm(arguments[t]));
    return e;
  }
  var bm = {};
  function ym(e) {
    switch (Object.prototype.toString.call(e)) {
      case "[object Error]":
      case "[object Exception]":
      case "[object DOMException]":
        return !0;
      default:
        return Am(e, Error);
    }
  }
  function wm(e) {
    return "[object ErrorEvent]" === Object.prototype.toString.call(e);
  }
  function _m(e) {
    return "[object DOMError]" === Object.prototype.toString.call(e);
  }
  function Sm(e) {
    return "[object DOMException]" === Object.prototype.toString.call(e);
  }
  function xm(e) {
    return "[object String]" === Object.prototype.toString.call(e);
  }
  function Pm(e) {
    return null === e || ("object" != typeof e && "function" != typeof e);
  }
  function km(e) {
    return "[object Object]" === Object.prototype.toString.call(e);
  }
  function Dm(e) {
    return "undefined" != typeof Event && Am(e, Event);
  }
  function Em(e) {
    return "undefined" != typeof Element && Am(e, Element);
  }
  function Tm(e) {
    return "[object RegExp]" === Object.prototype.toString.call(e);
  }
  function Im(e) {
    return Boolean(e && e.then && "function" == typeof e.then);
  }
  function Cm(e) {
    return (
      km(e) &&
      "nativeEvent" in e &&
      "preventDefault" in e &&
      "stopPropagation" in e
    );
  }
  function Am(e, t) {
    try {
      return e instanceof t;
    } catch (e) {
      return !1;
    }
  }
  function Fm(e) {
    try {
      for (
        var t = e, n = [], r = 0, o = 0, i = " > ".length, a = void 0;
        t &&
        r++ < 5 &&
        !(
          "html" === (a = Om(t)) ||
          (r > 1 && o + n.length * i + a.length >= 80)
        );

      )
        n.push(a), (o += a.length), (t = t.parentNode);
      return n.reverse().join(" > ");
    } catch (e) {
      return "<unknown>";
    }
  }
  function Om(e) {
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
      (t = a.className) && xm(t))
    )
      for (n = t.split(/\s+/), i = 0; i < n.length; i++) s.push("." + n[i]);
    var l = ["type", "name", "title", "alt"];
    for (i = 0; i < l.length; i++)
      (r = l[i]), (o = a.getAttribute(r)) && s.push("[" + r + '="' + o + '"]');
    return s.join("");
  }
  r(bm, "isError", function () {
    return ym;
  }),
    r(bm, "isErrorEvent", function () {
      return wm;
    }),
    r(bm, "isDOMError", function () {
      return _m;
    }),
    r(bm, "isDOMException", function () {
      return Sm;
    }),
    r(bm, "isString", function () {
      return xm;
    }),
    r(bm, "isPrimitive", function () {
      return Pm;
    }),
    r(bm, "isPlainObject", function () {
      return km;
    }),
    r(bm, "isEvent", function () {
      return Dm;
    }),
    r(bm, "isElement", function () {
      return Em;
    }),
    r(bm, "isRegExp", function () {
      return Tm;
    }),
    r(bm, "isThenable", function () {
      return Im;
    }),
    r(bm, "isSyntheticEvent", function () {
      return Cm;
    }),
    r(bm, "isInstanceOf", function () {
      return Am;
    }),
    r({}, "htmlTreeAsString", function () {
      return Fm;
    });
  var Mm =
    Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array
      ? function (e, t) {
          return (e.__proto__ = t), e;
        }
      : function (e, t) {
          for (var n in t) e.hasOwnProperty(n) || (e[n] = t[n]);
          return e;
        });
  var Rm = (function (e) {
    function t(t) {
      var n = this.constructor,
        r = e.call(this, t) || this;
      return (
        (r.message = t),
        (r.name = n.prototype.constructor.name),
        Mm(r, n.prototype),
        r
      );
    }
    return pm(t, e), t;
  })(Error);
  r({}, "SentryError", function () {
    return Rm;
  });
  var Nm = /^(?:(\w+):)\/\/(?:(\w+)(?::(\w+))?@)([\w.-]+)(?::(\d+))?\/(.+)/,
    Um = "Invalid Dsn",
    Bm = (function () {
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
          var t = Nm.exec(e);
          if (!t) throw new Rm(Um);
          var n = mm(t.slice(1), 6),
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
              if (!e[t]) throw new Rm("Invalid Dsn: " + t + " missing");
            }),
            !this.projectId.match(/^\d+$/))
          )
            throw new Rm("Invalid Dsn: Invalid projectId " + this.projectId);
          if ("http" !== this.protocol && "https" !== this.protocol)
            throw new Rm("Invalid Dsn: Invalid protocol " + this.protocol);
          if (this.port && isNaN(parseInt(this.port, 10)))
            throw new Rm("Invalid Dsn: Invalid port " + this.port);
        }),
        e
      );
    })();
  r({}, "Dsn", function () {
    return Bm;
  });
  var Lm = {},
    jm = {},
    Vm = (function () {
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
    return Vm;
  });
  var Hm = "<anonymous>";
  function qm(e) {
    try {
      return (e && "function" == typeof e && e.name) || Hm;
    } catch (e) {
      return Hm;
    }
  }
  r({}, "getFunctionName", function () {
    return qm;
  });
  var zm = {};
  function Gm(e, t) {
    return (
      void 0 === t && (t = 0),
      "string" != typeof e || 0 === t || e.length <= t
        ? e
        : e.substr(0, t) + "..."
    );
  }
  function $m(e, t) {
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
  function Wm(e, t) {
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
  function Ym(e, t) {
    return (
      !!xm(e) &&
      (Tm(t) ? t.test(e) : "string" == typeof t && -1 !== e.indexOf(t))
    );
  }
  function Jm(e, t, n) {
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
  function Qm(e) {
    return Object.keys(e)
      .map(function (t) {
        return encodeURIComponent(t) + "=" + encodeURIComponent(e[t]);
      })
      .join("&");
  }
  function Km(e) {
    if (ym(e)) {
      var t = e,
        n = { message: t.message, name: t.name, stack: t.stack };
      for (var r in t)
        Object.prototype.hasOwnProperty.call(t, r) && (n[r] = t[r]);
      return n;
    }
    if (Dm(e)) {
      var o = e,
        i = {};
      i.type = o.type;
      try {
        i.target = Em(o.target)
          ? Fm(o.target)
          : Object.prototype.toString.call(o.target);
      } catch (e) {
        i.target = "<unknown>";
      }
      try {
        i.currentTarget = Em(o.currentTarget)
          ? Fm(o.currentTarget)
          : Object.prototype.toString.call(o.currentTarget);
      } catch (e) {
        i.currentTarget = "<unknown>";
      }
      for (var r in ("undefined" != typeof CustomEvent &&
        Am(e, CustomEvent) &&
        (i.detail = o.detail),
      o))
        Object.prototype.hasOwnProperty.call(o, r) && (i[r] = o);
      return i;
    }
    return e;
  }
  function Xm(e) {
    return (function (e) {
      return ~-encodeURI(e).split(/%..|./).length;
    })(JSON.stringify(e));
  }
  function Zm(e, t, n) {
    void 0 === t && (t = 3), void 0 === n && (n = 102400);
    var r = nv(e, t);
    return Xm(r) > n ? Zm(e, t - 1, n) : r;
  }
  function ev(t, n) {
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
      : Cm(t)
      ? "[SyntheticEvent]"
      : "number" == typeof t && t != t
      ? "[NaN]"
      : void 0 === t
      ? "[undefined]"
      : "function" == typeof t
      ? "[Function: " + qm(t) + "]"
      : t;
  }
  function tv(e, t, n, r) {
    if ((void 0 === n && (n = 1 / 0), void 0 === r && (r = new Vm()), 0 === n))
      return (function (e) {
        var t = Object.prototype.toString.call(e);
        if ("string" == typeof e) return e;
        if ("[object Object]" === t) return "[Object]";
        if ("[object Array]" === t) return "[Array]";
        var n = ev(e);
        return Pm(n) ? n : t;
      })(t);
    if (null != t && "function" == typeof t.toJSON) return t.toJSON();
    var o = ev(t, e);
    if (Pm(o)) return o;
    var i = Km(t),
      a = Array.isArray(t) ? [] : {};
    if (r.memoize(t)) return "[Circular ~]";
    for (var s in i)
      Object.prototype.hasOwnProperty.call(i, s) &&
        (a[s] = tv(s, i[s], n - 1, r));
    return r.unmemoize(t), a;
  }
  function nv(e, t) {
    try {
      return JSON.parse(
        JSON.stringify(e, function (e, n) {
          return tv(e, n, t);
        })
      );
    } catch (e) {
      return "**non-serializable**";
    }
  }
  function rv(e, t) {
    void 0 === t && (t = 40);
    var n = Object.keys(Km(e));
    if ((n.sort(), !n.length)) return "[object has no keys]";
    if (n[0].length >= t) return Gm(n[0], t);
    for (var r = n.length; r > 0; r--) {
      var o = n.slice(0, r).join(", ");
      if (!(o.length > t)) return r === n.length ? o : Gm(o, t);
    }
    return "";
  }
  r(zm, "truncate", function () {
    return Gm;
  }),
    r(zm, "snipLine", function () {
      return $m;
    }),
    r(zm, "safeJoin", function () {
      return Wm;
    }),
    r(zm, "isMatchingPattern", function () {
      return Ym;
    }),
    r(jm, "fill", function () {
      return Jm;
    }),
    r(jm, "urlEncode", function () {
      return Qm;
    }),
    r(jm, "normalizeToSize", function () {
      return Zm;
    }),
    r(jm, "normalize", function () {
      return nv;
    }),
    r(jm, "extractExceptionKeysForMessage", function () {
      return rv;
    });
  var ov = function () {
      var e = this,
        t = { exports: this };
      e.__esModule = !0;
      var n = $g;
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
                  (r.data = xm(e.body) ? e.body : JSON.stringify(nv(e.body)));
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
    iv = {};
  function av() {
    return ov.isNodeEnv()
      ? e
      : "undefined" != typeof window
      ? window
      : "undefined" != typeof self
      ? self
      : iv;
  }
  function sv() {
    var e = av(),
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
  function lv(e) {
    if (!e) return {};
    var t = e.match(
      /^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/
    );
    if (!t) return {};
    var n = t[6] || "",
      r = t[8] || "";
    return { host: t[4], path: t[5], protocol: t[2], relative: t[5] + n + r };
  }
  function uv(e) {
    if (e.message) return e.message;
    if (e.exception && e.exception.values && e.exception.values[0]) {
      var t = e.exception.values[0];
      return t.type && t.value
        ? t.type + ": " + t.value
        : t.type || t.value || e.event_id || "<unknown>";
    }
    return e.event_id || "<unknown>";
  }
  function cv(e) {
    var t = av();
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
  function dv(e, t, n) {
    (e.exception = e.exception || {}),
      (e.exception.values = e.exception.values || []),
      (e.exception.values[0] = e.exception.values[0] || {}),
      (e.exception.values[0].value = e.exception.values[0].value || t || ""),
      (e.exception.values[0].type = e.exception.values[0].type || n || "Error");
  }
  function fv(e, t) {
    void 0 === t && (t = {});
    try {
      (e.exception.values[0].mechanism = e.exception.values[0].mechanism || {}),
        Object.keys(t).forEach(function (n) {
          e.exception.values[0].mechanism[n] = t[n];
        });
    } catch (e) {}
  }
  function pv() {
    try {
      return document.location.href;
    } catch (e) {
      return "";
    }
  }
  r(Lm, "getGlobalObject", function () {
    return av;
  }),
    r(Lm, "uuid4", function () {
      return sv;
    }),
    r(Lm, "parseUrl", function () {
      return lv;
    }),
    r(Lm, "getEventDescription", function () {
      return uv;
    }),
    r(Lm, "consoleSandbox", function () {
      return cv;
    }),
    r(Lm, "addExceptionTypeValue", function () {
      return dv;
    }),
    r(Lm, "addExceptionMechanism", function () {
      return fv;
    }),
    r(Lm, "getLocationHref", function () {
      return pv;
    });
  function hv(e, t) {
    if (!t) return 6e4;
    var n = parseInt("" + t, 10);
    if (!isNaN(n)) return 1e3 * n;
    var r = Date.parse("" + t);
    return isNaN(r) ? 6e4 : r - e;
  }
  r(Lm, "parseRetryAfterHeader", function () {
    return hv;
  });
  var gv = av(),
    mv = (function () {
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
            cv(function () {
              gv.console.log("Sentry Logger [Log]: " + e.join(" "));
            });
        }),
        (e.prototype.warn = function () {
          for (var e = [], t = 0; t < arguments.length; t++)
            e[t] = arguments[t];
          this._enabled &&
            cv(function () {
              gv.console.warn("Sentry Logger [Warn]: " + e.join(" "));
            });
        }),
        (e.prototype.error = function () {
          for (var e = [], t = 0; t < arguments.length; t++)
            e[t] = arguments[t];
          this._enabled &&
            cv(function () {
              gv.console.error("Sentry Logger [Error]: " + e.join(" "));
            });
        }),
        e
      );
    })();
  gv.__SENTRY__ = gv.__SENTRY__ || {};
  var vv = gv.__SENTRY__.logger || (gv.__SENTRY__.logger = new mv());
  r({}, "logger", function () {
    return vv;
  });
  var bv = {};
  function yv() {
    if (!("fetch" in av())) return !1;
    try {
      return new Headers(), new Request(""), new Response(), !0;
    } catch (e) {
      return !1;
    }
  }
  function wv(e) {
    return (
      e && /^function fetch\(\)\s+\{\s+\[native code\]\s+\}$/.test(e.toString())
    );
  }
  function _v() {
    if (!yv()) return !1;
    var e = av();
    if (wv(e.fetch)) return !0;
    var t = !1,
      n = e.document;
    if (n && "function" == typeof n.createElement)
      try {
        var r = n.createElement("iframe");
        (r.hidden = !0),
          n.head.appendChild(r),
          r.contentWindow &&
            r.contentWindow.fetch &&
            (t = wv(r.contentWindow.fetch)),
          n.head.removeChild(r);
      } catch (e) {
        vv.warn(
          "Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ",
          e
        );
      }
    return t;
  }
  function Sv() {
    if (!yv()) return !1;
    try {
      return new Request("_", { referrerPolicy: "origin" }), !0;
    } catch (e) {
      return !1;
    }
  }
  function xv() {
    var e = av(),
      t = e.chrome,
      n = t && t.app && t.app.runtime,
      r = "history" in e && !!e.history.pushState && !!e.history.replaceState;
    return !n && r;
  }
  r(bv, "supportsFetch", function () {
    return yv;
  }),
    r(bv, "supportsNativeFetch", function () {
      return _v;
    }),
    r(bv, "supportsReferrerPolicy", function () {
      return Sv;
    }),
    r(bv, "supportsHistory", function () {
      return xv;
    });
  var Pv,
    kv = av(),
    Dv = {},
    Ev = {};
  function Tv(e) {
    if (!Ev[e])
      switch (((Ev[e] = !0), e)) {
        case "console":
          !(function () {
            if (!("console" in kv)) return;
            ["debug", "info", "warn", "error", "log", "assert"].forEach(
              function (e) {
                e in kv.console &&
                  Jm(kv.console, e, function (t) {
                    return function () {
                      for (var n = [], r = 0; r < arguments.length; r++)
                        n[r] = arguments[r];
                      Cv("console", { args: n, level: e }),
                        t && Function.prototype.apply.call(t, kv.console, n);
                    };
                  });
              }
            );
          })();
          break;
        case "dom":
          !(function () {
            if (!("document" in kv)) return;
            kv.document.addEventListener(
              "click",
              Nv("click", Cv.bind(null, "dom")),
              !1
            ),
              kv.document.addEventListener(
                "keypress",
                Uv(Cv.bind(null, "dom")),
                !1
              ),
              ["EventTarget", "Node"].forEach(function (e) {
                var t = kv[e] && kv[e].prototype;
                t &&
                  t.hasOwnProperty &&
                  t.hasOwnProperty("addEventListener") &&
                  (Jm(t, "addEventListener", function (e) {
                    return function (t, n, r) {
                      return (
                        n && n.handleEvent
                          ? ("click" === t &&
                              Jm(n, "handleEvent", function (e) {
                                return function (t) {
                                  return (
                                    Nv("click", Cv.bind(null, "dom"))(t),
                                    e.call(this, t)
                                  );
                                };
                              }),
                            "keypress" === t &&
                              Jm(n, "handleEvent", function (e) {
                                return function (t) {
                                  return (
                                    Uv(Cv.bind(null, "dom"))(t), e.call(this, t)
                                  );
                                };
                              }))
                          : ("click" === t &&
                              Nv("click", Cv.bind(null, "dom"), !0)(this),
                            "keypress" === t && Uv(Cv.bind(null, "dom"))(this)),
                        e.call(this, t, n, r)
                      );
                    };
                  }),
                  Jm(t, "removeEventListener", function (e) {
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
            if (!("XMLHttpRequest" in kv)) return;
            var e = [],
              t = [],
              n = XMLHttpRequest.prototype;
            Jm(n, "open", function (n) {
              return function () {
                for (var r = [], o = 0; o < arguments.length; o++)
                  r[o] = arguments[o];
                var i = this,
                  a = r[1];
                (i.__sentry_xhr__ = {
                  method: xm(r[0]) ? r[0].toUpperCase() : r[0],
                  url: r[1],
                }),
                  xm(a) &&
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
                    Cv("xhr", {
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
                    ? Jm(i, "onreadystatechange", function (e) {
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
              Jm(n, "send", function (n) {
                return function () {
                  for (var r = [], o = 0; o < arguments.length; o++)
                    r[o] = arguments[o];
                  return (
                    e.push(this),
                    t.push(r),
                    Cv("xhr", {
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
            if (!_v()) return;
            Jm(kv, "fetch", function (e) {
              return function () {
                for (var t = [], n = 0; n < arguments.length; n++)
                  t[n] = arguments[n];
                var r = {
                  args: t,
                  fetchData: { method: Av(t), url: Fv(t) },
                  startTimestamp: Date.now(),
                };
                return (
                  Cv("fetch", hm({}, r)),
                  e.apply(kv, t).then(
                    function (e) {
                      return (
                        Cv(
                          "fetch",
                          hm(hm({}, r), {
                            endTimestamp: Date.now(),
                            response: e,
                          })
                        ),
                        e
                      );
                    },
                    function (e) {
                      throw (
                        (Cv(
                          "fetch",
                          hm(hm({}, r), { endTimestamp: Date.now(), error: e })
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
            if (!xv()) return;
            var e = kv.onpopstate;
            function t(e) {
              return function () {
                for (var t = [], n = 0; n < arguments.length; n++)
                  t[n] = arguments[n];
                var r = t.length > 2 ? t[2] : void 0;
                if (r) {
                  var o = Pv,
                    i = String(r);
                  (Pv = i), Cv("history", { from: o, to: i });
                }
                return e.apply(this, t);
              };
            }
            (kv.onpopstate = function () {
              for (var t = [], n = 0; n < arguments.length; n++)
                t[n] = arguments[n];
              var r = kv.location.href,
                o = Pv;
              if (((Pv = r), Cv("history", { from: o, to: r }), e))
                return e.apply(this, t);
            }),
              Jm(kv.history, "pushState", t),
              Jm(kv.history, "replaceState", t);
          })();
          break;
        case "error":
          (Bv = kv.onerror),
            (kv.onerror = function (e, t, n, r, o) {
              return (
                Cv("error", { column: r, error: o, line: n, msg: e, url: t }),
                !!Bv && Bv.apply(this, arguments)
              );
            });
          break;
        case "unhandledrejection":
          (Lv = kv.onunhandledrejection),
            (kv.onunhandledrejection = function (e) {
              return (
                Cv("unhandledrejection", e), !Lv || Lv.apply(this, arguments)
              );
            });
          break;
        default:
          vv.warn("unknown instrumentation type:", e);
      }
  }
  function Iv(e) {
    e &&
      "string" == typeof e.type &&
      "function" == typeof e.callback &&
      ((Dv[e.type] = Dv[e.type] || []),
      Dv[e.type].push(e.callback),
      Tv(e.type));
  }
  function Cv(e, t) {
    var n, r;
    if (e && Dv[e])
      try {
        for (var o = gm(Dv[e] || []), i = o.next(); !i.done; i = o.next()) {
          var a = i.value;
          try {
            a(t);
          } catch (t) {
            vv.error(
              "Error while triggering instrumentation handler.\nType: " +
                e +
                "\nName: " +
                qm(a) +
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
  function Av(e) {
    return (
      void 0 === e && (e = []),
      "Request" in kv && Am(e[0], Request) && e[0].method
        ? String(e[0].method).toUpperCase()
        : e[1] && e[1].method
        ? String(e[1].method).toUpperCase()
        : "GET"
    );
  }
  function Fv(e) {
    return (
      void 0 === e && (e = []),
      "string" == typeof e[0]
        ? e[0]
        : "Request" in kv && Am(e[0], Request)
        ? e[0].url
        : String(e[0])
    );
  }
  r({}, "addInstrumentationHandler", function () {
    return Iv;
  });
  var Ov,
    Mv,
    Rv = 0;
  function Nv(e, t, n) {
    return (
      void 0 === n && (n = !1),
      function (r) {
        (Ov = void 0),
          r &&
            Mv !== r &&
            ((Mv = r),
            Rv && clearTimeout(Rv),
            n
              ? (Rv = setTimeout(function () {
                  t({ event: r, name: e });
                }))
              : t({ event: r, name: e }));
      }
    );
  }
  function Uv(e) {
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
        (Ov || Nv("input", e)(t),
        clearTimeout(Ov),
        (Ov = setTimeout(function () {
          Ov = void 0;
        }, 1e3)));
    };
  }
  var Bv = null;
  var Lv = null;
  var jv, Vv;
  ((Vv = jv || (jv = {})).PENDING = "PENDING"),
    (Vv.RESOLVED = "RESOLVED"),
    (Vv.REJECTED = "REJECTED");
  var Hv = (function () {
    function e(e) {
      var t = this;
      (this._state = jv.PENDING),
        (this._handlers = []),
        (this._resolve = function (e) {
          t._setResult(jv.RESOLVED, e);
        }),
        (this._reject = function (e) {
          t._setResult(jv.REJECTED, e);
        }),
        (this._setResult = function (e, n) {
          t._state === jv.PENDING &&
            (Im(n)
              ? n.then(t._resolve, t._reject)
              : ((t._state = e), (t._value = n), t._executeHandlers()));
        }),
        (this._attachHandler = function (e) {
          (t._handlers = t._handlers.concat(e)), t._executeHandlers();
        }),
        (this._executeHandlers = function () {
          if (t._state !== jv.PENDING) {
            var e = t._handlers.slice();
            (t._handlers = []),
              e.forEach(function (e) {
                e.done ||
                  (t._state === jv.RESOLVED &&
                    e.onfulfilled &&
                    e.onfulfilled(t._value),
                  t._state === jv.REJECTED &&
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
    return Hv;
  });
  var qv = (function () {
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
          : Hv.reject(
              new Rm("Not adding Promise due to buffer limit reached.")
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
        return new Hv(function (n) {
          var r = setTimeout(function () {
            e && e > 0 && n(!1);
          }, e);
          Hv.all(t._buffer)
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
    return qv;
  });
  var zv = function () {
      var e = this,
        t = { exports: this };
      e.__esModule = !0;
      var n = {
        nowSeconds: function () {
          return Date.now() / 1e3;
        },
      };
      var o = ov.isNodeEnv()
          ? (function () {
              try {
                return ov.dynamicRequire(t, "perf_hooks").performance;
              } catch (e) {
                return;
              }
            })()
          : (function () {
              var e = av().performance;
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
        var e = av().performance;
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
    Gv = (function () {
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
              ((n._breadcrumbs = vm(t._breadcrumbs)),
              (n._tags = hm({}, t._tags)),
              (n._extra = hm({}, t._extra)),
              (n._contexts = hm({}, t._contexts)),
              (n._user = t._user),
              (n._level = t._level),
              (n._span = t._span),
              (n._transactionName = t._transactionName),
              (n._fingerprint = t._fingerprint),
              (n._eventProcessors = vm(t._eventProcessors))),
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
            (this._tags = hm(hm({}, this._tags), e)),
            this._notifyScopeListeners(),
            this
          );
        }),
        (e.prototype.setTag = function (e, t) {
          var n;
          return (
            (this._tags = hm(hm({}, this._tags), (((n = {})[e] = t), n))),
            this._notifyScopeListeners(),
            this
          );
        }),
        (e.prototype.setExtras = function (e) {
          return (
            (this._extra = hm(hm({}, this._extra), e)),
            this._notifyScopeListeners(),
            this
          );
        }),
        (e.prototype.setExtra = function (e, t) {
          var n;
          return (
            (this._extra = hm(hm({}, this._extra), (((n = {})[e] = t), n))),
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
              : (this._contexts = hm(
                  hm({}, this._contexts),
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
              ? ((this._tags = hm(hm({}, this._tags), t._tags)),
                (this._extra = hm(hm({}, this._extra), t._extra)),
                (this._contexts = hm(hm({}, this._contexts), t._contexts)),
                t._user && (this._user = t._user),
                t._level && (this._level = t._level),
                t._fingerprint && (this._fingerprint = t._fingerprint))
              : km(t) &&
                ((t = t),
                (this._tags = hm(hm({}, this._tags), t.tags)),
                (this._extra = hm(hm({}, this._extra), t.extra)),
                (this._contexts = hm(hm({}, this._contexts), t.contexts)),
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
          var n = hm({ timestamp: zv.dateTimestampInSeconds() }, e);
          return (
            (this._breadcrumbs =
              void 0 !== t && t >= 0
                ? vm(this._breadcrumbs, [n]).slice(-t)
                : vm(this._breadcrumbs, [n])),
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
              (e.extra = hm(hm({}, this._extra), e.extra)),
            this._tags &&
              Object.keys(this._tags).length &&
              (e.tags = hm(hm({}, this._tags), e.tags)),
            this._user &&
              Object.keys(this._user).length &&
              (e.user = hm(hm({}, this._user), e.user)),
            this._contexts &&
              Object.keys(this._contexts).length &&
              (e.contexts = hm(hm({}, this._contexts), e.contexts)),
            this._level && (e.level = this._level),
            this._transactionName && (e.transaction = this._transactionName),
            this._span &&
              (e.contexts = hm(
                { trace: this._span.getTraceContext() },
                e.contexts
              )),
            this._applyFingerprint(e),
            (e.breadcrumbs = vm(e.breadcrumbs || [], this._breadcrumbs)),
            (e.breadcrumbs = e.breadcrumbs.length > 0 ? e.breadcrumbs : void 0),
            this._notifyEventProcessors(vm($v(), this._eventProcessors), e, t)
          );
        }),
        (e.prototype._notifyEventProcessors = function (e, t, n, r) {
          var o = this;
          return (
            void 0 === r && (r = 0),
            new Hv(function (i, a) {
              var s = e[r];
              if (null === t || "function" != typeof s) i(t);
              else {
                var l = s(hm({}, t), n);
                Im(l)
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
  function $v() {
    var e = av();
    return (
      (e.__SENTRY__ = e.__SENTRY__ || {}),
      (e.__SENTRY__.globalEventProcessors =
        e.__SENTRY__.globalEventProcessors || []),
      e.__SENTRY__.globalEventProcessors
    );
  }
  function Wv(e) {
    $v().push(e);
  }
  var Yv = (function () {
    function e(e, t, n) {
      void 0 === t && (t = new Gv()),
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
          n = Gv.clone(t);
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
        var n = (this._lastEventId = sv()),
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
            hm(hm({}, r), { event_id: n })
          ),
          n
        );
      }),
      (e.prototype.captureMessage = function (e, t, n) {
        var r = (this._lastEventId = sv()),
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
            hm(hm({}, o), { event_id: r })
          ),
          r
        );
      }),
      (e.prototype.captureEvent = function (e, t) {
        var n = (this._lastEventId = sv());
        return (
          this._invokeClient("captureEvent", e, hm(hm({}, t), { event_id: n })),
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
            var l = zv.dateTimestampInSeconds(),
              u = hm({ timestamp: l }, e),
              c = i
                ? cv(function () {
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
        var t = Qv(this);
        try {
          e(this);
        } finally {
          Qv(t);
        }
      }),
      (e.prototype.getIntegration = function (e) {
        var t = this.getClient();
        if (!t) return null;
        try {
          return t.getIntegration(e);
        } catch (t) {
          return (
            vv.warn(
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
          (t = o.client)[e].apply(t, vm(n, [o.scope]));
      }),
      (e.prototype._callExtensionMethod = function (e) {
        for (var t = [], n = 1; n < arguments.length; n++)
          t[n - 1] = arguments[n];
        var r = Jv(),
          o = r.__SENTRY__;
        if (o && o.extensions && "function" == typeof o.extensions[e])
          return o.extensions[e].apply(this, t);
        vv.warn("Extension method " + e + " couldn't be found, doing nothing.");
      }),
      e
    );
  })();
  function Jv() {
    var e = av();
    return (e.__SENTRY__ = e.__SENTRY__ || { extensions: {}, hub: void 0 }), e;
  }
  function Qv(e) {
    var t = Jv(),
      n = Zv(t);
    return eb(t, e), n;
  }
  function Kv() {
    var e = Jv();
    return (
      (Xv(e) && !Zv(e).isOlderThan(3)) || eb(e, new Yv()),
      ov.isNodeEnv()
        ? (function (e) {
            try {
              var t =
                (r = Jv().__SENTRY__) &&
                r.extensions &&
                r.extensions.domain &&
                r.extensions.domain.active;
              if (!t) return Zv(e);
              if (!Xv(t) || Zv(t).isOlderThan(3)) {
                var n = Zv(e).getStackTop();
                eb(t, new Yv(n.client, Gv.clone(n.scope)));
              }
              return Zv(t);
            } catch (t) {
              return Zv(e);
            }
            var r;
          })(e)
        : Zv(e)
    );
  }
  function Xv(e) {
    return !!(e && e.__SENTRY__ && e.__SENTRY__.hub);
  }
  function Zv(e) {
    return (
      (e && e.__SENTRY__ && e.__SENTRY__.hub) ||
        ((e.__SENTRY__ = e.__SENTRY__ || {}), (e.__SENTRY__.hub = new Yv())),
      e.__SENTRY__.hub
    );
  }
  function eb(e, t) {
    return (
      !!e && ((e.__SENTRY__ = e.__SENTRY__ || {}), (e.__SENTRY__.hub = t), !0)
    );
  }
  function tb(e) {
    for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
    var r = Kv();
    if (r && r[e]) return r[e].apply(r, vm(t));
    throw new Error(
      "No hub defined or " +
        e +
        " was not found on the hub, please open a bug report."
    );
  }
  function nb(e, t) {
    var n;
    try {
      throw new Error("Sentry syntheticException");
    } catch (e) {
      n = e;
    }
    return tb("captureException", e, {
      captureContext: t,
      originalException: e,
      syntheticException: n,
    });
  }
  function rb(e) {
    tb("withScope", e);
  }
  var ob = (function () {
      function e(e) {
        (this.dsn = e), (this._dsnObject = new Bm(e));
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
          return Qm({ sentry_key: this._dsnObject.user, sentry_version: "7" });
        }),
        e
      );
    })(),
    ib = [];
  function ab(e) {
    var t = {};
    return (
      (function (e) {
        var t = (e.defaultIntegrations && vm(e.defaultIntegrations)) || [],
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
            : (r = vm(t));
        var a = r.map(function (e) {
            return e.name;
          }),
          s = "Debug";
        return (
          -1 !== a.indexOf(s) && r.push.apply(r, vm(r.splice(a.indexOf(s), 1))),
          r
        );
      })(e).forEach(function (e) {
        (t[e.name] = e),
          (function (e) {
            -1 === ib.indexOf(e.name) &&
              (e.setupOnce(Wv, Kv),
              ib.push(e.name),
              vv.log("Integration installed: " + e.name));
          })(e);
      }),
      t
    );
  }
  var sb,
    lb,
    ub,
    cb,
    db = (function () {
      function e(e, t) {
        (this._integrations = {}),
          (this._processing = !1),
          (this._backend = new e(t)),
          (this._options = t),
          t.dsn && (this._dsn = new Bm(t.dsn));
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
            (Pm(e)
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
                vv.error(e), (r._processing = !1);
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
          this._isEnabled() && (this._integrations = ab(this._options));
        }),
        (e.prototype.getIntegration = function (e) {
          try {
            return this._integrations[e.id] || null;
          } catch (t) {
            return (
              vv.warn(
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
          return new Hv(function (n) {
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
            a = hm(hm({}, e), {
              event_id: e.event_id || (n && n.event_id ? n.event_id : sv()),
              timestamp: e.timestamp || zv.dateTimestampInSeconds(),
            });
          this._applyClientOptions(a), this._applyIntegrationsMetadata(a);
          var s = t;
          n && n.captureContext && (s = Gv.clone(s).update(n.captureContext));
          var l = Hv.resolve(a);
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
          var n = hm(
            hm(
              hm(
                hm(
                  hm({}, e),
                  e.breadcrumbs && {
                    breadcrumbs: e.breadcrumbs.map(function (e) {
                      return hm(hm({}, e), e.data && { data: nv(e.data, t) });
                    }),
                  }
                ),
                e.user && { user: nv(e.user, t) }
              ),
              e.contexts && { contexts: nv(e.contexts, t) }
            ),
            e.extra && { extra: nv(e.extra, t) }
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
            e.message && (e.message = Gm(e.message, a));
          var s = e.exception && e.exception.values && e.exception.values[0];
          s && s.value && (s.value = Gm(s.value, a));
          var l = e.request;
          l && l.url && (l.url = Gm(l.url, a));
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
            return Hv.reject("SDK not enabled, will not send event.");
          var s = "transaction" === e.type;
          return !s && "number" == typeof a && Math.random() > a
            ? Hv.reject("This event has been sampled, will not send event.")
            : new Hv(function (o, a) {
                r._prepareEvent(e, n, t)
                  .then(function (e) {
                    if (null !== e) {
                      var n = e;
                      if ((t && t.data && !0 === t.data.__sentry__) || !i || s)
                        return r._sendEvent(n), void o(n);
                      var l = i(e, t);
                      if (void 0 === l)
                        vv.error(
                          "`beforeSend` method has to return `null` or a valid event."
                        );
                      else if (Im(l)) r._handleAsyncBeforeSend(l, o, a);
                      else {
                        if (null === (n = l))
                          return (
                            vv.log(
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
  ((lb = sb || (sb = {})).Fatal = "fatal"),
    (lb.Error = "error"),
    (lb.Warning = "warning"),
    (lb.Log = "log"),
    (lb.Info = "info"),
    (lb.Debug = "debug"),
    (lb.Critical = "critical"),
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
    })(sb || (sb = {})),
    ((cb = ub || (ub = {})).Unknown = "unknown"),
    (cb.Skipped = "skipped"),
    (cb.Success = "success"),
    (cb.RateLimit = "rate_limit"),
    (cb.Invalid = "invalid"),
    (cb.Failed = "failed"),
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
    })(ub || (ub = {}));
  var fb = (function () {
      function e() {}
      return (
        (e.prototype.sendEvent = function (e) {
          return Hv.resolve({
            reason:
              "NoopTransport: Event has been skipped because no Dsn is configured.",
            status: ub.Skipped,
          });
        }),
        (e.prototype.close = function (e) {
          return Hv.resolve(!0);
        }),
        e
      );
    })(),
    pb = (function () {
      function e(e) {
        (this._options = e),
          this._options.dsn ||
            vv.warn("No DSN provided, backend will not do anything."),
          (this._transport = this._setupTransport());
      }
      return (
        (e.prototype.eventFromException = function (e, t) {
          throw new Rm("Backend has to implement `eventFromException` method");
        }),
        (e.prototype.eventFromMessage = function (e, t, n) {
          throw new Rm("Backend has to implement `eventFromMessage` method");
        }),
        (e.prototype.sendEvent = function (e) {
          this._transport.sendEvent(e).then(null, function (e) {
            vv.error("Error while sending event: " + e);
          });
        }),
        (e.prototype.getTransport = function () {
          return this._transport;
        }),
        (e.prototype._setupTransport = function () {
          return new fb();
        }),
        e
      );
    })();
  function hb(e, t) {
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
  var gb,
    mb = {},
    vb = (function () {
      function e() {
        this.name = e.id;
      }
      return (
        (e.prototype.setupOnce = function () {
          (gb = Function.prototype.toString),
            (Function.prototype.toString = function () {
              for (var e = [], t = 0; t < arguments.length; t++)
                e[t] = arguments[t];
              var n = this.__sentry_original__ || this;
              return gb.apply(n, e);
            });
        }),
        (e.id = "FunctionToString"),
        e
      );
    })(),
    bb = [/^Script error\.?$/, /^Javascript error: Script error\.? on line 0$/],
    yb = (function () {
      function e(t) {
        void 0 === t && (t = {}), (this._options = t), (this.name = e.id);
      }
      return (
        (e.prototype.setupOnce = function () {
          Wv(function (t) {
            var n = Kv();
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
            ? (vv.warn(
                "Event dropped due to being internal Sentry Error.\nEvent: " +
                  uv(e)
              ),
              !0)
            : this._isIgnoredError(e, t)
            ? (vv.warn(
                "Event dropped due to being matched by `ignoreErrors` option.\nEvent: " +
                  uv(e)
              ),
              !0)
            : this._isDeniedUrl(e, t)
            ? (vv.warn(
                "Event dropped due to being matched by `denyUrls` option.\nEvent: " +
                  uv(e) +
                  ".\nUrl: " +
                  this._getEventFilterUrl(e)
              ),
              !0)
            : !this._isAllowedUrl(e, t) &&
              (vv.warn(
                "Event dropped due to not being matched by `allowUrls` option.\nEvent: " +
                  uv(e) +
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
                return Ym(e, t);
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
              return Ym(n, e);
            })
          );
        }),
        (e.prototype._isAllowedUrl = function (e, t) {
          if (!t.allowUrls || !t.allowUrls.length) return !0;
          var n = this._getEventFilterUrl(e);
          return (
            !n ||
            t.allowUrls.some(function (e) {
              return Ym(n, e);
            })
          );
        }),
        (e.prototype._mergeOptions = function (e) {
          return (
            void 0 === e && (e = {}),
            {
              allowUrls: vm(
                this._options.whitelistUrls || [],
                this._options.allowUrls || [],
                e.whitelistUrls || [],
                e.allowUrls || []
              ),
              denyUrls: vm(
                this._options.blacklistUrls || [],
                this._options.denyUrls || [],
                e.blacklistUrls || [],
                e.denyUrls || []
              ),
              ignoreErrors: vm(
                this._options.ignoreErrors || [],
                e.ignoreErrors || [],
                bb
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
              return vv.error("Cannot extract message for event " + uv(e)), [];
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
            return vv.error("Cannot extract url for event " + uv(e)), null;
          }
        }),
        (e.id = "InboundFilters"),
        e
      );
    })();
  r(mb, "FunctionToString", function () {
    return vb;
  }),
    r(mb, "InboundFilters", function () {
      return yb;
    });
  var wb = "?",
    _b =
      /^\s*at (?:(.*?) ?\()?((?:file|https?|blob|chrome-extension|address|native|eval|webpack|<anonymous>|[-a-z]+:|.*bundle|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i,
    Sb =
      /^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:file|https?|blob|chrome|webpack|resource|moz-extension|capacitor).*?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js))(?::(\d+))?(?::(\d+))?\s*$/i,
    xb =
      /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i,
    Pb = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i,
    kb = /\((\S*)(?::(\d+))(?::(\d+))\)/,
    Db = /Minified React error #\d+;/i;
  function Eb(e) {
    var t = null,
      n = 0;
    e &&
      ("number" == typeof e.framesToPop
        ? (n = e.framesToPop)
        : Db.test(e.message) && (n = 1));
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
              l && (!l.func && l.line && (l.func = wb), a.push(l));
          }
          if (!a.length) return null;
          return { message: Ib(e), name: e.name, stack: a };
        })(e))
      )
        return Tb(t, n);
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
            if ((n = _b.exec(i[a]))) {
              var s = n[2] && 0 === n[2].indexOf("native");
              n[2] &&
                0 === n[2].indexOf("eval") &&
                (t = kb.exec(n[2])) &&
                ((n[2] = t[1]), (n[3] = t[2]), (n[4] = t[3])),
                (r = {
                  url:
                    n[2] && 0 === n[2].indexOf("address at ")
                      ? n[2].substr("address at ".length)
                      : n[2],
                  func: n[1] || wb,
                  args: s ? [n[2]] : [],
                  line: n[3] ? +n[3] : null,
                  column: n[4] ? +n[4] : null,
                });
            } else if ((n = xb.exec(i[a])))
              r = {
                url: n[2],
                func: n[1] || wb,
                args: [],
                line: +n[3],
                column: n[4] ? +n[4] : null,
              };
            else {
              if (!(n = Sb.exec(i[a]))) continue;
              n[3] && n[3].indexOf(" > eval") > -1 && (t = Pb.exec(n[3]))
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
                  func: n[1] || wb,
                  args: n[2] ? n[2].split(",") : [],
                  line: n[4] ? +n[4] : null,
                  column: n[5] ? +n[5] : null,
                });
            }
            !r.func && r.line && (r.func = wb), o.push(r);
          }
          if (!o.length) return null;
          return { message: Ib(e), name: e.name, stack: o };
        })(e))
      )
        return Tb(t, n);
    } catch (e) {}
    return { message: Ib(e), name: e && e.name, stack: [], failed: !0 };
  }
  function Tb(e, t) {
    try {
      return hm(hm({}, e), { stack: e.stack.slice(t) });
    } catch (t) {
      return e;
    }
  }
  function Ib(e) {
    var t = e && e.message;
    return t
      ? t.error && "string" == typeof t.error.message
        ? t.error.message
        : t
      : "No error message";
  }
  function Cb(e) {
    var t = Fb(e.stack),
      n = { type: e.name, value: e.message };
    return (
      t && t.length && (n.stacktrace = { frames: t }),
      void 0 === n.type &&
        "" === n.value &&
        (n.value = "Unrecoverable error caught"),
      n
    );
  }
  function Ab(e) {
    return { exception: { values: [Cb(e)] } };
  }
  function Fb(e) {
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
  function Ob(e, t, n) {
    var r;
    if ((void 0 === n && (n = {}), wm(e) && e.error))
      return (r = Ab(Eb((e = e.error))));
    if (_m(e) || Sm(e)) {
      var o = e,
        i = o.name || (_m(o) ? "DOMError" : "DOMException"),
        a = o.message ? i + ": " + o.message : i;
      return dv((r = Mb(a, t, n)), a), r;
    }
    return ym(e)
      ? (r = Ab(Eb(e)))
      : km(e) || Dm(e)
      ? (fv(
          (r = (function (e, t, n) {
            var r = {
              exception: {
                values: [
                  {
                    type: Dm(e)
                      ? e.constructor.name
                      : n
                      ? "UnhandledRejection"
                      : "Error",
                    value:
                      "Non-Error " +
                      (n ? "promise rejection" : "exception") +
                      " captured with keys: " +
                      rv(e),
                  },
                ],
              },
              extra: { __serialized__: Zm(e) },
            };
            if (t) {
              var o = Fb(Eb(t).stack);
              r.stacktrace = { frames: o };
            }
            return r;
          })(e, t, n.rejection)),
          { synthetic: !0 }
        ),
        r)
      : (dv((r = Mb(e, t, n)), "" + e, void 0), fv(r, { synthetic: !0 }), r);
  }
  function Mb(e, t, n) {
    void 0 === n && (n = {});
    var r = { message: e };
    if (n.attachStacktrace && t) {
      var o = Fb(Eb(t).stack);
      r.stacktrace = { frames: o };
    }
    return r;
  }
  var Rb = {},
    Nb = (function () {
      function e(e) {
        (this.options = e),
          (this._buffer = new qv(30)),
          (this._api = new ob(this.options.dsn)),
          (this.url = this._api.getStoreEndpointWithUrlEncodedAuth());
      }
      return (
        (e.prototype.sendEvent = function (e) {
          throw new Rm("Transport Class has to implement `sendEvent` method");
        }),
        (e.prototype.close = function (e) {
          return this._buffer.drain(e);
        }),
        e
      );
    })(),
    Ub = av(),
    Bb = (function (e) {
      function t() {
        var t = (null !== e && e.apply(this, arguments)) || this;
        return (t._disabledUntil = new Date(Date.now())), t;
      }
      return (
        pm(t, e),
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
          var n = hb(e, this._api),
            r = {
              body: n.body,
              method: "POST",
              referrerPolicy: Sv() ? "origin" : "",
            };
          return (
            void 0 !== this.options.fetchParameters &&
              Object.assign(r, this.options.fetchParameters),
            void 0 !== this.options.headers &&
              (r.headers = this.options.headers),
            this._buffer.add(
              new Hv(function (e, o) {
                Ub.fetch(n.url, r)
                  .then(function (n) {
                    var r = ub.fromHttpCode(n.status);
                    if (r !== ub.Success) {
                      if (r === ub.RateLimit) {
                        var i = Date.now(),
                          a = n.headers.get("Retry-After");
                        (t._disabledUntil = new Date(i + hv(i, a))),
                          vv.warn(
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
    })(Nb),
    Lb = (function (e) {
      function t() {
        var t = (null !== e && e.apply(this, arguments)) || this;
        return (t._disabledUntil = new Date(Date.now())), t;
      }
      return (
        pm(t, e),
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
          var n = hb(e, this._api);
          return this._buffer.add(
            new Hv(function (e, r) {
              var o = new XMLHttpRequest();
              for (var i in ((o.onreadystatechange = function () {
                if (4 === o.readyState) {
                  var n = ub.fromHttpCode(o.status);
                  if (n !== ub.Success) {
                    if (n === ub.RateLimit) {
                      var i = Date.now(),
                        a = o.getResponseHeader("Retry-After");
                      (t._disabledUntil = new Date(i + hv(i, a))),
                        vv.warn(
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
    })(Nb);
  r(Rb, "BaseTransport", function () {
    return Nb;
  }),
    r(Rb, "FetchTransport", function () {
      return Bb;
    }),
    r(Rb, "XHRTransport", function () {
      return Lb;
    });
  var jb = (function (e) {
      function t() {
        return (null !== e && e.apply(this, arguments)) || this;
      }
      return (
        pm(t, e),
        (t.prototype.eventFromException = function (e, t) {
          return (function (e, t, n) {
            var r = Ob(t, (n && n.syntheticException) || void 0, {
              attachStacktrace: e.attachStacktrace,
            });
            return (
              fv(r, { handled: !0, type: "generic" }),
              (r.level = sb.Error),
              n && n.event_id && (r.event_id = n.event_id),
              Hv.resolve(r)
            );
          })(this._options, e, t);
        }),
        (t.prototype.eventFromMessage = function (e, t, n) {
          return (
            void 0 === t && (t = sb.Info),
            (function (e, t, n, r) {
              void 0 === n && (n = sb.Info);
              var o = Mb(t, (r && r.syntheticException) || void 0, {
                attachStacktrace: e.attachStacktrace,
              });
              return (
                (o.level = n),
                r && r.event_id && (o.event_id = r.event_id),
                Hv.resolve(o)
              );
            })(this._options, e, t, n)
          );
        }),
        (t.prototype._setupTransport = function () {
          if (!this._options.dsn) return e.prototype._setupTransport.call(this);
          var t = hm(hm({}, this._options.transportOptions), {
            dsn: this._options.dsn,
          });
          return this._options.transport
            ? new this._options.transport(t)
            : yv()
            ? new Bb(t)
            : new Lb(t);
        }),
        t
      );
    })(pb),
    Vb = 0;
  function Hb() {
    return Vb > 0;
  }
  function qb() {
    (Vb += 1),
      setTimeout(function () {
        Vb -= 1;
      });
  }
  function zb(e, t, n) {
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
          return zb(e, t);
        });
        return e.handleEvent ? e.handleEvent.apply(this, o) : e.apply(this, o);
      } catch (e) {
        throw (
          (qb(),
          rb(function (n) {
            n.addEventProcessor(function (e) {
              var n = hm({}, e);
              return (
                t.mechanism && (dv(n, void 0, void 0), fv(n, t.mechanism)),
                (n.extra = hm(hm({}, n.extra), { arguments: r })),
                n
              );
            }),
              nb(e);
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
  function Gb(e) {
    if ((void 0 === e && (e = {}), e.eventId))
      if (e.dsn) {
        var t = document.createElement("script");
        (t.async = !0),
          (t.src = new ob(e.dsn).getReportDialogEndpoint(e)),
          e.onLoad && (t.onload = e.onLoad),
          (document.head || document.body).appendChild(t);
      } else vv.error("Missing dsn option in showReportDialog call");
    else vv.error("Missing eventId option in showReportDialog call");
  }
  var $b = {},
    Wb = (function () {
      function e(t) {
        (this.name = e.id),
          (this._onErrorHandlerInstalled = !1),
          (this._onUnhandledRejectionHandlerInstalled = !1),
          (this._options = hm({ onerror: !0, onunhandledrejection: !0 }, t));
      }
      return (
        (e.prototype.setupOnce = function () {
          (Error.stackTraceLimit = 50),
            this._options.onerror &&
              (vv.log("Global Handler attached: onerror"),
              this._installGlobalOnErrorHandler()),
            this._options.onunhandledrejection &&
              (vv.log("Global Handler attached: onunhandledrejection"),
              this._installGlobalOnUnhandledRejectionHandler());
        }),
        (e.prototype._installGlobalOnErrorHandler = function () {
          var t = this;
          this._onErrorHandlerInstalled ||
            (Iv({
              callback: function (n) {
                var r = n.error,
                  o = Kv(),
                  i = o.getIntegration(e),
                  a = r && !0 === r.__sentry_own_request__;
                if (i && !Hb() && !a) {
                  var s = o.getClient(),
                    l = Pm(r)
                      ? t._eventFromIncompleteOnError(
                          n.msg,
                          n.url,
                          n.line,
                          n.column
                        )
                      : t._enhanceEventWithInitialFrame(
                          Ob(r, void 0, {
                            attachStacktrace:
                              s && s.getOptions().attachStacktrace,
                            rejection: !1,
                          }),
                          n.url,
                          n.line,
                          n.column
                        );
                  fv(l, { handled: !1, type: "onerror" }),
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
            (Iv({
              callback: function (n) {
                var r = n;
                try {
                  "reason" in n
                    ? (r = n.reason)
                    : "detail" in n &&
                      "reason" in n.detail &&
                      (r = n.detail.reason);
                } catch (e) {}
                var o = Kv(),
                  i = o.getIntegration(e),
                  a = r && !0 === r.__sentry_own_request__;
                if (!i || Hb() || a) return !0;
                var s = o.getClient(),
                  l = Pm(r)
                    ? t._eventFromIncompleteRejection(r)
                    : Ob(r, void 0, {
                        attachStacktrace: s && s.getOptions().attachStacktrace,
                        rejection: !0,
                      });
                (l.level = sb.Error),
                  fv(l, { handled: !1, type: "onunhandledrejection" }),
                  o.captureEvent(l, { originalException: r });
              },
              type: "unhandledrejection",
            }),
            (this._onUnhandledRejectionHandlerInstalled = !0));
        }),
        (e.prototype._eventFromIncompleteOnError = function (e, t, n, r) {
          var o,
            i = wm(e) ? e.message : e;
          if (xm(i)) {
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
            a = xm(t) && t.length > 0 ? t : pv();
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
    Yb = [
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
    Jb = (function () {
      function e(t) {
        (this.name = e.id),
          (this._options = hm(
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
          var e = av();
          (this._options.setTimeout &&
            Jm(e, "setTimeout", this._wrapTimeFunction.bind(this)),
          this._options.setInterval &&
            Jm(e, "setInterval", this._wrapTimeFunction.bind(this)),
          this._options.requestAnimationFrame &&
            Jm(e, "requestAnimationFrame", this._wrapRAF.bind(this)),
          this._options.XMLHttpRequest &&
            "XMLHttpRequest" in e &&
            Jm(XMLHttpRequest.prototype, "send", this._wrapXHR.bind(this)),
          this._options.eventTarget) &&
            (Array.isArray(this._options.eventTarget)
              ? this._options.eventTarget
              : Yb
            ).forEach(this._wrapEventTarget.bind(this));
        }),
        (e.prototype._wrapTimeFunction = function (e) {
          return function () {
            for (var t = [], n = 0; n < arguments.length; n++)
              t[n] = arguments[n];
            var r = t[0];
            return (
              (t[0] = zb(r, {
                mechanism: {
                  data: { function: qm(e) },
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
              zb(t, {
                mechanism: {
                  data: { function: "requestAnimationFrame", handler: qm(e) },
                  handled: !0,
                  type: "instrument",
                },
              })
            );
          };
        }),
        (e.prototype._wrapEventTarget = function (e) {
          var t = av(),
            n = t[e] && t[e].prototype;
          n &&
            n.hasOwnProperty &&
            n.hasOwnProperty("addEventListener") &&
            (Jm(n, "addEventListener", function (t) {
              return function (n, r, o) {
                try {
                  "function" == typeof r.handleEvent &&
                    (r.handleEvent = zb(r.handleEvent.bind(r), {
                      mechanism: {
                        data: {
                          function: "handleEvent",
                          handler: qm(r),
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
                  zb(r, {
                    mechanism: {
                      data: {
                        function: "addEventListener",
                        handler: qm(r),
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
            Jm(n, "removeEventListener", function (e) {
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
                  Jm(r, e, function (t) {
                    var n = {
                      mechanism: {
                        data: { function: e, handler: qm(t) },
                        handled: !0,
                        type: "instrument",
                      },
                    };
                    return (
                      t.__sentry_original__ &&
                        (n.mechanism.data.handler = qm(t.__sentry_original__)),
                      zb(t, n)
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
    Qb = (function () {
      function e(t) {
        (this.name = e.id),
          (this._options = hm(
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
            Kv().addBreadcrumb(
              {
                category:
                  "sentry." +
                  ("transaction" === e.type ? "transaction" : "event"),
                event_id: e.event_id,
                level: e.level,
                message: uv(e),
              },
              { event: e }
            );
        }),
        (e.prototype.setupOnce = function () {
          var e = this;
          this._options.console &&
            Iv({
              callback: function () {
                for (var t = [], n = 0; n < arguments.length; n++)
                  t[n] = arguments[n];
                e._consoleBreadcrumb.apply(e, vm(t));
              },
              type: "console",
            }),
            this._options.dom &&
              Iv({
                callback: function () {
                  for (var t = [], n = 0; n < arguments.length; n++)
                    t[n] = arguments[n];
                  e._domBreadcrumb.apply(e, vm(t));
                },
                type: "dom",
              }),
            this._options.xhr &&
              Iv({
                callback: function () {
                  for (var t = [], n = 0; n < arguments.length; n++)
                    t[n] = arguments[n];
                  e._xhrBreadcrumb.apply(e, vm(t));
                },
                type: "xhr",
              }),
            this._options.fetch &&
              Iv({
                callback: function () {
                  for (var t = [], n = 0; n < arguments.length; n++)
                    t[n] = arguments[n];
                  e._fetchBreadcrumb.apply(e, vm(t));
                },
                type: "fetch",
              }),
            this._options.history &&
              Iv({
                callback: function () {
                  for (var t = [], n = 0; n < arguments.length; n++)
                    t[n] = arguments[n];
                  e._historyBreadcrumb.apply(e, vm(t));
                },
                type: "history",
              });
        }),
        (e.prototype._consoleBreadcrumb = function (e) {
          var t = {
            category: "console",
            data: { arguments: e.args, logger: "console" },
            level: sb.fromString(e.level),
            message: Wm(e.args, " "),
          };
          if ("assert" === e.level) {
            if (!1 !== e.args[0]) return;
            (t.message =
              "Assertion failed: " +
              (Wm(e.args.slice(1), " ") || "console.assert")),
              (t.data.arguments = e.args.slice(1));
          }
          Kv().addBreadcrumb(t, { input: e.args, level: e.level });
        }),
        (e.prototype._domBreadcrumb = function (e) {
          var t;
          try {
            t = e.event.target ? Fm(e.event.target) : Fm(e.event);
          } catch (e) {
            t = "<unknown>";
          }
          0 !== t.length &&
            Kv().addBreadcrumb(
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
            Kv().addBreadcrumb(
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
                ? Kv().addBreadcrumb(
                    {
                      category: "fetch",
                      data: e.fetchData,
                      level: sb.Error,
                      type: "http",
                    },
                    { data: e.error, input: e.args }
                  )
                : Kv().addBreadcrumb(
                    {
                      category: "fetch",
                      data: hm(hm({}, e.fetchData), {
                        status_code: e.response.status,
                      }),
                      type: "http",
                    },
                    { input: e.args, response: e.response }
                  )));
        }),
        (e.prototype._historyBreadcrumb = function (e) {
          var t = av(),
            n = e.from,
            r = e.to,
            o = lv(t.location.href),
            i = lv(n),
            a = lv(r);
          i.path || (i = o),
            o.protocol === a.protocol && o.host === a.host && (r = a.relative),
            o.protocol === i.protocol && o.host === i.host && (n = i.relative),
            Kv().addBreadcrumb({
              category: "navigation",
              data: { from: n, to: r },
            });
        }),
        (e.id = "Breadcrumbs"),
        e
      );
    })(),
    Kb = (function () {
      function e(t) {
        void 0 === t && (t = {}),
          (this.name = e.id),
          (this._key = t.key || "cause"),
          (this._limit = t.limit || 5);
      }
      return (
        (e.prototype.setupOnce = function () {
          Wv(function (t, n) {
            var r = Kv().getIntegration(e);
            return r ? r._handler(t, n) : t;
          });
        }),
        (e.prototype._handler = function (e, t) {
          if (
            !(
              e.exception &&
              e.exception.values &&
              t &&
              Am(t.originalException, Error)
            )
          )
            return e;
          var n = this._walkErrorTree(t.originalException, this._key);
          return (e.exception.values = vm(n, e.exception.values)), e;
        }),
        (e.prototype._walkErrorTree = function (e, t, n) {
          if (
            (void 0 === n && (n = []),
            !Am(e[t], Error) || n.length + 1 >= this._limit)
          )
            return n;
          var r = Cb(Eb(e[t]));
          return this._walkErrorTree(e[t], t, vm([r], n));
        }),
        (e.id = "LinkedErrors"),
        e
      );
    })(),
    Xb = av(),
    Zb = (function () {
      function e() {
        this.name = e.id;
      }
      return (
        (e.prototype.setupOnce = function () {
          Wv(function (t) {
            var n, r, o;
            if (Kv().getIntegration(e)) {
              if (!Xb.navigator && !Xb.location && !Xb.document) return t;
              var i =
                  (null === (n = t.request) || void 0 === n ? void 0 : n.url) ||
                  (null === (r = Xb.location) || void 0 === r
                    ? void 0
                    : r.href),
                a = (Xb.document || {}).referrer,
                s = (Xb.navigator || {}).userAgent,
                l = hm(
                  hm(
                    hm(
                      {},
                      null === (o = t.request) || void 0 === o
                        ? void 0
                        : o.headers
                    ),
                    a && { Referer: a }
                  ),
                  s && { "User-Agent": s }
                ),
                u = hm(hm({}, i && { url: i }), { headers: l });
              return hm(hm({}, t), { request: u });
            }
            return t;
          });
        }),
        (e.id = "UserAgent"),
        e
      );
    })();
  r($b, "GlobalHandlers", function () {
    return Wb;
  }),
    r($b, "TryCatch", function () {
      return Jb;
    }),
    r($b, "Breadcrumbs", function () {
      return Qb;
    }),
    r($b, "LinkedErrors", function () {
      return Kb;
    }),
    r($b, "UserAgent", function () {
      return Zb;
    });
  var ey = "5.25.0",
    ty = (function (e) {
      function t(t) {
        return void 0 === t && (t = {}), e.call(this, jb, t) || this;
      }
      return (
        pm(t, e),
        (t.prototype.showReportDialog = function (e) {
          void 0 === e && (e = {}),
            av().document &&
              (this._isEnabled()
                ? Gb(hm(hm({}, e), { dsn: e.dsn || this.getDsn() }))
                : vv.error(
                    "Trying to call showReportDialog with Sentry Client disabled"
                  ));
        }),
        (t.prototype._prepareEvent = function (t, n, r) {
          return (
            (t.platform = t.platform || "javascript"),
            (t.sdk = hm(hm({}, t.sdk), {
              name: "sentry.javascript.browser",
              packages: vm((t.sdk && t.sdk.packages) || [], [
                { name: "npm:@sentry/browser", version: ey },
              ]),
              version: ey,
            })),
            e.prototype._prepareEvent.call(this, t, n, r)
          );
        }),
        (t.prototype._sendEvent = function (t) {
          var n = this.getIntegration(Qb);
          n && n.addSentryBreadcrumb(t), e.prototype._sendEvent.call(this, t);
        }),
        t
      );
    })(db),
    ny = [
      new mb.InboundFilters(),
      new mb.FunctionToString(),
      new Jb(),
      new Qb(),
      new Wb(),
      new Kb(),
      new Zb(),
    ];
  function ry(e) {
    if (
      (void 0 === e && (e = {}),
      void 0 === e.defaultIntegrations && (e.defaultIntegrations = ny),
      void 0 === e.release)
    ) {
      var t = av();
      t.SENTRY_RELEASE &&
        t.SENTRY_RELEASE.id &&
        (e.release = t.SENTRY_RELEASE.id);
    }
    !(function (e, t) {
      !0 === t.debug && vv.enable();
      var n = Kv(),
        r = new e(t);
      n.bindClient(r);
    })(ty, e);
  }
  const { model: oy } = Sg,
    iy = [
      "ResizeObserver loop limit exceeded",
      "Unable to preventDefault inside passive event listener",
      "Extension context invalidated.",
      "Invalid or unexpected token",
      "AbortError: The play() request was interrupted by a call to pause(). https://goo.gl/LdLk22",
      "InvalidStateError: Failed to execute 'transaction' on 'IDBDatabase'",
      "Timed out",
      "Failed to fetch",
    ];
  var ay = {
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
          (ry({
            dsn: this.dsn,
            release: u.version,
            debug: u.is.development,
            ignoreErrors: iy,
            environment: u.is.development
              ? "development"
              : u.is.production
              ? "production"
              : "unknown",
            beforeSend: (e, t) => {
              if (u.is.production && "debug" === e.level) return null;
              if (this.throttle) return null;
              if (oy.store && oy.state) {
                let t = { ...oy.state, authStatus: { ...oy.state.authStatus } };
                delete t.authStatus.cookies,
                  (t = JSON.stringify(t)),
                  (t =
                    t.length > 102400 ? t.substr(0, 102400) + "..." : oy.state),
                  (e.extra = { ...(e.extra || {}), state: t });
              }
              const n = t.originalException,
                r = (n && n.message) || String(n);
              return r && iy.some((e) => r.includes(e)) ? null : e;
            },
          }),
          log("sentry-controller: initialisation succeeded"));
      },
      sendError: function (e, t = "error", n = null, r = null) {
        console.log("%csentry", "color: #c818dc", e, n),
          u.is.background &&
            Hg.send(
              "popup.log",
              "%csentry error [background]",
              "color: #c818dc",
              e,
              n
            ),
          "string" == typeof e && (e = new Error(e)),
          tb("configureScope", (o) => {
            if (
              (o.setFingerprint([e.message]),
              o.setLevel(t),
              oy.store &&
                oy.state &&
                oy.state.authStatus &&
                o.setUser({ username: oy.state.authStatus.username }),
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
          nb(e);
      },
    },
  };
  new dm.Sender({ urlPrefix: u.options.apiUrl });
  var sy = Gg;
  const { model: ly } = Sg,
    uy = {
      ...sy,
      isAcknowledged: function (e) {
        return -1 !== ly.state.acknowledged[e];
      },
      userId: function () {
        return ly.state.authStatus.userId;
      },
      username: function () {
        return ly.state.authStatus.username;
      },
      allUsernames: function () {
        const e = ly.state,
          t = [],
          n = (e) => t.push(e.authStatus.username);
        n(e);
        for (const t in e.userStates) n(e.userStates[t]);
        return t;
      },
    },
    { action: cy } = Sg;
  var dy = cy("state.replace-state", (e, t) => t);
  const { action: fy } = Sg;
  var py = fy("state.acknowledge", (e, t) => {
      const n = S.getUnixTime();
      return { ...e, acknowledged: { ...e.acknowledged, [t]: n } };
    }),
    hy = () => [
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
      version: 228,
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
        posts: [],
      },
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
    my = () =>
      "Hello {@name}! 👋\n\n\n  {Thank you|Thanks} {@name}! 🙏\n\n\n  /tnx follow\n  {Hi|Hey|Hello|Greetings} {@name}! Thank you so much for following! Feel free to send me a DM!\n\n\n  /tnx contact\n  {Thank you for contacting us.|Thank you for reaching out to us.|Thank you for contacting us here.} {We have received your message and will be in touch shortly.|We will be in touch shortly, and you may also find answers to some of your questions on our FAQ page.|We will be in touch soon.}\n\n\n  /sorry missed\n  Hi {@username}! I am sorry I missed your message. I will get back to you as soon as possible. I look forward to speaking with you!\n\n\n  /ask feedback\n  {Hi|Hello|Hey|Greetings}! Just wanted to follow back with you and check how you find the product? Feel free to send me your feedback, suggestions or ideas.\n\n\n  /tmm\n  Thank you for contacting us. Due to an unusual level of activity, responses are delayed. We anticipate responding to your message within two business days. In the meantime, please feel free to reach out to us via email with any urgent needs or requests.\n  "
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
      zen: { enabled: !1 },
      quickReplies: { shown: !1, content: my(), total: 7 },
      settings: { laterAutoRetry: 12 * N.time.HOUR },
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
    yy = {},
    wy = {
      get: async function (e) {
        const t = await Sy();
        return (
          await _y,
          (_y = new Promise((n, r) => {
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
          _y
        );
      },
      set: async function (e, t) {
        const n = await Sy();
        return (
          await _y,
          (_y = new Promise((r, o) => {
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
          _y
        );
      },
      delete: async function (e) {
        const t = await Sy();
        return (
          await _y,
          (_y = new Promise((n, r) => {
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
          _y
        );
      },
      getAllKeys: async function () {
        const e = await Sy();
        return (
          await _y,
          (_y = new Promise((t, n) => {
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
          _y
        );
      },
    };
  let _y = Promise.resolve();
  async function Sy() {
    const e = Sy;
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
  var xy = { controller: wy },
    Py = {
      init: async function () {
        return void (await xy.controller.delete("image-proxy.cache"));
        (Ey = (await xy.controller.get("image-proxy.cache")) || {}),
          Dy.resolve(),
          Hg.on("image-proxy.save", Ty),
          Hg.on("image-proxy.cache-item-used", Iy);
      },
      save: Ty,
    };
  const ky = 15 * N.time.SECOND,
    Dy = N.createResolvablePromise();
  let Ey;
  async function Ty(e) {}
  async function Iy(e) {
    Ey[e] && ((Ey[e].lastUsedAt = Date.now()), Cy());
  }
  function Cy() {
    const e = Cy;
    clearTimeout(e.timeout),
      (e.timeout = setTimeout(async () => {
        xy.controller.set("image-proxy.cache", Ey);
      }, ky));
  }
  var Ay = { controller: Py },
    Fy = {
      init: function () {
        (My = -1),
          Hg.on("core-web-request.popup-tab-id", (e) => {
            Oy = e;
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
                fromExtension: Ny(e),
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
              Ry(e.requestHeaders);
              const n = new URL(e.url).host,
                r = {
                  details: e,
                  isBeforeRequest: !1,
                  isRequest: !0,
                  isResponse: !1,
                  fromExtension: Ny(e),
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
              Ry(e.responseHeaders);
              const n = new URL(e.url).host;
              return (
                t({
                  details: e,
                  isBeforeRequest: !1,
                  isRequest: !1,
                  isResponse: !0,
                  fromExtension: Ny(e),
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
  let Oy = null,
    My = null;
  function Ry(e) {
    for (const t of e) t.name = t.name.toLowerCase();
  }
  function Ny(e) {
    return e.tabId === Oy || e.tabId === My;
  }
  var Uy = { controller: Fy };
  const By = F();
  let Ly;
  function jy({
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
    if ((By(arguments[0]), n && d("instagram.com") && s("x-inssist-cookies"))) {
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
      n &&
        o &&
        (d("instagram.com") || d("facebook.com") || d("fastspring.com")))
    ) {
      const t = s("origin");
      if (!t || (null == t ? void 0 : t.value.startsWith("chrome-extension"))) {
        l("origin", new URL(e.url).origin);
      }
    }
    if (n && o && d("instagram.com")) {
      "iframe" === s("sec-fetch-dest").value && l("sec-fetch-dest", "document");
    }
    if (
      n &&
      o &&
      d("instagram.com") &&
      ("sub_frame" !== e.type || !c("/direct/"))
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
      t && c("facebook.com/x/oauth/status") && a(),
      t && c("/csp/reporting") && a(),
      r && d("instagram.com"))
    ) {
      const e = s("x-ig-set-www-claim");
      e && Ly !== e.value && (Ly = e.value);
    }
    if (n && d("instagram.com")) {
      !s("x-ig-www-claim") && Ly && l("x-ig-www-claim", Ly);
    }
    n &&
      o &&
      d("instagram.com") &&
      (u("sec-ch-ua"),
      u("sec-ch-ua-platform"),
      u("sec-ch-ua-mobile"),
      l("sec-fetch-user", "?1"),
      l("sec-fetch-site", "same-origin"),
      l("sec-ch-prefers-color-scheme", "light"));
  }
  var Vy = {
      controller: {
        init: function () {
          Uy.controller.watch(
            [
              "https://*.onfastspring.com/*",
              "https://*.instagram.com/*",
              "https://*.facebook.com/*",
              "https://*.inssist.com/*",
            ],
            jy
          );
        },
        onRequest: By,
      },
    },
    Hy = {};
  const { model: qy, transaction: zy } = Sg;
  let Gy = null,
    $y = !1;
  Hy.controller = {
    init: async function () {
      await this._setAuthStatusIfAbsent(),
        this._refreshUserOnSessionIdChange(),
        this._watchAndSaveFbCookies(),
        this._updateUserOnPopupStart(),
        Hg.on("auth.set-ig-initial-url", this._setIgInitialUrl.bind(this)),
        Hg.on("auth.login", this._login.bind(this)),
        Hg.on("auth.logout", this._logout.bind(this));
    },
    toggleSessionWatcher: function (e) {
      $y = !e;
    },
    updateUser: async function (e = !1) {
      log("auth-controller: updating user id...");
      const t = await this.refreshUser();
      t && (await qg.actualizeCookies()),
        !t && e && this._navigateToInstagram();
    },
    refreshUser: async function () {
      const e = this.refreshUser,
        t = U.generate();
      (e.requestId = t), Ag.ignoreCache();
      const n = await Ng.api.fetchViewerInfo();
      if (e.requestId !== t) return !1;
      if (n.error) return !1;
      const r = n.result || null,
        o = r && qy.state.authStatus.userId === r.userId;
      return (
        r && Ay.controller.save(r.avatarUrl),
        zy((e) => {
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
                N.removeFromArray(t, e.multiaccount.selectedUserId),
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
          (Hg.send("iframe-bus", "ig.clear-and-show-spinner"),
          r
            ? Gy
              ? Hg.send("iframe-bus", "ig.hard-go", Gy)
              : (yy.controller.cleanUpState(),
                Hg.send("iframe-bus", "ig.refresh"))
            : Hg.send("iframe-bus", "ig.hard-go", "/accounts/login/"),
          Hg.send("iframe-bus", "dm.refresh"),
          Hg.send("iframe-bus", "schedule.fcs-refresh-page")),
        (Gy = null),
        Hg.send("auth.refreshed"),
        !!r
      );
    },
    _clearCookies: async function (e) {
      const t = await N.callAsync(chrome.cookies.getAll, { domain: `.${e}` });
      for (const n of t)
        await N.callAsync(chrome.cookies.remove, {
          url: `https://*.${e}`,
          name: n.name,
        });
    },
    _updateUserOnPopupStart: function () {
      let e = null;
      Hg.on("popup.start", async () => {
        var t, n;
        const r = await N.callAsync(chrome.cookies.get, {
            url: "https://*.instagram.com",
            name: "sessionid",
          }),
          o =
            null === (t = qy.state.authStatus) ||
            void 0 === t ||
            null === (n = t.cookies) ||
            void 0 === n
              ? void 0
              : n.igSessionId,
          i = Date.now();
        (r && o === r.value && e && i - e <= 6 * N.time.HOUR) ||
          ((e = i), await this.updateUser());
      });
    },
    _navigateToInstagram: function () {
      chrome.tabs.update({ url: Og.login.url });
    },
    _setAuthStatusIfAbsent: async function () {
      if ("username" in qy.state.authStatus) return;
      Ag.ignoreCache();
      const e = await Ng.api.fetchViewerInfo();
      if (e.error) return;
      const t = e.result || null;
      zy((e) => {
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
      Vy.controller.onRequest(({ details: n, isResponse: r, checkHost: o }) => {
        if (r && o("facebook.com")) {
          !!n.responseHeaders.find((e) => "set-cookie" === e.name) &&
            (clearTimeout(e), (e = setTimeout(t)));
        }
      });
      const t = async () => {
        const e = await N.callAsync(chrome.cookies.getAll, {
          domain: ".facebook.com",
        });
        zy((t) => {
          t.authStatus.cookies.fb = e;
        });
      };
    },
    _setIgInitialUrl: function (e) {
      Gy = e;
    },
    _login: async function (e) {
      var t;
      const n =
        null === (t = qy.state.userStates[e]) || void 0 === t
          ? void 0
          : t.authStatus;
      if (n) {
        this.toggleSessionWatcher(!1);
        try {
          await this._clearCookies("facebook.com"),
            await this._applyCookies("facebook.com", n.cookies.fb),
            await this._clearCookies("instagram.com"),
            await this._applyCookies("instagram.com", n.cookies.ig),
            await N.callAsync(chrome.cookies.set, {
              url: "https://*.instagram.com",
              name: "sessionid",
              value: n.cookies.igSessionId,
              domain: ".instagram.com",
              path: "/",
              secure: !0,
              httpOnly: !1,
              sameSite: "no_restriction",
              expirationDate: Math.round((Date.now() + 365 * N.time.DAY) / 1e3),
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
          (await N.callAsync(chrome.cookies.set, {
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
      return $y || qy.state.schedule.fcsSetup.connecting;
    },
    _actualizeCoookies: async function () {
      const e = await N.callAsync(chrome.cookies.get, {
          url: "https://*.instagram.com",
          name: "sessionid",
        }),
        t = await N.callAsync(chrome.cookies.getAll, {
          domain: ".facebook.com",
        }),
        n = await N.callAsync(chrome.cookies.getAll, {
          domain: ".instagram.com",
        });
      zy((r) => {
        (r.authStatus.cookies.igSessionId =
          (null == e ? void 0 : e.value) || null),
          (r.authStatus.cookies.ig = n),
          (r.authStatus.cookies.fb = t);
      });
    },
  };
  var Wy = {};
  const { model: Yy } = Sg;
  (Wy.controller = {
    status: null,
    init: function () {
      this._subscribeToInflux();
    },
    _subscribeToInflux: function () {
      Yy.observe(
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
    (Ng.ec = {
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
  const Jy = Ng.ec,
    Qy = {
      "Failed to fetch": Jy.noNetwork,
      "Timed out": Jy.timedOut,
      "Redirect to login": Jy.redirectToLogin,
      "Missing user": Jy.missingUser,
      400: Jy.suspended,
      "400x": Jy.missingPost,
      403: Jy.forbidden,
      404: Jy.notFound,
      429: Jy.tooManyRequests,
      500: Jy.serverIsDown,
      502: Jy.badGateway,
      503: Jy.serviceUnavailable,
      560: Jy.serviceDown,
    };
  Ng.Response = class e {
    constructor(e, t, n, r) {
      (this.result = e),
        (this.error = t ? { code: t, message: n, body: r } : null);
    }
    isSuccess() {
      return !this.error;
    }
    reportError(e, t) {
      return (
        this.error.code === Jy.other &&
          ay.controller.sendError(
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
      const n = (t && t.message && Qy[t.message]) || Jy.other,
        r = (t && t.message) || null,
        o = (t && t.body) || null;
      return new e(null, n, r, o);
    }
  };
  const Ky = { headers: { "x-ig-app-id": "1217981644879628" } };
  function Xy(e, t) {
    const n = Date.now();
    return e * (Math.log(0.061 * N.time.DAY) / Math.log(0.061 * (n - t)));
  }
  function Zy(e) {
    if (e && e.includes(Og.challenge)) {
      const e = new Error();
      throw ((e.message = "400"), (e.body = "Challenge"), e);
    }
    return e;
  }
  function ew(e) {
    if (e && e.includes(Og.login.link)) {
      const e = new Error();
      throw (
        ((e.message = "Redirect to login"), (e.body = "Redirect to login"), e)
      );
    }
    return e;
  }
  function tw(e, t) {
    const n = async function (...n) {
      try {
        const t = await e(...n);
        return Ng.Response.ofResult(t);
      } catch (e) {
        return Ng.Response.ofNetworkError(e).reportError(t, e);
      }
    };
    return Hg.on(`ig-api.${t}`, n), n;
  }
  (Ng.api = {
    fetchViewerInfo: tw(async function () {
      try {
        return await (async function () {
          Ag.ignoreCache();
          const e = (await Ag.fetchText("https://instagram.com"))
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
          Ag.ignoreCache();
          const t = await Ag.fetchText(e, Ky),
            n = N.safeJsonParse(t);
          if (!n) return null;
          const r = n.form_data.username,
            o = await (async function (e) {
              var t;
              const n = N.createUrl(
                  "https://i.instagram.com/api/v1/users/web_profile_info/",
                  { username: e }
                ),
                r = await Ag.fetchJson(n, Ky);
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
    fetchLoginActivity: tw(async function () {
      return Ag.fetchJson(Og.loginActivity.url, Ky);
    }, "fetch-login-activity"),
    fetchTag: tw(async function (e, { incognito: t = !1 } = {}) {
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
        const n = Og.hashtag.url(e, { json: !0 }),
          o = t ? "omit" : "include";
        Ag.ignoreCache(),
          (r = await Ag.fetchText(n, { credentials: o, ...Ky }));
      } catch (e) {
        if ("404" !== e.message) throw e;
        o = !0;
      }
      if ((Zy(r), ew(r), o)) return (n.isBanned = !0), (n.isFlagged = !1), n;
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
              return { likes: Xy(r, n), comments: Xy(o, n) };
            })
            .sort(
              (e, t) =>
                N.calcEngagement(e.likes, t.comments) -
                N.calcEngagement(t.likes, t.comments)
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
          a = Math.round(N.time.DAY / r);
        }
        let u = [];
        {
          const t = {},
            n = [
              { edges: r, relevance: 2 },
              { edges: o, relevance: 1 },
            ];
          for (const e of n) {
            const n = N.getHashtagRegex(),
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
              return { likes: Xy(n, t), comments: Xy(r, t) };
            })
            .sort(
              (e, t) =>
                N.calcEngagement(e.likes, t.comments) -
                N.calcEngagement(t.likes, t.comments)
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
            l = Math.round(N.time.DAY / n);
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
            const n = N.getHashtagRegex(),
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
    fetchUserPosts: tw(async function e(t, n = 10, r = [], o = null) {
      const i = N.createUrl(
          `https://i.instagram.com/api/v1/feed/user/${t}/username/`,
          { count: 33, ...(o && { max_id: o }) }
        ),
        a = await Ag.fetchJson(i, Ky);
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
    searchProfiles: tw(async function (e) {
      const t = N.createUrl(`${Og.base}web/search/topsearch/`, {
        context: "user",
        query: e,
      });
      return (await Ag.fetchJson(t)).users.map((e) => ({
        id: e.user.pk,
        username: e.user.username,
        fullName: e.user.full_name,
        avatar: e.user.profile_pic_url,
      }));
    }, "search-profiles"),
    normalizePostStat24h: Xy,
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
    (Ng.Publisher = class {
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
          await this._uploadVideo(i, e, { type: "video" }),
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
      async postStoryVideo(e, t, { mentions: n = null }) {
        const r = this._generateUploadName("story");
        this._log("⏳ upload story video..."),
          await this._uploadVideo(r, e, { type: "story-video" }),
          this._log("⏳ upload story video cover..."),
          await this._uploadPhoto(r, t, { isVideoCover: !0 }),
          this._log("⏳ publish story video..."),
          await this._configure("/api/v1/web/create/configure_to_story/", {
            upload_id: this._getUploadId(r),
            ...(n && { reel_mentions: JSON.stringify(n) }),
          }),
          this._log("✅ success");
      }
      async _uploadPhoto(e, t, { isVideoCover: n = !1, cookies: r } = {}) {
        "image/png" === t.type && (t = await this._toJpeg(t)),
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
                }),
              },
            },
          });
      }
      async _uploadVideo(e, t, { type: n, cookies: r = null }) {
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
                ...("video" === n && {
                  for_album: !1,
                  is_igtv_video: !0,
                  is_unified_video: 1,
                }),
                ...("reel" === n && { for_album: !1, is_clips_video: 1 }),
                ...("story-video" === n && {
                  for_album: !0,
                  is_unified_video: 0,
                }),
              }),
            },
          },
        });
      }
      _generateUploadName(e = "fb_uploader") {
        return `${e}_${Date.now()}`;
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
      async _configure(e, t) {
        await this._fetch({
          attempts: 5,
          url: `https://www.instagram.com${e}`,
          opts: {
            method: "POST",
            credentials: "include",
            body: new URLSearchParams(t).toString(),
            headers: {
              accept: "*/*",
              "content-type": "application/x-www-form-urlencoded",
              "x-csrftoken": await this._fetchCsrfToken(),
              "x-ig-app-id": this._igAppId,
            },
          },
        });
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
          await N.sleep(3 * N.time.SECOND);
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
        return await new Promise((e) => n.toBlob(e, "image/jpeg", 1));
      }
    });
  var nw = {};
  (nw.controller = {
    init: function () {
      N.ls.remove("ab-testing-hash");
    },
  }),
    (qg.actualizeCookies = async () => {
      const e = await N.callAsync(chrome.cookies.getAll, {
        domain: ".instagram.com",
      });
      Sg.transaction((t) => {
        t.later.cookies = {};
        for (const n of e) t.later.cookies[n.name] = n.value;
      });
    }),
    (qg.generateCover = async (e, t = 0) => {
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
    }),
    (qg.MAX_CAPTION_LENGTH = 2200),
    (qg.cleanupController = {
      init: function () {
        (this._lastIdbCleanupAt = 0), this._cleanupOnPopupStart();
      },
      _cleanupOnPopupStart: function () {
        Hg.on("popup.start", async () => {
          this._cleanupState(), await this._cleanupIdb();
        });
      },
      _cleanupState: function () {
        Sg.transaction((e) => {
          const t = qg.proxy.getAllPosts(e);
          for (const e of t) delete e.fresh;
        });
      },
      _cleanupIdb: async function () {
        const e = Date.now();
        if (e - this._lastIdbCleanupAt < 5 * N.time.MINUTE) return;
        this._lastIdbCleanupAt = e;
        const t = (await xy.controller.getAllKeys()).filter((e) =>
            e.startsWith("later.post-")
          ),
          n = qg.proxy.getAllPosts();
        for (const e of t) {
          const t = e.split("-")[1];
          !!n.find((e) => e.id === t) || (await xy.controller.delete(e));
        }
      },
    }),
    (qg.controller = {
      init: function () {
        this._cleanupState(), qg.scheduler.init(), qg.cleanupController.init();
      },
      _cleanupState: function () {
        Sg.transaction((e) => {
          e.later.posts
            .filter((e) => "posting" === e.status)
            .forEach((e) => (e.status = "scheduled"));
        });
      },
    });
  var rw = {},
    ow = {};
  (qg.scheduler = {
    init: function () {
      (this._timer = null),
        (this._debug = !0),
        (this._publishing = !1),
        (this._lastPublishedAt = 0),
        this._setup();
    },
    _setup: function () {
      this._schedule(),
        Sg.model.observe(
          () =>
            qg.proxy
              .getConnectedUsersPosts()
              .map((e) => `${e.id}-${e.date}-${e.status}`)
              .join(":"),
          () => this._schedule(),
          !1
        ),
        Sg.model.observe(
          (e) => e.later.selectedPostId,
          () => this._schedule(),
          !1
        );
    },
    _schedule: function () {
      if (this._publishing) return;
      this._timer && this._timer.clear();
      const e = Sg.model.state,
        t = qg.proxy
          .getConnectedUsersPosts()
          .filter(
            (t) => "scheduled" === t.status && t.id !== e.later.selectedPostId
          )
          .sort((e, t) => e.date - t.date)
          .at(0);
      if (!t) return void this._log("no posts to publish");
      const n = qg.proxy.getPostOwnerState(e, t.id),
        r = (null == n ? void 0 : n.authStatus.username) || null,
        o = { post: t, owner: r };
      let i;
      const a = Date.now();
      if (
        ((i =
          0 === e.settings.laterAutoRetry
            ? t.date < a - 5 * N.time.MINUTE
            : -1 !== e.settings.laterAutoRetry &&
              t.date < a - e.settings.laterAutoRetry),
        i)
      )
        return (
          this._log("too old to publish", o),
          void qg.proxy.updatePost(t.id, (e) => {
            (e.status = "failed"),
              (e.error = { message: "Chrome was offline at the given time" });
          })
        );
      if (t.date > a) {
        const e = new Date(t.date).toLocaleString();
        return (
          this._log(`scheduled for ${e}`, o),
          void (this._timer = N.setTimer(() => this._schedule(), t.date - a))
        );
      }
      (async () => {
        this._log("publish", o),
          (this._publishing = !0),
          ow.controller.online
            ? await this._publishSafe(t)
            : await ow.controller.waitForOnline(),
          (this._publishing = !1),
          this._schedule();
      })();
    },
    _publishSafe: async function (e) {
      const t = qg.proxy.getPostPublishType(e);
      Hy.controller.toggleSessionWatcher(!1);
      try {
        await this._publish(e),
          rw.controller.sendEvent("user", "later:publish-success", t);
      } catch (n) {
        console.error(n),
          rw.controller.sendEvent("user", "later:publish-error", t),
          qg.proxy.updatePost(e.id, (e) => {
            (e.status = "failed"),
              (e.error = {
                message: "Error happened during posting",
                details: n.message ? n.message.slice(0, 300) : null,
              });
          });
      }
      Hy.controller.toggleSessionWatcher(!0),
        (this._lastPublishedAt = Date.now());
    },
    _publish: async function (e) {
      const t = Sg.model.state,
        n = () => qg.proxy.getPostOwnerState(t, e.id);
      qg.proxy.updatePost(e.id, (e) => {
        (e.status = "posting"), (e.error = null);
      });
      n().authStatus.userId === t.authStatus.userId &&
        (await qg.actualizeCookies());
      const r = Date.now() - this._lastPublishedAt,
        o = 10 * N.time.SECOND;
      r < o && (await N.sleep(o - r));
      const i = await xy.controller.get(`later.post-${e.id}`),
        a = n().later.cookies,
        s = new Ng.Publisher(a),
        l = (e.caption || "").slice(0, qg.MAX_CAPTION_LENGTH);
      if (ow.controller.offline)
        return void qg.proxy.updatePost(e.id, (e) => (e.status = "scheduled"));
      const u = qg.proxy.getPostPublishType(e);
      if ("photo" === u)
        await s.postPhoto(i.blob, {
          caption: l,
          location: e.location,
          mentions: e.mentions,
        });
      else if ("video" === u)
        await s.postVideo(i.blob, i.coverBlob, {
          caption: l,
          location: e.location,
          mentions: e.mentions,
        });
      else if ("reel" === u)
        await s.postReel(i.blob, i.coverBlob, {
          caption: l,
          location: e.location,
          mentions: e.mentions,
          shareToFeed: !!e.shareToFeed,
        });
      else if ("story-photo" === u)
        await s.postStoryPhoto(i.blob, { mentions: e.mentions });
      else if ("story-video" === u) {
        const t = await qg.generateCover(i.blob, 0);
        await s.postStoryVideo(i.blob, t, { mentions: e.mentions });
      }
      qg.proxy.updatePost(e.id, (e) => {
        e.status = "posted";
      });
    },
    _log: function (...e) {
      this._debug && console.log("%c[$later]", "color: #e07a00", ...e);
    },
  }),
    (qg.proxy = {
      getAllStates: function (e = Sg.model.state) {
        return [e, ...Object.values(e.userStates)];
      },
      getAllConnectedStates: function (e = Sg.model.state) {
        return this.getAllStates(e).filter((t) => {
          const n = t.authStatus.userId;
          return e.multiaccount.userIds.includes(n);
        });
      },
      getSelectedUserState: function (e = Sg.model.state) {
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
      getAllPosts: function (e = Sg.model.state) {
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
        const e = Sg.model.state;
        return this.getAllPosts().find((t) => t.id === e.later.selectedPostId);
      },
      getPostPublishType: function (e) {
        return "reel" === e.type
          ? "reel"
          : "post" === e.type && e.isVideo
          ? "video"
          : "post" !== e.type || e.isVideo
          ? "story" === e.type && e.isVideo
            ? "story-video"
            : "story" !== e.type || e.isVideo
            ? void 0
            : "story-photo"
          : "photo";
      },
      updatePost: function (e, t = () => {}) {
        Sg.transaction((n) => {
          const r = (n = this.getPostOwnerState(n, e)).later.posts.find(
            (t) => t.id === e
          );
          r && t(r);
        });
      },
      deletePost: function (e) {
        Sg.transaction((t) => {
          const n = (t = this.getPostOwnerState(t, e)).later.posts.findIndex(
            (t) => t.id === e
          );
          t.later.posts.splice(n, 1);
        });
      },
      isPostEditable: function (e) {
        return "posted" !== e.status && "posting" !== e.status;
      },
    });
  const iw = "__iframeBus.name",
    aw = "__iframeBus.args",
    sw = "__iframeBus.callbackId",
    lw = "undefined" != typeof parent && parent !== window;
  function uw(e, t) {
    const n = pw(e),
      r = t["__iframeBus.handlers"] || (t["__iframeBus.handlers"] = {});
    (r[e] = async (r) => {
      if (r.data["__iframeBus.name"] === n) {
        const n = r.data["__iframeBus.args"] || [],
          o = r.data["__iframeBus.callbackId"] || null,
          i = await t(...n);
        o && fw(`${e}:response-${o}`, i);
      }
    }),
      window.addEventListener("message", r[e]);
  }
  function cw(e, t) {
    uw(e, function n(...r) {
      return dw(e, n), t(...r);
    });
  }
  function dw(e, t) {
    const n = t["__iframeBus.handlers"] || (t["__iframeBus.handlers"] = {});
    window.removeEventListener("message", n[e]);
  }
  async function fw(e, ...t) {
    let n;
    const r = t[t.length - 1];
    "function" == typeof r ? ((n = r), (t = t.slice(0, -1))) : (n = null);
    const o = e.includes(":response-"),
      i = pw(e),
      a = o ? null : U.generate();
    if (
      (lw
        ? parent.postMessage({ [iw]: i, [aw]: t, [sw]: a }, "*")
        : (function (e, t = document) {
            e = A(e);
            const n = [];
            for (const r of e) {
              const e = t.querySelectorAll(r);
              for (const t of e) n.includes(t) || n.push(t);
            }
            return n;
          })("iframe").forEach((e) => {
            e.contentWindow.postMessage({ [iw]: i, [aw]: t, [sw]: a }, "*");
          }),
      !o)
    )
      return new Promise((t) => {
        const r = (o) => {
          n && n(o), dw(`${e}:response-${a}`, r), t(o);
        };
        uw(`${e}:response-${a}`, r);
      });
  }
  function pw(e) {
    return `iframe-bus.${e}`;
  }
  var hw = {
    init: function () {
      Hg.on("iframe-bus", (e, ...t) => fw(e, ...t)),
        uw("chrome-bus", (e, ...t) => Hg.send(e, ...t));
    },
    on: uw,
    once: cw,
    off: dw,
    send: fw,
    wait: async function (e) {
      return await new Promise((t) => {
        cw(e, t);
      });
    },
  };
  rw.controller = {
    init: function () {
      return (
        u.is.popup
          ? (this._insertAnalyticsScript(),
            this._initIframeMessage(),
            this._sendBgEvents())
          : u.is.background && this._initChromeMessage(),
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
      hw.on("ga.send-event", (...e) => {
        this.sendEvent(...e);
      });
    },
    _initChromeMessage: function () {
      Hg.on("ga.send-event", (...e) => {
        this.sendEvent(...e);
      });
    },
    _sendBgEvents: async function () {
      const e = (await xy.controller.get("ga.bgEvents")) || [];
      await xy.controller.set("ga.bgEvents", []);
      for (const t of e) this._ga(...t);
    },
    sendPageview: function () {
      if (!this._enabled()) return this;
      const e = u.is.background ? "background" : document.location.pathname;
      return this._ga("send", "pageview", e), this;
    },
    sendInstall: function () {
      if (!Sg.model.state.installedEventSent) {
        const e = chrome.runtime.getManifest().version,
          t = "installed:" + (globalThis.electron ? "electron" : "chrome");
        this.sendEvent("user", t, e),
          Sg.transaction((e) => {
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
        console.warn("GA", e);
        const t = (await xy.controller.get("ga.bgEvents")) || [];
        t.push(e), await xy.controller.set("ga.bgEvents", t);
      } else {
        if (!globalThis.ga) return;
        globalThis.ga(...e);
      }
    },
  };
  function gw(e, t, { once: n = !1 } = {}) {
    globalThis.addEventListener(
      `__event-bus.${e}`,
      (e) => {
        const n = e.detail || [];
        t(...n);
      },
      { once: n }
    );
  }
  var mw = {
    send: function (e, ...t) {
      const n = new CustomEvent(`__event-bus.${e}`, { detail: t });
      globalThis.dispatchEvent(n);
    },
    on: gw,
    once: function (e, t) {
      gw(e, t, { once: !0 });
    },
  };
  var vw = "fb-api.fb-error",
    bw = "fb-api.unknown",
    yw = {
      isError: function (e, t = null) {
        return e && e[ww] && (!t || e.code === t);
      },
      checkAuth: xw(async function e(t = !0) {
        let n;
        try {
          Ag.ignoreCache(),
            (n = await Ag.fetch(
              "https://www.facebook.com/settings?tab=your_facebook_information"
            ));
        } catch (n) {
          return t
            ? e(!1)
            : (ay.controller.sendError(
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
      switchToFcs: xw(async function () {
        await Sw({
          url: "https://business.facebook.com/api/graphql/",
          body: {
            doc_id: "7406802046028852",
            variables: JSON.stringify({
              config: { user_saved_tailoring_experience: "DEFAULT" },
            }),
          },
        });
      }, "switch-to-fcs"),
      fcsDeletePost: xw(async function (e) {
        await Sw({
          url: N.createUrl(
            "https://business.facebook.com/media/manager/instagram_media/delete/",
            { id: e }
          ),
        });
      }, "fcs-delete-post"),
      fcsSaveAsDraft: xw(async function (e, { caption: t = null } = {}) {
        await Sw({
          url: N.createUrl(
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
      fcsSaveAsScheduled: xw(async function (e, t, { caption: n = null } = {}) {
        await Sw({
          url: N.createUrl(
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
      fcsSaveAsPublished: xw(async function (e, { caption: t = null } = {}) {
        await Sw({
          url: N.createUrl(
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
  const ww = Symbol("isFbApiError");
  function _w(e = {}) {
    return { ...e, [ww]: !0 };
  }
  async function Sw({ url: e, incognito: t = !1, body: n = {} }) {
    var r;
    Ag.ignoreCache();
    const o =
        (null ===
          (r = (
            await Ag.fetchText("https://business.facebook.com/creatorstudio")
          ).match(/"DTSGInitialData"[^"]*"token":"([^"]*)"/)) || void 0 === r
          ? void 0
          : r[1]) || null,
      i =
        (
          await Ag.fetchText(e, {
            method: "POST",
            headers: { "content-type": "application/x-www-form-urlencoded" },
            body: N.createQueryString({
              __a: 1,
              locale: "en_US",
              ...(o && { fb_dtsg: o }),
              ...n,
            }),
          })
        ).replace("for (;;);", "") || "{}",
      a = JSON.parse(N.jsonEscape(i)),
      s = a.payload || {};
    if (
      (Array.isArray(s.error) && s.error.length) ||
      (N.isObject(s.error) && Object.keys(s.error).length) ||
      s.error_code ||
      s.errorCode ||
      s.errorMessage
    )
      throw _w({ code: vw, payload: s });
    return a;
  }
  function xw(e, t) {
    const n = async (...n) => {
      try {
        return await e(...n);
      } catch (e) {
        if (e && e[ww]) throw ((e.method = t), e);
        throw (
          (ay.controller.sendError(
            `fb-api.${t}`,
            "error",
            { details: e },
            { actor: "fb-api" }
          ),
          _w({ code: bw, method: t, details: e }))
        );
      }
    };
    return (
      Hg.on(`fb-api.${t}`, async (...e) => {
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
  var Pw = { api: yw };
  const { model: kw, transaction: Dw } = Sg;
  var Ew = {
    init: function () {
      Hg.on("schedule.connect-to-fcs", Tw),
        Hg.on("schedule.drop-fb-xs-cookie", Fw);
    },
  };
  async function Tw({ skipFbLogin: e = !1 } = {}) {
    if (kw.state.schedule.fcsSetup.connecting) return;
    Dw((e) => {
      (e.schedule.fcsSetup.screen = "steps"),
        (e.schedule.fcsSetup.connecting = !0);
    }),
      Iw(
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
    if (await Aw()) return;
    if (!e) {
      let e;
      try {
        e = await Pw.api.checkAuth();
      } catch (e) {
        return (
          console.error("[fcs setup] failed to check fb auth", e),
          Iw({ fbLogin: "failed" }),
          void Dw((e) => (e.schedule.fcsSetup.connecting = !1))
        );
      }
      if (!e)
        return (
          Iw({ fbLogin: "nok" }),
          void Dw((e) => (e.schedule.fcsSetup.connecting = !1))
        );
    }
    Iw({ fbLogin: e ? "skipped" : "ok", igProfessional: "loading" }),
      await N.sleep(1e3),
      Ag.ignoreCache();
    const t = (await Ng.api.fetchViewerInfo()).result;
    if (!t)
      return (
        Iw({ igProfessional: "failed" }),
        void Dw((e) => (e.schedule.fcsSetup.connecting = !1))
      );
    if (!t.isProfessionalAccount)
      return (
        Iw({ igProfessional: "nok" }),
        void Dw((e) => (e.schedule.fcsSetup.connecting = !1))
      );
    Iw({ igProfessional: "ok", igConnectedToFbPage: "loading" });
    if (await Aw()) return;
    let n;
    if (
      ((n = e
        ? await Hg.send("iframe-bus", "schedule.connect-via-ig")
        : await Hg.send("iframe-bus", "schedule.connect-via-fb")),
      n.error)
    )
      return (
        e && Fw(),
        "not-connected-to-fb-page" === n.error
          ? Iw({ igConnectedToFbPage: "nok" })
          : "auth-window-closed-by-user" === n.error
          ? (Iw({ igConnectedToFbPage: "failed" }), Hy.controller.refreshUser())
          : (console.error("[fcs setup]", n.error),
            Iw({ igConnectedToFbPage: "failed" }, n.error)),
        void Dw((e) => (e.schedule.fcsSetup.connecting = !1))
      );
    if (e) {
      const { fcsConnected: e } = await Cw();
      if (!e)
        return (
          Fw(),
          Iw({ igConnectedToFbPage: "failed" }, "failed-to-skip-fb-login"),
          void Dw((e) => (e.schedule.fcsSetup.connecting = !1))
        );
    }
    try {
      await Hy.controller.refreshUser();
    } catch (e) {
      return (
        console.error("[fcs setup] failed to refresh user", e),
        Iw({ igConnectedToFbPage: "failed" }, "failed-to-refresh-user"),
        void Dw((e) => (e.schedule.fcsSetup.connecting = !1))
      );
    }
    Iw({ igConnectedToFbPage: "ok" }),
      await N.sleep(1e3),
      Dw((e) => {
        (e.schedule.fcsSetup.connecting = !1),
          (e.schedule.fcsSetup.showPanel = !1),
          (e.schedule.loading = !0);
      }),
      Hg.send("iframe-bus", "schedule.fcs-refresh-page"),
      rw.controller.sendEvent("user", "schedule:setup-connection-success");
  }
  function Iw(e = {}, t = null) {
    for (const n in e)
      if ("failed" === e[n]) {
        const e = t ? `${n}_${t}` : n;
        rw.controller.sendEvent("user", "schedule:setup-connection-error", e);
        break;
      }
    Dw((t) => {
      Object.assign(t.schedule.fcsSetup.steps, e);
    });
  }
  async function Cw() {
    return (
      Hg.send("iframe-bus", "schedule.fcs-refresh-page"),
      new Promise((e) => {
        Hg.on(
          "schedule.fcs-connection-status",
          function t({ fcsConnected: n }) {
            Hg.off("schedule.fcs-connection-status", t), e({ fcsConnected: n });
          }
        );
      })
    );
  }
  async function Aw() {
    const { fcsConnected: e } = await Cw();
    return (
      !!e &&
      (Hg.send("iframe-bus", "schedule.fcs-refresh-page"),
      Dw((e) => {
        (e.schedule.fcsSetup.connecting = !1),
          (e.schedule.fcsSetup.showPanel = !1),
          (e.schedule.loading = !0);
      }),
      !0)
    );
  }
  async function Fw() {
    await N.callAsync(chrome.cookies.remove, {
      url: "https://*.facebook.com/*",
      name: "xs",
    });
  }
  var Ow = {
    init: function () {
      !(function () {
        let e;
        Hg.on("schedule.upload-99", (t) => {
          clearTimeout(e),
            (e = setTimeout(() => {
              ay.controller.sendError(
                "Upload stuck at 99.9%",
                "error",
                { debugData: t },
                { actor: "schedule" }
              );
            }, 20 * N.time.SECOND));
        }),
          Hg.on("schedule.upload-100", () => {
            clearTimeout(e);
          });
      })();
    },
  };
  const { model: Mw, transaction: Rw } = Sg;
  async function Nw(e = !1) {
    const t = Mw.state,
      n = t.authStatus.username;
    if (!n) return;
    if (!e) {
      if (t.schedule.fcsSetup.checking) return;
      if (t.schedule.fcsSetup.connected) return;
    }
    Ag.ignoreCache();
    const r = await Ng.api.fetchUserPosts(n, 50);
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
    Rw((e) => {
      (e.schedule.loading = !1),
        (e.schedule.lastIgPostsUpdateOn = Date.now()),
        (e.schedule.posts = e.schedule.posts
          .filter((e) => "local" === e.source)
          .concat(o));
    });
  }
  var Uw = {
      controller: {
        init: function () {
          Ew.init(),
            Ow.init(),
            (async function () {
              Hg.on("popup.start", async () => {
                const e = [Mw.state, ...Object.values(Mw.state.userStates)],
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
                  r = await xy.controller.getAllKeys();
                for (const e of r)
                  if (e.startsWith("schedule.fcs-post-preview:")) {
                    const n = e.split(":")[1];
                    if (t.includes(n)) continue;
                    await N.safe(() => xy.controller.delete(e));
                  } else if (e.startsWith("schedule.local-post:")) {
                    const t = e.split(":")[1];
                    if (n.includes(t)) continue;
                    await N.safe(() => xy.controller.delete(e));
                  }
              });
            })(),
            Hg.on("schedule.update-ig-posts", Nw),
            mw.on("schedule.update-ig-posts", Nw);
        },
        getReport: async function () {
          return await Hg.send("iframe-bus", "schedule.fcs-get-report");
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
    },
    Bw = {
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
  function Lw(e) {
    const t = by.getTemplateUserState();
    Sg.transaction((n) => {
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
        Object.assign(n.coverAssist, Bw),
        (n.musicAssist.shown = !1),
        (n.storyAssist.shown = !1),
        (n.storyAssist.isVideo = !1),
        (n.storyAssist.coverUrl = null),
        (n.storyAssist.showUpsellOverlay = !1),
        (n.storyAssist.mentions.query = ""),
        (n.storyAssist.mentions.foundUsers = []),
        (n.storyAssist.mentions.selectedUsers = []),
        (n.later.showBodyPanel = !1),
        (n.later.showAssistPanel = !1),
        (n.later.selectedUserId = n.authStatus.userId),
        (n.later.selectedPostId = null),
        (n.later.selectedPillId = null),
        (n.later.selectedIgDate = null),
        (n.later.errors = []),
        (n.later.processing = !1),
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
        (n.schedule.dateDialog = Uw.getDefaultDateDialogState(n)),
        (n.schedule.addCard = t.schedule.addCard),
        (n.bulk = t.bulk);
      const a = Date.now() + N.time.DAY,
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
  yy.controller = {
    init: function () {
      Hg.on("cleanup.clean-up-state", () => {
        const e = Date.now();
        return Lw(e), e;
      });
    },
    cleanUpState: Lw,
  };
  var jw = {
      getConfig: () => {
        const e = o.get("fusion.config");
        return e && e.version >= jw.config.version ? e : jw.config;
      },
    },
    Vw = {
      reset: function () {
        Hw(), Hg.send("reset.reset");
      },
      onReset: function (e) {
        Hw(e), Hg.on("reset.reset", e);
      },
    };
  const Hw = F();
  var qw = { controller: Vw };
  let zw, Gw;
  function $w() {
    N.ls.remove("fusion.last-check-on");
  }
  async function Ww() {
    const e = 15 * N.time.MINUTE,
      t = Number(N.ls.get("fusion.last-check-on"));
    if (t && Date.now() < t + e) return;
    N.ls.set("fusion.last-check-on", Date.now());
    const n = jw.getConfig(),
      r = `${u.options.apiUrl}/fusion?version=${n.version}`;
    Ag.ignoreCache();
    const o = (await Ag.fetchText(r, { credentials: "omit" }))
        .replace(/&amp;/g, "&")
        .replace(/&#34;/g, '\\"')
        .replace(/&#39/g, "'")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">"),
      i = JSON.parse(o);
    if (!i.config) return;
    const a = JSON.parse(JSON.stringify(n));
    Gw = Jw(a, i.config);
    chrome.extension.getViews({ type: "tab" }).length > 0
      ? Hg.send("fusion.new-version-available")
      : Yw();
  }
  function Yw() {
    Gw && (N.ls.set("fusion.config", Gw), location.reload());
  }
  function Jw(e, t) {
    for (const n in t)
      N.isObject(e[n]) && N.isObject(t[n]) ? Jw(e[n], t[n]) : (e[n] = t[n]);
    return e;
  }
  (jw.controller = {
    init: function () {
      Hg.on("fusion.check-new-version", Ww),
        Hg.on("fusion.popup-tab-id", (e) => {
          zw = e;
        }),
        qw.controller.onReset($w),
        chrome.tabs.onRemoved.addListener((e) => {
          e === zw && Gw && Yw();
        }),
        Hg.on("fusion.update-now-click", () => {
          N.ls.set("fusion.reload-popup-on-background-start", !0), Yw();
        }),
        N.ls.get("fusion.reload-popup-on-background-start") &&
          (N.ls.remove("fusion.reload-popup-on-background-start"),
          Hg.send("fusion.reload-popup")),
        chrome.alarms.onAlarm.addListener(async (e) => {
          "fusion.refresh-config" === e.name && Ww();
        }),
        chrome.alarms.create("fusion.refresh-config", {
          when: Date.now(),
          periodInMinutes: 1440,
        });
    },
  }),
    (jw.config = {
      version: 128,
      dmSelectors: {
        general: {
          reactRoot: ["#react-root", '[id^="mount"]'],
          page: [
            ".t30g8",
            ".PolarisDirectShell._a9-0",
            "section.PolarisBaseShell > ._a9-0",
            "section.PolarisBaseShell > ._aa5f",
          ],
          header: ["._lz6s", ".PolarisDesktopNav._acum"],
          main: [".x14k21rp"],
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
          accountSwitcher: [".PolarisGenericDesktopHeader._aa4o"],
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
          conversationItemWrapSkeleton: [
            '.PolarisDirectInboxList > div > div[data-visualcompletion="loading-state"]',
          ],
          conversationItem: [
            ".-qQT3",
            ".rOtsg",
            ".PolarisDirectInboxList > div > .PolarisIGCoreBox._ab99 > *:first-child",
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
            ".IGDSPopover:has(.PolarisMobileCreationMenuContent)",
            ".PolarisMobileCreationMenuContent",
          ],
          creationPopupPostButton: [
            '.PolarisMobileCreationNavItem ._aa5x [role="button"]:first-child',
            '.PolarisMobileCreationNavItem ._ad8j [role="button"]:first-child',
            '.PolarisMobileCreationNavItem ._aa5- [role="button"]:first-child',
            '.PolarisMobileCreationMenuContent [role="button"]:first-child',
          ],
          creationPopupStoryButton: [
            '.PolarisMobileCreationNavItem ._aa5x [role="button"]:last-child',
            '.PolarisMobileCreationNavItem ._ad8j [role="button"]:last-child',
            '.PolarisMobileCreationNavItem ._aa5- [role="button"]:last-child',
            '.PolarisMobileCreationMenuContent [role="button"]:last-child',
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
            ".createKeyCommandWrapper .PolarisNavigation > div[class]",
          ],
          tabBarTopContainer: [".IGDSBox:has(> .createKeyCommandWrapper)"],
          tabBarInput: [
            ".ZoygQ input",
            ".PolarisNavigation input.PolarisImageFileForm",
          ],
          tabBarCreatePostInput: [
            ".PolarisMobileCreationNavItem > form:last-child > input",
          ],
          tabBarButton: [
            '.PolarisNavigation[style*="transform"] > div',
            ".xaeubzz > div",
          ],
          tabBarCreatePostButton: [
            "._0TPg",
            ".BvyAW > div:nth-child(3)",
            '[data-testid="new-post-button"]',
            ".PolarisMobileNavLoggedIn._abp8",
            ".PolarisMobileNavLoggedIn > div:nth-child(3)",
            '.PolarisNavigation[style*="transform"] > div:nth-child(3)',
            ".xaeubzz > div:nth-child(3)",
          ],
          tabBarCreatePostButtonLink: [
            '[data-testid="new-post-button"] a',
            ".PolarisMobileNavLoggedIn._abp8 a",
            ".PolarisMobileNavLoggedIn > div:nth-child(3) a",
            '.PolarisNavigation[style*="transform"] > div:nth-child(3) a',
            ".xaeubzz > div:nth-child(3) a",
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
          splashScreen: ["body > #splash-screen"],
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
          ],
          shareMenuItem: [
            ".RnEpo.xpORG._9Mt7n .-qQT3",
            ".PolarisIGCoreModalBackdrop > ._ac7o ._abm4",
            ".PolarisIGCoreModalBackdrop a.Pressable",
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
            "div:has(> .PolarisClipsGridItem)",
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
          openMbsButton: [
            'div:has(> a[href*="https://business.facebook.com/business/loginpage/"])',
            'div:has(> a[href*="instagram.com/?u=https%3A%2F%2Fbusiness.facebook.com"])',
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
          postsContainer: [".IGDSBox > .PolarisFeedPage"],
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
          ".PolarisVideoLegacy",
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
        postCreationPage: ['html[data-page="CreationStylePage"]'],
        storyCreationPage: ['html[data-page="StoryCreationPage"]'],
        "new-post_tag-people-image-container": ".qJfNm",
      },
      ig: { STORY_REELS_ITEM_SEEN: "STORY_REELS_ITEM_SEEN" },
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
          translationsButton: ".fbDockWrapperRight",
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
    });
  var Qw = {};
  (Qw.controller = {
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
      Hg.on("wri.popup-tab-created", async (e) => {
        await this._removeRules(this._tabRuleIds);
        const t = this._tabRuleCreators.map((t) => t(e)),
          n = await this._applyRules(t);
        this._tabRuleIds = n;
      });
    },
    _dropAllRules: async function () {
      const e = await N.callAsync(chrome.declarativeNetRequest.getSessionRules);
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
      await N.callAsync(chrome.declarativeNetRequest.updateSessionRules, {
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
        await N.callAsync(chrome.declarativeNetRequest.updateSessionRules, {
          addRules: e,
        }),
        e.map((e) => e.id)
      );
    },
  }),
    (ow.controller = {
      init: function () {
        (this._onOnline = N.createEmitter()),
          (this._onOffline = N.createEmitter()),
          this._watchOnlineStatus(),
          this._updateUserWhenOnlineStatusChanges(),
          setInterval(() => this._recoverIfOffline(), 5 * N.time.MINUTE);
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
        if (3 === u.manifestVersion) {
          if (!navigator.connection) return;
          let e = navigator.onLine;
          navigator.connection.addEventListener("change", () => {
            navigator.onLine !== e &&
              ((e = navigator.onLine),
              e ? this._onOnline() : this._onOffline());
          });
        } else
          globalThis.addEventListener("online", () => this._onOnline()),
            globalThis.addEventListener("offline", () => this._onOffline());
      },
      _updateUserWhenOnlineStatusChanges: function () {
        this._onOnline(() => {
          log("[$chromeStarter] going online"),
            null === Sg.model.state.authStatus.userId &&
              Hy.controller.updateUser();
        }),
          this._onOffline(() => {
            log("[$chromeStarter] going offline"),
              null !== Sg.model.state.authStatus.userId &&
                Hy.controller.updateUser();
          });
      },
      _recoverIfOffline: function () {
        null === Sg.model.state.authStatus.userId &&
          (log("[$chromeStarter] trying to recover from offline"),
          Hy.controller.updateUser());
      },
    });
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
            i = !n && !r && !o && Qe(e);
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
          if (!B(e)) return e;
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
                  l || d || "function" != typeof e.constructor || F(e)
                    ? {}
                    : Ve(ye(e))),
                !s)
              )
                return l
                  ? (function (e, t) {
                      return k(e, qe(e), t);
                    })(
                      e,
                      (function (e, t) {
                        return e && k(t, V(t), e);
                      })(a, e)
                    )
                  : (function (e, t) {
                      return k(e, He(e), t);
                    })(
                      e,
                      (function (e, t) {
                        return e && k(t, j(t), e);
                      })(a, e)
                    );
            } else {
              if (!J[c]) return o ? e : {};
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
                    return je ? Object(je.call(e)) : {};
                }
              })(e, c, s);
            }
          }
          if ((i || (i = new h()), (o = i.get(e)))) return o;
          if ((i.set(e, a), Je(e)))
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
          l = u ? (l ? I : T) : l ? V : j;
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
          return L(e) && "[object Arguments]" == _(e);
        }
        function x(e, t, n, r, o) {
          if (e === t) t = !0;
          else if (null == e || null == t || (!L(e) && !L(t)))
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
                    s || Qe(e) ? D(e, t, n, r, x, o) : E(e, t, i, n, r, x, o));
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
                  (t = D(u(e), u(t), r, o, i, s)),
                  s.delete(e),
                  t);
            case "[object Symbol]":
              if (je) return je.call(e) == je.call(t);
          }
          return !1;
        }
        function T(e) {
          return w(e, j, He);
        }
        function I(e) {
          return w(e, V, qe);
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
        function A(e, t) {
          var n = null == e ? z : e[t];
          return !B(n) || (fe && fe in n) || !(N(n) ? he : $).test(O(n))
            ? z
            : n;
        }
        function F(e) {
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
          return null != e && U(e.length) && !N(e);
        }
        function N(e) {
          return (
            !!B(e) &&
            ("[object Function]" == (e = _(e)) ||
              "[object GeneratorFunction]" == e ||
              "[object AsyncFunction]" == e ||
              "[object Proxy]" == e)
          );
        }
        function U(e) {
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
        function L(e) {
          return null != e && "object" == typeof e;
        }
        function j(e) {
          if (R(e)) e = g(e);
          else if (F(e)) {
            var t,
              n = [];
            for (t in Object(e))
              de.call(e, t) && "constructor" != t && n.push(t);
            e = n;
          } else e = Ee(e);
          return e;
        }
        function V(e) {
          if (R(e)) e = g(e, !0);
          else if (B(e)) {
            var t,
              n = F(e),
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
        function q() {
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
        var J = {};
        (J["[object Arguments]"] =
          J["[object Array]"] =
          J["[object ArrayBuffer]"] =
          J["[object DataView]"] =
          J["[object Boolean]"] =
          J["[object Date]"] =
          J["[object Float32Array]"] =
          J["[object Float64Array]"] =
          J["[object Int8Array]"] =
          J["[object Int16Array]"] =
          J["[object Int32Array]"] =
          J["[object Map]"] =
          J["[object Number]"] =
          J["[object Object]"] =
          J["[object RegExp]"] =
          J["[object Set]"] =
          J["[object String]"] =
          J["[object Symbol]"] =
          J["[object Uint8Array]"] =
          J["[object Uint8ClampedArray]"] =
          J["[object Uint16Array]"] =
          J["[object Uint32Array]"] =
            !0),
          (J["[object Error]"] =
            J["[object Function]"] =
            J["[object WeakMap]"] =
              !1);
        var Q,
          K = "object" == typeof e && e && e.Object === Object && e,
          X = "object" == typeof self && self && self.Object === Object && self,
          Z = K || X || Function("return this")(),
          ee = "object" == typeof t && t && !t.nodeType && t,
          te = ee && "object" == typeof n && n && !n.nodeType && n,
          ne = te && te.exports === ee,
          re = ne && K.process;
        e: {
          try {
            Q = re && re.binding && re.binding("util");
            break e;
          } catch (e) {}
          Q = void 0;
        }
        var oe = Q && Q.isMap,
          ie = Q && Q.isSet,
          ae = Q && Q.isTypedArray,
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
              var e = A(Object, "defineProperty");
              return e({}, "", {}), e;
            } catch (e) {}
          })(),
          ke = Object.getOwnPropertySymbols,
          De = ge ? ge.isBuffer : z,
          Ee = s(Object.keys),
          Te = A(Z, "DataView"),
          Ie = A(Z, "Map"),
          Ce = A(Z, "Promise"),
          Ae = A(Z, "Set"),
          Fe = A(Z, "WeakMap"),
          Oe = A(Object, "create"),
          Me = O(Te),
          Re = O(Ie),
          Ne = O(Ce),
          Ue = O(Ae),
          Be = O(Fe),
          Le = me ? me.prototype : z,
          je = Le ? Le.valueOf : z,
          Ve = (function () {
            function e() {}
            return function (t) {
              return B(t)
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
        var He = ke
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
            : H,
          qe = ke
            ? function (e) {
                for (var t = []; e; ) r(t, He(e)), (e = ye(e));
                return t;
              }
            : H,
          ze = _;
        ((Te && "[object DataView]" != ze(new Te(new ArrayBuffer(1)))) ||
          (Ie && "[object Map]" != ze(new Ie())) ||
          (Ce && "[object Promise]" != ze(Ce.resolve())) ||
          (Ae && "[object Set]" != ze(new Ae())) ||
          (Fe && "[object WeakMap]" != ze(new Fe()))) &&
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
                case Ue:
                  return "[object Set]";
                case Be:
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
                return L(e) && de.call(e, "callee") && !_e.call(e, "callee");
              },
          $e = Array.isArray,
          We = De || q,
          Ye = oe
            ? i(oe)
            : function (e) {
                return L(e) && "[object Map]" == ze(e);
              },
          Je = ie
            ? i(ie)
            : function (e) {
                return L(e) && "[object Set]" == ze(e);
              },
          Qe = ae
            ? i(ae)
            : function (e) {
                return L(e) && U(e.length) && !!Y[_(e)];
              };
        (u.keys = j),
          (u.keysIn = V),
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
          (u.isLength = U),
          (u.isMap = Ye),
          (u.isNil = function (e) {
            return null == e;
          }),
          (u.isObject = B),
          (u.isObjectLike = L),
          (u.isSet = Je),
          (u.isTypedArray = Qe),
          (u.stubArray = H),
          (u.stubFalse = q),
          (u.VERSION = "4.17.5"),
          (Z._ = u);
      }.call(this),
      n.exports
    );
  }).call({});
  const Kw = globalThis._;
  delete globalThis._;
  var Xw = {
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
  var Zw = {
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
  function e_(e) {
    const t = chrome.i18n.getMessage(e);
    if ("" === t) throw new Error(`i18n: no message found for id '${e}'`);
    return t;
  }
  var t_ = {
      controller: {
        init: function () {
          globalThis.lo = e_;
        },
      },
    },
    n_ = t(
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
  const r_ = {
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
          t = await xy.controller.get("state");
        if (!t) return null;
        const n = this._deuglify(t),
          r = Date.now() - e;
        return log(`[$synch] state read in ${r}ms`), n;
      },
      save: async function (e) {
        const t = Date.now(),
          n = this._uglify(e);
        await xy.controller.set("state", n);
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
          const e = n_.decompressFromUTF16(t);
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
    { action: o_ } = Sg;
  var i_ = o_("synch.synch-state", (e, t) => {
    if (u.is.popup) {
      t.schedule.addCard.saved = e.schedule.addCard.saved;
      for (const n of t.schedule.posts) {
        const t = e.schedule.posts.find((e) => e.id === n.id);
        t && (n.saveStatus = t.saveStatus);
      }
    }
    return t;
  });
  const { model: a_ } = Sg,
    s_ = { ...by.getTemplateUserState(), ...by.getTemplateSharedState() };
  var l_ = {
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
              if (!a_.store) return;
              return this._onStateUpdatedByPeer(t.deltaState), !1;
            }
            return (
              "fetch-state" === t.name && (n ? n.push(o) : o(a_.state), !0)
            );
          }),
          Promise.resolve()
            .then(() => this._fetchState())
            .then(() => {
              const e = n;
              (n = null), e.forEach((e) => e(a_.state));
            })
            .then(() => {
              this._subscribeToInflux();
            })
        );
      },
      _fetchState: function () {
        return this.isStorageMaster
          ? r_
              .init()
              .then((e) => e || s_)
              .then((e) => {
                (this.currentState = e), a_.init(e);
              })
          : new Promise((e) => {
              chrome.runtime.sendMessage(
                { name: "fetch-state", sender: this.id },
                (t) => {
                  (this.currentState = t), a_.init(t), e();
                }
              );
            });
      },
      _subscribeToInflux: function (e = !1) {
        this.unsubscribe = a_.observe(
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
          (this.currentState = { ...a_.state, ...e }),
          i_.dispatch(this.currentState),
          this._saveToStorage(this.currentState),
          this._subscribeToInflux(this.currentState !== a_.state);
      },
      _saveToStorage: function (e) {
        this.isStorageMaster &&
          (this.storeBatchingId && clearTimeout(this.storeBatchingId),
          (this.storeBatchingId = setTimeout(
            () => {
              (this.storeBatchingId = null), r_.save(e);
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
    storageController: r_,
  };
  const { model: u_, transaction: c_ } = Sg,
    d_ = {
      init: function ({ parent: e }) {
        (this.parent = e),
          u_.observe(
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
        const { username: t, userId: n } = u_.state.authStatus;
        if (t) {
          const r = { username: t, userId: n };
          if (u.options.collectBillingStats) {
            const {
              followersCount: e,
              followingsCount: t,
              postsCount: o,
            } = u_.state.userDetails[n] || {};
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
              u_.state.billing.promocode !== n &&
                c_((e) => {
                  e.billing.promocode = n;
                }),
                this.parent.reply(e, n);
            })
            .catch((t) => {
              log(`  retrieving promocode failed: ${JSON.stringify(t)}`),
                this.parent.reply(e, u_.state.billing.promocode);
            });
        } else
          log("  no username to retrieve promocode for"),
            this.parent.reply(e, u_.state.billing.promocode);
        return !!e;
      },
    },
    { model: f_, transaction: p_ } = Sg,
    h_ = {
      init: function ({ parent: e }) {
        (this.parent = e),
          f_.observe(
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
        const t = f_.state.billing.trial,
          n = await this._getCookie({ name: "tsd" });
        if (this._isCookieEmpty(n)) return void this.parent.reply(e, t);
        const r = this._mergeTrialValues(t, n);
        r.installedOn || (r.installedOn = Date.now()),
          Kw.isEqual(t, r) ||
            p_((e) => {
              e.billing.trial = r;
            }),
          Kw.isEqual(n, r) || this._setCookie({ name: "tsd", value: r }),
          this.parent.reply(e, r);
      },
      updateCookie: async function (e) {
        const t = await this._getCookie({ name: "tsd" });
        this._isCookieEmpty(t) || (e = this._mergeTrialValues(t, e)),
          Kw.isEqual(t, e) || this._setCookie({ name: "tsd", value: e });
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
    { model: g_, transaction: m_ } = Sg,
    v_ = {
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
          g_.observe(
            (e) => (e.authStatus ? e.authStatus.username : null),
            () => {
              this.recordUsernames();
            },
            !0
          ),
          g_.observe(
            (e) =>
              e.billing && e.billing.account ? e.billing.account.token : null,
            () => {
              this.recordUsernames();
            },
            !1
          ),
          g_.observe(
            (e) =>
              e.billing && e.billing.account ? e.billing.account.token : null,
            () => {
              this.updateFSpringStatus();
            },
            !1
          );
      },
      recordUsernames: function () {
        const { billing: e, authStatus: t } = g_.state,
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
            m_((e) => {
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
        const { billing: t } = g_.state,
          n = t.account ? t.account.token : null;
        if (n) {
          const t = "/fspring/data";
          this.parent.apiSender
            .send(t, { token: n })
            .then((t) => {
              if (!t || "ok" !== t.status) throw t;
              m_((e) => {
                (e.billing.subscriptions = t.subscriptions || {}),
                  (e.billing.products = t.products || {}),
                  (e.billing.orders = t.orders || []);
              }),
                this.parent.reply(e, g_.state.billing);
            })
            .catch((n) => {
              ("TypeError" === n.name && "Failed to fetch" === n.message) ||
                ("forbidden" === n.status ||
                "unauthorized" === n.status ||
                "account-not-found" === n.status ||
                "account-is-not-active" === n.status
                  ? m_((e) => {
                      (e.billing.account.email = null),
                        (e.billing.account.token = null);
                    })
                  : ay.controller.sendError(
                      `Unexpected API error at ${t}`,
                      "error",
                      { error: n },
                      { actor: "auth" }
                    )),
                this.parent.reply(e, g_.state.billing);
            });
        } else
          m_((e) => {
            (e.billing.optimistic = null),
              (e.billing.subscriptions = {}),
              (e.billing.products = {}),
              (e.billing.orders = []);
          }),
            this.parent.reply(e, g_.state.billing);
        return !!e;
      },
      onFSpringSubscriptionSuccess: function (e, t) {
        log("billing: handling fspring subscription success..."),
          m_((e) => {
            (e.billing.optimistic = {
              on: Date.now(),
              plan: e.billing.purchasingPlan.id,
            }),
              (e.billing.purchasingPlan = null);
          });
        const n = JSON.stringify({
            subscriptions: g_.state.billing.subscriptions,
            products: g_.state.billing.products,
            orders: g_.state.billing.orders,
          }),
          r = Date.now();
        let o = 3e3;
        const i = () => {
          log("billing: polling server for status update..."),
            g_.state.billing.optimistic &&
              this.updateFSpringStatus((e) => {
                const t = Date.now();
                t - r > 36e5
                  ? m_((e) => {
                      e.billing.optimistic = null;
                    })
                  : ((e = JSON.stringify({
                      subscriptions: e.subscriptions,
                      products: e.products,
                      orders: e.orders,
                    })),
                    n === e
                      ? ((o = t - r > 3e4 ? 6e5 : 3e3), setTimeout(i, o))
                      : m_((e) => {
                          e.billing.optimistic = null;
                        }));
              });
        };
        return setTimeout(i, o), !!t;
      },
      onFSpringSubscriptionFailure: function (e, t) {
        return (
          log("billing: handling fspring subscription failure..."),
          m_((e) => {
            e.billing.purchasingPlan = null;
          }),
          !!t
        );
      },
    };
  var b_ = {
    controller: {
      init: function () {
        (this.apiSender = new dm.Sender({ urlPrefix: u.options.apiUrl })),
          d_.init({ parent: this }),
          h_.init({ parent: this }),
          v_.init({ parent: this });
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
        await Promise.all([d_.updatePro(), h_.updatePro(), v_.updatePro()]);
      },
      reply: function (e, t) {
        if (e)
          try {
            e(t);
          } catch (e) {}
      },
    },
    trialController: h_,
  };
  const { model: y_ } = Sg;
  var w_ = {
    init: function () {
      Hg.on("overseer.send-report", x_);
    },
    sendReport: x_,
  };
  const __ = [
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
      { field: "authStatus", cb: (e) => Kw.cloneDeep(e) },
      { field: "authStatus.cookies", cb: () => "!sanitized" },
      { field: "billing", cb: (e) => Kw.cloneDeep(e) },
      { field: "billing.account.token", cb: () => "!sanitized" },
      {
        field: "schedule",
        cb: (e) => {
          const t = Kw.cloneDeep(e);
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
    S_ = new dm.Sender({ urlPrefix: u.options.apiUrl });
  async function x_({ key: e, filters: t, data: n } = {}) {
    if (
      ((e = e || "system"),
      (n = n || {}),
      (t = t || {}).username || (t.username = by.proxy.username() || "unknown"),
      "string" != typeof n && !n.state)
    ) {
      const e = y_.state,
        t = {};
      __.forEach((n) => {
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
      (n.schedule = await Uw.controller.getReport());
    try {
      n = JSON.stringify(n);
    } catch (e) {
      n = e.message;
    }
    const r = { key: e, filters: t, data: n };
    u.is.development &&
      Hg.send("popup.log", "%coverseer report [background]", "color: #c818dc", {
        key: e,
        filters: t,
        data: JSON.parse(n),
      }),
      S_.send("/overseer", { body: r })
        .then((t) => {
          log(`overseer ${e} report of ${n.length} bytes was sent`);
        })
        .catch((t) => {
          error(`! failed sending ${e} overseer report of ${n.length} bytes:`),
            error(t);
        });
  }
  var P_ = { controller: w_ },
    k_ = {
      getCredibility: function (e, t = null, { forcePrivate: n = !1 } = {}) {
        const r = e.userId === t;
        if (e.isPrivate && !r && !n) return null;
        if (e.isVerified) return 1;
        if ("inssistapp" === e.username) return 1;
        let o = 0,
          i = 0;
        Object.values(D_).forEach((t) => {
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
          s = 1 - E_(o / i + a);
        return Math.round(100 * s) / 100;
      },
    };
  const D_ = {
    "followings-to-followers-ratio": {
      weight: 150,
      getValue: function (e) {
        return E_(Math.log2(e.followingsCount / e.followersCount / 4) / 1.5);
      },
    },
    "short-bio": {
      weight: 30,
      getValue: function (e) {
        if (!e.bio) return 1;
        return E_((20 - e.bio.length) / 20);
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
        return E_((24 - e.postsCount) / 24);
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
        return E_((s / t - 0.6) / 0.4);
      },
    },
  };
  function E_(e) {
    return Math.min(Math.max(0, e), 1);
  }
  var T_ = k_;
  const I_ = [
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
    { model: C_ } = Sg;
  function A_(e) {
    const t = C_.state.authStatus.userId;
    return (function (e) {
      const t = I_.find((t) => t.condition(e));
      return { value: t.value, label: t.label, color: t.color };
    })(T_.getCredibility(e, t));
  }
  var F_ = {
    controller: {
      init: async function () {
        Hg.on("insights.get-credibility-grade", A_);
      },
    },
  };
  const { model: O_, transaction: M_ } = Sg,
    R_ = (e) =>
      "string" != typeof e && "boolean" != typeof e && "number" != typeof e
        ? JSON.stringify(e)
        : e,
    N_ = function (e) {
      console.log(`%c[test] ${R_(e)}`, "color: #3d9d30");
    },
    U_ = function (e) {
      console.log(`%c[test] ${R_(e)}`, "color: #e94b35");
    },
    B_ = function (e) {
      console.log(R_(e));
    },
    L_ = {
      init: function () {
        (globalThis.$env = u),
          (globalThis.ig = Og),
          (globalThis.utils = S),
          (globalThis.$igApi = Ng),
          (globalThis.$fbApi = Pw),
          (globalThis.$eventBus = mw),
          (globalThis.$chromeBus = Hg),
          (globalThis.$iframeBus = hw),
          (globalThis.$abTesting = nw),
          (globalThis.$ga = rw),
          (globalThis.$fetcher = Ag),
          (globalThis.$coreBilling = b_),
          (globalThis.$idb = xy),
          (globalThis.$sentry = ay),
          (globalThis.$overseer = P_),
          (globalThis.$insights = F_),
          (globalThis.setState = this.setState),
          (globalThis.downgradeVersion = this.downgradeVersion),
          (globalThis.testGetSkuDetails = this.testGetSkuDetails),
          (globalThis.testGetPurchases = this.testGetPurchases),
          (globalThis.testAll = this.testAll),
          (globalThis.errorsDelta = this.errorsDelta),
          (globalThis.activityDelta = this.activityDelta),
          (globalThis.countMadeActions = this.countMadeActions),
          (u.is.development || u.is.beta) &&
            ((globalThis.model = O_),
            (globalThis.transaction = M_),
            (globalThis.$utils = N),
            (globalThis.$synch = l_),
            (globalThis.$state = by),
            (globalThis.$later = qg),
            (globalThis.$influx = Sg),
            (globalThis.$chromeStarter = ow),
            (globalThis.unbanAllTasks = this.unbanAllTasks),
            this.defineCommit());
      },
      countMadeActions: function (e = 86400) {
        const t = globalThis.__debug.state,
          n = S.getUnixTime(),
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
        const t = Kw.cloneDeep(e);
        by.replaceState.dispatch(t);
      },
      downgradeVersion: function () {
        const e = Kw.cloneDeep(O_.state);
        (e.version = e.version - 1), by.replaceState.dispatch(e);
      },
      unbanAllTasks: function () {
        const e = Kw.cloneDeep(O_.state);
        (e.stats.activity = e.stats.activity.filter((e) => "ban" !== e.type)),
          by.replaceState.dispatch(e);
      },
      testGetSkuDetails: function () {
        return (
          N_("billing.getSkuDetails..."),
          new Promise((e) => {
            google.payments.inapp.getSkuDetails({
              parameters: { env: "prod" },
              success: (t) => {
                N_("  success:"), B_(t), e();
              },
              failure: (t) => {
                u.is.development &&
                t &&
                t.response &&
                "INVALID_RESPONSE_ERROR" === t.response.errorType
                  ? N_("  success:")
                  : U_("  failure:"),
                  B_(t),
                  e();
              },
            });
          })
        );
      },
      testGetPurchases: function () {
        return (
          N_("billing.getPurchases..."),
          new Promise((e) => {
            google.payments.inapp.getPurchases({
              parameters: { env: "prod" },
              success: (t) => {
                N_("  success:"), B_(t), e();
              },
              failure: (t) => {
                U_("  failure:"), B_(t), e();
              },
            });
          })
        );
      },
      testAll: function () {
        new Promise((e) => {
          setTimeout(e, 0);
        })
          .then(L_.testGetSkuDetails)
          .then(L_.testGetPurchases);
      },
      defineCommit: function () {
        Object.defineProperty(globalThis, "commit", {
          get: () => (this.setState(O_.state), null),
        });
      },
    };
  var j_ = { controller: L_ },
    V_ = {
      init: async function () {
        await (async function () {
          for (const e of H_) {
            const t = (
              await N.callAsync(chrome.cookies.getAll, { url: e })
            ).filter((e) => "unspecified" === e.sameSite);
            await Promise.all(
              t.map(async (t) => {
                e.startsWith("http://")
                  ? await N.callAsync(chrome.cookies.remove, {
                      url: e,
                      name: t.name,
                    })
                  : await N.callAsync(chrome.cookies.set, {
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
          chrome.webRequest.onHeadersReceived.addListener(q_, { urls: H_ }, [
            "blocking",
            "responseHeaders",
            "extraHeaders",
          ]);
      },
    };
  const H_ = [
    "http://*.instagram.com/*",
    "https://*.instagram.com/*",
    "https://*.facebook.com/*",
    "http://*.doubleclick.net/*",
  ];
  function q_(e) {
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
  var z_ = { controller: V_ };
  function G_(e) {
    return e && e.__esModule ? e : { default: e };
  }
  var $_ = {},
    W_ = {
      update: function (e) {
        if (!e.userStates) return e;
        const t = { ...e, tagAssist: { ...e.tagAssist, relevantTags: [] } };
        return delete t.tagAssist.foundTags, t;
      },
    };
  r($_, "default", function () {
    return W_;
  }),
    n($_);
  var Y_ = {},
    J_ = {
      update: function (e) {
        return e.userStates && xy.controller.delete("tag-assist.tag-data"), e;
      },
    };
  r(Y_, "default", function () {
    return J_;
  }),
    n(Y_);
  var Q_ = {},
    K_ = {
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
  r(Q_, "default", function () {
    return K_;
  }),
    n(Q_);
  var X_ = {},
    Z_ = {
      update: function (e) {
        return e.userStates
          ? { ...e, tagAssist: { ...e.tagAssist, ladder: null } }
          : e;
      },
    };
  r(X_, "default", function () {
    return Z_;
  }),
    n(X_);
  var eS = {},
    tS = {
      update: function (e) {
        return e.userStates && xy.controller.delete("tag-assist.tag-data"), e;
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
          ? { ...e, tagAssist: { ...e.tagAssist, selectedTabId: "search" } }
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
  r(oS, "default", function () {
    return iS;
  }),
    n(oS);
  var aS = {},
    sS = {
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
  r(aS, "default", function () {
    return sS;
  }),
    n(aS);
  var lS = {},
    uS = {
      update: function (e) {
        return e.userStates
          ? { ...e, tagAssist: { ...e.tagAssist, engagementSort: null } }
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
  r(cS, "default", function () {
    return dS;
  }),
    n(cS);
  var fS = {},
    pS = {
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
  r(fS, "default", function () {
    return pS;
  }),
    n(fS);
  var hS = {},
    gS = {
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
  r(hS, "default", function () {
    return gS;
  }),
    n(hS);
  var mS = {},
    vS = {
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
  r(mS, "default", function () {
    return vS;
  }),
    n(mS);
  var bS = {},
    yS = {
      update: function (e) {
        return { ...e, reels: { supported: !1 } };
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
              billing: {
                ...e.billing,
                trial: { ...e.billing.trial, reels: 0 },
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
        return { ...e, reels: { ...e.reels, creating: !1 } };
      },
    };
  r(SS, "default", function () {
    return xS;
  }),
    n(SS);
  var PS = {},
    kS = {
      update: function (e) {
        return { ...e, authStatus: { ...e.authStatus, isMobileSession: !1 } };
      },
    };
  r(PS, "default", function () {
    return kS;
  }),
    n(PS);
  var DS = {},
    ES = {
      update: function (e) {
        return e.userStates
          ? { ...e, billing: { ...e.billing, recentFeature: null } }
          : e;
      },
    };
  r(DS, "default", function () {
    return ES;
  }),
    n(DS);
  var TS = {},
    IS = {
      update: function (e) {
        const t = { ...e, schedule: { ...e.schedule, loading: !1 } };
        return delete t.schedule.isRefreshingGrid, t;
      },
    };
  r(TS, "default", function () {
    return IS;
  }),
    n(TS);
  var CS = {},
    AS = {
      update: function (e) {
        const t = {
          ...e,
          schedule: { ...e.schedule, navigation: { ...e.schedule.navigation } },
        };
        return delete t.schedule.navigation.fcsTitle, t;
      },
    };
  r(CS, "default", function () {
    return AS;
  }),
    n(CS);
  var FS = {},
    OS = {
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
  r(FS, "default", function () {
    return OS;
  }),
    n(FS);
  var MS = {},
    RS = {
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
  r(MS, "default", function () {
    return RS;
  }),
    n(MS);
  var NS = {},
    US = {
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
  r(NS, "default", function () {
    return US;
  }),
    n(NS);
  var BS = {},
    LS = {
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
  r(BS, "default", function () {
    return LS;
  }),
    n(BS);
  var jS = {},
    VS = {
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
  r(jS, "default", function () {
    return VS;
  }),
    n(jS);
  var HS = {},
    qS = {
      update: function (e) {
        return { ...e, schedule: { ...e.schedule, showTagAssist: !1 } };
      },
    };
  r(HS, "default", function () {
    return qS;
  }),
    n(HS);
  var zS = {},
    GS = {
      update: function (e) {
        const t = { ...e, reels: { ...e.reels } };
        return delete t.reels.supported, t;
      },
    };
  r(zS, "default", function () {
    return GS;
  }),
    n(zS);
  var $S = {},
    WS = {
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
  r($S, "default", function () {
    return WS;
  }),
    n($S);
  var YS = {},
    JS = {
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
  r(YS, "default", function () {
    return JS;
  }),
    n(YS);
  var QS = {},
    KS = {
      update: function (e) {
        return e.userStats
          ? { ...e, tagAssist: { ...e.tagAssist, lastTagScanOn: null } }
          : e;
      },
    };
  r(QS, "default", function () {
    return KS;
  }),
    n(QS);
  var XS = {},
    ZS = {
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
  r(XS, "default", function () {
    return ZS;
  }),
    n(XS);
  var ex = {},
    tx = {
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
  r(ex, "default", function () {
    return tx;
  }),
    n(ex);
  var nx = {},
    rx = {
      update: function (e) {
        const t = { ...e, schedule: { ...e.schedule, addCardAttention: !1 } };
        return delete t.schedule.gridAddCardAttention, t;
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
  r(ox, "default", function () {
    return ix;
  }),
    n(ox);
  var ax = {},
    sx = {
      update: function (e) {
        return { ...e, bulk: { saving: !1, selectedPostIds: [], actions: {} } };
      },
    };
  r(ax, "default", function () {
    return sx;
  }),
    n(ax);
  var lx = {},
    ux = {
      update: function (e) {
        return { ...e, bulk: { ...e.bulk, activeActionId: null } };
      },
    };
  r(lx, "default", function () {
    return ux;
  }),
    n(lx);
  var cx = {},
    dx = {
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
  r(cx, "default", function () {
    return dx;
  }),
    n(cx);
  var fx = {},
    px = {
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
  r(hx, "default", function () {
    return gx;
  }),
    n(hx);
  var mx = {},
    vx = {
      update: function (e) {
        return { ...e, schedule: { ...e.schedule, isDraggingPost: !1 } };
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
  r(bx, "default", function () {
    return yx;
  }),
    n(bx);
  var wx = {},
    _x = {
      update: function (e) {
        const t = { ...e, schedule: { ...e.schedule } };
        return (
          delete t.schedule.hasUncommitedChanges, delete t.schedule.tasks, t
        );
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
            addCard: { ...e.schedule.addCard, savingPreview: null },
          },
        };
      },
    };
  r(Sx, "default", function () {
    return xx;
  }),
    n(Sx);
  var Px = {},
    kx = {
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
  r(Px, "default", function () {
    return kx;
  }),
    n(Px);
  var Dx = {},
    Ex = {
      update: function (e) {
        const t = { ...e, dm: { ...e.dm } };
        return delete t.dm.supported, t;
      },
    };
  r(Dx, "default", function () {
    return Ex;
  }),
    n(Dx);
  var Tx = {},
    Ix = {
      update: function (e) {
        return { ...e, dm: { ...e.dm, ghostModeEnabled: !0 } };
      },
    };
  r(Tx, "default", function () {
    return Ix;
  }),
    n(Tx);
  var Cx = {},
    Ax = {
      update: function (e) {
        const t = { ...e };
        return (
          delete t.analytics,
          delete t.insights,
          (async function () {
            const e = await xy.controller.getAllKeys();
            for (const t of e)
              (t.startsWith("insights.") || t.startsWith("block:analytics:")) &&
                xy.controller.delete(t);
          })(),
          t
        );
      },
    };
  r(Cx, "default", function () {
    return Ax;
  }),
    n(Cx);
  var Fx = {},
    Ox = {
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
  r(Fx, "default", function () {
    return Ox;
  }),
    n(Fx);
  var Mx = {},
    Rx = {
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
  r(Mx, "default", function () {
    return Rx;
  }),
    n(Mx);
  var Nx = {},
    Ux = {
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
  r(Nx, "default", function () {
    return Ux;
  }),
    n(Nx);
  var Bx = {},
    Lx = {
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
  r(Bx, "default", function () {
    return Lx;
  }),
    n(Bx);
  var jx = {},
    Vx = {
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
  r(jx, "default", function () {
    return Vx;
  }),
    n(jx);
  var Hx = {},
    qx = {
      update: function (e) {
        if (!e.userStates) return e;
        return { ...e, quickReplies: { shown: !1, content: my(), total: 7 } };
      },
    };
  r(Hx, "default", function () {
    return qx;
  }),
    n(Hx);
  var zx = {},
    Gx = {
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
  r(zx, "default", function () {
    return Gx;
  }),
    n(zx);
  var $x = {},
    Wx = {
      update: function (e) {
        const t = { ...e };
        return delete t.igtvUpload, t;
      },
    };
  r($x, "default", function () {
    return Wx;
  }),
    n($x);
  var Yx = {},
    Jx = {
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
  r(Yx, "default", function () {
    return Jx;
  }),
    n(Yx);
  var Qx = {},
    Kx = {
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
  r(Qx, "default", function () {
    return Kx;
  }),
    n(Qx);
  var Xx = {},
    Zx = {
      update: function (e) {
        return {
          ...e,
          musicAssist: { ...e.musicAssist, showUpsellOverlay: !1 },
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
  r(eP, "default", function () {
    return tP;
  }),
    n(eP);
  var nP = {},
    rP = {
      update: function (e) {
        return { ...e, musicAssist: { ...e.musicAssist, isStory: !1 } };
      },
    };
  r(nP, "default", function () {
    return rP;
  }),
    n(nP);
  var oP = {},
    iP = {
      update: function (e) {
        if (!e.userStates) return e;
        const t = {
          ...e.billing.trial,
          reels: 0,
          coverAssist: 0,
          musicAssist: 0,
        };
        return (
          b_.trialController.setTrialCookie(t),
          { ...e, billing: { ...e.billing, trial: t } }
        );
      },
    };
  r(oP, "default", function () {
    return iP;
  }),
    n(oP);
  var aP = {},
    sP = {
      update: function (e) {
        return {
          ...e,
          musicAssist: { ...e.musicAssist, videoVolume: 0, musicVolume: 0.5 },
        };
      },
    };
  r(aP, "default", function () {
    return sP;
  }),
    n(aP);
  var lP = {},
    uP = {
      update: function (e) {
        return { ...e, musicAssist: { ...e.musicAssist, videoCurrentTime: 0 } };
      },
    };
  r(lP, "default", function () {
    return uP;
  }),
    n(lP);
  var cP = {},
    dP = {
      update: function (e) {
        if (!e.userStates) return e;
        const t = {
          ...e.billing.trial,
          reels: Math.max(0, e.billing.trial.reels - 3),
          musicAssist: Math.max(0, e.billing.trial.musicAssist - 3),
        };
        return (
          b_.trialController.setTrialCookie(t),
          { ...e, billing: { ...e.billing, trial: t } }
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
        if (!e.userStates) return e;
        const t = { ...e.billing.trial, schedule: 0 };
        return (
          b_.trialController.setTrialCookie(t),
          { ...e, billing: { ...e.billing, trial: t } }
        );
      },
    };
  r(fP, "default", function () {
    return pP;
  }),
    n(fP);
  var hP = {},
    gP = {
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
  r(hP, "default", function () {
    return gP;
  }),
    n(hP);
  var mP = {},
    vP = {
      update: function (e) {
        return {
          ...e,
          storyAssist: { ...e.storyAssist, showUpsellOverlay: !1 },
        };
      },
    };
  r(mP, "default", function () {
    return vP;
  }),
    n(mP);
  var bP = {},
    yP = {
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
  r(bP, "default", function () {
    return yP;
  }),
    n(bP);
  var wP = {},
    _P = {
      update: function (e) {
        return {
          ...e,
          storyAssist: { ...e.storyAssist, selectedTabId: "music" },
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
        return { ...e, storyAssist: { ...e.storyAssist, coverUrl: null } };
      },
    };
  r(SP, "default", function () {
    return xP;
  }),
    n(SP);
  var PP = {},
    kP = {
      update: function (e) {
        return { ...e, ghostStoryView: { enabled: !1 } };
      },
    };
  r(PP, "default", function () {
    return kP;
  }),
    n(PP);
  var DP = {},
    EP = {
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
  r(DP, "default", function () {
    return EP;
  }),
    n(DP);
  var TP = {},
    IP = {
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
  r(TP, "default", function () {
    return IP;
  }),
    n(TP);
  var CP = {},
    AP = {
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
  r(CP, "default", function () {
    return AP;
  }),
    n(CP);
  var FP = {},
    OP = {
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
            n = n_.decompressFromUTF16(t),
            r = btoa(encodeURIComponent(n));
          await xy.controller.set("state", r),
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
  r(FP, "default", function () {
    return OP;
  }),
    n(FP);
  var MP = {},
    RP = {
      update: function (e) {
        const t = { ...e, authStatus: { ...e.authStatus } };
        return delete t.authStatus.isMobileSession, t;
      },
    };
  r(MP, "default", function () {
    return RP;
  }),
    n(MP);
  var NP = {},
    UP = {
      update: function (e) {
        if (!e.userStates) return e;
        const t = { ...e };
        return delete t.desktopPlatform, t;
      },
    };
  r(NP, "default", function () {
    return UP;
  }),
    n(NP);
  var BP = {},
    LP = {
      update: function (e) {
        return e.userStates
          ? { ...e, abTesting: { hash: Math.random(), wideScreenState: null } }
          : e;
      },
    };
  r(BP, "default", function () {
    return LP;
  }),
    n(BP);
  var jP = {},
    VP = {
      update: function (e) {
        return e.userStates
          ? { ...e, abTesting: { ...e.abTesting, wideScreenState: null } }
          : e;
      },
    };
  r(jP, "default", function () {
    return VP;
  }),
    n(jP);
  var HP = {},
    qP = {
      update: function (e) {
        return { ...e, later: { showAssistPanel: !1 } };
      },
    };
  r(HP, "default", function () {
    return qP;
  }),
    n(HP);
  var zP = {},
    GP = {
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
  r(zP, "default", function () {
    return GP;
  }),
    n(zP);
  var $P = {},
    WP = {
      update: function (e) {
        return { ...e, later: { ...e.later, posts: [] } };
      },
    };
  r($P, "default", function () {
    return WP;
  }),
    n($P);
  var YP = {},
    JP = {
      update: function (e) {
        return { ...e, storyAssist: { ...e.storyAssist, isVideo: !1 } };
      },
    };
  r(YP, "default", function () {
    return JP;
  }),
    n(YP);
  var QP = {},
    KP = {
      update: function (e) {
        return { ...e, later: { ...e.later, editPostId: null } };
      },
    };
  r(QP, "default", function () {
    return KP;
  }),
    n(QP);
  var XP = {},
    ZP = {
      update: function (e) {
        return { ...e, later: { ...e.later, cookies: null } };
      },
    };
  r(XP, "default", function () {
    return ZP;
  }),
    n(XP);
  var ek = {},
    tk = {
      update: function (e) {
        return { ...e, later: { ...e.later, date: null } };
      },
    };
  r(ek, "default", function () {
    return tk;
  }),
    n(ek);
  var nk = {},
    rk = {
      update: function (e) {
        return { ...e, later: { ...e.later, userId: null } };
      },
    };
  r(nk, "default", function () {
    return rk;
  }),
    n(nk);
  var ok = {},
    ik = {
      update: function (e) {
        return { ...e, later: { ...e.later, selectedPill: null } };
      },
    };
  r(ok, "default", function () {
    return ik;
  }),
    n(ok);
  var ak = {},
    sk = {
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
  r(ak, "default", function () {
    return sk;
  }),
    n(ak);
  var lk = {},
    uk = {
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
  r(lk, "default", function () {
    return uk;
  }),
    n(lk);
  var ck = {},
    dk = {
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
  r(ck, "default", function () {
    return dk;
  }),
    n(ck);
  var fk = {},
    pk = {
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
  r(fk, "default", function () {
    return pk;
  }),
    n(fk);
  var hk = {},
    gk = {
      update: function (e) {
        return {
          ...e,
          later: { ...e.later, timeSlots: [...e.schedule.timeSlots] },
        };
      },
    };
  r(hk, "default", function () {
    return gk;
  }),
    n(hk);
  var mk = {},
    vk = {
      update: function (e) {
        return e.userStates
          ? { ...e, settings: { laterAutoRetry: 12 * N.time.HOUR } }
          : e;
      },
    };
  r(mk, "default", function () {
    return vk;
  }),
    n(mk);
  var bk = {},
    yk = {
      update: function (e) {
        return { ...e, later: { ...e.later, errors: [] } };
      },
    };
  r(bk, "default", function () {
    return yk;
  }),
    n(bk);
  var wk = {},
    _k = {
      update: async function (e) {
        const t = {
          ...e,
          later: { ...e.later, posts: e.later.posts.map((e) => ({ ...e })) },
        };
        for (const e of t.later.posts) {
          if (!e.isVideo) continue;
          let t, n;
          try {
            t = await xy.controller.get(`later.post-${e.id}`);
          } catch (e) {
            console.error(e);
            continue;
          }
          try {
            n = await N.loadVideoMetadata(t.blob);
          } catch (e) {
            console.error(e);
            continue;
          }
          e.duration = n.duration;
        }
        return t;
      },
    };
  r(wk, "default", function () {
    return _k;
  }),
    n(wk);
  var Sk = {},
    xk = {
      update: function (e) {
        return { ...e, later: { ...e.later, lastDate: null } };
      },
    };
  r(Sk, "default", function () {
    return xk;
  }),
    n(Sk);
  var Pk = {},
    kk = {
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
  r(Pk, "default", function () {
    return kk;
  }),
    n(Pk);
  var Dk = {},
    Ek = {
      update: function (e) {
        return { ...e, later: { ...e.later, processing: !1 } };
      },
    };
  r(Dk, "default", function () {
    return Ek;
  }),
    n(Dk);
  const Tk = {
      "version-130": G_($_).default,
      "version-131": G_(Y_).default,
      "version-132": G_(Q_).default,
      "version-133": G_(X_).default,
      "version-134": G_(eS).default,
      "version-135": G_(nS).default,
      "version-136": G_(oS).default,
      "version-137": G_(aS).default,
      "version-138": G_(lS).default,
      "version-139": G_(cS).default,
      "version-140": G_(fS).default,
      "version-141": G_(hS).default,
      "version-142": G_(mS).default,
      "version-143": G_(bS).default,
      "version-144": G_(wS).default,
      "version-145": G_(SS).default,
      "version-146": G_(PS).default,
      "version-147": G_(DS).default,
      "version-148": G_(TS).default,
      "version-149": G_(CS).default,
      "version-150": G_(FS).default,
      "version-151": G_(MS).default,
      "version-152": G_(NS).default,
      "version-153": G_(BS).default,
      "version-154": G_(jS).default,
      "version-155": G_(HS).default,
      "version-156": G_(zS).default,
      "version-157": G_($S).default,
      "version-158": G_(YS).default,
      "version-159": G_(QS).default,
      "version-160": G_(XS).default,
      "version-161": G_(ex).default,
      "version-162": G_(nx).default,
      "version-163": G_(ox).default,
      "version-164": G_(ax).default,
      "version-165": G_(lx).default,
      "version-166": G_(cx).default,
      "version-167": G_(fx).default,
      "version-168": G_(hx).default,
      "version-169": G_(mx).default,
      "version-170": G_(bx).default,
      "version-171": G_(wx).default,
      "version-172": G_(Sx).default,
      "version-173": G_(Px).default,
      "version-174": G_(Dx).default,
      "version-175": G_(Tx).default,
      "version-176": G_(Cx).default,
      "version-177": G_(Fx).default,
      "version-178": G_(Mx).default,
      "version-179": G_(Nx).default,
      "version-180": G_(Bx).default,
      "version-181": G_(jx).default,
      "version-182": G_(Hx).default,
      "version-183": G_(zx).default,
      "version-184": G_($x).default,
      "version-185": G_(Yx).default,
      "version-186": G_(Qx).default,
      "version-187": G_(Xx).default,
      "version-188": G_(eP).default,
      "version-189": G_(nP).default,
      "version-190": G_(oP).default,
      "version-191": G_(aP).default,
      "version-192": G_(lP).default,
      "version-193": G_(cP).default,
      "version-194": G_(fP).default,
      "version-195": G_(hP).default,
      "version-196": G_(mP).default,
      "version-197": G_(bP).default,
      "version-198": G_(wP).default,
      "version-199": G_(SP).default,
      "version-200": G_(PP).default,
      "version-201": G_(DP).default,
      "version-202": G_(TP).default,
      "version-203": G_(CP).default,
      "version-204": G_(FP).default,
      "version-205": G_(MP).default,
      "version-206": G_(NP).default,
      "version-207": G_(BP).default,
      "version-208": G_(jP).default,
      "version-209": G_(HP).default,
      "version-210": G_(zP).default,
      "version-211": G_($P).default,
      "version-212": G_(YP).default,
      "version-213": G_(QP).default,
      "version-214": G_(XP).default,
      "version-215": G_(ek).default,
      "version-216": G_(nk).default,
      "version-217": G_(ok).default,
      "version-218": G_(ak).default,
      "version-219": G_(lk).default,
      "version-220": G_(ck).default,
      "version-221": G_(fk).default,
      "version-222": G_(hk).default,
      "version-223": G_(mk).default,
      "version-224": G_(bk).default,
      "version-225": G_(wk).default,
      "version-226": G_(Sk).default,
      "version-227": G_(Pk).default,
      "version-228": G_(Dk).default,
    },
    Ik = {
      versioners: {},
      init: function () {
        const e = /version-(\d+)/i;
        Object.keys(Tk)
          .map((t) => {
            const n = parseInt(t.match(e)[1]);
            return { key: t, version: n };
          })
          .sort((e, t) => e.version - t.version)
          .forEach((e) => {
            this.versioners[e.version] = Tk[e.key];
          });
      },
      update: async function (e) {
        let t = e,
          n = t.version || 0;
        log(`versioner: model version is ${n}`);
        for (; n < 228; ) {
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
  Ik.init();
  const Ck = function (e) {
      const t = Array.isArray(e.whatsNew) ? e.whatsNew : [];
      let n = !1;
      const r = [
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
    { action: Ak } = Sg;
  var Fk = Ak("state.setup-default-state", (e) =>
    e.whatsNew
      ? e
      : {
          version: 228,
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
          ghostStoryView: {
            enabled: !1,
            lastUsedOn: null,
            showUpsellOverlay: !1,
          },
          dm: { badgeText: "", ghostModeEnabled: !0, ghostModeFailed: !1 },
          reels: { creating: !1 },
          igTask: { actionBlockCode: null, followStatus: {}, likeStatus: {} },
          later: {
            cookies: null,
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
            posts: [],
          },
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
          ...vy(),
        }
  );
  const { model: Ok } = Sg;
  var Mk = {
    controller: {
      init: async function () {
        Fk.dispatch(), await this._update();
      },
      _update: async function () {
        let e = Ok.state;
        (e = await Ik.update(e)), (e = Ck(e)), e !== Ok.state && dy.dispatch(e);
      },
    },
  };
  var Rk = {
    controller: {
      init: function () {
        chrome.runtime.setUninstallURL("https://github.com/YezerSTN/INSSIST/releases/");
      },
    },
  };
  class Nk {
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
          t <= this.cleanupIndex || (await k(e)), n();
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
          t <= this.cleanupIndex || (await k(e));
        })),
        this
      );
    }
    cleanup() {
      this.cleanupIndex = this.totalTasks - 1;
    }
  }
  const Uk = new Nk(Mg),
    { model: Bk } = Sg;
  var Lk = {
    controller: {
      init: async function () {
        log("ig-task: initialisation succeeded"),
          Bk.observe(
            () => by.proxy.userId(),
            () => Uk.cleanup(),
            !1
          );
      },
    },
    peersQueue: new Nk(Rg),
    actionsQueue: Uk,
  };
  var jk = {
    controller: {
      init: function () {
        N.watchForIgCookie("open-in-inssist", async (e) => {
          const t = e.value;
          t.startsWith("/direct/") && "/direct/" !== t
            ? Sg.transaction((e) => {
                (e.sidebar.isOpen = !0), (e.sidebar.selectedTabId = "tab-dm");
              })
            : Sg.transaction((e) => {
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
  let Vk;
  var Hk = {
    controller: {
      getVersion: function () {
        if (void 0 === Vk) {
          const e = /Chrome\/([0-9.]+)/.exec(globalThis.navigator.userAgent)[1];
          Vk = e ? Number(e.split(".")[0]) : -1;
        }
        return Vk;
      },
    },
  };
  var qk = function () {
    const e = Sg.model.state,
      t = e.authStatus.userId;
    return e.tagAssist.accountStats[t] || {};
  };
  const { model: zk, transaction: Gk } = Sg;
  var $k = {
    init: function () {
      zk.observe(
        (e) => e.authStatus.userId,
        () => {
          Wk();
        }
      ),
        N.createAlarm(
          "tag-assist.update-account-stats",
          { period: 4 * N.time.HOUR },
          () => {
            Wk();
          }
        );
    },
  };
  async function Wk(e = 0) {
    const t = zk.state,
      n = t.authStatus.userId;
    if (!n) return;
    const r = Date.now(),
      o = qk(),
      i = o && r - o.lastScanOn;
    if (i && i < u.options.tagAssist.accountStatsTtl) return;
    const a = t.authStatus.username,
      s = await Ng.api.fetchUserPosts(a, 42);
    if (s.error)
      return e < 2
        ? void Wk(e + 1)
        : void console.error("failed to update account stats", s);
    const l = s.result;
    let c = 0,
      d = 0;
    for (const e of l)
      (c += Ng.api.normalizePostStat24h(e.stats.likes, e.on)),
        (d += Ng.api.normalizePostStat24h(e.stats.comments, e.on));
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
            const n = R({ hashOptional: !t });
            return (e.match(n) || [])
              .map((e) => (e.startsWith("#") ? e.substr(1) : e))
              .map((e) => e.toLowerCase())
              .filter(D);
          })(e, !0)
        )
    );
    Gk((e) => {
      e.tagAssist.accountStats[n] = {
        avgLikes: c,
        avgComments: d,
        mostUsedTags: f.slice(0, 3),
        lastScanOn: Date.now(),
      };
    });
  }
  var Yk = {
    controller: {
      init: function () {
        $k.init();
      },
    },
  };
  const { model: Jk, transaction: Qk } = Sg;
  function Kk() {
    return {
      hasPro: true,
      freeReels: Math.max(0, 2 - Jk.state.billing.trial.reels),
      maxFreeReels: 2,
    };
  }
  async function Xk(e) {
    const t = await N.callAsync(chrome.windows.getLastFocused),
      n = await N.callAsync(chrome.tabs.getSelected, t.id);
    chrome.tabs.create({ url: "https://app.inssist.com", active: !0 }),
      Qk((e) => {
        (e.sidebar.isOpen = !0),
          (e.sidebar.selectedTabId = "tab-billing"),
          (e.billing.recentFeature = "desktop-reels");
      }),
      e.value.includes("keep-ig-tab") ||
        (await N.callAsync(chrome.tabs.remove, n.id));
  }
  async function Zk() {
    rw.controller.sendEvent("user", "reels:submit", "desktop"),
      true
        ? rw.controller.sendEvent("user", "pro-paid-usage:reels", "desktop")
        : Qk((e) => {
            e.billing.trial.reels += 1;
          });
  }
  function eD() {
    chrome.cookies.set({
      name: "desktop-reels.initial-data",
      value: JSON.stringify(Kk()),
      url: "https://www.instagram.com",
      path: "/",
      httpOnly: !1,
      secure: !1,
      storeId: "0",
      domain: "instagram.com",
      sameSite: "strict",
      expirationDate: Date.now() + 30 * N.time.SECOND,
    });
  }
  var tD = {
    controller: {
      init: function () {
        Hg.on("desktop-reels.get-initial-data", Kk),
          N.watchForIgCookie("desktop-reels.open-billing", Xk),
          N.watchForIgCookie("desktop-reels.submit-success", Zk),
          N.watchForIgCookie("desktop-reels.get-initial-data", eD);
      },
    },
  };
  !(async function () {
    let e = !1;
    Hg.on("bg.is-ready", () => e), (globalThis._ = Kw), Xw.controller.init();
    const t = Hk.controller.getVersion();
    console.log(`chrome version is: ${t}`),
      Zw.init(),
      await z_.controller.init(),
      ay.controller.init({
        dsn: "https://bea0900834f541bca8157710f7fd31fe@sentry.io/1547551",
      }),
      t_.controller.init(),
      await Qw.controller.init(),
      Uy.controller.init(),
      Vy.controller.init(),
      Rk.controller.init(),
      await l_.controller.init("background", !0),
      await Mk.controller.init(),
      yy.controller.init(),
      P_.controller.init(),
      j_.controller.init(),
      Lk.controller.init(),
      F_.controller.init(),
      jk.controller.init(),
      jw.controller.init(),
      Ay.controller.init(),
      Yk.controller.init(),
      tD.controller.init(),
      nw.controller.init(),
      qg.controller.init(),
      rw.controller.init().sendPageview().sendInstall(),
      Hy.controller.init(),
      await Hy.controller.updateUser(),
      b_.controller.init(),
      await b_.controller.updatePro(),
      Wy.controller.init(),
      ow.controller.init(),
      (e = !0);
  })();
})();
