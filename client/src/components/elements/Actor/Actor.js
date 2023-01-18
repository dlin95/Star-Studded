import React from "react";
import { IMAGE_BASE_URL } from "../../../config";
import no_image from "./no_image.jpg";
import "./Actor.css";

const Actor = (props) => {
  const POSTER_SIZE = "w154";

  return (
    <div className="actor">
      <img
        src={
          props.actor.profile_path
            ? `${IMAGE_BASE_URL}${POSTER_SIZE}${props.actor.profile_path}`
            : no_image
        }
        alt="actor thumbnail"
      />
      <span className="actor-name">{props.actor.name}</span>
      <span className="actor-character">{props.actor.character}</span>
    </div>
  );
};

export default Actor;
