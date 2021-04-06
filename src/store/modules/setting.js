const state = {
    isCollapse: false
}
const getters = {
    collapseState(state) {
        console.log(state.isCollapse)
        return state.isCollapse
    }
}
const mutations = {
    //  折叠侧导航栏
    sendCollapse(state) {
        state.isCollapse = !state.isCollapse
    }
}
const actions = {

}
export default {
    namespaced : true,
    state,
    getters,
    mutations,
    actions
}
