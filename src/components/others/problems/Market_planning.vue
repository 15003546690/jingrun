<template>
    <div class="planning">
                  <div class="strategy_content">
                  <div>1.什么是公开市场、封闭市场、专属市场？</div>
                  <p>1)公开市场：所有用户均可参与交易的市场。</p>
                  <p>2)封闭市场：仅对特定用户开放交易的市场，封闭市场会根据需求设置参与级别、权限等门槛，使一部分符合条件的用户参与。</p>
                  <p>3)专属市场：专为大型企业或者机构用户开设的市场，一般仅限该企业或者机构用户、内部人士、或邀请的对象，才可以进入。</p>
                </div>
                <div class="strategy_content">
                  <div>2.什么是「预测」？</div>
                  <p>在未来无限网，用户对即将发生事件的结果进行预判，称之为预测。</p>
                  <p>未来无限网会以实际发生结果为清算依据进行清算，并计算用户的盈亏以及盈亏额度。</p>
                </div>
                <div class="strategy_content">
                  <div>3.什么是「评鉴」？</div>
                  <p>在未来无限网，用户通过交易对特定题材形成共识的行为，即为评鉴。评鉴题材没有实际发生的结果。未来无限网会以市场形成的共识为清算依据进行清算，并计算用户的盈亏以及盈亏额度。</p>
                </div>
                <div class="strategy_content">
                  <div>4.什么是「申购」？</div>
                  <p>用户通过交易买入的方式在众多话题中选出更有价值的话题选项，即为申购。</p>
                  <p>在申购阶段，为体现公平公正，每个话题选项的价格相同，可认购的数量有限。申购阶段结束后，将根据认购数量进行排名，使更有价值的话题进入评鉴阶段。</p>
                  <p>若用户所认购的话题进入到评鉴阶段，会自动获得该话题的持仓。用户可以继续买入卖出、或等待清算。</p>
                </div>
                <div class="strategy_content">
                  <div>5.什么是「活动」？</div>
                  <p>未来无限网的活动有两大类型：</p>
                  <p>1）运营类活动：平台通过组织运营、线上或线下与用户互动交流，增加用户活跃度而举办的一种活动。</p>
                  <p>2）话题类活动：平台会把一些可交易的话题组织成活动的方式呈现给用户参与；活动结束时会按照用户参与话题交易获利的排名进行奖励。</p>
                  <p>3）有些活动参与没有门槛，有些则需要一些条件才可进入。</p>
                  <p>条件主要分为：免邀请免收费活动、免邀请需收费活动、需邀请免收费活动、需邀请需收费活动。</p>
                  <p>4）活动或话题结束后，超过一定时间将不会在页面上显示，用户可以在个人中心的交易明细中查询</p>
                </div>
                <div class="strategy_content">
                  <div>6.话题和活动会提前作废吗？</div>
                  <p>当遭遇不可抗力因素时，未来无限网有权对该话题或活动进行作废处理。</p>
                </div>
                </div>

</template>
<script>
export default {
  created(){
  	this.$Bury(window.location.href,'',0,'shichangguize_03023')
  }
}
</script>
<style>
/*市场规划*/
.planning{width: 1028px;margin: 0 auto;}
.strategy_content{margin-bottom: 40px;}
.strategy_content>div{line-height: 31px;font-size: 16px;font-weight: bold;color: #323232;}
.strategy_content>p{line-height: 30px;font-size: 16px;color: #323232;}
</style>

