import { CONTACT_EMAIL, type Lang } from "./copy";

/* ==========================================================================
 * DATOS DEL TITULAR — rellenar antes de publicar.
 *
 * Aparecen en el aviso legal, la política de privacidad y la de cookies, en
 * los dos idiomas. Cualquier valor que siga empezando por "[" se ve tal cual
 * en la web y hace que `npm run build` avise en el log.
 * ========================================================================== */
export const LEGAL_ENTITY = {
  /** Razón social de la sociedad (p. ej. "Nara Intelligence, S.L.") o, si
   *  eres autónomo, tu nombre y apellidos. */
  holder: "[RAZÓN SOCIAL O NOMBRE Y APELLIDOS DEL TITULAR]",
  /** NIF de la sociedad o del autónomo. */
  taxId: "[NIF]",
  /** Domicilio completo: calle, número, código postal, ciudad, provincia. */
  address: "[DOMICILIO: CALLE, NÚMERO, CP, CIUDAD, PROVINCIA]",
  /** Solo sociedades: "Registro Mercantil de Madrid, Tomo X, Folio Y,
   *  Hoja M-Z". Déjalo vacío ("") si eres autónomo: la línea desaparece. */
  registry: "[DATOS DEL REGISTRO MERCANTIL — vacío si eres autónomo]",
  email: CONTACT_EMAIL,
  website: "naraintelligences.com",
};

/** Fecha que se muestra como "última actualización" en las tres páginas. */
const UPDATED = new Date("2026-10-06T12:00:00Z");

export function legalEntityPending() {
  return Object.values(LEGAL_ENTITY).some((v) => v.startsWith("["));
}

/* ------------------------------------------------------------------------ */

export type LegalDocId = "notice" | "privacy" | "cookies";

/** A paragraph, or a bullet list when it's an array. */
type Block = string | string[];
type Section = { heading: string; body: Block[] };

export type LegalDoc = {
  title: string;
  updated: string;
  intro: string;
  sections: Section[];
};

const e = LEGAL_ENTITY;

function ownerLines(lang: Lang): string[] {
  const en = lang === "en";
  return [
    `${en ? "Owner" : "Titular"}: ${e.holder}`,
    `${en ? "Tax ID (NIF)" : "NIF"}: ${e.taxId}`,
    `${en ? "Registered address" : "Domicilio"}: ${e.address}`,
    ...(e.registry ? [`${en ? "Registry details" : "Datos registrales"}: ${e.registry}`] : []),
    `Email: ${e.email}`,
    `${en ? "Website" : "Sitio web"}: ${e.website}`,
  ];
}

function updated(lang: Lang) {
  const date = UPDATED.toLocaleDateString(lang === "en" ? "en-GB" : "es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
  return lang === "en" ? `Last updated: ${date}` : `Última actualización: ${date}`;
}

const notice: Record<Lang, () => LegalDoc> = {
  en: () => ({
    title: "Legal notice",
    updated: updated("en"),
    intro: `This legal notice governs access to and use of ${e.website} (the "website"), in accordance with Spanish Law 34/2002 on Information Society Services and Electronic Commerce (LSSI-CE).`,
    sections: [
      {
        heading: "1. Who runs this website",
        body: [ownerLines("en")],
      },
      {
        heading: "2. Purpose",
        body: [
          "The website presents Nara Intelligence and its services — the design, training and deployment of AI agents for companies — and lets you request information through a contact form. Nothing on the website is a binding offer: services are agreed case by case in a separate contract.",
        ],
      },
      {
        heading: "3. Terms of use",
        body: [
          "Access to the website is free and does not require registration. By using it you agree to this notice and undertake to use the website and its content lawfully, in good faith and without harming the owner or third parties. In particular, you must not:",
          [
            "send false information or someone else's details through the contact form;",
            "try to access restricted areas, overload the website or interfere with its operation;",
            "introduce viruses or any other harmful code.",
          ],
        ],
      },
      {
        heading: "4. Intellectual and industrial property",
        body: [
          "The texts, design, logo, videos, illustrations and source code of the website belong to the owner or are used under licence. Reproducing, distributing or transforming them without written permission is not allowed, except for private, non-commercial use.",
          'The names and logos shown under "Technologies we work with" belong to their respective owners. They are shown only to identify tools we use in our work and do not imply any partnership, sponsorship or endorsement.',
        ],
      },
      {
        heading: "5. Liability",
        body: [
          "We take care to keep the information on the website accurate and up to date, but it is general in nature and may change without notice. Figures attributed to third parties (studies, statistics) are their authors' responsibility and are linked to the original source.",
          "The owner is not liable for temporary interruptions, technical errors or damage caused by improper use of the website, nor for the content of external websites linked from it.",
        ],
      },
      {
        heading: "6. Links to other websites",
        body: [
          "Links to third-party websites are provided for information only. We do not control those websites and are not responsible for their content or their privacy practices.",
        ],
      },
      {
        heading: "7. Privacy and cookies",
        body: [
          "How we handle personal data is explained in the privacy policy, and what we store in your browser in the cookie policy. Both are linked at the foot of every page.",
        ],
      },
      {
        heading: "8. Applicable law and jurisdiction",
        body: [
          "This notice is governed by Spanish law. Any dispute will be submitted to the courts of the owner's registered address, unless the law grants consumers the right to go to the courts of their own place of residence.",
        ],
      },
    ],
  }),
  es: () => ({
    title: "Aviso legal",
    updated: updated("es"),
    intro: `Este aviso legal regula el acceso y el uso de ${e.website} (el «sitio web»), en cumplimiento de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE).`,
    sections: [
      {
        heading: "1. Titular del sitio web",
        body: [ownerLines("es")],
      },
      {
        heading: "2. Objeto",
        body: [
          "El sitio web presenta Nara Intelligence y sus servicios —diseño, entrenamiento y despliegue de agentes de inteligencia artificial para empresas— y permite solicitar información mediante un formulario de contacto. Nada de lo publicado constituye una oferta vinculante: los servicios se acuerdan en cada caso mediante contrato aparte.",
        ],
      },
      {
        heading: "3. Condiciones de uso",
        body: [
          "El acceso al sitio web es gratuito y no requiere registro. Al usarlo aceptas este aviso y te comprometes a hacer un uso lícito, de buena fe y sin perjuicio para el titular ni para terceros. En particular, no está permitido:",
          [
            "enviar a través del formulario información falsa o datos de otra persona;",
            "intentar acceder a zonas restringidas, sobrecargar el sitio web o interferir en su funcionamiento;",
            "introducir virus o cualquier otro código dañino.",
          ],
        ],
      },
      {
        heading: "4. Propiedad intelectual e industrial",
        body: [
          "Los textos, el diseño, el logotipo, los vídeos, las ilustraciones y el código fuente del sitio web pertenecen al titular o se usan con licencia. No se permite su reproducción, distribución o transformación sin autorización escrita, salvo para uso privado y no comercial.",
          "Los nombres y logotipos que aparecen en «Tecnologías con las que trabajamos» pertenecen a sus respectivos titulares. Se muestran únicamente para identificar herramientas que usamos en nuestro trabajo y no implican ninguna asociación, patrocinio ni respaldo.",
        ],
      },
      {
        heading: "5. Responsabilidad",
        body: [
          "Cuidamos que la información del sitio web sea correcta y esté actualizada, pero tiene carácter general y puede cambiar sin previo aviso. Las cifras atribuidas a terceros (estudios, estadísticas) son responsabilidad de sus autores y se enlazan a su fuente original.",
          "El titular no responde de interrupciones temporales, errores técnicos o daños derivados de un uso indebido del sitio web, ni del contenido de los sitios externos enlazados desde él.",
        ],
      },
      {
        heading: "6. Enlaces a otros sitios",
        body: [
          "Los enlaces a sitios de terceros se ofrecen solo a título informativo. No controlamos esos sitios y no somos responsables de sus contenidos ni de sus prácticas de privacidad.",
        ],
      },
      {
        heading: "7. Privacidad y cookies",
        body: [
          "Cómo tratamos los datos personales se explica en la política de privacidad, y qué guardamos en tu navegador, en la política de cookies. Ambas están enlazadas al pie de cada página.",
        ],
      },
      {
        heading: "8. Legislación aplicable y jurisdicción",
        body: [
          "Este aviso se rige por la legislación española. Cualquier controversia se someterá a los juzgados y tribunales del domicilio del titular, salvo que la normativa reconozca a la persona consumidora el derecho a acudir a los de su propio domicilio.",
        ],
      },
    ],
  }),
};

const privacy: Record<Lang, () => LegalDoc> = {
  en: () => ({
    title: "Privacy policy",
    updated: updated("en"),
    intro:
      "This policy explains what personal data we collect through this website, why, and what rights you have over it, in accordance with the General Data Protection Regulation (EU) 2016/679 (GDPR) and Spanish Organic Law 3/2018 (LOPDGDD).",
    sections: [
      {
        heading: "1. Data controller",
        body: [ownerLines("en")],
      },
      {
        heading: "2. What data we collect",
        body: [
          "Only what you type into the request-info form:",
          [
            "name;",
            "email address;",
            "phone number and country code;",
            "field of interest and business type;",
            "the agent you asked about, if you came from an agent's profile;",
            "the language of the page and the page you sent it from.",
          ],
          "All form fields are required: without them we can't answer your request. Please don't include sensitive data (health, ideology, etc.) — we don't need it.",
          "When you send the form, our server also uses your IP address for a few minutes to stop abuse (at most five submissions every ten minutes). It is held in memory only and is not stored with your request. Our hosting provider keeps standard technical logs for security.",
          "We don't collect data from people under 14. If you are under 14, please don't use the form.",
        ],
      },
      {
        heading: "3. Why we use it",
        body: [
          "To answer your request for information and, as the form says, to contact you about it by WhatsApp or, if you don't use WhatsApp, by email — for example to arrange the initial audit you asked for.",
          "We don't use your data for automated decisions or profiling, and we won't send you newsletters or advertising unless you ask for them separately.",
        ],
      },
      {
        heading: "4. Legal basis",
        body: [
          "Your consent (article 6.1.a GDPR), which you give by ticking the box in the form. You can withdraw it at any time by writing to us; withdrawing it does not affect anything done before.",
          "If the conversation leads to a contract, the data needed for it will be processed on the basis of that contract (article 6.1.b GDPR).",
        ],
      },
      {
        heading: "5. How long we keep it",
        body: [
          "For as long as it takes to deal with your request and follow it up, and at most 12 months after our last contact if no business relationship results. If you become a client, the data becomes part of that relationship and is kept while it lasts and, afterwards, for the periods required by law (for example, tax and commercial obligations). After that it is deleted.",
        ],
      },
      {
        heading: "6. Who else handles it",
        body: [
          "We don't sell or give your data to anyone. To run the website and answer you, we rely on these providers, who process data only on our instructions under a data processing agreement:",
          [
            "Vercel Inc. (United States) — hosting of the website and of the server that receives the form; cookie-free, aggregated visit statistics.",
            "Resend (United States) — delivery of each form submission to our inbox by email.",
            "n8n GmbH (Germany) — automation tool we use to log and route requests internally.",
            "Google Ireland Ltd. (Google Workspace) — the mailbox where we receive and answer your request.",
            "WhatsApp Ireland Ltd. — only if we contact you by WhatsApp, as the form explains.",
          ],
          "Some of these providers may process data in the United States. Those transfers are covered by the European Commission's standard contractual clauses and, where the provider is certified, by the EU–US Data Privacy Framework.",
          "We will disclose data to public authorities only when legally required to.",
        ],
      },
      {
        heading: "7. Your rights",
        body: [
          "You can, at any time and free of charge:",
          [
            "access your data and know how we use it;",
            "have it corrected if it is wrong, or deleted;",
            "object to its use or ask us to restrict it;",
            "receive it in a portable format (portability);",
            "withdraw your consent.",
          ],
          `Write to ${e.email} with the subject "Data protection", saying which right you want to exercise. If we can't identify you from your email, we may ask you to prove your identity. We will reply within one month.`,
          "If you think we haven't handled your data properly, you can complain to the Spanish Data Protection Agency (Agencia Española de Protección de Datos, C/ Jorge Juan 6, 28001 Madrid, https://www.aepd.es).",
        ],
      },
      {
        heading: "8. Security",
        body: [
          "The website is served only over HTTPS, the form is protected against automated abuse, and access to the requests we receive is limited to the people who need to answer them.",
        ],
      },
      {
        heading: "9. Changes to this policy",
        body: [
          "If we change how we process data, we will update this page and its date. If the change is significant, we will ask for your consent again where the law requires it.",
        ],
      },
    ],
  }),
  es: () => ({
    title: "Política de privacidad",
    updated: updated("es"),
    intro:
      "Esta política explica qué datos personales recogemos a través de este sitio web, para qué y qué derechos tienes sobre ellos, conforme al Reglamento General de Protección de Datos (UE) 2016/679 (RGPD) y a la Ley Orgánica 3/2018 de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD).",
    sections: [
      {
        heading: "1. Responsable del tratamiento",
        body: [ownerLines("es")],
      },
      {
        heading: "2. Qué datos recogemos",
        body: [
          "Solo los que escribes en el formulario de solicitud de información:",
          [
            "nombre;",
            "correo electrónico;",
            "teléfono y prefijo del país;",
            "área de interés y tipo de negocio;",
            "el agente por el que preguntas, si llegas desde su perfil;",
            "el idioma de la página y la página desde la que lo envías.",
          ],
          "Todos los campos del formulario son obligatorios: sin ellos no podemos atender tu solicitud. Por favor, no incluyas datos sensibles (salud, ideología, etc.): no los necesitamos.",
          "Al enviar el formulario, nuestro servidor usa además tu dirección IP durante unos minutos para evitar abusos (como máximo cinco envíos cada diez minutos). Se mantiene solo en memoria y no se guarda junto a tu solicitud. Nuestro proveedor de alojamiento conserva los registros técnicos habituales por seguridad.",
          "No recogemos datos de menores de 14 años. Si tienes menos de 14 años, no uses el formulario.",
        ],
      },
      {
        heading: "3. Para qué los usamos",
        body: [
          "Para responder a tu solicitud de información y, como indica el formulario, contactarte sobre ella por WhatsApp o, si no usas WhatsApp, por correo electrónico; por ejemplo, para concertar la auditoría inicial que nos pides.",
          "No usamos tus datos para tomar decisiones automatizadas ni para elaborar perfiles, y no te enviaremos boletines ni publicidad salvo que nos lo pidas por separado.",
        ],
      },
      {
        heading: "4. Base legal",
        body: [
          "Tu consentimiento (artículo 6.1.a del RGPD), que das al marcar la casilla del formulario. Puedes retirarlo en cualquier momento escribiéndonos; retirarlo no afecta a lo hecho antes.",
          "Si la conversación termina en un contrato, los datos necesarios para él se tratarán con base en ese contrato (artículo 6.1.b del RGPD).",
        ],
      },
      {
        heading: "5. Cuánto tiempo los conservamos",
        body: [
          "El tiempo necesario para atender tu solicitud y hacer su seguimiento y, como máximo, 12 meses desde nuestro último contacto si no surge una relación comercial. Si te conviertes en cliente, los datos pasan a formar parte de esa relación y se conservan mientras dure y, después, durante los plazos que exige la ley (por ejemplo, obligaciones fiscales y mercantiles). Pasado ese tiempo, se eliminan.",
        ],
      },
      {
        heading: "6. Quién más interviene",
        body: [
          "No vendemos ni cedemos tus datos. Para que el sitio web funcione y poder responderte, contamos con estos proveedores, que tratan los datos solo siguiendo nuestras instrucciones y con un contrato de encargo de tratamiento:",
          [
            "Vercel Inc. (Estados Unidos): alojamiento del sitio web y del servidor que recibe el formulario; estadísticas de visitas agregadas y sin cookies.",
            "Resend (Estados Unidos): entrega por correo electrónico de cada solicitud a nuestro buzón.",
            "n8n GmbH (Alemania): herramienta de automatización con la que registramos y organizamos internamente las solicitudes.",
            "Google Ireland Ltd. (Google Workspace): el buzón donde recibimos y respondemos tu solicitud.",
            "WhatsApp Ireland Ltd.: solo si te contactamos por WhatsApp, como indica el formulario.",
          ],
          "Algunos de estos proveedores pueden tratar datos en Estados Unidos. Esas transferencias están amparadas por las cláusulas contractuales tipo de la Comisión Europea y, cuando el proveedor está adherido, por el Marco de Privacidad de Datos UE-EE. UU.",
          "Solo comunicaremos datos a autoridades públicas cuando la ley nos obligue.",
        ],
      },
      {
        heading: "7. Tus derechos",
        body: [
          "Puedes, en cualquier momento y de forma gratuita:",
          [
            "acceder a tus datos y saber cómo los usamos;",
            "rectificarlos si son incorrectos, o suprimirlos;",
            "oponerte a su tratamiento o pedirnos que lo limitemos;",
            "recibirlos en un formato portable (portabilidad);",
            "retirar tu consentimiento.",
          ],
          `Escríbenos a ${e.email} con el asunto «Protección de datos», indicando qué derecho quieres ejercer. Si no podemos identificarte por tu correo, podremos pedirte que acredites tu identidad. Te responderemos en el plazo de un mes.`,
          "Si consideras que no hemos tratado bien tus datos, puedes reclamar ante la Agencia Española de Protección de Datos (C/ Jorge Juan 6, 28001 Madrid, https://www.aepd.es).",
        ],
      },
      {
        heading: "8. Seguridad",
        body: [
          "El sitio web se sirve solo por HTTPS, el formulario está protegido frente a abusos automatizados y el acceso a las solicitudes que recibimos está limitado a las personas que tienen que responderlas.",
        ],
      },
      {
        heading: "9. Cambios en esta política",
        body: [
          "Si cambiamos la forma de tratar los datos, actualizaremos esta página y su fecha. Si el cambio es relevante, volveremos a pedir tu consentimiento cuando la ley lo exija.",
        ],
      },
    ],
  }),
};

const cookies: Record<Lang, () => LegalDoc> = {
  en: () => ({
    title: "Cookie policy",
    updated: updated("en"),
    intro:
      "This website does not use cookies to track you, analyse you or show you advertising. That's why there is no cookie banner. This page explains the little we do store and how we measure visits.",
    sections: [
      {
        heading: "1. What cookies are",
        body: [
          "Cookies and similar technologies (such as your browser's local storage) are small files or entries that a website saves on your device. Under article 22.2 of the LSSI-CE, those that are strictly necessary for a service you have asked for don't need consent; all others do.",
        ],
      },
      {
        heading: "2. What this website stores",
        body: [
          [
            'nara-lang (local storage, no expiry) — remembers whether you chose English or Spanish so the next page opens in the same language. Technical, set only when you press the language switch, never sent to any server and never shared.',
          ],
          "We don't set any cookies of our own, and we don't load third-party advertising, social-media or tracking cookies.",
        ],
      },
      {
        heading: "3. How we measure visits",
        body: [
          "We use Vercel Web Analytics, which works without cookies and without storing anything on your device. It records aggregated, anonymous figures — pages visited, referring site, country, browser and device type — that don't identify you and don't follow you across other websites.",
        ],
      },
      {
        heading: "4. How to delete what we store",
        body: [
          'You can delete the language preference at any time from your browser settings (usually under "Privacy" → "Cookies and site data") by clearing the data for this website. The only effect is that the site will open in English again.',
        ],
      },
      {
        heading: "5. Changes",
        body: [
          "If we ever add cookies that require consent, we will update this policy and ask for your consent before setting them.",
        ],
      },
    ],
  }),
  es: () => ({
    title: "Política de cookies",
    updated: updated("es"),
    intro:
      "Este sitio web no usa cookies para seguirte, analizarte ni mostrarte publicidad. Por eso no ves un banner de cookies. Esta página explica lo poco que guardamos y cómo medimos las visitas.",
    sections: [
      {
        heading: "1. Qué son las cookies",
        body: [
          "Las cookies y tecnologías similares (como el almacenamiento local del navegador) son pequeños archivos o entradas que un sitio web guarda en tu dispositivo. Según el artículo 22.2 de la LSSI-CE, las estrictamente necesarias para prestar un servicio que has pedido no requieren consentimiento; el resto, sí.",
        ],
      },
      {
        heading: "2. Qué guarda este sitio web",
        body: [
          [
            "nara-lang (almacenamiento local, sin caducidad): recuerda si elegiste inglés o español para que la siguiente página se abra en el mismo idioma. Es técnica, solo se crea cuando pulsas el selector de idioma, nunca se envía a ningún servidor y no se comparte.",
          ],
          "No instalamos cookies propias ni cargamos cookies de terceros de publicidad, redes sociales o seguimiento.",
        ],
      },
      {
        heading: "3. Cómo medimos las visitas",
        body: [
          "Usamos Vercel Web Analytics, que funciona sin cookies y sin guardar nada en tu dispositivo. Registra cifras agregadas y anónimas —páginas visitadas, sitio de procedencia, país, navegador y tipo de dispositivo— que no te identifican ni te siguen por otros sitios web.",
        ],
      },
      {
        heading: "4. Cómo borrar lo que guardamos",
        body: [
          "Puedes borrar la preferencia de idioma cuando quieras desde la configuración de tu navegador (normalmente en «Privacidad» → «Cookies y datos de sitios»), eliminando los datos de este sitio web. El único efecto es que la web volverá a abrirse en inglés.",
        ],
      },
      {
        heading: "5. Cambios",
        body: [
          "Si algún día añadimos cookies que requieran consentimiento, actualizaremos esta política y te lo pediremos antes de instalarlas.",
        ],
      },
    ],
  }),
};

const DOCS: Record<LegalDocId, Record<Lang, () => LegalDoc>> = { notice, privacy, cookies };

export function getLegalDoc(id: LegalDocId, lang: Lang): LegalDoc {
  return DOCS[id][lang]();
}
