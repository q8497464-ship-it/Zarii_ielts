# Zarii IELTS — Admin Security & QA Manual Checklist

This manual QA checklist provides test criteria, security verification protocols, and a comprehensive permissions matrix for validating the administrative portal (`/admin`).

---

## 1. Role-Based Permissions Matrix (RBAC)

The table below outlines the access boundary across all platform resources for the three system roles:

| Platform Feature / Entity | Student | Content Editor | Administrator |
| :--- | :---: | :---: | :---: |
| **Access to `/admin` & `/admin/*`** | ❌ Blocked (Access Denied) | ✅ Allowed (Scoped) | ✅ Full Access |
| **View Published Tests** | ✅ Yes | ✅ Yes | ✅ Yes |
| **View Draft & Archived Tests** | ❌ No | ✅ Yes | ✅ Yes |
| **Create & Edit Tests** | ❌ No | ✅ Yes | ✅ Yes |
| **Delete Tests (Soft / Hard Delete)** | ❌ No | ❌ No (Blocked) | ✅ Yes (Type-to-Confirm) |
| **Manage Vocabulary & Grammar** | ❌ No | ✅ Yes | ✅ Yes |
| **Upload Media Assets (Audio/Images)** | ❌ No | ✅ Yes (Scoped Checks) | ✅ Yes |
| **View Student Attempts & Submissions** | 🔒 Own attempts only | ❌ No | ✅ Aggregated Analytics |
| **View User Directory (`/admin/users`)** | ❌ No | ❌ Restriction Screen | ✅ Yes |
| **Modify User Roles (`/admin/users`)** | ❌ No | ❌ No | ✅ Yes |
| **Delete Users** | 🔒 Own data only | ❌ No | ✅ Yes (Last Admin Guard) |
| **AI Provider Keys & Daily Limits** | ❌ Browser Blocked | ❌ Restriction Screen | ✅ Read-masked / Update |
| **AI Prompt Calibration & Testing** | ❌ No | ❌ No | ✅ Yes |
| **Create & Schedule Announcements** | ❌ No | ✅ Yes | ✅ Yes |
| **Manage Feedback Inbox** | 📝 Submit only | ✅ Yes | ✅ Yes |
| **System Audit Log (`/admin/system`)** | ❌ No | ❌ Restriction Screen | ✅ Yes (Read-only CSV) |
| **Database Backups & Restore** | 🔒 Personal export | ❌ Restriction Screen | ✅ Full JSON Export/Dry-run |
| **Feature Flags Management** | 👁️ Client flags only | ❌ No | ✅ Yes |

---

## 2. Destructive Actions & High-Risk Safeguards

### A. Last Admin Protection
- **Rule**: The platform must never allow the deletion, suspension, or demotion of the final remaining active administrator account.
- **Verification**:
  1. Navigate to `/admin/users`.
  2. Locate the sole active administrator.
  3. Attempt to change role to `student` or click **Delete User**.
  4. **Expected Result**: System blocks the action with a modal alert: *"Cannot remove or demote the last remaining administrator."*

### B. Type-to-Confirm Deletion
- **Rule**: Deleting tests, question pools, or wiping user cohorts requires typing the explicit confirmation string (e.g., `DELETE`).
- **Verification**:
  1. Open a test in `/admin/content`.
  2. Click **Delete Test**.
  3. Verify the **Confirm** button remains disabled until the word `DELETE` is typed exactly into the input field.

### C. Soft-Delete & Version Snapshots
- **Rule**: Content changes auto-save draft snapshots (up to 10 historical revisions). Soft-deleted tests enter the `archived` state and can be restored at any time.

---

## 3. Backup, Export & Dry-Run Restore QA

### A. One-Click Full Database Export
1. Go to `/admin/system` ➔ **Backups**.
2. Click **Create Full Export**.
3. Inspect the downloaded JSON file:
   - Contains `exportVersion`, `exportedAt`, `tests`, `passages`, `sections`, `questions`, `vocab`, `grammar`, `writing`, and `speaking`.
   - Ensure no raw API secrets (`GEMINI_API_KEY`, `GROQ_API_KEY`) are present in the export bundle.

### B. Dry-Run Import Validation
1. Click **Restore from Backup**.
2. Select a JSON backup archive.
3. Verify that the **Dry-Run Summary** displays:
   - Total test count detected.
   - Total vocabulary count detected.
   - Validation status: Green checkmark if payload schema is clean; red list of schema discrepancies if invalid.
4. Confirm changes only apply after clicking **Commit Restore**.

---

## 4. Mobile & Tablet Responsive QA Checklist

| Viewport | Test Procedure | Expected Visual & Interaction Behavior |
| :--- | :--- | :--- |
| **Desktop (≥ 1440px)** | Open `/admin` on widescreen display | Persistent deep green sidebar (`#124F40`, 260px), top bar with breadcrumbs and Quick Search (`Ctrl+K`), multi-column DataTables with pagination. |
| **Tablet (768px – 1024px)** | Resize browser to iPad / tablet resolution | Sidebar collapses to compact navigation icon mode or accessible slide-out drawer. Filter bars wrap gracefully without clipping. |
| **Mobile (< 768px)** | Emulate iPhone / Android mobile device | Top bar displays mobile menu burger toggle. Sidebar becomes an off-canvas drawer. DataTables enable smooth horizontal finger scrolling. Action buttons convert to stacked touch targets (min 44px height). |

---

## 5. Dark Mode & Accessibility QA

- **Light Mode Tokens**:
  - Background: `#F7FAF8`
  - Admin Shell: Deep forest green `#124F40` with white text
  - Active Nav Indicator: Mint `#5BB78D`
- **Dark Mode Tokens**:
  - Background: `#0B1612` / `#112019`
  - Borders: `#24392F`
  - Cards: `#172A21`
- **Contrast Check**:
  - Text contrast ratio against dark sidebar background `#124F40` is ≥ 7.0:1 (AAA).
  - Status badges (*published*, *draft*, *archived*) maintain readable contrast in both light and dark themes.

---

## 6. Session Timeout & Rate Limiting QA

- **Inactivity Timeout**:
  - Log into `/admin`.
  - Leave tab untouched for 30 minutes (or advance system clock).
  - Attempt to click any navigation link.
  - **Expected Result**: Admin session is immediately cleared; user is redirected to `/admin/login?reason=timeout` with an amber alert notice.
- **Login Brute-Force Rate Limiting**:
  - Enter incorrect password on `/admin/login` 5 times consecutively.
  - **Expected Result**: On the 5th attempt, login button disables with a countdown: *"Rate limit exceeded. Login locked for 60 seconds."*
