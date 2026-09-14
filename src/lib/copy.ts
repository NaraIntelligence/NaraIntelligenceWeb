export type Lang = "en" | "es";

export const LANGS: Lang[] = ["en", "es"];
export const DEFAULT_LANG: Lang = "en";

type Step = { title: string; body: string };
type Department = "dev" | "finance" | "hr";
type DirectorAgent = {
  name: string;
  role: string;
  department: Department;
  description: string;
  manages: string[];
};
type EmployeeAgent = {
  name: string;
  role: string;
  department: Department;
  description: string;
};

export type Copy = {
  nav: {
    how: string;
    products: string;
    company: string;
    contact: string;
    cta: string;
  };
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
  products: {
    kicker: string;
    heading: string;
    subheading: string;
    directorsLabel: string;
    directorsNote: string;
    employeesLabel: string;
    employeesNote: string;
    directorBadge: string;
    managesLabel: string;
  };
  departments: Record<Department, string>;
  directorAgents: DirectorAgent[];
  employeeAgents: EmployeeAgent[];
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
      products: "Products",
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
    products: {
      kicker: "Products",
      heading: "Meet your new team.",
      subheading:
        "Every deployment starts with a Director — a senior agent that owns a function and manages a team of specialist agents underneath it.",
      directorsLabel: "Director agents",
      directorsNote:
        "Higher autonomy, higher investment — they own outcomes and manage the specialists below them.",
      employeesLabel: "Employee agents",
      employeesNote:
        "Focused specialists that execute the specific tasks their Director assigns.",
      directorBadge: "Director",
      managesLabel: "Manages",
    },
    departments: {
      dev: "Development",
      finance: "Finance",
      hr: "HR",
    },
    directorAgents: [
      {
        name: "Diego",
        role: "Development Director",
        department: "dev",
        description:
          "Owns the engineering roadmap and reviews everything his team ships.",
        manages: ["Mateo", "Lucía"],
      },
      {
        name: "Sofía",
        role: "Finance Director",
        department: "finance",
        description:
          "Keeps the books straight and signs off on every financial report.",
        manages: ["Valentina", "Andrés"],
      },
      {
        name: "Elena",
        role: "HR Director",
        department: "hr",
        description:
          "Runs people operations end-to-end, from hiring to onboarding.",
        manages: ["Camila", "Tomás"],
      },
    ],
    employeeAgents: [
      {
        name: "Mateo",
        role: "Code Review Agent",
        department: "dev",
        description:
          "Reviews every pull request against your team's standards, 24/7.",
      },
      {
        name: "Lucía",
        role: "QA Agent",
        department: "dev",
        description: "Runs regression tests before anything reaches production.",
      },
      {
        name: "Valentina",
        role: "Invoicing Agent",
        department: "finance",
        description: "Generates and sends invoices the moment a deal closes.",
      },
      {
        name: "Andrés",
        role: "Expense Reports Agent",
        department: "finance",
        description: "Categorizes receipts and flags anything out of policy.",
      },
      {
        name: "Camila",
        role: "Recruiting Agent",
        department: "hr",
        description: "Screens resumes and schedules interviews for open roles.",
      },
      {
        name: "Tomás",
        role: "Onboarding Agent",
        department: "hr",
        description: "Walks new hires through setup on day one, every time.",
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
      products: "Productos",
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
    products: {
      kicker: "Productos",
      heading: "Conocé a tu nuevo equipo.",
      subheading:
        "Cada despliegue empieza con un Director: un agente senior que lidera un área y gestiona a un equipo de agentes especialistas debajo suyo.",
      directorsLabel: "Agentes directores",
      directorsNote:
        "Mayor autonomía, mayor inversión: responden por los resultados y gestionan a los especialistas a su cargo.",
      employeesLabel: "Agentes empleados",
      employeesNote:
        "Especialistas enfocados que ejecutan las tareas específicas que les asigna su Director.",
      directorBadge: "Director",
      managesLabel: "Gestiona a",
    },
    departments: {
      dev: "Desarrollo",
      finance: "Finanzas",
      hr: "RRHH",
    },
    directorAgents: [
      {
        name: "Diego",
        role: "Director de Desarrollo",
        department: "dev",
        description:
          "Define el roadmap de ingeniería y revisa todo lo que entrega su equipo.",
        manages: ["Mateo", "Lucía"],
      },
      {
        name: "Sofía",
        role: "Directora de Finanzas",
        department: "finance",
        description:
          "Mantiene las cuentas en orden y aprueba cada reporte financiero.",
        manages: ["Valentina", "Andrés"],
      },
      {
        name: "Elena",
        role: "Directora de RRHH",
        department: "hr",
        description:
          "Gestiona todo el ciclo de personas, desde la contratación hasta el onboarding.",
        manages: ["Camila", "Tomás"],
      },
    ],
    employeeAgents: [
      {
        name: "Mateo",
        role: "Agente de Code Review",
        department: "dev",
        description:
          "Revisa cada pull request contra los estándares de tu equipo, 24/7.",
      },
      {
        name: "Lucía",
        role: "Agente de QA",
        department: "dev",
        description:
          "Corre pruebas de regresión antes de que algo llegue a producción.",
      },
      {
        name: "Valentina",
        role: "Agente de Facturación",
        department: "finance",
        description: "Genera y envía facturas apenas se cierra un trato.",
      },
      {
        name: "Andrés",
        role: "Agente de Gastos",
        department: "finance",
        description: "Categoriza recibos y marca lo que se sale de política.",
      },
      {
        name: "Camila",
        role: "Agente de Reclutamiento",
        department: "hr",
        description: "Filtra CVs y agenda entrevistas para las posiciones abiertas.",
      },
      {
        name: "Tomás",
        role: "Agente de Onboarding",
        department: "hr",
        description: "Guía a cada nueva contratación en su primer día, siempre.",
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

/**
 * Partner logos for the infinite marquee, in the order the user listed them.
 * Each `logo` points to a PNG in /public/logos/ — drop the matching file
 * there and it picks up automatically, no code changes needed.
 */
export const PARTNERS = [
  { name: "Anthropic", logo: "/logos/anthropic.png" },
  { name: "OpenAI", logo: "/logos/openai.png" },
  { name: "Docker", logo: "/logos/docker.png" },
  { name: "Supabase", logo: "/logos/supabase.png" },
  { name: "Render", logo: "/logos/render.png" },
  { name: "Railway", logo: "/logos/railway.png" },
  { name: "Python", logo: "/logos/python.png" },
  { name: "Vercel", logo: "/logos/vercel.png" },
  { name: "n8n", logo: "/logos/n8n.png" },
  { name: "WhisperFlow", logo: "/logos/whisperflow.png" },
  { name: "GitHub", logo: "/logos/github.png" },
  { name: "Notion", logo: "/logos/notion.png" },
  { name: "Apollo.io", logo: "/logos/apollo.png" },
  { name: "Stripe", logo: "/logos/stripe.png" },
] as const;

export const CONTACT_EMAIL = "hola@naraintelligence.ai";
