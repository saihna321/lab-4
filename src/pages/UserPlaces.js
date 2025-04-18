import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/auth-hook"; 
import '../styles/UserPlaces.css';

const UserPlaces = () => {
  const { uid } = useParams();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [userPlaces, setUserPlaces] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/places/user/${uid}`)
      .then((res) => res.json())
      .then((data) => setUserPlaces(data.places))
      .catch((error) => {
        console.error("Error fetching user places:", error);
      });
  }, [uid]);

  if (loading) return <p className="loading-message">Түр хүлээнэ үү...</p>;

  const handleAddPlaceClick = () => {
    if (user) {
      navigate("/places/new");
    } else {
      navigate("/authenticate");
    }
  };

  const handlePlaceClick = (placeId) => {
    if (user) {
      navigate(`/places/${placeId}`);
    } else {
      navigate("/authenticate");
    }
  };

  return (
    <div className="user-places-container">
      <h2 className="user-places-title">{uid}-ийн нэмсэн газрууд</h2>

      <button className="add" onClick={handleAddPlaceClick}>
        Шинэ газар нэмэх
      </button>

      <ul className="places-list">
        {userPlaces.map((place) => (
          <li
            key={place.id}
            className="place-item"
            onClick={() => handlePlaceClick(place.id)}
          >
            <div className="place-link">
              <img className="place-image" src={place.photoUrl} alt={place.title} />
              <h3 className="place-title">{place.title}</h3>
              <p className="place-description">{place.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserPlaces;
