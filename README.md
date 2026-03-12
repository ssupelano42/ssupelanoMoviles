# LugaresApp

Lista de lugares con búsqueda y filtros. Corre en Android y Web.

## Requisitos

- Node.js 18+
- Expo Go en el celular (SDK 54)

## Correr

```bash
npm install
npx expo start
```

- Escaneá el QR con Expo Go → Android
- Presioná `w` → Web

## Estructura

```
app/
├── _layout.tsx      # SafeAreaProvider + Stack
└── index.tsx        # Pantalla principal

constants/
├── Colors.ts        # Paleta
└── places.ts        # Datos y tipos

eslint.config.js
app.json
package.json
tsconfig.json
```
