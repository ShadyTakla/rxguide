# rxguide Content Audit — 15 Conditions + 15 Drugs + 10 Families

**Date:** 2026-05-09
**Scope:** Line-by-line clinical content review of the most-prescribed/most-encountered entries to assess factual accuracy.
**Legend:** 🟢 Accurate · 🟡 Minor issue (factually correct but could be improved) · 🔴 Needs correction (factual error or material omission)

---

## Headline findings

**Overall quality is HIGH.** Citations are heavily Canadian and recent (Hypertension Canada 2025, Diabetes Canada 2024 update, CANMAT 2023/2024, CCS HF 2025, KDIGO 2024, GINA 2024, GOLD 2024/2025, OCP Minor Ailment scope). Landmark trials and Health Canada PMs are correctly cited. New 2022–2024 approvals (vonoprazan, mResvia, Vaxneuvance, MenQuadfi, atogepant, tirzepatide, finerenone, vericiguat, inclisiran, bempedoic acid, tezepelumab, esketamine) are present and accurately summarized.

**Most common defect:** semantic errors in `treatment.agents` arrays — drugs listed under a row whose label doesn't fit them (e.g., `fluconazole` listed in the SSRI row of MDD because it's mentioned in the citalopram dose-cap note). These don't affect clinical text/notes but cause incorrect cross-links in rendered UI.

**Recommendation:** A targeted cleanup of the affected `treatment.agents` arrays plus refresh of three family-card source dates from 2020 → 2024/2025 would address all findings below.

---

## 1. DISEASE CARDS — 15 reviewed

### 🟢 Hypertension (`hypertension`)
- ✅ Hypertension Canada **2025** correctly cited (current).
- ✅ Chlorthalidone preferred over HCTZ — correct (longer half-life, better CV outcomes).
- ✅ Pregnancy: labetalol + long-acting nifedipine + amlodipine + methyldopa first-line per SOGC 426 (2022) — accurate.
- ✅ ACEi/ARB/MRA contraindicated in pregnancy — correct.
- ✅ PATHWAY-2 spironolactone reference — accurate.
- ✅ Atenolol de-emphasis (LIFE trial, inferior outcomes) — correct.
- 🟡 Patient-friendly introduction tone differs from clinical tone elsewhere — deliberate style choice but not consistent.

### 🟡 Type 2 Diabetes (`t2dm`)
- ✅ Metformin first-line; eGFR <30 contraindicated; 30–45 reduce dose — correct.
- ✅ SGLT2i eGFR thresholds (empa ≥20, dapa ≥25, cana ≥30) — accurate per current Canadian labels.
- ✅ Tirzepatide noted (Health Canada 2023; SURPASS trials) — current.
- ✅ Glyburide avoidance + gliclazide MR preferred (lower hypoglycemia) — correct.
- ✅ Saxagliptin/alogliptin HF signal (SAVOR-TIMI 53, EXAMINE) — correct.
- 🔴 **Alpha-glucosidase inhibitor row has `agents: []` (empty)** — should reference acarbose if it's in DRUGS, or remove the row.
- 🟡 Some treatment rows are tagged "Diabetes Canada 2018" but inconsistent — should consistently note "+ 2024 Update".

### 🟢 Dyslipidemia (`dyslipidemia`)
- ✅ CCS Dyslipidemia 2021 cited — current.
- ✅ High-intensity statin doses (atorva 40–80, rosuva 20–40) — correct.
- ✅ Ezetimibe IMPROVE-IT, PCSK9 inhibitors FOURIER/ODYSSEY — accurate.
- ✅ Inclisiran (ORION 9/10/11) — current.
- ✅ Bempedoic acid CLEAR Outcomes 2023 — current.
- ✅ Icosapent ethyl REDUCE-IT 2019 — accurate; correctly distinguishes from OTC fish oil.
- ✅ Statin pregnancy update reflects FDA July 2021 + Norwegian cohort 2025.

### 🔴 Asthma (`asthma`)
- ✅ GINA 2024 cited; SMART/MART strategy current; ICS rinse mouth; montelukast BBW.
- ✅ Mepolizumab/benralizumab/dupilumab/reslizumab eosinophilic biologics — accurate.
- ✅ Tezepelumab NAVIGATOR NEJM 2021 — current.
- ✅ Azithromycin AMAZES Lancet 2017 — accurate with appropriate QTc/audiometry monitoring noted.
- 🔴 **First-Line ICS `agents` array contains `saline_nasal_spray`** — this is for allergic rhinitis, not asthma controller therapy. Remove.
- 🔴 **Step 5 anti-eosinophilic row note ends "resliz"** — truncated; should read "reslizumab".
- 🟡 Some `agents` arrays mix ICS-only with ICS/LABA components — could be more discriminating.

### 🟡 COPD (`copd`)
- ✅ GOLD 2024/2025 cited; tiotropium first-line; ICS criteria (≥2 exacerbations OR ≥1 hospitalization + eos ≥300; avoid if eos <100) — correct.
- ✅ Triple therapy (Trelegy, Breztri) — current.
- ✅ Azithromycin maintenance (ALBERT trial) for frequent exacerbators — accurate.
- 🟡 References "GOLD B and C/D patients" — **GOLD 2024 changed to ABE classification** (combining old C+D into "E"). Update terminology.
- 🔴 **Second-Line ICS row `agents`** mixes LAMA (glycopyrronium, umeclidinium) + LABA (formoterol) + ICS (fluticasone, budesonide_gi) — should be just ICS components OR triple-combo agents, not the partial mix.

### 🔴 Atrial Fibrillation (`afib`)
- ✅ CCS AF 2020 + 2024 Focused Update cited — current.
- ✅ DOAC dose adjustments correct (apixaban 2.5 BID criteria, dabigatran 110 BID criteria, edoxaban 30 OD criteria).
- ✅ Mechanical valve + moderate-severe rheumatic mitral stenosis → warfarin only (RE-ALIGN) — correct.
- ✅ Pill-in-the-pocket flecainide/propafenone caveat (with AV nodal blocker) — accurate.
- ✅ Dronedarone PALLAS/ANDROMEDA contraindications — correct.
- ✅ EAST-AFNET 4 early rhythm control — current.
- ✅ Catheter ablation first-line (CABANA, EARLY-AF, STOP-AF First) — current.

### 🔴 HFrEF (`hfref`)
- ✅ Quadruple GDMT (ARNI/ACEi/ARB + BB + MRA + SGLT2i) accurately reflected.
- ✅ PARADIGM-HF 36h ACEi washout for ARNI — correct.
- ✅ Only bisoprolol/carvedilol/metoprolol succinate proven for HFrEF — correct.
- ✅ DAPA-HF, EMPEROR-Reduced, DELIVER, EMPEROR-Preserved — all current and properly cited.
- ✅ Vericiguat VICTORIA NEJM 2020; finerenone FIDELIO/FIGARO-DKD — current.
- ✅ AFFIRM-AHF IV iron, oral iron ineffective (IRONOUT-HF) — accurate.
- 🔴 **ARB row `agents: [candesartan, valsartan, sacubitril_valsartan]`** — sacubitril/valsartan is ARNI, not ARB. Remove from ARB row.

### 🟢 Hypothyroidism (`hypothyroidism`)
- ✅ Levothyroxine 1.6 mcg/kg/day; elderly start 25–50 mcg with slow titration — correct.
- ✅ 30–60 min empty stomach before breakfast — accurate.
- ✅ Brand consistency caveat (Synthroid/Eltroxin/Euthyrox not bioequivalent) — correct.
- ✅ Drug interactions (calcium, iron, PPI, antiepileptics) — accurate.
- ✅ AACE/ATA 2014 + 2024 update + SOGC Pregnancy 2019 — current.

### 🔴 MDD (`mdd`)
- ✅ CANMAT 2023 Update (Lam et al, May 2024) cited — current.
- ✅ Citalopram QTc dose caps (max 20mg in >65, hepatic, CYP2C19 inhibitors) — correct.
- ✅ Vortioxetine, brexpiprazole, cariprazine — current additions accurate.
- ✅ Esketamine (Spravato, Health Canada 2020) — correct.
- ✅ rTMS OHIP-funded at select Ontario centres — accurate.
- 🔴 **First-Line SSRI `agents` array contains `fluconazole` and `omeprazole`** — these are CYP2C19 inhibitors mentioned in the citalopram dose-cap note, NOT SSRIs. They will be incorrectly rendered as treatment links.

### 🟢 GAD (`gad`)
- ✅ Escitalopram, paroxetine, sertraline first-line SSRIs — Health Canada-approved indications correct.
- ✅ Duloxetine + venlafaxine — both HC-approved for GAD.
- ✅ Quetiapine XR 50mg, mirtazapine, vortioxetine, pregabalin (CDSA Schedule IV) — accurate.
- ✅ Benzodiazepine short-term bridging (≤4 weeks, plan taper from day 1) — appropriate.

### 🔴 Migraine (`migraine`)
- ✅ Triptans first-line; SC sumatriptan fastest onset; CV contraindications.
- ✅ Gepants (rimegepant, ubrogepant, atogepant) — Health Canada 2022/2023 — current.
- ✅ Lasmiditan (Reyvow) Health Canada 2022 + 8-hour driving advisory — correct.
- ✅ Anti-CGRP mAbs (galcanezumab, fremanezumab, eptinezumab, erenumab) — current.
- ✅ Beta-blocker preventives (propranolol, metoprolol) + amitriptyline + topiramate — accurate.
- ✅ CHS 2024 prevention guideline cited — current.
- 🔴 **First-Line NSAID `agents` array contains `metoclopramide` and `sumatriptan`** — neither is an NSAID.
- 🔴 **Antiemetic adjunct row `agents` contains `dopamine`** (the IV vasopressor) — completely wrong. The row is about metoclopramide as a dopamine antagonist. Remove `dopamine`.

### 🟡 GERD & PUD (`gerd_pud`)
- ✅ PPI first-line; 30–60 min before meal; pantoprazole IV for UGIB.
- ✅ BQT first-line in Canada (clarithromycin resistance >20% in Canadian cities) — accurate per AMMI Canada Bugs & Drugs 2024.
- ✅ Vonoprazan (Voquezna, Health Canada 2023) — current.
- ✅ Famotidine vs cimetidine (avoid cimetidine — CYP interactions) — correct.
- 🟡 **H. pylori row `agents` contains `penicillin`** — should specifically be `amoxicillin` (which is also listed); `penicillin` (Pen V) is not used for HP.
- 🟡 Also lists `amoxicillin_clavulanate` for HP — usually just amoxicillin alone is used in BQT-variants.

### 🔴 Osteoarthritis (`osteoarthritis`)
- ✅ Exercise + weight loss = most evidence-based; topical diclofenac first-line pharmacotherapy — correct.
- ✅ Oral NSAIDs second-line; PPI gastroprotection criteria; celecoxib lower GI risk — accurate.
- ✅ Duloxetine for central sensitization (OARSI 2019 conditional) — current.
- ✅ IA corticosteroid limit 3–4/year — accurate.
- 🔴 **Second-Line Oral NSAID `agents` contains `acetaminophen`** — acetaminophen is not an NSAID. Remove.
- 🔴 **Alternative (IACS/HA) `agents` contains `hyaluronic_acid_intravesical`** — that's a BLADDER instillation drug (for interstitial cystitis), NOT intra-articular. Wrong drug key.

### 🟢 Osteoporosis (`osteoporosis`)
- ✅ Osteoporosis Canada 2023 (Morin et al, CMAJ 2023) — current.
- ✅ Bisphosphonate dosing accurate (alendronate 70mg weekly; risedronate 35/150; zoledronic acid 5mg IV annual).
- ✅ Denosumab transition warning (rapid bone loss + rebound vertebral fracture if stopped without bisphosphonate bridge) — correct.
- ✅ Romosozumab CV caveat (avoid if MI/stroke within 1 year) — accurate.
- ✅ Abaloparatide Canadian withdrawal note (Tymlos pulled from Canada 2022) — correctly noted.

### 🔴 CKD (`ckd`)
- ✅ KDIGO 2024 cited — current.
- ✅ ACEi/ARB + SGLT2i + finerenone + GLP-1 RA pillar approach (FLOW trial NEJM 2024) — current.
- ✅ DAPA-CKD, EMPA-KIDNEY, CREDENCE, FIDELIO-DKD/FIGARO-DKD — all correctly cited.
- ✅ Patiromer + SZC for hyperkalemia — current; kayexalate caveat (intestinal necrosis risk) — accurate.
- ✅ Roxadustat HIF-PHI alternative — current.
- ✅ TREAT/CHOIR Hgb target <130 — correct.
- 🔴 **Non-drug rows have `agents: ['physiotherapy']` and `agents: ['exercise']`** — these are not drug keys, will cause rendering issues. Remove or convert to empty arrays.

---

## 2. DRUG CARDS — 15 reviewed

### 🟢 Acetaminophen
- ✅ Max 4 g/day; 2 g/day if chronic alcohol/liver disease — correct.
- ✅ Warfarin interaction (chronic high-dose ≥2g/day) — accurate.
- ✅ Isoniazid + alcohol CYP2E1 inducer interaction — correct.
- ✅ Pregnancy first-line + counsel acknowledging recent neurodevelopmental signal (not established causality) — appropriate.
- ✅ Rumack-Matthew nomogram + NAC overdose treatment — correct.

### 🟢 Ibuprofen
- ✅ OTC max 1200mg/day; Rx 2400mg/day; specialist 3200mg/day — accurate Canadian labelling.
- ✅ Pediatric ≥6 months — correct.
- ✅ Triple whammy (ACE/ARB + diuretic + NSAID) — accurate.
- ✅ Pregnancy avoidance 20+ weeks per FDA + Health Canada — current.

### 🟢 Aspirin
- ✅ ACS loading 162–325 mg + 81 mg/day maintenance — correct.
- ✅ CCS 2023 primary prevention de-emphasis — current.
- ✅ Reye syndrome caveat — accurate.
- ✅ Preeclampsia prevention (low-dose ASA per SOGC) — current.
- ✅ AERD warning — correct.

### 🟢 Metformin
- ✅ Renal cutoffs (CI <30, dose reduce 30–45) — current Canadian label.
- ✅ Hold for IV iodinated contrast 48h before and after — accurate.
- ✅ Pregnancy: insulin first-line, metformin acceptable second-line; PCOS use — correct.
- ✅ B12 monitoring with long-term use — accurate.

### 🟡 Atorvastatin
- ✅ FDA pregnancy update July 2021 + Norwegian cohort 2025 — current.
- ✅ High-intensity 40–80 mg — correct.
- ✅ Cyclosporine + macrolide interactions — accurate.
- 🟡 **One interaction line "Simvastatin/Lovastatin + amlodipine"** — this is for OTHER statins' interactions with amlodipine, not for atorvastatin specifically. Misplaced.

### 🟢 Rosuvastatin
- ✅ Renal max 20 mg if eGFR <30; Asian patients start 5 mg — accurate Health Canada label.
- ✅ HIV PI interaction (atazanavir/ritonavir, lopinavir/ritonavir) — current.
- ✅ Pregnancy FDA July 2021 update — current.

### 🟢 Ramipril
- ✅ HOPE trial 22% MI/stroke/CV death reduction at 10 mg OD — correct.
- ✅ 1.25–2.5 mg BID HF starting dose — accurate.
- ✅ Pregnancy absolute CI 2nd–3rd trimester (ACE inhibitor fetopathy) — correct.
- ✅ Aliskiren CI in DM/CKD — current.

### 🟢 Amlodipine
- ✅ 5–10 mg OD; elderly 2.5 mg start — correct.
- ✅ Simvastatin >20 mg/day interaction — accurate (Health Canada label).
- ✅ Tacrolimus/cyclosporine CYP3A4 interaction — current.
- ✅ Nifedipine preferred in pregnancy noted — accurate.

### 🟡 Hydrochlorothiazide
- ✅ 12.5–25 mg OD, eGFR <30 ineffective — correct.
- ✅ Sulfonamide hypersensitivity flagged as "theoretical" — accurate per Strom NEJM 2003.
- ✅ Lithium + NSAID interactions — correct.
- 🟡 Does not note that Hypertension Canada 2025 prefers chlorthalidone over HCTZ for CV outcomes (this IS noted in the HTN disease card; mention in HCTZ card for consistency).

### 🟢 Levothyroxine
- ✅ 1.6 mcg/kg/day full replacement; 25–50 mcg start in elderly — correct.
- ✅ 30–60 min empty stomach + separation from calcium/iron/PPI — accurate.
- ✅ Pregnancy dose increase 25–30% — correct.
- ✅ Brand consistency caveat — appropriate (narrow therapeutic index).

### 🟡 Pantoprazole
- ✅ 40 mg before first meal × 4–8 weeks — correct.
- ✅ IV 80 mg bolus + 8 mg/h infusion × 72h post-endoscopy UGIB — accurate.
- ✅ Atazanavir contraindication — correct.
- 🟡 **Clopidogrel interaction listed "Moderate"** — pantoprazole has the LEAST CYP2C19 interaction among PPIs (vs omeprazole/esomeprazole). Modern guidance: pantoprazole is preferred PPI when co-prescribed with clopidogrel. Should clarify within the entry.

### 🟢 Sertraline
- ✅ Start 25–50 mg; target 100–200 mg/day — correct.
- ✅ Pediatric OCD ≥6 years (only HC-approved pediatric SSRI indication) — accurate.
- ✅ Most-studied SSRI in pregnancy + breastfeeding — current.
- ✅ MAOI washout 14 days — correct.
- ✅ CANMAT 2023 cited — current.

### 🟢 Salbutamol
- ✅ 2 puffs MDI Q4–6h max 8/day — correct.
- ✅ Acute severe asthma: 2.5–5 mg neb Q20min × 3 — accurate.
- ✅ Hyperkalemia 10–20 mg nebulized — correct.
- ✅ Non-selective β-blocker contraindication — current.
- ✅ Pregnancy safe; preferred SABA — accurate.

### 🟢 Apixaban
- ✅ 5 mg BID; 2.5 mg BID criteria (≥2 of: age ≥80, weight ≤60 kg, SCr ≥133 µmol/L) — correct.
- ✅ VTE 10 mg BID × 7 days → 5 mg BID — accurate.
- ✅ Extended prevention 2.5 mg BID — current.
- ✅ Mechanical valve absolute CI; rheumatic mitral stenosis CI — correct.
- ✅ Strong CYP3A4/P-gp inhibitors/inducers — accurate.

### 🟢 Amoxicillin
- ✅ Strep pharyngitis 500 mg BID × 10 days OR 1000 mg OD × 10 days — both Health Canada-acceptable.
- ✅ AOM high-dose 80–90 mg/kg/day pediatric — current Canadian Paediatric Society.
- ✅ EBV rash warning (~80% of patients) — accurate.
- ✅ Pregnancy category B; most-studied antibiotic in pregnancy — correct.

---

## 3. DRUG FAMILY CARDS — 10 reviewed

### 🟡 ACE Inhibitors
- ✅ MOA accurate; cough mechanism (bradykinin); angioedema; hyperkalemia.
- ✅ Member list complete (ramipril, perindopril, lisinopril, enalapril, quinapril, trandolapril); HOPE/EUROPA/SOLVD/TRACE trials cited.
- 🟡 **Source cites "Hypertension Canada Guidelines 2020"** — should be **2025**.

### 🟡 ARBs
- ✅ MOA accurate; no cough advantage; lower angioedema.
- ✅ Member list complete (candesartan, valsartan, telmisartan, irbesartan, losartan, olmesartan, eprosartan); trial references (CHARM, VAL-HeFT, ROADMAP, IDNT, LIFE).
- ✅ Losartan uricosuric effect noted — correct.
- 🟡 **Source cites "Hypertension Canada 2020"** — should be **2025**.

### 🟡 Beta-Blockers
- ✅ HFrEF: only bisoprolol/carvedilol/metoprolol succinate — correct.
- ✅ Metoprolol tartrate vs succinate distinction — accurate.
- ✅ Atenolol LIFE trial inferior outcomes — correct.
- ✅ Labetalol IV pregnancy emergency — accurate.
- ✅ Propranolol thyroid storm/essential tremor/portal HTN — correct.
- 🟡 **Source cites "Hypertension Canada 2020" + "CCS HF 2021" + "CCS AF 2020"** — should reference 2024/2025 updates.

### 🔴 Calcium Channel Blockers
- ✅ DHP vs non-DHP distinction accurate.
- ✅ DHP edema mechanism (capillary, not fluid overload) + ACEi/ARB mitigation — correct.
- ✅ Non-DHP HFrEF + AV block contraindications — accurate.
- 🔴 **`comparison/members` array is empty** in the extracted data — either the field is missing or wasn't included. CCBs are the only family of the 10 missing detailed members.
- 🟡 Source cites "Hypertension Canada 2020" — should be **2025**.

### 🟢 Statins
- ✅ Member list complete (atorvastatin, rosuvastatin, simvastatin, pravastatin, fluvastatin, pitavastatin, lovastatin, ezetimibe/simvastatin combo); class effects + contraindications accurate.
- ✅ Pravastatin CYP-spared — correct.
- ✅ Asian rosuvastatin 5 mg start — accurate.
- 🟡 Source cites CCS Dyslipidemia 2021 — current; should also note FDA July 2021 + Norwegian 2025 for pregnancy.

### 🟢 Proton Pump Inhibitors
- ✅ MOA: irreversible H+/K+-ATPase covalent binding via cysteine; 30–60 min pre-meal activation — accurate.
- ✅ Class effects: hypomagnesemia long-term + B12 deficiency + C. diff risk — current.
- ✅ Member list complete (omeprazole, pantoprazole, esomeprazole, rabeprazole, lansoprazole, dexlansoprazole).
- ✅ Pantoprazole least CYP2C19 interaction — correct.
- ✅ Rabeprazole non-enzymatic activation — accurate.
- ✅ Deprescribing emphasis (Choosing Wisely Canada) — appropriate.

### 🟡 SSRIs
- ✅ MOA accurate; SERT selectivity gradient (escitalopram most → paroxetine least).
- ✅ Member list complete (sertraline, escitalopram, fluoxetine, citalopram, paroxetine, fluvoxamine).
- ✅ Citalopram QTc dose caps — correct.
- ✅ Paroxetine teratogenic + worst discontinuation syndrome — accurate.
- 🟡 **Source cites "CANMAT 2016" + "CANMAT/CPA Anxiety 2014"** — should be **CANMAT 2023 Update** (Lam et al, May 2024).

### 🟢 Penicillin Antibiotics
- ✅ MOA (PBP inhibition, cell wall disruption) accurate.
- ✅ Subclass spectrum (natural, amino, anti-staph, β-lactamase combos).
- ✅ EBV rash warning (~80–100% non-allergic) — correct.
- ✅ De-labelling emphasis (~5–10% truly allergic on testing) — current.
- ✅ AMMI Canada Bugs & Drugs 2024 + Public Health Ontario stewardship — current.

### 🟢 Macrolide Antibiotics
- ✅ MOA (50S ribosomal, 23S rRNA binding) accurate.
- ✅ Atypical pathogen coverage (Mycoplasma, Chlamydia, Legionella) — correct.
- ✅ QT prolongation (clarithromycin > erythromycin > azithromycin) — accurate gradient.
- ✅ CYP3A4 inhibition (clarithromycin > erythromycin > azithromycin) — correct.
- ✅ Erythromycin motilin agonism for gastroparesis (off-label) — accurate.
- ✅ Rising S. pneumoniae resistance (~25–30%) → empiric monotherapy discouraged — current.

### 🟡 Direct Oral Anticoagulants
- ✅ Mechanism: dabigatran direct thrombin; apixaban/rivaroxaban/edoxaban direct factor Xa — correct.
- ✅ Mechanical valves CI (RE-ALIGN) + moderate-severe MS + APS triple-positive + pregnancy — accurate.
- ✅ Apixaban lowest GI bleed; dabigatran dyspepsia (tartaric acid in capsule) — correct.
- ✅ Member dose adjustments all correct (apixaban 2.5 BID criteria; dabigatran 110 BID criteria; edoxaban 30 OD criteria).
- 🟡 **Source cites "CCS AF 2020"** — should be "**CCS AF 2020 + 2024 Focused Update**" (used elsewhere in the app).

---

## Summary of issues to correct

### 🔴 Material errors (12 items — should be fixed)
1. **mdd**: Remove `fluconazole`, `omeprazole` from SSRI agents array.
2. **asthma**: Remove `saline_nasal_spray` from First-Line ICS agents array.
3. **asthma**: Complete truncated word "resliz" → "reslizumab" in Step 5 notes.
4. **migraine**: Remove `metoclopramide`, `sumatriptan` from NSAID row agents.
5. **migraine**: Remove `dopamine` from antiemetic adjunct row agents.
6. **osteoarthritis**: Remove `acetaminophen` from Oral NSAID row agents.
7. **osteoarthritis**: Replace `hyaluronic_acid_intravesical` with intra-articular hyaluronic acid key (or remove).
8. **hfref**: Remove `sacubitril_valsartan` from ARB row agents (ARNI ≠ ARB).
9. **gerd_pud**: Remove `penicillin` from H. pylori row agents (HP uses amoxicillin, not Pen V).
10. **copd**: Clean Second-Line ICS row agents (remove LAMA/LABA from ICS-specific row).
11. **ckd**: Remove `physiotherapy` and `exercise` from non-drug rows agents.
12. **t2dm**: Empty alpha-glucosidase row — add `acarbose` key if available or remove row.

### 🟡 Minor corrections (6 items)
1. **copd**: Update GOLD classification terminology ("B and C/D" → "B and E" per GOLD 2024 ABE).
2. **atorvastatin**: Fix misplaced "Simvastatin/Lovastatin + amlodipine" interaction line.
3. **pantoprazole**: Clarify that pantoprazole has the LEAST clopidogrel interaction among PPIs.
4. **hydrochlorothiazide**: Note Hypertension Canada 2025 chlorthalidone preference.
5. **gerd_pud**: Remove `amoxicillin_clavulanate` from H. pylori row (just amoxicillin alone).
6. **Family sources (4 cards)**: Update Hypertension Canada 2020 → 2025 across ACE Inhibitors, ARBs, Beta-Blockers, CCBs.

### 🟡 Other improvements
- **SSRIs family**: Update source from CANMAT 2016 → CANMAT 2023 Update.
- **DOACs family**: Add "+ 2024 Focused Update" to CCS AF source.
- **CCBs family**: Populate the empty `comparison/members` array.

### 🟢 No major content concerns
- All 15 drug cards clinically accurate on dosing, contraindications, key interactions, pregnancy.
- Citations are heavily Canadian and current.
- New 2022–2024 approvals correctly incorporated.
- Pregnancy/lactation summaries reflect FDA July 2021 statin update and Health Canada PMs.
- Pharmacist scope (OCP Minor Ailment, BC/AB/SK contraception, OPSS smoking cessation) accurately represented.

---

## Overall verdict

**Clinical content quality is HIGH and broadly reliable for community pharmacy use.** The audit identified **12 material errors (mostly semantic mismatches in `treatment.agents` arrays causing wrong-target drug links)** and **~6 minor source/terminology refreshes**. No errors involve dosing, contraindications, or pregnancy data on the actual drug cards themselves.

**Recommended follow-up:** A single targeted PR fixing the 12 agents-array errors and refreshing the 4–6 family source dates would address the audit completely. Estimated effort: 1–2 hours of mechanical edits.
