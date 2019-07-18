/**
 * Created by administrato on 2017/7/18.
 */
const $localStorage = {
  // 获取localStorage
  get(key) {
    if (!key) {
      return null;
    }
    return localStorage.getItem(key);
  },
  // 获取localStorage对象
  getObject(key) {
    const value = this.get(key);
    return value ? JSON.parse(value) : null;
  },
  // 设置或者修改localStorage，value是字符串
  put(key, value) {
    localStorage.setItem(key, value);
  },
  // 设置或者修改localStorage,value是对象
  putObject(key, value) {
    const obj = value ? JSON.stringify(value) : '';
    this.put(key, obj);
  },
  // 移除localStorage
  remove(key) {
    localStorage.removeItem(key);
  },
  // 清空localStorage中所有信息
  removeAll() {
    localStorage.clear();
  },
};

export default $localStorage;
