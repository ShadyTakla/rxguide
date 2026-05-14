# AUDIT-STATUS.md — RxGuide Catalog Audit Coverage

> **Live status file** — auto-regenerated from `index.html` by `scripts/regenerate_audit_status.js`.
> Re-run after every audit cycle so future agents know exactly what's audited and what remains.

**Last regenerated:** 2026-05-14
**Catalog snapshot:** 2,900 clickable entries (latest commit: `0e15c7d on 2026-05-14`)

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
| **DRUGS** | 1,546 | 100.0% | 79.8% |
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
| `monitoring` depth ≥ 4 items | **96.5%** | `█████████████████░` | 1,492 | 54 |
| `interactions` depth ≥ 5 items | **79.8%** | `██████████████░░░░` | 1,234 | 312 |

### ❌ `monitoring` depth ≥ 4 items — 54 entries remaining (3.5% of total)

| Key/ID | Detail |
|---|---|
| `docusate` | {"count":3} |
| `fluticasone_nasal` | {"count":3} |
| `mometasone_nasal` | {"count":3} |
| `ipratropium_nasal` | {"count":3} |
| `saline_nasal` | {"count":2} |
| `ciprofloxacin_dexamethasone_otic` | {"count":2} |
| `framycetin_gramicidin_dexamethasone_otic` | {"count":3} |
| `ketoconazole_topical` | {"count":2} |
| `pyrethrin_piperonyl_butoxide` | {"count":2} |
| `mometasone_topical` | {"count":3} |
| `desonide` | {"count":2} |
| `hydrocortisone_valerate` | {"count":2} |
| `fusidic_acid_hydrocortisone` | {"count":2} |
| `betamethasone_calcipotriol` | {"count":3} |
| `clindamycin_topical` | {"count":2} |
| `nystatin_topical` | {"count":2} |
| `terbinafine_topical` | {"count":2} |
| `imiquimod` | {"count":3} |
| `ciclopirox` | {"count":2} |
| `palivizumab` | {"count":2} |
| `tetanus_immune_globulin` | {"count":2} |
| `nicotine_patch` | {"count":3} |
| `nicotine_gum` | {"count":3} |
| `nicotine_lozenge` | {"count":3} |
| `nicotine_inhaler` | {"count":2} |
| `cytisine` | {"count":3} |
| `olopatadine` | {"count":2} |
| `ketotifen` | {"count":2} |
| `phenazopyridine` | {"count":3} |
| `penciclovir` | {"count":2} |
| `icaridin` | {"count":2} |
| `pramoxine` | {"count":3} |
| `pyridoxine` | {"count":3} |
| `rupatadine` | {"count":3} |
| `capsaicin` | {"count":3} |
| `calamine` | {"count":2} |
| `polymyxin_b` | {"count":3} |
| `gramicidin` | {"count":2} |
| `retapamulin` | {"count":3} |
| `ethinyl_estradiol_norgestimate` | {"count":1} |
| `nuvaring` | {"count":1} |
| `evra_patch` | {"count":1} |
| `benzonatate` | {"count":3} |
| `butenafine` | {"count":3} |
| `rolapitant` | {"count":3} |
| `fluocinonide` | {"count":3} |
| `fluocinolone` | {"count":3} |
| `crotamiton` | {"count":3} |
| `vitamin_e` | {"count":3} |
| `niacinamide` | {"count":3} |
| `biotin` | {"count":3} |
| `daclatasvir` | {"count":3} |
| `boceprevir` | {"count":1} |
| `cromolyn` | {"count":3} |

### ❌ `interactions` depth ≥ 5 items — 312 entries remaining (20.2% of total)

| Key/ID | Detail |
|---|---|
| `febuxostat` | {"count":4} |
| `salbutamol` | {"count":4} |
| `cinacalcet` | {"count":4} |
| `cholecalciferol` | {"count":4} |
| `folic_acid` | {"count":4} |
| `pyrazinamide` | {"count":3} |
| `bedaquiline` | {"count":3} |
| `pretomanid` | {"count":3} |
| `delamanid` | {"count":2} |
| `cycloserine` | {"count":3} |
| `ethionamide` | {"count":3} |
| `clofazimine` | {"count":3} |
| `pyrantel` | {"count":2} |
| `pentamidine` | {"count":4} |
| `artemether_lumefantrine` | {"count":4} |
| `zanamivir` | {"count":2} |
| `remdesivir` | {"count":3} |
| `mebendazole` | {"count":4} |
| `ivermectin` | {"count":4} |
| `artificial_tears` | {"count":4} |
| `phenylephrine_rectal` | {"count":4} |
| `glycerin_suppository` | {"count":4} |
| `salicylic_acid_topical` | {"count":4} |
| `camphor_menthol` | {"count":4} |
| `sunscreen_otc` | {"count":4} |
| `bacitracin_polymyxin` | {"count":4} |
| `tizanidine` | {"count":4} |
| `ganciclovir` | {"count":4} |
| `lapatinib` | {"count":4} |
| `dimethyl_fumarate` | {"count":4} |
| `natalizumab` | {"count":4} |
| `aripiprazole_lai` | {"count":4} |
| `risperidone_lai` | {"count":4} |
| `zonisamide` | {"count":4} |
| `piperacillin_tazobactam` | {"count":4} |
| `misoprostol` | {"count":4} |
| `oxytocin` | {"count":4} |
| `methylergonovine` | {"count":4} |
| `terazosin` | {"count":4} |
| `rimegepant` | {"count":4} |
| `ubrogepant` | {"count":4} |
| `rifaximin` | {"count":4} |
| `phytonadione` | {"count":4} |
| `fluticasone_salmeterol` | {"count":4} |
| `budesonide_formoterol` | {"count":4} |
| `ipratropium_salbutamol` | {"count":4} |
| `tiotropium_olodaterol` | {"count":4} |
| `daridorexant` | {"count":4} |
| `andexanet_alfa` | {"count":2} |
| `levocetirizine` | {"count":4} |
| `lecanemab` | {"count":4} |
| `olodaterol` | {"count":4} |
| `moclobemide` | {"count":4} |
| `tranylcypromine` | {"count":4} |
| `sulfasalazine_ra` | {"count":4} |
| `dexamethasone_systemic` | {"count":4} |
| `tenofovir_emtricitabine` | {"count":4} |
| `timolol_eye` | {"count":4} |
| `prenatal_multivitamin` | {"count":4} |
| `methylphenidate_er` | {"count":4} |
| ... | 252 more entries |

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
| 2 | **312** | DRUGS — thin interactions (<5 entries): add major drug interactions including severity |
| 2 | **54** | DRUGS — thin monitoring (<4 items): expand to 4-7 specific parameters/frequencies |

---

## Audit-workflow contract

1. **AGENT MUST READ this file** before starting any audit task. The specific entries listed under each "❌ Remaining" section ARE the next audit work.
2. **AGENT MUST REGENERATE this file** after every audit/fix PR by running `node scripts/regenerate_audit_status.js` (or recreating the script if /tmp is gone — see the script source above for the canonical algorithm).
3. **AGENT MUST COMMIT** the regenerated AUDIT-STATUS.md alongside the fix in the same PR (so main is always self-describing).
4. Items absent from this file are confirmed passing. Do NOT audit items already at 100% unless the user explicitly asks.
5. Reference this file by name in PR descriptions ("see AUDIT-STATUS.md for full context on remaining gaps").

See AGENTS.md §AUDIT-STATUS and CLAUDE.md "Standing workflow" for the full canonical workflow.
