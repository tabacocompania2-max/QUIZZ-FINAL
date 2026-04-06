import React, { useState, useEffect, useCallback, ReactNode } from 'react';
import ScratchCard from './ScratchCard';
import OfferScreen from './OfferScreen';

const TOTAL = 31;

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

const getGenderedQuestions = (questions: any[], gender: string) => {
  return questions.map(q => ({
    ...q,
    question: genderTexts(q.question, gender),
    options: q.options?.map((opt: any) => ({
      ...opt,
      text: genderTexts(opt.text, gender)
    }))
  }));
};

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

const Wrapper = ({ children, visible }: { children: ReactNode; visible: boolean }) => (
  <div className={`max-w-lg mx-auto px-5 py-8 transition-all duration-300 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
    {children}
  </div>
);

const LoadingScreen = ({ onComplete, visible }: { onComplete: () => void; visible: boolean }) => {
  const [percent, setPercent] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setPercent(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 85);
    return () => clearInterval(interval);
  }, [onComplete]);

  const messages = [
    "Procesando tus respuestas...",
    "Analizando patrones emocionales...",
    "Generando tu perfil personalizado...",
    "Casi listo..."
  ];
  const msgIdx = Math.min(Math.floor(percent / 25), 3);

  return (
    <Wrapper visible={visible}>
      <div className="flex flex-col items-center justify-center pt-12">
        <h2 className="text-xl font-bold text-foreground mb-8 text-center leading-tight">
          Estamos analizando tus respuestas cuidadosamente
        </h2>
        <div className="w-full h-5 bg-secondary rounded-full overflow-hidden mb-4 shadow-inner">
          <div 
            className="h-full bg-primary transition-all duration-75 ease-linear" 
            style={{ width: `${percent}%` }} 
          />
        </div>
        <div className="flex justify-between w-full mb-10">
           <span className="text-sm font-medium text-muted-foreground">{messages[msgIdx]}</span>
           <span className="text-sm font-bold text-primary">{percent}%</span>
        </div>
        
        <div className="animate-pulse flex flex-col items-center">
           <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
        </div>
      </div>
    </Wrapper>
  );
};

const InteractiveLoading = ({ onComplete, visible }: { onComplete: () => void; visible: boolean }) => {
  const [phase, setPhase] = useState(0); // 0, 1, 2
  const [progress, setProgress] = useState(0);
  const [modal, setModal] = useState<number | null>(null); // 0, 1, 2

  const phases = [
    "Establecimiento de objetivos",
    "Adaptación áreas de crecimiento",
    "Configuración de contenido"
  ];

  const modals = [
    { q: "¿Sueles terminar lo que empiezas?", items: ["No", "Sí"] },
    { q: "¿Sabías que la autorreflexión diaria acelera el cambio?", items: ["No", "Sí"] },
    { q: "¿Quieres aprender a construir hábitos sólidos?", items: ["No", "Sí"] }
  ];

  useEffect(() => {
    if (!visible || modal !== null) return;
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        
        // Trigger modal at 50%
        if (prev === 50 && phase < 3) {
          setModal(phase);
          clearInterval(interval);
          return 50; 
        }

        return prev + 1;
      });
    }, 80);
    return () => clearInterval(interval);
  }, [phase, visible, modal]);

  const handleModal = () => {
    setModal(null);
    if (phase < 3) {
      // Force progress past 50 to continue
      setProgress(51);
      // If we finished the 50% part, once it hits 100%, we move to next phase
    }
  };

  useEffect(() => {
    if (progress === 100 && phase < 2) {
      const timeout = setTimeout(() => {
        setPhase(p => p + 1);
        setProgress(0);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [progress, phase]);

  const testimonial = [
    {
      name: "Ricardo Méndez",
      stars: 5,
      title: "Información reveladora...",
      text: "Conocí este programa hace poco. Las herramientas para conocerme han sido fundamentales para mi proceso."
    },
    {
      name: "Andrés Castillo",
      stars: 5,
      title: "En verdad ha cambiado mi vida",
      text: "Llevo meses utilizando este enfoque. Me ha ayudado a organizar mejor mi tiempo mental y a empezar a alcanzar mis objetivos reales."
    },
    {
      name: "Lucía B.",
      stars: 5,
      title: "Recomendado al 100%",
      text: "Lo mejor es que no es un programa genérico, se siente como si alguien me conociera de verdad."
    }
  ][phase % 3];

  return (
    <div className="relative min-h-[600px]">
      <Wrapper visible={visible}>
        <div className="text-center pt-4">
          <h1 className="text-2xl font-bold mb-1">Creando tu</h1>
          <h2 className="text-2xl font-bold text-primary mb-12">plan de bienestar personalizado</h2>
          
          <div className="space-y-6 mb-12">
            {phases.map((p, i) => (
              <div key={i} className="text-left">
                <div className="flex justify-between items-center mb-2">
                  <span className={`font-bold text-sm ${i <= phase ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {p}
                  </span>
                  {i < phase || (i === phase && progress === 100) ? (
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold">✓</div>
                  ) : i === phase ? (
                    <span className="text-xs font-bold text-muted-foreground">{progress}%</span>
                  ) : null}
                </div>
                {i === phase && progress < 100 && (
                  <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary transition-all duration-100" style={{ width: `${progress}%` }} />
                  </div>
                )}
                <div className="h-[1px] w-full bg-border" />
              </div>
            ))}
          </div>

          {!(phase === 2 && progress === 100) && (
            <div className="bg-card rounded-2xl p-6 border border-border/50 text-left shadow-sm animate-in fade-in duration-500">
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => <span key={i} className="text-green-500 text-xs">★</span>)}
              </div>
              <p className="font-bold text-sm mb-2">{testimonial.title}</p>
              <p className="text-xs text-muted-foreground leading-relaxed italic mb-3">"{testimonial.text}"</p>
              <p className="text-[10px] font-bold text-muted-foreground text-right">— {testimonial.name}</p>
            </div>
          )}

          {phase === 2 && progress === 100 && (
            <div className="mt-16 animate-slide-up">
              <CTA onClick={onComplete} text="Continuar" />
            </div>
          )}
        </div>
      </Wrapper>

      {/* Commitment Modal */}
      {modal !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[32px] p-8 w-full max-w-sm shadow-2xl animate-in zoom-in-95 duration-200">
            <p className="text-sm text-center text-muted-foreground mb-4">Para continuar, especifica</p>
            <h3 className="text-xl font-bold text-center text-foreground mb-8">
              {modals[modal].q}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <button onClick={handleModal} className="py-4 bg-secondary rounded-2xl font-bold text-foreground hover:bg-secondary/80 transition-colors">
                No
              </button>
              <button onClick={handleModal} className="py-4 bg-secondary rounded-2xl font-bold text-foreground hover:bg-secondary/80 transition-colors">
                Sí
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const CTA = ({ onClick, text = 'Continuar' }: { onClick: () => void; text?: string }) => (
  <button
    onClick={onClick}
    className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-lg shadow-lg hover:opacity-90 transition-opacity"
  >
    {text}
  </button>
);

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

  const renderProgressBar = () =>
    screen > 0 && screen < 28 ? (
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
        <Wrapper visible={visible}>
          <div className="text-center pt-8">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground leading-tight mb-4">
              {genderTexts('¿Sientes que no eres del todo tú mismo/a, aunque lo tengas todo?', gender)}
            </h1>
            <p className="text-muted-foreground mb-10 leading-relaxed">
              Responde 3 minutos de preguntas honestas y recibe una guía personalizada para tu proceso.
            </p>
            <div className="grid grid-cols-3 gap-3 mb-8">
              <button onClick={() => { setGender('hombre'); goNext(); }} className="flex flex-col items-center gap-3 p-4 rounded-2xl border-2 border-border bg-card hover:border-primary hover:scale-105 transition-all duration-200 quiz-shadow group">
                <div className="w-20 h-20 rounded-full overflow-hidden ring-2 ring-transparent group-hover:ring-primary transition-all duration-200">
                  <img src="/gender-hombre.png" alt="Hombre" className="w-full h-full object-cover object-top" loading="eager" />
                </div>
                <span className="font-medium text-foreground text-sm">Hombre</span>
              </button>
              <button onClick={() => { setGender('mujer'); goNext(); }} className="flex flex-col items-center gap-3 p-4 rounded-2xl border-2 border-border bg-card hover:border-primary hover:scale-105 transition-all duration-200 quiz-shadow group">
                <div className="w-20 h-20 rounded-full overflow-hidden ring-2 ring-transparent group-hover:ring-primary transition-all duration-200">
                  <img src="/gender-mujer.png" alt="Mujer" className="w-full h-full object-cover object-top" loading="eager" />
                </div>
                <span className="font-medium text-foreground text-sm">Mujer</span>
              </button>
              <button onClick={() => { setGender('otro'); goNext(); }} className="flex flex-col items-center gap-3 p-4 rounded-2xl border-2 border-border bg-card hover:border-primary hover:scale-105 transition-all duration-200 quiz-shadow group">
                <div className="w-20 h-20 rounded-full overflow-hidden ring-2 ring-transparent group-hover:ring-primary transition-all duration-200">
                  <img src="/gender-otro.png" alt="Otro" className="w-full h-full object-cover object-top" loading="eager" />
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
        <Wrapper visible={visible}>
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
        { name: 'Sofía', x: 27, y: 12, img: '/portrait_latam_1.png', delay: 0, scale: 0.9 },
        { name: 'Valeria', x: 53, y: 15, img: '/portrait_latam_2.png', delay: 1.2, scale: 0.8 },
        { name: 'Carlos', x: 61, y: 26, img: '/portrait_latam_3.png', delay: 2.4, scale: 1.0 },
        { name: 'Luisa', x: 70, y: 40, img: '/portrait_latam_4.png', delay: 0.6, scale: 1.2 },
        { name: 'Mateo', x: 37, y: 30, img: '/portrait_latam_5.png', delay: 1.8, scale: 0.9 },
        { name: 'Elena', x: 55, y: 64, img: '/portrait_latam_6.png', delay: 3.0, scale: 1.1 },
        { name: 'Ana', x: 50, y: 78, img: '/portrait_latam_7.png', delay: 4.2, scale: 0.85 },
      ];

      return (
        <Wrapper visible={visible}>
          <div className="text-center pt-2">
            <h2 className="text-xl font-bold text-foreground mb-4 leading-tight max-w-[280px] mx-auto">
              Más de 50,000 personas en Latinoamérica ya iniciaron su proceso con nosotros.
            </h2>
            
            <div className="my-2 w-full relative bg-white rounded-[32px] overflow-hidden shadow-2xl border border-muted/20" style={{ aspectRatio: '1.2 / 1' }}>
              {/* IMAGE AS EXACT REPRODUCTION BACKGROUND */}
              <div className="absolute inset-0 z-0">
                <img src="/social_proof_bg.png" alt="Map Background" className="w-full h-full object-cover" loading="lazy" />
              </div>

              {/* CENTRAL MAIN AVATAR (Large pulse) */}
              <div className="absolute left-[46.5%] top-[48.5%] translate-x-[-50%] translate-y-[-50%] z-40">
                 <div className="w-[120px] h-[120px] rounded-full overflow-hidden border-4 border-white shadow-2xl relative z-10 animate-depth-pulse bg-white">
                    <img src="/portrait_center.png" alt="Featured" className="w-full h-full object-cover" loading="lazy" />
                 </div>
                 {/* Glowing Ring already in background, we just add a sbtle glow layer */}
                 <div className="absolute inset-[-15px] rounded-full bg-primary/5 blur-3xl animate-pulse" />
              </div>

              {/* OVERLAY ANIMATED AVATARS (Placing them on top of static background ones) */}
              {people.map((p, i) => (
                <div 
                  key={`p-${i}`} 
                  className="absolute z-20 animate-depth-pulse" 
                  style={{ 
                    left: `${p.x}%`, 
                    top: `${p.y}%`, 
                    animationDelay: `-${p.delay}s`,
                    transform: `scale(${p.scale})`
                  }}
                >
                  <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-white shadow-xl bg-white relative z-10">
                    <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                </div>
              ))}
            </div>

            <p className="text-sm text-muted-foreground mb-10 max-w-[280px] mx-auto leading-relaxed italic">
              "Finalmente entendí que mi proceso es compartido."
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
        <Wrapper visible={visible}>
          <h2 className="text-lg font-bold text-foreground mb-6 leading-relaxed">{genderTexts(q.question, gender)}</h2>
          <div className="space-y-3">
            {q.options.map(opt => (
              <OptionBtn key={opt.text} emoji={opt.emoji} text={genderTexts(opt.text, gender)} onClick={() => handleOption(`pain_${qi}`, opt.text)} />
            ))}
          </div>
        </Wrapper>
      );
    }

    // Screen 13: Normalization
    if (screen === 13) {
      return (
        <Wrapper visible={visible}>
          <div className="text-center pt-8">
            <span className="text-5xl mb-6 block">💛</span>
            <h2 className="text-2xl font-bold text-foreground mb-4">Lo que sientes no es una falla tuya.</h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              {genderTexts('El 81% de las personas que hacen este test sienten exactamente lo mismo que tú. No estás solo/a. Y tiene solución.', gender)}
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
          <Wrapper visible={visible}>
            <h2 className="text-lg font-bold text-foreground mb-2 leading-relaxed">{genderTexts(q.question, gender)}</h2>
            <p className="text-sm text-muted-foreground mb-6">Puedes elegir más de una opción</p>
            <div className="space-y-3 mb-6">
              {q.options.map(opt => (
                <OptionBtn
                  key={opt.text}
                  emoji={opt.emoji}
                  text={genderTexts(opt.text, gender)}
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
        <Wrapper visible={visible}>
          <h2 className="text-lg font-bold text-foreground mb-6 leading-relaxed">{genderTexts(q.question, gender)}</h2>
          <div className="space-y-3">
            {q.options.map(opt => (
              <OptionBtn key={opt.text} emoji={opt.emoji} text={genderTexts(opt.text, gender)} onClick={() => handleOption(`dream_${qi}`, opt.text)} />
            ))}
          </div>
        </Wrapper>
      );
    }

    // Screen 20: Credibility
    if (screen === 20) {
      return (
        <Wrapper visible={visible}>
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
        <Wrapper visible={visible}>
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
        <Wrapper visible={visible}>
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
        <Wrapper visible={visible}>
          <div className="pt-4">
            <h2 className="text-xl font-bold text-foreground mb-8 text-center">¿Cómo te llamas?</h2>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Ingresa tu nombre para recibir tu plan"
              className="w-full px-4 py-4 rounded-xl border-2 border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors mb-6"
            />
            {name.trim().length >= 2 && (
              <CTA onClick={goNext} />
            )}
          </div>
        </Wrapper>
      );
    }

    // Screen 24: Processing
    if (screen === 24) {
      return <LoadingScreen onComplete={goNext} visible={visible} />;
    }

    // Screen 25: Diagnosis
    if (screen === 25) {
      const diag = getDiagnosis();
      const level = "Alto"; // Forced high for psychological impact as requested
      const levelPercent = level === "Alto" ? 85 : 55;
      const diagnosisImg = gender === 'hombre' ? '/diagnosis_hombre.png' : '/diagnosis_mujer.png';
      
      return (
        <Wrapper visible={visible}>
          <div className="text-center pt-2 mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-foreground">
              Resumen de tu perfil de bienestar
            </h2>
          </div>

            {/* Main Result Card */}
            <div className="bg-card rounded-[32px] p-6 shadow-sm border border-border mb-6 relative overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-foreground text-lg">Nivel de efectos negativos</h3>
                <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full border border-primary/20">
                  {level}
                </span>
              </div>

              {/* Portrait and Gauge */}
              <div className="flex flex-col items-center mb-8">
                {gender !== 'otro' && (
                  <div className="relative w-48 h-48 mb-10">
                    <img 
                      src={diagnosisImg}
                      alt="Perfil de bienestar" 
                      className="w-full h-full object-contain relative z-10"
                    />
                    <div className="absolute top-[75%] left-1/2 -translate-x-1/2 z-20 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-xs font-bold shadow-xl whitespace-nowrap">
                      Tu nivel
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[6px] border-b-primary" />
                    </div>
                  </div>
                )}

                {/* The Gauge */}
                <div className="w-full px-2">
                  {gender === 'otro' && (
                    <div className="text-center mb-6">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-2">
                         <span className="text-2xl">👤</span>
                      </div>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Análisis General</p>
                    </div>
                  )}
                  <div className="h-2.5 w-full diagnosis-gauge rounded-full relative mb-2">
                     {/* Indicator dot */}
                     <div 
                      className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white border-2 border-border rounded-full shadow-md z-30 transition-all duration-1000 ease-out"
                      style={{ left: `${levelPercent}%` }}
                     />
                  </div>
                  <div className="flex justify-between text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                    <span>Bajo</span>
                    <span>Normal</span>
                    <span>Medio</span>
                    <span className="text-primary font-bold">Alto</span>
                  </div>
                </div>
              </div>

              {/* Info Box */}
              <div className="bg-muted p-4 rounded-2xl flex gap-3 items-start">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 border border-primary/10">
                  <span className="text-primary font-bold text-xs italic">i</span>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-foreground mb-1">Nivel {level}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                    Esto significa que estás experimentando niveles de estrés y desconexión significativos que están afectando tu capacidad de disfrutar el presente y tu paz mental a largo plazo.
                  </p>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3 mb-10">
              <div className="bg-card p-4 rounded-2xl shadow-sm border border-border flex gap-3 items-start">
                <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary text-xl">💥</div>
                <div>
                  <p className="text-[10px] text-muted-foreground font-medium mb-0.5">Dificultad principal</p>
                  <p className="text-xs font-bold text-foreground leading-tight">{themeLabels[diag.main]}</p>
                </div>
              </div>
              <div className="bg-card p-4 rounded-2xl shadow-sm border border-border flex gap-3 items-start">
                <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary text-xl">📅</div>
                <div>
                  <p className="text-[10px] text-muted-foreground font-medium mb-0.5">Época desafiante</p>
                  <p className="text-xs font-bold text-foreground leading-tight">Varios meses</p>
                </div>
              </div>
              <div className="bg-card p-4 rounded-2xl shadow-sm border border-border flex gap-3 items-start">
                <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary text-xl">⚡</div>
                <div>
                  <p className="text-[10px] text-muted-foreground font-medium mb-0.5">Desencadenante</p>
                  <p className="text-xs font-bold text-foreground leading-tight">{triggerLabels[diag.trigger].split(' ')[0]} {triggerLabels[diag.trigger].split(' ')[1]}</p>
                </div>
              </div>
              <div className="bg-card p-4 rounded-2xl shadow-sm border border-border flex gap-3 items-start">
                <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary text-xl">🔋</div>
                <div>
                  <p className="text-[10px] text-muted-foreground font-medium mb-0.5">Nivel de energía</p>
                  <p className="text-xs font-bold text-foreground leading-tight">Bajo / Inestable</p>
                </div>
              </div>
            </div>

            <button 
              onClick={goNext}
              className="w-full py-4 rounded-full bg-primary text-primary-foreground font-bold text-lg quiz-shadow-lg transform active:scale-[0.98] transition-all"
            >
              Continuar
            </button>
          </Wrapper>
      );
    }

    // Screen 26: Interactive Loading (Triggered after diagnosis summary)
    if (screen === 26) {
      return <InteractiveLoading onComplete={goNext} visible={visible} />;
    }

    // Screen 27: Progression Roadmap
    if (screen === 27) {
      const today = new Date();
      const future = new Date();
      future.setMonth(today.getMonth() + 2);
      const months = ['en.', 'feb.', 'mar.', 'abr.', 'may.', 'jun.', 'jul.', 'ago.', 'sep.', 'oct.', 'nov.', 'dic.'];
      const startMonth = months[today.getMonth()];
      const endMonth = months[future.getMonth()];
      const futureYear = future.getFullYear();

      return (
        <Wrapper visible={visible}>
          <div className="text-center pt-4">
            <h2 className="text-[22px] font-bold text-foreground mb-4 leading-tight">
              Tu Hoja de Ruta Personalizada para Recuperar tu Equilibrio
            </h2>
            <p className="text-sm text-muted-foreground mb-1 leading-relaxed">
              Analizando tu perfil, esta es la progresión estimada para tu proceso de transformación
            </p>
            <p className="text-lg font-bold text-primary mb-10">
              {future.toLocaleDateString('es-MX', { month: 'long', year: 'numeric' })}
            </p>
            
            <div className="bg-card rounded-[32px] p-8 quiz-shadow border border-border/50 mb-8 relative">
              <div className="h-[200px] flex items-end justify-between gap-2 relative">
                {/* Background Columns (The 'Goal' area) */}
                {[0.3, 0.45, 0.55, 0.65, 0.75, 0.9, 1.0].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center group relative h-full">
                    {/* The bar track */}
                    <div className="w-full bg-secondary/30 rounded-t-xl absolute inset-0 bottom-0 z-0" />
                    
                    {/* The animated bar */}
                    <div 
                      className="w-full rounded-t-xl z-10 transition-all duration-[1500ms] ease-out-back relative"
                      style={{ 
                        height: visible ? `${h * 100}%` : '0%',
                        transitionDelay: `${i * 150}ms`,
                        background: i === 6 
                          ? 'linear-gradient(to top, #6C4FBF, #A78BFA)' 
                          : i === 5 
                            ? 'linear-gradient(to top, #7C3AED, #C084FC)'
                            : 'linear-gradient(to top, #6C4FBF88, #A78BFA88)'
                      }}
                    >
                      {i === 5 && visible && (
                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 animate-bounce-slow">
                          <div className="bg-[#22C55E] text-white text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap relative">
                            Objetivo
                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#22C55E] rotate-45" />
                          </div>
                          <div className="w-3 h-3 bg-white border-2 border-[#22C55E] rounded-full mx-auto mt-1 shadow-sm" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between mt-4 px-1">
                <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">{startMonth} {today.getFullYear()}</span>
                <span className="text-[11px] font-bold text-primary uppercase tracking-widest">{endMonth} {futureYear}</span>
              </div>
            </div>

            <p className="text-[11px] text-muted-foreground mb-10 italic max-w-[300px] mx-auto leading-relaxed">
              Esta proyección se genera analizando datos de trayectorias similares exitosas. Los resultados individuales pueden variar.
            </p>
            
            <CTA onClick={goNext} text="Continuar" />
          </div>
        </Wrapper>
      );
    }

    // Screen 28: Results Chart
    if (screen === 28) {
      return (
        <Wrapper visible={visible}>
          <div className="text-center pt-4">
            <h1 className="text-2xl font-bold text-foreground leading-tight mb-2">
              Sssss, ¡tu plan ya está listo!
            </h1>
            <p className="text-sm text-muted-foreground mb-12">
              Tu camino hacia el bienestar interior comienza aquí
            </p>

            <div className="bg-card rounded-[32px] p-8 quiz-shadow border border-border/50 mb-8 relative">
              <p className="text-sm font-bold text-muted-foreground mb-10 text-center uppercase tracking-widest">Nivel de bienestar interior</p>
              
              <div className="relative h-[240px] w-full px-4">
                <svg viewBox="0 0 400 200" className="w-full h-full overflow-visible">
                  {/* Grid Lines */}
                  {[0, 1, 2, 3].map(i => (
                    <line key={i} x1="0" y1={50 + i * 50} x2="400" y2={50 + i * 50} stroke="currentColor" strokeOpacity="0.05" strokeDasharray="4 4" />
                  ))}
                  
                  {/* Path with animation */}
                  <path
                    d="M 20,180 Q 120,170 200,100 T 380,30"
                    fill="none"
                    stroke="#A78BFA"
                    strokeWidth="4"
                    strokeLinecap="round"
                    className="path-animate"
                    style={{ 
                      strokeDasharray: 500, 
                      strokeDashoffset: visible ? 0 : 500,
                      transition: 'stroke-dashoffset 2.5s ease-in-out' 
                    }}
                  />

                  {/* Points with Sequential Animation */}
                  {[
                    { x: 20, y: 180, label: 'Hoy', week: 'Semana 1', color: '#F87171', delay: 0 },
                    { x: 130, y: 150, label: '', week: 'Semana 2', color: '#FB923C', delay: 700 },
                    { x: 260, y: 70, label: '', week: 'Semana 3', color: '#FACC15', delay: 1400 },
                    { x: 380, y: 30, label: 'Nueva realidad', week: 'Semana 4', color: '#22C55E', delay: 2100 }
                  ].map((p, i) => (
                    <g key={i} className={`transition-all duration-500 ease-out ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} style={{ transitionDelay: `${p.delay}ms` }}>
                      {/* Vertical line to axis */}
                      <line x1={p.x} y1={p.y} x2={p.x} y2="190" stroke="currentColor" strokeOpacity="0.1" strokeDasharray="2 2" />
                      
                      {/* Point shadow */}
                      <circle cx={p.x} cy={p.y} r="10" fill="white" className="shadow-sm" />
                      
                      {/* The Point */}
                      <circle cx={p.x} cy={p.y} r="6" fill={p.color} className="animate-pulse-slow" style={{ animationDelay: `${p.delay}ms` }} />
                      
                      {/* Floating Labels */}
                      {p.label && (
                         <foreignObject x={p.x - 40} y={p.y - 45} width="80" height="30">
                            <div className={`text-[9px] font-bold text-white px-2 py-1 rounded-md text-center whitespace-nowrap shadow-md`} style={{ backgroundColor: p.color }}>
                              {p.label}
                            </div>
                         </foreignObject>
                      )}

                      {/* Week Label */}
                      <text x={p.x} y="208" textAnchor="middle" className="fill-muted-foreground text-[10px] font-bold uppercase tracking-tighter">
                        {p.week}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>

              <p className="text-[10px] text-muted-foreground text-center mt-12 leading-relaxed max-w-[280px] mx-auto opacity-70">
                Este gráfico es una ilustración y los resultados dependen de tu compromiso individual con el método.
              </p>
            </div>
            
            <CTA onClick={goNext} text="Continuar" />
          </div>
        </Wrapper>
      );
    }

    // Screen 29: Scratch card
    if (screen === 29) {
      return (
        <Wrapper visible={visible}>
          <div className="text-center pt-4">
            <h2 className="text-xl font-bold text-foreground mb-2">¡Tienes una sorpresa!</h2>
            <p className="text-sm text-muted-foreground mb-8">Raspa la tarjeta para descubrir tu descuento</p>
            
            <div className="mb-10 mx-auto max-w-[320px]">
              <ScratchCard width={320} height={200} onReveal={() => setScratched(true)}>
                <div className="flex flex-col items-center justify-center p-6 text-center">
                  <span className="text-4xl mb-2">🎉</span>
                  <p className="text-2xl font-bold text-primary mb-1">¡Sorpresa!</p>
                  <p className="text-sm text-foreground font-medium">Has desbloqueado un 73% de descuento</p>
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

    // Screen 30: Offer
    if (screen === 30) {
      const diag = getDiagnosis();
      const goalAnswer = (answers['dream_0'] as string) || 'Sentirme en paz';
      return (
        <OfferScreen
          name={name}
          mainDifficulty={genderTexts(themeLabels[diag.main], gender)}
          mainGoal={goalAnswer}
          commitment={commitment || '10 min'}
          gender={gender}
        />
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {renderProgressBar()}
      {renderScreen()}
    </div>
  );
}
