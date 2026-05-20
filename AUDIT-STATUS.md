# AUDIT-STATUS.md — RxGuide Catalog Audit Coverage

> **Live status file** — auto-regenerated from `index.html` by `scripts/regenerate_audit_status.js`.
> Re-run after every audit cycle so future agents know exactly what's audited and what remains.

**Last regenerated:** 2026-05-20
**Catalog snapshot:** 2,907 clickable entries (latest commit: `59786cf on 2026-05-20`)

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
| **DRUGS** | 1,551 | 100.0% | 100.0% |
| **VACCINES** | 56 | 100.0% | 100.0% |
| **DRUG_FAMILIES** | 542 | 100.0% | 100.0% |
| **REFERENCE_TABLES** | 117 | 100.0% | 99.1% |
| **DISEASES.conditions** | 604 | 100.0% | 100.0% |

---

## DRUGS (1,551 entries)

| Audit dimension | Coverage | Bar | Audited (clean) | Remaining |
|---|---|---|---|---|
| Full 16-field schema complete | **100.0%** | `██████████████████` | 1,551 | 0 |
| Non-empty `interactions[]` | **100.0%** | `██████████████████` | 1,551 | 0 |
| Canonical severity values | **100.0%** | `██████████████████` | 1,551 | 0 |
| Canadian-source recognition | **100.0%** | `██████████████████` | 1,551 | 0 |
| NAPRA_ODB_DATA entry | **100.0%** | `██████████████████` | 1,551 | 0 |
| PREG_DATA entry | **100.0%** | `██████████████████` | 1,551 | 0 |
| FAMILY_MAP entry | **100.0%** | `██████████████████` | 1,551 | 0 |
| FAMILY_MAP → resolves to DRUG_FAMILIES card | **100.0%** | `██████████████████` | 1,551 | 0 |
| `monitoring` field populated | **100.0%** | `██████████████████` | 1,551 | 0 |
| `monitoring` depth ≥ 4 items | **100.0%** | `██████████████████` | 1,551 | 0 |
| `interactions` depth ≥ 5 items | **100.0%** | `██████████████████` | 1,551 | 0 |
| `pearls` depth ≥ 5 items | **100.0%** | `██████████████████` | 1,551 | 0 |
| `side_effects` depth ≥ 5 items | **100.0%** | `██████████████████` | 1,551 | 0 |

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

## DRUG_FAMILIES (542 entries)

| Audit dimension | Coverage | Bar | Audited (clean) | Remaining |
|---|---|---|---|---|
| Full required schema (moa_summary, class_effects, contraindications, members, pearls, source) | **100.0%** | `██████████████████` | 542 | 0 |
| Non-empty `members[]` | **100.0%** | `██████████████████` | 542 | 0 |
| Canadian source / canadian_notes | **100.0%** | `██████████████████` | 542 | 0 |
| `class_effects` depth ≥ 3 items | **100.0%** | `██████████████████` | 542 | 0 |
| `class_contraindications` depth ≥ 2 items | **100.0%** | `██████████████████` | 542 | 0 |

---

## REFERENCE_TABLES (117 entries)

| Audit dimension | Coverage | Bar | Audited (clean) | Remaining |
|---|---|---|---|---|
| All 10 schema fields complete | **100.0%** | `██████████████████` | 117 | 0 |
| Canadian source in citation | **100.0%** | `██████████████████` | 117 | 0 |
| Wired into `buildReference()` dispatch (not orphan) | **100.0%** | `██████████████████` | 117 | 0 |
| `related_drugs` all resolve to DRUGS/VACCINES | **99.1%** | `██████████████████` | 116 | 1 |
| Row widths match column count | **100.0%** | `██████████████████` | 117 | 0 |

### ❌ `related_drugs` all resolve to DRUGS/VACCINES — 1 entries remaining (0.9% of total)

| Key/ID | Detail |
|---|---|
| `tox_antidote_table` | {"unresolved":["dimercaprol"]} |

---

## DISEASES.conditions (604 entries)

| Audit dimension | Coverage | Bar | Audited (clean) | Remaining |
|---|---|---|---|---|
| Required schema (signs/diagnosis/treatment/pearls non-empty) | **100.0%** | `██████████████████` | 604 | 0 |
| Cites Canadian source | **100.0%** | `██████████████████` | 604 | 0 |
| All `treatment.agents` resolve (DRUGS/VACCINES/NON_PHARM_AGENTS) | **100.0%** | `██████████████████` | 604 | 0 |
| §21.13 multi-family compliance | **100.0%** | `██████████████████` | 604 | 0 |
| `preg_lact_summary` populated (preg + lact drug categorization) | **100.0%** | `██████████████████` | 604 | 0 |

---

## DEPRESCRIBING_PROTOCOLS (17 entries)

| Audit dimension | Coverage | Bar | Audited (clean) | Remaining |
|---|---|---|---|---|
| Full 12-field schema complete | **100.0%** | `██████████████████` | 17 | 0 |
| `taper_steps` structured (step/action/detail objects) | **100.0%** | `██████████████████` | 17 | 0 |
| Cites Canadian source | **100.0%** | `██████████████████` | 17 | 0 |

---

## MINOR_AILMENTS (20 entries)

| Audit dimension | Coverage | Bar | Audited (clean) | Remaining |
|---|---|---|---|---|
| Full 9-field schema complete | **100.0%** | `██████████████████` | 20 | 0 |
| `assessment` has key_questions + red_flags | **100.0%** | `██████████████████` | 20 | 0 |
| Cites Canadian source / Ontario regulation | **100.0%** | `██████████████████` | 20 | 0 |

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

## Cross-Reference: Reference Tables (117 entries)

| Audit dimension | Coverage | Bar | Audited (clean) | Remaining |
|---|---|---|---|---|
| Drugs mentioned in `rows` are in `related_drugs[]` | **100.0%** | `██████████████████` | 117 | 0 |

---

## Additional content assets (not %-based)

| Asset | Count |
|---|---|
| DEPRESCRIBING_PROTOCOLS | **17** |
| MINOR_AILMENTS | **20** |
| NON_PHARM_AGENTS dictionary | **94** |
| EDIT_HISTORY entities tracked | **1,649** |
| CHANGELOG PRs catalogued | **122** |
| DISEASES categories | **20** |

---

## Suggested next audit priorities

Ordered by impact (size of gap × clinical importance):

| Priority | Gap (entries) | Audit area |
|---|---|---|
| 2 | **1** | REFERENCE_TABLES — fix `related_drugs` keys that don't resolve |

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

**Tier 4 is the domain of human clinical review.** The audit script makes that review tractable by ensuring structural completeness so reviewers can focus on content rather than missing fields. AUDIT-STATUS.md at 100% across all dimensions means the catalog is *ready* for clinical review, not that clinical accuracy has been verified.

Recommended human-review cadence: continuous as Canadian guidelines update (CCS/CTS/CAG/CSN/CRA/AMMI/SOGC/NACI/etc. publish annually or more frequently). Track changes via CHANGELOG; EDIT_HISTORY captures per-entity revision provenance.

---

## Audit-workflow contract

1. **AGENT MUST READ this file** before starting any audit task. The specific entries listed under each "❌ Remaining" section ARE the next audit work.
2. **AGENT MUST REGENERATE this file** after every audit/fix PR by running `node scripts/regenerate_audit_status.js` (or recreating the script if /tmp is gone — see the script source above for the canonical algorithm).
3. **AGENT MUST COMMIT** the regenerated AUDIT-STATUS.md alongside the fix in the same PR (so main is always self-describing).
4. Items absent from this file are confirmed passing. Do NOT audit items already at 100% unless the user explicitly asks.
5. Reference this file by name in PR descriptions ("see AUDIT-STATUS.md for full context on remaining gaps").

See AGENTS.md §AUDIT-STATUS and CLAUDE.md "Standing workflow" for the full canonical workflow.
