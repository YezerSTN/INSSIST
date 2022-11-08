!(function () {
  function e(e) {
    Object.defineProperty(e, "__esModule", { value: !0 });
  }
  function t(e, t, n) {
    Object.defineProperty(e, t, { get: n, enumerable: !0 });
  }
  var n = (
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
    s = n("6UyrO"),
    a = n("4pwCs"),
    i = n("nIfN7"),
    r = n("7Mfds"),
    o = n("hQmIV"),
    u = n("6DHKG"),
    l = n("7xzSo"),
    c = n("3cqbl"),
    d = n("2JplJ"),
    f = n("2lIMO"),
    g = n("lPVHz"),
    h = n("3YoTT"),
    p = n("4RYcH"),
    m = n("6zDjW"),
    v = n("Saatc"),
    b = n("qnXVN"),
    w = n("23BIq"),
    S = n("4PGYP"),
    y = n("6oOtY"),
    k = n("3HMDR"),
    A = n("4QezY"),
    T = n("3u4tO"),
    C = n("4ZA4S"),
    I = n("uqDnl"),
    P = n("6PPN4"),
    D = n("6ExGy"),
    O = n("7rAex"),
    U = n("1g0wW"),
    _ = n("5ZuLE"),
    x = n("47HXs"),
    B = n("3wQfI"),
    E = n("5NrOn"),
    L = n("367Kq"),
    M = n("7dHHw"),
    F = n("5zaO9"),
    H = n("hUK5n"),
    R = n("23fUW"),
    q = n("2zvjG"),
    N = n("XcRe2"),
    V = n("4EOpL"),
    j = n("6FJnj"),
    $ = n("5mDHX"),
    G = n("6EJm9"),
    z = n("4Aaim"),
    W = n("6xgmF"),
    J = n("lUxTC"),
    K = n("520kD"),
    Y = n("1aIyT"),
    X = n("5SoTn");
  ({
    maxFakeId: 2147483647,
    lastFakeId: 0,
    fakeIdToCallback: {},
    init: function () {
      this._setupWorker("/js/hack-timer-worker.min.js");
    },
    _getFakeId: function () {
      do {
        this.lastFakeId === this.maxFakeId
          ? (this.lastFakeId = 0)
          : this.lastFakeId++;
      } while (this.fakeIdToCallback.hasOwnProperty(this.lastFakeId));
      return this.lastFakeId;
    },
    _setupWorker: function (e) {
      const t = {},
        n = "hack-timer-worker:";
      let s;
      try {
        (s = new Worker(e)),
          (window.setInterval = (e, n) => {
            const a = this._getFakeId();
            return (
              (t[a] = {
                callback: e,
                parameters: Array.prototype.slice.call(arguments, 2),
              }),
              s.postMessage({ name: "setInterval", fakeId: a, time: n }),
              a
            );
          }),
          (window.clearInterval = (e) => {
            t.hasOwnProperty(e) &&
              (delete t[e],
              s.postMessage({ name: "clearInterval", fakeId: e }));
          }),
          (window.setTimeout = (e, n) => {
            const a = this._getFakeId();
            return (
              (t[a] = {
                callback: e,
                parameters: Array.prototype.slice.call(arguments, 2),
                isTimeout: !0,
              }),
              s.postMessage({ name: "setTimeout", fakeId: a, time: n }),
              a
            );
          }),
          (window.clearTimeout = (e) => {
            t.hasOwnProperty(e) &&
              (delete t[e], s.postMessage({ name: "clearTimeout", fakeId: e }));
          }),
          (s.onmessage = (e) => {
            const s = e.data.fakeId;
            let a, i, r;
            if (
              (t.hasOwnProperty(s) &&
                ((a = t[s]),
                (r = a.callback),
                (i = a.parameters),
                a.hasOwnProperty("isTimeout") && a.isTimeout && delete t[s]),
              "string" == typeof r)
            )
              try {
                r = new Function(r);
              } catch (e) {
                console.log(`${n} error parsing callback code string: `, error);
              }
            "function" == typeof r && r.apply(window, i);
          }),
          (s.onerror = (e) => {
            console.log(e);
          }),
          console.log(`${n} initialisation succeeded`);
      } catch (e) {
        console.log(`${n} initialisation failed`), console.log(e);
      }
    },
  }.init(),
    s(),
    a(),
    i(),
    r(),
    o(),
    u(),
    a(),
    l(),
    c(),
    d(),
    f(),
    g(),
    h());
  class Q {
    constructor(e) {
      (this.defaultDelay = e),
        (this.queue = Promise.resolve()),
        (this.totalTasks = 0),
        (this.cleanupIndex = -1);
    }
    addTask(e, t) {
      const n = this.totalTasks++;
      return new Promise((s, a) => {
        (this.queue = this.queue.then(async () => {
          if (n <= this.cleanupIndex) t ? s(await t()) : s();
          else
            try {
              s(await e());
            } catch (e) {
              a(e);
            }
        })),
          this.defaultDelay && this.addDelay(this.defaultDelay);
      });
    }
    addDelay(e) {
      const t = this.totalTasks++;
      return new Promise((n) => {
        this.queue = this.queue.then(async () => {
          t <= this.cleanupIndex || (await h().default(e)), n();
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
          t <= this.cleanupIndex || (await h().default(e));
        })),
        this
      );
    }
    cleanup() {
      this.cleanupIndex = this.totalTasks - 1;
    }
  }
  function Z(e) {
    return "[object Object]" === Object.prototype.toString.call(e);
  }
  p(), m(), v(), b(), w(), S(), y(), k(), f(), A(), T(), C(), S(), o();
  var ee = "fb-api.fb-error",
    te = "fb-api.unknown",
    ne = {
      isError: function (e, t = null) {
        return e && e[se] && (!t || e.code === t);
      },
      checkAuth: re(async function e(t = !0) {
        let n;
        try {
          C().fetcher.ignoreCache(),
            (n = await C().fetcher.fetch(
              "https://www.facebook.com/settings?tab=your_facebook_information"
            ));
        } catch (n) {
          return t
            ? e(!1)
            : (o().sentryController.sendError(
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
      fcsDeletePost: re(async function (e) {
        await ie({
          url: f().default(
            "https://business.facebook.com/media/manager/instagram_media/delete/",
            { id: e }
          ),
        });
      }, "fcs-delete-post"),
      fcsSaveAsDraft: re(async function (e, { caption: t = null } = {}) {
        await ie({
          url: f().default(
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
      fcsSaveAsScheduled: re(async function (e, t, { caption: n = null } = {}) {
        await ie({
          url: f().default(
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
      fcsSaveAsPublished: re(async function (e, { caption: t = null } = {}) {
        await ie({
          url: f().default(
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
  const se = Symbol("isFbApiError");
  function ae(e = {}) {
    return { ...e, [se]: !0 };
  }
  async function ie({ url: e, incognito: t = !1, body: n = {} }) {
    var s;
    C().fetcher.ignoreCache();
    const a =
        (null ===
          (s = (
            await C().fetcher.fetchText(
              "https://business.facebook.com/creatorstudio"
            )
          ).match(/"DTSGInitialData"[^"]*"token":"([^"]*)"/)) || void 0 === s
          ? void 0
          : s[1]) || null,
      i =
        (
          await C().fetcher.fetchText(e, {
            method: "POST",
            headers: { "content-type": "application/x-www-form-urlencoded" },
            body: A().default({
              __a: 1,
              locale: "en_US",
              ...(a && { fb_dtsg: a }),
              ...n,
            }),
          })
        ).replace("for (;;);", "") || "{}",
      r = JSON.parse(T().default(i)),
      o = r.payload || {};
    if (
      (Array.isArray(o.error) && o.error.length) ||
      (Z(o.error) && Object.keys(o.error).length) ||
      o.error_code ||
      o.errorCode ||
      o.errorMessage
    )
      throw ae({ code: ee, payload: o });
    return r;
  }
  function re(e, t) {
    const n = async (...n) => {
      try {
        return await e(...n);
      } catch (e) {
        if (e && e[se]) throw ((e.method = t), e);
        throw (
          (o().sentryController.sendError(
            `fb-api.${t}`,
            "error",
            { details: e },
            { actor: "fb-api" }
          ),
          ae({ code: te, method: t, details: e }))
        );
      }
    };
    return (
      S().chromeBus.on(`fb-api.${t}`, async (...e) => {
        let t, s;
        try {
          t = await n(...e);
        } catch (e) {
          s = e;
        }
        return { result: t, error: s };
      }),
      n
    );
  }
  I(), P(), D(), v(), O(), v(), I();
  const oe = {
    init: function ({ parent: e }) {
      (this.parent = e),
        I().model.observe(
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
      const { username: t, userId: n } = I().model.state.authStatus;
      if (t) {
        const s = { username: t, userId: n };
        if (v().env.options.collectBillingStats) {
          const {
            followersCount: e,
            followingsCount: t,
            postsCount: a,
          } = I().model.state.userDetails[n] || {};
          "number" == typeof e && (s.followers = e),
            "number" == typeof t && (s.followings = t),
            "number" == typeof a && (s.posts = a);
        }
        this.parent.apiSender
          .send("/promo", { query: s })
          .then((t) => {
            if (!t || "ok" !== t.status) throw t;
            log(`  received promocode: ${JSON.stringify(t)}`);
            const n = t && t.expiresAt;
            I().model.state.billing.promocode !== n &&
              I().transaction((e) => {
                e.billing.promocode = n;
              }),
              this.parent.reply(e, n);
          })
          .catch((t) => {
            log(`  retrieving promocode failed: ${JSON.stringify(t)}`),
              this.parent.reply(e, I().model.state.billing.promocode);
          });
      } else
        log("  no username to retrieve promocode for"),
          this.parent.reply(e, I().model.state.billing.promocode);
      return !!e;
    },
  };
  a(), v(), I();
  const ue = {
    init: function ({ parent: e }) {
      (this.parent = e),
        I().model.observe(
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
      const t = I().model.state.billing.trial,
        n = await this._getCookie({ name: "tsd" });
      if (this._isCookieEmpty(n)) return void this.parent.reply(e, t);
      const s = this._mergeTrialValues(t, n);
      s.installedOn || (s.installedOn = Date.now()),
        a().default.isEqual(t, s) ||
          I().transaction((e) => {
            e.billing.trial = s;
          }),
        a().default.isEqual(n, s) || this._setCookie({ name: "tsd", value: s }),
        this.parent.reply(e, s);
    },
    updateCookie: async function (e) {
      const t = await this._getCookie({ name: "tsd" });
      this._isCookieEmpty(t) || (e = this._mergeTrialValues(t, e)),
        a().default.isEqual(t, e) || this._setCookie({ name: "tsd", value: e });
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
        chrome.cookies.getAll(
          { url: `https://${v().env.options.domain}` },
          (n) => {
            let s = (n || []).filter((t) => t.name === e)[0] || { value: "" };
            s = s.value;
            try {
              s = atob(s);
            } catch (e) {}
            try {
              s = JSON.parse(s);
            } catch (e) {
              s = null;
            }
            t(s);
          }
        );
      });
    },
    _setCookie: async function ({ name: e, value: t }) {
      const n = Math.round(Date.now() / 1e3),
        s = n + 31536e4 > 2147483647 ? n + 31536e4 : 2147483647;
      return new Promise((n) => {
        chrome.cookies.set(
          {
            name: e || "cookie",
            value: btoa(JSON.stringify(t)),
            url: `https://${v().env.options.domain}`,
            path: "/",
            httpOnly: !1,
            secure: !1,
            storeId: "0",
            domain: v().env.options.domain,
            sameSite: "strict",
            expirationDate: s,
          },
          n
        );
      });
    },
  };
  I(), o();
  const le = {
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
          I().model.observe(
            (e) => (e.authStatus ? e.authStatus.username : null),
            () => {
              this.recordUsernames();
            },
            !0
          ),
          I().model.observe(
            (e) =>
              e.billing && e.billing.account ? e.billing.account.token : null,
            () => {
              this.recordUsernames();
            },
            !1
          ),
          I().model.observe(
            (e) =>
              e.billing && e.billing.account ? e.billing.account.token : null,
            () => {
              this.updateFSpringStatus();
            },
            !1
          );
      },
      recordUsernames: function () {
        const { billing: e, authStatus: t } = I().model.state,
          n = t.username;
        if (!n) return;
        const s = e.account ? e.account.token : null;
        if (!s) return;
        if (-1 !== e.recordedUsernames.indexOf(n)) return;
        log("billing: updating associated fspring account usernames...");
        const a = { usernames: [n] };
        this.parent.apiSender
          .send("/auth/record-usernames", { body: a, token: s })
          .then(() => {
            I().transaction((e) => {
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
        const { billing: t } = I().model.state,
          n = t.account ? t.account.token : null;
        if (n) {
          const t = "/fspring/data";
          this.parent.apiSender
            .send(t, { token: n })
            .then((t) => {
              if (!t || "ok" !== t.status) throw t;
              I().transaction((e) => {
                (e.billing.subscriptions = t.subscriptions || {}),
                  (e.billing.products = t.products || {}),
                  (e.billing.orders = t.orders || []);
              }),
                this.parent.reply(e, I().model.state.billing);
            })
            .catch((n) => {
              ("TypeError" === n.name && "Failed to fetch" === n.message) ||
                ("forbidden" === n.status ||
                "unauthorized" === n.status ||
                "account-not-found" === n.status ||
                "account-is-not-active" === n.status
                  ? I().transaction((e) => {
                      (e.billing.account.email = null),
                        (e.billing.account.token = null);
                    })
                  : o().sentryController.sendError(
                      `Unexpected API error at ${t}`,
                      "error",
                      { error: n },
                      { actor: "auth" }
                    )),
                this.parent.reply(e, I().model.state.billing);
            });
        } else
          I().transaction((e) => {
            (e.billing.optimistic = null),
              (e.billing.subscriptions = {}),
              (e.billing.products = {}),
              (e.billing.orders = []);
          }),
            this.parent.reply(e, I().model.state.billing);
        return !!e;
      },
      onFSpringSubscriptionSuccess: function (e, t) {
        log("billing: handling fspring subscription success..."),
          I().transaction((e) => {
            (e.billing.optimistic = {
              on: Date.now(),
              plan: e.billing.purchasingPlan.id,
            }),
              (e.billing.purchasingPlan = null);
          });
        const n = JSON.stringify({
            subscriptions: I().model.state.billing.subscriptions,
            products: I().model.state.billing.products,
            orders: I().model.state.billing.orders,
          }),
          s = Date.now();
        let a = 3e3;
        const i = () => {
          log("billing: polling server for status update..."),
            I().model.state.billing.optimistic &&
              this.updateFSpringStatus((e) => {
                const t = Date.now();
                t - s > 36e5
                  ? I().transaction((e) => {
                      e.billing.optimistic = null;
                    })
                  : ((e = JSON.stringify({
                      subscriptions: e.subscriptions,
                      products: e.products,
                      orders: e.orders,
                    })),
                    n === e
                      ? ((a = t - s > 3e4 ? 6e5 : 3e3), setTimeout(i, a))
                      : I().transaction((e) => {
                          e.billing.optimistic = null;
                        }));
              });
        };
        return setTimeout(i, a), !!t;
      },
      onFSpringSubscriptionFailure: function (e, t) {
        return (
          log("billing: handling fspring subscription failure..."),
          I().transaction((e) => {
            e.billing.purchasingPlan = null;
          }),
          !!t
        );
      },
    },
    ce = {
      init: function () {
        (this.apiSender = new (O().Sender)({
          urlPrefix: v().env.options.apiUrl,
        })),
          oe.init({ parent: this }),
          ue.init({ parent: this }),
          le.init({ parent: this });
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
        await Promise.all([oe.updatePro(), ue.updatePro(), le.updatePro()]);
      },
      reply: function (e, t) {
        if (e)
          try {
            e(t);
          } catch (e) {}
      },
    };
  o(),
    a(),
    v(),
    P(),
    I(),
    O(),
    S(),
    c(),
    I(),
    U(),
    k(),
    C(),
    w(),
    S(),
    _(),
    h(),
    d(),
    I(),
    C(),
    x(),
    k(),
    S(),
    m(),
    B(),
    d(),
    E(),
    I(),
    C(),
    b(),
    k(),
    S(),
    P(),
    m(),
    I(),
    S(),
    P(),
    L();
  var de = {
    init: function () {
      S().chromeBus.on("cleanup.clean-up-state", () => {
        const e = Date.now();
        return fe(e), e;
      });
    },
    cleanUpState: fe,
  };
  function fe(e) {
    const t = P().getTemplateUserState();
    I().transaction((n) => {
      var s;
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
      const a = n.tagAssist.accountStats[n.authStatus.userId] || null,
        i = (null == a ? void 0 : a.mostUsedTags) || [];
      i.length > 0 &&
        ((n.tagAssist.searching = !0),
        (n.tagAssist.query = i
          .slice(0, 2)
          .map((e) => `#${e}`)
          .join(" "))),
        Object.assign(n.coverAssist, L().default),
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
        n.schedule.posts.forEach((e) => {
          e.preview = null;
        }),
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
        (n.schedule.dateDialog = M().default(n)),
        (n.schedule.addCard = t.schedule.addCard),
        (n.bulk = t.bulk);
      const r = Date.now() + m().DAY,
        o =
          (null === (s = n.schedule.timeSlots[0]) || void 0 === s
            ? void 0
            : s.time) || null;
      (n.bulk.dateDialog.week.selectedSlotTime = o),
        (n.bulk.dateDialog.calendar.periodStart = r),
        (n.bulk.dateDialog.calendar.selectedDay = r),
        (n.bulk.dateDialog.calendar.selectedSlotTime = o),
        (n.bulk.dateDialog.startingDay.periodStart = r),
        (n.bulk.dateDialog.startingDay.selectedDay = r);
    });
  }
  F(), m(), S(), U();
  var ge = {
    init: async function () {
      return void (await U().idbController.delete("image-proxy.cache"));
      (me = (await U().idbController.get("image-proxy.cache")) || {}),
        pe.resolve(),
        S().chromeBus.on("image-proxy.save", ve),
        S().chromeBus.on("image-proxy.cache-item-used", be);
    },
    save: ve,
  };
  const he = 15 * m().SECOND,
    pe = F().default();
  let me;
  async function ve(e) {}
  async function be(e) {
    me[e] && ((me[e].lastUsedAt = Date.now()), we());
  }
  function we() {
    const e = we;
    clearTimeout(e.timeout),
      (e.timeout = setTimeout(async () => {
        U().idbController.set("image-proxy.cache", me);
      }, he));
  }
  H(), S();
  var Se = {
    getVersion: function () {
      if (void 0 === ye) {
        const e = /Chrome\/([0-9.]+)/.exec(window.navigator.userAgent)[1];
        ye = e ? Number(e.split(".")[0]) : -1;
      }
      return ye;
    },
  };
  let ye;
  var ke = {
    init: function () {
      (Te = -1),
        S().chromeBus.on("core-web-request.popup-tab-id", (e) => {
          Ae = e;
        });
    },
    watch: function (e, t) {
      chrome.webRequest.onBeforeRequest.addListener(
        (e) => {
          let n = null;
          const s = new URL(e.url).host;
          return (
            t({
              details: e,
              isBeforeRequest: !0,
              isRequest: !1,
              isResponse: !1,
              fromExtension: Ie(e),
              checkUrl: function (t) {
                return e.url.includes(t);
              },
              checkHost: function (e) {
                return s.includes(e);
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
            Ce(e.requestHeaders);
            const n = new URL(e.url).host;
            return (
              t({
                details: e,
                isBeforeRequest: !1,
                isRequest: !0,
                isResponse: !1,
                fromExtension: Ie(e),
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
          Se.getVersion() < 72
            ? ["blocking", "requestHeaders"]
            : ["blocking", "requestHeaders", "extraHeaders"]
        ),
        chrome.webRequest.onHeadersReceived.addListener(
          (e) => {
            Ce(e.responseHeaders);
            const n = new URL(e.url).host;
            return (
              t({
                details: e,
                isBeforeRequest: !1,
                isRequest: !1,
                isResponse: !0,
                fromExtension: Ie(e),
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
          Se.getVersion() < 72
            ? ["blocking", "responseHeaders"]
            : ["blocking", "responseHeaders", "extraHeaders"]
        );
    },
  };
  let Ae = null,
    Te = null;
  function Ce(e) {
    for (const t of e) t.name = t.name.toLowerCase();
  }
  function Ie(e) {
    return e.tabId === Ae || e.tabId === Te;
  }
  S();
  const Pe = H().default();
  var De = {
    init: function () {
      ke.watch(
        [
          "https://*.onfastspring.com/*",
          "https://*.instagram.com/*",
          "https://*.facebook.com/*",
          "https://*.inssist.com/*",
        ],
        _e
      );
    },
    onRequest: Pe,
  };
  let Oe, Ue;
  function _e({
    details: e,
    isBeforeRequest: t,
    isRequest: n,
    isResponse: s,
    fromExtension: a,
    redirect: i,
    cancel: r,
    getHeader: o,
    setHeader: u,
    removeHeader: l,
    checkUrl: c,
    checkHost: d,
  }) {
    var f, g, h;
    Pe(arguments[0]);
    const p = /instagram.com\/reel\/[\w-]+\//;
    if (
      (t && p.test(e.url) && i(e.url.replace("/reel/", "/p/")),
      t && d("app.inssist.com") && i(chrome.runtime.getURL("/inssist.html")),
      t &&
        d("instagram.com") &&
        c("service-worker") &&
        i(chrome.runtime.getURL("/js/ig-service-worker.js")),
      n &&
        a &&
        (d("instagram.com") || d("facebook.com") || d("fastspring.com")))
    ) {
      const t = o("origin");
      if (!t || (null == t ? void 0 : t.value.startsWith("chrome-extension"))) {
        u("origin", new URL(e.url).origin);
      }
    }
    n && a && d("instagram.com") && u("sec-fetch-dest", "document"),
      n &&
        d("instagram.com") &&
        c("/direct/inbox") &&
        (null === (f = e.initiator) || void 0 === f
          ? void 0
          : f.startsWith(`chrome-extension://${chrome.runtime.id}`)) &&
        (Oe = e.frameId);
    const m =
        n &&
        d("instagram.com") &&
        "POST" === e.method &&
        (c("/accounts/login/ajax/") || c("/one_tap_web_login/")),
      v = n && d("instagram.com") && (a || c("/api/v1/")) && e.tabId !== Oe;
    if (m || v) {
      let e =
        "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1";
      c("/api/v1/") && (e = `${e} Instagram 231.0.0.18.113`),
        u("user-agent", e);
    }
    if (
      (s &&
        (d("instagram.com") ||
          d("facebook.com") ||
          d("inssist.com") ||
          d("onfastspring.com")) &&
        (e.responseHeaders = e.responseHeaders.filter(
          (e) => "x-frame-options" !== e.name
        )),
      n &&
        (d("instagram.com") ||
          d("facebook.com") ||
          d("inssist.com") ||
          d("onfastspring.com")) &&
        u("x-frame-options", "SAMEORIGIN"),
      s &&
        (d("instagram.com") ||
          d("facebook.com") ||
          d("inssist.com") ||
          d("onfastspring.com")) &&
        (e.responseHeaders = e.responseHeaders.filter(
          (e) =>
            "content-security-policy" !== e.name &&
            "content-security-policy-report-only" !== e.name
        )),
      s &&
        d("facebook.com") &&
        (c("/confirmemail.php") || c("/home.php")) &&
        (null === (g = e.initiator) || void 0 === g
          ? void 0
          : g.includes("business.facebook.com")) &&
        (u("access-control-allow-origin", "https://business.facebook.com"),
        u("access-control-allow-credentials", "true")),
      s &&
        d("facebook.com") &&
        c("/home.php") &&
        (null === (h = e.initiator) || void 0 === h
          ? void 0
          : h.includes("web.facebook.com")) &&
        (u("access-control-allow-origin", "https://web.facebook.com"),
        u("access-control-allow-credentials", "true")),
      s &&
        d("instagram.com") &&
        u("access-control-expose-headers", "*, Authorization"),
      s && d("instagram.com"))
    ) {
      const e = o("x-ig-set-www-claim");
      e && Ue !== e.value && (Ue = e.value);
    }
    if (n && d("instagram.com")) {
      const e = o("x-ig-www-claim");
      e &&
        "auto" === e.value &&
        (Ue ? u("x-ig-www-claim", Ue) : l("x-ig-www-claim"));
    }
    s &&
      a &&
      d("instagram.com") &&
      c("/delete/?__d=dis") &&
      (S().chromeBus.send("iframe-bus", "ig.back"),
      setTimeout(() => S().chromeBus.send("iframe-bus", "ig.refresh"), 1e3)),
      t && c("/csp/reporting") && r();
  }
  var xe = {
    init: async function () {
      await (async function () {
        if ("username" in I().model.state.authStatus) return;
        C().fetcher.ignoreCache();
        const e = await k().igApi.fetchViewerInfo();
        if (e.error) return;
        const t = e.result || null;
        I().transaction((e) => {
          (e.authStatus.userId = (null == t ? void 0 : t.userId) || null),
            (e.authStatus.username = (null == t ? void 0 : t.username) || null),
            (e.authStatus.fullName = (null == t ? void 0 : t.fullName) || null),
            (e.authStatus.email = (null == t ? void 0 : t.email) || null),
            (e.authStatus.avatarUrl =
              (null == t ? void 0 : t.avatarUrl) || null),
            (e.authStatus.isLoggedIn = !!t),
            (e.authStatus.isMobileSession =
              (null == t ? void 0 : t.isMobileSession) || !1),
            (e.authStatus.cookies = (null == t ? void 0 : t.cookies) || {
              igSessionId: null,
              fb: [],
            });
        }),
          await je();
      })(),
        (function () {
          let e;
          chrome.cookies.onChanged.addListener(({ cookie: t, removed: n }) => {
            Ee ||
              I().model.state.schedule.fcsSetup.connecting ||
              (".instagram.com" === t.domain &&
                "sessionid" === t.name &&
                (clearTimeout(e),
                (e = setTimeout(() => {
                  Me({ isSettingSessionId: !n });
                }))));
          });
        })(),
        (function () {
          let e;
          De.onRequest(({ details: n, isResponse: s, checkHost: a }) => {
            if (s && a("facebook.com")) {
              !!n.responseHeaders.find((e) => "set-cookie" === e.name) &&
                (clearTimeout(e), (e = setTimeout(t)));
            }
          });
          const t = async () => {
            const e = await d().default(chrome.cookies.getAll, {
              domain: ".facebook.com",
            });
            I().transaction((t) => {
              t.authStatus.cookies.fb = e;
            });
          };
        })(),
        S().chromeBus.on("auth.set-ig-initial-url", Fe),
        S().chromeBus.on("auth.login", He),
        S().chromeBus.on("auth.logout", Re),
        S().chromeBus.on("auth.refresh-user", Me),
        S().chromeBus.on("auth.toggle-session-watcher", Ve),
        chrome.runtime.onMessage.addListener(
          (e, t, n) => "update-user" === e.name && Le()
        );
    },
    updateUser: Le,
    refreshUser: Me,
    clearFbCookies: qe,
  };
  let Be = null,
    Ee = !1;
  async function Le(e = !1) {
    log("auth-controller: updating user id...");
    !(await Me()) && e && chrome.tabs.update({ url: b().ig.login.url });
  }
  async function Me({ isSettingSessionId: e = !1 } = {}) {
    const t = Me,
      n = B().generate();
    (t.requestId = n), C().fetcher.ignoreCache();
    const s = await k().igApi.fetchViewerInfo();
    if (t.requestId !== n) return;
    if (s.error) return;
    const a = s.result || null,
      i = a && I().model.state.authStatus.userId === a.userId;
    return (
      a && ge.save(a.avatarUrl),
      I().transaction((t) => {
        if (a && t.authStatus.userId === a.userId)
          return (
            (t.authStatus.username = a.username),
            (t.authStatus.avatarUrl = a.avatarUrl),
            (t.multiaccount.selectedUserId = a.userId),
            void (e && (t.authStatus.isMobileSession = !0))
          );
        if (a) {
          const e = t.multiaccount.userIds;
          t.multiaccount.addingNewAccount
            ? (t.multiaccount.addingNewAccount = !1)
            : t.authStatus.isLoggedIn ||
              E().default(e, t.multiaccount.selectedUserId),
            e.includes(a.userId) || e.push(a.userId),
            (t.multiaccount.selectedUserId = a.userId);
        }
        if (t.authStatus.userId) {
          t.userStates[t.authStatus.userId] = {};
          const e = P().getTemplateUserState();
          for (const n in e) t.userStates[t.authStatus.userId][n] = t[n];
          t.userStates[t.authStatus.userId].authStatus.isMobileSession = !1;
        }
        let n = null;
        a && t.userStates[a.userId]
          ? ((n = t.userStates[a.userId]), delete t.userStates[a.userId])
          : (n = P().getTemplateUserState()),
          (n.authStatus.userId = (null == a ? void 0 : a.userId) || null),
          (n.authStatus.username = (null == a ? void 0 : a.username) || null),
          (n.authStatus.avatarUrl = (null == a ? void 0 : a.avatarUrl) || null),
          (n.authStatus.isLoggedIn = !!a),
          e && (n.authStatus.isMobileSession = !0),
          Object.assign(t, n);
      }),
      await je(),
      i ||
        (S().chromeBus.send("iframe-bus", "ig.clear-and-show-spinner"),
        a
          ? Be
            ? S().chromeBus.send("iframe-bus", "ig.hard-go", Be)
            : (de.cleanUpState(),
              S().chromeBus.send("iframe-bus", "ig.refresh"))
          : S().chromeBus.send("iframe-bus", "ig.hard-go", "/accounts/login/"),
        S().chromeBus.send("iframe-bus", "dm.refresh"),
        S().chromeBus.send("iframe-bus", "schedule.fcs-refresh-page")),
      (Be = null),
      S().chromeBus.send("auth.refreshed"),
      a
    );
  }
  function Fe(e) {
    Be = e;
  }
  async function He(e) {
    var t;
    const n =
      null === (t = I().model.state.userStates[e]) || void 0 === t
        ? void 0
        : t.authStatus;
    if (n) {
      Ve(!1);
      try {
        await qe();
        for (const e of n.cookies.fb)
          await d().default(chrome.cookies.set, {
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
        await Ne(),
          await d().default(chrome.cookies.set, {
            url: "https://*.instagram.com",
            name: "sessionid",
            value: n.cookies.igSessionId,
            domain: ".instagram.com",
            path: "/",
            secure: !0,
            httpOnly: !1,
            sameSite: "no_restriction",
            expirationDate: Math.round((Date.now() + 365 * m().DAY) / 1e3),
          });
      } catch (e) {
        console.error(e);
      }
      Ve(!0),
        setTimeout(() => {
          Me({ isSettingSessionId: !1 });
        });
    } else console.error("auth status not found", { userId: e });
  }
  async function Re() {
    await qe(), await Ne();
  }
  async function qe() {
    const e = await d().default(chrome.cookies.getAll, {
      domain: ".facebook.com",
    });
    for (const t of e)
      await d().default(chrome.cookies.remove, {
        url: "https://*.facebook.com",
        name: t.name,
      });
  }
  async function Ne() {
    await d().default(chrome.cookies.remove, {
      url: "https://*.instagram.com/*",
      name: "sessionid",
    });
  }
  function Ve(e) {
    Ee = !e;
  }
  async function je() {
    const e = await d().default(chrome.cookies.get, {
        url: "https://*.instagram.com",
        name: "sessionid",
      }),
      t = await d().default(chrome.cookies.getAll, { domain: ".facebook.com" });
    I().transaction((n) => {
      (n.authStatus.cookies.igSessionId =
        (null == e ? void 0 : e.value) || null),
        (n.authStatus.cookies.fb = t);
    });
  }
  var $e = {
    init: function () {
      S().chromeBus.on("schedule.connect-to-fcs", Ge),
        S().chromeBus.on("schedule.drop-fb-xs-cookie", Ke);
    },
  };
  async function Ge({ skipFbLogin: e = !1 } = {}) {
    if (I().model.state.schedule.fcsSetup.connecting) return;
    I().transaction((e) => {
      (e.schedule.fcsSetup.screen = "steps"),
        (e.schedule.fcsSetup.connecting = !0);
    }),
      ze(
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
    if (await Je()) return;
    if (!e) {
      let e;
      try {
        e = await ne.checkAuth();
      } catch (e) {
        return (
          console.error("[fcs setup] failed to check fb auth", e),
          ze({ fbLogin: "failed" }),
          void I().transaction((e) => (e.schedule.fcsSetup.connecting = !1))
        );
      }
      if (!e)
        return (
          ze({ fbLogin: "nok" }),
          void I().transaction((e) => (e.schedule.fcsSetup.connecting = !1))
        );
    }
    ze({ fbLogin: e ? "skipped" : "ok", igProfessional: "loading" }),
      await h().default(1e3),
      C().fetcher.ignoreCache();
    const t = (await k().igApi.fetchViewerInfo()).result;
    if (!t)
      return (
        ze({ igProfessional: "failed" }),
        void I().transaction((e) => (e.schedule.fcsSetup.connecting = !1))
      );
    if (!t.isProfessionalAccount)
      return (
        ze({ igProfessional: "nok" }),
        void I().transaction((e) => (e.schedule.fcsSetup.connecting = !1))
      );
    ze({ igProfessional: "ok", igConnectedToFbPage: "loading" });
    if (await Je()) return;
    let n;
    if (
      ((n = e
        ? await S().chromeBus.send("iframe-bus", "schedule.connect-via-ig")
        : await S().chromeBus.send("iframe-bus", "schedule.connect-via-fb")),
      n.error)
    )
      return (
        e && Ke(),
        "not-connected-to-fb-page" === n.error
          ? ze({ igConnectedToFbPage: "nok" })
          : "auth-window-closed-by-user" === n.error
          ? (ze({ igConnectedToFbPage: "failed" }), xe.refreshUser())
          : (console.error("[fcs setup]", n.error),
            ze({ igConnectedToFbPage: "failed" }, n.error)),
        void I().transaction((e) => (e.schedule.fcsSetup.connecting = !1))
      );
    if (e) {
      const { fcsConnected: e } = await We();
      if (!e)
        return (
          Ke(),
          ze({ igConnectedToFbPage: "failed" }, "failed-to-skip-fb-login"),
          void I().transaction((e) => (e.schedule.fcsSetup.connecting = !1))
        );
    }
    try {
      await xe.refreshUser();
    } catch (e) {
      return (
        console.error("[fcs setup] failed to refresh user", e),
        ze({ igConnectedToFbPage: "failed" }, "failed-to-refresh-user"),
        void I().transaction((e) => (e.schedule.fcsSetup.connecting = !1))
      );
    }
    ze({ igConnectedToFbPage: "ok" }),
      await h().default(1e3),
      I().transaction((e) => {
        (e.schedule.fcsSetup.connecting = !1),
          (e.schedule.fcsSetup.showPanel = !1),
          (e.schedule.loading = !0);
      }),
      S().chromeBus.send("iframe-bus", "schedule.fcs-refresh-page"),
      x().gaController.sendEvent("user", "schedule:setup-connection-success");
  }
  function ze(e = {}, t = null) {
    for (const n in e)
      if ("failed" === e[n]) {
        const e = t ? `${n}_${t}` : n;
        x().gaController.sendEvent(
          "user",
          "schedule:setup-connection-error",
          e
        );
        break;
      }
    I().transaction((t) => {
      Object.assign(t.schedule.fcsSetup.steps, e);
    });
  }
  async function We() {
    return (
      S().chromeBus.send("iframe-bus", "schedule.fcs-refresh-page"),
      new Promise((e) => {
        S().chromeBus.on(
          "schedule.fcs-connection-status",
          function t({ fcsConnected: n }) {
            S().chromeBus.off("schedule.fcs-connection-status", t),
              e({ fcsConnected: n });
          }
        );
      })
    );
  }
  async function Je() {
    const { fcsConnected: e } = await We();
    return (
      !!e &&
      (S().chromeBus.send("iframe-bus", "schedule.fcs-refresh-page"),
      I().transaction((e) => {
        (e.schedule.fcsSetup.connecting = !1),
          (e.schedule.fcsSetup.showPanel = !1),
          (e.schedule.loading = !0);
      }),
      !0)
    );
  }
  async function Ke() {
    await d().default(chrome.cookies.remove, {
      url: "https://*.facebook.com/*",
      name: "xs",
    });
  }
  c(), C(), U(), I(), S(), R(), q();
  var Ye = {
    init: function () {
      !(function () {
        const e = {};
        let t = !1,
          n = !1;
        async function s() {
          if (t) return void (n = !0);
          t = !0;
          const a = {};
          let i = 0;
          for (const t of R().default.getPosts()) {
            const s = I().model.state,
              r = t.id,
              o = s.schedule.posts.find((e) => e.id === r);
            if (!o) continue;
            if ("fcs" !== o.source) continue;
            if (e[o.id]) continue;
            if (((i += 1), i > 9)) {
              n = !0;
              continue;
            }
            const u = `schedule.fcs-post-preview:${o.id}`,
              l = await c().default(() => U().idbController.get(u));
            if (l) {
              e[o.id] = URL.createObjectURL(l);
              continue;
            }
            let d;
            try {
              const e = await C().fetcher.fetch(o.image, {
                  credentials: "omit",
                }),
                t = await e.blob();
              d = await q().default(t);
            } catch (e) {
              console.error(e);
              continue;
            }
            await c().default(() => U().idbController.set(u, d.blob)),
              (a[o.id] = d.averageColor),
              (e[o.id] = URL.createObjectURL(d.blob));
          }
          I().transaction((t) => {
            const n = t.schedule.posts.filter((e) => "fcs" === e.source);
            for (const t of n) t.preview = e[t.id];
            for (const e in a) {
              const t = n.find((t) => t.id === e);
              t && (t.imageAvgColor = a[e]);
            }
          }),
            (t = !1),
            n && ((n = !1), s());
        }
        I().model.observe(
          (e) =>
            R()
              .default.getPosts()
              .filter((e) => "fcs" === e.source)
              .map((e) => e.id)
              .join("-"),
          s
        ),
          S().chromeBus.on("popup.start", () => {
            for (const t in e) URL.revokeObjectURL(e[t]), delete e[t];
            s();
          });
      })();
    },
  };
  m(), S(), o();
  var Xe = {
    init: function () {
      !(function () {
        let e;
        S().chromeBus.on("schedule.upload-99", (t) => {
          clearTimeout(e),
            (e = setTimeout(() => {
              o().sentryController.sendError(
                "Upload stuck at 99.9%",
                "error",
                { debugData: t },
                { actor: "schedule" }
              );
            }, 20 * m().SECOND));
        }),
          S().chromeBus.on("schedule.upload-100", () => {
            clearTimeout(e);
          });
      })();
    },
  };
  var Qe = {
    init: function () {
      $e.init(),
        Ye.init(),
        Xe.init(),
        (async function () {
          S().chromeBus.on("popup.start", async () => {
            const e = [
                I().model.state,
                ...Object.values(I().model.state.userStates),
              ],
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
              s = await U().idbController.getAllKeys();
            for (const e of s)
              if (e.startsWith("schedule.fcs-post-preview:")) {
                const n = e.split(":")[1];
                if (t.includes(n)) continue;
                await c().default(() => U().idbController.delete(e));
              } else if (e.startsWith("schedule.local-post:")) {
                const t = e.split(":")[1];
                if (n.includes(t)) continue;
                await c().default(() => U().idbController.delete(e));
              }
          });
        })(),
        S().chromeBus.on("schedule.update-ig-posts", Ze),
        w().eventBus.on("schedule.update-ig-posts", Ze);
    },
    getReport: async function () {
      return await S().chromeBus.send("iframe-bus", "schedule.fcs-get-report");
    },
  };
  async function Ze(e = !1) {
    const t = I().model.state,
      n = t.authStatus.username;
    if (!n) return;
    if (!e) {
      if (t.schedule.fcsSetup.checking) return;
      if (t.schedule.fcsSetup.connected) return;
    }
    C().fetcher.ignoreCache();
    const s = await k().igApi.fetchUserPosts(n, 50);
    if (t.authStatus.username !== n) return;
    const a = (s.result || [])
      .map((e) => {
        const t = { photo: "photo", video: "video", carousel: "carousel" }[
          e.type
        ];
        return t
          ? _().default({
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
    I().transaction((e) => {
      (e.schedule.loading = !1),
        (e.schedule.lastIgPostsUpdateOn = Date.now()),
        (e.schedule.posts = e.schedule.posts
          .filter((e) => "local" === e.source)
          .concat(a));
    });
  }
  M();
  var et = {
    init: function () {
      S().chromeBus.on("overseer.send-report", st);
    },
    sendReport: st,
  };
  const tt = [
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
      { field: "authStatus", cb: (e) => a().default.cloneDeep(e) },
      { field: "authStatus.cookies", cb: () => "!sanitized" },
      { field: "billing", cb: (e) => a().default.cloneDeep(e) },
      { field: "billing.account.token", cb: () => "!sanitized" },
      {
        field: "schedule",
        cb: (e) => {
          const t = a().default.cloneDeep(e);
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
    nt = new (O().Sender)({ urlPrefix: v().env.options.apiUrl });
  async function st({ key: e, filters: t, data: n } = {}) {
    if (
      ((e = e || "system"),
      (n = n || {}),
      (t = t || {}).username ||
        (t.username = P().stateProxy.username() || "unknown"),
      "string" != typeof n && !n.state)
    ) {
      const e = I().model.state,
        t = {};
      tt.forEach((n) => {
        if ("string" == typeof n) t[n] = e[n];
        else {
          const s = e[n.field];
          t[n.field] = n.cb(s);
        }
      }),
        (n.state = t);
    }
    "string" == typeof n || n.schedule || (n.schedule = await Qe.getReport());
    try {
      n = JSON.stringify(n);
    } catch (e) {
      n = e.message;
    }
    const s = { key: e, filters: t, data: n };
    v().env.is.development &&
      S().chromeBus.send(
        "popup.log",
        "%coverseer report [background]",
        "color: #c818dc",
        { key: e, filters: t, data: JSON.parse(n) }
      ),
      nt
        .send("/overseer", { body: s })
        .then((t) => {
          log(`overseer ${e} report of ${n.length} bytes was sent`);
        })
        .catch((t) => {
          error(`! failed sending ${e} overseer report of ${n.length} bytes:`),
            error(t);
        });
  }
  I(), S();
  var at = {
    getCredibility: function (e, t = null, { forcePrivate: n = !1 } = {}) {
      const s = e.userId === t;
      if (e.isPrivate && !s && !n) return null;
      if (e.isVerified) return 1;
      if ("inssistapp" === e.username) return 1;
      let a = 0,
        i = 0;
      Object.values(it).forEach((t) => {
        (a += t.getValue(e) * t.weight), (i += Math.max(t.weight, 0));
      });
      const r =
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
        o = 1 - rt(a / i + r);
      return Math.round(100 * o) / 100;
    },
  };
  const it = {
    "followings-to-followers-ratio": {
      weight: 150,
      getValue: function (e) {
        return rt(Math.log2(e.followingsCount / e.followersCount / 4) / 1.5);
      },
    },
    "short-bio": {
      weight: 30,
      getValue: function (e) {
        if (!e.bio) return 1;
        return rt((20 - e.bio.length) / 20);
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
        return rt((24 - e.postsCount) / 24);
      },
    },
    "username-ends-with-digits": {
      weight: 100,
      getValue: function (e) {
        if (!e.username) return 0;
        const t = e.username.replace(/[_.]*/g, "").match(/.*(\d{4,})$/),
          n = t && t[1];
        if (!n) return 0;
        const s = Number(n);
        return s > 1950 && s < 2030 ? 0 : 1;
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
          s = 2592e6,
          a = e.lastPosts.map((e) => e.ts).sort();
        if (a.some((e) => n - e < s)) return 0;
        let i = 0,
          r = 0,
          o = 0;
        for (;;) {
          if (
            (a[r] - a[i] < s && r < t ? (r++, (o = Math.max(o, r - i))) : i++,
            i === t - 1)
          )
            break;
        }
        return rt((o / t - 0.6) / 0.4);
      },
    },
  };
  function rt(e) {
    return Math.min(Math.max(0, e), 1);
  }
  const ot = [
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
  ];
  var ut = {
    init: async function () {
      S().chromeBus.on("insights.get-credibility-grade", lt);
    },
  };
  function lt(e) {
    const t = I().model.state.authStatus.userId;
    return (function (e) {
      const t = ot.find((t) => t.condition(e));
      return { value: t.value, label: t.label, color: t.color };
    })(at.getCredibility(e, t));
  }
  U(), N(), x(), C();
  const ct = (e) =>
      "string" != typeof e && "boolean" != typeof e && "number" != typeof e
        ? JSON.stringify(e)
        : e,
    dt = function (e) {
      console.log(`%c[test] ${ct(e)}`, "color: #3d9d30");
    },
    ft = function (e) {
      console.log(`%c[test] ${ct(e)}`, "color: #e94b35");
    },
    gt = function (e) {
      console.log(ct(e));
    },
    ht = {
      init: function () {
        (window.env = v().env),
          (window.ig = b().ig),
          (window.utils = l().utils),
          (window.callAsync = d().default),
          (window.createUrl = f().default),
          (window.createAlarm = g().default),
          (window.AsyncQueue = Q),
          (window.ls = p().default),
          (window.safe = c().default),
          (window.igApi = k().igApi),
          (window.fbApi = ne),
          (window.Response = k().Response),
          (window.IgUsersPage = k().IgUsersPage),
          (window.eventBus = w().eventBus),
          (window.chromeBus = S().chromeBus),
          (window.iframeBus = y().iframeBus),
          (window.abTestingController = N().abTestingController),
          (window.gaController = x().gaController),
          (window.fetcher = C().fetcher),
          (window.billing = ce),
          (window.idbController = U().idbController),
          (window.sentryController = o().sentryController),
          (window.overseerController = et),
          (window.insightsController = ut),
          (window.setState = this.setState),
          (window.downgradeVersion = this.downgradeVersion),
          (window.testGetSkuDetails = this.testGetSkuDetails),
          (window.testGetPurchases = this.testGetPurchases),
          (window.testAll = this.testAll),
          (window.errorsDelta = this.errorsDelta),
          (window.activityDelta = this.activityDelta),
          (window.countMadeActions = this.countMadeActions),
          (v().env.is.development || v().env.is.beta) &&
            ((window.model = I().model),
            (window.transaction = I().transaction),
            (window.storageController = D().storageController),
            (window.stateProxy = P().stateProxy),
            (window.unbanAllTasks = this.unbanAllTasks),
            Object.assign(window, m()),
            this.defineCommit());
      },
      countMadeActions: function (e = 86400) {
        const t = window.__debug.state,
          n = l().utils.getUnixTime(),
          s = { likes: 0 };
        for (let a = 0; a < t.stats.activity.length; a++) {
          const i = t.stats.activity[a];
          if (n - i.on > e) break;
          "like" === i.type && s.likes++;
        }
        return s;
      },
      errorsDelta: function () {
        const e = window.__debug.errors;
        let t = e[0].on;
        e.forEach((e) => {
          log((t - e.on) / 60), (t = e.on);
        });
      },
      activityDelta: function () {
        const e = window.__debug.state.stats.activity;
        let t = e[0].on;
        window.__debug.state.stats.activity = e.map((e) => {
          const n = t;
          return (t = e.on), { ...e, since: Math.floor((n - e.on) / 60) };
        });
      },
      setState: function (e) {
        const t = a().default.cloneDeep(e);
        P().replaceState.dispatch(t);
      },
      downgradeVersion: function () {
        const e = a().default.cloneDeep(I().model.state);
        (e.version = e.version - 1), P().replaceState.dispatch(e);
      },
      unbanAllTasks: function () {
        const e = a().default.cloneDeep(I().model.state);
        (e.stats.activity = e.stats.activity.filter((e) => "ban" !== e.type)),
          P().replaceState.dispatch(e);
      },
      testGetSkuDetails: function () {
        return (
          dt("billing.getSkuDetails..."),
          new Promise((e) => {
            google.payments.inapp.getSkuDetails({
              parameters: { env: "prod" },
              success: (t) => {
                dt("  success:"), gt(t), e();
              },
              failure: (t) => {
                v().env.is.development &&
                t &&
                t.response &&
                "INVALID_RESPONSE_ERROR" === t.response.errorType
                  ? dt("  success:")
                  : ft("  failure:"),
                  gt(t),
                  e();
              },
            });
          })
        );
      },
      testGetPurchases: function () {
        return (
          dt("billing.getPurchases..."),
          new Promise((e) => {
            google.payments.inapp.getPurchases({
              parameters: { env: "prod" },
              success: (t) => {
                dt("  success:"), gt(t), e();
              },
              failure: (t) => {
                ft("  failure:"), gt(t), e();
              },
            });
          })
        );
      },
      testAll: function () {
        new Promise((e) => {
          setTimeout(e, 0);
        })
          .then(ht.testGetSkuDetails)
          .then(ht.testGetPurchases);
      },
      defineCommit: function () {
        Object.defineProperty(window, "commit", {
          get: () => (this.setState(I().model.state), null),
        });
      },
    };
  d();
  var pt = {
    init: async function () {
      await (async function () {
        for (const e of mt) {
          const t = (
            await d().default(chrome.cookies.getAll, { url: e })
          ).filter((e) => "unspecified" === e.sameSite);
          await Promise.all(
            t.map(async (t) => {
              e.startsWith("http://")
                ? await d().default(chrome.cookies.remove, {
                    url: e,
                    name: t.name,
                  })
                : await d().default(chrome.cookies.set, {
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
        chrome.webRequest.onHeadersReceived.addListener(
          vt,
          { urls: mt },
          Se.getVersion() < 72
            ? ["blocking", "responseHeaders"]
            : ["blocking", "responseHeaders", "extraHeaders"]
        );
    },
  };
  const mt = [
    "http://*.instagram.com/*",
    "https://*.instagram.com/*",
    "https://*.facebook.com/*",
    "http://*.doubleclick.net/*",
  ];
  function vt(e) {
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
  function bt(e) {
    return e && e.__esModule ? e : { default: e };
  }
  I(), V();
  var wt = {},
    St = {
      update: function (e) {
        if (!e.userStates) return e;
        const t = {
          ...e,
          billing: {
            ...e.billing,
            trial: { ...e.billing.trial, dmAdvanced: 0 },
          },
        };
        return delete t.billing.trial.dmGhost, t;
      },
    };
  t(wt, "default", function () {
    return St;
  }),
    e(wt);
  var yt = {},
    kt = {
      update: function (e) {
        return {
          ...e,
          analytics: {
            ...e.analytics,
            trialLastViewedFollowerId: null,
            trialLastViewedUnfollowerId: null,
          },
        };
      },
    };
  t(yt, "default", function () {
    return kt;
  }),
    e(yt);
  var At = {};
  U();
  var Tt = {
    update: function (e) {
      return (
        (async function () {
          const e = await U().idbController.getAllKeys();
          for (const t of e)
            (t.startsWith("schedule.fcs-post-preview:") ||
              t.startsWith("schedule.local-post:")) &&
              U().idbController.delete(t);
        })(),
        e
      );
    },
  };
  t(At, "default", function () {
    return Tt;
  }),
    e(At);
  var Ct = {},
    It = {
      update: function (e) {
        return { ...e, schedule: { ...e.schedule, localPosts: [] } };
      },
    };
  t(Ct, "default", function () {
    return It;
  }),
    e(Ct);
  var Pt = {},
    Dt = {
      update: function (e) {
        return e.userStates
          ? {
              ...e,
              billing: {
                ...e.billing,
                trial: {
                  ...e.billing.trial,
                  dmAdvanced: Math.max(e.billing.trial.dmAdvanced - 50, 0),
                },
              },
            }
          : e;
      },
    };
  t(Pt, "default", function () {
    return Dt;
  }),
    e(Pt);
  var Ot = {},
    Ut = {
      update: function (e) {
        const t = {
          ...e,
          schedule: {
            ...e.schedule,
            isSetupPanelShown: !1,
            setup: { ...e.schedule.setup },
          },
        };
        return delete t.schedule.setup.selectedSetupType, t;
      },
    };
  t(Ot, "default", function () {
    return Ut;
  }),
    e(Ot);
  var _t = {},
    xt = {
      update: function (e) {
        return e.userStates ? { ...e, zen: { enabled: !1 } } : e;
      },
    };
  t(_t, "default", function () {
    return xt;
  }),
    e(_t);
  var Bt = {},
    Et = {
      update: function (e) {
        return e.userStates
          ? {
              ...e,
              billing: { ...e.billing, trial: { ...e.billing.trial, zen: 0 } },
              zen: { ...e.zen, lastTrialUpdateOn: null },
            }
          : e;
      },
    };
  t(Bt, "default", function () {
    return Et;
  }),
    e(Bt);
  var Lt = {},
    Mt = {
      update: function (e) {
        return { ...e, insights: { ...e.insights, lastTaskTimestamps: [] } };
      },
    };
  t(Lt, "default", function () {
    return Mt;
  }),
    e(Lt);
  var Ft = {},
    Ht = {
      update: function (e) {
        return {
          ...e,
          billing: {
            ...e.billing,
            trial: { ...e.billing.trial, coverAssist: 0 },
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
        };
      },
    };
  t(Ft, "default", function () {
    return Ht;
  }),
    e(Ft);
  var Rt = {},
    qt = {
      update: function (e) {
        return e.userStates
          ? {
              ...e,
              whatsNew: e.whatsNew.filter((e) => "youtube-giveaway" !== e.id),
            }
          : e;
      },
    };
  t(Rt, "default", function () {
    return qt;
  }),
    e(Rt);
  var Nt = {},
    Vt = {
      update: function (e) {
        if (!e.userStates) return e;
        const t = { ...e.billing.fspring },
          n = {};
        return (
          t.begin &&
            (n["inssist-pro-monthly"] = {
              active: t.active,
              state: t.state,
              begin: t.begin,
              next: t.next,
            }),
          delete t.active,
          delete t.state,
          delete t.begin,
          delete t.next,
          delete t.sku,
          {
            ...e,
            billing: {
              ...e.billing,
              fspring: t,
              subscriptions: n,
              products: {},
            },
          }
        );
      },
    };
  t(Nt, "default", function () {
    return Vt;
  }),
    e(Nt);
  var jt = {},
    $t = {
      update: function (e) {
        return e.userStates
          ? {
              ...e,
              billing: {
                ...e.billing,
                trial: { ...e.billing.trial, addLinkToStory: 0 },
              },
            }
          : e;
      },
    };
  t(jt, "default", function () {
    return $t;
  }),
    e(jt);
  var Gt = {},
    zt = {
      update: function (e) {
        const t = {
          ...e,
          authStatus: {
            ...e.authStatus,
            cookies: {
              ig: { sessionId: e.authStatus.sessionIdCookie },
              fb: [],
            },
          },
          schedule: {
            ...e.schedule,
            fcsSetup: {
              checking: !1,
              connected: !1,
              connecting: !1,
              showPanel: !1,
              showInstructions: !1,
              showError: !1,
            },
          },
        };
        return (
          delete t.authStatus.sessionIdCookie,
          delete t.schedule.setup,
          delete t.schedule.isVerificationRequired,
          delete t.schedule.isSetupPanelShown,
          t
        );
      },
    };
  t(Gt, "default", function () {
    return zt;
  }),
    e(Gt);
  var Wt = {},
    Jt = {
      update: function (e) {
        const t = {
          ...e,
          authStatus: { ...e.authStatus, cookies: { ...e.authStatus.cookies } },
        };
        return delete t.authStatus.cookies.ig, t;
      },
    };
  t(Wt, "default", function () {
    return Jt;
  }),
    e(Wt);
  var Kt = {},
    Yt = {
      update: function (e) {
        return e.userStates
          ? {
              ...e,
              billing: {
                ...e.billing,
                trial: { ...e.billing.trial, repost: 0 },
              },
            }
          : e;
      },
    };
  t(Kt, "default", function () {
    return Yt;
  }),
    e(Kt);
  var Xt = {},
    Qt = {
      update: function (e) {
        return e.userStates
          ? {
              ...e,
              whatsNew: e.whatsNew.map((e) => {
                let t;
                return (
                  (t =
                    "Share Post to Story" === e.header
                      ? "v10.0.1"
                      : e.subheader),
                  { id: t, acknowledged: e.acknowledged }
                );
              }),
            }
          : e;
      },
    };
  t(Xt, "default", function () {
    return Qt;
  }),
    e(Xt);
  var Zt = {};
  j();
  var en = {
    update: function (e) {
      if (!e.userStates) return e;
      return e.whatsNew.find((e) => "Reposting" === e.id)
        ? {
            ...e,
            whatsNew: j()
              .default()
              .map((e) => ({ id: e.id, acknowledged: !0 })),
          }
        : e;
    },
  };
  t(Zt, "default", function () {
    return en;
  }),
    e(Zt);
  var tn = {},
    nn = {
      update: function (e) {
        return { ...e, schedule: { ...e.schedule, recentScheduledOn: null } };
      },
    };
  t(tn, "default", function () {
    return nn;
  }),
    e(tn);
  var sn = {},
    an = {
      update: function (e) {
        return {
          ...e,
          schedule: {
            ...e.schedule,
            fcsSetup: {
              checking: !1,
              connected: !1,
              connecting: !1,
              showPanel: !1,
              errorCode: null,
            },
          },
        };
      },
    };
  t(sn, "default", function () {
    return an;
  }),
    e(sn);
  var rn = {},
    on = {
      update: function (e) {
        if (!e.userStates) return e;
        const t = {
          ...e,
          billing: { ...e.billing, trial: { ...e.billing.trial } },
        };
        return delete t.billing.trial.multiaccount, t;
      },
    };
  t(rn, "default", function () {
    return on;
  }),
    e(rn);
  var un = {},
    ln = {
      update: function (e) {
        return e.authStatus.cookies
          ? e
          : {
              ...e,
              authStatus: {
                ...e.authStatus,
                cookies: { igSessionId: null, fb: [] },
              },
            };
      },
    };
  t(un, "default", function () {
    return ln;
  }),
    e(un);
  var cn = {},
    dn = {
      update: function (e) {
        return {
          ...e,
          analytics: {
            ...e.analytics,
            filters: { query: "", accounts: "all" },
          },
          insights: {
            ...e.insights,
            filters: { query: "", accounts: "all", posts: "all" },
            tasks: e.insights.tasks.map((e) => {
              const t = { ...e };
              return (
                delete t.followersTableSkip, delete t.followingsTableSkip, t
              );
            }),
          },
        };
      },
    };
  t(cn, "default", function () {
    return dn;
  }),
    e(cn);
  var fn = {},
    gn = {
      update: function (e) {
        return {
          ...e,
          analytics: { ...e.analytics, loading: !1 },
          insights: { ...e.insights, loading: !1 },
        };
      },
    };
  t(fn, "default", function () {
    return gn;
  }),
    e(fn);
  var hn = {},
    pn = {
      update: function (e) {
        if (!e.userStates) {
          const t = { ...e };
          return delete t.tagAssist, t;
        }
        return {
          ...e,
          tagAssist: {
            shown: !1,
            collections: [],
            loadingTags: [],
            selectedTags: [],
            loadedTagData: {},
            errorCode: null,
            search: { query: "", loading: !1, relevantTags: [] },
          },
        };
      },
    };
  t(hn, "default", function () {
    return pn;
  }),
    e(hn);
  var mn = {},
    vn = {
      update: function (e) {
        const t = { ...e, insights: { ...e.insights } };
        return (
          delete t.insights.isReportOpen,
          delete t.insights.selectedTaskId,
          e.userStates &&
            "tab-insights" === e.sidebar.selectedTabId &&
            (t.sidebar = { ...e.sidebar, selectedTabId: "tab-analytics" }),
          t
        );
      },
    };
  t(mn, "default", function () {
    return vn;
  }),
    e(mn);
  var bn = {},
    wn = {
      update: function (e) {
        return e.userStates
          ? {
              ...e,
              whatsNew: e.whatsNew.filter(
                (e) => "earlyadopter-coupon" !== e.id
              ),
            }
          : e;
      },
    };
  t(bn, "default", function () {
    return wn;
  }),
    e(bn);
  var Sn = {},
    yn = {
      update: function (e) {
        if (!e.userStates) return e;
        const t = {
          ...e,
          tagAssist: {
            ...e.tagAssist,
            query: "",
            searching: !1,
            foundTags: [],
          },
        };
        return delete t.tagAssist.search, delete t.tagAssist.loadedTagData, t;
      },
    };
  t(Sn, "default", function () {
    return yn;
  }),
    e(Sn);
  var kn = {},
    An = {
      update: function (e) {
        return e.userStates
          ? { ...e, tagAssist: { ...e.tagAssist, latinOnly: !1 } }
          : e;
      },
    };
  t(kn, "default", function () {
    return An;
  }),
    e(kn);
  var Tn = {},
    Cn = {
      update: function (e) {
        return e.userStates
          ? { ...e, tagAssist: { ...e.tagAssist, accountStats: {} } }
          : e;
      },
    };
  t(Tn, "default", function () {
    return Cn;
  }),
    e(Tn);
  var In = {},
    Pn = {
      update: function (e) {
        if (!e.userStates) return e;
        const t = { ...e, tagAssist: { ...e.tagAssist, relevantTags: [] } };
        return delete t.tagAssist.foundTags, t;
      },
    };
  t(In, "default", function () {
    return Pn;
  }),
    e(In);
  var Dn = {};
  U();
  var On = {
    update: function (e) {
      return e.userStates && U().idbController.delete("tag-assist.tag-data"), e;
    },
  };
  t(Dn, "default", function () {
    return On;
  }),
    e(Dn);
  var Un = {},
    _n = {
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
  t(Un, "default", function () {
    return _n;
  }),
    e(Un);
  var xn = {},
    Bn = {
      update: function (e) {
        return e.userStates
          ? { ...e, tagAssist: { ...e.tagAssist, ladder: null } }
          : e;
      },
    };
  t(xn, "default", function () {
    return Bn;
  }),
    e(xn);
  var En = {};
  U();
  var Ln = {
    update: function (e) {
      return e.userStates && U().idbController.delete("tag-assist.tag-data"), e;
    },
  };
  t(En, "default", function () {
    return Ln;
  }),
    e(En);
  var Mn = {},
    Fn = {
      update: function (e) {
        return e.userStates
          ? { ...e, tagAssist: { ...e.tagAssist, selectedTabId: "search" } }
          : e;
      },
    };
  t(Mn, "default", function () {
    return Fn;
  }),
    e(Mn);
  var Hn = {},
    Rn = {
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
  t(Hn, "default", function () {
    return Rn;
  }),
    e(Hn);
  var qn = {},
    Nn = {
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
  t(qn, "default", function () {
    return Nn;
  }),
    e(qn);
  var Vn = {},
    jn = {
      update: function (e) {
        return e.userStates
          ? { ...e, tagAssist: { ...e.tagAssist, engagementSort: null } }
          : e;
      },
    };
  t(Vn, "default", function () {
    return jn;
  }),
    e(Vn);
  var $n = {},
    Gn = {
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
  t($n, "default", function () {
    return Gn;
  }),
    e($n);
  var zn = {},
    Wn = {
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
  t(zn, "default", function () {
    return Wn;
  }),
    e(zn);
  var Jn = {},
    Kn = {
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
  t(Jn, "default", function () {
    return Kn;
  }),
    e(Jn);
  var Yn = {},
    Xn = {
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
  t(Yn, "default", function () {
    return Xn;
  }),
    e(Yn);
  var Qn = {},
    Zn = {
      update: function (e) {
        return { ...e, reels: { supported: !1 } };
      },
    };
  t(Qn, "default", function () {
    return Zn;
  }),
    e(Qn);
  var es = {},
    ts = {
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
  t(es, "default", function () {
    return ts;
  }),
    e(es);
  var ns = {},
    ss = {
      update: function (e) {
        return { ...e, reels: { ...e.reels, creating: !1 } };
      },
    };
  t(ns, "default", function () {
    return ss;
  }),
    e(ns);
  var as = {},
    is = {
      update: function (e) {
        return { ...e, authStatus: { ...e.authStatus, isMobileSession: !1 } };
      },
    };
  t(as, "default", function () {
    return is;
  }),
    e(as);
  var rs = {},
    os = {
      update: function (e) {
        return e.userStates
          ? { ...e, billing: { ...e.billing, recentFeature: null } }
          : e;
      },
    };
  t(rs, "default", function () {
    return os;
  }),
    e(rs);
  var us = {},
    ls = {
      update: function (e) {
        const t = { ...e, schedule: { ...e.schedule, loading: !1 } };
        return delete t.schedule.isRefreshingGrid, t;
      },
    };
  t(us, "default", function () {
    return ls;
  }),
    e(us);
  var cs = {},
    ds = {
      update: function (e) {
        const t = {
          ...e,
          schedule: { ...e.schedule, navigation: { ...e.schedule.navigation } },
        };
        return delete t.schedule.navigation.fcsTitle, t;
      },
    };
  t(cs, "default", function () {
    return ds;
  }),
    e(cs);
  var fs = {},
    gs = {
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
  t(fs, "default", function () {
    return gs;
  }),
    e(fs);
  var hs = {},
    ps = {
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
  t(hs, "default", function () {
    return ps;
  }),
    e(hs);
  var ms = {},
    vs = {
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
  t(ms, "default", function () {
    return vs;
  }),
    e(ms);
  var bs = {},
    ws = {
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
  t(bs, "default", function () {
    return ws;
  }),
    e(bs);
  var Ss = {},
    ys = {
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
  t(Ss, "default", function () {
    return ys;
  }),
    e(Ss);
  var ks = {},
    As = {
      update: function (e) {
        return { ...e, schedule: { ...e.schedule, showTagAssist: !1 } };
      },
    };
  t(ks, "default", function () {
    return As;
  }),
    e(ks);
  var Ts = {},
    Cs = {
      update: function (e) {
        const t = { ...e, reels: { ...e.reels } };
        return delete t.reels.supported, t;
      },
    };
  t(Ts, "default", function () {
    return Cs;
  }),
    e(Ts);
  var Is = {},
    Ps = {
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
  t(Is, "default", function () {
    return Ps;
  }),
    e(Is);
  var Ds = {},
    Os = {
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
  t(Ds, "default", function () {
    return Os;
  }),
    e(Ds);
  var Us = {},
    _s = {
      update: function (e) {
        return e.userStats
          ? { ...e, tagAssist: { ...e.tagAssist, lastTagScanOn: null } }
          : e;
      },
    };
  t(Us, "default", function () {
    return _s;
  }),
    e(Us);
  var xs = {},
    Bs = {
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
  t(xs, "default", function () {
    return Bs;
  }),
    e(xs);
  var Es = {},
    Ls = {
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
  t(Es, "default", function () {
    return Ls;
  }),
    e(Es);
  var Ms = {},
    Fs = {
      update: function (e) {
        const t = { ...e, schedule: { ...e.schedule, addCardAttention: !1 } };
        return delete t.schedule.gridAddCardAttention, t;
      },
    };
  t(Ms, "default", function () {
    return Fs;
  }),
    e(Ms);
  var Hs = {},
    Rs = {
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
  t(Hs, "default", function () {
    return Rs;
  }),
    e(Hs);
  var qs = {},
    Ns = {
      update: function (e) {
        return { ...e, bulk: { saving: !1, selectedPostIds: [], actions: {} } };
      },
    };
  t(qs, "default", function () {
    return Ns;
  }),
    e(qs);
  var Vs = {},
    js = {
      update: function (e) {
        return { ...e, bulk: { ...e.bulk, activeActionId: null } };
      },
    };
  t(Vs, "default", function () {
    return js;
  }),
    e(Vs);
  var $s = {},
    Gs = {
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
  t($s, "default", function () {
    return Gs;
  }),
    e($s);
  var zs = {},
    Ws = {
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
  t(zs, "default", function () {
    return Ws;
  }),
    e(zs);
  var Js = {},
    Ks = {
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
  t(Js, "default", function () {
    return Ks;
  }),
    e(Js);
  var Ys = {},
    Xs = {
      update: function (e) {
        return { ...e, schedule: { ...e.schedule, isDraggingPost: !1 } };
      },
    };
  t(Ys, "default", function () {
    return Xs;
  }),
    e(Ys);
  var Qs = {},
    Zs = {
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
  t(Qs, "default", function () {
    return Zs;
  }),
    e(Qs);
  var ea = {},
    ta = {
      update: function (e) {
        const t = { ...e, schedule: { ...e.schedule } };
        return (
          delete t.schedule.hasUncommitedChanges, delete t.schedule.tasks, t
        );
      },
    };
  t(ea, "default", function () {
    return ta;
  }),
    e(ea);
  var na = {},
    sa = {
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
  t(na, "default", function () {
    return sa;
  }),
    e(na);
  var aa = {},
    ia = {
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
  t(aa, "default", function () {
    return ia;
  }),
    e(aa);
  var ra = {},
    oa = {
      update: function (e) {
        const t = { ...e, dm: { ...e.dm } };
        return delete t.dm.supported, t;
      },
    };
  t(ra, "default", function () {
    return oa;
  }),
    e(ra);
  var ua = {},
    la = {
      update: function (e) {
        return { ...e, dm: { ...e.dm, ghostModeEnabled: !0 } };
      },
    };
  t(ua, "default", function () {
    return la;
  }),
    e(ua);
  var ca = {};
  U();
  var da = {
    update: function (e) {
      const t = { ...e };
      return (
        delete t.analytics,
        delete t.insights,
        (async function () {
          const e = await U().idbController.getAllKeys();
          for (const t of e)
            (t.startsWith("insights.") || t.startsWith("block:analytics:")) &&
              U().idbController.delete(t);
        })(),
        t
      );
    },
  };
  t(ca, "default", function () {
    return da;
  }),
    e(ca);
  var fa = {},
    ga = {
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
  t(fa, "default", function () {
    return ga;
  }),
    e(fa);
  var ha = {},
    pa = {
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
  t(ha, "default", function () {
    return pa;
  }),
    e(ha);
  var ma = {},
    va = {
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
  t(ma, "default", function () {
    return va;
  }),
    e(ma);
  var ba = {},
    wa = {
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
  t(ba, "default", function () {
    return wa;
  }),
    e(ba);
  var Sa = {},
    ya = {
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
  t(Sa, "default", function () {
    return ya;
  }),
    e(Sa);
  var ka = {};
  $();
  var Aa = {
    update: function (e) {
      if (!e.userStates) return e;
      return {
        ...e,
        quickReplies: { shown: !1, content: $().default(), total: 7 },
      };
    },
  };
  t(ka, "default", function () {
    return Aa;
  }),
    e(ka);
  var Ta = {},
    Ca = {
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
  t(Ta, "default", function () {
    return Ca;
  }),
    e(Ta);
  var Ia = {},
    Pa = {
      update: function (e) {
        const t = { ...e };
        return delete t.igtvUpload, t;
      },
    };
  t(Ia, "default", function () {
    return Pa;
  }),
    e(Ia);
  var Da = {},
    Oa = {
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
  t(Da, "default", function () {
    return Oa;
  }),
    e(Da);
  var Ua = {},
    _a = {
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
  t(Ua, "default", function () {
    return _a;
  }),
    e(Ua);
  var xa = {},
    Ba = {
      update: function (e) {
        return {
          ...e,
          musicAssist: { ...e.musicAssist, showUpsellOverlay: !1 },
        };
      },
    };
  t(xa, "default", function () {
    return Ba;
  }),
    e(xa);
  var Ea = {},
    La = {
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
  t(Ea, "default", function () {
    return La;
  }),
    e(Ea);
  var Ma = {},
    Fa = {
      update: function (e) {
        return { ...e, musicAssist: { ...e.musicAssist, isStory: !1 } };
      },
    };
  t(Ma, "default", function () {
    return Fa;
  }),
    e(Ma);
  var Ha = {},
    Ra = {
      update: function (e) {
        if (!e.userStates) return e;
        const t = {
          ...e.billing.trial,
          reels: 0,
          coverAssist: 0,
          musicAssist: 0,
        };
        return (
          ue.setTrialCookie(t), { ...e, billing: { ...e.billing, trial: t } }
        );
      },
    };
  t(Ha, "default", function () {
    return Ra;
  }),
    e(Ha);
  var qa = {},
    Na = {
      update: function (e) {
        return {
          ...e,
          musicAssist: { ...e.musicAssist, videoVolume: 0, musicVolume: 0.5 },
        };
      },
    };
  t(qa, "default", function () {
    return Na;
  }),
    e(qa);
  var Va = {},
    ja = {
      update: function (e) {
        return { ...e, musicAssist: { ...e.musicAssist, videoCurrentTime: 0 } };
      },
    };
  t(Va, "default", function () {
    return ja;
  }),
    e(Va);
  var $a = {},
    Ga = {
      update: function (e) {
        if (!e.userStates) return e;
        const t = {
          ...e.billing.trial,
          reels: Math.max(0, e.billing.trial.reels - 3),
          musicAssist: Math.max(0, e.billing.trial.musicAssist - 3),
        };
        return (
          ue.setTrialCookie(t), { ...e, billing: { ...e.billing, trial: t } }
        );
      },
    };
  t($a, "default", function () {
    return Ga;
  }),
    e($a);
  var za = {},
    Wa = {
      update: function (e) {
        if (!e.userStates) return e;
        const t = { ...e.billing.trial, schedule: 0 };
        return (
          ue.setTrialCookie(t), { ...e, billing: { ...e.billing, trial: t } }
        );
      },
    };
  t(za, "default", function () {
    return Wa;
  }),
    e(za);
  var Ja = {},
    Ka = {
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
  t(Ja, "default", function () {
    return Ka;
  }),
    e(Ja);
  var Ya = {},
    Xa = {
      update: function (e) {
        return {
          ...e,
          storyAssist: { ...e.storyAssist, showUpsellOverlay: !1 },
        };
      },
    };
  t(Ya, "default", function () {
    return Xa;
  }),
    e(Ya);
  var Qa = {},
    Za = {
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
  t(Qa, "default", function () {
    return Za;
  }),
    e(Qa);
  var ei = {},
    ti = {
      update: function (e) {
        return {
          ...e,
          storyAssist: { ...e.storyAssist, selectedTabId: "music" },
        };
      },
    };
  t(ei, "default", function () {
    return ti;
  }),
    e(ei);
  var ni = {},
    si = {
      update: function (e) {
        return { ...e, storyAssist: { ...e.storyAssist, coverUrl: null } };
      },
    };
  t(ni, "default", function () {
    return si;
  }),
    e(ni);
  var ai = {},
    ii = {
      update: function (e) {
        return { ...e, ghostStoryView: { enabled: !1 } };
      },
    };
  t(ai, "default", function () {
    return ii;
  }),
    e(ai);
  var ri = {},
    oi = {
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
  t(ri, "default", function () {
    return oi;
  }),
    e(ri);
  var ui = {},
    li = {
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
  t(ui, "default", function () {
    return li;
  }),
    e(ui);
  var ci = {},
    di = {
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
  t(ci, "default", function () {
    return di;
  }),
    e(ci);
  var fi = {},
    gi = {
      update: function (e) {
        const t = { ...e };
        return t.userStates || delete t.sidebar, t;
      },
    };
  t(fi, "default", function () {
    return gi;
  }),
    e(fi);
  var hi = {},
    pi = {
      update: function (e) {
        return e.igView
          ? {
              ...e,
              igView: { ...e.igView, fullscreenWidth: 460, withBorder: !0 },
            }
          : e;
      },
    };
  t(hi, "default", function () {
    return pi;
  }),
    e(hi);
  var mi = {},
    vi = {
      update: function (e) {
        const t = {
          ...e,
          analytics: {
            ...e.analytics,
            runAutomatically: !0,
            runningJobId: null,
            lastScanOn: null,
            nextScanOn: null,
            error: null,
            isReportOpen: !0,
            selectedCard: "nFollowers",
          },
          ff: { isActionBlockShown: !1, followStatus: {} },
        };
        return delete t.insights.isActionBlockShown, t;
      },
    };
  t(mi, "default", function () {
    return vi;
  }),
    e(mi);
  var bi = {},
    wi = {
      update: function (e) {
        const t = { ...e, igTask: e.ff };
        return delete t.ff, t;
      },
    };
  t(bi, "default", function () {
    return wi;
  }),
    e(bi);
  var Si = {},
    yi = {
      update: function (e) {
        return { ...e, igTask: { ...e.igTask, likeStatus: {} } };
      },
    };
  t(Si, "default", function () {
    return yi;
  }),
    e(Si);
  var ki = {},
    Ai = {
      update: function (e) {
        const t = { ...e, igTask: { ...e.igTask, actionBlockCode: null } };
        return delete t.igTask.isActionBlockShown, t;
      },
    };
  t(ki, "default", function () {
    return Ai;
  }),
    e(ki);
  var Ti = {},
    Ci = {
      update: function (e) {
        return e.userStates
          ? e
          : {
              ...e,
              authStatus: {
                userId: null,
                username: null,
                avatarUrl: null,
                sessionIdCookie: null,
                isLoggedIn: !1,
              },
            };
      },
    };
  t(Ti, "default", function () {
    return Ci;
  }),
    e(Ti);
  var Ii = {},
    Pi = {
      update: function (e) {
        return e.userStates
          ? {
              ...e,
              multiaccount: {
                userIds: e.authStatus.isLoggedIn ? [e.authStatus.userId] : [],
                addingNewAccount: !1,
              },
            }
          : e;
      },
    };
  t(Ii, "default", function () {
    return Pi;
  }),
    e(Ii);
  var Di = {},
    Oi = {
      update: function (e) {
        if (!e.userStates) return e;
        const t = e.multiaccount.userIds;
        return {
          ...e,
          multiaccount: {
            ...e.multiaccount,
            selectedUserId: t.length ? t[t.length - 1] : null,
          },
        };
      },
    };
  t(Di, "default", function () {
    return Oi;
  }),
    e(Di);
  var Ui = {},
    _i = {
      update: function (e) {
        return e.userStates
          ? { ...e, igView: { ...e.igView, creationCardShown: !1 } }
          : e;
      },
    };
  t(Ui, "default", function () {
    return _i;
  }),
    e(Ui);
  var xi = {},
    Bi = {
      update: function (e) {
        return e.userStates
          ? { ...e, billing: { ...e.billing, recordedUsernames: [] } }
          : e;
      },
    };
  t(xi, "default", function () {
    return Bi;
  }),
    e(xi);
  var Ei = {},
    Li = {
      update: function (e) {
        const t = {
          ...e,
          schedule: {
            ...e.schedule,
            setup: { ...e.schedule.setup, stepIndex: null, stepTitle: null },
          },
        };
        return delete t.schedule.setup.progress, t;
      },
    };
  t(Ei, "default", function () {
    return Li;
  }),
    e(Ei);
  var Mi = {},
    Fi = {
      update: function (e) {
        return e.userStates
          ? { ...e, followUs: { shown: !1, acknowledged: !1 } }
          : e;
      },
    };
  t(Mi, "default", function () {
    return Fi;
  }),
    e(Mi);
  var Hi = {},
    Ri = {
      update: function (e) {
        if (!e.userStates) return e;
        const t = {
          ...e,
          acknowledged: { ...e.acknowledged },
          rateUs: { shown: !1, acknowledged: -1 !== e.acknowledged.rateUs },
        };
        return delete t.acknowledged.rateUs, t;
      },
    };
  t(Hi, "default", function () {
    return Ri;
  }),
    e(Hi);
  var qi = {},
    Ni = {
      update: function (e) {
        if (!e.userStates) return e;
        const t = Date.now(),
          n = {
            ...e,
            acknowledged: {
              ...e.acknowledged,
              rateUs: e.rateUs.acknowledged ? t : -1,
              followUs: e.followUs.acknowledged ? t : -1,
            },
            rateUs: { ...e.rateUs },
            followUs: { ...e.followUs },
          };
        return delete n.rateUs.acknowledged, delete n.followUs.acknowledged, n;
      },
    };
  t(qi, "default", function () {
    return Ni;
  }),
    e(qi);
  var Vi = {},
    ji = {
      update: function (e) {
        if (!e.userStates) return e;
        const t = { ...e, userDetails: {} };
        return delete t.billing.promostory.followersCount, t;
      },
    };
  t(Vi, "default", function () {
    return ji;
  }),
    e(Vi);
  var $i = {},
    Gi = {
      update: function (e) {
        if (!e.userStates) return e;
        const t = { ...e, acknowledged: { ...e.acknowledged } };
        return delete t.acknowledged.postLimitations, t;
      },
    };
  t($i, "default", function () {
    return Gi;
  }),
    e($i);
  var zi = {},
    Wi = {
      update: function (e) {
        return e;
      },
    };
  t(zi, "default", function () {
    return Wi;
  }),
    e(zi);
  var Ji = {},
    Ki = {
      update: function (e) {
        return {
          ...e,
          schedule: {
            ...e.schedule,
            fcsPosts: e.schedule.fcsPosts.map((e) => {
              const t = { ...e };
              return delete t.firstMediaId, t;
            }),
          },
        };
      },
    };
  t(Ji, "default", function () {
    return Ki;
  }),
    e(Ji);
  var Yi = {},
    Xi = {
      update: function (e) {
        return { ...e, schedule: { ...e.schedule, drafts: [] } };
      },
    };
  t(Yi, "default", function () {
    return Xi;
  }),
    e(Yi);
  var Qi = {},
    Zi = {
      update: function (e) {
        const t = {
          ...e,
          dm: { ...e.dm, ghostModeEnabled: !1, ghostModeFailed: !1 },
        };
        return delete t.dm.showBadge, t;
      },
    };
  t(Qi, "default", function () {
    return Zi;
  }),
    e(Qi);
  var er = {},
    tr = {
      update: function (e) {
        const t = {
          ...e,
          schedule: {
            ...e.schedule,
            filters: {
              ...e.schedule.filters,
              statuses: [...e.schedule.filters.statuses, "local"],
            },
          },
        };
        return delete t.dm.showBadge, t;
      },
    };
  t(er, "default", function () {
    return tr;
  }),
    e(er);
  var nr = {};
  U();
  var sr = {
    update: function (e) {
      const t = {
        ...e,
        schedule: { ...e.schedule, localPosts: e.schedule.drafts },
      };
      return (
        delete t.schedule.drafts,
        (async function () {
          let e;
          try {
            e = await U().idbController.getAllKeys();
          } catch (e) {
            return;
          }
          for (const t of e) {
            if (!t.startsWith("schedule.drafts:")) continue;
            const e = t.replace("schedule.drafts:", ""),
              n = await U().idbController.get(t);
            U().idbController.set(`schedule.local-posts:${e}`, n),
              U().idbController.delete(t);
          }
        })(),
        t
      );
    },
  };
  t(nr, "default", function () {
    return sr;
  }),
    e(nr);
  var ar = {};
  U();
  var ir = {
    update: function (e) {
      return (
        (async function () {
          let e;
          try {
            e = await U().idbController.getAllKeys();
          } catch (e) {
            return;
          }
          for (const t of e)
            (t.startsWith("schedule.drafts:") ||
              t.startsWith("schedule.local-posts:")) &&
              U().idbController.delete(t);
        })(),
        { ...e, schedule: { ...e.schedule, bulkUploadErrors: [] } }
      );
    },
  };
  t(ar, "default", function () {
    return ir;
  }),
    e(ar);
  var rr = {},
    or = {
      update: function (e) {
        return { ...e, schedule: { ...e.schedule, localPosts: [] } };
      },
    };
  t(rr, "default", function () {
    return or;
  }),
    e(rr);
  var ur = {};
  c(), U();
  var lr = {
    update: function (e) {
      return (
        (async function () {
          const e = await c().default(() => U().idbController.getAllKeys(), []);
          for (const t of e)
            t.startsWith("schedule.local-posts:") &&
              U().idbController.delete(t);
        })(),
        { ...e, schedule: { ...e.schedule, localPosts: [] } }
      );
    },
  };
  t(ur, "default", function () {
    return lr;
  }),
    e(ur);
  var cr = {},
    dr = {
      update: function (e) {
        const t = { ...e, schedule: { ...e.schedule } };
        return (
          delete t.schedule.csPosts,
          delete t.schedule.csError,
          delete t.schedule.csFailed,
          delete t.schedule.lastCsPostsUpdateOn,
          delete t.schedule.navigation.csTitle,
          delete t.schedule.navigation.isCsLoading,
          delete t.schedule.setup.isCsConnected,
          t
        );
      },
    };
  t(cr, "default", function () {
    return dr;
  }),
    e(cr);
  var fr = {},
    gr = {
      update: function (e) {
        if (!e.userStates) return e;
        const t = {
          ...e,
          billing: {
            ...e.billing,
            trial: {
              ...e.billing.trial,
              dmGhost: 0,
              schedule: 0,
              insights: 0,
              analytics: 0,
              multiaccount: 0,
            },
          },
        };
        return delete t.billing.promostory, t;
      },
    };
  t(fr, "default", function () {
    return gr;
  }),
    e(fr);
  var hr = {},
    pr = {
      update: function (e) {
        const t = { ...e, insights: { ...e.insights } };
        return delete t.insights.availability, t;
      },
    };
  t(hr, "default", function () {
    return pr;
  }),
    e(hr);
  const mr = {
      "version-100": bt(wt).default,
      "version-101": bt(yt).default,
      "version-102": bt(At).default,
      "version-103": bt(Ct).default,
      "version-104": bt(Pt).default,
      "version-105": bt(Ot).default,
      "version-106": bt(_t).default,
      "version-107": bt(Bt).default,
      "version-108": bt(Lt).default,
      "version-109": bt(Ft).default,
      "version-110": bt(Rt).default,
      "version-111": bt(Nt).default,
      "version-112": bt(jt).default,
      "version-113": bt(Gt).default,
      "version-114": bt(Wt).default,
      "version-115": bt(Kt).default,
      "version-116": bt(Xt).default,
      "version-117": bt(Zt).default,
      "version-118": bt(tn).default,
      "version-119": bt(sn).default,
      "version-120": bt(rn).default,
      "version-121": bt(un).default,
      "version-122": bt(cn).default,
      "version-123": bt(fn).default,
      "version-124": bt(hn).default,
      "version-125": bt(mn).default,
      "version-126": bt(bn).default,
      "version-127": bt(Sn).default,
      "version-128": bt(kn).default,
      "version-129": bt(Tn).default,
      "version-130": bt(In).default,
      "version-131": bt(Dn).default,
      "version-132": bt(Un).default,
      "version-133": bt(xn).default,
      "version-134": bt(En).default,
      "version-135": bt(Mn).default,
      "version-136": bt(Hn).default,
      "version-137": bt(qn).default,
      "version-138": bt(Vn).default,
      "version-139": bt($n).default,
      "version-140": bt(zn).default,
      "version-141": bt(Jn).default,
      "version-142": bt(Yn).default,
      "version-143": bt(Qn).default,
      "version-144": bt(es).default,
      "version-145": bt(ns).default,
      "version-146": bt(as).default,
      "version-147": bt(rs).default,
      "version-148": bt(us).default,
      "version-149": bt(cs).default,
      "version-150": bt(fs).default,
      "version-151": bt(hs).default,
      "version-152": bt(ms).default,
      "version-153": bt(bs).default,
      "version-154": bt(Ss).default,
      "version-155": bt(ks).default,
      "version-156": bt(Ts).default,
      "version-157": bt(Is).default,
      "version-158": bt(Ds).default,
      "version-159": bt(Us).default,
      "version-160": bt(xs).default,
      "version-161": bt(Es).default,
      "version-162": bt(Ms).default,
      "version-163": bt(Hs).default,
      "version-164": bt(qs).default,
      "version-165": bt(Vs).default,
      "version-166": bt($s).default,
      "version-167": bt(zs).default,
      "version-168": bt(Js).default,
      "version-169": bt(Ys).default,
      "version-170": bt(Qs).default,
      "version-171": bt(ea).default,
      "version-172": bt(na).default,
      "version-173": bt(aa).default,
      "version-174": bt(ra).default,
      "version-175": bt(ua).default,
      "version-176": bt(ca).default,
      "version-177": bt(fa).default,
      "version-178": bt(ha).default,
      "version-179": bt(ma).default,
      "version-180": bt(ba).default,
      "version-181": bt(Sa).default,
      "version-182": bt(ka).default,
      "version-183": bt(Ta).default,
      "version-184": bt(Ia).default,
      "version-185": bt(Da).default,
      "version-186": bt(Ua).default,
      "version-187": bt(xa).default,
      "version-188": bt(Ea).default,
      "version-189": bt(Ma).default,
      "version-190": bt(Ha).default,
      "version-191": bt(qa).default,
      "version-192": bt(Va).default,
      "version-193": bt($a).default,
      "version-194": bt(za).default,
      "version-195": bt(Ja).default,
      "version-196": bt(Ya).default,
      "version-197": bt(Qa).default,
      "version-198": bt(ei).default,
      "version-199": bt(ni).default,
      "version-200": bt(ai).default,
      "version-201": bt(ri).default,
      "version-202": bt(ui).default,
      "version-203": bt(ci).default,
      "version-71": bt(fi).default,
      "version-72": bt(hi).default,
      "version-73": bt(mi).default,
      "version-74": bt(bi).default,
      "version-75": bt(Si).default,
      "version-76": bt(ki).default,
      "version-77": bt(Ti).default,
      "version-78": bt(Ii).default,
      "version-79": bt(Di).default,
      "version-80": bt(Ui).default,
      "version-81": bt(xi).default,
      "version-82": bt(Ei).default,
      "version-83": bt(Mi).default,
      "version-84": bt(Hi).default,
      "version-85": bt(qi).default,
      "version-86": bt(Vi).default,
      "version-87": bt($i).default,
      "version-88": bt(zi).default,
      "version-89": bt(Ji).default,
      "version-90": bt(Yi).default,
      "version-91": bt(Qi).default,
      "version-92": bt(er).default,
      "version-93": bt(nr).default,
      "version-94": bt(ar).default,
      "version-95": bt(rr).default,
      "version-96": bt(ur).default,
      "version-97": bt(cr).default,
      "version-98": bt(fr).default,
      "version-99": bt(hr).default,
    },
    vr = {
      versioners: {},
      init: function () {
        const e = /version-(\d+)/i;
        Object.keys(mr)
          .map((t) => {
            const n = parseInt(t.match(e)[1]);
            return { key: t, version: n };
          })
          .sort((e, t) => e.version - t.version)
          .forEach((e) => {
            this.versioners[e.version] = mr[e.key];
          });
      },
      update: function (e) {
        let t = e,
          n = t.version || 0;
        log(`versioner: model version is ${n}`);
        const s = V().default().version;
        for (; n < s; ) {
          log(`versioner: applying versioner ${n + 1}`);
          const e = this.versioners[n + 1];
          (t = e.update(t)), (t.version = n + 1);
          const s = t.backups || t.userStates;
          for (const t in s) {
            const a = s[t];
            try {
              (s[t] = e.update(a)), (s[t].version = n + 1);
            } catch (e) {
              delete s[t];
            }
          }
          n++;
        }
        return t;
      },
    };
  vr.init(), j();
  const br = function (e) {
    const t = Array.isArray(e.whatsNew) ? e.whatsNew : [],
      n = j().default();
    let s = !1;
    const a = n.map((e) => {
      let n;
      if (s) n = !0;
      else {
        const a = t.find((t) => t.id === e.id);
        (n = (a && a.acknowledged) || !1), n && (s = !0);
      }
      return { id: e.id, acknowledged: n };
    });
    return { ...e, whatsNew: a };
  };
  I(), V(), G();
  var wr = I().action("state.setup-default-state", (e) =>
    e.whatsNew ? e : { ...V().default(), ...G().default() }
  );
  z();
  const Sr = {
    init: function () {
      wr.dispatch(), this._update();
    },
    _update: function () {
      let e = I().model.state;
      (e = vr.update(e)),
        (e = br(e)),
        e !== I().model.state && z().default.dispatch(e);
    },
  };
  D(), I();
  const yr = {
    status: null,
    init: function () {
      this._subscribeToInflux();
    },
    _subscribeToInflux: function () {
      I().model.observe(
        (e) => (e.whatsNew.some((e) => !e.acknowledged) ? "updated" : "normal"),
        (e) => {
          this._updateBadge(e);
        }
      );
    },
    _updateBadge: function (e) {
      this.status !== e &&
        chrome.browserAction.setIcon({
          path: { 48: `img/icon-badge-48-${e}.png` },
        });
    },
  };
  x(), N();
  var kr = {
    init: function () {
      chrome.runtime.setUninstallURL("https://github.com/YezerSTN/INSSIST/releases");
    },
  };
  I();
  const Ar = {
    init: function () {
      (this._goOnline = this._goOnline.bind(this)),
        (this._goOffline = this._goOffline.bind(this)),
        (this._recoverIfOffline = this._recoverIfOffline.bind(this)),
        window.addEventListener("online", this._goOnline, !1),
        window.addEventListener("offline", this._goOffline, !1),
        setInterval(this._recoverIfOffline, 3e5);
    },
    _goOnline: function () {
      log("starter: going online"),
        null === I().model.state.authStatus.userId && xe.updateUser();
    },
    _goOffline: function () {
      log("starter: going offline"),
        null !== I().model.state.authStatus.userId && xe.updateUser();
    },
    _recoverIfOffline: function () {
      null === I().model.state.authStatus.userId &&
        (log("starter: trying to recover from offline"), xe.updateUser());
    },
  };
  I(), P(), b();
  const Tr = new Q(b().sleepTimes.action);
  var Cr = {
    init: async function () {
      log("ig-task: initialisation succeeded"),
        I().model.observe(
          () => P().stateProxy.userId(),
          () => Tr.cleanup(),
          !1
        );
    },
  };
  b();
  new Q(b().sleepTimes.peers);
  d(), W(), I(), S();
  var Ir = {
    init: function () {
      W().default("open-in-inssist", async (e) => {
        const t = await d().default(chrome.windows.getLastFocused),
          n = await d().default(chrome.tabs.getSelected, t.id);
        !(async function (e) {
          const t = Number(localStorage.getItem("last-tab-id")),
            n = await d().default(chrome.tabs.get, t),
            s = e.startsWith("/direct/") && "/direct/" !== e;
          s
            ? I().transaction((e) => {
                (e.sidebar.isOpen = !0), (e.sidebar.selectedTabId = "tab-dm");
              })
            : I().transaction((e) => {
                e.sidebar.isOpen = !1;
              });
          n
            ? (chrome.windows.update(n.windowId, { focused: !0 }),
              chrome.tabs.update(n.id, { active: !0 }),
              s || S().chromeBus.send("iframe-bus", "ig.ajax-go", e))
            : (s || localStorage.setItem("instagram-iframe-path", e),
              chrome.tabs.create({
                url: "https://app.inssist.com",
                active: !0,
              }));
        })(e.value),
          await d().default(chrome.tabs.remove, n.id);
      });
    },
  };
  p(), m(), v(), C(), S(), J(), K();
  var Pr = {
    init: function () {
      S().chromeBus.on("fusion.check-new-version", _r),
        S().chromeBus.on("fusion.popup-tab-id", (e) => {
          Dr = e;
        }),
        J().resetController.onReset(Ur),
        chrome.tabs.onRemoved.addListener((e) => {
          e === Dr && Or && xr();
        }),
        S().chromeBus.on("fusion.update-now-click", () => {
          p().default.set("fusion.reload-popup-on-background-start", !0), xr();
        }),
        p().default.get("fusion.reload-popup-on-background-start") &&
          (p().default.remove("fusion.reload-popup-on-background-start"),
          S().chromeBus.send("fusion.reload-popup")),
        chrome.alarms.onAlarm.addListener(async (e) => {
          "fusion.refresh-config" === e.name && _r();
        }),
        chrome.alarms.create("fusion.refresh-config", {
          when: Date.now(),
          periodInMinutes: 1440,
        });
    },
  };
  let Dr, Or;
  function Ur() {
    p().default.remove("fusion.last-check-on");
  }
  async function _r() {
    const e = 15 * m().MINUTE,
      t = Number(p().default.get("fusion.last-check-on"));
    if (t && Date.now() < t + e) return;
    p().default.set("fusion.last-check-on", Date.now());
    const n = K().default(),
      s = `${v().env.options.apiUrl}/fusion?version=${n.version}`;
    C().fetcher.ignoreCache();
    const a = (await C().fetcher.fetchText(s, { credentials: "omit" }))
        .replace(/&amp;/g, "&")
        .replace(/&#34;/g, '\\"')
        .replace(/&#39/g, "'")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">"),
      i = JSON.parse(a);
    if (!i.config) return;
    const r = JSON.parse(JSON.stringify(n));
    Or = Br(r, i.config);
    chrome.extension.getViews({ type: "tab" }).length > 0
      ? S().chromeBus.send("fusion.new-version-available")
      : xr();
  }
  function xr() {
    Or && (p().default.set("fusion.config", Or), location.reload());
  }
  function Br(e, t) {
    for (const n in t) Z(e[n]) && Z(t[n]) ? Br(e[n], t[n]) : (e[n] = t[n]);
    return e;
  }
  g(), m(), v(), k(), I(), Y(), X();
  var Er = {
    init: function () {
      I().model.observe(
        (e) => e.authStatus.userId,
        () => {
          Lr();
        }
      ),
        g().default(
          "tag-assist.update-account-stats",
          { period: 4 * m().HOUR },
          () => {
            Lr();
          }
        );
    },
  };
  async function Lr(e = 0) {
    const t = I().model.state,
      n = t.authStatus.userId;
    if (!n) return;
    const s = Date.now(),
      a = X().default.getAccountStats(),
      i = a && s - a.lastScanOn;
    if (i && i < v().env.options.tagAssist.accountStatsTtl) return;
    const r = t.authStatus.username,
      o = await k().igApi.fetchUserPosts(r, 42);
    if (o.error)
      return e < 2
        ? void Lr(e + 1)
        : void console.error("failed to update account stats", o);
    const u = o.result;
    let l = 0,
      c = 0;
    for (const e of u)
      (l += k().igApi.normalizePostStat24h(e.stats.likes, e.on)),
        (c += k().igApi.normalizePostStat24h(e.stats.comments, e.on));
    u.length > 0 &&
      ((l = Math.round(l / u.length)), (c = Math.round(c / u.length)));
    const d = Y().sortByFrequency(
      u.map((e) => e.caption || "").map((e) => Y().extractTags(e, !0))
    );
    I().transaction((e) => {
      e.tagAssist.accountStats[n] = {
        avgLikes: l,
        avgComments: c,
        mostUsedTags: d.slice(0, 3),
        lastScanOn: Date.now(),
      };
    });
  }
  var Mr = {
    init: function () {
      Er.init();
    },
  };
  m(), d(), W(), S(), P(), x(), I(), W();
  var Fr = {
    init: function () {
      W().default("desktop-reels.drop-session", async () => {
        chrome.cookies.remove({
          url: "https://www.instagram.com",
          name: "sessionid",
        }),
          chrome.cookies.remove({
            url: "https://www.instagram.com",
            name: "ds_user_id",
          });
      });
    },
  };
  var Hr = {
    init: function () {
      Fr.init(),
        S().chromeBus.on("desktop-reels.get-initial-data", Rr),
        W().default("desktop-reels.open-billing", qr),
        W().default("desktop-reels.submit-success", Nr),
        W().default("desktop-reels.get-initial-data", Vr);
    },
  };
  function Rr() {
    return {
      hasPro: true,
      freeReels: Math.max(0, 2 - I().model.state.billing.trial.reels),
      maxFreeReels: 2,
      isMobileSession: I().model.state.authStatus.isMobileSession,
    };
  }
  async function qr(e) {
    const t = await d().default(chrome.windows.getLastFocused),
      n = await d().default(chrome.tabs.getSelected, t.id);
    chrome.tabs.create({ url: "https://app.inssist.com", active: !0 }),
      I().transaction((e) => {
        (e.sidebar.isOpen = !0),
          (e.sidebar.selectedTabId = "tab-billing"),
          (e.billing.recentFeature = "desktop-reels");
      }),
      e.value.includes("keep-ig-tab") ||
        (await d().default(chrome.tabs.remove, n.id));
  }
  async function Nr() {
    x().gaController.sendEvent("user", "reels:submit", "desktop"),
      true
        ? x().gaController.sendEvent("user", "pro-paid-usage:reels", "desktop")
        : I().transaction((e) => {
            e.billing.trial.reels += 1;
          });
  }
  function Vr() {
    chrome.cookies.set({
      name: "desktop-reels.initial-data",
      value: JSON.stringify(Rr()),
      url: "https://www.instagram.com",
      path: "/",
      httpOnly: !1,
      secure: !1,
      storeId: "0",
      domain: "instagram.com",
      sameSite: "strict",
      expirationDate: Date.now() + 30 * m().SECOND,
    });
  }
  !(async function () {
    (window._ = a().default), i().polyfillsController.init();
    const e = Se.getVersion();
    console.log(`chrome version is: ${e}`),
      r().logController.init(),
      await pt.init(),
      o().sentryController.init({
        dsn: "https://bea0900834f541bca8157710f7fd31fe@sentry.io/1547551",
      }),
      u().i18nController.init(),
      ke.init(),
      De.init(),
      N().abTestingController.init(),
      kr.init(),
      await D().synchController.init("background", !0),
      Sr.init(),
      de.init(),
      et.init(),
      ht.init(),
      Cr.init(),
      ut.init(),
      Qe.init(),
      Ir.init(),
      Pr.init(),
      ge.init(),
      Mr.init(),
      Hr.init(),
      x().gaController.init().sendPageview().sendInstall(),
      xe.init(),
      await xe.updateUser(),
      ce.init(),
      await ce.updatePro(),
      yr.init(),
      Ar.init(),
      (window._backgroundReady = !0);
  })();
})();
