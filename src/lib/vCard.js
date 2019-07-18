/**
 * @description 通讯录二维码生成工具类
 *    网址：https://en.wikipedia.org/wiki/VCard
 * @author yq
 * @date 2017/8/15 下午1:33
 */
class VCard {
  /**
   * 生成名片信息
   *
   * @param {String} title 名片标题
   * @param {String} name 姓名
   * @param {String} phone 手机
   * @param {String} address 家庭地址
   * @param {String} company 公司名称
   * @param {String} companyAddress 公司地址
   * @param {String} photo 头像
   * @param {String} qq QQ
   * @param {String} email 邮箱
   *
   * @returns {string}  名片信息
   */
  static create({ title = '', name = '', phone, address = '',
                  company = '', companyAddress = '', photo, qq, email }) {
    let vCardInfo = 'BEGIN:VCARD\nVERSION:4.0';
    if (name) {
      vCardInfo += `\nN:${name}`;
    }
    if (title || name) {
      vCardInfo += `\nTITLE:${title || name}`;
    }
    if (phone) {
      vCardInfo += `\nTEL;TYPE=cell:${phone}`;
    }
    if (photo) {
      const imgType = `image/${photo.substring(photo.lastIndexOf('.') + 1)}`;
      vCardInfo += `\nPHOTO;MEDIATYPE=${imgType}::${photo}`;
    }
    if (company) {
      vCardInfo += `\nORG:${company}`;
    }
    if (address) {
      vCardInfo += `\nADR;TYPE=HOME:;;${address}`;
    }
    if (companyAddress) {
      vCardInfo += `\nLABEL;TYPE=WORK,PREF:${companyAddress}`;
    }
    if (email) {
      vCardInfo += `\nEMAIL:${email}`;
    }
    if (qq) {
      vCardInfo += `\nx-qq:${qq}`;
    }
    vCardInfo += '\nEND:VCARD';
    return vCardInfo;
  }
}
// const cardInfo = VCard.create({
//   title: '杨清的名片',
//   name: '杨清',
//   phone: '13661685114',
//   address: '唐人苑',
//   company: '鼎领科技',
//   companyAddress: '联安大厦',
//   photo: 'http://www.hrzan.com/static/img/1cjSdeLmxK6hbR4b_6tv.png',
//   qq: '920819339',
//   email: '920819339@qq.com'
// });
//
// console.log(cardInfo);

export default VCard;
