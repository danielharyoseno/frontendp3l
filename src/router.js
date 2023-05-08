import { createRouter, createWebHistory } from "vue-router";
//define a routes
const routes = [
  {
    path: "/",

    name: "beranda",
    component: () => import("@/components/DashboardLayout.vue"),

    children: [
      {
        path: "/instruktur",
        name: "instruktur.index",
        component: () => import("@/views/Instruktur/indexPage.vue"),
      },
      {
        path: "/instruktur/create",
        name: "instruktur.create",
        component: () => import("@/views/Instruktur/createPage.vue"),
      },
      {
        path: "/instruktur/update",
        name: "instruktur.edit",
        component: () => import("@/views/Instruktur/updatePage.vue"),
      },
      {
        path: "/member",
        name: "member.index",
        component: () => import("@/views/Member/indexPage.vue"),
      },
      {
        path: "/member/create",
        name: "member.create",
        component: () => import("@/views/Member/createPage.vue"),
      },
      {
        path: "/member/create",
        name: "member.edit",
        component: () => import("@/views/Member/updatePage.vue"),
      },
      {
        path: "/jadwalumum",
        name: "jadwalumum.index",
        component: () => import("@/views/JadwalUmum/indexPage.vue"),
      },
      {
        path: "/jadwalumum/create",
        name: "jadwalumum.create",
        component: () => import("@/views/JadwalUmum/createPage.vue"),
      },
      {
        path: "/jadwalumum/edit",
        name: "jadwalumum.edit",
        component: () => import("@/views/JadwalUmum/updatePage.vue"),
      },
    ],
  },
];
//create router
const router = createRouter({
  history: createWebHistory(),
  routes, // config routes
});
export default router;
