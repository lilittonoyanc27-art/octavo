import { ModalidadType, TableItem, QAItem, ParagraphPair } from './types';

export const APP_HEADER = {
  esTitle: "2. MODALIDADES ORACIONALES",
  armTitle: "ՆԱԽԱԴԱՍՈՒԹՅՈՒՆՆԵՐԻ ՏԵՍԱԿՆԵՐԸ ԸՍՏ ՀԱՂՈՐԴԱԿՑԱԿԱՆ ՆՊԱՏԱԿԻ",
  subtitleEs: "Guía completa interactiva de español a armenio. Haz clic en cualquier frase o ejemplo para ver su traducción.",
  subtitleArm: "Իսպաներեն-հայերեն ամբողջական ինտերակտիվ ուղեցույց։ Սեղմեք ցանկացած իսպաներեն տեքստի վրա՝ հայերեն թարգմանությունը բացելու համար։"
};

export const FULL_TEXT_PARAGRAPHS: ParagraphPair[] = [
  {
    id: "p1",
    es: "Las modalidades oracionales son las diferentes formas que puede tener una oración según la intención del hablante.",
    arm: "Նախադասությունների հաղորդակցական տեսակները ցույց են տալիս, թե խոսողը ինչ նպատակ ունի տվյալ նախադասությունն ասելիս։"
  },
  {
    id: "p2",
    es: "Cuando hablamos, no siempre tenemos el mismo objetivo. A veces queremos informar, otras veces preguntar, dar una orden, expresar un deseo, mostrar duda o expresar una emoción.",
    arm: "Երբ խոսում ենք, միշտ նույն նպատակը չունենք։ Երբեմն ուզում ենք տեղեկություն հաղորդել, երբեմն հարց տալ, հրահանգ տալ, ցանկություն արտահայտել, կասկած հայտնել կամ զգացմունք ցույց տալ։"
  },
  {
    id: "p3",
    es: "Por eso existen diferentes modalidades oracionales.",
    arm: "Այդ պատճառով գոյություն ունեն նախադասությունների տարբեր հաղորդակցական տեսակներ։"
  },
  {
    id: "p4",
    es: "La modalidad enunciativa se utiliza para informar o afirmar algo. Puede ser afirmativa o negativa. Por ejemplo: “Hoy hace frío” o “No tengo clase”.",
    arm: "Պատմողական նախադասությունը օգտագործվում է տեղեկություն հաղորդելու կամ ինչ-որ բան հաստատելու համար։ Այն կարող է լինել հաստատական կամ ժխտական։ Օրինակ՝ «Այսօր ցուրտ է» կամ «Ես դաս չունեմ»։"
  },
  {
    id: "p5",
    es: "La modalidad interrogativa se utiliza para hacer preguntas. Por ejemplo: “¿Dónde vives?” o “¿Has terminado?”.",
    arm: "Հարցական նախադասությունը օգտագործվում է հարց տալու համար։ Օրինակ՝ «Որտե՞ղ ես ապրում» կամ «Ավարտե՞լ ես»։"
  },
  {
    id: "p6",
    es: "La modalidad exclamativa se utiliza para expresar emociones intensas, sorpresa, alegría, miedo o enfado. Por ejemplo: “¡Qué bonito!” o “¡Qué miedo!”.",
    arm: "Բացականչական նախադասությունը օգտագործվում է ուժեղ զգացմունքներ՝ զարմանք, ուրախություն, վախ կամ բարկություն արտահայտելու համար։ Օրինակ՝ «Ինչքա՜ն գեղեցիկ է»։"
  },
  {
    id: "p7",
    es: "La modalidad exhortativa o imperativa se utiliza para dar órdenes, consejos, instrucciones o hacer peticiones. Por ejemplo: “Abre el libro” o “Por favor, siéntate”.",
    arm: "Հրամայական կամ կոչական նախադասությունը օգտագործվում է հրաման, խորհուրդ, ցուցում տալու կամ խնդրանք կատարելու համար։ Օրինակ՝ «Բացի՛ր գիրքը» կամ «Խնդրում եմ, նստի՛ր»։"
  },
  {
    id: "p8",
    es: "La modalidad desiderativa se utiliza para expresar deseos. Por ejemplo: “Ojalá mañana haga buen tiempo”.",
    arm: "Ցանկական նախադասությունը օգտագործվում է ցանկություն արտահայտելու համար։ Օրինակ՝ «Երանի վաղը լավ եղանակ լինի»։"
  },
  {
    id: "p9",
    es: "La modalidad dubitativa se utiliza para expresar duda o posibilidad. Por ejemplo: “Quizá venga mañana”.",
    arm: "Կասկածական նախադասությունը օգտագործվում է կասկած կամ հավանականություն արտահայտելու համար։ Օրինակ՝ «Հնարավոր է՝ նա վաղը գա»։"
  },
  {
    id: "p10",
    es: "En resumen, las modalidades oracionales nos ayudan a identificar la intención del hablante en cada oración.",
    arm: "Ամփոփելով՝ նախադասությունների հաղորդակցական տեսակները օգնում են հասկանալ խոսողի նպատակը։"
  }
];

export const MODALIDADES_DATA: ModalidadType[] = [
  {
    id: "enunciativa",
    number: 1,
    esTitle: "Enunciativa",
    armTitle: "Պատմողական",
    esSummary: "Sirve para informar.",
    armSummary: "Օգտագործվում է տեղեկություն հաղորդելու համար։",
    badge: "1. Enunciativa",
    iconName: "FileText",
    colorScheme: {
      bg: "bg-blue-50 dark:bg-blue-950/40",
      border: "border-blue-200 dark:border-blue-800/60",
      text: "text-blue-900 dark:text-blue-200",
      accent: "text-blue-600 dark:text-blue-400",
      subtle: "bg-blue-100/70 dark:bg-blue-900/40"
    },
    subtypes: [
      { es: "afirmativa", arm: "հաստատական" },
      { es: "negativa", arm: "ժխտական" }
    ],
    examples: [
      {
        id: "enun-1",
        es: "Hoy es lunes.",
        arm: "Այսօր երկուշաբթի է։",
        context: "Afirmativa / Հաստատական"
      },
      {
        id: "enun-2",
        es: "No tengo hambre.",
        arm: "Ես սոված չեմ։",
        context: "Negativa / Ժխտական"
      }
    ]
  },
  {
    id: "interrogativa",
    number: 2,
    esTitle: "Interrogativa",
    armTitle: "Հարցական",
    esSummary: "Sirve para hacer preguntas.",
    armSummary: "Օգտագործվում է հարց տալու համար։",
    badge: "2. Interrogativa",
    iconName: "HelpCircle",
    colorScheme: {
      bg: "bg-emerald-50 dark:bg-emerald-950/40",
      border: "border-emerald-200 dark:border-emerald-800/60",
      text: "text-emerald-900 dark:text-emerald-200",
      accent: "text-emerald-600 dark:text-emerald-400",
      subtle: "bg-emerald-100/70 dark:bg-emerald-900/40"
    },
    examples: [
      {
        id: "interr-1",
        es: "¿Cómo te llamas?",
        arm: "Ինչպե՞ս ես կոչվում։"
      },
      {
        id: "interr-2",
        es: "¿Vienes mañana?",
        arm: "Վաղը գալո՞ւ ես։"
      }
    ]
  },
  {
    id: "exclamativa",
    number: 3,
    esTitle: "Exclamativa",
    armTitle: "Բացականչական",
    esSummary: "Sirve para expresar emociones intensas.",
    armSummary: "Օգտագործվում է ուժեղ զգացմունք արտահայտելու համար։",
    badge: "3. Exclamativa",
    iconName: "Flame",
    colorScheme: {
      bg: "bg-rose-50 dark:bg-rose-950/40",
      border: "border-rose-200 dark:border-rose-800/60",
      text: "text-rose-900 dark:text-rose-200",
      accent: "text-rose-600 dark:text-rose-400",
      subtle: "bg-rose-100/70 dark:bg-rose-900/40"
    },
    examples: [
      {
        id: "exclam-1",
        es: "¡Qué alegría!",
        arm: "Ի՜նչ ուրախություն։"
      },
      {
        id: "exclam-2",
        es: "¡Qué frío hace!",
        arm: "Ի՜նչ ցուրտ է։"
      }
    ]
  },
  {
    id: "exhortativa",
    number: 4,
    esTitle: "Exhortativa o imperativa",
    armTitle: "Հրամայական / կոչական",
    esSummary: "Sirve para dar órdenes, instrucciones, consejos o peticiones.",
    armSummary: "Օգտագործվում է հրաման, ցուցում, խորհուրդ կամ խնդրանք տալու համար։",
    badge: "4. Exhortativa / Imperativa",
    iconName: "Send",
    colorScheme: {
      bg: "bg-amber-50 dark:bg-amber-950/40",
      border: "border-amber-200 dark:border-amber-800/60",
      text: "text-amber-900 dark:text-amber-200",
      accent: "text-amber-600 dark:text-amber-400",
      subtle: "bg-amber-100/70 dark:bg-amber-900/40"
    },
    examples: [
      {
        id: "exhort-1",
        es: "Cierra la puerta.",
        arm: "Փակի՛ր դուռը։"
      },
      {
        id: "exhort-2",
        es: "Escucha con atención.",
        arm: "Ուշադիր լսի՛ր։"
      },
      {
        id: "exhort-3",
        es: "Por favor, ayúdame.",
        arm: "Խնդրում եմ, օգնի՛ր ինձ։"
      }
    ]
  },
  {
    id: "desiderativa",
    number: 5,
    esTitle: "Desiderativa",
    armTitle: "Ցանկական",
    esSummary: "Sirve para expresar deseos.",
    armSummary: "Օգտագործվում է ցանկություն արտահայտելու համար։",
    badge: "5. Desiderativa",
    iconName: "Sparkles",
    colorScheme: {
      bg: "bg-purple-50 dark:bg-purple-950/40",
      border: "border-purple-200 dark:border-purple-800/60",
      text: "text-purple-900 dark:text-purple-200",
      accent: "text-purple-600 dark:text-purple-400",
      subtle: "bg-purple-100/70 dark:bg-purple-900/40"
    },
    frequentWords: [
      { es: "ojalá", arm: "երանի" }
    ],
    examples: [
      {
        id: "desid-1",
        es: "Ojalá apruebe.",
        arm: "Երանի հանձնեմ։"
      }
    ]
  },
  {
    id: "dubitativa",
    number: 6,
    esTitle: "Dubitativa",
    armTitle: "Կասկածական",
    esSummary: "Sirve para expresar duda o posibilidad.",
    armSummary: "Օգտագործվում է կասկած կամ հավանականություն արտահայտելու համար։",
    badge: "6. Dubitativa",
    iconName: "HelpCircle",
    colorScheme: {
      bg: "bg-teal-50 dark:bg-teal-950/40",
      border: "border-teal-200 dark:border-teal-800/60",
      text: "text-teal-900 dark:text-teal-200",
      accent: "text-teal-600 dark:text-teal-400",
      subtle: "bg-teal-100/70 dark:bg-teal-900/40"
    },
    frequentWords: [
      { es: "quizá / quizás", arm: "գուցե / հնարավոր է" },
      { es: "tal vez", arm: "միգուցե" }
    ],
    examples: [
      {
        id: "dubit-1",
        es: "Quizá llueva esta tarde.",
        arm: "Գուցե այսօր կեսօրից հետո անձրև գա։"
      }
    ]
  }
];

export const MEMORY_TABLE_DATA: TableItem[] = [
  {
    id: "enunciativa",
    modalidad: "Enunciativa",
    armModalidad: "Պատմողական",
    funcion: "Informar",
    armFuncion: "Տեղեկություն հաղորդել",
    icon: "FileText"
  },
  {
    id: "interrogativa",
    modalidad: "Interrogativa",
    armModalidad: "Հարցական",
    funcion: "Preguntar",
    armFuncion: "Հարց տալ",
    icon: "HelpCircle"
  },
  {
    id: "exclamativa",
    modalidad: "Exclamativa",
    armModalidad: "Բացականչական",
    funcion: "Expresar emoción",
    armFuncion: "Զգացմունք արտահայտել",
    icon: "Flame"
  },
  {
    id: "exhortativa",
    modalidad: "Exhortativa",
    armModalidad: "Հրամայական",
    funcion: "Ordenar o pedir",
    armFuncion: "Հրամայել կամ խնդրել",
    icon: "Send"
  },
  {
    id: "desiderativa",
    modalidad: "Desiderativa",
    armModalidad: "Ցանկական",
    funcion: "Expresar deseo",
    armFuncion: "Ցանկություն արտահայտել",
    icon: "Sparkles"
  },
  {
    id: "dubitativa",
    modalidad: "Dubitativa",
    armModalidad: "Կասկածական",
    funcion: "Expresar duda",
    armFuncion: "Կասկած արտահայտել",
    icon: "HelpCircle"
  }
];

export const QUESTIONS_AND_ANSWERS: QAItem[] = [
  {
    id: 1,
    esQuestion: "¿Qué son las modalidades oracionales?",
    armQuestion: "Ի՞նչ են նախադասությունների հաղորդակցական տեսակները։",
    esAnswer: "Son las diferentes formas de las oraciones según la intención del hablante.",
    armAnswer: "Դրանք նախադասությունների տարբեր տեսակներն են՝ ըստ խոսողի նպատակի։",
    category: "Definición / Սահմանում"
  },
  {
    id: 2,
    esQuestion: "¿Cuántas modalidades principales hay?",
    armQuestion: "Քանի՞ հիմնական տեսակ կա։",
    esAnswer: "Seis.",
    armAnswer: "Վեց։",
    category: "Clasificación / Դասակարգում"
  },
  {
    id: 3,
    esQuestion: "¿Cuáles son?",
    armQuestion: "Որո՞նք են դրանք։",
    esAnswer: "Enunciativa, interrogativa, exclamativa, exhortativa, desiderativa y dubitativa.",
    armAnswer: "Պատմողական, հարցական, բացականչական, հրամայական, ցանկական և կասկածական։",
    category: "Clasificación / Դասակարգում"
  },
  {
    id: 4,
    esQuestion: "¿Para qué sirve una oración enunciativa?",
    armQuestion: "Ինչի՞ համար է պատմողական նախադասությունը։",
    esAnswer: "Para informar o afirmar algo.",
    armAnswer: "Տեղեկություն հաղորդելու կամ ինչ-որ բան հաստատելու համար։",
    category: "Enunciativa / Պատմողական"
  },
  {
    id: 5,
    esQuestion: "¿Qué tipo de oración es “Hoy hace calor”?",
    armQuestion: "«Այսօր շոգ է» նախադասությունը ո՞ր տեսակին է պատկանում։",
    esAnswer: "Enunciativa.",
    armAnswer: "Պատմողական։",
    category: "Ejemplo / Օրինակ"
  },
  {
    id: 6,
    esQuestion: "¿Para qué sirve una oración interrogativa?",
    armQuestion: "Ինչի՞ համար է հարցական նախադասությունը։",
    esAnswer: "Para hacer preguntas.",
    armAnswer: "Հարց տալու համար։",
    category: "Interrogativa / Հարցական"
  },
  {
    id: 7,
    esQuestion: "¿Qué tipo de oración es “¿Dónde vives?”?",
    armQuestion: "«Որտե՞ղ ես ապրում» նախադասությունը ո՞ր տեսակին է պատկանում։",
    esAnswer: "Interrogativa.",
    armAnswer: "Հարցական։",
    category: "Ejemplo / Օրինակ"
  },
  {
    id: 8,
    esQuestion: "¿Para qué sirve una oración exclamativa?",
    armQuestion: "Ինչի՞ համար է բացականչական նախադասությունը։",
    esAnswer: "Para expresar emociones intensas.",
    armAnswer: "Ուժեղ զգացմունքներ արտահայտելու համար։",
    category: "Exclamativa / Բացականչական"
  },
  {
    id: 9,
    esQuestion: "¿Qué tipo de oración es “¡Qué bonito!”?",
    armQuestion: "«Ինչքա՜ն գեղեցիկ է» նախադասությունը ո՞ր տեսակին է պատկանում։",
    esAnswer: "Exclamativa.",
    armAnswer: "Բացականչական։",
    category: "Ejemplo / Օրինակ"
  },
  {
    id: 10,
    esQuestion: "¿Para qué sirve una oración exhortativa?",
    armQuestion: "Ինչի՞ համար է հրամայական նախադասությունը։",
    esAnswer: "Para dar órdenes, consejos, instrucciones o peticiones.",
    armAnswer: "Հրաման, խորհուրդ, ցուցում կամ խնդրանք տալու համար։",
    category: "Exhortativa / Հրամայական"
  },
  {
    id: 11,
    esQuestion: "¿Qué tipo de oración es “Abre el libro”?",
    armQuestion: "«Բացի՛ր գիրքը» նախադասությունը ո՞ր տեսակին է պատկանում։",
    esAnswer: "Exhortativa o imperativa.",
    armAnswer: "Հրամայական։",
    category: "Ejemplo / Օրինակ"
  },
  {
    id: 12,
    esQuestion: "¿Para qué sirve una oración desiderativa?",
    armQuestion: "Ինչի՞ համար է ցանկական նախադասությունը։",
    esAnswer: "Para expresar deseos.",
    armAnswer: "Ցանկություն արտահայտելու համար։",
    category: "Desiderativa / Ցանկական"
  },
  {
    id: 13,
    esQuestion: "¿Qué palabra aparece frecuentemente en las desiderativas?",
    armQuestion: "Ո՞ր բառն է հաճախ օգտագործվում ցանկական նախադասություններում։",
    esAnswer: "Ojalá.",
    armAnswer: "Երանի։",
    category: "Desiderativa / Ցանկական"
  },
  {
    id: 14,
    esQuestion: "¿Qué tipo de oración es “Ojalá apruebe”?",
    armQuestion: "«Երանի հանձնեմ» նախադասությունը ո՞ր տեսակին է պատկանում։",
    esAnswer: "Desiderativa.",
    armAnswer: "Ցանկական։",
    category: "Ejemplo / Օրինակ"
  },
  {
    id: 15,
    esQuestion: "¿Para qué sirve una oración dubitativa?",
    armQuestion: "Ինչի՞ համար է կասկածական նախադասությունը։",
    esAnswer: "Para expresar duda o posibilidad.",
    armAnswer: "Կասկած կամ հավանականություն արտահայտելու համար։",
    category: "Dubitativa / Կասկածական"
  },
  {
    id: 16,
    esQuestion: "¿Qué palabras pueden aparecer en las dubitativas?",
    armQuestion: "Ի՞նչ բառեր կարող են օգտագործվել կասկածական նախադասություններում։",
    esAnswer: "Quizá, quizás o tal vez.",
    armAnswer: "Գուցե, միգուցե կամ հնարավոր է։",
    category: "Dubitativa / Կասկածական"
  },
  {
    id: 17,
    esQuestion: "¿Qué tipo de oración es “Quizá venga mañana”?",
    armQuestion: "«Գուցե նա վաղը գա» նախադասությունը ո՞ր տեսակին է պատկանում։",
    esAnswer: "Dubitativa.",
    armAnswer: "Կասկածական։",
    category: "Ejemplo / Օրինակ"
  }
];

export const SHORT_TEXT = {
  sectionTitleEs: "Texto corto",
  sectionTitleArm: "Կարճ տեքստ",
  introEs: "Las modalidades oracionales indican la intención del hablante.",
  introArm: "Նախադասությունների հաղորդակցական տեսակները ցույց են տալիս խոսողի նպատակը։",
  bodyEs: "Hay seis tipos principales: enunciativa, para informar; interrogativa, para preguntar; exclamativa, para expresar emociones; exhortativa, para dar órdenes o hacer peticiones; desiderativa, para expresar deseos; y dubitativa, para expresar duda o posibilidad.",
  bodyArm: "Կան վեց հիմնական տեսակներ՝ պատմողական՝ տեղեկություն հաղորդելու համար, հարցական՝ հարց տալու, բացականչական՝ զգացմունք արտահայտելու, հրամայական՝ հրաման կամ խնդրանք տալու, ցանկական՝ ցանկություն արտահայտելու և կասկածական՝ կասկած կամ հավանականություն արտահայտելու համար։"
};
