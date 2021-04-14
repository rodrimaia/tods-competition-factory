(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{100:function(t,e,n){"use strict";n.d(e,"a",(function(){return l})),n.d(e,"b",(function(){return b}));var r=n(0),a=n.n(r);function o(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function c(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function i(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?c(Object(n),!0).forEach((function(e){o(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function p(t,e){if(null==t)return{};var n,r,a=function(t,e){if(null==t)return{};var n,r,a={},o=Object.keys(t);for(r=0;r<o.length;r++)n=o[r],e.indexOf(n)>=0||(a[n]=t[n]);return a}(t,e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);for(r=0;r<o.length;r++)n=o[r],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(a[n]=t[n])}return a}var s=a.a.createContext({}),u=function(t){var e=a.a.useContext(s),n=e;return t&&(n="function"==typeof t?t(e):i(i({},e),t)),n},l=function(t){var e=u(t.components);return a.a.createElement(s.Provider,{value:e},t.children)},m={inlineCode:"code",wrapper:function(t){var e=t.children;return a.a.createElement(a.a.Fragment,{},e)}},d=a.a.forwardRef((function(t,e){var n=t.components,r=t.mdxType,o=t.originalType,c=t.parentName,s=p(t,["components","mdxType","originalType","parentName"]),l=u(n),d=r,b=l["".concat(c,".").concat(d)]||l[d]||m[d]||o;return n?a.a.createElement(b,i(i({ref:e},s),{},{components:n})):a.a.createElement(b,i({ref:e},s))}));function b(t,e){var n=arguments,r=e&&e.mdxType;if("string"==typeof t||r){var o=n.length,c=new Array(o);c[0]=d;var i={};for(var p in e)hasOwnProperty.call(e,p)&&(i[p]=e[p]);i.originalType=t,i.mdxType="string"==typeof t?t:r,c[1]=i;for(var s=2;s<o;s++)c[s]=n[s];return a.a.createElement.apply(null,c)}return a.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},91:function(t,e,n){"use strict";n.r(e),n.d(e,"frontMatter",(function(){return c})),n.d(e,"metadata",(function(){return i})),n.d(e,"toc",(function(){return p})),n.d(e,"default",(function(){return u}));var r=n(3),a=n(7),o=(n(0),n(100)),c={title:"Context"},i={unversionedId:"concepts/context",id:"concepts/context",isDocsHomePage:!1,title:"Context",description:"When matchUps and tournamentParticipants are returned inContext it means that they include contextual information that is not part of the TODS document structure from which they originated.",source:"@site/docs/concepts/context.md",slug:"/concepts/context",permalink:"/tods-competition-factory/docs/concepts/context",version:"current",sidebar:"docs",previous:{title:"MatchUp Formats",permalink:"/tods-competition-factory/docs/concepts/matchUpFormat"},next:{title:"Subscriptions",permalink:"/tods-competition-factory/docs/concepts/subscriptions"}},p=[{value:"matchUps",id:"matchups",children:[]},{value:"tournamentParticipants",id:"tournamentparticipants",children:[]},{value:"Converted Extensions",id:"converted-extensions",children:[]}],s={toc:p};function u(t){var e=t.components,n=Object(a.a)(t,["components"]);return Object(o.b)("wrapper",Object(r.a)({},s,n,{components:e,mdxType:"MDXLayout"}),Object(o.b)("p",null,"When ",Object(o.b)("strong",{parentName:"p"},"matchUps")," and ",Object(o.b)("strong",{parentName:"p"},"tournamentParticipants")," are returned ",Object(o.b)("strong",{parentName:"p"},"inContext")," it means that they include contextual information that is not part of the TODS document structure from which they originated."),Object(o.b)("h2",{id:"matchups"},"matchUps"),Object(o.b)("p",null,"All API calls which return ",Object(o.b)("strong",{parentName:"p"},"matchUps")," return deep copies with context. Attributes that are added for ",Object(o.b)("strong",{parentName:"p"},"matchUps")," include: structureId, structureName, drawId, eventId, eventName, tournamentId and tournamentName."),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-js"},"const { matchUps } = tournamentEngine.allTournamentMatchUps();\n")),Object(o.b)("h2",{id:"tournamentparticipants"},"tournamentParticipants"),Object(o.b)("p",null,"For ",Object(o.b)("strong",{parentName:"p"},"tournamentParticipants"),", individualParticipants are added from individualParticipantIds."),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-js"},"const { tournamentParticipants } = tournamentEngine.getTournamentParticipants({\n  participantFilters: {\n    inContext: true,\n    participantTypes: [PAIR],\n  },\n});\n")),Object(o.b)("h2",{id:"converted-extensions"},"Converted Extensions"),Object(o.b)("p",null,"All elements that are returned ",Object(o.b)("strong",{parentName:"p"},"inContext")," include converted extensions. See ",Object(o.b)("strong",{parentName:"p"},"makeDeepCopy")," in ",Object(o.b)("a",{parentName:"p",href:"../engines/makedeepcopy"},"Utilities"),"."))}u.isMDXComponent=!0}}]);