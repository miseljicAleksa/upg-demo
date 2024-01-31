import { Routes, Route, Navigate } from "react-router-dom";
import AuthorizedApp from "./components/AuthorizedApp";
import UnauthorizedApp from "./components/UnauthorizedApp/UnauthorizedApp";
import AuhtorizedRoute from "./features/auth/AuhtorizedRoute";
import TextContainter from "./components/TextContainer/TextContainter";
import TodoList from "./features/todos/TodoList";
import NotFound from "./components/NotFound";

function App() {
  return (
    <Routes>
      <Route element={<AuthorizedApp />}>
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/login" element={<UnauthorizedApp />} />
        <Route index path="/home" element={<TextContainter title="Home" />} />
        <Route path="/about" element={<TextContainter title="About" />} />
        <Route element={<AuhtorizedRoute />}>
          <Route path="/todos" element={<TodoList />} />
        </Route>
        <Route path="/*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
