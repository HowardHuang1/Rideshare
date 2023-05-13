import React from 'react';
import {useNavigate} from 'react-router-dom';

export default function RedirectingButton({destination, value}){
    const navigate = useNavigate();


    return (
        <div className = "redirectingButton">
            <button onClick={() => {navigate(destination);}}>{value}</button>
        </div>
    );
}