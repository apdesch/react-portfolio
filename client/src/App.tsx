import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "routes/Layout";
import NotFound from "routes/NotFound";
import Home from "routes/Home";
import About from "routes/About";
import Blog from "routes/Blog";
import Gallery from "routes/Gallery";
import Resume from "routes/Resume";
import Projects from "routes/admin/Projects";
import PrivateRoutes from "routes/PrivateRoutes";
import Dashboard from "routes/admin/Dashboard";
import AdminLayout from "routes/admin/Layout";
import SignIn from "routes/admin/SignIn";
import Assets from "routes/admin/Assets";

const App: React.FC = (): JSX.Element => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="blog" element={<Blog />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="projects" element={<Projects />} />
        <Route path="resume" element={<Resume />} />
      </Route>
      <Route path="admin" element={<AdminLayout />}>
        <Route path="login" element={<SignIn />} />
        <Route element={<PrivateRoutes />}>
          <Route index element={<Dashboard />} />
          <Route path="assets" element={<Assets />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
