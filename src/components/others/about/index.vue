<template>
  <!--关于我们-->
  <div class="about_us">
    <div class="about_kong"></div>
    <div class="about_main">
          <div>关于未来无限网</div>
          <p>未来无限网是北京京润恒远科技有限公司倾力打造的一个专注预测和评鉴的互联网平台，于2017年4月8日正式上线，这同时也标志着预测市场这一互联网平台在大陆市场的开端。
未来无限网面向的服务对象，既包括有预测市场需求的机构用户，也包括对预测市场感兴趣的个人用户。</p>
          <p>未来无限网的宗旨是：「让预测更有价值」</p>
          <p>未来无限网目前拥有Web端、移动端(Android、iOS) 下载APP</p>
    </div>	
    <div class="about_main">
        <div>业务介绍</div>
        <p>未来无限网的业务模式，在欧美，被称为「预测市场」。</p>
        <p>预测市场提供一种仿真市场，让用户根据自己掌握的信息，对未来事件作出预判，在交易过程汇总对预判作出修正，并最终根据实际结果计算奖惩。</p>
        <p>预测市场方法，作为一种聚合群智的预测方法，有完整的理论基础，有坚实的实证研究。作为一种被成功验证的方法，在不同国家被广泛使用，各种权威人士和知名机构纷纷对预测市场的价值给予背书，其中包括5位诺贝尔经济学奖得主。</p>
        <p>在未来无限网，用户通过买卖交易标的－「未来合约」获利，未来合约的内容被称为「话题」，话题可以是一个未来事件，也可以是一个需要达成共识的议题。</p>
        <p>用户可以交易的「未来合约」主要分两类：</p>
        <p>1） 以未来发生结果为清算依据的预测话题；</p>
        <p>2） 以参与用户共识为清算依据的评鉴话题。</p>
        <p>未来无限网提供的预测话题范围广泛，让用户恣意挥洒自己智慧，实现自我价值，获取成就。
同时，在未来无限网，用户也可以参加话题评鉴，甚至有机会参与国家有关机构的重点项目的筛选和评鉴，充分展示自己专业素养和独到判断力，获得更大认可，通过参与评鉴脱颖而出。</p>
    </div>
    <div class="about_main">
          <div>平台价值</div>
          <p>参与国家项目评鉴的用户可以获得：</p>
          <p>参加评鉴将获得劳动报酬；</p>
          <p>优胜者获得专家报酬；</p>
          <p>最优者获撰写报告资格，并获得额外的专家报酬；</p>
          <p>提交的创新项目获得评鉴机会；</p>
          <p>优秀的创新项目获得立项和资金支持。</p>
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
				this.$Bury(window.location.href,'',0,'guanyuwomen_03028')
			}
    }
	}
</script>
<style scoped>
/*关于我们*/
.about_us{width: 1200px;margin: 0 auto;background: #fff;}
.about_main{width: 1079px;margin: 0 auto;margin-bottom: 24px;}
.about_kong{width: 1162px;height: 41px;border-bottom: solid 1px #ededed;margin: 0 auto;margin-bottom: 30px;}
.about_main>div{line-height: 30px;font-size: 14px;color: #323232;text-indent: 2em;font-weight: bold;}
.about_main>p{line-height: 30px;font-size: 14px;color: #323232;text-indent: 2em;}
</style>
