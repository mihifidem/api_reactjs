import "./Header.css";

function Header(props) {
  return (
    <header style={{margin: props.centrado === "true" ? "0 auto" : "0", width: props.ancho, color: props.color, backgroundColor: props.colorbg }} className="tech-header">
      <div className="tech-header__copy">
        <span className="tech-header__eyebrow">{props.title_small}</span>
        <h2>{props.title}</h2>
        <p>
         {props.description}
        </p>
      </div>

      {/* <div className="tech-header__metrics">
        <article>
          <FaBolt />
          <strong>Realtime</strong>
          <span>acciones rápidas</span>
        </article>
        <article>
          <FaShieldAlt />
          <strong>Secure</strong>
          <span>control visible</span>
        </article>
        <article>
          <FaChartLine />
          <strong>Growth</strong>
          <span>lectura clara</span>
        </article>
      </div> */}
    </header>
  );
}

export default Header;