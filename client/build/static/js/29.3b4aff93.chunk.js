(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[29],{171:function(e,t,c){"use strict";c.d(t,"b",(function(){return o})),c.d(t,"d",(function(){return d})),c.d(t,"c",(function(){return j})),c.d(t,"g",(function(){return u})),c.d(t,"f",(function(){return b})),c.d(t,"a",(function(){return p})),c.d(t,"e",(function(){return h}));var n=c(5),r=c.n(n),a=c(36),i=c(13),s=c(15),l=c.n(s),o=function(){var e=Object(i.a)(r.a.mark((function e(t,c){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,l.a.post("".concat("http://localhost:8000/api","/work"),Object(a.a)({},t),{headers:{authtoken:c}});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t,c){return e.apply(this,arguments)}}(),d=function(){var e=Object(i.a)(r.a.mark((function e(){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,l.a.get("".concat("http://localhost:8000/api","/works"));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),j=function(){var e=Object(i.a)(r.a.mark((function e(t){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,l.a.get("".concat("http://localhost:8000/api","/work/").concat(t));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),u=function(){var e=Object(i.a)(r.a.mark((function e(t,c,n){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,l.a.put("".concat("http://localhost:8000/api","/work/").concat(t),Object(a.a)({},c),{headers:{authtoken:n}});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t,c,n){return e.apply(this,arguments)}}(),b=function(){var e=Object(i.a)(r.a.mark((function e(t,c){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,l.a.delete("".concat("http://localhost:8000/api","/work/").concat(t),{headers:{authtoken:c}});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t,c){return e.apply(this,arguments)}}(),p=function(){var e=Object(i.a)(r.a.mark((function e(t,c){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",l.a.post("".concat("http://localhost:8000/api","/addWork"),{work:t},{headers:{authtoken:c}}));case 1:case"end":return e.stop()}}),e)})));return function(t,c){return e.apply(this,arguments)}}(),h=function(){var e=Object(i.a)(r.a.mark((function e(t){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",l.a.post("".concat("http://localhost:8000/api","/workItems"),{},{headers:{authtoken:t}}));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},175:function(e,t,c){"use strict";c.d(t,"d",(function(){return l})),c.d(t,"a",(function(){return o})),c.d(t,"b",(function(){return d})),c.d(t,"c",(function(){return j}));var n=c(5),r=c.n(n),a=c(13),i=c(15),s=c.n(i),l=function(){var e=Object(a.a)(r.a.mark((function e(t,c){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s.a.post("".concat("http://localhost:8000/api","/slider"),t,{headers:{authtoken:c}});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t,c){return e.apply(this,arguments)}}(),o=function(){var e=Object(a.a)(r.a.mark((function e(t){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s.a.get("".concat("http://localhost:8000/api","/slide/").concat(t));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),d=function(){var e=Object(a.a)(r.a.mark((function e(){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s.a.get("".concat("http://localhost:8000/api","/slides"));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),j=function(){var e=Object(a.a)(r.a.mark((function e(t,c){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s.a.delete("".concat("http://localhost:8000/api","/slider/").concat(t),{headers:{authtoken:c}});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t,c){return e.apply(this,arguments)}}()},200:function(e,t,c){"use strict";var n=c(36),r=c(103),a=c(0),i=c(123),s=c(664),l=c(124),o=c(248),d=c(125),j=c(19),u=c(27),b=c(1),p=i.a.Header,h=i.a.Content,x=(i.a.Footer,i.a.Sider),m=s.a.SubMenu;t.a=function(e){var t=Object(a.useState)(!0),c=Object(r.a)(t,2),f=c[0],O=c[1],g=Object(j.c)((function(e){return Object(n.a)({},e)})),y=g.sideMenu,v=g.globalDiscount,k=Object(j.b)();Object(a.useEffect)((function(){O(y)}),[]);return Object(b.jsxs)(i.a,{style:{minHeight:"100vh"},children:[Object(b.jsxs)(x,{width:"250",collapsible:!0,collapsed:f,onCollapse:function(){k({type:"SET_VISIBLE_SIDEMENU",payload:!f}),O(!f)},style:{overflow:"hidden"},children:[Object(b.jsx)("div",{className:" p-3",children:Object(b.jsx)("img",{style:{width:"210px"},src:"".concat("/images/logo","/logo.png")})}),Object(b.jsxs)(s.a,{theme:"dark",style:{color:"white"},defaultSelectedKeys:["1"],mode:"inline",children:[Object(b.jsx)(m,{icon:Object(b.jsx)(l.a,{}),title:"\u041f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044c",children:Object(b.jsx)(s.a.Item,{children:Object(b.jsx)(u.b,{to:"/user/password",children:"\u041f\u0430\u0440\u043e\u043b\u044c"})},"2")},"sub1"),Object(b.jsx)(m,{icon:Object(b.jsx)(o.a,{}),title:"\u041a\u043e\u0440\u0437\u0438\u043d\u0430",children:Object(b.jsx)(s.a.Item,{children:Object(b.jsx)(u.b,{to:"/user/cart",children:"\u041a\u043e\u0440\u0437\u0438\u043d\u0430"})},"1")},"card"),Object(b.jsx)("br",{}),Object(b.jsx)("hr",{style:{border:"1px solid white"}}),Object(b.jsx)(m,{icon:Object(b.jsx)(d.a,{}),title:"\u0421\u043a\u0438\u0434\u043a\u0430",children:Object(b.jsx)(s.a.Item,{children:Object(b.jsxs)("div",{className:"switch",style:{display:"flex",alignItems:"center"},children:[Object(b.jsx)("span",{className:"ml-3 mr-3",children:"\u0421\u043a\u0438\u0434\u043a\u0430"}),Object(b.jsx)("input",{checked:v,type:"checkbox",onChange:function(){k({type:"SET_DISCOUNT",payload:!v})}})]})},"12")},"discount")]})]}),Object(b.jsxs)(i.a,{className:"site-layout",style:{padding:0,backgroundColor:"white"},children:[Object(b.jsx)(p,{className:"site-layout-background pl-2",style:{padding:0,backgroundColor:"#404a57",display:"flex",justifyContent:"center"},children:e.name?Object(b.jsx)("span",{style:{fontSize:"1rem",color:"white"},children:e.name}):null}),Object(b.jsx)(h,{style:{margin:"0 0px"},className:"p-2",children:e.children?e.children:null})]})]})}},269:function(e,t,c){e.exports={printContainer:"PrintKP_printContainer__3WpZ_"}},322:function(e,t,c){"use strict";c.r(t);var n=c(36),r=c(103),a=c(0),i=c(268),s=(c(269),c(40)),l=c(171),o=c(19),d=c(1);t.default=function(){var e=Object(a.useState)([]),t=Object(r.a)(e,2),c=t[0],j=t[1],u=Object(a.useState)({}),b=Object(r.a)(u,2),p=b[0],h=b[1],x=Object(o.c)((function(e){return Object(n.a)({},e)})).user,m=Object(a.useRef)(),f=Object(i.useReactToPrint)({content:function(){return m.current},pageStyle:"padding-top: 200px, width:  200px"});return console.log("cart",c),console.log("work",p),Object(a.useEffect)((function(){Object(s.b)(x.token).then((function(e){j(e.data.cart),Object(l.e)(x.token).then((function(e){h(e.data.work)}))}))}),[]),Object(d.jsxs)("div",{"\u0441lassName":"container",children:[Object(d.jsx)("div",{className:"container pt-2",children:Object(d.jsx)("div",{className:"btn btn-danger pt-2",onClick:f,children:"\u0420\u0430\u0441\u043f\u0435\u0447\u0430\u0442\u0430\u0442\u044c"})}),Object(d.jsx)("div",{className:"container",pageStyle:{padding:"30px"},ref:m,children:Object(d.jsxs)("div",{className:"p-3",children:[Object(d.jsxs)("div",{children:[Object(d.jsx)("img",{style:{width:"200px"},src:"".concat("/images/logo","/logo.svg")}),Object(d.jsx)("br",{}),Object(d.jsx)("hr",{className:"float-left",style:{width:"300px"}}),Object(d.jsx)("br",{})]}),Object(d.jsxs)("div",{style:{padding:"0px",marging:"0px",paddingLeft:"10px",fontSize:"0.8rem",marginTop:"20px"},children:[Object(d.jsx)("div",{style:{padding:"0px",marging:"0px"},children:"392027 \u0422\u0430\u043c\u0431\u043e\u0432\u0441\u043a\u0430\u044f \u043e\u0431\u043b., \u0433.\u0422\u0430\u043c\u0431\u043e\u0432,"}),Object(d.jsx)("div",{style:{padding:"0px",marging:"0px"},children:"\u0410\u0433\u0430\u043f\u043a\u0438\u043d\u0430 25\u0410, \u0421\u0438\u0441\u0442\u0435\u043c\u044b \u0431\u0435\u0437\u043e\u043f\u0430\u0441\u043d\u043e\u0441\u0442\u0438 \u041a\u0430\u0439\u043c\u0430\u043d."}),Object(d.jsx)("div",{style:{padding:"0px",marging:"0px"},children:"\u0420\u0435\u0436\u0438\u043c \u0440\u0430\u0431\u043e\u0442\u044b: \u043f\u043d-\u0432\u0441 9:00-18:00 (\u0431\u0435\u0437 \u0432\u044b\u0445\u043e\u0434\u043d\u044b\u0445)"}),Object(d.jsx)("div",{style:{padding:"0px",marging:"0px"},children:"\u041d\u0430\u0448\u0438 \u043a\u043e\u043d\u0442\u0430\u043a\u0442\u044b:"}),Object(d.jsx)("div",{style:{padding:"0px",marging:"0px"},children:"\u0422\u0435\u043b: 8 (4752) 42-47-27"}),Object(d.jsx)("div",{style:{padding:"0px",marging:"0px"},children:"\u0422\u0435\u043b: +7 920 233-34-34"}),Object(d.jsx)("div",{style:{padding:"0px",marging:"0px"},children:"Mail: mail@kaymantex.ru"})]}),Object(d.jsx)("br",{}),Object(d.jsxs)("div",{className:"text-center container",style:{fontSize:"1rem",fontWeight:"bold"},children:["\u041a\u043e\u043c\u043c\u0435\u0440\u0447\u0435\u0441\u043a\u043e\u0435 \u043f\u0440\u0435\u0434\u043b\u043e\u0436\u0435\u043d\u0438\u0435 \u2116 ",Date.now()," \u043e\u0442 ",(new Date).toLocaleString()]}),Object(d.jsxs)("div",{className:"float-right",style:{fontSize:"1rem",fontWeight:"bold",marginBottom:"10px"},children:["\u0418\u0422\u041e\u0413\u041e: ",Object.keys(p).reduce((function(e,t){return e+p[t].coast*+p[t].count}),0)+c.reduce((function(e,t){return e+t.coast*+t.count}),0)," \u0440\u0443\u0431."]}),Object(d.jsx)("br",{}),Object(d.jsx)("hr",{}),Object(d.jsxs)("div",{className:"float-right",style:{fontSize:"1rem",fontWeight:"bold",marginBottom:"10px"},children:["C\u0442\u043e\u0438\u043c\u043e\u0441\u0442\u044c \u043e\u0431\u043e\u0440\u0443\u0434\u043e\u0432\u0430\u043d\u0438\u044f: ",c.reduce((function(e,t){return e+t.coast*+t.count}),0)," \u0440\u0443\u0431."]}),Object(d.jsxs)("table",{className:"table  table-sm pt-3 ",children:[Object(d.jsx)("thead",{children:Object(d.jsxs)("tr",{className:"text-center",children:[Object(d.jsx)("td",{scope:"col",style:{fontWeight:"bold",fontSize:"0.9rem",verticalAlign:"middle",border:"1px solid black"},children:"\u2116"}),Object(d.jsx)("td",{scope:"col",style:{fontWeight:"bold",fontSize:"0.9rem",verticalAlign:"middle",border:"1px solid black"},children:"\u0418\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u0435"}),Object(d.jsx)("td",{scope:"col",style:{fontWeight:"bold",fontSize:"0.9rem",verticalAlign:"middle",border:"1px solid black"},children:"\u041d\u0430\u0438\u043c\u0435\u043d\u043e\u0432\u0430\u043d\u0438\u0435"}),Object(d.jsx)("td",{scope:"col",style:{fontWeight:"bold",fontSize:"0.9rem",verticalAlign:"middle",border:"1px solid black"},children:"\u0411\u0440\u0435\u043d\u0434"}),Object(d.jsx)("td",{scope:"col",style:{fontWeight:"bold",fontSize:"0.9rem",verticalAlign:"middle",border:"1px solid black"},children:"\u041e\u043f\u0438\u0441\u0430\u043d\u0438\u0435"}),Object(d.jsx)("td",{scope:"col",style:{fontWeight:"bold",fontSize:"0.9rem",verticalAlign:"middle",border:"1px solid black"},children:"\u041a\u043e\u043b-\u0432\u043e"}),Object(d.jsx)("td",{scope:"col",style:{fontWeight:"bold",fontSize:"0.9rem",verticalAlign:"middle",border:"1px solid black"},children:"\u0426\u0435\u043d\u0430"}),Object(d.jsx)("td",{scope:"col",style:{fontWeight:"bold",fontSize:"0.9rem",verticalAlign:"middle",border:"1px solid black"},children:"\u0421\u0443\u043c\u043c\u0430"})]})}),Object(d.jsx)("tbody",{className:"text-center",children:c.map((function(e,t){var c;return c=e.images.length>0?"".concat("/images/product","/").concat(e.images[0]):"/images/product/default.png",Object(d.jsxs)("tr",{children:[Object(d.jsx)("td",{style:{fontSize:"0.9rem",verticalAlign:"middle",border:"1px solid black"},children:t+1}),Object(d.jsx)("td",{style:{fontSize:"0.9rem",verticalAlign:"middle",border:"1px solid black"},children:Object(d.jsx)("img",{style:{maxWidth:"90px",maxHeight:"70px"},alt:"picture",src:c})}),Object(d.jsx)("td",{style:{fontSize:"0.9rem",verticalAlign:"middle",border:"1px solid black"},children:e.name}),Object(d.jsx)("td",{style:{fontSize:"0.9rem",verticalAlign:"middle",border:"1px solid black"},children:e.brand}),Object(d.jsx)("td",{style:{fontSize:"0.9rem",verticalAlign:"middle",border:"1px solid black"},children:Object(d.jsxs)("div",{children:[Object(d.jsx)("p",{style:{margin:"0px",padding:"0px",fontSize:"0.7rem",fontWeight:"bold"},children:"".concat(e.type)}),Object(d.jsx)("p",{style:{margin:"0px",padding:"0px",fontSize:"0.7rem"},children:"".concat(e.params[1][0]," ").concat(e.params[1][1])}),Object(d.jsx)("p",{style:{margin:"0px",padding:"0px",fontSize:"0.7rem"},children:"".concat(e.params[2][0]," ").concat(e.params[2][1])})]})}),Object(d.jsx)("td",{style:{fontSize:"0.9rem",verticalAlign:"middle",border:"1px solid black"},children:e.count}),Object(d.jsx)("td",{style:{fontSize:"0.9rem",verticalAlign:"middle",border:"1px solid black"},children:e.coast}),Object(d.jsx)("td",{style:{fontSize:"0.9rem",verticalAlign:"middle",border:"1px solid black"},children:+e.count*+e.coast})]})}))})]}),Object(d.jsxs)("div",{className:"float-right",style:{fontSize:"1rem",fontWeight:"bold",marginBottom:"10px"},children:["\u0441\u0442\u043e\u0438\u043c\u043e\u0441\u0442\u044c \u0440\u0430\u0431\u043e\u0442: ",Object.keys(p).reduce((function(e,t){return e+p[t].coast*+p[t].count}),0)," \u0440\u0443\u0431."]}),Object(d.jsxs)("table",{className:"table  table-sm",children:[Object(d.jsx)("thead",{children:Object(d.jsxs)("tr",{className:"text-center",children:[Object(d.jsx)("td",{scope:"col",style:{fontWeight:"bold",fontSize:"0.9rem",verticalAlign:"middle",border:"1px solid black"},children:"\u2116"}),Object(d.jsx)("td",{scope:"col",style:{fontWeight:"bold",fontSize:"0.9rem",verticalAlign:"middle",border:"1px solid black"},children:"\u0412\u0438\u0434 \u0440\u0430\u0431\u043e\u0442"}),Object(d.jsx)("td",{scope:"col",style:{fontWeight:"bold",fontSize:"0.9rem",verticalAlign:"middle",border:"1px solid black"},children:"\u041a\u043e\u043b-\u0432\u043e"}),Object(d.jsx)("td",{scope:"col",style:{fontWeight:"bold",fontSize:"0.9rem",verticalAlign:"middle",border:"1px solid black"},children:"\u0426\u0435\u043d\u0430"}),Object(d.jsx)("td",{scope:"col",style:{fontWeight:"bold",fontSize:"0.9rem",verticalAlign:"middle",border:"1px solid black"},children:"\u0421\u0443\u043c\u043c\u0430"})]})}),Object(d.jsx)("tbody",{className:"text-center",children:Object.keys(p).map((function(e,t){return Object(d.jsxs)("tr",{children:[Object(d.jsx)("td",{scope:"col",style:{fontSize:"0.9rem",verticalAlign:"middle",border:"1px solid black"},children:t+1}),Object(d.jsx)("td",{scope:"col",style:{fontSize:"0.9rem",verticalAlign:"middle",border:"1px solid black"},children:p[e].name}),Object(d.jsx)("td",{scope:"col",style:{fontSize:"0.9rem",verticalAlign:"middle",border:"1px solid black"},children:p[e].count}),Object(d.jsx)("td",{scope:"col",style:{fontSize:"0.9rem",verticalAlign:"middle",border:"1px solid black"},children:p[e].coast}),Object(d.jsx)("td",{scope:"col",style:{fontSize:"0.9rem",verticalAlign:"middle",border:"1px solid black"},children:+p[e].count*+p[e].coast})]})}))})]})]})})]})}},417:function(e,t){},419:function(e,t){},466:function(e,t){},467:function(e,t){},614:function(e,t,c){e.exports={btnAdd:"Cart_btnAdd__3psTt"}},654:function(e,t,c){"use strict";c.r(t);var n=c(41),r=c(5),a=c.n(r),i=c(147),s=c(13),l=c(36),o=c(103),d=c(0),j=c(200),u=c(40),b=c(171),p=c(19),h=c(61),x=(c(175),c(621)),m=c(28),f=c(27),O=(c(322),c(411),c(614)),g=c.n(O),y=c(1);t.default=function(){var e=Object(d.useState)([]),t=Object(o.a)(e,2),c=t[0],r=t[1],O=Object(d.useState)([]),v=Object(o.a)(O,2),k=v[0],S=v[1],z=Object(d.useState)({}),A=Object(o.a)(z,2),w=A[0],N=A[1],W=Object(d.useState)(!1),_=Object(o.a)(W,2),C=_[0],D=_[1],T=Object(d.useState)(0),I=Object(o.a)(T,2),R=I[0],E=I[1],M=Object(d.useState)(0),K=Object(o.a)(M,2),B=K[0],H=K[1],F=Object(d.useState)(0),L=Object(o.a)(F,2),P=L[0],J=L[1],U=Object(p.c)((function(e){return Object(l.a)({},e)})),V=U.user,Z=U.globalDiscount,q=Object(p.b)();console.log("cart",c),Object(d.useMemo)((function(){J(R+B)}),[R,B]),Object(d.useState)(Object(s.a)(a.a.mark((function e(){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,D(!0),e.next=4,Object(u.b)(V.token).then((function(e){var t=[],c=Object(i.a)(e.data.cart);c.map((function(e){return t.push(e._id)})),t.reverse(),Object(u.c)(t,V.token).then((function(e){for(var t=e.data.cart,n=0;n<e.data.cart.length;n++)t[n].count=c[n].count;r(t.reverse()),E(t.reduce((function(e,t){return e+t.count*t.coast}),0))}))}));case 4:return e.next=6,Object(b.d)().then((function(e){S(e.data)}));case 6:return e.next=8,Object(b.e)(V.token).then((function(e){N(e.data.work),H(Object.keys(e.data.work).reduce((function(t,c){return t+e.data.work[c].coast*e.data.work[c].count}),0))}));case 8:D(!1),e.next=16;break;case 11:e.prev=11,e.t0=e.catch(0),D(!1),401===e.t0.response.status&&m.b.error(e.t0.response.data),window.location.reload();case 16:case"end":return e.stop()}}),e,null,[[0,11]])}))),[]);var G=function(){var e=Object(s.a)(a.a.mark((function e(){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return D(!0),e.next=3,Object(u.a)([],V.token).then((function(e){q({type:"ADD_TO_CART",payload:[]}),r([])}));case 3:E(0),D(!1);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),Q=function(){var e=Object(s.a)(a.a.mark((function e(t,n){var s,l;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(s=t.target.value)<1&&(s=1),l=c.map((function(e){return e.name===n.name&&(e.count=s),e})),q({type:"ADD_TO_CART",payload:Object(i.a)(l)}),r(Object(i.a)(l)),e.next=7,Object(u.a)(Object(i.a)(l),V.token).then((function(e){}));case 7:console.log("reset sum"),E(c.reduce((function(e,t){return e+t.count*t.coast}),0)),H(Object.keys(w).reduce((function(e,t){return e+w[t].coast*w[t].count}),0));case 8:case"end":return e.stop()}}),e)})));return function(t,c){return e.apply(this,arguments)}}(),X=function(){var e=Object(s.a)(a.a.mark((function e(t,n){var s;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s=c.filter((function(e){if(e!==n)return e})),q({type:"ADD_TO_CART",payload:Object(i.a)(s)}),r(Object(i.a)(s)),e.next=5,Object(u.a)(Object(i.a)(s),V.token).then((function(e){})).catch((function(e){console.log("err in cart:",e),400===e.response.status&&m.b.error(e.response.data)}));case 5:E(s.reduce((function(e,t){return e+t.count*t.coast}),0));case 6:case"end":return e.stop()}}),e)})));return function(t,c){return e.apply(this,arguments)}}(),Y=function(){w[Date.now()]={},N(Object(l.a)({},w))},$=function(){var e=Object(s.a)(a.a.mark((function e(){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return D(!0),e.next=3,Object(b.a)({},V.token).then((function(e){q({type:"ADD_TO_WORK",payload:{}}),N({}),m.b.success("\u0421\u043f\u0438\u0441\u043e\u043a \u0440\u0430\u0431\u043e\u0442 \u043e\u0447\u0438\u0449\u0435\u043d")}));case 3:H(0),D(!1);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),ee=function(e,t){return Object(y.jsx)("div",{children:Object(y.jsxs)("select",{style:{fontSize:"0.9rem"},name:"category",className:"form-control",onChange:function(t){return function(e,t){var c=k.find((function(t){return e.target.value===t._id})),r={};r.name=c.name,r.coast=c.coast,r.count=1,q({type:"ADD_TO_WORK",payload:Object(l.a)(Object(l.a)({},w),{},Object(n.a)({},t,r))});var a=Object(l.a)(Object(l.a)({},w),{},Object(n.a)({},t,r));H(Object.keys(a).reduce((function(e,t){return e+a[t].coast*a[t].count}),0)),N(Object(l.a)(Object(l.a)({},w),{},Object(n.a)({},t,r))),Object(b.a)(Object(l.a)(Object(l.a)({},w),{},Object(n.a)({},t,r)),V.token).then((function(e){m.b.success("\u0420\u0430\u0431\u043e\u0442\u0430 \u0434\u043e\u0431\u0430\u0432\u043b\u0435\u043d\u0430"),console.log(e.data)}))}(t,e)},children:[Object(y.jsx)("option",{value:"all",children:"\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0432\u0438\u0434 \u0440\u0430\u0431\u043e\u0442"},"1"),k.length>0&&k.map((function(e){return Object(y.jsx)("option",{selected:e.name===t,value:e._id,children:e.name},e._id)}))]})})};return Object(y.jsx)(j.a,{name:"\u041a\u043e\u0440\u0437\u0438\u043d\u0430",children:C?Object(y.jsx)(h.a,{}):Object(y.jsxs)(y.Fragment,{children:[Object(y.jsx)("div",{className:"float-right    btn text-primary",children:"\u0418\u0442\u043e\u0433\u043e: ".concat(P," \u0440\u0443\u0431.")}),Object(y.jsx)("br",{}),Object(y.jsxs)("div",{className:"mt-2 container",children:[Object(y.jsx)(f.b,{className:"float-left  btn text-primary",to:"/user/print",children:"\u0440\u0430\u0441\u043f\u0435\u0447\u0430\u0442\u0430\u0442\u044c \u041a\u041f"}),Object(y.jsx)("br",{})]}),Object(y.jsx)("hr",{}),Object(y.jsxs)("div",{className:"container",children:[Object(y.jsx)("div",{onClick:G,className:"btn btn-outline-danger float-left",children:"\u043e\u0447\u0438\u0441\u0442\u0438\u0442\u044c \u043a\u043e\u0440\u0437\u0438\u043d\u0443"}),Object(y.jsx)("div",{className:"float-right btn text-primary",children:"\u0418\u0442\u043e\u0433\u043e (\u043c\u0430\u0442\u0435\u0440\u0438\u0430\u043b\u044b): ".concat(R," \u0440\u0443\u0431.")}),Object(y.jsxs)("table",{className:"table table-bordered table-sm",children:[Object(y.jsx)("thead",{className:"thead-dark",children:Object(y.jsxs)("tr",{className:"text-center",children:[Object(y.jsx)("th",{scope:"col",style:{fontSize:"0.9rem",verticalAlign:"middle"},children:"\u2116"}),Object(y.jsx)("th",{scope:"col",style:{fontSize:"0.9rem",verticalAlign:"middle"},children:"\u0418\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u0435"}),Object(y.jsx)("th",{scope:"col",style:{fontSize:"0.9rem",verticalAlign:"middle"},children:"\u041d\u0430\u0438\u043c\u0435\u043d\u043e\u0432\u0430\u043d\u0438\u0435"}),Object(y.jsx)("th",{scope:"col",style:{fontSize:"0.9rem",verticalAlign:"middle"},children:"\u0411\u0440\u0435\u043d\u0434"}),Object(y.jsx)("th",{scope:"col",style:{fontSize:"0.9rem",verticalAlign:"middle"},children:"\u041e\u043f\u0438\u0441\u0430\u043d\u0438\u0435"}),Object(y.jsx)("th",{scope:"col",style:{fontSize:"0.9rem",verticalAlign:"middle"},children:"\u041a\u043e\u043b-\u0432\u043e"}),Object(y.jsx)("th",{scope:"col",style:{fontSize:"0.9rem",verticalAlign:"middle"},children:"\u0426\u0435\u043d\u0430"}),Z&&Object(y.jsx)("th",{scope:"col",style:{fontSize:"0.9rem",verticalAlign:"middle",width:"100px"},children:"\u0426\u0435\u043d\u0430 \u0441\u043e \u0441\u043a\u0438\u0434\u043a\u043e\u0439"}),Object(y.jsx)("th",{scope:"col",style:{fontSize:"0.9rem",verticalAlign:"middle"},children:"\u0421\u0443\u043c\u043c\u0430"}),Object(y.jsx)("th",{scope:"col",style:{fontSize:"0.9rem",verticalAlign:"middle"},children:"\u0423\u0434\u0430\u043b\u0438\u0442\u044c"})]})}),Object(y.jsx)("tbody",{className:"text-center",children:c.map((function(e,t){var c;return c=e.images.length>0?"".concat("/images/product","/").concat(e.images[0]):"/images/product/default.png",Object(y.jsxs)("tr",{children:[Object(y.jsx)("td",{style:{fontSize:"0.9rem",verticalAlign:"middle"},children:t+1}),Object(y.jsx)("td",{style:{fontSize:"0.9rem",verticalAlign:"middle"},children:Object(y.jsx)("img",{style:{maxWidth:"90px",maxHeight:"70px"},alt:"picture",src:c})}),Object(y.jsx)("th",{align:"center",style:{fontSize:"0.9rem",verticalAlign:"middle"},children:Object(y.jsx)("div",{children:e.name})}),Object(y.jsx)("td",{style:{fontSize:"0.9rem",verticalAlign:"middle"},children:e.brand}),Object(y.jsx)("td",{style:{fontSize:"0.9rem",verticalAlign:"middle"},children:Object(y.jsxs)("div",{children:[Object(y.jsx)("p",{style:{margin:"0px",padding:"0px",fontSize:"0.7rem",fontWeight:"bold"},children:"".concat(e.type)}),Object(y.jsx)("p",{style:{margin:"0px",padding:"0px",fontSize:"0.7rem"},children:"".concat(e.params[1][0]," ").concat(e.params[1][1])}),Object(y.jsx)("p",{style:{margin:"0px",padding:"0px",fontSize:"0.7rem"},children:"".concat(e.params[2][0]," ").concat(e.params[2][1])})]})}),Object(y.jsx)("td",{className:"text-center",style:{fontSize:"0.9rem",verticalAlign:"middle",maxWidth:"80px"},children:Object(y.jsx)("input",{type:"number",className:"form-control text-center",style:{fontSize:"0.9rem"},onChange:function(t){return Q(t,e)},value:e.count})}),Object(y.jsxs)("td",{style:{fontSize:"0.9rem",verticalAlign:"middle"},children:[e.coast," p."]}),Z&&Object(y.jsx)("td",{style:{fontSize:"0.9rem",verticalAlign:"middle"},children:Z&&V.discount&&V.discount[e.brandSlug]&&V.discount[e.brandSlug].discount&&!e.promotion?Object(y.jsxs)(y.Fragment,{children:[Object(y.jsx)("span",{style:{color:"red"},children:"".concat(Math.round(e.coast*((100-V.discount[e.brandSlug].discount)/100)))}),Object(y.jsx)("span",{children:" p."})]}):"-"}),Object(y.jsxs)("td",{style:{fontSize:"0.9rem",verticalAlign:"middle"},children:[e.coast*e.count," \u0440."]}),Object(y.jsx)("td",{style:{verticalAlign:"middle"},children:Object(y.jsx)(x.a,{className:"text-danger",onClick:function(t){return X(t,e)}})})]},e._id)}))})]})]}),Object(y.jsx)("br",{}),Object(y.jsxs)("div",{className:"container",children:[Object(y.jsx)("div",{onClick:$,className:"btn btn-outline-danger float-left",children:"\u043e\u0447\u0438\u0441\u0442\u0438\u0442\u044c \u0440\u0430\u0431\u043e\u0442\u044b"}),Object(y.jsx)("div",{className:"float-right btn text-primary",children:"\u0418\u0442\u043e\u0433\u043e (\u0440\u0430\u0431\u043e\u0442\u044b): ".concat(B," \u0440\u0443\u0431.")}),Object(y.jsxs)("table",{className:"table table-bordered table-sm",children:[Object(y.jsx)("thead",{className:"thead-dark",children:Object(y.jsxs)("tr",{children:[Object(y.jsx)("th",{scope:"col",style:{fontSize:"0.9rem",verticalAlign:"middle"},children:"\u2116"}),Object(y.jsx)("th",{scope:"col",style:{fontSize:"0.9rem",verticalAlign:"middle"},children:"\u0412\u0438\u0434 \u0440\u0430\u0431\u043e\u0442"}),Object(y.jsx)("th",{scope:"col",style:{fontSize:"0.9rem",verticalAlign:"middle"},children:"\u041a\u043e\u043b-\u0432\u043e"}),Object(y.jsx)("th",{scope:"col",style:{fontSize:"0.9rem",verticalAlign:"middle"},children:"\u0426\u0435\u043d\u0430"}),Object(y.jsx)("th",{scope:"col",style:{fontSize:"0.9rem",verticalAlign:"middle"},children:"\u0421\u0443\u043c\u043c\u0430"}),Object(y.jsx)("th",{scope:"col",style:{fontSize:"0.9rem",verticalAlign:"middle"},children:"\u0423\u0434\u0430\u043b\u0438\u0442\u044c"})]})}),Object(y.jsx)("tbody",{className:" text-center",children:Object.keys(w).map((function(e,t){return Object(y.jsxs)("tr",{style:{fontSize:"0.9rem"},children:[Object(y.jsx)("td",{style:{fontSize:"0.9rem",verticalAlign:"middle"},children:t+1}),Object(y.jsx)("td",{style:{fontSize:"0.9rem",verticalAlign:"middle"},children:ee(e,w[e].name)}),Object(y.jsx)("td",{style:{fontSize:"0.9rem",verticalAlign:"middle",maxWidth:"80px"},children:Object(y.jsx)("input",{type:"number",className:"form-control text-center",size:"sm",style:{fontSize:"0.9rem"},onChange:function(t){return function(e,t){var c=e.target.value;c<1&&(c=1),w[t].count=c,q({type:"ADD_TO_WORK",payload:Object(l.a)({},w)}),N(Object(l.a)({},w)),Object(b.a)(Object(l.a)({},w),V.token).then((function(e){m.b.success("\u0420\u0430\u0431\u043e\u0442\u0430 \u0438\u0437\u043c\u0435\u043d\u0435\u043d\u0430"),console.log(e.data)})),H(Object.keys(w).reduce((function(e,t){return e+w[t].coast*w[t].count}),0))}(t,e)},value:w[e].count})}),Object(y.jsx)("td",{style:{fontSize:"0.9rem",verticalAlign:"middle"},children:w[e].coast?"".concat(w[e].coast," \u0440."):null}),Object(y.jsx)("td",{style:{fontSize:"0.9rem",verticalAlign:"middle"},children:w[e].coast&&w[e].count?"".concat(w[e].coast*w[e].count," p."):null}),Object(y.jsx)("td",{style:{fontSize:"0.9rem",verticalAlign:"middle"},children:Object(y.jsx)(x.a,{className:"text-danger",onClick:function(t){return function(e,t){console.log(t);var c=Object(l.a)({},w);delete c[t],N(c),Object(b.a)(c,V.token).then((function(e){m.b.success("\u0420\u0430\u0431\u043e\u0442\u0430 \u0443\u0434\u0430\u043b\u0435\u043d\u0430"),console.log(e.data)})),H(Object.keys(c).reduce((function(e,t){return e+c[t].coast*c[t].count}),0))}(0,e)}})})]})}))})]}),Object(y.jsx)("div",{className:g.a.btnAdd,style:{display:"flex",alignItems:"center"},onClick:Y,children:Object(y.jsx)("span",{children:"+ \u0434\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0440\u0430\u0431\u043e\u0442\u0443"})}),Object(y.jsx)("br",{})]})]})})}}}]);
//# sourceMappingURL=29.3b4aff93.chunk.js.map