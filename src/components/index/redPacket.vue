<template>
<div class="red_paper">
    <div class="red_paper_div">
	    <!--老用户-->
	    <div class="red_paper_pic hide">
	        <p><button class="red_paper_button1 red_paper_close"></button></p>
	        <div><button class="red_paper_button2 red_paper_show_guide"></button></div>
	    </div>
     	<!--新手任务完成领取红包-->
    	<div class="red_paper_new hide">
		    <div class="red_paper_main">
		        <p><button class="red_paper_but1 red_paper_close"></button></p>
		        <div><button class="red_paper_but2 red_paper_receive"></button></div>
		        <a class="red_paper_account"></a>
		    </div> 
     	</div>
      	<!--未登录提示 -->
	    <div class="red_paper_solid">
	        <p><button class="red_paper_button1 red_paper_close" @click="hideRed"></button></p>
	        <div><button class="red_paper_button2 red_paper_to_register" @click="getPacket"></button></div>
	    </div>
   
   		<!--完成新手任务 -->
   		<div class="red_paper_most hide">
		    <div class="red_paper_list">
		        <p><button class="red_paper_butmot1 red_paper_close"></button></p>
		        <div><button class="red_paper_butmot2 red_paper_show_guide"></button></div>
		    </div> 
     	</div>
     </div>
</div>
</template>

<script>
export default{
	methods:{
		hideRed() {
			this.$emit('hideRed')
		},
		getPacket() {
			
		}
	}
}
</script>

<style scoped>
*{
	padding: 0;
	margin: 0;
}
.red_paper {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url(../../assets/img/redPacket/red_packet_bg.png) no-repeat;
    background-size: 100% 100%;
    z-index: 100;
    display: table;
}
.red_paper_div {
    vertical-align: middle;
    display: table-cell;
}
.red_paper_pic {
    width: 290px;
    height: 366px;
    margin: 0 auto;
    background: url(../../assets/img/redPacket/old_user.png) no-repeat center;
    background-size: 100% 100%;
}
.red_paper_pic>p {
    line-height: 38px;
    text-align: right;
}
.red_paper_pic>p .red_paper_button1 {
    width: 14px;
    height: 14px;
    background: none;
    margin-right: 12px;
    border: none;
    outline: none;
    cursor: pointer;
}
.red_paper_pic>div {
    line-height: 85px;
    text-align: center;
    margin-top: 183px;
}
.red_paper_pic>div .red_paper_button2 {
    width: 86px;
    height: 86px;
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
}
.red_paper_new {
    width: 290px;
    height: 366px;
    margin: 0 auto;
    background: url(../../assets/img/redPacket/new_user.png) no-repeat center;
    background-size: 100% 100%;
}
.red_paper_main {
    text-align: center;
}
.red_paper_main>p {
    line-height: 38px;
    text-align: right;
}
.red_paper_main>p .red_paper_but1 {
    width: 14px;
    height: 14px;
    background: none;
    margin-right: 17px;
    border: none;
    outline: none;
    cursor: pointer;
}
.red_paper_main>div {
    line-height: 38px;
    text-align: center;
    margin-top: 216px;
}
.red_paper_main>div .red_paper_but2 {
    width: 230px;
    height: 38px;
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
    display: block;
    margin: 0 auto;
}
.red_paper_main>a {
    width: 95px;
    height: 18px;
    cursor: pointer;
    margin: 0 auto;
    display: inline-block;
    margin-top: 10px;
}
.red_paper_solid {
    width: 290px;
    height: 366px;
    margin: 0 auto;
    background: url(../../assets/img/redPacket/new_zhuanxiang_03.png) no-repeat center;
    background-size: 100% 100%;
}
.red_paper_solid>p {
    line-height: 38px;
    text-align: right;
}
.red_paper_solid>p .red_paper_button1 {
    width: 14px;
    height: 14px;
    background: none;
    margin-right: 12px;
    border: none;
    outline: none;
    cursor: pointer;
}
.red_paper_solid>div {
    line-height: 85px;
    text-align: center;
    margin-top: 183px;
}
.red_paper_solid>div .red_paper_button2 {
    width: 86px;
    height: 86px;
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
    border-radius: 50%;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
}
.red_paper_most {
    width: 290px;
    height: 366px;
    margin: 0 auto;
    background: url(../../assets/img/redPacket/new_lin_03.png) no-repeat center;
    background-size: 100% 100%;
}
.red_paper_list {
    text-align: center;
}
.red_paper_list>p {
    line-height: 38px;
    text-align: right;
}
.red_paper_list>p .red_paper_butmot1 {
    width: 14px;
    height: 14px;
    background: none;
    margin-right: 12px;
    border: none;
    outline: none;
    cursor: pointer;
}
.red_paper_list>div {
    line-height: 38px;
    text-align: center;
    margin-top: 226px;
}
.red_paper_list>div .red_paper_butmot2 {
    width: 206px;
    height: 38px;
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
    display: block;
    margin: 0 auto;
}
</style>