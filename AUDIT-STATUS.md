# AUDIT-STATUS.md — RxGuide Catalog Audit Coverage

> **Live status file** — auto-regenerated from `index.html` by `scripts/regenerate_audit_status.js`.
> Re-run after every audit cycle so future agents know exactly what's audited and what remains.

**Last regenerated:** 2026-05-14
**Catalog snapshot:** 2,900 clickable entries (latest commit: `f3f0258 on 2026-05-14`)

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
| **DRUGS** | 1,546 | 100.0% | 90.5% |
| **VACCINES** | 56 | 100.0% | 100.0% |
| **DRUG_FAMILIES** | 562 | 100.0% | 100.0% |
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
| `pearls` depth ≥ 5 items | **90.5%** | `████████████████░░` | 1,399 | 147 |
| `side_effects` depth ≥ 5 items | **97.8%** | `██████████████████` | 1,512 | 34 |

### ❌ `pearls` depth ≥ 5 items — 147 entries remaining (9.5% of total)

| Key/ID | Detail |
|---|---|
| `triamcinolone` | {"count":2} |
| `betamethasone` | {"count":3} |
| `vancomycin` | {"count":2} |
| `felodipine` | {"count":4} |
| `indapamide` | {"count":4} |
| `ezetimibe` | {"count":4} |
| `nortriptyline` | {"count":4} |
| `galantamine` | {"count":4} |
| `erythromycin` | {"count":4} |
| `minocycline` | {"count":4} |
| `sulfamethoxazole_trimethoprim` | {"count":4} |
| `fosfomycin` | {"count":4} |
| `linezolid` | {"count":4} |
| `daptomycin` | {"count":4} |
| `rifampin` | {"count":4} |
| `isoniazid` | {"count":4} |
| `ethambutol` | {"count":4} |
| `paromomycin` | {"count":4} |
| `ketoconazole` | {"count":4} |
| `miconazole` | {"count":4} |
| `griseofulvin` | {"count":4} |
| `oseltamivir` | {"count":4} |
| `tenofovir` | {"count":4} |
| `emtricitabine` | {"count":4} |
| `methyldopa` | {"count":4} |
| `hydralazine` | {"count":4} |
| `prasugrel` | {"count":4} |
| `fenofibrate` | {"count":4} |
| `dalteparin` | {"count":4} |
| `tinzaparin` | {"count":4} |
| `desvenlafaxine` | {"count":4} |
| `vortioxetine` | {"count":4} |
| `eszopiclone` | {"count":4} |
| `indomethacin` | {"count":4} |
| `ergotamine` | {"count":4} |
| `dihydroergotamine` | {"count":4} |
| `rabeprazole` | {"count":4} |
| `ranitidine` | {"count":4} |
| `sucralfate` | {"count":4} |
| `senna` | {"count":4} |
| `bisacodyl` | {"count":4} |
| `polyethylene_glycol` | {"count":4} |
| `lactulose` | {"count":4} |
| `doxylamine_pyridoxine` | {"count":4} |
| `prochlorperazine` | {"count":4} |
| `sulfasalazine` | {"count":4} |
| `dronabinol` | {"count":4} |
| `terbutaline` | {"count":4} |
| `desloratadine` | {"count":4} |
| `pseudoephedrine` | {"count":4} |
| `propylthiouracil` | {"count":4} |
| `prednisolone` | {"count":4} |
| `fludrocortisone` | {"count":4} |
| `desmopressin` | {"count":4} |
| `permethrin` | {"count":4} |
| `etanercept` | {"count":4} |
| `ferrous_gluconate` | {"count":4} |
| `calcium_citrate` | {"count":4} |
| `rho_immune_globulin` | {"count":4} |
| `omega_3` | {"count":4} |
| ... | 87 more entries |

### ❌ `side_effects` depth ≥ 5 items — 34 entries remaining (2.2% of total)

| Key/ID | Detail |
|---|---|
| `docusate` | {"count":4} |
| `saline_nasal` | {"count":3} |
| `ciprofloxacin_dexamethasone_otic` | {"count":4} |
| `pyrethrin_piperonyl_butoxide` | {"count":4} |
| `desonide` | {"count":3} |
| `hydrocortisone_valerate` | {"count":4} |
| `fusidic_acid_hydrocortisone` | {"count":4} |
| `nystatin_topical` | {"count":3} |
| `terbinafine_topical` | {"count":4} |
| `ciclopirox` | {"count":4} |
| `palivizumab` | {"count":4} |
| `tetanus_immune_globulin` | {"count":3} |
| `olopatadine` | {"count":3} |
| `ketotifen` | {"count":3} |
| `penciclovir` | {"count":2} |
| `icaridin` | {"count":3} |
| `pramoxine` | {"count":3} |
| `pyridoxine` | {"count":4} |
| `capsaicin` | {"count":4} |
| `calamine` | {"count":3} |
| `polymyxin_b` | {"count":4} |
| `gramicidin` | {"count":3} |
| `retapamulin` | {"count":3} |
| `ravulizumab` | {"count":2} |
| `dostarlimab` | {"count":2} |
| `estradiol_vaginal` | {"count":1} |
| `tafamidis` | {"count":3} |
| `etoposide` | {"count":2} |
| `dabrafenib` | {"count":2} |
| `trametinib` | {"count":2} |
| `doxercalciferol` | {"count":1} |
| `infigratinib` | {"count":2} |
| `futibatinib` | {"count":2} |
| `tislelizumab` | {"count":2} |

---

## VACCINES (56 entries)

| Audit dimension | Coverage | Bar | Audited (clean) | Remaining |
|---|---|---|---|---|
| Required schema fields | **100.0%** | `██████████████████` | 56 | 0 |
| Canadian-source (NACI / PHAC / CIG / Canada) | **100.0%** | `██████████████████` | 56 | 0 |

---

## DRUG_FAMILIES (562 entries)

| Audit dimension | Coverage | Bar | Audited (clean) | Remaining |
|---|---|---|---|---|
| Full required schema (moa_summary, class_effects, contraindications, members, pearls, source) | **100.0%** | `██████████████████` | 562 | 0 |
| Non-empty `members[]` | **100.0%** | `██████████████████` | 562 | 0 |
| Canadian source / canadian_notes | **100.0%** | `██████████████████` | 562 | 0 |

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

## Audit-workflow contract

1. **AGENT MUST READ this file** before starting any audit task. The specific entries listed under each "❌ Remaining" section ARE the next audit work.
2. **AGENT MUST REGENERATE this file** after every audit/fix PR by running `node scripts/regenerate_audit_status.js` (or recreating the script if /tmp is gone — see the script source above for the canonical algorithm).
3. **AGENT MUST COMMIT** the regenerated AUDIT-STATUS.md alongside the fix in the same PR (so main is always self-describing).
4. Items absent from this file are confirmed passing. Do NOT audit items already at 100% unless the user explicitly asks.
5. Reference this file by name in PR descriptions ("see AUDIT-STATUS.md for full context on remaining gaps").

See AGENTS.md §AUDIT-STATUS and CLAUDE.md "Standing workflow" for the full canonical workflow.
