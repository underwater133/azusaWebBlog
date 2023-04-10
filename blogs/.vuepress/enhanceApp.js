// 改用 valine 的访问量统计了
// import { getPV } from "../util/api";
// import Vue from 'vue'
// export default ({ router, isServer }) => {
//   // 路由切换事件处理
//   router.beforeEach(async (to, from, next) => {
//     Vue.prototype.isServer = isServer
//     const flag = to.path == '/' || to.path == '/tag/' || to.path.indexOf('/categories/') >= 0
//     //触发百度的pv统计
//     if (typeof _hmt != "undefined") {
//       if (to.path && (flag || to.path != from.path)) {
//         _hmt.push(["_trackPageview", to.path]);
//         // 失败过一次就不再请求了
//         if(Vue.prototype.showPV === undefined || Vue.prototype.showPV) {
//           await getPV().then(res => {
//             let pv = {}
//             if (res.error_code) {
//               // Access token 过期了
//             } else {
//               const items = res.data.result.items || []
//               const page = items[0] || [], vis = items[1] || []
//               const n = page.length
//               if(flag) {
//                 let total = 0
//                 page.forEach((value, index) => {
//                   if(value[0].name.indexOf(window.location.origin) > -1) {
//                     total += vis[index][0]
//                   }
//                 })
//                 pv['home'] = total
//                 for(let i = 0; i < n; i++) {
//                   pv[page[i][0].name] = vis[i][0]
//                 }
//               } else {
//                 const pathUrl = window.location.origin + to.path
//                 for(let i = 0; i < n; i++) {
//                   if(page[i][0].name == pathUrl) {
//                     pv[pathUrl] = vis[i][0]
//                     break
//                   }
//                 }
//               }
//             }
//             Vue.prototype.showPV = true
//             Vue.prototype.pv = pv
//           }).catch(err => {
//             console.log(err)
//             Vue.prototype.showPV = false
//           })
//         }

//       }
//     }
//     next();
//   });
// };
