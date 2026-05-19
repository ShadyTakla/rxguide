# ROADMAP.md — rxguide Future Updates & Content Gaps

**Purpose:** Catalogue of high-value, low-liability content and feature additions that would make rxguide a more complete Canadian community-pharmacy reference tool, *without* crossing the line into patient-specific clinical decision support.

**Audience:** Future contributors (human or AI). Pick from this list when looking for high-impact work. Cross-reference against existing content (see AGENTS.md §14) before adding to avoid duplication.

**Last updated:** 2026-05-19

---

## ⚠️ READ FIRST — Container hierarchy rules

**3-tier rule for picking work from this roadmap:**

- 🛑 **Tabs — LOCKED.** Do NOT add a new tab without explicit user discussion. The 9 existing tabs cover all planned scope.
- ❌ **Top-level categories — CLOSED.** Do NOT add a new disease category on the Diseases home page (20 exist) or a new Reference category on the Reference home page (9 exist). Always place new content WITHIN an existing category.
- ✅ **In-category content — OPEN.** New disease conditions inside an existing category, new reference tables inside an existing Reference category, new drug families, new drug cards, new vaccines, new deprescribing protocols, etc. — all fine. Just substring-search for existing duplicate scope first; extend an existing entry when scope overlaps.

See **`AGENTS.md` §24** for the full rules, examples, and discovery commands.

---

## ✅ Completed items (as of 2026-05-19)

Items confirmed present in `index.html`. Do not re-add.

### Reference tables completed
| Table ID | Title |
|---|---|
| `hfref_gdmt_titration` | HFrEF Quadruple GDMT — Titration Ladder & STRONG-HF Monitoring |
| `ac_switching` | Anticoagulant Switching — Transition Protocols |
| `ac_doac_perioperative` | DOAC Perioperative Management |
| `contraception_method_comparison` | Hormonal & Non-Hormonal Contraception — Method Comparison |
| `contraception_missed_dose` | Missed-Dose Decision Tree by Contraception Formulation |
| `contraception_drug_interactions` | Drug Interactions Affecting Hormonal Contraception |
| `contraception_emergency_selection` | Emergency Contraception — Selection by Time, BMI, Drug Interactions |
| `nti_substitution` | Narrow-Therapeutic-Index Drug Substitution Rules |
| `t2dm_algorithm` | Type 2 Diabetes — Diabetes Canada 2024 Stepwise Algorithm |
| `lai_administration_protocols` | Long-Acting Injectables — Induction, Missed-Dose, Administration |
| `pen_fast_delabeling` | PEN-FAST Score & Penicillin Allergy De-Labeling Workflow |
| `tox_hyperkalemia` | Acute Hyperkalemia — Emergency Treatment |
| `tox_status_epilepticus` | Status Epilepticus — Treatment Algorithm |
| `asthma_action_plan` | Asthma Action Plan — Green/Yellow/Red Zone (GINA 2024) |
| `copd_action_plan` | COPD Action Plan — Green/Yellow/Red Zone (GOLD 2024-2025) |
| `insulin_titration` | Insulin Titration — Basal & Prandial Starting Doses + Adjustment Rules |
| `abx_duration` | Antimicrobial Duration Cheat Sheet — Shortened Courses (AMMI Canada 2024) |
| `sadmans_sick_day_rules` | SADMANS Sick-Day Medication Rules |
| `ped_sick_day_rules` | Sick-Day Rules — Pediatric & Adult Diabetes |
| `drug_lab_interference` | Drug-Laboratory Test Interference |
| `tdm_targets` | Therapeutic Drug Monitoring (TDM) Targets |
| `renal_dose_adjustment` | Renal Dose-Adjustment — CrCl Thresholds by Drug Class |
| `hepatic_dose_adjustment` | Hepatic Dose-Adjustment — Child-Pugh A/B/C |
| `pgx_cyp2c19` | CPIC: CYP2C19 |
| `pgx_cyp2d6` | CPIC: CYP2D6 |
| `pgx_hla_b5701` | CPIC: HLA-B*57:01 — Abacavir |
| `pgx_hla_b1502` | CPIC: HLA-B*15:02 — Carbamazepine |
| `pgx_tpmt_nudt15` | CPIC: TPMT/NUDT15 — Thiopurines |
| `pgx_dpyd` | CPIC: DPYD — Fluoropyrimidines |
| `pgx_ugt1a1` | CPIC: UGT1A1 — Irinotecan |
| `pgx_warfarin` | CPIC: CYP2C9 + VKORC1 — Warfarin |
| `pgx_g6pd` | G6PD Deficiency — Drugs to Avoid |
| `iv_ysite_compatibility` | IV Y-Site Compatibility |
| `crushable_non_crushable` | Crushable vs Non-Crushable Medications |
| `ng_tube_compatibility` | NG/PEG/Feeding-Tube Medication Compatibility |
| `hazardous_drug_handling` | Hazardous Drug Handling — USP <800> |
| `lasa_pairs` | Look-Alike Sound-Alike (LASA) Pairs — ISMP Canada |
| `high_alert_medications` | High-Alert Medications (ISMP) |
| `dispensing_safety_errors` | Dispensing Errors & Pharmacy Safety |
| `beers_criteria_2023` | AGS Beers Criteria 2023 |
| `stopp_start_v3` | STOPP-START Criteria v3 (2023) |
| `di_qt` | Drug-Induced QT Prolongation |
| `di_hyponatremia` | Drug-Induced Hyponatremia (SIADH) |
| `di_hyperkalemia` | Drug-Induced Hyperkalemia |
| `di_aki` | Drug-Induced Acute Kidney Injury |
| `di_hepatotoxicity` | Drug-Induced Liver Injury (DILI) |
| `di_photosensitivity` | Drug-Induced Photosensitivity |
| `di_pancreatitis` | Drug-Induced Pancreatitis |
| `di_falls` | Drug-Induced Falls in Elderly |
| `di_delirium` | Drug-Induced Confusion/Delirium |
| `di_depression` | Drug-Induced Depression/Suicidality |
| `di_lupus` | Drug-Induced Lupus Erythematosus |
| `di_parkinsonism` | Drug-Induced Parkinsonism |
| `di_neuropathy` | Drug-Induced Peripheral Neuropathy |
| `black_box_warnings_canadian` | Black-Box/Boxed Warnings — Canadian Compilation |
| `drug_shortage_mitigation` | Drug Shortage Mitigation |
| `medscheck_workflow` | MedsCheck Eligibility & Workflow (Ontario) |
| `pharmacist_scope_provinces` | Pharmacist Scope of Practice by Province |
| `naloxone_thn_workflow` | Naloxone Take-Home Kit — Pharmacist Workflow |
| `beta_lactam_cross_reactivity` | Beta-Lactam Allergy Cross-Reactivity |
| `sulfa_cross_reactivity` | Sulfa Drug Cross-Reactivity |
| `nsaid_cross_reactivity` | NSAID Cross-Reactivity & Hypersensitivity |
| `contrast_reactions` | Iodinated Contrast & Gadolinium Allergy |
| `vaccine_excipient_allergies` | Vaccine Excipient Allergies & Substitutes |
| `drug_food_grapefruit` | Grapefruit & Furanocoumarin-Containing Foods |
| `drug_food_dairy_cations` | Drug-Cation Chelation (Dairy, Iron, Calcium, Antacids) |
| `drug_food_warfarin_vit_k` | Vitamin K & Warfarin (Dietary Consistency) |
| `drug_food_alcohol` | Alcohol-Drug Interactions |
| `drug_food_caffeine_others` | Caffeine, Tyramine, and Other Food-Drug Interactions |
| `ped_weight_dosing` | Pediatric Weight-Based Dosing |
| `ped_antibiotic_suspensions` | Pediatric Antibiotic Oral Suspensions |
| `ped_antipyretics` | Pediatric Antipyretics |
| `ped_vital_signs` | Pediatric Vital Signs by Age |
| `opioid_mme` | Opioid Morphine Equivalent (MME) Reference |
| `steroid_equiv` | Glucocorticoid Equivalence |
| `ppi_equiv` | PPI Equivalence & Comparison |
| `statin_equiv` | Statin LDL-Lowering Equivalence |
| `ics_potency` | Inhaled Corticosteroid (ICS) Potency |
| `topical_steroid_potency` | Topical Corticosteroid Potency (Class I–VII) |
| `doac_dose` | DOAC Dose by Indication × CrCl |
| `insulin_types` | Insulin Types — Onset, Peak, Duration |
| `tox_acetaminophen` | Acetaminophen Overdose & NAC |
| `tox_antidote_table` | Common Overdose Antidotes |
| `tox_anaphylaxis` | Anaphylaxis — Emergency Management |
| `tox_hypoglycemia` | Acute Hypoglycemia Management |
| `tox_dka_hhs` | DKA/HHS Management Protocol |
| `tox_asthma_copd` | Acute Asthma & COPD Exacerbation — Severity Ladder |
| `tox_sepsis_bundle` | Sepsis Hour-1 Bundle |
| `tox_serotonin_syndrome` | Serotonin Syndrome — Recognition & Management |
| `tox_nms` | Neuroleptic Malignant Syndrome (NMS) |
| `tox_alcohol_withdrawal` | Alcohol Withdrawal Syndrome & Delirium Tremens |
| `tox_anticholinergic_toxidrome` | Anticholinergic Toxidrome |
| `tox_sympathomimetic_toxidrome` | Sympathomimetic Toxidrome |
| `tox_salicylate_overdose` | Salicylate Overdose |
| `tox_tca_overdose` | Tricyclic Antidepressant Overdose |
| `ac_bridging` | Perioperative Anticoagulation Bridging |
| `ac_doac_reversal` | DOAC Reversal — Major Bleeding |
| `ac_warfarin_reversal` | Warfarin Reversal — INR Elevation & Bleeding |
| `ac_vte` | VTE Treatment & Duration |
| `ac_afib` | Atrial Fibrillation — Stroke Prevention & Rate vs Rhythm |
| **`tall_man_lettering`** | Tall-Man Lettering Standard List — ISMP Canada *(added 2026-05-19)* |
| **`oral_antineoplastic_counselling`** | Oral Antineoplastic Patient Counselling *(added 2026-05-19)* |
| **`hospital_community_transition`** | Hospital-to-Community Transition — MedRec Workflow *(added 2026-05-19)* |
| **`drug_recall_workflow`** | Drug Recall Workflow — Health Canada & Pharmacist Responsibilities *(added 2026-05-19)* |
| **`cannabis_dispensing`** | Medical Cannabis — Pharmacist Reference & Dispensing Framework *(added 2026-05-19)* |
| **`pharmacist_injection_technique`** | Pharmacist-Administered Injection Technique — IM, SC, ID Reference *(added 2026-05-19)* |

### Disease cards completed (selected highlights — full list is 601 conditions)
All conditions in §4.1 and §4.2 of the original roadmap are confirmed present, including:
Long QT syndrome, Brugada syndrome, **CPVT** *(added 2026-05-19)*, PE/DVT outpatient, Adrenal insufficiency, Subclinical hypothyroidism, Microscopic colitis, Iron deficiency anemia, B12 deficiency, Recurrent UTI, Asymptomatic bacteriuria, C. difficile colitis, AKI, Restless legs syndrome, Allergic conjunctivitis, Dry eye disease, Trigeminal neuralgia, Bronchiolitis, Croup, Otitis externa, ADHD, Anxiety disorders, OCD, PTSD, OSA, Allergic rhinitis, PMR, Erectile dysfunction, Premature ejaculation, Menopause symptom management, PCOS, Endometriosis, Pregnancy counselling, Lactation counselling, Diabetes insipidus, Cushing syndrome, Sickle cell disease, Thalassemia, Polycythemia vera, Essential thrombocythemia, ITP, Myasthenia gravis, Tourette syndrome, Tumor lysis syndrome, CIPN, Opioid use disorder, **Cancer-Related Fatigue (CRF)** *(added 2026-05-19 — Oncology; NCCN-based; methylphenidate/modafinil/dexamethasone + exercise Rx)*.

### Drug cards completed (selected)
`conjugated_estrogens`, `conjugated_estrogen`, `elagolix` — all present with full schema.

**Added 2026-05-19:**
- `atropine_ophthalmic` — Isopto Atropine 1% + compounded 0.01% for myopia control; cycloplegia/uveitis/amblyopia; new DRUG_FAMILIES entry "Anticholinergics — Ophthalmic"
- `dasiglucagon` — Zegalogue (Zealand Pharma); Health Canada NOC 2022; aqueous-stable SC auto-injector; severe hypoglycemia ≥6 years
- `glucagon_nasal` — Baqsimi (Eli Lilly/Amphastar); Health Canada NOC 2020; 3 mg intranasal; no needles/no mixing; severe hypoglycemia ≥4 years
- `diazoxide` — Proglycem 50 mg/mL oral suspension; congenital hyperinsulinism + insulinoma; ODB LU; new DRUG_FAMILIES entry "ATP-Sensitive K⁺ Channel Openers"

---

## Table of contents (remaining gaps)

1. [Liability guardrails — what NEVER to add](#1-liability-guardrails--what-never-to-add)
2. [What rxguide is intentionally NOT](#2-what-rxguide-is-intentionally-not)
3. [High-value reference content gaps](#3-high-value-reference-content-gaps)
4. [Disease/condition cards still to add](#4-diseasecondition-cards-still-to-add)
5. [Drug family/card gaps](#5-drug-familycard-gaps)
6. [Reference tables to add or expand](#6-reference-tables-to-add-or-expand)
7. [Pharmacist scope & workflow content](#7-pharmacist-scope--workflow-content)
8. [Patient-counselling content](#8-patient-counselling-content)
9. [Cross-app integration & navigation gaps](#9-cross-app-integration--navigation-gaps)
10. [Pregnancy / lactation expansion](#10-pregnancy--lactation-expansion)
11. [Vaccine content gaps](#11-vaccine-content-gaps)
12. [Pediatric-specific reference content](#12-pediatric-specific-reference-content)
13. [Geriatric-specific reference content](#13-geriatric-specific-reference-content)
14. [Drug interactions & safety content](#14-drug-interactions--safety-content)
15. [Practice management & professional content](#15-practice-management--professional-content)
16. [Search & UX improvements](#16-search--ux-improvements)
17. [Maintenance / data hygiene](#17-maintenance--data-hygiene)
18. [How to prioritize](#18-how-to-prioritize)

---

## 1. Liability guardrails — what NEVER to add

rxguide is **reference content** — published, evidence-based, citable. It is **not** clinical decision support. The following categories MUST be avoided regardless of how useful they sound:

### ❌ NEVER add — high-liability features

| Feature | Why excluded |
|---|---|
| **Dosing calculators** (mg/kg, BSA, CrCl-adjusted dosing, opioid conversion, anticoagulant dosing) | A miscalculation by the user or a software bug = patient harm. Use published nomograms only — never compute. |
| **Patient-specific decision wizards** that recommend a specific drug for a specific patient | Crosses into prescribing-support territory. The existing Minor Ailments wizards stop at "refer to MD" or "see published protocol" — they never recommend a specific Rx dose for a specific patient. Keep that line. |
| **Symptom checkers** that suggest a diagnosis based on patient input | Triage software requires regulatory clearance (Health Canada MDD). Do not implement. |
| **Drug interaction checker that accepts a patient's full med list and outputs personalized warnings** | Crosses into clinical decision support; same regulatory concern. The existing app surfaces interactions per-drug — that's reference content. A "paste your med list" feature would be different. |
| **Pharmacogenomic / lab-result interpretation** that translates a CYP2C19 phenotype into a drug-dose recommendation for that patient | Same DCS issue. Reference the CPIC tables and Health Canada PM, but don't compute. |
| **AI-generated patient counselling for a specific patient** | DCS again. Generic counselling scripts on a condition or drug card are fine; personalized output is not. |
| **Renal dose adjustment based on patient's CrCl** | Already covered by published tables; do NOT add a calculator that asks for SCr/weight/age and outputs a dose. |
| **Anticoagulant bridging recommendations for a specific surgery date** | This is a clinical-decision tool. Reference the Thrombosis Canada guideline tables and let the pharmacist apply them. |
| **Pediatric weight-based dosing calculators** | Highest-liability area. Reference tables of standard doses are fine. Calculators are not. |

### ✅ The safe pattern

- **Publish the table** (e.g., "renal dose adjustment for vancomycin: CrCl 80–100 → 15–20 mg/kg q8–12h").
- **Cite the source** (Health Canada PM, RxFiles, Bugs & Drugs, CCS guideline).
- **Add Canadian context** (ODB coverage, NAPRA scheduling, provincial pharmacist scope).
- Let the **user (pharmacist) do the calculation**. The app provides the reference; the human provides the judgement.

---

## 2. What rxguide is intentionally NOT

- Not a replacement for the Compendium of Pharmaceuticals and Specialties (CPS).
- Not a replacement for Lexicomp / Micromedex.
- Not a billing reference (ODB pricing is illustrative, not authoritative).
- Not a primary-care diagnostic tool — diagnoses come from the prescriber.
- Not an EHR or pharmacy management system.

It IS:
- A **structured Canadian reference** with a pharmacist scope.
- A **teaching tool** for students/residents.
- A **counselling-content library** for community-pharmacy interactions.
- A **rapid-lookup tool** for class effects, contraindications, monitoring schedules, deprescribing protocols.

---

## 3. High-value reference content gaps

Most of the original §3.1 and §3.2 items are **complete** (see completed list above). Remaining gaps:

### 3.1 Still to add

1. **MAID Drug Protocol (Medical Assistance in Dying)**
   - Pharmacist scope (provinces allowing pharmacist participation in MAID drug supply)
   - Drug kit composition (typically: midazolam + propofol or ketamine + neuromuscular blockade agent)
   - Documentation workflow; Health Canada requirements
   - Conscientious objection framework (OCP position)
   - Referenced in the app but no dedicated reference table yet

2. **Local Antibiogram / AMR Trends**
   - National + provincial AMR trends (Ontario antibiogram)
   - Link to Bugs & Drugs + AMMI Canada national surveillance
   - Resistance rates for common community pathogens (E. coli UTI, S. aureus, S. pneumoniae, H. influenzae)
   - Already have `abx_duration` — this would be a companion table

3. ~~**Cancer-related fatigue disease card**~~ ✅ *Added 2026-05-19 — see Completed section above*

---

## 4. Disease/condition cards still to add

The vast majority of conditions from the original list are present. Remaining verifiable gaps:

### 4.1 Potentially missing (verify before adding)

All items in this section have now been confirmed as present or added. See §4.2 below.

### 4.2 Confirmed already present (do not re-add)

All original §4.1 items are confirmed present:

| Category | Condition | Status |
|---|---|---|
| ~~Oncology~~ | ~~Cancer-related fatigue~~ | ✅ Added 2026-05-19 |
| ~~Pediatrics~~ | ~~Kawasaki disease~~ | ✅ Confirmed present (2026-05-19 audit) |
| ~~Pediatrics~~ | ~~Febrile seizures~~ | ✅ Added 2026-05-19 |
| ~~Neurology~~ | ~~Normal pressure hydrocephalus (NPH)~~ | ✅ Confirmed present (2026-05-19 audit) |
| ~~Rheumatology~~ | ~~Fibromyalgia~~ | ✅ Confirmed present (2026-05-19 audit) |
| ~~Rheumatology~~ | ~~Reactive arthritis~~ | ✅ Confirmed present (2026-05-19 audit) |
| ~~Cardiology~~ | ~~Cardiac sarcoidosis~~ | ✅ Confirmed present (2026-05-19 audit) |

---

## 5. Drug family/card gaps

### 5.1 Drug cards that should exist but may not

Verify with `grep -c '"key_name"' index.html` before adding:

- ~~`atropine_ophthalmic`~~ ✅ Added 2026-05-19
- ~~`dasiglucagon`~~ ✅ Added 2026-05-19
- ~~`glucagon_nasal`~~ ✅ Added 2026-05-19
- ~~`diazoxide`~~ ✅ Added 2026-05-19
- `octreotide` — verify dedicated drug card exists (FAMILY_MAP entry exists but card may be skeletal)

### 5.2 Drug-family cards that should exist (verify completeness)

- **GLP-1 Receptor Agonists** — verify tirzepatide (GIP/GLP-1 dual) is correctly in a distinct family from pure GLP-1 agents; retatrutide (triple agonist — pipeline) not yet warranted
- **Bile Acid Sequestrants** — cholestyramine, colestipol, colesevelam — verify family card depth
- **Vasopressin Receptor Antagonists** — tolvaptan, conivaptan — verify family depth
- **CAR-T Cell Therapies** — tisagenlecleucel, axicabtagene, etc. — awareness-level reference cards; verify exist as drug cards
- **Bispecific T-Cell Engagers (BiTEs)** — blinatumomab, mosunetuzumab, glofitamab, etc. — verify exist

### 5.3 Drug-family completeness audits to run

For each drug family with multiple members, verify:
- `comparison` field exists (vs other drugs in the family)
- `pearls` field has 5–10 items
- `members` array lists all the DRUGS keys mapped to this family in FAMILY_MAP
- `class_color` is appropriate to the parent class
- `canadian_notes` mentions provincial coverage / ODB LU codes if applicable
- `source` cites at least one Canadian guideline

---

## 6. Reference tables to add or expand

### 6.1 New reference tables still needed

All originally listed tables are now confirmed present (2026-05-19 audit):

| Table | Status |
|---|---|
| ~~MAID Drug Protocol~~ | ✅ `maid_drug_protocol` confirmed present |
| ~~Local Antibiogram / AMR Trends~~ | ✅ `antibiogram` — Ontario antibiogram confirmed present |
| ~~Pediatric High-Risk Medications (KIDs List)~~ | ✅ `kids_list` added earlier this session |
| ~~CYP3A4 Inhibitor / Inducer / Substrate Matrix~~ | ✅ `cyp3a4_matrix` confirmed present |
| ~~P-gp Inhibitor / Inducer / Substrate Matrix~~ | ✅ `pgp_matrix` confirmed present |
| ~~MAOI Washout / Serotonergic Switch Matrix~~ | ✅ `maoi_washout` confirmed present |
| ~~Frailty Assessment Tools~~ | ✅ `frailty_tools` confirmed present |
| ~~Falls Risk Medication Reference~~ | ✅ `falls_risk_meds` confirmed present |
| ~~Inhaler Technique by Device~~ | ✅ `inhaler_technique` confirmed present |
| ~~Pregnancy-Safe Medications by Indication~~ | ✅ `pregnancy_safe_meds` confirmed present |

No new reference tables required at this time.

### 6.2 Existing reference tables to expand

- **LASA Pairs** (`lasa_pairs`) — could add pediatric-specific and oncology-specific subsections
- **Drug-Food Interactions** — tyramine/MAOI foods already in `drug_food_caffeine_others`; verify completeness
- **Geriatric** — Beers 2023 + STOPP-START v3 both present; could add anticholinergic burden drug list (publish only — never compute total)

---

## 7. Pharmacist scope & workflow content

### 7.1 Provincial pharmacist scope
`pharmacist_scope_provinces` reference table is complete. No further action needed unless a province changes its regulations — update the table at that time.

### 7.2 Workflow templates / counselling scripts

Still to add (all as reference content — not calculators):
- **New-start counselling templates** per drug class (anticoagulant, insulin, opioid, statin, antibiotic, biologic injectable) — structured scripts beyond what's in `patient_counseling` fields
- **Adherence assessment** — Morisky-8, CUDIT-R, validated questionnaires; motivational-interviewing prompts — reference format
- **Travel counselling per drug class** — already partial in travel medicine tab; expand for diabetes (sick-day + insulin adjustment while traveling), anticoagulant (time zone crossing + DVT prophylaxis), immunosuppressant (food safety)

### 7.3 Jurisprudence expansion

All originally listed topics are confirmed present in the Jurisprudence section (2026-05-19 audit):

- ~~Privacy & PHIPA scenarios~~ ✅ `Privacy and Confidentiality (PHIPA)` topic present
- ~~Conscientious objection~~ ✅ `Conscientious Objection` topic present (OCP #6-01; MAID, EC, naloxone, Mifegymiso)
- ~~Pharmacy ownership / corporate practice~~ ✅ `Pharmacy Ownership & Corporate Practice` topic present
- ~~OAT regulations~~ ✅ `Methadone & Buprenorphine (OAT)` topic present (witnessed dosing, carries, diversion)
- ~~Compounding regulations~~ ✅ `Compounding Regulations` topic present (USP 795/797/800)
- ~~CPD requirements~~ ✅ `Continuing Professional Development (CPD)` topic present (CE-PLUS, QAP, CCCEP)
- ~~Pharmacist liability & insurance~~ ✅ `Pharmacist Liability & Professional Insurance` topic present (PMIC, PHIPA, standard of care)

No new jurisprudence topics required at this time.

---

## 8. Patient-counselling content

### 8.1 Counselling script completeness

`patient_counseling` fields exist for most drug cards but vary in depth. A systematic pass to ensure every drug card has all 7 domains:
1. What is this medication for (one sentence)
2. How to take it (timing, food, dose)
3. What to expect (onset, common side effects, when to call)
4. Red flags (when to seek urgent care)
5. Storage / handling (especially injectables, biologics, opioids, controlled substances)
6. Missed dose
7. Pregnancy / breastfeeding (if applicable)

### 8.2 Counselling cards for device-based products

Dedicated reference content (not currently in a structured table):
- **Auto-injectors** — EpiPen/Auvi-Q/Allerject/Neffy nasal technique comparison; insulin pen vs vial; GLP-1 weekly pen formulations; biologic SC injectors (Autoject 2, various auto-injectors)
- ~~**Inhalers**~~ ✅ `inhaler_technique` reference table confirmed present (pMDI/DPI/SMI by device)
- **Eye drops** — instillation technique; nasolacrimal occlusion; spacing between drops (5 min rule)
- **Nasal sprays** — priming, technique, alternating nostrils
- **Transdermal patches** — rotation, removal, hot-weather effects (adhesive failure)

---

## 9. Cross-app integration & navigation gaps

### 9.1 Search improvements

- **Drug-class search** — typing "PPI" or "DOAC" should surface the family card
- **Indication search** — typing "what drugs treat acne?" should surface relevant drug cards
- **Reverse lookup** — typing a side effect surfaces the drugs that commonly cause it
- **Pregnancy-category search** — filter drugs by pregRisk bucket
- **NAPRA-schedule search** — filter by Schedule I/II/III/U

### 9.2 Navigation / cross-linking

- **From a drug card → list of disease cards using that drug** ("Used in conditions:")
- **From a disease card → relevant deprescribing protocol(s)** (if any apply)
- **From a disease card → relevant minor ailment** (e.g., dyspepsia minor ailment from GERD card)
- **From an interaction → both drug cards bidirectionally**
- **From a reference table → related drugs / conditions / minor ailments**

### 9.3 Bookmarking / persistence

- **Recently viewed cards** (browser localStorage; minimal liability)
- **Pinned references** for quick re-access
- **Print-friendly view** for patient handouts (counselling sections; not full card)

---

## 10. Pregnancy / lactation expansion

### 10.1 Per-drug content

PREG_DATA exists for all 1,547 drugs. Most have brief `pregDetail` / `bfDetail`. Depth improvements:
- **Lactation transfer data** — milk:plasma ratio, infant exposure %, LactMed risk category (currently text-only)
- **Inadvertent first-trimester exposure** counselling per high-risk drug
- **Pre-conception planning** advice (methotrexate 3-month washout, isotretinoin iPLEDGE, retinoid washout, mycophenolate washout)

### 10.2 Reference content still to add

- **Pregnancy-safe medication algorithms** by indication — nausea/vomiting of pregnancy, gestational headache, heartburn, constipation, allergic rhinitis, UTI, vaginitis, mastitis
- **Teratogen registry links** — MotherToBaby (US) + ENTIS (Europe) + BC Women's Motherisk replacement resources
- **Folate / iron / iodine / vitamin D supplementation** in pregnancy + lactation — single structured reference table

---

## 11. Vaccine content gaps

### 11.1 Vaccines to verify

All NACI-routine vaccines confirmed present (56 total). Verify these travel/specialty vaccines exist:
- Yellow fever *(should be present — verify)*
- Japanese encephalitis *(verify)*
- Tick-borne encephalitis (TBE) — Health Canada SAP product *(verify)*
- Cholera — Dukoral (oral) *(verify)*
- Typhoid — Vivotif (oral) + Typhim Vi (IM) *(verify)*
- Rabies pre-exposure + post-exposure *(verify)*
- Polio (IPV adult booster for travelers) *(verify)*

### 11.2 Vaccine content depth

For each vaccine card, verify all fields are present:
- AEFI reporting workflow
- Cold-chain temperature + storage duration requirements
- Provincial immunization registry submission workflow

### 11.3 Travel vaccination clinic reference
- Vaccine prioritization timelines (3-month, 1-month, 1-week schedules)
- Malaria chemoprophylaxis (CATMAT) — verify depth in travel medicine section
- Altitude sickness prophylaxis — acetazolamide protocol

---

## 12. Pediatric-specific reference content

⚠️ **HIGHEST LIABILITY area** — limit to published reference tables; absolutely no dosing calculators.

### 12.1 What's safe to add (still missing)

- **Pediatric high-risk medications (KIDs list)** — published list of medications requiring extra caution in children; distinct from adult Beers criteria
- **Pediatric inhaler/spacer technique** — device-specific guidance by age group (0–2, 3–5, 6–12, >12)
- **Pediatric pain assessment scales** — FLACC (0–3 yrs), FACES (4–12 yrs), NRS (>12 yrs) — published scoring guide only

### 12.2 Already present

Pediatric weight-based dosing tables, antibiotic suspensions, antipyretics, vital signs, and sick-day rules all present (`ped_*` tables).

---

## 13. Geriatric-specific reference content

### 13.1 Still to add

- **Frailty assessment tools** — Clinical Frailty Scale (CFS), FRAIL questionnaire — published scoring tables only; no calculator
- **Falls-risk medication reference table** — fall-risk drug list with risk magnitude; links to `di_falls` and `beers_criteria_2023`; Canadian guidance (RNAO falls prevention)
- **Anticholinergic burden drug list** — all drugs with ABS ≥1; **publish the list only — never compute the total score**; companion to existing CrossCheck anticholinergic content

### 13.2 Already present

Beers Criteria 2023, STOPP-START v3 (2023), `di_falls`, `di_delirium` all present.

---

## 14. Drug interactions & safety content

### 14.1 Interaction reference tables still to add

- **CYP3A4 inhibitor / inducer / substrate matrix** — already partial via drug-card interaction fields; a dedicated cross-reference table would be high-value (by inhibition strength: strong / moderate / weak; clinically significant substrates with narrow TI)
- **P-gp inhibitor / inducer / substrate matrix** — critical for DOACs (dabigatran, rivaroxaban, apixaban), immunosuppressants (cyclosporine, tacrolimus), digoxin, oncology agents
- **MAOI washout / serotonergic switch matrix** — washout periods when switching from/to MAOIs, SSRIs, SNRIs, TCAs, linezolid, methylene blue; risk-stratified by serotonin syndrome potential

### 14.2 Already present

Serotonin syndrome (`tox_serotonin_syndrome`), NMS (`tox_nms`), anticholinergic toxidrome, QT-prolonging drugs (`di_qt`), drug-induced SIADH (`di_hyponatremia`), drug-induced hyperkalemia (`di_hyperkalemia`), drug-induced parkinsonism (`di_parkinsonism`), peripheral neuropathy (`di_neuropathy`), lupus (`di_lupus`), photosensitivity (`di_photosensitivity`), grapefruit (`drug_food_grapefruit`), caffeine/tyramine (`drug_food_caffeine_others`) all present.

---

## 15. Practice management & professional content

### 15.1 Already present

Anaphylaxis ER protocol, naloxone dispensing (`naloxone_thn_workflow`), penicillin de-labelling (`pen_fast_delabeling`), polypharmacy/deprescribing, pharmacist scope by province (`pharmacist_scope_provinces`), medication safety, MedsCheck (`medscheck_workflow`), cannabis dispensing (`cannabis_dispensing`), hazardous drug handling (`hazardous_drug_handling`), drug recall workflow (`drug_recall_workflow`), hospital-to-community transition (`hospital_community_transition`), pharmacist injection technique (`pharmacist_injection_technique`) — all present.

### 15.2 Still to add

- **MAID Drug Protocol** — dedicated reference table (see §3.1 above)
- **Sterile compounding workflow (USP 797)** — community-pharmacy scope for sterile preparations; PPE, BUD, environmental monitoring basics
- **Robbery & burglary preparedness** — pharmacy security; controlled substance protection; Health Canada/OCP reporting; staff safety protocol
- **Quality assurance / continuous improvement** — Pharmacy Practice Management Standards (CPhA); accreditation requirements per province (OCP Quality Assurance Program)
- **Jurisprudence expansions** — see §7.3 above

---

## 16. Search & UX improvements

### 16.1 Search
- Drug-class / acronym search ("PPI", "DOAC", "SGLT2i" → family card)
- Indication search ("what treats acne?")
- Side-effect reverse search
- NAPRA-schedule filter

### 16.2 Mobile
- Test on iOS Safari + Android Chrome
- Touch-friendly tab navigation
- Offline caching (Service Worker)

### 16.3 Accessibility
- WCAG 2.1 AA compliance audit
- Screen-reader testing (NVDA, JAWS, VoiceOver)
- Keyboard navigation
- High-contrast mode
- Text-size adjustment

### 16.4 Print
- Print-friendly disease counselling sections
- Print-friendly action plans (asthma, COPD, anaphylaxis)
- Print-friendly drug counselling scripts

### 16.5 Bookmarking / persistence
- Browser localStorage for recently-viewed cards
- Pinned shortcuts to favourite tables
- Custom note-taking on cards (private, browser-side only)

---

## 17. Maintenance / data hygiene

### 17.1 Periodic refresh items

- **Guideline currency** — quarterly sweep for cited guidelines that have been updated:
  - Diabetes Canada (2024+ — check annually)
  - Hypertension Canada (annual)
  - CCS (cardiology — annual updates)
  - CTS (respirology)
  - CANMAT (mood, anxiety — next update expected 2026)
  - SOGC (women's health, obstetrics)
  - AMMI Canada Bugs & Drugs (annual)
  - NACI Statements (ongoing)
  - Health Canada Drug Safety Risk Communications (ongoing)
  - Beers Criteria (every ~3 years — next ~2026)
  - STOPP-START (every ~5–10 years)
- **Health Canada Drug Schedule Regulations** updates — NAPRA scheduling changes
- **ODB Formulary** updates — Limited Use criteria changes
- **Drug shortage database** — current shortages and alternatives

### 17.2 Automated audits to schedule

(Already documented in AGENTS.md §22; mention here for completeness)

- Orphan reference tables (data exists but not in `buildReference()`)
- Disease conditions missing `preg_lact_summary`
- `treatment.agents` containing keys not in DRUGS/VACCINES (or NON_PHARM_AGENTS)
- DRUGS without PREG_DATA, NAPRA_ODB_DATA, FAMILY_MAP entries
- Non-canonical interaction severities
- Non-canonical row.type values
- DRUG_FAMILIES with missing `members`, `comparison`, or `pearls`

### 17.3 Documentation hygiene

- Update ROADMAP.md (this file) when items are completed
- Append to AUDIT-CONTENT.md after each FV audit cycle
- Regenerate AUDIT-STATUS.md after every content PR

---

## 18. How to prioritize

When picking items from this list, weight by:

1. **Pharmacist daily-use frequency** — community pharmacists see hypertension, diabetes, asthma, GERD, insomnia, pain, depression, anxiety, contraception, vaccines daily.
2. **Liability profile** — pure reference + Canadian context = safest. Anything that requires user input to produce output requires extra design care or should be excluded entirely.
3. **Existing-content gap** — verify the topic isn't already covered before adding (the app is now very complete; check AUDIT-STATUS.md first).
4. **Provincial-scope expansion value** — content that empowers pharmacist prescribing has high value but must be province-tagged.
5. **Canadian-specific** — content not readily available in Lexicomp/Micromedex/UpToDate (ODB LU codes, provincial scope, NACI schedules) is highest value.

### Quick-impact ranking (updated 2026-05-19 — items 1–9 confirmed present)

All previously listed top-10 items are now confirmed present. The catalog is highly complete. Remaining gap items are lower-priority enhancements:

1. ~~MAID Drug Protocol~~ ✅ `maid_drug_protocol` present
2. ~~Inhaler technique~~ ✅ `inhaler_technique` present
3. ~~CYP3A4 + P-gp interaction matrices~~ ✅ `cyp3a4_matrix` + `pgp_matrix` present
4. ~~MAOI washout / serotonergic switch matrix~~ ✅ `maoi_washout` present
5. ~~Pregnancy-safe medication algorithms~~ ✅ `pregnancy_safe_meds` present
6. ~~Frailty assessment tools~~ ✅ `frailty_tools` present
7. ~~Falls-risk medication reference table~~ ✅ `falls_risk_meds` present
8. ~~Pediatric KIDs list~~ ✅ `kids_list` present
9. ~~Local antibiogram / AMR trends~~ ✅ `antibiogram` present
10. ~~Jurisprudence expansion~~ ✅ All 7 topics confirmed present

**Remaining genuine gaps (lower priority):**
1. Sterile compounding workflow (USP 797) — community-pharmacy sterile prep scope; PPE, BUD, environmental monitoring
2. Robbery & burglary preparedness — controlled substance protection; Health Canada/OCP reporting; staff safety
3. Quality assurance / continuous improvement — OCP QAP; accreditation requirements
4. Adherence assessment tools — Morisky-8, CUDIT-R; motivational-interviewing reference
5. New-start counselling templates per drug class — beyond existing `patient_counseling` fields

### Liability red flags to remember

- "Calculator" = ❌
- "Decision support for a specific patient" = ❌
- "Recommend the right drug for X person" = ❌
- "Adjust dose based on inputs" = ❌
- "Reference table" = ✅
- "Counselling script" = ✅
- "Workflow chart" = ✅
- "Canadian-specific context" = ✅
- "Citation hierarchy" = ✅

### Container-hierarchy red flags to remember

- "Adding a new tab" = 🛑 STOP — discuss with user first (the 9 tabs are architectural)
- "Adding a new disease category (top-level header on Diseases home)" = ❌ (the 20 categories are closed; use an existing one)
- "Adding a new Reference category (top-level header on Reference home)" = ❌ (the 9 categories are closed; extend an existing one's dispatch array)
- "Adding a new disease condition inside an existing category" = ✅ (just don't duplicate scope of an existing condition)
- "Adding a new reference table inside an existing Reference category" = ✅ (add the new ID to the category's existing dispatch array)
- "Adding a new drug card / drug family / vaccine / deprescribing protocol" = ✅ (just don't duplicate)
- "Creating a duplicate disease for a slightly different patient subgroup when an existing card already covers it" = ❌ (extend the existing card instead)

See `AGENTS.md` §24 for the full discovery-command toolbox before adding content.

---

**End of roadmap.** Last updated 2026-05-19. As items are completed, move them to the completed section above and remove from the gap lists. As new gaps are identified during audits, append them to the relevant section.
