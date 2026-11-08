# DJ el mero mero

Sitio estático en Astro para publicar en GitHub Pages.

## Editar los mixes

Abre `src/scripts/site.js` y edita los objetos del arreglo `mixes`. Cada mix usa estos campos:

```js
{
  nombre: "Nombre del mix",
  imagen: "/mixes/portada.jpg",
  urlYouTube: "https://www.youtube.com/watch?v=...",
  generos: "Cumbia · salsa",
  fecha: "Noviembre de 2026",
  duracion: "45 min",
}
```

Guarda las portadas nuevas dentro de `public/` y escribe su ruta desde la raíz, por ejemplo `/mixes/portada.jpg`. Para agregar otro mix, duplica un objeto dentro del arreglo. Si `imagen` queda vacía o la ruta no existe, se muestra el espacio reservado para portada.

## Cambiar textos y enlaces

- El título, biografía, teléfono, redes y condiciones están en `src/pages/index.astro`.
- Los colores, tamaños, distribución y ajustes para móvil están en `src/styles/global.css`, en especial las variables al comienzo del archivo.
- Reemplaza `public/favicon-light.svg` y `public/favicon-dark.svg` por tus iconos para tener una variante automática para cada tema del navegador. Conserva esos nombres o actualiza los dos enlaces de icono del `<head>`.
- Instagram está marcado como próximamente hasta que tengas el perfil.

## Ver y compilar

```sh
npm install
npm run dev
npm run build
```

El sitio compilado queda en `dist/`. El repositorio `EiquerS.github.io` se publica como un sitio de usuario/organización, así que el proyecto conserva rutas desde la raíz y no requiere un `base` de subcarpeta.

El flujo de GitHub Actions compila y publica cada actualización de `main`. Para activarlo por primera vez, en GitHub abre **Settings → Pages → Build and deployment → Source** y selecciona **GitHub Actions**.
