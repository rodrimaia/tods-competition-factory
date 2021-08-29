(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[706],{3905:function(e,t,n){"use strict";n.d(t,{Zo:function(){return p},kt:function(){return d}});var a=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,a,o=function(e,t){if(null==e)return{};var n,a,o={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=a.createContext({}),l=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=l(e.components);return a.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,o=e.mdxType,r=e.originalType,s=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),m=l(n),d=o,g=m["".concat(s,".").concat(d)]||m[d]||u[d]||r;return n?a.createElement(g,i(i({ref:t},p),{},{components:n})):a.createElement(g,i({ref:t},p))}));function d(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var r=n.length,i=new Array(r);i[0]=m;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c.mdxType="string"==typeof e?e:o,i[1]=c;for(var l=2;l<r;l++)i[l]=n[l];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},5991:function(e,t,n){"use strict";n.r(t),n.d(t,{frontMatter:function(){return c},metadata:function(){return s},toc:function(){return l},default:function(){return u}});var a=n(2122),o=n(9756),r=(n(7294),n(3905)),i=["components"],c={title:"Global State"},s={unversionedId:"concepts/globalState",id:"concepts/globalState",isDocsHomePage:!1,title:"Global State",description:"Engines share state",source:"@site/docs/concepts/globalState.mdx",sourceDirName:"concepts",slug:"/concepts/globalState",permalink:"/tods-competition-factory/docs/concepts/globalState",version:"current",frontMatter:{title:"Global State"},sidebar:"docs",previous:{title:"Draw Generation",permalink:"/tods-competition-factory/docs/concepts/drawGeneration"},next:{title:"Introduction to Policies",permalink:"/tods-competition-factory/docs/concepts/policies"}},l=[{value:"Engines share state",id:"engines-share-state",children:[]},{value:"Synchronous and Asynchronous",id:"synchronous-and-asynchronous",children:[]}],p={toc:l};function u(e){var t=e.components,n=(0,o.Z)(e,i);return(0,r.kt)("wrapper",(0,a.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h2",{id:"engines-share-state"},"Engines share state"),(0,r.kt)("p",null,"Except in cases where ",(0,r.kt)("inlineCode",{parentName:"p"},"tournamentEngine")," is used to generate a ",(0,r.kt)("inlineCode",{parentName:"p"},"tournamentRecord")," from scratch,\nit is necessary to first call a ",(0,r.kt)("inlineCode",{parentName:"p"},".setState()")," engine method."),(0,r.kt)("p",null,"Setting ",(0,r.kt)("inlineCode",{parentName:"p"},"tournamentEngine")," state adds a tournamentRecord to global state, which makes it available to ",(0,r.kt)("inlineCode",{parentName:"p"},"competitionEngine"),"."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"tournamentEngine.setState(tournamentRecord);\nconst { tournamentRecords } = competitionEngine.getState();\n")),(0,r.kt)("p",null,"If multiple tournamentRecords are added to ",(0,r.kt)("inlineCode",{parentName:"p"},"competitionEngine")," state,\n",(0,r.kt)("inlineCode",{parentName:"p"},"tournamentEngine")," can point to a specific tournamentRecord by setting ",(0,r.kt)("inlineCode",{parentName:"p"},"tournamentId"),"."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"competitionEngine.setState(tournamentRecords);\ntournamentEngine.setTournamentId(tournamentId);\nconst { tournamentRecord } = tournamentEngine.getState();\n")),(0,r.kt)("p",null,"When a single tournamentRecord is added via ",(0,r.kt)("inlineCode",{parentName:"p"},"competitionEngine"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"tournamentId")," is set automatically."),(0,r.kt)("h2",{id:"synchronous-and-asynchronous"},"Synchronous and Asynchronous"),(0,r.kt)("p",null,"Competition Factory engines share a global state which is by default ",(0,r.kt)("strong",{parentName:"p"},"synchronous"),"."),(0,r.kt)("p",null,"In the ",(0,r.kt)("inlineCode",{parentName:"p"},"/sr/global/examples")," there is an example of an ",(0,r.kt)("strong",{parentName:"p"},"asynchronous")," global state provider which can be copied into projects,\ntypically nodejs servers, which require asynchronous processing."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"import asyncGlobalState from '../src/global/examples/asyncGlobalState';\n\nsetStateProvider(asyncGlobalState);\nconst asyncTournamentEngine = tournamentEngineAsync();\nconst asyncCompetitionEngine = competitionEngineAsync();\n")),(0,r.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},'There is no need to define a "stateProvider" for synchronous use, but it is possible to provide an alternate implementation.'))))}u.isMDXComponent=!0}}]);