---
name: code-reviewer
description: Chequeo final de calidad para el proyecto supermercado-landing (Don Toto DA+), específico de este repo (Next.js 14 App Router + TypeScript + Tailwind con tokens brand.*). Actúa como un ingeniero de sistemas senior haciendo la última pasada antes de entregar. Usar SIEMPRE después de crear o editar cualquier archivo .ts/.tsx/.css/.js de configuración en este proyecto, y correrla como último paso antes de decir que una tarea está terminada, lista, o funcionando — no solo cuando el usuario pide explícitamente una "revisión" o "code review". Cubre tres cosas en un solo paso: errores de TypeScript/compilación (vía tsc y next lint), código duplicado o mal formado (declaraciones repetidas, imports sin usar, lógica copy-pasteada que debería extraerse), y consistencia visual con la marca (jerarquía, contraste, uso correcto de brand.orange/blue/navy/dark en vez de colores sueltos). Complementa a code-review y web-design-guidelines — no las reemplaza, es el gate rápido y específico de este repo.
---

# Code Reviewer — Don Toto DA+

Esta skill es el último filtro antes de decir "listo" en el proyecto `supermercado-landing`. Un ingeniero senior no entrega un cambio sin correrlo, leerlo de nuevo y mirarlo con ojos de diseño — esta skill reproduce esas tres pasadas. Vive en `.claude/skills/` de este repo (no es global) porque los checks de marca y convenciones son específicos de este proyecto: no tiene sentido en otro codebase.

**Cuándo correrla:** después de cualquier cambio de código en este proyecto, y siempre como paso final antes de reportar una tarea como terminada — incluso si el usuario no la pidió por nombre. Si el cambio es solo copy/texto sin tocar JSX, clases o lógica, alcanza con la Pasada 1 (igual corré typecheck/lint, son gratis).

Nota: esto es una skill, no un hook — depende de que la invoques por criterio propio en el momento correcto. Si en algún punto el chequeo se salta sistemáticamente al cerrar tareas, es señal de que hace falta un hook de verdad (`Stop` o `PostToolUse` en `settings.json`, vía la skill `update-config`) en vez de confiar en que se recuerde sola.

## Pasada 1 — Compilación y tipos

Correr, en la raíz del repo:

```
npm run typecheck
npm run lint
```

- `typecheck` (`tsc --noEmit`) tiene `noUnusedLocals` y `noUnusedParameters` activados — además de errores de tipos, esto solo ya marca imports y variables declaradas sin usar como error de compilación. Es la forma más barata de agarrar la mayoría de "código mal formado": si algo está duplicado a nivel de módulo (una constante, un componente) o mal cerrado, `tsc` lo tira como error acá, no hace falta leerlo a ojo.
- `lint` (`next lint` con `next/core-web-vitals`) cubre reglas de React/Next: hooks mal usados, `<img>` en vez de `next/image`, accesibilidad básica de JSX, etc.

Si cualquiera de los dos falla, ese es el hallazgo más importante — reportalo primero, con el mensaje de error tal cual lo dio la herramienta y en qué archivo/línea. No sigas a la Pasada 3 si hay errores de compilación sin resolver: no tiene sentido revisar el diseño de algo que no corre.

## Pasada 2 — Duplicación y estructura

Lo que `tsc`/`lint` no agarran porque no son errores sintácticos, hay que leerlo:

- **Lógica o JSX repetido entre archivos** que debería vivir en `lib/` o `components/` — este proyecto ya tiene ese patrón (`lib/catalogo.ts` para datos compartidos, `components/` para UI compartida como `SiteHeader`). Si un cambio copia un bloque que ya existe en otro lado (una card de producto, un mapeo de colores, un array de datos) en vez de importarlo, señalalo.
- **Inconsistencia con el resto del repo**: nombres de archivos, convención de props, uso de `"use client"` solo donde hace falta interactividad (el resto son server components por defecto en App Router), spanish/camelCase consistente con el resto del código (el proyecto usa nombres en español: `productos`, `categoria`, `precio`).
- **Server vs. client innecesario**: si un componente nuevo tiene `"use client"` pero no usa `useState`/`useEffect`/handlers de evento, marcalo — es una regresión de performance sin razón.
- Mirá el diff real de lo que cambiaste (no relees todo el repo de cero) — `git diff` si hay git inicializado, o los archivos que tocaste en la conversación si no.

## Pasada 3 — Diseño y marca

Los tokens de marca están en `tailwind.config.js` bajo `theme.extend.colors.brand`:

| Token | Hex | Uso típico en el proyecto |
|---|---|---|
| `brand.orange` | `#F07E26` | acentos, CTAs, badges de oferta |
| `brand.blue` | `#004AAD` | acciones secundarias, precios |
| `brand.navy` | `#0D2B63` | texto de marca, headers, secciones oscuras |
| `brand.dark` | `#022353` | footer, fondo más oscuro |

Chequeá:

- **Colores fuera de paleta**: cualquier hex literal (`#...`), o clase Tailwind de color que no sea `brand-*`/`white`/`gray-*` (ej. `text-blue-500`, `bg-red-600`) es sospechoso — este proyecto no tiene paleta "genérica" de Tailwind en su diseño, todo pasa por `brand.*`. Si aparece un color nuevo, preguntate si debería ser uno de los cuatro tokens en vez de inventar uno.
- **Contraste texto/fondo**: texto blanco solo sobre `brand.navy`/`brand.dark`/`brand.orange`/`brand.blue` (fondos oscuros o saturados) — nunca blanco sobre blanco ni gris claro sobre gris claro. Texto `brand.navy` o `gray-500`/`gray-700` sobre fondos claros (`white`, `gray-50`).
- **Jerarquía visual**: un H2 de sección debe ser más grande/bold que el copy debajo (patrón del repo: `text-xl font-bold sm:text-2xl` para títulos de sección, `text-sm text-gray-500` para descripciones). Un precio o CTA nuevo debería destacar más que texto secundario, no al revés.
- **Espaciado y ritmo consistente**: el repo usa `px-5 sm:px-8` (a veces `lg:px-16`) como padding horizontal de sección y `py-8`/`py-10` vertical, `rounded-2xl` para cards, `shadow-sm`/`shadow-md` para elevación. Un componente nuevo que rompe ese ritmo (paddings arbitrarios, `rounded-md` suelto entre `rounded-2xl`) se nota como inconsistente aunque compile perfecto.
- **Mobile-first**: el proyecto es explícitamente mobile-first para tráfico de Ads — cualquier elemento nuevo debería verse bien primero en el layout de una columna angosta antes que en desktop. Si solo pensaste el diseño para pantallas grandes, marcalo.

Esta pasada es la más subjetiva — no hace falta ser exhaustivo con cada pixel, pero sí señalar cualquier cosa que un ojo entrenado notaría de inmediato como "no pega con el resto del sitio".

## Reporte

Estructura la respuesta así (en español, como el resto del proyecto):

```
## Revisión de código

### 🔴 Bloqueante (rompe compilación o el build)
- [archivo:línea] Qué está mal → por qué importa → cómo arreglarlo
  (o "Ninguno — typecheck y lint pasan limpio.")

### 🟡 Duplicación / estructura
- [archivo] ...
  (o "Sin hallazgos.")

### 🎨 Diseño / marca
- [archivo] ...
  (o "Consistente con la marca — sin hallazgos.")
```

Si las tres pasadas salen limpias, decilo en una línea y seguí — no hace falta inflar el reporte cuando no hay nada que decir. Si encontrás algo, arreglalo vos mismo cuando sea un fix directo (import sin usar, color fuera de paleta, padding inconsistente) en vez de solo señalarlo; dejá el hallazgo solo como reporte cuando el arreglo implica una decisión de producto/diseño que le corresponde al usuario.
