<template>
	<div class="shade_layer">
			<div class="shade_layer_div">
				<!-- <div class="shade_layer_second" v-show="showCloseModal==1">
			    	<div class="layer_second_one">
			    		<div><a>提示</a><img @click="hideModal" src="../../../assets/img/close2.png"/></div>
			    		<p>请输入您的收货地址</p>
			    		<button @click="newAddressTwo(2)">新增地址</button>
			    	</div>
			    </div> -->
				<div class="layer_div" v-show="showCloseModal==2">
					<div class="div_content">
					<div class="layer_div_content">
						<div class="layer_content">
							编辑收货地址
						</div>
						<div class="layer_attention">
							<p>带 ”<a>*</a>”号均为必填项</p>
						</div>
						<div class="layer_fill">
						<div class="layer_fill_left">
							<div>
								<p><a style="color: #fb3642;">*</a>收件人</p>
							    <div class="fill_left_div">
							    	<input type="text" name="" id="" value="" v-model="user.consignee"/>
							    </div>
							</div>
							<div>
								<p>邮编</p>
							     <div class="fill_left_div">
							    	<input type="number" name="" id="" value="" v-model="user.zipCode"/>
							    </div>
							</div>
						</div>
						<div class="layer_fill_right">
							<div>
								<p><a>*</a>联系电话</p>
							    <div class="fill_left_div">
							    	<input class="left_div" type="text" name="" maxlength="11" onkeyup="value=value.replace(/[^\d]/g,'')" v-model="user.mobile" />
							    </div>
							</div>
							<div class="fill_most">
								<p><a>*</a>所在街道</p>
								<p v-show='siteDate.changeAds==true' class='fill_adriess'>当前地址：{{siteDate.provinceIndex}}/{{siteDate.cityIndex}}/{{siteDate.areaIndex}}/{{siteDate.streetIndex}}</p>
							    <select id="province" @change="provinceChange()" v-model='rendering.provinceIndex'>
							    	<option disabled >请选择</option>
							    	<option v-for='i in addr' :value="i">{{i.name}}</option>
							    </select>	
								<select id="city" v-on:change="cityChange()" v-model='rendering.cityIndex'>
									<option disabled >请选择</option>
									<!-- <option v-for='i in address[0][110000].children' :value="i" v-if='rendering.city==true'>{{i.name}}</option> -->
									<option v-for='i in rendering.cityRender' :value="i" v-if='rendering.city==false'>{{i.name}}</option>
								</select>	
								<select id="area" v-on:change="areaChange()" v-model='rendering.areaIndex'>
									<option disabled >请选择</option>
									<!-- <option v-for='i in address[0][110000].children[110100].children' :value="i" v-if='rendering.area==true'>{{i.name}}</option> -->
									<option v-for='i in rendering.areaRender' :value="i" v-if='rendering.area==false'>{{i.name}}</option>
								</select>	
								<select id="street" v-model='rendering.streetIndex'>
									<option disabled >请选择</option>
									<!-- <option v-for='i in address[0][110000].children[110100].children[110101].children' :value="i" v-if='rendering.street==true'>{{i.name}}</option> -->
									<option v-for='i in rendering.streetRender' :value="i" v-if='rendering.street==false'>{{i.name}}</option>
								</select>	
							</div>
						</div>
					</div>
					    <div class="detail_fill">
					    	<p><a>*</a>详细地址</p>
					    	<textarea v-model="user.addressDetail"></textarea>
					    </div>
					    <div class="detail_submit">
					    	<button @click="setShowCloseModal(3)">提交</button>
					    </div>
					</div>
					<img @click="hideModal" class="div_content_img" src="../../../assets/img/close2.png"/>
					</div>
				</div>
				<div class="shade_layer_three" v-show="showCloseModal==3">
			    	<div class="layer_three_div">
			    		<p><img @click="hideModal" src="../../../assets/img/close2.png"/></p>
			    		<div class="layer_three_address">
			    			<div class="layer_three_location">
			    			收货地址<a @click="newAddressTwo(2)">新增地址</a>
			    		</div>
			    		    <div class="layer_site" v-for="(item,index) in myAddress" :data-id="item.addressId" @click="site(index,item.addressId)" :class="[item.isDefault==1?'layer_site_on':'layer_site']">
			    		    		<p>{{item.consignee}}</p>
									<span>{{item.mobile}}</span>
									<span>{{item.addressDetail}}</span>
							</div>
			    		</div>
			    		<button v-on:click="confirm(i)">确认领取</button>
			    	</div>
		    	</div>
			</div>
			<Aalert :text='alertText' v-show='alert' @vshow='vshow' @yes='yes'></Aalert>
			<authen v-show='authenShow' @authenclose='authenclose'></authen>
		</div>	
</template>
<script>
// import address from './address'
import Aalert from '../../common/alert'
import authen from '../../common/authentication'
export default {
	props:[
		'siteDate',
		'siteClass',

	],
	components:{
		Aalert,
		authen
	},
	data () {
		return {
			addr:null,
			authenShow:false,
			// address,
			rendering:{
				provinceIndex:'请选择',
				cityRender:[],
				city:true,
				cityIndex:'请选择',
				areaRender:[],
				area:true,
				areaIndex:'请选择',
				streetRender:[],
				street:true,
				streetIndex:'请选择'
			},
			user:{
				addressDetail:null,//详细地址
				consignee:null,
				mobile:this.siteDate.mobile,
				zipCode:null
			},
			alert:false,
			alertText:null,
			myAddress:[],
			changeGoodsDate:null,
			addressId:null,
			showCloseModal:2,
			i: 0,
			luck:{
				success:false,
				show:false,
				luck:false,
				luckImg:null,
				luckName:null,
				luckId:null,
				luckWd:null,
			},
		}
	},
	created(){
		if(this.$route.query.id==0){
			this.luck.luck=true;
			let luck=JSON.parse(sessionStorage.getItem("luck"));
			this.luck.luckImg=luck.checkedImg;
			this.luck.luckName=luck.checkedName;
			this.luck.luckId=luck.checkedId;
			this.luck.luckWd=luck.checkedWd;
		}
		this.getAddr(0,0);
		 if(this.siteDate.changeAds==true){
		 	this.showCloseModal=2;
		 }
		var that=this
		if(this.siteDate.changeAds==true){
			setTimeout(()=>{
				if(this.siteDate.mobile!=''){
					this.user.mobile=this.siteDate.mobile;
					this.user.consignee=this.siteDate.consignee;
					this.user.addressDetail=this.siteDate.addressDetail;
				}
			},50)
		}
	},
	methods:{
		getAddr(pid,k){
			this.$CPOST('/share/v1/ditctArea/queryAreaList', {
					"pid": pid
		 		},(res) => {
		 			if(k==0){
		 				this.addr=res.resultValue;
		 			}else if(k==1){
		 				this.rendering.cityRender=res.resultValue;
		 			}else if(k==2){
		 				this.rendering.areaRender=res.resultValue;
		 			}else{
		 				this.rendering.streetRender=res.resultValue;
		 			}
		 			
		 		})
		},
		authenclose(){
			this.authenShow=false;
		},
		newAddressTwo(flag){
			this.showCloseModal = flag;
			this.user.addressDetail='';
			this.user.consignee='';
			this.user.mobile='';
			this.user.zipCode='';
			this.rendering.cityIndex='请选择';
			this.rendering.areaIndex='请选择';
			this.rendering.streetIndex='请选择';
			this.rendering.provinceIndex='请选择';
		},
		vshow(){
			this.alert=false;
		},
		hideModal () {
			if(this.siteDate.add==''){
				this.showCloseModal = 2;
			}else{
			}
	        this.$emit('hideModal');
	   },
		provinceChange(){
			this.rendering.city=false;
			this.rendering.cityRender='';
			this.rendering.areaRender='';
			this.rendering.streetRender='';
			this.getAddr(this.rendering.provinceIndex.id,1);
			// this.rendering.cityRender=this.address[0][this.rendering.provinceIndex.id].children;
			this.rendering.cityIndex='请选择';
			this.rendering.areaIndex='请选择';
			this.rendering.streetIndex='请选择';
		},
		cityChange(){
			this.rendering.area=false;
			this.getAddr(this.rendering.cityIndex.id,2);
			// this.rendering.areaRender=this.address[0][this.rendering.provinceIndex.id].children[this.rendering.cityIndex.id].children;
			this.rendering.areaIndex='请选择';
		},
		areaChange(){
			this.rendering.street=false;
			this.getAddr(this.rendering.areaIndex.id,3);
			// this.rendering.streetRender=this.address[0][this.rendering.provinceIndex.id].children[this.rendering.cityIndex.id].children[this.rendering.areaIndex.id].children;
			this.rendering.streetIndex='请选择';
		},
		alertDailog(txt){
			this.alert = true;
			$('.confirm_modal').show();
			this.alertText=txt;
		},
		yes(){
			if(this.alertText == '操作成功'){
				this.$router.go(0);
			}
		},
	   	setShowCloseModal (flag) {
	   		if(this.user.consignee==null){
	   			$('.confirm_modal').show();
				this.alertText='请输入收件人姓名';
	   			return false
	   		}else if(this.user.mobile==''){
	   			$('.confirm_modal').show();
				this.alertText='请输入联系电话';
	   			return false
	   		}else if(this.rendering.cityIndex=='请选择' || this.rendering.areaIndex=='请选择' || this.rendering.provinceIndex=='请选择'){
	   			$('.confirm_modal').show();
				this.alertText='请选择所在街道';
	   			return false
	   		}else if(this.user.addressDetail==''){
	   			$('.confirm_modal').show();
				this.alertText='请输入详细地址';
	   			return false
	   		}
	   		else{
	   			var postData = {
					addressDetail: this.user.addressDetail,	//详细地址
				  	cId: this.rendering.areaIndex.id,			//区ID
				  	city: this.rendering.cityIndex.name,			//市名称
				  	cityId: this.rendering.cityIndex.id,		//市ID
				  	consignee: this.user.consignee,	//收货人
				  	county: this.rendering.areaIndex.name,		//区名称
				  	mobile: this.user.mobile,			//手机号
				  	pId: this.rendering.provinceIndex.id,			//省ID
				  	province: this.rendering.provinceIndex.name,		//省名称
				  	sId: this.rendering.streetIndex.id,			//街道ID
				  	street: this.rendering.streetIndex.name		//街道
		 		}
	   			if(this.siteDate.changeAds){
	   				var url = '/account/v1/userInfo/updateUserAddressV2';
	   				postData.addressId = this.siteDate.add;
	   				postData.isDefault = this.siteDate.fault;
	   			}else{
	   				var url = '/account/v1/userInfo/addUserAddress';
	   			}
				this.$CPOST(url, postData,(res) => {
		 			if(res.resultCode==200){
		 				if(this.siteClass == 'person'){
		 					this.alertDailog('操作成功');
		 					this.siteDate.add=null;
		 				}else{
		 					this.showCloseModal = flag;
				   			if(this.siteDate.changeAds==false){
				   				this.siteDate.add=null;
				   				this.siteDate.fault=null;
				   				this.showCloseModal=3;
				   			}
				   			this.siteDate.changeAds=false;
			 				this.$CPOST('/account/v1/userInfo/getUserAddress',{
					 		},(res) => {
					 			this.myAddress=res.resultValue.responses;
					 		})
				 		}
		 			}
		 			if(res.resultCode==400){
		 				$('.confirm_modal').show();
	                    this.alertText = res.resultMessages;
		 			}
		 		})
	   		}
	   },
		site(i,addressId){
				this.i = i;
				this.addressId=addressId;
				this.$CPOST('/account/v1/userInfo/setDefaultAddress', {
					addressId:this.addressId
			 		},(res) => {
			 		this.$CPOST('/account/v1/userInfo/getUserAddress',{
			 		},(res) => {
			 			this.myAddress=res.resultValue.responses;
			 		})
		 			this.myAddress.forEach(addressId=>{
		 				if(addressId.isDefault===1){
		 					addressId.isDefault = 0;
		 				}
		 			})
		 			this.myAddress[i].isDefault=1;
		 		})
	 		
		},
		confirm(i){
			if(this.$route.query.id!=0){
				if(this.$route.path.indexOf('mall') > -1){
					this.$CPOST('/mall/v1/mall/exchangeGoodsData',{
						goodsId: this.$route.query.id
					},(res)=>{
						let cls=document.querySelector('.layer_site_on')
						if(cls==null){
							$('.confirm_modal').show();
							this.alertText='请选择收货地址';
						}else{
							this.changeGoodsDate = res.resultValue;
							this.goodsId = res.resultValue.goodsId;
							this.$CPOST('/mall/v1/mall/exchangeGoods',{
								address : this.changeGoodsDate.userAddressList[0].address,
								goodsId : this.changeGoodsDate.goodsId ,
								goodsName : this.changeGoodsDate.goodsName ,
								goodsType : this.changeGoodsDate.goodsCategoriesType,
								mobilePhone : this.changeGoodsDate.userAddressList[0].mobilePhone,
								realName : this.changeGoodsDate.userAddressList[0].realName
							},(res)=>{
					 			if(res.resultCode==10123){
						 			this.authenShow=true;
						 		}else if(res.resultCode==200){
					 				this.$router.push('/mall/success');
					 			}else if(res.resultCode==10126){
					 				this.alert=true;
									this.alertText=res.resultMessages;
					 			}else if(res.resultCode==10125){
					 				this.authenShow=true;
					 			}
					 			else{
					 				this.$router.push('/mall/error');
					 			}
							})
						}
					})
				}
			}else{
				let arr=[],
					idx;
				for(var i=0;i<this.myAddress.length;i++){
					arr.push(this.myAddress[i].isDefault)
				}
				idx=arr.indexOf(1);
				let cls=document.querySelector('.layer_site_on')
				if(cls==null){
					$('.confirm_modal').show();
					this.alertText='请选择收货地址';
				}else{
					this.$CPOST('/mall/v1/draw/receivePrize',{
						"address": this.myAddress[idx].addressDetail,
						"mobilePhone": this.myAddress[idx].mobile,
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
}
</script>
<style>
.shade_layer{width: 100%;height: 100%;background: url(../../../assets/img/center/masking_03.png);background-size: cover;position: fixed;bottom: 0;left: 0;top: 0;right: 0;z-index: 3;display: table;}
.shade_layer_div{display: table-cell;vertical-align: middle;}
.layer_div{width: 716px;height: 484px;margin: 0 auto;background: #e6e6e6;overflow: hidden;}
.div_content{width: 700px;height: 472px;border: solid 1px #c9c9c9;background: white;margin: 0 auto;margin-top: 6px;position: relative;}
.div_content_img{position: absolute;top: 0;right: 0;cursor: pointer;}
.layer_div_content{margin: 0 auto;width: 633px;padding-top: 24px;}
.layer_content{line-height: 30px;font-size: 18px;color: #323232;}
.layer_attention{height: 41px;border-bottom: solid 1px #e4e4e4;margin-bottom: 20px;}
.layer_attention>p{float: left;line-height: 28px;font-size: 14px;color: #a4a4a4;}
.layer_attention>p>a{color: #fb3642;}
.layer_attention>a{float: right;line-height: 28px;font-size: 16px;color: #55acee;}
.layer_site{height: 30px;margin-bottom: 10px;cursor: pointer;}
.layer_site_on{border: solid 2px #e52735;position: relative;}
.layer_site>p{width: 90px;height: 30px;line-height: 30px;margin-left: 10px;float: left;font-size: 14px;color: #676767;text-overflow: ellipsis;white-space: nowrap;overflow: hidden;text-align: left;}
.layer_site>span{height: 30px;line-height: 30px;float: left;display: block;font-size: 14px;color: #676767;margin-left: 20px;}
.layer_site>img{position: absolute;bottom: 0;right: 0;}
.layer_site>div{height: 30px;line-height: 30px;float: right;font-size: 14px;color: #55acee;}
.layer_site>div>a{margin-right: 10px;}
.layer_fill{height: 164px;margin-top: 7px;}
.layer_fill_left{width: 296px;float: left;}
.layer_fill_left>div>p{line-height: 42px;font-size: 14px;color: #323232;}
.layer_fill_left>div>.fill_left_div{width: 293px;height: 38px;border: solid 1px #e7e7e7;font-size: 14px;color: #323232;}
.layer_fill_left>div>.fill_left_div>input{width: 100%;height: 100%;outline: none;color:#323232;border: none;}
.layer_fill_right{width: 296px;float: right;}
.layer_fill_right>div>p{line-height: 42px;font-size: 14px;color: #323232;}
.layer_fill_right>div>p>a{color: #fb3642;}
.layer_fill_right>div>.fill_left_div{width: 293px;height: 38px;border: solid 1px #e7e7e7;font-size: 14px;color: #323232;}
.layer_fill_right>div>.fill_left_div>input{width: 100%;height: 100%;outline: none;border: none;}
.detail_fill>p{line-height: 44px;font-size: 14px;color: #323232;}
.detail_fill>p>a{color: #fb3642;}
.detail_fill>textarea{width: 96%;height: 56px;color:#323232;border-radius: 2px;-webkit-border-radius: 2px;-moz-border-radius: 2px;border: solid 1px #e8e8e8;resize: none;outline: none;padding: 6px 11px;}
.detail_submit{line-height: 82px;text-align: center;margin-bottom: 20px;}
.detail_submit>button{width: 140px;height: 40px;border-radius: 2px;background: #fb1829;color:#fff;border: none;outline: none;font-size: 16px;cursor: pointer;}
.street{position: relative;}
.tacitly{color: #fb3642 !important;}
.shade_layer_second{width: 434px;height: 195px;background: #e6e6e6;margin: 0 auto;overflow: hidden;}
.layer_second_one{width: 422px;height: 183px;background: #fff;margin: 0 auto;margin-top: 5px;border: solid 1px #c9c9c9;text-align: center;}
.layer_second_one>div{height: 24px;text-align: left;font-size: 14px;color: #323232;	}
.layer_second_one>div>a{height: 16px;margin-top: 10px;margin-left: 12px;display: inline-block;}
.layer_second_one>div>img{float: right;cursor: pointer;}
.layer_second_one>p{line-height: 18px;text-align: center;font-size: 16px;color: #323232;margin-top: 42px;}
.layer_second_one>button{width: 100px;height: 33px;border-radius: 2px;background: #f00d0e;font-size: 14px;color: #fff;border: none;outline: none;margin: 0 auto;margin-top: 36px;cursor: pointer;}
.shade_layer_three{width: 715px;min-height: 268px;background: #e6e6e6;margin: 0 auto;overflow: hidden;padding-bottom: 6px;}
.layer_three_div{width: 705px;min-height: 256px;background: #fff;border: solid 1px #c9c9c9;margin: 0 auto;margin-top: 6px;text-align: center;padding-bottom: 20px;}
.layer_three_div>p{height: 26px;text-align: right;}
.layer_three_div>p>img{cursor: pointer;}
.layer_three_location{height: 34px;font-size: 18px;color: #323232;border-bottom: solid 1px #e4e4e4;margin-bottom: 20px;text-align: left;}
.layer_three_location>a{height: 34px;line-height: 34px;font-size: 16px;color: #55acee;float: right;}
.layer_three_address{width: 630px;margin: 0 auto;}
.layer_three_div>button{width: 140px;height: 40px;border: none;outline: none;background: #fb1829;font-size: 16px;color: #fff;border-radius: 4px;margin-top: 15px;cursor: pointer;}
.fill_most>select{width: 40%;margin-top: 3px;border: solid 1px #e7e7e7;}
.fill_adriess{line-height: 22px !important;color: #999 !important;white-space: nowrap;text-overflow: ellipsis;overflow:hidden;}
.shade_layer{z-index: 10000;}
input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{-webkit-appearance: none !important;margin: 0; }
</style>