import HttpUtil from './httpUtil';
import { getApiUrl } from './apiUtil';

const actions = {
  /**
   * 从微信进入详情页将用户加入家园
   * @param param {uid, token, familyId}
  */
  addToFamily(params) {
    return HttpUtil.send({
      method: 'post',
      url: getApiUrl('/j2/fa/family/member/add'),
      data: {
        uid: Number(params.uid),
        token: params.token,
        familyId: params.familyId
      }
    });
  }
};
export default actions;
