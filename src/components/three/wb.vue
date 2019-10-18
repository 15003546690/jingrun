<template>
	<div>
		<div>
			第三方微博登录
		</div>
		<div class="confirm_box" v-show="laye">
	      <div class="confirm_main_or">
	        <div class="confirm_main_head">
	          <p>提示</p>
	          <span v-on:click="clilay"><img src="../../assets/img/center/close.png"/></span>
	        </div>
	        <div class="confirm_text">
	          <div class="confirm_text_box">
	            	第三方请求信息失败
	          </div>
	        </div>
	      </div>
	   </div>
	</div>
	
</template>
<script>
	export default {
		data(){
			return {
				laye:true
			}
		},
		created(){
			this.getCode()
		},
		methods:{
			getCode(){
				//alert(this.getUrlKey('code'))
		  		let code=this.getUrlKey('code')
		  		let that=this
		  		if(this.getUrlKey('code')!=null){
		  			$.ajax({
						url:this.$axios.defaults.baseURL+'/account/callback/v1/auth/wechat',
						type:'GET',
						data:{
							'code':code
						},
						success:function(data){
							console.log(data)
							sessionStorage.setItem('openid',JSON.stringify(data.resultValue.openid))
							sessionStorage.setItem('unionid',JSON.stringify(data.resultValue.unionid))
							console.log(data.resultCode)
							if(data.resultMessages=='第三方请求信息失败，openid为空'){
								this.laye=false
							}else{
								this.laye=true
							}
						}
					})
		  			
		  		}
		  	},
			getUrlKey(name){
		        return decodeURIComponent((new RegExp('[?|&]'+name+'='+'([^&;]+?)(&|#|;|$)').exec(location.href)||[,""])[1].replace(/\+/g,'%20'))||null;
		   	},
		   	clilay(){
		   		this.laye=false
		   	}
		}
	}
</script>
<style scoped>
.confirm_box{
  width: 435px;
  height: 196px;
  background: #e6e6e6;
  position: absolute;
  left: 0;
  top: -380px;
  bottom: 0;
  right: 0;
  margin: auto;
  z-index: 1000;
}
.confirm_main_or{
  /*display: none;*/
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
  background: #f0080a;
  /*background: url(../../../assets/img/eventGroup/event-btn.png) no-repeat center;*/
  border: 0;
  outline: none;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
}
.confirm_btn>button:nth-child(1){
	float: left;
	margin-left: 80px;
}
.confirm_btn>button:nth-child(2){
	float: right;
	margin-right: 80px;
}
</style>