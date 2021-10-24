(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[9236],{7018:function(e,t,a){"use strict";a.d(t,{Z:function(){return u}});var n=a(7294),i=a(5753),d=a(126),r=JSON.parse('{"monokai":{"scheme":"monokai","author":"wimer hazenberg (http://www.monokai.nl)","base00":"#272822","base01":"#383830","base02":"#49483e","base03":"#75715e","base04":"#a59f85","base05":"#f8f8f2","base06":"#f5f4f1","base07":"#f9f8f5","base08":"#f92672","base09":"#fd971f","base0A":"#f4bf75","base0B":"#a6e22e","base0C":"#a1efe4","base0D":"#66d9ef","base0E":"#ae81ff","base0F":"#cc6633"},"summerfruit":{"scheme":"summerfruit","author":"christopher corley (http://cscorley.github.io/)","base00":"#151515","base01":"#202020","base02":"#303030","base03":"#505050","base04":"#B0B0B0","base05":"#D0D0D0","base06":"#E0E0E0","base07":"#FFFFFF","base08":"#FF0086","base09":"#FD8900","base0A":"#ABA800","base0B":"#00C918","base0C":"#1faaaa","base0D":"#3777E6","base0E":"#AD00A1","base0F":"#cc6633"},"solarized":{"scheme":"solarized","author":"ethan schoonover (http://ethanschoonover.com/solarized)","base00":"#002b36","base01":"#073642","base02":"#586e75","base03":"#657b83","base04":"#839496","base05":"#93a1a1","base06":"#eee8d5","base07":"#fdf6e3","base08":"#dc322f","base09":"#cb4b16","base0A":"#b58900","base0B":"#859900","base0C":"#2aa198","base0D":"#268bd2","base0E":"#6c71c4","base0F":"#d33682"}}'),o=function(e,t,a){var n=e.style;return{style:Object.assign({},n,{color:Number.isNaN(a[0])||parseInt(a,10)%2?n.color:"#33F"})}},c=function(e,t,a){var n=e.style;return{style:Object.assign({},n,{fontWeight:a?"bold":n.textTransform})}},s=function(e,t){var a=e.style;return{style:Object.assign({},a,{borderRadius:"Boolean"===t?3:a.borderRadius})}},l=function(e,t,a){var d,r="object"==typeof t,o=r&&Object.values(t)[0],c="string"==typeof o&&"{"===o[0];if(r){var s=Object.keys(t);2!==i.hC.intersection(s,["drawId","drawType"]).length||s.includes("drawRepresentativeIds")||(d="drawDefinition"),2!==i.hC.intersection(s,["entryPosition","entryStatus"]).length||s.includes("entryStageSequence")||(d="entry"),2!==i.hC.intersection(s,["eventId","eventName"]).length||s.includes("tennisOfficialIds")||(d="event"),2===i.hC.intersection(s,["flightNumber","drawId"]).length&&(d="flight"),2===i.hC.intersection(s,["name","value"]).length&&(d="extension"),2!==i.hC.intersection(s,["linkType","source"]).length||s.includes("linkCondition")||(d="link"),2!==i.hC.intersection(s,["matchUpId","drawPositions"]).length||s.includes("surfaceCategory")||(d="matchUp"),2===i.hC.intersection(s,["drawPosition","participantId","bye"]).length&&(d="positionAssignment"),2!==i.hC.intersection(s,["courtId","dateAvailability"]).length||s.includes("altitude")||(d="court"),2!==i.hC.intersection(s,["participantId","participantName"]).length||s.includes("onlineResources")||(d="participant"),2===i.hC.intersection(s,["structureId","structureName"]).length&&(d="structure"),2!==i.hC.intersection(s,["venueId","courts"]).length||s.includes("venueOtherIds")||(d="venue")}return n.createElement("span",null,d||(c?e:a))},p=function(e){return"string"==typeof(t=e)&&t.length>2&&"{"===t[1]?function(e){try{var t=JSON.parse(JSON.parse(e)),a="true"===t.required?"":"? ",n="true"===t.array?"[]":"";return a+": "+(["any","boolean","number","string"].includes(t.type)?t.type:"object"===t.type?t.object||"Object":"enum"===t.type?"enum "+t.enum:"")+n+(t.note?" \\\\ "+t.note:"")}catch(i){return""}}(e):"string"==typeof e&&e.length>40?e.slice(0,40)+"...":e;var t},m=function(e){var t=e[0];return n.createElement("strong",null,t)},u=function(e){var t=e.colorScheme,a=void 0===t?"summerfruit":t,i=e.sortObjectKeys,u=void 0===i||i,h=e.invertTheme,f=void 0===h||h,b=e.expandRoot,N=void 0===b||b,v=e.expandToLevel,g=void 0===v?1:v,I=e.hideRoot,y=void 0!==I&&I,T=e.root,k=void 0===T?"root":T,C=e.data;return n.createElement("div",{style:{marginBottom:"1em"}},n.createElement(d.ZP,{theme:{valueLabel:o,nestedNodeLabel:c,extend:r[a],value:s},shouldExpandNode:function(e,t,a){return!!N&&(("object"!=typeof t||!t._typeDef)&&(a<g||void 0))},sortObjectKeys:u,getItemString:l,labelRenderer:m,valueRenderer:p,invertTheme:f,hideRoot:y,keyPath:[k],data:C}))}},4614:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return b},frontMatter:function(){return m},metadata:function(){return u},toc:function(){return h}});var n=a(2122),i=a(9756),d=(a(7294),a(3905)),r=a(7018),o=JSON.parse('[{"participantId":"732cc1d0-4e8d-4575-a407-3e576dd5b395","participantType":"INDIVIDUAL","participantRole":"COMPETITOR","participantName":"Mai Nirundorn","person":{"addresses":[{"city":"Koloa","state":"MN","postalCode":"06246","countryCode":"ISV"}],"personId":"fd49533c-fcce-48d7-9ee3-b904b143ef0b","standardFamilyName":"Nirundorn","standardGivenName":"Mai","nationalityCode":"ISV","extensions":[{"name":"regionCode","value":1}],"sex":"FEMALE"},"draws":[{"drawName":"SINGLE_ELIMINATION","drawType":"SINGLE_ELIMINATION","entryStage":"MAIN","entryStatus":"DIRECT_ACCEPTANCE","eventId":"2293081f-475a-4fe2-b774-35c65be3d38a","drawId":"6d8ffefb-c1c2-4211-856b-a508a36ed148"},{"drawName":"SINGLE_ELIMINATION","drawType":"SINGLE_ELIMINATION","entryStage":"MAIN","entryStatus":"DIRECT_ACCEPTANCE","eventId":"cd2c7d3e-f4c3-43df-8e06-ad8623c330cb","drawId":"4bcddbeb-8fea-4567-b321-5fbadb61e83f"}],"events":[{"eventId":"2293081f-475a-4fe2-b774-35c65be3d38a","eventName":"Generated Event","eventType":"SINGLES","entryStage":"MAIN","entryStatus":"DIRECT_ACCEPTANCE","drawIds":["6d8ffefb-c1c2-4211-856b-a508a36ed148"]},{"eventId":"cd2c7d3e-f4c3-43df-8e06-ad8623c330cb","eventName":"Generated Event","eventType":"DOUBLES","entryStage":"MAIN","entryStatus":"DIRECT_ACCEPTANCE","drawIds":["4bcddbeb-8fea-4567-b321-5fbadb61e83f"],"partnerParticipantId":"09e8fd0b-a7f2-4053-8d11-33df910639c4"}],"potentialMatchUps":[{"drawId":"6d8ffefb-c1c2-4211-856b-a508a36ed148","eventId":"2293081f-475a-4fe2-b774-35c65be3d38a","eventType":"SINGLES","matchUpId":"96c69f86-9686-436c-803e-26ea7ddc1ab8","matchUpFormat":"SET3-S:6/TB7","roundName":"QF","roundNumber":2,"roundPosition":4,"schedule":{"time":"00:00:00","milliseconds":0,"scheduledDate":"2021-01-01","scheduledTime":"09:00","averageMinutes":90,"timeAfterRecovery":"11:30","typeChangeTimeAfterRecovery":"11:30","scheduleConflict":"2fa18511-5d50-4ae8-8a66-609cc4737e96"},"structureName":"MAIN","potential":true},{"drawId":"4bcddbeb-8fea-4567-b321-5fbadb61e83f","eventId":"cd2c7d3e-f4c3-43df-8e06-ad8623c330cb","eventType":"DOUBLES","matchUpId":"cdd04d5d-01a5-4698-ae22-8592417e1a2a","matchUpFormat":"SET3-S:6/TB7","roundName":"QF","roundNumber":2,"roundPosition":3,"schedule":{},"structureName":"MAIN","potential":true}],"matchUps":[{"drawId":"6d8ffefb-c1c2-4211-856b-a508a36ed148","eventId":"2293081f-475a-4fe2-b774-35c65be3d38a","eventType":"SINGLES","matchUpId":"733c4e76-5da7-4e68-9ba2-2450dbfb4bd6","matchUpFormat":"SET3-S:6/TB7","matchUpStatus":"TO_BE_PLAYED","opponentParticipantInfo":[{"participantId":"68452ced-8d45-4a08-83c7-dc045580a827","participantType":"INDIVIDUAL"}],"roundName":"R16","roundNumber":1,"roundPosition":7,"schedule":{"time":"00:00:00","milliseconds":0,"scheduledDate":"2021-01-01","scheduledTime":"08:00","averageMinutes":90,"timeAfterRecovery":"10:30","typeChangeTimeAfterRecovery":"10:30"},"structureName":"MAIN","winnerTo":{"matchUpId":"96c69f86-9686-436c-803e-26ea7ddc1ab8","structureId":"9c543188-4134-4e4e-94eb-294cccfa3d64","schedule":{"time":"00:00:00","milliseconds":0,"scheduledDate":"2021-01-01","scheduledTime":"09:00","averageMinutes":90,"timeAfterRecovery":"11:30","typeChangeTimeAfterRecovery":"11:30","scheduleConflict":"2fa18511-5d50-4ae8-8a66-609cc4737e96"},"roundNumber":2,"roundPosition":4,"structureName":"MAIN"}},{"drawId":"4bcddbeb-8fea-4567-b321-5fbadb61e83f","eventId":"cd2c7d3e-f4c3-43df-8e06-ad8623c330cb","eventType":"DOUBLES","matchUpId":"86c7b7ec-f52e-4430-9335-e976874f7985","matchUpFormat":"SET3-S:6/TB7","matchUpStatus":"TO_BE_PLAYED","opponentParticipantInfo":[{"participantId":"d4f90c16-e7b0-4678-bd03-0eb1993ca785","participantType":"INDIVIDUAL"},{"participantId":"8fae7235-3f26-4e7b-95b8-94048186683f","participantType":"INDIVIDUAL"},{"participantId":"5f24f02b-bccd-4ff8-981b-677f28ea9f93","participantType":"PAIR"}],"partnerParticipantId":"09e8fd0b-a7f2-4053-8d11-33df910639c4","roundName":"R16","roundNumber":1,"roundPosition":6,"schedule":{},"structureName":"MAIN","winnerTo":{"matchUpId":"cdd04d5d-01a5-4698-ae22-8592417e1a2a","structureId":"6f4629ae-c2f0-460c-8c60-781bcae79187","schedule":{},"roundNumber":2,"roundPosition":3,"structureName":"MAIN"}}],"statistics":[{"statCode":"winRatio","numerator":0,"denominator":0,"statValue":0}],"scheduleConflicts":[{"priorScheduledMatchUpId":"2fa18511-5d50-4ae8-8a66-609cc4737e96","matchUpIdWithConflict":"96c69f86-9686-436c-803e-26ea7ddc1ab8"}]},{"participantId":"09e8fd0b-a7f2-4053-8d11-33df910639c4","participantType":"INDIVIDUAL","participantRole":"COMPETITOR","participantName":"Flavio Cobolli","person":{"addresses":[{"city":"Koloa","state":"MN","postalCode":"06246","countryCode":"TUN"}],"personId":"c7b4f678-c4fc-47de-81df-9966328281a1","standardFamilyName":"Cobolli","standardGivenName":"Flavio","nationalityCode":"TUN","extensions":[{"name":"regionCode","value":2}],"sex":"MALE"},"draws":[{"drawName":"SINGLE_ELIMINATION","drawType":"SINGLE_ELIMINATION","entryStage":"MAIN","entryStatus":"DIRECT_ACCEPTANCE","eventId":"2293081f-475a-4fe2-b774-35c65be3d38a","drawId":"6d8ffefb-c1c2-4211-856b-a508a36ed148"},{"drawName":"SINGLE_ELIMINATION","drawType":"SINGLE_ELIMINATION","entryStage":"MAIN","entryStatus":"DIRECT_ACCEPTANCE","eventId":"cd2c7d3e-f4c3-43df-8e06-ad8623c330cb","drawId":"4bcddbeb-8fea-4567-b321-5fbadb61e83f"}],"events":[{"eventId":"2293081f-475a-4fe2-b774-35c65be3d38a","eventName":"Generated Event","eventType":"SINGLES","entryStage":"MAIN","entryStatus":"DIRECT_ACCEPTANCE","drawIds":["6d8ffefb-c1c2-4211-856b-a508a36ed148"]},{"eventId":"cd2c7d3e-f4c3-43df-8e06-ad8623c330cb","eventName":"Generated Event","eventType":"DOUBLES","entryStage":"MAIN","entryStatus":"DIRECT_ACCEPTANCE","drawIds":["4bcddbeb-8fea-4567-b321-5fbadb61e83f"],"partnerParticipantId":"732cc1d0-4e8d-4575-a407-3e576dd5b395"}],"potentialMatchUps":[{"drawId":"6d8ffefb-c1c2-4211-856b-a508a36ed148","eventId":"2293081f-475a-4fe2-b774-35c65be3d38a","eventType":"SINGLES","matchUpId":"05c88ab4-920e-4e56-9c85-216c350f23a1","matchUpFormat":"SET3-S:6/TB7","roundName":"QF","roundNumber":2,"roundPosition":3,"schedule":{"time":"00:00:00","milliseconds":0,"scheduledDate":"2021-01-01","scheduledTime":"09:00","averageMinutes":90,"timeAfterRecovery":"11:30","typeChangeTimeAfterRecovery":"11:30","scheduleConflict":"793d3ea5-23bf-415b-bc0a-9afc8086c1b0"},"structureName":"MAIN","potential":true},{"drawId":"4bcddbeb-8fea-4567-b321-5fbadb61e83f","eventId":"cd2c7d3e-f4c3-43df-8e06-ad8623c330cb","eventType":"DOUBLES","matchUpId":"cdd04d5d-01a5-4698-ae22-8592417e1a2a","matchUpFormat":"SET3-S:6/TB7","roundName":"QF","roundNumber":2,"roundPosition":3,"schedule":{},"structureName":"MAIN","potential":true}],"matchUps":[{"drawId":"6d8ffefb-c1c2-4211-856b-a508a36ed148","eventId":"2293081f-475a-4fe2-b774-35c65be3d38a","eventType":"SINGLES","matchUpId":"793d3ea5-23bf-415b-bc0a-9afc8086c1b0","matchUpFormat":"SET3-S:6/TB7","matchUpStatus":"TO_BE_PLAYED","opponentParticipantInfo":[{"participantId":"6ed42edb-85e6-4d0a-ba99-7c4c3f1b2ce6","participantType":"INDIVIDUAL"}],"roundName":"R16","roundNumber":1,"roundPosition":6,"schedule":{"time":"00:00:00","milliseconds":0,"scheduledDate":"2021-01-01","scheduledTime":"08:00","averageMinutes":90,"timeAfterRecovery":"10:30","typeChangeTimeAfterRecovery":"10:30"},"structureName":"MAIN","winnerTo":{"matchUpId":"05c88ab4-920e-4e56-9c85-216c350f23a1","structureId":"9c543188-4134-4e4e-94eb-294cccfa3d64","schedule":{"time":"00:00:00","milliseconds":0,"scheduledDate":"2021-01-01","scheduledTime":"09:00","averageMinutes":90,"timeAfterRecovery":"11:30","typeChangeTimeAfterRecovery":"11:30","scheduleConflict":"793d3ea5-23bf-415b-bc0a-9afc8086c1b0"},"roundNumber":2,"roundPosition":3,"structureName":"MAIN"}},{"drawId":"4bcddbeb-8fea-4567-b321-5fbadb61e83f","eventId":"cd2c7d3e-f4c3-43df-8e06-ad8623c330cb","eventType":"DOUBLES","matchUpId":"86c7b7ec-f52e-4430-9335-e976874f7985","matchUpFormat":"SET3-S:6/TB7","matchUpStatus":"TO_BE_PLAYED","opponentParticipantInfo":[{"participantId":"d4f90c16-e7b0-4678-bd03-0eb1993ca785","participantType":"INDIVIDUAL"},{"participantId":"8fae7235-3f26-4e7b-95b8-94048186683f","participantType":"INDIVIDUAL"},{"participantId":"5f24f02b-bccd-4ff8-981b-677f28ea9f93","participantType":"PAIR"}],"partnerParticipantId":"732cc1d0-4e8d-4575-a407-3e576dd5b395","roundName":"R16","roundNumber":1,"roundPosition":6,"schedule":{},"structureName":"MAIN","winnerTo":{"matchUpId":"cdd04d5d-01a5-4698-ae22-8592417e1a2a","structureId":"6f4629ae-c2f0-460c-8c60-781bcae79187","schedule":{},"roundNumber":2,"roundPosition":3,"structureName":"MAIN"}}],"statistics":[{"statCode":"winRatio","numerator":0,"denominator":0,"statValue":0}],"scheduleConflicts":[{"priorScheduledMatchUpId":"793d3ea5-23bf-415b-bc0a-9afc8086c1b0","matchUpIdWithConflict":"05c88ab4-920e-4e56-9c85-216c350f23a1"}]}]'),c=JSON.parse('[{"date":"2020-01-01","startTime":"07:00","endTime":"19:00","bookings":[{"startTime":"07:00","endTime":"08:30","bookingType":"PRACTICE"},{"startTime":"08:30","endTime":"09:00","bookingType":"MAINTENANCE"},{"startTime":"13:30","endTime":"14:00","bookingType":"MAINTENANCE"}]}]'),s=JSON.parse('[{"scheduleDate":"2020-04-30","venues":[{"venueId":"a37dfa4f-e6a0-4ebd-bdbd-d22c8870bfd5","rounds":[{"tournamentId":"dbc5b3d2-c6ab-45d2-ae88-5f3745990647","eventId":"F75AEAA6-58FE-4310-A8EE-E3DFA373B206","drawId":"48f71377-e8dc-4af3-8b44-52a29efa6a1e","structureId":"11d05713-535f-4d4b-b52b-13a36398a9d9","id":"11d05713-535f-4d4b-b52b-13a36398a9d9-bdea1fe3-ab3b-4528-ab38-fbfd27469bc6","eventName":"U18 Girls Singles","notBeforeTime":"","roundName":"R32","roundNumber":1,"sortOrder":1},{"tournamentId":"dbc5b3d2-c6ab-45d2-ae88-5f3745990647","eventId":"F75AEAA6-58FE-4310-A8EE-E3DFA373B206","drawId":"48f71377-e8dc-4af3-8b44-52a29efa6a1e","structureId":"11d05713-535f-4d4b-b52b-13a36398a9d9","id":"11d05713-535f-4d4b-b52b-13a36398a9d9-16035215-ca57-4722-9de5-5af82c3b234c","eventName":"U18 Girls Singles","notBeforeTime":"","roundName":"R16","roundNumber":2,"sortOrder":2}]}]},{"scheduleDate":"2020-05-01","venues":[{"venueId":"a37dfa4f-e6a0-4ebd-bdbd-d22c8870bfd5","rounds":[{"tournamentId":"dbc5b3d2-c6ab-45d2-ae88-5f3745990647","eventId":"6F15E022-A6B7-4117-AA81-B3FE089FAD72","drawId":"01b5116e-b1d4-48b3-8b3f-8438a5350a59","structureId":"46a5aed3-2f11-4db4-83fb-9da5ffa6156e","roundNumber":1,"id":"46a5aed3-2f11-4db4-83fb-9da5ffa6156e-1c78036f-cd89-45d0-8d07-1c390580fdea","eventName":"U18 Boys Doubles","roundName":"E-R16"},{"tournamentId":"dbc5b3d2-c6ab-45d2-ae88-5f3745990647","eventId":"6F15E022-A6B7-4117-AA81-B3FE089FAD72","drawId":"01b5116e-b1d4-48b3-8b3f-8438a5350a59","structureId":"46a5aed3-2f11-4db4-83fb-9da5ffa6156e","roundNumber":2,"id":"46a5aed3-2f11-4db4-83fb-9da5ffa6156e-b3ff539e-8967-4fb9-b954-797b13546acb","eventName":"U18 Boys Doubles","roundName":"E-QF"}]}]}]'),l=JSON.parse('{"defaultTimes":{"averageTimes":[{"categoryNames":[],"minutes":{"default":90}}],"recoveryTimes":[{"minutes":{"DOUBLES":30,"default":60}}]},"defaultDailyLimits":{"SINGLES":2,"DOUBLES":2,"total":3},"matchUpAverageTimes":[{"matchUpFormatCodes":["SET3-S:6/TB7"],"averageTimes":[{"categoryTypes":["JUNIOR"],"minutes":{"default":97}},{"categoryTypes":["ADULT","WHEELCHAIR"],"minutes":{"default":120}}]},{"matchUpFormatCodes":["SET3-S:6/TB7-F:TB10"],"averageTimes":[{"categoryNames":[],"minutes":{"default":90}},{"categoryTypes":["ADULT"],"minutes":{"default":90}}]},{"matchUpFormatCodes":["SET3-S:6/TB7-F:TB7"],"averageTimes":[{"categoryNames":[],"minutes":{"default":70}}]},{"matchUpFormatCodes":["SET3-S:4/TB7"],"averageTimes":[{"categoryNames":[],"minutes":{"default":60}}]},{"matchUpFormatCodes":["SET3-S:4/TB7-F:TB7"],"averageTimes":[{"categoryNames":[],"minutes":{"default":55}}]},{"matchUpFormatCodes":["SET3-S:4/TB7-F:TB7"],"averageTimes":[{"categoryNames":[],"minutes":{"default":50}}]},{"matchUpFormatCodes":["SET3-S:4/TB5@3"],"averageTimes":[{"categoryNames":[],"minutes":{"default":45}}]},{"matchUpFormatCodes":["SET1-S:8/TB7"],"averageTimes":[{"categoryNames":[],"minutes":{"default":40}}]},{"matchUpFormatCodes":["SET1-S:6/TB7"],"averageTimes":[{"categoryNames":[],"minutes":{"default":30}}]},{"matchUpFormatCodes":["SET1-S:4/TB7","SET1-S:4/TB5@3","SET3-S:TB10","SET1-S:T20"],"averageTimes":[{"categoryNames":[],"minutes":{"default":20}}]},{"matchUpFormatCodes":["SET1-S:TB10"],"averageTimes":[{"categoryNames":[],"minutes":{"default":10}}]}],"matchUpRecoveryTimes":[{"matchUpFormatCodes":["SET3-S:6/TB7"],"recoveryTimes":[{"categoryNames":[],"minutes":{"default":60,"DOUBLES":30}}]},{"averageTimes":{"greaterThan":29,"lessThan":70},"recoveryTimes":[{"categoryNames":[],"minutes":{"default":30}}]},{"averageTimes":{"lessThan":30},"recoveryTimes":[{"categoryNames":[],"minutes":{"default":15,"DOUBLES":15}}]}],"matchUpDailyLimits":[{"matchUpFormatCodes":[],"limits":[{"categoryNames":[],"categoryTypes":[],"matchesCombinations":[{"SINGLES":{"default":2},"DOUBLES":{"default":1}},{"SINGLES":{"default":1},"DOUBLES":{"default":2}}],"sets":{"total":9,"SINGLES":6,"DOUBLES":9}}]},{"matchUpFormatCodes":["S3-S:TB10"],"limits":[{"categoryNames":["12U"],"matchesCombinations":[{"SINGLES":{"default":2}},{"SINGLES":{"default":1},"DOUBLES":{"default":2}},{"DOUBLES":{"default":3}}],"sets":{"total":9,"DOUBLES":9,"SINGLES":6}}]}]}'),p=["components"],m={title:"Scheduling"},u={unversionedId:"concepts/scheduling",id:"concepts/scheduling",isDocsHomePage:!1,title:"Scheduling",description:"Overview",source:"@site/docs/concepts/scheduling.mdx",sourceDirName:"concepts",slug:"/concepts/scheduling",permalink:"/tods-competition-factory/docs/concepts/scheduling",version:"current",frontMatter:{title:"Scheduling"},sidebar:"docs",previous:{title:"Feed Policy",permalink:"/tods-competition-factory/docs/policies/feedPolicy"},next:{title:"Scale Items",permalink:"/tods-competition-factory/docs/concepts/scaleItems"}},h=[{value:"Overview",id:"overview",children:[{value:"dateAvailability",id:"dateavailability",children:[]}]},{value:"Iterative Garman scheduling",id:"iterative-garman-scheduling",children:[]},{value:"schedulingProfile",id:"schedulingprofile",children:[{value:"Example",id:"example",children:[]}]},{value:"Scheduling policy",id:"scheduling-policy",children:[]},{value:"Overriding policies",id:"overriding-policies",children:[]},{value:"Automated Scheduling",id:"automated-scheduling",children:[{value:"Pseudocode",id:"pseudocode",children:[]}]},{value:"Schedule Conflict Reporting",id:"schedule-conflict-reporting",children:[{value:"Example participants with schedule conflicts",id:"example-participants-with-schedule-conflicts",children:[]}]}],f={toc:h};function b(e){var t=e.components,a=(0,i.Z)(e,p);return(0,d.kt)("wrapper",(0,n.Z)({},f,a,{components:t,mdxType:"MDXLayout"}),(0,d.kt)("h2",{id:"overview"},"Overview"),(0,d.kt)("p",null,"Scheduling is the process of assigning ",(0,d.kt)("strong",{parentName:"p"},"dates"),", ",(0,d.kt)("strong",{parentName:"p"},"venues"),", ",(0,d.kt)("strong",{parentName:"p"},"courts")," and ",(0,d.kt)("strong",{parentName:"p"},"times")," to tournament ",(0,d.kt)("inlineCode",{parentName:"p"},"matchUps"),"."),(0,d.kt)("p",null,"In TODS, scheduling information is attached to ",(0,d.kt)("inlineCode",{parentName:"p"},"matchUps")," as ",(0,d.kt)("inlineCode",{parentName:"p"},"timeItems")," and the schedule is derived by interrogating the scheduling information attached to ",(0,d.kt)("inlineCode",{parentName:"p"},"matchUps"),".\nThis approach means that there is no master schedule object; it also means that when ",(0,d.kt)("inlineCode",{parentName:"p"},"drawDefinitions")," or draw ",(0,d.kt)("inlineCode",{parentName:"p"},"structures")," are removed there is no schedule to be cleared."),(0,d.kt)("p",null,"In the Competition Factory, scheduling is accomplished either direclty via scheduling methods such as ",(0,d.kt)("inlineCode",{parentName:"p"},"addMatchUpScheduledDate"),", or automatically via ",(0,d.kt)("inlineCode",{parentName:"p"},"scheduleMatchUps")," or ",(0,d.kt)("inlineCode",{parentName:"p"},"scheduleProfileRounds"),"."),(0,d.kt)("p",null,"Automated scheduling, along with direct assignment of venues and courts, depends on having venues with courts which have defined ",(0,d.kt)("inlineCode",{parentName:"p"},"dateAvailability"),"."),(0,d.kt)("h3",{id:"dateavailability"},"dateAvailability"),(0,d.kt)("p",null,"A ",(0,d.kt)("inlineCode",{parentName:"p"},"dateAvailability")," definition is an array of objects which define a ",(0,d.kt)("inlineCode",{parentName:"p"},"startTime")," and ",(0,d.kt)("inlineCode",{parentName:"p"},"endTime")," for court availability."),(0,d.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,d.kt)("div",{parentName:"div",className:"admonition-heading"},(0,d.kt)("h5",{parentName:"div"},(0,d.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,d.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,d.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,d.kt)("div",{parentName:"div",className:"admonition-content"},(0,d.kt)("p",{parentName:"div"},"When no date is specified in a ",(0,d.kt)("inlineCode",{parentName:"p"},"dateAvailability")," object the ",(0,d.kt)("inlineCode",{parentName:"p"},"startTime")," and ",(0,d.kt)("inlineCode",{parentName:"p"},"endTime")," apply to all valid tournament dates; defining a ",(0,d.kt)("inlineCode",{parentName:"p"},"date")," attribute scopes the\ndefinition to a specific date."))),(0,d.kt)("p",null,(0,d.kt)("inlineCode",{parentName:"p"},"dateAvailability")," definitions can also contain an array of ",(0,d.kt)("inlineCode",{parentName:"p"},"bookings")," objects which makes courts unavailable to auto-scheduling\nfunctions during specified blocks of time."),(0,d.kt)(r.Z,{data:c,root:"dateAvailability",colorScheme:"summerfruit",invertTheme:!0,expandRoot:!0,expandToLevel:2,mdxType:"RenderJSON"}),(0,d.kt)("h2",{id:"iterative-garman-scheduling"},"Iterative Garman scheduling"),(0,d.kt)("p",null,"The ",(0,d.kt)("inlineCode",{parentName:"p"},"competitionEngine")," supports Garman scheduling of ",(0,d.kt)("inlineCode",{parentName:"p"},"matchUps")," from multiple tournaments across shared ",(0,d.kt)("inlineCode",{parentName:"p"},"venues"),"."),(0,d.kt)("p",null,"The Garman formula calculates the times at which ",(0,d.kt)("inlineCode",{parentName:"p"},"matchUps")," may be scheduled, taking into consideration court availability\nand average minutes per match, but it does not inherently support the ",(0,d.kt)("strong",{parentName:"p"},"average minutes")," per ",(0,d.kt)("inlineCode",{parentName:"p"},"matchUp")," being ",(0,d.kt)("strong",{parentName:"p"},(0,d.kt)("em",{parentName:"strong"},"different")),"\nacross blocks of ",(0,d.kt)("inlineCode",{parentName:"p"},"matchUps"),"."),(0,d.kt)("h2",{id:"schedulingprofile"},"schedulingProfile"),(0,d.kt)("p",null,"To support the use of the Garman formula for scheduling ",(0,d.kt)("inlineCode",{parentName:"p"},"matchUps")," from different events,\n",(0,d.kt)("inlineCode",{parentName:"p"},"competitionEngine")," makes use of a ",(0,d.kt)("inlineCode",{parentName:"p"},"schedulingProfile")," to define the order of ",(0,d.kt)("inlineCode",{parentName:"p"},"rounds")," of structures within ",(0,d.kt)("inlineCode",{parentName:"p"},"drawDefinitions"),"\nto be scheduled on specific days, and then iteratively calls the Garman formula."),(0,d.kt)("p",null,"The ",(0,d.kt)("inlineCode",{parentName:"p"},"schedulingProfile")," is an array of profiles for the ",(0,d.kt)("inlineCode",{parentName:"p"},"scheduleDates")," to be scheduled; it is stored as an ",(0,d.kt)("inlineCode",{parentName:"p"},"extension")," attached to the tournament record.\n",(0,d.kt)("inlineCode",{parentName:"p"},"competitionEngine")," provides convenience methods for creating and manipulting the ",(0,d.kt)("inlineCode",{parentName:"p"},"schedulingProfile"),", or it can be generated externally and attached\nvia ",(0,d.kt)("inlineCode",{parentName:"p"},"setSchedulingProfile()"),"."),(0,d.kt)("p",null,"Each ",(0,d.kt)("inlineCode",{parentName:"p"},"scheduleDate")," profile object must include the attributes ",(0,d.kt)("inlineCode",{parentName:"p"},"{ scheduleDate, venues }"),", and the ",(0,d.kt)("inlineCode",{parentName:"p"},"venues")," attribute must be an array of venue profile objects\nwhich include the attributes ",(0,d.kt)("inlineCode",{parentName:"p"},"{ venueId, rounds }"),", where ",(0,d.kt)("inlineCode",{parentName:"p"},"rounds")," is an array of objects with the following attributes:"),(0,d.kt)("pre",null,(0,d.kt)("code",{parentName:"pre",className:"language-js"},"[\n  {\n    // required\n    tournamentId,\n    eventId,\n    drawId,\n    structureId,\n    roundNumber,\n\n    //optional\n    notBeforeTime, // optional - 'HH:MM' timeString - TO BE IMPLEMENTED\n    roundSegment: {\n      segmentNumber, // segment which is to be scheduled\n      segmentsCount, // number of segments in a round\n    },\n  },\n];\n")),(0,d.kt)("h3",{id:"example"},"Example"),(0,d.kt)("p",null,"In this example additional attributes have been added by the client applications for display purposes.\nThey are not required for automated scheduling to function."),(0,d.kt)(r.Z,{data:s,root:"schedulingProfile",colorScheme:"summerfruit",invertTheme:!0,mdxType:"RenderJSON"}),(0,d.kt)("h2",{id:"scheduling-policy"},"Scheduling policy"),(0,d.kt)("p",null,'A "Scheduling Policy" defines the average matchUp times and mandated recovery times for each ',(0,d.kt)("inlineCode",{parentName:"p"},"matchUpFormat"),",\nand sets limits on the number of matchUps that may be played per-player per-day."),(0,d.kt)(r.Z,{data:l,root:"scheduling",colorScheme:"summerfruit",invertTheme:!0,mdxType:"RenderJSON"}),(0,d.kt)("h2",{id:"overriding-policies"},"Overriding policies"),(0,d.kt)("p",null,"Average ",(0,d.kt)("inlineCode",{parentName:"p"},"matchUpFormat")," times and recovery times can be defined, or established policies can be overridden"),(0,d.kt)("pre",null,(0,d.kt)("code",{parentName:"pre",className:"language-js"},"// set averageTimes for a specific matchUpFormat\ncompetitionEngine.modifyMatchUpFormatTiming({\n  matchUpFormat: 'SET3-S:6/TB7',\n  averageTimes: [\n    {\n      categoryNames: ['U12', 'U14'],\n      minutes: { ['DOUBLES']: 110, default: 130 },\n    },\n    {\n      categoryNames: ['U16', 'U18'],\n      minutes: { ['DOUBLES']: 100, default: 120 },\n    },\n  ],\n  recoveryTimes: [\n    { categoryNames: [], minutes: { default: 15, ['DOUBLES']: 15 } },\n  ],\n});\n\n// set dailyLimits\ncompetitionEngine.setMatchUpDailyLimits({\n  dailyLimits: { SINGLES: 2, DOUBLES: 1, total: 3 },\n});\n")),(0,d.kt)("h2",{id:"automated-scheduling"},"Automated Scheduling"),(0,d.kt)("p",null,"Once the ",(0,d.kt)("inlineCode",{parentName:"p"},"schedulingProfile"),", ",(0,d.kt)("inlineCode",{parentName:"p"},"matchUpFormatTiming")," and ",(0,d.kt)("inlineCode",{parentName:"p"},"dailyLimits")," have been defined, automated assignment of ",(0,d.kt)("strong",{parentName:"p"},"scheduleTimes")," to ",(0,d.kt)("inlineCode",{parentName:"p"},"matchUps")," is straightforward."),(0,d.kt)("pre",null,(0,d.kt)("code",{parentName:"pre",className:"language-js"},"competitionEngine.scheduleProfileRounds({\n  scheduleDates, // optional array of dates to be scheduled\n});\n")),(0,d.kt)("h3",{id:"pseudocode"},"Pseudocode"),(0,d.kt)("p",null,"The highest level auto-scheduling method is ",(0,d.kt)("inlineCode",{parentName:"p"},"competitionEngine.scheduleProfileRounds"),"."),(0,d.kt)("ol",null,(0,d.kt)("li",{parentName:"ol"},"Get an array of ",(0,d.kt)("strong",{parentName:"li"},"inContext")," ",(0,d.kt)("inlineCode",{parentName:"li"},"matchUps")," for all relevant ",(0,d.kt)("inlineCode",{parentName:"li"},"tournamentRecords")),(0,d.kt)("li",{parentName:"ol"},"Validate and filter ",(0,d.kt)("inlineCode",{parentName:"li"},"schedulingProfile")," dates by specified ",(0,d.kt)("inlineCode",{parentName:"li"},"scheduleDates")),(0,d.kt)("li",{parentName:"ol"},"Construct hash tables of ",(0,d.kt)("inlineCode",{parentName:"li"},"matchUpNotBeforeTimes")," and ",(0,d.kt)("inlineCode",{parentName:"li"},"matchUpPotentialParticipantIds")),(0,d.kt)("li",{parentName:"ol"},"Iterate through venues for current ",(0,d.kt)("inlineCode",{parentName:"li"},"scheduleDate")),(0,d.kt)("li",{parentName:"ol"},"Ensure ",(0,d.kt)("inlineCode",{parentName:"li"},"rounds")," specified for ",(0,d.kt)("inlineCode",{parentName:"li"},"scheduleDate")," are sorted as specified"),(0,d.kt)("li",{parentName:"ol"},"Generate ordered array of ",(0,d.kt)("inlineCode",{parentName:"li"},"matchUpIds")," derived from specified ",(0,d.kt)("inlineCode",{parentName:"li"},"rounds")),(0,d.kt)("li",{parentName:"ol"},"Build up a mapping of ",(0,d.kt)("inlineCode",{parentName:"li"},"matchUpIds")," to ",(0,d.kt)("inlineCode",{parentName:"li"},"recoveryMinutes")," so that ",(0,d.kt)("inlineCode",{parentName:"li"},"matchUps")," with equivalent ",(0,d.kt)("inlineCode",{parentName:"li"},"averageMatchUpMinutes"),"\ncan be block scheduled while still considering varying ",(0,d.kt)("inlineCode",{parentName:"li"},"recoveryMinutes")),(0,d.kt)("li",{parentName:"ol"},"Group ordered ",(0,d.kt)("inlineCode",{parentName:"li"},"matchUpIds")," by ",(0,d.kt)("strong",{parentName:"li"},"averageMatchUpMinutes|periodLength")),(0,d.kt)("li",{parentName:"ol"},"Loop through groups of ",(0,d.kt)("inlineCode",{parentName:"li"},"matchUpIds")," ..."),(0,d.kt)("li",{parentName:"ol"},"Calculate available scheduleTimes, considering court availability, already scheduled matchUps, and ",(0,d.kt)("inlineCode",{parentName:"li"},"remainingScheduleTimes")," from previous iteration"),(0,d.kt)("li",{parentName:"ol"},"Construct per-participant hash tables of ",(0,d.kt)("inlineCode",{parentName:"li"},"matchUps")," played and ",(0,d.kt)("inlineCode",{parentName:"li"},"timeAfterRecovery")),(0,d.kt)("li",{parentName:"ol"},"Filter out ",(0,d.kt)("inlineCode",{parentName:"li"},"matchUps")," which are not appropriate for scheduling"),(0,d.kt)("li",{parentName:"ol"},"Filter out ",(0,d.kt)("inlineCode",{parentName:"li"},"matchUps")," which include participants who have reached daily limits"),(0,d.kt)("li",{parentName:"ol"},"Loop through available ",(0,d.kt)("inlineCode",{parentName:"li"},"scheduleTimes")," and build up mapping of ",(0,d.kt)("inlineCode",{parentName:"li"},"matchUpIds")," to ",(0,d.kt)("inlineCode",{parentName:"li"},"scheduleTimes"),(0,d.kt)("ul",{parentName:"li"},(0,d.kt)("li",{parentName:"ul"},"Defer scheduling of matchUps where ",(0,d.kt)("inlineCode",{parentName:"li"},"timeAfterRecovery")," has not been reached"),(0,d.kt)("li",{parentName:"ul"},"Defer scheduling of matchUps where ",(0,d.kt)("inlineCode",{parentName:"li"},"personRequests")," include ",(0,d.kt)("inlineCode",{parentName:"li"},"{ requestType: DO_NO_SCHEDULE }")," conflicts"))),(0,d.kt)("li",{parentName:"ol"},"Group ",(0,d.kt)("inlineCode",{parentName:"li"},"matchUpIds")," by ",(0,d.kt)("strong",{parentName:"li"},"eventId|drawId|structureId")," and assign ",(0,d.kt)("inlineCode",{parentName:"li"},"scheduleTimes")," to ",(0,d.kt)("inlineCode",{parentName:"li"},"matchUps")),(0,d.kt)("li",{parentName:"ol"},"Return array of ",(0,d.kt)("inlineCode",{parentName:"li"},"remainingScheduleTimes")," from current iteration to seed next iteration of virtualCourtBookings")),(0,d.kt)("h2",{id:"schedule-conflict-reporting"},"Schedule Conflict Reporting"),(0,d.kt)("p",null,"Schedule Conflicts are reported for participants that are returned from ",(0,d.kt)("inlineCode",{parentName:"p"},"tournamentEngine.getTournamentParticipants"),"\nor ",(0,d.kt)("inlineCode",{parentName:"p"},"competitionEngine.getCompetitionParticipants"),"."),(0,d.kt)("p",null,"The attribute ",(0,d.kt)("inlineCode",{parentName:"p"},"scheduleConflicts")," is an array of objects containing pairs of ",(0,d.kt)("inlineCode",{parentName:"p"},"matchUpIds"),"\nthat have been scheduled at times that conflict with each other based on either the ",(0,d.kt)("strong",{parentName:"p"},"scheduling policy"),"\nthat is in force, or a specified ",(0,d.kt)("inlineCode",{parentName:"p"},"scheduledMinutesDifference"),", which overrides the default behavior."),(0,d.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,d.kt)("div",{parentName:"div",className:"admonition-heading"},(0,d.kt)("h5",{parentName:"div"},(0,d.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,d.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,d.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,d.kt)("div",{parentName:"div",className:"admonition-content"},(0,d.kt)("p",{parentName:"div"},(0,d.kt)("inlineCode",{parentName:"p"},"matchUpIds")," in the ",(0,d.kt)("inlineCode",{parentName:"p"},"scheduleConflicts")," array may refer to either a participant's ",(0,d.kt)("inlineCode",{parentName:"p"},"matchUps")," or their ",(0,d.kt)("inlineCode",{parentName:"p"},"potentialMatchUps")," which are defined as those ",(0,d.kt)("inlineCode",{parentName:"p"},"matchUps"),"\nin which they will appear if they either win or lose ",(0,d.kt)("inlineCode",{parentName:"p"},"matchUps")," in which they are already present."))),(0,d.kt)("p",null,"A ",(0,d.kt)("strong",{parentName:"p"},"scheduling policy")," defines average match times for different scoring formats as well as recovery times between ",(0,d.kt)("strong",{parentName:"p"},(0,d.kt)("em",{parentName:"strong"},"matchUpTypes")),".\nA conflict occurs when a matchUp's ",(0,d.kt)("inlineCode",{parentName:"p"},"scheduledTime + averageMinutes + recoveryMinutes"),", or ",(0,d.kt)("inlineCode",{parentName:"p"},"endTime + recoveryMinutes")," (if available) is greater than the ",(0,d.kt)("inlineCode",{parentName:"p"},"scheduledTime")," of any other participant ",(0,d.kt)("inlineCode",{parentName:"p"},"matchUp"),"."),(0,d.kt)("pre",null,(0,d.kt)("code",{parentName:"pre",className:"language-js"},"const {\n  tournamentParticipants,\n  participantIdsWithConflicts, // array of participantIds which have scheduling conflicts\n} = tournamentEngine.getTournamentParticipants({\n  inContext: true,\n\n  scheduleAnalysis: {\n    scheduledMinutesDifference: 60, // optional - scheduling conflicts determined by scheduledTime difference between matchUps\n  },\n  withStatistics,\n  withOpponents,\n  withMatchUps,\n});\n")),(0,d.kt)("h3",{id:"example-participants-with-schedule-conflicts"},"Example participants with schedule conflicts"),(0,d.kt)(r.Z,{data:o,root:"tournamentParticipants",colorScheme:"summerfruit",invertTheme:!0,expandRoot:!0,expandToLevel:1,mdxType:"RenderJSON"}))}b.isMDXComponent=!0}}]);