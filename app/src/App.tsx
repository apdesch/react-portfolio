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

interface IRoute {
  path: string;
  element: JSX.Element;
}

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
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
