!(function () {
  var e,
    t = (
      "undefined" != typeof globalThis
        ? globalThis
        : "undefined" != typeof self
        ? self
        : "undefined" != typeof window
        ? window
        : "undefined" != typeof global
        ? global
        : {}
    ).parcelRequired439,
    s = t("4FqfW"),
    a = (e = s()) && e.__esModule ? e.default : e,
    n = t("2kp5t"),
    o = t("4pwCs"),
    i = t("6UyrO"),
    r = t("nIfN7"),
    l = t("7Mfds"),
    c = t("6DHKG"),
    d = t("XcRe2"),
    u = t("hQmIV"),
    h = t("6ExGy"),
    m = t("47HXs"),
    g = t("1QaVb"),
    p = t("5kIzC"),
    f = t("qnXVN"),
    v = t("uqDnl"),
    C = t("6oOtY"),
    y = t("6PPN4"),
    b = t("3YoTT"),
    k = t("6zDjW"),
    w = t("4PGYP"),
    S = t("3wQfI"),
    T = t("1rJgl"),
    E = t("2lIMO"),
    _ = t("hUK5n"),
    A = t("5NrOn"),
    P = t("Saatc"),
    I = t("4ZA4S"),
    x = t("1aIyT"),
    G = t("1xehS"),
    D = t("3cqbl"),
    B = t("3lnaG"),
    F = t("lPVHz"),
    O = t("5SoTn"),
    M = t("7rAex"),
    L = t("3HMDR"),
    U = t("7b7Bi"),
    R = t("1X6VZ"),
    N = t("7xzSo"),
    V = t("4RYcH"),
    H = t("2JplJ"),
    z = t("1g0wW"),
    W = t("23BIq"),
    $ = t("23fUW"),
    q = t("2zvjG"),
    j = t("2Usdv"),
    Y = t("4NLO5"),
    Z = t("2cWJK"),
    K = t("6vp85"),
    Q = t("5Y5vM"),
    J = t("520kD"),
    X = t("5LHf1"),
    ee = t("5ZuLE"),
    te = t("7dHHw"),
    se = t("1GjA3"),
    ae = t("6o3Qu"),
    ne = t("5HXaP"),
    oe = t("367Kq"),
    ie = t("6xgmF"),
    re = t("5zaO9"),
    le = t("6lSP7"),
    ce = t("5hlU5"),
    de = t("lUxTC");
  s(),
    n(),
    o(),
    i(),
    r(),
    l(),
    c(),
    d(),
    u(),
    h(),
    m(),
    g(),
    p(),
    f(),
    m(),
    v(),
    C(),
    y();
  class ue extends g().default.Component {
    constructor(...e) {
      var t;
      return (
        (t = super(...e)),
        (this._onAccountClick = () => {
          C().iframeBus.send("ig.ajax-go", "/inssistapp");
        }),
        (this._onRateYesClick = (e) => {
          chrome.tabs.create({ url: f().common.reviewsUrl }),
            m().gaController.sendEvent("user", "rate-us:yes-click"),
            this._acknowledgeAndHide(e);
        }),
        (this._onRateNoClick = (e) => {
          m().gaController.sendEvent("user", "rate-us:no-click"),
            this._acknowledgeAndHide(e);
        }),
        (this._onOkClick = (e) => {
          m().gaController.sendEvent("user", "rate-us:ok-click"),
            this._acknowledgeAndHide(e);
        }),
        (this._onCloseClick = (e) => {
          m().gaController.sendEvent("user", "rate-us:close-click"),
            this._acknowledgeAndHide(e);
        }),
        t
      );
    }
    render() {
      return Glamor.createElement(
        p().default.SnackbarItem,
        { id: "rate-us-mediator", show: this.props.show },
        Glamor.createElement(p().default.RateUsStars, {
          texts: {
            subcontent: Glamor.createElement(
              "div",
              null,
              "Found a bug? You can DM us at ",
              Glamor.createElement(
                "a",
                { onClick: this._onAccountClick },
                "@inssistapp"
              ),
              " or email at ",
              Glamor.createElement(
                "a",
                { href: "mailto:inssist@slashed.io" },
                "inssist@slashed.io"
              ),
              " and we will try to help."
            ),
          },
          onRateYesClick: this._onRateYesClick,
          onRateNoClick: this._onRateNoClick,
          onOkClick: this._onOkClick,
          onCloseClick: this._onCloseClick,
        })
      );
    }
    _acknowledgeAndHide(e) {
      m().gaController.sendEvent("user", `rate-us:${e}-stars`),
        v().transaction((t) => {
          (t.rateUs.shown = !1),
            (t.rateUs.rate = e),
            (t.acknowledged.rateUs = Date.now());
        });
    }
  }
  var he = v().influx((e) => ({
    show: e.rateUs.shown && !y().stateProxy.isAcknowledged("rateUs"),
  }))(ue);
  C(), b(), k(), v(), y();
  var me = {
    init: function () {
      if (y().stateProxy.isAcknowledged("rateUs")) return;
      pe(30),
        C().iframeBus.on("ig.media-open", ge),
        C().iframeBus.on("ig.published", ge);
    },
    showRateUs: function () {
      pe(5);
    },
  };
  function ge() {
    pe(5);
  }
  async function pe(e) {
    if (y().stateProxy.isAcknowledged("followUs")) return;
    const t = v().model.state;
    (Date.now() - t.installedAt) / k().DAY < e ||
      (C().iframeBus.off("ig.media-open", ge),
      C().iframeBus.off("ig.published", ge),
      await b().default(7 * k().SECOND),
      v().transaction((e) => {
        e.rateUs.shown = !0;
      }));
  }
  w(),
    C(),
    S(),
    T(),
    E(),
    _(),
    A(),
    k(),
    P(),
    I(),
    C(),
    y(),
    m(),
    v(),
    x(),
    G(),
    p(),
    D(),
    b(),
    E(),
    B(),
    F(),
    k(),
    P(),
    v(),
    I(),
    w(),
    m(),
    x(),
    O();
  const {
    hasEngagementData: fe,
    calcEngagement: ve,
    calcRate: Ce,
  } = p().default.tagUtils;
  var ye = {
    fetchTagFromIg: ke,
    fetchTagsFromRedis: we,
    fetchLadder: async function e(t) {
      const s = e;
      s.cache || (s.cache = {});
      const a = v().model.state,
        n = a.authStatus.userId;
      if (!n) return {};
      const o = O().default.getAccountStats(),
        i = ve(o),
        r = E().default(`${be.apiUrl}/ladder/calculate`, {
          id: n,
          engagement: i,
          tags: t.join(","),
        });
      if (s.cache[r]) return s.cache[r];
      const l = await we(t),
        c = [];
      for (const e of t) {
        if (l[e]) continue;
        const t = await ke(e);
        t && c.push(t);
      }
      P().env.is.production &&
        (async () => {
          for (const e in l) await ke(e);
        })();
      const d = {
        low: [],
        medium: [],
        high: [],
        vhigh: [],
        nodata: [],
        relevant: [],
      };
      try {
        const e = await I().fetcher.fetchJson(r, { method: "POST" });
        d.low.push(...(e.low || [])),
          d.medium.push(...(e.medium || [])),
          d.high.push(...(e.high || [])),
          d.vhigh.push(...(e.vhigh || [])),
          d.nodata.push(...(e.nodata || []));
      } catch (e) {
        return console.error("failed to fetch ladder", e), d;
      }
      {
        const e = [];
        for (const t of Object.values(l)) e.push(t.relevantTags);
        for (const t of c) e.push(t.relevantTags);
        d.relevant = []
          .concat(...d.low)
          .concat(...d.medium)
          .concat(...d.high)
          .concat(...d.vhigh);
      }
      for (const e in d) d[e] = d[e].map(x().decompressTag);
      const u = a.tagAssist.ladderConfig.tiers,
        h = [...Object.values(l), ...c];
      for (const e of h) {
        let t;
        if (fe(e)) {
          const s = ve(e),
            a = Ce(s, i);
          t =
            a < u.low
              ? d.low
              : a < u.medium
              ? d.medium
              : a < u.high
              ? d.high
              : d.vhigh;
        } else t = d.nodata;
        t.find((t) => t.name === e.name) || t.push(e);
      }
      const m = new Set(t);
      for (const e in d) {
        const t = d[e];
        if ("nodata" === e) {
          d[e] = t.sort((e, t) =>
            m.has(e.name) ? -1 : m.has(t.name) ? 1 : null
          );
          continue;
        }
        const s = {};
        for (const e of t) {
          const t = e.relevantTags.slice(0, 50);
          for (const e of t) s[e] = (s[e] || 0) + 1;
        }
        d[e] = t.sort((e, t) => {
          if (m.has(e.name)) return -1;
          if (m.has(t.name)) return 1;
          const a = s[e.name],
            n = s[t.name];
          return a || n ? (a ? (n ? n - a : -1) : 1) : null;
        });
      }
      for (const e in d) "nodata" !== e && (d[e] = d[e].filter(fe));
      return (
        (d.relevant = d.relevant.slice(0, 120).map((e) => ({ name: e.name }))),
        (s.cache[r] = d),
        F().default(
          "tag-assist.reset-ladder-cache",
          { delay: 20 * k().MINUTE },
          () => {
            delete s.cache[r];
          }
        ),
        d
      );
    },
  };
  const be = P().env.options.tagAssist;
  async function ke(e) {
    const t = ke;
    t.initialized &&
      ((t.initialized = !0), (t.incognito = !0), (t.lastRunOn = null));
    const s = Date.now();
    if (t.lastRunOn && !t.incognito) {
      const e = s - t.lastRunOn,
        a = 2 * k().SECOND;
      e < a && (await b().default(a - e));
    }
    (t.lastRunOn = s), (e = e.toLowerCase());
    const a = await w().chromeBus.send("ig-api.fetch-tag", e, {
      incognito: t.incognito,
    });
    if (a.result) {
      const e = {
        ...a.result,
        name: a.result.name.toLowerCase(),
        lastScanOn: Date.now(),
        relevantTags: a.result.relevantTags
          .map((e) => e.toLowerCase())
          .slice(0, be.maxRelevantTagsToKeep),
      };
      return w().chromeBus.send("tag-assist.tag-fetched-from-ig", e), e;
    }
    if (t.incognito) return (t.incognito = !1), ke(e);
    const n = D().default(() => JSON.stringify(a.error), "unknown");
    return (
      m().gaController.sendEvent(
        "user",
        "tag-assist:fetch-tag-from-ig-error",
        n
      ),
      console.error("failed to fetch tags from ig", a.error),
      null
    );
  }
  async function we(e) {
    if (
      0 ===
      (e = B()
        .default(e)
        .map((e) => e.toLowerCase())).length
    )
      return {};
    const t = v().model.state.authStatus.userId;
    if (!t) return {};
    let s;
    try {
      const a = E().default(be.apiUrl, { id: t, tags: e.join(",") });
      s = await I().fetcher.fetchJson(a, { credentials: "omit" });
    } catch (e) {
      return console.error("failed to fetch tags from redis", e), {};
    }
    const a = {};
    for (const e in s.tags) {
      const t = x().decompressTag(`${e}:${s.tags[e]}`);
      (t.name = t.name.toLowerCase()),
        (t.relevantTags = t.relevantTags
          .map((e) => e.toLowerCase())
          .slice(0, be.maxRelevantTagsToKeep)),
        (a[e] = t);
    }
    return (
      Object.keys(a).forEach((e) => {
        fe(a[e]) || delete a[e];
      }),
      a
    );
  }
  const Se = _().default();
  var Te = {
    init: async function () {
      (function () {
        const e = v().model.state.tagAssist.collectionsTagData;
        for (const t in e) {
          const s = x().decompressTag(e[t]);
          G().default.tagData[t] = s;
        }
      })(),
        (async function () {
          const e = v().model.state,
            t = Date.now(),
            s = e.tagAssist.ladderConfig.lastUpdateOn;
          if (t - s < 1 * k().HOUR) return;
          const a = v().model.state.authStatus.userId;
          if (!a) return;
          let n;
          try {
            const e = E().default(`${Ee.apiUrl}/ladder/get-config`, { id: a }),
              t = await I().fetcher.fetchJson(e);
            n = t.ladderConfig || null;
          } catch (e) {
            console.error("failed to fetch ladder config", e);
          }
          if (!n) return;
          v().transaction((e) => {
            e.tagAssist.ladderConfig = { lastUpdateOn: Date.now(), ...n };
          });
        })(),
        C().iframeBus.on("ig.ig-creation-session-start", () => {
          v().transaction((e) => {
            e.tagAssist.igSelectedTags = [];
          });
        }),
        _e({
          _captionChange_: "tag-assist.ig-caption-change",
          _sessionStart_: "ig.creation-session-start",
          _sessionEnd_: "ig.creation-session-end",
          _setCaption_: "ig.creation-set-caption",
          _selectedTags_: "igSelectedTags",
        }),
        _e({
          _captionChange_: "tag-assist.fcs-caption-change",
          _sessionStart_: "tag-assist.fcs-composer-opened",
          _sessionEnd_: "tag-assist.fcs-composer-closed",
          _setCaption_: "tag-assist.fcs-set-caption",
          _selectedTags_: "fcsSelectedTags",
        }),
        Se(() => {
          v().transaction((e) => {
            for (const t in e.tagAssist.collectionsTagData) {
              const s = G().default.tagData[t];
              s && (e.tagAssist.collectionsTagData[t] = x().compressTag(s));
            }
          });
        }),
        v().model.observe(
          (e) => e.schedule.navigation.isOpen,
          (e) => {
            e ||
              v().transaction((e) => {
                e.schedule.showTagAssist = !1;
              });
          }
        ),
        await (async function () {
          await new Promise((e) => {
            v().model.state.tagAssist.collections.length > 0
              ? e()
              : C().iframeBus.on("ig.ready", async () => {
                  const t = await C().iframeBus.send(
                    "tag-assist.read-collections-from-ls"
                  );
                  v().transaction((e) => {
                    e.tagAssist.collections = t;
                  }),
                    e();
                });
          });
        })(),
        Ae();
    },
    search: async function e({ sendGaEvent: t = !0 } = {}) {
      const s = e,
        a = S().generate();
      s.searchId = a;
      const n = v().model.state.tagAssist.query.trim().toLowerCase();
      if (
        (v().transaction((e) => {
          e.tagAssist.ladderLoadingTags = [];
        }),
        !n)
      )
        return void v().transaction((e) => {
          (e.tagAssist.searching = !1), (e.tagAssist.ladder = null);
        });
      t && m().gaController.sendEvent("user", "tag-assist:search-perform");
      const o = x().extractTags(n).slice(0, Ee.maxTagsToQuery),
        i = await ye.fetchLadder(o);
      if (s.searchId !== a) return;
      const r = {};
      for (const e in i) {
        const t = i[e];
        for (const e of t) {
          !!e.lastScanOn && (r[e.name] = e);
        }
      }
      Object.assign(G().default.tagData, r),
        Ie(),
        v().transaction((e) => {
          (e.tagAssist.searching = !1),
            (e.tagAssist.ladderLoadingTags = []),
            (e.tagAssist.ladder = {});
          for (const t in i) {
            const s = i[t];
            e.tagAssist.ladder[t] = s.map((e) => e.name);
          }
          0 === i[e.tagAssist.selectedGroupId].length &&
            (e.tagAssist.selectedGroupId = "medium");
        });
    },
    getTagData: function () {
      return G().default.tagData;
    },
    onTagDataUpdate: Se,
    registerUsage: function () {
      if (true)
        return void m().gaController.sendEvent(
          "user",
          "pro-paid-usage:tag-assist"
        );
      v().transaction((e) => {
        const t = Math.floor(Date.now() / k().DAY);
        e.tagAssist.lastDayUsedOn
          ? e.tagAssist.lastDayUsedOn !== t &&
            ((e.billing.trial.tagAssist += 1), (e.tagAssist.lastDayUsedOn = t))
          : (e.tagAssist.lastDayUsedOn = t);
      });
    },
    selectTags: function (e, t = null) {
      const s =
        "sidebar" === t
          ? "sidebarSelectedTags"
          : "schedule" === t
          ? "fcsSelectedTags"
          : "igSelectedTags";
      v().transaction((t) => {
        t.tagAssist[s] = [...t.tagAssist[s], ...e].filter(T().default);
      });
    },
    unselectTags: function (e, t = null) {
      const s =
        "sidebar" === t
          ? "sidebarSelectedTags"
          : "schedule" === t
          ? "fcsSelectedTags"
          : "igSelectedTags";
      v().transaction((t) => {
        t.tagAssist[s] = t.tagAssist[s].filter((t) => !e.includes(t));
      });
    },
    toggleTag: function (e, t = null) {
      const s =
        "sidebar" === t
          ? "sidebarSelectedTags"
          : "schedule" === t
          ? "fcsSelectedTags"
          : "igSelectedTags";
      v().transaction((t) => {
        t.tagAssist[s].includes(e)
          ? (t.tagAssist[s] = t.tagAssist[s].filter((t) => t !== e))
          : t.tagAssist[s].push(e);
      });
    },
    copyTags: function (e) {
      const t = e.map((e) => `#${e}`).join(" ");
      navigator.clipboard.writeText(t);
    },
    checkTags: async function e(t) {
      const s = e,
        a = S().generate();
      (s.execId = a),
        v().transaction((e) => {
          e.tagAssist.ladderLoadingTags = e.tagAssist.ladderLoadingTags
            .concat(t)
            .filter((e) => !G().default.tagData[e])
            .filter(T().default);
        });
      const n = await ye.fetchTagsFromRedis(t);
      if ((Object.assign(G().default.tagData, n), Ie(), s.execId !== a)) return;
      v().transaction((e) => {
        e.tagAssist.ladderLoadingTags = e.tagAssist.ladderLoadingTags.filter(
          (e) => !G().default.tagData[e]
        );
      });
      const o = async () => {
        if (s.execId !== a) return;
        const e = v().model.state.tagAssist.ladderLoadingTags[0];
        if (!e) return;
        const t = await ye.fetchTagFromIg(e);
        t && ((G().default.tagData[e] = t), Ie()),
          v().transaction((t) => {
            t.tagAssist.ladderLoadingTags =
              t.tagAssist.ladderLoadingTags.filter((t) => t !== e);
          }),
          o();
      };
      o();
    },
    refreshTag: async function (e) {
      v().transaction((t) => {
        t.tagAssist.ladderLoadingTags.push(e);
      }),
        delete G().default.tagData[e],
        Ie();
      const t = await ye.fetchTagFromIg(e);
      (G().default.tagData[t.name] = t),
        Ie(),
        v().transaction((t) => {
          A().default(t.tagAssist.ladderLoadingTags, e);
        });
    },
    stopTags: function (e) {
      v().transaction((t) => {
        t.tagAssist.ladderLoadingTags = t.tagAssist.ladderLoadingTags.filter(
          (t) => !e.includes(t)
        );
      });
    },
    stopAllTags: function () {
      v().transaction((e) => {
        e.tagAssist.ladderLoadingTags = [];
      });
    },
    saveCollectionsToLs: function () {
      const e = v().model.state.tagAssist.collections;
      C().iframeBus.send("tag-assist.save-collections-to-ls", e);
    },
    checkCollectionTags: Pe,
    updateCollectionsTagData: Ae,
  };
  const Ee = P().env.options.tagAssist;
  function _e({
    _captionChange_: e,
    _sessionStart_: t,
    _sessionEnd_: s,
    _setCaption_: a,
    _selectedTags_: n,
  }) {
    let o = "",
      i = !0;
    C().iframeBus.on(e, (e) => {
      i &&
        ((o = e),
        v().transaction((e) => {
          e.tagAssist[n] = x().extractTags(o, !0);
        }));
    }),
      C().iframeBus.on(t, () => {
        let e;
        const t = v().model.observe(
          (e) => e.tagAssist[n].join("-"),
          async () => {
            const t = v().model.state,
              s = x().extractTags(o, !0),
              r = t.tagAssist[n],
              l = r.filter((e) => !s.includes(e)),
              c = s.filter((e) => !r.includes(e));
            for (const e of c)
              o = o
                .replace(new RegExp(`\\s#${e}([^\\p{L}\\d_])`, "gui"), "$1")
                .replace(new RegExp(`^#${e}([^\\p{L}\\d_])`, "gui"), "$1")
                .replace(new RegExp(`#${e}\\s`, "gui"), "")
                .replace(new RegExp(`\\s#${e}$`, "gui"), "")
                .replace(new RegExp(`#${e}$`, "gui"), "");
            for (const e of l) o ? (o += ` #${e}`) : (o = `#${e}`);
            clearTimeout(e),
              (i = !1),
              await C().iframeBus.send(a, o),
              (e = setTimeout(() => {
                i = !0;
              }));
          },
          !1
        );
        C().iframeBus.on(s, () => {
          t && t();
        });
      });
  }
  async function Ae() {
    const e = v()
      .model.state.tagAssist.collections.map((e) => e.tags)
      .flat();
    v().transaction((t) => {
      const s = Date.now(),
        a = t.tagAssist.collectionsTagData,
        n = Object.keys(a).filter((t) => {
          if (!e.includes(t)) return !0;
          const n = x().decompressTag(a[t]);
          return s - n.lastScanOn > Ee.collectionsTagDataTtl;
        });
      for (const e of n) delete a[e];
    });
    Pe(
      e
        .filter((e) => !v().model.state.tagAssist.collectionsTagData[e])
        .slice(0, 80)
    );
  }
  async function Pe(e, { useRedis: t = !0 } = {}) {
    v().transaction((t) => {
      t.tagAssist.collectionsLoadingTags = t.tagAssist.collectionsLoadingTags
        .concat(e)
        .filter(T().default);
    });
    let s = {};
    t &&
      ((s = await ye.fetchTagsFromRedis(e)),
      v().transaction((e) => {
        for (const t in s) {
          const a = s[t];
          e.tagAssist.collectionsTagData[t] = x().compressTag(a);
        }
        e.tagAssist.collectionsLoadingTags =
          e.tagAssist.collectionsLoadingTags.filter((e) => !s[e]);
      })),
      (e = e.filter((e) => !s[e]).slice(0, 30)),
      v().transaction((t) => {
        t.tagAssist.collectionsLoadingTags = e;
      });
    for (const t of e) {
      const e = await ye.fetchTagFromIg(t);
      v().transaction((s) => {
        e && (s.tagAssist.collectionsTagData[t] = x().compressTag(e)),
          (s.tagAssist.collectionsLoadingTags =
            s.tagAssist.collectionsLoadingTags.filter((e) => e !== t));
      });
    }
  }
  function Ie() {
    Se(G().default.tagData);
  }
  g(),
    p(),
    y(),
    m(),
    v(),
    P(),
    M(),
    v(),
    L(),
    C(),
    m(),
    u(),
    U(),
    R(),
    k(),
    m(),
    y(),
    v();
  const xe = {
      init: function () {
        this.updateDiscount();
      },
      updateDiscount: function () {
        true ||
          (-1 === v().model.state.billing.discount.availableTill &&
            this.hasExceededTrialFeature() &&
            (v().transaction((e) => {
              e.billing.discount.availableTill = R()
                .default(Date.now() + 4 * k().DAY)
                .getTime();
            }),
            setTimeout(() => {
              m().gaController.sendEvent(
                "user",
                "billing:discount-message-shown"
              ),
                v().transaction((e) => {
                  e.billing.discount.showSnackbarMessage = !0;
                });
            }, 7e3)));
      },
      hasExceededTrialFeature: function () {
        return Object.keys(v().model.state.billing.trial)
          .filter((e) => "installedOn" !== e)
          .some((e) => !y().stateProxy.hasTrialFeature(e));
      },
    },
    Ge = {
      pricingRequested: !1,
      apiSender: new (M().Sender)({ urlPrefix: P().env.options.apiUrl }),
      defaultCountry: "United States",
      statesOfAmerica: [
        "Alabama",
        "Alaska",
        "Arizona",
        "Arkansas",
        "California",
        "Colorado",
        "Connecticut",
        "Delaware",
        "Florida",
        "Georgia",
        "Hawaii",
        "Idaho",
        "Illinois",
        "Indiana",
        "Iowa",
        "Kansas",
        "Kentucky",
        "Louisiana",
        "Maine",
        "Maryland",
        "Massachusetts",
        "Michigan",
        "Minnesota",
        "Mississippi",
        "Missouri",
        "Montana",
        "Nebraska",
        "Nevada",
        "New Hampshire",
        "New Jersey",
        "New Mexico",
        "New York",
        "North Carolina",
        "North Dakota",
        "Ohio",
        "Oklahoma",
        "Oregon",
        "Pennsylvania",
        "Rhode Island",
        "South Carolina",
        "South Dakota",
        "Tennessee",
        "Texas",
        "Utah",
        "Vermont",
        "Virginia",
        "Washington",
        "West Virginia",
        "Wisconsin",
        "Wyoming",
      ],
      fsamLink: null,
      fsamLinkRequestedAt: -1,
      init: function () {
        xe.init(), this.capturePageEvents(), this.sendGaEventsWhenPurchasing();
      },
      openBilling: function (e = null) {
        v().transaction((t) => {
          (t.sidebar.isOpen = !0),
            (t.sidebar.selectedTabId = "tab-billing"),
            (t.billing.navigation.isBodyOpen = !0),
            (t.tagAssist.shown = !1),
            (t.coverAssist.shown = !1),
            (t.musicAssist.shown = !1),
            (t.storyAssist.shown = !1),
            e && (t.billing.recentFeature = e);
        });
      },
      capturePageEvents: function () {
        C().iframeBus.on("fspring.close", this.closeFSpringPopup),
          C().iframeBus.on("fspring.subscription-success", () => {
            chrome.runtime.sendMessage({
              name: "fspring.subscription-success",
            });
          }),
          C().iframeBus.on("fspring.subscription-failure", () => {
            chrome.runtime.sendMessage({
              name: "fspring.subscription-failure",
            });
          });
      },
      closeFSpringPopup: function () {
        v().transaction((e) => {
          e.billing.purchasingPlan = null;
        });
      },
      sendGaEventsWhenPurchasing: function () {
        v().model.observe(
          (e) => e.billing.purchasingPlan,
          (e) => {
            if (!e) return;
            const t = v().model.state.billing.recentFeature || "none";
            m().gaController.sendEvent("user", `upgrade:from-${t}-${e.id}`);
          }
        );
      },
      updatePricing: async function () {
        var e, t, s;
        if (this.pricingRequested) return;
        const a = await L().igApi.fetchLoginActivity();
        let n = this.defaultCountry;
        const o =
          (null === (e = a.result) ||
          void 0 === e ||
          null === (t = e.data) ||
          void 0 === t
            ? void 0
            : t.sessions) ||
          (null === (s = a.result) || void 0 === s ? void 0 : s.sessions);
        if ((null == o ? void 0 : o.length) > 0) {
          (n = (
            (o.find((e) => (e.location || "").split(", ").length > 1) || o[0])
              .location || ""
          ).split(", ")),
            (n = n[n.length - 1]),
            "" === !n
              ? (n = null)
              : this.statesOfAmerica.includes(n) && (n = this.defaultCountry);
        }
        const i = "/fspring/pricing",
          r =
            n !== this.defaultCountry
              ? `United States,${n}`
              : this.defaultCountry,
          l = Object.keys(P().env.options.billingPlans).join(","),
          c = await this.apiSender.send(i, {
            query: { countryNames: r, productIds: l },
          });
        if (c && "ok" === c.status) {
          this.pricingRequested = !0;
          const { countries: e, pricing: t } = c,
            s = n ? e[n] : null;
          v().transaction((e) => {
            (e.billing.countryIso = s), (e.billing.pricing = t);
          });
        } else {
          const e = c.error;
          ("TypeError" === e.name && "Failed to fetch" === e.message) ||
            u().sentryController.sendError(
              `Unexpected API error at ${i}`,
              "error",
              { error: e },
              { actor: "auth" }
            );
        }
      },
      onFsamClick: function () {
        let e = `https://${P().env.options.storefront}/account`;
        const t = Date.now();
        this.fsamLink =
          t - this.fsamLinkRequestedAt < 828e5 ? this.fsamLink : null;
        (this.fsamLink
          ? Promise.resolve()
          : U()
              .billingConnector.accountManagementUrl(
                null,
                v().model.state.billing.account.token
              )
              .then((e) => {
                (this.fsamLink = e.url), (this.fsamLinkRequestedAt = t);
              })
        )
          .then(() => {
            this.fsamLink && (e = `${this.fsamLink}#/subscriptions`),
              chrome.tabs.create({ url: e, active: !0 });
          })
          .catch(() => {
            chrome.tabs.create({ url: e, active: !0 });
          });
      },
    };
  function De() {
    return (De =
      Object.assign ||
      function (e) {
        for (var t = 1; t < arguments.length; t++) {
          var s = arguments[t];
          for (var a in s)
            Object.prototype.hasOwnProperty.call(s, a) && (e[a] = s[a]);
        }
        return e;
      }).apply(this, arguments);
  }
  g(), p(), f(), m(), v(), o(), g(), p(), v(), y(), U();
  let Be = -1,
    Fe = -1;
  const Oe = (e) => null == e,
    Me = (e, t = null) => (null != e ? e : t);
  g().default.Image.registerImages({
    "billing-form-mediator.inssist": "inssist-mini.png:24:24",
  });
  const Le = {
    selectedPlan: {
      maxWidth: 240,
      ...g().default.absolute("0 0 . . 1"),
      ...g().default.shadow.sh6,
      paddingTop: g().default.space.g5,
      paddingBottom: g().default.space.g3,
      backgroundColor: g().default.color.bgLight2,
      borderRadius: 8,
    },
  };
  class Ue extends g().default.Component {
    static getDerivedStateFromProps(e, t) {
      const s = e.billing.snapshot || {},
        a = {
          panel: Me(s.panel),
          accountScreen: Me(s.accountScreen, null),
          accountForm: Me(s.accountForm, {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            errors: { email: !1, password: !1, firstName: !1, lastName: !1 },
          }),
          statusText: Me(s.statusText),
          statusButtons: Me(s.statusButtons),
          confirmationCodeText: Me(s.confirmationCodeText),
          confirmationCodeError: Me(s.confirmationCodeError, !1),
          passwordResetValue: Me(s.passwordResetValue),
          passwordResetCodeText: Me(s.passwordResetCodeText),
          passwordResetCodeError: Me(s.passwordResetCodeError, !1),
          loading: Me(s.loading, !1),
        };
      if (!t.isAccountFormTouched) {
        if (
          (e.authStatus.email &&
            (a.accountForm.email || (a.accountForm.email = e.authStatus.email)),
          e.authStatus.fullName)
        ) {
          const t = e.authStatus.fullName.split(" "),
            s = t.shift(),
            n = t.join(" ");
          !a.accountForm.firstName && s && (a.accountForm.firstName = s),
            !a.accountForm.lastName && n && (a.accountForm.lastName = n);
        }
        a.accountForm.password = "";
      }
      return a;
    }
    constructor(e) {
      super(e), Re.call(this), (this.state = {});
    }
    render() {
      return Glamor.createElement(
        p().default.BillingForm,
        { disabled: this.state.loading },
        this.renderContent()
      );
    }
    renderContent() {
      const { email: e } = this.props.billing.account,
        {
          accountScreen: t,
          accountForm: s,
          confirmationCodeText: a,
          passwordResetValue: n,
          passwordResetCodeText: o,
        } = this.state;
      if ("auth" === t)
        return Glamor.createElement(
          g().default.Fragment,
          null,
          Glamor.createElement(
            p().default.BillingFSpringAuthSection,
            De({}, s, {
              onChange: this._onAccountFormChange,
              onCancelClick: this._onGoToStorefrontClick,
              onNextClick: this._onNextClick,
              disableInputs: !Oe(a),
              hideActions: !Oe(a),
            })
          ),
          this._renderCodeSection(),
          this._renderStatusSection(),
          this._renderSelectedPlanSection()
        );
      if ("login" === t)
        return Glamor.createElement(
          g().default.Fragment,
          null,
          Glamor.createElement(
            p().default.BillingFSpringLoginSection,
            De({}, s, {
              onChange: this._onAccountFormChange,
              onCancelClick: this._onGoToStorefrontClick,
              onIForgotPasswordClick: this._onIForgotPasswordClick,
              onLoginClick: this._onLoginClick,
              disableInputs: !Oe(a),
              hideActions: !Oe(a),
            })
          ),
          this._renderCodeSection(),
          this._renderStatusSection(),
          this._renderSelectedPlanSection()
        );
      if ("create-account" === t)
        return Glamor.createElement(
          g().default.Fragment,
          null,
          Glamor.createElement(
            p().default.BillingFSpringCreateAccountSection,
            De({}, s, {
              onChange: this._onAccountFormChange,
              onCancelClick: this._onGoToStorefrontClick,
              onCreateAccountClick: this._onCreateAccountClick,
              disableInputs: !Oe(a),
              hideActions: !Oe(a),
            })
          ),
          this._renderCodeSection(),
          this._renderStatusSection(),
          this._renderSelectedPlanSection()
        );
      if ("reset" === t) {
        const e = !Oe(o);
        return Glamor.createElement(
          g().default.Fragment,
          null,
          Glamor.createElement(
            p().default.BillingFSpringResetSection,
            De({}, s, {
              newPassword: n,
              onNewPasswordChange: !e && this._onNewPasswordChange,
              onResetPasswordClick: !e && this._onResetPasswordClick,
            })
          ),
          this._renderResetCodeSection(),
          this._renderStatusSection()
        );
      }
      return "reset-confirm" === t
        ? Glamor.createElement(p().default.BillingFSpringResetConfirmSection, {
            onOkClick: this._onResetPasswordAcknowledgeClick,
          })
        : "logout-confirm" === t
        ? Glamor.createElement(p().default.BillingFSpringLogoutConfirmSection, {
            onOkClick: this._onLogoutAcknowledgeClick,
          })
        : "delete-confirm" === t
        ? Glamor.createElement(p().default.BillingFSpringDeleteConfirmSection, {
            onOkClick: this._onDeleteAcknowledgeClick,
          })
        : "manage-account" === t
        ? Glamor.createElement(
            p().default.BillingFSpringManageAccountSection,
            De({ email: e }, this._subscriptions(), {
              onDeleteClick: this._onDeleteClick,
              onDeleteCancelClick: this._onDeleteCancelClick,
            })
          )
        : "delete" === t
        ? Glamor.createElement(
            p().default.BillingFSpringManageAccountSection,
            De({ email: e }, this._subscriptions(), {
              onDeleteConfirmClick: this._onDeleteConfirmClick,
              onDeleteCancelClick: this._onDeleteCancelClick,
            })
          )
        : null;
    }
    _renderCodeSection() {
      const {
        accountScreen: e,
        accountForm: t,
        confirmationCodeText: s,
        confirmationCodeError: a,
      } = this.state;
      if (Oe(s)) return null;
      let n = null;
      const { firstName: o, lastName: i, email: r } = t;
      "create-account" === e &&
        o &&
        i &&
        (n = g().default.emailTypoChecker.check({
          firstName: o,
          lastName: i,
          email: r,
        }));
      const l = Glamor.createElement(
          "p",
          null,
          "Please confirm your email address by entering a code we sent to you from ",
          Glamor.createElement("strong", null, "no-reply@inssist.com"),
          "."
        ),
        c = n
          ? Glamor.createElement(
              "div",
              { css: g().default.row },
              Glamor.createElement("div", { style: { fontSize: 21 } }, "🧐"),
              Glamor.createElement(g().default.Spacer, { width: "g0h" }),
              Glamor.createElement(
                "div",
                { css: g().default.column },
                Glamor.createElement(
                  "p",
                  null,
                  "The email address you entered appears to have a typo. Did you mean to enter ",
                  Glamor.createElement("strong", null, n),
                  " email address instead?"
                ),
                Glamor.createElement(g().default.Spacer, { height: "g0h" }),
                Glamor.createElement(
                  "div",
                  null,
                  "If you made a typo, simply click Cancel."
                ),
                Glamor.createElement(g().default.Spacer, { height: "g0h" })
              )
            )
          : Glamor.createElement(
              "p",
              null,
              "If you have not received a code, please check the spam folder, email address or send a new code."
            );
      return Glamor.createElement(
        g().default.Fragment,
        null,
        Glamor.createElement(g().default.Spacer, { height: "g3" }),
        Glamor.createElement(p().default.BillingCodeSection, {
          value: s,
          text: Glamor.createElement(
            g().default.Fragment,
            null,
            l,
            Glamor.createElement(g().default.Spacer, { height: "g1" }),
            c
          ),
          hasError: a,
          onChange: this._onConfirmationCodeChange,
        }),
        Glamor.createElement(g().default.Spacer, { height: "g3" }),
        Glamor.createElement(
          "div",
          { css: g().default.row },
          Glamor.createElement(g().default.ActionButton, {
            label: "CONFIRM EMAIL",
            shadow: g().default.color.linkShadow,
            onClick: this._onConfirmEmailClick,
          }),
          Glamor.createElement(g().default.Spacer, { width: "g3" }),
          Glamor.createElement(g().default.LinkButton, {
            label: "CANCEL",
            cancel: !0,
            onClick: this._onCancelConfirmEmailClick,
          })
        )
      );
    }
    _renderResetCodeSection() {
      const { passwordResetCodeText: e, passwordResetCodeError: t } =
        this.state;
      return Oe(e)
        ? null
        : Glamor.createElement(
            g().default.Fragment,
            null,
            Glamor.createElement(p().default.BillingCodeSection, {
              value: e,
              text: "We’ve sent a verification code to your email address. Please enter it below:",
              hasError: t,
              onChange: this._onPasswordResetCodeChange,
            }),
            Glamor.createElement(g().default.Spacer, { height: "g3" }),
            Glamor.createElement(
              "div",
              { css: g().default.row },
              Glamor.createElement(g().default.ActionButton, {
                label: "CONFIRM RESET",
                shadow: g().default.color.linkShadow,
                onClick: this._onConfirmPasswordResetClick,
              }),
              Glamor.createElement(g().default.Spacer, { width: "g3" }),
              Glamor.createElement(g().default.LinkButton, {
                label: "CANCEL",
                cancel: !0,
                onClick: this._onCancelPasswordResetClick,
              })
            ),
            Glamor.createElement(g().default.Spacer, { height: "g3" })
          );
    }
    _renderSelectedPlanSection() {
      const { selectedPlan: e } = this.props.billing;
      if (!e) return null;
      const t = this.props.authStatus.username,
        s =
          "inssist-pro-monthly" === e.id
            ? [
                "Best for Casual use",
                "Unlimited accounts",
                "Paid monthly, cancel any time",
              ]
            : "inssist-pro-lifetime" === e.id
            ? [
                "Best for Creatives",
                Glamor.createElement(
                  "div",
                  null,
                  "Activates for this account, ",
                  Glamor.createElement("strong", null, "@", t)
                ),
                "Paid once",
              ]
            : "inssist-pro-infinite" === e.id
            ? ["Best for Businesses", "Unlimited accounts", "Paid once"]
            : null;
      return Glamor.createElement(
        "div",
        { css: [g().default.column, Le.selectedPlan] },
        Glamor.createElement(
          p().default.BillingPlanRenderer,
          De({}, e, {
            benefits: s,
            padding: g().default.padding("0 20 0 50"),
            onChangePlanClick: this._onChangePlanClick,
          })
        )
      );
    }
    _renderStatusSection() {
      const { statusText: e } = this.state;
      if (!Oe(e))
        return Glamor.createElement(
          g().default.Fragment,
          null,
          Glamor.createElement(g().default.Spacer, { height: "g3" }),
          Glamor.createElement(p().default.BillingStatusSection, {
            text: e,
            buttons: this._enrichStatusButtons(),
          })
        );
    }
    _subscriptions() {
      const { subscriptions: e } = this.props.billing;
      if (!e) return null;
      const t = [];
      return (
        e["inssist-pro-monthly"] &&
          "active" === e["inssist-pro-monthly"].state &&
          t.push({
            label: "INSSIST PRO",
            icon: "billing-form-mediator.inssist",
          }),
        0 === t.length
          ? null
          : { subscriptions: t, onFsamClick: this._onFsamClick }
      );
    }
    _showVerificationCodeSnackbar(e) {
      setTimeout(
        () =>
          v().transaction((t) => {
            t.billing.verificationCodeEmail = e;
          }),
        1500
      );
    }
    _hideVerificationCodeSnackbar() {
      setTimeout(
        () =>
          v().transaction((e) => {
            e.billing.verificationCodeEmail = null;
          }),
        1500
      );
    }
    _enrichStatusButtons() {
      return this.state.statusButtons && 0 !== this.state.statusButtons.length
        ? this.state.statusButtons.map((e) => {
            const t = { ...e };
            return (
              "CREATE NEW ACCOUNT" === e.label &&
                (t.onClick = this._onGoToCreateAccountScreen),
              "SEND A NEW CODE" === e.label &&
                (t.onClick = this._onResendCodeClick),
              "I FORGOT MY PASSWORD" === e.label &&
                (t.onClick = this._onIForgotPasswordClick),
              "LOGIN INSTEAD" === e.label &&
                (t.onClick = this._onGoToLoginScreen),
              t
            );
          })
        : null;
    }
    _reset(e, t) {
      t = t || {
        form: !0,
        errors: !0,
        status: !0,
        code: !0,
        password: !0,
        loading: !0,
      };
      const {
        form: s,
        errors: a,
        status: n,
        code: o,
        password: i,
        loading: r,
      } = t;
      s &&
        (this.setState({ isAccountFormTouched: !1 }),
        (e.accountForm.email = ""),
        (e.accountForm.password = ""),
        (e.accountForm.firstName = ""),
        (e.accountForm.lastName = "")),
        a &&
          ((e.accountForm.errors.email = !1),
          (e.accountForm.errors.password = !1),
          (e.accountForm.errors.firstName = !1),
          (e.accountForm.errors.lastName = !1)),
        n && ((e.statusText = null), (e.statusButtons = null)),
        o && ((e.confirmationCodeText = null), (e.confirmationCodeError = !1)),
        i &&
          ((e.passwordResetValue = null),
          (e.passwordResetCodeText = null),
          (e.passwordResetCodeError = !1)),
        r && (e.loading = !1);
    }
    getSnapshot() {
      return o().default.cloneDeep(this.state);
    }
    applySnapshot(e) {
      this.setState(e),
        v().transaction((t) => {
          t.billing.snapshot = e;
        });
    }
    updateSnapshot(e) {
      const t = this.getSnapshot(),
        s = e(t);
      return this.applySnapshot(t), s;
    }
  }
  var Re = function () {
      (this._onFsamClick = () => {
        Ge.onFsamClick();
      }),
        (this._onChangePlanClick = () => {
          v().transaction((e) => {
            (e.billing.selectedPlan = null),
              (e.billing.snapshot.panel = "storefront"),
              (e.billing.snapshot.accountScreen = null);
          });
        }),
        (this._onLogoutAcknowledgeClick = () => {
          this.updateSnapshot((e) => {
            (e.panel = "storefront"), (e.accountScreen = null);
          });
        }),
        (this._onDeleteClick = () => {
          this.updateSnapshot((e) => {
            e.accountScreen = "delete";
          });
        }),
        (this._onCancelClick = () => {
          this.updateSnapshot((e) => {
            (e.panel = "storefront"), (e.accountScreen = null);
          });
        }),
        (this._onDeleteConfirmClick = () => {
          U()
            .billingConnector.deleteAccount(
              this,
              this.props.billing.account.token
            )
            .then(() => {
              this.updateSnapshot((e) => {
                this._reset(e, {
                  status: !0,
                  form: !0,
                  code: !0,
                  password: !0,
                }),
                  (e.accountScreen = "delete-confirm");
              }),
                v().transaction((e) => {
                  e.billing.account = { email: null, token: null };
                });
            })
            .catch((e) => {
              this.updateSnapshot((t) => {
                "unauthorized" === e.status &&
                  (this._reset(t, {
                    form: !0,
                    status: !0,
                    code: !0,
                    password: !0,
                    loading: !0,
                  }),
                  (t.accountScreen = null),
                  (t.statusButtons = null),
                  (t.statusText =
                    "Oops... Your session has expired, please log back in to delete your account."),
                  v().transaction((e) => {
                    (e.billing.account = { email: null, token: null }),
                      (e.billing.snapshot = t);
                  }));
              });
            });
        }),
        (this._onDeleteAcknowledgeClick = () => {
          this.updateSnapshot((e) => {
            (e.panel = "storefront"), (e.accountScreen = null);
          });
        }),
        (this._onDeleteCancelClick = () => {
          this.updateSnapshot((e) => {
            (e.panel = "storefront"), (e.accountScreen = null);
          });
        }),
        (this._onAccountFormChange = (e) => {
          this.setState({ isAccountFormTouched: !0 }),
            this.updateSnapshot((t) => {
              this._reset(t, { status: !0, code: !0, loading: !0 }),
                e.email !== t.accountForm.email &&
                  ((t.accountForm.email = e.email),
                  (t.accountForm.errors.email = !1)),
                e.firstName !== t.accountForm.firstName &&
                  ((t.accountForm.firstName = e.firstName),
                  (t.accountForm.errors.firstName = !1)),
                e.lastName !== t.accountForm.lastName &&
                  ((t.accountForm.lastName = e.lastName),
                  (t.accountForm.errors.lastName = !1)),
                e.password !== t.accountForm.password &&
                  ((t.accountForm.password = e.password),
                  (t.accountForm.errors.password = !1));
            });
        }),
        (this._onGoToStorefrontClick = () => {
          this.updateSnapshot((e) => {
            this._reset(e, {
              status: !0,
              form: !0,
              errors: !0,
              code: !0,
              loading: !0,
            }),
              (e.panel = "storefront");
          });
        }),
        (this._onIForgotPasswordClick = () => {
          this.updateSnapshot((e) => {
            this._reset(e, { status: !0, errors: !0, code: !0, loading: !0 }),
              (e.accountScreen = "reset"),
              (e.passwordResetValue = ""),
              (e.passwordResetCodeText = null);
          });
        }),
        (this._onGoToCreateAccountScreen = () => {
          this.updateSnapshot((e) => {
            this._reset(e, { status: !0, errors: !0, code: !0, loading: !0 }),
              (e.accountScreen = "create-account");
          });
        }),
        (this._onGoToLoginScreen = () => {
          this.updateSnapshot((e) => {
            this._reset(e, { status: !0, errors: !0, code: !0, loading: !0 }),
              (e.accountScreen = "login");
          });
        }),
        (this._onNextClick = () => {
          const { email: e } = this.state.accountForm;
          this.updateSnapshot(
            (t) => (
              (t.accountForm.errors = { email: e.length < 1, password: !1 }),
              t.accountForm.errors.email
                ? ((t.statusText =
                    "Email is required to store your purchases and reuse them across multiple devices."),
                  !0)
                : ((t.statusText = null), !1)
            )
          ) ||
            U()
              .billingConnector.isTaken(this, e)
              .then((e) => {
                e.taken
                  ? v().transaction((e) => {
                      e.billing.snapshot.accountScreen = "login";
                    })
                  : v().transaction((e) => {
                      e.billing.snapshot.accountScreen = "create-account";
                    });
              })
              .catch((e) => {
                console.log(e),
                  this.updateSnapshot((t) => {
                    "bad-query" === e.status &&
                      (t.accountForm.errors.email = !0);
                  });
              });
        }),
        (this._onLoginClick = () => {
          const { email: e, password: t } = this.state.accountForm;
          this.updateSnapshot(
            (s) => (
              (s.accountForm.errors = {
                email: e.length < 1,
                password: t.length < 4,
              }),
              s.accountForm.errors.email || s.accountForm.errors.password
                ? ((s.statusText =
                    "Email and password required to sign in to Inssist account. If you do not have an Inssist account, create one instead."),
                  !0)
                : ((s.statusText = null), !1)
            )
          ) ||
            U()
              .billingConnector.login(this, e, t)
              .then((t) => {
                this.updateSnapshot((e) => {
                  this._reset(e, {
                    status: !0,
                    form: !0,
                    code: !0,
                    password: !0,
                  }),
                    "reset" === e.accountScreen
                      ? (e.accountScreen = "reset-confirm")
                      : (e.panel = "storefront");
                }),
                  v().transaction((s) => {
                    (s.billing.account = { email: e, token: t.token }),
                      s.billing.selectedPlan &&
                        ((s.billing.purchasingPlan = s.billing.selectedPlan),
                        (s.billing.selectedPlan = null));
                  });
              })
              .catch((e) => {
                this.updateSnapshot((t) => {
                  "bad-query" === e.status
                    ? (t.accountForm.errors.email = !0)
                    : "email-is-not-verified" === e.status &&
                      (t.confirmationCodeText = "");
                });
              });
        }),
        (this._onCreateAccountClick = () => {
          const {
            email: e,
            password: t,
            firstName: s,
            lastName: a,
          } = this.state.accountForm;
          if (
            this.updateSnapshot(
              (n) => (
                (n.accountForm.errors = {}),
                e.length < 1 && (n.accountForm.errors.email = !0),
                t.length < 4 && (n.accountForm.errors.password = !0),
                s.length < 1 && (n.accountForm.errors.firstName = !0),
                a.length < 1 && (n.accountForm.errors.lastName = !0),
                (n.confirmationCodeText = null),
                (n.statusText =
                  n.accountForm.errors.email ||
                  n.accountForm.errors.password ||
                  n.accountForm.errors.firstName ||
                  n.accountForm.errors.lastName
                    ? "Please fill in remaining fields to create an Inssist account. First Name and Last Name are required by FastSpring."
                    : null),
                Boolean(n.statusText)
              )
            )
          )
            return;
          const n = y().stateProxy.allUsernames();
          U()
            .billingConnector.register(this, e, t, s, a, n)
            .then(() => {
              this._showVerificationCodeSnackbar(e),
                v().transaction((e) => {
                  e.billing.recordedUsernames = ((e) => Array.from(new Set(e)))(
                    [...e.billing.recordedUsernames, ...n]
                  );
                }),
                this.updateSnapshot((e) => {
                  this._reset(e, { status: !0, code: !0 }),
                    (e.confirmationCodeText = "");
                }),
                v().transaction((t) => {
                  t.billing.account = { email: e };
                });
            })
            .catch((e) => {
              this.updateSnapshot((t) => {
                ("bad-query" === e.status ||
                  "email-already-in-use" === e.status) &&
                  (t.accountForm.errors.email = !0);
              });
            });
        }),
        (this._onConfirmEmailClick = () => {
          if (
            this.updateSnapshot((e) => {
              const { confirmationCodeText: t } = e;
              return 0 === t.length || 5 !== t.length
                ? ((e.confirmationCodeError = !0),
                  (e.statusText =
                    "Verification code does not match our records. Please check your inbox for the code we sent."),
                  (e.statusButtons = [{ label: "SEND A NEW CODE" }]),
                  !0)
                : (this._reset(e, { status: !0 }), !1);
            })
          )
            return;
          const e = this.state.accountForm.email,
            t = this.state.confirmationCodeText;
          U()
            .billingConnector.verifyEmail(this, e, t)
            .then(() => {
              this._hideVerificationCodeSnackbar(), this._onLoginClick();
            })
            .catch((e) => {
              this.updateSnapshot((t) => {
                "bad-query" === e.status
                  ? (t.accountForm.errors.email = !0)
                  : "account-not-found" === e.status
                  ? ((t.statusButtons = null),
                    (t.statusText =
                      "No account found for the given email address. Please correct email address or create a new account instead."))
                  : "email-already-verified" === e.status
                  ? ((t.confirmationCodeText = null),
                    (t.statusText =
                      "This email address has been verified. Please login instead."))
                  : "otp-does-not-match" === e.status &&
                    ((t.confirmationCodeError = !0),
                    (t.statusButtons = [{ label: "SEND A NEW CODE" }]));
              });
            });
        }),
        (this._onResendCodeClick = () => {
          const { email: e, password: t } = this.state.accountForm;
          this.updateSnapshot((e) => {
            this._reset(e, { status: !0, code: !0, loading: !0 }),
              (e.confirmationCodeText = "");
            const t = Date.now();
            return (
              Math.round((Be + 3e4 - t) / 1e3) > 0 &&
              ((e.statusText =
                "The last code was sent less than a minute ago. Please wait some time before requesting a new one."),
              (e.statusButtons = [{ label: "SEND A NEW CODE" }]),
              !0)
            );
          }) ||
            ((Be = Date.now()),
            U()
              .billingConnector.resendOtp(this, e, t)
              .then(() => {
                this._showVerificationCodeSnackbar(e),
                  this.updateSnapshot((e) => {
                    (e.statusText =
                      "We sent you a new email verification code. Please check your inbox for messages from no-reply@inssist.com."),
                      (e.statusButtons = [{ label: "SEND A NEW CODE" }]);
                  });
              })
              .catch((e) => {
                this.updateSnapshot((t) => {
                  "account-not-found" === e.status
                    ? (t.statusText =
                        "No account found for the given email address. Please update email address or create a new account instead.")
                    : "account-is-not-active" === e.status
                    ? (t.statusText =
                        "This account has been disabled. Please create a new account instead.")
                    : "email-already-verified" === e.status &&
                      ((t.confirmationCodeText = null),
                      (t.statusText =
                        "This email address has already been verified. Please login instead."));
                });
              }));
        }),
        (this._onResetPasswordClick = (e) => {
          if (!e)
            return void this.updateSnapshot((e) => {
              this._reset(e, {
                status: !0,
                code: !0,
                loading: !0,
                password: !0,
              }),
                (e.panel = "storefront"),
                (e.accountScreen = null);
            });
          if (
            this.updateSnapshot((e) => {
              this._reset(e, { status: !0, code: !0 });
              const t = Date.now();
              return (
                Math.round((Fe + 3e4 - t) / 1e3) > 0 &&
                ((e.statusText =
                  "The last code was sent less than a minute ago. Please wait some time before requesting a new one."),
                this.applySnapshot(e),
                !0)
              );
            })
          )
            return;
          const t = this.state.accountForm.email;
          (Fe = Date.now()),
            U()
              .billingConnector.recoverPassword(this, t)
              .then(() => {
                this._showVerificationCodeSnackbar(t),
                  this.updateSnapshot((e) => {
                    e.passwordResetCodeText = "";
                  });
              })
              .catch((e) => {
                this.updateSnapshot((t) => {
                  "account-not-found" === e.status &&
                    ((t.statusButtons = null),
                    (t.statusText =
                      "No account found for the given email address. Please correct email address or create a new account instead."));
                });
              });
        }),
        (this._onConfirmPasswordResetClick = () => {
          if (
            this.updateSnapshot((e) => {
              const { passwordResetCodeText: t } = e;
              return 0 === t.length || 5 !== t.length
                ? ((e.passwordResetCodeError = !0),
                  (e.statusText =
                    "Verification code does not match our records. Please check your inbox for the code we sent."),
                  !0)
                : (this._reset(e, { status: !0 }), !1);
            })
          )
            return;
          const e = this.state.accountForm.email,
            t = this.state.passwordResetCodeText,
            s = this.state.passwordResetValue;
          U()
            .billingConnector.changePassword(this, e, t, s)
            .then(() => {
              this._hideVerificationCodeSnackbar(),
                this.setState({ isAccountFormTouched: !0 }),
                this.updateSnapshot((e) => {
                  e.accountForm.password = s;
                }),
                this._onLoginClick();
            })
            .catch((e) => {
              this.updateSnapshot((t) => {
                "bad-query" === e.status
                  ? (t.accountForm.errors.email = !0)
                  : "account-not-found" === e.status
                  ? ((t.statusButtons = null),
                    (t.statusText =
                      "No account found for the given email address. Please correct email address or create a new account instead."))
                  : "account-is-not-active" === e.status &&
                    (t.statusText =
                      "This account has been disabled. Please create a new account instead.");
              });
            });
        }),
        (this._onConfirmationCodeChange = (e) => {
          this.updateSnapshot((t) => {
            this._reset(t, { status: !0, loading: !0 }),
              (t.confirmationCodeText = e),
              (t.confirmationCodeError = !1);
          });
        }),
        (this._onCancelConfirmEmailClick = () => {
          this._hideVerificationCodeSnackbar(),
            this.updateSnapshot((e) => {
              this._reset(e, { status: !0, code: !0, loading: !0 });
            });
        }),
        (this._onPasswordResetCodeChange = (e) => {
          this.updateSnapshot((t) => {
            this._reset(t, { status: !0, loading: !0 }),
              (t.passwordResetCodeText = e),
              (t.passwordResetCodeError = !1);
          });
        }),
        (this._onNewPasswordChange = (e) => {
          this.updateSnapshot((t) => {
            this._reset(t, { status: !0, code: !0, loading: !0 }),
              (t.passwordResetValue = e),
              (t.passwordResetCodeText = null);
          });
        }),
        (this._onCancelPasswordResetClick = () => {
          this._hideVerificationCodeSnackbar(),
            this.updateSnapshot((e) => {
              this._reset(e, {
                status: !0,
                code: !0,
                password: !0,
                loading: !0,
              }),
                (e.panel = "storefront"),
                (e.accountScreen = null);
            });
        }),
        (this._onResetPasswordAcknowledgeClick = () => {
          this.updateSnapshot((e) => {
            this._reset(e, { status: !0, code: !0, password: !0, loading: !0 }),
              (e.panel = "storefront"),
              (e.accountScreen = null);
          });
        });
    },
    Ne = v().influx((e) => ({
      billing: e.billing,
      authStatus: e.authStatus,
      hasPro: true,
      hasProPaid: true,
      hasProPromocode: y().stateProxy.hasProPromocode(),
    }))(Ue);
  g(), y(), v();
  const Ve = {
    root: {
      ...g().default.padding("g1h 0 0 0"),
      borderTop: g().default.border.dark,
    },
    title: {
      ...g().default.text.bleakSemiBold,
      maxWidth: 120,
      minWidth: 120,
      opacity: 0.6,
      textAlign: "right",
      marginRight: g().default.space.g5,
    },
    stat: { minWidth: 100, paddingRight: g().default.space.g3 },
    statValue: {
      fontFamily: "var(--font-primary)",
      fontSize: "24px",
      fontWeight: "500",
      lineHeight: "28px",
      color: "var(--color-primary)",
    },
    statLabel: { ...g().default.text.bleak, fontSize: 10 },
  };
  class He extends g().default.Component {
    constructor(e) {
      super(e), (this.mounted = !1);
    }
    componentDidMount() {
      this.mounted = !0;
    }
    componentWillUnmount() {
      this.mounted = !1;
    }
    render() {
      const {
          dmsSent: e,
          postsPublished: t,
          postsScheduled: s,
          insightsCreated: a,
        } = this.props,
        { nFollowers: n, uFollowers: o } = this.state;
      return e || t || s || a || n || o
        ? Glamor.createElement(
            "div",
            { css: [g().default.row, Ve.root] },
            Glamor.createElement(
              "div",
              { css: Ve.title },
              "Some of your stats with Inssist:"
            ),
            this._renderStat("DMs Sent", e),
            this._renderStat("Published Posts", t),
            this._renderStat("Scheduled Posts", s),
            this._renderStat("Insights", a),
            this._renderStat("Unfollowers", o),
            this._renderStat("New Followers", n, "+")
          )
        : null;
    }
    _renderStat(e, t, s) {
      return t
        ? Glamor.createElement(
            "div",
            { css: [g().default.column, Ve.stat] },
            Glamor.createElement("div", { css: Ve.statValue }, s, t || 0),
            Glamor.createElement("div", { css: Ve.statLabel }, e)
          )
        : null;
    }
  }
  var ze = v().influx((e) => ({
    hasPro: true,
    userId: e.authStatus.userId,
    dmsSent: e.billing.trial.dmsSent,
    postsPublished:
      e.billing.trial.postsPublished + e.billing.trial.storiesPublished,
    insightsCreated: e.billing.trial.insights || 0,
    postsScheduled: e.billing.trial.schedule || 0,
  }))(He);
  g(), p(), N(), v(), P(), y(), m();
  const We = {
    fsamLink: g().default.clickable,
    coupon: {
      padding: "0px 3px 0.5px 4px",
      color: g().default.color.textNormal,
      border: `1px solid ${g().default.color.textActionable}`,
      borderRadius: 3,
      fontFamily: g().default.font.monospace,
      fontWeight: 600,
      letterSpacing: "1px",
    },
  };
  class $e extends g().default.Component {
    constructor(...e) {
      var t;
      return (
        (t = super(...e)),
        (this._onLoginClick = () => {
          v().transaction((e) => {
            (e.billing.snapshot.panel = "form"),
              (e.billing.snapshot.accountScreen = "login");
          });
        }),
        (this._onLogoutClick = () => {
          v().transaction((e) => {
            (e.billing.snapshot.panel = "form"),
              (e.billing.snapshot.accountScreen = "logout-confirm"),
              (e.billing.account.email = null),
              (e.billing.account.token = null);
          });
        }),
        (this._onManageAccountClick = () => {
          v().transaction((e) => {
            (e.billing.snapshot.panel = "form"),
              (e.billing.snapshot.accountScreen = "manage-account");
          });
        }),
        (this._onFsamClick = () => {
          Ge.onFsamClick();
        }),
        (this._onActionClick = (e) => {
          m().gaController.sendEvent(
            "user",
            `billing:storefront-plan-click-${e.id}`
          ),
            chrome.runtime.sendMessage(
              { name: "update-fspring-status" },
              () => {
                setTimeout(() => {
                  var t, s;
                  const { billing: a } = this.props;
                  "active" ===
                    (null === (t = a.subscriptions) ||
                    void 0 === t ||
                    null === (s = t["inssist-pro-monthly"]) ||
                    void 0 === s
                      ? void 0
                      : s.state) ||
                    true ||
                    ("inssist-pro-lifetime" === e.id &&
                      true) ||
                    this._kickOffPurchaseFlow(e);
                }, 250);
              }
            );
        }),
        (this._kickOffPurchaseFlow = (e) => {
          var t;
          (null === (t = this.props.billing.purchasingPlan) || void 0 === t
            ? void 0
            : t.id) === e.id
            ? v().transaction((e) => {
                e.billing.purchasingPlan = null;
              })
            : y().stateProxy.isLoggedIn()
            ? v().transaction((t) => {
                t.billing.purchasingPlan = { id: e.id };
              })
            : v().transaction((t) => {
                (t.billing.selectedPlan = {
                  id: e.id,
                  type: e.type,
                  icon: e.icon,
                  label: e.label,
                  period: e.period,
                  price: e.price,
                }),
                  (t.billing.snapshot.panel = "form"),
                  (t.billing.snapshot.accountScreen = "auth");
              });
        }),
        t
      );
    }
    componentDidMount() {
      this._updatePricing();
    }
    async _updatePricing() {
      Ge.updatePricing();
    }
    render() {
      const e = this._constructPlans(),
        t = this._constructStatus(),
        s = this._constructCurrencies(),
        a = this._constructActions();
      return Glamor.createElement(p().default.BillingStorefront, {
        title: this._renderTitle(),
        plans: e,
        status: t,
        currencies: s,
        onCurrencyChange: this._onCurrencyChange,
        actions: a,
      });
    }
    _renderTitle() {
      return Glamor.createElement(
        "div",
        null,
        "Unlock all features with a ",
        Glamor.createElement("strong", null, "PRO Subscription"),
        " or a ",
        Glamor.createElement("strong", null, "Life-Time Deal"),
        Glamor.createElement("br", null)
      );
    }
    _constructStatus() {
      const { hasProPromocode: e, hasProPaid: t, authStatus: s } = this.props;
      if (e) {
        return {
          title: "PROMOCODE ACTIVATED",
          text: `A promocode has been activated for your Instagram @${
            (null == s ? void 0 : s.username) || "account"
          } 🤗. Enjoy all features!`,
          ok: !0,
        };
      }
      if (t)
        return {
          title: "PRO ACTIVATED 🏅",
          text: Glamor.createElement(
            "div",
            null,
            "All advanced features unlocked! You can manage your orders at ",
            Glamor.createElement(
              "a",
              { style: We.fsamLink, onClick: this._onFsamClick },
              "FastSpring Account Portal"
            )
          ),
          ok: !0,
        };
      const a = this.props.discountAvailableTill;
      return -1 !== a && Date.now() < a
        ? {
            icon:
              "day" === this.state.theme
                ? "igswiss.discount-day"
                : "igswiss.discount-night",
            title: "Discount Available",
            text: Glamor.createElement(
              React.Fragment,
              null,
              Glamor.createElement(g().default.Spacer, { height: "g0h" }),
              Glamor.createElement(
                "div",
                null,
                "Use these codes today to get a discount:"
              ),
              Glamor.createElement(g().default.Spacer, { height: "g1" }),
              Glamor.createElement(
                "div",
                null,
                Glamor.createElement("span", { css: We.coupon }, "INX2"),
                " — ",
                Glamor.createElement("b", null, "50%"),
                " off for the first month."
              ),
              Glamor.createElement(g().default.Spacer, { height: "g1" }),
              Glamor.createElement(
                "div",
                null,
                Glamor.createElement("span", { css: We.coupon }, "MTZ8"),
                " — ",
                Glamor.createElement("b", null, "15%"),
                " off for LIFETIME and INFINITE."
              ),
              Glamor.createElement(g().default.Spacer, { height: "g1h" }),
              Glamor.createElement(
                "div",
                { css: { color: g().default.color.textBleak } },
                "Click “Enter Promotional Code” during payment to enter coupon."
              )
            ),
          }
        : null;
    }
    _constructCurrencies() {
      const { billing: e } = this.props;
      if (!e.countryIso || "US" === e.countryIso) return null;
      const t =
        "default" === e.snapshot.checkoutCurrency
          ? "US"
          : this.props.billing.countryIso;
      return "US" !== t &&
        "USD" === this._getPriceCurrency("inssist-pro-monthly", t) &&
        this._getPriceValue("inssist-pro-monthly", t) >
          this._getPriceValue("inssist-pro-monthly", "US") &&
        "USD" === this._getPriceCurrency("inssist-pro-lifetime", t) &&
        this._getPriceValue("inssist-pro-lifetime", t) >
          this._getPriceValue("inssist-pro-lifetime", "US") &&
        "USD" === this._getPriceCurrency("inssist-pro-infinite", t) &&
        this._getPriceValue("inssist-pro-infinite", t) >
          this._getPriceValue("inssist-pro-infinite", "US")
        ? null
        : [
            {
              label: "Pay in: Local Currency",
              selected: "US" !== t,
              checkoutCurrency: "local",
              countryIso: t,
            },
            {
              label: "Pay in: USD",
              selected: "US" === t,
              checkoutCurrency: "default",
              countryIso: t,
            },
          ];
    }
    _onCurrencyChange(e) {
      v().transaction((t) => {
        t.billing.snapshot.checkoutCurrency = e.checkoutCurrency;
      });
    }
    _constructActions() {
      const { billing: e } = this.props;
      return e.account.token
        ? {
            content: e.account.email
              ? Glamor.createElement(
                  "div",
                  null,
                  Glamor.createElement("strong", null, e.account.email)
                )
              : Glamor.createElement(
                  "div",
                  null,
                  "You are signed in to Inssist"
                ),
            buttons: [
              { label: "MANAGE ACCOUNT", onClick: this._onManageAccountClick },
              { label: "LOGOUT", onClick: this._onLogoutClick },
            ],
            color: g().default.color.positive,
          }
        : {
            content: Glamor.createElement(
              "div",
              null,
              "Already have an account?"
            ),
            buttons: [
              { label: "LOGIN TO RECOVER PRO", onClick: this._onLoginClick },
            ],
            color: g().default.color.iconPassive,
          };
    }
    _getPrice(e, t) {
      const { billing: s } = this.props;
      if (!e) return null;
      t || (t = "US");
      const a = (e, t, s) =>
        e && e[t]
          ? e[t][s]
            ? { ...e[t][s], countryIso: s }
            : e[t].pricing && e[t].pricing[s]
            ? { ...e[t].pricing[s], countryIso: s }
            : null
          : null;
      return ((e) => {
        if (!e) return null;
        const t = N().utils.getIntegralNumberPart(e.price),
          s = 100 * N().utils.getFractalNumberPart(e.price);
        return {
          currency: e.currency,
          integral: t,
          fractal: 0 === s ? null : s,
        };
      })(
        a(s.pricing, e, t) ||
          a(s.pricing, e, "US") ||
          a(P().env.options.billingPlans, e, t) ||
          a(P().env.options.billingPlans, e, "US")
      );
    }
    _getPriceValue(e, t) {
      const s = this._getPrice(e, t);
      return s ? s.integral + s.fractal / 100 : null;
    }
    _getPriceCurrency(e, t) {
      const s = this._getPrice(e, t);
      return s ? s.currency : null;
    }
    _constructPlans() {
      var e, t, s, a, n;
      const { billing: o, authStatus: i } = this.props,
        r = "default" === o.snapshot.checkoutCurrency ? "US" : o.countryIso,
        l = true,
        c = true,
        d = true,
        u =
          "active" ===
          (null === (e = o.subscriptions) ||
          void 0 === e ||
          null === (t = e["inssist-pro-monthly"]) ||
          void 0 === t
            ? void 0
            : t.state),
        h = i.username;
      return [
        {
          id: "inssist-pro-monthly",
          type: "subscription",
          price: this._getPrice("inssist-pro-monthly", r),
          period: "/ month",
          isSelected: l,
          icon: { name: "billing-storefront.sub" },
          label: "MONTHLY",
          benefits: [
            "Best for Casual use",
            "Unlimited accounts",
            Glamor.createElement(
              "span",
              null,
              "Paid monthly,",
              Glamor.createElement("br", null),
              "cancel any time"
            ),
          ],
          action: {
            label: l ? (u ? "SUBSCRIBED" : "CANCELED") : "SUBSCRIBE",
            disabled: l || d,
            progress:
              "inssist-pro-monthly" ===
              (null === (s = o.purchasingPlan) || void 0 === s ? void 0 : s.id),
            tooltip:
              l && !u
                ? "You have canceled PRO subscription and it will deactivate automatically at the end of the billing period."
                : null,
            onClick: this._onActionClick,
          },
          disabled: !1,
        },
        {
          id: "inssist-pro-lifetime",
          type: "product-username",
          price: this._getPrice("inssist-pro-lifetime", r),
          period: "/ account",
          badge: "POPULAR",
          isSelected: c,
          icon: { name: "billing-storefront.person" },
          label: "LIFETIME",
          benefits: [
            "Best for Creatives",
            Glamor.createElement(
              "div",
              { css: g().default.relative() },
              Glamor.createElement(
                "div",
                { css: g().default.absolute("1 . . -20") },
                Glamor.createElement(g().default.InfoCircle, {
                  mini: !0,
                  tooltip: {
                    text: [
                      "Lifetime plan is purchased once per Instagram account and will remain active for that Instagram account. It can not be transferred or reused with a different Instagram account.",
                      "If you rename your Instagram account, the Lifetime plan will switch to the new name automatically.",
                      "If you'd like to activate Lifetime plan for a different Instagram account, please switch over to that account in Inssist or Instagram before making the purchase.",
                    ],
                  },
                })
              ),
              "Activates for this account, ",
              Glamor.createElement("strong", null, "@", h)
            ),
            "Paid once",
          ],
          action: {
            label: c ? "PURCHASED" : "PURCHASE",
            disabled: c || d || u,
            progress:
              "inssist-pro-lifetime" ===
              (null === (a = o.purchasingPlan) || void 0 === a ? void 0 : a.id),
            tooltip: u
              ? "Please cancel MONTHLY subscription before purchasing LIFETIME plan."
              : null,
            onClick: this._onActionClick,
          },
          disabled: !h,
        },
        {
          id: "inssist-pro-infinite",
          type: "product",
          price: this._getPrice("inssist-pro-infinite", r),
          isUnlimited: !0,
          isSelected: d,
          icon: { name: "billing-storefront.ouroboros" },
          label: "INFINITE",
          benefits: ["Best for Businesses", "Unlimited accounts", "Paid once"],
          action: {
            label: d ? "PURCHASED" : "PURCHASE",
            disabled: d || u,
            progress:
              "inssist-pro-infinite" ===
              (null === (n = o.purchasingPlan) || void 0 === n ? void 0 : n.id),
            tooltip: u
              ? "Please cancel MONTHLY subscription before purchasing INFINITE plan."
              : null,
            onClick: this._onActionClick,
          },
          disabled: !1,
        },
      ];
    }
  }
  var qe = v().influx((e) => ({
    billing: e.billing,
    authStatus: e.authStatus,
    hasProPromocode: y().stateProxy.hasProPromocode(),
    hasProPaid: true,
    discountAvailableTill: e.billing.discount.availableTill,
  }))(g().default.theme.ThemeAware($e));
  g(), p(), P();
  class je extends g().default.Component {
    render() {
      const e = P().env.options.billingProFeaturesTable;
      return Glamor.createElement(p().default.BillingFeaturesTable, {
        features: e,
      });
    }
  }
  g(), v(), P(), y();
  const Ye = {
    permissionPrompt: {
      ...g().default.absolute("0 0 0 0 1"),
      ...g().default.column,
      ...g().default.justifyContent.center,
      ...g().default.alignItems.center,
      ...g().default.noDataGradient,
    },
    permissionText: {
      ...g().default.column,
      ...g().default.alignItems.center,
      maxWidth: 300,
      backgroundColor: g().default.color.bgLight1,
      border: g().default.border.light,
      textAlign: "center",
      ...g().default.borderRadius.r4,
      ...g().default.padding("g3 g3 g3 g3"),
    },
    fsForm: (e) => ({
      ...g().default.absolute("0 0 0 0 1"),
      ...g().default.transition.slow,
      opacity: e.loaded ? 1 : 0,
    }),
  };
  g().default.SvgIcon.registerSvgIcons([
    '<symbol id="billing-checkout-mediator.unlock" viewBox="0 0 50 49.999"><g transform="translate(0 -0.003)"><g transform="translate(41.21 11.82)"><path d="M430.624,121.817a1.468,1.468,0,0,0-1.966-.655l-5.859,2.93a1.465,1.465,0,1,0,1.31,2.621l5.859-2.93A1.465,1.465,0,0,0,430.624,121.817Z" transform="translate(-421.989 -121.008)" fill="#74be86"/></g><g transform="translate(41.21 26.467)"><path d="M429.969,274.082l-5.859-2.93a1.465,1.465,0,0,0-1.31,2.621l5.859,2.93a1.465,1.465,0,0,0,1.31-2.621Z" transform="translate(-421.989 -270.997)" fill="#74be86"/></g><g transform="translate(0 0.003)"><path d="M33.691,23.636H11.719V16.116a7.324,7.324,0,0,1,14.648,0v2.93a1.464,1.464,0,0,0,1.465,1.465h5.859a1.464,1.464,0,0,0,1.465-1.465v-2.93a16.113,16.113,0,1,0-32.226,0v7.789A4.388,4.388,0,0,0,0,28.03V45.608A4.4,4.4,0,0,0,4.394,50h29.3a4.4,4.4,0,0,0,4.394-4.394V28.03A4.4,4.4,0,0,0,33.691,23.636ZM20.508,38.014v4.664a1.465,1.465,0,1,1-2.93,0V38.014a4.394,4.394,0,1,1,2.93,0Z" transform="translate(0 -0.003)" fill="#74be86"/></g><g transform="translate(41.21 20.608)"><path d="M429.319,211H423.46a1.465,1.465,0,0,0,0,2.93h5.859a1.465,1.465,0,0,0,0-2.93Z" transform="translate(-421.995 -211)" fill="#74be86"/></g></g></symbol>',
  ]);
  class Ze extends g().default.Component {
    constructor(e) {
      super(e),
        (this._onLoad = () => {
          this.setState({ loaded: !0 });
        }),
        (this._onCloseClick = () => {
          v().transaction((e) => {
            e.billing.purchasingPlan = null;
          });
        }),
        (this.state = { granted: null });
    }
    render() {
      const { purchasingPlan: e } = this.props.billing;
      if (!e) return null;
      if (null === this.state.granted)
        return (
          chrome.permissions.contains(
            { origins: ["*://*.onfastspring.com/*"] },
            (e) => {
              this.setState({ granted: e });
            }
          ),
          null
        );
      if (!this.state.granted)
        return (
          chrome.permissions.request(
            { origins: ["*://*.onfastspring.com/*"] },
            (e) => {
              e
                ? this.setState({ granted: !0 })
                : v().transaction((e) => {
                    e.billing.purchasingPlan = null;
                  });
            }
          ),
          Glamor.createElement(
            "div",
            { css: Ye.permissionPrompt },
            Glamor.createElement(
              "div",
              { css: Ye.permissionText },
              Glamor.createElement(g().default.SvgIcon, {
                name: "billing-checkout-mediator.unlock",
              }),
              Glamor.createElement(g().default.Spacer, { height: "g3" }),
              Glamor.createElement(
                "div",
                null,
                "INSSIST needs your permission to launch a secure billing form powered by FastSpring."
              )
            )
          )
        );
      const t = P().env.options.checkoutContainer,
        s = this._fetchFSpringConfig(),
        a = `${t}/fspring/${this.state.theme}?config=${s}`;
      Glamor.createElement("iframe", {
        src: a,
        style: { border: "none", width: "100%", height: "100%" },
        className: "dnd-immune",
        onLoad: this._onLoad,
      });
      return Glamor.createElement(
        "div",
        { css: Ye.fsForm(this.state) },
        Glamor.createElement("iframe", {
          src: a,
          style: { border: "none", width: "100%", height: "100%" },
          className: "dnd-immune",
          onLoad: this._onLoad,
        }),
        Glamor.createElement(g().default.CloseButton, {
          style: g().default.absolute("8 8 . . 2"),
          onClick: this._onCloseClick,
        })
      );
    }
    _fetchFSpringConfig() {
      const e = this.props.billing,
        t = {
          plan: e.purchasingPlan.id,
          email: e.account.email,
          token: e.account.token,
          hasPro: true,
          countryIso:
            "default" === e.snapshot.checkoutCurrency ? "US" : e.countryIso,
          storefront: P().env.options.storefront,
          apiUrl: P().env.options.apiUrl,
        };
      return (
        "inssist-pro-lifetime" === t.plan &&
          (t.tags = {
            accounts: [
              {
                id: v().model.state.authStatus.userId,
                name: v().model.state.authStatus.username,
              },
            ],
          }),
        btoa(JSON.stringify(t))
      );
    }
  }
  var Ke = v().influx((e) => ({ billing: e.billing }))(
    g().default.theme.ThemeAware(Ze)
  );
  class Qe extends g().default.Component {
    constructor(...e) {
      var t;
      return (
        (t = super(...e)),
        (this._onCloseClick = () => {
          v().transaction((e) => {
            e.sidebar.isOpen = !1;
          });
        }),
        (this._onBillingFaqClick = () => {
          m().gaController.sendEvent("user", "billing:faq-click"),
            chrome.tabs.create({ url: f().common.faqBillingUrl });
        }),
        t
      );
    }
    componentDidMount() {
      Date.now() - Qe.lastUpdateTs < 5e3 ||
        ((Qe.lastUpdateTs = Date.now()),
        setTimeout(
          () => chrome.runtime.sendMessage({ name: "update-pro" }),
          250
        ));
    }
    render() {
      const { billing: e } = this.props;
      return Glamor.createElement(p().default.BillingPanel, {
        form: this._getFormSection(),
        storefront: this._getStorefrontSection(),
        checkout: this._getCheckoutSection(),
        clients: this._getClientsSection(),
        stats: this._getStatsSection(),
        features: this._getFeaturesSection(),
        onCloseClick: this._onCloseClick,
        onBillingFaqClick: this._onBillingFaqClick,
        loading: e.snapshot.loading,
      });
    }
    _getFormSection() {
      const { panel: e, accountScreen: t } = this.props.billing.snapshot;
      return "form" === e && t ? Glamor.createElement(Ne, null) : null;
    }
    _getStorefrontSection() {
      const { panel: e, accountScreen: t } = this.props.billing.snapshot;
      return "form" === e && t ? null : Glamor.createElement(qe, null);
    }
    _getCheckoutSection() {
      const { purchasingPlan: e } = this.props.billing;
      return e ? Glamor.createElement(Ke, null) : null;
    }
    _getClientsSection() {
      return Glamor.createElement(p().default.BillingClients, null);
    }
    _getStatsSection() {
      return Glamor.createElement(ze, null);
    }
    _getFeaturesSection() {
      return Glamor.createElement(je, null);
    }
  }
  var Je = v().influx((e) => ({ billing: e.billing }))(Qe);
  g(), p(), v();
  class Xe extends g().default.Component {
    constructor(...e) {
      var t;
      return (
        (t = super(...e)),
        (this._onActionBlockCloseClick = () => {
          v().transaction((e) => {
            e.billing.verificationCodeEmail = null;
          });
        }),
        t
      );
    }
    render() {
      const { email: e } = this.props,
        t = Boolean(e),
        s = [
          Glamor.createElement(
            "div",
            null,
            "We sent a verification code to ",
            Glamor.createElement("b", null, e),
            " from ",
            Glamor.createElement("b", null, "Inssist, no-reply@slashed.io")
          ),
          Glamor.createElement(
            "div",
            null,
            "Sometimes it may get into a spam folder. If a code is not delivered in 5 minutes, please double check your email address or reach out to us at ",
            "inssist@slashed.io"
          ),
        ];
      return Glamor.createElement(
        p().default.SnackbarItem,
        { id: "billing-code-mediator", show: t },
        Glamor.createElement(g().default.InfoCard, {
          markerColor: g().default.color.positive,
          title: "Your Code is Emailed",
          content: s,
          onClose: this._onActionBlockCloseClick,
        })
      );
    }
  }
  var et = v().influx((e) => ({ email: e.billing.verificationCodeEmail }))(Xe);
  g(), p(), m(), v();
  class tt extends g().default.Component {
    constructor(...e) {
      var t;
      return (
        (t = super(...e)),
        (this._onCloseClick = () => {
          this._close(),
            m().gaController.sendEvent(
              "user",
              "billing:discount-dismiss-click"
            );
        }),
        (this._onGoToBillingClick = () => {
          this._close(),
            m().gaController.sendEvent(
              "user",
              "billing:discount-go-to-billing-click"
            ),
            Ge.openBilling("discount");
        }),
        t
      );
    }
    render() {
      return Glamor.createElement(
        p().default.SnackbarItem,
        {
          id: "billing-discount-snackbar-card-mediator",
          show: this.props.show,
        },
        Glamor.createElement(g().default.InfoCard, {
          markerColor: g().default.color.link,
          title: "Discount Available",
          content: this._renderContent(),
          onClose: this._onCloseClick,
        })
      );
    }
    _renderContent() {
      return Glamor.createElement(
        React.Fragment,
        null,
        Glamor.createElement(
          "div",
          null,
          "Get ",
          Glamor.createElement("b", null, "50%"),
          " off the first month of Inssist PRO Monthly",
          Glamor.createElement("br", null),
          "or ",
          Glamor.createElement("b", null, "15%"),
          " off the Infinite or Lifetime plan purchase."
        ),
        Glamor.createElement(g().default.Spacer, { height: "g2" }),
        Glamor.createElement(
          "div",
          { css: [g().default.row, g().default.alignItems.center] },
          Glamor.createElement(g().default.ActionButton, {
            label: "USE DISCOUNT",
            style: { fontSize: 14 },
            onClick: this._onGoToBillingClick,
          }),
          Glamor.createElement(g().default.Spacer, { width: "g3" }),
          Glamor.createElement(g().default.LinkButton, {
            label: "ABOUT PRO",
            onClick: this._onGoToBillingClick,
          })
        )
      );
    }
    _close() {
      v().transaction((e) => {
        e.billing.discount.showSnackbarMessage = !1;
      });
    }
  }
  var st = v().influx((e) => {
    const t = e.sidebar.isOpen && "tab-billing" === e.sidebar.selectedTabId;
    return { show: e.billing.discount.showSnackbarMessage && !t };
  })(tt);
  S(), g(), p(), g(), p(), P(), f(), m(), y(), v();
  class at extends g().default.Component {
    constructor(...e) {
      var t;
      return (
        (t = super(...e)),
        (this._onFaqClick = () => {
          m().gaController.sendEvent("user", "billing:faq-click"),
            chrome.tabs.create({ url: f().common.faqBillingUrl });
        }),
        t
      );
    }
    render() {
      return Glamor.createElement(p().default.BillingPurchase, {
        expanded: this.props.expanded,
        purchased: this.props.hasProPaid,
        withShadow: this.props.withShadow,
        hidePrice: this.props.hidePrice,
        hideDisclaimer: this.props.hideDisclaimer,
        hideFaq: this.props.hideFaq,
        header: this._getHeader(),
        features: this._getFeatures(),
        footer: this._getFooter(),
        onFaqClick: this._onFaqClick,
      });
    }
    _getHeader() {
      return {
        title: "Upgrade to PRO",
        description: Glamor.createElement(
          g().default.Fragment,
          null,
          "A ",
          Glamor.createElement("b", null, "trial"),
          " period of this feature has expired. Please consider upgrading to PRO to continue using ",
          this.props.featureTitle,
          "."
        ),
      };
    }
    _getFeatures() {
      return P().env.options.billingProFeaturesList.map((e) => ({
        id: e.id,
        icon: e.icon,
        title: e.title,
        description: e.description,
      }));
    }
    _getFooter() {
      return {
        button: {
          label: "ACTIVATE PRO",
          onClick: this.props.onActivateProClick,
        },
      };
    }
  }
  at.defaultProps = {
    expanded: !1,
    widthShadow: !0,
    hidePrice: !0,
    hideDisclaimer: !0,
    hideFaq: !0,
  };
  var nt = v().influx((e) => ({
    hasPro: true,
    hasProPaid: true,
  }))(at);
  class ot extends g().default.Component {
    constructor(e) {
      super(e),
        (this._onActivateProClick = () => {
          const e = this.props.feature || null;
          Ge.openBilling(e);
        }),
        (this.state = { id: `up-${S().generate()}` });
    }
    componentDidMount() {}
    componentWillUnmount() {
      clearInterval(this.reloadIfHidden);
    }
    render() {
      return Glamor.createElement(p().default.UpsellOverlay, {
        style: this.props.style,
        id: this.state.id,
        show: this.props.show,
        noArt: this.props.noArt,
        onOverlayClick: this.props.onOverlayClick,
        content: this._renderContent(),
      });
    }
    _isVisible() {
      const e = document.getElementById(this.state.id);
      return (
        e &&
        null !== e.offsetParent &&
        "visible" === window.getComputedStyle(e).visibility
      );
    }
    _renderContent() {
      const e =
        {
          analytics: "Analytics",
          bulk: "Post Assistant",
          schedule: "Post Assistant",
          "cover-assist": "Cover Assistant",
          dm: "Ghost Mode",
          insights: "Analytics",
          "music-assist": "Music Assistant",
          "video-stories": "Video Stories",
          "ghost-story-view": "Ghost Story View",
        }[this.props.feature] || "INSSIST";
      return Glamor.createElement(
        "div",
        { css: { width: "100%", maxWidth: 400 } },
        Glamor.createElement(nt, {
          featureTitle: e,
          onActivateProClick: this._onActivateProClick,
        })
      );
    }
  }
  g(), p(), v(), C(), m(), y();
  const it = {
    tip: { "&:not(:last-child)": { marginBottom: g().default.space.g3 } },
  };
  class rt extends g().default.Component {
    constructor(e) {
      super(e),
        (this._onScheduleTipOkClick = () => {
          y().actions.acknowledge.dispatch("scheduleTip"),
            m().gaController.sendEvent("user", "tips:schedule-tip-ok-click");
        }),
        (this._onScheduleTipShowClick = () => {
          y().actions.acknowledge.dispatch("scheduleTip"),
            m().gaController.sendEvent("user", "tips:schedule-tip-show-click"),
            v().transaction((e) => {
              (e.sidebar.selectedTabId = "tab-scheduling"),
                (e.sidebar.isOpen = !0);
            });
        }),
        (this._onStoryLimitationsOkClick = () => {
          y().actions.acknowledge.dispatch("storyLimitations"),
            m().gaController.sendEvent(
              "user",
              "tips:story-limitations-ok-click"
            );
        }),
        (this._onIframePathChange = (e) => {
          let t;
          (t = e.startsWith("/create/story")
            ? "create-story"
            : e.startsWith("/create/")
            ? "create-post"
            : null),
            this.setState({ pageType: t });
        }),
        (this.state = { pageType: null });
    }
    componentDidMount() {
      C().iframeBus.on("ig.path-change", this._onIframePathChange);
    }
    componentWillUnmount() {
      C().iframeBus.off("ig.path-change", this._onIframePathChange);
    }
    render() {
      const e = [],
        t = this.state.pageType,
        s = this.props.acknowledged;
      return (
        "create-post" === t
          ? (e.push({ key: "crop-tip", content: this._renderCropTip() }),
            s.scheduleTip ||
              e.push({
                key: "schedule-tip",
                content: this._renderScheduleTip(),
              }))
          : "create-story" === t &&
            (e.push({ key: "crop-tip", content: this._renderCropTip() }),
            s.story ||
              e.push({
                key: "story-limitations",
                content: this._renderStoryLimitations(),
              })),
        e.length
          ? Glamor.createElement(
              "div",
              null,
              e.map((e) =>
                Glamor.createElement(
                  "div",
                  { css: it.tip, key: e.key },
                  e.content
                )
              )
            )
          : null
      );
    }
    _renderStoryLimitations() {
      return Glamor.createElement(p().default.Tip, {
        content: Glamor.createElement(
          g().default.Fragment,
          null,
          Glamor.createElement("b", null, "Limitations:"),
          " When posting stories a few features such as tagging, gifs and mentions on videos are not implemented in the browser version of Instagram website and thus not available on the app."
        ),
        buttons: [
          { label: "OK, GOT IT", onClick: this._onStoryLimitationsOkClick },
        ],
      });
    }
    _renderCropTip() {
      return Glamor.createElement(p().default.Tip, {
        icon: "bulb",
        content: [
          Glamor.createElement(
            g().default.Fragment,
            null,
            Glamor.createElement("b", null, "Tips:"),
            " Recommended Instagram photo / video sizes and formats can be found in ",
            Glamor.createElement(
              "a",
              {
                href: "https://inssist.com/knowledge-base/instagram-image-size-cheat-sheet",
                target: "_blank",
              },
              "our guide"
            ),
            "."
          ),
          Glamor.createElement(
            g().default.Fragment,
            null,
            "You can pre-edit, crop or scale your photo with a free ",
            Glamor.createElement(
              "a",
              { href: "https://www.iloveimg.com/crop-image", target: "_blank" },
              "iloveimg"
            ),
            " tool, and your video with ",
            Glamor.createElement(
              "a",
              { href: "https://ezgif.com/resize-video", target: "_blank" },
              "ezgif"
            ),
            " tool."
          ),
        ],
      });
    }
    _renderScheduleTip() {
      return Glamor.createElement(p().default.Tip, {
        icon: "bulb",
        content: [
          Glamor.createElement(
            g().default.Fragment,
            null,
            Glamor.createElement("b", null, "Tips:"),
            " A few features such as posting carousels and editing published posts are not available on Instagram Web client."
          ),
          Glamor.createElement(
            g().default.Fragment,
            null,
            "You can post carousels, edit posts and schedule posts for later with Post Assistant module on the left."
          ),
        ],
        buttons: [
          { label: "OK, GOT IT", onClick: this._onScheduleTipOkClick },
          { label: "SHOW ME, GURU", onClick: this._onScheduleTipShowClick },
        ],
      });
    }
  }
  var lt = v().influx((e) => ({
    acknowledged: {
      story: -1 !== e.acknowledged.storyLimitations,
      scheduleTip: -1 !== e.acknowledged.scheduleTip,
    },
  }))(rt);
  O(),
    g(),
    p(),
    v(),
    O(),
    g(),
    p(),
    v(),
    y(),
    g(),
    p(),
    v(),
    m(),
    O(),
    g(),
    p(),
    f(),
    v(),
    y(),
    m(),
    O();
  class ct extends g().default.Component {
    constructor(...e) {
      var t;
      return (
        (t = super(...e)),
        (this._onGoToTagClick = () => {
          const e = f().ig.hashtag.url(this.props.tag.name);
          window.electron
            ? window.open(e, `hashtag-details.${this.props.tag.name}`)
            : chrome.tabs.create({ url: e, active: !0 });
        }),
        (this._onRefreshTagClick = () => {
          m().gaController.sendEvent("user", "tag-assist:refresh-tag-click"),
            Te.refreshTag(this.props.tag.name);
        }),
        (this._onUpgradeClick = () => {
          Ge.openBilling("tag-assist");
        }),
        (this._onUpgradeCancelClick = () => {
          v().transaction((e) => {
            e.tagAssist.tagMetricsUpsellDismissed = !0;
          });
        }),
        t
      );
    }
    render() {
      return Glamor.createElement(p().default.TagStatsPopup, {
        tag: this.props.tag,
        accountStats: this.props.accountStats,
        tiers: this.props.tiers,
        markerDy: this.props.markerDy,
        markerAtLeft: this.props.markerAtLeft,
        showRefreshButton: this.props.showRefreshButton,
        showUpgradeToPro: !this.props.hasPro,
        onGoToTagClick: this._onGoToTagClick,
        onRefreshTagClick: this._onRefreshTagClick,
        onUpgradeClick: this._onUpgradeClick,
        onUpgradeCancelClick: this._onUpgradeCancelClick,
      });
    }
  }
  var dt = v().influx((e) => ({
    tiers: e.tagAssist.ladderConfig.tiers,
    hasPro: true,
    accountStats: O().default.getAccountStats(),
    showRefreshButton: e.experiments.enabled,
  }))(ct);
  const { hasEngagementData: ut, engagementToBgColor: ht } =
    p().default.tagUtils;
  class mt extends g().default.Component {
    constructor(...e) {
      var t;
      return (
        (t = super(...e)),
        (this._constructStatsPopup = ({ markerDy: e, markerAtLeft: t }) =>
          Glamor.createElement(dt, {
            tag: this.props.tag,
            markerDy: e,
            markerAtLeft: t,
          })),
        (this._onClick = () => {
          if (
            "sidebar" !== this.props.placement ||
            "collections" !== this.props.selectedTabId
          )
            Te.registerUsage(),
              Te.toggleTag(this.props.tag.name, this.props.placement),
              m().gaController.sendEvent("user", "tag-assist:tag-click");
          else {
            if (ut(this.props.tag)) return;
            Te.checkCollectionTags([this.props.tag.name], { useRedis: !1 });
          }
        }),
        t
      );
    }
    render() {
      const e = !!this.props.tag.lastScanOn;
      return Glamor.createElement(p().default.TagPill, {
        name: this.props.tag.name,
        color: this._getColor(),
        loading: this._isLoading(),
        selected: this._isSelected(),
        banned: this.props.tag.isBanned,
        flagged: this.props.tag.isFlagged,
        clickable: this._isClickable(),
        renderStatsPopup: e ? this._constructStatsPopup : null,
        onClick: this._onClick,
      });
    }
    _isClickable() {
      return (
        "sidebar" !== this.props.placement ||
        "collections" !== this.props.selectedTabId ||
        !ut(this.props.tag)
      );
    }
    _getColor() {
      return this.props.noColor
        ? null
        : ht(this.props.tag, this.props.accountStats, this.props.tiers);
    }
    _isLoading() {
      return (
        "collections" === this.props.selectedTabId
          ? this.props.collectionsLoadingTags
          : this.props.ladderLoadingTags
      ).includes(this.props.tag.name);
    }
    _isSelected() {
      return (
        !this.props.disableSelect &&
        this.props.selectedTags.includes(this.props.tag.name)
      );
    }
  }
  var gt = v().influx((e, t) => ({
    tiers: e.tagAssist.ladderConfig.tiers,
    accountStats: O().default.getAccountStats(),
    selectedTabId: e.tagAssist.selectedTabId,
    selectedTags: O().default.getSelectedTags(t.placement),
    ladderLoadingTags: e.tagAssist.ladderLoadingTags,
    collectionsLoadingTags: e.tagAssist.collectionsLoadingTags,
  }))(mt);
  class pt extends g().default.Component {
    constructor(...e) {
      var t;
      return (
        (t = super(...e)),
        (this.scuIgnoreFields = ["tagData"]),
        (this._constructTag = (e, t) => {
          let s = this.props.tagData[e] || null;
          return (
            (!s || (!this.props.hasPro && this.props.upsellDismissed)) &&
              (s = { name: e }),
            {
              id: e,
              element: Glamor.createElement(gt, {
                tag: s,
                noColor: !this.props.hasPro,
                placement: this.props.placement,
              }),
            }
          );
        }),
        t
      );
    }
    render() {
      return Glamor.createElement(p().default.TagAssistList, {
        label: this.props.label,
        tags: this.props.tagNames.map(this._constructTag),
        noTagsMessage: "No tags found",
      });
    }
  }
  var ft = v().influx((e) => ({
    hasPro: true,
    upsellDismissed: e.tagAssist.tagMetricsUpsellDismissed,
  }))(pt);
  g(), p(), v(), y(), O(), g(), p(), v(), O();
  const {
    hasEngagementData: vt,
    calcEngagement: Ct,
    calcRate: yt,
  } = p().default.tagUtils;
  class bt extends g().default.Component {
    constructor(e) {
      super(e),
        (this.scuIgnoreFields = ["tagData"]),
        (this._renderTagPill = ({ name: e }) =>
          Glamor.createElement(gt, {
            tag: this._getTag(e),
            placement: this.props.placement,
          })),
        (this._onEngagementSortClick = () => {
          v().transaction((e) => {
            const t =
              "summary" === this.props.placement
                ? "summaryEngagementSort"
                : "ladderEngagementSort";
            e.tagAssist[t]
              ? "descending" === e.tagAssist[t]
                ? (e.tagAssist[t] = "ascending")
                : (e.tagAssist[t] = null)
              : (e.tagAssist[t] = "descending");
          });
        }),
        (this._onPostCountSortClick = () => {
          v().transaction((e) => {
            const t =
              "summary" === this.props.placement
                ? "summaryPostCountSort"
                : "ladderPostCountSort";
            e.tagAssist[t]
              ? "descending" === e.tagAssist[t]
                ? (e.tagAssist[t] = "ascending")
                : (e.tagAssist[t] = null)
              : (e.tagAssist[t] = "descending");
          });
        }),
        (this._onSkipChange = (e) => {
          this.setState({ skip: e });
        }),
        (this._onCheckClick = (e) => {
          Te.checkTags([e]);
        }),
        (this._onCheckAllClick = () => {
          const e = this._getPageTags().map((e) => e.name);
          Te.checkTags(e);
        }),
        (this._onStopAllClick = () => {
          const e = this._getPageTags().map((e) => e.name);
          Te.stopTags(e);
        }),
        (this.tags = []),
        (this.state = { skip: 0 });
    }
    render() {
      return (
        (this.tags = this._getSortedTags()),
        Glamor.createElement(p().default.TagAssistTable, {
          skip: this.state.skip,
          pageSize: this._getPageSize(),
          engagementSort: this.props.engagementSort,
          renderTagPill: this._renderTagPill,
          tags: this.tags,
          onEngagementSortClick: this.props.isNoDataGroup
            ? null
            : this._onEngagementSortClick,
          onPostCountSortClick: this.props.isNoDataGroup
            ? null
            : this._onPostCountSortClick,
          showCheckAll: this._shouldShowCheckAll(),
          showStopAll: this._shouldShowStopAll(),
          onSkipChange: this._onSkipChange,
          onCheckClick: this._onCheckClick,
          onCheckAllClick: this._onCheckAllClick,
          onStopAllClick: this._onStopAllClick,
        })
      );
    }
    _getPageSize() {
      return "summary" === this.props.placement
        ? 100
        : window.innerHeight < 890 && "sidebar" === this.props.placement
        ? 8
        : 10;
    }
    _getSortedTags() {
      const e = this.props.engagementSort,
        t = this.props.postCountSort,
        s = Ct(this.props.accountStats);
      return this.props.tagNames
        .map((e) => {
          const t = this._getTag(e),
            a = Ct(t);
          return {
            name: t.name,
            hasData: vt(t),
            banned: t.isBanned,
            flagged: t.isFlagged,
            fetching: this.props.loadingTags.includes(t.name),
            postCount: t.avgPosts,
            engagementRate: yt(a, s),
          };
        })
        .sort((s, a) => {
          if (e) {
            if (!s.hasData && !a.hasData) return null;
            if (s.hasData && !a.hasData) return -1;
            if (!s.hasData && a.hasData) return 1;
            return (
              ("ascending" === e ? 1 : -1) *
              (s.engagementRate - a.engagementRate)
            );
          }
          if (t) {
            return ("ascending" === t ? 1 : -1) * (s.postCount - a.postCount);
          }
          return null;
        });
    }
    _shouldShowCheckAll() {
      if (!this.props.isNoDataGroup) return !1;
      const e = this._getPageTags();
      return (
        !e.some((e) => this.props.loadingTags.includes(e.name)) &&
        e.filter((e) => !this.props.tagData[e.name]).length > 0
      );
    }
    _shouldShowStopAll() {
      if (!this.props.isNoDataGroup) return !1;
      return this._getPageTags().some((e) =>
        this.props.loadingTags.includes(e.name)
      );
    }
    _getPageTags() {
      const e = this.state.skip,
        t = this._getPageSize();
      return this.tags.slice(e, e + t);
    }
    _getTag(e) {
      return this.props.tagData[e] || { name: e };
    }
  }
  var kt = v().influx((e, t) => {
    const s =
      "ladder" === e.tagAssist.selectedTabId &&
      "nodata" === e.tagAssist.selectedGroupId;
    let a, n;
    return (
      s
        ? ((a = null), (n = null))
        : "summary" === t.placement
        ? ((a = e.tagAssist.summaryEngagementSort),
          (n = e.tagAssist.summaryPostCountSort))
        : ((a = e.tagAssist.ladderEngagementSort),
          (n = e.tagAssist.ladderPostCountSort)),
      {
        loadingTags: e.tagAssist.ladderLoadingTags,
        accountStats: O().default.getAccountStats(),
        engagementSort: a,
        postCountSort: n,
        isNoDataGroup: s,
      }
    );
  })(bt);
  class wt extends g().default.Component {
    constructor(...e) {
      var t;
      return (
        (t = super(...e)),
        (this.scuIgnoreFields = ["tagData"]),
        (this._onGroupClick = (e) => {
          v().transaction((t) => {
            t.tagAssist.selectedGroupId = e;
          });
        }),
        t
      );
    }
    render() {
      return Glamor.createElement(p().default.TagAssistLadder, {
        selectedGroupId: this.props.selectedGroupId,
        groups: this._getGroups(),
        content: this._constructContent(),
        blurContent: this._shouldBlurContent(),
        showNotEnoughDataWarning: this._shouldShowNotEnoughDataWarning(),
        onGroupClick: this._onGroupClick,
      });
    }
    _getGroups() {
      return this.props.ladder
        ? [
            this._getGroupLow(),
            this._getGroupMedium(),
            this._getGroupHigh(),
            this._getGroupVHigh(),
            this._getGroupNoData(),
          ]
        : null;
    }
    _constructContent() {
      if (!this.props.ladder) return null;
      const e = this.props.ladder[this.props.selectedGroupId];
      return 0 === e.length
        ? null
        : Glamor.createElement(kt, {
            key: this.props.selectedGroupId,
            tagNames: e,
            tagData: this.props.tagData,
            tagDataKey: this.props.tagDataKey,
            placement: this.props.placement,
          });
    }
    _shouldBlurContent() {
      return !this.props.hasPro;
    }
    _shouldShowNotEnoughDataWarning() {
      if (!this.props.ladder) return !1;
      return this.props.ladder[this.props.selectedGroupId].length < 10;
    }
    _getGroupLow() {
      const e = this._getGroupCount("low");
      return {
        id: "low",
        title: "LOW",
        count: e,
        tooltip: {
          text: [
            Glamor.createElement(
              g().default.Fragment,
              null,
              "Hashtags of this group have a ",
              Glamor.createElement("b", null, "LOW"),
              " engagement comparing to your account."
            ),
            Glamor.createElement(
              g().default.Fragment,
              null,
              "It is quite likely to get ranked among the top posts for these hashtags. Using these hashtags should boost your engagement."
            ),
            !!e &&
              Glamor.createElement(
                g().default.Fragment,
                null,
                "You selected ",
                Glamor.createElement("b", null, e),
                " ",
                1 === e ? "hashtag" : "hashtags",
                " of this group."
              ),
          ],
        },
      };
    }
    _getGroupMedium() {
      const e = this._getGroupCount("medium");
      return {
        id: "medium",
        title: "MEDIUM",
        count: e,
        tooltip: {
          text: [
            Glamor.createElement(
              g().default.Fragment,
              null,
              "Hashtags of this group have a ",
              Glamor.createElement("b", null, "MEDIUM"),
              " engagement comparing to your account."
            ),
            Glamor.createElement(
              g().default.Fragment,
              null,
              "It is possible to get ranked among the top posts for these hashtags. Using these hashtags is optimal for your account. Mix them with low hashtags to get ranked higher among them."
            ),
            !!e &&
              Glamor.createElement(
                g().default.Fragment,
                null,
                "You selected ",
                Glamor.createElement("b", null, e),
                " ",
                1 === e ? "hashtag" : "hashtags",
                " of this group."
              ),
          ],
        },
      };
    }
    _getGroupHigh() {
      const e = this._getGroupCount("high");
      return {
        id: "high",
        title: "HIGH",
        count: e,
        tooltip: {
          text: [
            Glamor.createElement(
              g().default.Fragment,
              null,
              "Hashtags of this group have a ",
              Glamor.createElement("b", null, "HIGH"),
              " engagement comparing to your account."
            ),
            Glamor.createElement(
              g().default.Fragment,
              null,
              "It will be possible to get ranked among the top posts for these hashtags if your post also ranks among the low and medium hashtags."
            ),
            !!e &&
              Glamor.createElement(
                g().default.Fragment,
                null,
                "You selected ",
                Glamor.createElement("b", null, e),
                " ",
                1 === e ? "hashtag" : "hashtags",
                " of this group."
              ),
          ],
        },
      };
    }
    _getGroupVHigh() {
      const e = this._getGroupCount("vhigh");
      return {
        id: "vhigh",
        title: "V.HIGH",
        tooltip: {
          text: [
            Glamor.createElement(
              g().default.Fragment,
              null,
              "Hashtags of this group have a ",
              Glamor.createElement("b", null, "VERY HIGH"),
              " engagement comparing to your account."
            ),
            Glamor.createElement(
              g().default.Fragment,
              null,
              "It is unlikely to get ranked among the top posts for these hashtags. It is better to avoid these hashtags if possible."
            ),
            !!e &&
              Glamor.createElement(
                g().default.Fragment,
                null,
                "You selected ",
                Glamor.createElement("b", null, e),
                " ",
                1 === e ? "hashtag" : "hashtags",
                " of this group."
              ),
          ],
        },
      };
    }
    _getGroupNoData() {
      if (0 === this.props.ladder.nodata.length) return null;
      return {
        id: "nodata",
        title: "NO DATA",
        tooltip: {
          text: [
            Glamor.createElement(
              g().default.Fragment,
              null,
              "Inssist has no engagement data for these hashtags (yet)."
            ),
            Glamor.createElement(
              g().default.Fragment,
              null,
              "Click CHECK TAGS button to request data for these hashtags."
            ),
          ],
        },
      };
    }
    _getGroupCount(e) {
      return this.props.hasPro
        ? (this.props.ladder[e] || []).filter((e) =>
            this.props.selectedTags.includes(e)
          ).length
        : null;
    }
  }
  var St = v().influx((e, t) => ({
    selectedGroupId: e.tagAssist.selectedGroupId,
    selectedTags: O().default.getSelectedTags(t.placement),
    ladder: O().default.getLadderLatinOnlyAware(),
    hasPro: true,
  }))(wt);
  g(), p(), v(), x();
  class Tt extends g().default.Component {
    constructor(...e) {
      var t;
      return (
        (t = super(...e)),
        (this._onInput = (e) => {
          v().transaction((t) => {
            (t.tagAssist.sidebarSelectedTags = x().extractTags(e)),
              (t.tagAssist.sidebarSelectedTagsAsText = e);
          });
        }),
        (this._onCopyAllClick = () => {
          const e = x().extractTags(this.props.sidebarSelectedTagsAsText);
          Te.copyTags(e);
        }),
        t
      );
    }
    componentDidUpdate(e) {
      const t = e,
        s = this.props;
      if (t.sidebarSelectedTagsAsText === s.sidebarSelectedTagsAsText) {
        const e = t.sidebarSelectedTags.map((e) => `#${e}`).join(" "),
          a = s.sidebarSelectedTags.map((e) => `#${e}`).join(" ");
        e !== a &&
          v().transaction((e) => {
            e.tagAssist.sidebarSelectedTagsAsText = a;
          });
      }
    }
    render() {
      return Glamor.createElement(p().default.TagAssistTextarea, {
        label: this._getLabel(),
        value: this._getValue(),
        onInput: this._onInput,
        onCopyAllClick: this._onCopyAllClick,
      });
    }
    _getLabel() {
      return 0 === this.props.sidebarSelectedTags.length
        ? "hashtags"
        : `hashtags (${this.props.sidebarSelectedTags.length})`;
    }
    _getValue() {
      return this.props.sidebarSelectedTagsAsText;
    }
  }
  var Et = v().influx((e) => ({
    sidebarSelectedTags: e.tagAssist.sidebarSelectedTags,
    sidebarSelectedTagsAsText: e.tagAssist.sidebarSelectedTagsAsText,
  }))(Tt);
  g(), p(), v(), O();
  class _t extends g().default.Component {
    constructor(e) {
      super(e),
        (this._onQueryInput = (e) => {
          v().transaction((t) => {
            (t.tagAssist.query = e),
              e
                ? (t.tagAssist.searching = !0)
                : ((t.tagAssist.searching = !1), (t.tagAssist.ladder = null));
          }),
            clearTimeout(this.searchTimeout),
            (this.searchTimeout = this.setTimeout(() => {
              (this.searchTimeout = null), Te.search();
            }, 800));
        }),
        (this._onClearQueryClick = () => {
          v().transaction((e) => {
            e.tagAssist.query = "";
          }),
            clearTimeout(this.searchTimeout),
            (this.searchTimeout = null),
            Te.search();
        }),
        (this._onLatinOnlyClick = () => {
          v().transaction((e) => {
            e.tagAssist.latinOnly = !e.tagAssist.latinOnly;
          });
        }),
        (this.ladder = null),
        (this.searchTimeout = null);
    }
    componentDidMount() {
      this.props.query && Te.search({ sendGaEvent: !1 });
    }
    componentWillUnmount() {
      super.componentWillUnmount(), this.searchTimeout && Te.search();
    }
    render() {
      return Glamor.createElement(p().default.TagAssistSearchInput, {
        type: this._getType(),
        query: this.props.query,
        placeholder: this._getPlaceholder(),
        loading: this.props.loading,
        latinOnly: this.props.latinOnly,
        onQueryInput: this._onQueryInput,
        onClearQueryClick: this._onClearQueryClick,
        onLatinOnlyClick: this._onLatinOnlyClick,
      });
    }
    _getType() {
      return "search" === this.props.selectedTabId
        ? "search"
        : "ladder" === this.props.selectedTabId
        ? "ladder"
        : null;
    }
    _getPlaceholder() {
      var e;
      const t =
        (null === (e = this.props.accountStats) || void 0 === e
          ? void 0
          : e.mostUsedTags) || [];
      return 0 === t.length
        ? (function (...e) {
            return e[Math.floor(Math.random() * e.length)];
          })("#travel", "#design", "#nature", "#life", "#instagram")
        : t
            .slice(0, 2)
            .map((e) => `#${e}`)
            .join(" ");
    }
  }
  var At = v().influx((e) => ({
    query: e.tagAssist.query,
    loading: e.tagAssist.searching,
    latinOnly: e.tagAssist.latinOnly,
    selectedTabId: e.tagAssist.selectedTabId,
    accountStats: O().default.getAccountStats(),
  }))(_t);
  class Pt extends g().default.Component {
    constructor(...e) {
      var t;
      return (t = super(...e)), (this.scuIgnoreFields = ["tagData"]), t;
    }
    render() {
      return Glamor.createElement(p().default.TagAssistPanelSearch, {
        type: this._getType(),
        input: this._constructInput(),
        content: this._constructContent(),
        textarea: this._constructTextarea(),
        showWelcome: this._shouldShowWelcome(),
      });
    }
    _getType() {
      return "search" === this.props.selectedTabId
        ? "search"
        : "ladder" === this.props.selectedTabId
        ? "ladder"
        : null;
    }
    _constructInput() {
      return Glamor.createElement(At, null);
    }
    _constructContent() {
      if ("search" === this.props.selectedTabId) {
        var e;
        const t =
          (null === (e = this.props.ladder) || void 0 === e
            ? void 0
            : e.relevant) || [];
        return Glamor.createElement(ft, {
          label: "relevant hashtags",
          tagNames: t,
          tagData: this.props.tagData,
          tagDataKey: this.props.tagDataKey,
          placement: this.props.placement,
        });
      }
      if ("ladder" === this.props.selectedTabId)
        return Glamor.createElement(St, {
          tagData: this.props.tagData,
          tagDataKey: this.props.tagDataKey,
          placement: this.props.placement,
        });
    }
    _constructTextarea() {
      return "sidebar" === this.props.placement &&
        (this.props.ladder || this.props.sidebarSelectedTags.length > 0)
        ? Glamor.createElement(Et, null)
        : null;
    }
    _shouldShowWelcome() {
      return !this.props.ladder;
    }
  }
  var It = v().influx((e) => ({
    ladder: O().default.getLadderLatinOnlyAware(),
    selectedTabId: e.tagAssist.selectedTabId,
    sidebarSelectedTags: e.tagAssist.sidebarSelectedTags,
  }))(Pt);
  g(), p(), v(), O();
  class xt extends g().default.Component {
    constructor(e) {
      super(e),
        (this.scuIgnoreFields = ["tagData"]),
        (this._onTakeAllClick = () => {
          Te.selectTags(this.tags, this.props.placement);
        }),
        (this._onRemoveAllClick = () => {
          Te.unselectTags(this.tags, this.props.placement);
        }),
        (this._onCheckAllClick = () => {
          Te.checkTags(this.tags);
        }),
        (this._onStopAllClick = () => {
          Te.stopAllTags();
        }),
        (this.tags = [...e.selectedTags]);
    }
    render() {
      const e = this._getRanking();
      return Glamor.createElement(p().default.TagAssistPanelSummary, {
        rankingTitle: e.title,
        rankingColor: e.color,
        rankingDescription: e.description,
        showTakeAll: this._shouldShowTakeAll(),
        showRemoveAll: this._shouldShowRemoveAll(),
        showCheckAll: this._shouldShowCheckAll(),
        showStopAll: this._shouldShowStopAll(),
        content: this._constructContent(),
        onTakeAllClick: this._onTakeAllClick,
        onRemoveAllClick: this._onRemoveAllClick,
        onCheckAllClick: this._onCheckAllClick,
        onStopAllClick: this._onStopAllClick,
      });
    }
    _shouldShowTakeAll() {
      return (
        0 !== this.tags.length &&
        this.tags.some((e) => !this.props.selectedTags.includes(e))
      );
    }
    _shouldShowRemoveAll() {
      return (
        0 !== this.tags.length &&
        this.tags.every((e) => this.props.selectedTags.includes(e))
      );
    }
    _shouldShowCheckAll() {
      return (
        0 !== this.tags.length &&
        !(this.props.loadingTags.length > 0) &&
        this.tags
          .filter((e) => !this.props.tagData[e])
          .filter((e) => !this.props.loadingTags.includes(e)).length > 0
      );
    }
    _shouldShowStopAll() {
      return this.tags.some((e) => this.props.loadingTags.includes(e));
    }
    _getRanking() {
      const e = this.props.summaryStatus.id;
      return "n/a" === e
        ? this._getRankingNA()
        : "not-enough-low" === e
        ? this._getRankingNotBalanced("low")
        : "not-enough-high" === e
        ? this._getRankingNotBalanced("high")
        : this._getRankingBalanced();
    }
    _constructContent() {
      return Glamor.createElement(kt, {
        tagNames: this.tags,
        tagData: this.props.tagData,
        tagDataKey: this.props.tagDataKey,
        placement: this.props.placement,
      });
    }
    _getRankingNA() {
      return {
        title: "N/A",
        color: this.props.summaryStatus.color,
        description: Glamor.createElement(
          g().default.Fragment,
          null,
          "Please add at least 9 hashtags with data to get a hashtag ladder ranking. Find out more in our ",
          Glamor.createElement(
            "a",
            {
              href: "https://inssist.com/knowledge-base/ultimate-instagram-hashtag-guide",
              target: "_blank",
            },
            "Hashtag Guide"
          ),
          "."
        ),
      };
    }
    _getRankingNotBalanced(e) {
      return (
        (e = e.toUpperCase()),
        {
          title: "Not Balanced",
          color: this.props.summaryStatus.color,
          description: Glamor.createElement(
            g().default.Fragment,
            null,
            "Your hashtag selection is missing hashtags from ",
            e,
            " engagement group. Try to find and add more ",
            e,
            " hashtags to your caption. Find out more in our ",
            Glamor.createElement(
              "a",
              {
                href: "https://inssist.com/knowledge-base/ultimate-instagram-hashtag-guide",
                target: "_blank",
              },
              "Hashtag Guide"
            ),
            "."
          ),
        }
      );
    }
    _getRankingBalanced() {
      return {
        title: "Balanced",
        color: this.props.summaryStatus.color,
        description: Glamor.createElement(
          g().default.Fragment,
          null,
          "Your hashtag selection looks spot on with competitive and niche hashtags mixed together. Find out more in our ",
          Glamor.createElement(
            "a",
            {
              href: "https://inssist.com/knowledge-base/ultimate-instagram-hashtag-guide",
              target: "_blank",
            },
            "Hashtag Guide"
          ),
          "."
        ),
      };
    }
  }
  var Gt = v().influx((e, t) => ({
    loadingTags: e.tagAssist.ladderLoadingTags,
    selectedTags: O().default.getSelectedTags(t.placement),
    summaryStatus: O().default.getSummaryStatus(t.placement),
  }))(xt);
  g(), p(), v(), g(), p(), T(), v(), x(), y(), m(), O();
  class Dt extends g().default.Component {
    constructor(e) {
      super(e),
        (this._constructTag = (e) => ({
          id: e.name,
          element: Glamor.createElement(gt, {
            tag: e,
            placement: this.props.placement,
          }),
        })),
        (this._onCopyAllClick = () => {
          m().gaController.sendEvent("user", "tag-assist:collection-copy-all");
          const e = this.tags.map((e) => e.name);
          Te.copyTags(e);
        }),
        (this._onTakeAllClick = () => {
          m().gaController.sendEvent("user", "tag-assist:collection-take-all");
          const e = this.tags.map((e) => e.name);
          Te.selectTags(e, this.props.placement);
        }),
        (this._onRemoveAllClick = () => {
          m().gaController.sendEvent(
            "user",
            "tag-assist:collection-remove-all"
          );
          const e = this.tags.map((e) => e.name);
          Te.unselectTags(e, this.props.placement);
        }),
        (this._onNameInput = (e) => {
          v().transaction((t) => {
            this._getCollection(t).editName = e;
          });
        }),
        (this._onTextInput = (e) => {
          v().transaction((t) => {
            this._getCollection(t).editText = e;
          });
        }),
        (this._onEditClick = () => {
          true
            ? v().transaction((e) => {
                for (const t of e.tagAssist.collections) t.editing = !1;
                const t = this._getCollection(e);
                (t.editing = !0),
                  (t.editName = t.editName || this.props.collection.name),
                  (t.editText =
                    t.editText || this.tags.map((e) => `#${e.name}`).join(" "));
              })
            : Ge.openBilling("tag-assist");
        }),
        (this._onSaveClick = () => {
          m().gaController.sendEvent("user", "tag-assist:collection-edit"),
            v().transaction((e) => {
              const t = this._getCollection(e);
              (t.name = t.editName),
                (t.tags = x().extractTags(t.editText)),
                (t.editing = !1),
                (t.editName = ""),
                (t.editText = "");
            }),
            Te.registerUsage(),
            Te.saveCollectionsToLs(),
            Te.updateCollectionsTagData();
        }),
        (this._onCancelClick = () => {
          v().transaction((e) => {
            const t = this._getCollection(e);
            (t.editing = !1), (t.editName = ""), (t.editText = "");
          });
        }),
        (this._onDeleteClick = () => {
          m().gaController.sendEvent("user", "tag-assist:collection-delete"),
            v().transaction((e) => {
              e.tagAssist.collections = e.tagAssist.collections.filter(
                (e) => e.id !== this.props.collectionId
              );
            }),
            Te.saveCollectionsToLs(),
            Te.updateCollectionsTagData();
        }),
        (this.tags = []);
    }
    render() {
      this.tags = this.props.collection.tags
        .map((e) => this.props.tagData[e] || e)
        .map(x().decompressTag);
      const e = this.tags.every((e) =>
          this.props.selectedTags.includes(e.name)
        ),
        t = x()
          .extractTags(this.props.collection.editText)
          .filter(T().default).length;
      return Glamor.createElement(p().default.TagAssistCollection, {
        name: this.props.collection.name,
        tags: this.tags.map(this._constructTag),
        editing: this.props.collection.editing,
        editName: this.props.collection.editName,
        editText: this.props.collection.editText,
        editTextLabel: this._getEditTextLabel(t),
        editErrorMessage: this._getEditErrorMessage(t),
        showCopyAll: this.tags.length > 0,
        showTakeAll:
          "sidebar" !== this.props.placement && this.tags.length > 0 && !e,
        showRemoveAll:
          "sidebar" !== this.props.placement && this.tags.length > 0 && e,
        onCopyAllClick: this._onCopyAllClick,
        onTakeAllClick: this._onTakeAllClick,
        onRemoveAllClick: this._onRemoveAllClick,
        onNameInput: this._onNameInput,
        onTextInput: this._onTextInput,
        onEditClick: this._onEditClick,
        onSaveClick: this._onSaveClick,
        onCancelClick: this._onCancelClick,
        onDeleteClick: this._onDeleteClick,
      });
    }
    _getEditTextLabel(e) {
      return e <= 1 ? "hashtags" : `hashtags (${e})`;
    }
    _getEditErrorMessage(e) {
      return e <= 100 ? null : `Limit exceeded: ${e} / 100`;
    }
    _getCollection(e) {
      return e.tagAssist.collections.find(
        (e) => e.id === this.props.collectionId
      );
    }
  }
  var Bt = v().influx((e, { collectionId: t, placement: s }) => ({
    tagData: e.tagAssist.collectionsTagData,
    collection: e.tagAssist.collections.find((e) => e.id === t),
    selectedTags: O().default.getSelectedTags(s),
  }))(Dt);
  S(), g(), p(), T(), v(), y(), m(), x();
  class Ft extends g().default.Component {
    constructor(...e) {
      var t;
      return (
        (t = super(...e)),
        (this._onButtonClick = () => {
          true
            ? v().transaction((e) => {
                (e.tagAssist.newCollection.name = "Collection"),
                  (e.tagAssist.newCollection.text = ""),
                  (e.tagAssist.newCollection.showForm = !0);
              })
            : Ge.openBilling("tag-assist");
        }),
        (this._onNameInput = (e) => {
          v().transaction((t) => {
            t.tagAssist.newCollection.name = e;
          });
        }),
        (this._onTextInput = (e) => {
          v().transaction((t) => {
            t.tagAssist.newCollection.text = e;
          });
        }),
        (this._onSaveClick = () => {
          m().gaController.sendEvent("user", "tag-assist:collection-create"),
            v().transaction((e) => {
              const t = e.tagAssist.newCollection;
              e.tagAssist.collections.unshift({
                id: S().generate(),
                name: t.name,
                tags: x().extractTags(t.text),
                editing: !1,
                editName: "",
                editText: "",
              }),
                (t.name = ""),
                (t.text = ""),
                (t.showForm = !1);
            }),
            Te.registerUsage(),
            Te.saveCollectionsToLs(),
            Te.updateCollectionsTagData();
        }),
        (this._onCancelClick = () => {
          v().transaction((e) => {
            (e.tagAssist.newCollection.name = ""),
              (e.tagAssist.newCollection.text = ""),
              (e.tagAssist.newCollection.showForm = !1);
          });
        }),
        t
      );
    }
    render() {
      const e = x()
        .extractTags(this.props.newCollection.text)
        .filter(T().default).length;
      return Glamor.createElement(p().default.TagAssistNewCollection, {
        name: this.props.newCollection.name,
        text: this.props.newCollection.text,
        textLabel: this._getTextLabel(e),
        showForm: this.props.newCollection.showForm,
        errorMessage: this._getErrorMessage(e),
        onButtonClick: this._onButtonClick,
        onNameInput: this._onNameInput,
        onTextInput: this._onTextInput,
        onSaveClick: this._onSaveClick,
        onCancelClick: this._onCancelClick,
      });
    }
    _getTextLabel(e) {
      return e <= 1 ? "hashtags" : `hashtags (${e})`;
    }
    _getErrorMessage(e) {
      return e <= 100 ? null : `Limit exceeded: ${e} / 100`;
    }
  }
  var Ot = v().influx((e) => ({ newCollection: e.tagAssist.newCollection }))(
    Ft
  );
  class Mt extends g().default.Component {
    constructor(...e) {
      var t;
      return (
        (t = super(...e)),
        (this._constructCollection = (e) => ({
          id: e,
          element: Glamor.createElement(Bt, {
            collectionId: e,
            placement: this.props.placement,
          }),
        })),
        t
      );
    }
    render() {
      return Glamor.createElement(p().default.TagAssistPanelCollections, {
        newCollection: Glamor.createElement(Ot, null),
        collections: this.props.collectionIds.map(this._constructCollection),
      });
    }
  }
  var Lt = v().influx((e) => ({
    collectionIds: e.tagAssist.collections.map((e) => e.id),
  }))(Mt);
  const Ut = ({ props: e }) => ({
    width: 6,
    height: 6,
    marginLeft: g().default.space.g1,
    borderRadius: "50%",
    background: e.summaryColor,
  });
  class Rt extends g().default.Component {
    constructor(e) {
      super(e),
        (this.scuIgnoreFields = ["tagData"]),
        (this._applyTagData = (e) => {
          this.setState({ tagData: { ...e }, tagDataKey: String(Date.now()) });
        }),
        (this._onTabClick = (e) => {
          m().gaController.sendEvent("user", `tag-assist:tab-click-${e.id}`),
            v().transaction((t) => {
              t.tagAssist.selectedTabId = e.id;
            });
        }),
        (this._onUpgradeClick = () => {
          m().gaController.sendEvent("user", "tag-assist:upgrade-to-pro-click"),
            Ge.openBilling("tag-assist");
        }),
        (this._onCloseClick = () => {
          v().transaction((e) => {
            "schedule" === this.props.placement
              ? (e.schedule.showTagAssist = !1)
              : (e.tagAssist.shown = !1);
          });
        }),
        (this.state = { tagData: {}, tagDataKey: null });
    }
    componentDidMount() {
      (async () => {
        const e = await Te.getTagData();
        this._applyTagData(e);
      })(),
        Te.onTagDataUpdate(this._applyTagData);
    }
    componentWillUnmount() {
      Te.onTagDataUpdate.off(this._applyTagData);
    }
    render() {
      return Glamor.createElement(p().default.TagAssistPanel, {
        placement: this.props.placement,
        selectedTabId: this.props.selectedTabId,
        tabs: this._getTabs(),
        proWarning: this._constructProWarning(),
        body: this._constructBody(),
        tips: this._constructTips(),
        onTabClick: this._onTabClick,
        onCloseClick:
          "sidebar" === this.props.placement ? null : this._onCloseClick,
      });
    }
    _getTabs() {
      return [
        { id: "search", label: "SEARCH" },
        { id: "ladder", label: "LADDER" },
        { id: "collections", label: "COLLECTIONS" },
        this.props.hasPro &&
          "sidebar" !== this.props.placement && {
            id: "summary",
            label: Glamor.createElement(
              g().default.Fragment,
              null,
              "RANK",
              Glamor.createElement("div", { css: Ut(this) })
            ),
          },
      ].filter(Boolean);
    }
    _constructProWarning() {
      if (this.props.hasPro) return null;
      const e = this.props.selectedTabId;
      return "search" === e
        ? null
        : "ladder" !== e || this.props.hasLadder
        ? {
            text: "Upgrade to PRO to get tag metrics, ladders and hashtag collection features.",
            onUpgradeClick: this._onUpgradeClick,
          }
        : null;
    }
    _constructBody() {
      const e = this.props.selectedTabId;
      return "search" === e || "ladder" === e
        ? Glamor.createElement(It, {
            tagData: this.state.tagData,
            tagDataKey: this.state.tagDataKey,
            placement: this.props.placement,
          })
        : "collections" === e
        ? Glamor.createElement(Lt, { placement: this.props.placement })
        : "summary" === e
        ? Glamor.createElement(Gt, {
            tagData: this.state.tagData,
            tagDataKey: this.state.tagDataKey,
            placement: this.props.placement,
          })
        : null;
    }
    _constructTips() {
      return "sidebar" === this.props.placement ||
        "schedule" === this.props.placement
        ? null
        : Glamor.createElement(lt, null);
    }
  }
  var Nt = v().influx((e, t) => ({
    hasPro: true,
    selectedTabId: e.tagAssist.selectedTabId,
    summaryColor: O().default.getSummaryStatus(t.placement).color,
    hasLadder: Boolean(e.tagAssist.ladder),
  }))(Rt);
  g(), p(), v();
  class Vt extends g().default.Component {
    constructor(...e) {
      var t;
      return (
        (t = super(...e)),
        (this._onCloseClick = () => {
          v().transaction((e) => {
            e.sidebar.isOpen = !1;
          });
        }),
        t
      );
    }
    render() {
      return Glamor.createElement(p().default.TagAssistSidePanel, {
        title: "Tag Assistant",
        content: Glamor.createElement(Nt, { placement: "sidebar" }),
        onCloseClick: this._onCloseClick,
      });
    }
  }
  function Ht() {
    return (Ht =
      Object.assign ||
      function (e) {
        for (var t = 1; t < arguments.length; t++) {
          var s = arguments[t];
          for (var a in s)
            Object.prototype.hasOwnProperty.call(s, a) && (e[a] = s[a]);
        }
        return e;
      }).apply(this, arguments);
  }
  g(), p(), v();
  class zt extends g().default.Component {
    constructor(...e) {
      var t;
      return (
        (t = super(...e)),
        (this._onCloseClick = () => {
          v().transaction((e) => {
            e.tagAssist.errorCode = null;
          });
        }),
        t
      );
    }
    render() {
      return Glamor.createElement(
        p().default.SnackbarItem,
        {
          id: "tag-assist-snackbar-item-mediator",
          show: !!this.props.errorCode,
        },
        Glamor.createElement(
          g().default.InfoCard,
          Ht({}, this._getTitleAndContent(), {
            icon: "warning-triangle",
            iconStyle: {
              width: 14,
              height: 16,
              color: g().default.color.error,
              position: "relative",
              top: 1,
            },
            markerColor: g().default.color.error,
            onClose: this._onCloseClick,
          })
        )
      );
    }
    _getTitleAndContent() {
      if ("tag-fetch-failed" === this.props.errorCode)
        return {
          title: "Too Many Requests",
          content:
            "\n          Failed to fetch data for a Hashtag page.\n          Too many hashtag requests were made from your IP network recently.\n          Please give it some time (from 15 minutes to a few hours) and try again.\n        ",
        };
    }
  }
  var Wt = v().influx((e) => ({ errorCode: e.tagAssist.errorCode }))(zt);
  function $t(e, ...t) {
    let s = 0;
    return e
      .join("###")
      .split(",")
      .join("\n,\n")
      .split("{")
      .join("\n{")
      .split("\n")
      .map((e) => {
        if (!e.includes("###")) return e;
        const a = B()
          .default(t[s])
          .map((t) => e.split("###").join(t))
          .join(",\n");
        return (s += 1), a;
      })
      .join("\n")
      .split(";")
      .join(" !important;")
      .replace(/!important\s*!important/g, "!important");
  }
  function qt(...e) {
    const t = $t(...e);
    document.head.insertAdjacentHTML("afterbegin", t);
  }
  async function jt(e, t = null) {
    let s, a;
    return (
      "number" == typeof t
        ? ((s = t), (a = 100))
        : t
        ? ((s = t.timeout || 3e4), (a = t.frequency || 100))
        : ((s = 3e4), (a = 100)),
      new Promise((t, n) => {
        const o = e();
        if (o) return void t(o);
        const i = setInterval(() => {
          const s = e();
          s && (clearInterval(i), t(s));
        }, a);
        setTimeout(() => {
          clearInterval(i), t(null);
        }, s);
      })
    );
  }
  o(), V(), D(), H(), E(), B(), k(), P(), z();
  const Yt = {
    DEBUG_LOGS: !1,
    addFile: async function (e, t) {
      const s = await this.load(),
        a = await s.fetchFile(t);
      s.FS("writeFile", e, a);
    },
    readFile: async function (e, t) {
      const s = (await this.load()).FS("readFile", e);
      return new File([s.buffer], e, { type: t });
    },
    removeFile: async function (e) {
      (await this.load()).FS("unlink", e);
    },
    run: async function (e) {
      const t = await this.load(),
        s = e.trim().replace(/\s+/g, " ").split(" ");
      await t.run(...s);
    },
    load: async function () {
      const e = this.load;
      return (
        e.promise ||
          (e.promise = (async () => {
            const e = document.createElement("script");
            (e.src =
              "https://unpkg.com/@ffmpeg/ffmpeg@0.10.1/dist/ffmpeg.min.js"),
              document.head.insertAdjacentElement("beforeend", e),
              await new Promise((t) => {
                e.addEventListener("load", t);
              });
            const t = await jt(() => window.FFmpeg);
            if (!t) return void console.error("failed to load ffmpeg");
            delete window.FFmpeg;
            const s = t.createFFmpeg({ log: this.DEBUG_LOGS });
            return await s.load(), (s.fetchFile = t.fetchFile.bind(t)), s;
          })()),
        e.promise
      );
    },
  };
  v(), W(), w(), C(), d(), v(), C(), m();
  var Zt = {
    init: function () {
      C().iframeBus.on("quick-replies.show", Kt),
        C().iframeBus.on("quick-replies.hide", Qt),
        C().iframeBus.on("quick-replies.toggle", Jt),
        C().iframeBus.on("quick-replies.fetch", Xt);
    },
    showQuickReplies: Kt,
    hideQuickReplies: Qt,
    toggleQuickReplies: Jt,
    fetchQuickReplies: Xt,
    updateQuickReplies: function (e) {
      const t = this.fetchQuickReplies(e);
      e = t
        .map((e) => (e.shortcut ? `/${e.shortcut}\n${e.content}` : e.content))
        .join("\n\n\n");
      const s = t.length;
      return (
        v().transaction((t) => {
          (t.quickReplies.content = e), (t.quickReplies.total = s);
        }),
        C().iframeBus.send("quick-replies.update", t),
        m().gaController.sendEvent(
          "user",
          "quick-replies:update",
          t.length > 10 ? "10+" : t.length
        ),
        { content: e, total: s }
      );
    },
    prefixReplies: function (e = "↪") {
      return Xt()
        .map((t) =>
          t.shortcut ? `${e} /${t.shortcut}\n${t.content}` : `${e} ${t.content}`
        )
        .join("\n\n\n");
    },
  };
  function Kt() {
    v().transaction((e) => {
      e.quickReplies.shown = !0;
    });
  }
  function Qt() {
    v().transaction((e) => {
      e.quickReplies.shown = !1;
    });
  }
  function Jt() {
    v().transaction((e) => {
      e.quickReplies.shown = !e.quickReplies.shown;
    });
  }
  function Xt(e) {
    var t;
    return (e =
      null !== (t = e) && void 0 !== t
        ? t
        : v().model.state.quickReplies.content)
      .replaceAll(/^ *\n/gm, "\n")
      .replaceAll(/^\//gm, "\n\n\n/")
      .split("\n\n\n")
      .map((e) => {
        for (; e.startsWith("\n"); ) e = e.substr(1);
        for (; e.endsWith("\n"); ) e = e.substr(0, e.length - 1);
        let t = null;
        if (e.startsWith("/")) {
          const s = e.split("\n");
          (t = s[0].substr(1)), s.shift(), (e = s.join("\n"));
        }
        return { shortcut: t, content: e };
      })
      .filter((e) => e.content.replaceAll(/\n/gm, "").length > 0);
  }
  g(), v();
  const es = {
    root: {
      ...g().default.column,
      ...g().default.padding("16 16 16 24"),
      height: "100%",
    },
    title: {
      ...g().default.row,
      ...g().default.alignItems.start,
      ...g().default.justifyContent.between,
    },
    info: { maxWidth: 400, marginRight: 16, ...g().default.text.bleak },
    pill: {
      ...g().default.text.elementNormal,
      ...g().default.padding("4 8 4 8"),
      marginTop: 3,
      borderRadius: "4px",
      color: "white",
      backgroundColor: g().default.color.positive,
      whiteSpace: "nowrap",
    },
    closeButton: { "@media(max-width: 1420px)": { display: "none" } },
    content: { height: "calc(100vh - 90px)" },
  };
  class ts extends g().default.Component {
    constructor(e) {
      super(e),
        (this._onCloseClick = () => {
          Zt.hideQuickReplies();
        }),
        (this._onFocus = (e) => {
          this.setState({ focus: !0 });
        }),
        (this._onInput = (e) => {
          const t = Zt.fetchQuickReplies(e);
          this.setState({ content: e, total: t.length });
        }),
        (this._onBlur = (...e) => {
          const { content: t, total: s } = Zt.updateQuickReplies(
            this.state.content
          );
          this.setState({ content: t, total: s, focus: !1 });
        }),
        (this.state = { focus: !1, content: e.content, total: e.total });
    }
    render() {
      return Glamor.createElement(
        "div",
        { css: es.root },
        Glamor.createElement(
          "div",
          { css: es.title },
          Glamor.createElement(
            "div",
            { css: es.info },
            "Separate quick replies with ",
            Glamor.createElement("b", null, "2 blank lines"),
            ". Use ",
            Glamor.createElement("b", null, "@username"),
            " in quick replies. Send quick replies in chat by typing ",
            Glamor.createElement("b", null, "/shortcut"),
            "."
          ),
          Glamor.createElement(
            "div",
            { css: [g().default.row, g().default.alignItems.start] },
            Glamor.createElement(
              "div",
              { css: es.pill },
              "quick replies: ",
              this.state.total
            ),
            Glamor.createElement(g().default.CloseButton, {
              style: [g().default.relative("-8 -8 . . 2"), es.closeButton],
              onClick: this._onCloseClick,
            })
          )
        ),
        Glamor.createElement(g().default.Spacer, { height: 12 }),
        Glamor.createElement(g().default.Input, {
          inputStyle: es.content,
          value: this.value,
          lines: 3,
          spellCheck: !1,
          onFocus: this._onFocus,
          onInput: this._onInput,
          onBlur: this._onBlur,
        })
      );
    }
    get value() {
      return this.state.focus ? this.state.content : Zt.prefixReplies();
    }
  }
  var ss = v().influx((e) => ({
    content: e.quickReplies.content,
    total: e.quickReplies.total,
  }))(ts);
  y(), L(), $(), q();
  const as = {
    init: function () {
      this._initialized ||
        ((this._initialized = !0),
        this._initTestCommand(),
        this._initToggleExperimentsShortcut(),
        this._initGlobalVars());
    },
    _initTestCommand: function () {
      window.test = () => {
        chrome.tabs.create({ url: "/tests.html", active: !0 });
      };
    },
    _initToggleExperimentsShortcut: function () {
      document.addEventListener("keydown", (e) => {
        e.ctrlKey &&
          e.altKey &&
          e.shiftKey &&
          40 === e.keyCode &&
          v().transaction((e) => {
            e.experiments.enabled = !e.experiments.enabled;
          });
      });
    },
    _initGlobalVars: function () {
      (window.env = P().env),
        (window.eventBus = W().eventBus),
        (window.chromeBus = w().chromeBus),
        (window.iframeBus = C().iframeBus),
        (window.tagAssistController = Te),
        (window.abTestingController = d().abTestingController),
        (window.quickRepliesController = Zt),
        (window.igApi = L().igApi),
        (window.callAsync = H().default),
        (window.createUrl = E().default),
        (window.ls = V().default),
        (window.safe = D().default),
        (window.idbController = z().idbController),
        (window.insertMultistyle = qt),
        (P().env.is.development || P().env.is.beta) &&
          ((window.model = v().model),
          (window.transaction = v().transaction),
          (window.stateProxy = y().stateProxy),
          (window.scheduleProxy = $().default),
          (window.scheduleGenerateSquarePreview = q().default),
          (window.setState = this.setState),
          (window.ffmpegController = Yt),
          Object.assign(window, k()),
          this.defineCommit());
    },
    setState: function (e) {
      const t = o().default.cloneDeep(e);
      y().replaceState.dispatch(t);
    },
    defineCommit: function () {
      Object.defineProperty(window, "commit", {
        get: () => (this.setState(v().model.state), null),
      });
    },
  };
  g(), p(), j();
  var ns = {
    createName: function (e, t) {
      return `${e}|${JSON.stringify(t)}`;
    },
    getName: os,
    getParams: function () {
      const e = window.self.name.split("|")[1];
      return j().default(e) || {};
    },
    isIframe: function (e = null) {
      return window.self !== parent && (!e || os() === e);
    },
  };
  function os() {
    return window.self.name.split("|")[0] || null;
  }
  function is(e) {
    P().env.is.development && console.log(`%c${e}`, "color: #00a084");
  }
  P(),
    v(),
    y(),
    C(),
    C(),
    m(),
    v(),
    $(),
    S(),
    Y(),
    R(),
    b(),
    Z(),
    v(),
    y(),
    k(),
    m(),
    W(),
    w(),
    C(),
    u(),
    b(),
    P(),
    R(),
    A(),
    k(),
    y(),
    C(),
    w(),
    v();
  var rs = {
    applyBulkActions: async function () {
      if (!$().default.hasBulkActions()) return;
      let e = !1;
      const t = $()
        .default.getPosts({ ignoreBulkDeleteAction: !0 })
        .map((e) => e.id)
        .reverse();
      for (const s of t) {
        const t = v().model.state,
          a = t.bulk.actions[s];
        if (!a) continue;
        const n = t.schedule.posts.find((e) => e.id === s);
        if (n) {
          v().transaction((e) => {
            e.schedule.posts.find((e) => e.id === s).saveStatus = "saving";
          });
          try {
            await cs({ action: a, post: n });
          } catch (t) {
            (e = !0),
              us(null),
              ds(null),
              v().transaction((e) => {
                delete e.bulk.actions[s];
              }),
              console.error("[bulk]", t);
          }
          is(`[bulk] sleeping for ${ls.sleepSeconds.toFixed(2)}s`),
            await b().default(ls.sleepSeconds * k().SECOND),
            (ls.sleepSeconds = 0),
            v().transaction((e) => {
              const t = e.schedule.posts.find((e) => e.id === s);
              t && "saving" === t.saveStatus && (t.saveStatus = null);
            }),
            us(null),
            ds(null);
        }
      }
      e &&
        v().transaction((e) => {
          (e.schedule.fcsError = "Failed to save some changes"),
            (e.schedule.isErrorShown = !0);
        });
    },
    cancelBulkActions: function () {
      v().transaction((e) => {
        (e.bulk.actions = {}), (e.bulk.selectedPostIds = []);
      });
    },
  };
  const ls = { sleepSeconds: 0 };
  async function cs({ action: e, post: t }, s = 0) {
    var a;
    const n = async () => {
      is("[bulk] failed, retrying in 4 seconds"),
        await b().default(4 * k().SECOND),
        await cs({ action: e, post: t }, s + 1);
    };
    ds(t.preview);
    try {
      "fcs" === t.source
        ? await (async function ({ action: e, post: t }) {
            if (e.delete) {
              us("DELETING POST..."), (ls.sleepSeconds = 0);
              const e = await w().chromeBus.send(
                "fb-api.fcs-delete-post",
                t.id
              );
              if (e.error) throw e.error;
              return void v().transaction((e) => {
                (e.schedule.posts = e.schedule.posts.filter(
                  (e) => e.id !== t.id
                )),
                  delete e.bulk.actions[t.id];
              });
            }
            const s = e.status || t.status,
              a = s !== t.status,
              n = "caption" in e && e.caption !== t.caption,
              o = "on" in e && e.on !== t.on;
            if ("draft" === s && (a || n)) {
              var i;
              a && us("SAVING AS A DRAFT..."), (ls.sleepSeconds = 1.5);
              const s = await w().chromeBus.send(
                "fb-api.fcs-save-as-draft",
                t.id,
                {
                  caption:
                    null !== (i = e.caption) && void 0 !== i ? i : t.caption,
                }
              );
              if (s.error) throw s.error;
            } else if ("scheduled" === s && (a || n || o)) {
              var r;
              (a || o) && us("SCHEDULING..."), (ls.sleepSeconds = 1.5);
              const s = await w().chromeBus.send(
                "fb-api.fcs-save-as-scheduled",
                t.id,
                e.on || t.on,
                {
                  caption:
                    null !== (r = e.caption) && void 0 !== r ? r : t.caption,
                }
              );
              if (s.error) throw s.error;
            } else if ("posted" === s && (a || n)) {
              var l;
              a && us("PUBLISHING..."), (ls.sleepSeconds = 1.5);
              const s = await w().chromeBus.send(
                "fb-api.fcs-save-as-published",
                t.id,
                {
                  caption:
                    null !== (l = e.caption) && void 0 !== l ? l : t.caption,
                }
              );
              if (s.error) throw s.error;
            } else ls.sleepSeconds = 0.15;
            v().transaction((s) => {
              var a;
              "draft" !== t.status ||
                ("scheduled" !== e.status && "posted" !== e.status) ||
                true ||
                (s.billing.trial.schedule += 1);
              const n = s.schedule.posts.find((e) => e.id === t.id);
              (n.status = e.status || t.status),
                (n.caption =
                  null !== (a = e.caption) && void 0 !== a ? a : t.caption),
                (n.on = e.on || t.on),
                (n.draftOrder = e.draftOrder || t.draftOrder),
                "posted" !== t.status &&
                  "posted" === e.status &&
                  ((n.createdOn = n.on), (n.saveStatus = "syncing")),
                delete s.bulk.actions[t.id];
            }),
              hs();
          })({ action: e, post: t })
        : "local" === t.source &&
          (await (async function ({ action: e, post: t }) {
            var s;
            if (e.delete)
              return (
                (ls.sleepSeconds = 0.15),
                us("DELETING POST..."),
                void v().transaction((e) => {
                  A().default(e.schedule.posts, (e) => e.id === t.id);
                })
              );
            if (!e.status)
              return (
                (ls.sleepSeconds = 0.15),
                void v().transaction((s) => {
                  var a;
                  const n = s.schedule.posts.find((e) => e.id === t.id);
                  (n.on = e.on || t.on),
                    (n.caption =
                      null !== (a = e.caption) && void 0 !== a ? a : t.caption),
                    (n.draftOrder = e.draftOrder || t.draftOrder);
                })
              );
            us("UPLOADING..."), (ls.sleepSeconds = 2);
            const a = await Js.getPostFiles(t.id),
              n = e.status || t.status;
            await C().iframeBus.send("schedule.fcs-open-new-post-form", {
              localPostId: t.id,
              localPostFiles: a,
              postMode:
                "posted" === n
                  ? "publish"
                  : "draft" === n
                  ? "draft"
                  : "scheduled" === n
                  ? "schedule"
                  : null,
            });
            const o = null !== (s = e.caption) && void 0 !== s ? s : t.caption;
            await C().iframeBus.send("schedule.set-caption", o),
              v().transaction((s) => {
                if (
                  ((s.schedule.dateDialog.selectedOption =
                    "posted" === n
                      ? "publish-now"
                      : "draft" === n
                      ? "save-as-draft"
                      : "scheduled" === n
                      ? "schedule"
                      : null),
                  "scheduled" === n)
                ) {
                  const a = e.on || t.on;
                  (s.schedule.dateDialog.selectedDay = R()
                    .default(a)
                    .getTime()),
                    (s.schedule.dateDialog.selectedSlotTime = null),
                    (s.schedule.dateDialog.customTime =
                      a - R().default(a).getTime());
                }
              }),
              "scheduled" === n && (await Ns.actualizeDataForIframe());
            const i = await C().iframeBus.send("schedule.fcs-wait-upload");
            if (
              (v().transaction((e) => {
                e.schedule.addCard.savingTitle = null;
              }),
              !i)
            )
              throw new Error("failed to upload files to fcs");
            us(
              "posted" === n
                ? "PUBLISHING..."
                : "draft" === n
                ? "SAVING AS A DRAFT..."
                : "scheduled" === n
                ? "SCHEDULING..."
                : null
            ),
              await b().default(300),
              await C().iframeBus.send("schedule.fcs-submit-composer"),
              hs();
          })({ action: e, post: t }));
    } catch (e) {
      if (s >= 2) throw e;
      return void (await n());
    }
    await b().default(200);
    if (
      (null === (a = v().model.state.bulk.actions[t.id]) || void 0 === a
        ? void 0
        : a.failed) ||
      !1
    ) {
      if (s >= 2) throw new Error("failed to apply bulk action");
      v().transaction((e) => {
        e.bulk.actions[t.id].failed = !1;
      }),
        await n();
    }
  }
  function ds(e) {
    v().transaction((t) => {
      t.schedule.addCard.savingPreview = e;
    });
  }
  function us(e) {
    v().transaction((t) => {
      t.schedule.addCard.savingTitle = e;
    });
  }
  function hs() {
    const e = hs;
    e.executing ||
      (clearTimeout(e.timeout),
      (e.timeout = setTimeout(async () => {
        (e.executing = !0),
          await C().iframeBus.send("schedule.fcs-refresh-data"),
          (e.executing = !1);
      }, 1e3)));
  }
  function ms(e, t) {
    const s = e.indexOf(t);
    -1 === s ? e.push(t) : e.splice(s, 1);
  }
  g(), p(), v(), g(), p(), v(), g(), p(), T(), K(), v();
  class gs extends g().default.Component {
    constructor(e) {
      var t;
      super(e),
        (this._onClick = ({ withShift: e }) => {
          if (this._blinkAddCardIfSaving()) return;
          if (this.props.post.saveStatus) return;
          const t = this.props.post.id,
            s = gs.lastClickedPostId;
          v().transaction((a) => {
            if (!(e && s && s !== t)) return void ms(a.bulk.selectedPostIds, t);
            const n = $()
                .default.getPosts({ applyGridFilters: !0 })
                .map((e) => e.id),
              o = n.indexOf(t),
              i = n.indexOf(s);
            if (-1 === o || -1 === i) return;
            const r = o < i ? n.slice(o, i + 1) : n.slice(i, o + 1),
              l = (e) => a.bulk.selectedPostIds.includes(e),
              c = r.every(l),
              d = l(s);
            a.bulk.selectedPostIds =
              d && !c
                ? a.bulk.selectedPostIds.concat(r).filter(T().default)
                : a.bulk.selectedPostIds.filter((e) => !r.includes(e));
          }),
            (gs.lastClickedPostId = t);
        }),
        (this._onEditClick = () => {
          this._blinkAddCardIfSave() ||
            this._blinkAddCardIfSaving() ||
            this.props.post.saveStatus ||
            ha.openPost(this.props.post);
        }),
        (this._onCaptionChange = (e) => {
          this._blinkAddCardIfSaving() ||
            this.props.post.saveStatus ||
            (this.setState({ caption: e }),
            clearTimeout(this.updateCaptionTimeout),
            (this.updateCaptionTimeout = this.setTimeout(() => {
              v().transaction((t) => {
                const s = this.props.post.id,
                  a = t.schedule.posts.find((e) => e.id === s),
                  n = t.bulk.actions[s] || {};
                a.caption === e ? delete n.caption : (n.caption = e),
                  0 === Object.keys(n).length
                    ? delete t.bulk.actions[s]
                    : (t.bulk.actions[s] = n);
              });
            }, 400)));
        }),
        (this._onDragStart = () => {
          this._blinkAddCardIfSaving() ||
            this.props.post.saveStatus ||
            Ba.onDragStart(this);
        }),
        (this._onDragEnd = () => {
          this._blinkAddCardIfSaving() ||
            this.props.post.saveStatus ||
            Ba.onDragEnd(this);
        }),
        (this._onDragEnter = () => {
          this._blinkAddCardIfSaving() ||
            this.props.post.saveStatus ||
            Ba.onDragEnter(this);
        }),
        (this.captionChangeTimeout = null),
        (this.state = {
          caption:
            (null === (t = e.action) || void 0 === t ? void 0 : t.caption) ||
            e.post.caption ||
            "",
          dragPost: null,
        });
    }
    componentDidUpdate(e) {
      var t, s;
      const a = e,
        n = this.props,
        o =
          (null === (t = a.action) || void 0 === t ? void 0 : t.caption) ||
          a.post.caption ||
          "",
        i =
          (null === (s = n.action) || void 0 === s ? void 0 : s.caption) ||
          n.post.caption ||
          "";
      o !== i && this.state.caption !== i && this.setState({ caption: i });
    }
    render() {
      const e = this._getCaption();
      return Glamor.createElement(p().default.BulkPost, {
        caption: e,
        changed: !!this.props.action,
        selected: this.state.dragPost ? null : this.props.selected,
        canDrag: this._canDrag(),
        postImage: this._getPost().preview,
        postPreview: this._constructPostPreview(),
        charsLeft: this._getCharsLeft(e),
        hashtagsLeft: this._getHashtagsLeft(e),
        mentionsLeft: this._getMentionsLeft(e),
        onClick: this._onClick,
        onEditClick: this._onEditClick,
        onCaptionChange: this._onCaptionChange,
        onDragStart: this._onDragStart,
        onDragEnter: this._onDragEnter,
        onDragEnd: this._onDragEnd,
      });
    }
    _getCaption() {
      const e = this.state.dragPost;
      return e ? e.caption : this.state.caption;
    }
    _canDrag() {
      return "posted" !== this.props.post.status;
    }
    _getPost() {
      return this.state.dragPost || this.props.post;
    }
    _getCharsLeft(e) {
      return 2200 - e.length;
    }
    _getHashtagsLeft(e) {
      const t = K().default();
      return 30 - (e.match(t) || []).length;
    }
    _getMentionsLeft(e) {
      return 30 - (e.match(/@\w+/g) || []).length;
    }
    _constructPostPreview() {
      return Glamor.createElement(Ma, {
        post: this.props.post,
        dragPost: this.state.dragPost,
      });
    }
    _blinkAddCardIfSave() {
      return (
        "save" === $().default.getAddCardStatus() &&
        (ha.blinkAddCardAttention(), !0)
      );
    }
    _blinkAddCardIfSaving() {
      return !!$().default.isSaving() && (ha.blinkAddCardAttention(), !0);
    }
  }
  gs.lastClickedPostId = null;
  var ps = v().influx((e, t) => {
    const s = t.post.id;
    return {
      selected: e.bulk.selectedPostIds.includes(s),
      action: e.bulk.actions[s] || null,
    };
  })(gs);
  class fs extends g().default.Component {
    render() {
      return Glamor.createElement(p().default.BulkGrid, {
        animatePostsOrder: !this.props.dragging,
        posts: this._getPosts(),
      });
    }
    _getPosts() {
      return this.props.posts.map((e, t) => ({
        id: e.id,
        element: Glamor.createElement(ps, { post: e }),
      }));
    }
  }
  var vs = v().influx((e) => ({
    posts: $().default.getPosts({ applyGridFilters: !0 }),
    dragging: e.schedule.isDraggingPost,
  }))(fs);
  g(), p(), k(), v(), g(), p(), Q(), R(), k(), v(), w(), H(), J();
  var Cs = {
    init: async function () {
      w().chromeBus.on("fusion.reload-popup", () => {
        location.reload();
      }),
        w().chromeBus.send("fusion.check-new-version");
      const e = await H().default(chrome.tabs.getCurrent);
      w().chromeBus.send("fusion.popup-tab-id", e.id);
    },
    getConfig: J().default,
  };
  g(), p(), w();
  class ys extends g().default.Component {
    constructor(e) {
      super(e),
        (this._onUpdateClick = () => {
          this.setState({ updating: !0 }),
            w().chromeBus.send("fusion.update-now-click");
        }),
        (this.state = { show: !1, updating: !1 });
    }
    componentDidMount() {
      w().chromeBus.on("fusion.new-version-available", () => {
        this.setState({ show: !0 });
      });
    }
    render() {
      return Glamor.createElement(
        p().default.SnackbarItem,
        { id: "fusion-new-version-card-mediator", show: this.state.show },
        Glamor.createElement(p().default.ActionCard, {
          image: "new-version-icon.png:40:40",
          content:
            "A new product version is available. Click the button to update and reload INSSIST.",
          markerColor: g().default.color.error,
          actions: [
            Glamor.createElement(g().default.LinkButton, {
              small: !0,
              label: this.state.updating ? "UPDATING..." : "UPDATE NOW",
              disabled: this.state.updating,
              onClick: this._onUpdateClick,
            }),
          ],
        })
      );
    }
  }
  g(), k(), v();
  class bs extends g().default.Component {
    constructor(...e) {
      var t;
      return (
        (t = super(...e)),
        (this._onFrequencyChange = (e) => {
          v().transaction((t) => {
            (t.bulk.dateDialog.interval.frequency = e),
              (t.bulk.dateDialog.interval.timeList = this._buildTimeList(t, e));
          });
        }),
        t
      );
    }
    componentDidMount() {
      v().transaction((e) => {
        const t = e.bulk.dateDialog.interval.frequency;
        e.bulk.dateDialog.interval.timeList = this._buildTimeList(e, t);
      });
    }
    render() {
      return Glamor.createElement(g().default.RangeSelect, {
        selectedOption: this.props.frequency,
        options: [
          { value: "1:7", label: "one post every 7 days" },
          { value: "1:3", label: "one post every 3 days" },
          { value: "1:2", label: "one post every 2 days" },
          { value: "1:1", label: "one post a day" },
          { value: "2:1", label: "2 posts a day" },
          { value: "3:1", label: "3 posts a day" },
        ],
        onChange: this._onFrequencyChange,
      });
    }
    _buildTimeList(e, t) {
      const s = e.schedule.timeSlots,
        a = e.bulk.dateDialog.interval.timeList;
      return Array.from(Array(3)).map((e, t) => {
        var n;
        return (
          a[t] || {
            errorMessage: null,
            selectedSlotTime:
              (null === (n = s[t]) || void 0 === n ? void 0 : n.time) || null,
            customTime:
              0 === t
                ? 13 * k().HOUR
                : 1 === t
                ? 16 * k().HOUR
                : 2 === t
                ? 20 * k().HOUR
                : null,
          }
        );
      });
    }
  }
  var ks = v().influx((e) => ({
    frequency: e.bulk.dateDialog.interval.frequency,
  }))(bs);
  g(), p(), v();
  class ws extends g().default.Component {
    constructor(...e) {
      var t;
      return (
        (t = super(...e)),
        (this._onSlotChange = (e) => {
          v().transaction((t) => {
            const s = t.bulk.dateDialog.interval.timeList[this.props.index];
            (s.selectedSlotTime = e), (s.errorMessage = null);
          });
        }),
        (this._onCustomTimeInput = () => {
          v().transaction((e) => {
            e.bulk.dateDialog.interval.timeList[this.props.index].errorMessage =
              null;
          });
        }),
        (this._onCustomTimeChange = (e) => {
          v().transaction((t) => {
            const s = t.bulk.dateDialog.interval.timeList[this.props.index];
            (s.customTime = e), (s.errorMessage = null);
          });
        }),
        t
      );
    }
    render() {
      return Glamor.createElement(p().default.ScheduleTimePicker, {
        label: this._getLabel(),
        timezone: this.props.timezone,
        errorMessage: this.props.errorMessage,
        slots: this.props.slots,
        selectedSlot: this.props.selectedSlotTime,
        customTime: this.props.customTime,
        onSlotChange: this._onSlotChange,
        onCustomTimeInput: this._onCustomTimeInput,
        onCustomTimeChange: this._onCustomTimeChange,
      });
    }
    _getLabel() {
      return 0 === this.props.index
        ? "time to schedule at"
        : 1 === this.props.index
        ? "2nd time to schedule at"
        : 2 === this.props.index
        ? "3rd time to schedule at"
        : null;
    }
  }
  var Ss = v().influx((e, t) => {
    const s = e.bulk.dateDialog.interval.timeList[t.index];
    return {
      slots: e.schedule.timeSlots,
      timezone: e.schedule.dateDialog.timezone,
      customTime: (null == s ? void 0 : s.customTime) || null,
      selectedSlotTime: (null == s ? void 0 : s.selectedSlotTime) || null,
      errorMessage: (null == s ? void 0 : s.errorMessage) || null,
    };
  })(ws);
  g(), p(), v();
  class Ts extends g().default.Component {
    constructor(...e) {
      var t;
      return (
        (t = super(...e)),
        (this._onDayClick = (e) => {
          v().transaction((t) => {
            ms(t.bulk.dateDialog.week.selectedDays, e),
              (t.bulk.dateDialog.week.dayErrorMessage = null);
          });
        }),
        t
      );
    }
    render() {
      return Glamor.createElement(p().default.ScheduleWeekdayPicker, {
        selectedDays: this.props.selectedDays,
        errorMessage: this.props.errorMessage,
        onDayClick: this._onDayClick,
      });
    }
  }
  var Es = v().influx((e) => ({
    selectedDays: e.bulk.dateDialog.week.selectedDays,
    errorMessage: e.bulk.dateDialog.week.dayErrorMessage,
  }))(Ts);
  g(), p(), v();
  class _s extends g().default.Component {
    constructor(...e) {
      var t;
      return (
        (t = super(...e)),
        (this._onSlotChange = (e) => {
          v().transaction((t) => {
            (t.bulk.dateDialog.week.selectedSlotTime = e),
              (t.bulk.dateDialog.week.timeErrorMessage = null);
          });
        }),
        (this._onCustomTimeInput = () => {
          v().transaction((e) => {
            e.bulk.dateDialog.week.timeErrorMessage = null;
          });
        }),
        (this._onCustomTimeChange = (e) => {
          v().transaction((t) => {
            (t.bulk.dateDialog.week.customTime = e),
              (t.bulk.dateDialog.week.timeErrorMessage = null);
          });
        }),
        t
      );
    }
    render() {
      return Glamor.createElement(p().default.ScheduleTimePicker, {
        label: "time to schedule",
        timezone: this.props.timezone,
        errorMessage: this.props.errorMessage,
        slots: this.props.slots,
        selectedSlot: this.props.selectedSlotTime,
        customTime: this.props.customTime,
        onSlotChange: this._onSlotChange,
        onCustomTimeInput: this._onCustomTimeInput,
        onCustomTimeChange: this._onCustomTimeChange,
      });
    }
  }
  var As = v().influx((e) => ({
    slots: e.schedule.timeSlots,
    timezone: e.schedule.dateDialog.timezone,
    customTime: e.bulk.dateDialog.week.customTime,
    selectedSlotTime: e.bulk.dateDialog.week.selectedSlotTime,
    errorMessage: e.bulk.dateDialog.week.timeErrorMessage,
  }))(_s);
  g(), p(), k(), v();
  class Ps extends g().default.Component {
    constructor(e) {
      super(e),
        (this._onDaySelect = (e) => {
          v().transaction((t) => {
            (t.bulk.dateDialog.calendar.selectedDay = e),
              (t.bulk.dateDialog.calendar.errorMessage = null);
          });
        }),
        (this._onPeriodStartChange = (e) => {
          v().transaction((t) => {
            t.bulk.dateDialog.calendar.periodStart = e;
          });
        });
      const t = Date.now(),
        s = Cs.getConfig().fcs;
      (this.maxDay = t + s.MAX_DAYS_FROM_NOW * k().DAY),
        (this.tomorrow = t + k().DAY);
    }
    render() {
      return Glamor.createElement(p().default.ScheduleDatePicker, {
        periodStart: this.props.periodStart || this.tomorrow,
        maxDay: this.maxDay,
        selectedDay: this.props.selectedDay,
        onDaySelect: this._onDaySelect,
        onPeriodStartChange: this._onPeriodStartChange,
      });
    }
  }
  var Is = v().influx((e) => ({
    periodStart: e.bulk.dateDialog.calendar.periodStart,
    selectedDay: e.bulk.dateDialog.calendar.selectedDay,
  }))(Ps);
  g(), p(), v();
  class xs extends g().default.Component {
    constructor(...e) {
      var t;
      return (
        (t = super(...e)),
        (this._onSlotChange = (e) => {
          v().transaction((t) => {
            (t.bulk.dateDialog.calendar.selectedSlotTime = e),
              (t.bulk.dateDialog.calendar.errorMessage = null);
          });
        }),
        (this._onCustomTimeInput = () => {
          v().transaction((e) => {
            e.bulk.dateDialog.calendar.errorMessage = null;
          });
        }),
        (this._onCustomTimeChange = (e) => {
          v().transaction((t) => {
            t.bulk.dateDialog.calendar.customTime = e;
          });
        }),
        t
      );
    }
    render() {
      return Glamor.createElement(p().default.ScheduleTimePicker, {
        label: "time to publish",
        timezone: this.props.timezone,
        errorMessage: this.props.errorMessage,
        slots: this.props.slots,
        selectedSlot: this.props.selectedSlotTime,
        customTime: this.props.customTime,
        onSlotChange: this._onSlotChange,
        onCustomTimeInput: this._onCustomTimeInput,
        onCustomTimeChange: this._onCustomTimeChange,
      });
    }
  }
  var Gs = v().influx((e) => ({
    timezone: e.schedule.dateDialog.timezone,
    slots: e.schedule.timeSlots,
    selectedSlotTime: e.bulk.dateDialog.calendar.selectedSlotTime,
    customTime: e.bulk.dateDialog.calendar.customTime,
    errorMessage: e.bulk.dateDialog.calendar.errorMessage,
  }))(xs);
  g(), p(), X(), k(), v();
  class Ds extends g().default.Component {
    constructor(e) {
      super(e),
        (this._onTypeChange = (e) => {
          v().transaction((t) => {
            t.bulk.dateDialog.startingDay.selectedTypeId = e.id;
          });
        }),
        (this._onDaySelect = (e) => {
          v().transaction((t) => {
            t.bulk.dateDialog.startingDay.selectedDay = e;
          });
        }),
        (this._onPeriodStartChange = (e) => {
          v().transaction((t) => {
            t.bulk.dateDialog.startingDay.periodStart = e;
          });
        });
      const t = Date.now(),
        s = Cs.getConfig().fcs;
      this.maxDay = t + s.MAX_DAYS_FROM_NOW * k().DAY;
    }
    render() {
      return Glamor.createElement(
        g().default.Fragment,
        null,
        this._constructTypeDropdown(),
        this._constructDatePicker()
      );
    }
    _constructTypeDropdown() {
      const e = Date.now(),
        t = this.props.lastPost,
        s = this.props.selectedTypeId,
        a = !!(t && t.on > e),
        n = !!(t && t.on + 1 * k().DAY > e);
      (("last-post" === s && !a) || ("last-post-next-day" === s && !n)) &&
        v().transaction((e) => {
          e.bulk.dateDialog.startingDay.selectedTypeId = "today";
        });
      const o = [
        {
          id: "today",
          label: "Today",
          selected: "today" === this.props.selectedTypeId,
        },
        {
          id: "tomorrow",
          label: "Tomorrow",
          selected: "tomorrow" === this.props.selectedTypeId,
        },
        a && {
          id: "last-post",
          label: `${X().default(t.on, "MMMM d")}, day of the last post`,
          selected: "last-post" === this.props.selectedTypeId,
        },
        n && {
          id: "last-post-next-day",
          label: X().default(t.on + 1 * k().DAY, "MMMM d"),
          selected: "last-post-next-day" === this.props.selectedTypeId,
        },
        {
          id: "custom",
          label: "Custom date",
          selected: "custom" === this.props.selectedTypeId,
        },
      ];
      return Glamor.createElement(g().default.Dropdown, {
        label: "starting day",
        items: o.filter(Boolean),
        menuStyle: g().default.fullWidth,
        isMenuAtTheTop: !0,
        onChange: this._onTypeChange,
      });
    }
    _constructDatePicker() {
      return "custom" !== this.props.selectedTypeId
        ? null
        : Glamor.createElement(
            g().default.Fragment,
            null,
            Glamor.createElement(g().default.Spacer, { height: "g2" }),
            Glamor.createElement(p().default.ScheduleDatePicker, {
              periodStart: this.props.periodStart,
              maxDay: this.maxDay,
              selectedDay: this.props.selectedDay,
              onDaySelect: this._onDaySelect,
              onPeriodStartChange: this._onPeriodStartChange,
            })
          );
    }
  }
  var Bs = v().influx((e) => ({
    selectedTypeId: e.bulk.dateDialog.startingDay.selectedTypeId,
    periodStart: e.bulk.dateDialog.startingDay.periodStart,
    selectedDay: e.bulk.dateDialog.startingDay.selectedDay,
    lastPost: $().default.getLastPost(),
  }))(Ds);
  class Fs extends g().default.Component {
    constructor(...e) {
      var t;
      return (
        (t = super(...e)),
        (this._onTypeChange = (e) => {
          v().transaction((t) => {
            (t.bulk.dateDialog.selectedTypeId = e),
              (t.bulk.dateDialog.timeSlots.errorMessage = null);
          });
        }),
        (this._onApplyClick = () => {
          "calendar" === this.props.view
            ? this._applyCalendar()
            : "interval" === this.props.view
            ? this._applyInterval()
            : "week" === this.props.view
            ? this._applyWeek()
            : "timeSlots" === this.props.view && this._applyTimeSlots();
        }),
        (this._applyCalendar = () => {
          v().transaction((e) => {
            const t = e.bulk.dateDialog.calendar,
              s = R().default(t.selectedDay).getTime(),
              a = t.selectedSlotTime || t.customTime || null,
              n = a ? s + a : null,
              o = this._getMinOn();
            !n || n <= o
              ? (t.errorMessage = "should be at least 10 minutes from now")
              : this._apply(e, { getNextOn: () => n });
          });
        }),
        (this._applyInterval = () => {
          v().transaction((e) => {
            const t = e.bulk.dateDialog.interval,
              s = t.frequency.split(":"),
              a = Number(s[0]),
              n = Number(s[1]);
            let o,
              i = !1,
              r = [];
            if (
              (t.timeList.slice(0, a).forEach((e, t) => {
                const s = e.selectedSlotTime || e.customTime;
                "number" == typeof s
                  ? r.push(s)
                  : ((e.errorMessage = "select time"), (i = !0));
              }),
              i)
            )
              return;
            r = r.sort((e, t) => e - t);
            let l = 0,
              c = 0;
            const d = $().default.getBulkStartingDay(),
              u = this._getMinOn(),
              h = () => (
                (o = d + l * k().DAY + r[c]),
                (c += 1),
                c === r.length && ((c = 0), (l += n)),
                o <= u ? h() : o
              );
            this._apply(e, { getNextOn: h });
          });
        }),
        (this._applyWeek = () => {
          v().transaction((e) => {
            const t = e.bulk.dateDialog.week,
              s = t.selectedDays;
            if (0 === s.length)
              return void (t.dayErrorMessage = "select at least one day");
            const a = t.selectedSlotTime || t.customTime;
            if ("number" != typeof a)
              return void (t.timeErrorMessage = "select time");
            let n,
              o = 0,
              i = 0;
            const r = $().default.getBulkStartingDay(),
              l = this._getMinOn(),
              c = () => {
                const e = s[o] - Q().default(r);
                return (
                  (n = r + e * k().DAY + i * k().WEEK + a),
                  (o += 1),
                  o === s.length && ((o = 0), (i += 1)),
                  n <= l || n < r ? c() : n
                );
              };
            this._apply(e, { getNextOn: c });
          });
        }),
        (this._applyTimeSlots = () => {
          v().transaction((e) => {
            const t = e.schedule.timeSlots.map((e) => e.time);
            if (0 === t.length)
              return void (e.bulk.dateDialog.timeSlots.errorMessage =
                "you have no time slots");
            let s,
              a = 0,
              n = 0;
            const o = $().default.getBulkStartingDay(),
              i = this._getMinOn(),
              r = () => (
                (s = o + n * k().DAY + t[a]),
                (a += 1),
                a === t.length && ((a = 0), (n += 1)),
                s <= i ? r() : s
              );
            this._apply(e, { getNextOn: r });
          });
        }),
        (this._apply = (e, { getNextOn: t }) => {
          const s = $().default.getOrderedSelectedPostIds();
          for (const a of s) {
            const s = e.bulk.actions[a] || {},
              n = e.schedule.posts.find((e) => e.id === a),
              o = t();
            "scheduled" === n.status && n.on === o
              ? (delete s.on, delete s.status)
              : ((s.on = o), (s.status = "scheduled")),
              0 === Object.keys(s).length
                ? delete e.bulk.actions[a]
                : (e.bulk.actions[a] = s);
          }
          (e.bulk.selectedPostIds = []), (e.bulk.dateDialog.show = !1);
        }),
        (this._getMinOn = () => {
          const e = Cs.getConfig().fcs;
          return Date.now() + e.MIN_MINUTES_FROM_NOW * k().MINUTE;
        }),
        t
      );
    }
    render() {
      return Glamor.createElement(p().default.BulkDateDialog, {
        view: this.props.view,
        typeErrorMessage: this.props.typeErrorMessage,
        intervalFrequency: Glamor.createElement(ks, null),
        intervalTimePickerList: this._getIntervalTimePickerList(),
        weekWeekdayPicker: Glamor.createElement(Es, null),
        weekTimePicker: Glamor.createElement(As, null),
        calendarDatePicker: Glamor.createElement(Is, null),
        calendarTimePicker: Glamor.createElement(Gs, null),
        startingDayPicker: Glamor.createElement(Bs, null),
        onTypeChange: this._onTypeChange,
        onApplyClick: this._onApplyClick,
      });
    }
    _getIntervalTimePickerList() {
      const e = Number(this.props.frequency.split(":")[0]);
      return Array.from(Array(e)).map((e, t) => ({
        id: t,
        element: Glamor.createElement(Ss, { index: t }),
      }));
    }
  }
  var Os = v().influx((e) => {
    let t;
    t =
      1 === e.bulk.selectedPostIds.length
        ? "calendar"
        : e.bulk.dateDialog.selectedTypeId;
    let s = null;
    return (
      "timeSlots" === t && (s = e.bulk.dateDialog.timeSlots.errorMessage),
      {
        view: t,
        frequency: e.bulk.dateDialog.interval.frequency,
        typeErrorMessage: s,
      }
    );
  })(Fs);
  class Ms extends g().default.Component {
    constructor(...e) {
      var t;
      return (
        (t = super(...e)),
        (this._onSelectAllClick = () => {
          v().transaction((e) => {
            const t = e.bulk.selectedPostIds.some(
              (t) =>
                "posted" === e.schedule.posts.find((e) => e.id === t).status
            );
            e.bulk.selectedPostIds = t
              ? $()
                  .default.getPosts({ applyGridFilters: !0 })
                  .map((e) => e.id)
              : $()
                  .default.getPosts({ applyGridFilters: !0 })
                  .filter((e) => "posted" !== e.status)
                  .map((e) => e.id);
          });
        }),
        (this._onUnselectAllClick = () => {
          v().transaction((e) => {
            e.bulk.selectedPostIds = [];
          });
        }),
        (this._onScheduleClick = () => {
          v().transaction((e) => {
            e.bulk.dateDialog.show = !e.bulk.dateDialog.show;
          });
        }),
        (this._onPublishNowClick = () => {
          v().transaction((e) => {
            $()
              .default.getOrderedSelectedPostIds()
              .forEach((t, s) => {
                const a = e.schedule.posts.find((e) => e.id === t),
                  n = e.bulk.actions[t] || {};
                "posted" === a.status
                  ? (delete n.status, delete n.on)
                  : ((n.status = "posted"),
                    (n.on = Date.now() + 1 * k().MINUTE + s)),
                  0 === Object.keys(n).length
                    ? delete e.bulk.actions[t]
                    : (e.bulk.actions[t] = n);
              }),
              (e.bulk.selectedPostIds = []);
          });
        }),
        (this._onSaveAsDraftClick = () => {
          v().transaction((e) => {
            for (const t of e.bulk.selectedPostIds) {
              const s = e.schedule.posts.find((e) => e.id === t),
                a = e.bulk.actions[t] || {};
              "fcs" === s.source && "draft" === s.status
                ? delete a.status
                : (a.status = "draft"),
                0 === Object.keys(a).length
                  ? delete e.bulk.actions[t]
                  : (e.bulk.actions[t] = a);
            }
            e.bulk.selectedPostIds = [];
          });
        }),
        (this._onDeleteClick = () => {
          v().transaction((e) => {
            for (const t of e.bulk.selectedPostIds) {
              const s = e.bulk.actions[t] || {};
              (s.delete = !0), (e.bulk.actions[t] = s);
            }
            e.bulk.selectedPostIds = [];
          });
        }),
        (this._onOutOfDateDialogClick = () => {
          v().model.state.bulk.dateDialog.show &&
            v().transaction((e) => {
              e.bulk.dateDialog.show = !1;
            });
        }),
        t
      );
    }
    render() {
      return Glamor.createElement(p().default.BulkActionBar, {
        dateDialog: Glamor.createElement(Os, null),
        showDateDialog: this.props.showDateDialog,
        selectedPostCount: this.props.selectedPostCount,
        disableSaveButtons: this.props.disableSaveButtons,
        onSelectAllClick: this._onSelectAllClick,
        onUnselectAllClick: this._onUnselectAllClick,
        onScheduleClick: this._onScheduleClick,
        onPublishNowClick: this._onPublishNowClick,
        onSaveAsDraftClick: this._onSaveAsDraftClick,
        onDeleteClick: this._onDeleteClick,
        onOutOfDateDialogClick: this._onOutOfDateDialogClick,
      });
    }
  }
  var Ls = v().influx((e) => {
    const t = e.bulk.selectedPostIds.some((t) => {
      const s = e.schedule.posts.find((e) => e.id === t);
      return !!s && "posted" === s.status;
    });
    return {
      showDateDialog: e.bulk.dateDialog.show,
      selectedPostCount: e.bulk.selectedPostIds.length,
      disableSaveButtons: t,
    };
  })(Ms);
  class Us extends g().default.Component {
    constructor(...e) {
      var t;
      return (
        (t = super(...e)),
        (this._onUpsellOverlayClick = () => {
          v().transaction((e) => {
            e.schedule.isUpsellShown = !1;
          });
        }),
        (this._onCloseClick = () => {
          v().transaction((e) => {
            e.schedule.navigation.isOpen = !1;
          });
        }),
        t
      );
    }
    render() {
      return Glamor.createElement(p().default.BulkScreen, {
        loading: this.props.addingFiles,
        addCard: Glamor.createElement(Qa, null),
        controls: Glamor.createElement(Ha, null),
        grid: Glamor.createElement(vs, null),
        actionBar: Glamor.createElement(Ls, null),
        showActionBar: this.props.showActionBar,
        upsellOverlay: this._constructUpsellOverlay(),
        onCloseClick: this._onCloseClick,
      });
    }
    _constructUpsellOverlay() {
      return Glamor.createElement(ot, {
        show: this.props.showUpsell,
        onOverlayClick: this._onUpsellOverlayClick,
        feature: "bulk",
      });
    }
  }
  var Rs = v().influx((e) => ({
    showUpsell: e.schedule.isUpsellShown,
    showActionBar: e.bulk.selectedPostIds.length > 0,
    addingFiles: e.schedule.addingFiles,
  }))(Us);
  $(), ee(), q(), te(), R(), v(), C(), $();
  var Ns = {
    init: function () {
      C().iframeBus.on("schedule.fcs-date-dialog-toggled", async (e) => {
        v().transaction((t) => {
          t.schedule.dateDialog.isOpen = e;
        });
        const t = await C().iframeBus.send(
          "schedule.fcs-date-dialog-get-timezone"
        );
        v().transaction((e) => {
          e.schedule.dateDialog.timezone = t;
        });
      }),
        C().iframeBus.on("schedule.fcs-date-dialog-invalid-time", () => {
          v().transaction((e) => {
            e.schedule.dateDialog.isTimeError = !0;
          });
        });
    },
    actualizeDataForIframe: async function () {
      const e = v().model.state.schedule.dateDialog,
        t = $().default.getDateDialogSelectedDay();
      let s;
      s = e.selectedSlotTime
        ? R().default(t).getTime() + e.selectedSlotTime
        : e.customTime
        ? R().default(t).getTime() + e.customTime
        : null;
      await C().iframeBus.send("schedule.fcs-date-dialog-set-publish-time", s),
        await C().iframeBus.send(
          "schedule.fcs-date-dialog-set-selected-option",
          e.selectedOption
        );
    },
  };
  var Vs = document.documentElement;
  v();
  var Hs = {
    init: function () {
      Vs.addEventListener("dragenter", Ws),
        Vs.addEventListener("dragover", $s),
        Vs.addEventListener("drop", qs);
    },
  };
  const zs = { dragLeaveTimer: null };
  function Ws(e) {
    js() &&
      (e.preventDefault(),
      clearTimeout(zs.dragLeaveTimer),
      "Files" === e.dataTransfer.types[0] &&
        v().transaction((e) => {
          e.schedule.addCard.draggingFiles = !0;
        }));
  }
  function $s(e) {
    js() &&
      (e.preventDefault(),
      clearTimeout(zs.dragLeaveTimer),
      "Files" === e.dataTransfer.types[0] &&
        (v().transaction((e) => {
          e.schedule.addCard.draggingFiles = !0;
        }),
        (zs.dragLeaveTimer = setTimeout(() => {
          v().transaction((e) => {
            e.schedule.addCard.draggingFiles = !1;
          });
        }, 50))));
  }
  function qs(e) {
    js() &&
      (e.preventDefault(),
      clearTimeout(zs.dragLeaveTimer),
      setTimeout(() => {
        v().transaction((e) => {
          e.schedule.addCard.draggingFiles = !1;
        });
      }));
  }
  function js() {
    const e = v().model.state;
    return e.sidebar.isOpen && "tab-scheduling" === e.sidebar.selectedTabId;
  }
  async function Ys(e) {
    const t = "string" == typeof e ? e : URL.createObjectURL(e),
      s = document.createElement("video");
    (s.src = t),
      (s.muted = !0),
      (s.volume = 0),
      (s.preload = "metadata"),
      s.play();
    const a = {};
    return (
      await new Promise((e, t) => {
        s.addEventListener("loadedmetadata", async () => {
          await jt(() => s.webkitAudioDecodedByteCount, 100),
            (a.width = s.videoWidth),
            (a.height = s.videoHeight),
            (a.duration = s.duration),
            (a.hasAudio = s.webkitAudioDecodedByteCount > 0),
            e();
        }),
          s.addEventListener("error", () => {
            t(s.error);
          });
      }),
      s.remove(),
      a
    );
  }
  S(), D(), k(), m(), z(), v(), ee(), q(), $();
  const Zs = {
    mimeTypes: [
      "image/jpeg",
      "image/png",
      "video/quicktime",
      "video/mp4",
      "video/webm",
      "text/csv",
    ],
    maxPostCount: 150,
    maxFileSize: 524288e3,
    maxFileSizeStr: "500MB",
    minVideoDurationSec: 3,
    maxVideoDurationSec: 60,
    minVideoRatio: 0.8,
    maxVideoRatio: 1.778,
  };
  let Ks;
  const Qs = { selectedFiles: [] };
  var Js = {
    init: function () {
      (Ks = Cs.getConfig().fcs),
        (function () {
          const e = {};
          let t = !1,
            s = !1;
          v().model.observe(
            (e) =>
              e.schedule.posts
                .filter((e) => "local" === e.source)
                .map((e) => e.id)
                .join("-"),
            async function a() {
              if (t) return void (s = !0);
              t = !0;
              const n = v().model.state.schedule.posts.filter(
                (e) => "local" === e.source
              );
              for (const t of n) {
                if (e[t.id]) continue;
                const s = `schedule.local-post:${t.id}`,
                  a = await D().default(() => z().idbController.get(s));
                if (!a) continue;
                const n = URL.createObjectURL(a.previewBlob);
                e[t.id] = n;
              }
              v().transaction((t) => {
                for (const s of t.schedule.posts)
                  "local" === s.source &&
                    ((s.image = e[s.id]), (s.preview = e[s.id]));
              }),
                (t = !1),
                s && ((s = !1), a());
            }
          );
        })();
    },
    config: Zs,
    chooseFiles: function (e) {
      if (!v().model.state.authStatus.userId) return;
      const t = document.createElement("input");
      t.setAttribute("type", "file"),
        t.setAttribute("multiple", !0),
        t.setAttribute("accept", Zs.mimeTypes.join(", ")),
        t.addEventListener(
          "change",
          async (t) => {
            t.preventDefault();
            const s = Array.from(t.target.files);
            e(s);
          },
          { once: !0 }
        ),
        t.click();
    },
    selectFiles: function (e) {
      (Qs.selectedFiles = e),
        v().transaction((t) => {
          t.schedule.addCard.fileCount = e.length;
        });
      !e.some((e) => "text/csv" === e.type) && e.length > 1 && e.length <= 10
        ? v().transaction((t) => {
            t.schedule.addCard.fileCount = e.length;
          })
        : Xs(e, { isCarousel: !1 });
    },
    addFiles: Xs,
    addSelectedFiles: function ({ isCarousel: e }) {
      Xs(Qs.selectedFiles, { isCarousel: e });
    },
    getPostFiles: async function (e) {
      const t = await D().default(() =>
        (async function (e) {
          const t = `schedule.local-post:${e}`;
          return (await z().idbController.get(t)) || null;
        })(e)
      );
      if (!t) return [];
      return t.files || [];
    },
  };
  async function Xs(e, { isCarousel: t, postMode: s = null }) {
    const a = Xs;
    if (a.running) return;
    (a.running = !0),
      v().transaction((e) => {
        (e.schedule.addingFiles = !0), (e.schedule.addCard.fileCount = 0);
      });
    let n = [],
      o = v().model.state.schedule.posts.filter(
        (e) => "local" === e.source
      ).length;
    const i = [];
    for (const t of e)
      if ("text/csv" === t.type)
        try {
          const e = "{{__csv-quote__}}",
            s = "{{__csv-br__}}",
            a = URL.createObjectURL(t),
            r = await fetch(a);
          let l = await r.text();
          l = l.split('""').join(e);
          const c = [];
          let d = !1;
          l.split("").forEach((e, t) => {
            '"' !== e ? (d && "\n" === e ? c.push(s) : c.push(e)) : (d = !d);
          }),
            (l = c.join(""));
          const u = sa(l),
            h = ra(u.flat());
          for (const t of u) {
            const a = aa(t);
            if (0 === a.length) continue;
            const r = [];
            for (const e of a) {
              const t = await fetch(e),
                s = await t.blob(),
                a = t.url.split("/").pop().split("?")[0],
                n = new File([s], a, { type: s.type }),
                l = await ea(n);
              if (l) i.push({ file: n, error: l });
              else if (((o += 1), o > Zs.maxPostCount))
                i.push({ file: n, error: "post-count-limit-reached" });
              else if ((r.push(n), r.length >= 10)) break;
            }
            0 !== r.length &&
              n.push({
                id: S().generate(),
                files: r,
                on: v().model.state.schedule.fcsSetup.connected
                  ? ia(t, h)
                  : null,
                preview: await q().default(r[0]),
                caption: na(t)
                  .split(e)
                  .join('"')
                  .split(s)
                  .join("\n")
                  .split("\\n")
                  .join("\n"),
              });
          }
        } catch (e) {
          console.error(e), i.push({ file: t, error: "failed-to-read-csv" });
        }
      else {
        const e = await ea(t);
        if (e) {
          i.push({ file: t, error: e });
          continue;
        }
        if (((o += 1), o > Zs.maxPostCount)) {
          i.push({ file: t, error: "post-count-limit-reached" });
          continue;
        }
        n.push({
          id: S().generate(),
          files: [t],
          preview: await q().default(t),
          caption: "",
        });
      }
    if (
      (t &&
        (n = [
          {
            id: n[0].id,
            files: n.map((e) => e.files).flat(),
            preview: n[0].preview,
            caption: "",
          },
        ]),
      v().transaction((e) => {
        e.schedule.fileUploadErrors = i.map((e) => ({
          type: e.error,
          filename: e.file.name,
        }));
      }),
      0 === n.length)
    )
      return (
        v().transaction((e) => {
          e.schedule.addingFiles = !1;
        }),
        void (a.running = !1)
      );
    n.length > 1 &&
      v().transaction((e) => {
        e.schedule.fcsSetup.connected &&
          ((e.schedule.navigation.isOpen = !0),
          (e.schedule.navigation.selectedTabId = "bulk"));
      });
    for (const e of n)
      try {
        await ta(e.id, {
          id: e.id,
          files: e.files,
          previewBlob: e.preview.blob,
        });
      } catch (t) {
        v().transaction((t) => {
          e.files.map((e) => {
            t.schedule.fileUploadErrors.push({
              type: "unknown",
              filename: e.name,
            });
          });
        });
      }
    const r = Date.now();
    v().transaction((e) => {
      n.reverse().forEach((t, s) => {
        let a;
        (a =
          t.files.length > 1
            ? "carousel"
            : t.files[0].type.startsWith("video/")
            ? "video"
            : "photo"),
          e.schedule.posts.push(
            ee().default({
              id: t.id,
              source: "local",
              type: a,
              status: "draft",
              image: null,
              preview: null,
              imageAvgColor: t.preview.averageColor,
              on: null,
              createdOn: Date.now(),
              stats: null,
              crosspostToFb: null,
              saveStatus: null,
              draftOrder: r + s,
              caption: t.caption || "",
            })
          ),
          t.on && (e.bulk.actions[t.id] = { on: t.on, status: "scheduled" });
      });
    }),
      v().transaction((e) => {
        e.schedule.addingFiles = !1;
      }),
      n.length > 1 &&
        setTimeout(() => {
          v().transaction((e) => {
            e.bulk.selectedPostIds = n.map((e) => e.id);
          });
        }, 1e3),
      (a.running = !1),
      m().gaController.sendEvent(
        "user",
        "schedule:add-files",
        `${t ? "carousel" : "posts"}-${e.length}`
      );
    const l = n.map((e) => e.id);
    if (
      !$().default.isBulkScreen() &&
      1 === l.length &&
      (t || 1 === e.length)
    ) {
      const e = $()
        .default.getPosts()
        .find((e) => e.id === l[0]);
      e && (await ha.openPost(e, { postMode: s }));
    }
    return l;
  }
  async function ea(e) {
    if (e.size > Zs.maxFileSize) return "file-size-limit-reached";
    if (!Zs.mimeTypes.includes(e.type)) return "unsupported-type";
    if (!e.type.startsWith("video/")) return null;
    let t;
    try {
      t = await Ys(e);
    } catch (t) {
      return (
        console.error("failed to load metadata", { file: e, details: t }),
        "unknown"
      );
    }
    if (0 === t.width && 0 === t.height) return "unsupported-codec";
    if (
      t.duration < Zs.minVideoDurationSec ||
      t.duration > Zs.maxVideoDurationSec
    )
      return "unsupported-duration";
    const s = t.width / t.height;
    return s < Zs.minVideoRatio || s > Zs.maxVideoRatio
      ? "unsupported-ratio"
      : null;
  }
  async function ta(e, t) {
    const s = `schedule.local-post:${e}`;
    await z().idbController.set(s, t);
  }
  function sa(e) {
    const t = [",", ";", "\t", "|"];
    let s = null,
      a = 0;
    for (const n of t) {
      const t = e.split(n).length;
      (!s || t > a) && ((s = n), (a = t));
    }
    return e.split("\n").map((e) => e.split(s));
  }
  function aa(e) {
    return e.map(da).flat();
  }
  function na(e) {
    const t = [...e].sort((e, t) => {
      const s = oa(e),
        a = oa(t);
      return s && a ? t.length - e.length : s ? -1 : a ? 1 : null;
    })[0];
    return oa(t) ? t : "";
  }
  function oa(e) {
    if (da(e).length > 0) return !1;
    const t = e.replace(/\D/g, "").length;
    return !(t > 2 && t / e.length > 0.5);
  }
  function ia(e, t) {
    for (const s of e) {
      const e = la(s, t);
      if (e) return e;
    }
    return null;
  }
  function ra(e) {
    const t = e.map(ca).filter(Boolean);
    for (const e of t) {
      if (e[1] > 11) return !0;
      if (e[0] > 11) return !1;
    }
    return !1;
  }
  function la(e, t = !1) {
    var s;
    if (da(e).length > 0) return null;
    const a = (e = e.toLowerCase()).includes("today"),
      n = e.includes("tomorrow"),
      o = ca(e) || null;
    if (!a && !n && !o) return null;
    let i, r, l, c, d;
    if (o) (i = t ? o[1] : o[0]), (r = t ? o[0] : o[1]), (l = o[2]);
    else if (a) {
      var u;
      const t = Date.now(),
        s =
          (null === (u = e.match(/today ?\+ ?(\d+)/)) || void 0 === u
            ? void 0
            : u[1]) || 0,
        a = new Date(t + s * k().DAY);
      (i = a.getDate()), (r = a.getMonth() + 1), (l = a.getFullYear());
    } else if (n) {
      var h;
      const t = Date.now() + 1 * k().DAY,
        s =
          (null === (h = e.match(/tomorrow ?\+ ?(\d+)/)) || void 0 === h
            ? void 0
            : h[1]) || 0,
        a = new Date(t + s * k().DAY);
      (i = a.getDate()), (r = a.getMonth() + 1), (l = a.getFullYear());
    }
    const m =
      (null === (s = e.match(/\d{1,2}:\d{2}/)) || void 0 === s
        ? void 0
        : s[0]) || "";
    if (m) {
      const t = m.split(":").map(Number);
      (c = t[0]), (d = t[1]);
      (/[\d ]pm /.test(e) || /[\d ]pm$/.test(e)) && c < 12 && (c += 12);
    }
    const g = new Date();
    i && g.setDate(i),
      r && g.setMonth(r - 1),
      l && g.setYear(l),
      c && g.setHours(c),
      d && g.setMinutes(d);
    const p = g.getTime(),
      f = Date.now() + Ks.MIN_MINUTES_FROM_NOW * k().MINUTE,
      v = Date.now() + Ks.MAX_DAYS_FROM_NOW * k().DAY;
    return p < f || p > v ? null : p;
  }
  function ca(e) {
    const t = e.match(/(\d{1,2})[./](\d{2})[./]?(\d{2,4})?/) || null;
    if (!t) return null;
    const s = Number(t[1]),
      a = Number(t[2]);
    if (s > 31 || a > 31) return null;
    if (0 === s || 0 === a) return null;
    let n = Number(t[3]) || null;
    n < 2e3 && (n += 2e3);
    return n > new Date().getFullYear() + 1 ? null : [s, a, n];
  }
  function da(e) {
    return e.trim().split(/\s+/g).filter(ua);
  }
  function ua(e) {
    return e.trim().startsWith("http://") || e.trim().startsWith("https://");
  }
  var ha = {
    init: function () {
      C().iframeBus.on("schedule.get-ig-username", pa),
        C().iframeBus.on("schedule.show-upsell", Sa),
        C().iframeBus.on("schedule.is-fallback-enabled", Aa),
        C().iframeBus.on("schedule.has-pro", fa),
        C().iframeBus.on("schedule.get-post", va),
        C().iframeBus.on("schedule.is-creating-post", Ca),
        C().iframeBus.on("schedule.delete-post", ya),
        C().iframeBus.on("schedule.apply-fcs-posts", ba),
        C().iframeBus.on("schedule.is-debug-enabled", ka),
        C().iframeBus.on("schedule.fcs-connection-status", wa),
        C().iframeBus.on("schedule.fcs-notification-error-appeared", Ta),
        C().iframeBus.on("schedule.fcs-critical-error", _a),
        C().iframeBus.on("schedule.fcs-error", Ea),
        Js.init(),
        Hs.init(),
        Ns.init(),
        (function () {
          let e,
            t = !1;
          v().model.observe(
            () => $().default.isSaving(),
            (s) => {
              const a = t && !s;
              (t = s),
                a &&
                  (v().transaction((e) => {
                    e.schedule.addCard.saved = !0;
                  }),
                  clearTimeout(e),
                  (e = setTimeout(() => {
                    v().transaction((e) => {
                      e.schedule.addCard.saved = !1;
                    });
                  }, 2 * k().SECOND)));
            }
          );
        })(),
        window.addEventListener("beforeunload", (e) => {
          $().default.isSavingOrNeedsSave() && (e.returnValue = "");
        }),
        v().model.observe(
          (e) => e.authStatus.username,
          (e) => {
            e && w().chromeBus.send("schedule.update-ig-posts");
          }
        ),
        (function () {
          const e = 15 * k().MINUTE;
          let t, s;
          v().model.observe(
            (e) => e.schedule.lastIgPostsUpdateOn,
            (s) => {
              if (!s) return;
              const a = s + e - Date.now();
              clearTimeout(t),
                (t = setTimeout(() => {
                  w().chromeBus.send("schedule.update-ig-posts");
                }, a));
            }
          ),
            v().model.observe(
              (e) => e.schedule.lastFcsPostsUpdateOn,
              (t) => {
                if (!t) return;
                const a = t + e - Date.now();
                clearTimeout(s),
                  (s = setTimeout(() => {
                    C().iframeBus.send("schedule.fcs-refresh-data");
                  }, a));
              }
            );
        })(),
        v().model.observe(
          () => true,
          (e) => {
            e &&
              v().transaction((e) => {
                e.schedule.isUpsellShown = !1;
              });
          }
        ),
        (async function () {
          let e = !1;
          try {
            await fetch("https://business.facebook.com/creatorstudio/");
          } catch (s) {
            var t;
            e =
              null === (t = s.message) || void 0 === t
                ? void 0
                : t.toLowerCase().includes("failed to fetch");
          }
          if (!e) return;
          let s = !1;
          try {
            await fetch("https://facebook.com");
          } catch {
            s = !0;
          }
          if (s) return;
          await Da();
        })(),
        (function () {
          const e = {};
          C().iframeBus.on(
            "schedule.fcs-edit-post-request",
            async ({ postId: t, status: s, on: a }) => {
              const n = v().model.state.schedule.posts.find((e) => e.id === t);
              var o;
              n &&
                ("draft" === n.status &&
                  "draft" !== s &&
                  ((o = 1),
                  true
                    ? m().gaController.sendEvent(
                        "user",
                        "pro-paid-usage:schedule"
                      )
                    : v().transaction((e) => {
                        e.billing.trial.schedule += o;
                      })),
                m().gaController.sendEvent("user", "schedule:save-post-click"),
                v().transaction((n) => {
                  const o = n.schedule.posts.find((e) => e.id === t);
                  "posted" === o.status ||
                    (o.on = "posted" === s ? Date.now() : a),
                    (e[o.id] = o.status),
                    (o.status = s),
                    (o.saveStatus = "saving"),
                    (n.schedule.navigation.isOpen = !1),
                    "scheduled" === s && (n.schedule.recentScheduledOn = a);
                }));
            }
          ),
            C().iframeBus.on(
              "schedule.fcs-edit-post-response",
              async ({ postId: t, status: s }) => {
                v().model.state.schedule.posts.find((e) => e.id === t) &&
                  (v().transaction((a) => {
                    const n = a.schedule.posts.find((e) => e.id === t),
                      o = e[n.id];
                    delete e[n.id],
                      "posted" !== o && "posted" === s
                        ? ((n.saveStatus = "syncing"),
                          (n.on = Date.now()),
                          (n.createdOn = Date.now()))
                        : (n.saveStatus = null);
                  }),
                  await b().default(2 * k().SECOND),
                  C().iframeBus.send("schedule.fcs-refresh-data"));
              }
            );
        })(),
        (function () {
          const e = {};
          C().iframeBus.on(
            "schedule.fcs-create-post-request",
            async ({ type: t, image: s, crosspostToFb: a, localPostId: n }) => {
              v().model.state.bulk.saving ||
                m().gaController.sendEvent("user", "schedule:save-post-click"),
                v().transaction((o) => {
                  let i, r, l;
                  "bulk" !== o.schedule.navigation.selectedTabId &&
                    (o.schedule.navigation.isOpen = !1);
                  const c = Date.now(),
                    d = o.schedule.dateDialog;
                  if ("publish-now" === d.selectedOption)
                    (i = c), (r = "posted"), (l = c);
                  else if ("save-as-draft" === d.selectedOption)
                    (i = null), (r = "draft"), (l = c);
                  else if ("schedule" === d.selectedOption) {
                    const e = d.customTime || d.selectedSlotTime;
                    (i = d.selectedDay + e),
                      (r = "scheduled"),
                      (l = i),
                      (o.schedule.recentScheduledOn = i);
                  }
                  if (n) {
                    const t = o.schedule.posts.find((e) => e.id === n);
                    if (!t) return;
                    e[s] = t.id;
                    const d = o.bulk.actions[t.id];
                    var u;
                    if (d)
                      delete o.bulk.actions[t.id],
                        (t.source = "fcs"),
                        (t.status = d.status || t.status),
                        (t.image = s),
                        (t.caption =
                          null !== (u = d.caption) && void 0 !== u
                            ? u
                            : t.caption),
                        (t.on = d.on || t.on),
                        (t.createdOn = c),
                        (t.stats = { likes: 0, comments: 0 }),
                        (t.draftOrder = d.draftOrder || t.draftOrder);
                    else
                      (t.source = "fcs"),
                        (t.status = r),
                        (t.image = s),
                        (t.on = i),
                        (t.createdOn = c),
                        (t.stats = { likes: 0, comments: 0 }),
                        (t.crosspostToFb = a),
                        (t.saveStatus = "saving"),
                        "draft" !== r && (t.draftOrder = l);
                  } else {
                    const n = S().generate();
                    (e[s] = n),
                      o.schedule.posts.unshift({
                        id: n,
                        source: "fcs",
                        type: t,
                        status: r,
                        image: s,
                        preview: null,
                        imageAvgColor: null,
                        on: i,
                        createdOn: c,
                        stats: { likes: 0, comments: 0 },
                        crosspostToFb: a,
                        saveStatus: "saving",
                        draftOrder: l,
                      });
                  }
                });
            }
          ),
            C().iframeBus.on(
              "schedule.fcs-create-post-response",
              async ({ image: t }) => {
                const s = e[t];
                if (!v().model.state.schedule.posts.find((e) => e.id === s))
                  return (
                    console.error("post was not found"),
                    void C().iframeBus.send("schedule.fcs-refresh-data")
                  );
                delete e[t],
                  v().transaction((e) => {
                    e.schedule.posts.find((e) => e.id === s).saveStatus =
                      "syncing";
                  }),
                  v().model.state.bulk.saving ||
                    (await b().default(2 * k().SECOND),
                    C().iframeBus.send("schedule.fcs-refresh-data"));
              }
            );
        })();
    },
    isSaving: function () {
      return $().default.isSaving();
    },
    addFiles: Js.addFiles,
    chooseFiles: function (e) {
      if ($().default.isSavingOrNeedsSave()) return void ga();
      Js.chooseFiles(e);
    },
    toggleTab: function (e) {
      const t = v().model.state;
      if (t.schedule.fcsSetup.checking) return;
      if (!t.schedule.fcsSetup.connected) return void xa();
      v().transaction((t) => {
        const s = t.schedule.navigation;
        s.selectedTabId === e && s.isOpen
          ? (s.isOpen = !1)
          : ((s.isOpen = !0), (s.selectedTabId = e));
      });
    },
    openNewPost: ma,
    openPost: async function (e, { postMode: t = null, isRetry: s = !1 } = {}) {
      if (Ia()) return void xa();
      if ($().default.isSavingOrNeedsSave()) return void ga();
      const a = $().default.getRecentScheduledOn();
      if (
        (v().transaction((e) => {
          e.schedule.dateDialog.isOpen = !1;
        }),
        "local" === e.source)
      )
        return (
          ma({
            postMode: t || (e.on ? "schedule" : "draft"),
            localPostId: e.id,
            localPostFiles: await Js.getPostFiles(e.id),
          }),
          void (e.on
            ? (Pa({ on: e.on }), Ns.actualizeDataForIframe())
            : Pa({ on: a, takeNextTimeSlot: !0 }))
        );
      v().transaction((e) => {
        (e.schedule.navigation.isOpen = !0),
          (e.schedule.navigation.selectedTabId = null),
          (e.schedule.navigation.isFcsLoading = !0),
          (e.schedule.navigation.withBackToCalendarButton = !1);
      }),
        "scheduled" === e.status
          ? (v().transaction((e) => {
              e.schedule.dateDialog.selectedOption = "schedule";
            }),
            Pa({ on: e.on }))
          : "draft" === e.status &&
            (v().transaction((e) => {
              e.schedule.dateDialog.selectedOption = "save-as-draft";
            }),
            Pa({ on: a, takeNextTimeSlot: !0 }));
      Ns.actualizeDataForIframe(),
        await b().default(200),
        await C().iframeBus.send("schedule.fcs-open-post", e.id, {
          isIgtv: e.isIgtv,
        }),
        v().transaction((e) => {
          e.schedule.navigation.isFcsLoading = !1;
        });
    },
    commitPostChanges: async function () {
      if (!fa())
        return void (v().model.state.schedule.navigation.isOpen
          ? Sa()
          : Ge.openBilling("schedule"));
      const e = v().model.state,
        t = Object.keys(e.bulk.actions).length;
      m().gaController.sendEvent("user", "schedule:add-card-save-click", t);
      const s = Object.keys(e.bulk.actions).every((t) => {
        const s = e.schedule.posts.find((e) => e.id === t),
          a = e.bulk.actions[t];
        return "local" === s.source && !a.status;
      });
      true &&
        m().gaController.sendEvent("user", "pro-paid-usage:schedule");
      v().transaction((e) => {
        (e.bulk.saving = !0), (e.bulk.selectedPostIds = []);
      }),
        await rs.applyBulkActions(),
        s
          ? v().transaction((e) => {
              (e.bulk.saving = !1), (e.bulk.actions = {});
            })
          : (v().transaction((e) => {
              e.schedule.addCard.savingTitle = "SYNCING...";
            }),
            C().iframeBus.send("schedule.fcs-refresh-data"),
            W().eventBus.once("schedule.fcs-posts-applied", () => {
              v().transaction((e) => {
                (e.bulk.saving = !1),
                  (e.bulk.actions = {}),
                  (e.schedule.addCard.savingTitle = null);
              });
            }));
    },
    cancelPostChanges: function () {
      rs.cancelBulkActions();
    },
    closeBodyPanel: function () {
      v().transaction((e) => {
        e.schedule.navigation.isOpen = !1;
      }),
        setTimeout(() => {
          v().transaction((e) => {
            e.schedule.navigation.selectedTabId = null;
          });
        }, 200);
    },
    blinkAddCardAttention: ga,
    resetFcsConnection: Da,
  };
  async function ma({
    postMode: e = "publish",
    localPostId: t = null,
    localPostFiles: s = [],
  } = {}) {
    const a = v().model.state;
    (t && a.schedule.navigation.selectedPostId === t) ||
      (Ia()
        ? xa()
        : $().default.isSavingOrNeedsSave()
        ? ga()
        : (v().transaction((t) => {
            (t.schedule.navigation.isOpen = !0),
              (t.schedule.navigation.isFcsLoading = !0),
              (t.schedule.navigation.selectedTabId = "post"),
              (t.schedule.navigation.withBackToCalendarButton = !1),
              (t.schedule.dateDialog.isOpen = !1),
              (t.schedule.dateDialog = te().default(t)),
              (t.schedule.dateDialog.selectedOption = {
                publish: "publish-now",
                draft: "save-as-draft",
                schedule: "schedule",
              }[e]);
          }),
          Pa({ on: $().default.getRecentScheduledOn(), takeNextTimeSlot: !0 }),
          Ns.actualizeDataForIframe(),
          await C().iframeBus.send("schedule.fcs-open-new-post-form", {
            postMode: e,
            localPostId: t,
            localPostFiles: s,
          }),
          v().transaction((e) => {
            e.schedule.navigation.isFcsLoading = !1;
          })));
  }
  function ga() {
    v().transaction((e) => {
      e.schedule.addCard.attention = !0;
    }),
      setTimeout(() => {
        v().transaction((e) => {
          e.schedule.addCard.attention = !1;
        });
      }, 600);
  }
  function pa() {
    return v().model.state.authStatus.username;
  }
  function fa() {
    return true;
  }
  function va(e) {
    return v().model.state.schedule.posts.find((t) => t.id === e);
  }
  function Ca() {
    return "post" === v().model.state.schedule.navigation.selectedTabId;
  }
  async function ya(e) {
    const t = v().model.state.schedule.posts.find((t) => t.id === e);
    if (!t) return;
    m().gaController.sendEvent("user", "schedule:delete-post-click"),
      v().transaction((t) => {
        t.schedule.navigation.isOpen = !1;
        t.schedule.posts.find((t) => t.id === e).saveStatus = "deleting";
      });
    let s = null;
    if ("local" === t.source) await b().default(1 * k().SECOND);
    else {
      const t = await w().chromeBus.send("fb-api.fcs-delete-post", e);
      s = t.error || null;
    }
    v().transaction((t) => {
      if (!s)
        return void (t.schedule.posts = t.schedule.posts.filter(
          (t) => t.id !== e
        ));
      console.error("failed to delete post", s),
        (t.schedule.fcsError = "Failed to delete post"),
        (t.schedule.isErrorShown = !0);
      t.schedule.posts.find((t) => t.id === e).saveStatus = null;
    });
  }
  async function ba(e) {
    const t = ba;
    let s = e
      .map((e) => {
        const t = v().model.state.schedule.posts.find((t) => t.id === e.id),
          s = {
            IG_IMAGE: "photo",
            IG_VIDEO: "video",
            IG_CAROUSEL: "carousel",
            IGTV: "video",
          }[e.postType];
        if (!s) return null;
        const a = { DRAFT: "draft", POSTED: "posted", SCHEDULED: "scheduled" }[
          e.postStatus
        ];
        let n = null;
        "draft" !== a && (n = 1e3 * e.scheduledOrLastAddedTimestamp);
        let o,
          i = null;
        return (
          "posted" === a &&
            (i = { likes: e.likeCount, comments: e.commentCount }),
          (o =
            "scheduled" === a
              ? n
              : (null == t ? void 0 : t.draftOrder) || 1e3 * e.lastAddedTime),
          ee().default({
            id: e.id,
            source: "fcs",
            type: s,
            isIgtv: "IGTV" === e.postType,
            status: a,
            image: e.thumbnailSrc,
            preview: (null == t ? void 0 : t.preview) || null,
            imageAvgColor: (null == t ? void 0 : t.imageAvgColor) || null,
            on: n,
            createdOn: 1e3 * e.lastAddedTime,
            stats: i,
            crosspostToFb: (null == t ? void 0 : t.crosspostToFb) || !1,
            saveStatus: (null == t ? void 0 : t.saveStatus) || null,
            draftOrder: o,
            caption: e.description || "",
          })
        );
      })
      .filter(Boolean);
    s = s.filter(
      (e) =>
        !v().model.state.schedule.posts.find(
          (t) => "syncing" === t.saveStatus && t.id === e.id
        )
    );
    const a = [];
    {
      const e = v().model.state;
      for (const t of s) {
        if (!!e.schedule.posts.find((e) => e.id === t.id)) continue;
        let s;
        const o = e.schedule.posts.filter((s) => {
          var a;
          const n =
            (null === (a = e.bulk.actions[s.id]) || void 0 === a
              ? void 0
              : a.status) || s.status;
          return (
            "syncing" === s.saveStatus && s.type === t.type && n === t.status
          );
        });
        if ("photo" !== t.type) s = o[0] || null;
        else {
          var n;
          const e = [];
          for (const s of o)
            try {
              await new Promise((a, n) => {
                const o = setTimeout(n, 7 * k().SECOND);
                (async () => {
                  const [n, i, r] = await Ga(t.image),
                    [l, c, d] = await Ga(s.image);
                  clearTimeout(o),
                    e.push({
                      post: s,
                      rgbDistance:
                        Math.abs(n - l) + Math.abs(i - c) + Math.abs(r - d),
                    }),
                    a();
                })();
              });
            } catch (t) {
              e.push({ post: s, rgbDistance: 765 });
            }
          e.sort((e, t) => e.rgbDistance - t.rgbDistance),
            (s =
              (null === (n = e[0]) || void 0 === n ? void 0 : n.post) || null);
        }
        s &&
          ((t.preview = s.preview),
          (t.imageAvgColor = s.imageAvgColor),
          (t.draftOrder = s.draftOrder),
          (t.crosspostToFb = s.crosspostToFb),
          a.push(s.id));
      }
    }
    v().transaction((e) => {
      (e.schedule.loading = !1),
        (e.schedule.lastFcsPostsUpdateOn = Date.now()),
        (e.schedule.posts = e.schedule.posts
          .filter((e) => !a.includes(e.id))
          .filter((e) => "ig" !== e.source)
          .filter((e) => "fcs" !== e.source || "syncing" === e.saveStatus)
          .concat(s));
    });
    const o = v().model.state.schedule.posts.some(
      (e) => "syncing" === e.saveStatus
    );
    (t.refreshCount = t.refreshCount || 0),
      (t.refreshDelay = t.refreshDelay || 3 * k().SECOND),
      o && t.refreshCount < 4
        ? (clearTimeout(t.refreshTimeout),
          (t.refreshTimeout = setTimeout(() => {
            (t.refreshCount += 1),
              (t.refreshDelay *= 1.5),
              C().iframeBus.send("schedule.fcs-refresh-data");
          }, t.refreshDelay)))
        : ((t.refreshCount = null),
          (t.refreshDelay = null),
          (t.refreshTimeout = null)),
      v().transaction((e) => {
        const t = [...e.schedule.posts];
        for (const s of t) {
          if ("syncing" !== s.saveStatus) continue;
          Date.now() - s.createdOn > 1 * k().HOUR &&
            ((e.schedule.fcsError =
              "Could not save or sync your post(s) to Instagram API. Instagram API is not responsive."),
            (e.schedule.isErrorShown = !0),
            (e.schedule.posts = e.schedule.posts.filter((e) => e.id !== s.id)));
        }
      }),
      W().eventBus.send("schedule.fcs-posts-applied");
  }
  function ka() {
    return !!v().model.state.schedule.debug;
  }
  function wa(e, { someUserConnected: t } = {}) {
    v().model.state.schedule.fcsSetup.connecting
      ? w().chromeBus.send("schedule.fcs-connection-status", {
          fcsConnected: e,
          someUserConnected: t,
        })
      : (v().transaction((t) => {
          (t.schedule.fcsSetup.checking = !1),
            (t.schedule.fcsSetup.connected = e),
            (t.schedule.fcsSetup.showPanel = !1);
        }),
        e || w().chromeBus.send("schedule.update-ig-posts", !0));
  }
  function Sa() {
    v().transaction((e) => {
      e.schedule.isUpsellShown = !0;
    });
  }
  function Ta({ postId: e, errorText: t }) {
    v().transaction((s) => {
      if (s.bulk.saving) {
        const t = s.bulk.actions[e];
        if (t) return void (t.failed = !0);
      }
      (s.schedule.fcsError = t),
        (s.schedule.isErrorShown = !0),
        "post" === s.schedule.navigation.selectedTabId &&
          ((s.schedule.navigation.isOpen = !1),
          (s.schedule.navigation.selectedPostId = null));
    });
  }
  function Ea({ message: e, details: t = {}, critical: s = !1 }) {
    const a = Ea;
    t.isNetworkOk &&
      u().sentryController.sendError(
        e,
        "error",
        { details: t },
        { actor: "schedule" }
      ),
      s &&
        (a.init || ((a.init = !0), (a.criticalCount = 0)),
        t.isNetworkOk && (a.criticalCount += 1),
        v().transaction((e) => {
          (e.schedule.fcsFailed = !0),
            (e.schedule.isErrorShown = !0),
            (e.schedule.fallback.hideSwitchToFallbackButton =
              !t.isNetworkOk || a.criticalCount < 2);
        }));
  }
  function _a({ message: e, isNetworkOk: t }) {
    const s = _a;
    s.init || ((s.init = !0), (s.count = 0)),
      t &&
        (m().gaController.sendEvent("user", "schedule:fcs-failed", e),
        (s.count += 1)),
      v().transaction((e) => {
        (e.schedule.fcsFailed = !0),
          (e.schedule.isErrorShown = !0),
          "post" === e.schedule.navigation.selectedTabId &&
            ((e.schedule.navigation.isOpen = !1),
            (e.schedule.navigation.selectedPostId = null)),
          (e.schedule.fallback.hideSwitchToFallbackButton = !t || s.count < 3);
      });
  }
  function Aa() {
    return v().model.state.schedule.fallback.isEnabled;
  }
  function Pa({ on: e, takeNextTimeSlot: t = !1 }) {
    v().transaction((s) => {
      const a = s.schedule.dateDialog;
      let n = R().default(e).getTime(),
        o = e - n;
      if (t) {
        const e = s.schedule.timeSlots;
        if (0 === e.length)
          (a.periodStart = n),
            (a.selectedDay = n),
            (a.customTime = o),
            (a.selectedSlotTime = null);
        else
          for (;;) {
            const t = e.find((e) => e.time > o);
            t
              ? ((a.periodStart = n),
                (a.selectedDay = n),
                (a.customTime = t.time),
                (a.selectedSlotTime = t.time))
              : ((a.periodStart = Y().default(n, 1).getTime()),
                (a.selectedDay = Y().default(n, 1).getTime()),
                (a.customTime = e[0].time),
                (a.selectedSlotTime = e[0].time));
            const i = a.selectedDay + a.selectedSlotTime;
            if (!s.schedule.posts.find((e) => "fcs" === e.source && e.on === i))
              break;
            (n = a.selectedDay), (o = a.selectedSlotTime);
          }
      } else
        (a.periodStart = n),
          (a.selectedDay = n),
          (a.selectedSlotTime = null),
          (a.customTime = o);
    });
  }
  function Ia() {
    return !v().model.state.schedule.fcsSetup.connected;
  }
  function xa() {
    v().transaction((e) => {
      (e.schedule.fcsSetup.errorCode = null),
        (e.schedule.fcsSetup.showPanel = !0);
    });
  }
  async function Ga(e) {
    const t = Ga;
    if ((t.cache || (t.cache = {}), !t.cache[e])) {
      const s = await fetch(e),
        a = await s.blob(),
        { averageColor: n } = await q().default(a),
        [o, i, r] = n
          .replace("rgb(", "")
          .replace(")", "")
          .split(", ")
          .map(Number);
      (t.cache[e] = [o, i, r]),
        setTimeout(() => {
          delete t.cache[e];
        }, 10 * k().MINUTE);
    }
    return t.cache[e];
  }
  async function Da() {
    await w().chromeBus.send("schedule.drop-fb-xs-cookie"),
      v().transaction((e) => {
        (e.schedule.fcsSetup.screen = "welcome"),
          (e.schedule.fcsSetup.checking = !0),
          (e.schedule.fcsSetup.connected = !1),
          (e.schedule.fcsSetup.connecting = !1),
          (e.schedule.fcsSetup.errorCode = null),
          (e.schedule.fcsSetup.failed = !1),
          (e.schedule.fcsSetup.steps.fbLogin = null),
          (e.schedule.fcsSetup.steps.igProfessional = null),
          (e.schedule.fcsSetup.steps.igConnectedToFbPage = null);
      });
    const e = Z().$('iframe[name^="inssist-fcs"]');
    if (!e) return;
    const t = e.src;
    e.src = t;
  }
  D(), v(), $();
  var Ba = {
    onDragStart: function (e) {
      if ($().default.isSaving()) return void ha.blinkAddCardAttention();
      (Fa.mediator1 = e),
        (Fa.mediator2 = e),
        (Fa.dragging = !0),
        v().transaction((e) => {
          e.schedule.isDraggingPost = !0;
        });
    },
    onDragEnd: function (e) {
      (Fa.dragging = !1),
        setTimeout(() => {
          v().transaction((e) => {
            e.schedule.isDraggingPost = !1;
          });
        });
      const t = D().default(() => Fa.mediator1.props.post, null),
        s = D().default(() => Fa.mediator2.props.post, null);
      Fa.mediator1 && Fa.mediator1.setState({ dragPost: null });
      Fa.mediator2 && Fa.mediator2.setState({ dragPost: null });
      if (!t || !s) return;
      if (t.id === s.id) return;
      let a = 0;
      if (t.draftOrder === s.draftOrder) {
        const e = t.index,
          n = s.index;
        a = Math.sign(e - n);
      }
      v().transaction((e) => {
        "bulk" !== e.schedule.navigation.selectedTabId &&
          "calendar" !== e.schedule.navigation.selectedTabId &&
          "time-slots" !== e.schedule.navigation.selectedTabId &&
          ((e.schedule.navigation.isOpen = !1),
          (e.schedule.navigation.selectedTabId = null));
        const n = e.bulk.actions[t.id] || {};
        if (
          ((n.on = s.on),
          (n.draftOrder = s.draftOrder + a),
          "local" !== t.source)
        ) {
          n.status = "local" === s.source && s.on ? "scheduled" : s.status;
          const a = e.schedule.posts.find((e) => e.id === t.id);
          n.status === a.status && delete n.status;
        }
        e.bulk.actions[t.id] = n;
        const o = e.bulk.actions[s.id] || {};
        if (
          ((o.on = t.on), (o.draftOrder = t.draftOrder), "local" !== s.source)
        ) {
          o.status = "local" === t.source && t.on ? "scheduled" : t.status;
          const a = e.schedule.posts.find((e) => e.id === s.id);
          o.status === a.status && delete o.status;
        }
        e.bulk.actions[s.id] = o;
      });
    },
    onDragEnter: function (e) {
      if (!Fa.dragging) return;
      if ("posted" === e.props.post.status) return;
      Fa.mediator2.setState({ dragPost: null }),
        (Fa.mediator2 = e),
        Fa.mediator1.setState({ dragPost: Fa.mediator2.props.post }),
        Fa.mediator2.setState({ dragPost: Fa.mediator1.props.post });
    },
  };
  const Fa = { mediator1: null, mediator2: null, dragging: !1 };
  g(),
    p(),
    v(),
    $(),
    g(),
    p(),
    v(),
    $(),
    X(),
    se(),
    ae(),
    ne(),
    k(),
    g(),
    p(),
    v(),
    $();
  class Oa extends g().default.Component {
    constructor(e) {
      super(e),
        (this._onClick = () => {
          const e = this._getDragPost() || this.props.post;
          ha.openPost(e);
        }),
        (this._onDragStart = () => {
          Ba.onDragStart(this);
        }),
        (this._onDragEnd = () => {
          Ba.onDragEnd(this);
        }),
        (this._onDragEnter = () => {
          Ba.onDragEnter(this);
        }),
        (this._getDateText = (e) => {
          const t = new Date(e),
            s = X().default(t, "HH:mm");
          let a;
          return (
            (a = se().default(t)
              ? "Today"
              : ae().default(t)
              ? "Tomorrow"
              : ne().default(t)
              ? X().default(t, "d MMM")
              : X().default(t, "d MMM yyyy")),
            `${a}, ${s}`
          );
        }),
        (this.state = { dragPost: null });
    }
    render() {
      const e = this._getDragPost() || this.props.post;
      return Glamor.createElement(p().default.SchedulePostNew, {
        image: e.preview,
        backgroundColor: e.imageAvgColor,
        type: e.type,
        local:
          this.props.showLocalLabel &&
          "local" === e.source &&
          "syncing" !== e.saveStatus,
        blur: this._isBlur(),
        grayscale: this._isGrayscale(),
        index: e.index,
        canClick: this._canClick(),
        canDrag: this._canDrag(),
        showFooter: this.props.showInfo,
        info: this._getInfo(),
        stats: e.stats,
        onClick: this._onClick,
        onDragStart: this._onDragStart,
        onDragEnter: this._onDragEnter,
        onDragEnd: this._onDragEnd,
      });
    }
    _isBlur() {
      const e = this._getDragPost() || this.props.post;
      return (
        "saving" === e.saveStatus ||
        "syncing" === e.saveStatus ||
        "deleting" === e.saveStatus
      );
    }
    _isGrayscale() {
      const e = this._getDragPost() || this.props.post;
      return "saving" === e.saveStatus || "deleting" === e.saveStatus;
    }
    _canClick() {
      const e = this._getDragPost() || this.props.post;
      return (
        "saving" !== e.saveStatus &&
        "syncing" !== e.saveStatus &&
        "deleting" !== e.saveStatus
      );
    }
    _canDrag() {
      return (
        !this.props.saving &&
        !this.props.post.saveStatus &&
        "posted" !== this.props.post.status
      );
    }
    _getInfo() {
      const e = this._getDragPost() || this.props.post;
      return "saving" === e.saveStatus
        ? { text: "SAVING...", color: g().default.color.bgLight1 }
        : "syncing" === e.saveStatus
        ? { text: "SYNCING...", color: g().default.color.bgLight1 }
        : "deleting" === e.saveStatus
        ? { text: "DELETING...", color: g().default.color.bgLight1 }
        : "failed" === e.saveStatus
        ? { text: "Failed to save", color: g().default.color.error }
        : this._isFailedToPost()
        ? { text: "Failed to post", color: g().default.color.error }
        : "posted" === e.status
        ? null
        : "local" === e.source
        ? this.props.post.on
          ? {
              text: this._getDateText(this.props.post.on),
              color: g().default.color.attention,
            }
          : null
        : "draft" === this.props.post.status
        ? { text: "Draft", color: g().default.color.positive }
        : "scheduled" === this.props.post.status && this.props.post.on
        ? {
            text: this._getDateText(this.props.post.on),
            color: g().default.color.positive,
          }
        : null;
    }
    _isFailedToPost() {
      const e = Date.now(),
        t = this._getDragPost() || this.props.post,
        s = t.on + 5 * k().MINUTE,
        a = "scheduled" === t.status,
        n = e > s;
      return this.props.lastFcsPostsUpdateOn > s && a && n;
    }
    _getDragPost() {
      return this.props.dragPost || this.state.dragPost;
    }
  }
  var Ma = v().influx((e) => ({
    saving: $().default.isSaving(),
    showInfo: e.schedule.filters.showInfo,
    showLocalLabel: e.schedule.filters.showLocalLabel,
    lastFcsPostsUpdateOn: e.schedule.lastFcsPostsUpdateOn,
  }))(Oa);
  class La extends g().default.Component {
    constructor(...e) {
      var t;
      return (
        (t = super(...e)),
        (this._MAX_IG_POSTS_TO_SHOW = 60),
        (this._onReloadPageClick = () => {
          location.reload();
        }),
        (this._onResetConnectionClick = () => {
          ha.resetFcsConnection();
        }),
        t
      );
    }
    render() {
      return Glamor.createElement(p().default.ScheduleGrid, {
        posts: this._getPosts(),
        animatePostsOrder: !this.props.dragging,
        overlay: this._getOverlay(),
        message: this._getMessage(),
      });
    }
    _getPosts() {
      let e = 0;
      return this.props.posts
        .map((t) =>
          "ig" === t.source && ((e += 1), e > this._MAX_IG_POSTS_TO_SHOW)
            ? null
            : { id: t.id, element: Glamor.createElement(Ma, { post: t }) }
        )
        .filter(Boolean);
    }
    _getOverlay() {
      return {
        shown:
          this.props.addingFiles || this.props.checking || this.props.loading,
        icon: "spinner",
        ...(this.props.connected && {
          text: Glamor.createElement(
            g().default.Fragment,
            null,
            "Click reset connection if fetching data from",
            Glamor.createElement("br", null),
            "Instagram API takes longer than expected."
          ),
          buttons: [
            {
              id: "reset-connection",
              element: Glamor.createElement(g().default.LinkButton, {
                label: "RESET CONNECTION",
                onClick: this._onResetConnectionClick,
              }),
            },
            {
              id: "reload-page",
              element: Glamor.createElement(g().default.LinkButton, {
                cancel: !0,
                label: "RELOAD PAGE",
                onClick: this._onReloadPageClick,
              }),
            },
          ],
        }),
      };
    }
    _getMessage() {
      return this.props.posts.filter((e) => "ig" === e.source).length >
        this._MAX_POSTS_TO_SHOW
        ? "Older posts are omitted"
        : 0 === this.props.posts.length
        ? "No posts to show"
        : null;
    }
  }
  var Ua = v().influx((e) => ({
    posts: $().default.getPosts({ applyGridFilters: !0 }),
    checking: e.schedule.fcsSetup.checking,
    connected: e.schedule.fcsSetup.connected,
    loading: e.schedule.loading,
    dragging: e.schedule.isDraggingPost,
    addingFiles: e.schedule.addingFiles,
  }))(La);
  g(), p(), m(), v(), C(), w(), $(), g(), p(), m(), v();
  class Ra extends g().default.Component {
    constructor(...e) {
      var t;
      return (
        (t = super(...e)),
        (this._onFilterClick = (e) => {
          m().gaController.sendEvent("user", `schedule:filter-click-${e}`),
            v().transaction((t) => {
              t.schedule.filters[e] = !t.schedule.filters[e];
            });
        }),
        t
      );
    }
    render() {
      return Glamor.createElement(p().default.ScheduleFilters, {
        filters: this.props.filters,
        hasLocalPosts: this.props.hasLocalPosts,
        onFilterClick: this._onFilterClick,
      });
    }
  }
  var Na = v().influx((e) => {
    const t = e.schedule.posts.filter((e) => "local" === e.source);
    return { filters: e.schedule.filters, hasLocalPosts: t.length > 0 };
  })(Ra);
  class Va extends g().default.Component {
    constructor(...e) {
      var t;
      return (
        (t = super(...e)),
        (this._checkHasFilters = () =>
          Object.values(this.props.filters).some((e) => !e)),
        (this._onPillClick = (e) => {
          ha.toggleTab(e);
        }),
        (this._onRefreshClick = () => {
          const e = $().default.getAddCardStatus();
          if ("save" === e || "saving" === e)
            return void ha.blinkAddCardAttention();
          m().gaController.sendEvent("user", "schedule:refresh-click"),
            v().transaction((e) => {
              e.schedule.loading = !0;
            });
          v().model.state.schedule.fcsSetup.connected
            ? C().iframeBus.send("schedule.fcs-refresh-data")
            : w().chromeBus.send("schedule.update-ig-posts");
        }),
        t
      );
    }
    render() {
      return Glamor.createElement(p().default.ScheduleControls, {
        selectedPillId: this.props.selectedTabId,
        loading: this.props.loading,
        hasFilters: this._checkHasFilters(),
        filters: Glamor.createElement(Na, null),
        onPillClick: this._onPillClick,
        onRefreshClick: this._onRefreshClick,
      });
    }
  }
  var Ha = v().influx((e) => ({
    filters: e.schedule.filters,
    loading: e.schedule.loading,
    selectedTabId: e.schedule.navigation.isOpen
      ? e.schedule.navigation.selectedTabId
      : null,
  }))(Va);
  g(), p(), v(), $(), g(), p(), v();
  class za extends g().default.Component {
    constructor(...e) {
      var t;
      return (
        (t = super(...e)),
        (this._onClick = () => {
          this.props.checking ||
            Js.chooseFiles((e) => {
              Js.selectFiles(e);
            });
        }),
        (this._onLongPress = () => {
          v().transaction((e) => {
            e.schedule.fallback.isEnabled = !0;
          });
        }),
        t
      );
    }
    render() {
      return Glamor.createElement(p().default.ScheduleAddCardContentDefault, {
        onClick: this._onClick,
        onLongPress: this._onLongPress,
      });
    }
  }
  var Wa = v().influx((e) => ({ checking: e.schedule.fcsSetup.checking }))(za);
  g(), p(), v(), $();
  class $a extends g().default.Component {
    constructor(e) {
      super(e),
        (this._onSaveClick = () => {
          ha.commitPostChanges();
        }),
        (this._onCancelClick = () => {
          ha.cancelPostChanges();
        }),
        (this.state = { forceSavedStatus: !1 });
    }
    componentDidUpdate(e) {
      const t = e,
        s = this.props;
      "saved" === t.addCardStatus &&
        "saved" !== s.addCardStatus &&
        (this.setState({ forceSavedStatus: !0 }),
        this.setTimeout(() => {
          this.setState({ forceSavedStatus: !1 });
        }, 500));
    }
    render() {
      return Glamor.createElement(p().default.ScheduleAddCardContentChanges, {
        status: this._getStatus(),
        savingTitle: this.props.savingTitle,
        savingText: this.props.savingText,
        savingPreview: this.props.savingPreview,
        onSaveClick: this._onSaveClick,
        onCancelClick: this._onCancelClick,
      });
    }
    _getStatus() {
      return this.state.forceSavedStatus || "saved" === this.props.addCardStatus
        ? "saved"
        : "saving" === this.props.addCardStatus
        ? "saving"
        : null;
    }
  }
  var qa = v().influx((e) => ({
    savingTitle: e.schedule.addCard.savingTitle,
    savingText: e.schedule.addCard.savingText,
    savingPreview: e.schedule.addCard.savingPreview,
    addCardStatus: $().default.getAddCardStatus(),
  }))($a);
  g(), p();
  class ja extends g().default.Component {
    constructor(...e) {
      var t;
      return (
        (t = super(...e)),
        (this._onDrop = (e) => {
          Js.selectFiles(e);
        }),
        t
      );
    }
    render() {
      return Glamor.createElement(p().default.ScheduleAddCardContentDropZone, {
        onDrop: this._onDrop,
      });
    }
  }
  g(), p(), v();
  class Ya extends g().default.Component {
    constructor(...e) {
      var t;
      return (
        (t = super(...e)),
        (this._onOptionClick = (e) => {
          v().transaction((t) => {
            t.schedule.addCard.selectedOption = e;
          });
        }),
        (this._onConfirmClick = () => {
          const e = "carousel" === this.props.selectedOption;
          Js.addSelectedFiles({ isCarousel: e });
        }),
        (this._onCancelClick = () => {
          v().transaction((e) => {
            e.schedule.addCard.fileCount = 0;
          });
        }),
        t
      );
    }
    componentDidMount() {
      this.addEventListener(Vs, "keydown", (e) => {
        "Escape" === e.key &&
          v().transaction((e) => {
            e.schedule.addCard.fileCount = 0;
          });
      }),
        v().transaction((e) => {
          e.schedule.addCard.selectedOption = "multiple";
        });
    }
    render() {
      return Glamor.createElement(p().default.ScheduleAddCardContentDropForm, {
        fileCount: this.props.fileCount,
        selectedOption: this.props.selectedOption,
        onOptionClick: this._onOptionClick,
        onConfirmClick: this._onConfirmClick,
        onCancelClick: this._onCancelClick,
      });
    }
  }
  var Za = v().influx((e) => ({
    fileCount: e.schedule.addCard.fileCount,
    selectedOption: e.schedule.addCard.selectedOption,
  }))(Ya);
  class Ka extends g().default.Component {
    render() {
      return Glamor.createElement(p().default.ScheduleAddCard, {
        contentToShow: this._getContentToShow(),
        highlight: this.props.attention,
        contentDefault: Glamor.createElement(Wa, null),
        contentChanges: Glamor.createElement(qa, null),
        contentDropZone: Glamor.createElement(ja, null),
        contentDropForm: Glamor.createElement(Za, null),
      });
    }
    _getContentToShow() {
      return "save" === this.props.status ||
        "saved" === this.props.status ||
        "saving" === this.props.status
        ? "changes"
        : "dropForm" === this.props.status
        ? "dropForm"
        : "dropZone" === this.props.status
        ? "dropZone"
        : "default";
    }
  }
  var Qa = v().influx((e) => ({
    status: $().default.getAddCardStatus(),
    attention: e.schedule.addCard.attention,
  }))(Ka);
  g(), v(), w();
  const Ja = {
      root: {
        ...g().default.padding("g2 14 g2 g3"),
        width: "100%",
        position: "relative",
        fontFamily: g().default.font.secondary,
      },
      closeButton: { ...g().default.absolute("g1 g1 . .") },
      welcomeScreen: {},
      stepsScreen: { fontSize: 13, lineHeight: "20px" },
      title: {
        height: "24px",
        ...g().default.text.of({
          size: 20,
          height: "24px",
          weight: 600,
          color: g().default.color.textNormal,
          family: g().default.font.primary,
        }),
      },
      welconeScreenText: { ...g().default.text.contentText, paddingRight: 21 },
      buttonContainer: {
        ...g().default.row,
        ...g().default.justifyContent.center,
      },
      button: ({ processing: e }) => ({
        ...g().default.padding("8 24 8 12"),
        ...(e && { cursor: "normal", opacity: 0.7 }),
      }),
      buttonContent: { ...g().default.row, ...g().default.alignItems.center },
      buttonIcon: ({ processing: e }) => ({
        marginRight: g().default.space.g2,
        ...(e && {
          ...g().default.animation.of({
            name: "spin",
            timing: "linear",
            duration: "2s",
            iteractionCount: "infinite",
          }),
        }),
      }),
      disclaimer: { ...g().default.row, ...g().default.center, width: "100%" },
      disclaimerIcon: {
        width: 24,
        height: 24,
        color: g().default.color.iconPassive,
        flexShrink: 0,
        marginRight: g().default.space.g1h,
      },
      disclaimerText: {
        ...g().default.text.tooltipText,
        color: g().default.color.textPassive,
      },
      step: { ...g().default.row },
      stepStatus: {
        ...g().default.relative(),
        top: 2,
        marginRight: g().default.space.g1,
      },
      stepBody: {},
      stepTitle: { fontSize: 16, lineHeight: "22px" },
      stepDescription: {
        marginTop: g().default.space.g1,
        paddingRight: g().default.space.g3,
      },
    },
    Xa = "schedule-setup-screen.lock",
    en = "schedule-setup-screen.cog";
  g().default.SvgIcon.registerSvgIcons([
    `<symbol id="${Xa}" viewBox="0 0 23.818 23.819"><defs><clipPath id="a"><path fill="none" d="M0 0h23.819v23.819H0z"/></clipPath></defs><g clip-path="url(#a)"><circle cx="11.909" cy="11.909" r="11.909" fill="currentColor"/><path d="M15.817 9.304h-.93V7.815a2.978 2.978 0 0 0-5.955 0v1.489h-.93a.747.747 0 0 0-.745.744v7.816a.747.747 0 0 0 .744.744h7.816a.747.747 0 0 0 .744-.744v-7.816a.747.747 0 0 0-.744-.744zm-2.791 6.42h-2.233l.6-1.526a1.117 1.117 0 1 1 1.042 0zm1.117-6.42H9.676V7.815a2.233 2.233 0 0 1 4.466 0z" fill="#fff"/></g></symbol>`,
    `<symbol id="${en}" viewBox="0 0 30 30"><path d="M32.25 19.393v-4.286h-2.324a12.978 12.978 0 00-.623-2.344l2.009-1.163-2.142-3.7-2.009 1.154a12.958 12.958 0 00-1.714-1.714L26.6 5.33l-3.7-2.143L21.737 5.2a12.447 12.447 0 00-2.344-.623V2.25h-4.286v2.324a12.977 12.977 0 00-2.344.623L11.6 3.187 7.9 5.33l1.154 2.009a12.958 12.958 0 00-1.715 1.715L5.33 7.9l-2.143 3.7L5.2 12.763a12.447 12.447 0 00-.623 2.344H2.25v4.286h2.324a12.977 12.977 0 00.626 2.344L3.187 22.9l2.143 3.7 2.009-1.158a12.958 12.958 0 001.714 1.714L7.9 29.17l3.71 2.143 1.153-2.013a12.448 12.448 0 002.344.623v2.327h4.286v-2.324a12.978 12.978 0 002.344-.623l1.163 2.009 3.7-2.142-1.158-2.009a12.958 12.958 0 001.714-1.714L29.17 26.6l2.143-3.71-2.013-1.153a12.448 12.448 0 00.623-2.344zm-15-4.286a2.143 2.143 0 11-2.143 2.143 2.141 2.141 0 012.143-2.143zm-7.687 7.969a9.623 9.623 0 01-1.956-5.826 10.22 10.22 0 01.074-1.205l3.141 1.145v.06a6.439 6.439 0 00.891 3.268zm2.725-9.911L9.147 12.02a9.632 9.632 0 015.96-4.172v3.342a6.477 6.477 0 00-2.819 1.975zm4.962 13.728a9.578 9.578 0 01-4.406-1.065l2.15-2.558a6.438 6.438 0 004.513 0l2.15 2.558a9.578 9.578 0 01-4.407 1.065zm2.143-15.7V7.848a9.632 9.632 0 015.96 4.172l-3.141 1.145a6.477 6.477 0 00-2.819-1.975zm5.545 11.886l-2.15-2.558a6.439 6.439 0 00.891-3.268v-.06l3.141-1.145a10.22 10.22 0 01.074 1.205 9.623 9.623 0 01-1.956 5.823z" transform="translate(-2.25 -2.25)" fill="url(#inssist.gradient)"/></symbol>`,
  ]);
  class tn extends g().default.Component {
    constructor(...e) {
      var t;
      return (
        (t = super(...e)),
        (this._onCloseClick = () => {
          v().transaction((e) => {
            e.schedule.fcsSetup.showPanel = !1;
          }),
            setTimeout(() => {
              v().transaction((e) => {
                e.schedule.fcsSetup.screen = "welcome";
              });
            }, 300);
        }),
        (this._onButtonClick = () => {
          w().chromeBus.send("schedule.connect-to-fcs");
        }),
        (this._onSkipFbLoginClick = () => {
          w().chromeBus.send("schedule.connect-to-fcs", { skipFbLogin: !0 });
        }),
        t
      );
    }
    render() {
      return Glamor.createElement(
        "div",
        { css: Ja.root },
        this._renderCloseButton(),
        this._renderWelcomeScreen(),
        this._renderStepsScreen()
      );
    }
    _renderCloseButton() {
      return Glamor.createElement(g().default.CloseButton, {
        style: Ja.closeButton,
        onClick: this._onCloseClick,
      });
    }
    _renderWelcomeScreen() {
      return "welcome" !== this.props.screen
        ? null
        : Glamor.createElement(
            "div",
            { css: Ja.welcomeScreen },
            Glamor.createElement(
              "div",
              { css: Ja.title },
              "Setup Post Assistant"
            ),
            Glamor.createElement(g().default.Spacer, { height: "g2" }),
            Glamor.createElement(
              "div",
              { css: Ja.welconeScreenText },
              "With our Post Assistant you can:"
            ),
            Glamor.createElement(g().default.Spacer, { height: "g1h" }),
            Glamor.createElement(
              "div",
              { css: Ja.welconeScreenText },
              "• Schedule your posts ahead in a calendar",
              Glamor.createElement("br", null),
              "• Post carousels (multi-photo posts)",
              Glamor.createElement("br", null),
              "• Inspect post performance metrics and more"
            ),
            Glamor.createElement(g().default.Spacer, { height: "g1h" }),
            Glamor.createElement(
              "div",
              { css: Ja.welconeScreenText },
              "Please connect Instagram to Post Assistant:"
            ),
            Glamor.createElement(g().default.Spacer, { height: "g3" }),
            this._renderButton(),
            Glamor.createElement(g().default.Spacer, { height: "g3" }),
            Glamor.createElement(
              "div",
              { css: Ja.disclaimer },
              Glamor.createElement(g().default.SvgIcon, {
                style: Ja.disclaimerIcon,
                name: Xa,
              }),
              Glamor.createElement(
                "div",
                { css: Ja.disclaimerText },
                "We do not collect, transfer or store your Instagram credentials. This setup is safe and secure."
              )
            )
          );
    }
    _renderStepsScreen() {
      return "steps" !== this.props.screen
        ? null
        : Glamor.createElement(
            "div",
            { css: Ja.stepsScreen },
            Glamor.createElement(
              "div",
              { css: Ja.title },
              "Setup Post Assistant"
            ),
            Glamor.createElement(g().default.Spacer, { height: "g2" }),
            Glamor.createElement(
              "div",
              null,
              "Please wait for Inssist to verify Post Assistant access:"
            ),
            Glamor.createElement(g().default.Spacer, { height: "g2" }),
            this._renderStep(this._getIgLoginStep()),
            Glamor.createElement(g().default.Spacer, { height: "g2" }),
            this._renderStep(this._getIgProfessionalStep()),
            Glamor.createElement(g().default.Spacer, { height: "g2" }),
            this._renderStep(this._getIgConnectedToFbPageStep()),
            Glamor.createElement(g().default.Spacer, { height: "g5" }),
            this._renderButton(),
            Glamor.createElement(g().default.Spacer, { height: "g2" })
          );
    }
    _getIgLoginStep() {
      const e = this.props.steps.fbLogin;
      let t = null;
      return (
        ("nok" !== e && "failed" !== e) ||
          (t = Glamor.createElement(
            React.Fragment,
            null,
            "Scheduling API requires",
            " ",
            Glamor.createElement(
              "a",
              { href: "https://facebook.com?elcw", target: "_blank" },
              "Facebook login"
            ),
            " ",
            "to work.",
            Glamor.createElement("br", null),
            "You can try to ",
            Glamor.createElement(
              "a",
              { css: g().default.clickable, onClick: this._onSkipFbLoginClick },
              "skip this step"
            ),
            "."
          )),
        {
          status: e,
          title: Glamor.createElement(
            React.Fragment,
            null,
            "Facebook Login",
            " ",
            "skipped" === e &&
              Glamor.createElement(
                "span",
                { css: { color: g().default.color.textPassive } },
                "(skipped)"
              )
          ),
          description: t,
        }
      );
    }
    _getIgProfessionalStep() {
      const e = this.props.steps.igProfessional;
      let t = null;
      return (
        ("nok" !== e && "failed" !== e) ||
          (t = Glamor.createElement(
            React.Fragment,
            null,
            "Only ",
            Glamor.createElement(
              "a",
              {
                href: "https://help.instagram.com/502981923235522/",
                target: "_blank",
              },
              "professional Instagram accounts"
            ),
            " can access Scheduling and Post Performance API:",
            Glamor.createElement("br", null),
            "1. Open Instagram Mobile App",
            Glamor.createElement("br", null),
            "2. Click Settings → Account",
            Glamor.createElement("br", null),
            "3. Click “Switch to Professional Account”",
            Glamor.createElement("br", null)
          )),
        { status: e, title: "Instagram Professional Account", description: t }
      );
    }
    _getIgConnectedToFbPageStep() {
      const e = this.props.steps.igConnectedToFbPage;
      let t = "Authorize Instagram API access";
      "nok" === e && (t = "Facebook Page Connection");
      let s = null;
      return (
        "loading" === e
          ? (s = Glamor.createElement(
              React.Fragment,
              null,
              "Please authorize Instagram API access for",
              Glamor.createElement("br", null),
              this.props.username
                ? Glamor.createElement("b", null, "@", this.props.username)
                : "your",
              " account."
            ))
          : ("nok" !== e && "failed" !== e) ||
            (s = Glamor.createElement(
              React.Fragment,
              null,
              "Instagram Post Scheduling only works for accounts connected to a Facebook Page.",
              Glamor.createElement("br", null),
              "1. Create a new Facebook Page from ",
              Glamor.createElement(
                "a",
                {
                  href: "https://www.facebook.com/pages/creation/?ref_type=launch_point",
                  target: "_blank",
                },
                "this link"
              ),
              ".",
              Glamor.createElement("br", null),
              "2. Open Facebook Page Settings → Instagram → click “Connect”. Then click Retry button."
            )),
        { status: e, title: t, description: s }
      );
    }
    _renderButton() {
      const e = this.props.screen,
        t = Object.values(this.props.steps),
        s =
          "steps" === e &&
          (t.some((e) => "loading" === e) || t.every((e) => "ok" === e));
      let a = "CONNECT";
      return (
        "steps" === e &&
          t.some((e) => "failed" === e || "nok" === e) &&
          (a = "RETRY"),
        Glamor.createElement(
          "div",
          { css: Ja.buttonContainer },
          Glamor.createElement(g().default.PrimaryButton, {
            style: Ja.button({ processing: s }),
            iconStyle: { display: "none" },
            disabled: s,
            tabIndex: "-1",
            label: Glamor.createElement(
              "div",
              { css: Ja.buttonContent },
              Glamor.createElement(g().default.SvgIcon, {
                style: Ja.buttonIcon({ processing: s }),
                name: en,
              }),
              a
            ),
            onClick: s ? null : this._onButtonClick,
          })
        )
      );
    }
    _renderStep({ status: e, title: t, description: s }) {
      let a;
      return (
        (a =
          "ok" === e || "skipped" === e
            ? Glamor.createElement(g().default.SvgIcon, {
                style: { color: g().default.color.link },
                name: "igswiss.circle-check-yes",
              })
            : "nok" === e || "failed" === e
            ? Glamor.createElement(g().default.SvgIcon, {
                style: { color: g().default.color.iconPassive },
                name: "igswiss.circle-check-no",
              })
            : Glamor.createElement(g().default.ProgressRing, {
                size: 18,
                thickness: 2,
                value: "loading" === e ? 30 : 0,
                spinning: "loading" === e,
              })),
        Glamor.createElement(
          "div",
          { css: Ja.step },
          Glamor.createElement("div", { css: Ja.stepStatus }, a),
          Glamor.createElement(
            "div",
            { css: Ja.stepBody },
            Glamor.createElement("div", { css: Ja.stepTitle }, t),
            s && Glamor.createElement("div", { css: Ja.stepDescription }, s)
          )
        )
      );
    }
  }
  var sn = v().influx((e) => ({
    screen: e.schedule.fcsSetup.screen,
    username: e.authStatus.username,
    steps: { ...e.schedule.fcsSetup.steps },
  }))(tn);
  class an extends g().default.Component {
    constructor(...e) {
      var t;
      return (
        (t = super(...e)),
        (this._onCloseClick = () => {
          v().transaction((e) => {
            e.sidebar.isOpen = !1;
          });
        }),
        (this._onBlurOverlayClick = () => {
          v().transaction((e) => {
            e.schedule.fcsSetup.connecting ||
              e.schedule.fcsSetup.errorCode ||
              (e.schedule.fcsSetup.showPanel = !1);
          });
        }),
        (this._onDndTipOkClick = () => {
          v().transaction((e) => {
            e.acknowledged.scheduleDndTip = Date.now();
          });
        }),
        (this._onExpandClick = () => {
          ha.toggleTab("bulk");
        }),
        t
      );
    }
    render() {
      return Glamor.createElement(p().default.ScheduleSidePanel, {
        isRefreshing: this.props.loading,
        controls: Glamor.createElement(Ha, null),
        addCard: Glamor.createElement(Qa, null),
        gridTip: this.props.dndTipShown && {
          icon: "bulb",
          content: Glamor.createElement(
            g().default.Fragment,
            null,
            Glamor.createElement("b", null, "Tips:"),
            " You can rearrange any drafts and scheduled post in a grid or calendar by dragging them with a mouse."
          ),
          buttons: [{ label: "OK, GOT IT", onClick: this._onDndTipOkClick }],
        },
        grid: Glamor.createElement(Ua, null),
        setupPanel: {
          shown: this.props.setupPanelShown,
          content: Glamor.createElement(sn, null),
        },
        onBlurOverlayClick: this._onBlurOverlayClick,
        onExpandClick: this._onExpandClick,
        onCloseClick: this._onCloseClick,
      });
    }
  }
  var nn = v().influx((e) => ({
    dndTipShown: !e.acknowledged.scheduleDndTip,
    setupPanelShown: e.schedule.fcsSetup.showPanel,
    loading: $().default.isLoading(),
  }))(an);
  g(), p(), v(), y(), g(), p(), P(), v();
  class on extends g().default.Component {
    constructor(...e) {
      var t;
      return (
        (t = super(...e)),
        (this._onCloseClick = () => {
          this.props.goToCalendarOnClose
            ? v().transaction((e) => {
                e.schedule.navigation.selectedTabId = "calendar";
              })
            : ha.closeBodyPanel();
        }),
        (this._onTagAssistClick = () => {
          v().transaction((e) => {
            e.schedule.showTagAssist = !e.schedule.showTagAssist;
          });
        }),
        t
      );
    }
    render() {
      if (!this.props.url) return null;
      const e = ns.createName("inssist-fcs", {
          theme: this.state.theme,
          fusionConfig: Cs.getConfig(),
          isElectron: !!window.electron,
        }),
        t = !1 !== P().env.features.iframes ? this.props.url : null;
      return Glamor.createElement(p().default.ScheduleFcsScreen, {
        title: this.props.title,
        loading: this.props.isLoading,
        action: this._getAction(),
        onCloseClick: this._onCloseClick,
        iframeAttrs: { name: e, allow: "geolocation", src: t },
      });
    }
    _getAction() {
      return {
        label: "# HASHTAGS",
        selected: this.props.showTagAssist,
        onClick: this._onTagAssistClick,
      };
    }
  }
  var rn = v().influx((e) => {
    let t;
    return (
      (t =
        "post" === e.schedule.navigation.selectedTabId
          ? "Create New Post"
          : "Post Details"),
      {
        title: t,
        isLoading: e.schedule.navigation.isFcsLoading,
        showTagAssist: e.schedule.showTagAssist,
        goToCalendarOnClose: e.schedule.navigation.withBackToCalendarButton,
      }
    );
  })(g().default.theme.ThemeAware(on));
  g(), p(), v(), $();
  class ln extends g().default.Component {
    constructor(...e) {
      var t;
      return (
        (t = super(...e)),
        (this._onPostDrop = (e, t) => {
          v().transaction((s) => {
            const a = s.bulk.actions[e.id] || {};
            (a.on = t), (s.bulk.actions[e.id] = a);
          });
        }),
        t
      );
    }
    render() {
      return Glamor.createElement(p().default.ScheduleCalendarScreen, {
        title: "Post Calendar",
        periodType: this.props.periodType,
        periodStart: this.props.periodStart || Date.now(),
        showSlots: this.props.showSlots,
        posts: this.props.posts,
        slots: this.props.slots,
        minMinutesFromNow: 15,
        maxDaysFromNow: 170,
        dragDisabled: this.props.isSaving,
        onDragFail: ha.blinkAddCardAttention,
        onCloseClick: ha.closeBodyPanel,
        onPeriodTypeChange: this._onPeriodTypeChange,
        onPeriodStartChange: this._onPeriodStartChange,
        onShowSlotsChange: this._onShowSlotsChange,
        onPostClick: this._onPostClick,
        onPostDrop: this._onPostDrop,
        onAddPostClick: this._onAddPostClick,
      });
    }
    _onPeriodTypeChange(e) {
      v().transaction((t) => {
        t.schedule.calendar.periodType = e;
      });
    }
    _onPeriodStartChange(e) {
      v().transaction((t) => {
        t.schedule.calendar.periodStart = e;
      });
    }
    _onShowSlotsChange(e) {
      v().transaction((t) => {
        t.schedule.calendar.showTimeSlots = e;
      });
    }
    _onAddPostClick({ dayStart: e, time: t }) {
      const s = v().model.state.schedule.timeSlots.find((e) => e.time === t);
      ha.openNewPost({ postMode: "schedule" }),
        v().transaction((a) => {
          (a.schedule.navigation.withBackToCalendarButton = !0),
            (a.schedule.dateDialog.periodStart = e),
            (a.schedule.dateDialog.selectedDay = e),
            (a.schedule.dateDialog.selectedSlotTime = s ? t : null),
            (a.schedule.dateDialog.customTime = s ? null : t);
        }),
        Ns.actualizeDataForIframe();
    }
    _onPostClick({ post: e }) {
      ha.openPost(e),
        v().transaction((e) => {
          e.schedule.navigation.withBackToCalendarButton = !0;
        });
    }
  }
  var cn = v().influx((e) => ({
    posts: $()
      .default.getPosts({ applyGridFilters: !0 })
      .filter((e) => "draft" !== e.status)
      .map((e) => ({ ...e, key: e.id })),
    slots: e.schedule.timeSlots,
    periodType: e.schedule.calendar.periodType,
    periodStart: e.schedule.calendar.periodStart,
    showSlots: e.schedule.calendar.showTimeSlots,
    isSaving: $().default.isSaving(),
  }))(ln);
  g(), p(), v(), k();
  class dn extends g().default.Component {
    constructor(...e) {
      var t;
      return (
        (t = super(...e)),
        (this._onAddSlotClick = (e) => {
          v().transaction((t) => {
            !!t.schedule.timeSlots.find((t) => t.time === e) ||
              ((t.schedule.recentScheduledOn = null),
              t.schedule.timeSlots.push({ time: e }),
              t.schedule.timeSlots.sort((e, t) => {
                let s = e.time - 5 * k().HOUR;
                s < 0 && (s = 24 * k().HOUR + s);
                let a = t.time - 5 * k().HOUR;
                return a < 0 && (a = 24 * k().HOUR + a), s - a;
              }));
          });
        }),
        (this._onDeleteSlotClick = (e) => {
          v().transaction((t) => {
            const s = t.schedule.timeSlots.findIndex((t) => t.time === e);
            -1 !== s && t.schedule.timeSlots.splice(s, 1);
          });
        }),
        t
      );
    }
    render() {
      return Glamor.createElement(p().default.ScheduleSlotsScreen, {
        title: "Time Slots",
        description: "Manage slots for quick scheduling",
        slots: this.props.slots,
        onCloseClick: ha.closeBodyPanel,
        onAddSlotClick: this._onAddSlotClick,
        onDeleteSlotClick: this._onDeleteSlotClick,
      });
    }
  }
  var un = v().influx((e) => ({ slots: e.schedule.timeSlots }))(dn);
  g(), p(), C(), v();
  class hn extends g().default.Component {
    render() {
      return this.props.url
        ? Glamor.createElement(p().default.ScheduleFallback, {
            topPanel: {
              icon: "warning-triangle",
              iconStyle: {
                width: 14,
                height: 16,
                color: g().default.color.error,
              },
              text: "Failed connecting to Facebook. Interface was switched to fallback version.",
              button: {
                label: "RETRY FB CONNECTION",
                loadingText: "Retrying...",
                color: g().default.color.link,
                isLoading: this.props.isRetryingFbConnection,
                onClick: this._onRetryClick,
              },
            },
            iframeAttrs: {
              name: ns.createName("inssist-fcs", {
                fusionConfig: Cs.getConfig(),
                isElectron: !!window.electron,
              }),
              src: this.props.url,
            },
          })
        : null;
    }
    async _onRetryClick() {
      v().transaction((e) => {
        (e.schedule.fallback.isRetryingFbConnection = !0),
          (e.schedule.fcsSetup.connected = !1);
      });
      const e = await C().iframeBus.send("schedule.fcs-check-critical-vars");
      v().transaction((t) => {
        e
          ? ((t.schedule.navigation.isOpen = !1),
            (t.schedule.navigation.selectedTabId = null),
            (t.schedule.fallback.isEnabled = !1),
            (t.schedule.fallback.isRetryingFbConnection = !1))
          : ((t.schedule.isErrorShown = !0),
            (t.schedule.fallback.isFailedToReconnect = !0),
            (t.schedule.fallback.isRetryingFbConnection = !1));
      });
    }
  }
  var mn = v().influx((e) => ({
    isRetryingFbConnection: e.schedule.fallback.isRetryingFbConnection,
  }))(hn);
  E();
  const gn = ({ visible: e }) => ({
    height: "100%",
    ...(!e && {
      ...g().default.fixed(),
      visibility: "hidden",
      pointerEvents: "none",
      opacity: 0,
    }),
  });
  class pn extends g().default.Component {
    constructor(e) {
      super(e),
        (this._onUpsellOverlayClick = () => {
          v().transaction((e) => {
            e.schedule.isUpsellShown = !1;
          });
        }),
        (this.fcsMainPageUrl = E().default(
          "https://business.facebook.com/creatorstudio",
          {
            tab: "instagram_content_posts",
            mode: "instagram",
            collection_id: "all_pages",
            content_table: "INSTAGRAM_POSTS",
            locale: "en_US",
          }
        ));
    }
    render() {
      return this.props.isFallbackEnabled
        ? Glamor.createElement(mn, { url: this.fcsMainPageUrl })
        : Glamor.createElement(
            p().default.ScheduleBodyPanel,
            {
              loading: this.props.isLoading,
              showTagAssistPanel: this.props.showTagAssist,
              onLoadingCloseClick: ha.closeBodyPanel,
              upsellOverlay: this._constructUpsellOverlay(),
              tagAssistPanel: this._constructTagAssistPanel(),
            },
            this._renderContent()
          );
    }
    _renderContent() {
      const e = this.props;
      let t = null,
        s = !1;
      return (
        "bulk" === e.selectedTabId
          ? (t = Glamor.createElement(Rs, null))
          : "calendar" === e.selectedTabId
          ? (t = Glamor.createElement(cn, null))
          : "time-slots" === e.selectedTabId
          ? (t = Glamor.createElement(un, null))
          : e.isFcsConnected && (s = !0),
        Glamor.createElement(
          g().default.Fragment,
          null,
          Glamor.createElement(
            "div",
            { css: gn({ visible: s }) },
            Glamor.createElement(rn, { url: this.fcsMainPageUrl })
          ),
          t
        )
      );
    }
    _constructUpsellOverlay() {
      return Glamor.createElement(ot, {
        show: this.props.showUpsell,
        feature: "schedule",
        onOverlayClick: this._onUpsellOverlayClick,
      });
    }
    _constructTagAssistPanel() {
      return this.props.showTagAssist
        ? Glamor.createElement(Nt, { placement: "schedule" })
        : null;
    }
  }
  var fn = v().influx((e) => {
    const t = true,
      s = e.schedule.debug || e.schedule.fcsSetup.connected;
    return {
      isLoading: !s,
      isFcsConnected: s,
      isFallbackEnabled: e.schedule.fallback.isEnabled,
      selectedTabId: e.schedule.navigation.selectedTabId,
      showUpsell: !t && s && e.schedule.isUpsellShown,
      showTagAssist: e.schedule.showTagAssist,
    };
  })(pn);
  function vn() {
    return (vn =
      Object.assign ||
      function (e) {
        for (var t = 1; t < arguments.length; t++) {
          var s = arguments[t];
          for (var a in s)
            Object.prototype.hasOwnProperty.call(s, a) && (e[a] = s[a]);
        }
        return e;
      }).apply(this, arguments);
  }
  g(), p(), C(), v();
  class Cn extends g().default.Component {
    constructor(...e) {
      var t;
      return (
        (t = super(...e)),
        (this._onCloseClick = () => {
          v().transaction((e) => {
            e.schedule.isErrorShown = !1;
          });
        }),
        (this._onRefreshClick = () => {
          v().transaction((e) => {
            (e.schedule.loading = !0),
              (e.schedule.isErrorShown = !1),
              (e.schedule.navigation.isOpen = !1),
              (e.schedule.navigation.selectedTabId = null);
          }),
            C().iframeBus.send("schedule.fcs-refresh-page");
        }),
        (this._onSwitchToFallbackClick = () => {
          v().transaction((e) => {
            (e.schedule.isErrorShown = !1),
              (e.schedule.fallback.isEnabled = !0);
          });
        }),
        t
      );
    }
    render() {
      return Glamor.createElement(
        p().default.SnackbarItem,
        { id: "schedule-error-card-mediator", show: this.props.isShown },
        Glamor.createElement(
          p().default.ScheduleErrorCard,
          vn({}, this._getErrorCardData(), { onCloseClick: this._onCloseClick })
        )
      );
    }
    _getErrorCardData() {
      return this.props.failedToReconnect
        ? {
            title: "Failed connecting to Instagram API Server",
            content:
              "\n          We experience temporary technical issues connecting\n          to Instagram API Server and some grid functionality\n          may be unavailable. We are working on fixing the problem.\n        ",
          }
        : this.props.fcsFailed
        ? {
            title: "Failed connecting to Instagram API Server",
            content:
              "\n          We experience temporary technical issues connecting\n          to Instagram API Server and some grid functionality\n          may be unavailable. We are working on fixing the problem.\n        ",
            actions: [
              { label: "REFRESH", onClick: this._onRefreshClick },
              !this.props.hideSwitchToFallbackButton && {
                label: "SWITCH TO FALLBACK VERSION",
                onClick: this._onSwitchToFallbackClick,
              },
            ],
          }
        : this.props.fcsError
        ? { title: "Instagram API error.", content: this.props.fcsError }
        : null;
    }
  }
  var yn = v().influx((e) => ({
    isShown:
      "tab-scheduling" === e.sidebar.selectedTabId &&
      e.sidebar.isOpen &&
      e.schedule.isErrorShown,
    fcsError: e.schedule.fcsError,
    fcsFailed: e.schedule.fcsFailed,
    failedToReconnect: e.schedule.fallback.isFailedToReconnect,
    hideSwitchToFallbackButton: e.schedule.fallback.hideSwitchToFallbackButton,
  }))(Cn);
  g(), p(), C(), v(), k(), $();
  const bn = ({ props: e }) => ({
    ...g().default.fixed(". 33 66 ."),
    ...g().default.transition.fast,
    zIndex: 1,
    ...(!e.isOpen && {
      opacity: 0,
      transform: "translateY(10px)",
      pointerEvents: "none",
    }),
    ...(e.showTagAssist && { right: 473 }),
  });
  class kn extends g().default.Component {
    constructor(e) {
      super(e),
        (this._onOptionClick = async (e) => {
          if (
            (v().transaction((t) => {
              t.schedule.dateDialog.selectedOption = e;
            }),
            C().iframeBus.send("schedule.fcs-date-dialog-select-option", e),
            "schedule" === e)
          ) {
            const e = await C().iframeBus.send(
              "schedule.fcs-date-dialog-get-timezone"
            );
            v().transaction((t) => {
              t.schedule.dateDialog.timezone = e;
            });
          }
          Ns.actualizeDataForIframe();
        }),
        (this._onDaySelect = (e) => {
          v().transaction((t) => {
            t.schedule.dateDialog.selectedDay = e;
          }),
            Ns.actualizeDataForIframe();
        }),
        (this._onPeriodStartChange = (e) => {
          v().transaction((t) => {
            t.schedule.dateDialog.periodStart = e;
          });
        }),
        (this._onCustomTimeInput = () => {
          v().transaction((e) => {
            e.schedule.dateDialog.isTimeError = !1;
          });
        }),
        (this._onCustomTimeChange = (e) => {
          v().transaction((t) => {
            t.schedule.dateDialog.customTime = e;
          }),
            Ns.actualizeDataForIframe();
        }),
        (this._onSlotChange = (e) => {
          v().transaction((t) => {
            (t.schedule.dateDialog.selectedSlotTime = e),
              (t.schedule.dateDialog.isTimeError = !1);
          }),
            Ns.actualizeDataForIframe();
        });
      const t = Cs.getConfig().fcs;
      this.maxDay = Date.now() + t.MAX_DAYS_FROM_NOW * k().DAY;
    }
    render() {
      return Glamor.createElement(
        "div",
        { css: bn(this) },
        Glamor.createElement(p().default.ScheduleDateDialog, {
          selectedOption: this.props.selectedOption,
          onOptionClick: this._onOptionClick,
          datePicker: this._renderDatePicker(),
          timePicker: this._renderTimePicker(),
        })
      );
    }
    _renderDatePicker() {
      return Glamor.createElement(p().default.ScheduleDatePicker, {
        periodStart: this.props.periodStart,
        maxDay: this.maxDay,
        selectedDay: this.props.selectedDay,
        onDaySelect: this._onDaySelect,
        onPeriodStartChange: this._onPeriodStartChange,
      });
    }
    _renderTimePicker() {
      let e = null;
      return (
        this.props.isTimeError &&
          (e = "should be at least 10 minutes from now"),
        Glamor.createElement(p().default.ScheduleTimePicker, {
          label: "time to publish",
          timezone: this.props.timezone,
          errorMessage: e,
          slots: this.props.slots,
          selectedSlot: this.props.selectedSlotTime,
          customTime: this.props.customTime,
          onSlotChange: this._onSlotChange,
          onCustomTimeInput: this._onCustomTimeInput,
          onCustomTimeChange: this._onCustomTimeChange,
        })
      );
    }
  }
  var wn = v().influx((e) => {
    const t = e.schedule.dateDialog,
      s = e.schedule.navigation.selectedTabId;
    return {
      isOpen:
        e.sidebar.isOpen &&
        "tab-scheduling" === e.sidebar.selectedTabId &&
        e.schedule.navigation.isOpen &&
        (!s || "post" === s) &&
        !e.schedule.isUpsellShown &&
        t.isOpen,
      slots: e.schedule.timeSlots,
      selectedOption: t.selectedOption,
      periodStart: $().default.getDateDialogPeriodStart(),
      selectedDay: $().default.getDateDialogSelectedDay(),
      selectedSlotTime: t.selectedSlotTime,
      customTime: t.customTime,
      timezone: t.timezone,
      isTimeError: t.isTimeError,
      showTagAssist: e.schedule.showTagAssist,
    };
  })(kn);
  g(), p(), v();
  const Sn = {
    content: { marginTop: g().default.space.g0h },
    errorGroup: {
      marginBottom: g().default.space.g1h,
      "&:last-child": { marginBottom: 0 },
    },
    errorGroupTitle: { ...g().default.row },
    errorFilename: (e) => ({
      fontWeight: 700,
      ...g().default.text.nowrap,
      ...(e && { ...g().default.text.ellipsis }),
    }),
    errorFilenameDivider: { opacity: 0.5, ...g().default.margin("0 g1") },
    errorGroupDescription: {
      marginTop: g().default.g0h,
      "& a": { color: g().default.color.link, ...g().default.clickable },
    },
  };
  class Tn extends g().default.Component {
    constructor(...e) {
      var t;
      return (
        (t = super(...e)),
        (this._renderContent = () => {
          const e = [];
          for (const t of this.props.fileUploadErrors) {
            let s = e.find((e) => e.type === t.type);
            s || ((s = { type: t.type, filenames: [] }), e.push(s)),
              s.filenames.push(t.filename);
          }
          return Glamor.createElement(
            "div",
            { css: Sn.content },
            e.map(this._renderErrorGroup)
          );
        }),
        (this._renderErrorGroup = (e) => {
          const t = e.filenames,
            s = t.slice(0, 2);
          return (
            t.length > 2 && s.push(t.length - 2 + " more..."),
            Glamor.createElement(
              "div",
              { css: Sn.errorGroup, key: e.type },
              Glamor.createElement(
                "div",
                { css: Sn.errorGroupTitle },
                s.map((e, t) => {
                  const a = t === s.length - 1;
                  return Glamor.createElement(
                    g().default.Fragment,
                    { key: t },
                    Glamor.createElement(
                      "div",
                      { css: Sn.errorFilename(t < 2) },
                      e
                    ),
                    !a &&
                      Glamor.createElement(
                        "span",
                        { css: Sn.errorFilenameDivider },
                        "|"
                      )
                  );
                })
              ),
              Glamor.createElement(
                "div",
                { css: Sn.errorGroupDescription },
                this._renderErrorDescription(e.type)
              )
            )
          );
        }),
        (this._renderErrorDescription = (e) =>
          "unsupported-type" === e
            ? Glamor.createElement(
                g().default.Fragment,
                null,
                "Unsupported file type. Please use PNG / JPG for photos and MP4 / MOV for videos."
              )
            : "unsupported-duration" === e
            ? Glamor.createElement(
                g().default.Fragment,
                null,
                "Instagram API does not accept videos longer than 1 minute. Please cut this video in parts with ",
                Glamor.createElement(
                  "a",
                  { href: "https://ezgif.com/cut-video", target: "_blank" },
                  "EzGif"
                ),
                " or post it directly."
              )
            : "unsupported-ratio" === e
            ? Glamor.createElement(
                g().default.Fragment,
                null,
                "Unsupported size ratio. Please check the aspect ratios Instagram supports on our ",
                Glamor.createElement(
                  "a",
                  {
                    href: "https://inssist.com/faq#images-are-cut-or-videos-do-not-upload",
                    target: "_blank",
                  },
                  "FAQ page"
                ),
                "."
              )
            : "unsupported-codec" === e
            ? Glamor.createElement(
                g().default.Fragment,
                null,
                "Unsupported video codec. A MP4-h264 or WEBM is recommended. Find more on our ",
                Glamor.createElement(
                  "a",
                  {
                    href: "https://inssist.com/faq#images-are-cut-or-videos-do-not-upload",
                    target: "_blank",
                  },
                  "FAQ page"
                ),
                "."
              )
            : "file-size-limit-reached" === e
            ? Glamor.createElement(
                g().default.Fragment,
                null,
                "The file is above ",
                Js.config.maxFileSizeStr,
                " and is too large to upload. Please resize or compress the file and try again."
              )
            : "post-count-limit-reached" === e
            ? Glamor.createElement(
                g().default.Fragment,
                null,
                "Post count limit reached. You have reached a limit of ",
                Js.config.maxPostCount,
                " local posts. Please schedule or remove some posts before adding more."
              )
            : "failed-to-read-csv" === e
            ? Glamor.createElement(
                g().default.Fragment,
                null,
                "Failed to read CSV file."
              )
            : "unknown" === e
            ? Glamor.createElement(
                g().default.Fragment,
                null,
                "Oops... Instagram did not like this file 🤭. Please try again later or pick another file."
              )
            : ""),
        (this._onCloseClick = () => {
          v().transaction((e) => {
            e.schedule.fileUploadErrors = [];
          });
        }),
        t
      );
    }
    render() {
      return Glamor.createElement(
        p().default.SnackbarItem,
        {
          id: "schedule-file-error-card-mediator",
          show: this.props.fileUploadErrors.length > 0,
        },
        Glamor.createElement(p().default.ScheduleErrorCard, {
          title: "Failed uploading files",
          content: this._renderContent(),
          onCloseClick: this._onCloseClick,
        })
      );
    }
  }
  var En = v().influx((e) => ({
      fileUploadErrors: e.schedule.fileUploadErrors,
    }))(Tn),
    _n = {
      init: function () {
        document.addEventListener("click", () => {
          C().iframeBus.send("feature-encourage.app-click");
        }),
          C().iframeBus.on("feature-encourage.toggle-creation-card", An),
          C().iframeBus.on(
            "feature-encourage.post-creation-carousel-click",
            Pn
          ),
          C().iframeBus.on(
            "feature-encourage.post-creation-schedule-click",
            In
          );
      },
    };
  function An(e) {
    v().transaction((t) => {
      t.igView.creationCardShown = e;
    });
  }
  async function Pn({ file: e, caption: t }) {
    m().gaController.sendEvent(
      "user",
      "feature-encourage:post-creation-carousel-click"
    ),
      await new Promise((s) => {
        ha.chooseFiles(async (a) => {
          v().transaction((e) => {
            (e.sidebar.isOpen = !0),
              (e.sidebar.selectedTabId = "tab-scheduling");
          }),
            await ha.addFiles([e, ...a], {
              isCarousel: !0,
              postMode: "publish",
            }),
            await C().iframeBus.send("schedule.set-caption", t, { force: !0 }),
            s();
        });
      });
  }
  async function In({ file: e, caption: t }) {
    m().gaController.sendEvent(
      "user",
      "feature-encourage:post-creation-schedule-click"
    ),
      await new Promise((s) => {
        v().transaction((e) => {
          (e.sidebar.isOpen = !0), (e.sidebar.selectedTabId = "tab-scheduling");
        }),
          setTimeout(async () => {
            await ha.addFiles([e], { isCarousel: !1, postMode: "schedule" }),
              await C().iframeBus.send("schedule.set-caption", t, {
                force: !0,
              }),
              s();
          });
      });
  }
  g(), p(), C(), y(), m(), v();
  const xn = {
    story: "feature-encourage-ig-creation-card-mediator.story",
    post: "feature-encourage-ig-creation-card-mediator.post",
    reels: "feature-encourage-ig-creation-card-mediator.reels",
    carousel: "feature-encourage-ig-creation-card-mediator.carousel",
    scheduled: "feature-encourage-ig-creation-card-mediator.scheduled",
  };
  g().default.SvgIcon.registerSvgIcons([
    `<symbol id="${xn.story}" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12.474 22.779a11.28 11.28 0 01-5.294-1.32.777.777 0 11.732-1.37 9.741 9.741 0 006.775.884.777.777 0 01.353 1.513 11.326 11.326 0 01-2.566.293zm-7.205-2.871a.773.773 0 01-.534-.213 11.218 11.218 0 01-3.2-5.509.777.777 0 011.51-.366 9.667 9.667 0 002.757 4.748.777.777 0 01-.534 1.34zm-3.221-8.651h-.077a.776.776 0 01-.7-.849 11.174 11.174 0 01.995-3.632.777.777 0 011.408.656 9.618 9.618 0 00-.854 3.122.777.777 0 01-.772.703zm3.258-6.58a.777.777 0 01-.6-1.269q.1-.127.211-.25a.777.777 0 111.171 1.02c-.062.071-.122.143-.182.215a.776.776 0 01-.6.284zm12.543 16.62a.777.777 0 01-.4-1.443 9.7 9.7 0 00-4.975-18.03.777.777 0 110-1.554 11.255 11.255 0 015.773 20.917.77.77 0 01-.398.11z" fill="currentColor"/><path d="M17.723 10.788h-4.45v-4.45H11.72v4.45H7.27v1.553h4.45v4.45h1.553v-4.45h4.45z" fill="currentColor"/></symbol>`,
    `<symbol id="${xn.post}" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"/><path d="M7.164 22.654A5.17 5.17 0 012 17.49V7.164A5.17 5.17 0 017.164 2H17.49a5.17 5.17 0 015.164 5.164V17.49a5.17 5.17 0 01-5.164 5.164zm0-1.757H17.49a3.794 3.794 0 003.41-3.407V14.8l-3.68-3.661-4.394 5.934L8 14.866 3.766 17.7a3.832 3.832 0 003.398 3.2zM3.757 7.164v8.4L7.8 12.785l4.5 2.081 4.681-6.525 3.919 3.922v-5.1a3.794 3.794 0 00-3.41-3.406H7.164a3.794 3.794 0 00-3.407 3.407zm3.943.874a1.709 1.709 0 111.7 1.708 1.709 1.709 0 01-1.7-1.708z" fill="currentColor"/></symbol>`,
    `<symbol id="${xn.reels}" viewBox="0 0 24 24"><path d="M15.548 14.007l-.006-.005-.006-.004-4.696-2.73s0 0 0 0a.736.736 0 00-.381-.113.73.73 0 00-.373.108c-.262.11-.407.371-.407.662v5.464c0 .262.155.511.398.658h0l.009.004a.899.899 0 00.352.098.88.88 0 00.314-.069l.063-.022.012-.004.012-.006 4.697-2.732h0l.001-.001a.743.743 0 00.357-.658c0-.259-.152-.505-.346-.65zM20.764 3.85h0l-.003-.004c-.534-.513-1.125-.945-1.943-1.247-.816-.301-1.85-.47-3.264-.47h-6.5c-1.394 0-2.417.169-3.233.476-.818.307-1.42.75-1.974 1.283h0l-.003.004C3.33 4.428 2.9 5.02 2.599 5.834c-.3.812-.469 1.837-.469 3.234v6.514c0 1.396.169 2.432.475 3.255.306.824.748 1.428 1.282 1.964l.002.002c.534.513 1.126.945 1.943 1.246.816.302 1.85.47 3.264.47h6.5c1.394 0 2.428-.168 3.249-.475.823-.307 1.425-.75 1.96-1.285l.001-.002c.513-.535.944-1.128 1.245-1.947.3-.817.469-1.853.469-3.27V9.068c0-1.397-.169-2.422-.475-3.24-.306-.819-.748-1.422-1.28-1.977zm-5.168-.2c1.31 0 2.174.166 2.788.41.612.244.985.567 1.314.896.466.468.897 1.045 1.149 2.216h-3.665L15.19 3.65h.406zm-6.948 0h4.734l1.991 3.522H10.64L8.648 3.65zM4.952 4.957c.435-.436.982-.87 2.065-1.12l1.897 3.336h-5.11c.25-1.17.682-1.748 1.148-2.216zm16.05 10.667c0 1.313-.167 2.178-.41 2.794-.243.613-.565.987-.894 1.316-.328.33-.712.652-1.33.896-.62.244-1.482.411-2.772.411H9.054c-1.31 0-2.174-.167-2.788-.411-.612-.243-.985-.566-1.314-.896a3.699 3.699 0 01-.893-1.332c-.244-.62-.41-1.486-.41-2.778v-6.93h17.353v6.93z" fill="currentColor" stroke="currentColor" stroke-width=".26"/></symbol>`,
    `<symbol id="${xn.carousel}" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"/><path d="M10.03 22a4.283 4.283 0 01-2.605-.876 4.363 4.363 0 01-1.539-2.212h2a2.483 2.483 0 002.14 1.235h8.647a2.474 2.474 0 002.471-2.471V9.03a2.483 2.483 0 00-1.235-2.14v-2a4.365 4.365 0 012.212 1.539A4.283 4.283 0 0123 9.03v8.647A4.329 4.329 0 0118.677 22zm-3.706-3.706A4.328 4.328 0 012 13.97V5.324A4.328 4.328 0 016.324 1h8.646a4.328 4.328 0 014.324 4.324v8.646a4.328 4.328 0 01-4.324 4.324zM3.853 5.324v8.646a2.474 2.474 0 002.471 2.471h8.646a2.474 2.474 0 002.471-2.471V5.324a2.474 2.474 0 00-2.471-2.471H6.324a2.474 2.474 0 00-2.471 2.471z" fill="currentColor"/></symbol>`,
    `<symbol id="${xn.scheduled}" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"/><path d="M13.841 1.565A9.936 9.936 0 003.906 11.5H.594l4.372 4.449 4.46-4.449H6.114a7.765 7.765 0 112.274 5.453L6.82 18.522a9.933 9.933 0 107.021-16.957zm-1.1 5.52v5.52l4.725 2.8.795-1.336-3.864-2.3V7.085z" fill="currentColor"/></symbol>`,
  ]);
  class Gn extends g().default.Component {
    constructor(...e) {
      var t;
      return (
        (t = super(...e)),
        (this._onStoryClick = () => {
          m().gaController.sendEvent("user", "feature-encourage:story-click"),
            C().iframeBus.send("feature-encourage.start-story-creation");
        }),
        (this._onPhotoVideoClick = () => {
          m().gaController.sendEvent(
            "user",
            "feature-encourage:photo-video-click"
          ),
            C().iframeBus.send("feature-encourage.start-post-creation");
        }),
        (this._onReelsClick = () => {
          m().gaController.sendEvent("user", "feature-encourage:reels-click"),
            C().iframeBus.send("feature-encourage.start-reels-creation");
        }),
        (this._onCarouselPostClick = () => {
          m().gaController.sendEvent(
            "user",
            "feature-encourage:carousel-post-click"
          ),
            this._openScheduleNewPost();
        }),
        (this._onScheduledPostClick = () => {
          m().gaController.sendEvent(
            "user",
            "feature-encourage:scheduled-post-click"
          ),
            this._openScheduleNewPost();
        }),
        (this._openScheduleNewPost = () => {
          v().transaction((e) => {
            (e.sidebar.selectedTabId = "tab-scheduling"),
              (e.sidebar.isOpen = !0);
          }),
            ha.openNewPost();
        }),
        t
      );
    }
    render() {
      return Glamor.createElement(p().default.IgCreationCard, {
        buttons: [
          { icon: xn.story, label: "STORY", onClick: this._onStoryClick },
          {
            icon: xn.post,
            label: "PHOTO / VIDEO",
            onClick: this._onPhotoVideoClick,
          },
          {
            icon: xn.reels,
            label: "REELS",
            badge: this.props.hasReelsPro ? null : "PRO",
            onClick: this._onReelsClick,
          },
          {
            icon: xn.carousel,
            label: "CAROUSEL POST",
            badge: this.props.hasScheduleAccess ? null : "PRO",
            onClick: this._onCarouselPostClick,
          },
          {
            icon: xn.scheduled,
            label: "SCHEDULED POST",
            badge: this.props.hasScheduleAccess ? null : "PRO",
            onClick: this._onScheduledPostClick,
          },
        ].filter(Boolean),
      });
    }
  }
  var Dn = v().influx((e) => ({
    hasReelsPro: true,
  }))(Gn);
  b(), m(), v(), C(), u(), y();
  var Bn = {
    init: function () {
      window.addEventListener("message", (e) => {
        "ig-patch-corrupted" === e.data.name &&
          m().gaController.sendEvent("system", "ig-patch-corrupted");
      }),
        (function () {
          let e = !1;
          window.addEventListener("hashchange", () => {
            if (e) return;
            const t = location.hash;
            if (!t.startsWith("#instagram.com/")) return;
            const s = t.split("instagram.com")[1];
            C().iframeBus.send("ig.ajax-go", s);
          }),
            C().iframeBus.on("ig.url-change", (t) => {
              e = !0;
              const s = `instagram.com${t}`;
              history.replaceState(null, null, `inssist.html#${s}`), (e = !1);
            });
        })(),
        C().iframeBus.on("ig.error", Fn),
        C().iframeBus.on("ig.path-change", On),
        C().iframeBus.on("ig.media-open", Ln),
        C().iframeBus.on("ig.media-fullscreen-enter", Mn),
        C().iframeBus.on("ig.open-sidebar-dm", Un),
        C().iframeBus.on("ig.start-conversation-in-sidebar-dm", Rn),
        C().iframeBus.on("ig.check-has-pro", Nn),
        C().iframeBus.on("ig.update-ig-view", Vn),
        C().iframeBus.on("ig.is-fullscreen", Hn);
    },
  };
  function Fn(e) {
    u().sentryController.sendError(`ig: ${e}`, "error", null, {
      actor: "instagram",
    });
  }
  function On(e) {
    e.startsWith("/stories/") ||
      e.startsWith("/direct/") ||
      localStorage.setItem("instagram-iframe-path", e);
  }
  function Mn({ url: e, currentTime: t, volume: s, muted: a, paused: n }) {
    const o = document.createElement("video"),
      i = o.requestFullscreen || o.webkitRequestFullScreen;
    document.body.appendChild(o),
      o.setAttribute("src", e),
      i.call(o),
      (o.disablePictureInPicture = !0),
      (o.currentTime = t),
      (o.volume = s),
      (o.muted = a),
      n || o.play(),
      document.addEventListener("fullscreenchange", function t() {
        document.fullscreenElement ||
          (C().iframeBus.send("ig.media-fullscreen-exit", {
            url: e,
            currentTime: o.currentTime,
            volume: o.volume,
            muted: o.muted,
          }),
          o.remove(),
          document.removeEventListener("fullscreenchange", t));
      });
  }
  function Ln({ url: e }) {
    chrome.tabs.create({ url: e, active: !0 });
  }
  function Un() {
    v().transaction((e) => {
      (e.sidebar.isOpen = !0), (e.sidebar.selectedTabId = "tab-dm");
    });
  }
  async function Rn(e) {
    C().iframeBus.send("dm.start-conversation", e),
      await b().default(120),
      Un();
  }
  function Nn() {
    return true;
  }
  async function Vn(e) {
    v().transaction((t) => {
      "fullscreenWidth" in e && (t.igView.fullscreenWidth = e.fullscreenWidth),
        "withBorder" in e && (t.igView.withBorder = e.withBorder);
    }),
      await new Promise((e) => {
        requestAnimationFrame(e);
      });
  }
  function Hn() {
    return v().model.state.igView.fullscreen;
  }
  var zn = {
    init: function () {
      Bn.init();
    },
    getInitialUrl: function () {
      let e;
      "instagram-iframe-path" in localStorage
        ? (localStorage.removeItem("instagram-iframe-url"),
          (e = `https://www.instagram.com${localStorage.getItem(
            "instagram-iframe-path"
          )}`))
        : (e =
            "instagram-iframe-url" in localStorage
              ? localStorage.getItem("instagram-iframe-url")
              : "https://www.instagram.com");
      (function (e) {
        const t = e.split("/");
        return Wn.some((e) => {
          const s = e.split("/");
          if (s.length !== t.length) return !1;
          for (let e = 0; e < t.length; e += 1) {
            const a = t[e],
              n = s[e];
            if (n !== a && (!n.startsWith("<") || !n.endsWith(">"))) return !1;
          }
          return !0;
        });
      })(
        (function (e) {
          let t = e.split("?")[0].split("/").slice(3).join("/");
          t.startsWith("/") || (t = `/${t}`);
          t.endsWith("/") || (t = `${t}/`);
          return t;
        })(e)
      ) || (e = "https://www.instagram.com");
      return e;
    },
  };
  const Wn = [
    "/",
    "/explore/",
    "/explore/people/suggested/",
    "/accounts/activity/",
    "/accounts/edit/",
    "/<username>/",
    "/<username>/followers/",
    "/<username>/following/",
    "/<username>/feed/",
    "/<username>/channel/",
    "/<username>/saved/",
    "/<username>/tagged/",
    "/<username>/reels/",
    "/p/<postId>/",
    "/reel/<postId>/",
  ];
  class $n extends g().default.Component {
    constructor(e) {
      super(e),
        (this._initIframe = () => {
          this.setState({ iframeUrl: zn.getInitialUrl() });
        }),
        (this._onIframeReady = () => {
          this.setState({ isLoadingShown: !1 });
        }),
        (this._onIframePathChange = (e) => {
          this.setState({
            isDarkBackground:
              e.startsWith("/stories/") || e.startsWith("/create/story"),
          });
        }),
        (this.state = {
          iframeUrl: null,
          isDarkBackground: !1,
          isLoadingShown: !0,
        });
    }
    componentDidMount() {
      C().iframeBus.on("ig.ready", this._onIframeReady),
        C().iframeBus.on("ig.path-change", this._onIframePathChange),
        setTimeout(this._initIframe, 70);
    }
    componentWillUnmount() {
      C().iframeBus.off("ig.ready", this._onIframeReady),
        C().iframeBus.off("ig.path-change", this._onIframePathChange);
    }
    render() {
      let e = this.state.isDarkBackground;
      return (
        "night" === this.state.theme && (e = !e),
        Glamor.createElement(p().default.IgView, {
          iframeAttrs: {
            src: !1 !== P().env.features.iframes ? this.state.iframeUrl : null,
            name: ns.createName("inssist-ig", {
              theme: this.state.theme,
              fusionConfig: Cs.getConfig(),
              isElectron: !!window.electron,
            }),
            allow: "geolocation; autoplay",
          },
          isFrameless: this.props.isFrameless,
          isDarkBackground: e,
          isLoadingShown: this.state.isLoadingShown,
          isSplashShown: this.props.isSplashShown,
          isCreationCardShown: this.props.creationCardShown,
          creationCard: Glamor.createElement(Dn, {
            hasScheduleAccess: this.props.hasScheduleAccess,
          }),
        })
      );
    }
  }
  var qn = v().influx((e) => ({
    creationCardShown: e.igView.creationCardShown,
    hasScheduleAccess: true,
  }))(g().default.theme.ThemeAware($n));
  H(), w();
  var jn = {
    init: async function () {
      const e = await H().default(chrome.tabs.getCurrent);
      w().chromeBus.send("core-web-request.popup-tab-id", e.id);
    },
  };
  g(), V(), C();
  var Yn = {
    init: function () {
      C().iframeBus.on("theme.get-theme", Zn),
        g().default.theme.onThemeChange(Kn);
    },
  };
  function Zn() {
    return g().default.theme.getTheme();
  }
  function Kn(e) {
    V().default.set("theme", e), C().iframeBus.send("theme.switch-theme", e);
  }
  C(), v(), v(), C(), m();
  var Qn = {
    init: function () {
      v().model.observe(
        (e) => e.dm.ghostModeEnabled,
        (e) => {
          C().iframeBus.send("dm.ghost-mode:toggled", e);
        }
      ),
        C().iframeBus.on("dm.ghost-mode:is-enabled", Jn),
        C().iframeBus.on("dm.ghost-mode:failed", Xn);
    },
  };
  function Jn() {
    return v().model.state.dm.ghostModeEnabled;
  }
  function Xn(e = {}) {
    v().transaction((e) => {
      (e.dm.ghostModeFailed = !0), (e.dm.ghostModeEnabled = !1);
    }),
      m().gaController.sendEvent(
        "user",
        "dm:ghost-mode-failed",
        JSON.stringify(e)
      );
  }
  var eo = {
    init: function () {
      C().iframeBus.on("dm.ig-go", to),
        C().iframeBus.on("dm.update-badge", so),
        Qn.init();
    },
  };
  function to(e) {
    C().iframeBus.send("ig.ajax-go", e);
  }
  function so(e) {
    v().transaction((t) => {
      t.dm.badgeText = e;
    });
  }
  g(), p(), P(), v(), y(), C(), m();
  class ao extends g().default.Component {
    constructor(e) {
      super(e),
        (this._onChange = ({
          filterString: e,
          filterUnread: t,
          filterFlagged: s,
          ghostModeEnabled: a,
        }) => {
          let n;
          v().transaction((e) => {
            e.dm.ghostModeEnabled !== a &&
              (a
                ? m().gaController.sendEvent("user", "dm:ghost-mode-on")
                : m().gaController.sendEvent("user", "dm:ghost-mode-off")),
              (e.dm.ghostModeEnabled = a);
          }),
            this.state.filterUnread && s && (t = !1),
            this.state.filterFlagged && t && (s = !1),
            this.setState({
              filterString: e,
              filterUnread: t,
              filterFlagged: s,
            }),
            C().iframeBus.send("dm.set-filters", {
              string: e,
              unread: t,
              flagged: s,
            }),
            e && this.state.filterString !== e
              ? (n = "dm:filter-string")
              : !this.state.filterUnread && t
              ? (n = "dm:filter-unread")
              : !this.state.filterFlagged && s && (n = "dm:filter-flagged"),
            clearTimeout(this._sendGaEventTimeout),
            n &&
              (this._sendGaEventTimeout = setTimeout(() => {
                m().gaController.sendEvent("user", n);
              }, 1e3));
        }),
        (this._onUpgradeClick = () => {
          Ge.openBilling("dm");
        }),
        (this._onCancelClick = () => {
          this._onChange({
            filterString: "",
            filterUnread: !1,
            filterFlagged: !1,
            ghostModeEnabled: !1,
          });
        }),
        (this._sendGaEventTimeout = null),
        (this.state = {
          filterString: "",
          filterUnread: !1,
          filterFlagged: !1,
        });
    }
    componentDidUpdate(e) {
      e.dmOpen && !this.props.dmOpen && C().iframeBus.send("dm.go-to-inbox");
    }
    render() {
      const e = ns.createName("inssist-dm", {
          theme: this.state.theme,
          fusionConfig: Cs.getConfig(),
          isElectron: !!window.electron,
        }),
        t =
          !1 !== P().env.features.iframes
            ? "https://www.instagram.com/direct/inbox/"
            : null;
      return Glamor.createElement(p().default.DmSidePanel, {
        iframeAttrs: { name: e, src: t, allow: "geolocation; autoplay" },
        filterString: this.state.filterString,
        filterUnread: this.state.filterUnread,
        filterFlagged: this.state.filterFlagged,
        ghostModeEnabled: this.props.ghostModeFailed
          ? null
          : this.props.ghostModeEnabled,
        ghostModeTooltip: this._getGhostModeTooltip(),
        showOverlay: this.showOverlay(),
        onChange: this._onChange,
        onUpgradeClick: this._onUpgradeClick,
        onCancelClick: this._onCancelClick,
        upsellOverlay: this._renderUpsellOverlay(),
        upsellOverlayHeaderText: Glamor.createElement(
          g().default.Fragment,
          null,
          "Ghost Mode is a PRO feature.",
          Glamor.createElement("br", null),
          "Please consider upgrading to support development."
        ),
      });
    }
    _getGhostModeTooltip() {
      return {
        title: "GHOST MODE",
        text: [
          "If enabled, the messages you read won’t be marked as seen and other users won’t know that you read their messages.",
        ],
      };
    }
    _renderUpsellOverlay() {
      return null;
    }
    showOverlay() {
      return !1;
    }
  }
  var no = v().influx((e) => ({
    dmOpen: e.sidebar.isOpen && "tab-dm" === e.sidebar.selectedTabId,
    hasDmAdvanced: true,
    ghostModeFailed: !1,
    ghostModeEnabled: Boolean(e.dm.ghostModeEnabled),
  }))(g().default.theme.ThemeAware(ao));
  w(), v();
  var oo = {
    cleanUpState: async function () {
      await new Promise((e) => {
        let t;
        w()
          .chromeBus.send("cleanup.clean-up-state")
          .then((e) => {
            t = e;
          });
        const s = v().model.observe(
          (e) => e.cleanupId,
          (a) => {
            t &&
              a === t &&
              (v().transaction((e) => {
                delete e.cleanupId;
              }),
              setTimeout(() => s()),
              e());
          }
        );
      });
    },
  };
  var io = { init: function () {} };
  m(), v(), C();
  var ro = {
    init: function () {
      C().iframeBus.on("zen.is-enabled", lo),
        C().iframeBus.on("zen.turn-off-click", uo);
    },
    toggleZenMode: co,
  };
  function lo() {
    return v().model.state.zen.enabled;
  }
  function co({ value: e = null, sendGaEvent: t = !0 } = {}) {
    v().transaction((t) => {
      t.zen.enabled = "boolean" == typeof e ? e : !t.zen.enabled;
    });
    const s = v().model.state.zen.enabled;
    t &&
      (s
        ? m().gaController.sendEvent("user", "zen:toggle-on")
        : m().gaController.sendEvent("user", "zen:toggle-off")),
      C().iframeBus.send("zen.toggled", s);
  }
  function uo() {
    co({ value: !1, sendGaEvent: !1 }),
      m().gaController.sendEvent("user", "zen:turn-off-click");
  }
  function ho(e) {
    for (let t = 0; t < e.length; t++) {
      const s = Math.floor(Math.random() * e.length),
        a = e[t];
      (e[t] = e[s]), (e[s] = a);
    }
    return e;
  }
  function mo() {
    const e = mo;
    return (
      e.data ||
        ((e.data = (function (e) {
          const t = e.categories.map((e) => ({
              id: e[0],
              emoji: e[1],
              name: e[2],
              trackIds: e[3],
            })),
            s = {};
          for (const t in e.tracks) {
            const a = e.tracks[t];
            s[t] = {
              id: a[0],
              name: a[1],
              duration: a[2],
              moods: a[3].map((t) => e.moods[t]),
            };
          }
          return { categories: t, tracks: s };
        })({
          moods: {
            1: "Dreamy",
            2: "Inspiring",
            3: "Nostalgic",
            4: "Funny",
            5: "Dark",
            7: "Tense",
            8: "Happy",
            9: "Eccentric",
            11: "Epic",
            12: "Romantic",
            13: "Euphoric",
            15: "Glamorous",
            16: "Energetic",
            17: "Exciting",
            18: "Sentimental",
            19: "Dramatic",
            20: "Sad",
            21: "Scary",
            22: "Angry",
            23: "Majestic",
            25: "Powerful",
            26: "Quirky",
            27: "Relaxed",
            31: "Hard",
            32: "Hopeful",
            33: "Mysterious",
            34: "Peaceful",
            35: "Sexy",
            36: "Suspense",
            38: "Enchanting",
            39: "Party",
            40: "Sporty",
            41: "Aesthetic",
            42: "Studying",
            43: "Neutral",
          },
          tracks: {
            171: [171, "Autumn in Fall", 137, [18, 12, 20]],
            181: [181, "One More Time", 162, [17, 2, 43]],
            188: [188, "When Summer Ends", 132, [8, 18, 12]],
            202: [202, "New Opportunities", 171, [17, 2, 32]],
            204: [204, "Travel", 144, [2, 32, 3]],
            209: [209, "This Beautiful Summer Day", 146, [16, 17, 1]],
            222: [222, "Chasing Shadows", 91, [22, 17, 16]],
            260: [260, "Follow Your Dream", 197, [1, 17, 32]],
            263: [263, "The Good News", 129, [17, 16, 2]],
            266: [266, "Tropical Adventure", 147, [16, 17, 8]],
            267: [267, "Escape From The Town", 132, [27, 8, 2]],
            282: [282, "Bringing Memories", 135, [20, 12, 18]],
            291: [291, "Pulse of Time", 147, [1, 32, 2]],
            292: [292, "A Breath Of Freedom", 163, [8, 4, 34]],
            293: [293, "Movie Funk", 142, [9, 4, 26]],
            294: [294, "Sunny Travel Day", 150, [8, 2, 34]],
            401: [401, "Be Happy", 92, [8, 17, 34]],
            402: [402, "Good Start To The Day", 160, [8, 2, 34]],
            403: [403, "Happy And Carefree Mood", 96, [8, 4, 2]],
            406: [406, "Successful Business", 134, [17, 8, 32]],
            408: [408, "Over The Horizon", 163, [1, 17, 32]],
            415: [415, "Lift Me Up", 139, [17, 2, 32]],
            428: [428, "Dreams Come True", 113, [17, 2, 43]],
            429: [429, "Drive It Now", 102, [25, 17, 16]],
            446: [446, "Morning Light", 158, [19, 11, 17]],
            450: [450, "Beautiful Moment", 131, [18, 12, 34]],
            451: [451, "Comedy Episode", 135, [43, 9, 26]],
            458: [458, "Empire on Fire", 152, [19, 7, 11]],
            459: [459, "Battle For The Universe", 161, [19, 7, 32]],
            462: [462, "Young And Free", 135, [17, 25, 16]],
            471: [471, "Everest", 161, [1, 2, 32]],
            472: [472, "Hollywood Epic", 157, [19, 11, 32]],
            482: [482, "Corporate Uplifting", 56, [27, 2, 43]],
            522: [522, "The Stomp", 93, [16, 25, 40]],
            526: [526, "Everything's All Right", 130, [1, 17, 2]],
            529: [529, "Blackout", 161, [19, 7, 11]],
            554: [554, "We Make The Future", 147, [17, 32, 2]],
            559: [559, "Discovery", 117, [19, 11, 32]],
            561: [561, "Swing With Me", 105, [9, 16, 8]],
            577: [577, "Successful Campaign", 122, [1, 2, 43]],
            621: [621, "End Of The Abyss", 180, [19, 7, 5]],
            638: [638, "Cooking Food", 132, [4, 9, 26]],
            649: [649, "Over the ocean", 208, [18, 20, 3]],
            657: [657, "Fashion House", 106, [15, 43, 1]],
            661: [661, "Time Shift", 95, [19, 11, 32]],
            729: [729, "Emotional Cello", 145, [20, 18, 34]],
            734: [734, "Evening Air", 180, [43, 2, 1]],
            774: [774, "Stomp and Claps", 83, [25, 16, 40]],
            786: [786, "Future Dance", 126, [16, 13, 8]],
            802: [802, "Here We Go!", 89, [16, 9, 8]],
            823: [823, "Successful Business Venture", 125, [43, 2]],
            838: [838, "Sunrise", 134, [2, 17]],
            843: [843, "Deep Blue Sea", 108, [1, 17, 2]],
            846: [846, "Live Your Dreams", 118, [16, 13, 8]],
            855: [855, "Phoenix", 122, [19, 7, 22]],
            856: [856, "Horizons", 123, [43, 27]],
            858: [858, "Party All Night", 228, [16, 13, 8]],
            864: [864, "Day Dreaming", 169, [27, 15, 2]],
            905: [905, "American Robbery", 132, [9, 4, 43]],
            912: [912, "Ambient Piano", 135, [1, 32, 3]],
            979: [979, "Future Hustle", 134, [25, 16, 43]],
            980: [980, "Dawnkeeper", 136, [5, 43]],
            996: [996, "Blacklist", 170, [16, 25, 22]],
            1028: [1028, "Space Discovery", 132, [43, 1]],
            1044: [1044, "Fashion Jam", 133, [27, 15, 43]],
            1081: [1081, "Modern Attraction", 180, [1, 2, 43]],
            1084: [1084, "Acoustic Folk", 124, [8, 17, 2]],
            1088: [1088, "Sad Moments", 144, [20, 18, 3]],
            1106: [1106, "Dreams of You", 145, [20, 12, 34]],
            1108: [1108, "Nostalgic Memories", 138, [20, 3, 32]],
            1211: [1211, "Tenderness", 151, [27, 12, 2]],
            1224: [1224, "Sport Action Drums", 175, [7, 19, 25]],
            1233: [1233, "Abstract Technology", 216, [43, 27, 2]],
            1234: [1234, "Beautiful Technology", 132, [43, 27, 2]],
            1242: [1242, "Wedding", 146, [18, 12, 34]],
            1275: [1275, "Summer Evening", 206, [8, 32, 2]],
            1303: [1303, "Dreams", 84, [27, 2, 43]],
            1313: [1313, "Dawn in the Mountains", 101, [19, 11, 32]],
            1315: [1315, "Texas Shuffle Blues Rock", 148, [9, 4, 26]],
            1385: [1385, "Future Chill", 123, [17, 43]],
            1402: [1402, "Breath", 117, [19, 11, 32]],
            1407: [1407, "Memories", 118, [18, 12, 27]],
            1426: [1426, "Trap", 102, [22, 25, 16]],
            1458: [1458, "Power", 199, [25, 5, 11]],
            1498: [1498, "Midnight Party", 165, [16, 8, 2]],
            1506: [1506, "Inspiration", 182, [16, 17, 32]],
            1592: [1592, "Outer Worlds", 110, [34, 3, 32]],
            1622: [1622, "Mad Rhythm", 108, [16, 25, 22]],
            1624: [1624, "I'm funny", 130, [8, 17, 34]],
            1667: [1667, "Dark Air", 161, [5, 19, 11]],
            1673: [1673, "Western Drive", 155, [25]],
            1744: [1744, "Far Planet", 120, [43]],
            1746: [1746, "Abandoned Factory", 128, [21, 5, 33]],
            1747: [1747, "Mirror", 105, [20, 3, 1]],
            1779: [1779, "Remember", 97, [20, 12, 34]],
            1796: [1796, "Runaway", 175, [27, 1, 2]],
            1812: [1812, "Night Lights", 89, [16, 25, 43]],
            1862: [1862, "Modern Sine", 148, [16, 25, 2]],
            1884: [1884, "Energy Sport", 120, [25, 16, 22]],
            1885: [1885, "Dynamic Power", 120, [25, 16, 40]],
            1921: [1921, "Clouds", 129, [35, 12, 43]],
            1946: [1946, "One Day", 115, [25, 17, 13]],
            1947: [1947, "Fun Quirky Style", 120, [8, 4, 26]],
            1948: [1948, "Dream of Memories", 142, [18, 12, 20]],
            1962: [1962, "Miami Nights", 139, [27, 35, 15]],
            1983: [1983, "Just Be Happy", 122, [8, 17, 4]],
            2041: [2041, "In Joy And In Sorrow", 127, [20, 18, 12]],
            2138: [2138, "Sport Style", 136, [25, 16, 31]],
            2161: [2161, "Stay Chilled", 96, [43, 27]],
            2184: [2184, "Intense Hybrid Trailer", 65, [19, 22, 7]],
            2191: [2191, "Hope", 91, [20, 2, 32]],
            2221: [2221, "Gentle Ambient", 158, [1, 32, 2]],
            2270: [2270, "Adventures", 82, [19, 7, 11]],
            2272: [2272, "Presentation", 167, [27, 2]],
            2274: [2274, "Power", 101, [22, 25, 16]],
            2289: [2289, "Abstract Slow Motion", 122, [43, 2]],
            2290: [2290, "Cold Northern Stars", 120, [19, 11, 5]],
            2293: [2293, "Inspiring Background", 156, [27, 1, 34]],
            2298: [2298, "Old Street", 126, [27, 26, 15]],
            2316: [2316, "Funny Chase", 100, [26, 9]],
            2351: [2351, "Smile", 151, [8, 16]],
            2375: [2375, "Business Gadgets", 125, [27, 43, 2]],
            3088: [3088, "Horror Teaser", 75, [5, 19, 21]],
            3126: [3126, "Emergency", 75, [19, 22, 5]],
            3127: [3127, "Dreamy Abstraction", 148, [27, 1, 2]],
            3130: [3130, "Storytelling", 193, [1, 32, 2]],
            3136: [3136, "Breaking Sky", 142, [19, 7, 11]],
            3154: [3154, "Evening Chill", 117, [27, 1, 34]],
            3174: [3174, "Dunkirk", 110, [19, 20, 32]],
            3211: [3211, "Funk", 76, [9, 43]],
            3220: [3220, "Sneaky Walk", 60, [26]],
            3263: [3263, "Absolute Power", 163, [11, 17, 32]],
            3264: [3264, "Escaping the Prison", 171, [19, 5, 33]],
            3290: [3290, "Space Travel", 129, [20, 1, 17]],
            3300: [3300, "Speed", 146, [25, 16, 2]],
            3301: [3301, "Funny Procession", 90, [8, 26, 4]],
            3308: [3308, "Extreme", 99, [22, 5, 11]],
            3342: [3342, "Morning Ispiration", 135, [17, 2]],
            3356: [3356, "New Year Night Party", 132, [16, 17, 8]],
            3401: [3401, "Summer Relax Chill", 190, [2, 1, 27]],
            3410: [3410, "Business Success", 133, [16, 8, 2]],
            3464: [3464, "Road Adventures", 140, [8, 17, 2]],
            3474: [3474, "Cozy Cafe", 135, [27, 26, 8]],
            3476: [3476, "New Day", 120, [27, 26, 43]],
            3499: [3499, "Warm Feeling", 127, [27, 41, 43]],
            3525: [3525, "Let's Funk", 141, [9, 16, 4]],
            3535: [3535, "Cold Star", 131, [27, 1, 43]],
            3549: [3549, "Street Sound", 114, [9, 16, 17]],
            3585: [3585, "Forgotten Memories", 90, [20, 19, 3]],
            3600: [3600, "Islands", 97, [8, 4, 26]],
            3621: [3621, "Rainy Evening", 103, [43, 20, 27]],
            3629: [3629, "Calm Place", 120, [1, 43, 34]],
            3681: [3681, "Light Steps", 93, [27, 41, 8]],
            3687: [3687, "Icarus Landing", 82, [19, 32, 2]],
            3729: [3729, "Loca Dance", 111, [16, 17, 8]],
            3735: [3735, "Escape The Dead", 97, [5, 21, 19]],
            3738: [3738, "Aesthetic Things", 141, [41, 8, 34]],
            3743: [3743, "5 AM", 140, [27, 41, 34]],
            3747: [3747, "Love Story", 139, [43, 20, 18]],
            3773: [3773, "Lonely Night", 175, [27, 43, 35]],
            3780: [3780, "Cheerful Morning", 123, [8, 2, 26]],
            3805: [3805, "Night Sky", 163, [41, 1, 2]],
            3830: [3830, "Spring Piano", 258, [1, 32, 3]],
            3835: [3835, "Stay Home", 162, [41, 43, 34]],
            3841: [3841, "Isolation", 102, [27, 41, 1]],
            3850: [3850, "Beyond the Mind", 120, [19, 7, 5]],
            3854: [3854, "Old Forest", 85, [20, 43, 32]],
            3856: [3856, "Deep Space Travel", 126, [43, 7, 5]],
            3872: [3872, "The Last Kingdom", 124, [19, 11, 17]],
            3878: [3878, "Through The Sky", 105, [16, 13, 39]],
            3881: [3881, "Blackout", 116, [19, 7, 5]],
            3882: [3882, "Journey of life", 165, [19, 11, 32]],
            3887: [3887, "In The Sky", 127, [20, 3, 32]],
            3891: [3891, "Windwalker", 127, [19, 11, 32]],
            3894: [3894, "Fantasy", 130, [11, 17, 32]],
            3914: [3914, "Brutal Fervour", 159, [19, 5, 11]],
            3928: [3928, "Outside the World", 114, [1, 11, 17]],
            3935: [3935, "The Time", 166, [19, 11, 32]],
            3955: [3955, "Vortex", 170, [19, 11, 25]],
            3957: [3957, "Such Things", 115, [8, 26]],
            3960: [3960, "Deliverance", 194, [5, 19, 11]],
            3972: [3972, "Sorrow", 114, [20, 3, 19]],
            4043: [4043, "Summer Lofi", 180, [27, 41, 1]],
            4056: [4056, "Smoke on the road", 89, [16, 31, 25]],
            4071: [4071, "Lucky One", 96, [25, 16, 17]],
            4081: [4081, "Hidden Gods", 178, [19, 5, 11]],
            4086: [4086, "Faceshot", 96, [25, 22, 5]],
            4089: [4089, "Information Flows", 182, [2, 43]],
            4091: [4091, "Dark Force", 106, [22, 5, 19]],
            4100: [4100, "Evening Wind", 120, [17, 32, 27]],
            4105: [4105, "Sad Memories", 132, [20, 18, 3]],
            4112: [4112, "Nature and Tranquility", 130, [3, 18, 34]],
            4118: [4118, "Calm Spirit", 500, [1, 32, 23]],
            4119: [4119, "Travel Vlog", 107, [17, 43, 34]],
            4125: [4125, "Happy Rocking Birthday", 103, [16, 17, 8]],
            4146: [4146, "Everything That Unites Us", 119, [17, 8, 2]],
            4148: [4148, "Future Tools", 145, [43]],
            4160: [4160, "Gamer", 96, [25, 16, 31]],
            4162: [4162, "Inspiring Piano Memories", 144, [32, 3, 18]],
            4174: [4174, "Be Happy", 160, [9, 8, 26]],
            4176: [4176, "Digital Volition", 125, [16, 5, 11]],
            4195: [4195, "Casino", 107, [9, 16, 4]],
            4201: [4201, "In A Silence", 348, [43, 1, 34]],
            4202: [4202, "Deep Forest", 348, [38, 33, 27]],
            4208: [4208, "Digital Corporate Technology", 136, [11, 25, 40]],
            4215: [4215, "Depth", 133, [5, 1, 32]],
            4231: [4231, "Sweet Heat", 122, [1, 17, 2]],
            4233: [4233, "Strange World", 142, [21, 5, 33]],
            4238: [4238, "Godfall", 96, [25, 22, 5]],
            4243: [4243, "Summer Rain", 143, [41, 1, 34]],
            4269: [4269, "Clouds", 137, [41, 1, 32]],
            4275: [4275, "New Hero", 138, [5, 19, 11]],
            4284: [4284, "Dance With Me", 140, [1, 2, 32]],
            4285: [4285, "Dreaming Ahead", 216, [1, 43, 41]],
            5019: [5019, "Vibes", 125, [27, 43, 42]],
            5023: [5023, "Fashion Deep House", 156, [43, 15]],
            5032: [5032, "Quantum Realm", 140, [19, 5, 11]],
            5037: [5037, "Apotheosis Of War", 155, [19, 7, 32]],
            5038: [5038, "Robot", 124, [5, 22, 11]],
            5039: [5039, "Simple Live", 138, [17, 32, 2]],
            5040: [5040, "Peace", 124, [41, 1, 17]],
            5057: [5057, "Cosmic", 144, [43, 27]],
            5060: [5060, "Everything You Are", 97, [27, 17]],
            5061: [5061, "Bicycle Ride", 126, [17, 4, 8]],
            5062: [5062, "Tropical Summer", 140, [13, 2]],
            5070: [5070, "Surfing!", 70, [41, 1, 17]],
            5072: [5072, "Inspire", 166, [11, 32, 2]],
            5074: [5074, "Documentary", 164, [17, 2, 43]],
            5075: [5075, "Coffeehouse", 150, [41, 1, 43]],
            5094: [5094, "New York Lounge", 153, [27, 41]],
            5100: [5100, "Supernova", 179, [11, 16, 2]],
            5108: [5108, "Travel", 152, [43, 2, 34]],
            5109: [5109, "Pop Party", 148, [16, 13, 17]],
            5116: [5116, "Morning Lights", 151, [27, 15, 1]],
            5164: [5164, "We Can Fly", 147, [19, 11, 2]],
            5169: [5169, "Funny Detective", 60, [26, 4]],
            5178: [5178, "I Wanna Be With You", 91, [27, 12]],
            5181: [5181, "Humans After Us", 182, [19, 5, 20]],
            5186: [5186, "Merging Colors", 147, [19, 2, 32]],
            5196: [5196, "Secrets of the House on the Hill", 110, [5, 21, 36]],
            5201: [5201, "End of the World", 189, [19, 11, 25]],
            5208: [5208, "The Spread of Evil", 144, [19, 11, 21]],
            5210: [5210, "Thirst For Extreme", 134, [16, 25, 22]],
            5221: [5221, "Life Is Inevitable", 136, [19, 11]],
            5234: [5234, "Last Hope", 170, [11, 19, 32]],
            5237: [5237, "Joyful Life", 115, [8, 26]],
            5240: [5240, "Braveheart", 160, [19, 7, 38]],
            5242: [5242, "Learn To Love", 156, [27, 1, 17]],
            5243: [5243, "Curious Kids", 105, [8, 9, 2]],
            5251: [5251, "Light Comedy", 108, [8, 26, 9]],
            5257: [5257, "Acoustic", 146, [1, 17, 8]],
            5261: [5261, "Comedy", 55, [26, 8, 4]],
            5264: [5264, "Born to Win", 138, [22, 5, 25]],
            5265: [5265, "Lyrical Folk", 152, [43, 1, 8]],
            5269: [5269, "The Terrifying Truth", 176, [21, 5, 33]],
            5271: [5271, "Nostalgia", 130, [20, 3]],
            5274: [5274, "Revelation", 140, [21, 5, 19]],
            5280: [5280, "Green Tea", 138, [27, 41, 1]],
            5282: [5282, "The Indie Rock", 135, [25, 22, 5]],
            5294: [5294, "For Kids", 110, [27, 26, 8]],
            5301: [5301, "Lama Tries to Cross the Road", 90, [9, 4, 26]],
            5304: [5304, "Successful Сompany", 178, [8, 27, 2]],
            5310: [5310, "Just Be Happy", 138, [8, 4, 2]],
            5312: [5312, "A Serene Day", 189, [27, 43, 1]],
            5313: [5313, "Funny Clowns", 72, [26, 23]],
            5324: [5324, "Happy Children", 166, [27, 26, 8]],
            5325: [5325, "Furry Toys", 106, [9, 4, 8]],
            5326: [5326, "Love", 115, [1, 3, 34]],
            5328: [5328, "Dance of Little Skeletons", 91, [9, 33]],
            5330: [5330, "Let's Get the Party", 101, [17, 4, 40]],
            5331: [5331, "Playful Sparrow", 96, [9, 8, 34]],
            5342: [5342, "Calming Waves", 164, [1, 2, 34]],
            5343: [5343, "Sunset Dreams", 208, [27, 1, 17]],
            5347: [5347, "Cello Concerto in D major", 72, [23, 8, 9]],
            5348: [5348, "Cello Concerto in D major №2", 68, [8, 23, 9]],
            5350: [5350, "Sneaking Out", 85, [26]],
            5352: [5352, "Scerzo in A minor", 69, [9, 23]],
            5354: [5354, "Scerzo in C minor", 84, [23, 9, 7]],
            5356: [5356, "Concerto in C minor", 71, [23, 9]],
            5361: [5361, "Concerto in E major", 92, [9, 26, 23]],
            5371: [5371, "Cybernetics", 174, [5, 1, 43]],
            5394: [5394, "Rock Spot", 75, [22, 25, 16]],
            5400: [5400, "Morning Lo-Fi", 175, [27, 41, 1]],
            5405: [5405, "News Time", 61, [43]],
            5407: [5407, "Elysium", 150, [43, 2, 11]],
            5410: [5410, "Time Loop", 184, [5, 1, 17]],
            5412: [5412, "Rooftop Sunsets", 162, [27, 26, 41]],
            5414: [5414, "Feel The Energy", 142, [25, 16, 31]],
            5415: [5415, "Late Night Latte", 177, [27, 41, 1]],
            5416: [5416, "Alone At Night", 180, [27, 41, 1]],
            5417: [5417, "Avalanche", 105, [22, 16, 31]],
            5419: [5419, "Adrenaline", 144, [16, 22, 31]],
            5423: [5423, "Lazy Bones", 93, [27, 41, 8]],
            5427: [5427, "Cheerful Clown Show", 56, [8, 9, 4]],
            5428: [5428, "Gentle Touch", 75, [20, 18, 12]],
            5429: [5429, "Heat Waves", 90, [25, 16, 1]],
            5432: [5432, "Secular", 168, [41, 1, 8]],
            5433: [5433, "Funny Playful March", 55, [8, 17, 23]],
            5436: [5436, "Let's Put On A Show!", 120, [26, 8, 9]],
            5514: [5514, "Deep Ocean Meditation", 585, [1, 33, 43]],
            5522: [5522, "Fountains", 96, [25, 16, 1]],
            5526: [5526, "Unbroken", 227, [25, 22, 11]],
            5528: [5528, "Loving Someone", 136, [43, 27, 1]],
            5529: [5529, "It's Funk O'Clock", 138, [8, 17, 16]],
            5536: [5536, "Calmness", 169, [27, 43, 41]],
            5543: [5543, "Afternoon", 154, [27, 43, 41]],
            5546: [5546, "Graceful Style", 116, [15, 43]],
            5555: [5555, "Scary Eve", 140, [9, 33, 21]],
            5556: [5556, "A Spooktacular Day", 214, [7, 5, 9]],
            5557: [5557, "Hip-Hop Halloween", 46, [9, 33]],
            5558: [5558, "Spooky Funny Halloween", 62, [9, 33, 26]],
            5563: [5563, "Funky Saxophone", 120, [16, 13, 2]],
            5566: [5566, "Fun Maker", 103, [16, 17, 26]],
            5569: [5569, "In Fashion", 115, [43, 27, 15]],
            5572: [5572, "Smooth Vibes", 176, [27, 1, 15]],
            5574: [5574, "Lovely Date", 197, [1, 38, 32]],
            5576: [5576, "Miracle", 114, [43, 27, 1]],
            5583: [5583, "Late Night Moves", 169, [1, 41, 17]],
            5587: [5587, "Body Shaking Party", 139, [15, 39]],
            5596: [5596, "Funk Electro Groove", 105, [5, 16, 17]],
            5599: [5599, "I Got You", 132, [5, 31, 25]],
            5601: [5601, "Funky Halloween", 135, [9, 33, 21]],
            5602: [5602, "Scary Hip-Hop", 98, [9, 33, 26]],
            5604: [5604, "Happy Halloween", 77, [5, 9, 33]],
            5605: [5605, "Jack-o'-lantern", 129, [5, 9, 33]],
            5606: [5606, "Halloween Jokes", 70, [9, 4, 33]],
            5611: [5611, "Vacation", 143, [25, 16, 1]],
            5612: [5612, "In A Dark Cave", 43, [21, 5, 33]],
            5616: [5616, "Distant Planet", 65, [7, 21, 5]],
            5617: [5617, "Grim Witches Party", 131, [5, 9, 33]],
            5620: [5620, "Wind Of Change", 285, [27, 43, 1]],
            5623: [5623, "Light In The Dark", 148, [25, 11, 17]],
            5624: [5624, "Sunrise", 154, [43, 1, 17]],
            5625: [5625, "Nature", 138, [1, 38, 2]],
            5626: [5626, "Childrens Holiday", 140, [17, 8, 4]],
            5627: [5627, "Children Background", 111, [8, 26, 4]],
            5628: [5628, "Children", 128, [27, 26, 8]],
            5629: [5629, "Poltergeist", 198, [5, 43, 25]],
            5634: [5634, "Charity", 130, [32, 34, 18]],
            5646: [5646, "Breathe", 115, [16, 13, 2]],
            5656: [5656, "Chill Heart", 144, [27, 1, 3]],
            5657: [5657, "Get Up", 104, [25, 16, 31]],
            5658: [5658, "Life In A Trend", 157, [27, 15, 43]],
            5659: [5659, "Beautiful Sunrise", 117, [18, 3, 32]],
            5666: [5666, "Night Shift", 131, [27, 12, 41]],
            5669: [5669, "Popular", 95, [25, 1, 13]],
            5670: [5670, "Happyish", 120, [16, 1, 13]],
            5671: [5671, "Behave", 96, [1, 17, 2]],
            5673: [5673, "Sax Days", 118, [16, 9, 39]],
            5680: [5680, "Morning In New York", 129, [27, 15, 43]],
            5683: [5683, "Beauty Of Nature", 130, [8, 27, 2]],
            5684: [5684, "The Scent Of Love", 132, [27, 15, 43]],
            5685: [5685, "Comeback", 118, [19, 25, 5]],
            5688: [5688, "Time To Breathe", 168, [16, 2, 43]],
            5689: [5689, "So Much Fun", 108, [39, 9, 26]],
            5691: [5691, "Hope", 139, [1, 17, 32]],
            5699: [5699, "Will You Marry Me", 160, [1, 32, 2]],
            5702: [5702, "Stay Together", 164, [27, 43, 41]],
            5705: [5705, "Space Cyberpunk", 159, [25, 16, 5]],
            5710: [5710, "Morning Coffee", 177, [27, 41, 8]],
            5716: [5716, "Friends", 169, [27, 8, 32]],
            5755: [5755, "Vinyl Jingle Bells", 126, [27, 17, 8]],
            5760: [5760, "Fresh Air", 148, [17, 16, 8]],
            5761: [5761, "Sunny Day", 150, [8, 17, 2]],
            5762: [5762, "Memories", 157, [20, 32, 18]],
            5765: [5765, "Love Intentions", 113, [27, 12, 41]],
            5785: [5785, "The Snatch Up", 91, [9, 4, 26]],
            5819: [5819, "War Thunder", 121, [22, 25, 31]],
            5820: [5820, "Romantic Evening In The Park", 80, [18, 12, 27]],
            5821: [5821, "Heartwarming Story", 63, [3, 18]],
            5824: [5824, "Echoes of the Mind", 124, [43, 27, 1]],
            5826: [5826, "Touching Stories", 145, [32, 2, 3]],
            5830: [5830, "Simple Joys Of Life", 137, [16, 2, 39]],
            5831: [5831, "Turn Up The Volume", 148, [8, 17, 39]],
            5833: [5833, "Remember Me", 298, [1, 38, 2]],
            5839: [5839, "Magic Flower", 145, [41, 2, 34]],
            5841: [5841, "Pleasant evening", 100, [27, 41, 43]],
            5867: [5867, "Jingle Bells Slap House (Extended)", 190, [13, 8]],
            5878: [5878, "In Search Of A Hero", 126, [11]],
            5888: [5888, "Cute Kids", 51, [8, 4, 34]],
            5889: [5889, "Lazy Summer Rain", 63, [41, 1, 2]],
            5902: [5902, "Autumn Leaves", 117, [20, 18, 3]],
            5906: [5906, "My Name Is Rock", 142, [25, 16, 17]],
            5908: [5908, "Moving Clouds", 136, [27, 43]],
            5915: [5915, "Modern Trends", 93, [16, 17, 2]],
            5916: [5916, "Lounge Cafe", 201, [27, 43, 34]],
            5922: [5922, "Time", 160, [43, 1, 38]],
            5936: [5936, "Forest Trails", 84, [20, 32, 3]],
            5937: [5937, "Calm Lake", 61, [27, 34, 42]],
            5938: [5938, "The Smell Of Spring", 158, [43, 27, 1]],
            5939: [5939, "Dance Of Leaves", 150, [27, 1, 2]],
            5940: [5940, "Light Rain", 186, [43, 27, 20]],
            5942: [5942, "Memories", 95, [20, 43, 32]],
            5946: [5946, "Beginning of the Game", 114, [22, 7, 5]],
            5947: [5947, "Morning Walk", 168, [27, 41, 8]],
            5952: [5952, "Beautiful Moments", 130, [18, 12, 34]],
            5953: [5953, "In A Jazz Mood", 162, [27, 12]],
            5955: [5955, "La Bamba", 159, [27, 8]],
            5957: [5957, "Stay Close", 124, [20, 32, 3]],
            5959: [5959, "Feeling Hopeful", 132, [27, 2, 1]],
            5977: [5977, "Slow Motion Feelings", 151, [43, 27]],
            5991: [5991, "Training Day", 120, [22, 5, 16]],
            5992: [5992, "Good Memories", 223, [27, 43, 1]],
            5995: [5995, "Sensual Flow", 138, [27, 43, 1]],
            6005: [6005, "Harmony With The World", 153, [11, 17, 32]],
            6010: [6010, "Big Band", 143, [4, 8, 26]],
            6011: [6011, "East 233rd Street", 112, [41, 34, 27]],
            6013: [6013, "In This Summer", 170, [13, 8, 2]],
            6018: [6018, "Around", 221, [22, 5, 16]],
            6020: [6020, "In The Morning Mist", 71, [1, 38, 27]],
            6022: [6022, "Speed Racer", 188, [16, 25, 40]],
            6023: [6023, "Chilling Time", 122, [41, 43, 15]],
            6024: [6024, "Future Love", 148, [2, 43, 27]],
            6026: [6026, "Beautiful People", 163, [19, 11, 17]],
            6027: [6027, "That Soaring Feeling", 119, [17, 2, 34]],
            6028: [6028, "Waiting Is Over", 126, [5, 11, 25]],
            6037: [6037, "Gameboy", 120, [41, 8, 2]],
            6070: [6070, "Birdsong", 132, [41, 1, 8]],
            6071: [6071, "Stroll", 120, [41, 1, 34]],
            6072: [6072, "Morning Coffee", 144, [41, 1, 34]],
            6073: [6073, "Alley Cat", 121, [26, 41, 34]],
            6075: [6075, "Quiet Place", 134, [41, 1, 34]],
            6076: [6076, "Rustle of Leaves", 132, [41, 1, 8]],
            6077: [6077, "Another Day", 132, [41, 1, 8]],
            6078: [6078, "Far Away", 135, [41, 1, 8]],
            6079: [6079, "The Way Home", 135, [41, 1, 8]],
            6080: [6080, "My Street", 133, [41, 1, 2]],
            6202: [6202, "Planet Zero", 190, [19, 11, 17]],
            6205: [6205, "Not Your Hero", 155, [19, 11, 32]],
          },
          categories: [
            [
              50,
              "🏙️",
              "Aerials",
              [
                5611, 5429, 5572, 5683, 5536, 5257, 3805, 5164, 5620, 3928,
                4112, 3854, 5181, 5201, 5624, 5583, 5371, 3747, 5629, 5522,
                5671, 5821, 5280, 5942, 6005, 5666, 4202, 5432, 5625, 5940,
                5543, 3835, 5186, 5312, 5938, 6080, 5936, 6037, 3972, 6071,
                3887, 5826, 5889, 5039, 5841, 5342, 5839, 5669, 6020, 6027,
              ],
            ],
            [
              2,
              "👠",
              "Fashion",
              [
                4043, 5019, 4231, 5572, 3729, 5587, 5536, 526, 5689, 5684, 5109,
                5178, 181, 5620, 5574, 4284, 5915, 5670, 5831, 5062, 1962, 5702,
                5673, 3681, 5688, 1081, 1921, 2298, 1498, 5312, 6023, 5116,
                5765, 5658, 657, 1044, 3127, 5596, 5830, 5841, 6011, 5656, 5947,
                5680, 5957, 5569, 864, 5546, 5023, 5916,
              ],
            ],
            [
              30,
              "🎥",
              "Cinema",
              [
                5072, 3914, 171, 3290, 5100, 4081, 471, 3935, 843, 559, 3891,
                621, 3960, 3955, 5037, 3735, 5181, 3882, 529, 5201, 5526, 3687,
                661, 912, 5208, 450, 3136, 3850, 458, 459, 3088, 3621, 6005,
                2290, 472, 2270, 1667, 3881, 4233, 2184, 1402, 729, 5685, 6028,
                4275, 5946, 1313, 6205, 3127, 1746,
              ],
            ],
            [
              46,
              "🤣",
              "Comedy",
              [
                5412, 5566, 5689, 1983, 3957, 5251, 5350, 5331, 5169, 5529,
                5310, 5061, 5261, 5606, 5427, 5626, 5070, 4174, 5243, 5604,
                5237, 3211, 2316, 5325, 5301, 5294, 5436, 5324, 5617, 5330,
                5313, 4125, 5605, 5555, 1315, 5328, 5433, 5347, 5348, 5354,
                5602, 5601, 5356, 5557, 5558, 5361, 5352, 5556,
              ],
            ],
            [
              36,
              "🥘",
              "Cooking",
              [
                4043, 5019, 5075, 5572, 5415, 5412, 5683, 5536, 5566, 5684,
                5178, 5620, 5915, 6079, 4100, 6076, 5953, 5702, 3681, 4243,
                5280, 5710, 3841, 6077, 5416, 5666, 5400, 6078, 5094, 5432,
                5543, 5312, 6075, 6080, 6023, 6037, 5658, 6071, 6072, 5423,
                5841, 5947, 5680, 3738, 6073, 5916, 5995, 5937, 5955, 5992,
              ],
            ],
            [
              1,
              "💼",
              "Corporate",
              [
                266, 6013, 5683, 4208, 5257, 1211, 3410, 3263, 260, 5109, 5304,
                5164, 3928, 4284, 846, 5624, 2375, 5310, 5074, 4100, 5242, 482,
                577, 263, 6005, 5265, 5716, 4174, 5040, 5108, 5528, 5405, 5186,
                4148, 4285, 838, 2272, 554, 5039, 406, 428, 4146, 5760, 3464,
                5623, 6027, 209, 1506, 3342, 5057,
              ],
            ],
            [
              4,
              "🤓",
              "Education",
              [
                3878, 4043, 5019, 4231, 266, 5075, 5572, 5415, 4119, 5412, 5683,
                5536, 5257, 5566, 471, 3743, 5684, 5109, 5178, 5304, 5620, 4284,
                5915, 5624, 5529, 5583, 4056, 5670, 202, 5074, 5062, 5061, 4100,
                5242, 5953, 5522, 5702, 5671, 5563, 3681, 3773, 4243, 5688,
                5280, 5710, 3841, 6077, 5416, 5265, 5626,
              ],
            ],
            [
              0,
              "🔥",
              "Popular",
              [
                4231, 621, 5906, 2351, 450, 5416, 5657, 5094, 5432, 4118, 5423,
                3174, 980, 1224, 4215, 5038, 5761, 4269, 3474, 5646, 2161, 649,
                6202, 774, 5274, 1028, 734, 1948, 5634, 5410, 5785, 1946, 5269,
                4201, 5240, 5867, 5908, 5755, 4089, 1385, 2191, 5032, 3126, 858,
                4176, 5959, 1592, 3264, 1812, 5060,
              ],
            ],
            [
              47,
              "📽️",
              "Filming",
              [
                5072, 4043, 5611, 5019, 4231, 5429, 5572, 3729, 5536, 5100,
                5257, 4081, 5234, 5196, 3891, 5109, 5178, 3805, 3960, 3955,
                5164, 5037, 5394, 3928, 4112, 3854, 5264, 3735, 5181, 3882,
                5201, 5624, 5583, 5526, 4056, 3687, 5371, 5208, 5074, 5612,
                3747, 3850, 5629, 5522, 5563, 3773, 5821, 4243, 5280, 5942,
              ],
            ],
            [
              27,
              "🕹️",
              "Gaming",
              [
                1458, 5611, 3914, 6013, 3308, 4091, 4081, 1426, 3935, 5234,
                4160, 222, 3960, 5394, 5264, 1862, 3735, 5906, 3882, 5526, 5419,
                5991, 4056, 5670, 3850, 5629, 5671, 5819, 4086, 5705, 5599,
                2290, 1885, 5657, 5417, 3881, 4071, 6022, 5685, 6028, 4275,
                5946, 6205, 2274, 786, 4238, 979, 5210, 5596, 6018,
              ],
            ],
            [
              10,
              "👶",
              "Kids",
              [
                5412, 5689, 292, 5251, 5350, 5331, 5169, 1947, 6079, 5310, 2351,
                5061, 403, 5261, 5606, 5427, 5626, 4174, 3525, 6070, 3780, 6075,
                293, 5243, 4195, 1624, 5604, 3600, 5888, 401, 638, 2316, 1275,
                5325, 5301, 561, 5294, 5955, 462, 5627, 905, 3356, 451, 6010,
                5324, 5330, 3220, 3301, 402, 5628,
              ],
            ],
            [
              45,
              "🏄",
              "Lifestyle",
              [
                3878, 4043, 5611, 5019, 4231, 5429, 5075, 5572, 6013, 5415,
                3729, 4119, 5587, 5412, 5683, 5536, 5257, 5689, 3743, 1983,
                5684, 5109, 4160, 5620, 3928, 3854, 5264, 3882, 4284, 5915,
                5624, 5529, 6079, 5831, 5062, 5061, 3747, 5242, 6076, 5629,
                5522, 5702, 5671, 5563, 3681, 3773, 4243, 5688, 5280, 5710,
              ],
            ],
            [
              49,
              "🌳",
              "Nature",
              [
                5072, 2293, 5683, 5257, 5234, 3805, 5164, 3928, 4112, 3854,
                5574, 5181, 3882, 5201, 5624, 3687, 5074, 3747, 3850, 5821,
                3621, 5942, 6005, 5416, 5265, 5716, 5952, 4202, 5040, 4162,
                5625, 5543, 5186, 3872, 5514, 5938, 6075, 5221, 3629, 4285,
                5936, 6037, 3972, 4118, 6071, 3894, 3887, 6072, 3127, 5826,
              ],
            ],
            [
              28,
              "🎙️",
              "Podcast",
              [
                4043, 3914, 5019, 5075, 5572, 5415, 5412, 4091, 5100, 5566,
                3743, 5684, 5178, 3955, 5037, 5620, 1862, 3735, 5583, 6079,
                4056, 3549, 5371, 5208, 3476, 6076, 5953, 5629, 5522, 5671,
                3773, 5282, 5688, 5280, 3841, 1921, 5070, 2298, 5094, 5405,
                6070, 3835, 5221, 6023, 4285, 3535, 4071, 6037, 5685, 4275,
              ],
            ],
            [
              19,
              "🧪",
              "Science",
              [
                2221, 3263, 559, 5201, 5583, 2375, 5371, 661, 912, 482, 1081,
                6005, 2290, 5343, 4148, 5977, 1746, 406, 5342, 3174, 1622, 6027,
                5407, 5922, 5878, 2289, 408, 6026, 856, 855, 291, 5824, 3830,
                1796, 3300, 446, 1233, 1303, 3585, 1234, 3856, 1028, 1744, 823,
                5576, 5616, 6024, 3401, 522, 996,
              ],
            ],
            [
              21,
              "⚽",
              "Sport",
              [
                1458, 5072, 5611, 3914, 5429, 6013, 3308, 4208, 4091, 5100,
                1426, 2138, 5414, 3935, 5234, 3891, 621, 4160, 222, 3960, 3955,
                5037, 5394, 3928, 1884, 5264, 5906, 5181, 3882, 5201, 5526,
                5419, 5991, 429, 4056, 5670, 3687, 3549, 661, 3136, 5629, 5522,
                5671, 5673, 458, 5563, 5819, 4086, 5282, 5688,
              ],
            ],
            [
              48,
              "👨‍💻",
              "Tech",
              [
                3878, 4043, 5611, 5019, 4231, 5429, 5075, 5572, 5587, 4208,
                5536, 4091, 5234, 3743, 5684, 5109, 5178, 4160, 3960, 5394,
                5620, 5906, 5181, 5201, 4284, 5915, 5583, 6079, 4056, 5371,
                5062, 5061, 5242, 3850, 5629, 5522, 5702, 5671, 5563, 3681,
                3773, 4243, 5282, 5688, 5280, 6005, 5599, 3841, 5416, 5070,
              ],
            ],
            [
              24,
              "✈️",
              "Travel",
              [
                5072, 4043, 5611, 5019, 4231, 5572, 2293, 6013, 5415, 3290,
                3729, 5412, 5683, 5536, 5257, 5566, 471, 2221, 843, 3743, 260,
                5684, 5109, 5178, 3805, 5164, 5620, 3928, 188, 5201, 5915, 846,
                5624, 5583, 6079, 202, 3687, 1673, 2351, 1084, 5074, 5062, 5061,
                3476, 4100, 294, 5242, 6076, 5953, 5522,
              ],
            ],
            [
              25,
              "🤳",
              "Vlog",
              [
                5072, 5429, 266, 5075, 5572, 2293, 3729, 3308, 5412, 5566, 1426,
                3499, 1211, 843, 526, 260, 292, 5164, 181, 5620, 1884, 1862,
                188, 5583, 429, 3549, 1673, 5831, 661, 1084, 5062, 5061, 3476,
                450, 294, 1962, 5522, 5702, 5671, 403, 3681, 3773, 263, 3154,
                415, 5710, 2290, 1921, 802, 5666,
              ],
            ],
            [
              26,
              "💍",
              "Wedding",
              [
                171, 5683, 1106, 471, 2221, 260, 4112, 5574, 188, 282, 5624,
                202, 912, 3747, 450, 5821, 5942, 5952, 1088, 4162, 267, 5940,
                5936, 729, 5765, 1747, 554, 5826, 3130, 2041, 5762, 5659, 4105,
                1407, 5957, 1108, 408, 5691, 204, 5939, 5699, 5833, 5902, 649,
                5271, 5428, 1779, 1242, 5326, 5820,
              ],
            ],
          ],
        })),
        (function (e) {
          if (!V().default.has("musicAssist.order")) {
            const t = Object.keys(e.tracks).map(Number),
              s = e.categories.map((e) => e.id).filter((e) => 0 !== e);
            V().default.set("musicAssist.order", {
              trackIds: ho(t),
              categoryIds: [0, ...ho(s)],
            });
          }
          const t = V().default.get("musicAssist.order");
          e.categories.sort(
            (e, s) => t.categoryIds.indexOf(e.id) - t.categoryIds.indexOf(s.id)
          );
          for (const s of e.categories)
            s.trackIds.sort(
              (e, s) => t.trackIds.indexOf(e) - t.trackIds.indexOf(s)
            );
        })(e.data)),
      e.data
    );
  }
  k(), C(), v(), v(), y(), V();
  const go = {
    getTrackUrl: function (e) {
      const t = v().model.state.musicAssist;
      return e
        ? "custom" === e
          ? (null === (s = t.customTrack) || void 0 === s ? void 0 : s.url) ||
            null
          : `https://storage.inssist.com/music/${e}.mp3`
        : null;
      var s;
    },
    getSelectedTrackUrl: function () {
      const e = v().model.state.musicAssist;
      return this.getTrackUrl(e.selectedTrackId);
    },
    getSelectedTrackName: function () {
      const e = v().model.state.musicAssist;
      if (!e.selectedTrackId) return null;
      if ("custom" === e.selectedTrackId) return e.customTrack.name;
      const t = mo().tracks[e.selectedTrackId];
      return t ? t.name : null;
    },
    getSelectedTrackCategory: function () {
      const e = v().model.state.musicAssist;
      if (!e.selectedTrackId) return null;
      if ("custom" === e.selectedTrackId) return null;
      const t = mo().categories.find((t) =>
        t.trackIds.includes(e.selectedTrackId)
      );
      return t || null;
    },
    canUseMusicAssist: function () {
      return (
        !!v().model.state.storyAssist.shown ||
        true
      );
    },
  };
  W(), C(), m(), v(), v(), C();
  const po = {
    init: function () {
      this._preloadFfmpeg();
    },
    observeStateDuringCreation: function (e, t) {
      let s, a;
      C().iframeBus.on("ig.creation-session-start", () => {
        clearTimeout(a), (s = v().model.observe(e, t));
      }),
        C().iframeBus.on("ig.creation-session-end", () => {
          a = setTimeout(() => {
            s && s(), (s = null);
          }, 3e3);
        });
    },
    _preloadFfmpeg: function () {
      C().iframeBus.on("ig.creation-session-start", function e({ isVideo: t }) {
        t && (Yt.load(), C().iframeBus.off("ig.creation-session-start", e));
      });
    },
  };
  Z(), C();
  const fo = {
      init: function () {
        C().iframeBus.on(
          "ig.force-small-iframe-width",
          this._forceSmallIframeWidth.bind(this)
        );
      },
      _forceSmallIframeWidth: function (e) {
        Z().$('iframe[name^="inssist-ig"]').style.width = e ? "550px" : null;
      },
    },
    vo = function () {
      po.init(), fo.init();
    };
  y(), Z(), W(), C();
  var Co = Object.assign(
    function (e, t = !1) {
      0 === yo.length &&
        ((bo = new MutationObserver((e) => {
          for (const t of yo) {
            bo.disconnect();
            try {
              t(e);
            } catch (e) {
              console.error("onDocMutations", e);
            }
            if (!bo) return;
            bo.observe(document.documentElement, {
              attributes: !0,
              childList: !0,
              subtree: !0,
            });
          }
        })),
        bo.observe(document.documentElement, {
          attributes: !0,
          childList: !0,
          subtree: !0,
        }));
      yo.push(e), t && e();
    },
    {
      off: function (e) {
        const t = yo.indexOf(e);
        if (-1 === t) return;
        yo.splice(t, 1), 0 === yo.length && (bo.disconnect(), (bo = null));
      },
    }
  );
  const yo = [];
  let bo;
  const ko = {
    init: function () {
      (this.video = null),
        (this.audio = null),
        (this.overlay = null),
        (this.helpers = null),
        (this.musicUrl = null),
        (this.musicStart = 0),
        (this.musicVolume = 0),
        (this.videoVolume = 0),
        (this.onVideoResize = this.onVideoResize.bind(this)),
        (this.onWindowResize = this.onWindowResize.bind(this)),
        (this.videoResizeObserver = null),
        this.autoRegister(),
        this.handleDataUpdates();
    },
    autoRegister: function () {
      Co(() => {
        const e = Z().$("video[music-assist-player]");
        e && !this.video
          ? this.register(e)
          : !e && this.video && this.unregister();
      });
    },
    handleDataUpdates: function () {
      ns.isIframe()
        ? C().iframeBus.on(
            "music-assist.update-player-data",
            this.applyData.bind(this)
          )
        : W().eventBus.on(
            "music-assist.update-player-data",
            this.applyData.bind(this)
          );
    },
    register: function (e) {
      document.head.insertAdjacentHTML(
        "beforeend",
        `\n      <style class="MusicAssistPlayer__style">\n        ${this.getStyles()}\n      </style>\n    `
      ),
        document.body.insertAdjacentHTML(
          "afterend",
          '\n      <div class="MusicAssistPlayer__helpers">\n        <audio class="MusicAssistPlayer__audio"></audio>\n        <div class="MusicAssistPlayer__overlay">\n          <div class="MusicAssistPlayer__spinner"></div>\n          <div class="MusicAssistPlayer__pause"></div>\n        </div>\n      </div>\n    '
        ),
        (this.video = e),
        (this.audio = document.querySelector(".MusicAssistPlayer__audio")),
        (this.style = document.querySelector(".MusicAssistPlayer__style")),
        (this.overlay = document.querySelector(".MusicAssistPlayer__overlay")),
        (this.helpers = document.querySelector(".MusicAssistPlayer__helpers")),
        this.musicUrl && (this.audio.src = this.musicUrl),
        (this.audio.volume = this.musicVolume),
        (this.video.volume = this.videoVolume),
        (this.videoResizeObserver = new ResizeObserver(this.onVideoResize)),
        this.videoResizeObserver.observe(this.video),
        window.addEventListener("resize", this.onWindowResize),
        this.updateOverlayPosition(),
        setTimeout(() => this.updateOverlayPosition(), 300),
        setTimeout(() => this.updateOverlayPosition(), 1e3),
        this.startMusicAndVideoSync(),
        this.video.addEventListener("play", () => {
          this.startMusicAndVideoSync();
        }),
        this.video.addEventListener("timeupdate", () => {
          this.video &&
            (ns.isIframe()
              ? C().iframeBus.send(
                  "music-assist.set-video-current-time",
                  this.video.currentTime
                )
              : W().eventBus.send(
                  "music-assist.set-video-current-time",
                  this.video.currentTime
                ));
        });
    },
    unregister: function () {
      this.style.remove(),
        this.helpers.remove(),
        (this.video = null),
        (this.audio = null),
        (this.style = null),
        (this.overlay = null),
        (this.helpers = null),
        this.videoResizeObserver.disconnect(this.video),
        (this.videoResizeObserver = null),
        window.removeEventListener("resize", this.onWindowResize),
        this.stopMusicAndVideoSync();
    },
    applyData: function ({
      isStory: e,
      musicUrl: t,
      musicStart: s,
      musicVolume: a,
      videoVolume: n,
    }) {
      if (!this.video)
        return (
          (this.musicUrl = t),
          (this.musicStart = s),
          (this.musicVolume = a),
          void (this.videoVolume = n)
        );
      (this.musicVolume = a),
        (this.videoVolume = n),
        t && (this.audio.volume = a),
        (!t && e) || (this.video.volume = n),
        this.musicUrl !== t &&
          ((this.musicUrl = t),
          t
            ? ((this.audio.src = t),
              (this.video.currentTime = 0),
              this.video.play())
            : (this.audio.pause(),
              this.audio.removeAttribute("src"),
              (this.video.currentTime = 0),
              this.video.pause())),
        this.musicStart !== s &&
          ((this.musicStart = s),
          t && ((this.video.currentTime = 0), this.video.play())),
        t ? this.startMusicAndVideoSync() : this.stopMusicAndVideoSync();
    },
    onVideoResize: function () {
      this.updateOverlayPosition();
    },
    onWindowResize: function () {
      this.updateOverlayPosition();
    },
    updateOverlayPosition: function () {
      if (!this.video) return;
      if (!this.overlay) return;
      const e = this.video.getBoundingClientRect();
      (this.overlay.style.top = `${e.top}px`),
        (this.overlay.style.left = `${e.left}px`),
        (this.overlay.style.width = `${e.width}px`),
        (this.overlay.style.height = `${e.height}px`);
    },
    startMusicAndVideoSync: function () {
      if (!this.musicUrl) return;
      if (this.syncEnabled) return;
      this.video.paused ||
        setTimeout(() => {
          (this.video.currentTime = this.video.currentTime), this.video.play();
        }, 100),
        (this.syncEnabled = !0);
      const e = this.video,
        t = this.audio;
      let s, a;
      (this.onPauseClick = () => {
        (this.playing = !1),
          document.documentElement.classList.toggle(
            "MusicAssistPlayer--playing",
            this.playing
          );
      }),
        document
          .querySelector(".MusicAssistPlayer__pause")
          .addEventListener("click", this.onPauseClick),
        (this.playing = !1),
        (this.ignoreSyncOnPlay = !1),
        (this.ignoreSyncOnPause = !1),
        (this.ignoreSyncOnSeeking = !1),
        (this.ignoreAudioPause = !1),
        (this.onVideoPause = () => {
          this.ignoreSyncOnPause
            ? (this.ignoreSyncOnPause = !1)
            : ((this.playing = !1),
              document.documentElement.classList.toggle(
                "MusicAssistPlayer--playing",
                this.playing
              ),
              n("pause"));
        }),
        e.addEventListener("pause", this.onVideoPause),
        (this.onVideoPlay = () => {
          this.ignoreSyncOnPlay
            ? (this.ignoreSyncOnPlay = !1)
            : ((this.playing = !0),
              document.documentElement.classList.toggle(
                "MusicAssistPlayer--playing",
                this.playing
              ),
              n("play"));
        }),
        e.addEventListener("play", this.onVideoPlay),
        (this.onVideoSeeking = () => {
          this.ignoreSyncOnSeeking
            ? (this.ignoreSyncOnSeeking = !1)
            : n("seeking");
        }),
        e.addEventListener("seeking", this.onVideoSeeking),
        (e.pauseNoSync = () => {
          e.paused || ((this.ignoreSyncOnPause = !0), e.pause());
        }),
        (e.playNoSync = () => {
          e.paused && ((this.ignoreSyncOnPlay = !0), e.play());
        });
      const n = (n) => {
        clearTimeout(a),
          (a = setTimeout(async () => {
            if ((clearTimeout(s), !this.video)) return;
            if (!this.audio) return;
            if (!this.musicUrl) return;
            e.pauseNoSync(), t.pauseNoSync();
            const a = e.currentTime;
            (this.ignoreSyncOnSeeking = !0),
              (e.currentTime = a),
              (t.currentTime = this.musicStart + a),
              (s = setTimeout(() => {
                document.documentElement.classList.add(
                  "MusicAssistPlayer--loading"
                );
              }, 300));
            const n = new Promise((e) => (t.oncanplay = e)),
              o = new Promise((t) => (e.oncanplay = t));
            await Promise.all([n, o]),
              clearTimeout(s),
              document.documentElement.classList.remove(
                "MusicAssistPlayer--loading"
              ),
              this.playing &&
                (e.playNoSync(),
                (!t.ended || t.currentTime < t.duration) && t.play());
          }));
      };
      (t.pauseNoSync = () => {
        t.paused || ((this.ignoreAudioPause = !0), t.pause());
      }),
        (this.audioOnPause = () => {
          this.ignoreAudioPause
            ? (this.ignoreAudioPause = !1)
            : t.ended || e.pauseNoSync();
        }),
        t.addEventListener("pause", this.audioOnPause);
    },
    stopMusicAndVideoSync: function () {
      (this.syncEnabled = !1),
        document.documentElement.classList.toggle(
          "MusicAssistPlayer--playing",
          !1
        ),
        document.documentElement.classList.toggle(
          "MusicAssistPlayer--loading",
          !1
        ),
        this.video &&
          (this.video.removeEventListener("pause", this.onVideoPause),
          this.video.removeEventListener("play", this.onVideoPlay),
          this.video.removeEventListener("seeking", this.onVideoSeeking)),
        this.audio &&
          this.audio.removeEventListener("pause", this.audioOnPause);
      const e = document.querySelector(".MusicAssistPlayer__pause");
      e && e.removeEventListener("click", this.onPauseClick);
    },
    getStyles: function () {
      return '\n      <style>\n        /* hide native spinner */\n        video[music-assist-player]::-webkit-media-controls {\n          visibility: hidden;\n        }\n        video[music-assist-player]::-webkit-media-controls-enclosure {\n          visibility: visible;\n        }\n\n        .MusicAssistPlayer__overlay {\n          position: fixed;\n          display: flex;\n          align-items: center;\n          justify-content: center;\n          pointer-events: none;\n          overflow: hidden;\n        }\n        html.theme-night .MusicAssistPlayer__overlay {\n          filter: url(#theme-reverse-filter); /* for injection */\n        }\n\n        .MusicAssistPlayer__spinner {\n          --size: 40px;\n          --thickness: 3px;\n          --color-bg: transparent;\n          --color-value: #fff;\n          width: var(--size);\n          height: var(--size);\n          border-radius: 50%;\n          border-top: var(--thickness) solid var(--color-bg);\n          border-right: var(--thickness) solid var(--color-value);\n          border-bottom: var(--thickness) solid var(--color-value);\n          border-left: var(--thickness) solid var(--color-value);\n          animation: MusicAssistPlayer__rotate 0.9s infinite linear;\n          filter:  drop-shadow(0 0 1px rgba(0, 0, 0, 0.16));\n          margin-top: -20px;\n        }\n        .MusicAssistPlayer__spinner::after {\n          width: 100%;\n          height: 100%;\n          border-radius: 50%;\n        }\n        html:not(.MusicAssistPlayer--loading) .MusicAssistPlayer__spinner {\n          display: none;\n        }\n        @keyframes MusicAssistPlayer__rotate {\n          0% { transform: rotate(0deg); }\n          100% { transform: rotate(360deg); }\n        }\n\n        .MusicAssistPlayer__pause {\n          width: 36px;\n          height: 36px;\n          position: absolute;\n          left: 6px;\n          bottom: 30px;\n          border-radius: 50%;\n          cursor: pointer;\n          pointer-events: all;\n          background-size: 20px;\n          background-repeat: no-repeat;\n          background-position: center;\n          background-image: url("data:image/svg+xml;base64,PHN2ZyBmaWxsPSJXaW5kb3ciIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogICAgPHBhdGggZD0iTTYgMTloNFY1SDZ2MTR6bTgtMTR2MTRoNFY1aC00eiIvPgogICAgPHBhdGggZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSIvPgo8L3N2Zz4K");\n          transition: background-color 0.3s;\n          display: none;\n        }\n        .MusicAssistPlayer__pause:hover {\n          background-color: #212123;\n        }\n        html.MusicAssistPlayer--loading.MusicAssistPlayer--playing .MusicAssistPlayer__pause {\n          display: block;\n        }\n        /* hide native pause button  */\n        html.MusicAssistPlayer--loading.MusicAssistPlayer--playing video::-webkit-media-controls-play-button {\n          visibility: hidden;\n        }\n      </style>\n    '
        .replace("<style>", "")
        .replace("</style>", "");
    },
  };
  v(), C();
  const wo = {
      init: function () {
        C().iframeBus.on(
          "music-assist.should-generate-video",
          this.shouldGenerate.bind(this)
        ),
          C().iframeBus.on(
            "music-assist.generate-video",
            this.generate.bind(this)
          );
      },
      shouldGenerate: function () {
        return !!v().model.state.musicAssist.selectedTrackId;
      },
      generate: async function (e) {
        if (!e) return;
        const t = URL.createObjectURL(e),
          s = go.getSelectedTrackUrl();
        if (!s) return;
        const a = await Ys(t),
          n = e.name.split(".").pop(),
          o = `video.${n}`,
          i = "music.mp3",
          r = `output.${n}`;
        await Yt.addFile(o, t), await Yt.addFile(i, s);
        const l = v().model.state.musicAssist,
          c = l.selectedTrackStart || 0,
          d = l.videoVolume,
          u = l.musicVolume;
        a.hasAudio
          ? await Yt.run(
              [
                `-i ${o}`,
                (c ? `-ss ${c}` : "") + " -i music.mp3",
                `-t ${a.duration}`,
                `-filter_complex [0:a]volume=${d}[a0];[1:a]volume=${u}[a1];[a0][a1]amerge`,
                "-map 0:v",
                "-map 0:a",
                "-map 1:a",
                "-c:v copy",
                "-c:a mp3",
                r,
              ].join(" ")
            )
          : await Yt.run(
              [
                `-i ${o}`,
                (c ? `-ss ${c}` : "") + " -i music.mp3",
                `-t ${a.duration}`,
                `-filter_complex [1:a]volume=${u}`,
                "-map 0:v",
                "-map 1:a",
                "-c:v copy",
                "-c:a aac",
                r,
              ].join(" ")
            );
        const h = await Yt.readFile(r, e.type);
        return (
          await Yt.removeFile(o),
          await Yt.removeFile(i),
          await Yt.removeFile(r),
          h
        );
      },
    },
    So = {
      init: function () {
        C().iframeBus.on(
          "music-assist.open-for-story-creation",
          this.openForStoryCreation.bind(this)
        ),
          C().iframeBus.on(
            "music-assist.set-video-current-time",
            this.setVideoCurrentTime.bind(this)
          ),
          W().eventBus.on(
            "music-assist.set-video-current-time",
            this.setVideoCurrentTime.bind(this)
          ),
          ko.init(),
          wo.init(),
          this.manageTrial(),
          this.sendGaStats(),
          this.updateVideoUrlOnChange(),
          this.resetStateOnCreationStart(),
          this.addTrackInfoToCaptionWhenNeeded(),
          this.sendPlayerDataUpdates();
      },
      togglePanel: function (e) {
        v().transaction((t) => {
          t.musicAssist.shown = null != e ? e : !t.musicAssist.shown;
        });
      },
      openForStoryCreation: function () {
        const e = go.getSelectedTrackCategory();
        v().transaction((t) => {
          (t.storyAssist.shown = !0),
            (t.storyAssist.selectedTabId = "music"),
            e && (t.musicAssist.selectedCategoryId = e.id);
        });
      },
      setVideoCurrentTime: function (e) {
        v().transaction((t) => {
          t.musicAssist.videoCurrentTime = e;
        });
      },
      manageTrial: function () {
        C().iframeBus.on("ig.published", (e) => {
          if (v().model.state.musicAssist.selectedTrackId)
            if (true)
              m().gaController.sendEvent("user", "pro-paid-usage:music-assist");
            else {
              if ("story-video" === e) return;
              v().transaction((e) => {
                e.billing.trial.musicAssist += 1;
              });
            }
        });
      },
      sendGaStats: function () {
        C().iframeBus.on("ig.published", () => {
          const e = v().model.state.musicAssist;
          e.selectedTrackId &&
            m().gaController.sendEvent(
              "user",
              "music-assist:submit",
              "custom" === e.selectedTrackId
                ? "custom-track"
                : e.selectedCategoryId
            );
        });
      },
      updateVideoUrlOnChange: function () {
        C().iframeBus.on("ig.creation-video-change", ({ url: e }) => {
          v().transaction((t) => {
            t.musicAssist.videoUrl = e;
          });
        });
      },
      resetStateOnCreationStart: function () {
        C().iframeBus.on("ig.creation-session-start", ({ isStory: e }) => {
          v().transaction((t) => {
            Object.assign(t.musicAssist, {
              ...y().getTemplateUserState().musicAssist,
              isStory: e,
              videoUrl: t.musicAssist.videoUrl,
              videoVolume: t.musicAssist.videoVolume,
              musicVolume: t.musicAssist.musicVolume,
              categoryIdsOrder: t.musicAssist.categoryIdsOrder,
              selectedCategoryId: t.musicAssist.selectedCategoryId,
            });
          });
        });
      },
      addTrackInfoToCaptionWhenNeeded: function () {
        po.observeStateDuringCreation(
          (e) => e.musicAssist.selectedTrackId,
          async (e) => {
            let t = await C().iframeBus.send("ig.creation-get-caption");
            (t = t.replace(/(\n\n)?🎵.*\(tunetank.com\)/g, "")),
              (() => {
                if ("custom" === e) return;
                const s = mo().tracks[e];
                if (!s) return;
                const a = `🎵 ${s.name} (tunetank.com)`;
                0 === t.trim().length
                  ? (t = a)
                  : ((t = t.replace(/\s+$/, "")), (t = `${t}\n\n${a}`));
              })(),
              C().iframeBus.send("ig.creation-set-caption", t);
          }
        );
      },
      sendPlayerDataUpdates: function () {
        const e = () => {
          const e = v().model.state.musicAssist;
          return {
            isStory: e.isStory,
            musicUrl: go.getSelectedTrackUrl(),
            musicStart: e.selectedTrackStart,
            musicVolume: e.musicVolume,
            videoVolume: e.videoVolume,
          };
        };
        po.observeStateDuringCreation(
          () => {
            const t = e();
            return [
              t.isStory,
              t.musicUrl,
              t.musicStart,
              t.musicVolume,
              t.videoVolume,
            ].join(",");
          },
          () => {
            const t = e();
            W().eventBus.send("music-assist.update-player-data", t),
              C().iframeBus.send("music-assist.update-player-data", t);
          }
        );
      },
    };
  g(), v(), g(), v(), g(), v();
  const To = {
      root: {},
      body: {
        ...g().default.relative(),
        borderRadius: 4,
        overflow: "hidden",
        ".MusicAssistPreview_collapsed &": {
          height: "0 !important",
          marginTop: -8,
        },
        ".MusicAssistPreview_animateHeight &": {
          ...g().default.transition.fast,
          transitionProperty: "height, margin-top",
        },
        ".MusicAssistPreview_story &": { height: "auto !important" },
      },
      footer: {
        ...g().default.row,
        ...g().default.alignItems.center,
        marginTop: g().default.space.g1,
        marginBottom: g().default.space.g2,
        ".MusicAssistPreview_story &": { marginTop: 0 },
      },
      video: {
        width: "100%",
        maxHeight: "100%",
        backgroundColor: g().default.color.textNormal,
        "html.theme-night &": { backgroundColor: g().default.color.bgLight2 },
        "&::-webkit-media-controls-volume-control-container": {
          display: "none",
        },
      },
      volumeBars: { flexShrink: 0, ...g().default.row },
      volumeBar: {
        ...g().default.row,
        ...g().default.alignItems.center,
        marginRight: g().default.space.g3,
        "&:last-child": { marginRight: 0 },
      },
      volumeBarIcon: {
        flexShrink: 0,
        marginRight: g().default.space.g1,
        color: g().default.color.textActionable,
        ".MusicAssistPreview__volumeBar_inactive &": {
          color: g().default.color.iconActionable,
        },
      },
      volumeBarRange: {
        width: 110,
        ".MusicAssistPreview__volumeBar_inactive &": {
          color: g().default.color.iconActionable,
        },
      },
      handle: {
        ...g().default.row,
        ...g().default.alignItems.center,
        ...g().default.justifyContent.end,
        ...g().default.relative(),
        ...g().default.transition.slow,
        top: -10,
        height: 20,
        paddingRight: 3,
        flexGrow: 1,
        color: g().default.color.textPassive,
        cursor: "ns-resize",
        "html.theme-night &": { color: g().default.color.iconPassive },
        "&:not(:hover)": { opacity: 0.8 },
        ".MusicAssistPreview:not(.MusicAssistPreview_collapsed):not(:hover) &":
          { opacity: 0, transitionDelay: "0.2s" },
        "&::before": {
          content: '""',
          width: 40,
          height: 4,
          borderRadius: 2,
          background: "currentColor",
        },
      },
    },
    Eo = "music-assist-track-mediator.volume-video",
    _o = "music-assist-track-mediator.volume-music";
  g().default.SvgIcon.registerSvgIcons([
    `<symbol id="${Eo}" viewBox="0 0 24 24"><g transform="translate(-86 -82)"><path d="M0,0H24V24H0Z" transform="translate(86 82)" fill="none"/><g transform="translate(88 83.5)"><path d="M13.815,10.658A3.158,3.158,0,1,1,10.658,7.5a3.158,3.158,0,0,1,3.158,3.158Z" transform="translate(-2.842 -2.132)" fill="currentColor"/><path d="M7.815,13.262C5.708,13.262,1.5,14.32,1.5,16.42V18H14.131V16.42C14.131,14.32,9.923,13.262,7.815,13.262Zm6.126-7.61L12.615,6.987a2.619,2.619,0,0,1,0,3.071l1.326,1.334A4.04,4.04,0,0,0,13.941,5.652ZM16.554,3,15.267,4.287a6.3,6.3,0,0,1,0,8.478l1.287,1.287A7.759,7.759,0,0,0,16.554,3Z" fill="currentColor"/></g></g></symbol>`,
    `<symbol id="${_o}" viewBox="0 0 24 24"><path d="M0 0h24v24H0Z" fill="none"/><path d="M18.5 5.438a.937.937 0 0 0-1.22-.893L7.906 7.313a.937.937 0 0 0-.656.893v7.658a4.052 4.052 0 0 0-.937-.115c-1.554 0-2.813.84-2.813 1.875s1.259 1.877 2.812 1.877 2.812-.839 2.812-1.875v-6.847l7.5-2.2v5.41a4.052 4.052 0 0 0-.937-.115c-1.553 0-2.812.839-2.812 1.875s1.259 1.875 2.812 1.875 2.813-.839 2.813-1.875V5.438Z" fill="currentColor"/></symbol>`,
  ]);
  class Ao extends g().default.Component {
    constructor(e) {
      super(e),
        (this.onVideoVolumeChange = (e) => {
          v().transaction((t) => {
            t.musicAssist.videoVolume = e;
          });
        }),
        (this.onMusicVolumeChange = (e) => {
          v().transaction((t) => {
            t.musicAssist.musicVolume = e;
          });
        }),
        (this.onHandleMouseDown = (e) => {
          1 === e.buttons &&
            ((this.resizeStartY = e.clientY),
            (this.resizeStartHeight = this.state.videoHeight),
            document.addEventListener("mousemove", this.onDocMouseMove));
        }),
        (this.onHandleDoubleClick = () => {
          this.setState({ collapsed: !this.state.collapsed });
        }),
        (this.onDocMouseMove = (e) => {
          if (1 !== e.buttons)
            return (
              document.removeEventListener("mouseup", this.onDocMouseUp, !0),
              void document.removeEventListener(
                "mousemove",
                this.onDocMouseMove
              )
            );
          const t = e.clientY - this.resizeStartY;
          let s = this.resizeStartHeight + t;
          const a = this.minVideoHeight - s > 50;
          s < this.minVideoHeight && (s = this.minVideoHeight),
            s > this.maxVideoHeight && (s = this.maxVideoHeight),
            this.setState({ videoHeight: s, collapsed: a });
        }),
        (this.minVideoHeight = 150),
        (this.maxVideoHeight = 400),
        (this.resizeStartY = 0),
        (this.resizeStartHeight = 0),
        (this.state = { collapsed: !1, videoHeight: 200, animateHeight: !1 });
    }
    getSnapshotBeforeUpdate(e, t) {
      const s = t,
        a = this.state;
      return (
        s.collapsed !== a.collapsed &&
          (this.setState({ animateHeight: !0 }),
          this.setTimeout(() => {
            this.setState({ animateHeight: !1 });
          }, 300)),
        null
      );
    }
    componentDidUpdate() {}
    render() {
      return Glamor.createElement(
        "div",
        {
          css: To.root,
          className: `\n          MusicAssistPreview\n          ${
            this.props.isStory ? "MusicAssistPreview_story" : ""
          }\n          ${
            this.state.collapsed ? "MusicAssistPreview_collapsed" : ""
          }\n          ${
            this.state.animateHeight ? "MusicAssistPreview_animateHeight" : ""
          }\n        `,
        },
        Glamor.createElement(
          "div",
          { css: To.body, style: { height: this.state.videoHeight } },
          this.renderVideo()
        ),
        Glamor.createElement(
          "div",
          { css: To.footer },
          this.renderVolumeBars(),
          this.renderHandle()
        )
      );
    }
    renderVideo() {
      return this.props.isStory
        ? null
        : Glamor.createElement("video", {
            css: To.video,
            style: { height: this.state.videoHeight },
            src: this.props.videoUrl,
            controls: !0,
            controlsList: "nodownload noremoteplayback noplaybackrate",
            "music-assist-player": "",
            disablePictureInPicture: !0,
          });
    }
    renderVolumeBars() {
      return Glamor.createElement(
        "div",
        { css: To.volumeBars },
        Glamor.createElement(
          "div",
          {
            css: To.volumeBar,
            className: `\n            MusicAssistPreview__volumeBar\n            ${
              0 === this.props.videoVolume
                ? "MusicAssistPreview__volumeBar_inactive"
                : ""
            }\n          `,
          },
          Glamor.createElement(g().default.SvgIcon, {
            style: To.volumeBarIcon,
            name: Eo,
          }),
          Glamor.createElement(g().default.Range, {
            style: To.volumeBarRange,
            value: this.props.videoVolume,
            min: 0,
            max: 1,
            step: 0.01,
            onChange: this.onVideoVolumeChange,
          })
        ),
        Glamor.createElement(
          "div",
          {
            css: To.volumeBar,
            className: `\n            MusicAssistPreview__volumeBar\n            ${
              0 === this.props.musicVolume
                ? "MusicAssistPreview__volumeBar_inactive"
                : ""
            }\n          `,
          },
          Glamor.createElement(g().default.SvgIcon, {
            style: To.volumeBarIcon,
            name: _o,
          }),
          Glamor.createElement(g().default.Range, {
            style: To.volumeBarRange,
            value: this.props.musicVolume,
            min: 0,
            max: 1,
            step: 0.01,
            onChange: this.onMusicVolumeChange,
          })
        )
      );
    }
    renderHandle() {
      return this.props.isStory || this.state.showVolumeBars
        ? null
        : Glamor.createElement("div", {
            css: To.handle,
            onMouseDown: this.onHandleMouseDown,
            onDoubleClick: this.onHandleDoubleClick,
          });
    }
  }
  var Po = v().influx((e) => ({
    isStory: e.musicAssist.isStory,
    videoUrl: e.musicAssist.videoUrl,
    videoVolume: e.musicAssist.videoVolume,
    musicVolume: e.musicAssist.musicVolume,
  }))(Ao);
  g(), v();
  const Io = {
    root: {
      ...g().default.row,
      flexWrap: "wrap",
      marginRight: -6,
      marginBottom: -6,
    },
    category: {
      marginRight: 6,
      marginBottom: 6,
      color: g().default.color.textActionable,
      background: g().default.color.borderDark,
      ...g().default.clickableInversed,
    },
    categorySelected: { color: "#fff", background: g().default.color.link },
    emoji: { marginRight: 6 },
  };
  class xo extends g().default.Component {
    constructor(e) {
      super(e),
        (this.renderCategory = (e) => {
          const t = this.props.selectedCategoryId === e.id;
          return Glamor.createElement(g().default.Pill, {
            key: e.id,
            style: [Io.category, t && Io.categorySelected],
            label: this.renderCategoryLabel(e),
            categoryId: e.id,
            onChange: this.onCategoryClick,
          });
        }),
        (this.onCategoryClick = ({ categoryId: e }) => {
          "more" !== e
            ? (this.setState({ expanded: !1 }),
              v().transaction((t) => {
                const s = t.musicAssist;
                if (
                  ((s.selectedCategoryId = e),
                  0 === s.categoryIdsOrder.length &&
                    (s.categoryIdsOrder = this.getCategories().map(
                      (e) => e.id
                    )),
                  this.state.expanded)
                ) {
                  const t = s.categoryIdsOrder.indexOf(e);
                  s.categoryIdsOrder.splice(t, 1),
                    s.categoryIdsOrder.unshift(e);
                }
              }))
            : this.setState({ expanded: !0 });
        }),
        (this.state = { expanded: !1 });
    }
    render() {
      let e;
      return (
        (e = this.state.expanded
          ? this.getCategories()
          : [
              ...this.getCategoriesSortedByUsage().slice(0, 3),
              { id: "more", name: "• • •" },
            ]),
        Glamor.createElement(
          "div",
          { css: Io.root },
          e.map(this.renderCategory)
        )
      );
    }
    renderCategoryLabel(e) {
      return Glamor.createElement(
        "span",
        { "data-id": e.id },
        e.emoji && Glamor.createElement("span", { css: Io.emoji }, e.emoji),
        Glamor.createElement("span", null, e.name.toUpperCase())
      );
    }
    getCategories() {
      return [...mo().categories];
    }
    getCategoriesSortedByUsage() {
      return this.getCategories().sort(
        (e, t) =>
          this.props.categoryIdsOrder.indexOf(e.id) -
          this.props.categoryIdsOrder.indexOf(t.id)
      );
    }
  }
  var Go = v().influx((e) => ({
    selectedCategoryId: e.musicAssist.selectedCategoryId,
    categoryIdsOrder: e.musicAssist.categoryIdsOrder,
  }))(xo);
  g(), v();
  const Do = {
      root: {
        ...g().default.row,
        ...g().default.alignItems.center,
        ...g().default.padding("11 15"),
        ...g().default.relative(),
        width: "100%",
        background: g().default.color.bgLight2,
        borderRadius: 4,
        border: `2px dashed ${g().default.color.iconPassive}`,
        ...g().default.transition.fast,
        transitionProperty: "border-color",
      },
      rootDragOver: { borderColor: g().default.color.iconActionable },
      icon: {
        color: g().default.color.iconPassive,
        marginRight: g().default.space.g2,
      },
      body: {},
      title: {
        fontSize: 14,
        fontWeight: 600,
        lineHeight: "18px",
        color: g().default.color.link,
      },
      description: {
        fontSize: 12,
        fontWeight: 500,
        lineHeight: "15px",
        color: g().default.color.textBleak,
        marginTop: g().default.space.g0h,
      },
      input: {
        ...g().default.absolute("0 0 0 0"),
        opacity: 0,
        cursor: "pointer",
      },
    },
    Bo = "igswiss.upload";
  class Fo extends g().default.Component {
    constructor(e) {
      super(e),
        (this.onChange = async (e) => {
          this.setState({ dragOver: !1 });
          const t = e.target.files[0];
          if (!t) return;
          if (!this.allowedTypes.includes(t.type)) return;
          if (t.size > this.maxFileSize)
            return void alert(
              `File is too large. Max file size is ${this.maxFileSizeStr}.`
            );
          const s = URL.createObjectURL(t),
            a = await new Promise((e) => {
              const t = new Audio();
              (t.src = s),
                t.addEventListener("loadedmetadata", (s) => {
                  e(t.duration);
                });
            });
          v().transaction((e) => {
            (e.musicAssist.customTrack = {
              url: s,
              name: t.name,
              size: t.size,
              duration: a,
            }),
              go.canUseMusicAssist() &&
                ((e.musicAssist.selectedTrackId = "custom"),
                (e.musicAssist.selectedTrackStart = 0));
          });
        }),
        (this.onDragEnter = (e) => {
          e.dataTransfer.items[0] && this.setState({ dragOver: !0 });
        }),
        (this.onDragLeave = () => {
          this.setState({ dragOver: !1 });
        }),
        (this.maxFileSize = 3e7),
        (this.maxFileSizeStr = "30MB"),
        (this.allowedTypes = ["audio/mpeg"]),
        (this.state = { dragOver: !1 });
    }
    render() {
      return Glamor.createElement(
        "div",
        { css: [Do.root, this.state.dragOver && Do.rootDragOver] },
        Glamor.createElement(g().default.SvgIcon, { style: Do.icon, name: Bo }),
        Glamor.createElement(
          "div",
          { css: Do.body },
          Glamor.createElement("div", { css: Do.title }, "UPLOAD CUSTOM .MP3"),
          Glamor.createElement(
            "div",
            { css: Do.description },
            "Click or drag & drop an audio file to use."
          )
        ),
        Glamor.createElement("input", {
          css: Do.input,
          type: "file",
          accept: this.allowedTypes.join(","),
          onChange: this.onChange,
          onDragEnter: this.onDragEnter,
          onDragLeave: this.onDragLeave,
        })
      );
    }
  }
  g(), v(), g(), v();
  const Oo = {
      root: {
        ...g().default.row,
        ...g().default.alignItems.center,
        ...g().default.padding("g1 g2"),
        width: "100%",
        "&:not(.MusicAssistTrack_selected)": { cursor: "pointer" },
      },
      playButton: {
        ...g().default.row,
        ...g().default.alignItems.center,
        ...g().default.justifyContent.center,
        ...g().default.transition.fast,
        transitionProperty: "color",
        marginRight: g().default.space.g1h,
        flexShrink: 0,
        width: 36,
        height: 36,
        border: "2px solid",
        borderRadius: "50%",
        color: g().default.color.textPassive,
        ".MusicAssistTrack_selected &": {
          color: "#FFF",
          background: g().default.color.link,
          border: "none",
          ...g().default.clickable,
        },
        ".MusicAssistTrack:not(.MusicAssistTrack_selected):hover &": {
          color: g().default.color.iconActionable,
        },
        "html.theme-night .MusicAssistTrack:not(.MusicAssistTrack_selected):hover &":
          { color: g().default.color.textActionable },
      },
      body: { flexGrow: 1, minWidth: 0, whiteSpace: "nowrap" },
      actions: {
        display: "none",
        marginLeft: g().default.space.g1h,
        ".MusicAssistTrack:hover &": { display: "flex" },
      },
      action: {
        color: g().default.color.link,
        ...g().default.clickable,
        ...g().default.relative(),
        "&::before": { content: '""', ...g().default.absolute("-8 -8 -8 -8") },
        "&:first-child::before": { right: -4 },
        "&:last-child::before": { left: -4 },
      },
      header: {
        ...g().default.row,
        ...g().default.justifyContent.between,
        ...g().default.alignItems.baseline,
      },
      subheader: { height: 14, marginTop: 2 },
      name: {
        fontSize: 14,
        fontWeight: 600,
        textOverflow: "ellipsis",
        overflow: "hidden",
      },
      startLabel: {
        marginLeft: g().default.space.g1,
        fontSize: 12,
        fontWeight: 500,
        color: g().default.color.textPassive,
        fontVariantNumeric: "tabular-nums",
      },
      info: {
        fontSize: 12,
        lineHeight: "14px",
        fontWeight: 500,
        color: g().default.color.textPassive,
        textOverflow: "ellipsis",
        overflow: "hidden",
      },
    },
    Mo = "music-assist-track-mediator.play",
    Lo = "music-assist-track-mediator.tick",
    Uo = "music-assist-track-mediator.download",
    Ro = "music-assist-track-mediator.open";
  g().default.SvgIcon.registerSvgIcons([
    `<symbol id="${Mo}" _dx="7%" viewBox="0 0 15.369 16.881"><path d="M13.973 6.019a2.8 2.8 0 0 1 0 4.842l-9.779 5.642A2.8 2.8 0 0 1 0 14.08V2.799A2.8 2.8 0 0 1 4.191.38Z" fill="currentColor"/></symbol>`,
    `<symbol id="${Lo}" viewBox="0 0 23.409 16.721"><path d="M8.36 16.721 0 8.36l1.672-1.672L8.36 11.7 21.737 0l1.672 1.672L8.36 16.721Z" fill="currentColor" fill-rule="evenodd"/></symbol>`,
    `<symbol id="${Uo}" viewBox="0 0 23 23"><path fill="none" d="M0 0h23v23H0z"/><path d="M5.501 18.016v-2h12v2Zm1.35-7.979 1.068-1.068 2.3 2.3V4.983h2.4v6.283l2.334-2.333 1.064 1.064-4.6 4.6Z" fill="currentColor"/></symbol>`,
    `<symbol id="${Ro}" viewBox="0 0 23 23"><path fill="none" d="M0 0h23v23H0z"/><path d="M5 17.794V7.4h6.234L9.157 9.481H7.079v6.234h6.234v-2.077l2.079-2.079v6.235Zm4.313-6.079 5.351-5.352h-3.429V4.8H18v6.708h-1.569V8.13l-5.351 5.352Z" fill="currentColor"/></symbol>`,
  ]);
  class No extends g().default.Component {
    constructor(...e) {
      var t;
      return (
        (t = super(...e)),
        (this.onClick = () => {
          this.props.selected ||
            v().transaction((e) => {
              go.canUseMusicAssist()
                ? ((e.musicAssist.selectedTrackId = this.props.trackId),
                  (e.musicAssist.selectedTrackStart = 0),
                  (e.musicAssist.videoCurrentTime = 0))
                : (e.musicAssist.showUpsellOverlay = !0);
            });
        }),
        (this.onPlayButtonClick = () => {
          this.props.selected &&
            v().transaction((e) => {
              (e.musicAssist.selectedTrackId = null),
                (e.musicAssist.selectedTrackStart = 0),
                (e.musicAssist.videoCurrentTime = 0);
            });
        }),
        (this.onDownloadClick = async (e) => {
          e.stopPropagation(),
            chrome.permissions.request({ permissions: ["downloads"] }, (e) => {
              e &&
                chrome.downloads.download({
                  url: this.props.url,
                  filename: this.props.filename,
                });
            });
        }),
        (this.onOpenClick = (e) => {
          e.stopPropagation(),
            chrome.tabs.create({ url: this.props.url, active: !0 });
        }),
        (this.onStartChange = (e) => {
          v().transaction((t) => {
            t.musicAssist.selectedTrackStart = e;
          });
        }),
        t
      );
    }
    render() {
      return this.props.url
        ? Glamor.createElement(
            "div",
            {
              css: Oo.root,
              className:
                "MusicAssistTrack " +
                (this.props.selected ? "MusicAssistTrack_selected" : ""),
              onClick: this.onClick,
            },
            this.renderPlayButton(),
            this.renderBody(),
            this.renderActions()
          )
        : null;
    }
    renderPlayButton() {
      return Glamor.createElement(
        "div",
        { css: Oo.playButton, onClick: this.onPlayButtonClick },
        this.props.selected
          ? Glamor.createElement(g().default.SvgIcon, {
              style: { width: 17 },
              name: Lo,
            })
          : Glamor.createElement(g().default.SvgIcon, {
              style: { width: 12 },
              name: Mo,
            })
      );
    }
    renderBody() {
      return Glamor.createElement(
        "div",
        { css: Oo.body },
        Glamor.createElement(
          "div",
          { css: Oo.header },
          this.renderName(),
          this.renderStartLabel()
        ),
        Glamor.createElement(
          "div",
          { css: Oo.subheader },
          this.renderInfo(),
          this.renderRange()
        )
      );
    }
    renderActions() {
      return this.props.selected
        ? null
        : Glamor.createElement(
            "div",
            { css: Oo.actions },
            Glamor.createElement(
              "div",
              { css: Oo.action, onClick: this.onDownloadClick },
              Glamor.createElement(g().default.SvgIcon, { name: Uo })
            ),
            Glamor.createElement(g().default.Spacer, { width: "g1" }),
            Glamor.createElement(
              "div",
              { css: Oo.action, onClick: this.onOpenClick },
              Glamor.createElement(g().default.SvgIcon, { name: Ro })
            )
          );
    }
    renderName() {
      return Glamor.createElement("div", { css: Oo.name }, this.props.name);
    }
    renderStartLabel() {
      if (!this.props.selected) return null;
      const e = this.renderTime(this.props.start),
        t = this.renderTime(this.props.duration);
      return Glamor.createElement(
        "div",
        { css: Oo.startLabel },
        "Start at ",
        e,
        " / ",
        t
      );
    }
    renderTime(e) {
      const t = Math.floor(e / 60),
        s = Math.floor(e - 60 * t),
        a = t.toString().padStart(2, 0),
        n = s.toString().padStart(2, 0);
      return Glamor.createElement(React.Fragment, null, a, ":", n);
    }
    renderInfo() {
      return this.props.selected
        ? null
        : Glamor.createElement("div", { css: Oo.info }, this.props.info);
    }
    renderRange() {
      return this.props.selected
        ? Glamor.createElement(g().default.Range, {
            value: this.props.start,
            step: 1,
            min: 0,
            max: this.props.duration,
            extraValue: this.props.start + this.props.progress,
            onChange: this.onStartChange,
          })
        : null;
    }
  }
  var Vo = v().influx((e, t) => {
    const s = t.trackId,
      a = e.musicAssist.selectedTrackId === s;
    if ("custom" === s) {
      const t = e.musicAssist.customTrack;
      return t
        ? {
            url: t.url,
            name: t.name,
            filename: t.name,
            info: Math.round((t.size / 1e3 / 1e3) * 10) / 10 + " MB",
            start: a ? e.musicAssist.selectedTrackStart : 0,
            progress: a ? e.musicAssist.videoCurrentTime : 0,
            duration: t.duration,
            selected: a,
          }
        : {};
    }
    {
      const t = mo().tracks[s];
      return t
        ? {
            url: go.getTrackUrl(t.id),
            name: t.name,
            filename: `${t.name}.mp3`,
            info: t.moods.join(" • "),
            start: a ? e.musicAssist.selectedTrackStart : 0,
            progress: a ? e.musicAssist.videoCurrentTime : 0,
            duration: t.duration,
            selected: a,
          }
        : {};
    }
  })(No);
  const Ho = { root: { marginLeft: -16, marginRight: -16 } };
  class zo extends g().default.Component {
    render() {
      return Glamor.createElement(
        "div",
        { css: Ho.root },
        this.props.hasCustomTrack &&
          Glamor.createElement(Vo, { key: "custom", trackId: "custom" }),
        this.props.trackIds.map((e) =>
          Glamor.createElement(Vo, { key: e, trackId: e })
        )
      );
    }
  }
  var Wo = v().influx((e) => {
    const t = e.musicAssist;
    return {
      trackIds: mo().categories.find((e) => e.id === t.selectedCategoryId)
        .trackIds,
      hasCustomTrack: !!t.customTrack,
    };
  })(zo);
  g(), v();
  const $o = {
    root: {},
    panel: {
      borderTop: g().default.border.dark,
      paddingTop: g().default.space.g1h,
      marginBottom: g().default.space.g1h,
    },
    panelBody: { ...g().default.row, marginBottom: g().default.space.g1 },
    panelIcon: {
      width: 18,
      flexShrink: 0,
      color: g().default.color.attention,
      marginRight: g().default.space.g1h,
    },
    panelText: { ...g().default.text.bleak },
  };
  class qo extends g().default.Component {
    constructor(...e) {
      var t;
      return (
        (t = super(...e)),
        (this.onUpgradeClick = () => {
          Ge.openBilling("music-assist");
        }),
        (this.onUpsellOverlayClick = () => {
          v().transaction((e) => {
            e.musicAssist.showUpsellOverlay = !1;
          });
        }),
        t
      );
    }
    render() {
      return this.props.canUseMusicAssist
        ? null
        : Glamor.createElement(
            "div",
            { css: $o.root },
            this.renderPanel(),
            this.renderUpsellOverlay()
          );
    }
    renderPanel() {
      return Glamor.createElement(
        "div",
        { css: $o.panel },
        Glamor.createElement(
          "div",
          { css: $o.panelBody },
          Glamor.createElement(g().default.SvgIcon, {
            style: $o.panelIcon,
            name: "warning-triangle",
          }),
          Glamor.createElement(
            "div",
            { css: $o.panelText },
            "Please consider upgrading to ",
            Glamor.createElement("b", null, "add music"),
            " to video",
            Glamor.createElement("br", null),
            "and support development."
          )
        ),
        Glamor.createElement(g().default.ActionButton, {
          label: "UPGRADE TO PRO",
          color: g().default.color.textInversed,
          background: g().default.color.attention,
          onClick: this.onUpgradeClick,
        })
      );
    }
    renderUpsellOverlay() {
      return Glamor.createElement(ot, {
        show: this.props.showUpsellOverlay,
        feature: "music-assist",
        onOverlayClick: this.onUpsellOverlayClick,
      });
    }
  }
  var jo = v().influx((e) => ({
    canUseMusicAssist: go.canUseMusicAssist(),
    showUpsellOverlay: e.musicAssist.showUpsellOverlay,
  }))(qo);
  const Yo = {
    disclaimer: {
      color: g().default.color.textBleak,
      fontWeight: 500,
      lineHeight: "15px",
    },
    scroll: {
      flexGrow: 1,
      overflow: "auto",
      marginLeft: -16,
      marginRight: -16,
      paddingLeft: 16,
      paddingRight: 16,
      paddingBottom: g().default.space.g1,
    },
  };
  class Zo extends g().default.Component {
    render() {
      return Glamor.createElement(
        React.Fragment,
        null,
        Glamor.createElement(Po, null),
        this.renderDisclaimer(),
        Glamor.createElement(g().default.Spacer, { height: "g1h" }),
        Glamor.createElement(Go, null),
        Glamor.createElement(g().default.Spacer, { height: "g1" }),
        Glamor.createElement(
          "div",
          { css: Yo.scroll, key: this.props.selectedCategoryId },
          Glamor.createElement(g().default.Spacer, { height: "g1" }),
          Glamor.createElement(Fo, null),
          Glamor.createElement(g().default.Spacer, { height: "g1" }),
          Glamor.createElement(Wo, null)
        ),
        Glamor.createElement(jo, null)
      );
    }
    renderDisclaimer() {
      return Glamor.createElement(
        "div",
        { css: Yo.disclaimer },
        "Royalty-free music is provided by ",
        Glamor.createElement(
          "a",
          { href: "https://tunetank.com", target: "_blank" },
          "tunetank.com"
        )
      );
    }
  }
  var Ko = v().influx((e) => ({
    selectedCategoryId: v().model.state.musicAssist.selectedCategoryId,
  }))(Zo);
  const Qo = {
    root: {
      ...g().default.column,
      ...g().default.padding("g2 g2 0 g2"),
      ...g().default.relative(),
      ...g().default.noselect,
      width: "100%",
      height: "100%",
    },
    closeButton: { ...g().default.absolute("4 4 . .") },
  };
  class Jo extends g().default.Component {
    constructor(...e) {
      var t;
      return (
        (t = super(...e)),
        (this.onCloseClick = () => {
          v().transaction((e) => {
            e.musicAssist.shown = !1;
          });
        }),
        t
      );
    }
    render() {
      return Glamor.createElement(
        "div",
        { css: Qo.root },
        this.renderCloseButton(),
        this.renderTabs(),
        Glamor.createElement(g().default.Spacer, { height: "g2" }),
        Glamor.createElement(Ko, null)
      );
    }
    renderCloseButton() {
      return Glamor.createElement(g().default.CloseButton, {
        style: Qo.closeButton,
        onClick: this.onCloseClick,
      });
    }
    renderTabs() {
      return Glamor.createElement(g().default.TabBar, {
        tabs: [{ id: "main", label: "ADD MUSIC" }],
        selectedTabId: "main",
      });
    }
  }
  var Xo = {
    init: function () {
      C().iframeBus.on("new-post-extra.option-click", ei),
        C().iframeBus.on("new-post-extra.cancel-click", ti),
        C().iframeBus.on("new-post-extra.enter-page", si),
        C().iframeBus.on("new-post-extra.exit-page", ai),
        po.observeStateDuringCreation(
          (e) =>
            e.coverAssist.shown
              ? "cover-assist"
              : e.tagAssist.shown
              ? "tag-assist"
              : e.musicAssist.shown
              ? "music-assist"
              : null,
          (e) => {
            C().iframeBus.send("new-post-extra.synch-selected-option", e);
          }
        ),
        po.observeStateDuringCreation(
          () => go.getSelectedTrackName(),
          (e) => {
            C().iframeBus.send("new-post-extra.update-pill-music", { name: e });
          }
        ),
        po.observeStateDuringCreation(
          (e) => !!e.coverAssist.coverUrl,
          (e) => {
            C().iframeBus.send("new-post-extra.update-pill-cover", {
              hasCover: e,
            });
          }
        );
    },
  };
  function ei(e) {
    v().transaction((t) => {
      const s = t.coverAssist.shown
        ? "cover-assist"
        : t.tagAssist.shown
        ? "tag-assist"
        : t.musicAssist.shown
        ? "music-assist"
        : null;
      (t.tagAssist.shown = !1),
        (t.coverAssist.shown = !1),
        (t.musicAssist.shown = !1),
        e !== s &&
          ("tag-assist" === e
            ? (t.tagAssist.shown = !0)
            : "cover-assist" === e
            ? (t.coverAssist.shown = !0)
            : "music-assist" === e && (t.musicAssist.shown = !0));
    });
  }
  function ti(e) {
    "music-assist" === e
      ? v().transaction((e) => {
          e.musicAssist.selectedTrackId = null;
        })
      : "cover-assist" === e &&
        v().transaction((e) => {
          (e.coverAssist.selectedTabId = "auto"),
            (e.coverAssist.coverUrl = null),
            (e.coverAssist.frameGallerySelectedImage = null);
        });
  }
  function si({ videoDurationMs: e = 0 } = {}) {
    v().transaction((t) => {
      e && e < 2 * k().MINUTE
        ? ((t.tagAssist.shown = !1),
          (t.coverAssist.shown = !1),
          (t.musicAssist.shown = !0))
        : e
        ? ((t.tagAssist.shown = !1),
          (t.coverAssist.shown = !0),
          (t.musicAssist.shown = !1))
        : ((t.tagAssist.shown = !0),
          (t.coverAssist.shown = !1),
          (t.musicAssist.shown = !1)),
        (t.sidebar.isOpen = !1);
    });
  }
  function ai() {
    v().transaction((e) => {
      (e.tagAssist.shown = !1),
        (e.coverAssist.shown = !1),
        (e.musicAssist.shown = !1);
    });
  }
  m(), v(), y(), w(), C(), oe();
  var ni = {
    init: function () {
      v().model.observe(
        (e) => e.coverAssist.coverUrl,
        async (e) => {
          if (e) {
            const t = await fetch(e),
              s = await t.blob();
            C().iframeBus.send("cover-assist.synch-cover", s);
          } else C().iframeBus.send("cover-assist.synch-cover", null);
        }
      ),
        C().iframeBus.on("new-post-extra.creation-video-change", oi),
        C().iframeBus.on("ig.published", ii);
    },
  };
  async function oi(e) {
    if (
      (v().transaction((e) => {
        Object.assign(e.coverAssist, oe().default);
      }),
      !e)
    )
      return;
    const t = await (async function (e, t) {
        return new Promise((s) => {
          const a = document.createElement("canvas"),
            n = a.getContext("2d"),
            o = [],
            i = document.createElement("video");
          (i.src = e),
            (i.muted = !0),
            i.addEventListener("loadedmetadata", () => {
              (a.width = i.videoWidth), (a.height = i.videoHeight), r();
            }),
            i.addEventListener("timeupdate", () => {
              n.drawImage(i, 0, 0),
                a.toBlob((e) => {
                  const t = URL.createObjectURL(e);
                  o.push(t), r();
                }, "image/jpeg");
            });
          const r = () => {
            const e = i.duration / (t + 1),
              n = o.length;
            n < t
              ? (i.currentTime = (n + 1) * e)
              : (i.remove(), a.remove(), s(o));
          };
        });
      })(e, 12),
      s = v().model.state.authStatus.username,
      a = await w().chromeBus.send("ig-api.fetch-user-posts", s, 14);
    let n = [];
    a.result && (n = a.result.map((e) => e.imgx)),
      v().transaction((s) => {
        (s.coverAssist.loading = !1),
          (s.coverAssist.videoUrl = e),
          (s.coverAssist.frameGalleryImages = t),
          (s.coverAssist.frameGallerySelectedImage = null),
          (s.coverAssist.gridImages = n);
      });
  }
  function ii(e) {
    const t = v().model.state;
    if (!t.coverAssist.coverUrl) return;
    if ("video" !== e) return;
    const s = t.coverAssist.selectedTabId;
    "auto" === s
      ? m().gaController.sendEvent("user", "cover-assist:submit-cover-auto")
      : "frame" === s
      ? m().gaController.sendEvent("user", "cover-assist:submit-cover-frame")
      : "upload" === s &&
        m().gaController.sendEvent("user", "cover-assist:submit-cover-upload"),
      (function (e = 0) {
        true
          ? m().gaController.sendEvent("user", "pro-paid-usage:cover-assist")
          : v().transaction((t) => {
              t.billing.trial.coverAssist += e;
            });
      })(1);
  }
  g(), p(), m(), v(), y(), C();
  class ri extends g().default.Component {
    constructor(e) {
      super(e),
        (this._onCloseClick = () => {
          v().transaction((e) => {
            e.coverAssist.shown = !1;
          });
        }),
        (this._onTabClick = (e) => {
          v().transaction((t) => {
            (t.coverAssist.selectedTabId = e),
              this.props.hasCoverAssistFeature &&
                ("auto" === e
                  ? (t.coverAssist.coverUrl =
                      t.coverAssist.frameGallerySelectedImage)
                  : "frame" === e
                  ? (t.coverAssist.coverUrl = t.coverAssist.frameSelectImage)
                  : "upload" === e &&
                    (t.coverAssist.coverUrl = t.coverAssist.frameUploadImage));
          });
        }),
        (this._onUpgradeToProClick = () => {
          Ge.openBilling("cover-assist"),
            m().gaController.sendEvent(
              "user",
              "cover-assist:upgrade-to-pro-click"
            );
        }),
        (this._onResetClick = () => {
          v().transaction((e) => {
            (e.coverAssist.selectedTabId = "auto"),
              (e.coverAssist.frameGallerySelectedImage = null),
              (e.coverAssist.coverUrl = null);
          });
        }),
        (this._onGridButtonClick = () => {
          v().transaction((e) => {
            e.coverAssist.showGrid = !e.coverAssist.showGrid;
          });
        }),
        (this._onFrameGalleryImageClick = (e) => {
          v().transaction((t) => {
            (t.coverAssist.frameGallerySelectedImage = e),
              this.props.hasCoverAssistFeature
                ? (t.coverAssist.coverUrl = e)
                : this._showUpsell();
          });
        }),
        (this._onFrameSelectValueChange = (e) => {
          v().transaction((t) => {
            t.coverAssist.frameSelectValue = e;
          });
        }),
        (this._onFrameSelectImageSelect = (e) => {
          v().transaction((t) => {
            "frame" === t.coverAssist.selectedTabId &&
              ((t.coverAssist.frameSelectImage = e),
              this.props.hasCoverAssistFeature
                ? (t.coverAssist.coverUrl = e)
                : this._showUpsell());
          });
        }),
        (this._onFrameUploadFileSelect = async (e) => {
          const t = document.createElement("img");
          let s = null,
            a = null;
          await new Promise((n) => {
            (t.src = URL.createObjectURL(e)),
              t.addEventListener("load", () => {
                (s = t.width), (a = t.height), n();
              });
          });
          const n = document.createElement("canvas"),
            o = this.props.isCreatingReels ? 9 / 16 : 1;
          let i, r;
          s / a > o ? ((r = a), (i = r * o)) : ((i = s), (r = i / o));
          const l = (s - i) / 2,
            c = (a - r) / 2,
            d = n.getContext("2d");
          (n.width = i), (n.height = r), d.drawImage(t, l, c, i, r, 0, 0, i, r);
          const u = await new Promise((e) => {
              n.toBlob(e, "image/jpeg");
            }),
            h = URL.createObjectURL(u);
          v().transaction((e) => {
            (e.coverAssist.frameUploadImage = h),
              this.props.hasCoverAssistFeature
                ? (e.coverAssist.coverUrl = h)
                : this._showUpsell();
          });
        }),
        (this._showUpsell = () => {
          setTimeout(() => {
            this.setState({ showUpsell: !0 });
          }, 500);
        }),
        (this._onUpsellOverlayClick = () => {
          this.setState({ showUpsell: !1 });
        }),
        (this.state = { showUpsell: !1, defaultIgCoverUrl: null }),
        C().iframeBus.send("cover-assist.get-default-ig-cover-url", (e) => {
          this.setState({ defaultIgCoverUrl: e });
        });
    }
    render() {
      return Glamor.createElement(p().default.CoverAssistPanel, {
        loading: this.props.loading,
        selectedTabId: this.props.selectedTabId,
        showGrid: this.props.showGrid,
        showResetButton: this.props.showResetButton,
        hasPro: this.props.hasCoverAssistFeature,
        resetDisabled: this.props.resetDisabled,
        frameGallery: this._getFrameGallery(),
        frameSelect: this._getFrameSelect(),
        frameUpload: this._getFrameUpload(),
        grid: this._getGrid(),
        upsellOverlay: this._getUpsellOverlay(),
        onCloseClick: this._onCloseClick,
        onTabClick: this._onTabClick,
        onUpgradeToProClick: this._onUpgradeToProClick,
        onResetClick: this._onResetClick,
        onGridButtonClick: this._onGridButtonClick,
      });
    }
    _getFrameGallery() {
      return Glamor.createElement(p().default.CoverAssistFrameGallery, {
        images: this.props.frameGalleryImages,
        selectedImage: this.props.frameGallerySelectedImage,
        isReelsView: this.props.isCreatingReels,
        onImageClick: this._onFrameGalleryImageClick,
      });
    }
    _getFrameSelect() {
      return Glamor.createElement(p().default.CoverAssistFrameSelect, {
        videoUrl: this.props.videoUrl,
        value: this.props.frameSelectValue,
        isReelsView: this.props.isCreatingReels,
        onValueChange: this._onFrameSelectValueChange,
        onImageSelect: this._onFrameSelectImageSelect,
      });
    }
    _getFrameUpload() {
      return Glamor.createElement(p().default.CoverAssistFrameUpload, {
        image: this.props.frameUploadImage,
        isReelsView: this.props.isCreatingReels,
        onFileSelect: this._onFrameUploadFileSelect,
      });
    }
    _getGrid() {
      const e = [
        this.props.coverUrl || this.state.defaultIgCoverUrl,
        ...this.props.gridImages,
      ];
      return Glamor.createElement(p().default.CoverAssistGrid, { images: e });
    }
    _getUpsellOverlay() {
      return Glamor.createElement(ot, {
        show: this.state.showUpsell,
        feature: "cover-assist",
        onOverlayClick: this._onUpsellOverlayClick,
      });
    }
  }
  var li = v().influx((e) => ({
    loading: e.coverAssist.loading,
    selectedTabId: e.coverAssist.selectedTabId,
    showGrid: e.coverAssist.showGrid,
    showResetButton: !!e.coverAssist.coverUrl,
    coverUrl: e.coverAssist.coverUrl,
    gridImages: e.coverAssist.gridImages,
    videoUrl: e.coverAssist.videoUrl,
    frameGalleryImages: e.coverAssist.frameGalleryImages,
    frameGallerySelectedImage: e.coverAssist.frameGallerySelectedImage,
    frameSelectImage: e.coverAssist.frameSelectImage,
    frameSelectValue: e.coverAssist.frameSelectValue,
    frameUploadImage: e.coverAssist.frameUploadImage,
    hasCoverAssistFeature: true,
    isCreatingReels: e.reels.creating,
  }))(ri);
  y(), C(), m(), v(), C();
  const ci = {
      init: function () {
        C().iframeBus.on(
          "story-assist.split-story-video",
          this._splitStoryVideo.bind(this)
        );
      },
      _splitStoryVideo: async function (e) {
        const t = URL.createObjectURL(e),
          s = e.name.split(".").pop();
        await Yt.addFile(e.name, t),
          await Yt.run(
            [
              `-i ${e.name}`,
              "-c copy",
              "-f segment",
              "-segment_time 55",
              "-reset_timestamps 1",
              `chunk%03d.${s}`,
            ].join(" ")
          );
        const a = [];
        for (let t = 0; ; t++)
          try {
            const n = `chunk${t.toString().padStart(3, 0)}.${s}`,
              o = await Yt.readFile(n, e.type);
            await Yt.removeFile(n), a.push(o);
          } catch {
            break;
          }
        {
          const { duration: t } = await Ys(a[0]),
            n = `first-chunk.${s}`;
          await Yt.run([`-i ${e.name}`, `-t ${t}`, "-c copy", n].join(" ")),
            (a[0] = await Yt.readFile(n, e.type)),
            await Yt.removeFile(n);
        }
        return await Yt.removeFile(e.name), a;
      },
    },
    di = {
      init: function () {
        C().iframeBus.on("story-assist.toggle", this.togglePanel.bind(this)),
          C().iframeBus.on(
            "story-assist.get-mentions",
            this._getMentions.bind(this)
          ),
          C().iframeBus.on("story-assist.has-pro", this._hasPro.bind(this)),
          C().iframeBus.on(
            "story-assist.show-upsell",
            this._showUpsell.bind(this)
          ),
          ci.init(),
          this._notifyPanelToggled(),
          this._toggleStoryAssistPanelWhenNeeded(),
          this._watchStoryCover(),
          this._manageTrial();
      },
      togglePanel: function (e) {
        v().transaction((t) => {
          t.storyAssist.shown = null != e ? e : !t.storyAssist.shown;
        });
      },
      _hasPro: function () {
        return true;
      },
      _showUpsell: function () {
        v().transaction((e) => {
          e.storyAssist.showUpsellOverlay = !0;
        });
      },
      _getMentions: function () {
        return v().model.state.storyAssist.mentions.selectedUsers;
      },
      _notifyPanelToggled: function () {
        po.observeStateDuringCreation(
          (e) => e.storyAssist.shown,
          (e) => {
            C().iframeBus.send("story-assist.panel-toggled", e);
          }
        );
      },
      _toggleStoryAssistPanelWhenNeeded: function () {
        C().iframeBus.on(
          "ig.creation-session-start",
          ({ isStory: e, isVideo: t }) => {
            e &&
              t &&
              v().transaction((e) => {
                (e.storyAssist.shown = !0),
                  (e.storyAssist.mentions.query = ""),
                  (e.storyAssist.mentions.foundUsers = []),
                  (e.storyAssist.mentions.selectedUsers = []);
              });
          }
        ),
          C().iframeBus.on("ig.creation-session-end", () => {
            v().transaction((e) => {
              e.storyAssist.shown = !1;
            });
          });
      },
      _watchStoryCover: function () {
        C().iframeBus.on("story-assist.cover-change", (e) => {
          v().transaction((t) => {
            t.storyAssist.coverUrl = e;
          });
        });
      },
      _manageTrial: function () {
        C().iframeBus.on("ig.published", (e) => {
          "story-video" === e &&
            (true
              ? m().gaController.sendEvent("user", "pro-paid-usage:story-video")
              : v().transaction((e) => {
                  e.billing.trial.storyAssist += 1;
                }));
        });
      },
    };
  g(), v(), g(), g(), w(), v(), v(), f();
  const ui = function () {
    return (
      v().model.state.storyAssist.mentions.selectedUsers.length >=
      f().ig.maxMentions
    );
  };
  g();
  const hi = {
    root: {
      ...g().default.row,
      ...g().default.alignItems.center,
      ...g().default.justifyContent.between,
      paddingTop: g().default.space.g1,
      paddingBottom: g().default.space.g1,
    },
    rootClickable: {
      cursor: "pointer",
      paddingLeft: g().default.space.g1h,
      paddingRight: g().default.space.g1h,
      "&:hover": { background: g().default.color.bgLight1 },
    },
    rootActive: {
      position: "relative",
      background: g().default.color.bgLight1,
      "&::before": {
        content: '""',
        ...g().default.absolute("0 _ 0 0"),
        width: 3,
        background: g().default.color.link,
      },
    },
    main: {
      ...g().default.row,
      ...g().default.alignItems.center,
      cursor: "pointer",
    },
    avatar: {
      width: 36,
      height: 36,
      marginRight: g().default.space.g1h,
      borderRadius: "50%",
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundColor: g().default.color.iconPassive,
    },
    body: { minWidth: 0 },
    username: {
      ...g().default.text.ellipsis,
      ...g().default.text.tooltipTitle,
      color: g().default.color.textNormal,
    },
    fullName: {
      ...g().default.text.ellipsis,
      ...g().default.text.elementNormal,
      color: g().default.color.textBleak,
    },
    removeButton: {},
  };
  class mi extends g().default.Component {
    constructor(...e) {
      var t;
      return (
        (t = super(...e)),
        (this.onClick = (e) => {
          this.props.onClick(this.props);
        }),
        (this.onMainClick = (e) => {
          this.props.onClick ||
            chrome.tabs.create({
              url: `https://instagram.com/${this.props.user.username}`,
              active: !e.metaKey && !e.ctrlKey,
            });
        }),
        (this.onRemoveClick = (e) => {
          this.props.onRemoveClick(this.props);
        }),
        t
      );
    }
    render() {
      return Glamor.createElement(
        "div",
        {
          css: [
            hi.root,
            this.props.style,
            this.props.active && hi.rootActive,
            this.props.onClick && hi.rootClickable,
          ],
          onClick: this.props.onClick ? this.onClick : null,
        },
        Glamor.createElement(
          "div",
          { css: hi.main, onClick: this.onMainClick },
          Glamor.createElement("div", {
            css: hi.avatar,
            style: { backgroundImage: `url('${this.props.user.avatar}')` },
            "cdn-proxy-image": this.props.user.avatar,
          }),
          Glamor.createElement(
            "div",
            { css: hi.body },
            Glamor.createElement(
              "div",
              { css: hi.username },
              this.props.user.username
            ),
            Glamor.createElement(
              "div",
              { css: hi.fullName },
              this.props.user.fullName
            )
          )
        ),
        this.props.onRemoveClick &&
          Glamor.createElement(g().default.SvgIcon, {
            style: hi.removeButton,
            name: "igswiss.close",
            onClick: this.onRemoveClick,
          })
      );
    }
  }
  const gi = {
    root: { ...g().default.relative(), zIndex: 1 },
    dropdown: {
      ...g().default.absolute(),
      ...g().default.transition.fast,
      ...g().default.shadow.sh6,
      ...g().default.borderRadius.r4,
      top: "100%",
      left: 0,
      right: 0,
      maxHeight: 286,
      marginTop: g().default.space.g1,
      paddingTop: g().default.space.g1,
      paddingBottom: g().default.space.g1,
      background: g().default.color.bgLight3,
      overflow: "auto",
    },
    dropdownHidden: {
      opacity: 0,
      transform: "translateY(-5px)",
      pointerEvents: "none",
    },
    dropdownNoAnimation: { transition: "none" },
    notFoundMessage: {
      ...g().default.row,
      ...g().default.alignItems.center,
      ...g().default.justifyContent.center,
      ...g().default.text.bleak,
      height: 60,
    },
  };
  class pi extends g().default.Component {
    constructor(e) {
      super(e),
        (this.onInput = (e) => {
          if (
            (v().transaction((t) => {
              t.storyAssist.mentions.query = e;
            }),
            this.isEmpty(e))
          )
            return void this.setState({ searching: !1, showDropdown: !1 });
          const t = this.onInput;
          clearTimeout(t.timeoutId),
            (this.dropdown.current.scrollTop = 0),
            this.setState({ searching: !0, activeIndex: 0, showDropdown: !1 });
          const s = this.setTimeout(async () => {
            const a = await w().chromeBus.send("ig-api.search-profiles", e);
            a.result &&
              s === t.timeoutId &&
              (this.setState({ searching: !1, showDropdown: !0 }),
              v().transaction((e) => {
                const t = e.storyAssist.mentions,
                  s = t.selectedUsers.map((e) => e.id);
                t.foundUsers = a.result
                  .map((e) => ({
                    id: e.id,
                    username: e.username,
                    fullName: e.fullName,
                    avatar: e.avatar,
                  }))
                  .filter((e) => !s.includes(e.id))
                  .sort((e, s) =>
                    e.username === t.query ? -1 : s.username === t.query ? 1 : 0
                  );
              }));
          }, 300);
          t.timeoutId = s;
        }),
        (this.onKeyDown = (e) => {
          if ("Escape" !== e.key)
            if ("Enter" !== e.key) {
              if ("ArrowUp" === e.key || "ArrowDown" === e.key) {
                if ((e.preventDefault(), this.state.searching)) return;
                const t = "ArrowDown" === e.key;
                let s;
                const a = this.props.foundUsers.length - 1;
                t
                  ? ((s = this.state.activeIndex + 1), s > a && (s = a))
                  : ((s = this.state.activeIndex - 1), s < 0 && (s = 0)),
                  this.setState({ activeIndex: s });
                const n = this.dropdown.current,
                  o = n.children[s],
                  i = n.scrollTop,
                  r = n.offsetHeight,
                  l = o.offsetTop,
                  c = o.offsetHeight,
                  d = 8;
                l - d < i
                  ? (n.scrollTop = l - d)
                  : l + c - d > i + r && (n.scrollTop = l + c - r + d);
              }
            } else {
              if (!this.state.showDropdown) return;
              const e = this.props.foundUsers[this.state.activeIndex];
              this.selectUser(e);
            }
          else this.getInput().blur();
        }),
        (this.onFocus = () => {
          this.isEmpty(this.props.query) || this.setState({ showDropdown: !0 });
        }),
        (this.onBlur = () => {
          this.preventBlur
            ? (this.preventBlur = !1)
            : this.setState({ showDropdown: !1 });
        }),
        (this.onClearClick = () => {
          this.setState({ showDropdown: !1 }),
            v().transaction((e) => {
              e.storyAssist.mentions.query = "";
            });
        }),
        (this.onDropdownMouseDown = () => {
          this.preventBlur = !0;
        }),
        (this.onUserClick = ({ user: e }) => {
          this.selectUser(e);
        }),
        (this.input = g().default.createRef()),
        (this.dropdown = g().default.createRef()),
        (this.preventBlur = !1),
        (this.state = {
          searching: !1,
          activeIndex: 0,
          showDropdown: !1,
          noDropdownAnimation: !1,
        });
    }
    render() {
      return Glamor.createElement(
        "div",
        { css: gi.root },
        this.renderInput(),
        this.renderDropdown()
      );
    }
    renderInput() {
      const e = this.props.query
          ? { name: "igswiss.close", onClick: this.onClearClick }
          : { name: "igswiss.search" },
        t = this.state.searching && {
          value: 35,
          spinning: !0,
          thickness: 1.5,
          background: g().default.color.iconPassive,
        };
      return Glamor.createElement(g().default.Input, {
        ref: this.input,
        disabled: this.props.limitReached,
        spellCheck: !1,
        placeholder: "search user",
        value: this.props.query,
        onInput: this.onInput,
        onKeyDown: this.onKeyDown,
        onFocus: this.onFocus,
        onBlur: this.onBlur,
        icon: e,
        progress: t,
      });
    }
    renderDropdown() {
      return Glamor.createElement(
        "div",
        {
          css: [
            gi.dropdown,
            !this.state.showDropdown && gi.dropdownHidden,
            this.state.noDropdownAnimation && gi.dropdownNoAnimation,
          ],
          onMouseDown: this.onDropdownMouseDown,
          ref: this.dropdown,
        },
        0 === this.props.foundUsers.length &&
          Glamor.createElement(
            "div",
            { css: gi.notFoundMessage },
            "NO USERS FOUND"
          ),
        this.props.foundUsers.map((e, t) =>
          Glamor.createElement(mi, {
            key: e.id,
            user: e,
            active: t === this.state.activeIndex,
            onClick: this.onUserClick,
          })
        )
      );
    }
    isEmpty(e) {
      return 0 === e.trim().length;
    }
    getInput() {
      return this.input.current.input.current;
    }
    selectUser(e) {
      e &&
        (v().transaction((t) => {
          (t.storyAssist.mentions.query = ""),
            t.storyAssist.mentions.selectedUsers.unshift({
              id: e.id,
              avatar: e.avatar,
              username: e.username,
              fullName: e.fullName,
            });
        }),
        this.getInput().focus(),
        this.setState({ showDropdown: !1 }),
        this.setState({ noDropdownAnimation: !0 }),
        this.setTimeout(() => {
          this.setState({ noDropdownAnimation: !1 });
        }, 300));
    }
  }
  var fi = v().influx((e) => ({
    query: e.storyAssist.mentions.query,
    foundUsers: e.storyAssist.mentions.foundUsers,
    limitReached: ui(),
  }))(pi);
  g(), v();
  const vi = {
    root: { ...g().default.column, ...g().default.grow, overflow: "hidden" },
    label: { ...g().default.text.label, marginBottom: g().default.space.g1 },
    description: { ...g().default.text.bleak },
    userList: {
      ...g().default.grow,
      overflow: "auto",
      paddingBottom: g().default.space.g1,
    },
    user: { ...g().default.transition.slow },
    userNew: { transform: "translateY(-5px)", opacity: 0 },
    userDelay: { transitionDelay: "100ms", transitionDuration: "600ms" },
  };
  class Ci extends g().default.Component {
    constructor(e) {
      super(e),
        (this.userList = g().default.createRef()),
        (this.state = { mounted: !1 });
    }
    getSnapshotBeforeUpdate(e) {
      const t = e,
        s = this.props;
      if (
        t.selectedUsers.map((e) => e.id).join("-") !==
        s.selectedUsers.map((e) => e.id).join("-")
      )
        for (const e of this.userList.current.children) g().default.flip.add(e);
      return null;
    }
    componentDidUpdate() {
      g().default.flip.run();
    }
    componentDidMount() {
      this.setTimeout(() => {
        this.setState({ mounted: !0 });
      });
    }
    render() {
      return Glamor.createElement(
        "div",
        { css: vi.root },
        this.renderLabel(),
        this.renderUserList()
      );
    }
    renderLabel() {
      const e = this.props.selectedUsers.length;
      return 0 === e
        ? null
        : Glamor.createElement(
            "div",
            { css: vi.label },
            e,
            " ",
            1 === e ? "user" : "users",
            " tagged",
            " ",
            this.props.limitReached &&
              Glamor.createElement(React.Fragment, null, "(limit reached)")
          );
    }
    renderUserList() {
      return Glamor.createElement(
        "div",
        { css: vi.userList, ref: this.userList },
        this.props.selectedUsers.map((e) =>
          Glamor.createElement(yi, {
            key: e.id,
            user: e,
            animateNew: this.state.mounted,
          })
        )
      );
    }
  }
  class yi extends g().default.Component {
    constructor(e) {
      super(e),
        (this.onRemoveClick = ({ user: e }) => {
          v().transaction((t) => {
            t.storyAssist.mentions.selectedUsers =
              t.storyAssist.mentions.selectedUsers.filter((t) => t.id !== e.id);
          });
        }),
        (this.state = { new: !0, delay: !0 });
    }
    componentDidMount() {
      this.setTimeout(() => {
        this.setState({ new: !1 });
      }),
        this.setTimeout(() => {
          this.setState({ delay: !1 });
        }, 1e3);
    }
    render() {
      return Glamor.createElement(mi, {
        style: [
          vi.user,
          this.state.new && this.props.animateNew && vi.userNew,
          this.state.delay && vi.userDelay,
        ],
        user: this.props.user,
        onRemoveClick: this.onRemoveClick,
      });
    }
  }
  var bi = v().influx((e) => ({
    selectedUsers: e.storyAssist.mentions.selectedUsers,
    limitReached: ui(),
  }))(Ci);
  g(), v();
  const ki = {
      root: {
        userSelect: "none",
        ...g().default.absolute(". 0 g3 0"),
        ...g().default.transition.fast,
      },
      rootInvisible: { opacity: 0, transform: "translateY(5px)" },
      text: { ...g().default.text.bleak },
      imageContainer: { ...g().default.relative() },
      image: {
        width: 221,
        height: 431,
        marginLeft: 22,
        borderRadius: 12,
        border: g().default.border.dark,
        "html.theme-night &": { border: "none" },
      },
      imageDay: { "html.theme-night &": { display: "none" } },
      imageNight: { "html.theme-day &": { display: "none" } },
      header: {
        ...g().default.absolute("7 . . 52"),
        ...g().default.row,
        ...g().default.alignItems.center,
      },
      avatar: {
        width: 20,
        height: 20,
        borderRadius: "50%",
        backgroundSize: "cover",
        backgroundPosition: "center",
        marginRight: 8,
      },
      username: {
        width: 72,
        fontSize: 12,
        fontWeight: 600,
        ...g().default.text.ellipsis,
      },
      threadAvatar: {
        width: 17,
        height: 17,
        borderRadius: "50%",
        backgroundSize: "cover",
        backgroundPosition: "center",
        ...g().default.absolute(". . 36 31"),
      },
      cover: {
        width: 96,
        height: 125,
        borderRadius: "12px 12px 0 0",
        backgroundSize: "cover",
        backgroundPosition: "center",
        ...g().default.absolute(". . 62 65"),
      },
    },
    wi = "story-assist-mentions-preview-mendiator.preview-day",
    Si = "story-assist-mentions-preview-mendiator.preview-night";
  g().default.Image.registerImages({
    [wi]: "ui-igswiss/story-assist-mentions-preview-day.png:440:862",
    [Si]: "ui-igswiss/story-assist-mentions-preview-night.png:440:862",
  });
  class Ti extends g().default.Component {
    render() {
      return Glamor.createElement(
        "div",
        { css: [ki.root, this.props.hasSelectedUsers && ki.rootInvisible] },
        Glamor.createElement(
          "div",
          { css: [g().default.row, g().default.alignItems.center] },
          Glamor.createElement(g().default.InfoCircle, {
            color: g().default.color.iconActionable,
          }),
          Glamor.createElement(g().default.Spacer, { width: "g1" }),
          Glamor.createElement(
            "div",
            { css: ki.text },
            "Tagged people will receive a DM message like this one:"
          )
        ),
        Glamor.createElement(g().default.Spacer, { height: "g2" }),
        Glamor.createElement(
          "div",
          { css: ki.imageContainer },
          Glamor.createElement(g().default.Image, {
            style: [ki.image, ki.imageDay],
            src: wi,
          }),
          Glamor.createElement(g().default.Image, {
            style: [ki.image, ki.imageNight],
            src: Si,
          }),
          Glamor.createElement(
            "div",
            { css: ki.header },
            Glamor.createElement("div", {
              css: ki.avatar,
              style: { backgroundImage: `url('${this.props.avatar}')` },
              "cdn-proxy-image": this.props.avatar,
            }),
            Glamor.createElement(
              "div",
              { css: ki.username },
              this.props.username
            )
          ),
          Glamor.createElement("div", {
            css: ki.threadAvatar,
            style: { backgroundImage: `url('${this.props.avatar}')` },
            "cdn-proxy-image": this.props.avatar,
          }),
          Glamor.createElement("div", {
            css: ki.cover,
            style: { backgroundImage: `url('${this.props.cover}')` },
          })
        )
      );
    }
  }
  var Ei = v().influx((e) => ({
    cover: e.storyAssist.coverUrl,
    avatar: e.authStatus.avatarUrl,
    username: e.authStatus.username,
    hasSelectedUsers: e.storyAssist.mentions.selectedUsers.length > 0,
  }))(Ti);
  const _i = {
    root: {
      ...g().default.column,
      ...g().default.grow,
      ...g().default.relative(),
      minHeight: 0,
    },
    description: { ...g().default.text.bleak },
  };
  class Ai extends g().default.Component {
    render() {
      return Glamor.createElement(
        "div",
        { css: _i.root },
        this.renderDescription(),
        Glamor.createElement(g().default.Spacer, { height: "g1h" }),
        Glamor.createElement(fi, null),
        Glamor.createElement(g().default.Spacer, { height: "g3" }),
        Glamor.createElement(bi, null),
        Glamor.createElement(Ei, null)
      );
    }
    renderDescription() {
      return Glamor.createElement(
        "div",
        { css: _i.description },
        "Tag up to 30 people in your story. Tagged accounts will receive a notification. Story viewers won’t see whom you tagged."
      );
    }
  }
  const Pi = {
    root: {
      ...g().default.column,
      ...g().default.padding("g2 g2 0 g2"),
      ...g().default.relative(),
      width: "100%",
      height: "100%",
    },
    closeButton: { ...g().default.absolute("4 4 . .") },
  };
  class Ii extends g().default.Component {
    render() {
      return Glamor.createElement(
        "div",
        { css: Pi.root },
        this.renderTabs(),
        this.renderCloseButton(),
        Glamor.createElement(g().default.Spacer, { height: "g2" }),
        this.renderContent()
      );
    }
    renderTabs() {
      return Glamor.createElement(g().default.TabBar, {
        tabs: [
          { id: "music", label: "ADD MUSIC" },
          {
            id: "mentions",
            label:
              0 === this.props.mentionCount
                ? "TAG PEOPLE"
                : `TAG PEOPLE • ${this.props.mentionCount}`,
          },
        ],
        selectedTabId: this.props.selectedTabId,
        onTabClick: this.onTabClick,
      });
    }
    renderCloseButton() {
      return Glamor.createElement(g().default.CloseButton, {
        style: Pi.closeButton,
        onClick: this.onCloseClick,
      });
    }
    renderContent() {
      return "music" === this.props.selectedTabId
        ? Glamor.createElement(Ko, null)
        : "mentions" === this.props.selectedTabId
        ? Glamor.createElement(Ai, null)
        : null;
    }
    onTabClick(e) {
      v().transaction((t) => {
        t.storyAssist.selectedTabId = e.id;
      });
    }
    onCloseClick() {
      di.togglePanel(!1);
    }
  }
  var xi = v().influx((e) => ({
    selectedTabId: e.storyAssist.selectedTabId,
    mentionCount: e.storyAssist.mentions.selectedUsers.length,
  }))(Ii);
  g(), v();
  const Gi = { root: {}, rootWider: { left: -50, right: -50 } };
  class Di extends g().default.Component {
    constructor(...e) {
      var t;
      return (
        (t = super(...e)),
        (this.onOverlayClick = () => {
          v().transaction((e) => {
            e.storyAssist.showUpsellOverlay = !1;
          });
        }),
        t
      );
    }
    render() {
      return Glamor.createElement(ot, {
        style: [Gi.root, !this.props.widescreen && Gi.rootWider],
        feature: "video-stories",
        show: this.props.show,
        noArt: !0,
        onOverlayClick: this.onOverlayClick,
      });
    }
  }
  var Bi = v().influx((e) => ({
    show: e.storyAssist.showUpsellOverlay,
    widescreen: e.igView.fullscreen,
  }))(Di);
  Z(), w(), z();
  var Fi = {
    init: async function () {
      return void 0;
      (Li = (await z().idbController.get("image-proxy.cache")) || {}),
        (Mi = new Worker("/image-proxy/index-web-worker.js")),
        (function () {
          const e = Symbol("prevUrl");
          Co(() => {
            Z()
              .$$(
                '[style*="background-image:url"], [style*="background-image: url"]'
              )
              .forEach(async (t) => {
                const s = t.style.backgroundImage
                  .split("(")[1]
                  .split(")")[0]
                  .replace(/['"]/g, "");
                if (!(s in Li)) return;
                if (t[e] === s) return;
                const a = await (async function (e) {
                  if (Oi[e]) return Oi[e];
                  return new Promise((t) => {
                    Mi.postMessage({ url: e }),
                      Mi.addEventListener("message", function s(a) {
                        a.data.originalUrl === e &&
                          (Mi.removeEventListener("message", s),
                          (Oi[e] = a.data.objectUrl || e),
                          t(Oi[e]));
                      });
                  });
                })(s);
                (t[e] = a),
                  (t.style.backgroundImage = `url('${a}')`),
                  w().chromeBus.send("image-proxy.cache-item-used", s);
              });
          });
        })();
    },
    save: function (e) {
      return void 0;
      w().chromeBus.send("image-proxy.save", e);
    },
  };
  const Oi = {};
  let Mi,
    Li = null;
  H(), ie(), N(), C(), w(), y(), v(), m();
  var Ui = {
    init: function () {
      C().iframeBus.on("reels.is-pro", Ri),
        C().iframeBus.on("reels.is-mobile-session", Ni),
        C().iframeBus.on("reels.get-trial-data", Vi),
        C().iframeBus.on("reels.authorize", Hi),
        C().iframeBus.on("reels.open-billing", zi),
        C().iframeBus.on("reels.creation-session-start", () => {
          v().transaction((e) => {
            e.reels.creating = !0;
          });
        }),
        C().iframeBus.on("reels.creation-session-end", () => {
          v().transaction((e) => {
            e.reels.creating = !1;
          });
        }),
        C().iframeBus.on("reels.submit-success", () => {
          m().gaController.sendEvent("user", "reels:submit", "mobile"),
            true
              ? m().gaController.sendEvent(
                  "user",
                  "pro-paid-usage:reels",
                  "mobile"
                )
              : v().transaction((e) => {
                  e.billing.trial.reels += 1;
                });
        });
    },
  };
  function Ri() {
    return true;
  }
  function Ni() {
    return v().model.state.authStatus.isMobileSession;
  }
  function Vi() {
    return {
      hasPro: true,
      freeReels: Math.max(0, 2 - v().model.state.billing.trial.reels),
      maxFreeReels: 2,
    };
  }
  async function Hi() {
    await w().chromeBus.send("auth.toggle-session-watcher", !1),
      await H().default(chrome.cookies.remove, {
        url: "https://*.instagram.com/*",
        name: "sessionid",
      });
    const e = await N().utils.createWindow(
        "https://www.instagram.com/accounts/login/",
        { name: "reels.auth-window" }
      ),
      t = await new Promise((t) => {
        (async () => {
          await N().utils.waitForWindowClose(e),
            setTimeout(() => {
              t(!1);
            }, 2e3);
        })(),
          ie().default("reels.auth-result-cookie", async (e) => {
            const s = "1" === e.value;
            t(s);
          });
      });
    await w().chromeBus.send("auth.toggle-session-watcher", !0),
      C().iframeBus.send("reels.auth-performed", t),
      w().chromeBus.send("auth.refresh-user", { isSettingSessionId: t });
  }
  function zi() {
    m().gaController.sendEvent("user", "reels:open-billing"),
      Ge.openBilling("reels");
  }
  C();
  var Wi = {
    init: function () {
      if (
        (($i = !!window.electron),
        (qi = ns.isIframe() && ns.getParams().isElectron),
        !$i && !qi)
      )
        return;
      $i && C().iframeBus.on("electron-links.open-url", ji);
      document.addEventListener(
        "click",
        (e) => {
          const t = e.target.closest("a");
          if (!t) return;
          if ("_blank" !== t.getAttribute("target")) return;
          const s = t.getAttribute("href");
          s.startsWith("/") ||
            (e.preventDefault(),
            e.stopPropagation(),
            qi ? C().iframeBus.send("electron-links.open-url", s) : ji(s));
        },
        { capture: !0 }
      );
    },
  };
  let $i, qi;
  function ji(e) {
    chrome.tabs.create({ url: e, active: !0 });
  }
  Z(), C(), re();
  var Yi = {
    init: function () {
      C().iframeBus.on("ig.ready", () => {
        Qi.resolve(),
          Z()
            .$$("[cdn-proxy-image-processed]")
            .forEach((e) => {
              const t = e.getAttribute("cdn-proxy-image-processed");
              e.removeAttribute("cdn-proxy-image-processed"),
                e.setAttribute("cdn-proxy-image", t);
            });
      }),
        (function () {
          const e = window.fetch;
          window.fetch = async (...t) => {
            const s = t[0];
            return Xi(s) && (t[0] = await Ji(s)), e.call(window, ...t);
          };
        })(),
        Co(() => {
          Z()
            .$$("[cdn-proxy-image]")
            .forEach(async (e) => {
              let t = e.getAttribute("cdn-proxy-image");
              e.removeAttribute("cdn-proxy-image"),
                e.setAttribute("cdn-proxy-image-processed", t),
                (Xi(t) && ((t = await Ji(t)), !document.body.contains(e))) ||
                  ("IMG" === e.tagName
                    ? e.setAttribute("src", t)
                    : (e.style.backgroundImage = `url("${t}")`));
            });
        });
    },
  };
  const Zi = { domains: ["cdninstagram.com", "fbcdn.net"] },
    Ki = {},
    Qi = re().default();
  async function Ji(e) {
    if ((await Qi, Ki[e]))
      try {
        await fetch(Ki[e]);
      } catch (t) {
        delete Ki[e];
      }
    if (!Ki[e]) {
      const t = await C().iframeBus.send("cdn-proxy.fetch", e);
      Ki[e] = t;
    }
    return Ki[e];
  }
  function Xi(e) {
    return !!e && Zi.domains.some((t) => e.includes(t));
  }
  C();
  const er = {
    init: function () {
      C().iframeBus.on("strip-metadata.strip", this._stripMetadata.bind(this));
    },
    _stripMetadata: async function (e) {
      if (!e) return;
      const t = URL.createObjectURL(e),
        s = e.name.split(".").pop(),
        a = `video.${s}`,
        n = `output.${s}`;
      await Yt.addFile(a, t),
        await Yt.run(
          [`-i ${a}`, "-map_metadata -1", "-c:v copy", "-c:a copy", n].join(" ")
        );
      const o = await Yt.readFile(n, e.type);
      return await Yt.removeFile(a), await Yt.removeFile(n), o;
    },
  };
  k(), C(), y(), m(), v();
  const tr = {
    init: function () {
      C().iframeBus.on("ghost-story-view.has-pro", this._hasPro.bind(this)),
        C().iframeBus.on(
          "ghost-story-view.is-enabled",
          this._isEnabled.bind(this)
        ),
        C().iframeBus.on(
          "ghost-story-view.show-upsell-overlay",
          this._showUpsellOverlay.bind(this)
        ),
        this._handleToggling(),
        this._manageTrial();
    },
    _hasPro: function () {
      return true;
    },
    _isEnabled: function () {
      return v().model.state.ghostStoryView.enabled;
    },
    _showUpsellOverlay: function () {
      v().transaction((e) => {
        e.ghostStoryView.showUpsellOverlay = !0;
      });
    },
    _handleToggling: function () {
      v().model.observe(
        (e) => e.ghostStoryView.enabled,
        (e) => {
          C().iframeBus.send("ghost-story-view.toggled", e),
            e ||
              v().transaction((e) => {
                e.ghostStoryView.showUpsellOverlay = !1;
              });
        }
      );
    },
    _manageTrial: function () {
      C().iframeBus.on("ghost-story-view.used", () => {
        const e = Date.now(),
          t = v().model.state.ghostStoryView.lastUsedOn || 0;
        e - t < 24 * k().HOUR ||
          (v().transaction((t) => {
            t.ghostStoryView.lastUsedOn = e;
          }),
          true
            ? m().gaController.sendEvent(
                "user",
                "pro-paid-usage.ghost-story-view"
              )
            : v().transaction((e) => {
                e.billing.trial.ghostStoryView += 1;
              }));
      });
    },
  };
  g(), v();
  const sr = { root: {}, rootWider: { left: -50, right: -50 } };
  class ar extends g().default.Component {
    constructor(...e) {
      var t;
      return (
        (t = super(...e)),
        (this.onOverlayClick = () => {
          v().transaction((e) => {
            (e.ghostStoryView.enabled = !1),
              (e.ghostStoryView.showUpsellOverlay = !1);
          });
        }),
        t
      );
    }
    render() {
      return Glamor.createElement(ot, {
        style: [sr.root, !this.props.widescreen && sr.rootWider],
        feature: "ghost-story-view",
        show: this.props.show,
        noArt: !0,
        onOverlayClick: this.onOverlayClick,
      });
    }
  }
  var nr = v().influx((e) => ({
      show: e.ghostStoryView.showUpsellOverlay,
      widescreen: e.igView.fullscreen,
    }))(ar),
    or = {
      waitForBackground: async function () {
        const e = await new Promise((e) =>
          chrome.runtime.getBackgroundPage((t) => e(t))
        );
        await new Promise((t) => {
          const s = setInterval(() => {
            e._backgroundReady && (clearInterval(s), t());
          }, 50);
        });
      },
    };
  v();
  var ir = {
    init: function () {
      if (v().model.state.version > 70) return;
      (document.body.innerHTML =
        '\n    <style>\n      .min-version {\n        width: 100%;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n      }\n\n      .min-version__content {\n        width: 440px;\n        position: relative;\n        top: -40px;\n      }\n\n      .min-version__title {\n        font-size: 18px;\n        line-height: 24px;\n        font-weight: 600;\n      }\n\n      .min-version__text {\n        margin-top: 12px;\n      }\n\n      .min-version__paragraph {\n        font-size: 16px;\n        line-height: 24px;\n        margin-top: 12px;\n      }\n      .min-version__paragraph:first-child {\n        margin-top: 0;\n      }\n    </style>\n\n    <div class="min-version">\n      <div class="min-version__content">\n        <div class="min-version__title">\n          FAILED TO UPDATE\n        </div>\n        <div class="min-version__text">\n          <div class="min-version__paragraph">\n            Your Inssist plugin version is too old and Chrome has failed to fix and update it automatically 😵.\n          </div>\n          <div class="min-version__paragraph">\n            Please uninstall Inssist from <a href="chrome://extensions">chrome://extensions</a> page\n            in Chrome and reinstall from <a href="https://get.inssist.com">https://get.inssist.com</a>\n          </div>\n        </div>\n      </div>\n    </div>\n  '),
        document.body.addEventListener("click", (e) => {
          const t = e.target.closest("a");
          if (!t) return;
          e.preventDefault();
          const s = t.getAttribute("href");
          chrome.tabs.create({ active: !0, url: s });
        });
    },
  };
  w();
  var rr = {
    init: function () {
      return new Promise((e) => {
        const t = Math.random();
        w().chromeBus.send("chrome-tab.close", t),
          w().chromeBus.on("chrome-tab.close", (e) => {
            t !== e && window.close();
          }),
          setTimeout(e, 50);
      });
    },
  };
  v(), C(), m();
  var lr = function () {
    C().iframeBus.on("ig.open-media", () => {
      m().gaController.sendEvent("user", "ig:media-open");
    }),
      C().iframeBus.on("ig.published", (e) => {
        m().gaController.sendEvent("user", `ig:publish-${e}`),
          ("photo" !== e && "video" !== e) ||
            v().transaction((e) => {
              e.billing.trial.postsPublished =
                (e.billing.trial.postsPublished || 0) + 1;
            }),
          ("story-photo" !== e && "story-video" !== e) ||
            v().transaction((e) => {
              e.billing.trial.storiesPublished =
                (e.billing.trial.storiesPublished || 0) + 1;
            });
      }),
      C().iframeBus.on("ig.open-dm", () => {
        m().gaController.sendEvent("user", "ig:dm-open");
      }),
      C().iframeBus.on("dm.message-sent", () => {
        v().transaction((e) => {
          e.billing.trial.dmsSent = (e.billing.trial.dmsSent || 0) + 1;
        });
      });
  };
  w(), o(), le(), ce(), v(), g();
  g(),
    p(),
    v(),
    C(),
    g(),
    p(),
    v(),
    m(),
    y(),
    g(),
    v(),
    f(),
    w(),
    m(),
    y(),
    p(),
    g(),
    P(),
    v();
  const cr = {
    placeholder: { width: "100%", height: 300 },
    iframeWrapper: { ...g().default.relative() },
    iframeSubWrapper: { ...g().default.absolute(". -16 . -124") },
    iframe: { border: "none" },
  };
  class dr extends g().default.Component {
    render() {
      const e =
        !1 !== P().env.features.iframes &&
        `https://inssist.com/share?theme=${this.state.theme}`;
      return this.props.isOpen
        ? Glamor.createElement(
            "div",
            { css: cr.iframeWrapper },
            Glamor.createElement(
              "div",
              { css: cr.iframeSubWrapper },
              Glamor.createElement("iframe", {
                css: cr.iframe,
                src: e,
                width: "100%",
                height: "300px",
              })
            )
          )
        : Glamor.createElement("div", { css: cr.placeholder });
    }
  }
  var ur = v().influx((e) => ({
    isOpen: e.sidebar.isOpen && "logo" === e.sidebar.selectedTabId,
  }))(g().default.theme.ThemeAware(dr));
  const hr = {
    root: { ...g().default.padding("g2 g2 0 23") },
    card: {
      marginBottom: 24,
      marginRight: 10,
      "& a": { color: g().default.color.link, fontWeight: "inherit" },
    },
    rateUs: {
      marginLeft: -1,
      marginBottom: 24,
      marginRight: 8,
      "& a": { color: "inherit !important", fontWeight: 700 },
    },
    contacts: { ...g().default.text.bleak },
    iframeWrapper: { ...g().default.relative() },
    iframeSubWrapper: { ...g().default.absolute(". -16 . -124") },
    iframe: { border: "none" },
  };
  g().default.Image.registerImages({
    "whats-new.fire": "ui-igswiss/billing-fire.png:50:50",
  });
  class mr extends g().default.Component {
    constructor(e) {
      super(e),
        (this._onRateUsClick = () => {
          m().gaController.sendEvent("user", "rate-us-mini:yes-click"),
            y().actions.acknowledge.dispatch("rateUs"),
            chrome.tabs.create({ url: f().common.reviewsUrl });
        }),
        (this._onUpgradeClick = () => {
          m().gaController.sendEvent("user", "whats-new:upgrade-click"),
            Ge.openBilling();
        }),
        (this._onGoToFaq = () => {
          m().gaController.sendEvent("user", "whats-new:faq-click"),
            chrome.tabs.create({ url: f().common.faqUrl });
        }),
        (this._onSendReportClick = () => {
          this.setState({ isReportSent: !0 }),
            w().chromeBus.send("overseer.send-report", { key: "user" });
        }),
        (this._onTheEndMoreInfoClick = () => {
          v().transaction((e) => {
            e.acknowledged.theEnd = -1;
          });
        }),
        (this._whatsNewItems = y().getWhatsNewItems()),
        (this.state = { isReportSent: !1 });
    }
    render() {
      return Glamor.createElement(
        "div",
        { css: hr.root },
        this._renderHeader(),
        Glamor.createElement(g().default.Spacer, { height: "g1" }),
        this._renderProPanel(),
        Glamor.createElement(g().default.Spacer, { height: "g3" }),
        this._renderWhatsNew(),
        this._renderRateUs(),
        this._renderContacts()
      );
    }
    _renderHeader() {
      return Glamor.createElement(
        "div",
        {
          css: [
            g().default.row,
            g().default.alignItems.center,
            g().default.text.mainTitle,
          ],
        },
        "What's New"
      );
    }
    _renderProPanel() {
      const { hasProPaid: e, hasProPromocode: t } = this.props;
      let s, a;
      return (
        e || t
          ? ((a = !1),
            (s =
              "\n        Inssist PRO is active. All advanced features activated:\n        Scheduling, Tag Collections, Custom Covers and more."))
          : ((a = !0),
            (s = Glamor.createElement(
              g().default.Fragment,
              null,
              "All basic features are free forever. Scheduling,",
              Glamor.createElement("br", null),
              "Tag Collections and more features are available on PRO:"
            ))),
        Glamor.createElement(
          "div",
          { css: g().default.row },
          Glamor.createElement(
            "div",
            null,
            Glamor.createElement(g().default.Image, {
              src: "whats-new.fire",
              width: 19,
              height: 19,
            })
          ),
          Glamor.createElement(g().default.Spacer, { width: "g1" }),
          Glamor.createElement(
            "div",
            { css: g().default.column },
            Glamor.createElement(
              "div",
              { css: [g().default.row, g().default.text.bleak] },
              s
            ),
            Glamor.createElement(g().default.Spacer, { height: "g1" }),
            Glamor.createElement(
              "div",
              { css: g().default.row },
              a &&
                Glamor.createElement(
                  g().default.Fragment,
                  null,
                  Glamor.createElement(g().default.LinkButton, {
                    label: "UPGRADE TO PRO",
                    onClick: this._onUpgradeClick,
                  }),
                  Glamor.createElement(g().default.Spacer, { width: "g3" })
                ),
              Glamor.createElement(g().default.LinkButton, {
                label: "CRACKED BY YEZER",
                onClick: this._onGoToFaq,
              })
            )
          )
        )
      );
    }
    _renderWhatsNew() {
      return Glamor.createElement(
        "div",
        { css: hr.content },
        this.props.whatsNew.map((e) => {
          const t = this._whatsNewItems.find((t) => t.id === e.id);
          return t
            ? "announcement" === t.id && this.props.isAfterTheEndUser
              ? null
              : Glamor.createElement(g().default.Card, {
                  key: e.id,
                  header: t.header,
                  marker: !e.acknowledged && g().default.color.link,
                  subheader: t.subheader,
                  hexImage: t.hexImage,
                  content: this._renderWhatsNewItemContent(t),
                  style: hr.card,
                })
            : null;
        })
      );
    }
    _renderWhatsNewItemContent(e) {
      return "macos" === e.id
        ? [
            Glamor.createElement(
              g().default.Fragment,
              null,
              "This release brings support for the experimental standalone MacOS version. You can download it ",
              Glamor.createElement(
                "a",
                { href: "https://inssist.com", target: "_blank" },
                "from our website"
              ),
              "."
            ),
            Glamor.createElement(
              g().default.Fragment,
              null,
              "Reach out to us at ",
              Glamor.createElement(
                "a",
                { href: "mailto:inssist@slashed.io" },
                "inssist@slashed.io"
              ),
              " and let us know what you think about the standalone build or if you find any bugs."
            ),
          ]
        : "announcement" === e.id
        ? Glamor.createElement(
            "div",
            null,
            "Following a complaint from Facebook Inc., we are removing features that can be potentially exploited to violate Instagram and Facebook Terms of Service: Analytics & Insights, Downloading, Reposting."
          )
        : "posting-from-website" === e.id
        ? [
            Glamor.createElement(
              g().default.Fragment,
              null,
              "Inssist now adds a [+] button to post to Instagram directly from the ",
              Glamor.createElement(
                "a",
                { href: "https://instagram.com", target: "_blank" },
                "instagram.com"
              ),
              " website."
            ),
            Glamor.createElement(
              g().default.Fragment,
              null,
              "Inssist will also auto-retry Reels posting if it fails on Instagram Server which improves posting stability."
            ),
          ]
        : e.content;
    }
    _renderRateUs() {
      return this.props.showRateUs
        ? Glamor.createElement(
            "div",
            { css: hr.rateUs },
            Glamor.createElement(p().default.RateUsMini, {
              image: "rate-us-heart",
              content: Glamor.createElement(
                "div",
                null,
                "Something is broken? Reach us at ",
                Glamor.createElement(
                  "a",
                  { href: "mailto:inssist@slashedio.io" },
                  "inssist@slashed.io"
                ),
                Glamor.createElement(g().default.Spacer, { height: "g1" }),
                this.state.isReportSent
                  ? Glamor.createElement(
                      g().default.Fragment,
                      null,
                      "Thank you! The bug report has been sent."
                    )
                  : Glamor.createElement(
                      g().default.Fragment,
                      null,
                      "Or send us a bug report:",
                      Glamor.createElement(
                        "div",
                        { css: g().default.row },
                        Glamor.createElement(g().default.LinkButton, {
                          small: !0,
                          label: "SEND BUG REPORT",
                          onClick: this._onSendReportClick,
                        }),
                        Glamor.createElement(g().default.Spacer, {
                          width: "g1",
                        }),
                        Glamor.createElement(g().default.InfoCircle, {
                          tooltip: {
                            text: Glamor.createElement(
                              g().default.Fragment,
                              null,
                              "Clicking this button will send an internal technical data on this connectivity error to the development team for research. This data is not shared with 3rd parties."
                            ),
                          },
                        })
                      )
                    )
              ),
              onRateUsClick: this._onRateUsClick,
            })
          )
        : null;
    }
    _renderContacts() {
      return Glamor.createElement(
        "div",
        { css: hr.contacts },
        "Contact details: ",
        Glamor.createElement(
          "a",
          { href: "mailto:inssist@slashed.io" },
          "inssist@slashed.io"
        ),
        Glamor.createElement(g().default.Spacer, { height: 24 }),
        "Share a word about us:",
        Glamor.createElement(g().default.Spacer, { height: 4 }),
        Glamor.createElement(ur, null)
      );
    }
  }
  var gr = v().influx((e) => ({
    hasPro: true,
    hasProPaid: true,
    hasProPromocode: y().stateProxy.hasProPromocode(),
    whatsNew: e.whatsNew,
    showRateUs: !e.rateUs.acknowledged,
    isAfterTheEndUser: e.isAfterTheEndUser,
  }))(mr);
  v();
  var pr = v().action("whats-new.acknowledge-all", (e, t) => ({
    ...e,
    whatsNew: e.whatsNew.map((e) => ({ ...e, acknowledged: !0 })),
  }));
  const fr = ({ props: e }) => ({
      width: "100%",
      height: "100%",
      ...("tab-dm" !== e.selectedTabId && {
        ...g().default.fixed("0 0 0 0"),
        visibility: "hidden",
        pointerEvents: "none",
      }),
    }),
    vr = ({ props: e }) => ({
      width: "100%",
      height: "100%",
      ...(e.schedule.showFallback && {
        width: "calc(100vw - 84px)",
        marginLeft: 4,
      }),
      ...("tab-scheduling" !== e.selectedTabId && {
        ...g().default.fixed("0 0 0 0"),
        visibility: "hidden",
        pointerEvents: "none",
      }),
    }),
    Cr = {
      dm: "sidebar-mediator.dm",
      covers: "sidebar-mediator.covers",
      schedule: "sidebar-mediator.schedule",
      hashtags: "sidebar-mediator.hashtags",
      billing: "sidebar-mediator.billing",
      music: "sidebar-mediator.music",
    };
  g().default.Image.registerImages({
    "sidebar-mediator.billing": "tab-billing.png:34:45",
  }),
    g().default.SvgIcon.registerSvgIcons([
      `<symbol id="${Cr.dm}" viewBox="0 0 43.414 43.414"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M42 1.414l-22.55 22.55M42 1.414l-14.35 41-8.2-18.45L1 15.764z"/></g></symbol>`,
      `<symbol id="${Cr.covers}" viewBox="0 0 35.699 48.18"><g transform="translate(-1317 -255)"><line y1="8" transform="translate(1326.5 256.5)" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2"/><path d="M0,16V0" transform="translate(1344.5 256.5)" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2"/><path d="M0,12V0" transform="translate(1335.5 256.5)" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2"/><path d="M30.891,0H2.808A2.809,2.809,0,0,0,0,2.808V22.466H33.7V2.808A2.809,2.809,0,0,0,30.891,0ZM0,29.331a5.617,5.617,0,0,0,5.617,5.617h5.617v5.617a5.617,5.617,0,0,0,11.233,0V34.947h5.617A5.617,5.617,0,0,0,33.7,29.331V26.523H0Zm16.85,9.127a2.106,2.106,0,1,1-2.106,2.106A2.106,2.106,0,0,1,16.85,38.458Z" transform="translate(1318 256)" fill="none" stroke="currentColor" stroke-width="2"/></g></symbol>`,
      `<symbol id="${Cr.schedule}" viewBox="0 0 42.004 42.004"><path d="M10.002 42.002a24.394 24.394 0 01-10-10v-26a6.007 6.007 0 016-6h26a24.394 24.394 0 0110 10v26a6.007 6.007 0 01-6 6zm-4-6a4.006 4.006 0 004 4h26a4 4 0 004-4V28.69l-.635-.6-1.855-1.748-.213-.207a1.713 1.713 0 00-2.3-.059l-4.164 3.563a3.726 3.726 0 01-2.619.908l2.154 4.092a.971.971 0 01-.365 1.3.881.881 0 01-.447.117.927.927 0 01-.812-.5l-6.648-12.6-4.57-8.67a1.722 1.722 0 00-3.039-.059L6.001 29.084zm-4-30v26a4 4 0 002 3.463V10.002a6 6 0 016-6h4a1 1 0 010 2h-4a4.008 4.008 0 00-4 4v15.313l6.9-12.062a3.539 3.539 0 016.256.107l2.939 5.582 1.637 3.092 2.92 5.537a1.968 1.968 0 001.367 1.031 1.926 1.926 0 001.637-.432l4.164-3.568a3.529 3.529 0 013.693-.564l1.855 1.459.635.6V10.002a4.006 4.006 0 00-4-4h-14a1 1 0 110-2H35.47a4.117 4.117 0 00-.637-.83 3.991 3.991 0 00-2.831-1.17h-26a4.007 4.007 0 00-4 4zm24.605 8.381a4.556 4.556 0 114.553 4.553 4.562 4.562 0 01-4.553-4.555zm1.768 0a2.789 2.789 0 102.785-2.791 2.788 2.788 0 00-2.785 2.789zM17.002 5.002a1 1 0 111 1 1 1 0 01-1-1z" fill="currentColor"/></symbol>`,
      `<symbol id="${Cr.hashtags}" viewBox="0 0 38.717 48.907"><path d="M3.802 48.907a3.889 3.889 0 01-3.8-3.8V4.725A4.726 4.726 0 014.725.003h33.051a.945.945 0 010 1.889 2.836 2.836 0 000 5.672.943.943 0 01.943.944v37.564a2.844 2.844 0 01-2.832 2.838zm-1.914-3.8a2.1 2.1 0 001.914 1.909h32.082a.943.943 0 00.943-.944V9.452H4.722a4.679 4.679 0 01-2.834-.974zm0-40.382a2.836 2.836 0 002.834 2.838H33.99a4.734 4.734 0 010-5.672H4.722a2.832 2.832 0 00-2.834 2.831zm19.471 35.412l.8-6.676h-7.207l-.84 6.676h-1.9l.8-6.676h-4.99v-1.934h5.238l.916-7.387H9.145v-1.934h5.273l.811-6.675h1.934l-.846 6.675h7.244l.809-6.675h1.9l-.811 6.675h4.955v1.934h-5.2l-.914 7.387h4.99v1.934h-5.24l-.8 6.676zm-6.189-8.609h7.244l.914-7.387h-7.207z" fill="currentColor"/></symbol>`,
      `<symbol id="${Cr.billing}" _dx="23%" viewBox="0 0 47.703 36.216"><path d="M18.108 18.108a8.554 8.554 0 10-8.554-8.554 8.579 8.579 0 008.554 8.554zm0 4.277C12.441 22.385 1 25.272 1 30.939v4.277h34.216v-4.277c0-5.667-11.441-8.554-17.108-8.554z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M32.695 1.008h-2.424v5.6h1.3V5.064h1.124c1.5 0 2.432-.776 2.432-2.024s-.936-2.032-2.432-2.032zm-.072 3h-1.056V2.064h1.056c.792 0 1.192.36 1.192.976s-.4.968-1.192.968zm8.384 2.6l-1.256-1.8a1.821 1.821 0 001.156-1.768c0-1.256-.94-2.032-2.436-2.032h-2.424v5.6h1.3v-1.56h1.188l1.08 1.56zM39.591 3.04c0 .608-.4.976-1.192.976h-1.056V2.064h1.056c.792 0 1.192.36 1.192.976zm5.048 3.668a2.9 2.9 0 003.068-2.9 2.9 2.9 0 00-3.064-2.9 2.9 2.9 0 00-3.064 2.9 2.9 2.9 0 003.06 2.9zm0-1.1a1.708 1.708 0 01-1.752-1.8 1.708 1.708 0 011.752-1.792 1.708 1.708 0 011.752 1.792A1.708 1.708 0 0144.639 5.6z" fill="currentColor"/></symbol>`,
      `<symbol id="${Cr.music}" viewBox="0 0 41.521 44.119"><g transform="translate(6595.268 7553.377)"><g transform="translate(-6595.268 -7524.327)" fill="none" stroke="currentColor" stroke-width="2"><circle cx="7.534" cy="7.534" r="7.534" stroke="none"/><circle cx="7.534" cy="7.534" r="6.534" fill="none"/></g><g transform="translate(-6568.818 -7528.094)" fill="none" stroke="currentColor" stroke-width="2"><circle cx="7.534" cy="7.534" r="7.534" stroke="none"/><circle cx="7.534" cy="7.534" r="6.534" fill="none"/></g><path d="M-6584-7516.793v-30.734l26.44-4.658v31.626" transform="translate(2.812)" fill="none" stroke="currentColor" stroke-width="2"/><line y1="5.023" x2="26.37" transform="translate(-6580.559 -7545.046)" fill="none" stroke="currentColor" stroke-width="2"/></g></symbol>`,
    ]);
  class yr extends g().default.Component {
    constructor(...e) {
      var t;
      return (
        (t = super(...e)),
        (this._onElectronTabOpen = ({ tab: e }) => {
          this._onTabClick(e);
        }),
        (this._onTabClick = (e) => {
          v().model.state.sidebar.selectedTabId !== e &&
            m().gaController.sendEvent("user", `sidebar:open-${e}`),
            v().transaction((t) => {
              t.sidebar.selectedTabId === e
                ? (t.sidebar.isOpen = !t.sidebar.isOpen)
                : ((t.sidebar.isOpen = !0), (t.sidebar.selectedTabId = e));
            }),
            "logo" === this.props.selectedTabId && pr.dispatch();
        }),
        (this._onSidePanelCloseClick = () => {
          v().transaction((e) => {
            e.sidebar.isOpen = !1;
          }),
            "logo" === this.props.selectedTabId && pr.dispatch();
        }),
        (this._onClosed = () => {
          v().transaction((e) => {
            (e.sidebar.isOpen = !1), (e.sidebar.selectedTabId = null);
          });
        }),
        (this._onExpandClick = () => {
          ha.toggleTab("bulk");
        }),
        t
      );
    }
    componentDidMount() {
      this.props.withWhatsNewMarker &&
        v().transaction((e) => {
          (e.sidebar.isOpen = !0), (e.sidebar.selectedTabId = "logo");
        }),
        window.electron &&
          window.electron.addExtensionListener(
            "sidebar-mediator.open-tab",
            this._onElectronTabOpen
          );
    }
    componentWillUnmount() {
      window.electron &&
        window.electron.removeExtensionListener(
          "sidebar-mediator.open-tab",
          this._onElectronTabOpen
        );
    }
    render() {
      return Glamor.createElement(p().default.Sidebar, {
        open: this.props.isOpen,
        selectedTabId: this.props.selectedTabId,
        desktopPlatform: this.props.desktopPlatform,
        logoTab: this._getLogoTab(),
        menu: this._getMenu(),
        sidePanel: this._getSidePanel(),
        bodyPanel: this._getBodyPanel(),
        onTabClick: this._onTabClick,
        onSidePanelCloseClick: this._onSidePanelCloseClick,
        onClosed: this._onClosed,
        onExpandClick: this._getOnExpandClick(),
        onBodyPanelClosed: this._onBodyPanelClosed,
        onLogoLongPress: this._onLogoLongPress,
      });
    }
    _getLogoTab() {
      return {
        svgIcon: "igswiss.logo",
        withMarker: this.props.withWhatsNewMarker,
        withProSticker: this.props.hasPro,
      };
    }
    _getMenu() {
      const e = true
        ? "an infinite"
        : true
        ? "a lifetime"
        : true
        ? "a monthly"
        : "";
      return {
        disabled: !this.props.loggedIn,
        tabs: [
          {
            id: "tab-dm",
            svgIcon: Cr.dm,
            title: "Direct Messages",
            features: ["send messages", "ghost mode"],
            badgeText: this.props.dm.badge,
          },
          {
            id: "tab-scheduling",
            svgIcon: Cr.schedule,
            title: "Post Assistant",
            features: [
              "grid planner, bulk upload",
              "post carousels",
              "schedule with auto-post",
            ],
          },
          {
            id: "tab-tag-assist",
            svgIcon: Cr.hashtags,
            title: "Hashtag Assistant",
            features: [
              "manage hashtag collections",
              "find effective hashtags",
              "create hashtag ladders",
            ],
          },
          {
            id: "tab-billing",
            title: "PRO Version",
            iconStyle: { position: "relative", left: -1 },
            ...(this.props.hasProPaid
              ? {
                  svgIcon: Cr.billing,
                  features: [
                    "access to all advanced features",
                    `enabled with ${e} plan`,
                    "thank you 😘",
                  ],
                }
              : {
                  svgIcon: Cr.billing,
                  iconStyle: { position: "relative", left: -1 },
                  features: [
                    "access to all advanced features",
                    "support development",
                  ],
                }),
          },
        ].filter(Boolean),
      };
    }
    _getSidePanel() {
      let e,
        t = !1,
        s = null;
      const a = this.props.selectedTabId;
      "logo" === a
        ? (e = Glamor.createElement(gr, null))
        : "tab-dm" === a
        ? (s = 750)
        : "tab-tag-assist" === a
        ? (e = Glamor.createElement(Vt, null))
        : "tab-scheduling" === a
        ? this.props.schedule.showFallback
          ? ((t = !0), (e = null))
          : ((t =
              this.props.schedule.showTagAssist ||
              this.props.schedule.showBulkScreen),
            (e = Glamor.createElement(nn, null)))
        : "tab-billing" === a && ((t = !0), (e = null));
      const n =
        this.props.loggedIn &&
        Glamor.createElement(
          "div",
          { css: fr(this) },
          Glamor.createElement(no, null)
        );
      return {
        width: s,
        hidden: t,
        content: Glamor.createElement(g().default.Fragment, null, e, n),
        hideCloseButton:
          "tab-billing" === a ||
          "tab-scheduling" === a ||
          "tab-tag-assist" === a,
      };
    }
    _getBodyPanel() {
      const e = this.props,
        t = e.selectedTabId;
      let s = !1,
        a = null;
      "tab-scheduling" === t
        ? (s = e.schedule.showBody || e.schedule.showFallback)
        : "tab-billing" === t
        ? ((s = !0), (a = Glamor.createElement(Je, null)))
        : "tab-dm" === t &&
          ((s = e.quickReplies.showBody), (a = Glamor.createElement(ss, null)));
      const n =
        this.props.loggedIn &&
        Glamor.createElement(
          "div",
          { css: vr(this) },
          Glamor.createElement(fn, null)
        );
      return {
        open: s,
        content: Glamor.createElement(g().default.Fragment, null, a, n),
      };
    }
    _getOnExpandClick() {
      return "tab-scheduling" !== this.props.selectedTabId ||
        this.props.schedule.showSetupPanel
        ? null
        : this._onExpandClick;
    }
  }
  var br = v().influx((e) => ({
    loggedIn: e.authStatus.isLoggedIn,
    selectedTabId: e.sidebar.selectedTabId,
    desktopPlatform: e.desktopPlatform,
    withWhatsNewMarker: e.whatsNew.some((e) => !e.acknowledged),
    hasPro: true,
    hasProPaid: true,
    hasAllFeatures: true,
    schedule: {
      showBody: e.schedule.debug || e.schedule.navigation.isOpen,
      showFallback: e.schedule.fallback.isEnabled,
      showTagAssist: e.schedule.showTagAssist,
      showBulkScreen:
        "bulk" === e.schedule.navigation.selectedTabId &&
        e.schedule.navigation.isOpen,
      showSetupPanel: e.schedule.fcsSetup.showPanel,
    },
    dm: { badge: e.dm.badgeText },
    quickReplies: { showBody: e.quickReplies.shown },
  }))(yr);
  g(), p(), v();
  class kr extends g().default.Component {
    constructor(...e) {
      var t;
      return (
        (t = super(...e)),
        (this._onLetsGoClick = () => {
          v().transaction((e) => {
            e.welcome.shown = !1;
          });
        }),
        t
      );
    }
    render() {
      return Glamor.createElement(p().default.Welcome, {
        title: "Instagram Assistant",
        description: Glamor.createElement(
          g().default.Fragment,
          null,
          "Inssist is your personal Instagram Assistant and is the best way to use ",
          Glamor.createElement("b", null, "Instagram on Desktop"),
          ", ads free:"
        ),
        listItems: [
          Glamor.createElement(
            g().default.Fragment,
            null,
            "Post photos, videos, stories, reels. Send DMs."
          ),
          Glamor.createElement(
            g().default.Fragment,
            null,
            "Schedule posts, videos and carousels to be published automatically. Calendar and time slots included."
          ),
          Glamor.createElement(
            g().default.Fragment,
            null,
            "Get relevant hashtag suggestions and manage hashtag collections. Select custom video covers."
          ),
        ],
        buttonLabel: "OK, LET'S GO",
        onButtonClick: this._onLetsGoClick,
        disclaimer: Glamor.createElement(
          g().default.Fragment,
          null,
          "Disclaimer: this app is not endorsed or certified by Instagram™. All Instagram™ logos and trademarks displayed on this app are property of third parties. Inssist is distributed AS IS. By using Inssist you agree to the Inssist terms of service found here: ",
          Glamor.createElement(
            "a",
            { href: "https://inssist.com/terms" },
            "https://inssist.com/terms"
          ),
          ".",
          Glamor.createElement("br", null),
          Glamor.createElement("br", null),
          Glamor.createElement(
            "b",
            null,
            "We do not use or sell your data. Inssist is ads free."
          )
        ),
      });
    }
  }
  v(), f(), m(), y(), g(), p();
  const wr = (e) => ({
      ...g().default.text.nowrap,
      opacity: 0,
      pointerEvents: "none",
      ...(e.showTosSummary && { opacity: 1, pointerEvents: "inherit" }),
    }),
    Sr = (e, t) => ({
      ...g().default.absolute(". 0 31 ."),
      ...g().default.transition.fast,
      width: 406,
      opacity: 0,
      transform: "translateY(20px)",
      pointerEvents: "none",
      ...(e.showTosSummary &&
        t.panelShown && {
          opacity: 1,
          transform: "none",
          pointerEvents: "inherit",
        }),
    });
  class Tr extends g().default.Component {
    constructor(e) {
      super(e),
        (this._onButtonClick = () => {
          this.setState({ panelShown: !this.state.panelShown });
        }),
        (this._onClose = () => {
          m().gaController.sendEvent("user", "tos-summary:close-click"),
            y().actions.acknowledge.dispatch("tosSummary");
        }),
        (this._onOkClick = () => {
          m().gaController.sendEvent("user", "tos-summary:ok-click"),
            y().actions.acknowledge.dispatch("tosSummary");
        }),
        (this._onFullTermsClick = () => {
          m().gaController.sendEvent("user", "tos-summary:terms-click"),
            chrome.tabs.create({ url: f().common.termsUrl });
        }),
        (this._onPrivacyPolicyClick = () => {
          m().gaController.sendEvent("user", "tos-summary:privacy-click"),
            chrome.tabs.create({ url: f().common.policyUrl });
        }),
        (this._onFaqClick = () => {
          m().gaController.sendEvent("user", "tos-summary:faq-click"),
            chrome.tabs.create({ url: f().common.faqUrl });
        }),
        (this.state = { panelShown: !1 });
    }
    componentDidUpdate(e) {
      !e.showTosSummary &&
        this.props.showTosSummary &&
        m().gaController.sendEvent("user", "tos-summary:shown");
    }
    render() {
      return Glamor.createElement(
        g().default.Fragment,
        null,
        Glamor.createElement(
          "div",
          { css: wr(this.props) },
          Glamor.createElement(g().default.LinkButton, {
            label: "CRACKED BY YEZER",
            color: g().default.color.textPassive,
            small: !0,
            onClick: this._onButtonClick,
          })
        ),
        Glamor.createElement(
          "div",
          { css: Sr(this.props, this.state) },
          Glamor.createElement(p().default.TosSummary, {
            onClose: this._onClose,
            onOkClick: this._onOkClick,
            onFullTermsClick: this._onFullTermsClick,
            onPrivacyPolicyClick: this._onPrivacyPolicyClick,
            onFaqClick: this._onFaqClick,
          })
        )
      );
    }
  }
  var Er = v().influx((e) => ({
    showTosSummary: -1 === e.acknowledged.tosSummary,
  }))(Tr);
  g(), p(), v(), m(), de(), C();
  const _r = "ig-buttons-mediator.back",
    Ar = "ig-buttons-mediator.refresh",
    Pr = "ig-buttons-mediator.fullscreen-enter",
    Ir = "ig-buttons-mediator.fullscreen-exit",
    xr = "ig-buttons-mediator.switch-to-day",
    Gr = "ig-buttons-mediator.switch-to-night",
    Dr = "ig-buttons-mediator.zen",
    Br = "ig-buttons-mediator.ghost-story-view-on",
    Fr = "ig-buttons-mediator.ghost-story-view-off",
    Or = "ig-buttons-mediator.zen-on";
  g().default.SvgIcon.registerSvgIcons([
    `<symbol id="${_r}" viewBox="0 0 40 40"><path fill="none" d="M0 0h40v40H0z"/><path d="M15.125 19.846l9.1-9.1-1.385-1.384-9.644 9.644a1.2 1.2 0 0 0 0 1.681l9.635 9.634 1.385-1.384z" fill="currentColor"/></symbol>`,
    `<symbol id="${Ar}" viewBox="0 0 40 40"><path fill="none" d="M0 0h40v40H0z"/><path d="M30.378 18.7a.82.82 0 1 0-1.618.258v.015a9.022 9.022 0 1 1-2.24-4.582L22.896 15.6l.518 1.555 4.917-1.639a.82.82 0 0 0 .561-.778V9.819h-1.64v2.994a10.546 10.546 0 1 0 3.126 5.887z" fill="currentColor"/></symbol>`,
    `<symbol id="${Pr}" viewBox="0 0 40 40"><path fill="none" d="M0 0h40v40H0z"/><path d="M28.163 26.952l-3.722-3.722-1.211 1.211 3.722 3.722H24.06v1.721h5.824V24.06h-1.721zm-3.722-10.179l3.722-3.725v2.892h1.721v-5.824H24.06v1.721h2.892l-3.722 3.721zm-8.883 6.457l-3.722 3.722V24.06h-1.72v5.824h5.824v-1.721h-2.892l3.725-3.722zm.382-11.393v-1.721h-5.824v5.824h1.721v-2.892l3.721 3.725 1.215-1.215-3.725-3.721z" fill="currentColor"/></symbol>`,
    `<symbol id="${Ir}" viewBox="0 0 40 40"><path fill="none" d="M0 0h40v40H0z"/><path d="M24.951 26.162l3.722 3.722 1.211-1.211-3.722-3.722h2.892V23.23H23.23v5.824h1.721zm3.722-16.046l-3.722 3.725v-2.892H23.23v5.824h5.824v-1.721h-2.892l3.722-3.721zM11.332 29.884l3.722-3.722v2.892h1.72V23.23H10.95v1.721h2.892l-3.725 3.722zm-.382-14.832v1.721h5.824v-5.824h-1.721v2.892l-3.721-3.725-1.215 1.215 3.725 3.721z" fill="currentColor"/></symbol>`,
    `<symbol id="${xr}" viewBox="0 0 40 40"><g transform="translate(3444 7623)"><rect width="40" height="40" transform="translate(-3444 -7623)" fill="none"/><path d="M11.166,20.406h3.118l-1.561,5.045ZM7.535,18.6l2.7,1.56L6.36,23.745Zm7.811,1.515,2.673-1.606,1.259,5.129Zm-9.2-7.347a6.622,6.622,0,1,1,6.621,6.529A6.576,6.576,0,0,1,6.14,12.766Zm-.8,2.579,1.607,2.673L1.816,19.277ZM18.6,17.917l1.56-2.7,3.588,3.875Zm1.81-6.75,5.045,1.561-5.045,1.558ZM0,12.723l5.045-1.557v3.118ZM1.707,6.36,6.855,7.534l-1.56,2.7Zm16.8,1.074,5.129-1.261-3.524,3.933ZM6.174,1.816l3.932,3.522L7.434,6.945Zm9.042,3.479,3.875-3.589L17.917,6.854Zm-4.049-.25L12.727,0l1.557,5.045Z" transform="translate(-3436.759 -7615.715)" fill="currentColor"/></g></symbol>`,
    `<symbol id="${Gr}" viewBox="0 0 40 40"><g transform="translate(3380 7623)"><rect width="40" height="40" transform="translate(-3380 -7623)" fill="none"/><g transform="translate(-3372.822 -7615.724)"><path d="M10.518,0a10.077,10.077,0,0,0-1.3.082A10.511,10.511,0,1,0,10.518,0ZM2.63,10.518A7.9,7.9,0,0,1,7.4,3.273a10.52,10.52,0,0,0,7.556,13.771A7.89,7.89,0,0,1,2.63,10.518Z" transform="translate(2.25 2.25)" fill="currentColor"/></g></g></symbol>`,
    `<symbol id="${Dr}" viewBox="0 0 24.512 18.248"><path d="M24.3 14.632a8.813 8.813 0 00-2.357-1.69 9.42 9.42 0 002.271-4.292.719.719 0 00-.548-.7 9.941 9.941 0 00-3.588-.277c.044-.224.082-.449.112-.677a10.525 10.525 0 00-.27-4.118.718.718 0 00-.88-.508 10.6 10.6 0 00-3.729 1.848A10.866 10.866 0 0012.763.207a.719.719 0 00-1.016 0A10.866 10.866 0 009.2 4.222a10.6 10.6 0 00-3.729-1.848.718.718 0 00-.879.508 10.527 10.527 0 00-.158 4.798 9.941 9.941 0 00-3.586.276.719.719 0 00-.551.7 9.355 9.355 0 002.271 4.292A8.811 8.811 0 00.21 14.632a.718.718 0 000 1.016 8.877 8.877 0 0012.045.47 8.877 8.877 0 0012.031-.456.718.718 0 00.015-1.03zm-4.64-5.45a8.509 8.509 0 012.915 0 8.478 8.478 0 01-7.5 5.545 10.579 10.579 0 004.587-5.547zm-17.727 0a8.51 8.51 0 012.915 0 10.58 10.58 0 004.582 5.545 8.477 8.477 0 01-7.5-5.545zm4.552 7.629a7.383 7.383 0 01-4.7-1.672A7.322 7.322 0 013.7 14.007a9.9 9.9 0 005.826 2.159 7.42 7.42 0 01-3.043.646zm.4-6.624a9.15 9.15 0 01-1.077-6.2 9.171 9.171 0 012.96 1.746 10.921 10.921 0 001.249 7.677 9.122 9.122 0 01-3.125-3.222zm5.364 3.9a9.482 9.482 0 010-12.309 9.482 9.482 0 010 12.309zm3.705-6.155a10.931 10.931 0 00-.224-2.2A9.171 9.171 0 0118.7 3.98a9.143 9.143 0 01-4.21 9.423 10.9 10.9 0 001.471-5.474zm2.064 8.882a7.419 7.419 0 01-3.043-.646 9.9 9.9 0 005.826-2.159 7.326 7.326 0 011.917 1.133 7.383 7.383 0 01-4.693 1.67z" fill="currentColor"/></symbol>`,
    `<symbol id="${Br}" viewBox="0 0 26 26"><defs><linearGradient id="brand" x1=".5" x2=".5" y2="1.048" gradientUnits="objectBoundingBox"><stop offset="0" stop-color="#f27633"/><stop offset=".477" stop-color="#e94153"/><stop offset="1" stop-color="#8f2483"/></linearGradient></defs><path d="M12.972 26a13.078 13.078 0 0 1-6.128-1.525.9.9 0 1 1 .847-1.583 11.3 11.3 0 0 0 7.842 1.021.9.9 0 0 1 .409 1.748 13.138 13.138 0 0 1-2.97.338Zm-8.34-3.316a.9.9 0 0 1-.618-.246 12.952 12.952 0 0 1-3.7-6.363.9.9 0 0 1 1.748-.423 11.161 11.161 0 0 0 3.191 5.484.9.9 0 0 1-.618 1.548ZM.9 12.691H.815A.9.9 0 0 1 0 11.71a12.886 12.886 0 0 1 1.152-4.2.9.9 0 0 1 1.63.758 11.091 11.091 0 0 0-.982 3.611.9.9 0 0 1-.894.812Zm3.771-7.6a.9.9 0 0 1-.691-1.466q.116-.147.244-.289A.9.9 0 1 1 5.58 4.514c-.072.082-.141.165-.211.248a.9.9 0 0 1-.694.328Zm14.518 19.2a.9.9 0 0 1-.463-1.667A11.2 11.2 0 0 0 12.972 1.8a.9.9 0 1 1 0-1.8 13 13 0 0 1 6.682 24.161.893.893 0 0 1-.461.127Z" fill="url(#brand)"/><path d="M12.877 7.5A4.061 4.061 0 0 0 10.1 8.847 4.315 4.315 0 0 0 9 11.8v5.67a.351.351 0 0 0 .056.191.336.336 0 0 0 .15.126.324.324 0 0 0 .192.02.33.33 0 0 0 .171-.094l.519-.4a.326.326 0 0 1 .233-.066.331.331 0 0 1 .215.114l.895 1.039a.326.326 0 0 0 .471 0l.849-.985a.333.333 0 0 1 .113-.085.325.325 0 0 1 .273 0 .334.334 0 0 1 .113.085l.849.985a.326.326 0 0 0 .471 0l.895-1.039a.33.33 0 0 1 .215-.114.326.326 0 0 1 .233.066l.519.4a.33.33 0 0 0 .171.094.324.324 0 0 0 .192-.02.336.336 0 0 0 .149-.126.352.352 0 0 0 .056-.193v-5.841a4.235 4.235 0 0 0-.316-1.608 4.133 4.133 0 0 0-.9-1.354 3.989 3.989 0 0 0-1.34-.886 3.891 3.891 0 0 0-1.567-.279Zm-1.21 4.812a.652.652 0 0 1-.37-.116.683.683 0 0 1-.246-.309.706.706 0 0 1-.038-.4.7.7 0 0 1 .182-.352.661.661 0 0 1 .341-.188.648.648 0 0 1 .385.039.671.671 0 0 1 .3.253.7.7 0 0 1-.083.868.656.656 0 0 1-.471.207Zm2.667 0a.652.652 0 0 1-.37-.116.684.684 0 0 1-.246-.309.706.706 0 0 1-.038-.4.7.7 0 0 1 .182-.352.661.661 0 0 1 .341-.188.648.648 0 0 1 .385.039.671.671 0 0 1 .3.253.7.7 0 0 1-.083.868.656.656 0 0 1-.472.207Z" fill="url(#brand)"/></symbol>`,
    `<symbol id="${Fr}" viewBox="0 0 26 26"><path d="M12.972 26a13.078 13.078 0 0 1-6.128-1.525.9.9 0 1 1 .847-1.583 11.3 11.3 0 0 0 7.842 1.021.9.9 0 0 1 .409 1.748 13.138 13.138 0 0 1-2.97.338Zm-8.34-3.316a.9.9 0 0 1-.618-.246 12.952 12.952 0 0 1-3.7-6.363.9.9 0 0 1 1.748-.423 11.161 11.161 0 0 0 3.191 5.484.9.9 0 0 1-.618 1.548ZM.9 12.691H.815A.9.9 0 0 1 0 11.71a12.886 12.886 0 0 1 1.152-4.2.9.9 0 0 1 1.63.758 11.091 11.091 0 0 0-.982 3.611.9.9 0 0 1-.894.812Zm3.771-7.6a.9.9 0 0 1-.691-1.466q.116-.147.244-.289A.9.9 0 1 1 5.58 4.514c-.072.082-.141.165-.211.248a.9.9 0 0 1-.694.328Zm14.518 19.2a.9.9 0 0 1-.463-1.667A11.2 11.2 0 0 0 12.972 1.8a.9.9 0 1 1 0-1.8 13 13 0 0 1 6.682 24.161.893.893 0 0 1-.461.127Z" fill="currentColor"/><path d="M12.877 7.5A4.061 4.061 0 0 0 10.1 8.847 4.315 4.315 0 0 0 9 11.8v5.67a.351.351 0 0 0 .056.191.336.336 0 0 0 .15.126.324.324 0 0 0 .192.02.33.33 0 0 0 .171-.094l.519-.4a.326.326 0 0 1 .233-.066.331.331 0 0 1 .215.114l.895 1.039a.326.326 0 0 0 .471 0l.849-.985a.333.333 0 0 1 .113-.085.325.325 0 0 1 .273 0 .334.334 0 0 1 .113.085l.849.985a.326.326 0 0 0 .471 0l.895-1.039a.33.33 0 0 1 .215-.114.326.326 0 0 1 .233.066l.519.4a.33.33 0 0 0 .171.094.324.324 0 0 0 .192-.02.336.336 0 0 0 .149-.126.352.352 0 0 0 .056-.193v-5.841a4.235 4.235 0 0 0-.316-1.608 4.133 4.133 0 0 0-.9-1.354 3.989 3.989 0 0 0-1.34-.886 3.891 3.891 0 0 0-1.567-.279Zm-1.21 4.812a.652.652 0 0 1-.37-.116.683.683 0 0 1-.246-.309.706.706 0 0 1-.038-.4.7.7 0 0 1 .182-.352.661.661 0 0 1 .341-.188.648.648 0 0 1 .385.039.671.671 0 0 1 .3.253.7.7 0 0 1-.083.868.656.656 0 0 1-.471.207Zm2.667 0a.652.652 0 0 1-.37-.116.684.684 0 0 1-.246-.309.706.706 0 0 1-.038-.4.7.7 0 0 1 .182-.352.661.661 0 0 1 .341-.188.648.648 0 0 1 .385.039.671.671 0 0 1 .3.253.7.7 0 0 1-.083.868.656.656 0 0 1-.472.207Z" fill="currentColor"/></symbol>`,
  ]),
    g().default.Image.registerImages({ [Or]: "lotus.png:24.49:18.24" });
  class Mr extends g().default.Component {
    constructor(...e) {
      var t;
      return (
        (t = super(...e)),
        (this._onBackClick = () => {
          m().gaController.sendEvent("user", "control:back-click"),
            C().iframeBus.send("ig.back");
        }),
        (this._onRefreshClick = () => {
          m().gaController.sendEvent("user", "control:refresh-click"),
            C().iframeBus.send("ig.refresh");
        }),
        (this._onFullscreenClick = () => {
          const e = this.props.isFullscreen
            ? "fullscreen:exit"
            : "fullscreen:enter";
          v().transaction((e) => {
            e.igView.fullscreen = !e.igView.fullscreen;
          }),
            m().gaController.sendEvent("user", e),
            C().iframeBus.send("ig.widescreen-toggled");
        }),
        (this._onToggleThemeClick = () => {
          g().default.theme.toggleTheme();
        }),
        (this._onToggleGhostStoryViewClick = () => {
          v().transaction((e) => {
            e.ghostStoryView.enabled = !e.ghostStoryView.enabled;
          }),
            v().model.state.ghostStoryView.enabled
              ? m().gaController.sendEvent("user", "ghost-story-view:toggle-on")
              : m().gaController.sendEvent(
                  "user",
                  "ghost-story-view:toggle-off"
                );
        }),
        (this._onToggleZenClick = () => {
          ro.toggleZenMode();
        }),
        t
      );
    }
    render() {
      return Glamor.createElement(p().default.IgButtons, {
        isHorizontal: this.props.isHorizontal,
        buttons: [
          { id: "back", icon: _r, onClick: this._onBackClick },
          {
            id: "refresh",
            icon: Ar,
            onClick: this._onRefreshClick,
            onLongPress: () => {
              de().resetController.reset(), location.reload();
            },
          },
          {
            id: "widescreen",
            icon: this.props.isFullscreen ? Ir : Pr,
            onClick: this._onFullscreenClick,
          },
          {
            id: "theme",
            icon: "night" === this.state.theme ? xr : Gr,
            onClick: this._onToggleThemeClick,
          },
          {
            id: "story-ghost-view",
            icon: this.props.ghostStoryViewEnabled ? Br : Fr,
            tooltip: {
              title:
                "GHOST STORY VIEW – " +
                (this.props.ghostStoryViewEnabled ? "ON" : "OFF"),
              text: Glamor.createElement(
                React.Fragment,
                null,
                "Stay anonymous while viewing Instagram stories (turned ",
                this.props.ghostStoryViewEnabled ? "on" : "off",
                ")"
              ),
            },
            onClick: this._onToggleGhostStoryViewClick,
          },
          {
            id: "zen",
            icon: this.props.zenModeEnabled ? null : Dr,
            image: this.props.zenModeEnabled ? Or : null,
            tooltip: {
              title: "ZEN MODE",
              text: Glamor.createElement(
                g().default.Fragment,
                null,
                "Switch your Instagram home feed",
                Glamor.createElement("br", null),
                "to a distraction free mode (PRO)"
              ),
            },
            onClick: this._onToggleZenClick,
          },
        ],
      });
    }
  }
  var Lr = v().influx((e) => ({
    isFullscreen: e.igView.fullscreen,
    zenModeEnabled: e.zen.enabled,
    ghostStoryViewEnabled: e.ghostStoryView.enabled,
  }))(g().default.theme.ThemeAware(Mr));
  g(), p(), A(), m(), C(), w(), v();
  const Ur = ({ state: e }) => ({
    ...(e.disableHover && {
      pointerEvents: "none !important",
      "& *": { pointerEvents: "none !important" },
    }),
  });
  class Rr extends g().default.Component {
    constructor(e) {
      super(e),
        Nr.call(this),
        (this.state = { loggedInStatus: null, disableHover: !1 });
    }
    componentDidMount() {
      w().chromeBus.on("auth.refreshed", this._dropLoggedInStatus),
        C().iframeBus.on("ig.ready", this._dropDisableHover);
    }
    componentWillUnmount() {
      w().chromeBus.off("auth.refreshed", this._dropLoggedInStatus),
        C().iframeBus.off("ig.ready", this._dropDisableHover);
    }
    render() {
      const e = this.props;
      return e.hidden
        ? null
        : Glamor.createElement(p().default.AccountSwitcher, {
            style: Ur(this),
            accounts: e.accounts.map((t) => {
              const s = t.userId === e.selectedUserId && !e.addingNewAccount;
              let a = !0;
              return (
                s &&
                  (a =
                    null === this.state.loggedInStatus
                      ? e.loggedIn
                      : this.state.loggedInStatus),
                {
                  id: t.userId,
                  name: `@${t.username}`,
                  avatarUrl: t.avatarUrl,
                  selected: s,
                  loggedIn: a,
                }
              );
            }),
            backgroundColor: this.props.backgroundColor,
            addingNewAccount: this.props.addingNewAccount,
            onSwitchAccountClick: this._onSwitchAccountClick,
            onAddAccountClick: this._onAddAccountClick,
            onDisconnectAccountClick: this._onDisconnectAccountClick,
          });
    }
    async _logout() {
      this.setState({ loggedInStatus: !1 }), w().chromeBus.send("auth.logout");
    }
    async _login(e) {
      this.setState({ loggedInStatus: !0 }),
        w().chromeBus.send("auth.login", e);
    }
    _alertScheduleSaving() {
      alert(
        "Inssist is saving changed to Scheduled Posts.Please wait for the save to complete before switching accounts."
      );
    }
  }
  var Nr = function () {
      (this._onSwitchAccountClick = async (e) => {
        if (this.props.scheduleIsSaving)
          return void this._alertScheduleSaving();
        const t = this.props,
          s = t.accounts.find((t) => t.userId === e);
        if (
          (this.setState({ disableHover: !0 }),
          m().gaController.sendEvent("user", "multiaccount:switch"),
          v().transaction((t) => {
            (t.multiaccount.addingNewAccount = !1),
              (t.multiaccount.selectedUserId = e);
          }),
          t.loggedIn)
        ) {
          const e = await C().iframeBus.send("ig.get-url"),
            a = e.split("/")[1].split("?")[0];
          if (
            a === t.accounts.find((e) => e.userId === t.selectedUserId).username
          ) {
            const t = e.replace(a, s.username);
            await w().chromeBus.send("auth.set-ig-initial-url", t);
          }
        }
        this._login(e);
      }),
        (this._onAddAccountClick = async () => {
          this.props.scheduleIsSaving
            ? this._alertScheduleSaving()
            : (this.setState({ disableHover: !0 }),
              v().transaction((e) => {
                e.multiaccount.addingNewAccount = !0;
              }),
              this._logout());
        }),
        (this._onDisconnectAccountClick = (e) => {
          if (this.props.scheduleIsSaving)
            return void this._alertScheduleSaving();
          const t = this.props.selectedUserId === e;
          if (t && this.props.loggedIn)
            return (
              v().transaction((e) => {
                e.authStatus.cookies.igSessionId = null;
              }),
              this.setState({ disableHover: !0 }),
              void this._logout()
            );
          let s;
          v().transaction((t) => {
            const a = t.multiaccount.userIds;
            A().default(a, e), (s = a[a.length - 1] || null);
          }),
            t &&
              s &&
              (v().transaction((e) => {
                e.multiaccount.selectedUserId = s;
              }),
              this.setState({ loggedInStatus: !0 }),
              this.setState({ disableHover: !0 }),
              this._login(s));
        }),
        (this._dropLoggedInStatus = () => {
          this.setState({ loggedInStatus: null });
        }),
        (this._dropDisableHover = () => {
          this.setState({ disableHover: !1 });
        });
    },
    Vr = v().influx((e) => ({
      hidden: e.welcome.shown,
      loggedIn: e.authStatus.isLoggedIn,
      selectedUserId: e.multiaccount.selectedUserId,
      addingNewAccount: e.multiaccount.addingNewAccount,
      scheduleIsSaving: ha.isSaving(),
      accounts: e.multiaccount.userIds
        .map((t) => {
          const s = e.userStates[t] || e;
          if (!s.authStatus.isLoggedIn) return null;
          if (s.authStatus.userId !== t) return null;
          const a = s.authStatus;
          return {
            userId: a.userId,
            username: a.username,
            avatarUrl: a.avatarUrl,
          };
        })
        .filter(Boolean),
    }))(Rr);
  g(), p(), E(), P(), y(), v();
  class Hr extends g().default.Component {
    constructor(...e) {
      var t;
      return (
        (t = super(...e)),
        (this._onSendEmailClick = (e) => {
          const t = E().default(`${P().env.options.apiUrl}/promo`, {
            username: v().model.state.authStatus.username,
            email: e,
          });
          fetch(t);
        }),
        (this._onOkClick = () => {
          this._acknowledge();
        }),
        (this._onCancelSubscriptionClick = () => {
          this._acknowledge(),
            chrome.tabs.create({
              url: "https://slashed.onfastspring.com/account",
              active: !0,
            });
        }),
        t
      );
    }
    render() {
      return this.props.show
        ? Glamor.createElement(p().default.TheEndOverlay, {
            showCancelSubscriptionButton: this.props.hasSubscription,
            onSendEmailClick: this._onSendEmailClick,
            onOkClick: this._onOkClick,
            onCancelSubscriptionClick: this._onCancelSubscriptionClick,
          })
        : null;
    }
    _acknowledge() {
      v().transaction((e) => {
        e.acknowledged.theEnd = Date.now();
      });
    }
  }
  var zr = v().influx((e) => ({
    show: !e.acknowledged.theEnd || -1 === e.acknowledged.theEnd,
    hasSubscription: true,
  }))(Hr);
  g(), p(), g(), p(), v(), m(), L();
  class Wr extends g().default.Component {
    constructor(...e) {
      var t;
      return (
        (t = super(...e)),
        (this._onActionBlockCloseClick = () => {
          m().gaController.sendEvent("user", "action-block:close-click"),
            v().transaction((e) => {
              e.igTask.actionBlockCode = null;
            });
        }),
        t
      );
    }
    render() {
      const { code: e } = this.props;
      let t = Boolean(e),
        s = null;
      return (
        e === L().ec.missingPost || e === L().ec.notFound
          ? (t = !1)
          : (s =
              e === L().ec.suspended
                ? [
                    "Instagram has blocked this action, probably because it might think you are mass liking / following people.",
                    "Please re-login to Instagram.com to refresh the session and let your account rest for some time.",
                  ]
                : e === L().ec.tooManyRequests
                ? [
                    "Instagram has refused this action: too many like or follow actions were made recently.",
                    "Please give it some time to rest before trying again.",
                  ]
                : e === L().ec.noNetwork
                ? [
                    "Can not reach Instagram server. Please check Internet connection.",
                  ]
                : e === L().ec.timedOut
                ? [
                    "Server connection has timed out or Instagram server is not responding.",
                    "Please try again later or check or Internet connection.",
                  ]
                : e === L().ec.redirectToLogin
                ? ["Instagram session expired. Please re-login to Instagram."]
                : e === L().ec.missingUser
                ? [
                    "Liked or followed user account is no longer found on Instagram.",
                  ]
                : e === L().ec.forbidden
                ? ["Instagram session expired. Please re-login to Instagram."]
                : e === L().ec.serverIsDown ||
                  e === L().ec.badGateway ||
                  e === L().ec.serviceUnavailable
                ? [
                    "Instagram server is not responding. Please check Internet connection and try again later when Instagram is back online.",
                  ]
                : [
                    "Instagram refused to perform this action. Please try again later.",
                  ]),
        Glamor.createElement(
          p().default.SnackbarItem,
          { id: "action-block-card-mediator", show: t },
          Glamor.createElement(g().default.InfoCard, {
            markerColor: g().default.color.error,
            title: "Oops… Action Blocked",
            content: s,
            onClose: this._onActionBlockCloseClick,
          })
        )
      );
    }
  }
  var $r = v().influx((e) => ({ code: e.igTask.actionBlockCode }))(Wr);
  class qr extends g().default.Component {
    render() {
      return Glamor.createElement(
        p().default.Snackbar,
        null,
        Glamor.createElement(he, null),
        Glamor.createElement($r, null),
        Glamor.createElement(yn, null),
        Glamor.createElement(En, null),
        Glamor.createElement(ys, null),
        Glamor.createElement(Wt, null),
        Glamor.createElement(et, null),
        Glamor.createElement(st, null)
      );
    }
  }
  class jr extends g().default.Component {
    render() {
      return Glamor.createElement(
        g().default.Fragment,
        null,
        Glamor.createElement(p().default.Layout, {
          Sidebar: br,
          IgView: qn,
          IgButtons: Lr,
          Welcome: kr,
          Tips: lt,
          Tos: Er,
          AccountSwitcher: Vr,
          Snackbar: qr,
          assistPanel: this._getAssistPanel(),
          igViewAfter: this._renderIgViewAfter(),
          isFullscreen: this.props.isFullscreen,
          isSidebarOpen: this.props.isSidebarOpen,
          isWelcomeShown: this.props.isWelcomeShown,
          isAssistPanelShown: this._isAssistPanelShown(),
          isExperimentsBarShown: this.props.isExperimentsBarShown,
          igViewFullscreenWidth: this.props.igViewFullscreenWidth,
          igViewWithBorder: this.props.igViewWithBorder,
          onBodyWheel: this._onBodyWheel,
        }),
        Glamor.createElement(g().default.TooltipsContainer, null),
        Glamor.createElement(wn, null),
        Glamor.createElement(zr, null)
      );
    }
    _getAssistPanel() {
      return this.props.isTagAssistShown
        ? Glamor.createElement(Nt, null)
        : this.props.isCoverAssistShown
        ? Glamor.createElement(li, null)
        : this.props.isMusicAssistShown
        ? Glamor.createElement(Jo, null)
        : this.props.isStoryAssistShown
        ? Glamor.createElement(xi, null)
        : null;
    }
    _renderIgViewAfter() {
      return Glamor.createElement(
        React.Fragment,
        null,
        Glamor.createElement(Bi, null),
        Glamor.createElement(nr, null)
      );
    }
    _isAssistPanelShown() {
      return (
        !this.props.isSidebarOpen &&
        (this.props.isTagAssistShown ||
          this.props.isCoverAssistShown ||
          this.props.isMusicAssistShown ||
          this.props.isStoryAssistShown)
      );
    }
    _onBodyWheel(e) {
      C().iframeBus.send("ig.broadcast-scroll", e.deltaY);
    }
  }
  var Yr = v().influx((e) => ({
    isFullscreen: e.igView.fullscreen,
    isSidebarOpen:
      (e.authStatus.isLoggedIn || "logo" === e.sidebar.selectedTabId) &&
      e.sidebar.isOpen,
    isWelcomeShown: e.welcome.shown,
    isTagAssistShown: e.tagAssist.shown,
    isCoverAssistShown: e.coverAssist.shown,
    isMusicAssistShown: e.musicAssist.shown,
    isStoryAssistShown: e.storyAssist.shown,
    isExperimentsBarShown: e.experiments.enabled,
    igViewFullscreenWidth: e.igView.fullscreenWidth,
    igViewWithBorder: e.igView.withBorder,
  }))(jr);
  g().default.init({
    _: o().default,
    pathPrefix: "/img/",
    images: {
      "rate-us-heart": "ui-igswiss/rate-us-heart.png:40:40",
      "hex-bug": "ui-igswiss/hex-bug.png:53.47:60.01",
      "hex-zen": "ui-igswiss/hex-zen.png:53.47:60.01",
      "hex-story": "ui-igswiss/hex-story.png:53.47:60.01",
      "hex-carousel": "ui-igswiss/hex-carousel.png:53.47:60.01",
      "hex-multiaccount": "ui-igswiss/hex-multiaccount.png:53.47:60.01",
      "hex-analytics": "ui-igswiss/hex-analytics.png:53.47:60.01",
      "hex-monitor": "ui-igswiss/hex-monitor.png:53.47:60.01",
      "hex-tag": "ui-igswiss/hex-tag.png:53.47:60.01",
      "hex-mentions": "ui-igswiss/hex-mentions.png:53.47:60.01",
      "hex-marker": "ui-igswiss/hex-marker.png:53.47:60.01",
      "hex-video": "ui-igswiss/hex-video.png:53.47:60.01",
      "hex-igtv": "ui-igswiss/hex-igtv.png:53.47:60.01",
      "hex-insights": "ui-igswiss/hex-insights.png:53.47:60.01",
      "hex-igswiss": "ui-igswiss/hex-igswiss.png:53.47:60.01",
      "hex-quality": "ui-igswiss/hex-quality.png:53.47:60.01",
      "hex-update": "ui-igswiss/hex-update.png:53.47:60.01",
      "hex-schedule": "ui-igswiss/hex-schedule.png:53.47:60.01",
      "hex-moon": "ui-igswiss/hex-moon.png:53.47:60.01",
      "hex-dm": "ui-igswiss/hex-dm.png:53.47:60.01",
      "hex-engagement": "ui-igswiss/hex-engagement.png:53.47:60.01",
      "hex-ghost": "ui-igswiss/hex-ghost.png:53.47:60.01",
      "hex-ship": "ui-igswiss/hex-ship.png:53.47:60.01",
      "hex-youtube": "ui-igswiss/hex-youtube.png:53.47:60.01",
      "hex-caption": "ui-igswiss/hex-caption.png:53.47:60.01",
      "hex-swipe-up": "ui-igswiss/hex-swipe-up.png:53.47:60.01",
      "hex-repost": "ui-igswiss/hex-repost.png:53.47:60.01",
      "hex-lifetime": "ui-igswiss/hex-lifetime.png:53.47:60.01",
      "hex-mutual": "ui-igswiss/hex-mutual.png:53.47:60.01",
      "hex-xmas": "ui-igswiss/hex-xmas.png:53.47:60.01",
      "hex-pinterest": "ui-igswiss/hex-pinterest.png:53.47:60.01",
      "hex-tag-ladder": "ui-igswiss/hex-tag-ladder.png:53.47:60.01",
      "hex-reels": "ui-igswiss/hex-reels.png:53.47:60.01",
      "hex-macos": "ui-igswiss/hex-macos.png:53.47:60.01",
      "hex-music": "ui-igswiss/hex-music.png:53.47:60.01",
      "like-heart-empty": "ui-igswiss/like-heart-empty.svg:20:23",
      "like-heart-full": "ui-igswiss/like-heart-full.svg:20:23",
      "navigate.day": "ui-igswiss/navigate.day.svg:32:32",
      "navigate.night": "ui-igswiss/navigate.night.svg:32:32",
      "start-dm.day": "ui-igswiss/start-dm.day.svg:32:32",
      "start-dm.night": "ui-igswiss/start-dm.night.svg:32:32",
      "add-account-plus": "ui-igswiss/add-account-plus.png:30:30",
      "pro-art-1": "ui-igswiss/pro-art-1.png:471:598",
    },
    icons: [],
  });
  const Zr = function () {
    le().render(
      Glamor.createElement(
        ce().Provider,
        { store: v().model.store },
        Glamor.createElement(Yr, null)
      ),
      document.getElementById("app")
    );
  };
  var Kr = {
    send: function (e, ...t) {
      const s = JSON.stringify({ name: e, args: t });
      console.log(`electron-bus:${s}`);
    },
  };
  v();
  var Qr = {
    init: function () {
      if (!window.electron) return;
      (function () {
        const e =
          window.electron.platform ||
          new URLSearchParams(location.search).get("platform");
        if (!e) return;
        v().transaction((t) => {
          t.desktopPlatform = e;
        });
      })(),
        document.body.addEventListener("dblclick", (e) => {
          e.clientY > 40 || Kr.send("maximize");
        });
    },
  };
  !(async function () {
    (window._ = o().default),
      (window.Glamor = n()),
      (window.React = a),
      r().polyfillsController.init(),
      Wi.init(),
      await or.waitForBackground(),
      await rr.init(),
      l().logController.init(),
      c().i18nController.init(),
      d().abTestingController.init(),
      u().sentryController.init({
        dsn: "https://bea0900834f541bca8157710f7fd31fe@sentry.io/1547551",
      }),
      Yn.init(),
      Cs.init(),
      await h().synchController.init("popup", !1),
      await oo.cleanUpState(),
      ir.init(),
      m().gaController.init().sendPageview(),
      me.init(),
      C().iframeBus.init(),
      Te.init(),
      as.init(),
      lr(),
      zn.init(),
      ha.init(),
      Zt.init(),
      eo.init(),
      _n.init(),
      io.init(),
      ro.init(),
      Xo.init(),
      ni.init(),
      di.init(),
      So.init(),
      Fi.init(),
      Ui.init(),
      Ge.init(),
      jn.init(),
      Yi.init(),
      vo(),
      er.init(),
      tr.init(),
      Zr(),
      Qr.init(),
      chrome.runtime.sendMessage({ name: "update-user" }),
      w().chromeBus.send("popup.start"),
      w().chromeBus.on("popup.log", (...e) => console.log(...e));
  })();
})();
