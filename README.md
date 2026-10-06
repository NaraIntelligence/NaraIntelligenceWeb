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
    use-muted-autoplay.ts
public/assets/        Logo + los tres vídeos de agentes
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
| Fotos de agentes | `public/agents/` + campo `photo` del agente en `copy.ts` |

## Notas de implementación

**Idioma.** El inglés es el idioma por defecto y es lo que renderiza el
servidor. La elección del visitante se guarda en `localStorage` y se aplica en
cliente vía `useSyncExternalStore`, así que no hay desajuste de hidratación ni
parpadeo de idioma. Ningún texto está escrito a pelo en un componente.

**Scroll.** Dos secciones van dirigidas por scroll, ambas con
`useScrollProgress` (limitado por `requestAnimationFrame` para que no compita
con los vídeos):

- *Under the hood* — pista de 250vh con panel sticky. El progreso del scroll
  mueve un `clip-path` que va borrando la carcasa exterior del androide de
  abajo arriba para dejar ver el interior.
- *How it works* — pista de 400vh; cada uno de los cuatro pasos ocupa un
  cuarto. El paso activo se deriva de la posición de scroll durante el render
  (sin estado ni efecto). Los vídeos quedan montados para que el cambio sea un
  crossfade de 1s, pero solo se reproduce el activo.

**Autoplay de vídeo.** `muted` se asigna como *propiedad* del DOM antes de
`play()`, y `play()` se reintenta en `canplay`. Ambas cosas son necesarias para
la política de autoplay de Chrome: el atributo `muted` del HTML/JSX no basta.
Ver `src/lib/use-muted-autoplay.ts`.

**Layout.** `overflow-x: clip` en `.page`, nunca `hidden` — `hidden` en un
ancestro rompe silenciosamente `position: sticky` en las dos secciones de
scroll.

## Assets pendientes

| Dónde | Estado ahora | Cuando llegue el asset |
| --- | --- | --- |
| Under the hood (`Reveal.tsx`) | Desmontada de `page.tsx` (el exterior ya existe; falta un interior que encaje píxel a píxel) | Pon los renders interior/exterior en `Reveal.tsx` y vuelve a montar `<Reveal />` (ver comentario en `page.tsx`). |
| Portada (hero) | Vídeo `hero-agent.mp4` | Imagen pendiente de rehacer. |
| Paso 01 — Contact | Vídeo `step-contact.mp4` | Imagen pendiente de rehacer: añádela a `public/images/steps/` y cambia `STEP_VISUALS[0]` en `HowItWorks.tsx` a `{ kind: "image", src }`. |
| Pasos 02–04 | Imágenes en `public/images/steps/` (2:3, fondo negro; la máscara elíptica de `.steps__image` las funde con el fondo) | — |
| Fotos de agentes | `public/agents/` + campo `photo` del agente en `copy.ts` |

## Notas de implementación

**Idioma.** El inglés es el idioma por defecto y es lo que renderiza el
servidor. La elección del visitante se guarda en `localStorage` y se aplica en
cliente vía `useSyncExternalStore`, así que no hay desajuste de hidratación ni
parpadeo de idioma. Ningún texto está escrito a pelo en un componente.

**Scroll.** Dos secciones van dirigidas por scroll, ambas con
`useScrollProgress` (limitado por `requestAnimationFrame` para que no compita
con los vídeos):

- *Under the hood* — pista de 250vh con panel sticky. El progreso del scroll
  mueve un `clip-path` que va borrando la carcasa exterior del androide de
  abajo arriba para dejar ver el interior.
- *How it works* — pista de 400vh; cada uno de los cuatro pasos ocupa un
  cuarto. El paso activo se deriva de la posición de scroll durante el render
  (sin estado ni efecto). Los vídeos quedan montados para que el cambio sea un
  crossfade de 1s, pero solo se reproduce el activo.

**Autoplay de vídeo.** `muted` se asigna como *propiedad* del DOM antes de
`play()`, y `play()` se reintenta en `canplay`. Ambas cosas son necesarias para
la política de autoplay de Chrome: el atributo `muted` del HTML/JSX no basta.
Ver `src/lib/use-muted-autoplay.ts`.

**Layout.** `overflow-x: clip` en `.page`, nunca `hidden` — `hidden` en un
ancestro rompe silenciosamente `position: sticky` en las dos secciones de
scroll.

## Assets pendientes

| Dónde | Estado ahora | Cuando llegue el asset |
| --- | --- | --- |
| Under the hood (`Reveal.tsx`) | Desmontada de `page.tsx` (el exterior ya existe; falta un interior que encaje píxel a píxel) | Pon los renders interior/exterior en `Reveal.tsx` y vuelve a montar `<Reveal />` (ver comentario en `page.tsx`). |
| Paso 03 — Development | Tarjeta tipográfica (número + título) | Deja el vídeo en `public/assets/`, extrae el póster (`ffmpeg -i x.mp4 -frames:v 1 -q:v 3 x-poster.jpg`) y rellena `STEP_VIDEOS[2]` en `HowItWorks.tsx`. |
| Paso 04 — Flexible payment | Igual | `STEP_VIDEOS[3]`. |
| Fotos de agentes | Monograma con la inicial y el nombre | Sube `public/agents/<nombre>.jpg` y añade `photo: "/agents/<nombre>.jpg"` al agente en `copy.ts` (EN y ES). |
| Sección Company (`About.tsx`) | No se monta | Imagen de equipo. |

## Verificación

Comprobado en Chromium a 360/390/480/640/820/1440px en los dos idiomas: sin
desbordamiento horizontal, el nav cabe en todos los anchos, las dos secciones
de scroll siguen el progreso correctamente y los vídeos de los pasos reciben
`play()`/`pause()` en el orden debido.

El Chromium del contenedor donde se desarrolló no trae decodificador H.264, así
que los `.mp4` salen en negro *solo ahí*; los elementos, las llamadas de
autoplay y el crossfade se verificaron instrumentando `HTMLMediaElement`.
Conviene mirar los vídeos en un navegador real.
