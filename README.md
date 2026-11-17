> **Live demo:** https://arshak-p.github.io/seenteco-consultancy/
> The demo copy is built with `NEXT_PUBLIC_BASE=/seenteco-consultancy NEXT_PUBLIC_DEMO=1`: it lives under a sub-path, the forms send nothing, and search engines are told not to index it. The real website is https://seenteco.com (the normal build, `npm run build`, needs neither setting).

# Seenteco website

Corporate website for **Seenteco Consultancy** (Riyadh, Saudi Arabia): sustainability, energy, technology, operational excellence, government advisory and agriculture consulting. Live at https://seenteco.com.

Built by **Colour Parrot Advertising LLP** (designed by Aadhil, developed by Arshak P).

This file explains what the site is, how it is built, how to change it, how to deploy it and what is still open.

---

## 1. At a glance

| | |
|---|---|
| Type | Static website (HTML/CSS/JS files), no server code except one PHP form handler |
| Framework | **Next.js 15** (App Router) + **React 19**, `output: 'export'` |
| Languages | JavaScript (JSX), CSS, PHP (form only), JSON (data) |
| Hosting | Hostinger shared hosting (Apache/LiteSpeed + PHP), SSL active |
| Language of the site | English only (see "Not built / open items") |
| Fonts | DM Sans (all text) and Caveat (preloader notes), self-hosted through `next/font` |
| Colours | Moss `#10493A`, Green `#19C652`, Deep `#01190E`, Cream `#F7F7EF` |
| Pages | 17 (Home, Services, 6 practice pages, Industries, Insights + 6 article pages, About, FAQ, Contact, Privacy, Terms, 404) plus a hidden Client Stories structure |

Why a static export: Hostinger shared hosting cannot run a Node server. `npm run build` turns the whole site into plain files in `out/`, which are uploaded to `public_html`. Pages load fast, search engines read full pages, and there is nothing running on the server that can break or be attacked (apart from the small PHP form file).

---

## 2. Project structure

```
seenteco-next/
├─ app/                     Pages (one folder per page) and global styling
│  ├─ layout.jsx            Page frame: fonts, header, footer, preloader, effects
│  ├─ page.jsx              Home
│  ├─ globals.css           ALL styling (one file)
│  ├─ services/             /services/ and /services/[slug]/ (6 practice pages)
│  ├─ industries/ about/ faq/ contact/ privacy/ terms/
│  ├─ insights/             /insights/ and /insights/[slug]/ (article layout)
│  ├─ client-stories/       Client Stories structure (hidden until a story exists)
│  ├─ not-found.jsx         404 page
│  ├─ sitemap.js robots.js  sitemap.xml and robots.txt
├─ components/              Reusable parts
│  ├─ Header.jsx            Top bar + animated mobile/tablet menu
│  ├─ Footer.jsx            Footer, newsletter box, credits
│  ├─ Preloader.jsx         Hand-drawn globe loading screen
│  ├─ SiteEffects.jsx       Smooth scroll, page transitions, scroll effects
│  ├─ Word.jsx              Giant words (SUSTAIN, ENERGY...) fitted to the width
│  ├─ Btn.jsx               Button with the sliding arrow
│  ├─ blocks.jsx            Cta, Steps, Tags, practice-area blocks, service page, FAQ section
│  ├─ ContactForm.jsx       Contact form (validation + sending)
│  ├─ Faq.jsx               FAQ accordion
│  ├─ Legal.jsx             Privacy / Terms layout
├─ lib/
│  ├─ content.js            ALL wording + contact details (the file you edit most)
│  ├─ stories.js            Client Stories (empty = section hidden)
├─ data/services.json       The six practice areas and every service (text from the client document)
├─ hostinger/               PHP form handler, visit tracker and .htaccess (copied into out/ on build)
├─ public/                  Logo, favicon, share image, Riyadh photo, boot.js
├─ scripts/
│  ├─ postbuild.mjs         Copies the PHP files and .htaccess into out/
│  ├─ preview.mjs           Local preview of out/ with a stand-in for the PHP form
├─ next.config.mjs          Static export settings
└─ package.json
```

`out/` (the finished site), `.next/` and `node_modules/` are created by building/installing and are not stored in git.

---

## 3. How to change things

All content lives in a few files. After any change: build again (section 5) and upload the new `out/` contents.

### Wording and contact details: `lib/content.js`
- `CONTACT` at the top: **email, phone, LinkedIn, Commercial Registration number and social links**. Fill these in and they appear automatically on the Contact page and in the footer (nothing shows while they are empty).
  ```js
  export const CONTACT = { email: 'info@seenteco.com', phone: '+966 ...', linkedin: 'https://linkedin.com/company/...', reg: '1010...', social: [{ name: 'Instagram', url: 'https://...' }] };
  ```
- Home sections, offers, standards, industries, FAQ, About values/principles/models, menu (`NAV`) are all in this file.
- Practice-area colours, big words and page titles/descriptions are in `DESIGN` at the top.

### Services: `data/services.json`
Each practice area has `headline`, `intro`, `who`, `services[]` (title, description, `inc` = what is included, `rec` = what you receive), `gets[]` and `cta`.

### Insights articles: `lib/content.js`
Six article topics exist (`ARTICLES`). Each has its own page. To publish one, add its text (the page then becomes searchable and appears in the sitemap):
```js
export const ARTICLE_BODIES = { 'mostadam-or-leed': [{ h: 'Heading', p: 'Paragraph...' }, { p: 'More text...' }] };
export const ARTICLE_BYLINES = { 'mostadam-or-leed': 'Dr. Name, Head of ...' };
```
Until a body exists the article page shows "The full article is being prepared" and is not indexed by search engines.

### Client Stories: `lib/stories.js`
Hidden while the list is empty (no menu item, no home strip, not in the sitemap, set to noindex). Add a story (only with written client approval) and rebuild. The expected fields are documented at the top of the file (client, sector, practice, headline, challenge, did, results, quote, video).

### Team cards: `app/about/page.jsx`
Three "coming soon" cards. Replace them with real names, roles, credentials and photos when the client sends them.

### Photos
Put images in `public/img/`. The Riyadh photo (`riyadh.jpg`, 1376x768) is the only real photo so far; grey "Photo to be supplied" blocks are placeholders (`Ph` component in `components/blocks.jsx` and the `ph` keys in `lib/content.js`).

### Styling: `app/globals.css`
One file, in order: base, header, sections and curves, service pages, home, industries, insights, about, FAQ, contact, animations, then several "override" blocks at the end (readability sizes, standard title spacing, footer layout, no-select). Later blocks override earlier ones on purpose.

---

## 4. Design and behaviour (what the site does)

- **Layout language:** large uppercase titles, curved section edges (`.wv` waves), alternating Moss / Cream / Deep / Green sections.
- **Curved edges:** each section has a wave on its top edge in its own colour. If two neighbouring sections share a colour the wave is hidden automatically. The waves drift sideways as you scroll.
- **Stacked sections:** where a curved section follows, the previous section stays pinned and the next one slides up over it.
- **Giant words** (SUSTAIN, ENERGY, DIGITAL, EXCEL, 2030, GROW, SEENTECO): sized to a share of the width (`Word.jsx`), letters rise in one by one. ENERGY is an outline filled with the page colour so overlapping contours in the letters never show.
- **Preloader:** hand-drawn globe with a real loading percentage. Plays once per visit (flag in `sessionStorage`), then the page animates in as the loader lifts away. `public/boot.js` hides it instantly on repeat visits.
- **Smooth scrolling:** mouse wheel and trackpad glide (`SiteEffects.jsx`, `EASE = 0.085`). Touch and keyboard stay native. Switched off for visitors who ask for reduced motion.
- **Page transitions:** clicking a link fades to cream with the logo, then the new page fades in. No full reload.
- **Header:** hides when scrolling down, returns when scrolling up, progress bar on top.
- **Mobile/tablet menu:** circle opens from the Menu button, links rise in one by one.
- **Buttons:** the arrow starts on the left, glides to the right on hover, and the button presses and springs back on click.
- **Text cannot be selected or copied** (form fields stay normal). This stops normal visitors only; it cannot stop screenshots or "view source".
- **Responsive:** tested at 320, 360, 390, 430, 600, 768, 820, 1024, 1100, 1280, 1440 and 1920 px wide. Phone header tightens below 480 px; below 360 px the header button is hidden (it is also in the menu).

---

## 5. Build, run and deploy

### Requirements
Node.js 18.18 or newer. On the development computer Node is managed with **nvm** and is not on the default path, so use it directly, for example in PowerShell:
```powershell
$env:PATH = "$env:LOCALAPPDATA\nvm\v22.23.2;" + $env:PATH
cd "D:\colourparrot\seenteco 2\seenteco-next"
npm install        # once
npm run dev        # live editing at http://localhost:3000 (the form does not send in dev)
npm run build      # builds the site into out/ and adds the PHP files + .htaccess
npm run preview    # serves out/ at http://localhost:3000 with a stand-in for the PHP form
```

### If the build crashes (low memory)
On a computer with little free RAM or a nearly full C: drive the build can crash ("worker exited with code 134"). `next.config.mjs` already limits the build. If it still fails: close other programs, free space on C:, and build with a smaller footprint:
```powershell
$env:TEMP='D:\tmp'; $env:NODE_OPTIONS='--max-old-space-size=800'
node node_modules\next\dist\bin\next build
node scripts\postbuild.mjs
```
Retrying usually works.

### Deploy to Hostinger (shared hosting)
1. Back up the current `public_html` (File Manager: select all, Compress, download).
2. Delete the old site files in `public_html` (keep `.well-known` if present).
3. Upload the **contents** of `out/` (or `seenteco-next-hostinger.zip`) and extract so that `index.html` and `_next/` sit directly in `public_html`. Turn on "show hidden files": `.htaccess` must be there.
4. **Mail setup:** create `no-reply@seenteco.com` in Hostinger (Emails). Edit `public_html/api/enquiry.php` and `public_html/api/visit-config.php`: set `$TO_EMAIL` (inbox that receives enquiries) and `$FROM_EMAIL` (the sender address on the domain). In `visit-config.php` also set a long random `$VIEW_KEY`.
5. Turn on **Force HTTPS** (hPanel, Security/SSL). The SSL certificate is already active.
6. Purge the cache (hPanel Cache Manager, and Cloudflare if used).
7. Test in a private window: preloader, then scroll, menu, a few pages, one real enquiry (check the inbox and spam), the footer newsletter box.

---

## 6. Forms and PHP (`hostinger/`)

- `enquiry.php`: receives the contact form and the newsletter signup (JSON), validates, emails `$TO_EMAIL`, keeps a private log.
  - Protections: only accepts requests from the site itself (Origin/Referer check), JSON only, hidden spam-trap field, 1 request per 20 s per visitor, 40 messages per hour for the whole site, header-injection safe, never shows PHP errors, does not store visitor IP addresses.
  - Newsletter signups arrive as an enquiry named "Newsletter subscriber". Newsletter platform integration (Mailchimp etc.) is **not** included.
- `visit.php` / `visits-view.php` / `visit-config.php`: optional tracker for tagged links (`?c=name`). The viewer refuses to open while `$VIEW_KEY` is the default or shorter than 16 characters.
- `.htaccess`: security headers (content policy, HSTS, no framing, permissions policy), blocks hidden/source/log files, custom 404, caching.
  - The content policy allows `'unsafe-inline'` scripts because Next.js adds small inline scripts to every page.
- `check.html` is a diagnostic page and is **not** deployed.

---

## 7. SEO

- Every page has a unique title and description (from the client document), canonical link, Open Graph tags and a share image (`public/assets/og.png`).
- `sitemap.xml` and `robots.txt` are generated (articles and client stories are listed only once they have content). `/api/` is disallowed.
- Home page has structured data (business name, Riyadh, opening hours).
- Each page has exactly one `h1`.
- To do after launch: register the site in Google Search Console and Google Business Profile (Riyadh); add analytics if wanted.

---

## 8. Testing that was done

On the live build and locally:
- All pages load (200), unknown URLs show the custom 404, private files return 403/404.
- No sideways overflow at 320, 360, 390, 768 and 1280 px (also 1440 on the main pages); no broken images; no console errors.
- Every link and button clicked on all 17 pages at desktop width; phone and tablet widths on the main pages. Menu opens/closes, anchors scroll, FAQ toggles, form and newsletter validation messages work.
- First visit: preloader finishes and scrolling is released (an earlier bug left the page locked; fixed).
- Form handler on the live server: rejects bad input (422), wrong content type (415), wrong method (405), ignores the spam trap, private files blocked.
- Security headers present on the live site.

**Not tested:** a real enquiry email actually arriving (depends on the mail addresses set in Hostinger), other browsers than Chromium, real phone touch scrolling.

---

## 9. Not built / open items

| Item | Status |
|---|---|
| **Arabic version + language switcher + RTL** | **Not built.** It is in the client quotation (part of the "additional pages + English/Arabic" item) but was set aside on instruction. Needs a decision from the client and approved Arabic copy. |
| Real contact details (email, phone, LinkedIn, social links, registration number) | Waiting for the client. Add in `CONTACT` (`lib/content.js`). |
| Team members (names, roles, bios, photos) | Waiting for the client. "Coming soon" cards on About. |
| Photos for service pages / Insights | Placeholders. Needs client photos or approved stock images. |
| Insights article text (6 topics) | Waiting for the client (writing is not included in the quotation). |
| Client Stories | Structure built, hidden until the first approved story. |
| Privacy Policy / Terms of Use | **Drafts written by the developer.** Need legal review and client approval. |
| Newsletter platform | Signups arrive by email only. |
| Brand colours decision | Still open with the client. |
| Mail addresses on Hostinger | Must be set (section 5, step 4). |

---

## 10. Decisions and history (why things are the way they are)

- Started as a plain HTML/Node site with a 3D globe, then redesigned from the client's page designs (cream/green, curved sections, no globe) and rebuilt on **Next.js** with static export.
- Small section labels ("eyebrows"), list numbers and tag lines above the big words were removed on request; only "Our services" keeps its small heading.
- Footer: the SEENTECO name and description column was removed; the large SEENTECO word keeps the logo in front. Credits link to Aadhil, Arshak P and Colourparrot.
- Text selection is disabled site-wide on request (form fields excepted).
- All wording comes from the client's "Seenteco Website Content" document (English). Arabic text in that document was not used.

---

## 11. Troubleshooting

| Problem | Fix |
|---|---|
| Every page except home gives 404 | `.htaccess` missing: extract with hidden files shown. |
| Old design still showing after upload | Purge the Hostinger/Cloudflare cache, hard refresh (Ctrl+F5). |
| Page cannot be scrolled on first visit | Old build. Make sure the latest `out/` is uploaded (the preloader must release the scroll lock). |
| "Your enquiry could not be sent" | Sender address is not on the domain, or `enquiry.php` still has placeholder addresses. |
| Enquiry emails go to spam | Check SPF/DKIM for the domain in Hostinger Emails. |
| Build crashes with code 134 | Low memory/disk: see "If the build crashes". |

---

## 12. Credits

Brand and website: **Colour Parrot Advertising LLP** (https://colourparrot.com).
Designed by Aadhil, developed by Arshak P.
