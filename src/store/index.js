import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const modules = {}
const path = require('path')
const files = require.context('./modules', false, /\.js$/)
files.keys().forEach(key => {
  const name = path.basename(key, '.js')
  modules[name] = files(key).default || files(key)
})

export default new Vuex.Store({
  state: {
    playMusic: {
      title: '雨后',
      artist: '张雪飞',
      url: 'http://m801.music.126.net/20210419094459/bb84974b73d964996f9d2b2a66ebae03/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/8328598826/abf5/2def/109c/cfce4079dca140ea11bf0c9d73f70e9b.mp3'
    },
    controlMsc: {},
    mainIndex: 'first',
    newmusicStatus: true,
    thisPlaylistId: 0
  },
  mutations: {
    // 播放器对象
    controlMusic(state, obj) {
      state.controlMsc = obj
    },
    // 设置当前播放
    setPlayMusic(state, obj) {
      console.log(obj)
      state.playMusic = obj
      if (JSON.parse(window.sessionStorage.getItem('musiclist')) !== null) {
        const id = state.controlMsc.musicList.findIndex(item => obj.id === item.id)
        if (id < state.controlMsc.musicList.length - 1 && id !== -1) {
          state.controlMsc.musicList.splice(id, 1)
        }
        state.controlMsc.musicList.unshift(obj)
        window.sessionStorage.setItem('musiclist', JSON.stringify(state.controlMsc.musicList))
      } else {
        state.controlMsc.musicList.unshift(obj)
        window.sessionStorage.setItem('musiclist', JSON.stringify(state.controlMsc.musicList))
      }
    },
    // 播放器记一次加载
    firstComeMusic(state, obj) {
      state.playMusic = obj
    },
    // 自动播放
    autoPlayMusic(state) {
      state.controlMsc.play()
    },
    // 改变主页切换索引
    changeMainIndex(state, item) {
      state.mainIndex = item
    },
    // 新增播放列表数据
    addMusicList(state) {
      state.controlMsc.musicList.splice(0, state.controlMsc.musicList.length)
      const data = JSON.parse(window.sessionStorage.getItem('musiclist'))
      state.controlMsc.playIndex = 0
      data.forEach(item => {
        state.controlMsc.musicList.push(item)
      })
      state.controlMsc.shuffledList = state.controlMsc.musicList
    },
    // 设置新歌页tabs状态
    setNMStatus(state, str) {
      state.newmusicStatus = str
    },
    // 记录当前歌单id
    setPlaylistId(state, id) {
      state.thisPlaylistId = id
    }
  },
  actions: {
    dealAutoPlay(context, obj) {
      setTimeout(() => {
        context.commit('autoPlayMusic')
      }, 1000)
      context.commit('setPlayMusic', obj)
    }
  },
  modules: modules
})
