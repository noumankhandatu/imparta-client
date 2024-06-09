import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loading from "../components/loader";

const Login = lazy(() => import("../pages/login"));
const SignUp = lazy(() => import("../pages/signup"));
const NotFoundPage = lazy(() => import("../pages/404"));

const PublicRoutes: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          {["/", "/login"].map((path, index) => (
            <Route key={index} path={path} element={<Login />} />
          ))}
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default PublicRoutes;
