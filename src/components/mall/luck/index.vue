<template>
	<div id='luck'>
		<ul class="uls">
			<li v-for='(i,k) in arr' :class="[idx==k?'bg':'']" :data-id='i.prizeId' class="lis">
				<p class="limg"><img :src="i.prizeImg" alt=""></p>
				<p class="lname">{{i.prizeName}}</p>
			</li>
			<a @click='ckBind && ck()'></a>
		</ul>
		<div class="luck-detail">
			<div class="luck-detail-left"></div>
			<div class="luck-detail-right">
				<div class="detail-right-top"></div>
				<div class="detail-right-bottom">
					<div  id="mooc">   
						<!--  头部结束 -->   
						<!--  中间 -->  
						<div  id="moocBox">  
						    <ul>  
						    	<li v-for='i in luckst'><strong>{{i.mobilePhone}}</strong><i>{{i.prizeName}}</i><span>{{formatDate(i.drawTime)}}</span></li>
						        <!-- <li><a href="#">187****0536</a><i>奖品名称</i><span>2016-3-11</span></li> 
						        <li><a href="#">187****0536</a><i>奖品名称</i><span>2016-3-11</span></li>
						        <li><a href="#">187****0536</a><i>奖品名称</i><span>2016-3-11</span></li> 
						        <li><a href="#">187****0536</a><i>奖品名称</i><span>2016-3-11</span></li>
						        <li><a href="#">187****0536</a><i>奖品名称</i><span>2016-3-11</span></li> 
						        <li><a href="#">187****0536</a><i>奖品名称</i><span>2016-3-11</span></li> -->
						    </ul>  
						</div>  
						<!--  中间结束 -->   
						<!--  底部 -->  
						<div  id ="moocBot"> </div>  
						<!--  底部结束 -->   
					</div>  
				</div>
			</div>
		</div>
		<luckAlert v-if='luckLayer' @vshow='vshow' @continues='continues' :numAlert='numAlert' :luckCheck='luckCheck'></luckAlert>
		<!-- <aaa></aaa> -->
	</div>
</template>
<script>
import luckAlert from './luckAlert'
// import aaa from '../index'
	export default{
		components:{
			luckAlert,
			// aaa
		},
		data(){
			return{
				idx:0,
				ckBind:true,//预防用户在抽奖过程中狂点
				luckId:null,//li渲染ID
				luckCheck:{
					checkedId:null,//中奖ID
					checkedWd:null,//不知道个啥ID
					checkedImg:null,//中奖图片
					checkedName:null,//中奖名字
					isfictitious:null,//是否虚拟(0-金豆；1-未来豆；2-实物；3-虚拟 )
				},
				arr:[],//奖品展示列表
				luckst:[],//中奖名单
				luckLayer:false,
				prceive:[],//是否被领取
				numAlert:0,//弹层判断值(1.未领取奖品;2.未中奖;3.金豆||未来豆||实物||虚拟;4.余额不足;5.领取成功)
			}
		},
		created(){
			this.successLuck()
			this.isReceive();
			this.render();
			this.luckList();
			setTimeout(()=>{
				this.init();
			},2000)
		},
		methods:{
			//
			successLuck(){
				let success=JSON.parse(sessionStorage.getItem("successluck"));
				if(success!=null){
					this.luckLayer=true;
					this.numAlert=5;
				}
			},
			getQueryUserInfo() {
				this.$CPOST('/account/v1/userInfo/queryUserInfo',{},(res) => {
					$('.clear-pointer').text(res.resultValue.gold)
				})
			},
			continues(){
				sessionStorage.removeItem('successluck');
				this.luckLayer=false;
				this.ck();
			},
			vshow(){
				sessionStorage.removeItem('successluck');
				this.luckLayer=false;
			},
			formatDate (timestamp) {
				return this.$dateFormat(timestamp, 'yyyy/mm/dd HH:MM')
			},
			// 一进页面请求接口，是否有未领取的奖品
			isReceive(){
				this.$CPOST('/mall/v1/draw/queryUnreceivedPrize',{
		 		},(res) => {
		 			if(res.resultValue.length>=1){
		 				this.prceive=res.resultValue[0];
		 				sessionStorage.setItem("luck", JSON.stringify(this.prceive));
			 			this.luckCheck.checkedName=res.resultValue[0].prizeName;
			 			this.luckCheck.checkedImg=res.resultValue[0].prizeImg;
			 			this.luckCheck.isfictitious=res.resultValue[0].type;
			 			this.luckCheck.checkedWd=res.resultValue[0].winId;
			 			this.luckCheck.checkedId=res.resultValue[0].prizeId;
			 			sessionStorage.setItem("luck", JSON.stringify(this.luckCheck));
		 				this.luckLayer=true;
		 				this.numAlert=1;
		 			}
		 		})
			},
			//渲染中奖名单
			luckList(){
				this.$CPOST('/mall/v1/draw/getPrizeWinners',{
		 		},(res) => {
		 			this.luckst=res.resultValue;
		 		})
			},
			// 渲染抽奖列表
			render(){
				this.$CPOST('/mall/v1/draw/queryPrizeList',{
		 		},(res) => {
		 			this.arr=res.resultValue;
		 		})
			},
			//获取中奖ID
			luck(){
				this.$CPOST('/mall/v1/draw/luckDraw',{
		 		},(res) => {
		 			if(res.resultCode==200){
		 				this.luckCheck.checkedId=res.resultValue.prizeId;
		 				this.luckCheck.checkedImg=res.resultValue.prizeImg;
		 				this.luckCheck.checkedName=res.resultValue.prizeName;
		 				this.luckCheck.isfictitious=res.resultValue.type;
		 				this.luckCheck.checkedWd=res.resultValue.winId;
		 				sessionStorage.setItem("luck", JSON.stringify(this.luckCheck));
		 				console.log(this.luckCheck.checkedWd)
		 			}else{
		 				this.luckLayer=true;
		 				this.numAlert=4;
		 			}
		 			
		 		})
			},
			//点击抽奖
			ck(){
				this.getQueryUserInfo();
				this.luck();
				console.log(this.numAlert)
				if(this.numAlert!=4){
				// if(this.numAlert!=0 && this.numAlert!=4){
					this.ckBind=false;
					let that=this,
					lis=document.querySelectorAll('.luck ul li'),
					zz=setInterval(function(){
						that.idx++;
						if(that.idx==4){
							that.idx=5
						}else if(that.idx==6){
							that.idx=9
						}else if(that.idx==10){
							that.idx=8
						}else if(that.idx==9){
							that.idx=7
						}else if(that.idx==8){
							that.idx=6
						}else if(that.idx==7){
							that.idx=4
						}else if(that.idx==5){
							that.idx=0
						}
						setTimeout(()=>{
							for(var i=0;i<lis.length;i++){
								if(lis[i].getAttribute("class")=='lis bg'){
									that.luckId=lis[i].getAttribute("data-id")
							   　}
							}
							if(that.luckId==that.luckCheck.checkedId){
								clearInterval(zz)
								that.ckBind=true;
								for(var i=0;i<lis.length;i++){
									if(lis[i].getAttribute("class")=='lis bg'){
										// alert(lis[i].getAttribute("data-id"))
										
								   　}
								}
							}
						},3000)
					},100)
					setTimeout(()=>{
						if(that.luckCheck.checkedName=='继续努力'){
							that.numAlert=2;
							that.luckLayer=true;
						}else if(that.luckCheck.isfictitious==0 || that.luckCheck.isfictitious==1 || that.luckCheck.isfictitious==2 || that.luckCheck.isfictitious==3){
							that.numAlert=3;
							that.luckLayer=true;
						}
					},4000)
				}
			},
			// 新闻滚动
			init(){
				var area = document.getElementById('moocBox');
				var iliHeight = 24;//单行滚动的高度  
				var speed = 50;//滚动的速度  
				var time;  
				var delay= 1000;  
				area.scrollTop=0;  
				if(this.luckst.length>6){
					area.innerHTML+=area.innerHTML;//克隆一份一样的内容 
				}
				function startScroll(){  
				    time=setInterval(()=>{
				    	if(area.scrollTop % iliHeight==0){  
					        clearInterval(time);  
					        setTimeout(startScroll,delay);  
					    }else{  
					        area.scrollTop++;  
					        if(area.scrollTop >= area.scrollHeight/2){  
					            area.scrollTop =0;  
					        }  
					    } 
				    },speed);  
				    area.scrollTop++;  
				}   
				setTimeout(startScroll,delay)  
			}   
		}
	}
</script>
<style scoped='scoped'>
	#luck{
		width: 970px;
		height: 800px;
		background: url(../../../assets/img/luck/luck_back.png);
		margin-top: 10px;
		overflow: hidden;
	}
	.uls{
		width: 735px;
		height: 380px;
		margin: auto;
		margin-top: 135px;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		position: relative;
	}
	.lis{
		width: 146px;
		height: 114px;
		background: #ffdaa5;
		text-align: center;
		line-height: 120px;
		margin-left: 30px;
		margin-bottom: 20px;
		border-radius: 4px;
		border:solid 3px #df2a40;
	}
	.uls>li:nth-child(6){
		margin-left: 400px;
	}
	.lname{
		width: 100%;
		height: 36px;
		line-height: 36px;
		text-align: center;
		color: #b20d0d;
	}
	.limg{
		width: 115px;
		height: 66px;
		overflow: hidden;
		margin-left: 15px;
		margin-top: 10px;
	}
	.limg img{
		width: 100%;
	}
	.uls>a{
		width: 289px;
		height: 111px;
		display: inline-block;
		background: url(../../../assets/img/luck/luck_click.png);
		position: absolute;
		top: 144px;
    	left: 239px;
    	cursor: pointer;
	}
	.uls>a:active{
		width: 289px;
		height: 111px;
		display: inline-block;
		background: url(../../../assets/img/luck/luck-click-other.png);
		position: absolute;
		top: 144px;
    	left: 239px;
    	cursor: pointer;
	}
	.ck{
		width: 500px;
		height: 180px;
		background: #ff4400;
		cursor: pointer;
	}
	.bg{
		background: #ffc32a;
	} 
	.luck-detail{
		width: 690px;
		height: 200px;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		margin-left: 100px;
		margin-left: 157px;
    	margin-top: 35px;
	}
	.luck-detail-left{
		width: 257px;
		height: 193px;
		background: url(../../../assets/img/luck/detail_left.png);
	}
	.luck-detail-right{
		width: 396px;
		height: 193px;
	}
	.detail-right-top{
		width: 100%;
		height: 53px;
		background: url(../../../assets/img/luck/detail_right.png);
	}
	a:hover {  
    color: #ff0000;  
}  
#mooc {  
    width: 394px;  
    /*border: 1px solid #ababab;  */
    /* -moz-border-radius: 15px;      Gecko browsers  
     -webkit-border-radius: 15px;   Webkit browsers  
     border-radius: 15px;  
     box-shadow: 2px 2px 10px #ababab;  
     margin: 50px auto 0;  */ 
    text-align: left;               /* 让新闻内容靠左 */  
}  
/*  头部样式 */   
#moocTitle {  
    height: 62px;  
    overflow: hidden;  /* 这个一定要加上，内容超出的部分要隐藏，免得撑高头部 */  
    font-size: 26px;  
    line-height: 62px;  
    padding-left: 30px;  
    background-image: -moz-linear-gradient(top, #f05e6f, #c9394a); /* Firefox */  
    background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, #f05e6f), color-stop(1, #c9394a)); /* Saf4+, Chrome */  
filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#8fa1ff', endColorstr='#f05e6f', GradientType='0'); /* IE*/  
    border: 1px solid ##f05e6f;  
    -moz-border-radius: 8px 8px 0 0;      /* Gecko browsers */  
    -webkit-border-radius: 8px 8px 0 0;   /* Webkit browsers */  
    border-radius: 8px 8px 0 0;  
    color: #fff;  
    position: relative;  
}  
#moocTitle a {  
    position: absolute;  
    right: 10px;  
    bottom: 10px;  
    display: inline;  
    color: #fff;  
    font-size: 12px;  
    line-height: 24px;  
}  
/*  底部样式 */  
#moocBot {  
    width: 399px;  
    height: 10px;  
    overflow: hidden;     /* 这个一定要加上，内容超出的部分要隐藏，免得撑高底部结构 */  
}  
/*  中间样式 */  
#moocBox {  
    height: 143px;   /*修改高度可以更改显示条数*/  
    width: 100%;  
    /*margin-left: 25px;  */
   /* margin-top: 10px;*/  
    overflow: hidden;    /*  这个一定要加，超出的内容部分要隐藏，免得撑高中间部分 */  
}  
#mooc ul li {  
    height: 24px;  
}  
#mooc ul li strong {  
	font-weight: normal;
    width: 132px;  
    float: left;  
    display: block;  
    overflow: hidden;  
    /*text-indent: 15px;  */
    height: 24px;  
    line-height: 24px;
    text-align: center;
    background: #ffe2b8;
    border-right: 2px solid #fff;
    color: #b20d0d;
} 
#mooc ul li i{
	display: inline-block;
	width: 128px;
	background: #ffe2b8;
	border-right: 2px solid #fff;
	height: 24px;
	line-height: 24px;
	text-align: center;
	color: #b20d0d;
} 
#mooc ul li span {  
	display: inline-block;
	height: 24px;  
	width: 130px;
    float: right;  
    color: #999;  
    overflow: hidden;
    background: #ffe2b8;
    text-align: center;
    color: #b20d0d;
    line-height: 24px;
} 
</style>