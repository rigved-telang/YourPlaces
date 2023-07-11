import { Routes, Route, Navigate } from "react-router-dom";
import Users from "./user/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import "./App.css";
import ResponsiveAppBar from "./shared/components/Navigation/ResponsiveAppBar";
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlace from "./places/pages/UpdatePlace";

import { UserContext } from "./shared/context/auth-context";
import LoginPage from "./user/pages/LoginPage";
import SignUpPage from "./user/pages/SignUpPage";

import { useAuth } from "./shared/hooks/auth-hook";

function App() {
  const { token, login, logout, userId } = useAuth();

  let routes;

  if (token) {
    routes = (
      <>
        <Route path="/" element={<Users />} />
        <Route path="/places/new" element={<NewPlace />} />
        <Route path="/:userId/places" element={<UserPlaces />} />
        <Route path="/places/:placeId" element={<UpdatePlace />} />
        <Route path="*" element={<Navigate to="/" />} />
      </>
    );
  } else {
    routes = (
      <>
        <Route path="/" element={<Users />} />
        <Route path="/auth" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/:userId/places" element={<UserPlaces />} />
        <Route path="*" element={<Navigate to="/auth" />} />
      </>
    );
  }

  return (
    <div className="App">
      <UserContext.Provider
        value={{
          isLoggedIn: !!token,
          token: token,
          userId: userId,
          login: login,
          logout: logout,
        }}
      >
        <ResponsiveAppBar />
        <Routes>{routes}</Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
