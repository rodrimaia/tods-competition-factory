!function(){"use strict";var e,t,f,a,n,c={},r={};function d(e){var t=r[e];if(void 0!==t)return t.exports;var f=r[e]={id:e,loaded:!1,exports:{}};return c[e].call(f.exports,f,f.exports,d),f.loaded=!0,f.exports}d.m=c,d.c=r,e=[],d.O=function(t,f,a,n){if(!f){var c=1/0;for(b=0;b<e.length;b++){f=e[b][0],a=e[b][1],n=e[b][2];for(var r=!0,o=0;o<f.length;o++)(!1&n||c>=n)&&Object.keys(d.O).every((function(e){return d.O[e](f[o])}))?f.splice(o--,1):(r=!1,n<c&&(c=n));r&&(e.splice(b--,1),t=a())}return t}n=n||0;for(var b=e.length;b>0&&e[b-1][2]>n;b--)e[b]=e[b-1];e[b]=[f,a,n]},d.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return d.d(t,{a:t}),t},f=Object.getPrototypeOf?function(e){return Object.getPrototypeOf(e)}:function(e){return e.__proto__},d.t=function(e,a){if(1&a&&(e=this(e)),8&a)return e;if("object"==typeof e&&e){if(4&a&&e.__esModule)return e;if(16&a&&"function"==typeof e.then)return e}var n=Object.create(null);d.r(n);var c={};t=t||[null,f({}),f([]),f(f)];for(var r=2&a&&e;"object"==typeof r&&!~t.indexOf(r);r=f(r))Object.getOwnPropertyNames(r).forEach((function(t){c[t]=function(){return e[t]}}));return c.default=function(){return e},d.d(n,c),n},d.d=function(e,t){for(var f in t)d.o(t,f)&&!d.o(e,f)&&Object.defineProperty(e,f,{enumerable:!0,get:t[f]})},d.f={},d.e=function(e){return Promise.all(Object.keys(d.f).reduce((function(t,f){return d.f[f](e,t),t}),[]))},d.u=function(e){return"assets/js/"+({53:"935f2afb",196:"0a4d4ba7",214:"cd1b5db3",672:"7d2f9deb",797:"02f804b9",830:"c78bc233",937:"972d9d57",1691:"d15fb99b",1848:"17027a54",1963:"721ed59a",2122:"1b70c1ec",2228:"b0126e05",2259:"98521a2b",2267:"6dadbf7d",2618:"ab3dfc68",3217:"3b8c55ea",3324:"5891f1aa",3657:"351d6cab",3665:"b90cbd49",3706:"4a6d803a",3769:"a0fd3511",4161:"13afe381",4195:"c4f5d8e4",4406:"50f34ebc",4950:"6dee62f0",4999:"ea2b9d13",5548:"3de5f15b",5964:"f12c3396",6670:"46ca6fce",7066:"b695fbda",7434:"aa8c6d56",7594:"dcd78cd8",7804:"6d766e86",7891:"7549c14b",7918:"17896441",8147:"c8da8485",8199:"5bf4bf80",8265:"9af8b7ac",8407:"a6f619b5",8632:"3f67c4f8",8812:"4fac715f",9026:"9989accd",9236:"af023e7c",9514:"1be78505",9561:"5f8ea9d1",9826:"8f75bd2d"}[e]||e)+"."+{53:"8bc49d42",126:"f75d5ea5",196:"aa21904e",214:"e6570eaf",672:"b6ee5162",797:"c1509f6a",830:"30f1cb35",937:"147ef22e",1691:"dd39c8fd",1848:"2e5a4620",1963:"7dcda5c3",2122:"aded00e8",2228:"50c1b349",2259:"8bc92e3e",2267:"48051664",2618:"728433f5",3217:"99e9f8c7",3324:"08219690",3657:"2a2419ef",3665:"39fbd324",3706:"240ee27c",3769:"d423f3e7",4161:"8b63d35e",4195:"a5155711",4314:"d437b1f8",4406:"e6922798",4608:"4159b8b8",4950:"59e29ca4",4999:"705a1f39",5486:"e0499b2a",5548:"93950b42",5964:"32d14aad",6130:"e1d1f2fe",6670:"3d1d1a71",7066:"fded3a28",7305:"2a677570",7434:"f13b94c4",7465:"bf6673aa",7594:"fd0d1528",7804:"e264c64c",7891:"e6259f10",7918:"6fbe74ec",8147:"48970304",8199:"0867b921",8265:"8008cc69",8407:"1245e8cd",8632:"180d4b18",8812:"447fece7",8879:"74f62d11",9026:"a42c3e53",9236:"122ead94",9514:"e8f31400",9561:"92aef68c",9826:"1e697cfc"}[e]+".js"},d.miniCssF=function(e){return"assets/css/styles.0143aefa.css"},d.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),d.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a={},n="documentation:",d.l=function(e,t,f,c){if(a[e])a[e].push(t);else{var r,o;if(void 0!==f)for(var b=document.getElementsByTagName("script"),u=0;u<b.length;u++){var i=b[u];if(i.getAttribute("src")==e||i.getAttribute("data-webpack")==n+f){r=i;break}}r||(o=!0,(r=document.createElement("script")).charset="utf-8",r.timeout=120,d.nc&&r.setAttribute("nonce",d.nc),r.setAttribute("data-webpack",n+f),r.src=e),a[e]=[t];var l=function(t,f){r.onerror=r.onload=null,clearTimeout(s);var n=a[e];if(delete a[e],r.parentNode&&r.parentNode.removeChild(r),n&&n.forEach((function(e){return e(f)})),t)return t(f)},s=setTimeout(l.bind(null,void 0,{type:"timeout",target:r}),12e4);r.onerror=l.bind(null,r.onerror),r.onload=l.bind(null,r.onload),o&&document.head.appendChild(r)}},d.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},d.p="/tods-competition-factory/",d.gca=function(e){return e={17896441:"7918","935f2afb":"53","0a4d4ba7":"196",cd1b5db3:"214","7d2f9deb":"672","02f804b9":"797",c78bc233:"830","972d9d57":"937",d15fb99b:"1691","17027a54":"1848","721ed59a":"1963","1b70c1ec":"2122",b0126e05:"2228","98521a2b":"2259","6dadbf7d":"2267",ab3dfc68:"2618","3b8c55ea":"3217","5891f1aa":"3324","351d6cab":"3657",b90cbd49:"3665","4a6d803a":"3706",a0fd3511:"3769","13afe381":"4161",c4f5d8e4:"4195","50f34ebc":"4406","6dee62f0":"4950",ea2b9d13:"4999","3de5f15b":"5548",f12c3396:"5964","46ca6fce":"6670",b695fbda:"7066",aa8c6d56:"7434",dcd78cd8:"7594","6d766e86":"7804","7549c14b":"7891",c8da8485:"8147","5bf4bf80":"8199","9af8b7ac":"8265",a6f619b5:"8407","3f67c4f8":"8632","4fac715f":"8812","9989accd":"9026",af023e7c:"9236","1be78505":"9514","5f8ea9d1":"9561","8f75bd2d":"9826"}[e]||e,d.p+d.u(e)},function(){var e={1303:0,532:0};d.f.j=function(t,f){var a=d.o(e,t)?e[t]:void 0;if(0!==a)if(a)f.push(a[2]);else if(/^(1303|532)$/.test(t))e[t]=0;else{var n=new Promise((function(f,n){a=e[t]=[f,n]}));f.push(a[2]=n);var c=d.p+d.u(t),r=new Error;d.l(c,(function(f){if(d.o(e,t)&&(0!==(a=e[t])&&(e[t]=void 0),a)){var n=f&&("load"===f.type?"missing":f.type),c=f&&f.target&&f.target.src;r.message="Loading chunk "+t+" failed.\n("+n+": "+c+")",r.name="ChunkLoadError",r.type=n,r.request=c,a[1](r)}}),"chunk-"+t,t)}},d.O.j=function(t){return 0===e[t]};var t=function(t,f){var a,n,c=f[0],r=f[1],o=f[2],b=0;for(a in r)d.o(r,a)&&(d.m[a]=r[a]);if(o)var u=o(d);for(t&&t(f);b<c.length;b++)n=c[b],d.o(e,n)&&e[n]&&e[n][0](),e[c[b]]=0;return d.O(u)},f=self.webpackChunkdocumentation=self.webpackChunkdocumentation||[];f.forEach(t.bind(null,0)),f.push=t.bind(null,f.push.bind(f))}()}();