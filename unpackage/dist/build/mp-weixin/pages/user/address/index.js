(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/address/index"],{"028e":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{list:{},isOrder:!1}},onLoad:function(t){this.loadData(),t.order&&(this.isOrder=!0)},onShow:function(){t.getStorageSync("address-load")&&(this.loadData(),t.removeStorageSync("address-load"))},methods:{loadData:function(){var t=this;this.$minApi.address({}).then((function(e){t.list=e})).catch((function(t){console.log(t)}))},toEdit:function(e){t.setStorageSync("address-edit",e),t.navigateTo({url:"/pages/user/address/edit"})},del:function(t){var e=this;this.$minApi.addressDel({id:t}).then((function(t){e.loadData()})).catch((function(t){console.log(t)}))},clickItem:function(e){this.isOrder&&(t.setStorageSync("address-select",e),t.navigateBack({delta:1}))}}};e.default=n}).call(this,n("543d")["default"])},4650:function(t,e,n){"use strict";n.r(e);var a=n("028e"),o=n.n(a);for(var i in a)"default"!==i&&function(t){n.d(e,t,(function(){return a[t]}))}(i);e["default"]=o.a},"4ec0":function(t,e,n){"use strict";n.r(e);var a=n("8bb8"),o=n("4650");for(var i in o)"default"!==i&&function(t){n.d(e,t,(function(){return o[t]}))}(i);var r,c=n("f0c5"),u=Object(c["a"])(o["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],r);e["default"]=u.exports},"8a75":function(t,e,n){"use strict";(function(t){n("07ba"),n("921b");a(n("66fd"));var e=a(n("4ec0"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},"8bb8":function(t,e,n){"use strict";var a,o=function(){var t=this,e=t.$createElement;t._self._c},i=[];n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return a}))}},[["8a75","common/runtime","common/vendor"]]]);