<template>
  <div class="list">
    <div class="card">
      <h2>收货地址</h2>
      <button type="button" class="add-btn btn btn-primary" data-toggle="modal" data-target="#myModal">
        添加收货地址
      </button>
      <table class="table">  
        <tbody>
          <tr class="row">
            <td class="text-muted">收件人姓名</td>
            <td class="text-muted">{{list.receiverName}}</td>
          </tr>
          <tr class="row">
            <td class="text-muted">收件人手机</td>
            <td class="text-muted">{{list.receiverPhone}}</td>
          </tr>
          <tr class="row">
            <td class="text-muted">收件人地址</td>
            <td class="text-muted">
              {{`${list.receiverProvince} ${list.receiverCity} ${list.receiverDistrict} ${list.receiverAddress}`}}
              </td>
          </tr>
          <tr class="row">
            <td class="text-muted"></td>
            <td class="text-muted"></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {}
  }
}
</script>

<style lang="stylus" scoped>
.card
  position relative
  .add-btn
    position absolute
    right 0
    top 0
  .table
    margin-top 20px
</style>
