<template>
	<div class="right_box1_body">
		<div class="right_box1_body_left">
			<img v-lazy="GoodsDate.goodsImg " />
		</div>
		<div class="right_box1_body_right">
			<div>{{GoodsDate.goodsName}}</div>
			<p>兑换数量：{{GoodsDate.quantity}}</p>
			<p>商品价格：<i>{{GoodsDate.price}}</i><img src="../../../assets/img/eventGroup/event_jindou.png" /></p>
			<p>订单编号：{{GoodsDate.orderId}}</p>
			<p>下单日期：{{GoodsDate.createTime}}</p>
			<p v-if="GoodsDate.status==0">订单状态：未发货</p>
			<p v-if="GoodsDate.status==1">订单状态：已发货</p>
			<p class="camilo">卡密信息：{{GoodsDate.cardPassWord}}</p>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
				return {
					GoodsDate: []
				}
			},
			created() {
				setTimeout(()=>{
					this.changeGoodsDate();
				},50)
			},
			methods: {
				changeGoodsDate() {
					this.$CPOST('/mall/v1/mall/queryCardPassWord',{
						goodsId: this.$route.query.oodId,
						orderId: this.$route.query.derId
					},(res) => {
						this.GoodsDate = res.resultValue;
					})
				}
			}
	}
</script>
<style scoped>
.right_box1_body {min-height: 222px;display: inline-block;}
.right_box1_body_left,.right_box1_body_right {float: left;}
.right_box1_body_left {width: 282px;height: 165px;border: solid 1px #ddd;margin-right: 15px;text-align: center;}
.right_box1_body_left>img {width: 100%;height: 100%;vertical-align: middle;}
.right_box1_body_right {width: 660px;}
.right_box1_body_right>div {height: 30px;line-height: 30px;color: #45413e;font-size: 20px;}
.right_box1_body_right>p {height: 25px;line-height: 25px;color: #676767;font-size: 16px;}
.right_box1_body_right>p>img {margin-left: 5px;vertical-align: text-top;}
.camilo {color: #dd2727 !important;}
</style>