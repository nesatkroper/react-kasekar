import React, { Suspense, lazy } from "react";
import { useAuth } from "@/providers/auth-provider";
import { ProtectedRoute } from "@/routes/protect-route";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import RoleRoute from "./permission";
import { ROLES } from "@/constants/role";
import NotFound from "@/components/app/404";
import ForbiddenPage from "@/components/app/403";
import OfflinePage from "@/components/app/offline";
import LazyLoading from "@/components/app/loading";
import ErrorBoundary from "@/components/app/error";
import RouteTitle from "@/components/app/route-title";

const POS = lazy(() => import("@/pages/pos"));
const Home = lazy(() => import("@/pages/home"));
const Auth = lazy(() => import("@/pages/auth"));
const Test = lazy(() => import("@/pages/test"));
const Brand = lazy(() => import("@/pages/brand"));
const Test2 = lazy(() => import("@/pages/test2"));
const Product = lazy(() => import("@/pages/product"));
const Category = lazy(() => import("@/pages/category"));
const Customer = lazy(() => import("@/pages/customer"));
const Position = lazy(() => import("@/pages/position"));
const Employee = lazy(() => import("@/pages/employee"));
const Dashboard = lazy(() => import("@/pages/dashboard"));
const Department = lazy(() => import("@/pages/department"));
const Authentication = lazy(() => import("@/pages/authentication"));
const CustomerDetail = lazy(() => import("@/pages/customer/detail"));

const LazyLoad = (Component) => {
  const WrappedComponent = (props) => (
    <Suspense
      fallback={
        <div className='flex justify-center items-center h-[90vh]'>
          <LazyLoading
            size='large'
            color='secondary'
            text='Loading Component Web App'
          />
        </div>
      }>
      <Component {...props} />
    </Suspense>
  );

  WrappedComponent.displayName = `LazyLoad(${
    Component.displayName || Component.name || "Component"
  })`;

  return WrappedComponent;
};

const Routes = () => {
  const { token } = useAuth();

  const routesForPublic = [
    { path: "*", element: <NotFound /> },
    { path: "/test", element: LazyLoad(Test)() },
    { path: "/test2", element: LazyLoad(Test2)() },
    { path: "/offline", element: <OfflinePage /> },
    { path: "/forbidden", element: <ForbiddenPage /> },
  ];

  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: (
        <>
          <RouteTitle />
          <ProtectedRoute />
        </>
      ),
      children: [
        { path: "/auth", element: <Navigate to='/' /> },
        { path: "/", element: LazyLoad(Home)() },
        { path: "/home", element: LazyLoad(Home)() },
        { path: "/dashboard", element: LazyLoad(Dashboard)() },
        {
          path: "/department",
          element: <RoleRoute minimumRole={ROLES.MANAGEMENT} />,
          children: [{ path: "", element: LazyLoad(Department)() }],
        },
        {
          path: "/position",
          element: <RoleRoute minimumRole={ROLES.MANAGEMENT} />,
          children: [{ path: "", element: LazyLoad(Position)() }],
        },
        {
          path: "/customer",
          element: <RoleRoute minimumRole={ROLES.MANAGEMENT} />,
          children: [
            { path: "", element: LazyLoad(Customer)() },
            { path: ":customerId", element: LazyLoad(CustomerDetail)() },
          ],
        },
        {
          path: "/employee",
          element: <RoleRoute minimumRole={ROLES.MANAGEMENT} />,
          children: [{ path: "", element: LazyLoad(Employee)() }],
        },
        {
          path: "/pos",
          element: <RoleRoute minimumRole={ROLES.MANAGEMENT} />,
          children: [{ path: "", element: LazyLoad(POS)() }],
        },
        {
          path: "/product",
          element: <RoleRoute minimumRole={ROLES.MANAGEMENT} />,
          children: [{ path: "", element: LazyLoad(Product)() }],
        },
        {
          path: "/category",
          element: <RoleRoute minimumRole={ROLES.MANAGEMENT} />,
          children: [{ path: "", element: LazyLoad(Category)() }],
        },
        {
          path: "/brand",
          element: <RoleRoute minimumRole={ROLES.MANAGEMENT} />,
          children: [{ path: "", element: LazyLoad(Brand)() }],
        },
        {
          path: "/authentication",
          element: <RoleRoute minimumRole={ROLES.MANAGEMENT} />,
          children: [{ path: "", element: LazyLoad(Authentication)() }],
        },
        { path: "*", element: <NotFound /> },
      ],
    },
  ];

  const routesForNotAuthenticatedOnly = [
    {
      path: "/auth",
      element: (
        <>
          <RouteTitle />
          {LazyLoad(Auth)()}
        </>
      ),
    },
  ];

  const router = createBrowserRouter([
    ...routesForPublic,
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
};

export default Routes;
