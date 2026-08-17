export default defineNuxtRouteMiddleware((to) => {
    const token = useCookie('adminToken')
    if(!token.value){
        return navigateTo("/login");
    }
})