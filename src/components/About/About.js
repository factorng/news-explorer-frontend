import React, { useCallback, useEffect, useState } from "react";
import "./About.css";
import my_foto from "../../images/my_foto.jpg";

function About() {
  return (
    <section className="about">
        <img className="about__image" src={my_foto} alt="фотография автора"></img>
        <section className="about__info">
          <h2 className="about__title">Об авторе</h2>
          <p className="about__text">
            Это блок с описанием автора проекта. Здесь следует указать, как вас
            зовут, чем вы занимаетесь, какими технологиями разработки владеете.
          </p>
          <p className="about__text">
            Также можно рассказать о процессе обучения в Практикуме, чему вы тут
            научились, и чем можете помочь потенциальным заказчикам.
          </p>
        </section>
    </section>
  );
}

export default About;
