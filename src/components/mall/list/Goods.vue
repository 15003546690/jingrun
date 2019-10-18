<template>
  <li>
    <div class="shoppingli_img">
      <p><img :src="goodsList.goodsPicture"></p>
      <img v-if="goodsList.goodsStatus==2" class="replenishment" src="../../../assets/img/shopping/replenishment.png">
    </div>
    <div class="shopping_bottom">
      <div class="shopping_list_li">
        <p class="shoppingli_img_title">{{goodsList.goodsName}}</p>
        <p class="shoppingli_img_title">{{goodsList.goodsPrice}}<img src="../../../assets/img/eventGroup/event_jindou.png" /></p>
      </div>
      <div class="the_goods_button">
      	<span :class="goodsList.goodsStatus==2 ? 'button1' : 'hide'">
        	<button>兑换</button>
        </span>
        <span :class="goodsList.goodsStatus==0 ? 'button2' : 'hide'">
        	<router-link :to="{path:'../../mall/goods/', query: {id: goodsList.goodsId}}" tag="button">兑换</router-link>
        </span>
      </div>
    </div>
  </li>
</template>
<script>

export default {
		props: [ 
			'goodsList'
	  ]
	}
</script>
<style scoped>
.the_goods>ul>li{float: left;width: 223px;height: 240px;margin-left: 20px;margin-bottom: 20px;border: solid 1px #ebebeb;}
.shoppingli_img{width: 208px;height: 120px;line-height: 120px;margin: 0 auto;margin-top: 10px;border-bottom: dashed 1px #ebebeb;text-align: center;position: relative;}
.shoppingli_img>p{width: 100%;height: 100%;margin: 0 auto;}
.shoppingli_img>p>img{width:100%;height: 100%;}
.shopping_goods_img{cursor: pointer;}
.shopping_bottom{height: 109px;background: #f7f7f7;}
.shopping_list_li{width: 210px;height:60px;margin: auto;overflow: hidden;}
.shoppingli_img_title{margin-top: 8px;font-size: 14px;text-align: center;color: #000;line-height: 16px;}
.shoppingli_img_title img{vertical-align: middle;margin-left: 10px;}
.the_goods_button{height: 40px;text-align: center;}
.the_goods_button>span.button1{width: 176px;height: 28px;display: block;margin: 0 auto;background: url(../../../assets/img/shopping/duihuan_gr.png) no-repeat center;background-size: cover;z-index: 1;}
.replenishment {position: absolute;top: -6px;left: 0;}
.the_goods_button>span.button1>button{width: 176px;height: 28px;outline: none;border: none;background: none;font-size: 14px;color: #fff;}
.the_goods_button>span.button2{width: 176px;height: 44px;display: block;margin: 0 auto;background: url(../../../assets/img/shopping/duihuan_re.png) no-repeat center;background-size: cover;z-index: 2;}
.the_goods_button>span.button2>button{width: 100%;height: 28px;outline: none;border: none;font-size: 14px;color: #fff;background: none;cursor: pointer;}
</style>
