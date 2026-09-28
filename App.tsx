import React, { useState, useMemo } from 'react';
import {
  APP_HEADER,
  FULL_TEXT_PARAGRAPHS,
  MODALIDADES_DATA,
  MEMORY_TABLE_DATA,
  QUESTIONS_AND_ANSWERS,
  SHORT_TEXT
} from './data';
import {
  BookOpen,
  Layers,
  Table as TableIcon,
  HelpCircle,
  FileCheck,
  Award,
  Volume2,
  ChevronDown,
  ChevronUp,
  Search,
  Eye,
  EyeOff,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  ArrowRight,
  BookmarkCheck,
  Copy,
  Check
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'text' | 'types' | 'table' | 'qa' | 'short' | 'quiz'>('types');
  const [revealedIds, setRevealedIds] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModalFilter, setSelectedModalFilter] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);

  // Quiz state
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizSelectedOption, setQuizSelectedOption] = useState<string | null>(null);
  const [quizAnswerSubmitted, setQuizAnswerSubmitted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  // Toggle reveal for a specific element
  const toggleReveal = (id: string) => {
    setRevealedIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const revealAll = () => {
    const allIds: Record<string, boolean> = {};
    // Collect all paragraph IDs
    FULL_TEXT_PARAGRAPHS.forEach(p => { allIds[p.id] = true; });
    // Collect modalities & examples
    MODALIDADES_DATA.forEach(m => {
      allIds[`mod-${m.id}`] = true;
      m.examples.forEach(ex => { allIds[ex.id] = true; });
      if (m.subtypes) allIds[`subtypes-${m.id}`] = true;
      if (m.frequentWords) allIds[`freq-${m.id}`] = true;
    });
    // Table
    MEMORY_TABLE_DATA.forEach(t => { allIds[`table-${t.id}`] = true; });
    // QA
    QUESTIONS_AND_ANSWERS.forEach(qa => {
      allIds[`qa-q-${qa.id}`] = true;
      allIds[`qa-a-${qa.id}`] = true;
    });
    // Short text
    allIds['short-intro'] = true;
    allIds['short-body'] = true;

    setRevealedIds(allIds);
  };

  const hideAll = () => {
    setRevealedIds({});
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const speakSpanish = (text: string, id?: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    // Clean brackets/quotes if needed
    const cleanText = text.replace(/[“”!¡¿?]/g, ' ').trim();
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'es-ES';
    utterance.rate = 0.88;

    if (id) {
      setPlayingAudioId(id);
      utterance.onend = () => setPlayingAudioId(null);
      utterance.onerror = () => setPlayingAudioId(null);
    }

    window.speechSynthesis.speak(utterance);
  };

  // Filtered QA
  const filteredQA = useMemo(() => {
    return QUESTIONS_AND_ANSWERS.filter(item => {
      const q = searchQuery.toLowerCase();
      const matchSearch =
        item.esQuestion.toLowerCase().includes(q) ||
        item.armQuestion.toLowerCase().includes(q) ||
        item.esAnswer.toLowerCase().includes(q) ||
        item.armAnswer.toLowerCase().includes(q);

      const matchFilter =
        selectedModalFilter === 'all' ||
        item.category.toLowerCase().includes(selectedModalFilter.toLowerCase()) ||
        item.esAnswer.toLowerCase().includes(selectedModalFilter.toLowerCase());

      return matchSearch && matchFilter;
    });
  }, [searchQuery, selectedModalFilter]);

  // Quiz questions: 10 curated questions mixing identification and theory from the 17 QA & examples
  const quizQuestions = useMemo(() => [
    {
      questionEs: "¿Qué tipo de oración es “Hoy hace frío”?",
      questionArm: "«Այսօր ցուրտ է» նախադասությունը ո՞ր տեսակին է պատկանում։",
      options: ["Enunciativa", "Interrogativa", "Exclamativa", "Desiderativa"],
      correct: "Enunciativa",
      explanationArm: "Պատմողական (Enunciativa)՝ օգտագործվում է տեղեկություն հաղորդելու համար։"
    },
    {
      questionEs: "¿Qué tipo de oración es “¿Dónde vives?”?",
      questionArm: "«Որտե՞ղ ես ապրում» նախադասությունը ո՞ր տեսակին է պատկանում։",
      options: ["Exhortativa", "Interrogativa", "Dubitativa", "Exclamativa"],
      correct: "Interrogativa",
      explanationArm: "Հարցական (Interrogativa)՝ օգտագործվում է հարց տալու համար։"
    },
    {
      questionEs: "¿Qué tipo de oración es “¡Qué bonito!”?",
      questionArm: "«Ինչքա՜ն գեղեցիկ է» նախադասությունը ո՞ր տեսակին է պատկանում։",
      options: ["Exclamativa", "Desiderativa", "Enunciativa", "Dubitativa"],
      correct: "Exclamativa",
      explanationArm: "Բացականչական (Exclamativa)՝ արտահայտում է ուժեղ զգացմունքներ։"
    },
    {
      questionEs: "¿Qué tipo de oración es “Abre el libro”?",
      questionArm: "«Բացի՛ր գիրքը» նախադասությունը ո՞ր տեսակին է պատկանում։",
      options: ["Dubitativa", "Exhortativa o imperativa", "Interrogativa", "Desiderativa"],
      correct: "Exhortativa o imperativa",
      explanationArm: "Հրամայական (Exhortativa)՝ տալիս է հրաման կամ հրահանգ։"
    },
    {
      questionEs: "¿Qué tipo de oración es “Ojalá apruebe”?",
      questionArm: "«Երանի հանձնեմ» նախադասությունը ո՞ր տեսակին է պատկանում։",
      options: ["Desiderativa", "Enunciativa", "Dubitativa", "Exclamativa"],
      correct: "Desiderativa",
      explanationArm: "Ցանկական (Desiderativa)՝ արտահայտում է ցանկություն։ Հաճախ օգտագործվում է «ojalá» բառը։"
    },
    {
      questionEs: "¿Qué tipo de oración es “Quizá venga mañana”?",
      questionArm: "«Գուցե նա վաղը գա» նախադասությունը ո՞ր տեսակին է պատկանում։",
      options: ["Dubitativa", "Interrogativa", "Exhortativa", "Enunciativa"],
      correct: "Dubitativa",
      explanationArm: "Կասկածական (Dubitativa)՝ արտահայտում է կասկած կամ հավանականություն («quizá», «tal vez»)։"
    },
    {
      questionEs: "¿Cuántas modalidades principales hay?",
      questionArm: "Քանի՞ հիմնական տեսակ կա։",
      options: ["Cuatro (4)", "Cinco (5)", "Seis (6)", "Ocho (8)"],
      correct: "Seis (6)",
      explanationArm: "Կան 6 հիմնական տեսակներ՝ Enunciativa, Interrogativa, Exclamativa, Exhortativa, Desiderativa, Dubitativa:"
    },
    {
      questionEs: "¿Para qué sirve una oración desiderativa?",
      questionArm: "Ինչի՞ համար է ցանկական նախադասությունը։",
      options: ["Para dar órdenes", "Para expresar deseos", "Para hacer preguntas", "Para informar"],
      correct: "Para expresar deseos",
      explanationArm: "Sirve para expresar deseos (Ցանկություն արտահայտելու համար)։"
    },
    {
      questionEs: "¿Qué palabra aparece frecuentemente en las desiderativas?",
      questionArm: "Ո՞ր բառն է հաճախ օգտագործվում ցանկական նախադասություններում։",
      options: ["Quizá", "Ojalá", "Por favor", "Dónde"],
      correct: "Ojalá",
      explanationArm: "«Ojalá» նշանակում է «երանի»:"
    },
    {
      questionEs: "¿Qué palabras pueden aparecer en las dubitativas?",
      questionArm: "Ի՞նչ բառեր կարող են օգտագործվել կասկածական նախադասություններում։",
      options: ["Quizá, quizás o tal vez", "Ojalá y siéntate", "Hoy y nunca", "Dónde y cuándo"],
      correct: "Quizá, quizás o tal vez",
      explanationArm: "Quizá, quizás, tal vez (գուցե, միգուցե, հնարավոր է)։"
    }
  ], []);

  const handleSelectQuizOption = (opt: string) => {
    if (quizAnswerSubmitted) return;
    setQuizSelectedOption(opt);
  };

  const handleCheckQuizAnswer = () => {
    if (!quizSelectedOption) return;
    setQuizAnswerSubmitted(true);
    if (quizSelectedOption === quizQuestions[quizIndex].correct) {
      setQuizScore(s => s + 1);
    }
  };

  const handleNextQuizQuestion = () => {
    if (quizIndex + 1 < quizQuestions.length) {
      setQuizIndex(i => i + 1);
      setQuizSelectedOption(null);
      setQuizAnswerSubmitted(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestartQuiz = () => {
    setQuizIndex(0);
    setQuizScore(0);
    setQuizSelectedOption(null);
    setQuizAnswerSubmitted(false);
    setQuizFinished(false);
  };

  // Reusable Spanish Interactive Clickable Card
  const InteractiveSpanCard = ({
    id,
    esText,
    armText,
    label,
    badgeText,
    context,
    isLarge = false
  }: {
    id: string;
    esText: string;
    armText: string;
    label?: string;
    badgeText?: string;
    context?: string;
    isLarge?: boolean;
  }) => {
    const isRevealed = !!revealedIds[id];
    const isPlaying = playingAudioId === id;

    return (
      <div
        className={`group relative rounded-xl border transition-all duration-200 ${
          isRevealed
            ? 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-300 dark:border-amber-700/60 shadow-sm'
            : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-amber-300 dark:hover:border-amber-600/60 hover:shadow-sm'
        }`}
      >
        {/* Top Header / Meta */}
        {(label || badgeText || context) && (
          <div className="flex items-center justify-between px-4 pt-3 pb-1 text-xs text-stone-500 dark:text-stone-400">
            <div className="flex items-center gap-2">
              {label && <span className="font-semibold tracking-wider text-amber-700 dark:text-amber-400 uppercase">{label}</span>}
              {badgeText && (
                <span className="rounded bg-stone-100 dark:bg-stone-800 px-2 py-0.5 text-stone-600 dark:text-stone-300 font-medium">
                  {badgeText}
                </span>
              )}
            </div>
            {context && <span className="text-stone-400 dark:text-stone-500 italic">{context}</span>}
          </div>
        )}

        {/* Clickable Spanish Segment */}
        <div
          onClick={() => toggleReveal(id)}
          className={`cursor-pointer px-4 ${label || badgeText || context ? 'pb-3 pt-1.5' : 'py-3.5'} flex items-start justify-between gap-3`}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleReveal(id); } }}
          title="Սեղմեք հայերեն թարգմանությունը տեսնելու համար (Haz clic para ver la traducción en armenio)"
        >
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm select-none" title="Español">🇪🇸</span>
              <span className="text-xs font-semibold text-stone-400 tracking-wide uppercase">Español</span>
              <span className="text-[11px] text-amber-600 dark:text-amber-400 bg-amber-100/60 dark:bg-amber-950/60 px-1.5 py-0.2 rounded font-medium ml-1">
                {isRevealed ? 'Թարգմանությունը բացված է' : 'Սեղմի՛ր թարգմանության համար'}
              </span>
            </div>
            <p className={`font-medium text-stone-900 dark:text-stone-100 leading-relaxed ${isLarge ? 'text-lg md:text-xl' : 'text-base md:text-lg'}`}>
              {esText}
            </p>
          </div>

          <div className="flex items-center gap-1.5 pt-1" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => speakSpanish(esText, id)}
              className={`p-2 rounded-lg transition-colors ${
                isPlaying
                  ? 'bg-amber-500 text-white animate-pulse'
                  : 'text-stone-500 hover:text-amber-600 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
              title="Լսել իսպաներեն արտասանությունը (Escuchar pronunciación)"
            >
              <Volume2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => copyToClipboard(esText, id)}
              className="p-2 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              title="Պատճենել (Copiar texto)"
            >
              {copiedId === id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
            <button
              onClick={() => toggleReveal(id)}
              className={`p-2 rounded-lg text-amber-600 dark:text-amber-400 hover:bg-amber-100/60 dark:hover:bg-amber-900/40 transition-colors ${
                isRevealed ? 'rotate-180' : ''
              }`}
              title={isRevealed ? 'Փակել թարգմանությունը' : 'Բացել թարգմանությունը'}
            >
              <ChevronDown className="w-4 h-4 transition-transform duration-200" />
            </button>
          </div>
        </div>

        {/* Revealed Armenian Translation */}
        {isRevealed && (
          <div className="border-t border-amber-200/80 dark:border-amber-800/50 bg-amber-50/70 dark:bg-amber-950/40 px-4 py-3 rounded-b-xl animate-in fade-in slide-in-from-top-1 duration-200">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm select-none" title="Հայերեն">🇦🇲</span>
              <span className="text-xs font-semibold text-amber-800 dark:text-amber-300 tracking-wide uppercase font-armenian">
                Հայերեն թարգմանություն
              </span>
            </div>
            <p className="font-armenian text-base md:text-lg text-stone-900 dark:text-stone-100 font-medium leading-relaxed">
              {armText}
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-stone-100/70 dark:bg-stone-950 text-stone-900 dark:text-stone-100 flex flex-col font-sans">
      {/* Top Banner / Hero Header */}
      <header className="sticky top-0 z-30 bg-stone-900 text-white shadow-md border-b border-stone-800">
        <div className="max-w-6xl mx-auto px-4 py-3 sm:py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-amber-500 text-stone-950 font-bold text-sm">
                  2
                </span>
                <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
                  <span>MODALIDADES ORACIONALES</span>
                  <span className="text-xs font-normal px-2 py-0.5 rounded bg-stone-800 text-amber-300 border border-stone-700">
                    ES 🇪🇸 ⇄ 🇦🇲 ARM
                  </span>
                </h1>
              </div>
              <p className="font-armenian text-xs sm:text-sm text-stone-300 mt-1">
                {APP_HEADER.armTitle}
              </p>
            </div>

            {/* Quick Global Action Buttons */}
            <div className="flex items-center gap-2 self-start md:self-auto">
              <button
                onClick={revealAll}
                className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-300 border border-stone-700 transition-colors shadow-sm"
                title="Բացել բոլոր հայերեն թարգմանությունները"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Բոլորը բացել</span>
              </button>
              <button
                onClick={hideAll}
                className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 border border-stone-700 transition-colors shadow-sm"
                title="Թաքցնել թարգմանությունները ինքնաստուգման համար"
              >
                <EyeOff className="w-3.5 h-3.5" />
                <span>Թաքցնել</span>
              </button>
            </div>
          </div>

          {/* Navigation Bar Tabs */}
          <nav className="flex items-center gap-1 overflow-x-auto pt-3 pb-0.5 no-scrollbar scroll-smooth">
            {[
              { id: 'types', labelEs: '6 Tipos', labelArm: '6 Տեսակներ', icon: Layers },
              { id: 'text', labelEs: 'Texto completo', labelArm: 'Լիարժեք տեքստ', icon: BookOpen },
              { id: 'table', labelEs: 'Tabla', labelArm: 'Աղյուսակ', icon: TableIcon },
              { id: 'qa', labelEs: '17 Preguntas', labelArm: '17 Հարց ու պատասխան', icon: HelpCircle },
              { id: 'short', labelEs: 'Texto corto', labelArm: 'Կարճ տեքստ', icon: FileCheck },
              { id: 'quiz', labelEs: 'Practicar', labelArm: 'Թեստ / Ստուգում', icon: Award }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-t-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all border-b-2 ${
                    isActive
                      ? 'bg-stone-800 text-amber-400 border-amber-400 shadow-inner'
                      : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/50 border-transparent'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.labelArm}</span>
                  <span className="text-[11px] opacity-70 hidden sm:inline">({tab.labelEs})</span>
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-6 md:py-8 space-y-6">

        {/* Global Click-to-Reveal Info Banner */}
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3.5 flex items-center justify-between gap-3 text-xs sm:text-sm text-amber-900 dark:text-amber-200">
          <div className="flex items-center gap-2.5">
            <span className="flex h-2.5 w-2.5 relative flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
            </span>
            <span className="font-medium font-armenian">
              Հուշում. Սեղմեք ցանկացած իսպաներեն նախադասության կամ օրինակի վրա՝ հայերեն թարգմանությունն անմիջապես տեսնելու համար։
            </span>
          </div>
          <span className="hidden md:inline-block text-xs bg-amber-200/60 dark:bg-amber-900/60 px-2 py-0.5 rounded text-amber-900 dark:text-amber-100 font-mono">
            Clic para traducir 🇪🇸 ➔ 🇦🇲
          </span>
        </div>

        {/* TAB 1: 6 TIPOS PRINCIPALES / 6 ՀԻՄՆԱԿԱՆ ՏԵՍԱԿՆԵՐԸ */}
        {activeTab === 'types' && (
          <div className="space-y-6">
            <div className="border-b border-stone-200 dark:border-stone-800 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100">
                  Tipos principales
                </h2>
                <p className="text-sm font-armenian text-stone-600 dark:text-stone-400 mt-0.5">
                  Հիմնական տեսակները (6 ինտերակտիվ բաժիններ)
                </p>
              </div>
              <div className="text-xs text-stone-500">
                Սեղմեք օրինակներին կամ կանոններին՝ թարգմանությունը բացելու համար
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {MODALIDADES_DATA.map((item) => {
                const isModDefRevealed = !!revealedIds[`mod-${item.id}`];

                return (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm overflow-hidden"
                  >
                    {/* Header with Title and Armenian Equivalent */}
                    <div className="px-5 py-4 bg-stone-50/80 dark:bg-stone-900/80 border-b border-stone-200 dark:border-stone-800 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-700 dark:text-amber-400 font-bold flex items-center justify-center text-sm border border-amber-500/30">
                          {item.number}
                        </span>
                        <div>
                          <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                            <span>{item.esTitle}</span>
                            <span className="text-stone-400 font-normal">/</span>
                            <span className="font-armenian text-amber-700 dark:text-amber-400 font-semibold">
                              {item.armTitle}
                            </span>
                          </h3>
                        </div>
                      </div>

                      <button
                        onClick={() => speakSpanish(item.esTitle)}
                        className="text-xs flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-stone-100 dark:bg-stone-800 hover:bg-amber-100 dark:hover:bg-amber-950/60 text-stone-700 dark:text-stone-300 transition-colors"
                        title="Լսել անվանումը"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Արտասանել</span>
                      </button>
                    </div>

                    <div className="p-5 space-y-5">
                      {/* Main Rule / Definition */}
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2">
                          Գործառույթը / Función
                        </div>
                        <InteractiveSpanCard
                          id={`mod-${item.id}`}
                          esText={item.esSummary}
                          armText={item.armSummary}
                          label="Կանոն"
                        />
                      </div>

                      {/* Subtypes (for Enunciativa: afirmativa / negativa) */}
                      {item.subtypes && item.subtypes.length > 0 && (
                        <div>
                          <div className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2">
                            Puede ser / Կարող է լինել՝
                          </div>
                          <div
                            onClick={() => toggleReveal(`subtypes-${item.id}`)}
                            className="p-4 rounded-xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 hover:border-amber-300 dark:hover:border-amber-600/60 cursor-pointer transition-all"
                            role="button"
                            tabIndex={0}
                          >
                            <div className="flex flex-wrap items-center gap-4 text-sm md:text-base font-medium">
                              {item.subtypes.map((sub, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                                  <span className="text-stone-900 dark:text-stone-100 font-semibold">{sub.es}</span>
                                  {revealedIds[`subtypes-${item.id}`] ? (
                                    <span className="font-armenian text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/60 px-2 py-0.5 rounded text-xs font-medium">
                                      {sub.arm}
                                    </span>
                                  ) : (
                                    <span className="text-xs text-stone-400 bg-stone-200 dark:bg-stone-800 px-2 py-0.5 rounded">
                                      սեղմի՛ր
                                    </span>
                                  )}
                                </div>
                              ))}
                            </div>
                            <div className="text-xs text-amber-600 dark:text-amber-400 font-armenian mt-2">
                              {revealedIds[`subtypes-${item.id}`] ? 'Թարգմանությունը ցուցադրված է' : '👉 Սեղմեք այստեղ՝ ենթատեսակների հայերեն թարգմանությունը տեսնելու համար'}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Frequent Words (for Desiderativa & Dubitativa) */}
                      {item.frequentWords && item.frequentWords.length > 0 && (
                        <div>
                          <div className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2">
                            Palabras frecuentes / Հաճախ հանդիպող բառեր՝
                          </div>
                          <div
                            onClick={() => toggleReveal(`freq-${item.id}`)}
                            className="p-4 rounded-xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 hover:border-amber-300 dark:hover:border-amber-600/60 cursor-pointer transition-all"
                            role="button"
                            tabIndex={0}
                          >
                            <div className="flex flex-wrap items-center gap-4 text-sm md:text-base font-medium">
                              {item.frequentWords.map((fw, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                  <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                                  <span className="text-stone-900 dark:text-stone-100 font-bold">{fw.es}</span>
                                  {revealedIds[`freq-${item.id}`] ? (
                                    <span className="font-armenian text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-950/60 px-2 py-0.5 rounded text-xs font-medium">
                                      {fw.arm}
                                    </span>
                                  ) : (
                                    <span className="text-xs text-stone-400 bg-stone-200 dark:bg-stone-800 px-2 py-0.5 rounded">
                                      սեղմի՛ր
                                    </span>
                                  )}
                                </div>
                              ))}
                            </div>
                            <div className="text-xs text-amber-600 dark:text-amber-400 font-armenian mt-2">
                              {revealedIds[`freq-${item.id}`] ? 'Թարգմանությունը ցուցադրված է' : '👉 Սեղմեք այստեղ՝ բառերի հայերեն թարգմանությունը տեսնելու համար'}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Examples */}
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2">
                          Ejemplos / Օրինակներ (սեղմեք օրինակի վրա)
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {item.examples.map((ex) => (
                            <InteractiveSpanCard
                              key={ex.id}
                              id={ex.id}
                              esText={ex.es}
                              armText={ex.arm}
                              context={ex.context}
                              label="Օրինակ"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: TEXTO COMPLETO / ԼԻԱՐԺԵՔ ՏԵՔՍՏ */}
        {activeTab === 'text' && (
          <div className="space-y-6">
            <div className="border-b border-stone-200 dark:border-stone-800 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100">
                  Texto completo
                </h2>
                <p className="text-sm font-armenian text-stone-600 dark:text-stone-400 mt-0.5">
                  Լիարժեք տեքստ՝ բոլոր պարբերություններով
                </p>
              </div>
              <div className="text-xs text-stone-500">
                Սեղմեք յուրաքանչյուր պարբերության վրա՝ հայերենը բացելու համար
              </div>
            </div>

            <div className="space-y-4">
              {FULL_TEXT_PARAGRAPHS.map((p, idx) => (
                <InteractiveSpanCard
                  key={p.id}
                  id={p.id}
                  esText={p.es}
                  armText={p.arm}
                  label={`Պարբերություն ${idx + 1}`}
                  isLarge={true}
                />
              ))}
            </div>

            {/* Side-by-side Full Reference view */}
            <div className="mt-8 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-6 shadow-sm">
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 mb-4 flex items-center gap-2">
                <BookmarkCheck className="w-5 h-5 text-amber-500" />
                <span>Ամբողջական համադրական տեքստ (Paralelo)</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 divide-y md:divide-y-0 md:divide-x divide-stone-200 dark:divide-stone-800">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 pb-2 border-b border-stone-200 dark:border-stone-800">
                    <span className="text-lg">🇪🇸</span>
                    <span className="font-bold text-sm uppercase tracking-wide">Español</span>
                  </div>
                  {FULL_TEXT_PARAGRAPHS.map((p, i) => (
                    <p key={i} className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                      {p.es}
                    </p>
                  ))}
                </div>
                <div className="space-y-3 md:pl-6 pt-4 md:pt-0">
                  <div className="flex items-center gap-2 pb-2 border-b border-stone-200 dark:border-stone-800">
                    <span className="text-lg">🇦🇲</span>
                    <span className="font-bold text-sm uppercase tracking-wide font-armenian">Հայերեն</span>
                  </div>
                  {FULL_TEXT_PARAGRAPHS.map((p, i) => (
                    <p key={i} className="text-sm font-armenian text-stone-700 dark:text-stone-300 leading-relaxed">
                      {p.arm}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: TABLA PARA MEMORIZAR / ԱՂՅՈՒՍԱԿ՝ ՀԻՇԵԼՈՒ ՀԱՄԱՐ */}
        {activeTab === 'table' && (
          <div className="space-y-6">
            <div className="border-b border-stone-200 dark:border-stone-800 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100">
                  Tabla para memorizar
                </h2>
                <p className="text-sm font-armenian text-stone-600 dark:text-stone-400 mt-0.5">
                  Աղյուսակ՝ հիշելու համար (6 տեսակները և նրանց գործառույթը)
                </p>
              </div>
              <div className="text-xs text-stone-500">
                Սեղմեք տողի վրա՝ հայերենը բացելու համար
              </div>
            </div>

            {/* Interactive Responsive Table */}
            <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-stone-50 dark:bg-stone-800/80 border-b border-stone-200 dark:border-stone-700 text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300">
                      <th className="py-3.5 px-4">#</th>
                      <th className="py-3.5 px-4">🇪🇸 Modalidad</th>
                      <th className="py-3.5 px-4">🇪🇸 Función</th>
                      <th className="py-3.5 px-4 font-armenian">🇦🇲 Հայերեն (սեղմեք բացելու համար)</th>
                      <th className="py-3.5 px-4 text-right">Գործողություն</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200 dark:divide-stone-800 text-sm">
                    {MEMORY_TABLE_DATA.map((row, idx) => {
                      const isRevealed = !!revealedIds[`table-${row.id}`];
                      return (
                        <tr
                          key={row.id}
                          onClick={() => toggleReveal(`table-${row.id}`)}
                          className={`cursor-pointer transition-colors ${
                            isRevealed
                              ? 'bg-amber-50/60 dark:bg-amber-950/20'
                              : 'hover:bg-stone-50 dark:hover:bg-stone-800/40'
                          }`}
                        >
                          <td className="py-4 px-4 font-mono text-xs text-stone-400 font-bold">
                            {idx + 1}
                          </td>
                          <td className="py-4 px-4 font-bold text-stone-900 dark:text-stone-100">
                            <div className="flex items-center gap-2">
                              <span>{row.modalidad}</span>
                              <span className="text-[11px] text-stone-400 font-normal">
                                ({row.armModalidad})
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-stone-700 dark:text-stone-300 font-medium">
                            <span className="rounded bg-stone-100 dark:bg-stone-800 px-2 py-0.5">
                              {row.funcion}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            {isRevealed ? (
                              <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-armenian font-semibold animate-in fade-in duration-150">
                                <span>{row.armFuncion}</span>
                                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              </div>
                            ) : (
                              <button
                                onClick={(e) => { e.stopPropagation(); toggleReveal(`table-${row.id}`); }}
                                className="text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-1 rounded border border-amber-200 dark:border-amber-800/60 hover:bg-amber-100 font-armenian transition-colors"
                              >
                                Տեսնել հայերենը
                              </button>
                            )}
                          </td>
                          <td className="py-4 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                            <button
                              onClick={() => speakSpanish(`${row.modalidad}. ${row.funcion}`)}
                              className="p-1.5 rounded-lg text-stone-400 hover:text-amber-600 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                              title="Լսել"
                            >
                              <Volume2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Cards Grid for Mobile view or rapid memorization */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {MEMORY_TABLE_DATA.map((row) => (
                <div
                  key={`card-${row.id}`}
                  onClick={() => toggleReveal(`table-${row.id}`)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    revealedIds[`table-${row.id}`]
                      ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-300 dark:border-amber-700/60'
                      : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-amber-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-base text-stone-900 dark:text-stone-100">
                      {row.modalidad}
                    </span>
                    <button
                      onClick={(e) => { e.stopPropagation(); speakSpanish(row.modalidad); }}
                      className="p-1 text-stone-400 hover:text-amber-600"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-xs text-stone-500 mb-2">
                    Función: <span className="font-semibold text-stone-800 dark:text-stone-200">{row.funcion}</span>
                  </div>
                  <div className="pt-2 border-t border-stone-100 dark:border-stone-800">
                    {revealedIds[`table-${row.id}`] ? (
                      <div className="text-sm font-armenian font-semibold text-amber-700 dark:text-amber-400">
                        {row.armFuncion} ({row.armModalidad})
                      </div>
                    ) : (
                      <div className="text-xs text-amber-600 dark:text-amber-400 font-armenian flex items-center gap-1">
                        <span>👉 Սեղմի՛ր թարգմանության համար</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: 17 PREGUNTAS Y RESPUESTAS / 17 ՀԱՐՑԵՐ ԵՎ ՊԱՏԱՍԽԱՆՆԵՐ */}
        {activeTab === 'qa' && (
          <div className="space-y-6">
            <div className="border-b border-stone-200 dark:border-stone-800 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100">
                  Preguntas y respuestas
                </h2>
                <p className="text-sm font-armenian text-stone-600 dark:text-stone-400 mt-0.5">
                  Հարցեր և պատասխաններ (բոլոր 17 հարցերը՝ առանց որևէ բացթողման)
                </p>
              </div>

              {/* Search & Filter */}
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-2.5 text-stone-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Փնտրել հարցերում..."
                    className="pl-9 pr-3 py-1.5 text-xs sm:text-sm rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500 w-44 sm:w-56"
                  />
                </div>
              </div>
            </div>

            {/* QA List */}
            <div className="space-y-4">
              {filteredQA.map((qa) => {
                const isQRevealed = !!revealedIds[`qa-q-${qa.id}`];
                const isARevealed = !!revealedIds[`qa-a-${qa.id}`];

                return (
                  <div
                    key={qa.id}
                    className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-5 shadow-sm space-y-4"
                  >
                    {/* Top QA badge */}
                    <div className="flex items-center justify-between text-xs text-stone-400">
                      <span className="font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                        <span className="w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 flex items-center justify-center text-xs font-bold">
                          {qa.id}
                        </span>
                        <span>Հարց #{qa.id}</span>
                      </span>
                      <span className="bg-stone-100 dark:bg-stone-800 px-2 py-0.5 rounded text-stone-500">
                        {qa.category}
                      </span>
                    </div>

                    {/* Question Block (Clickable) */}
                    <div
                      onClick={() => toggleReveal(`qa-q-${qa.id}`)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                        isQRevealed
                          ? 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-300 dark:border-amber-700/60'
                          : 'bg-stone-50 dark:bg-stone-800/40 border-stone-200 dark:border-stone-700 hover:border-amber-300'
                      }`}
                      role="button"
                      tabIndex={0}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-bold text-stone-500">🇪🇸 Pregunta:</span>
                            <span className="text-[11px] text-amber-600 font-armenian">
                              {isQRevealed ? 'թարգմանությունը բաց է' : 'սեղմի՛ր հարցի թարգմանության համար'}
                            </span>
                          </div>
                          <p className="font-bold text-stone-900 dark:text-stone-100 text-base sm:text-lg">
                            {qa.esQuestion}
                          </p>
                        </div>
                        <button
                          onClick={(e) => { e.stopPropagation(); speakSpanish(qa.esQuestion); }}
                          className="p-1.5 text-stone-400 hover:text-amber-600 rounded-lg hover:bg-stone-200 dark:hover:bg-stone-700"
                          title="Լսել հարցը"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>

                      {isQRevealed && (
                        <div className="mt-3 pt-2.5 border-t border-amber-200/80 dark:border-amber-800/50 text-amber-900 dark:text-amber-200 font-armenian font-semibold text-base">
                          <div className="text-xs text-amber-700 dark:text-amber-400 mb-0.5">🇦🇲 Հայերեն հարցը՝</div>
                          {qa.armQuestion}
                        </div>
                      )}
                    </div>

                    {/* Answer Block (Clickable) */}
                    <div
                      onClick={() => toggleReveal(`qa-a-${qa.id}`)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                        isARevealed
                          ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-700/60'
                          : 'bg-stone-50/60 dark:bg-stone-800/20 border-stone-200 dark:border-stone-700 hover:border-emerald-300'
                      }`}
                      role="button"
                      tabIndex={0}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">🇪🇸 Respuesta:</span>
                            <span className="text-[11px] text-emerald-600 font-armenian">
                              {isARevealed ? 'թարգմանությունը բաց է' : 'սեղմի՛ր պատասխանի թարգմանության համար'}
                            </span>
                          </div>
                          <p className="font-semibold text-stone-800 dark:text-stone-200 text-base">
                            {qa.esAnswer}
                          </p>
                        </div>
                        <button
                          onClick={(e) => { e.stopPropagation(); speakSpanish(qa.esAnswer); }}
                          className="p-1.5 text-stone-400 hover:text-emerald-600 rounded-lg hover:bg-stone-200 dark:hover:bg-stone-700"
                          title="Լսել պատասխանը"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>

                      {isARevealed && (
                        <div className="mt-3 pt-2.5 border-t border-emerald-200/80 dark:border-emerald-800/50 text-emerald-950 dark:text-emerald-200 font-armenian font-semibold text-base">
                          <div className="text-xs text-emerald-700 dark:text-emerald-400 mb-0.5">🇦🇲 Հայերեն պատասխանը՝</div>
                          {qa.armAnswer}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {filteredQA.length === 0 && (
                <div className="text-center py-12 text-stone-400">
                  Համընկնող հարց չգտնվեց: Փորձեք փոխել որոնման բառը:
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 5: TEXTO CORTO / ԿԱՐՃ ՏԵՔՍՏ */}
        {activeTab === 'short' && (
          <div className="space-y-6">
            <div className="border-b border-stone-200 dark:border-stone-800 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100">
                  {SHORT_TEXT.sectionTitleEs}
                </h2>
                <p className="text-sm font-armenian text-stone-600 dark:text-stone-400 mt-0.5">
                  {SHORT_TEXT.sectionTitleArm} (Արագ ամփոփում)
                </p>
              </div>
              <div className="text-xs text-stone-500">
                Սեղմեք ցանկացած հատվածի վրա՝ հայերենը բացելու համար
              </div>
            </div>

            <div className="space-y-4">
              <InteractiveSpanCard
                id="short-intro"
                esText={SHORT_TEXT.introEs}
                armText={SHORT_TEXT.introArm}
                label="Գաղափար"
                isLarge={true}
              />

              <InteractiveSpanCard
                id="short-body"
                esText={SHORT_TEXT.bodyEs}
                armText={SHORT_TEXT.bodyArm}
                label="Ամփոփ ցանկ"
                isLarge={true}
              />
            </div>

            {/* Quick breakdown list */}
            <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-6 shadow-sm">
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <span className="font-armenian">Վեց տեսակների արագ հիշեցում</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { es: "enunciativa: para informar", arm: "պատմողական՝ տեղեկություն հաղորդելու համար", id: "sh-1" },
                  { es: "interrogativa: para preguntar", arm: "հարցական՝ հարց տալու համար", id: "sh-2" },
                  { es: "exclamativa: para expresar emociones", arm: "բացականչական՝ զգացմունք արտահայտելու համար", id: "sh-3" },
                  { es: "exhortativa: para dar órdenes o hacer peticiones", arm: "հրամայական՝ հրաման կամ խնդրանք տալու համար", id: "sh-4" },
                  { es: "desiderativa: para expresar deseos", arm: "ցանկական՝ ցանկություն արտահայտելու համար", id: "sh-5" },
                  { es: "dubitativa: para expresar duda o posibilidad", arm: "կասկածական՝ կասկած կամ հավանականություն արտահայտելու համար", id: "sh-6" }
                ].map((item) => (
                  <div
                    key={item.id}
                    onClick={() => toggleReveal(item.id)}
                    className="p-3.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/50 hover:border-amber-300 cursor-pointer transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-stone-900 dark:text-stone-100 text-sm">
                        {item.es}
                      </span>
                      <button
                        onClick={(e) => { e.stopPropagation(); speakSpanish(item.es); }}
                        className="p-1 text-stone-400 hover:text-amber-600"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                    {revealedIds[item.id] ? (
                      <p className="mt-2 text-xs font-armenian font-semibold text-amber-700 dark:text-amber-400 pt-2 border-t border-stone-200 dark:border-stone-800">
                        {item.arm}
                      </p>
                    ) : (
                      <p className="mt-1 text-[11px] text-amber-600 font-armenian">
                        👉 սեղմի՛ր հայերենի համար
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: PRACTICAR / ԻՆՏԵՐԱԿՏԻՎ ԹԵՍՏ */}
        {activeTab === 'quiz' && (
          <div className="space-y-6">
            <div className="border-b border-stone-200 dark:border-stone-800 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100">
                  Practicar y comprobar
                </h2>
                <p className="text-sm font-armenian text-stone-600 dark:text-stone-400 mt-0.5">
                  Ստուգեք Ձեր գիտելիքները (Թեստ 10 հարցերից)
                </p>
              </div>
              <button
                onClick={handleRestartQuiz}
                className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Սկսել նորից</span>
              </button>
            </div>

            {!quizFinished ? (
              <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-6 shadow-sm space-y-6">
                {/* Progress bar */}
                <div>
                  <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                    <span className="font-semibold">Հարց {quizIndex + 1} / {quizQuestions.length}</span>
                    <span className="font-mono">Միավոր՝ {quizScore} / {quizQuestions.length}</span>
                  </div>
                  <div className="w-full bg-stone-100 dark:bg-stone-800 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-amber-500 h-2 transition-all duration-300 rounded-full"
                      style={{ width: `${((quizIndex + 1) / quizQuestions.length) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Current Question */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                      Իսպաներեն հարց / Օրինակ
                    </span>
                    <button
                      onClick={() => speakSpanish(quizQuestions[quizIndex].questionEs)}
                      className="text-stone-400 hover:text-amber-600 p-1"
                      title="Լսել հարցը"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100">
                    {quizQuestions[quizIndex].questionEs}
                  </h3>
                  <p className="text-sm sm:text-base font-armenian text-stone-600 dark:text-stone-400 font-medium">
                    🇦🇲 {quizQuestions[quizIndex].questionArm}
                  </p>
                </div>

                {/* Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {quizQuestions[quizIndex].options.map((option, idx) => {
                    const isSelected = quizSelectedOption === option;
                    const isCorrect = option === quizQuestions[quizIndex].correct;

                    let btnStyle = "border-stone-200 dark:border-stone-700 bg-stone-50/70 dark:bg-stone-800/40 text-stone-900 dark:text-stone-100 hover:border-amber-400";
                    if (quizAnswerSubmitted) {
                      if (isCorrect) {
                        btnStyle = "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-bold";
                      } else if (isSelected && !isCorrect) {
                        btnStyle = "border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200";
                      } else {
                        btnStyle = "opacity-50 border-stone-200 dark:border-stone-800";
                      }
                    } else if (isSelected) {
                      btnStyle = "border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 font-bold ring-2 ring-amber-400/40";
                    }

                    return (
                      <button
                        key={idx}
                        disabled={quizAnswerSubmitted}
                        onClick={() => handleSelectQuizOption(option)}
                        className={`p-4 rounded-xl border text-left font-medium transition-all flex items-center justify-between ${btnStyle}`}
                      >
                        <span>{option}</span>
                        {quizAnswerSubmitted && isCorrect && (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation on answer submission */}
                {quizAnswerSubmitted && (
                  <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-sm animate-in fade-in">
                    <div className="font-bold text-amber-900 dark:text-amber-300 font-armenian mb-1">
                      {quizSelectedOption === quizQuestions[quizIndex].correct ? '🎉 Ճիշտ է։' : '❌ Սխալ է։ Ճիշտ պատասխանն է՝ ' + quizQuestions[quizIndex].correct}
                    </div>
                    <div className="font-armenian text-stone-700 dark:text-stone-300">
                      {quizQuestions[quizIndex].explanationArm}
                    </div>
                  </div>
                )}

                {/* Bottom Action buttons */}
                <div className="flex items-center justify-end gap-3 pt-2">
                  {!quizAnswerSubmitted ? (
                    <button
                      disabled={!quizSelectedOption}
                      onClick={handleCheckQuizAnswer}
                      className="px-5 py-2.5 rounded-xl font-bold bg-amber-500 hover:bg-amber-600 disabled:opacity-40 disabled:hover:bg-amber-500 text-stone-950 font-armenian transition-colors shadow-sm"
                    >
                      Ստուգել պատասխանը
                    </button>
                  ) : (
                    <button
                      onClick={handleNextQuizQuestion}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold bg-stone-900 dark:bg-stone-100 hover:bg-stone-800 dark:hover:bg-white text-white dark:text-stone-900 font-armenian transition-colors shadow-sm"
                    >
                      <span>{quizIndex + 1 < quizQuestions.length ? 'Հաջորդ հարցը' : 'Տեսնել արդյունքը'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-8 text-center shadow-sm space-y-4 max-w-lg mx-auto">
                <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-700 text-amber-600 mx-auto flex items-center justify-center">
                  <Award className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-stone-900 dark:text-stone-100 font-armenian">
                  Թեստն ավարտվեց:
                </h3>
                <p className="text-stone-600 dark:text-stone-400 font-armenian">
                  Ձեր արդյունքը՝
                </p>
                <div className="text-4xl font-extrabold text-amber-600 dark:text-amber-400">
                  {quizScore} / {quizQuestions.length}
                </div>
                <p className="text-sm font-armenian text-stone-500">
                  {quizScore >= 8
                    ? '🌟 Գերազանց իմացություն: Դուք հիանալի տիրապետում եք նախադասությունների հաղորդակցական տեսակներին:'
                    : quizScore >= 5
                    ? '👍 Լավ արդյունք: Խորհուրդ ենք տալիս կրկնել 6 հիմնական տեսակները և նորից փորձել:'
                    : '💡 Կարող եք ուսումնասիրել «6 Տեսակներ» բաժինը և կրկին անցնել թեստը:'}
                </p>
                <div className="pt-4 flex justify-center gap-3">
                  <button
                    onClick={handleRestartQuiz}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold bg-amber-500 hover:bg-amber-600 text-stone-950 font-armenian transition-colors shadow-sm"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Կրկնել թեստը</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('types')}
                    className="px-5 py-2.5 rounded-xl font-medium border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 hover:bg-stone-50 text-stone-800 dark:text-stone-200 font-armenian transition-colors"
                  >
                    Անցնել դասին
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 py-6 text-stone-500 text-xs">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            <span className="font-bold text-stone-700 dark:text-stone-300">
              Modalidades Oracionales / Նախադասությունների տեսակները
            </span>
            <span className="mx-2">·</span>
            <span className="font-armenian">Իսպաներենից հայերեն ուսուցողական ձեռնարկ</span>
          </div>
          <div className="font-armenian text-stone-400">
            Ամբողջական նյութ՝ ներառյալ տեքստը, աղյուսակը և 17 հարցերը
          </div>
        </div>
      </footer>
    </div>
  );
}
