<template>
    <div class="eventGroup_details">
        <ul class="eventGroup_rule">
            <li>1. 本题材组的题材为预测类型，以未来发生的实际结果为清算依据；</li>
            <li>2. 用户可自由选择买入或者卖出该题材的【Yes】或者【No】合约；</li>
            <li>3. 用户买入【Yes】或者【No】合约后，可选择持有，直到最终清算，以待获利；</li>
            <li>4. 如果预测的事件有发生，【本网站】将在清算该题材时，给每份【Yes】合约支付100未来豆；而每份【No】合约将被清算归0；</li>
            <li>5. 如果预测的事件未发生，【本网站】将在清算该题材时，给每份【No】合约支付100未来豆；而每份【Yes】合约将被清算归0；</li>
            <li>6. 用户也可在题材最终被清算前，通过低价买进，然后择机高价卖出，利用价差获利；</li>
            <li>7. 买入【Yes】后，就不能再买入【No】；若要买入【No】，需要先将手中持仓的买入【Yes】全部成功卖出后才可以转而买入【No】；反之同理；</li>
            <li>8. 先买入【Yes】/【No】后，手中持仓大于0，才能进行卖出动作，即“先买后卖”；</li>
            <li>9. 未来无限网的交易机制为委托交易模式，委托单提交成功后，未成交状态下，用户可取消该委托单；已成交状态下，用户将无法取消该委托单；</li>
            <li>10. 用户在【本网站】的交易货币为“未来豆”，用户交易的盈利为“金豆”；【本网站】也提供 “活动豆”供用户参与活动使用。</li>
        </ul>
        <p>各题材具体规则，请参考各题材下“详情”</p>
        <h4>更多问题，请参见<a href="#">常见问题</a>或者<a href="#">攻略分享</a></h4>
    </div>
</template>

<style scoped>
/***详情****/
.eventGroup_details{width: 1079px;margin: auto;margin-bottom: 26px;}
.eventGroup_details>p{color: #323232;font-size: 14px;line-height: 22px;margin-top: 26px;}
.eventGroup_rule{margin-top: 26px;}
.eventGroup_rule>li{color: #323232;font-size: 14px;line-height: 24px;}
.eventGroup_details>h4{font-size: 14px;font-weight: 500;color: #676767;}
.eventGroup_details>h4>a{color: #3282ff;text-decoration: underline;}    
</style>