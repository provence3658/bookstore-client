'use strict';

var _mm = require('@/common/js/mm.js');

var _book = {
    // 获取书籍列表
    getBookList : function(listParam, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/book/list.do'),
            data    : listParam,
            success : resolve,
            error   : reject
        });
    },
    // 获取书籍详细信息
    getBookDetail : function(bookId, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/book/detail.do'),
            data    : {
                bookId : bookId
            },
            success : resolve,
            error   : reject
        });
    }
}
module.exports = _book;