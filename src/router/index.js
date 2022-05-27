import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import InsightsPage from '../views/InsightsPage.vue'
import CategorisePage from '../views/CategorisePage.vue'
import BudgetPage from '../views/BudgetPage.vue'


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
    {
        path: '/InsightsPage/:categorisedTxs',
        name: 'Insights',
        // props are always passed in as a string (because they're url params but there may be a cleaner way)
        props: route => ({ categorisedTxs: JSON.parse(route.params.categorisedTxs) }),
        component: InsightsPage
    },
    {
        path: '/BudgetPage/:categorisedTxs',
        name: 'Budget',
        // props are always passed in as a string (because they're url params but there may be a cleaner way)
        props: route => ({ categorisedTxs: JSON.parse(route.params.categorisedTxs) }),
        component: BudgetPage
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router