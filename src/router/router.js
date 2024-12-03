// import { createRouter, createWebHistory } from 'vue-router';
// import Login from './components/Login.vue';
// import Register from './components/Register.vue';
// import Post from './components/Post.vue';

// import post from '../components/post.vue';
// import register from '../components/register.vue';

// import Home from '../views/Home.vue';
// import ProductManagement from '../components/ProductManagement.vue';
// import OrderManagement from '../components/OrderManagement.vue';
// import CustomerManagement from '../components/CustomerManagement.vue';
// import Statistics from '../components/Statistics.vue';
// import NotFound from '../views/NotFound.vue';



// const routes = [
//     // { path: '/', name: 'Home', component: Home },
//     { path: '/create-post', name: 'createPost', component: post },
    
//     { path: '/register', name: 'register', component: register },

//     { path: '/', component: Home },
//     { path: '/products', component: ProductManagement },
//     { path: '/orders', component: OrderManagement },
//     { path: '/customers', component: CustomerManagement },
//     { path: '/statistics', component: Statistics },
//     { path: '/:pathMatch(.*)*', component: NotFound },



// ];


import { createRouter, createWebHistory } from 'vue-router';
import Products from '../components/Products.vue';
import Login from '../components/Login.vue';
import Customers from '../components/Customers.vue';
import Orders from '../components/Orders.vue';
import Statistics from '../components/Statistics.vue';
// import ProductManager from '../components/ProductManager.vue';

const routes = [
    { path: '/', redirect: '/products' }, // Trang mặc định
    { path: '/products', name: 'Products', component: Products },
    { path: '/orders', name: 'Orders', component: Orders },
    { path: '/customers', name: 'Customers', component: Customers },
    { path: '/statistics', name: 'Statistics', component: Statistics },
    { path: '/login', name: 'Login', component: Login },
    // { path: '/product-manager', name: 'ProductManager', component: ProductManager },
    // { path: 'pơroductmanager', name: 'ProductManager',component: ProductManager}
   

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;





