<template>
	<div id="alertText">
		<div class="alertText_box">
			<div class="alertText_box_close" @click='close'>
				<img src="../../../../assets/img/chinese/images/alert-close.png" alt="" />
			</div>
			<div class="alertText_box_mychinese">
				<p>我的汉字：</p>
				<input type="text" placeholder="只可输入一个汉字" v-model="mychineseNum" @input="mychineseCk" maxlength="1"/>
				<!--<span v-show="altText">汉字征集只可提议一个字</span>-->
			</div>
			<div class="alertText_box_reason">
				<p>参选缘由：</p>
				<textarea name="" rows="" cols="" maxlength="500" @input="textareaCk" v-model="areaNum">
					
				</textarea>
				<span>{{spaNum}}/500</span>
			</div>
			<div class="alertText_box_btn" @click="comitBtn">
				<img src="../../../../assets/img/chinese/images/alert-btn.png" alt="" />
			</div>
		</div>
		<Aalert :alertText='alertText' @vNum='vNum' v-show='alertIsShow'/>
	</div>
</template>
<script>
	import Aalert from '../solicitation/alertNum'
	export default{
		components:{
			Aalert
		},
		data(){
			return{
				mychineseNum:null,
				altText:false,
				areaNum:null,
				spaNum:0,
				textShow:true,
				loginToken:null,
				alertText:null,
				alertIsShow:false,
				activityId:null
			}
		},
		created(){
			this.activityId=this.GetQueryString('activityId')
		},
		methods:{
			GetQueryString(name){
		     	return decodeURIComponent((new RegExp('[?|&]'+name+'='+'([^&;]+?)(&|#|;|$)').exec(location.href)||[,""])[1].replace(/\+/g,'%20'))||null;
			},
			vNum(){
				this.alertIsShow=false
			},
			mychineseCk(){
				if(this.mychineseNum.length==1){
					this.altText=true
				}else{
					this.altText=false
				}
			},
			textareaCk(){
				this.spaNum=this.areaNum.length
			},
			close(){
				this.$emit('vshow')
			},
			comitBtn(){
				this.$CPOST('/account/v1/userSubject/addActivitySubject' + this.$signParam(), {
					"activityId": this.activityId,
				  	"attachment": "",
				  	"attachmentName": "",
				  	"content": this.areaNum,
				  	"img1": "",
				  	"img2": "",
				  	"img3": "",
				  	"title": this.mychineseNum
			    },(res) => {
			      	if(res.resultCode==200){
			      		this.alertIsShow=true
			      		this.alertText='成功了'
			      		this.areaNum=null;
			      		this.mychineseNum=null;
			      		this.spaNum=0;
//			      		this.$emit('vshow')
			      	}else{
			      		this.alertIsShow=true
			      		this.alertText=res.resultMessages
			      	}
			    })
			}
		}
	}
</script>
<style>
	#alertText{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,0.6);
		z-index: 9999999;
	}
	.alertText_box{
		padding: 145px 154px 0 162px;
		box-sizing: border-box;
		width: 841px;
		height: 573px;
		margin: auto;  
		position: absolute;  
		top: 0; left: 0; bottom: 0; right: 0;  
		background: url(../../../../assets/img/chinese/images/alert-text.png) no-repeat;
	}
	.alertText_box_close{
		position: absolute;
		top: -31px;
		right: 0;
		cursor: pointer;
	}
	.alertText_box_mychinese{
		width: 510px;
		height: 60px;
	}
	.alertText_box_mychinese p{
		font-size: 14px;
		margin-top: 4px;
		float: left;
		color: #966764;
	}
	.alertText_box_mychinese input{
		float: left;
		width: 86%;
		height: 28px;
		border: solid 1px #f0d6b7;
		padding-left: 10px;
		box-sizing: border-box;
	}
	.alertText_box_mychinese span{
		font-size: 12px;
		color: #d3281c;
		margin-left: 81px;
		margin-top: 7px;
	}
	.alertText_box_reason{
		width: 100%;
		height: 150px;
		position: relative;
	}
	.alertText_box_reason p{
		font-size: 14px;
		margin-top: 4px;
		float: left;
		color: #966764;
	}
	.alertText_box_reason textarea{
		width: 438px;
		float: left;
		border: solid 1px #f0d6b7;
		resize: none;
		height: 148px;
		outline: none;
		padding: 10px;
		box-sizing: border-box;
	}
	.alertText_box_reason span{
		display: inline-block;
		color: #cfc6c6;
		font-size: 12px;
		width: 60px;
		height: 15px;
		position: absolute;
		bottom: 13px;
		right: 14px;
	}
	.alertText_box_btn{
		width: 131px;
		height: 36px;
		margin-top: 5px;
		float: right;
	    margin-right: 12px;
	    cursor: pointer;
	}
</style>