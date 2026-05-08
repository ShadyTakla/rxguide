# AGENTS.md — rxguide Contributor & Agent Guide

**Purpose:** This is the canonical onboarding document for any developer or AI agent working on rxguide. Read it before making changes. It captures the data architecture, schemas, deployment model, content/citation rules, format conventions, common pitfalls, validation workflow, audit history, and gap list.

**If you skip this and just start editing, you will break things.** Several past bugs (init-order rendering crashes, orphaned reference tables, false-positive drug aliases, duplicate data structures, broken width layout) came from agents not understanding the architecture. This document exists to prevent recurrence.

---

## Table of Contents
1. [Project overview](#1-project-overview)
2. [Repository & deployment model](#2-repository--deployment-model)
3. [File architecture & data structures](#3-file-architecture--data-structures)
4. [Canonical data schemas](#4-canonical-data-schemas)
5. [Critical rendering paths](#5-critical-rendering-paths)
6. [Cross-app integration rules — adding content](#6-cross-app-integration-rules--adding-content)
7. [Reference / citation rules](#7-reference--citation-rules)
8. [Format & writing conventions](#8-format--writing-conventions)
9. [Common pitfalls & how to avoid](#9-common-pitfalls--how-to-avoid)
10. [Validation workflow](#10-validation-workflow)
11. [Branch / deploy workflow](#11-branch--deploy-workflow)
12. [What has been audited](#12-what-has-been-audited)
13. [What can still be audited](#13-what-can-still-be-audited)
14. [Features currently available](#14-features-currently-available)
15. [Gaps still to fill](#15-gaps-still-to-fill)
16. [Quick reference cheat sheet](#16-quick-reference-cheat-sheet)

---

## 1. Project overview

**rxguide** is a single-page web application for Canadian community pharmacy practice — drug monographs, disease management cards, vaccine reference, drug interactions, deprescribing protocols, minor ailments, jurisprudence, and more.

- **Audience:** Canadian community pharmacists (Ontario primary), pharmacy students, residents.
- **Architecture:** Single static HTML file (~22 MB, ~245K lines) served by GitHub Pages.
- **No backend:** All data is embedded inline as JavaScript `var X = {}` structures. No fetch/AJAX.
- **No build step:** The file you edit is the file that ships. No bundler, no transpilation, no tests.
- **Liability stance:** Pure reference/teaching content. NO patient-specific dose calculators or decision-makers — only published reference tables, evidence-based guideline summaries, and structured monographs.

**Live URL:** `https://shadytakla.github.io/rxguide/`

---

## 2. Repository & deployment model

### Git/branch model
- **`main`** = production. Everything on `main` is live within ~30–60 seconds of a push (GitHub Pages auto-rebuild).
- **Feature branches** named `claude/<purpose>-<random>` for AI-driven work. Develop here.
- **PR-based merges** to main. Do NOT push directly to `main` (it is protected and will return 403).

### Deployment workflow
1. Develop on feature branch.
2. Validate JS parses (`node --check` against extracted `<script>`).
3. Commit with a descriptive message.
4. Push to feature branch.
5. Open PR via GitHub MCP (`mcp__github__create_pull_request`).
6. Merge PR to main via `mcp__github__merge_pull_request` (merge method: `merge`).
7. Live within seconds.

**The harness blocks direct pushes to `main`.** Always use a PR.

### Constraints for AI agents
- Repo scope is restricted to `shadytakla/rxguide` only — do not touch other repos.
- Do not skip git hooks (`--no-verify`).
- Do not amend commits — create new ones.
- Do not force-push.

---

## 3. File architecture & data structures

The entire app lives in **`/home/user/rxguide/index.html`**. Top-level structure:

```
<head>
  <style>...</style>          <!-- ~410 lines of CSS -->
</head>
<body>
  <header>...</header>          <!-- nav, search bar -->
  <main>
    <div id="sidebar">          <!-- disease nav -->
    <div id="tab-content">      <!-- 9 tab panels -->
      <div id="tab-diseases">
      <div id="tab-interactions">
      <div id="tab-reference">
      <div id="tab-jurisprudence">
      <div id="tab-minor_ailments">
      <div id="tab-antimicrobials">
      <div id="tab-pregnancy">
      <div id="tab-formulary">
      <div id="tab-vaccinations">
    </div>
  </main>
  <script>
    var DISEASES = { ... };           <!-- line ~632, ~3.5 MB -->
    var DRUGS = { ... };              <!-- line ~39,878, the largest structure -->
    var DRUG_FAMILIES = { ... };
    var FAMILY_MAP = { ... };
    var NAPRA_ODB_DATA = { ... };
    var MINOR_AILMENTS = [ ... ];
    var _DRUG_ALIASES = { ... };      <!-- internal alias→key map -->
    var _AGENT_NOISE_WORDS = { ... };
    var _DRUG_LINK_BLOCKLIST = { ... };
    var VACCINES = { ... };
    var SCORING_TOOLS = { ... };
    var SCORE_PATTERNS = { ... };
    var AMR_TO_FAMILY_KEY = { ... };
    var FAMILY_UMBRELLA_CHILDREN = { ... };
    var AMR_SUBGROUPS = { ... };
    var EMPIRIC_THERAPY_CATEGORIES = { ... };
    var EMPIRIC_THERAPY_SYNDROMES = [ ... ];
    var PREG_DATA = { ... };
    var DEPRESCRIBING_PROTOCOLS = [ ... ];
    var REFERENCE_TABLES = [ ... ];

    // ... ~3,500 lines of rendering functions ...
    function buildHomeGrid() { ... }
    function showDrugPanel(key) { ... }
    function renderDrugLink(agentStr) { ... }
    // etc.
  </script>
</body>
```

### Top-level structure counts (as of 2026-05-08)

| Structure | Type | Count | Purpose |
|---|---|---|---|
| `DRUGS` | `{key: {...}}` | 1,089 | Drug monographs |
| `VACCINES` | `{key: {...}}` | 56 | Vaccine monographs (separate from DRUGS — see §6.2) |
| `DISEASES` | `{cat: {label, icon, conditions: [...]}}` | 20 categories / 450 conditions | Disease management cards |
| `REFERENCE_TABLES` | `[...]` | 61 | Tabular reference content (rendered in 9 categories) |
| `DEPRESCRIBING_PROTOCOLS` | `[...]` | 17 | Tapering/deprescribing workflows |
| `MINOR_AILMENTS` | `[...]` | 19 | Pharmacist-prescribable conditions |
| `PREG_DATA` | `{key: {...}}` | 1,088 | Pregnancy + lactation summaries (DRUGS-keyed) |
| `NAPRA_ODB_DATA` | `{key: {...}}` | 1,089 | NAPRA scheduling + ODB coverage (DRUGS-keyed) |
| `DRUG_FAMILIES` | `{name: {...}}` | 454 | Drug class definitions |
| `FAMILY_MAP` | `{key: "Family"}` | 1,198 | Drug → family mapping |
| `EMPIRIC_THERAPY_SYNDROMES` | `[...]` | 67 | AMT/Bug-Drugs syndromes |

### Other structures
- `_DRUG_ALIASES` — alias→canonical-key for `renderDrugLink`
- `_AGENT_NOISE_WORDS` — words to skip when parsing agent strings (mg, IV, BID, etc.)
- `_DRUG_LINK_BLOCKLIST` — words that should NEVER auto-link (oral, sodium, calcium, etc.)
- `SCORING_TOOLS`, `SCORE_PATTERNS` — clinical risk calculators (CHA2DS2-VASc, etc.)

---

## 4. Canonical data schemas

### 4.1 DRUGS

Each drug is a key (snake_case) → object:

```js
"acetaminophen": {
  name: "Acetaminophen (Tylenol / multiple brands)",  // REQUIRED
  brand: "Tylenol; many generics; combination products",
  class: "Non-opioid analgesic / antipyretic",
  napra: "Schedule III/Unscheduled (varies by package size)",  // canonical: I/II/III/Unscheduled
  moa: "...",                                                  // long-form prose
  indications: [...],                                          // array of strings
  dosing: { "Indication 1": "...", "Indication 2": "..." } || [{indication, dose}, ...],
  side_effects: { common: [...], serious: [...] },
  contraindications: [...],
  interactions: [
    {
      drug: "Drug name (Brand)",                               // REQUIRED — string
      severity: "Major",                                       // REQUIRED — canonical 6 values
      mechanism: "...",                                        // REQUIRED
      management: "..."                                        // REQUIRED
    },
    // ...
  ],
  pregnancy: "...",                                            // string OR pulled from PREG_DATA
  pk: "..." || { absorption, half_life, renal_adjustment },
  canadian_notes: "Health Canada / CADTH / ODB context",
  pearls: [...],
  monitoring: [...],
  patient_counseling: "...",
  source: "..."                                                // citations (see §7)
}
```

**Canonical interaction severity values** (use ONLY these, no others):
- `"Beneficial"` — intentional therapeutic combination
- `"Contraindicated"` — never combine
- `"Major"` — significant risk; usually avoid or close monitoring
- `"Moderate"` — modify therapy or monitor
- `"Minor"` — clinically minor; awareness only
- `"Note"` — informational; not an active interaction

### 4.2 VACCINES (separate from DRUGS — do NOT merge)

```js
"shingrix": {
  name: "Recombinant Zoster Vaccine (RZV, Shingrix)",
  brand: "Shingrix (GSK)",
  class: "Recombinant subunit (glycoprotein E) adjuvanted vaccine",
  napra: "Schedule II in Ontario...",
  category: "Adult / High-Risk",                                // VACCINES-only field
  min_age: "50 years",                                          // VACCINES-only field
  pharmacist_can_prescribe: true,                               // VACCINES-only field
  pharmacist_can_inject: true,                                  // VACCINES-only field
  moa: "...",
  indications: [...],
  dosing: [{route, dose, notes}, ...],                          // array-of-objects (NOT key-value)
  side_effects: { common: [...], serious: [...] },
  contraindications: [...],
  interactions: [{drug, severity, mechanism, management}, ...],
  pregnancy: "...",
  pk: { absorption, half_life, renal_adjustment } || "...",
  canadian_notes: "...",
  pearls: [...],
  source: "..."
}
```

### 4.3 DISEASES

```js
DISEASES = {
  cardiology: {
    label: "Cardiology",
    icon: "❤️",
    color: "#ef4444",
    conditions: [
      {
        id: "acs_postmi",                                       // REQUIRED — snake_case
        name: "Acute Coronary Syndrome / Post-MI",              // REQUIRED — display name
        subtitle: "...",
        rxfiles_ref: "...",                                     // optional reference link
        introduction: "...",                                    // long-form prose
        patho: "...",                                           // pathophysiology
        signs: [...],
        diagnosis: [...],
        treatment: [
          {
            line: "First-Line",                                 // REQUIRED — display label
            type: "Drug" | "Non-Drug" | "Procedure" | "Strategy" | "Counselling" | etc.,
            agents: ["acetaminophen", "ibuprofen"],             // DRUGS or VACCINES keys
            notes: "...",                                       // long-form prose
            guideline: "...",                                   // evidence reference
            family: "...",                                      // optional family label
            details: "...",                                     // alternative to notes (some entries)
            criteria: "..."                                     // optional eligibility text
          },
          // ...
        ],
        monitoring: [...],
        pearls: [...],
        source: "...",
        preg_lact_summary: {                                    // PRECOMPUTED (see §6.4)
          preg: { "Compatible": [{k, name}, ...], ... },
          bf: { "Compatible": [{k, name}, ...], ... }
        }
      },
      // ...
    ]
  },
  // ... 19 more categories
}
```

**Disease category order** is controlled by the explicit `DISEASE_CATEGORY_ORDER` array (NOT by `Object.keys`). Current order:

```
cardiology → endocrinology → psychiatry → respirology → nephrology →
rheumatology → hematology → gastroenterology → urology → infectious →
pain → oncology → ophthalmology → ent → dermatology →
womens_health → pediatrics → palliative → travel → practice
```

To add a new category: append the key to `DISEASE_CATEGORY_ORDER` AND add the category data to `DISEASES`. Both must be in sync.

### 4.4 REFERENCE_TABLES

```js
{
  id: "opioid_mme",                                             // REQUIRED — snake_case
  title: "Opioid Morphine Equivalent (MME) Reference",         // REQUIRED
  icon: "💉",
  color: "#dc2626",
  overview: "...",                                              // intro paragraph
  warnings: ["...", ...],                                       // safety callouts
  columns: ["Header 1", "Header 2", ...],                       // table columns
  rows: [
    ["Cell A", "Cell B", ...],                                  // row 1
    ["Cell A", "Cell B", ...],                                  // row 2
    // ...
  ],
  source: "...",                                                // citations
  related_drugs: ["morphine", "hydromorphone", ...],            // DRUGS keys for cross-links
  related_protocols: ["opioid_chronic", ...]                    // DEPRESCRIBING_PROTOCOLS ids
}
```

**CRITICAL: Reference tables are categorized for display by hardcoded ID arrays in `buildReference()`.** Adding a new table to `REFERENCE_TABLES` is NOT enough — you must also add its ID to one of the category lists in `buildReference()`, or the table will be **orphaned** (data exists, but invisible in the UI). See §6.5.

### 4.5 DEPRESCRIBING_PROTOCOLS

```js
{
  id: "ppi",                                                    // REQUIRED — snake_case
  title: "Proton Pump Inhibitor (PPI) Deprescribing",          // REQUIRED
  icon: "💊",
  color: "#06b6d4",
  overview: "...",
  indications_to_continue: [...],
  consider_deprescribing: [...],
  taper_steps: [...],                                           // step-by-step
  monitoring: [...],
  rebound_management: [...],
  counselling: [...],
  sources: "..."
}
```

DEPRESCRIBING_PROTOCOLS is auto-rendered in the Deprescribing Protocols category — **no buildReference dispatch update needed**, unlike REFERENCE_TABLES.

### 4.6 MINOR_AILMENTS

```js
{
  name: "Allergic Rhinitis",
  icon: "🤧",
  category: "ENT" | "Dermatology" | "GI" | "Womens Health" | "Infectious" | "Ophthalmology" | "MSK" | "Oral" | "Prevention" | "Oral/Dermatology",
  ontario_ma_scope: "...",                                      // OCP scope statement
  ontario_prescribing_authority: "...",                         // optional
  assessment: { key_questions: [...], red_flags: [...], clinical_considerations: [...], ddx: [...] },
  treatment: { first_line: [...], second_line: [...], non_pharm: [...], refer_when: [...], drug_interactions_on_cessation: [...] },
  references: [...],
  patient_counselling: [...],
  therapeutic_flow: [...],                                      // step list for visual flow
  interactive_flow: { start: "id", nodes: { ... } }             // decision wizard (optional)
}
```

### 4.7 PREG_DATA

```js
"acetaminophen": {                                              // SAME key as DRUGS
  name: "Acetaminophen (Tylenol / multiple brands)",
  pregRisk: "Compatible",                                       // bucket value
  pregColor: "#22c55e",                                         // matches bucket
  bfRisk: "Compatible",
  bfColor: "#22c55e",
  pregDetail: "...",                                            // long-form
  bfDetail: "..."
}
```

**Risk bucket values** (used by per-disease `preg_lact_summary` classifier in §6.4):
- `"Compatible"` → green
- `"Caution"` → amber
- `"Avoid"` → red
- `"Contraindicated"` → dark red (preg only; lactation maps to Avoid)
- `"Limited Data"` → grey

The classifier (`classifyPregRisk`) in `/tmp/precompute_preg_lact.js` accepts variations ("first-line", "preferred", "compatible", "safe", "recommended" → Compatible; "avoid", "not recommended" → Avoid; etc.).

### 4.8 NAPRA_ODB_DATA

```js
"acetaminophen": {                                              // SAME key as DRUGS
  napra: "...",                                                 // I / II / III / Unscheduled
  odbStatus: "...",                                             // GB / LU / not covered / etc.
  odbCriteria: "...",                                           // LU criteria text
  // ...
}
```

### 4.9 DRUG_FAMILIES

```js
"Cephalosporins": {
  name: "Cephalosporins",
  abbrev: "Ceph — β-lactam antibiotics",
  class_color: "#10b981",
  moa_summary: "...",
  class_effects: [...],
  class_contraindications: [...],
  comparison: [...] || members: [...],
  canadian_notes: "...",
  source: "..."
}
```

### 4.10 FAMILY_MAP

Simple `{drugKey: "Family Name"}` map. Used by `showDrugPanel` to display the class badge that links to the family panel.

```js
"cephalexin": "Cephalosporins",
"ceftriaxone": "Cephalosporins",
"cyclosporine": "Calcineurin Inhibitors",
// ...
```

---

## 5. Critical rendering paths

### 5.1 `renderDrugLink(agentStr)` — the universal drug-string-to-link converter

Used everywhere a drug name string needs to become a clickable card link.

```js
function renderDrugLink(agentStr) {
  // Strategy 1: full base normalized to slug (drops dose/units etc.)
  // Strategy 2: tokenize, strip noise/dose tokens, try compound prefixes
  // Strategy 3: hyphenated combo fallback
  // Resolves DRUGS first, then VACCINES, then via _DRUG_ALIASES
  // If input is bare snake_case key → display proper name from entry
  // Returns <span class="drug-link" onclick="showDrugPanel('key')">label</span>
}
```

**Critical behaviors:**
- Resolves both DRUGS and VACCINES (single rendering path).
- If `agentStr` is a bare snake_case key (e.g. `"yf_vax"`, `"bcg"`), substitutes the entry's `name` so disease cards show "Yellow Fever Vaccine" not "yf_vax".
- Returns a non-clickable `<span class="drug-name">` if no resolution.

### 5.2 `showDrugPanel(drugKey)` — opens the drug card overlay

```js
function showDrugPanel(drugKey) {
  var drug = DRUGS[drugKey] || (typeof VACCINES !== 'undefined' ? VACCINES[drugKey] : null);
  // ... renders panel
}
```

Already supports VACCINES via fallback. Don't duplicate vaccine data into DRUGS.

### 5.3 `buildPregLactSection(cond)` — renders the per-disease preg/lact callout

Reads `cond.preg_lact_summary` (PRECOMPUTED static data — see §6.4). Does NOT do runtime lookups against PREG_DATA. If you change a drug's `pregRisk` in PREG_DATA, you MUST regenerate the static buckets via `/tmp/precompute_preg_lact.js`.

### 5.4 `buildReference()` — Reference tab rendering

Hardcoded category dispatch. Each category is defined by an ID array of `REFERENCE_TABLES.id` values. Adding a table to `REFERENCE_TABLES` without updating this dispatch leaves it orphaned.

Current 9 categories (post-consolidation in PR #17):
1. Deprescribing Protocols (auto from `DEPRESCRIBING_PROTOCOLS`)
2. Toxicology & Acute Management
3. Anticoagulation Management
4. Comparative Dosing & Equivalence
5. Medication Safety (Geriatric, LASA, High-Alert)
6. Drug Adverse Effects & Allergy
7. Drug-Food Interactions
8. Pediatric Dosing
9. Pharmacogenomics (CPIC)

### 5.5 `buildJuri()` / `showJuri(idx)` / `closeJuri()` — Jurisprudence detail-page

Pattern matches Minor Ailments. Topics defined inline in `buildJuri()`, cached at module scope as `_JURI_TOPICS` for retrieval by `showJuri(idx)`.

### 5.6 `buildHomeGrid()` / `buildSidebar()` — disease navigation

Both iterate `DISEASE_CATEGORY_ORDER` (NOT `Object.keys(DISEASES)`). Order changes belong in that array.

### 5.7 Tab CSS — width & centering

```css
.tab-panel {
  display: none;
  flex: 1;
  max-width: 1520px;          /* ALL tabs share this cap */
  width: 100%;
  margin: 0 auto;             /* centres flex item via auto margins */
  overflow-y: auto;
  padding: 24px;
  flex-direction: column;
}
.tab-panel.active { display: flex; }
```

Do not change `max-width: 1520px` without explicit user request — this was set to standardize all tabs (PR #18).

---

## 6. Cross-app integration rules — adding content

When adding a new entry, several data structures must be updated together. Failing to do so causes invisible/broken links, unsearchable drugs, missing pregnancy data, etc.

### 6.1 Adding a new DRUG

You MUST update:
1. **`DRUGS[key] = {...}`** with full schema (§4.1).
2. **`PREG_DATA[key] = {...}`** — pregnancy + lactation summary (§4.7). Without this, the per-disease preg/lact section will mark this drug as "Limited Data".
3. **`NAPRA_ODB_DATA[key] = {...}`** — NAPRA scheduling + ODB coverage. Drives the badges on the drug card.
4. **`FAMILY_MAP[key] = "FamilyName"`** if the drug belongs to an existing family.
5. **`DRUG_FAMILIES["FamilyName"] = {...}`** if it's a NEW family that doesn't yet exist (rare).
6. **Existing drug interactions** — update the `interactions` array on RELATED drugs to include the new drug if there's a clinically meaningful interaction (bidirectional).
7. **Disease cards** that should reference the new drug — update `treatment[i].agents` arrays (or rely on the existing notes-text repopulation if the drug name is in prose).
8. **Re-run** `/tmp/precompute_preg_lact.js` if the drug appears in any disease's `treatment.agents` — to update the static `preg_lact_summary` buckets.

**Naming convention for keys:** snake_case, English generic name. Combination products use underscore-separated components:
- `"acetaminophen"` ✓
- `"amoxicillin_clavulanate"` ✓
- `"sulfamethoxazole_trimethoprim"` (not stored, but acceptable; current uses `sulfamethoxazole`)
- `"piperacillin_tazobactam"` ✓
- `"Tylenol"` ✗ (use brand only as alias, not as key)
- `"acetaminophen-paracetamol"` ✗ (use one canonical name; aliases via curated ALIASES lists)

### 6.2 Adding a new VACCINE

You MUST update:
1. **`VACCINES[key] = {...}`** with full schema (§4.2).
2. Add a curated alias to the ALIASES map in any agent-repopulation script (e.g., `gardasil_9: ['Gardasil-9','HPV vaccine','9vHPV']`).
3. Disease cards that reference this vaccine — update `treatment.agents`.
4. Re-run preg/lact precompute if relevant.

**Do NOT duplicate vaccine data into DRUGS.** The `renderDrugLink` resolver and `showDrugPanel` both fall back to VACCINES — single source of truth.

### 6.3 Adding a new DISEASE CONDITION

You MUST update:
1. **`DISEASES[category].conditions.push({...})`** with full schema (§4.3).
2. **Each `treatment[i].agents` array** must contain valid DRUGS or VACCINES keys.
3. **Re-run** `/tmp/precompute_preg_lact.js` to compute `preg_lact_summary` for the new condition.
4. (Optional) Add cross-references — drug interactions back to relevant DRUGS, related reference tables, deprescribing protocols.

**If adding a new disease CATEGORY** (rare): also append the key to `DISEASE_CATEGORY_ORDER` and add a colour to `catColors` in `buildHomeGrid`.

### 6.4 Adding pregnancy/lactation data for a new drug

If you add a drug to DRUGS, also add to PREG_DATA. Then for any disease referencing that drug, regenerate the static preg/lact buckets:

```bash
node /tmp/precompute_preg_lact.js
```

This script reads DISEASES + PREG_DATA + VACCINES, computes buckets, and writes back. Always run AFTER drug/vaccine additions and AFTER changes to disease.treatment.agents.

### 6.5 Adding a new REFERENCE_TABLE

You MUST update:
1. **`REFERENCE_TABLES.push({...})`** with full schema (§4.4).
2. **`buildReference()` category dispatch** — add the table's ID to the appropriate category's ID array. Without this, the table is orphaned (data exists, invisible in UI). Past bug — see PR #13.
3. (Optional) Add `related_drugs` keys for cross-link clicks.

If creating a NEW category, add to the `categories` array in `buildReference()` with key, icon, label, color, items. Try not to add new categories without strong justification — current 9 categories were consolidated from 12 in PR #17 because the user preferred broader groupings.

### 6.6 Adding a new DEPRESCRIBING_PROTOCOL

`DEPRESCRIBING_PROTOCOLS.push({...})` with full schema (§4.5). **Auto-rendered** — no dispatch update needed.

### 6.7 Adding a new MINOR_AILMENT

`MINOR_AILMENTS.push({...})` with full schema (§4.6). Auto-rendered. Decision wizards (`interactive_flow`) are optional but encouraged.

### 6.8 Adding a JURISPRUDENCE TOPIC

`buildJuri()` contains the topics array inline. Add a new entry with `title`, `icon`, `content`. Module-scope cache `_JURI_TOPICS` is rebuilt every `buildJuri()` invocation.

### 6.9 Cross-class interaction warnings

When introducing a new drug class with a class-level safety concern (e.g., new QT-prolonger, anticholinergic, nephrotoxin), add bidirectional warnings between members. See `/tmp/fix_remaining_interactions.js` (or similar) for the pattern. Warnings should reference:
- crediblemeds.org (QT)
- Beers Criteria 2023 / STOPP-START v3 2023 (anticholinergic, geriatric)
- ISMP Canada (high-alert)
- FDA + Health Canada Black Box (opioid+sedative)

---

## 7. Reference / citation rules

### 7.1 Hierarchy of source preference

When citing evidence, prefer in this order:

1. **Ontario-specific** sources (OCP, Health Quality Ontario, Cancer Care Ontario, MOHLTC formulary, ODB criteria, INESSS-style provincial agencies)
2. **Canadian national** sources (Health Canada Product Monographs, NACI, CADTH, CATMAT, PHAC, CDA, CFPC, Diabetes Canada, CCS, Hypertension Canada, CHEST Canadian, CSACI, OCP, CFP)
3. **US national** sources (FDA, CDC, NIH, ACR, AGA, AAP, AAFP, AHA, ACC, IDSA, ASH, ASCO, NCCN, ASPEN)
4. **International** (WHO, ESC, ESMO, ESH, EASL, EULAR, ESCMID, IPCRC, ILAE, KDIGO, MDS)

Citing a US guideline when a Canadian one exists is a code smell. Always check Canadian first.

### 7.2 Recency

- **Most recent edition only.** Do not cite "2018" guidelines if "2024" exists.
- For continuously-updated resources (LiverTox, Lexi-Interact, UpToDate, crediblemeds.org), append "(current YYYY)" or "(updated YYYY)".
- Annual updates (NACI flu statement, CADDRA ADHD): cite the year.

### 7.3 Official only

- ✗ Wikipedia, Medscape (lay), MedicineNet, Drugs.com (user reviews), random journal article without guideline backing.
- ✓ Government health agencies, registered specialty societies, peer-reviewed pivotal trials cited within official guidelines, official drug monographs.
- Pivotal trial citations are acceptable when accompanying a guideline (e.g., "EMPA-REG Zinman NEJM 2015" cited within "Diabetes Canada 2023 Guidelines").

### 7.4 What to put in the `source:` field

Concise pipe- or semicolon-separated list, oldest-first within a topic, ending with the most authoritative current Canadian source:

```
source: "ESC 2024 AF Guidelines; CCS Canadian AFib Guidelines 2023 Update; AHA/ACC/HRS 2023 AFib; CADTH AFib Stroke Prevention; Health Canada Product Monographs."
```

### 7.5 What to NOT cite

- Patient-facing organizations as primary sources (use guidelines, not WebMD).
- Single news articles or editorials.
- Pharma marketing materials.
- Unverified online drug databases.

---

## 8. Format & writing conventions

### 8.1 Bullet vs prose

- **Bulleted lists** (`[...]` arrays in JS, rendered as `<ul>`):
  - `indications`, `signs`, `diagnosis`, `monitoring`, `pearls`, `contraindications`, `side_effects.common/serious`, `warnings` (in REFERENCE_TABLES) — short discrete items.
  - `taper_steps`, `treatment` (in MINOR_AILMENTS), `assessment.key_questions` — workflow steps or distinct considerations.
- **Prose** (string fields):
  - `introduction`, `patho`, `notes` (in treatment rows), `mechanism`, `management` (in interactions), `overview`, `canadian_notes`, `pregnancy`, `bfDetail`, `pregDetail` — narrative explanations with context.
- **Mixed** (some entries):
  - `dosing` can be `{indication: "..."}` map OR array of `{indication, dose, notes}` objects. Match the surrounding pattern of the structure you're editing.

### 8.2 Long-form prose style

- Active voice, present tense.
- Specific numbers (doses, percentages, intervals) — not vague qualifiers.
- Acronyms expanded on first use within a paragraph (e.g., "HPA-axis (hypothalamic-pituitary-adrenal)").
- Canadian English spellings (preferred): paediatric/pediatric — match existing entries; both are present.
- Em-dashes `—` for parenthetical clauses; semicolons for tight lists within a sentence.

### 8.3 Drug naming inside prose

- First mention: full generic name + (Brand) if relevant.
  - "PREDNISONE 5–60 mg/day"
  - "VAREICLINE (Champix)"
- Repeated mentions: generic only (acceptable to drop brand after introduction).
- ALL CAPS is acceptable for emphasis on drug names within densely-written notes (existing convention).
- Use **canonical generic names** (acetaminophen, not paracetamol; salbutamol, not albuterol — though both are accepted as aliases).

### 8.4 Treatment row `notes` field

Standard pattern observed across DISEASES:

```
"NOTES: First sentence is the headline (often ALL-CAPS DRUG with dose).
Subsequent sentences elaborate mechanism, dose adjustments, special
populations, monitoring, evidence (specific trial citation acceptable).
End with Canadian-context note if relevant (ODB, NACI, OCP scope)."
```

Prose 200–800 chars typical. Cite within the row's `guideline:` field.

### 8.5 Interaction `mechanism` and `management`

- `mechanism`: brief (1–3 sentences) — what physiologically/pharmacokinetically happens.
- `management`: actionable (1–4 sentences) — what the pharmacist should DO. Include doses/timing/monitoring frequency where applicable. Avoid vague "monitor closely" — always specify what to monitor.

### 8.6 Severity classification

Use ONLY the 6 canonical values (§4.1). When in doubt:
- True drug name confusion or duplicative therapy → typically Major or Contraindicated.
- Theoretical/in vitro / minimal clinical reports → Note or Minor.
- "Avoid" without explicit contraindication → Major.
- Required combination (e.g., MTX + folic acid; sirolimus + cyclosporine post-transplant) → Beneficial.

### 8.7 Headers within HTML content (jurisprudence, drug card, etc.)

- `<h4>` for sub-sections within long content.
- `<strong>`, `<em>` for emphasis.
- `<ul>` for sub-lists; nest `<li>` inside.
- `<p style="background:rgba(99,102,241,0.15);padding:10px;border-radius:6px;border-left:3px solid var(--accent2);">` for callout boxes.

---

## 9. Common pitfalls & how to avoid

### 9.1 The init-order bug
**Symptom:** Reference tab opens to a blank page; categories don't render.
**Cause:** A `var X = ...` declaration that's USED inside a function but DEFINED later in source. JS hoists `var` declarations but not initializations.
**Past instance:** PR `7a2711e` — `DRUG_CLASS_MAP` was defined AFTER it was first used in `showReferenceTable`.
**Avoidance:** Always define data dependencies BEFORE the function that uses them. When restructuring, search for the variable name to confirm definition order.

### 9.2 Alias false positives
**Symptom:** Drug auto-linked where it shouldn't be (e.g., MMR vaccine link in CML notes).
**Cause:** Short or ambiguous aliases — "MMR" is both Major Molecular Response (oncology) and MMR vaccine.
**Avoidance:**
- Curated `ALIASES` lists (see `/tmp/add_vaccines_and_repopulate.js` for example).
- Aggressive generic blocklist: routes, forms, drug classes, ions, pharmacology terms, ambiguous first-words ("interferon", "insulin", "heparin").
- Reject numeric-prefixed strings (e.g., "0.1%" should not match a drug).
- Short-alias allowlist ONLY for unambiguous cases (ASA, TXA, NAC, APAP, PCN). Do NOT add MMR, HPV (these are disease/molecular abbreviations too).

### 9.3 Orphaned reference tables
**Symptom:** Added a reference table; it doesn't appear in the Reference tab.
**Cause:** `REFERENCE_TABLES` has the data but `buildReference()` category dispatch lacks the ID.
**Avoidance:** Always update both — add to `REFERENCE_TABLES` + add to a category's ID array in `buildReference()`. Verify the table count appears correctly in the category tile after the change.

### 9.4 String-typed interactions
**Symptom:** Drug card "Interactions" section won't expand or shows raw text.
**Cause:** Interaction entries written as strings instead of `{drug, severity, mechanism, management}` objects.
**Avoidance:** Always use object schema. Validate after batch additions.

### 9.5 Duplicate FAMILY_MAP entries / orphaned families
**Symptom:** Drug doesn't show class badge, OR shows class badge linking to a missing family.
**Cause:** Adding a drug without updating FAMILY_MAP, OR adding a family entry without DRUG_FAMILIES.
**Avoidance:** When adding a drug, verify FAMILY_MAP[key] points to an EXISTING DRUG_FAMILIES entry. When deprecating a drug, also remove from FAMILY_MAP.

### 9.6 Duplicate vaccine drug-cards
**Symptom:** Adult and pediatric vaccine variants look like duplicates in search.
**Cause:** They ARE separate products with separate keys (Comirnaty + Comirnaty Pediatric). User perceives as duplicates because labels look similar.
**Avoidance:** Search labels include `category + min_age` suffix to disambiguate (PR #12). When adding a new vaccine variant, ensure `category` and `min_age` fields are populated.

### 9.7 Tab width inconsistency
**Symptom:** A tab takes the full screen width while others are constrained.
**Cause:** Inline width style or wrapper div overriding `.tab-panel { max-width: 1520px }`.
**Avoidance:** Don't add wrapper divs with their own width. The `.tab-panel` cap is canonical (PR #18).

### 9.8 Dynamic vs static preg/lact mismatch
**Symptom:** A drug is updated in PREG_DATA but disease cards still show old classification.
**Cause:** `preg_lact_summary` is precomputed and stored on each condition (since PR #11). PREG_DATA changes don't auto-propagate.
**Avoidance:** Re-run `/tmp/precompute_preg_lact.js` after PREG_DATA edits.

### 9.9 Verbose vs compact JSON
**Symptom:** File grows unexpectedly when re-saving DISEASES via `JSON.stringify(..., null, 2)`.
**Cause:** Reformatting compact JSON to multi-line indented JSON inflates file size considerably.
**Avoidance:** Match the surrounding style. For DISEASES (already multi-line indented), use `JSON.stringify(obj, null, 2)`. For DRUGS (which uses inline-compact representation in places), preserve the existing style — use targeted Edit operations rather than wholesale rewrites.

### 9.10 Pushing to main directly
**Symptom:** Push fails with HTTP 403.
**Cause:** main is protected.
**Avoidance:** Always go through PR via GitHub MCP tools.

### 9.11 Deleting key intermediate files
**Symptom:** Subsequent script run fails.
**Cause:** `/tmp/*.js` scripts are session-scoped — they don't persist across reboots or worktree changes.
**Avoidance:** If a script is reusable, save it to the repo (e.g., a `scripts/` folder). Currently there is no canonical scripts folder; consider creating one if scripts proliferate.

---

## 10. Validation workflow

Before committing any change, run these checks.

### 10.1 JS parse check (REQUIRED before every commit)

```bash
node -e "
const fs = require('fs');
const html = fs.readFileSync('/home/user/rxguide/index.html', 'utf8');
const m = html.match(/<script[^>]*>([\s\S]*?)<\/script>/);
fs.writeFileSync('/tmp/script.js', m[1]);
" && node --check /tmp/script.js
```

If this errors, fix before committing. The most common error after edits is missing comma between object/array entries.

### 10.2 Spot-check rendering (recommended for UX changes)

Manually open the live URL after merge to verify visual correctness on:
- Home grid (category order, condition counts)
- A spot-check disease panel (preg/lact section, treatment agents linked)
- A spot-check drug panel (interactions render, class badge clickable)
- A spot-check vaccine panel (via search)
- The Reference tab (all 9 categories present, all tables in expected category)
- The Jurisprudence tab (cards open detail page, not accordion)
- Width consistency across tabs

### 10.3 Cross-reference check (recommended when adding drugs/diseases)

Quick audits after additions:
- New drug? Verify PREG_DATA + NAPRA_ODB_DATA + FAMILY_MAP all have entry.
- New disease condition? Verify each `treatment[i].agents[]` resolves to a DRUGS or VACCINES key.
- New reference table? Verify `buildReference()` includes its ID.

### 10.4 Pre-existing audit scripts (in `/tmp/`, may not persist)

Useful patterns saved during this session:
- `/tmp/full_audit.js` — comprehensive metric audit.
- `/tmp/precompute_preg_lact.js` — regenerate per-disease preg/lact buckets.
- `/tmp/audit_*.js` — various specific-feature audits (alias linking, severity distribution, etc.).

Consider promoting these to a `scripts/` folder if they need to persist.

---

## 11. Branch / deploy workflow

### 11.1 Standard cycle

```
1. git checkout -b claude/<purpose>-<random>
2. Make edits
3. node --check (parse validation)
4. git add index.html [+ any new files]
5. git commit -m "Concise descriptive message"
6. git push -u origin claude/<purpose>-<random>
7. mcp__github__create_pull_request (target: main)
8. mcp__github__merge_pull_request (method: merge)
9. Verify live within 60s
```

### 11.2 Commit message conventions

Past convention (works well — keep it):
- One-line summary (~70 chars max)
- Blank line
- Multi-line body with sections (CHANGES, RESULTS, REFERENCES, etc.) using ALL CAPS section labels
- HEREDOC for multi-line commits

```bash
git commit -m "$(cat <<'EOF'
Concise summary of change

CHANGES:
- bullet 1
- bullet 2

RESULTS:
- metric

REFERENCES:
- citation
EOF
)"
```

### 11.3 PR title/body conventions

- Title: imperative mood, no trailing period, <70 chars.
- Body: brief summary + key bullet points + test plan if non-trivial.

### 11.4 Don't do

- Push to main (will 403).
- Force-push (especially to main).
- Delete branches without confirmation.
- Skip parse validation.
- Open multiple PRs for the same logical change — squash into one.

---

## 12. What has been audited

This is a running record of audits performed. Update when new audits run.

**Last full audit:** 2026-05-08 (see `AUDIT.md` for PR-by-PR summary).

### Completed audits
- ✅ String-typed interactions converted to objects across 45 drugs (was breaking interaction expand UI).
- ✅ Severity reclassification across 33 drugs >50% Note → proper Major/Moderate (final: 15 still >50% Note, all biologics where Note is legitimate).
- ✅ Cyclosporine card added (was referenced by 100+ entries without its own card).
- ✅ FAMILY_MAP — orphan removal (DC-1 through DC-17 cleanup); cyclosporine added → "Calcineurin Inhibitors".
- ✅ Reference tab rendering — DRUG_CLASS_MAP init-order bug fixed.
- ✅ Alias linking — TMP-SMX, valproate, pentamidine + paren-extraction support; ALIASES map for ~70 brand names.
- ✅ Disease treatment.agents repopulation — 1,527+ rows; 99.7% drug-type rows now linked.
- ✅ Cross-class warnings: anticholinergic burden (483 entries), QT stacking (476), nephrotoxin (256), opioid+sedative (234), opioid×opioid (72) — all bidirectional.
- ✅ Travel medicine — 4 high-yield additions (returning fever, schistosomiasis, JE disease, strongyloides).
- ✅ Vaccine integration — renderDrugLink resolves both DRUGS and VACCINES; 5 missing vaccines added (PCV13, Vaxneuvance, mResvia, MenQuadfi, Rotarix).
- ✅ Per-disease preg/lact summary — 448/450 conditions covered; static (precomputed).
- ✅ Reference tab consolidation — 12 → 9 categories.
- ✅ Disease category order — explicit DISEASE_CATEGORY_ORDER array.
- ✅ Jurisprudence layout — accordion → detail-page.
- ✅ Tab width standardization — 1520px max across all tabs.
- ✅ Medication safety pillar — LASA, high-alert, dispensing errors.

---

## 13. What can still be audited

Priority audits for future agents to consider:

### High priority
- **Interaction completeness** for newly-added drug classes — every new TKI, biologic, JAKi should have its CYP3A4 inhibitor/inducer pairs, QT pairs, immunosuppression-overlap pairs.
- **Disease cards added by external branches** — verify schema compliance (treatment row format, agent keys, sources field, preg/lact summary precomputed).
- **Reference tables added by external branches** — verify dispatch in `buildReference()`.
- **NAPRA scheduling currency** — Health Canada periodically reschedules; spot-check high-volume drugs against current Drug Schedule Regulations.
- **ODB Limited Use criteria** — Ministry of Health updates LU criteria; recently-published changes (e.g., GLP-1 agonists, SGLT-2i in HF) should be reflected.

### Medium priority
- **PREG_DATA currency** — Hale's Medications & Mothers' Milk and LactMed update periodically; risk-bucket reclassifications occasionally needed.
- **Empiric Antimicrobial Therapy (AMT) currency** — Bugs & Drugs annual update + Ontario antibiogram trends.
- **Drug shortage / formulary alternatives** — quarterly check against Health Canada drug shortages database (manual; no automation).
- **Source citation currency** — periodic sweep for cited guidelines that have been updated (e.g., "STOPP-START v2 2014" → "v3 2023"; "Beers 2019" → "Beers 2023").

### Low priority
- **DRUG_FAMILIES completeness** — orphaned class entries (defined but no member drugs in FAMILY_MAP); families with only 1 member that could be merged into broader umbrella class.
- **Disease pearls** — older disease cards (DC-1 to DC-7 era) may have shorter pearls lists than recently-added cards.
- **Cross-reference completeness** in REFERENCE_TABLES — `related_drugs` arrays could be expanded to fully cover the linked content.

### Ongoing automated checks (scripts to run periodically)
- Orphaned reference tables (in `REFERENCE_TABLES` but not in `buildReference()` dispatch).
- Disease conditions without `preg_lact_summary` (after data adds).
- Disease conditions where `treatment.agents` contains keys not in DRUGS or VACCINES.
- DRUGS keys without corresponding PREG_DATA, NAPRA_ODB_DATA, or FAMILY_MAP entries.
- Interaction severity values outside the canonical 6.

---

## 14. Features currently available

### Tabs (9)
1. **Diseases** — 450 conditions across 20 categories with full management cards.
2. **Drug Interactions** — searchable, filterable interaction database (~8,177 entries).
3. **Reference** — 9 categories of reference tables (61 tables) + 17 deprescribing protocols.
4. **Jurisprudence** — 15 Ontario pharmacy jurisprudence topics (detail-page layout).
5. **Minor Ailments** — 19 conditions with assessment/treatment/decision wizards.
6. **Antimicrobials (AMT)** — 67 syndromes (Bugs & Drugs–style empiric therapy).
7. **Pregnancy & Lactation** — 1,088 drugs with risk classifications and detail.
8. **Formulary** — NAPRA scheduling + ODB coverage for 1,089 drugs.
9. **Vaccinations** — 56 vaccine monographs (pharmacist-administer scope filters).

### Cross-cutting features
- **Universal search bar** — searches diseases, drugs, vaccines, drug families with type-disambiguating badges.
- **Drug card panel** (`showDrugPanel`) — opens for any DRUGS or VACCINES key from anywhere in the app.
- **Family card panel** (`showFamilyPanel`) — opens drug class detail.
- **Per-disease pregnancy/lactation summary** — auto-rendered on every disease card.
- **Cross-class interaction warnings** — anticholinergic, QT, nephrotoxin, opioid+sedative, opioid×opioid.
- **Decision wizards** — interactive flowcharts in select Minor Ailments.
- **Tall-man lettering** referenced in LASA and dispensing-errors tables.
- **Sidebar disease nav** — collapsible with toggle button.

---

## 15. Gaps still to fill

Non-exhaustive list of opportunities documented during prior planning sessions. Pick high-impact + low-liability items.

### High value, low liability
- **Hormonal contraception** — pharmacist-prescribed scope expanding (BC, AB, SK; ON in progress). Currently a single condition in `womens_health/contraception`. Could deepen with: contraceptive method comparison (efficacy, contraindications, drug interactions, MEC categories), missed-dose decision trees by formulation, switching protocols, drug-interaction-driven selection (enzyme inducers + LARC alternatives).
- **HFrEF GDMT titration ladder** — quadruple therapy (ARNI/ACEi/ARB + β-blocker + MRA + SGLT2i). Existing `acute_heart_failure` and `hfref` cards list agents but lack stepwise titration sequence + dose-doubling cadence + STRONG-HF-derived monitoring schedule.
- **HIV PrEP / PEP** — pharmacist scope expanding in some provinces; no dedicated card.
- **DOAC switching matrix** — practical reference for switching between warfarin / heparin / DOACs.
- **Therapeutic interchange / NTI drug substitution rules** — narrow-therapeutic-index drug substitution (warfarin, levothyroxine, anticonvulsants, immunosuppressants).
- **Diabetes Canada 2024 algorithm** — A1C-based stepwise algorithm (diabetes content exists but algorithm reference would help).

### Medium value
- **Pediatric weight-banded suspension/dosing recipes** — extemporaneous compounding formulas + USP 795 BUD.
- **Drug-laboratory interactions** — biotin (TSH, troponin), heparin (aPTT), warfarin (PT/INR), etc.
- **Pharmacovigilance pathway** — Canada Vigilance, MedEffect, AEFI reporting workflow.
- **Pediatric vaccine schedule chart** — Ontario routine + catch-up tables.
- **Pre-op assessment / perioperative medication management** — common consult.
- **MOH Special Authorization / Limited Use criteria** for top biologics/specialty drugs (Ontario) — high practical value but updates frequently.

### Travel medicine remaining gaps
- Leishmaniasis disease entry.
- Tick-borne encephalitis (TBE) disease entry (vaccine card exists).
- Filariasis (lymphatic, Loa loa, onchocerciasis).

### Possibly redundant — verify before adding
Always check for existing coverage before adding:
- Smoking cessation (already exists as Minor Ailment #19, comprehensively).
- Anaphylaxis (in `practice/anaphylaxis`).
- Naloxone dispensing (in `practice/naloxone_dispensing`).
- Penicillin de-labelling (in `practice/penicillin_allergy_delabeling`).
- Polypharmacy/deprescribing (in `practice/polypharmacy_deprescribing` + Beers + STOPP-START).

---

## 16. Quick reference cheat sheet

### File
- **`/home/user/rxguide/index.html`** — the entire app. ~22 MB, ~245K lines.

### Key locations (line numbers approximate; use grep to relocate)
- Main CSS: lines 1–410
- Tab containers: ~line 449
- `<script>` start: ~line 600
- `var DISEASES`: ~line 632
- `var DRUGS`: ~line 39,878
- `var VACCINES`: ~line 207,000+ (search `^var VACCINES`)
- `var REFERENCE_TABLES`: ~line 240,000+ (search `^var REFERENCE_TABLES`)
- `var DEPRESCRIBING_PROTOCOLS`: search `^var DEPRESCRIBING_PROTOCOLS`
- `var MINOR_AILMENTS`: search `^var MINOR_AILMENTS`
- `function renderDrugLink`: search `function renderDrugLink`
- `function showDrugPanel`: search `function showDrugPanel`
- `function buildReference`: search `function buildReference`
- `function buildJuri`: search `function buildJuri`
- `function buildHomeGrid`: search `function buildHomeGrid`
- `function buildPregLactSection`: search `function buildPregLactSection`
- `var DISEASE_CATEGORY_ORDER`: search `var DISEASE_CATEGORY_ORDER`

### Useful one-liners

**Extract any var X = {} or var X = [] into a JSON file for inspection:**
```bash
node -e "
const fs = require('fs');
const html = fs.readFileSync('/home/user/rxguide/index.html', 'utf8');
function extract(name, openCh) {
  const sig = 'var ' + name + ' = ';
  const start = html.lastIndexOf(sig);
  let i = start + sig.length;
  while (html[i] !== openCh) i++;
  let depth = 0, inStr = false, strCh = '', esc = false, started = false;
  for (; i < html.length; i++) {
    const c = html[i];
    if (esc) { esc = false; continue; }
    if (c === '\\\\') { esc = true; continue; }
    if (inStr) { if (c === strCh) { inStr = false; strCh = ''; } continue; }
    if (c === '\"' || c === \"'\") { inStr = true; strCh = c; continue; }
    if (c === openCh) { depth++; started = true; }
    else if ((openCh === '{' && c === '}') || (openCh === '[' && c === ']')) { depth--; if (started && depth === 0) { i++; break; } }
  }
  return eval('(' + html.substring(start + sig.length, i) + ')');
}
const X = extract('DRUGS', '{');
console.log(Object.keys(X).length);
"
```

**Validate JS parse:**
```bash
node -e "const fs=require('fs');const m=fs.readFileSync('/home/user/rxguide/index.html','utf8').match(/<script[^>]*>([\\s\\S]*?)<\\/script>/);require('fs').writeFileSync('/tmp/s.js',m[1]);" && node --check /tmp/s.js
```

**Find a drug card by name:**
```bash
grep -n '"acetaminophen": {' /home/user/rxguide/index.html
```

**Count interactions by severity:**
```bash
node -e "
/* extract DRUGS as above, then: */
const sevs = {}, total = {n:0};
for (const d of Object.values(DRUGS)) for (const i of d.interactions||[]) if (typeof i==='object') { sevs[i.severity]=(sevs[i.severity]||0)+1; total.n++; }
console.log(total.n, sevs);
"
```

### When in doubt
- Read this document.
- Read `AUDIT.md` for what's already been done.
- Check the existing schema by grepping a similar entry.
- Validate parse before commit.
- Use a PR; never push to main.
- Cite Canadian sources first.
- Preserve existing format style — don't reformat unless specifically requested.

---

**End of guide.** Last updated 2026-05-08. If you make architectural changes, update this document in the same PR.
