import { useState, useCallback } from 'react';
import ScratchCard from './ScratchCard';
import OfferScreen from './OfferScreen';

const TOTAL = 28;

const painQuestions = [
  {
    question: '¿Con qué frecuencia sientes que estás viviendo en piloto automático, sin realmente elegir tu vida?',
    options: [
      { emoji: '🔄', text: 'A menudo' },
      { emoji: '🤔', text: 'A veces' },
      { emoji: '✨', text: 'Casi nunca' },
    ],
    theme: 'desconexión',
  },
  {
    question: '¿Cuándo fue la última vez que te sentiste completamente en paz contigo mismo/a?',
    options: [
      { emoji: '🕰️', text: 'Hace mucho tiempo' },
      { emoji: '📅', text: 'Hace algunos meses' },
      { emoji: '🌟', text: 'Hace poco' },
    ],
    theme: 'paz',
  },
  {
    question: '¿Te cuesta entender por qué reaccionas de cierta forma ante situaciones o personas?',
    options: [
      { emoji: '😣', text: 'Sí, mucho' },
      { emoji: '🤷', text: 'A veces' },
      { emoji: '😌', text: 'Raramente' },
    ],
    theme: 'reactividad',
  },
  {
    question: '¿Sientes que repites los mismos patrones en tus relaciones o situaciones de vida?',
    options: [
      { emoji: '🔁', text: 'Sí, lo noto claramente' },
      { emoji: '🤔', text: 'Creo que sí' },
      { emoji: '🙅', text: 'No lo creo' },
    ],
    theme: 'patrones',
  },
  {
    question: '¿Con qué frecuencia sientes una preocupación o ansiedad que no puedes explicar del todo?',
    options: [
      { emoji: '😰', text: 'Casi siempre' },
      { emoji: '😐', text: 'A veces' },
      { emoji: '😊', text: 'Rara vez' },
    ],
    theme: 'ansiedad',
  },
  {
    question: '¿Te resulta difícil poner límites sin sentirte culpable?',
    options: [
      { emoji: '😔', text: 'Sí, siempre' },
      { emoji: '⚖️', text: 'Depende' },
      { emoji: '💪', text: 'No me cuesta' },
    ],
    theme: 'límites',
  },
  {
    question: '¿Sientes que tu autoestima depende de lo que otros piensan de ti?',
    options: [
      { emoji: '👥', text: 'Más de lo que quisiera' },
      { emoji: '🤔', text: 'A veces' },
      { emoji: '🧘', text: 'No mucho' },
    ],
    theme: 'autoestima',
  },
  {
    question: '¿Cuánto te cuesta soltar situaciones, personas o versiones del pasado?',
    options: [
      { emoji: '🥀', text: 'Me cuesta mucho' },
      { emoji: '🤏', text: 'Algo' },
      { emoji: '🦋', text: 'Casi no me cuesta' },
    ],
    theme: 'apego',
  },
  {
    question: '¿Sientes que hay una versión de ti que todavía no has podido ser?',
    options: [
      { emoji: '🌱', text: 'Sí, claramente' },
      { emoji: '🤔', text: 'Tal vez' },
      { emoji: '🙅', text: 'No lo creo' },
    ],
    theme: 'identidad',
  },
  {
    question: '¿Qué tan seguido sientes un vacío o falta de sentido aunque tu vida esté "bien" por fuera?',
    options: [
      { emoji: '🕳️', text: 'Seguido' },
      { emoji: '😐', text: 'A veces' },
      { emoji: '😊', text: 'Casi nunca' },
    ],
    theme: 'propósito',
  },
];

const dreamQuestions = [
  {
    question: 'Si en 8 semanas pudieras cambiar una sola cosa de cómo te sientes, ¿qué sería?',
    options: [
      { emoji: '☮️', text: 'Sentirme en paz' },
      { emoji: '🔍', text: 'Entenderme mejor' },
      { emoji: '💕', text: 'Sanar mis relaciones' },
      { emoji: '🧭', text: 'Encontrar mi propósito' },
    ],
  },
  {
    question: '¿Qué te gustaría dejar de sentir?',
    options: [
      { emoji: '😰', text: 'Ansiedad constante' },
      { emoji: '🕳️', text: 'Vacío interior' },
      { emoji: '😟', text: 'Miedo a no ser suficiente' },
      { emoji: '🔌', text: 'Desconexión conmigo mismo/a' },
    ],
  },
  {
    question: '¿Qué aspectos de tu bienestar quieres trabajar?',
    multi: true,
    options: [
      { emoji: '💎', text: 'Autoestima' },
      { emoji: '🎭', text: 'Manejo emocional' },
      { emoji: '🤝', text: 'Relaciones sanas' },
      { emoji: '🧭', text: 'Propósito de vida' },
      { emoji: '🧘', text: 'Paz mental' },
      { emoji: '📋', text: 'Hábitos' },
    ],
  },
  {
    question: '¿Qué te ha impedido avanzar hasta ahora?',
    options: [
      { emoji: '🧩', text: 'No saber por dónde empezar' },
      { emoji: '🤷', text: 'No confiar en que algo funcione' },
      { emoji: '⏰', text: 'Falta de tiempo' },
      { emoji: '😨', text: 'Miedo a lo que pueda descubrir' },
    ],
  },
  {
    question: '¿Qué tan dispuesto/a estás a hacer un cambio real ahora mismo?',
    options: [
      { emoji: '🔥', text: 'Muy dispuesto/a, lo necesito' },
      { emoji: '🤔', text: 'Dispuesto/a pero con dudas' },
      { emoji: '👀', text: 'Explorando opciones' },
    ],
  },
  {
    question: '¿Qué tan seguido dedicas tiempo a tu bienestar emocional?',
    options: [
      { emoji: '❌', text: 'Nunca o casi nunca' },
      { emoji: '🔄', text: 'Ocasionalmente' },
      { emoji: '✅', text: 'Con frecuencia' },
    ],
  },
];

const themeLabels: Record<string, string> = {
  desconexión: 'Desconexión de ti mismo/a',
  paz: 'Dificultad para encontrar paz interior',
  reactividad: 'Reactividad emocional',
  patrones: 'Patrones emocionales repetitivos',
  ansiedad: 'Ansiedad sin causa aparente',
  límites: 'Dificultad para poner límites sanos',
  autoestima: 'Autoestima dependiente de otros',
  apego: 'Dificultad para soltar el pasado',
  identidad: 'Identidad no expresada',
  propósito: 'Búsqueda de propósito y sentido',
};

const triggerLabels: Record<string, string> = {
  desconexión: 'La rutina diaria y la falta de decisiones conscientes',
  paz: 'Expectativas internas no resueltas',
  reactividad: 'Experiencias pasadas no procesadas',
  patrones: 'Creencias inconscientes heredadas',
  ansiedad: 'Un sistema nervioso sobreestimulado',
  límites: 'El miedo al rechazo o abandono',
  autoestima: 'La necesidad de validación externa',
  apego: 'El miedo al cambio y la incertidumbre',
  identidad: 'Presiones sociales y expectativas ajenas',
  propósito: 'La desconexión entre tus valores y tu vida actual',
};

export default function Quiz() {
  const [screen, setScreen] = useState(0);
  const [visible, setVisible] = useState(true);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [gender, setGender] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [commitment, setCommitment] = useState('');
  const [multiSelect, setMultiSelect] = useState<string[]>([]);
  const [scratched, setScratched] = useState(false);

  const goNext = useCallback(() => {
    setVisible(false);
    setTimeout(() => {
      setScreen(s => s + 1);
      setVisible(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 300);
  }, []);

  const handleOption = useCallback((key: string, value: string) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
    goNext();
  }, [goNext]);

  const progress = Math.round(((screen + 1) / TOTAL) * 100);

  const getDiagnosis = () => {
    const themes: Record<string, number> = {};
    painQuestions.forEach((q, i) => {
      const answer = answers[`pain_${i}`];
      if (answer === q.options[0].text) themes[q.theme] = (themes[q.theme] || 0) + 2;
      else if (answer === q.options[1].text) themes[q.theme] = (themes[q.theme] || 0) + 1;
    });
    const sorted = Object.entries(themes).sort((a, b) => b[1] - a[1]);
    return {
      main: sorted[0]?.[0] || 'desconexión',
      trigger: sorted[1]?.[0] || 'ansiedad',
      potential: sorted.length <= 3 ? 'muy alto' : 'alto',
    };
  };

  const OptionBtn = ({ emoji, text, onClick, selected }: { emoji?: string; text: string; onClick: () => void; selected?: boolean }) => (
    <button
      onClick={onClick}
      className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 hover:border-primary hover:bg-accent ${
        selected ? 'border-primary bg-accent' : 'border-border bg-card'
      } quiz-shadow`}
    >
      <span className="flex items-center gap-3">
        {emoji && <span className="text-xl">{emoji}</span>}
        <span className="text-foreground font-medium">{text}</span>
      </span>
    </button>
  );

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <div className={`max-w-lg mx-auto px-5 py-8 transition-all duration-300 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      {children}
    </div>
  );

  const CTA = ({ onClick, text = 'Continuar' }: { onClick: () => void; text?: string }) => (
    <button
      onClick={onClick}
      className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-lg shadow-lg hover:opacity-90 transition-opacity"
    >
      {text}
    </button>
  );

  const renderProgressBar = () =>
    screen > 0 && screen < 27 ? (
      <div className="sticky top-0 z-50 bg-background/90 backdrop-blur-sm px-5 py-3">
        <div className="max-w-lg mx-auto">
          <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
            <span>Progreso</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    ) : null;

  const renderScreen = () => {
    // Screen 0: Welcome
    if (screen === 0) {
      return (
        <Wrapper>
          <div className="text-center pt-8">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground leading-tight mb-4">
              ¿Sientes que no eres del todo tú mismo/a, aunque lo tengas todo?
            </h1>
            <p className="text-muted-foreground mb-10 leading-relaxed">
              Responde 3 minutos de preguntas honestas y recibe una guía personalizada para tu proceso.
            </p>
            <div className="grid grid-cols-3 gap-3 mb-8">
              <button onClick={() => { setGender('hombre'); goNext(); }} className="flex flex-col items-center gap-3 p-4 rounded-2xl border-2 border-border bg-card hover:border-primary hover:scale-105 transition-all duration-200 quiz-shadow group">
                <div className="w-20 h-20 rounded-full overflow-hidden ring-2 ring-transparent group-hover:ring-primary transition-all duration-200">
                  <img src="/gender-hombre.png" alt="Hombre" className="w-full h-full object-cover object-top" />
                </div>
                <span className="font-medium text-foreground text-sm">Hombre</span>
              </button>
              <button onClick={() => { setGender('mujer'); goNext(); }} className="flex flex-col items-center gap-3 p-4 rounded-2xl border-2 border-border bg-card hover:border-primary hover:scale-105 transition-all duration-200 quiz-shadow group">
                <div className="w-20 h-20 rounded-full overflow-hidden ring-2 ring-transparent group-hover:ring-primary transition-all duration-200">
                  <img src="/gender-mujer.png" alt="Mujer" className="w-full h-full object-cover object-top" />
                </div>
                <span className="font-medium text-foreground text-sm">Mujer</span>
              </button>
              <button onClick={() => { setGender('otro'); goNext(); }} className="flex flex-col items-center gap-3 p-4 rounded-2xl border-2 border-border bg-card hover:border-primary hover:scale-105 transition-all duration-200 quiz-shadow group">
                <div className="w-20 h-20 rounded-full overflow-hidden ring-2 ring-transparent group-hover:ring-primary transition-all duration-200">
                  <img src="/gender-otro.png" alt="Otro" className="w-full h-full object-cover object-top" />
                </div>
                <span className="font-medium text-foreground text-sm">Otro</span>
              </button>
            </div>
            <p className="text-xs text-muted-foreground">
              Al continuar aceptas nuestros{' '}
              <a href="#" className="underline hover:text-primary transition-colors">Términos</a> y{' '}
              <a href="#" className="underline hover:text-primary transition-colors">Política de Privacidad</a>.
            </p>
          </div>
        </Wrapper>
      );
    }

    // Screen 1: Age
    if (screen === 1) {
      return (
        <Wrapper>
          <p className="text-sm text-muted-foreground mb-2 text-center">Usamos tu edad solo para personalizar tu guía</p>
          <h2 className="text-xl font-bold text-foreground text-center mb-8">¿Cuál es tu rango de edad?</h2>
          <div className="space-y-3">
            {['18–24', '25–34', '35–44', '45 o más'].map(opt => (
              <OptionBtn key={opt} text={opt} onClick={() => handleOption('age', opt)} />
            ))}
          </div>
        </Wrapper>
      );
    }

    // Screen 2: Social proof
    if (screen === 2) {
      const people = [
        { name: 'Sofía', x: 22, y: 26, img: '/portrait_latam_1.png', delay: 0 },
        { name: 'Valeria', x: 70, y: 32, img: '/portrait_latam_2.png', delay: 0.8 },
        { name: 'Carlos', x: 55, y: 38, img: '/portrait_latam_3.png', delay: 1.6 },
        { name: 'Luisa', x: 78, y: 52, img: '/portrait_latam_4.png', delay: 2.4 },
        { name: 'Mateo', x: 28, y: 56, img: '/portrait_latam_5.png', delay: 3.2 },
        { name: 'Elena', x: 42, y: 72, img: '/portrait_latam_6.png', delay: 4.0 },
        { name: 'Ana', x: 58, y: 88, img: '/portrait_latam_7.png', delay: 4.8 },
      ];

      const waveNodes = [
        { x: 55, y: 18 }, { x: 72, y: 44 }, { x: 34, y: 58 }, { x: 68, y: 74 }, { x: 45, y: 25 }
      ];

      return (
        <Wrapper>
          <div className="text-center pt-2">
            <h2 className="text-xl font-bold text-foreground mb-6 leading-tight max-w-[280px] mx-auto">
              Más de 50,000 personas en Latinoamérica ya iniciaron su proceso con nosotros.
            </h2>
            
            <div className="my-4 w-full relative bg-[#F6F3FF] rounded-[24px] overflow-hidden border border-[#E0D9F5]" style={{ aspectRatio: '1.25/1' }}>
              {/* LARGE BACKGROUND NETWORK (Purple paths) */}
              <div className="absolute inset-0 opacity-40">
                 <svg width="100%" height="100%" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
                   <g stroke="#D1C4EF" strokeWidth="0.8">
                     {/* Outer network nodes and lines */}
                     {Array.from({length: 12}).map((_, i) => (
                       <g key={i}>
                         <circle cx={Math.random() * 400} cy={Math.random() * 300} r="4" fill="#E9E2FF" />
                         <line 
                          x1={Math.random() * 400} y1={Math.random() * 300} 
                          x2={Math.random() * 400} y2={Math.random() * 300} 
                          opacity="0.5" 
                         />
                       </g>
                     ))}
                   </g>
                 </svg>
              </div>

              {/* LATAM MAP (Green/Yellow with outline) */}
              <div className="absolute inset-0 flex items-center justify-center p-8 z-10">
                <svg viewBox="0 0 300 420" className="h-[95%] w-auto map-outline drop-shadow-md">
                  <path 
                    d="M 95,18 L 75,28 L 58,44 L 52,60 L 63,74 L 77,80 L 90,87 L 100,98 L 107,112 L 112,128 L 116,142 L 122,140 L 144,135 L 170,133 L 200,136 L 232,142 L 255,150 L 268,165 L 274,188 L 274,215 L 267,244 L 254,272 L 240,300 L 226,328 L 212,355 L 202,378 L 196,405 L 188,395 L 178,375 L 167,352 L 156,325 L 147,298 L 140,270 L 134,242 L 128,214 L 122,187 L 116,162 L 114,148 L 110,132 L 104,116 L 95,100 L 83,90 L 70,83 L 60,75 L 52,62 L 58,46 L 68,32 Z"
                    fill="#C6D68C" stroke="#223344" strokeWidth="1.5"
                  />
                  {/* Subtle inner details/regions */}
                  <path d="M120,160 Q140,180 150,220" fill="none" stroke="#223344" strokeWidth="0.5" opacity="0.4" />
                  <path d="M160,280 Q180,310 170,360" fill="none" stroke="#223344" strokeWidth="0.5" opacity="0.4" />
                </svg>
              </div>

              {/* WIFI WAVE NODES */}
              {waveNodes.map((w, i) => (
                <div key={`wave-${i}`} className="absolute z-10" style={{ left: `${w.x}%`, top: `${w.y}%` }}>
                  <div className="relative">
                     {/* Core dot */}
                     <div className="w-2.5 h-2.5 bg-[#9370DB] rounded-full" />
                     {/* Waves (arcs) */}
                     <div className="absolute -top-3 -left-3">
                        <svg width="30" height="30" viewBox="0 0 30 30">
                           <path d="M10 10 A 15 15 0 0 1 20 10" stroke="#9370DB" fill="none" strokeWidth="1.5" className="animate-wave-pulse" opacity="0.6" />
                           <path d="M8 8 A 18 18 0 0 1 22 8" stroke="#9370DB" fill="none" strokeWidth="1.5" className="animate-wave-pulse" style={{ animationDelay: '0.4s' }} opacity="0.4" />
                        </svg>
                     </div>
                  </div>
                </div>
              ))}

              {/* PEOPLE NODES (Avatars + Labels) */}
              {people.map((p, i) => (
                <div 
                  key={`person-${i}`} 
                  className="absolute z-20 flex items-center gap-1.5 animate-float-gentle" 
                  style={{ left: `${p.x}%`, top: `${p.y}%`, animationDelay: `-${p.delay}s` }}
                >
                  <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-white shadow-md bg-muted/20">
                    <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="bg-white px-2 py-0.5 rounded shadow-sm flex flex-col items-start border border-[#E0D9F5]">
                    <div className="w-8 h-1.5 bg-[#6C4FBF]/20 rounded-full mb-0.5"></div>
                    <div className="w-5 h-1.5 bg-muted/30 rounded-full"></div>
                  </div>
                </div>
              ))}

              {/* CENTRAL MAIN CARD (Paper-like card) */}
              <div className="absolute left-[40%] top-[40%] translate-x-[-50%] translate-y-[-50%] z-30">
                <div className="bg-white p-2 pt-3 pb-4 rounded-lg shadow-xl border border-border/50 animate-float-gentle" style={{ transform: 'rotate(-2deg)' }}>
                   <div className="w-[100px] h-[100px] rounded-full overflow-hidden mb-3 border-4 border-white/50 bg-[#F3F0FF] mx-auto ring-1 ring-[#6C4FBF]/20">
                      <img src="/portrait_center.png" alt="Featured" className="w-full h-full object-cover" />
                   </div>
                   <div className="space-y-2 px-1">
                      <div className="h-2 w-full bg-[#6C4FBF]/10 rounded-full"></div>
                      <div className="h-2 w-3/4 bg-muted/20 rounded-full"></div>
                      <div className="h-2 w-1/2 bg-muted/10 rounded-full"></div>
                   </div>
                   {/* Connection point behind it */}
                   <div className="absolute top-1/2 right-0 w-8 h-[1px] bg-[#6C4FBF]/30 -z-10 translate-x-full"></div>
                </div>
                {/* Glow ring in background */}
                <div className="absolute inset-0 -z-10 bg-primary/5 rounded-full scale-[1.8] blur-2xl animate-pulse" />
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-8 max-w-[300px] mx-auto leading-relaxed">
              Unimos historias en todo el continente para sanar en comunidad.
            </p>
            
            <CTA onClick={goNext} text="Continuar" />
          </div>
        </Wrapper>
      );
    }

    // Screens 3-12: Pain questions
    if (screen >= 3 && screen <= 12) {
      const qi = screen - 3;
      const q = painQuestions[qi];
      return (
        <Wrapper>
          <h2 className="text-lg font-bold text-foreground mb-6 leading-relaxed">{q.question}</h2>
          <div className="space-y-3">
            {q.options.map(opt => (
              <OptionBtn key={opt.text} emoji={opt.emoji} text={opt.text} onClick={() => handleOption(`pain_${qi}`, opt.text)} />
            ))}
          </div>
        </Wrapper>
      );
    }

    // Screen 13: Normalization
    if (screen === 13) {
      return (
        <Wrapper>
          <div className="text-center pt-8">
            <span className="text-5xl mb-6 block">💛</span>
            <h2 className="text-2xl font-bold text-foreground mb-4">Lo que sientes no es una falla tuya.</h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              El 81% de las personas que hacen este test sienten exactamente lo mismo que tú. No estás solo/a. Y tiene solución.
            </p>
            <CTA onClick={goNext} />
          </div>
        </Wrapper>
      );
    }

    // Screens 14-19: Dream questions
    if (screen >= 14 && screen <= 19) {
      const qi = screen - 14;
      const q = dreamQuestions[qi];

      if (q.multi) {
        return (
          <Wrapper>
            <h2 className="text-lg font-bold text-foreground mb-2 leading-relaxed">{q.question}</h2>
            <p className="text-sm text-muted-foreground mb-6">Puedes elegir más de una opción</p>
            <div className="space-y-3 mb-6">
              {q.options.map(opt => (
                <OptionBtn
                  key={opt.text}
                  emoji={opt.emoji}
                  text={opt.text}
                  selected={multiSelect.includes(opt.text)}
                  onClick={() => {
                    setMultiSelect(prev =>
                      prev.includes(opt.text)
                        ? prev.filter(t => t !== opt.text)
                        : [...prev, opt.text]
                    );
                  }}
                />
              ))}
            </div>
            {multiSelect.length > 0 && (
              <CTA
                onClick={() => {
                  setAnswers(prev => ({ ...prev, [`dream_${qi}`]: multiSelect }));
                  setMultiSelect([]);
                  goNext();
                }}
              />
            )}
          </Wrapper>
        );
      }

      return (
        <Wrapper>
          <h2 className="text-lg font-bold text-foreground mb-6 leading-relaxed">{q.question}</h2>
          <div className="space-y-3">
            {q.options.map(opt => (
              <OptionBtn key={opt.text} emoji={opt.emoji} text={opt.text} onClick={() => handleOption(`dream_${qi}`, opt.text)} />
            ))}
          </div>
        </Wrapper>
      );
    }

    // Screen 20: Credibility
    if (screen === 20) {
      return (
        <Wrapper>
          <div className="text-center pt-4">
            <p className="text-muted-foreground leading-relaxed mb-8 text-sm">
              Tu guía está basada en principios de psicología cognitiva, neurociencia del comportamiento y más de 200 historias reales de personas en Latinoamérica.
            </p>
            <div className="grid grid-cols-3 gap-3 mb-8">
              {[
                { icon: '🔬', label: 'Basada en evidencia' },
                { icon: '🌎', label: 'Diseñada para LATAM' },
                { icon: '📋', label: 'Proceso paso a paso' },
              ].map((item, i) => (
                <div key={i} className="bg-card rounded-xl p-4 quiz-shadow flex flex-col items-center gap-2">
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-xs font-medium text-foreground text-center">{item.label}</span>
                </div>
              ))}
            </div>
            <CTA onClick={goNext} />
          </div>
        </Wrapper>
      );
    }

    // Screen 21: Micro-commitment
    if (screen === 21) {
      return (
        <Wrapper>
          <h2 className="text-lg font-bold text-foreground mb-6 text-center leading-relaxed">
            ¿Cuántos minutos al día puedes dedicarle a tu proceso?
          </h2>
          <div className="space-y-3">
            {['5 min', '10 min', '15 min', '20 min o más'].map(opt => (
              <OptionBtn key={opt} emoji="⏱️" text={opt} onClick={() => { setCommitment(opt); handleOption('commitment', opt); }} />
            ))}
          </div>
        </Wrapper>
      );
    }

    // Screen 22: Email
    if (screen === 22) {
      return (
        <Wrapper>
          <div className="pt-4">
            <h2 className="text-xl font-bold text-foreground mb-2 text-center">¿A dónde enviamos tu guía personalizada?</h2>
            <p className="text-sm text-muted-foreground text-center mb-8">Tu guía está casi lista</p>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="tu@correo.com"
              className="w-full px-4 py-4 rounded-xl border-2 border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors mb-3"
            />
            <p className="text-xs text-muted-foreground mb-6 text-center">Respetamos tu privacidad. Nunca spam.</p>
            {email.includes('@') && email.includes('.') && (
              <CTA onClick={goNext} text="Ver mi resultado" />
            )}
          </div>
        </Wrapper>
      );
    }

    // Screen 23: Name
    if (screen === 23) {
      return (
        <Wrapper>
          <div className="pt-4">
            <h2 className="text-xl font-bold text-foreground mb-8 text-center">¿Cómo te llamas?</h2>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Tu nombre"
              className="w-full px-4 py-4 rounded-xl border-2 border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors mb-6"
            />
            {name.trim().length >= 2 && (
              <CTA onClick={goNext} />
            )}
          </div>
        </Wrapper>
      );
    }

    // Screen 24: Diagnosis
    if (screen === 24) {
      const diag = getDiagnosis();
      return (
        <Wrapper>
          <div className="text-center pt-4">
            <h2 className="text-xl font-bold text-foreground mb-2">
              {name}, identificamos 3 patrones que están bloqueando tu bienestar.
            </h2>
            <p className="text-sm text-muted-foreground mb-8">No te preocupes, tienen solución.</p>
            <div className="space-y-4 mb-8">
              <div className="bg-card rounded-xl p-5 quiz-shadow text-left">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🎯</span>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Dificultad principal</p>
                    <p className="font-semibold text-foreground">{themeLabels[diag.main]}</p>
                  </div>
                </div>
              </div>
              <div className="bg-card rounded-xl p-5 quiz-shadow text-left">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">⚡</span>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Desencadenante emocional</p>
                    <p className="font-semibold text-foreground">{triggerLabels[diag.trigger]}</p>
                  </div>
                </div>
              </div>
              <div className="bg-card rounded-xl p-5 quiz-shadow text-left">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🚀</span>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Potencial de cambio</p>
                    <p className="font-semibold text-primary capitalize">{diag.potential}</p>
                  </div>
                </div>
              </div>
            </div>
            <CTA onClick={goNext} text="Ver mi proyección" />
          </div>
        </Wrapper>
      );
    }

    // Screen 25: Progression chart
    if (screen === 25) {
      const today = new Date();
      const future = new Date(today.getTime() + 56 * 24 * 60 * 60 * 1000);
      const formatDate = (d: Date) => d.toLocaleDateString('es-MX', { day: 'numeric', month: 'short' });

      return (
        <Wrapper>
          <div className="text-center pt-4">
            <h2 className="text-xl font-bold text-foreground mb-2">
              Así proyectamos tu evolución, {name}
            </h2>
            <p className="text-xs text-muted-foreground mb-6">
              Esta proyección se basa en personas con un perfil similar al tuyo.
            </p>
            <div className="bg-card rounded-2xl p-5 quiz-shadow mb-8">
              <svg viewBox="0 0 300 160" className="w-full">
                {/* Grid lines */}
                <line x1="40" y1="20" x2="40" y2="130" stroke="hsl(255 25% 90%)" strokeWidth="1" />
                <line x1="40" y1="130" x2="280" y2="130" stroke="hsl(255 25% 90%)" strokeWidth="1" />
                <line x1="40" y1="90" x2="280" y2="90" stroke="hsl(255 25% 90%)" strokeWidth="0.5" strokeDasharray="4" />
                <line x1="40" y1="50" x2="280" y2="50" stroke="hsl(255 25% 90%)" strokeWidth="0.5" strokeDasharray="4" />
                {/* Gradient fill */}
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(255 45% 53%)" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="hsl(255 45% 53%)" stopOpacity="0.02" />
                  </linearGradient>
                </defs>
                <path d="M40,120 C80,115 120,100 160,80 S240,35 280,25 L280,130 L40,130 Z" fill="url(#chartGrad)" />
                {/* Line */}
                <path d="M40,120 C80,115 120,100 160,80 S240,35 280,25" fill="none" stroke="hsl(255 45% 53%)" strokeWidth="2.5" strokeLinecap="round" />
                {/* Dots */}
                <circle cx="40" cy="120" r="4" fill="hsl(255 45% 53%)" />
                <circle cx="280" cy="25" r="4" fill="hsl(255 45% 53%)" />
                {/* Labels */}
                <text x="40" y="148" fill="hsl(255 12% 50%)" fontSize="10" textAnchor="middle">Hoy</text>
                <text x="280" y="148" fill="hsl(255 12% 50%)" fontSize="10" textAnchor="middle">Semana 8</text>
                <text x="30" y="124" fill="hsl(255 12% 50%)" fontSize="8" textAnchor="end">😔</text>
                <text x="30" y="30" fill="hsl(255 12% 50%)" fontSize="8" textAnchor="end">✨</text>
              </svg>
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>{formatDate(today)}</span>
                <span>{formatDate(future)}</span>
              </div>
            </div>
            <CTA onClick={goNext} text="Ver mi guía" />
          </div>
        </Wrapper>
      );
    }

    // Screen 26: Scratch card
    if (screen === 26) {
      return (
        <Wrapper>
          <div className="text-center pt-4">
            <h2 className="text-xl font-bold text-foreground mb-2">¡Tienes una sorpresa!</h2>
            <p className="text-sm text-muted-foreground mb-8">Raspa la tarjeta para descubrir tu descuento</p>
            <div className="flex justify-center mb-8">
              <ScratchCard width={320} height={200} onReveal={() => setScratched(true)}>
                <div className="flex flex-col items-center justify-center gap-2">
                  <span className="text-4xl">🎉</span>
                  <p className="text-2xl font-bold text-primary">¡70% de descuento!</p>
                  <p className="text-sm text-muted-foreground">Conseguiste un descuento especial</p>
                </div>
              </ScratchCard>
            </div>
            {scratched && (
              <div className="animate-slide-up">
                <CTA onClick={goNext} text="Ver mi precio especial" />
              </div>
            )}
          </div>
        </Wrapper>
      );
    }

    // Screen 27: Offer
    if (screen === 27) {
      const diag = getDiagnosis();
      const goalAnswer = (answers['dream_0'] as string) || 'Sentirme en paz';
      return (
        <OfferScreen
          name={name}
          mainDifficulty={themeLabels[diag.main]}
          mainGoal={goalAnswer}
          commitment={commitment || '10 min'}
        />
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-background">
      {renderProgressBar()}
      {renderScreen()}
    </div>
  );
}
