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

  const submitHandler = (event) => {
    event.preventDefault();

    const newPlace = {
      id: Date.now().toString(), 
      title,
      description,
      address,
      location: { lat: latitude, lng: longitude },
      photoUrl,
      userId: user.id, 
    };
  
    const storedPlaces = JSON.parse(localStorage.getItem("places")) || [];
  
    const updatedPlaces = [...storedPlaces, newPlace];
  
    localStorage.setItem("places", JSON.stringify(updatedPlaces));
  
    console.log("Nemegdsen gazar:", newPlace);
  
    navigate(`/${user?.id}/places`);
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
