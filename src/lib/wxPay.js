/* eslint-disable */
import HttpUtil from './httpUtil';
import { goNewHTML, getCurrentParams } from './routerUtil';

export default class wxPay {
  constructor() {
    this.wx = window.WeixinJSBridge;
  }

  /**
   * h5支付
   * @param appId 应用appId 由商户传入
   * @param timeStamp 时间戳，自1970年以来的秒数
   * @param nonceStr  随机串
   * @param package 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***
   * @param signType 微信签名方式
   * @param paySign 微信签名
   * @returns {Promise}
   */
  pay(params) {
    const that = this;
    return new Promise((resolve, reject) => {
      const onBridgeReady = () => {
        that.wx.invoke(
          'getBrandWCPayRequest',
          params,
          (err) => {
            err.err_msg === 'get_brand_wcpay_request:ok'
              ? resolve()
              : reject(Object.assign({
                code: -1,
                msg: err.err_msg || '发起支付失败，请稍后重试',
                error: err
              }))
          }
        );
      };
      if (typeof this.wx === 'undefined') {
        if (document.addEventListener) {
          document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
        } else if (document.attachEvent) {
          document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
          document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
        }
      } else {
        onBridgeReady();
      }
    });
  }

  static init({ pageUrl, zypackage, paySign, orderNo, familyId }) {
    HttpUtil.send({
      method: 'get',
      url: `https://m.hrzan.com/j2/api/wechat/getJSAuthMap?url=${encodeURIComponent(pageUrl)}`, // 调用接口的验证接口
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
          jsApiList: ['chooseWXPay']
        });

        wx.chooseWXPay({
          timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
          nonceStr, // 支付签名随机串，不长于 32 位
          package: zypackage, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
          signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
          paySign, // 支付签名
          success: function (res) {
            // 支付成功后的回调函数
            HttpUtil.send({
              method: 'post',
              url: getApiUrl('/j2/u/order/notify'),
              data: {
                orderNo,
                status: 1,
                payMode: 'wechat',
                params: res.data
              }
            })
              .then((res) => {
                if (res.code !== 0) {
                  return Promise.reject(res.msg);
                } else {
                  goNewHTML('businessCard', {
                    id: familyId,
                    shareId: getCurrentParams().uid
                  });
                }
              })
              .catch((err) => {
                return Promise.reject(err.msg);
              });
          }
        });
        wx.error((error) => {
          console.log(error);
        });
      })
      // 错误处理
      .catch((err) => console.error('获取签名失败', err));
  }
}
