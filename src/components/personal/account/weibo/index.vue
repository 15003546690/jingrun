<template>

</template>
<script>
  export default {
    created() {
      var code = this.$route.query.code;
      if(code != undefined){
        this.$router.push('/personal/account/bind?wbcode='+code)
      }
    }    

  }
</script>
