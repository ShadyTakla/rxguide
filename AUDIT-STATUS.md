# AUDIT-STATUS.md — RxGuide Catalog Audit Coverage

> **Live status file** — auto-regenerated from `index.html` by `scripts/regenerate_audit_status.js`.
> Re-run after every audit cycle so future agents know exactly what's audited and what remains.

**Last regenerated:** 2026-05-15
**Catalog snapshot:** 2,901 clickable entries (latest commit: `9a882ab on 2026-05-15`)

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
| **DRUGS** | 1,546 | 100.0% | 77.9% |
| **VACCINES** | 56 | 100.0% | 100.0% |
| **DRUG_FAMILIES** | 563 | 100.0% | 100.0% |
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
| `monitoring` depth ≥ 4 items | **87.1%** | `████████████████░░` | 1,347 | 199 |
| `interactions` depth ≥ 5 items | **100.0%** | `██████████████████` | 1,546 | 0 |
| `pearls` depth ≥ 5 items | **100.0%** | `██████████████████` | 1,546 | 0 |
| `side_effects` depth ≥ 5 items | **77.9%** | `██████████████░░░░` | 1,205 | 341 |

### ❌ `monitoring` depth ≥ 4 items — 199 entries remaining (12.9% of total)

| Key/ID | Detail |
|---|---|
| `diclofenac_topical` | {"count":3} |
| `fusidic_acid` | {"count":3} |
| `paromomycin` | {"count":3} |
| `pentamidine` | {"count":3} |
| `sucralfate` | {"count":3} |
| `loratadine` | {"count":3} |
| `guaifenesin` | {"count":3} |
| `timolol_ophthalmic` | {"count":3} |
| `ginger_supplement` | {"count":3} |
| `zinc_oxide_topical` | {"count":3} |
| `artificial_tears` | {"count":3} |
| `phenylephrine_rectal` | {"count":3} |
| `menthol_lozenge` | {"count":3} |
| `witch_hazel` | {"count":3} |
| `aluminum_hydroxide` | {"count":3} |
| `vitamin_d` | {"count":2} |
| `bacitracin_polymyxin` | {"count":3} |
| `sunscreen` | {"count":1} |
| `docosanol` | {"count":3} |
| `methylergonovine` | {"count":3} |
| `selexipag` | {"count":3} |
| `mefenamic_acid` | {"count":3} |
| `levocetirizine` | {"count":3} |
| `nirsevimab` | {"count":3} |
| `cefotaxime` | {"count":3} |
| `fluphenazine` | {"count":3} |
| `granisetron` | {"count":3} |
| `ginger` | {"count":3} |
| `benzocaine` | {"count":3} |
| `zinc_oxide` | {"count":1} |
| `vitamin_c` | {"count":3} |
| `salicylic_acid` | {"count":1} |
| `lidocaine` | {"count":3} |
| `polymyxin_b_trimethoprim_ophth` | {"count":3} |
| `polymyxin_b_gramicidin_ophth` | {"count":3} |
| `fusidic_acid_ophth` | {"count":3} |
| `prednisolone_ophth` | {"count":3} |
| `olopatadine_ophth` | {"count":3} |
| `timolol_ophth` | {"count":1} |
| `diltiazem_topical` | {"count":3} |
| `pilocarpine` | {"count":3} |
| `brentuximab_vedotin` | {"count":3} |
| `alfacalcidol` | {"count":3} |
| `polatuzumab_vedotin` | {"count":3} |
| `loncastuximab_tesirine` | {"count":3} |
| `doxercalciferol` | {"count":3} |
| `ecallantide` | {"count":3} |
| `hyaluronic_acid_intravesical` | {"count":3} |
| `chondroitin_sulfate_intravesical` | {"count":3} |
| `marstacimab` | {"count":3} |
| `concizumab` | {"count":3} |
| `midodrine` | {"count":3} |
| `dydrogesterone` | {"count":3} |
| `tibolone` | {"count":2} |
| `progesterone_micronized` | {"count":2} |
| `testosterone_topical` | {"count":3} |
| `arformoterol` | {"count":1} |
| `levalbuterol` | {"count":2} |
| `revefenacin` | {"count":1} |
| `riociguat` | {"count":3} |
| ... | 139 more entries |

### ❌ `side_effects` depth ≥ 5 items — 341 entries remaining (22.1% of total)

| Key/ID | Detail |
|---|---|
| `metformin` | {"count":4} |
| `edoxaban` | {"count":4} |
| `nirmatrelvir_ritonavir` | {"count":4} |
| `hydrocortisone` | {"count":4} |
| `clotrimazole` | {"count":4} |
| `fosfomycin` | {"count":4} |
| `ethambutol` | {"count":4} |
| `paromomycin` | {"count":4} |
| `malathion` | {"count":4} |
| `spinosad` | {"count":3} |
| `miconazole` | {"count":3} |
| `tinzaparin` | {"count":4} |
| `guaifenesin` | {"count":4} |
| `permethrin` | {"count":4} |
| `ferrous_gluconate` | {"count":4} |
| `vitamin_b6` | {"count":3} |
| `probiotics` | {"count":3} |
| `simethicone` | {"count":2} |
| `bilastine` | {"count":3} |
| `ferrous_bisglycinate` | {"count":4} |
| `vitamin_c_supp` | {"count":4} |
| `saline_nasal_spray` | {"count":4} |
| `zinc_oxide_topical` | {"count":2} |
| `artificial_tears` | {"count":3} |
| `phenylephrine_rectal` | {"count":4} |
| `glycerin_suppository` | {"count":3} |
| `benzocaine_topical` | {"count":4} |
| `menthol_lozenge` | {"count":4} |
| `witch_hazel` | {"count":3} |
| `deet` | {"count":4} |
| `vitamin_d` | {"count":3} |
| `bacitracin_polymyxin` | {"count":4} |
| `sodium_cromoglycate` | {"count":3} |
| `docosanol` | {"count":4} |
| `fremanezumab` | {"count":4} |
| `andexanet_alfa` | {"count":4} |
| `ciprofloxacin_ophth` | {"count":4} |
| `gatifloxacin_ophth` | {"count":3} |
| `tobramycin_ophth` | {"count":4} |
| `erythromycin_ophth` | {"count":3} |
| `polymyxin_b_trimethoprim_ophth` | {"count":3} |
| `polymyxin_b_gramicidin_ophth` | {"count":3} |
| `fusidic_acid_ophth` | {"count":4} |
| `brentuximab_vedotin` | {"count":3} |
| `polatuzumab_vedotin` | {"count":3} |
| `loncastuximab_tesirine` | {"count":2} |
| `prasterone` | {"count":4} |
| `lactase` | {"count":4} |
| `obeticholic_acid` | {"count":3} |
| `leucovorin` | {"count":4} |
| `biotin` | {"count":4} |
| `ublituximab` | {"count":3} |
| `resmetirom` | {"count":1} |
| `lumateperone` | {"count":3} |
| `pimavanserin` | {"count":2} |
| `iloperidone` | {"count":2} |
| `amphetamine_salts` | {"count":2} |
| `viloxazine` | {"count":2} |
| `clonidine_er` | {"count":2} |
| `guanfacine_er` | {"count":3} |
| ... | 281 more entries |

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

## DRUG_FAMILIES (563 entries)

| Audit dimension | Coverage | Bar | Audited (clean) | Remaining |
|---|---|---|---|---|
| Full required schema (moa_summary, class_effects, contraindications, members, pearls, source) | **100.0%** | `██████████████████` | 563 | 0 |
| Non-empty `members[]` | **100.0%** | `██████████████████` | 563 | 0 |
| Canadian source / canadian_notes | **100.0%** | `██████████████████` | 563 | 0 |
| `class_effects` depth ≥ 3 items | **100.0%** | `██████████████████` | 563 | 0 |
| `class_contraindications` depth ≥ 2 items | **100.0%** | `██████████████████` | 563 | 0 |
| `comparison[].key` resolves to DRUGS/VACCINES (rendered table) | **100.0%** | `██████████████████` | 563 | 0 |

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

| Priority | Gap (entries) | Audit area |
|---|---|---|
| 2 | **199** | DRUGS — thin monitoring (<4 items): expand to 4-7 specific parameters/frequencies |

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

### Tier 4 verbatim-review progress log

Records which catalogs have had an agent-driven verbatim (line-by-line) clinical-content review beyond the automated structural audit.

| Catalog | Tier 4 verbatim review | Notes |
|---|---|---|
| **REFERENCE_TABLES** (100) | ✅ COMPLETE | All 100 tables reviewed line-by-line. 1 safety-critical fix (ped azithromycin suspension example was 2× over — `ped_antibiotic_suspensions`). Doses, equivalence ratios, CrCl/Child-Pugh thresholds, CPIC content, trial citations all verified against current Canadian + international guidelines. |
| **DISEASES.conditions** (600) | 🟡 IN PROGRESS | Disease audit batches 1–29 + palliative (9) + travel medicine + empty-Drug-row sweep complete. Several SAFETY-CRITICAL fixes (rabies vaccine pregnancy mis-categorization, mefloquine pregnancy, wrong-vaccine agents). Remaining categories not yet fully verbatim-reviewed. |
| **DRUG_FAMILIES** (563) | 🟡 IN PROGRESS | Tier 4 batches 1–2 complete (GLP-1 / Taxane / TTR Silencer + 6 content-completeness fixes). Verbatim line-by-line review of remaining families ongoing. |
| **DRUGS** (1546) | 🟡 PARTIAL | AUDIT-CONTENT.md sampled 15 high-volume drug cards. Full verbatim review pending. |
| **VACCINES** (56) | 🟡 PARTIAL | imvamune contraindications + interaction severity corrected. Full verbatim review pending. |

---

## Audit-workflow contract

1. **AGENT MUST READ this file** before starting any audit task. The specific entries listed under each "❌ Remaining" section ARE the next audit work.
2. **AGENT MUST REGENERATE this file** after every audit/fix PR by running `node scripts/regenerate_audit_status.js` (or recreating the script if /tmp is gone — see the script source above for the canonical algorithm).
3. **AGENT MUST COMMIT** the regenerated AUDIT-STATUS.md alongside the fix in the same PR (so main is always self-describing).
4. Items absent from this file are confirmed passing. Do NOT audit items already at 100% unless the user explicitly asks.
5. Reference this file by name in PR descriptions ("see AUDIT-STATUS.md for full context on remaining gaps").

See AGENTS.md §AUDIT-STATUS and CLAUDE.md "Standing workflow" for the full canonical workflow.
