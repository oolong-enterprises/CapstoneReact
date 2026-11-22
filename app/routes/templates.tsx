import { useState } from "react";
import { useLoaderData, Link, useNavigate } from "react-router";
import "./templates.css";

type TemplateParameter = {
  name: string;
  label: string;
  minValue: number;
  maxValue: number;
  defaultValue: number;
};

type Template = {
  id: number;
  name: string;
  description: string;
  fileLocation: string;
  parameters: TemplateParameter[];
};

// Fetch templates from Spring Boot
export async function loader() {
  const response = await fetch(
    "http://localhost:8080/api/template"
  );

  if (!response.ok) {
    throw new Error("Failed to retrieve templates");
  }

  return (await response.json()) as Template[];
}

export default function Templates() {
  // Retrieve API data
  const templates = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  // Track selected template
  const [selectedId, setSelectedId] = useState<number | null>(
    templates[0]?.id ?? null
  );

  // Initialize parameter values
const [parameterValues, setParameterValues] = useState<
  Record<string, string | number>
>(() => {
  const defaults: Record<string, number> = {};

  templates[0]?.parameters.forEach((parameter) => {
    defaults[parameter.name] = parameter.defaultValue;
  });

  return defaults;
});

  // Find selected template
  const selected = templates.find(
    (template) => template.id === selectedId
  );

  const [isGenerating, setIsGenerating] = useState(false);

  // Handle template selection
  function selectTemplate(template: Template) {
    setSelectedId(template.id);

    const defaults: Record<string, number> = {};

    template.parameters.forEach((parameter) => {
      defaults[parameter.name] = parameter.defaultValue;
    });

    setParameterValues(defaults);
  }

async function generateModel() {
  if (!selected) return;

  setIsGenerating(true);

  try {
    const parameters = Object.fromEntries(
      selected.parameters.map((parameter) => [
        parameter.name,
        Number(
          parameterValues[parameter.name] ??
          parameter.defaultValue
        ),
      ])
    );

    const response = await fetch(
      "http://localhost:8080/api/generate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          templateId: selected.id,
          parameters: parameters,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Model generation failed");
    }

    const blob = await response.blob();

const modelUrl = URL.createObjectURL(blob);

navigate("/preview", {
  state: {
    modelUrl: modelUrl,
    templateName: selected.name,
  },
});

    navigate("/preview", {
      state: {
        modelUrl: URL.createObjectURL(blob),
        templateName: selected.name,
      },
    });

  } catch (error) {
    console.error(error);
    alert("Failed to generate model.");
  } finally {
    setIsGenerating(false);
  }
}

  

  // Render page

return (
  <>
    <nav className="top-navbar">
      <div className="navbar-brand">
        <span className="brand-icon">◈</span>
        <span>STL Generator</span>
      </div>

      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/templates" className="nav-active">Templates</Link>
      </div>
    </nav>

    <div className="template-workspace">

      {/* TEMPLATE SELECTION */}

      <div className="template-grid">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => selectTemplate(template)}
            className={`template-card ${
              selectedId === template.id ? "active" : ""
            }`}
          >
            <div className="template-art green">
              <span className="template-icon">▱</span>
            </div>

            <div className="template-info">
              <div>
                <strong>{template.name}</strong>
                <span>{template.description}</span>
              </div>

              <div className="selection-indicator">
                {selectedId === template.id ? "✓" : ""}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* SELECTED TEMPLATE INFORMATION */}

      {selected && (
        <div className="model-description">
          <h2>{selected.name}</h2>
          <p>{selected.description}</p>

          <div className="parameter-form">
            {selected.parameters.map((parameter) => (
              <label key={parameter.name} className="parameter-field">
                <span>{parameter.label}</span>

                <div className="dimension-control">
                  <input
                    type="range"
                    min={parameter.minValue}
                    max={parameter.maxValue}
                    step="0.1"
                    value={Number(
                      parameterValues[parameter.name] === ""
                        ? parameter.minValue
                        : parameterValues[parameter.name] ??
                            parameter.defaultValue
                    )}
                    onChange={(e) =>
                      setParameterValues((previous) => ({
                        ...previous,
                        [parameter.name]: e.target.value,
                      }))
                    }
                  />

                  <div className="dimension-value">
                    <input
                      type="number"
                      min={parameter.minValue}
                      max={parameter.maxValue}
                      step="0.1"
                      value={
                        parameterValues[parameter.name] ??
                        parameter.defaultValue
                      }
                      onChange={(e) =>
                        setParameterValues((previous) => ({
                          ...previous,
                          [parameter.name]: e.target.value,
                        }))
                      }
                    />
                    <span>mm</span>
                  </div>
                </div>

                <small>
                  Min: {parameter.minValue} / Max: {parameter.maxValue}
                </small>
              </label>
            ))}
          </div>

          <button
  className="generate-button"
  onClick={generateModel}
  disabled={isGenerating}
>
  {isGenerating ? "Generating..." : "Preview Model →"}
</button>
        </div>
      )}
    </div>
  </>
);

}
