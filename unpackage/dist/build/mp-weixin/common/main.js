(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["common/main"],{"250c":function(t,e,n){"use strict";n.r(e);var o=n("606d");for(var r in o)"default"!==r&&function(t){n.d(e,t,(function(){return o[t]}))}(r);n("896f");var u,c,i,a,f=n("f0c5"),l=Object(f["a"])(o["default"],u,c,!1,null,null,null,!1,i,a);e["default"]=l.exports},"606d":function(t,e,n){"use strict";n.r(e);var o=n("9483"),r=n.n(o);for(var u in o)"default"!==u&&function(t){n.d(e,t,(function(){return o[t]}))}(u);e["default"]=r.a},"6db1":function(t,e,n){"use strict";(function(t){n("07ba"),n("921b");var e=c(n("66fd")),o=c(n("250c")),r=c(n("3332")),u=c(n("6dbd"));function c(t){return t&&t.__esModule?t:{default:t}}function i(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,o)}return n}function a(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?i(Object(n),!0).forEach((function(e){f(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function f(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}e.default.use(r.default),e.default.config.productionTip=!1,o.default.mpType="app";var l=new e.default(a({},o.default,{minRequest:u.default}));t(l).$mount()}).call(this,n("543d")["createApp"])},"896f":function(t,e,n){"use strict";var o=n("c7f1"),r=n.n(o);r.a},9483:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={globalData:{api_url:"https://yjb.liufh.com",file_url:"https://yjb.liufh.com/storage/",userInfo:{keyword:"3wqeqweq23123"},cart_count:0},onLaunch:function(){t.getSystemInfo({success:function(t){Vue.prototype.StatusBar=t.statusBarHeight;var e=wx.getMenuButtonBoundingClientRect();Vue.prototype.Custom=e,Vue.prototype.CustomBar=e.bottom+e.top-t.statusBarHeight}}),t.navigateTo({url:"/pages/login"}),t.login({provider:"weixin",success:function(e){console.log(e.authResult),t.getUserInfo({provider:"weixin",success:function(t){console.log("用户昵称为："+t.userInfo.nickName)}})}})},onShow:function(){console.log("App Show")},onHide:function(){console.log("App Hide")}};e.default=n}).call(this,n("543d")["default"])},c7f1:function(t,e,n){}},[["6db1","common/runtime","common/vendor"]]]);