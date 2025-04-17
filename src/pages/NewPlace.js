import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/auth-hook";
import '../styles/NewPlace.css';
const NewPlace = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:5000/api/places', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description,
          address,
          location: { latitude, longitude },
          photoUrl,
          creatorId: user?.id 
        })
      });
  
      if (!response.ok) {
        throw new Error('Failed to add place');
      }
  
      const data = await response.json();
      console.log("Place added:", data.place);
      navigate(`/${user?.id}/places`);
    } catch (error) {
      console.error("Error adding place:", error);
    }
  };
  


  return (
    <div className="add-place-container">
      <h2 className="title">Шинэ газар нэмэх</h2>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Гарчиг"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Тайлбар"
          required
        />
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Хаяг"
          required
        />
        <input
          type="number"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          placeholder="Өргөрөг"
          required
        />
        <input
          type="number"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          placeholder="Уртраг"
          required
        />
        <input
          type="url"
          value={photoUrl}
          onChange={(e) => setPhotoUrl(e.target.value)}
          placeholder="Зураг (URL)"
          required
        />

        <button className="auth-button" type="submit">Нэмэх</button>
      </form>
    </div>
  );
};

export default NewPlace;
