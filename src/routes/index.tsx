import React from "react";
import PublicRoutes from "./public-route";
import UserRoutes from "./user-routes";
import BossRoutes from "./boss-routes";

const USER = "user";
const BOSS = "boss";

const AppRoutes: React.FC = () => {
  let data = null;
  const userDataString = localStorage.getItem("userdata");
  if (userDataString) {
    data = JSON.parse(userDataString);
  }

  return (
    <>
      {data?.role === USER ? (
        <UserRoutes />
      ) : data?.role === BOSS ? (
        <BossRoutes />
      ) : (
        <PublicRoutes />
      )}
    </>
  );
};

export default AppRoutes;
