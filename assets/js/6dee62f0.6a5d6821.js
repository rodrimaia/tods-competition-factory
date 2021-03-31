(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{117:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return b}));var a=n(0),r=n.n(a);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var m=r.a.createContext({}),p=function(e){var t=r.a.useContext(m),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},u=function(e){var t=p(e.components);return r.a.createElement(m.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},l=r.a.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,o=e.parentName,m=c(e,["components","mdxType","originalType","parentName"]),u=p(n),l=a,b=u["".concat(o,".").concat(l)]||u[l]||d[l]||i;return n?r.a.createElement(b,s(s({ref:t},m),{},{components:n})):r.a.createElement(b,s({ref:t},m))}));function b(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=l;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:a,o[1]=s;for(var m=2;m<i;m++)o[m]=n[m];return r.a.createElement.apply(null,o)}return r.a.createElement.apply(null,n)}l.displayName="MDXCreateElement"},93:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return o})),n.d(t,"metadata",(function(){return s})),n.d(t,"toc",(function(){return c})),n.d(t,"default",(function(){return p}));var a=n(3),r=n(7),i=(n(0),n(117)),o={title:"Time Items"},s={unversionedId:"concepts/timeItems",id:"concepts/timeItems",isDocsHomePage:!1,title:"Time Items",description:"timeItems can exist on any document element in TODS and are used to capture attributes which may change over time and where it is desierable to keep track of such changes.",source:"@site/docs/concepts/timeItems.md",slug:"/concepts/timeItems",permalink:"/tods-competition-factory/docs/concepts/timeItems",version:"current",sidebar:"docs",previous:{title:"Positioning Seeds",permalink:"/tods-competition-factory/docs/policies/positioningSeeds"},next:{title:"Scale Items",permalink:"/tods-competition-factory/docs/concepts/scaleItems"}},c=[{value:"Object properties",id:"object-properties",children:[{value:"itemType and itemSubTypes",id:"itemtype-and-itemsubtypes",children:[]}]},{value:"Internal usage",id:"internal-usage",children:[{value:"Participants",id:"participants",children:[]},{value:"matchUps",id:"matchups",children:[]}]},{value:"Other use cases",id:"other-use-cases",children:[{value:"Ranking and Ratings",id:"ranking-and-ratings",children:[]}]}],m={toc:c};function p(e){var t=e.components,n=Object(r.a)(e,["components"]);return Object(i.b)("wrapper",Object(a.a)({},m,n,{components:t,mdxType:"MDXLayout"}),Object(i.b)("p",null,Object(i.b)("strong",{parentName:"p"},"timeItems")," can exist on any document element in TODS and are used to capture attributes which may change over time and where it is desierable to keep track of such changes."),Object(i.b)("p",null,"For instance, a ",Object(i.b)("strong",{parentName:"p"},"matchUp")," may be assigned to one court and scheduled, and then be interrupted and re-scheduled to start later on another court. ",Object(i.b)("strong",{parentName:"p"},"matchUp")," ",Object(i.b)("em",{parentName:"p"},"duration")," can be calculated from all ",Object(i.b)("strong",{parentName:"p"},"timeItems")," which relate to the starting and stopping of play."),Object(i.b)("h2",{id:"object-properties"},"Object properties"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-js"},"const timeItem = {\n  itemType: 'SCALE.RANKING.SINGLES.WTN',\n  itemSubTypes; [], // optional\n  itemValue: 13.20,\n  itemDate: '2020-01-01T00:00',\n  createdAt: '2020-01-03T06:21'\n}\n")),Object(i.b)("h3",{id:"itemtype-and-itemsubtypes"},"itemType and itemSubTypes"),Object(i.b)("p",null,"itemType is a string, while itemSubTypes is an array of strings. In Competition Factory itemType uses dot notation to represent a hierarchical structure. This is useful for matching fragments of a type in some internal functions."),Object(i.b)("h4",{id:"example-itemtypes"},"Example itemTypes"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-js"},"itemType: 'SCHEDULE.ASSIGNMENT.VENUE',\nitemType: 'SCHEDULE.ASSIGNMENT.COURT',\nitemType: 'SCHEDULE.ASSIGNMENT.OFFICIAL',\nitemType: 'SCHEDULE.DATE',\nitemType: 'SCHEDULE.TIME.SCHEDULED',\nitemType: 'SCHEDULE.TIME.START',\nitemType: 'SCHEDULE.TIME.STOP',\nitemType: 'SCHEDULE.TIME.RESUME',\nitemType: 'SCHEDULE.TIME.END,\n")),Object(i.b)("h2",{id:"internal-usage"},"Internal usage"),Object(i.b)("p",null,"In most cases ",Object(i.b)("strong",{parentName:"p"},"timeItems")," are used internally by the various Competition Factory engines."),Object(i.b)("h3",{id:"participants"},"Participants"),Object(i.b)("p",null,Object(i.b)("strong",{parentName:"p"},"timeItems")," are used to track participant registration, sign-in and payment status as well as penalties and rankings and ratings values for different event categories. They are also used to capture manual seedings for events."),Object(i.b)("h3",{id:"matchups"},"matchUps"),Object(i.b)("p",null,Object(i.b)("strong",{parentName:"p"},"timeItems")," are used to capture scheduling attributes including start, stop, resume, end as well as assignment of court, referee & etc. Schedule related attributes are extracted from ",Object(i.b)("strong",{parentName:"p"},"timeItems"),' when a matchUp is retrieved with "context" and added to the ',Object(i.b)("strong",{parentName:"p"},"matchUp.schedule")," object."),Object(i.b)("h2",{id:"other-use-cases"},"Other use cases"),Object(i.b)("p",null,"Competition Factory defines methods for adding and retrieving arbitrary ",Object(i.b)("strong",{parentName:"p"},"timeItems")," for the tournament record, event, and drawDefinitions."),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-js"},"tournamentEngine.addTournamentTimeItem({ timeItem });\ntournamentEngine.addEventTimeItem({ eventId, timeItem });\ntournamentEngine.addDrawDefinitionTimeItem({ drawId, timeItem });\n\ntournamentEngine.getTournamentTimeItem({ itemType, itemSubTypes });\ntournamentEngine.getEventTimeItem({ eventId, itemType, itemSubTypes });\ntournamentEngine.getDrawDefinitionTimeItem({ drawId, itemType, itemSubTypes });\n")),Object(i.b)("h3",{id:"ranking-and-ratings"},"Ranking and Ratings"),Object(i.b)("p",null,"Sometimes a tournament organizer may want to fetch player Rankings and Ratings from a remote service. In such scenarios it is desireable to both capture a time stamp for when the last retrieval occurred and be able to query an event's ",Object(i.b)("strong",{parentName:"p"},"timeItems")," to be able to display the value."),Object(i.b)("h4",{id:"adding-a-timeitem-to-an-event"},"Adding a timeITem to an event"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-js"},"const timeItem = {\n  itemType: 'RETRIEVAL.RANKING.SINGLES.U18',\n  itemValue: '2021-01-01T00:00',\n};\ntournamentEngine.addEventTimeItem({ eventId, timeItem });\n")),Object(i.b)("h4",{id:"retrieving-a-timeitem-from-an-event"},"Retrieving a timeITem from an event"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-js"},"const {\n  timeItem: retrievedTimeItem,\n  message,\n} = tournamentEngine.getEventTimeItem({\n  itemType: 'RETRIEVAL.RANKING.SINGLES.U18',\n  eventId,\n});\n")))}p.isMDXComponent=!0}}]);