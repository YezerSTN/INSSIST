!function(){var t={createName:function(t,e){return`${t}|${JSON.stringify(e)}`},getName:e,getParams:function(){return function(t){try{return JSON.parse(t)}catch(t){return null}}(window.self.name.split("|")[1])||{}},isIframe:function(t=null){return window.self!==parent&&(!t||e()===t)}};function e(){return window.self.name.split("|")[0]||null}async function n(t,e=null){let n,o;return"number"==typeof e?(n=e,o=100):e?(n=e.timeout||3e4,o=e.frequency||100):(n=3e4,o=100),new Promise(((e,i)=>{const r=t();if(r)return void e(r);const a=setInterval((()=>{const n=t();n&&(clearInterval(a),e(n))}),o);setTimeout((()=>{clearInterval(a),e(null)}),n)}))}async function o(){await n((()=>document.body))}var i=document.documentElement,r={},a={},s={},c={},l=1;c={nextValue:function(){return(l=(9301*l+49297)%233280)/233280},seed:function(t){l=t}};var d,u,p,f="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-";function h(){p=!1}function g(t){if(t){if(t!==d){if(t.length!==f.length)throw new Error("Custom alphabet for shortid must be "+f.length+" unique characters. You submitted "+t.length+" characters: "+t);var e=t.split("").filter((function(t,e,n){return e!==n.lastIndexOf(t)}));if(e.length)throw new Error("Custom alphabet for shortid must be "+f.length+" unique characters. These characters were not unique: "+e.join(", "));d=t,h()}}else d!==f&&(d=f,h())}function m(){return p||(p=function(){d||g(f);for(var t,e=d.split(""),n=[],o=c.nextValue();e.length>0;)o=c.nextValue(),t=Math.floor(o*e.length),n.push(e.splice(t,1)[0]);return n.join("")}())}s={get:function(){return d||f},characters:function(t){return g(t),d},seed:function(t){c.seed(t),u!==t&&(h(),u=t)},lookup:function(t){return m()[t]},shuffled:m};var _="object"==typeof window&&(window.crypto||window.msCrypto),y=_&&_.getRandomValues?function(t){return _.getRandomValues(new Uint8Array(t))}:function(t){for(var e=[],n=0;n<t;n++)e.push(Math.floor(256*Math.random()));return e},b=function(t,e,n){for(var o=(2<<Math.log(e.length-1)/Math.LN2)-1,i=-~(1.6*o*n/e.length),r="";;)for(var a=t(i),s=i;s--;)if((r+=e[a[s]&o]||"").length===+n)return r};var w,v,S=function(t){for(var e,n=0,o="";!e;)o+=b(y,s.get(),1),e=t<Math.pow(16,n+1),n++;return o};var T=function(t){var e="",n=Math.floor(.001*(Date.now()-1567752802062));return n===v?w++:(w=0,v=n),e+=S(7),e+=S(t),w>0&&(e+=S(w)),e+=S(n)};var P,E=function(t){return!(!t||"string"!=typeof t||t.length<6)&&!new RegExp("[^"+s.get().replace(/[|\\{}()[\]^$+*?.-]/g,"\\$&")+"]").test(t)},C=!1;var O=(C||(C=!0,P={},P=0),P||0);function M(){return T(O)}var x=M;(a=M).generate=x;var I=function(t){return s.seed(t),a};a.seed=I;var A=function(t){return O=t,a};a.worker=A;var L=function(t){return void 0!==t&&s.characters(t),s.shuffled()};a.characters=L;var D=E;function k(t){return Array.isArray(t)?t:[t]}function R(t,e=document){t=k(t);for(const n of t){const t=e.querySelector(n);if(t)return t}return null}function F(t,e=document){t=k(t);const n=[];for(const o of t){const t=e.querySelectorAll(o);for(const e of t)n.includes(e)||n.push(e)}return n}a.isValid=D,r=a;var $={on:function(t,e){H();(N[t]||(N[t]=[])).push(e)},off:function(t,e){const n=N[t];if(!n)return;for(;;){const t=n.findIndex((t=>t===e));if(-1===t)break;n.splice(t,1)}},send:function(t,...e){let n;const o=e[e.length-1];"function"==typeof o?(n=o,e=e.slice(0,-1)):n=null;return new Promise((o=>{chrome.runtime.sendMessage({[B]:t,[q]:e},(t=>{chrome.runtime.lastError||(n&&n(t),o(t))}))}))}};const N={},B="__$chromeBus.name",q="__$chromeBus.args";function H(){const t=H;t.init||(t.init=!0,chrome.runtime.onMessage.addListener(((t,e,n)=>{const o=t["__$chromeBus.name"];if(!o)return!1;const i=t["__$chromeBus.args"]||[],r=N[o]||[];return 0!==r.length&&((async()=>{const t=await Promise.all(r.map((t=>t(...i)))),e=t[t.length-1];n(e)})(),!!n)})))}var U=$;const j="__iframeBus.name",G="__iframeBus.args",z="__iframeBus.callbackId",V="undefined"!=typeof parent&&parent!==window;function W(t,e){const n=K(t),o=e["__iframeBus.handlers"]||(e["__iframeBus.handlers"]={});o[t]=async o=>{if(o.data["__iframeBus.name"]===n){const n=o.data["__iframeBus.args"]||[],i=o.data["__iframeBus.callbackId"]||null,r=await e(...n);i&&X(`${t}:response-${i}`,r)}},window.addEventListener("message",o[t])}function Y(t,e){W(t,(function n(...o){return J(t,n),e(...o)}))}function J(t,e){const n=e["__iframeBus.handlers"]||(e["__iframeBus.handlers"]={});window.removeEventListener("message",n[t])}async function X(t,...e){let n;const o=e[e.length-1];"function"==typeof o?(n=o,e=e.slice(0,-1)):n=null;const i=t.includes(":response-"),a=K(t),s=i?null:r.generate();if(V?parent.postMessage({[j]:a,[G]:e,[z]:s},"*"):F("iframe").forEach((t=>{t.contentWindow.postMessage({[j]:a,[G]:e,[z]:s},"*")})),!i)return new Promise((e=>{const o=i=>{n&&n(i),J(`${t}:response-${s}`,o),e(i)};W(`${t}:response-${s}`,o)}))}function K(t){return`iframe-bus.${t}`}var Q={init:function(){U.on("iframe-bus",((t,...e)=>X(t,...e))),W("chrome-bus",((t,...e)=>U.send(t,...e)))},on:W,once:Y,off:J,send:X,wait:async function(t){return await new Promise((e=>{Y(t,e)}))}};function Z(t,...e){let n=0;return t.join("###").split(",").join("\n,\n").split("{").join("\n{").split("\n").map((t=>{if(!t.includes("###"))return t;const o=k(e[n]).map((e=>t.split("###").join(e))).join(",\n");return n+=1,o})).join("\n").split(";").join(" !important;").replace(/!important\s*!important/g,"!important")}function tt(...t){const e=Z(...t);document.head.insertAdjacentHTML("afterbegin",e)}var et=Object.assign((function(t,e=!1){0===nt.length&&(ot=new MutationObserver((t=>{for(const e of nt){ot.disconnect();try{e(t)}catch(t){console.error("onDocMutations",t)}if(!ot)return;ot.observe(document.documentElement,{attributes:!0,childList:!0,subtree:!0})}})),ot.observe(document.documentElement,{attributes:!0,childList:!0,subtree:!0}));nt.push(t),e&&t()}),{off:function(t){const e=nt.indexOf(t);if(-1===e)return;nt.splice(e,1),0===nt.length&&(ot.disconnect(),ot=null)}});const nt=[];let ot;var it={controller:{getConfig:function e(){const n=e;if(!n.config){const e=t.getParams();n.config=e.fusionConfig}return n.config}}},rt=function(){tt`
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
  `,function(){const t=it.controller.getConfig().fcsSelectors,e=it.controller.getConfig().dmSelectors,n=it.controller.getConfig().igSelectors;et((function t(e){const n=R("body");if(!n)return;et.off(t);new MutationObserver(i).observe(n,{childList:!0,subtree:!0}),i(e)}));let o=!1;function i(i){if(o)return;const r=i.map((t=>Array.from(t.addedNodes))).flat();if(0===r.length)return;const a=window.inssist.theme.emojiRegex,s=(R("body").innerText.match(a)||[]).filter((t=>!"0123456789#*↪".includes(t)));if(0===s.length)return;const c=[],l=Array.from(new Set(s)),d=["input","textarea","[contenteditable]",e.general.emojiPicker,n.general.postCaption,t.sidePanel.postPreviewCaption].map((t=>F(t))).flat();r.forEach((t=>{let e;if(e=t.nodeType===Node.ELEMENT_NODE?t:t.parentElement,!e)return;const n=document.createTreeWalker(e,NodeFilter.SHOW_TEXT);for(;;){const t=n.nextNode();if(!t)break;const e=t.textContent;if(!l.some((t=>e.includes(t))))continue;if(d.some((e=>e.contains(t))))continue;const o=t.parentElement;o.classList.contains("emoji")||(c.includes(o)||c.push(o))}})),requestAnimationFrame((()=>{o=!0,c.forEach((t=>{if(!document.body.contains(t))return;let e=t.innerHTML;l.forEach((t=>{const n=`<span class="emoji">${t}</span>`;e=e.split(n).join("__$%#^__").split(t).join(n).split("__$%#^__").join(n)})),t.innerHTML=e})),o=!1}))}}()};function at(t){t&&(i.classList.remove("theme-day"),i.classList.remove("theme-night"),i.classList.add(`theme-${t}`))}var st={init:function(){!async function(){at(await Q.send("theme.get-theme"))}(),async function(){Q.on("theme.switch-theme",(t=>{at(t)}))}(),rt()}},ct={user:null,igProfilesData:[],crosspostToFb:!1,selectedPostId:null,allPosts:[]},lt={getCaption:function(){const t=dt();if(!t)return null;let e=t.innerText.split("\n\n").join("\n");"\n"===e&&(e="");return e},setCaption:async function t(e,{force:n=!1}={}){const o=t;if(!n){const t=dt();if(!t)return;if(document.activeElement===t)return}if(o.running)return;o.running=!0;const i=window.inssist.schedule.requireModule;o.EditorState||(o.EditorState=await i("EditorState"));o.ContentState||(o.ContentState=await i("ContentState"));o.MetaDataActions||(o.MetaDataActions=await i("MediaManagerInstagramComposerMetaDataActions"));o.getMentionsInputDecorator||(o.getMentionsInputDecorator=await i("getMentionsInputDecorator"));const r=o.ContentState.createFromText(e),a=o.getMentionsInputDecorator(),s=o.EditorState.createWithContent(r,a);o.MetaDataActions.updateCaption(s),o.running=!1;const c=R(it.controller.getConfig().fcsSelectors.sidePanel.captionScrollContainer);if(!c)return;c.scrollTop=c.scrollHeight}};function dt(){return R(it.controller.getConfig().fcsSelectors.sidePanel.captionTextarea)||null}function ut(){const t=[];return Object.assign(e,{handle:function(t){if("function"!=typeof t)return void console.error("function is expected");e(t)},clear:function(){t.length=0},off:function(e){const n=t.indexOf(e);-1!==n&&t.splice(n,1)},isEmpty:function(){return 0===t.length}});function e(...e){"function"==typeof e[0]?t.push(e[0]):t.forEach((t=>t(...e)))}}const pt=ut();var ft={init:function(){const t=XMLHttpRequest.prototype.open;XMLHttpRequest.prototype.open=function(e,n){const o=this;n=ht(n);let i=0;const r={},a=new URL(n);Array.from(a.searchParams).forEach((([t,e])=>{r[t]=e}));const s=ut();o.addEventListener("readystatechange",(()=>{o.readyState===XMLHttpRequest.DONE&&s(o)})),pt({url:n,query:r,modifyUrl:t=>{i+=1,i>1&&console.warn("`modifyUrl` was called more than once"),n=ht(t)},onResponse:s}),t.call(o,e,n)}},onRequest:pt.handle};function ht(t){return t.startsWith("http")?t:t.startsWith("/")?`${location.origin}${t}`:(console.error(`invalid url "${t}"`),t)}function gt(){let t;const e=new Promise((e=>{t=e}));return Object.defineProperty(e,"resolve",{get:()=>t}),e}var mt={createError:function({message:t,details:e={}}){return{message:t,details:e,[_t]:!0}},throwError:function({message:t,details:e={}}){throw yt({message:t,details:e,critical:!0}),new Error(t)},sendError:yt,isKnownError:function(t){return t&&t[_t]},getLightweightPageHtml:bt};const _t=Symbol("isScheduleInjectionError");async function yt({message:t,details:e={},critical:n=!1}){let o;try{o=(await fetch("/")).ok}catch(t){o=!1}const i=!!R(it.controller.getConfig().fcsSelectors.general.pandaErrorImage);Q.send("schedule.fcs-error",{message:`schedule injection → ${t}`,critical:n,details:{...e,isNetworkOk:o,isPandaError:i,html:bt()}})}function bt(){const t=R("body > div"),e=document.createElement("div");return e.innerHTML=t.innerHTML.replace(/style="[^"]*"/gi,"").replace(/alt="[^"]*"/gi,""),F('[role="cell"]:nth-child(n + 4)',e).forEach((t=>t.remove())),e.innerHTML}const wt=6e4;var vt='<style>\n\n* {\n  outline: none;\n  font-family: montserrat !important;\n}\n\nbody {\n  overflow: hidden;\n}\n\nbody::-webkit-scrollbar {\n  width: 0px;\n}\n\n/* top bar */\n#mediaManagerGlobalChromeBar, /* when connected with fb */\n.uiContextualLayerParent > div > .MediaManagerInstagramRoot > div:first-child /* when connected with ig */ {\n  display: none !important;\n}\n\n/* side panel */\n._6uh1 {\n  top: 0 !important;\n}\n\n/* side panel items under "create post" button */\n._6ug6 {\n  display: none !important;\n}\n\n/* body panel */\n._1l9z {\n  margin-top: 0 !important;\n}\n\n/* user selection dropdown */\n#tabHeader {\n  margin-top: -28px;\n}\n\n'.replace("<style>","");function St(t,e){return Tt(e)||(e=JSON.stringify(e)),`${encodeURIComponent(t)}=${encodeURIComponent(e)}`}function Tt(t){return"string"==typeof t||"number"==typeof t||"boolean"==typeof t}function Pt(t,e={}){const n=function(t){return Object.keys(t).map((e=>{const n=t[e];return Tt(n)?St(e,n):Array.isArray(n)?n.map((t=>St(e,t))).join("&"):null})).filter(Boolean).join("&").replace(/%5B/g,"[").replace(/%5D/g,"]")}(e);return n?`${t}?${n}`:t}function Et(t={}){return Pt("https://business.facebook.com/creatorstudio",{tab:"instagram_content_posts",mode:"instagram",collection_id:"all_pages",content_table:"INSTAGRAM_POSTS",locale:"en_US",...t})}var Ct={init:function(){Q.on("schedule.fcs-get-report",Mt)},set:function(t,e){Ot[t]=e},log:function(t){Ot.log.push(t);const e="string"==typeof t?t:JSON.stringify(t);console.log(`%c[fcs] %c${e}`,"color: #b99610","color: #b99610; font-weight: bold;")}};const Ot={log:[]};function Mt(){return{...Ot,html:mt.getLightweightPageHtml()}}var xt={init:async function(){Ct.log("start"),It=it.controller.getConfig().fcsSelectors;try{await async function(){Ct.log("fallback enabled?");const t=await Q.send("schedule.is-fallback-enabled");if(Ct.log(t?"yes":"no"),!t)return;throw tt`
    <style>
      ${vt}
    </style>
  `,Lt}(),await async function(){location.href.includes("inssist-switch-to-fcs")&&(location.href=Et());if(!location.href.includes("/latest/"))return;await Q.send("chrome-bus","fb-api.switch-to-fcs"),location.href=Et({"inssist-switch-to-fcs":!0})}();const{someUserConnected:t}=await async function(){await o();const t=document.documentElement.innerHTML,e=t.toLowerCase();if(!location.href.includes("business.facebook.com/creatorstudio")||!(e.includes("bizsitepage")||e.includes("uicontextuallayerparent")||e.includes("emojiconfig")))return Ct.log("is user connected?"),Ct.log("no (not logged in)"),ct.user=null,{someUserConnected:!0};Ct.log("waiting for ig profiles data...");const i=t.split("<body")[1].split("requireLazy")[0];Ct.log(i);const r=window.inssist.schedule.requireModule,a=await r("MediaManagerInstagramProfilesDataStore",3e4);if(!a){let t;const e=mt.getLightweightPageHtml();throw t=e.includes("/checkpoint/")?"account locked":e.includes("/confirm_code/")?"fb code is required":'<div class="_3b5k" id="bizsitePageContainer"><div class="_6nx4"></div><div id="globalContainer" class="uiContextualLayerParent"><div id="u_0_1"></div></div></div>'===e?"empty html":e.includes('role="progressbar"')?"spinner":"unknown",mt.createError({message:`Unable to require MediaManagerInstagramProfilesDataStore within 30 seconds (${t})`})}Ct.log("ig profiles data received"),Ct.log("is user connected?");if(!await n((()=>{const t=a.getState().toJS();return!!(t&&t[0]&&t[0].value)})))throw mt.createError({message:"MediaManagerInstagramProfilesDataStore loading takes too long"});let s=null;const c=a.getState().toJS()[0].value;if(c.length>0){const t=await Q.send("schedule.get-ig-username");s=c.find((e=>e.username===t))||null}return ct.user=s,Ct.log(s?"yes":"no"),{someUserConnected:!0}}();!function(){const t=()=>{const t=R(It.welcome.acceptCookieButton);if(t&&document.body.innerHTML.includes('"_js_datr"')){const e=document.body.innerHTML.split('"_js_datr"')[1].split('"')[1].split('"')[0];document.cookie=`_js_datr=${e}; SameSite=None; Secure`,t.click(),location.reload()}if(!!R(It.general.cookieBannerTitle))return;const e=R(It.welcome.getStartedButton);e&&(e.click(),location.reload());const n=R(It.whatsNew.closeButton);n&&(n.click(),location.reload())};et(t),setTimeout((()=>{et.off(t)}),3e4)}();const e=!!ct.user;await Q.send("schedule.fcs-connection-status",e,{someUserConnected:t})}catch(t){t===Lt||(mt.isKnownError(t)?mt.sendError({message:t.message,details:t.details,critical:!0}):mt.sendError({message:"startup controller init: unknown error",details:{details:t},critical:!0}))}Ct.log("end"),At.resolve()},waitForInit:async function(){return At}};let It;const At=gt(),Lt=new Error("fallback enabled");let Dt;var kt=Dt={init:async function(){await xt.waitForInit();try{const t=await async function(){const t=it.controller.getConfig().fcs,e=await n((()=>window.requireLazy));if(!e)throw mt.createError({message:"initDispatcher: failed to get window.require"});const o=await new Promise((n=>{const o=setTimeout((()=>{n(null)}),15e3);e([t.MediaManagerDispatcher],(t=>{clearTimeout(o),n(t)}))}));if(!o)return null;const i=[],r=o.dispatch;return o.dispatch=(...t)=>{if(t[0])for(const e of i)e(t[0]);return r.call(o,...t)},{dispatch:o.dispatch,onDispatch:t=>{i.push(t)}}}();t&&(Dt.dispatch=t.dispatch,Dt.onDispatch=t.onDispatch)}catch(t){mt.isKnownError(t)?mt.sendError({message:t.message,details:t.details,critical:!0}):mt.sendError({message:"dispatch controller init: unknown error",details:{jsError:t},critical:!0})}Rt.resolve()},waitForInit:async function(){return Rt},main:{},composer:{}};const Rt=gt();async function Ft(t,...e){return new Promise((n=>{t(...e,n)}))}var $t=Object.assign((function(t,e={}){document.addEventListener("click",t,e)}),{off:function(t,e={}){document.removeEventListener("click",t,e)}});function Nt(t,e){let n;n="function"==typeof e?t.findIndex(e):t.indexOf(e),-1!==n&&t.splice(n,1)}var Bt='<style>\n\n* {\n  outline: none;\n}\n\n\n/* user selection option when creating new post */\n._7pqd {\n  opacity: 0;\n}\n\n\n/* page content */\n._1x52,\n#globalContainer {\n  visibility: hidden;\n}\n\n\n/* modal window */\n._59s7 {\n  max-width: calc(100% - 80px) !important;\n}\n\n\n/* edit post left panel */\n._7-i- {\n  padding-top: 0 !important;\n}\n\n\n/* hide content */\n._6uh1 ~ div {\n  visibility: hidden !important;\n}\n\n\n/* notification (e.g. "post saved") */\n._72sn {\n  display: none;\n}\n\n\n/* disable side panel animation */\n._92zt {\n  animation-duration: 0s !important;\n}\n\n\n/* extend table height */\n._rz-,\n.uiScrollableAreaContent > div {\n  height: 4500px !important; }\n\n\n/* disable active panel animation */\n#creator_studio_sliding_tray_root ._6lsf {\n  right: 0 !important; }\n\n\n/* uploading progress */\n._6eqo {\n  cursor: default !important;\n}\n\n/* uploading progress chevron icon */\n._6eqo i:last-child {\n  display: none;\n}\n\n\n/* noinspection CssNoGenericFontName */\n* { font-family: montserrat !important; }\n:root { --geodesic-type-font-family: montserrat !important; }\n:root { --geodesic-type-size-value-font-family: montserrat !important; }\nbody { overflow-x: hidden; }\nbody::-webkit-scrollbar { width: 0px; }\n\n\n/* ! posts panel container */\n#globalContainer > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2),\ndiv._1l9z {\n  margin: 0 !important; z-index: 100; }\n\n\n/*START*/\n/* left navigation panel and\n   top panel header with fb and ig tabs.\n   these are optional if posts container z-index is 100 */\n#mediaManagerGlobalChromeBar,\n._6uh1, /* header with fb and ig tabs */\n.p7k9k0yn.i6vn8ron /* header when authorized with new method */ {\n  display: none !important; }\n\n\n/* post status, time selector and search */\n#mediaManagerFilterAndSearch {\n  display: none; }\n\n\n/* table header with account selector and title */\n#instagramTabHeader {\n  visibility: hidden;\n  position: fixed;\n  left: -100000px; }\n\n\n/* media type tabs */\ndiv._450w {\n  display: none; }\n\n\n/* posts panel content */\ndiv._3wpv {\n  padding: 0px 8px !important; }\n\n\n/* prevent column clipping */\n#mediaManagerContentTable, div._6ynv {\n  min-width: 1070px !important; }\n\n\n/* --- */\n\n\n/* ! posts panel container,\n  only enable this if in post view mode to hide the table underneath */\n/* #globalContainer > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2), div._1l9z {\n     visibility: hidden !important; } */\n\n\n/* ! post details pop-over */\n#creator_studio_sliding_tray_root > div, div._6lsf {\n  max-width: 100% !important;\n  width: 100% !important; }\n\n\n/* pop-over header */\n#creator_studio_sliding_tray_root > div > div > div:nth-child(1) {\n  display: none !important; }\n\n\n/* pop-over frame and performance container */\n#creator_studio_sliding_tray_root > div > div > div:nth-child(2) {\n  overflow: auto !important; }\n\n\n/* pop-over post frame (left sub-panel) */\n#creator_studio_sliding_tray_root > div > div > div:nth-child(2) > div:nth-child(1), div._759f {\n  width: initial !important;\n  min-width: 500px !important;\n  overflow-x: hidden !important;\n  overflow-y: auto !important;\n  padding-left: 24px !important;\n  justify-content: flex-start !important;\n  display: flex !important;\n  flex-direction: column !important;\n  background-color: white !important; }\n#creator_studio_sliding_tray_root > div > div > div:nth-child(2) > div:nth-child(1) > div, div._75fk {\n  box-shadow: none !important;\n  border-radius: 0 !important;\n  background-color: transparent !important;\n  border: none !important; }\n#creator_studio_sliding_tray_root > div > div > div:nth-child(2) > div:nth-child(1) > div > div._3qn7._61-3._2fyi._3qng > span {\n  display: none !important }\n#creator_studio_sliding_tray_root div._74_-._75fl {\n  margin-left: 0 !important; }\n#creator_studio_sliding_tray_root div._75fm {\n  padding-left: 0 !important; }\n#creator_studio_sliding_tray_root > div > div > div:nth-child(2) > div:nth-child(1) > div > div._8525 {\n  max-width: 500px !important }\n\n\n/* pop-over post performance (right sub-panel) */\n#creator_studio_sliding_tray_root > div > div > div:nth-child(2) > div:nth-child(2), div._759g {\n  min-width: 300px;\n  border: none !important;\n  background-color: white !important;\n  min-height: unset !important; }\n\n\n/* pop-over post performance title */\n#creator_studio_sliding_tray_root > div > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(1), div._759g > div:nth-child(1) {\n  border-top: none !important;\n  border-bottom: none !important; }\n\n\n/* pop-over post performance content */\n#creator_studio_sliding_tray_root > div > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(2), div._759g > div:nth-child(2) {\n  border-top: none !important;\n  border-bottom: none !important;\n  margin-top: 0 !important; }\n\n\n/* pop-over post performance tray */\n#creator_studio_sliding_tray_root ._6qig {\n  height: 76px !important;\n  box-sizing: border-box;\n  padding: 0 24px !important; }\n/* #creator_studio_sliding_tray_root > div > div > div:nth-child(3) > button:nth-child(1), div._6qig > button:nth-child(1) {\n     margin-left: 16px !important; } */\n\n\n/* tray buttons */\ndiv.uiOverlayFooter a[action=\'cancel\'],\ndiv.uiOverlayFooter button[action=\'confirm\'],\n#creator_studio_sliding_tray_root button[type="button"] {\n  cursor: pointer !important;\n  font-weight: 600 !important;\n  /* Please make sure to apply a special xpath attribute rule for disabled buttons.\n     Facebook disables some buttons such GO TO POST button on an archived story.\n     Such buttons are styled inline and have a special style \'color: rgb(190, 195, 201)\'.\n     Clicking these buttons does nothing, so an attribute based xpath expression should\n     watch and hide them all-together. */\n  /* color: white !important;\n     background-color: #1BA2F9 !important; */\n  border: none !important;\n  font-size: 16px !important;\n  border-radius: 4px;\n  text-transform: uppercase !important;\n  margin-left: 8px;\n  margin-right: 8px;\n  color: white !important;\n  background-color: #1BA2F9 !important;\n  transition: 300ms cubic-bezier(0.23, 1, 0.32, 1) 0s; }\ndiv.uiOverlayFooter a[action=\'cancel\'][style*="background-color: rgb(176, 213, 255)"],\ndiv.uiOverlayFooter button[action=\'confirm\'][style*="background-color: rgb(176, 213, 255)"],\n#creator_studio_sliding_tray_root button[type="button"][style*="background-color: rgb(176, 213, 255)"] {\n  opacity: 0.5 !important;\n  pointer-events: none;\n}\n\n#creator_studio_sliding_tray_root button[type="button"]:hover {\n  filter: brightness(95%); }\n#creator_studio_sliding_tray_root button[type="button"]:active {\n  filter: brightness(90%); }\n\n\n/* --- */\n\n\n/* post cover image title */\ndiv._7-i2 > span {\n  display: none !important; }\ndiv._7-i2 > div {\n  margin-top: 0 !important; }\n\n\n/* post caption input */\ndiv._7-2a._5yk1 {\n  overflow: auto !important; }\n\n\n/* --- */\n\n\n/* add content mini popup */\ndiv.uiContextualLayer.uiContextualLayerBelowLeft > div > div > div > div {\n  padding-bottom: 12px !important; }\ndiv.uiContextualLayer.uiContextualLayerBelowLeft > div > div > div > a {\n  display: none !important; }\n\n'.replace("<style>",""),qt={init:async function(){Ht=it.controller.getConfig().fcsSelectors,await kt.waitForInit(),et((()=>{ct.selectedPostId&&R(Ht.sidePanel.captionTextarea)&&setTimeout((()=>{const t=lt.getCaption();Ut[ct.selectedPostId]=t}))})),Q.on("schedule.set-caption",jt)},restoreCaptionForCurrentPost:async function(){if(!ct.selectedPostId)return;const t=Ut[ct.selectedPostId];if(t)return void jt(t);const e=await Q.send("schedule.get-post",ct.selectedPostId);"local"===e.source&&e.caption&&jt(e.caption)}};let Ht;const Ut={};function jt(t,{force:e=!1}={}){"string"==typeof t&&lt.setCaption(t,{force:e})}var Gt={init:async function(){if(zt=it.controller.getConfig().fcsSelectors,Vt=it.controller.getConfig().fcs,ne(),oe(),Q.on("schedule.fcs-go-to",Wt),Q.on("schedule.fcs-open-post",Yt),Q.on("schedule.fcs-open-new-post-form",Jt),Q.on("schedule.fcs-refresh-data",ee),Q.on("schedule.fcs-refresh-page",Xt),Q.on("schedule.fcs-check-critical-vars",Kt),Q.on("schedule.fcs-wait-upload",Qt),Q.on("schedule.fcs-submit-composer",Zt),await xt.waitForInit(),await kt.waitForInit(),!ct.user)return;await async function(){if(await Q.send("schedule.is-debug-enabled"))return;tt`
    <style>
      ${Bt}

      ${zt.sidePanel.mediaPreviewControls} {
        height: auto !important;
      }

      ${zt.sidePanel.save} {
        max-width: none;
      }

      ${zt.sidePanel.loadingOverlay} {
        background: #FFF !important;
      }
      .theme-night ${zt.sidePanel.loadingOverlay} {
        background: #D4D5D9 !important;
      }

      ${zt.sidePanel.postPerformancePane} {
        background: transparent;
      }

      .MediaManagerInstagramPostPreview {
        width: 100%;
      }

      html.is-igtv ${zt.sidePanel.editPostButton} {
        display: none;
      }
    </style>
  `}(),tt`
    <style>
      ::-webkit-scrollbar {
        display: none;
      }
    </style>
  `,tt`
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


      .theme-night ${zt.sidePanel.postPreviewCaption} {
        filter: url(#theme-reverse-filter);
      }
      .theme-night ${zt.sidePanel.postPreviewCaption},
      .theme-night ${zt.sidePanel.postPreviewCaption} * {
        color: #D4D7D9 !important;
      }
      .theme-night ${zt.sidePanel.postPreviewCaption} a {
        color: #728FC9 !important;
      }

      .theme-night ${zt.sidePanel.mediaPreviewContainer} {
        background: #FFF;
      }

      .theme-night ${zt.sidePanel.mediaPreviewControls} {
        filter: url(#theme-reverse-filter);
      }
    </style>
  `,tt`
    <style>
      ${zt.sidePanel.locationRoot} {
        user-select: none;
        cursor: pointer;
        width: 502px;
      }
    </style>
  `,$t((t=>{if(!t.target.closest(zt.sidePanel.locationRoot))return;const e=R(zt.sidePanel.locationInput);e?e.focus():mt.sendError({message:"upgradeAddLocationButton: failed to find location input"})})),tt`
    <style>
      ${zt.sidePanel.goToPostButton} {
        font-size: 16px !important;
        font-weight: 600;
        text-transform: uppercase;
      }
      ${zt.sidePanel.goToPostButton} * {
        font-family: inherit !important;
      }

      ${zt.sidePanel.doneButton} {
        display: none;
      }

      ${zt.sidePanel.editPostButton} {
        max-width: none !important;
      }
    </style>
  `,et((()=>{F(zt.confirmDialog.yes).forEach((t=>{t.click()}))})),et((()=>{F(zt.tooltip.bubble).forEach((t=>{const e=t.closest(zt.tooltip.root);if(!e)return;const n=t.closest(zt.tooltip.bubbleWrap);if(!n)return;const o=R(`#${e.dataset.ownerid}`);if(!o)return;const i=o.getBoundingClientRect();if(i.left<150&&n.classList.contains("uiContextualLayerLeft")){n.classList.remove("uiContextualLayerLeft"),n.classList.add("uiContextualLayerRight"),n.style.left=0,n.style.right=null,e.style.left=`${i.left+i.width}px`,e.style.right=null;const o=t.offsetWidth,r=t.offsetHeight;if(o>r)return;t.style.width=`${Math.round(.75*r)}px`}}))})),async function(){const t=window.inssist.schedule.requireModule,e=await t(Vt.MediaManagerDispatcher),n=e.dispatch;e.dispatch=(...t)=>{const o=t[0];if(o.type!==Vt.CLOSE_COMPOSER||o.fromInssist)return n.call(e,...t)}}(),ft.onRequest((({xhr:t,url:e,query:n,modifyUrl:o})=>{if(!e.includes(Vt["/media_manager/content_library"])&&!e.includes(Vt["/media_manager/media_manager_instagram_content"]))return;const i=new URL(e),r=n[Vt.post_type];r===Vt.POST_TYPE_IGTV?(i.searchParams.set(Vt.post_status,Vt.POST_STATUS_DRAFT),i.searchParams.set(Vt.limit,1),o(i.toString())):r===Vt.POST_TYPE_VIDEOS?(i.searchParams.set(Vt.post_type,Vt.POST_TYPE_ALL),i.searchParams.set(Vt.post_status,Vt.POST_STATUS_PUBLISHED),i.searchParams.set(Vt.limit,100),o(i.toString())):r===Vt.POST_TYPE_PHOTOS?(i.searchParams.set(Vt.post_type,Vt.POST_TYPE_ALL),i.searchParams.set(Vt.post_status,Vt.POST_STATUS_SCHEDULED),i.searchParams.set(Vt.limit,500),o(i.toString())):r===Vt.POST_TYPE_CAROUSELS&&(i.searchParams.set(Vt.post_type,Vt.POST_TYPE_ALL),i.searchParams.set(Vt.post_status,Vt.POST_STATUS_DRAFT),i.searchParams.set(Vt.limit,500),o(i.toString()))})),await async function(t){const e=window.inssist.schedule.requireModule,n=await e(Vt.immutable);kt.dispatch({type:Vt.SELECT_IG_PROFILES,[Vt.selectedProfileIDs]:n.List([t.id])})}(ct.user),ie(),kt.onDispatch((t=>{t.type===Vt.TOGGLE_CROSSPOST_TO_FACEBOOK_CHECKBOX&&(ct.crosspostToFb=t.value)})),kt.onDispatch((t=>{t.type===Vt.CONTENT_TABLE_REFRESH_ROWS_FINISHED&&Object.values(t[Vt.rowsByIDs]).forEach((t=>{Nt(ct.allPosts,(e=>e.id===t.id)),ct.allPosts.push(t)}))})),kt.onDispatch((t=>{if(t.type!==Vt.PUSH_NOTIFICATION)return;if(!(Vt.isSuccess in t[Vt.notificationData]))return;if(t[Vt.notificationData][Vt.isSuccess])return;const e=t[Vt.notificationData][Vt.notificationDataLabel].toString();Q.send("schedule.fcs-notification-error-appeared",{postId:ct.selectedPostId,errorText:e})})),function(){const t=Symbol("handled");et((()=>{const e=R(zt.sidePanel.editPostBottomRow);e&&(e[t]||ct.selectedPostId&&(e[t]=!0,e.insertAdjacentHTML("afterbegin",'\n      <button class="delete-post-button">\n        <svg class="delete-post-button__icon" width="14" height="14" viewBox="0 0 14 14">\n          <path fill="none" d="M0 0h14v14H0z"/>\n          <path d="M3.099 14a.74.74 0 0 1-.779-.652L1.8 3.772h9.874l-.52 9.576a.74.74 0 0 1-.779.652zM.965 2.824V1.287A.489.489 0 0 1 1.454.8h3.357V.163A.163.163 0 0 1 4.974 0H8.5a.163.163 0 0 1 .165.163V.8h3.357a.489.489 0 0 1 .489.489v1.535z" fill="currentColor"/>\n        </svg>\n        <span class="delete-post-button__label">\n          DELETE POST\n        </span>\n      </button>\n    ')))})),$t((t=>{t.target.closest(".delete-post-button")&&Q.send("schedule.delete-post",ct.selectedPostId)})),tt`
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
  `}(),function(){const t=Symbol("handled");et((()=>{const e=R(zt.general.headerMessageIconContainer);if(!e)return;if(e[t])return;e[t]=!0;e.parentElement.style.display="none"}))}(),ee()}};let zt,Vt;function Wt(t){location.href=t}async function Yt(t,{isIgtv:e=!1}={}){document.documentElement.classList.toggle("is-igtv",e);const n=window.inssist.schedule.requireModule,o=await n(Vt.queryIGMediaData),i=await n(Vt.MediaManagerInstagramContentActions);await te(),ct.selectedPostId=t;const r=await Ft(o,t);"POSTED"===r.postStatus?(i.setShouldShowPostDetailTray(!0,r),qt.restoreCaptionForCurrentPost()):(await ie(),i.editPost(r),qt.restoreCaptionForCurrentPost())}async function Jt({postMode:t="publish",localPostId:e=null,localPostFiles:n=[]}){const o=Jt;document.documentElement.classList.toggle("is-igtv",!1),ct.crosspostToFb=!1,ct.selectedPostId=e||null,await te();const i=window.inssist.schedule.requireModule;await ie();(await i(Vt.MediaManagerInstagramComposerRootActions)).openComposer(Vt.IG_FEED_ORGANIC),kt.dispatch({type:Vt.SELECT_INSTAGRAM_ACCOUNT,instagramAccount:ct.user}),kt.dispatch({type:Vt.SWITCH_POST_MODE,[Vt.isEditComposer]:!1,[Vt.postMode]:t}),qt.restoreCaptionForCurrentPost(),0!==n.length&&(clearTimeout(o.timeout),o.timeout=setTimeout((()=>{kt.dispatch({type:Vt.FILES_ADDED,[Vt.files]:n})}),200))}function Xt(){location.href=Et()}async function Kt(){return!!window.require}async function Qt(){const t=window.inssist.schedule.requireModule,e=await t(Vt.MediaManagerInstagramComposerUploadStore);return await new Promise((t=>{const n=setInterval((()=>{const o=e.getState().toJS(),i=o.isUploadFailed,r=o.isUploadFinished;i?(clearInterval(n),t(!1)):r&&(clearInterval(n),t(!0))}),500)}))}function Zt(){kt.dispatch({type:"PUBLISH_MEDIA"})}async function te(){const t=window.inssist.schedule.requireModule;(await t(Vt.MediaManagerInstagramContentActions)).setShouldShowPostDetailTray(!1),kt.dispatch({type:Vt.SHOW_EXIT_COMPOSER_CONFIRM_DIALOG}),kt.dispatch({type:Vt.CLOSE_COMPOSER,fromInssist:!0})}function ee(){const t=ee;t.init||(t.init=!0,t.lastPostCount=0,kt.onDispatch((e=>{if(t.refreshing&&e.type===Vt.SET_CONTENT_LIBRARY_DATA){const n=e.queryParameters.toJS().postType;if(!(n===Vt.POST_TYPE_IGTV||n===Vt.POST_TYPE_VIDEOS||n===Vt.POST_TYPE_PHOTOS||n===Vt.POST_TYPE_CAROUSELS))return;if(n===Vt.POST_TYPE_IGTV)return void kt.dispatch({type:Vt.SELECT_CONTENT_TABLE,contentTable:Vt.INSTAGRAM_VIDEO_POSTS,source:Vt.instagram_content_library_posts});n===Vt.POST_TYPE_VIDEOS&&kt.dispatch({type:Vt.SELECT_CONTENT_TABLE,contentTable:Vt.INSTAGRAM_PHOTO_POSTS,source:Vt.instagram_content_library_posts}),n===Vt.POST_TYPE_PHOTOS&&kt.dispatch({type:Vt.SELECT_CONTENT_TABLE,contentTable:Vt.INSTAGRAM_CAROUSEL_POSTS,source:Vt.instagram_content_library_posts});const o=e.data.data.toJS();for(const t of o)Nt(ct.allPosts,(e=>e.id===t.id)),ct.allPosts.push(t);if(n===Vt.POST_TYPE_CAROUSELS){if(t.lastPostCount-ct.allPosts.length>3)return t.lastPostCount=0,t.refreshing=!1,void ee();t.lastPostCount=ct.allPosts.length,Q.send("schedule.apply-fcs-posts",ct.allPosts),t.refreshing=!1}}}))),t.refreshing||(ct.allPosts.length=[],t.refreshing=!0,kt.dispatch({type:Vt.SELECT_CONTENT_TABLE,contentTable:Vt.INSTAGRAM_IGTV_POSTS,source:Vt.instagram_content_library_posts}),kt.dispatch({type:Vt.REFRESH_TAB,tab:Vt.instagram_content_posts}))}function ne(){et((()=>{F("video").forEach((t=>{t.hasAttribute("autoplay")&&(t.pause(),t.removeAttribute("autoplay"))}))}),!0)}function oe(){history.pushState=history.replaceState}async function ie(){const t=window.inssist.schedule.requireModule,e=await t(Vt.MediaManagerLazyLoadActions);await Ft(e.lazyLoadSection,Vt.INSTAGRAM_COMPOSER)}var re={init:async function(){if(await xt.waitForInit(),await kt.waitForInit(),!ct.user)return;ae=it.controller.getConfig().fcsSelectors,se=it.controller.getConfig().fcs,$t((t=>{t.target.closest(ae.upload.root)&&(t.target.closest("input")||t.target.closest("button")||ce(R(ae.upload.button)))})),tt`
    <style>
      ${ae.upload.root} {
        border-radius: 7px;
        user-select: none;
        cursor: pointer;
      }
      ${ae.upload.buttonWrap} {
        display: none;
      }
    </style>
  `,function(){const t=Symbol("handled");et((()=>{const e=R(ae.upload.addContentButton);if(!e)return;const n=R(ae.sidePanel.mediaList);if(!n)return;const o=R(".add-media");o&&(o.style.display=n.childElementCount<10?null:"none"),n[t]||0!==n.childElementCount&&(n[t]=!0,n.insertAdjacentHTML("afterend",'\n      <div></div>\n      <button class="add-media" type="button">\n        <div class="add-media__icon">+</div>\n        ADD CONTENT\n      </button>\n    '),R(".add-media").addEventListener("click",(()=>{ce(e)})))})),tt`
    <style>
      ${ae.upload.addContentButtonWrap} {
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
  `}(),tt`
    <style>
      ${ae.sidePanel.coverSelectionRadioBox} {
        position: relative;
        top: 2px;
      }
    </style>
  `,et((()=>{F(ae.sidePanel.uploadingVideo).forEach((t=>{t.controls=!0}))})),tt`
    <style>
      ${ae.sidePanel.uploadingVideoPlayButton} {
        display: none !important;
      }

      ${ae.sidePanel.uploadingVideoCustomControls} {
        display: none !important;
      }
    </style>
  `,function(){const t=Symbol("handled");et((()=>{F(ae.sidePanel.mediaPreviewVideo).forEach((e=>{e[t]||(e[t]=!0,e.setAttribute("disablePictureInPicture",""),e.setAttribute("controlslist","nodownload"))}))})),tt`
    <style>
      ${ae.sidePanel.mediaPreviewVideo}::-webkit-media-controls-fullscreen-button {
        display: none;
      }
    </style>
  `}(),function(){const t=Symbol("handled");et((()=>{const e=R(".add-media");if(!e)return;const n=R(ae.sidePanel.mediaList);if(!n)return;const o=R(".reverse-media-list-button");if(o&&(o.style.display=n.childElementCount>1?null:"none"),e[t])return;e[t]=!0,e.insertAdjacentHTML("afterend",'\n      <button class="reverse-media-list-button" type="button">\n        <span class="reverse-media-list-button__icon">↪︎</span>\n        REVERSE\n      </button>\n    ');R(".reverse-media-list-button").addEventListener("click",(async()=>{try{const t=window.inssist.schedule.requireModule,e=(await t(se.MediaManagerInstagramComposerUploadStore)).getState().toObject().fileMap.toObject(),n=Object.keys(e);if(n.length<2)return;n.forEach(((t,e)=>{kt.dispatch({type:se.SUBMIT_MEDIA_ORDER,[se.mediaOrderId]:t,[se.prevIndex]:0,[se.newIndexString]:String(n.length-e),[se.totalMedia]:n.length})}))}catch(t){console.error("schedule injection media controller →","addReverseMediaButton",t)}}))})),tt`
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
  `}(),async function(){const t=window.inssist.schedule.requireModule,e=await t(se.ImageExifRotation);if(!e)return;e.getRotation=(t,e)=>(e&&"function"==typeof e&&e(0),0)}()}};let ae,se;function ce(t){t||mt.throwError({message:"startUpload: failed to find upload button"}),t.click();const e=R(ae.upload.input);e||mt.throwError({message:"startUpload: failed to find upload input"});const n=e.closest(ae.tooltip.root);n||mt.throwError({message:"startUpload: failed to find upload tooltip"}),n.style.opacity=0,n.style.pointerEvents="none",e.click()}var le={init:async function(){de=it.controller.getConfig().fcsSelectors,Q.on("schedule.connect-via-fb",ue),Q.on("schedule.connect-via-ig",pe)}};let de;async function ue(){if(await kt.waitForInit(),!kt.dispatch)return{error:"failed-to-init-dispatcher"};const t=await n((()=>R(".MediaManagerInstagramContentPostsTabContainer")||R('[role="tab"][aria-selected="true"]')?"content":R(".MediaManagerInstagramOnboardingScreen")?"welcome":null));if(!t)return{error:"failed-to-detect-page-type"};"content"===t&&(kt.dispatch({type:"SELECT_TAB",tab:"instagram_accounts",source:"left_nav"}),await n((()=>location.href.includes("instagram_accounts"))),await n((()=>R(".MediaManagerInstagramTabHeaderContainer")))),kt.dispatch({type:"SET_SHOW_INSTAGRAM_ONBOARDING_DIALOG",shown:!0}),await n((()=>R(".MediaManagerInstagramAccountPermissionMessageDialog")));const e=await new Promise((t=>{let e;const o=window.open;window.open=(i,r,a)=>{if(!i.includes("/oauth/authorize/"))return o(i,r,a);(async()=>{a=fe();const s=o(i,r,a);window.open=o,await n((()=>s.closed)),e=setTimeout((()=>{t({error:"auth-window-closed-by-user"})}),5e3)})()};const i=window.require("ReloadPage"),r=i.now;i.now=()=>{clearTimeout(e),i.now=r,t({success:!0})},kt.onDispatch((n=>{clearTimeout(e),"SET_LOGIN_INSTAGRAM_ACCOUNT_SUCCESS"===n.type&&t({error:"not-connected-to-fb-page"})})),kt.dispatch({type:"AUTHENTICATE_INSTAGRAM_USER"})}));return kt.dispatch({type:"SELECT_TAB",tab:"instagram_content",source:"left_nav"}),await n((()=>location.href.includes("instagram_content"))),e}async function pe(){if(await kt.waitForInit(),!kt.dispatch)return{error:"failed-to-init-dispatcher"};if(R(de.general.fbLoginRequiredContainer))return{error:"failed-to-skip-fb-login"};return await new Promise((t=>{let e;const o=window.open;window.open=(i,r,a)=>{if(!(i=i.toString()).includes("/oauth/authorize/"))return o(i,r,a);(async()=>{a=fe();const s=o(i,r,a);window.open=o,await n((()=>s.closed)),e=setTimeout((()=>{t({error:"auth-window-closed-by-user"})}),5e3)})()};const i=window.require("URI"),r=i.goURIOnWindow;i.goURIOnWindow=(...n)=>{clearTimeout(e),i.goURIOnWindow=r,t({success:!0})},kt.dispatch({type:"IG_AUTHENTICATION_LOG_IN"})}))}function fe(){return`scrollbars,top=${Math.round(screen.height/2-350)},left=${Math.round(screen.width/2-300)},width=600,height=700`}var he={init:async function(){if(ge=it.controller.getConfig().fcsSelectors,me=it.controller.getConfig().fcs,await xt.waitForInit(),await kt.waitForInit(),!ct.user)return;(function(){let t,e;et((()=>{t=F(ge.sidePanel.mediaPreview),e=R(ge.sidePanel.mediaPreviewVideo)})),ft.onRequest((({url:n,onResponse:o})=>{if(!function(t){return t.includes(me["/media/manager/instagram_composer/create_post"])}(n))return;let i,r;i=t.length>1?"carousel":e?"video":"photo",t.length>0?r=t[0].getAttribute("src"):console.error("failed to find media preview image"),Q.send("schedule.fcs-create-post-request",{type:i,image:r,crosspostToFb:ct.crosspostToFb,localPostId:ct.selectedPostId||null}),o((()=>{Q.send("schedule.fcs-create-post-response",{image:r})}))})),ft.onRequest((({url:t,query:e,onResponse:n})=>{if(!function(t){return t.includes(me["/media/manager/instagram_media/edit/save"])}(t))return;const o=ct.selectedPostId;let i,r;"true"===e[me["edit_data[save_as_draft]"]]?(i=null,r="draft"):"true"===e[me["edit_data[save_as_scheduled]"]]?(i=_e,r="scheduled"):(i=null,r="posted"),Q.send("schedule.fcs-edit-post-request",{postId:o,status:r,on:i}),n((t=>{Q.send("schedule.fcs-edit-post-response",{postId:o,status:r})}))}))})(),function(){const t=me.MIN_MINUTES_FROM_NOW;tt`
    <style>
      ${ge.dateDialog.root} {
        position: fixed;
        left: 10000px;
      }
    </style>
  `;let e=!1;et((()=>{const t=R(ge.dateDialog.rootOpen);(!e&&t||e&&!t)&&(e=!e,Q.send("schedule.fcs-date-dialog-toggled",e))}));const n=Symbol("handled");et((()=>{const e=R(ge.sidePanel.save);e&&(e[n]||e.nextElementSibling&&(e[n]=!0,e.addEventListener("click",(e=>{const n=Date.now()+t*wt;"schedule"===ye&&(!_e||_e<n)&&(e.preventDefault(),e.stopPropagation(),Q.send("schedule.fcs-date-dialog-invalid-time"))}),!0)))}))}(),async function(){const t=async()=>await Q.send("schedule.has-pro"),e=Symbol("handled");et((()=>{const n=R(ge.sidePanel.save);if(!n)return;if(n[e])return;n[e]=!0;let o=!0;n.addEventListener("click",(e=>{o?(e.preventDefault(),e.stopPropagation(),(async()=>{if(await t())return o=!1,void n.click();const e=R(ge.sidePanel.dateDialogTrigger);e&&e.click(),Q.send("schedule.show-upsell")})()):o=!0}),!0)}))}(),Q.on("schedule.fcs-date-dialog-get-timezone",be),Q.on("schedule.fcs-date-dialog-select-option",we),Q.on("schedule.fcs-date-dialog-set-selected-option",ve),Q.on("schedule.fcs-date-dialog-set-publish-time",Se)}};let ge,me,_e=null,ye=null;function be(){const t=window.require(me.DateTime).localNow().getTimezoneID();return window.require(me.TimezoneNamesData).zoneNames[t]}function we(t){const e={"publish-now":me.postModePublish,"save-as-draft":me.postModeDraft,schedule:me.postModeSchedule}[t],n={type:me.SWITCH_POST_MODE,[me.postMode]:e};kt.dispatch({...n,[me.isEditComposer]:!1}),kt.dispatch({...n,[me.isEditComposer]:!0})}function ve(t){ye=t}function Se(t){if(_e=t,!_e)return;const e={type:me.SELECT_SCHEDULED_DATE,[me.scheduledDate]:new Date(_e)};kt.dispatch({...e,[me.isEditComposer]:!1}),kt.dispatch({...e,[me.isEditComposer]:!0})}var Te={init:async function(){if(await xt.waitForInit(),await kt.waitForInit(),!ct.user)return;Pe=it.controller.getConfig().fcsSelectors,Ee=it.controller.getConfig().fcs,tt`
    <style>
      ${Pe.postToFb.root} {
        display: none;
      }
    </style>
  `;const t=ct.user.connectedPageInfo;if(!t)return;t.url=`https://facebook.com/${t.name}-${t.id}`;t.name.toLowerCase().startsWith("inssist:")||(function(t){const e=Symbol("handled");et((()=>{const t=R(Pe.postToFb.checkboxRow);if(!t)return;const e=!!R(Pe.sidePanel.mediaList);t.style.opacity=e?null:.5}),!0),et((()=>{const n=R(Pe.postToFb.title);n&&!n[e]&&(n[e]=!0,n.innerText="Clone to Facebook");const o=R(Pe.postToFb.body);o&&!o[e]&&(o[e]=!0,o.innerHTML=`\n        <div class="post-to-fb__text">\n          Post will be cloned to Facebook Page. Facebook posts\n          can be managed separately from the\n          <a\n            class="post-to-fb__link"\n            href="${t.url}/publishing_tools"\n            target="_blank">\n            Facebook Publishing Tools</a>.\n        </div>\n      `)}),!0),et((()=>{const t=R(Pe.postToFb.checkboxRow);if(!t)return;if(t[e])return;t[e]=!0;const n=R(Pe.postToFb.checkboxButton);n&&t.addEventListener("click",(t=>{t.target.closest(Pe.postToFb.checkboxButton)||n.click()}))})),tt`
    <style>
      html ${Pe.postToFb.root} {
        display: block;
        margin-top: 40px;
        padding-bottom: 80px;
      }

      html ${Pe.postToFb.publishTypeButton} {
        display: none;
      }

      ${Pe.postToFb.checkboxRow} {
        margin-top: 10px;
        margin-left: -7px;
        cursor: pointer;
        user-select: none;
      }

      ${Pe.postToFb.checkboxButton} {
        background: transparent !important;
        border: 1px solid #DADDE1 !important;
      }
      .theme-night ${Pe.postToFb.checkboxButton} {
        border-color: #464646 !important;
      }

      ${Pe.postToFb.checkboxText} {
        pointer-events: none;
      }

      ${Pe.postToFb.body} {
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
  `}(t),function(){let t,e;Q.on("schedule.fcs-date-dialog-set-selected-option",(e=>{t=e,n()})),Q.on("schedule.fcs-date-dialog-set-publish-time",(t=>{e=t,n()})),kt.onDispatch((t=>{t.type===Ee.TOGGLE_CROSSPOST_TO_FACEBOOK_CHECKBOX&&n()}));const n=()=>{"save-as-draft"===t?kt.dispatch({type:Ee.SWITCH_CROSSPOST_POST_MODE,[Ee.postMode]:Ee.postModeDraft}):"publish-now"===t?kt.dispatch({type:Ee.SWITCH_CROSSPOST_POST_MODE,[Ee.postMode]:Ee.postModePublish}):"schedule"===t&&(kt.dispatch({type:Ee.SWITCH_CROSSPOST_POST_MODE,[Ee.postMode]:Ee.postModeSchedule}),e&&kt.dispatch({type:Ee.SELECT_CROSSPOST_SCHEDULED_DATE,[Ee.scheduledDate]:new Date(e)}))}}(),function(t){const e=Symbol("handled");et((async()=>{const n=R(".delete-post-button");if(!n)return;if(n[e])return;n[e]=!0;const o=await Q.send("schedule.get-post",ct.selectedPostId);if(!o)return;if(!o.crosspostToFb)return;let i;i="draft"===o.status?`${t.url}/publishing_tools?section=DRAFTS`:"scheduled"===o.status?`${t.url}/publishing_tools?section=SCHEDULED_POSTS`:`${t.url}/publishing_tools`,n.insertAdjacentHTML("afterend",`\n      <a\n        class="manage-fb-posts-link"\n        href="${i}"\n        target="_blank">\n        MANAGE FACEBOOK POSTS\n      </a>\n      <div style="flex-grow: 1"></div>\n    `)}),!0),tt`
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
  `}(t))}};let Pe,Ee;function Ce(t,e=null){try{const n=t();return n instanceof Promise?new Promise(((t,o)=>{n.then(t).catch((n=>{n&&console.error(n),t(e)}))})):n}catch(t){return console.error(t),e}}var Oe={init:async function(){Me=it.controller.getConfig().fcsSelectors,function(){const t=XMLHttpRequest.prototype.open;XMLHttpRequest.prototype.open=function(...e){const n=e[1];return(null==n?void 0:n.includes("/media/manager/instagram_composer/video_upload/"))&&(xe.uploadRequestStarted=!0,xe.uploadResponseTexts=[],this.addEventListener("readystatechange",(()=>{xe.uploadResponseTexts.push(this.responseText||"")}))),t.call(this,...e)}}(),function(){let t=null;et((()=>{const e=R(Me.sidePanel.uploadProgress);if(e){if("99.9%"===e.innerText){if(t)return;t=setInterval((()=>{document.body.contains(e)?Q.send("chrome-bus","schedule.upload-99",function(){const t=window.require;return{gkx:Ce((()=>t("gkx")("1509806")),"failed"),asyncUpload:Ce((()=>t("killswitch")("MEDIA_MANAGER_INSTAGRAM_ASYNC_UPLOAD")),"failed"),requestOption:Ce((()=>t("AsyncRequest").toString().split("this.option=")[1].split("}")[0]+"}"),"failed"),uploadResponseTexts:xe.uploadResponseTexts,uploadRequestStarted:xe.uploadRequestStarted}}()):(clearInterval(t),t=null,xe.uploadRequestStarted=!1)}),1e3)}if("100%"===e.innerText){if(!t)return;clearInterval(t),t=null,xe.uploadRequestStarted=!1,Q.send("chrome-bus","schedule.upload-100")}}}))}()}};let Me;const xe={uploadResponseTexts:[],uploadRequestStarted:!1};var Ie={init:async function(){const t=window.inssist.schedule.requireModule;if(Ae=await t("MediaManagerDispatcher"),Le=await t("MediaManagerMediaCroppingActions"),De=await t("MediaManagerMediaCroppingRatioSettings"),ke=await t("MediaManagerMediaCroppingDialogCropBox.react"),!(Ae&&Le&&De&&ke))return;(async function(){const t=Le.openDialog;Le.openDialog=(...e)=>{try{const t=e[4];t.push(De.FREEFORM),t[0].label="1:1",t[1].label="1.91:1",t[2].label="4:5",t[3].label="Any",t[3].description="Choose any aspect ratio from 1.91:1 to 4:5."}catch(t){console.error("failed to patch ratio options",t)}return t.call(Le,...e)}})(),function(){let t;const e=ke.prototype.render;ke.prototype.render=function(...n){return t=this,e.call(this,...n)};const n=Ae.dispatch;Ae.dispatch=e=>{if("MEDIA_CROPPING_DIALOG_SET_DIMENSIONS"===e.type)try{const n=e.dimensions,o=n.width/n.height;if(o<.8){const e=Math.floor(n.width/.8);n.height=e,t.setState({height:e})}else if(o>1.91){const e=Math.floor(1.91*n.height);n.width=e,t.setState({width:e})}}catch(t){console.error("failed to automatically adjust ratio",t)}return n.call(Ae,e)}}()}};let Ae,Le,De,ke;var Re={ctx:ct,utils:lt,controller:{init:async function(){window.ctx=ct,ft.init(),Ct.init(),kt.init(),xt.init(),le.init(),Gt.init(),re.init(),he.init(),Te.init(),qt.init(),Oe.init(),Ie.init()}},dispatchController:kt};var Fe={controller:{init:function(){}}};let $e;function Ne(t){Re.utils.setCaption(t)}var Be={controller:{init:async function(){if($e=it.controller.getConfig().fcsSelectors,Q.on("tag-assist.fcs-set-caption",Ne),await Re.dispatchController.waitForInit(),!Re.ctx.user)return;(async function(){Re.dispatchController.onDispatch((t=>{"OPEN_COMPOSER"===t.type||"CONTENT_INSTAGRAM_EDIT_POST"===t.type?Q.send("tag-assist.fcs-composer-opened"):"CLOSE_COMPOSER"===t.type&&Q.send("tag-assist.fcs-composer-closed")}))})(),async function(){let t=null;const e=()=>{const e=Re.utils.getCaption();e!==t&&(t=e,Q.send("tag-assist.fcs-caption-change",e))},n=Symbol("handled");et((()=>{const t=R($e.sidePanel.captionTextarea);t&&(e(),t[n]||(t[n]=!0,t.addEventListener("input",e),t.addEventListener("keydown",e)))}))}()}}};let qe,He;function Ue(t){chrome.tabs.create({url:t,active:!0})}var je={controller:{init:function(){if(qe=!!window.electron,He=t.isIframe()&&t.getParams().isElectron,!qe&&!He)return;qe&&Q.on("electron-links.open-url",Ue);document.addEventListener("click",(t=>{const e=t.target.closest("a");if(!e)return;if("_blank"!==e.getAttribute("target"))return;const n=e.getAttribute("href");n.startsWith("/")||(t.preventDefault(),t.stopPropagation(),He?Q.send("electron-links.open-url",n):Ue(n))}),{capture:!0})}}};({init:async function(){je.controller.init(),t.isIframe("inssist-fcs")&&(await o(),st.init(),Fe.controller.init(),Re.controller.init(),Be.controller.init())}}).init()}();