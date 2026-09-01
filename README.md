# Windy — sitio web

## Qué es esto
El código de la página de Windy, lista para subir a GitHub y conectar con Netlify.

## Pendiente antes de publicar
- Reemplazar las fotos en `src/assets/` (hero y las 6 galletas) por las fotos reales, manteniendo el mismo nombre de archivo.
- Completar Nombre, RUT y Email en `src/App.tsx` (sección "Pago").
- Actualizar la lista de productos en `src/App.tsx` cuando lleguen galletas, loaf y postres de autor definitivos.

## Cómo se publica (una vez subido a GitHub)
En Netlify: "Add new site" → "Import an existing project" → conectar este repositorio.
- Comando de build: `npm run build`
- Carpeta a publicar: `dist`

Netlify va a reconstruir el sitio solo cada vez que se suba un cambio a GitHub.

## Desarrollo local (opcional, si alguna vez quieres ver cambios antes de subir)
```
npm install
npm run dev
```
