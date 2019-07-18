// import { matchSymbol, isIOS } from 'util/index';
// import CONFIG from 'util/config';
// import { getWechatSDK } from 'service/appService';
//
// const jsApiList = {
//   debug: false,
//   jsApiList: [
//     'onMenuShareTimeline',
//     'onMenuShareAppMessage',
//     'onMenuShareQQ',
//     'onMenuShareWeibo',
//     'onMenuShareQZone'
//   ]
// };
// const getLink = (shareUrl, userId) => {
//   return userId
//     ? `http://${CONFIG.BRANCH_URL}/v1/auth/wechatgh?sharerId=${userId}&url=${encodeURIComponent(shareUrl)}`
//     : `http://${CONFIG.BRANCH_URL}/v1/auth/wechatgh?url=${encodeURIComponent(shareUrl)}`;
// };
// const IMG_URL = isIOS ? 'http://images.integrity.com.cn/sharelogo-lg.png' : 'http://images.integrity.com.cn/sharelogo-lg.png!sm';
//
// class WxConstructor {
//   /**
//    * 构造函数
//    * @property {Object}  wx               [微信官方提供API对象]
//    * @property {Object}  configOpts       [微信注册所需参数合并对象]
//    * @property {Object}  appMessageOpts   [微信好友分享配置参数]
//    * @property {Object}  timelineOpts     [微信朋友圈分享配置参数]
//    * @property {Boolean} isConfigDone     [微信注册结束标志]
//    * @property {Boolean} isWechat         [微信环境判断标志]
//    * @property {Number}  MAX_RETRY        [微信注册最大尝试次数]
//    */
//   constructor (configOpts) {
//     this.wx = window.wx || {};
//     this.appMessageOpts = null;
//     this.timelineOpts = null;
//     this.isConfigDone = false;
//     this.isWechat = navigator.userAgent.toLowerCase().indexOf('micromessenger') >= 0;
//     console.debug('Wx: ', this.wx);
//   }
//   // 微信注入权限验证配置
//   onConfig (configOpts) {
//     this.configOpts = Object.assign({}, configOpts, jsApiList);
//     this.MAX_RETRY = 6;
//     window.wx.ready(res => {
//       console.error('We chat sdk config done: ', res);
//       this.isConfigDone = true;
//       this.onShare();
//     });
//     window.wx.error(res => {
//       console.error('Wechat sdk config error: ', res);
//     });
//     window.wx.config(this.configOpts);
//     // 安卓可以执行一次冗余的分享接口注册
//     if (!isIOS) {
//       this.onShare();
//     }
//     return this;
//   }
//   // 分享
//   onShare (cb) {
//     if ((!this.isConfigDone && this.MAX_RETRY > 0) || !window.$wxShareIsReady) {
//       return setTimeout(() => {
//         this.MAX_RETRY--;
//         this.onShare();
//       }, 1000);
//     }
//     this.wx.onMenuShareAppMessage({
//       title: this.appMessageOpts.title,
//       link: this.appMessageOpts.link,
//       desc: this.appMessageOpts.desc,
//       imgUrl: this.appMessageOpts.imgUrl,
//       type: this.appMessageOpts.type || 'link',
//       dataUrl: this.appMessageOpts.dataUrl || '',
//       success: cb
//     });
//     // 朋友圈
//     this.wx.onMenuShareTimeline({
//       title: this.timelineOpts.title,
//       link: this.timelineOpts.link,
//       imgUrl: this.timelineOpts.imgUrl,
//       success: cb
//     });
//     // QQ好友
//     this.wx.onMenuShareQQ({
//       title: this.appMessageOpts.title,
//       link: this.appMessageOpts.link,
//       desc: this.appMessageOpts.desc,
//       imgUrl: this.appMessageOpts.imgUrl,
//       success: cb
//     });
//     // 微博
//     this.wx.onMenuShareWeibo({
//       title: this.appMessageOpts.title,
//       link: this.appMessageOpts.link,
//       desc: this.appMessageOpts.desc,
//       imgUrl: this.appMessageOpts.imgUrl,
//       success: cb
//     });
//     // QQ空间
//     this.wx.onMenuShareQZone({
//       title: this.appMessageOpts.title,
//       link: this.appMessageOpts.link,
//       desc: this.appMessageOpts.desc,
//       imgUrl: this.appMessageOpts.imgUrl,
//       success: cb
//     });
//     return this;
//   }
//   // 平台默认分享参数
//   shareDefault (userId) {
//     console.debug('default -> 默认平台分享');
//
//     this.appMessageOpts = {
//       title: '好人好股',
//       // link: getLink(`http://${CONFIG.BRANCH_URL}`, userId),
//       link: getLink(window.location.href, userId),
//       desc: '好人好股',
//       imgUrl: IMG_URL
//     };
//     this.timelineOpts = {
//       title: '好人好股',
//       // link: getLink(`http://${CONFIG.BRANCH_URL}`, userId),
//       link: getLink(window.location.href, userId),
//       desc: '好人好股',
//       imgUrl: IMG_URL
//     };
//     this.setConfigOrNot();
//     return this;
//   }
//   // 设置直播间分享参数
//   shareLive (data, userId) {
//     console.debug('live -> 直播分享');
//
//     this.appMessageOpts = {
//       title: data.title,
//       link: getLink(window.location.href, userId),
//       desc: data.topic,
//       imgUrl: data.teacher.avatar
//     };
//     this.timelineOpts = {
//       title: data.title,
//       link: getLink(window.location.href, userId),
//       imgUrl: data.teacher.avatar
//     };
//     this.setConfigOrNot();
//     return this;
//   }
//   // 设置精彩回顾分享参数
//   shareReview (data, userId) {
//     console.debug('live -> 直播分享');
//     this.appMessageOpts = {
//       title: data.title,
//       link: getLink(window.location.href, userId),
//       desc: '精彩回顾',
//       imgUrl: data.coverUrl
//     };
//     this.timelineOpts = {
//       title: data.title,
//       link: getLink(window.location.href, userId),
//       imgUrl: data.coverUrl
//     };
//     this.setConfigOrNot();
//     return this;
//   }
//   // 设置股票分享参数
//   shareStock (data, userId) {
//     console.debug('stock -> 股票分享');
//
//     let current = data.current || data.current === 0
//       ? data.current.toFixed(2)
//       : '--';
//     let changeRate = data.change_rate || data.change_rate === 0
//       ? data.change_rate.toFixed(2) + '%'
//       : '--';
//     let changeAmount = data.change_amount || data.change_amount === 0
//       ? data.change_amount.toFixed(2)
//       : '--';
//
//     this.appMessageOpts = {
//       title: `${data.name}(${matchSymbol(data.symbol)})`,
//       link: getLink(window.location.href, userId),
//       desc: `最新价:${current}\n涨跌幅:${changeRate}\n涨跌额:${changeAmount}`,
//       imgUrl: IMG_URL
//     };
//     this.timelineOpts = {
//       title: `${data.name}(${matchSymbol(data.symbol)})`,
//       link: getLink(window.location.href, userId),
//       imgUrl: IMG_URL
//     };
//     this.setConfigOrNot();
//     return this;
//   }
//   // 设置文章分享参数
//   shareArticle (title, userId) {
//     console.debug('article -> 文章分享');
//
//     this.appMessageOpts = {
//       title: '好人好股资讯',
//       link: getLink(window.location.href, userId),
//       desc: title,
//       imgUrl: IMG_URL
//     };
//     this.timelineOpts = {
//       title: title,
//       link: getLink(window.location.href, userId),
//       imgUrl: IMG_URL
//     };
//     this.setConfigOrNot();
//     return this;
//   }
//   // 设置T+0训练结果分享
//   shareTrain (data, userId, type = 'result') {
//     console.debug('ktrain -> T + 0 分享');
//
//     switch (type) {
//       case 'result':
//         this.appMessageOpts = {
//           title: `好人好股T+0训练营`,
//           link: getLink(window.location.href, userId),
//           desc: `我在好人好股k线训练营中排名第${data.rank}位，赶快来挑战我吧！`,
//           imgUrl: IMG_URL
//         };
//         this.timelineOpts = {
//           title: `我在好人好股k线训练营中排名第${data.rank}位，赶快来挑战我吧！`,
//           link: getLink(window.location.href, userId),
//           imgUrl: IMG_URL
//         };
//         break;
//       default:
//         // statements_def
//         this.appMessageOpts = {
//           title: `好人好股T+0训练营`,
//           link: getLink(window.location.href, userId),
//           desc: `我正在好人好股T+0训练营提升自己，一起来挑战吧`,
//           imgUrl: IMG_URL
//         }
//         this.timelineOpts = {
//           title: `我正在好人好股T+0训练营提升自己，一起来挑战吧`,
//           link: getLink(window.location.href, userId),
//           imgUrl: IMG_URL
//         };
//         break;
//     }
//     this.setConfigOrNot();
//     return this;
//   }
//   setConfigOrNot () {
//     // 安卓手机进入各页面时直接进行微信配置即可
//     // IOS手机需要在APP启动时将签名数据存入变量，随后在每次进入分页面时，单独再次以原始变量再配置一次
//     if (!isIOS) {
//       getWechatSDK(data => {
//         if (data.hasOwnProperty('errCode')) return;
//         this.onConfig(data);
//       })
//     } else {
//       this.onConfig(this.$dataWaitToConfig);
//     }
//   }
// }
//
// export default WxConstructor;

/**
 * import wxShare from '../../lib/share';
 * wxShare.init({
      zkTitle: 'zhangkun',
      zyLink: 'aaaaa',
      zyImg: 'aaa',
      zyDesc: 'success'
    });
 */
/* eslint-disable */
import HttpUtil from './httpUtil';

function formatUrl(url) {
  if (!url) {
    throw new Error('url不能为空');
  }
  return url.split('#')[0]
    .replace(/token=.*?(&|$)/, '');
}

export default class wxShare {
  /**
   * 分享
   * @param {String} zyTitle 分享标题
   * @param {String} zyLink 分享链接
   * @param {String} backUrl 点击连接的跳转地址
   * @param {String} zyImg 分享图片
   * @param {String} zyDesc 分享描述
   * @param {String} hashes 分享链接中的hash参数
   * @param {String} shares 分享类别
   * @param {Function} cb 回调方法
   */
  static init({
                zyTitle = '鼎领科技', zyLink, backUrl,
                zyImg = 'http://www.hrzan.com/1cjSdeLmxK6hbR4b_6tv.png',
                zyDesc = '职场印记每一天', hashes,
                shares = {
                  weChat: true,
                  friendsCircle: true,
                  qq: true,
                  qzone: true,
                }
              }, cb) {
    if (!zyLink) {
      console.error('分享地址不能为空');
      zyLink = window.location.href;
    }
    // 二次分享时地址栏会被追加一些微信的参数，此行逻辑清除掉微信分享产生的参数
    zyLink = formatUrl(zyLink);
    if (zyLink.indexOf('http') === -1) {
      zyLink = `${process.env.API_ROOT}${zyLink}`;
    }
    // if (!backUrl) {
    //   backUrl = encodeURIComponent(zyLink);
    // } else {
    //   backUrl = encodeURIComponent(formatUrl(backUrl));
    // }
    // 添加hash参数
    if (hashes) {
      const hashStr = Object.keys(hashes)
        .map(key => `${key}=${hashes[key]}`)
        .join('&');
      zyLink += `#${hashStr}`;
    }
    const jsApiList = ['hideMenuItems', 'openLocation', 'getLocation', 'closeWindow', 'chooseWXPay'];
    const menuList = ['menuItem:copyUrl'];
    if (shares.weChat) {
      jsApiList.push('onMenuShareAppMessage');
    } else {
      menuList.push('menuItem:share:appMessage');
    }
    if (shares.friendsCircle) {
      jsApiList.push('onMenuShareTimeline');
    } else {
      menuList.push('menuItem:share:timeline');
    }
    if (shares.qq) {
      jsApiList.push('onMenuShareQQ');
    } else {
      menuList.push('menuItem:share:qq');
    }
    if (shares.qzone) {
      jsApiList.push('onMenuShareQZone');
    } else {
      menuList.push('menuItem:share:QZone');
    }
    HttpUtil.send({
      method: 'get',
      encode: false,
      url: `${process.env.API_ROOT}/invitation/get-wx-config?url=${backUrl}`, // 调用接口的验证接口
    })
      .then((res) => {
        if (res.code !== 0) {
          return Promise.reject(res);
        }
        const { appId, timestamp, nonceStr, signature } = res.data;
        const wx = window.wx;
        wx.config({
          debug: false, // process.env.NODE_ENV !== 'production', // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId, // 必填，公众号的唯一标识
          timestamp, // 必填，生成签名的时间戳
          nonceStr, // 必填，生成签名的随机串
          signature, // 必填，签名，见附录1
          jsApiList
        });
        wx.ready(() => {
          wx.hideMenuItems({
            menuList
          });
          if (shares.friendsCircle) {
            wx.onMenuShareTimeline({
              title: zyTitle, // 分享标题
              link: zyLink, // 分享链接
              imgUrl: zyImg, // 分享图标
              success: () => {
                typeof cb === 'function' && cb();
              },
              cancel: () => {
                // 用户取消分享后执行的回调函数
                typeof cb === 'function' && cb({
                  code: -1,
                  msg: '用户取消分享'
                });
              }
            });
          }
          if (shares.weChat) {
            wx.onMenuShareAppMessage({
              title: zyTitle, // 分享标题
              desc: zyDesc, // 分享描述
              link: zyLink, // 分享链接
              imgUrl: zyImg, // 分享图标
              type: '', // 分享类型,music、video或link，不填默认为link
              dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
              success: () => {
                typeof cb === 'function' && cb();
              },
              cancel: () => {
                // 用户取消分享后执行的回调函数
                typeof cb === 'function' && cb({
                  code: -1,
                  msg: '用户取消分享'
                });
              }
            });
          }
          if (shares.qq) {
            wx.onMenuShareQQ({
              title: zyTitle, // 分享标题
              desc: zyDesc, // 分享描述
              link: zyLink, // 分享链接
              imgUrl: zyImg, // 分享图标
              success: () => {
                typeof cb === 'function' && cb();
              },
              cancel: () => {
                // 用户取消分享后执行的回调函数
                typeof cb === 'function' && cb({
                  code: -1,
                  msg: '用户取消分享'
                });
              }
            });
          }
          if (shares.qzone) {
            wx.onMenuShareQZone({
              title: zyTitle, // 分享标题
              desc: zyDesc, // 分享描述
              link: zyLink, // 分享链接
              imgUrl: zyImg, // 分享图标
              success: () => {
                typeof cb === 'function' && cb();
              },
              cancel: () => {
                // 用户取消分享后执行的回调函数
                typeof cb === 'function' && cb({
                  code: -1,
                  msg: '用户取消分享'
                });
              }
            });
          }
        });
        wx.error((error) => {
          console.log(error);
        });
      })
      // 错误处理
      .catch((err) => console.log('获取签名失败', err));
  }
}
