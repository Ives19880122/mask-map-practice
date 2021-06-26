import { ref, watch, onMounted } from 'vue'
import store from './store'
import L from 'leaflet'

const ICON = {
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    popupAnchor: [12, 41],
    shadowSize: [41, 41]
}
const map = ref(null)
const markers = []

// methods
const addMarker = (item) => {
    const marker = L.marker([item.longitude, item.latitude], ICON)
        .addTo(map.value)
        .bindPopup(`<h2 class="popup-name">${item.name}</h2>`)
    // marker加入經緯度資訊
    marker.markerId = item.id
    marker.lng = item.longitude
    marker.lat = item.latitude
    // 加入陣列儲存
    markers.push(marker)
}
const clearMarkers = () => {
    map.value.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
            map.value.removeLayer(layer)
        }
    })
    // 清空陣列
    markers.length = 0
}
const triggerPopup = (markerId) => {
    // 目標標記
    const marker = markers.find((d) => d.markerId === markerId)
    // 地圖中心指向目標,並開啟Popup
    map.value.flyTo(new L.LatLng(marker.lng, marker.lat), 15)
    marker.openPopup()
}

const mapInit = (element) => {
    onMounted(() => {
        map.value = L.map(element, {
            center: [25.03, 121.55],
            zoom: 14,
        })
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '<a target="_blank" href="https://www.openstreetmap.org/">© OpenStreetMap貢獻者</a>',
            maxZoom: 18,
        }).addTo(map.value)


        // watch
        watch(() => store.state.currDistrictInfo, (dist) => {
            map.value.panTo(new L.LatLng(dist.latitude, dist.longitude))
        })
        watch(() => store.state.filteredStores, (stores) => {
            // 清除原有marker
            clearMarkers()
            // 提供藥局對應資訊marker
            stores.forEach((element) => addMarker(element))
        })
    })
}

// 輸出外部會使用的程式碼
export default {
    triggerPopup,
    mapInit
}