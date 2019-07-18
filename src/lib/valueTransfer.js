import http from "./httpUtil";
import { getApiUrl } from "./apiUtil";
import { Toast,Indicator } from "mint-ui";

let valueSets = {
        //采购单价预估规则
        PredRule: [
            {value: '10', name: 'mystee网站价格',},
            {value: '20', name: 'ouyeel网站价格'}
        ],
        //价格方式
        PriceType: [
            {value: '10', name: '厂内交货价'},
            {value: '20', name: '协议交货价'}
        ],
        //结算方式
        SettleType: [
            {value: '10', name: '全额付款计服务费率'},
            {value: '20', name: '预付款比例回款计服务费率'}
        ],
        //退货结算发票
        ReturnSettleType: [
            {value: '00', name: '开具红字增值税发票'},
            {value: '10', name: '后续结算发票中汇总开具'}
        ],
        //上游付款类型
        ProviderPayType: [
            {value: '10', name: '全额预付'},
            {value: '11', name: '预付款'},
            {value: '20', name: '定金'},
            {value: '30', name: '见单付款'},
            {value: '40', name: '货到付款'}
        ],
        //上游付款方式
        ProviderPayWay: [
            {value: '00', name: '电汇'},
            {value: '10', name: '银行承兑'},
            {value: '20', name: '商业承兑'},
            {value: '30', name: '信用证'}
        ],
        //下游付款类型
        CustomerPayType: [
            {value: '10', name: '全额预付'},
            {value: '11', name: '预付款'},
            {value: '20', name: '定金'},
            {value: '30', name: '见单付款'},
            {value: '40', name: '货到付款'}
        ],
        //下游付款方式
        CustomerPayWay: [
            {value: '00', name: '电汇'},
            {value: '10', name: '银行承兑'},
            {value: '20', name: '商业承'},
            {value: '30', name: "信用证"}
        ],
        //保证金释放规则
        DepositReleaseRule: [
            {value: '10', name: '最后释放'},
            {value: '20', name: '等比例释放'}
        ],
        //运费结算方式
        FreightFeeType: [
            {value: '00', name: '欧冶物流控货'},
            {value: '10', name: '欧冶物流代结算'},
            {value: '20', name: '供方控货'}
        ],
        //运输控货方式
        TransportControlType: [
            {value: '00', name: '地区公司承担'},
            {value: '10', name: '下游客户承担'},
            {value: '20', name: '地区公司代收代付'},
            {value: '30', name: '供方承运价内运费'},
            {value: '40', name: '其他'}
        ],
        //业务状态：待完善，待提交，待审批
        AuditStatus: [
            {value: '00', name: '业务已关闭'},
            {value: '10', name: '用户已创建'},
            {value: '20', name: '运营待提交'},
            {value: '21', name: '运营待审批'},
            {value: '22', name: '运营已驳回'},
            {value: '23', name: '待提交用户'},
            {value: '24', name: '用户已驳回'},
            {value: '2', name: '业务已确认'},
            {value: '30', name: '业务已生效'}
        ],
        //付款申请单状态
        ProcureApprovalStatus: [
            {value: '00', name: '撤销'},
            {value: '10', name: '新增'},
            {value: '20', name: '提交'},
            {value: '25', name: '一级审批不通过'},
            {value: '30', name: '一级审批通过'},
            {value: '35', name: '二级审批不通过'},
            {value: '40', name: '二级审批通过'},
            {value: '45', name: '付款完成'},
        ],
        //付款申请单付款类型
        ProcureApprovalPayType: [
            {value: '10', name: '按合同'},
            {value: '20', name: '按发票'},
            {value: '30', name: '定金'},
            {value: '40', name: '备用金'},
            {value: '50', name: '按协议付货款'},
            {value: '60', name: '按协议付运费'},
            {value: '70', name: '按结算单付运杂费'},
        ],
    };



function setValue(data) {
    valueSets = data.data;
}

function addValue(name, data) {
    valueSets[name] = data;
    console.info(valueSets);
}

function getValue() {
    return valueSets;
}

// 根据value查name
// value=10;
// type=  "YJYG_PURCHASE_PRICE_RULE"
function getNameByValue(type, value) {
// console.log(valueSets);

    for (let temp in valueSets[type]) {
        let item;
        item = temp;
        if (value === valueSets[type][item].value) {
            return valueSets[type][item].name;
        }
    }
    return "";
}

//根据name查value
function getValueByName(type, name) {
    for (let temp in valueSets[type]) {
        let item;
        item = temp;
        if (name == valueSets[type][item].name) {
            return valueSets[type][item].value;
        }
    }
    return "";
}

//获取下拉数据
function getSelect(type) {
    return valueSets[type];
}
function loadData() {
    const params = {
        "codeType": [
            // "YJYG_PURCHASE_PRICE_RULE",
            // "YJYG_P_PRICE_TYPE",
            // "YJYG_SETTLE_TYPE",
            // "YJYG_RETURN_INVOICE_NO",
            // "YJYG_P_PAYMENT_TYPE",
            // "YJYG_P_PAYMENT",
            // "YJYG_C_PAYMENT_TYPE",
            // "YJYG_C_PAYMENT",
            // "YJYG_MARGIN_RELEASE_RULES",
            // "YJYG_TRANSPORT_CONTROL_WAY",
            // "YJYG_FREIGHT_SETTLEMENT_WAY",
            // "YJYG_AUDIT_STATUS",
            // "PAY_APPLY_TYPE",
            // "PAY_APPLY_STATUS",
            // "PAY_APPLY_CHANNEL",
            // "NOTE_TYPE",
            // "CORPORATION_TYPE",
            // "YJYG_PACK_TYPE",
            // "YJYG_SERVICE_CHARGE",
            // "SALES_MODE",
            // "YJYG_GOODS_TYPE",
            // "YJYG_CUSTOMER_DELIVERY_TYPE",
            // "DELIVERY_ADDRESS",
            // "YJYG_PROCESS_AREA",
            // "CREDIT_TYPE",
            // "YJYG_SUPPLIER_TYPE",
            // "YJYG_NOTE_TYPE",
            // "YJYG_VOUCHER_TYPE",
            // "YJYG_TRAN_STYPE",
            // "CHANGE_ORDER_STATUS",
            // "YJYG_WAREHOUSE_COOP_MODE",
            // "YJYG_TRANSPORT_CONTROL_WAY",
            // "YJYG_FREIGHT_SETTLEMENT_WAY",
            // "YJYG_CUSTOMER_TYPE",
            // "CUS_DELIVERY_TYPE",
            // "SCHEDULING_STATUS",
            // "APPROVE_STATUS",
            // "SCHEDULE_SOURCE",
            // "COLLECTION_PAYMENT_COMPLETE",
            // "IS_COLLECTION",
            // "STATION_AR",
            "YJYG_PUR_APPROVAL_STATUS",
            // "YJYG_AGREEMENT_ORDER_PRICE_TYPE",
            // "YJYG_AGREEMENT_ORDER_DELIVERY_TYPE",
            // "YJYG_IS_AFTER_SETTLE",
            // "YJYG_WEIGHT_METHOD",
            // "YJYG_RISK_GRADE",
            // "YJYG_APPROVAL_STATUS",
            // "YJYG_SUPERVISORY_MODE",
            // "YJYG_PRICE_CONFIRM_STATUS",
            // "YJYG_PUT_STATUS",
            // "JT_PUTIN_WAREHOUSE_INDEX",
            // "JT_PACK_TYPE",
            // "GYL_APPROVAL_STATUS",
            // "YJYG_TRANSPORT_SCHEME_TYPE",
            // "YJYG_TRANSPORT_WAY",
            // "YJYG_AGREEMENT_SALE_DELIVERY_TYPE",
            // "REFUND_STATUS",
            // "PS_PRODUCT_INFO_TYPE",
            // "PS_PRODUCT_INFO_STATUS",
            // "PS_DELIVERY_TYPE",
            // "PS_MATERIAL_TYPE",
            // "info.weightWay",
            // "JG_WEIGHT_METHOD",
            // "PS_PROCESS_TYPE",
            // "RESOURCE_BUSINESS_TYPE",
            // "PACK_TYPE"
        ]
    };
    const that = this;
    http
        .newSend({
            // url: getApiUrl("/v1/getValueSets"),
            url:'http://www.ouyeel.com/jg-service/v1/getValueSets',
            method: "post",
            data: params,
        }).then(data => {
            console.log(data);
            if (data.result == 1) {
                let result = JSON.stringify(data.data);
                const searchName = "codeValueName";
                const searchValue = "codeValue";
                result = result.replace(new RegExp(searchName, 'g'), "name");
                result = result.replace(new RegExp(searchValue, 'g'), "value");
                data.data = JSON.parse(result);
                setValue(data);
                // console.log(result);
                // getTracerFactory();
            }
    },(err)=>{
        Toast('网络异常，请稍后重试！！');
        Indicator.close();
    });
    //     .send('v1/getValueSets', params, '2').then(function (data: any) {
    //     if (data.result == 1) {
    //         let result = JSON.stringify(data.data);
    //         const searchName = "codeValueName";
    //         const searchValue = "codeValue";
    //         result = result.replace(new RegExp(searchName, 'g'), "name");
    //         result = result.replace(new RegExp(searchValue, 'g'), "value");
    //         data.data = JSON.parse(result);
    //         setValue(data);
    //         getTracerFactory();
    //     }
    // }).catch(function (data) {
    //     console.log('解决接口错误');
    //     console.log(data);
    // });

}

// function getTracerFactory() {
//     const that = this;
//     that.network.get('v1/getTracerFactory', {}, '2').then(function (data) {
//         let result = JSON.stringify(data.data);
//         const searchName = "providerName";
//         const searchValue = "providerId";
//         result = result.replace(new RegExp(searchName, 'g'), "name");
//         result = result.replace(new RegExp(searchValue, 'g'), "value");
//         data.data = JSON.parse(result);
//         addValue('TracerFactory', data.data);
//         getTBaseProcessInfo();
//     })
// }

// function getTBaseProcessInfo() {
//     this.network.get('v1/getTBaseProcessInfo', {}, '2').then(function (data) {
//         let result = JSON.stringify(data.data);
//         const searchName = "processName";
//         const searchValue = "processCode";
//         result = result.replace(new RegExp(searchName, 'g'), "name");
//         result = result.replace(new RegExp(searchValue, 'g'), "value");
//         data.data = JSON.parse(result);
//         addValue('TBaseProcessInfo', data.data);
//     })
// }
export {getNameByValue,loadData,getValueByName}
