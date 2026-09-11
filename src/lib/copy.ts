export type Lang = "en" | "es";

export const LANGS: Lang[] = ["en", "es"];
export const DEFAULT_LANG: Lang = "en";

type Step = { title: string; body: string };

export type Copy = {
  nav: { how: string; company: string; contact: string; cta: string };
  hero: {
    welcome: string;
    headline: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    slotPlaceholder: string;
  };
  steps: { kicker: string; heading: string };
  reveal: {
    kicker: string;
    innerPlaceholder: string;
    outerPlaceholder: string;
    caption: string;
  };
  stepList: Step[];
  about: {
    kicker: string;
    heading: string;
    p1: string;
    p2: string;
    stat1: string;
    stat2: string;
    stat3: string;
    slotPlaceholder: string;
  };
  contact: {
    kicker: string;
    heading: string;
    subtitle: string;
    cta: string;
  };
  footer: { copyright: string };
  partnersLabel: string;
  a11y: { switchToEnglish: string; switchToSpanish: string; skipToContent: string };
};

export const COPY: Record<Lang, Copy> = {
  en: {
    nav: {
      how: "How it works",
      company: "Company",
      contact: "Contact",
      cta: "Request info",
    },
    hero: {
      welcome: "Welcome to today’s future",
      headline: "Employees, reengineered by intelligence.",
      subtitle:
        "We design, train and deploy AI agents that run real workflows in your company — with the precision and availability of one more employee.",
      ctaPrimary: "Request info — hire yours now",
      ctaSecondary: "How it works",
      slotPlaceholder: "Employee",
    },
    steps: {
      kicker: "How it works",
      heading: "From a bottleneck to a working digital employee.",
    },
    reveal: {
      kicker: "Under the hood",
      innerPlaceholder: "Interior",
      outerPlaceholder: "Android",
      caption: "Scroll to see what powers every digital employee.",
    },
    stepList: [
      {
        title: "Contact",
        body: "You tell us the bottleneck or task holding your operation back.",
      },
      {
        title: "Audit",
        body: "We analyze the process and define which agent can run it.",
      },
      {
        title: "Development",
        body: "We train and deploy the digital employee for that specific task.",
      },
      {
        title: "Flexible payment",
        body: "Subscription, pay-per-result, or whatever model fits your business.",
      },
    ],
    about: {
      kicker: "Who we are",
      heading: "The first company in Spain built on a workforce of agents.",
      p1: "Nara Intelligence trains digital employees on general artificial intelligence models: each agent is designed, audited and deployed for a specific task in your operation, and works with the same accountability you’d expect from any member of your team.",
      p2: "We are pioneers in building this digital workforce from Spain, pairing our own engineering with close support at every stage of implementation.",
      stat1: "Digital agents",
      stat2: "Availability",
      stat3: "Local engineering",
      slotPlaceholder: "Team",
    },
    contact: {
      kicker: "Let’s start",
      heading: "Tell us your bottleneck. We’ll bring back a plan.",
      subtitle: "Initial audit, no commitment. Response in under 72 hours.",
      cta: "Request info — hire yours now",
    },
    footer: { copyright: "© 2026 Nara Intelligence" },
    partnersLabel: "Powered by",
    a11y: {
      switchToEnglish: "English",
      switchToSpanish: "Español",
      skipToContent: "Skip to content",
    },
  },
  es: {
    nav: {
      how: "Cómo funciona",
      company: "Compañía",
      contact: "Contacto",
      cta: "Solicitar información",
    },
    hero: {
      welcome: "Bienvenido al futuro de hoy",
      headline: "Empleados, reinventados por la inteligencia.",
      subtitle:
        "Diseñamos, entrenamos y desplegamos agentes de inteligencia artificial que ejecutan procesos reales de tu empresa — con la precisión y disponibilidad de un empleado más.",
      ctaPrimary: "Solicita info — contrata al tuyo ya",
      ctaSecondary: "Cómo funciona",
      slotPlaceholder: "Empleado",
    },
    steps: {
      kicker: "Cómo funciona",
      heading: "De un cuello de botella a un empleado digital operativo.",
    },
    reveal: {
      kicker: "Por dentro",
      innerPlaceholder: "Interior",
      outerPlaceholder: "Androide",
      caption: "Desplázate para ver qué hay dentro de cada empleado digital.",
    },
    stepList: [
      {
        title: "Contacto",
        body: "Nos cuentas el cuello de botella o la tarea que frena tu operación.",
      },
      {
        title: "Auditoría",
        body: "Analizamos el proceso y definimos qué agente puede ejecutarlo.",
      },
      {
        title: "Desarrollo",
        body: "Entrenamos y desplegamos el empleado digital para esa tarea concreta.",
      },
      {
        title: "Pago flexible",
        body: "Suscripción, por resultado o el modelo que mejor se adapte a tu negocio.",
      },
    ],
    about: {
      kicker: "Quiénes somos",
      heading:
        "La primera compañía en España construida sobre una plantilla de agentes.",
      p1: "Nara Intelligence entrena empleados digitales sobre modelos de inteligencia artificial general: cada agente se diseña, audita y despliega para una tarea concreta de tu operación, y trabaja con la misma responsabilidad que exigirías a cualquier miembro de tu equipo.",
      p2: "Somos pioneros en construir esta fuerza laboral digital desde España, combinando ingeniería propia con un acompañamiento cercano en cada implementación.",
      stat1: "Agentes digitales",
      stat2: "Disponibilidad",
      stat3: "Ingeniería local",
      slotPlaceholder: "Equipo",
    },
    contact: {
      kicker: "Empecemos",
      heading: "Cuéntanos tu cuello de botella. Te devolvemos un plan.",
      subtitle: "Auditoría inicial sin compromiso. Respuesta en menos de 72 horas.",
      cta: "Solicita info — contrata al tuyo ya",
    },
    footer: { copyright: "© 2026 Nara Intelligence" },
    partnersLabel: "Powered by",
    a11y: {
      switchToEnglish: "English",
      switchToSpanish: "Español",
      skipToContent: "Ir al contenido",
    },
  },
};

/** Partner wordmarks for the infinite marquee, in the order the user listed them. */
export const PARTNERS = [
  "Anthropic",
  "OpenAI",
  "Docker",
  "Supabase",
  "Render",
  "Railway",
  "Python",
  "Vercel",
  "n8n",
  "WhisperFlow",
  "GitHub",
  "Notion",
  "Apollo.io",
  "Stripe",
] as const;

export const CONTACT_EMAIL = "hola@naraintelligence.ai";
