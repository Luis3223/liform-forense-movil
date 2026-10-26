# LIFORM — Laboratorio de Informática Forense Móvil y Recuperación de Datos Críticos

[![Vercel Deployment](https://img.shields.io/badge/Vercel-Live%20Demo-10b981?style=for-the-badge&logo=vercel)](https://liform-forense-movil.vercel.app)
[![ISO Standard](https://img.shields.io/badge/Norma-ISO%2FIEC%2027037%3A2012-4f46e5?style=for-the-badge)](https://liform-forense-movil.vercel.app)
[![Hardware Target](https://img.shields.io/badge/Target-Xiaomi%20Redmi%2012-d97706?style=for-the-badge&logo=android)](https://liform-forense-movil.vercel.app)

Plataforma interactiva del **Laboratorio de Informática Forense Móvil y Recuperación de Datos Críticos para Empresas (LIFORM)**, desarrollado como proyecto de investigación aplicada en la **Corporación Unificada Nacional de Educación Superior (CUN)**, sede Sincelejo (2026).

---

## 🚀 Despliegue en Vivo
Acceso a la plataforma web funcional:  
👉 **[https://liform-forense-movil.vercel.app](https://liform-forense-movil.vercel.app)**

---

## 📌 Módulos y Funcionalidades

### 1. Visión y Comparativa Forense
* Diagnóstico del problema: manipulación artesanal vs. protocolo pericial auditable.
* Marco normativo internacional: **ISO/IEC 27037:2012** (Directrices para la identificación, recolección, adquisición y preservación de evidencia digital).
* Tiempos de respuesta corporativa con SLA de 24 a 72 horas.

### 2. Portal de Diagnóstico & Triage para Empresas (B2B)
* **Simulador de Incidentes:** Evaluación del índice de admisibilidad probatoria ante fugas de información, robo de terminales y fraudes internos.
* **Cotizador de Peritajes:** Cálculo dinámico de costos por número de dispositivos, nivel de extracción (Lógica, Avanzada/Root, Física/Chip-Off) y tiempo SLA.
* **Generación de Actas de Custodia Preliminares:** Validación de requisitos de preservación electromagnética (Jaula de Faraday).

### 3. Sustentación & Diapositivas Sincronizadas
* Visualizador interactivo de las **11 diapositivas oficiales** del proyecto optimizadas en WebP.
* Guion de sustentación integrado para el equipo expositor con tiempos sugeridos por diapositiva.

### 4. Estación Platform-Tools Windows & Terminal Redmi 12
* Emulador de consola interactivo para el entorno `C:\Users\Luis Angel\platform-tools-latest-windows\platform-tools`.
* Caso pericial documentado sobre **Xiaomi Redmi 12 (Android 13, serial ADB: `106e57767d74`)**.
* 4 fases guiadas: Detección ADB, auditoría de paquetes de terceros (`pm list packages -3`), extracción de fotografías con geolocalización EXIF en Sincelejo y extracción de vídeo de seguridad.
* Procedimiento alternativo de emergencia: **Bypass EDL/BROM (Test Point)** con aislamiento Faraday para dispositivos con bloqueo de pantalla o USB Debugging deshabilitado.
* Visor satelital Leaflet con coordenadas GPS reales de la evidencia extraída (Sincelejo, Sucre).

### 5. Generador Oficial de Informe Pericial & Cadena de Custodia
* Formulario estructurado para registro de custodios, estado físico del terminal, IMEI y descripción de hallazgos.
* **Cálculo criptográfico de integridad SHA-256 en tiempo real** utilizando la Web Crypto API nativa del navegador.
* Hoja de estilos de impresión profesional (`@media print`) para generar el acta pericial oficial en PDF con campos de firma legal.

### 6. Arquitectura del Laboratorio, Presupuesto y Cronograma
* Distribución física y funcional de los 5 subsistemas del laboratorio.
* Presupuesto de inversión detallado en equipamiento hardware, software forense, mobiliario ESD y certificaciones.
* Cronograma de despliegue de 16 semanas.

---

## 🛠️ Stack Tecnológico
* **Frontend:** HTML5 semántico con diseño accesible y responsivo.
* **Estilos:** Vanilla CSS con **Editorial Luxury Design System** (paleta cálida pergamino `#f4ece1`, tinta espresso `#1e1814`, acento terracota `#9e5233` y barra cobalto lateral `#5247e6`).
* **Tipografía:** Newsreader, Instrument Serif, Albert Sans y Fira Code (Google Fonts).
* **Lógica:** Vanilla JavaScript ES6+ modular, sin dependencias pesadas.
* **Criptografía:** Web Crypto API (`crypto.subtle.digest('SHA-256', ...)`).
* **GIS / Mapas:** Leaflet.js + OpenStreetMap.
* **Iconografía:** Lucide Icons.
* **Hosting:** Vercel Edge Network.

---

## 💻 Ejecución Local
No requiere instalación de Node.js ni compilación:

```bash
# Clonar el repositorio
git clone https://github.com/Luis3223/liform-forense-movil.git

# Entrar al directorio
cd liform-forense-movil

# Abrir index.html directamente en el navegador
# En Windows:
start index.html

# O utilizando un servidor local simple:
python -m http.server 3000
```

---

## 🎓 Créditos Académicos
* **Institución:** Corporación Unificada Nacional de Educación Superior (CUN).
* **Programa:** Mantenimiento de Dispositivos Móviles / Seguridad Informática.
* **Ubicación:** Sincelejo, Sucre, Colombia — 2026.
