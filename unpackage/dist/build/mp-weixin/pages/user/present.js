(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/present"],{2108:function(t,n,a){"use strict";a.r(n);var o=a("bb58"),e=a("4e08");for(var u in e)"default"!==u&&function(t){a.d(n,t,(function(){return e[t]}))}(u);var i,r=a("f0c5"),c=Object(r["a"])(e["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],i);n["default"]=c.exports},"2b2b":function(t,n,a){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a={data:function(){return{globalData:{},list:{}}},onLoad:function(){this.globalData=getApp().globalData,this.loadData()},methods:{loadData:function(){var t=this;this.$minApi.goods({category_id:4}).then((function(n){t.list=n})).catch((function(t){console.log(t)}))},toGoodsDetails:function(n){t.navigateTo({url:"/pages/goods/details?id="+n+"&keyword="+this.globalData.userInfo.keyword})},toPay:function(n){t.navigateTo({url:"/pages/order/ready?goods="+n})}}};n.default=a}).call(this,a("543d")["default"])},"2cf1":function(t,n,a){"use strict";(function(t){a("07ba"),a("921b");o(a("66fd"));var n=o(a("2108"));function o(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,a("543d")["createPage"])},"4e08":function(t,n,a){"use strict";a.r(n);var o=a("2b2b"),e=a.n(o);for(var u in o)"default"!==u&&function(t){a.d(n,t,(function(){return o[t]}))}(u);n["default"]=e.a},bb58:function(t,n,a){"use strict";var o,e=function(){var t=this,n=t.$createElement;t._self._c},u=[];a.d(n,"b",(function(){return e})),a.d(n,"c",(function(){return u})),a.d(n,"a",(function(){return o}))}},[["2cf1","common/runtime","common/vendor"]]]);