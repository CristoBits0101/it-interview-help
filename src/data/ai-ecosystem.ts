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
type ToolReference = readonly [id: string, name: string, url: string, kind?: string];
const referenceGroups: { category: AiToolCategory; tools: ToolReference[] }[] = [
  { category: 'models', tools: [
    ['gpt', 'OpenAI GPT', 'https://platform.openai.com/docs/models', 'model'],
    ['claude', 'Anthropic Claude', 'https://www.anthropic.com/claude', 'model'],
    ['gemini', 'Google Gemini', 'https://ai.google.dev/gemini-api/docs/models', 'model'],
    ['llama', 'Meta Llama', 'https://www.llama.com/', 'model'],
    ['mistral', 'Mistral AI', 'https://mistral.ai/', 'provider'],
    ['cohere', 'Cohere', 'https://cohere.com/', 'provider'],
    ['hugging-face', 'Hugging Face', 'https://huggingface.co/', 'platform'],
    ['ollama', 'Ollama', 'https://ollama.com/', 'inference'],
    ['vllm', 'vLLM', 'https://docs.vllm.ai/', 'inference'],
  ] },
  { category: 'agents', tools: [
    ['langgraph', 'LangGraph', 'https://docs.langchain.com/oss/python/langgraph/overview'],
    ['crewai', 'CrewAI', 'https://docs.crewai.com/'],
    ['autogen', 'Microsoft AutoGen', 'https://microsoft.github.io/autogen/'],
    ['agent-framework', 'Microsoft Agent Framework', 'https://learn.microsoft.com/en-us/agent-framework/'],
    ['llamaindex', 'LlamaIndex Workflows', 'https://developers.llamaindex.ai/'],
    ['strands', 'AWS Strands Agents', 'https://strandsagents.com/'],
    ['camel', 'CAMEL', 'https://www.camel-ai.org/'],
    ['agno', 'Agno', 'https://docs.agno.com/'],
    ['openai-agents', 'OpenAI Agents SDK', 'https://openai.github.io/openai-agents-python/'],
    ['langchain', 'LangChain Agents', 'https://docs.langchain.com/oss/python/langchain/overview'],
    ['pydantic-ai', 'PydanticAI', 'https://ai.pydantic.dev/'],
    ['semantic-kernel', 'Semantic Kernel', 'https://learn.microsoft.com/en-us/semantic-kernel/overview/'],
    ['google-adk', 'Google ADK', 'https://google.github.io/adk-docs/'],
    ['bedrock-agents', 'AWS Bedrock Agents', 'https://docs.aws.amazon.com/bedrock/latest/userguide/agents.html'],
    ['foundry-agents', 'Azure AI Foundry Agent Service', 'https://learn.microsoft.com/en-us/azure/ai-foundry/agents/overview'],
  ] },
  { category: 'rag', tools: [
    ['langchain', 'LangChain', 'https://docs.langchain.com/oss/python/langchain/overview'],
    ['llamaindex', 'LlamaIndex', 'https://developers.llamaindex.ai/'],
    ['haystack', 'Haystack', 'https://docs.haystack.deepset.ai/'],
    ['dspy', 'DSPy', 'https://dspy.ai/'],
    ['ragflow', 'RAGFlow', 'https://ragflow.io/'],
    ['graphrag', 'GraphRAG', 'https://microsoft.github.io/graphrag/'],
    ['unstructured', 'Unstructured', 'https://docs.unstructured.io/'],
    ['embedchain', 'EmbedChain', 'https://github.com/mem0ai/embedchain'],
  ] },
  { category: 'embeddings', tools: [
    ['openai-embeddings', 'OpenAI Embeddings', 'https://platform.openai.com/docs/guides/embeddings'],
    ['cohere-embed', 'Cohere Embed', 'https://docs.cohere.com/docs/embeddings'],
    ['voyage', 'Voyage AI', 'https://docs.voyageai.com/'],
    ['sentence-transformers', 'Sentence Transformers', 'https://sbert.net/'],
    ['bge', 'BGE', 'https://github.com/FlagOpen/FlagEmbedding', 'model'],
    ['vertex-embeddings', 'Google Vertex AI Embeddings', 'https://cloud.google.com/vertex-ai/generative-ai/docs/embeddings/get-text-embeddings'],
    ['azure-embeddings', 'Azure OpenAI Embeddings', 'https://learn.microsoft.com/en-us/azure/ai-foundry/openai/concepts/understand-embeddings'],
  ] },
  { category: 'mcp', tools: [
    ['mcp-sdk', 'MCP SDK', 'https://modelcontextprotocol.io/docs/sdk'],
    ['fastmcp', 'FastMCP', 'https://gofastmcp.com/'],
    ['mcp-registry', 'MCP Registry', 'https://registry.modelcontextprotocol.io/', 'registry'],
    ['github-mcp', 'GitHub MCP Server', 'https://github.com/github/github-mcp-server'],
    ['slack-mcp', 'Slack MCP Server', 'https://github.com/modelcontextprotocol/servers-archived/tree/main/src/slack', 'archived'],
    ['postgres-mcp', 'PostgreSQL MCP Server', 'https://github.com/modelcontextprotocol/servers-archived/tree/main/src/postgres', 'archived'],
    ['gdrive-mcp', 'Google Drive MCP Server', 'https://github.com/modelcontextprotocol/servers-archived/tree/main/src/gdrive', 'archived'],
    ['filesystem-mcp', 'Filesystem MCP Server', 'https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem'],
  ] },
  { category: 'security', tools: [
    ['nemo', 'NVIDIA NeMo Guardrails', 'https://docs.nvidia.com/nemo/guardrails/'],
    ['guardrails-ai', 'Guardrails AI', 'https://www.guardrailsai.com/'],
    ['presidio', 'Microsoft Presidio', 'https://microsoft.github.io/presidio/'],
    ['lakera', 'Lakera Guard', 'https://www.lakera.ai/'],
    ['prompt-security', 'Prompt Security', 'https://www.prompt.security/'],
    ['protect-ai', 'Protect AI', 'https://protectai.com/'],
    ['azure-safety', 'Azure AI Content Safety', 'https://learn.microsoft.com/en-us/azure/ai-services/content-safety/overview'],
    ['bedrock-guardrails', 'AWS Bedrock Guardrails', 'https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html'],
  ] },
  { category: 'observability', tools: [
    ['langsmith', 'LangSmith', 'https://docs.langchain.com/langsmith/'],
    ['langfuse', 'Langfuse', 'https://langfuse.com/docs'],
    ['phoenix', 'Arize Phoenix', 'https://arize.com/docs/phoenix'],
    ['weave', 'Weights & Biases Weave', 'https://weave-docs.wandb.ai/'],
    ['trulens', 'TruLens', 'https://www.trulens.org/'],
    ['ragas', 'Ragas', 'https://docs.ragas.io/'],
    ['promptfoo', 'Promptfoo', 'https://www.promptfoo.dev/docs/intro/'],
    ['helicone', 'Helicone', 'https://docs.helicone.ai/'],
  ] },
  { category: 'memory', tools: [
    ['mem0', 'Mem0', 'https://docs.mem0.ai/'],
    ['zep', 'Zep', 'https://help.getzep.com/'],
    ['letta', 'Letta', 'https://docs.letta.com/'],
    ['langgraph', 'LangGraph Memory', 'https://docs.langchain.com/oss/python/langgraph/overview'],
    ['redis', 'Redis', 'https://redis.io/docs/', 'store'],
    ['postgresql', 'PostgreSQL', 'https://www.postgresql.org/docs/', 'database'],
    ['neo4j', 'Neo4j', 'https://neo4j.com/docs/', 'database'],
    ['chroma', 'Chroma', 'https://docs.trychroma.com/', 'database'],
  ] },
  { category: 'automation', tools: [
    ['n8n', 'n8n', 'https://docs.n8n.io/'],
    ['zapier', 'Zapier', 'https://zapier.com/'],
    ['make', 'Make', 'https://www.make.com/'],
    ['power-automate', 'Microsoft Power Automate', 'https://learn.microsoft.com/en-us/power-automate/'],
    ['temporal', 'Temporal', 'https://docs.temporal.io/'],
    ['airflow', 'Apache Airflow', 'https://airflow.apache.org/docs/'],
    ['prefect', 'Prefect', 'https://docs.prefect.io/'],
    ['kestra', 'Kestra', 'https://kestra.io/docs'],
    ['pipedream', 'Pipedream', 'https://pipedream.com/docs/'],
  ] },
  { category: 'vectors', tools: [
    ['pinecone', 'Pinecone', 'https://docs.pinecone.io/', 'database'],
    ['weaviate', 'Weaviate', 'https://docs.weaviate.io/', 'database'],
    ['qdrant', 'Qdrant', 'https://qdrant.tech/documentation/', 'database'],
    ['milvus', 'Milvus', 'https://milvus.io/docs', 'database'],
    ['chroma', 'Chroma', 'https://docs.trychroma.com/', 'database'],
    ['pgvector', 'pgvector', 'https://github.com/pgvector/pgvector', 'extension'],
    ['elasticsearch', 'Elasticsearch', 'https://www.elastic.co/docs/reference/elasticsearch', 'search'],
    ['redis', 'Redis', 'https://redis.io/docs/', 'store'],
    ['mongodb-vector', 'MongoDB Atlas Vector Search', 'https://www.mongodb.com/docs/atlas/atlas-vector-search/', 'search'],
  ] },
];
export const aiToolKinds: Record<string, LocalizedText> = {
  tool: text('Herramienta o Framework', 'Tool or Framework'), model: text('Familia de Modelos', 'Model Family'),
  provider: text('Proveedor', 'Provider'), platform: text('Plataforma', 'Platform'), inference: text('Motor de Inferencia', 'Inference Runtime'),
  registry: text('Registro', 'Registry'), archived: text('Servidor de Referencia Archivado', 'Archived Reference Server'),
  database: text('Base de Datos', 'Database'), store: text('Almacén de Datos', 'Data Store'), extension: text('Extensión de PostgreSQL', 'PostgreSQL Extension'), search: text('Motor o Servicio de Búsqueda', 'Search Engine or Service'),
};
export type AiEcosystemTool = { id: string; name: string; url: string; kind: string; uses: { category: string; label: string }[] };
const toolMap = new Map<string, AiEcosystemTool>();
for (const group of referenceGroups) {
  for (const [id, name, url, kind = 'tool'] of group.tools) {
    const existing = toolMap.get(id);
    if (existing) existing.uses.push({ category: group.category, label: name });
    else toolMap.set(id, { id, name, url, kind, uses: [{ category: group.category, label: name }] });
  }
}
export const aiEcosystemTools = [...toolMap.values()];
