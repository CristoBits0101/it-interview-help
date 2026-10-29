import { aiEcosystemSources } from './concept-sources';
import type { LocalizedText } from './web-foundations';
const text = (es: string, en: string): LocalizedText => ({ es, en });
export const aiToolCategories = [
  { id: 'models', title: text('Modelos e Inferencia', 'Models and Inference') },
  { id: 'agents', title: text('Agentes y Orquestación', 'Agents and Orchestration') },
  { id: 'rag', title: text('RAG', 'RAG') },
  { id: 'embeddings', title: text('Embeddings', 'Embeddings') },
  { id: 'mcp', title: text('MCP e Integraciones', 'MCP and Integrations') },
  { id: 'security', title: text('Seguridad', 'Security') },
  { id: 'observability', title: text('Observabilidad y Evaluación', 'Observability and Evaluation') },
  { id: 'memory', title: text('Memoria y Persistencia', 'Memory and Persistence') },
  { id: 'automation', title: text('Automatización', 'Automation') },
  { id: 'vectors', title: text('Almacenamiento y Búsqueda Vectorial', 'Vector Storage and Search') },
];
export type AiToolCategory = typeof aiToolCategories[number]['id'];
type ToolReference = readonly [id: keyof typeof aiEcosystemSources, name: string, kind?: string];
const referenceGroups: { category: AiToolCategory; tools: ToolReference[] }[] = [
  { category: 'models', tools: [
    ['gpt', 'OpenAI GPT', 'model'],
    ['claude', 'Anthropic Claude', 'model'],
    ['gemini', 'Google Gemini', 'model'],
    ['llama', 'Meta Llama', 'model'],
    ['mistral', 'Mistral AI', 'provider'],
    ['cohere', 'Cohere', 'provider'],
    ['hugging-face', 'Hugging Face', 'platform'],
    ['ollama', 'Ollama', 'inference'],
    ['vllm', 'vLLM', 'inference'],
  ] },
  { category: 'agents', tools: [
    ['langgraph', 'LangGraph'],
    ['crewai', 'CrewAI'],
    ['autogen', 'Microsoft AutoGen'],
    ['agent-framework', 'Microsoft Agent Framework'],
    ['llamaindex', 'LlamaIndex Workflows'],
    ['strands', 'AWS Strands Agents'],
    ['camel', 'CAMEL'],
    ['agno', 'Agno'],
    ['openai-agents', 'OpenAI Agents SDK'],
    ['langchain', 'LangChain Agents'],
    ['pydantic-ai', 'PydanticAI'],
    ['semantic-kernel', 'Semantic Kernel'],
    ['google-adk', 'Google ADK'],
    ['bedrock-agents', 'AWS Bedrock Agents'],
    ['foundry-agents', 'Azure AI Foundry Agent Service'],
  ] },
  { category: 'rag', tools: [
    ['langchain', 'LangChain'],
    ['llamaindex', 'LlamaIndex'],
    ['haystack', 'Haystack'],
    ['dspy', 'DSPy'],
    ['ragflow', 'RAGFlow'],
    ['graphrag', 'GraphRAG'],
    ['unstructured', 'Unstructured'],
    ['embedchain', 'EmbedChain', 'archived-tool'],
  ] },
  { category: 'embeddings', tools: [
    ['openai-embeddings', 'OpenAI Embeddings'],
    ['cohere-embed', 'Cohere Embed'],
    ['voyage', 'Voyage AI'],
    ['sentence-transformers', 'Sentence Transformers'],
    ['bge', 'BGE', 'model'],
    ['vertex-embeddings', 'Google Vertex AI Embeddings'],
    ['azure-embeddings', 'Azure OpenAI Embeddings'],
  ] },
  { category: 'mcp', tools: [
    ['mcp-sdk', 'MCP SDK'],
    ['fastmcp', 'FastMCP'],
    ['mcp-registry', 'MCP Registry', 'registry'],
    ['github-mcp', 'GitHub MCP Server'],
    ['slack-mcp', 'Slack MCP Server', 'archived'],
    ['postgres-mcp', 'PostgreSQL MCP Server', 'archived'],
    ['gdrive-mcp', 'Google Drive MCP Server', 'archived'],
    ['filesystem-mcp', 'Filesystem MCP Server'],
  ] },
  { category: 'security', tools: [
    ['nemo', 'NVIDIA NeMo Guardrails'],
    ['guardrails-ai', 'Guardrails AI'],
    ['presidio', 'Microsoft Presidio'],
    ['lakera', 'Lakera Guard'],
    ['prompt-security', 'Prompt Security'],
    ['protect-ai', 'Protect AI'],
    ['azure-safety', 'Azure AI Content Safety'],
    ['bedrock-guardrails', 'AWS Bedrock Guardrails'],
  ] },
  { category: 'observability', tools: [
    ['langsmith', 'LangSmith'],
    ['langfuse', 'Langfuse'],
    ['phoenix', 'Arize Phoenix'],
    ['weave', 'Weights & Biases Weave'],
    ['trulens', 'TruLens'],
    ['ragas', 'Ragas'],
    ['promptfoo', 'Promptfoo'],
    ['helicone', 'Helicone'],
  ] },
  { category: 'memory', tools: [
    ['mem0', 'Mem0'],
    ['zep', 'Zep'],
    ['letta', 'Letta'],
    ['langgraph', 'LangGraph Memory'],
    ['redis', 'Redis', 'store'],
    ['postgresql', 'PostgreSQL', 'database'],
    ['neo4j', 'Neo4j', 'database'],
    ['chroma', 'Chroma', 'database'],
  ] },
  { category: 'automation', tools: [
    ['n8n', 'n8n'],
    ['zapier', 'Zapier'],
    ['make', 'Make'],
    ['power-automate', 'Microsoft Power Automate'],
    ['temporal', 'Temporal'],
    ['airflow', 'Apache Airflow'],
    ['prefect', 'Prefect'],
    ['kestra', 'Kestra'],
    ['pipedream', 'Pipedream'],
  ] },
  { category: 'vectors', tools: [
    ['pinecone', 'Pinecone', 'database'],
    ['weaviate', 'Weaviate', 'database'],
    ['qdrant', 'Qdrant', 'database'],
    ['milvus', 'Milvus', 'database'],
    ['chroma', 'Chroma', 'database'],
    ['pgvector', 'pgvector', 'extension'],
    ['elasticsearch', 'Elasticsearch', 'search'],
    ['redis', 'Redis', 'store'],
    ['mongodb-vector', 'MongoDB Atlas Vector Search', 'search'],
  ] },
];
export const aiToolKinds: Record<string, LocalizedText> = {
  tool: text('Herramienta o Framework', 'Tool or Framework'), 'archived-tool': text('Framework Archivado', 'Archived Framework'), model: text('Familia de Modelos', 'Model Family'),
  provider: text('Proveedor', 'Provider'), platform: text('Plataforma', 'Platform'), inference: text('Motor de Inferencia', 'Inference Runtime'),
  registry: text('Registro', 'Registry'), archived: text('Servidor de Referencia Archivado', 'Archived Reference Server'),
  database: text('Base de Datos', 'Database'), store: text('Almacén de Datos', 'Data Store'), extension: text('Extensión de PostgreSQL', 'PostgreSQL Extension'), search: text('Motor o Servicio de Búsqueda', 'Search Engine or Service'),
};
export type AiEcosystemTool = { id: string; name: string; url: string; kind: string; uses: { category: string; label: string }[] };
const toolMap = new Map<string, AiEcosystemTool>();
for (const group of referenceGroups) {
  for (const [id, name, kind = 'tool'] of group.tools) {
    const url = aiEcosystemSources[id].url;
    const existing = toolMap.get(id);
    if (existing) existing.uses.push({ category: group.category, label: name });
    else toolMap.set(id, { id, name, url, kind, uses: [{ category: group.category, label: name }] });
  }
}
const canonicalNames: Record<string, string> = { llamaindex: 'LlamaIndex', langchain: 'LangChain' };
export const aiEcosystemTools = [...toolMap.values()].map(tool => ({ ...tool, name: canonicalNames[tool.id] ?? tool.name }));
