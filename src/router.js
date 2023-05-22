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
        path: "/ijinInstruktur",
        name: "ijin.index",
        component: () => import("@/views/Instruktur/ijinPage.vue"),
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
        path: "/member/reset",
        name: "inst.reset",
        component: () => import("@/views/Member/resetPage.vue"),
      },
      {
        path: "/member/expired",
        name: "member.expired",
        component: () => import("@/views/Member/expiredPage.vue"),
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
      {
        path: "/jadwalharian",
        name: "jadwalharian.index",
        component: () => import("@/views/JadwalHarian/indexPage.vue"),
      },
      {
        path: "/transaksieposituang",
        name: "deposit.create",
        component: () => import("@/views/TransaksiDeposit/createPage.vue"),
      },
      {
        path: "/transaksiaktivasi",
        name: "aktivasi.create",
        component: () => import("@/views/TransaksiAktivasi/createPage.vue"),
      },
      {
        path: "/bookingGym",
        name: "BookingGym.index",
        component: () => import("@/views/Gym/indexPage.vue"),
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
