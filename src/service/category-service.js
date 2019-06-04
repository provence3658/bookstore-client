'use strict';

var _mm = require('@/common/js/mm.js');

var _category = {
    // 获取书籍列表
    getCategoryList : function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/category/get_category.do'),
            success : resolve,
            error   : reject
        });
    },
    // 获取书籍详细信息
    getCategoryName : function(categoryId, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/category/get_name.do'),
            data    : {
              categoryId : categoryId
            },
            success : resolve,
            error   : reject
        });
    }
}
module.exports = _category;