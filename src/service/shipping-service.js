'use strict';

var _mm = require('@/common/js/mm.js');

var _shipping = {
    // 添加收货地址
    addShiping: function (shipInfo, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/shipping/add.do'),
            data: shipInfo,
            success: resolve,
            error: reject
        });
    },
    // 获取收货地址列表
    getShippingList: function (listParam, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/shipping/list.do'),
            data: listParam,
            success: resolve,
            error: reject
        });
    },
    // 选择收货地址
    selectShipping: function (shippingId, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/shipping/list.do'),
            data: {
                shippingId: shippingId
            },
            success: resolve,
            error: reject
        });
    },
    // 删除收货地址
    deleteShipping: function (shippingId, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/shipping/delete.do'),
            data: {
                shippingId: shippingId
            },
            success: resolve,
            error: reject
        });
    },
}
module.exports = _shipping;