# 🍑 Peach Portfolio

A warm, friendly, animated developer portfolio, built with React, GSAP and lots of little details.
Free to use: fork it, edit **one file**, swap in your photos, and ship it.

Made by **[Lohitha Damisetti](https://github.com/lohithadamisetti123)**.

## ✨ Highlights

- **Hero:** a cut-out portrait that **turns to look at your cursor**.
- **About:** a photo stack you can click through, with one role per photo.
- **Work:** project cards that start scattered and tidy themselves up as you scroll.
- **Journey:** a scrapbook map with taped polaroids and a road that draws itself while your avatar travels along it.
- **Toolbox:** a sticker sheet of skills you can drag around, plus a Shuffle button.
- **Milestones:** a certificate wall with issuer logos, and big numbers that roll into place.
- **Contact:** a coral card with a cut-out "say hi" sticker.
- Soft curved section edges, smooth scrolling (Lenis), and a responsive layout for phones.

## 🛠 Tech stack

React 19 · Vite · GSAP (ScrollTrigger, SplitText, Draggable) · Lenis · Bricolage Grotesque, DM Sans and Caveat fonts

## 🚀 Getting started

```bash
git clone https://github.com/lohithadamisetti123/Peach-Portfolio.git
cd Peach-Portfolio
npm install
npm run dev        # http://localhost:5173
```

Build for production:

```bash
npm run build      # outputs to dist/
npm run preview    # preview the build locally
```

## 🎨 Make it yours

| What to change | Where |
|---|---|
| Name, intro, links, projects, journey, skills, certificates, numbers | `src/data.js` |
| Colours and fonts | the `:root` variables at the top of `src/styles/global.css` |
| Round avatar (square photo) | `public/img/faces/` |
| Photo-stack and polaroid photos (4:5 portraits) | `public/img/photos/` |
| Cut-out frames for the cursor-tracking hero | `public/img/stickers/lg` (full size) and `sm` (half size) |
| Page title and description | `index.html` |

**Palette:** `#FFF9F5` background · `#30221F` text · `#FF8066` coral · `#FFE5D9` peach

### Making your own cursor-tracking cut-out

1. Record about 1–2 seconds of yourself on a plain background, slowly turning your head to one side.
2. Export the frames: `ffmpeg -i clip.mp4 f%03d.png`
3. Remove the background (for example with [rembg](https://github.com/danielgatis/rembg)) and add a white outline if you want the sticker look.
4. Save the frames as transparent WebP, named `f000.webp`, `f001.webp`… in `public/img/stickers/lg`, with half-size copies in `sm`.
5. Set `lookFrames` in `src/data.js` to the first and last frame numbers.

No video? A single cut-out photo works too. Set `from` and `to` to the same frame.

> 🔒 Keep personal details such as your phone number out of `data.js`. This site is public.

## 🌐 Deploy

Works on any static host:

- **Vercel / Netlify:** import the repo. Framework: Vite · Build command: `npm run build` · Output folder: `dist`
- **GitHub Pages:** run `npm run build` and publish the `dist` folder. Paths are relative, so it works under `/repo-name/` too.

## 📄 License

MIT for the code. The photos in `public/img` belong to the author, so **please replace them with your own**.
Brand logos come from [Simple Icons](https://simpleicons.org) (CC0).
