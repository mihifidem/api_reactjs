import { useNavigate } from "react-router-dom";
import {
  FaArrowRight,
  FaBolt,
  FaCloud,
  FaQuoteLeft,
  FaShieldAlt,
  FaSignal,
} from "react-icons/fa";
import "./Inicio.css";

export default function Inicio() {
  const navigate = useNavigate();

  const cards = [
    {
      icon: <FaSignal />,
      title: "Conectividad total",
      description: "Flujos en tiempo real, navegación rápida y datos siempre sincronizados.",
    },
    {
      icon: <FaShieldAlt />,
      title: "Seguridad por diseño",
      description: "Arquitectura preparada para crecer sin perder control ni trazabilidad.",
    },
    {
      icon: <FaCloud />,
      title: "Escala cloud-ready",
      description: "Una base ligera que se adapta a mas productos, usuarios y pedidos.",
    },
  ];

  const abanicos = [
    {
      label: "Edge Ops",
      title: "Monitoreo y alertas",
      text: "Observabilidad clara para saber que pasa y actuar sin friccion.",
    },
    {
      label: "Flow UX",
      title: "Interacciones rapidas",
      text: "Interfaces enfocadas en velocidad visual y acciones inmediatas.",
    },
    {
      label: "Data Mesh",
      title: "Datos conectados",
      text: "Productos, usuarios y pedidos bajo una misma capa de control.",
    },
  ];

  const testimonios = [
    {
      name: "Marina Torres",
      role: "Lider de producto",
      quote:
        "La experiencia se siente moderna y directa. Las acciones mas importantes quedan a un clic.",
    },
    {
      name: "Diego Rivas",
      role: "Operaciones",
      quote:
        "La estetica azul turquesa le da identidad sin saturar; la pagina respira tecnologia y orden.",
    },
    {
      name: "Lucia Perez",
      role: "Growth manager",
      quote:
        "La landing vende mejor porque tiene jerarquia, ritmo visual y una tabla de precios muy clara.",
    },
  ];

  const planes = [
    {
      name: "Starter",
      price: "$19",
      highlight: false,
      features: ["Hasta 3 paneles", "Soporte basico", "Actualizaciones mensuales"],
    },
    {
      name: "Pro",
      price: "$49",
      highlight: true,
      features: ["Paneles ilimitados", "Automatizaciones", "Soporte prioritario"],
    },
    {
      name: "Scale",
      price: "$99",
      highlight: false,
      features: ["Multiusuario", "Analitica avanzada", "Integraciones premium"],
    },
  ];

  function irContacto() {
    navigate("/contacto");
  }

  function irProductos() {
    navigate("/productos");
  }

  return (
    <main className="landing">
      <section className="landing__hero">
        <div className="landing__hero-copy">
          <span className="landing__eyebrow">Blue Turquoise Tech</span>
          <h1>Una landing que se siente rapida, limpia y lista para convertir.</h1>
          <p>
            Disenada para mostrar productos, confianza y propuesta de valor con una
            estetica tecnologica azul turquesa, moderna y fresca.
          </p>

          <div className="landing__actions">
            <button className="landing__button landing__button--primary" onClick={irProductos}>
              Ver productos <FaArrowRight />
            </button>
            <button className="landing__button landing__button--secondary" onClick={irContacto}>
              Hablemos
            </button>
          </div>

          <div className="landing__stats">
            <article>
              <strong>24/7</strong>
              <span>Visibilidad continua</span>
            </article>
            <article>
              <strong>+98%</strong>
              <span>Claridad visual</span>
            </article>
            <article>
              <strong>3x</strong>
              <span>Mas enfoque en CTA</span>
            </article>
          </div>
        </div>

        <div className="landing__hero-panel">
          <div className="landing__orb landing__orb--one" />
          <div className="landing__orb landing__orb--two" />
          <div className="landing__panel-card">
            <div className="landing__panel-top">
              <span>Live system</span>
              <FaBolt />
            </div>
            <div className="landing__panel-grid">
              <div>
                <strong>128 ms</strong>
                <span>respuesta media</span>
              </div>
              <div>
                <strong>99.9%</strong>
                <span>disponibilidad</span>
              </div>
              <div>
                <strong>12</strong>
                <span>modulos activos</span>
              </div>
              <div>
                <strong>8K</strong>
                <span>eventos procesados</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="landing__section">
        <div className="landing__section-head">
          <span>Cards</span>
          <h2>Bloques visuales para explicar valor sin ruido.</h2>
        </div>

        <div className="landing__cards">
          {cards.map((card) => (
            <article className="landing__card" key={card.title}>
              <div className="landing__card-icon">{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="landing__section landing__section--fan">
        <div className="landing__section-head">
          <span>Abanicos</span>
          <h2>Una disposicion en abanico para destacar soluciones y capas del sistema.</h2>
        </div>

        <div className="landing__fan">
          {abanicos.map((item, index) => (
            <article className={`landing__fan-card landing__fan-card--${index + 1}`} key={item.title}>
              <span>{item.label}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="landing__section">
        <div className="landing__section-head">
          <span>Testimonios</span>
          <h2>Prueba social con tono tecnico y directo.</h2>
        </div>

        <div className="landing__testimonios">
          {testimonios.map((testimonio) => (
            <figure className="landing__testimonial" key={testimonio.name}>
              <FaQuoteLeft className="landing__quote" />
              <blockquote>{testimonio.quote}</blockquote>
              <figcaption>
                <strong>{testimonio.name}</strong>
                <span>{testimonio.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="landing__section">
        <div className="landing__section-head">
          <span>Price table</span>
          <h2>Planes simples con foco en decision rapida.</h2>
        </div>

        <div className="landing__pricing">
          {planes.map((plan) => (
            <article
              className={`landing__price ${plan.highlight ? "landing__price--featured" : ""}`}
              key={plan.name}
            >
              <div className="landing__price-head">
                <h3>{plan.name}</h3>
                <strong>{plan.price}</strong>
              </div>
              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <button className="landing__price-button" onClick={irContacto}>
                Elegir plan
              </button>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}