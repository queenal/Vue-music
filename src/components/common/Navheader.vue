<template>
  <div>
    <div class="main-header">
      <i class="el-icon-arrow-left" @click="$router.push(returnLink)"></i>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    returnLink: {
      type: String,
      default: '/music',
      required: false
    }
  },
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>
<style lang="less" scoped>
</style>
