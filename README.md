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
    globals.css       Todo el estilado — los tokens están arriba del todo
  components/         Un archivo por sección
  lib/
    copy.ts           Copy ES + EN, lista de partners, email de contacto
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

Cinco visuales siguen como placeholders (`<ImagePlaceholder>`) porque todavía
no hay render para ellos. Cada uno es un cambio directo: el layout y el
comportamiento de scroll de alrededor no cambian.

| Dónde | Componente | Falta |
| --- | --- | --- |
| Under the hood, capa de atrás | `Reveal.tsx` | Render del interior del androide |
| Under the hood, capa de delante | `Reveal.tsx` | Render del exterior del androide |
| Paso 03 — Development | `HowItWorks.tsx` (`STEP_VIDEOS[2]`) | Vídeo |
| Paso 04 — Flexible payment | `HowItWorks.tsx` (`STEP_VIDEOS[3]`) | Vídeo |
| Sección Company | `About.tsx` | Imagen de equipo/agente |

Para los dos vídeos de pasos: deja los archivos en `public/assets/` y rellena
los `null` de `STEP_VIDEOS` — el crossfade y el play/pause ya están resueltos.

La cinta de partners renderiza los nombres como texto. Durante el diseño nunca
se consiguieron los logos oficiales; si aparecen, sustituye el `<span>` de
`PartnerMarquee.tsx` por `<Image>` y mantén la estructura de dos grupos para
que el bucle de `-50%` siga siendo continuo.

## Verificación

Comprobado en Chromium a 360/390/480/640/820/1440px en los dos idiomas: sin
desbordamiento horizontal, el nav cabe en todos los anchos, las dos secciones
de scroll siguen el progreso correctamente y los vídeos de los pasos reciben
`play()`/`pause()` en el orden debido.

El Chromium del contenedor donde se desarrolló no trae decodificador H.264, así
que los `.mp4` salen en negro *solo ahí*; los elementos, las llamadas de
autoplay y el crossfade se verificaron instrumentando `HTMLMediaElement`.
Conviene mirar los vídeos en un navegador real.
