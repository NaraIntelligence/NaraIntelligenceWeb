export type Lang = "en" | "es";

export const LANGS: Lang[] = ["en", "es"];
export const DEFAULT_LANG: Lang = "en";

type Step = { title: string; body: string };
type Department = "dev" | "finance" | "hr";

type BaseAgent = {
  name: string;
  role: string;
  department: Department;
  /** Portrait in /public/agents/ — falls back to the initial if missing. */
  photo: string;
  /** One line, revealed on hover over the poster. */
  description: string;
  /** Longer pitch, shown once the poster is opened. */
  detail: string;
  /** Concrete things this agent does day to day. */
  tasks: string[];
};

type DirectorAgent = BaseAgent & { manages: string[] };
type EmployeeAgent = BaseAgent;

type Advantage = { title: string; body: string };
/** A headline figure plus the public source that backs it. */
type Stat = { value: string; label: string; source: string; href: string };
type Bar = { label: string; value: number };
type Chart = {
  title: string;
  note: string;
  source: string;
  href: string;
  unit: string;
  bars: Bar[];
};

export type Copy = {
  nav: {
    how: string;
    products: string;
    what: string;
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
    employeesCta: string;
    directorBadge: string;
    managesLabel: string;
    tasksLabel: string;
    hirePrefix: string;
    customCta: string;
    closeLabel: string;
    openHint: string;
  };
  departments: Record<Department, string>;
  directorAgents: DirectorAgent[];
  employeeAgents: EmployeeAgent[];
  form: {
    title: string;
    subtitle: string;
    name: string;
    namePlaceholder: string;
    interest: string;
    interestPlaceholder: string;
    interestOptions: string[];
    business: string;
    businessPlaceholder: string;
    businessOptions: string[];
    email: string;
    emailPlaceholder: string;
    phone: string;
    phonePlaceholder: string;
    phoneCountry: string;
    whatsappNote: string;
    required: string;
    invalidEmail: string;
    invalidPhone: string;
    submit: string;
    close: string;
    successTitle: string;
    successBody: string;
  };
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
  whatIsNara: {
    kicker: string;
    heading: string;
    intro: string;
    whoTitle: string;
    whoBody1: string;
    whoBody2: string;
    sectorsTitle: string;
    sectorsBody: string;
    sectors: string[];
    orgTitle: string;
    orgBody: string;
    orgYou: string;
    orgYouNote: string;
    orgDirectors: string;
    orgEmployees: string;
    advantagesTitle: string;
    advantages: Advantage[];
    dataTitle: string;
    dataBody: string;
    stats: Stat[];
    charts: Chart[];
    sourceLabel: string;
    ctaTitle: string;
    ctaBody: string;
  };
  contact: {
    kicker: string;
    heading: string;
    subtitle: string;
    cta: string;
  };
  footer: {
    copyright: string;
    tagline: string;
    navLabel: string;
    companyLabel: string;
    contactLabel: string;
    legalLabel: string;
    privacy: string;
    terms: string;
    builtIn: string;
  };
  partnersLabel: string;
  a11y: { switchToEnglish: string; switchToSpanish: string; skipToContent: string };
};

export const COPY: Record<Lang, Copy> = {
  en: {
    nav: {
      how: "How it works",
      products: "The roster",
      what: "What is Nara Intelligence",
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
      kicker: "The roster",
      heading: "Pick who joins your team.",
      subheading:
        "Every deployment starts with a Director — a senior agent that owns a function and manages a team of specialist agents underneath it.",
      directorsLabel: "Director agents",
      directorsNote:
        "Higher autonomy, higher investment — they own outcomes and manage the specialists below them.",
      employeesLabel: "Employee agents",
      employeesNote:
        "Focused specialists that execute the specific tasks their Director assigns.",
      employeesCta: "Hire one of these — or have us build you a new one",
      directorBadge: "Director",
      managesLabel: "Manages",
      tasksLabel: "What they handle",
      hirePrefix: "Hire",
      customCta: "Need something else? Build a custom agent",
      closeLabel: "Close",
      openHint: "Open profile",
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
        photo: "/agents/diego.jpg",
        description:
          "Owns the engineering roadmap and reviews everything his team ships.",
        detail:
          "Diego sits at the top of your engineering function. He turns your product goals into a working backlog, sets the standards his specialists review against, and reports on what shipped and what slipped — without you having to chase anyone for a status update.",
        tasks: [
          "Turns product goals into a prioritized engineering backlog",
          "Sets and enforces the code standards his team reviews against",
          "Reports weekly on what shipped, what slipped and why",
        ],
        manages: ["Mateo", "Lucía"],
      },
      {
        name: "Sofía",
        role: "Finance Director",
        department: "finance",
        photo: "/agents/sofia.jpg",
        description:
          "Keeps the books straight and signs off on every financial report.",
        detail:
          "Sofía owns the numbers. She closes the month, watches cash flow against plan, and flags problems while they are still small — so the first time you hear about a gap is not the quarter it lands.",
        tasks: [
          "Runs the monthly close and reconciles every account",
          "Tracks cash flow against plan and flags variances early",
          "Signs off on the reports her specialists produce",
        ],
        manages: ["Valentina", "Andrés"],
      },
      {
        name: "Elena",
        role: "HR Director",
        department: "hr",
        photo: "/agents/elena.jpg",
        description:
          "Runs people operations end-to-end, from hiring to onboarding.",
        detail:
          "Elena covers the whole employee lifecycle. She opens roles, keeps candidates moving, and makes sure every new hire lands on day one with accounts, equipment and a plan already waiting for them.",
        tasks: [
          "Defines open roles and the hiring plan behind them",
          "Keeps every candidate moving through the pipeline",
          "Owns onboarding so day one is the same for everyone",
        ],
        manages: ["Camila", "Tomás"],
      },
    ],
    employeeAgents: [
      {
        name: "Mateo",
        role: "Code Review Agent",
        department: "dev",
        photo: "/agents/mateo.jpg",
        description:
          "Reviews every pull request against your team's standards, 24/7.",
        detail:
          "Mateo reads every pull request the moment it opens, at three in the morning included. He checks it against your conventions, leaves specific line comments, and escalates to Diego anything that touches architecture.",
        tasks: [
          "Reviews every pull request within minutes of it opening",
          "Leaves specific, line-level comments instead of a rubber stamp",
          "Escalates architectural changes to the Development Director",
        ],
      },
      {
        name: "Lucía",
        role: "QA Agent",
        department: "dev",
        photo: "/agents/lucia.jpg",
        description: "Runs regression tests before anything reaches production.",
        detail:
          "Lucía is the gate before production. She runs the regression suite on every release candidate, reproduces the failures she finds, and writes them up clearly enough that whoever picks them up does not have to guess.",
        tasks: [
          "Runs the full regression suite on every release candidate",
          "Reproduces and documents each failure step by step",
          "Blocks releases that break something that used to work",
        ],
      },
      {
        name: "Valentina",
        role: "Invoicing Agent",
        department: "finance",
        photo: "/agents/valentina.jpg",
        description: "Generates and sends invoices the moment a deal closes.",
        detail:
          "Valentina closes the loop between selling and getting paid. The invoice goes out the same day the deal does, the payment gets matched when it lands, and the polite reminder goes out on schedule when it does not.",
        tasks: [
          "Issues the invoice the same day the deal closes",
          "Matches incoming payments against open invoices",
          "Chases overdue accounts on a schedule you set",
        ],
      },
      {
        name: "Andrés",
        role: "Expense Reports Agent",
        department: "finance",
        photo: "/agents/andres.jpg",
        description: "Categorizes receipts and flags anything out of policy.",
        detail:
          "Andrés takes expense reports off everyone's desk. He reads the receipt, assigns the category, checks it against your policy, and routes only the genuine exceptions to a human.",
        tasks: [
          "Reads and categorizes every submitted receipt",
          "Checks each claim against your expense policy",
          "Routes only real exceptions for human approval",
        ],
      },
      {
        name: "Camila",
        role: "Recruiting Agent",
        department: "hr",
        photo: "/agents/camila.jpg",
        description: "Screens resumes and schedules interviews for open roles.",
        detail:
          "Camila works the top of the hiring funnel. She screens every application against the role you defined, replies to candidates the same day, and books interviews straight into the calendars of the people who need to be there.",
        tasks: [
          "Screens every application against the role's real requirements",
          "Replies to every candidate, including the ones you pass on",
          "Books interviews directly into the right calendars",
        ],
      },
      {
        name: "Tomás",
        role: "Onboarding Agent",
        department: "hr",
        photo: "/agents/tomas.jpg",
        description: "Walks new hires through setup on day one, every time.",
        detail:
          "Tomás makes day one identical for every hire. Accounts, access, equipment and the first-week plan are all ready before they sit down, and he answers the questions they would otherwise interrupt someone else to ask.",
        tasks: [
          "Provisions accounts, access and equipment before day one",
          "Walks each new hire through their first-week plan",
          "Answers the recurring questions new hires actually ask",
        ],
      },
    ],
    form: {
      title: "Request info",
      subtitle:
        "Tell us where you want an agent and we come back with a plan. Initial audit, no commitment.",
      name: "Name",
      namePlaceholder: "Your full name",
      interest: "Field of interest",
      interestPlaceholder: "Select a field",
      interestOptions: [
        "Development",
        "Finance",
        "HR / People",
        "Sales",
        "Customer support",
        "Operations",
        "Marketing",
        "Not sure yet",
      ],
      business: "Business type",
      businessPlaceholder: "Select your business type",
      businessOptions: [
        "Startup",
        "SME",
        "Large enterprise",
        "Agency / consultancy",
        "Freelance / solo",
        "Public sector",
        "Other",
      ],
      email: "Email",
      emailPlaceholder: "you@company.com",
      phone: "Phone number",
      phonePlaceholder: "600 000 000",
      phoneCountry: "Country code",
      whatsappNote:
        "You'll be contacted by WhatsApp. If you're not on WhatsApp, we'll email you instead.",
      required: "You must complete this field",
      invalidEmail: "Enter a valid email address",
      invalidPhone: "Enter a valid phone number",
      submit: "Send request",
      close: "Close",
      successTitle: "Your email is ready to send",
      successBody:
        "We opened your email app with everything filled in. Send it and we'll reply in under 72 hours.",
    },
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
    whatIsNara: {
      kicker: "What is Nara Intelligence",
      heading: "A workforce you hire, not a tool you configure.",
      intro:
        "Nara Intelligence builds digital employees: AI agents designed, audited and deployed for one specific job inside your company. You don't get a platform to learn. You get someone who does the work.",
      whoTitle: "Who we are",
      whoBody1:
        "We are an engineering company based in Spain, building on top of general artificial intelligence models rather than reselling them. Every agent we deliver is designed around a real process in a real company: we audit how the work is done today, define where an agent can own it end to end, and stay involved while it takes over.",
      whoBody2:
        "We built the company the same way we build for our clients. Our own development, finance and people functions run on the same director-and-specialist structure we sell — which is why we can tell you what this model actually costs to run, and where it stops being the right answer.",
      sectorsTitle: "Where we've done it",
      sectorsBody:
        "The pattern repeats across very different companies: one process that eats hours, no clear owner, and nobody with time to fix it. That is the shape of a job for an agent.",
      sectors: [
        "Software and product teams",
        "Professional services",
        "E-commerce and retail",
        "Logistics and operations",
        "Finance and administration",
        "Agencies and consultancies",
      ],
      orgTitle: "How the org chart works",
      orgBody:
        "You don't manage a fleet of disconnected bots. You hire a Director for a function, and the Director manages the specialists underneath it — the same escalation path you'd expect from a human team.",
      orgYou: "Your company",
      orgYouNote: "Sets the goals, approves the exceptions",
      orgDirectors: "Director agents",
      orgEmployees: "Employee agents",
      advantagesTitle: "Why it works this way",
      advantages: [
        {
          title: "One owner per function",
          body: "A Director is accountable for the outcome, not just for running a task. Problems escalate to one place instead of disappearing between tools.",
        },
        {
          title: "Specialists stay narrow",
          body: "An agent that does one job well beats a general assistant that does ten jobs adequately — and a narrow scope is something you can actually audit.",
        },
        {
          title: "It scales without rehiring",
          body: "Adding capacity means adding a specialist under an existing Director, not opening a role and waiting three months to fill it.",
        },
        {
          title: "Availability is not a variable",
          body: "The review happens at 3am, the invoice goes out on a holiday, the candidate gets an answer the same day. Nothing waits for Monday.",
        },
      ],
      dataTitle: "The numbers behind this",
      dataBody:
        "We'd rather show you the public evidence than our own marketing. Every figure below links to the organisation that published it — including the ones that say this market is still early.",
      stats: [
        {
          value: "88%",
          label:
            "of organizations report having adopted AI, as tracked by the AI Index's organizational adoption measure (2026).",
          source: "Stanford HAI, AI Index 2026",
          href: "https://hai.stanford.edu/ai-index/2026-ai-index-report",
        },
        {
          value: "21.1%",
          label:
            "of Spanish companies with 10 or more employees used AI in early 2025 — above the 20.0% EU average reported by Eurostat for the same year.",
          source: "INE (Spain), October 2025",
          href: "https://www.ine.es/dyngs/Prensa/ETICCE20241T2025.htm",
        },
        {
          value: "61%",
          label:
            "of CEOs surveyed say they are adopting AI agents today and preparing to deploy them at scale (2,000 CEOs across 33 countries).",
          source: "IBM Institute for Business Value, May 2025",
          href: "https://newsroom.ibm.com/2025-05-06-ibm-study-ceos-double-down-on-ai-while-navigating-enterprise-hurdles",
        },
        {
          value: "10%",
          label:
            "of organizations report significant, measurable ROI from agentic AI so far. Deployment quality is still what separates results from pilots — which is exactly the part we do.",
          source: "Deloitte Global, October 2025",
          href: "https://www.deloitte.com/global/en/issues/ai/ai-roi-the-paradox-of-rising-investment-and-elusive-returns.html",
        },
      ],
      charts: [
        {
          title: "AI use by Spanish companies, by sector",
          note: "Companies with 10 or more employees, first quarter of 2025.",
          source: "INE, Survey on ICT use in companies (October 2025)",
          href: "https://www.ine.es/dyngs/Prensa/ETICCE20241T2025.htm",
          unit: "%",
          bars: [
            { label: "Services", value: 25.7 },
            { label: "Industry", value: 17.5 },
            { label: "Construction", value: 11.4 },
          ],
        },
        {
          title: "Measured productivity gain from an AI assistant at work",
          note: "Issues resolved per hour by 5,179 customer-support agents, staggered rollout field study.",
          source: "Brynjolfsson, Li & Raymond, NBER Working Paper 31161",
          href: "https://www.nber.org/papers/w31161",
          unit: "%",
          bars: [
            { label: "Least experienced workers", value: 34 },
            { label: "All workers, on average", value: 14 },
          ],
        },
      ],
      sourceLabel: "Source",
      ctaTitle: "Where would yours start?",
      ctaBody:
        "Tell us the process that eats the most hours in your week. We come back with the agent that would own it, and what it would take to deploy.",
    },
    contact: {
      kicker: "Let’s start",
      heading: "Tell us your bottleneck. We’ll bring back a plan.",
      subtitle: "Initial audit, no commitment. Response in under 72 hours.",
      cta: "Request info — hire yours now",
    },
    footer: {
      copyright: "© 2026 Nara Intelligence",
      tagline:
        "Digital employees, designed and deployed for the specific tasks holding your operation back.",
      navLabel: "Explore",
      companyLabel: "Company",
      contactLabel: "Get in touch",
      legalLabel: "Legal",
      privacy: "Privacy policy",
      terms: "Terms of service",
      builtIn: "Built in Spain",
    },
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
      products: "La plantilla",
      what: "Qué es Nara Intelligence",
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
      kicker: "La plantilla",
      heading: "Elige quién se suma a tu equipo.",
      subheading:
        "Cada despliegue empieza con un Director: un agente senior que lidera un área y gestiona a un equipo de agentes especialistas debajo suyo.",
      directorsLabel: "Agentes directores",
      directorsNote:
        "Mayor autonomía, mayor inversión: responden por los resultados y gestionan a los especialistas a su cargo.",
      employeesLabel: "Agentes empleados",
      employeesNote:
        "Especialistas enfocados que ejecutan las tareas específicas que les asigna su Director.",
      employeesCta: "Contrata uno de estos — o te construimos uno nuevo",
      directorBadge: "Director",
      managesLabel: "Gestiona a",
      tasksLabel: "De qué se encarga",
      hirePrefix: "Contratar a",
      customCta: "¿Necesitas otra cosa? Construimos un agente a medida",
      closeLabel: "Cerrar",
      openHint: "Ver perfil",
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
        photo: "/agents/diego.jpg",
        description:
          "Define el roadmap de ingeniería y revisa todo lo que entrega su equipo.",
        detail:
          "Diego está al frente de tu área de ingeniería. Convierte los objetivos de producto en un backlog real, fija los estándares contra los que revisan sus especialistas, y te reporta qué se entregó y qué se retrasó, sin que tengas que perseguir a nadie para saberlo.",
        tasks: [
          "Convierte los objetivos de producto en un backlog priorizado",
          "Fija y hace cumplir los estándares de código de su equipo",
          "Reporta cada semana qué salió, qué se retrasó y por qué",
        ],
        manages: ["Mateo", "Lucía"],
      },
      {
        name: "Sofía",
        role: "Directora de Finanzas",
        department: "finance",
        photo: "/agents/sofia.jpg",
        description:
          "Mantiene las cuentas en orden y aprueba cada reporte financiero.",
        detail:
          "Sofía es la responsable de los números. Cierra el mes, vigila la caja contra el plan y avisa de los problemas cuando todavía son pequeños, para que la primera noticia de un desvío no llegue con el trimestre ya cerrado.",
        tasks: [
          "Ejecuta el cierre mensual y concilia todas las cuentas",
          "Controla la caja contra el plan y avisa de desvíos a tiempo",
          "Aprueba los informes que producen sus especialistas",
        ],
        manages: ["Valentina", "Andrés"],
      },
      {
        name: "Elena",
        role: "Directora de RRHH",
        department: "hr",
        photo: "/agents/elena.jpg",
        description:
          "Gestiona todo el ciclo de personas, desde la contratación hasta el onboarding.",
        detail:
          "Elena cubre el ciclo completo del empleado. Abre las posiciones, mantiene el proceso en movimiento y se asegura de que cada incorporación llegue el primer día con cuentas, equipo y un plan ya preparados.",
        tasks: [
          "Define las posiciones abiertas y el plan de contratación",
          "Mantiene a cada candidato avanzando en el proceso",
          "Se hace cargo del onboarding para que el día uno sea igual para todos",
        ],
        manages: ["Camila", "Tomás"],
      },
    ],
    employeeAgents: [
      {
        name: "Mateo",
        role: "Agente de Code Review",
        department: "dev",
        photo: "/agents/mateo.jpg",
        description:
          "Revisa cada pull request contra los estándares de tu equipo, 24/7.",
        detail:
          "Mateo lee cada pull request en cuanto se abre, incluidas las tres de la mañana. La revisa contra vuestras convenciones, deja comentarios concretos línea a línea, y escala a Diego todo lo que toque arquitectura.",
        tasks: [
          "Revisa cada pull request a los pocos minutos de abrirse",
          "Deja comentarios concretos línea a línea, no un visto bueno vacío",
          "Escala los cambios de arquitectura al Director de Desarrollo",
        ],
      },
      {
        name: "Lucía",
        role: "Agente de QA",
        department: "dev",
        photo: "/agents/lucia.jpg",
        description:
          "Corre pruebas de regresión antes de que algo llegue a producción.",
        detail:
          "Lucía es la puerta antes de producción. Pasa la suite de regresión sobre cada candidata a release, reproduce los fallos que encuentra y los documenta con el detalle suficiente para que quien los coja no tenga que adivinar nada.",
        tasks: [
          "Pasa la suite completa de regresión en cada release candidate",
          "Reproduce y documenta cada fallo paso a paso",
          "Bloquea releases que rompen algo que antes funcionaba",
        ],
      },
      {
        name: "Valentina",
        role: "Agente de Facturación",
        department: "finance",
        photo: "/agents/valentina.jpg",
        description: "Genera y envía facturas apenas se cierra un trato.",
        detail:
          "Valentina cierra el círculo entre vender y cobrar. La factura sale el mismo día que el trato, el pago se concilia cuando entra, y el recordatorio educado sale en su momento cuando no entra.",
        tasks: [
          "Emite la factura el mismo día en que se cierra el trato",
          "Concilia los pagos recibidos con las facturas abiertas",
          "Reclama los vencidos según la pauta que tú definas",
        ],
      },
      {
        name: "Andrés",
        role: "Agente de Gastos",
        department: "finance",
        photo: "/agents/andres.jpg",
        description: "Categoriza recibos y marca lo que se sale de política.",
        detail:
          "Andrés quita las notas de gasto de la mesa de todo el mundo. Lee el recibo, asigna la categoría, lo contrasta con vuestra política y deriva a una persona solo las excepciones de verdad.",
        tasks: [
          "Lee y categoriza cada recibo presentado",
          "Contrasta cada gasto con vuestra política interna",
          "Deriva a aprobación humana solo las excepciones reales",
        ],
      },
      {
        name: "Camila",
        role: "Agente de Reclutamiento",
        department: "hr",
        photo: "/agents/camila.jpg",
        description: "Filtra CVs y agenda entrevistas para las posiciones abiertas.",
        detail:
          "Camila trabaja la parte alta del embudo de contratación. Filtra cada candidatura contra la posición que definiste, responde a los candidatos el mismo día y agenda las entrevistas directamente en los calendarios de quienes tienen que estar.",
        tasks: [
          "Filtra cada candidatura contra los requisitos reales del puesto",
          "Responde a todos los candidatos, también a los descartados",
          "Agenda las entrevistas directamente en los calendarios correctos",
        ],
      },
      {
        name: "Tomás",
        role: "Agente de Onboarding",
        department: "hr",
        photo: "/agents/tomas.jpg",
        description: "Guía a cada nueva contratación en su primer día, siempre.",
        detail:
          "Tomás hace que el día uno sea idéntico para cada incorporación. Cuentas, accesos, equipo y plan de la primera semana están listos antes de que se sienten, y resuelve las dudas que si no acabarían interrumpiendo a otra persona.",
        tasks: [
          "Prepara cuentas, accesos y equipo antes del primer día",
          "Acompaña a cada incorporación en su plan de primera semana",
          "Responde las dudas recurrentes que de verdad tienen los nuevos",
        ],
      },
    ],
    form: {
      title: "Solicitar información",
      subtitle:
        "Cuéntanos dónde quieres un agente y te devolvemos un plan. Auditoría inicial, sin compromiso.",
      name: "Nombre",
      namePlaceholder: "Tu nombre completo",
      interest: "Área de interés",
      interestPlaceholder: "Elige un área",
      interestOptions: [
        "Desarrollo",
        "Finanzas",
        "RRHH / Personas",
        "Ventas",
        "Atención al cliente",
        "Operaciones",
        "Marketing",
        "Aún no lo tengo claro",
      ],
      business: "Tipo de negocio",
      businessPlaceholder: "Elige tu tipo de negocio",
      businessOptions: [
        "Startup",
        "Pyme",
        "Gran empresa",
        "Agencia / consultora",
        "Autónomo",
        "Sector público",
        "Otro",
      ],
      email: "Email",
      emailPlaceholder: "tu@empresa.com",
      phone: "Teléfono",
      phonePlaceholder: "600 000 000",
      phoneCountry: "Prefijo",
      whatsappNote:
        "Serás contactado por WhatsApp. Si no tienes WhatsApp, te escribiremos por correo.",
      required: "Debes completar este campo",
      invalidEmail: "Introduce un email válido",
      invalidPhone: "Introduce un teléfono válido",
      submit: "Enviar solicitud",
      close: "Cerrar",
      successTitle: "Tu correo está listo para enviar",
      successBody:
        "Abrimos tu aplicación de correo con todo rellenado. Envíalo y te respondemos en menos de 72 horas.",
    },
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
    whatIsNara: {
      kicker: "Qué es Nara Intelligence",
      heading: "Una plantilla que contratas, no una herramienta que configuras.",
      intro:
        "Nara Intelligence construye empleados digitales: agentes de IA diseñados, auditados y desplegados para un trabajo concreto dentro de tu empresa. No recibes una plataforma que aprender. Recibes a alguien que hace el trabajo.",
      whoTitle: "Quiénes somos",
      whoBody1:
        "Somos una empresa de ingeniería con base en España que construye sobre modelos de inteligencia artificial general, en lugar de limitarse a revenderlos. Cada agente que entregamos se diseña alrededor de un proceso real de una empresa real: auditamos cómo se hace hoy el trabajo, definimos dónde un agente puede hacerse cargo de principio a fin, y seguimos dentro mientras lo asume.",
      whoBody2:
        "Construimos la compañía igual que construimos para nuestros clientes. Nuestras propias áreas de desarrollo, finanzas y personas funcionan con la misma estructura de director y especialistas que vendemos, y por eso podemos decirte lo que cuesta de verdad mantener este modelo, y dónde deja de ser la respuesta correcta.",
      sectorsTitle: "Dónde lo hemos hecho",
      sectorsBody:
        "El patrón se repite en empresas muy distintas: un proceso que se come las horas, sin un responsable claro, y nadie con tiempo para arreglarlo. Esa es la forma que tiene un trabajo para un agente.",
      sectors: [
        "Equipos de software y producto",
        "Servicios profesionales",
        "E-commerce y retail",
        "Logística y operaciones",
        "Finanzas y administración",
        "Agencias y consultoras",
      ],
      orgTitle: "Cómo funciona el organigrama",
      orgBody:
        "No gestionas una flota de bots sueltos. Contratas un Director para un área, y el Director gestiona a los especialistas que tiene debajo: la misma vía de escalado que esperarías de un equipo humano.",
      orgYou: "Tu empresa",
      orgYouNote: "Marca los objetivos, aprueba las excepciones",
      orgDirectors: "Agentes directores",
      orgEmployees: "Agentes empleados",
      advantagesTitle: "Por qué funciona así",
      advantages: [
        {
          title: "Un responsable por área",
          body: "El Director responde por el resultado, no solo por ejecutar una tarea. Los problemas escalan a un único sitio en vez de perderse entre herramientas.",
        },
        {
          title: "Los especialistas siguen siendo estrechos",
          body: "Un agente que hace un trabajo bien supera a un asistente general que hace diez trabajos de forma aceptable, y un alcance estrecho sí se puede auditar.",
        },
        {
          title: "Escala sin volver a contratar",
          body: "Añadir capacidad es añadir un especialista bajo un Director que ya existe, no abrir una vacante y esperar tres meses a cubrirla.",
        },
        {
          title: "La disponibilidad deja de ser una variable",
          body: "La revisión ocurre a las 3 de la mañana, la factura sale en festivo, el candidato recibe respuesta el mismo día. Nada espera al lunes.",
        },
      ],
      dataTitle: "Los números detrás de esto",
      dataBody:
        "Preferimos enseñarte la evidencia pública antes que nuestro propio marketing. Cada cifra de abajo enlaza a la organización que la publicó, incluidas las que dicen que este mercado todavía es incipiente.",
      stats: [
        {
          value: "88%",
          label:
            "de las organizaciones declaran haber adoptado IA, según la medida de adopción organizativa del AI Index (2026).",
          source: "Stanford HAI, AI Index 2026",
          href: "https://hai.stanford.edu/ai-index/2026-ai-index-report",
        },
        {
          value: "21,1%",
          label:
            "de las empresas españolas de 10 o más empleados usaban IA a principios de 2025, por encima del 20,0% de media de la UE que publica Eurostat para el mismo año.",
          source: "INE (España), octubre de 2025",
          href: "https://www.ine.es/dyngs/Prensa/ETICCE20241T2025.htm",
        },
        {
          value: "61%",
          label:
            "de los CEOs encuestados afirman estar adoptando agentes de IA hoy y preparándose para desplegarlos a escala (2.000 CEOs en 33 países).",
          source: "IBM Institute for Business Value, mayo de 2025",
          href: "https://newsroom.ibm.com/2025-05-06-ibm-study-ceos-double-down-on-ai-while-navigating-enterprise-hurdles",
        },
        {
          value: "10%",
          label:
            "de las organizaciones declaran un ROI significativo y medible con IA agéntica hasta ahora. Lo que separa los resultados de los pilotos sigue siendo la calidad del despliegue: justo la parte que hacemos nosotros.",
          source: "Deloitte Global, octubre de 2025",
          href: "https://www.deloitte.com/global/en/issues/ai/ai-roi-the-paradox-of-rising-investment-and-elusive-returns.html",
        },
      ],
      charts: [
        {
          title: "Uso de IA en empresas españolas, por sector",
          note: "Empresas de 10 o más empleados, primer trimestre de 2025.",
          source: "INE, Encuesta sobre el uso de TIC en las empresas (octubre de 2025)",
          href: "https://www.ine.es/dyngs/Prensa/ETICCE20241T2025.htm",
          unit: "%",
          bars: [
            { label: "Servicios", value: 25.7 },
            { label: "Industria", value: 17.5 },
            { label: "Construcción", value: 11.4 },
          ],
        },
        {
          title: "Aumento de productividad medido con un asistente de IA",
          note: "Casos resueltos por hora por 5.179 agentes de atención al cliente, estudio de campo con despliegue escalonado.",
          source: "Brynjolfsson, Li y Raymond, NBER Working Paper 31161",
          href: "https://www.nber.org/papers/w31161",
          unit: "%",
          bars: [
            { label: "Trabajadores con menos experiencia", value: 34 },
            { label: "Media de todos los trabajadores", value: 14 },
          ],
        },
      ],
      sourceLabel: "Fuente",
      ctaTitle: "¿Por dónde empezaría el tuyo?",
      ctaBody:
        "Cuéntanos qué proceso se come más horas de tu semana. Te devolvemos qué agente se haría cargo y qué haría falta para desplegarlo.",
    },
    contact: {
      kicker: "Empecemos",
      heading: "Cuéntanos tu cuello de botella. Te devolvemos un plan.",
      subtitle: "Auditoría inicial sin compromiso. Respuesta en menos de 72 horas.",
      cta: "Solicita info — contrata al tuyo ya",
    },
    footer: {
      copyright: "© 2026 Nara Intelligence",
      tagline:
        "Empleados digitales, diseñados y desplegados para las tareas concretas que frenan tu operación.",
      navLabel: "Explora",
      companyLabel: "Compañía",
      contactLabel: "Contacto",
      legalLabel: "Legal",
      privacy: "Política de privacidad",
      terms: "Términos del servicio",
      builtIn: "Hecho en España",
    },
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
