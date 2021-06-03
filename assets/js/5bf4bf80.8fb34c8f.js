(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[199],{3905:function(e,n,t){"use strict";t.d(n,{Zo:function(){return d},kt:function(){return m}});var i=t(7294);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);n&&(i=i.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,i)}return t}function r(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,i,a=function(e,n){if(null==e)return{};var t,i,a={},o=Object.keys(e);for(i=0;i<o.length;i++)t=o[i],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(i=0;i<o.length;i++)t=o[i],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var c=i.createContext({}),s=function(e){var n=i.useContext(c),t=n;return e&&(t="function"==typeof e?e(n):r(r({},n),e)),t},d=function(e){var n=s(e.components);return i.createElement(c.Provider,{value:n},e.children)},u={inlineCode:"code",wrapper:function(e){var n=e.children;return i.createElement(i.Fragment,{},n)}},p=i.forwardRef((function(e,n){var t=e.components,a=e.mdxType,o=e.originalType,c=e.parentName,d=l(e,["components","mdxType","originalType","parentName"]),p=s(t),m=a,h=p["".concat(c,".").concat(m)]||p[m]||u[m]||o;return t?i.createElement(h,r(r({ref:n},d),{},{components:t})):i.createElement(h,r({ref:n},d))}));function m(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var o=t.length,r=new Array(o);r[0]=p;var l={};for(var c in n)hasOwnProperty.call(n,c)&&(l[c]=n[c]);l.originalType=e,l.mdxType="string"==typeof e?e:a,r[1]=l;for(var s=2;s<o;s++)r[s]=t[s];return i.createElement.apply(null,r)}return i.createElement.apply(null,t)}p.displayName="MDXCreateElement"},7349:function(e,n,t){"use strict";t.r(n),t.d(n,{frontMatter:function(){return l},metadata:function(){return c},toc:function(){return s},default:function(){return u}});var i=t(2122),a=t(9756),o=(t(7294),t(3905)),r=["components"],l={name:"API",title:"Competition Engine API"},c={unversionedId:"apis/competition-engine-api",id:"apis/competition-engine-api",isDocsHomePage:!1,title:"Competition Engine API",description:"addExtension",source:"@site/docs/apis/competition-engine-api.md",sourceDirName:"apis",slug:"/apis/competition-engine-api",permalink:"/tods-competition-factory/docs/apis/competition-engine-api",version:"current",frontMatter:{name:"API",title:"Competition Engine API"},sidebar:"docs",previous:{title:"Advanced Scheduling",permalink:"/tods-competition-factory/docs/pseudocode/scheduling"},next:{title:"Tournament Engine API",permalink:"/tods-competition-factory/docs/apis/tournament-engine-api"}},s=[{value:"addExtension",id:"addextension",children:[]},{value:"addSchedulingProfileRound",id:"addschedulingprofileround",children:[]},{value:"allCompetitionMatchUps",id:"allcompetitionmatchups",children:[]},{value:"attachPolicy",id:"attachpolicy",children:[]},{value:"calculateScheduleTimes",id:"calculatescheduletimes",children:[]},{value:"competitionMatchUps",id:"competitionmatchups",children:[]},{value:"competitionScheduleMatchUps",id:"competitionschedulematchups",children:[]},{value:"devContext",id:"devcontext",children:[]},{value:"findExtension",id:"findextension",children:[]},{value:"getCompetitionDateRange",id:"getcompetitiondaterange",children:[]},{value:"getCompetitionVenues",id:"getcompetitionvenues",children:[]},{value:"getLinkedTournamentIds",id:"getlinkedtournamentids",children:[]},{value:"getMatchUpDailyLimits",id:"getmatchupdailylimits",children:[]},{value:"getState",id:"getstate",children:[]},{value:"getSchedulingProfile",id:"getschedulingprofile",children:[]},{value:"getVenuesAndCourts",id:"getvenuesandcourts",children:[]},{value:"isValidSchedulingProfile",id:"isvalidschedulingprofile",children:[]},{value:"linkTournaments",id:"linktournaments",children:[]},{value:"matchUpActions",id:"matchupactions",children:[]},{value:"matchUpScheduleChange",id:"matchupschedulechange",children:[]},{value:"removeExtension",id:"removeextension",children:[]},{value:"removeMatchUpCourtAssignment",id:"removematchupcourtassignment",children:[]},{value:"removeTournamentRecord",id:"removetournamentrecord",children:[]},{value:"removeUnlinkedTournamentRecords",id:"removeunlinkedtournamentrecords",children:[]},{value:"reorderUpcomingMatchUps",id:"reorderupcomingmatchups",children:[]},{value:"scheduleMatchUps",id:"schedulematchups",children:[]},{value:"scheduleProfileRounds",id:"scheduleprofilerounds",children:[]},{value:"setState",id:"setstate",children:[]},{value:"setSchedulingProfile",id:"setschedulingprofile",children:[]},{value:"setTournamentRecord",id:"settournamentrecord",children:[]},{value:"setSubscriptions",id:"setsubscriptions",children:[]},{value:"toggleParticipantCheckInState",id:"toggleparticipantcheckinstate",children:[]},{value:"unlinkTournament",id:"unlinktournament",children:[]},{value:"unlinkTournaments",id:"unlinktournaments",children:[]},{value:"version",id:"version",children:[]}],d={toc:s};function u(e){var n=e.components,t=(0,a.Z)(e,r);return(0,o.kt)("wrapper",(0,i.Z)({},d,t,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"addextension"},"addExtension"),(0,o.kt)("p",null,"Adds an extension to all ",(0,o.kt)("inlineCode",{parentName:"p"},"tournamentRecords")," loaded into ",(0,o.kt)("inlineCode",{parentName:"p"},"competitionEngine"),"."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"competitionEngine.addExtension({ extension });\n")),(0,o.kt)("hr",null),(0,o.kt)("h2",{id:"addschedulingprofileround"},"addSchedulingProfileRound"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"competitionEngine.addSchedulingProfileRound({\n  scheduleDate, // string date, e.g. '2022-01-01' or '2022-01-01T00:00'\n  venueId, // id of the venue to which the round has been assigned\n  round, // details of a round to be played on specified date\n});\n")),(0,o.kt)("hr",null),(0,o.kt)("h2",{id:"allcompetitionmatchups"},"allCompetitionMatchUps"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"const { matchUps } = competitionEngine.allCompetitionMatchUps({\n  scheduleVisibilityFilters,\n});\n")),(0,o.kt)("hr",null),(0,o.kt)("h2",{id:"attachpolicy"},"attachPolicy"),(0,o.kt)("p",null,"Attaches a ",(0,o.kt)("inlineCode",{parentName:"p"},"policyDefinition")," to all tournamentRecords currently loaded into ",(0,o.kt)("inlineCode",{parentName:"p"},"competitionEngine"),"."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"competitionEngine.attachPolicy({ policyDefinition });\n")),(0,o.kt)("hr",null),(0,o.kt)("h2",{id:"calculatescheduletimes"},"calculateScheduleTimes"),(0,o.kt)("p",null,"Returns an array of available schedule times for a given date (and optional time range)."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"const { scheduleTimes } = competitionEngine.calculateScheduleTimes({\n  date,\n\n  startTime, // optional - if not provided will be derived from court availability for the tiven date\n  endTime, // optional - if not provided will be derived from court availability for the tiven date\n\n  averageMatchUpMinutes = 90, // optional - defualts to 90\n  periodLength = 30, // optional - defualts to 30\n\n  venueIds, // optional - restrict calculation to specified venueIds\n});\n")),(0,o.kt)("hr",null),(0,o.kt)("h2",{id:"competitionmatchups"},"competitionMatchUps"),(0,o.kt)("p",null,'Returns aggregated arrays of "inContext" matchUps for all tournamentRecords loaded into ',(0,o.kt)("inlineCode",{parentName:"p"},"competitionEngine"),"."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"const {\n  byeMatchUps,\n  abandonedMatchUps,\n  completedMatchUps,\n  pendingMatchUps,\n  upcomingMatchUps,\n} = competitionEngine.competitionMatchUps({\n  scheduleVisibilityFilters,\n});\n")),(0,o.kt)("hr",null),(0,o.kt)("h2",{id:"competitionschedulematchups"},"competitionScheduleMatchUps"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"const matchUpFilters = {\n  isMatchUpTie: false,\n  scheduledDate, // scheduled date of matchUps to return\n\n  localTimeZone, // optional - used to convert scheduleDate\n  localPerspective: true,\n};\n\nconst { completedMatchUps, dateMatchUps, courtsData, venues } =\n  competitionEngine.competitionScheduleMatchUps({\n    matchUpFilters,\n    sortCourtsData, // boolean - optional\n    sortDateMatchUps, // boolean - optional - defaults to `true`\n  });\n")),(0,o.kt)("hr",null),(0,o.kt)("h2",{id:"devcontext"},"devContext"),(0,o.kt)("p",null,"Setting devContext(true) bypasses ",(0,o.kt)("strong",{parentName:"p"},"try {} catch (err) {}")," code block and in some cases enables enhanced logging"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"competitionEngine.devContext(true);\n")),(0,o.kt)("hr",null),(0,o.kt)("h2",{id:"findextension"},"findExtension"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"const { extension } = competitionEngine.findExtension({ name });\n")),(0,o.kt)("hr",null),(0,o.kt)("h2",{id:"getcompetitiondaterange"},"getCompetitionDateRange"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"const { startDate, endDate } = competitionEngine.getCompetitionDateRange();\n")),(0,o.kt)("hr",null),(0,o.kt)("h2",{id:"getcompetitionvenues"},"getCompetitionVenues"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"const { venues, venueIds } = competitionEngine.getCompetitionVenues();\n")),(0,o.kt)("hr",null),(0,o.kt)("h2",{id:"getlinkedtournamentids"},"getLinkedTournamentIds"),(0,o.kt)("p",null,"Returns ",(0,o.kt)("inlineCode",{parentName:"p"},"linkedTournamentIds")," for each tournamentRecord loaded in ",(0,o.kt)("inlineCode",{parentName:"p"},"compeitionEngine"),"."),(0,o.kt)("p",null,'Caters for the possibility that, for instance, two "linked" tournaments and one "unlinked" tournament could be loaded.'),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"const { linkedTournamentIds } = competitionEngine.getLinkedTournamentIds();\n/*\n{\n  'tournamentId-1': ['tournamentId-2', 'tournamentId-3'],\n  'tournamentId-2': ['tournamentId-1', 'touranmentId-3'],\n  'tournamentId-3': ['tournamentId-1', 'tournamentId-2']\n}\n*/\n")),(0,o.kt)("hr",null),(0,o.kt)("h2",{id:"getmatchupdailylimits"},"getMatchUpDailyLimits"),(0,o.kt)("p",null,"Returns player daily match limits for singles/doubles/total matches."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"const { matchUpDailyLimits } = competitionEngine.getMatchUpDailyLimits({\n  tournamentId, // optional - scope search to specific tournamentRecord\n});\nconst { DOUBLES, SINGLES, total } = matchUpDailyLimits;\n")),(0,o.kt)("hr",null),(0,o.kt)("h2",{id:"getstate"},"getState"),(0,o.kt)("p",null,"Returns a deep copy of the current competitionEngine state."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"const { tournaentRecords } = competition.getState({\n  convertExtensions, // optional - convert extensions to '_' prefixed attributes\n});\n")),(0,o.kt)("hr",null),(0,o.kt)("h2",{id:"getschedulingprofile"},"getSchedulingProfile"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"const { schedulingProfile } = competitionEngine.getSchedulingProfile();\n")),(0,o.kt)("hr",null),(0,o.kt)("h2",{id:"getvenuesandcourts"},"getVenuesAndCourts"),(0,o.kt)("p",null,"Returns an aggregate view of venues and courts across all tournamentRecords loaded into ",(0,o.kt)("inlineCode",{parentName:"p"},"competitionEngine"),"."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"const { courts, venues } = competitionEngine.getVenuesAndCourts();\n")),(0,o.kt)("hr",null),(0,o.kt)("h2",{id:"isvalidschedulingprofile"},"isValidSchedulingProfile"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"const isValid = competitionEngine.isValidSchedulingProfile({\n  schedulingProfile,\n});\n")),(0,o.kt)("hr",null),(0,o.kt)("h2",{id:"linktournaments"},"linkTournaments"),(0,o.kt)("p",null,"Links all tournaments currently loaded in ",(0,o.kt)("inlineCode",{parentName:"p"},"competitionEngine"),"."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"competitionEngine.linkTournaments();\n")),(0,o.kt)("hr",null),(0,o.kt)("h2",{id:"matchupactions"},"matchUpActions"),(0,o.kt)("p",null,"Convenience pass through to ",(0,o.kt)("inlineCode",{parentName:"p"},"tournamentEngine.matchUpActions")," for use in contexts where multiple tournamentRecords are loaded into ",(0,o.kt)("inlineCode",{parentName:"p"},"competitionEngine"),"."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"const { matchUpActions } = competitionEngine.matchUpActions({\n  tournamentId,\n  eventId,\n  drawId,\n  matchUpId,\n});\n")),(0,o.kt)("hr",null),(0,o.kt)("h2",{id:"matchupschedulechange"},"matchUpScheduleChange"),(0,o.kt)("p",null,"Swaps the schedule details of two scheduled matchUps."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"competitionEngine.matchUpScheduleChange({\n  sourceMatchUpContextIds,\n  targetMatchUpContextIds,\n  sourceCourtId,\n  targetCourtId,\n  courtDayDate: dateSelected,\n});\n")),(0,o.kt)("hr",null),(0,o.kt)("h2",{id:"removeextension"},"removeExtension"),(0,o.kt)("p",null,"Removes an extension from all ",(0,o.kt)("inlineCode",{parentName:"p"},"tournamentRecords")," loaded into ",(0,o.kt)("inlineCode",{parentName:"p"},"competitionEngine"),"."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"competitionEngine.removeExtension({ name });\n")),(0,o.kt)("hr",null),(0,o.kt)("h2",{id:"removematchupcourtassignment"},"removeMatchUpCourtAssignment"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"competitionEngine.removeMatchUpCourtAssignment({\n  drawId,\n  matchUpId,\n  tournamentId,\n  courtDayDate,\n});\n")),(0,o.kt)("hr",null),(0,o.kt)("h2",{id:"removetournamentrecord"},"removeTournamentRecord"),(0,o.kt)("p",null,"Removes a tournamentRecord from ",(0,o.kt)("inlineCode",{parentName:"p"},"competitionEngine")," state."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"competitionEngine.removeTournamentRecord(tournamentId);\n")),(0,o.kt)("hr",null),(0,o.kt)("h2",{id:"removeunlinkedtournamentrecords"},"removeUnlinkedTournamentRecords"),(0,o.kt)("p",null,"Removes all tournamentRecords from ",(0,o.kt)("inlineCode",{parentName:"p"},"competitionEngine")," state that are unlinked."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"competitionEngine.removeUnlinkedTournamentRecords();\n")),(0,o.kt)("hr",null),(0,o.kt)("h2",{id:"reorderupcomingmatchups"},"reorderUpcomingMatchUps"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"const matchUpContextIds = [{ tournamentId, drawId, matchUpId }];\ncompetitionEngine.reorderUpcomingMatchUps({\n  matchUpContextIds,\n  firstToLast, // boolean - direction of reorder\n});\n")),(0,o.kt)("hr",null),(0,o.kt)("h2",{id:"schedulematchups"},"scheduleMatchUps"),(0,o.kt)("p",null,"Auto schedule matchUps on a given date using the Garman formula."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"competitionEngine.scheduleMatchUps({\n  date,\n  startTime, // optional - if not provided will be derived from court availability for the tiven date\n  endTime, // optional - if not provided will be derived from court availability for the tiven date\n\n  venueIds, // optional - defaults to all known; if a single venueId is provided then all matchUps will be scheduled for that venue\n\n  matchUpIds, // array of matchUpIds; if no schedulingProfile provided will be auto-sorted by draw size and roundNumbers\n\n  periodLength = 30, // optional - defaults to 30\n  averageMatchUpMinutes = 90, // optional - defaults to 90\n});\n")),(0,o.kt)("hr",null),(0,o.kt)("h2",{id:"scheduleprofilerounds"},"scheduleProfileRounds"),(0,o.kt)("p",null,"Auto-schedules all rounds which have been specified in a ",(0,o.kt)("inlineCode",{parentName:"p"},"schedulingProfile")," which has been saved to the tournamentRecord using ",(0,o.kt)("inlineCode",{parentName:"p"},"competitionEngine.setSchedulingProfile"),"."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"competitionEngine.scheduleProfileRounds({\n  scheduleDates, // optional array of dates to schedule\n});\n")),(0,o.kt)("hr",null),(0,o.kt)("h2",{id:"setstate"},"setState"),(0,o.kt)("p",null,"Loads tournament records into competitionEngine; supports both an array of tournamentRecords and an object with tournamentId keys."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"const tournamentRecords = [tournamentRecord];\n// or const tournamentRecords = { [tournamentId]: tournamentRecord }\n\ncompetitionEngine.setsState(tournamentRecords, deepCopy);\n")),(0,o.kt)("hr",null),(0,o.kt)("h2",{id:"setschedulingprofile"},"setSchedulingProfile"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"competitionEngine.setSchedulingProfile({ schedulingProfile });\n")),(0,o.kt)("h2",{id:"settournamentrecord"},"setTournamentRecord"),(0,o.kt)("p",null,"Adds a tournamentRecord to ",(0,o.kt)("inlineCode",{parentName:"p"},"competitionEngine")," state."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"competitionEngine.setTournamentRecord(tournamentRecord);\n")),(0,o.kt)("hr",null),(0,o.kt)("h2",{id:"setsubscriptions"},"setSubscriptions"),(0,o.kt)("p",null,"Please refer to the ",(0,o.kt)("a",{parentName:"p",href:"../concepts/subscriptions"},"Subscriptions")," in General Concepts."),(0,o.kt)("hr",null),(0,o.kt)("h2",{id:"toggleparticipantcheckinstate"},"toggleParticipantCheckInState"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"tournamentEngine.toggleParticipantCheckInState({\n  drawId,\n  matchUpId,\n  tournamentId,\n  participantId,\n});\n")),(0,o.kt)("hr",null),(0,o.kt)("h2",{id:"unlinktournament"},"unlinkTournament"),(0,o.kt)("p",null,"Unlink the tournament specified by ",(0,o.kt)("inlineCode",{parentName:"p"},"tournamentId")," from other tournaments loaded in ",(0,o.kt)("inlineCode",{parentName:"p"},"compeitionEngine"),"."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"competitionEngine.unlinkTournament({ tournamentId });\n")),(0,o.kt)("hr",null),(0,o.kt)("h2",{id:"unlinktournaments"},"unlinkTournaments"),(0,o.kt)("p",null,"Removes links between all tournaments currently loaded in ",(0,o.kt)("inlineCode",{parentName:"p"},"competitionEngine"),"."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"competitionEngine.unlinkTournaments();\n")),(0,o.kt)("h2",{id:"version"},"version"),(0,o.kt)("p",null,"Returns NPM package version. Can be used in configurations that utilize Competition Factory engines on both client and server to ensure equivalency."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"const version = competitionEngine.version();\n")),(0,o.kt)("hr",null))}u.isMDXComponent=!0}}]);