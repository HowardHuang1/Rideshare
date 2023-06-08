import React, { useState } from "react";
import "./NoUpdateModal.css";
import { RiCloseLine } from "react-icons/ri";
import "font-awesome/css/font-awesome.min.css";



function NoUpdateModal({
    setIsOpen
}) {

  return (
    <div>
      <div className="darkBG centered">
        <div className="centered">
          <div className="modal" style={{ height: "100px" }}>
            <div className="modalHeader">
              <h5 className="title">Alert</h5>
            </div>
            <button className="closeButton" onClick={() => setIsOpen(false)}>
              <RiCloseLine style={{ marginBottom: "-3px" }} />
            </button>
            <div className="modalContent">
              Only the original creater can update the ride. 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoUpdateModal;
