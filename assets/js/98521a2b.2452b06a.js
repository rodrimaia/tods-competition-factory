(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[259],{3905:function(e,t,n){"use strict";n.d(t,{Zo:function(){return p},kt:function(){return m}});var i=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,i,o=function(e,t){if(null==e)return{};var n,i,o={},r=Object.keys(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=i.createContext({}),l=function(e){var t=i.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},p=function(e){var t=l(e.components);return i.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},d=i.forwardRef((function(e,t){var n=e.components,o=e.mdxType,r=e.originalType,s=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),d=l(n),m=o,f=d["".concat(s,".").concat(m)]||d[m]||u[m]||r;return n?i.createElement(f,a(a({ref:t},p),{},{components:n})):i.createElement(f,a({ref:t},p))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var r=n.length,a=new Array(r);a[0]=d;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c.mdxType="string"==typeof e?e:o,a[1]=c;for(var l=2;l<r;l++)a[l]=n[l];return i.createElement.apply(null,a)}return i.createElement.apply(null,n)}d.displayName="MDXCreateElement"},4858:function(e,t,n){"use strict";n.r(t),n.d(t,{frontMatter:function(){return c},metadata:function(){return s},toc:function(){return l},default:function(){return u}});var i=n(2122),o=n(9756),r=(n(7294),n(3905)),a=["components"],c={title:"Introduction to Policies"},s={unversionedId:"concepts/policies",id:"concepts/policies",isDocsHomePage:!1,title:"Introduction to Policies",description:"Policies determine how the various Competition Factory engines function and can shape the way that results are returned. Policies can be attached to the tournamentRecord, events, or to drawDefinitions within an event. They can also be passed directly into some factory methods; e.g. a Participant Policy can be passed into a method which returns particpipants and filter out attributes which are not to be displayed.",source:"@site/docs/concepts/policies.md",sourceDirName:"concepts",slug:"/concepts/policies",permalink:"/tods-competition-factory/docs/concepts/policies",version:"current",frontMatter:{title:"Introduction to Policies"},sidebar:"docs",previous:{title:"Global State",permalink:"/tods-competition-factory/docs/concepts/globalState"},next:{title:"Introduction to Avoidance",permalink:"/tods-competition-factory/docs/policies/avoidance"}},l=[{value:"Policy Types",id:"policy-types",children:[]}],p={toc:l};function u(e){var t=e.components,n=(0,o.Z)(e,a);return(0,r.kt)("wrapper",(0,i.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"Policies determine how the various Competition Factory engines function and can shape the way that results are returned. Policies can be attached to the ",(0,r.kt)("inlineCode",{parentName:"p"},"tournamentRecord"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"events"),", or to ",(0,r.kt)("inlineCode",{parentName:"p"},"drawDefinitions")," within an ",(0,r.kt)("inlineCode",{parentName:"p"},"event"),". They can also be passed directly into some factory methods; e.g. a ",(0,r.kt)("strong",{parentName:"p"},"Participant Policy")," can be passed into a method which returns particpipants and filter out attributes which are not to be displayed."),(0,r.kt)("p",null,"The structure of a ",(0,r.kt)("strong",{parentName:"p"},(0,r.kt)("em",{parentName:"strong"},"policyDefinitions"))," object is as follows:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-json"},"{\n  [policyType]: {      // e.g. 'seeding' or 'avoidance'\n    policyName: 'name'  // for 'seeding' can be the provider of the policy, e.g. 'ITF' or 'USTA'\n    ...attributes       // attributes relevant to the policyType\n  },\n  [anotherPolicyType]: {\n    policyName: 'name'\n    ...attributes\n  },\n}\n")),(0,r.kt)("h2",{id:"policy-types"},"Policy Types"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"../policies/avoidance"},"Avoidance Policy"),": Can be attached to drawDefinitions to specify the attriubutes by which participants should be separated"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"../policies/positionActions"},"Position Actions Policy"),": Determines valid actions for positions in a draw structure"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"../policies/positioningSeeds"},"Seeding Policy"),": Sets seeding pattern and thresholds for number of seeds allowed for draw sizes"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"../policies/scheduling"},"Scheduling Policy"),": Defines average and rest/recovery times for matchUpFormats, categoryNames, and categoryTypes"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"../policies/tallyPolicy"},"Round Robin Tally Policy"),": Configures calculations which determine participant finishing positions"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"../policies/feedPolicy"},"Feed Policy"),": Determining the the patterns which direct participants into consolation feed rounds"),(0,r.kt)("li",{parentName:"ul"},"Round Naming Policy: Specifies how rounds of draw structures should be named"),(0,r.kt)("li",{parentName:"ul"},"Participant Policy: Enables participant details to be filtered to respect privacy concerns"),(0,r.kt)("li",{parentName:"ul"},'Scoring Policy: Restricts available matchUpFormats, defines a default and conditions for "ready to score"')))}u.isMDXComponent=!0}}]);