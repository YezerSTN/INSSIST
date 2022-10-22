!function(){function t(t,e,n){Object.defineProperty(t,e,{get:n,enumerable:!0})}var e={createName:function(t,e){return`${t}|${JSON.stringify(e)}`},getName:n,getParams:function(){return function(t){try{return JSON.parse(t)}catch(t){return null}}(window.self.name.split("|")[1])||{}},isIframe:function(t=null){return window.self!==parent&&(!t||n()===t)}};function n(){return window.self.name.split("|")[0]||null}async function o(t,e=null){let n,o;return"number"==typeof e?(n=e,o=100):e?(n=e.timeout||3e4,o=e.frequency||100):(n=3e4,o=100),new Promise(((e,i)=>{const r=t();if(r)return void e(r);const a=setInterval((()=>{const n=t();n&&(clearInterval(a),e(n))}),o);setTimeout((()=>{clearInterval(a),e(null)}),n)}))}async function i(){await o((()=>document.body))}var r=document.documentElement,a={},s={},c={},l={},d=1;l={nextValue:function(){return(d=(9301*d+49297)%233280)/233280},seed:function(t){d=t}};var u,p,f,h="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-";function g(){f=!1}function m(t){if(t){if(t!==u){if(t.length!==h.length)throw new Error("Custom alphabet for shortid must be "+h.length+" unique characters. You submitted "+t.length+" characters: "+t);var e=t.split("").filter((function(t,e,n){return e!==n.lastIndexOf(t)}));if(e.length)throw new Error("Custom alphabet for shortid must be "+h.length+" unique characters. These characters were not unique: "+e.join(", "));u=t,g()}}else u!==h&&(u=h,g())}function _(){return f||(f=function(){u||m(h);for(var t,e=u.split(""),n=[],o=l.nextValue();e.length>0;)o=l.nextValue(),t=Math.floor(o*e.length),n.push(e.splice(t,1)[0]);return n.join("")}())}c={get:function(){return u||h},characters:function(t){return m(t),u},seed:function(t){l.seed(t),p!==t&&(g(),p=t)},lookup:function(t){return _()[t]},shuffled:_};var y="object"==typeof window&&(window.crypto||window.msCrypto),b=y&&y.getRandomValues?function(t){return y.getRandomValues(new Uint8Array(t))}:function(t){for(var e=[],n=0;n<t;n++)e.push(Math.floor(256*Math.random()));return e},w=function(t,e,n){for(var o=(2<<Math.log(e.length-1)/Math.LN2)-1,i=-~(1.6*o*n/e.length),r="";;)for(var a=t(i),s=i;s--;)if((r+=e[a[s]&o]||"").length===+n)return r};var v,S,T=function(t){for(var e,n=0,o="";!e;)o+=w(b,c.get(),1),e=t<Math.pow(16,n+1),n++;return o};var P=function(t){var e="",n=Math.floor(.001*(Date.now()-1567752802062));return n===S?v++:(v=0,S=n),e+=T(7),e+=T(t),v>0&&(e+=T(v)),e+=T(n)};var E,C=function(t){return!(!t||"string"!=typeof t||t.length<6)&&!new RegExp("[^"+c.get().replace(/[|\\{}()[\]^$+*?.-]/g,"\\$&")+"]").test(t)},O=!1;var M=(O||(O=!0,E={},E=0),E||0);function x(){return P(M)}var I=x;(s=x).generate=I;var A=function(t){return c.seed(t),s};s.seed=A;var L=function(t){return M=t,s};s.worker=L;var D=function(t){return void 0!==t&&c.characters(t),c.shuffled()};s.characters=D;var k=C;function R(t){return Array.isArray(t)?t:[t]}function F(t,e=document){t=R(t);for(const n of t){const t=e.querySelector(n);if(t)return t}return null}function N(t,e=document){t=R(t);const n=[];for(const o of t){const t=e.querySelectorAll(o);for(const e of t)n.includes(e)||n.push(e)}return n}s.isValid=k,a=s;var $={on:function(t,e){j();(q[t]||(q[t]=[])).push(e)},off:function(t,e){const n=q[t];if(!n)return;for(;;){const t=n.findIndex((t=>t===e));if(-1===t)break;n.splice(t,1)}},send:function(t,...e){let n;const o=e[e.length-1];"function"==typeof o?(n=o,e=e.slice(0,-1)):n=null;return new Promise((o=>{chrome.runtime.sendMessage({[H]:t,[U]:e},(t=>{chrome.runtime.lastError||t!==B&&(n&&n(t),o(t))}))}))}};const B="__chromeBus.EMPTY_RESPONSE",q={},H="__chromeBus.name",U="__chromeBus.args";function j(){const t=j;t.init||(t.init=!0,chrome.runtime.onMessage.addListener(((t,e,n)=>{const o=t["__chromeBus.name"];if(!o)return!1;const i=t["__chromeBus.args"]||[],r=q[o]||[];return 0===r.length?(n(B),!0):((async()=>{const t=await Promise.all(r.map((t=>t(...i)))),e=t[t.length-1];n(e)})(),!!n)})))}var G={init:function(){$.on("iframe-bus",((t,...e)=>Q(t,...e))),J("chrome-bus",((t,...e)=>$.send(t,...e)))},on:J,once:K,off:X,send:Q,wait:async function(t){return await new Promise((e=>{K(t,e)}))}};const z="__iframeBus.name",W="__iframeBus.args",V="__iframeBus.callbackId",Y=parent!==window;function J(t,e){const n=Z(t),o=e["__iframeBus.handlers"]||(e["__iframeBus.handlers"]={});o[t]=async o=>{if(o.data["__iframeBus.name"]===n){const n=o.data["__iframeBus.args"]||[],i=o.data["__iframeBus.callbackId"]||null,r=await e(...n);i&&Q(`${t}:response-${i}`,r)}},window.addEventListener("message",o[t])}function K(t,e){J(t,(function n(...o){return X(t,n),e(...o)}))}function X(t,e){const n=e["__iframeBus.handlers"]||(e["__iframeBus.handlers"]={});window.removeEventListener("message",n[t])}async function Q(t,...e){let n;const o=e[e.length-1];"function"==typeof o?(n=o,e=e.slice(0,-1)):n=null;const i=t.includes(":response-"),r=Z(t),s=i?null:a.generate();if(Y?parent.postMessage({[z]:r,[W]:e,[V]:s},"*"):N("iframe").forEach((t=>{t.contentWindow.postMessage({[z]:r,[W]:e,[V]:s},"*")})),!i)return new Promise((e=>{const o=i=>{n&&n(i),X(`${t}:response-${s}`,o),e(i)};J(`${t}:response-${s}`,o)}))}function Z(t){return`iframe-bus.${t}`}function tt(t,...e){let n=0;return t.join("###").split(",").join("\n,\n").split("{").join("\n{").split("\n").map((t=>{if(!t.includes("###"))return t;const o=R(e[n]).map((e=>t.split("###").join(e))).join(",\n");return n+=1,o})).join("\n").split(";").join(" !important;").replace(/!important\s*!important/g,"!important")}function et(...t){const e=tt(...t);document.head.insertAdjacentHTML("afterbegin",e)}var nt=Object.assign((function(t,e=!1){0===ot.length&&(it=new MutationObserver((t=>{for(const e of ot){it.disconnect();try{e(t)}catch(t){console.error("onDocMutations",t)}if(!it)return;it.observe(document.documentElement,{attributes:!0,childList:!0,subtree:!0})}})),it.observe(document.documentElement,{attributes:!0,childList:!0,subtree:!0}));ot.push(t),e&&t()}),{off:function(t){const e=ot.indexOf(t);if(-1===e)return;ot.splice(e,1),0===ot.length&&(it.disconnect(),it=null)}});const ot=[];let it;var rt={getConfig:function t(){const n=t;if(!n.config){const t=e.getParams();n.config=t.fusionConfig}return n.config}};var at=function(){et`
    <style>
      .theme-night .emoji {
        filter: url(#theme-reverse-filter);
      }
      .theme-night .emoji .emoji {
        filter: none;
      }

      .theme-night input,
      .theme-night textarea,
      .theme-night [contenteditable] {
        filter: url(#theme-filter);
        color: #a0a0a0 !important;
        background: transparent !important;
        border-color: rgba(255, 255, 255, 0.3);
      }
      .theme-night input::placeholder,
      .theme-night textarea::placeholder {
        color: rgba(255, 255, 255, 0.33);
      }
    </style>
  `,function(){const t=rt.getConfig().fcsSelectors,e=rt.getConfig().dmSelectors,n=rt.getConfig().igSelectors;nt((function t(e){const n=F("body");if(!n)return;nt.off(t);new MutationObserver(i).observe(n,{childList:!0,subtree:!0}),i(e)}));let o=!1;function i(i){if(o)return;const r=i.map((t=>Array.from(t.addedNodes))).flat();if(0===r.length)return;const a=window.inssist.theme.emojiRegex,s=(F("body").innerText.match(a)||[]).filter((t=>!"0123456789#*↪".includes(t)));if(0===s.length)return;const c=[],l=Array.from(new Set(s)),d=["input","textarea","[contenteditable]",e.general.emojiPicker,n.general.postCaption,t.sidePanel.postPreviewCaption].map((t=>N(t))).flat();r.forEach((t=>{let e;if(e=t.nodeType===Node.ELEMENT_NODE?t:t.parentElement,!e)return;const n=document.createTreeWalker(e,NodeFilter.SHOW_TEXT);for(;;){const t=n.nextNode();if(!t)break;const e=t.textContent;if(!l.some((t=>e.includes(t))))continue;if(d.some((e=>e.contains(t))))continue;const o=t.parentElement;o.classList.contains("emoji")||(c.includes(o)||c.push(o))}})),requestAnimationFrame((()=>{o=!0,c.forEach((t=>{if(!document.body.contains(t))return;let e=t.innerHTML;l.forEach((t=>{const n=`<span class="emoji">${t}</span>`;e=e.split(n).join("__$%#^__").split(t).join(n).split("__$%#^__").join(n)})),t.innerHTML=e})),o=!1}))}}()};var st=function(){!async function(){ct(await G.send("theme.get-theme"))}(),async function(){G.on("theme.switch-theme",(t=>{ct(t)}))}(),at()};function ct(t){t&&(r.classList.remove("theme-day"),r.classList.remove("theme-night"),r.classList.add(`theme-${t}`))}var lt={user:null,igProfilesData:[],crosspostToFb:!1,selectedPostId:null,allPosts:[]},dt={getCaption:function(){const t=ut();if(!t)return null;let e=t.innerText.split("\n\n").join("\n");"\n"===e&&(e="");return e},setCaption:async function t(e,{force:n=!1}={}){const o=t;if(!n){const t=ut();if(!t)return;if(document.activeElement===t)return}if(o.running)return;o.running=!0;const i=window.inssist.schedule.requireModule;o.EditorState||(o.EditorState=await i("EditorState"));o.ContentState||(o.ContentState=await i("ContentState"));o.MetaDataActions||(o.MetaDataActions=await i("MediaManagerInstagramComposerMetaDataActions"));o.getMentionsInputDecorator||(o.getMentionsInputDecorator=await i("getMentionsInputDecorator"));const r=o.ContentState.createFromText(e),a=o.getMentionsInputDecorator(),s=o.EditorState.createWithContent(r,a);o.MetaDataActions.updateCaption(s),o.running=!1;const c=F(rt.getConfig().fcsSelectors.sidePanel.captionScrollContainer);if(!c)return;c.scrollTop=c.scrollHeight}};function ut(){return F(rt.getConfig().fcsSelectors.sidePanel.captionTextarea)||null}function pt(){const t=[];return Object.assign(e,{handle:function(t){if("function"!=typeof t)return void console.error("function is expected");e(t)},clear:function(){t.length=0},off:function(e){const n=t.indexOf(e);-1!==n&&t.splice(n,1)},isEmpty:function(){return 0===t.length}});function e(...e){"function"==typeof e[0]?t.push(e[0]):t.forEach((t=>t(...e)))}}const ft=pt();var ht={init:function(){const t=XMLHttpRequest.prototype.open;XMLHttpRequest.prototype.open=function(e,n){const o=this;n=gt(n);let i=0;const r={},a=new URL(n);Array.from(a.searchParams).forEach((([t,e])=>{r[t]=e}));const s=pt();o.addEventListener("readystatechange",(()=>{o.readyState===XMLHttpRequest.DONE&&s(o)})),ft({url:n,query:r,modifyUrl:t=>{i+=1,i>1&&console.warn("`modifyUrl` was called more than once"),n=gt(t)},onResponse:s}),t.call(o,e,n)}},onRequest:ft.handle};function gt(t){return t.startsWith("http")?t:t.startsWith("/")?`${location.origin}${t}`:(console.error(`invalid url "${t}"`),t)}function mt(){let t;const e=new Promise((e=>{t=e}));return Object.defineProperty(e,"resolve",{get:()=>t}),e}var _t={createError:function({message:t,details:e={}}){return{message:t,details:e,[yt]:!0}},throwError:function({message:t,details:e={}}){throw bt({message:t,details:e,critical:!0}),new Error(t)},sendError:bt,isKnownError:function(t){return t&&t[yt]},getLightweightPageHtml:wt};const yt=Symbol("isScheduleInjectionError");async function bt({message:t,details:e={},critical:n=!1}){let o;try{o=(await fetch("/")).ok}catch(t){o=!1}const i=!!F(rt.getConfig().fcsSelectors.general.pandaErrorImage);G.send("schedule.fcs-error",{message:`schedule injection → ${t}`,critical:n,details:{...e,isNetworkOk:o,isPandaError:i,html:wt()}})}function wt(){const t=F("body > div"),e=document.createElement("div");return e.innerHTML=t.innerHTML.replace(/style="[^"]*"/gi,"").replace(/alt="[^"]*"/gi,""),N('[role="cell"]:nth-child(n + 4)',e).forEach((t=>t.remove())),e.innerHTML}var vt={};const St=1e3,Tt=6e4,Pt=36e5,Et=864e5;t(vt,"MONTH",(function(){return 26784e5})),t(vt,"WEEK",(function(){return 6048e5})),t(vt,"DAY",(function(){return Et})),t(vt,"HOUR",(function(){return Pt})),t(vt,"MINUTE",(function(){return Tt})),t(vt,"SECOND",(function(){return St}));var Ct='<style>\n\n* {\n  outline: none;\n  font-family: montserrat !important;\n}\n\nbody {\n  overflow: hidden;\n}\n\nbody::-webkit-scrollbar {\n  width: 0px;\n}\n\n/* top bar */\n#mediaManagerGlobalChromeBar, /* when connected with fb */\n.uiContextualLayerParent > div > .MediaManagerInstagramRoot > div:first-child /* when connected with ig */ {\n  display: none !important;\n}\n\n/* side panel */\n._6uh1 {\n  top: 0 !important;\n}\n\n/* side panel items under "create post" button */\n._6ug6 {\n  display: none !important;\n}\n\n/* body panel */\n._1l9z {\n  margin-top: 0 !important;\n}\n\n/* user selection dropdown */\n#tabHeader {\n  margin-top: -28px;\n}\n\n'.replace("<style>",""),Ot={init:function(){G.on("schedule.fcs-get-report",xt)},set:function(t,e){Mt[t]=e},log:function(t){Mt.log.push(t);const e="string"==typeof t?t:JSON.stringify(t);console.log(`%c[fcs] %c${e}`,"color: #b99610","color: #b99610; font-weight: bold;")}};const Mt={log:[]};function xt(){return{...Mt,html:_t.getLightweightPageHtml()}}var It={init:async function(){Ot.log("start"),At=rt.getConfig().fcsSelectors;try{await async function(){Ot.log("fallback enabled?");const t=await G.send("schedule.is-fallback-enabled");if(Ot.log(t?"yes":"no"),!t)return;throw et`
    <style>
      ${Ct}
    </style>
  `,Dt}();const{someUserConnected:t}=await async function(){await i();const t=document.documentElement.innerHTML,e=t.toLowerCase();if(!location.href.includes("business.facebook.com/creatorstudio")||!(e.includes("bizsitepage")||e.includes("uicontextuallayerparent")||e.includes("emojiconfig")))return Ot.log("is user connected?"),Ot.log("no (not logged in)"),lt.user=null,{someUserConnected:!0};Ot.log("waiting for ig profiles data...");const n=t.split("<body")[1].split("requireLazy")[0];Ot.log(n);const r=window.inssist.schedule.requireModule,a=await r("MediaManagerInstagramProfilesDataStore",3e4);if(!a){let t;const e=_t.getLightweightPageHtml();throw t=e.includes("/checkpoint/")?"account locked":e.includes("/confirm_code/")?"fb code is required":'<div class="_3b5k" id="bizsitePageContainer"><div class="_6nx4"></div><div id="globalContainer" class="uiContextualLayerParent"><div id="u_0_1"></div></div></div>'===e?"empty html":e.includes('role="progressbar"')?"spinner":"unknown",_t.createError({message:`Unable to require MediaManagerInstagramProfilesDataStore within 30 seconds (${t})`})}Ot.log("ig profiles data received"),Ot.log("is user connected?");if(!await o((()=>{const t=a.getState().toJS();return!!(t&&t[0]&&t[0].value)})))throw _t.createError({message:"MediaManagerInstagramProfilesDataStore loading takes too long"});let s=null;const c=a.getState().toJS()[0].value;if(c.length>0){const t=await G.send("schedule.get-ig-username");s=c.find((e=>e.username===t))||null}return lt.user=s,Ot.log(s?"yes":"no"),{someUserConnected:!0}}();!function(){const t=()=>{const t=F(At.welcome.acceptCookieButton);if(t&&document.body.innerHTML.includes('"_js_datr"')){const e=document.body.innerHTML.split('"_js_datr"')[1].split('"')[1].split('"')[0];document.cookie=`_js_datr=${e}; SameSite=None; Secure`,t.click(),location.reload()}if(!!F(At.general.cookieBannerTitle))return;const e=F(At.welcome.getStartedButton);e&&(e.click(),location.reload());const n=F(At.whatsNew.closeButton);n&&(n.click(),location.reload())};nt(t),setTimeout((()=>{nt.off(t)}),3e4)}();const e=!!lt.user;await G.send("schedule.fcs-connection-status",e,{someUserConnected:t})}catch(t){t===Dt||(_t.isKnownError(t)?_t.sendError({message:t.message,details:t.details,critical:!0}):_t.sendError({message:"startup controller init: unknown error",details:{details:t},critical:!0}))}Ot.log("end"),Lt.resolve()},waitForInit:async function(){return Lt}};let At;const Lt=mt(),Dt=new Error("fallback enabled");let kt;var Rt=kt={init:async function(){await It.waitForInit();try{const t=await async function(){const t=rt.getConfig().fcs,e=await o((()=>window.requireLazy));if(!e)throw _t.createError({message:"initDispatcher: failed to get window.require"});const n=await new Promise((n=>{const o=setTimeout((()=>{n(null)}),15e3);e([t.MediaManagerDispatcher],(t=>{clearTimeout(o),n(t)}))}));if(!n)return null;const i=[],r=n.dispatch;return n.dispatch=(...t)=>{if(t[0])for(const e of i)e(t[0]);return r.call(n,...t)},{dispatch:n.dispatch,onDispatch:t=>{i.push(t)}}}();t&&(kt.dispatch=t.dispatch,kt.onDispatch=t.onDispatch)}catch(t){_t.isKnownError(t)?_t.sendError({message:t.message,details:t.details,critical:!0}):_t.sendError({message:"dispatch controller init: unknown error",details:{jsError:t},critical:!0})}Ft.resolve()},waitForInit:async function(){return Ft},main:{},composer:{}};const Ft=mt();async function Nt(t,...e){return new Promise((n=>{t(...e,n)}))}var $t=Object.assign((function(t,e={}){document.addEventListener("click",t,e)}),{off:function(t,e={}){document.removeEventListener("click",t,e)}});function Bt(t,e){let n;n="function"==typeof e?t.findIndex(e):t.indexOf(e),-1!==n&&t.splice(n,1)}var qt='<style>\n\n* {\n  outline: none;\n}\n\n\n/* user selection option when creating new post */\n._7pqd {\n  opacity: 0;\n}\n\n\n/* page content */\n._1x52,\n#globalContainer {\n  visibility: hidden;\n}\n\n\n/* modal window */\n._59s7 {\n  max-width: calc(100% - 80px) !important;\n}\n\n\n/* edit post left panel */\n._7-i- {\n  padding-top: 0 !important;\n}\n\n\n/* hide content */\n._6uh1 ~ div {\n  visibility: hidden !important;\n}\n\n\n/* notification (e.g. "post saved") */\n._72sn {\n  display: none;\n}\n\n\n/* disable side panel animation */\n._92zt {\n  animation-duration: 0s !important;\n}\n\n\n/* extend table height */\n._rz-,\n.uiScrollableAreaContent > div {\n  height: 4500px !important; }\n\n\n/* disable active panel animation */\n#creator_studio_sliding_tray_root ._6lsf {\n  right: 0 !important; }\n\n\n/* uploading progress */\n._6eqo {\n  cursor: default !important;\n}\n\n/* uploading progress chevron icon */\n._6eqo i:last-child {\n  display: none;\n}\n\n\n/* noinspection CssNoGenericFontName */\n* { font-family: montserrat !important; }\n:root { --geodesic-type-font-family: montserrat !important; }\n:root { --geodesic-type-size-value-font-family: montserrat !important; }\nbody { overflow-x: hidden; }\nbody::-webkit-scrollbar { width: 0px; }\n\n\n/* ! posts panel container */\n#globalContainer > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2),\ndiv._1l9z {\n  margin: 0 !important; z-index: 100; }\n\n\n/*START*/\n/* left navigation panel and\n   top panel header with fb and ig tabs.\n   these are optional if posts container z-index is 100 */\n#mediaManagerGlobalChromeBar,\n._6uh1, /* header with fb and ig tabs */\n.p7k9k0yn.i6vn8ron /* header when authorized with new method */ {\n  display: none !important; }\n\n\n/* post status, time selector and search */\n#mediaManagerFilterAndSearch {\n  display: none; }\n\n\n/* table header with account selector and title */\n#instagramTabHeader {\n  visibility: hidden;\n  position: fixed;\n  left: -100000px; }\n\n\n/* media type tabs */\ndiv._450w {\n  display: none; }\n\n\n/* posts panel content */\ndiv._3wpv {\n  padding: 0px 8px !important; }\n\n\n/* prevent column clipping */\n#mediaManagerContentTable, div._6ynv {\n  min-width: 1070px !important; }\n\n\n/* --- */\n\n\n/* ! posts panel container,\n  only enable this if in post view mode to hide the table underneath */\n/* #globalContainer > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2), div._1l9z {\n     visibility: hidden !important; } */\n\n\n/* ! post details pop-over */\n#creator_studio_sliding_tray_root > div, div._6lsf {\n  max-width: 100% !important;\n  width: 100% !important; }\n\n\n/* pop-over header */\n#creator_studio_sliding_tray_root > div > div > div:nth-child(1) {\n  display: none !important; }\n\n\n/* pop-over frame and performance container */\n#creator_studio_sliding_tray_root > div > div > div:nth-child(2) {\n  overflow: auto !important; }\n\n\n/* pop-over post frame (left sub-panel) */\n#creator_studio_sliding_tray_root > div > div > div:nth-child(2) > div:nth-child(1), div._759f {\n  width: initial !important;\n  min-width: 500px !important;\n  overflow-x: hidden !important;\n  overflow-y: auto !important;\n  padding-left: 24px !important;\n  justify-content: flex-start !important;\n  display: flex !important;\n  flex-direction: column !important;\n  background-color: white !important; }\n#creator_studio_sliding_tray_root > div > div > div:nth-child(2) > div:nth-child(1) > div, div._75fk {\n  box-shadow: none !important;\n  border-radius: 0 !important;\n  background-color: transparent !important;\n  border: none !important; }\n#creator_studio_sliding_tray_root > div > div > div:nth-child(2) > div:nth-child(1) > div > div._3qn7._61-3._2fyi._3qng > span {\n  display: none !important }\n#creator_studio_sliding_tray_root div._74_-._75fl {\n  margin-left: 0 !important; }\n#creator_studio_sliding_tray_root div._75fm {\n  padding-left: 0 !important; }\n#creator_studio_sliding_tray_root > div > div > div:nth-child(2) > div:nth-child(1) > div > div._8525 {\n  max-width: 500px !important }\n\n\n/* pop-over post performance (right sub-panel) */\n#creator_studio_sliding_tray_root > div > div > div:nth-child(2) > div:nth-child(2), div._759g {\n  min-width: 300px;\n  border: none !important;\n  background-color: white !important;\n  min-height: unset !important; }\n\n\n/* pop-over post performance title */\n#creator_studio_sliding_tray_root > div > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(1), div._759g > div:nth-child(1) {\n  border-top: none !important;\n  border-bottom: none !important; }\n\n\n/* pop-over post performance content */\n#creator_studio_sliding_tray_root > div > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(2), div._759g > div:nth-child(2) {\n  border-top: none !important;\n  border-bottom: none !important;\n  margin-top: 0 !important; }\n\n\n/* pop-over post performance tray */\n#creator_studio_sliding_tray_root ._6qig {\n  height: 76px !important;\n  box-sizing: border-box;\n  padding: 0 24px !important; }\n/* #creator_studio_sliding_tray_root > div > div > div:nth-child(3) > button:nth-child(1), div._6qig > button:nth-child(1) {\n     margin-left: 16px !important; } */\n\n\n/* tray buttons */\ndiv.uiOverlayFooter a[action=\'cancel\'],\ndiv.uiOverlayFooter button[action=\'confirm\'],\n#creator_studio_sliding_tray_root button[type="button"] {\n  cursor: pointer !important;\n  font-weight: 600 !important;\n  /* Please make sure to apply a special xpath attribute rule for disabled buttons.\n     Facebook disables some buttons such GO TO POST button on an archived story.\n     Such buttons are styled inline and have a special style \'color: rgb(190, 195, 201)\'.\n     Clicking these buttons does nothing, so an attribute based xpath expression should\n     watch and hide them all-together. */\n  /* color: white !important;\n     background-color: #1BA2F9 !important; */\n  border: none !important;\n  font-size: 16px !important;\n  border-radius: 4px;\n  text-transform: uppercase !important;\n  margin-left: 8px;\n  margin-right: 8px;\n  color: white !important;\n  background-color: #1BA2F9 !important;\n  transition: 300ms cubic-bezier(0.23, 1, 0.32, 1) 0s; }\ndiv.uiOverlayFooter a[action=\'cancel\'][style*="background-color: rgb(176, 213, 255)"],\ndiv.uiOverlayFooter button[action=\'confirm\'][style*="background-color: rgb(176, 213, 255)"],\n#creator_studio_sliding_tray_root button[type="button"][style*="background-color: rgb(176, 213, 255)"] {\n  opacity: 0.5 !important;\n  pointer-events: none;\n}\n\n#creator_studio_sliding_tray_root button[type="button"]:hover {\n  filter: brightness(95%); }\n#creator_studio_sliding_tray_root button[type="button"]:active {\n  filter: brightness(90%); }\n\n\n/* --- */\n\n\n/* post cover image title */\ndiv._7-i2 > span {\n  display: none !important; }\ndiv._7-i2 > div {\n  margin-top: 0 !important; }\n\n\n/* post caption input */\ndiv._7-2a._5yk1 {\n  overflow: auto !important; }\n\n\n/* --- */\n\n\n/* add content mini popup */\ndiv.uiContextualLayer.uiContextualLayerBelowLeft > div > div > div > div {\n  padding-bottom: 12px !important; }\ndiv.uiContextualLayer.uiContextualLayerBelowLeft > div > div > div > a {\n  display: none !important; }\n\n'.replace("<style>",""),Ht={init:async function(){Ut=rt.getConfig().fcsSelectors,await Rt.waitForInit(),nt((()=>{lt.selectedPostId&&F(Ut.sidePanel.captionTextarea)&&setTimeout((()=>{const t=dt.getCaption();jt[lt.selectedPostId]=t}))})),G.on("schedule.set-caption",Gt)},restoreCaptionForCurrentPost:async function(){if(!lt.selectedPostId)return;const t=jt[lt.selectedPostId];if(t)return void Gt(t);const e=await G.send("schedule.get-post",lt.selectedPostId);"local"===e.source&&e.caption&&Gt(e.caption)}};let Ut;const jt={};function Gt(t,{force:e=!1}={}){"string"==typeof t&&dt.setCaption(t,{force:e})}function zt(t,e){return Wt(e)||(e=JSON.stringify(e)),`${encodeURIComponent(t)}=${encodeURIComponent(e)}`}function Wt(t){return"string"==typeof t||"number"==typeof t||"boolean"==typeof t}function Vt(t,e={}){const n=function(t){return Object.keys(t).map((e=>{const n=t[e];return Wt(n)?zt(e,n):Array.isArray(n)?n.map((t=>zt(e,t))).join("&"):null})).filter(Boolean).join("&").replace(/%5B/g,"[").replace(/%5D/g,"]")}(e);return n?`${t}?${n}`:t}var Yt={init:async function(){if(Jt=rt.getConfig().fcsSelectors,Kt=rt.getConfig().fcs,ae(),se(),G.on("schedule.fcs-go-to",Xt),G.on("schedule.fcs-open-post",Qt),G.on("schedule.fcs-open-new-post-form",Zt),G.on("schedule.fcs-refresh-data",re),G.on("schedule.fcs-refresh-page",te),G.on("schedule.fcs-check-critical-vars",ee),G.on("schedule.fcs-wait-upload",ne),G.on("schedule.fcs-submit-composer",oe),await It.waitForInit(),await Rt.waitForInit(),!lt.user)return;await async function(){if(await G.send("schedule.is-debug-enabled"))return;et`
    <style>
      ${qt}

      ${Jt.sidePanel.mediaPreviewControls} {
        height: auto !important;
      }

      ${Jt.sidePanel.save} {
        max-width: none;
      }

      ${Jt.sidePanel.loadingOverlay} {
        background: #FFF !important;
      }
      .theme-night ${Jt.sidePanel.loadingOverlay} {
        background: #D4D5D9 !important;
      }

      ${Jt.sidePanel.postPerformancePane} {
        background: transparent;
      }

      .MediaManagerInstagramPostPreview {
        width: 100%;
      }

      html.is-igtv ${Jt.sidePanel.editPostButton} {
        display: none;
      }
    </style>
  `}(),et`
    <style>
      ::-webkit-scrollbar {
        display: none;
      }
    </style>
  `,et`
    <style>
      /* dark background on panels */
      .theme-night #creator_studio_sliding_tray_root ._6lsf,
      .theme-night #creator_studio_sliding_tray_root > div > div > div:nth-child(2) > div:nth-child(1), div._759f,
      .theme-night #creator_studio_sliding_tray_root > div > div > div:nth-child(2) > div:nth-child(1) > div, div._75fk,
      .theme-night #creator_studio_sliding_tray_root > div > div > div:nth-child(2) > div:nth-child(2), div._759g {
        background-color: #d4d5d9 !important;
      }
      /* extra padding for the side panel content */
      .theme-night #creator_studio_sliding_tray_root ._6lsf {
        padding-top: 10px !important;
      }
      /* dark background on input and textarea elements */
      .theme-night ._8525 ._7-2a,
      .theme-night ._36g4 {
        background-color: #f2f3f5 !important;
      }
      /* white color on buttons */
      .theme-night div.uiOverlayFooter a[action='cancel'],
      .theme-night div.uiOverlayFooter button[action='confirm'],
      .theme-night #creator_studio_sliding_tray_root button[type="button"] {
        color: black !important;
      }
      /* white color on schedule dropdown button and carousel paginators */
      .theme-night div._8122 > button > div > i,
      .theme-night div._80qf[role="button"] > i,
      .theme-night div._80qi[role="button"] > i,
      .theme-night a._50z2[role="button"],
      .theme-night a._50z1[role="button"] {
        -webkit-filter: url(#theme-reverse-filter) !important;
        filter: url(#theme-reverse-filter) !important;
      }
      /* modal window background */
      .theme-night .ModalLayout {
        filter: url(#theme-reverse-filter);
        background: #000;
      }


      .theme-night ${Jt.sidePanel.postPreviewCaption} {
        filter: url(#theme-reverse-filter);
      }
      .theme-night ${Jt.sidePanel.postPreviewCaption},
      .theme-night ${Jt.sidePanel.postPreviewCaption} * {
        color: #D4D7D9 !important;
      }
      .theme-night ${Jt.sidePanel.postPreviewCaption} a {
        color: #728FC9 !important;
      }

      .theme-night ${Jt.sidePanel.mediaPreviewContainer} {
        background: #FFF;
      }

      .theme-night ${Jt.sidePanel.mediaPreviewControls} {
        filter: url(#theme-reverse-filter);
      }
    </style>
  `,et`
    <style>
      ${Jt.sidePanel.locationRoot} {
        user-select: none;
        cursor: pointer;
        width: 502px;
      }
    </style>
  `,$t((t=>{if(!t.target.closest(Jt.sidePanel.locationRoot))return;const e=F(Jt.sidePanel.locationInput);e?e.focus():_t.sendError({message:"upgradeAddLocationButton: failed to find location input"})})),et`
    <style>
      ${Jt.sidePanel.goToPostButton} {
        font-size: 16px !important;
        font-weight: 600;
        text-transform: uppercase;
      }
      ${Jt.sidePanel.goToPostButton} * {
        font-family: inherit !important;
      }

      ${Jt.sidePanel.doneButton} {
        display: none;
      }

      ${Jt.sidePanel.editPostButton} {
        max-width: none !important;
      }
    </style>
  `,nt((()=>{N(Jt.confirmDialog.yes).forEach((t=>{t.click()}))})),nt((()=>{N(Jt.tooltip.bubble).forEach((t=>{const e=t.closest(Jt.tooltip.root);if(!e)return;const n=t.closest(Jt.tooltip.bubbleWrap);if(!n)return;const o=F(`#${e.dataset.ownerid}`);if(!o)return;const i=o.getBoundingClientRect();if(i.left<150&&n.classList.contains("uiContextualLayerLeft")){n.classList.remove("uiContextualLayerLeft"),n.classList.add("uiContextualLayerRight"),n.style.left=0,n.style.right=null,e.style.left=`${i.left+i.width}px`,e.style.right=null;const o=t.offsetWidth,r=t.offsetHeight;if(o>r)return;t.style.width=`${Math.round(.75*r)}px`}}))})),async function(){const t=window.inssist.schedule.requireModule,e=await t(Kt.MediaManagerDispatcher),n=e.dispatch;e.dispatch=(...t)=>{const o=t[0];if(o.type!==Kt.CLOSE_COMPOSER||o.fromInssist)return n.call(e,...t)}}(),ht.onRequest((({xhr:t,url:e,query:n,modifyUrl:o})=>{if(!e.includes(Kt["/media_manager/content_library"])&&!e.includes(Kt["/media_manager/media_manager_instagram_content"]))return;const i=new URL(e),r=n[Kt.post_type];r===Kt.POST_TYPE_IGTV?(i.searchParams.set(Kt.post_status,Kt.POST_STATUS_DRAFT),i.searchParams.set(Kt.limit,1),o(i.toString())):r===Kt.POST_TYPE_VIDEOS?(i.searchParams.set(Kt.post_type,Kt.POST_TYPE_ALL),i.searchParams.set(Kt.post_status,Kt.POST_STATUS_PUBLISHED),i.searchParams.set(Kt.limit,100),o(i.toString())):r===Kt.POST_TYPE_PHOTOS?(i.searchParams.set(Kt.post_type,Kt.POST_TYPE_ALL),i.searchParams.set(Kt.post_status,Kt.POST_STATUS_SCHEDULED),i.searchParams.set(Kt.limit,500),o(i.toString())):r===Kt.POST_TYPE_CAROUSELS&&(i.searchParams.set(Kt.post_type,Kt.POST_TYPE_ALL),i.searchParams.set(Kt.post_status,Kt.POST_STATUS_DRAFT),i.searchParams.set(Kt.limit,500),o(i.toString()))})),await async function(t){const e=window.inssist.schedule.requireModule,n=await e(Kt.immutable);Rt.dispatch({type:Kt.SELECT_IG_PROFILES,[Kt.selectedProfileIDs]:n.List([t.id])})}(lt.user),ce(),Rt.onDispatch((t=>{t.type===Kt.TOGGLE_CROSSPOST_TO_FACEBOOK_CHECKBOX&&(lt.crosspostToFb=t.value)})),Rt.onDispatch((t=>{t.type===Kt.CONTENT_TABLE_REFRESH_ROWS_FINISHED&&Object.values(t[Kt.rowsByIDs]).forEach((t=>{Bt(lt.allPosts,(e=>e.id===t.id)),lt.allPosts.push(t)}))})),Rt.onDispatch((t=>{if(t.type!==Kt.PUSH_NOTIFICATION)return;if(!(Kt.isSuccess in t[Kt.notificationData]))return;if(t[Kt.notificationData][Kt.isSuccess])return;const e=t[Kt.notificationData][Kt.notificationDataLabel].toString();G.send("schedule.fcs-notification-error-appeared",{postId:lt.selectedPostId,errorText:e})})),function(){const t=Symbol("handled");nt((()=>{const e=F(Jt.sidePanel.editPostBottomRow);e&&(e[t]||lt.selectedPostId&&(e[t]=!0,e.insertAdjacentHTML("afterbegin",'\n      <button class="delete-post-button">\n        <svg class="delete-post-button__icon" width="14" height="14" viewBox="0 0 14 14">\n          <path fill="none" d="M0 0h14v14H0z"/>\n          <path d="M3.099 14a.74.74 0 0 1-.779-.652L1.8 3.772h9.874l-.52 9.576a.74.74 0 0 1-.779.652zM.965 2.824V1.287A.489.489 0 0 1 1.454.8h3.357V.163A.163.163 0 0 1 4.974 0H8.5a.163.163 0 0 1 .165.163V.8h3.357a.489.489 0 0 1 .489.489v1.535z" fill="currentColor"/>\n        </svg>\n        <span class="delete-post-button__label">\n          DELETE POST\n        </span>\n      </button>\n    ')))})),$t((t=>{t.target.closest(".delete-post-button")&&G.send("schedule.delete-post",lt.selectedPostId)})),et`
    <style>
      .delete-post-button {
        height: 36px;
        line-height: 34px;
        font-size: 16px;
        color: #E34E21;
        background: #F5F5F5;
        font-weight: 600;
        padding: 0 22px;
        border-radius: 5px;
        cursor: pointer;
        border: 1px solid #EFEFEF;
        transition: filter 0.3s;
        white-space: nowrap;
      }
      .delete-post-button:hover {
        filter: brightness(95%);
      }
      .delete-post-button:active {
        filter: brightness(90%);
      }

      /* show uploading progress near delete post button */
      .delete-post-button + *:not(:last-child) {
        margin-right: auto;
        margin-left: 24px;
      }

      .delete-post-button__icon {
        margin-right: 4px;
        position: relative;
        top: 1px;
      }
    </style>
  `}(),function(){const t=Symbol("handled");nt((()=>{const e=F(Jt.general.headerMessageIconContainer);if(!e)return;if(e[t])return;e[t]=!0;e.parentElement.style.display="none"}))}(),re()}};let Jt,Kt;function Xt(t){location.href=t}async function Qt(t,{isIgtv:e=!1}={}){document.documentElement.classList.toggle("is-igtv",e);const n=window.inssist.schedule.requireModule,o=await n(Kt.queryIGMediaData),i=await n(Kt.MediaManagerInstagramContentActions);await ie(),lt.selectedPostId=t;const r=await Nt(o,t);"POSTED"===r.postStatus?(i.setShouldShowPostDetailTray(!0,r),Ht.restoreCaptionForCurrentPost()):(await ce(),i.editPost(r),Ht.restoreCaptionForCurrentPost())}async function Zt({postMode:t="publish",localPostId:e=null,localPostFiles:n=[]}){const o=Zt;document.documentElement.classList.toggle("is-igtv",!1),lt.crosspostToFb=!1,lt.selectedPostId=e||null,await ie();const i=window.inssist.schedule.requireModule;await ce();(await i(Kt.MediaManagerInstagramComposerRootActions)).openComposer(Kt.IG_FEED_ORGANIC),Rt.dispatch({type:Kt.SELECT_INSTAGRAM_ACCOUNT,instagramAccount:lt.user}),Rt.dispatch({type:Kt.SWITCH_POST_MODE,[Kt.isEditComposer]:!1,[Kt.postMode]:t}),Ht.restoreCaptionForCurrentPost(),0!==n.length&&(clearTimeout(o.timeout),o.timeout=setTimeout((()=>{Rt.dispatch({type:Kt.FILES_ADDED,[Kt.files]:n})}),200))}function te(){location.href=Vt("https://business.facebook.com/creatorstudio",{tab:"instagram_content_posts",mode:"instagram",collection_id:"all_pages",content_table:"INSTAGRAM_POSTS",locale:"en_US"})}async function ee(){return!!window.require}async function ne(){const t=window.inssist.schedule.requireModule,e=await t(Kt.MediaManagerInstagramComposerUploadStore);return await new Promise((t=>{const n=setInterval((()=>{const o=e.getState().toJS(),i=o.isUploadFailed,r=o.isUploadFinished;i?(clearInterval(n),t(!1)):r&&(clearInterval(n),t(!0))}),500)}))}function oe(){Rt.dispatch({type:"PUBLISH_MEDIA"})}async function ie(){const t=window.inssist.schedule.requireModule;(await t(Kt.MediaManagerInstagramContentActions)).setShouldShowPostDetailTray(!1),Rt.dispatch({type:Kt.SHOW_EXIT_COMPOSER_CONFIRM_DIALOG}),Rt.dispatch({type:Kt.CLOSE_COMPOSER,fromInssist:!0})}function re(){const t=re;t.init||(t.init=!0,t.lastPostCount=0,Rt.onDispatch((e=>{if(t.refreshing&&e.type===Kt.SET_CONTENT_LIBRARY_DATA){const n=e.queryParameters.toJS().postType;if(!(n===Kt.POST_TYPE_IGTV||n===Kt.POST_TYPE_VIDEOS||n===Kt.POST_TYPE_PHOTOS||n===Kt.POST_TYPE_CAROUSELS))return;if(n===Kt.POST_TYPE_IGTV)return void Rt.dispatch({type:Kt.SELECT_CONTENT_TABLE,contentTable:Kt.INSTAGRAM_VIDEO_POSTS,source:Kt.instagram_content_library_posts});n===Kt.POST_TYPE_VIDEOS&&Rt.dispatch({type:Kt.SELECT_CONTENT_TABLE,contentTable:Kt.INSTAGRAM_PHOTO_POSTS,source:Kt.instagram_content_library_posts}),n===Kt.POST_TYPE_PHOTOS&&Rt.dispatch({type:Kt.SELECT_CONTENT_TABLE,contentTable:Kt.INSTAGRAM_CAROUSEL_POSTS,source:Kt.instagram_content_library_posts});const o=e.data.data.toJS();for(const t of o)Bt(lt.allPosts,(e=>e.id===t.id)),lt.allPosts.push(t);if(n===Kt.POST_TYPE_CAROUSELS){if(t.lastPostCount-lt.allPosts.length>3)return t.lastPostCount=0,t.refreshing=!1,void re();t.lastPostCount=lt.allPosts.length,G.send("schedule.apply-fcs-posts",lt.allPosts),t.refreshing=!1}}}))),t.refreshing||(lt.allPosts.length=[],t.refreshing=!0,Rt.dispatch({type:Kt.SELECT_CONTENT_TABLE,contentTable:Kt.INSTAGRAM_IGTV_POSTS,source:Kt.instagram_content_library_posts}),Rt.dispatch({type:Kt.REFRESH_TAB,tab:Kt.instagram_content_posts}))}function ae(){nt((()=>{N("video").forEach((t=>{t.hasAttribute("autoplay")&&(t.pause(),t.removeAttribute("autoplay"))}))}),!0)}function se(){history.pushState=history.replaceState}async function ce(){const t=window.inssist.schedule.requireModule,e=await t(Kt.MediaManagerLazyLoadActions);await Nt(e.lazyLoadSection,Kt.INSTAGRAM_COMPOSER)}var le={init:async function(){if(await It.waitForInit(),await Rt.waitForInit(),!lt.user)return;de=rt.getConfig().fcsSelectors,ue=rt.getConfig().fcs,$t((t=>{t.target.closest(de.upload.root)&&(t.target.closest("input")||t.target.closest("button")||pe(F(de.upload.button)))})),et`
    <style>
      ${de.upload.root} {
        border-radius: 7px;
        user-select: none;
        cursor: pointer;
      }
      ${de.upload.buttonWrap} {
        display: none;
      }
    </style>
  `,function(){const t=Symbol("handled");nt((()=>{const e=F(de.upload.addContentButton);if(!e)return;const n=F(de.sidePanel.mediaList);if(!n)return;const o=F(".add-media");o&&(o.style.display=n.childElementCount<10?null:"none"),n[t]||0!==n.childElementCount&&(n[t]=!0,n.insertAdjacentHTML("afterend",'\n      <div></div>\n      <button class="add-media" type="button">\n        <div class="add-media__icon">+</div>\n        ADD CONTENT\n      </button>\n    '),F(".add-media").addEventListener("click",(()=>{pe(e)})))})),et`
    <style>
      ${de.upload.addContentButtonWrap} {
        visibility: hidden;
        position: fixed;
        left: -10000px;
      }

      .add-media {
        display: flex;
        align-items: center;
        height: 36px;
        padding: 0 20px;
        color: #FFF;
        background: #A5AAAF;
        margin-top: 12px;
        margin-left: 0 !important;
        margin-right: 16px !important;
        float: left;
      }

      .add-media__icon {
        font-size: 25px;
        margin-right: 8px;
      }
    </style>
  `}(),et`
    <style>
      ${de.sidePanel.coverSelectionRadioBox} {
        position: relative;
        top: 2px;
      }
    </style>
  `,nt((()=>{N(de.sidePanel.uploadingVideo).forEach((t=>{t.controls=!0}))})),et`
    <style>
      ${de.sidePanel.uploadingVideoPlayButton} {
        display: none !important;
      }

      ${de.sidePanel.uploadingVideoCustomControls} {
        display: none !important;
      }
    </style>
  `,function(){const t=Symbol("handled");nt((()=>{N(de.sidePanel.mediaPreviewVideo).forEach((e=>{e[t]||(e[t]=!0,e.setAttribute("disablePictureInPicture",""),e.setAttribute("controlslist","nodownload"))}))})),et`
    <style>
      ${de.sidePanel.mediaPreviewVideo}::-webkit-media-controls-fullscreen-button {
        display: none;
      }
    </style>
  `}(),function(){const t=Symbol("handled");nt((()=>{const e=F(".add-media");if(!e)return;const n=F(de.sidePanel.mediaList);if(!n)return;const o=F(".reverse-media-list-button");if(o&&(o.style.display=n.childElementCount>1?null:"none"),e[t])return;e[t]=!0,e.insertAdjacentHTML("afterend",'\n      <button class="reverse-media-list-button" type="button">\n        <span class="reverse-media-list-button__icon">↪︎</span>\n        REVERSE\n      </button>\n    ');F(".reverse-media-list-button").addEventListener("click",(async()=>{try{const t=window.inssist.schedule.requireModule,e=(await t(ue.MediaManagerInstagramComposerUploadStore)).getState().toObject().fileMap.toObject(),n=Object.keys(e);if(n.length<2)return;n.forEach(((t,e)=>{Rt.dispatch({type:ue.SUBMIT_MEDIA_ORDER,[ue.mediaOrderId]:t,[ue.prevIndex]:0,[ue.newIndexString]:String(n.length-e),[ue.totalMedia]:n.length})}))}catch(t){console.error("schedule injection media controller →","addReverseMediaButton",t)}}))})),et`
    <style>
      #creator_studio_sliding_tray_root button[type="button"].reverse-media-list-button {
        display: flex;
        align-items: center;
        height: 36px;
        padding: 0 20px;
        color: #1BA2F9 !important;
        background: #F5F5F5 !important;
        border: 1px solid #EFEFEF !important;
        margin-top: 12px;
        margin-left: 0;
        float: left;
      }

      .reverse-media-list-button__icon {
        position: relative;
        top: 3px;
        font-size: 17px;
        margin-right: 8px;
      }
    </style>
  `}(),async function(){const t=window.inssist.schedule.requireModule,e=await t(ue.ImageExifRotation);if(!e)return;e.getRotation=(t,e)=>(e&&"function"==typeof e&&e(0),0)}()}};let de,ue;function pe(t){t||_t.throwError({message:"startUpload: failed to find upload button"}),t.click();const e=F(de.upload.input);e||_t.throwError({message:"startUpload: failed to find upload input"});const n=e.closest(de.tooltip.root);n||_t.throwError({message:"startUpload: failed to find upload tooltip"}),n.style.opacity=0,n.style.pointerEvents="none",e.click()}var fe={init:async function(){he=rt.getConfig().fcsSelectors,G.on("schedule.connect-via-fb",ge),G.on("schedule.connect-via-ig",me)}};let he;async function ge(){if(await Rt.waitForInit(),!Rt.dispatch)return{error:"failed-to-init-dispatcher"};const t=await o((()=>F(".MediaManagerInstagramContentPostsTabContainer")||F('[role="tab"][aria-selected="true"]')?"content":F(".MediaManagerInstagramOnboardingScreen")?"welcome":null));if(!t)return{error:"failed-to-detect-page-type"};"content"===t&&(Rt.dispatch({type:"SELECT_TAB",tab:"instagram_accounts",source:"left_nav"}),await o((()=>location.href.includes("instagram_accounts"))),await o((()=>F(".MediaManagerInstagramTabHeaderContainer")))),Rt.dispatch({type:"SET_SHOW_INSTAGRAM_ONBOARDING_DIALOG",shown:!0}),await o((()=>F(".MediaManagerInstagramAccountPermissionMessageDialog")));const e=await new Promise((t=>{let e;const n=window.open;window.open=(i,r,a)=>{if(!i.includes("/oauth/authorize/"))return n(i,r,a);(async()=>{a=_e();const s=n(i,r,a);window.open=n,await o((()=>s.closed)),e=setTimeout((()=>{t({error:"auth-window-closed-by-user"})}),5e3)})()};const i=window.require("ReloadPage"),r=i.now;i.now=()=>{clearTimeout(e),i.now=r,t({success:!0})},Rt.onDispatch((n=>{clearTimeout(e),"SET_LOGIN_INSTAGRAM_ACCOUNT_SUCCESS"===n.type&&t({error:"not-connected-to-fb-page"})})),Rt.dispatch({type:"AUTHENTICATE_INSTAGRAM_USER"})}));return Rt.dispatch({type:"SELECT_TAB",tab:"instagram_content",source:"left_nav"}),await o((()=>location.href.includes("instagram_content"))),e}async function me(){if(await Rt.waitForInit(),!Rt.dispatch)return{error:"failed-to-init-dispatcher"};if(F(he.general.fbLoginRequiredContainer))return{error:"failed-to-skip-fb-login"};return await new Promise((t=>{let e;const n=window.open;window.open=(i,r,a)=>{if(!(i=i.toString()).includes("/oauth/authorize/"))return n(i,r,a);(async()=>{a=_e();const s=n(i,r,a);window.open=n,await o((()=>s.closed)),e=setTimeout((()=>{t({error:"auth-window-closed-by-user"})}),5e3)})()};const i=window.require("URI"),r=i.goURIOnWindow;i.goURIOnWindow=(...n)=>{clearTimeout(e),i.goURIOnWindow=r,t({success:!0})},Rt.dispatch({type:"IG_AUTHENTICATION_LOG_IN"})}))}function _e(){return`scrollbars,top=${Math.round(screen.height/2-350)},left=${Math.round(screen.width/2-300)},width=600,height=700`}var ye={init:async function(){if(be=rt.getConfig().fcsSelectors,we=rt.getConfig().fcs,await It.waitForInit(),await Rt.waitForInit(),!lt.user)return;(function(){let t,e;nt((()=>{t=N(be.sidePanel.mediaPreview),e=F(be.sidePanel.mediaPreviewVideo)})),ht.onRequest((({url:n,onResponse:o})=>{if(!function(t){return t.includes(we["/media/manager/instagram_composer/create_post"])}(n))return;let i,r;i=t.length>1?"carousel":e?"video":"photo",t.length>0?r=t[0].getAttribute("src"):console.error("failed to find media preview image"),G.send("schedule.fcs-create-post-request",{type:i,image:r,crosspostToFb:lt.crosspostToFb,localPostId:lt.selectedPostId||null}),o((()=>{G.send("schedule.fcs-create-post-response",{image:r})}))})),ht.onRequest((({url:t,query:e,onResponse:n})=>{if(!function(t){return t.includes(we["/media/manager/instagram_media/edit/save"])}(t))return;const o=lt.selectedPostId;let i,r;"true"===e[we["edit_data[save_as_draft]"]]?(i=null,r="draft"):"true"===e[we["edit_data[save_as_scheduled]"]]?(i=ve,r="scheduled"):(i=null,r="posted"),G.send("schedule.fcs-edit-post-request",{postId:o,status:r,on:i}),n((t=>{G.send("schedule.fcs-edit-post-response",{postId:o,status:r})}))}))})(),function(){const t=we.MIN_MINUTES_FROM_NOW;et`
    <style>
      ${be.dateDialog.root} {
        position: fixed;
        left: 10000px;
      }
    </style>
  `;let e=!1;nt((()=>{const t=F(be.dateDialog.rootOpen);(!e&&t||e&&!t)&&(e=!e,G.send("schedule.fcs-date-dialog-toggled",e))}));const n=Symbol("handled");nt((()=>{const e=F(be.sidePanel.save);e&&(e[n]||e.nextElementSibling&&(e[n]=!0,e.addEventListener("click",(e=>{const n=Date.now()+t*Tt;"schedule"===Se&&(!ve||ve<n)&&(e.preventDefault(),e.stopPropagation(),G.send("schedule.fcs-date-dialog-invalid-time"))}),!0)))}))}(),async function(){const t=async()=>await G.send("schedule.has-pro"),e=Symbol("handled");nt((()=>{const n=F(be.sidePanel.save);if(!n)return;if(n[e])return;n[e]=!0;let o=!0;n.addEventListener("click",(e=>{o?(e.preventDefault(),e.stopPropagation(),(async()=>{if(await t())return o=!1,void n.click();const e=F(be.sidePanel.dateDialogTrigger);e&&e.click(),G.send("schedule.show-upsell")})()):o=!0}),!0)}))}(),G.on("schedule.fcs-date-dialog-get-timezone",Te),G.on("schedule.fcs-date-dialog-select-option",Pe),G.on("schedule.fcs-date-dialog-set-selected-option",Ee),G.on("schedule.fcs-date-dialog-set-publish-time",Ce)}};let be,we,ve=null,Se=null;function Te(){const t=window.require(we.DateTime).localNow().getTimezoneID();return window.require(we.TimezoneNamesData).zoneNames[t]}function Pe(t){const e={"publish-now":we.postModePublish,"save-as-draft":we.postModeDraft,schedule:we.postModeSchedule}[t],n={type:we.SWITCH_POST_MODE,[we.postMode]:e};Rt.dispatch({...n,[we.isEditComposer]:!1}),Rt.dispatch({...n,[we.isEditComposer]:!0})}function Ee(t){Se=t}function Ce(t){if(ve=t,!ve)return;const e={type:we.SELECT_SCHEDULED_DATE,[we.scheduledDate]:new Date(ve)};Rt.dispatch({...e,[we.isEditComposer]:!1}),Rt.dispatch({...e,[we.isEditComposer]:!0})}var Oe={init:async function(){if(await It.waitForInit(),await Rt.waitForInit(),!lt.user)return;Me=rt.getConfig().fcsSelectors,xe=rt.getConfig().fcs,et`
    <style>
      ${Me.postToFb.root} {
        display: none;
      }
    </style>
  `;const t=lt.user.connectedPageInfo;if(!t)return;t.url=`https://facebook.com/${t.name}-${t.id}`;t.name.toLowerCase().startsWith("inssist:")||(function(t){const e=Symbol("handled");nt((()=>{const t=F(Me.postToFb.checkboxRow);if(!t)return;const e=!!F(Me.sidePanel.mediaList);t.style.opacity=e?null:.5}),!0),nt((()=>{const n=F(Me.postToFb.title);n&&!n[e]&&(n[e]=!0,n.innerText="Clone to Facebook");const o=F(Me.postToFb.body);o&&!o[e]&&(o[e]=!0,o.innerHTML=`\n        <div class="post-to-fb__text">\n          Post will be cloned to Facebook Page. Facebook posts\n          can be managed separately from the\n          <a\n            class="post-to-fb__link"\n            href="${t.url}/publishing_tools"\n            target="_blank">\n            Facebook Publishing Tools</a>.\n        </div>\n      `)}),!0),nt((()=>{const t=F(Me.postToFb.checkboxRow);if(!t)return;if(t[e])return;t[e]=!0;const n=F(Me.postToFb.checkboxButton);n&&t.addEventListener("click",(t=>{t.target.closest(Me.postToFb.checkboxButton)||n.click()}))})),et`
    <style>
      html ${Me.postToFb.root} {
        display: block;
        margin-top: 40px;
        padding-bottom: 80px;
      }

      html ${Me.postToFb.publishTypeButton} {
        display: none;
      }

      ${Me.postToFb.checkboxRow} {
        margin-top: 10px;
        margin-left: -7px;
        cursor: pointer;
        user-select: none;
      }

      ${Me.postToFb.checkboxButton} {
        background: transparent !important;
        border: 1px solid #DADDE1 !important;
      }
      .theme-night ${Me.postToFb.checkboxButton} {
        border-color: #464646 !important;
      }

      ${Me.postToFb.checkboxText} {
        pointer-events: none;
      }

      ${Me.postToFb.body} {
        margin-top: 10px;
        margin-left: 0;
      }

      .post-to-fb__text {
        line-height: 19px;
        width: 380px;
      }

      .post-to-fb__link {
        color: #1BA2F9;
        text-decoration: none !important;
      }
    </style>
  `}(t),function(){let t,e;G.on("schedule.fcs-date-dialog-set-selected-option",(e=>{t=e,n()})),G.on("schedule.fcs-date-dialog-set-publish-time",(t=>{e=t,n()})),Rt.onDispatch((t=>{t.type===xe.TOGGLE_CROSSPOST_TO_FACEBOOK_CHECKBOX&&n()}));const n=()=>{"save-as-draft"===t?Rt.dispatch({type:xe.SWITCH_CROSSPOST_POST_MODE,[xe.postMode]:xe.postModeDraft}):"publish-now"===t?Rt.dispatch({type:xe.SWITCH_CROSSPOST_POST_MODE,[xe.postMode]:xe.postModePublish}):"schedule"===t&&(Rt.dispatch({type:xe.SWITCH_CROSSPOST_POST_MODE,[xe.postMode]:xe.postModeSchedule}),e&&Rt.dispatch({type:xe.SELECT_CROSSPOST_SCHEDULED_DATE,[xe.scheduledDate]:new Date(e)}))}}(),function(t){const e=Symbol("handled");nt((async()=>{const n=F(".delete-post-button");if(!n)return;if(n[e])return;n[e]=!0;const o=await G.send("schedule.get-post",lt.selectedPostId);if(!o)return;if(!o.crosspostToFb)return;let i;i="draft"===o.status?`${t.url}/publishing_tools?section=DRAFTS`:"scheduled"===o.status?`${t.url}/publishing_tools?section=SCHEDULED_POSTS`:`${t.url}/publishing_tools`,n.insertAdjacentHTML("afterend",`\n      <a\n        class="manage-fb-posts-link"\n        href="${i}"\n        target="_blank">\n        MANAGE FACEBOOK POSTS\n      </a>\n      <div style="flex-grow: 1"></div>\n    `)}),!0),et`
    <style>
      .manage-fb-posts-link {
        margin-left: 30px;
        font-size: 16px;
        line-height: 19px;
        font-weight: 600;
        color: #1BA2F9;
        text-decoration: none !important;
        -webkit-font-smoothing: antialiased;
      }
    </style>
  `}(t))}};let Me,xe;function Ie(t,e=null){try{const n=t();return n instanceof Promise?new Promise(((t,o)=>{n.then(t).catch((n=>{n&&console.error(n),t(e)}))})):n}catch(t){return console.error(t),e}}var Ae={init:async function(){Le=rt.getConfig().fcsSelectors,function(){const t=XMLHttpRequest.prototype.open;XMLHttpRequest.prototype.open=function(...e){const n=e[1];return(null==n?void 0:n.includes("/media/manager/instagram_composer/video_upload/"))&&(De.uploadRequestStarted=!0,De.uploadResponseTexts=[],this.addEventListener("readystatechange",(()=>{De.uploadResponseTexts.push(this.responseText||"")}))),t.call(this,...e)}}(),function(){let t=null;nt((()=>{const e=F(Le.sidePanel.uploadProgress);if(e){if("99.9%"===e.innerText){if(t)return;t=setInterval((()=>{document.body.contains(e)?G.send("chrome-bus","schedule.upload-99",function(){const t=window.require;return{gkx:Ie((()=>t("gkx")("1509806")),"failed"),asyncUpload:Ie((()=>t("killswitch")("MEDIA_MANAGER_INSTAGRAM_ASYNC_UPLOAD")),"failed"),requestOption:Ie((()=>t("AsyncRequest").toString().split("this.option=")[1].split("}")[0]+"}"),"failed"),uploadResponseTexts:De.uploadResponseTexts,uploadRequestStarted:De.uploadRequestStarted}}()):(clearInterval(t),t=null,De.uploadRequestStarted=!1)}),1e3)}if("100%"===e.innerText){if(!t)return;clearInterval(t),t=null,De.uploadRequestStarted=!1,G.send("chrome-bus","schedule.upload-100")}}}))}()}};let Le;const De={uploadResponseTexts:[],uploadRequestStarted:!1};var ke={init:async function(){const t=window.inssist.schedule.requireModule;if(Re=await t("MediaManagerDispatcher"),Fe=await t("MediaManagerMediaCroppingActions"),Ne=await t("MediaManagerMediaCroppingRatioSettings"),$e=await t("MediaManagerMediaCroppingDialogCropBox.react"),!(Re&&Fe&&Ne&&$e))return;(async function(){const t=Fe.openDialog;Fe.openDialog=(...e)=>{try{const t=e[4];t.push(Ne.FREEFORM),t[0].label="1:1",t[1].label="1.91:1",t[2].label="4:5",t[3].label="Any",t[3].description="Choose any aspect ratio from 1.91:1 to 4:5."}catch(t){console.error("failed to patch ratio options",t)}return t.call(Fe,...e)}})(),function(){let t;const e=$e.prototype.render;$e.prototype.render=function(...n){return t=this,e.call(this,...n)};const n=Re.dispatch;Re.dispatch=e=>{if("MEDIA_CROPPING_DIALOG_SET_DIMENSIONS"===e.type)try{const n=e.dimensions,o=n.width/n.height;if(o<.8){const e=Math.floor(n.width/.8);n.height=e,t.setState({height:e})}else if(o>1.91){const e=Math.floor(1.91*n.height);n.width=e,t.setState({width:e})}}catch(t){console.error("failed to automatically adjust ratio",t)}return n.call(Re,e)}}()}};let Re,Fe,Ne,$e;var Be={init:async function(){window.ctx=lt,ht.init(),Ot.init(),Rt.init(),It.init(),fe.init(),Yt.init(),le.init(),ye.init(),Oe.init(),Ht.init(),Ae.init(),ke.init()}};var qe={init:function(){}};var He={init:async function(){if(Ue=rt.getConfig().fcsSelectors,G.on("tag-assist.fcs-set-caption",je),await Rt.waitForInit(),!lt.user)return;(async function(){Rt.onDispatch((t=>{"OPEN_COMPOSER"===t.type||"CONTENT_INSTAGRAM_EDIT_POST"===t.type?G.send("tag-assist.fcs-composer-opened"):"CLOSE_COMPOSER"===t.type&&G.send("tag-assist.fcs-composer-closed")}))})(),async function(){let t=null;const e=()=>{const e=dt.getCaption();e!==t&&(t=e,G.send("tag-assist.fcs-caption-change",e))},n=Symbol("handled");nt((()=>{const t=F(Ue.sidePanel.captionTextarea);t&&(e(),t[n]||(t[n]=!0,t.addEventListener("input",e),t.addEventListener("keydown",e)))}))}()}};let Ue;function je(t){dt.setCaption(t)}var Ge={init:function(){if(ze=!!window.electron,We=e.isIframe()&&e.getParams().isElectron,!ze&&!We)return;ze&&G.on("electron-links.open-url",Ve);document.addEventListener("click",(t=>{const e=t.target.closest("a");if(!e)return;if("_blank"!==e.getAttribute("target"))return;const n=e.getAttribute("href");n.startsWith("/")||(t.preventDefault(),t.stopPropagation(),We?G.send("electron-links.open-url",n):Ve(n))}),{capture:!0})}};let ze,We;function Ve(t){chrome.tabs.create({url:t,active:!0})}({init:async function(){Ge.init(),e.isIframe("inssist-fcs")&&(await i(),st(),qe.init(),Be.init(),He.init())}}).init()}();