# Zarii Brand Style Guide & Design System

> Official Brand Guidelines, Visual Standards & Design System Reference  
> **Brand Anchors**: Logo Deep Green (`#124F40`) & Logo Mint (`#5BB78D`)  
> **Tagline**: *"IELTS preparation, made clear."*

---

## 1. Brand Identity & Logo Guidelines

The Zarii logo embodies the essence of authentic, focused IELTS preparation through two foundational motifs: the **letter Z** and an **open book** in dual brand greens.

```
       ███████████
            ███
          ███
        ███
      ███████████
     (  OPEN BOOK  )
        Z A R I I
    IELTS PREPARATION
```

### 1.1 Logo Assets (`public/brand/`)

| Asset File | Description | Recommended Usage |
|:---|:---|:---|
| `zarii-logo-full.svg` | Full mark + "Zarii" + "IELTS PREPARATION" (full color) | Light landing headers, About page, official TRF reports, footers |
| `zarii-logo-full-white.svg` | Full logo inverted in pure white / mint | Dark hero banners, dark mode footers, splash screens |
| `zarii-mark.svg` | Standalone Z-on-book symbol (deep green + mint) | Collapsed sidebar, mobile top bar, favicon, app icon |
| `zarii-mark-white.svg` | Standalone mark in pure white | Deep-green greeting watermarks, dark mode top bars |
| `zarii-wordmark.svg` | Typographic "Zarii" wordmark in deep green | Horizontal navigation bars, inline references |
| `zarii-wordmark-white.svg` | Typographic wordmark in pure white | Dark mode horizontal navigation |

### 1.2 Clear Space Rule

Always maintain a minimum exclusion zone around the logo equal to the diameter/height of the **dot on the letter "i"** ($X \approx \text{height of dot}$). No text, graphics, or borders may intrude into this zone:

```
  +-----------------------------------+
  |               [ X ]               |
  |   [ X ]       Zarii       [ X ]   |
  |               [ X ]               |
  +-----------------------------------+
```

### 1.3 Minimum Sizing
- **Full Logo**: Minimum height `32px` on screen; `18mm` in print.
- **Mark + Wordmark**: Minimum height `24px`.
- **Standalone Mark**: Minimum size `16x16px` (favicon / app icon).

### 1.4 Background Pairing Rules
- **Light Surfaces** (`#FFFFFF`, `#F7FAF8`, `#F1FAF5`): Use full-color assets (`zarii-logo-full.svg`, `zarii-mark.svg`).
- **Dark Surfaces & Green Headers** (`#124F40`, `#0E3D32`, `#0B1612`, `#112019`): Always use white assets (`theme="dark"`).
- **Watermarks**: Use `zarii-mark-white.svg` at `opacity-[0.07]` on deep-green gradients.

---

## 2. Color System & Design Tokens

Defined once as CSS custom properties (`index.html`) and Tailwind theme extensions (`tailwind.config.js`). Zero hard-coded arbitrary hex values.

### 2.1 Brand Green Scale (Smooth 50 – 950)

| Step | Hex Value | Usage Role | WCAG Contrast on White |
|:---|:---|:---|:---|
| **50** | `#F1FAF5` | Subtle surface tint, active item background, card highlight | *Background* |
| **100** | `#DDF2E7` | Light hover state, badge fill, input border tint | *Background* |
| **200** | `#B6E3CD` | Soft border accent, light active pill | *Decorative* |
| **300** | `#8ACFAE` | **Focus Ring (2px)**, mint shadow glow | *Focus ring* |
| **400** | `#5BB78D` | **Logo Mint Accent**: Progress arcs, icons, badges, charts | *Accent only* |
| **500** | `#2F9477` | Vibrant green, active indicator, mid-range gradients | 3.5:1 |
| **600** | `#1E7A62` | Text links, Reading skill token, button hover rings | 5.3:1 (AA) |
| **700** | `#17634F` | Primary button hover, deep-tint text, dark badges | 7.1:1 (AAA) |
| **800** | `#124F40` | **Logo Deep Green**: Primary buttons, active nav, key headings | 8.8:1 (AAA) |
| **900** | `#0E3D32` | Header gradient stop, dark badge surface | 11.4:1 (AAA) |
| **950** | `#0A2E25` | Darkest brand green, dark text on mint buttons | 14.2:1 (AAA) |

> [!CRITICAL]
> **Mint Accent Rule**: Logo Mint (`#5BB78D`) is strictly for accents (progress arcs, icons, badges, charts, button fills). **NEVER use mint as text on white or light backgrounds** (contrast ratio is 1.9:1, failing WCAG AA). For mint buttons, use dark text (`#0A2E25`, contrast 6.2:1).

### 2.2 Neutrals (Light Mode)

| Token | Hex Value | Role |
|:---|:---|:---|
| `--neutral-bg` | `#F7FAF8` | Page background (off-white with a soft green tint) |
| `--neutral-surface` | `#FFFFFF` | Card, container, and modal background |
| `--neutral-border` | `#E1EBE5` | Subtle green-gray borders, card dividers, outlines |
| `--neutral-muted` | `#5B6B63` | Secondary text, captions, timestamps, helper text |
| `--neutral-main` | `#12211B` | High-contrast headings and body text (14.6:1 AAA) |

### 2.3 Dark Theme Palette

| Token | Hex Value | Role |
|:---|:---|:---|
| `--dark-bg` | `#0B1612` | Base canvas background |
| `--dark-surface` | `#112019` | Dark card surface and navigation panels |
| `--dark-elevated` | `#172A21` | Modals, dropdowns, tooltips, popovers |
| `--dark-border` | `#24392F` | Dark container borders and subtle dividers |
| `--dark-text` | `#E8F2EC` | Main body and heading text (13.8:1 AAA) |
| `--dark-muted` | `#9DB3A7` | Secondary text, placeholders, metadata (7.4:1 AAA) |

### 2.4 Semantic Palette

| Semantic | Hex Value | Role |
|:---|:---|:---|
| **Success** | `#1E9E63` | Correct answers, completed tasks, streaks, passing bands |
| **Warning** | `#D99A0B` | Flagged exam questions, 10-minute timer alerts |
| **Error** | `#D1453B` | Incorrect answers (softened), $< 5\text{ min}$ timer alert, failure toasts |
| **Info** | `#2B7FB8` | Informational callouts, audio track helpers, tips |

### 2.5 Skill Identity Colors

| Skill | Token Tone | Soft Tint Fill | Purpose |
|:---|:---|:---|:---|
| **Listening** | Teal (`#0F8B8D`) | `#E6F5F5` | Audio players, waveforms, section switcher |
| **Reading** | Brand Green (`#1E7A62`) | `#DDF2E7` | Passage view, text highlights, academic drills |
| **Writing** | Amber (`#C98A0A`) | `#FAF2E3` | Essay editor, word count counter, task 1 charts |
| **Speaking** | Terracotta (`#CF5C45`) | `#FCECE9` | Audio recorder, cue cards, fluency timer |

### 2.6 Data Visualization & Chart Palette

| Series | Color | Token |
|:---|:---|:---|
| Primary Metric | `#124F40` | Brand 800 (Deep Green) |
| Target Band Line | `#5BB78D` | Brand 400 (Mint Accent) — **Dashed 3 3** |
| Skill: Listening | `#0F8B8D` | Teal |
| Skill: Reading | `#1E7A62` | Brand Green 600 |
| Skill: Writing | `#C98A0A` | Amber |
| Skill: Speaking | `#CF5C45` | Terracotta |
| Grid Lines | `#8E9F97` | Soft Gray (`strokeOpacity={0.15}`) |
| Tooltip Container | `#112019` | Dark green surface with `#24392F` border |

---

## 3. Typography & Spacing

### 3.1 Font Families
- **Primary**: Inter (`font-sans`), `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`.
- **Numbers / Scores / Timers**: JetBrains Mono / SF Mono (`font-mono`) with tabular figures (`tnum`).
- **Accessibility Option**: OpenDyslexic / Dyslexie friendly font stack toggleable in Settings.

### 3.2 Type Scale
- **Display 1**: `text-4xl sm:text-5xl lg:text-6xl` (Hero headlines, bold 800).
- **Heading 1**: `text-2xl sm:text-3xl` (Screen greetings, module titles, bold 700).
- **Heading 2**: `text-xl sm:text-2xl` (Section headings, card titles, bold 700).
- **Heading 3**: `text-base sm:text-lg` (Subsections, widget headers, bold 600).
- **Body Regular**: `text-sm sm:text-base` (Passage text, instructions, leading-relaxed).
- **Microcopy**: `text-xs` / `text-2xs` (Badges, timestamps, question counters, font-mono).

### 3.3 Spacing & Radius
- **Base Grid**: `4px` ($0.25\text{rem}$). Core spacing multipliers: `gap-2` (8px), `gap-4` (16px), `gap-6` (24px), `gap-8` (32px).
- **Container Radii**:
  - `rounded-lg` (8px): Inputs, compact pills, tooltips, action icons.
  - `rounded-xl` (12px): Standard buttons, badges, toast items.
  - `rounded-2xl` (16px): Cards, widgets, stat containers.
  - `rounded-3xl` (24px): Hero greeting banners, onboarding modals.
  - `rounded-full`: Circular accuracy rings, pill tags, radio choices.

---

## 4. Component Design Rules

### 4.1 Buttons
- **Primary**: `bg-brand-800 hover:bg-brand-900 active:bg-brand-950 text-white font-medium` (Light mode). In dark mode: `dark:bg-brand-400 dark:hover:bg-brand-300 dark:text-brand-950 dark:font-bold`.
- **Mint Accent Button**: `bg-[#5BB78D] text-[#0A2E25] font-bold hover:bg-[#4EA57E]`.
- **Outline**: `border border-slate-200 dark:border-[#24392F] hover:bg-slate-50 dark:hover:bg-[#172A21]`.
- **Focus State**: `focus-visible:ring-2 focus-visible:ring-brand-300 dark:focus-visible:ring-brand-400 focus-visible:ring-offset-2`.
- **Disabled State**: `disabled:opacity-50 disabled:pointer-events-none`.

### 4.2 Exam Interface Focus Rules
- **No Decorative Elements**: The test area must remain completely clean, neutral, and distraction-free, mirroring authentic CD-IELTS computer stations.
- **Answered State**: Mint fill (`#5BB78D`) with `#0A2E25` text on question navigation buttons.
- **Flagged State**: Amber outline & badge pip (`#C98A0A`).
- **Current Question**: Deep-green focus ring (`ring-[#124F40] dark:ring-brand-400`).
- **Countdown Timer**:
  - $> 10\text{ min}$: Deep green (`bg-[#124F40] text-white`).
  - $5\text{ to }10\text{ min}$: Amber (`bg-amber-950 text-amber-200 border-amber-800`).
  - $< 5\text{ min}$: Terracotta alert (`bg-[#CF5C45] text-white border-[#D1453B] animate-pulse`).

### 4.3 Official Test Report Form (TRF)
- Displays full Zarii logo (`zarii-logo-full.svg`).
- Features the mandatory official disclaimer:
  > *"Generated by Zarii. Scores are estimates, not official IELTS results."*

---

## 5. Brand Voice & Copy Standards (`src/lib/copy.ts`)

### 5.1 Voice Principles
1. **Clear**: Unambiguous, plain language, zero jargon.
2. **Supportive**: Encouraging without being cheerful or patronizing.
3. **Professional**: Serious, high-stakes exam preparation tone.
4. **Never Childish**: No gamified cartoon babble, confetti overload, or exclamation point clutter.
5. **Short Sentences**: Direct, telegraphic feedback.

### 5.2 Microcopy Reference

| Context | Good (Zarii Voice) | Bad (Avoid) |
|:---|:---|:---|
| **Empty State** | *"No attempts yet. Start your first Reading test."* | *"Oopsie! You haven't done any tests yet, let's get rolling! 🚀"* |
| **Save / Streak** | *"Saved. You're on a 5-day streak."* | *"Woohoo! You're crushing it superstar, keep that streak on fire! 🔥"* |
| **Error** | *"Something went wrong. Your answers are safe. Try again."* | *"Whoops! An unhandled exception occurred in the Dexie engine."* |
| **AI Fallback** | *"AI feedback is busy right now. Showing instant checks instead."* | *"AI error: Rate limit 429 quota exhausted. Rule fallback active."* |
| **Onboarding** | *"Let's set your target band."* | *"What's your dream score, champ?"* |
| **Word Count** | *"Please write at least 20 words so your grammar and vocabulary can be evaluated."* | *"Too short! Type more words to get graded."* |

---

## 6. Do and Don't Examples

| Category | Do ✅ | Don't ❌ |
|:---|:---|:---|
| **Logo** | Use `zarii-logo-full.svg` on light and `zarii-logo-full-white.svg` on dark. | Stretch, distort, or recolor logo components. |
| **Logo** | Maintain clear space equal to the height of the "i" dot. | Place the dark green logo on a deep green banner. |
| **Color** | Use `#124F40` for primary actions and `#5BB78D` for progress accents. | Use mint `#5BB78D` as body text on white backgrounds. |
| **Color** | Stick strictly to the green-tinted neutrals (`#F7FAF8`, `#E1EBE5`). | Reintroduce generic indigo, purple, or pure blue hexes. |
| **Focus Rings** | Use `2px` visible ring in mint 300 (`#8ACFAE`). | Use default browser blue rings or omit focus states. |
| **Exam Screen** | Keep surfaces calm, clean, off-white, and neutral. | Add brand illustrations or watermarks inside test areas. |
| **Charts** | Use the dashed mint line (`#5BB78D`) for the candidate's target band. | Use solid red or arbitrary neon lines for targets. |
| **Voice** | Write direct, supportive sentences: *"Saved. Your streak continues."* | Use childish exclamations: *"Awesome job rockstar! 🌟"* |
