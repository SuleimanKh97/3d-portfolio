// Minimal i18n layer: a single dictionary keyed by dot-path, with each leaf
// carrying both the ES and EN copy. Consumers read via `useLanguage().t()`
// which resolves the path for the active language. Keeping it flat and
// co-located (rather than adding a dependency like next-intl) keeps the
// project tiny and makes the strings easy to audit.
export type Lang = "ar" | "en";

export const LANGUAGES: Lang[] = ["ar", "en"];
export const DEFAULT_LANG: Lang = "en";

type Leaf = Record<Lang, string>;
type Node = Leaf | { [key: string]: Node };

function isLeaf(node: Node): node is Leaf {
  return typeof (node as Leaf).ar === "string";
}

export const DICT = {
  picker: {
    season: { ar: "الموسم", en: "Season" },
    language: { ar: "اللغة", en: "Language" },
  },
  seasons: {
    spring: { ar: "الربيع", en: "Spring" },
    summer: { ar: "الصيف", en: "Summer" },
    autumn: { ar: "الخريف", en: "Autumn" },
    winter: { ar: "الشتاء", en: "Winter" },
  },
  nav: {
    aria: { ar: "الأقسام", en: "Sections" },
    home: { ar: "الرئيسية", en: "Home" },
    stack: { ar: "التقنيات", en: "Stack" },
    experience: { ar: "الخبرات", en: "Experience" },
    project: { ar: "المشاريع", en: "Project" },
    contact: { ar: "التواصل", en: "Contact" },
  },
  header: {
    availability: {
      ar: "متاح للفرص والعمل",
      en: "Open to opportunities",
    },
  },
  hero: {
    greeting: { ar: "أهلاً، أنا", en: "Hi, I am" },
    roleLine: {
      ar: "مطور ويب Full Stack ومهندس IoT.",
      en: "Full Stack Web Developer & IoT Engineer.",
    },
    tagline: {
      ar: "متخصص في بناء المنصات السحابية، معالجة بيانات IoT، وتطوير الأنظمة المتكاملة.",
      en: "Building scalable web platforms, IoT data pipelines, and responsive full-stack applications.",
    },
    cv: { ar: "تحميل السيرة الذاتية", en: "Download CV" },
    hire: { ar: "تواصل معي", en: "Contact me" },
    scroll: { ar: "تمرير للاستكشاف", en: "Scroll to explore" },
    keysHint: {
      ar: "· مرر على المفاتيح",
      en: "· hover over the keys",
    },
  },
  stack: {
    title: { ar: "التقنيات والمهارات", en: "Tech Stack" },
    hint: {
      ar: "(توجيه: مرر مؤشر الماوس فوق أي مفتاح)",
      en: "(hint: hover over a key)",
    },
    hintMobile: {
      ar: "الأدوات والتقنيات التي أستخدمها في التطوير.",
      en: "The tools I build with.",
    },
  },
  experience: {
    title: { ar: "الخبرات والشهادات", en: "Experience & Certifications" },
    subtitle: {
      ar: "مسيرتي المهنية والشهادات التخصصية.",
      en: "My professional journey & certifications.",
    },
    certsTitle: { ar: "الشهادات والدورات التخصصية", en: "Certifications & Specialised Training" },
  },
  projects: {
    kicker: { ar: "مشروع", en: "project" },
    viewMore: { ar: "عرض التفاصيل", en: "View more" },
    openSite: { ar: "زيارة الموقع", en: "Visit site" },
    viewCode: { ar: "عرض الكود", en: "View code" },
    close: { ar: "إغلاق", en: "Close" },
    stackLabel: { ar: "التقنيات المستعملة", en: "Stack" },
    overview: { ar: "ملخص المشروع", en: "Overview" },
  },
  contact: {
    kicker: { ar: "تواصل معي", en: "contact" },
    title: { ar: "هل نبدأ المحادثة؟", en: "Let's talk?" },
    body: {
      ar: "إذا كانت خبراتي ومشاريعي تناسب تطلعاتك، فالمجال مفتوح لبدء التعاون.",
      en: "If what you've seen interests you, the keyboard is ready for the first message.",
    },
    copyEmail: { ar: "نسخ البريد الإلكتروني", en: "Copy email" },
    openMail: { ar: "إرسال بريد إلكتروني", en: "Send Email" },
    github: { ar: "GitHub", en: "GitHub" },
    linkedin: { ar: "LinkedIn", en: "LinkedIn" },
    emailToast: { ar: "تم نسخ البريد الإلكتروني", en: "Email copied" },
    footer: {
      ar: "© 2026 سليمان الخشاشنة. جميع الحقوق محفوظة.",
      en: "© 2026 Suleiman Khashashneh. All rights reserved.",
    },
  },
  keyboard: {
    taglines: {
      javascript: {
        ar: "الأساس المتين لتطوير تطبيقات الويب التفاعلية.",
        en: "Core foundation of interactive web development.",
      },
      typescript: {
        ar: "JavaScript مدعومة بالأنماط البرمجية لنظام آمن وقابل للتوسع.",
        en: "Typed JavaScript for scalable and predictable codebases.",
      },
      html5: {
        ar: "الهيكل الدلالي لبناء interfaces مريحة وسهلة الوصول.",
        en: "Semantic building blocks for accessible UI.",
      },
      css: {
        ar: "تصميم تجاوبي، أنيميشن سلس، ودعم كامل للغات RTL.",
        en: "Responsive styling, smooth transitions, and native RTL support.",
      },
      bootstrap: {
        ar: "إطار عمل CSS سريع لبناء واجهات تجاوبية منسقة.",
        en: "CSS framework for rapid, responsive UI development.",
      },
      angular: {
        ar: "إطار عمل قوي في البيئات الإنتاجية لتطوير الأنظمة الضخمة.",
        en: "Production-proven framework for enterprise frontend applications.",
      },
      react: {
        ar: "مكتبة واجهات قائمة على المكونات لبناء تطبيقات ديناميكية.",
        en: "Component-based UI library for dynamic web platforms.",
      },
      dotnet: {
        ar: "C# و ASP.NET Core لبناء Web APIs ومعماريات MVC محكمة.",
        en: "C# & ASP.NET Core Web APIs and clean MVC architectures.",
      },
      python: {
        ar: "معالجة بيانات IoT، نماذج الذكاء الاصطناعي، واختبارات البرمجيات.",
        en: "IoT telemetry pipelines, AI/ML models, and unit testing suites.",
      },
      firebase: {
        ar: "مصادقة المستخدمين، قواعد بيانات لحظية، وخدمات سحابية.",
        en: "Realtime database, authentication, and cloud infrastructure.",
      },
      postgresql: {
        ar: "قاعدة بيانات علاقاتية قوية وموثوقة للأنظمة العالية الأداء.",
        en: "Powerful relational database for reliable backend storage.",
      },
      trello: {
        ar: "إدارة المشاريع وتنظيم دورات التطوير وفق منهجية Agile/Scrum.",
        en: "Project management and Agile sprint organization.",
      },
      docker: {
        ar: "حاويات برمجية لتضمين وتسهيل نشر التطبيقات في بيئات الإنتاج.",
        en: "Containerized application deployment across environments.",
      },
      git: {
        ar: "إدارة النسخ والتتبع البرمجي ومشاركة الكود بين الفرق.",
        en: "Version control and collaborative Git workflows.",
      },
      figma: {
        ar: "تصميم واجهات وتجربة المستخدم (UI/UX) ونماذج تفاعلية.",
        en: "UI/UX design, wireframing, and interactive user prototyping.",
      },
    },
  },
} as const satisfies Record<string, Node>;

// Resolve a dotted path in the dictionary for a given language.
export function translate(path: string, lang: Lang): string {
  const parts = path.split(".");
  let ref: Node = DICT as unknown as Node;
  for (const p of parts) {
    if (isLeaf(ref)) return path;
    ref = (ref as { [key: string]: Node })[p];
    if (ref === undefined) return path;
  }
  if (isLeaf(ref)) return ref[lang] ?? ref.ar ?? path;
  return path;
}
