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
            family: "ACE Inhibitors / ARBs",                    // see §6.3 + §21.13 — multi-family rows use " / " separator;
                                                                // renderer splits + shows each as a clickable chip per PR #119
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

### 5.4.1 Reference-table cell auto-linking (`fullLinkify` → `linkifyClasses` → `linkifyCell`)

Every reference-table cell (overview paragraph + each warning + every row cell) runs through `fullLinkify(text, related_drugs)`, which:

1. **`linkifyClasses`** — wraps known drug-class names (e.g. `"SSRIs"`, `"ACE inhibitors"`, `"DOACs"`) with a clickable span to the matching `DRUG_FAMILIES` card. Hard-coded `DRUG_CLASS_MAP` regex table. Acronyms are expanded ("SSRIs" → "Selective Serotonin Reuptake Inhibitors (SSRIs)") when the cell text used the bare acronym form. Matches are replaced with `\x01CLS{i}\x01` placeholder tokens to prevent re-matching.

2. **`linkifyCell`** — for each `k` in the table's `related_drugs`, walks candidates derived from `DRUGS[k].name`:
   - Full name (e.g. `"Sacubitril / Valsartan"`)
   - Name with parentheticals stripped
   - Parenthetical inner content split on `,;/`
   - Slash-separated parts of the no-paren name
   - First word (≥ 4 chars)
   - Explicit `ALIASES[k]` entries (e.g. `apixaban → ['Eliquis']`, `acetaminophen → ['Paracetamol','Tylenol','APAP']`)

   Candidates are sorted longest-first; first match wins per drug. Regex is whitespace-flexible around any `/` in the candidate (`\s*\/\s*`) so the combo candidate `"Sacubitril / Valsartan"` matches the unspaced cell form `"Sacubitril/valsartan"`. Matches are replaced with `\x01DRG{i}\x01` placeholder tokens to prevent a later iteration (e.g. the standalone `valsartan` key after the combo `sacubitril_valsartan` key matched) from nesting a second `<span>` inside the wrapped HTML or its title attribute.

   Both token sets are restored to full HTML at the end of `fullLinkify`.

**Authoring rule — combination drugs in reference-table cells.** When a cell mentions a combination drug, include BOTH the combo key AND the component keys in `related_drugs` if the cell may also reference the components separately. The longest-name-first sort + slash-flex regex guarantees the combo wins for `"X/Y"` or `"X / Y"` substrings, and the standalone component still links elsewhere in the cell. Authoring conventions:
- `DRUGS[combo].name` should use the spaced `"X / Y"` form (existing convention — 80+ combos follow this; e.g. `"Sacubitril / Valsartan"`, `"Levodopa / Carbidopa"`). The renderer matches both spacings, but the canonical name should be spaced for consistency.
- Cell text may use either `"X/Y"` (compact, Health Canada PM style) or `"X / Y"` (presentation style) — both render correctly to the combo card.
- Do NOT omit the combo key from `related_drugs` just because the components are listed — without it, the cell text matches each component separately and clicking the slash-substring opens the wrong card. (This was the bug fixed in PR #70 — see §21.8.)

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
1. **`DRUGS[key] = {...}`** with full schema (§4.1). The `source` field must include explicit Canadian-source recognition (see §21.10 for the rule and accepted tokens). The `interactions` array must NEVER be empty `[]` — at minimum a `severity: "Note"` entry (see §21.11).
2. **`PREG_DATA[key] = {...}`** — pregnancy + lactation summary (§4.7). Without this, the per-disease preg/lact section will mark this drug as "Limited Data".
3. **`NAPRA_ODB_DATA[key] = {...}`** — NAPRA scheduling + ODB coverage. Drives the badges on the drug card.
4. **`FAMILY_MAP[key] = "FamilyName"`** — **MANDATORY for every drug; no exceptions** (§21.9). Three valid paths:
   - Map to an existing `DRUG_FAMILIES` entry (preferred — grep `FAMILY_MAP` for related-class drugs first).
   - Map to a NEW multi-member family when ≥2 drugs share the mechanism but no family exists yet.
   - Map to a NEW singleton family when the mechanism is genuinely unique (singletons are explicitly OK).
   - DO NOT skip this step. Missing FAMILY_MAP entries are the #1 recurring audit-failure mode (82 gaps across 3 cycles — see §21.9).
5. **`DRUG_FAMILIES["FamilyName"] = {...}`** if step 4 created a new family — provide the full family schema (§4.9): `moa_summary`, `class_effects`, `class_contraindications`, `members[]`, `comparison`, `pearls`, `canadian_notes`, `source`.
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
3. **Each `treatment[i].family` field must list ALL distinct families across the row's agents** (§21.13). When the agents span more than one `DRUG_FAMILIES` class, join the family names with `" / "` — the renderer (PR #119) splits this string and produces one clickable chip per family. Authoring conventions:
   - Use the **canonical family name** exactly as it appears as a key in `DRUG_FAMILIES` (e.g., `"PCSK9 Inhibitors / Cholesterol Absorption Inhibitors"`, not `"PCSK9 / Ezetimibe"`).
   - When the row mixes a parent class with its subclasses (e.g., `bisoprolol` + `metoprolol` + `carvedilol`), include the parent AND each subclass — `"Beta-Blockers / Cardioselective Beta-Blockers / Non-Selective Beta-Blockers"`. Each chip lets the user open the corresponding family card.
   - Do NOT use `"—"` placeholder; if the row is genuinely Non-Drug, set `type: "Non-Drug"` (or one of the 8 canonical non-pharm types per §17) and leave `family` either absent or set to a descriptor that does not need to resolve to a family card.
   - Single-family rows still use a single string (e.g., `"Statins"`).
   - Verification: run the §22 audit script to confirm every row's `family` covers every distinct `FAMILY_MAP[agent]` (target: 0 mismatched rows).
4. **Re-run** `/tmp/precompute_preg_lact.js` to compute `preg_lact_summary` for the new condition.
5. (Optional) Add cross-references — drug interactions back to relevant DRUGS, related reference tables, deprescribing protocols.

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
3. **`related_drugs`** — include every DRUGS/VACCINES key referenced in any cell, warning, or overview. The cell auto-linker (`linkifyCell` — see §5.4.1) walks ONLY this list; a key not present here will not become clickable.
4. **Combination drugs** — if any cell mentions a combination drug (e.g. `"Sacubitril/valsartan"`, `"Trimethoprim/sulfamethoxazole"`, `"Levodopa/carbidopa"`), include the **combo key** in `related_drugs`, not just the components. The renderer guarantees the combo wins via longest-name-first sort + slash-flex regex (§5.4.1), but only if the combo key is actually in the related-drugs list. Components MAY also be listed when they appear elsewhere standalone — both will resolve correctly.
5. Run the 7-check pre-merge audit (CLAUDE.md): row widths match column count, all `related_drugs` resolve, ≥1 Canadian source, etc.

If creating a NEW category, add to the `categories` array in `buildReference()` with key, icon, label, color, items. Try not to add new categories without strong justification — current 9 categories were consolidated from 12 in PR #17 because the user preferred broader groupings (and per the 3-tier rule in §24, reference-tab categories are CLOSED — no new ones without explicit user discussion).

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

## 17. Non-pharm "type" and "agents" standardization (added 2026-05-12)

Treatment rows under every disease condition follow this canonical schema. A row that prescribes a medication uses `type: "Drug"` and populates `agents` with DRUGS / VACCINES keys. A row whose intervention is **non-pharmacologic** (lifestyle counselling, surgery, monitoring, etc.) MUST use one of the 8 standardized categories below in the `type` field and populate `agents` with specific sub-action keys defined in `NON_PHARM_AGENTS`.

### 17.1 The 8 canonical `type` values for non-pharm rows

Defined in `NON_PHARM_CATEGORIES` (search for it in index.html near `renderDrugLink`):

| Type | Display label | Color |
|---|---|---|
| `lifestyle` | Lifestyle | `#16a34a` |
| `physical_therapy` | Physical Therapy | `#0891b2` |
| `psychotherapy` | Psychotherapy | `#7c3aed` |
| `surgery_procedure` | Surgery/Procedure | `#dc2626` |
| `monitoring` | Monitoring | `#0284c7` |
| `medical_device` | Medical Device | `#475569` |
| `patient_education` | Patient Education | `#d97706` |
| `supportive_care` | Supportive Care | `#0d9488` |

Plus `"Drug"` for medication rows = **9 canonical type values total**. Any other value (`Non-Drug`, `Strategy`, `Procedure`, `Action`, `refer`, `treat`, `caution`, `—`, etc.) is **legacy** and was migrated by PR #34/#36. Do not introduce new ones.

### 17.2 NON_PHARM_AGENTS dictionary (81 entries)

Defined as a `var NON_PHARM_AGENTS` map. Each key has `{label, category}` so the renderer can compute a colored pill. Examples:

- lifestyle → `diet`, `exercise`, `weight_loss`, `smoking_cessation_lifestyle`, `alcohol_reduction`, `stress_management`, `sleep_hygiene`, `fluid_intake`, `posture_ergonomics`, `sun_protection`, `trigger_avoidance`, `sexual_health_counselling`, `caffeine_reduction`
- physical_therapy → `physiotherapy`, `occupational_therapy`, `vestibular_rehab`, `pelvic_floor_pt`, `pulmonary_rehab`, `cardiac_rehab`, `stretching_program`, `manual_therapy`, `gait_training`
- psychotherapy → `cbt`, `dbt`, `ipt`, `exposure_therapy`, `mbct`, `motivational_interviewing`, `psychodynamic_therapy`, `family_therapy`, `group_therapy`, `supportive_psychotherapy`
- surgery_procedure → `elective_surgery`, `urgent_surgery`, `endoscopic_procedure`, `joint_injection`, `incision_drainage`, `paracentesis`, `thoracentesis`, `cardioversion`, `manual_reduction`, `ablation`, `radiation_therapy`, `dialysis`, `blood_transfusion`, `biopsy`, `ect_procedure`, `catheterization`, `lithotripsy`, `surgical_referral`
- monitoring → `watchful_waiting`, `routine_labs`, `imaging_surveillance`, `bp_monitoring`, `inr_monitoring`, `glucose_monitoring`, `symptom_diary`, `vital_signs_monitoring`, `echocardiography_surveillance`
- medical_device → `cpap_apap`, `pacemaker_device`, `icd_device`, `compression_stockings`, `splint_brace`, `prosthesis`, `mobility_aid`, `cgm_device`, `insulin_pump`, `feeding_tube`, `urinary_catheter`, `hearing_aid`, `intrauterine_device`
- patient_education → `counselling`, `written_action_plan`, `medic_alert`, `sick_day_rules`, `medication_review`, `self_monitoring_education`, `advance_care_planning`
- supportive_care → `rest`, `hydration`, `ice_application`, `heat_application`, `elevation`, `wound_care`, `dressings`, `humidification`, `airway_clearance`, `nutritional_support`, `oxygen_therapy`, `positioning`

When you need a sub-agent that isn't in this list, **add it to NON_PHARM_AGENTS first** (with the right category) and only then reference it in a row. The renderer will silently fall through to plain text for unknown keys.

### 17.3 Rendering rules for non-pharm agents

- `renderDrugLink(agentStr)` checks `NON_PHARM_AGENTS` BEFORE the DRUGS/VACCINES lookup.
- Match → returns `renderNonPharmPill(key)` (colored `.nonpharm-pill` styled with the category's color, no click-through).
- These are deliberately **non-clickable** — they exist to provide structured semantic typing, not interactive monographs.
- Drug agents and non-pharm agents render side-by-side in the same agents list (combination rows like joint injection + corticosteroid work cleanly).

### 17.4 Mixed rows (drug + non-pharm)

A row CAN have both real drug keys and non-pharm action keys in the same `agents` array. The classifier decides the row's `type` by majority vote:

- More drug-key agents → keep `type: "Drug"`.
- More non-pharm agents → reclassify to the dominant non-pharm category.
- Empty `agents` on a `type: "Drug"` row is a bug — either the row should be a non-pharm type, or the drug keys never got populated. Fix by inspection.

### 17.5 Reclassification policy when editing existing rows

When you modify a treatment row's `notes`, also re-evaluate its `type`:
- Notes describe a surgical procedure → `surgery_procedure`.
- Notes describe a lifestyle intervention only → `lifestyle`.
- Notes describe what to monitor (no medication change) → `monitoring`.
- Notes describe counselling content → `patient_education`.
- Notes describe drugs being prescribed → `Drug`.
- Notes that AVOID, DEPRESCRIBE, or DO NOT USE certain drugs → DON'T put those drugs in `agents`. Strip them and set `type` based on what the row IS instructing (often `monitoring` or `patient_education`).

---

## 18. Schema fields completeness checklist (added 2026-05-12)

When adding any drug card to DRUGS, the entry must populate **all 16 canonical fields**. Recent batches missed `monitoring`. Audit script: `/tmp/audit_*_drugs.js` (the pattern is reusable).

### 18.1 DRUGS schema (16 required fields)

```
{
  "name":              String,         // canonical generic
  "brand":             String,         // Canadian brand names (semicolon-separated)
  "class":             String,         // pharmacologic class
  "napra":             String,         // NAPRA Schedule (I/II/III/U) — also describes Rx/OTC pathway
  "moa":               String,         // mechanism of action prose
  "indications":       Array<String>,  // Health Canada–approved + commonly used off-label
  "dosing":            Object|Array,   // {indication: dose} map OR array of {indication, dose, notes}
  "side_effects":      Object,         // {common: [...], serious: [...]}
  "contraindications": Array<String>,
  "interactions":      Array<{drug, severity, mechanism, management}>,
  "pregnancy":         String,         // prose summary (PREG_DATA has the full structured entry)
  "pk":                Object,         // pharmacokinetics: {absorption, half_life, metabolism, renal_adjustment, hepatic_adjustment}
  "canadian_notes":    String,         // Canadian-specific context — brand availability, ODB coverage, provincial rules
  "pearls":            Array<String>,  // teaching points (5–10 typical)
  "monitoring":        Array<String>,  // what to monitor and when (4–7 items typical)  ← OFTEN MISSED
  "source":            String          // citation hierarchy — MUST include at least one Canadian source
}
```

**`monitoring` is the most-commonly-omitted field.** Audit it explicitly. Reason: in batch-generation prompts, "side_effects" and "monitoring" sound redundant; agents drop monitoring. They are **NOT redundant** — side_effects = what can happen; monitoring = what the pharmacist tracks (labs, vitals, symptoms, frequency, intervention thresholds).

### 18.2 Cross-app companion entries — REQUIRED for every drug

For every key in DRUGS, the following must also exist:

1. **NAPRA_ODB_DATA[key]** — `{name, napra, napraDetail, odbStatus, odbDetail, luCode, notes, cdsa}`
2. **PREG_DATA[key]** — `{name, pregRisk, pregColor, bfRisk, bfColor, pregDetail, bfDetail, alternatives, source}`
3. **FAMILY_MAP[key]** — `"<DrugFamily name>"` string (must match a key in DRUG_FAMILIES)

If you add a drug card without any one of these, the corresponding tab/section breaks silently.

### 18.3 Key-name discipline

- Use canonical generic name in lowercase snake_case (e.g., `ulipristal_acetate`, NOT `ulipristal`, NOT `ulipristalAcetate`).
- Multi-component products: join with `_` (e.g., `ethinyl_estradiol_norethindrone`, `velpatasvir_sofosbuvir`).
- Formulation variants: append the route/form (e.g., `tacrolimus_topical`, `timolol_oral`, `brimonidine_op`, `ofatumumab_ms`).
- **Orphan PREG_DATA keys** (entry exists under a key that has no matching DRUGS entry) are a real bug — they never render. Fix: rename the PREG key to match the DRUGS key, or delete the orphan. Audit found one such orphan (`ulipristal` PREG entry vs `ulipristal_acetate` DRUGS entry) cleaned up in PR #48.

### 18.4 DRUG_FAMILIES schema (for new family cards)

Family card schema is looser than drug schema but every family should have:
```
{
  "name":            String,
  "abbrev":          String,         // 1-line headline
  "class_color":     "#hexcode",
  "moa_summary":     String,
  "class_effects":   Array<String>,
  "class_contraindications": Array<String>,
  "members":         Array<{drug, notes}>,   // each {drug} key must exist in DRUGS
  "comparison":      String,         // prose — how members differ (or, for singleton, how they compare to alternatives)
  "pearls":          Array<String>,
  "canadian_notes":  String,
  "source":          String          // Canadian-priority
}
```

**`comparison` and `pearls` are easy to skip on singleton families** (one-member family cards added when a new drug class enters the formulary). Audit explicitly when adding a new family.

---

## 19. DEPRESCRIBING_PROTOCOLS schema (added 2026-05-12)

Every deprescribing protocol object MUST have:

```
{
  "id":               String,         // snake_case
  "title":            String,
  "icon":             String,         // emoji
  "color":            "#hexcode",
  "overview":         String,         // prose
  "indications_to_continue":         Array<String>,
  "consider_deprescribing":          Array<String>,   // OR consider_deprescribing_or_modifying
  "taper_steps":      Array<{step:Number, action:String, detail:String}>,   ← MUST be objects, NOT strings
  "monitoring":       Array<String>,
  "rebound_management": Array<String>,
  "counselling":      Array<String>,
  "sources":          String          // Canadian-priority
}
```

**`taper_steps` MUST be an array of objects `{step, action, detail}`, NOT strings.** The renderer reads `s.step / s.action / s.detail` and prints `undefined undefined undefined` when given a string. PR #38 fixed 5 protocols (antidepressant, gabapentinoid, corticosteroid, anticonvulsant, ADHD-stimulant) that had string-form steps.

When adding a new protocol:
1. Author each step as `{ step: <N>, action: "ALL-CAPS HEADLINE", detail: "Full prose with doses, timing, monitoring, half-life caveats, Canadian-specific notes." }`.
2. Verify the renderer at `function buildDeprescribing` reads `s.step`, `s.action`, `s.detail`.

---

## 20. Recently audited (since 2026-05-08 — append to §12)

This appends to the audit history in section 12. As of 2026-05-12, the cumulative cycles include:

### 2026-05-12 audit cycle (PR #28 → PR #48)

**Disease cards repopulated (treatment.agents + family field):**
- ✅ 17 new disease cards (Round 1 — orthostatic_hypotension, halitosis, subconjunctival_hemorrhage, pterygium_pinguecula, acute_bacterial_prostatitis, acute_gastritis, stasis_dermatitis, pressure_injury, pruritus_ani, cheilitis, calluses_corns, ingrown_toenail, measles, varicella, mumps, roseola, erythema_infectiosum) — PR #28
- ✅ 16 new disease cards (Round 2 — vasovagal_syncope, postpartum_psychosis, seasonal_affective_disorder, stimulant_use_disorder, catatonia, lumbar_spinal_stenosis, testicular_torsion, phimosis_paraphimosis, peyronies_disease, floaters_pvd, retinal_detachment, nasal_polyposis, sialolithiasis, trichomoniasis, abnormal_uterine_bleeding, neonatal_jaundice) — PR #31
- ✅ Reclassified treatment-row types to canonical `Drug` where drugs are prescribed (25 rows in PR #30, 48 rows in PR #31, 60+ rows in PR #34, 42+13 rows in PR #36)
- ✅ App-wide non-pharm sweep — 766 non-Drug rows reclassified into the 8 canonical categories with specific sub-agents — PR #34, #36
- ✅ Coverage verification — 2 legitimate remaining `supportive_care` residuals; everything else mapped — PR #36

**Drug-family content audits:**
- ✅ ACE Inhibitors / ARBs / Beta-Blockers / CCBs (all variants): Hypertension Canada 2020 → 2025 — PR #24
- ✅ CCS HF 2021 → CCS HF 2025 Comprehensive Update where used as primary
- ✅ DOACs: CCS AF 2020 → CCS AF 2020 + 2024 Focused Update
- ✅ SSRIs: CANMAT MDD 2016 → CANMAT MDD 2016 with 2024 Update
- ✅ Glucagon & Hyperglycemic Agents family — added `comparison` + 7 pearls — PR #41
- ✅ Vitamin A (Retinol) family — added `comparison` + 8 pearls — PR #41

**Drug schema completeness audits (DC-9 series 100 drugs):**
- ✅ DC-9 Batches 13–20 (40 drugs) — added missing `monitoring` field to all 40 — PR #44
- ✅ DC-9 Batches 1–12 (60 drugs) — added missing `monitoring` field to 59; updated mexiletine source with Canadian citations; deleted orphan `ulipristal` PREG_DATA entry — PR #48
- ✅ 50-drug audit (PR #32/33/37/39/40) — cidofovir × probenecid severity `"Required pretreatment"` → `Beneficial` (canonical); mechanism correction (probenecid inhibits OAT1 UPTAKE, not secretion) — PR #41
- ✅ 49-drug audit (Batches 6–10 = PR #42/43/45/46/47) — resmetirom source updated with Health Canada + CASL + CADTH — PR #50

**Treatment-row mismatch sweep (full app):**
- ✅ 11 documented errors from AUDIT-CONTENT.md cleaned up (mdd, asthma, migraine, osteoarthritis, hfref, gerd_pud, copd, ckd, etc.) — PR #24
- ✅ App-wide scan of 2,694 treatment rows; 3 additional class-mismatch fixes (psychiatry/ocd, respirology/pertussis, infectious/community_acquired_pneumonia) — PR #24
- ✅ Stale false-positive agents stripped:
  - `minoxidil_topical` from wound-care rows (alias map mis-fired on "Foam, Solution" in brand string) — PR #34
  - `trazodone_sleep` from non-trazodone rows (over-eager match on word "sleep") — PR #34
  - `atropine_pralidoxime` everywhere (only valid in nerve-agent poisoning) — PR #34
  - `aspirin` from pediatric infection Reye-syndrome rows — PR #28
  - `levothyroxine` / `ranitidine` from acute_gastritis context-warning rows — PR #28

**Deprescribing protocol schema fix:**
- ✅ 5 protocols with string-form `taper_steps` rewritten as canonical `{step, action, detail}` objects (44 steps total): antidepressant_taper, corticosteroid_taper, anticonvulsant_taper, gabapentinoid_taper, stimulant_adhd_taper — PR #38

**Bidirectional interaction reciprocals:**
- ✅ warfarin × vitamin_a high-dose; disulfiram × chlordiazepoxide — PR #22

---

## 21. Pitfalls discovered in 2026-05-12 audit cycle (extends §9)

### 21.1 Treatment-row schema drift (new cards lack `family` field)

**Symptom:** Class-color pills don't render on treatment rows of newly-added disease cards even though drugs are listed.
**Cause:** Existing cards use `{line, type, family, agents, notes, guideline}`. New cards omit `family`, breaking class-color rendering.
**Fix:** When adding any treatment row, populate `family` from `FAMILY_MAP[firstAgent]` or use a descriptive label that spans the agents in a combination row (e.g., "H. pylori Eradication", "Vasodilators, α-blockers, diuretics").
**Auto-fix script pattern:** see `/tmp/repopulate_new_cards.js` (clean: aliases + blocklist + extract from notes + infer family from FAMILY_MAP[firstAgent]).

### 21.2 Missing `monitoring` on new drug cards

**Symptom:** Drug card opens but the "Monitoring" section is empty / absent.
**Cause:** Batch-generation prompts often drop the `monitoring` field, assuming it's redundant with `side_effects`.
**Fix:** Always populate `monitoring` (4–7 items) with: what to check, how often, threshold for intervention, Canadian-specific frequency rules if relevant.
**Audit pattern:** `/tmp/audit_*_drugs.js` scripts iterate KEYS list + verify `monitoring` array length.

### 21.3 Non-canonical interaction severity values

**Symptom:** Interaction badge renders as plain text (no color).
**Cause:** Severity outside the 6 canonical values (e.g., `"Required pretreatment"`, `"AVOID"`, `"Use with caution"`).
**Fix:** Map to one of: `Beneficial`, `Contraindicated`, `Major`, `Moderate`, `Minor`, `Note`.
**Recent recurrence:** cidofovir × probenecid `"Required pretreatment"` → `Beneficial` (PR #41); see §8.6 for canonical-value semantics.

### 21.4 Bright-light-therapy / dawn-simulation typed as Drug

**Symptom:** Seasonal-affective-disorder BLT row has `type: "Drug"` but no agents.
**Cause:** Device/therapy mis-classified as drug.
**Fix:** Use `type: "medical_device"` (BLT, dawn simulation, light box) or `type: "patient_education"` (light-exposure counselling without device).

### 21.5 Orphan PREG_DATA / NAPRA_ODB_DATA entries

**Symptom:** Search returns a vaccine/drug "via PREG" that doesn't exist in DRUGS.
**Cause:** PREG_DATA entry under a key that doesn't match the canonical DRUGS key (e.g., `ulipristal` PREG vs `ulipristal_acetate` DRUGS).
**Fix:** Reconcile keys — DRUGS is the source of truth. Rename PREG_DATA / NAPRA_ODB_DATA keys to match, or delete orphans.
**Detect:** `for (const k of Object.keys(PREG_DATA)) if (!DRUGS[k] && !VACCINES[k]) console.log('orphan PREG:', k)`.

### 21.6 Deprescribing taper_steps written as strings

**Symptom:** Reference → Deprescribing → Antidepressant (or any of the 5 affected protocols) shows `undefined undefined undefined` rows in the Taper Protocol section.
**Cause:** `taper_steps` written as `[ "step 1 description", "step 2 description", ... ]` instead of `[ { step:1, action:"X", detail:"Y" }, ... ]`.
**Fix:** Always use object schema. Renderer reads `s.step / s.action / s.detail`.

### 21.7 Mis-classified rows: "deprescribe / avoid / context" drug mentions become agents

**Symptom:** Treatment row in `orthostatic_hypotension [deprescribe offending medications]` lists `amitriptyline, tamsulosin, hydralazine` in `agents` even though those are drugs to STOP.
**Cause:** Auto-extraction matches drug names in notes regardless of context.
**Fix:** Classifier should detect anti-Rx markers ("AVOID", "DEPRESCRIBE", "STOP", "CONTRAINDICATED", "do not use", "Reye") and either skip the row or strip those drugs from `agents`.
**Pattern script:** `/tmp/cleanup_false_positives.js` — list of `{idHint, lineHint, action: CLEAR_ALL | REMOVE | TYPE | POPULATE}` operations applied per row.

### 21.8 Combination drug renders as component card in reference-table cells (PR #70)

**Symptom:** Cell text like `"Sacubitril/valsartan 49/51 mg PO BID..."` rendered with the wrong link target — hovering showed "Open Valsartan drug card" and clicking opened the standalone `valsartan` card instead of the canonical `sacubitril_valsartan` combination card.

**Cause:** Pre-PR-#70, `linkifyCell` built its candidate regex from `DRUGS[k].name` with literal whitespace preserved. The combo's name `"Sacubitril / Valsartan"` (spaces around `/`) compiled to `\b(Sacubitril \/ Valsartan)\b`, which did NOT match the unspaced cell form `"Sacubitril/valsartan"`. The function fell through to slash-split components, wrapping `"Sacubitril"` alone with the combo link; a later iteration over the standalone `valsartan` key wrapped the trailing `"valsartan"` with the wrong card.

The same pattern affected all 85 slash-named combos in DRUGS (`sacubitril_valsartan`, `levodopa_carbidopa`, `sulfamethoxazole_trimethoprim`, `fluticasone_salmeterol`, `budesonide_formoterol`, `lopinavir_ritonavir`, `ezetimibe_simvastatin`, `sitagliptin_metformin`, `empagliflozin_metformin`, `ceftolozane_tazobactam`, `ceftazidime_avibactam`, `meropenem_vaborbactam`, `imipenem_relebactam`, etc.) wherever a cell used the compact `"X/Y"` form.

**Fix (PR #70 — at the rendering layer, not in the data):**
1. **Whitespace-flexible slash** — every literal `/` in the candidate is compiled as `\s*\/\s*`, so the spaced canonical name matches both spaced and unspaced cell forms. Combo wins via longest-name-first sort.
2. **Placeholder tokenization** — matched substrings swap to `\x01DRG{i}\x01` tokens until end-of-function, then restored. Prevents subsequent component iterations (e.g. standalone `valsartan` after combo `sacubitril_valsartan` matched) from nesting a second `<span>` inside the combo span's visible text or title attribute. Same pattern already used in `linkifyClasses`.

**Author guarantee going forward (§5.4.1 + §6.5):** Include the combo key in `related_drugs`. The renderer handles both `"X/Y"` and `"X / Y"` cell forms; the canonical `DRUGS[combo].name` should use the spaced form (existing convention across all 80+ combos). Listing components alongside the combo is fine — both resolve correctly.

**Detect (regression check):** Headless-simulate `linkifyCell` on representative cell text and assert that the combo key is the ONLY linked key for the `"X/Y"` substring, with no nested spans. See `/tmp/sim_linkify.js` (PR #70) for the pattern.

### 21.9 Missing FAMILY_MAP entries — the #1 recurring authoring error (PR #59 / #90 / #93)

**Symptom:** New drug cards are merged with full DRUGS + NAPRA_ODB_DATA + PREG_DATA entries but no FAMILY_MAP entry. The drug card opens but the "Drug Family" link is absent. Audit script flags as `Missing FAMILY_MAP: <n> <key-list>`.

**Audit cycle frequency (most common gap across post-merge audits):**
- Batches 11–15 (PR #59) → 6 FAMILY_MAP gaps + 1 orphan cleanup
- Batches 26–30 (PR #90) → 29 FAMILY_MAP gaps + 3 orphan cleanups
- Batches 31–35 (PR #93) → 47 FAMILY_MAP gaps + 4 orphan cleanups
- **Cumulative: 82 missing FAMILY_MAP entries across 3 audit cycles** — far more than any other recurring error.

**Cause:** Authoring batches focus on DRUGS schema (16 fields) + PREG + NAPRA + interactions. FAMILY_MAP is a separate top-level object, easy to forget. Compounded when the drug's mechanism is novel — author assumes "no family fits" and skips the entry entirely rather than creating a new family.

**Rule (mandatory):** Every drug added to DRUGS MUST have a FAMILY_MAP entry. Three valid paths:
1. **Map to an existing family** — preferred when an existing `DRUG_FAMILIES` entry covers the drug's mechanism. Grep `FAMILY_MAP` for related-class drugs first.
2. **Map to a new multi-member family** — preferred when 2+ drugs in DRUGS share the mechanism but no family exists yet (e.g., adding TYK2 inhibitors, BiTEs, Hedgehog inhibitors). Create the family with all members at once.
3. **Map to a new singleton family** — acceptable when the mechanism is genuinely unique (e.g., menin inhibitors, SYK inhibitors, CD123-targeted immunotoxins). Singleton families are explicitly OK per the 3-tier rule (§24). DO NOT leave the drug unmapped.

**Anti-pattern: "no family fits, so skip."** This produces orphaned drugs that never appear in family-card navigation. If no existing family fits, CREATE a singleton family with full schema (`moa_summary`, `class_effects`, `class_contraindications`, `members: [{k, drug, notes}]`, `pearls`, `canadian_notes`, `source`). One member is fine; the card will expand naturally as future drugs of the same class are added.

**Detect:** `for (const k of Object.keys(DRUGS)) if (!FAMILY_MAP[k]) console.log('orphan:', k)` — run before EVERY batch merge per CLAUDE.md 8-check audit, item 2. See `/tmp/audit_<N>_drugs.js` pattern.

### 21.10 Source citations omit Canadian context for non-HC-approved drugs (PR #59 / #90 / #93)

**Symptom:** A drug card's `source:` field cites only "FDA label", "EMA SmPC", or international guideline ("Japanese SmPC", "Asian functional dyspepsia guidelines") with no acknowledgement of Canadian regulatory status. The CLAUDE.md audit check "every new disease card cites at least one Canadian source" passes when the drug is referenced from a disease card, but the standalone drug card itself lacks Canadian context.

**Audit cycle frequency:**
- Batches 11–15 (PR #59) → 2 (viloxazine, oxacillin — both HC-approved but CADDRA / "Bugs & Drugs" not recognized by audit regex)
- Batches 26–30 (PR #90) → 2 (mosapride, racecadotril — neither HC-approved)
- Batches 31–35 (PR #93) → 3 (arimoclomol, lovotibeglogene, elivaldogene — newer rare-disease therapies, mixed HC status)

**Cause:** Two distinct sub-patterns:
1. **HC-approved but cited via international sources** — author cites the primary trial (FDA label, EMA SmPC) without the parallel Health Canada Product Monograph. Audit regex misses it.
2. **Not HC-approved** — author cites the source country's regulator (FDA, EMA, PMDA) without explicit "NOT Health Canada-approved" disclaimer and without listing Canadian alternatives.

**Rule for the `source:` field:**

| Drug regulatory status | Required source-field content |
|---|---|
| HC-approved | Cite **Health Canada Product Monograph** explicitly (named) + the primary trial + any Canadian guideline (CCS, SOGC, CADTH, RxFiles, AMMI, CADDRA, etc.). |
| NOT HC-approved | Explicit phrase **"NOT Health Canada-approved"** + access pathway (Special Access Program / not available in Canada / personal importation) + **Canadian alternatives by name** (with their family + brand). |
| HC-approved via NOC/c (Notice of Compliance with Conditions) | Note the NOC/c status, any CADTH HTA review, and provincial-rare-disease-drug-program eligibility criteria. |

**Anti-pattern:** `"source": "FDA <name> label 20XX; <pivotal trial>; <disease-foundation>."` with no Canadian content. This was the recurring pattern across all 3 audit cycles.

**Audit recognition regex** (already in audit scripts): tokens that count as Canadian-source recognition include `Health Canada`, `CPS`, `SOGC`, `CCS`, `NACI`, `CADTH`, `CFP`, `CMAJ`, `CTS`, `RxFiles`, `AMMI`, `CDA`, `CUA`, `CRISM`, `CCSA`, `ODB`, `CAG`, `CPhA`, `CMA`, `Toronto Notes`, `RNAO`, `CPSO`, `PHAC`, `CANMAT`, `Diabetes Canada`, `Hypertension Canada`, `Osteoporosis Canada`, `Thrombosis Canada`, `CADDRA`, `CHEP`, `CMRD`, `CIMDRN`, `Garrod Association`, `Sickle Cell Disease Association of Canada`, `ALD Foundation Canada`. **If your source string doesn't include at least one of these, the citation is incomplete** — even if the drug is genuinely not HC-approved, the absence-statement and Canadian-alternatives belong in the source field.

### 21.11 Empty interactions arrays on gene therapy / single-use products (PR #93)

**Symptom:** A drug has `"interactions": []` (an empty array). The 16-field schema completeness check passes (the field exists), but the drug card renders with no interactions section content. Recurring for gene therapies, single-dose biologics, and one-time-use products where the author concluded "no chronic-dosing interactions apply."

**Audit cycle frequency:** First surfaced in Batches 31–35 (PR #93 — `elivaldogene_autotemcel`, a single-dose autologous HSC gene therapy). Expected to recur as more gene/cell therapies enter the catalog.

**Cause:** For products administered once with no chronic-drug exposure post-infusion (autologous HSC gene therapy, in-vivo AAV gene therapy, single-dose enzyme replacement), traditional pharmacokinetic drug-drug interactions are not applicable. Authors leave `interactions: []`.

**Rule:** Never leave `interactions: []`. At minimum, add ONE entry with `severity: "Note"` explaining the absence:

```js
"interactions": [{
  "with": "Concurrent immunosuppressants / antiretrovirals / antineoplastics",
  "severity": "Note",
  "mechanism": "Single-dose <product type> with no chronic drug exposure post-infusion. Pre-treatment / peri-conditioning interactions follow standard <BMT / infusion-centre> pharmacology.",
  "management": "Coordinate with <BMT pharmacy / infusion centre>: <relevant peri-treatment considerations — e.g., busulfan TDM, anti-AAV antibody screening, anti-infective prophylaxis>."
}]
```

This:
- Preserves the schema's non-empty invariant.
- Documents WHY the array is "empty" of conventional pharmacokinetic interactions.
- Surfaces the peri-treatment considerations (busulfan TDM for ex-vivo gene therapy, prophylactic steroids for in-vivo AAV, etc.) that the prescribing pharmacist DOES need to know.

**Detect:** Audit script reports `Empty schema fields: <n>` with `interactions` listed. Re-run after every gene-therapy / single-use product batch.

### 21.12 "Ghost" FAMILY_MAP entries are intentional brand-name + formulation aliases (PR #112)

**Symptom:** Comprehensive sweep audit reports "Ghost FAMILY_MAP entries: 118" — keys in `FAMILY_MAP` that do not exist in `DRUGS`. Examples: `concerta`, `biphentin`, `foquest` → "CNS Stimulants — Methylphenidate"; `asa` → "Antiplatelet Agents"; `prolopa` → "Levodopa"; `coversyl` → "ACE Inhibitors".

**This is NOT a bug** — these are deliberate alias entries used by the cell auto-linker and class-resolution logic to map brand names, common abbreviations, and formulation suffixes to the appropriate family card when those tokens appear in cell text or notes. The auto-linker walks `FAMILY_MAP` keys; alias keys allow `"asa"`, `"concerta"`, `"prolopa"` mentions in any cell to resolve to the right family card despite no `DRUGS["asa"]` entry existing.

**Categories of intentional alias entries (~118 total):**
- Brand-name aliases (concerta, biphentin, foquest, contrave, suboxone, coversyl, twynsta, prolopa, champix, cravv, prometrium, caltrate, citracal, zulresso, zurzuvae, pegasys, pegintron, aklief, winlevi, tabex, …)
- Common abbreviations (asa, tmp-smx, hctz, asa 81mg)
- Formulation/route suffixes when distinct DRUGS entry not warranted (nicotine patch, nicotine gum, venlafaxine xr, bupropion xl, quetiapine xr, ferrous fumarate, ferrous gluconate, isosorbide, …)
- Indication-specific alternate keys (lamivudine_hbv, sildenafil_pah, tadalafil_pah, drospirenone_only, brimonidine_ophthalmic, cyclosporine_ophthalmic, …)

**Detect / Validate (audit-script rule):** All 118 ghosts must point to a family that DOES exist in `DRUG_FAMILIES`. Any ghost whose value targets a non-existent family IS a bug — those are broken-pointer aliases that need either fixing the value or deleting the alias. As of PR #112, 0 of 118 ghosts are broken.

**Rule for adding aliases:** When introducing an alias entry, confirm:
1. The target family name matches an existing `DRUG_FAMILIES` key exactly (no typos).
2. The alias makes sense in cell-text rendering context (the alias is a token users / authors might write inline).
3. Do NOT add alias if a canonical `DRUGS` key already exists for the same concept — extend `DRUGS[k].name` with alias text or use `ALIASES` in `linkifyCell` instead.

**Future audit script update:** Distinguish "ghost-with-valid-target" (intentional alias) vs "ghost-with-broken-target" (bug). Only the latter is a finding. Per-category breakdown (space-key / brand-name / formulation-suffix) is informational.

### 21.13 Treatment row `family` field hiding multi-class agent groups (PR #118 / #119)

**Symptom:** A treatment row had agents spanning multiple `DRUG_FAMILIES` classes (e.g., `bisoprolol` + `metoprolol` + `carvedilol` — cardioselective AND non-selective β-blockers; or PCSK9 inhibitors + ezetimibe in the same lipid row) but the row's `family` field named only one class. The UI rendered a single chip linking to that one family, hiding the multi-class makeup from clinicians.

**Audit cycle frequency:** First surfaced in PR #118 — sweep across all `DISEASES.conditions[*].treatment[*]` rows found **943 mismatched rows** (rows where agents had ≥2 distinct `FAMILY_MAP` values but `family` field listed only 1). Updated 946 rows with the correct multi-family strings; PR #119 patched the renderer to split + render each family as its own chip.

**Cause (data side):** Authoring batches typically named the row's single "headline" class but didn't enumerate the actual `FAMILY_MAP[agent]` values across all agents. The em-dash placeholder `"—"` was also used for foundational/lifestyle-mixed rows where the agents listed were drugs to AVOID rather than prescribe.

**Cause (render side, pre-PR-#119):** The renderer treated `tx.family` as a single string lookup against `DRUG_FAMILIES`. A joined string like `"PCSK9 Inhibitors / Cholesterol Absorption Inhibitors"` failed exact-match lookup and fell back to inferring family from only the **first** agent — so even when the data was fixed, the UI still showed one chip.

**Rule (mandatory at authoring time — §6.3 step 3):** When a treatment row's `agents` include drugs from ≥2 different `FAMILY_MAP` classes, the `family` field must list ALL distinct family names joined by `" / "`. Each token must be an exact `DRUG_FAMILIES` key. Examples:

```js
// Multi-family — PCSK9 inhibitors + ezetimibe in same lipid-intensification row
{ line: "Second-Line", type: "Drug",
  agents: ["evolocumab", "alirocumab", "ezetimibe"],
  family: "PCSK9 Inhibitors / Cholesterol Absorption Inhibitors" }   // ✓

// Multi-family — DOACs + warfarin in same anticoagulation row
{ line: "First-Line (Stroke Prevention)", type: "Drug",
  agents: ["apixaban", "rivaroxaban", "dabigatran", "edoxaban", "warfarin"],
  family: "Direct Oral Anticoagulants / Vitamin K Antagonists" }     // ✓

// Parent + subclass — mix of cardioselective and non-selective β-blockers
{ line: "First-Line", type: "Drug",
  agents: ["bisoprolol", "metoprolol", "carvedilol"],
  family: "Beta-Blockers / Cardioselective Beta-Blockers / Non-Selective Beta-Blockers" }  // ✓

// Single-family — keep simple string
{ line: "First-Line", type: "Drug",
  agents: ["ramipril", "perindopril"],
  family: "ACE Inhibitors" }                                          // ✓

// Anti-pattern — single family hides ezetimibe's class
{ line: "Second-Line", type: "Drug",
  agents: ["evolocumab", "alirocumab", "ezetimibe"],
  family: "PCSK9 Inhibitors" }                                        // ✗
```

**Renderer behaviour (PR #119) — what the patched code does:**
1. Splits `tx.family` on `" / "` into candidate family names.
2. Augments by walking `tx.agents` and pulling `FAMILY_MAP[k]` for any family not already in the list (catches rows where `family` is `"—"` or a non-canonical descriptor like `"Class IA antiarrhythmic"`).
3. Filters to families that exist in `DRUG_FAMILIES` (skips parent terms that don't have their own family card).
4. Renders each as its own clickable family-badge chip with its family-card color.

Author guarantee: data-side compliance with the rule yields predictable UI (chips appear in the order the families are listed in `family`). Even if a row's `family` value is incomplete, the renderer recovers via agent-walk — but authoring should not rely on the recovery path; explicit `family` listing is more discoverable and audit-friendly.

**Detect (audit-script rule):** For each `DISEASES.conditions[*].treatment[*]` row with `≥2 agents`:
1. Compute `distinctFams = unique(FAMILY_MAP[k] for k in agents)`.
2. Parse `family` field by splitting on `" / "` (or `" + "` / `","` for legacy authoring style).
3. If `distinctFams.length > 1` AND `family` does NOT contain every member of `distinctFams`, flag for fix.

See `/tmp/audit_treatment_families.js` (PR #118) for the implementation. Re-running this audit should report `0 mismatched rows` after any new condition is added.

---

## 22. Reusable audit scripts (added 2026-05-12)

These scripts live in `/tmp/` during a session and don't persist. When making batch drug additions, save your version and reference these patterns.

| Script | Purpose |
|---|---|
| `/tmp/audit_<N>_drugs.js` | Iterate a list of KEYS; check each for SCHEMA fields, NAPRA/PREG/FAMILY_MAP presence, Canadian source, canonical severities; summary report |
| `/tmp/audit_new_cards.js` | Disease-card audit (schema, treatment-row type-vs-agents, family-vs-FAMILY_MAP mismatch, preg_lact_summary content) |
| `/tmp/repopulate_new_cards.js` | Populate empty `agents` arrays from notes text + inject `family` from FAMILY_MAP — pattern for new-card sweep |
| `/tmp/recompute_preg_lact.js` | Recompute `preg_lact_summary` on each condition after agent changes |
| `/tmp/sweep_nonpharm.js` | App-wide reclassification of non-Drug rows into the 8 canonical types (keyword-based) |
| `/tmp/sweep_pass2.js`, `/tmp/sweep_pass3.js` | Follow-up passes for surgery/procedure/device terminology missed by the first sweep |
| `/tmp/add_monitoring.js` | Inject `monitoring` field on drug records that lack it (after authoring 4–7 monitoring items per drug) |
| `/tmp/fix_taper_steps.js` | Rewrite string-form taper_steps as `{step, action, detail}` objects |
| `/tmp/verify_coverage.js` | Coverage check across all DISEASES treatment rows — non-canonical types, empty Drug rows, supportive_care empties with hidden keywords |

---

## 23. Quick-reference: 8 non-pharm categories at a glance (added 2026-05-12)

When typing a non-Drug treatment row, use this as a mental sieve:

1. **lifestyle** — patient does it themselves at home (diet, exercise, weight loss, smoking cessation, alcohol reduction, sleep hygiene)
2. **physical_therapy** — performed by a regulated therapist (PT/OT, vestibular rehab, pelvic floor)
3. **psychotherapy** — psychotherapeutic intervention (CBT, DBT, IPT, exposure therapy, motivational interviewing)
4. **surgery_procedure** — operative or procedural intervention (elective/urgent surgery, endoscopy, joint injection, dialysis, transfusion, biopsy, ablation, ECT)
5. **monitoring** — surveillance without medication change (watchful waiting, scheduled labs, BP/INR/glucose/echo follow-up)
6. **medical_device** — device-based treatment (CPAP, pacemaker, ICD, compression stockings, splint, prosthesis, IUD)
7. **patient_education** — counselling / written information (action plans, MedicAlert, sick-day rules, medication review, advance care planning)
8. **supportive_care** — bedside non-drug care (rest, hydration, ice/heat, elevation, wound care, dressings, oxygen, positioning)

If none fit cleanly, **default to `supportive_care`** with no agents (or descriptive `patient_education` + `counselling` for "refer to specialist" / "reassurance" rows).

---

**End of guide.** Last updated 2026-05-12. If you make architectural changes, update this document in the same PR.

---

## 24. Container hierarchy rules — what to add freely vs what is locked (added 2026-05-12, clarified 2026-05-12)

This section governs which containers in the app you may freely add to, which are off-limits, and which require user discussion. **The rule is per-container — not a blanket "extend before create".**

### 24.1 The 3-tier rule

| Tier | What it means | Rule |
|---|---|---|
| 🛑 **LOCKED — discuss with user first** | Tabs (top-level navigation across the entire app) | DO NOT add a new tab without explicit user discussion. The 9 existing tabs cover all planned scope. |
| ❌ **CLOSED — use existing only** | Top-level categories on the Diseases home page; top-level categories on the Reference tab home | DO NOT add a new disease category (e.g., "Cardiology", "Psychiatry"). DO NOT add a new Reference category (e.g., "Toxicology", "Med Safety"). Always place new content within an EXISTING category. |
| ✅ **OPEN — add freely** (with the duplicate-scope check) | Conditions within a disease category, reference tables within a Reference category, drug families, drug cards, vaccines, deprescribing protocols, jurisprudence topics, minor ailments, empiric-therapy syndromes | Add as needed. The only constraint: don't duplicate scope of an existing entry — search first, extend if there's overlap, otherwise add a new entry. |

### 24.2 In plain English

> Adding a new disease card to the Cardiology category? **Fine.**
> Adding a new reference table to the Toxicology Reference category? **Fine.**
> Adding a new drug family for a newly-launched class? **Fine.**
>
> Adding a new top-level category called "Cardiology" or "Toxicology"? **Not allowed** — they already exist. If a category seems missing, the right fix is to find the closest existing one and extend.
>
> Adding a 10th tab to the navigation? **Pause and discuss with the user.** Tabs are architectural.

### 24.3 Container reference — counts and locking status

| Container | Current count | Status | Notes |
|---|---|---|---|
| **Tabs** | 9 | 🛑 Locked — user discussion required | Diseases, Drug Interactions, Reference, Jurisprudence, Minor Ailments, Antimicrobials, Pregnancy, Formulary, Vaccinations |
| **Disease categories** | 20 | ❌ Closed — use existing | Cardiology, Endocrine, GI, Neurology, Psychiatry, Respirology, Renal, Rheumatology, Hematology, Oncology, Dermatology, ENT, Ophthalmology, Urology, Women's Health, Pediatrics, Infectious, Pharmacy Practice, Travel, Toxicology |
| **Reference tab categories** | 9 | ❌ Closed — use existing | Categories with hardcoded ID dispatch arrays in `buildReference()` (`toxIds`, `diIds`, `medSafetyIds`, `allergyIds`, `foodIds`, `geriatricIds`, `renalIds`, `hepaticIds`, `practiceIds`) |
| **Disease conditions** | 487+ | ✅ Open | Substring-search existing condition `name` + `introduction` first to avoid duplicate scope |
| **Reference tables** | 65+ | ✅ Open | Add new ID to the appropriate category's dispatch array; search for topic overlap first |
| **Drug cards (DRUGS)** | 1,108+ | ✅ Open | Required cross-app companion entries: NAPRA_ODB_DATA + PREG_DATA + FAMILY_MAP |
| **Drug families** | 454+ | ✅ Open | Singleton families are acceptable when a class has only one member in Canada |
| **Vaccines** | 58+ | ✅ Open | Required: schedule, NACI cross-link, pharmacist administration scope per province |
| **Minor ailments** | 19 | ✅ Open (driven by provincial MOH scope) | Add when MOH formally expands scope — currently Ontario-default |
| **Empiric therapy syndromes** | 67 | ✅ Open | Match Bugs & Drugs taxonomy |
| **Deprescribing protocols** | 17 | ✅ Open | Use the canonical schema (`taper_steps` as `{step, action, detail}` objects — see §19) |
| **Jurisprudence topics** | 15 | ✅ Open | Ontario-default; verify topic isn't covered |

### 24.3 Discovery commands — RUN THESE FIRST

Before adding ANY new content, run a substring search on existing structures. If you find existing coverage, extend it rather than duplicate.

**Search disease conditions for keyword:**
```bash
grep -o '"name": "[^"]*KEYWORD[^"]*"' /home/user/rxguide/index.html | sort -u
```

**Search reference tables for keyword:**
```bash
grep -o '"title": "[^"]*KEYWORD[^"]*"' /home/user/rxguide/index.html | sort -u
```

**List all reference table IDs in a category:**
```bash
grep -E 'var (toxIds|diIds|medSafetyIds|allergyIds|foodIds|geriatricIds|renalIds|hepaticIds|practiceIds)\s*=' /home/user/rxguide/index.html
```

**List all disease categories + condition counts:**
```bash
node -e "
const fs=require('fs');const txt=fs.readFileSync('/home/user/rxguide/index.html','utf8');
function rd(n){const i=txt.indexOf('var '+n+' = ');let s=txt.indexOf('{',i),d=0,j=s;while(j<txt.length){const c=txt[j];if(c==='{')d++;else if(c==='}'){d--;if(d===0)return [s,j+1];}j++;}}
const D=JSON.parse(txt.slice(...rd('DISEASES')));
for(const k of Object.keys(D))console.log(k.padEnd(20),(D[k].conditions||[]).length);
"
```

**List all drug families:**
```bash
node -e "
const fs=require('fs');const t=fs.readFileSync('/home/user/rxguide/index.html','utf8');
function rd(n){const i=t.indexOf('var '+n+' = ');let s=t.indexOf('{',i),d=0,j=s;while(j<t.length){const c=t[j];if(c==='{')d++;else if(c==='}'){d--;if(d===0)return [s,j+1];}j++;}}
const F=JSON.parse(t.slice(...rd('DRUG_FAMILIES')));
console.log(Object.keys(F).sort().join('\n'));
" | grep -i KEYWORD
```

**Find a disease condition by name fragment:**
```bash
node -e "
const fs=require('fs');const t=fs.readFileSync('/home/user/rxguide/index.html','utf8');
function rd(n){const i=t.indexOf('var '+n+' = ');let s=t.indexOf('{',i),d=0,j=s;while(j<t.length){const c=t[j];if(c==='{')d++;else if(c==='}'){d--;if(d===0)return [s,j+1];}j++;}}
const D=JSON.parse(t.slice(...rd('DISEASES')));
const term='KEYWORD'.toLowerCase();
for(const k of Object.keys(D))for(const c of (D[k].conditions||[])){
  if((c.name+' '+(c.introduction||'')).toLowerCase().includes(term))
    console.log(k,'/',c.id,'—',c.name);
}
"
```

### 24.4 Decision flowchart

```
You want to add content.
        |
        v
 Does it fit an existing
 disease/reference/family/etc.?
        |
   YES  |  NO
        |
        v
   ┌─────────────────┐    ┌─────────────────────┐
   │ EXTEND that     │    │ Are you sure?       │
   │ existing item.  │    │ Search for related  │
   │ Document the    │    │ scope with the      │
   │ extension in    │    │ discovery commands. │
   │ PR description. │    └─────────┬───────────┘
   └─────────────────┘              |
                              still NO
                                    |
                                    v
                          ┌─────────────────────┐
                          │ CREATE new item,    │
                          │ following canonical │
                          │ schema. Document    │
                          │ why an extension    │
                          │ wasn't possible in  │
                          │ the PR description. │
                          └─────────────────────┘
```

### 24.5 Duplicate-scope check — required for every new condition / reference table / family

The OPEN tier is open BUT every new entry needs a quick duplicate-scope check:

- **New disease condition** — substring-search existing `DISEASES[*].conditions[*].name` + `introduction` for keywords. If an existing condition already covers the scope, EXTEND it instead of duplicating.
- **New reference table** — substring-search `REFERENCE_TABLES[*].title` for topic overlap. If overlap exists, extend the existing table.
- **New drug family** — check if the drug fits an existing family in `DRUG_FAMILIES`. Singletons are acceptable when a Canadian class genuinely has one member, but check first.
- **New drug card** — confirm the canonical key (snake_case) doesn't collide with an existing entry under a different name (e.g., `ulipristal` vs `ulipristal_acetate` — see §18.3).

### 24.6 Examples of correct in-category additions (copy this pattern)

- **PR #25/26/27 Round 1** — 17 disease cards: ALL placed within existing categories (Cardiology, ENT, Ophth, Uro, GI, Derm, Infectious, Peds). Reused the 20 existing disease categories — added no new top-level disease category.
- **PR #25/26/27** — 3 tox reference tables (serotonin syndrome, NMS, alcohol withdrawal): added IDs to the EXISTING `toxIds` dispatch array. No new Reference category.
- **PR #29 Round 2** — 16 disease cards + 4 tox refs: same pattern.
- **PR #34** — non-pharm sweep: instead of adding tabs or categories, used the existing treatment-row `type` field with 8 canonical values. No new tab or category in the UI.
- **PR #38** — 5 deprescribing protocols: extended the existing `antidepressant_taper` protocol to cover SSRI/SNRI/TCA/MAOI subclasses instead of creating four parallel protocols.

### 24.7 Examples of patterns to AVOID

- ❌ **Adding a new tab** without user discussion — the 9-tab navigation is architectural and locked.
- ❌ **Adding a new disease category** like "Cardiology" or "Toxicology" — these already exist. If a scope feels like it doesn't fit any existing category, it almost certainly fits one of: Pharmacy Practice (workflow-focused), Toxicology (acute management), or another specialty category. Do not invent a new top-level category.
- ❌ **Adding a new Reference category** like "Drug-Induced Conditions" — extend an existing category's dispatch array (e.g., add the table IDs to `medSafetyIds`).
- ❌ **Duplicating an existing condition** with a slightly different angle — e.g., creating `acute_otitis_externa_pediatric` when `swimmers_ear` already covers all ages with a pediatric subsection. Extend the existing card.
- ❌ **Over-splitting an existing family** — e.g., creating "Beta-Blockers (Cardioselective)" + "Beta-Blockers (Non-Selective)" + "Beta-Blockers (Vasodilatory)" when "Beta-Blockers" with the comparison field already conveys the distinctions.

### 24.8 The rule in one paragraph

> **Tabs are LOCKED — discuss with user first. Disease categories and Reference categories are CLOSED — always use one of the existing 20 disease categories or 9 Reference categories; do not add new top-level headers. Everything else (conditions, reference tables, drug families, drug cards, vaccines, deprescribing protocols, etc.) is OPEN — add as needed, but quickly substring-search for existing duplicate scope first; extend an existing entry when scope overlaps.**

### 24.9 Discovery commands — useful before adding any content

Even though most additions are OPEN, the duplicate-scope check is required. Run these to confirm:

**Search disease conditions for keyword:**
```bash
grep -o '"name": "[^"]*KEYWORD[^"]*"' /home/user/rxguide/index.html | sort -u
```

**Search reference tables for keyword:**
```bash
grep -o '"title": "[^"]*KEYWORD[^"]*"' /home/user/rxguide/index.html | sort -u
```

**List all 20 disease categories + condition counts:**
```bash
node -e "
const fs=require('fs');const txt=fs.readFileSync('/home/user/rxguide/index.html','utf8');
function rd(n){const i=txt.indexOf('var '+n+' = ');let s=txt.indexOf('{',i),d=0,j=s;while(j<txt.length){const c=txt[j];if(c==='{')d++;else if(c==='}'){d--;if(d===0)return [s,j+1];}j++;}}
const D=JSON.parse(txt.slice(...rd('DISEASES')));
for(const k of Object.keys(D))console.log(k.padEnd(20),(D[k].conditions||[]).length);
"
```

**List all 9 Reference category dispatch arrays:**
```bash
grep -E '^\s*var (toxIds|diIds|medSafetyIds|allergyIds|foodIds|geriatricIds|renalIds|hepaticIds|practiceIds)\s*=' /home/user/rxguide/index.html
```

**Find a disease condition by name fragment (case-insensitive):**
```bash
node -e "
const fs=require('fs');const t=fs.readFileSync('/home/user/rxguide/index.html','utf8');
function rd(n){const i=t.indexOf('var '+n+' = ');let s=t.indexOf('{',i),d=0,j=s;while(j<t.length){const c=t[j];if(c==='{')d++;else if(c==='}'){d--;if(d===0)return [s,j+1];}j++;}}
const D=JSON.parse(t.slice(...rd('DISEASES')));
const term='KEYWORD'.toLowerCase();
for(const k of Object.keys(D))for(const c of (D[k].conditions||[])){
  if((c.name+' '+(c.introduction||'')).toLowerCase().includes(term))
    console.log(k,'/',c.id,'—',c.name);
}
"
```

**Search drug families for keyword:**
```bash
node -e "
const fs=require('fs');const t=fs.readFileSync('/home/user/rxguide/index.html','utf8');
function rd(n){const i=t.indexOf('var '+n+' = ');let s=t.indexOf('{',i),d=0,j=s;while(j<t.length){const c=t[j];if(c==='{')d++;else if(c==='}'){d--;if(d===0)return [s,j+1];}j++;}}
const F=JSON.parse(t.slice(...rd('DRUG_FAMILIES')));
console.log(Object.keys(F).sort().join('\n'));
" | grep -i KEYWORD
```

### 24.10 Why this matters

- **Tab locking** — tabs are the top-level navigation. Adding one fragments the user's mental model and changes the app architecture. Always discuss first.
- **Category locking** — top-level categories on the Diseases and Reference home pages are user-facing taxonomy. Stability matters for users who rely on muscle memory.
- **Duplicate-scope avoidance** — within open containers, duplicates fragment content (e.g., an `acute_otitis_externa` and a `swimmers_ear` both describing overlapping things confuse users searching for one or the other).
- **Schema consistency** — extending existing entries inherits conventions automatically.

---

**End of guide.** Last updated 2026-05-12. If you make architectural changes, update this document in the same PR.
