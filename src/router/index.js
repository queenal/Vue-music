import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'

// 导入最新歌曲模块
import Music from '../components/Music.vue'
import MusicList from '../components/music/MusicList.vue'
import PlayList from '../components/music/Playlist.vue'
import SongsAlbum from '../components/music/Album.vue'

// 导入排行榜模块
import Rankplaylist from '../components/list/Liebiao.vue'
import SearchList from '../components/search/searchList.vue'
import SongsMusiclist from '../components/songs/Musiclist.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Index,
    redirect: '/music',
    children: [
      { path: '/music', component: Music },
      { path: '/songlist', component: MusicList },
      { path: '/playlist', component: PlayList },
      { path: '/rankplaylist', component: Rankplaylist },
      { path: '/searchlist', component: SearchList },
      { path: '/songmusiclist', component: SongsMusiclist },
      { path: '/album', component: SongsAlbum }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
