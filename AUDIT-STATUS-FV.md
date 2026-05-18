# AUDIT-STATUS-FV.md — Tier 4 Full-Verbatim Clinical-Content Audit Tracker

> **Manual companion to `AUDIT-STATUS.md`.**
> `AUDIT-STATUS.md` is **auto-regenerated** by `scripts/regenerate_audit_status.js` and tracks
> **structural** audit coverage (schema completeness, depth thresholds, cross-references, taxonomy).
> **This file is hand-maintained** and tracks **Tier 4 — agent-driven full-verbatim (FV,
> line-by-line) clinical-content review**, which the automated script cannot measure.
>
> This file is **NOT auto-generated** — regenerating `AUDIT-STATUS.md` will not touch it.
> Edit it directly after each FV audit cycle. Where the two files disagree, **this file is
> authoritative for FV status** (the auto-generated Tier 4 log in `AUDIT-STATUS.md` lags
> branch coordination — e.g., it still shows DISEASES as IN PROGRESS when it is complete).

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

## Master FV audit status — all catalogs

Consolidated full-verbatim (line-by-line clinical-content) review status across all branches, per current branch coordination.

| Catalog | FV status | Reviewed by | Notes |
|---|---|---|---|
| **DRUG_FAMILIES** (563) | ✅ 100% | other branch + this branch | Verbatim clinical-content review complete. |
| **DRUGS** (1546) | 🟡 IN PROGRESS | this branch | Full-verbatim re-verification underway (object spans index.html lines ~125,541–286,880). Verified through the cardiovascular / antidiabetic / lipid / antithrombotic / gout / NSAID / corticosteroid / antidepressant / anxiolytic / antipsychotic / mood-stabilizer / antiepileptic / ADHD / hypnotic / addiction-medicine / dementia cluster (~108 cards). Fixes: denosumab FREEDOM-trial mischaracterization; buspirone + pregabalin copy-pasted `source` citations; **CDSA-schedule errors — amphetamine/methylphenidate stimulants wrongly "Schedule I" → corrected to Schedule III; buprenorphine-naloxone wrongly "Schedule III" (US DEA value) → corrected to Schedule I narcotic; Jurisprudence CDSA reference table corrected — all verified, propagated across ~18 locations in DRUGS + DRUG_FAMILIES + DISEASES + NAPRA_ODB_DATA + Jurisprudence**. Resume pointer: index.html line ~139,570 (varenicline). |
| **VACCINES** (56) | ✅ 100% | this branch | ~55 vaccine cards verbatim-reviewed. |
| **AMR_DATA** — Antimicrobials drug view (204) | ✅ 100% | this branch | Antibacterials, antivirals, antifungals, antimycobacterials, antiparasitics. |
| **EMPIRIC_THERAPY_SYNDROMES** — Antimicrobials syndrome view (67) | ✅ 100% | this branch | ~67 empiric-therapy syndromes verbatim-reviewed. |
| **SCORING_TOOLS** (19) | ✅ 100% | this branch | 19 clinical calculators verified. |
| **REFERENCE_TABLES** (100) | ✅ 100% | other branch | All 100 tables verbatim-reviewed. |
| **DISEASES.conditions** (600) | ✅ 100% | other branch | Verbatim review complete (per branch coordination — note: `AUDIT-STATUS.md` auto-generated Tier-4 log is stale and still shows IN PROGRESS). |
| **PREG_DATA** | ✅ 100% | other branch | Pregnancy/lactation data verbatim-reviewed (per branch coordination). |
| **NAPRA_ODB_DATA** | 🟡 IN PROGRESS | full-app-audit branch | Actively being verbatim-audited by the full-app-audit branch — do not duplicate. |
| **MINOR_AILMENTS** (19) | ✅ 100% | this branch | FV first pass complete; 6 fixes (5 ontario_ma_scope contradictions + 1 pregnancy-category attribution). |
| **DEPRESCRIBING_PROTOCOLS** (17) | ✅ 100% | this branch | FV first pass complete; 1 fix (spurious gabapentinoid boxed-warning claim). |

**Structurally validated, no prose FV pass required:** `FAMILY_MAP` (routing table — orphan resolution checked by the audit script), `SCORE_PATTERNS`, `EMPIRIC_THERAPY_CATEGORIES`, `NON_PHARM_AGENTS`, `EDIT_HISTORY`, `CHANGELOG`, and other helper/config objects.

**Net remaining FV work:** DRUGS full-verbatim re-verification in progress on this branch (~69 of 1546 cards verified; resume at index.html line ~134,680). NAPRA_ODB_DATA (full-app-audit branch, in progress). All other catalogs are FV-complete (first pass).

---

## FV first-pass audit log — branch `claude/continue-rx-guide-audit-7I3U1`

Agent-driven full-verbatim (line-by-line) **FIRST-PASS** clinical-content audit completed on this branch.

| Catalog | FV first pass | Notes |
|---|---|---|
| **DRUG_FAMILIES** (563) | ✅ 100% | Fix: Cushing Steroidogenesis Inhibitors family card — levoketoconazole HC-approval claim corrected (Recorlev is FDA-approved only; SAP access in Canada). |
| **AMR_DATA — Antimicrobials drug view** (204) | ✅ 100% | Fixes: fabricated cefazolin/cloxacillin "FIRST trial / CefBacT" citations replaced with the real CloCeBa RCT (8 locations across DRUGS + DRUG_FAMILIES + AMR_DATA); tedizolid course corrected 5→6 days. |
| **EMPIRIC_THERAPY_SYNDROMES — Antimicrobials syndrome view** (67) | ✅ 100% | Fix: Bacterial Prostatitis card — doxycycline-duration internal contradiction resolved (STI-related prostatitis 7→10–14 days). |
| **VACCINES** (56) | ✅ 100% | Fix: Tdap-in-pregnancy timing corrected to the NACI 27–32-week window (Adacel, Td, Adacel-Polio card pearls). |
| **SCORING_TOOLS** (19) | ✅ 100% | All 19 clinical calculators verified (component point values, score maxima, interpretation thresholds) — 0 errors found. |
| **MINOR_AILMENTS** (19) | ✅ 100% | 6 fixes — Allergic Rhinitis budesonide pregnancy-category attribution; Tick Bite / Conjunctivitis / Acne / Pinworms ontario_ma_scope contradictions; Herpes Zoster Shingrix funding age (65–70). |
| **DEPRESCRIBING_PROTOCOLS** (17) | ✅ 100% | 1 fix — gabapentinoid respiratory-depression warning mislabelled "BLACK BOX" (corrected to a Warnings/Precautions labelling change). |

### Fixes deployed this branch (FV first pass)

| Commit | Catalog(s) | Fix |
|---|---|---|
| `8240444` | DRUG_FAMILIES | Levoketoconazole HC-approval claim corrected (FDA-only; SAP in Canada). |
| `5f70bb6` | AMR_DATA, DRUG_FAMILIES, DRUGS | Fabricated "FIRST trial / CefBacT" cefazolin-vs-cloxacillin citations → CloCeBa RCT; tedizolid 5→6-day course. |
| `1096eac` | VACCINES | Tdap-in-pregnancy timing 21–32 → 27–32 weeks (NACI window). |
| `8746185` | EMPIRIC_THERAPY_SYNDROMES | Prostatitis doxycycline duration 7 → 10–14 days for STI prostatitis. |
| `2f5b510` | MINOR_AILMENTS | 6 fixes — budesonide pregnancy-category attribution + Tick Bite/Conjunctivitis/Acne/Pinworms ontario_ma_scope contradictions + Herpes Zoster Shingrix funding age. |
| `22c5764` | DEPRESCRIBING_PROTOCOLS | Gabapentinoid spurious boxed-warning claim corrected. |

---

## Maintenance

- Update this file directly after each FV audit cycle (it is not auto-generated).
- This file is authoritative for FV status; the auto-generated Tier-4 log in `AUDIT-STATUS.md` may lag.
- Commit this file alongside the FV fix it documents.
