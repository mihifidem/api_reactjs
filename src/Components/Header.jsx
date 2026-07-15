import { useEffect, useState } from "react";
import "./Header.css";

const slides = [
  {
    title: "Diseño limpio",
    text: "Una portada dinámica que cambia automáticamente cada 5 segundos.",
    background: createSlideBackground("#0f172a", "#1d4ed8", "#38bdf8", "#22c55e", 1),
  },
  {
    title: "Movimiento continuo",
    text: "El carrusel desplaza el fondo para mostrar una nueva imagen en cada avance.",
    background: createSlideBackground("#111827", "#7c3aed", "#ec4899", "#f97316", 2),
  },
  {
    title: "Cinco imágenes",
    text: "El componente incluye cinco fondos distintos preparados para alternar en bucle.",
    background: createSlideBackground("#0b1120", "#0891b2", "#14b8a6", "#34d399", 3),
  },
  {
    title: "Interfaz reactiva",
    text: "El header se puede reutilizar en cualquier vista de la aplicación.",
    background: createSlideBackground("#1f2937", "#f59e0b", "#fb7185", "#f43f5e", 4),
  },
  {
    title: "Efecto panorámico",
    text: "Cada cambio desplaza el carril horizontalmente con una transición suave.",
    background: createSlideBackground("#111827", "#6366f1", "#8b5cf6", "#c084fc", 5),
  },
];

function createSlideBackground(base, accentOne, accentTwo, accentThree, seed) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 500" preserveAspectRatio="none">
      <defs>
        <linearGradient id="g${seed}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${base}" />
          <stop offset="55%" stop-color="${accentOne}" />
          <stop offset="100%" stop-color="${accentTwo}" />
        </linearGradient>
        <radialGradient id="r${seed}" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stop-color="${accentThree}" stop-opacity="0.95" />
          <stop offset="100%" stop-color="${accentThree}" stop-opacity="0" />
        </radialGradient>
      </defs>
      <rect width="1600" height="500" fill="url(#g${seed})" />
      <circle cx="230" cy="120" r="140" fill="url(#r${seed})" />
      <circle cx="1240" cy="-40" r="200" fill="url(#r${seed})" opacity="0.65" />
      <ellipse cx="1180" cy="390" rx="320" ry="130" fill="rgba(255,255,255,0.12)" />
      <ellipse cx="420" cy="390" rx="260" ry="110" fill="rgba(255,255,255,0.08)" />
      <path d="M0 360C180 300 320 320 470 360C620 400 770 430 960 380C1140 332 1290 270 1600 340V500H0Z" fill="rgba(2,6,23,0.18)" />
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

export default function Header() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % slides.length);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <header className="header-slider" aria-label="Carrusel de imagenes del encabezado">
      <div className="header-slider__viewport" aria-hidden="true">
        <div
          className="header-slider__track"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {slides.map((slide) => (
            <div
              key={slide.title}
              className="header-slider__slide"
              style={{ backgroundImage: `url(${slide.background})` }}
            />
          ))}
        </div>
      </div>

      <div className="header-slider__overlay">
        <p className="header-slider__eyebrow">Header dinámico</p>
        <h1 className="header-slider__title">Cinco fondos rotando automáticamente</h1>
        <p className="header-slider__text">
          El componente Header muestra un slider horizontal que avanza cada 5 segundos y deja ver una imagen nueva.
        </p>
        <div className="header-slider__counter">
          <span className="header-slider__dot" />
          <span>
            Imagen {activeIndex + 1} de {slides.length}
          </span>
        </div>
      </div>
    </header>
  );
}