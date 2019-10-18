<template>
	<div class="prompt">
		<div class="prompt_body">
			<div class="prompt_body_main">
				<div class="prompt_main">
					<p>{{Text}}</p>
		 	     <img @click="close" src="../../../../components/pcActivity/springFestival/img/close.png"/>
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
<style scoped>
	.prompt{width:100%;height:100%;position: fixed;top: 0;left: 0;right: 0;bottom:0;background: rgba(0,0,0,0.3);z-index: 2;text-align: center;}
	.prompt_body{display: table;width: 100%;height: 100%;}
	.prompt_body_main{display: table-cell;vertical-align: middle;}
	.prompt_main{width: 594px;height: 226px;position:relative;padding-top: 156px;background: url(../../../../components/pcActivity/springFestival/img/sub_btn.png) no-repeat center;margin: 0 auto;}
    .prompt_main>p{width:464px;margin:0 auto;font-size: 34px;color: #fb1f3c;line-height: 40px;}
    .prompt_main>img{position: absolute;top: -20px;right: -40px;cursor: pointer;}
</style>               