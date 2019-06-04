<template>
  <div class="carousel">
    <div id="myCarousel" class="carousel slide">
      <!-- 轮播（Carousel）指标 -->
      <ol class="carousel-indicators">
        <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
        <li data-target="#myCarousel" data-slide-to="1"></li>
        <li data-target="#myCarousel" data-slide-to="2"></li>
      </ol>
      <!-- 轮播（Carousel）项目 -->
      <div class="carousel-inner">
        <div class="item active">
          <img
            src="http://img63.ddimg.cn/upload_img/00770/1234/100-50p-1556621551.jpg"
            alt="First slide"
          >
        </div>
        <div class="item">
          <img
            src="http://img61.ddimg.cn/upload_img/00087/geq/750-315-1556591470.jpg"
            alt="Second slide"
          >
        </div>
        <div class="item">
          <img
            src="http://img62.ddimg.cn/upload_img/00767/a/750-315-1557455937.jpg"
            alt="Third slide"
          >
        </div>
      </div>
      <!-- 轮播（Carousel）导航 -->
      <a class="carousel-control left" href="#myCarousel" data-slide="prev">
        <span _ngcontent-c3 aria-hidden="true" class="glyphicon glyphicon-chevron-left"></span>
      </a>
      <a class="carousel-control right" href="#myCarousel" data-slide="next">
        <span _ngcontent-c3 aria-hidden="true" class="glyphicon glyphicon-chevron-right"></span>
      </a>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="stylus" scoped></style>