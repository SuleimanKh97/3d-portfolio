"use client";

import { useState } from "react";
import FrozenKeyboard from "@/components/FrozenKeyboard";
import SmoothScroll from "@/components/smooth-scroll";
import Reveal from "@/components/Reveal";
import SectionNav from "@/components/SectionNav";
import CopyEmail from "@/components/CopyEmail";
import SeasonPicker from "@/components/SeasonPicker";
import LanguagePicker from "@/components/LanguagePicker";
import ProjectModal, {
  type ProjectDetail,
} from "@/components/ProjectModal";
import { useLanguage } from "@/components/LanguageProvider";
import { useIsMobile } from "@/lib/useIsMobile";
import { SKILLS_FLAT } from "@/lib/skills";
import type { Lang } from "@/lib/i18n";

const EMAIL = "suleiman97kh@gmail.com";

// Localised content lives in `{ ar, en }` objects inside these arrays so the
// page can be a straightforward array.map() at render time. Tech names stay
// as plain strings (they're brand names, not localised).
type Localised = { ar: string; en: string };

type Project = ProjectDetail & {
  align: "left" | "right";
  section: "project1" | "project2" | "project3" | "project4";
};

const projects: Project[] = [
  {
    num: "01",
    name: {
      ar: "سوق حلال — منصة تجارة المواشي الإلكترونية",
      en: "Halal Souq — Livestock E-Commerce Platform",
    },
    stack: [
      "Angular",
      "ASP.NET Core Web API",
      "SQL Server",
      "C#",
      "TypeScript",
      "JWT",
      "RESTful API",
    ],
    desc: {
      ar: "منصة تجارة مواشي متكاملة مع لوحات تحكم مخصصة حسب الأدوار (مشتري، بائع، أدمن) محمية بنظام JWT وسلسلة مزادات وخرائط تفاعلية.",
      en: "Full-stack livestock marketplace with JWT-secured, role-based dashboards (Buyer, Seller, Admin), live auctions, and interactive maps.",
    },
    details: {
      ar: "منصة متكاملة لتجارة المواشي تم تصميمها وتطويرها بشكل فردي بالكامل. تتضمن مزادات حية، إدارة الطلبات، المراسلة الداخلية، عربة التسوق، وخرائط تفاعلية. بنيت باستخدام المعمارية النظيفة Clean Architecture (DTOs, Route Guards, Dependency Injection)، مع واجهة برمجة تطبيقات RESTful في ASP.NET Core، وقاعدة بيانات SQL Server، وواجهة مستخدم تفاعلية باستخدام Angular.",
      en: "A full-stack livestock marketplace designed and built solo end-to-end. Features live auctions, order management, internal messaging, shopping cart, and interactive map views. Built with clean architecture (DTOs, route guards, dependency injection), robust Web API design in ASP.NET Core Web API, SQL Server database layer, and responsive Angular frontend across all role dashboards.",
    },
    github: "https://github.com/SuleimanKh97",
    highlights: ["angular", "dotnet", "postgresql", "typescript"],
    align: "left",
    section: "project1",
  },
  {
    num: "02",
    name: {
      ar: "المعتصم — منصة تعليمية عربية",
      en: "Al-Mutassim — Arabic Educational Platform",
    },
    stack: [
      "React",
      "JavaScript",
      "HTML5",
      "CSS3",
      "RTL Layout",
      "Arabic Typography",
    ],
    desc: {
      ar: "منصة تعليمية تعمل مباشرة في الإنتاج لتقديم الدورات التدريبية والدروس المرئية والاختبارات والمقالات مع دعم كامل للاتجاه RTL.",
      en: "Educational platform live in production offering online courses, video lessons, quizzes, and articles built with native RTL.",
    },
    details: {
      ar: "منصة تعليمية تم إعادتها بالكامل باستخدام React ونشرها على النطاق المباشر (al-mutassim.com). تم تصميم الواجهة بدعم اتجاه محاذي لليمين على مستوى جذر المستند (`dir=\"rtl\"`)، وتضمين خطوط عربية تناسب القراءة (Amiri, Tajawal, Aref Ruqaa) وتوحيد المصطلحات التعليمية.",
      en: "An educational platform for courses, video lessons, quizzes, and articles. Recreated from scratch in React and currently live in production (al-mutassim.com). Designed with native RTL layout (`dir=\"rtl\"`), custom Arabic typography (Amiri, Tajawal, Aref Ruqaa) for legibility, and unified terminology.",
    },
    url: "https://al-mutassim.com",
    highlights: ["react", "javascript", "html5", "css"],
    badge: { ar: "مباشر في الإنتاج", en: "Live in Production" },
    align: "right",
    section: "project2",
  },
  {
    num: "03",
    name: {
      ar: "نظام إدارة الموارد البشرية (HR)",
      en: "HR Management System",
    },
    stack: [
      "C#",
      "ASP.NET Core MVC",
      "SQL Server",
      "Bootstrap",
      "JavaScript",
      "Agile",
    ],
    desc: {
      ar: "نظام متكامل للموظفين والمدراء وقسم الموارد البشرية لمتابعة المهام، الحضور والغياب، والإجازات، وتوليد تقارير PDF.",
      en: "Enterprise HR platform for employees, managers, and HR teams featuring task tracking, attendance logging, and PDF reports.",
    },
    details: {
      ar: "تم تطوير المشروع ضمن فريق مكون من 6 أفراد باتباع منهجية Agile. يقدم لوحات تحكم مخصصة للموظفين والمدراء وقسم الموارد البشرية: متابعة المهام، تسجيل الحضور، طلبات الإجازات، استخراج تقارير PDF، البحث الصوتي، تشفير كلمة المرور والإشعارات عبر البريد.",
      en: "Built by a 6-person team following Agile principles. Includes custom dashboards for employees, managers, and HR: task assignments, attendance logging, leave request approval, automated PDF reports, voice search, password encryption, and email notifications.",
    },
    github: "https://github.com/SuleimanKh97",
    highlights: ["dotnet", "bootstrap", "javascript"],
    align: "left",
    section: "project3",
  },
  {
    num: "04",
    name: {
      ar: "منصة المكتبة واشتراكات الكتب (UI/UX)",
      en: "Bookstore & Library Subscription Platform (UI/UX)",
    },
    stack: [
      "Figma",
      "UI/UX Design",
      "Wireframing",
      "Prototyping",
      "User Testing",
    ],
    desc: {
      ar: "تصميم واجهات وتجربة المستخدم ونماذج تفاعلية كاملة على Figma لمتجر كتب واشتراكات مكتبية.",
      en: "Comprehensive UI/UX design and interactive Figma prototypes for a bookstore and library subscription platform.",
    },
    details: {
      ar: "مشروع تصميم UI/UX شامل في Figma لمتجر كتب ونظام اشتراكات مكتبية. شمل إنشاء نماذج أولية تفاعلية لتصفح الكتالوج، عملية الاشتراك، ودفع المشتريات. تم التطوير عبر جولات متعددة من الملاحظات لتحسين التباين، حجم الخطوط، وتسلسل أزرار الإجراءات.",
      en: "End-to-end UI/UX design created in Figma with interactive wireframes and mockups for catalog browsing, subscription plans, and checkout. Iterated through structured user feedback cycles to enhance contrast, button hierarchy, and conversion layout.",
    },
    highlights: ["figma"],
    badge: { ar: "نموذج Figma تفاعلي", en: "Figma Prototype" },
    align: "right",
    section: "project4",
  },
];

const experiences: Array<{
  role: Localised;
  company: string;
  period: Localised;
  location: Localised;
  summary: Localised;
  bullets: Localised[];
  stack: string[];
}> = [
  {
    role: {
      ar: "مطور ويب ومهندس IoT",
      en: "Web Developer & IoT Engineer",
    },
    company: "Smart Cloud",
    period: { ar: "أيار 2026 — الحالي", en: "May 2026 — Present" },
    location: { ar: "الأردن", en: "Jordan" },
    summary: {
      ar: "بناء وتطوير مسارات معالجة البيانات اللحظية المعتمدة على Event-Driven Architectures لتحليل قراءات الأجهزة عالية التردد. تصميم منطق التحويلات والحقول المحسوبة، وإنشاء عناصر تحكم وقياس سريعة الاستجابة مع دمج نماذج الذكاء الاصطناعي بلغة Python.",
      en: "Engineered scalable real-time data ingestion and processing pipelines using event-driven architectures for high-frequency telemetry. Designed data transformation logic, built low-latency visualization widgets, and integrated Python AI/ML models into backend pipelines.",
    },
    bullets: [
      {
        ar: "مسارات معالجة واستقبال بيانات أجهزة IoT عالية التردد في الوقت الفعلي.",
        en: "Real-time telemetry data ingestion and event-driven processing pipelines.",
      },
      {
        ar: "منطق تحويل البيانات الفوري وإنشاء الحقول المحسوبة المخصصة.",
        en: "On-the-fly data transformation logic and custom calculated fields.",
      },
      {
        ar: "عناصر عرض ولوحات تحليلات عالية الأداء وسريعة الاستجابة.",
        en: "Low-latency data-visualization widgets and analytics dashboards.",
      },
      {
        ar: "اختبارات برمجية شاملة بلغة Python ودمج نماذج التعلم الآلي للتنبؤ.",
        en: "Python unit-testing suites and integrated AI/ML predictive analytics models.",
      },
    ],
    stack: [
      "Python",
      "IoT Telemetry",
      "Event-Driven Pipelines",
      "AI/ML",
      "Dashboards",
      "PostgreSQL",
    ],
  },
  {
    role: {
      ar: "متدرب تطوير ويب Full Stack",
      en: "Full Stack Web Development Intern",
    },
    company: "Hikayatajloun (Orange Coding Academy)",
    period: { ar: "أيار 2025 — حزيران 2025", en: "May 2025 — June 2025" },
    location: { ar: "الأردن", en: "Jordan" },
    summary: {
      ar: "فترة تدريب في تطوير حلول ويب مجتمعية باستخدام HTML, CSS, JavaScript, و ASP.NET Core. التعاون مع فرق متعددة التخصصات وتطبيق منهجيات Agile ومراجعات الكود.",
      en: "Built community-centered web solutions using HTML, CSS, JavaScript, and ASP.NET Core. Collaborated with cross-functional teams using Agile methodologies, Git, Trello, pair programming, and code reviews.",
    },
    bullets: [
      {
        ar: "تطوير ميزات كاملة للموقع باستخدام ASP.NET Core و JavaScript.",
        en: "Developed full-stack features using ASP.NET Core MVC and JavaScript.",
      },
      {
        ar: "تطبيق منهجيات Agile، البرمجة الثنائية اليومية ومراجعة الكود.",
        en: "Applied Agile methodologies, daily pair programming, and code reviews.",
      },
    ],
    stack: ["ASP.NET Core", "C#", "JavaScript", "HTML/CSS", "Git", "Agile"],
  },
  {
    role: {
      ar: "متدرب تطوير الويب الشامل Full Stack",
      en: "Full Stack Web Development Trainee",
    },
    company: "Orange Coding Academy (Simplon.co & PSUT)",
    period: { ar: "كانون الأول 2024 — أيار 2025", en: "Dec 2024 — May 2025" },
    location: { ar: "إربد، الأردن", en: "Irbid, Jordan" },
    summary: {
      ar: "معسكر تدريبي مكثف في تطوير الويب بالتعاون مع Simplon.co وجامعة الأميرة سمية للتكنولوجيا. تطوير 7 مشاريع ويب كاملة والقيام بدور Scrum Master و Product Owner.",
      en: "Intensive 6-month full-stack development bootcamp in collaboration with Simplon.co and PSUT. Developed 7 full-stack web applications and served as Scrum Master and Product Owner across projects.",
    },
    bullets: [
      {
        ar: "بناء واجهات تجاوبية وخدمات خلفية آمنة باستخدام ASP.NET Core و SQL Server.",
        en: "Responsive frontends and secure backend APIs with ASP.NET Core & SQL Server.",
      },
      {
        ar: "قيادة الفرق بدور Scrum Master و Product Owner وتنظيم فترات الـ Sprints.",
        en: "Served as Scrum Master and Product Owner facilitating requirement gathering and sprint ceremonies.",
      },
    ],
    stack: [
      "Angular",
      "ASP.NET Core",
      "SQL Server",
      "C#",
      "Bootstrap",
      "Scrum Master",
    ],
  },
  {
    role: {
      ar: "مستشار كفاءة الطاقة",
      en: "Energy Efficiency Consultant",
    },
    company: "UNDP",
    period: { ar: "أيلول 2023 — شباط 2024", en: "Sep 2023 — Feb 2024" },
    location: { ar: "الأردن", en: "Jordan" },
    summary: {
      ar: "تقديم الاستشارات ودمج تقنيات كفاءة الطاقة في مشاريع الهندسة الكهربائية وإجراء التقييمات الفنية الميدانية.",
      en: "Advised on and integrated energy-efficiency technologies across electrical engineering projects and conducted technical compliance assessments.",
    },
    bullets: [
      {
        ar: "تقييمات ميدانية لضمان المطابقة مع الكودات الوطنية للكهرباء والطاقة.",
        en: "On-site assessments to ensure compliance with national engineering codes.",
      },
    ],
    stack: [
      "Energy Efficiency",
      "Electrical Engineering",
      "Technical Advisory",
    ],
  },
  {
    role: {
      ar: "مهندس كهرباء",
      en: "Electrical Engineer",
    },
    company: "Ministry of Local Administration",
    period: { ar: "نيسان 2022 — آذار 2024", en: "Apr 2022 — Mar 2024" },
    location: { ar: "الأردن", en: "Jordan" },
    summary: {
      ar: "الإشراف على التزام المجالس المحلية بالأنظمة وتنسيق عمل الفرق لرفع كفاءة العمليات الإدارية والتشغيلية.",
      en: "Supervised regulatory compliance for local councils and coordinated cross-department teams to improve administrative and operational efficiency.",
    },
    bullets: [
      {
        ar: "الإشراف التنظيمي وتنسيق الفرق المتعددة لرفع الكفاءة التشغيلية.",
        en: "Supervised regulatory compliance and coordinated cross-department teams for operational efficiency.",
      },
    ],
    stack: [
      "Electrical Engineering",
      "Regulatory Compliance",
      "Project Management",
    ],
  },
];

const certifications: Array<{
  title: Localised;
  issuer: Localised;
  year?: string;
  badge?: Localised;
}> = [
  {
    title: {
      ar: "برنامج الجاهزية والمهارات في الأمن السيبراني",
      en: "Cybersecurity Skills Readiness Program",
    },
    issuer: {
      ar: "شركة الدائرة الخضراء للحلول البرمجية بالتعاون مع وزارة الشباب وداتاسبيس",
      en: "Green Circle for Software Solutions in partnership with Ministry of Youth & Dataspace",
    },
    year: "2026",
    badge: { ar: "الأمن السيبراني", en: "Cybersecurity" },
  },
  {
    title: {
      ar: "تدريب بناء القدرات لحصر غازات الدفيئة (GHGs Inventory)",
      en: "Capacity-Building Training for Greenhouse Gases (GHGs) Inventory",
    },
    issuer: {
      ar: "برنامج التدريب والتطوير البيئي والهندسي",
      en: "Greenhouse Gases Technical Capacity-Building Initiative",
    },
    badge: { ar: "استدامة وبيئة", en: "Sustainability" },
  },
  {
    title: {
      ar: "التخطيط الحضري وحوكمة استخدام الأراضي ونظام تقييم المباني الخضراء",
      en: "Urban Planning, Land Use Governance, and Green Building Rating System Training",
    },
    issuer: {
      ar: "برنامج تدريب الحوكمة والمباني الخضراء",
      en: "Urban Governance & Green Building Rating System Certification",
    },
    badge: { ar: "مباني خضراء", en: "Green Building" },
  },
];

function pick<T>(loc: { ar: T; en: T }, lang: Lang): T {
  return loc[lang] ?? loc.ar;
}

// Hero name split per word so each can rise independently. Whitespace
// preserved as its own span so the line wraps naturally if needed.
function HeroWord({
  text,
  delay,
  className = "",
}: {
  text: string;
  delay: number;
  className?: string;
}) {
  return (
    <span className={`hero-word ${className}`}>
      <span style={{ animationDelay: `${delay}ms` }}>{text}</span>
    </span>
  );
}

export default function Home() {
  const { t, lang } = useLanguage();
  const isMobile = useIsMobile();
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <SmoothScroll>
      <div className="relative">
        {/* Desktop: persistent 3D scene fullscreen behind content. On mobile
            the canvas lives inside the hero instead (see below) so it scrolls
            away and the rest of the page is clean, fast 2D. */}
        {!isMobile && (
          <div className="fixed inset-0 z-0">
            <FrozenKeyboard />
          </div>
        )}

        {/* Header */}
        <header className="fixed top-0 inset-x-0 z-50 px-6 sm:px-10 md:px-14 py-5 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-3 pointer-events-auto">
            <span
              data-cursor="hover"
              className="text-sm font-semibold tracking-tight text-ice-100 whitespace-nowrap"
            >
              Suleiman Khashashneh
            </span>
            {/* Wrapper (not the pill itself) carries the hide: .status-pill
                hard-sets display:inline-flex, which beats Tailwind's .hidden
                due to CSS source order, so hiding must happen on a parent. */}
            <span className="hidden md:inline-flex">
              <span className="status-pill">{t("header.availability")}</span>
            </span>
          </div>
          <div className="flex items-center gap-2 pointer-events-auto">
            <SeasonPicker />
            <span className="hidden md:inline-flex">
            <a
              href="https://github.com/SuleimanKh97/"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="frost-btn !py-1.5 !px-3 !text-xs"
            >
              <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor" aria-hidden>
                <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 005.47 7.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
              <span>GitHub</span>
            </a>
            </span>
            <LanguagePicker />
          </div>
        </header>

        <SectionNav />

        <main className="relative z-10 pointer-events-none">
          {/* Hero */}
          <section
            data-kb-section="hero"
            className="min-h-screen flex flex-col justify-center p-6 sm:p-10 md:p-14"
          >
            {/* Mobile-only 3D centerpiece. Lives inside the hero (scrolls away
                with it) and takes pointer events so keycaps are tappable. */}
            {isMobile && (
              <div className="w-full h-[34vh] mt-12 -mb-4 pointer-events-auto">
                <FrozenKeyboard mobile />
              </div>
            )}
            <div className="mt-2 md:mt-20">
              <p
                className="text-[11px] uppercase tracking-[0.3em] text-ice-300 mb-5 fade-in-up"
                style={{ ["--d" as string]: "0ms" }}
              >
                {t("hero.greeting")}
              </p>
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[8.5rem] font-bold tracking-[-0.03em] text-ice-50 leading-[0.92] whitespace-nowrap">
                <HeroWord text="Suleiman" delay={120} />
                <br />
                <HeroWord text="Khashashneh" delay={260} className="text-ice-400 text-5xl sm:text-7xl md:text-8xl lg:text-[7rem]" />
              </h1>
              <p
                className="mt-8 text-base sm:text-lg md:text-xl text-ice-200 max-w-xl leading-relaxed fade-in-up"
                style={{ ["--d" as string]: "520ms" }}
              >
                {t("hero.roleLine")}
                <br />
                {t("hero.tagline")}
              </p>

              {/* CTAs */}
              <div
                className="mt-10 flex flex-wrap items-center gap-3 pointer-events-auto fade-in-up"
                style={{ ["--d" as string]: "700ms" }}
              >
                <a
                  href={`mailto:${EMAIL}`}
                  data-cursor="hover"
                  data-magnetic
                  className="frost-btn frost-btn--primary"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8z" />
                    <path d="M14 3v5h5" />
                  </svg>
                  {t("hero.cv")}
                </a>
                <button
                  type="button"
                  data-cursor="hover"
                  data-magnetic
                  className="frost-btn"
                  onClick={() =>
                    document
                      .querySelector<HTMLElement>(
                        '[data-kb-section="contact"]'
                      )
                      ?.scrollIntoView({ behavior: "smooth", block: "start" })
                  }
                >
                  {t("hero.hire")}
                </button>
                {/* Mobile-only full-width break: forces the social icons onto
                    their own row below the two primary buttons. Hidden on md+
                    so desktop keeps everything on a single line. */}
                <div className="basis-full h-0 md:hidden" aria-hidden />
                <a
                  href="https://www.linkedin.com/in/suleimankhashashneh/"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  data-magnetic
                  className="frost-icon"
                  aria-label="LinkedIn"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden>
                    <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8h4.56v14H.22V8zm7.4 0h4.37v1.92h.06c.61-1.15 2.1-2.36 4.32-2.36 4.62 0 5.47 3.04 5.47 6.99V22h-4.56v-6.59c0-1.57-.03-3.6-2.19-3.6-2.19 0-2.53 1.71-2.53 3.48V22H7.62V8z" />
                  </svg>
                </a>
                <a
                  href="https://github.com/SuleimanKh97/"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  data-magnetic
                  className="frost-icon"
                  aria-label="GitHub"
                >
                  <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden>
                    <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 005.47 7.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Animated scroll indicator at bottom */}
            <div
              className="mt-10 md:mt-auto flex items-center gap-3 fade-in-up"
              style={{ ["--d" as string]: "900ms" }}
            >
              <span className="scroll-indicator">
                <span>{t("hero.scroll")}</span>
                <span className="scroll-indicator__rail" />
              </span>
              <span className="text-[11px] uppercase tracking-[0.25em] text-ice-400 hidden sm:inline">
                {t("hero.keysHint")}
              </span>
            </div>
          </section>

          {/* Stack — desktop relies on the 200vh scroll + sticky title while
              the keyboard does the talking on hover. On mobile (md:) that
              choreography is gone, so we drop the tall scroll and render a
              real, legible skills grid with the same taglines. */}
          <section
            data-kb-section="stack"
            className="relative md:min-h-[200vh] p-6 sm:p-10 md:p-14"
          >
            <div className="relative md:h-[150vh]">
              <div className="md:sticky md:top-28 text-center">
                <Reveal>
                  <h2 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-[-0.03em] text-ice-50 leading-[0.95]">
                    {t("stack.title")}
                  </h2>
                </Reveal>
                <Reveal delay={120}>
                  <p className="mt-3 text-sm sm:text-base text-ice-400">
                    <span className="hidden md:inline">{t("stack.hint")}</span>
                    <span className="md:hidden">{t("stack.hintMobile")}</span>
                  </p>
                </Reveal>
              </div>

              {/* Mobile skills grid (recovers the hover interaction as static
                  content the keyboard can't surface on touch). */}
              {isMobile && (
                <div className="md:hidden mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3 pointer-events-auto">
                  {SKILLS_FLAT.map((s) => (
                    <div
                      key={s.slug}
                      className="flex items-start gap-3 rounded-xl bg-ink-1/70 backdrop-blur-sm border border-ink-3 p-4"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        width="22"
                        height="22"
                        fill={`#${s.hex}`}
                        className="flex-none mt-0.5"
                        aria-hidden
                      >
                        <path d={s.path} />
                      </svg>
                      <div>
                        <p className="text-ice-50 font-medium text-sm">
                          {s.title}
                        </p>
                        <p className="text-ice-400 text-xs mt-0.5 leading-snug">
                          {t(`keyboard.taglines.${s.slug}`)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Experience — title is sticky at top-24 (feels anchored) but sits
              BEHIND the cards (z-0 vs. card wrapper's z-10), so as you scroll
              the card slides over the title. The section has no extra filler
              beyond the cards, so when you scroll past the last card the
              section ends and the title un-pins and exits the viewport at the
              same time — giving the "anchored then both disappear" feel. */}
          <section
            data-kb-section="experience"
            className="relative p-6 sm:p-10 md:p-14 pb-24"
          >
            <div className="sticky top-24 sm:top-28 text-center mb-12 sm:mb-16 z-0">
              <Reveal>
                <h2 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-[-0.03em] text-ice-50 leading-[0.95]">
                  {t("experience.title")}
                </h2>
              </Reveal>
              <Reveal delay={120}>
                <p className="mt-3 text-sm sm:text-base text-ice-300">
                  {t("experience.subtitle")}
                </p>
              </Reveal>
            </div>

            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              {experiences.map((exp, idx) => (
                <Reveal
                  key={`${exp.company}-${idx}`}
                  delay={idx * 120}
                  as="article"
                  className="relative rounded-2xl bg-ink-1/75 backdrop-blur-md border border-ink-3 p-6 sm:p-8 md:p-10 pointer-events-auto shadow-[0_8px_40px_-20px_rgba(0,0,0,0.6)]"
                >
                  <header className="flex flex-wrap items-start justify-between gap-3 mb-5">
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-ice-50 tracking-tight">
                        {pick(exp.role, lang)}
                      </h3>
                      <p className="text-ice-400 font-medium mt-1">
                        {exp.company}
                        <span className="text-ice-500/80 font-normal">
                          {" · "}
                          {pick(exp.location, lang)}
                        </span>
                      </p>
                    </div>
                    <span className="font-mono text-xs text-ice-100 px-3 py-1 rounded-full border border-ice-700/70 bg-ink-2/60 whitespace-nowrap">
                      {pick(exp.period, lang)}
                    </span>
                  </header>

                  <p className="text-ice-200 leading-relaxed mb-5">
                    {pick(exp.summary, lang)}
                  </p>

                  <ul className="space-y-2.5 mb-6">
                    {exp.bullets.map((b, i) => (
                      <li
                        key={i}
                        className="flex gap-3 text-ice-100 leading-relaxed"
                      >
                        <span className="mt-[0.65em] flex-none w-1.5 h-1.5 rounded-full bg-ice-400" />
                        <span>{pick(b, lang)}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5">
                    {exp.stack.map((s) => (
                      <span
                        key={s}
                        data-cursor="hover"
                        className="frost-chip"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </Reveal>
              ))}

              {/* Certifications Block */}
              <Reveal delay={experiences.length * 100}>
                <div className="pt-10 mt-10 border-t border-ink-3/80">
                  <h3 className="text-2xl sm:text-3xl font-bold text-ice-50 tracking-tight mb-6 text-center">
                    {t("experience.certsTitle")}
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    {certifications.map((cert, idx) => (
                      <div
                        key={idx}
                        className="rounded-xl bg-ink-1/70 backdrop-blur-sm border border-ink-3 p-5 pointer-events-auto transition-all duration-300 hover:border-ice-500/40 shadow-sm"
                      >
                        <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                          <h4 className="text-base sm:text-lg font-semibold text-ice-50 leading-snug">
                            {pick(cert.title, lang)}
                          </h4>
                          {cert.badge && (
                            <span className="text-[10px] font-mono uppercase tracking-wider text-ice-300 border border-ice-700/80 rounded-full px-2.5 py-0.5 bg-ink-2/80">
                              {pick(cert.badge, lang)}
                            </span>
                          )}
                        </div>
                        <p className="text-xs sm:text-sm text-ice-300/90 leading-relaxed">
                          {pick(cert.issuer, lang)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </section>

          {/* Projects */}
          {projects.map((p) => (
            <section
              key={p.num}
              data-kb-section={p.section}
              data-kb-highlights={(p.highlights ?? []).join(",")}
              className="relative py-20 md:min-h-screen flex items-center p-6 sm:p-10 md:p-14 overflow-hidden"
            >
              <span
                aria-hidden
                className={`watermark hidden md:block top-1/2 -translate-y-1/2 ${
                  p.align === "left" ? "right-[-2vw]" : "left-[-2vw]"
                }`}
              >
                {p.num}
              </span>

              <div
                className={
                  p.align === "left"
                    ? "max-w-xl relative"
                    : // Right-aligned cards get extra right padding on md+ so
                      // the action buttons ("Ver más") don't sit under the
                      // fixed SectionNav dots on the right edge. On mobile they
                      // collapse to a normal left-aligned full-width card.
                      "max-w-xl relative md:ml-auto md:text-right md:mr-16 lg:mr-24"
                }
              >
                <Reveal>
                  <p className="font-mono text-sm text-ice-400 mb-3">
                    {p.num} · {t("projects.kicker")}
                  </p>
                </Reveal>
                <Reveal delay={80}>
                  <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-ice-50 leading-[1.05] mb-4">
                    {pick(p.name, lang)}
                  </h2>
                </Reveal>
                {p.badge ? (
                  <Reveal delay={140}>
                    <span className="inline-block text-[10px] uppercase tracking-widest text-ice-300 border border-ice-700 rounded-full px-2 py-0.5 mb-4">
                      {pick(p.badge, lang)}
                    </span>
                  </Reveal>
                ) : null}
                <Reveal delay={180}>
                  <p className="text-base sm:text-lg text-ice-200 leading-relaxed mb-6">
                    {pick(p.desc, lang)}
                  </p>
                </Reveal>
                <Reveal delay={260}>
                  <div
                    className={
                      p.align === "right"
                        ? "flex flex-wrap gap-1.5 md:justify-end pointer-events-auto mb-5"
                        : "flex flex-wrap gap-1.5 pointer-events-auto mb-5"
                    }
                  >
                    {p.stack.map((s) => (
                      <span
                        key={s}
                        data-cursor="hover"
                        className="frost-chip"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </Reveal>
                <Reveal delay={320}>
                  <div
                    className={
                      p.align === "right"
                        ? "flex md:justify-end pointer-events-auto"
                        : "flex pointer-events-auto"
                    }
                  >
                    <button
                      type="button"
                      onClick={() => setActiveProject(p)}
                      data-cursor="hover"
                      data-magnetic
                      className="frost-btn"
                    >
                      {t("projects.viewMore")}
                      <svg
                        viewBox="0 0 24 24"
                        width="14"
                        height="14"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        aria-hidden
                      >
                        <path d="M5 12h14M13 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </Reveal>
              </div>
            </section>
          ))}

          {/* Contact — copy pinned to the left so the (large, hero-posed)
              keyboard on the right has room to bob its random keys. */}
          <section
            data-kb-section="contact"
            className="relative py-24 md:min-h-screen flex flex-col justify-center p-6 sm:p-10 md:p-14 overflow-hidden"
          >
            <div className="max-w-xl relative">
              <Reveal>
                <p className="font-mono text-sm text-ice-400 mb-3">
                  {t("contact.kicker")}
                </p>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="text-4xl sm:text-6xl font-semibold tracking-tight text-ice-50 mb-6">
                  {t("contact.title")}
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="text-ice-200 mb-10">{t("contact.body")}</p>
              </Reveal>
              <Reveal delay={240}>
                <div className="flex flex-wrap gap-3 pointer-events-auto">
                  <CopyEmail
                    email={EMAIL}
                    className="frost-btn frost-btn--primary"
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="M3 7l9 6 9-6" />
                    </svg>
                    {t("contact.copyEmail")}
                  </CopyEmail>
                  <a
                    href={`mailto:${EMAIL}`}
                    data-cursor="hover"
                    className="frost-btn"
                  >
                    {t("contact.openMail")}
                  </a>
                  <a
                    href="https://github.com/SuleimanKh97/"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="hover"
                    className="frost-btn"
                  >
                    {t("contact.github")}
                  </a>
                  <a
                    href="https://www.linkedin.com/in/suleimankhashashneh/"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="hover"
                    className="frost-btn"
                  >
                    {t("contact.linkedin")}
                  </a>
                </div>
              </Reveal>
            </div>
            <Reveal delay={320}>
              <p className="mt-14 text-[11px] uppercase tracking-[0.25em] text-ice-400">
                {t("contact.footer")}
              </p>
            </Reveal>
          </section>
        </main>

        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      </div>
    </SmoothScroll>
  );
}
