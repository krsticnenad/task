import { Navigate, Route, Routes } from "react-router-dom";
import { UsersView } from "./views/users";

function App() {
  return (
    <Routes>
      <Route path="/" element={<UsersView />} />
      {/* Placeholder for 404 handling. Real app should show a PageNotFound component */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
