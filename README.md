Here’s a concise and professional `README.md` that summarizes the **technical aspects** of your project:

---

```markdown
# 🌤️ Portfolio SPA with Animated Cloud Background and Slide Navigation

This is a single-page portfolio application built with React and TypeScript. It features a cloud-themed animated background, smooth route-based background color transitions, and reusable slide navigation for showcasing personal info and projects.

---

## ✨ Features

- **React + TypeScript** with modular folder structure
- **React Router** for client-side navigation
- **Motion One (`motion/react`)** for performant animations
- **Reusable slide navigation hook** (`useSlideNavigation`)
- **Cloud parallax background** controlled by slide direction
- **Route-based background color animation**
- **Responsive MUI layout** and components

---

## 🗂️ Project Structure

```

src/
├── App.tsx                     # Main app layout and routing
├── assets/                     # Cloud images
├── components/
│   └── CloudBackground.tsx     # Animated cloud image layer
├── hooks/
│   └── useSlideNavigation.ts   # Reusable card & cloud movement logic
├── pages/
│   ├── Home.tsx                # Introduction & personal slides
│   ├── Projects.tsx            # Project showcase with slide nav
│   └── Contact.tsx             # Static contact page

````

---

## 🔧 Technologies Used

| Tech               | Purpose                                         |
|--------------------|-------------------------------------------------|
| **React + Vite**    | Fast development with modern tooling           |
| **TypeScript**      | Type safety and scalability                    |
| **Motion One**      | Smooth animations without Framer Motion        |
| **React Router v6** | Page navigation                                |
| **MUI**             | Prebuilt, accessible, and responsive UI        |

---

## 🔄 Slide Navigation Logic

The custom hook `useSlideNavigation` handles:

- Card index control
- Navigation via keyboard and scroll
- Cloud position offsets
- Direction-aware animation
- Reusability across pages (e.g., `Home`, `Projects`)

```ts
const { index, direction, setSlide } = useSlideNavigation(sections.length, {
  setCloud1X,
  setCloud2X,
  setCloud3X,
});
````

---

## 🎨 Dynamic Background Colors

`App.tsx` uses `motion.div` to smoothly animate the background color per route:

```ts
const targetColor = useMemo(() => {
  switch (location.pathname) {
    case '/': return '#90caf9'; // Home - Light Blue
    case '/projects': return '#ffb74d'; // Projects - Orange
    case '/contact': return '#283593'; // Contact - Dark Blue
  }
}, [location.pathname]);

useEffect(() => {
  controls.start({ backgroundColor: targetColor });
}, [targetColor]);
```

---

## 🧪 Future Improvements

* Unit tests using `Vitest` or `Jest`
* Transition animations between pages
* Accessibility improvements
* Form handling on the Contact page
* Dark mode toggle

---

## 📦 Getting Started

```bash
npm install
npm run dev
```

> Requires Node.js 18+

---

## 📄 License

MIT

```

---

Let me know if you want to add:
- Deployment instructions (e.g., Netlify/Vercel)
- A screenshot or GIF section
- Credits/acknowledgements

I can also auto-generate the README from your `package.json` if you’d like that.
```
