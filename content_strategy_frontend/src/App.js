import React, { useMemo, useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import ContentInput from "./components/ContentInput";
import PreviewPanel from "./components/PreviewPanel";

/**
 * Local, client-side content generation helpers.
 * No external services/backends are used.
 */

const DEFAULT_TOPIC =
  "Telemedicina para todos. (enfocado en público hispano, no requiere estatus migratorio)";

function sanitizeTopic(topic) {
  const t = (topic || "").trim();
  return t.length ? t : "un tema de salud y bienestar para la comunidad hispana";
}

function buildVariations(topic) {
  const t = sanitizeTopic(topic);
  return [
    {
      id: "v1",
      label: "Variación 1 (Empática)",
      topic: t,
      angle: "empatica",
    },
    {
      id: "v2",
      label: "Variación 2 (Urgencia suave)",
      topic: t,
      angle: "urgencia",
    },
    {
      id: "v3",
      label: "Variación 3 (Educativa)",
      topic: t,
      angle: "educativa",
    },
  ];
}

function generatePreview(topic, angle) {
  const t = sanitizeTopic(topic);

  const headlineByAngle = {
    empatica: `¿Y si tu salud pudiera esperar cero días?`,
    urgencia: `Cita hoy, sin complicarte: telemedicina para ti`,
    educativa: `Telemedicina: así funciona (en 15 segundos)`,
  };

  const openingByAngle = {
    empatica:
      "Si te preocupa el costo o los papeles… respira: mereces atención médica.",
    urgencia:
      "Cuando te sientes mal, esperar no ayuda. Actúa hoy con una consulta rápida.",
    educativa:
      "Telemedicina = doctor por videollamada o teléfono. Fácil, seguro y rápido.",
  };

  const headline = `${headlineByAngle[angle] || "Contenido listo para tu comunidad"} — ${t}`;

  const microReel = [
    "Pantalla 1 (texto grande): “¿Te sientes mal y no quieres esperar?”",
    `Pantalla 2 (texto): “${openingByAngle[angle] || "Atención médica para ti, sin complicaciones."}”`,
    "Pantalla 3 (texto): “Telemedicina: consulta desde tu celular”",
    "Pantalla 4 (texto): “En español • Privado • Sin juzgar”",
    "Pantalla 5 (CTA): “Escribe ‘INFO’ y te digo cómo empezar”",
  ];

  const caption = [
    `Hoy hablamos de: ${t}`,
    "",
    "Para nuestra comunidad hispana en EE.UU.:",
    "• Atención rápida desde tu casa",
    "• En español",
    "• Sin presiones ni juicios",
    "",
    "Comenta “INFO” y te envío los pasos.",
  ].join("\n");

  const hashtags = [
    "#Telemedicina",
    "#SaludEnEspañol",
    "#ComunidadHispana",
    "#LatinosEnUSA",
    "#Bienestar",
    "#Salud",
    "#DoctorEnLinea",
    "#CuidadoDeSalud",
    "#Familia",
    "#SaludParaTodos",
  ].join(" ");

  return { headline, microReel, caption, hashtags };
}

// PUBLIC_INTERFACE
function App() {
  /** This is the main entry UI for the content strategy app demo. */
  const [topic, setTopic] = useState(DEFAULT_TOPIC);

  // Local workflow simulation: step 0..3
  const [progressStep, setProgressStep] = useState(0);

  const [variations, setVariations] = useState(() => buildVariations(DEFAULT_TOPIC));
  const [selectedVariationId, setSelectedVariationId] = useState("v1");

  const selectedVariation = useMemo(() => {
    const found = variations.find((v) => v.id === selectedVariationId);
    return found || variations[0];
  }, [variations, selectedVariationId]);

  const preview = useMemo(() => {
    const angle = selectedVariation?.angle || "empatica";
    const baseTopic = selectedVariation?.topic || topic;
    return generatePreview(baseTopic, angle);
  }, [topic, selectedVariation]);

  const steps = useMemo(
    () => [
      { id: "s1", name: "Estratega", status: "listo" },
      { id: "s2", name: "Guionista", status: progressStep >= 1 ? "listo" : "pendiente" },
      { id: "s3", name: "Editor", status: progressStep >= 2 ? "listo" : "pendiente" },
      { id: "s4", name: "QA", status: progressStep >= 3 ? "listo" : "pendiente" },
    ],
    [progressStep]
  );

  // PUBLIC_INTERFACE
  const onGenerateVariations = () => {
    /** Locally simulates generating variations + advancing workflow progress. */
    setVariations(buildVariations(topic));
    setSelectedVariationId("v1");
    setProgressStep((s) => Math.min(3, s + 1));
  };

  // PUBLIC_INTERFACE
  const onResetProgress = () => {
    /** Resets local simulated workflow progress. */
    setProgressStep(0);
  };

  return (
    <div className="oceanApp">
      <div className="oceanTopBar">
        <div className="brand">
          <div className="brandMark" aria-hidden="true" />
          <div className="brandText">
            <div className="brandTitle">Cultural Content Creator</div>
            <div className="brandSubtitle">Demo: Telemedicina para todos</div>
          </div>
        </div>

        <div className="topActions">
          <span className="pill pillSecondary">Ocean Professional</span>
          <span className="pill pillGhost">Local / Sin backend</span>
        </div>
      </div>

      <div className="oceanLayout">
        <aside className="panel sidebarPanel" aria-label="Equipo y pasos">
          <Sidebar steps={steps} progressStep={progressStep} onResetProgress={onResetProgress} />
        </aside>

        <main className="panel centerPanel" aria-label="Entrada de tema y flujo">
          <ContentInput
            topic={topic}
            onTopicChange={setTopic}
            onGenerate={onGenerateVariations}
            progressStep={progressStep}
            variations={variations}
            selectedVariationId={selectedVariationId}
            onSelectVariation={setSelectedVariationId}
          />
        </main>

        <section className="panel previewPanel" aria-label="Previsualización en tiempo real">
          <PreviewPanel preview={preview} />
        </section>
      </div>
    </div>
  );
}

export default App;
