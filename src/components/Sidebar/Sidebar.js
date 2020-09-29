import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Sidebar({icon, title, active, handleClick}) {
  return (
    // <div className="buttons-container">
      <button className={`button ${ active ? 'active': ''}`} title={`${title}`} onClick={handleClick}>
        <FontAwesomeIcon icon = {`${icon}`} size="2x" color="white"/>
      </button>
    // </div>
  )
}
