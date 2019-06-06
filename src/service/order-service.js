'use strict';

var _mm = require('@/common/js/mm.js');

var _order = {
  // 创建订单
  create: function (shippingId, resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/order/create.do'),
      data: {
        shippingId: shippingId
      },
      success: resolve,
      error: reject
    });
  },
  // 订单详情
  detail: function (orderNo, resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/order/detail.do'),
      data: {
        orderNo: orderNo
      },
      success: resolve,
      error: reject
    });
  },
  // 付款
  pay: function (orderNo, resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/order/pay.do'),
      data: {
        orderNo: orderNo
      },
      success: resolve,
      error: reject
    });
  },
  list: function (resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/order/list.do'),
      success: resolve,
      error: reject
    });
  },
  queryOrderPayStatus: function (orderNo, resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/order/query_order_pay_status.do'),
      data: {
        orderNo: orderNo
      },
      success: resolve,
      error: reject
    });
  },
  cancel: function (orderNo, resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/order/cancel.do'),
      data: {
        orderNo: orderNo
      },
      success: resolve,
      error: reject
    });
  },
  confirm: function (orderNo, resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/order/confirm.do'),
      data: {
        orderNo: orderNo
      },
      success: resolve,
      error: reject
    });
  }
}
module.exports = _order;