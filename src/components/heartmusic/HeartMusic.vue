<template>
  <div>
    <div>
      <el-input v-model="moodWord" placeholder="请输入你此刻心情" style="display: inline-block;width: 200px;margin-right: 20px">
      </el-input>
      <el-button @click="getMusicList">查询</el-button>
    </div>
    <div
        class="main-song-list"
        style="height:360px;overflow:hidden scroll;width:790px"
    >
      <el-table
          :data="selectedMusic"
          style="width: 100%;"
          :stripe="true"
          @row-click="getMusicUrl"
          :show-header="false"
      >
        <el-table-column type="index" width="60px"></el-table-column>
        <el-table-column prop="name" label="音乐标题">
          <template slot-scope="scoped">
            <div class="music-img-title">
              <el-image :src="scoped.row.pic">
                <div slot="placeholder" class="image-slot">
                  <i class="el-icon-picture" style="font-size:50px;color:#f1f1f1"></i>
                </div>
              </el-image>
              <span>{{scoped.row.name}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="author" label="歌手" width="180">
          <template slot-scope="scope">
            <span v-for="(item,i) in scope.row.author" :key="i">{{item + ' '}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="album" label="专辑" width="180"></el-table-column>
        <el-table-column prop="time" label="时长" width="100"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      moodWord: '',
      selectedMusic: [],
      testMusic: [],
      listIndex: 0,
      // typeList: [
      //   { name: '全部', type: 0 },
      //   { name: '华语', type: 7 },
      //   { name: '欧美', type: 96 },
      //   { name: '日本', type: 8 },
      //   { name: '韩国', type: 16 }
      // ],
      musiclist: [],
      musicdata: [],
      queryNum: 10,
      scrollStatus: false
    }
  },
  methods: {
    async getMusicList() {
      this.selectedMusic = []
      const type = 0
      const { data: res } = await this.$request.get(`/top/song?type=${type}`)
      const arrData = []
      res.data.forEach(item => {
        const arr = {}
        arr.name = item.name
        arr.pic = item.album.picUrl
        arr.author = []
        item.artists.forEach(i => {
          arr.author.push(i.name)
        })
        arr.id = item.id
        arr.time =
            Math.floor((item.duration % 3600000) / 60000) > 10
              ? Math.floor((item.duration % 3600000) / 60000)
              : '0' + Math.floor((item.duration % 3600000) / 60000)
        arr.time +=
            ':' +
            (Math.floor((item.duration % 60000) / 1000) > 10
              ? Math.floor((item.duration % 60000) / 1000)
              : '0' + Math.floor((item.duration % 60000) / 1000))
        arr.album = item.album.name
        arrData.push(arr)
      })
      this.musicdata = arrData
      this.musiclist = this.getArrayData(arrData, 1, 250)
      console.log(this.musiclist)
      // const moodWord = this.moodWord
      console.log(this.moodWord)
      // this.testMusic = await this.$request.get(`/search/multimatch?keywords = ${moodWord}`)
      // console.log(this.testMusic)
      await this.getSelectedMusic()
    },
    async getSelectedMusic() {
      const lyric = []
      for (let i = 0; i < this.musiclist.length; i++) {
        lyric[i] = await this.$request.get(`/lyric?id=${this.musiclist[i].id}`)
        // console.log(lyric[i])
        // console.log(lyric[i].data.lrc.lyric)
        // console.log(lyric[i].data.lrc.lyric.search(this.moodWord))
        if (lyric[i].data.lrc.lyric.search(this.moodWord) !== -1) {
          console.log(lyric[i].data.lrc.lyric)
          this.selectedMusic.push(this.musiclist[i])
        }
      }
      console.log(this.selectedMusic)
    },
    // 获取音乐播放地址
    async getMusicUrl(obj) {
      const { data: res } = await this.$request.get(`/song/url?id=${obj.id}`)
      let music = {}
      music = {
        title: obj.name,
        artist: obj.author.join(' '),
        src: res.data[0].url,
        pic: obj.pic,
        id: obj.id
      }
      window.sessionStorage.setItem('nowMusic', JSON.stringify(music))
      this.$store.dispatch('dealAutoPlay', music)
    },
    // 数组提取部分数据
    getArrayData(data, start, num) {
      const res = []
      const length =
          start + num - 1 > data.length ? data.length : start + num - 1
      for (var i = start - 1; i < length; i++) {
        res.push(data[i])
      }
      return res
    }
    // listenScroll(e) {
    //   const scroll = (
    //     e.target.scrollTop /
    //     (e.target.scrollHeight - e.target.clientHeight)
    //   ).toFixed(3)
    //   if (scroll > 0.95 && !this.scrollStatus) {
    //     this.scrollStatus = true
    //     setTimeout(() => {
    //       if (this.queryNum < 100) {
    //         this.queryNum += 10
    //         this.musiclist = this.getArrayData(this.musicdata, 1, this.queryNum)
    //         setTimeout(() => {
    //           e.target.scrollTo(0, (this.queryNum - 10) * 75 - e.target.clientHeight)
    //           this.scrollStatus = false
    //         }, 10)
    //       }
    //     }, 1500)
    //   }
    // }
  }
}
</script>
<style lang="less" scoped>
.music-img-title {
  display: flex;
  align-items: center;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  .el-image {
    width: 50px;
    height: 50px;
    border-radius: 4px;
    margin-right: 10px;
  }
  span {
    display: inline-block;
    width: 180px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}
.new-list {
  position: relative;
  height: 40px;
  line-height: 40px;
  .new-header-list {
    display: block;
    list-style-type: none;
    .select {
      font-weight: 600;
      color: #000;
    }
    li {
      float: left;
      margin-right: 15px;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.6);
      cursor: pointer;
    }
    li:hover {
      color: rgba(0, 0, 0, 0.9);
    }
  }
  .el-button {
    position: absolute;
    right: 20px;
    border-radius: 20px;
    top: 5px;
  }
}
</style>
