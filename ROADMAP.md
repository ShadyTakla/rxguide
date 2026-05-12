# ROADMAP.md — rxguide Future Updates & Content Gaps

**Purpose:** Catalogue of high-value, low-liability content and feature additions that would make rxguide a more complete Canadian community-pharmacy reference tool, *without* crossing the line into patient-specific clinical decision support.

**Audience:** Future contributors (human or AI). Pick from this list when looking for high-impact work. Cross-reference against existing content (see AGENTS.md §14) before adding to avoid duplication.

**Last updated:** 2026-05-12

---

## Table of contents

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

Anything in this ROADMAP that gets close to the DCS line should be designed as a published table or a counselling script, not as a personalized calculator.

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

When in doubt about a feature idea: would CPS, RxFiles, or Bugs & Drugs publish this as a table or chapter? If yes → safe. If it requires user input to compute a recommendation → not safe.

---

## 3. High-value reference content gaps

These are the "top of the pile" items — high practical value for Canadian community pharmacists, low liability, fits cleanly into the existing data model.

### 3.1 Top priorities (next 6–12 PRs)

1. **HFrEF GDMT titration ladder reference**
   - Published stepwise quadruple-therapy titration (ARNI/ACEi/ARB + β-blocker + MRA + SGLT2i) from CCS HF 2025
   - STRONG-HF-derived monitoring schedule (BP, K, SCr, eGFR at days 7, 14, 30, 90)
   - Dose-doubling cadence per drug + target dose table
   - Hold/down-titration triggers
   - Section in `acute_heart_failure` and `hfref` cards; could also be a Reference table

2. **DOAC switching matrix (reference table)**
   - Warfarin → DOAC: hold warfarin, start DOAC when INR <2.0 (apixaban, rivaroxaban) or INR <2.5 (dabigatran, edoxaban)
   - DOAC → warfarin: overlap rules per agent
   - DOAC → DOAC: timing rules
   - DOAC → parenteral anticoagulant (UFH/LMWH/fondaparinux): timing per agent
   - Perioperative hold rules per CrCl + bleeding risk
   - Already partially in `practice/anticoagulation_bridging` — could expand

3. **HIV PrEP / PEP**
   - PrEP: TDF/FTC daily vs on-demand (2-1-1 for cisgender MSM); TAF/FTC; long-acting cabotegravir; eligibility criteria; baseline + follow-up labs; provincial coverage
   - PEP: window (72 h); regimen options (TDF/FTC + dolutegravir or raltegravir); 28-day course; baseline + week 6/12 testing
   - Pharmacist scope is expanding (BC, AB, SK — Ontario in progress)

4. **Hormonal contraception expansion**
   - Methods comparison chart (efficacy by typical vs perfect use, contraindications, MEC categories)
   - Missed-dose decision trees per formulation (COC monophasic, COC multiphasic, POP traditional, POP drospirenone 24-h window, ring, patch)
   - Enzyme-inducer interaction matrix (LARC alternatives for women on rifampin, carbamazepine, phenytoin, St. John's Wort, efavirenz, etc.)
   - Pharmacist prescribing scope by province (Schedule II contraceptives; in BC/AB/SK/PEI pharmacists can prescribe hormonal contraception)

5. **Therapeutic interchange / NTI substitution rules**
   - Narrow-therapeutic-index drugs (Health Canada list): warfarin, levothyroxine, cyclosporine, tacrolimus, phenytoin, carbamazepine, valproate, lithium, theophylline, digoxin
   - Substitution rules per province (most: no automatic substitution without prescriber notification)
   - Brand-name preservation rules for the patient's currently stable dose
   - Documentation/notification workflow

6. **Diabetes Canada 2024+ algorithm reference**
   - A1C-based stepwise algorithm (lifestyle → metformin → second-line based on ASCVD/HF/CKD presence)
   - SGLT2i preferred in HF and CKD; GLP-1 RA preferred in ASCVD
   - Tirzepatide + retatrutide positioning
   - Insulin starting algorithm and titration ladder
   - Existing `t2dm` card has agents but not the structured stepwise algorithm

7. **Long-acting injectables (LAI) for SUD/psychiatry**
   - Buprenorphine ER (Sublocade, Brixadi) — induction timing, missed-dose rules, observed-dosing requirements
   - Naltrexone IM (Vivitrol) — 7–10 day opioid-free required, alcohol abstinence
   - Aripiprazole, paliperidone, risperidone LAIs — switching from oral, missed-dose
   - Pharmacist administration scope (Ontario: pharmacists can administer many LAIs under MD order)

8. **Penicillin allergy de-labeling formal protocol**
   - Existing `practice/penicillin_allergy_delabeling` covers the concept; could expand with:
   - PEN-FAST score (Trubiano JAMA Intern Med 2020): low/moderate/high risk
   - Direct oral challenge protocol for low-risk patients
   - Skin testing referral criteria
   - Documentation template for the "removed from allergy list" workflow
   - ASCIA Australasian guideline + Canadian Society of Allergy & Clinical Immunology

### 3.2 Secondary priorities (after 3.1)

9. **NEW: Hyperkalemia management reference**
   - Acute (ECG changes, K+ >6.5 with symptoms): calcium gluconate, insulin+glucose, β-agonist nebulizer, sodium bicarbonate (acidosis), Kayexalate vs patiromer vs sodium zirconium cyclosilicate
   - Chronic / outpatient: dietary, RAS-blockade titration, patiromer / sodium zirconium cyclosilicate

10. **NEW: Hyponatremia management reference**
   - Algorithmic workup (volume status × urine Na × urine osm)
   - SIADH causes drug-by-drug
   - Correction speed (max 8 mmol/L/24h to avoid ODS)
   - Tolvaptan use
   - Already a card; could deepen with structured correction-speed reference table

11. **NEW: Status epilepticus management reference**
   - First-line BZD dosing per route + age
   - Second-line AED (levetiracetam, valproate, phenytoin/fosphenytoin)
   - Refractory protocol (anesthetic agents)
   - Already in `tox_status_epilepticus` ref table; expand with new-onset SE-specific workup

12. **NEW: Asthma action plan template**
   - Green/yellow/red zone definitions
   - Trigger education
   - Inhaler technique counselling per device
   - SABA-only use as a red flag (GINA 2023+ — Track 1: ICS-formoterol PRN preferred)
   - Already in `asthma` card; could add a printable action plan section

13. **NEW: COPD action plan template**
   - Similar to asthma but with exacerbation Rx (steroid burst + antibiotic indication criteria — Anthonisen 1987)
   - Pulmonary rehab referral criteria

14. **NEW: Insulin titration reference (basal + prandial)**
   - Starting doses (0.1–0.2 U/kg basal)
   - Titration rules (e.g., 2 U every 3 days until FBG 4–7 mmol/L)
   - Switching between basal insulins (NPH → glargine → degludec dose-equivalence)
   - Hypoglycemia mitigation
   - Sick-day rules (sliding scale concept without an actual scale)
   - Diabetes Canada 2024+ recommendations

15. **NEW: Antimicrobial duration cheat sheet**
   - Common infections + Canadian-shortened durations (Bugs & Drugs / IDSA)
   - Cystitis 3-day; pyelonephritis 5–7 day; CAP outpatient 5-day; cellulitis 5-day; community ABRS 5–7 day
   - "When 7 days isn't actually 7 days" — published evidence for shortened courses

16. **NEW: Sick-day medication rules**
   - SADMANS mnemonic (Sulfonylureas, ACEi, Diuretics, Metformin, ARBs, NSAIDs, SGLT2i) — hold during acute illness
   - Insulin sick-day rules (do NOT hold; may need extra)
   - Steroid stress-dose rules (already in corticosteroid_taper protocol; cross-reference)
   - Anticoagulant rules during illness
   - For diabetes specifically: BG monitoring frequency, ketone monitoring

---

## 4. Disease/condition cards still to add

These are conditions a Canadian community pharmacist sees regularly that don't currently have a dedicated card. Liability is low — pure reference content.

### 4.1 Common conditions not yet covered

| Category | Condition | Rationale |
|---|---|---|
| **Cardiology** | Long QT syndrome (LQTS) | Common reason for pharmacist QT-stacking screening; existing CrossCheck warnings cover the drugs but no condition card |
| **Cardiology** | Pulmonary embolism / DVT — outpatient | DOAC monotherapy outpatient protocols; cancer-associated VTE has its own nuances |
| **Endocrine** | Adrenal insufficiency | Stress dosing rules; MedicAlert counselling — pharmacist is often the first encountered |
| **Endocrine** | Subclinical hypothyroidism | When to treat per TSH/age; CTS + Canadian Thyroid Association |
| **Gastroenterology** | Microscopic colitis | (Round 2 added this — verify entry exists) |
| **Hematology** | Iron deficiency anemia (oral + IV) | Distinct from iron deficiency without anemia; ferritin thresholds (<30 mcg/L iron-deficiency cutoff vs <100 in inflammation) |
| **Hematology** | B12 deficiency | Schilling-test era replaced by methylmalonic acid / homocysteine; CPS recommends serum B12 + MMA |
| **Infectious** | Recurrent UTI | Behavioural Mx (post-coital voiding, hygiene), cranberry evidence-summary, methenamine, vaginal estrogen (post-menopausal), continuous low-dose prophylaxis options |
| **Infectious** | Asymptomatic bacteriuria | When NOT to treat — important pharmacist counselling for screening pre-procedure, pregnancy |
| **Infectious** | C. difficile colitis | Already a CrossCheck topic; could be its own card with fidaxomicin / vancomycin / bezlotoxumab / FMT structured |
| **Nephrology** | Acute kidney injury (AKI) | KDIGO staging; nephrotoxin medication review; sick-day rules cross-link |
| **Neurology** | Restless legs syndrome (RLS) | Iron-deficient subtype (ferritin <75 → IV iron); α2δ ligands; AVOID dopamine agonists (augmentation) — CCN |
| **Ophthalmology** | Allergic conjunctivitis | OTC antihistamine drops, mast-cell stabilizers — common pharmacist counselling |
| **Ophthalmology** | Dry eye disease | OTC + Rx options; PRP eye drops emerging |
| **Pain** | Trigeminal neuralgia | Carbamazepine first-line; pharmacist HLA-B*1502 screening in Asian-ancestry patients |
| **Pediatrics** | Bronchiolitis | Supportive only; AVOID albuterol routine; CPS-specific |
| **Pediatrics** | Croup | Single-dose dexamethasone; nebulized epinephrine for severe |
| **Pediatrics** | Acute otitis externa (swimmer's ear treatment, not prevention) | Topical Ciprodex; pain; differentiate from AOM |
| **Pediatrics** | ADHD diagnosis & first-line Mx | Diagnostic criteria, stimulant + non-stimulant choices, vacation periods, monitoring |
| **Psychiatry** | Anxiety disorders (GAD, panic, social) | CANMAT 2014 anxiety guideline; SSRI first-line; psychotherapy emphasis |
| **Psychiatry** | OCD | (Round 2 verified) — make sure pharmacist scope OCD-specific psychoeducation present |
| **Psychiatry** | PTSD | VA/DoD + CANMAT — SSRI first-line, prazosin for nightmares, trauma-focused CBT |
| **Respirology** | Obstructive sleep apnea (OSA) | CPAP > weight loss + positional > MAD > surgery; insurance + provincial coverage; pharmacist counselling on adherence |
| **Respirology** | Allergic rhinitis | INCS vs oral antihistamine vs combination; pharmacist scope (Schedule II/III access); pediatric considerations |
| **Rheumatology** | Polymyalgia rheumatica (PMR) | Already exists? Verify. Common in elderly; pharmacist watches for GCA red flags |
| **Sexual health** | Erectile dysfunction | (Already exists) — verify modernization; tadalafil daily vs PRN; cardiac assessment |
| **Sexual health** | Premature ejaculation | Dapoxetine; off-label SSRI |
| **Sexual health** | Menopause symptom management | MHT (estradiol patch vs oral; micronized progesterone; vaginal estrogen); SSRI/SNRI for vasomotor; ospemifene; CMS 2023 guideline |
| **Womens health** | PCOS | Diagnostic criteria, metformin, COC, spironolactone, GLP-1 emerging |
| **Womens health** | Endometriosis | (Verify if exists) — NSAIDs, COC, GnRH agonist + add-back, elagolix, dienogest |
| **Womens health** | Pregnancy counselling (general) | Folic acid pre-conception; live vaccine avoidance; medication-class avoidance list |
| **Womens health** | Lactation counselling (general) | Most drugs compatible; specific avoid list; volume effects (estrogen → milk supply) |

### 4.2 Specialty / less-common conditions still high-yield

| Category | Condition | Rationale |
|---|---|---|
| **Cardiology** | Brugada syndrome | QT-stacking risk amplifier; pharmacist screening |
| **Cardiology** | Catecholaminergic polymorphic ventricular tachycardia (CPVT) | Same — β-blocker / flecainide reference |
| **Endocrine** | Diabetes insipidus | (Round 2 added — verify) |
| **Endocrine** | Cushing syndrome | (Round 2 added — verify) |
| **Hematology** | Sickle cell disease | Hydroxyurea, voxelotor, crizanlizumab, transfusion thresholds, vaccination, opioid analgesic counselling |
| **Hematology** | Thalassemia | Transfusion + chelation, luspatercept, gene therapy |
| **Hematology** | Polycythemia vera | Hydroxyurea, ruxolitinib, ropeginterferon |
| **Hematology** | Essential thrombocythemia | Hydroxyurea, anagrelide, ASA |
| **Hematology** | Immune thrombocytopenia (ITP) | Corticosteroids, IVIG, romiplostim, eltrombopag |
| **Neurology** | Myasthenia gravis | Pyridostigmine, prednisone, IVIG, plasmapheresis, eculizumab, ravulizumab, efgartigimod |
| **Neurology** | Tourette syndrome | Pimozide / haloperidol / aripiprazole; behavior therapy primary |
| **Oncology** | Tumor lysis syndrome | Allopurinol, rasburicase, IV hydration — pharmacist role significant |
| **Oncology** | Chemotherapy-induced peripheral neuropathy | Duloxetine; pregabalin; no prevention currently approved |
| **Oncology** | Cancer-related fatigue | Methylphenidate, modafinil, exercise prescription |
| **Practice** | Anaphylaxis ER protocol | (Exists — verify modernization; EpiPen vs Auvi-Q vs Neffy nasal) |
| **Practice** | Opioid stewardship | Tapering, MOUD induction (sublingual buprenorphine, methadone), naloxone universal dispensing |

---

## 5. Drug family/card gaps

### 5.1 Drug cards that should exist but don't

Detected from earlier audits where `treatment.agents` referenced a missing key:

- `vitamin_e` (referenced from peyronies_disease — Round 2 fix left it unresolvable; actually now added in PR #42)
- `avanafil` (added PR #33)
- `conjugated_estrogen` — still missing (used in AUB acute hormonal therapy)
- `elagolix` — still missing (used in AUB GnRH antagonist row)
- `ethinyl_estradiol_norethindrone` — alternative key for the COC combo (use `ethinyl_estradiol` + `norethindrone` as separate keys?)
- `atropine` (topical) — only `atropine_pralidoxime` exists; ophthalmology atropine 1% drops have no dedicated card
- `dasiglucagon` — newer ready-to-use glucagon (Zegalogue); growing market
- `glucagon_nasal` — currently mapped under generic `glucagon`; brand-specific card useful
- `diazoxide` — for insulinoma + neonatal hypoglycemia
- `octreotide` — only family map; verify drug card

### 5.2 Drug-family cards that should exist

- **Combined Hormonal Contraceptives** — currently exists; verify completeness
- **Levonorgestrel Intrauterine System** — singleton family
- **Anti-CGRP Monoclonal Antibodies / Gepants** — eptinezumab, erenumab, fremanezumab, galcanezumab, ubrogepant, rimegepant, atogepant, zavegepant nasal (these may exist — verify)
- **SGLT2 Inhibitors (Cardioselective)** — empagliflozin + dapagliflozin in HF (verify family completeness)
- **GLP-1 Receptor Agonists** — semaglutide, liraglutide, dulaglutide, exenatide, lixisenatide, tirzepatide (GIP/GLP-1 — different family), retatrutide (triple agonist — pipeline)
- **Bile Acid Sequestrants** — cholestyramine, colestipol, colesevelam
- **Sodium-Glucose Co-Transporter Inhibitors (SGLT2i)** — verify
- **Mineralocorticoid Receptor Antagonists (MRAs)** — spironolactone, eplerenone, finerenone (FIDELIO + FIGARO)
- **Mineralocorticoid Antagonists (Non-Steroidal Selective)** — finerenone alone (less hyperK)
- **Vasopressin Receptor Antagonists** — tolvaptan, conivaptan
- **Anti-Histamine Combination Eye Drops** — olopatadine, alcaftadine, ketotifen
- **Topical Calcineurin Inhibitors** — tacrolimus, pimecrolimus (singleton verify)
- **Topical PDE4 Inhibitors** — crisaborole, roflumilast topical
- **Aryl Hydrocarbon Receptor Agonists** — tapinarof (singleton)
- **JAK 1/2/3 Inhibitors (selective)** — sub-family — upadacitinib JAK1, ritlecitinib JAK3, filgotinib JAK1, baricitinib pan-JAK
- **Anti-IL-17 Family** — secukinumab, ixekizumab, brodalumab, bimekizumab (bispecific A/F)
- **Anti-IL-23 (p19 selective)** — guselkumab, risankizumab, tildrakizumab, mirikizumab
- **Anti-IL-12/23 (p40)** — ustekinumab (older)
- **Anti-amyloid β Monoclonal Antibodies** — aducanumab, lecanemab, donanemab (verify these exist together)
- **PARP Inhibitors** — olaparib, rucaparib, niraparib, talazoparib
- **S1P Receptor Modulators** — fingolimod, ozanimod, ponesimod, siponimod
- **Sphingosine-1-Phosphate Lyase Inhibitors** (emerging — investigational, may not yet warrant a card)
- **Anti-CD20 Monoclonal Antibodies** — rituximab, obinutuzumab, ocrelizumab, ofatumumab_ms, ublituximab (verify family completeness)
- **Anti-CD38 Monoclonal Antibodies** — daratumumab, isatuximab (multiple myeloma)
- **Anti-CD79b ADCs** — polatuzumab vedotin
- **CAR-T Cell Therapies** — tisagenlecleucel, axicabtagene, lisocabtagene, brexucabtagene, idecabtagene, ciltacabtagene
- **Bispecific T-Cell Engagers (BiTEs)** — blinatumomab, mosunetuzumab, glofitamab, epcoritamab, talquetamab, teclistamab, elranatamab
- **Antibody-Drug Conjugates** — broad class — trastuzumab emtansine, trastuzumab deruxtecan, enfortumab vedotin, sacituzumab govitecan, mirvetuximab soravtansine, trastuzumab duocarmazine

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

### 6.1 New reference tables (high pharmacist value)

| Table | Category | Why |
|---|---|---|
| **Drug-Lab Interference** | Lab Reference | biotin (TSH, troponin), heparin (aPTT), warfarin (PT/INR), thyroid medications, beta-blockers (catecholamine assays), proton pump inhibitors (gastrin, chromogranin) |
| **High-Alert Medications** (ISMP Canada) | Med Safety | Already partial — expand to full ISMP Canada list |
| **Look-Alike/Sound-Alike (LASA)** | Med Safety | Already exists — expand pediatric-specific and oncology-specific subsections |
| **Tall-Man Lettering Standard List** | Med Safety | ISMP Canada published list |
| **Therapeutic Drug Monitoring (TDM) targets** | Lab Reference | Vancomycin AUC vs trough; aminoglycoside; digoxin; lithium; valproate; phenytoin; tacrolimus; cyclosporine; sirolimus; everolimus; methotrexate (oncology); 6-mercaptopurine metabolites |
| **Renal Dose-Adjustment Tables** | Renal Reference | Per drug class; CrCl thresholds and specific dose recommendations. **Publish the table only — never compute** |
| **Hepatic Dose-Adjustment Tables** | Hepatic Reference | Child-Pugh A/B/C per drug class |
| **Pharmacogenomic Drug-Pair References** (CPIC) | Pharmacogenomics | HLA-B*5701 (abacavir), HLA-B*1502 (carbamazepine in Asian-ancestry), CYP2C19 (clopidogrel, PPI), CYP2D6 (codeine, tamoxifen, antidepressants), TPMT/NUDT15 (thiopurines), DPYD (fluoropyrimidines), G6PD (rasburicase, dapsone, primaquine) |
| **Antimicrobial-Resistance / Local Antibiogram** | Antibiotic Reference | National + provincial trends (Ontario antibiogram); link to Bugs & Drugs |
| **IV Compatibility Chart** | Hospital Reference | Y-site compatibility for common ICU drugs — published Trissel chart |
| **Crushable / Non-Crushable Medication List** | Med Safety | Sustained-release, enteric-coated, biologics, hazardous drugs (USP <800>) |
| **NG-Tube / Feeding-Tube Medication Compatibility** | Med Safety | Liquid vs crush + suspend in water; light-sensitive; med-feed interaction (e.g., phenytoin + tube feeds, levothyroxine + soy, ciprofloxacin + dairy) |
| **Hazardous Drug Handling (USP <800>)** | Practice | List of NIOSH Group 1/2/3 drugs; PPE; closed-system transfer devices; pharmacist responsibility |
| **Oral Antineoplastic Patient Counselling** | Oncology | Per-drug patient counselling key points for orals (capecitabine, sunitinib, imatinib, palbociclib, etc.) |
| **Common Drug-Induced Conditions** | Adverse Effects | Drug-induced lupus, drug-induced parkinsonism, drug-induced hypertension, drug-induced hyperkalemia, drug-induced hyponatremia, drug-induced QT prolongation, drug-induced peripheral neuropathy, drug-induced photosensitivity, drug-induced pulmonary fibrosis — already partial; could be its own category |
| **Black Box / Boxed Warnings (Canadian)** | Med Safety | Health Canada Risk Communication archive |
| **Drug Shortage Mitigation Strategies** | Practice | Common shortages and clinical-equivalent substitutes; Health Canada drug shortages portal |
| **MedsCheck Eligibility & Workflow** (Ontario) | Practice | MedsCheck Annual, Diabetes, At Home, LTC — eligibility, billing codes, documentation requirements |
| **Pharmacist Prescribing Scope by Province** | Practice | Comparison chart — what each province allows (minor ailments, contraception, smoking cessation, travel, vaccine, controlled substances) |
| **Naloxone Take-Home Kit Workflow** | Practice | Provincial coverage; training requirements; pharmacy stocking; expanded scope (e.g., Ontario Free Naloxone Program at participating pharmacies) |
| **MAID Drug Protocol (Medical Assistance in Dying)** | Practice | Pharmacist scope (some provinces allow pharmacist participation); drug kit composition; documentation |
| **Hospital-to-Community Transition Workflow** | Practice | BPMH at discharge; medication reconciliation; high-risk drug review |

### 6.2 Existing reference tables to expand

- **Allergy Cross-Reactivity** — already 5 tables; could add:
  - Sulfa allergy (antibiotic vs non-antibiotic sulfas — minimal cross-reactivity)
  - β-lactam side-chain cross-reactivity matrix (cefazolin vs cephalexin vs amoxicillin)
  - NSAID-induced rhinorrhea/asthma (AERD/Samter)
- **Drug-Food Interactions** — already 5; could add:
  - Tyramine-restricted foods (MAOI list — already in isocarboxazid card, could be its own ref)
  - Vitamin K-containing foods (warfarin)
  - Calcium / iron / dairy + FQ / tetracycline / levothyroxine timing chart
- **Geriatric Beers/STOPP-START** — already 2; could add:
  - Pediatric high-risk medication list (KIDs list)
  - Pregnancy/lactation high-risk medication list

---

## 7. Pharmacist scope & workflow content

### 7.1 Provincial pharmacist scope-of-practice quick references

Since most of rxguide is Ontario-default, expand the scope content for each province:

- **Ontario** — comprehensive (existing baseline)
- **BC** — full prescribing for minor ailments + contraception + adapt + renew
- **Alberta** — APA (Additional Prescribing Authorization) — broadest in Canada
- **Saskatchewan** — Pharmacist Initial Access (broader than ON)
- **Nova Scotia** — Cape Breton pilot; expanding
- **New Brunswick** — minor ailments expanding
- **PEI** — contraception + minor ailments
- **Newfoundland & Labrador** — basic adapt only
- **Manitoba** — restricted; growing
- **Quebec** — Bill 31 (2015) + 2024 expansions; provincial regulations differ significantly

A simple comparison table (province × scope category) would be high-value.

### 7.2 Workflow templates / counselling scripts

For every common dispensing scenario, a structured counselling-script reference. Could be a new tab category or section within existing drug cards. Examples:

- **New start counselling** template per drug class (anticoagulant, insulin, opioid, statin, antibiotic, biologic injectable, etc.)
- **Refill / continuation counselling** — what to ask, what to flag
- **Sick-day counselling** — extending from §3.1 #16
- **Travel counselling per drug class** (already partial in travel medicine; expand for diabetes, anticoagulant, immunosuppressant)
- **Transitions of care** — discharge med rec, BPMH, hospital-to-community
- **Adherence assessment** — Morisky-8, validated questionnaires; motivational-interviewing prompts

### 7.3 Jurisprudence expansion

Current 15 topics cover Ontario well. Expand for:
- **Privacy & PHIPA** in pharmacy context (specific scenarios: family member pickup, employer requests, court orders, fax errors)
- **Cannabis & cannabis-derived medications** (legal landscape; NACI; pharmacist role in dispensing CBD vs medical cannabis)
- **Conscientious objection** (e.g., contraception, MAID drugs, naloxone) — OCP and CCAPP positions
- **Pharmacy ownership / corporate practice** rules in Ontario (the 80/20 rule; banking; multi-pharmacy ownership)
- **Substitution refusal documentation**
- **Verbal Rx received from prescriber** — proper documentation
- **OAT (opioid agonist therapy) regulations** — methadone witness rules, takeaway carries, missed doses, urine drug screens
- **Compounding regulations** (USP 795 non-sterile, USP 797 sterile, USP 800 hazardous)
- **Continuing Professional Development (CPD)** — OCP CE-PLUS / CE record-keeping
- **Pharmacist liability & insurance** — Pharmacy Mutual Insurance Company (PMIC); reportable events

---

## 8. Patient-counselling content

### 8.1 Counselling scripts (standardized format)

For every drug card, ensure a `counselling` field is present with:
- **What is this medication for** (one sentence)
- **How to take it** (timing, food, dose)
- **What to expect** (onset, common side effects, when to call)
- **Red flags** (when to seek urgent care)
- **Storage / handling** (especially injectables, biologics, opioids, controlled substances)
- **Missed dose**
- **Pregnancy / breastfeeding** (if applicable)

Some cards already have counselling content; many do not. A systematic audit would surface gaps.

### 8.2 Disease-specific counselling sheets

For each disease card, a separately-renderable patient counselling section in plain language:
- What is X
- Why does it happen
- How is it diagnosed
- What can the patient do (lifestyle)
- What are the medication options
- When to call the pharmacist / MD

The existing `introduction` field is plain-language but tends to be brief; a dedicated counselling section would be longer and more practical.

### 8.3 Counselling cards for specialty / device-based products

- **Auto-injectors** — Epi (EpiPen, Auvi-Q, Allerject, Neffy nasal); buprenorphine (Sublocade by HCP; office-administered); insulin (pen vs vial); GLP-1 (weekly pen formulations); biologic SC injectables
- **Inhalers** — pMDI + spacer technique; DPI technique; SMI (Respimat) technique
- **Eye drops** — instillation technique; nasolacrimal occlusion; spacing between drops
- **Nasal sprays** — priming, technique, alternating nostrils
- **Suppositories / pessaries / vaginal creams**
- **Transdermal patches** — rotation, removal, hot weather effects
- **PEG / NG tube administration**

---

## 9. Cross-app integration & navigation gaps

### 9.1 Search improvements

- **Drug-class search** — typing "PPI" or "DOAC" should surface the family card
- **Symptom search** — typing "rash" should surface dermatology conditions
- **Brand-name search** — strict canonical name + alias inclusion (existing aliases cover ~70 brands; could be 200+)
- **Reverse lookup** — typing a side effect surfaces the drugs that commonly cause it
- **Pregnancy-category search** — filter drugs by pregRisk bucket
- **NAPRA-schedule search** — filter by Schedule I/II/III/U; useful for "what can I sell OTC" queries

### 9.2 Navigation / cross-linking

- **From a drug card → list of disease cards using that drug** ("Used in conditions:")
- **From a disease card → relevant deprescribing protocol(s)** (if any apply)
- **From a disease card → relevant minor ailment** (if any applies, e.g., dyspepsia minor ailment from GERD card)
- **From a family card → all member drug cards** (currently exists; verify completeness)
- **From an interaction → both drug cards bidirectionally**
- **From a reference table → related drugs / conditions / minor ailments**

### 9.3 Recent / favorites / pinned

- **Recently viewed cards** (browser localStorage; minimal liability — just navigation)
- **Pinned references** for quick re-access
- **Print-friendly view** for patient handouts (some cards' counselling sections; not the full card)

---

## 10. Pregnancy / lactation expansion

### 10.1 Per-drug content

PREG_DATA exists for ~1,100 drugs; most have brief `pregDetail` / `bfDetail`. Could deepen with:

- **Trimester-specific risk** (already structured for ~40 drugs; expand)
- **Lactation transfer data** — milk:plasma ratio, infant exposure %, LactMed risk category
- **Pre-conception planning** advice (folic acid, methotrexate washout, isotretinoin washout, retinoid washout)
- **Inadvertent first-trimester exposure** counselling per drug
- **Breastfeeding mother's medication choices** (e.g., asthma flare, depression, migraine, GERD)

### 10.2 Reference content

- **Pregnancy-safe medication algorithms** by indication (nausea/vomiting, headache, heartburn, constipation, allergic rhinitis, common cold, UTI, vaginitis, mastitis, mastitis-associated abscess)
- **Teratogen registry** — Mother-Risk replacement (defunct since 2019); link to MotherToBaby (US) and Canadian sources
- **Lactation-incompatible drug list** with alternatives
- **Folate / iron / iodine / vitamin D supplementation** in pregnancy + lactation

---

## 11. Vaccine content gaps

### 11.1 Vaccines that should exist

- Yellow fever (verify — should be there given travel content)
- Japanese encephalitis (verify)
- Tick-borne encephalitis (TBE) — Health Canada SAP product
- Cholera — Dukoral (oral) + injectable
- Typhoid — Vivotif (oral) + Typhim Vi (IM)
- Rabies pre-exposure + post-exposure
- Polio (IPV adult booster for travelers)
- Smallpox / monkeypox (Imvamune)
- BCG (rare; travel + occupational)
- Q fever vaccine (Australia-only; mention for occupational exposure)
- Anthrax vaccine (military)
- Plague vaccine (lab worker)

### 11.2 Vaccine content depth

For each vaccine card:
- Schedule per age (Ontario routine + catch-up)
- Co-administration rules
- Live vs inactivated classification
- Cold-chain requirements
- Pharmacist administration scope (provincial — most pharmacist injection certifications cover all NACI-recommended vaccines >2 yrs old; some provinces have age restrictions)
- AEFI reporting workflow
- Vaccine-preventable disease cross-link

### 11.3 Travel vaccination clinic reference

- Risk assessment tools (CDC / Public Health Agency of Canada)
- Vaccine prioritization (3-month, 1-month, 1-week timelines)
- Yellow Fever Vaccination Centre referral (only authorized centres can issue ICVP)
- Malaria chemoprophylaxis (CATMAT)
- Travelers' diarrhea — empiric treatment options
- Altitude sickness prophylaxis

---

## 12. Pediatric-specific reference content

⚠️ **HIGHEST LIABILITY area** — limit to published reference tables; absolutely no dosing calculators.

### 12.1 What's safe to add

- **CPS-published dosing tables** for common pediatric medications (acetaminophen, ibuprofen by weight category)
- **Lexicomp / Canadian Pharmacists Drug Information** equivalent pediatric doses where Canadian-published
- **NACI immunization schedule** by age
- **Pediatric "KIDs list" (high-risk meds in children)**
- **Pediatric formulation considerations** — extemporaneous compounding recipes (USP 795 BUD); commercially available pediatric formulations
- **Weight-banded dosing tables** for emergency medications (epinephrine 0.01 mg/kg auto-injector cutoffs at 15 kg / 30 kg)
- **Acetaminophen / ibuprofen mg/kg-equivalent dosing tables** (BY WEIGHT BAND, NOT calculator)
- **Pediatric inhaler/spacer use technique**
- **Pediatric pain assessment scales** — FLACC, FACES, age-appropriate

### 12.2 What's high-liability (avoid)

- Calculators that take age/weight as input and output a specific mg dose
- Decision support for pediatric infectious-disease specific drug choice
- AI-generated counselling for pediatric-specific scenarios

---

## 13. Geriatric-specific reference content

Liability is moderate — published tables OK; calculators not OK.

### 13.1 Content gaps

- **Beers Criteria 2023** — already a ref table; verify completeness
- **STOPP-START v3 2023** — already a ref table; verify completeness
- **Anticholinergic Burden Scale (ABS)** — already a CrossCheck; could be a calculator-style table (counts > drug-specific scores) — **publish list only, never compute total**
- **Frailty assessment tools** (Clinical Frailty Scale, FRAIL questionnaire — published only)
- **Polypharmacy review framework** — CaDeN, Choosing Wisely, MedsCheck workflow
- **Deprescribing-specific drugs in advanced dementia** (chronic statins, anti-osteoporosis, bisphosphonates, anti-hyperglycemics in NH residents)
- **Aging-related drug-handling changes** — protein binding, body composition, renal/hepatic decline

### 13.2 Falls medications

- A reference table of fall-risk medications (antihypertensives, sedatives, opioids, anticholinergics, antipsychotics, antidiabetics with hypoglycemia risk) with risk magnitude + Canadian guidance

---

## 14. Drug interactions & safety content

### 14.1 Interaction content gaps

- **CYP3A4 strong inhibitor / inducer / substrate matrix** — already partial via FDA + Flockhart; could be a dedicated reference table
- **P-gp inhibitor / inducer / substrate matrix**
- **OAT / OATP / MATE transporter** matrix (cidofovir, metformin, statins)
- **Serotonin syndrome culprit drugs** — already a tox ref; expand
- **Neuroleptic malignant syndrome culprit drugs** — already a tox ref
- **Anticholinergic burden** — list of all drugs with ABS ≥1 (currently partial)
- **QT-prolonging drug list** (CredibleMeds Risk Categories: Known, Possible, Conditional, Risk in CCDA)
- **MAOI washout matrix** — switching between serotonergic agents
- **Grapefruit-juice interaction list** — comprehensive
- **St John's Wort interaction list** — comprehensive

### 14.2 Drug-disease interactions

- **Lupus-inducing drugs** list (procainamide, hydralazine, INH, acebutolol, minocycline, anti-TNF, methimazole)
- **Photosensitizing drugs** list (FQ, tetracyclines, NSAIDs, sulfa, retinoids, amiodarone, voriconazole, vandetanib, vemurafenib)
- **Drug-induced hyperkalemia** list (ACEi, ARB, MRA, K+-sparing diuretics, trimethoprim, heparin, NSAIDs, calcineurin inhibitors)
- **Drug-induced hyponatremia / SIADH** list (SSRIs, carbamazepine, oxcarbazepine, thiazides, MDMA, vincristine, cyclophosphamide, opioids, NSAIDs, antipsychotics)
- **Drug-induced parkinsonism** list (metoclopramide, prochlorperazine, first-gen antipsychotics, atypical antipsychotics with high D2 affinity, lithium, valproate, amiodarone)
- **Drug-induced peripheral neuropathy** list (FQ, metronidazole, INH, B6 deficiency, oxaliplatin, paclitaxel, vincristine, bortezomib, thalidomide, leflunomide)

---

## 15. Practice management & professional content

### 15.1 Existing pharmacy practice content

- Anaphylaxis ER protocol — exists
- Naloxone dispensing — exists
- Penicillin de-labelling — exists
- Polypharmacy/deprescribing — exists
- Pharmacist immunization scope — partial
- Medication safety — exists

### 15.2 Practice content to add

- **Pharmacist-administered injection technique** — IM, SC, intradermal (TB skin test in some provinces); ergonomic positioning; needle disposal
- **Refill renewals & adaptations** — provincial scope of practice; documentation
- **MedsCheck program** — full workflow + billing
- **Cannabis dispensing** (for jurisdictions where pharmacy is involved) — currently NACI medical cannabis framework + provincial regulations
- **Sterile compounding workflow** (USP 797) — community-pharmacy scope; mostly hospital
- **Hazardous drug handling** (USP 800) — relevant for oral oncology dispensing
- **Robbery & burglary preparedness** — pharmacy security; controlled substance protection; reporting
- **Drug recall workflow** — Health Canada Recalls and Safety Alerts; pharmacist responsibility to notify patients; documentation
- **Quality assurance / continuous improvement** — Pharmacy Practice Management Standards (CPhA); accreditation requirements per province

---

## 16. Search & UX improvements

### 16.1 Search

- Drug-family search (already mentioned)
- Indication search ("what drugs treat acne?")
- Side-effect reverse search
- Provincial-scope filter ("what can I prescribe in Ontario?")

### 16.2 Mobile

- Test on iOS Safari + Android Chrome
- Touch-friendly tab navigation
- Off-line caching (Service Worker)

### 16.3 Accessibility

- WCAG 2.1 AA compliance audit
- Screen-reader testing
- Keyboard navigation
- High-contrast mode
- Text-size adjustment

### 16.4 Print

- Print-friendly disease counselling sections
- Print-friendly action plans (asthma, COPD, anaphylaxis)
- Print-friendly drug counselling scripts

### 16.5 Bookmarking / persistence

- Browser localStorage for recently-viewed
- Pinned shortcuts to favorite tables
- Custom note-taking on cards (private, browser-side only)

---

## 17. Maintenance / data hygiene

### 17.1 Periodic refresh items

- **Guideline currency** — quarterly sweep for cited guidelines that have been updated:
  - Diabetes Canada
  - Hypertension Canada
  - CCS (cardiology)
  - CTS (respirology)
  - CANMAT (mood, anxiety)
  - SOGC (women's health, obstetrics)
  - AMMI Canada Bugs & Drugs
  - NACI Statements
  - Health Canada Drug Safety Risk Communications
  - Beers Criteria (every ~3 years)
  - STOPP-START (every ~5–10 years)
- **Health Canada Drug Schedule Regulations** updates — NAPRA scheduling changes
- **ODB Formulary** updates — Limited Use criteria changes
- **Drug shortage database** — current shortages and alternatives
- **Drug-recall integration** — Health Canada Recalls and Safety Alerts

### 17.2 Automated audits to schedule

(Already documented in AGENTS.md §22; mention here for completeness)

- Orphan reference tables (data exists but not in `buildReference()`)
- Disease conditions missing `preg_lact_summary`
- `treatment.agents` containing keys not in DRUGS/VACCINES (or NON_PHARM_AGENTS)
- DRUGS without PREG_DATA, NAPRA_ODB_DATA, FAMILY_MAP entries
- Non-canonical interaction severities
- Non-canonical row.type values
- DRUG_FAMILIES with missing `members`, `comparison`, or `pearls`
- DEPRESCRIBING_PROTOCOLS taper_steps schema check (strings vs objects)

### 17.3 Documentation hygiene

- Cross-reference between AGENTS.md sections and actual code structure when restructuring
- Update ROADMAP.md (this file) when items are completed
- Append to AUDIT.md after each audit cycle

---

## 18. How to prioritize

When picking items from this list, weight by:

1. **Pharmacist daily-use frequency** — community pharmacists see hypertension, diabetes, asthma, GERD, insomnia, pain, depression, anxiety, contraception, vaccines daily. Specialty oncology and rare disease less so.
2. **Liability profile** — pure reference + Canadian context = safest. Anything that requires user input to produce output requires extra design care or should be excluded entirely.
3. **Existing-content gap** — verify the topic isn't already covered before adding.
4. **Provincial-scope expansion value** — content that empowers pharmacist prescribing (BC/AB/SK/NS) has high value but must be province-tagged.
5. **Canadian-specific** — content that isn't readily available in Lexicomp/Micromedex/AAFP/UpToDate is high-value (e.g., Canadian Limited-Use codes, provincial pharmacist scope, NACI immunization schedules).

### Quick-impact ranking (top 15 items)

1. HFrEF GDMT titration ladder reference
2. DOAC switching matrix
3. HIV PrEP / PEP reference
4. Insulin titration reference (basal + prandial)
5. Diabetes Canada 2024+ algorithm
6. Sick-day medication rules (SADMANS)
7. Antimicrobial duration cheat sheet
8. Hormonal contraception methods comparison + missed-dose decision trees
9. Pharmacist scope by province comparison table
10. Drug-Lab Interference reference table
11. Therapeutic Drug Monitoring (TDM) targets table
12. NG-Tube medication compatibility table
13. Crushable / non-crushable medication list
14. Drug-induced conditions reference set (hyperK, hyponatremia, parkinsonism, peripheral neuropathy, photosensitivity, lupus, QT, anticholinergic burden)
15. Pharmacogenomic drug-pair references (CPIC) — Canadian context

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

---

**End of roadmap.** Last updated 2026-05-12. As items are completed, move them to AUDIT.md and remove from this list. As new gaps are identified during audits, append them here.
