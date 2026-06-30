import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import Header from "./Header";
import Home from "./../pages/Home";
import ScrollToTop from './ScrollToTop';

const Detail = lazy(() => import("../pages/Detail"));

function Layout() {
  return (
    <>
      <Header/>
      <ScrollToTop/>
      <main>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="work/:id" element={
            <Suspense fallback={null}>
              <Detail />
            </Suspense>
          }/>
        </Routes>
      </main>
    </>
  );
}
export default Layout;
