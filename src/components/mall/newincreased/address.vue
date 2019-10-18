<template>
	<div class="shade_layer">
			<div class="shade_layer_div">
				<div class="shade_layer_second" v-show="showCloseModal==1">
			    	<div class="layer_second_one">
			    		<div><a>提示</a><img @click="hideModal" src="../../../assets/img/close2.png"/></div>
			    		<p>请输入您的收货地址</p>
			    		<button @click="setShowCloseModal(2)">新增地址</button>
			    	</div>
			    </div>
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
							    	<input type="text" name="" id="" value="" v-model="username"/>
							    </div>
							</div>
							<div class="">
								<p>邮编</p>
							     <div class="fill_left_div">
							    	<input type="text" name="" id="" value="" v-model="youbian"/>
							    </div>
							</div>
						</div>
						<div class="layer_fill_right">
							<div class="">
								<p><a>*</a>联系电话</p>
							    <div class="fill_left_div">
							    	<input type="text" name="" id="" value="" v-model="tel"/>
							    </div>
							</div>
							<div class="fill_most">
								<p><a>*</a>所在街道</p>
							    <select id="province" v-on:change="provinceChange()"></select>	
								<select id="city" v-on:change="cityChange()"></select>	
								<select id="area" v-on:change="areaChange()"></select>	
								<select id="street" v-on:change="streetChange()"></select>	
							</div>
						</div>
					</div>
					    <div class="detail_fill">
					    	<p><a>*</a>详细地址</p>
					    	<textarea v-model="xilive"></textarea>
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
		    			收获地址<a @click="setShowCloseModal(2)">新增地址</a>
		    		</div>
		    		    <div class="layer_site" v-for="item in myAddress">
							<p>{{item.consignee}}</p>
							<span>{{item.mobile}}</span>
							<span>{{item.addressDetail}}</span>
						</div>
		    		</div>
		    		
		    	</div>
		    	<!--<button @click="confirm()">确认领取vbuhhsfdvbgjhsbd</button>-->
		    </div>
			</div>
		</div>	
</template>
<script>
import address from './address'
export default {
	
	data () {
		return {
			address,
			options,
			token:null,
			username:null,
			tel:null,
			youbian:null,
			live:null,
			xilive:null,
			myDate:[],
			showCloseModal: 1,
			areaValue:null,
			cityValue:null,
			provinceValue:null,
			areaCode:null,
			cityCode:null,
			provinceCode:null,
			myAddress:[],
			index:null,
			value:null,
			text:null,
			indare:null,
			valare:null,
			textare:null,
			indstr:null,
			valstr:null,
			textstr:null,
			indlive:null,
			vallive:null,
			textlive:null,
			changeGoodsDate:[]
		}
	},
	created () {
      	this.token=JSON.parse(sessionStorage.getItem('token')).token				
      	this.loginToken=JSON.parse(sessionStorage.getItem('loginToken')).loginToken
	    
	},
	mounted(){
		var province = document.getElementById('province');
		var city = document.getElementById('city');
		var areas = document.getElementById('area');
		var street = document.getElementById('street');
		var provinceOpts = '';
		var cityOpts = '';
		var areaOpts = '';
		var streetOpts = '';
		console.log(this.address[0])
		for(var key in this.address[0]){
			provinceOpts+='<option value="'+this.address[0][key].id+'">'+this.address[0][key].name+'</option>';
		}
		for(var key in this.address[0][110000].children){
			cityOpts+='<option value="'+this.address[0][110000].children[key].id+'">'+this.address[0][110000].children[key].name+'</option>';
		}
		for(var key in this.address[0][110000].children[110100].children){
			areaOpts+='<option value="'+this.address[0][110000].children[110100].children[key].id+'">'+this.address[0][110000].children[110100].children[key].name+'</option>';
		}
		for(var key in this.address[0][110000].children[110100].children[110101].children){
			streetOpts+='<option value="'+this.address[0][110000].children[110100].children[110101].children[key].id+'">'+this.address[0][110000].children[110100].children[110101].children[key].name+'</option>';
		}
		province.innerHTML = provinceOpts;
		city.innerHTML = cityOpts;
		areas.innerHTML = areaOpts;
		street.innerHTML = streetOpts;
	},
	methods:{
		hideModal () {
			
			this.showCloseModal = 1
	        this.$emit('hideModal')
	   },
		provinceChange(){
			var city = document.getElementById('city');
			this.index = province.selectedIndex; // 选中索引
			this.value = province.options[this.index].value; // 省Id
			this.text = province.options[this.index].text;	 // 省名称
			var cityOpts='';
			for(var key in this.address[0][this.value].children){
				cityOpts+='<option value="'+this.address[0][this.value].children[key].id+'">'+this.address[0][this.value].children[key].name+'</option>';
			}
			city.innerHTML = cityOpts;
			this.cityChange()
			
		},
		cityChange(){
			var areas = document.getElementById('area');
			this.indare = city.selectedIndex; // 选中索引
			this.valare = city.options[this.indare].value; 		// 市Id
			this.textare = city.options[this.indare].text; 	// 市名称
			var areaOpts = '';
			for(var key in this.address[0][this.value].children[this.valare].children){
				areaOpts+='<option value="'+this.address[0][this.value].children[this.valare].children[key].id+'">'+this.address[0][this.value].children[this.valare].children[key].name+'</option>';
			}
			areas.innerHTML = areaOpts;
			this.areaChange()
		},
		areaChange(){
			var areas = document.getElementById('area');
			var street = document.getElementById('street');
			this.indstr = areas.selectedIndex;
			this.valstr = areas.options[this.indstr].value; // 县Id
			this.textstr = areas.options[this.indstr].text;	// 县名称
			var streetOpts = '';
			for(var key in this.address[0][this.value].children[this.valare].children[this.valstr].children){
				streetOpts+='<option value="'+this.address[0][this.value].children[this.valare].children[this.valstr].children[key].id+'">'+this.address[0][this.value].children[this.valare].children[this.valstr].children[key].name+'</option>';
			}
			street.innerHTML = streetOpts;
			this.streetChange()
		},
		streetChange(){
			var street = document.getElementById('street');
			this.indlive = street.selectedIndex;
			this.vallive = street.options[this.indlive].value; // 街道Id
			this.textlive = street.options[this.indlive].text; // 街道名称
		},
	   	setShowCloseModal (flag) {
	   		this.showCloseModal = flag
			this.$axios.post('/account/v1/userInfo/updateUserAddress' + this.$signParam(), {
				addressDetail: this.xilive,	//详细地址
			  	addressId: '',		//地址信息主键 ,
			  	cId: this.valstr,			//区ID
			  	city: this.textare,			//市名称
			  	cityId: this.valare,		//市ID
			  	consignee: this.username,	//收货人
			  	county: this.textstr,		//区名称
			  	isDefault: "",				//是否是默认地址 ,
			  	mobile: this.tel,			//手机号
			  	pId: this.value,			//省ID
			  	province: this.text,		//省名称
			  	sId: this.vallive,			//街道ID
			  	street: this.textlive		//街道
	 		},{
				headers:{
					Authorization:this.loginToken
				}
			})
	 		.then(res => {
	 			const data =res.data
	 			//this.changeGoodsDate = data.resultValue
	 			this.$axios.post('/account/v1/userInfo/getUserAddress' + this.$signParam(), {
		 		},{
					headers:{
						Authorization:this.loginToken
					}
				})
		 		.then(res => {
		 			const data =res.data
		 			this.myAddress=data.resultValue.responses
		 		})
		 		.catch(err => {
		 			const data = err.response.data
		 			alert(data.status)
		 		})
	 		})
	 		.catch(err => {
	 			const data = err.response.data
	 			alert(data.status)
	 		})
	   	},
	   	confirm(){
	   		//alert(123)
	   		this.$axios.post('/mall/v1/mall/exchangeGoodsData' + this.$signParam(), {
					goodsId: this.$route.query.id
				},{
				headers:{
					Authorization:this.loginToken
				}
			}).then(res => {
				const data = res.data
				this.changeGoodsDate = data.resultValue
				this.goodsId = data.resultValue.goodsId
				this.$axios.post('/mall/v1/mall/exchangeGoods' + this.$signParam(), {
					address : this.changeGoodsDate.userAddressList[0].address,
					goodsId : this.changeGoodsDate.goodsId ,
					goodsName : this.changeGoodsDate.goodsName ,
					goodsType : this.changeGoodsDate.goodsCategoriesType,
					mobilePhone : this.changeGoodsDate.userAddressList[0].mobilePhone,
					realName : this.changeGoodsDate.userAddressList[0].realName,
			 		},{
						headers:{
							Authorization:this.loginToken
					}
				})
			 	.then(res => {
		 			const data =res.data
		 			if(res.data.resultMessages=="SUCCESS"){
		 				this.$router.push('/mall/success')
		 			}else{
		 				this.$router.push('/mall/error')
		 			}
		 		}).catch(err => {
			 		const data = err.response.data
			 		alert(data.status)
			 	})
			})
			.catch(err => {
				const data = err.response.data
				alert(data.status)
			})
	   	}
	}
	 
}
</script>

<style>
.shade_layer{
	width: 100%;
	height: 100%;
	background: url(../../../assets/img/center/masking_03.png);
	background-size: cover;
	position: fixed;
	bottom: 0;
	left: 0;
	top: 0;
	right: 0;
	z-index: 3;
	display: table;
}
.shade_layer_div{
	display: table-cell;
	vertical-align: middle;
}
.layer_div{
	width: 716px;
	height: 484px;
    margin: 0 auto;
    background: #e6e6e6;
    overflow: hidden;
}
.div_content{
	width: 700px;
	height: 472px;
	border: solid 1px #c9c9c9;
	background: white;
	margin: 0 auto;
	margin-top: 6px;
	position: relative;
}
.div_content_img{
	position: absolute;
	top: 0;
	right: 0;
	cursor: pointer;
}
.layer_div_content{
	margin: 0 auto;
	width: 633px;
	padding-top: 24px;
}
.layer_content{
	line-height: 30px;
	font-size: 18px;
	color: #323232;
}
.layer_attention{
	height: 41px;
	border-bottom: solid 1px #e4e4e4;
	margin-bottom: 20px;
}
.layer_attention>p{
	float: left;
	line-height: 28px;
	font-size: 14px;
	color: #a4a4a4;
}
.layer_attention>p>a{
	color: #fb3642;
}
.layer_attention>a{
	float: right;
	line-height: 28px;
	font-size: 16px;
	color: #55acee;
}
.layer_site{
	height: 30px;
	margin-bottom: 10px;
	cursor: pointer;
}
.layer_site_on{
	border: solid 2px #e52735;
    position: relative;
}
.layer_site>p{
	width: 90px;
    height: 30px;
    line-height: 30px;
    margin-left: 10px;
    float: left;
    font-size: 14px;
    color: #676767;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    text-align: left;
}
.layer_site>span{
	height: 30px;
	line-height: 30px;
	float: left;
	display: block;
	font-size: 14px;
	color: #676767;
	margin-left: 20px;
}
.layer_site>img{
	position: absolute;
	bottom: 0;
	right: 0;
}
.layer_site>div{
	height: 30px;
	line-height: 30px;
	float: right;
	font-size: 14px;
	color: #55acee;
}
.layer_site>div>a{
	margin-right: 10px;
}
.layer_fill{
	height: 164px;
	margin-top: 7px;
}
.layer_fill_left{
	width: 296px;
	float: left;
}
.layer_fill_left>div>p{
	line-height: 42px;
	font-size: 14px;
	color: #323232;
}
.layer_fill_left>div>.fill_left_div{
	width: 293px;
	height: 38px;
	border: solid 1px #e7e7e7;
	font-size: 14px;
	color: #323232;
}
.layer_fill_left>div>.fill_left_div>input{
	width: 100%;
	height: 100%;
	outline: none;
	border: none;
	}
.layer_fill_right{
	width: 296px;
	float: right;
}
.layer_fill_right>div>p{
	line-height: 42px;
	font-size: 14px;
	color: #323232;
}
.layer_fill_right>div>p>a{
	color: #fb3642;
}
.layer_fill_right>div>.fill_left_div{
	width: 293px;
	height: 38px;
	border: solid 1px #e7e7e7;
	font-size: 14px;
	color: #323232;
}
.layer_fill_right>div>.fill_left_div>input{
	width: 100%;
	height: 100%;
	outline: none;
	border: none;
	}
.detail_fill{
	
}
.detail_fill>p{
	line-height: 44px;
	font-size: 14px;
	color: #323232;
}
.detail_fill>p>a{
	color: #fb3642;
}
.detail_fill>textarea{
	width: 96%;
	height: 56px;
	border-radius: 2px;
	-webkit-border-radius: 2px;
	-moz-border-radius: 2px;
	border: solid 1px #e8e8e8;
    resize: none;
    outline: none;
    padding: 6px 11px;
}
.detail_submit{
	line-height: 82px;
	text-align: center;
	margin-bottom: 20px;
}
.detail_submit>button{
	width: 140px;
	height: 40px;
	border-radius: 2px;
	background: #fb1829;
	color:white;
	border: none;
	outline: none;
	font-size: 16px;
	cursor: pointer;
}
.street{
	position: relative;
}
.fill_position{
	width: 393px;
	height: 263px;
	background:white;
	border: solid 1px #e5e5e5;
	position: absolute;
	top: 38px;
	left: 0;
}
.fill_positin_div{
	width: 369px;
	height: 253px;
	margin: 0 auto;
	padding-top: 10px;
}
.position_title{
	height: 26px;
	border-bottom: solid 1px #fb1829;
	position: relative;
}
.position_title>ul{
	display: inline-block;
	position: absolute;
	top: 1px;
	left: 0;
}
.position_title>ul>li{
	float: left;
	padding: 4.2px 5px;
	margin-right:10px;
	border-left: solid 1px #e5e5e5;
	border-right: solid 1px #e5e5e5;
	border-top: solid 1px #e5e5e5;
	border-bottom: solid 1px #fb1829;
	font-size: 12px;
	color: #3282ff;
	cursor: pointer;
}
.red_border{
	border-top:solid 1px #fb1829 !important;
	border-left:solid 1px #fb1829 !important;
	border-right:solid 1px #fb1829 !important;
	border-bottom:solid 1px #ffffff !important;
}
.tacitly{
	color: #fb3642 !important;
}
.position_content{
	padding-top: 10px;
}
.position_content>ul>li{
	float: left;
	width: 25%;
	line-height: 22px;
	font-size: 12px;
	color: #3282ff;
    cursor: pointer;
}


.shade_layer_second{
	width: 434px;
	height: 195px;
	background: #e6e6e6;
	margin: 0 auto;
	overflow: hidden;
}
.layer_second_one{
	width: 422px;
	height: 183px;
	background: white;
	margin: 0 auto;
	margin-top: 5px;
	border: solid 1px #c9c9c9;
	text-align: center;
}
.layer_second_one>div{
	height: 24px;
	text-align: left;
	font-size: 14px;
	color: #323232;
	
}
.layer_second_one>div>a{
	height: 16px;
	margin-top: 10px;
	margin-left: 12px;
	display: inline-block;
}
.layer_second_one>div>img{
	float: right;
	cursor: pointer;
}
.layer_second_one>p{
	line-height: 18px;
	text-align: center;
	font-size: 16px;
	color: #323232;
	margin-top: 42px;
}
.layer_second_one>button{
	width: 100px;
	height: 33px;
	border-radius: 2px;
	background: #f00d0e;
	font-size: 14px;
	color: white;
	border: none;
	outline: none;
	margin: 0 auto;
	margin-top: 36px;
	cursor: pointer;
}

.shade_layer_three{
	width: 715px;
	min-height: 268px;
	background: #e6e6e6;
	margin: 0 auto;
	overflow: hidden;
	padding-bottom: 6px;
}
.layer_three_div{
	width: 705px;
	min-height: 256px;
	background: white;
	border: solid 1px #c9c9c9;
	margin: 0 auto;
	margin-top: 6px;
	text-align: center;
	padding-bottom: 20px;
}
.layer_three_div>p{
	height: 26px;
	text-align: right;
}
.layer_three_div>p>img{
	cursor: pointer;
}
.layer_three_location{
	height: 34px;
	font-size: 18px;
	color: #323232;
	border-bottom: solid 1px #e4e4e4;
	margin-bottom: 20px;
	text-align: left;
}
.layer_three_location>a{
	height: 34px;
	line-height: 34px;
	font-size: 16px;
	color: #55acee;
	float: right;
}
.layer_three_address{
	width: 630px;
	margin: 0 auto;
}
.layer_three_div>button{
	width: 140px;
	height: 40px;
	border: none;
	outline: none;
	background: #fb1829;
	font-size: 16px;
	color: white;
	border-radius: 4px;
	margin-top: 15px;
	cursor: pointer;
}
</style>