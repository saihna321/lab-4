import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import UserPlaces from "./pages/UserPlaces";
import Authenticate from "./pages/Authenticate";
import NewPlace from "./pages/NewPlace";
import EditPlace from "./pages/EditPlace";
import { useAuth } from "./hooks/auth-hook";
import './App.css';
import PlaceDetail from "./pages/PlaceDetail";

const App = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Түр хүлээнэ үү...</div>; 
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:uid/places" element={<UserPlaces />} />
        <Route path="/places/:placeId" element={<PlaceDetail />} />

        <Route 
          path="/authenticate" 
          element={<Authenticate/>}/>
        <Route path="/places/new" element={user ? <NewPlace /> : <Navigate to="/authenticate" />} />
        <Route path="/places/:pid" element={user ? <EditPlace /> : <Navigate to="/authenticate" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
