'use strict';

var _mm = require('@/common/js/mm.js');

var _cart = {
    // 获取购物车数量
    getCartCount: function (resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/cart/get_cart_count.do'),
            success: resolve,
            error: reject
        });
    },
    // 添加到购物车
    addToCart: function (bookInfo, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/cart/add.do'),
            data: bookInfo,
            success: resolve,
            error: reject
        });
    },
    // 获取购物车列表
    getCartList: function (resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/cart/list.do'),
            success: resolve,
            error: reject
        });
    },
    // 选择购物车商品
    selectBook: function (bookId, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/cart/select_one.do'),
            data: {
                bookId: bookId
            },
            success: resolve,
            error: reject
        });
    },
    // 取消选择购物车商品
    unselectBook: function (bookId, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/cart/un_select_one.do'),
            data: {
                bookId: bookId
            },
            success: resolve,
            error: reject
        });
    },
    // 选中全部商品
    selectAllBook: function (resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/cart/select_all.do'),
            success: resolve,
            error: reject
        });
    },
    // 取消选中全部商品
    unselectAllBook: function (resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/cart/un_select_all.do'),
            success: resolve,
            error: reject
        });
    },
    // 更新购物车商品数量
    updateBook: function (bookInfo, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/cart/update.do'),
            data: bookInfo,
            success: resolve,
            error: reject
        });
    },
    // 删除指定商品
    deleteBook: function (bookIds, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/cart/delete.do'),
            data: {
                bookIds: bookIds
            },
            success: resolve,
            error: reject
        });
    },
}
module.exports = _cart;