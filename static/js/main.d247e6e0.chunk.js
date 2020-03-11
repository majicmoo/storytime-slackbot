(this["webpackJsonpstory-maker"]=this["webpackJsonpstory-maker"]||[]).push([[0],{15:function(e,t,n){e.exports=n(23)},20:function(e,t,n){},21:function(e,t,n){},22:function(e,t,n){},23:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(13),i=n.n(o),d=(n(20),n(11)),c=n(4),s=n(5),u=n(6),l=n(8),p=n(7),m=n(9),f=(n(21),n(10)),h=n.n(f),v=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(l.a)(this,Object(p.a)(t).call(this,e))).ref=Object(a.createRef)(),n.startDragging=function(e){n.ref.current&&n.setState({dragging:!0,relX:e.pageX-n.ref.current.offsetLeft,relY:e.pageY-n.ref.current.offsetTop})},n.stopDragging=function(){n.setState({dragging:!1})},n.drag=function(e){var t=e.pageX-n.state.relX,a=e.pageY-n.state.relY;n.state.dragging&&(n.setState({x:t,y:a}),n.props.onUpdatePosition(t,a,n.width(),n.height()))},n.width=function(){var e;return(null===(e=n.ref.current)||void 0===e?void 0:e.clientWidth)||0},n.height=function(){var e;return(null===(e=n.ref.current)||void 0===e?void 0:e.clientHeight)||0},n.state={x:e.x,y:e.y,dragging:!1,relX:0,relY:0},n}return Object(m.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){this.props.onUpdatePosition(this.props.x,this.props.y,this.width(),this.height())}},{key:"componentDidUpdate",value:function(e,t){this.state.dragging&&!t.dragging?(document.addEventListener("mousemove",this.drag),document.addEventListener("mouseup",this.stopDragging)):!this.state.dragging&&t.dragging&&(document.removeEventListener("mousemove",this.drag),document.removeEventListener("mouseup",this.stopDragging))}},{key:"render",value:function(){var e=this.props.children,t=this.state,n=t.x,a=t.y,o=t.dragging;return r.a.createElement("div",{className:h()("draggable-div",{"draggable-div--dragging":o}),style:{left:"".concat(n,"px"),top:"".concat(a,"px")},ref:this.ref},r.a.createElement("div",{className:"drag-wrapper",onMouseDown:this.startDragging},r.a.createElement("i",{className:"fas fa-arrows-alt",title:"move node"})),e)}}]),t}(r.a.Component),y=function(e){var t=e.onClick;return r.a.createElement("button",{className:"button",onClick:t,title:"add node"},r.a.createElement("i",{className:"fas fa-plus-circle"}))},b=function(e){var t=e.type,n=e.currentType,a=e.updateType;return r.a.createElement("button",{className:h()("node-type",{"node-type--selected":t===n}),onClick:function(){return a(t)}},t)},g=function(e){var t=e.node,n=e.updateNode,a=e.addOption,o=e.removeNode,i=e.x,d=e.y,s=e.addOrUpdateNodeTracker,u=e.startNode,l=function(e){return n(Object(c.a)({},t,{type:e}))};return r.a.createElement(v,{x:i,y:d,onUpdatePosition:function(e,n,a,r){return s(t.id,"Node",e,n,a,r)}},r.a.createElement("div",{className:"node"},r.a.createElement("textarea",{placeholder:"Add a statement e.g. You walk into a dark room.",value:t.statement,onChange:function(e){return n(Object(c.a)({},t,{statement:e.target.value}))}}),r.a.createElement("div",{className:"node-type--wrapper"},!u&&r.a.createElement(b,{type:"Win",currentType:t.type,updateType:l}),r.a.createElement(b,{type:"Normal",currentType:t.type,updateType:l}),!u&&r.a.createElement(b,{type:"Death",currentType:t.type,updateType:l})),"Normal"===t.type&&r.a.createElement(y,{onClick:function(){return a(t.id)}}),!u&&r.a.createElement("button",{className:"button",title:"remove node",onClick:function(){return o(t)}},r.a.createElement("i",{className:"fas fa-minus-circle"}))))},O=function(e){var t=e.verb,n=e.addVerb,a=e.disabled;return r.a.createElement("div",{className:"verb"},r.a.createElement("p",null,t),!a&&r.a.createElement(y,{onClick:function(){return n(t)}}))},N=function(e){function t(){var e,n;Object(s.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(l.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(r)))).addNode=function(e){return n.props.addNode(n.props.option,e)},n}return Object(m.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this.props,t=e.option,n=e.updateOption,a=e.x,o=e.y,i=e.addOrUpdateNodeTracker,d=e.removeOption;return r.a.createElement(v,{x:a,y:o,onUpdatePosition:function(e,n,a,r){return i(t.id,"StoryOption",e,n,a,r)}},r.a.createElement("div",{className:"option"},r.a.createElement("div",{className:"option-top"},r.a.createElement("input",{value:t.item,placeholder:"item to interact with e.g. book",onChange:function(e){return n(Object(c.a)({},t,{item:e.target.value}))}}),r.a.createElement("div",null,r.a.createElement("button",{className:"button",title:"remove node",onClick:function(){return d(t)}},r.a.createElement("i",{className:"fas fa-minus-circle"})))),r.a.createElement("div",{className:"verbs"},r.a.createElement(O,{verb:"taste",addVerb:this.addNode,disabled:void 0!==t.tasteId}),r.a.createElement(O,{verb:"touch",addVerb:this.addNode,disabled:void 0!==t.touchId}),r.a.createElement(O,{verb:"smell",addVerb:this.addNode,disabled:void 0!==t.smellId}),r.a.createElement(O,{verb:"look",addVerb:this.addNode,disabled:void 0!==t.lookId}),r.a.createElement(O,{verb:"listen",addVerb:this.addNode,disabled:void 0!==t.listenId}))))}}]),t}(r.a.Component),E=(n(22),function(e){var t=e.x1,n=e.y1,a=e.x2,o=e.y2;return r.a.createElement("svg",{width:"500",height:"500",className:"line-wrapper"},r.a.createElement("line",{x1:t,y1:n,x2:a,y2:o,className:"line",stroke:"black"}))}),k=function(e){function t(){return Object(s.a)(this,t),Object(l.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this.props,t=e.nodeTracker,n=e.story,a=w(t,n),o=j(t,n);return r.a.createElement(r.a.Fragment,null,a.map((function(e,t){return r.a.createElement(E,Object.assign({},e,{key:"line-".concat(t)}))})),o.map((function(e,t){return r.a.createElement(E,Object.assign({},e,{key:"other-lines-".concat(t)}))})))}}]),t}(r.a.Component),j=function(e,t){return e.flatMap((function(n){var a=t.options.find((function(e){return e.id===n.id}));if(a){var r=[];return a.tasteId&&r.push(I(a.tasteId,e,n,0)),a.touchId&&r.push(I(a.touchId,e,n,1)),a.smellId&&r.push(I(a.smellId,e,n,2)),a.lookId&&r.push(I(a.lookId,e,n,3)),a.listenId&&r.push(I(a.listenId,e,n,4)),r}})).filter((function(e){return void 0!==e}))},I=function(e,t,n,a){var r=t.find((function(t){return t.id===e}));return r?S(n,r,a):void 0},w=function(e,t){return e.flatMap((function(n){var a=t.nodes.find((function(e){return e.id===n.id}));if(a)return T(e,a,n)})).filter((function(e){return void 0!==e}))},T=function(e,t,n){return t.optionIds.map((function(t){return e.find((function(e){return e.id===t}))})).filter((function(e){return void 0!==e})).map((function(e){return x(n,e)}))},x=function(e,t){return{x1:e.x+e.width/2,y1:e.y+e.height,x2:t.x+t.width/2,y2:t.y}},S=function(e,t,n){return{x1:e.x+n/5*e.width+.1*e.width,y1:e.y+e.height,x2:t.x+t.width/2,y2:t.y}},C=function(e){var t=e.story,n=e.nodeTracker,a=e.updateTitle,o=e.updateNode,i=e.updateOption,d=e.addOrUpdateNodeTracker,c=e.addOption,s=e.removeOption,u=e.addNode,l=e.removeNode;return r.a.createElement("div",null,r.a.createElement("input",{value:t.title,className:"title",placeholder:"Title",onChange:function(e){return a(e.target.value)}}),t.nodes.map((function(e,t){return r.a.createElement(g,{key:e.id,node:e,addOption:c,updateNode:o,removeNode:l,addOrUpdateNodeTracker:d,x:t,y:t,startNode:0===t})})),t.options.map((function(e,t){return r.a.createElement(N,{option:e,key:e.id,updateOption:i,removeOption:s,addOrUpdateNodeTracker:d,addNode:u,x:t,y:t})})),r.a.createElement(k,{story:t,nodeTracker:n}))},U=function(e){if(void 0===e||null===e)throw new Error("Missing node");if(V(e.id),V(e.statement),"Normal"!==e.type&&"Win"!==e.type&&"Death"!==e.type)throw new Error("bad node type");A(e.optionIds),e.optionIds.forEach(V)},D=function(e){V(e.id),V(e.item),J(e.tasteId),J(e.touchId),J(e.smellId),J(e.lookId),J(e.listenId)},J=function(e){void 0!==e&&V(e)},V=function(e){if("string"!==typeof e)throw new Error("not a string")},A=function(e){if(!Array.isArray(e))throw new Error("not an array")},Y=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(l.a)(this,Object(p.a)(t).call(this,e))).validateJson=function(e){n.setState({updatedJson:e,error:!1});try{var t=JSON.parse(e);!function(e){console.log(e),V(e.title),A(e.nodes),A(e.options),e.nodes.forEach(U),e.options.forEach(D)}(t),n.props.updateStory(t)}catch(a){n.setState({error:!0})}},n.state={error:!1,updatedJson:JSON.stringify(e.story)},n}return Object(m.a)(t,e),Object(u.a)(t,[{key:"componentDidUpdate",value:function(e){e.story!==this.props.story&&this.setState({error:!1,updatedJson:JSON.stringify(this.props.story)})}},{key:"render",value:function(){var e=this,t=this.state,n=t.error,a=t.updatedJson;return r.a.createElement("div",{className:"json-tab"},r.a.createElement("p",{className:h()("valid-checker",{"valid-checker--valid":!n})},"Valid ",n&&r.a.createElement("i",{className:"fas fa-times-circle"}),!n&&r.a.createElement("i",{className:"fas fa-check-circle"})),r.a.createElement("div",{className:"json-wrapper"},r.a.createElement("textarea",{className:"json--text-area",value:a,onChange:function(t){return e.validateJson(t.target.value)}})))}}]),t}(r.a.Component),L=n(26),M=n(27),W=n(25),X=function(e,t,n){var a=e.nodes,r=Object(M.a)(),o=[].concat(Object(d.a)(a),[{type:"Normal",statement:"",id:r,optionIds:[]}]),i=e.options.findIndex((function(e){return e.id===t.id})),s=Object(c.a)({},t,{},"taste"===n&&{tasteId:r},{},"touch"===n&&{touchId:r},{},"listen"===n&&{listenId:r},{},"look"===n&&{lookId:r},{},"smell"===n&&{smellId:r}),u=Object(L.a)(i,s,e.options);return Object(c.a)({},e,{nodes:o,options:u})},P=function(e,t){var n=Object(W.a)([t],e.nodes),a=e.options.map((function(e){return Object(c.a)({},e,{tasteId:F(t,e.tasteId),touchId:F(t,e.touchId),smellId:F(t,e.smellId),listenId:F(t,e.listenId),lookId:F(t,e.lookId)})}));return Object(c.a)({},e,{nodes:n,options:a})},B=function(e,t){var n=Object(W.a)([t],e.options),a=e.nodes.map((function(e){return Object(c.a)({},e,{optionIds:e.optionIds.filter((function(e){return e!==t.id}))})}));return Object(c.a)({},e,{nodes:a,options:n})},F=function(e,t){return t===e.id?void 0:t},H=function(e,t){var n=Object(M.a)(),a=e.options,r=e.nodes.find((function(e){return e.id===t})),o=Object(c.a)({},r,{optionIds:[].concat(Object(d.a)(r.optionIds),[n])}),i=[].concat(Object(d.a)(a),[{id:n,item:""}]);return Object(c.a)({},R(e,o),{options:i})},R=function(e,t){var n=e.nodes,a=n.findIndex((function(e){return e.id===t.id})),r=Object(L.a)(a,t,n);return Object(c.a)({},e,{nodes:r})},$=function(e,t){var n=e.options,a=n.findIndex((function(e){return e.id===t.id})),r=Object(L.a)(a,t,n);return Object(c.a)({},e,{options:r})},q=function(e,t){return e.filter((function(e){return e.id!==t}))},z=function(e){function t(){var e,n;Object(s.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(l.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(r)))).state={tab:"graph",story:{title:"",nodes:[{statement:"",type:"Normal",optionIds:[],id:"first-node"}],options:[]},nodeTracker:[]},n.updateTab=function(e){return n.setState({tab:e})},n.updateTitle=function(e){return n.setState({story:Object(c.a)({},n.state.story,{title:e})})},n.updateNode=function(e){n.setState({story:R(n.state.story,e)})},n.addOrUpdateNodeTracker=function(e,t,a,r,o,i){var c=n.state.nodeTracker,s=c.findIndex((function(t){return t.id===e})),u={id:e,x:a,y:r,type:t,width:o,height:i};-1===s?n.setState({nodeTracker:[].concat(Object(d.a)(c),[u])}):n.setState({nodeTracker:Object(L.a)(s,u,c)})},n.addNode=function(e,t){n.setState({story:X(n.state.story,e,t)})},n.removeNode=function(e){n.setState({story:P(n.state.story,e),nodeTracker:q(n.state.nodeTracker,e.id)})},n.removeOption=function(e){n.setState({story:B(n.state.story,e),nodeTracker:q(n.state.nodeTracker,e.id)})},n.addOption=function(e){n.updateStory(H(n.state.story,e))},n.updateOption=function(e){n.updateStory($(n.state.story,e))},n.updateStory=function(e){return n.setState({story:e})},n}return Object(m.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this,t=this.state,n=t.tab,a=t.story,o=t.nodeTracker;return r.a.createElement("div",{className:"App"},r.a.createElement("div",{className:"tab-switcher"},r.a.createElement("button",{className:"switcher",title:"graph",onClick:function(){return e.updateTab("graph")}},r.a.createElement("i",{className:"fas fa-sitemap"})),r.a.createElement("button",{className:"switcher",title:"json",onClick:function(){return e.updateTab("json")}},r.a.createElement("i",{className:"far fa-file"}))),r.a.createElement("div",{className:"graph"===n?"":"tab--hidden"},r.a.createElement(C,{story:a,nodeTracker:o,updateTitle:this.updateTitle,updateNode:this.updateNode,removeNode:this.removeNode,removeOption:this.removeOption,addOption:this.addOption,addNode:this.addNode,updateOption:this.updateOption,addOrUpdateNodeTracker:this.addOrUpdateNodeTracker})),r.a.createElement("div",{className:"json"===n?"":"tab--hidden"},r.a.createElement(Y,{story:a,updateStory:this.updateStory})))}}]),t}(r.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(z,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[15,1,2]]]);
//# sourceMappingURL=main.d247e6e0.chunk.js.map