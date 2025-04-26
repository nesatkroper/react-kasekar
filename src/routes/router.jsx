import React, { Suspense, lazy } from "react";
import { useAuth } from "@/providers/auth-provider";
import { ProtectedRoute } from "@/routes/protect-route";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import NotFound from "@/components/app/404";
import OfflinePage from "@/components/app/offline";
import LazyLoading from "@/components/app/loading";
import ErrorBoundary from "@/components/app/error";
import RouteTitle from "@/components/app/route-title";

const POS = lazy(() => import("@/pages/pos"));
const Dashboard = lazy(() => import("@/pages/dashboard"));
const Department = lazy(() => import("@/pages/department"));
const Position = lazy(() => import("@/pages/position"));
const Employee = lazy(() => import("@/pages/employee"));
const Product = lazy(() => import("@/pages/product"));
const ProductCategory = lazy(() => import("@/pages/category"));
const Authentication = lazy(() => import("@/pages/authentication"));
const Home = lazy(() => import("@/pages/home"));
const Auth = lazy(() => import("@/pages/auth"));
const Customer = lazy(() => import("@/pages/customer"));
const Test = lazy(() => import("@/pages/test"));

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
    { path: "/offline", element: <OfflinePage /> },
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
        { path: "/admin/auth", element: <Navigate to='/' /> },
        { path: "/home", element: LazyLoad(Home)() },
        { path: "/dashboard", element: LazyLoad(Dashboard)() },
        { path: "/department", element: LazyLoad(Department)() },
        { path: "/position", element: LazyLoad(Position)() },
        { path: "/customer", element: LazyLoad(Customer)() },
        { path: "/employee", element: LazyLoad(Employee)() },
        { path: "/pos", element: LazyLoad(POS)() },
        { path: "/product", element: LazyLoad(Product)() },
        { path: "/category", element: LazyLoad(ProductCategory)() },
        { path: "/authentication", element: LazyLoad(Authentication)() },
        { path: "*", element: <NotFound /> },
      ],
    },
  ];

  const routesForNotAuthenticatedOnly = [
    {
      path: "/admin/auth",
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
