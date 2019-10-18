<template>
	<div id="inforMation">
         <el-upload
		  class="avatar-uploader"
		  :action="uploadUrl"
		  :headers={Authorization:this.$store.state.token}
		  :show-file-list="false"
		  :on-success="handleAvatarSuccess"
		  accept="image/gif,image/jpeg,image/jpg,image/png"
		  :data='upload'
		  :before-upload="beforeAvatarUpload">
		  <p class="inforMation_p"><img v-lazy="imageUrl" class="avatar"  v-bind:title="message"></p>
		  <i class="el-icon-plus avatar-uploader-icon upLoader">上传头像</i>
		</el-upload>
         <ul class="inforList">  
            <li>
            	<span>用户名</span>
            	<div>
            		<input type="text" placeholder="编辑" id="name" class="name" v-model="nickName" maxlength="11" />
                  	<span >{{nick}}</span>
            	</div>
            </li>
            <li>
            	<span>性别</span>
            	<div>
            		<input type="radio" value="0" v-model="sex" name="a" id='man'/>  &nbsp;&nbsp;男&nbsp;&nbsp;  
                  	<input type="radio" value="1" v-model="sex" id='woman'/> &nbsp;&nbsp;女&nbsp;&nbsp; 
            	</div>
            </li>
            <li>
            	<span>真实姓名</span>
            	<div>
            		<input type="text" placeholder="编辑" id="Realname" class="name" v-model="realName" size="10" maxlength="8"/>
                  	<span style="font-size:12px;color:#f00;margin-left: 5px;">{{nameText}}</span>
            	</div>
            </li>
            <li>
            	<span>邮箱</span>
            	<div>
            		<input type="email" placeholder="编辑" id="eMail" class="name" v-model="sendEmail" @keyup="Email"/>
                    <span style="font-size:12px;color:#f00;margin-left: 5px;">{{emailText}}</span>
            	</div>
            </li>
            <li>
            	<span>教育情况</span>
            	<div>
            		<select class="eduInfro" id="eduCation" v-model="education">
                          <option value="1">小学以下</option>
                          <option value="2">初中</option>
                          <option value="3">高中</option>
                          <option value="4">中专</option>
                          <option value="5">大专</option>
                          <option value="6">本科</option>
                          <option value="7">研究生</option>
                          <option value="8">博士及以上</option>
                      </select>
            	</div>
            	<input type="button" value="确定" class="submit" @click="subMit()"/>
            </li>
         </ul>
         <alert :text='alertText' v-if='alert' @yes="yes"></alert>
    </div>
</template>
<script>
     import alert from '../../../common/alert'
    	export default{
    		components: {
		        alert
	        },
          data(){
            return {
            	message:'请完善个人资料 ',
               	hsa:true,
               	value5:"",//手机号加密
               	perInfromation:{},
               	birthday:null,//生日
               	nickName:'',//昵称
               	realName:null,//真实姓名
               	sendEmail:null, //邮箱
               	education:'请选择',//教育选项
               	imageUrl:'',//头像
               	upload:{
               		upload:null
               	},
               	headSculpture:null,
               	sex:null,//性别
               	alert:false,//弹层
				alertText:'',//弹层内容
				emailText:null,//邮箱提示
               	nameText:null,//名字提示
               	nick:'',//输入的昵称
               	yesType:'',
               	uploadUrl: this.$base_url + '/share/v1/ditctArea/api/v1/fileUploadAPP'   //上传头像接口
            }
          },
          created(){
            setTimeout(()=>{this.userInfor()},50)
            this.$Bury(window.location.href,'',0,'zhanghushezhi_03012')
          },
          watch:{
          	realName() {
			    if (this.realName.length > 8) {
			      	this.nameText="名字长度不能大于8"
			    }
			}
          },
          methods:{
          	//邮箱
          	Email(){
                var eyEmail = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
                if(eyEmail.test(this.sendEmail) || this.sendEmail==""){
                	 this.emailText="";
                }else{
                	this.emailText="请输入正确的电子邮箱";
                }
            },
            yes(){
            	switch(this.yesType){
            		case 'success':
            			this.updataUserInfo()
            		break;
            	}
            },
            //输入信息
          	 userInfor(){
				this.$CPOST('account/v1/userInfo/queryUserInfo', {
				},
				(res) => {
					this.education = res.resultValue.education;//学历
					this.realName = res.resultValue.realname; //真实姓名
					this.sex = res.resultValue.sex;	//性别
					this.imageUrl = res.resultValue.img;	//头像
					this.sendEmail = res.resultValue.email;	//邮箱 
					this.nickName = res.resultValue.nickname; //昵称
				})
          	 },
          	 updataUserInfo(){
          	 	this.$CPOST('/account/v1/userInfo/queryUserInfoForUpdate',{
			        },(res) =>{
			        let user = {
						userImg: res.resultValue.img,
						userNickName: res.resultValue.nickName,
						userGrade: res.resultValue.grade
					}
					let obj1 = JSON.stringify(user)
					window.localStorage.setItem('user',obj1);
					this.$store.commit('setUserImg',user.userImg);
					this.$store.commit('setUserNickName',user.userNickName);
					this.$store.commit('setUserGrade',user.userGrade);
			    })
          	 },
          	 handleAvatarSuccess(res, file) {
		        this.imageUrl = URL.createObjectURL(file.raw);
		        this.headSculpture=res.resultValue.url;
		      },
		      beforeAvatarUpload(file) {
		      	this.upload.upload=file
		        const isJPG = file.type === 'image/jpeg'||'image/png';
		        const isLt2M = file.size / 1024 / 1024 < 2;
		        if (!isJPG) {
		          this.$message.error('上传头像图片只能是 JPG/png 格式!');
		        }
		        if (!isLt2M) {
		          this.$message.error('上传头像图片大小不能超过 2MB!');
		        }
		        return isJPG && isLt2M;
		      },
              //替换手机号码中间数字
                 fsdfsd() { 
                    phone = phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
                    return phone;
                 },
             //发送数据请求
                 dataBack(){
                       this.$CPOST('/event/v1/userInfo/queryUserInfoForUpdate', {},(res)=>{
		    		             this.perInfromation = res;
                            })
                   },
            alertDailog(txt){
				this.alert = true;
				$('.confirm_modal').show();
				this.alertText=txt;
			},
             //发送修改后的个人资料给后端
                subMit(){
                	//昵称的输入
                	if(this.nickName == "" ){
                		this.nick="请输入昵称";
                	}else if(this.emailText == "请输入正确的电子邮箱"){
	                    this.alert = true;
	                    this.alertText = "修改失败"
                	}else{
                		this.$CPOST('/account/v1/userInfo/updateUserInformation',{ 
                    	education:this.education,
                    	email:this.sendEmail,
                    	headSculpture:this.headSculpture,
                    	nickName:this.nickName,
                    	realName:this.realName,
                    	sex:this.sex
                    },(res)=>{
                    	this.yesType = 'success';
                    	this.alertDailog('修改成功'); 
                    })
                	}
            	}
          }
	}
</script>
<style scoped>
#year{display:inline-block;}
select{color:#777;}
img{width:100px;height:100px;}
#inforMation{font-size:14px; color:#777;}
.inforMation_p{width: 118px;height: 118px;line-height: 118px;margin-bottom: 22px;}
.inforMation_p>img{width:100%;height:100%;vertical-align: middle;}
.inforList{display: inline-block;}
ul>li{width: 500px;height: 36px;margin-top: 10px;font-size: 14px;color: #777;}
ul>li>span{width: 74px;height: 36px;text-align:right;line-height: 36px;display: block;float: left;}
ul>li>div{width: 410px;height: 36px;text-align:left;line-height: 36px;float: right;}
.name{height:34px;line-height: 34px;border:none;}
.submit{width: 75px;height: 27px;border-radius: 2px;background: #e52735;outline: none;border: none;font-size: 14px;color: white;margin-top: 42px;cursor: pointer;margin-left: 60px;}
.avatar-uploader .el-upload {border: 1px dashed #d9d9d9;border-radius: 6px;cursor: pointer;position: relative;overflow: hidden;}
.avatar-uploader .el-upload:hover {border-color: #409EFF;}
.avatar-uploader-icon {font-size: 28px;color: #8c939d;width: 100px;height: 100px;line-height: 100px;text-align: center;border: solid 1px #d9d9d9;}
.avatar{width: 118px;height: 118px;border-radius: 50%;-webkit-border-radius: 50%;-moz-border-radius: 50%;}
.upLoader{width: 70px;height: 24px;line-height: 24px;border-radius: 2px;-moz-border-radius: 2px;-webkit-border-radius: 2px;background: none;border: solid 1px #a4a4a4;font-size: 12px;color: #676767; margin-left: -6px;outline: none;cursor: pointer;display: inline-table;}
.el-icon-plus:before{content: initial;}
.inforList{clear: both;}
.inforName>p{color: #323232;text-align: right;}
.inforMain>p>input{border: 0;}
.el-date-editor{width: 200px !important;}
.eduInfro{width:200px;height: 30px;outline: none;-webkit-border-radius: 3px;-moz-border-radius: 3px;border-radius: 3px;border: solid 1px #bcbcbb;}
.el-upload{text-align: left !important;z-index: 2;}
</style>