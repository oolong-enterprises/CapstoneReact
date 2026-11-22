import { Link } from "react-router";

export default function Home() {
  return (
    <main>
      <nav className="navbar">
        <Link to="/" className="logo">
          STL Generator
        </Link>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/templates">Templates</Link>
          <Link to="/about">About</Link>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">PARAMETRIC 3D MODELING</p>

          <h1>
            Create custom 3D models,
            <span> made to fit.</span>
          </h1>

          <p className="hero-description">
            Generate customizable STL files using a collection
            of parametric 3D models. Adjust dimensions, configure
            parameters, and create models ready for 3D printing.
          </p>

          <Link to="/templates" className="primary-button">
            Browse Templates →
          </Link>
        </div>
      </section>
    </main>
  );
}
