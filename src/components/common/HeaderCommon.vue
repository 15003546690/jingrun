<template>
	<div class="HeaderCommon" :class="colorStyle">
		<!--图片标识-->
		<div class="HeaderPic">
			<img src="../../assets/img/city_pic.jpg" v-if="colorStyle!='red'"/>
			<img src="../../assets/img/yuce_img.jpg" v-if="colorStyle=='red'"/>
		</div>
		<div class="HeaderList">
			<div class="HeaderList_left">
				<span>频道分类：</span>
				<ul>
				   <li>
				   	<div :class="navNumOne == 'all' ? 'active' : ''"><a href="javascript:;" class="blue_color" @click='lis' >全部</a></div>
				   </li>
				   <li v-for="item,index in menuList">
				   	<div :class="navNumOne == item.classifyId ? 'active' : ''">
				   		<a href="javascript:;" class="blue_color"  @click="childPNext(item.classifyId)">
				   			{{item.classifyName}}
				   			<img src="../../assets/img/center/groudy_down.png" v-if="item.list.length"/>
				   			<img src="../../assets/img/center/write_up.png" v-if="item.list.length"/>
				   		</a>
				   		
				   		<div class="blue_hover" v-if="item.list.length">
				   			<ul>
				   			<li v-for="item2 in item.list" class="subLi"><a href="javascript:;" :data-id='item2.classifyId' :class="navNum == item2.classifyId ? 'active' : ''" @click="childPNextSub(item2.classifyId,item.classifyId)">{{item2.classifyName}}</a></li>
				   			</ul>
				   		</div>
				   	</div>
				   </li>	
				   
				</ul>
			</div>
			<div class="HeaderList_right">
 				    <a>筛选：</a>
				    <div>{{curSelect}}
				    	<img src="../../assets/img/center/down_arrow.png"/>
				    	<img src="../../assets/img/center/down_arrow.png"/>
				    <ul class="HeaderList_right_ul">
				    	<li v-for="item,index in eventList">
				    		<router-link :to="item.to" tag="a" @click.native="screenCur(index,item.name)">{{item.name}}</router-link>
				    	</li>
					</ul></div>
					
			</div>
		</div>
	</div>
</template>
<script type="x/template">
export default {
	props: [
		'menuList'
	],
  data () {
    return {
	  cur:0,
	  navNum:'',
	  navNumOne:'all',//一级菜单状态
	  colorStyle:'red',//整体样式
	  curSelect:'全部话题',//默认名称
	  path:this.$route.path.indexOf('predict') > -1 ? '/predict/' : '/criticism/',
	  classify:this.$route.params.classify,
	  shaiTo:'',
      eventList:[],
    }
  },
  created(){
  	this.styleInit();
  	this.navNumOne = this.getCookie('navNumOne') == null ? 'all' : this.getCookie('navNumOne');
  },
  methods:{
  	styleInit(){
  		var color = this.$route.path.indexOf('predict') > -1 ? 'red' : 'blue';
  		// alert()
  		if(this.colorStyle != color || this.$route.params.classify == 'all'){
  			this.navNumOne = 'all';
  			this.setCookie('navNumOne','all')
  		}
  		this.colorStyle = color;
  		this.navNum = this.$route.params.classify;
  		this.path=this.$route.path.indexOf('predict') > -1 ? '/predict/' : '/criticism/';
  		this.shaiTo = this.path+this.navNum;
  		this.eventList = [
  		   {
	      	to:this.shaiTo + '/4',
	      	name:'全部话题'
	      },{
	      	to:this.shaiTo + '/0',
	      	name:'最新话题'
	      },{
	      	to:this.shaiTo + '/1',
	      	name:'临期话题'
	      },{
	      	to:this.shaiTo + '/2',
	      	name:'热门话题'
	      },{
	      	to:this.shaiTo + '/3',
	      	name:'已结束话题'
	      }]
  		// alert(this.colorStyle)
  		// [3].dataset.id
  	},
  	navInit(){
  		this.$CPOST('/v1/eventClassify/queryEventClassifyPc',{},(res) =>{
          this.menuList = res.resultValue.list;
      })
  	},
  	screenCur(index,name){
  		// this.cur = index;
  		this.curSelect = name;
  	},
	setCookie(name,value) { 
	    var Days = 30; 
	    var exp = new Date(); 
	        exp.setTime(exp.getTime() + Days*24*60*60*1000); 
	    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString(); 
	},
	getCookie(name) {
	    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	    if(arr=document.cookie.match(reg))
	        return unescape(arr[2]); 
	    else
	        return null; 
	},
  	lis(){//全部
  		this.navNumOne = 'all';
      	this.setCookie('navNumOne','all')
      var type = this.$route.query.type;
      if(type == undefined){
        if(this.$route.path.indexOf('predict') < 0){
          this.$router.push({path:'/criticism/'})
        }else{
          this.$router.push({path:'/predict/'})
        }
      }else{
        if(type==0){
          this.$router.push({path:'/criticism'})
        }else{
          this.$router.push({path:'/predict'})
        }
      }
    },
    childPNext(navNumOne){
    	// this.$Bury(window.location.href,navNumOne,0,'pindaofenlei');
      var type = this.$route.query.type;
      if(navNumOne!=undefined){
      	this.navNumOne = navNumOne;
      	this.setCookie('navNumOne',navNumOne)
      }
      if(type == undefined){
        if(this.$route.path.indexOf('predict') < 0){
          this.$Bury(window.location.href,navNumOne,0,'pingjianpindaofenleiye_03002');
          this.$router.push({path:'/criticism/' + navNumOne})
        }else{
          this.$Bury(window.location.href,navNumOne,0,'yucepindaofenleiye_03001');
          this.$router.push({path:'/predict/' + navNumOne})
        }
      }else{
        if(type == 0){
          this.$Bury(window.location.href,navNumOne,0,'pingjianpindaofenleiye_03002');
          this.$router.push({path:'/criticism/' + navNumOne})
        }else{
        	this.$Bury(window.location.href,navNumOne,0,'yucepindaofenleiye_03001');
          this.$router.push({path:'/predict/' + navNumOne})
        }
      }
    },
    childPNextSub(navNum,navNumOne){
      var type = this.$route.query.type;
      if(navNumOne!=undefined){
      	this.navNumOne = navNumOne;
      	this.setCookie('navNumOne',navNumOne)
      }
      if(type == undefined){
        if(this.$route.path.indexOf('predict') < 0){
          this.$Bury(window.location.href,navNum,0,'pingjianpindaofenleiye_03002');
          this.$router.push({path:'/criticism/' + navNum})
        }else{
        	this.$Bury(window.location.href,navNum,0,'yucepindaofenleiye_03001');
          this.$router.push({path:'/predict/' + navNum})
        }
      }else{
        if(type == 0){
          this.$Bury(window.location.href,navNum,0,'pingjianpindaofenleiye_03002');
          this.$router.push({path:'/criticism/' + navNum})
        }else{
        	this.$Bury(window.location.href,navNum,0,'yucepindaofenleiye_03001');
          this.$router.push({path:'/predict/' + navNum})
        }
      }
    },
  },
  watch:{
  	$route(){
	  this.styleInit();
	}
  }
}
</script>
<style scoped>
	.HeaderCommon{
		width: 1200px;
		margin: 0 auto;
		padding-top: 30px;
		position: relative;
		z-index: 1000;
	}
	.HeaderPic{
		height: 120px;
		background: blue;
		margin-bottom: 14px;
		border-radius: 8px;
		background: #fff;
	}
	.HeaderPic>img{
		width: 100%;
		height: 100%;
		border-radius: 8px;
	}
	.HeaderList{
		width: 100%;
		display: inline-block;
	}
	.HeaderList_left{
		width: 990px;
		height: 22px;
		float: left;
		color: #444;
		font-size: 16px;
		margin-top: 6px;
	}
	.HeaderList_left>span{
		display: block;
		float: left;
		
	}
	.HeaderList_left>ul{
		display: inline-block;
		margin-left: 18px;
	}
	.HeaderList_left>ul>li{
		width: 102px;
		height: 22px;
		float: left;
		text-align: center;
		cursor: pointer;
		background: url(../../assets/img/ground_reay.png) no-repeat left;
	}
	.mallList{
		float: right;
		margin-top: -34px;
	}
	.HeaderList_left>ul>li>div{
		width: 80px;
        height: 22px;
        line-height: 22px;
        display: block;
        
        position: relative;
        margin: 0 auto;
        
	}
	.HeaderList_left .blue_color{color: #444; display: block; text-align: center;border-radius: 10px;height: 22px;}
	.HeaderList_left .blue_color:hover,.HeaderList_left .active .blue_color{
		background: #4867aa;
        color: white ;
	}
	.HeaderList_left>ul>li>div:hover.blue_color a{color:#fff;}
	.red .HeaderList_left .blue_color:hover,.red .HeaderList_left .active .blue_color{
		background: #c60c1a;
        color: white ;
	}
	.HeaderList_left li img{
		display: inline-block;
		vertical-align: middle; margin-left: 5px;
	}
	.HeaderList_left li img+img{
		display: none;
	}
	.HeaderList_left .blue_color:hover>img,.HeaderList_left div.active img{
	  display: none;
	}
	.HeaderList_left .blue_color:hover>img+img,.HeaderList_left div.active img+img{
	  display: inline;
	}
	.blue_hover{
		width: 132px;
	    /*min-height:132px;*/
	    background: red;
	    position: absolute;
	    top: 22px;
	    left: -22px;
	    background: url(../../assets/img/select_bglist.png) no-repeat center;
	    background-size: 100% 100%;
	    display: none;
	}
	.blue_hover>ul{
		margin-top: 30px;
		padding-bottom: 10px;
	}
	.blue_hover>ul>li{
		line-height: 20px;
		text-align: center;
	}
	.blue_hover>ul>li a{font-size: 14px; display: inline-block; color: #444; margin:5px 0; border-bottom:solid 2px transparent;}
	.blue_hover>ul>li>a:hover,.blue_hover>ul>li>a.active{
		color: #4867aa;
		border-bottom:solid 2px #4867aa;
	}
	.red .blue_hover>ul>li>a:hover,.red .blue_hover>ul>li>a.active{
		color: #c60d1b;
		border-bottom:solid 2px #c60d1b;
	}
	/*.HeaderList_left>ul>li>div:hover.blue_hover{
		display: block;
	}*/
	.HeaderList_left>ul>li>div:hover .blue_hover{
		display: block;
	}
	.HeaderList_right{
		width: 194px;
		float: right;
		font-size: 16px;
		color: #444444;
		position: relative;
	}
	.HeaderList_right>a{
		line-height: 34px;
		float: left;
	}
	.HeaderList_right>div{
		width: 140px;
		height: 34px;
		line-height: 34px;
		cursor: pointer;
		/*background: #b1b1b1;*/
		border:solid 1px #888;
		display: block;
		float: right;
		font-size: 16px;
		color: white;
		text-align: center;
		border-radius: 3px;
		color: #333;
	}
	.HeaderList_right>div>img{
		display: inline;
		vertical-align: middle;
	}
	.HeaderList_right>div>img+img{
		display: none;
	}
	.HeaderList_right>div:hover>img{
	  display: none;
	}
	.HeaderList_right>div:hover>img+img{
	  display: inline;
	}
	.HeaderList_right_ul{
		width: 140px;
		position: absolute;
		top:34px;
		right: 0;
		-moz-box-shadow:0px 0px 5px #969696;/*firefox*/  
		-webkit-box-shadow:0px 0px 5px #969696;/*webkit*/  
		box-shadow:0px 0px 5px #969696;/*opera或ie9*/  
		display: none;
	}
	.HeaderList_right>div:hover .HeaderList_right_ul{
		display: block;
	}
	.HeaderList_right_ul>li{
		line-height: 40px;
		text-align: center;
		font-size: 16px;
		cursor: pointer;
		background: white;
	}
	.HeaderList_right_ul>li>a{display: block; line-height: 40px;color: #888;}
	.HeaderList_right_ul>li a:hover,.HeaderList_right_ul>li a.router-link-active{
		background: #e3e3e3;
	}
	
</style>