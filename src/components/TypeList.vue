<template>
  <ul class="list" v-show="query">
    <li v-for="(item, index) in list" :key="item.name" @click="$emit('select', item)">
      <span class="title">
        <img :src="item.icon" alt="">
        <span>{{item.name}}</span>
      </span>
      <span>
        {{9 > index ? '⌘' + (index + 1): ''}}
      </span>
    </li>
  </ul>
</template>

<script>
import defaultTypeList from '@/assets/defaultTypeList'
export default {
  props: {
    query: String,
    filter: {
      type: Array,
      default: () => ([])
    }
  },
  computed: {
    list () {
      let list = []
      try {
        let localList = localStorage.getItem('list') || null
        localList = JSON.parse(localList)
        if (localList) {
          list = localList
        } else {
          return defaultTypeList
        }
      } catch (e) {
        list = defaultTypeList
      }
      return list
    }
  },
  mounted () {
    this.$emit('update:filter', this.list)
  }
}
</script>

<style lang="scss" scoped>
.list {
  margin-top: 10px;
  list-style-type: none;
  margin: 0;
  padding: 0;
  width: 100%;
  margin-top: 5px;
  &>li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0;
    padding: 10px 20px;
    cursor: pointer;
    &:hover {
      background-color: rgb(94, 172, 236);
      color: #fff;
    }
    &>.title {
      display: inline-block;
      &>img{
        width: 32px;
        height: 32px;
        margin-right: 10px;
        display: inline-block;
        vertical-align: middle;
      }
      &>span{
        font-weight: bold;
        line-height: 32px;
      }
    }
  }
}
</style>
