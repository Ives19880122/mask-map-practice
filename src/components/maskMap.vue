<template>
  <div class="mask-map" id="mask-map"></div>
</template>

<script>
import L from 'leaflet'
export default {
  name: 'maskMap',
  data() {
    return {
      // 別的位置用不到,所以不需要vuex共用
      map: {},
      markers: []
    }
  },
  mounted() {
    this.map = L.map('mask-map', {
      center: [25.03, 121.55],
      zoom: 14,
    })
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '<a target="_blank" href="https://www.openstreetmap.org/">© OpenStreetMap貢獻者</a>',
      maxZoom: 18,
    }).addTo(this.map)
  },
  computed: {
    currDistrictInfo() {
      return this.$store.getters.currDistrictInfo
    },
    filteredStores() {
      return this.$store.getters.filteredStores
    }
  },
  watch: {
    /**
     * 切換行政區指定地圖中心
     */
    currDistrictInfo(dist) {
      this.map.panTo(new L.LatLng(dist.latitude, dist.longitude))
    },
    /**
     * 1. 清除原有marker
     * 2. 提供藥局對應資訊marker
     */
    filteredStores(stores) {
      this.clearMarkers()
      stores.forEach((elm) => this.addMarker(elm))
    }
  },
  methods: {
    addMarker(item) {
      // 設定宣告
      const ICON = {
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        popupAnchor: [12, 41],
        shadowSize: [41, 41]
      }
      const marker = L.marker([item.longitude, item.latitude], ICON)
        .addTo(this.map)
        .bindPopup(`<h2 class="popup-name">${item.name}</h2>`)
      // marker加入經緯度資訊
      marker.markerId = item.id
      marker.lng = item.longitude
      marker.lat = item.latitude
      // 加入陣列儲存
      this.markers.push(marker)
    },
    clearMarkers() {
      this.map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          this.map.removeLayer(layer)
        }
      })
      // 清空陣列
      this.markers.length = 0
    },
    triggerPopup(markerId) {
      // 目標標記
      const marker = this.markers.find((d) => d.markerId === markerId)
      // 地圖中心指向目標,並開啟Popup
      this.map.flyTo(new L.LatLng(marker.lng, marker.lat), 15)
      marker.openPopup()
    }
  }
};
</script>