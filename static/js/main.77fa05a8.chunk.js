(this["webpackJsonpstory-maker"]=this["webpackJsonpstory-maker"]||[]).push([[0],{18:function(e,t,n){e.exports=n(26)},23:function(e,t,n){},24:function(e,t,n){},25:function(e,t,n){},26:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(16),i=n.n(o),d=(n(23),n(10)),c=n(4),s=n(5),u=n(6),l=n(8),p=n(7),m=n(9),f=(n(24),n(12)),h=n.n(f),v=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(l.a)(this,Object(p.a)(t).call(this,e))).ref=Object(a.createRef)(),n.startDragging=function(e){n.ref.current&&n.setState({dragging:!0,relX:e.pageX-n.ref.current.offsetLeft,relY:e.pageY-n.ref.current.offsetTop})},n.stopDragging=function(){n.setState({dragging:!1})},n.drag=function(e){var t=e.pageX-n.state.relX,a=e.pageY-n.state.relY;n.state.dragging&&(n.setState({x:t,y:a}),n.props.onUpdatePosition(t,a,n.width(),n.height()))},n.width=function(){var e;return(null===(e=n.ref.current)||void 0===e?void 0:e.clientWidth)||0},n.height=function(){var e;return(null===(e=n.ref.current)||void 0===e?void 0:e.clientHeight)||0},n.state={x:e.x,y:e.y,dragging:!1,relX:0,relY:0},n}return Object(m.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){this.props.onUpdatePosition(this.props.x,this.props.y,this.width(),this.height())}},{key:"componentDidUpdate",value:function(e,t){this.state.dragging&&!t.dragging?(document.addEventListener("mousemove",this.drag),document.addEventListener("mouseup",this.stopDragging)):!this.state.dragging&&t.dragging&&(document.removeEventListener("mousemove",this.drag),document.removeEventListener("mouseup",this.stopDragging))}},{key:"render",value:function(){var e=this.props.children,t=this.state,n=t.x,a=t.y,o=t.dragging;return r.a.createElement("div",{className:h()("draggable-div",{"draggable-div--dragging":o}),style:{left:"".concat(n,"px"),top:"".concat(a,"px")},ref:this.ref},r.a.createElement("div",{className:"drag-wrapper",onMouseDown:this.startDragging},r.a.createElement("i",{className:"fas fa-arrows-alt",title:"move node"})),e)}}]),t}(r.a.Component),y=function(e){var t=e.onClick;return r.a.createElement("button",{className:"button",onClick:t,title:"add node"},r.a.createElement("i",{className:"fas fa-plus-circle"}))},g=function(e){function t(){var e,n;Object(s.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(l.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(r)))).state={active:!1},n.startDrawing=function(e){console.log(n.props.nodeTracker.id),n.setState({active:!0}),n.drawLine(e)},n.stopDrawing=function(e){n.setState({active:!1});var t=n.props.nodeTrackers.find((function(t){return t.id!==n.props.nodeTracker.id&&t.type===n.props.canCollideWith&&t.x<e.pageX&&e.pageX<t.x+t.width&&t.y<e.pageY&&e.pageY<t.y+t.height}));console.log(t),t&&n.props.onCollision(t.id),n.props.stopDrawingLine()},n.mouseMove=function(e){n.state.active&&n.drawLine(e)},n.drawLine=function(e){var t=n.props,a=t.drawFrom,r=t.nodeTracker,o="top"===a?r.y:r.y+r.height;n.props.drawLine({x1:n.props.nodeTracker.x+n.props.nodeTracker.width/2,y1:o,x2:e.pageX,y2:e.pageY})},n}return Object(m.a)(t,e),Object(u.a)(t,[{key:"componentDidUpdate",value:function(e,t){this.state.active&&!t.active?(document.addEventListener("mousemove",this.mouseMove),document.addEventListener("mouseup",this.stopDrawing)):!this.state.active&&t.active&&(document.removeEventListener("mousemove",this.mouseMove),document.removeEventListener("mouseup",this.stopDrawing))}},{key:"render",value:function(){var e=this.props.children;return r.a.createElement("div",{onMouseDown:this.startDrawing},e)}}]),t}(r.a.Component),b=function(e){var t=e.type,n=e.currentType,a=e.updateType;return r.a.createElement("button",{className:h()("node-type",{"node-type--selected":t===n}),onClick:function(){return a(t)}},t)},O=function(e){var t=e.startNode,n=e.node,a=e.updateNode,o=function(e){return a(Object(c.a)({},n,{type:e}))};return r.a.createElement("div",{className:"node-type--wrapper"},!t&&r.a.createElement(b,{type:"Win",currentType:n.type,updateType:o}),r.a.createElement(b,{type:"Normal",currentType:n.type,updateType:o}),!t&&r.a.createElement(b,{type:"Death",currentType:n.type,updateType:o}))},k=function(e){var t=e.node,n=e.updateNode,a=e.addOption,o=e.removeNode,i=e.x,d=e.y,s=e.addOrUpdateNodeTracker,u=e.nodeTracker,l=e.nodeTrackers,p=e.startNode,m=e.connectToOption,f=e.drawLine,h=e.stopDrawingLine;return r.a.createElement(v,{x:i,y:d,onUpdatePosition:function(e,n,a,r){return s(t.id,"Node",e,n,a,r)}},r.a.createElement(g,{drawFrom:"bottom",drawLine:f,stopDrawingLine:h,nodeTrackers:l,nodeTracker:u||{x:0,y:0,width:0,height:0,id:t.id,type:"Node"},canCollideWith:"StoryOption",onCollision:function(e){return m(t,e)}},r.a.createElement("div",{className:"node"},r.a.createElement("textarea",{placeholder:"Add a statement e.g. You walk into a dark room.",value:t.statement,onChange:function(e){return n(Object(c.a)({},t,{statement:e.target.value}))}}),r.a.createElement(O,{updateNode:n,node:t,startNode:p}),"Normal"===t.type&&r.a.createElement(y,{onClick:function(){return a(t.id)}}),!p&&r.a.createElement("button",{className:"button",title:"remove node",onClick:function(){return o(t)}},r.a.createElement("i",{className:"fas fa-minus-circle"})))))},E=function(e){var t=e.verb,n=e.addVerb,a=e.disabled;return r.a.createElement("div",{className:"verb"},r.a.createElement("p",null,t),!a&&r.a.createElement(y,{onClick:function(){return n(t)}}))},N=function(e){function t(){var e,n;Object(s.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(l.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(r)))).addNode=function(e){return n.props.addNode(n.props.option,e)},n}return Object(m.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this.props,t=e.option,n=e.updateOption,a=e.x,o=e.y,i=e.addOrUpdateNodeTracker,d=e.removeOption;return r.a.createElement(v,{x:a,y:o,onUpdatePosition:function(e,n,a,r){return i(t.id,"StoryOption",e,n,a,r)}},r.a.createElement("div",{className:"option"},r.a.createElement("div",{className:"option-top"},r.a.createElement("input",{value:t.item,placeholder:"item to interact with e.g. book",onChange:function(e){return n(Object(c.a)({},t,{item:e.target.value}))}}),r.a.createElement("div",null,r.a.createElement("button",{className:"button",title:"remove node",onClick:function(){return d(t)}},r.a.createElement("i",{className:"fas fa-minus-circle"})))),r.a.createElement("div",{className:"verbs"},r.a.createElement(E,{verb:"taste",addVerb:this.addNode,disabled:void 0!==t.tasteId}),r.a.createElement(E,{verb:"touch",addVerb:this.addNode,disabled:void 0!==t.touchId}),r.a.createElement(E,{verb:"smell",addVerb:this.addNode,disabled:void 0!==t.smellId}),r.a.createElement(E,{verb:"look",addVerb:this.addNode,disabled:void 0!==t.lookId}),r.a.createElement(E,{verb:"listen",addVerb:this.addNode,disabled:void 0!==t.listenId}))))}}]),t}(r.a.Component),w=(n(25),function(e){var t=e.x1,n=e.y1,a=e.x2,o=e.y2,i=e.position;return r.a.createElement("svg",{width:"100%",height:"100%",className:"line-wrapper",style:{position:i}},r.a.createElement("defs",null,r.a.createElement("marker",{id:"arrow",markerWidth:"10",markerHeight:"10",refX:"8",refY:"3",orient:"auto",markerUnits:"strokeWidth"},r.a.createElement("path",{d:"M0,0 L0,6 L9,3 z",fill:"#c0ffe9"}))),r.a.createElement("line",{x1:t,y1:n,x2:a,y2:o,className:"line",stroke:"black",markerEnd:"url(#arrow)"}))}),j=function(e){function t(){return Object(s.a)(this,t),Object(l.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this.props,t=e.nodeTracker,n=e.story,a=[].concat(Object(d.a)(x(t,n)),Object(d.a)(T(t,n)));return r.a.createElement(r.a.Fragment,null,a.map((function(e,t){return r.a.createElement(w,Object.assign({},e,{key:"line-".concat(t),position:"absolute"}))})))}}]),t}(r.a.Component),T=function(e,t){return e.flatMap((function(n){var a=t.options.find((function(e){return e.id===n.id}));if(a){var r=[];return a.tasteId&&r.push(I(a.tasteId,e,n,0)),a.touchId&&r.push(I(a.touchId,e,n,1)),a.smellId&&r.push(I(a.smellId,e,n,2)),a.lookId&&r.push(I(a.lookId,e,n,3)),a.listenId&&r.push(I(a.listenId,e,n,4)),r}})).filter((function(e){return void 0!==e}))},I=function(e,t,n,a){var r=t.find((function(t){return t.id===e}));return r?C(n,r,a):void 0},x=function(e,t){return e.flatMap((function(n){var a=t.nodes.find((function(e){return e.id===n.id}));if(a)return L(e,a,n)})).filter((function(e){return void 0!==e}))},L=function(e,t,n){return t.optionIds.map((function(t){return e.find((function(e){return e.id===t}))})).filter((function(e){return void 0!==e})).map((function(e){return S(n,e)}))},S=function(e,t){return{x1:e.x+e.width/2,y1:e.y+e.height,x2:t.x+t.width/2,y2:t.y}},C=function(e,t,n){return{x1:e.x+n/5*e.width+.1*e.width,y1:e.y+e.height,x2:t.x+t.width/2,y2:t.y}},D=function(e){var t=e.drawing,n=e.x1,a=e.y1,o=e.x2,i=e.y2;return r.a.createElement(r.a.Fragment,null,t&&r.a.createElement(w,{position:"absolute",x1:n,y1:a,x2:o,y2:i}))},U=function(e){var t=e.story,n=e.nodeTrackers,a=e.updateTitle,o=e.updateNode,i=e.connectToOption,d=e.updateOption,c=e.addOrUpdateNodeTracker,s=e.addOption,u=e.removeOption,l=e.addNode,p=e.removeNode,m=e.lineCoordinates,f=e.showLine,h=e.drawLine,v=e.stopDrawingLine;return r.a.createElement("div",null,r.a.createElement("input",{value:t.title,className:"title",placeholder:"Title",onChange:function(e){return a(e.target.value)}}),t.nodes.map((function(e,t){return r.a.createElement(k,{key:e.id,nodeTracker:n.find((function(t){return t.id===e.id})),nodeTrackers:n,node:e,addOption:s,updateNode:o,removeNode:p,addOrUpdateNodeTracker:c,connectToOption:i,drawLine:h,stopDrawingLine:v,x:t,y:t,startNode:0===t})})),t.options.map((function(e,t){return r.a.createElement(N,{option:e,key:e.id,updateOption:d,removeOption:u,addOrUpdateNodeTracker:c,addNode:l,x:t,y:t})})),r.a.createElement(j,{story:t,nodeTracker:n}),r.a.createElement(D,Object.assign({drawing:f},m)))},J=function(e){if(void 0===e||null===e)throw new Error("Missing node");if(W(e.id),W(e.statement),"Normal"!==e.type&&"Win"!==e.type&&"Death"!==e.type)throw new Error("bad node type");X(e.optionIds),e.optionIds.forEach(W)},M=function(e){W(e.id),W(e.item),Y(e.tasteId),Y(e.touchId),Y(e.smellId),Y(e.lookId),Y(e.listenId)},Y=function(e){void 0!==e&&W(e)},W=function(e){if("string"!==typeof e)throw new Error("not a string")},X=function(e){if(!Array.isArray(e))throw new Error("not an array")},A=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(l.a)(this,Object(p.a)(t).call(this,e))).validateJson=function(e){n.setState({updatedJson:e,error:!1});try{var t=JSON.parse(e);!function(e){console.log(e),W(e.title),X(e.nodes),X(e.options),e.nodes.forEach(J),e.options.forEach(M)}(t),n.props.updateStory(t)}catch(a){n.setState({error:!0})}},n.state={error:!1,updatedJson:JSON.stringify(e.story)},n}return Object(m.a)(t,e),Object(u.a)(t,[{key:"componentDidUpdate",value:function(e){e.story!==this.props.story&&this.setState({error:!1,updatedJson:JSON.stringify(this.props.story)})}},{key:"render",value:function(){var e=this,t=this.state,n=t.error,a=t.updatedJson;return r.a.createElement("div",{className:"json-tab"},r.a.createElement("p",{className:h()("valid-checker",{"valid-checker--valid":!n})},"Valid ",n&&r.a.createElement("i",{className:"fas fa-times-circle"}),!n&&r.a.createElement("i",{className:"fas fa-check-circle"})),r.a.createElement("div",{className:"json-wrapper"},r.a.createElement("textarea",{className:"json--text-area",value:a,onChange:function(t){return e.validateJson(t.target.value)}})))}}]),t}(r.a.Component),V=n(30),F=n(31),P=n(28),B=n(29),H=function(e,t,n){var a=e.nodes,r=Object(F.a)(),o=[].concat(Object(d.a)(a),[{type:"Normal",statement:"",id:r,optionIds:[]}]),i=e.options.findIndex((function(e){return e.id===t.id})),s=Object(c.a)({},t,{},"taste"===n&&{tasteId:r},{},"touch"===n&&{touchId:r},{},"listen"===n&&{listenId:r},{},"look"===n&&{lookId:r},{},"smell"===n&&{smellId:r}),u=Object(V.a)(i,s,e.options);return Object(c.a)({},e,{nodes:o,options:u})},z=function(e,t){var n=Object(P.a)([t],e.nodes),a=e.options.map((function(e){return Object(c.a)({},e,{tasteId:$(t,e.tasteId),touchId:$(t,e.touchId),smellId:$(t,e.smellId),listenId:$(t,e.listenId),lookId:$(t,e.lookId)})}));return Object(c.a)({},e,{nodes:n,options:a})},R=function(e,t){var n=Object(P.a)([t],e.options),a=e.nodes.map((function(e){return Object(c.a)({},e,{optionIds:e.optionIds.filter((function(e){return e!==t.id}))})}));return Object(c.a)({},e,{nodes:a,options:n})},$=function(e,t){return t===e.id?void 0:t},q=function(e,t){var n=Object(F.a)(),a=e.options,r=e.nodes.find((function(e){return e.id===t})),o=Object(c.a)({},r,{optionIds:[].concat(Object(d.a)(r.optionIds),[n])}),i=[].concat(Object(d.a)(a),[{id:n,item:""}]);return Object(c.a)({},G(e,o),{options:i})},G=function(e,t){var n=e.nodes,a=n.findIndex((function(e){return e.id===t.id})),r=Object(V.a)(a,t,n);return Object(c.a)({},e,{nodes:r})},K=function(e,t){var n=e.options,a=n.findIndex((function(e){return e.id===t.id})),r=Object(V.a)(a,t,n);return Object(c.a)({},e,{options:r})},Q=function(e,t,n){var a=Object(c.a)({},t,{optionIds:Object(B.a)([].concat(Object(d.a)(t.optionIds),[n]))});return Object(c.a)({},G(e,a))},Z=function(e,t){return e.filter((function(e){return e.id!==t}))},_=function(e){function t(){var e,n;Object(s.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(l.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(r)))).state={tab:"graph",story:{title:"",nodes:[{statement:"",type:"Normal",optionIds:[],id:"first-node"}],options:[]},nodeTracker:[],showLine:!1,lineCoordinates:{x1:0,y1:0,x2:0,y2:0}},n.updateTab=function(e){return n.setState({tab:e})},n.updateTitle=function(e){return n.setState({story:Object(c.a)({},n.state.story,{title:e})})},n.updateNode=function(e){n.setState({story:G(n.state.story,e)})},n.addOrUpdateNodeTracker=function(e,t,a,r,o,i){var c=n.state.nodeTracker,s=c.findIndex((function(t){return t.id===e})),u={id:e,x:a,y:r,type:t,width:o,height:i};-1===s?n.setState({nodeTracker:[].concat(Object(d.a)(c),[u])}):n.setState({nodeTracker:Object(V.a)(s,u,c)})},n.addNode=function(e,t){n.setState({story:H(n.state.story,e,t)})},n.removeNode=function(e){n.setState({story:z(n.state.story,e),nodeTracker:Z(n.state.nodeTracker,e.id)})},n.removeOption=function(e){n.setState({story:R(n.state.story,e),nodeTracker:Z(n.state.nodeTracker,e.id)})},n.addOption=function(e){n.updateStory(q(n.state.story,e))},n.updateOption=function(e){n.updateStory(K(n.state.story,e))},n.updateStory=function(e){return n.setState({story:e})},n.connectToOption=function(e,t){n.updateStory(Q(n.state.story,e,t))},n.drawLine=function(e){return n.setState({showLine:!0,lineCoordinates:e})},n.stopDrawingLine=function(){return n.setState({showLine:!1})},n}return Object(m.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this,t=this.state,n=t.tab,a=t.story,o=t.nodeTracker,i=t.showLine,d=t.lineCoordinates;return r.a.createElement("div",{className:"App"},r.a.createElement("div",{className:"tab-switcher"},r.a.createElement("button",{className:"switcher",title:"graph",onClick:function(){return e.updateTab("graph")}},r.a.createElement("i",{className:"fas fa-sitemap"})),r.a.createElement("button",{className:"switcher",title:"json",onClick:function(){return e.updateTab("json")}},r.a.createElement("i",{className:"far fa-file"}))),r.a.createElement("div",{className:"graph"===n?"":"tab--hidden"},r.a.createElement(U,{story:a,nodeTrackers:o,updateTitle:this.updateTitle,updateNode:this.updateNode,removeNode:this.removeNode,removeOption:this.removeOption,addOption:this.addOption,addNode:this.addNode,updateOption:this.updateOption,connectToOption:this.connectToOption,addOrUpdateNodeTracker:this.addOrUpdateNodeTracker,showLine:i,lineCoordinates:d,drawLine:this.drawLine,stopDrawingLine:this.stopDrawingLine})),r.a.createElement("div",{className:"json"===n?"":"tab--hidden"},r.a.createElement(A,{story:a,updateStory:this.updateStory})))}}]),t}(r.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(_,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[18,1,2]]]);
//# sourceMappingURL=main.77fa05a8.chunk.js.map