import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Shop from "../views/Shop.vue";
import ViewCar from "../views/dynamic/ViewCar.vue";
import SellCar from "../views/SellCar.vue";
import Contact from "../views/Contact.vue";
import AboutUs from "../views/AboutUs.vue";
import Faqs from "../views/Faqs.vue";
import Blogs from "../views/Blogs.vue";
import ViewBlog from "../views/dynamic/ViewBlog.vue";
import Reviews from "../views/Reviews.vue";
import TermsOfUse from "../views/TermsOfUse.vue";
import PrivacyPolicy from "../views/PrivacyPolicy.vue";
import NotFound from "../views/NotFound.vue";
import LeaveReview from "../views/LeaveReview.vue";
import Import from "../views/Import.vue";

const routes = [
  { path: "/:pathMatch(.*)*", name: "Not Found", component: NotFound },
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/vehicles",
    name: "Shop",
    component: Shop,
  },
  {
    path: "/:id",
    path: "/vehicles/view/:id/:title",
    name: "View Car",
    component: ViewCar,
    props: true,
  },
  {
    path: "/sell-car",
    name: "Sell Car",
    component: SellCar,
  },
  {
    path: "/contact-us",
    name: "Contact us",
    component: Contact,
  },
  {
    path: "/about-us",
    name: "About us",
    component: AboutUs,
  },
  {
    path: "/faqs",
    name: "Faqs",
    component: Faqs,
  },
  {
    path: "/blogs",
    name: "Blogs",
    component: Blogs,
  },
  {
    path: "/blogs/view/:id/:title",
    name: "Read Blog",
    component: ViewBlog,
    props: true,
  },
  {
    path: "/reviews",
    name: "Reviews",
    component: Reviews,
  },
  {
    path: "/terms-of-use",
    name: "Terms of use",
    component: TermsOfUse,
  },
  {
    path: "/privacy-policy",
    name: "Privacy Policy",
    component: PrivacyPolicy,
  },
  {
    path: "/leave-review",
    name: "Leave A Review",
    component: LeaveReview,
  },
  {
    path: "/import-vehicle",
    name: "Import Vehicles",
    component: Import,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
