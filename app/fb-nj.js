!function(){function t(t){return Array.isArray(t)?t:[t]}function e(e,n=document){e=t(e);for(const t of e){const e=n.querySelector(t);if(e)return e}return null}function n(e,n=document){e=t(e);const o=[];for(const t of e){const e=n.querySelectorAll(t);for(const t of e)o.includes(t)||o.push(t)}return o}const o=36e5,i=864e5;var r={SECOND:1e3,MINUTE:6e4,HOUR:o,DAY:i,WEEK:6048e5,MONTH:26784e5};var a={createName:function(t,e){return`${t}|${JSON.stringify(e)}`},getName:s,getParams:function(){return function(t){try{return JSON.parse(t)}catch(t){return null}}(window.self.name.split("|")[1])||{}},isIframe:function(t=null){return window.self!==parent&&(!t||s()===t)}};function s(){return window.self.name.split("|")[0]||null}async function c(t,e=null){let n,o;return"number"==typeof e?(n=e,o=100):e?(n=e.timeout||3e4,o=e.frequency||100):(n=3e4,o=100),new Promise(((e,i)=>{const r=t();if(r)return void e(r);const a=setInterval((()=>{const n=t();n&&(clearInterval(a),e(n))}),o);setTimeout((()=>{clearInterval(a),e(null)}),n)}))}var l=Object.assign((function(t,e={}){document.addEventListener("click",t,e)}),{off:function(t,e={}){document.removeEventListener("click",t,e)}});var d=Object.assign((function(t,e=!1){0===u.length&&(p=new MutationObserver((t=>{for(const e of u){p.disconnect();try{e(t)}catch(t){console.error("onDocMutations",t)}if(!p)return;p.observe(document.documentElement,{attributes:!0,childList:!0,subtree:!0})}})),p.observe(document.documentElement,{attributes:!0,childList:!0,subtree:!0}));u.push(t),e&&t()}),{off:function(t){const e=u.indexOf(t);if(-1===e)return;u.splice(e,1),0===u.length&&(p.disconnect(),p=null)}});const u=[];let p;function f(e,...n){let o=0;return e.join("###").split(",").join("\n,\n").split("{").join("\n{").split("\n").map((e=>{if(!e.includes("###"))return e;const i=t(n[o]).map((t=>e.split("###").join(t))).join(",\n");return o+=1,i})).join("\n").split(";").join(" !important;").replace(/!important\s*!important/g,"!important")}function h(...t){const e=f(...t);document.head.insertAdjacentHTML("afterbegin",e)}var m={};Object.assign(m,{$:e,$$:n,safe:function(t,e=null){try{const n=t();return n instanceof Promise?new Promise(((t,o)=>{n.then(t).catch((n=>{n&&console.error(n),t(e)}))})):n}catch(t){return console.error(t),e}},waitFor:c,callAsync:async function(t,...e){return new Promise((n=>{t(...e,n)}))},onDocClick:l,createEmitter:function(){const t=[];return Object.assign(e,{handle:function(t){if("function"!=typeof t)return void console.error("function is expected");e(t)},clear:function(){t.length=0},off:function(e){const n=t.indexOf(e);-1!==n&&t.splice(n,1)},isEmpty:function(){return 0===t.length}});function e(...e){"function"==typeof e[0]?t.push(e[0]):t.forEach((t=>t(...e)))}},onDocMutations:d,removeFromArray:function(t,e){let n;n="function"==typeof e?t.findIndex(e):t.indexOf(e),-1!==n&&t.splice(n,1)},insertMultistyle:h,waitForDocumentReady:async function(){await c((()=>document.body))},createResolvablePromise:function(){let t;const e=new Promise((e=>{t=e}));return Object.defineProperty(e,"resolve",{get:()=>t}),e},time:r,iframe:a});var g=document.documentElement,_={},y={},b={},w={},v=1;w={nextValue:function(){return(v=(9301*v+49297)%233280)/233280},seed:function(t){v=t}};var S,T,E,P="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-";function M(){E=!1}function C(t){if(t){if(t!==S){if(t.length!==P.length)throw new Error("Custom alphabet for shortid must be "+P.length+" unique characters. You submitted "+t.length+" characters: "+t);var e=t.split("").filter((function(t,e,n){return e!==n.lastIndexOf(t)}));if(e.length)throw new Error("Custom alphabet for shortid must be "+P.length+" unique characters. These characters were not unique: "+e.join(", "));S=t,M()}}else S!==P&&(S=P,M())}function O(){return E||(E=function(){S||C(P);for(var t,e=S.split(""),n=[],o=w.nextValue();e.length>0;)o=w.nextValue(),t=Math.floor(o*e.length),n.push(e.splice(t,1)[0]);return n.join("")}())}b={get:function(){return S||P},characters:function(t){return C(t),S},seed:function(t){w.seed(t),T!==t&&(M(),T=t)},lookup:function(t){return O()[t]},shuffled:O};var x="object"==typeof window&&(window.crypto||window.msCrypto),I=x&&x.getRandomValues?function(t){return x.getRandomValues(new Uint8Array(t))}:function(t){for(var e=[],n=0;n<t;n++)e.push(Math.floor(256*Math.random()));return e},D=function(t,e,n){for(var o=(2<<Math.log(e.length-1)/Math.LN2)-1,i=-~(1.6*o*n/e.length),r="";;)for(var a=t(i),s=i;s--;)if((r+=e[a[s]&o]||"").length===+n)return r};var A,L,k=function(t){for(var e,n=0,o="";!e;)o+=D(I,b.get(),1),e=t<Math.pow(16,n+1),n++;return o};var F=function(t){var e="",n=Math.floor(.001*(Date.now()-1567752802062));return n===L?A++:(A=0,L=n),e+=k(7),e+=k(t),A>0&&(e+=k(A)),e+=k(n)};var R,$=function(t){return!(!t||"string"!=typeof t||t.length<6)&&!new RegExp("[^"+b.get().replace(/[|\\{}()[\]^$+*?.-]/g,"\\$&")+"]").test(t)},N=!1;var B=(N||(N=!0,R={},R=0),R||0);function q(){return F(B)}var H=q;(y=q).generate=H;var U=function(t){return b.seed(t),y};y.seed=U;var j=function(t){return B=t,y};y.worker=j;var G=function(t){return void 0!==t&&b.characters(t),b.shuffled()};y.characters=G;var z=$;y.isValid=z,_=y;var W={on:function(t,e){K();(V[t]||(V[t]=[])).push(e)},off:function(t,e){const n=V[t];if(!n)return;for(;;){const t=n.findIndex((t=>t===e));if(-1===t)break;n.splice(t,1)}},send:function(t,...e){let n;const o=e[e.length-1];"function"==typeof o?(n=o,e=e.slice(0,-1)):n=null;return new Promise((o=>{chrome.runtime.sendMessage({[Y]:t,[J]:e},(t=>{chrome.runtime.lastError||(n&&n(t),o(t))}))}))}};const V={},Y="__$chromeBus.name",J="__$chromeBus.args";function K(){const t=K;t.init||(t.init=!0,chrome.runtime.onMessage.addListener(((t,e,n)=>{const o=t["__$chromeBus.name"];if(!o)return!1;const i=t["__$chromeBus.args"]||[],r=V[o]||[];return 0!==r.length&&((async()=>{const t=await Promise.all(r.map((t=>t(...i)))),e=t[t.length-1];n(e)})(),!!n)})))}var X=W;const Q="__iframeBus.name",Z="__iframeBus.args",tt="__iframeBus.callbackId",et="undefined"!=typeof parent&&parent!==window;function nt(t,e){const n=at(t),o=e["__iframeBus.handlers"]||(e["__iframeBus.handlers"]={});o[t]=async o=>{if(o.data["__iframeBus.name"]===n){const n=o.data["__iframeBus.args"]||[],i=o.data["__iframeBus.callbackId"]||null,r=await e(...n);i&&rt(`${t}:response-${i}`,r)}},window.addEventListener("message",o[t])}function ot(t,e){nt(t,(function n(...o){return it(t,n),e(...o)}))}function it(t,e){const n=e["__iframeBus.handlers"]||(e["__iframeBus.handlers"]={});window.removeEventListener("message",n[t])}async function rt(t,...e){let o;const i=e[e.length-1];"function"==typeof i?(o=i,e=e.slice(0,-1)):o=null;const r=t.includes(":response-"),a=at(t),s=r?null:_.generate();if(et?parent.postMessage({[Q]:a,[Z]:e,[tt]:s},"*"):n("iframe").forEach((t=>{t.contentWindow.postMessage({[Q]:a,[Z]:e,[tt]:s},"*")})),!r)return new Promise((e=>{const n=i=>{o&&o(i),it(`${t}:response-${s}`,n),e(i)};nt(`${t}:response-${s}`,n)}))}function at(t){return`iframe-bus.${t}`}var st={init:function(){X.on("iframe-bus",((t,...e)=>rt(t,...e))),nt("chrome-bus",((t,...e)=>X.send(t,...e)))},on:nt,once:ot,off:it,send:rt,wait:async function(t){return await new Promise((e=>{ot(t,e)}))}};var ct={controller:{getConfig:function t(){const e=t;if(!e.config){const t=a.getParams();e.config=t.fusionConfig}return e.config}}},lt=function(){h`
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
  `,function(){const t=ct.controller.getConfig().fcsSelectors,o=ct.controller.getConfig().dmSelectors,i=ct.controller.getConfig().igSelectors;d((function t(n){const o=e("body");if(!o)return;d.off(t);new MutationObserver(a).observe(o,{childList:!0,subtree:!0}),a(n)}));let r=!1;function a(a){if(r)return;const s=a.map((t=>Array.from(t.addedNodes))).flat();if(0===s.length)return;const c=window.inssist.theme.emojiRegex,l=(e("body").innerText.match(c)||[]).filter((t=>!"0123456789#*↪".includes(t)));if(0===l.length)return;const d=[],u=Array.from(new Set(l)),p=["input","textarea","[contenteditable]",o.general.emojiPicker,i.general.postCaption,t.sidePanel.postPreviewCaption].map((t=>n(t))).flat();s.forEach((t=>{let e;if(e=t.nodeType===Node.ELEMENT_NODE?t:t.parentElement,!e)return;const n=document.createTreeWalker(e,NodeFilter.SHOW_TEXT);for(;;){const t=n.nextNode();if(!t)break;const e=t.textContent;if(!u.some((t=>e.includes(t))))continue;if(p.some((e=>e.contains(t))))continue;const o=t.parentElement;o.classList.contains("emoji")||(d.includes(o)||d.push(o))}})),requestAnimationFrame((()=>{r=!0,d.forEach((t=>{if(!document.body.contains(t))return;let e=t.innerHTML;u.forEach((t=>{const n=`<span class="emoji">${t}</span>`;e=e.split(n).join("__$%#^__").split(t).join(n).split("__$%#^__").join(n)})),t.innerHTML=e})),r=!1}))}}()};function dt(t){t&&(g.classList.remove("theme-day"),g.classList.remove("theme-night"),g.classList.add(`theme-${t}`))}var ut={init:function(){!async function(){dt(await st.send("theme.get-theme"))}(),async function(){st.on("theme.switch-theme",(t=>{dt(t)}))}(),lt()}},pt={user:null,igProfilesData:[],crosspostToFb:!1,selectedPostId:null,allPosts:[]},ft={getCaption:function(){const t=ht();if(!t)return null;let e=t.innerText.split("\n\n").join("\n");"\n"===e&&(e="");return e},setCaption:async function t(n,{force:o=!1}={}){const i=t;if(!o){const t=ht();if(!t)return;if(document.activeElement===t)return}if(i.running)return;i.running=!0;const r=window.inssist.schedule.requireModule;i.EditorState||(i.EditorState=await r("EditorState"));i.ContentState||(i.ContentState=await r("ContentState"));i.MetaDataActions||(i.MetaDataActions=await r("MediaManagerInstagramComposerMetaDataActions"));i.getMentionsInputDecorator||(i.getMentionsInputDecorator=await r("getMentionsInputDecorator"));const a=i.ContentState.createFromText(n),s=i.getMentionsInputDecorator(),c=i.EditorState.createWithContent(a,s);i.MetaDataActions.updateCaption(c),i.running=!1;const l=e(ct.controller.getConfig().fcsSelectors.sidePanel.captionScrollContainer);if(!l)return;l.scrollTop=l.scrollHeight}};function ht(){return e(ct.controller.getConfig().fcsSelectors.sidePanel.captionTextarea)||null}const mt=m.createEmitter();var gt={init:function(){const t=XMLHttpRequest.prototype.open;XMLHttpRequest.prototype.open=function(e,n){const o=this;n=_t(n);let i=0;const r={},a=new URL(n);Array.from(a.searchParams).forEach((([t,e])=>{r[t]=e}));const s=m.createEmitter();o.addEventListener("readystatechange",(()=>{o.readyState===XMLHttpRequest.DONE&&s(o)})),mt({url:n,query:r,modifyUrl:t=>{i+=1,i>1&&console.warn("`modifyUrl` was called more than once"),n=_t(t)},onResponse:s}),t.call(o,e,n)}},onRequest:mt.handle};function _t(t){return t.startsWith("http")?t:t.startsWith("/")?`${location.origin}${t}`:(console.error(`invalid url "${t}"`),t)}var yt={createError:function({message:t,details:e={}}){return{message:t,details:e,[bt]:!0}},throwError:function({message:t,details:e={}}){throw wt({message:t,details:e,critical:!0}),new Error(t)},sendError:wt,isKnownError:function(t){return t&&t[bt]},getLightweightPageHtml:vt};const bt=Symbol("isScheduleInjectionError");async function wt({message:t,details:e={},critical:n=!1}){let o;try{o=(await fetch("/")).ok}catch(t){o=!1}const i=ct.controller.getConfig().fcsSelectors,r=!!m.$(i.general.pandaErrorImage);st.send("schedule.fcs-error",{message:`schedule injection → ${t}`,critical:n,details:{...e,isNetworkOk:o,isPandaError:r,html:vt()}})}function vt(){const t=m.$("body > div"),e=document.createElement("div");return e.innerHTML=t.innerHTML.replace(/style="[^"]*"/gi,"").replace(/alt="[^"]*"/gi,""),m.$$('[role="cell"]:nth-child(n + 4)',e).forEach((t=>t.remove())),e.innerHTML}var St='<style>\n\n* {\n  outline: none;\n  font-family: montserrat !important;\n}\n\nbody {\n  overflow: hidden;\n}\n\nbody::-webkit-scrollbar {\n  width: 0px;\n}\n\n/* top bar */\n#mediaManagerGlobalChromeBar, /* when connected with fb */\n.uiContextualLayerParent > div > .MediaManagerInstagramRoot > div:first-child /* when connected with ig */ {\n  display: none !important;\n}\n\n/* side panel */\n._6uh1 {\n  top: 0 !important;\n}\n\n/* side panel items under "create post" button */\n._6ug6 {\n  display: none !important;\n}\n\n/* body panel */\n._1l9z {\n  margin-top: 0 !important;\n}\n\n/* user selection dropdown */\n#tabHeader {\n  margin-top: -28px;\n}\n\n'.replace("<style>","");function Tt(t,e){return Et(e)||(e=JSON.stringify(e)),`${encodeURIComponent(t)}=${encodeURIComponent(e)}`}function Et(t){return"string"==typeof t||"number"==typeof t||"boolean"==typeof t}function Pt(t,e={}){const n=function(t){return Object.keys(t).map((e=>{const n=t[e];return Et(n)?Tt(e,n):Array.isArray(n)?n.map((t=>Tt(e,t))).join("&"):null})).filter(Boolean).join("&").replace(/%5B/g,"[").replace(/%5D/g,"]")}(e);return n?`${t}?${n}`:t}function Mt(t={}){return Pt("https://business.facebook.com/creatorstudio",{tab:"instagram_content_posts",mode:"instagram",collection_id:"all_pages",content_table:"INSTAGRAM_POSTS",locale:"en_US",...t})}var Ct={init:function(){st.on("schedule.fcs-get-report",xt)},set:function(t,e){Ot[t]=e},log:function(t){Ot.log.push(t);const e="string"==typeof t?t:JSON.stringify(t);console.log(`%c[fcs] %c${e}`,"color: #b99610","color: #b99610; font-weight: bold;")}};const Ot={log:[]};function xt(){return{...Ot,html:yt.getLightweightPageHtml()}}const{$:It}=m;var Dt={init:async function(){Ct.log("start"),At=ct.controller.getConfig().fcsSelectors;try{await async function(){Ct.log("fallback enabled?");const t=await st.send("schedule.is-fallback-enabled");if(Ct.log(t?"yes":"no"),!t)return;throw m.insertMultistyle`
    <style>
      ${St}
    </style>
  `,kt}(),await async function(){location.href.includes("inssist-switch-to-fcs")&&(location.href=Mt());if(!location.href.includes("/latest/"))return;await st.send("chrome-bus","fb-api.switch-to-fcs"),location.href=Mt({"inssist-switch-to-fcs":!0})}();const{someUserConnected:t}=await async function(){await m.waitForDocumentReady();const t=document.documentElement.innerHTML,e=t.toLowerCase();if(!location.href.includes("business.facebook.com/creatorstudio")||!(e.includes("bizsitepage")||e.includes("uicontextuallayerparent")||e.includes("emojiconfig")))return Ct.log("is user connected?"),Ct.log("no (not logged in)"),pt.user=null,{someUserConnected:!0};Ct.log("waiting for ig profiles data...");const n=t.split("<body")[1].split("requireLazy")[0];Ct.log(n);const o=window.inssist.schedule.requireModule,i=await o("MediaManagerInstagramProfilesDataStore",30*m.time.SECOND);if(!i){let t;const e=yt.getLightweightPageHtml();throw t=e.includes("/checkpoint/")?"account locked":e.includes("/confirm_code/")?"fb code is required":'<div class="_3b5k" id="bizsitePageContainer"><div class="_6nx4"></div><div id="globalContainer" class="uiContextualLayerParent"><div id="u_0_1"></div></div></div>'===e?"empty html":e.includes('role="progressbar"')?"spinner":"unknown",yt.createError({message:`Unable to require MediaManagerInstagramProfilesDataStore within 30 seconds (${t})`})}Ct.log("ig profiles data received"),Ct.log("is user connected?");if(!await m.waitFor((()=>{const t=i.getState().toJS();return!!(t&&t[0]&&t[0].value)})))throw yt.createError({message:"MediaManagerInstagramProfilesDataStore loading takes too long"});let r=null;const a=i.getState().toJS()[0].value;if(a.length>0){const t=await st.send("schedule.get-ig-username");r=a.find((e=>e.username===t))||null}return pt.user=r,Ct.log(r?"yes":"no"),{someUserConnected:!0}}();!function(){const t=()=>{const t=It(At.welcome.acceptCookieButton);if(t&&document.body.innerHTML.includes('"_js_datr"')){const e=document.body.innerHTML.split('"_js_datr"')[1].split('"')[1].split('"')[0];document.cookie=`_js_datr=${e}; SameSite=None; Secure`,t.click(),location.reload()}if(!!It(At.general.cookieBannerTitle))return;const e=It(At.welcome.getStartedButton);e&&(e.click(),location.reload());const n=It(At.whatsNew.closeButton);n&&(n.click(),location.reload())};m.onDocMutations(t),setTimeout((()=>{m.onDocMutations.off(t)}),30*m.time.SECOND)}();const e=!!pt.user;await st.send("schedule.fcs-connection-status",e,{someUserConnected:t})}catch(t){t===kt||(yt.isKnownError(t)?yt.sendError({message:t.message,details:t.details,critical:!0}):yt.sendError({message:"startup controller init: unknown error",details:{details:t},critical:!0}))}Ct.log("end"),Lt.resolve()},waitForInit:async function(){return Lt}};let At;const Lt=m.createResolvablePromise(),kt=new Error("fallback enabled");let Ft;var Rt=Ft={init:async function(){await Dt.waitForInit();try{const t=await async function(){const t=ct.controller.getConfig().fcs,e=await m.waitFor((()=>window.requireLazy));if(!e)throw yt.createError({message:"initDispatcher: failed to get window.require"});const n=await new Promise((n=>{const o=setTimeout((()=>{n(null)}),15e3);e([t.MediaManagerDispatcher],(t=>{clearTimeout(o),n(t)}))}));if(!n)return null;const o=[],i=n.dispatch;return n.dispatch=(...t)=>{if(t[0])for(const e of o)e(t[0]);return i.call(n,...t)},{dispatch:n.dispatch,onDispatch:t=>{o.push(t)}}}();t&&(Ft.dispatch=t.dispatch,Ft.onDispatch=t.onDispatch)}catch(t){yt.isKnownError(t)?yt.sendError({message:t.message,details:t.details,critical:!0}):yt.sendError({message:"dispatch controller init: unknown error",details:{jsError:t},critical:!0})}$t.resolve()},waitForInit:async function(){return $t},main:{},composer:{}};const $t=m.createResolvablePromise();var Nt='<style>\n\n* {\n  outline: none;\n}\n\n\n/* user selection option when creating new post */\n._7pqd {\n  opacity: 0;\n}\n\n\n/* page content */\n._1x52,\n#globalContainer {\n  visibility: hidden;\n}\n\n\n/* modal window */\n._59s7 {\n  max-width: calc(100% - 80px) !important;\n}\n\n\n/* edit post left panel */\n._7-i- {\n  padding-top: 0 !important;\n}\n\n\n/* hide content */\n._6uh1 ~ div {\n  visibility: hidden !important;\n}\n\n\n/* notification (e.g. "post saved") */\n._72sn {\n  display: none;\n}\n\n\n/* disable side panel animation */\n._92zt {\n  animation-duration: 0s !important;\n}\n\n\n/* extend table height */\n._rz-,\n.uiScrollableAreaContent > div {\n  height: 4500px !important; }\n\n\n/* disable active panel animation */\n#creator_studio_sliding_tray_root ._6lsf {\n  right: 0 !important; }\n\n\n/* uploading progress */\n._6eqo {\n  cursor: default !important;\n}\n\n/* uploading progress chevron icon */\n._6eqo i:last-child {\n  display: none;\n}\n\n\n/* noinspection CssNoGenericFontName */\n* { font-family: montserrat !important; }\n:root { --geodesic-type-font-family: montserrat !important; }\n:root { --geodesic-type-size-value-font-family: montserrat !important; }\nbody { overflow-x: hidden; }\nbody::-webkit-scrollbar { width: 0px; }\n\n\n/* ! posts panel container */\n#globalContainer > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2),\ndiv._1l9z {\n  margin: 0 !important; z-index: 100; }\n\n\n/*START*/\n/* left navigation panel and\n   top panel header with fb and ig tabs.\n   these are optional if posts container z-index is 100 */\n#mediaManagerGlobalChromeBar,\n._6uh1, /* header with fb and ig tabs */\n.p7k9k0yn.i6vn8ron /* header when authorized with new method */ {\n  display: none !important; }\n\n\n/* post status, time selector and search */\n#mediaManagerFilterAndSearch {\n  display: none; }\n\n\n/* table header with account selector and title */\n#instagramTabHeader {\n  visibility: hidden;\n  position: fixed;\n  left: -100000px; }\n\n\n/* media type tabs */\ndiv._450w {\n  display: none; }\n\n\n/* posts panel content */\ndiv._3wpv {\n  padding: 0px 8px !important; }\n\n\n/* prevent column clipping */\n#mediaManagerContentTable, div._6ynv {\n  min-width: 1070px !important; }\n\n\n/* --- */\n\n\n/* ! posts panel container,\n  only enable this if in post view mode to hide the table underneath */\n/* #globalContainer > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2), div._1l9z {\n     visibility: hidden !important; } */\n\n\n/* ! post details pop-over */\n#creator_studio_sliding_tray_root > div, div._6lsf {\n  max-width: 100% !important;\n  width: 100% !important; }\n\n\n/* pop-over header */\n#creator_studio_sliding_tray_root > div > div > div:nth-child(1) {\n  display: none !important; }\n\n\n/* pop-over frame and performance container */\n#creator_studio_sliding_tray_root > div > div > div:nth-child(2) {\n  overflow: auto !important; }\n\n\n/* pop-over post frame (left sub-panel) */\n#creator_studio_sliding_tray_root > div > div > div:nth-child(2) > div:nth-child(1), div._759f {\n  width: initial !important;\n  min-width: 500px !important;\n  overflow-x: hidden !important;\n  overflow-y: auto !important;\n  padding-left: 24px !important;\n  justify-content: flex-start !important;\n  display: flex !important;\n  flex-direction: column !important;\n  background-color: white !important; }\n#creator_studio_sliding_tray_root > div > div > div:nth-child(2) > div:nth-child(1) > div, div._75fk {\n  box-shadow: none !important;\n  border-radius: 0 !important;\n  background-color: transparent !important;\n  border: none !important; }\n#creator_studio_sliding_tray_root > div > div > div:nth-child(2) > div:nth-child(1) > div > div._3qn7._61-3._2fyi._3qng > span {\n  display: none !important }\n#creator_studio_sliding_tray_root div._74_-._75fl {\n  margin-left: 0 !important; }\n#creator_studio_sliding_tray_root div._75fm {\n  padding-left: 0 !important; }\n#creator_studio_sliding_tray_root > div > div > div:nth-child(2) > div:nth-child(1) > div > div._8525 {\n  max-width: 500px !important }\n\n\n/* pop-over post performance (right sub-panel) */\n#creator_studio_sliding_tray_root > div > div > div:nth-child(2) > div:nth-child(2), div._759g {\n  min-width: 300px;\n  border: none !important;\n  background-color: white !important;\n  min-height: unset !important; }\n\n\n/* pop-over post performance title */\n#creator_studio_sliding_tray_root > div > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(1), div._759g > div:nth-child(1) {\n  border-top: none !important;\n  border-bottom: none !important; }\n\n\n/* pop-over post performance content */\n#creator_studio_sliding_tray_root > div > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(2), div._759g > div:nth-child(2) {\n  border-top: none !important;\n  border-bottom: none !important;\n  margin-top: 0 !important; }\n\n\n/* pop-over post performance tray */\n#creator_studio_sliding_tray_root ._6qig {\n  height: 76px !important;\n  box-sizing: border-box;\n  padding: 0 24px !important; }\n/* #creator_studio_sliding_tray_root > div > div > div:nth-child(3) > button:nth-child(1), div._6qig > button:nth-child(1) {\n     margin-left: 16px !important; } */\n\n\n/* tray buttons */\ndiv.uiOverlayFooter a[action=\'cancel\'],\ndiv.uiOverlayFooter button[action=\'confirm\'],\n#creator_studio_sliding_tray_root button[type="button"] {\n  cursor: pointer !important;\n  font-weight: 600 !important;\n  /* Please make sure to apply a special xpath attribute rule for disabled buttons.\n     Facebook disables some buttons such GO TO POST button on an archived story.\n     Such buttons are styled inline and have a special style \'color: rgb(190, 195, 201)\'.\n     Clicking these buttons does nothing, so an attribute based xpath expression should\n     watch and hide them all-together. */\n  /* color: white !important;\n     background-color: #1BA2F9 !important; */\n  border: none !important;\n  font-size: 16px !important;\n  border-radius: 4px;\n  text-transform: uppercase !important;\n  margin-left: 8px;\n  margin-right: 8px;\n  color: white !important;\n  background-color: #1BA2F9 !important;\n  transition: 300ms cubic-bezier(0.23, 1, 0.32, 1) 0s; }\ndiv.uiOverlayFooter a[action=\'cancel\'][style*="background-color: rgb(176, 213, 255)"],\ndiv.uiOverlayFooter button[action=\'confirm\'][style*="background-color: rgb(176, 213, 255)"],\n#creator_studio_sliding_tray_root button[type="button"][style*="background-color: rgb(176, 213, 255)"] {\n  opacity: 0.5 !important;\n  pointer-events: none;\n}\n\n#creator_studio_sliding_tray_root button[type="button"]:hover {\n  filter: brightness(95%); }\n#creator_studio_sliding_tray_root button[type="button"]:active {\n  filter: brightness(90%); }\n\n\n/* --- */\n\n\n/* post cover image title */\ndiv._7-i2 > span {\n  display: none !important; }\ndiv._7-i2 > div {\n  margin-top: 0 !important; }\n\n\n/* post caption input */\ndiv._7-2a._5yk1 {\n  overflow: auto !important; }\n\n\n/* --- */\n\n\n/* add content mini popup */\ndiv.uiContextualLayer.uiContextualLayerBelowLeft > div > div > div > div {\n  padding-bottom: 12px !important; }\ndiv.uiContextualLayer.uiContextualLayerBelowLeft > div > div > div > a {\n  display: none !important; }\n\n'.replace("<style>",""),Bt={init:async function(){qt=ct.controller.getConfig().fcsSelectors,await Rt.waitForInit(),m.onDocMutations((()=>{pt.selectedPostId&&m.$(qt.sidePanel.captionTextarea)&&setTimeout((()=>{const t=ft.getCaption();Ht[pt.selectedPostId]=t}))})),st.on("schedule.set-caption",Ut)},restoreCaptionForCurrentPost:async function(){if(!pt.selectedPostId)return;const t=Ht[pt.selectedPostId];if(t)return void Ut(t);const e=await st.send("schedule.get-post",pt.selectedPostId);"local"===e.source&&e.caption&&Ut(e.caption)}};let qt;const Ht={};function Ut(t,{force:e=!1}={}){"string"==typeof t&&ft.setCaption(t,{force:e})}const{$:jt,$$:Gt}=m;var zt={init:async function(){if(Wt=ct.controller.getConfig().fcsSelectors,Vt=ct.controller.getConfig().fcs,oe(),ie(),st.on("schedule.fcs-go-to",Yt),st.on("schedule.fcs-open-post",Jt),st.on("schedule.fcs-open-new-post-form",Kt),st.on("schedule.fcs-refresh-data",ne),st.on("schedule.fcs-refresh-page",Xt),st.on("schedule.fcs-check-critical-vars",Qt),st.on("schedule.fcs-wait-upload",Zt),st.on("schedule.fcs-submit-composer",te),await Dt.waitForInit(),await Rt.waitForInit(),!pt.user)return;await async function(){if(await st.send("schedule.is-debug-enabled"))return;m.insertMultistyle`
    <style>
      ${Nt}

      ${Wt.sidePanel.mediaPreviewControls} {
        height: auto !important;
      }

      ${Wt.sidePanel.save} {
        max-width: none;
      }

      ${Wt.sidePanel.loadingOverlay} {
        background: #FFF !important;
      }
      .theme-night ${Wt.sidePanel.loadingOverlay} {
        background: #D4D5D9 !important;
      }

      ${Wt.sidePanel.postPerformancePane} {
        background: transparent;
      }

      .MediaManagerInstagramPostPreview {
        width: 100%;
      }

      html.is-igtv ${Wt.sidePanel.editPostButton} {
        display: none;
      }

      ${Wt.general.translationsButton} {
        display: none;
      }
    </style>
  `}(),m.insertMultistyle`
    <style>
      ::-webkit-scrollbar {
        display: none;
      }
    </style>
  `,m.insertMultistyle`
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


      .theme-night ${Wt.sidePanel.postPreviewCaption} {
        filter: url(#theme-reverse-filter);
      }
      .theme-night ${Wt.sidePanel.postPreviewCaption},
      .theme-night ${Wt.sidePanel.postPreviewCaption} * {
        color: #D4D7D9 !important;
      }
      .theme-night ${Wt.sidePanel.postPreviewCaption} a {
        color: #728FC9 !important;
      }

      .theme-night ${Wt.sidePanel.mediaPreviewContainer} {
        background: #FFF;
      }

      .theme-night ${Wt.sidePanel.mediaPreviewControls} {
        filter: url(#theme-reverse-filter);
      }
    </style>
  `,m.insertMultistyle`
    <style>
      ${Wt.sidePanel.locationRoot} {
        user-select: none;
        cursor: pointer;
        width: 502px;
      }
    </style>
  `,m.onDocClick((t=>{if(!t.target.closest(Wt.sidePanel.locationRoot))return;const e=jt(Wt.sidePanel.locationInput);e?e.focus():yt.sendError({message:"upgradeAddLocationButton: failed to find location input"})})),m.insertMultistyle`
    <style>
      ${Wt.sidePanel.goToPostButton} {
        font-size: 16px !important;
        font-weight: 600;
        text-transform: uppercase;
      }
      ${Wt.sidePanel.goToPostButton} * {
        font-family: inherit !important;
      }

      ${Wt.sidePanel.doneButton} {
        display: none;
      }

      ${Wt.sidePanel.editPostButton} {
        max-width: none !important;
      }
    </style>
  `,m.onDocMutations((()=>{Gt(Wt.confirmDialog.yes).forEach((t=>{t.click()}))})),m.onDocMutations((()=>{Gt(Wt.tooltip.bubble).forEach((t=>{const e=t.closest(Wt.tooltip.root);if(!e)return;const n=t.closest(Wt.tooltip.bubbleWrap);if(!n)return;const o=jt(`#${e.dataset.ownerid}`);if(!o)return;const i=o.getBoundingClientRect();if(i.left<150&&n.classList.contains("uiContextualLayerLeft")){n.classList.remove("uiContextualLayerLeft"),n.classList.add("uiContextualLayerRight"),n.style.left=0,n.style.right=null,e.style.left=`${i.left+i.width}px`,e.style.right=null;const o=t.offsetWidth,r=t.offsetHeight;if(o>r)return;t.style.width=`${Math.round(.75*r)}px`}}))})),async function(){const t=window.inssist.schedule.requireModule,e=await t(Vt.MediaManagerDispatcher),n=e.dispatch;e.dispatch=(...t)=>{const o=t[0];if(o.type!==Vt.CLOSE_COMPOSER||o.fromInssist)return n.call(e,...t)}}(),gt.onRequest((({xhr:t,url:e,query:n,modifyUrl:o})=>{if(!e.includes(Vt["/media_manager/content_library"])&&!e.includes(Vt["/media_manager/media_manager_instagram_content"]))return;const i=new URL(e),r=n[Vt.post_type];r===Vt.POST_TYPE_IGTV?(i.searchParams.set(Vt.post_status,Vt.POST_STATUS_DRAFT),i.searchParams.set(Vt.limit,1),o(i.toString())):r===Vt.POST_TYPE_VIDEOS?(i.searchParams.set(Vt.post_type,Vt.POST_TYPE_ALL),i.searchParams.set(Vt.post_status,Vt.POST_STATUS_PUBLISHED),i.searchParams.set(Vt.limit,100),o(i.toString())):r===Vt.POST_TYPE_PHOTOS?(i.searchParams.set(Vt.post_type,Vt.POST_TYPE_ALL),i.searchParams.set(Vt.post_status,Vt.POST_STATUS_SCHEDULED),i.searchParams.set(Vt.limit,500),o(i.toString())):r===Vt.POST_TYPE_CAROUSELS&&(i.searchParams.set(Vt.post_type,Vt.POST_TYPE_ALL),i.searchParams.set(Vt.post_status,Vt.POST_STATUS_DRAFT),i.searchParams.set(Vt.limit,500),o(i.toString()))})),await async function(t){const e=window.inssist.schedule.requireModule,n=await e(Vt.immutable);Rt.dispatch({type:Vt.SELECT_IG_PROFILES,[Vt.selectedProfileIDs]:n.List([t.id])})}(pt.user),re(),Rt.onDispatch((t=>{t.type===Vt.TOGGLE_CROSSPOST_TO_FACEBOOK_CHECKBOX&&(pt.crosspostToFb=t.value)})),Rt.onDispatch((t=>{t.type===Vt.CONTENT_TABLE_REFRESH_ROWS_FINISHED&&Object.values(t[Vt.rowsByIDs]).forEach((t=>{m.removeFromArray(pt.allPosts,(e=>e.id===t.id)),pt.allPosts.push(t)}))})),Rt.onDispatch((t=>{if(t.type!==Vt.PUSH_NOTIFICATION)return;if(!(Vt.isSuccess in t[Vt.notificationData]))return;if(t[Vt.notificationData][Vt.isSuccess])return;const e=t[Vt.notificationData][Vt.notificationDataLabel].toString();st.send("schedule.fcs-notification-error-appeared",{postId:pt.selectedPostId,errorText:e})})),function(){const t=Symbol("handled");m.onDocMutations((()=>{const e=jt(Wt.sidePanel.editPostBottomRow);e&&(e[t]||pt.selectedPostId&&(e[t]=!0,e.insertAdjacentHTML("afterbegin",'\n      <button class="delete-post-button">\n        <svg class="delete-post-button__icon" width="14" height="14" viewBox="0 0 14 14">\n          <path fill="none" d="M0 0h14v14H0z"/>\n          <path d="M3.099 14a.74.74 0 0 1-.779-.652L1.8 3.772h9.874l-.52 9.576a.74.74 0 0 1-.779.652zM.965 2.824V1.287A.489.489 0 0 1 1.454.8h3.357V.163A.163.163 0 0 1 4.974 0H8.5a.163.163 0 0 1 .165.163V.8h3.357a.489.489 0 0 1 .489.489v1.535z" fill="currentColor"/>\n        </svg>\n        <span class="delete-post-button__label">\n          DELETE POST\n        </span>\n      </button>\n    ')))})),m.onDocClick((t=>{t.target.closest(".delete-post-button")&&st.send("schedule.delete-post",pt.selectedPostId)})),m.insertMultistyle`
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
  `}(),function(){const t=Symbol("handled");m.onDocMutations((()=>{const e=jt(Wt.general.headerMessageIconContainer);if(!e)return;if(e[t])return;e[t]=!0;e.parentElement.style.display="none"}))}(),ne()}};let Wt,Vt;function Yt(t){location.href=t}async function Jt(t,{isIgtv:e=!1}={}){document.documentElement.classList.toggle("is-igtv",e);const n=window.inssist.schedule.requireModule,o=await n(Vt.queryIGMediaData),i=await n(Vt.MediaManagerInstagramContentActions);await ee(),pt.selectedPostId=t;const r=await m.callAsync(o,t);"POSTED"===r.postStatus?(i.setShouldShowPostDetailTray(!0,r),Bt.restoreCaptionForCurrentPost()):(await re(),i.editPost(r),Bt.restoreCaptionForCurrentPost())}async function Kt({postMode:t="publish",localPostId:e=null,localPostFiles:n=[]}){const o=Kt;document.documentElement.classList.toggle("is-igtv",!1),pt.crosspostToFb=!1,pt.selectedPostId=e||null,await ee();const i=window.inssist.schedule.requireModule;await re();(await i(Vt.MediaManagerInstagramComposerRootActions)).openComposer(Vt.IG_FEED_ORGANIC),Rt.dispatch({type:Vt.SELECT_INSTAGRAM_ACCOUNT,instagramAccount:pt.user}),Rt.dispatch({type:Vt.SWITCH_POST_MODE,[Vt.isEditComposer]:!1,[Vt.postMode]:t}),Bt.restoreCaptionForCurrentPost(),0!==n.length&&(clearTimeout(o.timeout),o.timeout=setTimeout((()=>{Rt.dispatch({type:Vt.FILES_ADDED,[Vt.files]:n})}),200))}function Xt(){location.href=Mt()}async function Qt(){return!!window.require}async function Zt(){const t=window.inssist.schedule.requireModule,e=await t(Vt.MediaManagerInstagramComposerUploadStore);return await new Promise((t=>{const n=setInterval((()=>{const o=e.getState().toJS(),i=o.isUploadFailed,r=o.isUploadFinished;i?(clearInterval(n),t(!1)):r&&(clearInterval(n),t(!0))}),500)}))}function te(){Rt.dispatch({type:"PUBLISH_MEDIA"})}async function ee(){const t=window.inssist.schedule.requireModule;(await t(Vt.MediaManagerInstagramContentActions)).setShouldShowPostDetailTray(!1),Rt.dispatch({type:Vt.SHOW_EXIT_COMPOSER_CONFIRM_DIALOG}),Rt.dispatch({type:Vt.CLOSE_COMPOSER,fromInssist:!0})}function ne(){const t=ne;t.init||(t.init=!0,t.lastPostCount=0,Rt.onDispatch((e=>{if(t.refreshing&&e.type===Vt.SET_CONTENT_LIBRARY_DATA){const n=e.queryParameters.toJS().postType;if(!(n===Vt.POST_TYPE_IGTV||n===Vt.POST_TYPE_VIDEOS||n===Vt.POST_TYPE_PHOTOS||n===Vt.POST_TYPE_CAROUSELS))return;if(n===Vt.POST_TYPE_IGTV)return void Rt.dispatch({type:Vt.SELECT_CONTENT_TABLE,contentTable:Vt.INSTAGRAM_VIDEO_POSTS,source:Vt.instagram_content_library_posts});n===Vt.POST_TYPE_VIDEOS&&Rt.dispatch({type:Vt.SELECT_CONTENT_TABLE,contentTable:Vt.INSTAGRAM_PHOTO_POSTS,source:Vt.instagram_content_library_posts}),n===Vt.POST_TYPE_PHOTOS&&Rt.dispatch({type:Vt.SELECT_CONTENT_TABLE,contentTable:Vt.INSTAGRAM_CAROUSEL_POSTS,source:Vt.instagram_content_library_posts});const o=e.data.data.toJS();for(const t of o)m.removeFromArray(pt.allPosts,(e=>e.id===t.id)),pt.allPosts.push(t);if(n===Vt.POST_TYPE_CAROUSELS){if(t.lastPostCount-pt.allPosts.length>3)return t.lastPostCount=0,t.refreshing=!1,void ne();t.lastPostCount=pt.allPosts.length,st.send("schedule.apply-fcs-posts",pt.allPosts),t.refreshing=!1}}}))),t.refreshing||(pt.allPosts.length=[],t.refreshing=!0,Rt.dispatch({type:Vt.SELECT_CONTENT_TABLE,contentTable:Vt.INSTAGRAM_IGTV_POSTS,source:Vt.instagram_content_library_posts}),Rt.dispatch({type:Vt.REFRESH_TAB,tab:Vt.instagram_content_posts}))}function oe(){m.onDocMutations((()=>{Gt("video").forEach((t=>{t.hasAttribute("autoplay")&&(t.pause(),t.removeAttribute("autoplay"))}))}),!0)}function ie(){history.pushState=history.replaceState}async function re(){const t=window.inssist.schedule.requireModule,e=await t(Vt.MediaManagerLazyLoadActions);await m.callAsync(e.lazyLoadSection,Vt.INSTAGRAM_COMPOSER)}const{$:ae,$$:se}=m;var ce={init:async function(){if(await Dt.waitForInit(),await Rt.waitForInit(),!pt.user)return;le=ct.controller.getConfig().fcsSelectors,de=ct.controller.getConfig().fcs,m.onDocClick((t=>{t.target.closest(le.upload.root)&&(t.target.closest("input")||t.target.closest("button")||ue(ae(le.upload.button)))})),m.insertMultistyle`
    <style>
      ${le.upload.root} {
        border-radius: 7px;
        user-select: none;
        cursor: pointer;
      }
      ${le.upload.buttonWrap} {
        display: none;
      }
    </style>
  `,function(){const t=Symbol("handled");m.onDocMutations((()=>{const e=ae(le.upload.addContentButton);if(!e)return;const n=ae(le.sidePanel.mediaList);if(!n)return;const o=ae(".add-media");o&&(o.style.display=n.childElementCount<10?null:"none"),n[t]||0!==n.childElementCount&&(n[t]=!0,n.insertAdjacentHTML("afterend",'\n      <div></div>\n      <button class="add-media" type="button">\n        <div class="add-media__icon">+</div>\n        ADD CONTENT\n      </button>\n    '),ae(".add-media").addEventListener("click",(()=>{ue(e)})))})),m.insertMultistyle`
    <style>
      ${le.upload.addContentButtonWrap} {
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
  `}(),m.insertMultistyle`
    <style>
      ${le.sidePanel.coverSelectionRadioBox} {
        position: relative;
        top: 2px;
      }
    </style>
  `,m.onDocMutations((()=>{se(le.sidePanel.uploadingVideo).forEach((t=>{t.controls=!0}))})),m.insertMultistyle`
    <style>
      ${le.sidePanel.uploadingVideoPlayButton} {
        display: none !important;
      }

      ${le.sidePanel.uploadingVideoCustomControls} {
        display: none !important;
      }
    </style>
  `,function(){const t=Symbol("handled");m.onDocMutations((()=>{se(le.sidePanel.mediaPreviewVideo).forEach((e=>{e[t]||(e[t]=!0,e.setAttribute("disablePictureInPicture",""),e.setAttribute("controlslist","nodownload"))}))})),m.insertMultistyle`
    <style>
      ${le.sidePanel.mediaPreviewVideo}::-webkit-media-controls-fullscreen-button {
        display: none;
      }
    </style>
  `}(),function(){const t=Symbol("handled");m.onDocMutations((()=>{const e=ae(".add-media");if(!e)return;const n=ae(le.sidePanel.mediaList);if(!n)return;const o=ae(".reverse-media-list-button");if(o){const t=n.childElementCount<=1?"none":null;o.style.setProperty("display",t,"important")}if(e[t])return;e[t]=!0,e.insertAdjacentHTML("afterend",'\n      <button class="reverse-media-list-button" type="button">\n        <span class="reverse-media-list-button__icon">↪︎</span>\n        REVERSE\n      </button>\n    ');ae(".reverse-media-list-button").addEventListener("click",(async()=>{try{const t=window.inssist.schedule.requireModule,e=(await t(de.MediaManagerInstagramComposerUploadStore)).getState().toObject().fileMap.toObject(),n=Object.keys(e);if(n.length<2)return;n.forEach(((t,e)=>{Rt.dispatch({type:de.SUBMIT_MEDIA_ORDER,[de.mediaOrderId]:t,[de.prevIndex]:0,[de.newIndexString]:String(n.length-e),[de.totalMedia]:n.length})}))}catch(t){console.error("schedule injection media controller →","addReverseMediaButton",t)}}))})),m.insertMultistyle`
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
  `}(),async function(){const t=window.inssist.schedule.requireModule,e=await t(de.ImageExifRotation);if(!e)return;e.getRotation=(t,e)=>(e&&"function"==typeof e&&e(0),0)}()}};let le,de;function ue(t){t||yt.throwError({message:"startUpload: failed to find upload button"}),t.click();const e=ae(le.upload.input);e||yt.throwError({message:"startUpload: failed to find upload input"});const n=e.closest(le.tooltip.root);n||yt.throwError({message:"startUpload: failed to find upload tooltip"}),n.style.opacity=0,n.style.pointerEvents="none",e.click()}const{$:pe}=m;var fe={init:async function(){he=ct.controller.getConfig().fcsSelectors,st.on("schedule.connect-via-fb",me),st.on("schedule.connect-via-ig",ge)}};let he;async function me(){if(await Rt.waitForInit(),!Rt.dispatch)return{error:"failed-to-init-dispatcher"};const t=await m.waitFor((()=>pe(".MediaManagerInstagramContentPostsTabContainer")||pe('[role="tab"][aria-selected="true"]')?"content":pe(".MediaManagerInstagramOnboardingScreen")?"welcome":null));if(!t)return{error:"failed-to-detect-page-type"};"content"===t&&(Rt.dispatch({type:"SELECT_TAB",tab:"instagram_accounts",source:"left_nav"}),await m.waitFor((()=>location.href.includes("instagram_accounts"))),await m.waitFor((()=>pe(".MediaManagerInstagramTabHeaderContainer")))),Rt.dispatch({type:"SET_SHOW_INSTAGRAM_ONBOARDING_DIALOG",shown:!0}),await m.waitFor((()=>pe(".MediaManagerInstagramAccountPermissionMessageDialog")));const e=await new Promise((t=>{let e;const n=window.open;window.open=(o,i,r)=>{if(!o.includes("/oauth/authorize/"))return n(o,i,r);(async()=>{r=_e();const a=n(o,i,r);window.open=n,await m.waitFor((()=>a.closed)),e=setTimeout((()=>{t({error:"auth-window-closed-by-user"})}),5e3)})()};const o=window.require("ReloadPage"),i=o.now;o.now=()=>{clearTimeout(e),o.now=i,t({success:!0})},Rt.onDispatch((n=>{clearTimeout(e),"SET_LOGIN_INSTAGRAM_ACCOUNT_SUCCESS"===n.type&&t({error:"not-connected-to-fb-page"})})),Rt.dispatch({type:"AUTHENTICATE_INSTAGRAM_USER"})}));return Rt.dispatch({type:"SELECT_TAB",tab:"instagram_content",source:"left_nav"}),await m.waitFor((()=>location.href.includes("instagram_content"))),e}async function ge(){if(await Rt.waitForInit(),!Rt.dispatch)return{error:"failed-to-init-dispatcher"};if(pe(he.general.fbLoginRequiredContainer))return{error:"failed-to-skip-fb-login"};return await new Promise((t=>{let e;const n=window.open;window.open=(o,i,r)=>{if(!(o=o.toString()).includes("/oauth/authorize/"))return n(o,i,r);(async()=>{r=_e();const a=n(o,i,r);window.open=n,await m.waitFor((()=>a.closed)),e=setTimeout((()=>{t({error:"auth-window-closed-by-user"})}),5e3)})()};const o=window.require("URI"),i=o.goURIOnWindow;o.goURIOnWindow=(...n)=>{clearTimeout(e),o.goURIOnWindow=i,t({success:!0})},Rt.dispatch({type:"IG_AUTHENTICATION_LOG_IN"})}))}function _e(){return`scrollbars,top=${Math.round(screen.height/2-350)},left=${Math.round(screen.width/2-300)},width=600,height=700`}const{$:ye,$$:be}=m;var we={init:async function(){if(ve=ct.controller.getConfig().fcsSelectors,Se=ct.controller.getConfig().fcs,await Dt.waitForInit(),await Rt.waitForInit(),!pt.user)return;(function(){let t,e;m.onDocMutations((()=>{t=be(ve.sidePanel.mediaPreview),e=ye(ve.sidePanel.mediaPreviewVideo)})),gt.onRequest((({url:n,onResponse:o})=>{if(!function(t){return t.includes(Se["/media/manager/instagram_composer/create_post"])}(n))return;let i,r;i=t.length>1?"carousel":e?"video":"photo",t.length>0?r=t[0].getAttribute("src"):console.error("failed to find media preview image"),st.send("schedule.fcs-create-post-request",{type:i,image:r,crosspostToFb:pt.crosspostToFb,localPostId:pt.selectedPostId||null}),o((()=>{st.send("schedule.fcs-create-post-response",{image:r})}))})),gt.onRequest((({url:t,query:e,onResponse:n})=>{if(!function(t){return t.includes(Se["/media/manager/instagram_media/edit/save"])}(t))return;const o=pt.selectedPostId;let i,r;"true"===e[Se["edit_data[save_as_draft]"]]?(i=null,r="draft"):"true"===e[Se["edit_data[save_as_scheduled]"]]?(i=Te,r="scheduled"):(i=null,r="posted"),st.send("schedule.fcs-edit-post-request",{postId:o,status:r,on:i}),n((t=>{st.send("schedule.fcs-edit-post-response",{postId:o,status:r})}))}))})(),function(){const t=Se.MIN_MINUTES_FROM_NOW;m.insertMultistyle`
    <style>
      ${ve.dateDialog.root} {
        position: fixed;
        left: -10000px;
      }
    </style>
  `;let e=!1;m.onDocMutations((()=>{const t=ye(ve.dateDialog.rootOpen);(!e&&t||e&&!t)&&(e=!e,st.send("schedule.fcs-date-dialog-toggled",e))}));const n=Symbol("handled");m.onDocMutations((()=>{const e=ye(ve.sidePanel.save);e&&(e[n]||e.nextElementSibling&&(e[n]=!0,e.addEventListener("click",(e=>{const n=Date.now()+t*m.time.MINUTE;"schedule"===Ee&&(!Te||Te<n)&&(e.preventDefault(),e.stopPropagation(),st.send("schedule.fcs-date-dialog-invalid-time"))}),!0)))}))}(),async function(){const t=async()=>await st.send("schedule.has-pro"),e=Symbol("handled");m.onDocMutations((()=>{const n=ye(ve.sidePanel.save);if(!n)return;if(n[e])return;n[e]=!0;let o=!0;n.addEventListener("click",(e=>{o?(e.preventDefault(),e.stopPropagation(),(async()=>{if(await t())return o=!1,void n.click();const e=ye(ve.sidePanel.dateDialogTrigger);e&&e.click(),st.send("schedule.show-upsell")})()):o=!0}),!0)}))}(),st.on("schedule.fcs-date-dialog-get-timezone",Pe),st.on("schedule.fcs-date-dialog-select-option",Me),st.on("schedule.fcs-date-dialog-set-selected-option",Ce),st.on("schedule.fcs-date-dialog-set-publish-time",Oe)}};let ve,Se,Te=null,Ee=null;function Pe(){const t=window.require(Se.DateTime).localNow().getTimezoneID();return window.require(Se.TimezoneNamesData).zoneNames[t]}function Me(t){const e={"publish-now":Se.postModePublish,"save-as-draft":Se.postModeDraft,schedule:Se.postModeSchedule}[t],n={type:Se.SWITCH_POST_MODE,[Se.postMode]:e};Rt.dispatch({...n,[Se.isEditComposer]:!1}),Rt.dispatch({...n,[Se.isEditComposer]:!0})}function Ce(t){Ee=t}function Oe(t){if(Te=t,!Te)return;const e={type:Se.SELECT_SCHEDULED_DATE,[Se.scheduledDate]:new Date(Te)};Rt.dispatch({...e,[Se.isEditComposer]:!1}),Rt.dispatch({...e,[Se.isEditComposer]:!0})}var xe={init:async function(){if(await Dt.waitForInit(),await Rt.waitForInit(),!pt.user)return;Ie=ct.controller.getConfig().fcsSelectors,De=ct.controller.getConfig().fcs,m.insertMultistyle`
    <style>
      ${Ie.postToFb.root} {
        display: none;
      }
    </style>
  `;const t=pt.user.connectedPageInfo;if(!t)return;t.url=`https://facebook.com/${t.name}-${t.id}`;t.name.toLowerCase().startsWith("inssist:")||(function(t){const e=Symbol("handled");m.onDocMutations((()=>{const t=m.$(Ie.postToFb.checkboxRow);if(!t)return;const e=!!m.$(Ie.sidePanel.mediaList);t.style.opacity=e?null:.5}),!0),m.onDocMutations((()=>{const t=m.$(Ie.postToFb.title);t&&!t[e]&&(t[e]=!0,t.innerText="Clone to Facebook");const n=m.$(Ie.postToFb.body);n&&!n[e]&&(n[e]=!0,n.innerHTML='\n        <div class="post-to-fb__text">\n          Post will be cloned to Facebook Page. Facebook posts\n          can be managed separately from the\n          <a\n            class="post-to-fb__link"\n            href="https://business.facebook.com/creatorstudio/"\n            target="_blank">\n            Facebook Creator Studio</a>.\n        </div>\n      ')}),!0),m.onDocMutations((()=>{const t=m.$(Ie.postToFb.checkboxRow);if(!t)return;if(t[e])return;t[e]=!0;const n=m.$(Ie.postToFb.checkboxButton);n&&t.addEventListener("click",(t=>{t.target.closest(Ie.postToFb.checkboxButton)||n.click()}))})),m.insertMultistyle`
    <style>
      html ${Ie.postToFb.root} {
        display: block;
        margin-top: 40px;
        padding-bottom: 80px;
      }

      html ${Ie.postToFb.publishTypeButton} {
        display: none;
      }

      ${Ie.postToFb.checkboxRow} {
        margin-top: 10px;
        margin-left: -7px;
        cursor: pointer;
        user-select: none;
      }

      ${Ie.postToFb.checkboxButton} {
        background: transparent !important;
        border: 1px solid #DADDE1 !important;
      }
      .theme-night ${Ie.postToFb.checkboxButton} {
        border-color: #464646 !important;
      }

      ${Ie.postToFb.checkboxText} {
        pointer-events: none;
      }

      ${Ie.postToFb.body} {
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
  `}(),function(){let t,e;st.on("schedule.fcs-date-dialog-set-selected-option",(e=>{t=e,n()})),st.on("schedule.fcs-date-dialog-set-publish-time",(t=>{e=t,n()})),Rt.onDispatch((t=>{t.type===De.TOGGLE_CROSSPOST_TO_FACEBOOK_CHECKBOX&&n()}));const n=()=>{"save-as-draft"===t?Rt.dispatch({type:De.SWITCH_CROSSPOST_POST_MODE,[De.postMode]:De.postModeDraft}):"publish-now"===t?Rt.dispatch({type:De.SWITCH_CROSSPOST_POST_MODE,[De.postMode]:De.postModePublish}):"schedule"===t&&(Rt.dispatch({type:De.SWITCH_CROSSPOST_POST_MODE,[De.postMode]:De.postModeSchedule}),e&&Rt.dispatch({type:De.SELECT_CROSSPOST_SCHEDULED_DATE,[De.scheduledDate]:new Date(e)}))}}(),function(t){const e=Symbol("handled");m.onDocMutations((async()=>{const n=m.$(".delete-post-button");if(!n)return;if(n[e])return;n[e]=!0;const o=await st.send("schedule.get-post",pt.selectedPostId);if(!o)return;if(!o.crosspostToFb)return;let i;i="draft"===o.status?`${t.url}/publishing_tools?section=DRAFTS`:"scheduled"===o.status?`${t.url}/publishing_tools?section=SCHEDULED_POSTS`:`${t.url}/publishing_tools`,n.insertAdjacentHTML("afterend",`\n      <a\n        class="manage-fb-posts-link"\n        href="${i}"\n        target="_blank">\n        MANAGE FACEBOOK POSTS\n      </a>\n      <div style="flex-grow: 1"></div>\n    `)}),!0),m.insertMultistyle`
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
  `}(t))}};let Ie,De;var Ae={init:async function(){Le=ct.controller.getConfig().fcsSelectors,function(){const t=XMLHttpRequest.prototype.open;XMLHttpRequest.prototype.open=function(...e){const n=e[1];return(null==n?void 0:n.includes("/media/manager/instagram_composer/video_upload/"))&&(ke.uploadRequestStarted=!0,ke.uploadResponseTexts=[],this.addEventListener("readystatechange",(()=>{ke.uploadResponseTexts.push(this.responseText||"")}))),t.call(this,...e)}}(),function(){let t=null;m.onDocMutations((()=>{const e=m.$(Le.sidePanel.uploadProgress);if(e){if("99.9%"===e.innerText){if(t)return;t=setInterval((()=>{document.body.contains(e)?st.send("chrome-bus","schedule.upload-99",function(){const t=window.require;return{gkx:m.safe((()=>t("gkx")("1509806")),"failed"),asyncUpload:m.safe((()=>t("killswitch")("MEDIA_MANAGER_INSTAGRAM_ASYNC_UPLOAD")),"failed"),requestOption:m.safe((()=>t("AsyncRequest").toString().split("this.option=")[1].split("}")[0]+"}"),"failed"),uploadResponseTexts:ke.uploadResponseTexts,uploadRequestStarted:ke.uploadRequestStarted}}()):(clearInterval(t),t=null,ke.uploadRequestStarted=!1)}),1e3)}if("100%"===e.innerText){if(!t)return;clearInterval(t),t=null,ke.uploadRequestStarted=!1,st.send("chrome-bus","schedule.upload-100")}}}))}()}};let Le;const ke={uploadResponseTexts:[],uploadRequestStarted:!1};var Fe={init:async function(){const t=window.inssist.schedule.requireModule;if(Re=await t("MediaManagerDispatcher"),$e=await t("MediaManagerMediaCroppingActions"),Ne=await t("MediaManagerMediaCroppingRatioSettings"),Be=await t("MediaManagerMediaCroppingDialogCropBox.react"),!(Re&&$e&&Ne&&Be))return;(async function(){const t=$e.openDialog;$e.openDialog=(...e)=>{try{const t=e[4];t.push(Ne.FREEFORM),t[0].label="1:1",t[1].label="1.91:1",t[2].label="4:5",t[3].label="Any",t[3].description="Choose any aspect ratio from 1.91:1 to 4:5."}catch(t){console.error("failed to patch ratio options",t)}return t.call($e,...e)}})(),function(){let t;const e=Be.prototype.render;Be.prototype.render=function(...n){return t=this,e.call(this,...n)};const n=Re.dispatch;Re.dispatch=e=>{if("MEDIA_CROPPING_DIALOG_SET_DIMENSIONS"===e.type)try{const n=e.dimensions,o=n.width/n.height;if(o<.8){const e=Math.floor(n.width/.8);n.height=e,t.setState({height:e})}else if(o>1.91){const e=Math.floor(1.91*n.height);n.width=e,t.setState({width:e})}}catch(t){console.error("failed to automatically adjust ratio",t)}return n.call(Re,e)}}()}};let Re,$e,Ne,Be;var qe={ctx:pt,utils:ft,controller:{init:async function(){window.ctx=pt,gt.init(),Ct.init(),Rt.init(),Dt.init(),fe.init(),zt.init(),ce.init(),we.init(),xe.init(),Bt.init(),Ae.init(),Fe.init()}},dispatchController:Rt};let He;function Ue(t){qe.utils.setCaption(t)}var je={controller:{init:async function(){if(He=ct.controller.getConfig().fcsSelectors,st.on("tag-assist.fcs-set-caption",Ue),await qe.dispatchController.waitForInit(),!qe.ctx.user)return;(async function(){qe.dispatchController.onDispatch((t=>{"OPEN_COMPOSER"===t.type||"CONTENT_INSTAGRAM_EDIT_POST"===t.type?st.send("tag-assist.fcs-composer-opened"):"CLOSE_COMPOSER"===t.type&&st.send("tag-assist.fcs-composer-closed")}))})(),async function(){let t=null;const e=()=>{const e=qe.utils.getCaption();e!==t&&(t=e,st.send("tag-assist.fcs-caption-change",e))},n=Symbol("handled");m.onDocMutations((()=>{const t=m.$(He.sidePanel.captionTextarea);t&&(e(),t[n]||(t[n]=!0,t.addEventListener("input",e),t.addEventListener("keydown",e)))}))}()}}};let Ge,ze;function We(t){chrome.tabs.create({url:t,active:!0})}var Ve={controller:{init:function(){if(Ge=!!window.electron,ze=a.isIframe()&&a.getParams().isElectron,!Ge&&!ze)return;Ge&&st.on("electron-links.open-url",We);document.addEventListener("click",(t=>{const e=t.target.closest("a");if(!e)return;if("_blank"!==e.getAttribute("target"))return;const n=e.getAttribute("href");n.startsWith("/")||(t.preventDefault(),t.stopPropagation(),ze?st.send("electron-links.open-url",n):We(n))}),{capture:!0})}}};({init:async function(){Ve.controller.init(),m.iframe.isIframe("inssist-fcs")&&(await m.waitForDocumentReady(),ut.init(),qe.controller.init(),je.controller.init())}}).init()}();