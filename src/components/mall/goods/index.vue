<template>
	<div>
		<div class="right_box1_body">
			<div class="right_box1_body_left">
				<swiper class="index_banner" :options="swiperOption">
					<swiper-slide v-for="item in goodsPic" :key="item.goodsId">
						 <img :src="item.picturesUrl"/>
					</swiper-slide>
					<div class="swiper-pagination index_banner_pagination" slot="pagination"></div>
				</swiper>
			</div>
			<div class="right_box1_body_right">
				<div>{{goodsDetail.goodsName}}</div>
				<p><a>{{goodsDetail.goodsPrice}}</a>
					<img src="../../../assets/img/eventGroup/event_jindou.png"/>
					<i>兑换</i>
				</p>
				<span v-if="goodsDetail.goodsCategoriesType==0">
					<button v-on:click="shopping"></button>
				</span>
				<span v-if="goodsDetail.goodsCategoriesType==1">
					<button v-on:click="shoppong"></button>
				</span>
			</div>
		</div>
		<div class="pic_shopping">
			<div class="pic_shopping_img">
	    	    <img v-for='i in imlist' :src="i.picturesUrl" />
			</div>
		</div>
		<authen v-show='authenShow' @authenclose='authenclose'></authen>
		<Aalert :text='alertText' v-show='alert' @vshow='vshow'/>
	</div>
</template>
<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import authen from '../../common/authentication'
import Aalert from '../../common/alert'
export default {
components: {
    swiper,
    swiperSlide,
    authen,
    Aalert
},
 data(){
 	return{
 		imlist:null,
 		alert:false,
		alertText:null,
 		authenShow:false,
 		goodsDetail:[],
 		goodsPic:[],
 		swiperOption: {
        autoplay: 3000,
        loop: true,
        pagination: '.swiper-pagination',
        QueryUserInfo:null,
      }
 	}
 },
 created(){
 	this.$Bury(window.location.href,'',0,'shangpinxiangqing_04014')
 	this.getParticularsEvent();
 },
 methods:{
 	vshow(){
		this.alert=false;
	},
 	authenclose(){
		this.authenShow=false;
	},
 	GetQueryString (name){
    	var after = window.location.hash.split("?")[1];
      	if(after){
          	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
          	var r = after.match(reg);
         	if(r != null){
             	return  decodeURIComponent(r[2]);
         	}else{
            	return null;
        	}
    	}
 	},
 	getParticularsEvent(){
 		this.$CPOST('/mall/v1/mall/getGoodsDetail',{
 			goodsId: this.GetQueryString('id')
 		},(res)=>{
 			this.getQueryUserInfo();
 			this.goodsDetail = res.resultValue.goodsInfo;
 			this.imlist=res.resultValue.detailPictures;
 			this.goodsPic = res.resultValue.mainPictures;
	        this.goodsId = res.resultValue.goodsInfo.goodsId;
	        this.goodsName = res.resultValue.goodsInfo.goodsName;
	        this.goodsType = res.resultValue.goodsInfo.goodsType;
 		})
 	},
 	getQueryUserInfo() {
		this.$CPOST('/account/v1/userInfo/queryUserInfo',{},(res) => {
			this.QueryUserInfo = res.resultValue;
		})
	},
	//兑换虚拟礼品
 	shopping(){
	     var poice=this.goodsDetail.goodsPrice;
	     var mypoice=this.QueryUserInfo.gold;
	     var goodsCode=this.goodsDetail.goodsCategoriesType;
	     if(mypoice-poice>=0){      
		    this.$CPOST('/mall/v1/mall/exchangeGoods',{
		    	address: '' ,
				goodsId: this.goodsId ,
				goodsName: this.goodsName ,
				goodsType: this.goodsType ,
				mobilePhone: this.mobile,
				realName: this.realname 
		    },(res)=>{
		    	// this.$router.push('../success');
		    	if(res.resultCode==10123 || res.resultCode==10125){
		 			this.authenShow=true;
		 		}else if(res.resultCode==200){
	 				this.$router.push('/mall/success');
	 			}else if(res.resultCode==10126){
	 				this.alert=true;
					this.alertText=res.resultMessages;
	 			}
		    })
        }else{
       		this.$router.push('../error');
     	}
	},
	//兑换实物礼品
 	shoppong(){
 		var poice=this.goodsDetail.goodsPrice;
 		var mypoice=this.QueryUserInfo.gold;
 		var goodsCode=this.goodsDetail.goodsCategoriesType;
 		if(mypoice-poice>=0){
 			this.$router.push({path: '/mall/newincreased', query: {id: this.goodsDetail.goodsId}});
 		}else{
 			this.$router.push('../error');
 		}
 	}
 }
}
</script>
<style scoped>
.right_box1_body{min-height: 305px;width: 100%;display: inline-block;margin-top: 20px;}
.right_box1_body_left,.right_box1_body_right{float: left;}
.right_box1_body_left{width: 488px;height: 284px;border: solid 1px #ddd;}
.right_box1_body_left>img{width: 100%;height: 100%;}
.right_box1_body_right{width: 320px;margin-left: 26px;}
.right_box1_body_right>div{line-height: 30px;color: #45413e;font-size: 20px;}
.right_box1_body_right>p{height: 32px;line-height: 32px;color: #676767;font-size: 16px;}
.right_box1_body_right>p>img{vertical-align: text-top;margin-left: 5px;margin-right: 5px;}
.right_box1_body_right>p>a{color: #eb3030;font-size: 20px;}
.right_box1_body_right>span{width: 140px;height: 36px;background: url(../../../assets/img/shopping/shopping_now.png) no-repeat center;background-size: cover;display: block;margin-top: 30px;border-radius: 2px;-webkit-border-radius: 2px;-moz-border-radius: 2px;}
.right_box1_body_right>span>button{width: 140px;height: 36px;outline: none;border: none;background: none;cursor: pointer;}
.camilo{color: #dd2727 !important;}
/*商品详情*/
.goods_details{height: 365px;background: url(../../../assets/img/shopping/shopping_right_bg.png) no-repeat center;background-size: 100% 100%;margin: 0 auto;}
.pic_shopping{min-height: 200px;background: url(../../../assets/img/shopping/shopping_right_bg.png) no-repeat center;background-size: 100% 100%;width: 100%;margin: 0 auto;overflow: hidden;margin-bottom: 40px;}
.pic_shopping_img{width:960px;margin:0 auto;margin-top: 26px;padding-top: 10px;}
.pic_shopping_img>p{font-size: 16px;line-height: 24px;margin-bottom: 8px;}
.pic_shopping_img>img{width: 100%;height: auto;}
.index_banner_pagination .swiper-pagination-bullet{width: 10px;height: 10px;margin: 0 5px;background: #d2d2d2;display: inline-block;cursor: pointer;border-radius: 50%;-webkit-border-radius: 50%;-moz-border-radius: 50%;}
.index_banner_pagination .swiper-pagination-bullet-active{background: #c60c1b;}
.index_banner{width: 100%;height: 284px;}
.swiper-slide{width: 100%;height: 100%;background-size: cover;cursor: pointer;}
.swiper-slide>img{width: 100%;height: 100%;}
.index_banner_pagination{width: 100%;line-height: 3px;text-align: center;height: 3px;position: absolute;bottom: 20px;}
.banner-next,.banner-prev{width: 20px;height: 100%;line-height: 330px;position: absolute;top: 0;margin-top: 0;}
.banner-next{right: 120px;}
.banner-prev{left: 120px;}
.banner-next>img,.banner-prev>img{vertical-align: middle;width: 20px;height: 35px;cursor: pointer;}
.shide{display: none;}
</style>