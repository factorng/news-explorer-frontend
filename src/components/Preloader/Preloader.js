import React from 'react';
import './Preloader.css';

function Preloader() {
    return (
        <section className="preloader">
            <i className="circle-preloader"></i>
            <p className="preloader__text">Поиск новостей...</p>
        </section>
    )
}

export default Preloader;