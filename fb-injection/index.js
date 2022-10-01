!function(){function t(t,e,n){Object.defineProperty(t,e,{get:n,enumerable:!0})}var e={createName:function(t,e){return`${t}|${JSON.stringify(e)}`},getName:n,getParams:function(){return function(t){try{return JSON.parse(t)}catch(t){return null}}(window.self.name.split("|")[1])||{}},isIframe:function(t=null){return window.self!==parent&&(!t||n()===t)}};function n(){return window.self.name.split("|")[0]||null}async function o(){i()||await new Promise((t=>{document.addEventListener("readystatechange",(function e(){i()&&(document.removeEventListener("readystatechange",e),t())}))}))}function i(){return"interactive"===document.readyState||"complete"===document.readyState}var r=document.documentElement,a={},s={},c={},l={},d=1;l={nextValue:function(){return(d=(9301*d+49297)%233280)/233280},seed:function(t){d=t}};var u,p,f,h="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-";function m(){f=!1}function g(t){if(t){if(t!==u){if(t.length!==h.length)throw new Error("Custom alphabet for shortid must be "+h.length+" unique characters. You submitted "+t.length+" characters: "+t);var e=t.split("").filter((function(t,e,n){return e!==n.lastIndexOf(t)}));if(e.length)throw new Error("Custom alphabet for shortid must be "+h.length+" unique characters. These characters were not unique: "+e.join(", "));u=t,m()}}else u!==h&&(u=h,m())}function _(){return f||(f=function(){u||g(h);for(var t,e=u.split(""),n=[],o=l.nextValue();e.length>0;)o=l.nextValue(),t=Math.floor(o*e.length),n.push(e.splice(t,1)[0]);return n.join("")}())}c={get:function(){return u||h},characters:function(t){return g(t),u},seed:function(t){l.seed(t),p!==t&&(m(),p=t)},lookup:function(t){return _()[t]},shuffled:_};var y="object"==typeof window&&(window.crypto||window.msCrypto),b=y&&y.getRandomValues?function(t){return y.getRandomValues(new Uint8Array(t))}:function(t){for(var e=[],n=0;n<t;n++)e.push(Math.floor(256*Math.random()));return e},w=function(t,e,n){for(var o=(2<<Math.log(e.length-1)/Math.LN2)-1,i=-~(1.6*o*n/e.length),r="";;)for(var a=t(i),s=i;s--;)if((r+=e[a[s]&o]||"").length===+n)return r};var v,S,T=function(t){for(var e,n=0,o="";!e;)o+=w(b,c.get(),1),e=t<Math.pow(16,n+1),n++;return o};var P=function(t){var e="",n=Math.floor(.001*(Date.now()-1567752802062));return n===S?v++:(v=0,S=n),e+=T(7),e+=T(t),v>0&&(e+=T(v)),e+=T(n)};var E,C=function(t){return!(!t||"string"!=typeof t||t.length<6)&&!new RegExp("[^"+c.get().replace(/[|\\{}()[\]^$+*?.-]/g,"\\$&")+"]").test(t)},O=!1;var M=(O||(O=!0,E={},E=0),E||0);function x(){return P(M)}var I=x;(s=x).generate=I;var A=function(t){return c.seed(t),s};s.seed=A;var L=function(t){return M=t,s};s.worker=L;var D=function(t){return void 0!==t&&c.characters(t),c.shuffled()};s.characters=D;var k=C;function R(t){return Array.isArray(t)?t:[t]}function F(t,e=document){t=R(t);for(const n of t){const t=e.querySelector(n);if(t)return t}return null}function N(t,e=document){t=R(t);const n=[];for(const o of t){const t=e.querySelectorAll(o);for(const e of t)n.includes(e)||n.push(e)}return n}s.isValid=k,a=s;var $={on:function(t,e){j();(q[t]||(q[t]=[])).push(e)},off:function(t,e){const n=q[t];if(!n)return;for(;;){const t=n.findIndex((t=>t===e));if(-1===t)break;n.splice(t,1)}},send:function(t,...e){let n;const o=e[e.length-1];"function"==typeof o?(n=o,e=e.slice(0,-1)):n=null;return new Promise((o=>{chrome.runtime.sendMessage({[H]:t,[U]:e},(t=>{chrome.runtime.lastError||t!==B&&(n&&n(t),o(t))}))}))}};const B="__chromeBus.EMPTY_RESPONSE",q={},H="__chromeBus.name",U="__chromeBus.args";function j(){const t=j;t.init||(t.init=!0,chrome.runtime.onMessage.addListener(((t,e,n)=>{const o=t["__chromeBus.name"];if(!o)return!1;const i=t["__chromeBus.args"]||[],r=q[o]||[];return 0===r.length?(n(B),!0):((async()=>{const t=await Promise.all(r.map((t=>t(...i)))),e=t[t.length-1];n(e)})(),!!n)})))}var G={init:function(){$.on("iframe-bus",((t,...e)=>Q(t,...e))),J("chrome-bus",((t,...e)=>$.send(t,...e)))},on:J,once:K,off:X,send:Q,wait:async function(t){return await new Promise((e=>{K(t,e)}))}};const z="__iframeBus.name",W="__iframeBus.args",V="__iframeBus.callbackId",Y=parent!==window;function J(t,e){const n=Z(t),o=e["__iframeBus.handlers"]||(e["__iframeBus.handlers"]={});o[t]=async o=>{if(o.data["__iframeBus.name"]===n){const n=o.data["__iframeBus.args"]||[],i=o.data["__iframeBus.callbackId"]||null,r=await e(...n);i&&Q(`${t}:response-${i}`,r)}},window.addEventListener("message",o[t])}function K(t,e){J(t,(function n(...o){return X(t,n),e(...o)}))}function X(t,e){const n=e["__iframeBus.handlers"]||(e["__iframeBus.handlers"]={});window.removeEventListener("message",n[t])}async function Q(t,...e){let n;const o=e[e.length-1];"function"==typeof o?(n=o,e=e.slice(0,-1)):n=null;const i=t.includes(":response-"),r=Z(t),s=i?null:a.generate();if(Y?parent.postMessage({[z]:r,[W]:e,[V]:s},"*"):N("iframe").forEach((t=>{t.contentWindow.postMessage({[z]:r,[W]:e,[V]:s},"*")})),!i)return new Promise((e=>{const o=i=>{n&&n(i),X(`${t}:response-${s}`,o),e(i)};J(`${t}:response-${s}`,o)}))}function Z(t){return`iframe-bus.${t}`}function tt(t,...e){let n=0;return t.join("###").split(",").join("\n,\n").split("{").join("\n{").split("\n").map((t=>{if(!t.includes("###"))return t;const o=R(e[n]).map((e=>t.split("###").join(e))).join(",\n");return n+=1,o})).join("\n").split(";").join(" !important;").replace(/!important\s*!important/g,"!important")}function et(...t){const e=tt(...t);document.head.insertAdjacentHTML("afterbegin",e)}var nt=Object.assign((function(t,e=!1){0===ot.length&&(it=new MutationObserver((t=>{for(const e of ot){it.disconnect();try{e(t)}catch(t){console.error("onDocMutations",t)}if(!it)return;it.observe(document.documentElement,{attributes:!0,childList:!0,subtree:!0})}})),it.observe(document.documentElement,{attributes:!0,childList:!0,subtree:!0}));ot.push(t),e&&t()}),{off:function(t){const e=ot.indexOf(t);if(-1===e)return;ot.splice(e,1),0===ot.length&&(it.disconnect(),it=null)}});const ot=[];let it;var rt={getConfig:function t(){const n=t;if(!n.config){const t=e.getParams();n.config=t.fusionConfig}return n.config}};var at=function(){et`
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
  `,function(){const t=rt.getConfig().fcsSelectors,e=rt.getConfig().dmSelectors,n=rt.getConfig().igSelectors;nt((function t(e){const n=F("body");if(!n)return;nt.off(t);new MutationObserver(i).observe(n,{childList:!0,subtree:!0}),i(e)}));let o=!1;function i(i){if(o)return;const r=i.map((t=>Array.from(t.addedNodes))).flat();if(0===r.length)return;const a=window.inssist.theme.emojiRegex,s=(F("body").innerText.match(a)||[]).filter((t=>!"0123456789#*↪".includes(t)));if(0===s.length)return;const c=[],l=Array.from(new Set(s)),d=["input","textarea","[contenteditable]",e.general.emojiPicker,n.general.postCaption,t.sidePanel.postPreviewCaption].map((t=>N(t))).flat();r.forEach((t=>{let e;if(e=t.nodeType===Node.ELEMENT_NODE?t:t.parentElement,!e)return;const n=document.createTreeWalker(e,NodeFilter.SHOW_TEXT);for(;;){const t=n.nextNode();if(!t)break;const e=t.textContent;if(!l.some((t=>e.includes(t))))continue;if(d.some((e=>e.contains(t))))continue;const o=t.parentElement;o.classList.contains("emoji")||(c.includes(o)||c.push(o))}})),requestAnimationFrame((()=>{o=!0,c.forEach((t=>{if(!document.body.contains(t))return;let e=t.innerHTML;l.forEach((t=>{const n=`<span class="emoji">${t}</span>`;e=e.split(n).join("__$%#^__").split(t).join(n).split("__$%#^__").join(n)})),t.innerHTML=e})),o=!1}))}}()};var st=function(){!async function(){ct(await G.send("theme.get-theme"))}(),async function(){G.on("theme.switch-theme",(t=>{ct(t)}))}(),at()};function ct(t){t&&(r.classList.remove("theme-day"),r.classList.remove("theme-night"),r.classList.add(`theme-${t}`))}var lt={user:null,igProfilesData:[],crosspostToFb:!1,selectedPostId:null,allPosts:[]},dt={getCaption:function(){const t=ut();if(!t)return null;let e=t.innerText.split("\n\n").join("\n");"\n"===e&&(e="");return e},setCaption:async function t(e,{force:n=!1}={}){const o=t;if(!n){const t=ut();if(!t)return;if(document.activeElement===t)return}if(o.running)return;o.running=!0;const i=window.inssist.schedule.requireModule;o.EditorState||(o.EditorState=await i("EditorState"));o.ContentState||(o.ContentState=await i("ContentState"));o.MetaDataActions||(o.MetaDataActions=await i("MediaManagerInstagramComposerMetaDataActions"));o.getMentionsInputDecorator||(o.getMentionsInputDecorator=await i("getMentionsInputDecorator"));const r=o.ContentState.createFromText(e),a=o.getMentionsInputDecorator(),s=o.EditorState.createWithContent(r,a);o.MetaDataActions.updateCaption(s),o.running=!1;const c=F(rt.getConfig().fcsSelectors.sidePanel.captionScrollContainer);if(!c)return;c.scrollTop=c.scrollHeight}};function ut(){return F(rt.getConfig().fcsSelectors.sidePanel.captionTextarea)||null}function pt(){const t=[];return Object.assign(e,{handle:function(t){if("function"!=typeof t)return void console.error("function is expected");e(t)},clear:function(){t.length=0},off:function(e){const n=t.indexOf(e);-1!==n&&t.splice(n,1)},isEmpty:function(){return 0===t.length}});function e(...e){"function"==typeof e[0]?t.push(e[0]):t.forEach((t=>t(...e)))}}const ft=pt();var ht={init:function(){const t=XMLHttpRequest.prototype.open;XMLHttpRequest.prototype.open=function(e,n){const o=this;n=mt(n);let i=0;const r={},a=new URL(n);Array.from(a.searchParams).forEach((([t,e])=>{r[t]=e}));const s=pt();o.addEventListener("readystatechange",(()=>{o.readyState===XMLHttpRequest.DONE&&s(o)})),ft({url:n,query:r,modifyUrl:t=>{i+=1,i>1&&console.warn("`modifyUrl` was called more than once"),n=mt(t)},onResponse:s}),t.call(o,e,n)}},onRequest:ft.handle};function mt(t){return t.startsWith("http")?t:t.startsWith("/")?`${location.origin}${t}`:(console.error(`invalid url "${t}"`),t)}async function gt(t,e=null){let n,o;return"number"==typeof e?(n=e,o=100):e?(n=e.timeout||3e4,o=e.frequency||100):(n=3e4,o=100),new Promise(((e,i)=>{const r=t();if(r)return void e(r);const a=setInterval((()=>{const n=t();n&&(clearInterval(a),e(n))}),o);setTimeout((()=>{clearInterval(a),e(null)}),n)}))}function _t(){let t;const e=new Promise((e=>{t=e}));return Object.defineProperty(e,"resolve",{get:()=>t}),e}var yt={createError:function({message:t,details:e={}}){return{message:t,details:e,[bt]:!0}},throwError:function({message:t,details:e={}}){throw wt({message:t,details:e,critical:!0}),new Error(t)},sendError:wt,isKnownError:function(t){return t&&t[bt]},getLightweightPageHtml:vt};const bt=Symbol("isScheduleInjectionError");async function wt({message:t,details:e={},critical:n=!1}){let o;try{o=(await fetch("/")).ok}catch(t){o=!1}const i=!!F(rt.getConfig().fcsSelectors.general.pandaErrorImage);G.send("schedule.fcs-error",{message:`schedule injection → ${t}`,critical:n,details:{...e,isNetworkOk:o,isPandaError:i,html:vt()}})}function vt(){const t=F("body > div"),e=document.createElement("div");return e.innerHTML=t.innerHTML.replace(/style="[^"]*"/gi,"").replace(/alt="[^"]*"/gi,""),N('[role="cell"]:nth-child(n + 4)',e).forEach((t=>t.remove())),e.innerHTML}var St={};const Tt=1e3,Pt=6e4,Et=36e5,Ct=864e5;t(St,"MONTH",(function(){return 26784e5})),t(St,"WEEK",(function(){return 6048e5})),t(St,"DAY",(function(){return Ct})),t(St,"HOUR",(function(){return Et})),t(St,"MINUTE",(function(){return Pt})),t(St,"SECOND",(function(){return Tt}));var Ot='<style>\n\n* {\n  outline: none;\n  font-family: montserrat !important;\n}\n\nbody {\n  overflow: hidden;\n}\n\nbody::-webkit-scrollbar {\n  width: 0px;\n}\n\n/* top bar */\n#mediaManagerGlobalChromeBar, /* when connected with fb */\n.uiContextualLayerParent > div > .MediaManagerInstagramRoot > div:first-child /* when connected with ig */ {\n  display: none !important;\n}\n\n/* side panel */\n._6uh1 {\n  top: 0 !important;\n}\n\n/* side panel items under "create post" button */\n._6ug6 {\n  display: none !important;\n}\n\n/* body panel */\n._1l9z {\n  margin-top: 0 !important;\n}\n\n/* user selection dropdown */\n#tabHeader {\n  margin-top: -28px;\n}\n\n'.replace("<style>",""),Mt={init:function(){G.on("schedule.fcs-get-report",It)},set:function(t,e){xt[t]=e},log:function(t){xt.log.push(t);const e="string"==typeof t?t:JSON.stringify(t);console.log(`%c[fcs] %c${e}`,"color: #b99610","color: #b99610; font-weight: bold;")}};const xt={log:[]};function It(){return{...xt,html:yt.getLightweightPageHtml()}}var At={init:async function(){Mt.log("start"),Lt=rt.getConfig().fcsSelectors;try{await async function(){Mt.log("fallback enabled?");const t=await G.send("schedule.is-fallback-enabled");if(Mt.log(t?"yes":"no"),!t)return;throw et`
    <style>
      ${Ot}
    </style>
  `,kt}();const{someUserConnected:t}=await async function(){await o();const t=document.documentElement.innerHTML,e=t.toLowerCase();if(!location.href.includes("business.facebook.com/creatorstudio")||!(e.includes("bizsitepage")||e.includes("uicontextuallayerparent")||e.includes("emojiconfig")))return Mt.log("is user connected?"),Mt.log("no (not logged in)"),lt.user=null,{someUserConnected:!0};Mt.log("waiting for ig profiles data...");const n=t.split("<body")[1].split("requireLazy")[0];Mt.log(n);const i=window.inssist.schedule.requireModule,r=await i("MediaManagerInstagramProfilesDataStore",3e4);if(!r){let t;const e=yt.getLightweightPageHtml();throw t=e.includes("/checkpoint/")?"account locked":e.includes("/confirm_code/")?"fb code is required":'<div class="_3b5k" id="bizsitePageContainer"><div class="_6nx4"></div><div id="globalContainer" class="uiContextualLayerParent"><div id="u_0_1"></div></div></div>'===e?"empty html":e.includes('role="progressbar"')?"spinner":"unknown",yt.createError({message:`Unable to require MediaManagerInstagramProfilesDataStore within 30 seconds (${t})`})}Mt.log("ig profiles data received"),Mt.log("is user connected?");if(!await gt((()=>{const t=r.getState().toJS();return!!(t&&t[0]&&t[0].value)})))throw yt.createError({message:"MediaManagerInstagramProfilesDataStore loading takes too long"});let a=null;const s=r.getState().toJS()[0].value;if(s.length>0){const t=await G.send("schedule.get-ig-username");a=s.find((e=>e.username===t))||null}return lt.user=a,Mt.log(a?"yes":"no"),{someUserConnected:!0}}();!function(){const t=()=>{const t=F(Lt.welcome.acceptCookieButton);if(t&&document.body.innerHTML.includes('"_js_datr"')){const e=document.body.innerHTML.split('"_js_datr"')[1].split('"')[1].split('"')[0];document.cookie=`_js_datr=${e}; SameSite=None; Secure`,t.click(),location.reload()}if(!!F(Lt.general.cookieBannerTitle))return;const e=F(Lt.welcome.getStartedButton);e&&(e.click(),location.reload());const n=F(Lt.whatsNew.closeButton);n&&(n.click(),location.reload())};nt(t),setTimeout((()=>{nt.off(t)}),3e4)}();const e=!!lt.user;await G.send("schedule.fcs-connection-status",e,{someUserConnected:t})}catch(t){t===kt||(yt.isKnownError(t)?yt.sendError({message:t.message,details:t.details,critical:!0}):yt.sendError({message:"startup controller init: unknown error",details:{details:t},critical:!0}))}Mt.log("end"),Dt.resolve()},waitForInit:async function(){return Dt}};let Lt;const Dt=_t(),kt=new Error("fallback enabled");let Rt;var Ft=Rt={init:async function(){await At.waitForInit();try{const t=await async function(){const t=rt.getConfig().fcs,e=await gt((()=>window.requireLazy));if(!e)throw yt.createError({message:"initDispatcher: failed to get window.require"});const n=await new Promise((n=>{const o=setTimeout((()=>{n(null)}),15e3);e([t.MediaManagerDispatcher],(t=>{clearTimeout(o),n(t)}))}));if(!n)return null;const o=[],i=n.dispatch;return n.dispatch=(...t)=>{if(t[0])for(const e of o)e(t[0]);return i.call(n,...t)},{dispatch:n.dispatch,onDispatch:t=>{o.push(t)}}}();t&&(Rt.dispatch=t.dispatch,Rt.onDispatch=t.onDispatch)}catch(t){yt.isKnownError(t)?yt.sendError({message:t.message,details:t.details,critical:!0}):yt.sendError({message:"dispatch controller init: unknown error",details:{jsError:t},critical:!0})}Nt.resolve()},waitForInit:async function(){return Nt},main:{},composer:{}};const Nt=_t();async function $t(t,...e){return new Promise((n=>{t(...e,n)}))}var Bt=Object.assign((function(t,e={}){document.addEventListener("click",t,e)}),{off:function(t,e={}){document.removeEventListener("click",t,e)}});function qt(t,e){let n;n="function"==typeof e?t.findIndex(e):t.indexOf(e),-1!==n&&t.splice(n,1)}var Ht='<style>\n\n* {\n  outline: none;\n}\n\n\n/* user selection option when creating new post */\n._7pqd {\n  opacity: 0;\n}\n\n\n/* page content */\n._1x52,\n#globalContainer {\n  visibility: hidden;\n}\n\n\n/* modal window */\n._59s7 {\n  max-width: calc(100% - 80px) !important;\n}\n\n\n/* edit post left panel */\n._7-i- {\n  padding-top: 0 !important;\n}\n\n\n/* hide content */\n._6uh1 ~ div {\n  visibility: hidden !important;\n}\n\n\n/* notification (e.g. "post saved") */\n._72sn {\n  display: none;\n}\n\n\n/* disable side panel animation */\n._92zt {\n  animation-duration: 0s !important;\n}\n\n\n/* extend table height */\n._rz-,\n.uiScrollableAreaContent > div {\n  height: 4500px !important; }\n\n\n/* disable active panel animation */\n#creator_studio_sliding_tray_root ._6lsf {\n  right: 0 !important; }\n\n\n/* uploading progress */\n._6eqo {\n  cursor: default !important;\n}\n\n/* uploading progress chevron icon */\n._6eqo i:last-child {\n  display: none;\n}\n\n\n/* noinspection CssNoGenericFontName */\n* { font-family: montserrat !important; }\n:root { --geodesic-type-font-family: montserrat !important; }\n:root { --geodesic-type-size-value-font-family: montserrat !important; }\nbody { overflow-x: hidden; }\nbody::-webkit-scrollbar { width: 0px; }\n\n\n/* ! posts panel container */\n#globalContainer > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2),\ndiv._1l9z {\n  margin: 0 !important; z-index: 100; }\n\n\n/*START*/\n/* left navigation panel and\n   top panel header with fb and ig tabs.\n   these are optional if posts container z-index is 100 */\n#mediaManagerGlobalChromeBar,\n._6uh1, /* header with fb and ig tabs */\n.p7k9k0yn.i6vn8ron /* header when authorized with new method */ {\n  display: none !important; }\n\n\n/* post status, time selector and search */\n#mediaManagerFilterAndSearch {\n  display: none; }\n\n\n/* table header with account selector and title */\n#instagramTabHeader {\n  visibility: hidden;\n  position: fixed;\n  left: -100000px; }\n\n\n/* media type tabs */\ndiv._450w {\n  display: none; }\n\n\n/* posts panel content */\ndiv._3wpv {\n  padding: 0px 8px !important; }\n\n\n/* prevent column clipping */\n#mediaManagerContentTable, div._6ynv {\n  min-width: 1070px !important; }\n\n\n/* --- */\n\n\n/* ! posts panel container,\n  only enable this if in post view mode to hide the table underneath */\n/* #globalContainer > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2), div._1l9z {\n     visibility: hidden !important; } */\n\n\n/* ! post details pop-over */\n#creator_studio_sliding_tray_root > div, div._6lsf {\n  max-width: 100% !important;\n  width: 100% !important; }\n\n\n/* pop-over header */\n#creator_studio_sliding_tray_root > div > div > div:nth-child(1) {\n  display: none !important; }\n\n\n/* pop-over frame and performance container */\n#creator_studio_sliding_tray_root > div > div > div:nth-child(2) {\n  overflow: auto !important; }\n\n\n/* pop-over post frame (left sub-panel) */\n#creator_studio_sliding_tray_root > div > div > div:nth-child(2) > div:nth-child(1), div._759f {\n  width: initial !important;\n  min-width: 500px !important;\n  overflow-x: hidden !important;\n  overflow-y: auto !important;\n  padding-left: 24px !important;\n  justify-content: flex-start !important;\n  display: flex !important;\n  flex-direction: column !important;\n  background-color: white !important; }\n#creator_studio_sliding_tray_root > div > div > div:nth-child(2) > div:nth-child(1) > div, div._75fk {\n  box-shadow: none !important;\n  border-radius: 0 !important;\n  background-color: transparent !important;\n  border: none !important; }\n#creator_studio_sliding_tray_root > div > div > div:nth-child(2) > div:nth-child(1) > div > div._3qn7._61-3._2fyi._3qng > span {\n  display: none !important }\n#creator_studio_sliding_tray_root div._74_-._75fl {\n  margin-left: 0 !important; }\n#creator_studio_sliding_tray_root div._75fm {\n  padding-left: 0 !important; }\n#creator_studio_sliding_tray_root > div > div > div:nth-child(2) > div:nth-child(1) > div > div._8525 {\n  max-width: 500px !important }\n\n\n/* pop-over post performance (right sub-panel) */\n#creator_studio_sliding_tray_root > div > div > div:nth-child(2) > div:nth-child(2), div._759g {\n  min-width: 300px;\n  border: none !important;\n  background-color: white !important;\n  min-height: unset !important; }\n\n\n/* pop-over post performance title */\n#creator_studio_sliding_tray_root > div > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(1), div._759g > div:nth-child(1) {\n  border-top: none !important;\n  border-bottom: none !important; }\n\n\n/* pop-over post performance content */\n#creator_studio_sliding_tray_root > div > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(2), div._759g > div:nth-child(2) {\n  border-top: none !important;\n  border-bottom: none !important;\n  margin-top: 0 !important; }\n\n\n/* pop-over post performance tray */\n#creator_studio_sliding_tray_root ._6qig {\n  height: 76px !important;\n  box-sizing: border-box;\n  padding: 0 24px !important; }\n/* #creator_studio_sliding_tray_root > div > div > div:nth-child(3) > button:nth-child(1), div._6qig > button:nth-child(1) {\n     margin-left: 16px !important; } */\n\n\n/* tray buttons */\ndiv.uiOverlayFooter a[action=\'cancel\'],\ndiv.uiOverlayFooter button[action=\'confirm\'],\n#creator_studio_sliding_tray_root button[type="button"] {\n  cursor: pointer !important;\n  font-weight: 600 !important;\n  /* Please make sure to apply a special xpath attribute rule for disabled buttons.\n     Facebook disables some buttons such GO TO POST button on an archived story.\n     Such buttons are styled inline and have a special style \'color: rgb(190, 195, 201)\'.\n     Clicking these buttons does nothing, so an attribute based xpath expression should\n     watch and hide them all-together. */\n  /* color: white !important;\n     background-color: #1BA2F9 !important; */\n  border: none !important;\n  font-size: 16px !important;\n  border-radius: 4px;\n  text-transform: uppercase !important;\n  margin-left: 8px;\n  margin-right: 8px;\n  color: white !important;\n  background-color: #1BA2F9 !important;\n  transition: 300ms cubic-bezier(0.23, 1, 0.32, 1) 0s; }\ndiv.uiOverlayFooter a[action=\'cancel\'][style*="background-color: rgb(176, 213, 255)"],\ndiv.uiOverlayFooter button[action=\'confirm\'][style*="background-color: rgb(176, 213, 255)"],\n#creator_studio_sliding_tray_root button[type="button"][style*="background-color: rgb(176, 213, 255)"] {\n  opacity: 0.5 !important;\n  pointer-events: none;\n}\n\n#creator_studio_sliding_tray_root button[type="button"]:hover {\n  filter: brightness(95%); }\n#creator_studio_sliding_tray_root button[type="button"]:active {\n  filter: brightness(90%); }\n\n\n/* --- */\n\n\n/* post cover image title */\ndiv._7-i2 > span {\n  display: none !important; }\ndiv._7-i2 > div {\n  margin-top: 0 !important; }\n\n\n/* post caption input */\ndiv._7-2a._5yk1 {\n  overflow: auto !important; }\n\n\n/* --- */\n\n\n/* add content mini popup */\ndiv.uiContextualLayer.uiContextualLayerBelowLeft > div > div > div > div {\n  padding-bottom: 12px !important; }\ndiv.uiContextualLayer.uiContextualLayerBelowLeft > div > div > div > a {\n  display: none !important; }\n\n'.replace("<style>",""),Ut={init:async function(){jt=rt.getConfig().fcsSelectors,await Ft.waitForInit(),nt((()=>{lt.selectedPostId&&F(jt.sidePanel.captionTextarea)&&setTimeout((()=>{const t=dt.getCaption();Gt[lt.selectedPostId]=t}))})),G.on("schedule.set-caption",zt)},restoreCaptionForCurrentPost:async function(){if(!lt.selectedPostId)return;const t=Gt[lt.selectedPostId];if(t)return void zt(t);const e=await G.send("schedule.get-post",lt.selectedPostId);"local"===e.source&&e.caption&&zt(e.caption)}};let jt;const Gt={};function zt(t,{force:e=!1}={}){"string"==typeof t&&dt.setCaption(t,{force:e})}function Wt(t,e){return Vt(e)||(e=JSON.stringify(e)),`${encodeURIComponent(t)}=${encodeURIComponent(e)}`}function Vt(t){return"string"==typeof t||"number"==typeof t||"boolean"==typeof t}function Yt(t,e={}){const n=function(t){return Object.keys(t).map((e=>{const n=t[e];return Vt(n)?Wt(e,n):Array.isArray(n)?n.map((t=>Wt(e,t))).join("&"):null})).filter(Boolean).join("&").replace(/%5B/g,"[").replace(/%5D/g,"]")}(e);return n?`${t}?${n}`:t}var Jt={init:async function(){if(Kt=rt.getConfig().fcsSelectors,Xt=rt.getConfig().fcs,se(),ce(),G.on("schedule.fcs-go-to",Qt),G.on("schedule.fcs-open-post",Zt),G.on("schedule.fcs-open-new-post-form",te),G.on("schedule.fcs-refresh-data",ae),G.on("schedule.fcs-refresh-page",ee),G.on("schedule.fcs-check-critical-vars",ne),G.on("schedule.fcs-wait-upload",oe),G.on("schedule.fcs-submit-composer",ie),await At.waitForInit(),await Ft.waitForInit(),!lt.user)return;await async function(){if(await G.send("schedule.is-debug-enabled"))return;et`
    <style>
      ${Ht}

      ${Kt.sidePanel.mediaPreviewControls} {
        height: auto !important;
      }

      ${Kt.sidePanel.save} {
        max-width: none;
      }

      ${Kt.sidePanel.loadingOverlay} {
        background: #FFF !important;
      }
      .theme-night ${Kt.sidePanel.loadingOverlay} {
        background: #D4D5D9 !important;
      }

      ${Kt.sidePanel.postPerformancePane} {
        background: transparent;
      }

      .MediaManagerInstagramPostPreview {
        width: 100%;
      }

      html.is-igtv ${Kt.sidePanel.editPostButton} {
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


      .theme-night ${Kt.sidePanel.postPreviewCaption} {
        filter: url(#theme-reverse-filter);
      }
      .theme-night ${Kt.sidePanel.postPreviewCaption},
      .theme-night ${Kt.sidePanel.postPreviewCaption} * {
        color: #D4D7D9 !important;
      }
      .theme-night ${Kt.sidePanel.postPreviewCaption} a {
        color: #728FC9 !important;
      }

      .theme-night ${Kt.sidePanel.mediaPreviewContainer} {
        background: #FFF;
      }

      .theme-night ${Kt.sidePanel.mediaPreviewControls} {
        filter: url(#theme-reverse-filter);
      }
    </style>
  `,et`
    <style>
      ${Kt.sidePanel.locationRoot} {
        user-select: none;
        cursor: pointer;
        width: 502px;
      }
    </style>
  `,Bt((t=>{if(!t.target.closest(Kt.sidePanel.locationRoot))return;const e=F(Kt.sidePanel.locationInput);e?e.focus():yt.sendError({message:"upgradeAddLocationButton: failed to find location input"})})),et`
    <style>
      ${Kt.sidePanel.goToPostButton} {
        font-size: 16px !important;
        font-weight: 600;
        text-transform: uppercase;
      }
      ${Kt.sidePanel.goToPostButton} * {
        font-family: inherit !important;
      }

      ${Kt.sidePanel.doneButton} {
        display: none;
      }

      ${Kt.sidePanel.editPostButton} {
        max-width: none !important;
      }
    </style>
  `,nt((()=>{N(Kt.confirmDialog.yes).forEach((t=>{t.click()}))})),nt((()=>{N(Kt.tooltip.bubble).forEach((t=>{const e=t.closest(Kt.tooltip.root);if(!e)return;const n=t.closest(Kt.tooltip.bubbleWrap);if(!n)return;const o=F(`#${e.dataset.ownerid}`);if(!o)return;const i=o.getBoundingClientRect();if(i.left<150&&n.classList.contains("uiContextualLayerLeft")){n.classList.remove("uiContextualLayerLeft"),n.classList.add("uiContextualLayerRight"),n.style.left=0,n.style.right=null,e.style.left=`${i.left+i.width}px`,e.style.right=null;const o=t.offsetWidth,r=t.offsetHeight;if(o>r)return;t.style.width=`${Math.round(.75*r)}px`}}))})),async function(){const t=window.inssist.schedule.requireModule,e=await t(Xt.MediaManagerDispatcher),n=e.dispatch;e.dispatch=(...t)=>{const o=t[0];if(o.type!==Xt.CLOSE_COMPOSER||o.fromInssist)return n.call(e,...t)}}(),ht.onRequest((({xhr:t,url:e,query:n,modifyUrl:o})=>{if(!e.includes(Xt["/media_manager/content_library"])&&!e.includes(Xt["/media_manager/media_manager_instagram_content"]))return;const i=new URL(e),r=n[Xt.post_type];r===Xt.POST_TYPE_IGTV?(i.searchParams.set(Xt.post_status,Xt.POST_STATUS_DRAFT),i.searchParams.set(Xt.limit,1),o(i.toString())):r===Xt.POST_TYPE_VIDEOS?(i.searchParams.set(Xt.post_type,Xt.POST_TYPE_ALL),i.searchParams.set(Xt.post_status,Xt.POST_STATUS_PUBLISHED),i.searchParams.set(Xt.limit,100),o(i.toString())):r===Xt.POST_TYPE_PHOTOS?(i.searchParams.set(Xt.post_type,Xt.POST_TYPE_ALL),i.searchParams.set(Xt.post_status,Xt.POST_STATUS_SCHEDULED),i.searchParams.set(Xt.limit,500),o(i.toString())):r===Xt.POST_TYPE_CAROUSELS&&(i.searchParams.set(Xt.post_type,Xt.POST_TYPE_ALL),i.searchParams.set(Xt.post_status,Xt.POST_STATUS_DRAFT),i.searchParams.set(Xt.limit,500),o(i.toString()))})),await async function(t){const e=window.inssist.schedule.requireModule,n=await e(Xt.immutable);Ft.dispatch({type:Xt.SELECT_IG_PROFILES,[Xt.selectedProfileIDs]:n.List([t.id])})}(lt.user),le(),Ft.onDispatch((t=>{t.type===Xt.TOGGLE_CROSSPOST_TO_FACEBOOK_CHECKBOX&&(lt.crosspostToFb=t.value)})),Ft.onDispatch((t=>{t.type===Xt.CONTENT_TABLE_REFRESH_ROWS_FINISHED&&Object.values(t[Xt.rowsByIDs]).forEach((t=>{qt(lt.allPosts,(e=>e.id===t.id)),lt.allPosts.push(t)}))})),Ft.onDispatch((t=>{if(t.type!==Xt.PUSH_NOTIFICATION)return;if(!(Xt.isSuccess in t[Xt.notificationData]))return;if(t[Xt.notificationData][Xt.isSuccess])return;const e=t[Xt.notificationData][Xt.notificationDataLabel].toString();G.send("schedule.fcs-notification-error-appeared",{postId:lt.selectedPostId,errorText:e})})),function(){const t=Symbol("handled");nt((()=>{const e=F(Kt.sidePanel.editPostBottomRow);e&&(e[t]||lt.selectedPostId&&(e[t]=!0,e.insertAdjacentHTML("afterbegin",'\n      <button class="delete-post-button">\n        <svg class="delete-post-button__icon" width="14" height="14" viewBox="0 0 14 14">\n          <path fill="none" d="M0 0h14v14H0z"/>\n          <path d="M3.099 14a.74.74 0 0 1-.779-.652L1.8 3.772h9.874l-.52 9.576a.74.74 0 0 1-.779.652zM.965 2.824V1.287A.489.489 0 0 1 1.454.8h3.357V.163A.163.163 0 0 1 4.974 0H8.5a.163.163 0 0 1 .165.163V.8h3.357a.489.489 0 0 1 .489.489v1.535z" fill="currentColor"/>\n        </svg>\n        <span class="delete-post-button__label">\n          DELETE POST\n        </span>\n      </button>\n    ')))})),Bt((t=>{t.target.closest(".delete-post-button")&&G.send("schedule.delete-post",lt.selectedPostId)})),et`
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
  `}(),function(){const t=Symbol("handled");nt((()=>{const e=F(Kt.general.headerMessageIconContainer);if(!e)return;if(e[t])return;e[t]=!0;e.parentElement.style.display="none"}))}(),ae()}};let Kt,Xt;function Qt(t){location.href=t}async function Zt(t,{isIgtv:e=!1}={}){document.documentElement.classList.toggle("is-igtv",e);const n=window.inssist.schedule.requireModule,o=await n(Xt.queryIGMediaData),i=await n(Xt.MediaManagerInstagramContentActions);await re(),lt.selectedPostId=t;const r=await $t(o,t);"POSTED"===r.postStatus?(i.setShouldShowPostDetailTray(!0,r),Ut.restoreCaptionForCurrentPost()):(await le(),i.editPost(r),Ut.restoreCaptionForCurrentPost())}async function te({postMode:t="publish",localPostId:e=null,localPostFiles:n=[]}){const o=te;document.documentElement.classList.toggle("is-igtv",!1),lt.crosspostToFb=!1,lt.selectedPostId=e||null,await re();const i=window.inssist.schedule.requireModule;await le();(await i(Xt.MediaManagerInstagramComposerRootActions)).openComposer(Xt.IG_FEED_ORGANIC),Ft.dispatch({type:Xt.SELECT_INSTAGRAM_ACCOUNT,instagramAccount:lt.user}),Ft.dispatch({type:Xt.SWITCH_POST_MODE,[Xt.isEditComposer]:!1,[Xt.postMode]:t}),Ut.restoreCaptionForCurrentPost(),0!==n.length&&(clearTimeout(o.timeout),o.timeout=setTimeout((()=>{Ft.dispatch({type:Xt.FILES_ADDED,[Xt.files]:n})}),200))}function ee(){location.href=Yt("https://business.facebook.com/creatorstudio",{tab:"instagram_content_posts",mode:"instagram",collection_id:"all_pages",content_table:"INSTAGRAM_POSTS",locale:"en_US"})}async function ne(){return!!window.require}async function oe(){const t=window.inssist.schedule.requireModule,e=await t(Xt.MediaManagerInstagramComposerUploadStore);return await new Promise((t=>{const n=setInterval((()=>{const o=e.getState().toJS(),i=o.isUploadFailed,r=o.isUploadFinished;i?(clearInterval(n),t(!1)):r&&(clearInterval(n),t(!0))}),500)}))}function ie(){Ft.dispatch({type:"PUBLISH_MEDIA"})}async function re(){const t=window.inssist.schedule.requireModule;(await t(Xt.MediaManagerInstagramContentActions)).setShouldShowPostDetailTray(!1),Ft.dispatch({type:Xt.SHOW_EXIT_COMPOSER_CONFIRM_DIALOG}),Ft.dispatch({type:Xt.CLOSE_COMPOSER,fromInssist:!0})}function ae(){const t=ae;t.init||(t.init=!0,t.lastPostCount=0,Ft.onDispatch((e=>{if(t.refreshing&&e.type===Xt.SET_CONTENT_LIBRARY_DATA){const n=e.queryParameters.toJS().postType;if(!(n===Xt.POST_TYPE_IGTV||n===Xt.POST_TYPE_VIDEOS||n===Xt.POST_TYPE_PHOTOS||n===Xt.POST_TYPE_CAROUSELS))return;if(n===Xt.POST_TYPE_IGTV)return void Ft.dispatch({type:Xt.SELECT_CONTENT_TABLE,contentTable:Xt.INSTAGRAM_VIDEO_POSTS,source:Xt.instagram_content_library_posts});n===Xt.POST_TYPE_VIDEOS&&Ft.dispatch({type:Xt.SELECT_CONTENT_TABLE,contentTable:Xt.INSTAGRAM_PHOTO_POSTS,source:Xt.instagram_content_library_posts}),n===Xt.POST_TYPE_PHOTOS&&Ft.dispatch({type:Xt.SELECT_CONTENT_TABLE,contentTable:Xt.INSTAGRAM_CAROUSEL_POSTS,source:Xt.instagram_content_library_posts});const o=e.data.data.toJS();for(const t of o)qt(lt.allPosts,(e=>e.id===t.id)),lt.allPosts.push(t);if(n===Xt.POST_TYPE_CAROUSELS){if(t.lastPostCount-lt.allPosts.length>3)return t.lastPostCount=0,t.refreshing=!1,void ae();t.lastPostCount=lt.allPosts.length,G.send("schedule.apply-fcs-posts",lt.allPosts),t.refreshing=!1}}}))),t.refreshing||(lt.allPosts.length=[],t.refreshing=!0,Ft.dispatch({type:Xt.SELECT_CONTENT_TABLE,contentTable:Xt.INSTAGRAM_IGTV_POSTS,source:Xt.instagram_content_library_posts}),Ft.dispatch({type:Xt.REFRESH_TAB,tab:Xt.instagram_content_posts}))}function se(){nt((()=>{N("video").forEach((t=>{t.hasAttribute("autoplay")&&(t.pause(),t.removeAttribute("autoplay"))}))}),!0)}function ce(){history.pushState=history.replaceState}async function le(){const t=window.inssist.schedule.requireModule,e=await t(Xt.MediaManagerLazyLoadActions);await $t(e.lazyLoadSection,Xt.INSTAGRAM_COMPOSER)}var de={init:async function(){if(await At.waitForInit(),await Ft.waitForInit(),!lt.user)return;ue=rt.getConfig().fcsSelectors,pe=rt.getConfig().fcs,Bt((t=>{t.target.closest(ue.upload.root)&&(t.target.closest("input")||t.target.closest("button")||fe(F(ue.upload.button)))})),et`
    <style>
      ${ue.upload.root} {
        border-radius: 7px;
        user-select: none;
        cursor: pointer;
      }
      ${ue.upload.buttonWrap} {
        display: none;
      }
    </style>
  `,function(){const t=Symbol("handled");nt((()=>{const e=F(ue.upload.addContentButton);if(!e)return;const n=F(ue.sidePanel.mediaList);if(!n)return;const o=F(".add-media");o&&(o.style.display=n.childElementCount<10?null:"none"),n[t]||0!==n.childElementCount&&(n[t]=!0,n.insertAdjacentHTML("afterend",'\n      <div></div>\n      <button class="add-media" type="button">\n        <div class="add-media__icon">+</div>\n        ADD CONTENT\n      </button>\n    '),F(".add-media").addEventListener("click",(()=>{fe(e)})))})),et`
    <style>
      ${ue.upload.addContentButtonWrap} {
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
      ${ue.sidePanel.coverSelectionRadioBox} {
        position: relative;
        top: 2px;
      }
    </style>
  `,nt((()=>{N(ue.sidePanel.uploadingVideo).forEach((t=>{t.controls=!0}))})),et`
    <style>
      ${ue.sidePanel.uploadingVideoPlayButton} {
        display: none !important;
      }

      ${ue.sidePanel.uploadingVideoCustomControls} {
        display: none !important;
      }
    </style>
  `,function(){const t=Symbol("handled");nt((()=>{N(ue.sidePanel.mediaPreviewVideo).forEach((e=>{e[t]||(e[t]=!0,e.setAttribute("disablePictureInPicture",""),e.setAttribute("controlslist","nodownload"))}))})),et`
    <style>
      ${ue.sidePanel.mediaPreviewVideo}::-webkit-media-controls-fullscreen-button {
        display: none;
      }
    </style>
  `}(),function(){const t=Symbol("handled");nt((()=>{const e=F(".add-media");if(!e)return;const n=F(ue.sidePanel.mediaList);if(!n)return;const o=F(".reverse-media-list-button");if(o&&(o.style.display=n.childElementCount>1?null:"none"),e[t])return;e[t]=!0,e.insertAdjacentHTML("afterend",'\n      <button class="reverse-media-list-button" type="button">\n        <span class="reverse-media-list-button__icon">↪︎</span>\n        REVERSE\n      </button>\n    ');F(".reverse-media-list-button").addEventListener("click",(async()=>{try{const t=window.inssist.schedule.requireModule,e=(await t(pe.MediaManagerInstagramComposerUploadStore)).getState().toObject().fileMap.toObject(),n=Object.keys(e);if(n.length<2)return;n.forEach(((t,e)=>{Ft.dispatch({type:pe.SUBMIT_MEDIA_ORDER,[pe.mediaOrderId]:t,[pe.prevIndex]:0,[pe.newIndexString]:String(n.length-e),[pe.totalMedia]:n.length})}))}catch(t){console.error("schedule injection media controller →","addReverseMediaButton",t)}}))})),et`
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
  `}(),async function(){const t=window.inssist.schedule.requireModule,e=await t(pe.ImageExifRotation);if(!e)return;e.getRotation=(t,e)=>(e&&"function"==typeof e&&e(0),0)}()}};let ue,pe;function fe(t){t||yt.throwError({message:"startUpload: failed to find upload button"}),t.click();const e=F(ue.upload.input);e||yt.throwError({message:"startUpload: failed to find upload input"});const n=e.closest(ue.tooltip.root);n||yt.throwError({message:"startUpload: failed to find upload tooltip"}),n.style.opacity=0,n.style.pointerEvents="none",e.click()}var he={init:async function(){me=rt.getConfig().fcsSelectors,G.on("schedule.connect-via-fb",ge),G.on("schedule.connect-via-ig",_e)}};let me;async function ge(){if(await Ft.waitForInit(),!Ft.dispatch)return{error:"failed-to-init-dispatcher"};const t=await gt((()=>F(".MediaManagerInstagramContentPostsTabContainer")||F('[role="tab"][aria-selected="true"]')?"content":F(".MediaManagerInstagramOnboardingScreen")?"welcome":null));if(!t)return{error:"failed-to-detect-page-type"};"content"===t&&(Ft.dispatch({type:"SELECT_TAB",tab:"instagram_accounts",source:"left_nav"}),await gt((()=>location.href.includes("instagram_accounts"))),await gt((()=>F(".MediaManagerInstagramTabHeaderContainer")))),Ft.dispatch({type:"SET_SHOW_INSTAGRAM_ONBOARDING_DIALOG",shown:!0}),await gt((()=>F(".MediaManagerInstagramAccountPermissionMessageDialog")));const e=await new Promise((t=>{let e;const n=window.open;window.open=(o,i,r)=>{if(!o.includes("/oauth/authorize/"))return n(o,i,r);(async()=>{r=ye();const a=n(o,i,r);window.open=n,await gt((()=>a.closed)),e=setTimeout((()=>{t({error:"auth-window-closed-by-user"})}),5e3)})()};const o=window.require("ReloadPage"),i=o.now;o.now=()=>{clearTimeout(e),o.now=i,t({success:!0})},Ft.onDispatch((n=>{clearTimeout(e),"SET_LOGIN_INSTAGRAM_ACCOUNT_SUCCESS"===n.type&&t({error:"not-connected-to-fb-page"})})),Ft.dispatch({type:"AUTHENTICATE_INSTAGRAM_USER"})}));return Ft.dispatch({type:"SELECT_TAB",tab:"instagram_content",source:"left_nav"}),await gt((()=>location.href.includes("instagram_content"))),e}async function _e(){if(await Ft.waitForInit(),!Ft.dispatch)return{error:"failed-to-init-dispatcher"};if(F(me.general.fbLoginRequiredContainer))return{error:"failed-to-skip-fb-login"};return await new Promise((t=>{let e;const n=window.open;window.open=(o,i,r)=>{if(!(o=o.toString()).includes("/oauth/authorize/"))return n(o,i,r);(async()=>{r=ye();const a=n(o,i,r);window.open=n,await gt((()=>a.closed)),e=setTimeout((()=>{t({error:"auth-window-closed-by-user"})}),5e3)})()};const o=window.require("URI"),i=o.goURIOnWindow;o.goURIOnWindow=(...n)=>{clearTimeout(e),o.goURIOnWindow=i,t({success:!0})},Ft.dispatch({type:"IG_AUTHENTICATION_LOG_IN"})}))}function ye(){return`scrollbars,top=${Math.round(screen.height/2-350)},left=${Math.round(screen.width/2-300)},width=600,height=700`}var be={init:async function(){if(we=rt.getConfig().fcsSelectors,ve=rt.getConfig().fcs,await At.waitForInit(),await Ft.waitForInit(),!lt.user)return;(function(){let t,e;nt((()=>{t=N(we.sidePanel.mediaPreview),e=F(we.sidePanel.mediaPreviewVideo)})),ht.onRequest((({url:n,onResponse:o})=>{if(!function(t){return t.includes(ve["/media/manager/instagram_composer/create_post"])}(n))return;let i,r;i=t.length>1?"carousel":e?"video":"photo",t.length>0?r=t[0].getAttribute("src"):console.error("failed to find media preview image"),G.send("schedule.fcs-create-post-request",{type:i,image:r,crosspostToFb:lt.crosspostToFb,localPostId:lt.selectedPostId||null}),o((()=>{G.send("schedule.fcs-create-post-response",{image:r})}))})),ht.onRequest((({url:t,query:e,onResponse:n})=>{if(!function(t){return t.includes(ve["/media/manager/instagram_media/edit/save"])}(t))return;const o=lt.selectedPostId;let i,r;"true"===e[ve["edit_data[save_as_draft]"]]?(i=null,r="draft"):"true"===e[ve["edit_data[save_as_scheduled]"]]?(i=Se,r="scheduled"):(i=null,r="posted"),G.send("schedule.fcs-edit-post-request",{postId:o,status:r,on:i}),n((t=>{G.send("schedule.fcs-edit-post-response",{postId:o,status:r})}))}))})(),function(){const t=ve.MIN_MINUTES_FROM_NOW;et`
    <style>
      ${we.dateDialog.root} {
        position: fixed;
        left: 10000px;
      }
    </style>
  `;let e=!1;nt((()=>{const t=F(we.dateDialog.rootOpen);(!e&&t||e&&!t)&&(e=!e,G.send("schedule.fcs-date-dialog-toggled",e))}));const n=Symbol("handled");nt((()=>{const e=F(we.sidePanel.save);e&&(e[n]||e.nextElementSibling&&(e[n]=!0,e.addEventListener("click",(e=>{const n=Date.now()+t*Pt;"schedule"===Te&&(!Se||Se<n)&&(e.preventDefault(),e.stopPropagation(),G.send("schedule.fcs-date-dialog-invalid-time"))}),!0)))}))}(),async function(){const t=async()=>await G.send("schedule.has-pro"),e=Symbol("handled");nt((()=>{const n=F(we.sidePanel.save);if(!n)return;if(n[e])return;n[e]=!0;let o=!0;n.addEventListener("click",(e=>{o?(e.preventDefault(),e.stopPropagation(),(async()=>{if(await t())return o=!1,void n.click();const e=F(we.sidePanel.dateDialogTrigger);e&&e.click(),G.send("schedule.show-upsell")})()):o=!0}),!0)}))}(),G.on("schedule.fcs-date-dialog-get-timezone",Pe),G.on("schedule.fcs-date-dialog-select-option",Ee),G.on("schedule.fcs-date-dialog-set-selected-option",Ce),G.on("schedule.fcs-date-dialog-set-publish-time",Oe)}};let we,ve,Se=null,Te=null;function Pe(){const t=window.require(ve.DateTime).localNow().getTimezoneID();return window.require(ve.TimezoneNamesData).zoneNames[t]}function Ee(t){const e={"publish-now":ve.postModePublish,"save-as-draft":ve.postModeDraft,schedule:ve.postModeSchedule}[t],n={type:ve.SWITCH_POST_MODE,[ve.postMode]:e};Ft.dispatch({...n,[ve.isEditComposer]:!1}),Ft.dispatch({...n,[ve.isEditComposer]:!0})}function Ce(t){Te=t}function Oe(t){if(Se=t,!Se)return;const e={type:ve.SELECT_SCHEDULED_DATE,[ve.scheduledDate]:new Date(Se)};Ft.dispatch({...e,[ve.isEditComposer]:!1}),Ft.dispatch({...e,[ve.isEditComposer]:!0})}var Me={init:async function(){if(await At.waitForInit(),await Ft.waitForInit(),!lt.user)return;xe=rt.getConfig().fcsSelectors,Ie=rt.getConfig().fcs,et`
    <style>
      ${xe.postToFb.root} {
        display: none;
      }
    </style>
  `;const t=lt.user.connectedPageInfo;if(!t)return;t.url=`https://facebook.com/${t.name}-${t.id}`;t.name.toLowerCase().startsWith("inssist:")||(function(t){const e=Symbol("handled");nt((()=>{const t=F(xe.postToFb.checkboxRow);if(!t)return;const e=!!F(xe.sidePanel.mediaList);t.style.opacity=e?null:.5}),!0),nt((()=>{const n=F(xe.postToFb.title);n&&!n[e]&&(n[e]=!0,n.innerText="Clone to Facebook");const o=F(xe.postToFb.body);o&&!o[e]&&(o[e]=!0,o.innerHTML=`\n        <div class="post-to-fb__text">\n          Post will be cloned to Facebook Page. Facebook posts\n          can be managed separately from the\n          <a\n            class="post-to-fb__link"\n            href="${t.url}/publishing_tools"\n            target="_blank">\n            Facebook Publishing Tools</a>.\n        </div>\n      `)}),!0),nt((()=>{const t=F(xe.postToFb.checkboxRow);if(!t)return;if(t[e])return;t[e]=!0;const n=F(xe.postToFb.checkboxButton);n&&t.addEventListener("click",(t=>{t.target.closest(xe.postToFb.checkboxButton)||n.click()}))})),et`
    <style>
      html ${xe.postToFb.root} {
        display: block;
        margin-top: 40px;
        padding-bottom: 80px;
      }

      html ${xe.postToFb.publishTypeButton} {
        display: none;
      }

      ${xe.postToFb.checkboxRow} {
        margin-top: 10px;
        margin-left: -7px;
        cursor: pointer;
        user-select: none;
      }

      ${xe.postToFb.checkboxButton} {
        background: transparent !important;
        border: 1px solid #DADDE1 !important;
      }
      .theme-night ${xe.postToFb.checkboxButton} {
        border-color: #464646 !important;
      }

      ${xe.postToFb.checkboxText} {
        pointer-events: none;
      }

      ${xe.postToFb.body} {
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
  `}(t),function(){let t,e;G.on("schedule.fcs-date-dialog-set-selected-option",(e=>{t=e,n()})),G.on("schedule.fcs-date-dialog-set-publish-time",(t=>{e=t,n()})),Ft.onDispatch((t=>{t.type===Ie.TOGGLE_CROSSPOST_TO_FACEBOOK_CHECKBOX&&n()}));const n=()=>{"save-as-draft"===t?Ft.dispatch({type:Ie.SWITCH_CROSSPOST_POST_MODE,[Ie.postMode]:Ie.postModeDraft}):"publish-now"===t?Ft.dispatch({type:Ie.SWITCH_CROSSPOST_POST_MODE,[Ie.postMode]:Ie.postModePublish}):"schedule"===t&&(Ft.dispatch({type:Ie.SWITCH_CROSSPOST_POST_MODE,[Ie.postMode]:Ie.postModeSchedule}),e&&Ft.dispatch({type:Ie.SELECT_CROSSPOST_SCHEDULED_DATE,[Ie.scheduledDate]:new Date(e)}))}}(),function(t){const e=Symbol("handled");nt((async()=>{const n=F(".delete-post-button");if(!n)return;if(n[e])return;n[e]=!0;const o=await G.send("schedule.get-post",lt.selectedPostId);if(!o)return;if(!o.crosspostToFb)return;let i;i="draft"===o.status?`${t.url}/publishing_tools?section=DRAFTS`:"scheduled"===o.status?`${t.url}/publishing_tools?section=SCHEDULED_POSTS`:`${t.url}/publishing_tools`,n.insertAdjacentHTML("afterend",`\n      <a\n        class="manage-fb-posts-link"\n        href="${i}"\n        target="_blank">\n        MANAGE FACEBOOK POSTS\n      </a>\n      <div style="flex-grow: 1"></div>\n    `)}),!0),et`
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
  `}(t))}};let xe,Ie;function Ae(t,e=null){try{const n=t();return n instanceof Promise?new Promise(((t,o)=>{n.then(t).catch((n=>{n&&console.error(n),t(e)}))})):n}catch(t){return console.error(t),e}}var Le={init:async function(){De=rt.getConfig().fcsSelectors,function(){const t=XMLHttpRequest.prototype.open;XMLHttpRequest.prototype.open=function(...e){const n=e[1];return(null==n?void 0:n.includes("/media/manager/instagram_composer/video_upload/"))&&(ke.uploadRequestStarted=!0,ke.uploadResponseTexts=[],this.addEventListener("readystatechange",(()=>{ke.uploadResponseTexts.push(this.responseText||"")}))),t.call(this,...e)}}(),function(){let t=null;nt((()=>{const e=F(De.sidePanel.uploadProgress);if(e){if("99.9%"===e.innerText){if(t)return;t=setInterval((()=>{document.body.contains(e)?G.send("chrome-bus","schedule.upload-99",function(){const t=window.require;return{gkx:Ae((()=>t("gkx")("1509806")),"failed"),asyncUpload:Ae((()=>t("killswitch")("MEDIA_MANAGER_INSTAGRAM_ASYNC_UPLOAD")),"failed"),requestOption:Ae((()=>t("AsyncRequest").toString().split("this.option=")[1].split("}")[0]+"}"),"failed"),uploadResponseTexts:ke.uploadResponseTexts,uploadRequestStarted:ke.uploadRequestStarted}}()):(clearInterval(t),t=null,ke.uploadRequestStarted=!1)}),1e3)}if("100%"===e.innerText){if(!t)return;clearInterval(t),t=null,ke.uploadRequestStarted=!1,G.send("chrome-bus","schedule.upload-100")}}}))}()}};let De;const ke={uploadResponseTexts:[],uploadRequestStarted:!1};var Re={init:async function(){const t=window.inssist.schedule.requireModule;if(Fe=await t("MediaManagerDispatcher"),Ne=await t("MediaManagerMediaCroppingActions"),$e=await t("MediaManagerMediaCroppingRatioSettings"),Be=await t("MediaManagerMediaCroppingDialogCropBox.react"),!(Fe&&Ne&&$e&&Be))return;(async function(){const t=Ne.openDialog;Ne.openDialog=(...e)=>{try{const t=e[4];t.push($e.FREEFORM),t[0].label="1:1",t[1].label="1.91:1",t[2].label="4:5",t[3].label="Any",t[3].description="Choose any aspect ratio from 1.91:1 to 4:5."}catch(t){console.error("failed to patch ratio options",t)}return t.call(Ne,...e)}})(),function(){let t;const e=Be.prototype.render;Be.prototype.render=function(...n){return t=this,e.call(this,...n)};const n=Fe.dispatch;Fe.dispatch=e=>{if("MEDIA_CROPPING_DIALOG_SET_DIMENSIONS"===e.type)try{const n=e.dimensions,o=n.width/n.height;if(o<.8){const e=Math.floor(n.width/.8);n.height=e,t.setState({height:e})}else if(o>1.91){const e=Math.floor(1.91*n.height);n.width=e,t.setState({width:e})}}catch(t){console.error("failed to automatically adjust ratio",t)}return n.call(Fe,e)}}()}};let Fe,Ne,$e,Be;var qe={init:async function(){window.ctx=lt,ht.init(),Mt.init(),Ft.init(),At.init(),he.init(),Jt.init(),de.init(),be.init(),Me.init(),Ut.init(),Le.init(),Re.init()}};var He={init:function(){}};var Ue={init:async function(){if(je=rt.getConfig().fcsSelectors,G.on("tag-assist.fcs-set-caption",Ge),await Ft.waitForInit(),!lt.user)return;(async function(){Ft.onDispatch((t=>{"OPEN_COMPOSER"===t.type||"CONTENT_INSTAGRAM_EDIT_POST"===t.type?G.send("tag-assist.fcs-composer-opened"):"CLOSE_COMPOSER"===t.type&&G.send("tag-assist.fcs-composer-closed")}))})(),async function(){let t=null;const e=()=>{const e=dt.getCaption();e!==t&&(t=e,G.send("tag-assist.fcs-caption-change",e))},n=Symbol("handled");nt((()=>{const t=F(je.sidePanel.captionTextarea);t&&(e(),t[n]||(t[n]=!0,t.addEventListener("input",e),t.addEventListener("keydown",e)))}))}()}};let je;function Ge(t){dt.setCaption(t)}var ze={init:function(){if(We=!!window.electron,Ve=e.isIframe()&&e.getParams().isElectron,!We&&!Ve)return;We&&G.on("electron-links.open-url",Ye);document.addEventListener("click",(t=>{const e=t.target.closest("a");if(!e)return;if("_blank"!==e.getAttribute("target"))return;const n=e.getAttribute("href");n.startsWith("/")||(t.preventDefault(),t.stopPropagation(),Ve?G.send("electron-links.open-url",n):Ye(n))}),{capture:!0})}};let We,Ve;function Ye(t){chrome.tabs.create({url:t,active:!0})}({init:async function(){ze.init(),e.isIframe("inssist-fcs")&&(await o(),st(),He.init(),qe.init(),Ue.init())}}).init()}();