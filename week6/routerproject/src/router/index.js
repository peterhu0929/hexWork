import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Cart from "../views/Cart.vue";
import Products from "../views/Products.vue";
import Order from "../views/Order.vue";
import OrderFinish from "../views/OrderFinish.vue";
import Dashboard from "../views/dashboard/Dashboard.vue";
import Product from "../views/Product.vue";

Vue.use(VueRouter);

const routes = [{
        path: "/",
        component: Home
    },
    {
        path: "/about",
        component: () =>
            import ("../views/About.vue")
    },
    {
        path: "/cart",
        component: Cart
    }, {
        path: "/products",
        component: Products
    }, {
        path: "/product/:id",
        component: Product
    }, {
        path: "/order",
        component: Order
    }, {
        path: "/orderfinish",
        component: OrderFinish
    }, {
        path: "/admin",
        component: Dashboard,
        children: [{
                path: 'products',
                component: () =>
                    import ('../views/dashboard/Products.vue')
            },
            {
                path: 'coupons',
                component: () =>
                    import ('../views/dashboard/Coupons.vue')
            },
            {
                path: 'orders',
                component: () =>
                    import ('../views/dashboard/Orders.vue')
            },
            {
                path: 'images',
                component: () =>
                    import ('../views/dashboard/Images.vue')
            }
        ]
    }
];

const router = new VueRouter({
    routes
});

export default router;