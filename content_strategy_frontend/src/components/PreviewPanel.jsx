import React, { useMemo, useState } from "react";

function buildTxt(preview) {
  const headline = preview?.headline || "Sin título";
  const microReel = Array.isArray(preview?.microReel) ? preview.microReel : [];
  const caption = preview?.caption || "";
  const hashtags = preview?.hashtags || "";

  return [
    "HEADLINE",
    headline,
    "",
    "MICROREEL (texto en pantalla)",
    ...microReel.map((l) => `- ${l}`),
    "",
    "CAPTION",
    caption,
    "",
    "HASHTAGS",
    hashtags,
    "",
  ].join("\n");
}

function downloadTextFile(filename, text) {
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

// PUBLIC_INTERFACE
export default function PreviewPanel({ preview }) {
  /** Right panel: real-time preview with client-side copy/download controls. */
  const [toast, setToast] = useState("");

  const txt = useMemo(() => buildTxt(preview), [preview]);

  // PUBLIC_INTERFACE
  const onCopy = async () => {
    /** Copies the preview text to clipboard (if available). */
    try {
      await navigator.clipboard.writeText(txt);
      setToast("Copiado al portapapeles.");
    } catch (e) {
      setToast("No se pudo copiar (tu navegador lo bloqueó).");
    } finally {
      window.setTimeout(() => setToast(""), 1600);
    }
  };

  // PUBLIC_INTERFACE
  const onDownload = () => {
    /** Downloads the preview as a .txt file. */
    downloadTextFile("contenido-telemedicina.txt", txt);
    setToast("Descarga iniciada (.txt).");
    window.setTimeout(() => setToast(""), 1600);
  };

  const headline = preview?.headline || "Escribe un tema para ver el preview";
  const microReel = Array.isArray(preview?.microReel) ? preview.microReel : [];
  const caption = preview?.caption || "";
  const hashtags = preview?.hashtags || "";

  return (
    <div className="section">
      <h1 className="h1">Previsualización</h1>
      <p className="h2">Salida en tiempo real (plantillas locales)</p>

      <div className="btnRow" aria-label="Acciones de salida">
        <button className="btn btnSecondary" type="button" onClick={onCopy}>
          Copiar
        </button>
        <button className="btn btnPrimary" type="button" onClick={onDownload}>
          Descargar .txt
        </button>
        <button className="btn" type="button" disabled aria-disabled="true">
          Compartir (próximamente)
        </button>
      </div>

      {toast ? <div className="toast" role="status">{toast}</div> : null}

      <div className="hr" />

      <div className="card">
        <div className="previewHeadline">{headline}</div>

        <div className="previewBlockTitle">Microreel (ultra-corto)</div>
        <ul className="previewList" aria-label="Guion de microreel">
          {microReel.map((line, idx) => (
            <li key={idx}>{line}</li>
          ))}
        </ul>

        <div className="previewBlockTitle">Caption</div>
        <div className="previewText">{caption}</div>

        <div className="previewBlockTitle">Hashtags</div>
        <div className="previewText">{hashtags}</div>
      </div>

      <p className="helpText" style={{ marginTop: 12 }}>
        Acciones “Compartir” y otras integraciones quedan como placeholders para la
        siguiente fase.
      </p>
    </div>
  );
}
