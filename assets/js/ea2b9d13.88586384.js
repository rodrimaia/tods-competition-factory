(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{100:function(e,n,t){"use strict";t.d(n,"a",(function(){return u})),t.d(n,"b",(function(){return y}));var r=t(0),a=t.n(r);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function c(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?c(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):c(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function p(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var s=a.a.createContext({}),l=function(e){var n=a.a.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},u=function(e){var n=l(e.components);return a.a.createElement(s.Provider,{value:n},e.children)},d={inlineCode:"code",wrapper:function(e){var n=e.children;return a.a.createElement(a.a.Fragment,{},n)}},b=a.a.forwardRef((function(e,n){var t=e.components,r=e.mdxType,o=e.originalType,c=e.parentName,s=p(e,["components","mdxType","originalType","parentName"]),u=l(t),b=r,y=u["".concat(c,".").concat(b)]||u[b]||d[b]||o;return t?a.a.createElement(y,i(i({ref:n},s),{},{components:t})):a.a.createElement(y,i({ref:n},s))}));function y(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var o=t.length,c=new Array(o);c[0]=b;var i={};for(var p in n)hasOwnProperty.call(n,p)&&(i[p]=n[p]);i.originalType=e,i.mdxType="string"==typeof e?e:r,c[1]=i;for(var s=2;s<o;s++)c[s]=t[s];return a.a.createElement.apply(null,c)}return a.a.createElement.apply(null,t)}b.displayName="MDXCreateElement"},96:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",(function(){return c})),t.d(n,"metadata",(function(){return i})),t.d(n,"toc",(function(){return p})),t.d(n,"default",(function(){return l}));var r=t(3),a=t(7),o=(t(0),t(100)),c={title:"Subscriptions"},i={unversionedId:"concepts/subscriptions",id:"concepts/subscriptions",isDocsHomePage:!1,title:"Subscriptions",description:"Subscriptions enable external methods to be called when certain events occur while the Competition Factory engines are mutating a tournament document.",source:"@site/docs/concepts/subscriptions.md",slug:"/concepts/subscriptions",permalink:"/tods-competition-factory/docs/concepts/subscriptions",version:"current",sidebar:"docs",previous:{title:"Context",permalink:"/tods-competition-factory/docs/concepts/context"},next:{title:"Generating Tournaments",permalink:"/tods-competition-factory/docs/engines/mocks-engine-examples"}},p=[],s={toc:p};function l(e){var n=e.components,t=Object(a.a)(e,["components"]);return Object(o.b)("wrapper",Object(r.a)({},s,t,{components:n,mdxType:"MDXLayout"}),Object(o.b)("p",null,"Subscriptions enable external methods to be called when certain events occur while the Competition Factory engines are mutating a tournament document."),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-js"},"const subscriptions = {\n  audit: (payload) => {}, // payload = [{ action: '', payload: {} }]\n\n  addMatchUps: (payload) => {}, // payload = { matchUps }\n  deletedMatchUpIds: (payload) => {}, // payload = { matchUpIds }\n  modifyMatchUp: (payload) => {}, // payload = { matchUp }\n\n  publishEvent: (payload) => (), // payload = { eventData }\n  unPublishEvent: (payload) => (), // payload = { eventId }\n\n  addVenue: (payload) => (), // payload { venue }\n  modifyVenue: (payload) => (), // payload { venue }\n  deleteVenue: (payload) => (), // payload { venueId }\n\n  addParticipants: (payload) => () // payload { participants }\n  modifyParticipants: (payload) => () // payload { participants }\n  deleteParticipants: (payload) => () // payload { participantIds }\n};\n")),Object(o.b)("p",null,"Subscriptions can be defined for the following engines."),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-js"},"drawEngine.setSubscriptions(subscriptions);\ntournamentEngine.setSubscriptions(subscriptions);\ncompetitionEngine.setSubscriptions(subscriptions);\n")))}l.isMDXComponent=!0}}]);