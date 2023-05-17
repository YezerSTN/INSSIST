!function(){function e(e){return Array.isArray(e)?e:[e]}function t(t,o=document){t=e(t);for(const e of t){const t=o.querySelector(e);if(t)return t}return null}function o(t,o=document){t=e(t);const n=[];for(const e of t){const t=o.querySelectorAll(e);for(const e of t)n.includes(e)||n.push(e)}return n}const n=36e5,i=864e5;var r={SECOND:1e3,MINUTE:6e4,HOUR:n,DAY:i,WEEK:6048e5,MONTH:26784e5};function a(e){try{return JSON.parse(e)}catch(e){return null}}var s={createName:function(e,t){return`${e}|${JSON.stringify(t)}`},getName:l,getParams:function(){return a(window.self.name.split("|")[1])||{}},isIframe:function(e=null){return window.self!==parent&&(!e||l()===e)}};function l(){return window.self.name.split("|")[0]||null}const c={get:function(e,t){if(!this._supported())return t;const o=localStorage.getItem(e);if(null==o)return t;if("true"===o)return!0;if("false"===o)return!1;if(o.startsWith("[")||o.startsWith("{"))return JSON.parse(o);const n=Number(o);return Number.isNaN(n)?o:n},set:function(e,t){if(this._supported())try{"string"==typeof t?localStorage.setItem(e,t):localStorage.setItem(e,JSON.stringify(t))}catch(o){console.error("local-storage-json: failed to set",{key:e,value:t,details:o})}},has:function(e){return!!this._supported()&&e in localStorage},remove:function(e){this._supported()&&localStorage.removeItem(e)},_supported:function(){return"undefined"!=typeof window&&!!window.localStorage}};var d={unique:function(e){return Array.from(new Set(e))},gaussian:p,gaussianInt:function(e,t){return Math.round(e+p()*(t-e))},forceLayout:function(){document.body.getBoundingClientRect()},hashCode:u,pseudorandom:function(e){return 16807*Math.max(Math.abs(u(e)),1)%2147483647/2147483646},rotate:function(e,t=1){const o="slashed.io";let n="";return Array.from(e).forEach(((e,i)=>{const r=o[i%o.length].charCodeAt(),a=(e.charCodeAt()+t*r+65536)%65536;n+=String.fromCharCode(a)})),n},getUnixTime:function(){return Math.round(Date.now()/1e3)},takeBetween:function(e,t,o){const n=e.split(t)[1];if(!n)return null;return n.split(o)[0]||null},takeAllBetween:function(e,t,o){return e.split(t).slice(1).map((e=>e.split(o)[0]))},capitalize:function(e){return e.charAt(0).toUpperCase()+e.substr(1).toLowerCase()},getIntegralNumberPart:function(e){const t=Math.abs(e);return e>0?Math.floor(t):-Math.floor(t)},getFractalNumberPart:function(e){const t=Math.abs(e);return Number((t-Math.floor(t)).toFixed(12))}};function p(){let e=0;for(let t=0;t<6;t+=1)e+=Math.random();return e/6}function u(e){if(!e)return 0;let t,o,n=0;if(0===e.length)return n;for(t=0;t<e.length;t++)o=e.charCodeAt(t),n=(n<<5)-n+o,n|=0;return n}var g=document.documentElement;async function h(e,t=null){let o,n;return"number"==typeof t?(o=t,n=100):t?(o=t.timeout||3e4,n=t.frequency||100):(o=3e4,n=100),new Promise(((t,i)=>{const r=e();if(r)return void t(r);const a=setInterval((()=>{const o=e();o&&(clearInterval(a),t(o))}),n);setTimeout((()=>{clearInterval(a),t(null)}),o)}))}function f(e,t){return m(t)||(t=JSON.stringify(t)),`${encodeURIComponent(e)}=${encodeURIComponent(t)}`}function m(e){return"string"==typeof e||"number"==typeof e||"boolean"==typeof e}function y(e,t){if(e[0]!==t[0])return!1;const o=Math.min(e.length,t.length);if(0===o)return"";const n=e.substr(0,o);return n===t.substr(0,o)?n:y(e.substr(0,o-1),t.substr(0,o-1))}function v(e){return e.toLowerCase().replace(/[ .,?!\-—–+=_%:;$#@/{}()]/g,"")}var b=Object.assign((function(e,t={}){document.addEventListener("click",e,t)}),{off:function(e,t={}){document.removeEventListener("click",e,t)}});function _(){const e=[];return Object.assign(t,{handle:function(e){if("function"!=typeof e)return void console.error("function is expected");t(e)},clear:function(){e.length=0},off:function(t){const o=e.indexOf(t);-1!==o&&e.splice(o,1)},isEmpty:function(){return 0===e.length}});function t(...t){"function"==typeof t[0]?e.push(t[0]):e.forEach((e=>e(...t)))}}var x=Object.assign((function(e,t=!1){0===P.length&&(w=new MutationObserver((e=>{for(const t of P){w.disconnect();try{t(e)}catch(e){console.error("onDocMutations",e)}if(!w)return;w.observe(document.documentElement,{attributes:!0,childList:!0,subtree:!0})}})),w.observe(document.documentElement,{attributes:!0,childList:!0,subtree:!0}));P.push(e),t&&e()}),{off:function(e){const t=P.indexOf(e);if(-1===t)return;P.splice(t,1),0===P.length&&(w.disconnect(),w=null)}});const P=[];let w;function S(t,...o){let n=0;return t.join("###").split(",").join("\n,\n").split("{").join("\n{").split("\n").map((t=>{if(!t.includes("###"))return t;const i=e(o[n]).map((e=>t.split("###").join(e))).join(",\n");return n+=1,i})).join("\n").split(";").join(" !important;").replace(/!important\s*!important/g,"!important")}function C(...e){const t=S(...e);document.head.insertAdjacentHTML("afterbegin",t)}function T(...e){const t=S(...e).split("!important").join("");document.head.insertAdjacentHTML("afterbegin",t)}var M={init:function(e){if(!e)return;if(e[k])return;e[k]=!0;let t=!1;e.addEventListener("mouseleave",(()=>{t=!1})),e.addEventListener("mousewheel",(o=>{o.deltaX&&(t=!0),t||(o.preventDefault(),e.scrollLeft+=o.deltaY)}))}};const k=Symbol("handled");var E={};Object.assign(E,{$:t,$$:o,ls:c,safe:function(e,t=null){try{const o=e();return o instanceof Promise?new Promise(((e,n)=>{o.then(e).catch((o=>{o&&console.error(o),e(t)}))})):o}catch(e){return console.error(e),t}},sleep:async function(e){if("number"==typeof e&&Number.isFinite(e)){const t=e;await new Promise((e=>setTimeout(e,t)))}else{if(!e||"object"!=typeof e||e.constructor!==Object)throw new Error("unexpected sleep function argument: number or object expected, got",e);{const{min:t,max:o}=e.longBreak&&Math.random()<1-Math.pow(.5,1/e.longBreak.every)?{min:0,max:0,...e.longBreak}:{min:0,max:0,...e},n=o-t,i=t+d.gaussianInt(0,n);if(0===i)return;await new Promise((e=>setTimeout(e,i)))}}},docElem:g,waitFor:h,createUrl:function(e,t={}){const o=function(e){return Object.keys(e).map((t=>{const o=e[t];return m(o)?f(t,o):Array.isArray(o)?o.map((e=>f(t,e))).join("&"):null})).filter(Boolean).join("&").replace(/%5B/g,"[").replace(/%5D/g,"]")}(t);return o?`${e}?${o}`:e},setCookie:function(e,t){document.cookie=`${e}=${t}; path=/`},fuzzyCheck:function(e,t,o=1){if(e=v(e),""===(t=v(t)))return!0;for(;e.length>0;){const n=y(e,t);if(n.length>=o||n.length>0&&t.length<o){if(e=e.substr(n.length),""===(t=t.substr(n.length)))return!0}else e=e.substr(1)}return!1},onDocClick:b,iframeUtils:s,createEmitter:_,onDocMutations:x,safeJsonParse:a,removeFromArray:function(e,t){let o;o="function"==typeof t?e.findIndex(t):e.indexOf(t),-1!==o&&e.splice(o,1)},insertMultistyle:C,loadVideoMetadata:async function(e){const t="string"==typeof e?e:URL.createObjectURL(e),o=document.createElement("video");o.src=t,o.muted=!0,o.volume=0,o.preload="metadata",o.play();const n={};return await new Promise(((e,t)=>{o.addEventListener("loadedmetadata",(async()=>{await h((()=>o.webkitAudioDecodedByteCount),100),n.width=o.videoWidth,n.height=o.videoHeight,n.duration=o.duration,n.hasAudio=o.webkitAudioDecodedByteCount>0,e()})),o.addEventListener("error",(()=>{t(o.error)}))})),o.remove(),n},waitForDocumentReady:async function(){await h((()=>document.body))},smartHorizontalScroll:M,createResolvablePromise:function(){let e;const t=new Promise((t=>{e=t}));return Object.defineProperty(t,"resolve",{get:()=>e}),t},time:r,iframe:s});var $={selectors:{topNav:[".PolarisNavigation > .PolarisDesktopNav",".PolarisDirectShell_DEPRECATED > .PolarisDesktopNav",".PolarisDesktopNav._acum"],newPostMenuItem:[".XrOey:nth-child(3)",".PolarisDesktopNav._acut:nth-child(3)"],newPostButton:[".ctQZg button",".PolarisCreationIcon button",".PolarisNavigation .PolarisCreationNavItem a"],modalTitle:[".Yx5HN h1",".IGDSDialog h1 > div"],creationBody:[".uYzeu","._ac2r",".PolarisCreationModalBodyV2.x6ql1ns",".IGDSBox + .PolarisCreationModalBodyV2:nth-child(2)"],creationBodyRight:[".IJeHu > div > div",".PolarisCreationModalBodyV2._ac2v",".PolarisCreationModalBodyV2.x1f4304s"],creationDndBody:["._C8iK > .YBx95",".Dh40d",'._ac2t > .PolarisIGCoreBox[style*="height: 100%"]','.PolarisCreationModalBodyV2 > div[style*="height: 100%"]'],creationDndText:["._C8iK > .YBx95 h2",".Yx5HN .Dh40d h2",'._ac2t svg[height="77"] + .PolarisIGCoreBox h2'],creationDndIcon:["._C8iK > .YBx95 svg",".Yx5HN .Dh40d svg","._ac2t > .PolarisIGCoreBox svg"],creationLoadingBar:['._ac2r .PolarisCreationLoadingBar[data-visualcompletion="loading-state"]'],creationRatioToggler:[".czW__ > div:first-child .RJJyf > button",".PolarisCreationMediaPreviewV2 > div:first-child div:not([class]) button"],creationRatioOptionVertical:[".YAPUk button:nth-of-type(3)",".PolarisCreationMediaPopover > button:nth-of-type(3)"],creationGeoOption:[".brfp7 div:not([class])","div.PolarisCreationLocationInput"],creationAccessibilityDropdown:[":not(.n6uTB) + .n6uTB",".PolarisCreationModalComposeSettingsContent > div:not([class]) + .PolarisCreationModalComposeExpandInput"],creationAdvancedDropdown:".n6uTB + .n6uTB",creationDropdown:[".PolarisCreationModalComposeSettingsContent > div:not([class]) ~ .PolarisCreationModalComposeExpandInput"],creationBottomHr:[".W4P49",".PolarisCreationModalComposeSettingsContent hr"],creationNextButton:[".WaOAr .yWX7d","div.PolarisIGCoreModalHeader:last-child button","div.PolarisIGCoreModalHeader:last-child .Pressable"],creationPublishingSpinnerContainerWrap:['._ac2t > .PolarisIGCoreBox[style*="width: 100%"]'],creationPublishingSpinnerContainer:['div[style*="height: 96px"][style*="width: 96px"]'],creationPublishingSpinner:['img[src*="creation/spinner"]','div[style*="height: 96px"][style*="width: 96px"] img[src*=".gif"]'],creationCarouselAddMediaButton:[".czW__ > .Xf6Yq",".PolarisCreationMediaPreviewV2 > ._abck div:not([class])"],uploadForm:[".BaseDialog form.PolarisImageFileForm"],followSuggestionList:[".PolarisFeedSidebar:first-child + div .PolarisIGVirtualList > div"]},controller:{init:function(){}}},D={};function A(e,{isCreatingReels:t=(()=>!1),isSharingToFeed:o=(()=>!1),onSuccess:n=(()=>{})}){const i=e.post;e.post=async(...r)=>{if(!t())return i.call(e,...r);if(r[0].includes("/rupload_igvideo")){const t=r[2].headers,o=JSON.parse(t["X-Instagram-Rupload-Params"]);return o.is_igtv_video=!1,o.is_clips_video=!0,o.is_unified_video=!1,o.uses_original_audio=!0,o.audio_type="original_sounds",t["X-Instagram-Rupload-Params"]=JSON.stringify(o),i.call(e,...r)}if(r[0].includes("/create/configure")||r[0].includes("/media/configure")||r[0].includes("/igtv/configure_to_igtv")){r[0]="https://i.instagram.com/api/v1/media/configure_to_clips/",r[1].clips_uses_original_audio=1,r[1].uses_original_audio=1,r[1].original_audio=1,r[1].audio=1,r[1].clips_audio=1,r[1].clips_with_audio=1,r[1].with_audio=1,r[1].enable_audio=1,r[1].clips_enable_audio=1,r[1].clips_audio_enable=1,r[1].audio_enable=1,r[1].audio_type="original_sounds",o()&&(r[1].clips_share_preview_to_feed=1);const t=await i.call(e,...r);return"ok"===(null==t?void 0:t.status)&&n(),t}return i.call(e,...r)}}$.suggestionController={init:function(){this._state=this._readState(),this._createSuggestion(),this._injectStyles()},_readState:function(){return E.ls.get("inssist.hrpSuggestion",{showCount:0,clicked:!1})},_transaction:function(e){e(this._state),E.ls.set("inssist.hrpSuggestion",this._state)},_shouldShow:function(){return this._state.showCount<6&&!this._state.clicked},_createSuggestion:function(){if(!this._shouldShow())return;const e=Symbol("handled");E.onDocMutations((()=>{const t=E.$($.selectors.followSuggestionList);if(!t)return;if(t[e])return;t[e]=!0;const o=this._renderSuggestion();t.insertAdjacentHTML("afterbegin",o),D.controller.sendEvent("user","harpa-suggestion:show"),0===this._state.showCount&&D.controller.sendEvent("user","harpa-suggestion:show-unique"),this._transaction((e=>e.showCount+=1));E.$(".Suggestion").addEventListener("click",(e=>{this._transaction((e=>e.clicked=!0)),D.controller.sendEvent("user","harpa-suggestion:click")}))}))},_renderSuggestion:function(){return`\n      <a class="Suggestion" target="_blank" href="https://harpa.ai/case/chatgpt-for-instagram">\n        <img class="Suggestion__avatar" src="${window.inssist.url("/img/harpa-avatar.png")}"/>\n        <div class="Suggestion__body">\n          <div class="Suggestion__title">HARPA AI</div>\n          <div class="Suggestion__subtitle">Generate content with ChatGPT</div>\n        </div>\n        <div class="Suggestion__link">Open</div>\n      </a>\n    `},_injectStyles:function(){E.insertMultistyle`
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
    `}},D.controller={sendEvent:function(...e){window.postMessage({type:"ga.send-event",args:e})}};var I={},R={},B={},L={},O=1;L={nextValue:function(){return(O=(9301*O+49297)%233280)/233280},seed:function(e){O=e}};var F,N,H,z="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-";function V(){H=!1}function U(e){if(e){if(e!==F){if(e.length!==z.length)throw new Error("Custom alphabet for shortid must be "+z.length+" unique characters. You submitted "+e.length+" characters: "+e);var t=e.split("").filter((function(e,t,o){return t!==o.lastIndexOf(e)}));if(t.length)throw new Error("Custom alphabet for shortid must be "+z.length+" unique characters. These characters were not unique: "+t.join(", "));F=e,V()}}else F!==z&&(F=z,V())}function W(){return H||(H=function(){F||U(z);for(var e,t=F.split(""),o=[],n=L.nextValue();t.length>0;)n=L.nextValue(),e=Math.floor(n*t.length),o.push(t.splice(e,1)[0]);return o.join("")}())}B={get:function(){return F||z},characters:function(e){return U(e),F},seed:function(e){L.seed(e),N!==e&&(V(),N=e)},lookup:function(e){return W()[e]},shuffled:W};var j="object"==typeof window&&(window.crypto||window.msCrypto),G=j&&j.getRandomValues?function(e){return j.getRandomValues(new Uint8Array(e))}:function(e){for(var t=[],o=0;o<e;o++)t.push(Math.floor(256*Math.random()));return t},q=function(e,t,o){for(var n=(2<<Math.log(t.length-1)/Math.LN2)-1,i=-~(1.6*n*o/t.length),r="";;)for(var a=e(i),s=i;s--;)if((r+=t[a[s]&n]||"").length===+o)return r};var Y,X,K=function(e){for(var t,o=0,n="";!t;)n+=q(G,B.get(),1),t=e<Math.pow(16,o+1),o++;return n};var J=function(e){var t="",o=Math.floor(.001*(Date.now()-1567752802062));return o===X?Y++:(Y=0,X=o),t+=K(7),t+=K(e),Y>0&&(t+=K(Y)),t+=K(o)};var Q,Z=function(e){return!(!e||"string"!=typeof e||e.length<6)&&!new RegExp("[^"+B.get().replace(/[|\\{}()[\]^$+*?.-]/g,"\\$&")+"]").test(e)},ee=!1;var te=(ee||(ee=!0,Q={},Q=0),Q||0);function oe(){return J(te)}var ne=oe;(R=oe).generate=ne;var ie=function(e){return B.seed(e),R};R.seed=ie;var re=function(e){return te=e,R};R.worker=re;var ae=function(e){return void 0!==e&&B.characters(e),B.shuffled()};R.characters=ae;var se=Z;R.isValid=se,I=R;var le={on:function(e,t){ue();(ce[e]||(ce[e]=[])).push(t)},off:function(e,t){const o=ce[e];if(!o)return;for(;;){const e=o.findIndex((e=>e===t));if(-1===e)break;o.splice(e,1)}},send:function(e,...t){let o;const n=t[t.length-1];"function"==typeof n?(o=n,t=t.slice(0,-1)):o=null;return new Promise((n=>{chrome.runtime.sendMessage({[de]:e,[pe]:t},(e=>{chrome.runtime.lastError||(o&&o(e),n(e))}))}))}};const ce={},de="__$chromeBus.name",pe="__$chromeBus.args";function ue(){const e=ue;e.init||(e.init=!0,chrome.runtime.onMessage.addListener(((e,t,o)=>{const n=e["__$chromeBus.name"];if(!n)return!1;const i=e["__$chromeBus.args"]||[],r=ce[n]||[];return 0!==r.length&&((async()=>{const e=await Promise.all(r.map((e=>e(...i)))),t=e[e.length-1];o(t)})(),!!o)})))}var ge=le;const he="__iframeBus.name",fe="__iframeBus.args",me="__iframeBus.callbackId",ye="undefined"!=typeof parent&&parent!==window;function ve(e,t){const o=Pe(e),n=t["__iframeBus.handlers"]||(t["__iframeBus.handlers"]={});n[e]=async n=>{if(n.data["__iframeBus.name"]===o){const o=n.data["__iframeBus.args"]||[],i=n.data["__iframeBus.callbackId"]||null,r=await t(...o);i&&xe(`${e}:response-${i}`,r)}},window.addEventListener("message",n[e])}function be(e,t){ve(e,(function o(...n){return _e(e,o),t(...n)}))}function _e(e,t){const o=t["__iframeBus.handlers"]||(t["__iframeBus.handlers"]={});window.removeEventListener("message",o[e])}async function xe(e,...t){let n;const i=t[t.length-1];"function"==typeof i?(n=i,t=t.slice(0,-1)):n=null;const r=e.includes(":response-"),a=Pe(e),s=r?null:I.generate();if(ye?parent.postMessage({[he]:a,[fe]:t,[me]:s},"*"):o("iframe").forEach((e=>{e.contentWindow.postMessage({[he]:a,[fe]:t,[me]:s},"*")})),!r)return new Promise((t=>{const o=i=>{n&&n(i),_e(`${e}:response-${s}`,o),t(i)};ve(`${e}:response-${s}`,o)}))}function Pe(e){return`iframe-bus.${e}`}var we={init:function(){ge.on("iframe-bus",((e,...t)=>xe(e,...t))),ve("chrome-bus",((e,...t)=>ge.send(e,...t)))},on:ve,once:be,off:_e,send:xe,wait:async function(e){return await new Promise((t=>{be(e,t)}))}},Se={};const Ce=Symbol("anchor");function Te({class:e,style:t,text:o,anchor:n,atCenter:i=!1}){const r=Te;r.initialized||(r.initialized=!0,E.onDocMutations((()=>{E.$$(".tooltip").forEach((e=>{const t=e[Ce];document.body.contains(t)||e.remove()}))})),E.insertMultistyle`
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
  `);const a=document.createElement("div");a.innerHTML=`\n    <div\n      class="${e||""} tooltip ${i?"tooltip_at-center":""}"\n      ${t?`style="${t}"`:""}>\n      ${o}\n    </div>\n  `;const s=a.firstElementChild;document.body.insertAdjacentElement("afterend",s),s[Ce]=n,n.addEventListener("mouseenter",(()=>{let e,t;const o=n.getBoundingClientRect();i?(e=Math.round(o.left+o.width/2-s.offsetWidth/2-4),t=Math.round(o.top+o.height)):(e=Math.round(o.left+o.width-s.offsetWidth),t=Math.round(o.top+o.height)),s.style.left=`${e}px`,s.style.top=`${t}px`,s.classList.add("tooltip_shown")})),n.addEventListener("mouseleave",(()=>{s.classList.remove("tooltip_shown")}))}var Me=Object.assign((async function(e,t=3e4){"v2"===window.inssist.igBundleVersion&&await E.waitFor((()=>E.$(".BaseView")));ke[e]&&await ke[e];const o=e.split(":")[0],n=window.inssist.moduleInterceptor,i=await E.waitFor((()=>n.getModule(o)),t);i||console.error(`ig: failed to require ${o}`);return i}),{lock:function(e){ke[e]=E.createResolvablePromise()},unlock:Ee,unlockOnNextTick:function(e){setTimeout((()=>Ee(e)))}});const ke={};function Ee(e){ke[e]&&ke[e].resolve()}var $e={init:async function(){if(De=Se.controller.getConfig().igSelectors,Ae=await Me("http"),Ie=await Me("store"),!Ae||!Ie)return;A(Ae,{isCreatingReels:()=>Re.creatingReels,isSharingToFeed:()=>Re.shareToFeed,onSuccess:()=>{we.send("reels.submit-success")}}),function(){const e=Symbol("handled");E.onDocMutations((async()=>{if(!Re.creatingReels)return;const t=E.$(De.postCreation.submitPostButton);if(!t)return;if(t[e])return;t[e]=!0;const o=await we.send("reels.is-pro");t.addEventListener("click",(e=>{o||(e.preventDefault(),e.stopPropagation(),we.send("reels.open-billing"))}),{capture:!0}),o||(t.style.opacity=.5,Te({style:"width: 100%; max-width: 280px;",anchor:t,text:"\n          Posting Reels is a PRO feature, please consider\n          upgrading to publish Reels from the Desktop.\n        "}))}))}(),function(){const e=Symbol("handled");E.onDocMutations((()=>{if(!Re.creatingReels)return;const t=E.docElem.dataset.page;if(!("CreationStylePage"===t||"CreationDetailsPage"===t))return;const o=E.$(De.general.headerTitle);o&&(o[e]||(o[e]=!0,o.innerText="New Reel"))})),E.insertMultistyle`
    <style>
      /* hide "Advanced Posting Options" section */
      .reels--creating-reels .extended-post-creation {
        display: none;
      }
    </style>
  `}(),function(){const e=Symbol("handled");E.onDocMutations((async()=>{if(!Re.creatingReels)return;const t=E.$(De.postCreation.captionContainer);if(!t)return;if(t[e])return;t[e]=!0;const o=await we.send("reels.get-trial-data");if(true)return;t.insertAdjacentHTML("beforebegin",`\n      <div class="ReelsUpgradeToProBar">\n        <div class="ReelsUpgradeToProBar__text">\n          Free Reels Remaining: ${o.freeReels} / ${o.maxFreeReels}\n        </div>\n        <button class="ReelsUpgradeToProBar__button">\n          Get Unlimited Reels\n        </button>\n      </div>\n    `);E.$(".ReelsUpgradeToProBar__button").addEventListener("click",(()=>{we.send("reels.open-billing")}))})),E.insertMultistyle`
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
  `}(),function(){const e=Symbol("handled");E.onDocMutations((()=>{if(!Re.creatingReels)return;const t=E.$(De.postCreation.body);if(!t)return;if(t[e])return;t[e]=!0,t.insertAdjacentHTML("beforeend",`\n      <div class="reels-share-to-feed ${Re.shareToFeed?"reels-share-to-feed_on":""}">\n        <button class="reels-share-to-feed__button clickable">\n          <div class="reels-share-to-feed__checkbox">\n            <svg class="reels-share-to-feed__checkbox-icon-empty" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">\n              <path fill="none" d="M0 0h24v24H0z"/>\n              <path d="M19 5v14H5V5zm0-2H5a2.006 2.006 0 00-2 2v14a2.006 2.006 0 002 2h14a2.006 2.006 0 002-2V5a2.006 2.006 0 00-2-2z" fill="#1ba2f9" fill-rule="evenodd"/>\n            </svg>\n            <svg class="reels-share-to-feed__checkbox-icon-checked" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">\n              <path fill="none" d="M0 0h24v24H0z"/>\n              <path d="M19 3H5a2.006 2.006 0 00-2 2v14a2.006 2.006 0 002 2h14a2.006 2.006 0 002-2V5a2.006 2.006 0 00-2-2zm-9 14l-5-5 1-1 4 3 8-7 1 1-9 9z" fill="#1ba2f9" fill-rule="evenodd"/>\n            </svg>\n          </div>\n          <div class="reels-share-to-feed__label">\n            Also Share to Feed\n          </div>\n        </button>\n        <div class="reels-share-to-feed__preview">\n          <div class="reels-share-to-feed__preview-image"></div>\n          <div class="reels-share-to-feed__preview-caption">Feed Post Preview</div>\n        </div>\n      </div>\n    `);const o=E.$(".reels-share-to-feed");E.$(".reels-share-to-feed__button").addEventListener("click",(()=>{Re.shareToFeed=!Re.shareToFeed,o.classList.toggle("reels-share-to-feed_on")}))}));const t=()=>{var e,t;if(!Re.creatingReels)return;const o=null===(e=Ie.getState().creation)||void 0===e||null===(t=e.coverPhoto)||void 0===t?void 0:t.dataURL;if(!o)return;const n=E.$(".reels-share-to-feed__preview-image");n&&(n.style.backgroundImage=`url('${o}')`)};E.onDocMutations(t),Ie.subscribe(t),E.insertMultistyle`
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
  `}(),function(){const e=Symbol("handled");E.onDocMutations((()=>{if(!Re.creatingReels)return;const t=E.$(De.postCreation.imageContainer),o=E.$(De.postCreation.videoContainer),n=t||o;n&&(n[e]||(n[e]=!0,n.insertAdjacentHTML("beforeend",'\n      <div class="reels-tik-tok-watermark-info">\n        Find more info about posting Instagram Reels in our\n        <a href="https://inssist.com/knowledge-base" target="_blank">Knowledge Base</a> and\n        <a href="https://inssist.com/knowledge-base/sharing-tiktok-to-instagram-reels" target="_blank">Guide</a>.\n      </div>\n    ')))})),E.insertMultistyle`
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
  `}()},isShareToFeed:function(){return Re.shareToFeed},isCreatingReels:function(){return Re.creatingReels},startReelsCreationSession:function(){const e=Ie.getState().creation.sessionId;Re.creatingReels=!0,Re.shareToFeed=!1,E.docElem.classList.add("reels--creating-reels"),we.send("reels.creation-session-start"),Re.stopSessionWatcher=Ie.subscribe((()=>{const t=Ie.getState();e!==t.creation.sessionId&&Be()}))},stopReelsCreationSession:Be};let De,Ae,Ie;const Re={shareToFeed:!1,creatingReels:!1,stopSessionWatcher:null};function Be(){Re.creatingReels=!1,E.docElem.classList.remove("reels--creating-reels"),we.send("reels.creation-session-end"),Re.stopSessionWatcher&&Re.stopSessionWatcher()}var Le={controller:$e,patchHttp:A};const Oe={};async function Fe(e){if(await h((()=>window.requireLazy),3e4),window.requireLazy)return new Promise(((t,o)=>{const n=setTimeout((()=>{o("failed to use module",e)}),3e4);window.requireLazy([e],(e=>{clearTimeout(n),t(e)}))}))}Oe.controller={init:function(){Oe.define=this._define.bind(this),this._interceptors={},this._interceptUploadVideo(),this._interceptUploadPhoto()},_define:function(e,t){this._interceptors[e]=t},_interceptUploadVideo:async function(){const e=await Fe("PolarisAPIRuploadVideo");if(!e)return;const t=e.ruploadVideo.bind(e);e.ruploadVideo=async(...e)=>{await this._call("stripVideoMetadata",e),await this._call("addMusic",e);const o=await this._call("splitStoryIntoChunks",e,t);return o||t(...e)}},_interceptUploadPhoto:async function(){const e=await Fe("PolarisAPIRuploadPhoto");if(!e)return;const t=e.ruploadPhoto.bind(e);e.ruploadPhoto=async(...e)=>{const o=await this._call("uploadCoversForStoryChunks",e,t);return o||t(...e)}},_call:async function(e,...t){const o=this._interceptors[e];if(o)return o(...t);console.error(`[$igInterceptor] unable to find "${e}" interceptor`)}};var Ne=Oe;const He={maxStoryVideoDuration:60.9*E.time.SECOND,init:async function(){this._chunks=[],this._patchStoryVideoUpload(),this._patchStoryCoverUpload(),this._patchStoryPublishing()},_requireHttp:async function(){const e=await Me("http:story-assist");return Me.unlockOnNextTick("http"),e},_isStoryCreationPage:function(){return location.href.includes("/create/story")},_patchStoryVideoUpload:function(){Ne.define("splitStoryIntoChunks",(async(e,t)=>{if(!this._isStoryCreationPage())return;const o=e[0];if(o.uploadMediaDurationMs<=this.maxStoryVideoDuration)return void(this._chunks=[]);this._log("splitting video into chunks...");const n=await we.send("story-assist.split-story-video",o.file);let i;this._log(`created ${n.length} chunks`),this._chunks=[];for(const e of n){this._log(`uploading chunk #${this._chunks.length+1}`);const n=URL.createObjectURL(e),r=String(Date.now()),a=await E.loadVideoMetadata(n),s={...o,file:e,dataURL:n,uploadId:r,uploadMediaDurationMs:1e3*a.duration,entityName:`story_${r}`};i=await t(s),this._chunks.push(s),this._log("ig response",i)}return i}))},_patchStoryCoverUpload:function(){Ne.define("uploadCoversForStoryChunks",(async(e,t)=>{if(!this._isStoryCreationPage())return;if(0===this._chunks.length)return;let o;for(const n of this._chunks){this._log(`uploading cover for chunk #${this._chunks.indexOf(n)+1}`);const i=await this._takeFirstFrame(n.dataURL);o=await t({...e[0],file:i,dataURL:URL.createObjectURL(i),uploadId:n.uploadId,entityName:n.entityName}),this._log("ig response",o)}return o}))},_patchStoryPublishing:async function(){const e=await this._requireHttp(),t=e.post.bind(e);e.post=async(...e)=>{if(!e[0].includes("/create/configure_to_story"))return t(...e);if(0===this._chunks.length)return t(...e);let o;for(const n of this._chunks)this._log(`publishing chunk #${this._chunks.indexOf(n)+1}`),o=await t(e[0],{...e[1],upload_id:n.uploadId,...n!==this._chunks[0]&&{reel_mentions:null}}),this._log("ig response",o);return o}},_takeFirstFrame:async function(e){const t=document.createElement("video");t.src=e,t.muted=!0,t.preload="metadata",t.currentTime=.01,await new Promise((e=>t.onloadedmetadata=e)),await new Promise((e=>t.ontimeupdate=e));const o=document.createElement("canvas"),n=o.getContext("2d");o.width=t.videoWidth,o.height=t.videoHeight;return await new Promise((e=>{n.drawImage(t,0,0),o.toBlob((t=>e(t)),"image/jpeg")}))},_log:function(...e){console.log(`[story assist splitter] ${e[0]}`,...e.slice(1))}},{$:ze}=E;var Ve={controller:{init:async function(){this._sel=Se.controller.getConfig().igSelectors,this._updateStyles(),this._manageToggleButton(),this._addMentionsToRequest(),this._hideStoryAssistPanelOnSubmit(),this._notifyStoryCover(),this._manageTrial(),this._hidden=!0,He.init()},getMentions:async function(){return(await we.send("story-assist.get-mentions")).map((e=>({user_id:e.id})))},_updateStyles:function(){E.insertMultistyle`
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
    `},_manageToggleButton:function(){let e;const t=Symbol();E.onDocMutations((()=>{const o=ze(this._sel.storyCreation.videoHeader),n=ze(this._sel.storyCreation.photoControls),i=o||n;if(!i)return;if(i[t])return;i[t]=!0;const r=!!o;i.insertAdjacentHTML("beforeend",`\n        <div\n          class="\n            StoryAssistToggleButton\n            ${this._hidden?"StoryAssistToggleButton_hidden":""}\n            ${r?"StoryAssistToggleButton_video":"StoryAssistToggleButton_photo"}\n          ">\n          <svg class="StoryAssistToggleButton__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384.97 384.97">\n            <path d="M12.03 84.212h360.909c6.641 0 12.03-5.39 12.03-12.03 0-6.641-5.39-12.03-12.03-12.03H12.03C5.39 60.152 0 65.541 0 72.182c0 6.641 5.39 12.03 12.03 12.03zM372.939 180.455H12.03c-6.641 0-12.03 5.39-12.03 12.03s5.39 12.03 12.03 12.03h360.909c6.641 0 12.03-5.39 12.03-12.03s-5.389-12.03-12.03-12.03zM372.939 300.758H12.03c-6.641 0-12.03 5.39-12.03 12.03 0 6.641 5.39 12.03 12.03 12.03h360.909c6.641 0 12.03-5.39 12.03-12.03.001-6.641-5.389-12.03-12.03-12.03z" fill="currentColor"/>\n          </svg>\n        </div>\n      `),e=ze(".StoryAssistToggleButton"),e.addEventListener("click",(()=>{we.send("story-assist.toggle")}))})),we.on("story-assist.panel-toggled",(t=>{this._hidden=t,e&&e.classList.toggle("StoryAssistToggleButton_hidden",this._hidden)})),E.insertMultistyle`
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
    `},_addMentionsToRequest:async function(){const e=await Me("http");if(!e)return;const t=e.post.bind(e);e.post=async(...e)=>(await(async()=>{if(!e[0].includes("/create/configure_to_story"))return;const t=await this.getMentions();0!==t.length&&(e[1].reel_mentions=JSON.stringify(t))})(),t(...e))},_hideStoryAssistPanelOnSubmit:function(){const e=Symbol();E.onDocMutations((()=>{const t=ze(this._sel.storyCreation.submitButton);t&&(t[e]||(t[e]=!0,t.addEventListener("click",(()=>{we.send("story-assist.toggle",!1)}))))}))},_notifyStoryCover:async function(){const e=await Me("store");if(!e)return;let t;e.subscribe((()=>{var o,n;const i=null===(o=e.getState().storyCreation)||void 0===o||null===(n=o.coverPhoto)||void 0===n?void 0:n.dataURL;t!==i&&(t=i,we.send("story-assist.cover-change",i))}))},_manageTrial:async function(){let e;const t=Symbol();E.onDocMutations((()=>{if(!!!ze(this._sel.storyCreation.video))return;const o=ze(this._sel.storyCreation.submitButton);o&&(o[t]||(o[t]=!0,o.addEventListener("click",(async t=>{e||(t.preventDefault(),t.stopPropagation(),e=await we.send("story-assist.has-pro"),e?o.click():we.send("story-assist.show-upsell"))}),!0)))}))}}};const Ue=window.storyMentionsContentScript;var We={init:async function(){je=Se.controller.getConfig().igSelectors,Ge=await Me("http"),qe=await Me("store"),Ue.onStoryCreationReduce((e=>{"STORY_CREATION_SESSION_STARTED"===e.type&&(Ye={mentions:[],inputSize:{width:0,height:0},activeMention:null})})),function(){const e=Symbol("handled");E.onDocMutations((()=>{const t=E.$(je.storyCreation.topRightButtonsContainer);if(!t)return;if(t[e])return;t[e]=!0,"v1"===window.inssist.igBundleVersion?t.insertAdjacentHTML("afterbegin",'\n        <button class="story-add-mention-button">\n          @\n        </button>\n      '):t.insertAdjacentHTML("afterbegin",'\n        <button class="PolarisStoryImageCreationContainer story-add-mention-button">\n          @\n        </button>\n      ');E.$(".story-add-mention-button").addEventListener("click",(()=>{qe.dispatch({type:"STORY_CREATION_ENTER_ADD_TEXT"}),qe.dispatch({type:"STORY_CREATION_CHANGE_TEXT",rawText:"@",width:21.71875,height:22}),qe.dispatch({type:"SEARCH_QUERY_CLEARED"});const e=E.$(je.storyCreation.textInput);e.textContent="@";const t=document.getSelection(),o=document.createRange();o.setStart(e,1),o.setEnd(e,1),t.removeAllRanges(),t.addRange(o)}))})),E.insertMultistyle`
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
  `}(),function(){const e=Symbol("listenerAdded");E.onDocMutations((()=>{const t=E.$(je.storyCreation.textInput);t&&(Ye.inputSize.width=t.offsetWidth,Ye.inputSize.height=t.offsetHeight,t[e]||(t[e]=!0,t.addEventListener("input",(()=>{Ye.inputSize.width=t.offsetWidth,Ye.inputSize.height=t.offsetHeight}))))}))}(),function(){const e=Symbol("handled");E.onDocMutations((()=>{const t=E.$(je.storyCreation.mentionReel);t&&(t[e]||(t[e]=!0,E.smartHorizontalScroll.init(t)))})),E.onDocClick((e=>{const t=e.target.closest(je.storyCreation.mentionReelItem);if(!t)return;const o=E.$(je.storyCreation.textInput);if(!o)return;const n=`@${t.innerText}`;o.textContent=n;const i=o.getBoundingClientRect();qe.dispatch({type:"STORY_CREATION_CHANGE_TEXT",width:i.width,height:i.height,rawText:n}),qe.dispatch({type:"STORY_CREATION_SAVE_TEXT",renderText:[n],timeSpent:5e3})})),E.insertMultistyle`
    <style>
      ${je.storyCreation.mentionReelItem} {
        cursor: pointer;
      }

      ${je.storyCreation.textInput} {
        position: relative;
        top: 20px;
      }
    </style>
  `}(),Ue.onStoryCreationReduce(((e,t)=>{if("STORY_CREATION_SAVE_TEXT"!==e.type)return;if(1!==e.renderText.length)return;if(!e.renderText[0].startsWith("@"))return;const o=e.renderText[0].replace("@","");if(Ye.activeMention)Object.assign(Ye.activeMention,{username:o,width:Ye.inputSize.width,height:Ye.inputSize.height});else{const e=t.canvasStickers.find((e=>e.rawText===`@${o}`));if(!e)return;Ye.mentions.push({username:o,x:e.x,y:e.y,width:Ye.inputSize.width,height:Ye.inputSize.height})}})),Ue.onStoryCreationReduce(((e,t)=>{if("STORY_CREATION_CHANGE_STICKER_ORDER"!==e.type)return;const o=e.bumpIndex,n=t.canvasStickers[o];if(n&&n.rawText&&n.rawText.startsWith("@")){const e=n.rawText.replace("@",""),t=Ye.mentions.find((t=>t.username===e));Ye.activeMention=t||null}else Ye.activeMention=null})),Ue.onStoryCreationReduce((e=>{"STORY_CREATION_ENTER_ADD_TEXT"===e.type&&(Ye.activeMention=null)})),Ue.onStoryCreationReduce((e=>{"STORY_CREATION_MOVE_CANVAS_STICKER"===e.type&&Ye.activeMention&&(Ye.activeMention.x+=e.deltaX,Ye.activeMention.y+=e.deltaY)})),Ue.onStoryCreationReduce((e=>{"STORY_CREATION_DELETE_CANVAS_STICKER"===e.type&&Ye.activeMention&&E.removeFromArray(Ye.mentions,Ye.activeMention)})),function(){if(!Ge)return;const e=Ge.post;Ge.post=(...t)=>(t[0].includes("/create/configure_to_story")&&Ye.mentions.length>0&&(t[1]={...t[1],reel_mentions:JSON.stringify(Xe())}),e.call(Ge,...t))}()},getMentions:Xe};let je,Ge,qe,Ye={mentions:[],inputSize:{width:0,height:0},activeMention:null};function Xe(){const e=e=>Math.round(1e4*e)/1e4;return Ye.mentions.map((t=>{const o=JSON.parse(JSON.stringify(qe.getState())).users.usernameToId[t.username];if(!o)return null;const n=E.$(je.storyCreation.root)||document.body;return{user_id:o,x:e(Math.max(0,t.x/n.offsetWidth)),y:e(Math.max(0,t.y/n.offsetHeight)),width:e(t.width/n.offsetWidth),height:e(t.height/n.offsetHeight),rotation:0}})).filter(Boolean)}var Ke={controller:We};function Je(e,t,{once:o=!1}={}){globalThis.addEventListener(`__event-bus.${e}`,(e=>{const o=e.detail||[];t(...o)}),{once:o})}var Qe={send:function(e,...t){const o=new CustomEvent(`__event-bus.${e}`,{detail:t});globalThis.dispatchEvent(o)},on:Je,once:function(e,t){Je(e,t,{once:!0})}},Ze={init:function(){et=Se.controller.getConfig().igSelectors,tt=document.documentElement,function(){const e=Symbol("handled");E.onDocMutations((()=>{const t=E.$(et.postCreation.captionContainer);t&&(t[e]||(t[e]=!0,t.insertAdjacentHTML("afterend",nt())))}))}(),tt.addEventListener("click",(e=>{const t=e.target.closest(".new-post-extra__button-cancel"),o=e.target.closest(".new-post-extra__button");if(!o)return;const n=o.dataset.option;t?we.send("new-post-extra.cancel-click",n):we.send("new-post-extra.option-click",n)})),function(){const e=()=>{const e=E.$(".new-post-extra");if(e){e.outerHTML=nt();{const e=E.$(et.postCreation.submitPostButton);e.originalText||(e.originalText=e.innerText),e.innerText="draft"===ot.laterPillData.date?"Draft":ot.laterPillData.date?"Schedule":e.originalText}}};we.on("new-post-extra.synch-selected-option",(t=>{ot.selectedOption=t,e()})),we.on("new-post-extra.update-pill-music",(({name:t})=>{ot.musicPillData.name=t,e()})),we.on("new-post-extra.update-pill-cover",(({hasCover:t})=>{ot.coverPillData.hasCover=t,e()})),we.on("new-post-extra.update-pill-later",(({date:t,dateStr:o})=>{ot.laterPillData.date=t,ot.laterPillData.dateStr=o,e()}))}(),async function(){const e=await Me("store");if(!e)return;let t=null;e.subscribe((()=>{var o;const n=null===(o=e.getState().creation)||void 0===o?void 0:o.sourceVideo,i=n&&n.dataURL||null;t!==i&&(tt.classList.toggle("new-post-extra--video",!!i),t=i,i&&we.send("new-post-extra.creation-video-change",i))}))}(),async function(){Qe.on("ig.creation-session-start",(()=>{ot.musicPillData={name:null},ot.coverPillData={hasCover:!1}}))}(),async function(){const e=await Me("store");if(!e)return;let t=!1;E.onDocMutations((()=>{const o=!!E.$(et.postCreation.captionTextarea);if(t!==o)if(t=o,t){const t=e.getState(),o=!!E.$(et.postCreation.previewPostTypeIcon)?E.safe((()=>t.creation.sourceVideo.uploadMediaDurationMs),0):0;we.send("new-post-extra.enter-page",{videoDurationMs:o})}else we.send("new-post-extra.exit-page")}))}(),E.insertMultistyle`
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
  `},getCtx:function(){return ot}};let et,tt;const ot={selectedOption:null,musicPillData:{name:null},coverPillData:{hasCover:!1},laterPillData:{date:null,dateStr:null}};function nt(){const e='\n    <svg\n      class="new-post-extra__button-chevron-icon"\n      xmlns="http://www.w3.org/2000/svg"\n      width="7.5"\n      height="12.357"\n      viewBox="0 0 7.5 12.357">\n      <path d="M7.301 6.659l-5.5 5.5a.679.679 0 01-.961 0l-.641-.641a.679.679 0 010-.959l4.358-4.38L.198 1.8a.679.679 0 010-.959L.839.2A.679.679 0 011.8.2l5.5 5.5a.679.679 0 01.001.959z" fill="currentColor"/>\n    </svg>\n  ',t='\n    <div class="new-post-extra__button-cancel">\n      <svg width="8" height="8" viewBox="0 0 8 8">\n        <path d="M6.5-.001 4 2.499l-2.5-2.5-1.5 1.5 2.5 2.5-2.5 2.5 1.5 1.5 2.5-2.5 2.5 2.5 1.5-1.5-2.5-2.5 2.5-2.5Z" fill="currentColor"/>\n      </svg>\n    </div>\n  ';return`\n    <div class="new-post-extra">\n      \x3c!-- add music --\x3e\n      <button\n        class="\n          new-post-extra__button\n          ${ot.musicPillData.name?"new-post-extra__button_can-cancel":""}\n          ${"music-assist"===ot.selectedOption?"new-post-extra__button_selected":""}\n        "\n        data-option="music-assist">\n        <div class="new-post-extra__button-pill">\n          <svg class="new-post-extra__button-icon" viewBox="0 0 24 24">\n            <path d="M0 0h24v24H0Z" fill="none"/>\n            <path d="M18.5 5.438a.937.937 0 0 0-1.22-.893L7.906 7.313a.937.937 0 0 0-.656.893v7.658a4.052 4.052 0 0 0-.937-.115c-1.554 0-2.813.84-2.813 1.875s1.259 1.877 2.812 1.877 2.812-.839 2.812-1.875v-6.847l7.5-2.2v5.41a4.052 4.052 0 0 0-.937-.115c-1.553 0-2.812.839-2.812 1.875s1.259 1.875 2.812 1.875 2.813-.839 2.813-1.875V5.438Z" fill="currentColor"/>\n          </svg>\n          <div class="new-post-extra__button-text">\n            ${ot.musicPillData.name||"Add Music"}\n          </div>\n          ${t}\n        </div>\n        ${e}\n      </button>\n\n      \x3c!-- change cover --\x3e\n      <button\n        class="\n          new-post-extra__button\n          ${ot.coverPillData.hasCover?"new-post-extra__button_can-cancel":""}\n          ${"cover-assist"===ot.selectedOption?"new-post-extra__button_selected":""}\n        "\n        data-option="cover-assist">\n        <div class="new-post-extra__button-pill">\n          <svg class="new-post-extra__button-icon" viewBox="0 0 24 24">\n            <path d="M0 0h24v24H0Z" fill="none"/>\n            <path d="M6 19.5A1.5 1.5 0 0 1 4.5 18V6A1.5 1.5 0 0 1 6 4.5h12A1.5 1.5 0 0 1 19.5 6v12a1.5 1.5 0 0 1-1.5 1.5Zm10.055-1.4h2.021v-2.02l-4.037-4.037 2.016-2.021 2.021 2.021V5.986H5.962v6.057l2.021-2.021Z" fill="currentColor"/>\n          </svg>\n          <div class="new-post-extra__button-text">\n            ${ot.coverPillData.hasCover?"Custom Cover":"Change Cover"}\n          </div>\n          ${t}\n        </div>\n        ${e}\n      </button>\n\n      \x3c!-- post later --\x3e\n      <button\n        class="\n          new-post-extra__button\n          ${ot.laterPillData.dateStr?"new-post-extra__button_can-cancel":""}\n          ${"later"===ot.selectedOption?"new-post-extra__button_selected":""}\n        "\n        data-option="later">\n        <div class="new-post-extra__button-pill">\n          <svg class="new-post-extra__button-icon" viewBox="0 0 24 24">\n            <path d="M0 0h24v24H0Z" fill="none"/>\n            <path d="M11.407 19.958a8.271 8.271 0 0 1-.819-.125c-.266-.054-.532-.123-.791-.2s-.511-.173-.758-.277a8.274 8.274 0 0 1-4.39-4.39c-.1-.247-.2-.5-.277-.758s-.149-.525-.2-.791a8.282 8.282 0 0 1-.125-.819 8.377 8.377 0 0 1 0-1.687 8.282 8.282 0 0 1 .125-.819c.054-.266.123-.532.2-.791s.173-.511.277-.758a8.274 8.274 0 0 1 4.39-4.39c.247-.1.5-.2.758-.277s.525-.149.791-.2a8.27 8.27 0 0 1 .819-.125 8.374 8.374 0 0 1 1.687 0 8.269 8.269 0 0 1 .819.125c.266.054.532.123.791.2s.511.173.758.277a8.274 8.274 0 0 1 4.39 4.39c.1.247.2.5.277.758s.149.525.2.791a8.282 8.282 0 0 1 .125.819 8.377 8.377 0 0 1 0 1.687 8.282 8.282 0 0 1-.125.819c-.054.266-.123.532-.2.791s-.173.511-.277.758a8.274 8.274 0 0 1-4.39 4.39c-.247.1-.5.2-.758.277s-.525.149-.791.2a8.27 8.27 0 0 1-.819.125 8.373 8.373 0 0 1-1.687 0Zm-.48-14.641a6.531 6.531 0 0 0-2.348.988A6.586 6.586 0 0 0 6.2 9.194a6.534 6.534 0 0 0-.383 1.233 6.63 6.63 0 0 0 0 2.647 6.531 6.531 0 0 0 .988 2.348 6.586 6.586 0 0 0 2.889 2.379 6.532 6.532 0 0 0 1.233.383 6.63 6.63 0 0 0 2.647 0 6.531 6.531 0 0 0 2.348-.988 6.586 6.586 0 0 0 2.379-2.889 6.535 6.535 0 0 0 .383-1.233 6.63 6.63 0 0 0 0-2.647 6.53 6.53 0 0 0-.988-2.348A6.586 6.586 0 0 0 14.807 5.7a6.534 6.534 0 0 0-1.233-.383 6.631 6.631 0 0 0-2.647 0Zm.907 8.241a1.047 1.047 0 0 1-1.011-1.011v-3.4a.965.965 0 1 1 1.93 0v2.476h1.2a.965.965 0 0 1 0 1.93Z" fill="currentColor"/>\n          </svg>\n          <div class="new-post-extra__button-text">\n            ${ot.laterPillData.dateStr||"Post Later"}\n          </div>\n          ${t}\n        </div>\n        ${e}\n      </button>\n\n      \x3c!-- hashtag assistant --\x3e\n      <button\n        class="\n          new-post-extra__button\n          ${"tag-assist"===ot.selectedOption?"new-post-extra__button_selected":""}\n        "\n        data-option="tag-assist">\n        <div class="new-post-extra__button-pill">\n          <svg class="new-post-extra__button-icon" viewBox="0 0 24 24">\n            <path d="M0 0h24v24H0Z" fill="none"/>\n            <path d="M16.013 13.928h2.934v2.46h-3.228L15.268 20h-2.551l.451-3.611H9.851L9.399 20H6.871l.451-3.611H4.366v-2.461h3.25l.47-3.656H5.133v-2.46h3.253L8.835 4.2h2.528l-.451 3.611h3.318l.456-3.611h2.528l-.451 3.611h2.934l.023 2.46h-3.25Zm-2.551 0 .474-3.656h-3.318l-.474 3.656Z" fill="currentColor"/>\n          </svg>\n          <div class="new-post-extra__button-text">\n            Hashtag Assistant\n          </div>\n          ${t}\n        </div>\n        ${e}\n      </button>\n    </div>\n  `}var it={controller:Ze},rt={};rt.controller={init:function(){this._sel=Se.controller.getConfig().igSelectors,this._handleLaterSaveForStory(),this._handleSubmit(),we.on("later.get-post-info",this._getPostInfoSafe.bind(this))},_handleLaterSaveForStory:function(){const e=Symbol("text");we.on("new-post-extra.update-pill-later",(({dateStr:t})=>{const o=E.$(this._sel.storyCreation.submitButton),n=E.$(this._sel.storyCreation.submitButtonText);if(!o||!n)return;n[e]||(n[e]=n.innerText);const i=t||n[e];i!==n.innerText&&(n.innerText=i,o.style.setProperty("transition","all 150ms ease","important"),o.style.setProperty("scale","1.15","important"),setTimeout((()=>{o.style.removeProperty("scale"),setTimeout((()=>{o.style.removeProperty("transition")}),150)}),150))}))},_handleSubmit:function(){const e=Symbol("text"),t=Symbol("handled");E.onDocMutations((()=>{const o=E.$(this._sel.postCreation.submitPostButton),n=o,i=E.$(this._sel.storyCreation.submitButton),r=E.$(this._sel.storyCreation.submitButtonText),a=o||i,s=n||r;if(!a&&!s)return;if(a[t])return;a[t]=!0;let l=!1;a.addEventListener("click",(async t=>{let o=it.controller.getCtx().laterPillData.date;if(!o)return;if("draft"===o&&(o=null),l)return;l=!0,t.preventDefault(),t.stopPropagation();const n=!o,r=!!i;s[e]||(s[e]=s.innerText),s.innerText=n?"Saving...":"Scheduling...",a.style.setProperty("pointer-events","none","important"),r?a.style.setProperty("opacity","0.9","important"):a.style.setProperty("color","#C1C1C1","important"),await E.sleep(1500);if(await we.send("later.saveCurrentPost",o))return void(l=!1);alert(n?"Failed to save post as draft":"Failed to schedule post"),a.style.removeProperty("color"),a.style.removeProperty("opacity"),a.style.removeProperty("pointer-events"),s.innerText=s[e],l=!1}))}))},_getPostInfoSafe:async function(){let e;try{e=await this._getPostInfo()}catch(e){return console.error("[$later] Failed to get post info",e),null}return!(!e.blob||e.isVideo&&!e.coverBlob)?e:(console.error("[$later] Invalid post",e),null)},_getPostInfo:async function(){var e,t;const o=(await Me("store")).getState(),n=o.navigation.pageIdentifier.toLowerCase().startsWith("story"),i=n?!!(null===(e=o.storyCreation.sourceVideo)||void 0===e?void 0:e.file):!!(null===(t=o.creation.sourceVideo)||void 0===t?void 0:t.file);return n&&i?{type:"story",isVideo:!0,blob:o.storyCreation.sourceVideo.file,mentions:await Ve.controller.getMentions(),coverBlob:o.storyCreation.coverPhoto.file}:n?{type:"story",isVideo:!1,blob:await this._getStoryImage(o),mentions:Ke.controller.getMentions()}:Le.controller.isCreatingReels()?{type:"reel",isVideo:!0,blob:o.creation.sourceVideo.file,caption:o.creation.finalizedMedia.caption||"",location:this._getPostLocation(o),mentions:this._getPostMentions(o),coverBlob:o.creation.coverPhoto.file,shareToFeed:Le.controller.isShareToFeed()}:i?{type:"post",isVideo:!0,blob:o.creation.sourceVideo.file,caption:o.creation.finalizedMedia.caption||"",location:this._getPostLocation(o),mentions:this._getPostMentions(o),coverBlob:o.creation.coverPhoto.file}:{type:"post",isVideo:!1,blob:o.creation.stagedImage.blob,caption:o.creation.finalizedMedia.caption||"",location:this._getPostLocation(o),mentions:this._getPostMentions(o),coverBlob:null}},_getStoryImage:async function(e){const t=E.$$("canvas");if(0===t.length)return null;const o=Math.max(e.storyCreation.sourceImage.width,t[0].width),n=Math.max(e.storyCreation.sourceImage.height,t[0].height),i=document.createElement("canvas");i.width=o,i.height=n;const r=i.getContext("2d");for(const e of t)r.drawImage(e,0,0,e.width,e.height,0,0,o,n);return await new Promise((e=>{i.toBlob(e,"image/jpeg",1)}))},_getPostLocation:function(e){const t=e.creation.finalizedMedia.geoTag||null;return t?{lat:t.lat,lng:t.lng,facebook_places_id:t.external_id}:null},_getPostMentions:function(e){var t;const o=(null===(t=e.creation.finalizedMedia.usertags)||void 0===t?void 0:t.toJS())||null;return o?{in:Object.values(o).map((e=>{const t=e.position||[];return{user_id:e.userId,...t.length>0&&{position:t}}}))}:null}},Se.getConfig=()=>{const e=c.get("fusion.config");return e&&e.version>=Se.config.version?e:Se.config},Se.controller={getConfig:function e(){const t=e;if(!t.config){const e=s.getParams();t.config=e.fusionConfig}return t.config}},Se.config={version:128,dmSelectors:{general:{reactRoot:["#react-root",'[id^="mount"]'],page:[".t30g8",".PolarisDirectShell._a9-0","section.PolarisBaseShell > ._a9-0","section.PolarisBaseShell > ._aa5f"],header:["._lz6s",".PolarisDesktopNav._acum"],main:[".x14k21rp"],iconButton:[".wpO6b","._abl-"],blueButton:[".y3zKF:not(.yWX7d)",".PolarisIGCoreButton:not(._acao)"],postActionsTooltip:[".eeDIk","._a3gq ._acqw"],postActionsTooltipMe:[".AeyYE","._a3gq ._acqx"],postActionsTooltipPeer:[".DgKgc","._a3gq ._acqy"],postActionsTooltipTail:["._18Jen","._a3gq ._abwl"],errorReportPixel:'body > img[src*="Error"]',mediaViewerContainer:['.RnEpo [role="dialog"] [style*="max-width"][style*="max-height"] > div','.BaseDialog [role="dialog"] [style*="max-width"][style*="max-height"] > div'],mediaViewerImage:['.RnEpo [role="dialog"] [style*="max-width"][style*="max-height"] img','.BaseDialog [role="dialog"] [style*="max-width"][style*="max-height"] img'],mediaViewerVideo:['.RnEpo [role="dialog"] [style*="max-width"][style*="max-height"] video','.BaseDialog [role="dialog"] [style*="max-width"][style*="max-height"] video'],writeBar:[".HcJZg .X3a-9",".PolarisDirectComposer._acrb"],addMediaButton:[".X3a-9 div + .wpO6b",".PolarisDirectComposer > button:nth-of-type(1)"],textarea:[".X3a-9 textarea",".PolarisDirectComposer textarea"],messageBody:[".hjZTB",".PolarisIGCoreText._aadf"],emojiPicker:["._01UL2",".PolarisIGCorePopover._aa61"],postPreview:[".z82Jr",".PolarisDirectMessageMediaShare._acfr"],postViewerModal:["._Yhr4"],portal:".BasePortal",threadHeader:[".PolarisDirectThreadViewHeader > .PolarisGenericDesktopHeader"],threadDetailsHeader:[".PolarisDirectThreadView > .PolarisGenericDesktopHeader"],threadDetailsMuteSection:[".PolarisDirectThreadDetailsView > div:first-child"],content:["section.PolarisRefreshedBaseShell"],navigation:[".createKeyCommandWrapper > .PolarisNavigation"],accountSwitcher:[".PolarisGenericDesktopHeader._aa4o"]},leftPanel:{header:[".oNO81 .S-mcP",".PolarisDesktopDirectPage._aa5c .PolarisGenericDesktopHeader._aa4j"],subheaderWhenNoFolders:[".oNO81 .iHqQ7",".PolarisDesktopDirectPage._aa5c ._abbz"],switchAccountButton:[".oNO81 .S-mcP .m7ETg button",".PolarisDesktopDirectPage._aa5c .PolarisIGCoreBox > button"],newMessageButton:[".oNO81 .S-mcP .EQ1Mr button",".PolarisDesktopDirectPage._aa5c button._abm2"],tabsContainer:[".emXTk > div:first-child",".PolarisDesktopDirectPage > div.PolarisDirectInboxTabbedHeader > div:first-child"],folderTab:[".k8Vux","nav.PolarisDirectInboxTabbedHeader > div"],folderTabGeneral:[".k8Vux:nth-child(2)","nav.PolarisDirectInboxTabbedHeader > div:nth-child(2)"],folderTabsContainer:['.emXTk [style*="60%"]','.PolarisDirectInboxTabbedHeader [style*="60%"]'],requestsDescription:[".tHaIX",".PolarisDirectPendingRequests > div:first-child"],requestsTab:[".jCRms",'.PolarisDirectInboxTabbedHeader [style*="40%"] > span'],requestsTabText:["h5.gtFbE",".PolarisDirectInboxTabbedHeader h5"],requestsTabContainer:['.emXTk [style*="40%"]','.PolarisDirectInboxTabbedHeader [style*="40%"]'],conversationItemWrapSkeleton:['.PolarisDirectInboxList > div > div[data-visualcompletion="loading-state"]'],conversationItem:[".-qQT3",".rOtsg",".PolarisDirectInboxList > div > .PolarisIGCoreBox._ab99 > *:first-child"],conversationUnreadDot:[".Sapc9",'._ab8n[style*="height: 8px"]'],threadListWrap:[".N9abW",".PolarisIGVirtualList.PolarisDirectInboxList"],threadList:[".N9abW > div",".PolarisIGVirtualList.PolarisDirectInboxList > div"],threadListSpinner:[".N9abW .HVWg4",".PolarisIGVirtualList.PolarisDirectInboxList > div > ._ab9h"]},dialog:{root:[".RnEpo",'.BasePortal[style]:not([style*="display: none"]) .createKeyCommandWrapper > .BaseDialog'],background:".BaseCometModal > .BaseCometModal",window:['.RnEpo [role="dialog"]','.createKeyCommandWrapper > .BaseDialog .IGDSDialog[role="dialog"]'],header:[".CpMFL .S-mcP",".PolarisDirectThreadViewHeader > .PolarisGenericDesktopHeader"],searchRow:['.RnEpo [role="dialog"] .TGYkm',".PolarisDirectSearchUserContainer._aag-"],searchRowLabel:['.RnEpo [role="dialog"] .TGYkm .BI4qX',".PolarisDirectSearchUserContainerTokenField > .PolarisIGCoreBox"],submitButton:[".RnEpo button.cB_4K",".PolarisIGCoreModalHeader .PolarisIGCoreButton"],mediaViewerCloseButton:[".RnEpo ._5AwC2",".IGDSDialog .ped7jm3c"]}},igSelectors:{general:{reactRoot:["#react-root",'[id^="mount"]'],root:["#react-root > section","#react-root > div > div > section","section.PolarisBaseShell","section.PolarisRefreshedBaseShell"],rootNewNavDesign:["section.PolarisRefreshedBaseShell"],content:["#react-root > section > *:nth-child(2)","main.PolarisShellContent","main.PolarisRefreshedShellContent"],contentSection:["main.PolarisShellContent > section","main.PolarisRefreshedShellContent > section"],header:["._9ezyW","header.PolarisGenericMobileHeader"],headerContent:[".b5itu","header.PolarisGenericMobileHeader ._ab16"],headerTitle:[".K3Sf1","h1.PolarisGenericMobileHeader"],footer:[".PolarisShellFooter"],main:[".uzKWK",".PolarisBaseShell main.PolarisShellContent._a996",".PolarisRefreshedBaseShell main"],pageLayoutNewNavDesign:[".PolarisPageLayoutHandler"],nextPageLoaderProfile:["._4emnV",".PolarisVirtualPostsGrid._aanh"],nextPageLoaderExplore:['html[data-page="exploreLandingPage"] .Id0Rh','html[data-page="exploreLandingPage"] .PolarisGenericVirtualFeed._aalg'],nextPageLoaderFeed:['html[data-page="feedPage"] .Id0Rh','html[data-page="feedPage"] .PolarisGenericVirtualFeed._aalg'],creationPopup:[".PolarisMobileCreationNavItem ._aa5x",".PolarisMobileCreationNavItem ._ad8j",".PolarisMobileCreationNavItem ._aa5-",".IGDSPopover:has(.PolarisMobileCreationMenuContent)",".PolarisMobileCreationMenuContent"],creationPopupPostButton:['.PolarisMobileCreationNavItem ._aa5x [role="button"]:first-child','.PolarisMobileCreationNavItem ._ad8j [role="button"]:first-child','.PolarisMobileCreationNavItem ._aa5- [role="button"]:first-child','.PolarisMobileCreationMenuContent [role="button"]:first-child'],creationPopupStoryButton:['.PolarisMobileCreationNavItem ._aa5x [role="button"]:last-child','.PolarisMobileCreationNavItem ._ad8j [role="button"]:last-child','.PolarisMobileCreationNavItem ._aa5- [role="button"]:last-child','.PolarisMobileCreationMenuContent [role="button"]:last-child'],tabBar:[".KGiwt",".PolarisNavigation > ._abpb",'.PolarisNavigation[style*="transform"]',".xaeubzz"],tabBarWrap:[".ZoygQ",".IGDSBox > .PolarisNavigation",".createKeyCommandWrapper > .PolarisNavigation"],tabBarContainer:[".IGDSBox > .PolarisNavigation > div",".createKeyCommandWrapper .PolarisNavigation > div[class]"],tabBarTopContainer:[".IGDSBox:has(> .createKeyCommandWrapper)"],tabBarInput:[".ZoygQ input",".PolarisNavigation input.PolarisImageFileForm"],tabBarCreatePostInput:[".PolarisMobileCreationNavItem > form:last-child > input"],tabBarButton:['.PolarisNavigation[style*="transform"] > div',".xaeubzz > div"],tabBarCreatePostButton:["._0TPg",".BvyAW > div:nth-child(3)",'[data-testid="new-post-button"]',".PolarisMobileNavLoggedIn._abp8",".PolarisMobileNavLoggedIn > div:nth-child(3)",'.PolarisNavigation[style*="transform"] > div:nth-child(3)',".xaeubzz > div:nth-child(3)"],tabBarCreatePostButtonLink:['[data-testid="new-post-button"] a',".PolarisMobileNavLoggedIn._abp8 a",".PolarisMobileNavLoggedIn > div:nth-child(3) a",'.PolarisNavigation[style*="transform"] > div:nth-child(3) a',".xaeubzz > div:nth-child(3) a"],tabBarCreatePostIconOldNavDesign:[".PolarisMobileNavLoggedIn > svg"],tabBarAvatarContainer:[".PolarisMobileNavLoggedInButton span.PolarisUserAvatar"],storyTrayViewerAvatarContainer:[".PolarisStoryTray .PolarisStoryTray._aauk:first-child span.PolarisUserAvatar"],tabBarLink:[".PolarisMobileNavLoggedIn a",'.PolarisNavigation[style*="transform"] a',".createKeyCommandWrapper .PolarisNavigationItem a"],storyFooter:[".mLi3m","footer.PolarisMobileStoriesFooter","footer.PolarisMobileOwnerStoriesOverlay"],storyQuickReactionsBackground:".x4U7z",storyPreviewContainer:[".zGtbP",".PolarisShellContent ._aac4",".PolarisRefreshedShellContent ._aac4"],settingsRectangle:".BvMHM",recommendationsContainer:[".bq3Mi",".tHaIX",".PolarisSuggestedUserFeedUnit"],modal:[".RnEpo",'.PolarisIGCoreModalBackdrop[role="presentation"]'],modalWindow:['.RnEpo [role="dialog"]','.PolarisIGCoreModalBackdrop[role="presentation"] [role="dialog"]'],modalWindowHashtagContent:['.RnEpo [role="dialog"] ._8zyFd'],bottomNotification:".Z2m7o",createStoryHeaderButton:[".mTGkH",".PLytv","button.PolarisFeedPageMobileHeader"],peersPage:'[data-page="followList"]',peersPageHeader:['[data-page="followList"] .b5itu','[data-page="followList"] .PolarisGenericMobileHeader > ._ab16'],peersModalHeader:".HYpXt .eiUFA",storiesBar:[".qf6s4",".PolarisIGVirtualList.PolarisStoryTray"],storiesBarLoadingPanel:[".PolarisFeedLoadingSpinner._ab6o",".PolarisFeedPage ._ab6o"],blueLinkButton:".UP43G",actionSheet:[".xkuux",".PolarisIGCoreModalBackdrop > ._ac7o"],useAppGradientBar:[".xZ2Xk",".PolarisMobileNav + section._aa9n"],actionDialog:[".mt3GC",".IGCoreDialog._a9-z"],actionDialogItem:[".mt3GC .aOOlW",".IGCoreDialog._a9--"],actionDialogWithoutHeader:[".mt3GC:first-child",".IGCoreDialog._a9-z:first-child"],iconButton:[".wpO6b","._abl-"],planeIcon:'[points*="11.698 20.334 22 3.001"]',post:"article[data-post-id]",postThreeDotsButton:[".MEAGs button",".PolarisPostOptionsButtonPicker button"],postVideoContainer:["._5wCQW",".PolarisDeclarativeVideo._ab1c"],publishingBarText:[".o5gub span",".PolarisUploadProgressBar._aaug"],uploadPanel:[".TExId",".PolarisUploadProgressBar._aauh"],uploadPanelText:[".PolarisUploadProgressBar._aaug"],uploadPanelVideoIcon:".TExId .cRc_w",expandVideoButton:"._7zNgw",continueWatchingOverlay:".oNYBg",cookieModalContent:".RnEpo ._74vy-",carouselNavButton:".PolarisSidecar .PolarisHSnapScroll > button",blueButton:"button._acas:not(._acao)",toastMessage:[".PolarisToastWrapper._a999"],postCaption:[".PolarisPostPreviewCommentsPicker ._ab9o > span:last-child > span:first-child"],postCaptionLink:[".PolarisPostPreviewCommentsPicker ._ab9o > span:last-child > span:first-child a"],exceptionDialogOkButton:['.CometExceptionDialog .PressableText[role="button"]'],errorPageContent:["._a3gq ._ab8q"],dialogRoot:[".BasePortal > .BaseView"],postPhotoOverlay:[".PolarisPhoto._aagw"],tryMbsSection:[".PolarisQPBloksRenderer._a9_9"],splashScreen:["body > #splash-screen"]},dragPanel:{root:[".RnEpo.xpORG._9Mt7n",".PolarisIGCoreModalBackdrop > ._ac7o"],handle:[".BHY8D",".PolarisIGCoreSheet._ac7m"],igIcon:".glyphsSpriteApp_Icon_36.u-__7",sendEmailLink:['.-qQT3[href^="mailto:"]','._abm4[href^="mailto:"]','._abm4 [href^="mailto:"]','a.Pressable[target="_top"][href^="mailto:"]'],shareMenuItem:[".RnEpo.xpORG._9Mt7n .-qQT3",".PolarisIGCoreModalBackdrop > ._ac7o ._abm4",".PolarisIGCoreModalBackdrop a.Pressable"]},authScreen:{loginContainer:".rxwpz",loginContainerParagraph:".rxwpz p",loginFormParagraph:".HmktE p",avatar:".rxwpz img",username:['html[data-page="unifiedHome"] .l9hKg','html[data-page="loginPage"] .l9hKg'],footer:['html[data-page="unifiedHome"] footer','html[data-page="loginPage"] footer'],fromFacebookBar:['html[data-page="unifiedHome"] .O1flK','html[data-page="loginPage"] .O1flK']},storyViewer:{root:[".PolarisMobileOwnerStories.PolarisStoriesReel",".PolarisMobileStoriesPage > .PolarisMobileStories","section.PolarisBaseShell > .PolarisMobileStories"],videoPlayer:['.PolarisStoryVideoPlayerWrapper > div[style*="top: 0"]'],avatar:[".PolarisMobileOwnerStories img.PolarisUserAvatar",".PolarisMobileOwnerStoriesOverlay img.PolarisUserAvatar"],time:["time.PwV9z","time.PolarisStoriesHeaderOwner"],pollContainer:".tj63N",pollButtons:".tj63N",pollAnswerDigitOrEmoji:".KUQv0",closeButton:[".kj03O .afkep",".PolarisMobileOwnerStoriesOverlay button:last-child"],prevButton:[".r2nYK",".PolarisMobileStoryEventZone > button:nth-child(2)"],nextButton:["._4sLyX",".PolarisMobileStoryEventZone > button:nth-child(3)"],videoPoster:"img.PolarisStoryVideo",mediaContainer:".PolarisStoryMediaLayout._aa64",image:".PolarisStoryImage img.PolarisStoryImage",video:["video.PolarisStoryVideo",".PolarisMobileStoryViewer video"],viewAsAvatar:[".PolarisStoryMediaLayout img.PolarisUserAvatar"]},storyCreation:{root:["._650Zr",".PolarisStoryCreationPage",'body[data-page="StoryCreationPage"] section.PolarisBaseShell'],canvas:[".PolarisStoryCreationPage canvas",'body[data-page="StoryCreationPage"] canvas'],headerButton:[".PolarisStoryCreationPage header button",'body[data-page="StoryCreationPage"] header button'],textInput:["[contenteditable]",".PolarisStoryCreationTextInput[contenteditable]"],topRightButtonsContainer:[".o4NXM",".PolarisStoryCreationPage header > div.PolarisStoryImageCreationContainer",'body[data-page="StoryCreationPage"] header > div.PolarisStoryImageCreationContainer'],topRightButton:[".o4NXM button",".PolarisStoryCreationPage header > div button",'body[data-page="StoryCreationPage"] header > div button'],downloadButton:['[class*="storiesSpriteDownload"]',".PolarisStoryCreationPage header > div button:nth-child(1)",'body[data-page="StoryCreationPage"] header > div button:nth-child(1)'],mentionBarContainer:[".uPlSl",".PolarisTypeahead.PolarisStoryCreationTextInput"],mentionBar:[".imGmP",".PolarisTypeahead.PolarisStoryCreationTextInput > div"],mentionReel:[".imGmP > div",".PolarisTypeahead.PolarisStoryCreationTextInput > div > div"],mentionReelRow:[".imGmP > div > div",".PolarisTypeahead.PolarisStoryCreationTextInput > div > div > div"],mentionReelItem:["#touch_mention.qOsKV","#touch_mention.PolarisStoryTypeaheadResultsList._acn7"],mentionReelItemName:["#touch_mention.qOsKV .KMpYj","#touch_mention.PolarisStoryTypeaheadResultsList ._acn9"],mentionReelItemAvatar:["#touch_mention.PolarisStoryTypeaheadResultsList img.PolarisStoryTypeaheadResultsList"],videoHeader:["._9o3e0","header.PolarisStoryVideoCreationContainer"],photoControls:[".PolarisStoryImageCreationContainer._aa3f","header.PolarisStoryImageCreationContainer > div:last-child"],videoWrap:["header.PolarisStoryVideoCreationContainer + .PolarisStoryVideoCreationContainer"],video:[".JHXak","video.PolarisStoryVideoCreationContainer"],videoPoster:[".pSeby","video.PolarisStoryVideoCreationContainer + img"],footer:[".GRPvx ~ footer","footer.PolarisStoryCreationShareFooter"],videoPlayButton:[".JHXak ~ .videoSpritePlayButton","div.PolarisStoryVideoCreationContainer > span"],videoCreationExitButton:["header.PolarisStoryVideoCreationContainer > button.PolarisIGCoreIconButton"],submitButton:[".PolarisStoryCreationShareFooter > button"],submitButtonText:[".PolarisStoryCreationShareFooter > button .PolarisStoryCreationShareFooter"],uploadHeader:[".PolarisStoryCreationPage .PolarisSharingProgressModal header",'body[data-page="StoryCreationPage"] .PolarisSharingProgressModal header'],uploadBar:[".PolarisStoryCreationPage .PolarisSharingProgressModal header > div",'body[data-page="StoryCreationPage"] .PolarisSharingProgressModal header > div'],uploadText:[".PolarisStoryCreationPage .PolarisSharingProgressModal header h1",'body[data-page="StoryCreationPage"] .PolarisSharingProgressModal header h1'],textColorPicker:[".PolarisStoryCreationColorPicker.PolarisStoryCreationTextInput"],drawColorPicker:[".PolarisStoryCreationDrawColorPicker.PolarisStoryCreationDrawing"],colorPickerSelectedCircle:["button.PolarisStoryCreationColorPicker > ._aa87","button.PolarisStoryCreationDrawColorPicker > ._aa82"]},explorePage:{nav:['html[data-page="exploreLandingPage"] nav.PolarisShellMobileHeader'],header:"header.PolarisExploreMobileHeader",searchInputPlaceholder:[".PolarisDynamicExplorePageContentWrapper input.PolarisIGCoreSearchInput::placeholder"],searchContainer:[".PolarisDynamicExplorePageContentWrapper > .PolarisIGCoreBox"],search:[".PolarisDynamicExplorePageContentWrapper > .PolarisIGCoreBox > .PolarisIGCoreBox:first-child"],main:["main > .PolarisDynamicExplorePageContentWrapper"],content:[".mJ2Qv",".PolarisDynamicExplorePageSharedContent",".PolarisDynamicExplorePageContentWrapper"],contentInner:[".K6yM_",".PolarisDynamicExplorePageSharedContent > *",".PolarisDynamicExplorePageContentWrapper > *"],post:[".pKKVh",".PolarisDynamicExploreSectionalItem"],searchResults:[".gJlPN",".PolarisDynamicExplorePageSharedContent > .PolarisSearchResultsList",".PolarisDynamicExplorePageContentWrapper > .PolarisSearchResultsList"]},profilePage:{content:[".v9tJq","main.PolarisShellContent > .PolarisProfilePage","main.PolarisRefreshedShellContent > .PolarisProfilePage"],header:[".zw3Ow",".PolarisProfilePage header"],username:[".KV-D4","section.PolarisProfilePageHeader h2.PolarisIGCoreText"],avatarWithStoryWrap:[".RR-M-.h5uC0",".PolarisProfilePageHeader div.PolarisUserAvatarWithStories"],avatarStoryRing:['html[data-page="profilePage"] .RR-M-.h5uC0 canvas',".PolarisProfilePageHeader canvas.PolarisStoryRing"],followButton:[".nZSzR .y3zKF.sqdOP",".XBGH5 ._4EzTm .soMvl:last-child",'[data-page="profilePage"] .PolarisFollowButton button'],toggleSuggestionsButton:[".PolarisFollowButton > .PolarisDropdownButton:last-child"],writeButton:[".JI_ht.vwCYk",'html[data-page="profilePage"] .i0EQd',".PolarisProfilePageHeader ._ab9s"],subscribeButtonWrap:[".vBF20"],blueButtonsWrap:[".nZSzR .vwCYk"],buttonsRow:[".Y2E37 > div:first-child"],settingsMenuWrap:["._7XkEo",".PolarisNavigationalHeader + ._ac8b"],settingsMenu:["._7XkEo > div",".PolarisNavigationalHeader + ._ac8b > div"],postRow:[".v9tJq .weEfm",".PolarisProfileMediaBrowser .PolarisIGVirtualGrid",".PolarisProfileTabChannel .PolarisIGVirtualGrid"],postContainer:[".v9tJq ._bz0w",".PolarisProfileMediaBrowser .PolarisPostsGridItem",".PolarisProfileTabChannel .PolarisVirtualPostsGrid"],post:['.v9tJq ._bz0w a[href^="/p/"]','.PolarisProfileMediaBrowser .PolarisPostsGridItem > a[href^="/p/"]'],reelRow:[".v9tJq .gmGWn",".v9tJq .Nnq7C",".PolarisProfilePage .PolarisIGVirtualList .PolarisIGVirtualGrid._abq4"],reelContainer:[".v9tJq .k1v61",".v9tJq .b9_1r",".PolarisProfilePage .PolarisClipsGrid","div:has(> .PolarisClipsGridItem)"],reelPreviewStats:[".v9tJq .b9_1r .qn-0x",".PolarisPostsGridItemOverlay._ac2d"],reelIcon:['.PolarisPostsGridItemMediaIndicator path[d*="m12.823 1 2.974"]'],moreButton:[".VMs3J","section.PolarisProfilePageHeader > .PolarisProfilePageHeader > div.PolarisProfilePageHeader"],tab:["._9VEo1",".PolarisProfilePage .PolarisTabbedContent > .PressableText"],activeTab:['.PolarisProfilePage .PolarisTabbedContent > .PressableText[aria-selected="true"]'],openMbsButton:['div:has(> a[href*="https://business.facebook.com/business/loginpage/"])','div:has(> a[href*="instagram.com/?u=https%3A%2F%2Fbusiness.facebook.com"])'],postVideoIcon:[".CzVzU svg"],postVideoOverlay:[".qn-0x"],followersFollowingsLink:".Y8-fY a"},profilePageFeedTab:{postFooter:["article.PolarisPost ._ae3w"],addCommentSection:["article.PolarisPost ._ae3w section.PolarisPostCommentInput"],addCommentTypeahead:["article.PolarisPost ._ae3w .PolarisTypeahead"]},postPage:{postHeader:[".PolarisPostPage ._aasi",".PolarisPostPage article > div > div:first-child"],postFooter:[".PolarisPostPage ._aast",".PolarisPostPage article > div > div:last-child > div"]},commentsPage:{body:'html[data-page="mobileAllCommentsPage"] .CometMainContentWrapper',footer:'html[data-page="mobileAllCommentsPage"] nav.PolarisNavWrapper',scrollContainer:[".XQXOT",".PolarisThreadedComments > ul"],showMoreButton:["li > div > .wpO6b",".PolarisThreadedComments > ul > li:last-child"],lastListItem:".PolarisThreadedComments > ul > *:last-child",comment:[".C4VMK",".PolarisPostComment._a9zr"]},feedPage:{body:[".Wamc7","section > ._aam1"],postsContainer:[".IGDSBox > .PolarisFeedPage"],followSuggestions:[".bq3Mi",".PolarisSuggestedUserFeedUnit"],post:["article._8Rm4L","article.PolarisPost","article.PolarisPostFunctional"],postLocationRow:[".M30cS",".PolarisPostHeader._aaql"],postHashtagLocation:".M30cS > div:not(:empty) + .JF9hh",postHeader:[".UE9AK",".PolarisIGCoreBox > ._aaqw"],postHeaderBeforePseudo:[".UE9AK::before",".PolarisIGCoreBox > ._aaqw::before"],postHeaderItem:".UE9AK > *",postBody:["article.PolarisPost ._aatk","article.PolarisPost ._ab12"],postFooterWrap1:["article._8Rm4L ._97aPb + div","._aatk + .PolarisIGCoreBox","._ab12 + .PolarisIGCoreBox"],postFooterWrap2:["article._8Rm4L .cv3IO","._aatk + .PolarisIGCoreBox > ._aast","._ab12 + .PolarisIGCoreBox > div","._aatk + .PolarisIGCoreBox > div"],postFooter:[".eo2As","._aatk + .PolarisIGCoreBox > ._aast > ._aasx","._ab12 + .PolarisIGCoreBox > div > div","._aatk + .PolarisIGCoreBox > div > div"],postActions:[".Slqrh",".PolarisPostFeedbackControls._aamu"],postAfterActions:[".PolarisPostFeedbackControls._aamu ~ *"],postThreeDotsButtonWrap:[".PolarisPostOptionsButtonPicker"],postThreeDotsButton:[".MEAGs",".PolarisPostOptionsButtonPicker > button"],postAction:[".Slqrh > *",".PolarisPostFeedbackControls._aamu > *"],postActionIconDefault:[".rrUvL",".PolarisPostFeedbackControls button._abl- > div:last-child"],postActionIconHovered:[".B58H7",".PolarisPostFeedbackControls button._abl- .PolarisIGCoreSVGIconButton"],postUnderActionsContent:[".eo2As > *:not(.Slqrh)","._aasx > *:not(.PolarisPostFeedbackControls)"],postPhoto:[".KL4Bh img","article.PolarisPost .PolarisPhoto img","article.PolarisPostFunctional .PolarisPhoto img"],postVideo:["article._8Rm4L video","article.PolarisPost .PolarisVideo video","article.PolarisPostFunctional .PolarisVideo video"],postMediaContainer:["._97aPb",".PolarisPhoto._aagu"],postPhotoContainer:["._9AhH0",".PolarisPost .PolarisPost.PolarisPhoto",".PolarisPost .PolarisPost.PolarisPhotoWithIndicator",".PolarisPostFunctional .PolarisPostFunctional.PolarisPhoto",".PolarisPostFunctional .PolarisPostFunctional.PolarisPhotoWithIndicator"],postVideoContainer:[".GRtmf",".PolarisPost .PolarisMedia.PolarisVideo",".PolarisPostFunctional .PolarisMedia.PolarisVideo",'[data-media-actions-post-type="igtv"] > .PolarisIGCoreBox'],postCarouselContainer:[".rQDP3",".PolarisSidecar._aamn"],carouselDots:[".ijCUd",".PolarisStepIndicator"],carouselDot:[".Yi5aA",".PolarisStepIndicator ._acnb"]},postCreation:{body:['[data-page="CreationDetailsPage"] .PolarisCreationShell','[data-page="CreationDetailsPage"] .PolarisBaseShell'],nextButton:['[data-page="CreationStylePage"] .UP43G','[data-page="CreationStylePage"] .PolarisNavigationalHeader ._ab5p'],closeButton:[".PolarisCreationShell .PolarisGenericMobileHeader._ab19 button.PolarisNavigationalHeader"],captionContainer:[".IpSxo",".PolarisCreationDetailsPage._abru"],captionTextarea:[".IpSxo textarea","textarea.PolarisCreationCaptionInput",".PolarisCreationCaptionInput textarea"],userAvatar:[".IpSxo .GsWMc",".IpSxo ._2dbep",".PolarisUserAvatar.PolarisCreationDetailsPage"],imageContainer:[".N7f6u",".PolarisCreationCroppingUnit._abqh"],videoContainer:[".YMoW3",".PolarisCreationStyleVideoUnit._abe_"],video:[".YMoW3 video",".PolarisCreationStyleVideoUnit._abe_ video"],videoPoster:[".YMoW3 img",".PolarisCreationStyleVideoUnit._abe_ img"],videoPlayButton:['.PolarisCreationStyleVideoUnit._abe_ span._abf6[role="button"]'],filtersReel:[".PDNx9",".PolarisIGVirtualList.PolarisCreationFilteringUnit"],submitPostButton:[".hfWwk .UP43G",'[data-page="CreationDetailsPage"] ._ab5p'],rowButton:["._2OfRz",".PolarisCreationDetailsPage._abrf"],previewContainer:['html[data-page="CreationDetailsPage"] .g5kp1',".PolarisCreationDetailsPage ._aau7"],previewPostTypeIcon:[".cRc_w",".PolarisCreationDetailsPage .PolarisMediaPreviewThumbnail svg"],previewPostImage:[".IpSxo .FuaTR","img.PolarisMediaPreviewThumbnail"],expandImageButton:[".pHnkA",".PolarisCroppableImage._abfb"],mentionsOverlay:[".cDEf6",".PolarisCreationCaptionInput._aby4"],tagPeopleButton:[".DG8Ws","button.PolarisCreationTagVideo._a9z-"]},loginBar:{root:".Xwp_P .KGiwt",content:".Xwp_P .KGiwt .ryLs_",openAppButton:[".Xwp_P .KGiwt button",".PolarisMobileTopNavLoggedOut button._acap"]},activityPage:{headerBottomLine:['html[data-page="ActivityFeedPage"] .PolarisGenericMobileHeader::before'],topListContainer:['html[data-page="ActivityFeedPage"] .PolarisShellContent > .PolarisIGVirtualList > div']},"general_use-application-bar":[".Z_Gl2",".MFkQJ","._acc8"],"post-item":["._97aPb",".PolarisPost div:first-child:last-child:not([class]) > .PolarisPhoto",".PolarisPost div:first-child:last-child:not([class]) > .PolarisPhotoWithIndicator > .PolarisPhoto",".PolarisPost .PolarisMedia.PolarisVideo",".PolarisPost .PolarisSidecar li.PolarisVirtualHSnapScrollComponents",".PolarisPostFunctional .PolarisPostFunctional.PolarisPhoto",".PolarisPostFunctional .PolarisPostFunctional.PolarisPhotoWithIndicator",".PolarisPostFunctional .PolarisMedia.PolarisVideo",".PolarisPostFunctional .PolarisSidecar li.PolarisVirtualHSnapScrollComponents",".PolarisPostVideoPlayerWrapper[style]",".PolarisVideoLegacy"],"post-video":[".GRtmf video",".PolarisPost ._aatk video",".PolarisPostFunctional ._ab12 video"],"post-video-poster":[".GRtmf video + img",".PolarisPost ._aatk video + img",".PolarisPostFunctional ._ab12 video + img"],"post-video-overlay":[".B1JlO .fXIG0",".PolarisVideoPlayButton._aakl",".PolarisVideoPlayButton._aakh",".PolarisPost .VideoPlayerComponentContainer[data-visualcompletion]"],"post-tagged-people-button":[".G_hoz","._a3gq ._a9-6",".PolarisVideo ._a9-6"],"story-container":[".qbCDp",".PolarisMobileOwnerStories._aa2i","section > .PolarisMobileStories"],"story-image":[".qbCDp img","img.PolarisStoryImage"],"story-video":[".qbCDp video","video.PolarisStoryVideo",".PolarisMobileStoryViewer video"],"story-loading-preview":".qbCDp canvas","story-video-play-button":[".qbCDp .videoSpritePlayButton",".PolarisMobileStoryEventZone._9zwu"],"stories-viewer":[".UIujo",".PolarisMobileStoriesPage"],"highlights-container":[".YlNGR",".PolarisProfileStoryHighlightsTray .PolarisHSnapScroll._aap0"],"comments-list-on-comments-page":".XQXOT","profile-page-stat-container":".LH36I","profile-page-stat-item":"._81NM2","profile-page-grid-stretch-element":"._2z6nI article:first-child:empty","profile-send-message-button":".fAR91","header-top-level-button":[".HOQT4",".PolarisGenericMobileHeader._ab18._ab1b"],"your-story-button-text":[".XdXBI",".PolarisOwnStoryTrayItem._aac2"],"comment-form":[".RxpZH",".PolarisPostCommentInput._aaof"],"comment-form-avatar":[".RxpZH ._2dbep",".PolarisPostCommentInput > img.PolarisUserAvatar"],"comment-form-form":[".RxpZH form","form.PolarisPostCommentInput"],"comment-form-textarea":[".RxpZH textarea","textarea.PolarisPostCommentInput"],"comment-form-submit-button":['.RxpZH button[type="submit"]',"form.PolarisPostCommentInput button"],postCreationPage:['html[data-page="CreationStylePage"]'],storyCreationPage:['html[data-page="StoryCreationPage"]'],"new-post_tag-people-image-container":".qJfNm"},ig:{STORY_REELS_ITEM_SEEN:"STORY_REELS_ITEM_SEEN"},fcs:{MIN_MINUTES_FROM_NOW:10,MAX_DAYS_FROM_NOW:74,MediaManagerDispatcher:"MediaManagerDispatcher",MediaManagerInstagramComposerMetaDataActions:"MediaManagerInstagramComposerMetaDataActions",MediaManagerInstagramComposerMetaDataStore:"MediaManagerInstagramComposerMetaDataStore",MediaManagerInstagramComposerRootActions:"MediaManagerInstagramComposerRootActions",MediaManagerInstagramComposerUploadStore:"MediaManagerInstagramComposerUploadStore",DateTime:"DateTime",ImageExifRotation:"ImageExifRotation",TimezoneNamesData:"TimezoneNamesData",CurrentUserInitialData:"CurrentUserInitialData",SWITCH_CROSSPOST_POST_MODE:"SWITCH_CROSSPOST_POST_MODE",SWITCH_POST_MODE:"SWITCH_POST_MODE",postMode:"postMode",postModeDraft:"draft",postModePublish:"publish",postModeSchedule:"schedule",isEditComposer:"isEditComposer",SELECT_CROSSPOST_SCHEDULED_DATE:"SELECT_CROSSPOST_SCHEDULED_DATE",SELECT_SCHEDULED_DATE:"SELECT_SCHEDULED_DATE",scheduledDate:"scheduledDate",SUBMIT_MEDIA_ORDER:"SUBMIT_MEDIA_ORDER",mediaOrderId:"id",prevIndex:"prevIndex",newIndexString:"newIndexString",totalMedia:"totalMedia",postDetailsTrayPost:"post",CONTENT_INSTAGRAM_EDIT_POST:"CONTENT_INSTAGRAM_EDIT_POST",FILES_ADDED:"FILES_ADDED",files:"files",LOAD_TAB_START:"LOAD_TAB_START",LOAD_TAB_FINISHED:"LOAD_TAB_FINISHED",tab:"tab",instagram_content_posts:"instagram_content_posts",SELECT_IG_PROFILES:"SELECT_IG_PROFILES",selectedProfileIDs:"selectedProfileIDs",LOAD_CONTENT_TABLE_FINISHED:"LOAD_CONTENT_TABLE_FINISHED",rows:"rows",CONTENT_TABLE_REFRESH_ROWS_FINISHED:"CONTENT_TABLE_REFRESH_ROWS_FINISHED",rowsByIDs:"rowsByIDs",PUSH_NOTIFICATION:"PUSH_NOTIFICATION",CLOSE_NOTIFICATION:"CLOSE_NOTIFICATION",isSuccess:"isSuccess",notificationData:"notificationData",notificationDataLabel:"label",CLOSE_COMPOSER:"CLOSE_COMPOSER",INSTAGRAM_COMPOSER:"INSTAGRAM_COMPOSER",SHOW_EXIT_COMPOSER_CONFIRM_DIALOG:"SHOW_EXIT_COMPOSER_CONFIRM_DIALOG",UPDATE_CAPTION:"UPDATE_CAPTION",TOGGLE_CROSSPOST_TO_FACEBOOK_CHECKBOX:"TOGGLE_CROSSPOST_TO_FACEBOOK_CHECKBOX",post_type:"post_type",post_status:"post_status",limit:"limit",POST_TYPE_ALL:"ALL",POST_TYPE_PHOTOS:"PHOTOS",POST_TYPE_IG_STORIES:"IG_STORIES",POST_TYPE_CAROUSELS:"CAROUSELS",POST_TYPE_IGTV:"IGTV",POST_TYPE_VIDEOS:"VIDEOS",POST_STATUS_DRAFT:"DRAFT",POST_STATUS_SCHEDULED:"SCHEDULED",POST_STATUS_PUBLISHED:"PUBLISHED",immutable:"immutable",queryIGMediaData:"queryIGMediaData",MediaManagerInstagramContentActions:"MediaManagerInstagramContentActions",MediaManagerLazyLoadActions:"MediaManagerLazyLoadActions",instagram_content_library_posts:"instagram_content_library_posts",REFRESH_TAB:"REFRESH_TAB",SELECT_CONTENT_TABLE:"SELECT_CONTENT_TABLE",SELECT_INSTAGRAM_ACCOUNT:"SELECT_INSTAGRAM_ACCOUNT",SET_CONTENT_LIBRARY_DATA:"SET_CONTENT_LIBRARY_DATA",INSTAGRAM_VIDEO_POSTS:"INSTAGRAM_VIDEO_POSTS",INSTAGRAM_PHOTO_POSTS:"INSTAGRAM_PHOTO_POSTS",INSTAGRAM_CAROUSEL_POSTS:"INSTAGRAM_CAROUSEL_POSTS",INSTAGRAM_IGTV_POSTS:"INSTAGRAM_IGTV_POSTS",IG_FEED_ORGANIC:"IG_FEED_ORGANIC","/media_manager/content_library":"/media_manager/content_library","/media_manager/media_manager_instagram_content":"/media_manager/media_manager_instagram_content","/media/manager/instagram_media/edit/save":"/media/manager/instagram_media/edit/save","/media/manager/instagram_composer/create_post":"/media/manager/instagram_composer/create_post","https://www.facebook.com/confirmemail.php":"https://www.facebook.com/confirmemail.php",'action="/confirm_code/':'action="/confirm_code/',"edit_data[save_as_draft]":"edit_data[save_as_draft]","edit_data[save_as_scheduled]":"edit_data[save_as_scheduled]"},fcsSelectors:{welcome:{getStartedButton:"._7iri button._1qjd._271m._271k",acceptCookieButton:"button[data-cookiebanner]"},whatsNew:{closeButton:'body:not(.bizsitePage) ._9l2g[role="dialog"] [role="button"]'},general:{pandaErrorImage:"._1ldz",cookieBannerTitle:"#cookie_banner_title",fbLoginRequiredContainer:".UIPage_LoggedOut",headerMessageIconContainer:".MediaManagerInstagramComposerHeaderMessage",translationsButton:".fbDockWrapperRight"},sidePanel:{root:"#creator_studio_sliding_tray_root",loadingOverlay:"._8eef",captionScrollContainer:"._5yk1",captionTextarea:"._5yk1 [contenteditable]",locationRoot:"._7yq5",locationInput:"._7yq5 input",mediaPreview:"._5i4g",mediaPreviewContainer:".BackgroundImage",mediaPreviewControls:"._9aiv",mediaPreviewVideo:"._80o3 video",uploadingVideo:"video._ox1",uploadingVideoPlayButton:"video._ox1 ~ i",uploadingVideoCustomControls:"video._ox1 ~ ._27db",coverSelectionRadioBox:"._6epv",goToPostButton:"#creator_studio_sliding_tray_root ._6qig div:nth-child(1)",editPostButton:".MediaManagerInstagramPostDetailsTray > .FlexLayout button",doneButton:"#creator_studio_sliding_tray_root ._6qig div:nth-child(3)",save:"#creator_studio_sliding_tray_root ._85h_ button:not([id]):not(.delete-post-button)",dateDialogTrigger:"#creator_studio_sliding_tray_root ._85h_ button:not([id]):not(.delete-post-button) + * button",editPostTitle:"#creator_studio_sliding_tray_root ._6y1b ._3qn7",editPostBottomRow:"#creator_studio_sliding_tray_root ._85h_",mediaList:"._80o3",body:"._7-i-",bodyContent:["._7-i- > .FlexLayout","._7-i- > ._3qn7"],sidebar:"._7yqd",sidebarTab:'.MediaManagerInstagramComposerBodyTabSections[role="button"]',sidebarTabIcon:'.MediaManagerInstagramComposerBodyTabSections[role="button"] .ImageCore',sidebarTabTitle:'.MediaManagerInstagramComposerBodyTabSections[role="button"] .ImageCore + span',postPreviewCaption:".MediaManagerInstagramPostPreview > p",uploadProgress:"._6eqx",postPerformancePane:".MediaManagerInstagramPostDetailsBody._75fj"},postToFb:{root:"#creator_studio_sliding_tray_root ._3qn7._61-3._2fyh._3qnf",title:'#creator_studio_sliding_tray_root ._3qn7._61-3._2fyh._3qnf [role="heading"]',checkboxRow:"#creator_studio_sliding_tray_root ._3qn7._61-3._2fyh._3qnf ._8ung > div",checkboxButton:"#creator_studio_sliding_tray_root ._3qn7._61-3._2fyh._3qnf ._8ung button",checkboxText:"#creator_studio_sliding_tray_root ._3qn7._61-3._2fyh._3qnf ._8ung > div > div:first-child > div:last-child",body:"#creator_studio_sliding_tray_root ._3qn7._61-3._2fyh._3qnf ._83li",publishTypeButton:'#creator_studio_sliding_tray_root ._3qn7._61-3._2fyh._3qnf button[aria-haspopup="true"]'},tooltip:{root:".uiContextualLayerPositioner",bubbleWrap:".uiContextualLayer",bubble:".uiTooltipX"},upload:{root:"._7_8t",button:"._7_8t button",buttonWrap:"._7_8t ._82ht",addContentButton:'div[aria-haspopup="true"][id^="js_"] button',addContentButtonWrap:'div[aria-haspopup="true"][id^="js_"]',input:'input[accept^="video"]'},confirmDialog:{yes:'[action="confirm"]'},dateDialog:{root:["._53ii ._53ik",'[style*="right: 30px"][style*="z-index: 400"] > div > div'],rootOpen:["._53ii:not(.hidden_elem) ._53ik",'[style*="right: 30px"][style*="z-index: 400"]:not(.hidden_elem) > div > div']}}};var at={};let st;at.controller={init:function(){st=Se.controller.getConfig().igSelectors,async function(){const e=document.documentElement,t=await we.send("zen.is-enabled");e.classList.toggle("zen--enabled",t),we.on("zen.toggled",(t=>{e.classList.toggle("zen--enabled",t)}))}(),function(){const e=Symbol("handled");E.onDocMutations((()=>{E.$$(st.feedPage.postHeader).forEach((t=>{if(t[e])return;t[e]=!0;const o=t.closest(st.feedPage.post);if(!o)return;const n=E.$(st.feedPage.postActions,o);if(!n)return;const i=E.$(st.feedPage.postThreeDotsButton,o);if(!i)return;const r=()=>{o.classList.add("zen--post-with-hovered-header")},a=()=>{o.classList.remove("zen--post-with-hovered-header")};t.addEventListener("mouseenter",r),n.addEventListener("mouseenter",r),i.addEventListener("mouseenter",r),t.addEventListener("mouseleave",a),n.addEventListener("mouseleave",a),i.addEventListener("mouseleave",a)}))}))}(),async function(){const e=await Me("nav");if(!e)return;we.on("zen.toggled",(t=>{t&&"/"!==location.pathname&&e.push("/")}))}(),function(){const e=Symbol("handled");E.onDocMutations((()=>{E.$$(st.feedPage.post).forEach((t=>{t[e]||(t[e]=!0,E.$$("[alt]",t).forEach((e=>{e.removeAttribute("alt")})))}))}))}(),E.insertMultistyle`
    <style>
      .zen--enabled[data-page="feedPage"] ${st.feedPage.followSuggestions} {
        margin: 10px 14px;
      }

      .zen--enabled[data-page="feedPage"] ${st.feedPage.postPhoto},
      .zen--enabled[data-page="feedPage"] ${st.feedPage.postVideoContainer},
      .zen--enabled[data-page="feedPage"] ${st.feedPage.postPhotoContainer},
      .zen--enabled[data-page="feedPage"] ${st.feedPage.postMediaContainer},
      .zen--enabled[data-page="feedPage"] ${st.feedPage.postCarouselContainer} {
        max-height: 70vh;
      }

      .zen--enabled[data-page="feedPage"] ${st.feedPage.postMediaContainer} {
        background: #FFF !important;
      }

      .zen--enabled[data-page="feedPage"] ${st.feedPage.post} {
        background: #1b1b1b;
        overflow: hidden;
        margin: 8px 16px 5px 16px;
        border-radius: 8px;
        position: relative;
      }
      .zen--enabled[data-page="feedPage"] ${st.feedPage.post}:first-child {
        margin-top: 0;
      }

      /* semitransparent border */
      .zen--enabled[data-page="feedPage"] ${st.feedPage.post}::before {
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

      .zen--enabled[data-page="feedPage"] ${st.feedPage.postHeader} {
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
      .zen--enabled.theme-night[data-page="feedPage"] ${st.feedPage.postHeader} {
        background: rgba(255, 255, 255, 0.2);
      }
      .zen--enabled[data-page="feedPage"] .zen--post-with-hovered-header ${st.feedPage.postHeader} {
        right: 0;
        border-radius: 8px 8px 0 0;
      }

      .zen--enabled[data-page="feedPage"] ${st.feedPage.postHeaderBeforePseudo} {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 56px;
        background: rgba(0, 0, 0, 0.4);
        border-radius: 8px 0 16px 0;
      }
      .zen--enabled[data-page="feedPage"] .zen--post-with-hovered-header ${st.feedPage.postHeaderBeforePseudo} {
        height: 96px;
        border-radius: 8px 8px 0 0;
      }
      .zen--enabled.theme-night ${st.feedPage.postHeaderBeforePseudo} {
        filter: url(#theme-reverse-filter);
      }

      .zen--enabled[data-page="feedPage"] ${st.feedPage.postHeaderItem} {
        position: relative;
      }
      .zen--enabled[data-page="feedPage"] .zen--post-with-hovered-header ${st.feedPage.postHeaderItem} {
        top: 0;
      }

      /* hitbox when header is hovered */
      .zen--enabled[data-page="feedPage"] .zen--post-with-hovered-header ${st.feedPage.postHeader}::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: -20px;
      }

      /* divider between actions */
      .zen--enabled[data-page="feedPage"] .zen--post-with-hovered-header ${st.feedPage.postHeader}::after {
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
      .zen--enabled.theme-night[data-page="feedPage"] ${st.feedPage.postHeader}::after {
        filter: url(#theme-reverse-filter);
      }

      .zen--enabled[data-page="feedPage"] ${st.feedPage.postHeader} * {
        color: #FFF !important;
      }
      .zen--enabled.theme-night[data-page="feedPage"] ${st.feedPage.postHeader} * {
        color: #000 !important;
      }

      .zen--enabled[data-page="feedPage"] ${st.feedPage.postLocationRow} {
        display: flex;
        flex-direction: row;
        align-items: baseline;
      }

      .zen--enabled[data-page="feedPage"] ${st.feedPage.postHashtagLocation} {
        margin-left: 12px;
      }

      .zen--enabled[data-page="feedPage"] ${st.feedPage.postHashtagLocation}::before {
        content: '';
        position: absolute;
        width: 4px;
        height: 4px;
        top: 6px;
        left: -8px;
        background: #fff;
        border-radius: 50%;
      }
      .zen--enabled.theme-night[data-page="feedPage"] ${st.feedPage.postHashtagLocation}::before {
        background: #000;
      }

      .zen--enabled[data-page="feedPage"] ${st.feedPage.postThreeDotsButtonWrap} {
        position: absolute;
        top: 9px;
        right: 0;
        z-index: 1;
      }

      .zen--enabled[data-page="feedPage"] ${st.feedPage.postThreeDotsButton} {
        z-index: 1;
        opacity: 0;
        pointer-events: none;
        position: static;
      }

      .zen--enabled[data-page="feedPage"] .zen--post-with-hovered-header ${st.feedPage.postThreeDotsButton} {
        opacity: 1;
        pointer-events: all;
      }

      .zen--enabled[data-page="feedPage"] ${st.feedPage.postThreeDotsButton} svg {
        fill: #FFF;
      }
      .zen--enabled.theme-night[data-page="feedPage"] ${st.feedPage.postThreeDotsButton} svg {
        fill: #000;
      }

      .zen--enabled[data-page="feedPage"] ${st.feedPage.postFooterWrap1},
      .zen--enabled[data-page="feedPage"] ${st.feedPage.postFooterWrap2} {
        position: static;
      }

      .zen--enabled[data-page="feedPage"] ${st.feedPage.postFooter} {
        position: absolute;
        top: -6px;
      }

      .zen--enabled[data-page="feedPage"] ${st.feedPage.postActions} {
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
      .zen--enabled[data-page="feedPage"] .zen--post-with-hovered-header ${st.feedPage.postActions} {
        display: inherit;
        pointer-events: all;
      }

      .zen--enabled[data-page="feedPage"] ${st.feedPage.postAfterActions} {
        display: none;
      }

      .zen--enabled[data-page="feedPage"] ${st.feedPage.postAction} {
        margin-right: 7px;
      }

      .zen--enabled[data-page="feedPage"] ${st.feedPage.postAction} svg {
        fill: #FFF;
        stroke: #FFF;
        color: #FFF !important;
      }
      .zen--enabled.theme-night[data-page="feedPage"] ${st.feedPage.postAction} svg {
        fill: #000;
        stroke: #000;
        color: #000 !important;
      }

      .zen--enabled[data-page="feedPage"] ${st.feedPage.postAction}:not(:first-child) svg * {
        stroke-width: 2.5px !important;
      }

      .zen--enabled[data-page="feedPage"] ${st.feedPage.postUnderActionsContent} {
        display: none;
      }

      .zen--enabled[data-page="feedPage"] ${st.feedPage.carouselDots} {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 12px;
      }

      .zen--enabled[data-page="feedPage"] ${st.feedPage.carouselDot} {
        background: #FFF;
        box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
      }

      @media (max-width: 500px) {
        .zen--enabled[data-page="feedPage"] ${st.feedPage.post}:first-child {
          margin-top: 16px !important;
        }
      }

      @media (max-width: 350px) {
        .zen--enabled[data-page="feedPage"] ${st.feedPage.followSuggestions} {
          margin-left: 0;
          margin-right: 0;
        }
      }
    </style>
  `}};var lt={};function ct(){return!t(Se.controller.getConfig().igSelectors.general.tabBarCreatePostIconOldNavDesign)}let dt;lt.controller={init:function(){lt.creationCardController.init()}},lt.creationCardController={init:function(){dt=Se.controller.getConfig().igSelectors,we.on("feature-encourage.start-story-creation",ut),we.on("feature-encourage.start-post-creation",gt),we.on("feature-encourage.start-reels-creation",ht),E.insertMultistyle`
    <style>
      ${dt.general.creationPopup} {
        opacity: 0;
        pointer-events: none;
      }
    </style>
  `,E.onDocMutations((()=>{const e=!!E.$(dt.general.creationPopup);pt!==e&&(pt=e,pt?(pt=!0,we.send("feature-encourage.toggle-creation-card",!0),requestAnimationFrame((()=>{document.addEventListener("click",ft),document.addEventListener("keydown",mt)}))):ft())}))}};let pt=!1;async function ut(){Le.controller.stopReelsCreationSession();const e=await Me("nav");if("feedPage"!==(await Me("store")).getState().navigation.pageIdentifier&&e.push("/"),ct()){await E.waitFor((()=>E.$(dt.general.storiesBar))),await E.waitFor((()=>window.innerWidth<window.innerHeight));(await E.waitFor((()=>E.$(dt.general.tabBarCreatePostButtonLink)))).click();const e=E.$(dt.general.creationPopupStoryButton);if(!e)return;e.click(),await E.sleep(150)}else{const e=await E.waitFor((()=>E.$(dt.general.createStoryHeaderButton)));if(!e)return;await E.waitFor((()=>window.innerWidth<window.innerHeight)),e.click()}}function gt(){if(Le.controller.stopReelsCreationSession(),ct()){return void E.$(dt.general.creationPopupPostButton).click()}E.$(dt.general.tabBarCreatePostButton).click()}function ht(){const e=ct()?E.$(dt.general.tabBarCreatePostInput):E.$(dt.general.tabBarInput),t=e.getAttribute("accept"),o=t.split(", ").filter((e=>e.startsWith("video"))).join(", ");if(e.setAttribute("accept",o),ct()){E.$(dt.general.creationPopupPostButton).click()}else{E.$(dt.general.tabBarCreatePostButton).click()}e.setAttribute("accept",t),Le.controller.startReelsCreationSession()}function ft(){pt=!1,we.send("feature-encourage.toggle-creation-card",!1),requestAnimationFrame((()=>{document.removeEventListener("click",ft),document.removeEventListener("keydown",mt)}))}function mt(e){"Escape"===e.key&&ft()}var yt={controller:{init:async function(){this.sel=Se.controller.getConfig().dmSelectors,this.store=await Me("store"),this.store&&(this.popup=null,this.textarea=null,this.preventReplyHover=!1,this.preventHideOnBlur=!1,this.prevState={},this.state={show:!1,replies:[],filterString:null,activeReplyIndex:0},this.keepRepliesInSync(),this.initPopup(),this.initToggler(),this.initTextarea(),this.initStyles(),this.update())},keepRepliesInSync:function(){(async()=>{const e=await we.send("quick-replies.fetch");this.setState({replies:e})})(),we.on("quick-replies.update",(e=>{this.setState({replies:e})}))},setState:function(e={}){this.prevState={...this.state},this.state={...this.state,...e},this.update()},onTogglerClick:function(){0===this.state.replies.length?we.send("quick-replies.toggle"):this.setTextareaValue("/")},onManageMouseDown:function(e){we.send("quick-replies.toggle"),this.preventHideOnBlur=!0,setTimeout((()=>{this.textarea&&this.textarea.focus()}))},onTextareaInput:function(e){const t=this.onTextareaInput;clearTimeout(t.timeout);const o=this.readFilterStringFromTextarea();null===o?(this.setState({show:!1}),t.timeout=setTimeout((()=>{this.setState({filterString:null,activeReplyIndex:0})}),300)):(this.preventReplyHover=!0,this.setState({show:!0,filterString:o,activeReplyIndex:0}))},onTextareaBlur:function(){this.preventHideOnBlur?this.preventHideOnBlur=!1:this.setState({show:!1})},onTextareaFocus:function(){const e=this.readFilterStringFromTextarea();this.setState({show:null!==e})},onTextareaKeyDown:function(e){if(this.state.show)if("ArrowUp"===e.key){e.preventDefault();let t=this.state.activeReplyIndex-1;const o=this.getFilteredReplies();-1===t&&(t=o.length-1),this.setState({activeReplyIndex:t}),this.scrollToActiveReplyIfNeeded()}else if("ArrowDown"===e.key){e.preventDefault();let t=this.state.activeReplyIndex+1;t===this.getFilteredReplies().length&&(t=0),this.setState({activeReplyIndex:t}),this.scrollToActiveReplyIfNeeded()}else("Enter"===e.key&&!e.shiftKey||"Tab"===e.key)&&(e.preventDefault(),e.stopPropagation(),this.applyActiveReply())},onReplyMouseEnter:function(e){if(this.preventReplyHover)return void(this.preventReplyHover=!1);const t=e.target.closest(".QuickRepliesPopup__reply"),o=Number(t.dataset.index);this.setState({activeReplyIndex:o})},onReplyMouseDown:function(){this.preventHideOnBlur=!0,this.applyActiveReply()},setTextareaValue:function(e){this.textarea&&(this.textarea.value="",this.textarea.focus(),document.execCommand("insertText",!1,e),setTimeout((()=>{this.textarea.focus(),this.textarea.selectionStart=e.length,this.textarea.selectionEnd=e.length})))},select:function(e){return this.popup?E.$(`.QuickRepliesPopup__${e}`,this.popup):null},selectAll:function(e){return this.popup?E.$$(`.QuickRepliesPopup__${e}`,this.popup):[]},getFilteredReplies:function(){const e=this.state.filterString||"";return""===e?this.state.replies:this.state.replies.filter((t=>{const o=(t.shortcut||"")+(t.content||"");return!!o&&E.fuzzyCheck(o,e,2)}))},applyActiveReply:function(){const e=this.getFilteredReplies()[this.state.activeReplyIndex];if(!e)return;const t=this.prepareMessage(e.content);this.setTextareaValue(t),we.send("ga.send-event","user","quick-replies:paste")},prepareMessage:function(e){const t=e.match(/{[^}]*}/g)||[];for(const o of t){const t=o.replace("{","").replace("}","").split("|"),n=this.pickRandom(t);e=e.replace(o,n)}try{const t=this.store.getState(),o=t.navigation.route.split("/t/")[1],n=t.direct.threads.get(o).users[0],i=t.direct.users.get(n);e=e.replaceAll("@name",i.full_name||i.username).replaceAll("@username",i.username)}catch{}return e},pickRandom:function(e=[]){return e[Math.round(Math.random()*(e.length-1))]},readFilterStringFromTextarea:function(){if(!this.textarea)return null;const e=this.textarea.value;return 1===e.split("\n").length&&e.startsWith("/")?e.replace("/","").toLowerCase():null},scrollToActiveReplyIfNeeded:function(){this.preventReplyHover=!0;const e=this.select("replies"),t=this.select("reply_active"),o=e.scrollTop,n=e.offsetHeight,i=t.offsetTop,r=t.offsetHeight;o>i?e.scrollTop=i:i+r>o+n&&(e.scrollTop=i-n+r)},initPopup:function(){document.body.insertAdjacentHTML("beforeend",'\n      <div class="QuickRepliesPopup">\n        <div class="QuickRepliesPopup__body">\n          <div class="QuickRepliesPopup__replies"></div>\n          <div class="QuickRepliesPopup__footer">\n            <button class="QuickRepliesPopup__manageButton">\n              MANAGE QUICK REPLIES\n            </button>\n          </div>\n        </div>\n      </div>\n    '),this.popup=E.$(".QuickRepliesPopup");this.select("manageButton").addEventListener("mousedown",this.onManageMouseDown.bind(this))},initToggler:function(){let e=null;const t=Symbol("handled");E.onDocMutations((()=>{const o=E.$(this.sel.general.addMediaButton);o?o[t]||(o[t]=!0,o.insertAdjacentHTML("beforebegin",'\n        <div class="QuickRepliesToggler">\n          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18.205 18.5">\n            <path d="M6.481 0h1.711L1.709 18.5H0Zm1.311 16.654a1.325 1.325 0 0 1-1.331-1.355 1.276 1.276 0 0 1 .393-.952 1.3 1.3 0 0 1 .938-.384 1.254 1.254 0 0 1 .923.373 1.3 1.3 0 0 1 .373.962 1.317 1.317 0 0 1-.383.972 1.247 1.247 0 0 1-.913.384Zm4.556 0a1.325 1.325 0 0 1-1.335-1.355 1.276 1.276 0 0 1 .393-.952 1.3 1.3 0 0 1 .943-.383 1.254 1.254 0 0 1 .923.373 1.3 1.3 0 0 1 .373.962 1.317 1.317 0 0 1-.383.972 1.247 1.247 0 0 1-.909.383Zm4.556 0a1.325 1.325 0 0 1-1.335-1.355 1.276 1.276 0 0 1 .393-.952 1.3 1.3 0 0 1 .943-.383 1.254 1.254 0 0 1 .923.373 1.3 1.3 0 0 1 .373.962 1.317 1.317 0 0 1-.383.972 1.247 1.247 0 0 1-.909.383Z" fill="currentColor"/>\n          </svg>\n        </div>\n      '),e=E.$(".QuickRepliesToggler"),e.addEventListener("click",this.onTogglerClick.bind(this))):e&&(e.remove(),e=null)}))},initTextarea:function(){const e=Symbol("handled");E.onDocMutations((()=>{const t=E.$(this.sel.general.textarea);t&&(t[e]||(t[e]=!0,this.textarea=t,t.addEventListener("input",this.onTextareaInput.bind(this)),t.addEventListener("focus",this.onTextareaFocus.bind(this)),t.addEventListener("blur",this.onTextareaBlur.bind(this)),t.addEventListener("keydown",this.onTextareaKeyDown.bind(this))))}))},initStyles:function(){E.insertMultistyle`${"\n  <style>\n    .QuickRepliesToggler {\n      padding: 3px;\n      margin-right: 8px;\n      cursor: pointer;\n    }\n\n    .QuickRepliesPopup {\n      font-family: Montserrat;\n      display: flex;\n      flex-direction: column;\n      justify-content: flex-end;\n      position: fixed;\n      top: 0;\n      left: 0;\n      bottom: 0;\n      width: 430px;\n      pointer-events: none;\n    }\n\n    .QuickRepliesPopup__body {\n      background: #FFF;\n      border-radius: 4px;\n      overflow: hidden;\n      position: relative;\n      pointer-events: all;\n      transition: opacity 0.3s, transform 0.3s;\n    }\n    .QuickRepliesPopup:not(.QuickRepliesPopup_show) .QuickRepliesPopup__body {\n      opacity: 0;\n      pointer-events: none;\n      transform: translateY(10px);\n    }\n\n\n    /* border */\n    .QuickRepliesPopup__body::before {\n      content: '';\n      position: absolute;\n      top: 0;\n      left: 0;\n      right: 0;\n      bottom: 0;\n      border: 1px solid #DBDBDB;\n      border-radius: inherit;\n      pointer-events: none;\n    }\n\n    .QuickRepliesPopup__replies {\n      max-height: 400px;\n      overflow: auto;\n\n      /* place items above border */\n      position: relative;\n      z-index: 1;\n    }\n\n    .QuickRepliesPopup__noReplies {\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      height: 42px;\n      color: #8E8E8E;\n    }\n\n    .QuickRepliesPopup__reply {\n      display: flex;\n      flex-direction: row;\n      align-items: center;\n      height: 42px;\n      padding: 0 16px;\n      cursor: pointer;\n    }\n    .QuickRepliesPopup__reply_active {\n      background: #1BA2F9;\n      color: #FFF;\n    }\n    html.theme-night .QuickRepliesPopup__reply_active {\n      color: #000 !important;\n    }\n    .QuickRepliesPopup__reply b {\n      font-weight: 700;\n    }\n\n    .QuickRepliesPopup__replyShortcut {\n      font-size: 11px;\n      font-weight: 500;\n      border-radius: 4px;\n      background: #F3F3F3;\n      margin-right: 8px;\n      flex-shrink: 0;\n      padding: 2px 6px;\n    }\n    .QuickRepliesPopup__reply_active .QuickRepliesPopup__replyShortcut {\n      background: rgba(255, 255, 255, 0.25);\n    }\n\n    .QuickRepliesPopup__replyContent {\n      font-size: 14px;\n      line-height: 18px;\n      font-weight: 400;\n      text-overflow: ellipsis;\n      overflow: hidden;\n      white-space: nowrap;\n      display: block;\n      flex-shrink: 1;\n    }\n\n    .QuickRepliesPopup__footer {\n      display: flex;\n      flex-direction: row;\n      justify-content: flex-end;\n      padding: 12px;\n    }\n\n    .QuickRepliesPopup__manageButton {\n      color: #1BA2F9;\n      font-size: 12px;\n      line-height: 15px;\n      font-weight: 600;\n      cursor: pointer;\n      background: transparent;\n      border: none;\n      padding: 0;\n    }\n  </style>\n"}`},update:function(){const e=this.prevState,t=this.state;if(e.show!==t.show){const e="QuickRepliesPopup_show";this.popup.classList.toggle(e,this.state.show)}if(e.filterString!==t.filterString){const e=E.$(this.sel.general.writeBar);if(e){const t=e.getBoundingClientRect();this.popup.setAttribute("style",`left: ${Math.round(t.left)}px !important;\n           bottom: ${Math.round(window.innerHeight-t.top+16)}px !important;\n           width: ${Math.round(t.width)}px !important;`)}}if(e.replies!==t.replies||e.filterString!==t.filterString){const e=this.getFilteredReplies();0===e.length?this.select("replies").innerHTML='\n          <div class="QuickRepliesPopup__noReplies">\n            No replies found\n          </div>\n        ':(this.select("replies").innerHTML=e.map(((e,t)=>`\n          <div class="QuickRepliesPopup__reply" data-index="${t}">\n            ${e.shortcut?`\n              <div class="QuickRepliesPopup__replyShortcut">\n                /&thinsp;${e.shortcut}\n              </div>\n            `:""}\n            <div class="QuickRepliesPopup__replyContent">\n              ${e.content}\n            </div>\n          </div>\n        `)).join(""),this.selectAll("reply").forEach((e=>{e.addEventListener("mouseenter",this.onReplyMouseEnter.bind(this)),e.addEventListener("mousedown",this.onReplyMouseDown.bind(this))})))}{const e="QuickRepliesPopup__reply",t="QuickRepliesPopup__reply_active";E.$$(`.${t}`).forEach((e=>e.classList.remove(t)));const o=E.$$(`.${e}`)[this.state.activeReplyIndex];o&&o.classList.add(t)}}}},vt={init:async function(){(async function(){bt=await we.send("dm.ghost-mode:is-enabled"),we.on("dm.ghost-mode:toggled",(e=>{bt=e}))})(),async function(){const e=await Fe("PolarisDirectActionMarkSeen"),t=E.safe((()=>null==e?void 0:e.markSeen),null);if(!t)return void we.send("dm.ghost-mode:failed",{action:!!e,markSeen:!!t});e.markSeen=(...o)=>{var n;const i=null===(n=o[2])||void 0===n?void 0:n.ignoreGhostMode;return bt&&!i?()=>{}:t.call(e,...o)}}()}};let bt=!1;var _t={init:async function(){const e=Se.controller.getConfig().dmSelectors,t=await Me("store");if(!t)return;const o=Symbol("handled");E.onDocMutations((()=>{const n=E.$$('[id^="message-"]').filter((e=>!e[o]));if(0===n.length)return;const i=JSON.parse(JSON.stringify(t.getState()));n.forEach((t=>{var n;t[o]=!0;const r=E.$(e.general.messageBody,t);if(!r)return;const a=t.id.replace("message-",""),s=i.direct.messages[a];if("raven_media"!==s.item_type)return;localStorage.logRavenMessages&&console.warn({ravenMessage:s});const l=(null==s?void 0:s.raven_media)||(null==s||null===(n=s.visual_media)||void 0===n?void 0:n.media);if(!l)return;const c="replayable"===s.view_mode||"permanent"===s.view_mode;if(c){const e=r.previousElementSibling;e&&(e.style.display="none")}if(l.video_versions){const e=l.video_versions[0].url;r.outerHTML=`\n          <a class="raven-media-link" href="${e}" target="_blank">\n            ${c?"VIEW VIDEO":"PEEK AT VIDEO"}\n          </a>\n        `}else if(l.image_versions2){const e=E.createUrl(window.inssist.url("/viewer.html"),{src:l.image_versions2.candidates[0].url});r.outerHTML=`\n          <div class="raven-media-link" href="${e}" target="_blank">\n            ${c?"VIEW PHOTO":"PEEK AT PHOTO"}\n          </div>\n        `}else{var d;const e=null==s||null===(d=s.visual_media)||void 0===d?void 0:d.replay_expiring_at_us;e&&new Date(e/1e3).getTime()<Date.now()?r.innerHTML='\n            <div class="raven-media-unavailable">\n              This message has expired or has been viewed already.\n            </div>\n          ':r.innerHTML='\n            <div class="raven-media-unavailable">\n              This message can not be viewed or is no longer available.\n            </div>\n          '}}))})),E.insertMultistyle`
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
  `}};var xt={init:function(){(function(){wt=E.ls.get(Pt,{});for(const e in wt){for(const t in wt[e])0===wt[e][t].trim().length&&delete wt[e][t];0===Object.keys(wt[e]).length&&delete wt[e]}})(),async function(){const e=Se.controller.getConfig().dmSelectors,t=await Me("store"),o=await Me("add-dispatch-listener");if(!t||!o)return;let n;try{n=t.getState().users.viewerId}catch(e){return void console.error("dm injection input restore controller:","failed to get viewerId")}if(!n)return;const i=wt[n]||(wt[n]={});o((t=>{if("NAVIGATION_LOCATION_CHANGED"!==t.type)return;if(!t.nextPath.startsWith("/direct/t/"))return;const o=t.nextPath.replace("/direct/t/","");if(!o)return;const n=i[o];n&&setTimeout((()=>{const t=E.$(e.general.textarea);t&&(t.focus(),document.execCommand("insertText",!1,n))}))}));let r=null;E.onDocMutations((()=>{const o=E.$(e.general.textarea);if(!o)return;const n=t.getState().navigation.route.split("/direct/t/")[1];(i[n]||"")!==o.value&&(i[n]=o.value,clearTimeout(r),r=setTimeout((()=>{E.ls.set(Pt,wt)}),300))}))}()}};const Pt="inssist.dm.input-restore-texts";let wt={};var St={fetch:$t,fetchText:async function(...e){const t=await $t(...e);return await t.text()},fetchJson:async function(...e){const t=await $t(...e);return await t.json()},getCache:function(){return Ct},cleanCache:function(){Dt("cleaning fetcher cache"),Ct=[]},ignoreCache:function(e=1){Tt+=e},isIgnoreCache:function(){return Tt>0}};let Ct=[],Tt=0;const Mt=2e4,kt=864e5,Et=!1;async function $t(e,t={},o=Mt){return new Promise(((n,i)=>{(async()=>{let r=setTimeout((()=>{r&&(r=null,i({message:"Timed out"}))}),o);try{const o=await async function(e,t){if(Dt(`fetching ${e}`),(t=t||{}).method=t.method||"GET",t.method&&"GET"!==t.method)return fetch(e,t);if(Tt<=0){const t=Date.now();Ct=Ct.filter((e=>t-e.on<kt));const o=Ct.find((t=>t.url===e));if(o)return Dt("  fetch cache hit"),o.res.clone()}else Dt("  ignoring fetch cache");Tt>0&&Tt--;const o=await fetch(e,t);return Ct.push({url:e,on:Date.now(),res:o.clone()}),o}(e,{credentials:"include",...t});if(!r)return;if(clearTimeout(r),r=null,o.ok)return void n(o);if(400!==o.status)return void i({message:String(o.status)});try{const e=await o.text();i({message:String(o.status),body:e})}catch(e){i({message:String(o.status),body:null})}}catch(e){if(!r)return;clearTimeout(r),r=null,i(e)}})()}))}function Dt(e){Et&&console.log(`%c${e}`,"color: #00ec91")}var At=St;function It(){const e=It;return e.init||(e.init=!0,T`
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
    `),'\n    <div class="spinner-icon">\n      <svg viewBox="0 0 100 100">\n        <rect fill="#555" height="6" opacity="0.083" rx="3" ry="3" transform="rotate(-60 50 50)" width="25" x="72" y="47"/>\n        <rect fill="#555" height="6" opacity="0.166" rx="3" ry="3" transform="rotate(-30 50 50)" width="25" x="72" y="47"/>\n        <rect fill="#555" height="6" opacity="0.25" rx="3" ry="3" width="25" x="72" y="47"/>\n        <rect fill="#555" height="6" opacity="0.33" rx="3" ry="3" transform="rotate(30 50 50)" width="25" x="72" y="47"/>\n        <rect fill="#555" height="6" opacity="0.41" rx="3" ry="3" transform="rotate(60 50 50)" width="25" x="72" y="47"/>\n        <rect fill="#555" height="6" opacity="0.5" rx="3" ry="3" transform="rotate(90 50 50)" width="25" x="72" y="47"/>\n        <rect fill="#555" height="6" opacity="0.58" rx="3" ry="3" transform="rotate(120 50 50)" width="25" x="72" y="47"/>\n        <rect fill="#555" height="6" opacity="0.66" rx="3" ry="3" transform="rotate(150 50 50)" width="25" x="72" y="47"/>\n        <rect fill="#555" height="6" opacity="0.75" rx="3" ry="3" transform="rotate(180 50 50)" width="25" x="72" y="47"/>\n        <rect fill="#555" height="6" opacity="0.83" rx="3" ry="3" transform="rotate(210 50 50)" width="25" x="72" y="47"/>\n        <rect fill="#555" height="6" opacity="0.91" rx="3" ry="3" transform="rotate(240 50 50)" width="25" x="72" y="47"/>\n      </svg>\n    </div>\n  '}var Rt={init:async function(){Bt=Se.controller.getConfig().dmSelectors,async function(){const e=await Me("store"),t=await Fe("PolarisDirectActionMarkSeen");if(!e||!t)return;const o=Symbol("handled");E.onDocMutations((()=>{E.$$(Bt.leftPanel.conversationUnreadDot).forEach((n=>{if(n[o])return;n[o]=!0;const i=n.closest(Bt.leftPanel.conversationItem);if(!i)return;i.classList.add("mark-seen--unread-thread"),n.insertAdjacentHTML("afterbegin",'\n        <svg class="mark-seen" fresh xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">\n          <path fill="none" d="M0 0h30v30H0z"/>\n          <path d="M14.389 21.257l-1.688-1.725 1.846-2 .793.812 9.878-10.187a.291.291 0 01.226-.1.3.3 0 01.227.1l1.425 1.5a.359.359 0 01.008.473L16.278 21.272h-.008a1.488 1.488 0 01-.939.456 1.42 1.42 0 01-.942-.471zm-6.564 0l-4.536-4.644a.337.337 0 010-.473l1.438-1.475a.308.308 0 01.454 0l3.6 3.681 9.873-10.189a.292.292 0 01.227-.1.3.3 0 01.226.1l1.426 1.5a.362.362 0 01.008.473L9.715 21.272h-.008a1.485 1.485 0 01-.939.456 1.42 1.42 0 01-.948-.471z" fill="currentColor"/>\n        </svg>\n      ');const r=E.$(".mark-seen[fresh]");r.removeAttribute("fresh"),r.addEventListener("mousedown",(e=>{e.stopPropagation(),e.preventDefault()})),r.addEventListener("click",(async o=>{o.stopPropagation(),o.preventDefault();const n=await Lt(i);e.dispatch(t.markSeen(n.id,n.last_permanent_item,{ignoreGhostMode:!0}))}))}))})),E.insertMultistyle`
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

      .mark-seen--unread-thread:hover ${Bt.leftPanel.conversationUnreadDot} {
        background: transparent;
      }
    </style>
  `}()},getThreadDataByThreadElem:Lt};let Bt;async function Lt(e){const t=await async function(e){const t="A"===e.tagName?e:e.querySelector("a");if(t)return t.href.split("/").pop();const o=(await Me("store")).getState();return(o.navigation.route||o.navigation.displayedRoute).split("/").pop()}(e);if(!t)return null;return(await Me("store")).getState().direct.threads.get(t)||null}var Ot={init:async function(){Ft=Se.controller.getConfig().dmSelectors,we.on("dm.set-filters",Ht),E.onDocMutations((()=>{const e=E.$(Ft.leftPanel.threadList);if(!e)return;const t=""!==e.innerText;Nt.classList.toggle("dm--no-threads",!t)})),function(){const e=Symbol("handled");E.onDocMutations((()=>{const t=E.$(Ft.leftPanel.threadListWrap);t&&(t[e]||(t[e]=!0,t.insertAdjacentHTML("beforeend",'\n      <div class="dm-filters-nothing-found">\n        NOTHING FOUND\n      </div>\n    ')))})),E.insertMultistyle`
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
  `}(),async function(){const e=await Me("store");if(!e)return;const t=()=>{const t=E.$(".dm-filters-load-more__counter");if(!t)return;const o=e.getState().direct.threads.size;t.innerText=o;const n=E.$(".dm-filters-load-more__counter-row");n&&(n.style.display=o>1?null:"none")};e.subscribe(t);let o=Promise.resolve();const n=async()=>{Nt.classList.add("dm--loading-next-pages"),await o;await zt()&&(o=E.sleep(25*E.time.SECOND)),Nt.classList.remove("dm--loading-next-pages")},i=Symbol("handled");E.onDocMutations((()=>{const e=E.$(".dm-filters-nothing-found");if(!e)return;if(e[i])return;e[i]=!0,e.insertAdjacentHTML("afterend",`\n      <div class="dm-filters-load-more">\n        <div class="dm-filters-load-more__counter-row">\n          searched\n          <span class="dm-filters-load-more__counter"></span>\n          chats\n        </div>\n        <button class="dm-filters-load-more__button">\n          Search older chats\n        </button>\n        <div class="dm-filters-load-more__spinner">\n          ${It()}\n        </div>\n      </div>\n    `);E.$(".dm-filters-load-more__button").addEventListener("click",n),t()})),E.insertMultistyle`
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

      ${Ft.leftPanel.threadListWrap} {
        padding-bottom: 40px;
      }
      .dm--has-filters ${Ft.leftPanel.threadListWrap} {
        padding-bottom: 70px;
      }

      ${Ft.leftPanel.threadListSpinner} {
        margin-bottom: 30px;
      }

      .dm--has-filters ${Ft.leftPanel.threadListSpinner} {
        display: none;
      }

      .dm--has-filters ${Ft.leftPanel.conversationItemWrapSkeleton} {
        display: none;
      }
    </style>
  `}(),function(){const e=Symbol();E.onDocMutations((()=>{E.$$(Ft.leftPanel.conversationItem).forEach((async t=>{if(t[e])return;t[e]=!0;const o=await Rt.getThreadDataByThreadElem(t);if(!o)return;1===o.thread_label&&t.insertAdjacentHTML("afterend",'<div class="DmThreadFlag"></div>')}))})),E.insertMultistyle`
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
  `}()}};let Ft;const Nt=document.documentElement;async function Ht({string:e,unread:t,flagged:o}){const n=Ht,i=await Me("store");if(!i)return;i.dispatch({type:"inssist.dm.apply-filters",string:e,unread:t,flagged:o});const r=!!(e||t||o);Nt.classList.toggle("dm--has-filters",r),n.called||(n.called=!0,Nt.classList.add("dm--loading-next-pages"),await zt(),Nt.classList.remove("dm--loading-next-pages"))}async function zt(){let e=await Vt();return e&&(await E.sleep(.5*E.time.SECOND),e=await Vt()),e&&(await E.sleep(.5*E.time.SECOND),e=await Vt()),e&&(await E.sleep(.5*E.time.SECOND),e=await Vt()),e&&(await E.sleep(.5*E.time.SECOND),e=await Vt()),e}async function Vt(){const e=Vt;e.initialized||(e.initialized=!0,e.hasOlder=!0,e.cursor=null);const t=await Me("store"),o=await Me("dm-threads-normalizer");if(!t||!o)return!1;if(!e.hasOlder)return!1;let n;try{const t=E.createUrl("https://i.instagram.com/api/v1/direct_v2/inbox/",{cursor:e.cursor||null});n=await At.fetchJson(t,{headers:{"x-ig-app-id":"1217981644879628"},credentials:"include"})}catch(e){return console.error(e),!1}const{entities:i}=o(n.inbox.threads);return t.dispatch({type:"DIRECT_THREAD_LOADED",messages:i.items,threads:i.threads,users:i.users}),e.cursor=n.inbox.oldest_cursor,e.hasOlder=n.inbox.has_older,Nt.classList.toggle("dm--has-older",e.hasOlder),e.hasOlder}let Ut,Wt;async function jt(e){if(!Wt)return;const t=new Map;t.set(e,!0),Wt.forwardAction(t)}async function Gt(){(await Me("nav")).push("/direct/inbox/")}function qt(){location.reload()}var Yt={controller:{init:async function(){Ut=Se.controller.getConfig().dmSelectors,we.on("dm.start-conversation",jt),we.on("dm.go-to-inbox",Gt),we.on("dm.refresh",qt),history.pushState=history.replaceState,async function(){const e=await Me("store");if(!e)return;await E.waitFor((()=>{var t;const o=null===(t=e.getState().direct)||void 0===t?void 0:t.realtimeState;return!!o&&("subscribed"===o.irisConnectivity.toLowerCase()&&"connected"===o.mqttConnectivity.toLowerCase()&&"message"===o.subscriptionType.toLowerCase())}))||console.error("dm injection controller →","initConversationCreator:","failed to wait for webscoket to be ready");const t=await E.waitFor((()=>{const e=E.$(Ut.dialog.window);if(e)return e;const t=E.$(Ut.leftPanel.newMessageButton);t&&t.click()}),{frequency:10});if(!t)return void console.error('failed to locate "new chat" dialog');E.$$("button",t)[0].click(),Wt=await Me("dm-conversation-creator")}(),async function(){const e=await Me("nav"),t=await Me("add-dispatch-listener");if(!e||!t)return;(async()=>{if("v1"===window.inssist.igBundleVersion){const t=e.push;return void(e.push=e=>{if(e.startsWith("/direct/"))return t(e);we.send("dm.ig-go",e)})}const t=await Me("nav-interceptor");t&&t.beforeGo(((e,t)=>{t.startsWith("/direct/")||(e(),we.send("dm.ig-go",t))}))})();{let e;E.insertMultistyle`
      <style>
        ${Ut.general.postViewerModal} {
          display: none;
        }
      </style>
    `;const o=Symbol("handled");E.onDocMutations((()=>{E.$$(Ut.general.postPreview).forEach((t=>{t[o]||(t[o]=!0,t.addEventListener("click",(()=>{e=t;const o=t.getAttribute("post-url");o&&we.send("dm.ig-go",o)})))}))})),t((async t=>{if("POST_PAGE_LOADING"!==t.type)return;const o=`/p/${t.shortcode}`;if(we.send("dm.ig-go",o),!e)return;e.setAttribute("post-url",o);(await E.waitFor((()=>E.$$(Ut.general.portal)))).forEach((e=>e.style.display="none"))})),t((e=>{"POST_PAGE_LOADED_V2"===e.type&&(e.type="none")}))}}(),async function(){const e=await Me("dm-delta-parser",15e3);if(!e)return;const t=e.parseDeltaItem;e.parseDeltaItem=(...o)=>{const n=E.safeJsonParse(o[0]);return n&&12e3===n.ttl&&(n.ttl=5e3,o[0]=JSON.stringify(n)),t.call(e,...o)}}(),function(){const e=Symbol("handled");E.onDocMutations((()=>{E.$$("a").forEach((t=>{if(t[e])return;t[e]=!0;t.getAttribute("href").includes("instagram.com")||t.setAttribute("target","_blank")}))}))}(),function(){const e=Symbol("handled");E.onDocMutations((async()=>{const t=E.$(Ut.general.mediaViewerImage)||E.$(Ut.general.mediaViewerVideo);if(E.docElem.classList.toggle("media-viewer--open",!!t),!t)return;const o=t.closest(Ut.dialog.root);if(!o)return;if(o[e])return;o[e]=!0;const n=await E.waitFor((()=>{var e;return t.getAttribute("src")||(null===(e=t.querySelector("source"))||void 0===e?void 0:e.getAttribute("src"))}));o.insertAdjacentHTML("beforeend",`\n      <div class="media-viewer-controls">\n        <a class="media-viewer-controls__button media-viewer-controls__button_open" href="${n}" target="_blank">\n          <svg\n            class="media-viewer-controls__button-icon"\n            xmlns="http://www.w3.org/2000/svg"\n            width="32"\n            height="32"\n            viewBox="0 0 32 32">\n            <defs>\n              <clipPath id="a">\n                <path fill="none" d="M0 0h32v32H0z"/>\n              </clipPath>\n            </defs>\n            <g clip-path="url(#a)">\n              <path fill="none" d="M0 0h32v32H0z"/>\n              <path d="M10.493 22V12h6l-2 2h-2v6h6v-2l2-2v6zm4.149-5.847L19.793 11h-3.3V9.5h6.508v6.453h-1.508V12.7l-5.151 5.152z" fill="currentColor"/>\n            </g>\n          </svg>\n        </a>\n        <div class="media-viewer-controls__button media-viewer-controls__button_close">\n          <svg\n            class="media-viewer-controls__button-icon"\n            xmlns="http://www.w3.org/2000/svg"\n            width="34"\n            height="34"\n            viewBox="0 0 40 40">\n            <path d="M0 0h40v40H0z" fill="transparent"/>\n            <path d="M12.626 25.797l6.062-6.061-6.062-6.061 1.313-1.313L20 18.424l6.061-6.062 1.313 1.313-6.06 6.062 6.06 6.06-1.313 1.313-6.062-6.06-6.06 6.06z" fill="currentColor"/>\n          </svg>\n        </div>\n      </div>\n    `);const i=E.$(".media-viewer-controls__button_open");i.addEventListener("mousedown",(e=>{window.open(i.href)}));E.$(".media-viewer-controls__button_close").addEventListener("click",(()=>{const e=document.createEvent("MouseEvents");e.initMouseEvent("mousedown",!0),o.dispatchEvent(e)}))})),E.insertMultistyle`
    <style>
      .media-viewer--open ${Ut.dialog.window} {
        max-width: none;
        max-height: none;
        border-radius: 0;
      }

      .media-viewer--open ${Ut.dialog.window} * {
        border-radius: 0;
        background-color: transparent;
      }

      .media-viewer--open ${Ut.dialog.mediaViewerCloseButton} {
        display: none;
      }

      ${Ut.general.mediaViewerContainer} {
        width: calc(100vw - 100px);
        height: calc(100vh - 100px);
      }

      ${Ut.general.mediaViewerImage},
      ${Ut.general.mediaViewerVideo} {
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
  `}(),function(){const e=Symbol("handled"),t=document.documentElement;E.onDocMutations((()=>{const t=E.$(Ut.dialog.searchRow);t&&(t[e]||(t.scrollLeft=0))})),E.onDocMutations((()=>{E.$$(Ut.general.iconButton).forEach((t=>{if(t[e])return;t[e]=!0;"0px"===getComputedStyle(t).padding&&t.classList.add("icon-button-with-hitbox")}))})),E.onDocMutations((()=>{const t=E.$(Ut.leftPanel.requestsTabText);if(!t)return;if(t[e])return;t[e]=!0;const o=Number(t.innerText.replace(/\D/g,""));t.innerHTML=`\n      <span class="requests-tab-plus">+</span>\n      ${o||""}\n    `})),E.onDocMutations((()=>{const e=!!E.$(Ut.leftPanel.requestsDescription);t.classList.toggle("is-requests-page",e)})),E.onDocMutations((()=>{const e=!!E.$(Ut.leftPanel.folderTab);t.classList.toggle("has-folder-tabs",e)})),E.onDocMutations((()=>{const t=E.$$(Ut.leftPanel.subheaderWhenNoFolders).find((t=>!t[e]));if(!t)return;if(t[e])return;E.$$(Ut.leftPanel.subheaderWhenNoFolders).forEach((t=>t[e]&&t.remove())),t[e]=!0;const o=E.$(Ut.general.reactRoot);o&&o.appendChild(t)})),E.insertMultistyle`
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

      ${Ut.general.page} {
        padding-top: 0;
      }

      ${Ut.general.header} {
        display: none;
      }

      ${Ut.general.errorReportPixel} {
        display: none;
      }

      .theme-night ${Ut.general.blueButton} {
        color: #000;
      }

      ${Ut.general.postActionsTooltipMe} {
        transform: translateX(20%) scale(0.65);
        transform-origin: right bottom;
      }

      ${Ut.general.postActionsTooltipPeer} {
        transform: translateX(-20%) scale(0.65);
        transform-origin: left bottom;
      }

      ${Ut.general.postActionsTooltipTail} {
        display: none;
      }

      ${Ut.general.threadHeader} {
        height: 51px;
      }

      ${Ut.general.threadDetailsHeader} {
        height: 51px;
      }

      ${Ut.general.threadDetailsMuteSection} {
        padding: 16px 12px;
      }

      ${Ut.general.content} {
        height: 100vh;
      }

      ${Ut.general.navigation} {
        display: none;
      }

      ${Ut.general.main} {
        max-height: 100%;
      }

      html.has-folder-tabs:not(.is-requests-page) ${Ut.leftPanel.header} {
        height: 0;
        border-bottom: none;
      }

      ${Ut.leftPanel.subheaderWhenNoFolders} {
        display: none;
      }
      ${Ut.leftPanel.subheaderWhenNoFolders} * {
        padding: 0;
      }
      html.is-requests-page ${Ut.leftPanel.subheaderWhenNoFolders} {
        display: none;
      }

      html.has-folder-tabs ${Ut.leftPanel.newMessageButton} {
        top: 25px;
      }

      ${Ut.leftPanel.tabsContainer} {
        margin-right: 64px;
      }

      ${Ut.leftPanel.folderTab} {
        font-size: 12px;
        padding: 8px 4px 0 4px;
        position: relative;
        flex-grow: 0;
        margin-right: 12px;
      }
      ${Ut.leftPanel.folderTab}:first-child {
        margin-left: 17px;
      }
      ${Ut.leftPanel.folderTab}:last-child {
        margin-right: 0;
      }

      /* hitbox for folder tabs */
      ${Ut.leftPanel.folderTab}::before {
        content: '';
        position: absolute;
        top: 0;
        left: -6px;
        right: -6px;
        bottom: 0;
      }

      ${Ut.leftPanel.folderTabsContainer} {
        width: auto;
        overflow: hidden;
        flex: initial;
      }

      ${Ut.leftPanel.folderTabGeneral} {
        overflow: hidden;
        text-overflow: ellipsis;
        flex-grow: 1;
        display: block;
      }

      ${Ut.leftPanel.requestsTab} {
        margin-left: 12px;
        padding: 0;
      }

      ${Ut.leftPanel.requestsTabText} {
        display: flex;
        font-size: 14px;
        font-weight: 600;
        padding: 18px 4px 15px 4px;
        position: relative;
      }

      /* hitbox for requests tab */
      ${Ut.leftPanel.requestsTabText}::before {
        content: '';
        position: absolute;
        top: 0;
        left: -6px;
        right: -6px;
        bottom: 0;
      }

      ${Ut.leftPanel.requestsTabContainer} {
        width: auto;
      }

      ${Ut.dialog.root} {
        background: rgba(255, 255, 255, 0.96);
      }

      ${Ut.dialog.background} {
        background: transparent;
      }

      ${Ut.dialog.window} {
        box-shadow: 0 0px 12px rgba(0, 0, 0, 0.1);
        border-radius: 12px;
      }

      ${Ut.dialog.searchRow} {
        overflow-x: hidden;
      }

      ${Ut.dialog.searchRowLabel} {
        justify-content: center;
      }

      ${Ut.dialog.header} {
        padding-right: 12px;
        padding-left: 12px;
      }

      .theme-night ${Ut.general.emojiPicker} {
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

      ${Ut.general.accountSwitcher} {
        display: none;
      }
    </style>
  `}(),Object.defineProperty(Object.prototype,"maxRows",{get:()=>20,set:()=>!0}),document.addEventListener("keydown",(e=>{if("Enter"!==e.key)return;const t=E.$(Ut.dialog.submitButton);t&&t.click()})),E.insertMultistyle`
    <style>
      ${Ut.leftPanel.switchAccountButton} {
        display: none;
      }
    </style>
  `,async function(){const e=await Me("add-dispatch-listener");if(!e)return;e((e=>{"DIRECT_MESSAGE_UPDATED"===e.type&&(e.mutationToken||we.send("dm.message-sent"))}))}(),vt.init(),_t.init(),xt.init(),Ot.init(),Rt.init(),yt.controller.init()}}},Xt={init:async function(){if((await E.waitFor((()=>document.documentElement))).classList.contains("touch"))return;if(window.opener&&location.pathname.startsWith("/accounts/login/"))return;(await E.waitFor((()=>document.body))).insertAdjacentHTML("beforeend",`\n    <button class="open-in-inssist open-in-inssist_below">\n      <div class="open-in-inssist__main">\n        <img class="open-in-inssist__icon" src="${window.inssist.url("/img/icon-128.png")}"/>\n        <span class="open-in-inssist__label">OPEN</span>\n      </div>\n      <div class="open-in-inssist__smile">\n        <span class="open-in-inssist__smile-icon">🍓</span>\n        <span class="open-in-inssist__smile-text">&nbsp;</span>\n        \x3c!-- <span class="open-in-inssist__smile-icon">${function(){const e=Array.from(Kt).filter((e=>e.trim().length>0)),t=Math.floor(Date.now()/E.time.DAY)%e.length;return e[t]}()}</span> --\x3e\n        \x3c!-- <span class="open-in-inssist__smile-text">smile of the day</span> --\x3e\n      </div>\n    </button>\n  `);const e=E.$(".open-in-inssist");setTimeout((()=>{e.classList.remove("open-in-inssist_below")}),300),e.addEventListener("click",(e=>{e.preventDefault(),e.stopPropagation(),E.setCookie("open-in-inssist",location.pathname)}),!0),E.onDocMutations((()=>{e.classList.toggle("open-in-inssist_hidden",!("www.instagram.com"===location.host||"instagram.com"===location.host))})),E.insertMultistyle`
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
  `}};const Kt="\n  🤯🤗🧐🙃😝🤒🤓😑😊😯🙂🤧🥳\n  😬🥰🤪🤨😘🥴🤣😄😀😶😚😖😋\n  😛😵😜😷😴🤔😐😗😃😁🥶🤑😎\n  😉🤫😳😡😱😤😍🤩🤐🤭😇😅😲\n  😂😏😙😆🙄😌😮🥺😈🤤\n";var Jt={controller:Xt};let Qt,Zt;function eo(e){E.ls.set("inssist.tagAssist.collections",e)}function to(){return E.ls.get("inssist.tagAssist.collections",[])}var oo={controller:{init:async function(){if(Qt=await Me("store"),Zt=await Me("add-dispatch-listener"),!Qt||!Zt)return;we.on("tag-assist.save-collections-to-ls",eo),we.on("tag-assist.read-collections-from-ls",to),async function(){Zt((e=>{"CREATION_CAPTION_CHANGED"===e.type&&we.send("tag-assist.ig-caption-change",e.caption)}))}()}}};async function no(){const e=await h((()=>document.body));return!e.querySelector("#react-root")&&!e.querySelector('body > div[id*="mount"]')}function io(e){try{return encodeURIComponent(e)}catch(t){throw new Error(`failed to encode ${e}`)}}var ro={controller:{init:function(){!async function(){if(await no())return;const e=await Me("config"),t=await Me("cookies-controller");if(!e||!t)return;t.setCookie=(t,o,n={})=>{if(e.needsToConfirmCookies()&&"ig_cb"!==t)return;const i={path:"/",...n};null===o&&(i.maxage=-1);let r=`${io(t)}=${io(o)}`;i.maxage&&(i.expires=new Date(Date.now()+i.maxage)),i.path&&(r+=`; path=${i.path}`),i.domain&&(r+=`; domain=${i.domain}`),i.expires&&(r+=`; expires=${i.expires.toUTCString()}`),document.cookie=`${r}; SameSite=none; secure`}}()}}},ao=function(){C`
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
  `,function(){const e=Se.controller.getConfig().fcsSelectors,n=Se.controller.getConfig().dmSelectors,i=Se.controller.getConfig().igSelectors;x((function e(o){const n=t("body");if(!n)return;x.off(e);new MutationObserver(a).observe(n,{childList:!0,subtree:!0}),a(o)}));let r=!1;function a(a){if(r)return;const s=a.map((e=>Array.from(e.addedNodes))).flat();if(0===s.length)return;const l=window.inssist.theme.emojiRegex,c=(t("body").innerText.match(l)||[]).filter((e=>!"0123456789#*↪".includes(e)));if(0===c.length)return;const d=[],p=Array.from(new Set(c)),u=["input","textarea","[contenteditable]",n.general.emojiPicker,i.general.postCaption,e.sidePanel.postPreviewCaption].map((e=>o(e))).flat();s.forEach((e=>{let t;if(t=e.nodeType===Node.ELEMENT_NODE?e:e.parentElement,!t)return;const o=document.createTreeWalker(t,NodeFilter.SHOW_TEXT);for(;;){const e=o.nextNode();if(!e)break;const t=e.textContent;if(!p.some((e=>t.includes(e))))continue;if(u.some((t=>t.contains(e))))continue;const n=e.parentElement;n.classList.contains("emoji")||(d.includes(n)||d.push(n))}})),requestAnimationFrame((()=>{r=!0,d.forEach((e=>{if(!document.body.contains(e))return;let t=e.innerHTML;p.forEach((e=>{const o=`<span class="emoji">${e}</span>`;t=t.split(o).join("__$%#^__").split(e).join(o).split("__$%#^__").join(o)})),e.innerHTML=t})),r=!1}))}}()};function so(e){e&&(g.classList.remove("theme-day"),g.classList.remove("theme-night"),g.classList.add(`theme-${e}`))}var lo={init:function(){!async function(){so(await we.send("theme.get-theme"))}(),async function(){we.on("theme.switch-theme",(e=>{so(e)}))}(),ao()}},co={init:function(){po=Se.controller.getConfig().igSelectors,window.inssist.moduleInterceptor.registerReduxAction("inssist.cover-assist.set-cover",((e,t)=>({...e,creation:{...e.creation,coverPhoto:{...e.creation.coverPhoto,file:t.file,dataURL:t.url}}}))),async function(){let e=null;const t=await Me("store");if(!t)return;we.on("cover-assist.synch-cover",(o=>{if(!E.$(po.postCreation.previewPostImage))return;const n=t.getState();o?(n.creation.sessionId!==e&&(e=n.creation.sessionId,uo={url:n.creation.coverPhoto.dataURL,blob:n.creation.coverPhoto.file}),t.dispatch({type:"inssist.cover-assist.set-cover",url:URL.createObjectURL(o),file:o})):n.creation.sessionId===e&&t.dispatch({type:"inssist.cover-assist.set-cover",url:uo.url,file:uo.blob})}))}(),we.on("cover-assist.get-default-ig-cover-url",go)}};let po,uo=null;async function go(){var e,t;const o=await Me("store");return o?uo?uo.url:null===(e=o.getState().creation)||void 0===e||null===(t=e.coverPhoto)||void 0===t?void 0:t.dataURL:null}var ho={controller:co};const fo={init:function(){this.video=null,this.audio=null,this.overlay=null,this.helpers=null,this.musicUrl=null,this.musicStart=0,this.musicVolume=0,this.videoVolume=0,this.onVideoResize=this.onVideoResize.bind(this),this.onWindowResize=this.onWindowResize.bind(this),this.videoResizeObserver=null,this.autoRegister(),this.handleDataUpdates()},autoRegister:function(){x((()=>{const e=t("video[music-assist-player]");e&&!this.video?this.register(e):!e&&this.video&&this.unregister()}))},handleDataUpdates:function(){s.isIframe()?we.on("music-assist.update-player-data",this.applyData.bind(this)):Qe.on("music-assist.update-player-data",this.applyData.bind(this))},register:function(e){document.head.insertAdjacentHTML("beforeend",`\n      <style class="MusicAssistPlayer__style">\n        ${this.getStyles()}\n      </style>\n    `),document.body.insertAdjacentHTML("afterend",'\n      <div class="MusicAssistPlayer__helpers">\n        <audio class="MusicAssistPlayer__audio"></audio>\n        <div class="MusicAssistPlayer__overlay">\n          <div class="MusicAssistPlayer__spinner"></div>\n          <div class="MusicAssistPlayer__pause"></div>\n        </div>\n      </div>\n    '),this.video=e,this.audio=document.querySelector(".MusicAssistPlayer__audio"),this.style=document.querySelector(".MusicAssistPlayer__style"),this.overlay=document.querySelector(".MusicAssistPlayer__overlay"),this.helpers=document.querySelector(".MusicAssistPlayer__helpers"),this.musicUrl&&(this.audio.src=this.musicUrl),this.audio.volume=this.musicVolume,this.video.volume=this.videoVolume,this.videoResizeObserver=new ResizeObserver(this.onVideoResize),this.videoResizeObserver.observe(this.video),window.addEventListener("resize",this.onWindowResize),this.updateOverlayPosition(),setTimeout((()=>this.updateOverlayPosition()),300),setTimeout((()=>this.updateOverlayPosition()),1e3),this.startMusicAndVideoSync(),this.video.addEventListener("play",(()=>{this.startMusicAndVideoSync()})),this.video.addEventListener("timeupdate",(()=>{this.video&&(s.isIframe()?we.send("music-assist.set-video-current-time",this.video.currentTime):Qe.send("music-assist.set-video-current-time",this.video.currentTime))}))},unregister:function(){this.style.remove(),this.helpers.remove(),this.video=null,this.audio=null,this.style=null,this.overlay=null,this.helpers=null,this.videoResizeObserver.disconnect(this.video),this.videoResizeObserver=null,window.removeEventListener("resize",this.onWindowResize),this.stopMusicAndVideoSync()},applyData:function({isStory:e,musicUrl:t,musicStart:o,musicVolume:n,videoVolume:i}){if(!this.video)return this.musicUrl=t,this.musicStart=o,this.musicVolume=n,void(this.videoVolume=i);this.musicVolume=n,this.videoVolume=i,t&&(this.audio.volume=n),!t&&e||(this.video.volume=i),this.musicUrl!==t&&(this.musicUrl=t,t?(this.audio.src=t,this.video.currentTime=0,this.video.play()):(this.audio.pause(),this.audio.removeAttribute("src"),this.video.currentTime=0,this.video.pause())),this.musicStart!==o&&(this.musicStart=o,t&&(this.video.currentTime=0,this.video.play())),t?this.startMusicAndVideoSync():this.stopMusicAndVideoSync()},onVideoResize:function(){this.updateOverlayPosition()},onWindowResize:function(){this.updateOverlayPosition()},updateOverlayPosition:function(){if(!this.video)return;if(!this.overlay)return;const e=this.video.getBoundingClientRect();this.overlay.style.top=`${e.top}px`,this.overlay.style.left=`${e.left}px`,this.overlay.style.width=`${e.width}px`,this.overlay.style.height=`${e.height}px`},startMusicAndVideoSync:function(){if(!this.musicUrl)return;if(this.syncEnabled)return;this.video.paused||setTimeout((()=>{this.video.currentTime=this.video.currentTime,this.video.play()}),100),this.syncEnabled=!0;const e=this.video,t=this.audio;let o,n;this.onPauseClick=()=>{this.playing=!1,document.documentElement.classList.toggle("MusicAssistPlayer--playing",this.playing)},document.querySelector(".MusicAssistPlayer__pause").addEventListener("click",this.onPauseClick),this.playing=!1,this.ignoreSyncOnPlay=!1,this.ignoreSyncOnPause=!1,this.ignoreSyncOnSeeking=!1,this.ignoreAudioPause=!1,this.onVideoPause=()=>{this.ignoreSyncOnPause?this.ignoreSyncOnPause=!1:(this.playing=!1,document.documentElement.classList.toggle("MusicAssistPlayer--playing",this.playing),i("pause"))},e.addEventListener("pause",this.onVideoPause),this.onVideoPlay=()=>{this.ignoreSyncOnPlay?this.ignoreSyncOnPlay=!1:(this.playing=!0,document.documentElement.classList.toggle("MusicAssistPlayer--playing",this.playing),i("play"))},e.addEventListener("play",this.onVideoPlay),this.onVideoSeeking=()=>{this.ignoreSyncOnSeeking?this.ignoreSyncOnSeeking=!1:i("seeking")},e.addEventListener("seeking",this.onVideoSeeking),e.pauseNoSync=()=>{e.paused||(this.ignoreSyncOnPause=!0,e.pause())},e.playNoSync=()=>{e.paused&&(this.ignoreSyncOnPlay=!0,e.play())};const i=i=>{clearTimeout(n),n=setTimeout((async()=>{if(clearTimeout(o),!this.video)return;if(!this.audio)return;if(!this.musicUrl)return;e.pauseNoSync(),t.pauseNoSync();const n=e.currentTime;this.ignoreSyncOnSeeking=!0,e.currentTime=n,t.currentTime=this.musicStart+n,o=setTimeout((()=>{document.documentElement.classList.add("MusicAssistPlayer--loading")}),300);const i=new Promise((e=>t.oncanplay=e)),r=new Promise((t=>e.oncanplay=t));await Promise.all([i,r]),clearTimeout(o),document.documentElement.classList.remove("MusicAssistPlayer--loading"),this.playing&&(e.playNoSync(),(!t.ended||t.currentTime<t.duration)&&t.play())}))};t.pauseNoSync=()=>{t.paused||(this.ignoreAudioPause=!0,t.pause())},this.audioOnPause=()=>{this.ignoreAudioPause?this.ignoreAudioPause=!1:t.ended||e.pauseNoSync()},t.addEventListener("pause",this.audioOnPause)},stopMusicAndVideoSync:function(){this.syncEnabled=!1,document.documentElement.classList.toggle("MusicAssistPlayer--playing",!1),document.documentElement.classList.toggle("MusicAssistPlayer--loading",!1),this.video&&(this.video.removeEventListener("pause",this.onVideoPause),this.video.removeEventListener("play",this.onVideoPlay),this.video.removeEventListener("seeking",this.onVideoSeeking)),this.audio&&this.audio.removeEventListener("pause",this.audioOnPause);const e=document.querySelector(".MusicAssistPlayer__pause");e&&e.removeEventListener("click",this.onPauseClick)},getStyles:function(){return'\n      <style>\n        /* hide native spinner */\n        video[music-assist-player]::-webkit-media-controls {\n          visibility: hidden;\n        }\n        video[music-assist-player]::-webkit-media-controls-enclosure {\n          visibility: visible;\n        }\n\n        .MusicAssistPlayer__overlay {\n          position: fixed;\n          display: flex;\n          align-items: center;\n          justify-content: center;\n          pointer-events: none;\n          overflow: hidden;\n        }\n        html.theme-night .MusicAssistPlayer__overlay {\n          filter: url(#theme-reverse-filter); /* for injection */\n        }\n\n        .MusicAssistPlayer__spinner {\n          --size: 40px;\n          --thickness: 3px;\n          --color-bg: transparent;\n          --color-value: #fff;\n          width: var(--size);\n          height: var(--size);\n          border-radius: 50%;\n          border-top: var(--thickness) solid var(--color-bg);\n          border-right: var(--thickness) solid var(--color-value);\n          border-bottom: var(--thickness) solid var(--color-value);\n          border-left: var(--thickness) solid var(--color-value);\n          animation: MusicAssistPlayer__rotate 0.9s infinite linear;\n          filter:  drop-shadow(0 0 1px rgba(0, 0, 0, 0.16));\n          margin-top: -20px;\n        }\n        .MusicAssistPlayer__spinner::after {\n          width: 100%;\n          height: 100%;\n          border-radius: 50%;\n        }\n        html:not(.MusicAssistPlayer--loading) .MusicAssistPlayer__spinner {\n          display: none;\n        }\n        @keyframes MusicAssistPlayer__rotate {\n          0% { transform: rotate(0deg); }\n          100% { transform: rotate(360deg); }\n        }\n\n        .MusicAssistPlayer__pause {\n          width: 36px;\n          height: 36px;\n          position: absolute;\n          left: 6px;\n          bottom: 30px;\n          border-radius: 50%;\n          cursor: pointer;\n          pointer-events: all;\n          background-size: 20px;\n          background-repeat: no-repeat;\n          background-position: center;\n          background-image: url("data:image/svg+xml;base64,PHN2ZyBmaWxsPSJXaW5kb3ciIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogICAgPHBhdGggZD0iTTYgMTloNFY1SDZ2MTR6bTgtMTR2MTRoNFY1aC00eiIvPgogICAgPHBhdGggZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSIvPgo8L3N2Zz4K");\n          transition: background-color 0.3s;\n          display: none;\n        }\n        .MusicAssistPlayer__pause:hover {\n          background-color: #212123;\n        }\n        html.MusicAssistPlayer--loading.MusicAssistPlayer--playing .MusicAssistPlayer__pause {\n          display: block;\n        }\n        /* hide native pause button  */\n        html.MusicAssistPlayer--loading.MusicAssistPlayer--playing video::-webkit-media-controls-play-button {\n          visibility: hidden;\n        }\n      </style>\n    '.replace("<style>","").replace("</style>","")}},mo={init:function(){this._addMusicToVideoBeforeUpload()},_addMusicToVideoBeforeUpload:function(){Ne.define("addMusic",(async e=>{if(!await we.send("music-assist.should-generate-video"))return;const t=await we.send("music-assist.generate-video",e[0].file);t&&(e[0].file=t,e[0].dataURL=URL.createObjectURL(t))}))}},yo={init:async function(){this.sel=Se.controller.getConfig().igSelectors,this.state={selectedTrackName:null},this.createPill(),this.insertStyles(),this.handlePillClicks(),this.updateUiWhenNeeded(),this.registerVideoPlayer(),this.resetStateOnCreationSessionStart()},createPill:function(){const e=Symbol("handled");E.onDocMutations((()=>{const t=E.$(".StoryAssistToggleButton_video");t&&(t[e]||(t[e]=!0,t.insertAdjacentHTML("beforebegin",this.renderPill())))}))},handlePillClicks:function(){E.docElem.addEventListener("click",(e=>{if(e.target.closest(".MusicAssistStoryPill__cancel"))return void we.send("new-post-extra.cancel-click","music-assist");e.target.closest(".MusicAssistStoryPill")&&we.send("music-assist.open-for-story-creation")}))},updateUiWhenNeeded:function(){we.on("new-post-extra.update-pill-music",(({name:e})=>{this.state.selectedTrackName=e,this.updateUi()}))},updateUi:function(){const e=E.$(".MusicAssistStoryPill");e&&(e.outerHTML=this.renderPill()),E.docElem.classList.toggle("MusicAssist--hasSelectedTrack",!!this.state.selectedTrackName)},registerVideoPlayer:function(){const e=Symbol("handled");E.onDocMutations((()=>{const t=E.$(this.sel.storyCreation.video);t&&(t[e]||(t[e]=!0,t.setAttribute("music-assist-player","")))}))},resetStateOnCreationSessionStart:function(){Qe.on("ig.creation-session-start",(()=>{this.state.selectedTrackName=null,this.updateUi()}))},renderPill:function(){return`\n      <div class="\n        MusicAssistStoryPill\n        ${this.state.selectedTrackName?"":"MusicAssistStoryPill_empty"}\n      ">\n        <svg class="MusicAssistStoryPill__icon" viewBox="0 0 24 24">\n          <path d="M0 0h24v24H0Z" fill="none"/>\n          <path d="M18.5 5.438a.937.937 0 0 0-1.22-.893L7.906 7.313a.937.937 0 0 0-.656.893v7.658a4.052 4.052 0 0 0-.937-.115c-1.554 0-2.813.84-2.813 1.875s1.259 1.877 2.812 1.877 2.812-.839 2.812-1.875v-6.847l7.5-2.2v5.41a4.052 4.052 0 0 0-.937-.115c-1.553 0-2.812.839-2.812 1.875s1.259 1.875 2.812 1.875 2.813-.839 2.813-1.875V5.438Z" fill="currentColor"/>\n        </svg>\n        <div class="MusicAssistStoryPill__text">\n          ${this.state.selectedTrackName}\n        </div>\n        <div class="MusicAssistStoryPill__cancel">\n          <svg width="8" height="8" viewBox="0 0 8 8">\n            <path d="M6.5-.001 4 2.499l-2.5-2.5-1.5 1.5 2.5 2.5-2.5 2.5 1.5 1.5 2.5-2.5 2.5 2.5 1.5-1.5-2.5-2.5 2.5-2.5Z" fill="currentColor"/>\n          </svg>\n        </div>\n      </div>\n    `},insertStyles:function(){E.insertMultistyle`
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
    `}};var vo={init:function(){fo.init(),mo.init(),yo.init()}};const bo=$.selectors,{$:_o}=E;var xo={init:async function(){if(Po=await Me("http"),wo=await Me("add-dispatch-listener"),!Po||!wo)return;const e=await E.waitFor((()=>window.inssist.desktopReelsData));Object.assign(So,e),function(){const e=Symbol("handled");E.onDocMutations((()=>{if(!So.creatingReels)return;if(!!(!_o(bo.uploadForm)&&!_o(bo.creationBodyRight)))return;const t=_o(bo.modalTitle);if(t){if(t[e])return;t[e]=!0,t.innerText="New Reel / POWERED BY YEZER"}const o=_o(bo.creationDndText);if(o){if(o[e])return;o[e]=!0,o.innerText="Drag video for your Reel here."}const n=_o(bo.creationDndIcon);if(n){if(n[e])return;n.setAttribute("width","77"),n.setAttribute("height","77"),n.setAttribute("viewBox","0 0 24 24"),n.innerHTML='\n        <path\n          d="M15.548 14.007l-.006-.005-.006-.004-4.696-2.73s0 0 0 0a.736.736 0 00-.381-.113.73.73 0 00-.373.108c-.262.11-.407.371-.407.662v5.464c0 .262.155.511.398.658h0l.009.004a.899.899 0 00.352.098.88.88 0 00.314-.069l.063-.022.012-.004.012-.006 4.697-2.732h0l.001-.001a.743.743 0 00.357-.658c0-.259-.152-.505-.346-.65zM20.764 3.85h0l-.003-.004c-.534-.513-1.125-.945-1.943-1.247-.816-.301-1.85-.47-3.264-.47h-6.5c-1.394 0-2.417.169-3.233.476-.818.307-1.42.75-1.974 1.283h0l-.003.004C3.33 4.428 2.9 5.02 2.599 5.834c-.3.812-.469 1.837-.469 3.234v6.514c0 1.396.169 2.432.475 3.255.306.824.748 1.428 1.282 1.964l.002.002c.534.513 1.126.945 1.943 1.246.816.302 1.85.47 3.264.47h6.5c1.394 0 2.428-.168 3.249-.475.823-.307 1.425-.75 1.96-1.285l.001-.002c.513-.535.944-1.128 1.245-1.947.3-.817.469-1.853.469-3.27V9.068c0-1.397-.169-2.422-.475-3.24-.306-.819-.748-1.422-1.28-1.977zm-5.168-.2c1.31 0 2.174.166 2.788.41.612.244.985.567 1.314.896.466.468.897 1.045 1.149 2.216h-3.665L15.19 3.65h.406zm-6.948 0h4.734l1.991 3.522H10.64L8.648 3.65zM4.952 4.957c.435-.436.982-.87 2.065-1.12l1.897 3.336h-5.11c.25-1.17.682-1.748 1.148-2.216zm16.05 10.667c0 1.313-.167 2.178-.41 2.794-.243.613-.565.987-.894 1.316-.328.33-.712.652-1.33.896-.62.244-1.482.411-2.772.411H9.054c-1.31 0-2.174-.167-2.788-.411-.612-.243-.985-.566-1.314-.896a3.699 3.699 0 01-.893-1.332c-.244-.62-.41-1.486-.41-2.778v-6.93h17.353v6.93z"\n          fill="currentColor"\n          stroke="#FFF"\n          stroke-width=".8"\n        />\n      '}})),E.insertMultistyle`
    <style>
      .reels--creating ${bo.creationCarouselAddMediaButton},
      .reels--creating ${bo.creationGeoOption},
      .reels--creating ${bo.creationAccessibilityDropdown},
      .reels--creating ${bo.creationAdvancedDropdown},
      .reels--creating ${bo.creationDropdown},
      .reels--creating ${bo.creationBottomHr} {
        display: none !important;
      }
    </style>
  `}(),Le.patchHttp(Po,{isCreatingReels:()=>So.creatingReels,isSharingToFeed:()=>So.shareToFeed,onSuccess:()=>{true||(So.freeReels-=1),E.setCookie("desktop-reels.submit-success",1)}}),function(){const e=Symbol("handled");E.onDocMutations((async()=>{if(!So.creatingReels)return;const t=_o(bo.creationRatioToggler);if(!t)return;if(t[e])return;t[e]=!0,t.click();const o=await E.waitFor((()=>_o(bo.creationRatioOptionVertical)),{timeout:1e3,frequency:10});o&&(o.click(),t.click())}))}(),function(){const e=Symbol("handled");E.onDocMutations((()=>{if(!So.creatingReels)return;const t=_o(bo.creationAccessibilityDropdown);if(!t)return;if(t[e])return;t[e]=!0,t.insertAdjacentHTML("beforebegin",'\n      <div class="ShareToFeed">\n        <div class="ShareToFeed__switch">\n          <div class="ShareToFeed__switchLabel">\n            Also Share to Feed\n          </div>\n          <div class="ShareToFeed__switchControl"></div>\n        </div>\n      </div>\n    ');const o=_o(".ShareToFeed");o.addEventListener("click",(()=>{So.shareToFeed=!So.shareToFeed,o.classList.toggle("ShareToFeed_on",So.shareToFeed)}))})),E.insertMultistyle`
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
  `}(),function(){if(true)return;const e=Symbol("handled");E.onDocMutations((()=>{if(!So.creatingReels)return;if(!_o(bo.creationNextButton))return;const t=_o(bo.creationBody);if(!t)return;if(t[e])return;t[e]=!0,t.insertAdjacentHTML("beforebegin",`\n      <div class="ReelsUpgradeToProBar">\n        <div class="ReelsUpgradeToProBar__text">\n          Free Reels Remaining: ${So.freeReels} / ${So.maxFreeReels}\n        </div>\n        <button class="ReelsUpgradeToProBar__button">\n          Get Unlimited Reels\n        </button>\n      </div>\n    `);_o(".ReelsUpgradeToProBar__button").addEventListener("click",(()=>{E.setCookie("desktop-reels.open-billing","keep-ig-tab")}))})),E.insertMultistyle`
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
  `}(),function(){if(true)return;const e=Symbol("handled");E.onDocMutations((()=>{if(So.freeReels>0)return;if(!So.creatingReels)return;const t=_o(bo.creationDndBody);if(!t)return;if(t[e])return;t[e]=!0,t.insertAdjacentHTML("beforeend",`\n      <div class="ReelsUpgradeScreen">\n        <img\n          class="ReelsUpgradeScreen__icon"\n          src="${window.inssist.url("img/rocket.png")}"/>\n        <div class="ReelsUpgradeScreen__text">\n          Reels posting is a PRO feature POWERED BY YEZER.<br/>\n          Please consider upgrading to continue posting Reels.\n        </div>\n        <button class="ReelsUpgradeScreen__button">\n          UPGRADE TO PRO\n        </button>\n      </div>\n    `);_o(".ReelsUpgradeScreen__button").addEventListener("click",(()=>{E.setCookie("desktop-reels.open-billing",1)}))})),E.insertMultistyle`
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
  `}(),function(){if(true)return;const e=Symbol("handled");E.onDocMutations((()=>{if(!So.creatingReels)return;if(So.freeReels>0)return;if(!_o(".ShareToFeed"))return;const t=_o(bo.creationNextButton);t&&(t[e]||(t[e]=!0,t.style.opacity=.5,t.addEventListener("click",(e=>{e.preventDefault(),e.stopPropagation(),E.setCookie("desktop-reels.open-billing","keep-ig-tab")}),{capture:!0})))}))}(),function(){const e=Symbol("handled");E.onDocMutations((()=>{if(!So.creatingReels)return;const t=_o('[accept*="video/mp4"]');t&&(t[e]||(t[e]=!0,t.multiple=!1,t.setAttribute("accept","video/mp4,video/quicktime")))}))}(),wo((e=>{"NAVIGATION_FEED_CREATION_CLOSE"===e.type&&(E.docElem.classList.remove("reels--creating"),So.shareToFeed=!1,So.creatingReels=!1)}))},startReelsCreationSession:function(){if(E.docElem.classList.add("reels--creating"),So.creatingReels=!0,!window.cookieStore)return;E.setCookie("desktop-reels.get-initial-data"),window.cookieStore.addEventListener("change",(function e(t){const o=t.changed.find((e=>"desktop-reels.initial-data"===e.name));if(!o)return;window.cookieStore.removeEventListener("change",e);const n=JSON.parse(o.value);Object.assign(So,n)}))}};let Po,wo;const So={shareToFeed:!1,creatingReels:!1,hasPro:!0,freeReels:0,maxFreeReels:0};var Co={controller:xo};const To=$.selectors,{$:Mo}=E;let ko,Eo,$o;function Do(e){const t=Mo(".CreationPopup");t&&t.classList.toggle("CreationPopup_show",e)}var Ao={controller:{init:async function(){if(ko=await Me("nav"),Eo=await Me("http"),$o=await Me("store"),!ko||!Eo||!$o)return;E.onDocMutations((()=>{const e=!Mo(To.topNav);document.documentElement.classList.toggle("isSidebarNav",e)})),E.insertMultistyle`
    <style>
      ${To.creationLoadingBar} {
        position: absolute;
        top: 0;
      }
    </style>
  `,function(){const e=Eo.post.bind(Eo);Eo.post=(...t)=>(t[0]&&t[0].includes("configure_to_igtv")&&!t[0].endsWith("/")&&(t[0]=`${t[0]}/`),e(...t))}(),async function(){const e=await Fe("PolarisAPIRuploadVideo"),t=await Fe("PolarisIGTVConstants");let o=0,n=null;const i=t.UPLOAD_CHUNK_SIZE;e.ruploadVideoOffset=e=>{let t;return n&&e.entityName!==n?(o=0,t=0):(t=o,o+=i),n=e.entityName,t}}(),function(){const e=Symbol("handled");E.onDocMutations((()=>{const t=Mo(To.newPostButton);t&&(t[e]||(t[e]=!0,t.insertAdjacentHTML("afterend",'\n    <div class="CreationPopup">\n      <div class="CreationPopup__option" data-id="post">\n        <svg class="CreationPopup__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">\n          <path\n            d="M7.164 22.654A5.17 5.17 0 012 17.49V7.164A5.17 5.17 0 017.164 2H17.49a5.17 5.17 0 015.164 5.164V17.49a5.17 5.17 0 01-5.164 5.164zm0-1.757H17.49a3.794 3.794 0 003.41-3.407V14.8l-3.68-3.661-4.394 5.934L8 14.866 3.766 17.7a3.832 3.832 0 003.398 3.2zM3.757 7.164v8.4L7.8 12.785l4.5 2.081 4.681-6.525 3.919 3.922v-5.1a3.794 3.794 0 00-3.41-3.406H7.164a3.794 3.794 0 00-3.407 3.407zm3.943.874a1.709 1.709 0 111.7 1.708 1.709 1.709 0 01-1.7-1.708z"\n            fill="currentColor"\n            stroke="#fff"\n            stroke-width=".4"\n          />\n        </svg>\n        New Post\n      </div>\n      <div class="CreationPopup__option" data-id="reel">\n        <svg class="CreationPopup__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">\n          <path\n            d="M15.548 14.007l-.006-.005-.006-.004-4.696-2.73s0 0 0 0a.736.736 0 00-.381-.113.73.73 0 00-.373.108c-.262.11-.407.371-.407.662v5.464c0 .262.155.511.398.658h0l.009.004a.899.899 0 00.352.098.88.88 0 00.314-.069l.063-.022.012-.004.012-.006 4.697-2.732h0l.001-.001a.743.743 0 00.357-.658c0-.259-.152-.505-.346-.65zM20.764 3.85h0l-.003-.004c-.534-.513-1.125-.945-1.943-1.247-.816-.301-1.85-.47-3.264-.47h-6.5c-1.394 0-2.417.169-3.233.476-.818.307-1.42.75-1.974 1.283h0l-.003.004C3.33 4.428 2.9 5.02 2.599 5.834c-.3.812-.469 1.837-.469 3.234v6.514c0 1.396.169 2.432.475 3.255.306.824.748 1.428 1.282 1.964l.002.002c.534.513 1.126.945 1.943 1.246.816.302 1.85.47 3.264.47h6.5c1.394 0 2.428-.168 3.249-.475.823-.307 1.425-.75 1.96-1.285l.001-.002c.513-.535.944-1.128 1.245-1.947.3-.817.469-1.853.469-3.27V9.068c0-1.397-.169-2.422-.475-3.24-.306-.819-.748-1.422-1.28-1.977zm-5.168-.2c1.31 0 2.174.166 2.788.41.612.244.985.567 1.314.896.466.468.897 1.045 1.149 2.216h-3.665L15.19 3.65h.406zm-6.948 0h4.734l1.991 3.522H10.64L8.648 3.65zM4.952 4.957c.435-.436.982-.87 2.065-1.12l1.897 3.336h-5.11c.25-1.17.682-1.748 1.148-2.216zm16.05 10.667c0 1.313-.167 2.178-.41 2.794-.243.613-.565.987-.894 1.316-.328.33-.712.652-1.33.896-.62.244-1.482.411-2.772.411H9.054c-1.31 0-2.174-.167-2.788-.411-.612-.243-.985-.566-1.314-.896a3.699 3.699 0 01-.893-1.332c-.244-.62-.41-1.486-.41-2.778v-6.93h17.353v6.93z"\n            fill="currentColor"\n            stroke="#fff"\n            stroke-width=".25"\n          />\n        </svg>\n        New Reel\n      </div>\n      <div class="CreationPopup__poweredBy">\n        POWERED BY YEZER\n      </div>\n    </div>\n  '),t.addEventListener("click",(e=>{e.preventDefault(),e.stopPropagation(),Do()}))))})),document.addEventListener("click",(()=>{Do(!1)})),document.addEventListener("click",(e=>{const t=e.target.closest(".CreationPopup__option");if(!t)return;!function(e){"post"===e?$o.dispatch({type:"NAVIGATION_FEED_CREATION_OPEN"}):"reel"===e&&(Co.controller.startReelsCreationSession(),$o.dispatch({type:"NAVIGATION_FEED_CREATION_OPEN"}))}(t.dataset.id)}))}(),E.insertMultistyle`
    <style>
      /* show new post menu item when creation injection is ready */
      ${To.newPostMenuItem} {
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
  `,function(){let e=0;const t=Eo.post.bind(Eo);Eo.post=async(...o)=>{const n=o[0].includes("/configure_to_clips"),i=o[0].includes("/configure_to_igtv");if(!n&&!i)return t(...o);let r,a;try{r=await t(...o)}catch(e){a=e}if(a||"fail"===r.status){if(e+=1,e<=5)return Eo.post(...o);throw e=0,a||new Error("failed to post")}return r}}(),async function(){const e=await Me("add-dispatch-listener");if(!e)return;e((e=>{var t;"SHOW_NEW_UPLOADED_POST"===e.type&&"clips"===(null===(t=e.post)||void 0===t?void 0:t.productType)&&location.reload()}))}(),function(){let e;E.onDocMutations((()=>{const t=Mo(To.creationPublishingSpinner);if(t)if(e){if(e!==t.src){const e=Mo(".PublishingTitle"),t=Mo(".PublishingDisclaimer");e&&e.remove(),t&&t.remove()}}else e=t.src,t.insertAdjacentHTML("afterend",'\n      <div class="PublishingTitle">\n        Publishing Post...\n      </div>\n      <div class="PublishingDisclaimer">\n        Waiting for Instagram to publish the post, this\n        might take a&nbsp;few minutes. Please keep this\n        tab open until Inssist confirms the publish is complete.\n      </div>\n    '),E.onDocMutations((function e(){if(Mo(To.creationPublishingSpinner))return;E.onDocMutations.off(e);const t=Mo(".PublishingTitle"),o=Mo(".PublishingDisclaimer");t&&t.remove(),o&&o.remove()}));else e=null})),E.insertMultistyle`
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

      ${To.creationPublishingSpinnerContainerWrap} {
        position: static;
      }

      ${To.creationPublishingSpinnerContainer} {
        position: static;
        align-items: center;
        justify-content: center;
      }
    </style>
  `}()}}};let Io,Ro;function Bo(e){chrome.tabs.create({url:e,active:!0})}var Lo={controller:{init:function(){if(Io=!!window.electron,Ro=s.isIframe()&&s.getParams().isElectron,!Io&&!Ro)return;Io&&we.on("electron-links.open-url",Bo);document.addEventListener("click",(e=>{const t=e.target.closest("a");if(!t)return;if("_blank"!==t.getAttribute("target"))return;const o=t.getAttribute("href");o.startsWith("/")||(e.preventDefault(),e.stopPropagation(),Ro?we.send("electron-links.open-url",o):Bo(o))}),{capture:!0})}}};async function Oo(e){var t;if(!e)return null;let o;try{o=await fetch(e)}catch(e){}if(null===(t=o)||void 0===t?void 0:t.ok){const e=await o.blob();return URL.createObjectURL(e)}return null}var Fo={controller:{init:function(){we.on("cdn-proxy.fetch",Oo)}}};var No={controller:{init:function(){this._stripMetadataBeforeUpload()},_stripMetadataBeforeUpload:function(){Ne.define("stripVideoMetadata",(async e=>{const t=await we.send("strip-metadata.strip",e[0].file);t&&(e[0].file=t,e[0].dataURL=URL.createObjectURL(t))}))}}};var Ho={controller:{init:async function(){this._fusion=Se.controller.getConfig().ig,this._store=await Me("store"),this._getStoriesContext=await Me("get-stories-context"),this._ghostViewEnabled=await we.send("ghost-story-view.is-enabled"),this._patchReelSeen(),this._handleToggling(),this._handleNavigation()},_patchReelSeen:async function(){(await Me("add-dispatch-listener"))((e=>{this._ghostViewEnabled&&e.type===this._fusion.STORY_REELS_ITEM_SEEN&&(e.type="__NONE__")}));const e=await Fe("PolarisAPIReelSeen");if(!e)return;const t=e.reelSeen.bind(e);e.reelSeen=(...e)=>{if(!this._ghostViewEnabled)return t(...e);we.send("ghost-story-view.used")}},_handleToggling:async function(){we.on("ghost-story-view.toggled",(e=>{this._ghostViewEnabled=e,e?this._showUpsellOverlayIfNeeded():this._resumeStories()}))},_handleNavigation:function(){let e;this._store.subscribe((()=>{var t;const o=null===(t=this._store.getState().navigation)||void 0===t?void 0:t.pageIdentifier;o!==e&&(e=o,this._showUpsellOverlayIfNeeded())}))},_showUpsellOverlayIfNeeded:async function(){if(await we.send("ghost-story-view.has-pro"))return;if(!this._ghostViewEnabled)return;"StoriesPage"===this._store.getState().navigation.pageIdentifier&&(this._pauseStories(),we.send("ghost-story-view.show-upsell-overlay"))},_pauseStories:function(){E.waitFor((()=>{const e=this._getStoriesContext();if(e)return e.updateStoriesContext({isPaused:!0}),e.isPaused}))},_resumeStories:function(){const e=this._getStoriesContext();e&&e.updateStoriesContext({isPaused:!1})}}};var zo={getState:async function(){const e=await Me("store"),t=await h((()=>e.getState()));return JSON.parse(JSON.stringify(t))},ensureElems:function(e){for(const t of Object.values(e)){if(!t)return null;if(Array.isArray(t)&&0===t.length)return null}return e},requireIgModule:Me,require:Me,docElem:document.documentElement,onDomReady:_(),onDocClick:_(),onPathChange:_(),onBeforePostCreation:_(),onBeforeStoryCreation:_(),onMediaProcessingError:_()};function Vo(e){let t="";if(e<0&&(t="-",e=-e),e<1)return t+String(Number.isInteger(e)?e:e.toFixed(3));if(e<10)return t+String(Number.isInteger(e)?e:e.toFixed(2));if(e<100)return t+String(Number.isInteger(e)?e:e.toFixed(1));if(e<1e3)return t+String(Number.isInteger(e)?e:e.toFixed(1));const o=["k","m","b","t"];let n=null,i=null;for(let t=0;t<o.length;t++)if(e<Math.pow(1e3,t+2)){if(i=o[t],n=e/Math.pow(1e3,t+1),n=n<10?Math.round(100*n)/100:n<100?Math.round(10*n)/10:Math.round(n),n>=1e3)continue;break}return n?t+String(n)+i:t+"999t+"}var Uo={create:function e({show:o=!1,onClick:n=null,removeOnClick:i=!1}={}){const r=e;r.init||(r.init=!0,C`
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
    `);const a=document.createElement("div");a.innerHTML=`\n    <div class="spinner ${o?"spinner_visible":""}">\n      <div class="spinner__inner">\n        ${It()}\n      </div>\n    </div>\n  `;const s=a.firstElementChild;document.body.appendChild(s),i&&!n&&(n=()=>{s.remove()});if(n){t(".spinner__inner",s).addEventListener("click",n)}return s},toggle:function(e,t){e.classList.toggle("spinner_visible",t)}};let Wo,jo,Go=!1,qo=!1,Yo=!1,Xo=!1;var Ko={on:function(e={}){Yo=!0,void 0!==e.mouseEventsAllowed&&(Xo=e.mouseEventsAllowed);if(qo)return;qo=!0,function(){const e=[window,document.documentElement],t=["ontouchstart","ontouchmove","ontouchcancel","ontouchend"];for(let o=0;o<e.length;o++)for(let n=0;n<t.length;n++)e[o]&&void 0===e[o][t[n]]&&(e[o][t[n]]=null)}(),function(){const e=350;let t=!1,o=null;const n=()=>{o=Date.now()},i=()=>{t=Date.now()-o>e},r=e=>{t&&(t=!1,Zo(e))};document.addEventListener("touchstart",n,!0),document.addEventListener("touchend",i,!0),document.addEventListener("click",r,!0)}(),window.addEventListener("mousedown",en("touchstart"),!0),window.addEventListener("mousemove",en("touchmove"),!0),window.addEventListener("mouseup",en("touchend"),!0)},off:function(){Yo=!1}};function Jo(e,t,o,n,i){n=n||0,i=i||0,this.identifier=t,this.target=e,this.clientX=o.clientX+n,this.clientY=o.clientY+i,this.screenX=o.screenX+n,this.screenY=o.screenY+i,this.pageX=o.pageX+n,this.pageY=o.pageY+i}function Qo(){const e=[];return e.item=function(e){return this[e]||null},e.identifiedTouch=function(e){return this[e+1]||null},e}function Zo(e){Xo||(e.preventDefault(),e.stopPropagation())}function en(e){return function(t){Yo&&(t.target.closest("textarea")||t.target.closest("input")||t.target.closest("select")||t.target.closest("video")||Zo(t),1===t.which&&(("mousedown"===t.type||!jo||jo&&!jo.dispatchEvent)&&(jo=t.target),Go&&!t.shiftKey&&(tn("touchend",t),Go=!1),tn(e,t),!Go&&t.shiftKey&&(Go=!0,Wo={pageX:t.pageX,pageY:t.pageY,clientX:t.clientX,clientY:t.clientY,screenX:t.screenX,screenY:t.screenY},tn("touchstart",t)),"mouseup"===t.type&&(Wo=null,Go=!1,jo=null)))}}function tn(e,t){const o=document.createEvent("Event");o.initEvent(e,!0,!0),o.altKey=t.altKey,o.ctrlKey=t.ctrlKey,o.metaKey=t.metaKey,o.shiftKey=t.shiftKey,o.touches=nn(t,e),o.targetTouches=nn(t,e),o.changedTouches=function(e,t){const o=on(e);!Go||"mouseup"===e.type||"touchstart"!==t&&"touchend"!==t||o.splice(0,1);return o}(t,e),jo.dispatchEvent(o)}function on(e){const t=new Qo;if(Go){const o=75,n=Wo.pageX-e.pageX,i=Wo.pageY-e.pageY;t.push(new Jo(jo,1,Wo,-1*n-o,-1*i+o)),t.push(new Jo(jo,2,Wo,n+o,i-o))}else t.push(new Jo(jo,1,e,0,0));return t}function nn(e,t){if("mouseup"===e.type)return new Qo;const o=on(e);return Go&&"mouseup"!==e.type&&"touchend"===t&&o.splice(1,1),o}const{$:rn,$$:an}=E;var sn={init:function(){cn=Se.controller.getConfig(),ln=cn.igSelectors,function(){const e=XMLHttpRequest.prototype.open,t=XMLHttpRequest.prototype.send;XMLHttpRequest.prototype.open=function(t,o){return this.method=t,this.url=o,this.addEventListener("readystatechange",(()=>{if(429!==this.status)return;const[e,t]=o.split("?"),n=(t||"").split("&"),i=n.indexOf("__a=1");-1!==i&&(n.splice(i,1),location.href=`${e}?${n.join("&")}`)})),e.apply(this,arguments)},XMLHttpRequest.prototype.send=function(e){return"POST"===this.method&&this.url.includes("/create/configure/")&&(e=function(e,t){if(!e||0===e.length)return e;let o=e.split("&");return o=o.map((e=>{if(0!==e.indexOf("caption="))return e;let o="";return e.split("%23").forEach(((e,n)=>{o+=0===n?e:n<=t?"%23"+e:e})),o})),o.join("&")}(e,30)),t.call(this,e)}}(),E.insertMultistyle`
    <style>
      * {
        outline: none;
      }

      html {
        background: #fff;
      }

      ${ln.general.footer} {
        display: none;
      }

      ${ln.general.main} {
        margin-bottom: 0;
      }

      ${ln.general.pageLayoutNewNavDesign} {
        bottom: 0;
      }

      ${ln.general.rootNewNavDesign} {
        padding-bottom: 58px; /* compensate tab bar height */
      }

      ${ln.general.contentSection} {
        background: #fff;
      }

      ${ln.general.nextPageLoaderFeed} {
        margin-top: 20px;
        margin-bottom: 20px;
      }
      ${ln.general.nextPageLoaderProfile},
      ${ln.general.nextPageLoaderExplore} {
        margin-top: 30px;
        margin-bottom: 30px;
      }

      ${ln.general.settingsRectangle} {
        margin-top: 25px;
      }

      ${ln.general.bottomNotification} {
        left: 8px;
        right: 8px;
        margin-bottom: 66px;
        border-radius: 4px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
      }
      ${ln.general.bottomNotification} * {
        color: #333;
        background: #FFF;
      }

      ${ln.dragPanel.root} {
        user-select: none;
      }

      ${ln.commentsPage.body} {
        min-height: auto;
      }

      ${ln.commentsPage.footer} {
        height: 0;
      }

      ${ln.commentsPage.comment} {
        user-select: initial;
      }

      ${ln.commentsPage.lastListItem} {
        margin-bottom: 60px;
      }

      ${ln.general.expandVideoButton} {
        display: none;
      }

      ${ln.general.continueWatchingOverlay} {
        display: none;
      }

      ${ln.general.modalWindow} {
        max-width: 400px;
      }

      ${ln.general.uploadPanelVideoIcon} {
        left: 6px;
      }

      ${ln.feedPage.postsContainer} {
        max-width: 100%;
      }

      /* instagram hides default (black) icon on action button hover (like/comment/share)
         and shows gray icon, we alter this logic and always show black icon */
      ${ln.feedPage.postActionIconDefault} {
        display: block;
      }
      ${ln.feedPage.postActionIconHovered} {
        display: none;
      }

      ${ln.feedPage.body} {
        background: #fff;
        /* disable annoying instagram's story bar loading transition */
        transform: none;
      }

      ${ln.feedPage.loadMoreSpinner} {
        margin-bottom: -30px;
      }

      ${ln.general.tabBarButton} {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
      }

      /* expand hitbox for the tab bar links */
      ${ln.general.tabBarLink} {
        display: flex;
        width: 100%;
        justify-content: center;
      }

      ${ln.profilePage.toggleSuggestionsButton} {
        display: none;
      }

      ${ln.postPage.postHeader},
      ${ln.postPage.postFooter},
      ${ln.feedPage.postFooter} {
        background: #fff;
      }

      ${ln.general.storiesBarLoadingPanel} {
        display: none;
      }

      ${ln.general.createStoryHeaderButton} {
        cursor: pointer;
        position: relative;
      }
      ${ln.general.createStoryHeaderButton}::before {
        content: '';
        position: absolute;
        top: -5px;
        left: -5px;
        right: -5px;
        bottom: -5px;
      }

      ${ln.postCreation.closeButton} {
        transform: scale(0.8);
        position: relative;
        cursor: pointer;
      }
      ${ln.postCreation.closeButton}::before {
        content: '';
        position: absolute;
        top: -5px;
        left: -5px;
        right: -5px;
        bottom: -5px;
      }

      ${ln.general.uploadPanelText} {
        display: block;
      }

      ${ln.feedPage.postBody} {
        background: #fff;
      }

      ${ln.general.toastMessage} {
        margin-bottom: 60px;
      }

      ${ln.profilePage.tab} {
        color: #8e8e8e;
      }

      ${ln.profilePage.activeTab} {
        color: #262626;
      }

      ${ln.activityPage.topListContainer} {
        padding-bottom: 16px;
      }

      ${ln.activityPage.headerBottomLine} {
        display: none;
      }

      ${ln.general.tabBarContainer} {
        background: transparent;
        display: block;
      }
      ${ln.general.tabBarTopContainer} {
        z-index: 10;
        background: transparent;
      }
      ${ln.general.tabBar} {
        background: #fff;
      }

      ${ln.explorePage.searchContainer} {
        margin: 8px 12px;
        justify-content: center;
      }
      @media (min-width: 340px) {
        ${ln.explorePage.searchContainer} {
          margin-bottom: 20px;
        }
      }

      ${ln.explorePage.header} {
        background: #fff;
      }

      ${ln.explorePage.search} {
        display: none;
      }

      ${ln.explorePage.main} {
        padding-top: 10px;
      }

      ${ln.explorePage.searchInputPlaceholder} {
        opacity: 0;
      }

      ${ln.general.tabBarWrap} {
        z-index: 100;
      }

      ${ln.profilePageFeedTab.postFooter} {
        border-left: none;
      }

      ${ln.profilePageFeedTab.addCommentSection} {
        padding: 16px;
      }

      ${ln.profilePageFeedTab.addCommentTypeahead} {
        display: none;
      }

      ${ln.general.postPhotoOverlay} {
        display: none;
      }

      ${ln.general.tryMbsSection} {
        display: none;
      }

      ${ln.storyViewer.videoPlayer} {
        height: 100%;
      }

      ${ln.storyCreation.submitButton} {
        background: #0095f6;
        border-radius: 19px;
        padding: 8px 12px 8px 9px;
      }

      ${ln.profilePage.openMbsButton} {
        display: none;
      }
    </style>
  `,E.insertMultistyle`
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

      .theme-night ${ln.general.storyQuickReactionsBackground} {
        background: linear-gradient(to bottom, transparent, #000);
      }

      .theme-night ${ln.general.storyFooter} textarea {
        filter: none !important;
      }

      .theme-night ${ln.general.storyFooter} .emoji {
        filter: none !important;
      }

      .theme-night ${ln.general.postVideoContainer} {
        background: #fff;
      }

      .theme-night ${ln.profilePage.reelPreviewStats} {
        filter: url(#theme-reverse-filter);
      }

      .theme-night ${ln.profilePage.postVideoIcon} {
        filter: url(#theme-reverse-filter);
      }

      .theme-night ${ln.profilePage.postVideoOverlay} {
        filter: url(#theme-reverse-filter);
      }

      .theme-night video {
        background: #000;
      }


      /* --- for bundle v2 --- */

      .theme-night ${ln.storyViewer.root},
      .theme-night ${ln.general.carouselNavButton},
      .theme-night ${ln.profilePage.reelIcon},
      .theme-night ${ln.storyCreation.root} {
        filter: url(#theme-reverse-filter);
      }

      .theme-night ${ln.storyViewer.avatar},
      .theme-night ${ln.storyViewer.image},
      .theme-night ${ln.storyViewer.video},
      .theme-night ${ln.storyViewer.videoPoster},
      .theme-night ${ln.storyCreation.canvas},
      .theme-night ${ln.storyCreation.mentionReelItemAvatar},
      .theme-night ${ln.storyCreation.video} {
        filter: none;
      }

      .theme-night ${ln.general.blueButton},
      .theme-night ${ln.storyCreation.textInput} {
        color: #000;
      }

      .theme-night ${ln.storyCreation.uploadHeader} {
        filter: url(#theme-filter);
      }

      .theme-night ${ln.general.postCaption} {
        filter: url(#theme-reverse-filter);
        color: #C6C6C6;
      }

      .theme-night ${ln.general.postCaptionLink} {
        color: #7FB5E3;
      }

      .theme-night ${ln.postCreation.videoPlayButton} {
        filter: url(#theme-reverse-filter);
      }

      .theme-night ${ln.feedPage.carouselDots} {
        filter: url(#theme-reverse-filter);
      }

      .theme-night ${ln.storyViewer.viewAsAvatar} {
        filter: none;
      }
    </style>
  `,E.insertMultistyle`
    <style>
      ${ln["general_use-application-bar"]} {
        display: none !important;
      }

      ${ln.general.useAppGradientBar} {
        display: none !important;
      }
    </style>
  `,function(){const e=Symbol("handled");E.onDocMutations((()=>{const t=rn(ln.dragPanel.igIcon);if(!t)return;if(t[e])return;t[e]=!0;const o=rn(ln.dragPanel.root);an("button",o).pop().click()}))}(),E.insertMultistyle`
    <style>
      ::-webkit-scrollbar {
        display: none;
      }
    </style>
  `,async function(){const e=(t,o)=>{0!==t?requestAnimationFrame((()=>{e(t-1,o)})):o()};await E.waitForDocumentReady(),e(5,(()=>{zo.docElem.scrollTop=0}))}(),E.insertMultistyle`
    <style>
      /* spinners for profile tabs */
      ._2z6nI > .jmJva,
      ._2z6nI > .vlh0C {
        margin-bottom: 100vh;
      }
    </style>
  `,E.insertMultistyle`
    <style>
      /* header top-left button */
      ${ln["header-top-level-button"]} button {
        cursor: pointer;
      }

      /* hitbox for header top-left button */
      ${ln["header-top-level-button"]} a,
      ${ln["header-top-level-button"]} button {
        position: relative;
      }
      ${ln["header-top-level-button"]} a::before,
      ${ln["header-top-level-button"]} button::before {
        content: '';
        position: absolute;
        top: -12px;
        left: -12px;
        right: -12px;
        bottom: -12px;
      }

      ${ln.general.tabBarCreatePostButton} {
        cursor: pointer;
      }
    </style>
  `,E.insertMultistyle`
    <style>
      /* text of "your story" button */
      ${ln["your-story-button-text"]} {
        width: 64px;
      }
    </style>
  `,E.insertMultistyle`
    <style>
      ${ln["profile-send-message-button"]} {
        white-space: nowrap;
        overflow: hidden;
      }
    </style>
  `,function(){const e="_enhanceProfileStats_",t=e=>{e.forEach((e=>{e.style.height=""}));const t=Array.from(e).map((e=>e.offsetHeight)),o=Math.max(...t);e.forEach((e=>{e.style.height=`${o}px`}))};E.onDocMutations((()=>{const o=zo.ensureElems({statContainers:an(ln["profile-page-stat-container"]),statItems:an(ln["profile-page-stat-item"])});zo.docElem.classList.toggle("enhance-stats",!!o),o&&(o.statItems[0][e]||(o.statItems[0][e]=!0,o.statItems.forEach((e=>{e.innerHTML=e.innerHTML.replace("(","").replace(")",""),e.firstChild.nodeType===Node.TEXT_NODE&&e.appendChild(e.firstChild);const t=e.lastChild;t.textContent=t.textContent.toLowerCase().replace(":","")})),t(o.statContainers)))})),window.addEventListener("resize",(()=>{const e=an(ln["profile-page-stat-container"]);t(e)})),E.insertMultistyle`
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
  `}(),E.onDocMutations((()=>{const e=zo.ensureElems({commentForm:rn(ln["comment-form"]),avatar:rn(ln["comment-form-avatar"]),form:rn(ln["comment-form-form"]),textarea:rn(ln["comment-form-textarea"]),submit:rn(ln["comment-form-submit-button"])});zo.docElem.classList.toggle("enhance-comment-form",!!e)})),E.insertMultistyle`
    <style>
      /* comment form */
      .enhance-comment-form ${ln["comment-form"]} {
        align-items: flex-start !important;
      }

      /* avatar */
      .enhance-comment-form ${ln["comment-form-avatar"]} {
        top: 5px;
      }

      /* form */
      .enhance-comment-form ${ln["comment-form-form"]} {
        padding: 0;
        border-radius: 11px;
        margin-bottom: 30px;
        position: relative;
      }

      /* textarea */
      .enhance-comment-form ${ln["comment-form-textarea"]} {
        padding: 12px 16px;
        max-height: 50vh;
        min-height: 42px;
        box-sizing: border-box;
      }

      /* submit */
      .enhance-comment-form ${ln["comment-form-submit-button"]} {
        position: absolute;
        top: 100%;
        margin-top: 10px;
      }
    </style>
  `,E.insertMultistyle`
    <style>
      ${ln["profile-page-grid-stretch-element"]} {
        display: none;
      }
    </style>
  `,E.onDocMutations((()=>{rn(ln.dragPanel.handle)?Ko.on({mouseEventsAllowed:!0}):location.pathname.startsWith("/create/")?Ko.on({mouseEventsAllowed:!1}):!location.pathname.startsWith("/stories/")||location.pathname.startsWith("/stories/direct/")?Ko.off():Ko.on({mouseEventsAllowed:!1})})),function(){const e=150;let t=null,o=!0;const n=async()=>{const n=an(ln["post-video"]);if(0===n.length)return;const i=n.find((t=>{const o=t.getBoundingClientRect();return o.left>=0&&o.left+o.width<=window.innerWidth&&o.top>-1*e&&o.top+o.height<window.innerHeight+e}));i?t&&i===t||(t&&t.pause(),t=i,o&&(i.muted=!0),await i.play(),i.addEventListener("volumechange",(()=>{o=!1}))):t&&(t.pause(),t=null)};E.onDocMutations(n),window.addEventListener("scroll",n)}(),function(){const e=Array.prototype.some;Array.prototype.some=function(...t){let o;return o=2===this.length&&"instagram.com"===this[0]&&"facebook.com"===this[1]?["instagram.com"]:this,e.call(o,...t)}}(),E.insertMultistyle`
    <style>
      ${ln["post-tagged-people-button"]} {
        top: 0 !important;
        bottom: auto !important;
      }
    </style>
  `,E.onDocMutations((e=>{e.forEach((e=>{e.removedNodes.forEach((e=>{e.nodeType===HTMLElement.ELEMENT_NODE&&("VIDEO"===e.tagName?[e]:e.querySelectorAll("video")).forEach((e=>{e.src="",e.load()}))}))}))})),E.insertMultistyle`
    <style>
      video::-webkit-media-controls-fullscreen-button {
        display: none;
      }
    </style>
  `,function(){const e="__disablePictureInPictureForVideos",t=t=>{t[e]||(t[e]=!0,t.disablePictureInPicture=!0)};E.onDocMutations((()=>{const e=an("video");e.length&&e.forEach(t)}))}(),function(){const e=Symbol("handled"),t=t=>{t[e]||(t[e]=!0,t.addEventListener("click",(e=>{e.preventDefault(),t.paused?t.play():t.pause()})))};E.onDocMutations((()=>{const e=an(ln["post-video"]);e.length&&e.forEach(t)}))}(),function(){const e=Symbol("handled"),t=t=>{t[e]||(t[e]=!0,t.setAttribute("controls",""),t.setAttribute("controlslist","nodownload"),t.setAttribute("preload","auto"))};E.onDocMutations((()=>{const e=an(ln["post-video"]);e.length&&e.forEach(t)})),E.insertMultistyle`
    <style>
      ${ln["post-video"]} {
        cursor: pointer;
      }

      ${ln["post-video-poster"]},
      ${ln["post-video-overlay"]} {
        display: none;
      }

      /* tricky way to move volume control */
      @media (min-width: 450px) {
        ${ln["post-video"]}::-webkit-media-controls-panel {
          padding-right: 46px;
        }
        ${ln["post-video"]}::-webkit-media-controls-timeline {
          margin-right: -46px;
        }
      }
    </style>
  `}(),function(){const e="__syncVolumeAcrossPostVideos";let t,o,n=[];const i=i=>{i[e]||(i[e]=!0,void 0===t?(t=i.volume,o=i.muted):(i.volume=t,i.muted=o),i.addEventListener("volumechange",(()=>{n.forEach((e=>{e.volume=i.volume,e.muted=i.muted})),t=i.volume,o=i.muted})))};E.onDocMutations((()=>{n=an(ln["post-video"]),n.forEach(i)}))}(),E.insertMultistyle`
    <style>
      video::-webkit-media-controls-panel {
        transition: all 0.25s linear;
      }
    </style>
  `,E.insertMultistyle`
    <style>
      /* expand timeline hitbox at top */
      video::-webkit-media-controls-timeline {
        margin-top: -5px;
        padding-top: 5px;
      }
    </style>
  `,function(){const e=Symbol();E.onDocMutations((()=>{const t=rn(ln.postCreation.captionTextarea);if(!t)return;if(t[e])return;t[e]=!0;const o=getComputedStyle(t),n=Number(o.paddingTop.replace("px","")),i=Number(o.paddingBottom.replace("px",""));t.addEventListener("input",(()=>{t.style.height=null;const e=t.scrollHeight-n-i;t.style.height=`${e}px`}))})),E.insertMultistyle`
    <style>
      ${ln.postCreation.mentionsOverlay} {
        top: 225px !important;
      }

      ${ln.postCreation.captionContainer} {
        height: fit-content !important;
      }

      ${ln.postCreation.captionTextarea} {
        min-height: 144px !important;
        max-height: 288px !important;
      }
    </style>
  `}(),E.insertMultistyle`
    <style>
      ${ln["new-post_tag-people-image-container"]} {
        width: 100%;
      }

      ${ln["new-post_tag-people-image-container"]} img {
        width: 100%;
      }
    </style>
  `,function(){const e=["(max-height: 622px)","(min-height: 624px)","(max-width: 313px)","(min-width: 315px)"].join(",");E.insertMultistyle`
    <style>
      @media ${e} {
        ${ln.general.tabBarWrap} {
          height: 58px;
        }

        ${ln.general.tabBar} {
          height: 58px;
        }
      }
    </style>
  `}(),E.insertMultistyle`
    <style>
      ${ln.general.modal} {
        background: rgba(255, 255, 255, 0.96) !important;
      }

      ${ln.general.modalWindow} {
        justify-content: flex-start;
        box-shadow: 0 5px 27px rgba(0, 0, 0, 0.13);
        background: #FFF;
      }

      ${ln.general.modalWindowHashtagContent} {
        margin-top: 6px;
      }
    </style>
  `,function(){let e;E.onDocMutations((()=>{const t=location.pathname+location.search;t!==e&&(we.send("ig.url-change",t),e=t)}))}(),function(){const e=Symbol("handled");E.onDocMutations((()=>{const t=rn(ln.general.storiesBar);t&&(t[e]||(t[e]=!0,E.smartHorizontalScroll.init(t)))}))}(),E.insertMultistyle`
    <style>
      ${ln.profilePage.tab}:empty {
        display: none;
      }
    </style>
  `,E.insertMultistyle`
    <style>
      ${ln.general.modalWindow} {
        overflow: scroll;
        border-radius: 8px;
      }
    </style>
  `,function(){const e=Symbol("handled");E.onDocMutations((()=>{const t=rn(ln.postCreation.nextButton);t&&(t[e]||(t[e]=!0,t.addEventListener("click",(()=>{const e=Uo.create({show:!0});zo.onPathChange((function t(){zo.onPathChange.off(t),e.remove()}))}),{once:!0})))}))}(),E.insertMultistyle`
    <style>
      ${ln.general.blueLinkButton} {
        cursor: pointer;
        position: relative;
      }

      ${ln.general.blueLinkButton}::before {
        content: '';
        position: absolute;
        top: -7px;
        left: -7px;
        right: -7px;
        bottom: -7px;
      }
    </style>
  `,E.insertMultistyle`
    <style>
      ${ln.profilePage.postRow} {
        margin-bottom: 2px;
      }

      ${ln.profilePage.postContainer} {
        margin-right: 2px;
      }

      ${ln.profilePage.reelRow} {
        margin-bottom: 2px;
      }

      ${ln.profilePage.reelContainer} {
        margin-right: 2px;
      }
    </style>
  `,E.insertMultistyle`
    <style>
      ${ln.general.actionSheet} {
        width: 96% !important;
      }
    </style>
  `,function(){const e=Symbol("handled");E.onDocMutations((()=>{const t=rn(ln.postCreation.filtersReel);t&&(t[e]||(t[e]=!0,E.smartHorizontalScroll.init(t)))}))}(),E.insertMultistyle`
    <style>
      ${ln.authScreen.username} {
        margin-right: 24px;
      }

      /* hide alt text of missing avatar */
      ${ln.authScreen.avatar} {
        color: transparent;
        overflow: hidden;
      }

      ${ln.authScreen.footer} {
        display: none;
      }

      ${ln.authScreen.fromFacebookBar} {
        display: none;
      }

      @media (max-width: 400px) {
        ${ln.authScreen.loginContainer} {
          padding-left: 20px;
          padding-right: 20px;
        }

        ${ln.authScreen.loginContainerParagraph} {
          text-align: center;
        }

        ${ln.authScreen.loginFormParagraph} {
          text-align: center;
          padding-left: 20px;
          padding-right: 20px;
        }
      }
    </style>
  `,E.insertMultistyle`
    <style>
      ${ln.loginBar.root} {
        top: 6px !important;
        padding: 8px;
        border-radius: 5px;
        max-width: 400px;
        box-shadow: 0 2px 7px rgba(0, 0, 0, 0.18);
      }

      ${ln.loginBar.content} {
        height: 100%;
        align-items: center;
      }

      ${ln.loginBar.openAppButton} {
        display: none !important;
      }

      @media (max-width: 500px) {
        ${ln.loginBar.root} {
          top: 0 !important;
          padding: 8px;
          border-radius: 0;
          max-width: 100%;
          box-shadow: none;
        }
      }
    </style>
  `,function(){const e=Symbol("handled");E.onDocMutations((()=>{if(!!rn('[data-page="StoriesPage"]'))return;an("img[srcset]").forEach((t=>{if(t[e])return;t[e]=!0;t.getAttribute("srcset").endsWith("w")&&t.removeAttribute("srcset")}))}))}(),function(){let e=null;E.onDocMutations((()=>{e=rn(ln.commentsPage.scrollContainer)})),we.on("ig.broadcast-scroll",(t=>{e&&(e.scrollTop+=t)}))}(),function(){const e=window.IntersectionObserver;if(!e)return;const t=Symbol("handled");E.onDocMutations((()=>{const o=rn(ln.commentsPage.showMoreButton);if(!o)return;if(o[t])return;o[t]=!0;const n=rn(ln.commentsPage.scrollContainer);if(!n)return;const i=new e((e=>{e[0].isIntersecting&&(document.body.contains(o)&&o.click(),setTimeout((()=>i.disconnect())))}),{root:n,rootMargin:"200px",threshold:0});i.observe(o)}))}(),async function(){const e=await Me("store");if(!e)return;const t='\n    <svg width="24" height="24" viewBox="0 0 48 48">\n      <path fill="currentColor" d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"/>\n    </svg>\n  ',o='\n    <svg width="24" height="24" viewBox="0 0 24 24">\n      <path fill="currentColor" stroke="currentColor" d="M20.656 17.008a9.993 9.993 0 10-3.59 3.615L22 22z" stroke-linejoin="round" stroke-width="2"/>\n    </svg>\n  ',n=Symbol("handled");E.onDocMutations((()=>{let i;if(i=an(ln.profilePage.post),i=i.filter((e=>!e[n])),0===i.length)return;const r=e.getState(),a=Object.values(r.posts.byId.toJS());i.forEach((e=>{e[n]=!0;const i=e.getAttribute("href").split("/")[2];if(!i)return;const r=a.find((e=>e.code===i));if(!r)return;const s=-1===r.numPreviewLikes?null:Vo(r.numPreviewLikes||0),l=Vo(r.numComments||0);e.insertAdjacentHTML("beforeend",`\n        <div class="post-stats">\n          ${null===s?"":`\n            <div class="post-stats__stat">\n              <div class="post-stats__icon">${t}</div>\n              <div class="post-stats__count">${s}</div>\n            </div>\n          `}\n          <div class="post-stats__stat">\n            <div class="post-stats__icon">${o}</div>\n            <div class="post-stats__count">${l}</div>\n          </div>\n        </div>\n      `)}))})),E.insertMultistyle`
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
      ${ln.profilePage.post}:not(:hover) .post-stats {
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
  `}(),async function(){const e=await Me("store");if(!e)return;const t=()=>{var t;const o=null===(t=e.getState().navigation)||void 0===t?void 0:t.pageIdentifier;o&&(document.body.setAttribute("data-page",o),document.documentElement.setAttribute("data-page",o))};t(),e.subscribe(t)}(),E.insertMultistyle`
    <style>
      ${ln.postCreation.previewContainer} {
        flex-shrink: 0;
        width: 110px;
        height: 110px;
      }
      html.reels--creating-reels ${ln.postCreation.previewContainer} {
        width: 62px;
      }

      ${ln.postCreation.rowButton} {
        cursor: pointer;
      }

      @media (max-width: 440px) {
        ${ln.postCreation.previewContainer} {
          width: 60px;
          height: 60px;
        }
        html.reels--creating-reels ${ln.postCreation.previewContainer} {
          width: 45px;
          min-width: 45px;
          height: 80px;
        }
      }

      ${ln.postCreation.previewPostImage} {
        border-radius: 4px;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
      }

      /* fix story media being cutted */
      ${ln.storyViewer.mediaContainer} {
        width: 100%;
        height: 100%;
        background-color: #000;
      }

      ${ln.storyViewer.videoPoster} {
        object-fit: contain;
      }
    </style>
  `,async function(){document.addEventListener("click",(async e=>{const t=e.target.closest(ln.general.iconButton);if(!t)return;if(!!!rn(ln.general.planeIcon,t))return;const o=t.closest(ln.general.post);if(!o)return;const n=rn(ln.general.postThreeDotsButton,o);if(!n)return;e.preventDefault(),e.stopPropagation();const i=new Promise((e=>{E.onDocMutations((function t(){rn(ln.general.actionDialog)&&(setTimeout((()=>{E.onDocMutations.off(t)})),e())}))}));n.click(),await i;const r=an(ln.general.actionDialogItem).find((e=>e.innerText.toLowerCase().includes("share")||e.innerText.endsWith("...")||e.innerText.endsWith("…")));r&&r.click()}),!0)}(),async function(){const e=await Me("store");if(!e)return;let t=null;E.onDocMutations((()=>{const o=rn(ln.postCreation.expandImageButton);if(!o)return;const n=e.getState().creation.sessionId;n!==t&&(t=n,o.click())}))}(),async function(){const e=(e,t)=>window.innerWidth>320?Math.min(125,t/e*100):Math.min(180,t/e*100);Object.defineProperty(Object.prototype,"getHeightPercent",{get:function(){return({width:t,height:o})=>e(t,o)},set:function(){return!0}}),Object.defineProperty(Object.prototype,"getWrapperHeightStyle",{get:function(){return(t,o)=>({paddingBottom:`calc(${e(o,t)}% - 1px)`})},set:function(){return!0}}),E.insertMultistyle`
    <style>
      ${ln.postCreation.video} {
        width: 100%;
        height: 100%;
        background-color: #000;
      }

      ${ln.postCreation.videoPoster} {
        object-fit: contain;
      }
    </style>
  `}(),E.insertMultistyle`
    <style>
      ${ln.postCreation.captionContainer} {
        flex-direction: row-reverse !important;
      }

      ${ln.postCreation.captionTextarea} {
        display: block;
        width: 100%;
        margin: 0;
        padding: 0 12px;
        box-sizing: border-box;
      }

      ${ln.postCreation.userAvatar} {
        display: none;
      }

      ${ln.postCreation.mentionsOverlay} {
        background: transparent !important;
      }

      ${ln.postCreation.tagPeopleButton} {
        padding: 20px;
        cursor: pointer;
        background: transparent;
        border: none;
      }
    </style>
  `,function(){const e=Symbol("handled");E.onDocMutations((async()=>{const t=rn(ln.profilePage.avatarStoryRing);if(!t)return;if(t[e])return;t[e]=!0;const o=t.getContext("2d"),n=await E.waitFor((()=>{if(!document.body.contains(t))return null;const e=o.getImageData(0,0,t.width,t.height).data;for(let t=0;t<e.length;t+=4){const o=[e[t],e[t+1],e[t+2]];if(!(0===o[0]&&0===o[1]&&0===o[2]))return o}return null}),{timeout:5e3});if(!n)return;const i=n[0]===n[1]&&n[0]===n[2];t.insertAdjacentHTML("beforebegin",`<div class="avatar-story-ring ${i?"avatar-story-ring_viewed":""}"></div>`)})),E.insertMultistyle`
    <style>
      ${ln.profilePage.avatarStoryRing} {
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
  `}(),E.onDocMutations((()=>{const e=rn(ln.general.cookieModalContent);if(!e)return;const t=e.closest(ln.general.modal);t&&t.remove()})),function(){const e=Symbol("handled");E.onDocMutations((()=>{const t=rn(ln["highlights-container"]);t&&(t[e]||(t[e]=!0,E.smartHorizontalScroll.init(t)))}))}(),window.addEventListener("click",(e=>{if("v2"!==window.inssist.igBundleVersion)return;if(!e.metaKey&&!e.ctrlKey)return;const t=e.target.closest("a[href]");t&&t.href&&(e.preventDefault(),e.stopPropagation(),window.open(t.href))}),!0),async function(){const e=await Me("nav");if(!e)return;const t=/\/reel\/[\w-]+\//;window.addEventListener("click",(o=>{if("v2"!==window.inssist.igBundleVersion)return;const n=o.target.closest("a[href]");if(!n)return;const i=n.getAttribute("href")||"";t.test(i)&&(o.preventDefault(),o.stopPropagation(),e.push(i))}),!0)}(),function(){const e=new Map,t=[ln.general.tabBarAvatarContainer,ln.general.storyTrayViewerAvatarContainer];E.onDocMutations((()=>{for(const o of t){const t=rn(o);t&&(t.innerHTML&&!e.has(o)?e.set(o,t.innerHTML):!t.innerHTML&&e.has(o)&&(t.innerHTML=e.get(o)))}}))}(),async function(){const e=await Me("add-dispatch-listener");if(!e)return;e((async e=>{"DELETE_POST_SUCCEEDED"===e.type&&(await E.sleep(300),document.body.innerText.length>0||(history.back(),await E.sleep(100),location.reload()))}))}(),function(){const e=Symbol(),t="inssist.exceptionDialogClosedAt";E.onDocMutations((()=>{const o=rn(ln.general.exceptionDialogOkButton);if(!o)return;if(o[e])return;o[e]=!0;const n=E.ls.get(t)||0;if(n&&Date.now()-n<1*E.time.MINUTE)return;E.ls.set(t,Date.now());const i=o.closest(ln.general.dialogRoot);i&&(i.style.display="none")}))}(),function(){const e="inssist.errorPageReloadedAt";E.onDocMutations((()=>{if(!rn(ln.general.errorPageContent))return;const t=E.ls.get(e)||0;t&&Date.now()-t<1*E.time.MINUTE||(E.ls.set(e,Date.now()),location.reload())}))}(),async function(){const e=await Me("store");if(!e)return;let t=!1;e.subscribe((()=>{var o;if(t)return;"httpErrorPage"===(null===(o=e.getState().navigation)||void 0===o?void 0:o.pageIdentifier)&&(we.send("ga.send-event","user","ig:page-not-found"),t=!0)}))}(),async function(){const e=await Me("store");if(!e)return;let t="";e.subscribe((()=>{var o,n;const i=null===(o=e.getState().direct)||void 0===o||null===(n=o.badge)||void 0===n?void 0:n.count;if("number"!=typeof i)return void console.error("failed to extract dm count");let r;r=0===i?"":i<10?String(i):"9+",r!==t&&(t=r,we.send("dm.update-badge",r))}))}(),function(){const e=Date.now();E.onDocMutations((()=>{if(!document.body)return;if(Date.now()-e>10*E.time.SECOND)return;document.body.innerText.includes("Sorry! Something went wrong :(")&&(location.href="/")}))}(),function(){const e=Symbol("handled");E.onDocMutations((()=>{const t=E.$(ln.postCreation.submitPostButton);t&&(t[e]||(t[e]=!0,t.style.setProperty("width",`${t.offsetWidth}px`,"important"),t.style.setProperty("display","flex","important"),t.style.setProperty("flex-direction","row","important"),t.style.setProperty("justify-content","flex-end","important")))}))}(),E.insertMultistyle`
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
  `,E.insertMultistyle`
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
  `,E.insertMultistyle`
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
  `,E.insertMultistyle`
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
  `}};let ln,cn;var dn={init:function(){document.addEventListener("click",(e=>{zo.onDocClick(e)}),!0),function(){let e=location.pathname;zo.onPathChange(e),E.onDocMutations((()=>{const t=location.pathname;e!==t&&(zo.onPathChange(t),e=t)}))}()}};var pn={init:function(){we.on("ig.publish-story",un)}};async function un({imageUrl:e,mentions:t=[]}){const o=await Me("http"),n=await async function(e){const t=await fetch(e),o=await t.blob();return await async function(e){return new Promise(((t,o)=>{const n=new FileReader;n.onerror=()=>{o()},n.onload=()=>{t(n.result)},n.readAsDataURL(e)}))}(o)}(e),i=document.createElement("img");i.src=n,document.body.appendChild(i),await new Promise((e=>{i.onload=e}));const r=i.clientWidth,a=i.clientHeight,s=document.createElement("canvas");s.width=r,s.height=a;s.getContext("2d").drawImage(i,0,0),i.remove();const l=await new Promise((e=>{s.toBlob(e,"image/jpeg")})),c=Date.now().toString(),d=`fb_uploader_${c}`;let p=null;try{await o.post(`/rupload_igphoto/${d}`,l,{headers:{"X-Instagram-Rupload-Params":JSON.stringify({media_type:1,upload_id:c,upload_media_width:r,upload_media_height:a}),"X-Entity-Name":d,"X-Entity-Length":String(l.size),Offset:"0"},timeout:Number.POSITIVE_INFINITY})}catch(e){p=e}if(!p)try{await o.post("/create/configure_to_story/",{upload_id:c,caption:"",reel_mentions:JSON.stringify(t.map((e=>({user_id:e.userId,x:e.cx,y:e.cy,width:e.width,height:e.height,rotation:0}))))})}catch(e){p=e}return{error:p}}var gn={init:function(){hn=Se.controller.getConfig().igSelectors,async function(){const e=await Me("store");E.onDocMutations((()=>{const t=E.$$(hn["post-item"]),o=E.$$(hn["story-container"]);[...t,...o].forEach((t=>{if(t.withActions)return;const n=o.includes(t),i=!!t.querySelector("video");let r=!1,a=!1;const s=t.closest("[data-post-id]");if(s){const t=s.dataset.postId,o=e.getState().posts.byId.get(t);a="clips"===(null==o?void 0:o.productType),r="igtv"===(null==o?void 0:o.productType),r&&s.setAttribute("data-media-actions-post-type","igtv"),a&&s.setAttribute("data-media-actions-post-type","reels")}const l=function({isIgtv:e=!1,isStory:t=!1,isVideo:o=!1,isReels:n=!1}={}){return`\n    <div class="\n      mediaActions\n      ${e?"mediaActions_igtv":""}\n      ${n?"mediaActions_reels":""}\n      ${t?"mediaActions_story":"mediaActions_post"}\n      ${o?"mediaActions_video":"mediaActions_photo"}">\n      <button class="mediaActions__button" data-action="open" title="open in new tab">\n        <svg xmlns="http://www.w3.org/2000/svg" width="12.507" height="12.501" viewBox="0 0 12.507 12.501">\n          <path d="M179.372-.5V1h3.3l-5.148,5.148,1.7,1.7L184.371,2.7V5.948h1.51V-.5Z" transform="translate(-173.374 0.504)" fill="currentColor"/>\n          <path d="M8,93.55H2v-6H4l2-2H0v10H10v-6l-2,2Z" transform="translate(0 -83.049)" fill="currentColor"/>\n        </svg>\n      </button>\n    </div>\n  `}({isStory:n,isVideo:i,isIgtv:r,isReels:a});t.insertAdjacentHTML("afterbegin",l),t.withActions=!0}))}))}(),zo.onDocClick((async e=>{const t=e.target.closest(".mediaActions__button");if(!t)return;e.preventDefault(),e.stopPropagation();const o=t.closest("li")||t.closest(hn["post-item"])||t.closest(hn["story-container"]),n=o.querySelector("img"),i=o.querySelector("video");if(!n&&!i)return void we.send("ig.error","unable to find media for button");const r=(await Me("store")).getState();let a;const s=e.target.closest("[data-post-id]");a=s?s.dataset.postId:r.stories.reels.get(r.stories.currentReelId).itemIds[r.stories.currentReelItemIndex];const l=r.posts.byId.get(a),c=t.getAttribute("data-action");let d;if(i)d=i.getAttribute("src")||i.querySelector("source").getAttribute("src");else if(n){var p,u;!l.isSidecar&&(null===(p=l.displayResources)||void 0===p?void 0:p.length)>0&&(d=l.displayResources.slice().sort(((e,t)=>t.configWidth-e.configWidth))[0].src),d||(d=null===(u=n.getAttribute("srcset"))||void 0===u?void 0:u.split(",").map((e=>({src:e.split(" ")[0],configWidth:e.split(" ")[1]}))).sort(((e,t)=>t.configWidth-e.configWidth))[0].src),d||(d=n.getAttribute("src"))}if("open"===c){const e=i&&i.outerHTML||n&&n.outerHTML;we.send("ig.media-open",{url:d,html:e})}})),E.insertMultistyle`
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
      ${hn["post-item"]}:hover .mediaActions,
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

      ${hn["post-item"]} video::-webkit-media-controls-panel {
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
      ${hn["post-item"]}:not(:hover) video::-webkit-media-controls-panel {
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
  `}};let hn;var fn={init:function(){mn=Se.controller.getConfig().igSelectors,zo.onPathChange((e=>{we.send("ig.path-change",e)})),async function(){const e=await Me("http");if(!e)return;const t=e.post.bind(e);e.post=async(...e)=>{const o=e[0];let n=o.includes("/create/configure_to_story")?"story":o.includes("/media/configure_to_clips")?"reel":o.includes("/igtv/configure_to_igtv")||o.includes("/create/configure")?"video":o.includes("/media/configure")?"photo":null;if(n){const o=await t(...e);if("ok"===o.status){if("story"===n){var i;n=!!(null===(i=o.media)||void 0===i?void 0:i.video_duration)?"story-video":"story-photo"}we.send("ig.published",n)}return o}return t(...e)}}(),zo.onDocClick((e=>{e.target.closest(".xWeGp")&&we.send("ig.open-dm")})),we.on("ig.back",(async()=>{await no()?location.href="/":history.state&&history.state.key&&history.back()})),we.on("ig.refresh",(()=>{location.reload()})),we.on("ig.broadcast-scroll",(e=>{zo.docElem.scrollTop+=e})),function(){let e;(async()=>{e=await Me("nav")})(),we.on("ig.ajax-go",(t=>{e?e.push(t):location.href=t}))}(),async function(e){we.on("ig.hard-go",(e=>{location.href=e}))}(),we.on("ig.get-url",(()=>location.pathname+location.search)),we.on("ig.clear-and-show-spinner",(()=>{const e=E.$(mn.general.reactRoot);e&&(e.innerHTML="")}))}};let mn;var yn={init:async function(){if(bn=Se.controller.getConfig().igSelectors,_n=await Me("store"),!_n)return;(function(){let e;Object.defineProperty(Object.prototype,"getVideoCoverPhoto",{get:function(){return(...t)=>{const o=t[0];if(Cn.onCall(o),!Cn.prevented){if(Cn.result){const e=Cn.result;return Cn.result=null,e}return e(...t)}Cn.prevented=!1}},set:function(t){return e=t,!0}})})(),async function(){await E.waitForDocumentReady(),Pn=Uo.create({onClick:kn})}(),zo.onBeforeStoryCreation((()=>{xn="story",Tn()})),zo.onBeforePostCreation((()=>{window.require("PolarisCreationActionCreationSelectImage"),window.require("PolarisCreationActionCreationSelectMedia"),xn=Le.controller.isCreatingReels()?"reels":"post",Tn()})),zo.onMediaProcessingError((()=>{Mn()})),E.onDocMutations((()=>{const e=!!E.$(bn.postCreationPage),t=!!E.$(bn.storyCreationPage);(e||t)&&Mn()})),function(){const e=Symbol();E.onDocMutations((()=>{E.$$('input[accept*="image/jpeg"').forEach((t=>{t[e]||(t[e]=!0,t.setAttribute("accept","image/jpeg, image/png, video/quicktime, video/mp4, video/webm"))}))}))}(),Cn.onCall((e=>{const{error:t,...o}=function(e){const t=e.videoWidth,o=e.videoHeight;if(!t||!o)return{error:"wrong-format"};if(Le.controller.isCreatingReels()&&t===o)return{error:"square-reel-video"};const n=t/o,i=vn[xn].minRatio,r=vn[xn].maxRatio;return n<i||n>r?{error:"wrong-ratio",ratio:n}:e.duration<vn[xn].minVideoDuration?{error:"video-too-short"}:e.duration>vn[xn].maxVideoDuration?{error:"video-too-long"}:{error:null}}(e);t&&(async()=>{Cn.prevented=!0,_n.dispatch({type:"inssist.ig.stop-creation-session"});const n=await fetch(e.src),i=await n.blob();await En(i.type,t,o),zo.onMediaProcessingError()})()})),Cn.onCall((e=>{"story"===xn&&(Cn.result=new Promise((t=>{const o=document.createElement("canvas");e.currentTime=0,e.addEventListener("timeupdate",(()=>{o.width=e.videoWidth,o.height=e.videoHeight,o.getContext("2d").drawImage(e,0,0),o.toBlob((o=>{t({file:o,dataURL:URL.createObjectURL(o),uploadMediaWidth:e.videoWidth,uploadMediaHeight:e.videoHeight,videoTransform:null})}),"image/jpeg")}))})))})),E.insertMultistyle`
    <style>
      ${bn.general.uploadPanel} {
        z-index: 1;
      }
    </style>
  `,async function(){const e=await Me("http");if(!e)return;const t=e.post.bind(e);e.post=(...e)=>{var o,n,i;if((null===(o=e[0])||void 0===o?void 0:o.includes("/rupload_igvideo"))&&!(null===(n=e[0])||void 0===n?void 0:n.includes("story"))){const t=e[2].headers,o=JSON.parse(t["X-Instagram-Rupload-Params"]);o.is_clips_video||(o.is_igtv_video=!0,o.is_unified_video=1,t["X-Instagram-Rupload-Params"]=JSON.stringify(o))}else(null===(i=e[0])||void 0===i?void 0:i.includes("/create/configure/"))&&(e[0]="/igtv/configure_to_igtv/",e[1]={source_type:"library",caption:e[1].caption,upcoming_event:"",upload_id:e[1].upload_id,usertags:e[1].usertags,custom_accessibility_caption:e[1].custom_accessibility_caption,disable_comments:0,like_and_view_counts_disabled:0,igtv_ads_toggled_on:"",igtv_share_preview_to_feed:1,is_unified_video:1,video_subtitles_enabled:0});return t(...e)}}()}};const vn={clickShowErrorTimeout:10*E.time.SECOND,forceShowErrorTimeout:30*E.time.SECOND,story:{minRatio:.12,maxRatio:1.91,minRatioPrettyStr:"0.12",maxRatioPrettyStr:"1.91:1",minRatioValueStr:"0.12",maxRatioValueStr:"1.91",minVideoDuration:1,maxVideoDuration:300.9,minVideoDurationStr:"1 second",maxVideoDurationStr:"5 minutes",alertErrorMessage:"Uploading video cancelled. Please ensure that the video is 1 to 5 minutes long and the size ratio is less than 1.91:1."},post:{minRatio:.12,maxRatio:1.91,minRatioPrettyStr:"0.12",maxRatioPrettyStr:"1.91:1",minRatioValueStr:"0.12",maxRatioValueStr:"1.91",minVideoDuration:1,maxVideoDuration:900.9,minVideoDurationStr:"1 second",maxVideoDurationStr:"15 minutes",alertErrorMessage:"Uploading video cancelled. Please ensure that the video is 1 second to 15 minutes long and the size ratio is less than 1.91:1."},reels:{minRatio:.12,maxRatio:1.91,minRatioPrettyStr:"0.12",maxRatioPrettyStr:"1.91:1",minRatioValueStr:"0.12",maxRatioValueStr:"1.91",minVideoDuration:1,maxVideoDuration:900.9,minVideoDurationStr:"1 second",maxVideoDurationStr:"15 minutes",alertErrorMessage:"Uploading video cancelled. Please ensure that the video is 1 second to 15 minutes long and the size ratio is less than 1.91:1."}};let bn,_n,xn,Pn,wn,Sn;const Cn={onCall:E.createEmitter(),result:null,prevented:!1};function Tn(){Pn&&(wn=Date.now(),Uo.toggle(Pn,!0),Sn=setTimeout((()=>{alert(vn[xn].alertErrorMessage),Mn()}),vn.forceShowErrorTimeout))}function Mn(){Pn&&(Uo.toggle(Pn,!1),clearTimeout(Sn))}function kn(){Date.now()-wn>vn.clickShowErrorTimeout&&alert(vn[xn].alertErrorMessage),Mn()}async function En(e,t,o={}){const n=En;if(n.shown)return;n.shown=!0;const i=vn[xn];if("wrong-ratio"===t){const e=o.ratio.toFixed(3);document.body.insertAdjacentHTML("beforeend",`\n      <div class="video-error modal">\n        <div class="modal__window">\n          <div class="video-error__title modal__title">\n            <span class="emoji">😱</span> UNSUPPORTED ASPECT RATIO\n          </div>\n          <div class="modal__content">\n            ${o.ratio<i.minRatio?`\n              Uploaded Video Aspect Ratio is <b>${e}</b>\n              which is <b>below ${i.minRatioPrettyStr} (${i.minRatioValueStr})</b>.\n            `:`\n              Uploaded Video Aspect Ratio is <b>${e}</b>\n              which is <b>above ${i.maxRatioPrettyStr} (${i.maxRatioValueStr})</b>.\n            `}\n            <div class="video-error__convert-section">\n              You can resize the video with one of these free tools:\n              <ul>\n                <li><a href="https://ezgif.com/resize-video" target="_blank">ezgif.com</a></li>\n                <li><a href="https://clideo.com/resize-video" target="_blank">clideo.com</a></li>\n                <li><a href="https://cloudconvert.com/mp4-converter" target="_blank">cloudconvert.com</a></li>\n              </ul>\n            </div>\n            <button class="video-error__got-it-button">\n              OK, GOT IT\n            </button>\n          </div>\n        </div>\n      </div>\n    `)}else if("wrong-format"===t){let t;t="video/quicktime"===e?"https://www.zamzar.com/convert/mov-to-webm":"video/mp4"===e?"https://www.zamzar.com/convert/mp4-to-webm":"https://www.zamzar.com",document.body.insertAdjacentHTML("beforeend",`\n      <div class="video-error modal">\n        <div class="modal__window">\n          <div class="video-error__title modal__title">\n            <span class="emoji">😱</span> UNABLE TO UPLOAD VIDEO\n          </div>\n          <div class="modal__content">\n            Instagram server rejected this video for upload.\n            Please ensure uploaded video uses supported format and codec (e.g. MP4/h264 or WEBM).\n            <div class="video-error__convert-section">\n              You can convert video format with one of these tools:\n              <ul>\n                <li><a href="https://video.online-convert.com/convert-to-mp4" target="_blank">video.online-convert.com</a></li>\n                <li><a href="https://cloudconvert.com/mp4-converter" target="_blank">cloudconvert.com</a></li>\n                <li><a href="https://ezgif.com/resize-video" target="_blank">ezgif.com</a></li>\n                <li><a href="${t}" target="_blank">zamzar.com</a></li>\n              </ul>\n            </div>\n            <button class="video-error__got-it-button">\n              OK, GOT IT\n            </button>\n          </div>\n        </div>\n      </div>\n    `)}else"video-too-short"===t?document.body.insertAdjacentHTML("beforeend",`\n      <div class="video-error modal">\n        <div class="modal__window">\n          <div class="video-error__title modal__title">\n            <span class="emoji">😱</span> VIDEO IS TOO SHORT\n          </div>\n          <div class="modal__content">\n            <div style="display: block">\n              Instagram server did not accept this video,\n              because it is less than <b>${i.minVideoDurationStr}</b> long.\n            </div>\n            <button class="video-error__got-it-button">\n              OK, GOT IT\n            </button>\n          </div>\n        </div>\n      </div>\n    `):"video-too-long"===t?document.body.insertAdjacentHTML("beforeend",`\n      <div class="video-error modal">\n        <div class="modal__window">\n          <div class="video-error__title modal__title">\n            <span class="emoji">😱</span> VIDEO IS TOO LONG\n          </div>\n          <div class="modal__content">\n            Instagram server did not accept this video,\n            because it is over <b>${i.maxVideoDurationStr}</b>\n            long.\n            <div class="video-error__convert-section">\n              You can cut video short with this free\n              <a href="https://online-video-cutter.com/" target="_blank">online video cutter tool</a>.\n            </div>\n            <button class="video-error__got-it-button">\n              OK, GOT IT\n            </button>\n          </div>\n        </div>\n      </div>\n    `):"square-reel-video"===t&&document.body.insertAdjacentHTML("beforeend",'\n      <div class="video-error modal">\n        <div class="modal__window">\n          <div class="video-error__title modal__title">\n            <span class="emoji">😱</span> UNSUPPORTED ASPECT RATIO\n          </div>\n          <div class="modal__content">\n            <div style="display: block">\n              Instagram API does not support posting square 1:1 videos to Reels.\n            </div>\n            <div style="height: 8px"></div>\n            <div style="display: block">\n              • Supported ratios are 4:5 to 1.91:1.<br>\n              • Optimal is 9:16 or 1080x1920px <span class="emoji">🚀</span>\n            </div>\n            <div style="height: 8px"></div>\n            <div style="display: block">\n              You can crop your video online with a&nbsp;free\n              <a href="https://ezgif.com/crop-video" target="_blank">ezgif video cropper tool</a>.\n            </div>\n            <button class="video-error__got-it-button">\n              OK, GOT IT\n            </button>\n          </div>\n        </div>\n      </div>\n    ');n.init||(n.init=!0,zo.onDocClick((e=>{if(!e.target.closest(".video-error__got-it-button"))return;E.$(".video-error").remove(),n.shown=!1})),E.insertMultistyle`
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
  `)}var $n={init:function(){Dn=Se.controller.getConfig().igSelectors,function({minWidth:e}){E.insertMultistyle`
    <style>
      @media (min-width: ${e}px) {
        ${Dn.general.tabBarWrap} {
          height: 0;
          margin-top: 12px;
        }

        ${Dn.general.tabBar} {
          width: 490px;
          height: 58px;
          margin: 0 auto;
          box-shadow: 0 0px 12px rgba(0, 0, 0, 0.14);
          border-radius: 15px 15px 0 0;
          border: none;
        }
        .theme-night ${Dn.general.tabBar} {
          background: #E7E8EA;
          border: 1px solid #FFF;
          border-bottom: none;
          box-shadow: none;
          box-sizing: content-box;
        }

        ${Dn.general.tabBar}::before {
          display: none;
        }
      }
    </style>
  `}({minWidth:500}),function({minWidth:e}){E.insertMultistyle`
    <style>
      @media (min-width: ${e}px) {
        ${Dn.general.header}::before {
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

        ${Dn.general.headerContent} {
          width: 490px !important;
          margin-left: auto;
          margin-right: auto;
        }
      }
    </style>
  `}({minWidth:500}),function({minWidth:e}){let t=An().scrollTop;const o=()=>{const o=E.$(Dn.general.header);if(!o)return;if(window.innerWidth<e)return void(o.style.transform=null);const n=An().scrollTop,i=n-t,r=i>6;t=n,i<-6||n<=45?o.style.transform=null:r&&(o.style.transform="translateY(-45px)")};if(window.addEventListener("resize",o),document.addEventListener("scroll",o),ct()){const e=Symbol("handled");E.onDocMutations((()=>{const t=An();t&&(t[e]||(t[e]=!0,t.addEventListener("scroll",o)))}))}E.insertMultistyle`
    <style>
      @media (min-width: ${e}px) {
        ${Dn.general.header} {
          transition: transform 0.3s;
        }
      }
    </style>
  `}({minWidth:460}),function({minWidth:e}){E.insertMultistyle`
    <style>
      @media (min-width: ${e}px) {
        ${Dn.general.storyPreviewContainer} {
          border: 1px solid #EDEDED !important;
          border-radius: 3px;
          margin-top: 18px;
          margin-bottom: 14px;
        }

        html[data-page="feedPage"] ${Dn.general.recommendationsContainer} {
          border: 1px solid #EDEDED !important;
          border-radius: 3px;
        }
      }
    </style>
  `}({minWidth:500}),function({minWidth:e}){E.insertMultistyle`
    <style>
      @media (min-width: ${e}px) {
        ${Dn.explorePage.searchResults} {
          width: 100%;
          max-width: 460px;
          margin: -16px auto 0;
        }

        /* thin border for posts */
        ${Dn.explorePage.post} {
          position: relative;
        }
        ${Dn.explorePage.post}::before {
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
  `}({minWidth:736}),function({minWidth:e}){E.onDocClick((async t=>{if(window.innerWidth<e)return;const o=t.target.closest(Dn.profilePage.post);if(!o)return;t.preventDefault(),t.stopPropagation();const n=o.getAttribute("href");(await Me("nav")).push(n)}),{capture:!0}),E.insertMultistyle`
    <style>
      @media (max-width: ${e-1}px) {
        ${Dn.profilePage.header} {
          margin-top: 20px !important;
        }
      }

      @media (min-width: ${e}px) {
        ${Dn.profilePage.content} {
          padding-top: 0 !important;
        }

        ${Dn.profilePage.header} {
          padding-top: 26px;
        }

        ${Dn.profilePage.avatarWithStoryWrap} {
          margin-top: 6px;
        }

        ${Dn.profilePage.username} {
          position: relative;
          top: -3px;
        }

        ${Dn.profilePage.settingsMenuWrap} {
          background: #FFF !important;
        }

        ${Dn.profilePage.settingsMenu} {
          background: #FAFAFA;
          width: 100%;
          max-width: 490px;
          margin: 0 auto;
          border-left: 1px solid #EDEDED;
          border-right: 1px solid #EDEDED;
        }
      }
    </style>
  `}({minWidth:736}),async function({minWidth:e}){if(await no())return void await we.send("ig.update-ig-view",{fullscreenWidth:550,withBorder:!0});const t=await Me("store");let o;async function n(){var e;const n=E.$(Dn.general.root);if(!n)return;if(o===n)return;let i;o=n;const r=location.pathname,a=null===(e=t.getState().navigation)||void 0===e?void 0:e.pageIdentifier;if(!a)return;const s="/create/story/"!==r&&r.startsWith("/create/");i=r.startsWith("/accounts/signup/")||"loginPage"===a||"unifiedHome"===a?{width:460,borders:!0}:s?{width:490,borders:!0}:"StoriesPage"===a?{width:460,borders:!1}:"exploreLandingPage"===a||"profilePage"===a?{width:760,borders:!1}:{width:550,borders:!1};const l=E.$(Dn.general.tabBar),c=E.$(Dn.general.header),d=E.$(Dn.general.content);l&&(l.style.opacity=0),c&&(c.style.opacity=0),d&&(d.style.transition=null,d.style.transform="translateY(3px)",d.style.opacity=0),await we.send("ig.update-ig-view",{fullscreenWidth:i.width,withBorder:i.borders}),l&&(l.style.opacity=null),c&&(c.style.opacity=null),d&&(d.style.transition="transform 0.2s, opacity 0.2s",d.style.transform=null,d.style.opacity=null)}we.on("ig.widescreen-toggled",n),E.onDocMutations((()=>{window.innerWidth<e||n()}),!0)}({minWidth:460}),async function(){const e=await Me("nav");if(!e)return;const t=Symbol("handled");E.onDocMutations((()=>{E.$$(Dn.profilePage.followersFollowingsLink).forEach((o=>{o[t]||(o[t]=!0,o.addEventListener("click",(async t=>{if(!(window.innerWidth>=725))return;t.preventDefault(),t.stopPropagation(),await we.send("ig.force-small-iframe-width",!0);const n=document.body;n.style.opacity=0,n.style.transform="translateY(3px)",await E.waitFor((()=>window.innerWidth<700)),await E.sleep(100),e.push(o.getAttribute("href")),await E.waitFor((()=>E.$('html[data-page="followList"]'))),n.style.transition="all 0.3s ease",n.style.opacity=null,n.style.transform=null,await E.sleep(300),n.style.transition=null,we.send("ig.force-small-iframe-width",!1)}),{capture:!0}))}))}))}()}};let Dn;function An(){return E.docElem}var In={init:function(){Rn=Se.controller.getConfig().igSelectors,zo.onDocClick((e=>{const t=e.target.closest(".-wt5I");t&&setTimeout((()=>{document.body.contains(t)&&t.click()}),300)})),function(){const e=HTMLElement.prototype.getBoundingClientRect;HTMLElement.prototype.getBoundingClientRect=function(...t){const o=e.call(this,...t);return 0===o.height&&(o.height=1),o}}(),E.insertMultistyle`
    <style>
      /* story spinner */
      .u6s6p {
        display: none !important;
      }
    </style>
  `,E.insertMultistyle`
    <style>
      ${Rn["story-container"]} {
        width: 100% !important;
        height: 100% !important;
      }

      ${Rn["story-image"]},
      ${Rn["story-video"]},
      ${Rn["story-loading-preview"]} {
        object-fit: contain;
      }
    </style>
  `,E.insertMultistyle`
    <style>
      .theme-night ${Rn.storyViewer.pollContainer} {
        filter: url(#theme-reverse-filter);
        color: transparent;
      }

      ${Rn.storyViewer.pollButtons} {
        font-family: inherit !important;
      }

      ${Rn.storyViewer.pollAnswerDigitOrEmoji} {
        -webkit-text-fill-color: inherit !important;
      }

      ${Rn.storyViewer.pollAnswerDigitOrEmoji} .emoji {
        filter: none !important;
        color: initial !important;
        -webkit-text-fill-color: initial !important;
      }
    </style>
  `,document.addEventListener("keyup",(e=>{if("Escape"===e.key){const e=E.$(Rn.storyViewer.closeButton);if(!e)return;e.click()}else if("ArrowLeft"===e.key){const e=E.$(Rn.storyViewer.prevButton);if(!e)return;e.click()}else if("ArrowRight"===e.key){const e=E.$(Rn.storyViewer.nextButton);if(!e)return;e.click()}})),function(){const e="__manageStoriesAutoplay";let t=null,o=!1;E.onDocMutations((()=>{const n=E.$(Rn["stories-viewer"]);t&&!n&&(o=!1,zo.docElem.classList.remove("enable-stories-autoplay")),t=n;const i=E.$(Rn["story-video-play-button"]);o&&i&&!i[e]&&setTimeout((()=>{i[e]=!0,i.click()}),200)})),zo.onDocClick((t=>{const n=t.target.closest(Rn["story-video-play-button"]);n&&!o&&(n[e]=!0,o=!0,zo.docElem.classList.add("enable-stories-autoplay"))})),E.insertMultistyle`
    <style>
      .enable-stories-autoplay ${Rn["story-video-play-button"]} {
        opacity: 0;
      }
    </style>
  `}(),function(){const e=window.addEventListener;window.addEventListener=(...t)=>{if("blur"!==t[0])return e.call(window,...t)}}()}};let Rn;var Bn={storySharingPost:!1},Ln={init:function(){On=Se.controller.getConfig().igSelectors,E.insertMultistyle`
    <style>
      ${On.storyCreation.topRightButton} {
        cursor: pointer;
      }
    </style>
  `,async function(){const e=await Me("store");if(!e)return;const t=CanvasRenderingContext2D.prototype.drawImage;CanvasRenderingContext2D.prototype.drawImage=function(...o){if(!(9===o.length&&o[0]instanceof HTMLImageElement&&"/create/story/"===location.pathname))return t.call(this,...o);const n=E.$(On.storyCreation.root);if(!n)return t.call(this,...o);const i=JSON.parse(JSON.stringify(e.getState())).displayProperties.pixelRatio;let r,a;n.offsetWidth/n.offsetHeight>9/16?(r=n.offsetHeight*(9/16),a=n.offsetHeight):(r=n.offsetWidth,a=n.offsetWidth/(9/16)),n.style.width=`${r}px`,n.style.height=`${a}px`,E.$$("canvas").forEach((e=>{e.style.width=`${r}px`,e.style.height=`${a}px`,e.setAttribute("width",r*i),e.setAttribute("height",a*i)}));const s=o[0],l=.04,c=s.width/s.height,d=c>9/16*(1-l)&&c<(1+l)*(9/16)?"cover":"contain";this.restore();const p=r*i,u=a*i;"contain"===d&&(this.filter="blur(170px)",t.call(this,s,-300,-300,p+600,u+600),this.filter="none");const g=function({type:e,width:t,height:o,containerWidth:n,containerHeight:i,offset:r=0}){const a=t/o,s=n/i;return a>s&&"contain"===e||a<s&&"cover"===e?{dx:0+r,dy:(i-n/a)/2+r,width:n-2*r,height:n/a-2*r}:{dx:(n-i*a)/2+r,dy:0+r,width:i*a-2*r,height:i-2*r}}({type:d,width:s.width,height:s.height,containerWidth:p,containerHeight:u,offset:Bn.storySharingPost?60:0});if(t.call(this,s,g.dx,g.dy,g.width,g.height),Bn.storySharingPost){const t=E.$("canvas").getContext("2d"),o=e.getState().displayProperties.pixelRatio,n=Bn.storySharingPost.owner.username,i=60/o,r=(g.dy+g.height+40)/o;t.save(),t.scale(o,o),t.fillStyle="white",t.shadowColor="rgba(150, 150, 150, 0.3)",t.shadowOffsetX=0,t.shadowOffsetY=1,t.shadowBlur=2,t.font="600 22px sans-serif",t.textAlign="left",t.textBaseline="top",t.fillText(`@${n}`,i,r),t.restore()}}}(),function(){const e=Symbol("handled");E.onDocMutations((async()=>{const t=E.$(On.storyCreation.root);if(!t)return;if(t[e])return;t[e]=!0;if(await we.send("ig.is-fullscreen"))return;const o=document.documentElement;o.classList.add("story-creation-dark-background"),E.onDocMutations((function e(){E.$(On.storyCreation.root)||(E.onDocMutations.off(e),o.classList.remove("story-creation-dark-background"))}))})),E.insertMultistyle`
    <style>
      .story-creation-dark-background body {
        background: #0d0d0d;
      }
      .theme-night.story-creation-dark-background body {
        background: #fdfdfd;
      }
    </style>
  `}(),async function(){const e=await Me("http:retry-story-post");if(!e)return;Me.unlockOnNextTick("http:story-assist");const t=e.post.bind(e),o=async(e,n=1)=>{let i;console.log(`trying to post a story, attempt no.${n}`);try{i=await t(...e)}catch{i={status:"fail"}}return"fail"===i.status&&n<5?(await E.sleep(3e3),o(e,n+1)):i};e.post=(...e)=>e[0].includes("/create/configure_to_story/")?o(e):t(...e)}(),function(){const e=Symbol("handled");E.onDocMutations((()=>{const t=E.$(On.storyCreation.downloadButton);t&&(t.parentNode[e]||(t.parentNode[e]=!0,t.remove()))}))}(),E.insertMultistyle`
    <style>
      ${On.storyCreation.mentionBarContainer} {
        width: calc(100% - 100px) !important;
        height: 94px !important;
        top: 0 !important;
        margin-left: -100px !important;
      }

      ${On.storyCreation.mentionBar} {
        height: 100% !important;
        border-radius: 0 0 8px 0;
        position: static;
      }

      ${On.storyCreation.mentionReel} {
        height: 100% !important;
        position: static;
      }

      ${On.storyCreation.mentionReelRow} {
        height: 100% !important;
        align-items: center !important;
        position: static;
      }
      ${On.storyCreation.mentionReelRow}:not(:empty)::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 0 8px 8px 0 !important;
        background: rgba(0 , 0 , 0 , 0.2) !important;
      }

      ${On.storyCreation.mentionReelItem} {
        margin: 0 10px 0 0 !important;
        position: relative;
      }
      ${On.storyCreation.mentionReelItem}:last-child {
        margin-right: 0 !important;
      }
    </style>
  `,function(){const e=Symbol("handled");E.onDocMutations((()=>{const t=E.$(On.storyCreation.video);t&&(t[e]||(t[e]=!0,t.muted=!1,t.controls=!0,t.controlsList="nodownload noremoteplayback noplaybackrate",t.disablePictureInPicture=!0,setTimeout((()=>t.volume=1),100)))})),E.insertMultistyle`
    <style>
      ${On.storyCreation.root} {
        background: #000;
      }

      ${On.storyCreation.videoWrap} {
        position: relative;
      }

      ${On.storyCreation.video} {
        max-width: 100%;
        max-height: 100%;
      }

      ${On.storyCreation.videoPoster} {
        display: none;
      }

      ${On.storyCreation.footer} {
        height: 70px;
        background: transparent;
        position: relative;
      }

      ${On.storyCreation.videoPlayButton} {
        display: none;
      }

      ${On.storyCreation.textColorPicker},
      ${On.storyCreation.drawColorPicker} {
        display: flex;
        flex-direction: column;
      }

      ${On.storyCreation.colorPickerSelectedCircle} {
        position: relative;
        left: -1px;
        top: -1px;
      }
    </style>
  `}(),function(){const e=Symbol();E.onDocMutations((()=>{const t=E.$(On.storyCreation.submitButton);t&&(t[e]||(t[e]=!0,t.addEventListener("click",(()=>{E.$$("video").forEach((e=>e.pause()))}),!0)))}))}(),function(){const e=Event.prototype.preventDefault;Event.prototype.preventDefault=function(...t){var o,n;if(!this.type.startsWith("touch")||!(null===(o=(n=this.target).matches)||void 0===o?void 0:o.call(n,On.storyCreation.canvas)))return e.call(this,...t)}}(),async function(){const e=await Me("http");if(!e)return;const t=e.post.bind(e);e.post=(...e)=>((()=>{var t;if(!(null===(t=e[0])||void 0===t?void 0:t.includes("/configure_to_story")))return;const o=E.$(On.storyCreation.uploadText);o&&(o.innerText="Publishing...")})(),t(...e));const o=Symbol();E.onDocMutations((()=>{const e=E.$(On.storyCreation.uploadText);e&&(e[o]||(e[o]=!0,e.innerText="Uploading...",e.insertAdjacentHTML("afterend",'\n      <div class="StoryUploadText">\n        This might take a minute. Please keep this tab open.\n      </div>\n    ')))})),E.insertMultistyle`
    <style>
      ${On.storyCreation.uploadBar} {
        display: block;
        padding-top: 8px;
        height: 52px;
      }

      ${On.storyCreation.uploadText} {
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
        ${On.storyCreation.uploadBar} {
          padding-top: 9px;
        }
        ${On.storyCreation.uploadText} {
          font-size: 12px;
        }
        .StoryUploadText {
          font-size: 12px;
          margin-top: 0;
        }
      }
    </style>
  `}()}};let On;var Fn={init:async function(){if(Nn=Se.controller.getConfig().igSelectors,Hn=await Me("store"),!Hn)return;E.onDocClick((function(e){e.target.closest('[href="/direct/inbox/"]')&&(e.preventDefault(),e.stopPropagation(),we.send("ig.open-sidebar-dm"))}),{capture:!0}),function(){const e=Symbol("handled");E.onDocMutations((async()=>{const n=E.$(Nn.profilePage.moreButton);if(!n)return;const i=Hn.getState(),r=i.users.viewerId,a=i.users.users.get(r);if(location.pathname.split("/")[1]===a.username)return;let s=E.$(".write-button");if(s&&s!==n.previousElementSibling)return s.remove(),void(n[e]=!1);if(n[e])return;n[e]=!0;await o()&&(n.insertAdjacentHTML("beforebegin",'\n      <button class="write-button">\n        <svg xmlns="http://www.w3.org/2000/svg" width="19.998" height="17.224" viewBox="0 0 19.998 17.224">\n          <path d="M2.079.75h16.57L9.818 15.071l-1.3-9zm6.508 5.315l9.68-5.127" fill="none" stroke="currentColor" stroke-width="1.5"/>\n        </svg>\n      </button>\n    '),s=E.$(".write-button"),s.addEventListener("click",t))})),E.insertMultistyle`
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

      ${Nn.profilePage.writeButton} {
        display: none !important;
      }

      ${Nn.profilePage.followButton} {
        width: auto !important;
        margin-left: 0 !important;
      }

      ${Nn.profilePage.buttonsRow} {
        flex-grow: 0;
        flex-direction: row;
      }

      ${Nn.profilePage.blueButtonsWrap} {
        flex-grow: 0;
        flex-shrink: 0;
      }

      ${Nn.profilePage.subscribeButtonWrap} {
        flex-shrink: 1 !important;
        overflow: hidden !important;
      }
    </style>
  `;const t=async()=>{const e=await o();e&&we.send("ig.start-conversation-in-sidebar-dm",e.id)},o=async()=>{const e=location.pathname.split("/")[1];return await E.waitFor((()=>{const t=Hn.getState(),o=t.users.usernameToId.get(e);return t.users.users.get(o)||null}))}}()}};let Nn,Hn;var zn={init:async function(){if(Un=await Me("store"),!Un)return;Vn=Se.controller.getConfig().igSelectors,function(){const e=Symbol("handled");E.onDocMutations((()=>{const t=E.$(Vn.profilePage.content);if(!t)return;if(t[e])return;t[e]=!0;const o=jn({empty:!0});t.insertAdjacentHTML("afterbegin",o),(async()=>{try{var e;const o=location.pathname.split("/")[1],n=await E.waitFor((()=>{const e=Un.getState(),t=e.users.usernameToId.get(o);if(t)return e.users.users.get(t)}));if(!document.body.contains(t))return;const i=Object.values(Un.getState().posts.byId.toJS()).filter((e=>{var t;return String(null===(t=e.owner)||void 0===t?void 0:t.id)===String(n.id)})).filter((e=>!e.productType||"feed"===e.productType||"igtv"===e.productType)).sort(((e,t)=>t.postedAt-e.postedAt)).slice(0,12),r={userId:n.id,username:n.username,bio:n.bio,postsCount:n.counts.media,followersCount:n.counts.followedBy,followingsCount:n.counts.follows,isPrivate:n.isPrivate,isVerified:n.isVerified,hasAvatar:n.profilePictureUrl.includes("150x150"),hasHighlights:n.highlightReelCount>0,lastPosts:i.map((e=>({ts:1e3*e.postedAt})))};if(Wn.grade=await we.send("chrome-bus","insights.get-credibility-grade",r),!document.body.contains(t))return;Wn.engagement=function({user:e,posts:t}){const o=Un.getState().users.viewerId===e.id;if(e.isPrivate&&!o||0===t.length)return{value:"N/A",color:"#D8DADD",label:""};const n=t.map((e=>e.comments+e.likes)).reduce(((e,t)=>e+t),0),i=t.length>0?n/t.length:0,r=e.followerCount>0?i/e.followerCount*100:0,a=`${r<5?(Math.round(10*r)/10).toFixed(1):Math.round(r).toString()}%`,s={value:a,color:"#797979",label:"average"},l={value:a,color:"#74BE86",label:"above avg"},c={value:a,color:"#74BE86",label:"high"},d={value:a,color:"#74BE86",label:"v. high"},p={value:a,color:"#74BE86",label:"extreme"},u=r/(64.18845*Math.pow(e.followerCount,-.2251755));if(u<.4)return s;if(u<.8)return l;if(u<1.2)return c;if(u<1.8)return d;return p}({user:{id:n.id,isPrivate:n.isPrivate,followerCount:(null===(e=n.counts)||void 0===e?void 0:e.followedBy)||0},posts:i.map((e=>({likes:e.numPreviewLikes||0,comments:e.numComments||0})))});const a=Un.getState().users.viewerId;Wn.followStatus={show:String(a)!==String(n.id),value:n.followsViewer};E.$(".profile-bar").outerHTML=jn();Te({anchor:E.$(".profile-bar__info-circle"),class:"profile-bar__info-tooltip",text:"\n            <b>Account Grade</b>\n            <br/>\n            This estimates if Instagram account is<br/>\n            spam / inactive or a real person / business.\n            Inssist relies on Machine Learning to identify\n            the grade.\n            <br/><br/>\n\n            <b>Engagement Rate</b>\n            <br/>\n            Profile engagement rate is calculated as\n            <code>(likes + comments) / followers</code>, for the last<br/>\n            12 posts. The higher account engagement,<br/>\n            the more active the followers are.\n            <br/><br/>\n\n            <b>Follow Status</b>\n            <br/>\n            Shows if this account is following you or not.\n            <br/><br/>\n\n            Account Grade and Engagement Rate are<br/>\n            not available for private accounts.\n          "})}catch(e){console.error("ig profile bar controller → manageBarCreation:",e);const t=E.$(".profile-bar");t&&t.remove()}})()}))}(),E.insertMultistyle`
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
  `}};let Vn,Un;const Wn={grade:null,engagement:null,followStatus:null};function jn({empty:e=!1}={}){return e?'\n      <div class="profile-bar"></div>\n    ':`\n    <div class="profile-bar">\n      <div class="profile-bar__items">\n        <div class="profile-bar__item">\n          <div class="profile-bar__value">\n            ${Wn.grade?`\n              <span style="color: ${Wn.grade.color}">${Wn.grade.value}</span>,\n              ${Wn.grade.label}\n            `:""}\n          </div>\n          <div class="profile-bar__label">\n            Account grade\n          </div>\n        </div>\n        <div class="profile-bar__item">\n          <div class="profile-bar__value">\n            <span style="color: ${Wn.engagement.color}">\n              ${Wn.engagement.value}\n            </span>\n            ${Wn.engagement.label?`, ${Wn.engagement.label}`:""}\n          </div>\n          <div class="profile-bar__label">\n            Engagement\n          </div>\n        </div>\n        ${Wn.followStatus.show?`\n          <div class="profile-bar__item">\n            <div class="profile-bar__value">\n              ${Wn.followStatus.value?"Yes":"No"}\n            </div>\n            <div class="profile-bar__label">\n              Follows me\n            </div>\n          </div>\n        `:""}\n      </div>\n      <div class="profile-bar__info-circle info-circle">?</div>\n    </div>\n  `}var Gn={init:async function(){if(qn=Se.controller.getConfig().igSelectors,Yn=await Me("nav"),Xn=await Me("http"),Kn=await Me("store"),Jn=await Me("add-dispatch-listener"),!(Yn&&Xn&&Kn&&Jn))return;Jn((e=>{"STORY_CREATION_EXIT"===e.type&&(Bn.storySharingPost=null)})),function(){let e;Jn((t=>{"POST_SHARE_ID_LOADED"!==t.type&&"POST_SHARE_IDS_LOADED"!==t.type||(e=t.postId)}));const t=Symbol("handled");E.onDocMutations((()=>{if(!E.$(qn.dragPanel.sendEmailLink))return;const o=E.$(qn.dragPanel.shareMenuItem);if(!o)return;if(o[t])return;o[t]=!0,o.insertAdjacentHTML("beforebegin",'\n      <div class="share-to-story">\n        <div class="share-to-story__icon">\n          <svg class="share-to-story__icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12.474 22.779a11.28 11.28 0 01-5.294-1.32.777.777 0 11.732-1.37 9.741 9.741 0 006.775.884.777.777 0 01.353 1.513 11.326 11.326 0 01-2.566.293zm-7.205-2.871a.773.773 0 01-.534-.213 11.218 11.218 0 01-3.2-5.509.777.777 0 011.51-.366 9.667 9.667 0 002.757 4.748.777.777 0 01-.534 1.34zm-3.221-8.651h-.077a.776.776 0 01-.7-.849 11.174 11.174 0 01.995-3.632.777.777 0 011.408.656 9.618 9.618 0 00-.854 3.122.777.777 0 01-.772.703zm3.258-6.58a.777.777 0 01-.6-1.269q.1-.127.211-.25a.777.777 0 111.171 1.02c-.062.071-.122.143-.182.215a.776.776 0 01-.6.284zm12.543 16.62a.777.777 0 01-.4-1.443 9.7 9.7 0 00-4.975-18.03.777.777 0 110-1.554 11.255 11.255 0 015.773 20.917.77.77 0 01-.398.11z" fill="currentColor"/><path d="M17.723 10.788h-4.45v-4.45H11.72v4.45H7.27v1.553h4.45v4.45h1.553v-4.45h4.45z" fill="currentColor"/></svg>\n        </div>\n        <div class="share-to-story__text">\n          Share to Story\n        </div>\n      </div>\n    ');E.$(".share-to-story").addEventListener("click",(t=>{t.stopPropagation(),async function(e){const t=Kn.getState().posts.byId.get(e);if(!t)return;const o=await fetch(t.src,{credentials:"omit"}),n=await o.blob(),i=URL.createObjectURL(n),{width:r,height:a}=await new Promise((e=>{const t=new Image;t.src=i,t.addEventListener("load",(()=>{e({width:t.width,height:t.height})}))}));Bn.storySharingPost=t,Kn.dispatch({type:"STORY_CREATION_SESSION_STARTED",entryPoint:"quick_cam_button",sessionId:Math.random().toString().slice(2),startTime:Date.now()}),Kn.dispatch({type:"STORY_CREATION_IMAGE_PROCESSED",flash:!1,location:null,orientation:0,sourceImage:n,sourceDataURL:i,width:r,height:a}),Yn.push("/create/story/")}(e),we.send("ga.send-event","user","ig:share-to-story-click")}))})),E.insertMultistyle`
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
  `}(),function(){const e=Xn.post.bind(Xn);Xn.post=(...t)=>("/create/configure_to_story/"===t[0]&&Bn.storySharingPost&&(t[1]={...t[1],reshared_media_id:Bn.storySharingPost.id,story_sticker_ids:`media_simple_${Bn.storySharingPost.id}`,attached_media:JSON.stringify([{x:.5,y:.5,width:.5,height:.5,rotation:0,media_id:Bn.storySharingPost.id,media_owner_id:Bn.storySharingPost.owner.id,is_sticker:!0}])}),e(...t))}()}};let qn,Yn,Xn,Kn,Jn;var Qn={init:function(){!async function(){const e=await Me("store");if(!e)return;const t=Symbol("handled");E.onDocMutations((()=>{const o=E.$(".get-insights-button-row");if(!o)return;if(o[t])return;o[t]=!0;const n=e.getState(),i=n.navigation.displayedRoute.split("/")[1],r=n.users.usernameToId.get(i);if(!r)return;const a=n.users.users.get(r);if(!a)return;const s=a.businessEmail;s&&o.insertAdjacentHTML("afterbegin",`\n      <a class="profile-email-button" href="mailto:${s}">\n        Email\n      </a>\n    `)})),E.insertMultistyle`
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
  `}()}};function Zn(){const e=window.require("CurrentUserInitialData");return(null==e?void 0:e.APP_ID)||"1217981644879628"}var ei={init:function(){ti=Se.controller.getConfig().igSelectors,async function(){const e=await Me("store"),t=await Me("http");if(!e||!t)return;const o=Symbol("handled");E.onDocMutations((()=>{const t=E.$(ti.general.actionDialogWithoutHeader);if(!t)return;if(t[o])return;t[o]=!0;const n=e.getState();if("postPage"!==n.navigation.pageIdentifier)return;const i=location.pathname.split("/")[2],r=n.posts.byId.toJS(),a=Object.values(r).find((e=>e.code===i));if(!a)return;if(a.owner.id!==n.users.viewerId)return;const s=E.$(ti.general.modalWindow);if(!s)return;t.firstChild.insertAdjacentHTML("afterend",'\n      <button class="edit-post-action-button">\n        Edit Caption\n      </button>\n    ');E.$(".edit-post-action-button").addEventListener("click",(()=>{s.classList.add("post-editor"),t.innerHTML=`\n        <form class="post-editor__form">\n          <div class="post-editor__title">\n            Edit Caption\n          </div>\n          <textarea\n            class="post-editor__textarea"\n            placeholder="Write a caption..."\n            maxlength="2200"\n            spellcheck="false"\n            required\n          >${a.caption||""}</textarea>\n          <div class="post-editor__buttons">\n            <button class="post-editor__button-save button" type="submit">\n              Save Caption\n            </button>\n            <button class="post-editor__button-cancel button button_cancel">\n              Cancel\n            </button>\n          </div>\n          <div class="post-editor__error"></div>\n        </form>\n      `;const e=E.$(".post-editor"),o=E.$(".post-editor__textarea"),n=E.$(".post-editor__button-save"),i=E.$(".post-editor__button-cancel"),r=E.$(".post-editor__error");setTimeout((()=>{o.focus(),o.setSelectionRange(o.value.length,o.value.length)}),300),o.addEventListener("input",(()=>{e.classList.remove("post-editor_with-error")})),e.addEventListener("submit",(async t=>{var s;let l;t.preventDefault(),o.disabled=!0,n.disabled=!0,i.disabled=!0,n.innerText="Saving...";try{l=await fetch(`https://i.instagram.com/api/v1/media/${a.id}/edit_media/`,{method:"POST",credentials:"include",headers:{"content-type":"application/json","x-csrftoken":window._sharedData.config.csrf_token,"x-ig-app-id":Zn()},body:JSON.stringify({caption_text:E.$(".post-editor__textarea").value})}),l=await l.json()}catch(t){l={error:t}}var c,d,p,u,g,h,f;"ok"===(null===(s=l)||void 0===s?void 0:s.status)?location.reload():(o.disabled=!1,n.disabled=!1,i.disabled=!1,n.innerText="Save Caption",e.classList.add("post-editor_with-error"),"igtv"===a.productType?r.innerHTML="\n              Instagram refused to edit caption.\n              Please use Instagram Mobile App to edit caption of this post.\n            ":r.innerText=(null===(c=l)||void 0===c||null===(d=c.error)||void 0===d?void 0:d.message)||(null===(p=l)||void 0===p||null===(u=p.error)||void 0===u||null===(g=u.responseObject)||void 0===g?void 0:g.message)||(null===(h=l)||void 0===h||null===(f=h.error)||void 0===f?void 0:f.responseText)||"Unknown error")})),i.addEventListener("click",(()=>{const e=E.$(ti.general.modal);if(!e)return;const t=new MouseEvent("mousedown",{bubbles:!0});e.dispatchEvent(t)}))}))})),E.insertMultistyle`
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
  `}()}};let ti;var oi={init:async function(){if(ni=Se.controller.getConfig().igSelectors,ii=await Me("add-dispatch-listener"),!ii)return;(function(){const e=Symbol("handled");E.onDocMutations((()=>{const t=E.$(ni.postCreation.captionContainer);t&&(t[e]||(t[e]=!0,t.insertAdjacentHTML("beforeend",`\n      <div class="post-caption-limits">\n        <svg class="post-caption-limits__icon" xmlns="http://www.w3.org/2000/svg" width="28.824" height="26.006" viewBox="0 0 28.824 26.006">\n          <path d="M10.948 1.999a4 4 0 016.926 0l10.407 18.007a4 4 0 01-3.463 6H4.006a4 4 0 01-3.463-6z" fill="currentColor"/>\n          <path class="exclamation" d="M13.622 17.079l-.748-9.537 2.972.019-.753 9.518zm-.613 1.428h2.7v2.663h-2.7z" fill="#fff"/>\n        </svg>\n        <div class="post-caption-limits__text">${ri}</div>\n      </div>\n    `)))}))})(),E.insertMultistyle`
    <style>
      .post-caption-limits--show ${ni.postCreation.captionContainer} {
        padding-bottom: 32px;
      }

      .post-caption-limits--show ${ni.postCreation.submitPostButton} {
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
  `,ii((e=>{if("CREATION_CAPTION_CHANGED"!==e.type)return;const t=e.caption,o=(t.match(/@[\p{L}\d_]+/gu)||[]).length,n=(t.match(/#[\p{L}\d_]+/gu)||[]).length;ri=t.length>ai?`Caption length exceeded: ${t.length} / ${ai}`:o>si?`Mention limit exceeded: ${o} / ${si}`:n>li?`Hashtag limit exceeded: ${n} / ${li}`:"",E.docElem.classList.toggle("post-caption-limits--show",!!ri);const i=E.$(".post-caption-limits__text");i&&(i.innerText=ri)}))}};let ni,ii,ri="";const ai=2200,si=30,li=30;var ci={init:async function(){if(di=Se.controller.getConfig().igSelectors,pi=await Me("http"),ui=await Me("store"),gi=await Me("add-dispatch-listener"),!pi||!ui||!gi)return;!function(){let e=0;const t=pi.post;pi.post=async(...i)=>{const r=i[0],a=r.includes("/create/configure")&&!r.includes("story")||r.includes("/igtv/configure_to_igtv"),s=r.includes("/media/configure_to_clips");if(!(a||s))return t.call(pi,...i);const l=()=>{ui.dispatch({type:"UPDATE_UPLOAD_TEXT",text:"Publishing Post..."}),setTimeout((()=>o()))};let c;l();try{c=await t.call(pi,...i)}catch(e){c={status:"fail"}}return"fail"===c.status?e<20?(e+=1,requestAnimationFrame((()=>{l()})),setTimeout((()=>{pi.post(...i)}),5*E.time.SECOND),c):(e=0,requestAnimationFrame((()=>{ui.dispatch({type:"UPDATE_UPLOAD_TEXT",text:c.message?`Error: ${c.message}`:"Unknown error."}),n();const e=E.$(di.general.uploadPanel);if(!e)return;e.insertAdjacentHTML("beforeend",'\n        <button class="retry-upload-button clickable">\n          Retry\n        </button>\n      ');const t=E.$(".retry-upload-button");t.addEventListener("click",(()=>{l(),pi.post(...i),t.remove()}))})),c):(e=0,requestAnimationFrame((()=>{ui.dispatch({type:"UPDATE_UPLOAD_TEXT",text:"Done"}),n()})),c)};const o=()=>{if(E.$(".PublishingDisclaimer"))return;const e=E.$(di.general.publishingBarText);e&&e.insertAdjacentHTML("beforeend",'\n      <div class="PublishingDisclaimer">\n        This might take a minute.\n        Please keep this tab open.\n      </div>\n    ')},n=()=>{const e=E.$(".PublishingDisclaimer");e&&e.remove()};E.insertMultistyle`
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
  `}()}};let di,pi,ui,gi;const hi={init:async function(){this.sel=Se.controller.getConfig().igSelectors,this.store=await Me("store"),this.store&&(we.on("ig.creation-get-caption",this.getCaption.bind(this)),we.on("ig.creation-set-caption",this.setCaption.bind(this)),this.watchCreationSession(),this.notifyVideoChange())},getCaption:function(){var e,t;return(null===(e=this.store.getState().creation)||void 0===e||null===(t=e.finalizedMedia)||void 0===t?void 0:t.caption)||""},setCaption:function(e){this.store.dispatch({type:"CREATION_CAPTION_CHANGED",caption:e});const t=E.$(this.sel.postCreation.captionTextarea);t&&(t.scrollTop=t.scrollHeight)},watchCreationSession:function(){let e=!1,t=!1,o=!1;this.store.subscribe((()=>{var n;const i=this.store.getState(),r=null===(n=i.navigation)||void 0===n?void 0:n.pageIdentifier;if(!r)return;const a=r.startsWith("Creation"),s=r.startsWith("StoryCreation"),l=a||s;if(l!==o)if(o=l,l){var c,d;const o=null===(c=i.creation.sourceVideo)||void 0===c?void 0:c.file,n=null===(d=i.storyCreation.sourceVideo)||void 0===d?void 0:d.file;e=s,t=!(!o&&!n),we.send("ig.creation-session-start",{isStory:e,isVideo:t})}else we.send("ig.creation-session-end",{isStory:e,isVideo:t})}))},notifyVideoChange:async function(){let e=null;this.store.subscribe((()=>{var t,o;const n=this.store.getState(),i=null===(t=n.creation)||void 0===t?void 0:t.sourceVideo,r=null===(o=n.storyCreation)||void 0===o?void 0:o.sourceVideo,a=null==i?void 0:i.dataURL,s=null==r?void 0:r.dataURL,l=a||s||null;l!==e&&(e=l,we.send("ig.creation-video-change",{url:l}))}))}},fi={init:function(){this._supportExtensionLinks()},_supportExtensionLinks:function(){E.onDocClick((e=>{const t=e.target.closest('[href^="chrome-extension://"]');t&&(e.preventDefault(),e.stopPropagation(),we.send("ig.open-link",t.getAttribute("href")))}))}};var mi={init:function(){this._injectVideoSupportCode()},_injectVideoSupportCode:function(){window.inssist.creationSelectVideo=e=>async t=>{try{const o=window.require,{browserHistory:n}=o("browserHistory");let i,r;{let e;try{e=o("polarisReadVideoFile")}catch{e=o("PolarisreadVideoFile")}i=e.readVideoFile}{let e;try{e=o("polarisGetVideoCoverPhoto")}catch{e=o("PolarisgetVideoCoverPhoto")}r=e.getVideoCoverPhoto}const a=String(Date.now()),s=`feed_${a}`,l=await i(e),c=await r(l,!0);t({type:"CREATION_VIDEO_PROCESSED",dataURL:l.src,entityName:s,file:e,uploadId:a,uploadMediaHeight:l.videoHeight,uploadMediaWidth:l.videoWidth,uploadMediaDurationMs:Math.floor(1e3*l.duration),videoTransform:c.videoTransform,mediaPublishMode:"default"}),t({type:"CREATION_VIDEO_COVER_PHOTO_UPDATED",dataURL:c.dataURL,entityName:s,file:c.file,uploadId:a,uploadMediaHeight:c.uploadMediaHeight,uploadMediaWidth:c.uploadMediaWidth}),n.push("/create/style/")}catch(e){console.error("failed to select video",e)}}}};var yi={controller:{init:async function(){window.ig=zo,Lo.controller.init(),E.iframe.isIframe()&&async function(){if(!E.ls.get("inssist.isDevelopment"))return;window.$=E.$,window.$$=E.$$,window.sel=Se.controller.getConfig().igSelectors,window.store=await zo.require("store"),Object.defineProperty(window,"state",{get:function(){const e=window.store.getState();return JSON.parse(JSON.stringify(e))}});const e=await zo.require("add-dispatch-listener");let t=!1;window.showActions=()=>{t=!0},window.hideActions=()=>{t=!1},e((e=>{t&&console.warn(e)}))}();if(!E.iframe.isIframe())return Jt.controller.init(),Ao.controller.init(),Co.controller.init(),void $.controller.init();const e=E.iframe.isIframe("inssist-ig"),t=E.iframe.isIframe("inssist-dm");(e||t)&&(lo.init(),Ne.controller.init(),fi.init(),function(){const e=Se.controller.getConfig().igSelectors,t=Symbol("handled");E.onDocMutations((()=>{const o=E.$(e.general.splashScreen);o&&(o[t]||(o[t]=!0,o.insertAdjacentHTML("afterbegin",`\n      <div class="navigation-spinner">\n        ${It()}\n      </div>\n    `)))})),E.insertMultistyle`
    <style>
      ${e.general.splashScreen} > *:not(.navigation-spinner) {
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
  `}());if(e)return Me.lock("http"),Me.lock("http:story-assist"),oo.controller.init(),ro.controller.init(),lt.controller.init(),Ke.controller.init(),Ho.controller.init(),rt.controller.init(),sn.init(),mi.init(),pn.init(),gn.init(),fn.init(),yn.init(),$n.init(),In.init(),Ln.init(),Fn.init(),zn.init(),Gn.init(),at.controller.init(),it.controller.init(),ho.controller.init(),Ve.controller.init(),vo.init(),No.controller.init(),Qn.init(),ei.init(),oi.init(),ci.init(),Le.controller.init(),Fo.controller.init(),hi.init(),dn.init(),await E.waitForDocumentReady(),void we.send("ig.ready");t&&(await E.waitForDocumentReady(),Yt.controller.init())}}};({init:function(){yi.controller.init()}}).init()}();