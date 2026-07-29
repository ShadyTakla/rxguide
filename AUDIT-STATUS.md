# AUDIT-STATUS.md — RxGuide Catalog Audit Coverage

> **Live status file** — auto-regenerated from `index.html` by `scripts/regenerate_audit_status.js`.
> Re-run after every audit cycle so future agents know exactly what's audited and what remains.

**Last regenerated:** 2026-07-29
**Catalog snapshot:** 2,480 clickable entries (latest commit: `c51b9ec on 2026-05-29`)

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
| **DRUGS** | 1,113 | 100.0% | 100.0% |
| **VACCINES** | 56 | 100.0% | 100.0% |
| **DRUG_FAMILIES** | 542 | 100.0% | 100.0% |
| **REFERENCE_TABLES** | 117 | 100.0% | 47.9% |
| **DISEASES.conditions** | 604 | 100.0% | 93.0% |

---

## DRUGS (1,113 entries)

| Audit dimension | Coverage | Bar | Audited (clean) | Remaining |
|---|---|---|---|---|
| Full 16-field schema complete | **100.0%** | `██████████████████` | 1,113 | 0 |
| Non-empty `interactions[]` | **100.0%** | `██████████████████` | 1,113 | 0 |
| Canonical severity values | **100.0%** | `██████████████████` | 1,113 | 0 |
| Canadian-source recognition | **100.0%** | `██████████████████` | 1,113 | 0 |
| NAPRA_ODB_DATA entry | **100.0%** | `██████████████████` | 1,113 | 0 |
| PREG_DATA entry | **100.0%** | `██████████████████` | 1,113 | 0 |
| FAMILY_MAP entry | **100.0%** | `██████████████████` | 1,113 | 0 |
| FAMILY_MAP → resolves to DRUG_FAMILIES card | **100.0%** | `██████████████████` | 1,113 | 0 |
| `monitoring` field populated | **100.0%** | `██████████████████` | 1,113 | 0 |
| `monitoring` depth ≥ 4 items | **100.0%** | `██████████████████` | 1,113 | 0 |
| `interactions` depth ≥ 5 items | **100.0%** | `██████████████████` | 1,113 | 0 |
| `pearls` depth ≥ 5 items | **100.0%** | `██████████████████` | 1,113 | 0 |
| `side_effects` depth ≥ 5 items | **100.0%** | `██████████████████` | 1,113 | 0 |

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
| `related_drugs` all resolve to DRUGS/VACCINES | **47.9%** | `█████████░░░░░░░░░` | 56 | 61 |
| Row widths match column count | **100.0%** | `██████████████████` | 117 | 0 |

### ❌ `related_drugs` all resolve to DRUGS/VACCINES — 61 entries remaining (52.1% of total)

| Key/ID | Detail |
|---|---|
| `topical_steroid_potency` | {"unresolved":["desoximetasone","fluocinolone","fluocinonide","halobetasol"]} |
| `di_qt` | {"unresolved":["dofetilide"]} |
| `di_hyponatremia` | {"unresolved":["vinblastine"]} |
| `di_hepatotoxicity` | {"unresolved":["tolcapone","felbamate","nevirapine","niacin"]} |
| `di_photosensitivity` | {"unresolved":["tetracycline","quinine"]} |
| `di_pancreatitis` | {"unresolved":["tetracycline"]} |
| `di_falls` | {"unresolved":["benztropine","trihexyphenidyl"]} |
| `di_delirium` | {"unresolved":["hydrocodone"]} |
| `di_depression` | {"unresolved":["triptorelin","atovaquone"]} |
| `tox_antidote_table` | {"unresolved":["sodium_bicarbonate","dimercaprol","succimer"]} |
| `tox_status_epilepticus` | {"unresolved":["fosphenytoin"]} |
| `tox_hyperkalemia` | {"unresolved":["sodium_bicarbonate"]} |
| `ac_afib` | {"unresolved":["ibutilide"]} |
| `ped_weight_dosing` | {"unresolved":["fosphenytoin"]} |
| `pgx_hla_b5701` | {"unresolved":["abacavir","lamivudine","zidovudine"]} |
| `pgx_ugt1a1` | {"unresolved":["irinotecan"]} |
| `drug_food_grapefruit` | {"unresolved":["everolimus"]} |
| `drug_food_dairy_cations` | {"unresolved":["tetracycline"]} |
| `drug_food_caffeine_others` | {"unresolved":["theophylline"]} |
| `beers_criteria_2023` | {"unresolved":["glipizide"]} |
| `stopp_start_v3` | {"unresolved":["glipizide"]} |
| `lasa_pairs` | {"unresolved":["lamivudine","glipizide","quinine","amphetamine_salts","hydrocodone","fosphenytoin","niacin","vorapaxar","vinblastine"]} |
| `high_alert_medications` | {"unresolved":["glipizide"]} |
| `contraception_method_comparison` | {"unresolved":["etonogestrel"]} |
| `contraception_drug_interactions` | {"unresolved":["nevirapine","theophylline","darunavir","rifapentine","etravirine","colestipol"]} |
| `tox_serotonin_syndrome` | {"unresolved":["tedizolid"]} |
| `tox_nms` | {"unresolved":["valbenazine"]} |
| `tox_alcohol_withdrawal` | {"unresolved":["dexmedetomidine"]} |
| `tox_anticholinergic_toxidrome` | {"unresolved":["benztropine","trihexyphenidyl","sodium_bicarbonate"]} |
| `tox_sympathomimetic_toxidrome` | {"unresolved":["sodium_bicarbonate"]} |
| `tox_salicylate_overdose` | {"unresolved":["sodium_bicarbonate"]} |
| `tox_tca_overdose` | {"unresolved":["sodium_bicarbonate"]} |
| `hfref_gdmt_titration` | {"unresolved":["riociguat"]} |
| `sadmans_sick_day_rules` | {"unresolved":["lixisenatide"]} |
| `t2dm_algorithm` | {"unresolved":["lixisenatide","acarbose"]} |
| `tdm_targets` | {"unresolved":["everolimus","theophylline"]} |
| `crushable_non_crushable` | {"unresolved":["niacin"]} |
| `ng_tube_compatibility` | {"unresolved":["sodium_bicarbonate"]} |
| `pharmacist_scope_provinces` | {"unresolved":["cytisinicline","cabotegravir_lai"]} |
| `drug_lab_interference` | {"unresolved":["biotin"]} |
| `di_lupus` | {"unresolved":["tetracycline"]} |
| `di_parkinsonism` | {"unresolved":["flunarizine","pimavanserin","paliperidone_palmitate"]} |
| `di_neuropathy` | {"unresolved":["vinblastine"]} |
| `pgx_g6pd` | {"unresolved":["atovaquone","quinine"]} |
| `lai_administration_protocols` | {"unresolved":["fluphenazine_decanoate","haloperidol_decanoate","paliperidone_palmitate","aripiprazole_lauroxil"]} |
| `asthma_action_plan` | {"unresolved":["reslizumab"]} |
| `copd_action_plan` | {"unresolved":["theophylline"]} |
| `nti_substitution` | {"unresolved":["everolimus","theophylline"]} |
| `hepatic_dose_adjustment` | {"unresolved":["everolimus"]} |
| `black_box_warnings_canadian` | {"unresolved":["siponimod","ponesimod"]} |
| `iv_ysite_compatibility` | {"unresolved":["fosphenytoin","sodium_bicarbonate"]} |
| `hazardous_drug_handling` | {"unresolved":["busulfan"]} |
| `drug_shortage_mitigation` | {"unresolved":["dexmedetomidine"]} |
| `tall_man_lettering` | {"unresolved":["glipizide","lamivudine","hydrocodone","clomiphene","vinblastine"]} |
| `cannabis_dispensing` | {"unresolved":["clobazam"]} |
| `pharmacist_injection_technique` | {"unresolved":["haloperidol_decanoate","paliperidone_palmitate"]} |
| `cyp3a4_matrix` | {"unresolved":["theophylline"]} |
| `pgp_matrix` | {"unresolved":["everolimus"]} |
| `maoi_washout` | {"unresolved":["tedizolid"]} |
| `falls_risk_meds` | {"unresolved":["glipizide"]} |
| ... | 1 more entries |

---

## DISEASES.conditions (604 entries)

| Audit dimension | Coverage | Bar | Audited (clean) | Remaining |
|---|---|---|---|---|
| Required schema (signs/diagnosis/treatment/pearls non-empty) | **100.0%** | `██████████████████` | 604 | 0 |
| Cites Canadian source | **100.0%** | `██████████████████` | 604 | 0 |
| All `treatment.agents` resolve (DRUGS/VACCINES/NON_PHARM_AGENTS) | **93.0%** | `█████████████████░` | 562 | 42 |
| §21.13 multi-family compliance | **98.8%** | `██████████████████` | 597 | 7 |
| `preg_lact_summary` populated (preg + lact drug categorization) | **100.0%** | `██████████████████` | 604 | 0 |

### ❌ All `treatment.agents` resolve (DRUGS/VACCINES/NON_PHARM_AGENTS) — 42 entries remaining (7.0% of total)

| Key/ID | Detail |
|---|---|
| `gout` | [endocrinology] {"agents":["canakinumab"]} |
| `hyperthyroidism` | [endocrinology] {"agents":["potassium_iodide"]} |
| `pcos` | [endocrinology] {"agents":["clomiphene"]} |
| `t2dm` | [endocrinology] {"agents":["acarbose"]} |
| `thyroid_storm` | [endocrinology] {"agents":["potassium_iodide"]} |
| `graves_disease` | [endocrinology] {"agents":["potassium_iodide"]} |
| `hirsutism_hyperandrogenism` | [endocrinology] {"agents":["eflornithine_topical"]} |
| `carcinoid_syndrome` | [endocrinology] {"agents":["telotristat","dotatate","everolimus","niacin"]} |
| `familial_hypercholesterolemia` | [endocrinology] {"agents":["evinacumab"]} |
| `severe_hypertriglyceridemia` | [endocrinology] {"agents":["niacin"]} |
| `hypercalcemia_of_malignancy` | [endocrinology] {"agents":["pamidronate","calcitonin_salmon"]} |
| `parkinsons` | [psychiatry] {"agents":["trihexyphenidyl","benztropine"]} |
| `subarachnoid_hemorrhage` | [psychiatry] {"agents":["nimodipine","fosphenytoin"]} |
| `narcolepsy` | [psychiatry] {"agents":["solriamfetol"]} |
| `pulmonary_hypertension` | [respirology] {"agents":["riociguat"]} |
| `pulmonary_alveolar_proteinosis` | [respirology] {"agents":["atovaquone"]} |
| `eosinophilic_pneumonia` | [respirology] {"agents":["reslizumab"]} |
| `gerd_pud` | [gastroenterology] {"agents":["tetracycline"]} |
| `nafld` | [gastroenterology] {"agents":["resmetirom"]} |
| `h_pylori` | [gastroenterology] {"agents":["tetracycline"]} |
| `whipple_disease` | [gastroenterology] {"agents":["streptomycin"]} |
| `small_intestinal_bacterial_overgrowth` | [gastroenterology] {"agents":["tetracycline","vitamin_a"]} |
| `renal_tubular_acidosis` | [nephrology] {"agents":["potassium_citrate","sodium_bicarbonate"]} |
| `familial_mediterranean_fever` | [rheumatology] {"agents":["canakinumab"]} |
| `macrophage_activation_syndrome` | [rheumatology] {"agents":["emapalumab"]} |
| `sapho_syndrome` | [rheumatology] {"agents":["pamidronate"]} |
| `sickle_cell` | [hematology] {"agents":["l_glutamine"]} |
| `tuberculosis` | [infectious] {"agents":["rifapentine"]} |
| `measles` | [infectious] {"agents":["vitamin_a"]} |
| `babesiosis_anaplasmosis` | [infectious] {"agents":["atovaquone","quinine"]} |
| `brucellosis` | [infectious] {"agents":["streptomycin"]} |
| `tularemia` | [infectious] {"agents":["streptomycin"]} |
| `plague` | [infectious] {"agents":["streptomycin"]} |
| `cutaneous_leishmaniasis` | [infectious] {"agents":["sodium_stibogluconate","miltefosine"]} |
| `psoriasis` | [dermatology] {"agents":["deucravacitinib"]} |
| `cutaneous_t_cell_lymphoma` | [dermatology] {"agents":["fluocinonide","bexarotene","peginterferon_alfa_2a","vorinostat","mogamulizumab"]} |
| `primary_ovarian_insufficiency` | [womens_health] {"agents":["progesterone_micronized"]} |
| `adenomyosis` | [womens_health] {"agents":["elagolix"]} |
| `retinal_vein_occlusion` | [ophthalmology] {"agents":["fluocinolone"]} |
| `hypoxic_ischemic_encephalopathy` | [pediatrics] {"agents":["fosphenytoin"]} |
| `returning_traveller_fever` | [travel] {"agents":["quinine"]} |
| `toxic_alcohols_methanol_ethylene_glycol` | [practice] {"agents":["sodium_bicarbonate"]} |

### ❌ §21.13 multi-family compliance — 7 entries remaining (1.2% of total)

| Key/ID | Detail |
|---|---|
| `cardiac_arrest_acls` | [cardiology] {"rows":[{"line":"Shockable: VF/pVT","missing":["Sympathomimetic Catecholamines"]}]} |
| `insect_bites` | [dermatology] {"rows":[{"line":"Anaphylaxis (sting) — EMERGENCY","missing":["Sympathomimetic Catecholamines"]}]} |
| `croup` | [pediatrics] {"rows":[{"line":"Severe/impending respiratory failure","missing":["Sympathomimetic Catecholamines"]}]} |
| `pediatric_asthma` | [pediatrics] {"rows":[{"line":"ACUTE EXACERBATION (ED/clinic management) — by severity (PRAM)","missing":["Sympathomimetic Catecholamines"]}]} |
| `bronchiolitis` | [pediatrics] {"rows":[{"line":"Therapies NOT RECOMMENDED for routine use","missing":["Sympathomimetic Catecholamines"]}]} |
| `anaphylaxis` | [practice] {"rows":[{"line":"Adjunct — Bronchospasm","missing":["Sympathomimetic Catecholamines"]},{"line":"Adjunct — H1 Antihistamine (urticaria/pruritus only)","missing":["Sympathomimetic Catecholamines"]},{"line":"Adjunct — H2 Antihistamine (selected use)","missing":["Sympathomimetic Catecholamines"]}]} |
| `hereditary_angioedema` | [practice] {"rows":[{"line":"ACUTE ATTACK MANAGEMENT (on-demand) — ALL PATIENTS SHOULD HAVE","missing":["Sympathomimetic Catecholamines"]}]} |

---

## DEPRESCRIBING_PROTOCOLS (17 entries)

| Audit dimension | Coverage | Bar | Audited (clean) | Remaining |
|---|---|---|---|---|
| Full 12-field schema complete | **100.0%** | `██████████████████` | 17 | 0 |
| `taper_steps` structured (step/action/detail objects) | **100.0%** | `██████████████████` | 17 | 0 |
| Cites Canadian source | **100.0%** | `██████████████████` | 17 | 0 |

---

## MINOR_AILMENTS (31 entries)

| Audit dimension | Coverage | Bar | Audited (clean) | Remaining |
|---|---|---|---|---|
| Full 9-field schema complete | **100.0%** | `██████████████████` | 31 | 0 |
| `assessment` has key_questions + red_flags | **100.0%** | `██████████████████` | 31 | 0 |
| Cites Canadian source / Ontario regulation | **100.0%** | `██████████████████` | 31 | 0 |

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
| Agent resolves to DRUGS catalog (click-through) | **79.4%** | `██████████████░░░░` | 162 | 42 |
| Family schema complete (name, moa, coverage) | **100.0%** | `██████████████████` | 204 | 0 |

### ❌ Agent resolves to DRUGS catalog (click-through) — 42 entries remaining (20.6% of total)

| Key/ID | Detail |
|---|---|
| `Oxacillin` | {"cat":"Antibacterials","fam":"Penicillins"} |
| `Cefaclor` | {"cat":"Antibacterials","fam":"Cephalosporins"} |
| `Cefiderocol` | {"cat":"Antibacterials","fam":"Cephalosporins"} |
| `Ceftolozane-Tazobactam` | {"cat":"Antibacterials","fam":"Cephalosporins"} |
| `Delafloxacin` | {"cat":"Antibacterials","fam":"Fluoroquinolones"} |
| `Tetracycline` | {"cat":"Antibacterials","fam":"Tetracyclines"} |
| `Omadacycline` | {"cat":"Antibacterials","fam":"Tetracyclines"} |
| `Eravacycline` | {"cat":"Antibacterials","fam":"Tetracyclines"} |
| `Sarecycline` | {"cat":"Antibacterials","fam":"Tetracyclines"} |
| `Demeclocycline` | {"cat":"Antibacterials","fam":"Tetracyclines"} |
| `Streptomycin` | {"cat":"Antibacterials","fam":"Aminoglycosides"} |
| `Plazomicin` | {"cat":"Antibacterials","fam":"Aminoglycosides"} |
| `Doripenem` | {"cat":"Antibacterials","fam":"Carbapenems"} |
| `Tebipenem` | {"cat":"Antibacterials","fam":"Carbapenems"} |
| `Tedizolid` | {"cat":"Antibacterials","fam":"Oxazolidinones"} |
| `Ozenoxacin` | {"cat":"Antibacterials","fam":"Topical Antibiotics"} |
| `Mafenide` | {"cat":"Antibacterials","fam":"Topical Antibiotics"} |
| `Telavancin` | {"cat":"Antibacterials","fam":"Lipoglycopeptides"} |
| `Lefamulin` | {"cat":"Antibacterials","fam":"Pleuromutilin Antibiotics"} |
| `Peramivir` | {"cat":"Antivirals","fam":"Neuraminidase Inhibitors (Influenza)"} |
| `Cidofovir` | {"cat":"Antivirals","fam":"CMV Antivirals"} |
| `Maribavir` | {"cat":"Antivirals","fam":"CMV Antivirals"} |
| `Ensitrelvir` | {"cat":"Antivirals","fam":"SARS-CoV-2 Antivirals"} |
| `Abacavir/Lamivudine (ABC/3TC)` | {"cat":"Antivirals","fam":"HIV Nucleoside/Nucleotide Reverse Transcriptase Inhibitors (NRTIs)"} |
| `Elvitegravir` | {"cat":"Antivirals","fam":"HIV Integrase Strand Transfer Inhibitors (INSTIs)"} |
| `Elbasvir-Grazoprevir` | {"cat":"Antivirals","fam":"HCV Direct-Acting Antivirals (DAAs)"} |
| `Daclatasvir` | {"cat":"Antivirals","fam":"HCV Direct-Acting Antivirals (DAAs)"} |
| `Simeprevir` | {"cat":"Antivirals","fam":"HCV Direct-Acting Antivirals (DAAs)"} |
| `Boceprevir` | {"cat":"Antivirals","fam":"HCV Direct-Acting Antivirals (DAAs)"} |
| `Tecovirimat` | {"cat":"Antivirals","fam":"Smallpox + Mpox Antivirals"} |
| `Rezafungin` | {"cat":"Antifungals","fam":"Echinocandins"} |
| `Butenafine` | {"cat":"Antifungals","fam":"Topical Antifungals (Azoles & Other)"} |
| `Ibrexafungerp` | {"cat":"Antifungals","fam":"Triterpenoid Antifungals"} |
| `Secnidazole` | {"cat":"Antiparasitics","fam":"Antiprotozoals"} |
| `Atovaquone-proguanil (Malarone)` | {"cat":"Antiparasitics","fam":"Antimalarials"} |
| `Quinine` | {"cat":"Antiparasitics","fam":"Antimalarials"} |
| `Crotamiton` | {"cat":"Antiparasitics","fam":"Ectoparasiticides"} |
| `Eflornithine` | {"cat":"Antiparasitics","fam":"Tropical Antiparasitics (HAT, Chagas, Leishmaniasis)"} |
| `Nifurtimox` | {"cat":"Antiparasitics","fam":"Tropical Antiparasitics (HAT, Chagas, Leishmaniasis)"} |
| `Fexinidazole` | {"cat":"Antiparasitics","fam":"Tropical Antiparasitics (HAT, Chagas, Leishmaniasis)"} |
| `Miltefosine` | {"cat":"Antiparasitics","fam":"Tropical Antiparasitics (HAT, Chagas, Leishmaniasis)"} |
| `Sodium Stibogluconate` | {"cat":"Antiparasitics","fam":"Tropical Antiparasitics (HAT, Chagas, Leishmaniasis)"} |

---

## EDIT_HISTORY (entities tracked) (1,648 entries)

| Audit dimension | Coverage | Bar | Audited (clean) | Remaining |
|---|---|---|---|---|
| Has ≥1 history entry | **100.0%** | `██████████████████` | 1,648 | 0 |
| Entries have valid date + hash + subject | **100.0%** | `██████████████████` | 1,648 | 0 |
| Date format YYYY-MM-DD | **100.0%** | `██████████████████` | 1,648 | 0 |
| Entity exists in current catalog (no orphan) | **73.2%** | `█████████████░░░░░` | 1,207 | 441 |

### ❌ Entity exists in current catalog (no orphan) — 441 entries remaining (26.8% of total)

| Key/ID | Detail |
|---|---|
| `tretinoin_oral` | {} |
| `nimodipine` | {} |
| `eflornithine_topical` | {} |
| `telotristat` | {} |
| `aficamten` | {} |
| `mavorixafor` | {} |
| `resmetirom` | {} |
| `levoketoconazole` | {} |
| `mirdametinib` | {} |
| `vimseltinib` | {} |
| `sulbactam_durlobactam` | {} |
| `tebipenem` | {} |
| `nemolizumab` | {} |
| `olpasiran` | {} |
| `pelacarsen` | {} |
| `plozasiran` | {} |
| `zilebesiran` | {} |
| `obicetrapib` | {} |
| `apitegromab` | {} |
| `enarodustat` | {} |
| `povorcitinib` | {} |
| `rocatinlimab` | {} |
| `olomorasib` | {} |
| `muvalaplin` | {} |
| `calcitonin_salmon` | {} |
| `perfluorohexyloctane` | {} |
| `olutasidenib` | {} |
| `bexarotene` | {} |
| `plerixafor` | {} |
| `busulfan` | {} |
| `thiotepa` | {} |
| `trabectedin` | {} |
| `lurbinectedin` | {} |
| `decitabine_oral` | {} |
| `mitomycin` | {} |
| `arsenic_trioxide` | {} |
| `dexamethasone_implant` | {} |
| `irinotecan` | {} |
| `nab_paclitaxel` | {} |
| `vinblastine` | {} |
| `vinorelbine` | {} |
| `eribulin` | {} |
| `dacarbazine` | {} |
| `melphalan` | {} |
| `clofarabine` | {} |
| `nelarabine` | {} |
| `liposomal_irinotecan` | {} |
| `pegylated_liposomal_doxorubicin` | {} |
| `idarubicin` | {} |
| `epirubicin` | {} |
| `mitoxantrone` | {} |
| `vipivotide_tetraxetan` | {} |
| `radium_223` | {} |
| `dotatate` | {} |
| `fluocinolone_implant` | {} |
| `pirtobrutinib` | {} |
| `xanomeline_trospium` | {} |
| `olanzapine_samidorphan` | {} |
| `aripiprazole_lauroxil` | {} |
| `loxapine_inhaled` | {} |
| ... | 381 more entries |

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
| MINOR_AILMENTS | **31** |
| NON_PHARM_AGENTS dictionary | **94** |
| EDIT_HISTORY entities tracked | **1,648** |
| CHANGELOG PRs catalogued | **122** |
| DISEASES categories | **20** |

---

## Suggested next audit priorities

Ordered by impact (size of gap × clinical importance):

| Priority | Gap (entries) | Audit area |
|---|---|---|
| 2 | **61** | REFERENCE_TABLES — fix `related_drugs` keys that don't resolve |
| 3 | **42** | DISEASES.conditions — fix unresolved `treatment.agents` (add to NON_PHARM_AGENTS or DRUGS, or correct typo) |
| 4 | **7** | DISEASES.conditions — apply §21.13 multi-family fix |

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
