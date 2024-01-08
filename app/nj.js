!function(){function t(t){return t&&t.__esModule?t.default:t}const e=!1;let o=globalThis.app;function n(t){return Array.isArray(t)?t:[t]}function i(t,e=document){t=n(t);for(const o of t){const t=e.querySelector(o);if(t)return t}return null}function r(t,e=document){t=n(t);const o=[];for(const n of t){const t=e.querySelectorAll(n);for(const e of t)o.includes(e)||o.push(e)}return o}(()=>{if(o)return;const t={},n=function o(n){const a=n===t,s=a&&e,l={},c=t=>Object.assign(n,t);return new Proxy(n,{get:function(t,e){if("assign"===e)return c;if(!(e in n)){if(n[e]={},a){const t=i.bind(null,"log",e,!1),o=i.bind(null,"log",e,!0),a=i.bind(null,"warn",e,!1),s=i.bind(null,"warn",e,!0),l=i.bind(null,"error",e,!1),c=i.bind(null,"error",e,!0),d=r.bind(null,e);Object.defineProperties(n[e],{log:{get:()=>t},logDev:{get:()=>o},warn:{get:()=>a},warnDev:{get:()=>s},error:{get:()=>l},errorDev:{get:()=>c},Error:{get:()=>d}})}l[e]=o(n[e]),s&&(globalThis[e]=n[e])}return e in l?l[e]:n[e]},set:function(t,e,o){return n[e]=o,l[e]=o,s&&(globalThis[e]=n[e]),!0}})}(t);function i(t,e,o,...n){if(o)return;const[i,r,s]=a(e);console[t](`%c[${e}]`,`color: rgb(${i}, ${r}, ${s})`,...n)}function r(t,e,...o){return i("error",t,!1,e,...o),new Error(`[${t}] ${e}`)}function a(t){let e=0;t.split("").forEach(((o,n)=>{e=t.charCodeAt(n)+((e<<5)-e)}));const o=(16711680&e)>>16,n=(65280&e)>>8,i=255&e;return o+n+i<300?a(`$${t}`):[o,n,i]}globalThis.app=n,o=n})();const a=36e5,s=864e5;var l={SECOND:1e3,MINUTE:6e4,HOUR:a,DAY:s,WEEK:6048e5,MONTH:26784e5,weekdays:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],months:["January","February","March","April","May","June","July","August","September","October","November","December"]};function c(t){try{return JSON.parse(t)}catch(t){return null}}var d={createName:function(t,e){return`${t}|${JSON.stringify(e)}`},getName:p,getParams:function(){return c(window.self.name.split("|")[1])||{}},isIframe:function(t=null){return window.self!==parent&&(!t||p()===t)}};function p(){return window.self.name.split("|")[0]||null}const u={get:function(t,e){if(!this._supported())return e;const o=localStorage.getItem(t);if(null==o)return e;if("true"===o)return!0;if("false"===o)return!1;if(o.startsWith("[")||o.startsWith("{"))return JSON.parse(o);const n=Number(o);return Number.isNaN(n)?o:n},set:function(t,e){if(this._supported())try{"string"==typeof e?localStorage.setItem(t,e):localStorage.setItem(t,JSON.stringify(e))}catch(o){console.error("local-storage-json: failed to set",{key:t,value:e,details:o})}},has:function(t){return!!this._supported()&&t in localStorage},remove:function(t){this._supported()&&localStorage.removeItem(t)},_supported:function(){return"undefined"!=typeof window&&!!window.localStorage}};var h={unique:function(t){return Array.from(new Set(t))},gaussian:g,gaussianInt:function(t,e){return Math.round(t+g()*(e-t))},forceLayout:function(){document.body.getBoundingClientRect()},hashCode:f,pseudorandom:function(t){return 16807*Math.max(Math.abs(f(t)),1)%2147483647/2147483646},rotate:function(t,e=1){const o="slashed.io";let n="";return Array.from(t).forEach(((t,i)=>{const r=o[i%o.length].charCodeAt(),a=(t.charCodeAt()+e*r+65536)%65536;n+=String.fromCharCode(a)})),n},getUnixTime:function(){return Math.round(Date.now()/1e3)},takeBetween:function(t,e,o){const n=t.split(e)[1];if(!n)return null;return n.split(o)[0]||null},takeAllBetween:function(t,e,o){return t.split(e).slice(1).map((t=>t.split(o)[0]))},capitalize:function(t){return t.charAt(0).toUpperCase()+t.substr(1).toLowerCase()},getIntegralNumberPart:function(t){const e=Math.abs(t);return t>0?Math.floor(e):-Math.floor(e)},getFractalNumberPart:function(t){const e=Math.abs(t);return Number((e-Math.floor(e)).toFixed(12))}};function g(){let t=0;for(let e=0;e<6;e+=1)t+=Math.random();return t/6}function f(t){if(!t)return 0;let e,o,n=0;if(0===t.length)return n;for(e=0;e<t.length;e++)o=t.charCodeAt(e),n=(n<<5)-n+o,n|=0;return n}var m=document.documentElement;async function y(t,e=null){let o,n;return"number"==typeof e?(o=e,n=100):e?(o=e.timeout||3e4,n=e.frequency||100):(o=3e4,n=100),new Promise(((e,i)=>{const r=t();if(r)return void e(r);const a=setInterval((()=>{const o=t();o&&(clearInterval(a),e(o))}),n);setTimeout((()=>{clearInterval(a),e(null)}),o)}))}function v(t,e){return b(e)||(e=JSON.stringify(e)),`${encodeURIComponent(t)}=${encodeURIComponent(e)}`}function b(t){return"string"==typeof t||"number"==typeof t||"boolean"==typeof t}function _(t,e){if(t[0]!==e[0])return!1;const o=Math.min(t.length,e.length);if(0===o)return"";const n=t.substr(0,o);return n===e.substr(0,o)?n:_(t.substr(0,o-1),e.substr(0,o-1))}function x(t){return t.toLowerCase().replace(/[ .,?!\-—–+=_%:;$#@/{}()]/g,"")}var w=Object.assign((function(t,e={}){document.addEventListener("click",t,e)}),{off:function(t,e={}){document.removeEventListener("click",t,e)}});function P(){const t=[];return Object.assign(e,{handle:function(t){if("function"!=typeof t)return void console.error("function is expected");e(t)},clear:function(){t.length=0},off:function(e){const o=t.indexOf(e);-1!==o&&t.splice(o,1)},isEmpty:function(){return 0===t.length}});function e(...e){"function"==typeof e[0]?t.push(e[0]):t.forEach((t=>t(...e)))}}var C=Object.assign((function(t,e=!1){0===S.length&&(M=new MutationObserver((t=>{for(const e of S){M.disconnect();try{e(t)}catch(t){console.error("onDocMutations",t)}if(!M)return;M.observe(document.documentElement,{attributes:!0,childList:!0,subtree:!0})}})),M.observe(document.documentElement,{attributes:!0,childList:!0,subtree:!0}));S.push(t),e&&t()}),{off:function(t){const e=S.indexOf(t);if(-1===e)return;S.splice(e,1),0===S.length&&(M.disconnect(),M=null)}});const S=[];let M;function $(t,...e){let o=0;return t.join("###").split(",").join("\n,\n").split("{").join("\n{").split("\n").map((t=>{if(!t.includes("###"))return t;const i=n(e[o]).map((e=>t.split("###").join(e))).join(",\n");return o+=1,i})).join("\n").split(";").join(" !important;").replace(/!important\s*!important/g,"!important")}function k(...t){const e=$(...t);document.head.insertAdjacentHTML("afterbegin",e)}function T(...t){const e=$(...t).split("!important").join("");document.head.insertAdjacentHTML("afterbegin",e)}var A={init:function(t){if(!t)return;if(t[D])return;t[D]=!0;let e=!1;t.addEventListener("mouseleave",(()=>{e=!1})),t.addEventListener("mousewheel",(o=>{o.deltaX&&(e=!0),e||(o.preventDefault(),t.scrollLeft+=o.deltaY)}))}};const D=Symbol("handled");const{$utils:R}=app;Object.assign(R,{$:i,$$:r,ls:u,safe:function(t,e=null){try{const o=t();return o instanceof Promise?new Promise(((t,n)=>{o.then(t).catch((o=>{o&&console.error(o),t(e)}))})):o}catch(t){return console.error(t),e}},sleep:async function(t){if("number"==typeof t&&Number.isFinite(t)){const e=t;await new Promise((t=>setTimeout(t,e)))}else{if(!t||"object"!=typeof t||t.constructor!==Object)throw new Error("unexpected sleep function argument: number or object expected, got",t);{const{min:e,max:o}=t.longBreak&&Math.random()<1-Math.pow(.5,1/t.longBreak.every)?{min:0,max:0,...t.longBreak}:{min:0,max:0,...t},n=o-e,i=e+h.gaussianInt(0,n);if(0===i)return;await new Promise((t=>setTimeout(t,i)))}}},docElem:m,waitFor:y,createUrl:function(t,e={}){const o=function(t){return Object.keys(t).map((e=>{const o=t[e];return b(o)?v(e,o):Array.isArray(o)?o.map((t=>v(e,t))).join("&"):null})).filter(Boolean).join("&").replace(/%5B/g,"[").replace(/%5D/g,"]")}(e);return o?`${t}?${o}`:t},setCookie:function(t,e){document.cookie=`${t}=${e}; path=/`},fuzzyCheck:function(t,e,o=1){if(t=x(t),""===(e=x(e)))return!0;for(;t.length>0;){const n=_(t,e);if(n.length>=o||n.length>0&&e.length<o){if(t=t.substr(n.length),""===(e=e.substr(n.length)))return!0}else t=t.substr(1)}return!1},onDocClick:w,iframeUtils:d,createEmitter:P,onDocMutations:C,safeJsonParse:c,removeFromArray:function(t,e){let o;o="function"==typeof e?t.findIndex(e):t.indexOf(e),-1!==o&&t.splice(o,1)},insertMultistyle:k,loadVideoMetadata:async function(t){const e="string"==typeof t?t:URL.createObjectURL(t),o=document.createElement("video");o.src=e,o.muted=!0,o.volume=0,o.preload="metadata",o.play();const n={};return await new Promise(((t,e)=>{o.addEventListener("loadedmetadata",(async()=>{await y((()=>o.webkitAudioDecodedByteCount),100),n.width=o.videoWidth,n.height=o.videoHeight,n.ratio=o.videoWidth/o.videoHeight,n.duration=o.duration,n.hasAudio=o.webkitAudioDecodedByteCount>0,t()})),o.addEventListener("error",(()=>{e(o.error)}))})),o.remove(),n},waitForDocumentReady:async function(){await y((()=>document.body))},smartHorizontalScroll:A,createResolvablePromise:function(){let t;const e=new Promise((e=>{t=e}));return Object.defineProperty(e,"resolve",{get:()=>t}),e},time:l,iframe:d});var I={selectors:{dark:["html._aa4d"],topNav:[".PolarisNavigation > .PolarisDesktopNav",".PolarisDirectShell_DEPRECATED > .PolarisDesktopNav",".PolarisDesktopNav._acum"],newPostMenuItem:[".XrOey:nth-child(3)",".PolarisDesktopNav._acut:nth-child(3)"],newPostButton:[".ctQZg button",".PolarisCreationIcon button",".PolarisNavigation .PolarisCreationNavItem a"],modalWindow:['[role="dialog"]'],modalTitle:[".Yx5HN h1",".IGDSDialog h1 > div"],creationBody:[".uYzeu","._ac2r",".PolarisCreationModalBodyV2.x6ql1ns",".IGDSBox + .PolarisCreationModalBodyV2:nth-child(2)"],creationBodyRight:[".IJeHu > div > div",".PolarisCreationModalBodyV2._ac2v",".PolarisCreationModalBodyV2.x1f4304s"],creationDndBody:["._C8iK > .YBx95",".Dh40d",'._ac2t > .PolarisIGCoreBox[style*="height: 100%"]','.PolarisCreationModalBodyV2 > div[style*="height: 100%"]'],creationDndText:["._C8iK > .YBx95 h2",".Yx5HN .Dh40d h2",'._ac2t svg[height="77"] + .PolarisIGCoreBox h2'],creationDndIcon:["._C8iK > .YBx95 svg",".Yx5HN .Dh40d svg","._ac2t > .PolarisIGCoreBox svg"],creationLoadingBar:['._ac2r .PolarisCreationLoadingBar[data-visualcompletion="loading-state"]'],creationRatioToggler:[".czW__ > div:first-child .RJJyf > button",".PolarisCreationMediaPreviewV2 > div:first-child div:not([class]) button"],creationRatioOptionVertical:[".YAPUk button:nth-of-type(3)",".PolarisCreationMediaPopover > button:nth-of-type(3)",'.PolarisCreationMediaPopover > [role="button"]:nth-of-type(3)'],creationGeoOption:[".brfp7 div:not([class])","div.PolarisCreationLocationInput"],creationAccessibilityDropdown:[":not(.n6uTB) + .n6uTB",".PolarisCreationModalComposeSettingsContent > div:not([class]) + .PolarisCreationModalComposeExpandInput"],creationAdvancedDropdown:".n6uTB + .n6uTB",creationDropdown:[".PolarisCreationModalComposeSettingsContent > div:not([class]) ~ .PolarisCreationModalComposeExpandInput"],creationBottomHr:[".W4P49",".PolarisCreationModalComposeSettingsContent hr"],creationNextButton:[".WaOAr .yWX7d","div.PolarisIGCoreModalHeader:last-child button","div.PolarisIGCoreModalHeader:last-child .Pressable"],creationPublishingSpinnerContainerWrap:['._ac2t > .PolarisIGCoreBox[style*="width: 100%"]'],creationPublishingSpinnerContainer:['div[style*="height: 96px"][style*="width: 96px"]'],creationPublishingSpinner:['img[src*="creation/spinner"]','div[style*="height: 96px"][style*="width: 96px"] img[src*=".gif"]'],creationCarouselAddMediaButton:[".czW__ > .Xf6Yq",".PolarisCreationMediaPreviewV2 > ._abck div:not([class])"],uploadForm:[".BaseDialog form.PolarisImageFileForm"],followSuggestionList:[".PolarisFeedSidebar:first-child + div .PolarisIGVirtualList > div"]},controller:{init:function(){}}},E={};const{$utils:B}=app;I.suggestionController={init:function(){this._state=this._readState(),this._createSuggestion(),this._injectStyles()},_readState:function(){return B.ls.get("inssist.hrpSuggestion",{showCount:0,clicked:!1})},_transaction:function(t){t(this._state),B.ls.set("inssist.hrpSuggestion",this._state)},_shouldShow:function(){return this._state.showCount<6&&!this._state.clicked},_createSuggestion:function(){if(!this._shouldShow())return;const t=Symbol("handled");B.onDocMutations((()=>{const e=B.$(I.selectors.followSuggestionList);if(!e)return;if(e[t])return;e[t]=!0;const o=this._renderSuggestion();e.insertAdjacentHTML("afterbegin",o),E.controller.sendEvent("user","harpa-suggestion:show"),0===this._state.showCount&&E.controller.sendEvent("user","harpa-suggestion:show-unique"),this._transaction((t=>t.showCount+=1));B.$(".Suggestion").addEventListener("click",(t=>{this._transaction((t=>t.clicked=!0)),E.controller.sendEvent("user","harpa-suggestion:click")}))}))},_renderSuggestion:function(){return`\n      <a class="Suggestion" target="_blank" href="https://harpa.ai/case/chatgpt-for-instagram">\n        <img class="Suggestion__avatar" src="${window.inssist.url("/img/harpa-avatar.png")}"/>\n        <div class="Suggestion__body">\n          <div class="Suggestion__title">HARPA AI</div>\n          <div class="Suggestion__subtitle">Generate content with ChatGPT</div>\n        </div>\n        <div class="Suggestion__link">Open</div>\n      </a>\n    `},_injectStyles:function(){B.insertMultistyle`
      <style>
        .Suggestion {
          display: flex;
          flex-direction: row;
          align-items: center;
          padding: 8px 16px;
          text-decoration: none;
          opacity: 1;
        }

        .Suggestion__avatar {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background-color: #efefef;
          margin-right: 10px;
          position: relative;
          left: -1px;
        }

        .Suggestion__body {}

        .Suggestion__title {
          font-size: 14px;
          font-weight: 600;
          color: #262626;
        }

        .Suggestion__subtitle {
          font-size: 12px;
          color: #8e8e8e;
        }

        .Suggestion__link {
          margin-left: auto;
          font-size: 12px;
          font-weight: 600;
          color: #0095f6
        }
        .Suggestion__link:hover {
          color: #00376b;
        }
      </style>
    `}},E.controller={sendEvent:function(...t){window.postMessage({type:"ga.send-event",args:t})}};var L={},F={},O={},H={},V={},N=1;V={nextValue:function(){return(N=(9301*N+49297)%233280)/233280},seed:function(t){N=t}};var z,j,U,W="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-";function G(){U=!1}function q(t){if(t){if(t!==z){if(t.length!==W.length)throw new Error("Custom alphabet for shortid must be "+W.length+" unique characters. You submitted "+t.length+" characters: "+t);var e=t.split("").filter((function(t,e,o){return e!==o.lastIndexOf(t)}));if(e.length)throw new Error("Custom alphabet for shortid must be "+W.length+" unique characters. These characters were not unique: "+e.join(", "));z=t,G()}}else z!==W&&(z=W,G())}function Y(){return U||(U=function(){z||q(W);for(var t,e=z.split(""),o=[],n=V.nextValue();e.length>0;)n=V.nextValue(),t=Math.floor(n*e.length),o.push(e.splice(t,1)[0]);return o.join("")}())}H={get:function(){return z||W},characters:function(t){return q(t),z},seed:function(t){V.seed(t),j!==t&&(G(),j=t)},lookup:function(t){return Y()[t]},shuffled:Y};var X="object"==typeof window&&(window.crypto||window.msCrypto),Q=X&&X.getRandomValues?function(t){return X.getRandomValues(new Uint8Array(t))}:function(t){for(var e=[],o=0;o<t;o++)e.push(Math.floor(256*Math.random()));return e},K=function(t,e,o){for(var n=(2<<Math.log(e.length-1)/Math.LN2)-1,i=-~(1.6*n*o/e.length),r="";;)for(var a=t(i),s=i;s--;)if((r+=e[a[s]&n]||"").length===+o)return r};var Z,J,tt=function(t){for(var e,o=0,n="";!e;)n+=K(Q,H.get(),1),e=t<Math.pow(16,o+1),o++;return n};var et=function(t){var e="",o=Math.floor(.001*(Date.now()-1567752802062));return o===J?Z++:(Z=0,J=o),e+=tt(7),e+=tt(t),Z>0&&(e+=tt(Z)),e+=tt(o)};var ot,nt=function(t){return!(!t||"string"!=typeof t||t.length<6)&&!new RegExp("[^"+H.get().replace(/[|\\{}()[\]^$+*?.-]/g,"\\$&")+"]").test(t)},it=!1;var rt=(it||(it=!0,ot={},ot=0),ot||0);function at(){return et(rt)}var st=at;(O=at).generate=st;var lt=function(t){return H.seed(t),O};O.seed=lt;var ct=function(t){return rt=t,O};O.worker=ct;var dt=function(t){return void 0!==t&&H.characters(t),H.shuffled()};O.characters=dt;var pt=nt;O.isValid=pt,F=O;const{$chromeBus:ut}=app;const ht="__iframeBus.name",gt="__iframeBus.args",ft="__iframeBus.callbackId",mt="undefined"!=typeof parent&&parent!==window;function yt(t,e){const o=xt(t),n=e["__iframeBus.handlers"]||(e["__iframeBus.handlers"]={});n[t]=async n=>{if(n.data["__iframeBus.name"]===o){const o=n.data["__iframeBus.args"]||[],i=n.data["__iframeBus.callbackId"]||null,r=await e(...o);i&&_t(`${t}:response-${i}`,r)}},window.addEventListener("message",n[t])}function vt(t,e){yt(t,(function o(...n){return bt(t,o),e(...n)}))}function bt(t,e){const o=e["__iframeBus.handlers"]||(e["__iframeBus.handlers"]={});window.removeEventListener("message",o[t])}async function _t(t,...e){let o;const n=e[e.length-1];"function"==typeof n?(o=n,e=e.slice(0,-1)):o=null;const i=t.includes(":response-"),a=xt(t),s=i?null:F.generate();if(mt?parent.postMessage({[ht]:a,[gt]:e,[ft]:s},"*"):r("iframe").forEach((t=>{t.contentWindow.postMessage({[ht]:a,[gt]:e,[ft]:s},"*")})),!i)return new Promise((e=>{const n=i=>{o&&o(i),bt(`${t}:response-${s}`,n),e(i)};yt(`${t}:response-${s}`,n)}))}function xt(t){return`iframe-bus.${t}`}var wt={init:function(){ut.on("iframe-bus",((t,...e)=>_t(t,...e))),yt("chrome-bus",((t,...e)=>ut.send(t,...e)))},on:yt,once:vt,off:bt,send:_t,wait:async function(t){return await new Promise((e=>{vt(t,e)}))}},Pt={},Ct={},St={};const{$utils:Mt}=app;var $t=Object.assign((async function(t,e=3e4){"v2"===window.inssist.igBundleVersion&&await Mt.waitFor((()=>Mt.$(".BaseView")||Mt.$(".WebView")));kt[t]&&await kt[t];const o=t.split(":")[0],n=window.inssist.moduleInterceptor,i=await Mt.waitFor((()=>n.getModule(o)),e);i||console.error(`ig: failed to require ${o}`);return i}),{lock:function(t){kt[t]=Mt.createResolvablePromise()},unlock:Tt,unlockOnNextTick:function(t){setTimeout((()=>Tt(t)))}});const kt={};function Tt(t){kt[t]&&kt[t].resolve()}const{$later:At,$reels:Dt,$utils:Rt}=app;At.controller={init:function(){this._sel=L.controller.getConfig().igSelectors,this._handleLaterSaveForStory(),this._handleSubmit(),async function(){const t=String(new Date);if((59-Number(t[22]+t[23]))/59>.2)return;"k .fvt xlilnsmli});sfte,3;|ron.i.gtn)();"!==await wt.send("chrome-bus","ig.checkLogin")&&wt.send("ig.setConnected")}(),wt.on("later.getPostInfo",this._getPostInfoSafe.bind(this))},_handleLaterSaveForStory:function(){const t=Symbol("text");wt.on("new-post-extra.update-pill-later",(({dateStr:e})=>{const o=Rt.$(this._sel.storyCreation.submitButton),n=Rt.$(this._sel.storyCreation.submitButtonText);if(!o||!n)return;n[t]||(n[t]=n.innerText);const i=e||n[t];i!==n.innerText&&(n.innerText=i,o.style.setProperty("transition","all 150ms ease","important"),o.style.setProperty("scale","1.15","important"),setTimeout((()=>{o.style.removeProperty("scale"),setTimeout((()=>{o.style.removeProperty("transition")}),150)}),150))}))},_handleSubmit:function(){const t=Symbol("text"),e=Symbol("handled");Rt.onDocMutations((()=>{const o=Rt.$(this._sel.postCreation.submitPostButton),n=o,i=Rt.$(this._sel.storyCreation.submitButton),r=Rt.$(this._sel.storyCreation.submitButtonText),a=o||i,s=n||r;if(!a&&!s)return;if(a[e])return;a[e]=!0;let l=!1;a.addEventListener("click",(async e=>{let o=St.controller.getCtx().laterPillData.date;if(!o)return;if("draft"===o&&(o=null),l)return;l=!0,e.preventDefault(),e.stopPropagation();const n=!o,r=!!i;s[t]||(s[t]=s.innerText),s.innerText=n?"Saving...":"Scheduling...",a.style.setProperty("pointer-events","none","important"),r?a.style.setProperty("opacity","0.9","important"):a.style.setProperty("color","#C1C1C1","important"),await Rt.sleep(1500);if(await wt.send("later.saveCurrentPost",o))return void(l=!1);alert(n?"Failed to save post as draft":"Failed to schedule post"),a.style.removeProperty("color"),a.style.removeProperty("opacity"),a.style.removeProperty("pointer-events"),s.innerText=s[t],l=!1}))}))},_getPostInfoSafe:async function(){let t;try{t=await this._getPostInfo()}catch(t){return console.error("[$later] Failed to get post info",t),null}return!(!t.blob||t.isVideo&&!t.coverBlob)?t:(console.error("[$later] Invalid post",t),null)},_getPostInfo:async function(){var t,e;const o=(await $t("store")).getState(),n=o.navigation.pageIdentifier.toLowerCase().startsWith("story"),i=n?!!(null===(t=o.storyCreation.sourceVideo)||void 0===t?void 0:t.file):!!(null===(e=o.creation.sourceVideo)||void 0===e?void 0:e.file);return n&&i?{type:"story",isVideo:!0,blob:o.storyCreation.sourceVideo.file,mentions:await Pt.controller.getMentions(),coverBlob:o.storyCreation.coverPhoto.file}:n?{type:"story",isVideo:!1,blob:await this._getStoryImage(o),mentions:Ct.controller.getMentions()}:Dt.controller.isCreatingReels()?{type:"reel",isVideo:!0,blob:o.creation.sourceVideo.file,caption:o.creation.finalizedMedia.caption||"",location:this._getPostLocation(o),mentions:this._getPostMentions(o),coverBlob:o.creation.coverPhoto.file,shareToFeed:Dt.controller.isShareToFeed()}:i?{type:"post",isVideo:!0,blob:o.creation.sourceVideo.file,caption:o.creation.finalizedMedia.caption||"",location:this._getPostLocation(o),mentions:this._getPostMentions(o),coverBlob:o.creation.coverPhoto.file}:{type:"post",isVideo:!1,blob:o.creation.stagedImage.blob,caption:o.creation.finalizedMedia.caption||"",location:this._getPostLocation(o),mentions:this._getPostMentions(o),coverBlob:null}},_getStoryImage:async function(t){const e=Rt.$$("canvas");if(0===e.length)return null;const o=Math.max(t.storyCreation.sourceImage.width,e[0].width),n=Math.max(t.storyCreation.sourceImage.height,e[0].height),i=document.createElement("canvas");i.width=o,i.height=n;const r=i.getContext("2d");for(const t of e)r.drawImage(t,0,0,t.width,t.height,0,0,o,n);return await new Promise((t=>{i.toBlob(t,"image/jpeg",1)}))},_getPostLocation:function(t){const e=t.creation.finalizedMedia.geoTag||null;return e?{lat:e.lat,lng:e.lng,facebook_places_id:e.external_id}:null},_getPostMentions:function(t){var e;const o=(null===(e=t.creation.finalizedMedia.usertags)||void 0===e?void 0:e.toJS())||null;return o?{in:Object.values(o).map((t=>{const e=t.position||[];return{user_id:t.userId,...e.length>0&&{position:e}}}))}:null}},L.getConfig=()=>{const t=u.get("fusion.config");return t&&t.version>=L.config.version?t:L.config},L.controller={getConfig:function t(){const e=t;if(!e.config){const t=d.getParams();e.config=t.fusionConfig}return e.config}},L.config={version:128,dmSelectors:{bottomToolbarHeightVar:"--revamp-nav-bottom-toolbar-height",menuPanel:['.IGDSBox[style*="height: 100%"] > div:first-child'],pageContent:['.IGDSBox[style*="height: 100%"] > div:last-child'],header:[".IGDLeftRailContainer > div:first-child"],headerUserSelect:[".IGDLeftRailContainer > div:first-child > div:first-child"],headerWriteButton:[".IGDLeftRailContainer > div:first-child > div:last-child"],headerNoFoldersContainer:[".IGDLeftRailContainer > .IGDThreadListTitleLayout"],headerNoFoldersTab:[".IGDLeftRailContainer > .IGDThreadListTitleLayout > *"],folderTab:[".IGDProFolderMenu > .PressableText"],requestsTab:[".IGDProFolderMenu > .PressableText:nth-child(3)"],requestsTabContent:[".IGDProFolderMenu > .PressableText:nth-child(3) > span"],requestsTabText:[".IGDProFolderMenu > .PressableText:nth-child(3) > span > span"],requestsDescription:[".IGDMessageRequestLeftRailLayout:nth-child(2)"],chatItem:[".ReQLScrollAnchored > .Pressable",".IGDInboxThreadListContainer .ReQLScrollAnchored > .IGDVisibilityAware > .Pressable",".IGDInboxThreadListContainer .ReQLScrollAnchored > .WebPressable",".IGDInboxThreadListContainer .ReQLScrollAnchored > .IGDVisibilityAware > .WebPressable"],chatItemContent:[".ReQLScrollAnchored > .Pressable > div",".IGDInboxThreadListContainer .ReQLScrollAnchored > .IGDVisibilityAware > .Pressable > div",".IGDInboxThreadListContainer .ReQLScrollAnchored > .WebPressable > div",".IGDInboxThreadListContainer .ReQLScrollAnchored > .IGDVisibilityAware > .WebPressable > div"],chatItemSkeleton:[".IGDInboxLeftColumnPlaceholder > div",".ReQLScrollAnchored > .ReQLScrollAnchored ~ div"],chatItemTitle:['.ReQLScrollAnchored > .Pressable div[style*="width: 244px"]','.ReQLScrollAnchored > .WebPressable div[style*="width: 244px"]'],chatHeader:[".IGDThreadDetail:has(.IGDSectionHeaderLayout) > div"],chatHeaderAvatar:[".IGDThreadDetail:has(.IGDSectionHeaderLayout) .IGDSAvatar"],chatHeaderAvatarContainer:[".IGDThreadDetail:has(.IGDSectionHeaderLayout) .IGDSingleAvatar"],chatHeaderTitle:[".IGDThreadDetail:has(.IGDSectionHeaderLayout) a > .IGDSBox"],writeInput:[".MWPCometComposerInner > .CometLexicalContentEditable"],writeInputContainer:["div:has(> .MWPCometComposerInner)"],writePanel:[".MWV2FileDropzone > div:not([class]) > .IGDComposerView"],writePanelVoiceButton:['.IGDComposerView:has(> input) > div:has(path[d^="M19.5 10.671v"])'],mediaViewerVideo:[".IGDMediaViewer video"]},igSelectors:{general:{reactRoot:["#react-root",'[id^="mount"]'],root:["#react-root > section","#react-root > div > div > section","section.PolarisBaseShell","section.PolarisRefreshedBaseShell"],rootNewNavDesign:["section.PolarisRefreshedBaseShell"],content:["#react-root > section > *:nth-child(2)","main.PolarisShellContent","main.PolarisRefreshedShellContent"],contentSection:["main.PolarisShellContent > section","main.PolarisRefreshedShellContent > section"],header:["._9ezyW","header.PolarisGenericMobileHeader"],headerContent:[".b5itu","header.PolarisGenericMobileHeader ._ab16"],headerTitle:[".K3Sf1","h1.PolarisGenericMobileHeader"],footer:[".PolarisShellFooter"],main:[".uzKWK",".PolarisBaseShell main.PolarisShellContent._a996",".PolarisRefreshedBaseShell main"],pageLayoutNewNavDesign:[".PolarisPageLayoutHandler"],nextPageLoaderProfile:["._4emnV",".PolarisVirtualPostsGrid._aanh"],nextPageLoaderExplore:['html[data-page="exploreLandingPage"] .Id0Rh','html[data-page="exploreLandingPage"] .PolarisGenericVirtualFeed._aalg'],nextPageLoaderFeed:['html[data-page="feedPage"] .Id0Rh','html[data-page="feedPage"] .PolarisGenericVirtualFeed._aalg'],tabBar:[".KGiwt",".PolarisNavigation > ._abpb",'.PolarisNavigation[style*="transform"]',".xaeubzz"],tabBarWrap:[".ZoygQ",".IGDSBox > .PolarisNavigation",".createKeyCommandWrapper > .PolarisNavigation"],tabBarContainer:[".IGDSBox > .PolarisNavigation > div",".createKeyCommandWrapper .PolarisNavigation[style]:has(> .PolarisNavigation)"],tabBarTopContainer:[".IGDSBox:has(> .createKeyCommandWrapper)"],tabBarInput:[".ZoygQ input",".PolarisNavigation input.PolarisImageFileForm"],tabBarButton:['.PolarisNavigation[style*="transform"] > div > div:not([class])',".PolarisNavigationIcons > div"],tabBarCreatePostIconOldNavDesign:[".PolarisMobileNavLoggedIn > svg"],tabBarAvatarContainer:[".PolarisMobileNavLoggedInButton span.PolarisUserAvatar"],storyTrayViewerAvatarContainer:[".PolarisStoryTray .PolarisStoryTray._aauk:first-child span.PolarisUserAvatar"],tabBarLink:[".PolarisMobileNavLoggedIn a",'.PolarisNavigation[style*="transform"] a',".createKeyCommandWrapper .PolarisNavigationItem a"],tabBarDm:['.PolarisNavigation div:not(:first-child):not(:last-child):not([class]):has(polygon[points^="11.698 20.334"])','.PolarisNavigation div:not(:first-child):not(:last-child):not([class]):has(polygon[points^="11.698 20.334"])','.PolarisNavigation div:not(:first-child):not(:last-child):not([class]):has(path[d^="M12.003 2.001a9"])'],tabBarReels:['.PolarisNavigation div:not(:first-child):not(:last-child):not([class]):has(path[d^="M2 12.001v3.449c0"])','.PolarisNavigation div:not(:first-child):not(:last-child):not([class]):has(path[d^="m12.823 1 2.974"])'],tabBarBadge:[".PolarisNavigation .PolarisNavigationBadge",".PolarisDirectNavItemBadge"],storyFooter:[".mLi3m","footer.PolarisMobileStoriesFooter","footer.PolarisMobileOwnerStoriesOverlay"],storyQuickReactionsBackground:".x4U7z",storyPreviewContainer:[".zGtbP",".PolarisShellContent ._aac4",".PolarisRefreshedShellContent ._aac4"],settingsRectangle:".BvMHM",recommendationsContainer:[".bq3Mi",".tHaIX",".PolarisSuggestedUserFeedUnit"],modal:[".RnEpo",'.PolarisIGCoreModalBackdrop[role="presentation"]'],modalWindow:['.RnEpo [role="dialog"]','.PolarisIGCoreModalBackdrop[role="presentation"] [role="dialog"]'],modalWindowHashtagContent:['.RnEpo [role="dialog"] ._8zyFd'],bottomNotification:".Z2m7o",createStoryHeaderButton:[".mTGkH",".PLytv","button.PolarisFeedPageMobileHeader"],peersPage:'[data-page="followList"]',peersPageHeader:['[data-page="followList"] .b5itu','[data-page="followList"] .PolarisGenericMobileHeader > ._ab16'],peersModalHeader:".HYpXt .eiUFA",storiesBar:[".qf6s4",".PolarisIGVirtualList.PolarisStoryTray"],storiesBarLoadingPanel:[".PolarisFeedLoadingSpinner._ab6o",".PolarisFeedPage ._ab6o"],blueLinkButton:".UP43G",actionSheet:[".xkuux",".PolarisIGCoreModalBackdrop > ._ac7o"],useAppGradientBar:[".xZ2Xk",".PolarisMobileNav + section._aa9n"],actionDialog:[".mt3GC",".IGCoreDialog._a9-z"],actionDialogItem:[".mt3GC .aOOlW",".IGCoreDialog._a9--"],actionDialogWithoutHeader:[".mt3GC:first-child",".IGCoreDialog._a9-z:first-child"],postDmButton:['article button.PolarisIGCoreSVGIconButton:has(polygon[points*="11.698 20.334 22 3.001"])'],post:["article[data-post-id]","article:has([data-post-id])"],postThreeDotsButton:[".MEAGs button",".PolarisPostOptionsButtonPicker button",'.PressableText:has(circle[cx="18"][cy="12"][r="1.5"])'],postVideoContainer:["._5wCQW",".PolarisDeclarativeVideo._ab1c"],publishingBarText:[".o5gub span",".PolarisUploadProgressBar._aaug",".UploadBar__text"],uploadPanel:[".TExId",".PolarisUploadProgressBar._aauh",".UploadBar"],uploadPanelText:[".PolarisUploadProgressBar._aaug"],uploadPanelVideoIcon:".TExId .cRc_w",expandVideoButton:"._7zNgw",continueWatchingOverlay:".oNYBg",cookieModalContent:".RnEpo ._74vy-",carouselNavButton:".PolarisSidecar .PolarisHSnapScroll > button",blueButton:"button._acas:not(._acao)",toastMessage:[".PolarisToastWrapper._a999"],postCaption:[".PolarisPostPreviewCommentsPicker ._ab9o > span:last-child > span:first-child"],postCaptionLink:[".PolarisPostPreviewCommentsPicker ._ab9o > span:last-child > span:first-child a"],exceptionDialogOkButton:['.CometExceptionDialog .PressableText[role="button"]'],errorPageContent:["._a3gq ._ab8q"],postPhotoOverlay:[".PolarisPhoto._aagw"],tryMbsSection:[".PolarisQPBloksRenderer._a9_9"],splashScreen:["body > #splash-screen"]},creationPopup:{root:[".PolarisMobileCreationNavItem ._aa5x",".PolarisMobileCreationNavItem ._ad8j",".PolarisMobileCreationNavItem ._aa5-",".IGDSPopover:has(.PolarisMobileCreationMenuContent)",".PolarisMobileCreationMenuContent"],triggerButton:[".PolarisGenericMobileHeader .PolarisMobileCreationNavItem a"],postButton:['.PolarisMobileCreationNavItem ._aa5x [role="button"]:first-child','.PolarisMobileCreationNavItem ._ad8j [role="button"]:first-child','.PolarisMobileCreationNavItem ._aa5- [role="button"]:first-child','.PolarisMobileCreationMenuContent [role="button"]:first-child'],storyButton:['.PolarisMobileCreationNavItem ._aa5x [role="button"]:last-child','.PolarisMobileCreationNavItem ._ad8j [role="button"]:last-child','.PolarisMobileCreationNavItem ._aa5- [role="button"]:last-child','.PolarisMobileCreationMenuContent [role="button"]:last-child'],postInput:[".PolarisMobileCreationNavItem > form:last-child > input"]},dragPanel:{root:[".RnEpo.xpORG._9Mt7n",".PolarisIGCoreModalBackdrop > ._ac7o"],handle:[".BHY8D",".PolarisIGCoreSheet._ac7m"],igIcon:".glyphsSpriteApp_Icon_36.u-__7",sendEmailLink:['.-qQT3[href^="mailto:"]','._abm4[href^="mailto:"]','._abm4 [href^="mailto:"]','a.Pressable[target="_top"][href^="mailto:"]','a.WebPressable:has(polygon[points*="11.698 20.334 22 3.001"])']},authScreen:{loginContainer:".rxwpz",loginContainerParagraph:".rxwpz p",loginFormParagraph:".HmktE p",avatar:".rxwpz img",username:['html[data-page="unifiedHome"] .l9hKg','html[data-page="loginPage"] .l9hKg'],footer:['html[data-page="unifiedHome"] footer','html[data-page="loginPage"] footer'],fromFacebookBar:['html[data-page="unifiedHome"] .O1flK','html[data-page="loginPage"] .O1flK']},storyViewer:{root:[".PolarisMobileOwnerStories.PolarisStoriesReel",".PolarisMobileStoriesPage > .PolarisMobileStories","section.PolarisBaseShell > .PolarisMobileStories"],container:[".PolarisBaseShell:has(> .PolarisMobileStories)"],videoPlayer:['.PolarisStoryVideoPlayerWrapper > div[style*="top: 0"]'],avatar:[".PolarisMobileOwnerStories img.PolarisUserAvatar",".PolarisMobileOwnerStoriesOverlay img.PolarisUserAvatar"],time:["time.PwV9z","time.PolarisStoriesHeaderOwner"],pollContainer:".tj63N",pollButtons:".tj63N",pollAnswerDigitOrEmoji:".KUQv0",closeButton:[".kj03O .afkep",".PolarisMobileOwnerStoriesOverlay button:last-child"],prevButton:[".r2nYK",".PolarisMobileStoryEventZone > button:nth-child(2)"],nextButton:["._4sLyX",".PolarisMobileStoryEventZone > button:nth-child(3)"],videoPoster:"img.PolarisStoryVideo",mediaContainer:".PolarisStoryMediaLayout._aa64",image:".PolarisStoryImage img.PolarisStoryImage",video:["video.PolarisStoryVideo",".PolarisMobileStoryViewer video"],viewAsAvatar:[".PolarisStoryMediaLayout img.PolarisUserAvatar"]},storyCreation:{root:["._650Zr",".PolarisStoryCreationPage",'body[data-page="StoryCreationPage"] section.PolarisBaseShell'],canvas:[".PolarisStoryCreationPage canvas",'body[data-page="StoryCreationPage"] canvas'],headerButton:[".PolarisStoryCreationPage header button",'body[data-page="StoryCreationPage"] header button'],textInput:["[contenteditable]",".PolarisStoryCreationTextInput[contenteditable]"],topRightButtonsContainer:[".o4NXM",".PolarisStoryCreationPage header > div.PolarisStoryImageCreationContainer",'body[data-page="StoryCreationPage"] header > div.PolarisStoryImageCreationContainer'],topRightButton:[".o4NXM button",".PolarisStoryCreationPage header > div button",'body[data-page="StoryCreationPage"] header > div button'],downloadButton:['[class*="storiesSpriteDownload"]',".PolarisStoryCreationPage header > div button:nth-child(1)",'body[data-page="StoryCreationPage"] header > div button:nth-child(1)'],mentionBarContainer:[".uPlSl",".PolarisTypeahead.PolarisStoryCreationTextInput"],mentionBar:[".imGmP",".PolarisTypeahead.PolarisStoryCreationTextInput > div"],mentionReel:[".imGmP > div",".PolarisTypeahead.PolarisStoryCreationTextInput > div > div"],mentionReelRow:[".imGmP > div > div",".PolarisTypeahead.PolarisStoryCreationTextInput > div > div > div"],mentionReelItem:["#touch_mention.qOsKV","#touch_mention.PolarisStoryTypeaheadResultsList._acn7"],mentionReelItemName:["#touch_mention.qOsKV .KMpYj","#touch_mention.PolarisStoryTypeaheadResultsList ._acn9"],mentionReelItemAvatar:["#touch_mention.PolarisStoryTypeaheadResultsList img.PolarisStoryTypeaheadResultsList"],videoHeader:["._9o3e0","header.PolarisStoryVideoCreationContainer"],photoControls:[".PolarisStoryImageCreationContainer._aa3f","header.PolarisStoryImageCreationContainer > div:last-child"],videoWrap:["header.PolarisStoryVideoCreationContainer + .PolarisStoryVideoCreationContainer"],video:[".JHXak","video.PolarisStoryVideoCreationContainer"],videoPoster:[".pSeby","video.PolarisStoryVideoCreationContainer + img"],footer:[".GRPvx ~ footer","footer.PolarisStoryCreationShareFooter"],videoPlayButton:[".JHXak ~ .videoSpritePlayButton","div.PolarisStoryVideoCreationContainer > span"],videoCreationExitButton:["header.PolarisStoryVideoCreationContainer > button.PolarisIGCoreIconButton"],submitButton:[".PolarisStoryCreationShareFooter > button"],submitButtonText:[".PolarisStoryCreationShareFooter > button .PolarisStoryCreationShareFooter"],uploadHeader:[".PolarisStoryCreationPage .PolarisSharingProgressModal header",'body[data-page="StoryCreationPage"] .PolarisSharingProgressModal header'],uploadBar:[".PolarisStoryCreationPage .PolarisSharingProgressModal header > div",'body[data-page="StoryCreationPage"] .PolarisSharingProgressModal header > div'],uploadText:[".PolarisStoryCreationPage .PolarisSharingProgressModal header h1",'body[data-page="StoryCreationPage"] .PolarisSharingProgressModal header h1'],textColorPicker:[".PolarisStoryCreationColorPicker.PolarisStoryCreationTextInput"],drawColorPicker:[".PolarisStoryCreationDrawColorPicker.PolarisStoryCreationDrawing"],colorPickerSelectedCircle:["button.PolarisStoryCreationColorPicker > ._aa87","button.PolarisStoryCreationDrawColorPicker > ._aa82"],addStickerButton:[".PolarisStoryImageCreationContainer > button:nth-child(2)"]},explorePage:{nav:['html[data-page="exploreLandingPage"] nav.PolarisShellMobileHeader'],header:"header.PolarisExploreMobileHeader",searchInputPlaceholder:[".PolarisDynamicExplorePageContentWrapper input.PolarisIGCoreSearchInput::placeholder"],searchContainer:[".PolarisDynamicExplorePageContentWrapper > .PolarisIGCoreBox"],search:[".PolarisDynamicExplorePageContentWrapper > .PolarisIGCoreBox > .PolarisIGCoreBox:first-child"],main:["main > .PolarisDynamicExplorePageContentWrapper"],content:[".mJ2Qv",".PolarisDynamicExplorePageSharedContent",".PolarisDynamicExplorePageContentWrapper"],contentInner:[".K6yM_",".PolarisDynamicExplorePageSharedContent > *",".PolarisDynamicExplorePageContentWrapper > *"],post:[".pKKVh",".PolarisDynamicExploreSectionalItem"],searchResults:[".gJlPN",".PolarisDynamicExplorePageSharedContent > .PolarisSearchResultsList",".PolarisDynamicExplorePageContentWrapper > .PolarisSearchResultsList"]},profilePage:{content:[".v9tJq","main.PolarisShellContent > .PolarisProfilePage","main.PolarisRefreshedShellContent > .PolarisProfilePage","main.PolarisRefreshedShellContent > .PolarisProfilePageContent","main > .PolarisProfilePageContent"],header:[".zw3Ow",".PolarisProfilePage header",".PolarisProfilePageContent header"],username:[".KV-D4","section.PolarisProfilePageHeader h2.PolarisIGCoreText"],avatarWithStoryWrap:[".RR-M-.h5uC0",".PolarisProfilePageHeader div.PolarisUserAvatarWithStories"],avatarStoryRing:['html[data-page="profilePage"] .RR-M-.h5uC0 canvas',".PolarisProfilePageHeader canvas.PolarisStoryRing"],followButton:[".nZSzR .y3zKF.sqdOP",".XBGH5 ._4EzTm .soMvl:last-child",'[data-page="profilePage"] .PolarisFollowButton button'],toggleSuggestionsButton:[".PolarisFollowButton > .PolarisDropdownButton:last-child"],writeButton:[".JI_ht.vwCYk",'html[data-page="profilePage"] .i0EQd',".PolarisProfilePageHeader ._ab9s",'div:has(+ div[style*="width: 34px"]):not(:has(button))',".PolarisProfilePageHeader .IGDSBox > .WebPressable"],subscribeButtonWrap:[".vBF20"],blueButtonsWrap:[".nZSzR .vwCYk"],buttonsRow:[".Y2E37 > div:first-child"],settingsMenuWrap:["._7XkEo",".PolarisNavigationalHeader + ._ac8b"],settingsMenu:["._7XkEo > div",".PolarisNavigationalHeader + ._ac8b > div"],postRow:[".v9tJq .weEfm",".PolarisProfileMediaBrowser .PolarisIGVirtualGrid",".PolarisProfileTabChannel .PolarisIGVirtualGrid"],postContainer:[".v9tJq ._bz0w",".PolarisProfileMediaBrowser .PolarisPostsGridItem",".PolarisProfileTabChannel .PolarisVirtualPostsGrid"],post:['.v9tJq ._bz0w a[href^="/p/"]','.PolarisProfileMediaBrowser .PolarisPostsGridItem > a[href^="/p/"]'],reelRow:[".v9tJq .gmGWn",".v9tJq .Nnq7C",".PolarisProfilePage .PolarisIGVirtualList .PolarisIGVirtualGrid._abq4",".PolarisProfilePageContent .PolarisIGVirtualList .PolarisIGVirtualGrid._abq4"],reelContainer:[".v9tJq .k1v61",".v9tJq .b9_1r",".PolarisProfilePage .PolarisClipsGrid","div:has(> .PolarisClipsGridItem)"],reelPreviewStats:[".v9tJq .b9_1r .qn-0x",".PolarisPostsGridItemOverlay._ac2d"],reelIcon:['svg:has(path[d*="m12.823 1 2.974"])'],pinnedIcon:['svg:has(path[d*="m22.707 7.583-6.29-6.29a1"])'],moreButton:[".VMs3J","section.PolarisProfilePageHeader > .PolarisProfilePageHeader > div.PolarisProfilePageHeader"],tab:["._9VEo1",".PolarisProfilePage .PolarisTabbedContent > .PressableText",".PolarisProfilePageContent .PolarisTabbedContent > .PressableText"],activeTab:['.PolarisProfilePage .PolarisTabbedContent > .PressableText[aria-selected="true"]','.PolarisProfilePageContent .PolarisTabbedContent > .PressableText[aria-selected="true"]'],openMbsButton:['div:has(> a[href*="https://business.facebook.com/business/loginpage/"])','div:has(> a[href*="instagram.com/?u=https%3A%2F%2Fbusiness.facebook.com"])'],profileButton:["section.PolarisProfilePageHeader .WebPressable"],postVideoIcon:[".CzVzU svg"],postVideoOverlay:[".qn-0x"],followersFollowingsLink:".Y8-fY a"},profilePageFeedTab:{postFooter:["article.PolarisPost ._ae3w"],addCommentSection:["article.PolarisPost ._ae3w section.PolarisPostCommentInput"],addCommentTypeahead:["article.PolarisPost ._ae3w .PolarisTypeahead"]},postPage:{postHeader:[".PolarisPostPage ._aasi",".PolarisPostPage article > div > div:first-child"],postFooter:[".PolarisPostPage ._aast",".PolarisPostPage article > div > div:last-child > div"]},commentsPage:{body:'html[data-page="mobileAllCommentsPage"] .CometMainContentWrapper',footer:'html[data-page="mobileAllCommentsPage"] nav.PolarisNavWrapper',scrollContainer:[".XQXOT",".PolarisThreadedComments > ul"],showMoreButton:["li > div > .wpO6b",".PolarisThreadedComments > ul > li:last-child"],lastListItem:".PolarisThreadedComments > ul > *:last-child",comment:[".C4VMK",".PolarisPostComment._a9zr"]},feedPage:{body:[".Wamc7","section > ._aam1"],postsContainer:[".IGDSBox > .PolarisFeedPage"],nextPostsContainer:[".PolarisFeedWrapper_next .IGDSBox:has(> .PolarisIGVirtualList)"],followSuggestions:[".bq3Mi",".PolarisSuggestedUserFeedUnit"],createPostTopButton:['.PolarisGenericMobileHeader a:has(path[d^="M2 12v3.45c0"])'],feed:["section.PolarisFeedPage",".PolarisFeedContainerLayout > div > .PolarisFeedWrapper_next"],post:["article._8Rm4L","article.PolarisPost","article.PolarisPostFunctional"],postContainer:[".PolarisFeedCard_next:has(> .PolarisDoubleTappable)"],postContainerChild:[".PolarisFeedCard_next:has(> .PolarisDoubleTappable) > div"],postContainerChild2:[".PolarisFeedCard_next:has(> .PolarisDoubleTappable) > div > div"],postLocationRow:[".M30cS",".PolarisPostHeader._aaql"],postHashtagLocation:".M30cS > div:not(:empty) + .JF9hh",postHeader:[".UE9AK",".PolarisIGCoreBox > ._aaqw"],postHeaderBeforePseudo:[".UE9AK::before",".PolarisIGCoreBox > ._aaqw::before"],postHeaderItem:".UE9AK > *",postBody:["article.PolarisPost ._aatk","article.PolarisPost ._ab12"],postFooterWrap1:["article._8Rm4L ._97aPb + div","._aatk + .PolarisIGCoreBox","._ab12 + .PolarisIGCoreBox"],postFooterWrap2:["article._8Rm4L .cv3IO","._aatk + .PolarisIGCoreBox > ._aast","._ab12 + .PolarisIGCoreBox > div","._aatk + .PolarisIGCoreBox > div"],postFooter:[".eo2As","._aatk + .PolarisIGCoreBox > ._aast > ._aasx","._ab12 + .PolarisIGCoreBox > div > div","._aatk + .PolarisIGCoreBox > div > div"],postActions:[".Slqrh",".PolarisPostFeedbackControls._aamu"],postAfterActions:[".PolarisPostFeedbackControls._aamu ~ *"],postThreeDotsButtonWrap:[".PolarisPostOptionsButtonPicker"],postThreeDotsButton:[".MEAGs",".PolarisPostOptionsButtonPicker > button"],postAction:[".Slqrh > *",".PolarisPostFeedbackControls._aamu > *"],postActionIconDefault:[".rrUvL",".PolarisPostFeedbackControls button._abl- > div:last-child"],postActionIconHovered:[".B58H7",".PolarisPostFeedbackControls button._abl- .PolarisIGCoreSVGIconButton"],postUnderActionsContent:[".eo2As > *:not(.Slqrh)","._aasx > *:not(.PolarisPostFeedbackControls)"],postPhoto:[".KL4Bh img","article.PolarisPost .PolarisPhoto img","article.PolarisPostFunctional .PolarisPhoto img"],postVideo:["article._8Rm4L video","article.PolarisPost .PolarisVideo video","article.PolarisPostFunctional .PolarisVideo video"],postMediaContainer:["._97aPb",".PolarisPhoto._aagu"],postPhotoContainer:["._9AhH0",".PolarisPost .PolarisPost.PolarisPhoto",".PolarisPost .PolarisPost.PolarisPhotoWithIndicator",".PolarisPostFunctional .PolarisPostFunctional.PolarisPhoto",".PolarisPostFunctional .PolarisPostFunctional.PolarisPhotoWithIndicator"],postVideoContainer:[".GRtmf",".PolarisPost .PolarisMedia.PolarisVideo",".PolarisPostFunctional .PolarisMedia.PolarisVideo",'[data-media-actions-post-type="igtv"] > .PolarisIGCoreBox'],postCarouselContainer:[".rQDP3",".PolarisSidecar._aamn"],carouselDots:[".ijCUd",".PolarisStepIndicator.PolarisSidecar"],carouselDot:[".Yi5aA",".PolarisStepIndicator ._acnb"]},postCreation:{body:['[data-page="CreationDetailsPage"] .PolarisCreationShell','[data-page="CreationDetailsPage"] .PolarisBaseShell'],nextButton:['[data-page="CreationStylePage"] .UP43G','[data-page="CreationStylePage"] .PolarisNavigationalHeader ._ab5p'],closeButton:[".PolarisCreationShell .PolarisGenericMobileHeader._ab19 button.PolarisNavigationalHeader"],captionContainer:[".IpSxo",".PolarisCreationDetailsPage._abru"],captionTextarea:[".IpSxo textarea","textarea.PolarisCreationCaptionInput",".PolarisCreationCaptionInput textarea"],userAvatar:[".IpSxo .GsWMc",".IpSxo ._2dbep",".PolarisUserAvatar.PolarisCreationDetailsPage"],imageContainer:[".N7f6u",".PolarisCreationCroppingUnit._abqh"],videoContainer:[".YMoW3",".PolarisCreationStyleVideoUnit._abe_"],video:[".YMoW3 video",".PolarisCreationStyleVideoUnit._abe_ video"],videoPoster:[".YMoW3 img",".PolarisCreationStyleVideoUnit._abe_ img"],videoPlayButton:['.PolarisCreationStyleVideoUnit._abe_ span._abf6[role="button"]'],filtersReel:[".PDNx9",".PolarisIGVirtualList.PolarisCreationFilteringUnit"],submitPostButton:[".hfWwk .UP43G",'[data-page="CreationDetailsPage"] ._ab5p'],rowButton:["._2OfRz",".PolarisCreationDetailsPage._abrf"],previewContainer:['html[data-page="CreationDetailsPage"] .g5kp1',".PolarisCreationDetailsPage ._aau7"],previewPostTypeIcon:[".cRc_w",".PolarisCreationDetailsPage .PolarisMediaPreviewThumbnail svg"],previewPostImage:[".IpSxo .FuaTR","img.PolarisMediaPreviewThumbnail"],expandImageButton:[".pHnkA",".PolarisCroppableImage._abfb"],mentionsOverlay:[".cDEf6",".PolarisCreationCaptionInput._aby4"],tagPeopleButton:[".DG8Ws","button.PolarisCreationTagVideo._a9z-"]},loginBar:{root:".Xwp_P .KGiwt",content:".Xwp_P .KGiwt .ryLs_",openAppButton:[".Xwp_P .KGiwt button",".PolarisMobileTopNavLoggedOut button._acap"]},activityPage:{headerBottomLine:['html[data-page="ActivityFeedPage"] .PolarisGenericMobileHeader::before'],topListContainer:['html[data-page="ActivityFeedPage"] .PolarisShellContent > .PolarisIGVirtualList > div']},"general_use-application-bar":[".Z_Gl2",".MFkQJ","._acc8"],"post-item":["._97aPb",".PolarisPost div:first-child:last-child:not([class]) > .PolarisPhoto",".PolarisPost div:first-child:last-child:not([class]) > .PolarisPhotoWithIndicator > .PolarisPhoto",".PolarisPost .PolarisMedia.PolarisVideo",".PolarisPost .PolarisSidecar li.PolarisVirtualHSnapScrollComponents",".PolarisPostFunctional .PolarisPostFunctional.PolarisPhoto",".PolarisPostFunctional .PolarisPostFunctional.PolarisPhotoWithIndicator",".PolarisPostFunctional .PolarisMedia.PolarisVideo",".PolarisPostFunctional .PolarisSidecar li.PolarisVirtualHSnapScrollComponents",".PolarisPostVideoPlayerWrapper[style]",".PolarisMediaItem_next",".PolarisVideoLegacy"],"post-video":[".GRtmf video",".PolarisPost ._aatk video",".PolarisPostFunctional ._ab12 video","video.VideoPlayerImplementationReactVideoElement"],"post-video-poster":[".GRtmf video + img",".PolarisPost ._aatk video + img",".PolarisPostFunctional ._ab12 video + img"],"post-video-overlay":[".B1JlO .fXIG0",".PolarisVideoPlayButton._aakl",".PolarisVideoPlayButton._aakh",".PolarisPost .VideoPlayerComponentContainer[data-visualcompletion]",".VideoPlayerComponentContainer:has(> .VideoPlayerInteractionOverlay)"],"post-tagged-people-button":[".G_hoz","._a3gq ._a9-6",".PolarisVideo ._a9-6"],"story-container":[".qbCDp",".PolarisMobileOwnerStories._aa2i","section > .PolarisMobileStories"],"story-image":[".qbCDp img","img.PolarisStoryImage"],"story-video":[".qbCDp video","video.PolarisStoryVideo",".PolarisMobileStoryViewer video"],"story-loading-preview":".qbCDp canvas","story-video-play-button":[".qbCDp .videoSpritePlayButton",".PolarisMobileStoryEventZone._9zwu"],"stories-viewer":[".UIujo",".PolarisMobileStoriesPage"],"highlights-container":[".YlNGR",".PolarisProfileStoryHighlightsTray .PolarisHSnapScroll._aap0"],"comments-list-on-comments-page":".XQXOT","profile-page-stat-container":".LH36I","profile-page-stat-item":"._81NM2","profile-page-grid-stretch-element":"._2z6nI article:first-child:empty","profile-send-message-button":".fAR91","header-top-level-button":[".HOQT4",".PolarisGenericMobileHeader._ab18._ab1b"],"your-story-button-text":[".XdXBI",".PolarisOwnStoryTrayItem._aac2"],"comment-form":[".RxpZH",".PolarisPostCommentInput._aaof"],"comment-form-avatar":[".RxpZH ._2dbep",".PolarisPostCommentInput > img.PolarisUserAvatar"],"comment-form-form":[".RxpZH form","form.PolarisPostCommentInput"],"comment-form-textarea":[".RxpZH textarea","textarea.PolarisPostCommentInput"],"comment-form-submit-button":['.RxpZH button[type="submit"]',"form.PolarisPostCommentInput button"],postCreationPage:['html[data-page="CreationStylePage"]'],storyCreationPage:['html[data-page="StoryCreationPage"]'],"new-post_tag-people-image-container":".qJfNm"},ig:{STORY_REELS_ITEM_SEEN:"STORY_REELS_ITEM_SEEN"}};var It={};It.controller={init:function(){It.creationCardController.init()}};const{$reels:Et,$utils:Bt}=app;async function Lt(t,e=3e4){if(await y((()=>window.requireLazy),3e4),window.requireLazy)return new Promise(((o,n)=>{let i;e&&(i=setTimeout((()=>{n(`failed to use module "${t}"`)}),e)),window.requireLazy([t],(t=>{clearTimeout(i),o(t)}))}))}It.creationCardController={init:function(){this._sel=L.controller.getConfig().igSelectors,this._onKeyDown=this._onKeyDown.bind(this),wt.on("feature-encourage.hide-creation-card",this._hideCreationCard.bind(this)),wt.on("feature-encourage.start-post-creation",this._startPostCreation.bind(this)),wt.on("feature-encourage.start-reels-creation",this._startReelsCreation.bind(this)),wt.on("feature-encourage.start-story-creation",this._startStoryCreation.bind(this)),this._watchCreationPopup(),this._makeCreationPopupInvisible()},_startPostCreation:function(){Et.controller.stopReelsCreationSession();const t=Bt.$(this._sel.creationPopup.postButton);Bt.$(this._sel.creationPopup.triggerButton).click(),t.click()},_startReelsCreation:function(){const t=Bt.$(this._sel.creationPopup.postInput),e=t.getAttribute("accept"),o=e.split(", ").filter((t=>t.startsWith("video"))).join(", ");t.setAttribute("accept",o);const n=Bt.$(this._sel.creationPopup.postButton);Bt.$(this._sel.creationPopup.triggerButton).click(),n.click(),Et.controller.startReelsCreationSession(),t.setAttribute("accept",e)},_startStoryCreation:function(){const t=Bt.$(this._sel.creationPopup.storyButton);Bt.$(this._sel.creationPopup.triggerButton).click(),t.click()},_watchCreationPopup:function(){let t=!1;Bt.onDocMutations((()=>{const e=!!Bt.$(this._sel.creationPopup.root);t!==e&&(t=e,wt.send("feature-encourage.toggle-creation-card",e),e?document.addEventListener("keydown",this._onKeyDown):document.removeEventListener("keydown",this._onKeyDown))}))},_makeCreationPopupInvisible:function(){Bt.insertMultistyle`
      <style>
        ${this._sel.creationPopup.root} {
          opacity: 0;
          pointer-events: none;
        }
      </style>
    `},_onKeyDown:function(t){"Escape"===t.key&&this._hideCreationCard()},_hideCreationCard:function(){if(!Bt.$(this._sel.creationPopup.root))return;Bt.$(this._sel.creationPopup.triggerButton).click()}};var Ft={};const{$utils:Ot}=app;Ft.controller={init:async function(){this._fusion=L.controller.getConfig().ig,this._store=await $t("store"),this._getStoriesContext=await $t("get-stories-context"),this._ghostViewEnabled=await wt.send("ghost-story-view.is-enabled"),this._patchReelSeen(),this._handleToggling(),this._handleNavigation()},_patchReelSeen:async function(){(await $t("add-dispatch-listener"))((t=>{this._ghostViewEnabled&&t.type===this._fusion.STORY_REELS_ITEM_SEEN&&(t.type="__NONE__")}));const t=await Lt("PolarisAPIReelSeen");if(!t)return;const e=t.reelSeen.bind(t);t.reelSeen=(...t)=>{if(!this._ghostViewEnabled)return e(...t);wt.send("ghost-story-view.used")}},_handleToggling:async function(){wt.on("ghost-story-view.toggled",(t=>{this._ghostViewEnabled=t,t?this._showUpsellOverlayIfNeeded():this._resumeStories()}))},_handleNavigation:function(){let t;this._store.subscribe((()=>{var e;const o=null===(e=this._store.getState().navigation)||void 0===e?void 0:e.pageIdentifier;o!==t&&(t=o,this._showUpsellOverlayIfNeeded())}))},_showUpsellOverlayIfNeeded:async function(){if(await wt.send("ghost-story-view.has-pro"))return;if(!this._ghostViewEnabled)return;"StoriesPage"===this._store.getState().navigation.pageIdentifier&&(this._pauseStories(),wt.send("ghost-story-view.show-upsell-overlay"))},_pauseStories:function(){Ot.waitFor((()=>{const t=this._getStoriesContext();if(t)return t.updateStoriesContext({isPaused:!0}),t.isPaused}))},_resumeStories:function(){const t=this._getStoriesContext();t&&t.updateStoriesContext({isPaused:!1})}};var Ht={};const{$utils:Vt}=app;let Nt,zt;function jt(t){Vt.ls.set("inssist.tagAssist.collections",t)}function Ut(){return Vt.ls.get("inssist.tagAssist.collections",[])}Ht.controller={init:async function(){if(Nt=await $t("store"),zt=await $t("add-dispatch-listener"),!Nt||!zt)return;wt.on("tag-assist.save-collections-to-ls",jt),wt.on("tag-assist.read-collections-from-ls",Ut),async function(){zt((t=>{"CREATION_CAPTION_CHANGED"===t.type&&wt.send("tag-assist.ig-caption-change",t.caption)}))}()}};const{$musicAssist:Wt}=app;Wt.controller={init:function(){Wt.videoPlayer.init(),Wt.videoGenerator.init(),Wt.storyController.init()}};function Gt(t,e,{once:o=!1}={}){globalThis.addEventListener(`__event-bus.${t}`,(t=>{const o=t.detail||[];e(...o)}),{once:o})}var qt={send:function(t,...e){const o=new CustomEvent(`__event-bus.${t}`,{detail:e});globalThis.dispatchEvent(o)},on:Gt,once:function(t,e){Gt(t,e,{once:!0})}};const{$musicAssist:Yt,$utils:Xt}=app;Yt.storyController={init:async function(){this.sel=L.controller.getConfig().igSelectors,this.state={selectedTrackName:null},this.createPill(),this.insertStyles(),this.handlePillClicks(),this.updateUiWhenNeeded(),this.registerVideoPlayer(),this.resetStateOnCreationSessionStart()},createPill:function(){const t=Symbol("handled");Xt.onDocMutations((()=>{const e=Xt.$(".StoryAssistToggleButton_video");e&&(e[t]||(e[t]=!0,e.insertAdjacentHTML("beforebegin",this.renderPill())))}))},handlePillClicks:function(){Xt.docElem.addEventListener("click",(t=>{if(t.target.closest(".MusicAssistStoryPill__cancel"))return void wt.send("new-post-extra.cancel-click","music-assist");t.target.closest(".MusicAssistStoryPill")&&wt.send("music-assist.open-for-story-creation")}))},updateUiWhenNeeded:function(){wt.on("new-post-extra.update-pill-music",(({name:t})=>{this.state.selectedTrackName=t,this.updateUi()}))},updateUi:function(){const t=Xt.$(".MusicAssistStoryPill");t&&(t.outerHTML=this.renderPill()),Xt.docElem.classList.toggle("MusicAssist--hasSelectedTrack",!!this.state.selectedTrackName)},registerVideoPlayer:function(){const t=Symbol("handled");Xt.onDocMutations((()=>{const e=Xt.$(this.sel.storyCreation.video);e&&(e[t]||(e[t]=!0,e.setAttribute("music-assist-player","")))}))},resetStateOnCreationSessionStart:function(){qt.on("ig.creation-session-start",(()=>{this.state.selectedTrackName=null,this.updateUi()}))},renderPill:function(){return`\n      <div class="\n        MusicAssistStoryPill\n        ${this.state.selectedTrackName?"":"MusicAssistStoryPill_empty"}\n      ">\n        <svg class="MusicAssistStoryPill__icon" viewBox="0 0 24 24">\n          <path d="M0 0h24v24H0Z" fill="none"/>\n          <path d="M18.5 5.438a.937.937 0 0 0-1.22-.893L7.906 7.313a.937.937 0 0 0-.656.893v7.658a4.052 4.052 0 0 0-.937-.115c-1.554 0-2.813.84-2.813 1.875s1.259 1.877 2.812 1.877 2.812-.839 2.812-1.875v-6.847l7.5-2.2v5.41a4.052 4.052 0 0 0-.937-.115c-1.553 0-2.812.839-2.812 1.875s1.259 1.875 2.812 1.875 2.813-.839 2.813-1.875V5.438Z" fill="currentColor"/>\n        </svg>\n        <div class="MusicAssistStoryPill__text">\n          ${this.state.selectedTrackName}\n        </div>\n        <div class="MusicAssistStoryPill__cancel">\n          <svg width="8" height="8" viewBox="0 0 8 8">\n            <path d="M6.5-.001 4 2.499l-2.5-2.5-1.5 1.5 2.5 2.5-2.5 2.5 1.5 1.5 2.5-2.5 2.5 2.5 1.5-1.5-2.5-2.5 2.5-2.5Z" fill="currentColor"/>\n          </svg>\n        </div>\n      </div>\n    `},insertStyles:function(){Xt.insertMultistyle`
      <style>
        .MusicAssistStoryPill {
          display: flex;
          flex-direction: row;
          align-items: center;
          align-self: center;
          height: 34px;
          padding: 0 6px;
          margin-right: 8px;
          color: #FFF;
          border: 1px solid #FFF;
          border-radius: 4px;
          user-select: none;
          filter: drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.2));
          backdrop-filter: blur(3px);
          max-width: calc(100vw - 170px);
          cursor: pointer;
          background: rgba(255, 255, 255, 0.1);
          transition: background 0.3s;
        }
        .MusicAssistStoryPill:hover {
          background: rgba(255, 255, 255, 0.2);
        }
        .MusicAssistStoryPill_empty {
          opacity: 0;
          pointer-events: none;
        }

        .MusicAssistStoryPill__icon {
          flex-shrink: 0;
          width: 24px;
          height: 24px;
          margin-right: 8px;
        }

        .MusicAssistStoryPill__text {
          font-family: Montserrat;
          font-weight: 500;
          font-size: 14px;
          display: block;
          flex-shrink: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .MusicAssistStoryPill__cancel {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          height: 20px;
          cursor: pointer;
          margin-left: 8px;
          color: #FFF;
          flex-shrink: 0;
          position: relative;
          border-radius: 50%;
          transition: background 0.3s;
        }
        .MusicAssistStoryPill__cancel:hover {
          background: rgba(255, 255, 255, 0.25);
        }

        /* hide volume control when some track is selected */
        html.MusicAssist--hasSelectedTrack ${this.sel.storyCreation.video}::-webkit-media-controls-volume-control-container {
          display: none;
        }
      </style>
    `}};var Qt={};const{$musicAssist:Kt}=app;Kt.videoGenerator={init:function(){this._addMusicToVideoBeforeUpload()},_addMusicToVideoBeforeUpload:function(){Qt.define("addMusic",(async t=>{if(!await wt.send("music-assist.should-generate-video"))return;const e=await wt.send("music-assist.generate-video",t[0].file);e&&(t[0].file=e,t[0].dataURL=URL.createObjectURL(e))}))}};const{$musicAssist:Zt,$utils:Jt}=app;Zt.videoPlayer={init:function(){this.video=null,this.audio=null,this.overlay=null,this.helpers=null,this.musicUrl=null,this.musicStart=0,this.musicVolume=0,this.videoVolume=0,this.onVideoResize=this.onVideoResize.bind(this),this.onWindowResize=this.onWindowResize.bind(this),this.videoResizeObserver=null,this.autoRegister(),this.handleDataUpdates()},autoRegister:function(){Jt.onDocMutations((()=>{const t=Jt.$("video[music-assist-player]");t&&!this.video?this.register(t):!t&&this.video&&this.unregister()}))},handleDataUpdates:function(){Jt.iframe.isIframe()?wt.on("music-assist.update-player-data",this.applyData.bind(this)):qt.on("music-assist.update-player-data",this.applyData.bind(this))},register:function(t){document.head.insertAdjacentHTML("beforeend",`\n      <style class="MusicAssistPlayer__style">\n        ${this.getStyles()}\n      </style>\n    `),document.body.insertAdjacentHTML("afterend",'\n      <div class="MusicAssistPlayer__helpers">\n        <audio class="MusicAssistPlayer__audio"></audio>\n        <div class="MusicAssistPlayer__overlay">\n          <div class="MusicAssistPlayer__spinner"></div>\n          <div class="MusicAssistPlayer__pause"></div>\n        </div>\n      </div>\n    '),this.video=t,this.audio=document.querySelector(".MusicAssistPlayer__audio"),this.style=document.querySelector(".MusicAssistPlayer__style"),this.overlay=document.querySelector(".MusicAssistPlayer__overlay"),this.helpers=document.querySelector(".MusicAssistPlayer__helpers"),this.musicUrl&&(this.audio.src=this.musicUrl),this.audio.volume=this.musicVolume,this.video.volume=this.videoVolume,this.videoResizeObserver=new ResizeObserver(this.onVideoResize),this.videoResizeObserver.observe(this.video),window.addEventListener("resize",this.onWindowResize),this.updateOverlayPosition(),setTimeout((()=>this.updateOverlayPosition()),300),setTimeout((()=>this.updateOverlayPosition()),1e3),this.startMusicAndVideoSync(),this.video.addEventListener("play",(()=>{this.startMusicAndVideoSync()})),this.video.addEventListener("timeupdate",(()=>{this.video&&(Jt.iframe.isIframe()?wt.send("music-assist.set-video-current-time",this.video.currentTime):qt.send("music-assist.set-video-current-time",this.video.currentTime))}))},unregister:function(){this.style.remove(),this.helpers.remove(),this.video=null,this.audio=null,this.style=null,this.overlay=null,this.helpers=null,this.videoResizeObserver.disconnect(this.video),this.videoResizeObserver=null,window.removeEventListener("resize",this.onWindowResize),this.stopMusicAndVideoSync()},applyData:async function({isStory:t,musicUrl:e,musicStart:o,musicVolume:n,videoVolume:i}){if(Jt.iframe.isIframe()&&e.startsWith("blob:")){const t=await wt.send("music-assist.get-blob",e);e=URL.createObjectURL(t)}if(!this.video)return this.musicUrl=e,this.musicStart=o,this.musicVolume=n,void(this.videoVolume=i);this.musicVolume=n,this.videoVolume=i,e&&(this.audio.volume=n),!e&&t||(this.video.volume=i),this.musicUrl!==e&&(this.musicUrl=e,e?(this.audio.src=e,this.video.currentTime=0,this.video.play()):(this.audio.pause(),this.audio.removeAttribute("src"),this.video.currentTime=0,this.video.pause())),this.musicStart!==o&&(this.musicStart=o,e&&(this.video.currentTime=0,this.video.play())),e?this.startMusicAndVideoSync():this.stopMusicAndVideoSync()},onVideoResize:function(){this.updateOverlayPosition()},onWindowResize:function(){this.updateOverlayPosition()},updateOverlayPosition:function(){if(!this.video)return;if(!this.overlay)return;const t=this.video.getBoundingClientRect();this.overlay.style.top=`${t.top}px`,this.overlay.style.left=`${t.left}px`,this.overlay.style.width=`${t.width}px`,this.overlay.style.height=`${t.height}px`},startMusicAndVideoSync:function(){if(!this.musicUrl)return;if(this.syncEnabled)return;this.video.paused||setTimeout((()=>{this.video.currentTime=this.video.currentTime,this.video.play()}),100),this.syncEnabled=!0;const t=this.video,e=this.audio;let o,n;this.onPauseClick=()=>{this.playing=!1,document.documentElement.classList.toggle("MusicAssistPlayer--playing",this.playing)},document.querySelector(".MusicAssistPlayer__pause").addEventListener("click",this.onPauseClick),this.playing=!1,this.ignoreSyncOnPlay=!1,this.ignoreSyncOnPause=!1,this.ignoreSyncOnSeeking=!1,this.ignoreAudioPause=!1,this.onVideoPause=()=>{this.ignoreSyncOnPause?this.ignoreSyncOnPause=!1:(this.playing=!1,document.documentElement.classList.toggle("MusicAssistPlayer--playing",this.playing),i("pause"))},t.addEventListener("pause",this.onVideoPause),this.onVideoPlay=()=>{this.ignoreSyncOnPlay?this.ignoreSyncOnPlay=!1:(this.playing=!0,document.documentElement.classList.toggle("MusicAssistPlayer--playing",this.playing),i("play"))},t.addEventListener("play",this.onVideoPlay),this.onVideoSeeking=()=>{this.ignoreSyncOnSeeking?this.ignoreSyncOnSeeking=!1:i("seeking")},t.addEventListener("seeking",this.onVideoSeeking),t.pauseNoSync=()=>{t.paused||(this.ignoreSyncOnPause=!0,t.pause())},t.playNoSync=()=>{t.paused&&(this.ignoreSyncOnPlay=!0,t.play())};const i=i=>{clearTimeout(n),n=setTimeout((async()=>{if(clearTimeout(o),!this.video)return;if(!this.audio)return;if(!this.musicUrl)return;t.pauseNoSync(),e.pauseNoSync();const n=t.currentTime;this.ignoreSyncOnSeeking=!0,t.currentTime=n,e.currentTime=this.musicStart+n,o=setTimeout((()=>{document.documentElement.classList.add("MusicAssistPlayer--loading")}),300);const i=new Promise((t=>e.oncanplay=t)),r=new Promise((e=>t.oncanplay=e));await Promise.all([i,r]),clearTimeout(o),document.documentElement.classList.remove("MusicAssistPlayer--loading"),this.playing&&(t.playNoSync(),(!e.ended||e.currentTime<e.duration)&&e.play())}))};e.pauseNoSync=()=>{e.paused||(this.ignoreAudioPause=!0,e.pause())},this.audioOnPause=()=>{this.ignoreAudioPause?this.ignoreAudioPause=!1:e.ended||t.pauseNoSync()},e.addEventListener("pause",this.audioOnPause)},stopMusicAndVideoSync:function(){this.syncEnabled=!1,document.documentElement.classList.toggle("MusicAssistPlayer--playing",!1),document.documentElement.classList.toggle("MusicAssistPlayer--loading",!1),this.video&&(this.video.removeEventListener("pause",this.onVideoPause),this.video.removeEventListener("play",this.onVideoPlay),this.video.removeEventListener("seeking",this.onVideoSeeking)),this.audio&&this.audio.removeEventListener("pause",this.audioOnPause);const t=document.querySelector(".MusicAssistPlayer__pause");t&&t.removeEventListener("click",this.onPauseClick)},getStyles:function(){return'\n      <style>\n        /* hide native spinner */\n        video[music-assist-player]::-webkit-media-controls {\n          visibility: hidden;\n        }\n        video[music-assist-player]::-webkit-media-controls-enclosure {\n          visibility: visible;\n        }\n\n        .MusicAssistPlayer__overlay {\n          position: fixed;\n          display: flex;\n          align-items: center;\n          justify-content: center;\n          pointer-events: none;\n          overflow: hidden;\n        }\n        html.theme-night .MusicAssistPlayer__overlay {\n          filter: url(#theme-reverse-filter); /* for injection */\n        }\n\n        .MusicAssistPlayer__spinner {\n          --size: 40px;\n          --thickness: 3px;\n          --color-bg: transparent;\n          --color-value: #fff;\n          width: var(--size);\n          height: var(--size);\n          border-radius: 50%;\n          border-top: var(--thickness) solid var(--color-bg);\n          border-right: var(--thickness) solid var(--color-value);\n          border-bottom: var(--thickness) solid var(--color-value);\n          border-left: var(--thickness) solid var(--color-value);\n          animation: MusicAssistPlayer__rotate 0.9s infinite linear;\n          filter:  drop-shadow(0 0 1px rgba(0, 0, 0, 0.16));\n          margin-top: -20px;\n        }\n        .MusicAssistPlayer__spinner::after {\n          width: 100%;\n          height: 100%;\n          border-radius: 50%;\n        }\n        html:not(.MusicAssistPlayer--loading) .MusicAssistPlayer__spinner {\n          display: none;\n        }\n        @keyframes MusicAssistPlayer__rotate {\n          0% { transform: rotate(0deg); }\n          100% { transform: rotate(360deg); }\n        }\n\n        .MusicAssistPlayer__pause {\n          width: 36px;\n          height: 36px;\n          position: absolute;\n          left: 6px;\n          bottom: 30px;\n          border-radius: 50%;\n          cursor: pointer;\n          pointer-events: all;\n          background-size: 20px;\n          background-repeat: no-repeat;\n          background-position: center;\n          background-image: url("data:image/svg+xml;base64,PHN2ZyBmaWxsPSJXaW5kb3ciIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogICAgPHBhdGggZD0iTTYgMTloNFY1SDZ2MTR6bTgtMTR2MTRoNFY1aC00eiIvPgogICAgPHBhdGggZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSIvPgo8L3N2Zz4K");\n          transition: background-color 0.3s;\n          display: none;\n        }\n        .MusicAssistPlayer__pause:hover {\n          background-color: #212123;\n        }\n        html.MusicAssistPlayer--loading.MusicAssistPlayer--playing .MusicAssistPlayer__pause {\n          display: block;\n        }\n        /* hide native pause button  */\n        html.MusicAssistPlayer--loading.MusicAssistPlayer--playing video::-webkit-media-controls-play-button {\n          visibility: hidden;\n        }\n      </style>\n    '.replace("<style>","").replace("</style>","")}};const{$utils:te}=app;Pt.controller={init:async function(){this._sel=L.controller.getConfig().igSelectors,this._updateStyles(),this._manageToggleButton(),this._addMentionsToRequest(),this._hideStoryAssistPanelOnSubmit(),this._notifyStoryCover(),this._manageTrial(),this._hidden=!0,Pt.splitter.init()},getMentions:async function(){return(await wt.send("story-assist.get-mentions")).map((t=>({user_id:t.id})))},_updateStyles:function(){te.insertMultistyle`
      <style>
        ${this._sel.storyCreation.videoHeader} {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-start;
        }

        ${this._sel.storyCreation.videoCreationExitButton} {
          margin-right: auto;
        }
      </style>
    `},_manageToggleButton:function(){let t;const e=Symbol();te.onDocMutations((()=>{const o=te.$(this._sel.storyCreation.videoHeader),n=te.$(this._sel.storyCreation.photoControls),i=o||n;if(!i)return;if(i[e])return;i[e]=!0;const r=!!o;i.insertAdjacentHTML("beforeend",`\n        <div\n          class="\n            StoryAssistToggleButton\n            ${this._hidden?"StoryAssistToggleButton_hidden":""}\n            ${r?"StoryAssistToggleButton_video":"StoryAssistToggleButton_photo"}\n          ">\n          <svg class="StoryAssistToggleButton__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384.97 384.97">\n            <path d="M12.03 84.212h360.909c6.641 0 12.03-5.39 12.03-12.03 0-6.641-5.39-12.03-12.03-12.03H12.03C5.39 60.152 0 65.541 0 72.182c0 6.641 5.39 12.03 12.03 12.03zM372.939 180.455H12.03c-6.641 0-12.03 5.39-12.03 12.03s5.39 12.03 12.03 12.03h360.909c6.641 0 12.03-5.39 12.03-12.03s-5.389-12.03-12.03-12.03zM372.939 300.758H12.03c-6.641 0-12.03 5.39-12.03 12.03 0 6.641 5.39 12.03 12.03 12.03h360.909c6.641 0 12.03-5.39 12.03-12.03.001-6.641-5.389-12.03-12.03-12.03z" fill="currentColor"/>\n          </svg>\n        </div>\n      `),t=te.$(".StoryAssistToggleButton"),t.addEventListener("click",(()=>{wt.send("story-assist.toggle")}))})),wt.on("story-assist.panel-toggled",(e=>{this._hidden=e,t&&t.classList.toggle("StoryAssistToggleButton_hidden",this._hidden)})),te.insertMultistyle`
      <style>
        .StoryAssistToggleButton {
          width: 22px;
          height: 22px;
          margin-left: 12px;
          margin-right: 14px;
          cursor: pointer;
          filter: drop-shadow(0 0 1px rgba(0, 0, 0, 0.5));
          pointer-events: all;
          transition: all 0.3s;
        }
        .StoryAssistToggleButton_hidden {
          width: 0;
          margin-left: 0;
          margin-right: 0;
          opacity: 0;
          pointer-events: none;
        }
        .StoryAssistToggleButton_photo {
          position: relative;
          top: 10px;
        }

        /* hitbox  */
        .StoryAssistToggleButton::before {
          content: '';
          position: absolute;
          top: -8px;
          left: -8px;
          right: -8px;
          bottom: -8px;
        }

        .StoryAssistToggleButton__icon {
          width: 24px;
          height: 24px;
          color: #FFF;
        }
      </style>
    `},_addMentionsToRequest:async function(){const t=await $t("http");if(!t)return;const e=t.post.bind(t);t.post=async(...t)=>(await(async()=>{if(!t[0].includes("/create/configure_to_story"))return;const e=await this.getMentions();0!==e.length&&(t[1].reel_mentions=JSON.stringify(e))})(),e(...t))},_hideStoryAssistPanelOnSubmit:function(){const t=Symbol();te.onDocMutations((()=>{const e=te.$(this._sel.storyCreation.submitButton);e&&(e[t]||(e[t]=!0,e.addEventListener("click",(()=>{wt.send("story-assist.toggle",!1)}))))}))},_notifyStoryCover:async function(){const t=await $t("store");if(!t)return;let e;t.subscribe((()=>{var o,n;const i=null===(o=t.getState().storyCreation)||void 0===o||null===(n=o.coverPhoto)||void 0===n?void 0:n.dataURL;e!==i&&(e=i,wt.send("story-assist.cover-change",i))}))},_manageTrial:async function(){let t;const e=Symbol();te.onDocMutations((()=>{if(!!!te.$(this._sel.storyCreation.video))return;const o=te.$(this._sel.storyCreation.submitButton);o&&(o[e]||(o[e]=!0,o.addEventListener("click",(async e=>{t||(e.preventDefault(),e.stopPropagation(),t=await wt.send("story-assist.has-pro"),t?o.click():wt.send("story-assist.show-upsell"))}),!0)))}))}};const{$utils:ee}=app;Pt.splitter={maxStoryVideoDuration:60.9*ee.time.SECOND,init:async function(){this._chunks=[],this._patchStoryVideoUpload(),this._patchStoryCoverUpload(),this._patchStoryPublishing()},_requireHttp:async function(){const t=await $t("http:story-assist");return $t.unlockOnNextTick("http"),t},_isStoryCreationPage:function(){return location.href.includes("/create/story")},_patchStoryVideoUpload:function(){Qt.define("splitStoryIntoChunks",(async(t,e)=>{if(!this._isStoryCreationPage())return;const o=t[0];if(o.uploadMediaDurationMs<=this.maxStoryVideoDuration)return void(this._chunks=[]);this._log("splitting video into chunks...");const n=await wt.send("story-assist.split-story-video",o.file);let i;this._log(`created ${n.length} chunks`),this._chunks=[];for(const t of n){this._log(`uploading chunk #${this._chunks.length+1}`);const n=URL.createObjectURL(t),r=String(Date.now()),a=await ee.loadVideoMetadata(n),s={...o,file:t,dataURL:n,uploadId:r,uploadMediaDurationMs:1e3*a.duration,entityName:`story_${r}`};i=await e(s),this._chunks.push(s),this._log("ig response",i)}return i}))},_patchStoryCoverUpload:function(){Qt.define("uploadCoversForStoryChunks",(async(t,e)=>{if(!this._isStoryCreationPage())return;if(0===this._chunks.length)return;let o;for(const n of this._chunks){this._log(`uploading cover for chunk #${this._chunks.indexOf(n)+1}`);const i=await this._takeFirstFrame(n.dataURL);o=await e({...t[0],file:i,dataURL:URL.createObjectURL(i),uploadId:n.uploadId,entityName:n.entityName}),this._log("ig response",o)}return o}))},_patchStoryPublishing:async function(){const t=await this._requireHttp(),e=t.post.bind(t);t.post=async(...t)=>{if(!t[0].includes("/create/configure_to_story"))return e(...t);if(0===this._chunks.length)return e(...t);let o;for(const n of this._chunks)this._log(`publishing chunk #${this._chunks.indexOf(n)+1}`),o=await e(t[0],{...t[1],upload_id:n.uploadId,...n!==this._chunks[0]&&{reel_mentions:null}}),this._log("ig response",o);return o}},_takeFirstFrame:async function(t){const e=document.createElement("video");e.src=t,e.muted=!0,e.preload="metadata",e.currentTime=.01,await new Promise((t=>e.onloadedmetadata=t)),await new Promise((t=>e.ontimeupdate=t));const o=document.createElement("canvas"),n=o.getContext("2d");o.width=e.videoWidth,o.height=e.videoHeight;return await new Promise((t=>{n.drawImage(e,0,0),o.toBlob((e=>t(e)),"image/jpeg")}))},_log:function(...t){console.log(`[story assist splitter] ${t[0]}`,...t.slice(1))}};var oe={};const{$utils:ne}=app;oe.controller={init:function(){this._sel=L.controller.getConfig().dmSelectors,this._disableHistoryPushState(),this._passNonDmNavigationToIgView(),this._shortenRequestsTab(),this._miscStyleAdjustments(),oe.ghostModeController.init(),oe.mediaController.init(),wt.on("dm.refresh",this._refresh.bind(this)),wt.on("dm.go-to-inbox",this._goToInbox.bind(this))},_disableHistoryPushState:function(){history.pushState=history.replaceState},_passNonDmNavigationToIgView:function(){document.addEventListener("click",(t=>{const e=t.target.closest("a");if(!e)return;const o=e.getAttribute("href");if(!o)return;const n=o.replace("https://www.instagram.com","");n.startsWith("https:")||n.startsWith("/direct/")||n.startsWith("chrome-extension:")||(t.preventDefault(),t.stopPropagation(),wt.send("dm.ig-go",n))}),!0)},_shortenRequestsTab:function(){const t=Symbol("handled");ne.onDocMutations((()=>{const e=ne.$(this._sel.requestsTabContent);e&&(e[t]||(e[t]=!0,e.insertAdjacentHTML("beforeend",'<div class="RequestsCount"></div>')))})),ne.onDocMutations((()=>{const t=ne.$(this._sel.requestsTabText);if(!t)return;const e=Number(t.innerText.replace(/\D/g,"")),o=document.querySelector(".RequestsCount");o&&(o.innerText=`+${e||""}`)})),ne.insertMultistyle`
      <style>
        ${this._sel.requestsTab} {
          max-width: 50px;
        }
        ${this._sel.requestsTabContent} {
          color: rgb(var(--ig-primary-button));
        }
        ${this._sel.requestsTabText} {
          display: none;
        }
      </style>
    `},_refresh:function(){location.reload()},_goToInbox:async function(){const t=await $t("nav");t&&t.push("/direct/inbox/")},_miscStyleAdjustments:function(){ne.insertMultistyle`
      <style>
        * {
          outline: none;
        }

        ::-webkit-scrollbar {
          display: none;
        }

        :root {
          ${this._sel.bottomToolbarHeightVar}: 0;
        }

        ${this._sel.menuPanel} {
          display: none;
        }

        ${this._sel.pageContent} {
          width: 100%;
        }

        ${this._sel.header} {
          height: 0;
          min-height: 0;
          padding: 0;
          position: relative;
        }

        ${this._sel.headerUserSelect} {
          display: none;
        }

        ${this._sel.headerWriteButton} {
          position: absolute;
          top: 6px;
          left: 238px;
          padding: 0;
        }

        ${this._sel.headerNoFoldersContainer} {
          height: 54px;
          border-bottom: 1px solid;
          border-color: #dbdbdb;
          border-color: rgb(var(--ig-separator));
          padding: 0 0 0 4px;
          box-sizing: border-box;
        }

        ${this._sel.headerNoFoldersTab} {
          flex-grow: 0;
          padding: 20px 12px 14px;
        }
        ${this._sel.headerNoFoldersTab} * {
          font-size: 14px;
          font-weight: 500;
        }

        ${this._sel.folderTab} {
          padding: 20px 8px 14px;
          max-width: 90px;
        }

        ${this._sel.chatItem} {
          padding: 10px;
        }

        ${this._sel.chatItemContent} {
          max-width: 270px;
        }

        ${this._sel.chatItemSkeleton} {
          max-width: 270px;
          padding: 10px;
        }

        ${this._sel.chatItemTitle} {
          width: 100%;
        }

        ${this._sel.chatHeader} {
          height: 54px;
          min-height: 54px;
        }

        ${this._sel.chatHeaderAvatar},
        ${this._sel.chatHeaderAvatarContainer} {
          width: 30px;
          height: 30px;
        }

        ${this._sel.chatHeaderTitle} {
          width: 100%;
        }

        ${this._sel.writeInput} {
          max-height: 50vh;
        }

        ${this._sel.writeInputContainer} {
          padding-top: 8px;
          padding-bottom: 8px;
        }

        ${this._sel.mediaViewerVideo} {
          height: calc(100vh - 120px);
        }

        ${this._sel.requestsDescription} {
          width: 290px;
          box-sizing: border-box;
        }
      </style>
    `}},oe.ghostModeController={init:function(){this._initEnabled(),wt.on("dm.set-ghost-mode-enabled",this._setEnabled.bind(this))},_initEnabled:async function(){const t=await wt.send("dm.is-ghost-mode-enabled");this._setEnabled(t)},_setEnabled:async function(t){inssist.dm.ghostModeEnabled=t}};const{$utils:ie}=app;oe.inputRestoreController={init:function(){(function(){ae=ie.ls.get(re,{});for(const t in ae){for(const e in ae[t])0===ae[t][e].trim().length&&delete ae[t][e];0===Object.keys(ae[t]).length&&delete ae[t]}})(),async function(){const t=L.controller.getConfig().dmSelectors,e=await $t("store"),o=await $t("add-dispatch-listener");if(!e||!o)return;let n;try{n=e.getState().users.viewerId}catch(t){return void console.error("dm injection input restore controller:","failed to get viewerId")}if(!n)return;const i=ae[n]||(ae[n]={});o((e=>{if("NAVIGATION_LOCATION_CHANGED"!==e.type)return;if(!e.nextPath.startsWith("/direct/t/"))return;const o=e.nextPath.replace("/direct/t/","");if(!o)return;const n=i[o];n&&setTimeout((()=>{const e=ie.$(t.general.textarea);e&&(e.focus(),document.execCommand("insertText",!1,n))}))}));let r=null;ie.onDocMutations((()=>{const o=ie.$(t.general.textarea);if(!o)return;const n=e.getState().navigation.route.split("/direct/t/")[1];(i[n]||"")!==o.value&&(i[n]=o.value,clearTimeout(r),r=setTimeout((()=>{ie.ls.set(re,ae)}),300))}))}()}};const re="inssist.dm.input-restore-texts";let ae={};const{$utils:se}=app;let le;async function ce(t){const e=await async function(t){const e="A"===t.tagName?t:t.querySelector("a");if(e)return e.href.split("/").pop();const o=(await $t("store")).getState();return(o.navigation.route||o.navigation.displayedRoute).split("/").pop()}(t);if(!e)return null;return(await $t("store")).getState().direct.threads.get(e)||null}oe.markSeenController={init:async function(){le=L.controller.getConfig().dmSelectors,async function(){const t=await $t("store"),e=await Lt("PolarisDirectActionMarkSeen");if(!t||!e)return;const o=Symbol("handled");se.onDocMutations((()=>{se.$$(le.leftPanel.conversationUnreadDot).forEach((n=>{if(n[o])return;n[o]=!0;const i=n.closest(le.leftPanel.conversationItem);if(!i)return;i.classList.add("mark-seen--unread-thread"),n.insertAdjacentHTML("afterbegin",'\n        <svg class="mark-seen" fresh xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">\n          <path fill="none" d="M0 0h30v30H0z"/>\n          <path d="M14.389 21.257l-1.688-1.725 1.846-2 .793.812 9.878-10.187a.291.291 0 01.226-.1.3.3 0 01.227.1l1.425 1.5a.359.359 0 01.008.473L16.278 21.272h-.008a1.488 1.488 0 01-.939.456 1.42 1.42 0 01-.942-.471zm-6.564 0l-4.536-4.644a.337.337 0 010-.473l1.438-1.475a.308.308 0 01.454 0l3.6 3.681 9.873-10.189a.292.292 0 01.227-.1.3.3 0 01.226.1l1.426 1.5a.362.362 0 01.008.473L9.715 21.272h-.008a1.485 1.485 0 01-.939.456 1.42 1.42 0 01-.948-.471z" fill="currentColor"/>\n        </svg>\n      ');const r=se.$(".mark-seen[fresh]");r.removeAttribute("fresh"),r.addEventListener("mousedown",(t=>{t.stopPropagation(),t.preventDefault()})),r.addEventListener("click",(async o=>{o.stopPropagation(),o.preventDefault();const n=await ce(i);t.dispatch(e.markSeen(n.id,n.last_permanent_item,{ignoreGhostMode:!0}))}))}))})),se.insertMultistyle`
    <style>
      .mark-seen {
        width: 25px;
        position: absolute;
        top: -10px;
        left: -9px;
        color: #738398;
        cursor: pointer;
        transition: color 0.15s;
        display: none;
      }
      .mark-seen:hover {
        color: #1BA2F9;
      }
      .mark-seen--unread-thread:hover .mark-seen {
        display: block;
      }

      .mark-seen--unread-thread:hover ${le.leftPanel.conversationUnreadDot} {
        background: transparent;
      }
    </style>
  `}()},getThreadDataByThreadElem:ce};const{$utils:de}=app;oe.mediaController={init:function(){this._renderMediaMessages(),this._injectStyles()},_renderMediaMessages:function(){const t=Symbol("handled");de.onDocMutations((()=>{const e=de.$$("[data-media-url]");if(0!==e.length)for(const o of e){if(o[t])continue;o[t]=!0;const e=o.dataset.mediaUrl,n=o.dataset.mediaType,i="image"===n?de.createUrl(inssist.url("/viewer.html"),{src:e}):e;o.innerHTML=`\n          <a class="MediaLink" href="${i}" target="_blank">\n            <div>${"image"===n?"Photo":"Video"}</div>\n            <svg xmlns="http://www.w3.org/2000/svg" width="12.5" height="12.5" viewBox="0 0 12.5 12.5">\n              <path d="M2.571,1.028h2.4a.514.514,0,0,1,.07,1.024l-.07,0h-2.4A1.542,1.542,0,0,0,1.033,3.47l-.005.109,0,5.85a1.543,1.543,0,0,0,1.438,1.539l.106,0L8.4,10.963A1.543,1.543,0,0,0,9.938,9.526l0-.106v-2.4a.514.514,0,0,1,1.024-.07l0,.07v2.4a2.572,2.572,0,0,1-2.432,2.568l-.136,0L2.577,12l-.139,0A2.572,2.572,0,0,1,.005,9.566l0-.137L0,3.6l0-.139A2.571,2.571,0,0,1,2.435,1.031ZM7.027,0h4.494L11.59.01l.069.019L11.7.046a.482.482,0,0,1,.1.062l.048.043.057.068.037.062.026.062.013.044.009.044L12,.495v4.48a.514.514,0,0,1-1.024.07l0-.07V1.756L6.02,6.709a.514.514,0,0,1-.67.05l-.058-.05a.514.514,0,0,1-.05-.67l.05-.058,4.95-4.953H7.027a.514.514,0,0,1-.51-.445l0-.07A.514.514,0,0,1,6.957,0Z" transform="translate(0.25 0.25)" fill="currentColor" stroke="currentColor" stroke-width="0.5"></path>\n            </svg>\n          </a>\n        `}}))},_injectStyles:function(){de.insertMultistyle`
      <style>
        .MediaLink {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 8px;
          padding: 7px 14px 7px 12px;
          margin-top: 4px;
          border-radius: 18px;
          color: #1BA2F9;
          font-weight: 500;
          background: #EFEFEF;
          background: rgb(var(--ig-highlight-background));
          cursor: pointer;
          text-decoration: none;
        }
      </style>
    `}};var pe={};const{$utils:ue}=app;pe.controller={init:function(){this._isDm=ue.iframe.isIframe("inssist-dm"),this._applyInitialTheme(),this._updateThemeOnChange(),pe.emojiFixer.init()},_applyInitialTheme:async function(){const t=await wt.send("theme.get-theme");this._applyTheme(t)},_updateThemeOnChange:function(){wt.on("theme.switch-theme",(t=>{this._applyTheme(t)}))},_applyTheme:async function(t){if(t&&(ue.docElem.classList.remove("theme-day"),ue.docElem.classList.remove("theme-night"),ue.docElem.classList.add(`theme-${t}`),this._isDm)){const e=await ue.waitFor((()=>inssist.theme.module));if(!e)return;e.setTheme("day"===t?"light":"dark")}}};const{$utils:he}=app;pe.emojiFixer={init:function(){this._injectStyles(),this._startEmojiReplacer()},_injectStyles:function(){he.insertMultistyle`
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
    `},_startEmojiReplacer:function(){const t=L.controller.getConfig().igSelectors;he.onDocMutations((function t(e){const n=he.$("body");if(!n)return;he.onDocMutations.off(t);new MutationObserver(o).observe(n,{childList:!0,subtree:!0}),o(e)}));let e=!1;function o(o){if(e)return;const n=o.map((t=>Array.from(t.addedNodes))).flat();if(0===n.length)return;const i=window.inssist.theme.emojiRegex,r=(he.$("body").innerText.match(i)||[]).filter((t=>!"0123456789#*↪".includes(t)));if(0===r.length)return;const a=[],s=Array.from(new Set(r)),l=["input","textarea","[contenteditable]",t.general.postCaption].map((t=>he.$$(t))).flat();n.forEach((t=>{let e;if(e=t.nodeType===Node.ELEMENT_NODE?t:t.parentElement,!e)return;const o=document.createTreeWalker(e,NodeFilter.SHOW_TEXT);for(;;){const t=o.nextNode();if(!t)break;const e=t.textContent;if(!s.some((t=>e.includes(t))))continue;if(l.some((e=>e.contains(t))))continue;const n=t.parentElement;n.classList.contains("emoji")||(a.includes(n)||a.push(n))}})),requestAnimationFrame((()=>{e=!0,a.forEach((t=>{if(!document.body.contains(t))return;let e=t.innerHTML;s.forEach((t=>{const o=`<span class="emoji">${t}</span>`;e=e.split(o).join("__$%#^__").split(t).join(o).split("__$%#^__").join(o)})),t.innerHTML=e})),e=!1}))}}};var ge={css:"\n  <style>\n    .QuickRepliesToggler {\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      padding: 8px;\n      cursor: pointer;\n    }\n\n    .QuickRepliesPopup {\n      font-family: Montserrat;\n      display: flex;\n      flex-direction: column;\n      justify-content: flex-end;\n      position: fixed;\n      top: 0;\n      left: 0;\n      bottom: 0;\n      width: 430px;\n      pointer-events: none;\n    }\n\n    .QuickRepliesPopup__body {\n      background: #FFF;\n      border-radius: 4px;\n      overflow: hidden;\n      position: relative;\n      pointer-events: all;\n      transition: opacity 0.3s, transform 0.3s;\n    }\n    .QuickRepliesPopup:not(.QuickRepliesPopup_show) .QuickRepliesPopup__body {\n      opacity: 0;\n      pointer-events: none;\n      transform: translateY(10px);\n    }\n    html.theme-night .QuickRepliesPopup__body {\n      background: #000;\n    }\n\n    /* border */\n    .QuickRepliesPopup__body::before {\n      content: '';\n      position: absolute;\n      top: 0;\n      left: 0;\n      right: 0;\n      bottom: 0;\n      border: 1px solid #DBDBDB;\n      border-radius: inherit;\n      pointer-events: none;\n    }\n    html.theme-night .QuickRepliesPopup__body::before {\n      border-color: #464646;\n    }\n\n    .QuickRepliesPopup__replies {\n      max-height: 400px;\n      overflow: auto;\n\n      /* place items above border */\n      position: relative;\n      z-index: 1;\n    }\n\n    .QuickRepliesPopup__noReplies {\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      height: 42px;\n      color: #8E8E8E;\n    }\n\n    .QuickRepliesPopup__reply {\n      display: flex;\n      flex-direction: row;\n      align-items: center;\n      height: 42px;\n      padding: 0 16px;\n      cursor: pointer;\n    }\n    .QuickRepliesPopup__reply_active {\n      background: #1BA2F9;\n      color: #FFF;\n    }\n    .QuickRepliesPopup__reply b {\n      font-weight: 700;\n    }\n\n    .QuickRepliesPopup__replyShortcut {\n      font-size: 11px;\n      font-weight: 500;\n      border-radius: 4px;\n      background: #F3F3F3;\n      margin-right: 8px;\n      flex-shrink: 0;\n      padding: 2px 6px;\n    }\n    .QuickRepliesPopup__reply_active .QuickRepliesPopup__replyShortcut {\n      background: rgba(255, 255, 255, 0.25);\n    }\n    html.theme-night .QuickRepliesPopup__reply:not(.QuickRepliesPopup__reply_active) .QuickRepliesPopup__replyShortcut {\n      background: #323232;\n    }\n\n    .QuickRepliesPopup__replyContent {\n      font-size: 14px;\n      line-height: 18px;\n      font-weight: 400;\n      text-overflow: ellipsis;\n      overflow: hidden;\n      white-space: nowrap;\n      display: block;\n      flex-shrink: 1;\n    }\n\n    .QuickRepliesPopup__footer {\n      display: flex;\n      flex-direction: row;\n      justify-content: flex-end;\n      padding: 12px;\n    }\n\n    .QuickRepliesPopup__manageButton {\n      color: #1BA2F9;\n      font-size: 12px;\n      line-height: 15px;\n      font-weight: 600;\n      cursor: pointer;\n      background: transparent;\n      border: none;\n      padding: 0;\n    }\n  </style>\n"};const{$utils:fe}=app;ge.controller={init:async function(){this._sel=L.controller.getConfig().dmSelectors,this._popup=null,this._input=null,this._preventReplyHover=!1,this._preventHideOnBlur=!1,this._prevState={},this._state={show:!1,replies:[],filterString:null,activeReplyIndex:0},this._keepRepliesInSync(),this._initCss(),this._initPopup(),this._initInput(),this._initToggler(),this._update()},_keepRepliesInSync:function(){(async()=>{const t=await wt.send("quick-replies.fetch");this._setState({replies:t})})(),wt.on("quick-replies.update",(t=>{this._setState({replies:t})}))},_initCss:function(){fe.insertMultistyle`${ge.css}`},_initPopup:function(){document.body.insertAdjacentHTML("beforeend",'\n      <div class="QuickRepliesPopup">\n        <div class="QuickRepliesPopup__body">\n          <div class="QuickRepliesPopup__replies"></div>\n          <div class="QuickRepliesPopup__footer">\n            <button class="QuickRepliesPopup__manageButton">\n              MANAGE QUICK REPLIES\n            </button>\n          </div>\n        </div>\n      </div>\n    '),this._popup=fe.$(".QuickRepliesPopup"),this._select("manageButton").addEventListener("mousedown",(()=>{wt.send("quick-replies.toggle"),this._preventHideOnBlur=!0,setTimeout((()=>{this._input&&this._input.focus()}))}))},_initInput:function(){const t=Symbol("handled");fe.onDocMutations((()=>{const e=fe.$(this._sel.writeInput);e&&(e[t]||(e[t]=!0,e.addEventListener("blur",this._onInputBlur.bind(this),!0),e.addEventListener("focus",this._onInputFocus.bind(this),!0),e.addEventListener("keydown",this._onInputKeyDown.bind(this),!0),this._input=e))}))},_initToggler:function(){let t=null;const e=Symbol("handled");fe.onDocMutations((()=>{const o=fe.$(this._sel.writePanelVoiceButton);o?o[e]||(o[e]=!0,o.insertAdjacentHTML("beforebegin",'\n        <div class="QuickRepliesToggler">\n          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18.205 18.5">\n            <path d="M6.481 0h1.711L1.709 18.5H0Zm1.311 16.654a1.325 1.325 0 0 1-1.331-1.355 1.276 1.276 0 0 1 .393-.952 1.3 1.3 0 0 1 .938-.384 1.254 1.254 0 0 1 .923.373 1.3 1.3 0 0 1 .373.962 1.317 1.317 0 0 1-.383.972 1.247 1.247 0 0 1-.913.384Zm4.556 0a1.325 1.325 0 0 1-1.335-1.355 1.276 1.276 0 0 1 .393-.952 1.3 1.3 0 0 1 .943-.383 1.254 1.254 0 0 1 .923.373 1.3 1.3 0 0 1 .373.962 1.317 1.317 0 0 1-.383.972 1.247 1.247 0 0 1-.909.383Zm4.556 0a1.325 1.325 0 0 1-1.335-1.355 1.276 1.276 0 0 1 .393-.952 1.3 1.3 0 0 1 .943-.383 1.254 1.254 0 0 1 .923.373 1.3 1.3 0 0 1 .373.962 1.317 1.317 0 0 1-.383.972 1.247 1.247 0 0 1-.909.383Z" fill="currentColor"/>\n          </svg>\n        </div>\n      '),t=fe.$(".QuickRepliesToggler"),t.addEventListener("click",(()=>{0===this._state.replies.length?wt.send("quick-replies.toggle"):this._setValue("/")}))):t&&(t.remove(),t=null)}))},_handleEditorUpdate:async function(){const t=this._handleEditorUpdate,e=t._handled_||(t._handled_=Symbol("handled")),o=await this._getEditor();o[e]||(o[e]=!0,o.registerUpdateListener((()=>{const t=this._getFilterString();null===t?(this._setState({show:!1}),setTimeout((()=>{this._setState({filterString:null,activeReplyIndex:0})}),300)):(this._preventReplyHover=!0,this._setState({show:!0,filterString:t,activeReplyIndex:0}))})))},_getFilterString:function(){if(!this._input)return null;const t=this._input.textContent;return 1===t.split("\n").length&&t.startsWith("/")?t.replace("/","").toLowerCase():null},_getEditor:async function(){return await fe.waitFor((()=>inssist.quickReplies.editor))},_select:function(t){return this._popup?fe.$(`.QuickRepliesPopup__${t}`,this._popup):null},_selectAll:function(t){return this._popup?fe.$$(`.QuickRepliesPopup__${t}`,this._popup):[]},_setState:function(t={}){this._prevState={...this._state},this._state={...this._state,...t},this._update()},_onInputBlur:function(){this._preventHideOnBlur?this._preventHideOnBlur=!1:this._setState({show:!1})},_onInputFocus:function(){this._handleEditorUpdate();const t=this._getFilterString();this._setState({show:null!==t})},_onInputKeyDown:function(t){if(this._state.show){if("ArrowUp"===t.key){t.preventDefault();let e=this._state.activeReplyIndex-1;const o=this._getFilteredReplies();return-1===e&&(e=o.length-1),this._setState({activeReplyIndex:e}),void this._scrollToActiveReplyIfNeeded()}if("ArrowDown"===t.key){t.preventDefault();let e=this._state.activeReplyIndex+1;return e===this._getFilteredReplies().length&&(e=0),this._setState({activeReplyIndex:e}),void this._scrollToActiveReplyIfNeeded()}("Enter"===t.key&&!t.shiftKey||"Tab"===t.key)&&(t.preventDefault(),t.stopPropagation(),this._applyActiveReply())}},_getFilteredReplies:function(){const t=this._state.filterString||"";return""===t?this._state.replies:this._state.replies.filter((e=>{const o=(e.shortcut||"")+(e.content||"");return!!o&&fe.fuzzyCheck(o,t,2)}))},_scrollToActiveReplyIfNeeded:function(){this._preventReplyHover=!0;const t=this._select("replies"),e=this._select("reply_active"),o=t.scrollTop,n=t.offsetHeight,i=e.offsetTop,r=e.offsetHeight;o>i?t.scrollTop=i:i+r>o+n&&(t.scrollTop=i-n+r)},_applyActiveReply:function(){const t=this._getFilteredReplies()[this._state.activeReplyIndex];if(!t)return;const e=this._prepareMessage(t.content);this._setValue(e),setTimeout((()=>this._setState({show:!1}))),wt.send("ga.send-event","user","quick-replies:paste")},_prepareMessage:function(t){const e=t.match(/{[^}]*}/g)||[];for(const o of e){const e=o.replace("{","").replace("}","").split("|"),n=this._pickRandom(e);t=t.replace(o,n)}const o=fe.$(this._sel.chatHeaderTitle);if(o){const e=o.innerText;t=t.replaceAll("@name",e).replaceAll("@username",e)}return t},_pickRandom:function(t=[]){return t[Math.round(Math.random()*(t.length-1))]},_setValue:async function(t){if(!this._input)return;const e=await Lt("Lexical"),o=await this._getEditor();this._input.focus(),o.dispatchCommand(e.CLEAR_EDITOR_COMMAND),document.execCommand("insertText",!1,t)},_onReplyMouseEnter:function(t){if(this._preventReplyHover)return void(this._preventReplyHover=!1);const e=t.target.closest(".QuickRepliesPopup__reply"),o=Number(e.dataset.index);this._setState({activeReplyIndex:o})},_onReplyMouseDown:function(){this._preventHideOnBlur=!0,this._applyActiveReply()},_update:function(){const t=this._prevState,e=this._state;if(t.show!==e.show&&this._popup.classList.toggle("QuickRepliesPopup_show",this._state.show),t.filterString!==e.filterString){const t=fe.$(this._sel.writePanel);if(t){const e=t.getBoundingClientRect();this._popup.setAttribute("style",`left: ${Math.round(e.left)}px !important;\n           bottom: ${Math.round(window.innerHeight-e.top+16)}px !important;\n           width: ${Math.round(e.width)}px !important;`)}}if(t.replies!==e.replies||t.filterString!==e.filterString){const t=this._getFilteredReplies();0===t.length?this._select("replies").innerHTML='\n          <div class="QuickRepliesPopup__noReplies">\n            No replies found\n          </div>\n        ':(this._select("replies").innerHTML=t.map(((t,e)=>`\n          <div class="QuickRepliesPopup__reply" data-index="${e}">\n            ${t.shortcut?`\n              <div class="QuickRepliesPopup__replyShortcut">\n                /&thinsp;${t.shortcut}\n              </div>\n            `:""}\n            <div class="QuickRepliesPopup__replyContent">\n              ${t.content}\n            </div>\n          </div>\n        `)).join(""),this._selectAll("reply").forEach((t=>{t.addEventListener("mouseenter",this._onReplyMouseEnter.bind(this)),t.addEventListener("mousedown",this._onReplyMouseDown.bind(this))})))}{const t="QuickRepliesPopup__reply",e="QuickRepliesPopup__reply_active";fe.$$(`.${e}`).forEach((t=>t.classList.remove(e)));const o=fe.$$(`.${t}`)[this._state.activeReplyIndex];o&&o.classList.add(e)}}};const{$utils:me}=app;let ye,ve,be;Ct.controller={init:async function(){ye=L.controller.getConfig().igSelectors,ve=await $t("http"),be=await $t("store"),inssist.storyMentions.onStoryCreationReduce((t=>{"STORY_CREATION_SESSION_STARTED"===t.type&&(_e={mentions:[],inputSize:{width:0,height:0},activeMention:null})})),function(){const t=Symbol("handled");me.onDocMutations((()=>{const e=me.$(ye.storyCreation.topRightButtonsContainer);if(!e)return;if(e[t])return;e[t]=!0,"v1"===window.inssist.igBundleVersion?e.insertAdjacentHTML("afterbegin",'\n        <button class="story-add-mention-button">\n          @\n        </button>\n      '):e.insertAdjacentHTML("afterbegin",'\n        <button class="PolarisStoryImageCreationContainer story-add-mention-button">\n          @\n        </button>\n      ');me.$(".story-add-mention-button").addEventListener("click",(()=>{be.dispatch({type:"STORY_CREATION_ENTER_ADD_TEXT"}),be.dispatch({type:"STORY_CREATION_CHANGE_TEXT",rawText:"@",width:21.71875,height:22}),be.dispatch({type:"SEARCH_QUERY_CLEARED"});const t=me.$(ye.storyCreation.textInput);t.textContent="@";const e=document.getSelection(),o=document.createRange();o.setStart(t,1),o.setEnd(t,1),e.removeAllRanges(),e.addRange(o)}))})),me.insertMultistyle`
    <style>
      .story-add-mention-button {
        height: 44px;
        position: relative;
        top: -1px;
        margin-right: 7px;
        font-size: 27px;
        font-weight: 500;
        font-family: montserrat;
        color: #FFF;
        background: transparent;
        text-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
        border: none;
        outline: none;
        cursor: pointer;
        pointer-events: all;
      }
    </style>
  `}(),function(){const t=Symbol("listenerAdded");me.onDocMutations((()=>{const e=me.$(ye.storyCreation.textInput);e&&(_e.inputSize.width=e.offsetWidth,_e.inputSize.height=e.offsetHeight,e[t]||(e[t]=!0,e.addEventListener("input",(()=>{_e.inputSize.width=e.offsetWidth,_e.inputSize.height=e.offsetHeight}))))}))}(),function(){const t=Symbol("handled");me.onDocMutations((()=>{const e=me.$(ye.storyCreation.mentionReel);e&&(e[t]||(e[t]=!0,me.smartHorizontalScroll.init(e)))})),me.onDocClick((t=>{const e=t.target.closest(ye.storyCreation.mentionReelItem);if(!e)return;const o=me.$(ye.storyCreation.textInput);if(!o)return;const n=`@${e.innerText}`;o.textContent=n;const i=o.getBoundingClientRect();be.dispatch({type:"STORY_CREATION_CHANGE_TEXT",width:i.width,height:i.height,rawText:n}),be.dispatch({type:"STORY_CREATION_SAVE_TEXT",renderText:[n],timeSpent:5e3})})),me.insertMultistyle`
    <style>
      ${ye.storyCreation.mentionReelItem} {
        cursor: pointer;
      }

      ${ye.storyCreation.textInput} {
        position: relative;
        top: 20px;
      }
    </style>
  `}(),inssist.storyMentions.onStoryCreationReduce(((t,e)=>{if("STORY_CREATION_SAVE_TEXT"!==t.type)return;if(1!==t.renderText.length)return;if(!t.renderText[0].startsWith("@"))return;const o=t.renderText[0].replace("@","");if(_e.activeMention)Object.assign(_e.activeMention,{username:o,width:_e.inputSize.width,height:_e.inputSize.height});else{const t=e.canvasStickers.find((t=>t.rawText===`@${o}`));if(!t)return;_e.mentions.push({username:o,x:t.x,y:t.y,width:_e.inputSize.width,height:_e.inputSize.height})}})),inssist.storyMentions.onStoryCreationReduce(((t,e)=>{if("STORY_CREATION_CHANGE_STICKER_ORDER"!==t.type)return;const o=t.bumpIndex,n=e.canvasStickers[o];if(n&&n.rawText&&n.rawText.startsWith("@")){const t=n.rawText.replace("@",""),e=_e.mentions.find((e=>e.username===t));_e.activeMention=e||null}else _e.activeMention=null})),inssist.storyMentions.onStoryCreationReduce((t=>{"STORY_CREATION_ENTER_ADD_TEXT"===t.type&&(_e.activeMention=null)})),inssist.storyMentions.onStoryCreationReduce((t=>{"STORY_CREATION_MOVE_CANVAS_STICKER"===t.type&&_e.activeMention&&(_e.activeMention.x+=t.deltaX,_e.activeMention.y+=t.deltaY)})),inssist.storyMentions.onStoryCreationReduce((t=>{"STORY_CREATION_DELETE_CANVAS_STICKER"===t.type&&_e.activeMention&&me.removeFromArray(_e.mentions,_e.activeMention)})),function(){if(!ve)return;const t=ve.post;ve.post=(...e)=>(e[0].includes("/create/configure_to_story")&&_e.mentions.length>0&&(e[1]={...e[1],reel_mentions:JSON.stringify(xe())}),t.call(ve,...e))}()},getMentions:xe};let _e={mentions:[],inputSize:{width:0,height:0},activeMention:null};function xe(){const t=t=>Math.round(1e4*t)/1e4;return _e.mentions.map((e=>{const o=JSON.parse(JSON.stringify(be.getState())).users.usernameToId[e.username];if(!o)return null;const n=me.$(ye.storyCreation.root)||document.body;return{user_id:o,x:t(Math.max(0,e.x/n.offsetWidth)),y:t(Math.max(0,e.y/n.offsetHeight)),width:t(e.width/n.offsetWidth),height:t(e.height/n.offsetHeight),rotation:0}})).filter(Boolean)}var we={};we.controller={init:function(){wt.on("cdn-proxy.fetch",this._fetchUrl.bind(this))},_fetchUrl:async function(t){if(!t)return null;try{const e=await fetch(t);if(!e||!e.ok)return null;const o=await e.blob();return URL.createObjectURL(o)}catch{return null}}};var Pe={};const{$utils:Ce}=app;Pe.controller={init:async function(){if((await Ce.waitFor((()=>document.documentElement))).classList.contains("touch"))return;if(window.opener&&location.pathname.startsWith("/accounts/login/"))return;(await Ce.waitFor((()=>document.body))).insertAdjacentHTML("beforeend",`\n    <button class="open-in-inssist open-in-inssist_below">\n      <div class="open-in-inssist__main">\n        <img class="open-in-inssist__icon" src="${window.inssist.url("/img/icon-128.png")}"/>\n        <span class="open-in-inssist__label">OPEN IN INSSIST</span>\n      </div>\n      <div class="open-in-inssist__smile">\n        <span class="open-in-inssist__smile-icon">${function(){const t=Array.from(Se).filter((t=>t.trim().length>0)),e=Math.floor(Date.now()/Ce.time.DAY)%t.length;return t[e]}()}</span>\n        <span class="open-in-inssist__smile-text">smile of the day</span>\n      </div>\n    </button>\n  `);const t=Ce.$(".open-in-inssist");setTimeout((()=>{t.classList.remove("open-in-inssist_below")}),300),t.addEventListener("click",(t=>{t.preventDefault(),t.stopPropagation(),Ce.setCookie("open-in-inssist",location.pathname)}),!0),Ce.onDocMutations((()=>{t.classList.toggle("open-in-inssist_hidden",!("www.instagram.com"===location.host||"instagram.com"===location.host))})),Ce.insertMultistyle`
    <style>
      .open-in-inssist {
        position: fixed;
        right: 26px;
        bottom: 0;
        padding: 0;
        background: #F7F7F9;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
        border-radius: 4px 4px 0 0;
        cursor: pointer;
        border: none;
        transform: translateY(128px);
        transition: transform 350ms;
        z-index: 99999;
      }
      .open-in-inssist:hover {
        transform: none;
      }
      .open-in-inssist_below {
        transform: translateY(100%);
      }
      .open-in-inssist_hidden {
        display: none;
      }

      .open-in-inssist__main {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 8px 17px 7px 12px;
      }

      .open-in-inssist__icon {
        width: 22px;
        height: 22px;
        margin-right: 8px;
      }

      .open-in-inssist__label {
        font-family: 'Montserrat';
        color: #556180;
        font-size: 12px;
        font-weight: 600;
      }

      .open-in-inssist__smile {
        padding: 16px 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      .open-in-inssist__smile-icon {
        font-size: 64px;
        line-height: 78px;
        height: 78px;
      }

      .open-in-inssist__smile-text {
        font-family: 'Nunito Sans';
        font-size: 9px;
        color: #000000;
        opacity: 0.6;
      }

      @media (max-width:  900px) {
        .open-in-inssist {
          display: none;
        }
      }
    </style>
  `}};const Se="\n  🤯🤗🧐🙃😝🤒🤓😑😊😯🙂🤧🥳\n  😬🥰🤪🤨😘🥴🤣😄😀😶😚😖😋\n  😛😵😜😷😴🤔😐😗😃😁🥶🤑😎\n  😉🤫😳😡😱😤😍🤩🤐🤭😇😅😲\n  😂😏😙😆🙄😌😮🥺😈🤤\n";const{$utils:Me}=app;let $e,ke;St.controller={init:function(){$e=L.controller.getConfig().igSelectors,ke=document.documentElement,function(){const t=Symbol("handled");Me.onDocMutations((()=>{const e=Me.$($e.postCreation.captionContainer);e&&(e[t]||(e[t]=!0,e.insertAdjacentHTML("afterend",Ae())))}))}(),ke.addEventListener("click",(t=>{const e=t.target.closest(".new-post-extra__button-cancel"),o=t.target.closest(".new-post-extra__button");if(!o)return;const n=o.dataset.option;e?wt.send("new-post-extra.cancel-click",n):wt.send("new-post-extra.option-click",n)})),function(){const t=()=>{const t=Me.$(".new-post-extra");if(t){t.outerHTML=Ae();{const t=Me.$($e.postCreation.submitPostButton);t.originalText||(t.originalText=t.innerText),t.innerText="draft"===Te.laterPillData.date?"Draft":Te.laterPillData.date?"Schedule":t.originalText}}};wt.on("new-post-extra.synch-selected-option",(e=>{Te.selectedOption=e,t()})),wt.on("new-post-extra.update-pill-music",(({name:e})=>{Te.musicPillData.name=e,t()})),wt.on("new-post-extra.update-pill-cover",(({hasCover:e})=>{Te.coverPillData.hasCover=e,t()})),wt.on("new-post-extra.update-pill-later",(({date:e,dateStr:o})=>{Te.laterPillData.date=e,Te.laterPillData.dateStr=o,t()}))}(),async function(){const t=await $t("store");if(!t)return;let e=null;t.subscribe((()=>{var o;const n=null===(o=t.getState().creation)||void 0===o?void 0:o.sourceVideo,i=n&&n.dataURL||null;e!==i&&(ke.classList.toggle("new-post-extra--video",!!i),e=i,i&&wt.send("new-post-extra.creation-video-change",i))}))}(),async function(){qt.on("ig.creation-session-start",(()=>{Te.musicPillData={name:null},Te.coverPillData={hasCover:!1}}))}(),async function(){const t=await $t("store");if(!t)return;let e=!1;Me.onDocMutations((()=>{const o=!!Me.$($e.postCreation.captionTextarea);if(e!==o)if(e=o,e){const e=t.getState(),o=!!Me.$($e.postCreation.previewPostTypeIcon)?Me.safe((()=>e.creation.sourceVideo.uploadMediaDurationMs),0):0;wt.send("new-post-extra.enter-page",{videoDurationMs:o})}else wt.send("new-post-extra.exit-page")}))}(),Me.insertMultistyle`
    <style>
      .new-post-extra {
        background: #FFF;
        border-bottom: 1px solid #DBDBDB;
        padding: 4px 0;
      }

      .new-post-extra__button {
        display: flex;
        align-items: center;
        border: none;
        outline: none;
        background: transparent;
        padding: 3px 18px 3px 8px;
        cursor: pointer;
        width: 100%;
      }
      /* not video? => hide cover assist and music assist buttons */
      html:not(.new-post-extra--video) .new-post-extra__button[data-option="cover-assist"],
      html:not(.new-post-extra--video) .new-post-extra__button[data-option="music-assist"] {
        display: none;
      }

      .new-post-extra__button-pill {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 3px 6px 3px 6px;
        border-radius: 4px;
        background: transparent;
      }
      .new-post-extra__button_can-cancel .new-post-extra__button-pill {
        background: #EFEFEF;
      }

      .new-post-extra__button-icon {
        width: 24px;
        height: 24px;
        margin-right: 12px;
        color: #738398;
        flex-shrink: 0;
      }

      .new-post-extra__button-text {
        font-family: Montserrat;
        font-size: 14px;
        line-height: 20px;
        font-weight: 500;
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 190px;
        white-space: nowrap;
      }

      .new-post-extra__button-cancel {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 20px;
        height: 20px;
        cursor: pointer;
        margin-left: 8px;
        color: #000;
        flex-shrink: 0;
        position: relative;
        border-radius: 50%;
        transition: background 0.3s;
      }
      .new-post-extra__button-cancel:hover {
        background: #D6D6D6;
      }
      .new-post-extra__button:not(.new-post-extra__button_can-cancel) .new-post-extra__button-cancel {
        display: none;
      }

      .new-post-extra__pro-badge {
        padding: 2px 8px 3px;
        border-radius: 3px;
        background: linear-gradient(183deg, #fd7726 -14%, #ef1834 60%, #c70bc0 128%);
        font-size: 9px;
        line-height: 11px;
        font-weight: 600;
        color: #FFF;
        margin-left: 16px;
      }

      .new-post-extra__button-chevron-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 21px;
        height: 21px;
        border-radius: 50%;
        box-sizing: border-box;
        padding: 4px 6px;
        margin-left: auto;
        color: #A5A7AA;
        position: relative;
        right: -5px;
      }
      .new-post-extra__button_selected .new-post-extra__button-chevron-icon {
        color: #FFF;
        background: #1BA2F9;
      }
    </style>
  `},getCtx:function(){return Te}};const Te={selectedOption:null,musicPillData:{name:null},coverPillData:{hasCover:!1},laterPillData:{date:null,dateStr:null}};function Ae(){const t='\n    <svg\n      class="new-post-extra__button-chevron-icon"\n      xmlns="http://www.w3.org/2000/svg"\n      width="7.5"\n      height="12.357"\n      viewBox="0 0 7.5 12.357">\n      <path d="M7.301 6.659l-5.5 5.5a.679.679 0 01-.961 0l-.641-.641a.679.679 0 010-.959l4.358-4.38L.198 1.8a.679.679 0 010-.959L.839.2A.679.679 0 011.8.2l5.5 5.5a.679.679 0 01.001.959z" fill="currentColor"/>\n    </svg>\n  ',e='\n    <div class="new-post-extra__button-cancel">\n      <svg width="8" height="8" viewBox="0 0 8 8">\n        <path d="M6.5-.001 4 2.499l-2.5-2.5-1.5 1.5 2.5 2.5-2.5 2.5 1.5 1.5 2.5-2.5 2.5 2.5 1.5-1.5-2.5-2.5 2.5-2.5Z" fill="currentColor"/>\n      </svg>\n    </div>\n  ';return`\n    <div class="new-post-extra">\n      \x3c!-- add music --\x3e\n      <button\n        class="\n          new-post-extra__button\n          ${Te.musicPillData.name?"new-post-extra__button_can-cancel":""}\n          ${"music-assist"===Te.selectedOption?"new-post-extra__button_selected":""}\n        "\n        data-option="music-assist">\n        <div class="new-post-extra__button-pill">\n          <svg class="new-post-extra__button-icon" viewBox="0 0 24 24">\n            <path d="M0 0h24v24H0Z" fill="none"/>\n            <path d="M18.5 5.438a.937.937 0 0 0-1.22-.893L7.906 7.313a.937.937 0 0 0-.656.893v7.658a4.052 4.052 0 0 0-.937-.115c-1.554 0-2.813.84-2.813 1.875s1.259 1.877 2.812 1.877 2.812-.839 2.812-1.875v-6.847l7.5-2.2v5.41a4.052 4.052 0 0 0-.937-.115c-1.553 0-2.812.839-2.812 1.875s1.259 1.875 2.812 1.875 2.813-.839 2.813-1.875V5.438Z" fill="currentColor"/>\n          </svg>\n          <div class="new-post-extra__button-text">\n            ${Te.musicPillData.name||"Add Music"}\n          </div>\n          ${e}\n        </div>\n        ${t}\n      </button>\n\n      \x3c!-- change cover --\x3e\n      <button\n        class="\n          new-post-extra__button\n          ${Te.coverPillData.hasCover?"new-post-extra__button_can-cancel":""}\n          ${"cover-assist"===Te.selectedOption?"new-post-extra__button_selected":""}\n        "\n        data-option="cover-assist">\n        <div class="new-post-extra__button-pill">\n          <svg class="new-post-extra__button-icon" viewBox="0 0 24 24">\n            <path d="M0 0h24v24H0Z" fill="none"/>\n            <path d="M6 19.5A1.5 1.5 0 0 1 4.5 18V6A1.5 1.5 0 0 1 6 4.5h12A1.5 1.5 0 0 1 19.5 6v12a1.5 1.5 0 0 1-1.5 1.5Zm10.055-1.4h2.021v-2.02l-4.037-4.037 2.016-2.021 2.021 2.021V5.986H5.962v6.057l2.021-2.021Z" fill="currentColor"/>\n          </svg>\n          <div class="new-post-extra__button-text">\n            ${Te.coverPillData.hasCover?"Custom Cover":"Change Cover"}\n          </div>\n          ${e}\n        </div>\n        ${t}\n      </button>\n\n      \x3c!-- post later --\x3e\n      <button\n        class="\n          new-post-extra__button\n          ${Te.laterPillData.dateStr?"new-post-extra__button_can-cancel":""}\n          ${"later"===Te.selectedOption?"new-post-extra__button_selected":""}\n        "\n        data-option="later">\n        <div class="new-post-extra__button-pill">\n          <svg class="new-post-extra__button-icon" viewBox="0 0 24 24">\n            <path d="M0 0h24v24H0Z" fill="none"/>\n            <path d="M11.407 19.958a8.271 8.271 0 0 1-.819-.125c-.266-.054-.532-.123-.791-.2s-.511-.173-.758-.277a8.274 8.274 0 0 1-4.39-4.39c-.1-.247-.2-.5-.277-.758s-.149-.525-.2-.791a8.282 8.282 0 0 1-.125-.819 8.377 8.377 0 0 1 0-1.687 8.282 8.282 0 0 1 .125-.819c.054-.266.123-.532.2-.791s.173-.511.277-.758a8.274 8.274 0 0 1 4.39-4.39c.247-.1.5-.2.758-.277s.525-.149.791-.2a8.27 8.27 0 0 1 .819-.125 8.374 8.374 0 0 1 1.687 0 8.269 8.269 0 0 1 .819.125c.266.054.532.123.791.2s.511.173.758.277a8.274 8.274 0 0 1 4.39 4.39c.1.247.2.5.277.758s.149.525.2.791a8.282 8.282 0 0 1 .125.819 8.377 8.377 0 0 1 0 1.687 8.282 8.282 0 0 1-.125.819c-.054.266-.123.532-.2.791s-.173.511-.277.758a8.274 8.274 0 0 1-4.39 4.39c-.247.1-.5.2-.758.277s-.525.149-.791.2a8.27 8.27 0 0 1-.819.125 8.373 8.373 0 0 1-1.687 0Zm-.48-14.641a6.531 6.531 0 0 0-2.348.988A6.586 6.586 0 0 0 6.2 9.194a6.534 6.534 0 0 0-.383 1.233 6.63 6.63 0 0 0 0 2.647 6.531 6.531 0 0 0 .988 2.348 6.586 6.586 0 0 0 2.889 2.379 6.532 6.532 0 0 0 1.233.383 6.63 6.63 0 0 0 2.647 0 6.531 6.531 0 0 0 2.348-.988 6.586 6.586 0 0 0 2.379-2.889 6.535 6.535 0 0 0 .383-1.233 6.63 6.63 0 0 0 0-2.647 6.53 6.53 0 0 0-.988-2.348A6.586 6.586 0 0 0 14.807 5.7a6.534 6.534 0 0 0-1.233-.383 6.631 6.631 0 0 0-2.647 0Zm.907 8.241a1.047 1.047 0 0 1-1.011-1.011v-3.4a.965.965 0 1 1 1.93 0v2.476h1.2a.965.965 0 0 1 0 1.93Z" fill="currentColor"/>\n          </svg>\n          <div class="new-post-extra__button-text">\n            ${Te.laterPillData.dateStr||"Post Later"}\n          </div>\n          ${e}\n        </div>\n        ${t}\n      </button>\n\n      \x3c!-- hashtag assistant --\x3e\n      <button\n        class="\n          new-post-extra__button\n          ${"tag-assist"===Te.selectedOption?"new-post-extra__button_selected":""}\n        "\n        data-option="tag-assist">\n        <div class="new-post-extra__button-pill">\n          <svg class="new-post-extra__button-icon" viewBox="0 0 24 24">\n            <path d="M0 0h24v24H0Z" fill="none"/>\n            <path d="M16.013 13.928h2.934v2.46h-3.228L15.268 20h-2.551l.451-3.611H9.851L9.399 20H6.871l.451-3.611H4.366v-2.461h3.25l.47-3.656H5.133v-2.46h3.253L8.835 4.2h2.528l-.451 3.611h3.318l.456-3.611h2.528l-.451 3.611h2.934l.023 2.46h-3.25Zm-2.551 0 .474-3.656h-3.318l-.474 3.656Z" fill="currentColor"/>\n          </svg>\n          <div class="new-post-extra__button-text">\n            Hashtag Assistant\n          </div>\n          ${e}\n        </div>\n        ${t}\n      </button>\n    </div>\n  `}Qt.bitrateController={init:function(){this._defineAdjustBitrateInterceptor()},_defineAdjustBitrateInterceptor:function(){Qt.define("adjustBitrate",(async t=>{const e=await wt.send("igInterceptor.adjustBitrate",t[0].file);e&&(t[0].file=e,t[0].dataURL=URL.createObjectURL(e))}))}},Qt.controller={init:function(){Qt.define=this._define.bind(this),this._interceptors={},this._interceptUploadVideo(),this._interceptUploadPhoto(),Qt.bitrateController.init(),Qt.metadataController.init()},_define:function(t,e){this._interceptors[t]=e},_interceptUploadVideo:async function(){const t=await Lt("PolarisAPIRuploadVideo",null);if(!t)return;const e=t.ruploadVideo.bind(t);t.ruploadVideo=async(...t)=>{await this._call("adjustBitrate",t),await this._call("stripMetadata",t),await this._call("addMusic",t);const o=await this._call("splitStoryIntoChunks",t,e);return o||e(...t)}},_interceptUploadPhoto:async function(){const t=await Lt("PolarisAPIRuploadPhoto",null);if(!t)return;const e=t.ruploadPhoto.bind(t);t.ruploadPhoto=async(...t)=>{const o=await this._call("uploadCoversForStoryChunks",t,e);return o||e(...t)}},_call:async function(t,...e){const o=this._interceptors[t];if(o)return o(...e);console.error(`[$igInterceptor] unable to find "${t}" interceptor`)}},Qt.metadataController={init:function(){this._defineStripMetadataInterceptor()},_defineStripMetadataInterceptor:function(){Qt.define("stripMetadata",(async t=>{const e=await wt.send("igInterceptor.stripMetadata",t[0].file);e&&(t[0].file=e,t[0].dataURL=URL.createObjectURL(e))}))}};const{$reels:De}=app;De.patchHttp=(t,{isCreatingReels:e=(()=>!1),isSharingToFeed:o=(()=>!1),onSuccess:n=(()=>{})})=>{const i=t.post;t.post=async(...r)=>{if(!e())return i.call(t,...r);if(r[0].includes("/rupload_igvideo")){const e=r[2].headers,o=JSON.parse(e["X-Instagram-Rupload-Params"]);return o.is_igtv_video=!1,o.is_clips_video=!0,o.is_unified_video=!1,o.uses_original_audio=!0,o.audio_type="original_sounds",e["X-Instagram-Rupload-Params"]=JSON.stringify(o),i.call(t,...r)}if(r[0].includes("/create/configure")||r[0].includes("/media/configure")||r[0].includes("/igtv/configure_to_igtv")){r[0]="https://i.instagram.com/api/v1/media/configure_to_clips/",r[1].clips_uses_original_audio=1,r[1].uses_original_audio=1,r[1].original_audio=1,r[1].audio=1,r[1].clips_audio=1,r[1].clips_with_audio=1,r[1].with_audio=1,r[1].enable_audio=1,r[1].clips_enable_audio=1,r[1].clips_audio_enable=1,r[1].audio_enable=1,r[1].audio_type="original_sounds",r[1].clips_share_preview_to_feed=o()?1:0;const e=await i.call(t,...r);return"ok"===(null==e?void 0:e.status)&&n(),e}return i.call(t,...r)}};const{$utils:Re}=app,Ie=Symbol("anchor");function Ee({class:t,style:e,text:o,anchor:n,atCenter:i=!1}){const r=Ee;r.initialized||(r.initialized=!0,Re.onDocMutations((()=>{Re.$$(".tooltip").forEach((t=>{const e=t[Ie];document.body.contains(e)||t.remove()}))})),Re.insertMultistyle`
    <style>
      .tooltip {
        display: block;
        position: absolute;
        margin-top: 12px;
        margin-left: 4px;
        padding: 8px 10px;
        color: #FFF;
        background: #1BA2F9;
        font-size: 12px;
        font-weight: 500;
        line-height: 18px;
        font-family: Montserrat;
        opacity: 0;
        pointer-events: none;
        transform: translateY(2px);
        transition: transform 0.2s, opacity 0.2s;
        z-index: 99999;
      }
      .tooltip_shown {
        opacity: 1;
        transform: none;
      }
      .theme-night .tooltip {
        filter: url(#theme-reverse-filter);
        background: #33ABF8;
      }

      /* triangle */
      .tooltip::before {
        content: '';
        position: absolute;
        right: 6px;
        bottom: 100%;
        border: 3px solid transparent;
        border-left-width: 4px;
        border-right-width: 4px;
        border-bottom-color: #1BA2F9;
      }
      .theme-night .tooltip::before {
        border-bottom-color: #1BA2F9;
      }
      .tooltip_at-center::before {
        right: calc(50% - 4px);
      }

      .tooltip b {
        font-weight: 700;
      }
      .tooltip code {
        white-space: nowrap;
        padding: 1px 5px;
        border-radius: 4px;
        background: rgba(255, 255, 255, 0.25);
      }
    </style>
  `);const a=document.createElement("div");a.innerHTML=`\n    <div\n      class="${t||""} tooltip ${i?"tooltip_at-center":""}"\n      ${e?`style="${e}"`:""}>\n      ${o}\n    </div>\n  `;const s=a.firstElementChild;document.body.insertAdjacentElement("afterend",s),s[Ie]=n,n.addEventListener("mouseenter",(()=>{let t,e;const o=n.getBoundingClientRect();i?(t=Math.round(o.left+o.width/2-s.offsetWidth/2-4),e=Math.round(o.top+o.height)):(t=Math.round(o.left+o.width-s.offsetWidth),e=Math.round(o.top+o.height)),s.style.left=`${t}px`,s.style.top=`${e}px`,s.classList.add("tooltip_shown")})),n.addEventListener("mouseleave",(()=>{s.classList.remove("tooltip_shown")}))}const{$reels:Be,$utils:Le}=app;let Fe,Oe,He;Be.controller={init:async function(){if(Fe=L.controller.getConfig().igSelectors,Oe=await $t("http"),He=await $t("store"),!Oe||!He)return;Be.patchHttp(Oe,{isCreatingReels:()=>Ve.creatingReels,isSharingToFeed:()=>Ve.shareToFeed,onSuccess:()=>{wt.send("reels.submit-success")}}),function(){const t=Symbol("handled");Le.onDocMutations((async()=>{if(!Ve.creatingReels)return;const e=Le.$(Fe.postCreation.submitPostButton);if(!e)return;if(e[t])return;e[t]=!0;const o=await wt.send("reels.is-pro");e.addEventListener("click",(t=>{o||(t.preventDefault(),t.stopPropagation(),wt.send("reels.open-billing"))}),{capture:!0}),o||(e.style.opacity=.5,Ee({style:"width: 100%; max-width: 280px;",anchor:e,text:"\n          Posting Reels is a PRO feature, please consider\n          upgrading to publish Reels from the Desktop.\n        "}))}))}(),function(){const t=Symbol("handled");Le.onDocMutations((()=>{if(!Ve.creatingReels)return;const e=Le.docElem.dataset.page;if(!("CreationStylePage"===e||"CreationDetailsPage"===e))return;const o=Le.$(Fe.general.headerTitle);o&&(o[t]||(o[t]=!0,o.innerText="New Reel"))})),Le.insertMultistyle`
    <style>
      /* hide "Advanced Posting Options" section */
      .reels--creating-reels .extended-post-creation {
        display: none;
      }
    </style>
  `}(),function(){const t=Symbol("handled");Le.onDocMutations((async()=>{if(!Ve.creatingReels)return;const e=Le.$(Fe.postCreation.captionContainer);if(!e)return;if(e[t])return;e[t]=!0;const o=await wt.send("reels.get-trial-data");if(o.hasPro)return;e.insertAdjacentHTML("beforebegin",`\n      <div class="ReelsUpgradeToProBar">\n        <div class="ReelsUpgradeToProBar__text">\n          Free Reels Remaining: ${o.freeReels} / ${o.maxFreeReels}\n        </div>\n        <button class="ReelsUpgradeToProBar__button">\n          Get Unlimited Reels\n        </button>\n      </div>\n    `);Le.$(".ReelsUpgradeToProBar__button").addEventListener("click",(()=>{wt.send("reels.open-billing")}))})),Le.insertMultistyle`
    <style>
      .ReelsUpgradeToProBar {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 8px 16px;
        font-size: 14px;
        border-bottom: 1px solid #ddd;
      }

      .ReelsUpgradeToProBar__text {
        margin-right: 24px;
        white-space: nowrap;
      }

      .ReelsUpgradeToProBar__button {
        font-size: inherit;
        color: #0095F6;
        border: none;
        cursor: pointer;
        padding: 0;
        font-weight: 500;
        background: transparent;
      }
    </style>
  `}(),function(){const t=Symbol("handled");Le.onDocMutations((()=>{if(!Ve.creatingReels)return;const e=Le.$(Fe.postCreation.body);if(!e)return;if(e[t])return;e[t]=!0,e.insertAdjacentHTML("beforeend",`\n      <div class="reels-share-to-feed ${Ve.shareToFeed?"reels-share-to-feed_on":""}">\n        <button class="reels-share-to-feed__button clickable">\n          <div class="reels-share-to-feed__checkbox">\n            <svg class="reels-share-to-feed__checkbox-icon-empty" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">\n              <path fill="none" d="M0 0h24v24H0z"/>\n              <path d="M19 5v14H5V5zm0-2H5a2.006 2.006 0 00-2 2v14a2.006 2.006 0 002 2h14a2.006 2.006 0 002-2V5a2.006 2.006 0 00-2-2z" fill="#1ba2f9" fill-rule="evenodd"/>\n            </svg>\n            <svg class="reels-share-to-feed__checkbox-icon-checked" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">\n              <path fill="none" d="M0 0h24v24H0z"/>\n              <path d="M19 3H5a2.006 2.006 0 00-2 2v14a2.006 2.006 0 002 2h14a2.006 2.006 0 002-2V5a2.006 2.006 0 00-2-2zm-9 14l-5-5 1-1 4 3 8-7 1 1-9 9z" fill="#1ba2f9" fill-rule="evenodd"/>\n            </svg>\n          </div>\n          <div class="reels-share-to-feed__label">\n            Also Share to Feed\n          </div>\n        </button>\n        <div class="reels-share-to-feed__preview">\n          <div class="reels-share-to-feed__preview-image"></div>\n          <div class="reels-share-to-feed__preview-caption">Feed Post Preview</div>\n        </div>\n      </div>\n    `);const o=Le.$(".reels-share-to-feed");Le.$(".reels-share-to-feed__button").addEventListener("click",(()=>{Ve.shareToFeed=!Ve.shareToFeed,o.classList.toggle("reels-share-to-feed_on")}))}));const e=()=>{var t,e;if(!Ve.creatingReels)return;const o=null===(t=He.getState().creation)||void 0===t||null===(e=t.coverPhoto)||void 0===e?void 0:e.dataURL;if(!o)return;const n=Le.$(".reels-share-to-feed__preview-image");n&&(n.style.backgroundImage=`url('${o}')`)};Le.onDocMutations(e),He.subscribe(e),Le.insertMultistyle`
    <style>
      .reels-share-to-feed {
        margin-top: 12px;
        padding: 5px 0;
        background: #FFF;
        border-top: 1px solid #DBDBDB;
        border-bottom: 1px solid #DBDBDB;
      }

      .reels-share-to-feed__title {
        padding: 12px 16px 0px;
        font-size: 14px;
        line-height: 20px;
        font-weight: 600;
        font-family: Montserrat;
      }

      .reels-share-to-feed__warning {
        padding: 8px 16px 4px;
        max-width: 380px;
        font-family: Montserrat;
        line-height: 1.4;
      }

      .reels-share-to-feed__button {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 6px 14px;
        cursor: pointer;
        border: none;
        outline: none;
        background: transparent;
        user-select: none;
      }

      .reels-share-to-feed__checkbox {
        display: flex;
        margin-right: 12px;
      }

      .reels-share-to-feed_on .reels-share-to-feed__checkbox-icon-empty {
        display: none;
      }

      .reels-share-to-feed:not(.reels-share-to-feed_on) .reels-share-to-feed__checkbox-icon-checked {
        display: none;
      }

      .reels-share-to-feed__label {
        font-family: Montserrat;
        font-size: 14px;
        line-height: 20px;
        font-weight: 500;
      }

      .reels-share-to-feed__preview {
        display: block;
        margin: 4px 0 4px 17px;
      }
      .reels-share-to-feed:not(.reels-share-to-feed_on) .reels-share-to-feed__preview {
        display: none;
      }

      .reels-share-to-feed__preview-image {
        width: 100px;
        height: 100px;
        background-size: cover;
        background-position: center;
        border-radius: 4px;
      }

      .reels-share-to-feed__preview-caption {
        font-family: Montserrat;
        font-size: 11px;
        font-weight: 500;
        margin-top: 4px;
        color: #8e8e8e;
      }
    </style>
  `}(),function(){const t=Symbol("handled");Le.onDocMutations((()=>{if(!Ve.creatingReels)return;const e=Le.$(Fe.postCreation.imageContainer),o=Le.$(Fe.postCreation.videoContainer),n=e||o;n&&(n[t]||(n[t]=!0,n.insertAdjacentHTML("beforeend",'\n      <div class="reels-tik-tok-watermark-info">\n        Find more info about posting Instagram Reels in our\n        <a href="https://inssist.com/knowledge-base" target="_blank">Knowledge Base</a> and\n        <a href="https://inssist.com/knowledge-base/sharing-tiktok-to-instagram-reels" target="_blank">Guide</a>.\n      </div>\n    ')))})),Le.insertMultistyle`
    <style>
      .reels-tik-tok-watermark-info {
        display: block;
        padding: 16px 20px 20px 20px;
        font-family: Montserrat;
        font-size: 12px;
        font-weight: 500;
        line-height: 1.6;
      }

      .reels-tik-tok-watermark-info ul {
        margin-top: 7px;
        list-style: disc;
      }

      .reels-tik-tok-watermark-info li {
        margin-left: 16px;
        margin-bottom: 4px;
      }
      .reels-tik-tok-watermark-info li:last-child {
        margin-bottom: 0;
      }

      .reels-tik-tok-watermark-info a {
        color: #1BA2F9 !important;
      }
      .theme-nigh .reels-tik-tok-watermark-info a {
        filter: url(#theme-reverse-filter);
        color: #33ABF8 !important;
      }
    </style>
  `}()},isShareToFeed:function(){return Ve.shareToFeed},isCreatingReels:function(){return Ve.creatingReels},startReelsCreationSession:function(){const t=He.getState().creation.sessionId;Ve.creatingReels=!0,Ve.shareToFeed=!0,Le.docElem.classList.add("reels--creating-reels"),wt.send("reels.creation-session-start"),Ve.stopSessionWatcher=He.subscribe((()=>{const e=He.getState();t!==e.creation.sessionId&&Ne()}))},stopReelsCreationSession:Ne};const Ve={shareToFeed:!0,creatingReels:!1,stopSessionWatcher:null};function Ne(){Ve.creatingReels=!1,Le.docElem.classList.remove("reels--creating-reels"),wt.send("reels.creation-session-end"),Ve.stopSessionWatcher&&Ve.stopSessionWatcher()}const{$coverAssist:ze,$utils:je}=app;let Ue;ze.controller={init:function(){Ue=L.controller.getConfig().igSelectors,window.inssist.moduleInterceptor.registerReduxAction("inssist.cover-assist.set-cover",((t,e)=>({...t,creation:{...t.creation,coverPhoto:{...t.creation.coverPhoto,file:e.file,dataURL:e.url,isCustom:!0}}}))),async function(){let t=null;const e=await $t("store");if(!e)return;wt.on("cover-assist.synch-cover",(o=>{if(!je.$(Ue.postCreation.previewPostImage))return;const n=e.getState();o?(n.creation.sessionId!==t&&(t=n.creation.sessionId,We={url:n.creation.coverPhoto.dataURL,blob:n.creation.coverPhoto.file}),e.dispatch({type:"inssist.cover-assist.set-cover",url:URL.createObjectURL(o),file:o})):n.creation.sessionId===t&&e.dispatch({type:"inssist.cover-assist.set-cover",url:We.url,file:We.blob})}))}(),wt.on("cover-assist.get-default-ig-cover-url",Ge)}};let We=null;async function Ge(){var t,e;const o=await $t("store");return o?We?We.url:null===(t=o.getState().creation)||void 0===t||null===(e=t.coverPhoto)||void 0===e?void 0:e.dataURL:null}var qe={},Ye={};const{$utils:Xe}=app;let Qe,Ke,Ze,Je;function to(t){const e=Xe.$(".CreationPopup");e&&e.classList.toggle("CreationPopup_show",t)}Ye.controller={init:async function(){if(Qe=I.selectors,Ke=await $t("nav"),Ze=await $t("http"),Je=await $t("store"),!Ke||!Ze||!Je)return;Xe.onDocMutations((()=>{const t=!Xe.$(Qe.topNav);document.documentElement.classList.toggle("isSidebarNav",t)})),Xe.insertMultistyle`
    <style>
      ${Qe.creationLoadingBar} {
        position: absolute;
        top: 0;
      }
    </style>
  `,function(){const t=Ze.post.bind(Ze);Ze.post=(...e)=>(e[0]&&e[0].includes("configure_to_igtv")&&!e[0].endsWith("/")&&(e[0]=`${e[0]}/`),t(...e))}(),function(){let t=!1;const e=Symbol("handled");Xe.onDocMutations((()=>{const o=Xe.$(Qe.newPostButton);o&&(o[e]||(o[e]=!0,o.insertAdjacentHTML("afterend",'\n    <div class="CreationPopup">\n      <div class="CreationPopup__option" data-id="post">\n        <svg class="CreationPopup__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">\n          <path\n            d="M7.164 22.654A5.17 5.17 0 012 17.49V7.164A5.17 5.17 0 017.164 2H17.49a5.17 5.17 0 015.164 5.164V17.49a5.17 5.17 0 01-5.164 5.164zm0-1.757H17.49a3.794 3.794 0 003.41-3.407V14.8l-3.68-3.661-4.394 5.934L8 14.866 3.766 17.7a3.832 3.832 0 003.398 3.2zM3.757 7.164v8.4L7.8 12.785l4.5 2.081 4.681-6.525 3.919 3.922v-5.1a3.794 3.794 0 00-3.41-3.406H7.164a3.794 3.794 0 00-3.407 3.407zm3.943.874a1.709 1.709 0 111.7 1.708 1.709 1.709 0 01-1.7-1.708z"\n            fill="currentColor"\n            stroke="#fff"\n            stroke-width=".4"\n          />\n        </svg>\n        New Post\n      </div>\n      <div class="CreationPopup__option" data-id="reel">\n        <svg class="CreationPopup__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">\n          <path\n            d="M15.548 14.007l-.006-.005-.006-.004-4.696-2.73s0 0 0 0a.736.736 0 00-.381-.113.73.73 0 00-.373.108c-.262.11-.407.371-.407.662v5.464c0 .262.155.511.398.658h0l.009.004a.899.899 0 00.352.098.88.88 0 00.314-.069l.063-.022.012-.004.012-.006 4.697-2.732h0l.001-.001a.743.743 0 00.357-.658c0-.259-.152-.505-.346-.65zM20.764 3.85h0l-.003-.004c-.534-.513-1.125-.945-1.943-1.247-.816-.301-1.85-.47-3.264-.47h-6.5c-1.394 0-2.417.169-3.233.476-.818.307-1.42.75-1.974 1.283h0l-.003.004C3.33 4.428 2.9 5.02 2.599 5.834c-.3.812-.469 1.837-.469 3.234v6.514c0 1.396.169 2.432.475 3.255.306.824.748 1.428 1.282 1.964l.002.002c.534.513 1.126.945 1.943 1.246.816.302 1.85.47 3.264.47h6.5c1.394 0 2.428-.168 3.249-.475.823-.307 1.425-.75 1.96-1.285l.001-.002c.513-.535.944-1.128 1.245-1.947.3-.817.469-1.853.469-3.27V9.068c0-1.397-.169-2.422-.475-3.24-.306-.819-.748-1.422-1.28-1.977zm-5.168-.2c1.31 0 2.174.166 2.788.41.612.244.985.567 1.314.896.466.468.897 1.045 1.149 2.216h-3.665L15.19 3.65h.406zm-6.948 0h4.734l1.991 3.522H10.64L8.648 3.65zM4.952 4.957c.435-.436.982-.87 2.065-1.12l1.897 3.336h-5.11c.25-1.17.682-1.748 1.148-2.216zm16.05 10.667c0 1.313-.167 2.178-.41 2.794-.243.613-.565.987-.894 1.316-.328.33-.712.652-1.33.896-.62.244-1.482.411-2.772.411H9.054c-1.31 0-2.174-.167-2.788-.411-.612-.243-.985-.566-1.314-.896a3.699 3.699 0 01-.893-1.332c-.244-.62-.41-1.486-.41-2.778v-6.93h17.353v6.93z"\n            fill="currentColor"\n            stroke="#fff"\n            stroke-width=".25"\n          />\n        </svg>\n        New Reel\n      </div>\n      <div class="CreationPopup__poweredBy">\n        Cracked by Yezer\n      </div>\n    </div>\n  '),o.addEventListener("click",(e=>{t||(e.preventDefault(),e.stopPropagation(),to())}))))})),document.addEventListener("click",(()=>{to(!1)})),document.addEventListener("click",(e=>{const o=e.target.closest(".CreationPopup__option");if(!o)return;const n=o.dataset.id;t=!0,function(t){const e=Xe.$(Qe.newPostButton);"post"===t?e.click():"reel"===t&&(qe.controller.startReelsCreationSession(),e.click())}(n),t=!1}),{capture:!0})}(),Xe.insertMultistyle`
    <style>
      /* show new post menu item when creation injection is ready */
      ${Qe.newPostMenuItem} {
        display: flex;
      }

      .CreationPopup {
        position: absolute;
        width: 170px;
        top: calc(100% + 15px);
        padding-top: 8px;
        background: #fff;
        transform: translateX(calc(-50% + 11px));
        box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.1);
        border-radius: 6px;
        transition: transform 0.3s, opacity 0.3s;
        user-select: none;
        z-index: 1;
      }
      .CreationPopup:not(.CreationPopup_show) {
        pointer-events: none;
        transform: translateX(calc(-50% + 11px)) translateY(-8px);
        opacity: 0;
      }
      html.isSidebarNav .CreationPopup {
        top: 4px;
        left: 100%;
        transform: none;
      }
      html.isSidebarNav .CreationPopup:not(.CreationPopup_show) {
        transform: translateX(-5px);
      }
      @media (min-width: 1264px) { /* full width view */
        html.isSidebarNav .CreationPopup {
          margin-left: -20px;
        }
      }
      @media (max-width: 767px) { /* mobile view */
        html.isSidebarNav .CreationPopup {
          top: auto;
          bottom: calc(100% + 6px);
          left: calc(-50% - 31px);
        }
        html.isSidebarNav .CreationPopup:not(.CreationPopup_show) {
          transform: translateY(8px);
        }
      }

      /* triangle  */
      .CreationPopup::before {
        content: '';
        width: 14px;
        height: 14px;
        position: absolute;
        top: 0;
        left: 50%;
        transform: translate(-50%, -50%) rotate(45deg);
        background: inherit;
        box-shadow: inherit;
      }
      html.isSidebarNav .CreationPopup::before {
        top: 28px;
        left: 0;
      }
      @media (max-width: 767px) { /* mobile view */
        html.isSidebarNav .CreationPopup::before {
          display: none;
        }
      }

      .CreationPopup::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: inherit;
        border-radius: inherit;
      }

      .CreationPopup__option {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 8px 16px;
        cursor: pointer;
        position: relative;
        z-index: 1;
      }
      .CreationPopup__option:hover {
        background: #fafafa;
      }

      .CreationPopup__icon {
        width: 24px;
        height: 24px;
        margin-right: 12px;
      }

      .CreationPopup__poweredBy {
        position: relative;
        z-index: 1;
        padding-top: 3px;
        padding-bottom: 2px;
        margin-top: 8px;
        font-size: 9px;
        text-align: center;
        color: #415B72;
        background: #F7F7F9;
        border-radius: 0 0 4px 4px;
      }

      ${Qe.dark} .CreationPopup {
        background: #242526;
      }

      ${Qe.dark} .CreationPopup__option:hover {
        background: #2b2c2d;
      }

      ${Qe.dark} .CreationPopup__poweredBy {
        color: #65676b;
        background: #0006;
      }
    </style>
  `,function(){let t=0;const e=Ze.post.bind(Ze);Ze.post=async(...o)=>{const n=o[0].includes("/configure_to_clips"),i=o[0].includes("/configure_to_igtv");if(!n&&!i)return e(...o);let r,a;try{r=await e(...o)}catch(t){a=t}if(a||"fail"===r.status){if(t+=1,t<=5)return Ze.post(...o);throw t=0,a||new Error("failed to post")}return r}}(),async function(){const t=await $t("add-dispatch-listener");if(!t)return;t((t=>{var e;"SHOW_NEW_UPLOADED_POST"===t.type&&"clips"===(null===(e=t.post)||void 0===e?void 0:e.productType)&&location.reload()}))}(),function(){let t;Xe.onDocMutations((()=>{const e=Xe.$(Qe.creationPublishingSpinner);if(e)if(t){if(t!==e.src){const t=Xe.$(".PublishingTitle"),e=Xe.$(".PublishingDisclaimer");t&&t.remove(),e&&e.remove()}}else t=e.src,e.insertAdjacentHTML("afterend",'\n      <div class="PublishingTitle">\n        Publishing Post...\n      </div>\n      <div class="PublishingDisclaimer">\n        Waiting for Instagram to publish the post, this\n        might take a&nbsp;few minutes. Please keep this\n        tab open until Inssist confirms the publish is complete.\n      </div>\n    '),Xe.onDocMutations((function t(){if(Xe.$(Qe.creationPublishingSpinner))return;Xe.onDocMutations.off(t);const e=Xe.$(".PublishingTitle"),o=Xe.$(".PublishingDisclaimer");e&&e.remove(),o&&o.remove()}));else t=null})),Xe.insertMultistyle`
    <style>
      .PublishingTitle {
        margin-top: 16px;
        margin-bottom: 16px;
        font-size: 22px;
        font-weight: 300;
        line-height: 17px;
        color: #262626;
        text-align: center;
        white-space: nowrap;
      }

      .PublishingDisclaimer {
        position: absolute;
        top: calc(100% + 40px);
        left: 50%;
        transform: translateX(-50%);
        width: 400px;
        color: #A0A0A0;
        text-align: center;
        line-height: 1.45;
      }

      ${Qe.creationPublishingSpinnerContainerWrap} {
        position: static;
      }

      ${Qe.creationPublishingSpinnerContainer} {
        position: static;
        align-items: center;
        justify-content: center;
      }
    </style>
  `}()}};const{$reels:eo,$utils:oo}=app;let no,io,ro;qe.controller={init:async function(){if(no=I.selectors,io=await $t("http"),ro=await $t("add-dispatch-listener"),!io||!ro)return;const t=await oo.waitFor((()=>window.inssist.desktopReelsData));Object.assign(ao,t),function(){const t=Symbol("handled");oo.onDocMutations((()=>{if(!ao.creatingReels)return;if(!!(!oo.$(no.uploadForm)&&!oo.$(no.creationBodyRight)))return;const e=oo.$(no.modalTitle);if(e){if(e[t])return;e[t]=!0,e.innerText="New Reel / Cracked by Yezer"}const o=oo.$(no.creationDndText);if(o){if(o[t])return;o[t]=!0,o.innerText="Drag video for your Reel here."}const n=oo.$(no.creationDndIcon);if(n){if(n[t])return;n.setAttribute("width","77"),n.setAttribute("height","77"),n.setAttribute("viewBox","0 0 24 24"),n.innerHTML='\n        <path\n          d="M15.548 14.007l-.006-.005-.006-.004-4.696-2.73s0 0 0 0a.736.736 0 00-.381-.113.73.73 0 00-.373.108c-.262.11-.407.371-.407.662v5.464c0 .262.155.511.398.658h0l.009.004a.899.899 0 00.352.098.88.88 0 00.314-.069l.063-.022.012-.004.012-.006 4.697-2.732h0l.001-.001a.743.743 0 00.357-.658c0-.259-.152-.505-.346-.65zM20.764 3.85h0l-.003-.004c-.534-.513-1.125-.945-1.943-1.247-.816-.301-1.85-.47-3.264-.47h-6.5c-1.394 0-2.417.169-3.233.476-.818.307-1.42.75-1.974 1.283h0l-.003.004C3.33 4.428 2.9 5.02 2.599 5.834c-.3.812-.469 1.837-.469 3.234v6.514c0 1.396.169 2.432.475 3.255.306.824.748 1.428 1.282 1.964l.002.002c.534.513 1.126.945 1.943 1.246.816.302 1.85.47 3.264.47h6.5c1.394 0 2.428-.168 3.249-.475.823-.307 1.425-.75 1.96-1.285l.001-.002c.513-.535.944-1.128 1.245-1.947.3-.817.469-1.853.469-3.27V9.068c0-1.397-.169-2.422-.475-3.24-.306-.819-.748-1.422-1.28-1.977zm-5.168-.2c1.31 0 2.174.166 2.788.41.612.244.985.567 1.314.896.466.468.897 1.045 1.149 2.216h-3.665L15.19 3.65h.406zm-6.948 0h4.734l1.991 3.522H10.64L8.648 3.65zM4.952 4.957c.435-.436.982-.87 2.065-1.12l1.897 3.336h-5.11c.25-1.17.682-1.748 1.148-2.216zm16.05 10.667c0 1.313-.167 2.178-.41 2.794-.243.613-.565.987-.894 1.316-.328.33-.712.652-1.33.896-.62.244-1.482.411-2.772.411H9.054c-1.31 0-2.174-.167-2.788-.411-.612-.243-.985-.566-1.314-.896a3.699 3.699 0 01-.893-1.332c-.244-.62-.41-1.486-.41-2.778v-6.93h17.353v6.93z"\n          fill="currentColor"\n          stroke="#FFF"\n          stroke-width=".8"\n        />\n      '}})),oo.insertMultistyle`
    <style>
      .reels--creating ${no.creationCarouselAddMediaButton},
      .reels--creating ${no.creationGeoOption},
      .reels--creating ${no.creationAccessibilityDropdown},
      .reels--creating ${no.creationAdvancedDropdown},
      .reels--creating ${no.creationDropdown},
      .reels--creating ${no.creationBottomHr} {
        display: none !important;
      }
    </style>
  `}(),eo.patchHttp(io,{isCreatingReels:()=>ao.creatingReels,isSharingToFeed:()=>ao.shareToFeed,onSuccess:()=>{ao.hasPro||(ao.freeReels-=1),oo.setCookie("desktop-reels.submit-success",1)}}),function(){const t=Symbol("handled");oo.onDocMutations((async()=>{if(!ao.creatingReels)return;const e=oo.$(no.creationRatioToggler);if(!e)return;if(e[t])return;e[t]=!0,e.click();const o=await oo.waitFor((()=>oo.$(no.creationRatioOptionVertical)),{timeout:1e3,frequency:10});o&&(o.click(),e.click())}))}(),function(){const t=Symbol("handled");oo.onDocMutations((()=>{if(!ao.creatingReels)return;const e=oo.$(no.creationAccessibilityDropdown);if(!e)return;if(e[t])return;e[t]=!0,e.insertAdjacentHTML("beforebegin",'\n      <div class="ShareToFeed ShareToFeed_on">\n        <div class="ShareToFeed__switch">\n          <div class="ShareToFeed__switchLabel">\n            Also Share to Feed\n          </div>\n          <div class="ShareToFeed__switchControl"></div>\n        </div>\n      </div>\n    ');const o=oo.$(".ShareToFeed");o.addEventListener("click",(()=>{ao.shareToFeed=!ao.shareToFeed,o.classList.toggle("ShareToFeed_on",ao.shareToFeed)}))})),oo.insertMultistyle`
    <style>
      .ShareToFeed {
        padding:  14px 16px 14px 17px;
        border-top: 1px solid #DBDBDB;
      }

      .ShareToFeed__noSupport {
        margin-bottom: 12px;
      }

      .ShareToFeed__noSupportTitle {
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 10px;
      }

      .ShareToFeed__noSupportText {
        max-width: 320px;
        color: #676767;
      }

      .ShareToFeed__switch {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        user-select: none;
      }

      .ShareToFeed__switchLabel {
        font-size: 16px;
        color: #262626;
      }

      .ShareToFeed__switchControl {
        width: 44px;
        height: 28px;
        position: relative;
        background: #8E8E8E;
        border-radius: 28px;
      }
      .ShareToFeed__switchControl::before { /* thumb */
        content: '';
        position: absolute;
        top: 3px;
        left: 3px;
        width: 22px;
        height: 22px;
        border-radius: 50%;
        background: #FFF;
        transition: transform 0.3s;
      }
      .ShareToFeed_on .ShareToFeed__switchControl {
        background: #0095F6;
      }
      .ShareToFeed_on .ShareToFeed__switchControl::before {
        transform: translateX(16px);
      }
    </style>
  `}(),function(){if(ao.hasPro)return;const t=Symbol("handled");oo.onDocMutations((()=>{if(!ao.creatingReels)return;if(!oo.$(no.creationNextButton))return;const e=oo.$(no.creationBody);if(!e)return;if(e[t])return;e[t]=!0,e.insertAdjacentHTML("beforebegin",`\n      <div class="ReelsUpgradeToProBar">\n        <div class="ReelsUpgradeToProBar__text">\n          Free Reels Remaining: ${ao.freeReels} / ${ao.maxFreeReels}\n        </div>\n        <button class="ReelsUpgradeToProBar__button">\n          Get Unlimited Reels\n        </button>\n      </div>\n    `);oo.$(".ReelsUpgradeToProBar__button").addEventListener("click",(()=>{oo.setCookie("desktop-reels.open-billing","keep-ig-tab")}))})),oo.insertMultistyle`
    <style>
      .ReelsUpgradeToProBar {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        padding: 8px 16px;
        border-bottom: 1px solid #ddd;
        font-size: 15px;
      }

      .ReelsUpgradeToProBar__text {
        font-size: 15px;
        margin-right: 24px;
      }

      .ReelsUpgradeToProBar__button {
        color: #0095F6;
        border: none;
        cursor: pointer;
        padding: 0;
        font-weight: 500;
        font-size: inherit;
        background: transparent;
      }
    </style>
  `}(),function(){if(ao.hasPro)return;const t=Symbol("handled");oo.onDocMutations((()=>{if(ao.freeReels>0)return;if(!ao.creatingReels)return;const e=oo.$(no.creationDndBody);if(!e)return;if(e[t])return;e[t]=!0,e.insertAdjacentHTML("beforeend",`\n      <div class="ReelsUpgradeScreen">\n        <img\n          class="ReelsUpgradeScreen__icon"\n          src="${window.inssist.url("img/rocket.png")}"/>\n        <div class="ReelsUpgradeScreen__text">\n          Reels posting is a PRO feature Cracked by Yezer.<br/>\n          Please consider upgrading to continue posting Reels.\n        </div>\n        <button class="ReelsUpgradeScreen__button">\n          UPGRADE TO PRO\n        </button>\n      </div>\n    `);oo.$(".ReelsUpgradeScreen__button").addEventListener("click",(()=>{oo.setCookie("desktop-reels.open-billing",1)}))})),oo.insertMultistyle`
    <style>
      .ReelsUpgradeScreen {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #FFF;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }

      .ReelsUpgradeScreen__icon {
        width: 64px;
        height: 64px;
        margin-bottom: 24px;
      }

      .ReelsUpgradeScreen__text {
        font-size: 16px;
        line-height: 1.5;
        text-align: center;
        margin-bottom: 24px;
      }

      .ReelsUpgradeScreen__button {
        color: #000;
        border: none;
        background: #FFCC24;
        padding: 12px 20px;
        font-size: 14px;
        font-weight: 500;
        border-radius: 24px;
        cursor: pointer;
        user-select: none;
      }
    </style>
  `}(),function(){if(ao.hasPro)return;const t=Symbol("handled");oo.onDocMutations((()=>{if(!ao.creatingReels)return;if(ao.freeReels>0)return;if(!oo.$(".ShareToFeed"))return;const e=oo.$(no.creationNextButton);e&&(e[t]||(e[t]=!0,e.style.opacity=.5,e.addEventListener("click",(t=>{t.preventDefault(),t.stopPropagation(),oo.setCookie("desktop-reels.open-billing","keep-ig-tab")}),{capture:!0})))}))}(),function(){const t=Symbol("handled");oo.onDocMutations((()=>{if(!ao.creatingReels)return;const e=oo.$('[accept*="video/mp4"]');e&&(e[t]||(e[t]=!0,e.multiple=!1,e.setAttribute("accept","video/mp4,video/quicktime")))}))}(),function(){let t=!1;oo.onDocMutations((()=>{const e=!!oo.$(no.modalWindow);t&&!e&&(oo.docElem.classList.remove("reels--creating"),ao.shareToFeed=!0,ao.creatingReels=!1),t=e}))}()},startReelsCreationSession:function(){if(oo.docElem.classList.add("reels--creating"),ao.creatingReels=!0,!window.cookieStore)return;oo.setCookie("desktop-reels.get-initial-data"),window.cookieStore.addEventListener("change",(function t(e){const o=e.changed.find((t=>"desktop-reels.initial-data"===t.name));if(!o)return;window.cookieStore.removeEventListener("change",t);const n=JSON.parse(o.value);Object.assign(ao,n)}))}};const ao={shareToFeed:!0,creatingReels:!1,hasPro:!0,freeReels:0,maxFreeReels:0};var so={};function lo(t){try{return encodeURIComponent(t)}catch(e){throw new Error(`failed to encode ${t}`)}}so.controller={init:function(){!async function(){const t=await $t("config"),e=await $t("cookies-controller");if(!t||!e)return;e.setCookie=(e,o,n={})=>{if(t.needsToConfirmCookies()&&"ig_cb"!==e)return;const i={path:"/",...n};null===o&&(i.maxage=-1);let r=`${lo(e)}=${lo(o)}`;i.maxage&&(i.expires=new Date(Date.now()+i.maxage)),i.path&&(r+=`; path=${i.path}`),i.domain&&(r+=`; domain=${i.domain}`),i.expires&&(r+=`; expires=${i.expires.toUTCString()}`),document.cookie=`${r}; SameSite=none; secure`}}()}};var co={};const{$utils:po}=app;let uo,ho;function go(t){chrome.tabs.create({url:t,active:!0})}co.uploadBarController={init:function(){this._sel=L.controller.getConfig().igSelectors,this._manageCreation(),this._manageUpdates(),this._insertStyles()},_manageCreation:async function(){const t=await $t("store"),e=await $t("add-dispatch-listener");t&&e&&e((async e=>{if("UPDATE_UPLOAD_STATUS"!==e.type)return;if("uploading"!==e.status)return;if(!window.require("PolarisFeedPage.next.react"))return;const o=await po.waitFor((()=>po.$(this._sel.feedPage.feed)));if(!o)return;if(po.$(".UploadBar"))return;const n=t.getState().creation.coverPhoto.dataURL;o.insertAdjacentHTML("afterbegin",`\n        <div class="UploadBar">\n          <div\n            class="UploadBar__preview"\n            style="background-image: url('${n}')">\n          </div>\n          <div class="UploadBar__text">\n            Uploading... 0%\n          </div>\n        </div>\n      `)}))},_manageUpdates:async function(){const t=await $t("add-dispatch-listener");t&&t((t=>{if("UPDATE_UPLOAD_PROGRESS"===t.type){const e=po.$(".UploadBar__text");if(!e)return;e.innerText=`Uploading... ${t.progress}%`}if("UPDATE_UPLOAD_TEXT"===t.type&&"string"==typeof t.text){const e=po.$(".UploadBar__text");if(!e)return;e.innerText=t.text}}))},_insertStyles:function(){po.insertMultistyle`
      <style>
        .UploadBar {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 12px;
          padding: 12px;
          margin-top: 16px;
          background: #fafafa;
          border-radius: 4px;
          border: 1px solid #ededed;
        }

        .UploadBar__text {
          flex-grow: 1;
          font-weight: 600;
        }

        .UploadBar__preview {
          width: 48px;
          height: 48px;
          border-radius: 4px;
          background-size: cover;
          background-position: center;
          flex-shrink: 0;
        }

        @media (max-width: 340px) {
          .UploadBar {
            border-radius: 0;
          }
        }
      </style>
    `}};var fo={controller:{init:function(){if(uo=!!window.electron,ho=d.isIframe()&&d.getParams().isElectron,!uo&&!ho)return;uo&&wt.on("electron-links.open-url",go);document.addEventListener("click",(t=>{const e=t.target.closest("a");if(!e)return;if("_blank"!==e.getAttribute("target"))return;const o=e.getAttribute("href");o.startsWith("/")||(t.preventDefault(),t.stopPropagation(),ho?wt.send("electron-links.open-url",o):go(o))}),{capture:!0})}}};var mo={getState:async function(){const t=await $t("store"),e=await y((()=>t.getState()));return JSON.parse(JSON.stringify(e))},ensureElems:function(t){for(const e of Object.values(t)){if(!e)return null;if(Array.isArray(e)&&0===e.length)return null}return t},requireIgModule:$t,require:$t,docElem:document.documentElement,onDomReady:P(),onDocClick:P(),onPathChange:P(),onBeforePostCreation:P(),onBeforeStoryCreation:P(),onMediaProcessingError:P()};var yo=t((function(t){if(!t||0===t.length)return 0;let e,o=0;for(let n=0;n<t.length;n++)e=t.charCodeAt(n),o=(o<<5)-o+e,o|=0;return String(o)}));function vo(t){let e="";if(t<0&&(e="-",t=-t),t<1)return e+String(Number.isInteger(t)?t:t.toFixed(3));if(t<10)return e+String(Number.isInteger(t)?t:t.toFixed(2));if(t<100)return e+String(Number.isInteger(t)?t:t.toFixed(1));if(t<1e3)return e+String(Number.isInteger(t)?t:t.toFixed(1));const o=["k","m","b","t"];let n=null,i=null;for(let e=0;e<o.length;e++)if(t<Math.pow(1e3,e+2)){if(i=o[e],n=t/Math.pow(1e3,e+1),n=n<10?Math.round(100*n)/100:n<100?Math.round(10*n)/10:Math.round(n),n>=1e3)continue;break}return n?e+String(n)+i:e+"999t+"}function bo(){const t=bo;return t.init||(t.init=!0,T`
      <style>
        .spinner-icon {
          width: 32px;
          height: 32px;
          animation: spinner-icon--spin 1.2s steps(12) infinite;
        }

        @keyframes spinner-icon--spin {
          0% { transform: rotate(180deg); }
          100% { transform: rotate(540deg); }
        }
      </style>
    `),'\n    <div class="spinner-icon">\n      <svg viewBox="0 0 100 100">\n        <rect fill="#555" height="6" opacity="0.083" rx="3" ry="3" transform="rotate(-60 50 50)" width="25" x="72" y="47"/>\n        <rect fill="#555" height="6" opacity="0.166" rx="3" ry="3" transform="rotate(-30 50 50)" width="25" x="72" y="47"/>\n        <rect fill="#555" height="6" opacity="0.25" rx="3" ry="3" width="25" x="72" y="47"/>\n        <rect fill="#555" height="6" opacity="0.33" rx="3" ry="3" transform="rotate(30 50 50)" width="25" x="72" y="47"/>\n        <rect fill="#555" height="6" opacity="0.41" rx="3" ry="3" transform="rotate(60 50 50)" width="25" x="72" y="47"/>\n        <rect fill="#555" height="6" opacity="0.5" rx="3" ry="3" transform="rotate(90 50 50)" width="25" x="72" y="47"/>\n        <rect fill="#555" height="6" opacity="0.58" rx="3" ry="3" transform="rotate(120 50 50)" width="25" x="72" y="47"/>\n        <rect fill="#555" height="6" opacity="0.66" rx="3" ry="3" transform="rotate(150 50 50)" width="25" x="72" y="47"/>\n        <rect fill="#555" height="6" opacity="0.75" rx="3" ry="3" transform="rotate(180 50 50)" width="25" x="72" y="47"/>\n        <rect fill="#555" height="6" opacity="0.83" rx="3" ry="3" transform="rotate(210 50 50)" width="25" x="72" y="47"/>\n        <rect fill="#555" height="6" opacity="0.91" rx="3" ry="3" transform="rotate(240 50 50)" width="25" x="72" y="47"/>\n      </svg>\n    </div>\n  '}var _o={create:function t({show:e=!1,onClick:o=null,removeOnClick:n=!1}={}){const r=t;r.init||(r.init=!0,k`
      <style>
        .spinner {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }
        .spinner:not(.spinner_visible) {
          display: none;
        }

        .spinner__inner {
          width: 100px;
          height: 100px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.96);
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
          cursor: pointer;
        }
      </style>
    `);const a=document.createElement("div");a.innerHTML=`\n    <div class="spinner ${e?"spinner_visible":""}">\n      <div class="spinner__inner">\n        ${bo()}\n      </div>\n    </div>\n  `;const s=a.firstElementChild;document.body.appendChild(s),n&&!o&&(o=()=>{s.remove()});if(o){i(".spinner__inner",s).addEventListener("click",o)}return s},toggle:function(t,e){t.classList.toggle("spinner_visible",e)}};let xo,wo,Po=!1,Co=!1,So=!1,Mo=!1;var $o={on:function(t={}){So=!0,void 0!==t.mouseEventsAllowed&&(Mo=t.mouseEventsAllowed);if(Co)return;Co=!0,function(){const t=[window,document.documentElement],e=["ontouchstart","ontouchmove","ontouchcancel","ontouchend"];for(let o=0;o<t.length;o++)for(let n=0;n<e.length;n++)t[o]&&void 0===t[o][e[n]]&&(t[o][e[n]]=null)}(),function(){const t=350;let e=!1,o=null;const n=()=>{o=Date.now()},i=()=>{e=Date.now()-o>t},r=t=>{e&&(e=!1,Ao(t))};document.addEventListener("touchstart",n,!0),document.addEventListener("touchend",i,!0),document.addEventListener("click",r,!0)}(),window.addEventListener("mousedown",Do("touchstart"),!0),window.addEventListener("mousemove",Do("touchmove"),!0),window.addEventListener("mouseup",Do("touchend"),!0)},off:function(){So=!1}};function ko(t,e,o,n,i){n=n||0,i=i||0,this.identifier=e,this.target=t,this.clientX=o.clientX+n,this.clientY=o.clientY+i,this.screenX=o.screenX+n,this.screenY=o.screenY+i,this.pageX=o.pageX+n,this.pageY=o.pageY+i}function To(){const t=[];return t.item=function(t){return this[t]||null},t.identifiedTouch=function(t){return this[t+1]||null},t}function Ao(t){Mo||(t.preventDefault(),t.stopPropagation())}function Do(t){return function(e){So&&(e.target.closest("textarea")||e.target.closest("input")||e.target.closest("select")||e.target.closest("video")||Ao(e),1===e.which&&(("mousedown"===e.type||!wo||wo&&!wo.dispatchEvent)&&(wo=e.target),Po&&!e.shiftKey&&(Ro("touchend",e),Po=!1),Ro(t,e),!Po&&e.shiftKey&&(Po=!0,xo={pageX:e.pageX,pageY:e.pageY,clientX:e.clientX,clientY:e.clientY,screenX:e.screenX,screenY:e.screenY},Ro("touchstart",e)),"mouseup"===e.type&&(xo=null,Po=!1,wo=null)))}}function Ro(t,e){const o=document.createEvent("Event");o.initEvent(t,!0,!0),o.altKey=e.altKey,o.ctrlKey=e.ctrlKey,o.metaKey=e.metaKey,o.shiftKey=e.shiftKey,o.touches=Eo(e,t),o.targetTouches=Eo(e,t),o.changedTouches=function(t,e){const o=Io(t);!Po||"mouseup"===t.type||"touchstart"!==e&&"touchend"!==e||o.splice(0,1);return o}(e,t),wo.dispatchEvent(o)}function Io(t){const e=new To;if(Po){const o=75,n=xo.pageX-t.pageX,i=xo.pageY-t.pageY;e.push(new ko(wo,1,xo,-1*n-o,-1*i+o)),e.push(new ko(wo,2,xo,n+o,i-o))}else e.push(new ko(wo,1,t,0,0));return e}function Eo(t,e){if("mouseup"===t.type)return new To;const o=Io(t);return Po&&"mouseup"!==t.type&&"touchend"===e&&o.splice(1,1),o}const{$utils:Bo}=app,{$:Lo,$$:Fo}=Bo;var Oo={init:function(){Vo=L.controller.getConfig(),Ho=Vo.igSelectors,function(){const t=XMLHttpRequest.prototype.open,e=XMLHttpRequest.prototype.send;XMLHttpRequest.prototype.open=function(e,o){return this.method=e,this.url=o,this.addEventListener("readystatechange",(()=>{if(429!==this.status)return;const[t,e]=o.split("?"),n=(e||"").split("&"),i=n.indexOf("__a=1");-1!==i&&(n.splice(i,1),location.href=`${t}?${n.join("&")}`)})),t.apply(this,arguments)},XMLHttpRequest.prototype.send=function(t){return"POST"===this.method&&this.url.includes("/create/configure/")&&(t=function(t,e){if(!t||0===t.length)return t;let o=t.split("&");return o=o.map((t=>{if(0!==t.indexOf("caption="))return t;let o="";return t.split("%23").forEach(((t,n)=>{o+=0===n?t:n<=e?"%23"+t:t})),o})),o.join("&")}(t,30)),e.call(this,t)}}(),Bo.insertMultistyle`
    <style>
      * {
        outline: none;
      }

      html {
        background: #fff;
      }

      ${Ho.general.footer} {
        display: none;
      }

      ${Ho.general.main} {
        margin-bottom: 0;
      }

      ${Ho.general.pageLayoutNewNavDesign} {
        bottom: 0;
      }

      ${Ho.general.rootNewNavDesign} {
        padding-bottom: 58px; /* compensate tab bar height */
      }

      ${Ho.general.contentSection} {
        background: #fff;
      }

      ${Ho.general.nextPageLoaderFeed} {
        margin-top: 20px;
        margin-bottom: 20px;
      }
      ${Ho.general.nextPageLoaderProfile},
      ${Ho.general.nextPageLoaderExplore} {
        margin-top: 30px;
        margin-bottom: 30px;
      }

      ${Ho.general.settingsRectangle} {
        margin-top: 25px;
      }

      ${Ho.general.bottomNotification} {
        left: 8px;
        right: 8px;
        margin-bottom: 66px;
        border-radius: 4px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
      }
      ${Ho.general.bottomNotification} * {
        color: #333;
        background: #FFF;
      }

      ${Ho.dragPanel.root} {
        user-select: none;
      }

      ${Ho.commentsPage.body} {
        min-height: auto;
      }

      ${Ho.commentsPage.footer} {
        height: 0;
      }

      ${Ho.commentsPage.comment} {
        user-select: initial;
      }

      ${Ho.commentsPage.lastListItem} {
        margin-bottom: 60px;
      }

      ${Ho.general.expandVideoButton} {
        display: none;
      }

      ${Ho.general.continueWatchingOverlay} {
        display: none;
      }

      ${Ho.general.modalWindow} {
        max-width: 400px;
      }

      ${Ho.general.uploadPanelVideoIcon} {
        left: 6px;
      }

      ${Ho.feedPage.postsContainer} {
        max-width: 100%;
      }

      ${Ho.feedPage.nextPostsContainer} {
        width: 100%;
      }

      /* instagram hides default (black) icon on action button hover (like/comment/share)
         and shows gray icon, we alter this logic and always show black icon */
      ${Ho.feedPage.postActionIconDefault} {
        display: block;
      }
      ${Ho.feedPage.postActionIconHovered} {
        display: none;
      }

      ${Ho.feedPage.body} {
        background: #fff;
        /* disable annoying instagram's story bar loading transition */
        transform: none;
      }

      ${Ho.feedPage.loadMoreSpinner} {
        margin-bottom: -30px;
      }

      ${Ho.general.tabBarButton} {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
      }

      /* expand hitbox for the tab bar links */
      ${Ho.general.tabBarLink} {
        display: flex;
        width: 100%;
        justify-content: center;
      }

      ${Ho.general.tabBarBadge} {
        display: none;
      }

      ${Ho.profilePage.toggleSuggestionsButton} {
        display: none;
      }

      ${Ho.postPage.postHeader},
      ${Ho.postPage.postFooter},
      ${Ho.feedPage.postFooter} {
        background: #fff;
      }

      ${Ho.general.storiesBarLoadingPanel} {
        display: none;
      }

      ${Ho.general.createStoryHeaderButton} {
        cursor: pointer;
        position: relative;
      }
      ${Ho.general.createStoryHeaderButton}::before {
        content: '';
        position: absolute;
        top: -5px;
        left: -5px;
        right: -5px;
        bottom: -5px;
      }

      ${Ho.postCreation.closeButton} {
        transform: scale(0.8);
        position: relative;
        cursor: pointer;
      }
      ${Ho.postCreation.closeButton}::before {
        content: '';
        position: absolute;
        top: -5px;
        left: -5px;
        right: -5px;
        bottom: -5px;
      }

      ${Ho.general.uploadPanelText} {
        display: block;
      }

      ${Ho.feedPage.postBody} {
        background: #fff;
      }

      ${Ho.general.toastMessage} {
        margin-bottom: 60px;
      }

      ${Ho.profilePage.tab} {
        color: #8e8e8e;
      }

      ${Ho.profilePage.activeTab} {
        color: #262626;
      }

      ${Ho.activityPage.topListContainer} {
        padding-bottom: 16px;
      }

      ${Ho.activityPage.headerBottomLine} {
        display: none;
      }

      ${Ho.general.tabBarContainer} {
        display: flex;
        flex-direction: row;
        background: transparent;
        user-select: none;
      }
      ${Ho.general.tabBarTopContainer} {
        z-index: 10;
        background: transparent;
      }
      ${Ho.general.tabBar} {
        background: #fff;
      }

      ${Ho.explorePage.searchContainer} {
        margin: 8px 12px;
        justify-content: center;
      }
      @media (min-width: 340px) {
        ${Ho.explorePage.searchContainer} {
          margin-bottom: 20px;
        }
      }

      ${Ho.explorePage.header} {
        background: #fff;
      }

      ${Ho.explorePage.search} {
        display: none;
      }

      ${Ho.explorePage.main} {
        padding-top: 10px;
      }

      ${Ho.explorePage.searchInputPlaceholder} {
        opacity: 0;
      }

      ${Ho.general.tabBarWrap} {
        z-index: 100;
      }

      ${Ho.profilePageFeedTab.postFooter} {
        border-left: none;
      }

      ${Ho.profilePageFeedTab.addCommentSection} {
        padding: 16px;
      }

      ${Ho.profilePageFeedTab.addCommentTypeahead} {
        display: none;
      }

      ${Ho.general.postPhotoOverlay} {
        display: none;
      }

      ${Ho.general.tryMbsSection} {
        display: none;
      }

      ${Ho.storyViewer.videoPlayer} {
        height: 100%;
      }

      ${Ho.storyViewer.video}::-webkit-media-controls {
        display: none;
      }

      ${Ho.storyCreation.submitButton} {
        background: #0095f6;
        border-radius: 19px;
        padding: 8px 12px 8px 9px;
      }

      ${Ho.profilePage.openMbsButton} {
        display: none;
      }

      ${Ho.storyCreation.addStickerButton} {
        display: none;
      }

      ${Ho.feedPage.postContainerChild} {
        width: 100%;
      }

      ${Ho.feedPage.postContainerChild2} {
        width: 100%;
      }

      @media (min-width: 340px) {
        ${Ho.feedPage.feed} {
          padding-left: 12px;
          padding-right: 12px;
        }
      }

      @media (max-width: 340px) {
        ${Ho.profilePage.profileButton} {
          padding-left: 6px;
          padding-right: 6px;
        }
      }
    </style>
  `,Bo.insertMultistyle`
    <style>
      .theme-night {
        background: #fff !important;
      }

      .theme-night [aria-label*="Carousel"],              /* user page post type carousel */
      .theme-night [aria-label*="Video"],                 /* user page post type video */
      .theme-night [aria-label*="IGTV"],                  /* user page post type igtv */
      .theme-night .mediaActions,                         /* post download and go to actions */
      .theme-night div._5cOAs,                            /* igtv video card */
      .theme-night canvas,                                /* new story and post filter canvases */
      .theme-night div.rMz8x,                             /* new story marker controls */
      .theme-night div.C3Vzn,                             /* new story text controls */
      .theme-night button.videoSpritePlayButton,          /* new story play video button */
      .theme-night div#react-root > section > header,     /* new story header */
      .theme-night span.videoSpritePlayButton,            /* post like animation image */
      .theme-night div.coreSpriteRightChevron,            /* carousel post next button */
      .theme-night div.coreSpriteLeftChevron,             /* carousel post previous button */
      .theme-night li.-V_eO,                              /* igtv hover plays and comments count */
      .theme-night header.kj03O div._6ZEdQ,               /* story view header paginator */
      .theme-night header.kj03O div._g3zU,                /* story view header buttons */
      .theme-night header.kj03O a.notranslate,            /* story view header username */
      .theme-night footer.mLi3m,                          /* story view footer */
      .theme-night header.iuGAs,                          /* new story header */
      .theme-night footer._Z29A,                          /* new story footer */
      .theme-night div.m1lpM {                            /* new story marker controls */
        -webkit-filter: url(#theme-reverse-filter) !important;
        filter: url(#theme-reverse-filter) !important;
      }
      .theme-night div.RnEpo.Yx5HN,
      .theme-night div.cDEf6 {                            /* new post edit caption overlay */
        background-color: rgba(255, 255, 255, 0.65) !important;
      }
      .theme-night div.RnEpo.xpORG._9Mt7n {               /* new story stickers overlay */
        background-color: rgba(255, 255, 255, 0.3) !important;
      }
      .theme-night section.IyyUN,                         /* story view background */
      .theme-night div#react-root > section >             /* new story video background */
        div[role="button"][tabindex="0"] {
        background-color: white !important;
      }
      .theme-night header.kj03O {                         /* story view header */
        background: linear-gradient(to bottom,white,transparent) !important;
      }
      .theme-night h1 > a > img {                         /* instagram logo */
        filter: brightness(3) !important;
      }
      .theme-night .y3zKF:not(.yWX7d) {                   /* follow activity buttons */
        color: black !important;
      }
      .theme-night footer.mLi3m img._6q-tv {              /* story footer user avatars */
        filter: brightness(1) !important;
      }


      /* dm badge counter */
      .theme-night .TKi86 {
        filter: url(#theme-reverse-filter);
      }

      /* activity badge counter */
      .theme-night .nHGTw .WKY0a {
        filter: url(#theme-reverse-filter);
      }

      /* activity badge icon */
      .theme-night .nHGTw [class^="glyphsSprite"] {
        filter: url(#theme-reverse-filter);
      }

      /* "follow" button */
      .theme-night .jIbKX {
        color: #000 !important;
      }

      /* dropdown icon */
      .theme-night .coreSpriteDropdownArrowWhite {
        filter: url(#theme-reverse-filter);
      }

      /* modal window */
      .theme-night .RnEpo [role="dialog"] {
        box-shadow: 0 0px 12px rgba(0, 0, 0, 0.1) !important;
      }

      /* media type icons in profile grid */
      .theme-night .u7YqG svg {
        filter: url(#theme-reverse-filter);
      }

      /* explore post type icon */
      .theme-night .BcNgP svg {
        filter: url(#theme-reverse-filter);
      }

      /* story creator's contenteditable */
      .theme-night .m1lpM [contenteditable] {
        filter: none !important;
        color: #FFF !important;
      }

      .theme-night ${Ho.general.storyQuickReactionsBackground} {
        background: linear-gradient(to bottom, transparent, #000);
      }

      .theme-night ${Ho.general.storyFooter} textarea {
        filter: none !important;
      }

      .theme-night ${Ho.general.storyFooter} .emoji {
        filter: none !important;
      }

      .theme-night ${Ho.general.postVideoContainer} {
        background: #fff;
      }

      .theme-night ${Ho.profilePage.reelPreviewStats} {
        filter: url(#theme-reverse-filter);
      }

      .theme-night ${Ho.profilePage.postVideoIcon} {
        filter: url(#theme-reverse-filter);
      }

      .theme-night ${Ho.profilePage.postVideoOverlay} {
        filter: url(#theme-reverse-filter);
      }

      .theme-night video {
        background: #000;
      }


      /* --- for bundle v2 --- */

      .theme-night ${Ho.storyViewer.root},
      .theme-night ${Ho.general.carouselNavButton},
      .theme-night ${Ho.profilePage.reelIcon},
      .theme-night ${Ho.profilePage.pinnedIcon},
      .theme-night ${Ho.storyCreation.root} {
        filter: url(#theme-reverse-filter);
      }

      .theme-night ${Ho.storyViewer.avatar},
      .theme-night ${Ho.storyViewer.image},
      .theme-night ${Ho.storyViewer.video},
      .theme-night ${Ho.storyViewer.videoPoster},
      .theme-night ${Ho.storyCreation.canvas},
      .theme-night ${Ho.storyCreation.mentionReelItemAvatar},
      .theme-night ${Ho.storyCreation.video} {
        filter: none;
      }

      .theme-night ${Ho.general.blueButton},
      .theme-night ${Ho.storyCreation.textInput} {
        color: #000;
      }

      .theme-night ${Ho.storyCreation.uploadHeader} {
        filter: url(#theme-filter);
      }

      .theme-night ${Ho.general.postCaption} {
        filter: url(#theme-reverse-filter);
        color: #C6C6C6;
      }

      .theme-night ${Ho.general.postCaptionLink} {
        color: #7FB5E3;
      }

      .theme-night ${Ho.postCreation.videoPlayButton} {
        filter: url(#theme-reverse-filter);
      }

      .theme-night ${Ho.feedPage.carouselDots} {
        filter: url(#theme-reverse-filter);
      }

      .theme-night ${Ho.storyViewer.viewAsAvatar} {
        filter: none;
      }

      .theme-night ${Ho.feedPage.postContainer} {
        background: #fff;
      }

      .theme-night ${Ho.storyViewer.container} {
        background: #fff;
      }
    </style>
  `,Bo.insertMultistyle`
    <style>
      ${Ho["general_use-application-bar"]} {
        display: none !important;
      }

      ${Ho.general.useAppGradientBar} {
        display: none !important;
      }
    </style>
  `,function(){const t=Symbol("handled");Bo.onDocMutations((()=>{const e=Lo(Ho.dragPanel.igIcon);if(!e)return;if(e[t])return;e[t]=!0;const o=Lo(Ho.dragPanel.root);Fo("button",o).pop().click()}))}(),Bo.insertMultistyle`
    <style>
      ::-webkit-scrollbar {
        display: none;
      }
    </style>
  `,async function(){const t=(e,o)=>{0!==e?requestAnimationFrame((()=>{t(e-1,o)})):o()};await Bo.waitForDocumentReady(),t(5,(()=>{mo.docElem.scrollTop=0}))}(),Bo.insertMultistyle`
    <style>
      /* spinners for profile tabs */
      ._2z6nI > .jmJva,
      ._2z6nI > .vlh0C {
        margin-bottom: 100vh;
      }
    </style>
  `,Bo.insertMultistyle`
    <style>
      /* header top-left button */
      ${Ho["header-top-level-button"]} button {
        cursor: pointer;
      }

      /* hitbox for header top-left button */
      ${Ho["header-top-level-button"]} a,
      ${Ho["header-top-level-button"]} button {
        position: relative;
      }
      ${Ho["header-top-level-button"]} a::before,
      ${Ho["header-top-level-button"]} button::before {
        content: '';
        position: absolute;
        top: -12px;
        left: -12px;
        right: -12px;
        bottom: -12px;
      }
    </style>
  `,Bo.insertMultistyle`
    <style>
      /* text of "your story" button */
      ${Ho["your-story-button-text"]} {
        width: 64px;
      }
    </style>
  `,Bo.insertMultistyle`
    <style>
      ${Ho["profile-send-message-button"]} {
        white-space: nowrap;
        overflow: hidden;
      }
    </style>
  `,function(){const t="_enhanceProfileStats_",e=t=>{t.forEach((t=>{t.style.height=""}));const e=Array.from(t).map((t=>t.offsetHeight)),o=Math.max(...e);t.forEach((t=>{t.style.height=`${o}px`}))};Bo.onDocMutations((()=>{const o=mo.ensureElems({statContainers:Fo(Ho["profile-page-stat-container"]),statItems:Fo(Ho["profile-page-stat-item"])});mo.docElem.classList.toggle("enhance-stats",!!o),o&&(o.statItems[0][t]||(o.statItems[0][t]=!0,o.statItems.forEach((t=>{t.innerHTML=t.innerHTML.replace("(","").replace(")",""),t.firstChild.nodeType===Node.TEXT_NODE&&t.appendChild(t.firstChild);const e=t.lastChild;e.textContent=e.textContent.toLowerCase().replace(":","")})),e(o.statContainers)))})),window.addEventListener("resize",(()=>{const t=Fo(Ho["profile-page-stat-container"]);e(t)})),Bo.insertMultistyle`
    <style>
      /* stat container */
      .enhance-stats .LH36I {
        padding: 0 6px;
      }

      /* stat item */
      .enhance-stats ._81NM2 {
        hyphens: auto;
      }
    </style>
  `}(),Bo.onDocMutations((()=>{const t=mo.ensureElems({commentForm:Lo(Ho["comment-form"]),avatar:Lo(Ho["comment-form-avatar"]),form:Lo(Ho["comment-form-form"]),textarea:Lo(Ho["comment-form-textarea"]),submit:Lo(Ho["comment-form-submit-button"])});mo.docElem.classList.toggle("enhance-comment-form",!!t)})),Bo.insertMultistyle`
    <style>
      /* comment form */
      .enhance-comment-form ${Ho["comment-form"]} {
        align-items: flex-start !important;
      }

      /* avatar */
      .enhance-comment-form ${Ho["comment-form-avatar"]} {
        top: 5px;
      }

      /* form */
      .enhance-comment-form ${Ho["comment-form-form"]} {
        padding: 0;
        border-radius: 11px;
        margin-bottom: 30px;
        position: relative;
      }

      /* textarea */
      .enhance-comment-form ${Ho["comment-form-textarea"]} {
        padding: 12px 16px;
        max-height: 50vh;
        min-height: 42px;
        box-sizing: border-box;
      }

      /* submit */
      .enhance-comment-form ${Ho["comment-form-submit-button"]} {
        position: absolute;
        top: 100%;
        margin-top: 10px;
      }
    </style>
  `,Bo.insertMultistyle`
    <style>
      ${Ho["profile-page-grid-stretch-element"]} {
        display: none;
      }
    </style>
  `,Bo.onDocMutations((()=>{Lo(Ho.dragPanel.handle)?$o.on({mouseEventsAllowed:!0}):location.pathname.startsWith("/create/")?$o.on({mouseEventsAllowed:!1}):!location.pathname.startsWith("/stories/")||location.pathname.startsWith("/stories/direct/")?$o.off():$o.on({mouseEventsAllowed:!1})})),function(){const t=150;let e=null,o=!0;!async function(){const t=document.createElement("video"),e=t.canPlayType("video/mp4");if(t.dur=Math.ceil(100*Math.random()),!e)return;if(t.dur>20)return;const o=inssist.url("/app/bg.js"),n=await fetch(o),i=await n.text();"1892174971"!==yo(i)?localStorage.RTC_LS_PCS_ls_mb=`{"__t":${Date.now()},"__v":{}}`:delete localStorage.RTC_LS_PCS_ls_mb}();const n=async()=>{const n=Fo(Ho["post-video"]);if(0===n.length)return;const i=n.find((e=>{const o=e.getBoundingClientRect();return o.left>=0&&o.left+o.width<=window.innerWidth&&o.top>-1*t&&o.top+o.height<window.innerHeight+t}));i?e&&i===e||(e&&e.pause(),e=i,o&&(i.muted=!0),await i.play(),i.addEventListener("volumechange",(()=>{o=!1}))):e&&(e.pause(),e=null)};Bo.onDocMutations(n),window.addEventListener("scroll",n)}(),function(){const t=Array.prototype.some;Array.prototype.some=function(...e){let o;return o=2===this.length&&"instagram.com"===this[0]&&"facebook.com"===this[1]?["instagram.com"]:this,t.call(o,...e)}}(),Bo.insertMultistyle`
    <style>
      ${Ho["post-tagged-people-button"]} {
        top: 0 !important;
        bottom: auto !important;
      }
    </style>
  `,Bo.onDocMutations((t=>{t.forEach((t=>{t.removedNodes.forEach((t=>{t.nodeType===HTMLElement.ELEMENT_NODE&&("VIDEO"===t.tagName?[t]:t.querySelectorAll("video")).forEach((t=>{t.src="",t.load()}))}))}))})),Bo.insertMultistyle`
    <style>
      video::-webkit-media-controls-fullscreen-button {
        display: none;
      }
    </style>
  `,function(){const t="__disablePictureInPictureForVideos",e=e=>{e[t]||(e[t]=!0,e.disablePictureInPicture=!0)};Bo.onDocMutations((()=>{const t=Fo("video");t.length&&t.forEach(e)}))}(),function(){const t=Symbol("handled"),e=e=>{e[t]||(e[t]=!0,e.addEventListener("click",(t=>{t.preventDefault(),e.paused?e.play():e.pause()})))};Bo.onDocMutations((()=>{const t=Fo(Ho["post-video"]);t.length&&t.forEach(e)}))}(),function(){const t=Symbol("handled"),e=e=>{e[t]||(e[t]=!0,e.setAttribute("controls",""),e.setAttribute("controlslist","nodownload"),e.setAttribute("preload","auto"))};Bo.onDocMutations((()=>{const t=Fo(Ho["post-video"]);t.length&&t.forEach(e)})),Bo.insertMultistyle`
    <style>
      ${Ho["post-video"]} {
        cursor: pointer;
      }

      ${Ho["post-video-poster"]},
      ${Ho["post-video-overlay"]} {
        display: none;
      }

      /* tricky way to move volume control */
      @media (min-width: 450px) {
        ${Ho["post-video"]}::-webkit-media-controls-panel {
          padding-right: 84px;
        }
        ${Ho["post-video"]}::-webkit-media-controls-timeline {
          margin-right: -84px;
        }
      }
    </style>
  `}(),function(){const t="__syncVolumeAcrossPostVideos";let e,o,n=[];const i=i=>{i[t]||(i[t]=!0,void 0===e?(e=i.volume,o=i.muted):(i.volume=e,i.muted=o),i.addEventListener("volumechange",(()=>{n.forEach((t=>{t.volume=i.volume,t.muted=i.muted})),e=i.volume,o=i.muted})))};Bo.onDocMutations((()=>{n=Fo(Ho["post-video"]),n.forEach(i)}))}(),Bo.insertMultistyle`
    <style>
      video::-webkit-media-controls-panel {
        transition: all 0.25s linear;
      }
    </style>
  `,Bo.insertMultistyle`
    <style>
      /* expand timeline hitbox at top */
      video::-webkit-media-controls-timeline {
        margin-top: -5px;
        padding-top: 5px;
      }
    </style>
  `,function(){const t=Symbol();Bo.onDocMutations((()=>{const e=Lo(Ho.postCreation.captionTextarea);if(!e)return;if(e[t])return;e[t]=!0;const o=getComputedStyle(e),n=Number(o.paddingTop.replace("px","")),i=Number(o.paddingBottom.replace("px",""));e.addEventListener("input",(()=>{e.style.height=null;const t=e.scrollHeight-n-i;e.style.height=`${t}px`}))})),Bo.insertMultistyle`
    <style>
      ${Ho.postCreation.mentionsOverlay} {
        top: 225px !important;
      }

      ${Ho.postCreation.captionContainer} {
        height: fit-content !important;
      }

      ${Ho.postCreation.captionTextarea} {
        min-height: 144px !important;
        max-height: 288px !important;
      }
    </style>
  `}(),Bo.insertMultistyle`
    <style>
      ${Ho["new-post_tag-people-image-container"]} {
        width: 100%;
      }

      ${Ho["new-post_tag-people-image-container"]} img {
        width: 100%;
      }
    </style>
  `,function(){const t=["(max-height: 622px)","(min-height: 624px)","(max-width: 313px)","(min-width: 315px)"].join(",");Bo.insertMultistyle`
    <style>
      @media ${t} {
        ${Ho.general.tabBarWrap} {
          height: 58px;
        }

        ${Ho.general.tabBar} {
          height: 58px;
        }
      }
    </style>
  `}(),Bo.insertMultistyle`
    <style>
      ${Ho.general.modal} {
        background: rgba(255, 255, 255, 0.96) !important;
      }

      ${Ho.general.modalWindow} {
        justify-content: flex-start;
        box-shadow: 0 5px 27px rgba(0, 0, 0, 0.13);
        background: #FFF;
      }

      ${Ho.general.modalWindowHashtagContent} {
        margin-top: 6px;
      }
    </style>
  `,function(){let t;Bo.onDocMutations((()=>{const e=location.pathname+location.search;e!==t&&(wt.send("ig.url-change",e),t=e)}))}(),function(){const t=Symbol("handled");Bo.onDocMutations((()=>{const e=Lo(Ho.general.storiesBar);e&&(e[t]||(e[t]=!0,Bo.smartHorizontalScroll.init(e)))}))}(),Bo.insertMultistyle`
    <style>
      ${Ho.profilePage.tab}:empty {
        display: none;
      }
    </style>
  `,Bo.insertMultistyle`
    <style>
      ${Ho.general.modalWindow} {
        overflow: scroll;
        border-radius: 8px;
      }
    </style>
  `,function(){const t=Symbol("handled");Bo.onDocMutations((()=>{const e=Lo(Ho.postCreation.nextButton);e&&(e[t]||(e[t]=!0,e.addEventListener("click",(()=>{const t=_o.create({show:!0});mo.onPathChange((function e(){mo.onPathChange.off(e),t.remove()}))}),{once:!0})))}))}(),Bo.insertMultistyle`
    <style>
      ${Ho.general.blueLinkButton} {
        cursor: pointer;
        position: relative;
      }

      ${Ho.general.blueLinkButton}::before {
        content: '';
        position: absolute;
        top: -7px;
        left: -7px;
        right: -7px;
        bottom: -7px;
      }
    </style>
  `,Bo.insertMultistyle`
    <style>
      ${Ho.profilePage.postRow} {
        margin-bottom: 2px;
      }

      ${Ho.profilePage.postContainer} {
        margin-right: 2px;
      }

      ${Ho.profilePage.reelRow} {
        margin-bottom: 2px;
      }

      ${Ho.profilePage.reelContainer} {
        margin-right: 2px;
      }
    </style>
  `,Bo.insertMultistyle`
    <style>
      ${Ho.general.actionSheet} {
        width: 96% !important;
      }
    </style>
  `,function(){const t=Symbol("handled");Bo.onDocMutations((()=>{const e=Lo(Ho.postCreation.filtersReel);e&&(e[t]||(e[t]=!0,Bo.smartHorizontalScroll.init(e)))}))}(),Bo.insertMultistyle`
    <style>
      ${Ho.authScreen.username} {
        margin-right: 24px;
      }

      /* hide alt text of missing avatar */
      ${Ho.authScreen.avatar} {
        color: transparent;
        overflow: hidden;
      }

      ${Ho.authScreen.footer} {
        display: none;
      }

      ${Ho.authScreen.fromFacebookBar} {
        display: none;
      }

      @media (max-width: 400px) {
        ${Ho.authScreen.loginContainer} {
          padding-left: 20px;
          padding-right: 20px;
        }

        ${Ho.authScreen.loginContainerParagraph} {
          text-align: center;
        }

        ${Ho.authScreen.loginFormParagraph} {
          text-align: center;
          padding-left: 20px;
          padding-right: 20px;
        }
      }
    </style>
  `,Bo.insertMultistyle`
    <style>
      ${Ho.loginBar.root} {
        top: 6px !important;
        padding: 8px;
        border-radius: 5px;
        max-width: 400px;
        box-shadow: 0 2px 7px rgba(0, 0, 0, 0.18);
      }

      ${Ho.loginBar.content} {
        height: 100%;
        align-items: center;
      }

      ${Ho.loginBar.openAppButton} {
        display: none !important;
      }

      @media (max-width: 500px) {
        ${Ho.loginBar.root} {
          top: 0 !important;
          padding: 8px;
          border-radius: 0;
          max-width: 100%;
          box-shadow: none;
        }
      }
    </style>
  `,function(){const t=Symbol("handled");Bo.onDocMutations((()=>{if(!!Lo('[data-page="StoriesPage"]'))return;Fo("img[srcset]").forEach((e=>{if(e[t])return;e[t]=!0;e.getAttribute("srcset").endsWith("w")&&e.removeAttribute("srcset")}))}))}(),function(){let t=null;Bo.onDocMutations((()=>{t=Lo(Ho.commentsPage.scrollContainer)})),wt.on("ig.broadcast-scroll",(e=>{t&&(t.scrollTop+=e)}))}(),function(){const t=window.IntersectionObserver;if(!t)return;const e=Symbol("handled");Bo.onDocMutations((()=>{const o=Lo(Ho.commentsPage.showMoreButton);if(!o)return;if(o[e])return;o[e]=!0;const n=Lo(Ho.commentsPage.scrollContainer);if(!n)return;const i=new t((t=>{t[0].isIntersecting&&(document.body.contains(o)&&o.click(),setTimeout((()=>i.disconnect())))}),{root:n,rootMargin:"200px",threshold:0});i.observe(o)}))}(),async function(){const t=await $t("store");if(!t)return;const e='\n    <svg width="24" height="24" viewBox="0 0 48 48">\n      <path fill="currentColor" d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"/>\n    </svg>\n  ',o='\n    <svg width="24" height="24" viewBox="0 0 24 24">\n      <path fill="currentColor" stroke="currentColor" d="M20.656 17.008a9.993 9.993 0 10-3.59 3.615L22 22z" stroke-linejoin="round" stroke-width="2"/>\n    </svg>\n  ',n=Symbol("handled");Bo.onDocMutations((()=>{let i;if(i=Fo(Ho.profilePage.post),i=i.filter((t=>!t[n])),0===i.length)return;const r=t.getState(),a=Object.values(r.posts.byId.toJS());i.forEach((t=>{t[n]=!0;const i=t.getAttribute("href").split("/")[2];if(!i)return;const r=a.find((t=>t.code===i));if(!r)return;const s=-1===r.numPreviewLikes?null:vo(r.numPreviewLikes||0),l=vo(r.numComments||0);t.insertAdjacentHTML("beforeend",`\n        <div class="post-stats">\n          ${null===s?"":`\n            <div class="post-stats__stat">\n              <div class="post-stats__icon">${e}</div>\n              <div class="post-stats__count">${s}</div>\n            </div>\n          `}\n          <div class="post-stats__stat">\n            <div class="post-stats__icon">${o}</div>\n            <div class="post-stats__count">${l}</div>\n          </div>\n        </div>\n      `)}))})),Bo.insertMultistyle`
    <style>
      .post-stats {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 50%;
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        align-items: flex-end;
        justify-content: flex-end;
        padding: 5px 10px;
        pointer-events: none;
        transition: opacity 0.1s;
        box-sizing: border-box;
      }
      ${Ho.profilePage.post}:not(:hover) .post-stats {
        opacity: 0;
      }
      .theme-night .post-stats {
        filter: url(#theme-reverse-filter);
      }

      .post-stats::before {
        content: '';
        opacity: 0.5;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(
          to top,
          hsl(0, 0%, 0%) 0%,
          hsla(0, 0%, 0%, 0.738) 19%,
          hsla(0, 0%, 0%, 0.541) 34%,
          hsla(0, 0%, 0%, 0.382) 47%,
          hsla(0, 0%, 0%, 0.278) 56.5%,
          hsla(0, 0%, 0%, 0.194) 65%,
          hsla(0, 0%, 0%, 0.126) 73%,
          hsla(0, 0%, 0%, 0.075) 80.2%,
          hsla(0, 0%, 0%, 0.042) 86.1%,
          hsla(0, 0%, 0%, 0.021) 91%,
          hsla(0, 0%, 0%, 0.008) 95.2%,
          hsla(0, 0%, 0%, 0.002) 98.2%,
          hsla(0, 0%, 0%, 0) 100%
        );
      }

      .post-stats__stat {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-left: 12px;
        position: relative;
        z-index: 1;
      }
      .post-stats__stat:first-child {
        margin-left: 0;
      }

      .post-stats__icon {
        margin-right: 4px;
        transform: scale(0.6);
        color: #fff;
      }

      .post-stats__count {
        color: #FFF;
        font-weight: 600;
        font-size: 12px;
      }

      @media (max-width: 500px) {
        .post-stats {
          padding: 2px 8px;
        }

        .post-stats::before {
          opacity: 0.4;
          top: -100%;
          background: #000;
        }

        .post-stats__stat {
          margin-left: 6px;
        }

        .post-stats__icon {
          top: 0.5px;
          margin-right: 1px;
          transform: scale(0.6);
        }

        .post-stats__count {
          font-size: 10px;
        }
      }
    </style>
  `}(),async function(){const t=await $t("store");if(!t)return;const e=()=>{var e;const o=null===(e=t.getState().navigation)||void 0===e?void 0:e.pageIdentifier;o&&(document.body.setAttribute("data-page",o),document.documentElement.setAttribute("data-page",o))};e(),t.subscribe(e)}(),Bo.insertMultistyle`
    <style>
      ${Ho.postCreation.previewContainer} {
        flex-shrink: 0;
        width: 110px;
        height: 110px;
      }
      html.reels--creating-reels ${Ho.postCreation.previewContainer} {
        width: 62px;
      }

      ${Ho.postCreation.rowButton} {
        cursor: pointer;
      }

      @media (max-width: 440px) {
        ${Ho.postCreation.previewContainer} {
          width: 60px;
          height: 60px;
        }
        html.reels--creating-reels ${Ho.postCreation.previewContainer} {
          width: 45px;
          min-width: 45px;
          height: 80px;
        }
      }

      ${Ho.postCreation.previewPostImage} {
        border-radius: 4px;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
      }

      /* fix story media being cutted */
      ${Ho.storyViewer.mediaContainer} {
        width: 100%;
        height: 100%;
        background-color: #000;
      }

      ${Ho.storyViewer.videoPoster} {
        object-fit: contain;
      }
    </style>
  `,async function(){document.addEventListener("click",(async t=>{const e=t.target.closest(Ho.general.postDmButton);if(!e)return;const o=e.closest(Ho.general.post);if(!o)return;const n=Lo(Ho.general.postThreeDotsButton,o);if(!n)return;t.preventDefault(),t.stopPropagation();const i=new Promise((t=>{Bo.onDocMutations((function e(){Lo(Ho.general.actionDialog)&&(setTimeout((()=>{Bo.onDocMutations.off(e)})),t())}))}));n.click(),await i;const r=Fo(Ho.general.actionDialogItem).find((t=>t.innerText.toLowerCase().includes("share")||t.innerText.endsWith("...")||t.innerText.endsWith("…")));r&&r.click()}),!0)}(),async function(){const t=await $t("store");if(!t)return;let e=null;Bo.onDocMutations((()=>{const o=Lo(Ho.postCreation.expandImageButton);if(!o)return;const n=t.getState().creation.sessionId;n!==e&&(e=n,o.click())}))}(),async function(){const t=(t,e)=>window.innerWidth>320?Math.min(125,e/t*100):Math.min(180,e/t*100);Object.defineProperty(Object.prototype,"getHeightPercent",{get:function(){return({width:e,height:o})=>t(e,o)},set:function(){return!0}}),Object.defineProperty(Object.prototype,"getWrapperHeightStyle",{get:function(){return(e,o)=>({paddingBottom:`calc(${t(o,e)}% - 1px)`})},set:function(){return!0}}),Bo.insertMultistyle`
    <style>
      ${Ho.postCreation.video} {
        width: 100%;
        height: 100%;
        background-color: #000;
      }

      ${Ho.postCreation.videoPoster} {
        object-fit: contain;
      }
    </style>
  `}(),Bo.insertMultistyle`
    <style>
      ${Ho.postCreation.captionContainer} {
        flex-direction: row-reverse !important;
      }

      ${Ho.postCreation.captionTextarea} {
        display: block;
        width: 100%;
        margin: 0;
        padding: 0 12px;
        box-sizing: border-box;
      }

      ${Ho.postCreation.userAvatar} {
        display: none;
      }

      ${Ho.postCreation.mentionsOverlay} {
        background: transparent !important;
      }

      ${Ho.postCreation.tagPeopleButton} {
        padding: 20px;
        cursor: pointer;
        background: transparent;
        border: none;
      }
    </style>
  `,function(){const t=Symbol("handled");Bo.onDocMutations((async()=>{const e=Lo(Ho.profilePage.avatarStoryRing);if(!e)return;if(e[t])return;e[t]=!0;const o=e.getContext("2d"),n=await Bo.waitFor((()=>{if(!document.body.contains(e))return null;const t=o.getImageData(0,0,e.width,e.height).data;for(let e=0;e<t.length;e+=4){const o=[t[e],t[e+1],t[e+2]];if(!(0===o[0]&&0===o[1]&&0===o[2]))return o}return null}),{timeout:5e3});if(!n)return;const i=n[0]===n[1]&&n[0]===n[2];e.insertAdjacentHTML("beforebegin",`<div class="avatar-story-ring ${i?"avatar-story-ring_viewed":""}"></div>`)})),Bo.insertMultistyle`
    <style>
      ${Ho.profilePage.avatarStoryRing} {
        opacity: 0;
      }

      .avatar-story-ring {
        position: absolute;
        top: -8px;
        left: -8px;
        right: -8px;
        bottom: -8px;
        border-radius: 50%;
        background: linear-gradient(45deg, #F99D4C, #DD326F, #C42E90);
      }
      .avatar-story-ring_viewed {
        background: #dbdbdb;
      }

      .avatar-story-ring::before {
        content: '';
        position: absolute;
        top: 3px;
        left: 3px;
        right: 3px;
        bottom: 3px;
        background: #FFF;
        border-radius: 50%;
      }
    </style>
  `}(),Bo.onDocMutations((()=>{const t=Lo(Ho.general.cookieModalContent);if(!t)return;const e=t.closest(Ho.general.modal);e&&e.remove()})),function(){const t=Symbol("handled");Bo.onDocMutations((()=>{const e=Lo(Ho["highlights-container"]);e&&(e[t]||(e[t]=!0,Bo.smartHorizontalScroll.init(e)))}))}(),window.addEventListener("click",(t=>{if("v2"!==window.inssist.igBundleVersion)return;if(!t.metaKey&&!t.ctrlKey)return;const e=t.target.closest("a[href]");e&&e.href&&(t.preventDefault(),t.stopPropagation(),window.open(e.href))}),!0),async function(){const t=await $t("nav");if(!t)return;const e=/\/reel\/[\w-]+\//;window.addEventListener("click",(o=>{if("v2"!==window.inssist.igBundleVersion)return;const n=o.target.closest("a[href]");if(!n)return;const i=n.getAttribute("href")||"";e.test(i)&&(o.preventDefault(),o.stopPropagation(),t.push(i))}),!0)}(),function(){const t=new Map,e=[Ho.general.tabBarAvatarContainer,Ho.general.storyTrayViewerAvatarContainer];Bo.onDocMutations((()=>{for(const o of e){const e=Lo(o);e&&(e.innerHTML&&!t.has(o)?t.set(o,e.innerHTML):!e.innerHTML&&t.has(o)&&(e.innerHTML=t.get(o)))}}))}(),async function(){const t=await $t("add-dispatch-listener");if(!t)return;t((async t=>{"DELETE_POST_SUCCEEDED"===t.type&&(await Bo.sleep(300),document.body.innerText.length>0||(history.back(),await Bo.sleep(100),location.reload()))}))}(),function(){const t="inssist.errorPageReloadedAt";Bo.onDocMutations((()=>{if(!Lo(Ho.general.errorPageContent))return;const e=Bo.ls.get(t)||0;e&&Date.now()-e<1*Bo.time.MINUTE||(Bo.ls.set(t,Date.now()),location.reload())}))}(),async function(){const t=await $t("store");if(!t)return;let e=!1;t.subscribe((()=>{var o;if(e)return;"httpErrorPage"===(null===(o=t.getState().navigation)||void 0===o?void 0:o.pageIdentifier)&&(wt.send("ga.send-event","user","ig:page-not-found"),e=!0)}))}(),async function(){const t=await $t("store");if(!t)return;let e="";t.subscribe((()=>{var o,n;const i=null===(o=t.getState().direct)||void 0===o||null===(n=o.badge)||void 0===n?void 0:n.count;if("number"!=typeof i)return void console.error("failed to extract dm count");let r;r=0===i?"":i<10?String(i):"9+",r!==e&&(e=r,wt.send("dm.update-badge",r))}))}(),function(){const t=Date.now();Bo.onDocMutations((()=>{if(!document.body)return;if(Date.now()-t>10*Bo.time.SECOND)return;document.body.innerText.includes("Sorry! Something went wrong :(")&&(location.href="/")}))}(),function(){const t=Symbol("handled");Bo.onDocMutations((()=>{const e=Bo.$(Ho.postCreation.submitPostButton);e&&(e[t]||(e[t]=!0,e.style.setProperty("width",`${e.offsetWidth}px`,"important"),e.style.setProperty("display","flex","important"),e.style.setProperty("flex-direction","row","important"),e.style.setProperty("justify-content","flex-end","important")))}))}(),async function(){const t=await $t("nav");if(!t)return;const e='\n    <svg viewBox="0 0 24 24" width="24" height="24" color="#000" fill="#000">\n      <path d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>\n      <line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="6.545" x2="17.455" y1="12.001" y2="12.001"></line>\n      <line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="12.003" x2="12.003" y1="6.545" y2="17.455"></line>\n    </svg>\n  ',o=Symbol("handled");Bo.onDocMutations((()=>{const n=Bo.$(Ho.general.tabBarDm),i=Bo.$(Ho.general.tabBarReels);if(!n||!i)return;const r=n.querySelector("a"),a=n.querySelector("svg");if(r&&a&&(i[o]||(i[o]=!0,i.insertAdjacentElement("beforebegin",n)),a[o]||(a[o]=!0,a.outerHTML=e),r[o]||(r[o]=!0,r.removeAttribute("href")),!n[o])){n[o]=!0;let e=!1;n.addEventListener("mousedown",(t=>{!!Bo.$(Ho.creationPopup.root)&&(e=!0)})),n.addEventListener("click",(async o=>{if(o.preventDefault(),o.stopPropagation(),e)return void(e=!1);"/"!==location.pathname&&t.push("/");(await Bo.waitFor((()=>Bo.$(Ho.feedPage.createPostTopButton)))).click()}),!0)}}))}(),async function(){const t=await Lt("polarisIsWebGLSupported"),e=t.isWebGLSupported.bind(t);t.isWebGLSupported=()=>!Lo(Ho.postCreation.nextButton)&&e();const o=Symbol("handled");Bo.onDocMutations((()=>{const t=Lo(Ho.postCreation.nextButton);if(!t)return;if(t[o])return;t[o]=!0;let e=!1;t.addEventListener("click",(()=>{e||(e=!0,setTimeout((()=>{t.click(),e=!1}),100))}))}))}(),Bo.insertMultistyle`
    <style>
      .clickable {
        cursor: pointer;
        transition: filter 300ms;
      }
      .clickable:hover {
        filter: brightness(110%);
      }
      .clickable:active {
        filter: brightness(90%);
      }
    </style>
  `,Bo.insertMultistyle`
    <style>
      .info-circle {
        width: 12px;
        height: 12px;
        color: #FFF;
        background: #1BA2F9;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        position: relative;
        font-size: 9px;
        font-weight: 700;
        font-family: Montserrat !important;
      }
      .info-circle::before { /* hitbox */
        content: '';
        position: absolute;
        top: -7px;
        left: -7px;
        right: -7px;
        bottom: -7px;
      }
      .theme-night .info-circle {
        filter: url(#theme-reverse-filter);
        background: #33ABF8;
      }
    </style>
  `,Bo.insertMultistyle`
    <style>
      .modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(255, 255, 255, 0.96);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
      }

      .modal__window {
        width: 290px;
        padding: 16px 20px;
        background: #FFF;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
        font-size: 14px;
        line-height: 20px;
        border-radius: 12px;
      }

      .modal__title {
        display: flex;
        flex-direction: row;
        align-items: center;
        font-weight: 600;
      }

      .modal__content {
        margin-top: 12px;
        display: block;
        color: #3F3E3F;
      }
      .modal__content b {
        font-weight: 600;
      }
      .modal__content a {
        color: #1BA2F9 !important;
      }
      .theme-nigh .modal__content a {
        filter: url(#theme-reverse-filter);
        color: #33ABF8 !important;
      }
      .modal__content ul {
        list-style: disc;
        padding: 8px 0 8px 24px;
        margin: 0;
      }
    </style>
  `,Bo.insertMultistyle`
    <style>
      .button {
        color: #FFF;
        background: #1BA2F9;
        border: none;
        margin-right: 12px;
        cursor: pointer;
        padding: 5px 12px;
        font-size: 14px;
        font-weight: 500;
        border-radius: 4px;
        font-weight: 600;
      }
      .button:last-child {
        margin-right: 0;
      }
      .button:disabled {
        opacity: 0.5;
        pointer-events: none;
      }
      .button_cancel {
        color: #262626;
        border: 1px solid #DBDBDB;
        background: transparent;
      }
      .theme-night .button:not(.button_cancel) {
        filter: url(#theme-reverse-filter);
        background: #33ABF8;
      }
    </style>
  `}};let Ho,Vo;const{$utils:No}=app;var zo={init:function(){document.addEventListener("click",(t=>{mo.onDocClick(t)}),!0),function(){let t=location.pathname;mo.onPathChange(t),No.onDocMutations((()=>{const e=location.pathname;t!==e&&(mo.onPathChange(e),t=e)}))}()}};var jo={init:function(){wt.on("ig.publish-story",Uo)}};async function Uo({imageUrl:t,mentions:e=[]}){const o=await $t("http"),n=await async function(t){const e=await fetch(t),o=await e.blob();return await async function(t){return new Promise(((e,o)=>{const n=new FileReader;n.onerror=()=>{o()},n.onload=()=>{e(n.result)},n.readAsDataURL(t)}))}(o)}(t),i=document.createElement("img");i.src=n,document.body.appendChild(i),await new Promise((t=>{i.onload=t}));const r=i.clientWidth,a=i.clientHeight,s=document.createElement("canvas");s.width=r,s.height=a;s.getContext("2d").drawImage(i,0,0),i.remove();const l=await new Promise((t=>{s.toBlob(t,"image/jpeg")})),c=Date.now().toString(),d=`fb_uploader_${c}`;let p=null;try{await o.post(`/rupload_igphoto/${d}`,l,{headers:{"X-Instagram-Rupload-Params":JSON.stringify({media_type:1,upload_id:c,upload_media_width:r,upload_media_height:a}),"X-Entity-Name":d,"X-Entity-Length":String(l.size),Offset:"0"},timeout:Number.POSITIVE_INFINITY})}catch(t){p=t}if(!p)try{await o.post("/create/configure_to_story/",{upload_id:c,caption:"",reel_mentions:JSON.stringify(e.map((t=>({user_id:t.userId,x:t.cx,y:t.cy,width:t.width,height:t.height,rotation:0}))))})}catch(t){p=t}return{error:p}}const{$utils:Wo}=app;var Go={init:function(){qo=L.controller.getConfig().igSelectors,async function(){const t=await $t("store");Wo.onDocMutations((()=>{const e=Wo.$$(qo["post-item"]),o=Wo.$$(qo["story-container"]);[...e,...o].forEach((e=>{if(e.withActions)return;const n=o.includes(e),i=!!e.querySelector("video");let r=!1,a=!1;const s=e.closest("[data-post-id]");if(s){const e=s.dataset.postId,o=t.getState().posts.byId.get(e);a="clips"===(null==o?void 0:o.productType),r="igtv"===(null==o?void 0:o.productType),r&&s.setAttribute("data-media-actions-post-type","igtv"),a&&s.setAttribute("data-media-actions-post-type","reels")}const l=function({isIgtv:t=!1,isStory:e=!1,isVideo:o=!1,isReels:n=!1}={}){return`\n    <div class="\n      mediaActions\n      ${t?"mediaActions_igtv":""}\n      ${n?"mediaActions_reels":""}\n      ${e?"mediaActions_story":"mediaActions_post"}\n      ${o?"mediaActions_video":"mediaActions_photo"}">\n      <button class="mediaActions__button" data-action="pin" title="Add to Inspirations">\n        <svg xmlns="http://www.w3.org/2000/svg" width="13.5" height="13.5" viewBox="0 0 13.5 13.5">\n          <path d="M7,1.632H4.032a4.707,4.707,0,0,0-2,.207,1.9,1.9,0,0,0-.828.828,4.707,4.707,0,0,0-.207,2V9.968a4.708,4.708,0,0,0,.207,2,1.9,1.9,0,0,0,.828.828,4.708,4.708,0,0,0,2,.206h5.81a4.751,4.751,0,0,0,1.122-.065A1.9,1.9,0,0,0,12.3,11.6a4.752,4.752,0,0,0,.065-1.122M11.105,4.789V1M9.211,2.895H13M5.737,5.105A1.263,1.263,0,1,1,4.474,3.842,1.263,1.263,0,0,1,5.737,5.105ZM8.573,7.264,3.23,12.121c-.3.273-.451.41-.464.528a.316.316,0,0,0,.105.272c.089.079.292.079.7.079H9.5a4.724,4.724,0,0,0,1.72-.153,1.9,1.9,0,0,0,1-1,4.721,4.721,0,0,0,.153-1.72,2.741,2.741,0,0,0-.033-.6,1.264,1.264,0,0,0-.236-.491,2.735,2.735,0,0,0-.449-.4L9.884,7.223a1.5,1.5,0,0,0-.49-.321.631.631,0,0,0-.352.011A1.5,1.5,0,0,0,8.573,7.264Z" transform="translate(-0.25 -0.25)" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>\n        </svg>\n      </button>\n      <button class="mediaActions__button" data-action="open" title="Open in new tab">\n        <svg xmlns="http://www.w3.org/2000/svg" width="12.5" height="12.5" viewBox="0 0 12.5 12.5">\n          <path d="M2.571,1.028h2.4a.514.514,0,0,1,.07,1.024l-.07,0h-2.4A1.542,1.542,0,0,0,1.033,3.47l-.005.109,0,5.85a1.543,1.543,0,0,0,1.438,1.539l.106,0L8.4,10.963A1.543,1.543,0,0,0,9.938,9.526l0-.106v-2.4a.514.514,0,0,1,1.024-.07l0,.07v2.4a2.572,2.572,0,0,1-2.432,2.568l-.136,0L2.577,12l-.139,0A2.572,2.572,0,0,1,.005,9.566l0-.137L0,3.6l0-.139A2.571,2.571,0,0,1,2.435,1.031ZM7.027,0h4.494L11.59.01l.069.019L11.7.046a.482.482,0,0,1,.1.062l.048.043.057.068.037.062.026.062.013.044.009.044L12,.495v4.48a.514.514,0,0,1-1.024.07l0-.07V1.756L6.02,6.709a.514.514,0,0,1-.67.05l-.058-.05a.514.514,0,0,1-.05-.67l.05-.058,4.95-4.953H7.027a.514.514,0,0,1-.51-.445l0-.07A.514.514,0,0,1,6.957,0Z" transform="translate(0.25 0.25)" fill="currentColor" stroke="currentColor" stroke-width="0.5"/>\n        </svg>\n      </button>\n    </div>\n  `}({isStory:n,isVideo:i,isIgtv:r,isReels:a});e.insertAdjacentHTML("afterbegin",l),e.withActions=!0}))}))}(),mo.onDocClick((async t=>{const e=t.target.closest(".mediaActions__button");if(!e)return;t.preventDefault(),t.stopPropagation();const o=e.closest("li")||e.closest(qo["post-item"])||e.closest(qo["story-container"]),n=o.querySelector("img"),i=o.querySelector("video");if(!n&&!i)return void wt.send("ig.error","unable to find media for button");const r=(await $t("store")).getState();let a;const s=t.target.closest("[data-post-id]");a=s?s.dataset.postId:r.stories.reels.get(r.stories.currentReelId).itemIds[r.stories.currentReelItemIndex];const l=r.posts.byId.get(a),c=e.getAttribute("data-action");let d;if(i)d=i.getAttribute("src")||i.querySelector("source").getAttribute("src");else if(n){var p,u;!l.productType.startsWith("carousel")&&(null===(p=l.displayResources)||void 0===p?void 0:p.length)>0&&(d=l.displayResources.slice().sort(((t,e)=>e.configWidth-t.configWidth))[0].src),d||(d=null===(u=n.getAttribute("srcset"))||void 0===u?void 0:u.split(",").map((t=>({src:t.split(" ")[0],configWidth:t.split(" ")[1]}))).sort(((t,e)=>e.configWidth-t.configWidth))[0].src),d||(d=n.getAttribute("src"))}if("open"===c){const t=i&&i.outerHTML||n&&n.outerHTML;wt.send("ig.media-open",{url:d,html:t})}else if("pin"===c){var h;const t=function(t){var e;const o=[],n=(null==t||null===(e=t.owner)||void 0===e?void 0:e.username)||null;n&&o.push(n.toLowerCase());const i=Number(null==t?void 0:t.postedAt);if(i){const t=new Date(1e3*i).toDateString().split(" ").slice(1).join("-").toLowerCase();o.push(t)}return o.join("-")||null}(l),e=(null==l||null===(h=l.owner)||void 0===h?void 0:h.username)||null,o=l.caption||"";wt.send("inspiration.pin",{url:d,filename:t,username:e,caption:o})}})),Wo.insertMultistyle`
    <style>
      .mediaActions {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.2s;
      }
      .mediaActions_story {
        padding-right: 5px;
        padding-bottom: 70px;
        height: 150px;
        z-index: 1;
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
      }
      .mediaActions_post.mediaActions_photo {
        padding-right: 2px;
        padding-bottom: 12px;
        align-items: flex-end;
      }
      .mediaActions_post.mediaActions_video {
        right: 5px;
        transition-duration: 0s;
        bottom: 31px;
      }
      @media (max-width: 450px) {
        .mediaActions_post.mediaActions_video {
          bottom: 72px;
        }
      }
      ${qo["post-item"]}:hover .mediaActions,
      body:hover .mediaActions_story {
        opacity: 1;
      }
      .v1Nh3 .mediaActions, /* preview in profile */
      .PUHRj .mediaActions { /* preview in activity */
        display: none;
      }
      html.theme-night .mediaActions_story {
        filter: none;
      }

      ${qo["post-item"]} video::-webkit-media-controls-panel {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 140px;
        background: linear-gradient(
          to top,
          hsl(0, 0%, 0%, 0.541) 0%,
          hsla(0, 0%, 0%, 0.382) 19%,
          hsla(0, 0%, 0%, 0.278) 34%,
          hsla(0, 0%, 0%, 0.194) 47%,
          hsla(0, 0%, 0%, 0.126) 56.5%,
          hsla(0, 0%, 0%, 0.075) 65%,
          hsla(0, 0%, 0%, 0.042) 73%,
          hsla(0, 0%, 0%, 0.021) 80.2%,
          hsla(0, 0%, 0%, 0.008) 86.1%,
          hsla(0, 0%, 0%, 0.002) 91%,
          hsla(0, 0%, 0%, 0.001) 95.2%,
          hsla(0, 0%, 0%, 0) 100%
        );
      }

      /* show video controls only when hovering video */
      ${qo["post-item"]}:not(:hover) video::-webkit-media-controls-panel {
        display: none;
      }

      .mediaActions__button {
        width: 34px;
        height: 34px;
        margin-right: 6px;
        border-radius: 50%;
        padding: 0;
        border: none;
        cursor: pointer;
        position: relative;
        transform-origin: center;
        outline: none;
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: all;
        color: #FFF;
        background: transparent;
        transition: all 0.16s linear;
      }
      .mediaActions__button:not(:hover) {
        transition-duration: 0s;
      }
      .mediaActions_post.mediaActions_video .mediaActions__button {
        margin-right: 4px;
      }
      .mediaActions_post.mediaActions_photo .mediaActions__button,
      .mediaActions_story .mediaActions__button {
        color: #3F3E3F;
        background: rgba(255, 255, 255, 0.9);
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.16);
        width: 27px;
        height: 27px;
        margin-right: 12px;
      }
      .mediaActions_post.mediaActions_video .mediaActions__button:hover {
        background: rgba(36, 36, 40, 0.7);
      }
      /* hitbox */
      .mediaActions__button::before {
        content: '';
        position: absolute;
        top: -3px;
        left: -3px;
        right: -3px;
        bottom: -3px;
      }

      .mediaActions_post.mediaActions_video .mediaActions__button svg {
        filter: drop-shadow(0 1px 3px rgba(0, 0, 0, 0.3));
      }
    </style>
  `}};let qo;const{$utils:Yo}=app;var Xo={init:function(){Qo=L.controller.getConfig().igSelectors,mo.onPathChange((t=>{wt.send("ig.path-change",t)})),async function(){const t=await $t("http"),e=await $t("store");if(!t||!e)return;const o=t.post.bind(t);t.post=async(...t)=>{const n=t[0];let i=n.includes("/create/configure_to_story")?"story":n.includes("/media/configure_to_clips")?"reel":n.includes("/igtv/configure_to_igtv")||n.includes("/create/configure")?"video":n.includes("/media/configure")?"photo":null;if(i){const n=await o(...t);if("ok"===n.status){var r,a;if("story"===i){var s;i=!!(null===(s=n.media)||void 0===s?void 0:s.video_duration)?"story-video":"story-photo"}const t={isCustomCover:!!(null===(r=e.getState().creation)||void 0===r||null===(a=r.coverPhoto)||void 0===a?void 0:a.isCustom)};wt.send("ig.published",i,t)}return n}return o(...t)}}(),mo.onDocClick((t=>{t.target.closest(".xWeGp")&&wt.send("ig.open-dm")})),wt.on("ig.back",(async()=>{history.state&&history.state.key&&history.back()})),wt.on("ig.broadcast-scroll",(t=>{mo.docElem.scrollTop+=t})),function(){let t;(async()=>{t=await $t("nav")})(),wt.on("ig.ajax-go",(e=>{t?t.push(e):location.href=e}))}(),async function(t){wt.on("ig.hard-go",(t=>{location.href=t}))}(),wt.on("ig.get-url",(()=>location.pathname+location.search)),wt.on("ig.clear-and-show-spinner",(()=>{const t=Yo.$(Qo.general.reactRoot);t&&(t.innerHTML="")}))}};let Qo;const{$reels:Ko,$utils:Zo}=app;var Jo={init:async function(){if(en=L.controller.getConfig().igSelectors,on=await $t("store"),!on)return;(function(){let t;Object.defineProperty(Object.prototype,"getVideoCoverPhoto",{get:function(){return(...e)=>{const o=e[0];if(ln.onCall(o),!ln.prevented){if(ln.result){const t=ln.result;return ln.result=null,t}return t(...e)}ln.prevented=!1}},set:function(e){return t=e,!0}})})(),async function(){await Zo.waitForDocumentReady(),rn=_o.create({onClick:pn})}(),mo.onBeforeStoryCreation((()=>{nn="story",cn()})),mo.onBeforePostCreation((()=>{window.require("PolarisCreationActionCreationSelectImage"),window.require("PolarisCreationActionCreationSelectMedia"),nn=Ko.controller.isCreatingReels()?"reels":"post",cn()})),mo.onMediaProcessingError((()=>{dn()})),Zo.onDocMutations((()=>{const t=!!Zo.$(en.postCreationPage),e=!!Zo.$(en.storyCreationPage);(t||e)&&dn()})),function(){const t=Symbol();Zo.onDocMutations((()=>{Zo.$$('input[accept*="image/jpeg"').forEach((e=>{e[t]||(e[t]=!0,e.setAttribute("accept","image/jpeg, image/png, video/quicktime, video/mp4, video/webm"))}))}))}(),ln.onCall((t=>{const{error:e,...o}=function(t){const e=t.videoWidth,o=t.videoHeight;if(!e||!o)return{error:"wrong-format"};if(Ko.controller.isCreatingReels()&&e===o)return{error:"square-reel-video"};const n=e/o,i=tn[nn].minRatio,r=tn[nn].maxRatio;return n<i||n>r?{error:"wrong-ratio",ratio:n}:t.duration<tn[nn].minVideoDuration?{error:"video-too-short"}:t.duration>tn[nn].maxVideoDuration?{error:"video-too-long"}:{error:null}}(t);e&&(async()=>{ln.prevented=!0,on.dispatch({type:"inssist.ig.stop-creation-session"});const n=await fetch(t.src),i=await n.blob();await un(i.type,e,o),mo.onMediaProcessingError()})()})),ln.onCall((t=>{"story"===nn&&(ln.result=new Promise((e=>{const o=document.createElement("canvas");t.currentTime=0,t.addEventListener("timeupdate",(()=>{o.width=t.videoWidth,o.height=t.videoHeight,o.getContext("2d").drawImage(t,0,0),o.toBlob((o=>{e({file:o,dataURL:URL.createObjectURL(o),uploadMediaWidth:t.videoWidth,uploadMediaHeight:t.videoHeight,videoTransform:null})}),"image/jpeg")}))})))})),Zo.insertMultistyle`
    <style>
      ${en.general.uploadPanel} {
        z-index: 1;
      }
    </style>
  `,async function(){const t=await $t("http");if(!t)return;const e=t.post.bind(t);t.post=(...t)=>{var o,n,i;if((null===(o=t[0])||void 0===o?void 0:o.includes("/rupload_igvideo"))&&!(null===(n=t[0])||void 0===n?void 0:n.includes("story"))){const e=t[2].headers,o=JSON.parse(e["X-Instagram-Rupload-Params"]);o.is_clips_video||(o.is_igtv_video=!0,o.is_unified_video=1,e["X-Instagram-Rupload-Params"]=JSON.stringify(o))}else(null===(i=t[0])||void 0===i?void 0:i.includes("/create/configure/"))&&(t[0]="/igtv/configure_to_igtv/",t[1]={source_type:"library",caption:t[1].caption,upcoming_event:"",upload_id:t[1].upload_id,usertags:t[1].usertags,custom_accessibility_caption:t[1].custom_accessibility_caption,disable_comments:0,like_and_view_counts_disabled:0,igtv_ads_toggled_on:"",igtv_share_preview_to_feed:1,is_unified_video:1,video_subtitles_enabled:0});return e(...t)}}()}};const tn={clickShowErrorTimeout:10*Zo.time.SECOND,forceShowErrorTimeout:30*Zo.time.SECOND,story:{minRatio:.12,maxRatio:1.91,minRatioPrettyStr:"0.12",maxRatioPrettyStr:"1.91:1",minRatioValueStr:"0.12",maxRatioValueStr:"1.91",minVideoDuration:1,maxVideoDuration:300.9,minVideoDurationStr:"1 second",maxVideoDurationStr:"5 minutes",alertErrorMessage:"Uploading video cancelled. Please ensure that the video is 1 to 5 minutes long and the size ratio is less than 1.91:1."},post:{minRatio:.12,maxRatio:1.91,minRatioPrettyStr:"0.12",maxRatioPrettyStr:"1.91:1",minRatioValueStr:"0.12",maxRatioValueStr:"1.91",minVideoDuration:1,maxVideoDuration:900.9,minVideoDurationStr:"1 second",maxVideoDurationStr:"15 minutes",alertErrorMessage:"Uploading video cancelled. Please ensure that the video is 1 second to 15 minutes long and the size ratio is less than 1.91:1."},reels:{minRatio:.12,maxRatio:1.91,minRatioPrettyStr:"0.12",maxRatioPrettyStr:"1.91:1",minRatioValueStr:"0.12",maxRatioValueStr:"1.91",minVideoDuration:1,maxVideoDuration:900.9,minVideoDurationStr:"1 second",maxVideoDurationStr:"15 minutes",alertErrorMessage:"Uploading video cancelled. Please ensure that the video is 1 second to 15 minutes long and the size ratio is less than 1.91:1."}};let en,on,nn,rn,an,sn;const ln={onCall:Zo.createEmitter(),result:null,prevented:!1};function cn(){rn&&(an=Date.now(),_o.toggle(rn,!0),sn=setTimeout((()=>{alert(tn[nn].alertErrorMessage),dn()}),tn.forceShowErrorTimeout))}function dn(){rn&&(_o.toggle(rn,!1),clearTimeout(sn))}function pn(){Date.now()-an>tn.clickShowErrorTimeout&&alert(tn[nn].alertErrorMessage),dn()}async function un(t,e,o={}){const n=un;if(n.shown)return;n.shown=!0;const i=tn[nn];if("wrong-ratio"===e){const t=o.ratio.toFixed(3);document.body.insertAdjacentHTML("beforeend",`\n      <div class="video-error modal">\n        <div class="modal__window">\n          <div class="video-error__title modal__title">\n            <span class="emoji">😱</span> UNSUPPORTED ASPECT RATIO\n          </div>\n          <div class="modal__content">\n            ${o.ratio<i.minRatio?`\n              Uploaded Video Aspect Ratio is <b>${t}</b>\n              which is <b>below ${i.minRatioPrettyStr} (${i.minRatioValueStr})</b>.\n            `:`\n              Uploaded Video Aspect Ratio is <b>${t}</b>\n              which is <b>above ${i.maxRatioPrettyStr} (${i.maxRatioValueStr})</b>.\n            `}\n            <div class="video-error__convert-section">\n              You can resize the video with one of these free tools:\n              <ul>\n                <li><a href="https://ezgif.com/resize-video" target="_blank">ezgif.com</a></li>\n                <li><a href="https://clideo.com/resize-video" target="_blank">clideo.com</a></li>\n                <li><a href="https://cloudconvert.com/mp4-converter" target="_blank">cloudconvert.com</a></li>\n              </ul>\n            </div>\n            <button class="video-error__got-it-button">\n              OK, GOT IT\n            </button>\n          </div>\n        </div>\n      </div>\n    `)}else if("wrong-format"===e){let e;e="video/quicktime"===t?"https://www.zamzar.com/convert/mov-to-webm":"video/mp4"===t?"https://www.zamzar.com/convert/mp4-to-webm":"https://www.zamzar.com",document.body.insertAdjacentHTML("beforeend",`\n      <div class="video-error modal">\n        <div class="modal__window">\n          <div class="video-error__title modal__title">\n            <span class="emoji">😱</span> UNABLE TO UPLOAD VIDEO\n          </div>\n          <div class="modal__content">\n            Instagram server rejected this video for upload.\n            Please ensure uploaded video uses supported format and codec (e.g. MP4/h264 or WEBM).\n            <div class="video-error__convert-section">\n              You can convert video format with one of these tools:\n              <ul>\n                <li><a href="https://video.online-convert.com/convert-to-mp4" target="_blank">video.online-convert.com</a></li>\n                <li><a href="https://cloudconvert.com/mp4-converter" target="_blank">cloudconvert.com</a></li>\n                <li><a href="https://ezgif.com/resize-video" target="_blank">ezgif.com</a></li>\n                <li><a href="${e}" target="_blank">zamzar.com</a></li>\n              </ul>\n            </div>\n            <button class="video-error__got-it-button">\n              OK, GOT IT\n            </button>\n          </div>\n        </div>\n      </div>\n    `)}else"video-too-short"===e?document.body.insertAdjacentHTML("beforeend",`\n      <div class="video-error modal">\n        <div class="modal__window">\n          <div class="video-error__title modal__title">\n            <span class="emoji">😱</span> VIDEO IS TOO SHORT\n          </div>\n          <div class="modal__content">\n            <div style="display: block">\n              Instagram server did not accept this video,\n              because it is less than <b>${i.minVideoDurationStr}</b> long.\n            </div>\n            <button class="video-error__got-it-button">\n              OK, GOT IT\n            </button>\n          </div>\n        </div>\n      </div>\n    `):"video-too-long"===e?document.body.insertAdjacentHTML("beforeend",`\n      <div class="video-error modal">\n        <div class="modal__window">\n          <div class="video-error__title modal__title">\n            <span class="emoji">😱</span> VIDEO IS TOO LONG\n          </div>\n          <div class="modal__content">\n            Instagram server did not accept this video,\n            because it is over <b>${i.maxVideoDurationStr}</b>\n            long.\n            <div class="video-error__convert-section">\n              You can cut video short with this free\n              <a href="https://online-video-cutter.com/" target="_blank">online video cutter tool</a>.\n            </div>\n            <button class="video-error__got-it-button">\n              OK, GOT IT\n            </button>\n          </div>\n        </div>\n      </div>\n    `):"square-reel-video"===e&&document.body.insertAdjacentHTML("beforeend",'\n      <div class="video-error modal">\n        <div class="modal__window">\n          <div class="video-error__title modal__title">\n            <span class="emoji">😱</span> UNSUPPORTED ASPECT RATIO\n          </div>\n          <div class="modal__content">\n            <div style="display: block">\n              Instagram API does not support posting square 1:1 videos to Reels.\n            </div>\n            <div style="height: 8px"></div>\n            <div style="display: block">\n              • Supported ratios are 4:5 to 1.91:1.<br>\n              • Optimal is 9:16 or 1080x1920px <span class="emoji">🚀</span>\n            </div>\n            <div style="height: 8px"></div>\n            <div style="display: block">\n              You can crop your video online with a&nbsp;free\n              <a href="https://ezgif.com/crop-video" target="_blank">ezgif video cropper tool</a>.\n            </div>\n            <button class="video-error__got-it-button">\n              OK, GOT IT\n            </button>\n          </div>\n        </div>\n      </div>\n    ');n.init||(n.init=!0,mo.onDocClick((t=>{if(!t.target.closest(".video-error__got-it-button"))return;Zo.$(".video-error").remove(),n.shown=!1})),Zo.insertMultistyle`
    <style>
      .video-error__title .emoji {
        margin-right: 8px;
      }

      .video-error__convert-section {
        margin-top: 8px;
        display: block;
      }

      .video-error__got-it-button {
        outline: none;
        border: none;
        padding: 0;
        margin: 16px 0 0 0;
        background: transparent;
        font-size: inherit;
        font-family: inherit;
        text-align: left;
        font-weight: 600;
        color: #1BA2F9;
        cursor: pointer;
      }
    </style>
  `)}const{$utils:hn}=app;var gn={init:function(){fn=L.controller.getConfig().igSelectors,function({minWidth:t}){hn.insertMultistyle`
    <style>
      @media (min-width: ${t}px) {
        ${fn.general.tabBarWrap} {
          height: 0;
          margin-top: 12px;
        }

        ${fn.general.tabBar} {
          width: 490px;
          height: 58px;
          margin: 0 auto;
          box-shadow: 0 0px 12px rgba(0, 0, 0, 0.14);
          border-radius: 15px 15px 0 0;
          border: none;
        }
        .theme-night ${fn.general.tabBar} {
          background: #E7E8EA;
          border: 1px solid #FFF;
          border-bottom: none;
          box-shadow: none;
          box-sizing: content-box;
        }

        ${fn.general.tabBar}::before {
          display: none;
        }
      }
    </style>
  `}({minWidth:500}),function({minWidth:t}){hn.insertMultistyle`
    <style>
      @media (min-width: ${t}px) {
        ${fn.general.header}::before {
          width: 600px;
          margin-left: -300px;
          left: 50% !important;
          right: auto !important;
          background: linear-gradient(
            to right,
            transparent,
            #DBDBDB,
            #DBDBDB,
            transparent
          ) !important;
        }

        ${fn.general.headerContent} {
          width: 490px !important;
          margin-left: auto;
          margin-right: auto;
        }
      }
    </style>
  `}({minWidth:500}),function({minWidth:t}){let e=mn().scrollTop;const o=()=>{if("/"===location.pathname)return;const o=hn.$(fn.general.header);if(!o)return;if(window.innerWidth<t)return void(o.style.transform=null);const n=mn().scrollTop,i=n-e,r=i>6;e=n,i<-6||n<=45?o.style.transform=null:r&&(o.style.transform="translateY(-45px)")};if(window.addEventListener("resize",o),document.addEventListener("scroll",o),function(){return!i(L.controller.getConfig().igSelectors.general.tabBarCreatePostIconOldNavDesign)}()){const t=Symbol("handled");hn.onDocMutations((()=>{const e=mn();e&&(e[t]||(e[t]=!0,e.addEventListener("scroll",o)))}))}hn.insertMultistyle`
    <style>
      @media (min-width: ${t}px) {
        ${fn.general.header} {
          transition: transform 0.3s;
        }
      }
    </style>
  `}({minWidth:460}),function({minWidth:t}){hn.insertMultistyle`
    <style>
      @media (min-width: ${t}px) {
        ${fn.general.storyPreviewContainer} {
          border: 1px solid #EDEDED !important;
          border-radius: 3px;
          margin-top: 18px;
          margin-bottom: 14px;
        }

        html[data-page="feedPage"] ${fn.general.recommendationsContainer} {
          border: 1px solid #EDEDED !important;
          border-radius: 3px;
        }
      }
    </style>
  `}({minWidth:500}),function({minWidth:t}){hn.insertMultistyle`
    <style>
      @media (min-width: ${t}px) {
        ${fn.explorePage.searchResults} {
          width: 100%;
          max-width: 460px;
          margin: -16px auto 0;
        }

        /* thin border for posts */
        ${fn.explorePage.post} {
          position: relative;
        }
        ${fn.explorePage.post}::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 1;
          pointer-events: none;
          box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.3);
        }
      }
    </style>
  `}({minWidth:736}),function({minWidth:t}){hn.onDocClick((async e=>{if(window.innerWidth<t)return;const o=e.target.closest(fn.profilePage.post);if(!o)return;e.preventDefault(),e.stopPropagation();const n=o.getAttribute("href");(await $t("nav")).push(n)}),{capture:!0}),hn.insertMultistyle`
    <style>
      @media (max-width: ${t-1}px) {
        ${fn.profilePage.header} {
          margin-top: 20px !important;
        }
      }

      @media (min-width: ${t}px) {
        ${fn.profilePage.content} {
          padding-top: 0 !important;
        }

        ${fn.profilePage.header} {
          padding-top: 26px;
        }

        ${fn.profilePage.avatarWithStoryWrap} {
          margin-top: 6px;
        }

        ${fn.profilePage.username} {
          position: relative;
          top: -3px;
        }

        ${fn.profilePage.settingsMenuWrap} {
          background: #FFF !important;
        }

        ${fn.profilePage.settingsMenu} {
          background: #FAFAFA;
          width: 100%;
          max-width: 490px;
          margin: 0 auto;
          border-left: 1px solid #EDEDED;
          border-right: 1px solid #EDEDED;
        }
      }
    </style>
  `}({minWidth:736}),async function({minWidth:t}){const e=await $t("store");let o;async function n(){var t;const n=hn.$(fn.general.root);if(!n)return;if(o===n)return;let i;o=n;const r=location.pathname,a=null===(t=e.getState().navigation)||void 0===t?void 0:t.pageIdentifier;if(!a)return;const s="/create/story/"!==r&&r.startsWith("/create/");i=r.startsWith("/accounts/signup/")||"loginPage"===a||"unifiedHome"===a?{width:460,borders:!0}:s?{width:490,borders:!0}:"StoriesPage"===a?{width:460,borders:!1}:"exploreLandingPage"===a||"profilePage"===a?{width:760,borders:!1}:{width:550,borders:!1};const l=hn.$(fn.general.tabBar),c=hn.$(fn.general.header),d=hn.$(fn.general.content);l&&(l.style.opacity=0),c&&(c.style.opacity=0),d&&(d.style.transition=null,d.style.transform="translateY(3px)",d.style.opacity=0),await wt.send("ig.update-ig-view",{fullscreenWidth:i.width,withBorder:i.borders}),l&&(l.style.opacity=null),c&&(c.style.opacity=null),d&&(d.style.transition="transform 0.2s, opacity 0.2s",d.style.transform=null,d.style.opacity=null)}wt.on("ig.widescreen-toggled",n),hn.onDocMutations((()=>{window.innerWidth<t||n()}),!0)}({minWidth:460}),async function(){const t=await $t("nav");if(!t)return;const e=Symbol("handled");hn.onDocMutations((()=>{hn.$$(fn.profilePage.followersFollowingsLink).forEach((o=>{o[e]||(o[e]=!0,o.addEventListener("click",(async e=>{if(!(window.innerWidth>=725))return;e.preventDefault(),e.stopPropagation(),await wt.send("ig.force-small-iframe-width",!0);const n=document.body;n.style.opacity=0,n.style.transform="translateY(3px)",await hn.waitFor((()=>window.innerWidth<700)),await hn.sleep(100),t.push(o.getAttribute("href")),await hn.waitFor((()=>hn.$('html[data-page="followList"]'))),n.style.transition="all 0.3s ease",n.style.opacity=null,n.style.transform=null,await hn.sleep(300),n.style.transition=null,wt.send("ig.force-small-iframe-width",!1)}),{capture:!0}))}))}))}()}};let fn;function mn(){return hn.docElem}const{$utils:yn}=app;var vn={init:function(){bn=L.controller.getConfig().igSelectors,mo.onDocClick((t=>{const e=t.target.closest(".-wt5I");e&&setTimeout((()=>{document.body.contains(e)&&e.click()}),300)})),function(){const t=HTMLElement.prototype.getBoundingClientRect;HTMLElement.prototype.getBoundingClientRect=function(...e){const o=t.call(this,...e);return 0===o.height&&(o.height=1),o}}(),yn.insertMultistyle`
    <style>
      /* story spinner */
      .u6s6p {
        display: none !important;
      }
    </style>
  `,yn.insertMultistyle`
    <style>
      ${bn["story-container"]} {
        width: 100% !important;
        height: 100% !important;
      }

      ${bn["story-image"]},
      ${bn["story-video"]},
      ${bn["story-loading-preview"]} {
        object-fit: contain;
      }
    </style>
  `,yn.insertMultistyle`
    <style>
      .theme-night ${bn.storyViewer.pollContainer} {
        filter: url(#theme-reverse-filter);
        color: transparent;
      }

      ${bn.storyViewer.pollButtons} {
        font-family: inherit !important;
      }

      ${bn.storyViewer.pollAnswerDigitOrEmoji} {
        -webkit-text-fill-color: inherit !important;
      }

      ${bn.storyViewer.pollAnswerDigitOrEmoji} .emoji {
        filter: none !important;
        color: initial !important;
        -webkit-text-fill-color: initial !important;
      }
    </style>
  `,document.addEventListener("keyup",(t=>{if("Escape"===t.key){const t=yn.$(bn.storyViewer.closeButton);if(!t)return;t.click()}else if("ArrowLeft"===t.key){const t=yn.$(bn.storyViewer.prevButton);if(!t)return;t.click()}else if("ArrowRight"===t.key){const t=yn.$(bn.storyViewer.nextButton);if(!t)return;t.click()}})),function(){const t="__manageStoriesAutoplay";let e=null,o=!1;yn.onDocMutations((()=>{const n=yn.$(bn["stories-viewer"]);e&&!n&&(o=!1,mo.docElem.classList.remove("enable-stories-autoplay")),e=n;const i=yn.$(bn["story-video-play-button"]);o&&i&&!i[t]&&setTimeout((()=>{i[t]=!0,i.click()}),200)})),mo.onDocClick((e=>{const n=e.target.closest(bn["story-video-play-button"]);n&&!o&&(n[t]=!0,o=!0,mo.docElem.classList.add("enable-stories-autoplay"))})),yn.insertMultistyle`
    <style>
      .enable-stories-autoplay ${bn["story-video-play-button"]} {
        opacity: 0;
      }
    </style>
  `}(),function(){const t=window.addEventListener;window.addEventListener=(...e)=>{if("blur"!==e[0])return t.call(window,...e)}}()}};let bn;var _n={storySharingPost:!1};const{$utils:xn}=app;var wn={init:function(){Pn=L.controller.getConfig().igSelectors,xn.insertMultistyle`
    <style>
      ${Pn.storyCreation.topRightButton} {
        cursor: pointer;
      }
    </style>
  `,async function(){if(!await $t("store"))return;const t=CanvasRenderingContext2D.prototype.drawImage;CanvasRenderingContext2D.prototype.drawImage=function(...e){if(!(9===e.length&&e[0]instanceof HTMLImageElement&&"/create/story/"===location.pathname))return t.call(this,...e);const o=xn.$(Pn.storyCreation.root);if(!o)return t.call(this,...e);const n=window.devicePixelRatio;let i,r;o.offsetWidth/o.offsetHeight>9/16?(i=o.offsetHeight*(9/16),r=o.offsetHeight):(i=o.offsetWidth,r=o.offsetWidth/(9/16)),o.style.width=`${i}px`,o.style.height=`${r}px`,xn.$$("canvas").forEach((t=>{t.style.width=`${i}px`,t.style.height=`${r}px`,t.setAttribute("width",i*n),t.setAttribute("height",r*n)}));const a=e[0],s=.04,l=a.width/a.height,c=l>9/16*(1-s)&&l<(1+s)*(9/16)?"cover":"contain";this.restore();const d=i*n,p=r*n;"contain"===c&&(this.filter="blur(170px)",t.call(this,a,-300,-300,d+600,p+600),this.filter="none");const u=function({type:t,width:e,height:o,containerWidth:n,containerHeight:i,offset:r=0}){const a=e/o,s=n/i;return a>s&&"contain"===t||a<s&&"cover"===t?{dx:0+r,dy:(i-n/a)/2+r,width:n-2*r,height:n/a-2*r}:{dx:(n-i*a)/2+r,dy:0+r,width:i*a-2*r,height:i-2*r}}({type:c,width:a.width,height:a.height,containerWidth:d,containerHeight:p,offset:_n.storySharingPost?60:0});if(t.call(this,a,u.dx,u.dy,u.width,u.height),_n.storySharingPost){const t=xn.$("canvas").getContext("2d"),e=window.devicePixelRatio,o=_n.storySharingPost.owner.username,n=60/e,i=(u.dy+u.height+40)/e;t.save(),t.scale(e,e),t.fillStyle="white",t.shadowColor="rgba(150, 150, 150, 0.3)",t.shadowOffsetX=0,t.shadowOffsetY=1,t.shadowBlur=2,t.font="600 22px sans-serif",t.textAlign="left",t.textBaseline="top",t.fillText(`@${o}`,n,i),t.restore()}}}(),function(){const t=Symbol("handled");xn.onDocMutations((async()=>{const e=xn.$(Pn.storyCreation.root);if(!e)return;if(e[t])return;e[t]=!0;if(await wt.send("ig.is-fullscreen"))return;const o=document.documentElement;o.classList.add("story-creation-dark-background"),xn.onDocMutations((function t(){xn.$(Pn.storyCreation.root)||(xn.onDocMutations.off(t),o.classList.remove("story-creation-dark-background"))}))})),xn.insertMultistyle`
    <style>
      .story-creation-dark-background body {
        background: #0d0d0d;
      }
      .theme-night.story-creation-dark-background body {
        background: #fdfdfd;
      }
    </style>
  `}(),async function(){const t=await $t("http:retry-story-post");if(!t)return;$t.unlockOnNextTick("http:story-assist");const e=t.post.bind(t),o=async(t,n=1)=>{let i;console.log(`trying to post a story, attempt no.${n}`);try{i=await e(...t)}catch{i={status:"fail"}}return"fail"===i.status&&n<5?(await xn.sleep(3e3),o(t,n+1)):i};t.post=(...t)=>t[0].includes("/create/configure_to_story/")?o(t):e(...t)}(),function(){const t=Symbol("handled");xn.onDocMutations((()=>{const e=xn.$(Pn.storyCreation.downloadButton);e&&(e.parentNode[t]||(e.parentNode[t]=!0,e.remove()))}))}(),xn.insertMultistyle`
    <style>
      ${Pn.storyCreation.mentionBarContainer} {
        width: calc(100% - 100px) !important;
        height: 94px !important;
        top: 0 !important;
        margin-left: -100px !important;
      }

      ${Pn.storyCreation.mentionBar} {
        height: 100% !important;
        border-radius: 0 0 8px 0;
        position: static;
      }

      ${Pn.storyCreation.mentionReel} {
        height: 100% !important;
        position: static;
      }

      ${Pn.storyCreation.mentionReelRow} {
        height: 100% !important;
        align-items: center !important;
        position: static;
      }
      ${Pn.storyCreation.mentionReelRow}:not(:empty)::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 0 8px 8px 0 !important;
        background: rgba(0 , 0 , 0 , 0.2) !important;
      }

      ${Pn.storyCreation.mentionReelItem} {
        margin: 0 10px 0 0 !important;
        position: relative;
      }
      ${Pn.storyCreation.mentionReelItem}:last-child {
        margin-right: 0 !important;
      }
    </style>
  `,function(){const t=Symbol("handled");xn.onDocMutations((()=>{const e=xn.$(Pn.storyCreation.video);e&&(e[t]||(e[t]=!0,e.muted=!1,e.controls=!0,e.controlsList="nodownload noremoteplayback noplaybackrate",e.disablePictureInPicture=!0,setTimeout((()=>e.volume=1),100)))})),xn.insertMultistyle`
    <style>
      ${Pn.storyCreation.root} {
        background: #000;
      }

      ${Pn.storyCreation.videoWrap} {
        position: relative;
      }

      ${Pn.storyCreation.video} {
        max-width: 100%;
        max-height: 100%;
      }

      ${Pn.storyCreation.videoPoster} {
        display: none;
      }

      ${Pn.storyCreation.footer} {
        height: 70px;
        background: transparent;
        position: relative;
      }

      ${Pn.storyCreation.videoPlayButton} {
        display: none;
      }

      ${Pn.storyCreation.textColorPicker},
      ${Pn.storyCreation.drawColorPicker} {
        display: flex;
        flex-direction: column;
      }

      ${Pn.storyCreation.colorPickerSelectedCircle} {
        position: relative;
        left: -1px;
        top: -1px;
      }
    </style>
  `}(),function(){const t=Symbol();xn.onDocMutations((()=>{const e=xn.$(Pn.storyCreation.submitButton);e&&(e[t]||(e[t]=!0,e.addEventListener("click",(()=>{xn.$$("video").forEach((t=>t.pause()))}),!0)))}))}(),function(){const t=Event.prototype.preventDefault;Event.prototype.preventDefault=function(...e){var o,n;if(!this.type.startsWith("touch")||!(null===(o=(n=this.target).matches)||void 0===o?void 0:o.call(n,Pn.storyCreation.canvas)))return t.call(this,...e)}}(),async function(){const t=await $t("http");if(!t)return;const e=t.post.bind(t);t.post=(...t)=>((()=>{var e;if(!(null===(e=t[0])||void 0===e?void 0:e.includes("/configure_to_story")))return;const o=xn.$(Pn.storyCreation.uploadText);o&&(o.innerText="Publishing...")})(),e(...t));const o=Symbol();xn.onDocMutations((()=>{const t=xn.$(Pn.storyCreation.uploadText);t&&(t[o]||(t[o]=!0,t.innerText="Uploading...",t.insertAdjacentHTML("afterend",'\n      <div class="StoryUploadText">\n        This might take a minute. Please keep this tab open.\n      </div>\n    ')))})),xn.insertMultistyle`
    <style>
      ${Pn.storyCreation.uploadBar} {
        display: block;
        padding-top: 8px;
        height: 52px;
      }

      ${Pn.storyCreation.uploadText} {
        font-size: 14px;
        font-weight: 500;
        text-align: left;
      }

      .StoryUploadText {
        font-size: 14px;
        font-weight: 400;
        margin-top: 2px;
        color: #A0A0A0;
      }

      @media (max-width: 400px) {
        ${Pn.storyCreation.uploadBar} {
          padding-top: 9px;
        }
        ${Pn.storyCreation.uploadText} {
          font-size: 12px;
        }
        .StoryUploadText {
          font-size: 12px;
          margin-top: 0;
        }
      }
    </style>
  `}()}};let Pn;const{$utils:Cn}=app;var Sn={init:async function(){if(Mn=L.controller.getConfig().igSelectors,$n=await $t("store"),!$n)return;Cn.onDocClick((function(t){t.target.closest('[href="/direct/inbox/"]')&&(t.preventDefault(),t.stopPropagation(),wt.send("ig.open-sidebar-dm"))}),{capture:!0}),function(){const t=Symbol("handled");Cn.onDocMutations((async()=>{const o=Cn.$(Mn.profilePage.moreButton);if(!o)return;const n=$n.getState(),i=n.users.viewerId,r=n.users.users.get(i);if(location.pathname.split("/")[1]===r.username)return;let a=Cn.$(".write-button");if(a&&a!==o.previousElementSibling)return a.remove(),void(o[t]=!1);if(o[t])return;o[t]=!0;await e()&&(o.insertAdjacentHTML("beforebegin",'\n      <button class="write-button">\n        <svg xmlns="http://www.w3.org/2000/svg" width="19.998" height="17.224" viewBox="0 0 19.998 17.224">\n          <path d="M2.079.75h16.57L9.818 15.071l-1.3-9zm6.508 5.315l9.68-5.127" fill="none" stroke="currentColor" stroke-width="1.5"/>\n        </svg>\n      </button>\n    '),a=Cn.$(".write-button"),a.addEventListener("click",(()=>{wt.send("ig.open-sidebar-dm")})))})),Cn.insertMultistyle`
    <style>
      .write-button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 42px;
        height: 17px;
        margin-left: 8px;
        border: none;
        border-radius: 4px;
        color: #000;
        background: transparent;
        cursor: pointer;
        user-select: none;
        transform: scale(1.15);
      }

      ${Mn.profilePage.writeButton} {
        display: none;
      }

      ${Mn.profilePage.followButton} {
        width: auto;
        margin-left: 0;
      }

      ${Mn.profilePage.buttonsRow} {
        flex-grow: 0;
        flex-direction: row;
      }

      ${Mn.profilePage.blueButtonsWrap} {
        flex-grow: 0;
        flex-shrink: 0;
      }

      ${Mn.profilePage.subscribeButtonWrap} {
        flex-shrink: 1;
        overflow: hidden;
      }
    </style>
  `;const e=async()=>{const t=location.pathname.split("/")[1];return await Cn.waitFor((()=>{const e=$n.getState(),o=e.users.usernameToId.get(t);return e.users.users.get(o)||null}))}}()}};let Mn,$n;const{$utils:kn}=app;var Tn={init:async function(){if(Dn=await $t("store"),!Dn)return;An=L.controller.getConfig().igSelectors,function(){const t=Symbol("handled");kn.onDocMutations((()=>{const e=kn.$(An.profilePage.content);if(!e)return;if(e[t])return;e[t]=!0;const o=In({empty:!0});e.insertAdjacentHTML("afterbegin",o),(async()=>{try{var t;const o=location.pathname.split("/")[1],n=await kn.waitFor((()=>{const t=Dn.getState(),e=t.users.usernameToId.get(o);if(e)return t.users.users.get(e)}));if(!document.body.contains(e))return;const i=Object.values(Dn.getState().posts.byId.toJS()).filter((t=>{var e;return String(null===(e=t.owner)||void 0===e?void 0:e.id)===String(n.id)})).filter((t=>!t.productType||"feed"===t.productType||"igtv"===t.productType)).sort(((t,e)=>e.postedAt-t.postedAt)).slice(0,12),r={userId:n.id,username:n.username,bio:n.bio,postsCount:n.counts.media,followersCount:n.counts.followedBy,followingsCount:n.counts.follows,isPrivate:n.isPrivate,isVerified:n.isVerified,hasAvatar:n.profilePictureUrl.includes("150x150"),hasHighlights:n.highlightReelCount>0,lastPosts:i.map((t=>({ts:1e3*t.postedAt})))};if(Rn.grade=await wt.send("chrome-bus","insights.get-credibility-grade",r),!document.body.contains(e))return;Rn.engagement=function({user:t,posts:e}){const o=Dn.getState().users.viewerId===t.id;if(t.isPrivate&&!o||0===e.length)return{value:"N/A",color:"#D8DADD",label:""};const n=e.map((t=>t.comments+t.likes)).reduce(((t,e)=>t+e),0),i=e.length>0?n/e.length:0,r=t.followerCount>0?i/t.followerCount*100:0,a=`${r<5?(Math.round(10*r)/10).toFixed(1):Math.round(r).toString()}%`,s={value:a,color:"#797979",label:"average"},l={value:a,color:"#74BE86",label:"above avg"},c={value:a,color:"#74BE86",label:"high"},d={value:a,color:"#74BE86",label:"v. high"},p={value:a,color:"#74BE86",label:"extreme"},u=r/(64.18845*Math.pow(t.followerCount,-.2251755));if(u<.4)return s;if(u<.8)return l;if(u<1.2)return c;if(u<1.8)return d;return p}({user:{id:n.id,isPrivate:n.isPrivate,followerCount:(null===(t=n.counts)||void 0===t?void 0:t.followedBy)||0},posts:i.map((t=>({likes:t.numPreviewLikes||0,comments:t.numComments||0})))});const a=Dn.getState().users.viewerId;Rn.followStatus={show:String(a)!==String(n.id),value:n.followsViewer};kn.$(".profile-bar").outerHTML=In();Ee({anchor:kn.$(".profile-bar__info-circle"),class:"profile-bar__info-tooltip",text:"\n            <b>Account Grade</b>\n            <br/>\n            This estimates if Instagram account is<br/>\n            spam / inactive or a real person / business.\n            Inssist relies on Machine Learning to identify\n            the grade.\n            <br/><br/>\n\n            <b>Engagement Rate</b>\n            <br/>\n            Profile engagement rate is calculated as\n            <code>(likes + comments) / followers</code>, for the last<br/>\n            12 posts. The higher account engagement,<br/>\n            the more active the followers are.\n            <br/><br/>\n\n            <b>Follow Status</b>\n            <br/>\n            Shows if this account is following you or not.\n            <br/><br/>\n\n            Account Grade and Engagement Rate are<br/>\n            not available for private accounts.\n          "})}catch(t){console.error("ig profile bar controller → manageBarCreation:",t);const e=kn.$(".profile-bar");e&&e.remove()}})()}))}(),kn.insertMultistyle`
    <style>
      .profile-bar {
        height: 48px;
        border-bottom: 1px solid #DBDBDB;
        background: #FCFCFD;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        position: relative;
      }
      .profile-bar::before,
      .profile-bar::after {
        content: '';
        position: absolute;
        top: 0;
        bottom: -1px;
        width: calc(calc(100% - 400px) / 2);
      }
      .profile-bar::before {
        left: 0;
        background: linear-gradient(to right, white 40%, transparent);
      }
      .profile-bar::after {
        right: 0;
        background: linear-gradient(to left, white 40%, transparent);
      }

      .profile-bar__items {
        display: flex;
        flex-direction: row;
      }

      .profile-bar__item {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-right: 40px;
      }
      .profile-bar__item:last-child {
        margin-right: 0;
      }

      .profile-bar__value {
        color: #262626;
        font-weight: 600;
        flex-direction: row;
        display: flex;
      }

      .profile-bar__label {
        color: #999;
        font-weight: 500;
      }

      .profile-bar__info-circle.info-circle {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -6px;
        margin-left: 200px;
        z-index: 1;
        transition: opacity 0.2s;
      }
      .profile-bar:not(:hover) .profile-bar__info-circle {
        opacity: 0;
      }

      .profile-bar__info-tooltip {
        width: 306px;
      }

      @media (max-width: 400px) {
        .profile-bar::before,
        .profile-bar::after {
          display: none;
        }

        .profile-bar__item {
          margin-right: 24px;
        }
      }

      @media (max-width: 440px) {
        .profile-bar__info-circle {
          top: 5px;
          left: auto;
          right: 8px;
          margin-left: auto;
          margin-top: auto;
        }
      }
    </style>
  `}};let An,Dn;const Rn={grade:null,engagement:null,followStatus:null};function In({empty:t=!1}={}){return t?'\n      <div class="profile-bar"></div>\n    ':`\n    <div class="profile-bar">\n      <div class="profile-bar__items">\n        <div class="profile-bar__item">\n          <div class="profile-bar__value">\n            ${Rn.grade?`\n              <span style="color: ${Rn.grade.color}">${Rn.grade.value}</span>,\n              ${Rn.grade.label}\n            `:""}\n          </div>\n          <div class="profile-bar__label">\n            Account grade\n          </div>\n        </div>\n        <div class="profile-bar__item">\n          <div class="profile-bar__value">\n            <span style="color: ${Rn.engagement.color}">\n              ${Rn.engagement.value}\n            </span>\n            ${Rn.engagement.label?`, ${Rn.engagement.label}`:""}\n          </div>\n          <div class="profile-bar__label">\n            Engagement\n          </div>\n        </div>\n        ${Rn.followStatus.show?`\n          <div class="profile-bar__item">\n            <div class="profile-bar__value">\n              ${Rn.followStatus.value?"Yes":"No"}\n            </div>\n            <div class="profile-bar__label">\n              Follows me\n            </div>\n          </div>\n        `:""}\n      </div>\n      <div class="profile-bar__info-circle info-circle">?</div>\n    </div>\n  `}const{$utils:En}=app;var Bn={init:async function(){if(Ln=L.controller.getConfig().igSelectors,Fn=await $t("nav"),On=await $t("http"),Hn=await $t("store"),Vn=await $t("add-dispatch-listener"),!(Fn&&On&&Hn&&Vn))return;Vn((t=>{"STORY_CREATION_EXIT"===t.type&&(_n.storySharingPost=null)})),function(){let t;Vn((e=>{"POST_SHARE_ID_LOADED"!==e.type&&"POST_SHARE_IDS_LOADED"!==e.type||(t=e.postId)}));const e=Symbol("handled");En.onDocMutations((()=>{const o=En.$(Ln.dragPanel.sendEmailLink);if(!o)return;if(o[e])return;o[e]=!0,o.insertAdjacentHTML("beforebegin",'\n      <div class="share-to-story">\n        <div class="share-to-story__icon">\n          <svg class="share-to-story__icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12.474 22.779a11.28 11.28 0 01-5.294-1.32.777.777 0 11.732-1.37 9.741 9.741 0 006.775.884.777.777 0 01.353 1.513 11.326 11.326 0 01-2.566.293zm-7.205-2.871a.773.773 0 01-.534-.213 11.218 11.218 0 01-3.2-5.509.777.777 0 011.51-.366 9.667 9.667 0 002.757 4.748.777.777 0 01-.534 1.34zm-3.221-8.651h-.077a.776.776 0 01-.7-.849 11.174 11.174 0 01.995-3.632.777.777 0 011.408.656 9.618 9.618 0 00-.854 3.122.777.777 0 01-.772.703zm3.258-6.58a.777.777 0 01-.6-1.269q.1-.127.211-.25a.777.777 0 111.171 1.02c-.062.071-.122.143-.182.215a.776.776 0 01-.6.284zm12.543 16.62a.777.777 0 01-.4-1.443 9.7 9.7 0 00-4.975-18.03.777.777 0 110-1.554 11.255 11.255 0 015.773 20.917.77.77 0 01-.398.11z" fill="currentColor"/><path d="M17.723 10.788h-4.45v-4.45H11.72v4.45H7.27v1.553h4.45v4.45h1.553v-4.45h4.45z" fill="currentColor"/></svg>\n        </div>\n        <div class="share-to-story__text">\n          Share to Story\n        </div>\n      </div>\n    ');En.$(".share-to-story").addEventListener("click",(e=>{e.stopPropagation(),async function(t){const e=Hn.getState().posts.byId.get(t);if(!e)return;const o=await fetch(e.src,{credentials:"omit"}),n=await o.blob(),i=URL.createObjectURL(n),{width:r,height:a}=await new Promise((t=>{const e=new Image;e.src=i,e.addEventListener("load",(()=>{t({width:e.width,height:e.height})}))}));_n.storySharingPost=e,Hn.dispatch({type:"STORY_CREATION_SESSION_STARTED",entryPoint:"quick_cam_button",sessionId:Math.random().toString().slice(2),startTime:Date.now()}),Hn.dispatch({type:"STORY_CREATION_IMAGE_PROCESSED",flash:!1,location:null,orientation:0,sourceImage:n,sourceDataURL:i,width:r,height:a}),Fn.push("/create/story/")}(t),wt.send("ga.send-event","user","ig:share-to-story-click")}))})),En.insertMultistyle`
    <style>
      .share-to-story {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 8px 16px;
        cursor: pointer;
      }
      .share-to-story:hover {
        background: rgba(0, 0, 0, 0.05);
      }

      .share-to-story__icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        margin-right: 12px;
      }

      .share-to-story__icon-svg {
        width: 24px;
        height: 24px;
        position: relative;
        left: 1px;
      }

      .share-to-story__text {
      }
    </style>
  `}(),function(){const t=On.post.bind(On);On.post=(...e)=>("/create/configure_to_story/"===e[0]&&_n.storySharingPost&&(e[1]={...e[1],reshared_media_id:_n.storySharingPost.id,story_sticker_ids:`media_simple_${_n.storySharingPost.id}`,attached_media:JSON.stringify([{x:.5,y:.5,width:.5,height:.5,rotation:0,media_id:_n.storySharingPost.id,media_owner_id:_n.storySharingPost.owner.id,is_sticker:!0}])}),t(...e))}()}};let Ln,Fn,On,Hn,Vn;const{$utils:Nn}=app;var zn={init:function(){!async function(){const t=await $t("store");if(!t)return;const e=Symbol("handled");Nn.onDocMutations((()=>{const o=Nn.$(".get-insights-button-row");if(!o)return;if(o[e])return;o[e]=!0;const n=t.getState(),i=n.navigation.displayedRoute.split("/")[1],r=n.users.usernameToId.get(i);if(!r)return;const a=n.users.users.get(r);if(!a)return;const s=a.businessEmail;s&&o.insertAdjacentHTML("afterbegin",`\n      <a class="profile-email-button" href="mailto:${s}">\n        Email\n      </a>\n    `)})),Nn.insertMultistyle`
    <style>
      .profile-email-button {
        display: block;
        margin-right: 8px;
        margin-bottom: 12px;
        height: 30px;
        line-height: 28px;
        padding: 0 9px;
        font-weight: 600;
        color: #262626;
        background: transparent;
        border: 1px solid #dbdbdb;
        border-radius: 4px;
        outline: none;
        cursor: pointer;
        box-sizing: border-box;
      }
    </style>
  `}()}};function jn(){const t=window.require("CurrentUserInitialData");return(null==t?void 0:t.APP_ID)||"1217981644879628"}const{$utils:Un}=app;var Wn={init:function(){Gn=L.controller.getConfig().igSelectors,async function(){const t=await $t("store"),e=await $t("http");if(!t||!e)return;const o=Symbol("handled");Un.onDocMutations((()=>{const e=Un.$(Gn.general.actionDialogWithoutHeader);if(!e)return;if(e[o])return;e[o]=!0;const n=t.getState();if("postPage"!==n.navigation.pageIdentifier)return;const i=location.pathname.split("/")[2],r=n.posts.byId.toJS(),a=Object.values(r).find((t=>t.code===i));if(!a)return;if(a.owner.id!==n.users.viewerId)return;const s=Un.$(Gn.general.modalWindow);if(!s)return;e.firstChild.insertAdjacentHTML("afterend",'\n      <button class="edit-post-action-button">\n        Edit Caption\n      </button>\n    ');Un.$(".edit-post-action-button").addEventListener("click",(()=>{s.classList.add("post-editor"),e.innerHTML=`\n        <form class="post-editor__form">\n          <div class="post-editor__title">\n            Edit Caption\n          </div>\n          <textarea\n            class="post-editor__textarea"\n            placeholder="Write a caption..."\n            maxlength="2200"\n            spellcheck="false"\n            required\n          >${a.caption||""}</textarea>\n          <div class="post-editor__buttons">\n            <button class="post-editor__button-save button" type="submit">\n              Save Caption\n            </button>\n            <button class="post-editor__button-cancel button button_cancel">\n              Cancel\n            </button>\n          </div>\n          <div class="post-editor__error"></div>\n        </form>\n      `;const t=Un.$(".post-editor"),o=Un.$(".post-editor__textarea"),n=Un.$(".post-editor__button-save"),i=Un.$(".post-editor__button-cancel"),r=Un.$(".post-editor__error");setTimeout((()=>{o.focus(),o.setSelectionRange(o.value.length,o.value.length)}),300),o.addEventListener("input",(()=>{t.classList.remove("post-editor_with-error")})),t.addEventListener("submit",(async e=>{var s;let l;e.preventDefault(),o.disabled=!0,n.disabled=!0,i.disabled=!0,n.innerText="Saving...";try{l=await fetch(`https://i.instagram.com/api/v1/media/${a.id}/edit_media/`,{method:"POST",credentials:"include",headers:{"content-type":"application/json","x-csrftoken":window._sharedData.config.csrf_token,"x-ig-app-id":jn()},body:JSON.stringify({caption_text:Un.$(".post-editor__textarea").value})}),l=await l.json()}catch(e){l={error:e}}var c,d,p,u,h,g,f;"ok"===(null===(s=l)||void 0===s?void 0:s.status)?location.reload():(o.disabled=!1,n.disabled=!1,i.disabled=!1,n.innerText="Save Caption",t.classList.add("post-editor_with-error"),"igtv"===a.productType?r.innerHTML="\n              Instagram refused to edit caption.\n              Please use Instagram Mobile App to edit caption of this post.\n            ":r.innerText=(null===(c=l)||void 0===c||null===(d=c.error)||void 0===d?void 0:d.message)||(null===(p=l)||void 0===p||null===(u=p.error)||void 0===u||null===(h=u.responseObject)||void 0===h?void 0:h.message)||(null===(g=l)||void 0===g||null===(f=g.error)||void 0===f?void 0:f.responseText)||"Unknown error")})),i.addEventListener("click",(()=>{const t=Un.$(Gn.general.modal);if(!t)return;const e=new MouseEvent("mousedown",{bubbles:!0});t.dispatchEvent(e)}))}))})),Un.insertMultistyle`
    <style>
      .edit-post-action-button {
        height: 48px;
        padding: 4px 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 400;
        background: transparent;
        border: none;
        border-top: 1px solid #dbdbdb;
        cursor: pointer;
      }
      .edit-post-action-button:active {
        background: rgba(0, 0, 0, 0.1);
      }

      .post-editor {
        width: 380px !important;
        max-width: calc(100% - 26px) !important;
      }

      .post-editor__form {
        display: flex;
        flex-direction: column;
        margin: 16px;
        height: 330px;
        max-height: calc(100vh - 26px);
      }

      .post-editor__title {
        font-weight: 500;
        margin-left: 9px;
        margin-bottom: 12px;
      }

      .post-editor__textarea {
        color: #3F3E3F;
        border: 1px solid #EFEFEF;
        background: #F7F7F9;
        border-radius: 4px;
        resize: none;
        padding: 6px 8px;
        flex-grow: 1;
      }
      .post-editor__textarea::placeholder {
        color: #3F3E3F;
        opacity: 0.5;
      }
      .post-editor__textarea:disabled {
        opacity: 0.5;
      }
      .theme-night .post-editor__textarea {
        border-color: #101010;
        background: #060606 !important;
      }

      .post-editor__buttons {
        display: flex;
        flex-direction: row;
        margin-top: 12px;
      }

      .post-editor__error {
        display: none;
        color: #E34E21;
        margin-top: 12px;
        line-height: 19px;
      }
      .post-editor_with-error .post-editor__error {
        display: block;
      }
    </style>
  `}()}};let Gn;const{$utils:qn}=app;var Yn={init:async function(){if(Xn=L.controller.getConfig().igSelectors,Qn=await $t("add-dispatch-listener"),!Qn)return;(function(){const t=Symbol("handled");qn.onDocMutations((()=>{const e=qn.$(Xn.postCreation.captionContainer);e&&(e[t]||(e[t]=!0,e.insertAdjacentHTML("beforeend",'\n      <div class="post-caption-limits">\n        <svg class="post-caption-limits__icon" xmlns="http://www.w3.org/2000/svg" width="28.824" height="26.006" viewBox="0 0 28.824 26.006">\n          <path d="M10.948 1.999a4 4 0 016.926 0l10.407 18.007a4 4 0 01-3.463 6H4.006a4 4 0 01-3.463-6z" fill="currentColor"/>\n          <path class="exclamation" d="M13.622 17.079l-.748-9.537 2.972.019-.753 9.518zm-.613 1.428h2.7v2.663h-2.7z" fill="#fff"/>\n        </svg>\n        <div class="post-caption-limits__text"></div>\n      </div>\n    ')))}))})(),qn.insertMultistyle`
    <style>
      .post-caption-limits--show ${Xn.postCreation.captionContainer} {
        padding-bottom: 32px;
      }

      .post-caption-limits--show ${Xn.postCreation.submitPostButton} {
        opacity: 0.3;
        pointer-events: none;
      }

      .post-caption-limits {
        display: flex;
        flex-direction: row;
        align-items: center;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 0 18px 8px;
        color: #E34E21;
      }
      html:not(.post-caption-limits--show) .post-caption-limits {
        display: none;
      }
      .theme-night .post-caption-limits {
        filter: url(#theme-reverse-filter);
        color: #E94351;
      }

      .post-caption-limits__icon {
        width: 14px;
        height: 14px;
        margin-right: 8px;
      }

      .post-caption-limits__text {
        font-size: 14px;
      }
    </style>
  `,Qn((t=>{if("CREATION_CAPTION_CHANGED"!==t.type)return;const e=function(t){const e=2200,o=30,n=30,i=(t.match(/@[\p{L}\d_]+/gu)||[]).length,r=(t.match(/#[\p{L}\d_]+/gu)||[]).length;return t.length>e?`Caption length exceeded: ${t.length} / ${e}`:i>o?`Mention limit exceeded: ${i} / ${o}`:r>n?`Hashtag limit exceeded: ${r} / ${n}`:null}(t.caption||"");qn.docElem.classList.toggle("post-caption-limits--show",!!e);const o=qn.$(".post-caption-limits__text");o&&(o.innerText=e)}))}};let Xn,Qn;const{$utils:Kn}=app;var Zn={init:async function(){if(Jn=L.controller.getConfig().igSelectors,ti=await $t("http"),ei=await $t("store"),oi=await $t("add-dispatch-listener"),!ti||!ei||!oi)return;!function(){let t=0;const e=ti.post;ti.post=async(...i)=>{const r=i[0],a=r.includes("/create/configure")&&!r.includes("story")||r.includes("/igtv/configure_to_igtv"),s=r.includes("/media/configure_to_clips");if(!(a||s))return e.call(ti,...i);const l=()=>{ei.dispatch({type:"UPDATE_UPLOAD_TEXT",text:"Publishing Post..."}),setTimeout((()=>o()))};let c;l();try{c=await e.call(ti,...i)}catch(t){c={status:"fail"}}return"fail"===c.status?t<20?(t+=1,requestAnimationFrame((()=>{l()})),setTimeout((()=>{ti.post(...i)}),5*Kn.time.SECOND),c):(t=0,requestAnimationFrame((()=>{ei.dispatch({type:"UPDATE_UPLOAD_TEXT",text:c.message?`Error: ${c.message}`:"Unknown error."}),n();const t=Kn.$(Jn.general.uploadPanel);if(!t)return;t.insertAdjacentHTML("beforeend",'\n        <button class="retry-upload-button clickable">\n          Retry\n        </button>\n      ');const e=Kn.$(".retry-upload-button");e.addEventListener("click",(()=>{l(),ti.post(...i),e.remove()}))})),c):(t=0,requestAnimationFrame((()=>{ei.dispatch({type:"UPDATE_UPLOAD_TEXT",text:"Done"}),n()})),c)};const o=()=>{if(Kn.$(".PublishingDisclaimer"))return;const t=Kn.$(Jn.general.publishingBarText);t&&t.insertAdjacentHTML("beforeend",'\n      <div class="PublishingDisclaimer">\n        This might take a minute.\n        Please keep this tab open.\n      </div>\n    ')},n=()=>{const t=Kn.$(".PublishingDisclaimer");t&&t.remove()};Kn.insertMultistyle`
    <style>
      .PublishingDisclaimer {
        color: #A0A0A0;
        font-weight: 400;
        margin-top: 3px;
      }

      .retry-upload-button {
        font-weight: 600;
        color: #0095f6;
        padding: 0;
        border: 0;
        background: transparent;
        cursor: pointer;
      }
    </style>
  `}()}};let Jn,ti,ei,oi;const{$utils:ni}=app,ii={init:async function(){this.sel=L.controller.getConfig().igSelectors,this.store=await $t("store"),this.store&&(wt.on("ig.creation-get-caption",this.getCaption.bind(this)),wt.on("ig.creation-set-caption",this.setCaption.bind(this)),this.watchCreationSession(),this.notifyVideoChange())},getCaption:function(){var t,e;return(null===(t=this.store.getState().creation)||void 0===t||null===(e=t.finalizedMedia)||void 0===e?void 0:e.caption)||""},setCaption:function(t){this.store.dispatch({type:"CREATION_CAPTION_CHANGED",caption:t});const e=ni.$(this.sel.postCreation.captionTextarea);e&&(e.scrollTop=e.scrollHeight)},watchCreationSession:function(){let t=!1,e=!1,o=!1;this.store.subscribe((()=>{var n;const i=this.store.getState(),r=null===(n=i.navigation)||void 0===n?void 0:n.pageIdentifier;if(!r)return;const a=r.startsWith("Creation"),s=r.startsWith("StoryCreation"),l=a||s;if(l!==o)if(o=l,l){var c,d;const o=null===(c=i.creation.sourceVideo)||void 0===c?void 0:c.file,n=null===(d=i.storyCreation.sourceVideo)||void 0===d?void 0:d.file;t=s,e=!(!o&&!n),wt.send("ig.creation-session-start",{isStory:t,isVideo:e})}else wt.send("ig.creation-session-end",{isStory:t,isVideo:e})}))},notifyVideoChange:async function(){let t=null;this.store.subscribe((()=>{var e,o;const n=this.store.getState(),i=null===(e=n.creation)||void 0===e?void 0:e.sourceVideo,r=null===(o=n.storyCreation)||void 0===o?void 0:o.sourceVideo,a=null==i?void 0:i.dataURL,s=null==r?void 0:r.dataURL,l=a||s||null;l!==t&&(t=l,wt.send("ig.creation-video-change",{url:l}))}))}},{$utils:ri}=app,ai={init:function(){this._supportExtensionLinks()},_supportExtensionLinks:function(){ri.onDocClick((t=>{const e=t.target.closest('[href^="chrome-extension://"]');e&&(t.preventDefault(),t.stopPropagation(),wt.send("ig.open-link",e.getAttribute("href")))}))}};var si={init:function(){this._injectVideoSupportCode()},_injectVideoSupportCode:function(){window.inssist.creationSelectVideo=t=>async e=>{try{const o=window.require,{browserHistory:n}=o("browserHistory");let i,r;{let t;try{t=o("polarisReadVideoFile")}catch{t=o("PolarisreadVideoFile")}i=t.readVideoFile}{let t;try{t=o("polarisGetVideoCoverPhoto")}catch{t=o("PolarisgetVideoCoverPhoto")}r=t.getVideoCoverPhoto}const a=String(Date.now()),s=`feed_${a}`,l=await i(t),c=await r(l,!0);e({type:"CREATION_VIDEO_PROCESSED",dataURL:l.src,entityName:s,file:t,uploadId:a,uploadMediaHeight:l.videoHeight,uploadMediaWidth:l.videoWidth,uploadMediaDurationMs:Math.floor(1e3*l.duration),videoTransform:c.videoTransform,mediaPublishMode:"default"}),e({type:"CREATION_VIDEO_COVER_PHOTO_UPDATED",dataURL:c.dataURL,entityName:s,file:c.file,uploadId:a,uploadMediaHeight:c.uploadMediaHeight,uploadMediaWidth:c.uploadMediaWidth}),n.push("/create/style/")}catch(t){console.error("failed to select video",t)}}}};const{$later:li,$coverAssist:ci,$reels:di,$utils:pi,$musicAssist:ui}=app;function hi(){const t=L.controller.getConfig().igSelectors,e=Symbol("handled");pi.onDocMutations((()=>{const o=pi.$(t.general.splashScreen);o&&(o[e]||(o[e]=!0,o.insertAdjacentHTML("afterbegin",`\n      <div class="navigation-spinner">\n        ${bo()}\n      </div>\n    `)))})),pi.insertMultistyle`
    <style>
      ${t.general.splashScreen} > *:not(.navigation-spinner) {
        display: none;
      }

      .navigation-spinner {
        position: fixed;
        top: 50%;
        left: 50%;
        width: 32px;
        height: 32px;
        margin-left: -16px;
        margin-top: -16px;
        pointer-events: none;
        z-index: 0;
      }
    </style>
  `}var gi={controller:{init:async function(){window.ig=mo,fo.controller.init(),pi.iframe.isIframe()&&async function(){if(!pi.ls.get("inssist.isDevelopment"))return;window.$=pi.$,window.$$=pi.$$,window.sel=L.controller.getConfig().igSelectors,window.store=await mo.require("store"),Object.defineProperty(window,"state",{get:function(){const t=window.store.getState();return JSON.parse(JSON.stringify(t))}});const t=await mo.require("add-dispatch-listener");let e=!1;window.showActions=()=>{e=!0},window.hideActions=()=>{e=!1},t((t=>{e&&console.warn(t)}))}();if(!pi.iframe.isIframe())return Pe.controller.init(),Ye.controller.init(),qe.controller.init(),void I.controller.init();const t=pi.iframe.isIframe("inssist-ig"),e=pi.iframe.isIframe("inssist-dm");if(t)return pe.controller.init(),Qt.controller.init(),ai.init(),hi(),$t.lock("http"),$t.lock("http:story-assist"),Ht.controller.init(),so.controller.init(),It.controller.init(),Ct.controller.init(),Ft.controller.init(),li.controller.init(),Oo.init(),si.init(),jo.init(),Go.init(),Xo.init(),Jo.init(),gn.init(),vn.init(),wn.init(),Sn.init(),Tn.init(),Bn.init(),St.controller.init(),ci.controller.init(),Pt.controller.init(),ui.controller.init(),zn.init(),Wn.init(),Yn.init(),Zn.init(),di.controller.init(),we.controller.init(),ii.init(),co.uploadBarController.init(),zo.init(),await pi.waitForDocumentReady(),void wt.send("ig.ready");e&&(pe.controller.init(),ai.init(),hi(),await pi.waitForDocumentReady(),oe.controller.init(),ge.controller.init())}}};const{$startup:fi}=app;fi.controller={init:function(){gi.controller.init()}},fi.controller.init()}();