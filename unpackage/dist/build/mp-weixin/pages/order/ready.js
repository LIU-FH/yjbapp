(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/order/ready"],{"3adf":function(t,a,e){"use strict";e.r(a);var s=e("d1da"),i=e("647f");for(var n in i)"default"!==n&&function(t){e.d(a,t,(function(){return i[t]}))}(n);var d,o=e("f0c5"),r=Object(o["a"])(i["default"],s["b"],s["c"],!1,null,null,null,!1,s["a"],d);a["default"]=r.exports},"597d":function(t,a,e){"use strict";(function(t){e("07ba"),e("921b");s(e("66fd"));var a=s(e("3adf"));function s(t){return t&&t.__esModule?t:{default:t}}t(a.default)}).call(this,e("543d")["createPage"])},"647f":function(t,a,e){"use strict";e.r(a);var s=e("6eb1"),i=e.n(s);for(var n in s)"default"!==n&&function(t){e.d(a,t,(function(){return s[t]}))}(n);a["default"]=i.a},"6eb1":function(t,a,e){"use strict";(function(t){Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var e={data:function(){return{globalData:{},params:{},details:{},balance:0,isSwitch:!1,remark:""}},onLoad:function(t){this.globalData=getApp().globalData,this.params={goods:t.goods,goods_group:t.goods_group,cart:t.cart},this.loadData()},methods:{loadData:function(){var t=this;this.$minApi.orderReady(this.params).then((function(a){t.details=a})).catch((function(t){console.log(t)}))},doPay:function(){var a="";if(this.details.address_name&&this.details.address_tel&&this.details.address_details||(a="请选择收货地址"),a)return t.showToast({icon:"none",title:a,duration:2e3}),!1;this.$minApi.orderAdd({params:this.params,balance:this.balance,remark:this.remark,address_name:this.details.address_name,address_tel:this.details.address_tel,address_details:this.details.address_details}).then((function(a){t.requestPayment({provider:"wxpay",timeStamp:String(Date.now()),nonceStr:a.nonce_str,package:"prepay_id="+a.prepay_id,signType:"MD5",paySign:a.sign,success:function(t){console.log("success:"+JSON.stringify(t))},fail:function(t){console.log("fail:"+JSON.stringify(t))}}),t.redirectTo({url:"/pages/order/details?id="+a.order_id})})).catch((function(t){console.log(t)}))},toAddress:function(){t.navigateTo({url:"/pages/user/address/index?order=1"})},SwitchChange:function(t){this.isSwitch=t.detail.value,this.isSwitch?this.balance=this.details.wallet_balance>this.details.amount?this.details.amount:this.details.wallet_balance:this.balance=0},inputRemark:function(t){this.remark=t.detail.value},toGoodsDetails:function(a){t.navigateTo({url:"/pages/goods/details?id="+a+"&keyword="+this.globalData.userInfo.keyword})}},onShow:function(){var a=t.getStorageSync("address-select");a&&(this.details.address_name=a.name,this.details.address_tel=a.tel,this.details.address_details=a.city+","+a.details,t.removeStorageSync("address-select"))}};a.default=e}).call(this,e("543d")["default"])},d1da:function(t,a,e){"use strict";var s,i=function(){var t=this,a=t.$createElement,e=(t._self._c,t.details.discount_amount.toFixed(2));t.$mp.data=Object.assign({},{$root:{g0:e}})},n=[];e.d(a,"b",(function(){return i})),e.d(a,"c",(function(){return n})),e.d(a,"a",(function(){return s}))}},[["597d","common/runtime","common/vendor"]]]);