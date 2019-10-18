<template>
  <swiper class="index_banner" :options="swiperOption">
    <swiper-slide >
    	  <img v-for="item in goodsDetail.mainPictures" v-lazy="item.picturesUrl" :key="item.goodsId"/>
    </swiper-slide>
    <div class="swiper-pagination index_banner_pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'hello',
  components: {
    swiper,
    swiperSlide
  },
  data () {
    return {
    	goodsDetail:[],
      swiperOption: {
        autoplay: 3000,
        loop: true,
        pagination: '.swiper-pagination',
        paginationClickable: true,
        prevButton: '.swiper-button-prev',
        nextButton: '.swiper-button-next'
      }
    }
  }
}
</script>
<style scoped>
.index_banner_pagination .swiper-pagination-bullet{width: 10px;height: 10px;margin: 0 5px;background: #d2d2d2;display: inline-block;cursor: pointer;border-radius: 50%;-webkit-border-radius: 50%;-moz-border-radius: 50%;}
.index_banner_pagination .swiper-pagination-bullet-active{background: #c60c1b;}
.index_banner{width: 100%;height: 284px;}
.swiper-slide{width: 100%;height: 100%;background-size: cover;cursor: pointer;}
.index_banner_pagination{width: 100%;line-height: 3px;text-align: center;height: 3px;position: absolute;bottom: 20px;}
.banner-next,.banner-prev{width: 20px;height: 100%;line-height: 330px;position: absolute;top: 0;margin-top: 0;}
.swiper-slide>img{width: 100%;height: 100%;}
.banner-next{right: 120px;}
.banner-prev{left: 120px;}
.banner-next>img,.banner-prev>img{vertical-align: middle;width: 20px;height: 35px;cursor: pointer;}
</style>
