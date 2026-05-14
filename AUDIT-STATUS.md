# AUDIT-STATUS.md — RxGuide Catalog Audit Coverage

> **Live status file** — auto-regenerated from `index.html` by `scripts/regenerate_audit_status.js`.
> Re-run after every audit cycle so future agents know exactly what's audited and what remains.

**Last regenerated:** 2026-05-14
**Catalog snapshot:** 2,871 clickable entries (latest commit: `b36f48c on 2026-05-13`)

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
| **DRUGS** | 1,545 | 100.0% | 100.0% |
| **VACCINES** | 56 | 100.0% | 100.0% |
| **DRUG_FAMILIES** | 561 | 97.5% | 19.1% |
| **REFERENCE_TABLES** | 100 | 100.0% | 85.0% |
| **DISEASES.conditions** | 573 | 99.7% | 93.9% |

---

## DRUGS (1,545 entries)

| Audit dimension | Coverage | Bar | Audited (clean) | Remaining |
|---|---|---|---|---|
| Full 16-field schema complete | **100.0%** | `██████████████████` | 1,545 | 0 |
| Non-empty `interactions[]` | **100.0%** | `██████████████████` | 1,545 | 0 |
| Canonical severity values | **100.0%** | `██████████████████` | 1,545 | 0 |
| Canadian-source recognition | **100.0%** | `██████████████████` | 1,545 | 0 |
| NAPRA_ODB_DATA entry | **100.0%** | `██████████████████` | 1,545 | 0 |
| PREG_DATA entry | **100.0%** | `██████████████████` | 1,545 | 0 |
| FAMILY_MAP entry | **100.0%** | `██████████████████` | 1,545 | 0 |
| FAMILY_MAP → resolves to DRUG_FAMILIES card | **100.0%** | `██████████████████` | 1,545 | 0 |
| `monitoring` field populated | **100.0%** | `██████████████████` | 1,545 | 0 |

---

## VACCINES (56 entries)

| Audit dimension | Coverage | Bar | Audited (clean) | Remaining |
|---|---|---|---|---|
| Required schema fields | **100.0%** | `██████████████████` | 56 | 0 |
| Canadian-source (NACI / PHAC / CIG / Canada) | **100.0%** | `██████████████████` | 56 | 0 |

---

## DRUG_FAMILIES (561 entries)

| Audit dimension | Coverage | Bar | Audited (clean) | Remaining |
|---|---|---|---|---|
| Full required schema (moa_summary, class_effects, contraindications, members, pearls, source) | **19.1%** | `███░░░░░░░░░░░░░░░` | 107 | 454 |
| Non-empty `members[]` | **29.1%** | `█████░░░░░░░░░░░░░` | 163 | 398 |
| Canadian source / canadian_notes | **97.5%** | `██████████████████` | 547 | 14 |

### ❌ Full required schema (moa_summary, class_effects, contraindications, members, pearls, source) — 454 entries remaining (80.9% of total)

| Key/ID | Detail |
|---|---|
| `Cephalosporins` | {"missing":["members","pearls"],"empty":["members","pearls"]} |
| `Antidiarrheals` | {"missing":["members","pearls"],"empty":["members","pearls"]} |
| `ACE Inhibitors` | {"missing":["name","members","pearls"],"empty":["name","members","pearls"]} |
| `ARBs` | {"missing":["name","members","pearls"],"empty":["name","members","pearls"]} |
| `DHP Calcium Channel Blockers` | {"missing":["name","members","pearls"],"empty":["name","members","pearls"]} |
| `Non-DHP Calcium Channel Blockers` | {"missing":["name","members","pearls"],"empty":["name","members","pearls"]} |
| `Thiazide & Thiazide-Like Diuretics` | {"missing":["name","members","pearls"],"empty":["name","members","pearls"]} |
| `Beta-Blockers` | {"missing":["name","members","pearls"],"empty":["name","members","pearls"]} |
| `MRAs (Mineralocorticoid Receptor Antagonists)` | {"missing":["name","members","pearls"],"empty":["name","members","pearls"]} |
| `Loop Diuretics` | {"missing":["name","members","pearls"],"empty":["name","members","pearls"]} |
| `SGLT2 Inhibitors` | {"missing":["name","members","pearls"],"empty":["name","members","pearls"]} |
| `GLP-1 Receptor Agonists` | {"missing":["name","members","pearls"],"empty":["name","members","pearls"]} |
| `DPP-4 Inhibitors` | {"missing":["name","members","pearls"],"empty":["name","members","pearls"]} |
| `Sulfonylureas` | {"missing":["name","members","pearls"],"empty":["name","members","pearls"]} |
| `Bisphosphonates` | {"missing":["name","members","pearls"],"empty":["name","members","pearls"]} |
| `Anticoagulants (DOACs)` | {"missing":["name","members","pearls"],"empty":["name","members","pearls"]} |
| `Statins` | {"missing":["name","members","pearls"],"empty":["name","members","pearls"]} |
| `Antiplatelet Agents` | {"missing":["name","members","pearls"],"empty":["name","members","pearls"]} |
| `NSAIDs` | {"missing":["name","members","pearls"],"empty":["name","members","pearls"]} |
| `Corticosteroids` | {"missing":["members","pearls"],"empty":["members","pearls"]} |
| `Xanthine Oxidase Inhibitors` | {"missing":["name","members","pearls"],"empty":["name","members","pearls"]} |
| `Lipase Inhibitors` | {"missing":["name","members","pearls"],"empty":["name","members","pearls"]} |
| `Colchicine` | {"missing":["name","members","pearls"],"empty":["name","members","pearls"]} |
| `Anti-Androgens` | {"missing":["name","members","pearls"],"empty":["name","members","pearls"]} |
| `SSRIs` | {"missing":["name","members","pearls"],"empty":["name","members","pearls"]} |
| `SNRIs` | {"missing":["name","members","pearls"],"empty":["name","members","pearls"]} |
| `TCAs` | {"missing":["name","members","pearls"],"empty":["name","members","pearls"]} |
| `Atypical Antidepressants` | {"missing":["name","members","pearls"],"empty":["name","members","pearls"]} |
| `Augmentation Strategies` | {"missing":["name","members","pearls"],"empty":["name","members","pearls"]} |
| `Benzodiazepines` | {"missing":["name","members","pearls"],"empty":["name","members","pearls"]} |
| `Buspirone` | {"missing":["name","members","pearls"],"empty":["name","members","pearls"]} |
| `Pregabalin/Gabapentin` | {"missing":["name","members","pearls"],"empty":["name","members","pearls"]} |
| `Mood Stabilizers` | {"missing":["name","members","pearls"],"empty":["name","members","pearls"]} |
| `Atypical Antipsychotics` | {"missing":["name","members","pearls"],"empty":["name","members","pearls"]} |
| `Anticonvulsant Mood Stabilizers` | {"missing":["name","members","pearls"],"empty":["name","members","pearls"]} |
| `Typical Antipsychotics` | {"missing":["name","members","pearls"],"empty":["name","members","pearls"]} |
| `CNS Stimulants — Methylphenidate` | {"missing":["name","members","pearls"],"empty":["name","members","pearls"]} |
| `CNS Stimulants — Amphetamines` | {"missing":["name","members","pearls"],"empty":["name","members","pearls"]} |
| `Non-Stimulant ADHD` | {"missing":["name","members","pearls"],"empty":["name","members","pearls"]} |
| `Z-Drugs (Non-Benzodiazepine Hypnotics)` | {"missing":["name","members","pearls"],"empty":["name","members","pearls"]} |
| `Melatonin & Melatonin Agonists` | {"missing":["name","members","pearls"],"empty":["name","members","pearls"]} |
| `Orexin Receptor Antagonists` | {"missing":["name","members","pearls"],"empty":["name","members","pearls"]} |
| `Cholinesterase Inhibitors` | {"missing":["name","members","pearls"],"empty":["name","members","pearls"]} |
| `NMDA Receptor Antagonists` | {"missing":["name","members","pearls"],"empty":["name","members","pearls"]} |
| `Opioid Agonist Therapy` | {"missing":["name","members","pearls"],"empty":["name","members","pearls"]} |
| `Withdrawal Management` | {"missing":["name","members","pearls"],"empty":["name","members","pearls"]} |
| `Alpha-1 Blockers` | {"missing":["name","members","pearls"],"empty":["name","members","pearls"]} |
| `Triptans` | {"missing":["name","members","pearls"],"empty":["name","members","pearls"]} |
| `CGRP Antagonists` | {"missing":["name","members","pearls"],"empty":["name","members","pearls"]} |
| `Broad-Spectrum Antiseizure Medications` | {"missing":["name","members","pearls"],"empty":["name","members","pearls"]} |
| `Long-Acting Muscarinic Antagonists` | {"missing":["name","members","pearls"],"empty":["name","members","pearls"]} |
| `Short-Acting Muscarinic Antagonists (SAMAs)` | {"missing":["members","pearls"],"empty":["members","pearls"]} |
| `Long-Acting Beta-2 Agonists` | {"missing":["name","members","pearls"],"empty":["name","members","pearls"]} |
| `Inhaled Corticosteroids` | {"missing":["name","members","pearls"],"empty":["name","members","pearls"]} |
| `LAMA/LABA Fixed-Dose Combinations` | {"missing":["name","members","pearls"],"empty":["name","members","pearls"]} |
| `Leukotriene Receptor Antagonists` | {"missing":["name","members","pearls"],"empty":["name","members","pearls"]} |
| `Conventional Synthetic DMARDs` | {"missing":["name","members","pearls"],"empty":["name","members","pearls"]} |
| `Anti-TNF Biologics` | {"missing":["name","members","pearls"],"empty":["name","members","pearls"]} |
| `Proton Pump Inhibitors` | {"missing":["name","members","pearls"],"empty":["name","members","pearls"]} |
| `H. pylori Eradication` | {"missing":["name","members","pearls"],"empty":["name","members","pearls"]} |
| ... | 394 more entries |

### ❌ Non-empty `members[]` — 398 entries remaining (70.9% of total)

```
Cephalosporins
Antidiarrheals
ACE Inhibitors
ARBs
DHP Calcium Channel Blockers
Non-DHP Calcium Channel Blockers
Thiazide & Thiazide-Like Diuretics
Beta-Blockers
MRAs (Mineralocorticoid Receptor Antagonists)
Loop Diuretics
SGLT2 Inhibitors
GLP-1 Receptor Agonists
DPP-4 Inhibitors
Sulfonylureas
Bisphosphonates
Anticoagulants (DOACs)
Statins
Antiplatelet Agents
NSAIDs
Corticosteroids
Xanthine Oxidase Inhibitors
Lipase Inhibitors
Colchicine
Anti-Androgens
SSRIs
SNRIs
TCAs
Atypical Antidepressants
Augmentation Strategies
Benzodiazepines
Buspirone
Pregabalin/Gabapentin
Mood Stabilizers
Atypical Antipsychotics
Anticonvulsant Mood Stabilizers
Typical Antipsychotics
CNS Stimulants — Methylphenidate
CNS Stimulants — Amphetamines
Non-Stimulant ADHD
Z-Drugs (Non-Benzodiazepine Hypnotics)
Melatonin & Melatonin Agonists
Orexin Receptor Antagonists
Cholinesterase Inhibitors
NMDA Receptor Antagonists
Opioid Agonist Therapy
Withdrawal Management
Alpha-1 Blockers
Triptans
CGRP Antagonists
Broad-Spectrum Antiseizure Medications
Long-Acting Muscarinic Antagonists
Short-Acting Muscarinic Antagonists (SAMAs)
Long-Acting Beta-2 Agonists
Inhaled Corticosteroids
LAMA/LABA Fixed-Dose Combinations
Leukotriene Receptor Antagonists
Conventional Synthetic DMARDs
Anti-TNF Biologics
Proton Pump Inhibitors
H. pylori Eradication
... and 338 more
```

### ❌ Canadian source / canadian_notes — 14 entries remaining (2.5% of total)

```
CSF1R Inhibitors
Mitochondrial Cardiolipin Stabilizers
Type II RAF Inhibitors
Next-Generation ROS1 / NTRK Inhibitors
5-HT4 Receptor Agonists
NHE3 Inhibitors
Anti-IL-31 Monoclonal Antibodies
Anti-OX40 Monoclonal Antibodies
CETP Inhibitors
Adenosine A2A Receptor Antagonists
Triterpenoid Antifungals
Cushing Steroidogenesis Inhibitors — Cortisol Synthesis
Sodium Channel Blocker Antiarrhythmics — Nasal
WHIM Syndrome CXCR4 Antagonists
```

---

## REFERENCE_TABLES (100 entries)

| Audit dimension | Coverage | Bar | Audited (clean) | Remaining |
|---|---|---|---|---|
| All 10 schema fields complete | **98.0%** | `██████████████████` | 98 | 2 |
| Canadian source in citation | **98.0%** | `██████████████████` | 98 | 2 |
| Wired into `buildReference()` dispatch (not orphan) | **93.0%** | `█████████████████░` | 93 | 7 |
| `related_drugs` all resolve to DRUGS/VACCINES | **85.0%** | `███████████████░░░` | 85 | 15 |
| Row widths match column count | **100.0%** | `██████████████████` | 100 | 0 |

### ❌ All 10 schema fields complete — 2 entries remaining (2.0% of total)

| Key/ID | Detail |
|---|---|
| `ped_vital_signs` | {"missing":[],"empty":["related_drugs"]} |
| `medscheck_workflow` | {"missing":[],"empty":["related_drugs"]} |

### ❌ Canadian source in citation — 2 entries remaining (2.0% of total)

```
di_delirium
pgx_ugt1a1
```

### ❌ Wired into `buildReference()` dispatch (not orphan) — 7 entries remaining (7.0% of total)

```
ics_potency
topical_steroid_potency
ped_weight_dosing
ped_antibiotic_suspensions
ped_antipyretics
ped_vital_signs
ped_sick_day_rules
```

### ❌ `related_drugs` all resolve to DRUGS/VACCINES — 15 entries remaining (15.0% of total)

| Key/ID | Detail |
|---|---|
| `steroid_equiv` | {"unresolved":["cortisone"]} |
| `di_hyperkalemia` | {"unresolved":["succinylcholine"]} |
| `di_pancreatitis` | {"unresolved":["propofol"]} |
| `di_falls` | {"unresolved":["dicyclomine"]} |
| `di_delirium` | {"unresolved":["dicyclomine"]} |
| `drug_food_dairy_cations` | {"unresolved":["erlotinib","gefitinib"]} |
| `drug_food_warfarin_vit_k` | {"unresolved":["vitamin_k"]} |
| `drug_food_alcohol` | {"unresolved":["cefotetan"]} |
| `beers_criteria_2023` | {"unresolved":["estradiol_oral"]} |
| `stopp_start_v3` | {"unresolved":["zoledronate"]} |
| `lasa_pairs` | {"unresolved":["ephedrine","sulfadiazine"]} |
| `tox_anticholinergic_toxidrome` | {"unresolved":["scopolamine","dicyclomine","hyoscine_butylbromide","atropine"]} |
| `tox_sympathomimetic_toxidrome` | {"unresolved":["propofol"]} |
| `tox_salicylate_overdose` | {"unresolved":["activated_charcoal","glucose"]} |
| `tox_tca_overdose` | {"unresolved":["activated_charcoal"]} |

---

## DISEASES.conditions (573 entries)

| Audit dimension | Coverage | Bar | Audited (clean) | Remaining |
|---|---|---|---|---|
| Required schema (signs/diagnosis/treatment/pearls non-empty) | **99.7%** | `██████████████████` | 571 | 2 |
| Cites Canadian source | **93.9%** | `█████████████████░` | 538 | 35 |
| All `treatment.agents` resolve (DRUGS/VACCINES/NON_PHARM_AGENTS) | **99.1%** | `██████████████████` | 568 | 5 |
| §21.13 multi-family compliance | **99.0%** | `██████████████████` | 567 | 6 |

### ❌ Required schema (signs/diagnosis/treatment/pearls non-empty) — 2 entries remaining (0.3% of total)

| Key/ID | Detail |
|---|---|
| `hemorrhoids` | [gastroenterology] {"missing":["signs"],"empty":["signs"]} |
| `acne_vulgaris` | [dermatology] {"missing":["signs"],"empty":["signs"]} |

### ❌ Cites Canadian source — 35 entries remaining (6.1% of total)

| Key/ID | Detail |
|---|---|
| `brugada_syndrome` | [cardiology] {} |
| `insulinoma` | [endocrinology] {} |
| `zollinger_ellison_syndrome` | [endocrinology] {} |
| `functional_neurological_disorder` | [psychiatry] {} |
| `malignant_hyperthermia` | [psychiatry] {} |
| `rhabdomyolysis` | [psychiatry] {} |
| `spontaneous_pneumothorax` | [respirology] {} |
| `microscopic_colitis` | [gastroenterology] {} |
| `boerhaave_syndrome` | [gastroenterology] {} |
| `acute_liver_failure` | [gastroenterology] {} |
| `iga_nephropathy` | [nephrology] {} |
| `membranous_nephropathy` | [nephrology] {} |
| `anti_gbm_disease` | [nephrology] {} |
| `anca_vasculitis` | [rheumatology] {} |
| `mast_cell_activation_syndrome` | [rheumatology] {} |
| `granulomatosis_polyangiitis` | [rheumatology] {} |
| `dermatomyositis_polymyositis` | [rheumatology] {} |
| `iga_vasculitis` | [rheumatology] {} |
| `frozen_shoulder` | [rheumatology] {} |
| `lateral_epicondylitis` | [rheumatology] {} |
| `rotator_cuff_disease` | [rheumatology] {} |
| `hereditary_hemorrhagic_telangiectasia` | [hematology] {} |
| `paroxysmal_nocturnal_hemoglobinuria` | [hematology] {} |
| `aplastic_anemia` | [hematology] {} |
| `hereditary_spherocytosis` | [hematology] {} |
| `cryptococcal_meningitis` | [infectious] {} |
| `invasive_candidiasis` | [infectious] {} |
| `stevens_johnson_syndrome_ten` | [dermatology] {} |
| `dress_syndrome` | [dermatology] {} |
| `erythema_multiforme` | [dermatology] {} |
| `pyoderma_gangrenosum` | [dermatology] {} |
| `sweet_syndrome` | [dermatology] {} |
| `corneal_abrasion` | [ophthalmology] {} |
| `laryngopharyngeal_reflux` | [ent] {} |
| `schistosomiasis` | [travel] {} |

### ❌ All `treatment.agents` resolve (DRUGS/VACCINES/NON_PHARM_AGENTS) — 5 entries remaining (0.9% of total)

| Key/ID | Detail |
|---|---|
| `pericarditis` | [cardiology] {"agents":["pericardiocentesis"]} |
| `graves_disease` | [endocrinology] {"agents":["teprotumumab"]} |
| `toxoplasmosis` | [infectious] {"agents":["sulfadiazine"]} |
| `osteomyelitis` | [infectious] {"agents":["trimethoprim_sulfamethoxazole"]} |
| `folliculitis` | [dermatology] {"agents":["trimethoprim_sulfamethoxazole"]} |

### ❌ §21.13 multi-family compliance — 6 entries remaining (1.0% of total)

| Key/ID | Detail |
|---|---|
| `carotid_artery_disease` | [cardiology] {"rows":[{"line":"Smoking cessation","missing":["Nicotinic Receptor Partial Agonists","Aminoketones"]}]} |
| `pcos` | [endocrinology] {"rows":[{"line":"First-Line","missing":[]}]} |
| `thyroid_eye_disease` | [endocrinology] {"rows":[{"line":"Foundation — smoking cessation (NON-NEGOTIABLE)","missing":["Nicotinic Receptor Partial Agonists","Aminoketones"]}]} |
| `severe_hypertriglyceridemia` | [endocrinology] {"rows":[{"line":"Acute hypertriglyceridemic pancreatitis","missing":["Unfractionated Heparin"]}]} |
| `hypercalcemia_of_malignancy` | [endocrinology] {"rows":[{"line":"Glucocorticoid — calcitriol-mediated (lymphoma)","missing":["Systemic Corticosteroids","Topical Corticosteroids"]}]} |
| `menopause` | [womens_health] {"rows":[{"line":"First-Line (moderate–severe VMS)","missing":["Estrogens"]},{"line":"First-Line (uterus intact — combined MHT)","missing":[]},{"line":"First-Line (GSM — vaginal symptoms)","missing":["Estrogens"]}]} |

---

## Additional content assets (not %-based)

| Asset | Count |
|---|---|
| DEPRESCRIBING_PROTOCOLS | **17** |
| MINOR_AILMENTS | **19** |
| NON_PHARM_AGENTS dictionary | **93** |
| EDIT_HISTORY entities tracked | **1,649** |
| CHANGELOG PRs catalogued | **122** |
| DISEASES categories | **20** |

---

## Suggested next audit priorities

Ordered by impact (size of gap × clinical importance):

| Priority | Gap (entries) | Audit area |
|---|---|---|
| 1 | **454** | DRUG_FAMILIES — full schema authoring (moa_summary, class_effects, members[], pearls, source) |
| 1 | **398** | DRUG_FAMILIES — populate `members[]` for skeletal family cards |
| 2 | **15** | REFERENCE_TABLES — fix `related_drugs` keys that don't resolve |
| 2 | **7** | REFERENCE_TABLES — wire orphan tables into `buildReference()` dispatch arrays |
| 3 | **35** | DISEASES.conditions — add Canadian source/guideline citation |
| 3 | **5** | DISEASES.conditions — fix unresolved `treatment.agents` (add to NON_PHARM_AGENTS or DRUGS, or correct typo) |
| 3 | **2** | DISEASES.conditions — populate missing/empty required fields |
| 4 | **6** | DISEASES.conditions — apply §21.13 multi-family fix |

---

## Audit-workflow contract

1. **AGENT MUST READ this file** before starting any audit task. The specific entries listed under each "❌ Remaining" section ARE the next audit work.
2. **AGENT MUST REGENERATE this file** after every audit/fix PR by running `node scripts/regenerate_audit_status.js` (or recreating the script if /tmp is gone — see the script source above for the canonical algorithm).
3. **AGENT MUST COMMIT** the regenerated AUDIT-STATUS.md alongside the fix in the same PR (so main is always self-describing).
4. Items absent from this file are confirmed passing. Do NOT audit items already at 100% unless the user explicitly asks.
5. Reference this file by name in PR descriptions ("see AUDIT-STATUS.md for full context on remaining gaps").

See AGENTS.md §AUDIT-STATUS and CLAUDE.md "Standing workflow" for the full canonical workflow.
