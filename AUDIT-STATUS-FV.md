# AUDIT-STATUS-FV.md — Tier 4 Full-Verbatim Clinical-Content Audit Tracker

> **Manual companion to `AUDIT-STATUS.md`.**
> `AUDIT-STATUS.md` is **auto-regenerated** by `scripts/regenerate_audit_status.js` and tracks
> **structural** audit coverage (schema completeness, depth thresholds, cross-references, taxonomy).
> **This file is hand-maintained** and tracks **Tier 4 — agent-driven full-verbatim (FV,
> line-by-line) clinical-content review**, which the automated script cannot measure.
>
> This file is **NOT auto-generated** — regenerating `AUDIT-STATUS.md` will not touch it.
> Edit it directly after each FV audit cycle.

**Last updated:** 2026-05-18

---

## What "Tier 4 / FV" means

The audit script measures **structural** integrity (schema, depth thresholds, cross-references, taxonomy, dates). It **cannot** measure:

- **Clinical accuracy** of pearls, interactions, monitoring, contraindications, indications.
- **Currency** of Health Canada approval status — newly approved drugs, withdrawn drugs, monograph revisions, label changes.
- **Severity correctness** on drug interactions (the script checks the severity is one of 6 canonical values, but cannot verify a specific interaction was correctly classified Major vs Moderate).
- **Canadian-context correctness** — the script accepts any token from a Canadian-keyword list, but cannot verify the citation actually supports the clinical content.
- **Dose accuracy** for renal/hepatic/pediatric/elderly adjustments.
- **Pregnancy-category correctness** beyond presence of the structured field.
- **Treatment-line ordering** (first-line vs second-line vs salvage).
- **Diagnostic-criteria currency** (DSM-5-TR, ICD-11, KDIGO, GOLD/GINA latest annual editions).

**Tier 4 is the domain of agent / human clinical review.** A catalog at 100% structural audit is *ready* for FV review — it is not clinically verified until an FV pass is logged here.

---

## Tier 4 verbatim-review progress log — carried over from AUDIT-STATUS.md

Records which catalogs have had an agent-driven verbatim (line-by-line) clinical-content review beyond the automated structural audit. **Copied verbatim from `AUDIT-STATUS.md`; reflects work by other branches — do not alter.**

| Catalog | Tier 4 verbatim review | Notes |
|---|---|---|
| **REFERENCE_TABLES** (100) | ✅ COMPLETE | All 100 tables reviewed line-by-line. 1 safety-critical fix (ped azithromycin suspension example was 2× over — `ped_antibiotic_suspensions`). Doses, equivalence ratios, CrCl/Child-Pugh thresholds, CPIC content, trial citations all verified against current Canadian + international guidelines. |
| **DISEASES.conditions** (600) | 🟡 IN PROGRESS | Disease audit batches 1–29 + palliative (9) + travel medicine + empty-Drug-row sweep complete. Several SAFETY-CRITICAL fixes (rabies vaccine pregnancy mis-categorization, mefloquine pregnancy, wrong-vaccine agents). Remaining categories not yet fully verbatim-reviewed. |
| **DRUG_FAMILIES** (563) | ✅ COMPLETE | Full-catalog STRUCTURAL pass complete: all 563 comparison[] arrays audited for mis-keyed rows (18 distinct-drug key mismatches fixed) and duplicate rows (~57 same-drug duplicates removed across ~52 families); renderer patched to render members-style ({key,name,brand,notes}) comparison entries. Verbatim CLINICAL-CONTENT review COMPLETE for all 563 families. Fix highlights: catalog-wide sweep of deprecated FDA pregnancy categories (A/B/C/D/X); drug-class misclassification corrected (etripamil sodium→calcium channel blocker); GnRH-antagonist mechanism error (leuprolide is an agonist); topoisomerase-II cytogenetics error (11q23/KMT2A); internal approval-status contradictions resolved (lefamulin, etripamil, adagrasib, capivasertib, arimoclomol); spurious boxed-warning claims removed (larotrectinib, sotorasib); HC approval-date corrections (Opzelura, capivasertib). |
| **DRUGS** (1546) | 🟡 PARTIAL | AUDIT-CONTENT.md sampled 15 high-volume drug cards. Full verbatim review pending. |
| **VACCINES** (56) | 🟡 PARTIAL | imvamune contraindications + interaction severity corrected. Full verbatim review pending. |

---

## FV first-pass audit log — branch `claude/continue-rx-guide-audit-7I3U1`

Agent-driven full-verbatim (line-by-line) **FIRST-PASS** clinical-content audit completed on this branch. **Additive** — does not supersede the table above; other branches may have audited additional catalogs independently. Where a catalog appears in both tables, both records are intentionally retained.

| Catalog | FV first pass | Notes |
|---|---|---|
| **DRUG_FAMILIES** (563) | ✅ 100% | Full verbatim pass complete. Fix: Cushing Steroidogenesis Inhibitors family card — levoketoconazole HC-approval claim corrected (Recorlev is FDA-approved only; SAP access in Canada). |
| **AMR_DATA — Antimicrobials drug view** (204) | ✅ 100% | Full verbatim pass complete. Fixes: fabricated cefazolin/cloxacillin "FIRST trial / CefBacT" citations replaced with the real CloCeBa RCT (8 locations across DRUGS + DRUG_FAMILIES + AMR_DATA); tedizolid course corrected 5→6 days. |
| **EMPIRIC_THERAPY_SYNDROMES — Antimicrobials syndrome view** (67) | ✅ 100% | Full verbatim pass complete. Fix: Bacterial Prostatitis card — doxycycline-duration internal contradiction resolved (STI-related prostatitis 7→10–14 days). |
| **VACCINES** (56) | ✅ 100% | Full verbatim pass complete. Fix: Tdap-in-pregnancy timing corrected to the NACI 27–32-week window (Adacel, Td, Adacel-Polio card pearls). |
| **SCORING_TOOLS** (19) | ✅ 100% | Full verbatim pass complete. All 19 clinical calculators verified (component point values, score maxima, interpretation thresholds) — 0 errors found. |
| **DRUGS** (1546) | ◐ prior sessions | Reported FV-complete in earlier sessions of this branch per the session-continuity record; not re-verified in the current session. The structural Tier-4 log above shows DRUGS as PARTIAL — treat DRUGS FV status as unconfirmed pending re-verification. |

### Fixes deployed this branch (FV first pass)

| Commit | Catalog(s) | Fix |
|---|---|---|
| `8240444` | DRUG_FAMILIES | Levoketoconazole HC-approval claim corrected (FDA-only; SAP in Canada). |
| `5f70bb6` | AMR_DATA, DRUG_FAMILIES, DRUGS | Fabricated "FIRST trial / CefBacT" cefazolin-vs-cloxacillin citations → CloCeBa RCT; tedizolid 5→6-day course. |
| `1096eac` | VACCINES | Tdap-in-pregnancy timing 21–32 → 27–32 weeks (NACI window). |
| `8746185` | EMPIRIC_THERAPY_SYNDROMES | Prostatitis doxycycline duration 7 → 10–14 days for STI prostatitis. |

---

## Still requiring FV first-pass review

| Catalog | Approx size | FV status |
|---|---|---|
| **DISEASES.conditions** (600) | ~125,000 lines | 🟡 IN PROGRESS (other branch — batches 1–29 + palliative + travel done; remaining categories pending) |
| **PREG_DATA** | ~15,000 lines | ❌ NOT STARTED |
| **NAPRA_ODB_DATA** | ~10,600 lines | ❌ NOT STARTED |
| **MINOR_AILMENTS** (19) | ~4,100 lines | ❌ NOT STARTED |
| **DEPRESCRIBING_PROTOCOLS** (17) | ~1,400 lines | ❌ NOT STARTED |
| **REFERENCE_TABLES** (100) | — | ✅ COMPLETE (other branch — see carried-over log above; not re-audited on this branch) |

**Structurally validated, no prose FV pass required:** `FAMILY_MAP` (routing table — orphan-resolution checked by the audit script), `SCORE_PATTERNS`, `EMPIRIC_THERAPY_CATEGORIES`, `NON_PHARM_AGENTS`, `EDIT_HISTORY`, `CHANGELOG`, and other helper/config objects.

---

## Maintenance

- Update this file directly after each FV audit cycle (it is not auto-generated).
- Keep the "carried over from AUDIT-STATUS.md" table in sync if other branches advance Tier 4 work in `AUDIT-STATUS.md`.
- Commit this file alongside the FV fix it documents.
