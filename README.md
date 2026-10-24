# Deebiga — Portfolio

Personal portfolio for Deebiga S, an Artificial Intelligence and Data Science student and AI / full-stack developer. Built from the Peach Portfolio template and customized with Deebiga’s profile, projects, portrait, skills, and contact form.

## Features

- Animated, cursor-responsive hero portrait
- About, featured projects, education, skills, and contact sections
- Responsive layout with motion and scroll animations
- Contact form that sends submissions to Deebiga through FormSubmit

## Tech stack

React 19 · Vite · GSAP · Lenis · JavaScript · CSS

## Run locally

```bash
npm install
npm run dev
```

Create a production build with `npm run build`; preview it with `npm run preview`.

## Portfolio content

Profile details, project descriptions, skills, and links are in `src/data.js`. Page metadata is in `index.html`. Images are stored under `public/img/`.

The contact form uses FormSubmit and requires a one-time email activation before forwarding submissions. Visitors enter their email address; it is used as the reply-to address.

## Credits and image use

The layout began with the [Peach Portfolio](https://github.com/lohithadamisetti123/Peach-Portfolio) template. Deebiga’s portrait and personal details are included for this portfolio and should not be reused without permission. See `LICENSE` for the code license.
