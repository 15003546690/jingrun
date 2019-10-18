<template>
	<div id="alertDetails" v-show="alertIsShow">
		<div class="alertDetails_box">
			<div class="alertDetails_box_close" @click="close">
				<img src="../../../../assets/img/chinese/images/alert-close.png" alt="" />
			</div>
			<div class="alertDetails_box_text">
				{{alertText}}
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
				alertIsShow:true
			}
		},
		methods:{
			close(){
				this.$emit('vdetail')
			}
		}
	}
</script>
<style>
	#alertDetails{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,0.6);
		z-index: 9999999;
	}
	.alertDetails_box{
		padding: 126px 134px 42px 134px;
		box-sizing: border-box;
		width: 841px;
		height: 563px;
		margin: auto;  
		position: absolute;  
		top: 0; left: 0; bottom: 0; right: 0;  
		background: url(../../../../assets/img/chinese/images/alertDetail.png) no-repeat;
	}
	.alertDetails_box_close{
		position: absolute;
		top: -31px;
		cursor: pointer;
		right: 0;
	}
	.alertDetails_box_text{
		overflow: auto;
		width: 100%;
		height: 394px;
		text-align: left;
		line-height: 40px;
		color: #8e5e5c;
		font-size: 22px;
	}
</style>