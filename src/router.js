import Vue from 'vue'
import Router from 'vue-router'
// 路由懒加载
const Login = () => import('./components/Login.vue')
const Home = () => import('./components/Home.vue')

Vue.use(Router)

const router =  new Router({
  routes: [
    {
      path: '',
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login
    },{
      path: '/home',  
      component: Home
    }
  ],
  mode: 'history'
})
//为路由对象,添加beforeEach导航守卫
router.beforeEach((to, from, next) => {
  //如果用户访问的是登入页面直接放行
  console.log(to)
  if(to.path === '/login') return next()
  //从sessionStorage中获取到保存的token值
  const tokenStr = window.sessionStorage.getItem('token')
  //如果没有token强制跳转到登入页面
  if(!tokenStr) return next('/login')
  next()
})

export default router
