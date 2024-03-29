/* eslint-disable */
const u = navigator.userAgent;// 获取设备信息
const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; // android终端
const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
const isWeixin = /MicroMessenger/i.test(u);// 微信终端
const isQQ = u.indexOf('QQ') > -1; // QQ浏览器
const browser={
  versions:function(){
    return {//移动终端浏览器版本信息
      trident: u.indexOf('Trident') > -1, //IE内核
      presto: u.indexOf('Presto') > -1, //opera内核
      webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile.*/)||!!u.match(/AppleWebKit/)&&u.indexOf('QIHU')&&u.indexOf('Chrome')<0, //是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
      android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
      iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
      iPad: u.indexOf('iPad') > -1, //是否iPad
      webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
    };
  }(),
  language:(navigator.browserLanguage || navigator.language).toLowerCase()
}
const isTrandingHelp = u.indexOf('trandingHelp') > -1;// 判断是否是欧冶钢好内


export default {
  u,
  isAndroid,
  isIOS,
  isWeixin,
  isQQ,
  browser,
  isTrandingHelp
}
