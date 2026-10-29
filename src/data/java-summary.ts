import { javaReleases, javaFeatures, type JavaText } from './java-versions';
import { javaFeatureMilestone, javaFeatureState } from '../lib/java-release-state';

interface Highlight { title: JavaText; source: string; status?: JavaText }
const text = (es: string, en: string): JavaText => ({ es, en });
const early: Record<string, Highlight[]> = {
  '1': [
    { title: text('Primera versión estable del JDK', 'First stable JDK release'), source: 'https://ops.java/releases/?lang=en' },
    { title: text('AWT para interfaces gráficas', 'AWT for graphical interfaces'), source: 'https://docs.oracle.com/javase/8/docs/api/java/awt/Component.html' },
  ],
  '1.1': [
    { title: text('JDBC para conectar bases de datos', 'JDBC for database connections'), source: 'https://docs.oracle.com/en/java/javase/24/docs/api/java.sql/java/sql/package-summary.html' },
    { title: text('Reflexión para inspeccionar clases y campos', 'Reflection to inspect classes and fields'), source: 'https://docs.oracle.com/javase/8/docs/api/java/lang/reflect/Field.html' },
  ],
  '1.2': [
    { title: text('Framework de colecciones para listas y conjuntos', 'Collections framework for lists and sets'), source: 'https://docs.oracle.com/javase/8/docs/api/java/util/Collection.html' },
    { title: text('Swing se integra en la plataforma', 'Swing is integrated into the platform'), source: 'https://www.oracle.com/java/technologies/java-foundation-classes-archives.html' },
  ],
  '1.3': [
    { title: text('HotSpot Client y Server en el JDK', 'HotSpot Client and Server in the JDK'), source: 'https://docs.oracle.com/cd/E19455-01/806-7503/6jgceuig7/index.html' },
    { title: text('JNDI para nombres y directorios', 'JNDI for naming and directory services'), source: 'https://docs.oracle.com/cd/E19455-01/806-7503/6jgceuig7/index.html' },
    { title: text('Java Sound para captura y reproducción de audio', 'Java Sound for audio capture and playback'), source: 'https://docs.oracle.com/cd/E19455-01/806-7503/6jgceuig7/index.html' },
  ],
  '1.4': [
    { title: text('NIO incorpora buffers y canales de E/S', 'NIO introduces buffers and I/O channels'), source: 'https://docs.oracle.com/javase/8/docs/technotes/guides/io/index.html' },
    { title: text('API de registro de eventos', 'Logging API for event recording'), source: 'https://docs.oracle.com/javase/8/docs/technotes/guides/lang/enhancements.html' },
    { title: text('Excepciones encadenadas para conservar la causa', 'Chained exceptions to retain the cause'), source: 'https://docs.oracle.com/javase/8/docs/technotes/guides/lang/enhancements.html' },
  ],
  '6': [
    { title: text('API de scripting para integrar motores de scripts', 'Scripting API to integrate script engines'), source: 'https://docs.oracle.com/javase/7/docs/technotes/guides/scripting/index.html' },
    { title: text('JavaCompiler permite invocar el compilador desde código', 'JavaCompiler allows compiler invocation from code'), source: 'https://docs.oracle.com/javase/8/docs/api/javax/tools/JavaCompiler.html' },
  ],
  '5': [
    { title: text('Genéricos para comprobar tipos al compilar', 'Generics for compile-time type checking'), source: 'https://docs.oracle.com/javase/1.5.0/docs/relnotes/features.html' },
    { title: text('Enums para conjuntos de constantes', 'Enums for sets of constants'), source: 'https://docs.oracle.com/javase/1.5.0/docs/relnotes/features.html' },
    { title: text('Anotaciones como metadatos del código', 'Annotations as code metadata'), source: 'https://docs.oracle.com/javase/1.5.0/docs/relnotes/features.html' },
    { title: text('Autoboxing entre primitivos y envoltorios', 'Autoboxing between primitives and wrappers'), source: 'https://docs.oracle.com/javase/1.5.0/docs/relnotes/features.html' },
  ],
  '7': [
    { title: text('try-with-resources cierra recursos automáticamente', 'try-with-resources closes resources automatically'), source: 'https://docs.oracle.com/javase/7/docs/technotes/guides/language/enhancements.html' },
    { title: text('Operador diamante para inferir tipos genéricos', 'Diamond operator for generic type inference'), source: 'https://docs.oracle.com/javase/7/docs/technotes/guides/language/enhancements.html' },
    { title: text('String como selector de switch', 'String as a switch selector'), source: 'https://docs.oracle.com/javase/7/docs/technotes/guides/language/enhancements.html' },
  ],
};
const priorities: Record<number, string[]> = {
  17: ['sealed', 'encapsulation', 'random-generators', 'switch-patterns'],
  19: ['virtual-threads', 'record-patterns', 'switch-patterns', 'structured-concurrency', 'ffm'],
  20: ['virtual-threads', 'record-patterns', 'scoped-values', 'structured-concurrency', 'switch-patterns'],
  21: ['virtual-threads', 'record-patterns', 'switch-patterns', 'sequenced-collections', 'generational-zgc'],
  22: ['ffm', 'unnamed-patterns', 'constructors', 'string-templates'],
  23: ['primitive-patterns', 'module-imports', 'string-templates'],
  24: ['synchronized-virtual', 'compact-headers', 'primitive-patterns', 'constructors'],
  25: ['module-imports', 'compact-main', 'constructors', 'scoped-values', 'primitive-patterns'],
  26: ['http3', 'primitive-patterns', 'structured-concurrency', 'vector-api'],
};
export const javaSummary = javaReleases.filter(release => release.number <= 26).map(release => {
  const selected = priorities[release.number];
  const features = selected ? selected.map(id => javaFeatures.find(feature => feature.id === id)!) : javaFeatures.filter(feature => {
    const milestone = javaFeatureMilestone(feature, release.number);
    return milestone && milestone !== 'experimental';
  }).slice(0, 5);
  const highlights: Highlight[] = early[release.number] ?? features.map(feature => {
    const state = javaFeatureState(feature, release.number);
    const milestone = javaFeatureMilestone(feature, release.number);
    const iteration = state === 'preview' ? feature.preview!.indexOf(release.number) + 1 : state === 'incubator' ? feature.incubator!.indexOf(release.number) + 1 : undefined;
    const status = milestone === 'removed' ? text('Retirada', 'Removed') : milestone === 'finalized' ? text('Definitiva', 'Final') : state === 'preview' ? text(`Vista previa ${iteration}`, `Preview ${iteration}`) : state === 'incubator' ? text(`Incubación ${iteration}`, `Incubator ${iteration}`) : state === 'experimental' ? text('Experimental', 'Experimental') : undefined;
    const title = feature.id === 'string-templates' ? text('Plantillas de cadenas', 'String templates') : feature.title;
    return { title, status, source: feature.source };
  });
  return { ...release, highlights: highlights.length ? highlights : [{ title: release.summary, source: release.source }], lts: [8, 11, 17, 21, 25].includes(release.number) };
});
