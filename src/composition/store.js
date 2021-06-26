import { reactive, computed } from 'vue'

const state = reactive({
    currCity: '臺北市',
    currDistrict: '北投區',
    infoBoxSid: null,
    keywords: '',
    showModal: false,
    location: [],
    stores: [],
    // 使用computed對應getters
    cityList: computed(() => state.location.map((d) => d.name)),
    districtList: computed(() => state.location.find((d) => d.name === state.currCity)?.districts || []),
    currDistrictInfo: computed(() => state.districtList.find((d) => d.name === state.currDistrict) || {}),
    filteredStores: computed(() => {
        return state.keywords
            ? state.stores.filter((d) => d.name.includes(state.keywords))
            : state.stores.filter((d) => d.county === state.currCity && d.town === state.currDistrict)
    }),
})
// 對應actions
const fetchLocations = async () => {
    const json = await fetch('https://raw.githubusercontent.com/kurotanshi/mask-map/master/raw/area-location.json')
        .then((res) => res.json())
    state.location = json
}
const fetchPharmacies = async () => {
    const json = await fetch('https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json')
        .then((res) => res.json())

    const data = json.features.map((d) => ({
        ...d.properties,
        latitude: d.geometry.coordinates[0],
        longitude: d.geometry.coordinates[1]
    }))
    state.stores = data
}
// state與actions輸出
export default {
    state,
    fetchLocations,
    fetchPharmacies,
}

// 嚴謹輸出
// const setCurrCity = (val) => { state.currCity = val}
// const setCurrDistrict = (val) => { state.currDistrict = val}
// const setAreaLocation = (val) => { state.location = val }
// const setStores = (val) => { state.stores = val}
// const setKeywords = (val) => { state.keywords = val}
// const setShowModal = (val) => { state.showModal = val}
// const setInfoBoxSid = (val) => { state.infoBoxSid = val }
// export default {
//     readonly(state),
//     fetchLocations,
//     fetchPharmacies,
//     setCurrCity,
//     setCurrDistrict,
//     setAreaLocation,
//     setStores,
//     setKeywords,
//     setShowModal,
//     setInfoBoxSid
// }
