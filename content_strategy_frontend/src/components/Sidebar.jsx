import React from "react";

// PUBLIC_INTERFACE
export default function Sidebar({ steps, progressStep, onResetProgress }) {
  /** Renders a simple team/steps visualization in the left sidebar. */
  return (
    <div>
      <div className="sectionHeader">
        <h1 className="h1">Equipo virtual</h1>
        <p className="h2">Flujo simulado (sin backend)</p>

        <div className="pillRow" aria-label="Indicadores de estado">
          <span className="pill pillPrimary">Proyecto: IG/FB</span>
          <span className="pill pillSecondary">
            Progreso: {Math.min(progressStep, 3)}/3
          </span>
        </div>
      </div>

      <div className="section">
        <div className="list" role="list" aria-label="Lista de roles">
          {steps.map((s) => {
            const isReady = s.status === "listo";
            const pillClass = isReady ? "pill pillSecondary" : "pill pillGhost";
            return (
              <div className="listItem" role="listitem" key={s.id}>
                <div>
                  <div className="listItemTitle">{s.name}</div>
                  <div className="helpText">Paso del flujo</div>
                </div>

                <span className={pillClass} aria-label={`Estado: ${s.status}`}>
                  {s.status}
                </span>
              </div>
            );
          })}
        </div>

        <div className="hr" />

        <button className="btn btnSmall btnBlock" type="button" onClick={onResetProgress}>
          Reiniciar progreso
        </button>

        <p className="helpText">
          Nota: Esto es una demo local. Los estados cambian al hacer click en “Generar
          variaciones”.
        </p>
      </div>
    </div>
  );
}
