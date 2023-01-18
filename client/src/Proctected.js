import { Navigate } from "react-router-dom";
import Login from "./pages/Login/Login";

const Protected = ({ currentUser, setCurrentUser, children }) => {
  if (!currentUser) {
    return <div className="App">
      <Login setCurrentUser={setCurrentUser} />;
    </div>;
  };
  return children;
};
export default Protected;