<template>
  <div>
    <div class="header">
      <span 
      class="nav-item" 
      v-for="(item,index) in appList" 
      :class="{active:currentPath===item.activeRule}"
      :key="index"
      @click="onClick(item)">
      {{item.name}}
      </span>
    </div>
    <button @click="onMsgClick">send message</button>
    <!-- 子应用容器 -->
    <div id="micro-container"></div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useRoute, useRouter } from "vue-router";
import appList from "./store/app-list";

export default defineComponent({
  setup() {
    const router = useRouter()
    const route = useRoute()
    const currentPath = computed(() => {
      
      return route.path.replace(/\/$/,'')
    })
    const onClick = (data:any) => {
      router.push(data.activeRule)
    }
    const onMsgClick = () => {
      const event = new CustomEvent('test-event', {
        detail:{name:'张三'}
      })
      window.dispatchEvent(event)
    }
    return {
      appList,
      currentPath,
      onClick,
      onMsgClick
    };
  },
});
</script>

<style scoped>
.nav-item{
  margin-left: 50px;
  cursor: pointer;
}
.nav-item.active{
  color: #42b983;
  font-weight: bold;
}
</style>


