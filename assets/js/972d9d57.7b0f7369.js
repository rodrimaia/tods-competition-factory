(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[937],{3905:function(e,t,n){"use strict";n.d(t,{Zo:function(){return l},kt:function(){return d}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=r.createContext({}),p=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},l=function(e){var t=p(e.components);return r.createElement(c.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,c=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),m=p(n),d=a,g=m["".concat(c,".").concat(d)]||m[d]||u[d]||o;return n?r.createElement(g,i(i({ref:t},l),{},{components:n})):r.createElement(g,i({ref:t},l))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=m;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:a,i[1]=s;for(var p=2;p<o;p++)i[p]=n[p];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},927:function(e,t,n){"use strict";n.r(t),n.d(t,{frontMatter:function(){return s},metadata:function(){return c},toc:function(){return p},default:function(){return u}});var r=n(2122),a=n(9756),o=(n(7294),n(3905)),i=["components"],s={title:"Introduction",slug:"/"},c={unversionedId:"introduction",id:"introduction",isDocsHomePage:!1,title:"Introduction",description:"The Tennis Open Data Standards, (TODS), provide a document-based representation of all of the elements of a tournament including participants, events, draws, matchUps, contacts, and references to online resources. Although the data standard is emerging in the sport of Tennis, the data structures apply to tournaments in many sports.",source:"@site/docs/introduction.mdx",sourceDirName:".",slug:"/",permalink:"/tods-competition-factory/docs/",version:"current",frontMatter:{title:"Introduction",slug:"/"},sidebar:"docs",next:{title:"Features",permalink:"/tods-competition-factory/docs/features"}},p=[{value:"State Engines",id:"state-engines",children:[]},{value:"Interactive Examples",id:"interactive-examples",children:[]}],l={toc:p};function u(e){var t=e.components,n=(0,a.Z)(e,i);return(0,o.kt)("wrapper",(0,r.Z)({},l,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"The ",(0,o.kt)("strong",{parentName:"p"},(0,o.kt)("a",{parentName:"strong",href:"https://itftennis.atlassian.net/wiki/spaces/TODS/overview"},"Tennis Open Data Standards")),", ",(0,o.kt)("strong",{parentName:"p"},"(TODS)"),", provide a document-based representation of all of the elements of a tournament including participants, events, draws, matchUps, contacts, and references to online resources. Although the data standard is emerging in the sport of Tennis, the data structures apply to tournaments in many sports."),(0,o.kt)("p",null,"The ",(0,o.kt)("strong",{parentName:"p"},"Competition Factory"),' is a collection of "state engines" for transforming/mutating ',(0,o.kt)("strong",{parentName:"p"},"TODS"),' documents and is intended to insure the integrity of Tournaments by managing all state transformations. These engines embody the "business rules" required by Tournament Management Solutions, and enable an entirely new way of constructing software to manage tournaments. The rules governing the creation of draws, seeding, and participant movement can be present on a standalone client, on a server, or both. An entire tournament management solution can run in a browser, optionally utilizing IndexedDB or localStorage, or a client can communicate with a server which utilizes a SQL or NoSQL database, or simply the file system. Server deployments support asynchronous processing models in ',(0,o.kt)("strong",{parentName:"p"},"Node.js"),"."),(0,o.kt)("h2",{id:"state-engines"},"State Engines"),(0,o.kt)("p",null,"Engines manage different concerns within a document structure representing a tournament and may contain ",(0,o.kt)("strong",{parentName:"p"},"accessors, generators, getters, governors and test suites"),". Engines can be used either synchronously or asynchronously."),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("strong",{parentName:"li"},"competitionEngine")," - managages resources which may be shared by multiple tournaments, such as venues (courts & other locations); includes scheduling."),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("strong",{parentName:"li"},"tournamentEngine")," - manages tournament metadata, participants, events; many ",(0,o.kt)("inlineCode",{parentName:"li"},"drawEngine")," methods are also exported directly."),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("strong",{parentName:"li"},"drawEngine")," - generates drawDefinitions and matchUp results; manages participant movement within and between structures."),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("strong",{parentName:"li"},"mocksEngine")," - generates tournaments, participants, events and drawDefinitions for testing purposes.")),(0,o.kt)("h2",{id:"interactive-examples"},"Interactive Examples"),(0,o.kt)("div",{className:"admonition admonition-tip alert alert--success"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"tip")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"This documentation includes Live Code Editors to enable direct interaction with the APIs. The ",(0,o.kt)("inlineCode",{parentName:"p"},"drawEngine"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"tournamentEngine"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"competitionEngine"),", and ",(0,o.kt)("inlineCode",{parentName:"p"},"mocksEngine")," can be accessed in any ",(0,o.kt)("strong",{parentName:"p"},"LIVE EDITOR"),"."))),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx",metastring:"live",live:!0},"function GiveThanks(props) {\n  const thanks = tournamentEngine.credits();\n\n  return <pre>{thanks}</pre>;\n}\n")))}u.isMDXComponent=!0}}]);