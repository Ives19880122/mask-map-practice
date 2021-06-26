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
import { provide } from 'vue'
import mapStore from '@/composition/store'
import map from '@/composition/map'

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
  setup() {
    // mapStore 作為所有元件的提供者
    provide('mapStore', mapStore)
    provide('map', map)
    mapStore.fetchLocations()
    mapStore.fetchPharmacies()
  }
}
</script>

<style lang="scss" src="./style.scss"></style>
