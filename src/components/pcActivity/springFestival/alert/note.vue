<template>
	<div class="record">
		<div class="record_body">
			<div class="record_body_main">
		        <!--提名记录-->
		        <div class="Nomination_name">
		        	<div class="Nomination_name_body">
		        		<div class="Nomination_name_center">
		        		<p class="name_center"><img src="../../../../../src/components/pcActivity/springFestival/img/Record.png"/></p>
		        	    <div class="name_record" v-for="item in list">
		        	    	<p class="name_record_p">{{item.title}}</p>
		        	    	<p>{{formatDate(item.createTime)}}</p>
		        	    	<p>{{item.content}}</p>
		        	    	<div class="name_record_div">
		        	    		<img v-if="item.status == 1" src="../../../../components/pcActivity/springFestival/img/Notthrough.png"/>
		        	    		<img v-if="item.status == 0" src="../../../../components/pcActivity/springFestival/img/yellow.png"/>
		        	    		<img v-if="item.status == 2" src="../../../../components/pcActivity/springFestival/img/audited.png"/>
		        	    	</div>
		        	    	<div class="not_through">
		        	    		<!--未通过-->
		        	    		<p v-if="item.status == 1" class="through">{{item.subjectOption}}</p>
		        	    	    <!--已采纳-->
		        	    	    <p class="Adopt" v-if="item.status == 2">{{item.subjectOption}}</p>
		        	    	</div>
		        	    </div>
		        	</div>
		        	</div>
		        	<img class="close"  @click="close" src="../../../../components/pcActivity/springFestival/img/close.png"/>
		        </div>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				recordfiv:true,//通过未通过图标
				through:false,//未通过的文字显示
                list:[]
			}
		},
		created(){
			this.activityId=this.GetQueryString('activityId')
			this.Record()
		},
		methods:{
			GetQueryString(name){
		     	return decodeURIComponent((new RegExp('[?|&]'+name+'='+'([^&;]+?)(&|#|;|$)').exec(location.href)||[,""])[1].replace(/\+/g,'%20'))||null;
			},
			//关闭按钮
			close(){
				this.$emit('close')
			},
			//转化时间戳
			formatDate (timestamp) {
			return this.$dateFormat(timestamp, 'yyyy-mm-dd HH:MM')
		    },
			//记录
			Record(){
				this.$CPOST('/account/v1/userSubject/queryUserSubject', {
					activityId: this.activityId,
					page: 0,
					size: 100000
			    },(res) => {
			      	this.list= res.resultValue.userSubjectEntitys;
			    })
			}
		}
	}
</script>
<style scoped>
 /*提名*/
	.record{width:100%;height:100%;position: fixed;top: 0;left: 0;right: 0;bottom:0;background: rgba(0,0,0,0.3);z-index: 2;text-align: center;}
	.record_body{width:100%;height:100%;display: table;}
	.record_body_main{display: table-cell;vertical-align: middle;}
    .Nomination_name{width: 594px;height: 548px;position:relative;padding-top: 80px;background: url(../../../../components/pcActivity/springFestival/img/big_bg.png) no-repeat center;margin: 0 auto;}
    .Nomination_name_center{width: 435px;float: right;margin-right: 18px;}
    .Nomination_name_body{width: 485px;height:466px;overflow: hidden;overflow-y: auto;margin: 0 auto;}
    .name_center{height: 43px;border-bottom: solid 1px #eca676;margin-bottom: 14px;}
    .name_record{border-bottom: solid 1px #eca676;padding-bottom: 8px;position: relative;margin-top: 18px;}
    .name_record>p{text-align: left;font-size: 14px;color: #8e5e5c;line-height: 19px;}
    .name_record_p{line-height: 28px !important;font-size: 28px !important;margin-bottom: 6px;}
    .name_record_div{position: absolute;top:4px;right: 0px;}
    .not_through{width: 100%;font-size: 14px;line-height: 20px;text-align: left;margin-top: 5px;}
    .close{position: absolute;top: -20px;right: -40px;cursor: pointer;}
    .through{color: #d01a0f;}
    .Adopt{color: #029c15;}
    /*滚动条*/
    .Nomination_name_body::-webkit-scrollbar{width: 10px;}
	/*定义滚动条的轨道，内阴影及圆角*/
	.Nomination_name_body::-webkit-scrollbar-track{width: 6px;padding:2px 2px;-webkit-box-shadow: inset 0 0 2px rgba(247,225,200,0); border-radius:20px;background: #f7e1c8;}
	/*定义滑块，内阴影及圆角*/
	.Nomination_name_body::-webkit-scrollbar-thumb{-webkit-box-shadow: inset 0 0 2px rgba(211,192,171,0);background: #d3c0ab;border-radius:20px;margin: 0 auto;}
</style>