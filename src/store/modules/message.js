const state = {
	message: [],
	tabbarItemName:''
}

const mutations = {
	ADD_MESSAGE_LIST: (state, log) => {
		state.message = log
	},
	ADD_TABBAR_ITEM_NAME: (state, log) => {
		state.tabbarItemName = log
	}
}

const actions = {
	addMessageList({ commit }, log) {
		commit('ADD_MESSAGE_LIST', log)
	},
	addTabbarItemName({ commit }, log) {
		commit('ADD_TABBAR_ITEM_NAME', log)
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
