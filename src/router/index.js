import { createRouter, createWebHashHistory } from 'vue-router';
import Login from "../views/Login.vue";
import Articles from "../views/Articles.vue";
import ArticleDetail from "../views/ArticleDetail.vue";
import SignUp from "../views/SignUp.vue";

const routes = [
    { path: '/', name: 'Login', component: Login },
    { path: '/Articles', name: 'Home', component: Articles },
    {path: '/Articles/:id', name: 'ArticleDetail', component: ArticleDetail},
    {path: '/SignUp', name: 'Signup', component: SignUp},
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;