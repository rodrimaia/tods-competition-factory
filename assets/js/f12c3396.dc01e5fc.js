(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[5964],{7018:function(e,t,i){"use strict";i.d(t,{Z:function(){return b}});var n=i(7294),o=i(5899),s=i(126),a=JSON.parse('{"monokai":{"scheme":"monokai","author":"wimer hazenberg (http://www.monokai.nl)","base00":"#272822","base01":"#383830","base02":"#49483e","base03":"#75715e","base04":"#a59f85","base05":"#f8f8f2","base06":"#f5f4f1","base07":"#f9f8f5","base08":"#f92672","base09":"#fd971f","base0A":"#f4bf75","base0B":"#a6e22e","base0C":"#a1efe4","base0D":"#66d9ef","base0E":"#ae81ff","base0F":"#cc6633"},"summerfruit":{"scheme":"summerfruit","author":"christopher corley (http://cscorley.github.io/)","base00":"#151515","base01":"#202020","base02":"#303030","base03":"#505050","base04":"#B0B0B0","base05":"#D0D0D0","base06":"#E0E0E0","base07":"#FFFFFF","base08":"#FF0086","base09":"#FD8900","base0A":"#ABA800","base0B":"#00C918","base0C":"#1faaaa","base0D":"#3777E6","base0E":"#AD00A1","base0F":"#cc6633"},"solarized":{"scheme":"solarized","author":"ethan schoonover (http://ethanschoonover.com/solarized)","base00":"#002b36","base01":"#073642","base02":"#586e75","base03":"#657b83","base04":"#839496","base05":"#93a1a1","base06":"#eee8d5","base07":"#fdf6e3","base08":"#dc322f","base09":"#cb4b16","base0A":"#b58900","base0B":"#859900","base0C":"#2aa198","base0D":"#268bd2","base0E":"#6c71c4","base0F":"#d33682"}}'),r=function(e,t,i){var n=e.style;return{style:Object.assign({},n,{color:Number.isNaN(i[0])||parseInt(i,10)%2?n.color:"#33F"})}},c=function(e,t,i){var n=e.style;return{style:Object.assign({},n,{fontWeight:i?"bold":n.textTransform})}},l=function(e,t){var i=e.style;return{style:Object.assign({},i,{borderRadius:"Boolean"===t?3:i.borderRadius})}},u=function(e,t,i){var s,a="object"==typeof t,r=a&&Object.values(t)[0],c="string"==typeof r&&"{"===r[0];if(a){var l=Object.keys(t);2!==o.utilities.intersection(l,["drawId","drawType"]).length||l.includes("drawRepresentativeIds")||(s="drawDefinition"),2!==o.utilities.intersection(l,["entryPosition","entryStatus"]).length||l.includes("entryStageSequence")||(s="entry"),2!==o.utilities.intersection(l,["eventId","eventName"]).length||l.includes("tennisOfficialIds")||(s="event"),2===o.utilities.intersection(l,["flightNumber","drawId"]).length&&(s="flight"),2===o.utilities.intersection(l,["name","value"]).length&&(s="extension"),2!==o.utilities.intersection(l,["linkType","source"]).length||l.includes("linkCondition")||(s="link"),2!==o.utilities.intersection(l,["matchUpId","drawPositions"]).length||l.includes("surfaceCategory")||(s="matchUp"),2===o.utilities.intersection(l,["drawPosition","participantId","bye"]).length&&(s="positionAssignment"),2!==o.utilities.intersection(l,["courtId","dateAvailability"]).length||l.includes("altitude")||(s="court"),2!==o.utilities.intersection(l,["participantId","participantName"]).length||l.includes("onlineResources")||(s="participant"),2===o.utilities.intersection(l,["structureId","structureName"]).length&&(s="structure"),2!==o.utilities.intersection(l,["venueId","courts"]).length||l.includes("venueOtherIds")||(s="venue")}return n.createElement("span",null,s||(c?e:i))},d=function(e){return"string"==typeof(t=e)&&t.length>2&&"{"===t[1]?function(e){try{var t=JSON.parse(JSON.parse(e)),i="true"===t.required?"":"? ",n="true"===t.array?"[]":"";return i+": "+(["any","boolean","number","string"].includes(t.type)?t.type:"object"===t.type?t.object||"Object":"enum"===t.type?"enum "+t.enum:"")+n+(t.note?" \\\\ "+t.note:"")}catch(o){return""}}(e):"string"==typeof e&&e.length>40?e.slice(0,40)+"...":e;var t},p=function(e){var t=e[0];return n.createElement("strong",null,t)},b=function(e){var t=e.colorScheme,i=void 0===t?"summerfruit":t,o=e.sortObjectKeys,b=void 0===o||o,f=e.invertTheme,m=void 0===f||f,h=e.expandRoot,y=void 0===h||h,v=e.expandToLevel,g=void 0===v?1:v,A=e.hideRoot,N=void 0!==A&&A,k=e.root,D=void 0===k?"root":k,I=e.data;return n.createElement("div",{style:{marginBottom:"1em"}},n.createElement(s.ZP,{theme:{valueLabel:r,nestedNodeLabel:c,extend:a[i],value:l},shouldExpandNode:function(e,t,i){return!!y&&(("object"!=typeof t||!t._typeDef)&&(i<g||void 0))},sortObjectKeys:b,getItemString:u,labelRenderer:p,valueRenderer:d,invertTheme:m,hideRoot:N,keyPath:[D],data:I}))}},6787:function(e,t,i){"use strict";i.r(t),i.d(t,{default:function(){return b},frontMatter:function(){return l},metadata:function(){return u},toc:function(){return d}});var n=i(4034),o=i(9973),s=(i(7294),i(3905)),a=i(7018),r=JSON.parse('{"positionActions":{"policyName":"positionActionsDefault","enabledStructures":[{"stages":["QUALIFYING","MAIN"],"stageSequences":[1],"enabledActions":[],"disabledActions":[]},{"stages":[],"stageSequences":[],"enabledActions":["SEED_VALUE","ADD_NICKNAME","ADD_PENALTY"],"disabledActions":[]}],"disbledStructures":[],"otherFlightEntries":false}}'),c=["components"],l={title:"Position Actions"},u={unversionedId:"policies/positionActions",id:"policies/positionActions",isDocsHomePage:!1,title:"Position Actions",description:"See Actions for context.",source:"@site/docs/policies/positionActions.mdx",sourceDirName:"policies",slug:"/policies/positionActions",permalink:"/tods-competition-factory/docs/policies/positionActions",version:"current",frontMatter:{title:"Position Actions"},sidebar:"docs",previous:{title:"Accessors",permalink:"/tods-competition-factory/docs/policies/accessors"},next:{title:"Positioning Seeds",permalink:"/tods-competition-factory/docs/policies/positioningSeeds"}},d=[{value:"policyDefinitions Example",id:"policydefinitions-example",children:[]}],p={toc:d};function b(e){var t=e.components,i=(0,o.Z)(e,c);return(0,s.kt)("wrapper",(0,n.Z)({},p,i,{components:t,mdxType:"MDXLayout"}),(0,s.kt)("p",null,"See ",(0,s.kt)("a",{parentName:"p",href:"/docs/concepts/actions"},"Actions")," for context."),(0,s.kt)("p",null,(0,s.kt)("inlineCode",{parentName:"p"},"positionActions")," returns an array of valid actions for a specified drawPosition. Valid actions can be determined, in part, by\n",(0,s.kt)("inlineCode",{parentName:"p"},"policyDefinitions"),". In the Competition Factory source there are four examples of position action policies:"),(0,s.kt)("ol",null,(0,s.kt)("li",{parentName:"ol"},"Default position actions"),(0,s.kt)("li",{parentName:"ol"},"No movement (disallows swapping participants & etc.)"),(0,s.kt)("li",{parentName:"ol"},"Disabled position actions"),(0,s.kt)("li",{parentName:"ol"},"Unrestricted position actions (all available actions)")),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-js"},"const { positionActions } = tournamentEngine.positionActions({\n  policyDefinitions, // optional - can be attached to tournamentRecord, event, or draw\n  drawPosition,\n  eventId,\n  drawId,\n});\n")),(0,s.kt)("h3",{id:"policydefinitions-example"},"policyDefinitions Example"),(0,s.kt)(a.Z,{data:r,root:"policyDefinitions",colorScheme:"summerfruit",invertTheme:!0,expandToLevel:1,mdxType:"RenderJSON"}))}b.isMDXComponent=!0}}]);