(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[770],{3905:function(t,e,n){"use strict";n.d(e,{Zo:function(){return s},kt:function(){return h}});var a=n(7294);function r(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function o(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,a)}return n}function c(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?o(Object(n),!0).forEach((function(e){r(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function p(t,e){if(null==t)return{};var n,a,r=function(t,e){if(null==t)return{};var n,a,r={},o=Object.keys(t);for(a=0;a<o.length;a++)n=o[a],e.indexOf(n)>=0||(r[n]=t[n]);return r}(t,e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);for(a=0;a<o.length;a++)n=o[a],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(r[n]=t[n])}return r}var i=a.createContext({}),m=function(t){var e=a.useContext(i),n=e;return t&&(n="function"==typeof t?t(e):c(c({},e),t)),n},s=function(t){var e=m(t.components);return a.createElement(i.Provider,{value:e},t.children)},u={inlineCode:"code",wrapper:function(t){var e=t.children;return a.createElement(a.Fragment,{},e)}},l=a.forwardRef((function(t,e){var n=t.components,r=t.mdxType,o=t.originalType,i=t.parentName,s=p(t,["components","mdxType","originalType","parentName"]),l=m(n),h=r,d=l["".concat(i,".").concat(h)]||l[h]||u[h]||o;return n?a.createElement(d,c(c({ref:e},s),{},{components:n})):a.createElement(d,c({ref:e},s))}));function h(t,e){var n=arguments,r=e&&e.mdxType;if("string"==typeof t||r){var o=n.length,c=new Array(o);c[0]=l;var p={};for(var i in e)hasOwnProperty.call(e,i)&&(p[i]=e[i]);p.originalType=t,p.mdxType="string"==typeof t?t:r,c[1]=p;for(var m=2;m<o;m++)c[m]=n[m];return a.createElement.apply(null,c)}return a.createElement.apply(null,n)}l.displayName="MDXCreateElement"},9965:function(t,e,n){"use strict";n.r(e),n.d(e,{frontMatter:function(){return p},metadata:function(){return i},toc:function(){return m},default:function(){return u}});var a=n(2122),r=n(9756),o=(n(7294),n(3905)),c=["components"],p={title:"matchUpFormat Codes"},i={unversionedId:"concepts/matchUpFormat",id:"concepts/matchUpFormat",isDocsHomePage:!1,title:"matchUpFormat Codes",description:"A matchUpFormat code describes the scoring method used for a specific matchUp, for all matchUps within a structure, for all matchUps within a drawDefinition, or for all matchUps within an event.",source:"@site/docs/concepts/matchUpFormat.md",sourceDirName:"concepts",slug:"/concepts/matchUpFormat",permalink:"/tods-competition-factory/docs/concepts/matchUpFormat",version:"current",frontMatter:{title:"matchUpFormat Codes"},sidebar:"docs",previous:{title:"Tennis Open Data Standards",permalink:"/tods-competition-factory/docs/concepts/dataStructures"},next:{title:"tieFormat",permalink:"/tods-competition-factory/docs/concepts/tieFormat"}},m=[{value:"matchUpFormat discovery",id:"matchupformat-discovery",children:[]}],s={toc:m};function u(t){var e=t.components,n=(0,r.Z)(t,c);return(0,o.kt)("wrapper",(0,a.Z)({},s,n,{components:e,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"A ",(0,o.kt)("strong",{parentName:"p"},"matchUpFormat")," code describes the scoring method used for a specific ",(0,o.kt)("strong",{parentName:"p"},"matchUp"),", for all matchUps within a ",(0,o.kt)("strong",{parentName:"p"},"structure"),", for all matchUps within a ",(0,o.kt)("strong",{parentName:"p"},"drawDefinition"),", or for all matchUps within an ",(0,o.kt)("strong",{parentName:"p"},"event"),"."),(0,o.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"Try the interactive ",(0,o.kt)("a",{parentName:"p",href:"https://courthive.github.io/tods-matchup-format-code/example"},"matchUpFormat code generator")),(0,o.kt)("p",{parentName:"div"},"Check out the ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/CourtHive/tods-matchup-format-code"},"Repository")," and ",(0,o.kt)("a",{parentName:"p",href:"https://www.npmjs.com/package/tods-matchup-format-code"},"NPM Package")," specifically for generating and parsing ITF TODS MatchUp Format Codes."))),(0,o.kt)("h2",{id:"matchupformat-discovery"},"matchUpFormat discovery"),(0,o.kt)("p",null,"In TODS, a ",(0,o.kt)("strong",{parentName:"p"},"drawDefinition")," is a collection of ",(0,o.kt)("strong",{parentName:"p"},"structures"),". For example, a MAIN ",(0,o.kt)("strong",{parentName:"p"},"structure")," and a CONSOLATION ",(0,o.kt)("strong",{parentName:"p"},"structure")," are considered to be part of the same ",(0,o.kt)("strong",{parentName:"p"},"drawDefinition")," because they have a logical relationship whereby participants move from one ",(0,o.kt)("strong",{parentName:"p"},"structure")," to another."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"}," tournament.events[].drawDefinitions[].structures[].matchUps[]\n")),(0,o.kt)("p",null,"An application using the Competition Factory can request the ",(0,o.kt)("strong",{parentName:"p"},"matchUpFormat")," for a given ",(0,o.kt)("strong",{parentName:"p"},"matchUp")," and the ",(0,o.kt)("strong",{parentName:"p"},"tournamentEngine")," will traverse the hierarchy from bottom up looking to see at what level a ",(0,o.kt)("strong",{parentName:"p"},"matchUpFormat")," has been defined. This method will also return any ",(0,o.kt)("strong",{parentName:"p"},"matchUpFormat")," codes encountered in the hierarchy within which a ",(0,o.kt)("strong",{parentName:"p"},"matchUp")," is found:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"const { matchUpFormat } = tournamentEngine.getMatchUpFormat({\n  drawId,\n  matchUpId,\n});\n")),(0,o.kt)("p",null,"To set the ",(0,o.kt)("strong",{parentName:"p"},"matchUpFormat")," at each level:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"tournamentEngine.setEventDefaultMatchUpFormat({ eventId, matchUpFormat });\ntournamentEngine.setDrawDefaultMatchUpFormat({ drawId, matchUpFormat });\ntournamentEngine.setStructureDefaultMatchUpFormat({\n  drawId,\n  structureId,\n  matchUpFormat,\n});\n")),(0,o.kt)("p",null,"The ",(0,o.kt)("strong",{parentName:"p"},"matchUpFormat")," for a ",(0,o.kt)("strong",{parentName:"p"},"matchUp")," is set at the time of score entry:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"tournamentEngine.setMatchUpStatus({\n  drawId,\n  matchUpId,\n  matchUpFormat,\n  outcome,\n});\n")))}u.isMDXComponent=!0}}]);