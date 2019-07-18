import HttpUtil from './httpUtil';
import { getApiUrl } from './apiUtil';

const actions = {
  /**
   * 获取问题详情
   * @param param {uid, token, familyId}
  **/
  getQuestionDetail(params) {
    return HttpUtil.send({
      method: 'get',
      url: getApiUrl('/j2/fa/interlocution/getQuestion'),
      query: {
        uid: params.uid,
        token: params.token,
        familyId: params.familyId,
        questionId: params.questionId,
        limit: 16,
      }
    });
  },
  /**
   * 获取答案详情
   * @param param {uid, token, familyId}
  **/
  getAnswerDetail(params) {
    return HttpUtil.send({
      method: 'get',
      url: getApiUrl('/j2/fa/interlocution/getAnswerListByQuestionId'),
      query: {
        uid: params.uid,
        token: params.token,
        familyId: params.familyId,
        questionId: params.questionId,
        page: 1,
        pageSize: 50
      }
    });
  }

};
export default actions;
