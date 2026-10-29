import type { LocalizedText } from '../../../../../../../shared/lib/localized-text';

const text = (es: string, en: string): LocalizedText => ({ es, en });

export const javaCareerPaths = [
  { id: 'backend', title: text('Desarrollador Backend', 'Backend Developer'), technologyIds: ['spring'], focus: text('Desarrollo de aplicaciones Backend.', 'Backend application development.') },
  { id: 'android', title: text('Desarrollador Android', 'Android Developer'), technologyIds: ['android-sdk'], focus: text('Desarrollo de aplicaciones móviles Android.', 'Android mobile application development.') },
  { id: 'desktop', title: text('Desarrollador de Escritorio', 'Desktop Developer'), technologyIds: ['javafx'], focus: text('Desarrollo de aplicaciones de escritorio.', 'Desktop application development.') },
  { id: 'data', title: text('Ingeniero de Datos', 'Data Engineer'), technologyIds: ['kafka'], focus: text('Trabajo con flujos de datos.', 'Working with data streams.') },
];
