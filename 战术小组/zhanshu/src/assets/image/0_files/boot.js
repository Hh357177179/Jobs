!function(){function e(e,t,n){var o=x[e];if(1===o)return void t(1);o||(o=x[e]=document.createElement("script"),document.getElementsByTagName("head")[0].appendChild(o)),o.src=e,o.onload=function(){x[e]=1,t(1)},o.onerror=function(t){x[e]=o,n(t)}}function t(e,t,n){var o=y[e];if(1===o)return void t(1);o||(o=y[e]=document.createElement("link"),o.rel="stylesheet",o.type="text/css",document.getElementsByTagName("head")[0].appendChild(o)),o.href=e,o.onload=function(){y[e]=1,t(1)},o.onerror=function(t){y[e]=o,n(t)}}function n(o,r,s,i){function c(){n(o,r,s,i+1)}var a;i=i||0,o[i]?(a=o[i],-1!==a.indexOf(".css")?t(a,c,s):-1!==a.indexOf(".js")?e(a,c,s):(console.error("Unsupported resource type.",a),c())):"function"==typeof r&&r()}function o(){return"serviceWorker"in navigator&&"https:"===location.protocol}function r(){return"im2beta.kf5.com"===location.host}function s(){return!(!o()||localStorage.getItem("noWorker"))&&(!r()||Boolean(localStorage.getItem("serviceWorker")))}function i(e){throw e}function c(){return navigator.serviceWorker.register(m,{scope:k}).then(function(e){return console.log("ServiceWorker registration succeeded, Scope is "+e.scope),e})}function a(){n(S,null,i)}function u(e){l=e,l.postMessage("sw:"+JSON.stringify({version:d.version})),l.postMessage("sw:"+JSON.stringify(w)),a()}function v(e){"activated"===e.active.state?u(e.active):e.active.onstatechange=function(t){"activated"===t.target.state&&u(e.active)}}function g(){navigator.serviceWorker.getRegistrations&&navigator.serviceWorker.getRegistrations().then(function(e){for(var t,n,o=0;o<e.length;++o)t=e[o],n=String(t.active&&t.active.scriptURL),-1!==["/agent","/kchat"].indexOf(t.scope.slice(-6))&&n.slice(-m.length)===m||e[o].unregister()})}function f(){navigator.serviceWorker.getRegistration(k).then(function(e){e&&e.unregister().then(function(){console.log("ServiceWorker unregister")})})}function p(){s()?(g(),navigator.serviceWorker.ready.then(v),l||c().then(null,function(e){console.error("ServiceWorker register fail",e),a()})):(o()&&!s()&&f(),a())}var l,d={version:window.VERSION,assetsHost:window.HOSTS.assets},h=d.assetsHost,k="/kchat",m="/agent/agent-cache-service-worker.js/",S=["https://"+h+"/supportbox_v2/css/style.css?v="+d.version,"https://"+h+"/supportbox_v2/js/index.js?v="+d.version],w={doNotCache:["boot\\.js"],resources:["^https?:[^?]+\\.js","^https?:[^?]+\\.css","^https?:[^?]+/supportbox_v2/fonts/","^https?:[^?]+/supportbox_v2/img/"]},W=function(){var e=navigator.userAgent.match(/MSIE (\d+)/);return e&&parseFloat(e[1])}();W&&W<=8&&S.splice(1,0,"https://"+h+"/supportbox_v2/css/ie.css?v="+d.version);var x={},y={};window.addEventListener?window.addEventListener("DOMContentLoaded",p,!1):a()}();