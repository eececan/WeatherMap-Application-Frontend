import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../pages/welcome-page/WelcomePage.vue')
        },
        {
            path: '/geocoding-page',
            name: 'GeocodingPage',
            component: () => import('../pages/geocoding-page/GeocodingPage.vue')
        },
        {
            path: '/air-pollution-last-week',
            name: 'AirPollutionLastWeek',
            component: () => import('../pages/geocoding-page/AirPollutionThisWeek.vue')
        },
        {
            path: '/air-pollution-specified-date',
            name: 'AirPollutionSpecifiedDate',
            component: () => import('../pages/geocoding-page/AirPollutionSpecifiedDate.vue')
        }
    ]
})

export default router

