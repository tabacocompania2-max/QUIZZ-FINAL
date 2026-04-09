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
