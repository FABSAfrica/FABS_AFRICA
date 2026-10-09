// Inside src/App.jsx
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import EpenaLaw from "./pages/EpenaLaw";
import Contact from "./pages/Contact";
import GenericPage from "./pages/GenericPage";
import BlogListing from "./pages/BlogListing";
import BlogPost from "./pages/BlogPost";
import Newsletter from "./pages/Newsletter";
import WhyLagos from "./pages/WhyLagos";
import Speakers from "./pages/Speakers";
import Speakers2025 from "./pages/Speakers2025";
import Accommodation from "./pages/Accommodation";
import Travel from "./pages/Travel";
import SideEventsProgram from "./pages/SideEventsProgram";
import SponsorsPage from "./pages/SponsorsPage";
import MainProgramPage from "./pages/MainProgramPage";
import RoadToFabs2025 from "./pages/RoadToFabs2025";
import DrcSipAndLearn from "./pages/DrcSipAndLearn";
import {
  nav,
  registerLink,
  contactLink,
  NEWSLETTER_PATH,
  BLOG_PATH,
  ROUTES,
} from "./data/navigation";

function collectPaths(items, set) {
  items.forEach((item) => {
    set.add(item.path);
    if (item.children?.length) {
      collectPaths(item.children, set);
    }
  });
}

const secondaryPaths = new Set();
collectPaths(nav, secondaryPaths);
secondaryPaths.add(registerLink.path);
secondaryPaths.add(contactLink.path);

[ROUTES.drcSipAndLearn].forEach((path) => secondaryPaths.add(path));

// Paths with their own dedicated <Route> must NOT also be generic stub pages.
[
  "/insights",
  NEWSLETTER_PATH,
  BLOG_PATH,
  ROUTES.about,
  ROUTES.epenaLaw,
  ROUTES.contact,
  ROUTES.accommodation,
  ROUTES.travel,
  ROUTES.sponsorship,
  ROUTES.fabs2024Speakers,
  ROUTES.fabs2024MainProgram,
  ROUTES.fabs2024SideEvents,
  ROUTES.fabs2025WhyLagos,
  ROUTES.fabs2025Speakers,
  ROUTES.roadToFabs2025,
  ROUTES.drcSipAndLearn,
].forEach((path) => secondaryPaths.delete(path));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path={ROUTES.about} element={<About />} />
          <Route path={ROUTES.epenaLaw} element={<EpenaLaw />} />
          <Route path={ROUTES.contact} element={<Contact />} />
          <Route path="/insights" element={<Navigate to={NEWSLETTER_PATH} replace />} />

          <Route path={NEWSLETTER_PATH} element={<Newsletter />} />

          <Route
            path={BLOG_PATH}
            element={
              <BlogListing
                mode="all"
                title="Blog"
                intro="Longer-form articles and analysis from the FABS and Epena Law team."
                basePath={BLOG_PATH}
              />
            }
          />
          <Route
            path={`${BLOG_PATH}/:slug`}
            element={<BlogPost basePath={BLOG_PATH} backLabel="Blog" />}
          />

          {/* Resources */}
          <Route path={ROUTES.accommodation} element={<Accommodation />} />
          <Route path={ROUTES.travel} element={<Travel />} />
          <Route path={ROUTES.sponsorship} element={<SponsorsPage year="2024" />} />

          {/* Past Events > FABS 2024 */}
          <Route path={ROUTES.fabs2024Speakers} element={<Speakers />} />
          <Route path={ROUTES.fabs2024MainProgram} element={<MainProgramPage />} />
          <Route path={ROUTES.fabs2024SideEvents} element={<SideEventsProgram />} />

          {/* Past Events > Road To FABS 2025 */}
          <Route path={ROUTES.roadToFabs2025} element={<RoadToFabs2025 />} />
          <Route path={ROUTES.drcSipAndLearn} element={<DrcSipAndLearn />} />

          {/* Past Events > FABS 2025 */}
          <Route path={ROUTES.fabs2025WhyLagos} element={<WhyLagos />} />
          <Route path={ROUTES.fabs2025Speakers} element={<Speakers2025 />} />

          {/* Everything else in the nav renders as a generic stub page */}
          {[...secondaryPaths].map((path) => (
            <Route key={path} path={path} element={<GenericPage />} />
          ))}

          <Route
            path="*"
            element={
              <div className="py-32 text-center">
                <p className="font-display text-3xl text-ink">Page not found</p>
              </div>
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}