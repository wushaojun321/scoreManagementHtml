import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/pages/Login'
import Class from '@/pages/Class'
import Student from '@/pages/Student'
import AddScore from '@/pages/AddScore'
import PaperList from '@/pages/PaperList'
import AddPaper from '@/pages/AddPaper'
import PaperScore from '@/pages/PaperScore'
import ClassDetail from '@/pages/ClassDetail'
import AddTeacher from '@/pages/AddTeacher'
import store from '@/store/index'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }, {
      path: '/login',
      name: 'Login',
      component: Login,
      beforeEnter: (to, from, next) => {
        console.log('aaa')
        console.log(store.state)
        if (window.localStorage.getItem('token')) {
          store.state.isLogin = true
          next('/paperList')
        } else {
          next()
        }
      }
    }, {
      path: '/logout',
      beforeEnter: (to, from, next) => {
        store.commit('logout')
        next('/login')
      }
    }, {
      path: '/class',
      name: 'Class',
      component: Class,
      meta: {
        'type': 'login',
        'title': '班级'
      }
    }, {
      path: '/student',
      name: 'Student',
      component: Student,
      meta: {
        'type': 'login',
        'title': '学生'
      }
    }, {
      path: '/addScore/:paperId',
      name: 'AddScore',
      component: AddScore,
      meta: {
        'type': 'login',
        'title': '添加成绩'
      }
    }, {
      path: '/paperList',
      name: 'PaperList',
      component: PaperList,
      meta: {
        'type': 'login',
        'title': '我的试卷列表'
      }
    }, {
      path: '/addPaper',
      name: 'AddPaper',
      component: AddPaper,
      meta: {
        'type': 'login',
        'title': '添加试卷'
      }
    }, {
      path: '/paperScore/:paperId',
      name: 'PaperScore',
      component: PaperScore,
      meta: {
        'type': 'login',
        'title': '试卷详情'
      }
    }, {
      path: '/classDetail/:classId',
      name: 'ClassDetail',
      component: ClassDetail,
      meta: {
        'type': 'login',
        'title': '班级详情'
      }
    }, {
      path: '/addTeacher',
      name: 'AddTeacher',
      component: AddTeacher,
      meta: {
        'type': 'login',
        'title': '添加用户'
      }
    }
  ]
})
