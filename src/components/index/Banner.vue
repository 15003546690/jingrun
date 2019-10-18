<template>
	<div>
  <swiper class="index_banner" :options="swiperOption"  v-for='i in bannerList'>
    <swiper-slide :style="{backgroundImage: 'url(' + i.img+ ')'}">fdfdsfs
    	<!--<div class="aa" :style="{backgroundImage: 'url(' + i.img+ ')'}"></div>-->
    </swiper-slide>
    <div class="swiper-pagination index_banner_pagination" slot="pagination"></div>
    <div class="swiper-button-next banner-next" slot="button-next"></div>
    <div class="swiper-button-prev banner-prev" slot="button-prev"></div>
  </swiper>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

export default {
  name: 'hello',
  components: {
    swiper,
    swiperSlide
  },
  data () {
    return {
      swiperOption: {
        autoplay: 3000,
        loop: true,
        pagination: '.swiper-pagination',
        paginationClickable: true,
        prevButton: '.swiper-button-prev',
        nextButton: '.swiper-button-next',
        bannerList:[],
        token:''
      }
    }
  },
  created(){
  	this.token=JSON.parse(sessionStorage.getItem('token')).token
  	this.getRecommendEvent()
  },
  methods:{
  	getRecommendEvent () {
      this.$axios.post('/event/v1/homeRecommend/queryPCHomeRecommend' + this.$signParam(),
			{					
        homeEventType: 2,
        page:0,
        size: 5
      },{
				headers:{
					Authorization:this.token
				}
			})
      .then(res => {
      	console.log(res.data)
        this.bannerList = res.data.resultValue.bannerList
        console.log(this.bannerList)
      })
      .catch(err => {
				//alert('失败')
        const data = err.response.data
      })
    },
  }
}
</script>

<style>
.index_banner_pagination .swiper-pagination-bullet{
  width: 24px;
  height: 3px;
  margin: 0 5px;
  background: #d2d2d2;
  display: inline-block;
  cursor: pointer;
}
.index_banner_pagination .swiper-pagination-bullet-active{
  background: #c60c1b;
}
</style>

<style scoped>
.index_banner{
  width: 100%;
  height: 330px;
}
.swiper-slide{
  width: 100%;
  height: 100%;
  /*background: url(../../assets/img/index_banner.png) no-repeat center;*/
  background-size: cover;
  cursor: pointer;
}
.index_banner_pagination{
  width: 100%;
  line-height: 3px;
  text-align: center;
  height: 3px;
  position: absolute;
  bottom: 20px;
}
.banner-next,.banner-prev{
  width: 20px;
  height: 100%;
  line-height: 330px;
  position: absolute;
  top: 0;
  margin-top: 0;
}
.banner-next{
  right: 120px;
  background: url(../../assets/img/index_banner_right.png) no-repeat center;
}
.banner-prev{
  left: 120px;
  background: url(../../assets/img/index_banner_left.png) no-repeat center;
}
.banner-next>img,.banner-prev>img{
  vertical-align: middle;
  width: 20px;
  height: 35px;
  cursor: pointer;
}
</style>
