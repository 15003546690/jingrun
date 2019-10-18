<template>
	<div>
		<div class="confirm_modall" v-show='confirmShow'>
			<div class="confirm_box">
				<div class="confirm_main_or">
					<div class="confirm_main_head">
						<p>提示</p>
						<span @click='confrimClose'><img src="../../assets/img/center/close.png"/></span>
					</div>
					<div class="confirm_textt">
						<div class="confirm_text_boxx">
							<p>为保障您账户的财产安全，现需要您实名认证后才能继续操作。</p>
						</div>
					</div>
					<div class="confirm_btn">
						<button @click='confirmOpen'>确定</button>
					</div>
				</div>
			</div>
		</div>
		<div class="authentication" v-show='show'>
			<div class="authentication-box">
				<div class="close" @click='confrimClose'>
					<img src="../../assets/img/close2.png" alt="">
				</div>
				<div class="authentication-title">
					<h2>实名认证</h2>
					<p>注：<span>*</span>为必填项</p>
				</div>
				<div class="authentication-info">
					<div class="authentication-info-name">
						<span>*</span>&nbsp真实姓名：<input type="text" v-model='name'>
					</div>
					<div class="authentication-info-name">
						<span>*</span>&nbsp身份证号：<input type="text" v-model='idcard'>
					</div>
					<div class="authentication-info-pic">
						<span>*</span>&nbsp证件照：
					</div>
					<div class="authentication-info-idcardpic">
						<div class="info-idcardpic-left">
							<img src="../../assets/img/idcard_pic.png" alt="">
						</div>
						<div class="info-idcardpic-center">
							<el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple
								  :action="uploadUrl"
								  :headers={Authorization:this.$store.state.token}
								  :show-file-list="false"
								  :on-success="justHandleAvatarSuccess"
								  accept="image/jpeg,image/jpg,image/png"
								  :data='justupload'
								  :before-upload="justBeforeAvatarUpload">
							  <i class="el-icon-upload"></i>
							  <div class="el-upload__text">手持身份证正面照</div>
							  <p class="inforMation_p"><img :src="justimageUrl" class="avatar"></p>
							</el-upload>
						</div>
						<div class="info-idcardpic-right">
							<el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple
								  :action="uploadUrl"
								  :headers={Authorization:this.$store.state.token}
								  :show-file-list="false"
								  :on-success="backHandleAvatarSuccess"
								  accept="image/jpeg,image/jpg,image/png"
								  :data='backupload'
								  :before-upload="backBeforeAvatarUpload">
							  <i class="el-icon-upload"></i>
							  <div class="el-upload__text">手持身份证反面照</div>
							  <p class="inforMation_p"><img :src="backimageUrl" class="avatar"></p>
							</el-upload>
						</div>
					</div>
					<div class="info-Prompt"><span></span>身份证有效期需一个月以上(照片不超过5M)</div>
					<div class="info-Prompt"><span></span>请务必按示例图片上传，注意拍摄清晰</div>
					<div class="authentication-btn" @click='comit'>
						提交
					</div>
				</div>
			</div>
		</div>
		<Aalert :text='alertText' v-show='alert' @vshow='vshow'/>
	</div>
</template>
<script>
import Aalert from './alert'
	export default{
		components: {
	        Aalert
        },
		data(){
			return{
				alert:false,//弹层
				alertText:'',//弹层内容
				name:'',
				idcard:'',
				show:false,
				confirmShow:true,
				uploadUrl: this.$base_url + '/share/v1/ditctArea/api/v1/fileUploadWaterPrint',   //上传头像接口
				//正面
				justupload:{
               		upload:null
               	},
               	justimageUrl:'',//头像
               	justheadSculpture:null,
               	//反面
				backupload:{
               		upload:null
               	},
               	backimageUrl:'',//头像
               	backheadSculpture:null,
			}
		},
		created(){/*
			this.checkChinese('123')
			console.log(/^[\u2E80-\u9FFF]+$/.test('赵超'))*/
			this.$Bury(window.location.href,'',0,'shimingrenzheng_05005')
		},
		methods:{
			confirmOpen(){
				this.confirmShow=false;
				this.show=true;
			},
			confrimClose(){
				this.confirmShow=true;
				this.show=false;
				this.$emit('authenclose')
			},
			vshow(){
				this.alert=false;
			},
			close(){
				this.show=false;
			},
			//提交
			comit(){
				if(this.name==''){
					this.alert=true;
					this.alertText='姓名不能为空';
				}else if(this.name.length>12){
					this.alert=true;
					this.alertText='姓名不能超过12个汉字';
				}else if(this.checkChinese(this.name)){
					console.log('姓名验证错误')
				}else if(this.idcard==''){
					this.alert=true;
					this.alertText='身份证号不能为空';
				}else if(this.isCardNo(this.idcard)){
					console.log('身份证号验证错误')
				}else if(this.justimageUrl==''){
					this.alert=true;
					this.alertText='请上传手持身份证正面照';
				}else if(this.backimageUrl==''){
					this.alert=true;
					this.alertText='请上传手持身份证反面照';
				}else{
					this.$CPOST('account/v1/userRealName/verifyRealName', {
						userName:this.name,
						identityId:this.idcard,
						faceImg:this.justimageUrl,
						backImg:this.backimageUrl
					},
					(res) => {
						if(res.resultCode===200){
							this.show=false;
							this.alert=true;
							this.alertText='您已提交认证信息，等待审核中';
						}else if(res.resultCode===10122){
							this.alert=true;
							this.alertText='已有信息正在审核中，请不要重复上传';
						}else if(res.resultCode===10123){
							this.alert=true;
							this.alertText='已经实名认证，请不要重复认证';
						}else if(res.resultCode===10127){
							this.alert=true;
							this.alertText=res.resultMessages;
						}else if(res.resultCode===10117){
							this.alert=true;
							this.alertText='身份证正面照错误';
						}else if(res.resultCode===10118){
							this.alert=true;
							this.alertText='身份证背面照错误';
						}else if(res.resultCode===10124){
							this.alert=true;
							this.alertText='用户名不能为空';
						}else if(res.resultCode===10120){
							this.alert=true;
							this.alertText='身份证号错误';
						}else{
							this.alert=true;
							this.alertText=res.resultMessages;
						}
					})
				}
			},
			//验证身份证号
			isCardNo(card) { 
				// 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X 
				var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; 
				if(reg.test(card) === false){ 
					this.alert=true;
					this.alertText='身份证输入不合法';
					return false; 
				} 
			},
			//验证是否为汉字
			checkChinese(val){ 
			　　var reg=/^[\u2E80-\u9FFF]+$/;
			　　if(!reg.test(val)){ 
					this.alert=true;
					this.alertText='只能输入汉字！'; 
			　　}       
			},
			//正面
			justHandleAvatarSuccess(res, file) {
		        this.justimageUrl = res.resultValue.url;
		        // this.justimageUrl = URL.createObjectURL(file.raw);
		        this.justheadSculpture=res.resultValue.url;
		    },
		    justBeforeAvatarUpload(file) {
		      	this.justupload.upload=file
		        const isJPG = file.type === 'image/jpeg'||'image/png';
		        const isLt2M = file.size /2 / 1024 / 1024 < 5;
		        if (!isJPG) {
		          this.$message.error('上传头像图片只能是 JPG/png 格式!');
		        }
		        if (!isLt2M) {
		          this.$message.error('上传头像图片大小不能超过 5MB!');
		        }
		        return isJPG && isLt2M;
		    },
		    //反面
		    backHandleAvatarSuccess(res, file) {
		        this.backimageUrl = res.resultValue.url;
		        // this.backimageUrl = URL.createObjectURL(file.raw);
		        this.backheadSculpture=res.resultValue.url;
		    },
		    backBeforeAvatarUpload(file) {
		      	this.backupload.upload=file
		        const isJPG = file.type === 'image/jpeg'||'image/png';
		        const isLt2M = file.size /2 / 1024 / 1024 < 5;
		        if (!isJPG) {
		          this.$message.error('上传头像图片只能是 JPG/png 格式!');
		        }
		        if (!isLt2M) {
		          this.$message.error('上传头像图片大小不能超过 5MB!');
		        }
		        return isJPG && isLt2M;
		    },
		}
	}
</script>
<style>
.el-upload-dragger{
	width: 110px;height: 70px;
}
.el-upload-dragger .el-icon-upload {
    font-size: 47px;color: #97a8be;margin: 0;line-height: 45px;
}
 .el-upload-dragger .el-upload__text {
    color: #97a8be;font-size: 8px;text-align: center;
} 
</style>
<style scoped='scoped'>
	.authentication{
		width: 100%;height: 100%;position: fixed;top: 0;left: 0;z-index: 999;background: rgba(0,0,0,.8);
	}
	.authentication-box{
		width: 450px;height: 526px;background: #fff;border-radius: 10px;position: fixed;margin-left: -225px;margin-top: -263px;left: 50%;top: 50%;padding: 38px 18px 18px 38px;
	}
	.close{
		width: 30px;height: 24px;position: absolute;right: 0;top: 15px;cursor: pointer;
	}
	.authentication-title{
		height: 34px;width: 100%;border-bottom: solid 1px #c3c3c3;line-height: 34px;padding: 0 20px;box-sizing: border-box;
	}
	.authentication-title h2{
		float: left;font-size: 20px;
	}
	.authentication-title p{
		font-size: 14px;color: #c3c3c3;float: right;
	}
	.authentication-title p span{
		color: #fa5858;
	}
	.authentication-info{
		width: 370px;height: 380px;margin: auto;margin-top: 40px;
	}
	.authentication-info-name{
		font-size: 14px;line-height: 40px;border-bottom: solid 1px #c3c3c3;margin-top: 30px;
	}
	.authentication-info-name input{
		border:none;
	}
	.authentication-info-name span{
		color: #fa5858;
	}
	.authentication-info-pic{
		font-size: 14px;line-height: 40px;margin-top: 30px;
	}
	.authentication-info-pic span{
		color: #fa5858;
	}
	.authentication-info-idcardpic{
		height: 125px;width: 100%;padding: 17px 12px;box-sizing: border-box;
	}
	.info-idcardpic-left,.info-idcardpic-center{
		float: left;margin-right: 14px;
	}
	.info-idcardpic-center,.info-idcardpic-right{
		width: 110px;height: 70px;float: left;
	}
	.info-Prompt{
		width: 100%;line-height: 20px;font-size: 12px;
	}
	.info-Prompt span{
		width: 5px;height: 5px;border-radius: 50%;background: #000;display: inline-block;margin-right: 8px;
	}
	.authentication-btn{
		width: 100%;height: 46px;border-radius: 5px;background: #ee3d3d;color: #fff;font-size: 20px;line-height: 46px;text-align: center;margin-top: 15px;cursor: pointer;
	}
	.inforMation_p{
		position: absolute;top: 0;
	}
	.inforMation_p>img{
		width:100%;
	}
	.confirm_modall{
	width: 100%;
	height: 100%;
	position: fixed;
	left: 0;
	top: 0;
	background: url(../../assets/img/eventGroup/zhezhao.png) no-repeat center;
	background-size: 100%;
	z-index: 9999999;
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
.confirm_textt{
	width: 340px;
	/*padding:15px 0;*/
	height: 85px;
	line-height: 85px;
	text-align: center;
	margin: auto;
}
.confirm_text_boxx{
	display: inline-block;
	vertical-align: middle;
	line-height: 24px;
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