/**
 * Created by administrato on 2017/8/15.
 */
import userAgent from './userAgent';
import { goNewHTML } from './routerUtil';

/**
 * 点击视频跳转
 * @param params uid, token, familyId, liveId
 */
const liveVideoJump = (params) => {
  if (userAgent.isWeixin) {
    goNewHTML('liveDetail', {
      uid: params.uid,
      token: params.token,
      familyId: params.familyId,
      id: params.liveId,
    });
  } else if (userAgent.isAndroidApp) {
    // window.App.goBack();
    window.App.goLiveDetail(Number(params.familyId), Number(params.liveId));
  } else if (userAgent.isIOSApp) {
    if (window.webkit && window.webkit.messageHandlers) {
      window.webkit.messageHandlers.wk_goLiveDetail.postMessage({ familyId: params.familyId, id: params.liveId });
    }
  }
};

/**
 * 跳转企业名片
 * @param params familyId
 * @param isIOSWebkit true/false
 */
const goBusinessCard = (params, isIOSWebkit) => {
  if (userAgent.isIOSApp) {
    const familyIdStr = params.familyId.toString();
    if (isIOSWebkit) {
      window.webkit.messageHandlers.pushFamilyControl.postMessage({ familyId: familyIdStr });
    } else {
      window.homeViewContrl.pushFamilyControl(familyIdStr);
    }
  } else if (userAgent.isAndroidApp) {
    window.App.goFamily(params.familyId);
  } else {
    goNewHTML('businessCard', { id: params.familyId });
  }
};
/**
 * app 返回
 */
const appGoBack = () => {
  if (userAgent.isIOSApp) {
    window.webkit.messageHandlers.wk_goBack.postMessage({ body: '返回' });
  } else if (userAgent.isAndroidApp) {
    window.App.goBack();
  }
};
export { liveVideoJump, goBusinessCard, appGoBack };
