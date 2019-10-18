<template>
	<div>
		<div class="shopping_select">
			<ul>
				<li>
					<router-link to="/mall/list" tag="a" exact>全部奖品兑换</router-link>
				</li>
				<li>
					<router-link to="/mall/list/virtual" tag="a">虚拟奖品兑换</router-link>
				</li>
				<li>
					<router-link to="/mall/list/entity" tag="a">实物奖品兑换</router-link>
				</li>
				<!-- <li>
					<router-link to="/mall/list/luck" tag="a">幸运大抽奖</router-link>
				</li> -->
			</ul>
			<div class="shopping-goods-select-box" v-if='!luck'>
				<span>商品筛选：</span>
				<select v-model="selected" @change='getCommodityEvent'>
					<option>全部</option>
					<option>10,000金豆以下</option>
					<option>10,000~50,000金豆</option>
					<option>50,000金豆以上</option>
				</select>
				<span class="selespan">{{selected}}</span>
			</div>
		</div>
		<div class="luck">
			<Luck v-if='luck'></Luck>
		</div>
		<div class="the_goods" v-if='!luck'>
			<ul>
				<Goods v-for="item in goodsList" :key="item.goodsId" :goodsList="item"/>
			</ul>
		</div>
		<div class="paging" v-if='!luck'>
	  		<el-pagination
		      	@size-change = "handleSizeChange"
		      	@current-change = "handleCurrentChange"
		      	:current-page = "currentPage"
		      	:page-size = 1
		      	layout = "prev, pager, next, jumper"
		      	:total = "totalPage">
		    </el-pagination>
	  	</div>
	</div>
</template>
<script>
import Goods from './Goods'
import Luck from '../luck'
export default {
components: {
	Goods,
	Luck
},
 data(){
 	return{
 		luck:false,
 		selected:'全部',
 		goldBeanScope:'',
 		goodsList:[],
 		currentPage: 1,
 		totalPage: 0
 	}
 },
 watch: {
    '$route' () {
      if(this.$route.path=='/mall/list/luck'){
      	this.luck=true;
      }else{
      	this.luck=false;
      }
      if(this.$route.path.indexOf('virtual')>-1){
      	this.$Bury(window.location.href,'',0,'xunijiangpinduihuan_03014')
      	this.currentPage = 1
        this.getCommodityEvent();
      }else if(this.$route.path.indexOf('entity')>-1){
      	this.$Bury(window.location.href,'',0,'shiwujiangpinduihuan_03015')
      	this.currentPage = 1
        this.getCommodityEvent();
      }else{
      	this.$Bury(window.location.href,'',0,'lipinshangchengshouye_02010')
      	this.currentPage = 1
        this.getCommodityEvent();
      }
    }
 },
 created () {
 	if(this.$route.path=='/mall/list/luck'){
      	this.luck=true;
      }else{
      	this.luck=false;
      }
 	setTimeout(()=>{
		this.getCommodityEvent()
	},50)
   },
 methods:{
 	getCommodityEvent(){
 		if(this.selected=='全部'){
 			this.goldBeanScope=0;
 		}else if(this.selected=='10,000金豆以下'){
 			this.goldBeanScope=1;
 		}else if(this.selected=='10,000~50,000金豆'){
 			this.goldBeanScope=2;
 		}else if(this.selected=='50,000金豆以上'){
 			this.goldBeanScope=3;
 		}
 		this.$CPOST('/mall/v1/mall/getGoodsList',{
 			size:8,
 			page:this.currentPage-1,
 			goldBeanScope:this.goldBeanScope,
 			goodsCategoriesType:this.$route.path.indexOf('virtual') > -1 ? 0 : this.$route.path.indexOf('entity') > -1 ? 1 : 2
 		},(res) => {
 			this.goodsList = res.resultValue.goodsList
			this.totalPage = Math.ceil(res.resultValue.totalElements/8)
 		})
 	},
 	handleSizeChange(val) {
		this.pagesize = val;
        this.getCommodityEvent();
    },
    handleCurrentChange(val) {
		this.currentPage = val;
		this.getCommodityEvent();
    }
 }
}
</script>
<style scoped>
.el-pagination{text-align: center;}
.shopping_select {height: 38px;line-height: 38px;border: solid 1px #e8e8e8;background: #f5f5f5;}
.shopping_select>ul {float: left;margin-left: 15px;}
.shopping_select>ul>li {float: left;font-size: 14px;color: #444;margin: 0 15px;cursor: pointer;}
.shopping_select>ul>li>a{color: #444;}
.shopping_select>ul>li>a.router-link-active{color: #e73535;}
.shopping_select>ul>li>a:hover{color: #e73535;}
.shopping-goods-select-box {width: 235px;height: 30px;line-height: 30px;float: right;position: relative;margin-top: 4px;font-size: 0;}
.shopping-goods-select-box>span {width: 80px;height: 30px;display: inline-block;color: #000;font-size: 14px;line-height: 30px;text-align: center;vertical-align: middle;float: left;}
.shopping-goods-select-box>select{height: 26px;border: 1px solid #e6e6e6;margin-top: 2px;float: left;outline: none;color: #444;}
.shopping-goods-select-input {width: 106px;height: 20px;line-height: 20px;border: 0;color: #000;font-size: 14px;padding-left: 10px;outline: none;cursor: pointer;background: url(../../../assets/img/shopping/sanjiao_black.png) no-repeat right;background-position-x: 100px;border: 1px solid #a9a9a9;display: inline-block;vertical-align: middle;}
.shopping-goods-select-option {width: 116px;border: 1px solid #9aa1b3;background: #fff;position: absolute;right: 2px;top: 28px;z-index: 1;font-size: 12px;border-top: none;display: none;color: #000;}
.shopping-goods-select-option>li {height: 30px;line-height: 30px;font-size: 14px;padding-left: 10px;cursor: pointer;}
.shopping-goods-select-option>li:hover {background: #dd2726;color: #fff;}
.the_goods {display: inline-block;margin: auto;margin-top: 20px;}
.the_goods>ul {display: inline-block;width: 980px;height: 524px;margin-left: -20px;}
.selespan{display: none !important;}
</style>