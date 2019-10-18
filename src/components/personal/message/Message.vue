<template>
  <div class="announcement_div">
    <span><img src="../../../assets/img/center/message.png"/></span>
    <div class="announcement_div_most">
    <div class="announcement_div_content">
      <p>{{ message.title }}</p>
      <i><a @click="clean($event)">删除</a>{{ formatDate(message.createTime) }}</i>
    </div>
    <div class="announcement_content">
      {{ message.content }}
    </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'message',
    'totalPage',
    'system'
  ],
	methods: {
		formatDate (timestamp) {
			return this.$dateFormat(timestamp, 'yyyy-mm-dd HH:MM')
		},
			//单条删除
       	clean(e) {
          e.path[4].style.display='none'
			  	this.$axios.post('/message/v1/message/deleteMessage' + this.$signParam(), {
			       messageId:this.system[0].messageId,
             messageType:2
			      },
            {
                headers:{
                    Authorization:this.loginToken 
                }
            })
            .then(res=>{
             const data=res.data
            })
            .catch(err => {
            const data = res.response.data
		     	})
			  			
		     }
	}
}
</script>


<style scoped>
/*公告消息*/
.announcement_div{
	border-bottom: dashed 1px #e1e1e1;
  display: inline-block;
  padding-bottom: 14px;
  margin-bottom: 16px;
}
.announcement_div>span{
	width: 67px;
	height: 60px;
	display: block;
	float: left;    
}
.announcement_div_most{
	width: 873px;
    float: left;
}
.announcement_div_content{
	    width: 873px;
    float: left;
}
.announcement_div_content>p{
	float: left;
	height: 20px;
	font-size: 14px;
	color: #323232;
}    
.announcement_div_content>i{
	float: right;
	height: 20px;
	font-size: 12px;
	color: #a5a5a5;
	display: block;
}
.announcement_content{
	line-height: 22px;
	font-size: 14px;
	color: #676767;
}
</style>
