# Nara Intelligence — web

Landing page de Nara Intelligence. Next.js 16 (App Router) · React 19 ·
TypeScript · CSS plano, sin framework de estilos.

Implementada a partir del prototipo de Claude Design que queda archivado en
`design/` como referencia.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run start
npm run lint
```

Requiere Node 18 o superior.

## Variables de entorno

Copia `.env.example` a `.env.local` para desarrollo. En Vercel van en
*Settings → Environment Variables*, marcadas para **Production** y **Preview**.

| Variable | Obligatoria | Para qué |
| --- | --- | --- |
| `RESEND_API_KEY` | Sí* | API key de [Resend](https://resend.com/api-keys) con permiso de envío. |
| `LEAD_TO_EMAIL` | Sí* | Buzón donde llegan los leads (`admin@naraintelligences.com`). Admite varios separados por comas. |
| `LEAD_FROM_EMAIL` | Sí* | Remitente, p. ej. `Nara Intelligence <web@naraintelligences.com>`. Su dominio tiene que estar verificado en Resend. |
| `N8N_WEBHOOK_URL` | No | Si existe, cada lead se envía también aquí por POST (JSON). Si falla, el email sale igual. |
| `N8N_WEBHOOK_SECRET` | No | Se manda en la cabecera `X-Nara-Secret` para que n8n rechace lo que no venga de la web. |
| `NEXT_PUBLIC_SITE_URL` | No | URL canónica (sitemap, robots, Open Graph). Por defecto `https://naraintelligences.com`. |

\* Sin las tres `RESEND_*`/`LEAD_*`, el formulario entrega solo por n8n. Sin
ninguna vía configurada, en local el lead se escribe en la consola y en
producción la API responde 503.

## Formulario de contacto

`src/app/api/lead/route.ts` recibe el formulario. Valida en servidor con las
mismas reglas que el cliente (`src/lib/lead.ts`), descarta en silencio los
envíos que rellenan el honeypot y limita a 5 envíos por IP cada 10 minutos.
Ese límite vive en memoria de cada instancia: frena a un cliente insistente,
no a un ataque distribuido (para eso, Upstash/Vercel KV).

Respuestas: `200 {ok}` · `400 {error:"invalid", fields}` · `429` con
`Retry-After` · `502 delivery_failed` (Resend falló) · `503 not_configured`.

## Flujo de trabajo

`main` es la rama de producción: **todo lo que entra en `main` se despliega
solo en Vercel**. Los cambios llegan por Pull Request, así que cada uno tiene
su propia URL de preview antes de tocar producción.

1. Claude abre una PR con el cambio.
2. Vercel publica un preview y deja la URL como comentario en la PR.
3. Revisas el preview. Si está bien, haces *Merge* → se va a producción.
4. Para retoques pequeños tuyos: `git pull` en VS Code, editas, commit y push.

## Estructura

```
src/
  app/
    layout.tsx        Fuentes, metadata, <LangProvider>
    page.tsx          Composición de secciones
    api/lead/         Endpoint del formulario
    legal/            Aviso legal, privacidad y cookies
    opengraph-image.tsx, icon.png, apple-icon.png, robots.ts, sitemap.ts
    not-found.tsx     404
    globals.css       Todo el estilado — los tokens están arriba del todo
  components/         Un archivo por sección
  lib/
    copy.ts           Copy ES + EN, lista de partners, email de contacto
    legal.ts          Textos legales ES + EN y datos del titular
    lead.ts           Validación del formulario (cliente y servidor)
    site.ts           URL canónica, rutas del sitemap, JSON-LD
    lang-context.tsx  Estado de idioma (inglés por defecto)
    use-scroll-progress.ts
public/
  assets/             Logo
  images/             Portada, pasos (steps/) y Under the hood (reveal/)
  agents/             Retratos de los agentes (los pósters de la plantilla)
design/               Prototipo original de Claude Design (solo referencia)
```

## Dónde tocar cada cosa

| Qué cambiar | Dónde |
| --- | --- |
| Cualquier texto (ES o EN) | `src/lib/copy.ts` |
| Colores, tamaños, espaciados | `src/app/globals.css` (tokens al principio) |
| Lista de partners | `src/lib/copy.ts` → `PARTNERS` |
| Email de contacto | `src/lib/copy.ts` → `CONTACT_EMAIL` |
| Datos del titular (aviso legal, privacidad) | `src/lib/legal.ts` → `LEGAL_ENTITY` |
| Textos legales | `src/lib/legal.ts` |
| Imagen de portada | `public/images/hero.jpg` |
| Imágenes de los pasos | `public/images/steps/` + `STEP_IMAGES` en `HowItWorks.tsx` |
| Under the hood | `public/images/reveal/exterior.jpg` e `interior.jpg` |
| Fotos de agentes | `public/agents/<nombre>.jpg` + campo `photo` del agente en `copy.ts` (EN y ES) |

## Notas de implementación

**Idioma.** El inglés es el idioma por defecto y es lo que renderiza el
servidor. La elección del visitante se guarda en `localStorage` y se aplica en
cliente vía `useSyncExternalStore`, así que no hay desajuste de hidratación ni
parpadeo de idioma. Ningún texto está escrito a pelo en un componente.

**Scroll.** Dos secciones van dirigidas por scroll, ambas con
`useScrollProgress` (limitado por `requestAnimationFrame`):

- *Under the hood* — pista de 250vh con panel sticky. El progreso del scroll
  mueve un `clip-path` que va borrando la capa exterior del androide de abajo
  arriba para dejar ver la interior. Las dos imágenes tienen que tener
  exactamente el mismo encuadre y pose, o se nota un salto en la línea de corte.
- *How it works* — pista de 400vh; cada uno de los cuatro pasos ocupa un
  cuarto. El paso activo se deriva de la posición de scroll durante el render
  (sin estado ni efecto). Las cuatro imágenes quedan montadas para que el
  cambio sea un crossfade de 1s.

**Imágenes sobre fondo negro.** Las de portada y pasos son 2:3 con fondo negro
puro. La página no es negro plano (lleva un resplandor ambiental), así que una
máscara elíptica (`.hero__still`, `.steps__image`) disuelve los bordes; el
contenedor tiene la misma proporción 2:3 para que la máscara se ajuste a la
imagen y no a la caja.

**Layout.** `overflow-x: clip` en `.page`, nunca `hidden` — `hidden` en un
ancestro rompe silenciosamente `position: sticky` en las dos secciones de
scroll.

## Imágenes pendientes de rehacer

Todas están puestas, pero estas son provisionales:

| Imagen | Problema |
| --- | --- |
| `images/hero.jpg` | Tiende la mano en vez de saludar; casi igual que el paso 04. |
| `images/steps/step-1-contact.jpg` | Es la misma imagen que `reveal/exterior.jpg`. |
| `images/reveal/interior.jpg` | No encaja con la exterior (pose distinta): salto visible en la línea de corte. |
| `agents/*.jpg` (las 9) | No corresponden a cada rol y llevan texto, logos de terceros y cifras/reseñas inventadas. Rehacer antes de producción. |

Para sustituir una, basta con reemplazar el archivo con el mismo nombre (2:3,
idealmente 1024×1536, JPG).

## Verificación

Comprobado en Chromium a 360 y 1440px en los dos idiomas: sin desbordamiento
horizontal, el nav cabe en todos los anchos y las dos secciones de scroll
siguen el progreso correctamente.
