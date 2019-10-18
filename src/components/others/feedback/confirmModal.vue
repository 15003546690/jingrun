<template>
	<div class="confirm_modal" v-show="showindexID">
		<div class="confirm_box">
			<div class="confirm_main">
				<div class="confirm_main_head">
					<p>提示</p>
					<span @click="isHide"><img src="../../../assets/img/center/close.png"/></span>
				</div>
				<div class="confirm_text">
					<div class="confirm_text_box">
						<p>尊敬的用户您好，已收到您的反馈，未来无限网致力为用户提供更优质、更完善的服务，我们会持续改进，谢谢您的反馈！</p>
					</div>
				</div>
				<div class="confirm_btn">
					<button @click="failindex">确定</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		props: [
			'feedBackList'
		],
		data(){
			return {
				showindexID:true
			}
		},
		methods: {
	    	isHide() {
				this.showindexID=false
				this.$emit('hideindex')
			},
		   	failindex(){
		   		this.showindexID=false
				this.$emit('hideindex')
		   	}
		}
	}
</script>
<style scoped>
.confirm_modal{
	width: 100%;
	height: 100%;
	position: fixed;
	left: 0;
	top: 0;
	background: url(../../../assets/img/eventGroup/zhezhao.png) no-repeat center;
	background-size: 100%;
	z-index: 5;
}
.confirm_box{
	width: 435px;
	height: 196px;
	background: #e6e6e6;
	position: absolute;
	left: 0;
	top: 0;
	bottom: 0;
	right: 0;
	margin: auto;
}
.confirm_main{
	width: 423px;
	height: 184px;
	background: #fff;
	border: 1px solid #c9c9c9;
	margin: auto;
	margin-top: 5px;
}
.confirm_main_head{
	width: 100%;
	height: 32px;
}
.confirm_main_head>p{
	float: left;
	line-height: 32px;
	color: #323232;
	font-size: 14px;
	padding-left: 13px;
}
.confirm_main_head>span{
	display: block;
	float: right;
	cursor: pointer;
}
.confirm_text{
	width: 340px;
	height: 85px;
	line-height: 85px;
	text-align: center;
	margin: auto;
}
.confirm_text_box{
	display: inline-block;
	vertical-align: middle;
}
.confirm_text_box>p{
	line-height: 22px;
	text-align: left;
}
.confirm_btn{
	width: 100%;
	height: 32px;
	text-align: center;
	color: #323232;
	font-size: 14px;
}
.confirm_btn>button{
	width: 98px;
	height: 32px;
	background: url(../../../assets/img/eventGroup/event-btn.png) no-repeat center;
	border: 0;
	outline: none;
	color: #fff;
	font-size: 14px;
	cursor: pointer;
}
</style>