(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{101:function(e,t,r){"use strict";r.d(t,"a",(function(){return u})),r.d(t,"b",(function(){return h}));var n=r(0),a=r.n(n);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function c(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function p(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?c(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):c(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var s=a.a.createContext({}),m=function(e){var t=a.a.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):p(p({},t),e)),r},u=function(e){var t=m(e.components);return a.a.createElement(s.Provider,{value:t},e.children)},l={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},b=a.a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,o=e.originalType,c=e.parentName,s=i(e,["components","mdxType","originalType","parentName"]),u=m(r),b=n,h=u["".concat(c,".").concat(b)]||u[b]||l[b]||o;return r?a.a.createElement(h,p(p({ref:t},s),{},{components:r})):a.a.createElement(h,p({ref:t},s))}));function h(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=r.length,c=new Array(o);c[0]=b;var p={};for(var i in t)hasOwnProperty.call(t,i)&&(p[i]=t[i]);p.originalType=e,p.mdxType="string"==typeof e?e:n,c[1]=p;for(var s=2;s<o;s++)c[s]=r[s];return a.a.createElement.apply(null,c)}return a.a.createElement.apply(null,r)}b.displayName="MDXCreateElement"},66:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return c})),r.d(t,"metadata",(function(){return p})),r.d(t,"toc",(function(){return i})),r.d(t,"default",(function(){return m}));var n=r(3),a=r(7),o=(r(0),r(101)),c={title:"MatchUp Formats"},p={unversionedId:"concepts/matchUpFormat",id:"concepts/matchUpFormat",isDocsHomePage:!1,title:"MatchUp Formats",description:"In TODS, a drawDefinition is a collection of structures. For example a MAIN structure and a CONSOLATION structure are considered to be part of the same drawDefinition because they have a logical relationship whereby participants move from one structure to another. USTA's TDM, its predecessor TMS, and CourtHive TMX Classic do not represent the relationship between structures as hierarchical, whereas in TODS there is a nesting of elements:",source:"@site/docs/concepts/matchUpFormat.md",slug:"/concepts/matchUpFormat",permalink:"/tods-competition-factory/docs/concepts/matchUpFormat",version:"current",sidebar:"docs",previous:{title:"Scale Items",permalink:"/tods-competition-factory/docs/concepts/scaleItems"},next:{title:"Context",permalink:"/tods-competition-factory/docs/concepts/context"}},i=[{value:"GitHub repository",id:"github-repository",children:[]}],s={toc:i};function m(e){var t=e.components,r=Object(a.a)(e,["components"]);return Object(o.b)("wrapper",Object(n.a)({},s,r,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,"In TODS, a ",Object(o.b)("strong",{parentName:"p"},"drawDefinition")," is a collection of ",Object(o.b)("strong",{parentName:"p"},"structures"),". For example a MAIN ",Object(o.b)("strong",{parentName:"p"},"structure")," and a CONSOLATION ",Object(o.b)("strong",{parentName:"p"},"structure")," are considered to be part of the same ",Object(o.b)("strong",{parentName:"p"},"drawDefinition")," because they have a logical relationship whereby participants move from one ",Object(o.b)("strong",{parentName:"p"},"structure")," to another. USTA's TDM, its predecessor TMS, and CourtHive TMX Classic do not represent the relationship between structures as hierarchical, whereas in TODS there is a nesting of elements:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-js"}," tournament.events[].drawDefinitions[].structures[].matchUps[]\n")),Object(o.b)("p",null,"An application using the Competition Factory can request the ",Object(o.b)("strong",{parentName:"p"},"matchUpFormat")," for a given ",Object(o.b)("strong",{parentName:"p"},"matchUp")," and the ",Object(o.b)("strong",{parentName:"p"},"tournamentEngine")," will traverse the hierarchy from bottom up looking to see at what level a ",Object(o.b)("strong",{parentName:"p"},"matchUpFormat")," has been set. This method will also return any ",Object(o.b)("strong",{parentName:"p"},"matchUpFormat")," codes encountered in the hierarchy within which a matchUp is found:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-js"},"const { matchUpFormat } = tournamentEngine.getMatchUpFormat({\n  drawId,\n  matchUpId,\n});\n")),Object(o.b)("p",null,"To set the ",Object(o.b)("strong",{parentName:"p"},"matchUpFormat")," at each level:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-js"},"tournamentEngine.setEventDefaultMatchUpFormat({ eventId, matchUpFormat });\ntournamentEngine.setDrawDefaultMatchUpFormat({ drawId, matchUpFormat });\ntournamentEngine.setStructureDefaultMatchUpFormat({\n  drawId,\n  structureId,\n  matchUpFormat,\n});\n")),Object(o.b)("p",null,"The ",Object(o.b)("strong",{parentName:"p"},"matchUpFormat")," for a ",Object(o.b)("strong",{parentName:"p"},"matchUp")," is set at the time of score entry:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-js"},"tournamentEngine.setMatchUpStatus({\n  drawId,\n  matchUpId,\n  matchUpFormat,\n  outcome,\n});\n")),Object(o.b)("h2",{id:"github-repository"},"GitHub repository"),Object(o.b)("p",null,"There is a ",Object(o.b)("a",{parentName:"p",href:"https://github.com/CourtHive/tods-matchup-format-code"},"Repository")," and ",Object(o.b)("a",{parentName:"p",href:"https://www.npmjs.com/package/tods-matchup-format-code"},"NPM Package")," specifically for generating and parsing ITF TODS MatchUp Format Codes. The documentation includes examples with an interactive application."))}m.isMDXComponent=!0}}]);