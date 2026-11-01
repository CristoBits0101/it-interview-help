import type { FoundationGuide } from '../../../../../../../../../shared/lib/foundation-guide';
import { javaSetupSources } from '../../../../../../../../../shared/data/concept-sources';

export const springProjectGuide: FoundationGuide = {
  "route": "spring-boot/project-creation",
  "label": "Project Creation",
  "title": {
    "es": "Creación de Proyectos con Spring Boot",
    "en": "Project Creation with Spring Boot"
  },
  "description": {
    "es": "Configura los campos del proyecto Spring Boot con los valores del ejemplo.",
    "en": "Configure the Spring Boot project fields with the example values."
  },
  "diagram": [],
  "concepts": [],
  "sections": [
    {
      "title": {
        "es": "Campos del Proyecto",
        "en": "Project Fields"
      },
      "description": {
        "es": "El ejemplo utiliza la versión 1.0.0.",
        "en": "The example uses version 1.0.0."
      },
      "items": [
        {
          "title": {
            "es": "Group",
            "en": "Group"
          },
          "description": {
            "es": "Group corresponde al groupId de Maven y agrupa proyectos de una compañía. Las coordenadas completas combinan Group y Artifact y versión.",
            "en": "Group corresponds to the Maven groupId and groups a company’s projects. Full coordinates combine Group and Artifact and version."
          },
          "source": javaSetupSources.mavenCoordinates,
          "code": "com.creativa360.itv\ncom.creativa360.itv:cd360itv-api-core:1.0.0"
        },
        {
          "title": {
            "es": "Artifact",
            "en": "Artifact"
          },
          "description": {
            "es": "Artifact identifica el artefacto y suele dar nombre a la carpeta del proyecto. El JAR usa normalmente artifactId-version aunque la configuración puede cambiarlo.",
            "en": "Artifact identifies the artifact and usually names the project directory. The JAR normally uses artifactId-version although configuration can change it."
          },
          "source": javaSetupSources.mavenCoordinates,
          "code": "cd360itv-api-core"
        },
        {
          "title": {
            "es": "Package name",
            "en": "Package name"
          },
          "description": {
            "es": "Package name define el nombre del paquete raíz.",
            "en": "Package name defines the root package name."
          },
          "source": javaSetupSources.springPackages,
          "code": "com.creativa360.itv.api.core"
        },
        {
          "title": {
            "es": "Name",
            "en": "Name"
          },
          "description": {
            "es": "Name es el nombre legible del proyecto. La clase principal que arranca la aplicación usa un identificador Java válido generado por separado.",
            "en": "Name is the human-readable project name. The main class that starts the application uses a valid Java identifier generated separately."
          },
          "source": javaSetupSources.initializr,
          "code": "CD360 ITV API Core"
        },
        {
          "title": {
            "es": "Description",
            "en": "Description"
          },
          "description": {
            "es": "Description es una breve descripción del proyecto.",
            "en": "Description is a brief description of the project."
          },
          "source": javaSetupSources.mavenPom,
          "code": "Core API para autenticación y gestión ITV"
        }
      ]
    }
  ],
  "questions": [],
  "related": [],
  "source": javaSetupSources.initializr
};
