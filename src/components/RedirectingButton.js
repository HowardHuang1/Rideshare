import React from 'react';
import {useNavigate} from 'react-router-dom';
import "./RedirectingButton.css";

export default function RedirectingButton({destination, value}){
    const navigate = useNavigate();

    function scrollToTop() {
        window.scrollTo({
          top: 0,
          behavior: 'auto',
        });
      }

    return (
        <div className = "redirectingButton">
            <button className="btn" onClick={() => {scrollToTop(); navigate(destination);}}>{value}</button>
        </div>
    );
}