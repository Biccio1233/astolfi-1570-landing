# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Astolfi 1570** - Landing page per servizio di consulenza strategica fundraising per il terzo settore.

## Key Files

- `index.html` - Landing page completa con form di contatto
- `Astolfi 1570 - Analisi Cliente.json` - Workflow n8n per elaborazione richieste
- `README.md` - Documentazione repository

## Technical Details

### Landing Page
- **Framework**: TailwindCSS (via CDN)
- **Stile**: Tutto inline per semplicità
- **Form**: Validazione client-side + invio a webhook n8n
- **Animazioni**: CSS animations (gradient, float, pulse)

### Webhook Endpoint
```
http://37.187.150.143:5678/webhook/astolfi1570_proposal
```

### Form Data Structure
```json
{
  "companyName": "string",
  "city": "string", 
  "sector": "string",
  "website": "string",
  "contactName": "string",
  "contactEmail": "string",
  "phone": "string",
  "analysisFocus": "string"
}
```

## Deployment

- **Hosting**: GitHub Pages
- **URL**: https://biccio1233.github.io/astolfi-1570-landing/
- **Repository**: https://github.com/Biccio1233/astolfi-1570-landing

## Development Commands

```bash
# Test locale
open index.html

# Deploy updates
git add .
git commit -m "Update message"
git push
```

## Important Notes

- Il form invia dati al webhook n8n su IP pubblico
- Tutto il codice è in un singolo file index.html per semplicità
- Le animazioni e gradienti sono ottimizzati per performance
- Il design è completamente responsive