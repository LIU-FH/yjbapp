(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/wallet"],{"00cb":function(t,n,e){"use strict";e.r(n);var a=e("33de"),o=e("1d1d");for(var u in o)"default"!==u&&function(t){e.d(n,t,(function(){return o[t]}))}(u);var c,l=e("f0c5"),i=Object(l["a"])(o["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],c);n["default"]=i.exports},"16b7":function(t,n,e){"use strict";(function(t){e("07ba"),e("921b");a(e("66fd"));var n=a(e("00cb"));function a(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},"1d1d":function(t,n,e){"use strict";e.r(n);var a=e("e2f8"),o=e.n(a);for(var u in a)"default"!==u&&function(t){e.d(n,t,(function(){return a[t]}))}(u);n["default"]=o.a},"33de":function(t,n,e){"use strict";var a,o=function(){var t=this,n=t.$createElement;t._self._c},u=[];e.d(n,"b",(function(){return o})),e.d(n,"c",(function(){return u})),e.d(n,"a",(function(){return a}))},e2f8:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a={data:function(){return{globalData:{},list:{},details:{}}},onLoad:function(){this.globalData=getApp().globalData,this.loadData()},methods:{loadData:function(){var t=this;this.$minApi.wallet().then((function(n){t.details=n.data})).catch((function(t){console.log(t)})),this.$minApi.walletRecord().then((function(n){t.list=n})).catch((function(t){console.log(t)}))}}};n.default=a}},[["16b7","common/runtime","common/vendor"]]]);