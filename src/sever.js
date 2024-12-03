app.get('/api/user', (req, res) => {
    const user = getUserFromSession(req); // Lấy thông tin người dùng từ session hoặc JWT
    res.json({
        username: user.username,
        role: user.role, // Trả về role của người dùng
    });
});
import { createStore } from 'vue';

export default createStore({
    state() {
        return {
            user: null,  // Dữ liệu người dùng
            isAuthenticated: false,  // Kiểm tra người dùng đã đăng nhập hay chưa
        };
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
            state.isAuthenticated = true;
        },
        clearUser(state) {
            state.user = null;
            state.isAuthenticated = false;
        },
    },
    actions: {
        async login({ commit }, credentials) {
            try {
                const response = await axios.post('/api/login', credentials);
                commit('setUser', response.data);
            } catch (error) {
                console.error('Đăng nhập thất bại:', error);
            }
        },
        logout({ commit }) {
            commit('clearUser');
        },
    },
});
