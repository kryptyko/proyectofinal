export default function NotFound() {
    return (
      <section className="section">
        <div className="container has-text-centered">
          <h1 className="title is-1">404</h1>
          <h2 className="subtitle is-3">Oops, Página no encontrada.</h2>
          <p className="mb-6">Lo sentimos, pero la página que estás buscando no existe.</p>
          <a href="/" className="button is-primary is-medium">
            Volver al Inicio
          </a>
        </div>
      </section>
    );
  }