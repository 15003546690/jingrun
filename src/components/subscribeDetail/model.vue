<template>
	<!--弹层-->
     	<div class="announcement cement conmit" v-show="showindex">
					<div class="report">
						<div class="report_main">
							<div class="To_report">
								<div class="To_report_title">
									<span>提示</span>
									<a class="conmit_img"><img  @click="hideindex" src="../../assets/img/eventGroup/event_close.png"></a>
								</div>
								<div class="To_report_body conmit_body">
									<P>下单数量不能超过下单最大份数</p>
									<P>下单数量不能小于或者等于零</p>
								</div>
							</div>
						</div>
					</div>	
				</div>
</template>

<script>
export default {

}
</script>
<style scoped>

/*弹层*/
.report{width: 100%;height: 100%;position: fixed;top: 0;left: 0;right: 0;bottom: 0;background: url(../../assets/img/eventGroup/zhezhao.png) no-repeat center;background-size: 100%;z-index: 5;display: table;}
.report_main{display: table-cell;vertical-align: middle;}
.To_report{width:318px;background: white;margin: 0 auto;vertical-align: middle;text-align: center;overflow: hidden;}
.To_report_title{height: 35px;line-height: 35px;background: #f3f3f3;}
.To_report_title span{float: left;font-size: 14px;color: #676767;margin-left: 20px;}
.To_report_title a{float: right;margin-right: 10px;}
.To_report_body{min-height: 73px;margin-top: 20px;}
.To_report_body ul li{float: left;width: 50%;height: 36px;line-height: 36px;text-align: left;font-size: 14px;color: #676767;}
.To_report_body ul li input{margin-left: 25px;margin-right: 7px;cursor: pointer;}
.sub_mit{height: 30px;margin-top: 28px;text-align: center;margin-bottom: 12px;cursor: pointer;}
.To_report .textarea{width: 288px;height: 80px;margin: 0 auto;display: none;position: relative;}
.To_report .textarea textarea{width: 288px;height: 80px;line-height: 30px;resize:none;text-indent:5px;border:solid 1px #e0e0e0;}
.To_report .textarea span{height: 30px;line-height: 30px;position: absolute;bottom: -5px;right:10px;font-size: 14px;color: #a9a9a9;}
.textarea_main{display: block;}
.comment_login_btn{cursor: pointer;}
.To_view{height:46px;line-height:46px;font-size:14px;color:#5e5e5e;text-align:center;margin-bottom: 8px;}
.Leave_message{min-height:104px;}
.Leave_message_in{width:1100px;min-height:104px;float:right;margin-right:8px;}
.Leave_message_in textarea{width:100%;min-height:60px;border-radius:2px;-webkit-border-radius:2px;-moz-border-radius:2px;resize:none;outline: none;overflow-y:hidden;text-indent: 26px;font-size: 16px;border:solid 1px #d3d3d3;line-height: 18px;padding: 5px 0px;}
.check_in_click{ width:100%;height:82px;line-height:82px;text-align:center;font-size:16px;color:#333;}
.check_in_click a{cursor: pointer;	}
.Leave_message_button span{margin-right:0 !important;}
/*弹层*/
.conmit_img{float: right;margin-right: 0 !important;margin-top: 6px;}
.conmit_body{padding-bottom: 30px;}
.conmit_body p{font-size: 14px;color: #676767;line-height: 30px !important;}

</style>