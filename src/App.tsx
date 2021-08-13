import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { ROUTE_PATH } from "~utils";
import { MainPage, UserDetailedInfo, Header } from "~components";

const TOAST_AUTO_CLOSER_MS = 2000;

export const App: React.FC = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <ToastContainer position="top-center" autoClose={TOAST_AUTO_CLOSER_MS} />
      <Header />
      <Switch>
        <Route exact path={ROUTE_PATH.MAIN_PAGE} component={MainPage} />
        <Route exact path={ROUTE_PATH.USER_DETAILED_INFO} component={UserDetailedInfo} />
      </Switch>
    </Router>
  );
};
