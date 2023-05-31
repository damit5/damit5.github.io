/*!
 * gitbook-plugin-flexible-alerts
 * v1.0.4
 * https://github.com/zanfab/gitbook-plugin-flexible-alerts#readme
 * (c) 2022 Fabian Zankl
 * MIT license
 */
"use strict";function t(n){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t(n)}function n(t,n,e,o){var i=(t||"").match(new RegExp("".concat(n,":(([^\\r\\n|]*))")));return i?o?o(i[1]):i[1]:o?o(e):e}require(["gitbook","jQuery"],(function(e,o){e.events.bind("page.change",(function(){var i=e.state.config.pluginsConfig["flexible-alerts"];o("blockquote").each((function(){var c=o(this).html(),r=c.replace(/\[!(\w*)((?:\|\w*:.*)*?)\]([\s\S]*)/g,(function(o,c,r,a){var l=i[c.toLowerCase()];if(!l)return o;var s=n(r,"style",i.style),u=n(r,"iconVisibility","visible",(function(t){return"hidden"!==t})),f=n(r,"labelVisibility","visible",(function(t){return"hidden"!==t})),b=n(r,"label",l.label),y=n(r,"icon",l.icon),p=n(r,"className",l.className);if("object"===t(b)){var v=e.state.innerLanguage;v&&Object.prototype.hasOwnProperty.call(b,v)?b=b[v]:(f=!1,u=!1)}var m='<i class="'.concat(y,'"></i>');return'<div class="alert '.concat(s," ").concat(p,'">\n              <p class="title">\n                  ').concat(u?m:"","\n                  ").concat(f?b:"","\n              </p>\n              <p>").concat(a,"\n            </div>")}));r!==c&&o(this).replaceWith(r)}))}))}));
//# sourceMappingURL=plugin.js.map
