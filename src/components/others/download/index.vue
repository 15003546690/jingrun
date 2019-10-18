<template>
  <!--下载APP-->
  <div class="download">
    <div class="download_content">
      <button class="button1"></button><br />
      <button class="button2"></button>
    </div>
  </div>
</template>
<script>
	export default{
		created() {
    	this.addTrackLog();
    },
    methods: {
    	//埋点
			addTrackLog() {
				this.$Bury(window.location.href,'',0,'xiazaiApp_03033')
			}
    }
	}
</script>
<style scoped>
/*APP下载*/
.download{height: 782px;background:url(../../../assets/img/APP_02.png) no-repeat center;background-size: cover;}
.download_content{width: 1200px;height: 782px;margin: 0 auto;}
.button1{width: 269px;height: 66px;margin-top: 364px;margin-left: 222px;border-radius: 36px;outline: none;border: none;background: none;cursor: pointer;}
.button2{width: 269px;height: 66px;margin-top: 10px;margin-left: 222px;border-radius: 36px;outline: none;border: none;background: none;cursor: pointer;}
</style>
