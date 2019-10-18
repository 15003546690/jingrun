<template>
	<!--<Aalert :text='alertText' v-show='alert' @vshow='vshow'/>
	
	import Aalert from '../common/alert'
	
	components: {
		Aalert
	},
	
	
	alert:false,
	alertText:null
	

	vshow(){
		this.alert=false;
	}


	$('.confirm_modal').show()  ||  this.alert=true;
	this.alertText=res.data.resultMessages
	-->
	<div class="confirm_modal">
		<div class="confirm_box">
			<div class="confirm_main_or">
				<div class="confirm_main_head">
					<p>提示</p>
					<span @click='close'><img src="../../assets/img/center/close.png"/></span>
				</div>
				<!--<p class="confirm_text-p1">恭喜您成功参加活动</p>-->
				<div class="confirm_text">
					<div class="confirm_text_box">
						<p>{{text}}</p>
					</div>
				</div>
				<div class="confirm_btn">
					<button @click='close'>确定</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		props:[
			'text'
		],
		updated(){
			
		},
		methods:{
			close(){
				$('.confirm_modal').hide()
				this.$emit('vshow')
				this.$emit('yes');
			}
		}
	}
</script>
<style scoped="scoped">
	.confirm_modal{
	width: 100%;
	height: 100%;
	position: fixed;
	left: 0;
	top: 0;
	background: url(../../assets/img/eventGroup/zhezhao.png) no-repeat center;
	background-size: 100%;
	z-index: 9999;
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

.confirm_main,.confirm_main_or{
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
.confirm_text-p1{
	text-align: center;
	font-size: 18px;
}
.confirm_text{
	width: 340px;
	/*padding:15px 0;*/
	height: 85px;
	line-height: 85px;
	text-align: center;
	margin: auto;
}
.confirm_text_box{
	display: inline-block;
	vertical-align: middle;
	line-height: 24px;
	color: #323232;
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
	background: url(../../assets/img/eventGroup/event-btn.png) no-repeat center;
	border: 0;
	outline: none;
	color: #fff;
	font-size: 14px;
	cursor: pointer;
}
</style>