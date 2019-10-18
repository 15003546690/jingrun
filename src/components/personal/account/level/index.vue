<template>
  <!--会员等级-->
  <div>
    <div class="mian-right-left">
      <div class="photograph">
        <img src="../../../../assets/img/center/photograph.png"/>
      </div>
      <!--等级-->
      <div class="portrait">
        <div class="membership">
          <div class="membership_top">
            <div class="membership_top_left">
              <p><img v-lazy="dates.img" alt="" /></p>
            </div>
            <div class="membership_top_right">
              <div class="membership_number">
                <ul>
                  <li v-for="item in numList">{{item}}</li>
                </ul>
              </div>
              <!--进度条-->
              <div class="membership_crown">
                <div class="membership_crown_div">
                  <div class="membership_crown_div_left">
                    <div class="div_left_pic">
                      <img src="../../../../assets/img/center/red_crown_03.png"/>
                    </div>
                  </div>
                  <div class="div_left_pink_gray">
                      <el-progress :percentage="jindu[0]" :stroke-width="9 " :show-text="false" status="exception" style="width:120px;"></el-progress>
                  </div>
                </div>
                <div class="membership_crown_div">
                  <div class="membership_crown_div_left">
                    <div class="div_left_pic" v-if="leveList[1] > level">
                      <img src="../../../../assets/img/center/gray_crown_03.png"/>
                    </div>
                    <div class="div_left_pic" v-if="leveList[1] <= level">
                      <img src="../../../../assets/img/center/red_crown_03.png" />
                    </div>
                    
                  </div>
                  <div class="div_left_pink_gray">
                      <el-progress :percentage="jindu[1]" :stroke-width="9" status="exception" :show-text="false" style="width:120px;"></el-progress>
                    </div>
                </div>
                <div class="membership_crown_div">
                  <div class="membership_crown_div_left">
                    <div class="div_left_pic" v-if="leveList[2] > level">
                      <img src="../../../../assets/img/center/gray_crown_03.png"/>
                    </div>
                    <div class="div_left_pic" v-if="leveList[2] <= level">
                      <img src="../../../../assets/img/center/red_crown_03.png" />
                    </div>
                  </div>
                  <div class="div_left_pink_gray">
                      <el-progress :percentage="jindu[2]" :stroke-width="9" status="exception" :show-text="false" style="width:120px;"></el-progress>
                    </div>
                </div>
                <div class="membership_crown_div">
                  <div class="membership_crown_div_left">
                    <div class="div_left_pic" v-if="leveList[3] > level">
                      <img src="../../../../assets/img/center/gray_crown_03.png"/>
                    </div>
                    <div class="div_left_pic" v-if="leveList[3] <= level">
                      <img src="../../../../assets/img/center/red_crown_03.png" />
                    </div>
                  </div>
                  <div class="div_left_pink_gray">
                      <el-progress :percentage="jindu[3]" :stroke-width="9" status="exception" :show-text="false" style="width:120px;"></el-progress>
                    </div>
                </div>
                <div class="membership_crown_div pink_gray_five">
                  <div class="membership_crown_div_left">
                    <div class="div_left_pic" v-if="leveList[4] > level">
                      <img src="../../../../assets/img/center/gray_crown_03.png"/>
                    </div>
                    <div class="div_left_pic" v-if="leveList[4] <= level">
                      <img src="../../../../assets/img/center/red_crown_03.png" />
                    </div>
                  </div>
                  <div class="div_left_pink_gray pink_gray_pic">
                      <img src="../../../../assets/img/center/apostrophe.png"/>
                    </div>
                </div>
              </div>
              <div class="membership_vip">
                <ul>
                 <li v-for="item in leveList" :class="item<=level ? 'li1' : ''">
                  	<img v-if="item <= level" src="../../../../assets/img/center/red_v_03.png"/>
                  	<img v-if="item > level" src="../../../../assets/img/center/gray_v_03.png"/>
                  	{{item}}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="empirical_value">
                                      经验值：<span>{{dates.empirical}}</span>您还差<span>{{dates.empiricalSub}}</span>个经验值就可以晋级了！
          </div>
        </div>
      </div>
      <!--攻略-->
      <div class="strategy">
        <div class="strategy_top">晋级攻略</div>
        <div class="strategy_body">
          <ul>
            <li>
              <div class="personal_data">
                <div class="data">
                  <img src="../../../../assets/img/center/personal_data.png"/>完善个人资料
                </div>
                <div class="progress_bar">
                  <el-progress :percentage="dates.complete" :stroke-width="7" status="exception" :show-text="false" style="width:150px;"></el-progress>
                  <div class="progress_bar_div">{{dates.complete}}%</div>
                </div>
                <div class="perfect">
                  <button @click="perfect" v-show="perfectLIst">去完善</button>
                  <button v-show="fectLIst">已完善</button>
                </div>
              </div>
            </li>
            <li class="strategy_body_li">
              <div class="personal_data">
                <div class="personal_data_pay">
                  <div class="personal_data_pay_left">
                    <img src="../../../../assets/img/center/recharge.png"/>
                  </div>
                  <div class="personal_data_pay_right">
                    <p class="wealth">充值</p>
                    <p>充值可以增加经验值</p>
                  </div>
                </div>
                <div class="perfect">
                  <button @click="participate">去充值</button>
                </div>
              </div>
            </li>
            <li>
              <div class="personal_data">
                <div class="personal_data_pay">
                  <div class="personal_data_pay_left">
                    <img src="../../../../assets/img/center/subject.png"/>
                  </div>
                  <div class="personal_data_pay_right">
                    <p class="wealth">参加题材</p>
                    <p>参加题材交易可获得经验值</p>
                  </div>
                </div>
                <div class="perfect">
                  <router-link tag="button" to="/">去参加</router-link>
                </div>
              </div>
            </li>
            <li>
              <div class="personal_data">
                <div class="personal_data_pay">
                  <div class="personal_data_pay_left">
                    <img src="../../../../assets/img/center/flag.png"/>
                  </div>
                  <div class="personal_data_pay_right">
                    <p class="wealth">参加活动</p>
                    <p>参加活动可以获得经验值</p>
                  </div>
                </div>
                <div class="perfect">
                  <button @click="join">去参加</button>
                </div>
              </div>
            </li>
            <li class="strategy_body_li">
              <div class="personal_data">
                <div class="personal_data_pay">
                  <div class="personal_data_pay_left">
                    <img src="../../../../assets/img/center/invitation.png"/>
                  </div>
                  <div class="personal_data_pay_right">
                    <p class="wealth">邀请好友</p>
                    <p>邀请好友可以获得经验值</p>
                  </div>
                </div>
                <div class="perfect">
                  <button @click="Invitation">去邀请</button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
	export default {
		data(){
			return{
				dates:[],
				experience:0,//经验值
				perfectLIst:true,
				fectLIst:false,
				red:false,
				gray:true,
				numList:[],//分数
				leveList:[],//等级
				level:'',
				jindu:[],
			}
		},
		created(){
			this.$Bury(window.location.href,'',0,'huiyuandengji_04012')
      setTimeout(()=>{
        this.myJd();
      },50)
		},
		methods:{
			myJd(){
				this.$CPOST('/account/v1/userEmpirical/queryUserPromotion', {
		 		},(res) => {
		 			this.dates = res.resultValue;
		 			this.experience=res.resultValue.empirical;//经验值
		 			var totalList = res.resultValue.totalList;//分数等级
		 			    this.level = res.resultValue.level;//当前等级
		 			//用户等级显示问题
		 			var length = totalList.length;//分数等级的长度
          if(length - this.level>=4 && this.level>=5){    
          	var startNum = Math.floor(this.level/5)*5-1;
          	var endNum = startNum+5;
          	for(var i=startNum; i<endNum; i++){
          		this.numList.push(totalList[i]);
          		this.leveList.push(res.resultValue.levelList[i])
          	}
          }else if(length - this.level<4){
          	var startNum = this.level - 1;
          	for(var i=startNum; i<length; i++){
          		this.numList.push(totalList[i]);
          		this.leveList.push(res.resultValue.levelList[i])
          	}
          }else{
          	for(var i=0; i<5; i++){
          		this.numList.push(totalList[i]);
          		this.leveList.push(res.resultValue.levelList[i])
          	}
          }
          for(var i=0; i < this.numList.length; i++){
            var k = i+1;
            if(this.experience > this.numList[i] && this.experience < this.numList[k]){
              this.jindu[i] = (this.experience - this.numList[i])/(this.numList[k] - this.numList[i])*100
            }else if(this.experience > this.numList[i]){
              this.jindu[i] = 100;
            }
          }
		 			//去完善按钮显示问题
		 			if(this.dates.complete<100){
		 				 this.perfectLIst=true;
		 				 this.fectLIst = false;
		 			}else{
		 				this.fectLIst = true;
		 				this.perfectLIst=false;
		 			}
		 		})
			},
			/*去完善*/
			perfect(){
				this.$router.push('./')	
			},
			/*充值*/
			participate(){
				this.$router.push('../recharge')	
			},
			join(){
				this.$router.push('../../newActivity')	
			},
			Invitation(){
				this.$router.push('../invite')	
			}
		}
	}
</script>
<style scoped>
/*会员等级*/
.mian-right-left{width: 97%;margin:0 auto;margin-top: 20px;}
.photograph{height:120px;}
.photograph>img{width: 100%;height: 100%;}
.portrait{width: 810px;height: 117px;margin:0 auto;margin-top: 17px;}
.membership{height: 117px;overflow: hidden;}
.membership_top{margin-top: 12px;height: 75px;}
.membership_top_left{float: left;width: 86px;height:75px;}
.membership_top_left>p{width:69px;height: 69px;margin-top: 2px;border: solid 1px #ff9b9b;border-radius: 50%;float: right;}
.membership_top_left>p>img{width: 100%;height: 100%;border-radius: 50%;}
.membership_top_right{width: 680px;height: 75px;float: left;margin-left: 20px;}
.membership_number{height:16px;margin-top: 6px;font-size: 14px;color: #bababa;} 
.membership_number>ul{display: inline-block;width: 740px;margin-left: -20px;}   
.membership_number>ul>li{float: left;width: 72px;height: 16px;font-size: 14px; color: #bababa;text-align: center;margin-right:60px;}
.membership_number>ul>li:nth-child(2){padding-left: 18px !important;}
.membership_number>ul>li:nth-child(3){width: 76px;padding-left: 15px !important;}
.membership_number>ul>li:nth-child(4){padding-left: 17px !important;}
.membership_number>ul>li:nth-child(5){padding-left: 17px !important;}
.membership_crown{height: 26px;width: 100%;float: right;}
.membership_crown_div{width: 150px;height: 26px;float: left;}
.membership_crown_div_left{float: left;width: 30px;height: 26px;}
.div_left_pic{height: 26px;line-height: 26px;text-align: center;}
.div_left_pic>img{vertical-align: middle;margin-top: -4px;}
.div_left_pink_gray{width: 120px;height: 26px;float: left;margin-top:10px;}
.div_left_pink_gray>img{width: 100%;}
.div_left_pink_gray>p{height: 6px;}
.pink_gray_five{width: 80px !important;}
.pink_gray_pic{width: 50px;}
.pink_gray_pic>img{margin-left: 10px;}
.membership_vip{height: 16px;line-height: 16px;display: inline-block;}
.membership_vip>ul{display: inline-block;width: 740px;margin-left: -27px;}
.membership_vip>ul>li{width: 85px;height: 16px;line-height: 16px;float: left;color: #c2c2c2;text-align: center;margin-right: 63px;}
.li1{color: #fe604e !important;}
.li3{margin-left:4px;}
.li4{margin-left: 2px;}
.li5{margin-right: 0 !important;}
.empirical_value{height: 30px;line-height: 30px;font-size: 14px;color: #676c72;padding-left: 10px;}
.empirical_value>span{margin-right: 15px;color: #fe5644;}
.strategy{width:810px;margin:0 auto;}
.strategy_top{height: 55px;line-height: 55px;color: #676c72;font-size: 16px;}
.strategy_body{display: inline-block;padding-bottom: 110px;}
.strategy_body>ul>li{width: 254px;height: 100px;border:solid 1px #ddd7d9;float: left;margin-bottom: 20px;}
.strategy_body_li{margin-left: 20px;margin-right: 20px;}
.personal_data{width: 196px;margin:0 auto;position:relative}
.data{width: 100%;height: 40px;line-height: 40px;color: #676c72;font-size: 14px;margin-top: 6px;text-align: left;padding-left: 10px;}
.data>img{vertical-align: middle;margin-right: 5px;margin-top: -2px;}
.progress_bar{height: 12px;line-height: 12px;color: #676c72;font-size: 14px;padding-left: 10px;}
.progress_bar_div{font-size: 12px;position: absolute;top:36px;left:165px;}
.progress_bar>p{width: 144px;height: 6px;margin-top: 2px;border-radius: 40px;float: left;background: pink;}
.progress_bar>span{float: left;width: 38px;height: 12px;line-height: 12px;}
.perfect{margin-top: 8px;text-align: center;}
.perfect>button{width: 63px;height: 23px;border:solid 1px #fe5644;border-radius: 2px;font-size: 12px;color: #fe5644;background: white;outline: none;cursor: pointer;}
.perfect>button:hover{background: red;color: white;}
.personal_data_pay{margin-top: 6px;height: 50px;}
.personal_data_pay_left{width: 48px;height: 50px;line-height: 50px;float: left;text-align: center;}
.personal_data_pay_left>img{margin-top: 4px;}
.personal_data_pay_right{float: left;width: 148px;height: 50px;}
.personal_data_pay_right>p{height: 20px;line-height: 20px;color: #676c72;font-size: 12px;}
.wealth{margin-top: 8px;}
</style>
