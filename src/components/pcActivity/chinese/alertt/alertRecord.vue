<template>
	<div id="alertRecord">
		<div class="alertRecord_box">
			<div class="alertRecord_box_close" @click="close">
				<img src="../../../../assets/img/chinese/images/alert-close.png" alt="" />
			</div>
			<div class="alertRecord_main">
				<div class="alertRecord_content" v-for="i in lookData">
					<div class="alertRecord_content_top">
						<p>{{i.title}}</p>
						<img src="../../../../assets/img/chinese/images/alertRecord-ytg.png" alt="" v-show='i.status==2'/>
						<img src="../../../../assets/img/chinese/images/alertRecord-wtg.png" alt="" v-show='i.status==1'/>
						<img src="../../../../assets/img/chinese/images/alertRecord-dsh.png" alt="" v-show='i.status==0'/>
						<span>{{formatDate(i.createTime)}}</span>
					</div>
					<div class="alertRecord_content_center">
						{{i.content}}
						<p>
							<span v-show='i.content.length>44' @click="down($event)"></span>
						</p>
					</div>
					<div class="alertRecord_content_bottom_ytg" v-show='i.status==2'>
						{{i.subjectOption}}
					</div>
					<div class="alertRecord_content_bottom_wtg" v-show='i.status==1'>
						{{i.subjectOption}}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		
		data(){
			return{
				lookData:null,
				loginToken:null,
				activityId:null
			}
		},
		created(){
			this.loginToken=JSON.parse(sessionStorage.getItem('loginToken'))
			if(this.loginToken!=null){
				this.loginToken=JSON.parse(sessionStorage.getItem('loginToken')).loginToken
			}
			this.activityId=this.GetQueryString('activityId')
			this.lookLk()
		},
		methods:{
			GetQueryString(name){
		     	return decodeURIComponent((new RegExp('[?|&]'+name+'='+'([^&;]+?)(&|#|;|$)').exec(location.href)||[,""])[1].replace(/\+/g,'%20'))||null;
			},
			down(e){
				if(e.path[2].classList[0]=='alertRecord_content_center_bg'){
					e.path[2].classList.remove('alertRecord_content_center_bg')
					e.path[2].classList.add('alertRecord_content_center')
				}else{
					e.path[2].classList.add('alertRecord_content_center_bg')
					e.path[2].classList.remove('alertRecord_content_center')
				}
			},
			formatDate (timestamp) {
				return this.$dateFormat(timestamp, 'yyyy/mm/dd HH:MM')
			},
			close(){
				this.$emit('vRecShow')
			},
			lookLk(){
				this.$CPOST('/account/v1/userSubject/queryUserSubject' + this.$signParam(), {
						"activityId": '141898831263432704',
						"page": 0,
						"size": 100000
				    },(res)=>{
						console.log(res.data)
						this.lookData=res.resultValue.userSubjectEntitys
						console.log(this.lookData)
					})
			}
		}
	}
</script>
<style>
	#alertRecord{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,0.6);
		z-index: 9999999;
	}
	.alertRecord_box{
		padding: 144px 0 0 150px;
		box-sizing: border-box;
		width: 841px;
		height: 563px;
		margin: auto;  
		position: absolute;  
		top: 0; left: 0; bottom: 0; right: 0;  
		background: url(../../../../assets/img/chinese/images/alertRecord.png) no-repeat;
	}
	.alertRecord_box_close{
		position: absolute;
		top: -31px;
		right: 0;
		cursor: pointer;
	}
	.alertRecord_main{
		width: 561px;
		height: 363px;
		overflow: auto;
	}
	.alertRecord_content{
		padding: 20px 0px;
		box-sizing: border-box;
		border-bottom: solid 1px #f0d6b7;
	}
	.alertRecord_content_top{
		width: 100%;
		height: 31px;
	}
	.alertRecord_content_top p{
		font-size: 24px;
		color: #8e5e5c;
		float: left;
	}
	.alertRecord_content_top span{
		float: right;
		line-height: 28px;
		font-size: 12px;
		color: #8e5e5c;
	}
	.alertRecord_content_top img{
		float: right;
		margin-top: 3px;
		margin-left: 20px;
	}
	.alertRecord_content_bottom_ytg{
		font-size: 12px;
		color: #029c15;
		line-height: 20px;
	}
	.alertRecord_content_bottom_wtg{
		font-size: 12px;
		color: #d01a0f;
		line-height: 20px;
	}
	.alertRecord_content_center{
		font-size: 12px;
		line-height: 25px;
		color: #8e5e5c;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		cursor: pointer;
	}
	.alertRecord_content_center_bg{
		font-size: 12px;
		line-height: 25px;
		color: #8e5e5c;
		cursor: pointer;
	}
	.alertRecord_content_center_bg p{
		width: 100%;
		float: right;
		line-height: 30px;
		height: 30px;
		text-align: right;
	}
	.alertRecord_content_center p span{
		float: right;
		display: inline-block;
    	width: 40px;
    	height: 15px;
		background: url(../../../../assets/img/chinese/images/down.png) no-repeat;
	}
	.alertRecord_content_center_bg p span{
		float: right;
		display: inline-block;
    	width: 40px;
    	height: 15px;
		background: url(../../../../assets/img/chinese/images/up.png) no-repeat;
	}
	.alertRecord_content_center p{
		width: 100%;
		float: right;
		height: 30px;
		line-height: 30px;
		text-align: right;
	}
</style>