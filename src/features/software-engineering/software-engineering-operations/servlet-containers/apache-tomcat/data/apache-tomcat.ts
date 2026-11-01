import type { FoundationGuide } from '../../../../../../shared/lib/foundation-guide';
import { javaSetupSources } from '../../../../../../shared/data/concept-sources';

export const tomcatGuide: FoundationGuide = {
  "route": "servlet-containers/apache-tomcat",
  "label": "Apache Tomcat",
  "title": {
    "es": "Apache Tomcat",
    "en": "Apache Tomcat"
  },
  "description": {
    "es": "Apache Tomcat es un contenedor de servlets de código abierto desarrollado y mantenido por la Apache Software Foundation. Implementa Servlet y JSP y otras especificaciones de Java EE o Jakarta EE según la versión sin ser un servidor Jakarta EE completo.",
    "en": "Apache Tomcat is an open-source servlet container developed and maintained by the Apache Software Foundation. It implements Servlet and JSP and other Java EE or Jakarta EE specifications depending on the version without being a full Jakarta EE server."
  },
  "diagram": [],
  "concepts": [],
  "sections": [
    {
      "title": {
        "es": "Qué hace Tomcat",
        "en": "What Tomcat Does"
      },
      "description": {
        "es": "Ejecuta aplicaciones web Java y gestiona su ciclo de vida.",
        "en": "It runs Java web applications and manages their lifecycle."
      },
      "items": [
        {
          "title": {
            "es": "Peticiones HTTP",
            "en": "HTTP Requests"
          },
          "description": {
            "es": "Recibe peticiones HTTP como un servidor web.",
            "en": "It receives HTTP requests like a web server."
          },
          "source": javaSetupSources.tomcatIntroduction
        },
        {
          "title": {
            "es": "Ejecución",
            "en": "Execution"
          },
          "description": {
            "es": "Ejecuta código Java especialmente servlets y páginas JSP.",
            "en": "It executes Java code especially servlets and JSP pages."
          },
          "source": javaSetupSources.tomcatIntroduction
        },
        {
          "title": {
            "es": "Respuestas",
            "en": "Responses"
          },
          "description": {
            "es": "Devuelve respuestas como páginas HTML o archivos estáticos o contenido JSON o XML según la aplicación.",
            "en": "It returns responses such as HTML pages or static files or JSON or XML content depending on the application."
          },
          "source": javaSetupSources.tomcatIntroduction
        },
        {
          "title": {
            "es": "Ciclo de vida",
            "en": "Lifecycle"
          },
          "description": {
            "es": "Gestiona el ciclo de vida de las aplicaciones web Java desplegadas en él.",
            "en": "It manages the lifecycle of the Java web applications deployed in it."
          },
          "source": javaSetupSources.tomcatDeployment
        }
      ]
    }
  ],
  "questions": [],
  "related": [],
  "source": javaSetupSources.tomcatIntroduction
};
