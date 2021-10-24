(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[2618],{3905:function(e,t,n){"use strict";n.d(t,{Zo:function(){return u},kt:function(){return m}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var p=r.createContext({}),s=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=s(e.components);return r.createElement(p.Provider,{value:t},e.children)},l={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,p=e.parentName,u=c(e,["components","mdxType","originalType","parentName"]),d=s(n),m=a,f=d["".concat(p,".").concat(m)]||d[m]||l[m]||o;return n?r.createElement(f,i(i({ref:t},u),{},{components:n})):r.createElement(f,i({ref:t},u))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=d;var c={};for(var p in t)hasOwnProperty.call(t,p)&&(c[p]=t[p]);c.originalType=e,c.mdxType="string"==typeof e?e:a,i[1]=c;for(var s=2;s<o;s++)i[s]=n[s];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},80:function(e,t,n){"use strict";n.r(t),n.d(t,{frontMatter:function(){return c},metadata:function(){return p},toc:function(){return s},default:function(){return l}});var r=n(2122),a=n(9756),o=(n(7294),n(3905)),i=["components"],c={title:"Context"},p={unversionedId:"concepts/context",id:"concepts/context",isDocsHomePage:!1,title:"Context",description:"When matchUps and tournamentParticipants are returned inContext",source:"@site/docs/concepts/context.mdx",sourceDirName:"concepts",slug:"/concepts/context",permalink:"/tods-competition-factory/docs/concepts/context",version:"current",frontMatter:{title:"Context"},sidebar:"docs",previous:{title:"Accessors",permalink:"/tods-competition-factory/docs/concepts/accessors"},next:{title:"Draw Generation",permalink:"/tods-competition-factory/docs/concepts/draw-generation"}},s=[{value:"matchUps",id:"matchups",children:[]},{value:"tournamentParticipants",id:"tournamentparticipants",children:[]},{value:"Converted Extensions",id:"converted-extensions",children:[]}],u={toc:s};function l(e){var t=e.components,n=(0,a.Z)(e,i);return(0,o.kt)("wrapper",(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"When ",(0,o.kt)("strong",{parentName:"p"},"matchUps")," and ",(0,o.kt)("strong",{parentName:"p"},"tournamentParticipants")," are returned ",(0,o.kt)("strong",{parentName:"p"},"inContext"),"\nit means that they include contextual information that is not part of the TODS document node from which they originated."),(0,o.kt)("h2",{id:"matchups"},"matchUps"),(0,o.kt)("p",null,"All API calls which return ",(0,o.kt)("strong",{parentName:"p"},"matchUps")," return deep copies with context.\nAttributes that are added for ",(0,o.kt)("strong",{parentName:"p"},"matchUps")," include: structureId, structureName, drawId, eventId, eventName, tournamentId and tournamentName."),(0,o.kt)("p",null,"In the ",(0,o.kt)("strong",{parentName:"p"},"Live Editor")," example below, ",(0,o.kt)("inlineCode",{parentName:"p"},"inContext: false")," overrides the default behavior.\nChange the value to ",(0,o.kt)("inlineCode",{parentName:"p"},"true")," and compare the ",(0,o.kt)("inlineCode",{parentName:"p"},"matchUp")," objects to see the difference when context is added."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx",metastring:"live",live:!0},"function ContextDemo(props) {\n  const { tournamentRecord } = mocksEngine.generateTournamentRecord({\n    drawProfiles: [{ drawSize: 4 }],\n  });\n  tournamentEngine.setState(tournamentRecord);\n\n  const { matchUps } = tournamentEngine.allTournamentMatchUps({\n    inContext: false,\n  });\n\n  return <MatchUps data={matchUps} />;\n}\n")),(0,o.kt)("h2",{id:"tournamentparticipants"},"tournamentParticipants"),(0,o.kt)("p",null,"When participants are returned with ",(0,o.kt)("inlineCode",{parentName:"p"},"{ inContext: true }"),", those that are ",(0,o.kt)("inlineCode",{parentName:"p"},"participantType")," ",(0,o.kt)("strong",{parentName:"p"},"PAIR, TEAM, or GROUP")," include ",(0,o.kt)("inlineCode",{parentName:"p"},"individualParticipants")," derived from ",(0,o.kt)("inlineCode",{parentName:"p"},"individualParticipantIds"),"."),(0,o.kt)("p",null,"Context is also added if ",(0,o.kt)("inlineCode",{parentName:"p"},"withStatistics, withOpponents, withMatchUps, or scheduleAnalysis")," are true."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"const {\n  tournamentParticipants,\n  participantIdsWithConflicts, // array of participantIds which have scheduling conflicts\n} = tournamentEngine.getTournamentParticipants({\n  inContext: true,\n\n  participantFilters: { participantTypes: [PAIR] },\n  scheduleAnalysis: { scheduledMinutesDifference },\n  policyDefinitions,\n  withStatistics,\n  withOpponents,\n  withMatchUps,\n});\n")),(0,o.kt)("h2",{id:"converted-extensions"},"Converted Extensions"),(0,o.kt)("p",null,"All elements that are returned ",(0,o.kt)("strong",{parentName:"p"},"inContext")," include converted extensions. See ",(0,o.kt)("strong",{parentName:"p"},"makeDeepCopy")," in ",(0,o.kt)("a",{parentName:"p",href:"../utilities/make-deep-copy"},"Utilities"),"."))}l.isMDXComponent=!0}}]);