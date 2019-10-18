<template>
  <!--我要出题-->
  <div class="want_question">
    <!--标题-->
    <div class="headline">
      <a><img src="../../../../assets/img/center/star.png"/>题材标题：</a>
      <p><input type="text" v-model="title" @keyup="jisuan()" /></p>
    </div>                                                    
    <!--标题内容-->
    <div class="question_content">
      <a><img src="../../../../assets/img/center/star.png"/>题材内容：</a>
      <p>
        <textarea  v-model="val" maxlength="500"></textarea>
        <span>{{val.length}}/500</span>
      </p>
    </div>
    <!--上传附件-->
    <div class="accessory">
      <a>上传附件</a>
      <div class="accessory_div">
				<el-upload
					class="upload-demo"
					:action="uploadUrl"
					accept="image/gif,image/jpeg,image/jpg,image/bmp,image/png"
					:headers={Authorization:this.$store.state.token}
					:before-upload="beforeUpload"
					:on-success='success'
					:data='upload'
					:on-remove='remove'
					:file-list="fileList"
					v-show='imgNum'>
					<div slot="tip" class="el-upload__tip" >
					您可以上传3张小于6M的gif，jpg，jpeg，bmp，png格式的图片
					</div>
					<el-button size="small" type="primary" id='btn'>上传图片</el-button>
				</el-upload>
				<el-upload
					class="upload-demo"
					:action="uploadUrl"
					accept="image/gif,image/jpeg,image/jpg,image/bmp,image/png"
					:headers={Authorization:this.$store.state.token}
					:before-upload="beforeUpload"
					:on-success='success'
					:data='upload'
					:on-remove='remove'
					:file-list="fileList"
					v-show='!imgNum'>
					<div slot="tip" class="el-upload__tip" >
					您可以上传3张小于6M的gif，jpg，jpeg，bmp，png格式的图片
					</div>
					<el-button size="small" type="primary" id='btn'>上传图片</el-button>
				</el-upload>
				<!--附件-->
				<el-upload
					class="upload-demo"
					:action="uploadUrl"
					accept=".pdf"
					:headers={Authorization:this.$store.state.token}
					:before-upload="fileBefore"
					:on-success='fileSuccess'
					:on-remove='fileRemove'
					:data='fileUpload'
					:file-list="fileList"
					v-show='fileNum'>
					<div slot="tip" class="el-upload__tip" >
					您可以上传1个小于6M的pdf格式的附件
					</div>
					<el-button size="small" type="primary" id='btn'>上传文件</el-button>
				</el-upload>
				<el-upload
					class="upload-demo"
					:action="uploadUrl"
					accept=".pdf"
					:headers={Authorization:this.$store.state.token}
					:before-upload="fileBefore"
					:on-success='fileSuccess'
					:on-remove='fileRemove'
					:data='fileUpload'
					:file-list="fileList"
					v-show='!fileNum'>
					<div slot="tip" class="el-upload__tip" >
					您可以上传1个小于6M的pdf格式的附件
					</div>
					<el-button size="small" type="primary" id='btn'>上传文件</el-button>
				</el-upload>
				<div class="upload">
        </div>
        <div class="submit" v-if="ifBtn">
          <button @click='submit'>提交审核</button>
        </div>
        <div class="submit" v-if="noBtn">
          <button @click="submitAlert">提交审核</button>
        </div>
        <p><a @click="toggle()" ><img v-show="subBTn" src="../../../../assets/img/center/right.png"/></a><i>我已经阅读并同意</i><router-link class="grild" tag="a" target="_blank" to="/personal/subjectdeal">《申请出题承诺条款》</router-link></p>
      </div>
    </div>
    <!--示例-->
    <div class="example">
      <p><img src="../../../../assets/img/center/example.png"/>示例</p>
      <div class="main_example">
        <span>题材标题：</span>
        <div><p>谁将夺得2017年温网男单冠军？</p></div>
      </div>
      <div class="main_example">
        <span>题材内容：</span>
        <div>
          <p>选项一：穆雷；</p>
          <p>选项二：德约科维奇；</p>
          <p>选项三：费德勒；</p>
        </div>
      </div>
    </div>
    <Aalert :text='alertText' v-if='alert'></Aalert>
  </div>
</template>
<script>
	import Aalert from '../../../common/alert'
	export default{
		components: {
			Aalert
		},
		data(){
			return{
				timer:'',
				fileNum:true,
				imgNum:true,
				fileupData:'',
				ifBtn:true,
				noBtn:false,
				subBTn:true,
				fileList: [],  
				addUserData:{},  //获取接口数据
				title:'',   //标题
				val:'',     //出题内容
				fileUpload:{   //附件上传
					upload:null
				},
				upload:{       //图片上传
					upload:null
				},
				filenum:[],  //上传数量
				img:[],   //上传的图片
				alert:false,   //是否显示弹层
				alertText:null,   //弹层提示
				isShow: false,    //是否显示弹层
				text: '',    //弹层提示
				uploadUrl:this.$base_url + '/share/v1/ditctArea/api/v1/fileUploadAPP'   //上传图片和附件的接口
			}
		},
		created(){
			 this.$Bury(window.location.href,'',0,'woyaochuti_03011')
		},
		computed:{
			
		},
		methods:{
			jisuan() {
					var valu = this.title;
					var newvalue = valu.replace(/[^\x00-\xff]/g, "**");
					var len = newvalue.length;
					if(len > 60){
              alert('标题只能输入30个字')
					}
			},
			//隐藏提示弹层
			hideModal() {
				this.isShow = false;
			},
			//图片删除的数量
			remove(file, fileList){
				this.img=fileList;
			},
			//图片上传成功的数量
			success(response, file, fileList){
				this.img=fileList;
			},
			//附件删除的数量
			fileRemove(file, fileList){
				this.filenum=fileList;
			},
			//附件上传成功的数量
			fileSuccess(response, file, fileList){
				this.filenum=fileList;
				
			},
			//图片上传
			beforeUpload (file) {
				let num=this.img.length;
				this.upload.upload=file;
				num++;
				if(num>4){
					this.alertDailog('最多只能上传三张图片');
					return false
				}
			},
			//附件上传
			fileBefore (file) {
				this.fileUpload.upload=file;
				let num=this.filenum.length;
				num++;
				if(num>2){
					this.alertDailog('最多只能上传一份文件');
					return false
				}
			},
			
			// 用户出题新增
			submit(){
				var attachment='',
						attachmentName='',
						img1='',
						img2='',
						img3='';
				if(this.filenum[0]!=undefined){
					attachment=this.filenum[0].response.resultValue.url;
					attachmentName=this.filenum[0].name;
				}
				if(this.img[0]!=undefined){
					img1=this.img[0].response.resultValue.url;
				}
				if(this.img[1]!=undefined){
					img2=this.img[1].response.resultValue.url;
				}
				if(this.img[2]!=undefined){
					img3=this.img[2].response.resultValue.url;
				}
				if(this.title!='' && this.val!=''){
					this.$CPOST('/account/v1/userSubject/addUserSubject',{
						attachment: attachment,
						attachmentName: attachmentName,
						title: this.title,
						content: this.val,
						img1: img1,
						img2: img2,
						img3: img3
					},(res) => {
						this.addUserData=res.resultValue.userSubject;
						this.alertDailog('提交成功');
						this.title ='';
						this.val ='';
						this.fileNum=false;
						this.imgNum=false;
					})
				}else{
					if(this.title==''){
						this.alertDailog('请输入标题');
						return
					}else if(this.val==''){
						this.alertDailog('请输入内容');
						return
					}
				}
			},
			alertDailog(txt){
				this.alert = true;
				$('.confirm_modal').show();
				this.alertText=txt;
			},
			submitAlert() {
				this.alertDailog("请阅读并同意出题承诺条款")
			},
			//点击是否同意条款
			toggle(){
				this.subBTn = !this.subBTn;
				if(!this.subBTn){
					this.noBtn = true;
					this.ifBtn = false;
				}else{
					this.noBtn = false;
					this.ifBtn = true;
				}
			}
		}
	}
</script>

<style scoped>
.el-button--primary{background: #f13131;border-color: #f13131;margin-bottom: 5px;}
/*我要出题*/
.want_question{width: 642px;overflow: hidden;}
.headline{margin-bottom: 30px;display: inline-block;}
.headline>a{line-height: 42px;font-size: 14px;color: #323232;float: left;}
.headline>a>img{vertical-align: middle;margin-right: 6px;}
.headline>p{width: 478px;height: 40px;border: solid 1px #d9d9d9;float: left;}
.headline>p>input{width:98%;height: 100%;outline: none;border: none;padding-left: 5px; color: #323232;}
/*出题内容*/
.question_content{display: inline-block;margin-bottom: 30px;}
.question_content>a{line-height: 40px;font-size: 14px;color: #323232;float: left;}
.question_content>a>img{vertical-align: middle;margin-right: 6px;}
.question_content>p{width: 468px;height: 160px;border: solid 1px #d9d9d9;float: left;position: relative;}
.question_content>p textarea{width: 400px;height: 136px;border: none;outline: none;resize: none;font-size: 14px;color: #323232;line-height: 16px;padding: 5px;}
.question_content>p>span{height: 20px;color: #a4a4a4;font-size: 14px;position: absolute;right:14px;bottom: 0;}

/*上传附件*/
.accessory{height: 290px;border-bottom: dashed 1px #e1e1e1;}
.accessory>a{float: left;width: 90px;line-height: 36px;font-size: 14px;color: #323232;text-align: center;}
.accessory_div{float: left;}
.upload{padding-top: 4px;	}
.upload>p{line-height: 26px;font-size: 14px;color: #323232;}
.upload>p>a{color: #3282ff !important;margin-left: 20px;}
.accessory_explain{height: 37px;margin-bottom: 30px;}
.accessory_explain>button{width: 96px;height: 34px;border: solid 1px #c5c5c5;border-radius: 2px;-webkit-border-radius: 2px;-moz-border-radius: 2px;outline: none;background: none;float: left;}
.accessory_explain .upload{width: 400px;line-height: 16px;font-size: 12px;color: #a5a5a5;float: left;margin-left: 10px;}
.submit{height: 48px;}
.submit>button{width: 104px;height: 38px;border-radius: 2px;border: none;outline: none;background: #f13131;font-size: 16px;color: white;cursor: pointer;}
.accessory_div>p{font-size: 14px;color: #676767;}
.accessory_div>p>a{width: 15px;height: 15px;line-height: 15px;border: solid 1px #f13131;border-radius: 2px;display: block;float: left;margin-right: 4px;margin-top: 1px;text-align: center;}
.accessory_div>p>a>img{vertical-align: middle;margin-top: -2px;}
.accessory_div>p>i{float: left;}
.accessory_div>p .grild{color: #676767;border: none;width: 141px;float: left;display: inline-block;text-align: left;margin-top: 3px;}
/*示例*/
.example{margin-top: 42px;}
.example>p{line-height: 16px;font-size: 16px;color: #323232;font-weight: bold;margin-bottom: 10px;}
.example>p>img{vertical-align: middle;margin-right: 10px;margin-left: 4px;margin-top: -1px;}
.example>div>span{width: 99px;text-align: right;font-size: 14px;color: #323232;display: block;float: left;}
.example>div>div{width: 277px;float: left;}
.example>div>div>p{line-height: 20px;font-size: 14px;color: #676767;}
.main_example{display: inline-block;}
/*el样式修改*/
.el-upload__tip{width:390px;float:right;margin-left: 5px;}
.confirm_modal{width: 100%;height: 100%;position: fixed;left: 0;top: 0;background: url(../../../../assets/img/eventGroup/zhezhao.png) no-repeat center;background-size: 100%;z-index: 5;}
.confirm_box{width: 435px;height: 196px;background: #e6e6e6;position: absolute;left: 0;top: 0;bottom: 0;right: 0;margin: auto;}
.confirm_main,.confirm_main_or{width: 423px;height: 184px;background: #fff;border: 1px solid #c9c9c9;margin: auto;margin-top: 5px;}
.confirm_main_head{width: 100%;height: 32px;}
.confirm_main_head>p{float: left;line-height: 32px;color: #323232;font-size: 14px;padding-left: 13px;}
.confirm_main_head>span{display: block;float: right;cursor: pointer;}
.confirm_text{width: 340px;height: 85px;line-height: 85px;text-align: center;margin: auto;}
.confirm_text_box{display: inline-block;vertical-align: middle;}
.confirm_btn{width: 100%;height: 32px;text-align: center;color: #323232;font-size: 14px;}
.confirm_btn>button{width: 98px;height: 32px;background: url(../../../../assets/img/eventGroup/event-btn.png) no-repeat center;border: 0;outline: none;color: #fff;font-size: 14px;cursor: pointer;}
</style>
