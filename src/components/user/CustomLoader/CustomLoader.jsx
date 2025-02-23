import React from 'react'
import { ClipLoader } from "react-spinners";

export default function CustomLoader({loading}) {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)", 
        zIndex: 9999, 
      }}
    >
      <ClipLoader color="red" size={70} />
    </div>
  )
}
