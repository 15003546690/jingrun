<template>
    <div>
       <ul>
         <li>
             <p id="oldPassw">当前登录密码</p>
             <p id="newPassw">当前登录密码</p>
             <p id="dbPassw">确定新登录密码</p>
         </li>
         <li>
            <p><input type="text" /></p>
            <p><input type="text" /></p>
            <p><input type="text" /></p>
         </li>
       </ul>

   </div>
</template>

<script>

       export default{
            data(){

            },
            created(){
                this.resrtForm();
            },
            methods:{
                //重置密码的表单验证
                 resrtForm(){
                     var newPassw=document.getElementById("newPassw");
                     var dbPassw=document.getElementById("dbPassw");
                     
                     if(''){

                     }
                     else if(newPassw.innerHTML==!dbPassw.innerHTML){
                                   
                     }else{

                     }
                    
                 },
            }
       }
  
</script>
<style>
    ul>li{
        float:left;
    }
    input{
        width:200px;
    }
</style>