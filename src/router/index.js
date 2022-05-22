import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import InsightsPage from '../views/InsightsPage.vue'
import CategorisePage from '../views/CategorisePage.vue'


const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomePage
    },
    {
        // path: '/categorise/:uncategorisedTxs/:txs/:filteredTxs',
        path: '/categorise',
        name: 'categorisePage',
        component: CategorisePage,
    },
    // {
    //     // path: '/categorise/:uncategorisedTxs/:txs/:filteredTxs',
    //     path: '/categorise/:parsedTxs',
    //     name: 'categorisePage',
    //     component: CategorisePage,
    //     props: route => ({
    //         // uncategorisedTxs: JSON.parse(route.params.uncategorisedTxs),
    //         // filteredTxs: JSON.parse(route.params.filteredTxs),
    //         parsedTxs: JSON.parse(route.params.parsedTxs)
    //     })
    // },
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