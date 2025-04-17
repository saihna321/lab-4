import React, { useState } from "react";
import { useAuth } from "../hooks/auth-hook";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";

const Authenticate = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");

  const API_URL = "http://localhost:5000/api/users";

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      if (!isLogin) {
        const response = await fetch(`${API_URL}/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password, photoUrl }),
        });

        const data = await response.json();

        if (!response.ok) throw new Error(data.message || "Бүртгэл амжилтгүй");

        login({
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          photoUrl: data.user.photoUrl,
        });
        navigate("/");
        return;
      }

      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Нэвтрэхэд алдаа гарлаа");

      login({
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        photoUrl: data.user.photoUrl,
      });

      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{isLogin ? "Нэвтрэх" : "Бүртгүүлэх"}</h2>
        <form onSubmit={submitHandler}>
          {!isLogin && (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Нэр"
              required
            />
          )}
          {!isLogin && (
            <input
              type="url"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              placeholder="Зураг (Photo URL)"
              required
            />
          )}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="И-мэйл"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Нууц үг"
            required
          />
          <button className="auth-button" type="submit">
            {isLogin ? "Нэвтрэх" : "Бүртгүүлэх"}
          </button>
        </form>
        <div className="bottom-elements">
          <p>{isLogin ? "Бүртгэлгүй хэрэглэгч бол:" : "Бүртгэлтэй хэрэглэгч бол:"}</p>
          <button className="change-btn" onClick={() => setIsLogin((prev) => !prev)}>
            {isLogin ? "Бүртгүүлэх" : "Нэвтрэх"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Authenticate;
