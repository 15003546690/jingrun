<template>
	<div>
		<div class="right_box1_body">
			<div class="right_box1_body_left">
				<img v-lazy="changeGoodsDate.goodsPicture" />
			</div>
			<div class="right_box1_body_right">
				<div>{{changeGoodsDate.goodsName}}</div>
				<p>兑换数量：1</p>
				<p>商品价格：<i>{{changeGoodsDate.goodsPrice}}</i><img src="../../../assets/img/eventGroup/event_jindou.png" /></p>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		props: [
			'changeGoodsDate'
		]
	}
</script>
<style scoped>
.right_box1_body {min-height: 166px;width: 97%;margin: 0 auto;display: inline-block;}
.breadst {width: 97%;margin: 0 auto;}
.right_box1_body_left,.right_box1_body_right {float: left;}
.right_box1_body_left {width: 282px;height: 164px;line-height: 164px;text-align: center;border: solid 1px #ddd;}
.right_box1_body_left>img {width: 100%;height: 100%;}
.right_box1_body_right {margin-left: 26px;}
.right_box1_body_right>div {line-height: 30px;color: #45413e;font-size: 20px;}
.right_box1_body_right>p {height: 32px;line-height: 32px;color: #676767;font-size: 16px;}
.right_box1_body_right>p>img {vertical-align: text-top;margin-left: 5px;}
</style>