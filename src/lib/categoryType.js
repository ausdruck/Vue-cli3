/**
 * Created by nzb on 2018/6/12.
 */
/*eslint-disable */
const categoryType = {
  greenLight: {name: '绿灯资源', icon: require('../static/images/Green@3x.png'),
     des: '经认证，该资源在仓库信息完全符合，可放心购买'},
  blueLight: {name: '蓝灯资源',icon: require('../static/images/Blue@3x.png'),
     des: '钢厂直销资源，该资源所在仓库暂不具备网上验证能力'},
  yellowLight: {name: '黄灯资源',icon: require('../static/images/Orange@3x.png'),
     des: '经认证，该资源真实在库，但货主信息不符，购买后需等待供应商过户，2天后未转绿的订单自动撤销'},
  redLight: {name: '红灯资源',icon: require('../static/images/Red@3x.png'),
     des: '经认证，该资源供应商上传信息与仓库实物信息不符，不支持购买'},
  whiteLight: {name: '白灯资源',icon: require('../static/images/White@3x.png'),
    des: '该资源所在仓库暂不具备网上验证能力，仅支持撮合交易'},
  financingLight: {name: '绿灯加融灯资源',icon: require('../static/images/Rong@3x.png'),
    des: '供应商通过平台融资，该资源真实在库，可放心购买'},
  greenJewel: {name: '绿印资源',icon: require('../static/images/Bao@3x.png'),
    des: '该资源质量信息等信息已通过钢厂认证，可放心购买'},
  redJewel: {name: '红印资源',icon: require('../static/images/Sheng@3x.png'),
    des: '该资源质量信息等与钢厂出场信息不符，请谨慎购买'},
  warrantyBook: {name: '质保书',icon: require('../static/images/ZhiBaoShu@3x.png'),
    des: '该资源提供质保书可供查看'},
  financing: {name: '融资支付',icon: require('../static/images/KeRongZI@3x.png'),
    des: '该资源支持在线融资支付'},
  fastBalance: {name: '仓费快结',icon: require('../static/images/CangFeiKuaiJie@3x.png'),
    des: '平台提供货款及运杂费一票制结算。提货方便快速，费率优惠'},
  afterBalance:{name: '后结算',icon: require('../static/images/HouFuKuan@3x.png'),
    des: '订单成交后，按供应商定价规则进行二次结算'}, // 后结算
  supplyTransport: {name: '代运补贴',icon: require('../static/images/icon_yunfeibutie@3x.png'),
    des: '供应商的货物对指定区域销售提供运输补贴'}, // 代运补贴
  transportSubsidies: {name: '供方代运',icon: require('../static/images/GongFangDaiYun@3x.png'),
    des: '该资源所在仓库暂不具备网上验证能力，仅支持撮合交易'}, // 供方代运
  purpleLight: {name: '紫灯（期货）',icon: require('../static/images/light_purple@3x.png'),
  des: '紫灯资源'}, // 紫灯
  irideLight: {name: '彩虹灯',icon: require('../static/images/light_all@3x.png'),
    des: '彩灯资源'},

};

function init(obj) {
  switch (obj) {
    case '绿灯': return categoryType.greenLight;
    case '蓝灯': return categoryType.blueLight;
    case '黄灯': return categoryType.yellowLight;
    case '红灯': return categoryType.redLight;
    case '白灯': return categoryType.whiteLight;
    case '绿灯加融灯': return categoryType.financingLight;
    case '绿印': return categoryType.greenJewel;
    case '红印': return categoryType.redJewel;
    case '质保书': return categoryType.warrantyBook;
    case '融资支付': return categoryType.financing;
    case '仓费快结': return categoryType.fastBalance;
    case '后结算': return categoryType.afterBalance;
    case '代运补贴': return categoryType.supplyTransport;
    case '供方代运': return categoryType.transportSubsidies;
    case '紫灯': return categoryType.purpleLight;
    default: return categoryType.irideLight;
  }
}

export default init;
