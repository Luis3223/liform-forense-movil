/**
 * LIFORM - Laboratorio de Informática Forense Móvil
 * Plataforma Oficial & Suite Operativa Forense CUN 2026
 * JavaScript Engine (Impeccable & Enterprise Edition)
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Update Clock in Status Bar
  initForensicClock();

  // Navigation & Tabs
  initNavigation();

  // New Enterprise Portal Sandbox & Triage
  initEnterprisePortal();

  // Slide Deck Presentation Viewer (11 Slides)
  initSlideDeck();

  // Platform-Tools Windows Terminal Emulator
  initTerminalEmulator();

  // Report Generator & Chain of Custody Logic
  initReportGenerator();

  // Live Crypto Hasher Modal
  initCryptoModal();
});

/* ==========================================================================
   1. Forensic Real-time Clock
   ========================================================================== */
function initForensicClock() {
  const clockEl = document.getElementById('current-timestamp');
  if (!clockEl) return;

  function update() {
    const now = new Date();
    const pad = (n) => (n < 10 ? '0' + n : n);
    const dateStr = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())} UTC-5`;
    clockEl.textContent = dateStr;
  }
  update();
  setInterval(update, 1000);
}

/* ==========================================================================
   2. Navigation System
   ========================================================================== */
function initNavigation() {
  const navBtns = document.querySelectorAll('.nav-btn');
  navBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      switchTab(targetTab);
    });
  });
}

function switchTab(tabId) {
  const navBtns = document.querySelectorAll('.nav-btn');
  const panes = document.querySelectorAll('.tab-pane');

  navBtns.forEach((b) => {
    b.classList.toggle('active', b.getAttribute('data-tab') === tabId);
  });

  panes.forEach((p) => {
    p.classList.toggle('active', p.id === tabId);
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (window.lucide) {
    window.lucide.createIcons();
  }

  if (tabId === 'tab-lab') {
    setTimeout(() => {
      const input = document.getElementById('term-input');
      if (input) input.focus();
    }, 200);
  }
}

/* ==========================================================================
   3. Portal de Diagnóstico y Pruebas para Empresas (B2B Sandbox)
   ========================================================================== */
function initEnterprisePortal() {
  // 1. Triage & Viability Meter
  const incidentSelect = document.getElementById('ent-incident-type');
  const chkAirplane = document.getElementById('chk-airplane');
  const chkNoModify = document.getElementById('chk-no-modify');
  const chkFaraday = document.getElementById('chk-faraday');
  const chkNoRepair = document.getElementById('chk-no-repair');
  const scoreText = document.getElementById('viability-score-text');
  const barFill = document.getElementById('viability-bar-fill');
  const hintText = document.getElementById('viability-recommendation');

  function updateViability() {
    if (!scoreText || !barFill) return;
    let score = 0;
    if (chkAirplane && chkAirplane.checked) score += 30;
    if (chkNoModify && chkNoModify.checked) score += 25;
    if (chkFaraday && chkFaraday.checked) score += 25;
    if (chkNoRepair && chkNoRepair.checked) score += 20;

    barFill.style.width = score + '%';

    if (score >= 80) {
      scoreText.textContent = `${score}% - ADMISIBILIDAD EXCELENTE`;
      scoreText.className = 'text-patina';
      barFill.style.background = 'var(--patina)';
      hintText.textContent = 'El protocolo inicial es riguroso. La inmutabilidad probatoria está garantizada según la norma ISO/IEC 27037:2012. Se recomienda proceder de inmediato con la adquisición lógica.';
    } else if (score >= 50) {
      scoreText.textContent = `${score}% - ADMISIBILIDAD MEDIA`;
      scoreText.className = 'text-gold';
      barFill.style.background = 'var(--gold)';
      hintText.textContent = 'Existe riesgo de sobrescritura parcial. Se recomienda aislar el equipo en jaula de Faraday de inmediato y no conectarlo a estaciones de trabajo sin bloqueador de escritura.';
    } else {
      scoreText.textContent = `${score}% - ALTO RIESGO DE INADMISIBILIDAD`;
      scoreText.className = 'text-danger';
      barFill.style.background = 'var(--vermilion)';
      hintText.textContent = 'El dispositivo ha sufrido manipulación o conexión sin custodia. Se requerirá un peritaje de análisis físico a nivel de hardware (BROM/EDL) para rescatar bloques no sobrescritos.';
    }
  }

  [chkAirplane, chkNoModify, chkFaraday, chkNoRepair].forEach((chk) => {
    if (chk) chk.addEventListener('change', updateViability);
  });
  if (incidentSelect) incidentSelect.addEventListener('change', updateViability);

  // 2. SLA & Quotation Calculator
  const devicesSlider = document.getElementById('ent-devices-count');
  const devicesDisplay = document.getElementById('ent-devices-display');
  const slaRadios = document.querySelectorAll('input[name="sla-radio"]');
  const priceDisplay = document.getElementById('quote-price-display');
  const btnCreateTicket = document.getElementById('btn-create-enterprise-ticket');

  function calculateQuote() {
    if (!devicesSlider || !priceDisplay) return;
    const count = parseInt(devicesSlider.value, 10);
    devicesDisplay.textContent = count === 1 ? '1 Dispositivo' : `${count} Dispositivos`;

    let selectedSla = '24';
    slaRadios.forEach((r) => {
      if (r.checked) selectedSla = r.value;
    });

    let baseRate = 350000; // 48h
    if (selectedSla === '24') baseRate = 450000;
    if (selectedSla === '72') baseRate = 280000;

    // Volume discount
    let total = baseRate * count;
    if (count >= 5) total *= 0.85; // 15% discount
    else if (count >= 2) total *= 0.92; // 8% discount

    const formatted = new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(total);

    priceDisplay.textContent = formatted;
  }

  if (devicesSlider) devicesSlider.addEventListener('input', calculateQuote);
  slaRadios.forEach((r) => r.addEventListener('change', calculateQuote));

  if (btnCreateTicket) {
    btnCreateTicket.addEventListener('click', () => {
      const count = devicesSlider ? devicesSlider.value : 1;
      const incidentText = incidentSelect ? incidentSelect.options[incidentSelect.selectedIndex].text : 'Auditoría General';
      
      // Auto-populate report tab with enterprise data
      const companyField = document.getElementById('rep-company');
      const caseNumField = document.getElementById('rep-case-num');
      const contactField = document.getElementById('rep-contact');
      
      if (companyField) companyField.value = 'Empresa Solicitante (Cotización B2B)';
      if (caseNumField) caseNumField.value = 'LIFORM-B2B-' + Math.floor(1000 + Math.random() * 9000);
      if (contactField) contactField.value = `Intervención de ${count} terminal(es) - Motivo: ${incidentText}`;

      switchTab('tab-report');
      alert(`Orden de Intervención Preliminar generada.\nSe han transferido los datos a la Plantilla de Informe Pericial con N.° de Caso: ${caseNumField.value}.`);
    });
  }

  // 3. File Sandbox & Live SHA-256 Hasher
  const dropZone = document.getElementById('ent-drop-zone');
  const filePicker = document.getElementById('ent-file-picker');
  const resFilename = document.getElementById('ent-res-filename');
  const resSize = document.getElementById('ent-res-size');
  const resHash = document.getElementById('ent-res-hash');
  const btnCopyHash = document.getElementById('btn-copy-ent-hash');

  if (dropZone && filePicker) {
    dropZone.addEventListener('click', () => filePicker.click());

    dropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropZone.classList.add('dragover');
    });

    dropZone.addEventListener('dragleave', () => {
      dropZone.classList.remove('dragover');
    });

    dropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropZone.classList.remove('dragover');
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        processUploadedFile(e.dataTransfer.files[0]);
      }
    });

    filePicker.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        processUploadedFile(e.target.files[0]);
      }
    });
  }

  async function processUploadedFile(file) {
    if (!resFilename || !resSize || !resHash) return;
    resFilename.textContent = file.name;
    const kb = (file.size / 1024).toFixed(1);
    resSize.textContent = `${kb} KB (${file.size.toLocaleString()} bytes)`;
    resHash.textContent = 'Calculando hash SHA-256 inmutable...';

    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    const hashHex = bufferToHex(hashBuffer);
    resHash.textContent = hashHex;
  }

  if (btnCopyHash) {
    btnCopyHash.addEventListener('click', () => {
      const hash = resHash.textContent;
      navigator.clipboard.writeText(hash).then(() => {
        alert('Firma criptográfica SHA-256 copiada al portapapeles.');
      });
    });
  }
}

/* ==========================================================================
   4. Diapositivas Oficiales & Guion de Sustentación (11 Slides)
   ========================================================================== */
const SLIDES_DATA = [
  {
    num: 1,
    title: "Portada Profesional - Proyecto LIFORM",
    img: "assets/slides/slide1.webp",
    speech: "Muy buenas tardes a los honorables miembros del jurado. Mi nombre es Luis Angel Olivera Hernandez y junto a mis compañeros Luis Andres Mendoza Herazo, Harold Martinez Ricardo y Kerwin Carlos Torres Castillo, venimos a presentar la primera fase de nuestro proyecto de grado titulado: LIFORM: Laboratorio de Informática Forense Móvil y Recuperación de Datos Críticos para Empresas. Este proyecto nace como una solución arquitectónica y metodológica orientada a mitigar los riesgos tecnológicos y legales asociados al manejo de dispositivos móviles en el entorno corporativo contemporáneo.",
    techDetails: [
      "Institución: Corporación Unificada Nacional de Educación Superior (CUN).",
      "Programa: Ingeniería de Sistemas - Sede Sincelejo, Sucre (2026).",
      "Asignatura: Mantenimiento de Dispositivos Móviles.",
      "Alcance: Diseño técnico, metodológico y funcional del laboratorio orientado a PYMES de la región."
    ],
    actionBtn: { text: "Explorar Visión del Laboratorio", tab: "tab-vision" }
  },
  {
    num: 2,
    title: "Soporte TI Tradicional vs. Protocolo Forense LIFORM",
    img: "assets/slides/slide2.webp",
    speech: "En el entorno empresarial actual, los dispositivos móviles son herramientas misionales centrales. Sin embargo, cuando ocurre un incidente de seguridad o pérdida de datos, el soporte técnico tradicional suele actuar de manera improvisada y artesanal. Esto introduce dos riesgos críticos: un riesgo técnico, ya que la manipulación directa enciende o conecta el dispositivo sobrescribiendo sectores de memoria recuperables; y un riesgo legal, pues la ausencia de protocolos rompe de inmediato la cadena de custodia, invalidando cualquier hallazgo ante procesos disciplinarios o judiciales. LIFORM transforma esta operación mediante la adopción de estándares internacionales que garantizan la inmutabilidad y admisibilidad de la evidencia desde el primer contacto.",
    techDetails: [
      "Riesgo de sobrescritura: Generación de logs, swap y caches del SO al encender sin bloqueador.",
      "Riesgo probatorio: Inadmisibilidad procesal de pruebas sin cadena de custodia formal.",
      "Riesgo de fuga: Posibilidad de comando de borrado remoto (remote wipe) si no se aísla la señal RF."
    ],
    actionBtn: { text: "Comparar Riesgos vs Solución", tab: "tab-vision" }
  },
  {
    num: 3,
    title: "Objetivo General y las 4 Fases ISO/IEC 27037:2012",
    img: "assets/slides/slide3.webp",
    speech: "Nuestro objetivo general es diseñar la propuesta técnica, metodológica y operativa de este laboratorio para PYMES. Para asegurar la repetibilidad y validez de nuestros procesos, fundamentamos rigurosamente el flujo de trabajo en la norma internacional ISO/IEC 27037:2012. Este estándar rige el tratamiento de la evidencia digital a través de cuatro fases obligatorias: la Identificación del dispositivo en su estado original, la Recolección aislándolo de redes, la Adquisición de los datos garantizando inmutabilidad y la Preservación mediante almacenamiento criptográfico a largo plazo.",
    techDetails: [
      "Fase 1 - Identificación: Inspección física, marca, modelo, IMEI y puertos sin encender.",
      "Fase 2 - Recolección: Desconexión de redes mediante modo avión y jaula de Faraday portátil.",
      "Fase 3 - Adquisición: Extracción verificable mediante cables certificados y bloqueadores de escritura.",
      "Fase 4 - Preservación: Cálculo de hash SHA-256 y resguardo redundante en servidor NAS cifrado."
    ],
    actionBtn: { text: "Ver Plantilla de Custodia", tab: "tab-report" }
  },
  {
    num: 4,
    title: "Arquitectura del Laboratorio: Flujo Unidireccional (5 Nodos)",
    img: "assets/slides/slide4.webp",
    speech: "La arquitectura del laboratorio LIFORM se concibe bajo un principio estricto de segregación de funciones para evitar la contaminación cruzada de evidencia entre distintos casos atendidos simultáneamente. El flujo de trabajo se divide en cinco subsistemas funcionales: 1. Recepción y cadena de custodia con jaula de Faraday; 2. Adquisición forense con bloqueadores de escritura; 3. Análisis y recuperación en estación de alto rendimiento; 4. Almacenamiento seguro en NAS cifrado con control RBAC; y 5. Generación de informes periciales respaldados por firmas de analistas y hashes matemáticos.",
    techDetails: [
      "Segregación física y lógica: Ninguna estación de análisis se mezcla con el canal de recepción.",
      "Evita contaminación cruzada de memorias USB o controladores compartidos.",
      "Trazabilidad unívoca: Cada terminal cuenta con un identificador consecutivo interno (ej. LIFORM-2026-001)."
    ],
    actionBtn: { text: "Ver Subsistemas Funcionales", tab: "tab-specs" }
  },
  {
    num: 5,
    title: "Parámetros Técnicos de Operación y Matriz de Extracción",
    img: "assets/slides/slide5.webp",
    speech: "Operamos bajo parámetros de servicio estrictos, garantizando tiempos de respuesta de entre 24 y 72 horas hábiles. La matriz de extracción del laboratorio se divide según el nivel de acceso permitido. La extracción a nivel de sistema de archivos y la extracción física bit a bit requieren omisiones de kernel por hardware. Para efectos de nuestra sustentación y demostración práctica, nos enfocaremos en la Adquisición Lógica a nivel de Sistema Operativo, la cual interactúa directamente mediante APIs de desarrollo y el puente de depuración del terminal, validando matemáticamente la integridad de cada bit mediante el algoritmo criptográfico SHA-256.",
    techDetails: [
      "Sistemas compatibles: Android 8.0 en adelante, iOS 13 en adelante.",
      "SLA garantizado: 24 a 72 horas hábiles con dictamen preliminar en las primeras 24h.",
      "Algoritmo criptográfico: SHA-256 obligatorio para firma digital de integridad."
    ],
    actionBtn: { text: "Ver Matriz Completa", tab: "tab-specs" }
  },
  {
    num: 6,
    title: "DEMO EN VIVO - Fase 1: Conexión y Reconocimiento (Platform-Tools)",
    img: "assets/slides/slide6.webp",
    speech: "Para validar la viabilidad operativa de LIFORM, procederemos a realizar la demostración práctica utilizando un dispositivo objetivo Redmi 12 con sistema Android. Tras realizar la preservación física en modo avión, conectamos el terminal a nuestra estación de análisis. Al ejecutar en nuestra consola el comando de las SDK Platform-Tools de Google: adb devices, forzamos un handshake criptográfico autorizado con el hardware. Como pueden observar en pantalla, la laptop reconoce el identificador único del terminal en estado device, lo que significa que el canal de comunicación forense seguro ha sido establecido exitosamente.",
    techDetails: [
      "Herramienta: Google Android SDK Platform-Tools (Windows).",
      "Comando ejecutado: adb devices",
      "Resultado obtenido: 106e57767d74 device (Identificador serial único verificado).",
      "Canal de depuración seguro: Autenticación por pares de llaves criptográficas RSA."
    ],
    actionBtn: { text: "Ejecutar adb devices en Terminal", tab: "tab-lab", step: 1 }
  },
  {
    num: 7,
    title: "DEMO EN VIVO - Fase 2: Perfilado del Sospechoso (Aplicaciones)",
    img: "assets/slides/slide7.webp",
    speech: "Una vez dentro del dispositivo, el analista procede a realizar una enumeración de binarios de terceros aislando el bloatware del sistema mediante el comando adb shell pm list packages -3. El archivo resultante nos revela de forma inmediata el mapa conductual y la huella digital del usuario. En el contexto corporativo colombiano, detectamos vectores críticos de información: en la huella financiera identificamos los paquetes oficiales de Nequi y Bancolombia; en la identidad digital confirmamos la presencia de la Cédula Digital de la Registraduría; y en el entorno operativo observamos ecosistemas avanzados de Inteligencia Artificial como ChatGPT y Claude. Con este listado, el analista sabe con total certeza científica qué rutas de memoria y bases de datos SQLite debe auditar.",
    techDetails: [
      "Comando ejecutado: adb shell pm list packages -3 > apps_sospechosas.txt",
      "Banca móvil: com.nequi.MobileApp, net.bancolombia.cit",
      "Identidad: co.gov.registraduria.ceduladigital",
      "IA y Mensajería: com.openai.chatgpt, com.anthropic.claude, WhatsApp, Telegram."
    ],
    actionBtn: { text: "Ejecutar pm list packages en Terminal", tab: "tab-lab", step: 2 }
  },
  {
    num: 8,
    title: "DEMO EN VIVO - Fase 3: Adquisición de Evidencia Multimedia y GPS",
    img: "assets/slides/slide8.webp",
    speech: "Procedemos entonces a realizar una Adquisición Lógica Dirigida mediante el comando adb pull. Extraemos en primer lugar el archivo PXL_20260508_134622072.PORTRAIT.ORIGINAL.jpg. Al ser un archivo nativo de cámara, este contenedor guarda metadatos EXIF de geolocalización satelital. Al procesarlo en el laboratorio, podemos extraer las coordenadas GPS exactas y proyectarlas en un mapa, ubicando el dispositivo temporal y espacialmente en la escena del incidente. Acto seguido, ejecutamos el pull del archivo de video VID_20260909_192554.mp4 para realizar un análisis cronológico de marcas de tiempo. Todo esto se realiza de forma remota por consola, asegurando que los archivos originales dentro del Redmi 12 no sufran la más mínima alteración.",
    techDetails: [
      "Comando ejecutado: adb pull /sdcard/DCIM/Camera/PXL...jpg .",
      "Metadatos EXIF: Cámara GCam Mod, resolución 4000x3000, fecha 08/05/2026 13:46.",
      "Coordenadas GPS: 9.304722° N, -75.397778° W (Sincelejo, Sucre, Colombia).",
      "Inalterabilidad: La extracción remota conserva intactos los timestamps atómicos del archivo en el móvil."
    ],
    actionBtn: { text: "Ejecutar Extracción Foto/GPS en Terminal", tab: "tab-lab", step: 3 }
  },
  {
    num: 9,
    title: "Preservación e Inalterabilidad (Función Criptográfica SHA-256)",
    img: "assets/slides/slide9.webp",
    speech: "Para garantizar que la prueba mantenga su validez legal e inalterabilidad ante los tribunales, los archivos extraídos son procesados inmediatamente a través de una función criptográfica de Hash SHA-256. Este algoritmo genera una firma digital única e irrepetible para cada archivo. Si un tercero intentara modificar un solo bit de la foto o del video extraído, el hash cambiaría drásticamente, delatando la manipulación. Este identificador matemático se integra directamente en nuestra Plantilla de Informe Pericial, junto con los registros de la cadena de custodia, la identificación del IMEI y las firmas del analista responsable, cumpliendo a cabalidad con la fase de preservación de la norma ISO 27037.",
    techDetails: [
      "Efecto avalancha: Cambiar 1 bit altera más del 50% de la cadena resultante del hash.",
      "Firma generada: SHA-256 (256 bits / 64 caracteres hexadecimales).",
      "Integración documental: Sección 3 y Sección 5 de la Plantilla de Informe de Auditoría Forense."
    ],
    actionBtn: { text: "Probar Hasheador Criptográfico en Vivo", modal: "hash-modal" }
  },
  {
    num: 10,
    title: "Viabilidad del Proyecto: Costos y Cronograma de 16 Semanas",
    img: "assets/slides/slide10.webp",
    speech: "La viabilidad económica y operativa de LIFORM está garantizada mediante un enfoque de implementación progresivo de 16 semanas. Como se observa en nuestro Dashboard, el laboratorio permite una estrategia de inversión inteligente. Al iniciar operaciones utilizando herramientas de código abierto como Autopsy, FTK Imager y Andriller, el costo de licenciamiento inicial es de cero dólares, derivando las herramientas comerciales como MOBILedit Forensic para fases posteriores. La inversión crítica se concentra en infraestructura de hardware seguro —como bloqueadores de escritura, jaulas de Faraday y servidores NAS cifrados— con un estimado inicial de 3.500 dólares, convirtiendo a LIFORM en un proyecto altamente rentable y escalable para las pymes de la región.",
    techDetails: [
      "Fase 1: Preventa (Sem. 1-3) - Levantamiento y alcance.",
      "Fase 2: Arquitectura (Sem. 4-7) - Diseño y selección de subsistemas.",
      "Fase 3: Configuración (Sem. 8-11) - Prototipo funcional y pruebas.",
      "Fase 4: Validación (Sem. 12-14) - Casos piloto ISO 27037.",
      "Fase 5: Asistencia (Sem. 15-16) - Capacitación y soporte continuo."
    ],
    actionBtn: { text: "Ver Matriz de Costos & Cronograma", tab: "tab-specs" }
  },
  {
    num: 11,
    title: "Conclusiones y Pregunta de Control (Bypass de Hardware EDL/BROM)",
    img: "assets/slides/slide11.webp",
    speech: "Para concluir, el diseño arquitectónico de LIFORM está completamente listo para estandarizar y transformar la respuesta a incidentes tecnológicos en nuestra región, blindando a las organizaciones tanto operativa como legalmente. Queremos cerrar anticipándonos a un escenario crítico recurrente en la informática forense real: ¿Qué ocurre si el dispositivo objetivo se encuentra con la pantalla bloqueada y no es posible acceder a activar la depuración USB para usar comandos ADB?\n\nAnte esta limitación lógica, el protocolo forense de LIFORM no se detiene. Dejamos a un lado la interfaz del sistema operativo y realizamos un bypass a nivel de hardware forzando al procesador SoC —ya sea Qualcomm o MediaTek— a entrar en su modo de Descarga de Emergencia (EDL) o Boot ROM. Esto nos permite omitir por completo el kernel de Android y realizar una adquisición física directa sobre la memoria NAND o almacenamiento UFS, extrayendo la totalidad de los datos bit a bit de forma segura y autorizada bajo control de laboratorio. Quedamos atentos a sus preguntas y comentarios. Muchas gracias.",
    techDetails: [
      "Limitación del SO: ADB requiere pantalla desbloqueada y aceptación de la llave RSA.",
      "Bypass Hardware Qualcomm: Modo EDL (Emergency Download Mode, 9008 port).",
      "Bypass Hardware MediaTek: Modo BROM (Boot ROM Download Agent, MTK USB Port).",
      "Resultado: Volcado físico directo (Raw NAND dump) omitiendo contraseñas de pantalla."
    ],
    actionBtn: { text: "Ver Diagrama EDL / BROM", tab: "tab-lab", view: "view-bypass" }
  }
];

let currentSlideIdx = 0;

function initSlideDeck() {
  const imgEl = document.getElementById('active-slide-img');
  const titleEl = document.getElementById('current-slide-title');
  const numEl = document.getElementById('current-slide-num');
  const speechEl = document.getElementById('speaker-speech-text');
  const detailsEl = document.getElementById('speaker-technical-details');
  const actionsEl = document.getElementById('slide-context-actions');
  const thumbsContainer = document.getElementById('thumbnails-container');
  const btnPrev = document.getElementById('btn-prev-slide');
  const btnNext = document.getElementById('btn-next-slide');
  const btnFull = document.getElementById('btn-fullscreen-slide');

  if (!imgEl || !thumbsContainer) return;

  thumbsContainer.innerHTML = '';
  SLIDES_DATA.forEach((slide, idx) => {
    const thumb = document.createElement('div');
    thumb.className = `slide-thumb ${idx === 0 ? 'active' : ''}`;
    thumb.innerHTML = `
      <img src="${slide.img}" alt="Slide ${slide.num}">
      <span class="thumb-number">${slide.num}</span>
    `;
    thumb.addEventListener('click', () => renderSlide(idx));
    thumbsContainer.appendChild(thumb);
  });

  if (btnPrev) {
    btnPrev.addEventListener('click', () => {
      if (currentSlideIdx > 0) renderSlide(currentSlideIdx - 1);
    });
  }

  if (btnNext) {
    btnNext.addEventListener('click', () => {
      if (currentSlideIdx < SLIDES_DATA.length - 1) renderSlide(currentSlideIdx + 1);
    });
  }

  window.addEventListener('keydown', (e) => {
    const activeTab = document.querySelector('.nav-btn.active')?.getAttribute('data-tab');
    if (activeTab === 'tab-slides') {
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === 'Space') {
        if (currentSlideIdx < SLIDES_DATA.length - 1) renderSlide(currentSlideIdx + 1);
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        if (currentSlideIdx > 0) renderSlide(currentSlideIdx - 1);
      }
    }
  });

  if (btnFull) {
    btnFull.addEventListener('click', () => {
      const box = document.getElementById('slide-img-box');
      if (!box) return;
      if (!document.fullscreenElement) {
        box.requestFullscreen().catch((err) => console.log(err));
      } else {
        document.exitFullscreen();
      }
    });
  }

  renderSlide(0);
}

function renderSlide(idx) {
  if (idx < 0 || idx >= SLIDES_DATA.length) return;
  currentSlideIdx = idx;
  const slide = SLIDES_DATA[idx];

  const imgEl = document.getElementById('active-slide-img');
  const titleEl = document.getElementById('current-slide-title');
  const numEl = document.getElementById('current-slide-num');
  const speechEl = document.getElementById('speaker-speech-text');
  const detailsEl = document.getElementById('speaker-technical-details');
  const actionsEl = document.getElementById('slide-context-actions');
  const thumbs = document.querySelectorAll('.slide-thumb');

  imgEl.src = slide.img;
  titleEl.textContent = slide.title;
  numEl.textContent = slide.num;
  speechEl.textContent = slide.speech;

  let listHtml = '<ul>';
  slide.techDetails.forEach((item) => {
    listHtml += `<li>${item}</li>`;
  });
  listHtml += '</ul>';
  detailsEl.innerHTML = listHtml;

  actionsEl.innerHTML = '';
  if (slide.actionBtn) {
    const btn = document.createElement('button');
    btn.className = 'btn btn-sm btn-outline w-100';
    btn.innerHTML = `<i data-lucide="external-link"></i> ${slide.actionBtn.text}`;
    btn.addEventListener('click', () => {
      if (slide.actionBtn.modal) {
        openModal(slide.actionBtn.modal);
      } else if (slide.actionBtn.tab) {
        switchTab(slide.actionBtn.tab);
        if (slide.actionBtn.step) {
          executeStep(slide.actionBtn.step);
        }
        if (slide.actionBtn.view) {
          switchDrawerTab(slide.actionBtn.view);
        }
      }
    });
    actionsEl.appendChild(btn);
    if (window.lucide) window.lucide.createIcons();
  }

  thumbs.forEach((t, i) => {
    t.classList.toggle('active', i === idx);
  });

  if (thumbs[idx]) {
    thumbs[idx].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }
}

/* ==========================================================================
   5. Platform-Tools Windows Terminal Emulator
   ========================================================================== */
let isDeviceConnected = true;
let leafMap = null;

function initTerminalEmulator() {
  const termInput = document.getElementById('term-input');
  const termHistory = document.getElementById('term-history');
  const btnClear = document.getElementById('btn-clear-term');
  const btnCopy = document.getElementById('btn-copy-term');
  const btnToggleDev = document.getElementById('btn-toggle-device');

  if (!termInput) return;

  termInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const cmd = termInput.value.trim();
      if (cmd) {
        processCommand(cmd);
        termInput.value = '';
      }
    }
  });

  if (btnClear) {
    btnClear.addEventListener('click', () => {
      termHistory.innerHTML = '';
    });
  }

  if (btnCopy) {
    btnCopy.addEventListener('click', () => {
      navigator.clipboard.writeText(termHistory.innerText).then(() => {
        alert('Salida de consola copiada al portapapeles.');
      });
    });
  }

  if (btnToggleDev) {
    btnToggleDev.addEventListener('click', () => {
      isDeviceConnected = !isDeviceConnected;
      const stateBadge = document.getElementById('device-conn-state');
      const usbMode = document.getElementById('dev-usb-mode');
      if (isDeviceConnected) {
        stateBadge.textContent = 'CONECTADO';
        stateBadge.className = 'device-badge connected';
        usbMode.textContent = 'Depuración Autorizada';
        appendTermLine('', 'Dispositivo Xiaomi Redmi 12 detectado en puerto USB forense.', 'text-patina');
      } else {
        stateBadge.textContent = 'DESCONECTADO';
        stateBadge.className = 'device-badge danger';
        usbMode.textContent = 'Sin conexión física';
        appendTermLine('', 'Dispositivo USB desconectado de la estación de análisis.', 'text-danger');
      }
    });
  }

  const stepBtns = document.querySelectorAll('.run-step-btn');
  stepBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const step = btn.getAttribute('data-step');
      executeStep(step);
    });
  });

  const stepCards = document.querySelectorAll('.step-card');
  stepCards.forEach((card) => {
    card.addEventListener('click', () => {
      const step = card.getAttribute('data-step');
      executeStep(step);
    });
  });

  const drawerTabs = document.querySelectorAll('.drawer-tab');
  drawerTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const viewId = tab.getAttribute('data-view');
      switchDrawerTab(viewId);
    });
  });
}

function switchDrawerTab(viewId) {
  const tabs = document.querySelectorAll('.drawer-tab');
  const views = document.querySelectorAll('.artifact-view');

  tabs.forEach((t) => t.classList.toggle('active', t.getAttribute('data-view') === viewId));
  views.forEach((v) => v.classList.toggle('active', v.id === viewId));

  if (viewId === 'view-photo') {
    setTimeout(initOrRefreshMap, 150);
  }
}

function appendTermLine(cmd, outputHtml, customClass = '') {
  const history = document.getElementById('term-history');
  const line = document.createElement('div');
  line.className = 'term-entry';

  let content = '';
  if (cmd) {
    content += `<div class="term-executed-cmd"><span class="term-prompt">C:\\Users\\Luis Angel\\platform-tools-latest-windows\\platform-tools&gt;</span> <span class="cmd-text font-mono">${escapeHtml(cmd)}</span></div>`;
  }
  if (outputHtml) {
    content += `<div class="cmd-output ${customClass}">${outputHtml}</div>`;
  }
  line.innerHTML = content;
  history.appendChild(line);

  const body = document.getElementById('term-body');
  if (body) {
    body.scrollTop = body.scrollHeight;
  }
}

function executeStep(step) {
  const cards = document.querySelectorAll('.step-card');
  cards.forEach((c) => {
    c.classList.toggle('active', c.getAttribute('data-step') == step);
  });

  if (step == '1') {
    simulateTyping('adb devices', () => {
      if (isDeviceConnected) {
        appendTermLine('', `List of devices attached<br><span class="text-patina font-mono">106e57767d74    device</span><br><br><span class="text-cyan font-mono">* Handshake criptográfico RSA establecido. Canal forense activo.</span>`);
      } else {
        appendTermLine('', `List of devices attached<br><span class="text-danger font-mono">No devices/emulators found. Revisa el cable o ejecuta 'adb kill-server'.</span>`);
      }
    });
  } else if (step == '2') {
    simulateTyping('adb shell pm list packages -3 > apps_sospechosas.txt', () => {
      appendTermLine('', `<span class="text-patina font-mono">Enumeración lógica completada. Archivo generado: apps_sospechosas.txt (10 paquetes)</span><br>Abriendo visor de Bloc de notas...`);
      switchDrawerTab('view-apps');
    });
  } else if (step == '3') {
    simulateTyping('adb pull /sdcard/DCIM/Camera/PXL_20260508_134622072.PORTRAIT.ORIGINAL.jpg .', () => {
      appendTermLine('', `/sdcard/DCIM/Camera/PXL_20260508_134622072.PORTRAIT.ORIGINAL.jpg: 1 file pulled, 0 skipped. 4.2 MB/s (3,145,728 bytes in 0.714s)<br><span class="text-cyan font-mono">Hash SHA-256: 4f53cda18c2baa0c0354bb9910d6529321ef80a0606fbfda76d296c09b3eb7c1</span><br><span class="text-patina font-mono">Metadatos EXIF analizados. Coordenadas GPS satelitales detectadas.</span>`);
      switchDrawerTab('view-photo');
    });
  } else if (step == '4') {
    simulateTyping('adb pull /sdcard/DCIM/Camera/VID_20260909_192554.mp4 .', () => {
      appendTermLine('', `/sdcard/DCIM/Camera/VID_20260909_192554.mp4: 1 file pulled. 14.8 MB/s (22,020,096 bytes in 1.487s)<br><span class="text-cyan font-mono">Hash SHA-256: 7a8b9c0d1e2f3456789abcdef0123456789abcdef0123456789abcdef012345</span><br><span class="text-patina font-mono">Línea de tiempo validada: 09/09/2026 19:25:54 EST. Metadatos intactos.</span>`);
      switchDrawerTab('view-video');
    });
  } else if (step == 'plan-b') {
    simulateTyping('adb kill-server', () => {
      appendTermLine('', `<span class="text-gold font-mono">* daemon not running; starting now at tcp:5037</span><br><span class="text-patina font-mono">* daemon started successfully</span><br>Servicio adb reiniciado. Conexión restaurada a estado óptimo.`);
    });
  } else if (step == 'edl') {
    simulateTyping('edl-mode bypass', () => {
      appendTermLine('', `<span class="text-purple font-mono">[PREGUNTA DE CONTROL DEL JURADO: PANTALLA BLOQUEADA]</span><br>Omitiendo interfaz de Android...<br>Dispositivo forzado a modo Boot ROM / EDL (Emergency Download Mode).<br><span class="text-cyan font-mono">Canal USB: MediaTek Preloader / MTK USB Port (COM4)</span><br><span class="text-patina font-mono">Lectura directa de particiones NAND flash autorizada. Adquisición física bit a bit.</span>`);
      switchDrawerTab('view-bypass');
    });
  }
}

function processCommand(rawCmd) {
  const cmd = rawCmd.trim();
  const lower = cmd.toLowerCase();

  if (lower === 'cls' || lower === 'clear') {
    document.getElementById('term-history').innerHTML = '';
    return;
  }

  if (lower === 'help') {
    appendTermLine(cmd, `
      <strong>Comandos Forenses Disponibles:</strong><br>
      &bull; <code>adb devices</code> - Handshake y verificación del Redmi 12<br>
      &bull; <code>adb shell pm list packages -3</code> - Enumerar aplicaciones instaladas<br>
      &bull; <code>notepad apps_sospechosas.txt</code> - Ver paquetes extraídos<br>
      &bull; <code>adb shell ls /sdcard/DCIM/Camera/</code> - Listar multimedia en cámara<br>
      &bull; <code>adb pull /sdcard/DCIM/Camera/foto.jpg</code> - Extraer foto con metadatos GPS<br>
      &bull; <code>adb pull /sdcard/DCIM/Camera/video.mp4</code> - Extraer video y línea de tiempo<br>
      &bull; <code>adb kill-server</code> - Plan B: Reiniciar daemon forense<br>
      &bull; <code>edl</code> o <code>bypass</code> - Simular bypass de pantalla bloqueada (EDL/BROM)<br>
      &bull; <code>cls</code> - Limpiar pantalla
    `);
    return;
  }

  if (lower === 'adb devices') {
    executeStep(1);
    return;
  }

  if (lower.includes('pm list packages') || lower.includes('apps_sospechosas')) {
    executeStep(2);
    return;
  }

  if (lower.includes('start pxl') || (lower.includes('adb pull') && lower.includes('.jpg'))) {
    executeStep(3);
    return;
  }

  if (lower.includes('start vid') || (lower.includes('adb pull') && lower.includes('.mp4'))) {
    executeStep(4);
    return;
  }

  if (lower.includes('adb kill-server')) {
    executeStep('plan-b');
    return;
  }

  if (lower.includes('bypass') || lower.includes('edl') || lower.includes('brom')) {
    executeStep('edl');
    return;
  }

  if (lower.includes('ls') && lower.includes('camera')) {
    appendTermLine(cmd, `
      PXL_20260508_134622072.PORTRAIT.ORIGINAL.jpg<br>
      PXL_20260508_134701290.jpg<br>
      VID_20260909_192554.mp4<br>
      VID_20260909_193010.mp4
    `);
    return;
  }

  appendTermLine(cmd, `'${escapeHtml(cmd)}' no se reconoce como un comando interno o externo.<br>Escriba <span class="text-cyan font-mono">help</span> para ver la lista de comandos disponibles.`);
}

function simulateTyping(text, onComplete) {
  const input = document.getElementById('term-input');
  if (!input) return;
  input.value = '';
  let i = 0;
  const timer = setInterval(() => {
    input.value += text[i];
    i++;
    if (i >= text.length) {
      clearInterval(timer);
      setTimeout(() => {
        input.value = '';
        appendTermLine(text, '');
        if (onComplete) onComplete();
      }, 200);
    }
  }, 30);
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function initOrRefreshMap() {
  const mapContainer = document.getElementById('forensic-gps-map');
  if (!mapContainer || !window.L) return;

  const lat = 9.304722;
  const lng = -75.397778;

  if (!leafMap) {
    leafMap = L.map('forensic-gps-map').setView([lat, lng], 15);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(leafMap);

    const marker = L.marker([lat, lng]).addTo(leafMap);
    marker.bindPopup(`
      <strong>Evidencia Fotográfica LIFORM #001</strong><br>
      Dispositivo: Xiaomi Redmi 12<br>
      Fecha: 08/05/2026 13:46:22<br>
      Sincelejo, Sucre, Colombia
    `).openPopup();

    L.circle([lat, lng], {
      color: '#0ea5e9',
      fillColor: '#38bdf8',
      fillOpacity: 0.2,
      radius: 40
    }).addTo(leafMap);
  } else {
    leafMap.invalidateSize();
  }
}

/* ==========================================================================
   6. Generador Oficial de Informe Pericial & Cadena de Custodia
   ========================================================================== */
function initReportGenerator() {
  const btnLoadDemo = document.getElementById('btn-load-demo-report');
  const btnReset = document.getElementById('btn-reset-report');
  const btnAddCustody = document.getElementById('btn-add-custody-row');
  const btnAddFinding = document.getElementById('btn-add-finding-row');

  if (btnLoadDemo) {
    btnLoadDemo.addEventListener('click', () => {
      document.getElementById('rep-case-num').value = 'LIFORM-2026-001';
      document.getElementById('rep-open-date').value = '2026-10-26';
      document.getElementById('rep-close-date').value = '2026-10-28';
      document.getElementById('rep-analysts').value = 'Luis Angel Olivera Hernández, Luis Andrés Mendoza Herazo';
      document.getElementById('rep-company').value = 'Distribuciones Comerciales de Sucre S.A.S.';
      document.getElementById('rep-contact').value = 'Carlos Mario Vélez - Director de Operaciones TI';
      document.getElementById('rep-brand').value = 'Xiaomi';
      document.getElementById('rep-model').value = 'Redmi 12 (23053RN02L)';
      document.getElementById('rep-serial').value = '106e57767d74 / IMEI: 864209061234567';
      document.getElementById('rep-os').value = 'Android 13 (MIUI 14.0.5 Global)';
      document.getElementById('rep-storage').value = '128 GB eMMC 5.1 / 8 GB RAM';
      document.getElementById('hash-initial').value = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';
      document.getElementById('hash-final').value = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';
      alert('Datos del caso piloto "Redmi 12" cargados exitosamente.');
    });
  }

  if (btnReset) {
    btnReset.addEventListener('click', () => {
      if (confirm('¿Desea reiniciar los campos del informe a valores vacíos?')) {
        document.getElementById('rep-case-num').value = 'LIFORM-2026-___';
        document.getElementById('rep-company').value = '';
        document.getElementById('rep-contact').value = '';
        document.getElementById('rep-brand').value = '';
        document.getElementById('rep-model').value = '';
        document.getElementById('rep-serial').value = '';
        document.getElementById('rep-storage').value = '';
      }
    });
  }

  if (btnAddCustody) {
    btnAddCustody.addEventListener('click', () => {
      const tbody = document.getElementById('custody-tbody');
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><input type="text" value="26/10/2026 12:00" class="cell-input"></td>
        <td><input type="text" value="Nombre del responsable" class="cell-input"></td>
        <td><input type="text" value="Acción realizada conforme a protocolo" class="cell-input"></td>
        <td><input type="text" value="[Firma]" class="cell-input"></td>
        <td class="no-print text-center"><button class="btn-del-row">&times;</button></td>
      `;
      tbody.appendChild(tr);
      attachDeleteButtons();
    });
  }

  if (btnAddFinding) {
    btnAddFinding.addEventListener('click', () => {
      const tbody = document.getElementById('findings-tbody');
      const count = tbody.querySelectorAll('tr').length + 1;
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td class="text-center">${count}</td>
        <td><input type="text" placeholder="Descripción del hallazgo..." class="cell-input"></td>
        <td><input type="text" placeholder="Ruta o partición..." class="cell-input"></td>
        <td>
          <select class="cell-select badge-select media">
            <option value="Alta">Alta</option>
            <option value="Media" selected>Media</option>
            <option value="Baja">Baja</option>
          </select>
        </td>
        <td><input type="text" placeholder="Observaciones técnicas..." class="cell-input"></td>
        <td class="no-print text-center"><button class="btn-del-row">&times;</button></td>
      `;
      tbody.appendChild(tr);
      attachDeleteButtons();
    });
  }

  attachDeleteButtons();
}

function attachDeleteButtons() {
  document.querySelectorAll('.btn-del-row').forEach((btn) => {
    btn.onclick = function () {
      const row = this.closest('tr');
      if (row) row.remove();
    };
  });
}

/* ==========================================================================
   7. Live Cryptographic SHA-256 Tooling (Web Crypto API)
   ========================================================================== */
function initCryptoModal() {
  const btnOpenModal = document.getElementById('btn-calc-live-hash');
  const modal = document.getElementById('hash-modal');
  const btnClose = document.getElementById('close-hash-modal');
  const textInput = document.getElementById('live-hash-input');
  const fileInput = document.getElementById('live-file-input');
  const hashResult = document.getElementById('live-hash-result');
  const btnCopyHash = document.getElementById('btn-copy-live-hash');

  if (!modal) return;

  if (btnOpenModal) {
    btnOpenModal.addEventListener('click', () => openModal('hash-modal'));
  }

  if (btnClose) {
    btnClose.addEventListener('click', () => closeModal('hash-modal'));
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal('hash-modal');
  });

  if (textInput) {
    textInput.addEventListener('input', async () => {
      const val = textInput.value;
      if (!val) {
        hashResult.textContent = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';
        return;
      }
      const hash = await sha256String(val);
      hashResult.textContent = hash;
    });
  }

  if (fileInput) {
    fileInput.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      hashResult.textContent = 'Calculando hash SHA-256 del archivo...';
      const buffer = await file.arrayBuffer();
      const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
      const hash = bufferToHex(hashBuffer);
      hashResult.textContent = hash;
    });
  }

  if (btnCopyHash) {
    btnCopyHash.addEventListener('click', () => {
      const hash = hashResult.textContent;
      navigator.clipboard.writeText(hash).then(() => {
        alert('Hash SHA-256 copiado al portapapeles.');
      });
    });
  }
}

function openModal(modalId) {
  const m = document.getElementById(modalId);
  if (m) m.classList.add('active');
}

function closeModal(modalId) {
  const m = document.getElementById(modalId);
  if (m) m.classList.remove('active');
}

async function sha256String(str) {
  const enc = new TextEncoder();
  const data = enc.encode(str);
  const hashBuf = await crypto.subtle.digest('SHA-256', data);
  return bufferToHex(hashBuf);
}

function bufferToHex(buffer) {
  const byteArray = new Uint8Array(buffer);
  const hexCodes = [...byteArray].map((value) => {
    const hex = value.toString(16);
    return hex.padStart(2, '0');
  });
  return hexCodes.join('');
}
