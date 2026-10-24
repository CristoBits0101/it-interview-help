import type { CareerProfile } from './career-paths';

export const softwareCareerProfileTemplates: CareerProfile[] = [
  {
    "id": "game-developer",
    "label": "Game Developer",
    "purpose": "Programa mecánicas de juego",
    "summary": "Construye comportamientos interactivos y controla el rendimiento del juego. Trabaja con estados y reglas que deben responder de forma consistente.",
    "stages": [
      {
        "id": "foundation",
        "label": "Fundamentos",
        "goal": "Comprende la lógica de un programa y las operaciones necesarias para representar movimiento.",
        "areas": [
          "Programming Fundamentals",
          "Algebra and Functions",
          "Linear Algebra"
        ],
        "milestone": "Representa la posición de un objeto y actualízala a partir de una entrada."
      },
      {
        "id": "junior",
        "label": "Junior",
        "goal": "Implementa una mecánica pequeña con reglas claras y pruebas de comportamiento.",
        "areas": [
          "Software Requirements",
          "Software Design",
          "Software Testing",
          "User Interface Design"
        ],
        "milestone": "Construye una interacción con estados de inicio y fin y comprueba sus casos límite."
      },
      {
        "id": "mid",
        "label": "Mid-Level",
        "goal": "Separa los sistemas del juego y mide el coste de sus actualizaciones.",
        "areas": [
          "Operating Systems",
          "Software Architecture",
          "Software Quality",
          "Interaction Design"
        ],
        "milestone": "Localiza una operación lenta y verifica que optimizarla no cambie las reglas del juego."
      },
      {
        "id": "senior",
        "label": "Senior",
        "goal": "Guía la evolución técnica del juego con límites de rendimiento y compatibilidad.",
        "areas": [
          "Software Architecture",
          "Software Quality",
          "Software Maintenance",
          "Software Engineering Operations"
        ],
        "milestone": "Planifica un cambio de sistema con pruebas y una estrategia de recuperación."
      }
    ]
  },
  {
    "id": "embedded-software",
    "label": "Embedded Software Engineer",
    "purpose": "Programa el software de dispositivos",
    "summary": "Desarrolla software que se ejecuta dentro de dispositivos incluso sin conexión a una red. Controla el uso de memoria y la respuesta a eventos del hardware.",
    "stages": [
      {
        "id": "foundation",
        "label": "Fundamentos",
        "goal": "Comprende la ejecución de programas y el uso de memoria en un dispositivo.",
        "areas": [
          "Computing Fundamentals",
          "Programming Fundamentals",
          "Operating Systems"
        ],
        "milestone": "Describe cómo un programa procesa una entrada y modifica una salida."
      },
      {
        "id": "junior",
        "label": "Junior",
        "goal": "Implementa componentes pequeños con estados y límites de recursos explícitos.",
        "areas": [
          "Software Requirements",
          "Software Design",
          "Software Testing"
        ],
        "milestone": "Prueba una secuencia de estados y comprueba su respuesta ante entradas inesperadas."
      },
      {
        "id": "mid",
        "label": "Mid-Level",
        "goal": "Coordina tareas y diagnostica fallos de memoria o tiempo de respuesta.",
        "areas": [
          "Operating Systems",
          "Software Architecture",
          "Software Quality",
          "Security Fundamentals"
        ],
        "milestone": "Mide el tiempo de respuesta y el uso de memoria bajo distintas cargas."
      },
      {
        "id": "senior",
        "label": "Senior",
        "goal": "Define componentes mantenibles y una evolución fiable del software del dispositivo.",
        "areas": [
          "Software Architecture",
          "Software Testing",
          "Software Maintenance",
          "Software Engineering Operations"
        ],
        "milestone": "Diseña una actualización con verificación y recuperación ante una interrupción."
      }
    ]
  },
  {
    "id": "iot-developer",
    "label": "IoT Developer",
    "purpose": "Conecta dispositivos y servicios",
    "summary": "Integra dispositivos conectados con redes y servicios. Gestiona el intercambio de datos y el comportamiento ante pérdidas de conexión.",
    "stages": [
      {
        "id": "foundation",
        "label": "Fundamentos",
        "goal": "Comprende cómo un dispositivo representa datos y se comunica con un servicio.",
        "areas": [
          "Programming Fundamentals",
          "Operating Systems",
          "Computer Networks",
          "Security Fundamentals"
        ],
        "milestone": "Explica el recorrido de una lectura desde el dispositivo hasta un servicio."
      },
      {
        "id": "junior",
        "label": "Junior",
        "goal": "Implementa un intercambio de datos pequeño con validación y acceso controlado.",
        "areas": [
          "Backend Development",
          "Software Testing",
          "Network Security",
          "Application Security"
        ],
        "milestone": "Envía una lectura a un servicio y verifica que rechace datos o accesos inválidos."
      },
      {
        "id": "mid",
        "label": "Mid-Level",
        "goal": "Gestiona desconexiones y reintentos sin perder el control sobre los datos.",
        "areas": [
          "Software Design",
          "Distributed Systems",
          "Data Security",
          "Cloud Computing"
        ],
        "milestone": "Simula una desconexión y comprueba que reenviar mensajes no duplique sus efectos."
      },
      {
        "id": "senior",
        "label": "Senior",
        "goal": "Diseña la operación de dispositivos conectados con seguridad y recuperación.",
        "areas": [
          "Software Architecture",
          "System Design",
          "Cloud Security",
          "Software Engineering Operations",
          "Software Maintenance"
        ],
        "milestone": "Planifica una actualización gradual de dispositivos y cómo detectar y revertir fallos."
      }
    ]
  }
];
