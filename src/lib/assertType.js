/**
 * Created by administrato on 2017/6/16.
 */
const assertType = {
  isUndefined: value => typeof value === 'undefined',
  isDefined: value => typeof value !== 'undefined',
  isString: value => typeof value === 'string',
  isArray: value => Object.prototype.toString.call(value) === '[object Array]',
  isPhoneNumber: value => (/^1[34578]\d{9}$/.test(value)),
  isEmptyObj: value => JSON.stringify(value) === '{}',
  isFilesEmpty: (file) => {
    if (!file || !file.length || !file[0] || !assertType.isEmptyObj(file[0])) {
      return true;
    }
    return false;
  },
  isUrl: value => /^http(s)?:\/\/([\w-]+\.)+[\w-]+([\w- ./?%&=]*)?$/.test(value),

};
export default assertType;
