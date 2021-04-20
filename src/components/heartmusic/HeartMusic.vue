<template>
    <div class="home">
      <div class="search-box">
          <input class="search-txt" type="text"
                 v-model="searchValue"
                 @keyup.enter="searchEvent"
                 @mouseenter="searchGuide"
                 @focus="searchOpenclose = true"
                 placeholder="Please search songs" />
        <a class="search-btn" href="#">
          <i class="el-icon-search" @click="searchEvent"></i>
        </a>
      </div>
      <div class="search-guide"  v-show="searchOpenclose">
        <div class="guide-box">
          <div class="guide-box-tt">热门搜索</div>
          <div class="hot-tags">
            <el-tag
                effect="plain"
                type="info"
                v-for="(item, i) in searchHots"
                :key="i"
                @click="hotTagEvent"
            >{{item.first}}</el-tag>
          </div>
          <div class="guide-box-tt">历史搜索</div>
          <div class="hot-tags">
            <el-tag
                effect="plain"
                type="info"
                v-for="(item, i) in historyTags"
                :key="i"
                @click="hotTagEvent"
                :closable="true"
                @close="historyTagClose(item)"
            >{{item}}</el-tag>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'HeartMusic',
  data() {
    return {
      searchValue: '',
      searchOpenclose: false,
      searchHots: [],
      historyTags: []
    }
  },
  methods: {
    searchEvent() {
      if (this.searchValue.trim().length === 0) {
        return this.$message.error('输入搜索内容为空！')
      }
      window.sessionStorage.setItem('searchValue', this.searchValue.trim())
      const history = window.sessionStorage.getItem('searchHistory')
      var arr = history === null ? [] : JSON.parse(history)
      if (!arr.includes(this.searchValue.trim())) {
        if (arr.length < 10) {
          arr.unshift(this.searchValue.trim())
        } else {
          arr.splice(9, 1)
          arr.unshift(this.searchValue.trim())
        }
      }
      window.sessionStorage.setItem('searchHistory', JSON.stringify(arr))
      this.$router.push('searchlist')
    },
    async searchGuide(el) {
      this.searchOpenclose = true
      this.$store.state.controlMsc.showList = false
      const { data: res } = await this.$request.get('/search/hot')
      this.searchHots = res.result.hots
      this.searchHots.splice(1, 3)
      const history = window.sessionStorage.getItem('searchHistory')
      var arr = history === null ? [] : JSON.parse(history)
      this.historyTags = arr
      this.searchOpenclose = true
      const guideBox = document.querySelector('.search-guide')
      window.onclick = e => {
        if (!guideBox.contains(e.target) && !el.target.contains(e.target)) {
          this.searchOpenclose = false
          window.onclick = null
        }
      }
    },
    hotTagEvent(e) {
      this.searchValue = e.target.innerText.trim()
      this.searchEvent()
    },
    historyTagClose(tag) {
      this.historyTags.splice(this.historyTags.indexOf(tag), 1)
      window.sessionStorage.setItem(
        'searchHistory',
        JSON.stringify(this.historyTags)
      )
    }
  }
}
</script>
<style lang="less" scoped>
.home {
  width: 100%;
  height: 600px;
  background: #DA4453;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #89216B, #DA4453);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #89216B, #DA4453); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}
.search-box {
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #2f3640;
  height: 40px;
  border-radius: 40px;
  padding: 10px;
}
.search-btn {
  color: #e84118;
  float: right;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #2f3640;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.4s;
  text-decoration: none;
}
.search-txt {
  border: none;
  background: none;
  outline: none;
  float: left;
  padding: 0;
  color: white;
  font-size: 16px;
  transition: 0.4s;
  line-height: 40px;
  width: 0;
}
.search-box:hover > .search-txt {
  width: 240px;
  padding: 0 6px;
}
.search-txt:focus {
  width: 240px;
  padding: 0 6px;
}
.search-guide {
  height: 250px;
  width: 340px;
  background-color: rgba(255,255,255,0.4);
  position: absolute;
  z-index: 999;
  top: 40%;
  left: 35%;
  box-shadow: -6px 6px 6px rgba(0, 0, 0, 0.25);
  border-radius:10px;
  .guide-box {
    box-sizing: border-box;
    padding: 8px 15px;
  }
  .guide-box-tt {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.6);
  }
  .hot-tags .el-tag {
    border-radius: 15px;
    padding: 0 12px;
    height: 26px;
    line-height: 26px;
    cursor: pointer;
    margin-right: 10px;
    margin-bottom: 8px;
  }
  .hot-tags .el-tag:hover {
    background: #f1f1f1;
  }
}
</style>
