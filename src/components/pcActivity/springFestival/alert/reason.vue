<template>
	<!--<!--评选缘由-->
	<div class="record">
		<div class="record_body">
			<div class="record_body_main">
	    	<div class="reason_body">
	    		<p><img src="../../../../components/pcActivity/springFestival/img/reson.png"/></p>
	    		<div class="reason_body_reason">
	    		    <div class="body_reason">{{Text}}</div>
	    		</div>
	    		<img class="close" @click="close" src="../../../../components/pcActivity/springFestival/img/close.png"/>
	    	</div>
	    	
	</div>
   </div>
	</div>
	</div>
</template>
<script>
	export default{
		props:[
			'Text'
		],
		data(){
			return{
			}
		},
		methods:{
			close(){
				this.$emit('close')
			}
		}
	}
</script>
<style>
	/*评选缘由*/
    .record{width:100%;height:100%;position: fixed;top: 0;left: 0;right: 0;bottom:0;background:rgba(0,0,0,0.3);z-index: 2;text-align: center;}
	.record_body{display: table;width: 100%;height: 100%;}
    .record_body_main{display: table-cell;vertical-align: middle;}
    .reason_body{width: 594px;height: 628px;margin:0 auto;position:relative;margin: 0 auto;padding-top: 156px;background: url(../../../../components/pcActivity/springFestival/img/big_bg.png) no-repeat center;}
    .reason_body_reason{width: 484px;height: 438px;margin:0 auto;overflow-y:auto;}
    .body_reason{width: 440px;float:right;margin-right:10px;text-align:left;line-height: 28px;color: #8e5e5c;}
    .reason_body>p{height: 32px;text-align: center;}
    .close{position: absolute;top: 58px;right: -40px;cursor: pointer;}
    /*滚动条*/
    .reason_body_reason::-webkit-scrollbar{width: 10px;}
	/*定义滚动条的轨道，内阴影及圆角*/
	.reason_body_reason::-webkit-scrollbar-track{width: 6px;padding:2px 2px;-webkit-box-shadow: inset 0 0 2px rgba(247,225,200,0); border-radius:20px;background: #f7e1c8;}
	/*定义滑块，内阴影及圆角*/
	.reason_body_reason::-webkit-scrollbar-thumb{-webkit-box-shadow: inset 0 0 2px rgba(211,192,171,0);background: #d3c0ab;border-radius:20px;margin: 0 auto;}
</style>