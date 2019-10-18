<template>
	<div>
		<div class="goods_details">
			<!--商品信息-->
			<div class="right_box1_body" v-show='!luck.luck'>
				<div class="right_box1_body_left">
					<img :src="changeGoodsDate.goodsPicture" />
				</div>
				<div class="right_box1_body_right">
					<div>{{changeGoodsDate.goodsName}}</div>
					<p>兑换数量：1</p>
					<p>商品价格：<i>{{changeGoodsDate.goodsPrice}}</i><img src="../../../assets/img/eventGroup/event_jindou.png" /></p>
				</div>
			</div>
			<div class="right_box1_body" v-show='luck.luck'>
				<div class="right_box1_body_left">
					<img :src="luck.luckImg" />
				</div>
				<div class="right_box1_body_right">
					<div>{{luck.luckName}}</div>
					<p>兑换数量：1</p>
				</div>
			</div>
		</div>
		<div class="pic_shopping">
			<div class="take-delivery-body">
				<div class="delivery-box">
					<div class="delivery-box-adress">收货地址<span class="xinzeng" @click="siteadress">新增地址</span></div>
					<div class="delivery-body nano">
						<div class="mian-height nano-content">
							<div class="delivery-body-first active"  v-for="(item,index) in myAddress">
								<div id="select" :data-id="item.addressId">
									<div class="imgShow" v-if="item.isDefault===1">
										<img src="../../../assets/img/shopping/addr-select.png"/>
									</div>
									<div class="select_right">
										<p><a class="addr-edit" v-on:click="addrEdit(index,item.addressId)">修改</a> | <a class="addr-del" v-on:click="showModal(index,item.addressId)">删除</a></p>
										<span class="mLive" v-if="item.isDefault===1">[ 默认地址 ]</span>
										<span class="addr-default" v-if="item.isDefault!==1" v-on:click="Default(index,item.addressId)">[ 设置默认 ]</span>
									</div>
								</div>
								<div class="consignee">
									<span>收货人：</span>
									<p>{{item.consignee}}</p>
								</div>
								<div class="suozai">
									<span>联系电话：</span>
									<p>{{item.mobile}}</p>
								</div>
								<div class="xiangxi">
									<span>详细地址：</span>
									<p>{{item.addressDetail}}</p>
								</div>
							</div>
							<div class="center-main-blank hide">
								<p class="center-main-blank-p1"><img src="../../../assets/img/shopping/center-blank.png"/></p>
								<p class="center-main-blank-p2">请添加收货地址</p>
							</div>
						</div>
					</div>
					<div class="sure">
					<button class="sub-order-btn" v-on:click="immediately">立即兑换</button>
				    </div>
				</div>
				
			</div>
		</div>
		<div class="confirm_modal" v-if="isShow">
			<div class="confirm_box">
				<div class="confirm_main_or">
					<div class="confirm_main_head">
						<p>提示</p>
						<span @click='hideIsModal'><img src="../../../assets/img/center/close.png"/></span>
					</div>
					<div class="confirm_text">
						<div class="confirm_text_box">
							<p>确定要删除吗？</p>
						</div>
					</div>
					<div class="confirm_btn">
						<button @click='deteAddress()'>确定</button>
						<button @click='hideIsModal'>取消</button>
					</div>
				</div>
			</div>
		</div>
		<site v-if="isshowindex" @hideModal="hideModal" :siteDate='siteDate'></site>
		<Aalert :text='alertText' v-show='alert' @vshow='vshow'/>
		<authen v-show='authenShow' @authenclose='authenclose'></authen>
	</div>
</template>
<script>
	import site from './site'
	import Aalert from '../../common/alert'
	import authen from '../../common/authentication'
	export default {
		data() {
			return {
				authenShow:false,
				isshowindex: false,
				isShow: false,
				changeGoodsDate: [],
				myAddress: null,
				addressId: null,
				isDefault: null,
				siteDate:{
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
				},
				alert:false,
				alertText:null,
				luck:{
					success:false,
					show:false,
					luck:false,
					luckImg:null,
					luckName:null,
					luckId:null,
					luckWd:null,
				},
				addressList:[]
			  }
			},
			components:{
				site,
				Aalert,
				authen
			},
			created() {
				this.getAddress();
				if(this.$route.query.id==0){
					this.luck.luck=true;
					let luck=JSON.parse(sessionStorage.getItem("luck"));
					this.luck.luckImg=luck.checkedImg;
					this.luck.luckName=luck.checkedName;
					this.luck.luckId=luck.checkedId;
					this.luck.luckWd=luck.checkedWd;
				}else{
					this.getConversion();
				}
			},
			methods: {
				authenclose(){
					this.authenShow=false;
				},
				vshow(){
					this.alert=false;
				},
				siteadress() {
					this.authenShow=false;
					if(this.myAddress.length>=8){
						this.alert=true;
						this.alertText='常用地址不能超过8条';
						return false;
					}
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
				},
				hideModal() {
					this.isshowindex = false;
					this.getAddress()
				},
				//获取兑换信息
				getConversion() {
					this.$CPOST('/mall/v1/mall/exchangeGoodsData',{
						goodsId: this.$route.query.id
					},(res) => {
						this.changeGoodsDate = res.resultValue;
						this.goodsId = res.resultValue.goodsId;
					})
				},
				//获取收货地址列表
				getAddress(){
					this.$CPOST('/account/v1/userInfo/getUserAddress',{
			 		},(res) => {
			 			this.myAddress=res.resultValue.responses;
			 			this.isDefault=res.resultValue.responses.isDefault;
			 			this.addressList=res.resultValue.responses;
			 		})
				},
				//设置默认地址
				Default(i,addressId){
					this.addressId=addressId;
					this.$CPOST('/account/v1/userInfo/setDefaultAddress',{
						addressId:this.addressId
				 		},(res) => {
				 		this.getAddress();
				 		if(this.$route.query.id!=0){
				 			this.getConversion();
				 		}
			 			this.myAddress.forEach(e=>{
			 				if(e.isDefault===1){
			 					e.isDefault = 0;
			 				}
			 			})
			 			this.myAddress[i].isDefault=1;
			 		})
				},
				showModal(ind,addressId) {
					this.addressId=addressId
					this.isShow = true;
					this.listIndex = ind;
				},
				hideIsModal() {
					this.isShow = false;
				},
				//删除
				deteAddress(){
					this.$CPOST('/account/v1/userInfo/delUserAddress',{
						addressId:this.addressId
			 		},(res) => {
			 			this.myAddress.splice(this.listIndex,1)
			 			this.hideIsModal()
			 			this.getAddress();
			 		})
				},
				//修改
				addrEdit(n,addressId){
					this.siteDate.add=this.myAddress[n].addressId;
					this.siteDate.fault=this.myAddress[n].isDefault;					
					this.$CPOST('/account/v1/userInfo/queryUserAddressForUpdate',{
						addressId:addressId
				 		},(res) => {
			 			this.siteDate.addressDetail=res.resultValue.addressDetail;
						this.siteDate.consignee=res.resultValue.consignee;
						this.siteDate.mobile=res.resultValue.mobile;
						this.siteDate.cityIndex=res.resultValue.city;
						this.siteDate.areaIndex=res.resultValue.county;
						this.siteDate.streetIndex=res.resultValue.street;
						this.siteDate.provinceIndex=res.resultValue.province;
						this.isshowindex = true;
						this.siteDate.changeAds=true;
			 		})
				},
				immediately(){
					let cls=document.querySelector('.imgShow');
					if(cls==null){
						this.alert=true;
						this.alertText='请选择收货地址';
					}else if(this.$route.query.id!=0){
						console.log(this.changeGoodsDate)
						this.$CPOST('/mall/v1/mall/exchangeGoods',{
							address : this.changeGoodsDate.userAddressList[0].address,
							goodsId : this.changeGoodsDate.goodsId ,
							goodsName : this.changeGoodsDate.goodsName ,
							goodsType : this.changeGoodsDate.goodsCategoriesType,
							mobilePhone : this.changeGoodsDate.userAddressList[0].mobilePhone,
							realName : this.changeGoodsDate.userAddressList[0].realName,
					 	},(res) => {
					 		if(res.resultCode==10123){
					 			this.authenShow=true;
					 		}else if(res.resultCode==200){
				 				this.$router.push('/mall/success');
				 			}else if(res.resultCode==10126){
				 				this.alert=true;
								this.alertText=res.resultMessages;
				 			}else if(res.resultCode==10125){
				 				this.authenShow=true;
				 			}else{
				 				this.$router.push('/mall/error');
				 			}
				 		})
					}else{
						let arr=[],
							idx;
						for(var i=0;i<this.addressList.length;i++){
							arr.push(this.addressList[i].isDefault)
						}
						idx=arr.indexOf(1);
						this.$CPOST('/mall/v1/draw/receivePrize',{
							"address": this.addressList[idx].addressDetail,
							"mobilePhone": this.addressList[idx].mobile,
							"prizeId": this.luck.luckId,
							"realName": this.luck.luckName,
							"winId": this.luck.luckWd
				 		},(res) => {
				 			if(res.resultCode==200){
				 				this.luck.success=true;
				 				sessionStorage.setItem("successluck", JSON.stringify(this.luck));
				 				this.$router.push({path:'/mall/list/luck'})
				 			}else{
				 				this.alert=true;
								this.alertText=res.resultMessages;
				 			}
				 		})
					}
					
				}
			}
	}
</script>
<style scoped='scoped'>
.right_box1_body {min-height: 166px;width: 97%;margin: 0 auto;display: inline-block;}
.breadst {width: 97%;margin: 0 auto;}
.right_box1_body_left,.right_box1_body_right {float: left;}
.right_box1_body_left {width: 282px;height: 164px;line-height: 164px;text-align: center;border: solid 1px #ddd;}
.right_box1_body_left>img {width: 100%;height: 100%;}
.right_box1_body_right {margin-left: 26px;}
.right_box1_body_right>div {line-height: 30px;color: #45413e;font-size: 20px;}
.right_box1_body_right>p {height: 32px;line-height: 32px;color: #676767;font-size: 16px;}
.right_box1_body_right>p>img {vertical-align: text-top;margin-left: 5px;}
/***************收货地址********************/
.imgShow{display: inline-block;}
.goods_details {width: 100%;margin: 0 auto;}
.pic_shopping {min-height: 200px;width: 100%;margin: 0 auto;}
.pic_shopping>img {width: 100%;height: 100%;}
.take-delivery-body {width: 100%;background: white;overflow: hidden;}
.delivery-box {width: 100%;}
.delivery-box-adress {height: 40px;line-height: 40px;font-size: 20px;color: #2d2d2d;}
.delivery-box-adress>span {width: 92px;height: 40px;text-align: center;line-height: 40px;color: #5d92fc;font-size: 14px;cursor: pointer;float: right;display: block;}
.delivery-body{width: 100%;overflow-y: auto;margin:0 auto;overflow: hidden;}
.delivery-body-first{height:100px;margin-bottom:15px;position: relative;background:white url(../../../assets/img/shopping/jianqing.png) no-repeat;background-size: 100% 100%;cursor: pointer;}
.delivery-body-first-left{width: 100%;margin:0 auto;margin-bottom:15px;}
.delivery-body-first-right{width: 100%;}
.delivery-body-first.active{height: 100px;background:#f8f9fe url(../../../assets/img/shopping/jiazhong.png) no-repeat;background-size: 100% 100%;}
#select{width: 100%;height:25px;position: absolute;left: 8px;top: 4px;}
#select>img{float: left;}
.select_right{height:30px;line-height: 30px;float: right;margin-right: 15px;}
.select_right>p{width: 80px;line-height: 30px;font-size: 12px;color: #676C72;display: inline-block;font-family: "宋体";}
.select_right>p>a:hover{color: #1f242f;}
.select_right>span{margin:0 14px;font-size:12px;color: #5d92fc;font-size: 12px;}
.consignee{display: inline-block;font-size: 14px;color: #1f242f;margin-top: 27px;width: 100%;}
.suozai,.xiangxi{width: 100%;font-size: 14px;color: #1f242f;}
.xiangxi{width: 100%;margin-bottom: 20px;}
.consignee>span,.suozai>span,.xiangxi>span{width:80px;text-align: right;line-height:16px;margin-left: 20px;display: inline-block;vertical-align: top;}
.consignee>p,.suozai>p,.xiangxi>p{line-height:16px;text-align: left;display: inline-block;}
/***************确定********************/
.sure{height:38px;margin-top:20px;margin-bottom: 24px;text-align: center;position: relative;}
.sure>button{width:120px;height:38px;background: #eb3030;color: white;font-size:16px;border:none;-moz-border-radius: 4px;-webkit-border-radius: 4px; border-radius: 4px; cursor: pointer;position: relative;}
.delivery-box-adress>span{width: 92px;height: 26px;text-align: center;line-height: 26px;color: #5d92fc;font-size: 14px;cursor: pointer;float: right;}
.sure>span{width:92px;height:26px;position: absolute;top:6px;right: 0;text-align: center;line-height:26px;color: #5d92fc;font-size:14px;cursor: pointer;}
.center-main-blank-p1{text-align: center;}
/*取消下单弹层*/
.confirm_modal{width: 100%;height: 100%;position: fixed;left: 0;top: 0;background: url(../../../assets/img/eventGroup/zhezhao.png) no-repeat center;background-size: 100%;z-index: 5;}
.confirm_box{width: 435px;height: 196px;background: #e6e6e6;position: absolute;left: 0;top: 0;bottom: 0;right: 0;margin: auto;}
.confirm_main,.confirm_main_or{width: 423px;height: 184px;background: #fff;border: 1px solid #c9c9c9;margin: auto;margin-top: 5px;}
.confirm_main_head{width: 100%;height: 32px;}
.confirm_main_head>p{float: left;line-height: 32px;color: #323232;font-size: 14px;padding-left: 13px;}
.confirm_main_head>span{display: block;float: right;cursor: pointer;}
.confirm_text{width: 340px;height: 85px;line-height: 85px;text-align: center;margin: auto;}
.confirm_text_box{display: inline-block;vertical-align: middle;}
.confirm_btn{width: 100%;height: 32px;text-align: center;color: #323232;font-size: 14px;}
.confirm_btn>button{width: 98px;height: 32px;background: url(../../../assets/img/eventGroup/event-btn.png) no-repeat center;border: 0;outline: none;color: #fff;font-size: 14px;cursor: pointer;}
</style>