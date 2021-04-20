<template>
  <div>
    <el-tabs v-model="$store.state.mainIndex" @tab-click="handleClick" class="le-tab-demo">
      <el-tab-pane label="个性推荐" name="first" class="applyScroll">
        <m-home></m-home>
      </el-tab-pane>
      <el-tab-pane label="排行榜" name="third" class="applyScroll">
        <m-ranklist></m-ranklist>
      </el-tab-pane>
      <el-tab-pane label="歌手" name="fourth" style="overflow: hidden!important">
        <div :is="Components"></div>
      </el-tab-pane>
      <el-tab-pane label="最新歌曲" name="fifth">
        <div :is="NewMusicComponents"></div>
      </el-tab-pane>
      <el-tab-pane label="随心听" name="six">
        <heart-music></heart-music>
      </el-tab-pane>
    </el-tabs>
    <!-- 控制折叠面板 -->
    <div class="operate">
      <div class="search">
        <el-button @click="fold">
          <i class="el-icon-s-fold"></i>
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Home from './home/Home.vue'
import rankList from './list/Ranking.vue'
import songsRank from './songs/Rank.vue'
import NewMusic from './newmusic/Main.vue'
import HeartMusic from './heartmusic/HeartMusic'
// import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      searchHots: [],
      searchOpenclose: false,
      historyTags: [],
      Components: '',
      NewMusicComponents: ''
    }
  },
  components: {
    'm-ranklist': rankList,
    'm-home': Home,
    'heart-music': HeartMusic
  },
  methods: {
    // ...mapMutations('setting', ['sendCollapse']),
    fold() {
      this.$store.commit('setting/sendCollapse')
    },
    handleClick(tab, event) {
      this.$store.commit('changeMainIndex', tab.name)
      if (tab.name === 'fourth') {
        this.Components = songsRank
      } else if (tab.name.trim() === 'fifth') {
        this.NewMusicComponents = NewMusic
      }
    }
  },
  mounted() {
    const mainIndex = this.$store.state.mainIndex
    if (mainIndex === 'fourth') {
      this.Components = songsRank
    } else if (mainIndex === 'fifth') {
      this.NewMusicComponents = NewMusic
    }
  }
}
</script>
<style lang="less" scoped>
.applyScroll {
  overflow: hidden scroll;
  height: 480px;
}
.le-tab-demo {
  width: 100%;
  box-sizing: border-box;
  border: 0;
  height: 600px;
  overflow: hidden;
}

.el-tabs__header {
  background: #f4f4f4;
}
.operate{
  background: #f4f4f4;
  position: absolute;
  width: 250px;
  right: 0;
  top: 0;
  height: 38px;
  border-bottom:2px solid #E4E7ED;
  .search {
    //background: #f4f4f4;
    position: absolute;
    width: 100px;
    right: 50px;
    //top: 0;
    //height: 36px;
    .el-icon-search {
      font-size: 18px;
      position: absolute;
      right: 30px;
      top: 10px;
      cursor: pointer;
    }
    .el-button:hover{
      background-color: #E6007A;
      color: #FFFFFF;
    }
  }
  .el-button{
    margin-left: 95px;
  }
}
.el-tab-pane {
  padding: 0 10px;
}
</style>
