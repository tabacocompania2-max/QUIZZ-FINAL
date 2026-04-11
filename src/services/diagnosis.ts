const PAIN_QUESTIONS = [
  'vivir en piloto automático sin elegir su vida',
  'cuándo fue la última vez que se sintió en paz consigo mismo/a',
  'entender por qué reacciona de cierta forma',
  'repetir los mismos patrones en relaciones o situaciones',
  'preocupación o ansiedad que no puede explicar',
  'dificultad para poner límites sin sentirse culpable',
  'autoestima dependiente de lo que otros piensan',
  'dificultad para soltar situaciones o personas del pasado',
  'sentir que hay una versión de sí mismo/a que no ha podido ser',
  'vacío o falta de sentido aunque la vida esté bien por fuera',
];

const PAIN_OPTIONS = [
  ['A menudo', 'A veces', 'Casi nunca'],
  ['Hace mucho tiempo', 'Hace algunos meses', 'Hace poco'],
  ['Sí, mucho', 'A veces', 'Raramente'],
  ['Sí, lo noto claramente', 'Creo que sí', 'No lo creo'],
  ['Casi siempre', 'A veces', 'Rara vez'],
  ['Sí, siempre', 'Depende', 'No me cuesta'],
  ['Más de lo que quisiera', 'A veces', 'No mucho'],
  ['Me cuesta mucho', 'Algo', 'Casi no me cuesta'],
  ['Sí, claramente', 'Tal vez', 'No lo creo'],
  ['Seguido', 'A veces', 'Casi nunca'],
];

const DREAM_QUESTIONS = [
  'qué cambiaría en cómo se siente en 8 semanas',
  'qué quisiera dejar de sentir',
  'qué aspecto de su bienestar quiere trabajar',
  'qué le ha impedido avanzar hasta ahora',
  'qué tan dispuesto/a está a hacer un cambio',
  'qué tan cerca está de la versión de sí mismo/a que quiere ser',
];

export async function generatePersonalizedDiagnosis(
  name: string,
  gender: string,
  answers: Record<string, string | string[]>
): Promise<string> {
  const painSummary = PAIN_QUESTIONS.map((q, i) => {
    const answer = answers[`pain_${i}`];
    if (!answer) return null;
    const options = PAIN_OPTIONS[i];
    const intensity = answer === options[0] ? 'alto' : answer === options[1] ? 'medio' : 'bajo';
    return `- ${q}: ${answer} (intensidad ${intensity})`;
  }).filter(Boolean).join('\n');

  const dreamSummary = DREAM_QUESTIONS.map((q, i) => {
    const answer = answers[`dream_${i}`];
    if (!answer) return null;
    return `- ${q}: ${Array.isArray(answer) ? answer.join(', ') : answer}`;
  }).filter(Boolean).join('\n');

  const genderTerm = gender === 'mujer' ? 'mujer' : gender === 'hombre' ? 'hombre' : 'persona';

  const prompt = `Eres un psicólogo empático especializado en bienestar emocional. Basándote en las respuestas de ${name} (${genderTerm}), escribe un diagnóstico emocional personalizado de exactamente 3 oraciones.

REGLAS IMPORTANTES:
- Empieza SIEMPRE con el nombre: "${name},"
- Refleja ESPECÍFICAMENTE lo que respondió — no uses frases genéricas
- Nombra los dolores concretos que aparecen con mayor intensidad en sus respuestas
- Menciona lo que desea lograr basándote en sus respuestas de sueño
- Tono cálido, íntimo y esperanzador — como un amigo que te conoce profundamente
- Máximo 60 palabras en total
- No menciones la app, el quiz ni ningún producto
- Escribe en español neutro latinoamericano
- NO uses comillas ni formato especial — solo texto plano

RESPUESTAS DE DOLOR:
${painSummary}

RESPUESTAS DE SUEÑO:
${dreamSummary}

Escribe SOLO el diagnóstico, nada más.`;

  try {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            maxOutputTokens: 150,
            temperature: 0.7,
          },
        }),
      }
    );

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    if (!text) throw new Error('Empty response');
    return text;
  } catch (error) {
    console.error('Diagnosis API error:', error);
    return `${name}, tus respuestas revelan un patrón claro de desconexión interior y búsqueda de paz. Lo que sientes tiene un origen y una solución. Este es tu punto de partida.`;
  }
}
