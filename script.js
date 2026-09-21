// ============================================================
// ELECTRO VOLTS - CHEQUEO ELÉCTRICO NIVEL 2
// Para activar WhatsApp: reemplazá el número en CONFIG.whatsapp.
// Formato internacional sin +, espacios ni guiones. Ej: 5492944123456
// ============================================================

const CONFIG = {
  whatsapp: "5492944713310",
  message: "Hola Alejandro, hice el Chequeo Eléctrico Nivel 2 de Electro Volts y quisiera consultar por una revisión de mi instalación."
};

const questions = [
  {
    tag:"01 · TABLERO ELÉCTRICO",
    q:"¿Sabés qué protecciones tiene actualmente tu tablero eléctrico?",
    e:"Un tablero debería contar con protecciones adecuadas y correctamente seleccionadas para los circuitos que alimenta.",
    answers:[
      ["Sí, conozco las protecciones y están identificadas",3],
      ["Sé que tiene algunas, pero no sé exactamente cuáles",2],
      ["No estoy seguro",1],
      ["Nunca me fijé",0]
    ]
  },
  {
    tag:"02 · DISYUNTOR DIFERENCIAL",
    q:"¿Tenés disyuntor diferencial y sabés si funciona correctamente?",
    e:"El diferencial ayuda a proteger frente a determinadas fugas de corriente. Su funcionamiento debe comprobarse según las indicaciones del fabricante.",
    answers:[
      ["Sí, tiene y sé que funciona",3],
      ["Sí, pero nunca comprobé su funcionamiento",2],
      ["No sé si tiene",1],
      ["No tiene",0]
    ]
  },
  {
    tag:"03 · PUESTA A TIERRA",
    q:"¿Sabés si tu instalación tiene una puesta a tierra efectiva?",
    e:"La presencia de un conductor verde/amarillo no garantiza por sí sola que la puesta a tierra sea correcta.",
    answers:[
      ["Sí, fue verificada profesionalmente",3],
      ["Creo que sí, pero no fue verificada",2],
      ["No lo sé",1],
      ["Sé que no tiene",0]
    ]
  },
  {
    tag:"04 · TOMACORRIENTES",
    q:"¿Tenés tomacorrientes flojos, rotos, ennegrecidos o que se calientan?",
    e:"Calentamiento, olor, decoloración o falsos contactos pueden indicar problemas que conviene revisar.",
    answers:[
      ["No, ninguno presenta esos síntomas",3],
      ["Hay alguno que está flojo o deteriorado",2],
      ["Alguno se calienta ocasionalmente",1],
      ["Sí, hay varios con esos problemas",0]
    ]
  },
  {
    tag:"05 · CARGAS",
    q:"¿Usás estufas, hornos, termotanques u otros equipos de alto consumo?",
    e:"Los equipos de elevada potencia deben estar correctamente dimensionados para el circuito que los alimenta.",
    answers:[
      ["Sí, y tienen circuitos adecuados",3],
      ["Sí, pero no sé si tienen circuitos independientes",2],
      ["Los conecto donde hay un tomacorriente disponible",1],
      ["Uso varios equipos potentes en zapatillas/prolongadores",0]
    ]
  },
  {
    tag:"06 · ZAPATILLAS Y PROLONGADORES",
    q:"¿Suelen quedar varias zapatillas o prolongadores conectados entre sí?",
    e:"Encadenar prolongadores o concentrar demasiada carga en un mismo punto puede generar calentamiento.",
    answers:[
      ["No",3],
      ["Ocasionalmente",2],
      ["Es algo habitual",1],
      ["Sí, tengo varios conectados permanentemente",0]
    ]
  },
  {
    tag:"07 · CABLEADO",
    q:"¿Alguna vez notaste cables, cajas o llaves que se calientan?",
    e:"El calentamiento anormal puede estar relacionado con sobrecarga, conexiones deficientes u otros problemas que requieren diagnóstico.",
    answers:[
      ["Nunca",3],
      ["Alguna vez, pero fue algo puntual",2],
      ["Sí, en algún sector",1],
      ["Sí, ocurre con frecuencia",0]
    ]
  },
  {
    tag:"08 · TENSIÓN",
    q:"¿Notás luces que bajan de intensidad o equipos que se comportan de manera extraña?",
    e:"Variaciones de tensión pueden tener distintos orígenes: instalación interna, conexiones, carga o suministro.",
    answers:[
      ["No",3],
      ["Ocurre muy ocasionalmente",2],
      ["Pasa con cierta frecuencia",1],
      ["Es un problema habitual",0]
    ]
  },
  {
    tag:"09 · PROTECCIONES",
    q:"¿Alguna térmica o protección eléctrica dispara con frecuencia?",
    e:"Que una protección actúe repetidamente puede ser una señal de sobrecarga, falla o un problema que necesita diagnóstico.",
    answers:[
      ["No",3],
      ["Alguna vez ocurrió",2],
      ["Sucede ocasionalmente",1],
      ["Sucede con frecuencia",0]
    ]
  },
  {
    tag:"10 · ANTIGÜEDAD Y REVISIÓN",
    q:"¿Cuándo fue la última revisión completa de tu instalación eléctrica?",
    e:"Una instalación puede funcionar durante años y aun así necesitar una verificación de sus protecciones, conexiones y puesta a tierra.",
    answers:[
      ["Hace menos de 2 años",3],
      ["Hace entre 2 y 5 años",2],
      ["Hace más de 5 años",1],
      ["Nunca se hizo una revisión completa",0]
    ]
  }
];

let current = 0;
let total = 0;

const $ = id => document.getElementById(id);

function show(id){
  document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
  $(id).classList.add("active");
  window.scrollTo({top:0,behavior:"smooth"});
}

function renderQuestion(){
  const item = questions[current];
  $("counter").textContent = `CHEQUEO ${current+1} / ${questions.length}`;
  $("scoreMini").textContent = `${total} pts`;
  $("progressBar").style.width = `${((current+1)/questions.length)*100}%`;
  $("questionTag").textContent = item.tag;
  $("question").textContent = item.q;
  $("explanation").textContent = item.e;

  const box = $("answers");
  box.innerHTML = "";
  item.answers.forEach(([text,points])=>{
    const btn = document.createElement("button");
    btn.className = "answer";
    btn.textContent = text;
    btn.addEventListener("click",()=>{
      total += points;
      current++;
      if(current < questions.length) renderQuestion();
      else renderResult();
    });
    box.appendChild(btn);
  });
}

function renderResult(){
  $("resultScore").textContent = total;

  let title, text, advice, icon;
  if(total >= 25){
    icon="✓";
    title="BUEN NIVEL DE PREVENCIÓN";
    text="Tus respuestas no muestran una acumulación importante de señales de atención.";
    advice="Eso no confirma que la instalación esté técnicamente correcta. Las mediciones y la inspección profesional son las que permiten comprobarlo.";
  }else if(total >= 16){
    icon="!";
    title="HAY PUNTOS PARA REVISAR";
    text="Tus respuestas muestran algunos aspectos de la instalación que conviene verificar.";
    advice="Prestá especial atención a las protecciones, puesta a tierra, cargas y cualquier señal de calentamiento o disparos frecuentes.";
  }else{
    icon="!";
    title="CONVIENE HACER UNA REVISIÓN";
    text="Tus respuestas muestran varios puntos que merecen una revisión técnica.";
    advice="No significa automáticamente que exista una falla grave, pero sí que hay suficientes señales para justificar una inspección y medición profesional.";
  }

  $("resultIcon").textContent=icon;
  $("resultTitle").textContent=title;
  $("resultText").textContent=text;
  $("resultAdvice").textContent=advice;

  const number = CONFIG.whatsapp.replace(/\D/g,"");
  const msg = encodeURIComponent(CONFIG.message + ` Resultado orientativo: ${total}/30 puntos.`);
  $("whatsappBtn").href = number.includes("X") || !number
    ? `javascript:alert("Configurá el número de WhatsApp de Electro Volts en script.js")`
    : `https://wa.me/${number}?text=${msg}`;

  show("result");
}

$("startBtn").addEventListener("click",()=>{
  current=0; total=0; renderQuestion(); show("quiz");
});

$("restartBtn").addEventListener("click",()=>{
  current=0; total=0; show("intro");
});
