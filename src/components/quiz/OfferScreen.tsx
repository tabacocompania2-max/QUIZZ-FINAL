import { useState, useEffect } from 'react';

interface OfferScreenProps {
  name: string;
  mainDifficulty: string;
  mainGoal: string;
  commitment: string;
  gender: string;
}

const faqs = [
  {
    q: 'Ya intenté otras cosas antes y no me funcionaron. ¿Por qué esto sería diferente?',
    a: 'La mayoría de recursos de bienestar fallan porque son genéricos — te dan los mismos consejos sin importar quién eres. Esta guía parte de TUS respuestas específicas. Tu dificultad principal, tus patrones y tu punto de partida definen lo que recibes. No es motivación. Es un proceso diseñado para ti.',
  },
  {
    q: 'No tengo mucho tiempo. ¿Me va a servir igual?',
    a_template: true,
  },
  {
    q: '¿Es realmente personalizada o es lo mismo para todos?',
    a_template: true,
  },
  {
    q: '¿Qué pasa si la pruebo y no funciona para mí?',
    a: 'Tienes 30 días completos para probarlo sin ningún riesgo. Si en ese tiempo no sientes un cambio real, nos escribes y te devolvemos cada peso. Sin formularios complicados, sin preguntas incómodas, sin procesos largos. La garantía existe porque confiamos en lo que hemos creado.',
  },
];

const testimonials = [
  {
    name: 'María C.',
    country: 'México 🇲🇽',
    img: 'https://randomuser.me/api/portraits/women/44.jpg',
    text: 'Llevaba años sintiéndome perdida sin entender por qué. Tenía trabajo, amigos, todo — pero por dentro algo no encajaba. Esta guía me ayudó a ver exactamente qué patrones me estaban bloqueando. Por primera vez siento que me entiendo de verdad.',
  },
  {
    name: 'Andrés R.',
    country: 'Colombia 🇨🇴',
    img: 'https://randomuser.me/api/portraits/men/32.jpg',
    text: 'Fui escéptico porque ya había probado programas, libros, videos. Pero esto fue diferente porque partió de MÍ. El diagnóstico fue preciso y las herramientas prácticas me dieron algo concreto para trabajar. En 4 semanas noté un cambio real en cómo reacciono.',
  },
  {
    name: 'Valentina L.',
    country: 'Argentina 🇦🇷',
    img: 'https://randomuser.me/api/portraits/women/68.jpg',
    text: 'Lo que más me sorprendió fue lo personalizado que se sintió. No era una guía genérica — era exactamente lo que necesitaba para el momento en que estaba. En 3 semanas logré más claridad que en meses buscando respuestas sola.',
  },
];

const genderTexts = (text: string, gender: string) => {
  if (gender === 'mujer') {
    return text
      .replace(/mismo\/a/g, 'misma')
      .replace(/mismo\/a\?/g, 'misma?')
      .replace(/contigo mismo\/a/g, 'contigo misma')
      .replace(/a ti mismo\/a/g, 'a ti misma')
      .replace(/en ti mismo\/a/g, 'en ti misma')
      .replace(/dispuesto\/a/g, 'dispuesta')
      .replace(/atrapado\/a/g, 'atrapada')
      .replace(/mismo\/a/g, 'misma');
  }
  if (gender === 'hombre') {
    return text
      .replace(/mismo\/a/g, 'mismo')
      .replace(/mismo\/a\?/g, 'mismo?')
      .replace(/contigo mismo\/a/g, 'contigo mismo')
      .replace(/a ti mismo\/a/g, 'a ti mismo')
      .replace(/en ti mismo\/a/g, 'en ti mismo')
      .replace(/dispuesto\/a/g, 'dispuesto')
      .replace(/atrapado\/a/g, 'atrapado')
      .replace(/mismo\/a/g, 'mismo');
  }
  return text;
};

export default function OfferScreen({ name, mainDifficulty, mainGoal, commitment, gender }: OfferScreenProps) {
  const [timeLeft, setTimeLeft] = useState(720);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedPlan, setSelectedPlan] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(t => (t > 0 ? t - 1 : 0)), 1000);
    return () => clearInterval(timer);
  }, []);

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const isUrgent = timeLeft < 60;

  const getFaqAnswer = (i: number) => {
    if (i === 1) return genderTexts(`Tú mismo/a elegiste dedicarle ${commitment} al día cuando respondiste el quiz. Con eso es suficiente. La guía está estructurada en bloques cortos y prácticos, no en lecturas interminables. El progreso no depende de cuánto tiempo tienes — depende de que empieces.`, gender);
    if (i === 2) return `Tu guía se genera a partir de las respuestas que diste. Alguien cuya dificultad principal es ansiedad recibe un proceso distinto a alguien cuyo patrón es de relaciones o autoestima. Tu diagnóstico es ${mainDifficulty} — el contenido que recibes está enfocado exactamente en eso.`;
    return faqs[i].a!;
  };

  const ctaLine = (
    <p className="text-xs text-muted-foreground text-center mt-3">
      🔒 Acceso inmediato · ✓ Sin suscripciones · 🛡️ 30 días de garantía
    </p>
  );

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 animate-slide-up space-y-10">

      {/* SECTION 1 — Before / After */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-stretch">
        <div className="rounded-2xl p-5 space-y-3" style={{ background: '#F3F4F6' }}>
          <p className="font-bold text-foreground flex items-center gap-2">🌧️ Hoy te sientes así:</p>
          {[
            'Vives en piloto automático sin saber por qué',
            'Repites los mismos patrones una y otra vez',
            'Te cuesta poner límites sin sentirte culpable',
            genderTexts('Hay una versión de ti que todavía no has podido ser', gender),
          ].map((b, i) => (
            <p key={i} className="text-sm text-foreground/80 flex items-start gap-2"><span className="text-muted-foreground mt-0.5">•</span>{b}</p>
          ))}
        </div>
        <div className="hidden md:flex items-center text-2xl text-muted-foreground">→</div>
        <div className="flex md:hidden justify-center text-2xl text-muted-foreground">↓</div>
        <div className="rounded-2xl p-5 space-y-3" style={{ background: '#EDE9FF' }}>
          <p className="font-bold text-foreground flex items-center gap-2">☀️ En 8 semanas puedes:</p>
          {[
            'Entender por qué sientes y actúas como lo haces',
            genderTexts('Romper los patrones que te tienen atrapado/a', gender),
            'Poner límites desde la seguridad, no desde el miedo',
            genderTexts('Ser la versión de ti que siempre supiste que existía', gender),
          ].map((b, i) => (
            <p key={i} className="text-sm text-foreground/80 flex items-start gap-2"><span style={{ color: '#6C4FBF' }} className="mt-0.5">✓</span>{b}</p>
          ))}
        </div>
      </div>

      {/* SECTION 2 — Headline */}
      <div className="text-center space-y-4">
        <h1 className="text-[26px] font-bold text-foreground">Tu guía está lista, {name}.</h1>
        <p className="text-base text-muted-foreground">Basada exactamente en lo que respondiste. No es genérica. Es tuya.</p>
        <div className="flex flex-wrap justify-center gap-2">
          <span className="px-3 py-1.5 rounded-full text-sm font-medium" style={{ background: '#EDE9FF', color: '#6C4FBF' }}>🎯 {mainDifficulty}</span>
          <span className="px-3 py-1.5 rounded-full text-sm font-medium" style={{ background: '#EDE9FF', color: '#6C4FBF' }}>💫 {mainGoal}</span>
          <span className="px-3 py-1.5 rounded-full text-sm font-medium" style={{ background: '#EDE9FF', color: '#6C4FBF' }}>⏰ {commitment} al día</span>
        </div>
      </div>

      {/* SECTION 3 — Timer */}
      <div className="rounded-xl p-4 text-center" style={{ background: '#FFF8E7', border: '1px solid #F5C842' }}>
        <p className="text-[13px] mb-1" style={{ color: '#856404' }}>Lanzamiento especial — precio disponible solo por tiempo limitado</p>
        <p className="text-sm text-muted-foreground mb-1">Tu descuento del 73% está reservado por:</p>
        <p className="text-[32px] font-bold" style={{ color: isUrgent ? '#DC2626' : '#1A1A2E' }}>
          {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
        </p>
        <p className="text-xs text-muted-foreground mt-1">Una vez que expire, el precio vuelve al valor original.</p>
      </div>

      {/* SECTION 4 — Plans */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-foreground text-center">Elige cómo quieres empezar tu proceso</h2>
        <div className="flex flex-col md:flex-row gap-4">
          
          {/* Plan 2 — Featured (Order 1 on mobile) */}
          <div
            onClick={() => setSelectedPlan(1)}
            className={`cursor-pointer rounded-2xl p-5 border-2 transition-all relative flex-1 order-1 md:order-2 scale-105 z-10 quiz-shadow-lg`}
            style={{ borderColor: '#6C4FBF', background: '#FAFAFE' }}
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-[11px] font-bold rounded-full text-white whitespace-nowrap shadow-md z-20" style={{ background: '#6C4FBF' }}>
              Lo que más eligen
            </div>
            <p className="font-bold text-foreground text-lg mt-2">Guía + bonos esenciales</p>
            <div className="flex items-baseline gap-2 mt-2 mb-1">
              <span className="text-sm text-muted-foreground line-through decoration-gray-400">$37</span>
              <span className="text-4xl font-bold" style={{ color: '#6C4FBF' }}>$9.97</span>
            </div>
            <p className="text-xs text-muted-foreground mb-4">/pago único · acceso inmediato</p>
            <div className="space-y-3 mb-6">
              {[
                'Guía PDF principal personalizada (valor $17)',
                '🎁 BONO 1: "Diario de los 21 días" — PDF con prompts diarios de autorreflexión guiada (valor $27)',
                '🎁 BONO 2: "Mapa de mis patrones" — Checklist visual para identificar tus patrones emocionales (valor $19)',
              ].map((b, i) => (
                <p key={i} className="text-[13px] text-foreground leading-tight flex items-start gap-2 font-medium">
                  <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>{b}
                </p>
              ))}
            </div>
            <div className="border-t border-border pt-4 mb-5">
              <div className="p-2 bg-primary/5 rounded-lg text-center">
                <p className="text-[13px] font-bold" style={{ color: '#6C4FBF' }}>
                  Valor total: $63 — tú pagas solo $9.97
                </p>
              </div>
            </div>
            <button className="w-full py-4 rounded-xl font-bold text-white transition-opacity hover:opacity-90 shadow-md" style={{ background: '#6C4FBF' }}>
              Quiero mi guía + bonos →
            </button>
            <p className="text-[11px] text-muted-foreground text-center mt-2.5 font-medium">
               Acceso inmediato a todo por correo
            </p>
          </div>

          {/* Plan 1 — Order 2 on mobile */}
          <div
            onClick={() => setSelectedPlan(0)}
            className={`cursor-pointer rounded-2xl p-5 border-2 transition-all bg-card flex-1 order-2 md:order-1 border-border self-center`}
          >
            <p className="font-bold text-foreground text-lg">Guía esencial</p>
            <div className="flex items-baseline gap-2 mt-2 mb-1">
              <span className="text-sm text-muted-foreground line-through decoration-gray-400">$17</span>
              <span className="text-3xl font-bold text-foreground">$5</span>
            </div>
            <p className="text-xs text-muted-foreground mb-4">/pago único · acceso inmediato</p>
            <div className="space-y-3 mb-6">
              {[
                'Guía PDF principal personalizada (valor $17)',
              ].map((b, i) => (
                <p key={i} className="text-[13px] text-foreground leading-tight flex items-start gap-2 font-medium">
                  <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>{b}
                </p>
              ))}
            </div>
            <button className="w-full py-3.5 rounded-xl border-2 font-bold transition-all hover:bg-primary/5" style={{ borderColor: '#6C4FBF', color: '#6C4FBF', background: 'transparent' }}>
              Empezar con lo esencial
            </button>
            <p className="text-[11px] text-muted-foreground text-center mt-2.5 font-medium">
               Acceso inmediato por correo
            </p>
          </div>

          {/* Plan 3 — Order 3 on mobile */}
          <div
            onClick={() => setSelectedPlan(2)}
            className={`cursor-pointer rounded-2xl p-5 border-2 transition-all bg-card flex-1 order-3 md:order-3 border-border self-center`}
          >
            <p className="font-bold text-foreground text-lg">Transformación completa</p>
            <div className="flex items-baseline gap-2 mt-2 mb-1">
              <span className="text-sm text-muted-foreground line-through decoration-gray-400">$57</span>
              <span className="text-3xl font-bold text-foreground">$15.99</span>
            </div>
            <p className="text-xs text-muted-foreground mb-4">/pago único · acceso inmediato</p>
            <div className="space-y-3 mb-6">
              {[
                'Todo lo del plan anterior (valor $63)',
                '🎁 BONO 3: "Guía de límites sin culpa" — 3 pasos para poner límites desde la seguridad (valor $24)',
                '🎁 BONO 4: "Kit de reconexión interior" — Ejercicios de autocompasión y reconexión emocional (valor $29)',
              ].map((b, i) => (
                <p key={i} className="text-[13px] text-foreground leading-tight flex items-start gap-2 font-medium">
                  <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>{b}
                </p>
              ))}
            </div>
            <div className="border-t border-border pt-4 mb-5">
              <div className="p-2 bg-primary/5 rounded-lg text-center">
                <p className="text-[13px] font-bold" style={{ color: '#6C4FBF' }}>
                  Valor total: $116 — tú pagas solo $15.99
                </p>
              </div>
            </div>
            <button className="w-full py-3.5 rounded-xl border-2 font-bold transition-all hover:bg-primary/5" style={{ borderColor: '#6C4FBF', color: '#6C4FBF', background: 'transparent' }}>
              Quiero la transformación completa →
            </button>
            <p className="text-[11px] text-muted-foreground text-center mt-2.5 font-medium">
               Acceso inmediato a todo por correo
            </p>
          </div>
        </div>

        {/* Persuasion Elements */}
        <div className="space-y-4 pt-4">
          <div className="rounded-2xl p-4 text-center max-w-xl mx-auto shadow-sm" style={{ background: '#FFF8E7', border: '1px solid #F5C842' }}>
            <p className="text-sm font-medium leading-relaxed" style={{ color: '#856404' }}>
              ⚡ Los bonos son exclusivos de este lanzamiento. Una vez que cerremos este período especial, los planes volverán a su precio original y los bonos dejarán de estar disponibles.
            </p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-[13px] text-muted-foreground font-medium">
            <span className="flex items-center gap-1.5">🔒 Pago seguro</span>
            <span className="flex items-center gap-1.5">📩 Acceso inmediato por correo</span>
            <span className="flex items-center gap-1.5">🛡️ 30 días de garantía sin preguntas</span>
          </div>
        </div>
      </div>

      {/* SECTION 5 — CTA */}
      <div>
        <button className="w-full py-[18px] rounded-[14px] text-white font-semibold text-lg transition-opacity hover:opacity-90" style={{ background: '#6C4FBF' }}>
          Quiero mi guía personalizada →
        </button>
        {ctaLine}
      </div>

      {/* SECTION 6 — Benefits */}
      <div>
        <h2 className="text-xl font-bold text-foreground text-center mb-5">Lo que vas a lograr con tu guía</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            genderTexts('Entenderte a ti mismo/a de verdad, no en teoría', gender),
            'Identificar los patrones que te repiten situaciones difíciles',
            'Reducir la ansiedad sin depender de otros para calmarte',
            'Poner límites sin culpa y sin perder relaciones',
            genderTexts('Recuperar la confianza en ti mismo/a paso a paso', gender),
            'Sentir que estás viviendo tu vida, no la que te tocó',
          ].map((b, i) => (
            <p key={i} className="text-[15px] text-foreground flex items-start gap-2">
              <span style={{ color: '#6C4FBF' }} className="mt-0.5">✓</span>{b}
            </p>
          ))}
        </div>
      </div>

      {/* SECTION 7 — Stats */}
      <div className="text-center space-y-3">
        <h3 className="text-lg font-semibold text-foreground">Personas como tú ya están viendo resultados</h3>
        <p className="text-[13px] text-muted-foreground">Basado en seguimiento a usuarios con perfiles similares al tuyo</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
          {[
            { num: '83%', desc: 'mejoró su bienestar emocional en 6 semanas' },
            { num: '77%', desc: 'notó cambios reales desde la primera semana' },
            { num: '50,000+', desc: 'personas en LATAM ya iniciaron su proceso' },
          ].map((s, i) => (
            <div key={i} className="bg-card rounded-xl p-4 quiz-shadow text-center">
              <p className="text-[32px] font-bold" style={{ color: '#6C4FBF' }}>{s.num}</p>
              <p className="text-[13px] text-muted-foreground mt-1">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 8 — FAQ */}
      <div>
        <h2 className="text-xl font-bold text-foreground text-center mb-5">Tus dudas, resueltas</h2>
        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-card rounded-xl overflow-hidden quiz-shadow">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full text-left p-4 flex items-center justify-between"
              >
                <span className="text-sm font-medium text-foreground pr-4">{faq.q}</span>
                <span className={`text-muted-foreground transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`}>▾</span>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-4 pb-4">
                  <p className="text-sm text-muted-foreground">{getFaqAnswer(i)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 9 — Testimonials */}
      <div>
        <h2 className="text-xl font-bold text-foreground text-center mb-5">Lo que dicen quienes ya empezaron</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-card rounded-xl p-5 quiz-shadow">
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={t.img}
                  alt={t.name}
                  className="w-14 h-14 rounded-full object-cover"
                  style={{ border: '2px solid #6C4FBF' }}
                />
                <div>
                  <p className="font-semibold text-foreground text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.country}</p>
                </div>
              </div>
              <div className="flex gap-0.5 mb-2">
                {Array.from({ length: 5 }).map((_, j) => (
                  <span key={j} style={{ color: '#F5C842' }}>★</span>
                ))}
              </div>
              <p className="text-sm text-foreground/80 italic">"{t.text}"</p>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 10 — Guarantee */}
      <div className="rounded-2xl p-6 text-center" style={{ background: '#F0FDF4', border: '1px solid #86EFAC' }}>
        <p className="text-[32px] mb-2">🛡️</p>
        <h4 className="text-xl font-bold mb-2" style={{ color: '#15803D' }}>Garantía total de 30 días</h4>
        <p className="text-[15px] mb-3" style={{ color: '#166534' }}>
          {genderTexts('Si en 30 días no sientes un cambio real en cómo te entiendes y te relacionas contigo mismo/a, te devolvemos cada peso. Sin preguntas. Sin formularios. Sin procesos complicados. Solo escríbenos y listo.', gender)}
        </p>
        <p className="text-[13px]" style={{ color: '#16A34A' }}>
          Más de 50,000 personas ya confiaron en este proceso. Ahora es tu turno.
        </p>
      </div>

      {/* SECTION 11 — Final CTA + Payment */}
      <div>
        <button className="w-full py-[18px] rounded-[14px] text-white font-semibold text-lg transition-opacity hover:opacity-90" style={{ background: '#6C4FBF' }}>
          Quiero mi guía personalizada →
        </button>
        {ctaLine}
        <div className="border-t border-border mt-6 pt-4 text-center">
          <p className="text-[13px] text-muted-foreground mb-3">Pago 100% seguro y protegido</p>
          <div className="flex justify-center gap-5 opacity-50">
            <span className="text-sm font-semibold text-muted-foreground" style={{ lineHeight: '24px' }}>Visa</span>
            <span className="text-sm font-semibold text-muted-foreground" style={{ lineHeight: '24px' }}>Mastercard</span>
            <span className="text-sm font-semibold text-muted-foreground" style={{ lineHeight: '24px' }}>PayPal</span>
          </div>
        </div>
      </div>
    </div>
  );
}
