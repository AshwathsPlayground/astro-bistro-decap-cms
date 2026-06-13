# Spec: Astro Bistro Decap CMS Template Refactor

This specification outlines the architecture, design choices, and phase-by-phase execution plan to turn the Astro Bistro template into a reusable, git-based CMS-managed website. 

---

## 1. Architectural Model

```mermaid
graph TD
    User([Content Editor]) -->|Modifies Content| DecapApp[Decap CMS React App<br>public/admin/index.html]
    DecapApp -->|Authentication| NetlifyIdentity[Netlify Identity Widget]
    DecapApp -->|Save Request| GitGateway[Netlify Git Gateway]
    GitGateway -->|Pushes Commits| GitHub[GitHub Repo]
    GitHub -->|Triggers Webhook| NetlifyBuild[Netlify Build Pipeline]
    NetlifyBuild -->|Parses Collections| AstroBuild[Astro Static Builder]
    AstroBuild -->|Validates Schemas| Zod[Zod Schemas<br>src/content.config.ts]
    AstroBuild -->|Generates| StaticFiles[Static HTML/JS/CSS]
    StaticFiles -->|Deploys| CDN[Netlify CDN]
```

### Core Components:
1. **CMS Dashboard (`public/admin/`)**: A client-side, zero-database administration panel powered by Decap CMS.
2. **Netlify Identity & Git Gateway**: Manages access control (inviting admins, logins) and securely handles writing edits directly to Git without exposing repository keys.
3. **Astro Content Collections (`src/content/`)**: Astro's type-safe system for reading local Markdown/JSON files, validating frontmatter structures with Zod, and building high-performance static HTML pages.

---

## 2. Core Template Design Decisions

To make this repository a bulletproof **reusable template** that others can adopt, we will follow these principles:

### A. Graceful UI Fallbacks (No Crashes on Empty State)
When a user boots up this template for their own business, they may want to delete all our mock products and reviews. The website must not crash.
* **Collections Check**: For every folder-based collection (Features, Testimonials, Slides), components will check if `collection.length === 0`.
* **Behavior**: 
  * If a list is empty in production, the corresponding UI section will **gracefully hide** or collapse so the website looks clean and complete.
  * In local development mode (`import.meta.env.DEV`), we will render a helpful developer notice: *"No items found. Go to /admin to add some!"*

### B. Media and Assets
* All images uploaded via the CMS dashboard will go to `public/images/uploads/`.
* The CMS will reference them as `/images/uploads/filename.ext`, allowing Astro's static server and build pipeline to resolve them correctly.

### C. Dynamic Icon Loading
Decap CMS stores icons as simple strings (e.g. `"ChefHat"`, `"Mail"`).
* We will establish an icon registry file (`src/utils/icons.ts`) mapping string keys to React Lucide components.
* This avoids importing the entire `lucide-react` library into the final bundle, keeping load times fast (critical for SEO).

---

## 3. Step-by-Step Phased Execution (PR Blueprint)

We will execute this refactor across four isolated branches/PRs to discuss, code, and test each section incrementally.

### Phase 1 (PR #1): CMS Infrastructure & Netlify Auth Setup
* **Branch**: `feat/cms-infrastructure` (Merged)
* **Goal**: Establish the admin panel and auth wiring.

### Phase 2 (PR #2): Slides & Features Collections
* **Branch**: `feat/slides-products-collections`
* **Goal**: Refactor the Hero slider and Features card grid.
* **Content Schema Examples**:
  * **Hero Slides (`src/content/hero-slides/slide-1.md`)**:
    ```yaml
    ---
    title: "Slide 1"
    id: 1
    img: "/images/hero-section/dish-01.webp"
    imgAlt: "plate-1"
    userComment: "The ambiance is perfect and the food is absolutely delicious. Highly recommended!"
    userAvatar: "/images/hero-section/avatar-01.webp"
    ---
    ```
  * **Features (`src/content/features/grilled-herb-chicken.md`)**:
    ```yaml
    ---
    title: "Grilled Herb Chicken"
    image: "/images/popular-dishes/grilled-herb-chicken.webp"
    alt: "Grilled Herb Chicken"
    type: "Main course 🥘"
    description: "Juicy chicken grilled with herbs and served with garlic sauce."
    ---
    ```
* **Files Affected**:
  * Modify [content.config.ts](file:///Users/ashwath/projects/shadcn-astro-bistro-landing-page-free/src/content.config.ts) to define Zod schemas for `hero-slides` and `features` collections.
  * Create markdown entries under `src/content/hero-slides/` and `src/content/features/` matching the current template content.
  * Modify [index.astro](file:///Users/ashwath/projects/shadcn-astro-bistro-landing-page-free/src/pages/index.astro) to load these collections dynamically using Astro's `getCollection()`.
  * Refactor components (`HeroSection`, `PopularDishes`) to handle empty lists safely (gracefully hiding the section in production and showing helper text in development).
* **Verification**: Ensure Hero and Features sections look identical to the baseline, and hide/warn correctly if markdown files are removed.

### Phase 3 (PR #3): About Section, Testimonials & Blog
* **Branch**: `feat/about-testimonials-articles`
* **Goal**: Refactor sections with icons (About section achievements stats), customer reviews, and blog cards.
* **Content Schema Examples**:
  * **Testimonials (`src/content/testimonials/sarah-johnson.md`)**:
    ```yaml
    ---
    title: "Sarah Johnson"
    avatar: "/images/hero-section/avatar-03.webp"
    rating: 5
    content: "Delicious food made with care and fresh ingredients. The atmosphere is cozy."
    ---
    ```
  * **Blog Post (`src/content/blog/spicy-mango-chicken.md`)**:
    ```yaml
    ---
    title: "Spicy Mango Chicken"
    img: "/images/new-items/new-items-02.webp"
    alt: "Spicy Mango Chicken"
    description: "A sweet and spicy fusion of tender chicken breast combined with ripe mango."
    blogLink: "#"
    ---
    ```
  * **Home Page Settings (`src/content/pages/home.md`)**:
    ```yaml
    ---
    hero:
      title: "Savor the taste of perfection"
      description: "Welcome to Restaurant where passion meets the plate."
    about:
      badge: "About Us"
      title: "Our story & achievements"
      description: "At Restaurant, every dish tells a story."
      readMoreLink: "#"
      image: "/images/about-us.webp"
      stats:
        - value: "20+"
          line1: "Years of Culinary"
          line2: "Expertise"
          icon: "SparklesIcon"
        - value: "70+"
          line1: "Signature Dishes"
          line2: "Perfected"
          icon: "ChefHat"
    ---
    ```
* **Files Affected**:
  * Create `src/utils/icons.ts` for Lucide React dynamic lookup mapping.
  * Modify `src/content.config.ts` for testimonials, blog, and about schemas.
  * Create markdown files for testimonies, stats, and blog posts.
  * Refactor `AboutUs`, `Testimonials`, and `NewItems` components to use generic schemas and data sources.
* **Verification**: Verify icon mapping works correctly and reviewers ratings are type-safe.

### Phase 4 (PR #4): Contact coordinates, Promotions Banners & Production Build
* **Branch**: `feat/contact-promotions-cleanup`
* **Goal**: Migrate remaining layout details (hours, phone, address cards, promotions grid graphics) and perform final verification.
* **Files Affected**:
  * Define schemas for contact data and promotions layout inside `src/content.config.ts` and `src/content/pages/home.md`.
  * Build final markdown pages.
  * Modify components (`ContactUs`, `Offers`) to load dynamic coordinates and promotions data.
* **Verification**: Run `npm run check-types` and `npm run build` to verify there are no compilation errors.

---

## 4. Verification & Testing Strategy

To ensure zero regression:
1. **TypeScript Checks**: `npm run check-types` must exit successfully on every branch before PR approval.
2. **Build Integrity**: `npm run build` must run successfully on each step, ensuring Astro builds correct HTML/CSS bundles.
3. **Empty States**: Test deleting all content files from a collection to verify that the template hides empty components cleanly without throwing runtime crashes.
