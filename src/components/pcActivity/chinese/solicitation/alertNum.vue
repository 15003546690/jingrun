<template>
	<div id="alertNum" v-show="alertIsShow">
		<div class="alertNum_box">
			<div class="alertNum_box_close" @click="close">
				<img src="../../../../assets/img/chinese/images/alert-close.png" alt="" />
			</div>
			<div class="alertNum_box_text">
				{{alertText}}
			</div>
			<div class="alertNum_box_btn" @click="close">
				我知道了
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		props:[
			'alertText'
		],
		data(){
			return{
				alertIsShow:false
			}
		},
		methods:{
			close(){
				this.$emit('vNum')
			}
		}
	}
</script>
<style>
	.alertNum_box_btn{
		width: 120px;
		height: 34px;
		background: #8e5e5c;
		color: #ffebd2;
		text-align: center;
		line-height: 34px;
		border-radius: 8px;
		margin-left: 84px;
		margin-top: 15px;
		cursor: pointer;
	}
	#alertNum{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,0.6);
		z-index: 9999999;
	}
	.alertNum_box{
		padding: 88px 0 0 134px;
		box-sizing: border-box;
		width: 554px;
		height: 241px;
		margin: auto;  
		position: absolute;  
		top: 0; left: 0; bottom: 0; right: 0;  
		background: url(../../../../assets/img/chinese/images/alertNum.png) no-repeat;
	}
	.alertNum_box_close{
		position: absolute;
		top: -31px;
		cursor: pointer;
		right: 0;
	}
	.alertNum_box_text{
		width: 275px;
		text-align: center;
		line-height: 40px;
		color: #8e5e5c;
		font-size: 22px;
	}
</style>