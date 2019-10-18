<template>
	<div>
		<div class="pic_shopping_title">订单详情</div>
		<p class="pic_shopping_p">订单号：15645313</p>
		<p class="pic_shopping_p">订单状态：未发货</p> <!--v-if="goodsAddress.status==0"-->
		<!--<p class="pic_shopping_p" v-if="goodsAddress.status==1">订单状态：已发货</p>-->
		<div class="logistics">
			<div class="logistics_body">
				<div class="logistics_body_title">
					<div class="logistics_body_title_title">收货人信息</div>
					<div class="logistics_body_title_new">
						<span>收货人：</span>
						<p>迷你</p>
					</div>
					<div class="logistics_body_title_new">
						<span>地址：</span>
						<p>备份拷贝的发表</p>
					</div>
					<div class="logistics_body_title_new">
						<span>联系方式：</span>
						<p>那就看v地方了嘎达</p>
					</div>
				</div>
				<div class="logistics_body_title_body">
					<p class="logistics_bodyp">快递100的物流信息</p>
					<p><a>2014-12-23 05:25:52</a>快件已到达【上海徐汇龙华公司】 扫描员是【任伟锋】上一站是【】</p>
					<p class="receiving">
						<a>2014-12-23 05:25:52</a>已签收,签收人是前台签收
					</p>
					<p class="receiving_color">物流公司：圆通快递&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;运单编号：8291928297438</p>
					<p class="receiving_color hide">暂无物流信息</p>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
		export default {
			data() {
				return {
					ChangeGoods: [],
					goodsAddress: '',
					expressNo: '',
					orderTraces: '',
					realName: '',
					mobilePhone: ''
				}
			},
			created() {
				this.getExchangeDetail()
			},
			methods: {
				getExchangeDetail() {
					this.$axios.post('http://192.168.0.13:7500/mall/v1/mall/getExchangeDetail' + this.$signParam(), {
							expressNo: this.expressNo,
							orderTraces: this.orderTraces,
							realName: this.realName,
							mobilePhone: this.mobilePhone,
							orderId: '115441991081230336'
						})
						.then(res => {
							const data = res.data
							this.ChangeGoods = data.resultValue
							this.goodsAddress = data.resultValue.userAddressList
						})
						.catch(err => {
							const data = err.response.data
						})
				}
			}
	}
</script>
<style scoped>
	.pic_shopping_title {
		height: 35px;
		line-height: 35px;
		color: #3d3d3d;
		font-size: 14px;
		font-weight: bold;
		border-bottom: solid 1px #bfbfbf;
	}
	.pic_shopping_p {
		height: 54px;
		line-height: 54px;
		color: #5f5e5e;
		font-size: 14px;
		display: inline-block;
		margin-right: 15px;
	}
	.logistics {
		min-height: 460px;
		border: solid 1px #e5e5e5;
	}
	.logistics_body {
		width: 790px;
		min-height: 460px;
		margin: 0 auto;
	}
	.logistics_body_title {
		height: 129px;
		border-bottom: solid 1px #d9d9d9;
		font-size: 12px;
		color: #8a8a8a;
	}
	.logistics_body_title_title {
		height: 30px;
		line-height: 30px;
		font-size: 14px;
		color: #272727;
	}
	.logistics_body_title_new {
		height: 24px;
	}
	.logistics_body_title_new>span {
		width: 74px;
	}
	.logistics_body_title_new>span,
	.logistics_body_title_new>p {
		float: left;
		line-height: 24px;
		text-align: right;
	}
	.logistics_body_title_body>p {
		font-size: 12px;
		color: #9b9a9a;
		line-height: 24px;
	}
	.logistics_body_title_body>p.logistics_bodyp {
		font-size: 14px;
		color: #272727;
		line-height: 30px;
	}
	.logistics_body_title_body>p>a {
		margin-right: 18px;
	}
	.receiving {
		color: #ff7200 !important;
	}
	.receiving_color {
		color: #454545 !important;
	}
</style>