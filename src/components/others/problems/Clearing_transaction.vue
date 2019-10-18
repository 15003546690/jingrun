<template>
    <div class="transaction" >
                  <div class="strategy_content">
                  <div>1.预测清算规则</div>
                  <p>预测玩法是以话题发生结果为清算依据。</p>
                  <p>a.如果预测的事件发生，持有【Yes】的用户获利（获利=100-买入价），持有【No】的用户亏损（全部成本）；</p>
                  <p>b.如果预测的事件未发生，持有【No】的用户获利（获利=100-买入价）；持有【Yes】的用户亏损（全部成本）；</p>
                  <p>用户可根据价格动向，通过低买高卖来赚差价。</p>
                </div>
                <div class="strategy_content">
                  <div>2.评鉴清算规则</div>
                  <p>评鉴玩法是以大众看法和观点为清算依据。</p>
                  <p>a.买入【Yes】的清算公式：盈亏=清算价-买入价，若结果大于0则获利金豆；反之会亏损未来豆；</p>
                  <p>b.买入【No】的清算公式：盈亏=100-清算价-买入价，若结果大于0则获利金豆，反之会亏损未来豆；</p>
                  <p>清算价取决于加权平均价。</p>
                  <p>用户可根据价格动向，通过低买高卖来赚差价。</p>
                </div>
                </div>
</template>
<script>
export default {
  created(){
  	this.$Bury(window.location.href,'',0,'jiaoyiqingsuan_03024')
  }
}
</script>
<style>
/*交易清算*/
.transaction{width: 1028px;margin: 0 auto;}
.strategy_content{margin-bottom: 40px;}
.strategy_content>div{line-height: 31px;font-size: 16px;font-weight: bold;color: #323232;}
.strategy_content>p{line-height: 30px;font-size: 16px;color: #323232;}
</style>

