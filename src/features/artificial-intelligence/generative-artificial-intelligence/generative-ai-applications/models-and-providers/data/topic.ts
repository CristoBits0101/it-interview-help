import type { Topic } from '../../data/topic';

export const modelsAndProvidersTopic: Topic = { id: 'ai-models-tools', es: 'Modelos y Proveedores', en: 'Models and Providers', entries: [
    ['ai-huggingface', 'Hugging Face', 'Hugging Face', 'Ofrece una plataforma para compartir modelos y conjuntos de datos junto con bibliotecas para utilizarlos.', 'It provides a platform for sharing models and datasets alongside libraries to use them.', 'hf'],
    ['ai-openai', 'OpenAI', 'OpenAI', 'Es una organización que desarrolla modelos de IA y ofrece productos y API para utilizarlos.', 'OpenAI develops AI models and provides products and APIs to use them.', 'images'],
    ['ai-mistral', 'Mistral', 'Mistral', 'Es un proveedor de modelos de IA. El nombre también identifica varias de sus familias de modelos.', 'Mistral provides AI models. The name also identifies its model families.', 'mistral'],
    ['ai-llama4', 'Llama 4', 'Llama 4', 'Es una familia de modelos de Meta con capacidades de procesamiento de texto e imágenes.', 'It is a Meta model family with text and image processing capabilities.', 'llama', 'Intermedio'],
    ['ai-llava', 'LLaVA', 'LLaVA', 'Combina visión y lenguaje para responder a instrucciones y preguntas sobre imágenes.', 'LLaVA combines vision and language to answer questions about images.', 'llava', 'Intermedio'],
    ['ai-qwen', 'Qwen2.5-VL', 'Qwen2.5-VL', 'Es una familia de modelos de visión y lenguaje que interpreta imágenes y vídeo junto con instrucciones textuales.', 'It is a vision and language model family that interprets images and video alongside text instructions.', 'qwen', 'Intermedio'],
    ['ai-dalle', 'DALL·E', 'DALL·E', 'Fue una familia de modelos de OpenAI para generar imágenes desde texto. Sus modelos se retiraron de la API.', 'DALL·E generated images from text. Its API models have been retired.', 'dalle'],
    ['ai-whisper', 'Whisper', 'Whisper', 'Es un modelo de reconocimiento de voz que permite transcribir audio y traducir voz al inglés.', 'It is a speech recognition model supporting audio transcription and speech translation into English.', 'whisper'],
    ['ai-edge-tts', 'edge-tts', 'edge-tts', 'Conecta Python al servicio de voz de Microsoft Edge. No es un modelo local ni una biblioteca oficial.', 'It is a Python library accessing Microsoft Edge speech services. It is neither a local model nor an official Microsoft SDK.', 'edge', 'Intermedio'],
  ] };
