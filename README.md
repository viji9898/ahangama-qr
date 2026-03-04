# qr.ahangama.com

A lightweight redirect service powering all Ahangama QR codes and trackable campaign links.

This service converts short structured URLs into tracked Ahangama.com visits with consistent UTM attribution.

Example:

https://qr.ahangama.com/v/fruit-cafe/s/ps

Redirects to:

https://ahangama.com/?utm_source=qr&utm_medium=offline&utm_campaign=qr_launch_2026&utm_content=fruit-cafe__ps&utm_term=h

---

# Purpose

This system enables:

- Venue-level QR tracking
- Surface-level tracking (postcard stand, coaster, table, etc.)
- Creative A/B testing
- Goal-based routing (pass, guide, whatsapp)
- Offline + online attribution
- Future campaign switching without reprinting QRs
- Clean short URLs for better QR performance

---

# Architecture

- Netlify Functions micro-service
- No frontend
- No build step
- No SPA routing
- Single redirect function

All traffic is routed to:

/.netlify/functions/redirect

via netlify.toml.

---

# URL Structure

Readable venue names.
Abbreviated control parameters.

## Base Pattern

/v/:venueSlug

Example:

/v/fruit-cafe

---

## Venue + Surface (Recommended Standard)

/v/:venueSlug/s/:surfaceCode

Example:

/v/fruit-cafe/s/ps

---

## Venue + Surface + Creative Variant

/v/:venueSlug/s/:surfaceCode/c/:creativeCode

Example:

/v/fruit-cafe/s/ps/c/a

---

## Goal-Based Routing (Optional)

/g/:goalCode/v/:venueSlug/s/:surfaceCode

Example:

/g/p/v/fruit-cafe/s/tb

---

# Surface Codes (Locked Vocabulary)

Keep consistent naming across all venues.

| Surface        | Code |
| -------------- | ---- |
| postcard-stand | ps   |
| coaster        | co   |
| table          | tb   |
| menu           | mn   |
| reception      | rc   |
| bill-folder    | bf   |
| mirror         | mr   |
| wifi-card      | wf   |
| room-card      | rm   |
| sticker        | st   |

Important:
All postcard stand QRs must use:

s/ps

Example:

/v/kaffi/s/ps

---

# Goal Codes

| Goal           | Code |
| -------------- | ---- |
| home (default) | h    |
| pass           | p    |
| guide          | gd   |
| whatsapp       | wa   |

If no goal is specified, default = h.

---

# UTM Strategy

Every redirect appends:

- utm_source = qr
- utm_medium = offline
- utm_campaign = qr_launch_2026
- utm_content = venue**surface**creative
- utm_term = goal

Example:

utm_content=fruit-cafe\_\_ps
utm_term=h

GA4 segmentation enables:

- Venue performance comparison
- Surface performance comparison
- Creative A/B testing
- Intent tracking (pass vs guide)
- Campaign-level reporting

---

# Local Development

If running locally on:

http://localhost:54707

Examples:

Postcard Stand:

http://localhost:54707/v/fruit-cafe/s/ps

Coaster:

http://localhost:54707/v/kaffi/s/co

Pass-focused Table:

http://localhost:54707/g/p/v/fruit-cafe/s/tb

Creative Variant:

http://localhost:54707/v/palm-garden-ayurveda/s/ps/c/b

---

# Deployment

1. Push repository to GitHub
2. Connect repository to Netlify
3. No build command required
4. Publish directory = "."
5. Add custom domain: qr.ahangama.com
6. Add DNS CNAME:

qr → <netlify-site>.netlify.app

SSL auto-provisions.

---

# Rollout Strategy

Phase 1:

- One QR per venue
- Surface = ps only

Phase 2:

- Add coaster + table tracking

Phase 3:

- Add creative variants (c/a, c/b)

Phase 4:

- Add scan logging + vendor analytics dashboard

---

# Governance Rules

- Venue slug must match main Ahangama.com slug
- Surface codes must follow locked vocabulary
- Creative codes should be short (a, b, v1, v2)
- Never change abbreviations once printed
- Campaign name should only change centrally in redirect function

---

# Why This Matters

This system allows Ahangama to:

- Scale to 100+ venues
- Track offline performance accurately
- Compare placement effectiveness
- Optimize creative design
- Attribute revenue to physical surfaces
- Maintain clean QR design

---

# Maintainer

Ahangama.com  
Tech For Good Pvt Ltd
