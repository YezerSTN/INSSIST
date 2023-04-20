!function(){function t(t){return Array.isArray(t)?t:[t]}function e(e,n=document){e=t(e);for(const t of e){const e=n.querySelector(t);if(e)return e}return null}function n(e,n=document){e=t(e);const o=[];for(const t of e){const e=n.querySelectorAll(t);for(const t of e)o.includes(t)||o.push(t)}return o}const o=36e5,i=864e5;var r={SECOND:1e3,MINUTE:6e4,HOUR:o,DAY:i,WEEK:6048e5,MONTH:26784e5};function s(t){try{return JSON.parse(t)}catch(t){return null}}var a={createName:function(t,e){return`${t}|${JSON.stringify(e)}`},getName:l,getParams:function(){return s(window.self.name.split("|")[1])||{}},isIframe:function(t=null){return window.self!==parent&&(!t||l()===t)}};function l(){return window.self.name.split("|")[0]||null}const c={get:function(t,e){if(!this._supported())return e;const n=localStorage.getItem(t);if(null==n)return e;if("true"===n)return!0;if("false"===n)return!1;if(n.startsWith("[")||n.startsWith("{"))return JSON.parse(n);const o=Number(n);return Number.isNaN(o)?n:o},set:function(t,e){if(this._supported())try{"string"==typeof e?localStorage.setItem(t,e):localStorage.setItem(t,JSON.stringify(e))}catch(n){console.error("local-storage-json: failed to set",{key:t,value:e,details:n})}},has:function(t){return!!this._supported()&&t in localStorage},remove:function(t){this._supported()&&localStorage.removeItem(t)},_supported:function(){return"undefined"!=typeof window&&!!window.localStorage}};var d={unique:function(t){return Array.from(new Set(t))},gaussian:u,gaussianInt:function(t,e){return Math.round(t+u()*(e-t))},forceLayout:function(){document.body.getBoundingClientRect()},hashCode:p,pseudorandom:function(t){return 16807*Math.max(Math.abs(p(t)),1)%2147483647/2147483646},rotate:function(t,e=1){const n="slashed.io";let o="";return Array.from(t).forEach(((t,i)=>{const r=n[i%n.length].charCodeAt(),s=(t.charCodeAt()+e*r+65536)%65536;o+=String.fromCharCode(s)})),o},getUnixTime:function(){return Math.round(Date.now()/1e3)},takeBetween:function(t,e,n){const o=t.split(e)[1];if(!o)return null;return o.split(n)[0]||null},takeAllBetween:function(t,e,n){return t.split(e).slice(1).map((t=>t.split(n)[0]))},capitalize:function(t){return t.charAt(0).toUpperCase()+t.substr(1).toLowerCase()},getIntegralNumberPart:function(t){const e=Math.abs(t);return t>0?Math.floor(e):-Math.floor(e)},getFractalNumberPart:function(t){const e=Math.abs(t);return Number((e-Math.floor(e)).toFixed(12))}};function u(){let t=0;for(let e=0;e<6;e+=1)t+=Math.random();return t/6}function p(t){if(!t)return 0;let e,n,o=0;if(0===t.length)return o;for(e=0;e<t.length;e++)n=t.charCodeAt(e),o=(o<<5)-o+n,o|=0;return o}var h=document.documentElement;async function g(t,e=null){let n,o;return"number"==typeof e?(n=e,o=100):e?(n=e.timeout||3e4,o=e.frequency||100):(n=3e4,o=100),new Promise(((e,i)=>{const r=t();if(r)return void e(r);const s=setInterval((()=>{const n=t();n&&(clearInterval(s),e(n))}),o);setTimeout((()=>{clearInterval(s),e(null)}),n)}))}function f(t,e){return m(e)||(e=JSON.stringify(e)),`${encodeURIComponent(t)}=${encodeURIComponent(e)}`}function m(t){return"string"==typeof t||"number"==typeof t||"boolean"==typeof t}function y(t,e){if(t[0]!==e[0])return!1;const n=Math.min(t.length,e.length);if(0===n)return"";const o=t.substr(0,n);return o===e.substr(0,n)?o:y(t.substr(0,n-1),e.substr(0,n-1))}function v(t){return t.toLowerCase().replace(/[ .,?!\-—–+=_%:;$#@/{}()]/g,"")}var b=Object.assign((function(t,e={}){document.addEventListener("click",t,e)}),{off:function(t,e={}){document.removeEventListener("click",t,e)}});function w(){const t=[];return Object.assign(e,{handle:function(t){if("function"!=typeof t)return void console.error("function is expected");e(t)},clear:function(){t.length=0},off:function(e){const n=t.indexOf(e);-1!==n&&t.splice(n,1)},isEmpty:function(){return 0===t.length}});function e(...e){"function"==typeof e[0]?t.push(e[0]):t.forEach((t=>t(...e)))}}var x=Object.assign((function(t,e=!1){0===_.length&&(P=new MutationObserver((t=>{for(const e of _){P.disconnect();try{e(t)}catch(t){console.error("onDocMutations",t)}if(!P)return;P.observe(document.documentElement,{attributes:!0,childList:!0,subtree:!0})}})),P.observe(document.documentElement,{attributes:!0,childList:!0,subtree:!0}));_.push(t),e&&t()}),{off:function(t){const e=_.indexOf(t);if(-1===e)return;_.splice(e,1),0===_.length&&(P.disconnect(),P=null)}});const _=[];let P;function S(e,...n){let o=0;return e.join("###").split(",").join("\n,\n").split("{").join("\n{").split("\n").map((e=>{if(!e.includes("###"))return e;const i=t(n[o]).map((t=>e.split("###").join(t))).join(",\n");return o+=1,i})).join("\n").split(";").join(" !important;").replace(/!important\s*!important/g,"!important")}function $(...t){const e=S(...t);document.head.insertAdjacentHTML("afterbegin",e)}function k(...t){const e=S(...t).split("!important").join("");document.head.insertAdjacentHTML("afterbegin",e)}var C={init:function(t){if(!t)return;if(t[M])return;t[M]=!0;let e=!1;t.addEventListener("mouseleave",(()=>{e=!1})),t.addEventListener("mousewheel",(n=>{n.deltaX&&(e=!0),e||(n.preventDefault(),t.scrollLeft+=n.deltaY)}))}};const M=Symbol("handled");var T={};Object.assign(T,{$:e,$$:n,ls:c,safe:function(t,e=null){try{const n=t();return n instanceof Promise?new Promise(((t,o)=>{n.then(t).catch((n=>{n&&console.error(n),t(e)}))})):n}catch(t){return console.error(t),e}},sleep:async function(t){if("number"==typeof t&&Number.isFinite(t)){const e=t;await new Promise((t=>setTimeout(t,e)))}else{if(!t||"object"!=typeof t||t.constructor!==Object)throw new Error("unexpected sleep function argument: number or object expected, got",t);{const{min:e,max:n}=t.longBreak&&Math.random()<1-Math.pow(.5,1/t.longBreak.every)?{min:0,max:0,...t.longBreak}:{min:0,max:0,...t},o=n-e,i=e+d.gaussianInt(0,o);if(0===i)return;await new Promise((t=>setTimeout(t,i)))}}},docElem:h,waitFor:g,createUrl:function(t,e={}){const n=function(t){return Object.keys(t).map((e=>{const n=t[e];return m(n)?f(e,n):Array.isArray(n)?n.map((t=>f(e,t))).join("&"):null})).filter(Boolean).join("&").replace(/%5B/g,"[").replace(/%5D/g,"]")}(e);return n?`${t}?${n}`:t},setCookie:function(t,e){document.cookie=`${t}=${e}; path=/`},fuzzyCheck:function(t,e,n=1){if(t=v(t),""===(e=v(e)))return!0;for(;t.length>0;){const o=y(t,e);if(o.length>=n||o.length>0&&e.length<n){if(t=t.substr(o.length),""===(e=e.substr(o.length)))return!0}else t=t.substr(1)}return!1},onDocClick:b,iframeUtils:a,createEmitter:w,onDocMutations:x,safeJsonParse:s,removeFromArray:function(t,e){let n;n="function"==typeof e?t.findIndex(e):t.indexOf(e),-1!==n&&t.splice(n,1)},insertMultistyle:$,loadVideoMetadata:async function(t){const e="string"==typeof t?t:URL.createObjectURL(t),n=document.createElement("video");n.src=e,n.muted=!0,n.volume=0,n.preload="metadata",n.play();const o={};return await new Promise(((t,e)=>{n.addEventListener("loadedmetadata",(async()=>{await g((()=>n.webkitAudioDecodedByteCount),100),o.width=n.videoWidth,o.height=n.videoHeight,o.duration=n.duration,o.hasAudio=n.webkitAudioDecodedByteCount>0,t()})),n.addEventListener("error",(()=>{e(n.error)}))})),n.remove(),o},waitForDocumentReady:async function(){await g((()=>document.body))},smartHorizontalScroll:C,createResolvablePromise:function(){let t;const e=new Promise((e=>{t=e}));return Object.defineProperty(e,"resolve",{get:()=>t}),e},time:r,iframe:a});var E={selectors:{topNav:[".PolarisNavigation > .PolarisDesktopNav",".PolarisDirectShell_DEPRECATED > .PolarisDesktopNav",".PolarisDesktopNav._acum"],newPostMenuItem:[".XrOey:nth-child(3)",".PolarisDesktopNav._acut:nth-child(3)"],newPostButton:[".ctQZg button",".PolarisCreationIcon button",".PolarisNavigation .PolarisCreationNavItem a"],modalTitle:[".Yx5HN h1",".IGDSDialog h1 > div"],creationBody:[".uYzeu","._ac2r",".PolarisCreationModalBodyV2.x6ql1ns",".IGDSBox + .PolarisCreationModalBodyV2:nth-child(2)"],creationBodyRight:[".IJeHu > div > div",".PolarisCreationModalBodyV2._ac2v",".PolarisCreationModalBodyV2.x1f4304s"],creationDndBody:["._C8iK > .YBx95",".Dh40d",'._ac2t > .PolarisIGCoreBox[style*="height: 100%"]','.PolarisCreationModalBodyV2 > div[style*="height: 100%"]'],creationDndText:["._C8iK > .YBx95 h2",".Yx5HN .Dh40d h2",'._ac2t svg[height="77"] + .PolarisIGCoreBox h2'],creationDndIcon:["._C8iK > .YBx95 svg",".Yx5HN .Dh40d svg","._ac2t > .PolarisIGCoreBox svg"],creationLoadingBar:['._ac2r .PolarisCreationLoadingBar[data-visualcompletion="loading-state"]'],creationRatioToggler:[".czW__ > div:first-child .RJJyf > button",".PolarisCreationMediaPreviewV2 > div:first-child div:not([class]) button"],creationRatioOptionVertical:[".YAPUk button:nth-of-type(3)",".PolarisCreationMediaPopover > button:nth-of-type(3)"],creationGeoOption:[".brfp7 div:not([class])","div.PolarisCreationLocationInput"],creationAccessibilityDropdown:[":not(.n6uTB) + .n6uTB",".PolarisCreationModalComposeSettingsContent > div:not([class]) + .PolarisCreationModalComposeExpandInput"],creationAdvancedDropdown:".n6uTB + .n6uTB",creationDropdown:[".PolarisCreationModalComposeSettingsContent > div:not([class]) ~ .PolarisCreationModalComposeExpandInput"],creationBottomHr:[".W4P49",".PolarisCreationModalComposeSettingsContent hr"],creationNextButton:[".WaOAr .yWX7d","div.PolarisIGCoreModalHeader:last-child button","div.PolarisIGCoreModalHeader:last-child .Pressable"],creationPublishingSpinnerContainerWrap:['._ac2t > .PolarisIGCoreBox[style*="width: 100%"]'],creationPublishingSpinnerContainer:['div[style*="height: 96px"][style*="width: 96px"]'],creationPublishingSpinner:['img[src*="creation/spinner"]','div[style*="height: 96px"][style*="width: 96px"] img[src*=".gif"]'],creationCarouselAddMediaButton:[".czW__ > .Xf6Yq",".PolarisCreationMediaPreviewV2 > ._abck div:not([class])"],uploadForm:[".BaseDialog form.PolarisImageFileForm"],followSuggestionList:[".PolarisFeedSidebar:first-child + div .PolarisIGVirtualList > div"]},controller:{init:function(){}}},A={};function D(t,{isCreatingReels:e=(()=>!1),isSharingToFeed:n=(()=>!1),onSuccess:o=(()=>{})}){const i=t.post;t.post=async(...r)=>{if(!e())return i.call(t,...r);if(r[0].includes("/rupload_igvideo")){const e=r[2].headers,n=JSON.parse(e["X-Instagram-Rupload-Params"]);return n.is_igtv_video=!1,n.is_clips_video=!0,n.is_unified_video=!1,n.uses_original_audio=!0,n.audio_type="original_sounds",e["X-Instagram-Rupload-Params"]=JSON.stringify(n),i.call(t,...r)}if(r[0].includes("/create/configure")||r[0].includes("/media/configure")||r[0].includes("/igtv/configure_to_igtv")){r[0]="https://i.instagram.com/api/v1/media/configure_to_clips/",r[1].clips_uses_original_audio=1,r[1].uses_original_audio=1,r[1].original_audio=1,r[1].audio=1,r[1].clips_audio=1,r[1].clips_with_audio=1,r[1].with_audio=1,r[1].enable_audio=1,r[1].clips_enable_audio=1,r[1].clips_audio_enable=1,r[1].audio_enable=1,r[1].audio_type="original_sounds",n()&&(r[1].clips_share_preview_to_feed=1);const e=await i.call(t,...r);return"ok"===(null==e?void 0:e.status)&&o(),e}return i.call(t,...r)}}E.suggestionController={init:function(){this._state=this._readState(),this._createSuggestion(),this._injectStyles()},_readState:function(){return T.ls.get("inssist.hrpSuggestion",{showCount:0,clicked:!1})},_transaction:function(t){t(this._state),T.ls.set("inssist.hrpSuggestion",this._state)},_shouldShow:function(){return this._state.showCount<6&&!this._state.clicked},_createSuggestion:function(){if(!this._shouldShow())return;const t=Symbol("handled");T.onDocMutations((()=>{const e=T.$(E.selectors.followSuggestionList);if(!e)return;if(e[t])return;e[t]=!0;const n=this._renderSuggestion();e.insertAdjacentHTML("afterbegin",n),A.controller.sendEvent("user","harpa-suggestion:show"),0===this._state.showCount&&A.controller.sendEvent("user","harpa-suggestion:show-unique"),this._transaction((t=>t.showCount+=1));T.$(".Suggestion").addEventListener("click",(t=>{this._transaction((t=>t.clicked=!0)),A.controller.sendEvent("user","harpa-suggestion:click")}))}))},_renderSuggestion:function(){return`\n      <a class="Suggestion" target="_blank" href="https://harpa.ai/case/chatgpt-for-instagram">\n        <img class="Suggestion__avatar" src="${window.inssist.url("/img/harpa-avatar.png")}"/>\n        <div class="Suggestion__body">\n          <div class="Suggestion__title">HARPA AI</div>\n          <div class="Suggestion__subtitle">Generate content with ChatGPT</div>\n        </div>\n        <div class="Suggestion__link">Open</div>\n      </a>\n    `},_injectStyles:function(){T.insertMultistyle`
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
    `}},A.controller={sendEvent:function(...t){window.postMessage({type:"ga.send-event",args:t})}};var R={},L={},B={},I={},F=1;I={nextValue:function(){return(F=(9301*F+49297)%233280)/233280},seed:function(t){F=t}};var O,z,H,N="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-";function V(){H=!1}function j(t){if(t){if(t!==O){if(t.length!==N.length)throw new Error("Custom alphabet for shortid must be "+N.length+" unique characters. You submitted "+t.length+" characters: "+t);var e=t.split("").filter((function(t,e,n){return e!==n.lastIndexOf(t)}));if(e.length)throw new Error("Custom alphabet for shortid must be "+N.length+" unique characters. These characters were not unique: "+e.join(", "));O=t,V()}}else O!==N&&(O=N,V())}function U(){return H||(H=function(){O||j(N);for(var t,e=O.split(""),n=[],o=I.nextValue();e.length>0;)o=I.nextValue(),t=Math.floor(o*e.length),n.push(e.splice(t,1)[0]);return n.join("")}())}B={get:function(){return O||N},characters:function(t){return j(t),O},seed:function(t){I.seed(t),z!==t&&(V(),z=t)},lookup:function(t){return U()[t]},shuffled:U};var W="object"==typeof window&&(window.crypto||window.msCrypto),q=W&&W.getRandomValues?function(t){return W.getRandomValues(new Uint8Array(t))}:function(t){for(var e=[],n=0;n<t;n++)e.push(Math.floor(256*Math.random()));return e},Y=function(t,e,n){for(var o=(2<<Math.log(e.length-1)/Math.LN2)-1,i=-~(1.6*o*n/e.length),r="";;)for(var s=t(i),a=i;a--;)if((r+=e[s[a]&o]||"").length===+n)return r};var G,X,Q=function(t){for(var e,n=0,o="";!e;)o+=Y(q,B.get(),1),e=t<Math.pow(16,n+1),n++;return o};var J=function(t){var e="",n=Math.floor(.001*(Date.now()-1567752802062));return n===X?G++:(G=0,X=n),e+=Q(7),e+=Q(t),G>0&&(e+=Q(G)),e+=Q(n)};var K,Z=function(t){return!(!t||"string"!=typeof t||t.length<6)&&!new RegExp("[^"+B.get().replace(/[|\\{}()[\]^$+*?.-]/g,"\\$&")+"]").test(t)},tt=!1;var et=(tt||(tt=!0,K={},K=0),K||0);function nt(){return J(et)}var ot=nt;(L=nt).generate=ot;var it=function(t){return B.seed(t),L};L.seed=it;var rt=function(t){return et=t,L};L.worker=rt;var st=function(t){return void 0!==t&&B.characters(t),B.shuffled()};L.characters=st;var at=Z;L.isValid=at,R=L;var lt={on:function(t,e){pt();(ct[t]||(ct[t]=[])).push(e)},off:function(t,e){const n=ct[t];if(!n)return;for(;;){const t=n.findIndex((t=>t===e));if(-1===t)break;n.splice(t,1)}},send:function(t,...e){let n;const o=e[e.length-1];"function"==typeof o?(n=o,e=e.slice(0,-1)):n=null;return new Promise((o=>{chrome.runtime.sendMessage({[dt]:t,[ut]:e},(t=>{chrome.runtime.lastError||(n&&n(t),o(t))}))}))}};const ct={},dt="__$chromeBus.name",ut="__$chromeBus.args";function pt(){const t=pt;t.init||(t.init=!0,chrome.runtime.onMessage.addListener(((t,e,n)=>{const o=t["__$chromeBus.name"];if(!o)return!1;const i=t["__$chromeBus.args"]||[],r=ct[o]||[];return 0!==r.length&&((async()=>{const t=await Promise.all(r.map((t=>t(...i)))),e=t[t.length-1];n(e)})(),!!n)})))}var ht=lt;const gt="__iframeBus.name",ft="__iframeBus.args",mt="__iframeBus.callbackId",yt="undefined"!=typeof parent&&parent!==window;function vt(t,e){const n=_t(t),o=e["__iframeBus.handlers"]||(e["__iframeBus.handlers"]={});o[t]=async o=>{if(o.data["__iframeBus.name"]===n){const n=o.data["__iframeBus.args"]||[],i=o.data["__iframeBus.callbackId"]||null,r=await e(...n);i&&xt(`${t}:response-${i}`,r)}},window.addEventListener("message",o[t])}function bt(t,e){vt(t,(function n(...o){return wt(t,n),e(...o)}))}function wt(t,e){const n=e["__iframeBus.handlers"]||(e["__iframeBus.handlers"]={});window.removeEventListener("message",n[t])}async function xt(t,...e){let o;const i=e[e.length-1];"function"==typeof i?(o=i,e=e.slice(0,-1)):o=null;const r=t.includes(":response-"),s=_t(t),a=r?null:R.generate();if(yt?parent.postMessage({[gt]:s,[ft]:e,[mt]:a},"*"):n("iframe").forEach((t=>{t.contentWindow.postMessage({[gt]:s,[ft]:e,[mt]:a},"*")})),!r)return new Promise((e=>{const n=i=>{o&&o(i),wt(`${t}:response-${a}`,n),e(i)};vt(`${t}:response-${a}`,n)}))}function _t(t){return`iframe-bus.${t}`}var Pt={init:function(){ht.on("iframe-bus",((t,...e)=>xt(t,...e))),vt("chrome-bus",((t,...e)=>ht.send(t,...e)))},on:vt,once:bt,off:wt,send:xt,wait:async function(t){return await new Promise((e=>{bt(t,e)}))}};var St={controller:{getConfig:function t(){const e=t;if(!e.config){const t=a.getParams();e.config=t.fusionConfig}return e.config}}};const $t=Symbol("anchor");function kt({class:t,style:e,text:n,anchor:o,atCenter:i=!1}){const r=kt;r.initialized||(r.initialized=!0,T.onDocMutations((()=>{T.$$(".tooltip").forEach((t=>{const e=t[$t];document.body.contains(e)||t.remove()}))})),T.insertMultistyle`
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
  `);const s=document.createElement("div");s.innerHTML=`\n    <div\n      class="${t||""} tooltip ${i?"tooltip_at-center":""}"\n      ${e?`style="${e}"`:""}>\n      ${n}\n    </div>\n  `;const a=s.firstElementChild;document.body.insertAdjacentElement("afterend",a),a[$t]=o,o.addEventListener("mouseenter",(()=>{let t,e;const n=o.getBoundingClientRect();i?(t=Math.round(n.left+n.width/2-a.offsetWidth/2-4),e=Math.round(n.top+n.height)):(t=Math.round(n.left+n.width-a.offsetWidth),e=Math.round(n.top+n.height)),a.style.left=`${t}px`,a.style.top=`${e}px`,a.classList.add("tooltip_shown")})),o.addEventListener("mouseleave",(()=>{a.classList.remove("tooltip_shown")}))}var Ct=Object.assign((async function(t,e=3e4){"v2"===window.inssist.igBundleVersion&&await T.waitFor((()=>T.$(".BaseView")));Mt[t]&&await Mt[t];const n=t.split(":")[0],o=window.inssist.moduleInterceptor,i=await T.waitFor((()=>o.getModule(n)),e);i||console.error(`ig: failed to require ${n}`);return i}),{lock:function(t){Mt[t]=T.createResolvablePromise()},unlock:Tt,unlockOnNextTick:function(t){setTimeout((()=>Tt(t)))}});const Mt={};function Tt(t){Mt[t]&&Mt[t].resolve()}var Et={init:async function(){if(At=St.controller.getConfig().igSelectors,Dt=await Ct("http"),Rt=await Ct("store"),!Dt||!Rt)return;D(Dt,{isCreatingReels:()=>Lt.creatingReels,isSharingToFeed:()=>Lt.shareToFeed,onSuccess:()=>{Pt.send("reels.submit-success")}}),function(){const t=Symbol("handled");T.onDocMutations((async()=>{if(!Lt.creatingReels)return;const e=T.$(At.postCreation.submitPostButton);if(!e)return;if(e[t])return;e[t]=!0;const n=await Pt.send("reels.is-pro");e.addEventListener("click",(t=>{n||(t.preventDefault(),t.stopPropagation(),Pt.send("reels.open-billing"))}),{capture:!0}),n||(e.style.opacity=.5,kt({style:"width: 100%; max-width: 280px;",anchor:e,text:"\n          Posting Reels is a PRO feature, please consider\n          upgrading to publish Reels from the Desktop.\n        "}))}))}(),function(){const t=Symbol("handled");T.onDocMutations((()=>{if(!Lt.creatingReels)return;const e=T.docElem.dataset.page;if(!("CreationStylePage"===e||"CreationDetailsPage"===e))return;const n=T.$(At.general.headerTitle);n&&(n[t]||(n[t]=!0,n.innerText="New Reel"))})),T.insertMultistyle`
    <style>
      /* hide "Advanced Posting Options" section */
      .reels--creating-reels .extended-post-creation {
        display: none;
      }
    </style>
  `}(),function(){const t=Symbol("handled");T.onDocMutations((async()=>{if(!Lt.creatingReels)return;const e=T.$(At.postCreation.captionContainer);if(!e)return;if(e[t])return;e[t]=!0;const n=await Pt.send("reels.get-trial-data");if(true)return;e.insertAdjacentHTML("beforebegin",`\n      <div class="ReelsUpgradeToProBar">\n        <div class="ReelsUpgradeToProBar__text">\n          Free Reels Remaining: ${n.freeReels} / ${n.maxFreeReels}\n        </div>\n        <button class="ReelsUpgradeToProBar__button">\n          Get Unlimited Reels\n        </button>\n      </div>\n    `);T.$(".ReelsUpgradeToProBar__button").addEventListener("click",(()=>{Pt.send("reels.open-billing")}))})),T.insertMultistyle`
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
  `}(),function(){const t=Symbol("handled");T.onDocMutations((()=>{if(!Lt.creatingReels)return;const e=T.$(At.postCreation.body);if(!e)return;if(e[t])return;e[t]=!0,e.insertAdjacentHTML("beforeend",`\n      <div class="reels-share-to-feed ${Lt.shareToFeed?"reels-share-to-feed_on":""}">\n        <button class="reels-share-to-feed__button clickable">\n          <div class="reels-share-to-feed__checkbox">\n            <svg class="reels-share-to-feed__checkbox-icon-empty" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">\n              <path fill="none" d="M0 0h24v24H0z"/>\n              <path d="M19 5v14H5V5zm0-2H5a2.006 2.006 0 00-2 2v14a2.006 2.006 0 002 2h14a2.006 2.006 0 002-2V5a2.006 2.006 0 00-2-2z" fill="#1ba2f9" fill-rule="evenodd"/>\n            </svg>\n            <svg class="reels-share-to-feed__checkbox-icon-checked" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">\n              <path fill="none" d="M0 0h24v24H0z"/>\n              <path d="M19 3H5a2.006 2.006 0 00-2 2v14a2.006 2.006 0 002 2h14a2.006 2.006 0 002-2V5a2.006 2.006 0 00-2-2zm-9 14l-5-5 1-1 4 3 8-7 1 1-9 9z" fill="#1ba2f9" fill-rule="evenodd"/>\n            </svg>\n          </div>\n          <div class="reels-share-to-feed__label">\n            Also Share to Feed\n          </div>\n        </button>\n        <div class="reels-share-to-feed__preview">\n          <div class="reels-share-to-feed__preview-image"></div>\n          <div class="reels-share-to-feed__preview-caption">Feed Post Preview</div>\n        </div>\n      </div>\n    `);const n=T.$(".reels-share-to-feed");T.$(".reels-share-to-feed__button").addEventListener("click",(()=>{Lt.shareToFeed=!Lt.shareToFeed,n.classList.toggle("reels-share-to-feed_on")}))}));const e=()=>{var t,e;if(!Lt.creatingReels)return;const n=null===(t=Rt.getState().creation)||void 0===t||null===(e=t.coverPhoto)||void 0===e?void 0:e.dataURL;if(!n)return;const o=T.$(".reels-share-to-feed__preview-image");o&&(o.style.backgroundImage=`url('${n}')`)};T.onDocMutations(e),Rt.subscribe(e),T.insertMultistyle`
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
  `}(),function(){const t=Symbol("handled");T.onDocMutations((()=>{if(!Lt.creatingReels)return;const e=T.$(At.postCreation.imageContainer),n=T.$(At.postCreation.videoContainer),o=e||n;o&&(o[t]||(o[t]=!0,o.insertAdjacentHTML("beforeend",'\n      <div class="reels-tik-tok-watermark-info">\n        Find more info about posting Instagram Reels in our\n        <a href="https://inssist.com/knowledge-base" target="_blank">Knowledge Base</a> and\n        <a href="https://inssist.com/knowledge-base/sharing-tiktok-to-instagram-reels" target="_blank">Guide</a>.\n      </div>\n    ')))})),T.insertMultistyle`
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
  `}()},isShareToFeed:function(){return Lt.shareToFeed},isCreatingReels:function(){return Lt.creatingReels},startReelsCreationSession:function(){const t=Rt.getState().creation.sessionId;Lt.creatingReels=!0,Lt.shareToFeed=!1,T.docElem.classList.add("reels--creating-reels"),Pt.send("reels.creation-session-start"),Lt.stopSessionWatcher=Rt.subscribe((()=>{const e=Rt.getState();t!==e.creation.sessionId&&Bt()}))},stopReelsCreationSession:Bt};let At,Dt,Rt;const Lt={shareToFeed:!1,creatingReels:!1,stopSessionWatcher:null};function Bt(){Lt.creatingReels=!1,T.docElem.classList.remove("reels--creating-reels"),Pt.send("reels.creation-session-end"),Lt.stopSessionWatcher&&Lt.stopSessionWatcher()}var It={controller:Et,patchHttp:D};const Ft={};async function Ot(t){if(await g((()=>window.requireLazy),3e4),window.requireLazy)return new Promise(((e,n)=>{const o=setTimeout((()=>{n("failed to use module",t)}),3e4);window.requireLazy([t],(t=>{clearTimeout(o),e(t)}))}))}Ft.controller={init:function(){Ft.define=this._define.bind(this),this._interceptors={},this._interceptUploadVideo(),this._interceptUploadPhoto()},_define:function(t,e){this._interceptors[t]=e},_interceptUploadVideo:async function(){const t=await Ot("PolarisAPIRuploadVideo");if(!t)return;const e=t.ruploadVideo.bind(t);t.ruploadVideo=async(...t)=>{await this._call("stripVideoMetadata",t),await this._call("addMusic",t);const n=await this._call("splitStoryIntoChunks",t,e);return n||e(...t)}},_interceptUploadPhoto:async function(){const t=await Ot("PolarisAPIRuploadPhoto");if(!t)return;const e=t.ruploadPhoto.bind(t);t.ruploadPhoto=async(...t)=>{const n=await this._call("uploadCoversForStoryChunks",t,e);return n||e(...t)}},_call:async function(t,...e){const n=this._interceptors[t];if(n)return n(...e);console.error(`[$igInterceptor] unable to find "${t}" interceptor`)}};var zt=Ft;const Ht={maxStoryVideoDuration:60.9*T.time.SECOND,init:async function(){this._chunks=[],this._patchStoryVideoUpload(),this._patchStoryCoverUpload(),this._patchStoryPublishing()},_requireHttp:async function(){const t=await Ct("http:story-assist");return Ct.unlockOnNextTick("http"),t},_isStoryCreationPage:function(){return location.href.includes("/create/story")},_patchStoryVideoUpload:function(){zt.define("splitStoryIntoChunks",(async(t,e)=>{if(!this._isStoryCreationPage())return;const n=t[0];if(n.uploadMediaDurationMs<=this.maxStoryVideoDuration)return void(this._chunks=[]);this._log("splitting video into chunks...");const o=await Pt.send("story-assist.split-story-video",n.file);let i;this._log(`created ${o.length} chunks`),this._chunks=[];for(const t of o){this._log(`uploading chunk #${this._chunks.length+1}`);const o=URL.createObjectURL(t),r=String(Date.now()),s=await T.loadVideoMetadata(o),a={...n,file:t,dataURL:o,uploadId:r,uploadMediaDurationMs:1e3*s.duration,entityName:`story_${r}`};i=await e(a),this._chunks.push(a),this._log("ig response",i)}return i}))},_patchStoryCoverUpload:function(){zt.define("uploadCoversForStoryChunks",(async(t,e)=>{if(!this._isStoryCreationPage())return;if(0===this._chunks.length)return;let n;for(const o of this._chunks){this._log(`uploading cover for chunk #${this._chunks.indexOf(o)+1}`);const i=await this._takeFirstFrame(o.dataURL);n=await e({...t[0],file:i,dataURL:URL.createObjectURL(i),uploadId:o.uploadId,entityName:o.entityName}),this._log("ig response",n)}return n}))},_patchStoryPublishing:async function(){const t=await this._requireHttp(),e=t.post.bind(t);t.post=async(...t)=>{if(!t[0].includes("/create/configure_to_story"))return e(...t);if(0===this._chunks.length)return e(...t);let n;for(const o of this._chunks)this._log(`publishing chunk #${this._chunks.indexOf(o)+1}`),n=await e(t[0],{...t[1],upload_id:o.uploadId,...o!==this._chunks[0]&&{reel_mentions:null}}),this._log("ig response",n);return n}},_takeFirstFrame:async function(t){const e=document.createElement("video");e.src=t,e.muted=!0,e.preload="metadata",e.currentTime=.01,await new Promise((t=>e.onloadedmetadata=t)),await new Promise((t=>e.ontimeupdate=t));const n=document.createElement("canvas"),o=n.getContext("2d");n.width=e.videoWidth,n.height=e.videoHeight;return await new Promise((t=>{o.drawImage(e,0,0),n.toBlob((e=>t(e)),"image/jpeg")}))},_log:function(...t){console.log(`[story assist splitter] ${t[0]}`,...t.slice(1))}},{$:Nt}=T;var Vt={controller:{init:async function(){this._sel=St.controller.getConfig().igSelectors,this._updateStyles(),this._manageToggleButton(),this._addMentionsToRequest(),this._hideStoryAssistPanelOnSubmit(),this._notifyStoryCover(),this._manageTrial(),this._hidden=!0,Ht.init()},getMentions:async function(){return(await Pt.send("story-assist.get-mentions")).map((t=>({user_id:t.id})))},_updateStyles:function(){T.insertMultistyle`
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
    `},_manageToggleButton:function(){let t;const e=Symbol();T.onDocMutations((()=>{const n=Nt(this._sel.storyCreation.videoHeader),o=Nt(this._sel.storyCreation.photoControls),i=n||o;if(!i)return;if(i[e])return;i[e]=!0;const r=!!n;i.insertAdjacentHTML("beforeend",`\n        <div\n          class="\n            StoryAssistToggleButton\n            ${this._hidden?"StoryAssistToggleButton_hidden":""}\n            ${r?"StoryAssistToggleButton_video":"StoryAssistToggleButton_photo"}\n          ">\n          <svg class="StoryAssistToggleButton__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384.97 384.97">\n            <path d="M12.03 84.212h360.909c6.641 0 12.03-5.39 12.03-12.03 0-6.641-5.39-12.03-12.03-12.03H12.03C5.39 60.152 0 65.541 0 72.182c0 6.641 5.39 12.03 12.03 12.03zM372.939 180.455H12.03c-6.641 0-12.03 5.39-12.03 12.03s5.39 12.03 12.03 12.03h360.909c6.641 0 12.03-5.39 12.03-12.03s-5.389-12.03-12.03-12.03zM372.939 300.758H12.03c-6.641 0-12.03 5.39-12.03 12.03 0 6.641 5.39 12.03 12.03 12.03h360.909c6.641 0 12.03-5.39 12.03-12.03.001-6.641-5.389-12.03-12.03-12.03z" fill="currentColor"/>\n          </svg>\n        </div>\n      `),t=Nt(".StoryAssistToggleButton"),t.addEventListener("click",(()=>{Pt.send("story-assist.toggle")}))})),Pt.on("story-assist.panel-toggled",(e=>{this._hidden=e,t&&t.classList.toggle("StoryAssistToggleButton_hidden",this._hidden)})),T.insertMultistyle`
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
    `},_addMentionsToRequest:async function(){const t=await Ct("http");if(!t)return;const e=t.post.bind(t);t.post=async(...t)=>(await(async()=>{if(!t[0].includes("/create/configure_to_story"))return;const e=await this.getMentions();0!==e.length&&(t[1].reel_mentions=JSON.stringify(e))})(),e(...t))},_hideStoryAssistPanelOnSubmit:function(){const t=Symbol();T.onDocMutations((()=>{const e=Nt(this._sel.storyCreation.submitButton);e&&(e[t]||(e[t]=!0,e.addEventListener("click",(()=>{Pt.send("story-assist.toggle",!1)}))))}))},_notifyStoryCover:async function(){const t=await Ct("store");if(!t)return;let e;t.subscribe((()=>{var n,o;const i=null===(n=t.getState().storyCreation)||void 0===n||null===(o=n.coverPhoto)||void 0===o?void 0:o.dataURL;e!==i&&(e=i,Pt.send("story-assist.cover-change",i))}))},_manageTrial:async function(){let t;const e=Symbol();T.onDocMutations((()=>{if(!!!Nt(this._sel.storyCreation.video))return;const n=Nt(this._sel.storyCreation.submitButton);n&&(n[e]||(n[e]=!0,n.addEventListener("click",(async e=>{t||(e.preventDefault(),e.stopPropagation(),t=await Pt.send("story-assist.has-pro"),t?n.click():Pt.send("story-assist.show-upsell"))}),!0)))}))}}};const jt=window.storyMentionsContentScript;var Ut={init:async function(){Wt=St.controller.getConfig().igSelectors,qt=await Ct("http"),Yt=await Ct("store"),jt.onStoryCreationReduce((t=>{"STORY_CREATION_SESSION_STARTED"===t.type&&(Gt={mentions:[],inputSize:{width:0,height:0},activeMention:null})})),function(){const t=Symbol("handled");T.onDocMutations((()=>{const e=T.$(Wt.storyCreation.topRightButtonsContainer);if(!e)return;if(e[t])return;e[t]=!0,"v1"===window.inssist.igBundleVersion?e.insertAdjacentHTML("afterbegin",'\n        <button class="story-add-mention-button">\n          @\n        </button>\n      '):e.insertAdjacentHTML("afterbegin",'\n        <button class="PolarisStoryImageCreationContainer story-add-mention-button">\n          @\n        </button>\n      ');T.$(".story-add-mention-button").addEventListener("click",(()=>{Yt.dispatch({type:"STORY_CREATION_ENTER_ADD_TEXT"}),Yt.dispatch({type:"STORY_CREATION_CHANGE_TEXT",rawText:"@",width:21.71875,height:22}),Yt.dispatch({type:"SEARCH_QUERY_CLEARED"});const t=T.$(Wt.storyCreation.textInput);t.textContent="@";const e=document.getSelection(),n=document.createRange();n.setStart(t,1),n.setEnd(t,1),e.removeAllRanges(),e.addRange(n)}))})),T.insertMultistyle`
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
  `}(),function(){const t=Symbol("listenerAdded");T.onDocMutations((()=>{const e=T.$(Wt.storyCreation.textInput);e&&(Gt.inputSize.width=e.offsetWidth,Gt.inputSize.height=e.offsetHeight,e[t]||(e[t]=!0,e.addEventListener("input",(()=>{Gt.inputSize.width=e.offsetWidth,Gt.inputSize.height=e.offsetHeight}))))}))}(),function(){const t=Symbol("handled");T.onDocMutations((()=>{const e=T.$(Wt.storyCreation.mentionReel);e&&(e[t]||(e[t]=!0,T.smartHorizontalScroll.init(e)))})),T.onDocClick((t=>{const e=t.target.closest(Wt.storyCreation.mentionReelItem);if(!e)return;const n=T.$(Wt.storyCreation.textInput);if(!n)return;const o=`@${e.innerText}`;n.textContent=o;const i=n.getBoundingClientRect();Yt.dispatch({type:"STORY_CREATION_CHANGE_TEXT",width:i.width,height:i.height,rawText:o}),Yt.dispatch({type:"STORY_CREATION_SAVE_TEXT",renderText:[o],timeSpent:5e3})})),T.insertMultistyle`
    <style>
      ${Wt.storyCreation.mentionReelItem} {
        cursor: pointer;
      }

      ${Wt.storyCreation.textInput} {
        position: relative;
        top: 20px;
      }
    </style>
  `}(),jt.onStoryCreationReduce(((t,e)=>{if("STORY_CREATION_SAVE_TEXT"!==t.type)return;if(1!==t.renderText.length)return;if(!t.renderText[0].startsWith("@"))return;const n=t.renderText[0].replace("@","");if(Gt.activeMention)Object.assign(Gt.activeMention,{username:n,width:Gt.inputSize.width,height:Gt.inputSize.height});else{const t=e.canvasStickers.find((t=>t.rawText===`@${n}`));if(!t)return;Gt.mentions.push({username:n,x:t.x,y:t.y,width:Gt.inputSize.width,height:Gt.inputSize.height})}})),jt.onStoryCreationReduce(((t,e)=>{if("STORY_CREATION_CHANGE_STICKER_ORDER"!==t.type)return;const n=t.bumpIndex,o=e.canvasStickers[n];if(o&&o.rawText&&o.rawText.startsWith("@")){const t=o.rawText.replace("@",""),e=Gt.mentions.find((e=>e.username===t));Gt.activeMention=e||null}else Gt.activeMention=null})),jt.onStoryCreationReduce((t=>{"STORY_CREATION_ENTER_ADD_TEXT"===t.type&&(Gt.activeMention=null)})),jt.onStoryCreationReduce((t=>{"STORY_CREATION_MOVE_CANVAS_STICKER"===t.type&&Gt.activeMention&&(Gt.activeMention.x+=t.deltaX,Gt.activeMention.y+=t.deltaY)})),jt.onStoryCreationReduce((t=>{"STORY_CREATION_DELETE_CANVAS_STICKER"===t.type&&Gt.activeMention&&T.removeFromArray(Gt.mentions,Gt.activeMention)})),function(){if(!qt)return;const t=qt.post;qt.post=(...e)=>(e[0].includes("/create/configure_to_story")&&Gt.mentions.length>0&&(e[1]={...e[1],reel_mentions:JSON.stringify(Xt())}),t.call(qt,...e))}()},getMentions:Xt};let Wt,qt,Yt,Gt={mentions:[],inputSize:{width:0,height:0},activeMention:null};function Xt(){const t=t=>Math.round(1e4*t)/1e4;return Gt.mentions.map((e=>{const n=JSON.parse(JSON.stringify(Yt.getState())).users.usernameToId[e.username];if(!n)return null;const o=T.$(Wt.storyCreation.root)||document.body;return{user_id:n,x:t(Math.max(0,e.x/o.offsetWidth)),y:t(Math.max(0,e.y/o.offsetHeight)),width:t(e.width/o.offsetWidth),height:t(e.height/o.offsetHeight),rotation:0}})).filter(Boolean)}var Qt={controller:Ut};function Jt(t,e,{once:n=!1}={}){globalThis.addEventListener(`__event-bus.${t}`,(t=>{const n=t.detail||[];e(...n)}),{once:n})}var Kt={send:function(t,...e){const n=new CustomEvent(`__event-bus.${t}`,{detail:e});globalThis.dispatchEvent(n)},on:Jt,once:function(t,e){Jt(t,e,{once:!0})}},Zt={init:function(){te=St.controller.getConfig().igSelectors,ee=document.documentElement,function(){const t=Symbol("handled");T.onDocMutations((()=>{const e=T.$(te.postCreation.captionContainer);e&&(e[t]||(e[t]=!0,e.insertAdjacentHTML("afterend",oe())))}))}(),ee.addEventListener("click",(t=>{const e=t.target.closest(".new-post-extra__button-cancel"),n=t.target.closest(".new-post-extra__button");if(!n)return;const o=n.dataset.option;e?Pt.send("new-post-extra.cancel-click",o):Pt.send("new-post-extra.option-click",o)})),function(){const t=()=>{const t=T.$(".new-post-extra");if(t){t.outerHTML=oe();{const t=T.$(te.postCreation.submitPostButton);t.originalText||(t.originalText=t.innerText),t.innerText="Draft"===ne.laterPillData.dateStr?"Draft":ne.laterPillData.dateStr?"Schedule":t.originalText}}};Pt.on("new-post-extra.synch-selected-option",(e=>{ne.selectedOption=e,t()})),Pt.on("new-post-extra.update-pill-music",(({name:e})=>{ne.musicPillData.name=e,t()})),Pt.on("new-post-extra.update-pill-cover",(({hasCover:e})=>{ne.coverPillData.hasCover=e,t()})),Pt.on("new-post-extra.update-pill-later",(({dateStr:e})=>{ne.laterPillData.dateStr=e,t()}))}(),async function(){const t=await Ct("store");if(!t)return;let e=null;t.subscribe((()=>{var n;const o=null===(n=t.getState().creation)||void 0===n?void 0:n.sourceVideo,i=o&&o.dataURL||null;e!==i&&(ee.classList.toggle("new-post-extra--video",!!i),e=i,i&&Pt.send("new-post-extra.creation-video-change",i))}))}(),async function(){Kt.on("ig.creation-session-start",(()=>{ne.musicPillData={name:null},ne.coverPillData={hasCover:!1}}))}(),async function(){const t=await Ct("store");if(!t)return;let e=!1;T.onDocMutations((()=>{const n=!!T.$(te.postCreation.captionTextarea);if(e!==n)if(e=n,e){const e=t.getState(),n=!!T.$(te.postCreation.previewPostTypeIcon)?T.safe((()=>e.creation.sourceVideo.uploadMediaDurationMs),0):0;Pt.send("new-post-extra.enter-page",{videoDurationMs:n})}else Pt.send("new-post-extra.exit-page")}))}(),T.insertMultistyle`
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
  `},getCtx:function(){return ne}};let te,ee;const ne={selectedOption:null,musicPillData:{name:null},coverPillData:{hasCover:!1},laterPillData:{dateStr:null}};function oe(){const t='\n    <svg\n      class="new-post-extra__button-chevron-icon"\n      xmlns="http://www.w3.org/2000/svg"\n      width="7.5"\n      height="12.357"\n      viewBox="0 0 7.5 12.357">\n      <path d="M7.301 6.659l-5.5 5.5a.679.679 0 01-.961 0l-.641-.641a.679.679 0 010-.959l4.358-4.38L.198 1.8a.679.679 0 010-.959L.839.2A.679.679 0 011.8.2l5.5 5.5a.679.679 0 01.001.959z" fill="currentColor"/>\n    </svg>\n  ',e='\n    <div class="new-post-extra__button-cancel">\n      <svg width="8" height="8" viewBox="0 0 8 8">\n        <path d="M6.5-.001 4 2.499l-2.5-2.5-1.5 1.5 2.5 2.5-2.5 2.5 1.5 1.5 2.5-2.5 2.5 2.5 1.5-1.5-2.5-2.5 2.5-2.5Z" fill="currentColor"/>\n      </svg>\n    </div>\n  ';return`\n    <div class="new-post-extra">\n      \x3c!-- add music --\x3e\n      <button\n        class="\n          new-post-extra__button\n          ${ne.musicPillData.name?"new-post-extra__button_can-cancel":""}\n          ${"music-assist"===ne.selectedOption?"new-post-extra__button_selected":""}\n        "\n        data-option="music-assist">\n        <div class="new-post-extra__button-pill">\n          <svg class="new-post-extra__button-icon" viewBox="0 0 24 24">\n            <path d="M0 0h24v24H0Z" fill="none"/>\n            <path d="M18.5 5.438a.937.937 0 0 0-1.22-.893L7.906 7.313a.937.937 0 0 0-.656.893v7.658a4.052 4.052 0 0 0-.937-.115c-1.554 0-2.813.84-2.813 1.875s1.259 1.877 2.812 1.877 2.812-.839 2.812-1.875v-6.847l7.5-2.2v5.41a4.052 4.052 0 0 0-.937-.115c-1.553 0-2.812.839-2.812 1.875s1.259 1.875 2.812 1.875 2.813-.839 2.813-1.875V5.438Z" fill="currentColor"/>\n          </svg>\n          <div class="new-post-extra__button-text">\n            ${ne.musicPillData.name||"Add Music"}\n          </div>\n          ${e}\n        </div>\n        ${t}\n      </button>\n\n      \x3c!-- change cover --\x3e\n      <button\n        class="\n          new-post-extra__button\n          ${ne.coverPillData.hasCover?"new-post-extra__button_can-cancel":""}\n          ${"cover-assist"===ne.selectedOption?"new-post-extra__button_selected":""}\n        "\n        data-option="cover-assist">\n        <div class="new-post-extra__button-pill">\n          <svg class="new-post-extra__button-icon" viewBox="0 0 24 24">\n            <path d="M0 0h24v24H0Z" fill="none"/>\n            <path d="M6 19.5A1.5 1.5 0 0 1 4.5 18V6A1.5 1.5 0 0 1 6 4.5h12A1.5 1.5 0 0 1 19.5 6v12a1.5 1.5 0 0 1-1.5 1.5Zm10.055-1.4h2.021v-2.02l-4.037-4.037 2.016-2.021 2.021 2.021V5.986H5.962v6.057l2.021-2.021Z" fill="currentColor"/>\n          </svg>\n          <div class="new-post-extra__button-text">\n            ${ne.coverPillData.hasCover?"Custom Cover":"Change Cover"}\n          </div>\n          ${e}\n        </div>\n        ${t}\n      </button>\n\n      \x3c!-- post later --\x3e\n      <button\n        class="\n          new-post-extra__button\n          ${ne.laterPillData.dateStr?"new-post-extra__button_can-cancel":""}\n          ${"later"===ne.selectedOption?"new-post-extra__button_selected":""}\n        "\n        data-option="later">\n        <div class="new-post-extra__button-pill">\n          <svg class="new-post-extra__button-icon" viewBox="0 0 24 24">\n            <path d="M0 0h24v24H0Z" fill="none"/>\n            <path d="M11.407 19.958a8.271 8.271 0 0 1-.819-.125c-.266-.054-.532-.123-.791-.2s-.511-.173-.758-.277a8.274 8.274 0 0 1-4.39-4.39c-.1-.247-.2-.5-.277-.758s-.149-.525-.2-.791a8.282 8.282 0 0 1-.125-.819 8.377 8.377 0 0 1 0-1.687 8.282 8.282 0 0 1 .125-.819c.054-.266.123-.532.2-.791s.173-.511.277-.758a8.274 8.274 0 0 1 4.39-4.39c.247-.1.5-.2.758-.277s.525-.149.791-.2a8.27 8.27 0 0 1 .819-.125 8.374 8.374 0 0 1 1.687 0 8.269 8.269 0 0 1 .819.125c.266.054.532.123.791.2s.511.173.758.277a8.274 8.274 0 0 1 4.39 4.39c.1.247.2.5.277.758s.149.525.2.791a8.282 8.282 0 0 1 .125.819 8.377 8.377 0 0 1 0 1.687 8.282 8.282 0 0 1-.125.819c-.054.266-.123.532-.2.791s-.173.511-.277.758a8.274 8.274 0 0 1-4.39 4.39c-.247.1-.5.2-.758.277s-.525.149-.791.2a8.27 8.27 0 0 1-.819.125 8.373 8.373 0 0 1-1.687 0Zm-.48-14.641a6.531 6.531 0 0 0-2.348.988A6.586 6.586 0 0 0 6.2 9.194a6.534 6.534 0 0 0-.383 1.233 6.63 6.63 0 0 0 0 2.647 6.531 6.531 0 0 0 .988 2.348 6.586 6.586 0 0 0 2.889 2.379 6.532 6.532 0 0 0 1.233.383 6.63 6.63 0 0 0 2.647 0 6.531 6.531 0 0 0 2.348-.988 6.586 6.586 0 0 0 2.379-2.889 6.535 6.535 0 0 0 .383-1.233 6.63 6.63 0 0 0 0-2.647 6.53 6.53 0 0 0-.988-2.348A6.586 6.586 0 0 0 14.807 5.7a6.534 6.534 0 0 0-1.233-.383 6.631 6.631 0 0 0-2.647 0Zm.907 8.241a1.047 1.047 0 0 1-1.011-1.011v-3.4a.965.965 0 1 1 1.93 0v2.476h1.2a.965.965 0 0 1 0 1.93Z" fill="currentColor"/>\n          </svg>\n          <div class="new-post-extra__button-text">\n            ${ne.laterPillData.dateStr||"Post Later"}\n          </div>\n          ${e}\n        </div>\n        ${t}\n      </button>\n\n      \x3c!-- hashtag assistant --\x3e\n      <button\n        class="\n          new-post-extra__button\n          ${"tag-assist"===ne.selectedOption?"new-post-extra__button_selected":""}\n        "\n        data-option="tag-assist">\n        <div class="new-post-extra__button-pill">\n          <svg class="new-post-extra__button-icon" viewBox="0 0 24 24">\n            <path d="M0 0h24v24H0Z" fill="none"/>\n            <path d="M16.013 13.928h2.934v2.46h-3.228L15.268 20h-2.551l.451-3.611H9.851L9.399 20H6.871l.451-3.611H4.366v-2.461h3.25l.47-3.656H5.133v-2.46h3.253L8.835 4.2h2.528l-.451 3.611h3.318l.456-3.611h2.528l-.451 3.611h2.934l.023 2.46h-3.25Zm-2.551 0 .474-3.656h-3.318l-.474 3.656Z" fill="currentColor"/>\n          </svg>\n          <div class="new-post-extra__button-text">\n            Hashtag Assistant\n          </div>\n          ${e}\n        </div>\n        ${t}\n      </button>\n    </div>\n  `}var ie={controller:Zt},re={};re.controller={init:function(){this._sel=St.controller.getConfig().igSelectors,this._handleLaterSaveForStory(),this._handleSubmit(),Pt.on("later.get-post-info",this._getPostInfoSafe.bind(this))},_handleLaterSaveForStory:function(){const t=Symbol("text");Pt.on("new-post-extra.update-pill-later",(({dateStr:e})=>{const n=T.$(this._sel.storyCreation.submitButton),o=T.$(this._sel.storyCreation.submitButtonText);if(!n||!o)return;o[t]||(o[t]=o.innerText);const i=e||o[t];i!==o.innerText&&(o.innerText=i,n.style.setProperty("transition","all 150ms ease","important"),n.style.setProperty("scale","1.15","important"),setTimeout((()=>{n.style.removeProperty("scale"),setTimeout((()=>{n.style.removeProperty("transition")}),150)}),150))}))},_handleSubmit:function(){const t=Symbol("text"),e=Symbol("handled");T.onDocMutations((()=>{const n=T.$(this._sel.postCreation.submitPostButton),o=n,i=T.$(this._sel.storyCreation.submitButton),r=T.$(this._sel.storyCreation.submitButtonText),s=n||i,a=o||r;if(!s&&!a)return;if(s[e])return;s[e]=!0;let l=!1;s.addEventListener("click",(async e=>{const n=ie.controller.getCtx().laterPillData.dateStr;if(!n)return;if(l)return;l=!0,e.preventDefault(),e.stopPropagation();const o="Draft"===n,r=!!i;a[t]||(a[t]=a.innerText),a.innerText=o?"Saving...":"Scheduling...",s.style.setProperty("pointer-events","none","important"),r?s.style.setProperty("opacity","0.9","important"):s.style.setProperty("color","#C1C1C1","important"),await T.sleep(1500);if(await Pt.send("later.saveCurrentPost"))return void(l=!1);alert(o?"Failed to save post as draft":"Failed to schedule post"),s.style.removeProperty("color"),s.style.removeProperty("opacity"),s.style.removeProperty("pointer-events"),a.innerText=a[t],l=!1}))}))},_getPostInfoSafe:async function(){let t;try{t=await this._getPostInfo()}catch(t){return console.error("[$later] Failed to get post info",t),null}return!(!t.blob||"reel"===t.type&&!t.coverBlob||"video"===t.type&&!t.coverBlob||"story-video"===t.type&&!t.coverBlob)?t:(console.error("[$later] Invalid post",t),null)},_getPostInfo:async function(){var t,e;const n=(await Ct("store")).getState(),o=n.navigation.pageIdentifier.toLowerCase().startsWith("story"),i=o?!!(null===(t=n.storyCreation.sourceVideo)||void 0===t?void 0:t.file):!!(null===(e=n.creation.sourceVideo)||void 0===e?void 0:e.file);return o&&i?{type:"story-video",blob:n.storyCreation.sourceVideo.file,mentions:await Vt.controller.getMentions(),coverBlob:n.storyCreation.coverPhoto.file}:o?{type:"story-photo",blob:await this._getStoryImage(n),mentions:Qt.controller.getMentions()}:It.controller.isCreatingReels()?{type:"reel",blob:n.creation.sourceVideo.file,caption:n.creation.finalizedMedia.caption||"",location:this._getPostLocation(n),mentions:this._getPostMentions(n),coverBlob:n.creation.coverPhoto.file,shareToFeed:It.controller.isShareToFeed()}:i?{type:"video",blob:n.creation.sourceVideo.file,caption:n.creation.finalizedMedia.caption||"",location:this._getPostLocation(n),mentions:this._getPostMentions(n),coverBlob:n.creation.coverPhoto.file}:{type:"photo",blob:n.creation.stagedImage.blob,caption:n.creation.finalizedMedia.caption||"",location:this._getPostLocation(n),mentions:this._getPostMentions(n),coverBlob:null}},_getStoryImage:async function(t){const e=T.$$("canvas");if(0===e.length)return null;const n=Math.max(t.storyCreation.sourceImage.width,e[0].width),o=Math.max(t.storyCreation.sourceImage.height,e[0].height),i=document.createElement("canvas");i.width=n,i.height=o;const r=i.getContext("2d");for(const t of e)r.drawImage(t,0,0,t.width,t.height,0,0,n,o);return await new Promise((t=>{i.toBlob(t,"image/jpeg",1)}))},_getPostLocation:function(t){const e=t.creation.finalizedMedia.geoTag||null;return e?{lat:e.lat,lng:e.lng,facebook_places_id:e.external_id}:null},_getPostMentions:function(t){var e;const n=(null===(e=t.creation.finalizedMedia.usertags)||void 0===e?void 0:e.toJS())||null;return n?{in:Object.values(n).map((t=>{const e=t.position||[];return{user_id:t.userId,...e.length>0&&{position:e}}}))}:null}};var se={controller:{init:async function(){this.sel=St.controller.getConfig().dmSelectors,this.store=await Ct("store"),this.store&&(this.popup=null,this.textarea=null,this.preventReplyHover=!1,this.preventHideOnBlur=!1,this.prevState={},this.state={show:!1,replies:[],filterString:null,activeReplyIndex:0},this.keepRepliesInSync(),this.initPopup(),this.initToggler(),this.initTextarea(),this.initStyles(),this.update())},keepRepliesInSync:function(){(async()=>{const t=await Pt.send("quick-replies.fetch");this.setState({replies:t})})(),Pt.on("quick-replies.update",(t=>{this.setState({replies:t})}))},setState:function(t={}){this.prevState={...this.state},this.state={...this.state,...t},this.update()},onTogglerClick:function(){0===this.state.replies.length?Pt.send("quick-replies.toggle"):this.setTextareaValue("/")},onManageMouseDown:function(t){Pt.send("quick-replies.toggle"),this.preventHideOnBlur=!0,setTimeout((()=>{this.textarea&&this.textarea.focus()}))},onTextareaInput:function(t){const e=this.onTextareaInput;clearTimeout(e.timeout);const n=this.readFilterStringFromTextarea();null===n?(this.setState({show:!1}),e.timeout=setTimeout((()=>{this.setState({filterString:null,activeReplyIndex:0})}),300)):(this.preventReplyHover=!0,this.setState({show:!0,filterString:n,activeReplyIndex:0}))},onTextareaBlur:function(){this.preventHideOnBlur?this.preventHideOnBlur=!1:this.setState({show:!1})},onTextareaFocus:function(){const t=this.readFilterStringFromTextarea();this.setState({show:null!==t})},onTextareaKeyDown:function(t){if(this.state.show)if("ArrowUp"===t.key){t.preventDefault();let e=this.state.activeReplyIndex-1;const n=this.getFilteredReplies();-1===e&&(e=n.length-1),this.setState({activeReplyIndex:e}),this.scrollToActiveReplyIfNeeded()}else if("ArrowDown"===t.key){t.preventDefault();let e=this.state.activeReplyIndex+1;e===this.getFilteredReplies().length&&(e=0),this.setState({activeReplyIndex:e}),this.scrollToActiveReplyIfNeeded()}else("Enter"===t.key&&!t.shiftKey||"Tab"===t.key)&&(t.preventDefault(),t.stopPropagation(),this.applyActiveReply())},onReplyMouseEnter:function(t){if(this.preventReplyHover)return void(this.preventReplyHover=!1);const e=t.target.closest(".QuickRepliesPopup__reply"),n=Number(e.dataset.index);this.setState({activeReplyIndex:n})},onReplyMouseDown:function(){this.preventHideOnBlur=!0,this.applyActiveReply()},setTextareaValue:function(t){this.textarea&&(this.textarea.value="",this.textarea.focus(),document.execCommand("insertText",!1,t),setTimeout((()=>{this.textarea.focus(),this.textarea.selectionStart=t.length,this.textarea.selectionEnd=t.length})))},select:function(t){return this.popup?T.$(`.QuickRepliesPopup__${t}`,this.popup):null},selectAll:function(t){return this.popup?T.$$(`.QuickRepliesPopup__${t}`,this.popup):[]},getFilteredReplies:function(){const t=this.state.filterString||"";return""===t?this.state.replies:this.state.replies.filter((e=>{const n=(e.shortcut||"")+(e.content||"");return!!n&&T.fuzzyCheck(n,t,2)}))},applyActiveReply:function(){const t=this.getFilteredReplies()[this.state.activeReplyIndex];if(!t)return;const e=this.prepareMessage(t.content);this.setTextareaValue(e),Pt.send("ga.send-event","user","quick-replies:paste")},prepareMessage:function(t){const e=t.match(/{[^}]*}/g)||[];for(const n of e){const e=n.replace("{","").replace("}","").split("|"),o=this.pickRandom(e);t=t.replace(n,o)}try{const e=this.store.getState(),n=e.navigation.route.split("/t/")[1],o=e.direct.threads.get(n).users[0],i=e.direct.users.get(o);t=t.replaceAll("@name",i.full_name||i.username).replaceAll("@username",i.username)}catch{}return t},pickRandom:function(t=[]){return t[Math.round(Math.random()*(t.length-1))]},readFilterStringFromTextarea:function(){if(!this.textarea)return null;const t=this.textarea.value;return 1===t.split("\n").length&&t.startsWith("/")?t.replace("/","").toLowerCase():null},scrollToActiveReplyIfNeeded:function(){this.preventReplyHover=!0;const t=this.select("replies"),e=this.select("reply_active"),n=t.scrollTop,o=t.offsetHeight,i=e.offsetTop,r=e.offsetHeight;n>i?t.scrollTop=i:i+r>n+o&&(t.scrollTop=i-o+r)},initPopup:function(){document.body.insertAdjacentHTML("beforeend",'\n      <div class="QuickRepliesPopup">\n        <div class="QuickRepliesPopup__body">\n          <div class="QuickRepliesPopup__replies"></div>\n          <div class="QuickRepliesPopup__footer">\n            <button class="QuickRepliesPopup__manageButton">\n              MANAGE QUICK REPLIES\n            </button>\n          </div>\n        </div>\n      </div>\n    '),this.popup=T.$(".QuickRepliesPopup");this.select("manageButton").addEventListener("mousedown",this.onManageMouseDown.bind(this))},initToggler:function(){let t=null;const e=Symbol("handled");T.onDocMutations((()=>{const n=T.$(this.sel.general.addMediaButton);n?n[e]||(n[e]=!0,n.insertAdjacentHTML("beforebegin",'\n        <div class="QuickRepliesToggler">\n          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18.205 18.5">\n            <path d="M6.481 0h1.711L1.709 18.5H0Zm1.311 16.654a1.325 1.325 0 0 1-1.331-1.355 1.276 1.276 0 0 1 .393-.952 1.3 1.3 0 0 1 .938-.384 1.254 1.254 0 0 1 .923.373 1.3 1.3 0 0 1 .373.962 1.317 1.317 0 0 1-.383.972 1.247 1.247 0 0 1-.913.384Zm4.556 0a1.325 1.325 0 0 1-1.335-1.355 1.276 1.276 0 0 1 .393-.952 1.3 1.3 0 0 1 .943-.383 1.254 1.254 0 0 1 .923.373 1.3 1.3 0 0 1 .373.962 1.317 1.317 0 0 1-.383.972 1.247 1.247 0 0 1-.909.383Zm4.556 0a1.325 1.325 0 0 1-1.335-1.355 1.276 1.276 0 0 1 .393-.952 1.3 1.3 0 0 1 .943-.383 1.254 1.254 0 0 1 .923.373 1.3 1.3 0 0 1 .373.962 1.317 1.317 0 0 1-.383.972 1.247 1.247 0 0 1-.909.383Z" fill="currentColor"/>\n          </svg>\n        </div>\n      '),t=T.$(".QuickRepliesToggler"),t.addEventListener("click",this.onTogglerClick.bind(this))):t&&(t.remove(),t=null)}))},initTextarea:function(){const t=Symbol("handled");T.onDocMutations((()=>{const e=T.$(this.sel.general.textarea);e&&(e[t]||(e[t]=!0,this.textarea=e,e.addEventListener("input",this.onTextareaInput.bind(this)),e.addEventListener("focus",this.onTextareaFocus.bind(this)),e.addEventListener("blur",this.onTextareaBlur.bind(this)),e.addEventListener("keydown",this.onTextareaKeyDown.bind(this))))}))},initStyles:function(){T.insertMultistyle`${"\n  <style>\n    .QuickRepliesToggler {\n      padding: 3px;\n      margin-right: 8px;\n      cursor: pointer;\n    }\n\n    .QuickRepliesPopup {\n      font-family: Montserrat;\n      display: flex;\n      flex-direction: column;\n      justify-content: flex-end;\n      position: fixed;\n      top: 0;\n      left: 0;\n      bottom: 0;\n      width: 430px;\n      pointer-events: none;\n    }\n\n    .QuickRepliesPopup__body {\n      background: #FFF;\n      border-radius: 4px;\n      overflow: hidden;\n      position: relative;\n      pointer-events: all;\n      transition: opacity 0.3s, transform 0.3s;\n    }\n    .QuickRepliesPopup:not(.QuickRepliesPopup_show) .QuickRepliesPopup__body {\n      opacity: 0;\n      pointer-events: none;\n      transform: translateY(10px);\n    }\n\n\n    /* border */\n    .QuickRepliesPopup__body::before {\n      content: '';\n      position: absolute;\n      top: 0;\n      left: 0;\n      right: 0;\n      bottom: 0;\n      border: 1px solid #DBDBDB;\n      border-radius: inherit;\n      pointer-events: none;\n    }\n\n    .QuickRepliesPopup__replies {\n      max-height: 400px;\n      overflow: auto;\n\n      /* place items above border */\n      position: relative;\n      z-index: 1;\n    }\n\n    .QuickRepliesPopup__noReplies {\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      height: 42px;\n      color: #8E8E8E;\n    }\n\n    .QuickRepliesPopup__reply {\n      display: flex;\n      flex-direction: row;\n      align-items: center;\n      height: 42px;\n      padding: 0 16px;\n      cursor: pointer;\n    }\n    .QuickRepliesPopup__reply_active {\n      background: #1BA2F9;\n      color: #FFF;\n    }\n    html.theme-night .QuickRepliesPopup__reply_active {\n      color: #000 !important;\n    }\n    .QuickRepliesPopup__reply b {\n      font-weight: 700;\n    }\n\n    .QuickRepliesPopup__replyShortcut {\n      font-size: 11px;\n      font-weight: 500;\n      border-radius: 4px;\n      background: #F3F3F3;\n      margin-right: 8px;\n      flex-shrink: 0;\n      padding: 2px 6px;\n    }\n    .QuickRepliesPopup__reply_active .QuickRepliesPopup__replyShortcut {\n      background: rgba(255, 255, 255, 0.25);\n    }\n\n    .QuickRepliesPopup__replyContent {\n      font-size: 14px;\n      line-height: 18px;\n      font-weight: 400;\n      text-overflow: ellipsis;\n      overflow: hidden;\n      white-space: nowrap;\n      display: block;\n      flex-shrink: 1;\n    }\n\n    .QuickRepliesPopup__footer {\n      display: flex;\n      flex-direction: row;\n      justify-content: flex-end;\n      padding: 12px;\n    }\n\n    .QuickRepliesPopup__manageButton {\n      color: #1BA2F9;\n      font-size: 12px;\n      line-height: 15px;\n      font-weight: 600;\n      cursor: pointer;\n      background: transparent;\n      border: none;\n      padding: 0;\n    }\n  </style>\n"}`},update:function(){const t=this.prevState,e=this.state;if(t.show!==e.show){const t="QuickRepliesPopup_show";this.popup.classList.toggle(t,this.state.show)}if(t.filterString!==e.filterString){const t=T.$(this.sel.general.writeBar);if(t){const e=t.getBoundingClientRect();this.popup.setAttribute("style",`left: ${Math.round(e.left)}px !important;\n           bottom: ${Math.round(window.innerHeight-e.top+16)}px !important;\n           width: ${Math.round(e.width)}px !important;`)}}if(t.replies!==e.replies||t.filterString!==e.filterString){const t=this.getFilteredReplies();0===t.length?this.select("replies").innerHTML='\n          <div class="QuickRepliesPopup__noReplies">\n            No replies found\n          </div>\n        ':(this.select("replies").innerHTML=t.map(((t,e)=>`\n          <div class="QuickRepliesPopup__reply" data-index="${e}">\n            ${t.shortcut?`\n              <div class="QuickRepliesPopup__replyShortcut">\n                /&thinsp;${t.shortcut}\n              </div>\n            `:""}\n            <div class="QuickRepliesPopup__replyContent">\n              ${t.content}\n            </div>\n          </div>\n        `)).join(""),this.selectAll("reply").forEach((t=>{t.addEventListener("mouseenter",this.onReplyMouseEnter.bind(this)),t.addEventListener("mousedown",this.onReplyMouseDown.bind(this))})))}{const t="QuickRepliesPopup__reply",e="QuickRepliesPopup__reply_active";T.$$(`.${e}`).forEach((t=>t.classList.remove(e)));const n=T.$$(`.${t}`)[this.state.activeReplyIndex];n&&n.classList.add(e)}}}},ae={init:async function(){(async function(){le=await Pt.send("dm.ghost-mode:is-enabled"),Pt.on("dm.ghost-mode:toggled",(t=>{le=t}))})(),async function(){const t=await Ot("PolarisDirectActionMarkSeen"),e=T.safe((()=>null==t?void 0:t.markSeen),null);if(!e)return void Pt.send("dm.ghost-mode:failed",{action:!!t,markSeen:!!e});t.markSeen=(...n)=>{var o;const i=null===(o=n[2])||void 0===o?void 0:o.ignoreGhostMode;return le&&!i?()=>{}:e.call(t,...n)}}()}};let le=!1;var ce={init:async function(){const t=St.controller.getConfig().dmSelectors,e=await Ct("store");if(!e)return;const n=Symbol("handled");T.onDocMutations((()=>{const o=T.$$('[id^="message-"]').filter((t=>!t[n]));if(0===o.length)return;const i=JSON.parse(JSON.stringify(e.getState()));o.forEach((e=>{var o;e[n]=!0;const r=T.$(t.general.messageBody,e);if(!r)return;const s=e.id.replace("message-",""),a=i.direct.messages[s];if("raven_media"!==a.item_type)return;localStorage.logRavenMessages&&console.warn({ravenMessage:a});const l=(null==a?void 0:a.raven_media)||(null==a||null===(o=a.visual_media)||void 0===o?void 0:o.media);if(!l)return;const c="replayable"===a.view_mode||"permanent"===a.view_mode;if(c){const t=r.previousElementSibling;t&&(t.style.display="none")}if(l.video_versions){const t=l.video_versions[0].url;r.outerHTML=`\n          <a class="raven-media-link" href="${t}" target="_blank">\n            ${c?"VIEW VIDEO":"PEEK AT VIDEO"}\n          </a>\n        `}else if(l.image_versions2){const t=T.createUrl(window.inssist.url("/viewer.html"),{src:l.image_versions2.candidates[0].url});r.outerHTML=`\n          <div class="raven-media-link" href="${t}" target="_blank">\n            ${c?"VIEW PHOTO":"PEEK AT PHOTO"}\n          </div>\n        `}else{var d;const t=null==a||null===(d=a.visual_media)||void 0===d?void 0:d.replay_expiring_at_us;t&&new Date(t/1e3).getTime()<Date.now()?r.innerHTML='\n            <div class="raven-media-unavailable">\n              This message has expired or has been viewed already.\n            </div>\n          ':r.innerHTML='\n            <div class="raven-media-unavailable">\n              This message can not be viewed or is no longer available.\n            </div>\n          '}}))})),T.insertMultistyle`
    <style>
      .raven-media-link {
        display: flex;
        flex-direction: row;
        align-items: center;
        font-weight: 600;
        font-size: 13px;
        color: #1BA2F9 !important;
        cursor: pointer;
      }

      .raven-media-link::before {
        content: '';
        width: 0;
        height: 0;
        flex-shrink: 0;
        margin-right: 3px;
        border: 5px solid transparent;
        border-radius: 1px;
        border-left-width: 7px;
        border-left-color: currentColor;
      }

      .raven-media-unavailable {
        line-height: 1.4;
      }
    </style>
  `}};var de={init:function(){(function(){pe=T.ls.get(ue,{});for(const t in pe){for(const e in pe[t])0===pe[t][e].trim().length&&delete pe[t][e];0===Object.keys(pe[t]).length&&delete pe[t]}})(),async function(){const t=St.controller.getConfig().dmSelectors,e=await Ct("store"),n=await Ct("add-dispatch-listener");if(!e||!n)return;let o;try{o=e.getState().users.viewerId}catch(t){return void console.error("dm injection input restore controller:","failed to get viewerId")}if(!o)return;const i=pe[o]||(pe[o]={});n((e=>{if("NAVIGATION_LOCATION_CHANGED"!==e.type)return;if(!e.nextPath.startsWith("/direct/t/"))return;const n=e.nextPath.replace("/direct/t/","");if(!n)return;const o=i[n];o&&setTimeout((()=>{const e=T.$(t.general.textarea);e&&(e.focus(),document.execCommand("insertText",!1,o))}))}));let r=null;T.onDocMutations((()=>{const n=T.$(t.general.textarea);if(!n)return;const o=e.getState().navigation.route.split("/direct/t/")[1];(i[o]||"")!==n.value&&(i[o]=n.value,clearTimeout(r),r=setTimeout((()=>{T.ls.set(ue,pe)}),300))}))}()}};const ue="inssist.dm.input-restore-texts";let pe={};var he={fetch:be,fetchText:async function(...t){const e=await be(...t);return await e.text()},fetchJson:async function(...t){const e=await be(...t);return await e.json()},getCache:function(){return ge},cleanCache:function(){we("cleaning fetcher cache"),ge=[]},ignoreCache:function(t=1){fe+=t},isIgnoreCache:function(){return fe>0}};let ge=[],fe=0;const me=2e4,ye=864e5,ve=!1;async function be(t,e={},n=me){return new Promise(((o,i)=>{(async()=>{let r=setTimeout((()=>{r&&(r=null,i({message:"Timed out"}))}),n);try{const n=await async function(t,e){if(we(`fetching ${t}`),(e=e||{}).method=e.method||"GET",e.method&&"GET"!==e.method)return fetch(t,e);if(fe<=0){const e=Date.now();ge=ge.filter((t=>e-t.on<ye));const n=ge.find((e=>e.url===t));if(n)return we("  fetch cache hit"),n.res.clone()}else we("  ignoring fetch cache");fe>0&&fe--;const n=await fetch(t,e);return ge.push({url:t,on:Date.now(),res:n.clone()}),n}(t,{credentials:"include",...e});if(!r)return;if(clearTimeout(r),r=null,n.ok)return void o(n);if(400!==n.status)return void i({message:String(n.status)});try{const t=await n.text();i({message:String(n.status),body:t})}catch(t){i({message:String(n.status),body:null})}}catch(t){if(!r)return;clearTimeout(r),r=null,i(t)}})()}))}function we(t){ve&&console.log(`%c${t}`,"color: #00ec91")}var xe=he;function _e(){const t=_e;return t.init||(t.init=!0,k`
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
    `),'\n    <div class="spinner-icon">\n      <svg viewBox="0 0 100 100">\n        <rect fill="#555" height="6" opacity="0.083" rx="3" ry="3" transform="rotate(-60 50 50)" width="25" x="72" y="47"/>\n        <rect fill="#555" height="6" opacity="0.166" rx="3" ry="3" transform="rotate(-30 50 50)" width="25" x="72" y="47"/>\n        <rect fill="#555" height="6" opacity="0.25" rx="3" ry="3" width="25" x="72" y="47"/>\n        <rect fill="#555" height="6" opacity="0.33" rx="3" ry="3" transform="rotate(30 50 50)" width="25" x="72" y="47"/>\n        <rect fill="#555" height="6" opacity="0.41" rx="3" ry="3" transform="rotate(60 50 50)" width="25" x="72" y="47"/>\n        <rect fill="#555" height="6" opacity="0.5" rx="3" ry="3" transform="rotate(90 50 50)" width="25" x="72" y="47"/>\n        <rect fill="#555" height="6" opacity="0.58" rx="3" ry="3" transform="rotate(120 50 50)" width="25" x="72" y="47"/>\n        <rect fill="#555" height="6" opacity="0.66" rx="3" ry="3" transform="rotate(150 50 50)" width="25" x="72" y="47"/>\n        <rect fill="#555" height="6" opacity="0.75" rx="3" ry="3" transform="rotate(180 50 50)" width="25" x="72" y="47"/>\n        <rect fill="#555" height="6" opacity="0.83" rx="3" ry="3" transform="rotate(210 50 50)" width="25" x="72" y="47"/>\n        <rect fill="#555" height="6" opacity="0.91" rx="3" ry="3" transform="rotate(240 50 50)" width="25" x="72" y="47"/>\n      </svg>\n    </div>\n  '}var Pe={init:async function(){Se=St.controller.getConfig().dmSelectors,async function(){const t=await Ct("store"),e=await Ot("PolarisDirectActionMarkSeen");if(!t||!e)return;const n=Symbol("handled");T.onDocMutations((()=>{T.$$(Se.leftPanel.conversationUnreadDot).forEach((o=>{if(o[n])return;o[n]=!0;const i=o.closest(Se.leftPanel.conversationItem);if(!i)return;i.classList.add("mark-seen--unread-thread"),o.insertAdjacentHTML("afterbegin",'\n        <svg class="mark-seen" fresh xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">\n          <path fill="none" d="M0 0h30v30H0z"/>\n          <path d="M14.389 21.257l-1.688-1.725 1.846-2 .793.812 9.878-10.187a.291.291 0 01.226-.1.3.3 0 01.227.1l1.425 1.5a.359.359 0 01.008.473L16.278 21.272h-.008a1.488 1.488 0 01-.939.456 1.42 1.42 0 01-.942-.471zm-6.564 0l-4.536-4.644a.337.337 0 010-.473l1.438-1.475a.308.308 0 01.454 0l3.6 3.681 9.873-10.189a.292.292 0 01.227-.1.3.3 0 01.226.1l1.426 1.5a.362.362 0 01.008.473L9.715 21.272h-.008a1.485 1.485 0 01-.939.456 1.42 1.42 0 01-.948-.471z" fill="currentColor"/>\n        </svg>\n      ');const r=T.$(".mark-seen[fresh]");r.removeAttribute("fresh"),r.addEventListener("mousedown",(t=>{t.stopPropagation(),t.preventDefault()})),r.addEventListener("click",(async n=>{n.stopPropagation(),n.preventDefault();const o=await $e(i);t.dispatch(e.markSeen(o.id,o.last_permanent_item,{ignoreGhostMode:!0}))}))}))})),T.insertMultistyle`
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

      .mark-seen--unread-thread:hover ${Se.leftPanel.conversationUnreadDot} {
        background: transparent;
      }
    </style>
  `}()},getThreadDataByThreadElem:$e};let Se;async function $e(t){const e=await async function(t){const e="A"===t.tagName?t:t.querySelector("a");if(e)return e.href.split("/").pop();const n=(await Ct("store")).getState();return(n.navigation.route||n.navigation.displayedRoute).split("/").pop()}(t);if(!e)return null;return(await Ct("store")).getState().direct.threads.get(e)||null}var ke={init:async function(){Ce=St.controller.getConfig().dmSelectors,Pt.on("dm.set-filters",Te),T.onDocMutations((()=>{const t=T.$(Ce.leftPanel.threadList);if(!t)return;const e=""!==t.innerText;Me.classList.toggle("dm--no-threads",!e)})),function(){const t=Symbol("handled");T.onDocMutations((()=>{const e=T.$(Ce.leftPanel.threadListWrap);e&&(e[t]||(e[t]=!0,e.insertAdjacentHTML("beforeend",'\n      <div class="dm-filters-nothing-found">\n        NOTHING FOUND\n      </div>\n    ')))})),T.insertMultistyle`
    <style>
      .dm-filters-nothing-found {
        display: none;
        margin-top: 26px;
        margin-bottom: 0;
        color: #8E8E8E;
        font-weight: 400;
        text-align: center;
      }

      .dm--has-filters.dm--no-threads .dm-filters-nothing-found {
        display: block;
      }
    </style>
  `}(),async function(){const t=await Ct("store");if(!t)return;const e=()=>{const e=T.$(".dm-filters-load-more__counter");if(!e)return;const n=t.getState().direct.threads.size;e.innerText=n;const o=T.$(".dm-filters-load-more__counter-row");o&&(o.style.display=n>1?null:"none")};t.subscribe(e);let n=Promise.resolve();const o=async()=>{Me.classList.add("dm--loading-next-pages"),await n;await Ee()&&(n=T.sleep(25*T.time.SECOND)),Me.classList.remove("dm--loading-next-pages")},i=Symbol("handled");T.onDocMutations((()=>{const t=T.$(".dm-filters-nothing-found");if(!t)return;if(t[i])return;t[i]=!0,t.insertAdjacentHTML("afterend",`\n      <div class="dm-filters-load-more">\n        <div class="dm-filters-load-more__counter-row">\n          searched\n          <span class="dm-filters-load-more__counter"></span>\n          chats\n        </div>\n        <button class="dm-filters-load-more__button">\n          Search older chats\n        </button>\n        <div class="dm-filters-load-more__spinner">\n          ${_e()}\n        </div>\n      </div>\n    `);T.$(".dm-filters-load-more__button").addEventListener("click",o),e()})),T.insertMultistyle`
    <style>
      .dm-filters-load-more {
        margin-top: 30px;
      }
      html:not(.dm--has-older) .dm-filters-load-more {
        display: none;
      }
      html:not(.dm--has-filters) .dm-filters-load-more {
        display: none;
      }

      .dm-filters-load-more__button {
        display: block;
        height: 30px;
        margin: 0 auto;
        padding: 0 12px;
        font-weight: 600;
        color: #00376B;
        background: transparent;
        border: 1px solid currentColor;
        border-radius: 4px;
        outline: none;
        cursor: pointer;
      }
      .dm-filters-load-more__button:active {
        background: rgba(0, 0, 0, 0.03);
      }
      html.dm--loading-next-pages .dm-filters-load-more__button {
        display: none;
      }

      .dm-filters-load-more__spinner {
        display: flex;
        justify-content: center;
        flex-direction: row;
      }
      html:not(.dm--loading-next-pages) .dm-filters-load-more__spinner {
        display: none;
      }

      .dm-filters-load-more__counter-row {
        display: block;
        text-align: center;
        margin-top: -10px;
        margin-bottom: 26px;
        color: #8E8E8E;
        font-weight: 400;
      }

      .dm-filters-load-more__counter {
        font-weight: 600;
      }

      ${Ce.leftPanel.threadListWrap} {
        padding-bottom: 40px;
      }
      .dm--has-filters ${Ce.leftPanel.threadListWrap} {
        padding-bottom: 70px;
      }

      ${Ce.leftPanel.threadListSpinner} {
        margin-bottom: 30px;
      }

      .dm--has-filters ${Ce.leftPanel.threadListSpinner} {
        display: none;
      }

      .dm--has-filters ${Ce.leftPanel.conversationItemWrapSkeleton} {
        display: none;
      }
    </style>
  `}(),function(){const t=Symbol();T.onDocMutations((()=>{T.$$(Ce.leftPanel.conversationItem).forEach((async e=>{if(e[t])return;e[t]=!0;const n=await Pe.getThreadDataByThreadElem(e);if(!n)return;1===n.thread_label&&e.insertAdjacentHTML("afterend",'<div class="DmThreadFlag"></div>')}))})),T.insertMultistyle`
    <style>
      .DmThreadFlag {
        position: absolute;
        top: 0;
        right: 0;
        border: 6px solid #FF8837;
        border-left-color: transparent;
        border-bottom-color: transparent;
      }
    </style>
  `}()}};let Ce;const Me=document.documentElement;async function Te({string:t,unread:e,flagged:n}){const o=Te,i=await Ct("store");if(!i)return;i.dispatch({type:"inssist.dm.apply-filters",string:t,unread:e,flagged:n});const r=!!(t||e||n);Me.classList.toggle("dm--has-filters",r),o.called||(o.called=!0,Me.classList.add("dm--loading-next-pages"),await Ee(),Me.classList.remove("dm--loading-next-pages"))}async function Ee(){let t=await Ae();return t&&(await T.sleep(.5*T.time.SECOND),t=await Ae()),t&&(await T.sleep(.5*T.time.SECOND),t=await Ae()),t&&(await T.sleep(.5*T.time.SECOND),t=await Ae()),t&&(await T.sleep(.5*T.time.SECOND),t=await Ae()),t}async function Ae(){const t=Ae;t.initialized||(t.initialized=!0,t.hasOlder=!0,t.cursor=null);const e=await Ct("store"),n=await Ct("dm-threads-normalizer");if(!e||!n)return!1;if(!t.hasOlder)return!1;let o;try{const e=T.createUrl("https://i.instagram.com/api/v1/direct_v2/inbox/",{cursor:t.cursor||null});o=await xe.fetchJson(e,{headers:{"x-ig-app-id":"1217981644879628"},credentials:"include"})}catch(t){return console.error(t),!1}const{entities:i}=n(o.inbox.threads);return e.dispatch({type:"DIRECT_THREAD_LOADED",messages:i.items,threads:i.threads,users:i.users}),t.cursor=o.inbox.oldest_cursor,t.hasOlder=o.inbox.has_older,Me.classList.toggle("dm--has-older",t.hasOlder),t.hasOlder}let De,Re;async function Le(t){if(!Re)return;const e=new Map;e.set(t,!0),Re.forwardAction(e)}async function Be(){(await Ct("nav")).push("/direct/inbox/")}function Ie(){location.reload()}var Fe={controller:{init:async function(){De=St.controller.getConfig().dmSelectors,Pt.on("dm.start-conversation",Le),Pt.on("dm.go-to-inbox",Be),Pt.on("dm.refresh",Ie),history.pushState=history.replaceState,async function(){const t=await Ct("store");if(!t)return;await T.waitFor((()=>{var e;const n=null===(e=t.getState().direct)||void 0===e?void 0:e.realtimeState;return!!n&&("subscribed"===n.irisConnectivity.toLowerCase()&&"connected"===n.mqttConnectivity.toLowerCase()&&"message"===n.subscriptionType.toLowerCase())}))||console.error("dm injection controller →","initConversationCreator:","failed to wait for webscoket to be ready");const e=await T.waitFor((()=>{const t=T.$(De.dialog.window);if(t)return t;const e=T.$(De.leftPanel.newMessageButton);e&&e.click()}),{frequency:10});if(!e)return void console.error('failed to locate "new chat" dialog');T.$$("button",e)[0].click(),Re=await Ct("dm-conversation-creator")}(),async function(){const t=await Ct("nav"),e=await Ct("add-dispatch-listener");if(!t||!e)return;(async()=>{if("v1"===window.inssist.igBundleVersion){const e=t.push;return void(t.push=t=>{if(t.startsWith("/direct/"))return e(t);Pt.send("dm.ig-go",t)})}const e=await Ct("nav-interceptor");e&&e.beforeGo(((t,e)=>{e.startsWith("/direct/")||(t(),Pt.send("dm.ig-go",e))}))})();{let t;T.insertMultistyle`
      <style>
        ${De.general.postViewerModal} {
          display: none;
        }
      </style>
    `;const n=Symbol("handled");T.onDocMutations((()=>{T.$$(De.general.postPreview).forEach((e=>{e[n]||(e[n]=!0,e.addEventListener("click",(()=>{t=e;const n=e.getAttribute("post-url");n&&Pt.send("dm.ig-go",n)})))}))})),e((async e=>{if("POST_PAGE_LOADING"!==e.type)return;const n=`/p/${e.shortcode}`;if(Pt.send("dm.ig-go",n),!t)return;t.setAttribute("post-url",n);(await T.waitFor((()=>T.$$(De.general.portal)))).forEach((t=>t.style.display="none"))})),e((t=>{"POST_PAGE_LOADED_V2"===t.type&&(t.type="none")}))}}(),async function(){const t=await Ct("dm-delta-parser",15e3);if(!t)return;const e=t.parseDeltaItem;t.parseDeltaItem=(...n)=>{const o=T.safeJsonParse(n[0]);return o&&12e3===o.ttl&&(o.ttl=5e3,n[0]=JSON.stringify(o)),e.call(t,...n)}}(),function(){const t=Symbol("handled");T.onDocMutations((()=>{T.$$("a").forEach((e=>{if(e[t])return;e[t]=!0;e.getAttribute("href").includes("instagram.com")||e.setAttribute("target","_blank")}))}))}(),function(){const t=Symbol("handled");T.onDocMutations((async()=>{const e=T.$(De.general.mediaViewerImage)||T.$(De.general.mediaViewerVideo);if(T.docElem.classList.toggle("media-viewer--open",!!e),!e)return;const n=e.closest(De.dialog.root);if(!n)return;if(n[t])return;n[t]=!0;const o=await T.waitFor((()=>{var t;return e.getAttribute("src")||(null===(t=e.querySelector("source"))||void 0===t?void 0:t.getAttribute("src"))}));n.insertAdjacentHTML("beforeend",`\n      <div class="media-viewer-controls">\n        <a class="media-viewer-controls__button media-viewer-controls__button_open" href="${o}" target="_blank">\n          <svg\n            class="media-viewer-controls__button-icon"\n            xmlns="http://www.w3.org/2000/svg"\n            width="32"\n            height="32"\n            viewBox="0 0 32 32">\n            <defs>\n              <clipPath id="a">\n                <path fill="none" d="M0 0h32v32H0z"/>\n              </clipPath>\n            </defs>\n            <g clip-path="url(#a)">\n              <path fill="none" d="M0 0h32v32H0z"/>\n              <path d="M10.493 22V12h6l-2 2h-2v6h6v-2l2-2v6zm4.149-5.847L19.793 11h-3.3V9.5h6.508v6.453h-1.508V12.7l-5.151 5.152z" fill="currentColor"/>\n            </g>\n          </svg>\n        </a>\n        <div class="media-viewer-controls__button media-viewer-controls__button_close">\n          <svg\n            class="media-viewer-controls__button-icon"\n            xmlns="http://www.w3.org/2000/svg"\n            width="34"\n            height="34"\n            viewBox="0 0 40 40">\n            <path d="M0 0h40v40H0z" fill="transparent"/>\n            <path d="M12.626 25.797l6.062-6.061-6.062-6.061 1.313-1.313L20 18.424l6.061-6.062 1.313 1.313-6.06 6.062 6.06 6.06-1.313 1.313-6.062-6.06-6.06 6.06z" fill="currentColor"/>\n          </svg>\n        </div>\n      </div>\n    `);const i=T.$(".media-viewer-controls__button_open");i.addEventListener("mousedown",(t=>{window.open(i.href)}));T.$(".media-viewer-controls__button_close").addEventListener("click",(()=>{const t=document.createEvent("MouseEvents");t.initMouseEvent("mousedown",!0),n.dispatchEvent(t)}))})),T.insertMultistyle`
    <style>
      .media-viewer--open ${De.dialog.window} {
        max-width: none;
        max-height: none;
        border-radius: 0;
      }

      .media-viewer--open ${De.dialog.window} * {
        border-radius: 0;
        background-color: transparent;
      }

      .media-viewer--open ${De.dialog.mediaViewerCloseButton} {
        display: none;
      }

      ${De.general.mediaViewerContainer} {
        width: calc(100vw - 100px);
        height: calc(100vh - 100px);
      }

      ${De.general.mediaViewerImage},
      ${De.general.mediaViewerVideo} {
        object-fit: contain;
      }

      .media-viewer-controls {
        position: absolute;
        top: 16px;
        right: 16px;
        display: flex;
        flex-direction: row;
        transition: transform 0.3s, opacity 0.3s;
      }
      body:not(:hover) .media-viewer-controls {
        transform: translateX(5px);
        opacity: 0;
        transition-delay: 0.2s;
      }

      .media-viewer-controls__button {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        margin-left: 16px;
        background: #FFF;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
        border-radius: 50%;
        box-sizing: border-box;
      }
      .media-viewer-controls__button:active {
        opacity: 1; /* override ig style */
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.16);
        margin-top: 1px;
      }
      .theme-night .media-viewer-controls__button {
        border: 1px solid #bbb;
        box-shadow: none;
      }

      .media-viewer-controls__button-icon {
        color: #555;
      }
    </style>
  `}(),function(){const t=Symbol("handled"),e=document.documentElement;T.onDocMutations((()=>{const e=T.$(De.dialog.searchRow);e&&(e[t]||(e.scrollLeft=0))})),T.onDocMutations((()=>{T.$$(De.general.iconButton).forEach((e=>{if(e[t])return;e[t]=!0;"0px"===getComputedStyle(e).padding&&e.classList.add("icon-button-with-hitbox")}))})),T.onDocMutations((()=>{const e=T.$(De.leftPanel.requestsTabText);if(!e)return;if(e[t])return;e[t]=!0;const n=Number(e.innerText.replace(/\D/g,""));e.innerHTML=`\n      <span class="requests-tab-plus">+</span>\n      ${n||""}\n    `})),T.onDocMutations((()=>{const t=!!T.$(De.leftPanel.requestsDescription);e.classList.toggle("is-requests-page",t)})),T.onDocMutations((()=>{const t=!!T.$(De.leftPanel.folderTab);e.classList.toggle("has-folder-tabs",t)})),T.onDocMutations((()=>{const e=T.$$(De.leftPanel.subheaderWhenNoFolders).find((e=>!e[t]));if(!e)return;if(e[t])return;T.$$(De.leftPanel.subheaderWhenNoFolders).forEach((e=>e[t]&&e.remove())),e[t]=!0;const n=T.$(De.general.reactRoot);n&&n.appendChild(e)})),T.insertMultistyle`
    <style>
      * {
        font-family: montserrat;
        outline: none;
      }

      ::-webkit-scrollbar {
        display: none;
      }

      body {
        /* prevents content jumping on page initialization */
        width: 100%;
        min-width: 730px;
      }

      ${De.general.page} {
        padding-top: 0;
      }

      ${De.general.header} {
        display: none;
      }

      ${De.general.errorReportPixel} {
        display: none;
      }

      .theme-night ${De.general.blueButton} {
        color: #000;
      }

      ${De.general.postActionsTooltipMe} {
        transform: translateX(20%) scale(0.65);
        transform-origin: right bottom;
      }

      ${De.general.postActionsTooltipPeer} {
        transform: translateX(-20%) scale(0.65);
        transform-origin: left bottom;
      }

      ${De.general.postActionsTooltipTail} {
        display: none;
      }

      ${De.general.threadHeader} {
        height: 51px;
      }

      ${De.general.threadDetailsHeader} {
        height: 51px;
      }

      ${De.general.threadDetailsMuteSection} {
        padding: 16px 12px;
      }

      ${De.general.content} {
        height: 100vh;
      }

      ${De.general.navigation} {
        display: none;
      }

      ${De.general.main} {
        max-height: 100%;
      }

      html.has-folder-tabs:not(.is-requests-page) ${De.leftPanel.header} {
        height: 0;
        border-bottom: none;
      }

      ${De.leftPanel.subheaderWhenNoFolders} {
        display: none;
      }
      ${De.leftPanel.subheaderWhenNoFolders} * {
        padding: 0;
      }
      html.is-requests-page ${De.leftPanel.subheaderWhenNoFolders} {
        display: none;
      }

      html.has-folder-tabs ${De.leftPanel.newMessageButton} {
        top: 25px;
      }

      ${De.leftPanel.tabsContainer} {
        margin-right: 64px;
      }

      ${De.leftPanel.folderTab} {
        font-size: 12px;
        padding: 8px 4px 0 4px;
        position: relative;
        flex-grow: 0;
        margin-right: 12px;
      }
      ${De.leftPanel.folderTab}:first-child {
        margin-left: 17px;
      }
      ${De.leftPanel.folderTab}:last-child {
        margin-right: 0;
      }

      /* hitbox for folder tabs */
      ${De.leftPanel.folderTab}::before {
        content: '';
        position: absolute;
        top: 0;
        left: -6px;
        right: -6px;
        bottom: 0;
      }

      ${De.leftPanel.folderTabsContainer} {
        width: auto;
        overflow: hidden;
        flex: initial;
      }

      ${De.leftPanel.folderTabGeneral} {
        overflow: hidden;
        text-overflow: ellipsis;
        flex-grow: 1;
        display: block;
      }

      ${De.leftPanel.requestsTab} {
        margin-left: 12px;
        padding: 0;
      }

      ${De.leftPanel.requestsTabText} {
        display: flex;
        font-size: 14px;
        font-weight: 600;
        padding: 18px 4px 15px 4px;
        position: relative;
      }

      /* hitbox for requests tab */
      ${De.leftPanel.requestsTabText}::before {
        content: '';
        position: absolute;
        top: 0;
        left: -6px;
        right: -6px;
        bottom: 0;
      }

      ${De.leftPanel.requestsTabContainer} {
        width: auto;
      }

      ${De.dialog.root} {
        background: rgba(255, 255, 255, 0.96);
      }

      ${De.dialog.background} {
        background: transparent;
      }

      ${De.dialog.window} {
        box-shadow: 0 0px 12px rgba(0, 0, 0, 0.1);
        border-radius: 12px;
      }

      ${De.dialog.searchRow} {
        overflow-x: hidden;
      }

      ${De.dialog.searchRowLabel} {
        justify-content: center;
      }

      ${De.dialog.header} {
        padding-right: 12px;
        padding-left: 12px;
      }

      .theme-night ${De.general.emojiPicker} {
        filter: url(#theme-reverse-filter);
        background: #000;
      }

      .icon-button-with-hitbox {
        position: relative;
      }
      .icon-button-with-hitbox::before {
        content: '';
        position: absolute;
        top: -12px;
        left: -12px;
        right: -12px;
        bottom: -12px;
      }

      .requests-tab-plus {
        font-size: 18px;
        margin-right: 4px;
      }

      ${De.general.accountSwitcher} {
        display: none;
      }
    </style>
  `}(),Object.defineProperty(Object.prototype,"maxRows",{get:()=>20,set:()=>!0}),document.addEventListener("keydown",(t=>{if("Enter"!==t.key)return;const e=T.$(De.dialog.submitButton);e&&e.click()})),T.insertMultistyle`
    <style>
      ${De.leftPanel.switchAccountButton} {
        display: none;
      }
    </style>
  `,async function(){const t=await Ct("add-dispatch-listener");if(!t)return;t((t=>{"DIRECT_MESSAGE_UPDATED"===t.type&&(t.mutationToken||Pt.send("dm.message-sent"))}))}(),ae.init(),ce.init(),de.init(),ke.init(),Pe.init(),se.controller.init()}}},Oe={init:async function(){if((await T.waitFor((()=>document.documentElement))).classList.contains("touch"))return;if(window.opener&&location.pathname.startsWith("/accounts/login/"))return;(await T.waitFor((()=>document.body))).insertAdjacentHTML("beforeend",`\n    <button class="open-in-inssist open-in-inssist_below">\n      <div class="open-in-inssist__main">\n        <img class="open-in-inssist__icon" src="${window.inssist.url("/img/icon-128.png")}"/>\n        <span class="open-in-inssist__label">OPEN</span>\n      </div>\n      <div class="open-in-inssist__smile">\n        <span class="open-in-inssist__smile-icon">❀</span>\n        <span class="open-in-inssist__smile-text">&nbsp;</span>\n        \x3c!-- <span class="open-in-inssist__smile-icon">${function(){const t=Array.from(ze).filter((t=>t.trim().length>0)),e=Math.floor(Date.now()/T.time.DAY)%t.length;return t[e]}()}</span> --\x3e\n        \x3c!-- <span class="open-in-inssist__smile-text">smile of the day</span> --\x3e\n      </div>\n    </button>\n  `);const t=T.$(".open-in-inssist");setTimeout((()=>{t.classList.remove("open-in-inssist_below")}),300),t.addEventListener("click",(t=>{t.preventDefault(),t.stopPropagation(),T.setCookie("open-in-inssist",location.pathname)}),!0),T.onDocMutations((()=>{t.classList.toggle("open-in-inssist_hidden",!("www.instagram.com"===location.host||"instagram.com"===location.host))})),T.insertMultistyle`
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
  `}};const ze="\n  🤯🤗🧐🙃😝🤒🤓😑😊😯🙂🤧🥳\n  😬🥰🤪🤨😘🥴🤣😄😀😶😚😖😋\n  😛😵😜😷😴🤔😐😗😃😁🥶🤑😎\n  😉🤫😳😡😱😤😍🤩🤐🤭😇😅😲\n  😂😏😙😆🙄😌😮🥺😈🤤\n";var He={controller:Oe};let Ne,Ve;function je(t){T.ls.set("inssist.tagAssist.collections",t)}function Ue(){return T.ls.get("inssist.tagAssist.collections",[])}var We={controller:{init:async function(){if(Ne=await Ct("store"),Ve=await Ct("add-dispatch-listener"),!Ne||!Ve)return;Pt.on("tag-assist.save-collections-to-ls",je),Pt.on("tag-assist.read-collections-from-ls",Ue),async function(){Ve((t=>{"CREATION_CAPTION_CHANGED"===t.type&&Pt.send("tag-assist.ig-caption-change",t.caption)}))}()}}};async function qe(){const t=await g((()=>document.body));return!t.querySelector("#react-root")&&!t.querySelector('body > div[id*="mount"]')}function Ye(t){try{return encodeURIComponent(t)}catch(e){throw new Error(`failed to encode ${t}`)}}var Ge={controller:{init:function(){!async function(){if(await qe())return;const t=await Ct("config"),e=await Ct("cookies-controller");if(!t||!e)return;e.setCookie=(e,n,o={})=>{if(t.needsToConfirmCookies()&&"ig_cb"!==e)return;const i={path:"/",...o};null===n&&(i.maxage=-1);let r=`${Ye(e)}=${Ye(n)}`;i.maxage&&(i.expires=new Date(Date.now()+i.maxage)),i.path&&(r+=`; path=${i.path}`),i.domain&&(r+=`; domain=${i.domain}`),i.expires&&(r+=`; expires=${i.expires.toUTCString()}`),document.cookie=`${r}; SameSite=none; secure`}}()}}};function Xe(){return!e(St.controller.getConfig().igSelectors.general.tabBarCreatePostIconOldNavDesign)}var Qe={init:function(){Je=St.controller.getConfig().igSelectors,Pt.on("feature-encourage.start-story-creation",Ze),Pt.on("feature-encourage.start-post-creation",tn),Pt.on("feature-encourage.start-reels-creation",en),T.insertMultistyle`
    <style>
      ${Je.general.creationPopup} {
        opacity: 0;
        pointer-events: none;
      }
    </style>
  `,T.onDocMutations((()=>{const t=!!T.$(Je.general.creationPopup);Ke!==t&&(Ke=t,Ke?(Ke=!0,Pt.send("feature-encourage.toggle-creation-card",!0),requestAnimationFrame((()=>{document.addEventListener("click",nn),document.addEventListener("keydown",on)}))):nn())}))}};let Je,Ke=!1;async function Ze(){It.controller.stopReelsCreationSession();const t=await Ct("nav");if("feedPage"!==(await Ct("store")).getState().navigation.pageIdentifier&&t.push("/"),Xe()){await T.waitFor((()=>T.$(Je.general.storiesBar))),await T.waitFor((()=>window.innerWidth<window.innerHeight));(await T.waitFor((()=>T.$(Je.general.tabBarCreatePostButtonLink)))).click();const t=T.$(Je.general.creationPopupStoryButton);if(!t)return;t.click(),await T.sleep(150)}else{const t=await T.waitFor((()=>T.$(Je.general.createStoryHeaderButton)));if(!t)return;await T.waitFor((()=>window.innerWidth<window.innerHeight)),t.click()}}function tn(){if(It.controller.stopReelsCreationSession(),Xe()){return void T.$(Je.general.creationPopupPostButton).click()}T.$(Je.general.tabBarCreatePostButton).click()}function en(){const t=Xe()?T.$(Je.general.tabBarCreatePostInput):T.$(Je.general.tabBarInput),e=t.getAttribute("accept"),n=e.split(", ").filter((t=>t.startsWith("video"))).join(", ");if(t.setAttribute("accept",n),Xe()){T.$(Je.general.creationPopupPostButton).click()}else{T.$(Je.general.tabBarCreatePostButton).click()}t.setAttribute("accept",e),It.controller.startReelsCreationSession()}function nn(){Ke=!1,Pt.send("feature-encourage.toggle-creation-card",!1),requestAnimationFrame((()=>{document.removeEventListener("click",nn),document.removeEventListener("keydown",on)}))}function on(t){"Escape"===t.key&&nn()}var rn={controller:{init:function(){Qe.init()}}},sn=function(){$`
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
  `,function(){const t=St.controller.getConfig().fcsSelectors,o=St.controller.getConfig().dmSelectors,i=St.controller.getConfig().igSelectors;x((function t(n){const o=e("body");if(!o)return;x.off(t);new MutationObserver(s).observe(o,{childList:!0,subtree:!0}),s(n)}));let r=!1;function s(s){if(r)return;const a=s.map((t=>Array.from(t.addedNodes))).flat();if(0===a.length)return;const l=window.inssist.theme.emojiRegex,c=(e("body").innerText.match(l)||[]).filter((t=>!"0123456789#*↪".includes(t)));if(0===c.length)return;const d=[],u=Array.from(new Set(c)),p=["input","textarea","[contenteditable]",o.general.emojiPicker,i.general.postCaption,t.sidePanel.postPreviewCaption].map((t=>n(t))).flat();a.forEach((t=>{let e;if(e=t.nodeType===Node.ELEMENT_NODE?t:t.parentElement,!e)return;const n=document.createTreeWalker(e,NodeFilter.SHOW_TEXT);for(;;){const t=n.nextNode();if(!t)break;const e=t.textContent;if(!u.some((t=>e.includes(t))))continue;if(p.some((e=>e.contains(t))))continue;const o=t.parentElement;o.classList.contains("emoji")||(d.includes(o)||d.push(o))}})),requestAnimationFrame((()=>{r=!0,d.forEach((t=>{if(!document.body.contains(t))return;let e=t.innerHTML;u.forEach((t=>{const n=`<span class="emoji">${t}</span>`;e=e.split(n).join("__$%#^__").split(t).join(n).split("__$%#^__").join(n)})),t.innerHTML=e})),r=!1}))}}()};function an(t){t&&(h.classList.remove("theme-day"),h.classList.remove("theme-night"),h.classList.add(`theme-${t}`))}var ln={init:function(){!async function(){an(await Pt.send("theme.get-theme"))}(),async function(){Pt.on("theme.switch-theme",(t=>{an(t)}))}(),sn()}};let cn;var dn={controller:{init:function(){cn=St.controller.getConfig().igSelectors,async function(){const t=document.documentElement,e=await Pt.send("zen.is-enabled");t.classList.toggle("zen--enabled",e),Pt.on("zen.toggled",(e=>{t.classList.toggle("zen--enabled",e)}))}(),function(){const t=Symbol("handled");T.onDocMutations((()=>{T.$$(cn.feedPage.postHeader).forEach((e=>{if(e[t])return;e[t]=!0;const n=e.closest(cn.feedPage.post);if(!n)return;const o=T.$(cn.feedPage.postActions,n);if(!o)return;const i=T.$(cn.feedPage.postThreeDotsButton,n);if(!i)return;const r=()=>{n.classList.add("zen--post-with-hovered-header")},s=()=>{n.classList.remove("zen--post-with-hovered-header")};e.addEventListener("mouseenter",r),o.addEventListener("mouseenter",r),i.addEventListener("mouseenter",r),e.addEventListener("mouseleave",s),o.addEventListener("mouseleave",s),i.addEventListener("mouseleave",s)}))}))}(),async function(){const t=await Ct("nav");if(!t)return;Pt.on("zen.toggled",(e=>{e&&"/"!==location.pathname&&t.push("/")}))}(),function(){const t=Symbol("handled");T.onDocMutations((()=>{T.$$(cn.feedPage.post).forEach((e=>{e[t]||(e[t]=!0,T.$$("[alt]",e).forEach((t=>{t.removeAttribute("alt")})))}))}))}(),T.insertMultistyle`
    <style>
      .zen--enabled[data-page="feedPage"] ${cn.feedPage.followSuggestions} {
        margin: 10px 14px;
      }

      .zen--enabled[data-page="feedPage"] ${cn.feedPage.postPhoto},
      .zen--enabled[data-page="feedPage"] ${cn.feedPage.postVideoContainer},
      .zen--enabled[data-page="feedPage"] ${cn.feedPage.postPhotoContainer},
      .zen--enabled[data-page="feedPage"] ${cn.feedPage.postMediaContainer},
      .zen--enabled[data-page="feedPage"] ${cn.feedPage.postCarouselContainer} {
        max-height: 70vh;
      }

      .zen--enabled[data-page="feedPage"] ${cn.feedPage.postMediaContainer} {
        background: #FFF !important;
      }

      .zen--enabled[data-page="feedPage"] ${cn.feedPage.post} {
        background: #1b1b1b;
        overflow: hidden;
        margin: 8px 16px 5px 16px;
        border-radius: 8px;
        position: relative;
      }
      .zen--enabled[data-page="feedPage"] ${cn.feedPage.post}:first-child {
        margin-top: 0;
      }

      /* semitransparent border */
      .zen--enabled[data-page="feedPage"] ${cn.feedPage.post}::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border: 1px solid rgba(0, 0, 0, 0.1);
        z-index: 1;
        pointer-events: none;
        border-radius: inherit;
      }

      .zen--enabled[data-page="feedPage"] ${cn.feedPage.postHeader} {
        position: absolute;
        top: 0;
        left: 0;
        height: 56px;
        z-index: 1;
        border-color: transparent;
        padding: 0 16px;
        max-width: none;
        border-radius: 8px 0 16px 0;
      }
      .zen--enabled.theme-night[data-page="feedPage"] ${cn.feedPage.postHeader} {
        background: rgba(255, 255, 255, 0.2);
      }
      .zen--enabled[data-page="feedPage"] .zen--post-with-hovered-header ${cn.feedPage.postHeader} {
        right: 0;
        border-radius: 8px 8px 0 0;
      }

      .zen--enabled[data-page="feedPage"] ${cn.feedPage.postHeaderBeforePseudo} {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 56px;
        background: rgba(0, 0, 0, 0.4);
        border-radius: 8px 0 16px 0;
      }
      .zen--enabled[data-page="feedPage"] .zen--post-with-hovered-header ${cn.feedPage.postHeaderBeforePseudo} {
        height: 96px;
        border-radius: 8px 8px 0 0;
      }
      .zen--enabled.theme-night ${cn.feedPage.postHeaderBeforePseudo} {
        filter: url(#theme-reverse-filter);
      }

      .zen--enabled[data-page="feedPage"] ${cn.feedPage.postHeaderItem} {
        position: relative;
      }
      .zen--enabled[data-page="feedPage"] .zen--post-with-hovered-header ${cn.feedPage.postHeaderItem} {
        top: 0;
      }

      /* hitbox when header is hovered */
      .zen--enabled[data-page="feedPage"] .zen--post-with-hovered-header ${cn.feedPage.postHeader}::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: -20px;
      }

      /* divider between actions */
      .zen--enabled[data-page="feedPage"] .zen--post-with-hovered-header ${cn.feedPage.postHeader}::after {
        content: "";
        position: absolute;
        top: 56px;
        left: 12px;
        right: 12px;
        height: 1px;
        border-top: 1px solid #fff;
        transform: scaleY(0.5);
        opacity: 0.25;
      }
      .zen--enabled.theme-night[data-page="feedPage"] ${cn.feedPage.postHeader}::after {
        filter: url(#theme-reverse-filter);
      }

      .zen--enabled[data-page="feedPage"] ${cn.feedPage.postHeader} * {
        color: #FFF !important;
      }
      .zen--enabled.theme-night[data-page="feedPage"] ${cn.feedPage.postHeader} * {
        color: #000 !important;
      }

      .zen--enabled[data-page="feedPage"] ${cn.feedPage.postLocationRow} {
        display: flex;
        flex-direction: row;
        align-items: baseline;
      }

      .zen--enabled[data-page="feedPage"] ${cn.feedPage.postHashtagLocation} {
        margin-left: 12px;
      }

      .zen--enabled[data-page="feedPage"] ${cn.feedPage.postHashtagLocation}::before {
        content: '';
        position: absolute;
        width: 4px;
        height: 4px;
        top: 6px;
        left: -8px;
        background: #fff;
        border-radius: 50%;
      }
      .zen--enabled.theme-night[data-page="feedPage"] ${cn.feedPage.postHashtagLocation}::before {
        background: #000;
      }

      .zen--enabled[data-page="feedPage"] ${cn.feedPage.postThreeDotsButtonWrap} {
        position: absolute;
        top: 9px;
        right: 0;
        z-index: 1;
      }

      .zen--enabled[data-page="feedPage"] ${cn.feedPage.postThreeDotsButton} {
        z-index: 1;
        opacity: 0;
        pointer-events: none;
        position: static;
      }

      .zen--enabled[data-page="feedPage"] .zen--post-with-hovered-header ${cn.feedPage.postThreeDotsButton} {
        opacity: 1;
        pointer-events: all;
      }

      .zen--enabled[data-page="feedPage"] ${cn.feedPage.postThreeDotsButton} svg {
        fill: #FFF;
      }
      .zen--enabled.theme-night[data-page="feedPage"] ${cn.feedPage.postThreeDotsButton} svg {
        fill: #000;
      }

      .zen--enabled[data-page="feedPage"] ${cn.feedPage.postFooterWrap1},
      .zen--enabled[data-page="feedPage"] ${cn.feedPage.postFooterWrap2} {
        position: static;
      }

      .zen--enabled[data-page="feedPage"] ${cn.feedPage.postFooter} {
        position: absolute;
        top: -6px;
      }

      .zen--enabled[data-page="feedPage"] ${cn.feedPage.postActions} {
        display: none;
        position: absolute;
        top: 57px;
        left: 17px;
        z-index: 1;
        margin: 0 !important;
        transform: scale(0.73);
        transform-origin: left center;
        pointer-events: none;
      }
      .zen--enabled[data-page="feedPage"] .zen--post-with-hovered-header ${cn.feedPage.postActions} {
        display: inherit;
        pointer-events: all;
      }

      .zen--enabled[data-page="feedPage"] ${cn.feedPage.postAfterActions} {
        display: none;
      }

      .zen--enabled[data-page="feedPage"] ${cn.feedPage.postAction} {
        margin-right: 7px;
      }

      .zen--enabled[data-page="feedPage"] ${cn.feedPage.postAction} svg {
        fill: #FFF;
        stroke: #FFF;
        color: #FFF !important;
      }
      .zen--enabled.theme-night[data-page="feedPage"] ${cn.feedPage.postAction} svg {
        fill: #000;
        stroke: #000;
        color: #000 !important;
      }

      .zen--enabled[data-page="feedPage"] ${cn.feedPage.postAction}:not(:first-child) svg * {
        stroke-width: 2.5px !important;
      }

      .zen--enabled[data-page="feedPage"] ${cn.feedPage.postUnderActionsContent} {
        display: none;
      }

      .zen--enabled[data-page="feedPage"] ${cn.feedPage.carouselDots} {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 12px;
      }

      .zen--enabled[data-page="feedPage"] ${cn.feedPage.carouselDot} {
        background: #FFF;
        box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
      }

      @media (max-width: 500px) {
        .zen--enabled[data-page="feedPage"] ${cn.feedPage.post}:first-child {
          margin-top: 16px !important;
        }
      }

      @media (max-width: 350px) {
        .zen--enabled[data-page="feedPage"] ${cn.feedPage.followSuggestions} {
          margin-left: 0;
          margin-right: 0;
        }
      }
    </style>
  `}}},un={init:function(){pn=St.controller.getConfig().igSelectors,window.inssist.moduleInterceptor.registerReduxAction("inssist.cover-assist.set-cover",((t,e)=>({...t,creation:{...t.creation,coverPhoto:{...t.creation.coverPhoto,file:e.file,dataURL:e.url}}}))),async function(){let t=null;const e=await Ct("store");if(!e)return;Pt.on("cover-assist.synch-cover",(n=>{if(!T.$(pn.postCreation.previewPostImage))return;const o=e.getState();n?(o.creation.sessionId!==t&&(t=o.creation.sessionId,hn={url:o.creation.coverPhoto.dataURL,blob:o.creation.coverPhoto.file}),e.dispatch({type:"inssist.cover-assist.set-cover",url:URL.createObjectURL(n),file:n})):o.creation.sessionId===t&&e.dispatch({type:"inssist.cover-assist.set-cover",url:hn.url,file:hn.blob})}))}(),Pt.on("cover-assist.get-default-ig-cover-url",gn)}};let pn,hn=null;async function gn(){var t,e;const n=await Ct("store");return n?hn?hn.url:null===(t=n.getState().creation)||void 0===t||null===(e=t.coverPhoto)||void 0===e?void 0:e.dataURL:null}var fn={controller:un};const mn={init:function(){this.video=null,this.audio=null,this.overlay=null,this.helpers=null,this.musicUrl=null,this.musicStart=0,this.musicVolume=0,this.videoVolume=0,this.onVideoResize=this.onVideoResize.bind(this),this.onWindowResize=this.onWindowResize.bind(this),this.videoResizeObserver=null,this.autoRegister(),this.handleDataUpdates()},autoRegister:function(){x((()=>{const t=e("video[music-assist-player]");t&&!this.video?this.register(t):!t&&this.video&&this.unregister()}))},handleDataUpdates:function(){a.isIframe()?Pt.on("music-assist.update-player-data",this.applyData.bind(this)):Kt.on("music-assist.update-player-data",this.applyData.bind(this))},register:function(t){document.head.insertAdjacentHTML("beforeend",`\n      <style class="MusicAssistPlayer__style">\n        ${this.getStyles()}\n      </style>\n    `),document.body.insertAdjacentHTML("afterend",'\n      <div class="MusicAssistPlayer__helpers">\n        <audio class="MusicAssistPlayer__audio"></audio>\n        <div class="MusicAssistPlayer__overlay">\n          <div class="MusicAssistPlayer__spinner"></div>\n          <div class="MusicAssistPlayer__pause"></div>\n        </div>\n      </div>\n    '),this.video=t,this.audio=document.querySelector(".MusicAssistPlayer__audio"),this.style=document.querySelector(".MusicAssistPlayer__style"),this.overlay=document.querySelector(".MusicAssistPlayer__overlay"),this.helpers=document.querySelector(".MusicAssistPlayer__helpers"),this.musicUrl&&(this.audio.src=this.musicUrl),this.audio.volume=this.musicVolume,this.video.volume=this.videoVolume,this.videoResizeObserver=new ResizeObserver(this.onVideoResize),this.videoResizeObserver.observe(this.video),window.addEventListener("resize",this.onWindowResize),this.updateOverlayPosition(),setTimeout((()=>this.updateOverlayPosition()),300),setTimeout((()=>this.updateOverlayPosition()),1e3),this.startMusicAndVideoSync(),this.video.addEventListener("play",(()=>{this.startMusicAndVideoSync()})),this.video.addEventListener("timeupdate",(()=>{this.video&&(a.isIframe()?Pt.send("music-assist.set-video-current-time",this.video.currentTime):Kt.send("music-assist.set-video-current-time",this.video.currentTime))}))},unregister:function(){this.style.remove(),this.helpers.remove(),this.video=null,this.audio=null,this.style=null,this.overlay=null,this.helpers=null,this.videoResizeObserver.disconnect(this.video),this.videoResizeObserver=null,window.removeEventListener("resize",this.onWindowResize),this.stopMusicAndVideoSync()},applyData:function({isStory:t,musicUrl:e,musicStart:n,musicVolume:o,videoVolume:i}){if(!this.video)return this.musicUrl=e,this.musicStart=n,this.musicVolume=o,void(this.videoVolume=i);this.musicVolume=o,this.videoVolume=i,e&&(this.audio.volume=o),!e&&t||(this.video.volume=i),this.musicUrl!==e&&(this.musicUrl=e,e?(this.audio.src=e,this.video.currentTime=0,this.video.play()):(this.audio.pause(),this.audio.removeAttribute("src"),this.video.currentTime=0,this.video.pause())),this.musicStart!==n&&(this.musicStart=n,e&&(this.video.currentTime=0,this.video.play())),e?this.startMusicAndVideoSync():this.stopMusicAndVideoSync()},onVideoResize:function(){this.updateOverlayPosition()},onWindowResize:function(){this.updateOverlayPosition()},updateOverlayPosition:function(){if(!this.video)return;if(!this.overlay)return;const t=this.video.getBoundingClientRect();this.overlay.style.top=`${t.top}px`,this.overlay.style.left=`${t.left}px`,this.overlay.style.width=`${t.width}px`,this.overlay.style.height=`${t.height}px`},startMusicAndVideoSync:function(){if(!this.musicUrl)return;if(this.syncEnabled)return;this.video.paused||setTimeout((()=>{this.video.currentTime=this.video.currentTime,this.video.play()}),100),this.syncEnabled=!0;const t=this.video,e=this.audio;let n,o;this.onPauseClick=()=>{this.playing=!1,document.documentElement.classList.toggle("MusicAssistPlayer--playing",this.playing)},document.querySelector(".MusicAssistPlayer__pause").addEventListener("click",this.onPauseClick),this.playing=!1,this.ignoreSyncOnPlay=!1,this.ignoreSyncOnPause=!1,this.ignoreSyncOnSeeking=!1,this.ignoreAudioPause=!1,this.onVideoPause=()=>{this.ignoreSyncOnPause?this.ignoreSyncOnPause=!1:(this.playing=!1,document.documentElement.classList.toggle("MusicAssistPlayer--playing",this.playing),i("pause"))},t.addEventListener("pause",this.onVideoPause),this.onVideoPlay=()=>{this.ignoreSyncOnPlay?this.ignoreSyncOnPlay=!1:(this.playing=!0,document.documentElement.classList.toggle("MusicAssistPlayer--playing",this.playing),i("play"))},t.addEventListener("play",this.onVideoPlay),this.onVideoSeeking=()=>{this.ignoreSyncOnSeeking?this.ignoreSyncOnSeeking=!1:i("seeking")},t.addEventListener("seeking",this.onVideoSeeking),t.pauseNoSync=()=>{t.paused||(this.ignoreSyncOnPause=!0,t.pause())},t.playNoSync=()=>{t.paused&&(this.ignoreSyncOnPlay=!0,t.play())};const i=i=>{clearTimeout(o),o=setTimeout((async()=>{if(clearTimeout(n),!this.video)return;if(!this.audio)return;if(!this.musicUrl)return;t.pauseNoSync(),e.pauseNoSync();const o=t.currentTime;this.ignoreSyncOnSeeking=!0,t.currentTime=o,e.currentTime=this.musicStart+o,n=setTimeout((()=>{document.documentElement.classList.add("MusicAssistPlayer--loading")}),300);const i=new Promise((t=>e.oncanplay=t)),r=new Promise((e=>t.oncanplay=e));await Promise.all([i,r]),clearTimeout(n),document.documentElement.classList.remove("MusicAssistPlayer--loading"),this.playing&&(t.playNoSync(),(!e.ended||e.currentTime<e.duration)&&e.play())}))};e.pauseNoSync=()=>{e.paused||(this.ignoreAudioPause=!0,e.pause())},this.audioOnPause=()=>{this.ignoreAudioPause?this.ignoreAudioPause=!1:e.ended||t.pauseNoSync()},e.addEventListener("pause",this.audioOnPause)},stopMusicAndVideoSync:function(){this.syncEnabled=!1,document.documentElement.classList.toggle("MusicAssistPlayer--playing",!1),document.documentElement.classList.toggle("MusicAssistPlayer--loading",!1),this.video&&(this.video.removeEventListener("pause",this.onVideoPause),this.video.removeEventListener("play",this.onVideoPlay),this.video.removeEventListener("seeking",this.onVideoSeeking)),this.audio&&this.audio.removeEventListener("pause",this.audioOnPause);const t=document.querySelector(".MusicAssistPlayer__pause");t&&t.removeEventListener("click",this.onPauseClick)},getStyles:function(){return'\n      <style>\n        /* hide native spinner */\n        video[music-assist-player]::-webkit-media-controls {\n          visibility: hidden;\n        }\n        video[music-assist-player]::-webkit-media-controls-enclosure {\n          visibility: visible;\n        }\n\n        .MusicAssistPlayer__overlay {\n          position: fixed;\n          display: flex;\n          align-items: center;\n          justify-content: center;\n          pointer-events: none;\n          overflow: hidden;\n        }\n        html.theme-night .MusicAssistPlayer__overlay {\n          filter: url(#theme-reverse-filter); /* for injection */\n        }\n\n        .MusicAssistPlayer__spinner {\n          --size: 40px;\n          --thickness: 3px;\n          --color-bg: transparent;\n          --color-value: #fff;\n          width: var(--size);\n          height: var(--size);\n          border-radius: 50%;\n          border-top: var(--thickness) solid var(--color-bg);\n          border-right: var(--thickness) solid var(--color-value);\n          border-bottom: var(--thickness) solid var(--color-value);\n          border-left: var(--thickness) solid var(--color-value);\n          animation: MusicAssistPlayer__rotate 0.9s infinite linear;\n          filter:  drop-shadow(0 0 1px rgba(0, 0, 0, 0.16));\n          margin-top: -20px;\n        }\n        .MusicAssistPlayer__spinner::after {\n          width: 100%;\n          height: 100%;\n          border-radius: 50%;\n        }\n        html:not(.MusicAssistPlayer--loading) .MusicAssistPlayer__spinner {\n          display: none;\n        }\n        @keyframes MusicAssistPlayer__rotate {\n          0% { transform: rotate(0deg); }\n          100% { transform: rotate(360deg); }\n        }\n\n        .MusicAssistPlayer__pause {\n          width: 36px;\n          height: 36px;\n          position: absolute;\n          left: 6px;\n          bottom: 30px;\n          border-radius: 50%;\n          cursor: pointer;\n          pointer-events: all;\n          background-size: 20px;\n          background-repeat: no-repeat;\n          background-position: center;\n          background-image: url("data:image/svg+xml;base64,PHN2ZyBmaWxsPSJXaW5kb3ciIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogICAgPHBhdGggZD0iTTYgMTloNFY1SDZ2MTR6bTgtMTR2MTRoNFY1aC00eiIvPgogICAgPHBhdGggZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSIvPgo8L3N2Zz4K");\n          transition: background-color 0.3s;\n          display: none;\n        }\n        .MusicAssistPlayer__pause:hover {\n          background-color: #212123;\n        }\n        html.MusicAssistPlayer--loading.MusicAssistPlayer--playing .MusicAssistPlayer__pause {\n          display: block;\n        }\n        /* hide native pause button  */\n        html.MusicAssistPlayer--loading.MusicAssistPlayer--playing video::-webkit-media-controls-play-button {\n          visibility: hidden;\n        }\n      </style>\n    '.replace("<style>","").replace("</style>","")}},yn={init:function(){this._addMusicToVideoBeforeUpload()},_addMusicToVideoBeforeUpload:function(){zt.define("addMusic",(async t=>{if(!await Pt.send("music-assist.should-generate-video"))return;const e=await Pt.send("music-assist.generate-video",t[0].file);e&&(t[0].file=e,t[0].dataURL=URL.createObjectURL(e))}))}},vn={init:async function(){this.sel=St.controller.getConfig().igSelectors,this.state={selectedTrackName:null},this.createPill(),this.insertStyles(),this.handlePillClicks(),this.updateUiWhenNeeded(),this.registerVideoPlayer(),this.resetStateOnCreationSessionStart()},createPill:function(){const t=Symbol("handled");T.onDocMutations((()=>{const e=T.$(".StoryAssistToggleButton_video");e&&(e[t]||(e[t]=!0,e.insertAdjacentHTML("beforebegin",this.renderPill())))}))},handlePillClicks:function(){T.docElem.addEventListener("click",(t=>{if(t.target.closest(".MusicAssistStoryPill__cancel"))return void Pt.send("new-post-extra.cancel-click","music-assist");t.target.closest(".MusicAssistStoryPill")&&Pt.send("music-assist.open-for-story-creation")}))},updateUiWhenNeeded:function(){Pt.on("new-post-extra.update-pill-music",(({name:t})=>{this.state.selectedTrackName=t,this.updateUi()}))},updateUi:function(){const t=T.$(".MusicAssistStoryPill");t&&(t.outerHTML=this.renderPill()),T.docElem.classList.toggle("MusicAssist--hasSelectedTrack",!!this.state.selectedTrackName)},registerVideoPlayer:function(){const t=Symbol("handled");T.onDocMutations((()=>{const e=T.$(this.sel.storyCreation.video);e&&(e[t]||(e[t]=!0,e.setAttribute("music-assist-player","")))}))},resetStateOnCreationSessionStart:function(){Kt.on("ig.creation-session-start",(()=>{this.state.selectedTrackName=null,this.updateUi()}))},renderPill:function(){return`\n      <div class="\n        MusicAssistStoryPill\n        ${this.state.selectedTrackName?"":"MusicAssistStoryPill_empty"}\n      ">\n        <svg class="MusicAssistStoryPill__icon" viewBox="0 0 24 24">\n          <path d="M0 0h24v24H0Z" fill="none"/>\n          <path d="M18.5 5.438a.937.937 0 0 0-1.22-.893L7.906 7.313a.937.937 0 0 0-.656.893v7.658a4.052 4.052 0 0 0-.937-.115c-1.554 0-2.813.84-2.813 1.875s1.259 1.877 2.812 1.877 2.812-.839 2.812-1.875v-6.847l7.5-2.2v5.41a4.052 4.052 0 0 0-.937-.115c-1.553 0-2.812.839-2.812 1.875s1.259 1.875 2.812 1.875 2.813-.839 2.813-1.875V5.438Z" fill="currentColor"/>\n        </svg>\n        <div class="MusicAssistStoryPill__text">\n          ${this.state.selectedTrackName}\n        </div>\n        <div class="MusicAssistStoryPill__cancel">\n          <svg width="8" height="8" viewBox="0 0 8 8">\n            <path d="M6.5-.001 4 2.499l-2.5-2.5-1.5 1.5 2.5 2.5-2.5 2.5 1.5 1.5 2.5-2.5 2.5 2.5 1.5-1.5-2.5-2.5 2.5-2.5Z" fill="currentColor"/>\n          </svg>\n        </div>\n      </div>\n    `},insertStyles:function(){T.insertMultistyle`
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
    `}};var bn={init:function(){mn.init(),yn.init(),vn.init()}};const wn=E.selectors,{$:xn}=T;var _n={init:async function(){if(Pn=await Ct("http"),Sn=await Ct("add-dispatch-listener"),!Pn||!Sn)return;const t=await T.waitFor((()=>window.inssist.desktopReelsData));Object.assign($n,t),function(){const t=Symbol("handled");T.onDocMutations((()=>{if(!$n.creatingReels)return;if(!!(!xn(wn.uploadForm)&&!xn(wn.creationBodyRight)))return;const e=xn(wn.modalTitle);if(e){if(e[t])return;e[t]=!0,e.innerText="New Reel / Powered by Yezer"}const n=xn(wn.creationDndText);if(n){if(n[t])return;n[t]=!0,n.innerText="Drag video for your Reel here."}const o=xn(wn.creationDndIcon);if(o){if(o[t])return;o.setAttribute("width","77"),o.setAttribute("height","77"),o.setAttribute("viewBox","0 0 24 24"),o.innerHTML='\n        <path\n          d="M15.548 14.007l-.006-.005-.006-.004-4.696-2.73s0 0 0 0a.736.736 0 00-.381-.113.73.73 0 00-.373.108c-.262.11-.407.371-.407.662v5.464c0 .262.155.511.398.658h0l.009.004a.899.899 0 00.352.098.88.88 0 00.314-.069l.063-.022.012-.004.012-.006 4.697-2.732h0l.001-.001a.743.743 0 00.357-.658c0-.259-.152-.505-.346-.65zM20.764 3.85h0l-.003-.004c-.534-.513-1.125-.945-1.943-1.247-.816-.301-1.85-.47-3.264-.47h-6.5c-1.394 0-2.417.169-3.233.476-.818.307-1.42.75-1.974 1.283h0l-.003.004C3.33 4.428 2.9 5.02 2.599 5.834c-.3.812-.469 1.837-.469 3.234v6.514c0 1.396.169 2.432.475 3.255.306.824.748 1.428 1.282 1.964l.002.002c.534.513 1.126.945 1.943 1.246.816.302 1.85.47 3.264.47h6.5c1.394 0 2.428-.168 3.249-.475.823-.307 1.425-.75 1.96-1.285l.001-.002c.513-.535.944-1.128 1.245-1.947.3-.817.469-1.853.469-3.27V9.068c0-1.397-.169-2.422-.475-3.24-.306-.819-.748-1.422-1.28-1.977zm-5.168-.2c1.31 0 2.174.166 2.788.41.612.244.985.567 1.314.896.466.468.897 1.045 1.149 2.216h-3.665L15.19 3.65h.406zm-6.948 0h4.734l1.991 3.522H10.64L8.648 3.65zM4.952 4.957c.435-.436.982-.87 2.065-1.12l1.897 3.336h-5.11c.25-1.17.682-1.748 1.148-2.216zm16.05 10.667c0 1.313-.167 2.178-.41 2.794-.243.613-.565.987-.894 1.316-.328.33-.712.652-1.33.896-.62.244-1.482.411-2.772.411H9.054c-1.31 0-2.174-.167-2.788-.411-.612-.243-.985-.566-1.314-.896a3.699 3.699 0 01-.893-1.332c-.244-.62-.41-1.486-.41-2.778v-6.93h17.353v6.93z"\n          fill="currentColor"\n          stroke="#FFF"\n          stroke-width=".8"\n        />\n      '}})),T.insertMultistyle`
    <style>
      .reels--creating ${wn.creationCarouselAddMediaButton},
      .reels--creating ${wn.creationGeoOption},
      .reels--creating ${wn.creationAccessibilityDropdown},
      .reels--creating ${wn.creationAdvancedDropdown},
      .reels--creating ${wn.creationDropdown},
      .reels--creating ${wn.creationBottomHr} {
        display: none !important;
      }
    </style>
  `}(),It.patchHttp(Pn,{isCreatingReels:()=>$n.creatingReels,isSharingToFeed:()=>$n.shareToFeed,onSuccess:()=>{true||($n.freeReels-=1),T.setCookie("desktop-reels.submit-success",1)}}),function(){const t=Symbol("handled");T.onDocMutations((async()=>{if(!$n.creatingReels)return;const e=xn(wn.creationRatioToggler);if(!e)return;if(e[t])return;e[t]=!0,e.click();const n=await T.waitFor((()=>xn(wn.creationRatioOptionVertical)),{timeout:1e3,frequency:10});n&&(n.click(),e.click())}))}(),function(){const t=Symbol("handled");T.onDocMutations((()=>{if(!$n.creatingReels)return;const e=xn(wn.creationAccessibilityDropdown);if(!e)return;if(e[t])return;e[t]=!0,e.insertAdjacentHTML("beforebegin",'\n      <div class="ShareToFeed">\n        <div class="ShareToFeed__switch">\n          <div class="ShareToFeed__switchLabel">\n            Also Share to Feed\n          </div>\n          <div class="ShareToFeed__switchControl"></div>\n        </div>\n      </div>\n    ');const n=xn(".ShareToFeed");n.addEventListener("click",(()=>{$n.shareToFeed=!$n.shareToFeed,n.classList.toggle("ShareToFeed_on",$n.shareToFeed)}))})),T.insertMultistyle`
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
  `}(),function(){if(true)return;const t=Symbol("handled");T.onDocMutations((()=>{if(!$n.creatingReels)return;if(!xn(wn.creationNextButton))return;const e=xn(wn.creationBody);if(!e)return;if(e[t])return;e[t]=!0,e.insertAdjacentHTML("beforebegin",`\n      <div class="ReelsUpgradeToProBar">\n        <div class="ReelsUpgradeToProBar__text">\n          Free Reels Remaining: ${$n.freeReels} / ${$n.maxFreeReels}\n        </div>\n        <button class="ReelsUpgradeToProBar__button">\n          Get Unlimited Reels\n        </button>\n      </div>\n    `);xn(".ReelsUpgradeToProBar__button").addEventListener("click",(()=>{T.setCookie("desktop-reels.open-billing","keep-ig-tab")}))})),T.insertMultistyle`
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
  `}(),function(){if(true)return;const t=Symbol("handled");T.onDocMutations((()=>{if($n.freeReels>0)return;if(!$n.creatingReels)return;const e=xn(wn.creationDndBody);if(!e)return;if(e[t])return;e[t]=!0,e.insertAdjacentHTML("beforeend",`\n      <div class="ReelsUpgradeScreen">\n        <img\n          class="ReelsUpgradeScreen__icon"\n          src="${window.inssist.url("img/rocket.png")}"/>\n        <div class="ReelsUpgradeScreen__text">\n          Reels posting is a PRO feature Powered by Yezer.<br/>\n          Please consider upgrading to continue posting Reels.\n        </div>\n        <button class="ReelsUpgradeScreen__button">\n          UPGRADE TO PRO\n        </button>\n      </div>\n    `);xn(".ReelsUpgradeScreen__button").addEventListener("click",(()=>{T.setCookie("desktop-reels.open-billing",1)}))})),T.insertMultistyle`
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
  `}(),function(){if(true)return;const t=Symbol("handled");T.onDocMutations((()=>{if(!$n.creatingReels)return;if($n.freeReels>0)return;if(!xn(".ShareToFeed"))return;const e=xn(wn.creationNextButton);e&&(e[t]||(e[t]=!0,e.style.opacity=.5,e.addEventListener("click",(t=>{t.preventDefault(),t.stopPropagation(),T.setCookie("desktop-reels.open-billing","keep-ig-tab")}),{capture:!0})))}))}(),function(){const t=Symbol("handled");T.onDocMutations((()=>{if(!$n.creatingReels)return;const e=xn('[accept*="video/mp4"]');e&&(e[t]||(e[t]=!0,e.multiple=!1,e.setAttribute("accept","video/mp4,video/quicktime")))}))}(),Sn((t=>{"NAVIGATION_FEED_CREATION_CLOSE"===t.type&&(T.docElem.classList.remove("reels--creating"),$n.shareToFeed=!1,$n.creatingReels=!1)}))},startReelsCreationSession:function(){if(T.docElem.classList.add("reels--creating"),$n.creatingReels=!0,!window.cookieStore)return;T.setCookie("desktop-reels.get-initial-data"),window.cookieStore.addEventListener("change",(function t(e){const n=e.changed.find((t=>"desktop-reels.initial-data"===t.name));if(!n)return;window.cookieStore.removeEventListener("change",t);const o=JSON.parse(n.value);Object.assign($n,o)}))}};let Pn,Sn;const $n={shareToFeed:!1,creatingReels:!1,hasPro:!0,freeReels:0,maxFreeReels:0};var kn={controller:_n};const Cn=E.selectors,{$:Mn}=T;let Tn,En,An;function Dn(t){const e=Mn(".CreationPopup");e&&e.classList.toggle("CreationPopup_show",t)}var Rn={controller:{init:async function(){if(Tn=await Ct("nav"),En=await Ct("http"),An=await Ct("store"),!Tn||!En||!An)return;T.onDocMutations((()=>{const t=!Mn(Cn.topNav);document.documentElement.classList.toggle("isSidebarNav",t)})),T.insertMultistyle`
    <style>
      ${Cn.creationLoadingBar} {
        position: absolute;
        top: 0;
      }
    </style>
  `,function(){const t=En.post.bind(En);En.post=(...e)=>(e[0]&&e[0].includes("configure_to_igtv")&&!e[0].endsWith("/")&&(e[0]=`${e[0]}/`),t(...e))}(),async function(){const t=await Ot("PolarisAPIRuploadVideo"),e=await Ot("PolarisIGTVConstants");let n=0,o=null;const i=e.UPLOAD_CHUNK_SIZE;t.ruploadVideoOffset=t=>{let e;return o&&t.entityName!==o?(n=0,e=0):(e=n,n+=i),o=t.entityName,e}}(),function(){const t=Symbol("handled");T.onDocMutations((()=>{const e=Mn(Cn.newPostButton);e&&(e[t]||(e[t]=!0,e.insertAdjacentHTML("afterend",'\n    <div class="CreationPopup">\n      <div class="CreationPopup__option" data-id="post">\n        <svg class="CreationPopup__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">\n          <path\n            d="M7.164 22.654A5.17 5.17 0 012 17.49V7.164A5.17 5.17 0 017.164 2H17.49a5.17 5.17 0 015.164 5.164V17.49a5.17 5.17 0 01-5.164 5.164zm0-1.757H17.49a3.794 3.794 0 003.41-3.407V14.8l-3.68-3.661-4.394 5.934L8 14.866 3.766 17.7a3.832 3.832 0 003.398 3.2zM3.757 7.164v8.4L7.8 12.785l4.5 2.081 4.681-6.525 3.919 3.922v-5.1a3.794 3.794 0 00-3.41-3.406H7.164a3.794 3.794 0 00-3.407 3.407zm3.943.874a1.709 1.709 0 111.7 1.708 1.709 1.709 0 01-1.7-1.708z"\n            fill="currentColor"\n            stroke="#fff"\n            stroke-width=".4"\n          />\n        </svg>\n        New Post\n      </div>\n      <div class="CreationPopup__option" data-id="reel">\n        <svg class="CreationPopup__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">\n          <path\n            d="M15.548 14.007l-.006-.005-.006-.004-4.696-2.73s0 0 0 0a.736.736 0 00-.381-.113.73.73 0 00-.373.108c-.262.11-.407.371-.407.662v5.464c0 .262.155.511.398.658h0l.009.004a.899.899 0 00.352.098.88.88 0 00.314-.069l.063-.022.012-.004.012-.006 4.697-2.732h0l.001-.001a.743.743 0 00.357-.658c0-.259-.152-.505-.346-.65zM20.764 3.85h0l-.003-.004c-.534-.513-1.125-.945-1.943-1.247-.816-.301-1.85-.47-3.264-.47h-6.5c-1.394 0-2.417.169-3.233.476-.818.307-1.42.75-1.974 1.283h0l-.003.004C3.33 4.428 2.9 5.02 2.599 5.834c-.3.812-.469 1.837-.469 3.234v6.514c0 1.396.169 2.432.475 3.255.306.824.748 1.428 1.282 1.964l.002.002c.534.513 1.126.945 1.943 1.246.816.302 1.85.47 3.264.47h6.5c1.394 0 2.428-.168 3.249-.475.823-.307 1.425-.75 1.96-1.285l.001-.002c.513-.535.944-1.128 1.245-1.947.3-.817.469-1.853.469-3.27V9.068c0-1.397-.169-2.422-.475-3.24-.306-.819-.748-1.422-1.28-1.977zm-5.168-.2c1.31 0 2.174.166 2.788.41.612.244.985.567 1.314.896.466.468.897 1.045 1.149 2.216h-3.665L15.19 3.65h.406zm-6.948 0h4.734l1.991 3.522H10.64L8.648 3.65zM4.952 4.957c.435-.436.982-.87 2.065-1.12l1.897 3.336h-5.11c.25-1.17.682-1.748 1.148-2.216zm16.05 10.667c0 1.313-.167 2.178-.41 2.794-.243.613-.565.987-.894 1.316-.328.33-.712.652-1.33.896-.62.244-1.482.411-2.772.411H9.054c-1.31 0-2.174-.167-2.788-.411-.612-.243-.985-.566-1.314-.896a3.699 3.699 0 01-.893-1.332c-.244-.62-.41-1.486-.41-2.778v-6.93h17.353v6.93z"\n            fill="currentColor"\n            stroke="#fff"\n            stroke-width=".25"\n          />\n        </svg>\n        New Reel\n      </div>\n      <div class="CreationPopup__poweredBy">\n        Powered by Yezer\n      </div>\n    </div>\n  '),e.addEventListener("click",(t=>{t.preventDefault(),t.stopPropagation(),Dn()}))))})),document.addEventListener("click",(()=>{Dn(!1)})),document.addEventListener("click",(t=>{const e=t.target.closest(".CreationPopup__option");if(!e)return;!function(t){"post"===t?An.dispatch({type:"NAVIGATION_FEED_CREATION_OPEN"}):"reel"===t&&(kn.controller.startReelsCreationSession(),An.dispatch({type:"NAVIGATION_FEED_CREATION_OPEN"}))}(e.dataset.id)}))}(),T.insertMultistyle`
    <style>
      /* show new post menu item when creation injection is ready */
      ${Cn.newPostMenuItem} {
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
    </style>
  `,function(){let t=0;const e=En.post.bind(En);En.post=async(...n)=>{const o=n[0].includes("/configure_to_clips"),i=n[0].includes("/configure_to_igtv");if(!o&&!i)return e(...n);let r,s;try{r=await e(...n)}catch(t){s=t}if(s||"fail"===r.status){if(t+=1,t<=5)return En.post(...n);throw t=0,s||new Error("failed to post")}return r}}(),async function(){const t=await Ct("add-dispatch-listener");if(!t)return;t((t=>{var e;"SHOW_NEW_UPLOADED_POST"===t.type&&"clips"===(null===(e=t.post)||void 0===e?void 0:e.productType)&&location.reload()}))}(),function(){let t;T.onDocMutations((()=>{const e=Mn(Cn.creationPublishingSpinner);if(e)if(t){if(t!==e.src){const t=Mn(".PublishingTitle"),e=Mn(".PublishingDisclaimer");t&&t.remove(),e&&e.remove()}}else t=e.src,e.insertAdjacentHTML("afterend",'\n      <div class="PublishingTitle">\n        Publishing Post...\n      </div>\n      <div class="PublishingDisclaimer">\n        Waiting for Instagram to publish the post, this\n        might take a&nbsp;few minutes. Please keep this\n        tab open until Inssist confirms the publish is complete.\n      </div>\n    '),T.onDocMutations((function t(){if(Mn(Cn.creationPublishingSpinner))return;T.onDocMutations.off(t);const e=Mn(".PublishingTitle"),n=Mn(".PublishingDisclaimer");e&&e.remove(),n&&n.remove()}));else t=null})),T.insertMultistyle`
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

      ${Cn.creationPublishingSpinnerContainerWrap} {
        position: static;
      }

      ${Cn.creationPublishingSpinnerContainer} {
        position: static;
        align-items: center;
        justify-content: center;
      }
    </style>
  `}()}}};let Ln,Bn;function In(t){chrome.tabs.create({url:t,active:!0})}var Fn={controller:{init:function(){if(Ln=!!window.electron,Bn=a.isIframe()&&a.getParams().isElectron,!Ln&&!Bn)return;Ln&&Pt.on("electron-links.open-url",In);document.addEventListener("click",(t=>{const e=t.target.closest("a");if(!e)return;if("_blank"!==e.getAttribute("target"))return;const n=e.getAttribute("href");n.startsWith("/")||(t.preventDefault(),t.stopPropagation(),Bn?Pt.send("electron-links.open-url",n):In(n))}),{capture:!0})}}};async function On(t){var e;if(!t)return null;let n;try{n=await fetch(t)}catch(t){}if(null===(e=n)||void 0===e?void 0:e.ok){const t=await n.blob();return URL.createObjectURL(t)}return null}var zn={controller:{init:function(){Pt.on("cdn-proxy.fetch",On)}}};var Hn={controller:{init:function(){this._stripMetadataBeforeUpload()},_stripMetadataBeforeUpload:function(){zt.define("stripVideoMetadata",(async t=>{const e=await Pt.send("strip-metadata.strip",t[0].file);e&&(t[0].file=e,t[0].dataURL=URL.createObjectURL(e))}))}}};var Nn={controller:{init:async function(){this._fusion=St.controller.getConfig().ig,this._store=await Ct("store"),this._getStoriesContext=await Ct("get-stories-context"),this._ghostViewEnabled=await Pt.send("ghost-story-view.is-enabled"),this._patchReelSeen(),this._handleToggling(),this._handleNavigation()},_patchReelSeen:async function(){(await Ct("add-dispatch-listener"))((t=>{this._ghostViewEnabled&&t.type===this._fusion.STORY_REELS_ITEM_SEEN&&(t.type="__NONE__")}));const t=await Ot("PolarisAPIReelSeen");if(!t)return;const e=t.reelSeen.bind(t);t.reelSeen=(...t)=>{if(!this._ghostViewEnabled)return e(...t);Pt.send("ghost-story-view.used")}},_handleToggling:async function(){Pt.on("ghost-story-view.toggled",(t=>{this._ghostViewEnabled=t,t?this._showUpsellOverlayIfNeeded():this._resumeStories()}))},_handleNavigation:function(){let t;this._store.subscribe((()=>{var e;const n=null===(e=this._store.getState().navigation)||void 0===e?void 0:e.pageIdentifier;n!==t&&(t=n,this._showUpsellOverlayIfNeeded())}))},_showUpsellOverlayIfNeeded:async function(){if(await Pt.send("ghost-story-view.has-pro"))return;if(!this._ghostViewEnabled)return;"StoriesPage"===this._store.getState().navigation.pageIdentifier&&(this._pauseStories(),Pt.send("ghost-story-view.show-upsell-overlay"))},_pauseStories:function(){T.waitFor((()=>{const t=this._getStoriesContext();if(t)return t.updateStoriesContext({isPaused:!0}),t.isPaused}))},_resumeStories:function(){const t=this._getStoriesContext();t&&t.updateStoriesContext({isPaused:!1})}}};var Vn={getState:async function(){const t=await Ct("store"),e=await g((()=>t.getState()));return JSON.parse(JSON.stringify(e))},ensureElems:function(t){for(const e of Object.values(t)){if(!e)return null;if(Array.isArray(e)&&0===e.length)return null}return t},requireIgModule:Ct,require:Ct,docElem:document.documentElement,onDomReady:w(),onDocClick:w(),onPathChange:w(),onBeforePostCreation:w(),onBeforeStoryCreation:w(),onMediaProcessingError:w()};function jn(t){let e="";if(t<0&&(e="-",t=-t),t<1)return e+String(Number.isInteger(t)?t:t.toFixed(3));if(t<10)return e+String(Number.isInteger(t)?t:t.toFixed(2));if(t<100)return e+String(Number.isInteger(t)?t:t.toFixed(1));if(t<1e3)return e+String(Number.isInteger(t)?t:t.toFixed(1));const n=["k","m","b","t"];let o=null,i=null;for(let e=0;e<n.length;e++)if(t<Math.pow(1e3,e+2)){if(i=n[e],o=t/Math.pow(1e3,e+1),o=o<10?Math.round(100*o)/100:o<100?Math.round(10*o)/10:Math.round(o),o>=1e3)continue;break}return o?e+String(o)+i:e+"999t+"}var Un={create:function t({show:n=!1,onClick:o=null,removeOnClick:i=!1}={}){const r=t;r.init||(r.init=!0,$`
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
    `);const s=document.createElement("div");s.innerHTML=`\n    <div class="spinner ${n?"spinner_visible":""}">\n      <div class="spinner__inner">\n        ${_e()}\n      </div>\n    </div>\n  `;const a=s.firstElementChild;document.body.appendChild(a),i&&!o&&(o=()=>{a.remove()});if(o){e(".spinner__inner",a).addEventListener("click",o)}return a},toggle:function(t,e){t.classList.toggle("spinner_visible",e)}};let Wn,qn,Yn=!1,Gn=!1,Xn=!1,Qn=!1;var Jn={on:function(t={}){Xn=!0,void 0!==t.mouseEventsAllowed&&(Qn=t.mouseEventsAllowed);if(Gn)return;Gn=!0,function(){const t=[window,document.documentElement],e=["ontouchstart","ontouchmove","ontouchcancel","ontouchend"];for(let n=0;n<t.length;n++)for(let o=0;o<e.length;o++)t[n]&&void 0===t[n][e[o]]&&(t[n][e[o]]=null)}(),function(){const t=350;let e=!1,n=null;const o=()=>{n=Date.now()},i=()=>{e=Date.now()-n>t},r=t=>{e&&(e=!1,to(t))};document.addEventListener("touchstart",o,!0),document.addEventListener("touchend",i,!0),document.addEventListener("click",r,!0)}(),window.addEventListener("mousedown",eo("touchstart"),!0),window.addEventListener("mousemove",eo("touchmove"),!0),window.addEventListener("mouseup",eo("touchend"),!0)},off:function(){Xn=!1}};function Kn(t,e,n,o,i){o=o||0,i=i||0,this.identifier=e,this.target=t,this.clientX=n.clientX+o,this.clientY=n.clientY+i,this.screenX=n.screenX+o,this.screenY=n.screenY+i,this.pageX=n.pageX+o,this.pageY=n.pageY+i}function Zn(){const t=[];return t.item=function(t){return this[t]||null},t.identifiedTouch=function(t){return this[t+1]||null},t}function to(t){Qn||(t.preventDefault(),t.stopPropagation())}function eo(t){return function(e){Xn&&(e.target.closest("textarea")||e.target.closest("input")||e.target.closest("select")||e.target.closest("video")||to(e),1===e.which&&(("mousedown"===e.type||!qn||qn&&!qn.dispatchEvent)&&(qn=e.target),Yn&&!e.shiftKey&&(no("touchend",e),Yn=!1),no(t,e),!Yn&&e.shiftKey&&(Yn=!0,Wn={pageX:e.pageX,pageY:e.pageY,clientX:e.clientX,clientY:e.clientY,screenX:e.screenX,screenY:e.screenY},no("touchstart",e)),"mouseup"===e.type&&(Wn=null,Yn=!1,qn=null)))}}function no(t,e){const n=document.createEvent("Event");n.initEvent(t,!0,!0),n.altKey=e.altKey,n.ctrlKey=e.ctrlKey,n.metaKey=e.metaKey,n.shiftKey=e.shiftKey,n.touches=io(e,t),n.targetTouches=io(e,t),n.changedTouches=function(t,e){const n=oo(t);!Yn||"mouseup"===t.type||"touchstart"!==e&&"touchend"!==e||n.splice(0,1);return n}(e,t),qn.dispatchEvent(n)}function oo(t){const e=new Zn;if(Yn){const n=75,o=Wn.pageX-t.pageX,i=Wn.pageY-t.pageY;e.push(new Kn(qn,1,Wn,-1*o-n,-1*i+n)),e.push(new Kn(qn,2,Wn,o+n,i-n))}else e.push(new Kn(qn,1,t,0,0));return e}function io(t,e){if("mouseup"===t.type)return new Zn;const n=oo(t);return Yn&&"mouseup"!==t.type&&"touchend"===e&&n.splice(1,1),n}const{$:ro,$$:so}=T;var ao={init:function(){co=St.controller.getConfig(),lo=co.igSelectors,function(){const t=XMLHttpRequest.prototype.open,e=XMLHttpRequest.prototype.send;XMLHttpRequest.prototype.open=function(e,n){return this.method=e,this.url=n,this.addEventListener("readystatechange",(()=>{if(429!==this.status)return;const[t,e]=n.split("?"),o=(e||"").split("&"),i=o.indexOf("__a=1");-1!==i&&(o.splice(i,1),location.href=`${t}?${o.join("&")}`)})),t.apply(this,arguments)},XMLHttpRequest.prototype.send=function(t){return"POST"===this.method&&this.url.includes("/create/configure/")&&(t=function(t,e){if(!t||0===t.length)return t;let n=t.split("&");return n=n.map((t=>{if(0!==t.indexOf("caption="))return t;let n="";return t.split("%23").forEach(((t,o)=>{n+=0===o?t:o<=e?"%23"+t:t})),n})),n.join("&")}(t,30)),e.call(this,t)}}(),T.insertMultistyle`
    <style>
      * {
        outline: none;
      }

      html {
        background: #fff;
      }

      ${lo.general.footer} {
        display: none;
      }

      ${lo.general.main} {
        margin-bottom: 0;
      }

      ${lo.general.pageLayoutNewNavDesign} {
        bottom: 0;
      }

      ${lo.general.rootNewNavDesign} {
        padding-bottom: 58px; /* compensate tab bar height */
      }

      ${lo.general.contentSection} {
        background: #fff;
      }

      ${lo.general.nextPageLoaderFeed} {
        margin-top: 20px;
        margin-bottom: 20px;
      }
      ${lo.general.nextPageLoaderProfile},
      ${lo.general.nextPageLoaderExplore} {
        margin-top: 30px;
        margin-bottom: 30px;
      }

      ${lo.general.settingsRectangle} {
        margin-top: 25px;
      }

      ${lo.general.bottomNotification} {
        left: 8px;
        right: 8px;
        margin-bottom: 66px;
        border-radius: 4px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
      }
      ${lo.general.bottomNotification} * {
        color: #333;
        background: #FFF;
      }

      ${lo.dragPanel.root} {
        user-select: none;
      }

      ${lo.commentsPage.body} {
        min-height: auto;
      }

      ${lo.commentsPage.footer} {
        height: 0;
      }

      ${lo.commentsPage.comment} {
        user-select: initial;
      }

      ${lo.commentsPage.lastListItem} {
        margin-bottom: 60px;
      }

      ${lo.general.expandVideoButton} {
        display: none;
      }

      ${lo.general.continueWatchingOverlay} {
        display: none;
      }

      ${lo.general.modalWindow} {
        max-width: 400px;
      }

      ${lo.general.uploadPanelVideoIcon} {
        left: 6px;
      }

      ${lo.feedPage.postsContainer} {
        max-width: 100%;
      }

      /* instagram hides default (black) icon on action button hover (like/comment/share)
         and shows gray icon, we alter this logic and always show black icon */
      ${lo.feedPage.postActionIconDefault} {
        display: block;
      }
      ${lo.feedPage.postActionIconHovered} {
        display: none;
      }

      ${lo.feedPage.body} {
        background: #fff;
        /* disable annoying instagram's story bar loading transition */
        transform: none;
      }

      ${lo.feedPage.loadMoreSpinner} {
        margin-bottom: -30px;
      }

      ${lo.general.tabBarButton} {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
      }

      /* expand hitbox for the tab bar links */
      ${lo.general.tabBarLink} {
        display: flex;
        width: 100%;
        justify-content: center;
      }

      ${lo.profilePage.toggleSuggestionsButton} {
        display: none;
      }

      ${lo.postPage.postHeader},
      ${lo.postPage.postFooter},
      ${lo.feedPage.postFooter} {
        background: #fff;
      }

      ${lo.general.storiesBarLoadingPanel} {
        display: none;
      }

      ${lo.general.createStoryHeaderButton} {
        cursor: pointer;
        position: relative;
      }
      ${lo.general.createStoryHeaderButton}::before {
        content: '';
        position: absolute;
        top: -5px;
        left: -5px;
        right: -5px;
        bottom: -5px;
      }

      ${lo.postCreation.closeButton} {
        transform: scale(0.8);
        position: relative;
        cursor: pointer;
      }
      ${lo.postCreation.closeButton}::before {
        content: '';
        position: absolute;
        top: -5px;
        left: -5px;
        right: -5px;
        bottom: -5px;
      }

      ${lo.general.uploadPanelText} {
        display: block;
      }

      ${lo.feedPage.postBody} {
        background: #fff;
      }

      ${lo.general.toastMessage} {
        margin-bottom: 60px;
      }

      ${lo.profilePage.tab} {
        color: #8e8e8e;
      }

      ${lo.profilePage.activeTab} {
        color: #262626;
      }

      ${lo.activityPage.topListContainer} {
        padding-bottom: 16px;
      }

      ${lo.activityPage.headerBottomLine} {
        display: none;
      }

      ${lo.general.tabBarContainer} {
        background: transparent;
        display: block;
      }
      ${lo.general.tabBarTopContainer} {
        z-index: 10;
        background: transparent;
      }
      ${lo.general.tabBar} {
        background: #fff;
      }

      ${lo.explorePage.searchContainer} {
        margin: 8px 12px;
        justify-content: center;
      }
      @media (min-width: 340px) {
        ${lo.explorePage.searchContainer} {
          margin-bottom: 20px;
        }
      }

      ${lo.explorePage.header} {
        background: #fff;
      }

      ${lo.explorePage.search} {
        display: none;
      }

      ${lo.explorePage.main} {
        padding-top: 10px;
      }

      ${lo.explorePage.searchInputPlaceholder} {
        opacity: 0;
      }

      ${lo.general.tabBarWrap} {
        z-index: 100;
      }

      ${lo.profilePageFeedTab.postFooter} {
        border-left: none;
      }

      ${lo.profilePageFeedTab.addCommentSection} {
        padding: 16px;
      }

      ${lo.profilePageFeedTab.addCommentTypeahead} {
        display: none;
      }

      ${lo.general.postPhotoOverlay} {
        display: none;
      }

      ${lo.general.tryMbsSection} {
        display: none;
      }

      ${lo.storyViewer.videoPlayer} {
        height: 100%;
      }

      ${lo.storyCreation.submitButton} {
        background: #0095f6;
        border-radius: 19px;
        padding: 8px 12px 8px 9px;
      }
    </style>
  `,T.insertMultistyle`
    <style>
      .theme-night {
        background: #fff !important;
      }

      .theme-night [aria-label*="Carousel"],              /* user page post type carousel */
      .theme-night [aria-label*="Video"],                 /* user page post type video */
      .theme-night [aria-label*="Reel"],                  /* user page post type reel */
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

      .theme-night ${lo.general.storyQuickReactionsBackground} {
        background: linear-gradient(to bottom, transparent, #000);
      }

      .theme-night ${lo.general.storyFooter} textarea {
        filter: none !important;
      }

      .theme-night ${lo.general.storyFooter} .emoji {
        filter: none !important;
      }

      .theme-night ${lo.general.postVideoContainer} {
        background: #fff;
      }

      .theme-night ${lo.profilePage.reelPreviewStats} {
        filter: url(#theme-reverse-filter);
      }

      .theme-night ${lo.profilePage.postVideoIcon} {
        filter: url(#theme-reverse-filter);
      }

      .theme-night ${lo.profilePage.postVideoOverlay} {
        filter: url(#theme-reverse-filter);
      }

      .theme-night video {
        background: #000;
      }


      /* --- for bundle v2 --- */

      .theme-night ${lo.storyViewer.root},
      .theme-night ${lo.general.carouselNavButton},
      .theme-night ${lo.profilePage.reelIcon},
      .theme-night ${lo.storyCreation.root} {
        filter: url(#theme-reverse-filter);
      }

      .theme-night ${lo.storyViewer.avatar},
      .theme-night ${lo.storyViewer.image},
      .theme-night ${lo.storyViewer.video},
      .theme-night ${lo.storyViewer.videoPoster},
      .theme-night ${lo.storyCreation.canvas},
      .theme-night ${lo.storyCreation.mentionReelItemAvatar},
      .theme-night ${lo.storyCreation.video} {
        filter: none;
      }

      .theme-night ${lo.general.blueButton},
      .theme-night ${lo.storyCreation.textInput} {
        color: #000;
      }

      .theme-night ${lo.storyCreation.uploadHeader} {
        filter: url(#theme-filter);
      }

      .theme-night ${lo.general.postCaption} {
        filter: url(#theme-reverse-filter);
        color: #C6C6C6;
      }

      .theme-night ${lo.general.postCaptionLink} {
        color: #7FB5E3;
      }

      .theme-night ${lo.postCreation.videoPlayButton} {
        filter: url(#theme-reverse-filter);
      }

      .theme-night ${lo.feedPage.carouselDots} {
        filter: url(#theme-reverse-filter);
      }

      .theme-night ${lo.storyViewer.viewAsAvatar} {
        filter: none;
      }
    </style>
  `,T.insertMultistyle`
    <style>
      ${lo["general_use-application-bar"]} {
        display: none !important;
      }

      ${lo.general.useAppGradientBar} {
        display: none !important;
      }
    </style>
  `,function(){const t=Symbol("handled");T.onDocMutations((()=>{const e=ro(lo.dragPanel.igIcon);if(!e)return;if(e[t])return;e[t]=!0;const n=ro(lo.dragPanel.root);so("button",n).pop().click()}))}(),T.insertMultistyle`
    <style>
      ::-webkit-scrollbar {
        display: none;
      }
    </style>
  `,async function(){const t=(e,n)=>{0!==e?requestAnimationFrame((()=>{t(e-1,n)})):n()};await T.waitForDocumentReady(),t(5,(()=>{Vn.docElem.scrollTop=0}))}(),T.insertMultistyle`
    <style>
      /* spinners for profile tabs */
      ._2z6nI > .jmJva,
      ._2z6nI > .vlh0C {
        margin-bottom: 100vh;
      }
    </style>
  `,T.insertMultistyle`
    <style>
      /* header top-left button */
      ${lo["header-top-level-button"]} button {
        cursor: pointer;
      }

      /* hitbox for header top-left button */
      ${lo["header-top-level-button"]} a,
      ${lo["header-top-level-button"]} button {
        position: relative;
      }
      ${lo["header-top-level-button"]} a::before,
      ${lo["header-top-level-button"]} button::before {
        content: '';
        position: absolute;
        top: -12px;
        left: -12px;
        right: -12px;
        bottom: -12px;
      }

      ${lo.general.tabBarCreatePostButton} {
        cursor: pointer;
      }
    </style>
  `,T.insertMultistyle`
    <style>
      /* text of "your story" button */
      ${lo["your-story-button-text"]} {
        width: 64px;
      }
    </style>
  `,T.insertMultistyle`
    <style>
      ${lo["profile-send-message-button"]} {
        white-space: nowrap;
        overflow: hidden;
      }
    </style>
  `,function(){const t="_enhanceProfileStats_",e=t=>{t.forEach((t=>{t.style.height=""}));const e=Array.from(t).map((t=>t.offsetHeight)),n=Math.max(...e);t.forEach((t=>{t.style.height=`${n}px`}))};T.onDocMutations((()=>{const n=Vn.ensureElems({statContainers:so(lo["profile-page-stat-container"]),statItems:so(lo["profile-page-stat-item"])});Vn.docElem.classList.toggle("enhance-stats",!!n),n&&(n.statItems[0][t]||(n.statItems[0][t]=!0,n.statItems.forEach((t=>{t.innerHTML=t.innerHTML.replace("(","").replace(")",""),t.firstChild.nodeType===Node.TEXT_NODE&&t.appendChild(t.firstChild);const e=t.lastChild;e.textContent=e.textContent.toLowerCase().replace(":","")})),e(n.statContainers)))})),window.addEventListener("resize",(()=>{const t=so(lo["profile-page-stat-container"]);e(t)})),T.insertMultistyle`
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
  `}(),T.onDocMutations((()=>{const t=Vn.ensureElems({commentForm:ro(lo["comment-form"]),avatar:ro(lo["comment-form-avatar"]),form:ro(lo["comment-form-form"]),textarea:ro(lo["comment-form-textarea"]),submit:ro(lo["comment-form-submit-button"])});Vn.docElem.classList.toggle("enhance-comment-form",!!t)})),T.insertMultistyle`
    <style>
      /* comment form */
      .enhance-comment-form ${lo["comment-form"]} {
        align-items: flex-start !important;
      }

      /* avatar */
      .enhance-comment-form ${lo["comment-form-avatar"]} {
        top: 5px;
      }

      /* form */
      .enhance-comment-form ${lo["comment-form-form"]} {
        padding: 0;
        border-radius: 11px;
        margin-bottom: 30px;
        position: relative;
      }

      /* textarea */
      .enhance-comment-form ${lo["comment-form-textarea"]} {
        padding: 12px 16px;
        max-height: 50vh;
        min-height: 42px;
        box-sizing: border-box;
      }

      /* submit */
      .enhance-comment-form ${lo["comment-form-submit-button"]} {
        position: absolute;
        top: 100%;
        margin-top: 10px;
      }
    </style>
  `,T.insertMultistyle`
    <style>
      ${lo["profile-page-grid-stretch-element"]} {
        display: none;
      }
    </style>
  `,T.onDocMutations((()=>{ro(lo.dragPanel.handle)?Jn.on({mouseEventsAllowed:!0}):location.pathname.startsWith("/create/")?Jn.on({mouseEventsAllowed:!1}):!location.pathname.startsWith("/stories/")||location.pathname.startsWith("/stories/direct/")?Jn.off():Jn.on({mouseEventsAllowed:!1})})),function(){const t=150;let e=null,n=!0;const o=async()=>{const o=so(lo["post-video"]);if(0===o.length)return;const i=o.find((e=>{const n=e.getBoundingClientRect();return n.left>=0&&n.left+n.width<=window.innerWidth&&n.top>-1*t&&n.top+n.height<window.innerHeight+t}));i?e&&i===e||(e&&e.pause(),e=i,n&&(i.muted=!0),await i.play(),i.addEventListener("volumechange",(()=>{n=!1}))):e&&(e.pause(),e=null)};T.onDocMutations(o),window.addEventListener("scroll",o)}(),function(){const t=Array.prototype.some;Array.prototype.some=function(...e){let n;return n=2===this.length&&"instagram.com"===this[0]&&"facebook.com"===this[1]?["instagram.com"]:this,t.call(n,...e)}}(),T.insertMultistyle`
    <style>
      ${lo["post-tagged-people-button"]} {
        top: 0 !important;
        bottom: auto !important;
      }
    </style>
  `,T.onDocMutations((t=>{t.forEach((t=>{t.removedNodes.forEach((t=>{t.nodeType===HTMLElement.ELEMENT_NODE&&("VIDEO"===t.tagName?[t]:t.querySelectorAll("video")).forEach((t=>{t.src="",t.load()}))}))}))})),T.insertMultistyle`
    <style>
      video::-webkit-media-controls-fullscreen-button {
        display: none;
      }
    </style>
  `,function(){const t="__disablePictureInPictureForVideos",e=e=>{e[t]||(e[t]=!0,e.disablePictureInPicture=!0)};T.onDocMutations((()=>{const t=so("video");t.length&&t.forEach(e)}))}(),function(){const t=Symbol("handled"),e=e=>{e[t]||(e[t]=!0,e.addEventListener("click",(t=>{t.preventDefault(),e.paused?e.play():e.pause()})))};T.onDocMutations((()=>{const t=so(lo["post-video"]);t.length&&t.forEach(e)}))}(),function(){const t=Symbol("handled"),e=e=>{e[t]||(e[t]=!0,e.setAttribute("controls",""),e.setAttribute("controlslist","nodownload"),e.setAttribute("preload","auto"))};T.onDocMutations((()=>{const t=so(lo["post-video"]);t.length&&t.forEach(e)})),T.insertMultistyle`
    <style>
      ${lo["post-video"]} {
        cursor: pointer;
      }

      ${lo["post-video-poster"]},
      ${lo["post-video-overlay"]} {
        display: none;
      }

      /* tricky way to move volume control */
      @media (min-width: 450px) {
        ${lo["post-video"]}::-webkit-media-controls-panel {
          padding-right: 46px;
        }
        ${lo["post-video"]}::-webkit-media-controls-timeline {
          margin-right: -46px;
        }
      }
    </style>
  `}(),function(){const t="__syncVolumeAcrossPostVideos";let e,n,o=[];const i=i=>{i[t]||(i[t]=!0,void 0===e?(e=i.volume,n=i.muted):(i.volume=e,i.muted=n),i.addEventListener("volumechange",(()=>{o.forEach((t=>{t.volume=i.volume,t.muted=i.muted})),e=i.volume,n=i.muted})))};T.onDocMutations((()=>{o=so(lo["post-video"]),o.forEach(i)}))}(),T.insertMultistyle`
    <style>
      video::-webkit-media-controls-panel {
        transition: all 0.25s linear;
      }
    </style>
  `,T.insertMultistyle`
    <style>
      /* expand timeline hitbox at top */
      video::-webkit-media-controls-timeline {
        margin-top: -5px;
        padding-top: 5px;
      }
    </style>
  `,function(){const t=Symbol();T.onDocMutations((()=>{const e=ro(lo.postCreation.captionTextarea);if(!e)return;if(e[t])return;e[t]=!0;const n=getComputedStyle(e),o=Number(n.paddingTop.replace("px","")),i=Number(n.paddingBottom.replace("px",""));e.addEventListener("input",(()=>{e.style.height=null;const t=e.scrollHeight-o-i;e.style.height=`${t}px`}))})),T.insertMultistyle`
    <style>
      ${lo.postCreation.mentionsOverlay} {
        top: 225px !important;
      }

      ${lo.postCreation.captionContainer} {
        height: fit-content !important;
      }

      ${lo.postCreation.captionTextarea} {
        min-height: 144px !important;
        max-height: 288px !important;
      }
    </style>
  `}(),T.insertMultistyle`
    <style>
      ${lo["new-post_tag-people-image-container"]} {
        width: 100%;
      }

      ${lo["new-post_tag-people-image-container"]} img {
        width: 100%;
      }
    </style>
  `,function(){const t=["(max-height: 622px)","(min-height: 624px)","(max-width: 313px)","(min-width: 315px)"].join(",");T.insertMultistyle`
    <style>
      @media ${t} {
        ${lo.general.tabBarWrap} {
          height: 58px;
        }

        ${lo.general.tabBar} {
          height: 58px;
        }
      }
    </style>
  `}(),T.insertMultistyle`
    <style>
      ${lo.general.modal} {
        background: rgba(255, 255, 255, 0.96) !important;
      }

      ${lo.general.modalWindow} {
        justify-content: flex-start;
        box-shadow: 0 5px 27px rgba(0, 0, 0, 0.13);
        background: #FFF;
      }

      ${lo.general.modalWindowHashtagContent} {
        margin-top: 6px;
      }
    </style>
  `,function(){let t;T.onDocMutations((()=>{const e=location.pathname+location.search;e!==t&&(Pt.send("ig.url-change",e),t=e)}))}(),function(){const t=Symbol("handled");T.onDocMutations((()=>{const e=ro(lo.general.storiesBar);e&&(e[t]||(e[t]=!0,T.smartHorizontalScroll.init(e)))}))}(),T.insertMultistyle`
    <style>
      ${lo.profilePage.tab}:empty {
        display: none;
      }
    </style>
  `,T.insertMultistyle`
    <style>
      ${lo.general.modalWindow} {
        overflow: scroll;
        border-radius: 8px;
      }
    </style>
  `,function(){const t=Symbol("handled");T.onDocMutations((()=>{const e=ro(lo.postCreation.nextButton);e&&(e[t]||(e[t]=!0,e.addEventListener("click",(()=>{const t=Un.create({show:!0});Vn.onPathChange((function e(){Vn.onPathChange.off(e),t.remove()}))}),{once:!0})))}))}(),T.insertMultistyle`
    <style>
      ${lo.general.blueLinkButton} {
        cursor: pointer;
        position: relative;
      }

      ${lo.general.blueLinkButton}::before {
        content: '';
        position: absolute;
        top: -7px;
        left: -7px;
        right: -7px;
        bottom: -7px;
      }
    </style>
  `,T.insertMultistyle`
    <style>
      ${lo.profilePage.postRow} {
        margin-bottom: 2px;
      }

      ${lo.profilePage.postContainer} {
        margin-right: 2px;
      }

      ${lo.profilePage.reelRow} {
        margin-bottom: 2px;
      }

      ${lo.profilePage.reelContainer} {
        margin-right: 2px;
      }
    </style>
  `,T.insertMultistyle`
    <style>
      ${lo.general.actionSheet} {
        width: 96% !important;
      }
    </style>
  `,function(){const t=Symbol("handled");T.onDocMutations((()=>{const e=ro(lo.postCreation.filtersReel);e&&(e[t]||(e[t]=!0,T.smartHorizontalScroll.init(e)))}))}(),T.insertMultistyle`
    <style>
      ${lo.authScreen.username} {
        margin-right: 24px;
      }

      /* hide alt text of missing avatar */
      ${lo.authScreen.avatar} {
        color: transparent;
        overflow: hidden;
      }

      ${lo.authScreen.footer} {
        display: none;
      }

      ${lo.authScreen.fromFacebookBar} {
        display: none;
      }

      @media (max-width: 400px) {
        ${lo.authScreen.loginContainer} {
          padding-left: 20px;
          padding-right: 20px;
        }

        ${lo.authScreen.loginContainerParagraph} {
          text-align: center;
        }

        ${lo.authScreen.loginFormParagraph} {
          text-align: center;
          padding-left: 20px;
          padding-right: 20px;
        }
      }
    </style>
  `,T.insertMultistyle`
    <style>
      ${lo.loginBar.root} {
        top: 6px !important;
        padding: 8px;
        border-radius: 5px;
        max-width: 400px;
        box-shadow: 0 2px 7px rgba(0, 0, 0, 0.18);
      }

      ${lo.loginBar.content} {
        height: 100%;
        align-items: center;
      }

      ${lo.loginBar.openAppButton} {
        display: none !important;
      }

      @media (max-width: 500px) {
        ${lo.loginBar.root} {
          top: 0 !important;
          padding: 8px;
          border-radius: 0;
          max-width: 100%;
          box-shadow: none;
        }
      }
    </style>
  `,function(){const t=Symbol("handled");T.onDocMutations((()=>{if(!!ro('[data-page="StoriesPage"]'))return;so("img[srcset]").forEach((e=>{if(e[t])return;e[t]=!0;e.getAttribute("srcset").endsWith("w")&&e.removeAttribute("srcset")}))}))}(),function(){let t=null;T.onDocMutations((()=>{t=ro(lo.commentsPage.scrollContainer)})),Pt.on("ig.broadcast-scroll",(e=>{t&&(t.scrollTop+=e)}))}(),function(){const t=window.IntersectionObserver;if(!t)return;const e=Symbol("handled");T.onDocMutations((()=>{const n=ro(lo.commentsPage.showMoreButton);if(!n)return;if(n[e])return;n[e]=!0;const o=ro(lo.commentsPage.scrollContainer);if(!o)return;const i=new t((t=>{t[0].isIntersecting&&(document.body.contains(n)&&n.click(),setTimeout((()=>i.disconnect())))}),{root:o,rootMargin:"200px",threshold:0});i.observe(n)}))}(),async function(){const t=await Ct("store");if(!t)return;const e='\n    <svg width="24" height="24" viewBox="0 0 48 48">\n      <path fill="currentColor" d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"/>\n    </svg>\n  ',n='\n    <svg width="24" height="24" viewBox="0 0 24 24">\n      <path fill="currentColor" stroke="currentColor" d="M20.656 17.008a9.993 9.993 0 10-3.59 3.615L22 22z" stroke-linejoin="round" stroke-width="2"/>\n    </svg>\n  ',o=Symbol("handled");T.onDocMutations((()=>{let i;if(i=so(lo.profilePage.post),i=i.filter((t=>!t[o])),0===i.length)return;const r=t.getState(),s=Object.values(r.posts.byId.toJS());i.forEach((t=>{t[o]=!0;const i=t.getAttribute("href").split("/")[2];if(!i)return;const r=s.find((t=>t.code===i));if(!r)return;const a=-1===r.numPreviewLikes?null:jn(r.numPreviewLikes||0),l=jn(r.numComments||0);t.insertAdjacentHTML("beforeend",`\n        <div class="post-stats">\n          ${null===a?"":`\n            <div class="post-stats__stat">\n              <div class="post-stats__icon">${e}</div>\n              <div class="post-stats__count">${a}</div>\n            </div>\n          `}\n          <div class="post-stats__stat">\n            <div class="post-stats__icon">${n}</div>\n            <div class="post-stats__count">${l}</div>\n          </div>\n        </div>\n      `)}))})),T.insertMultistyle`
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
      ${lo.profilePage.post}:not(:hover) .post-stats {
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
  `}(),async function(){const t=await Ct("store");if(!t)return;const e=()=>{var e;const n=null===(e=t.getState().navigation)||void 0===e?void 0:e.pageIdentifier;n&&(document.body.setAttribute("data-page",n),document.documentElement.setAttribute("data-page",n))};e(),t.subscribe(e)}(),T.insertMultistyle`
    <style>
      ${lo.postCreation.previewContainer} {
        flex-shrink: 0;
        width: 110px;
        height: 110px;
      }
      html.reels--creating-reels ${lo.postCreation.previewContainer} {
        width: 62px;
      }

      ${lo.postCreation.rowButton} {
        cursor: pointer;
      }

      @media (max-width: 440px) {
        ${lo.postCreation.previewContainer} {
          width: 60px;
          height: 60px;
        }
        html.reels--creating-reels ${lo.postCreation.previewContainer} {
          width: 45px;
          min-width: 45px;
          height: 80px;
        }
      }

      ${lo.postCreation.previewPostImage} {
        border-radius: 4px;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
      }

      /* fix story media being cutted */
      ${lo.storyViewer.mediaContainer} {
        width: 100%;
        height: 100%;
        background-color: #000;
      }

      ${lo.storyViewer.videoPoster} {
        object-fit: contain;
      }
    </style>
  `,async function(){document.addEventListener("click",(async t=>{const e=t.target.closest(lo.general.iconButton);if(!e)return;if(!!!ro(lo.general.planeIcon,e))return;const n=e.closest(lo.general.post);if(!n)return;const o=ro(lo.general.postThreeDotsButton,n);if(!o)return;t.preventDefault(),t.stopPropagation();const i=new Promise((t=>{T.onDocMutations((function e(){ro(lo.general.actionDialog)&&(setTimeout((()=>{T.onDocMutations.off(e)})),t())}))}));o.click(),await i;const r=so(lo.general.actionDialogItem).find((t=>t.innerText.toLowerCase().includes("share")||t.innerText.endsWith("...")||t.innerText.endsWith("…")));r&&r.click()}),!0)}(),async function(){const t=await Ct("store");if(!t)return;let e=null;T.onDocMutations((()=>{const n=ro(lo.postCreation.expandImageButton);if(!n)return;const o=t.getState().creation.sessionId;o!==e&&(e=o,n.click())}))}(),async function(){const t=(t,e)=>window.innerWidth>320?Math.min(125,e/t*100):Math.min(180,e/t*100);Object.defineProperty(Object.prototype,"getHeightPercent",{get:function(){return({width:e,height:n})=>t(e,n)},set:function(){return!0}}),Object.defineProperty(Object.prototype,"getWrapperHeightStyle",{get:function(){return(e,n)=>({paddingBottom:`calc(${t(n,e)}% - 1px)`})},set:function(){return!0}}),T.insertMultistyle`
    <style>
      ${lo.postCreation.video} {
        width: 100%;
        height: 100%;
        background-color: #000;
      }

      ${lo.postCreation.videoPoster} {
        object-fit: contain;
      }
    </style>
  `}(),T.insertMultistyle`
    <style>
      ${lo.postCreation.captionContainer} {
        flex-direction: row-reverse !important;
      }

      ${lo.postCreation.captionTextarea} {
        display: block;
        width: 100%;
        margin: 0;
        padding: 0 12px;
        box-sizing: border-box;
      }

      ${lo.postCreation.userAvatar} {
        display: none;
      }

      ${lo.postCreation.mentionsOverlay} {
        background: transparent !important;
      }

      ${lo.postCreation.tagPeopleButton} {
        padding: 20px;
        cursor: pointer;
        background: transparent;
        border: none;
      }
    </style>
  `,function(){const t=Symbol("handled");T.onDocMutations((async()=>{const e=ro(lo.profilePage.avatarStoryRing);if(!e)return;if(e[t])return;e[t]=!0;const n=e.getContext("2d"),o=await T.waitFor((()=>{if(!document.body.contains(e))return null;const t=n.getImageData(0,0,e.width,e.height).data;for(let e=0;e<t.length;e+=4){const n=[t[e],t[e+1],t[e+2]];if(!(0===n[0]&&0===n[1]&&0===n[2]))return n}return null}),{timeout:5e3});if(!o)return;const i=o[0]===o[1]&&o[0]===o[2];e.insertAdjacentHTML("beforebegin",`<div class="avatar-story-ring ${i?"avatar-story-ring_viewed":""}"></div>`)})),T.insertMultistyle`
    <style>
      ${lo.profilePage.avatarStoryRing} {
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
  `}(),T.onDocMutations((()=>{const t=ro(lo.general.cookieModalContent);if(!t)return;const e=t.closest(lo.general.modal);e&&e.remove()})),function(){const t=Symbol("handled");T.onDocMutations((()=>{const e=ro(lo["highlights-container"]);e&&(e[t]||(e[t]=!0,T.smartHorizontalScroll.init(e)))}))}(),window.addEventListener("click",(t=>{if("v2"!==window.inssist.igBundleVersion)return;if(!t.metaKey&&!t.ctrlKey)return;const e=t.target.closest("a[href]");e&&e.href&&(t.preventDefault(),t.stopPropagation(),window.open(e.href))}),!0),async function(){const t=await Ct("nav");if(!t)return;const e=/\/reel\/[\w-]+\//;window.addEventListener("click",(n=>{if("v2"!==window.inssist.igBundleVersion)return;const o=n.target.closest("a[href]");if(!o)return;const i=o.getAttribute("href")||"";e.test(i)&&(n.preventDefault(),n.stopPropagation(),t.push(i))}),!0)}(),function(){const t=new Map,e=[lo.general.tabBarAvatarContainer,lo.general.storyTrayViewerAvatarContainer];T.onDocMutations((()=>{for(const n of e){const e=ro(n);e&&(e.innerHTML&&!t.has(n)?t.set(n,e.innerHTML):!e.innerHTML&&t.has(n)&&(e.innerHTML=t.get(n)))}}))}(),async function(){const t=await Ct("add-dispatch-listener");if(!t)return;t((async t=>{"DELETE_POST_SUCCEEDED"===t.type&&(await T.sleep(300),document.body.innerText.length>0||(history.back(),await T.sleep(100),location.reload()))}))}(),function(){const t=Symbol(),e="inssist.exceptionDialogClosedAt";T.onDocMutations((()=>{const n=ro(lo.general.exceptionDialogOkButton);if(!n)return;if(n[t])return;n[t]=!0;const o=T.ls.get(e)||0;if(o&&Date.now()-o<1*T.time.MINUTE)return;T.ls.set(e,Date.now());const i=n.closest(lo.general.dialogRoot);i&&(i.style.display="none")}))}(),function(){const t="inssist.errorPageReloadedAt";T.onDocMutations((()=>{if(!ro(lo.general.errorPageContent))return;const e=T.ls.get(t)||0;e&&Date.now()-e<1*T.time.MINUTE||(T.ls.set(t,Date.now()),location.reload())}))}(),async function(){const t=await Ct("store");if(!t)return;let e=!1;t.subscribe((()=>{var n;if(e)return;"httpErrorPage"===(null===(n=t.getState().navigation)||void 0===n?void 0:n.pageIdentifier)&&(Pt.send("ga.send-event","user","ig:page-not-found"),e=!0)}))}(),async function(){const t=await Ct("store");if(!t)return;let e="";t.subscribe((()=>{var n,o;const i=null===(n=t.getState().direct)||void 0===n||null===(o=n.badge)||void 0===o?void 0:o.count;if("number"!=typeof i)return void console.error("failed to extract dm count");let r;r=0===i?"":i<10?String(i):"9+",r!==e&&(e=r,Pt.send("dm.update-badge",r))}))}(),function(){const t=Date.now();T.onDocMutations((()=>{if(!document.body)return;if(Date.now()-t>10*T.time.SECOND)return;document.body.innerText.includes("Sorry! Something went wrong :(")&&(location.href="/")}))}(),function(){const t=Symbol("handled");T.onDocMutations((()=>{const e=T.$(lo.postCreation.submitPostButton);e&&(e[t]||(e[t]=!0,e.style.setProperty("width",`${e.offsetWidth}px`,"important"),e.style.setProperty("display","flex","important"),e.style.setProperty("flex-direction","row","important"),e.style.setProperty("justify-content","flex-end","important")))}))}(),T.insertMultistyle`
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
  `,T.insertMultistyle`
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
  `,T.insertMultistyle`
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
  `,T.insertMultistyle`
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
  `}};let lo,co;var uo={init:function(){document.addEventListener("click",(t=>{Vn.onDocClick(t)}),!0),function(){let t=location.pathname;Vn.onPathChange(t),T.onDocMutations((()=>{const e=location.pathname;t!==e&&(Vn.onPathChange(e),t=e)}))}()}};var po={init:function(){Pt.on("ig.publish-story",ho)}};async function ho({imageUrl:t,mentions:e=[]}){const n=await Ct("http"),o=await async function(t){const e=await fetch(t),n=await e.blob();return await async function(t){return new Promise(((e,n)=>{const o=new FileReader;o.onerror=()=>{n()},o.onload=()=>{e(o.result)},o.readAsDataURL(t)}))}(n)}(t),i=document.createElement("img");i.src=o,document.body.appendChild(i),await new Promise((t=>{i.onload=t}));const r=i.clientWidth,s=i.clientHeight,a=document.createElement("canvas");a.width=r,a.height=s;a.getContext("2d").drawImage(i,0,0),i.remove();const l=await new Promise((t=>{a.toBlob(t,"image/jpeg")})),c=Date.now().toString(),d=`fb_uploader_${c}`;let u=null;try{await n.post(`/rupload_igphoto/${d}`,l,{headers:{"X-Instagram-Rupload-Params":JSON.stringify({media_type:1,upload_id:c,upload_media_width:r,upload_media_height:s}),"X-Entity-Name":d,"X-Entity-Length":String(l.size),Offset:"0"},timeout:Number.POSITIVE_INFINITY})}catch(t){u=t}if(!u)try{await n.post("/create/configure_to_story/",{upload_id:c,caption:"",reel_mentions:JSON.stringify(e.map((t=>({user_id:t.userId,x:t.cx,y:t.cy,width:t.width,height:t.height,rotation:0}))))})}catch(t){u=t}return{error:u}}var go={init:function(){fo=St.controller.getConfig().igSelectors,async function(){const t=await Ct("store");T.onDocMutations((()=>{const e=T.$$(fo["post-item"]),n=T.$$(fo["story-container"]);[...e,...n].forEach((e=>{if(e.withActions)return;const o=n.includes(e),i=!!e.querySelector("video");let r=!1,s=!1;const a=e.closest("[data-post-id]");if(a){const e=a.dataset.postId,n=t.getState().posts.byId.get(e);s="clips"===(null==n?void 0:n.productType),r="igtv"===(null==n?void 0:n.productType),r&&a.setAttribute("data-media-actions-post-type","igtv"),s&&a.setAttribute("data-media-actions-post-type","reels")}const l=function({isIgtv:t=!1,isStory:e=!1,isVideo:n=!1,isReels:o=!1}={}){return`\n    <div class="\n      mediaActions\n      ${t?"mediaActions_igtv":""}\n      ${o?"mediaActions_reels":""}\n      ${e?"mediaActions_story":"mediaActions_post"}\n      ${n?"mediaActions_video":"mediaActions_photo"}">\n      <button class="mediaActions__button" data-action="open" title="open in new tab">\n        <svg xmlns="http://www.w3.org/2000/svg" width="12.507" height="12.501" viewBox="0 0 12.507 12.501">\n          <path d="M179.372-.5V1h3.3l-5.148,5.148,1.7,1.7L184.371,2.7V5.948h1.51V-.5Z" transform="translate(-173.374 0.504)" fill="currentColor"/>\n          <path d="M8,93.55H2v-6H4l2-2H0v10H10v-6l-2,2Z" transform="translate(0 -83.049)" fill="currentColor"/>\n        </svg>\n      </button>\n    </div>\n  `}({isStory:o,isVideo:i,isIgtv:r,isReels:s});e.insertAdjacentHTML("afterbegin",l),e.withActions=!0}))}))}(),Vn.onDocClick((async t=>{const e=t.target.closest(".mediaActions__button");if(!e)return;t.preventDefault(),t.stopPropagation();const n=e.closest("li")||e.closest(fo["post-item"])||e.closest(fo["story-container"]),o=n.querySelector("img"),i=n.querySelector("video");if(!o&&!i)return void Pt.send("ig.error","unable to find media for button");const r=(await Ct("store")).getState();let s;const a=t.target.closest("[data-post-id]");s=a?a.dataset.postId:r.stories.reels.get(r.stories.currentReelId).itemIds[r.stories.currentReelItemIndex];const l=r.posts.byId.get(s),c=e.getAttribute("data-action");let d;if(i)d=i.getAttribute("src")||i.querySelector("source").getAttribute("src");else if(o){var u,p;!l.isSidecar&&(null===(u=l.displayResources)||void 0===u?void 0:u.length)>0&&(d=l.displayResources.slice().sort(((t,e)=>e.configWidth-t.configWidth))[0].src),d||(d=null===(p=o.getAttribute("srcset"))||void 0===p?void 0:p.split(",").map((t=>({src:t.split(" ")[0],configWidth:t.split(" ")[1]}))).sort(((t,e)=>e.configWidth-t.configWidth))[0].src),d||(d=o.getAttribute("src"))}if("open"===c){const t=i&&i.outerHTML||o&&o.outerHTML;Pt.send("ig.media-open",{url:d,html:t})}})),T.insertMultistyle`
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
      ${fo["post-item"]}:hover .mediaActions,
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

      ${fo["post-item"]} video::-webkit-media-controls-panel {
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
      ${fo["post-item"]}:not(:hover) video::-webkit-media-controls-panel {
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
        margin-right: 14px;
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
  `}};let fo;var mo={init:function(){yo=St.controller.getConfig().igSelectors,Vn.onPathChange((t=>{Pt.send("ig.path-change",t)})),async function(){const t=await Ct("http");if(!t)return;const e=t.post.bind(t);t.post=async(...t)=>{const n=t[0];let o=n.includes("/create/configure_to_story")?"story":n.includes("/media/configure_to_clips")?"reel":n.includes("/igtv/configure_to_igtv")||n.includes("/create/configure")?"video":n.includes("/media/configure")?"photo":null;if(o){const n=await e(...t);if("ok"===n.status){if("story"===o){var i;o=!!(null===(i=n.media)||void 0===i?void 0:i.video_duration)?"story-video":"story-photo"}Pt.send("ig.published",o)}return n}return e(...t)}}(),Vn.onDocClick((t=>{t.target.closest(".xWeGp")&&Pt.send("ig.open-dm")})),Pt.on("ig.back",(async()=>{await qe()?location.href="/":history.state&&history.state.key&&history.back()})),Pt.on("ig.refresh",(()=>{location.reload()})),Pt.on("ig.broadcast-scroll",(t=>{Vn.docElem.scrollTop+=t})),function(){let t;(async()=>{t=await Ct("nav")})(),Pt.on("ig.ajax-go",(e=>{t?t.push(e):location.href=e}))}(),async function(t){Pt.on("ig.hard-go",(t=>{location.href=t}))}(),Pt.on("ig.get-url",(()=>location.pathname+location.search)),Pt.on("ig.clear-and-show-spinner",(()=>{const t=T.$(yo.general.reactRoot);t&&(t.innerHTML="")}))}};let yo;var vo={init:async function(){if(wo=St.controller.getConfig().igSelectors,xo=await Ct("store"),!xo)return;(function(){let t;Object.defineProperty(Object.prototype,"getVideoCoverPhoto",{get:function(){return(...e)=>{const n=e[0];if(ko.onCall(n),!ko.prevented){if(ko.result){const t=ko.result;return ko.result=null,t}return t(...e)}ko.prevented=!1}},set:function(e){return t=e,!0}})})(),async function(){await T.waitForDocumentReady(),Po=Un.create({onClick:To})}(),Vn.onBeforeStoryCreation((()=>{_o="story",Co()})),Vn.onBeforePostCreation((()=>{window.require("PolarisCreationActionCreationSelectImage"),window.require("PolarisCreationActionCreationSelectMedia"),_o=It.controller.isCreatingReels()?"reels":"post",Co()})),Vn.onMediaProcessingError((()=>{Mo()})),T.onDocMutations((()=>{const t=!!T.$(wo.postCreationPage),e=!!T.$(wo.storyCreationPage);(t||e)&&Mo()})),function(){const t=Symbol();T.onDocMutations((()=>{T.$$('input[accept*="image/jpeg"').forEach((e=>{e[t]||(e[t]=!0,e.setAttribute("accept","image/jpeg, image/png, video/quicktime, video/mp4, video/webm"))}))}))}(),ko.onCall((t=>{const{error:e,...n}=function(t){const e=t.videoWidth,n=t.videoHeight;if(!e||!n)return{error:"wrong-format"};if(It.controller.isCreatingReels()&&e===n)return{error:"square-reel-video"};const o=e/n,i=bo[_o].minRatio,r=bo[_o].maxRatio;return o<i||o>r?{error:"wrong-ratio",ratio:o}:t.duration<bo[_o].minVideoDuration?{error:"video-too-short"}:t.duration>bo[_o].maxVideoDuration?{error:"video-too-long"}:{error:null}}(t);e&&(async()=>{ko.prevented=!0,xo.dispatch({type:"inssist.ig.stop-creation-session"});const o=await fetch(t.src),i=await o.blob();await Eo(i.type,e,n),Vn.onMediaProcessingError()})()})),ko.onCall((t=>{"story"===_o&&(ko.result=new Promise((e=>{const n=document.createElement("canvas");t.currentTime=0,t.addEventListener("timeupdate",(()=>{n.width=t.videoWidth,n.height=t.videoHeight,n.getContext("2d").drawImage(t,0,0),n.toBlob((n=>{e({file:n,dataURL:URL.createObjectURL(n),uploadMediaWidth:t.videoWidth,uploadMediaHeight:t.videoHeight,videoTransform:null})}),"image/jpeg")}))})))})),T.insertMultistyle`
    <style>
      ${wo.general.uploadPanel} {
        z-index: 1;
      }
    </style>
  `,async function(){const t=await Ct("http");if(!t)return;const e=t.post.bind(t);t.post=(...t)=>{var n,o,i;if((null===(n=t[0])||void 0===n?void 0:n.includes("/rupload_igvideo"))&&!(null===(o=t[0])||void 0===o?void 0:o.includes("story"))){const e=t[2].headers,n=JSON.parse(e["X-Instagram-Rupload-Params"]);n.is_clips_video||(n.is_igtv_video=!0,n.is_unified_video=1,e["X-Instagram-Rupload-Params"]=JSON.stringify(n))}else(null===(i=t[0])||void 0===i?void 0:i.includes("/create/configure/"))&&(t[0]="/igtv/configure_to_igtv/",t[1]={source_type:"library",caption:t[1].caption,upcoming_event:"",upload_id:t[1].upload_id,usertags:t[1].usertags,custom_accessibility_caption:t[1].custom_accessibility_caption,disable_comments:0,like_and_view_counts_disabled:0,igtv_ads_toggled_on:"",igtv_share_preview_to_feed:1,is_unified_video:1,video_subtitles_enabled:0});return e(...t)}}()}};const bo={clickShowErrorTimeout:10*T.time.SECOND,forceShowErrorTimeout:30*T.time.SECOND,story:{minRatio:.12,maxRatio:1.91,minRatioPrettyStr:"0.12",maxRatioPrettyStr:"1.91:1",minRatioValueStr:"0.12",maxRatioValueStr:"1.91",minVideoDuration:1,maxVideoDuration:300.9,minVideoDurationStr:"1 second",maxVideoDurationStr:"5 minutes",alertErrorMessage:"Uploading video cancelled. Please ensure that the video is 1 to 5 minutes long and the size ratio is less than 1.91:1."},post:{minRatio:.12,maxRatio:1.91,minRatioPrettyStr:"0.12",maxRatioPrettyStr:"1.91:1",minRatioValueStr:"0.12",maxRatioValueStr:"1.91",minVideoDuration:1,maxVideoDuration:900.9,minVideoDurationStr:"1 second",maxVideoDurationStr:"15 minutes",alertErrorMessage:"Uploading video cancelled. Please ensure that the video is 1 second to 15 minutes long and the size ratio is less than 1.91:1."},reels:{minRatio:.12,maxRatio:1.91,minRatioPrettyStr:"0.12",maxRatioPrettyStr:"1.91:1",minRatioValueStr:"0.12",maxRatioValueStr:"1.91",minVideoDuration:1,maxVideoDuration:900.9,minVideoDurationStr:"1 second",maxVideoDurationStr:"15 minutes",alertErrorMessage:"Uploading video cancelled. Please ensure that the video is 1 second to 15 minutes long and the size ratio is less than 1.91:1."}};let wo,xo,_o,Po,So,$o;const ko={onCall:T.createEmitter(),result:null,prevented:!1};function Co(){Po&&(So=Date.now(),Un.toggle(Po,!0),$o=setTimeout((()=>{alert(bo[_o].alertErrorMessage),Mo()}),bo.forceShowErrorTimeout))}function Mo(){Po&&(Un.toggle(Po,!1),clearTimeout($o))}function To(){Date.now()-So>bo.clickShowErrorTimeout&&alert(bo[_o].alertErrorMessage),Mo()}async function Eo(t,e,n={}){const o=Eo;if(o.shown)return;o.shown=!0;const i=bo[_o];if("wrong-ratio"===e){const t=n.ratio.toFixed(3);document.body.insertAdjacentHTML("beforeend",`\n      <div class="video-error modal">\n        <div class="modal__window">\n          <div class="video-error__title modal__title">\n            <span class="emoji">😱</span> UNSUPPORTED ASPECT RATIO\n          </div>\n          <div class="modal__content">\n            ${n.ratio<i.minRatio?`\n              Uploaded Video Aspect Ratio is <b>${t}</b>\n              which is <b>below ${i.minRatioPrettyStr} (${i.minRatioValueStr})</b>.\n            `:`\n              Uploaded Video Aspect Ratio is <b>${t}</b>\n              which is <b>above ${i.maxRatioPrettyStr} (${i.maxRatioValueStr})</b>.\n            `}\n            <div class="video-error__convert-section">\n              You can resize the video with one of these free tools:\n              <ul>\n                <li><a href="https://ezgif.com/resize-video" target="_blank">ezgif.com</a></li>\n                <li><a href="https://clideo.com/resize-video" target="_blank">clideo.com</a></li>\n                <li><a href="https://cloudconvert.com/mp4-converter" target="_blank">cloudconvert.com</a></li>\n              </ul>\n            </div>\n            <button class="video-error__got-it-button">\n              OK, GOT IT\n            </button>\n          </div>\n        </div>\n      </div>\n    `)}else if("wrong-format"===e){let e;e="video/quicktime"===t?"https://www.zamzar.com/convert/mov-to-webm":"video/mp4"===t?"https://www.zamzar.com/convert/mp4-to-webm":"https://www.zamzar.com",document.body.insertAdjacentHTML("beforeend",`\n      <div class="video-error modal">\n        <div class="modal__window">\n          <div class="video-error__title modal__title">\n            <span class="emoji">😱</span> UNABLE TO UPLOAD VIDEO\n          </div>\n          <div class="modal__content">\n            Instagram server rejected this video for upload.\n            Please ensure uploaded video uses supported format and codec (e.g. MP4/h264 or WEBM).\n            <div class="video-error__convert-section">\n              You can convert video format with one of these tools:\n              <ul>\n                <li><a href="https://video.online-convert.com/convert-to-mp4" target="_blank">video.online-convert.com</a></li>\n                <li><a href="https://cloudconvert.com/mp4-converter" target="_blank">cloudconvert.com</a></li>\n                <li><a href="https://ezgif.com/resize-video" target="_blank">ezgif.com</a></li>\n                <li><a href="${e}" target="_blank">zamzar.com</a></li>\n              </ul>\n            </div>\n            <button class="video-error__got-it-button">\n              OK, GOT IT\n            </button>\n          </div>\n        </div>\n      </div>\n    `)}else"video-too-short"===e?document.body.insertAdjacentHTML("beforeend",`\n      <div class="video-error modal">\n        <div class="modal__window">\n          <div class="video-error__title modal__title">\n            <span class="emoji">😱</span> VIDEO IS TOO SHORT\n          </div>\n          <div class="modal__content">\n            <div style="display: block">\n              Instagram server did not accept this video,\n              because it is less than <b>${i.minVideoDurationStr}</b> long.\n            </div>\n            <button class="video-error__got-it-button">\n              OK, GOT IT\n            </button>\n          </div>\n        </div>\n      </div>\n    `):"video-too-long"===e?document.body.insertAdjacentHTML("beforeend",`\n      <div class="video-error modal">\n        <div class="modal__window">\n          <div class="video-error__title modal__title">\n            <span class="emoji">😱</span> VIDEO IS TOO LONG\n          </div>\n          <div class="modal__content">\n            Instagram server did not accept this video,\n            because it is over <b>${i.maxVideoDurationStr}</b>\n            long.\n            <div class="video-error__convert-section">\n              You can cut video short with this free\n              <a href="https://online-video-cutter.com/" target="_blank">online video cutter tool</a>.\n            </div>\n            <button class="video-error__got-it-button">\n              OK, GOT IT\n            </button>\n          </div>\n        </div>\n      </div>\n    `):"square-reel-video"===e&&document.body.insertAdjacentHTML("beforeend",'\n      <div class="video-error modal">\n        <div class="modal__window">\n          <div class="video-error__title modal__title">\n            <span class="emoji">😱</span> UNSUPPORTED ASPECT RATIO\n          </div>\n          <div class="modal__content">\n            <div style="display: block">\n              Instagram API does not support posting square 1:1 videos to Reels.\n            </div>\n            <div style="height: 8px"></div>\n            <div style="display: block">\n              • Supported ratios are 4:5 to 1.91:1.<br>\n              • Optimal is 9:16 or 1080x1920px <span class="emoji">🚀</span>\n            </div>\n            <div style="height: 8px"></div>\n            <div style="display: block">\n              You can crop your video online with a&nbsp;free\n              <a href="https://ezgif.com/crop-video" target="_blank">ezgif video cropper tool</a>.\n            </div>\n            <button class="video-error__got-it-button">\n              OK, GOT IT\n            </button>\n          </div>\n        </div>\n      </div>\n    ');o.init||(o.init=!0,Vn.onDocClick((t=>{if(!t.target.closest(".video-error__got-it-button"))return;T.$(".video-error").remove(),o.shown=!1})),T.insertMultistyle`
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
  `)}var Ao={init:function(){Do=St.controller.getConfig().igSelectors,function({minWidth:t}){T.insertMultistyle`
    <style>
      @media (min-width: ${t}px) {
        ${Do.general.tabBarWrap} {
          height: 0;
          margin-top: 12px;
        }

        ${Do.general.tabBar} {
          width: 490px;
          height: 58px;
          margin: 0 auto;
          box-shadow: 0 0px 12px rgba(0, 0, 0, 0.14);
          border-radius: 15px 15px 0 0;
          border: none;
        }
        .theme-night ${Do.general.tabBar} {
          background: #E7E8EA;
          border: 1px solid #FFF;
          border-bottom: none;
          box-shadow: none;
          box-sizing: content-box;
        }

        ${Do.general.tabBar}::before {
          display: none;
        }
      }
    </style>
  `}({minWidth:500}),function({minWidth:t}){T.insertMultistyle`
    <style>
      @media (min-width: ${t}px) {
        ${Do.general.header}::before {
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

        ${Do.general.headerContent} {
          width: 490px !important;
          margin-left: auto;
          margin-right: auto;
        }
      }
    </style>
  `}({minWidth:500}),function({minWidth:t}){let e=Ro().scrollTop;const n=()=>{const n=T.$(Do.general.header);if(!n)return;if(window.innerWidth<t)return void(n.style.transform=null);const o=Ro().scrollTop,i=o-e,r=i>6;e=o,i<-6||o<=45?n.style.transform=null:r&&(n.style.transform="translateY(-45px)")};if(window.addEventListener("resize",n),document.addEventListener("scroll",n),Xe()){const t=Symbol("handled");T.onDocMutations((()=>{const e=Ro();e&&(e[t]||(e[t]=!0,e.addEventListener("scroll",n)))}))}T.insertMultistyle`
    <style>
      @media (min-width: ${t}px) {
        ${Do.general.header} {
          transition: transform 0.3s;
        }
      }
    </style>
  `}({minWidth:460}),function({minWidth:t}){T.insertMultistyle`
    <style>
      @media (min-width: ${t}px) {
        ${Do.general.storyPreviewContainer} {
          border: 1px solid #EDEDED !important;
          border-radius: 3px;
          margin-top: 18px;
          margin-bottom: 14px;
        }

        html[data-page="feedPage"] ${Do.general.recommendationsContainer} {
          border: 1px solid #EDEDED !important;
          border-radius: 3px;
        }
      }
    </style>
  `}({minWidth:500}),function({minWidth:t}){T.insertMultistyle`
    <style>
      @media (min-width: ${t}px) {
        ${Do.explorePage.searchResults} {
          width: 100%;
          max-width: 460px;
          margin: -16px auto 0;
        }

        /* thin border for posts */
        ${Do.explorePage.post} {
          position: relative;
        }
        ${Do.explorePage.post}::before {
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
  `}({minWidth:736}),function({minWidth:t}){T.onDocClick((async e=>{if(window.innerWidth<t)return;const n=e.target.closest(Do.profilePage.post);if(!n)return;e.preventDefault(),e.stopPropagation();const o=n.getAttribute("href");(await Ct("nav")).push(o)}),{capture:!0}),T.insertMultistyle`
    <style>
      @media (max-width: ${t-1}px) {
        ${Do.profilePage.header} {
          margin-top: 20px !important;
        }
      }

      @media (min-width: ${t}px) {
        ${Do.profilePage.content} {
          padding-top: 0 !important;
        }

        ${Do.profilePage.header} {
          padding-top: 26px;
        }

        ${Do.profilePage.avatarWithStoryWrap} {
          margin-top: 6px;
        }

        ${Do.profilePage.username} {
          position: relative;
          top: -3px;
        }

        ${Do.profilePage.settingsMenuWrap} {
          background: #FFF !important;
        }

        ${Do.profilePage.settingsMenu} {
          background: #FAFAFA;
          width: 100%;
          max-width: 490px;
          margin: 0 auto;
          border-left: 1px solid #EDEDED;
          border-right: 1px solid #EDEDED;
        }
      }
    </style>
  `}({minWidth:736}),async function({minWidth:t}){if(await qe())return void await Pt.send("ig.update-ig-view",{fullscreenWidth:550,withBorder:!0});const e=await Ct("store");let n;async function o(){var t;const o=T.$(Do.general.root);if(!o)return;if(n===o)return;let i;n=o;const r=location.pathname,s=null===(t=e.getState().navigation)||void 0===t?void 0:t.pageIdentifier;if(!s)return;const a="/create/story/"!==r&&r.startsWith("/create/");i=r.startsWith("/accounts/signup/")||"loginPage"===s||"unifiedHome"===s?{width:460,borders:!0}:a?{width:490,borders:!0}:"StoriesPage"===s?{width:460,borders:!1}:"exploreLandingPage"===s||"profilePage"===s?{width:760,borders:!1}:{width:550,borders:!1};const l=T.$(Do.general.tabBar),c=T.$(Do.general.header),d=T.$(Do.general.content);l&&(l.style.opacity=0),c&&(c.style.opacity=0),d&&(d.style.transition=null,d.style.transform="translateY(3px)",d.style.opacity=0),await Pt.send("ig.update-ig-view",{fullscreenWidth:i.width,withBorder:i.borders}),l&&(l.style.opacity=null),c&&(c.style.opacity=null),d&&(d.style.transition="transform 0.2s, opacity 0.2s",d.style.transform=null,d.style.opacity=null)}Pt.on("ig.widescreen-toggled",o),T.onDocMutations((()=>{window.innerWidth<t||o()}),!0)}({minWidth:460}),async function(){const t=await Ct("nav");if(!t)return;const e=Symbol("handled");T.onDocMutations((()=>{T.$$(Do.profilePage.followersFollowingsLink).forEach((n=>{n[e]||(n[e]=!0,n.addEventListener("click",(async e=>{if(!(window.innerWidth>=725))return;e.preventDefault(),e.stopPropagation(),await Pt.send("ig.force-small-iframe-width",!0);const o=document.body;o.style.opacity=0,o.style.transform="translateY(3px)",await T.waitFor((()=>window.innerWidth<700)),await T.sleep(100),t.push(n.getAttribute("href")),await T.waitFor((()=>T.$('html[data-page="followList"]'))),o.style.transition="all 0.3s ease",o.style.opacity=null,o.style.transform=null,await T.sleep(300),o.style.transition=null,Pt.send("ig.force-small-iframe-width",!1)}),{capture:!0}))}))}))}()}};let Do;function Ro(){return T.docElem}var Lo={init:function(){Bo=St.controller.getConfig().igSelectors,Vn.onDocClick((t=>{const e=t.target.closest(".-wt5I");e&&setTimeout((()=>{document.body.contains(e)&&e.click()}),300)})),function(){const t=HTMLElement.prototype.getBoundingClientRect;HTMLElement.prototype.getBoundingClientRect=function(...e){const n=t.call(this,...e);return 0===n.height&&(n.height=1),n}}(),T.insertMultistyle`
    <style>
      /* story spinner */
      .u6s6p {
        display: none !important;
      }
    </style>
  `,T.insertMultistyle`
    <style>
      ${Bo["story-container"]} {
        width: 100% !important;
        height: 100% !important;
      }

      ${Bo["story-image"]},
      ${Bo["story-video"]},
      ${Bo["story-loading-preview"]} {
        object-fit: contain;
      }
    </style>
  `,T.insertMultistyle`
    <style>
      .theme-night ${Bo.storyViewer.pollContainer} {
        filter: url(#theme-reverse-filter);
        color: transparent;
      }

      ${Bo.storyViewer.pollButtons} {
        font-family: inherit !important;
      }

      ${Bo.storyViewer.pollAnswerDigitOrEmoji} {
        -webkit-text-fill-color: inherit !important;
      }

      ${Bo.storyViewer.pollAnswerDigitOrEmoji} .emoji {
        filter: none !important;
        color: initial !important;
        -webkit-text-fill-color: initial !important;
      }
    </style>
  `,document.addEventListener("keyup",(t=>{if("Escape"===t.key){const t=T.$(Bo.storyViewer.closeButton);if(!t)return;t.click()}else if("ArrowLeft"===t.key){const t=T.$(Bo.storyViewer.prevButton);if(!t)return;t.click()}else if("ArrowRight"===t.key){const t=T.$(Bo.storyViewer.nextButton);if(!t)return;t.click()}})),function(){const t="__manageStoriesAutoplay";let e=null,n=!1;T.onDocMutations((()=>{const o=T.$(Bo["stories-viewer"]);e&&!o&&(n=!1,Vn.docElem.classList.remove("enable-stories-autoplay")),e=o;const i=T.$(Bo["story-video-play-button"]);n&&i&&!i[t]&&setTimeout((()=>{i[t]=!0,i.click()}),200)})),Vn.onDocClick((e=>{const o=e.target.closest(Bo["story-video-play-button"]);o&&!n&&(o[t]=!0,n=!0,Vn.docElem.classList.add("enable-stories-autoplay"))})),T.insertMultistyle`
    <style>
      .enable-stories-autoplay ${Bo["story-video-play-button"]} {
        opacity: 0;
      }
    </style>
  `}(),function(){const t=window.addEventListener;window.addEventListener=(...e)=>{if("blur"!==e[0])return t.call(window,...e)}}()}};let Bo;var Io={storySharingPost:!1},Fo={init:function(){Oo=St.controller.getConfig().igSelectors,T.insertMultistyle`
    <style>
      ${Oo.storyCreation.topRightButton} {
        cursor: pointer;
      }
    </style>
  `,async function(){const t=await Ct("store");if(!t)return;const e=CanvasRenderingContext2D.prototype.drawImage;CanvasRenderingContext2D.prototype.drawImage=function(...n){if(!(9===n.length&&n[0]instanceof HTMLImageElement&&"/create/story/"===location.pathname))return e.call(this,...n);const o=T.$(Oo.storyCreation.root);if(!o)return e.call(this,...n);const i=JSON.parse(JSON.stringify(t.getState())).displayProperties.pixelRatio;let r,s;o.offsetWidth/o.offsetHeight>9/16?(r=o.offsetHeight*(9/16),s=o.offsetHeight):(r=o.offsetWidth,s=o.offsetWidth/(9/16)),o.style.width=`${r}px`,o.style.height=`${s}px`,T.$$("canvas").forEach((t=>{t.style.width=`${r}px`,t.style.height=`${s}px`,t.setAttribute("width",r*i),t.setAttribute("height",s*i)}));const a=n[0],l=.04,c=a.width/a.height,d=c>9/16*(1-l)&&c<(1+l)*(9/16)?"cover":"contain";this.restore();const u=r*i,p=s*i;"contain"===d&&(this.filter="blur(170px)",e.call(this,a,-300,-300,u+600,p+600),this.filter="none");const h=function({type:t,width:e,height:n,containerWidth:o,containerHeight:i,offset:r=0}){const s=e/n,a=o/i;return s>a&&"contain"===t||s<a&&"cover"===t?{dx:0+r,dy:(i-o/s)/2+r,width:o-2*r,height:o/s-2*r}:{dx:(o-i*s)/2+r,dy:0+r,width:i*s-2*r,height:i-2*r}}({type:d,width:a.width,height:a.height,containerWidth:u,containerHeight:p,offset:Io.storySharingPost?60:0});if(e.call(this,a,h.dx,h.dy,h.width,h.height),Io.storySharingPost){const e=T.$("canvas").getContext("2d"),n=t.getState().displayProperties.pixelRatio,o=Io.storySharingPost.owner.username,i=60/n,r=(h.dy+h.height+40)/n;e.save(),e.scale(n,n),e.fillStyle="white",e.shadowColor="rgba(150, 150, 150, 0.3)",e.shadowOffsetX=0,e.shadowOffsetY=1,e.shadowBlur=2,e.font="600 22px sans-serif",e.textAlign="left",e.textBaseline="top",e.fillText(`@${o}`,i,r),e.restore()}}}(),function(){const t=Symbol("handled");T.onDocMutations((async()=>{const e=T.$(Oo.storyCreation.root);if(!e)return;if(e[t])return;e[t]=!0;if(await Pt.send("ig.is-fullscreen"))return;const n=document.documentElement;n.classList.add("story-creation-dark-background"),T.onDocMutations((function t(){T.$(Oo.storyCreation.root)||(T.onDocMutations.off(t),n.classList.remove("story-creation-dark-background"))}))})),T.insertMultistyle`
    <style>
      .story-creation-dark-background body {
        background: #0d0d0d;
      }
      .theme-night.story-creation-dark-background body {
        background: #fdfdfd;
      }
    </style>
  `}(),async function(){const t=await Ct("http:retry-story-post");if(!t)return;Ct.unlockOnNextTick("http:story-assist");const e=t.post.bind(t),n=async(t,o=1)=>{let i;console.log(`trying to post a story, attempt no.${o}`);try{i=await e(...t)}catch{i={status:"fail"}}return"fail"===i.status&&o<5?(await T.sleep(3e3),n(t,o+1)):i};t.post=(...t)=>t[0].includes("/create/configure_to_story/")?n(t):e(...t)}(),function(){const t=Symbol("handled");T.onDocMutations((()=>{const e=T.$(Oo.storyCreation.downloadButton);e&&(e.parentNode[t]||(e.parentNode[t]=!0,e.remove()))}))}(),T.insertMultistyle`
    <style>
      ${Oo.storyCreation.mentionBarContainer} {
        width: calc(100% - 100px) !important;
        height: 94px !important;
        top: 0 !important;
        margin-left: -100px !important;
      }

      ${Oo.storyCreation.mentionBar} {
        height: 100% !important;
        border-radius: 0 0 8px 0;
        position: static;
      }

      ${Oo.storyCreation.mentionReel} {
        height: 100% !important;
        position: static;
      }

      ${Oo.storyCreation.mentionReelRow} {
        height: 100% !important;
        align-items: center !important;
        position: static;
      }
      ${Oo.storyCreation.mentionReelRow}:not(:empty)::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 0 8px 8px 0 !important;
        background: rgba(0 , 0 , 0 , 0.2) !important;
      }

      ${Oo.storyCreation.mentionReelItem} {
        margin: 0 10px 0 0 !important;
        position: relative;
      }
      ${Oo.storyCreation.mentionReelItem}:last-child {
        margin-right: 0 !important;
      }
    </style>
  `,function(){const t=Symbol("handled");T.onDocMutations((()=>{const e=T.$(Oo.storyCreation.video);e&&(e[t]||(e[t]=!0,e.muted=!1,e.controls=!0,e.controlsList="nodownload noremoteplayback noplaybackrate",e.disablePictureInPicture=!0,setTimeout((()=>e.volume=1),100)))})),T.insertMultistyle`
    <style>
      ${Oo.storyCreation.root} {
        background: #000;
      }

      ${Oo.storyCreation.videoWrap} {
        position: relative;
      }

      ${Oo.storyCreation.video} {
        max-width: 100%;
        max-height: 100%;
      }

      ${Oo.storyCreation.videoPoster} {
        display: none;
      }

      ${Oo.storyCreation.footer} {
        height: 70px;
        background: transparent;
        position: relative;
      }

      ${Oo.storyCreation.videoPlayButton} {
        display: none;
      }

      ${Oo.storyCreation.textColorPicker},
      ${Oo.storyCreation.drawColorPicker} {
        display: flex;
        flex-direction: column;
      }

      ${Oo.storyCreation.colorPickerSelectedCircle} {
        position: relative;
        left: -1px;
        top: -1px;
      }
    </style>
  `}(),function(){const t=Symbol();T.onDocMutations((()=>{const e=T.$(Oo.storyCreation.submitButton);e&&(e[t]||(e[t]=!0,e.addEventListener("click",(()=>{T.$$("video").forEach((t=>t.pause()))}),!0)))}))}(),function(){const t=Event.prototype.preventDefault;Event.prototype.preventDefault=function(...e){var n,o;if(!this.type.startsWith("touch")||!(null===(n=(o=this.target).matches)||void 0===n?void 0:n.call(o,Oo.storyCreation.canvas)))return t.call(this,...e)}}(),async function(){const t=await Ct("http");if(!t)return;const e=t.post.bind(t);t.post=(...t)=>((()=>{var e;if(!(null===(e=t[0])||void 0===e?void 0:e.includes("/configure_to_story")))return;const n=T.$(Oo.storyCreation.uploadText);n&&(n.innerText="Publishing...")})(),e(...t));const n=Symbol();T.onDocMutations((()=>{const t=T.$(Oo.storyCreation.uploadText);t&&(t[n]||(t[n]=!0,t.innerText="Uploading...",t.insertAdjacentHTML("afterend",'\n      <div class="StoryUploadText">\n        This might take a minute. Please keep this tab open.\n      </div>\n    ')))})),T.insertMultistyle`
    <style>
      ${Oo.storyCreation.uploadBar} {
        display: block;
        padding-top: 8px;
        height: 52px;
      }

      ${Oo.storyCreation.uploadText} {
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
        ${Oo.storyCreation.uploadBar} {
          padding-top: 9px;
        }
        ${Oo.storyCreation.uploadText} {
          font-size: 12px;
        }
        .StoryUploadText {
          font-size: 12px;
          margin-top: 0;
        }
      }
    </style>
  `}()}};let Oo;var zo={init:async function(){if(Ho=St.controller.getConfig().igSelectors,No=await Ct("store"),!No)return;T.onDocClick((function(t){t.target.closest('[href="/direct/inbox/"]')&&(t.preventDefault(),t.stopPropagation(),Pt.send("ig.open-sidebar-dm"))}),{capture:!0}),function(){const t=Symbol("handled");T.onDocMutations((async()=>{const o=T.$(Ho.profilePage.moreButton);if(!o)return;const i=No.getState(),r=i.users.viewerId,s=i.users.users.get(r);if(location.pathname.split("/")[1]===s.username)return;let a=T.$(".write-button");if(a&&a!==o.previousElementSibling)return a.remove(),void(o[t]=!1);if(o[t])return;o[t]=!0;await n()&&(o.insertAdjacentHTML("beforebegin",'\n      <button class="write-button">\n        <svg xmlns="http://www.w3.org/2000/svg" width="19.998" height="17.224" viewBox="0 0 19.998 17.224">\n          <path d="M2.079.75h16.57L9.818 15.071l-1.3-9zm6.508 5.315l9.68-5.127" fill="none" stroke="currentColor" stroke-width="1.5"/>\n        </svg>\n      </button>\n    '),a=T.$(".write-button"),a.addEventListener("click",e))})),T.insertMultistyle`
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

      ${Ho.profilePage.writeButton} {
        display: none !important;
      }

      ${Ho.profilePage.followButton} {
        width: auto !important;
        margin-left: 0 !important;
      }

      ${Ho.profilePage.buttonsRow} {
        flex-grow: 0;
        flex-direction: row;
      }

      ${Ho.profilePage.blueButtonsWrap} {
        flex-grow: 0;
        flex-shrink: 0;
      }

      ${Ho.profilePage.subscribeButtonWrap} {
        flex-shrink: 1 !important;
        overflow: hidden !important;
      }
    </style>
  `;const e=async()=>{const t=await n();t&&Pt.send("ig.start-conversation-in-sidebar-dm",t.id)},n=async()=>{const t=location.pathname.split("/")[1];return await T.waitFor((()=>{const e=No.getState(),n=e.users.usernameToId.get(t);return e.users.users.get(n)||null}))}}()}};let Ho,No;var Vo={init:async function(){if(Uo=await Ct("store"),!Uo)return;jo=St.controller.getConfig().igSelectors,function(){const t=Symbol("handled");T.onDocMutations((()=>{const e=T.$(jo.profilePage.content);if(!e)return;if(e[t])return;e[t]=!0;const n=qo({empty:!0});e.insertAdjacentHTML("afterbegin",n),(async()=>{try{var t;const n=location.pathname.split("/")[1],o=await T.waitFor((()=>{const t=Uo.getState(),e=t.users.usernameToId.get(n);if(e)return t.users.users.get(e)}));if(!document.body.contains(e))return;const i=Object.values(Uo.getState().posts.byId.toJS()).filter((t=>{var e;return String(null===(e=t.owner)||void 0===e?void 0:e.id)===String(o.id)})).filter((t=>!t.productType||"feed"===t.productType||"igtv"===t.productType)).sort(((t,e)=>e.postedAt-t.postedAt)).slice(0,12),r={userId:o.id,username:o.username,bio:o.bio,postsCount:o.counts.media,followersCount:o.counts.followedBy,followingsCount:o.counts.follows,isPrivate:o.isPrivate,isVerified:o.isVerified,hasAvatar:o.profilePictureUrl.includes("150x150"),hasHighlights:o.highlightReelCount>0,lastPosts:i.map((t=>({ts:1e3*t.postedAt})))};if(Wo.grade=await Pt.send("chrome-bus","insights.get-credibility-grade",r),!document.body.contains(e))return;Wo.engagement=function({user:t,posts:e}){const n=Uo.getState().users.viewerId===t.id;if(t.isPrivate&&!n||0===e.length)return{value:"N/A",color:"#D8DADD",label:""};const o=e.map((t=>t.comments+t.likes)).reduce(((t,e)=>t+e),0),i=e.length>0?o/e.length:0,r=t.followerCount>0?i/t.followerCount*100:0,s=`${r<5?(Math.round(10*r)/10).toFixed(1):Math.round(r).toString()}%`,a={value:s,color:"#797979",label:"average"},l={value:s,color:"#74BE86",label:"above avg"},c={value:s,color:"#74BE86",label:"high"},d={value:s,color:"#74BE86",label:"v. high"},u={value:s,color:"#74BE86",label:"extreme"},p=r/(64.18845*Math.pow(t.followerCount,-.2251755));if(p<.4)return a;if(p<.8)return l;if(p<1.2)return c;if(p<1.8)return d;return u}({user:{id:o.id,isPrivate:o.isPrivate,followerCount:(null===(t=o.counts)||void 0===t?void 0:t.followedBy)||0},posts:i.map((t=>({likes:t.numPreviewLikes||0,comments:t.numComments||0})))});const s=Uo.getState().users.viewerId;Wo.followStatus={show:String(s)!==String(o.id),value:o.followsViewer};T.$(".profile-bar").outerHTML=qo();kt({anchor:T.$(".profile-bar__info-circle"),class:"profile-bar__info-tooltip",text:"\n            <b>Account Grade</b>\n            <br/>\n            This estimates if Instagram account is<br/>\n            spam / inactive or a real person / business.\n            Inssist relies on Machine Learning to identify\n            the grade.\n            <br/><br/>\n\n            <b>Engagement Rate</b>\n            <br/>\n            Profile engagement rate is calculated as\n            <code>(likes + comments) / followers</code>, for the last<br/>\n            12 posts. The higher account engagement,<br/>\n            the more active the followers are.\n            <br/><br/>\n\n            <b>Follow Status</b>\n            <br/>\n            Shows if this account is following you or not.\n            <br/><br/>\n\n            Account Grade and Engagement Rate are<br/>\n            not available for private accounts.\n          "})}catch(t){console.error("ig profile bar controller → manageBarCreation:",t);const e=T.$(".profile-bar");e&&e.remove()}})()}))}(),T.insertMultistyle`
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
  `}};let jo,Uo;const Wo={grade:null,engagement:null,followStatus:null};function qo({empty:t=!1}={}){return t?'\n      <div class="profile-bar"></div>\n    ':`\n    <div class="profile-bar">\n      <div class="profile-bar__items">\n        <div class="profile-bar__item">\n          <div class="profile-bar__value">\n            ${Wo.grade?`\n              <span style="color: ${Wo.grade.color}">${Wo.grade.value}</span>,\n              ${Wo.grade.label}\n            `:""}\n          </div>\n          <div class="profile-bar__label">\n            Account grade\n          </div>\n        </div>\n        <div class="profile-bar__item">\n          <div class="profile-bar__value">\n            <span style="color: ${Wo.engagement.color}">\n              ${Wo.engagement.value}\n            </span>\n            ${Wo.engagement.label?`, ${Wo.engagement.label}`:""}\n          </div>\n          <div class="profile-bar__label">\n            Engagement\n          </div>\n        </div>\n        ${Wo.followStatus.show?`\n          <div class="profile-bar__item">\n            <div class="profile-bar__value">\n              ${Wo.followStatus.value?"Yes":"No"}\n            </div>\n            <div class="profile-bar__label">\n              Follows me\n            </div>\n          </div>\n        `:""}\n      </div>\n      <div class="profile-bar__info-circle info-circle">?</div>\n    </div>\n  `}var Yo={init:async function(){if(Go=St.controller.getConfig().igSelectors,Xo=await Ct("nav"),Qo=await Ct("http"),Jo=await Ct("store"),Ko=await Ct("add-dispatch-listener"),!(Xo&&Qo&&Jo&&Ko))return;Ko((t=>{"STORY_CREATION_EXIT"===t.type&&(Io.storySharingPost=null)})),function(){let t;Ko((e=>{"POST_SHARE_IDS_LOADED"===e.type&&(t=e.postId)}));const e=Symbol("handled");T.onDocMutations((()=>{if(!T.$(Go.dragPanel.sendEmailLink))return;const n=T.$(Go.dragPanel.shareMenuItem);if(!n)return;if(n[e])return;n[e]=!0,n.insertAdjacentHTML("beforebegin",'\n      <div class="share-to-story">\n        <div class="share-to-story__icon">\n          <svg class="share-to-story__icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12.474 22.779a11.28 11.28 0 01-5.294-1.32.777.777 0 11.732-1.37 9.741 9.741 0 006.775.884.777.777 0 01.353 1.513 11.326 11.326 0 01-2.566.293zm-7.205-2.871a.773.773 0 01-.534-.213 11.218 11.218 0 01-3.2-5.509.777.777 0 011.51-.366 9.667 9.667 0 002.757 4.748.777.777 0 01-.534 1.34zm-3.221-8.651h-.077a.776.776 0 01-.7-.849 11.174 11.174 0 01.995-3.632.777.777 0 011.408.656 9.618 9.618 0 00-.854 3.122.777.777 0 01-.772.703zm3.258-6.58a.777.777 0 01-.6-1.269q.1-.127.211-.25a.777.777 0 111.171 1.02c-.062.071-.122.143-.182.215a.776.776 0 01-.6.284zm12.543 16.62a.777.777 0 01-.4-1.443 9.7 9.7 0 00-4.975-18.03.777.777 0 110-1.554 11.255 11.255 0 015.773 20.917.77.77 0 01-.398.11z" fill="currentColor"/><path d="M17.723 10.788h-4.45v-4.45H11.72v4.45H7.27v1.553h4.45v4.45h1.553v-4.45h4.45z" fill="currentColor"/></svg>\n        </div>\n        <div class="share-to-story__text">\n          Share to Story\n        </div>\n      </div>\n    ');T.$(".share-to-story").addEventListener("click",(e=>{e.stopPropagation(),async function(t){const e=Jo.getState().posts.byId.get(t);if(!e)return;const n=await fetch(e.src,{credentials:"omit"}),o=await n.blob(),i=URL.createObjectURL(o),{width:r,height:s}=await new Promise((t=>{const e=new Image;e.src=i,e.addEventListener("load",(()=>{t({width:e.width,height:e.height})}))}));Io.storySharingPost=e,Jo.dispatch({type:"STORY_CREATION_SESSION_STARTED",entryPoint:"quick_cam_button",sessionId:Math.random().toString().slice(2),startTime:Date.now()}),Jo.dispatch({type:"STORY_CREATION_IMAGE_PROCESSED",flash:!1,location:null,orientation:0,sourceImage:o,sourceDataURL:i,width:r,height:s}),Xo.push("/create/story/")}(t),Pt.send("ga.send-event","user","ig:share-to-story-click")}))})),T.insertMultistyle`
    <style>
      .share-to-story {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 8px 16px;
        cursor: pointer;
      }
      .share-to-story:hover {
        background: #FAFAFA;
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
  `}(),function(){const t=Qo.post.bind(Qo);Qo.post=(...e)=>("/create/configure_to_story/"===e[0]&&Io.storySharingPost&&(e[1]={...e[1],reshared_media_id:Io.storySharingPost.id,story_sticker_ids:`media_simple_${Io.storySharingPost.id}`,attached_media:JSON.stringify([{x:.5,y:.5,width:.5,height:.5,rotation:0,media_id:Io.storySharingPost.id,media_owner_id:Io.storySharingPost.owner.id,is_sticker:!0}])}),t(...e))}()}};let Go,Xo,Qo,Jo,Ko;var Zo={init:function(){!async function(){const t=await Ct("store");if(!t)return;const e=Symbol("handled");T.onDocMutations((()=>{const n=T.$(".get-insights-button-row");if(!n)return;if(n[e])return;n[e]=!0;const o=t.getState(),i=o.navigation.displayedRoute.split("/")[1],r=o.users.usernameToId.get(i);if(!r)return;const s=o.users.users.get(r);if(!s)return;const a=s.businessEmail;a&&n.insertAdjacentHTML("afterbegin",`\n      <a class="profile-email-button" href="mailto:${a}">\n        Email\n      </a>\n    `)})),T.insertMultistyle`
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
  `}()}};function ti(){const t=window.require("CurrentUserInitialData");return(null==t?void 0:t.APP_ID)||"1217981644879628"}var ei={init:function(){ni=St.controller.getConfig().igSelectors,async function(){const t=await Ct("store"),e=await Ct("http");if(!t||!e)return;const n=Symbol("handled");T.onDocMutations((()=>{const e=T.$(ni.general.actionDialogWithoutHeader);if(!e)return;if(e[n])return;e[n]=!0;const o=t.getState();if("postPage"!==o.navigation.pageIdentifier)return;const i=location.pathname.split("/")[2],r=o.posts.byId.toJS(),s=Object.values(r).find((t=>t.code===i));if(!s)return;if(s.owner.id!==o.users.viewerId)return;const a=T.$(ni.general.modalWindow);if(!a)return;e.firstChild.insertAdjacentHTML("afterend",'\n      <button class="edit-post-action-button">\n        Edit Caption\n      </button>\n    ');T.$(".edit-post-action-button").addEventListener("click",(()=>{a.classList.add("post-editor"),e.innerHTML=`\n        <form class="post-editor__form">\n          <div class="post-editor__title">\n            Edit Caption\n          </div>\n          <textarea\n            class="post-editor__textarea"\n            placeholder="Write a caption..."\n            maxlength="2200"\n            spellcheck="false"\n            required\n          >${s.caption||""}</textarea>\n          <div class="post-editor__buttons">\n            <button class="post-editor__button-save button" type="submit">\n              Save Caption\n            </button>\n            <button class="post-editor__button-cancel button button_cancel">\n              Cancel\n            </button>\n          </div>\n          <div class="post-editor__error"></div>\n        </form>\n      `;const t=T.$(".post-editor"),n=T.$(".post-editor__textarea"),o=T.$(".post-editor__button-save"),i=T.$(".post-editor__button-cancel"),r=T.$(".post-editor__error");setTimeout((()=>{n.focus(),n.setSelectionRange(n.value.length,n.value.length)}),300),n.addEventListener("input",(()=>{t.classList.remove("post-editor_with-error")})),t.addEventListener("submit",(async e=>{var a;let l;e.preventDefault(),n.disabled=!0,o.disabled=!0,i.disabled=!0,o.innerText="Saving...";try{l=await fetch(`https://i.instagram.com/api/v1/media/${s.id}/edit_media/`,{method:"POST",credentials:"include",headers:{"content-type":"application/json","x-csrftoken":window._sharedData.config.csrf_token,"x-ig-app-id":ti()},body:JSON.stringify({caption_text:T.$(".post-editor__textarea").value})}),l=await l.json()}catch(e){l={error:e}}var c,d,u,p,h,g,f;"ok"===(null===(a=l)||void 0===a?void 0:a.status)?location.reload():(n.disabled=!1,o.disabled=!1,i.disabled=!1,o.innerText="Save Caption",t.classList.add("post-editor_with-error"),"igtv"===s.productType?r.innerHTML="\n              Instagram refused to edit caption.\n              Please use Instagram Mobile App to edit caption of this post.\n            ":r.innerText=(null===(c=l)||void 0===c||null===(d=c.error)||void 0===d?void 0:d.message)||(null===(u=l)||void 0===u||null===(p=u.error)||void 0===p||null===(h=p.responseObject)||void 0===h?void 0:h.message)||(null===(g=l)||void 0===g||null===(f=g.error)||void 0===f?void 0:f.responseText)||"Unknown error")})),i.addEventListener("click",(()=>{const t=T.$(ni.general.modal);if(!t)return;const e=new MouseEvent("mousedown",{bubbles:!0});t.dispatchEvent(e)}))}))})),T.insertMultistyle`
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
  `}()}};let ni;var oi={init:async function(){if(ii=St.controller.getConfig().igSelectors,ri=await Ct("add-dispatch-listener"),!ri)return;(function(){const t=Symbol("handled");T.onDocMutations((()=>{const e=T.$(ii.postCreation.captionContainer);e&&(e[t]||(e[t]=!0,e.insertAdjacentHTML("beforeend",`\n      <div class="post-caption-limits">\n        <svg class="post-caption-limits__icon" xmlns="http://www.w3.org/2000/svg" width="28.824" height="26.006" viewBox="0 0 28.824 26.006">\n          <path d="M10.948 1.999a4 4 0 016.926 0l10.407 18.007a4 4 0 01-3.463 6H4.006a4 4 0 01-3.463-6z" fill="currentColor"/>\n          <path class="exclamation" d="M13.622 17.079l-.748-9.537 2.972.019-.753 9.518zm-.613 1.428h2.7v2.663h-2.7z" fill="#fff"/>\n        </svg>\n        <div class="post-caption-limits__text">${si}</div>\n      </div>\n    `)))}))})(),T.insertMultistyle`
    <style>
      .post-caption-limits--show ${ii.postCreation.captionContainer} {
        padding-bottom: 32px;
      }

      .post-caption-limits--show ${ii.postCreation.submitPostButton} {
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
  `,ri((t=>{if("CREATION_CAPTION_CHANGED"!==t.type)return;const e=t.caption,n=(e.match(/@[\p{L}\d_]+/gu)||[]).length,o=(e.match(/#[\p{L}\d_]+/gu)||[]).length;si=e.length>ai?`Caption length exceeded: ${e.length} / ${ai}`:n>li?`Mention limit exceeded: ${n} / ${li}`:o>ci?`Hashtag limit exceeded: ${o} / ${ci}`:"",T.docElem.classList.toggle("post-caption-limits--show",!!si);const i=T.$(".post-caption-limits__text");i&&(i.innerText=si)}))}};let ii,ri,si="";const ai=2200,li=30,ci=30;var di={init:async function(){if(ui=St.controller.getConfig().igSelectors,pi=await Ct("http"),hi=await Ct("store"),gi=await Ct("add-dispatch-listener"),!pi||!hi||!gi)return;!function(){let t=0;const e=pi.post;pi.post=async(...i)=>{const r=i[0],s=r.includes("/create/configure")&&!r.includes("story")||r.includes("/igtv/configure_to_igtv"),a=r.includes("/media/configure_to_clips");if(!(s||a))return e.call(pi,...i);const l=()=>{hi.dispatch({type:"UPDATE_UPLOAD_TEXT",text:"Publishing Post..."}),setTimeout((()=>n()))};let c;l();try{c=await e.call(pi,...i)}catch(t){c={status:"fail"}}return"fail"===c.status?t<20?(t+=1,requestAnimationFrame((()=>{l()})),setTimeout((()=>{pi.post(...i)}),5*T.time.SECOND),c):(t=0,requestAnimationFrame((()=>{hi.dispatch({type:"UPDATE_UPLOAD_TEXT",text:c.message?`Error: ${c.message}`:"Unknown error."}),o();const t=T.$(ui.general.uploadPanel);if(!t)return;t.insertAdjacentHTML("beforeend",'\n        <button class="retry-upload-button clickable">\n          Retry\n        </button>\n      ');const e=T.$(".retry-upload-button");e.addEventListener("click",(()=>{l(),pi.post(...i),e.remove()}))})),c):(t=0,requestAnimationFrame((()=>{hi.dispatch({type:"UPDATE_UPLOAD_TEXT",text:"Done"}),o()})),c)};const n=()=>{if(T.$(".PublishingDisclaimer"))return;const t=T.$(ui.general.publishingBarText);t&&t.insertAdjacentHTML("beforeend",'\n      <div class="PublishingDisclaimer">\n        This might take a minute.\n        Please keep this tab open.\n      </div>\n    ')},o=()=>{const t=T.$(".PublishingDisclaimer");t&&t.remove()};T.insertMultistyle`
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
  `}()}};let ui,pi,hi,gi;const fi={init:async function(){this.sel=St.controller.getConfig().igSelectors,this.store=await Ct("store"),this.store&&(Pt.on("ig.creation-get-caption",this.getCaption.bind(this)),Pt.on("ig.creation-set-caption",this.setCaption.bind(this)),this.watchCreationSession(),this.notifyVideoChange())},getCaption:function(){var t,e;return(null===(t=this.store.getState().creation)||void 0===t||null===(e=t.finalizedMedia)||void 0===e?void 0:e.caption)||""},setCaption:function(t){this.store.dispatch({type:"CREATION_CAPTION_CHANGED",caption:t});const e=T.$(this.sel.postCreation.captionTextarea);e&&(e.scrollTop=e.scrollHeight)},watchCreationSession:function(){let t=!1,e=!1,n=!1;this.store.subscribe((()=>{var o;const i=this.store.getState(),r=null===(o=i.navigation)||void 0===o?void 0:o.pageIdentifier;if(!r)return;const s=r.startsWith("Creation"),a=r.startsWith("StoryCreation"),l=s||a;if(l!==n)if(n=l,l){var c,d;const n=null===(c=i.creation.sourceVideo)||void 0===c?void 0:c.file,o=null===(d=i.storyCreation.sourceVideo)||void 0===d?void 0:d.file;t=a,e=!(!n&&!o),Pt.send("ig.creation-session-start",{isStory:t,isVideo:e})}else Pt.send("ig.creation-session-end",{isStory:t,isVideo:e})}))},notifyVideoChange:async function(){let t=null;this.store.subscribe((()=>{var e,n;const o=this.store.getState(),i=null===(e=o.creation)||void 0===e?void 0:e.sourceVideo,r=null===(n=o.storyCreation)||void 0===n?void 0:n.sourceVideo,s=null==i?void 0:i.dataURL,a=null==r?void 0:r.dataURL,l=s||a||null;l!==t&&(t=l,Pt.send("ig.creation-video-change",{url:l}))}))}},mi={init:function(){this._supportExtensionLinks()},_supportExtensionLinks:function(){T.onDocClick((t=>{const e=t.target.closest('[href^="chrome-extension://"]');e&&(t.preventDefault(),t.stopPropagation(),Pt.send("ig.open-link",e.getAttribute("href")))}))}};var yi={init:function(){this._injectVideoSupportCode()},_injectVideoSupportCode:function(){window.inssist.creationSelectVideo=t=>async e=>{try{const n=window.require,{browserHistory:o}=n("browserHistory");let i,r;{let t;try{t=n("polarisReadVideoFile")}catch{t=n("PolarisreadVideoFile")}i=t.readVideoFile}{let t;try{t=n("polarisGetVideoCoverPhoto")}catch{t=n("PolarisgetVideoCoverPhoto")}r=t.getVideoCoverPhoto}const s=String(Date.now()),a=`feed_${s}`,l=await i(t),c=await r(l,!0);e({type:"CREATION_VIDEO_PROCESSED",dataURL:l.src,entityName:a,file:t,uploadId:s,uploadMediaHeight:l.videoHeight,uploadMediaWidth:l.videoWidth,uploadMediaDurationMs:Math.floor(1e3*l.duration),videoTransform:c.videoTransform,mediaPublishMode:"default"}),e({type:"CREATION_VIDEO_COVER_PHOTO_UPDATED",dataURL:c.dataURL,entityName:a,file:c.file,uploadId:s,uploadMediaHeight:c.uploadMediaHeight,uploadMediaWidth:c.uploadMediaWidth}),o.push("/create/style/")}catch(t){console.error("failed to select video",t)}}}};var vi={controller:{init:async function(){window.ig=Vn,Fn.controller.init(),T.iframe.isIframe()&&async function(){if(!T.ls.get("inssist.isDevelopment"))return;window.$=T.$,window.$$=T.$$,window.sel=St.controller.getConfig().igSelectors,window.store=await Vn.require("store"),Object.defineProperty(window,"state",{get:function(){const t=window.store.getState();return JSON.parse(JSON.stringify(t))}});const t=await Vn.require("add-dispatch-listener");let e=!1;window.showActions=()=>{e=!0},window.hideActions=()=>{e=!1},t((t=>{e&&console.warn(t)}))}();if(!T.iframe.isIframe())return He.controller.init(),Rn.controller.init(),kn.controller.init(),void E.controller.init();const t=T.iframe.isIframe("inssist-ig"),e=T.iframe.isIframe("inssist-dm");(t||e)&&(ln.init(),zt.controller.init(),mi.init(),function(){const t=St.controller.getConfig().igSelectors,e=Symbol("handled");T.onDocMutations((()=>{const n=T.$(t.general.splashScreen);n&&(n[e]||(n[e]=!0,n.insertAdjacentHTML("afterbegin",`\n      <div class="navigation-spinner">\n        ${_e()}\n      </div>\n    `)))})),T.insertMultistyle`
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
  `}());if(t)return Ct.lock("http"),Ct.lock("http:story-assist"),We.controller.init(),Ge.controller.init(),rn.controller.init(),Qt.controller.init(),Nn.controller.init(),re.controller.init(),ao.init(),yi.init(),po.init(),go.init(),mo.init(),vo.init(),Ao.init(),Lo.init(),Fo.init(),zo.init(),Vo.init(),Yo.init(),dn.controller.init(),ie.controller.init(),fn.controller.init(),Vt.controller.init(),bn.init(),Hn.controller.init(),Zo.init(),ei.init(),oi.init(),di.init(),It.controller.init(),zn.controller.init(),fi.init(),uo.init(),await T.waitForDocumentReady(),void Pt.send("ig.ready");e&&(await T.waitForDocumentReady(),Fe.controller.init())}}};({init:function(){vi.controller.init()}}).init()}();