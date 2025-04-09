import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/auth-hook"; 
import '../styles/Home.css';

export default function Home() {
  const { user, logout } = useAuth(); 
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from localStorage
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);

  return (
    <div>
      <header>
        <h1>Нүүр хуудас</h1>
        {user ? (
          <div className="user-info">
            <span>Сайн уу, {user.name}!</span>
            <button className="auth-page" onClick={logout}>Гарах</button>
          </div>
        ) : (
          <Link to="/authenticate">
            <button className="auth-page">Бүртгүүлэх/Нэвтрэх</button>
          </Link>
        )}
      </header>
      <div className="home-container">
        <h2>Хэрэглэгчид</h2>
        <div className="users-grid">
          {users.length > 0 ? (
            users.map((user) => (
              <Link to={`/${user.id}/places`} key={user.id} className="user-card-link">
                <div className="user-card">
                  <img
                    className="profile-avatar"
                    src={user.photoUrl || "default-avatar.png"} // Fallback to a default avatar
                    alt={user.name}
                  />
                  <h3>{user.name}</h3>
                </div>
              </Link>
            ))
          ) : (
            <p>Одоогоор бүртгэлтэй хэрэглэгч байхгүй байна.</p>
          )}
        </div>
      </div>
    </div>
  );
}