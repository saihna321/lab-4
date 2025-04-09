import React from "react";
import { useParams } from "react-router-dom";

const EditPlace = () => {
  const { pid } = useParams();

  return (
    <div>
      <h2>Газар өөрчлөх {pid}</h2>
      <p>Газрын мэдээлэл өөрчлөх.</p>
    </div>
  );
};

export default EditPlace;
