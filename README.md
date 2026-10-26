# कवि कमल भट्ट 'साहेब' — काव्य पोर्टफोलियो (Astro + React)

हिंदी काव्य की एक सच्ची, समाज-संवेदनशील आवाज़। मेलखेड़ा, मंदसौर, मध्य प्रदेश।

PixelAimm क्वालिटी की Astro साइट — कविताएँ, जीवन परिचय, गैलरी, पुरस्कार और संपर्क।

## Run
```bash
npm install
npm run dev      # http://localhost:4323
npm run build    # static site in dist/
npm run preview
```

## Edit
- **Poet info & contact:** `src/config.js`
- **Poems, awards, gallery, timeline, education:** `src/data.js`
- **Page copy:** `src/pages/*.astro`
- **Styles (ink & gold design system):** `src/styles/global.css`
- **Interactive UI:** `src/components/*.jsx` (React islands)
- **Domain:** set `site` in `astro.config.mjs`
