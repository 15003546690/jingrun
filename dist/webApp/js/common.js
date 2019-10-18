(function (doc, win) {    
    var docEl = doc.documentElement,    
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',    
    recalc = function () {    
            var clientWidth = docEl.clientWidth;    
            if (!clientWidth) return;    
            docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';    
        };    
    if (!doc.addEventListener) return;    
    win.addEventListener(resizeEvt, recalc, false);    
    recalc();    
})(document, window);
function Car(){
    this.prize = 100
}
Car.protoType.prize = 1000;
Car.protoType.say=function(){
    console.log(this.prize);
}
var aodi = new Car;
aodi.prize = 101;
aodi.say();