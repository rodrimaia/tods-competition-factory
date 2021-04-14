(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{100:function(e,t,n){"use strict";n.d(t,"a",(function(){return l})),n.d(t,"b",(function(){return h}));var a=n(0),r=n.n(a);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var p=r.a.createContext({}),d=function(e){var t=r.a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},l=function(e){var t=d(e.components);return r.a.createElement(p.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},b=r.a.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,o=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),l=d(n),b=a,h=l["".concat(o,".").concat(b)]||l[b]||u[b]||i;return n?r.a.createElement(h,c(c({ref:t},p),{},{components:n})):r.a.createElement(h,c({ref:t},p))}));function h(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=b;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c.mdxType="string"==typeof e?e:a,o[1]=c;for(var p=2;p<i;p++)o[p]=n[p];return r.a.createElement.apply(null,o)}return r.a.createElement.apply(null,n)}b.displayName="MDXCreateElement"},95:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return o})),n.d(t,"metadata",(function(){return c})),n.d(t,"toc",(function(){return s})),n.d(t,"default",(function(){return d}));var a=n(3),r=n(7),i=(n(0),n(100)),o={title:"Introduction to Avoidance",menu:"Draw Engine"},c={unversionedId:"policies/avoidance",id:"policies/avoidance",isDocsHomePage:!1,title:"Introduction to Avoidance",description:"Avoidance is an attempt to insure that grouped players do not encounter each other in early rounds (or just the first round) of an elimination draw structure, or that round robin brackets are generated such that players from the same group are evenly distributed across brackets and do not encounter each other unless there are more group members than there are brackets.",source:"@site/docs/policies/avoidance.md",slug:"/policies/avoidance",permalink:"/tods-competition-factory/docs/policies/avoidance",version:"current",sidebar:"docs",previous:{title:"Introduction to Policies",permalink:"/tods-competition-factory/docs/concepts/policies"},next:{title:"Accessors",permalink:"/tods-competition-factory/docs/policies/accessors"}},s=[{value:"Single Round Avoidance",id:"single-round-avoidance",children:[]},{value:"Multiple Round Avoidance",id:"multiple-round-avoidance",children:[]},{value:"Avoidance Policies",id:"avoidance-policies",children:[]}],p={toc:s};function d(e){var t=e.components,n=Object(r.a)(e,["components"]);return Object(i.b)("wrapper",Object(a.a)({},p,n,{components:t,mdxType:"MDXLayout"}),Object(i.b)("p",null,"Avoidance is an attempt to insure that grouped players do not encounter each other in early rounds (or just the first round) of an elimination draw structure, or that round robin brackets are generated such that players from the same group are evenly distributed across brackets and do not encounter each other unless there are more group members than there are brackets."),Object(i.b)("p",null,"Avoidance can be applied to ",Object(i.b)("a",{parentName:"p",href:"./positioningSeeds#seed-blocks"},"Seed Blocks")," as well as unseeded players, though Seeded players may only be moved to other positions valid for the Seed Block within which they are placed."),Object(i.b)("h2",{id:"single-round-avoidance"},"Single Round Avoidance"),Object(i.b)("p",null,"Single Round Avoidance an be accomplished by random placement followed by an iterative shuffling algorithm which generates a score for each player distribution and which runs through a set number of iterations, or by iterative attempts to resolve conflicts by searching for alternate player positions. In some cases where single round avoidance is the goal it is specifically forbidden to attempt to maximize player separation within a draw."),Object(i.b)("h2",{id:"multiple-round-avoidance"},"Multiple Round Avoidance"),Object(i.b)("p",null,"Multiple Round Avoidance seeks to place players as far apart within a draw structure as possible. This can be accomplished by dividing a draw structure into sections based on the number of players within a given group and distributing a group's players evenly across these sections, randomizing section placement if there are more sections than players in a given group. This process would be repeated for each group starting with the largest group. There are scenarios where players in smaller groups end up having only adjacent positions available when it comes to their distribution which necessitates a shuffling step for previously placed groups."),Object(i.b)("h2",{id:"avoidance-policies"},"Avoidance Policies"),Object(i.b)("p",null,"Both the ",Object(i.b)("strong",{parentName:"p"},"tournamentEngine")," and ",Object(i.b)("strong",{parentName:"p"},"drawEngine")," within the Competition Factory support attaching policy definitions which control the behavior of various exported methods."),Object(i.b)("p",null,"For Avoidance the algoritm requires access to attributes of tournament participants and thus must be accessed via the ",Object(i.b)("strong",{parentName:"p"},"tournamentEngine"),"."),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-js"},"const values = {\n  event,\n  eventId,\n  automated: true,\n  drawSize: 32,\n  policyDefinitions: [AVOIDANCE_COUNTRY],\n};\nconst { drawDefinition } = tournamentEngine.generateDrawDefinition(values);\n")),Object(i.b)("p",null,"In this case the ",Object(i.b)("strong",{parentName:"p"},"policydefinition")," specifies that participants in the generated draw are to be separated according to any country values that may exist on participant records. The policy is defined as follows:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-js"},"const AVOIDANCE_COUNTRY = {\n  avoidance: {\n    roundsToSeparate: undefined,\n    policyName: 'Nationality Code',\n    policyAttributes: [\n      { key: 'person.nationalityCode' },\n      { key: 'individualParticipants.person.nationalityCode' },\n    ],\n  },\n};\n")),Object(i.b)("p",null,Object(i.b)("strong",{parentName:"p"},"policyName")," is not required but useful for identifying a policy which has been attached to a ",Object(i.b)("strong",{parentName:"p"},"drawDefinition")),Object(i.b)("p",null,Object(i.b)("strong",{parentName:"p"},"roundsToSeparate")," defines the desired separation; if undefined defaults to maximum separation."),Object(i.b)("p",null,Object(i.b)("strong",{parentName:"p"},"policyAttrributes")," is an array of ",Object(i.b)("a",{parentName:"p",href:"./accessors"},'"accessors"')," which determine which attributes of participants to consider. In the example above the ",Object(i.b)("em",{parentName:"p"},"nationalityCode")," of participants can be found in different places depending on whether the participant is an INDIVIDUAL or a PAIR. This notation works regardless of whether child attributes are strings, numbers, or arrays, as is the case with ",Object(i.b)("em",{parentName:"p"},"individualPartcipants")," in PAIR participants."),Object(i.b)("p",null,Object(i.b)("strong",{parentName:"p"},"policyAttributes")," can have an additional attribute ",Object(i.b)("strong",{parentName:"p"},Object(i.b)("em",{parentName:"strong"},"significantCharacters"))," which specifies the number of characters which will be considered when creating values for each key."),Object(i.b)("p",null,'INDIVIDUAL participants may be mebmers of PAIR, TEAM and GROUP participants; the INDIVIDUAL participant object does not contain these attributes, so they must be added as "context" before avoidance processing can proceed. Three additional attributes are therefore added to the INDIVIDUAL partcipant objects:'),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},"pairParticipantIds"),Object(i.b)("li",{parentName:"ul"},"teamParticipantIds"),Object(i.b)("li",{parentName:"ul"},"groupParticipantIds")),Object(i.b)("p",null,"Specifying that PAIR, TEAM or GROUP particpants should be considered for avoidance is achieved via 'directives' rather than keys because the value are handled differently."),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-js"},"const pairAvoidancePolicy = {\n  roundsToSeparate: undefined,\n  policyName: 'Doubles Partner Avoidance',\n  policyAttributes: [{ directive: 'pairParticipants' }],\n};\n")),Object(i.b)("p",null,"To restrict the participantIds to be considered, add ",Object(i.b)("strong",{parentName:"p"},Object(i.b)("em",{parentName:"strong"},"includeIds"))," as an attribute containing an array of desired participantIds."),Object(i.b)("p",null,"Other desired avoidance attributes may exist on participant objects as extensions. Any such extensions will be added as attributes to the participant object prior to processing."))}d.isMDXComponent=!0}}]);