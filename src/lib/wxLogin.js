/* eslint-disable */
// 微信登录逻辑判断
import userAgent from './userAgent';
import * as CookieUtil from './cookie';
import { version } from '../../config/global';

(function wxLogin() {
  if (!userAgent.isWeixin) {
    return;
  }
  const uid = CookieUtil.get('uid');
  const token = CookieUtil.get('token');
  const url = window.location.href;
  if (!uid || !token) {
    if (process.env.NODE_ENV !== 'production') {
      // 非生产环境跳转到登录页面
      window.location.href = `/login?redirect=${encodeURIComponent(url)}`;
      return;
    }
    const backUrl = encodeURIComponent(url.replace(/token=.*?(&|$)/, ''));
    window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxfdb1b4720aca9966&redirect_uri=${encodeURIComponent(`http://m.hrzan.com/t/wechat/web/login?backUrl=${backUrl}&version=${version}`)}&response_type=code&scope=snsapi_userinfo&state=STATE&connect_redirect=1#wechat_redirect`;
  }
})();
