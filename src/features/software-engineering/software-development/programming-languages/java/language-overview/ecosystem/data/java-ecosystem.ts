import type { LocalizedText } from '../../../../../../../../shared/lib/localized-text';
import type { JavaTechnology } from '../../../data/java-technology';

const text = (es: string, en: string): LocalizedText => ({ es, en });

export const javaTechnologies: JavaTechnology[] = [
  { id: 'spring', name: 'Spring', need: text('Desarrollo Backend', 'Backend Development'), outcome: text('Aplicaciones Backend con Java y Spring.', 'Backend applications with Java and Spring.'), sourceIds: ['spring'] },
  { id: 'hibernate', name: 'Hibernate', need: text('Persistencia con ORM', 'Database ORM'), outcome: text('Mapeo entre objetos Java y datos relacionales.', 'Mapping between Java objects and relational data.'), sourceIds: ['hibernate'] },
  { id: 'javafx', name: 'JavaFX', need: text('Aplicaciones de Escritorio', 'Desktop Apps'), outcome: text('Interfaces para aplicaciones de escritorio.', 'User interfaces for desktop applications.'), sourceIds: ['javafx'] },
  { id: 'android-sdk', name: 'Android SDK', need: text('Aplicaciones Móviles', 'Mobile Apps'), outcome: text('Herramientas para desarrollar aplicaciones Android.', 'Tools for developing Android applications.'), sourceIds: ['android'] },
  { id: 'maven', name: 'Maven', need: text('Gestión de Proyectos', 'Project Management'), outcome: text('Gestión de la construcción de proyectos Java.', 'Build management for Java projects.'), sourceIds: ['maven'] },
  { id: 'jenkins', name: 'Jenkins', need: text('Automatización CI/CD', 'CI/CD Automation'), outcome: text('Automatización de integración y entrega.', 'Automation of integration and delivery.'), sourceIds: ['jenkins'] },
  { id: 'kafka', name: 'Apache Kafka', need: text('Flujos de Datos', 'Data Streaming'), outcome: text('Procesamiento y transporte de flujos de eventos.', 'Processing and transport of event streams.'), sourceIds: ['kafka'] },
  { id: 'selenium', name: 'Selenium', need: text('Pruebas Automatizadas', 'Automation Testing'), outcome: text('Automatización de pruebas de aplicaciones web.', 'Automated testing of web applications.'), sourceIds: ['selenium'] },
  { id: 'jsp', name: 'JSP', need: text('Aplicaciones Web', 'Web Applications'), outcome: text('Generación de páginas web desde el servidor.', 'Server-side web page generation.'), sourceIds: ['jsp'] },
];

export const javaArchitecture: JavaTechnology = {
  id: 'microservices', name: 'Microservices', need: text('Sistemas Escalables', 'Scalable Systems'),
  outcome: text('Organización de aplicaciones en servicios independientes.', 'Organizing applications into independent services.'), sourceIds: ['microservices'],
};

export const springTechnologies: JavaTechnology[] = [
  { id: 'spring-boot', name: 'Spring Boot', need: text('Aplicaciones Web', 'Web Applications'), outcome: text('Soporte para aplicaciones web en producción.', 'Support for web applications in production.'), sourceIds: ['springBoot'] },
  { id: 'spring-data-jpa', name: 'Spring Data JPA', need: text('Persistencia de Datos', 'Data Persistence'), outcome: text('Operaciones sobre bases de datos.', 'Database operations.'), sourceIds: ['springDataJpa'] },
  { id: 'spring-security', name: 'Spring Security', need: text('Seguridad', 'Security'), outcome: text('Protección de aplicaciones.', 'Application protection.'), sourceIds: ['springSecurity'] },
  { id: 'spring-web', name: 'Spring Web', need: text('APIs RESTful', 'RESTful APIs'), outcome: text('Desarrollo de APIs REST.', 'Development of REST APIs.'), sourceIds: ['springWeb'] },
  { id: 'spring-webflux', name: 'Spring WebFlux', need: text('Aplicaciones Reactivas', 'Reactive Applications'), outcome: text('Desarrollo de sistemas reactivos.', 'Development of reactive systems.'), sourceIds: ['springWebflux'] },
  { id: 'spring-cloud', name: 'Spring Cloud', need: text('Aplicaciones Nativas de la Nube', 'Cloud-native Applications'), outcome: text('Herramientas para aplicaciones distribuidas en la nube.', 'Tools for distributed applications in the cloud.'), sourceIds: ['springCloud'] },
  { id: 'spring-cloud-openfeign', name: 'Spring Cloud OpenFeign', need: text('Comunicación de Microservicios', 'Microservice Communication'), outcome: text('Comunicación entre servicios.', 'Service-to-service communication.'), sourceIds: ['openFeign'] },
  { id: 'spring-amqp-kafka', name: 'Spring AMQP / Kafka', need: text('Mensajería', 'Messaging'), outcome: text('Mensajería asíncrona.', 'Asynchronous messaging.'), sourceIds: ['springAmqp', 'springKafka'] },
  { id: 'spring-cache', name: 'Spring Cache', need: text('Caché', 'Cache'), outcome: text('Soporte de caché para mejorar el rendimiento.', 'Caching support to improve performance.'), sourceIds: ['springCache'] },
  { id: 'spring-batch', name: 'Spring Batch', need: text('Trabajos por Lotes', 'Batch Jobs'), outcome: text('Procesamiento de datos por lotes.', 'Batch data processing.'), sourceIds: ['springBatch'] },
  { id: 'junit-mockito', name: 'JUnit + Mockito', need: text('Pruebas', 'Testing'), outcome: text('Pruebas unitarias.', 'Unit tests.'), sourceIds: ['junit', 'mockito'] },
  { id: 'springdoc-openapi', name: 'Springdoc OpenAPI', need: text('Documentación', 'Documentation'), outcome: text('Generación de documentación de API.', 'API documentation generation.'), sourceIds: ['springdoc'] },
  { id: 'spring-actuator', name: 'Spring Actuator', need: text('Monitoreo', 'Monitoring'), outcome: text('Información para supervisar aplicaciones en producción.', 'Information for monitoring applications in production.'), sourceIds: ['actuator'] },
];
