export const state = () => ({
    user: null,
    token: null
});

export const mutations = {
    setUser(state, user) {
        state.user = user;
    },
    setToken(state, token) {
        state.token = token;
    },
    clearToken(state) {
        state.token = null;
        state.user = null;
    }
};

export const actions = {
    async login({ commit }, { email, password }) {
        const { data } = await this.$axios.post('/auth/login', { email, password });
        commit('setUser', data.user);
        commit('setToken', data.token);
    },
    logout({ commit }) {
        commit('clearToken');
    }
};

export const getters = {
    isAuthenticated(state) {
        return !!state.token;
    }
};
