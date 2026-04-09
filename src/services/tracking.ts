const SHEETS_URL = 'https://script.google.com/macros/s/AKfycbwkZuwQHk1z_d8kGtQU7vk_VCn4U1bENRpqDfEF35VUtmoxLSO2vMues7hlGxcczsq1/exec';

export async function trackEmailCapture(data: {
  email: string;
  gender: string;
  age: string;
  answers: Record<string, string | string[]>;
}) {
  try {
    await fetch(SHEETS_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fecha: new Date().toLocaleString('es-MX'),
        email: data.email,
        nombre: '',
        genero: data.gender,
        edad: data.age,
        dificultad: '',
        meta: '',
        compromiso: '',
        respuestasPain: JSON.stringify(data.answers),
        respuestasDream: '',
        planSeleccionado: ''
      })
    });
  } catch (error) {
    console.error('Sheets error:', error);
  }
}

export async function trackOfferReached(data: {
  email: string;
  nombre: string;
  gender: string;
  age: string;
  answers: Record<string, string | string[]>;
  mainDifficulty: string;
  goal: string;
  commitment: string;
}) {
  try {
    await fetch(SHEETS_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fecha: new Date().toLocaleString('es-MX'),
        email: data.email,
        nombre: data.nombre,
        genero: data.gender,
        edad: data.age,
        dificultad: data.mainDifficulty,
        meta: data.goal,
        compromiso: data.commitment,
        respuestasPain: JSON.stringify(data.answers),
        respuestasDream: '',
        planSeleccionado: ''
      })
    });
  } catch (error) {
    console.error('Sheets error:', error);
  }
}

export async function trackPlanSelected(email: string, plan: string) {
  try {
    await fetch(SHEETS_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fecha: new Date().toLocaleString('es-MX'),
        email: email,
        nombre: '',
        genero: '',
        edad: '',
        dificultad: '',
        meta: '',
        compromiso: '',
        respuestasPain: '',
        respuestasDream: '',
        planSeleccionado: plan
      })
    });
  } catch (error) {
    console.error('Sheets error:', error);
  }
}

const BREVO_API_KEY = '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';
const BREVO_LIST_ID = 3;

export async function addToBrevo(email: string, nombre: string) {
  try {
    await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': BREVO_API_KEY
      },
      body: JSON.stringify({
        email: email,
        attributes: { FIRSTNAME: nombre },
        listIds: [BREVO_LIST_ID],
        updateEnabled: true
      })
    });
  } catch (error) {
    console.error('Brevo error:', error);
  }
}
