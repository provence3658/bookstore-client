<template>
  <div class="category">
    <el-menu class="el-menu-vertical-demo">
      <el-menu-item v-for="item in categoryList" :key="item.id" @click="goToList(item.id)">
        <span slot="title">{{item.name}}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
var _category = require('@/service/category-service.js')
export default {
  data () {
    return {
      categoryList: [],
      currentId: this.$route.query.categoryId
    }
  },
  mounted () {
    this.getCategoryList()
  },
  methods: {
    getCategoryList () {
      var _this = this
      _category.getCategoryList(
        res => {
          _this.categoryList = res
          console.log(res)
        },
        err => {
          _this.$message.error(err)
        }
      )
    },
    goToList (id) {
      this.$router.push({ path: '/list', query: { categoryId: id } })
      // console.log(id)
      this.currentId = id
      this.$emit('categoryId', id)
    },
    current (id) {
      this.currentId = this.$route.query.categoryId
      // console.log(current)
      // console.log(id)
      if (this.currentId === id) {
        return 'active'
      } else {
        return ''
      }
    }
  }
}
</script>

<style lang="stylus">
.category
  .el-menu
    border none
    text-align center
</style>
