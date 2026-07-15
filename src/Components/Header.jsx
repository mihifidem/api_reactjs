

function Header() {
  return (
    <header>
      <div
        id="carouselHeader"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        {/* Indicadores */}
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselHeader"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselHeader"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselHeader"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>

        {/* Imágenes */}
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://picsum.photos/1200/500?random=0"
              className="d-block w-100"
              alt="Slide 1"
              style={{ height: "500px", objectFit: "cover" }}
            />
          </div>

          <div className="carousel-item">
            <img
              src="https://picsum.photos/1200/500?random=1"
              className="d-block w-100"
              alt="Slide 2"
              style={{ height: "500px", objectFit: "cover" }}
            />
          </div>

          <div className="carousel-item">
            <img
              src="https://picsum.photos/1200/500?random=2"
              className="d-block w-100"
              alt="Slide 3"
              style={{ height: "500px", objectFit: "cover" }}
            />
          </div>
        </div>

        {/* Botón anterior */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselHeader"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon"></span>
          <span className="visually-hidden">Anterior</span>
        </button>

        {/* Botón siguiente */}
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselHeader"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon"></span>
          <span className="visually-hidden">Siguiente</span>
        </button>
      </div>
    </header>
  );
}

export default Header;