import type { Topic } from './topic';
import { modelsAndLanguageTopic } from '../models-and-language/data/topic';
import { searchAndRetrievalTopic } from '../search-and-retrieval/data/topic';
import { vectorIndexesAndStorageTopic } from '../vector-indexes-and-storage/data/topic';
import { ragAndReliabilityTopic } from '../rag-and-reliability/data/topic';
import { agentsAndOrchestrationTopic } from '../agents-and-orchestration/data/topic';
import { librariesAndFrameworksTopic } from '../libraries-and-frameworks/data/topic';
import { modelsAndProvidersTopic } from '../models-and-providers/data/topic';
import { multimodalFoundationsTopic } from '../multimodal-foundations/data/topic';
import { imageAndVideoGenerationTopic } from '../image-and-video-generation/data/topic';
import { speechAndAudioTopic } from '../speech-and-audio/data/topic';
import type { Track } from '../../../../../shared/lib/curriculum';
import { glossarySources } from '../../../../../shared/data/concept-sources';

export const glossaryTopics: Topic[] = [modelsAndLanguageTopic, searchAndRetrievalTopic, vectorIndexesAndStorageTopic, ragAndReliabilityTopic, agentsAndOrchestrationTopic, librariesAndFrameworksTopic, modelsAndProvidersTopic, multimodalFoundationsTopic, imageAndVideoGenerationTopic, speechAndAudioTopic];

export const glossaryTranslations = Object.fromEntries(glossaryTopics.flatMap(topic => [
  [topic.es, topic.en], ...topic.entries.flatMap(([, es, en, text, english]) => [[es, en], [text, english]]),
]));

const originalNames: Record<string, string> = {
  'ai-agents': 'Agentes de IA', 'ai-tokenizacion': 'Tokenizacion',
  'ai-templates': 'Prompting Templates', 'ai-lemmatization': 'Lematizacion',
  'ai-multimodal': 'IA Multimodal', 'ai-visual-prompt': 'Prompt Engineering Visual',
  'ai-dalle': 'DALL-E', 'ai-qwen': 'Qwen2.5VL',
};
const supplementalIds = new Set(['ai-inferencia', 'ai-tokens', 'ai-contexto', 'ai-alucinacion']);
export const glossaryInventory = glossaryTopics.flatMap(topic => topic.entries.filter(([id]) => !supplementalIds.has(id)).map(([id, , en]) => ({
  id, term: originalNames[id] ?? en, topic: topic.en,
})));

export const aiGlossary: Track = {
  id: 'applied-ai', title: 'Generative AI Applications', eyebrow: 'GENERATIVE AI APPLICATIONS',
  modules: glossaryTopics.map(topic => ({
    id: topic.id, title: topic.es, description: topic.es,
    concepts: topic.entries.map(([id, title, , description, , source, level = 'Esencial']) => ({
      id, title, description, source: glossarySources[source], level,
    })),
  })),
};
