<template>
	<div class="record">
		<div class="record_body">
			<div class="record_body_main">
				<!--2018希望看到哪个艺人提名-->
				<div class="record_main" v-show="record">
					<div class="record_main_center">
						<p><img src="../../../../components/pcActivity/springFestival/img/title.png"/></p>
						<div class="record_section">
							<div class="record_section_div">提<i></i>名：</div>
							<input type="text" placeholder="每次可输入一个人名/组合或团体" v-model="mychineseNum" />
						</div>
						<div class="record_reason">
							<div class="record_section_div">理<i></i>由：</div>
							<textarea maxlength="500" v-model="areaNum" @input="textareaCk"></textarea>
							<a>{{spaNum}}/500</a>
						</div>
						<p class="section_red" @click="Submit()"><img src="../../../../components/pcActivity/springFestival/img/btn.png"/></p>
						<div class="shili">
							<div class="section_div"><P>示<i></i>例:</P></div>
							<div class="section_p">
								<p class="shili_p">提名：宋小宝</p>
								<p>理由：每年春晚最期待的就是刘老根大舞台的几位喜剧艺人，尤其是宋小宝，在《相亲2》中两次将赵本山逗笑，宋小宝的表演极其出彩，那句“海燕呐，你可长点心吧”，也成为了经典的调侃语句</p>
							</div>
						</div>
					</div>
		 	     <img class="close" @click="close" src="../../../../components/pcActivity/springFestival/img/close.png"/>
		        </div>
			</div>
		</div>
		<Prompt @close="close" :Text="Text" v-if="prompt"></Prompt>
	</div>
</template>
<script>
import Prompt from './Prompt'
	export default{
		components:{
			Prompt
		},
		data(){
			return{
				spaNum:0,
				prompt:false,
				record:true,//艺人提交弹层
				recordfiv:true,//通过未通过图标
				through:false,//未通过的文字显示
//				reason:false,//评选缘由
//				note:false,
				areaNum:'',
				mychineseNum:'',
				Text:'',
				flag:true
			}
		},
		created(){
			this.activityId = this.GetQueryString('activityId')
		},
		methods:{
			GetQueryString(name){
		     	return decodeURIComponent((new RegExp('[?|&]'+name+'='+'([^&;]+?)(&|#|;|$)').exec(location.href)||[,""])[1].replace(/\+/g,'%20'))||null;
			},
			textareaCk(){
				this.spaNum = this.areaNum.length
			},
			//关闭按钮
			close(){
				this.prompt = false;
				this.$emit('close')
			},
			//提交名字和内容
			Submit(){
		          if(this.mychineseNum!="" && this.areaNum!=""){
					if(this.flag){
						this.flag = false;  
						this.$CPOST('/account/v1/userSubject/addNewActivitySubject', {
							activityId: this.activityId,
						  	content: this.areaNum,//内容
						  	title: this.mychineseNum//名字
					    },(res) => {
					      	if(res.resultCode == 200){
					      		this.record = false;
					      		this.prompt = true;
					      		this.Text = '提交成功'
					      		this.flag = true
					      	}else{
					      		this.record = false;
					      		this.prompt = true;
					      		this.Text = res.resultMessages;
					      	}
					    })
					}
				}else{
					if(this.mychineseNum==""){
						this.record = false;
				      	this.prompt = true;
						this.Text='提名不能为空'
					}else if(this.areaNum==""){
						this.record = false;
				      	this.prompt = true;
						this.Text='提名理由不能为空'
					}
				}
			}
		}
	}
</script>
<style scoped>
	.record{width:100%;height:100%;position: fixed;top: 0;left: 0;right: 0;bottom:0;background: rgba(0,0,0,0.3);z-index: 2;text-align: center;}
	.record_body{display: table;width: 100%;height: 100%;}
	.record_body_main{display: table-cell;vertical-align: middle;}
	.record_main{width: 594px;height: 546px;position:relative;padding-top:82px;background: url(../../../../components/pcActivity/springFestival/img/big_bg.png) no-repeat center;margin: 0 auto;}
    .record_main_center{width: 435px;height:480px;margin: 0 auto;}
    .record_main_center>p{height: 62px;}
    .record_section{height: 28px;margin-bottom: 26px;}
    .record_section_div{width: 65px;float: left;text-align:left;padding-left:5px;font-size: 14px;color: #fb1f3c;display: block;line-height: 28px;}
    .record_section_div>i{width:16px;height: 100%;display: inline-block;}
    .shili .section_div{width: 65px;float: left;text-align:left;padding-left:5px;font-size: 16px;color: #8e5e5c;font-weight:bold;display: block;height: 117px;}
    .section_div>p>i{width:16px;height: 100%;display: inline-block;font-size: 16px;color:#8e5e5c;}
    .record_section>input{width: 363px;float: left;text-indent:10px;font-size: 14px;color: #868585;display: block;line-height: 26px;border: solid 1px #f0d6b7;}
    .record_reason{height: 150px;position:relative;}
    .record_reason>span{width: 90px;float: left;font-size: 14px;color: #fb1f3c;display: block;line-height: 28px;}
    .record_reason>textarea{width: 345px;height: 134px;float: left;padding:9px 9px;outline:none;font-size: 14px;resize:none;color: #868585;display: block;border: solid 1px #f0d6b7;line-height: 18px;}
    .record_reason>a{position: absolute;bottom: 4px;right:18px;font-size: 14px;color: #ccc2c2;}
    .section_red{margin-top: 10px;text-align: right;}
    .section_red>img{cursor: pointer;}
    /*.shili>span{float: left;width: 80px;height: 110px;font-size: 16px;color: #8e5e5c;font-weight: 600;text-align: left;}*/
    .section_p{line-height: 22px;font-size: 14px;color: #8e5e5c;text-align: left;}
    .shili_p{margin-bottom: 5px;}
    .close{position: absolute;top: -14px;right: -40px;cursor: pointer;}
    input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {color:#ccc2c2;}  
</style>