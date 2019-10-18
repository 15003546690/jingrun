<template>
	<div class="sign_modal">
		<div class="sign_modal_box">
			<div class="sign_modal_head">
				<h4>每日签到</h4>
				<p>连续签到7天得大礼</p>
				<span @click="hideSignModal"><img src="../../assets/img/eventGroup/event_close.png"/></span>
			</div>
			<div class="sign_modal_body">
				<p class="sign_modal_img"><img src="../../assets/img/sign/sign_img.png"/></p>
				<div class="sign_modal_taxt">
					<ul class="sign_modal_left">
						<li v-for="item in signList" :class="item.days<=checkSign.keepDays ? 'signed' : ''">
							<img src="../../assets/img/sign/sign_img01.png"/>
							<img src="../../assets/img/sign/sign_img11.png" />
						</li>
					</ul>
					<ul class="sign_modal_right">
						<li v-for="item in signList" :class="item.days<=checkSign.keepDays ? 'text_signed' : ''">
							<p>{{item.dayName}}</p>
							<span><i>+{{item.num}}</i><img src="../../assets/img/eventGroup/event_weilai.png"/></span>
						</li>
					</ul>
				</div>
				<p class="sign_btn">
					<button v-if="checkSign.isSign=='false'" @click="signIn()"><img src="../../assets/img/sign/sign_btn.png"/>签到</button>
					<button v-else><img src="../../assets/img/sign/sign_btn.png"/>已签到</button>
				</p>
			</div>
			<div class="sign_rule">
				<p>签到规则：</p>
				<p>● 单个账号每日仅能签到一次，实行7天连续签到制，不受自然周影响 </p>
				<p>● 如连续签到中断，或连续签到7天达成，将重新计算天数</p>
				<p>● 签到奖励直接计入用户的未来豆账户，并在未来豆明细中产生记录</p>
				<p>● 不能补签</p>
			</div>
		</div>
		<Aalert :text='alertText' v-show='alert'></Aalert>
	</div>
</template>

<script>
import Aalert from '../common/alert'
export default{
	data() {
		return {
			signList: [
				{days:1,dayName:'第一天',num:10},
				{days:2,dayName:'第二天',num:10},
				{days:3,dayName:'第三天',num:15},
				{days:4,dayName:'第四天',num:15},
				{days:5,dayName:'第五天',num:20},
				{days:6,dayName:'第六天',num:20},
				{days:7,dayName:'第七天',num:50}
			],
			alert:false,
			alertText:'',
		}
	},
	props: [
		'checkSign'
	],
	components: {
		Aalert
	},
	created(){
	},
	methods:{
		hideSignModal () {
      		this.$emit('hideSignModal')
//    		history.go(0)
   		},
   		alertDailog(txt){
			$('.confirm_modal').show();
			this.alertText=txt;
		},
	   	signIn() {
	   		this.$Bury(window.location.href,'',0,'qiandaoye_02006');
	   		this.$CPOST('/task/v1/task/userSignIn',{
	   				key: 'SIGN'
		        },(res) =>{
		        	if(res.resultCode == 200){
		        		this.$emit('sign');
		        	}else{
		        		this.alertDailog(res.resultMessages);
		        	}
		        	
		    })

	   	}
	}
}
</script>

<style scoped>
.sign_modal{
	width: 100%;
	height: 100%;
	position: fixed;
	left: 0;
	top: 0;
	background: url(../../assets/img/eventGroup/zhezhao.png) no-repeat center;
	background-size: 100%;
    z-index: 10;
}
.sign_modal_box{
	width: 392px;
	height: 538px;
	background: #c60c1b;
	position: absolute;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	margin: auto;
}
.sign_modal_head{
	width: 100%;
	height: 84px;
	background: #FFFFFF;
	position: relative;
	overflow: hidden;
}
.sign_modal_head>h4{
	width: 100%;
	height: 35px;
	line-height: 35px;
	text-align: center;
	color: #c60c1b;
	font-size: 24px;
	margin-top: 14px;
}
.sign_modal_head>p{
	width: 100%;
	height: 24px;
	line-height: 24px;
	text-align: center;
	color: #c60c1b;
	font-size: 14px;
}
.sign_modal_head>span{
	position: absolute;
	right: 0;
	top: 5px;
    cursor: pointer;
}
.sign_modal_body{
	width: 100%;
	height: 328px;
	background: url(../../assets/img/sign/sign_bg.png) no-repeat bottom;
    margin-top: -20px;
    position: relative;
}
.sign_modal_img{
	width: 100%;
	height: 20px;
}
.sign_modal_taxt{
	width: 158px;
	height: 227px;
	margin: auto;
	margin-top: 16px;
}
.sign_modal_left{
	width: 18px;
	height: 100%;
	float: left;
	background: url(../../assets/img/sign/sign_xian.png) no-repeat center;
	float: left;
}
.sign_modal_left>li{
	margin-bottom: 17px;
	height: 18px;
}
.sign_modal_left>li>img+img{
	display: none;
}
.sign_modal_left>li.signed>img{
	display: none;
}
.sign_modal_left>li.signed>img+img{
	display: inline;
}
.sign_modal_right{
	float: right;
}
.sign_modal_right>li{
	height: 18px;
	line-height: 18px;
	margin-bottom: 17px;
	color: #fff;
	opacity: 0.5;
	font-size: 14px;
}
.sign_modal_right>li>p{
	display: inline-block;
	margin-right: 18px;
}
.sign_modal_right>li>span>i{
	font-weight: bold;
}
.sign_modal_right>li>span>img{
	margin-left: 5px;
    vertical-align: bottom;
}
.sign_modal_right>li.text_signed{
	opacity: 1;
}
.sign_btn{
	width: 218px;
	height: 46px;
	margin: auto;
	-webkit-border-radius: 3px;
	-moz-border-radius: 3px;
	border-radius: 3px;
	overflow: hidden;
}
.sign_btn>button{
	width: 100%;
	height: 100%;
	background: #f2de55;
	color: #c60c1b;
	font-size: 22px;
	border: 0;
	outline: none;
	cursor: pointer;
}
.sign_btn>button>img{
	vertical-align: text-top;
	margin-right: 16px;
}
.sign_rule{
	width: 100%;
	height: 146px;
	background: #dc3341;
	overflow: hidden;
}
.sign_rule>p{
	height: 20px;
	line-height: 20px;
	color: #FFFFFF;
	font-size: 12px;
	margin-bottom: 5px;
	padding-left: 10px;
}
.sign_rule>p:nth-child(1){
	margin-top: 10px;
}

</style>