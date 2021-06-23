<template>
  <div class="aside-menu">
    <div class="wraps">
      <label>
        縣市：<select v-model="currCity">
          <option v-for="c in cityList" :key="c">{{ c }}</option>
        </select>
      </label>
      <label>
        行政區：<select v-model="currDistrict">
          <option v-for="d in districtList" :key="d.id">{{ d.name }}</option>
        </select>
      </label>
    </div>

    <div class="wraps">
      <label>
        <i class="fas fa-search-location"></i> 關鍵字搜尋：
        <input type="text" placeholder="請輸入關鍵字" v-model="keywords" />
      </label>
    </div>

    <ul class="store-lists">
      <li class="store-info wraps" v-for="s in filteredStores" :key="s.id">
        <h1 v-html="keywordHighlight(s.name)"></h1>

        <div class="mask-info">
          <i class="fas fa-head-side-mask"></i>
          <span>大人口罩: {{ s.mask_audlt }} 個</span>
        </div>

        <div class="mask-info">
          <i class="fas fa-baby"></i>
          <span>兒童口罩: {{ s.mask_child }} 個</span>
        </div>

        <div class="mask-info">最後更新時間: {{ s.updated }}</div>

        <button class="btn-store-detail">
          <i class="fas fa-info-circle"></i>
          看詳細資訊
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'asideMenu',
  computed: {
    currCity: {
      get() {
        return this.$store.state.currCity
      },
      set(value) {
        this.$store.commit('setCurrCity', value)
      }
    },
    currDistrict: {
      get() {
        return this.$store.state.currDistrict
      },
      set(value) {
        this.$store.commit('setCurrDistrict', value)
      }
    },
    keywords: {
      get() {
        return this.$store.state.keywords
      },
      set(value) {
        this.$store.commit('setKeywords', value)
      }
    },
    ...mapGetters(['cityList', 'districtList', 'filteredStores']),
  },
  watch: {
    districtList(v) {
      // 解構取第一筆資料
      const [arr] = v
      this.currDistrict = arr.name
    }
  },
  methods: {
    keywordHighlight(val) {
      return val.replace(new RegExp(this.keywords, 'g'), `<span class="highlight">${this.keywords}</span>`)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.highlight {
  color: #f08d49;
}
</style>