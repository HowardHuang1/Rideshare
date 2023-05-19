import React from 'react';
import {useNavigate} from 'react-router-dom';

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
            <button onClick={() => {scrollToTop(); navigate(destination);}}>{value}</button>
        </div>
    );
}