import type { Topic } from '../../data/topic';

export const librariesAndFrameworksTopic: Topic = { id: 'ai-frameworks', es: 'Bibliotecas y Frameworks', en: 'Libraries and Frameworks', entries: [
    ['ai-langchain', 'LangChain', 'LangChain', 'Es un framework que integra modelos y herramientas en aplicaciones de IA. No forma parte del lenguaje Python.', 'It is a framework for integrating models and tools into AI applications. It is not a Python language feature.', 'chain'],
    ['ai-langgraph', 'LangGraph', 'LangGraph', 'Organiza procesos con estado en nodos y conexiones para controlar la ejecución de agentes y flujos.', 'It organizes stateful processes as nodes and connections to control agents and workflows.', 'graph', 'Intermedio'],
    ['ai-lcel', 'LCEL', 'LCEL', 'Compone componentes ejecutables de LangChain de forma declarativa. Pertenece al framework y no a Python.', 'It composes LangChain runnable components declaratively. It belongs to the framework rather than Python.', 'lcel', 'Intermedio'],
    ['ai-stategraph', 'StateGraph', 'StateGraph', 'Define un grafo de LangGraph cuyos nodos leen y actualizan un estado compartido.', 'It defines a LangGraph graph whose nodes read and update shared state.', 'graph', 'Intermedio'],
    ['ai-messagegraph', 'MessageGraph', 'MessageGraph', 'Es una interfaz histórica de LangGraph basada en mensajes. Para código nuevo se recomienda StateGraph.', 'MessageGraph is a historical LangGraph interface. New code should use StateGraph with message state.', 'messageGraph', 'Avanzado'],
    ['ai-durable', 'Ejecución Durable', 'Durable Execution', 'Guarda el progreso para reanudar un flujo. Sus pasos deben tolerar repeticiones sin duplicar efectos.', 'It resumes a workflow from saved progress. Steps must handle replay without duplicating effects.', 'durable', 'Intermedio'],
    ['ai-llamaindex', 'LlamaIndex', 'LlamaIndex', 'Es un framework para conectar datos propios con aplicaciones de modelos de lenguaje y procesos de recuperación.', 'It is a framework connecting private data to language model applications and retrieval workflows.', 'llamaindex', 'Intermedio'],
    ['ai-flask', 'Flask', 'Flask', 'Es un framework web de Python para crear aplicaciones y API. No aporta un modelo de IA por sí mismo.', 'It is a Python web framework for applications and APIs. It does not provide an AI model itself.', 'flask'],
  ] };
