import type { FoundationGuide } from '../../../../../../../../shared/lib/foundation-guide';
import { javaSetupSources } from '../../../../../../../../shared/data/concept-sources';

export const jdkEnvironmentGuide: FoundationGuide = {
  "route": "java/jdk-environment",
  "label": "Development Environment",
  "title": {
    "es": "Entorno de Desarrollo",
    "en": "Development Environment"
  },
  "description": {
    "es": "Aprende a instalar y configurar las herramientas necesarias para desarrollar aplicaciones en Java.",
    "en": "Learn to install and configure the tools needed to develop applications in Java."
  },
  "diagram": [],
  "separateIntroduction": true,
  "concepts": [],
  "sections": [
    {
      "title": {
        "es": "Introducción al JDK",
        "en": "Introduction to the JDK"
      },
      "items": [],
      "groups": [
        {
          "question": true,
          "title": {
            "es": "¿Qué es el JDK?",
            "en": "What Is the JDK?"
          },
          "description": {
            "es": "El JDK (Java Development Kit) es el kit de desarrollo de Java. Es un SDK (Software Development Kit) específico para crear y ejecutar aplicaciones Java.",
            "en": "The JDK (Java Development Kit) is the Java development kit. It is a specific SDK (Software Development Kit) for creating and running Java applications."
          },
          "items": []
        },
        {
          "question": true,
          "title": {
            "es": "¿Qué incluye el JDK?",
            "en": "What Does the JDK Include?"
          },
          "description": {
            "es": "El JDK incluye los componentes necesarios para desarrollar y ejecutar programas Java.",
            "en": "The JDK includes the components needed to develop and run Java programs."
          },
          "items": [
            {
              "title": {
                "es": "Compilador",
                "en": "Compiler"
              },
              "description": {
                "es": "javac convierte archivos .java en archivos .class con bytecode. Está en la carpeta bin del JDK.",
                "en": "javac converts .java files into .class files containing bytecode. It is in the JDK bin directory."
              },
              "source": javaSetupSources.javac,
              "code": "C:\\Program Files\\Java\\jdk-21\\bin"
            },
            {
              "title": {
                "es": "Runtime",
                "en": "Runtime"
              },
              "description": {
                "es": "Incluye la JVM (Java Virtual Machine) que ejecuta bytecode mediante java y las bibliotecas estándar con las clases base de ejecución. Un JDK moderno contiene este entorno sin requerir un JRE (Java Runtime Environment) separado.",
                "en": "It includes the JVM (Java Virtual Machine) that executes bytecode through java and the standard libraries with the base runtime classes. A modern JDK contains this environment without requiring a separate JRE (Java Runtime Environment)."
              },
              "source": javaSetupSources.jdkRuntime,
              "code": "C:\\Program Files\\Java\\jdk-21"
            },
            {
              "title": {
                "es": "Herramientas",
                "en": "Tools"
              },
              "description": {
                "es": "Incluye herramientas como jar y javadoc y jshell.",
                "en": "It includes tools such as jar and javadoc and jshell."
              },
              "source": javaSetupSources.jdkTools
            },
            {
              "title": {
                "es": "Bibliotecas de desarrollo",
                "en": "Development Libraries"
              },
              "description": {
                "es": "Incluye las bibliotecas necesarias para compilar programas Java.",
                "en": "It includes the libraries needed to compile Java programs."
              },
              "source": javaSetupSources.jdkTools
            }
          ]
        }
      ]
    },
    {
      "title": {
        "es": "Descargar el JDK",
        "en": "Download the JDK"
      },
      "description": {
        "es": "Descarga e instala la distribución adecuada para tu sistema operativo.",
        "en": "Download and install the appropriate distribution for your operating system."
      },
      "items": [
        {
          "title": {
            "es": "Oracle JDK",
            "en": "Oracle JDK"
          },
          "description": {
            "es": "Oracle distribuye Oracle JDK con condiciones que dependen de la versión y actualización y del uso previsto. Comprueba su licencia antes de instalarlo.",
            "en": "Oracle distributes Oracle JDK under terms that depend on the version and update and intended use. Check its license before installing it."
          },
          "source": javaSetupSources.jdkDownloads
        },
        {
          "title": {
            "es": "OpenJDK 21",
            "en": "OpenJDK 21"
          },
          "description": {
            "es": "OpenJDK es el proyecto de código abierto de Java. El enlace a JDK 21 contiene compilaciones archivadas sin los últimos parches de seguridad y no implica una prohibición de uso en desarrollo.",
            "en": "OpenJDK is the open-source Java project. The JDK 21 link contains archived builds without the latest security patches and does not imply a ban on development use."
          },
          "source": javaSetupSources.jdkArchive
        }
      ]
    },
    {
      "title": {
        "es": "Configurar las variables de entorno",
        "en": "Configure Environment Variables"
      },
      "description": {
        "es": "JAVA_HOME indica la raíz del JDK sin bin para herramientas como Maven y Gradle y Tomcat. Path o PATH permite localizar java y javac desde la terminal.",
        "en": "JAVA_HOME identifies the JDK root without bin for tools such as Maven and Gradle and Tomcat. Path or PATH allows the terminal to find java and javac."
      },
      "items": [],
      "groups": [
        {
          "title": {
            "es": "Windows",
            "en": "Windows"
          },
          "description": {
            "es": "Utiliza las variables de usuario. La ruta C:\\Program Files\\Java\\jdk-21 es un ejemplo que debes adaptar a tu instalación.",
            "en": "Use user variables. The path C:\\Program Files\\Java\\jdk-21 is an example that you must adapt to your installation."
          },
          "items": [
            {
              "title": {
                "es": "Abrir las variables de entorno",
                "en": "Open Environment Variables"
              },
              "description": {
                "es": "Busca Configuración avanzada del sistema en Inicio. En Propiedades del sistema abre Opciones avanzadas y Variables de entorno y localiza Variables de usuario.",
                "en": "Search for Advanced system settings in Start. In System Properties open Advanced and Environment Variables and find User Variables."
              },
              "source": javaSetupSources.javaPath
            },
            {
              "title": {
                "es": "Configurar JAVA_HOME",
                "en": "Configure JAVA_HOME"
              },
              "description": {
                "es": "Pulsa Nueva en Variables de usuario o edita JAVA_HOME si ya existe. Escribe JAVA_HOME como nombre y C:\\Program Files\\Java\\jdk-21 como valor sin bin.",
                "en": "Select New under User Variables or edit JAVA_HOME if it already exists. Enter JAVA_HOME as the name and C:\\Program Files\\Java\\jdk-21 as the value without bin."
              },
              "source": javaSetupSources.mavenSetup,
              "code": "JAVA_HOME=C:\\Program Files\\Java\\jdk-21"
            },
            {
              "title": {
                "es": "Configurar Path",
                "en": "Configure Path"
              },
              "description": {
                "es": "Selecciona Path y pulsa Editar y Nueva para añadir %JAVA_HOME%\\bin. Equivale a C:\\Program Files\\Java\\jdk-21\\bin en este ejemplo y debes conservar las demás entradas.",
                "en": "Select Path and choose Edit and New to add %JAVA_HOME%\\bin. It equals C:\\Program Files\\Java\\jdk-21\\bin in this example and you must preserve the other entries."
              },
              "source": javaSetupSources.javaPath,
              "code": "%JAVA_HOME%\\bin"
            },
            {
              "title": {
                "es": "Guardar y comprobar",
                "en": "Save and Verify"
              },
              "description": {
                "es": "Acepta los cambios y abre una terminal PowerShell nueva. Comprueba las versiones y rutas obtenidas porque otra entrada anterior de Path puede seleccionar otro Java.",
                "en": "Confirm the changes and open a new PowerShell terminal. Check the reported versions and paths because an earlier Path entry may select another Java."
              },
              "source": javaSetupSources.jdkTools,
              "code": "$env:JAVA_HOME\njava --version\njavac --version\nwhere.exe java\nwhere.exe javac"
            }
          ]
        },
        {
          "title": {
            "es": "Linux",
            "en": "Linux"
          },
          "description": {
            "es": "Este ejemplo configura terminales Bash interactivas que no son de inicio de sesión mediante ~/.bashrc. Otras shells y las sesiones de inicio de Bash usan archivos distintos y no deben asumir esta configuración.",
            "en": "This example configures interactive non-login Bash terminals through ~/.bashrc. Other shells and Bash login sessions use different files and must not assume this configuration."
          },
          "items": [
            {
              "title": {
                "es": "Localizar el JDK",
                "en": "Locate the JDK"
              },
              "description": {
                "es": "Consulta la carpeta de la instalación elegida y comprueba que contiene bin/java y bin/javac. /opt/jdk-21 es solo un ejemplo y la ruta real depende de la distribución y del método de instalación.",
                "en": "Check the directory of the chosen installation and confirm that it contains bin/java and bin/javac. /opt/jdk-21 is only an example and the actual path depends on the distribution and installation method."
              },
              "source": javaSetupSources.jdkLinux
            },
            {
              "title": {
                "es": "Editar ~/.bashrc",
                "en": "Edit ~/.bashrc"
              },
              "description": {
                "es": "Abre ~/.bashrc con tu editor y añade estas líneas sin borrar el contenido existente. Sustituye /opt/jdk-21 por la raíz real del JDK sin bin.",
                "en": "Open ~/.bashrc in your editor and add these lines without deleting existing content. Replace /opt/jdk-21 with the actual JDK root without bin."
              },
              "source": javaSetupSources.javaPath,
              "code": "export JAVA_HOME=\"/opt/jdk-21\"\nexport PATH=\"$JAVA_HOME/bin:$PATH\""
            },
            {
              "title": {
                "es": "Recargar y comprobar",
                "en": "Reload and Verify"
              },
              "description": {
                "es": "Guarda el archivo y ejecuta estos comandos en Bash. Comprueba que java y javac corresponden al JDK elegido.",
                "en": "Save the file and run these commands in Bash. Check that java and javac belong to the chosen JDK."
              },
              "source": javaSetupSources.bashStartup,
              "code": "source ~/.bashrc\nprintf \"%s\\n\" \"$JAVA_HOME\"\ncommand -v java\ncommand -v javac\njava --version\njavac --version"
            },
            {
              "title": {
                "es": "Alcance de los cambios",
                "en": "Scope of the Changes"
              },
              "description": {
                "es": "Estas variables afectan a esa shell y sus procesos hijos y no configuran globalmente el sistema. Un IDE abierto no recibe los cambios y puede necesitar reinicio y configuración propia del JDK.",
                "en": "These variables affect that shell and its child processes and do not configure the whole system. An open IDE does not receive the changes and may need a restart and its own JDK configuration."
              },
              "source": javaSetupSources.bashStartup
            }
          ]
        }
      ]
    }
  ],
  "questions": [],
  "related": [],
  "source": javaSetupSources.jdkTools
};
