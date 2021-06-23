<template>
  <div id="app">
    <!-- aside-menu 左側欄 -->
    <asideMenu />
    <!-- 地圖區塊 -->
    <maskMap />
    <lightbox />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import asideMenu from './components/asideMenu.vue'
import lightbox from './components/lightbox.vue'
import maskMap from './components/maskMap.vue'
export default {
  name: 'App',
  components: {
    asideMenu,
    lightbox,
    maskMap
  },
  methods: {
    ...mapActions(['fetchLocations', 'fetchPharmacies'])
  },
  mounted() {
    this.fetchLocations()
    this.fetchPharmacies()
  },
}
</script>

<style lang="scss" src="./style.scss"></style>
