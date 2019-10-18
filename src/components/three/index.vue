<template>
	<div>
		第三方登录
	</div>
</template>
<script>
	export default {
		data(){
			return {
				
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
								/*//测试isNo
								let isNo={
										isNo:true
									}
									let obj1=JSON.stringify(isNo)
									sessionStorage.setItem('isNo',obj1)
//									that.$router.push({path:'/na'})
								//测试unionIda
								let Id={
										openid:data.resultValue.openid,
										unionid:data.resultValue.unionid,
									}
									let id=JSON.stringify(Id)
									sessionStorage.setItem('Id',id)*/
								if(data.resultCode==900035){
									that.$router.push({path:'/'})
								}else if(data.resultValue.isbinding==true){
									let isNo={
										isNo:true
									}
									let obj1=JSON.stringify(isNo)
									sessionStorage.setItem('isNo',obj1)
									let Id={
										openid:data.resultValue.openid,
										unionid:data.resultValue.unionid,
									}
									let id=JSON.stringify(Id)
									sessionStorage.setItem('Id',id)
									that.$router.push({path:'/na'})
								}else if(data.resultValue.isbinding==false){
									let isNo={
										isNo:false
									}
									let obj1=JSON.stringify(isNo)
									sessionStorage.setItem('isNo',obj1)
									let Id={
										openid:data.resultValue.openid,
										unionid:data.resultValue.unionid,
									}
									let id=JSON.stringify(Id)
									sessionStorage.setItem('Id',id)
									that.$router.push({path:'/na'})
								}
							}
						})
		  		}
		  	},
			getUrlKey(name){
		         return decodeURIComponent((new RegExp('[?|&]'+name+'='+'([^&;]+?)(&|#|;|$)').exec(location.href)||[,""])[1].replace(/\+/g,'%20'))||null;
		    } 
		}
	}
</script>