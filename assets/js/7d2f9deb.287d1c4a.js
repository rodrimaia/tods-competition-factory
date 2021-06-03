(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[672],{3905:function(e,n,t){"use strict";t.d(n,{Zo:function(){return d},kt:function(){return u}});var a=t(7294);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function o(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n){if(null==e)return{};var t,a,r=function(e,n){if(null==e)return{};var t,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)t=i[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)t=i[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var c=a.createContext({}),l=function(e){var n=a.useContext(c),t=n;return e&&(t="function"==typeof e?e(n):o(o({},n),e)),t},d=function(e){var n=l(e.components);return a.createElement(c.Provider,{value:n},e.children)},p={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},m=a.forwardRef((function(e,n){var t=e.components,r=e.mdxType,i=e.originalType,c=e.parentName,d=s(e,["components","mdxType","originalType","parentName"]),m=l(t),u=r,h=m["".concat(c,".").concat(u)]||m[u]||p[u]||i;return t?a.createElement(h,o(o({ref:n},d),{},{components:t})):a.createElement(h,o({ref:n},d))}));function u(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var i=t.length,o=new Array(i);o[0]=m;var s={};for(var c in n)hasOwnProperty.call(n,c)&&(s[c]=n[c]);s.originalType=e,s.mdxType="string"==typeof e?e:r,o[1]=s;for(var l=2;l<i;l++)o[l]=t[l];return a.createElement.apply(null,o)}return a.createElement.apply(null,t)}m.displayName="MDXCreateElement"},9026:function(e,n,t){"use strict";t.r(n),t.d(n,{frontMatter:function(){return s},metadata:function(){return c},toc:function(){return l},default:function(){return p}});var a=t(2122),r=t(9756),i=(t(7294),t(3905)),o=["components"],s={title:"Features",slug:"/features"},c={unversionedId:"features",id:"features",isDocsHomePage:!1,title:"Features",description:"Mock Tournament Generation",source:"@site/docs/features.mdx",sourceDirName:".",slug:"/features",permalink:"/tods-competition-factory/docs/features",version:"current",frontMatter:{title:"Features",slug:"/features"},sidebar:"docs",previous:{title:"Introduction",permalink:"/tods-competition-factory/docs/"},next:{title:"Installation",permalink:"/tods-competition-factory/docs/installation"}},l=[{value:"Mock Tournament Generation",id:"mock-tournament-generation",children:[]},{value:"Draw Generation",id:"draw-generation",children:[]},{value:"Scheduling",id:"scheduling",children:[{value:"scheduleTimes",id:"scheduletimes",children:[]},{value:"scheduleMatchUps",id:"schedulematchups",children:[]},{value:"scheduleProfileRounds()",id:"scheduleprofilerounds",children:[]}]}],d={toc:l};function p(e){var n=e.components,t=(0,r.Z)(e,o);return(0,i.kt)("wrapper",(0,a.Z)({},d,t,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("h2",{id:"mock-tournament-generation"},"Mock Tournament Generation"),(0,i.kt)("p",null,"The ",(0,i.kt)("inlineCode",{parentName:"p"},"mocksEngine")," can generate entire TODS tournament documents, including participants, events, and draws."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-jsx",metastring:"live",live:!0},"function MocksEngineDemo(props) {\n  const { tournamentRecord } = mocksEngine.generateTournamentRecord();\n\n  return <Tournament data={tournamentRecord} />;\n}\n")),(0,i.kt)("p",null,"See ",(0,i.kt)("a",{parentName:"p",href:"engines/mocks-engine-examples"},"Generating Tournaments")," for more examples of mock tournament generation,"),(0,i.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"Live Visualizations")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"For a live example of the ",(0,i.kt)("inlineCode",{parentName:"p"},"mocksEngine")," in action, see the ",(0,i.kt)("strong",{parentName:"p"},(0,i.kt)("a",{parentName:"strong",href:"https://courthive.github.io/tods-react-draws/example"},"Example: tods-react-draws"))))),(0,i.kt)("div",{className:"admonition admonition-tip alert alert--success"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"RESTful API Available")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"For free access to a public RESTful API, contact ",(0,i.kt)("a",{parentName:"p",href:"mailto:support@courthive.com"},"support@courthive.com"),"."))),(0,i.kt)("h2",{id:"draw-generation"},"Draw Generation"),(0,i.kt)("p",null,"Draws are the centerpiece of any tournament. While TODS strives to be agnostic about the specific type of draw represented by a ",(0,i.kt)("inlineCode",{parentName:"p"},"drawDefinition"),", ",(0,i.kt)("strong",{parentName:"p"},"Competition Factory")," includes a convenience method which exercises other methods to generate a wide range of recognized ",(0,i.kt)("a",{parentName:"p",href:"engines/draw-types"},"draw types"),"."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-jsx",metastring:"live",live:!0},"function DrawDefinitionDemo(props) {\n  const { drawDefinition } = tournamentEngine.generateDrawDefinition({\n    drawSize: 32,\n    drawName: 'Demo Draw',\n    drawType: 'COMPASS',\n  });\n\n  return <Draw data={drawDefinition} />;\n}\n")),(0,i.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("h3",{parentName:"div",id:"generating-multiple-flights"},"Generating Multiple Flights"),(0,i.kt)("p",{parentName:"div"},(0,i.kt)("inlineCode",{parentName:"p"},"generateFlightProfile()")," generates flighted draw details which can be fed into ",(0,i.kt)("inlineCode",{parentName:"p"},"generateDrawDefinition()"),"."))),(0,i.kt)("h2",{id:"scheduling"},"Scheduling"),(0,i.kt)("p",null,"In addition to individual and bulk manual scheduling methods, the ",(0,i.kt)("strong",{parentName:"p"},"Competition Factory")," supports automated\n",(0,i.kt)("strong",{parentName:"p"},"Garman Scheduling")," and surfaces the Garman calculations at various levels of abstraction, all of which are\ndependent on a tournament record including ",(0,i.kt)("inlineCode",{parentName:"p"},"venues")," with ",(0,i.kt)("inlineCode",{parentName:"p"},"courts")," with defined ",(0,i.kt)("inlineCode",{parentName:"p"},"dateAvailability"),", as well as an\nexpected ",(0,i.kt)("inlineCode",{parentName:"p"},"averageMatchUpMinutes"),". Scheduling methods are surfaced via the ",(0,i.kt)("inlineCode",{parentName:"p"},"competitionEngine")," to enable scheduling\nmultiple tournaments with shared ",(0,i.kt)("inlineCode",{parentName:"p"},"venues"),"."),(0,i.kt)("h3",{id:"scheduletimes"},"scheduleTimes"),(0,i.kt)("p",null,"At the lowest level there is ",(0,i.kt)("inlineCode",{parentName:"p"},"calculateScheduleTimes()"),", which returns an array of available schedule times for a\ngiven date (and optional time range). In the example below there are 3 courts with a startTime of ",(0,i.kt)("strong",{parentName:"p"},"08:00"),".\nIn the generated ",(0,i.kt)("strong",{parentName:"p"},"scheduleTimes")," you can see that the first three available times are ",(0,i.kt)("strong",{parentName:"p"},"08:00"),", and after that\nthe times are produced by the Garman formula."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-jsx",metastring:"live",live:!0},"function ScheduleTimesDemo(props) {\n  const venueProfiles = [\n    {\n      startTime: '08:00',\n      endTime: '20:00',\n      courtsCount: 3,\n    },\n  ];\n  const { tournamentRecord } = mocksEngine.generateTournamentRecord({\n    venueProfiles,\n  });\n  competitionEngine.setState(tournamentRecord);\n  const { startDate, endDate } = competitionEngine.getCompetitionDateRange();\n  const { scheduleTimes } = competitionEngine.calculateScheduleTimes({\n    date: startDate,\n  });\n\n  return (\n    <RenderJSON\n      data={scheduleTimes}\n      root={'scheduleTimes'}\n      expandRoot={false}\n    />\n  );\n}\n")),(0,i.kt)("h3",{id:"schedulematchups"},"scheduleMatchUps"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"scheduleMatchUps()")," takes an ordered array of ",(0,i.kt)("inlineCode",{parentName:"p"},"matchUpIds")," and target ",(0,i.kt)("inlineCode",{parentName:"p"},"venueIds")," and assigns a ",(0,i.kt)("inlineCode",{parentName:"p"},"scheduledTime")," to each ",(0,i.kt)("inlineCode",{parentName:"p"},"matchUp"),"."),(0,i.kt)("h3",{id:"scheduleprofilerounds"},"scheduleProfileRounds()"),(0,i.kt)("p",null,"The ordering of ",(0,i.kt)("inlineCode",{parentName:"p"},"matchUps")," is handled automatically by ",(0,i.kt)("inlineCode",{parentName:"p"},"scheduleProfileRounds()")," which uses a ",(0,i.kt)("inlineCode",{parentName:"p"},"schedulingProfile"),"\nto not only automatically determine the order of ",(0,i.kt)("inlineCode",{parentName:"p"},"matchUps")," from specified ",(0,i.kt)("inlineCode",{parentName:"p"},"rounds"),", but also considers per-player\n(and per-format) daily matchUp limmits and scheduling policies which are attached to the tournament record(s).\nScheduling policies can define both ",(0,i.kt)("strong",{parentName:"p"},"average minutes")," and ",(0,i.kt)("strong",{parentName:"p"},"recovery mintes")," for each ",(0,i.kt)("inlineCode",{parentName:"p"},"matchUpFormat"),", and policy\ndefaults can be overridden by event-level settings. For a full explanation see ",(0,i.kt)("a",{parentName:"p",href:"pseudocode/scheduling"},"Advanced Scheduling"),"."))}p.isMDXComponent=!0}}]);