(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[7594],{3905:function(e,t,n){"use strict";n.d(t,{Zo:function(){return s},kt:function(){return u}});var a=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var l=a.createContext({}),c=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},s=function(e){var t=c(e.components);return a.createElement(l.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,l=e.parentName,s=p(e,["components","mdxType","originalType","parentName"]),d=c(n),u=i,h=d["".concat(l,".").concat(u)]||d[u]||m[u]||o;return n?a.createElement(h,r(r({ref:t},s),{},{components:n})):a.createElement(h,r({ref:t},s))}));function u(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=n.length,r=new Array(o);r[0]=d;var p={};for(var l in t)hasOwnProperty.call(t,l)&&(p[l]=t[l]);p.originalType=e,p.mdxType="string"==typeof e?e:i,r[1]=p;for(var c=2;c<o;c++)r[c]=n[c];return a.createElement.apply(null,r)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},8635:function(e,t,n){"use strict";n.r(t),n.d(t,{frontMatter:function(){return p},metadata:function(){return l},toc:function(){return c},default:function(){return m}});var a=n(4034),i=n(9973),o=(n(7294),n(3905)),r=["components"],p={title:"tieFormats"},l={unversionedId:"concepts/tieFormat",id:"concepts/tieFormat",isDocsHomePage:!1,title:"tieFormats",description:"Overview",source:"@site/docs/concepts/tieFormat.mdx",sourceDirName:"concepts",slug:"/concepts/tieFormat",permalink:"/tods-competition-factory/docs/concepts/tieFormat",version:"current",frontMatter:{title:"tieFormats"},sidebar:"docs",previous:{title:"lineUps",permalink:"/tods-competition-factory/docs/concepts/lineUp"},next:{title:"tieMatchUps",permalink:"/tods-competition-factory/docs/concepts/tieMatchUp"}},c=[{value:"Overview",id:"overview",children:[]},{value:"Value Considerations",id:"value-considerations",children:[]},{value:"tieFormat Use",id:"tieformat-use",children:[{value:"Generating Draws",id:"generating-draws",children:[]},{value:"Mapping lineUps",id:"mapping-lineups",children:[]}]},{value:"tieFormat Example",id:"tieformat-example",children:[]},{value:"tieFormat and lineUp propagation",id:"tieformat-and-lineup-propagation",children:[]}],s={toc:c};function m(e){var t=e.components,n=(0,i.Z)(e,r);return(0,o.kt)("wrapper",(0,a.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"overview"},"Overview"),(0,o.kt)("p",null,"A ",(0,o.kt)("inlineCode",{parentName:"p"},"tieFormat")," both describes collections of singles and doubles ",(0,o.kt)("inlineCode",{parentName:"p"},"tieMatchUps")," which are part of a ",(0,o.kt)("inlineCode",{parentName:"p"},"{ matchUpType: TEAM }")," ",(0,o.kt)("inlineCode",{parentName:"p"},"matchUp"),", and defines the target value which must be achieved in order to win the ",(0,o.kt)("inlineCode",{parentName:"p"},"matchUp"),"."),(0,o.kt)("p",null,"There can be any number of ",(0,o.kt)("inlineCode",{parentName:"p"},"collectionDefinitions")," in a ",(0,o.kt)("inlineCode",{parentName:"p"},"tieMatchUp"),'.\nFor instance, there can be "Men\'s Singles", "Men\'s Doubles", "Womens\'s Singles", "Women\'s Doubles", and "Mixed Doubles".'),(0,o.kt)("p",null,"Each ",(0,o.kt)("inlineCode",{parentName:"p"},"collectionDefinition")," defines how many ",(0,o.kt)("inlineCode",{parentName:"p"},"matchUps")," are in the collection, the ",(0,o.kt)("inlineCode",{parentName:"p"},"matchUpType")," (SINGLES or DOUBLES), the ",(0,o.kt)("inlineCode",{parentName:"p"},"matchUpFormat")," to be used for scoring, and how value is assigned to each ",(0,o.kt)("inlineCode",{parentName:"p"},"matchUp"),".\n",(0,o.kt)("inlineCode",{parentName:"p"},"collectionDefinitions")," can optionally define ",(0,o.kt)("inlineCode",{parentName:"p"},"category")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"gender"),"."),(0,o.kt)("h2",{id:"value-considerations"},"Value Considerations"),(0,o.kt)("p",null,"The score of a TEAM ",(0,o.kt)("inlineCode",{parentName:"p"},"matchUp")," is the summation of the value assigned for the wins on each side. Value can be assigned in numerous ways.\nWhen there is no ",(0,o.kt)("inlineCode",{parentName:"p"},"winCriteria")," specified, the ",(0,o.kt)("inlineCode",{parentName:"p"},"valueGoal")," defaults to one more than half of the potential value within scope (which can be the ",(0,o.kt)("inlineCode",{parentName:"p"},"tieFormat"),", a ",(0,o.kt)("inlineCode",{parentName:"p"},"collectionDefinition"),", or a ",(0,o.kt)("inlineCode",{parentName:"p"},"collectionGroup"),")."),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"matchUpValue")," - specified value is awarded for each ",(0,o.kt)("inlineCode",{parentName:"li"},"matchUp")," win"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"setValue")," - specified value is awarded for each set win"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"collectionValue")," - specified value is awarded for winning a collection"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"collecitonValueProfile")," - unique values are specified for each ",(0,o.kt)("inlineCode",{parentName:"li"},"collectionPosition")," within a collection"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"groupValue")," - specified value is awarded for reaching a ",(0,o.kt)("inlineCode",{parentName:"li"},"valueGoal")," by accumulating value across collections in the group"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"scoreValue")," - specified value is awarded for each sideScore (typically 1, typically used with ",(0,o.kt)("inlineCode",{parentName:"li"},"aggregateValue")," formats)")),(0,o.kt)("p",null,"See ",(0,o.kt)("a",{parentName:"p",href:"../types/typedefs#tieformat"},"tieFormat type definitions")),(0,o.kt)("h2",{id:"tieformat-use"},"tieFormat Use"),(0,o.kt)("h3",{id:"generating-draws"},"Generating Draws"),(0,o.kt)("p",null,"The generation of ",(0,o.kt)("inlineCode",{parentName:"p"},"drawDefinitions")," requires a ",(0,o.kt)("inlineCode",{parentName:"p"},"tieFormat")," to determine how many ",(0,o.kt)("inlineCode",{parentName:"p"},"tieMatchUps")," for each collection are contained in the ",(0,o.kt)("inlineCode",{parentName:"p"},"matchUp")," between two teams.\nWhen ",(0,o.kt)("inlineCode",{parentName:"p"},"tieMatchUps")," are generated they are assigned a ",(0,o.kt)("inlineCode",{parentName:"p"},"collectionId")," and a ",(0,o.kt)("inlineCode",{parentName:"p"},"collectionPosition"),".\nIf there are six ",(0,o.kt)("inlineCode",{parentName:"p"},"tieMatchUps")," in a collection, they will be assigned ",(0,o.kt)("inlineCode",{parentName:"p"},"collectionPositions")," ",(0,o.kt)("strong",{parentName:"p"},"1-6"),"."),(0,o.kt)("h3",{id:"mapping-lineups"},"Mapping lineUps"),(0,o.kt)("p",null,"A ",(0,o.kt)("inlineCode",{parentName:"p"},"tieFormat")," determines the relationship between a team's ",(0,o.kt)("inlineCode",{parentName:"p"},"lineUp")," and the ",(0,o.kt)("inlineCode",{parentName:"p"},"tieMatchUps")," within a ",(0,o.kt)("inlineCode",{parentName:"p"},"matchUp")," by defining the mapping between ",(0,o.kt)("inlineCode",{parentName:"p"},"collectionIds"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"collectionPositions")," and participant ",(0,o.kt)("inlineCode",{parentName:"p"},"collectionAssignments"),"."),(0,o.kt)("h2",{id:"tieformat-example"},"tieFormat Example"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"each ",(0,o.kt)("strong",{parentName:"li"},"SINGLES matchUp")," has a value of ",(0,o.kt)("strong",{parentName:"li"},"1")),(0,o.kt)("li",{parentName:"ul"},"the entire ",(0,o.kt)("strong",{parentName:"li"},"DOUBLES Collection")," has a value of ",(0,o.kt)("strong",{parentName:"li"},"1")),(0,o.kt)("li",{parentName:"ul"},"the ",(0,o.kt)("inlineCode",{parentName:"li"},"valueGoal")," is ",(0,o.kt)("strong",{parentName:"li"},"4"))),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"const tieFormat = {\n  winCriteria: {\n    valueGoal: 4, // the value that must be achieved to win the match\n  },\n  collectionDefinitions: [\n    {\n      collectionId: 'singlesCollectionId',\n      collectionGroupNumber: 1, // optional, if there are groups\n      collectionName: 'Singles',\n      matchUpFormat: 'SET3-S:6/TB7',\n      matchUpType: SINGLES,\n      matchUpCount: 6,\n      matchUpValue: 1, // value awarded for each matchUp win\n    },\n    {\n      collectionId: 'doublesCollectionId',\n      collectionGroupNumber: 1, // optional, if there are groups\n      collectionName: 'Doubles',\n      collectionValue: 1, // value awarded for winning one more than half of the matchUps in the collection\n      matchUpFormat: 'SET3-S:6/TB7-F:TB10',\n      matchUpType: DOUBLES,\n      matchUpCount: 3,\n    },\n  ],\n  // optional group details\n  collectionGroups: [\n    {\n      groupName: 'Day 1', // used to group collections, e.g. Laver Cup\n      groupNumber: 1,\n    },\n  ],\n};\n")),(0,o.kt)("h2",{id:"tieformat-and-lineup-propagation"},"tieFormat and lineUp propagation"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"tieFormats")," can be attached to a tournament record at multiple levels wthin the hierarchy ",(0,o.kt)("inlineCode",{parentName:"p"},"event")," > ",(0,o.kt)("inlineCode",{parentName:"p"},"drawDefinition")," > ",(0,o.kt)("inlineCode",{parentName:"p"},"structure")," > ",(0,o.kt)("inlineCode",{parentName:"p"},"matchUp"),".\nThis means that when a ",(0,o.kt)("inlineCode",{parentName:"p"},"tieFormat")," is not present on a ",(0,o.kt)("inlineCode",{parentName:"p"},"matchUp")," the definition is resolved by walking the hierarchy.\nWhen a ",(0,o.kt)("inlineCode",{parentName:"p"},"matchUp")," is scored, the appropriate ",(0,o.kt)("inlineCode",{parentName:"p"},"tieFormat")," is attached to the ",(0,o.kt)("inlineCode",{parentName:"p"},"matchUp"),".\nThis is necessary because at any point in a ",(0,o.kt)("inlineCode",{parentName:"p"},"structure")," or ",(0,o.kt)("inlineCode",{parentName:"p"},"drawDefinition")," the scoped ",(0,o.kt)("inlineCode",{parentName:"p"},"tieFormat")," may be edite/changed;\nfor instance, if there is a rain delay, the format may be shortened for ",(0,o.kt)("inlineCode",{parentName:"p"},"matchUps")," which have not yet been played.\nThe mapping between ",(0,o.kt)("inlineCode",{parentName:"p"},"participants")," in a ",(0,o.kt)("inlineCode",{parentName:"p"},"lineUp")," must be preserved for ",(0,o.kt)("inlineCode",{parentName:"p"},"matchUps")," which are IN_PROGRESS or COMPLETED."),(0,o.kt)("p",null,"As TEAM ",(0,o.kt)("inlineCode",{parentName:"p"},"participants")," progress through draw ",(0,o.kt)("inlineCode",{parentName:"p"},"structures")," the most recent ",(0,o.kt)("inlineCode",{parentName:"p"},"lineUp")," is saved (via an ",(0,o.kt)("inlineCode",{parentName:"p"},"extension")," on the ",(0,o.kt)("inlineCode",{parentName:"p"},"drawDefinition"),") such that it can be propagated to subsequent ",(0,o.kt)("inlineCode",{parentName:"p"},"matchUps"),".\nWhen a ",(0,o.kt)("inlineCode",{parentName:"p"},"matchUp")," is scored or the ",(0,o.kt)("inlineCode",{parentName:"p"},"lineUp")," changes, the ",(0,o.kt)("inlineCode",{parentName:"p"},"lineUp")," is saved directly to the target ",(0,o.kt)("inlineCode",{parentName:"p"},"matchUp"),"."))}m.isMDXComponent=!0}}]);