(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{vYuS:function(e,t,a){"use strict";a.r(t),a.d(t,"_frontmatter",(function(){return o})),a.d(t,"default",(function(){return p}));var n=a("Fcif"),i=a("+I+c"),r=(a("mXGw"),a("/FXl")),s=a("TjRS"),o=(a("aD51"),{});void 0!==o&&o&&o===Object(o)&&Object.isExtensible(o)&&!o.hasOwnProperty("__filemeta")&&Object.defineProperty(o,"__filemeta",{configurable:!0,value:{name:"_frontmatter",filename:"src/drawEngine/documentation/devTaskLog.md"}});var c={_frontmatter:o},b=s.a;function p(e){var t=e.components,a=Object(i.a)(e,["components"]);return Object(r.b)(b,Object(n.a)({},c,a,{components:t,mdxType:"MDXLayout"}),Object(r.b)("h1",{id:"drawengine-dev-tasks"},"drawEngine dev tasks"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},Object(r.b)("p",{parentName:"li"},"assignment of non-BYE drawPositions should check whether paired position is BYE and if so, drawPosition be advanced")),Object(r.b)("li",{parentName:"ul"},Object(r.b)("p",{parentName:"li"},"assignment of BYE should check whether paired position is filled and if so, advance paired position")),Object(r.b)("li",{parentName:"ul"},Object(r.b)("p",{parentName:"li"},"removal of BYE should check whether paired position is filled and if so, paired position should be removed from target directions")),Object(r.b)("li",{parentName:"ul"},Object(r.b)("p",{parentName:"li"},"write unit tests for ",Object(r.b)("strong",{parentName:"p"},"activeDrawPositions"))),Object(r.b)("li",{parentName:"ul"},Object(r.b)("p",{parentName:"li"},"a drawPosition advanced by BYE does not count as an ",Object(r.b)("em",{parentName:"p"},"activeDrawPosition"))),Object(r.b)("li",{parentName:"ul"},Object(r.b)("p",{parentName:"li"},"write unit test for ",Object(r.b)("strong",{parentName:"p"},"clearDrawPosition")," which includes attempting to clear an ",Object(r.b)("em",{parentName:"p"},"activeDrawPosition")," and a position which is paired with an ",Object(r.b)("em",{parentName:"p"},"activeDrawPosition"))),Object(r.b)("li",{parentName:"ul"},Object(r.b)("p",{parentName:"li"},"directing ",Object(r.b)("em",{parentName:"p"},"losers")," across links should add them to ",Object(r.b)("strong",{parentName:"p"},"positionAssignments"))),Object(r.b)("li",{parentName:"ul"},Object(r.b)("p",{parentName:"li"},"how to determine that a matchUp is a FEED_IN?  one assigned drawPosition is not found in RoundNumber: 1 matchUps"))),Object(r.b)("h2",{id:"seeding"},"Seeding"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},"all ",Object(r.b)("strong",{parentName:"li"},"qualifying")," stage structures may be seeded; progressive draws consist of sequences of qualifying structures which feed into each other, and each stageSequence may be seeded independently"),Object(r.b)("li",{parentName:"ul"},Object(r.b)("strong",{parentName:"li"},"main")," stageSequence: 1 structures may be seeded, but ",Object(r.b)("strong",{parentName:"li"},"main")," stageSequence 1+n are not seeded as long as participant draw positions are continuous, e.g. fed TOP DOWN or BOTTOM UP with a fixed pattern."),Object(r.b)("li",{parentName:"ul"},Object(r.b)("strong",{parentName:"li"},"main")," stage ",Object(r.b)("em",{parentName:"li"},"playoff")," structures and ",Object(r.b)("strong",{parentName:"li"},"consolation")," stage structures may be seeded if participant positions are NOT continuous with the structures which are their source.  (",Object(r.b)("strong",{parentName:"li"},"main")," stage stageSequence: 1 is referred to as a ",Object(r.b)("em",{parentName:"li"},"playoff")," after a round robin qualifying stage).  If drawPositions for 5-8 playoffs are NOT continuous with the stageSequence which produced the participants, seeding is possible.")),Object(r.b)("p",null,"Considering the above, structures in general must be able to independently specify both the number of seeds and the participants nominated to be seeded."),Object(r.b)("p",null,"A structure definition needs to know the number of participants who will be seeded before there are any entries, which is an argument for an attribute along the lines of ",Object(r.b)("strong",{parentName:"p"},"numberOfSeeds")," or ",Object(r.b)("strong",{parentName:"p"},"seedsCount"),", or at least a ",Object(r.b)("strong",{parentName:"p"},"seedAssignments")," array which contains objects defining which ",Object(r.b)("strong",{parentName:"p"},"participantIds")," are nominated as seeds -- which maps ",Object(r.b)("strong",{parentName:"p"},"pariticipantId")," to ",Object(r.b)("strong",{parentName:"p"},"seedNumber"),". There are policies which define where seeds may be placed within structures, but the fact that a position may contain a seed doesn’t imply that it does contain a seed, because seeds may be replaced by alternates who do not inherit the ",Object(r.b)("strong",{parentName:"p"},"seedNumber"),"."),Object(r.b)("p",null,"For display purposes it is important to know whether to represent a participant’s seeding as seedNumber or seedBlock .  Somewhere in the ",Object(r.b)("em",{parentName:"p"},"construction phase")," definition we need to have what amounts to a ",Object(r.b)("strong",{parentName:"p"},"seedBlockThreshold"),", which is a ",Object(r.b)("strong",{parentName:"p"},"seedNumber")," after which ",Object(r.b)("strong",{parentName:"p"},"seedBlock")," is displayed rather than ",Object(r.b)("strong",{parentName:"p"},"seedNumber"),".  Within a Match we can have either ",Object(r.b)("strong",{parentName:"p"},"seedNumber")," or ",Object(r.b)("strong",{parentName:"p"},"seedBlock")," as an attribute within a ",Object(r.b)("strong",{parentName:"p"},"participant")," object… or an attribute ",Object(r.b)("strong",{parentName:"p"},"seeded")," which can be a String representation of how the participant was seeded…  at this point I’m inclined to not introduce yet another permutation of seeded state.  Since ",Object(r.b)("strong",{parentName:"p"},"seedBlockThreshold")," is required, it seems to make more sense to just stick with ",Object(r.b)("strong",{parentName:"p"},"seedNumber")," and ",Object(r.b)("strong",{parentName:"p"},"seedBlock"),"."),Object(r.b)("h2",{id:"scheduling"},"Scheduling"),Object(r.b)("ol",null,Object(r.b)("li",{parentName:"ol"},'If a draw is re-generated but retains the same "dimensions" (drawSize), the schedule can be preserved by pinning scheudling objects to RoundNumber/RoundPosition')))}void 0!==p&&p&&p===Object(p)&&Object.isExtensible(p)&&!p.hasOwnProperty("__filemeta")&&Object.defineProperty(p,"__filemeta",{configurable:!0,value:{name:"MDXContent",filename:"src/drawEngine/documentation/devTaskLog.md"}}),p.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-draw-engine-documentation-dev-task-log-md-681b336c7e9be9e6f479.js.map