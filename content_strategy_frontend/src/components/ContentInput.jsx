import React, { useMemo } from "react";

function stepLabel(step) {
  if (step <= 0) return "Listo para generar";
  if (step === 1) return "Guionista: borrador creado";
  if (step === 2) return "Editor: refinando";
  return "QA: validación final";
}

function progressPct(step) {
  const s = Math.max(0, Math.min(3, step));
  return `${(s / 3) * 100}%`;
}

// PUBLIC_INTERFACE
export default function ContentInput({
  topic,
  onTopicChange,
  onGenerate,
  progressStep,
  variations,
  selectedVariationId,
  onSelectVariation,
}) {
  /** Central module: topic input, local workflow progress, and variation selection. */
  const safeTopic = (topic || "").trim();

  const progressStyle = useMemo(
    () => ({ ["--progress"]: progressPct(progressStep) }),
    [progressStep]
  );

  return (
    <div className="section">
      <h1 className="h1">Tema & flujo</h1>
      <p className="h2">Escribe el tema y genera variaciones de contenido</p>

      <div className="hr" />

      <label className="fieldLabel" htmlFor="topicText">
        Tema (editable)
      </label>
      <textarea
        id="topicText"
        className="textarea"
        value={topic}
        onChange={(e) => onTopicChange(e.target.value)}
        placeholder="Escribe un tema (ej: telemedicina en español, seguro de vida, gastos finales...)"
        aria-describedby="topicHelp"
      />
      <div id="topicHelp" className="helpText">
        La previsualización se actualiza en tiempo real. Si está vacío, usaremos un
        default.
      </div>

      <div className="btnRow">
        <button className="btn btnPrimary" type="button" onClick={onGenerate}>
          Generar variaciones
        </button>
      </div>

      <div className="progressWrap" aria-label="Progreso de flujo">
        <div className="progressBar" style={progressStyle}>
          <div className="progressFill" />
        </div>
        <div className="progressMeta">
          <span>{stepLabel(progressStep)}</span>
          <span className="mono">{Math.min(progressStep, 3)}/3</span>
        </div>
      </div>

      <div className="hr" />

      <div className="card">
        <div className="fieldLabel" style={{ marginBottom: 6 }}>
          Variaciones (selecciona para previsualizar)
        </div>
        <div className="selectRow" role="group" aria-label="Selector de variación">
          {(variations || []).map((v) => (
            <button
              key={v.id}
              type="button"
              className="choiceBtn"
              aria-pressed={selectedVariationId === v.id}
              onClick={() => onSelectVariation(v.id)}
              title={v.label}
            >
              {v.label}
            </button>
          ))}
        </div>

        <div className="helpText" style={{ marginTop: 10 }}>
          Tema actual:{" "}
          <span className="mono">{safeTopic.length ? safeTopic : "(vacío)"}</span>
        </div>
      </div>
    </div>
  );
}
