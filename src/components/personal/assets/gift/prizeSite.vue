<template>
<div>
	<div class="shade_layer" v-show="modalMain">
		<div class="shade_layer_div">
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
						<div class="">
							<p>收件人</p>
						    <div class="fill_left_div">
						    	<input type="text" name="" id="" value="" v-model="user.consignee"/>
						    </div>
						</div>
						<div class="">
							<p>邮编</p>
						     <div class="fill_left_div">
						    	<input type="text" name="" id="" value="" v-model="user.zipCode"/>
						    </div>
						</div>
					</div>
					<div class="layer_fill_right">
						<div class="">
							<p><a>*</a>联系电话</p>
						    <div class="fill_left_div">
						    	<input type="text" name="" maxlength="11" onkeyup="value=value.replace(/[^\d]/g,'')" v-model="user.mobile"/>
						    </div>
						</div>
						<div class="fill_most">
							<p><a>*</a>所在街道</p>
						    <select id="province" @change="provinceChange()" v-model='rendering.provinceIndex'>
						    	<option disabled >请选择</option>
						    	<option v-for='i in addr' :value="i">{{i.name}}</option>
						    </select>	
							<select id="city" v-on:change="cityChange()" v-model='rendering.cityIndex'>
								<option disabled >请选择</option>
								<option v-for='i in rendering.cityRender' :value="i" v-if='rendering.city==false'>{{i.name}}</option>
							</select>	
							<select id="area" v-on:change="areaChange()" v-model='rendering.areaIndex'>
								<option disabled >请选择</option>
								<option v-for='i in rendering.areaRender' :value="i" v-if='rendering.area==false'>{{i.name}}</option>
							</select>	
							<select id="street" v-model='rendering.streetIndex'>
								<option disabled >请选择</option>
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
				<img @click="hideModal" class="div_content_img" src="../../../../assets/img/close2.png"/>
				</div>
			</div>
			<div class="shade_layer_three" v-show="showCloseModal==3">
		    	<div class="layer_three_div">
		    		<p><img @click="hideModal" src="../../../../assets/img/close2.png"/></p>
		    		<div class="layer_three_address">
		    			<div class="layer_three_location">
		    			收货地址<a @click="newAddressTwo()">新增地址</a>
		    		</div>
		    		    <div class="layer_site" v-for="(item,index) in myAddress" v-on:click="site(index,item.addressId)" :class="[item.isDefault==1?'layer_site_on':'layer_site']">
		    		    		<p>{{item.consignee}}</p>
								<span>{{item.mobile}}</span>
								<span>{{item.addressDetail}}</span>
						</div>
		    		</div>
		    		<button v-on:click="confirm(i)">确认领取</button>
		    	</div>
		    </div>
		</div>
	</div>
	<Alert :text='alertText' v-show='alert' @yes='hideModalMain'></Alert>
	<authen v-show='authenShow'  @authenclose='authenclose'></authen>
</div>
</template>
<script>
import Alert from '../../../common/alert'
import authen from '../../../common/authentication'
export default {
	components: {
		Alert,
		authen
	},
	props:[
		'add',
		'entityId',
		'activityId',
		'prizeId',
		'showCloseModal'
	],
	created() {
		this.getAddr(0,0);
		if(this.showCloseModal == 3){
			this.userAddrList()
		}
	},
	data () {
		return {
			addr: null,
			modalMain: true,
			authenShow:false,
//			address,
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
				addressDetail:null,
				consignee:null,
				mobile:null,
				zipCode:null
			},
			myAddress:[],
			changeGoodsDate:null,
			addressId:null,
			i: 0,
			alert: false,
			alertText: ''
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
		hideModalMain() {
			this.hideModal()
		},
		//新增地址
		newAddressTwo(){
			if(this.myAddress.length >= 8){
				this.alert = true;
				this.alertText = "常用地址不能超过8条"
			}else{
				this.$emit("newAddressTwo")
			}
		},
		//关闭弹层
		hideModal() {
	        this.$emit('hideModal');
	   	},
	   	showNum() {
	   		this.$emit("showNum")
	   	},
		provinceChange(){
			this.rendering.city=false;
			this.rendering.cityRender='';
			this.rendering.areaRender='';
			this.rendering.streetRender='';
			this.getAddr(this.rendering.provinceIndex.id,1);
			this.rendering.cityIndex='请选择';
			this.rendering.areaIndex='请选择';
			this.rendering.streetIndex='请选择';
		},
		cityChange(){
			this.rendering.area=false;
			this.getAddr(this.rendering.cityIndex.id,2);
			this.rendering.areaIndex='请选择';
		},
		areaChange(){
			this.rendering.street=false;
			this.getAddr(this.rendering.areaIndex.id,3);
			this.rendering.streetIndex='请选择';
		},
	   	setShowCloseModal (flag) {
	   		if(this.user.mobile==''){
	   			this.alert = true;
	   			this.alertText = '请输入联系电话';
	   			return false
	   		}else if(this.rendering.cityIndex=='请选择' || this.rendering.areaIndex=='请选择' || this.rendering.provinceIndex=='请选择'){
	   			this.alert = true;
	   			this.alertText = '请选择所在街道';
	   			return false
	   		}else if(this.user.addressDetail==''){
	   			this.alert = true;
	   			this.alertText = '请输入详细地址';
	   			return false
	   		}else{
	   			this.showNum();
				this.$CPOST('/account/v1/userInfo/addUserAddress', {
					addressDetail: this.user.addressDetail,	//详细地址
				  	//addressId: this.add,		//地址信息主键 ,
				  	cId: this.rendering.areaIndex.id,			//区ID
				  	city: this.rendering.cityIndex.name,			//市名称
				  	cityId: this.rendering.cityIndex.id,		//市ID
				  	consignee: this.user.consignee,	//收货人
				  	county: this.rendering.areaIndex.name,		//区名称
				  	//isDefault: this.fault,		//是否是默认地址 ,
				  	mobile: this.user.mobile,			//手机号
				  	pId: this.rendering.provinceIndex.id,			//省ID
				  	province: this.rendering.provinceIndex.name,		//省名称
				  	sId: this.rendering.streetIndex.id,			//街道ID
				  	street: this.rendering.streetIndex.name		//街道
		 		},(res) => {
		 			if(res.resultCode==200){
		 				this.$CPOST('/account/v1/userInfo/getUserAddress',{
				 		},(res) => {
				 			this.myAddress=res.resultValue.responses;
				 		})
		 			}
		 		})
	   		}
			
	   },
	   	userAddrList() {
	   		this.$CPOST('/account/v1/userInfo/getUserAddress',{},(res) => {
	 			this.myAddress=res.resultValue.responses;
	 		})
	   	},
		site(i,addressId){
			this.i = i
			this.addressId=addressId;
			this.$CPOST('/account/v1/userInfo/setDefaultAddress', {
				addressId:this.addressId
		 		},(res) => {
	 			this.myAddress.forEach(e=>{
	 				if(e.isDefault===1){
	 					e.isDefault = 0;
	 				}
	 			})
	 			this.myAddress[i].isDefault=1;
	 		})
		},
		confirm(i){
			this.$CPOST('/activity/v1/activity/app/getRewardEntityApp',{
				activityId: this.activityId,
				prizeId: this.prizeId,
				id: this.entityId,
			  	addr: this.myAddress[i].addressDetail,
			  	phone: this.myAddress[i].mobile,
			  	receiveMan: this.myAddress[i].consignee
			},(res)=>{
				if(res.resultCode==200){
					this.getEntity =res.resultValue;
					this.userSeeList();
					this.hideModal();
				}else if(res.resultCode==10126){
					this.modalMain = false;
					this.alert = true;
					this.alertText = res.resultMessages;
				}else if(res.resultCode == 10123){
					this.modalMain = false;
					this.authenShow=true;
				}else if(res.resultCode==10125){
					this.modalMain = false;
	 				this.authenShow=true;
	 			}else{
	 				this.alert = true;
					this.alertText = res.resultMessages;
	 			}
				
			})
	   },
	   userSeeList() {
	   	this.$emit("userSeeList")
	   }
	}
	 
}
</script>

<style>
.shade_layer{width: 100%;height: 100%;background: url(../../../../assets/img/center/masking_03.png);background-size: cover;position: fixed;bottom: 0;left: 0;top: 0;right: 0;z-index: 3;display: table;}
.shade_layer_div{display: table-cell;vertical-align: middle;}
.layer_div{width: 716px;height: 484px;margin: 0 auto;background: #e6e6e6;overflow: hidden;
}
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
.layer_fill_left>div>.fill_left_div>input{width: 100%;height: 100%;outline: none;border: none; color: #323232;}
.layer_fill_right{width: 296px;float: right;}
.layer_fill_right>div>p{line-height: 42px;font-size: 14px;color: #323232;}
.layer_fill_right>div>p>a{color: #fb3642;}
.layer_fill_right>div>.fill_left_div{width: 293px;height: 38px;border: solid 1px #e7e7e7;font-size: 14px;color: #323232;}
.layer_fill_right>div>.fill_left_div>input{width: 100%;height: 100%;outline: none;border: none;color: #323232;}
.detail_fill>p{line-height: 44px;font-size: 14px;color: #323232;}
.detail_fill>p>a{color: #fb3642;}
.detail_fill>textarea{width: 96%;height: 56px;border-radius: 2px;-webkit-border-radius: 2px;-moz-border-radius: 2px;border: solid 1px #e8e8e8;resize: none;outline: none;padding: 6px 11px; color: #323232;}
.detail_submit{line-height: 82px;text-align: center;margin-bottom: 20px;}
.detail_submit>button{width: 140px;height: 40px;border-radius: 2px;background: #fb1829;color:white;border: none;outline: none;font-size: 16px;cursor: pointer;}
.street{position: relative;}
.fill_position{width: 393px;height: 263px;background:white;border: solid 1px #e5e5e5;position: absolute;top: 38px;left: 0;}
.fill_positin_div{width: 369px;height: 253px;margin: 0 auto;padding-top: 10px;}
.position_title{height: 26px;border-bottom: solid 1px #fb1829;position: relative;}
.position_title>ul{display: inline-block;position: absolute;top: 1px;left: 0;}
.position_title>ul>li{float: left;padding: 4.2px 5px;margin-right:10px;border-left: solid 1px #e5e5e5;border-right: solid 1px #e5e5e5;border-top: solid 1px #e5e5e5;border-bottom: solid 1px #fb1829;font-size: 12px;color: #3282ff;cursor: pointer;}
.red_border{border-top:solid 1px #fb1829;border-left:solid 1px #fb1829;border-right:solid 1px #fb1829 ;border-bottom:solid 1px #fff;
}
.tacitly{color: #fb3642 !important;}
.position_content{padding-top: 10px;}
.position_content>ul>li{float: left;width: 25%;line-height: 22px;font-size: 12px;color: #3282ff;cursor: pointer;}
.shade_layer_second{width: 434px;height: 195px;background: #e6e6e6;margin: 0 auto;overflow: hidden;}
.layer_three_div{width: 705px;min-height: 256px;background: white;border: solid 1px #c9c9c9;margin: 0 auto;margin-top: 6px;text-align: center;padding-bottom: 20px;}
.layer_three_div>p{height: 26px;text-align: right;}
.layer_three_div>p>img{cursor: pointer;}
.layer_three_location{height: 34px;font-size: 18px;color: #323232;border-bottom: solid 1px #e4e4e4;margin-bottom: 20px;text-align: left;}
.layer_three_location>a{height: 34px;line-height: 34px;font-size: 16px;color: #55acee;float: right;}
.layer_three_address{width: 630px;margin: 0 auto;}
.layer_three_div>button{width: 140px;height: 40px;border: none;outline: none;background: #fb1829;font-size: 16px;color: white;border-radius: 4px;margin-top: 15px;cursor: pointer;}
.fill_most>select{width: 40%;margin-top: 3px;color: #323232;}
</style>