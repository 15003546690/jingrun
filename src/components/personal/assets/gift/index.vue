<template>
  <!--奖品-->
  <div class="giftBox">
  <div class="prize">
		<ul class="prize_tab">
			<li :class="activeTab==0?'prize_tab_activity':''" @click="switchTab(0)">活动奖品</li>
			<li :class="activeTab==1?'prize_tab_activity':''" @click="switchTab(1)">宝箱</li>
		</ul>
		<div class="listData" v-show="listData">
			<!--活动奖品列表-->
			<ul :class="activeTab==0?'activityPrize':'hide'">
				<li class="shade_bg listBox" :class="item.get==true&&item.entity==true ? 'showAddr' : ''" v-for="(item,index) in seePrize" :key="item.prizeId">
					<div class="prize_title shade_bg" v-bind:class="{prize_title_bg: item.get}">{{item.rangNum}}</div>
					<div class="prize_img">
					<img :src="item.prizeImg"/>
					</div>
					<div class="prize_conyent">
					<div class="prize_img_title">{{item.prizeName}}{{item.prizeNum}}</div>
					<p>{{item.activityName}}</p>
					</div>
					<button v-if="item.get==false&&item.entity==false" class="prize_img_button1" @click="activityVirtual(item.activityId,item.prizeId)">领取奖品</button>
					<button v-if="item.get==false&&item.entity==true" class="prize_img_button1" @click="entity(item.activityId,item.prizeId)">领取奖品</button>
					<button v-if="item.get==true" class="prize_img_button2">已领取</button>
					<div class="prize_shade" v-if="item.get==true&&item.entity==true">
						<div class="prize_shade_div">
							<div>
								<span>收件人：</span>
								<p>{{item.addr.receiveMan}}</p>
							</div>
							<div>
								<span>联系电话：</span>
								<p>{{item.addr.phone}}</p>
							</div>
							<p class="prize_shade_p">收件地址：{{item.addr.addr}}</p>
						</div>
					</div>
				</li>
			</ul>
			<!--宝箱列表-->
			<ul :class="activeTab==1?'treasurePrize':'hide'">
				<li v-for="(elem,index) in boxLists" :key="index">
					<p class="treasureP_img treasureP_true" v-if="elem.prizeStatus==0||elem.prizeStatus==3||elem.prizeStatus==2">
						<img src="../../../../assets/img/center/prize_img1.png" />
					</p>
					<p class="treasureP_img treasureP_false" v-if="elem.prizeStatus==1||elem.prizeStatus==4||elem.prizeStatus==5||elem.prizeStatus==6">
						<img src="../../../../assets/img/center/prize_img2.png" />
					</p>
					<div class="treasureP_text_true" :class="elem.prizeStatus==0||elem.prizeStatus==3||elem.prizeStatus==2?'treasureP_text_true':'treasureP_text_false'">
						<p>{{elem.prizeName}}</p>
						<p><span>{{elem.prizeFrom}}</span><i>{{elem.num}}个</i></p>
					</div>
					<div class="treasureP_content">
						<p class="treasureP_content_time" v-if="elem.prizeStatus==0||elem.prizeStatus==2">有效期还剩<i>{{elem.boxValidity}}</i></p>
						<p class="treasureP_content_text">{{elem.title}}</p>
						<p class="treasureP_content_num" v-if="elem.prizeStatus==3">请好友帮助领取（需{{elem.remainFriends}}位好友帮助）</p>
					</div>
					<p class="treasureP_xian"><img src="../../../../assets/img/center/prize_xian.png"/></p>
					<p class="treasureP_btn_true" v-if="elem.prizeStatus==0">
						<button v-if="elem.prizeType==0" @click="getVirtual(elem.prizeType,elem.groupId,elem.prizeId,elem.boxId)">领取奖励</button>
						<button v-if="elem.prizeType==1" @click="getKind(elem.prizeType,elem.groupId,elem.prizeId,elem.boxId)">领取奖励</button>
					</p>
					<p class="treasureP_btn_false" v-if="elem.prizeStatus==1">
						<button>已领取</button>
					</p>
					<p class="treasureP_btn_help" v-if="elem.prizeStatus==3">
						<button @click="boxHelpL(elem.groupId,elem.prizeId,elem.id)">好友助力</button>
					</p>
					<p class="treasureP_btn_yetHelp" v-if="elem.prizeStatus==2">
						<button @click="exchange(elem.groupId,elem.prizeId,elem.id)">立即兑换</button>
						<a :href="elem.friendsURL">查看详情</a>
					</p>
					<p class="treasureP_btn_false" v-if="elem.prizeStatus==4">
						<button>宝箱已过期</button>
					</p>
				</li>
				<div class="noData" v-if="noData">
					<p><img src="../../../../assets/img/nodata_icon.png"/></p>
				</div>
			</ul>
		</div>
  	<!--宝箱领取的弹层-->
		<div class="boxModal" v-if="boxModal">
  		<div class="prize_modal_box">
					<!--虚拟未来豆-->
					<div class="prize_modal_wei" v-if="virtual">
						<img src="../../../../assets/img/box/baoxiang_shi.png"/>
						<span class="prize_modal_close" @click="hideBox(1)"><img src="../../../../assets/img/box/baoxiang_close.png"/></span>
						<p class="prize_modal_img"><img :src="virtualList.prizeImg"/></p>
						<div class="prize_modal_text">
							<p class="prize_modal_num">{{virtualList.prizeNum}}{{virtualList.prizeType=='1'?'未来豆':virtualList.prizeType=='2'?'金豆':virtualList.prizeType=='4'?'现金':''}}</p>
							<p class="prize_modal_ti">奖励已存入您账户</p>
						</div>
					</div>
					<!--实物奖品-->
					<div class="prize_modal_kind" v-if="kind">
						<img src="../../../../assets/img/box/baoxiang_shi.png"/>
						<span class="prize_modal_close" @click="hideKind"><img src="../../../../assets/img/box/baoxiang_close.png"/></span>
						<p class="prize_modal_img"><img :src="kindList.prizeImg"/></p>
						<div class="prize_modal_kind_text">
							<p class="prize_modal_text1">{{kindList.prizeName}}<i>X{{kindList.prizeNum}}</i></p>
							<p class="prize_modal_text2">需要{{kindList.needFriends}}位好友帮助完成猜宝任务即可兑奖！</p>
							<p class="prize_modal_ti">有效期还剩{{kindList.validTime}}</p>
							<p class="prize_modal_btn" @click="boxHelpL(groupId,prizeId,id)"><img src="../../../../assets/img/box/baoxiang_btn.png"/></p>
						</div>
					</div>
				</div>
  	</div>
  	<div class="confirm_modal" v-if="isShow">
			<div class="confirm_box">
				<div class="confirm_main_or">
					<div class="confirm_main_head">
						<p>提示</p>
						<span @click='hideModalT'><img src="../../../../assets/img/center/close.png"/></span>
					</div>
					<div class="confirm_text">
						<div class="confirm_text_box">
							<p class="confirm_content" v-model="text">{{text}}</p>
						</div>
					</div>
					<div class="confirm_btn">
						<button @click='hideModalT'>确定</button>
					</div>
				</div>
			</div>
		</div>
  	<PrizeSite v-if="isshowindex" @hideModal="hideModal" @userSeeList="userSeeList(1)" @showNum="showNum()" @newAddressTwo="newAddressTwo(2)" :showCloseModal='showCloseModal' :activityId='activityId' :prizeId="prizeId" :entityId="entityId"></PrizeSite>
  	<BoxSite v-if="isshowBox" @hideBoxSite="hideBoxSite" @userSeeList="userSeeList(1)" @showNum="showNum()" @newAddressTwo="newAddressTwo(2)" :showCloseModal='showCloseModal' :groupId='groupId' :prizeId="prizeId" :entityId="entityId" :id="id"></BoxSite>
  	<div class="paging">
	  	<el-pagination
		      @size-change = "handleSizeChange"
		      @current-change = "handleCurrentChange"
		      :current-page = "currentPage"
		      :page-size = "sizeNum"
		      layout = "prev, pager, next, jumper"
		      :total = "totalPage">
		    </el-pagination>
	  </div>
	  <div class="noData" v-show="noData"><!--v-if="seePrize.length==0"-->
			<p><img src="../../../../assets/img/nodata_icon.png"/></p>
		</div>
  </div>
  <Alert :text='alertText' v-if='alert' @yes="hideModalT"></Alert>
  <authen v-show='authenShow'  @authenclose='authenclose'></authen>
  </div>
</template>

<script>
import PrizeSite from './prizeSite'
import BoxSite from './BoxSite'
import Alert from '../../../common/alert'
import authen from '../../../common/authentication'
export default{
	components: {
		PrizeSite,
		BoxSite,
		Alert,
		authen
	},
	data() {
		return{
			isShow: false,  //是否显示弹层
			activeTab: 0,  //tab切换
			virtualList: [],   //获取虚拟奖品数据
			index: 0,   //tab切换index
			boxId: '',   //宝箱Id
			groupId: '',    //题材Id
			prizeId: '',   //奖品Id
			id: '',  //宝箱Id
			kindList: [],  //获取实物奖品数据
			boxModal: false,   //是否显示宝箱弹层
			prizeType: '',   //判断实物与虚拟
			kind: false,  //宝箱实物弹层是否显示
			virtual: false,   //宝箱虚拟弹层是否显示
			activityId: '',  //活动Id
			isshowindex: false,   //是否显示地址弹层
			entityId: '',   //虚拟活动奖品Id
			isshowBox: false,   //宝箱兑换实物弹层
			totalPage: null,   //页数
			currentPage: 1,  //当前页
			text: '',   //弹层提示
			seePrize: [],   //活动奖品列表
			boxLists: [],   //宝箱列表
			ifHelp: false,   //隐藏好友助力页面,
			alertText: '',  //弹层提示内容，
			alert: false,   //是否显示弹层
			friendsURL: '',    //宝箱好友助力
			prizeAddr: '',
			showCloseModal: 1,
			listData:true,
			noData:false,
			sizeNum: 8,
			authenShow: false,
		}
	},
	created() {
		this.$Bury(window.location.href,'',0,'jiangpinye_04008')
		setTimeout(()=>{
			this.userSeeList(1);
		},50)
		
	},
	methods: {
		authenclose(){
			this.authenShow=false;
		},
		hideModalT() {
			this.alert = false;
			this.userSeeList(1);
		},
		//tab切换
		switchTab(index) {
			this.activeTab = index;
			this.userSeeList(1);
		},
		//隐藏prizeSite
		hideModal() {
			this.showCloseModal = 1
			this.isshowindex = false
		},
		//隐藏BoxSite
		hideBoxSite() {
			this.showCloseModal = 1
			this.isshowBox = false
		},
		hideBox() {
			this.userSeeList(1)
			this.boxModal = false
		},
		hideKind() {
			this.boxModal = false
		},
		treasureList() {
			this.$emit('treasureList')
		},
		handleSizeChange(val) {
			this.currentPage = val
    	this.userSeeList(val)
    },
    handleCurrentChange(val) {
    	  this.currentPage = val
        this.userSeeList(val)
    },
    userSeeList(val){
    	if(this.activeTab == 0){
    		//奖品列表
    		this.sizeNum = 8
				this.$CPOST('/activity/v1/activity/seeReward',{
				  page: val-1,
				  size: this.sizeNum
	    	},(res) => {
	    		this.seePrize = res.resultValue.prizeInfos;
	    		this.totalPage = res.resultValue.totalElements;
	    		if(this.seePrize.length>0){
	    			this.listData=true;
	    			this.noData=false;
	    		}else{
	    			this.listData=false;
	    			this.noData=true;
	    		}
	    	})
			}else{
				//宝箱列表
				this.sizeNum = 6
				this.$CPOST('/activity/v1/box/boxPrizeList',{
					page: val-1,
					size: this.sizeNum
				},(res) => {
					this.boxLists = res.resultValue.appPrizeDTOS;
					this.totalPage = res.resultValue.totalElements;
						if(this.boxLists.length>0){
	    			this.listData=true;
	    			this.noData=false;
	    		}else{
	    			this.listData=false;
	    			this.noData=true;
	    		}
					
				})
			}
			
    },
		//宝箱查看详情
		/*cakeDetail(){}*/
		/*领取实物活动奖品*/
		entity(activityId,prizeId) {
			this.activityId = activityId
			this.prizeId = prizeId
			this.$CPOST('/activity/v1/activity/app/getPrizeInfo',{
				activityId: this.activityId,
				prizeId: this.prizeId
			},(res) => {
				if(res.resultCode==200){
					this.entityId = res.resultValue.appUserAddrDTO.id;
					this.prizeAddr = res.resultValue.appUserAddrDTO
					if(!(this.prizeAddr.hasOwnProperty("addr"))) {
						this.isshowindex = true;
						this.showCloseModal = 2;
					}else{
						this.isshowindex = true;
						this.showCloseModal = 3;
					}
				}else if(res.resultCode==10126){
					this.alert=true;
          this.alertText=res.resultMessages;
				}else if(res.resultCode == 10123){
					 this.authenShow=true;
				}else if(res.resultCode==10125){
         	this.alert = true;
					this.alertText = res.resultMessages;
       	}else{
       		this.alert = true;
					this.alertText = res.resultMessages;
       	}
			})
		},
		newAddressTwo(flag) {
   		this.showCloseModal = 2;
   	},
   	showNum() {
   		this.showCloseModal = 3;
   	},
		//领取虚拟活动奖品
		activityVirtual (activityId,prizeId) {
			this.activityId = activityId
			this.prizeId = prizeId
			this.$CPOST('/activity/v1/activity/app/getRewardVirtualApp',{
				activityId: this.activityId,
				prizeId: this.prizeId
			},(res) => {
				this.alert = true;
				this.alertText = '领取成功';
			})
		},
		//查看好友助力页面
		boxHelpL(groupId,prizeId,id) {
			this.$router.push({path: '/gifthelp',query: {
				id: id,
				groupId: groupId,
				prizeId: prizeId
			}})
		},
		//打开虚拟宝箱奖品
		getVirtual (prizeType,groupId,prizeId,id) {
			this.boxModal = true
			this.virtual = true
			this.groupId = groupId
			this.prizeId = prizeId
			this.boxId = id
			this.prizeType = prizeType
			this.$CPOST('/activity/v1/box/openBoxVirtual',{
				boxId: this.boxId,
				groupId: this.groupId,
				prizeId: this.prizeId
			},(res) => {
				this.virtualList = res.resultValue;
			})
		},
		//打开实物宝箱
		getKind (prizeType,groupId,prizeId,id) {
			this.prizeType = prizeType
			this.groupId = groupId
			this.prizeId = prizeId
			this.boxId = id
			this.$CPOST('/activity/v1/box/openBoxEntity',{
				boxId: this.boxId,
				groupId: this.groupId,
				prizeId: this.prizeId
			},(res) => {
				if(res.resultCode==200){
					this.kindList = res.resultValue;
					this.boxModal = true
					this.virtual = false
					this.kind = true
				}else if(res.resultCode==10126){
					this.alert=true;
          this.alertText=res.resultMessages;
				}else if(res.resultCode == 10123){
					 this.authenShow=true;
				}else if(res.resultCode==10125){
         	 this.authenShow=true;
       	}else{
       		this.alert = true;
					this.alertText = res.resultMessages;
       	}
			})
		},
		//宝箱兑换实物
		exchange(groupId,prizeId,id) {
			this.groupId = groupId
			this.prizeId = prizeId
			this.id = id
			this.$CPOST('/activity/v1/box/entityPrizeMsg',{
				groupId: this.groupId,
				prizeId: this.prizeId,
				boxId: this.id
			},(res) => {
				if(res.resultCode == 200) {
					this.entityId = res.resultValue.appUserAddrDTO.id;
					this.boxAddr = res.resultValue.appUserAddrDTO;
					if(!(this.boxAddr.hasOwnProperty("addr"))){
						this.isshowBox = true;
						this.showCloseModal = 2;
					}else{
						this.isshowBox = true;
						this.showCloseModal = 3;
					}
				}else{
					this.alert = true;
					this.alertText = res.resultMessages;
				}
			})
		}
	}
}
</script>

<style scoped>
.giftBox{width: 100%;min-height: 887px;position: relative;}
/*空白页*/
.noData{position: absolute;width: 100%;height: 100%;text-align: center;line-height: 1006px;}
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
.paging{clear: both;clear: both;position: absolute;bottom: 70px;width: 900px;}
.el-pagination{text-align: center;}
/*宝箱谈层*/
.boxModal{width: 100%;height: 100%;position: fixed;left: 0;top: 0;background: url(../../../../assets/img/eventGroup/zhezhao.png) no-repeat center;background-size: 100%;display: table;z-index: 5;}
.prize_modal_box{display: table-cell;vertical-align: middle;}
.prize_modal_wei,.prize_modal_main,.prize_modal_cash{width: 360px;margin: auto;position: relative;}
.prize_modal_kind{width: 406px;margin: auto;position: relative;}
.prize_modal_text{width: 304px;height: 70px;text-align: center;position: absolute;bottom: 89px;left: 36px;}
.prize_modal_num{width: 100%;line-height: 38px;color: #fff;font-size: 30px;}
.prize_modal_ti{line-height: 20px;color: #ffc000;font-size: 12px;margin-top: 5px;}
.prize_modal_close{width: 24px;height: 24px;display: block;position: absolute;right: 1px;top: 171px;cursor: pointer;}
.prize_modal_img{width: 112px;height: 112px;line-height: 112px;text-align: center;position: absolute;top: 50px;left: 148px;}
.prize_modal_img>img{vertical-align: middle;width: 100%;height: 100%;}
.prize_modal_kind_text{width: 345px;height: 152px;text-align: center;position: absolute;bottom: 70px;left: 17px;}
.prize_modal_text1{width: 100%;line-height: 28px;color: #fff;font-size: 20px;margin-top: 37px;}
.prize_modal_text2{width: 100%;line-height: 16px;color: #fff;font-size: 12px;margin-top: 6px;}
.prize_modal_btn{width: 120px;height: 36px;line-height: 36px;text-align: center;margin: auto;margin-top: 5px;cursor: pointer;}
.prize_modal_btn>img{vertical-align: middle;}
/*奖品*/
.prize{width: 952px;margin-left: -11px;display: inline-block;}
.prize_tab{height: 20px;margin-left: 10px;}
.prize_tab>li{width: 70px;height: 20px;line-height: 20px;text-align: center;font-size: 12px;color: #676767;float: left;cursor: pointer;}
.prize_tab_activity{background: #eaedf4;-webkit-border-radius: 2px;-moz-border-radius: 2px;border-radius: 2px;}
.activityPrize{margin-top: 15px;}
.activityPrize>li{float: left;width: 229px;height: 327px;background: white;float: left;margin-left: 9px;margin-bottom: 20px;text-align: center;position: relative;overflow: hidden;box-shadow: 0px 2px 8px #eee;-webkit-box-shadow: 0px 2px 8px #eee;-moz-box-shadow: 0px 2px 8px #eee;}
.treasurePrize{margin-top: 27px;}
.treasurePrize>li{width: 291px;height: 248px;background: #f5faff;float: left;margin-right: 24px;border: 1px solid #d5d5d5;-webkit-border-radius: 4px;-moz-border-radius: 4px;border-radius: 4px;position: relative;margin-bottom: 32px;}
.treasureP_img{width: 142px;height: 90px;line-height: 90px;text-align: center;background: #fff;position: absolute;left: -10px;top: -12px;-webkit-border-radius: 4px;-moz-border-radius: 4px;border-radius: 4px;}
.treasureP_img>img{vertical-align: middle;}
.treasureP_true{border: 1px solid #ecc06d;}
.treasureP_false{border: 1px solid #d5d5d5;}
.treasureP_text_true,.treasureP_text_false,.treasureP_text_help{width: 150px;float: right;margin-top: 8px;margin-left: 5px;}
.treasureP_text_true>p:nth-child(1),.treasureP_text_false>p:nth-child(1){height: 36px;font-size: 14px;	}
.treasureP_text_help>p:nth-child(1){height: 25px;color: #5d92fc;}
.treasureP_text_help>span{color: #181f2e;font-size: 14px}
.treasureP_text_true>p:nth-child(1){color: #5d92fc;}
.treasureP_text_false>p:nth-child(1){color: #676c72;}
.treasureP_text_true>p:nth-child(2),.treasureP_text_false>p:nth-child(2),{margin-top: 10px;}
.treasureP_text_help>p:last-child{margin-top: 5px;}
.treasureP_text_true>p:nth-child(2)>span,.treasureP_text_false>p:nth-child(2)>span,.treasureP_text_help>p:last-child>span{font-size: 14px;margin-right: 10px;color: #181f2e;}
.treasureP_text_true>p:nth-child(2)>i,.treasureP_text_help>p:last-child>i{font-size: 14px;color: #5d92fc;}
.treasureP_text_false>p:nth-child(2)>i{font-size: 14px;color: #676c72;}
.treasureP_content{width: 278px;height: 75px;margin: auto;margin-top: 96px;}
.treasureP_content_time,.treasureP_content_num,.treasureP_content_needNum{width: 100%;line-height: 22px;color: #676c72;font-size: 14px;}
.treasureP_content_num,.treasureP_content_needNum{display: none;}
.treasureP_content_text{width: 100%;line-height: 18px;color: #313131;font-size: 14px;}
.treasureP_xian{width: 100%;height: 1px;line-height: 1px;text-align: center;}
.treasureP_xian>img{vertical-align: middle;}
.treasureP_btn_true,.treasureP_btn_false,.treasureP_btn_help,.treasureP_btn_yetHelp{width: 100%;height: 34px;line-height: 34px;text-align: center;margin-top: 22px;}
.treasureP_btn_true>button{width: 148px;height: 34px;background: #fff;color: #ecc06d;font-size: 16px;border: 1px solid #ecc06d;font-weight: bold;cursor: pointer;outline: none;}
.treasureP_btn_false>button{width: 148px;height: 34px;background: #f5faff;color: #d5d5d5;font-size: 16px;border: 0;font-weight: bold;outline: none;}
.treasureP_btn_help>button{width: 148px;height: 34px;background: #f5faff;color: #f03040;font-size: 16px;border: 1px solid #f03040;font-weight: bold;outline: none;cursor: pointer;}
.treasureP_btn_yetHelp>button,.treasureP_btn_yetHelp>a{width: 112px;height: 34px;background: #fff;font-size: 16px;outline: none;cursor: pointer;}
.treasureP_btn_yetHelp>button:nth-child(1){float: left;color: #ecc06d;border: 1px solid #ecc06d;margin-left: 28px;}
.treasureP_btn_yetHelp>a{float: right;color: #919394;border: 1px solid #919394;margin-right: 28px;}
.prize_title{height: 42px;line-height: 42px;font-size: 16px;color: white;text-align: center;background: url(../../../../assets/img/center/yellow_bg1.png) no-repeat center;background-size: cover;}
.prize_title_bg{background: url(../../../../assets/img/center/gray_bg1.png) no-repeat center;background-size: cover;}
.prize_img{height: 156px;text-align: center;}
.prize_img>img{width: 100%;height: 100%;}
.prize_conyent{width: 200px;height: 68px;margin: 0 auto;}
.prize_img_title{line-height: 18px;font-size: 14px;color: #323232;text-align: center;font-weight: bold;width: 200px;margin: 0 auto;margin-top: 10px;}
.prize_conyent>p{width: 170px;line-height: 14px;font-size: 12px;color: #676767;text-align: center;margin: 0 auto;}
.prize_img_button1{width: 146px;height: 32px;margin: 0 auto;border: solid 1px #c5a363;font-size: 16px;color: #c5a363;outline: none;background: none;margin-top: 4px;cursor: pointer;}
.prize_img_button2{width: 146px;height: 32px;margin: 0 auto;border: solid 1px #a4a4a4;font-size: 16px;color: #a4a4a4;outline: none;background: none;margin-top: 4px;}.prize_img_button3{width: 146px;height: 32px;margin: 0 auto;border: none;font-size: 16px;color: #a4a4a4;outline: none;background: none;margin-top: 4px;}
.prize_shade{width: 299px;height: 285px;background: url(../../../../assets/img/center/masking_03.png);background-size: cover;display: none;position: absolute;bottom: -285px;left: 0;}
.prize_shade_sc{border-top: solid 2px white;}
.prize_shade_div{width: 197px;margin-left: 15px;padding-top: 35px;}
.prize_shade_div>div{font-size: 16px;color: white;}
.prize_shade_div>div>span{width: 82px;line-height: 25px;float: left;text-align: right;}
.prize_shade_div>div>p{width: 114px;line-height: 25px;float: left;}
.prize_shade_p{line-height: 25px;font-size: 16px;color: white;text-align: left;}
.showAddr:hover .prize_shade{display: block;bottom: 0;animation:mymove 1s;}
@keyframes mymove{from {bottom: -285px;}to {bottom: 0px;}}
/*遮罩*/
.shade_layer{width: 100%;height: 100%;background: url(../../../../assets/img/center/masking_03.png);background-size: cover;position: fixed;bottom: 0;left: 0;top: 0;right: 0;z-index: 3;display: table;}
.shade_layer_div{display: table-cell;vertical-align: middle;}
.layer_div{width: 716px;margin:0 auto;background: white;}
.layer_div_content{margin: 0 auto;width: 633px;padding-top: 24px;}
.layer_content{line-height: 30px;font-size: 18px;color: #323232;}
.layer_attention{height: 41px;border-bottom: solid 1px #e4e4e4;margin-bottom: 20px;}
.layer_attention>p{float: left;line-height: 28px;font-size: 14px;color: #a4a4a4;}
.layer_attention>p>a{color: #fb3642;}
.layer_attention>a{float: right;line-height: 28px;font-size: 16px;color: #55acee;}
.layer_site{height: 30px;background: #f2f2f2;}
.layer_site>p{width: 110px;height: 26px;border: solid 2px #e52735;position: relative;float: left;}
.layer_site>p>input{width: 100%;height: 100%;outline: none;border: none;text-align: center;}
.layer_site>p>img{position: absolute;bottom: 0;right: 0;}
.layer_site>span{height: 30px;line-height: 30px;float: left;display: block;font-size: 14px;color: #676767;margin-left: 20px;}
.layer_site>div{height: 30px;line-height: 30px;float: right;font-size: 14px;color: #55acee;}
.layer_site>div>a{margin-right: 10px;}
.layer_fill{height: 164px;margin-top: 7px;}
.layer_fill_left{width: 296px;float: left;}
.layer_fill_left>div>p{line-height: 42px;font-size: 14px;color: #323232;}
.layer_fill_left>div>.fill_left_div{width: 293px;height: 38px;border: solid 1px #e7e7e7;font-size: 14px;color: #323232;}
.layer_fill_left>div>.fill_left_div>input{width: 100%;height: 100%;outline: none;border: none;}
.layer_fill_right{width: 296px;float: right;}
.layer_fill_right>div>p{line-height: 42px;font-size: 14px;color: #323232;}
.layer_fill_right>div>p>a{color: #fb3642;}
.layer_fill_right>div>.fill_left_div{width: 293px;height: 38px;border: solid 1px #e7e7e7;font-size: 14px;color: #323232;}
.layer_fill_right>div>.fill_left_div>input{width: 100%;height: 100%;outline: none;border: none;}
.detail_fill>p{line-height: 44px;font-size: 14px;color: #323232;}
.detail_fill>p>a{color: #fb3642;}
.detail_fill>textarea{width: 96%;height: 56px;border-radius: 2px;-webkit-border-radius: 2px;-moz-border-radius: 2px;border: solid 1px #e8e8e8;resize: none;outline: none;padding: 6px 11px;}
.detail_submit{line-height: 82px;text-align: center;margin-bottom: 20px;}
.detail_submit>button{width: 140px;height: 40px;border-radius: 2px;background: #fb1829;color:white;border: none;outline: none;font-size: 16px;cursor: pointer;}
.street{position: relative;}
.fill_position{width: 393px;height: 263px;background:white;border: solid 1px #e5e5e5;position: absolute;top: 38px;left: 0;}
.fill_positin_div{width: 369px;height: 253px;margin: 0 auto;padding-top: 10px;}
.position_title{height: 26px;border-bottom: solid 1px #fb1829;position: relative;}
.position_title>ul{display: inline-block;position: absolute;top: 1px;left: 0;}
.position_title>ul>li{float: left;padding: 4.2px 5px;margin-right:10px;border-left: solid 1px #e5e5e5;border-right: solid 1px #e5e5e5;border-top: solid 1px #e5e5e5;border-bottom: solid 1px #fb1829;font-size: 12px;color: #3282ff;cursor: pointer;}
.red_border{border-top:solid 1px #fb1829;border-left:solid 1px #fb1829;border-right:solid 1px #fb1829;border-bottom:solid 1px #fff;}
.tacitly{color: #fb3642 !important;}
.position_content{padding-top: 10px;}
.position_content>ul>li{float: left;width: 25%;line-height: 22px;font-size: 12px;color: #3282ff;cursor: pointer;}
</style>
