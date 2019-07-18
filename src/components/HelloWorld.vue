<template>
  <div class="hello">
    <iframe 
    :src="'./pdf/web/viewer.html?file=http://asst.ouyeel.com/xplat-xozg/static/pdf/ouyeelEmployeeHandbook.pdf'" 
    height="100%" 
    width="100%"></iframe>
  </div>
</template>

<script>
import {Toast} from 'mint-ui'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  mounted(){
    Toast('测试！！')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>

.hello{
  height: 100%;
  width: 100%;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
