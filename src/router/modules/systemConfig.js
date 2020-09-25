/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const systemConfigRouter = {
    path: '/systemConfig',
    component: () =>
      import ('@/layout'),
    redirect: '/systemConfig/user',
    name: 'System',
    meta: {
        title: '系统管理',
        icon: 'settings'
    },
    children: [{
            path: 'user',
            name: 'user',
            meta: { title: '账号管理' },
            children: [{
              path: 'role',
              component: () =>
                import ('@/views/systemConfig/role/index'),
              name: 'role',
              meta: { title: '角色管理' }
            },{
              path: 'department',
              component: () =>
                import ('@/views/systemConfig/department/index'),
              name: 'department',
              meta: { title: '部门管理' }
            }]
        },
        {
            path: 'role',
            component: () =>
                import ('@/views/systemConfig/role/index'),
            name: 'role',
            meta: { title: '角色管理' }
        },
        {
            path: 'department',
            component: () =>
                import ('@/views/systemConfig/department/index'),
            name: 'department',
            meta: { title: '部门管理' }
        },
        {
            path: 'module',
            component: () =>
                import ('@/views/systemConfig/module/index'),
            name: 'module',
            meta: { title: '模块管理' }
        },
        {
            path: 'dictionary',
            component: () =>
                import ('@/views/systemConfig/dictionary/index'),
            name: 'dictionary',
            meta: { title: '字典管理' },
        },
        {
            path: '/dictionary/list',
            component: () =>
                import ('@/views/systemConfig/dictionary/list'),
            name: 'list',
            meta: { title: '字典标签' },
            hidden: true
        },
        {
            path: '' +
              '',
            component: () =>
                import ('@/views/systemConfig/parameter/index'),
            name: 'parameter',
            meta: { title: '参数设置' }
        },
        {
            path: '/user/updatePassword',
            component: () =>
                import ('@/views/systemConfig/user/updatePassword'),
            name: 'updatePassword',
            meta: { title: '修改密码' },
            hidden: true
        }
    ]
}
export default systemConfigRouter
