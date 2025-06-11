
install Reactrouter
```bash
npm install react-router-dom lucide-react clsx
```

install shadcn
```bash 
npx shadcn-ui@latest init
npx shadcn@latest add button                         
npx shadcn@latest add input
npx shadcn@latest add card
npx shadcn@latest add label
npx shadcn@latest add checkbox
npm install -D @types/node
```

install fontawesome 
```bash 
npm install --save @fortawesome/fontawesome-svg-core 
npm install --save @fortawesome/free-solid-svg-icons
npm install --save @fortawesome/react-fontawesome
npm install --save @fortawesome/free-brands-svg-icons
```
install Mock jwt 
```bash 
npm install msw@1 --save-dev
```
Tạo file mockServiceWorker.js
```bash 
npx msw init public/ --save
```
## ** Mock data to test login **
test@example.com
123456

Install Gsap
```bash 
npm install gsap
```



## ** Component Structure **

**`App.tsx`** :Main app entry, routing setup

**`App.css`**  :Global CSS (optional, can be replaced by Tailwind)

**`index.css`** :Tailwind & CSS resets

**`main.tsx`** :ReactDOM entry point

**`src/assets/`** :All images, icons, and static assets

**`components/pages/`** :Route-level components (pages)

    Home.tsx
    Lesson.tsx
    Profile.tsx
    Ranking.tsx
    More.tsx (Profile/AboutUs/Logout)

**`components/layout/`** :Layout components: wrappers, bars, main structure

    LeftBar.tsx: Main vertical sidebar with navigation links to HOME, TRAINING, RANKING and MORE menu.
    MainContent.tsx: Wrapper for the center area where LEARNING PATHS are rendered.
    MainLayout.tsx
    RightBar.tsx: Panels shown on the right side of the screen for extra information (not final version): FUN FACTS, TIPS, REWEDENDUNGEN.
    TopBar.tsx: LOGO, STATS, XP PROGRESS, and PROFILE infos (LOGO is not final, just for placeholder, still changeable)

**`components/login/`** :Login modals and authentication UIs

    LoginModal.tsx
    LoginModalJWT.tsx

**`components/panels/`** :Information and dashboard panels

    HeaderPanel.tsx
    QuotePanel.tsx
    UserPanel.tsx

**`components/top-bar/`** :TopBar subcomponents (logo, profile, progress, etc.)

    Logo.tsx
    ProfileAndStats.tsx
    ProgressBar.tsx

**`components/ui/`** :All basic, styled, and reusable UI widgets. (buttons, inputs, etc.)

    button.tsx
    card.tsx
    input.tsx
    label.tsx

**`components/hooks/`** :Custom React hooks for logic reuse

    useAuth.tsx
    useAuthJWT.tsx

**`components/libs/`** :General utility/helper functions

    utils.tsx
