<template>
  <div class="book">
    <div class="book-item" v-for="book in this.books" :key="book.id" @click="goToDetail(book.id)">
      <img class="book-image" :src="book.image">
      <p class="book-text">{{book.name}}</p>
      <p class="book-text">{{book.author}}</p>
      <p class="book-text">￥{{book.price}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    books: Array
  },
  methods: {
    goToDetail (id) {
      this.$router.push({ path: '/detail', query: { bookId: id } })
    }
  }
}
</script>

<style lang="stylus" scoped>
.book
  .book-item
    display inline-block
    width 20%
    text-align center
    .book-image
      height 120px
      width 100px
    .book-text
      width 100%
      padding 0 5px
      margin 5px 0
      overflow hidden
      white-space nowrap
      text-overflow ellipsis
</style>
