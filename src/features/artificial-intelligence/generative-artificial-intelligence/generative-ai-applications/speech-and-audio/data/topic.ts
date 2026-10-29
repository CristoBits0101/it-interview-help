import type { Topic } from '../../data/topic';

export const speechAndAudioTopic: Topic = { id: 'ai-speech', es: 'Voz y Audio', en: 'Speech and Audio', entries: [
    ['ai-speech-processing', 'Procesamiento de Voz', 'Speech Processing', 'Agrupa técnicas para analizar y generar señales de voz humana.', 'It groups techniques for analyzing and generating human speech signals.', 'nlp'],
    ['ai-speech-recognition', 'Reconocimiento de Voz', 'Speech Recognition', 'Identifica el contenido lingüístico del habla. Es la base de la transcripción automática.', 'It recognizes the linguistic content of speech. It underpins automatic transcription.', 'whisper'],
    ['ai-stt', 'Voz a Texto', 'Speech to Text', 'Convierte el habla de una grabación en texto mediante reconocimiento automático de voz.', 'It converts recorded speech to text using automatic speech recognition.', 'whisper'],
    ['ai-transcription', 'Transcripción', 'Transcription', 'Es la versión escrita de una grabación de voz. Puede obtenerse manualmente o con reconocimiento automático.', 'Transcription is the written form of recorded speech. It can be produced manually or automatically.', 'whisper'],
    ['ai-tts', 'Texto a Voz', 'Text to Speech', 'Genera una señal de voz a partir de texto escrito.', 'It generates a speech signal from written text.', 'tts'],
  ] };
