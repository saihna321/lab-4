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

  const submitHandler = (event) => {
    event.preventDefault();
  
    if (!isLogin) {
      const newUser = { id: Date.now().toString(), name, email, password, photoUrl };
  
      const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
  
      storedUsers.push(newUser);
  
      localStorage.setItem("users", JSON.stringify(storedUsers));
  
      console.log("Бүртгэгдсэн хэрэглэгч:", newUser);
  
      login({ id: newUser.id, name: newUser.name, email: newUser.email });
      navigate("/");
      return;
    }
  
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
  const existingUser = storedUsers.find(
    (user) => user.email === email && user.password === password
  );

  if (existingUser) {
    login({ id: existingUser.id, name: existingUser.name, email: existingUser.email });
    navigate("/");
  } else {
    alert("И-мэйл эсвэл нууц үг буруу байна.");
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
        
        <button className="auth-button" type="submit">{isLogin ? "Нэвтрэх" : "Бүртгүүлэх"}</button>
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
