(window.webpackJsonp=window.webpackJsonp||[]).push([[29],{118:function(e,t,n){"use strict";n.d(t,"a",(function(){return O})),n.d(t,"b",(function(){return f}));var r=n(0),o=n.n(r);function c(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){c(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},c=Object.keys(e);for(r=0;r<c.length;r++)n=c[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(r=0;r<c.length;r++)n=c[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var p=o.a.createContext({}),u=function(e){var t=o.a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},O=function(e){var t=u(e.components);return o.a.createElement(p.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},d=o.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,c=e.originalType,i=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),O=u(n),d=r,f=O["".concat(i,".").concat(d)]||O[d]||s[d]||c;return n?o.a.createElement(f,a(a({ref:t},p),{},{components:n})):o.a.createElement(f,a({ref:t},p))}));function f(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var c=n.length,i=new Array(c);i[0]=d;var a={};for(var l in t)hasOwnProperty.call(t,l)&&(a[l]=t[l]);a.originalType=e,a.mdxType="string"==typeof e?e:r,i[1]=a;for(var p=2;p<c;p++)i[p]=n[p];return o.a.createElement.apply(null,i)}return o.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},99:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return i})),n.d(t,"metadata",(function(){return a})),n.d(t,"toc",(function(){return l})),n.d(t,"default",(function(){return u}));var r=n(3),o=n(7),c=(n(0),n(118)),i={title:"Feed Policy"},a={unversionedId:"policies/feedPolicy",id:"policies/feedPolicy",isDocsHomePage:!1,title:"Feed Policy",description:"`js",source:"@site/docs/policies/feedPolicy.md",slug:"/policies/feedPolicy",permalink:"/tods-competition-factory/docs/policies/feedPolicy",version:"current",sidebar:"docs",previous:{title:"Round Robin Tally Policy",permalink:"/tods-competition-factory/docs/policies/tallyPolicy"},next:{title:"Time Items",permalink:"/tods-competition-factory/docs/concepts/timeItems"}},l=[],p={toc:l};function u(e){var t=e.components,n=Object(o.a)(e,["components"]);return Object(c.b)("wrapper",Object(r.a)({},p,n,{components:t,mdxType:"MDXLayout"}),Object(c.b)("pre",null,Object(c.b)("code",{parentName:"pre",className:"language-js"},"const feedPolicy = {\n  roundGroupedOrder: [\n    [1], // complete round TOP_DOWN\n    [1], // complete round BOTTOM_UP\n    [1, 2], // 1st half BOTTOM_UP, 2nd half BOTTOM_UP\n    [2, 1, 4, 3], // 2nd Qtr BOTTOM_UP, 1st Qtr BOTTOM_UP, 4th Qtr BOTTOM_UP, 3rd Qtr BOTTOM_UP\n    [2, 1, 4, 3, 6, 5, 8, 7], // 1st Qtr BOTTOM_UP, 2nd Qtr BOTTOM_UP, 3rd Qtr BOTTOM_UP, 4th Qtr BOTTOM_UP\n    [1], // complete round BOTTOM_UP\n  ],\n  roundFeedProfiles: [\n    TOP_DOWN,\n    BOTTOM_UP,\n    BOTTOM_UP,\n    BOTTOM_UP,\n    BOTTOM_UP,\n    BOTTOM_UP,\n    BOTTOM_UP,\n    BOTTOM_UP,\n  ],\n};\n")))}u.isMDXComponent=!0}}]);