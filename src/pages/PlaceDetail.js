import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/PlaceDetail.css";

const PlaceDetail = () => {
  const { placeId } = useParams();
  const navigate = useNavigate();
  const [place, setPlace] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  // Fetch place data from backend
  useEffect(() => {
    fetch(`http://localhost:5000/api/places/${placeId}`)
      .then((res) => res.json())
      .then((data) => {
        setPlace(data.place);
        setTitle(data.place.title);
        setDescription(data.place.description);
        setAddress(data.place.address);
        setPhotoUrl(data.place.photoUrl);
        setLatitude(data.place.location.lat);
        setLongitude(data.place.location.lng);
      })
      .catch((err) => console.error("Error fetching place data:", err));
  }, [placeId]);

  if (!place) {
    return <p className="loading-message">Түр хүлээнэ үү...</p>;
  }

  // Update place data in backend
  const updatePlace = async () => {
    await fetch(`http://localhost:5000/api/places/${placeId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, address, photoUrl, location: { lat: latitude, lng: longitude } })
    });
    setPlace({ ...place, title, description, address, photoUrl, location: { lat: latitude, lng: longitude } });
    setIsEditing(false);
  };

  // Delete place from backend
  const deletePlace = async () => {
    await fetch(`http://localhost:5000/api/places/${placeId}`, {
      method: 'DELETE',
    });
    navigate("/");
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTitle(place.title);
    setDescription(place.description);
    setAddress(place.address);
    setPhotoUrl(place.photoUrl);
    setLatitude(place.location.lat);
    setLongitude(place.location.lng);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="place-detail-container">
      <button className="back-button" onClick={handleBack}>
        Буцах
      </button>
      <div
        className="place-detail-background"
        style={{ backgroundImage: `url(${photoUrl})` }}
      ></div>
      <div className="place-detail-top">
        <img className="place-detail-image" src={photoUrl} alt={title} />
        <div className="place-detail-info">
          {isEditing ? (
            <>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="edit-input"
                placeholder="Гарчиг"
              />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="edit-textarea"
                placeholder="Тайлбар"
              />
            </>
          ) : (
            <>
              <h2 className="place-detail-title">{title}</h2>
              <p className="place-detail-description">{description}</p>
            </>
          )}
        </div>
      </div>
      <div className="place-detail-bottom">
        {isEditing ? (
          <>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="edit-input"
              placeholder="Хаяг"
            />
            <input
              type="url"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              className="edit-input"
              placeholder="Зураг (Photo URL)"
            />
            <input
              type="number"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              className="edit-input"
              placeholder="Өргөрөг (Latitude)"
            />
            <input
              type="number"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              className="edit-input"
              placeholder="Уртраг (Longitude)"
            />
            <div className="place-detail-actions">
              <button className="save-button" onClick={updatePlace}>
                Хадгалах
              </button>
              <button className="cancel-button" onClick={handleCancel}>
                Болих
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="place-detail-address">Хаяг: {address}</p>
            <p className="place-detail-location">
              Байршил: Өргөрөг {place.location.lat}, Уртраг {place.location.lng}
            </p>
            <div className="place-detail-actions">
              <button className="edit-button" onClick={() => setIsEditing(true)}>
                Засах
              </button>
              <button className="delete-button" onClick={deletePlace}>
                Устгах
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PlaceDetail;
