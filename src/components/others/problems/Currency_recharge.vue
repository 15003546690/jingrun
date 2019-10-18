<template>
   <div class="currency" >
                  <div class="strategy_content">
                  <div>1.如何获得未来豆？</div>
                  <p>1)用户可以通过签到、完成任务、参与活动等方式获得未来豆；</p>
                  <p>2)用户可以通过充值的方式获得未来豆，1人民币=100未来豆；</p>
                  <p>3)用户也可以用手中的金豆兑换未来豆，1金豆=1未来豆。</p>
                  <p>4)充值支付成功后，未来豆若未到账，请及时联系客服，并保留好电子支付凭证；</p>
                  <p>5)客服电话：400-691-9939；</p>
                  <p>6)客服邮箱：service@kinrank.com。</p>
                </div>
                <div class="strategy_content">
                  <div>2.怎么得到金豆，金豆有什么用？</div>
                  <p>1） 参与预测话题、评鉴话题交易并获利；</p>
                  <p>2） 参与活动获得活动奖励；</p>
                  <p>3） 用户不能通过充值的方式获得金豆；</p>
                  <p>4） 金豆不能兑换现金，但可以兑换未来无限网的礼品；</p>
                  <p>5） 在未来无限网参与部分特殊活动时，可能会需要用金豆支付门票。</p>
                </div>
                <div class="strategy_content">
                  <div>3.无限豆是如何分配的？</div>
                  <p>1)用户成功进入话题活动后，系统会按照活动预先配置，自动分配给用户一定限额的无限豆；</p>
                  <p>2)无限豆余额会分配并绑定到该活动的所有话题下，不能在其他地方使用，也不能进行充值获取；</p>
                  <p>3)用户在活动中所盈利的无限豆将作为活动排名的依据。</p>
                </div>
                <div class="strategy_content">
                  <div>4.如何充值？</div>
                  <p>1)用户可以在个人中心点击‘充值’进入充值页面，或者在买入话题提交时，若余额不足，也会弹出前往充值的选项；</p>
                  <p>2)在充值页面下，可点击未来豆数量快捷购买，也可以点击自定义购买，输入任意未来豆数量，并按照相对应的金额支付；</p>
                  <p>3)在话题页面提交下单时，若余额不足，会提示前往充值；</p>
                  <p>4)支付方式有支付宝、微信支付、金豆支付；</p>
                  <p>5)【未来豆】仅限在【未来无限网】使用，且不能兑换现金。充值【未来豆】不适用无理由退货规定。</p>
                </div>
                </div>
</template>
<script>
export default {
  created(){
  	this.$Bury(window.location.href,'',0,'huobichongzhi_03026')
  }
}
</script>
<style>
/*货币充值*/
.currency{width: 1028px;margin: 0 auto;}
.strategy_content{margin-bottom: 40px;}
.strategy_content>div{line-height: 31px;font-size: 16px;font-weight: bold;color: #323232;}
.strategy_content>p{line-height: 30px;font-size: 16px;color: #323232;}
</style>

