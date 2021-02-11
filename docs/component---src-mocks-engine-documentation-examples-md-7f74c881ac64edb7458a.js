(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{P1iM:function(e,n,t){"use strict";t.r(n),t.d(n,"_frontmatter",(function(){return c})),t.d(n,"default",(function(){return m}));var a=t("Fcif"),r=t("+I+c"),o=t("/FXl"),i=t("TjRS"),c=(t("aD51"),{});void 0!==c&&c&&c===Object(c)&&Object.isExtensible(c)&&!c.hasOwnProperty("__filemeta")&&Object.defineProperty(c,"__filemeta",{configurable:!0,value:{name:"_frontmatter",filename:"src/mocksEngine/documentation/examples.md"}});var s={_frontmatter:c},d=i.a;function m(e){var n=e.components,t=Object(r.a)(e,["components"]);return Object(o.b)(d,Object(a.a)({},s,t,{components:n,mdxType:"MDXLayout"}),Object(o.b)("h1",{id:"generating-tournaments"},"Generating Tournaments"),Object(o.b)("p",null,"The Mocks Engine is used to generate tournaments for many of the Jest tests suites used in the development of the Competition Factory."),Object(o.b)("p",null,"With no parameters the ",Object(o.b)("inlineCode",{parentName:"p"},"generateTournamentRecord()")," method will generate a tournamentRecord with 32 individual participants:"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),"const { tournamentRecord } = mocksEngine.generateTournamentRecord({});\n")),Object(o.b)("p",null,"In testing, very specific scenarios are required. Any number of draws can be added to a generated tournament, and scores for specific ",Object(o.b)("inlineCode",{parentName:"p"},"matchUps")," within the generated draw structures can be added as well. In the following example a Doubles draw with 32 positions is generated with 30 PAIR participants, leaving two positions to be filled with BYEs. The score is completed for the matchUp found using ",Object(o.b)("inlineCode",{parentName:"p"},"{ roundNumber: 1, roundPosition: 2 }"),"."),Object(o.b)("p",null,Object(o.b)("inlineCode",{parentName:"p"},"const { outcome } = mocksEngine.generateOutcomeFromScoreString()")," is used internally to generate a valid TODS score object."),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),"const drawProfiles = [\n  {\n    drawSize: 32,\n    participantsCount: 30,\n    participantType: PAIR,\n    outcomes: [\n      {\n        roundNumber: 1,\n        roundPosition: 2,\n        scoreString: '6-1 6-2',\n        winningSide: 1,\n      },\n    ],\n  },\n];\n\nconst {\n  eventIds,\n  drawIds: [drawId],\n  tournamentRecord,\n} = mocksEngine.generateTournamentRecord({ drawProfiles });\n")),Object(o.b)("p",null,"The ",Object(o.b)("inlineCode",{parentName:"p"},"generateTournamentRecord()")," method returns an array of the ",Object(o.b)("inlineCode",{parentName:"p"},"drawIds")," and ",Object(o.b)("inlineCode",{parentName:"p"},"eventIds")," present in the generated ",Object(o.b)("inlineCode",{parentName:"p"},"tournamentRecord")," to aid in calling subsequent ",Object(o.b)("inlineCode",{parentName:"p"},"tournamentEngine")," methods:"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),"tournamentEngine.setState(tournamentRecord);\n\nconst { matchUps } = tournamentEngine.allDrawMatchUps({ drawId });\n")))}void 0!==m&&m&&m===Object(m)&&Object.isExtensible(m)&&!m.hasOwnProperty("__filemeta")&&Object.defineProperty(m,"__filemeta",{configurable:!0,value:{name:"MDXContent",filename:"src/mocksEngine/documentation/examples.md"}}),m.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-mocks-engine-documentation-examples-md-7f74c881ac64edb7458a.js.map