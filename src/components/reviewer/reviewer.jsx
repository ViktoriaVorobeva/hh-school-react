import { useState } from "react";
import {
  getResultFromLocalStorage,
  saveResultInLocalStorage,
} from "../../utils/localStorage";

function Reviewer({ login, url }) {
  return (
    <>
      <p>Your reviewer: </p>
      <p>{login}</p>
      <a href={url}>{url}</a>
    </>
  );
}

export default Reviewer;
