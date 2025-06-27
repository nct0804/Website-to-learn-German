# What's New

### Major UI/UX Improvements (June 2024)

- **Profile, Stats, and Progress Bar Redesign:**
  - Modern pill-shaped profile and stats blocks with icons and avatar.
  - Progress bar now matches the new design: pill-shaped, with level and XP labels inside the bar, and a subtle progress fill.
  - All elements are right-aligned for a clean, dashboard-like look.

- **Consistent Card & Button Usage:**
  - All major content blocks (e.g., CourseCard) now use the custom Card and Button components for a unified appearance.

- **Lesson Exit Confirmation:**
  - When attempting to leave a lesson, users see a modal warning that progress will not be counted, with options to continue or return home.

- **Improved Learning Path UI:**
  - Course and lesson cards, learning steps, and progress indicators have been visually enhanced for clarity and engagement.

- **Responsive & Accessible:**
  - Layouts and components are more mobile-friendly and accessible.

- **Animated Feedback:**
  - Confetti and tick animations for correct answers and lesson completion.

- **General Polish:**
  - Better spacing, color consistency, and visual hierarchy throughout the app.

---

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

Install Framer Motion (page transition):
```
npm install framer-motion

```


## ** Component Structure **

**`App.tsx`** :Main app entry, routing setup

**`App.css`**  :Global CSS (optional, can be replaced by Tailwind)

**`index.css`** :Tailwind & CSS resets

**`main.tsx`** :ReactDOM entry point

**`src/assets/`** :All images, icons, and static assets

**`components/pages/`** :Route-level components (pages)

    - Home.tsx: Main landing page after login, shows dashboard or learning overview.
    - Lesson.tsx: (placeholder)
    - Profile.tsx: (placeholder)
    - Ranking.tsx: (placeholder)
    - Learn.tsx: Main learning interface, renders exercises and progress for a lesson.
    - LandingPage.tsx: 
    - LoginPage.tsx: 
    - RegisterPage.tsx: 
    - Pronunciation.tsx: 

**`components/layout/`** :Layout components: wrappers, bars, main structure

    - LeftBar.tsx: Main vertical sidebar with navigation links to HOME, TRAINING, RANKING and MORE menu.
    - MainContent.tsx: Wrapper for the center area where LEARNING PATHS are rendered.
    - MainLayout.tsx
    - RightBar.tsx: Panels shown on the right side of the screen for extra information (not final version): FUN FACTS, TIPS, REWEDENDUNGEN.
    - TopBar.tsx: LOGO, STATS, XP PROGRESS, and PROFILE infos (LOGO is not final, just for placeholder, still changeable)

**`components/hooks/`** :Custom React hooks for logic reuse

    - useAuth.tsx:
    - useAuthJWT.tsx:
    - useCoursesWithProgress.ts: Fetches all courses with progress, sorts courses/modules/lessons.
    - useAllModulesLessonProgress.ts: Fetches lesson progress for multiple modules at once.
    - useLessonModuleProgress.ts: Fetches lesson progress for a single module.
    - useLessonExercises.ts: Fetches all exercises for a specfic choosen lesson.
    - useExerciseCheck.ts: Checks user answers for exercises, returns correctness, XP, and feedback.

**`components/learning-path/`** :Learning path (course cards, lessons and etc...)

    - LearningStep.tsx: Logics for StartBubble, DetailBubble and LockedBubble
    - CourseCard.tsx: CourseCard to choose from in HOME to learn (A1.1, A1.2, B1.1, B1.2)
    - LessonHeader.tsx: Infos for the module (Lesson1, Title...) sticking fixed on top
    - VerticalStep.tsx: Vertical learning path with nodes 
    - StartBubble.tsx: Indicating the active node
    - DetailBubble.tsx: Infos of the clicked node
    - LockedBubble.tsx: Showing infos for locked node

**`components/learn/`** :Learning page (exercise and lesson flow)

    - LearningHeader.tsx: Displays lesson progress, hearts, and a back button with exit confirmation modal.
    - LearningContent.tsx: Main logic for rendering exercises, handling answer checking, feedback, and lesson summary.
    - LearningFooter.tsx: Footer with the main action button (Check) for exercises.
    - LessonSummary.tsx: Shows a congratulatory summary and answers after lesson completion.
    - FillInBlankExercise.tsx: Renders fill-in-the-blank exercise UI and handles user input.
    - MultipleChoiceExercise.tsx: Renders multiple choice questions and handles selection.
    - VocabCheckExercise.tsx: Renders vocabulary check exercises with images and options.
    - PronunciationExercise.tsx: (placeholder, not yet implemented)

**`components/login/`** :Login modals and authentication UIs

    - LoginModal.tsx
    - LoginModalJWT.tsx

**`components/panels/`** :Information and dashboard panels

    - HeaderPanel.tsx
    - QuotePanel.tsx
    - UserPanel.tsx

**`components/top-bar/`** :TopBar subcomponents (logo, profile, progress, etc.)

    - Logo.tsx
    - ProfileAndStats.tsx
    - ProgressBar.tsx

**`components/ui/`** :All basic, styled, and reusable UI widgets. (buttons, inputs, etc.)

    - button.tsx
    - card.tsx
    - input.tsx
    - label.tsx

**`components/libs/`** :General utility/helper functions

    utils.tsx

**`components/types/`**: 
    - courseProgress.ts: 

