import Vue from 'vue';
import Router from 'vue-router';

import BooksList from '../components/BooksList';
import BookRegister from '../components/BookRegister';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [{
            path: '/',
            component: BooksList
        },
        {
            path: '/books',
            component: BooksList
        },
        {
            path: '/bookRegistration',
            component: BookRegister
        }
    ]
});