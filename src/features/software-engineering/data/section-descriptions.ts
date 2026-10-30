export const softwareEngineeringSectionDescriptions: Record<string, { es: string; en: string }> = {
  'Software Requirements': { es: '¿Qué necesita el cliente?', en: 'What does the client need?' },
  'Software Engineering Methods': { es: '¿Cómo abordamos el desarrollo del software?', en: 'How do we approach software development?' },
  'System Design': { es: '¿Cómo funcionará el sistema?', en: 'How will the system work?' },
  'Software Architecture': { es: '¿Cómo estructuramos el software?', en: 'How do we structure the software?' },
  'Software Design': { es: '¿Cómo diseñamos la solución?', en: 'How do we design the solution?' },
  'Software Development': { es: '¿Cómo construimos el software?', en: 'How do we build the software?' },
  'Software Testing': { es: '¿Funciona correctamente?', en: 'Does it work correctly?' },
  'Software Quality': { es: '¿Cumple los requisitos de calidad?', en: 'Does it meet the quality requirements?' },
  'Software Engineering Operations': { es: '¿Cómo ponemos el software en funcionamiento?', en: 'How do we put the software into operation?' },
  'Software Maintenance': { es: '¿Cómo mantenemos y evolucionamos el software?', en: 'How do we maintain and evolve the software?' },
};

export const softwareEngineeringSectionTranslations = Object.fromEntries(
  Object.values(softwareEngineeringSectionDescriptions).map(({ es, en }) => [es, en]),
);
