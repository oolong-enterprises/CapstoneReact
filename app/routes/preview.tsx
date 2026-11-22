import { Link, useLocation } from "react-router";
import STLViewer from "../components/stlViewer";
import "./preview.css";

export default function Preview() {
  const location = useLocation();

  const modelUrl = location.state?.modelUrl;
  const templateName = location.state?.templateName;

  function downloadModel() {
    if (!modelUrl) return;

    const link = document.createElement("a");
    link.href = modelUrl;
    link.download = `${templateName || "model"}.stl`;

    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  return (
    <>
      <nav className="top-navbar">
        <div className="navbar-brand">
          <span className="brand-icon">◈</span>
          <span>STL Generator</span>
        </div>

        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/templates">Templates</Link>
        </div>
      </nav>

      <main className="preview-page">
        <div className="preview-header">
          <div>
            <h1>Model Preview</h1>
            <p>Inspect your generated 3D model before downloading.</p>
          </div>

          <Link to="/templates" className="back-button">
            ← Back to Editor
          </Link>
        </div>

        <div className="preview-layout">
          <section className="viewer-container">
            {modelUrl ? (
              <STLViewer url={modelUrl} />
            ) : (
              <div className="viewer-placeholder">
                <h2>No Model Available</h2>
                <p>Return to the editor and generate a model.</p>
              </div>
            )}
          </section>

          <aside className="preview-sidebar">
            <h2>Model Details</h2>

            <div className="detail-item">
              <span>Template</span>
              <strong>{templateName || "No model selected"}</strong>
            </div>

            <div className="detail-item">
              <span>File Format</span>
              <strong>STL</strong>
            </div>

            <button
              className="download-button"
              onClick={downloadModel}
              disabled={!modelUrl}
            >
              Download STL
            </button>
          </aside>
        </div>
      </main>
    </>
  );
}