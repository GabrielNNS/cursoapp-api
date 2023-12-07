import "./index.css";
import Professors from "./pages/Professors";
import Students from "./pages/Students";
import Courses from "./pages/Courses";
import Classrooms from "./pages/Classrooms";
import Course from "./pages/Course";
import Header from "./components/Header";
import AddCourse from "./pages/AddCourse";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./components/NotFound";
function App() {
  return (
    <BrowserRouter>
      <Header className="fixed">
        <Routes>
          <Route path="/" element={<Professors />} />
          <Route path="/professors" element={<Professors />} />
          <Route path="/students" element={<Students />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<Course />} />
          <Route path="/addcourse" element={<AddCourse />} />
          <Route path="/classrooms" element={<Classrooms />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Header>
    </BrowserRouter>
  );
}

export default App;
