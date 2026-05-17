# AUDIT-STATUS.md — RxGuide Catalog Audit Coverage

> **Live status file** — auto-regenerated from `index.html` by `scripts/regenerate_audit_status.js`.
> Re-run after every audit cycle so future agents know exactly what's audited and what remains.

**Last regenerated:** 2026-05-17
**Catalog snapshot:** 2,877 clickable entries (latest commit: `120964f on 2026-05-17`)

---

## How to use this file

1. **Before starting any audit work**, read the relevant section below to see what specific entries still need attention.
2. **After completing an audit cycle**, run `node scripts/regenerate_audit_status.js` to refresh this file and commit it alongside the fix PR.
3. Each section lists (a) the audit dimension and current %, and (b) the explicit list of entries that still fail the check.
4. Items NOT listed are confirmed passing. Use this file as the source of truth for "what's left to audit."

---

## Top-line summary

| Category | Count | Best % | Worst % |
|---|---|---|---|
| **DRUGS** | 1,546 | 100.0% | 100.0% |
| **VACCINES** | 56 | 100.0% | 100.0% |
| **DRUG_FAMILIES** | 539 | 100.0% | 100.0% |
| **REFERENCE_TABLES** | 100 | 100.0% | 100.0% |
| **DISEASES.conditions** | 600 | 100.0% | 100.0% |

---

## DRUGS (1,546 entries)

| Audit dimension | Coverage | Bar | Audited (clean) | Remaining |
|---|---|---|---|---|
| Full 16-field schema complete | **100.0%** | `██████████████████` | 1,546 | 0 |
| Non-empty `interactions[]` | **100.0%** | `██████████████████` | 1,546 | 0 |
| Canonical severity values | **100.0%** | `██████████████████` | 1,546 | 0 |
| Canadian-source recognition | **100.0%** | `██████████████████` | 1,546 | 0 |
| NAPRA_ODB_DATA entry | **100.0%** | `██████████████████` | 1,546 | 0 |
| PREG_DATA entry | **100.0%** | `██████████████████` | 1,546 | 0 |
| FAMILY_MAP entry | **100.0%** | `██████████████████` | 1,546 | 0 |
| FAMILY_MAP → resolves to DRUG_FAMILIES card | **100.0%** | `██████████████████` | 1,546 | 0 |
| `monitoring` field populated | **100.0%** | `██████████████████` | 1,546 | 0 |
| `monitoring` depth ≥ 4 items | **100.0%** | `██████████████████` | 1,546 | 0 |
| `interactions` depth ≥ 5 items | **100.0%** | `██████████████████` | 1,546 | 0 |
| `pearls` depth ≥ 5 items | **100.0%** | `██████████████████` | 1,546 | 0 |
| `side_effects` depth ≥ 5 items | **100.0%** | `██████████████████` | 1,546 | 0 |

---

## VACCINES (56 entries)

| Audit dimension | Coverage | Bar | Audited (clean) | Remaining |
|---|---|---|---|---|
| Required schema fields | **100.0%** | `██████████████████` | 56 | 0 |
| Canadian-source (NACI / PHAC / CIG / Canada) | **100.0%** | `██████████████████` | 56 | 0 |
| `pearls` depth ≥ 5 items | **100.0%** | `██████████████████` | 56 | 0 |
| `contraindications` depth ≥ 2 items | **100.0%** | `██████████████████` | 56 | 0 |
| `interactions` depth ≥ 3 items | **100.0%** | `██████████████████` | 56 | 0 |
| `side_effects` depth ≥ 5 items | **100.0%** | `██████████████████` | 56 | 0 |
| `indications` depth ≥ 2 items | **100.0%** | `██████████████████` | 56 | 0 |

---

## DRUG_FAMILIES (539 entries)

| Audit dimension | Coverage | Bar | Audited (clean) | Remaining |
|---|---|---|---|---|
| Full required schema (moa_summary, class_effects, contraindications, members, pearls, source) | **100.0%** | `██████████████████` | 539 | 0 |
| Non-empty `members[]` | **100.0%** | `██████████████████` | 539 | 0 |
| Canadian source / canadian_notes | **100.0%** | `██████████████████` | 539 | 0 |
| `class_effects` depth ≥ 3 items | **100.0%** | `██████████████████` | 539 | 0 |
| `class_contraindications` depth ≥ 2 items | **100.0%** | `██████████████████` | 539 | 0 |

---

## REFERENCE_TABLES (100 entries)

| Audit dimension | Coverage | Bar | Audited (clean) | Remaining |
|---|---|---|---|---|
| All 10 schema fields complete | **100.0%** | `██████████████████` | 100 | 0 |
| Canadian source in citation | **100.0%** | `██████████████████` | 100 | 0 |
| Wired into `buildReference()` dispatch (not orphan) | **100.0%** | `██████████████████` | 100 | 0 |
| `related_drugs` all resolve to DRUGS/VACCINES | **100.0%** | `██████████████████` | 100 | 0 |
| Row widths match column count | **100.0%** | `██████████████████` | 100 | 0 |

---

## DISEASES.conditions (600 entries)

| Audit dimension | Coverage | Bar | Audited (clean) | Remaining |
|---|---|---|---|---|
| Required schema (signs/diagnosis/treatment/pearls non-empty) | **100.0%** | `██████████████████` | 600 | 0 |
| Cites Canadian source | **100.0%** | `██████████████████` | 600 | 0 |
| All `treatment.agents` resolve (DRUGS/VACCINES/NON_PHARM_AGENTS) | **100.0%** | `██████████████████` | 600 | 0 |
| §21.13 multi-family compliance | **100.0%** | `██████████████████` | 600 | 0 |
| `preg_lact_summary` populated (preg + lact drug categorization) | **100.0%** | `██████████████████` | 600 | 0 |

---

## DEPRESCRIBING_PROTOCOLS (17 entries)

| Audit dimension | Coverage | Bar | Audited (clean) | Remaining |
|---|---|---|---|---|
| Full 12-field schema complete | **100.0%** | `██████████████████` | 17 | 0 |
| `taper_steps` structured (step/action/detail objects) | **100.0%** | `██████████████████` | 17 | 0 |
| Cites Canadian source | **100.0%** | `██████████████████` | 17 | 0 |

---

## MINOR_AILMENTS (19 entries)

| Audit dimension | Coverage | Bar | Audited (clean) | Remaining |
|---|---|---|---|---|
| Full 9-field schema complete | **100.0%** | `██████████████████` | 19 | 0 |
| `assessment` has key_questions + red_flags | **100.0%** | `██████████████████` | 19 | 0 |
| Cites Canadian source / Ontario regulation | **100.0%** | `██████████████████` | 19 | 0 |

---

## NON_PHARM_AGENTS (94 entries)

| Audit dimension | Coverage | Bar | Audited (clean) | Remaining |
|---|---|---|---|---|
| Schema complete (label + category) | **100.0%** | `██████████████████` | 94 | 0 |
| Category is canonical (one of 8 types) | **100.0%** | `██████████████████` | 94 | 0 |

---

## AMR_DATA (Antimicrobials tab) (204 entries)

| Audit dimension | Coverage | Bar | Audited (clean) | Remaining |
|---|---|---|---|---|
| Agent schema complete (drug, dose, uses, ci, notes) | **100.0%** | `██████████████████` | 204 | 0 |
| Agent resolves to DRUGS catalog (click-through) | **100.0%** | `██████████████████` | 204 | 0 |
| Family schema complete (name, moa, coverage) | **100.0%** | `██████████████████` | 204 | 0 |

---

## EDIT_HISTORY (entities tracked) (1,649 entries)

| Audit dimension | Coverage | Bar | Audited (clean) | Remaining |
|---|---|---|---|---|
| Has ≥1 history entry | **100.0%** | `██████████████████` | 1,649 | 0 |
| Entries have valid date + hash + subject | **100.0%** | `██████████████████` | 1,649 | 0 |
| Date format YYYY-MM-DD | **100.0%** | `██████████████████` | 1,649 | 0 |
| Entity exists in current catalog (no orphan) | **100.0%** | `██████████████████` | 1,649 | 0 |

---

## CHANGELOG (PR entries) (122 entries)

| Audit dimension | Coverage | Bar | Audited (clean) | Remaining |
|---|---|---|---|---|
| Required fields (pr, date, title) | **100.0%** | `██████████████████` | 122 | 0 |
| Date format YYYY-MM-DD | **100.0%** | `██████████████████` | 122 | 0 |
| PR number is integer | **100.0%** | `██████████████████` | 122 | 0 |

---

## Cross-Reference: Reference Tables (100 entries)

| Audit dimension | Coverage | Bar | Audited (clean) | Remaining |
|---|---|---|---|---|
| Drugs mentioned in `rows` are in `related_drugs[]` | **100.0%** | `██████████████████` | 100 | 0 |

---

## Additional content assets (not %-based)

| Asset | Count |
|---|---|
| DEPRESCRIBING_PROTOCOLS | **17** |
| MINOR_AILMENTS | **19** |
| NON_PHARM_AGENTS dictionary | **94** |
| EDIT_HISTORY entities tracked | **1,649** |
| CHANGELOG PRs catalogued | **122** |
| DISEASES categories | **20** |

---

## Suggested next audit priorities

Ordered by impact (size of gap × clinical importance):

**No remaining audit gaps — catalog is 100% clean across all checked dimensions.**

---

## Tier 4 — Full-Verbatim (FV) Clinical Audit Coverage

> **Manually maintained block** — edit `FV_AUDIT` in `scripts/regenerate_audit_status.js`, not this file (it is overwritten on every regeneration). Last updated: **2026-05-17**.
> FV audit = line-by-line clinical-accuracy review of every field in every entry against the Canadian guideline hierarchy (SOGC > PHAC > Health Canada > CCS/CTS/CADTH > international). This is distinct from — and goes beyond — the structural passes tabulated above.
> All catalogs below are tracked as **first pass (FV-1)**; an independent FV-2 deep pass may follow.

| Catalog | Entries | FV-audited | Status | Evidence |
|---|---|---|---|---|
| **DISEASES.conditions** | 600 | 600 / 600 (100%) | COMPLETE — first pass | Line-by-line audit batches 1-14 plus full-catalog deep batches 25-27 (commits 7d69be7, 7ee3142, 9a6169a, 7dff031, f1771f3, 9f0f986, d294b83, f5051e9, 5d13dfa, 8e862a3). |
| **REFERENCE_TABLES** | 100 | 100 / 100 (100%) | COMPLETE — first pass | All 100 reference tables clinically reviewed in the Disease + Reference audit completion pass (commit 8e862a3). |
| **VACCINES** | 56 | 56 / 56 (100%) | COMPLETE — first pass | Vaccine-card clinical-error audit plus Tier 1 dimension expansion (commits 9201419, 730d339). |
| **PREG_DATA (Pregnancy / Breastfeeding)** | 1,547 | 1,547 / 1,547 (100%) | COMPLETE — first pass | All 1,547 entries reviewed line-by-line; risk-category and clinical-accuracy errors fixed across the 2026-05-17 cycle (commits 3de2f28, 27ca5e9, f704021, 5651cc3, 8847f9d). |
| **DRUG_FAMILIES** | 539 | 539 / 539 (100%) | COMPLETE — first pass | Tier 4 batches 1-2 plus the FAM-numbered per-family series; first-pass FV completion confirmed by the auditing agent (commits 095e26f, 32de939, 9c5a099, b7b7616, f5edc9f). |
| **DRUGS** | 1,546 | In progress | IN PROGRESS — first pass | Tier 4 self-review rounds 1-7, XCAT master-scan batches 1-7, and cross-catalog propagation batches 1-5 completed; systematic per-drug verbatim sweep still in progress. |
| **NAPRA_ODB_DATA (drug scheduling / ODB coverage)** | 1,547 | ≈ 405 / 1,547 (~26%) | IN PROGRESS — first pass | Batches 1-3 (2026-05-17): first ~405 entries reviewed (antimicrobials, cardiovascular, antithrombotic, endocrine, psychiatric, GI, respiratory, analgesic, dermatology, biologic, bone/GU drugs). 2 fixes — ceftriaxone gonorrhea dose 250→500 mg IM; naproxen entry reconstructed (malformed name + truncated odbDetail/notes fields). Remaining ~1,140 entries pending batched review. |
| **AMR_DATA (antimicrobial agents)** | 204 | 204 / 204 (100%) | COMPLETE — first pass | All 204 agents (Antibacterials / Antivirals / Antifungals / Antimycobacterials / Antiparasitics) reviewed line-by-line, 2026-05-17 cycle; 2 fixes — Maviret 8-week compensated-cirrhosis currency + Child-Pugh B contraindication; nystatin not for esophageal candidiasis — propagated to DRUGS + DISEASES siblings. |
| **DEPRESCRIBING_PROTOCOLS** | 17 | 17 / 17 (100%) | COMPLETE — first pass | All 17 protocols reviewed line-by-line against Canadian deprescribing.org / CFP guidelines, 2026-05-17 cycle; no clinical errors found. |
| **MINOR_AILMENTS** | 19 | 19 / 19 (100%) | COMPLETE — first pass | All 19 ailments reviewed line-by-line against OCP O. Reg. 256/24 scope + Canadian guidelines, 2026-05-17 cycle; 1 fix — Acne Vulgaris ontario_ma_scope corrected (acne is NOT a designated Ontario Minor Ailment). |
| **NON_PHARM_AGENTS** | 94 | 94 / 94 (100%) | COMPLETE — first pass | All 94 intervention entries reviewed for label accuracy + canonical category assignment, 2026-05-17 cycle; no errors found. |

**First-pass FV summary (as of 2026-05-17):**

- **Complete (first pass):** DISEASES.conditions, REFERENCE_TABLES, VACCINES, PREG_DATA, DRUG_FAMILIES, AMR_DATA, DEPRESCRIBING_PROTOCOLS, MINOR_AILMENTS, NON_PHARM_AGENTS — **3,176 entries**.
- **In progress (first pass):** DRUGS, NAPRA_ODB_DATA — **3,093 entries**.
- **Not started:**  — **0 entries**.

**Next FV target:** complete the DRUGS first-pass verbatim sweep, then NAPRA_ODB_DATA (drug scheduling + ODB coverage). Both are ~1,547-entry catalogs that require batched, multi-cycle FV review — they cannot be completed in a single pass.

---

## Tier 4 — Beyond Automated Audit (clinical review domain)

The audit script measures **structural** integrity (schema, depth thresholds, cross-references, taxonomy, dates). It cannot measure:

- **Clinical accuracy** of pearls, interactions, monitoring, contraindications, indications.
- **Currency** of Health Canada approval status — newly approved drugs, withdrawn drugs, monograph revisions, label changes.
- **Severity correctness** on drug interactions (the script checks the severity is one of 6 canonical values, but cannot verify a specific interaction was correctly classified as Major vs Moderate).
- **Canadian-context correctness** — the script accepts any token from a Canadian-keyword list, but cannot verify the citation actually supports the clinical content.
- **Dose accuracy** for renal/hepatic/pediatric/elderly adjustments.
- **Pregnancy-category correctness** beyond presence of the structured field.
- **Treatment-line ordering** (first-line vs second-line vs salvage).
- **Diagnostic criteria currency** (DSM-5-TR, ICD-11, KDIGO, GOLD/GINA latest annual editions).

**Tier 4 is the domain of human clinical review.** The audit script makes that review tractable by ensuring structural completeness so reviewers can focus on content rather than missing fields. AUDIT-STATUS.md at 100% across all *structural* dimensions means the catalog is *ready* for clinical review; the **FV coverage table above** tracks which catalogs have actually completed that first-pass clinical-accuracy review.

Recommended human-review cadence: continuous as Canadian guidelines update (CCS/CTS/CAG/CSN/CRA/AMMI/SOGC/NACI/etc. publish annually or more frequently). Track changes via CHANGELOG; EDIT_HISTORY captures per-entity revision provenance.

---

## Audit-workflow contract

1. **AGENT MUST READ this file** before starting any audit task. The specific entries listed under each "❌ Remaining" section ARE the next audit work.
2. **AGENT MUST REGENERATE this file** after every audit/fix PR by running `node scripts/regenerate_audit_status.js` (or recreating the script if /tmp is gone — see the script source above for the canonical algorithm).
3. **AGENT MUST COMMIT** the regenerated AUDIT-STATUS.md alongside the fix in the same PR (so main is always self-describing).
4. Items absent from this file are confirmed passing. Do NOT audit items already at 100% unless the user explicitly asks.
5. Reference this file by name in PR descriptions ("see AUDIT-STATUS.md for full context on remaining gaps").

See AGENTS.md §AUDIT-STATUS and CLAUDE.md "Standing workflow" for the full canonical workflow.
