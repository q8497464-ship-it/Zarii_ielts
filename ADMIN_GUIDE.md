# Zarii Administrator & Editor Guide

Welcome to the Zarii Admin Console. This guide provides comprehensive operational instructions for managing the English Course curriculum, the built-in dictionary patch layer, IELTS test content, user analytics, and system controls.

---

## 1. Accessing the Admin Console

1. Navigate to `/admin/login`.
2. Sign in with an account having the `admin` or `editor` role.
3. Access hierarchy:
   - **Editor**: Access to **Course Manager**, **Dictionary Manager**, **Content CMS**, and **Communication**.
   - **Admin**: Full unrestricted access including **Users**, **Analytics**, **AI & Evaluation**, **Site Settings**, and **System**.

---

## 2. Course Manager (`/admin/course`)

The Course Manager empowers editors to manage the complete General English curriculum from A1 to C1.

### Curriculum Structure
- Browse levels: **A1 Beginner**, **A2 Elementary**, **B1 Intermediate**, **B2 Upper-Intermediate**, **C1 Advanced**.
- Units and lessons are ordered sequentially with status indicators (`published`, `draft`, `archived`).

### Lesson Editor & Live Student Preview
1. Click **Edit Lesson** or **New Lesson**.
2. **Section Forms**:
   - *Explain Section*: Title, objective, explanation markdown, callout boxes (*Rule, Tip, Careful*), and optional Urdu comparison note.
   - *Timeline Section*: Visual representation of grammar tenses with accessible labels.
   - *Examples Section*: Model sentences with audio playback configuration.
   - *Exercises Section*: Add and configure varied exercise types (Multiple Choice, Reorder Sentence, Fill in the Blanks, Categorize, Matching Pairs, Error Correction).
   - *Quiz & Summary*: 5-question checkpoint quiz with rationales for all answers.
3. **Live Student Preview**: Toggle the right-hand preview panel to see the lesson rendered with the exact same player and styling as the student application.
4. **Validation Panel**:
   - The editor blocks publishing if any of the following checks fail:
     - Missing explanation or empty answer keys.
     - Unbalanced MCQ option distribution.
     - Missing dictionary headword mappings.

### Quality Insights Dashboard
- Displays lessons with the lowest pass rate on unit tests.
- Surfaces questions with high incorrect answer rates for curriculum refinement.
- Tracks feedback reports submitted by students.

---

## 3. Dictionary Manager (`/admin/dictionary`)

The Dictionary Manager controls the patch layer applied over the static 144k WordNet corpora.

### Patch Layer Management
- **Search Any Headword**: Instant search across all 144,456 dictionary entries.
- **Add / Edit Entries**: Add custom definitions, colloquial terms, or Urdu translations without altering immutable static shards.
- **Hide Entries**: Suppress sensitive or obsolete entries.
- **Urdu Translation Review**: Flag entries requiring native Urdu language review.

### CSV Dry-Run Import & Release Workflow
1. Navigate to **Dictionary > Batch Operations**.
2. Upload a patch CSV with columns: `word, pos, definition, urduMeaning, cefrLevel`.
3. Click **Dry-Run Validation**:
   - The system validates formatting, checks for collisions, and previews additions and updates before modifying the database.
4. Click **Apply Patches**: Writes changes to the patch store.

---

## 4. Track Settings & Feature Flags (`/admin/settings`)

Administrators can toggle system-wide learning tracks and features:
- **Enable English Course Track**: Toggles the visibility of `/app/english/*` for all students.
- **Enable IELTS Track**: Toggles the visibility of `/app/ielts/*`.
- **Safe Mode Enforcement**: Controls whether sensitive dictionary words are masked by default.
- **Offline Pack Downloads**: Enables or restricts client-side caching of the Essential 20k pack.

---

## 5. User Analytics & Progress Drop-off (`/admin/analytics`)

- **Track Preference Breakdown**: Visualizes the percentage of students choosing "English Course", "IELTS Preparation", or "Both".
- **Level Drop-off Funnel**: Tracks student progression through A1 $\rightarrow$ A2 $\rightarrow$ B1 $\rightarrow$ B2 $\rightarrow$ C1 and identifies bottleneck lessons.
- **Cross-Track Conversion**: Reports candidates who completed B2/C1 English lessons and transitioned into IELTS practice.
