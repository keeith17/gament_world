import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "../pages/Home";
import Letter from "../pages/Letter";
import Result from "../pages/Result";

export default function Router() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/letter/:id" element={<Letter />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
