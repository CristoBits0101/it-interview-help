import type { Topic } from '../../data/topic';

export const ragAndReliabilityTopic: Topic = { id: 'ai-rag', es: 'RAG y Fiabilidad', en: 'RAG and Reliability', entries: [
    ['ai-rag', 'RAG', 'RAG', 'Aporta información externa al modelo para generar respuestas con contexto. No elimina todos los errores.', 'It retrieves external information and supplies it as context for generation. It does not eliminate all errors.', 'rag'],
    ['ai-grounding', 'Fundamentación', 'Grounding', 'Vincula una respuesta con información verificable para que sus afirmaciones puedan contrastarse.', 'It connects a response to verifiable information so its claims can be checked.', 'risk'],
    ['ai-hallucination-mitigation', 'Reducción de Alucinaciones', 'Hallucination Mitigation', 'Combina evidencia y comprobaciones para reducir afirmaciones falsas del modelo. No garantiza eliminarlas.', 'It combines evidence and checks to reduce false model claims. It cannot guarantee their elimination.', 'risk'],
    ['ai-explainable', 'IA Explicable', 'Explainable AI', 'Busca explicar los resultados de un sistema de forma comprensible y fiel a su funcionamiento.', 'Seeks understandable explanations of system results. An explanation should also reflect how the system works.', 'explain', 'Intermedio'],
    ['ai-transparency', 'Transparencia', 'Transparency', 'Comunica cómo se usa un sistema y cuáles son sus capacidades y límites para facilitar una evaluación informada.', 'It communicates how a system is used and its capabilities and limits to support informed assessment.', 'risk'],
    ['ai-deepfake', 'Deepfake', 'Deepfake', 'Es contenido sintético que imita una identidad o una situación real. Puede utilizarse para engañar sobre lo ocurrido.', 'Synthetic content that imitates a real identity or situation. It can mislead people about what happened.', 'risk'],
    ['ai-input-processing', 'Preparación de Entradas', 'Input Processing', 'Valida y transforma los datos recibidos antes de enviarlos al modelo.', 'It validates and transforms incoming data before sending it to a model.', 'messages'],
    ['ai-edge-computing', 'Computación en el Borde', 'Edge Computing', 'Procesa datos cerca de donde se generan para reducir transferencias y dependencia de servicios remotos.', 'It processes data near its source to reduce transfers and dependence on remote services.', 'edgeComputing', 'Intermedio'],
  ] };
