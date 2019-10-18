<template>
	<!--物流-->
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
		<div class="pic_shopping">
			<div>
				<div class="pic_shopping_title">订单详情</div>
				<p class="pic_shopping_p">订单号：{{expressNonber}}</p>
				<p class="pic_shopping_p" v-if="Statenuber==0">订单状态：未发货</p>
				<p class="pic_shopping_p" v-if="Statenuber==1">订单状态：已发货</p>
				<div class="logistics">
					<div class="logistics_body">
						<div class="logistics_body_title">
							<div class="logistics_body_title_title">收货人信息</div>
							<div class="logistics_body_title_new">
								<p>收货人：{{ChangeGoods.realName}}</p>
							</div>
							<div class="logistics_body_title_new">
								<p>地址：{{ChangeGoods.address}}</p>
							</div>
							<div class="logistics_body_title_new">
								<p>联系方式：{{ChangeGoods.mobilePhone}}</p>
							</div>
						</div>
						<div class="logistics_body_title_body">
							<p class="logistics_bodyp">快递{{ChangeGoods.expressName}}的物流信息</p>
							<p v-for="item in traces" >
								<a>{{item.AcceptTime}}</a>
								{{item.AcceptStation}}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
					changeGoodsDate: [],
					ChangeGoods: [],
					expressNonber:'',
					Statenuber:'',
					traces:null
				}
			},
			created() {
				setTimeout(()=>{
					this.getConversion()
					this.getExchangeDetail()
				},50)
			},
			methods: {
				getConversion() {
					this.$CPOST('/mall/v1/mall/exchangeGoodsData',{
						goodsId: this.$route.query.oodId
					},(res) => {
						this.changeGoodsDate = res.resultValue;
					})
				},
				getExchangeDetail() {
					this.$CPOST('/mall/v1/mall/getExchangeDetail', {
                        orderId:this.$route.query.derId
					},(res) => {
						this.ChangeGoods = res.resultValue;
						this.expressNonber = res.resultValue.expressNo;
						this.Statenuber= res.resultValue.orderTraces.State;
						this.traces=res.resultValue.orderTraces.Traces;
					})
				}
			}
	}
</script>
<style scoped>
.pic_shopping {min-height: 200px;width: 844px;}
.pic_shopping_title {height: 35px;line-height: 35px;color: #3d3d3d;font-size: 14px;font-weight: bold;border-bottom: solid 1px #bfbfbf;}
.pic_shopping_p{height: 54px;line-height: 54px;color: #5f5e5e;font-size: 14px;display: inline-block;margin-right: 15px;}
.logistics {min-height: 460px;border: solid 1px #e5e5e5;}
.logistics_body {width: 790px;min-height: 460px;margin: 0 auto;}
.logistics_body_title {height: 129px;border-bottom: solid 1px #d9d9d9;font-size: 12px;color: #8a8a8a;}
.logistics_body_title_title {height: 30px;line-height: 30px;font-size: 14px;color: #272727;}
.logistics_body_title_new {height: 24px;}
.logistics_body_title_new>span {width: 74px;}
.logistics_body_title_new>span,
.logistics_body_title_new>p {float: left;line-height: 24px;text-align: right;}
.logistics_body_title_body>p {font-size: 12px;color: #9b9a9a;line-height: 24px;}
.logistics_body_title_body>p.logistics_bodyp {font-size: 14px;color: #272727;line-height: 30px;}
.logistics_body_title_body>p>a {margin-right: 18px;}
.receiving {color: #ff7200 !important;}
.receiving_color {color: #454545 !important;}
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