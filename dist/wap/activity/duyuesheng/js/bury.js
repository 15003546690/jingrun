(function(){
    var bury = new AppCommon();
    var buryData = {
        clientId:3,
        trackType:1,//埋点类型（ 0-默认 1-活动 2-题材组 3-题材 4-专题）
        trackKey:'duyuesheng',
        trackState:window.location.href,
        eventValue:bury.GetQueryString('activityId'),//埋点事件（值） （根据类型填写活动ID，题材组ID，题材ID， 未定义：undefined）
        userIp:returnCitySN.cip

    }
    bury.$POST('share/v1/track/addTrackLog',buryData,function(data) {

    })
})()