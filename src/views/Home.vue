<template>
<div class="home drag">
  <div class="search">
    <input type="text" spellcheck="false" v-model="value" placeholder="快速搜索" @keydown="search">
  </div>
  <TypeList :query="value" :filter.sync="list" @select="selectType"></TypeList>
</div>
</template>

<script>
import { shell } from 'electron'
import TypeList from '@/components/TypeList'
export default {
  name: 'home',
  components: { TypeList },
  data () {
    return {
      list: [],
      value: ''
    }
  },
  methods: {
    selectType (item) {
      let url = (item.url || '').replace('{query}', this.value)
      shell.openExternal(url)
    },
    search (e) {
      let url = ''
      if (e.metaKey) {
        let index = +e.key - 1
        if (this.list[index]) {
          url = this.list[index].url
        }
      } else if (e.keyCode === 13) {
        url = this.list[0].url
      } else {
        return
      }
      if (!url) {
        return
      }
      url = (url || '').replace('{query}', this.value)
      shell.openExternal(url)
    }
  }
}
</script>
<style lang="scss" scoped>
.search {
  width: 100%;
  box-sizing: border-box;
}
input {
  width: 100%;
  font-size: 20px;
  padding: 10px 20px;
  background-color: #eee;
  line-height: 40px;
  outline: 0;
  border: 0;
  &:focus {
    outline: 0;
  }
}
</style>
