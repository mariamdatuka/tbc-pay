import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import FormFill from "./pages/FormFill";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path="/" element={<Home />} />
          <Route path="/form" element={<FormFill />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
