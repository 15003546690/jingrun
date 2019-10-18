<template>
	<div class="address">
		<div class="add_to" @click="addTo()">
			<div><a >+</a></div>
			<p>新增收货地址</p>
		</div>
		<ul>
			<li class="add_location" id="select" v-for="(item,index) in myAddress">
				<div class="add_ress">
					<div class="add_ress_name">
						收货人：{{item.consignee}}
					</div>
					<div class="add_ress_main">
					     <div class="add_ress_main_phone">
					     	<span>联系电话：</span>
					     	<i>{{item.mobile}}</i>
					     </div>
					     <div class="add_ress_main_location">
					     	<span>收货地址：</span>
					     	<i>{{item.addressDetail}}</i>
					     	<div><p>{{item.addressDetail}}</p></div>
					     </div>
				    </div>
				    <div class="add_ress_button">
				    	<button @click="showModal(item.addressId,index)">删除</button>
				    	<button @click="addrEdit(index)">编辑</button>
				    </div>
				</div>
				<div class="add_ress_select" >
					    <span class="add_ress_select_one" v-show="item.isDefault!==1" @click="Default(index,item.addressId)">设为默认地址</span>	
					    <span class="add_ress_select_two" v-show="item.isDefault==1">默认地址</span>
				</div>	
			</li>
		</ul>
		<div class="confirm_modal1" v-show="showList">
			<div class="confirm_box">
				<div class="confirm_main_or">
					<div class="confirm_main_head">
						<p>提示</p>
						<span @click='hideModal()'>
					    <img src="../../../../assets/img/center/close.png"/></span>
					</div>
					<div class="confirm_text">
						<div class="confirm_text_box">
							<p>是否删除这条收货地址？</p>
						</div>
					</div>
					<div class="confirm_btn">
						<button @click='deteAddress()'>是</button>
						<button @click='hideModal()'>否</button>
					</div>
				</div>
			</div>
		</div>
		<site v-if="isshowindex" @hideModal="hideModal" :siteDate='siteDate' :siteClass="siteClass"></site>
		<Aalert :text='alertText' v-show='alert'></Aalert>
	</div>
</template>
<script>
 import site from '@/components/mall/newincreased/site'
 import Aalert from '@/components/common/alert'
	export default{
		data(){
            return {
            	showlistma:false,
            	isshowindex:false,//弹层显示
            	myAddress:[],//列表
            	isDefault:'',//是否默认地址
            	showList:false,//是否删除弹层
            	listIndex:0,
            	siteDate:{
					add: null,
					fault: null,// 是否是默认地址 
					changeAds:true,//地址弹层里的第二个小弹层
					addressDetail:null,//详细地址
					consignee:null,//
					mobile:null,//电话
					cityIndex:null,//市
					areaIndex:null,//省
					streetIndex:null,//街道
					provinceIndex:null//区
				},
				alert:false,//弹层隐藏
				alertText:null,//弹层内容
				siteClass:'person'
            }
           },
           components:{
           	 site,
           	 Aalert
           },
           created(){
           	this.getAddress()//列表详情
           	this.$Bury(window.location.href,'',0,'dizhiguanli_04013')
           },
           methods:{
            //隐藏弹层
             hideModal(){
             	this.showList = false;
             	this.isshowindex = false;
             	this.getAddress();
             },
            //删除
             showModal(addressId,ind) {
             	this.showList = true;
				this.addressId=addressId;
				this.listIndex = ind;
			},	
            //地址列表详情
            getAddress(){
				this.$CPOST('/account/v1/userInfo/getUserAddress',{
		 		},(res) => {
		 			this.myAddress=res.resultValue.responses;//列表
		 			this.isDefault=res.resultValue.responses.isDefault;//是否默认地址
		 		})
			},
			//点击添加地址
            addTo(){
             	if(this.myAddress.length>=8){
						this.alert=true;
						this.alertText='地址数量已达上限，请您删除或编辑修改';
						$('.confirm_modal').show();
					}else{
						this.isshowindex = true;
						this.siteDate={
							add: null,
							fault: null,
							changeAds:false,
							addressDetail:null,
							consignee:null,
							mobile:null,
							cityIndex:null,
							areaIndex:null,
							streetIndex:null,
							provinceIndex:null
						};
					}
				    this.getAddress(-1);
             },
			//设置默认地址
			Default(i,addressId){
					this.addressId=addressId;
					this.$CPOST('/account/v1/userInfo/setDefaultAddress',{
						addressId:this.addressId
				 		},(res) => {
			 			this.myAddress.forEach(e=>{
			 				if(e.isDefault===1){
			 				   e.isDefault = 0
			 				}
			 			})
			 			this.myAddress[i].isDefault=1;
			 		})
				},
			/*编辑地址*/
			addrEdit(n){
				if(n >= 0){
					this.siteDate.add=this.myAddress[n].addressId;
					this.siteDate.fault=this.myAddress[n].isDefault;
				}else{
					this.siteDate.add = null;
				}
				this.$CPOST('/account/v1/userInfo/queryUserAddressForUpdate',{
					addressId:this.siteDate.add
			 		},(res) => {
		 			if(n >= 0){
			 			this.siteDate.addressDetail = res.resultValue.addressDetail;
						this.siteDate.mobile = res.resultValue.mobile;
						this.siteDate.consignee = res.resultValue.consignee;
						this.siteDate.cityIndex = res.resultValue.city;
						this.siteDate.areaIndex = res.resultValue.county;
						this.siteDate.streetIndex = res.resultValue.street;
						this.siteDate.provinceIndex = res.resultValue.province;
					}
					$('.shade_layer_second').hide();
					this.isshowindex = true;
					this.siteDate.changeAds = true;
		 		})
			},
			//删除
			deteAddress(){
					this.$CPOST('/account//v1/userInfo/delUserAddress',{
						addressId:this.addressId
				 		},(res) => {
				 		this.showList=false;
				 		this.myAddress.splice(this.listIndex,1);
			 		})
				}
           }
	}
</script>
<style scoped>
.address{width: 100%;height: 500px;}
.add_location{position: relative;}
.add_to{width: 302px;height: 192px;float: left;margin-right: 9px;margin-bottom: 10px;border: solid 1px #d5d5d5;cursor: pointer;}
.add_to>div{width: 302px;line-height: 46px;text-align: center;font-size: 34px;color: #676767;margin-top: 58px;}
.add_to>p{line-height: 16px;text-align: center;font-size: 14px;color: #676767;}
.address>ul>li{width: 302px;height: 192px;float: left;margin-right: 9px;margin-bottom: 10px;border: solid 1px #d5d5d5;}
.add_ress{width: 264px;margin: 0 auto;margin-top: 16px;}
.add_ress_name{height: 30px;line-height: 30px;font-size: 14px;color: #676767;border-bottom: solid 1px #e1e1e1;}
.add_ress_main{padding-top: 12px;height: 81px;}
.add_ress_name{display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;overflow: hidden;}
.add_ress_name>div{width: 250px;position: absolute;top: 8px;right: -250px;background: url(../../../../assets/img/center/question_tan.png) no-repeat center;background-size:100% 100%;display: none;z-index: 2;}
.add_ress_name:hover>div{display: block;}
.add_ress_name>div>p{width: 180px;line-height: 16px;margin: 0 auto;margin-top: 8px;margin-bottom: 10px;}
.add_ress_main_phone,.add_ress_main_location{width: 100%;font-size: 14px;color: #676767;display: inline-block;}
.add_ress_main_phone>span,.add_ress_main_location>span{width: 70px;line-height: 22px;float: left;display: block;}
.add_ress_main_phone>i,.add_ress_main_location>i{width: 194px;line-height: 22px;float: left;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden;cursor: pointer;}
.add_ress_main_location{position: relative;}
.add_ress_main_location>div{width: 320px;position: absolute;top: -6px;right: -250px;background: url(../../../../assets/img/center/question_tan.png) no-repeat center;background-size:100% 100%;display: none;z-index: 2;}
.add_ress_main_location:hover>div{display: block;}
.add_ress_main_location>div>p{width: 248px;margin: 0 auto;margin-top: 12px;margin-bottom: 10px;}
.add_ress_button{height: 28px;}
.add_ress_button>button{width: 70px;height: 26px;background: none;border: solid 1px #dfdfdf;margin-right: 10px;font-size: 12px;color: #676767;-moz-border-radius: 2px; -webkit-border-radius: 2px; border-radius: 2px;cursor: pointer; }
.add_ress_select{width: 100%;height: 20px;position: absolute;bottom: 0;right: 0;}
.add_ress_select_one{width: 124px;height: 20px;font-size: 14px;color: #cdcdcd;text-align: center;background: url(../../../../assets/img/center/no_right.png) no-repeat center bottom;background-size: cover;display: block;float: right;cursor: pointer;}
.add_ress_select_two{width: 124px;height: 20px;font-size: 14px;color: #e52735;text-align: center;background: url(../../../../assets/img/center/all_right.png) no-repeat center bottom;background-size: cover;display: block;float: right;cursor: pointer;}
/*是否确认删除*/
.confirm_modal1{width: 100%;height: 100%;position: fixed;left: 0;top: 0;background: url(../../../../assets/img/eventGroup/zhezhao.png) no-repeat center;background-size: 100%;z-index: 5;}
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