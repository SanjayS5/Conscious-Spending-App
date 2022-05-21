import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import InsightsPage from '../views/InsightsPage.vue'


const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomePage

    },
    {
        path: '/HomePage',
        name: 'HomePage',
        component: HomePage
    },
    {
        path: '/InsightsPage/:categorisedTxs',
        name: 'Insights',
        // props are always passed in as a string (because they're url params but there may be a cleaner way)
        props: route => ({ categorisedTxs: JSON.parse(route.params.categorisedTxs) }),
        component: InsightsPage
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router