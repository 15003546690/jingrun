<template>
   <div>
     <ul> 
         <li>
             <p>新的手机号码 : </P><p>发送验证码至新的手机 : </P>
         </li>
         <li>
            <p> 
                <select >
                    <option>+86</option>
                    <option>86</option>
                    <option>86</option>
                    <option>86</option>
                </select>
                <input type="text" />
             </p>
             <p>
                <input type="text"/>  <input type="button"  @click="getCode" value="获取验证码"/>
             </p>
             <p><input type="submit" value="下一步"/></p>
            </li>
        </ul>
   </div>
</template>

<script>
    export default{
        data(){
            return {

            }
        },
        props:[],
        created(){
            
        },
        methods:{
            getCode(){
                //发送数据请求，请求验证码信息
                  this.$axios.post('/event/v1/homeRecommend/queryPCHomeRecommend' + this.$signParam(),
                    {}).then(res=>{
                        
                    }).catch(err => {
                        const data = res.response.data
                   })
            	},
            }
    }
    
</script>

<style>
  ul>li{
      float:left;
  }

   
</style>