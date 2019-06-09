<template>
  <div class="carousel">
    <el-carousel indicator-position="outside">
      <el-carousel-item v-for="(item,index) in list" :key="index">
        <div class="img-wrapper">
          <img :src="item.img">
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [
        {
          img: 'http://img63.ddimg.cn/upload_img/00770/1234/100-50p-1556621551.jpg'
        }, {
          img: 'http://img61.ddimg.cn/upload_img/00087/geq/750-315-1556591470.jpg'
        }, {
          img: 'http://img62.ddimg.cn/upload_img/00767/a/750-315-1557455937.jpg'
        }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped></style>
