import { Fragment, useState } from "react";
import Header from "./components/layout/header";
import Footer from "./components/layout/footer";
import { Outlet } from "react-router-dom";



const App = () => {
  return (
    <Fragment>
      <Header />

      <Outlet />
      <Footer />
    </Fragment>
  );
};

export default App;
