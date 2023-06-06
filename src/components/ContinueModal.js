import React, { useState } from "react";
import "./Modal.css";
import { RiCloseLine } from "react-icons/ri";
import "font-awesome/css/font-awesome.min.css";
import axios from "axios";
import { set } from "mongoose";

function ContinueModal({ setIsOpen, onSubmit }) {

  return (
    <div>
      <div className="darkBG centered">
        <div className="centered">
          <div className="modal">
            <div className="modalHeader">
              <h5 className="title">Alert</h5>
            </div>
            <button className="closeButton" onClick={() => setIsOpen(false)}>
              <RiCloseLine style={{ marginBottom: "-3px" }} />
            </button>
            <div className="modalContent">
              ARE YOU SURE YOU WOULD LIKE TO CONTINUE? THERE ARE EXISTING RIDES!
            </div>
            <div className="modalActions">
              <button className="continueButton" onClick={() => setIsOpen(false)}>
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 

export default ContinueModal;
