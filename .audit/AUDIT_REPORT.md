# Minor Ailments Tab — Clinical Audit Report

**Date:** 2026-04-30
**Branch:** `claude/minor-ailments-tab-setup-4tHqE`
**Scope:** All 19 conditions in `MINOR_AILMENTS` (index.html line 93002+)
**Reference priority:** ONT > CAN > USA > INTL (most recent, official)
**Method:** 5 parallel research agents, each auditing 3–4 conditions against current official guidelines (OCP, OPA, PHO, MOH, RxTx, RxFiles, AMMI, SOGC, CDA, CAG, CSACI, NACI, IDSA, AAD, ACG, AAAAI, AAO, AAOS, AAP, NICE, ARIA, EAACI, Cochrane).

---

## Executive Summary

| # | Condition | Quality | Top issue |
|---|-----------|---------|-----------|
| 1 | Allergic Rhinitis | Good | Missing bilastine/rupatadine/Dymista; pseudo + montelukast outside MA scope |
| 2 | Oral Candidiasis | **Needs revision** | **Fluconazole 150 mg single dose is wrong** (that's vaginal); should be 100–200 mg × 7–14d |
| 3 | Urticaria | Good | Diphenhydramine no longer recommended (EAACI 2022); add Canadian 2nd-gen options |
| 4 | Hemorrhoids | **Needs revision** | **Anusol HC strength/ingredients wrong for Canada** (HC 0.5% + zinc, not 1% + pramoxine) |
| 5 | Dysmenorrhea | Good | COC/IUS listed as "second-line" but out of MA scope |
| 6 | Impetigo | **Needs revision** | **Mupirocin BID not TID** per IDSA 2014; missing ozenoxacin (Ozanex) |
| 7 | Tick Bite/Lyme | Good | **Pediatric <8y restriction outdated** (IDSA 2020 allows all ages); BC not endemic |
| 8 | Conjunctivitis | Good | Missing polymyxin/gramicidin & polymyxin/trimethoprim (Polytrim); refer at 48–72h not 7d |
| 9 | Acne Vulgaris | **Needs revision** | **Acne is NOT in Ontario MA scope**; missing oral antibiotics, spironolactone, Diane-35 |
| 10 | Cold Sores | Good | Acyclovir labelled dose is 5×/day (not TID); penciclovir not marketed in Canada |
| 11 | MSK Sprains | Good | PEACE & LOVE update (BJSM 2019) supersedes POLICE; soften early-NSAID stance |
| 12 | Nausea & Vomiting | **Needs revision** | **Implies Diclectin OTC** — it is Rx-only; BRAT diet outdated; missing pyridoxine monotherapy step |
| 13 | Insect Bites & Stings | Good | Topical diphenhydramine should be deprecated (sensitization risk) |
| 14 | Uncomplicated UTI | Good | Missing full Ontario MA criteria (age 16–64, no abx ×3mo, preg test, MD notify) |
| 15 | Shingles | Good | **"Valacyclovir BID absorption" is wrong — it's TID**; update Shingrix (immunocomp ≥18) |
| 16 | Pinworms | **Needs revision** | Mebendazole supply unreliable in Canada; "threadworm" is a synonym, not separate DDx; not in MA scope |
| 17 | GERD | Good | Not in MA scope (OTC only); update alarm-feature age to ≥60 (ACG 2022); add deprescribing |
| 18 | Eczema/Contact Dermatitis | Good | High-potency betamethasone dipropionate outside MA scope; ACD not in MA scope |
| 19 | Smoking Cessation | **Needs revision** | **"Under Ontario MA" is factually wrong** — separate Smoking Cessation Prescribing Authority; missing cytisine, STOP program, e-cig evidence |

**Highest-priority clinical safety fixes (5):**
1. **#2 Oral Thrush** — fluconazole dose is wrong for indication (single 150 mg = vaginal candidiasis, NOT oral thrush). Correct: 100–200 mg PO daily × 7–14 days.
2. **#4 Hemorrhoids** — Anusol HC ingredient/strength incorrect for Canadian product (it's HC 0.5% + zinc, not HC 1% + pramoxine).
3. **#6 Impetigo** — mupirocin BID per IDSA 2014, not TID.
4. **#15 Shingles** — "valacyclovir BID" rationale text wrong; correct dose is 1000 mg TID.
5. **#19 Smoking Cessation** — "pharmacist can prescribe under Ontario minor ailments" repeated throughout; this is incorrect — varenicline/bupropion/NRT prescribing falls under a separate Ontario Smoking Cessation Prescribing Authority, not MA.

**Cross-cutting recommendations:**
- Add an explicit "Ontario MA Scope" sub-field to each condition stating: (a) is this in OCP MA list? (b) which drugs are Schedule 4-eligible? (c) maximum prescribing duration; (d) referral triggers.
- Add pediatric and pregnancy/lactation dosing notes systematically.
- Add Canadian-specific second-gen antihistamines (bilastine, rupatadine, levocetirizine, desloratadine) where relevant.
- Verify all Canadian brand–ingredient pairings against Health Canada DPD before publication.
- Cite OCP Schedule 4 (O. Reg. 256/24, May 2025) and OPA Minor Ailments toolkits as primary Ontario references for every applicable condition.

---

# Detailed Findings

## 1. Allergic Rhinitis — Good (revisions needed)

### Discrepancies / Outdated Info
- `treatment.first_line[0].drugs`: Flonase in Canada is **fluticasone propionate 50 mcg/spray** OR **fluticasone furoate (Flonase Sensimist) 27.5 mcg/spray** — should clarify. Mometasone (Nasonex) is OTC since 2022. Ciclesonide (Omnaris) and triamcinolone are missing.
- `treatment.first_line[1].drugs`: Fexofenadine 120 mg = seasonal AR; 180 mg = chronic urticaria — listing "120–180 mg OD" conflates indications. **Bilastine (Blexten) 20 mg OD**, **rupatadine (Rupall) 10 mg OD**, **levocetirizine (Xyzal) 5 mg OD** missing — all Canadian-available, endorsed by CSACI.
- `treatment.second_line[0]`: Should add **azelastine/fluticasone (Dymista)** — ARIA 2020 preferred step-up when monotherapy fails.
- `treatment.second_line[2]` Montelukast: ARIA 2020 issued **conditional recommendation against** routine monotherapy for AR (BBW for neuropsychiatric effects); should be more explicit.
- **Ontario MA scope:** Pseudoephedrine and montelukast are NOT in the OCP MA AR prescribing algorithm — flag as recommend/refer only.

### Missing Items
- Bilastine, rupatadine, levocetirizine, desloratadine — Canadian 2nd-gen antihistamines.
- Dymista (azelastine/fluticasone) combo INCS+INAH.
- Intranasal ipratropium 0.03% for predominant rhinorrhea.
- Allergen immunotherapy referral (SCIT/SLIT — Oralair, Grastek, Acarizax all in Canada).
- Pediatric dosing notes.
- Pregnancy considerations (loratadine/cetirizine preferred; budesonide INCS of choice).
- Explicit OCP MA boundary: typical max 6 months prescribing, refer if no response in 4–6 weeks.

### Recommended References (ONT > CAN > USA > INTL)
1. **OCP Minor Ailments — Allergic Rhinitis** prescribing algorithm (2023; updates 2024). https://www.ocpinfo.com/practice-education/expanded-scope/minor-ailments/
2. **OPA Minor Ailments Toolkit — Allergic Rhinitis** (2023).
3. **CSACI Position Statement on Allergic Rhinitis** (Keith et al., Allergy Asthma Clin Immunol, updated 2023).
4. **RxTx / CTC: Allergic Rhinitis** chapter (CPhA, current).
5. **AAAAI/ACAAI — Rhinitis 2020 Practice Parameter Update** (Dykewicz et al., Ann Allergy Asthma Immunol 2020).
6. **ARIA 2020 / 2024 update** (Bousquet et al.).

---

## 2. Oral Candidiasis (Thrush) — Needs revision

### Discrepancies / Outdated Info
- **Fluconazole dose error (clinical safety):** "150 mg single dose" is for **vaginal candidiasis**, NOT oral thrush. Per IDSA 2016 and CPS, oral candidiasis: **fluconazole 100–200 mg PO loading then 100 mg OD × 7–14 days** (or 200 mg day 1 then 100 mg daily).
- **Clotrimazole troches 10 mg are not consistently available in Canada** (often special order or unavailable). Miconazole oral gel (Daktarin) is not licensed in Canada. In practical Ontario practice, **nystatin is the only reliable topical option**; fluconazole is backup.
- `assessment.key_questions`: "Denture hygiene" appears twice (duplicate).
- **Ontario MA scope:** Oral thrush is on the OCP MA list (Jan 2023). Pharmacists can prescribe **nystatin** under the algorithm. **Fluconazole (systemic) is NOT in the OCP MA algorithm** — requires physician referral. Flag this boundary.
- `assessment.ddx`: Missing angular cheilitis, erythematous (denture stomatitis) subtype.
- `assessment.red_flags`: Missing infants <4 months and breastfeeding mother–infant dyad (treat both).

### Missing Items
- Pediatric/infant nystatin dosing (1 mL each side of mouth QID).
- Treatment of nursing mother nipples (miconazole/clotrimazole cream) when treating infant thrush.
- Denture-specific antifungal soaks (chlorhexidine 0.12% rinse, nystatin applied to dentures).
- Pseudomembranous vs erythematous vs hyperplastic classification.
- HIV/CD4 considerations — recurrent thrush is AIDS-defining.

### Recommended References (ONT > CAN > USA > INTL)
1. **OCP Minor Ailments — Oral Thrush** algorithm (2023).
2. **OPA Minor Ailments — Oral Thrush** clinical resource (2023).
3. **RxTx/CTC: Oropharyngeal Candidiasis** (CPhA).
4. **Canadian Dental Association** position on denture stomatitis.
5. **IDSA Clinical Practice Guideline for the Management of Candidiasis** (Pappas et al., Clin Infect Dis 2016).
6. **Health Canada Drug Product Database** (verify nystatin/clotrimazole availability).

---

## 3. Urticaria (Hives) — Good (revisions needed)

### Discrepancies / Outdated Info
- `treatment.first_line[0].drugs`: Cetirizine, fexofenadine, loratadine — correct. Missing **bilastine 20 mg, rupatadine 10 mg, desloratadine 5 mg, levocetirizine 5 mg** — all Canadian-available, endorsed by CSACI.
- `treatment.second_line[0]` Diphenhydramine: **EAACI/GA²LEN/EDF/WAO 2022 and CSACI recommend AGAINST first-generation sedating antihistamines** even as add-on (anticholinergic burden, impaired sleep architecture). Preferred: up-titrate non-sedating agent up to 4× licensed dose. Current entry contradicts modern guidance.
- `treatment.second_line[1]` Prednisone 30–40 mg × 3–5 days: accurate for severe acute; 2022 guideline allows up to 10 days max.
- **Missing:** Step 3 (omalizumab) and Step 4 (cyclosporine) for chronic spontaneous urticaria — out of scope but should appear under "refer when."
- **Ontario MA scope:** Hives added Oct 2023. Scope = acute urticaria only with non-sedating H1. Chronic (>6 wk), prednisone, angioedema = OUT of scope (refer). Acute MA prescribing duration typically max 6 weeks.
- `assessment.ddx`: Missing **drug eruption (morbilliform)** and **urticarial vasculitis** (lesions persist >24h, leave bruising — key DDx and red flag).
- `assessment.red_flags`: Add "individual hive lasting >24h or leaving bruise/pigmentation" → urticarial vasculitis.

### Missing Items
- Bilastine, rupatadine, desloratadine, levocetirizine.
- Explicit up-dosing protocol (e.g., cetirizine 10 → 20 → 40 mg/day in divided doses).
- Physical urticaria subtypes (cholinergic, cold, dermatographism, pressure).
- Urticarial vasculitis as DDx and red flag.
- Pregnancy/lactation (loratadine/cetirizine preferred); pediatric dosing.
- Step-3 omalizumab referral pathway.
- EpiPen prescription if angioedema/anaphylaxis suspected.

### Recommended References (ONT > CAN > USA > INTL)
1. **OCP Minor Ailments — Urticaria/Hives** algorithm (Oct 2023 expansion).
2. **OPA Minor Ailments Toolkit — Hives** (2023).
3. **CSACI / Canadian guideline for chronic urticaria management** (Sussman et al., Allergy Asthma Clin Immunol 2024 update).
4. **RxTx/CTC: Urticaria** (CPhA).
5. **AAAAI/ACAAI — Urticaria Practice Parameter 2023 update**.
6. **EAACI/GA²LEN/EDF/WAO 2022 Urticaria Guideline** (Zuberbier et al., Allergy 2022;77:734–766).

---

## 4. Hemorrhoids — Needs revision

### Discrepancies / Outdated Info
- **Brand/ingredient error:** "Hydrocortisone 1% + pramoxine cream (Anusol HC, Preparation H HC)" — **Anusol HC in Canada is hydrocortisone 0.5% + zinc sulfate**, not pramoxine. **Anusol Plus** = pramoxine + zinc (no steroid). **Proctosedyl/Proctol** = HC + cinchocaine + framycetin + esculin (Canadian Rx standard). Correct mappings are essential for safe Canadian dispensing.
- 5–7 day duration: correct; some products allow up to 14 days.
- `treatment.first_line[1].drugs`: Docusate 100 mg BID — limited evidence (Cochrane); de-emphasize. **PEG 3350 (Restoralax/Lax-A-Day) 17 g daily** preferred. Psyllium correctly emphasized.
- **Missing: micronized purified flavonoid fraction (MPFF, Daflon 500 mg)** — Cochrane evidence (2012/2018), recommended in ASCRS 2018 guideline; relevant in Canadian practice.
- **Ontario MA scope:** Hemorrhoids on OCP MA list (Jan 2023). Topical HC ± local anesthetic prescribable. Verify Proctosedyl (with framycetin) inclusion in Schedule 4.
- `assessment.red_flags`: Age >50 with rectal bleeding — consider lowering to age >40 with new bleeding for workup.
- `assessment.ddx`: Missing **perianal hematoma** (often confused with thrombosed external hemorrhoid), **condylomata (anal warts)**, **pruritus ani**.
- `assessment.key_questions`: Missing pregnancy status (very common precipitant; affects drug choice).

### Missing Items
- MPFF (Daflon) / phlebotonics.
- PEG 3350 (Restoralax) as preferred osmotic.
- Pregnancy considerations (psyllium, sitz baths, witch hazel first-line; avoid topical HC esp. T1).
- **Internal hemorrhoid grading I–IV** — directs referral:
  - Grade I–II: conservative
  - Grade III: rubber band ligation referral
  - Grade IV: surgical referral
- Rubber band ligation, sclerotherapy, hemorrhoidectomy as referral options.
- Topical nifedipine 0.3% / nitroglycerin 0.2% — for anal fissures (DDx); cross-reference.
- Explicit max MA-scope duration (typically 7 days) and re-assessment trigger.

### Recommended References (ONT > CAN > USA > INTL)
1. **OCP Minor Ailments — Hemorrhoids** algorithm (Jan 2023).
2. **OPA Minor Ailments Toolkit — Hemorrhoids** (2023).
3. **Cancer Care Ontario / Ontario Health — ColonCancerCheck** (rectal bleeding workup).
4. **RxTx/CTC: Hemorrhoids** (CPhA) — accurate Canadian product list.
5. **Canadian Association of Gastroenterology** position on lower GI bleeding workup.
6. **ASCRS Clinical Practice Guidelines for Management of Hemorrhoids** (Davis et al., Dis Colon Rectum 2018).
7. **Cochrane Review: Phlebotonics for haemorrhoids** (Perera et al., 2012).
8. **WGO Global Guideline: Hemorrhoids** (2019).

---

## 5. Dysmenorrhea — Good (revisions needed)

### Discrepancies / Outdated Info
- `treatment.first_line`: Naproxen sodium "500 mg loading then 250 mg q6–8h" — OTC Aleve is 220 mg sodium; Rx is 275/550 mg sodium (= 250/500 mg base). Clarify base vs sodium. Mefenamic acid: 500 mg loading then 250 mg QID up to 3 days (not just 500 mg TID).
- Ibuprofen 400–600 mg q6h: SOGC 2025 starts at 200–400 mg then 200 mg q4–8h — more conservative.
- `treatment.second_line`: COCs and hormonal IUS are clinically valid but **out of MA scope**. Ontario Schedule 4 for dysmenorrhea = NSAIDs only (ASA, celecoxib, diclofenac, flurbiprofen, ibuprofen, ketoprofen, mefenamic acid, naproxen). Pharmacist can recommend/refer for hormonal therapy but not prescribe under MA.
- `assessment.red_flags`: New severe pain >age 25 — onset of primary dysmenorrhea after age 25 (not just severity) is the classic red flag for secondary dysmenorrhea.
- `non_pharm`: Magnesium 200–400 mg/day — evidence weak/inconsistent (Cochrane 2001; not strongly supported in SOGC 2025); qualify.

### Missing Items
- Note COCs/IUS = referral, not MA.
- Acetaminophen alternative when NSAIDs CI'd.
- Celecoxib (COX-2 selective; on Schedule 4 list — useful for GI-intolerant).
- NSAID CIs/cautions: PUD, renal, asthma (ASA-sensitive), pregnancy, anticoagulants.
- Max NSAID duration before reassessment (typically 3 cycles).
- Endometriosis screening: dyspareunia, dyschezia, infertility, cyclical bowel/bladder symptoms.
- Refer if no improvement after 3 cycles of optimized NSAID therapy.

### Recommended References (ONT > CAN > USA > INTL)
1. **OCP Schedule 4 — Drugs Eligible for Prescribing** (O. Reg. 256/24, May 2025). https://ocpinfo.com/wp-content/uploads/2025/05/Drugs-eligible-for-prescribing-under-SCHEDULE-4-of-O-REG-202-94.pdf
2. **OPA Minor Ailments — Dysmenorrhea** module. https://www.opatoday.com/minorailments/
3. **SOGC Guideline No. 345: Primary Dysmenorrhea (2025)**, JOGC.
4. **RxTx/CTC — Dysmenorrhea** (CPhA).
5. **ACOG Committee Opinion No. 760** — Dysmenorrhea and Endometriosis in the Adolescent.
6. **NICE CKS — Dysmenorrhoea** (updated 2024).

---

## 6. Impetigo — Needs revision

### Discrepancies / Outdated Info
- **Mupirocin frequency:** listed as TID × 5 days; **IDSA 2014 SSTI Guideline specifies BID × 5 days**. Fusidic acid TID × 7 days per Canadian monograph is correct.
- **Missing: ozenoxacin 1% cream (Ozanex)** BID × 5 days — Health Canada-approved 2017 for impetigo ≥2 months; on Ontario Schedule 4. Notable omission for a Canadian guide.
- `treatment.second_line` (cephalexin, amoxicillin-clavulanate, TMP-SMX): clinically appropriate for widespread/bullous/MRSA but **likely outside MA scope** in Ontario — typically requires physician referral. Verify against current Schedule 4.
- Cephalexin pediatric dose: 25–50 mg/kg/day divided is more accurate than 25 mg/kg/day low end.
- `ddx`: Add scabies, eczema herpeticum, insect bites with secondary infection.
- `red_flags`: Add necrotizing fasciitis, staphylococcal scalded skin syndrome (infants).

### Missing Items
- Ozenoxacin 1% (Ozanex) BID × 5 days.
- Correct mupirocin frequency (BID).
- Note Ontario MA scope: topical only; systemic = referral.
- Lesion-count threshold per OPA: typically ≤3 lesions in one body area for topical-only management.
- Penicillin-allergy guidance for oral options.
- Decolonization not routinely recommended for first episode.
- School/daycare: 24h after starting effective antibiotic AND lesions covered (Ontario PHU standard).

### Recommended References (ONT > CAN > USA > INTL)
1. **OCP Schedule 4 — Impetigo eligible drugs**.
2. **OPA Minor Ailments — Impetigo** module.
3. **CADTH Clinical Review: Ozenoxacin 1% Cream (Ozanex)**.
4. **RxTx/CTC — Bacterial Skin Infections** (CPhA).
5. **IDSA 2014 SSTI Practice Guidelines** (Stevens et al., CID 2014).
6. **AAD Bacterial Skin Infections** guidance.
7. **NICE CKS — Impetigo** (updated 2023; hydrogen peroxide first-line for non-bullous in NICE).

---

## 7. Tick Bite (Lyme Prophylaxis) — Good (revisions needed)

### Discrepancies / Outdated Info
- `treatment.first_line[0].drugs`: "Children ≥8 years" is **outdated**. Per **IDSA/AAN/ACR 2020 and AAP**, doxycycline single-dose (or short courses ≤21 days) is now safe in **all ages including children <8 years** — no dental staining at currently recommended doses. Pediatric dose 4.4 mg/kg (max 200 mg) applies to all children.
- `treatment.first_line[0].notes`: Pregnancy phrasing unclear. Doxycycline generally avoided throughout pregnancy in Canada; pregnancy = referral, not pharmacist-managed.
- Geographic list: **BC is not endemic for Lyme** (very low risk; Ixodes pacificus has low infection rate). Endemic Canadian areas: NS, NB, southern QC, southern/eastern Ontario, southern MB. Reference PHO Lyme risk map (Long Point, Turkey Point, Rouge Valley, Thousand Islands, eastern ON, Kingston, Niagara).
- Erythema migrans threshold ≥5 cm — matches CDC/IDSA criteria; accurate.
- `refer_when`: "Child <8 years requiring prophylaxis" — outdated per 2020 IDSA; remove.

### Missing Items
- Update to IDSA 2020 / AAP doxycycline safety in children <8.
- Cite **PHO "Antibiotic Prophylaxis to Prevent Lyme Disease — Pharmacist Assessment & Prescribing Algorithm"** by name — the de facto Ontario standard.
- Note doxycycline is the only prophylactic option (no alternative if allergic — refer).
- Counselling: full glass of water, upright 30 min, with food (esophageal irritation); photosensitivity.
- eTick.ca for tick identification (Canadian resource).
- Co-infections (anaplasmosis, babesiosis emerging in Ontario).
- Risk map updates annually (climate-driven expansion).

### Recommended References (ONT > CAN > USA > INTL)
1. **PHO — Antibiotic Prophylaxis to Prevent Lyme Disease following a Tick Bite: Assessment and Prescribing Algorithm for Pharmacists** (2023). https://www.publichealthontario.ca/-/media/Documents/L/2023/lyme-disease-assessment-prescribing-algorithm-antibiotic-prophylaxis.pdf
2. **Ontario Health (Quality) — Lyme Disease Clinical Guidance** (2024).
3. **OPA — Assessing the Risk of Lyme Disease**.
4. **PHO Estimated Lyme Disease Risk Areas Map** (annually updated).
5. **Ottawa Public Health Lyme PEP Algorithm**.
6. **CPS Position Statement — Lyme disease in children**.
7. **AMMI Canada position statement** (2022).
8. **CEP — Early Lyme Disease** (2020).
9. **IDSA/AAN/ACR 2020 Lyme Disease Guidelines** (Lantos et al., CID 2021).

---

## 8. Conjunctivitis (Pink Eye) — Good (revisions needed)

### Discrepancies / Outdated Info
- `treatment.first_line[0].drugs`: Tobramycin, erythromycin, fusidic acid all on Schedule 4 — good. **Missing Ontario-eligible options**: polymyxin B/gramicidin (Polysporin eye drops), polymyxin B/trimethoprim (Polytrim).
- "Avoid fluoroquinolone drops … reserve for contact lens wearers" — clinically correct AND aligned with MA scope (ophthalmic FQ explicitly excluded). Should explicitly state contact-lens wearers must be **referred**, not prescribed FQ under MA.
- Olopatadine (Pataday) 0.2%/0.7% are **OTC in Canada**; ketotifen also OTC. Pharmacist role = recommendation/counselling, not MA prescribing.
- `assessment.key_questions`: "Bilateral suggests viral or allergic" — bacterial is also frequently bilateral. AAO 2024 PPP: discharge character + morning matting more reliable than laterality.
- `assessment.red_flags`: Add **HSV keratitis** (dendritic ulcer; unilateral; cold-sore history; periocular vesicles) — emergent referral.
- `ddx`: Add dry eye, blepharitis, subconjunctival hemorrhage, episcleritis, dacryocystitis.
- `non_pharm`: "Stay home until discharge resolved" — current Ontario/CDC guidance less restrictive; school exclusion not routinely required if treated. Verify with PHO/local PHU.
- `refer_when`: "No improvement in 7 days" — for bacterial on antibiotics, lack of improvement at **48–72h** warrants referral, not 7 days.

### Missing Items
- Polymyxin B/gramicidin and polymyxin B/trimethoprim (Polytrim).
- Out-of-scope flags: contact lens wearer (refer for FQ), neonatal conjunctivitis (emergency referral), suspected herpetic.
- Viral conjunctivitis (most common) does NOT benefit from antibiotics — supportive care + hand hygiene; contagion ~10–14 days.
- Adenoviral epidemic keratoconjunctivitis: 2–3 weeks; refer if photophobia or vision change.
- COVID-19 and Mpox as viral causes (AAO 2024 PPP).
- Dupilumab-associated conjunctivitis (atopic dermatitis) — refer (AAO 2024).
- Counsel: discontinue contact lens use during active infection; replace lens case.

### Recommended References (ONT > CAN > USA > INTL)
1. **OCP Schedule 4 — Conjunctivitis eligible drugs**.
2. **OPA — A Primer on Pink Eye**.
3. **OPA Minor Ailments — Conjunctivitis** module.
4. **RxTx/CTC — Conjunctivitis** (CPhA).
5. **Choosing Wisely Canada — Ophthalmology** (don't routinely prescribe antibiotics for viral conjunctivitis).
6. **AAO Conjunctivitis Preferred Practice Pattern 2024**.
7. **AAFP/CDC — Conjunctivitis management**.
8. **NICE CKS — Conjunctivitis (infective and allergic)**, updated 2024.

---

## 9. Acne Vulgaris — Needs revision

### Discrepancies / Outdated Info
- **Ontario MA scope:** Acne vulgaris is **NOT** in Ontario MA scope (not on the OCP/MOH list as of the 2023 expansion). Topical clindamycin/BPO and combined OCPs cannot be initiated by pharmacists under MA. Frame as assessment/OTC counselling module, not prescribe-and-treat.
- **Adapalene OTC:** Differin OTC in Canada is 0.1% gel — correct. Adapalene 0.3% is Rx-only — note.
- **Severity grading:** "<20 papules" / "20–100 papules" thresholds are arbitrary; not aligned with AAD 2024 or CDA grading (use comedonal, mild/moderate/severe inflammatory, nodulocystic descriptors).
- **BPO 2.5% "same efficacy as 5%/10%":** AAD 2024 supports 2.5% as similarly effective with less irritation, but absolute claim is overstated.
- **Tretinoin strengths:** Add 0.01% (sensitive skin). **Trifarotene (Aklief) 0.005%** (Health Canada-approved 2020) and tazarotene missing.
- **Clindamycin/BPO:** AAD 2024 supports OD dosing for fixed-dose combos (Clindoxyl ADV); BID unnecessary and increases irritation.
- **Cyproterone/EE (Diane-35):** Health Canada-approved specifically for acne in women (with VTE-risk restrictions); commonly used in Canadian practice — missing.
- **Spironolactone:** Increasingly first/second-line in adult women per AAD 2024 — completely missing.
- **Azelaic acid 15–20%:** Pregnancy-safe; useful for post-inflammatory hyperpigmentation — missing.
- **Pregnancy:** No mention. Topical retinoids and tetracyclines CI; azelaic acid, BPO, erythromycin acceptable.
- **Oral antibiotics (doxycycline, minocycline):** Important for moderate inflammatory acne — missing. AAD 2024 emphasizes ≤3–4 month courses with concurrent BPO.

### Missing Items
- Oral antibiotics (doxycycline 50–100 mg BID, minocycline) for moderate inflammatory acne.
- Spironolactone 50–200 mg/day for adult women.
- Cyproterone/EE (Diane-35).
- Azelaic acid (pregnancy-safe).
- Trifarotene (Aklief).
- Pregnancy/lactation guidance.
- Skin-of-color considerations (post-inflammatory hyperpigmentation).
- Isotretinoin pregnancy prevention (RevitaPharm).
- Statement that acne is **not in Ontario MA scope** (refer to MD/NP).
- Application sequencing (morning BPO, evening retinoid — avoid co-application irritation/inactivation).

### Recommended References (ONT > CAN > USA > INTL)
1. **OCP Minor Ailments list** (confirm scope exclusion); **OPA clinical resources**.
2. **Canadian Dermatology Association** acne resources; **RxTx (CTC) Acne** chapter; **RxFiles Derm comparison charts**.
3. **Asai et al., CMAJ 2016 — Management of acne** (Canadian guideline, awaiting update).
4. **AAD 2024 Guidelines of Care for the Management of Acne Vulgaris** (Reynolds et al., JAAD 2024).
5. **NICE CKS — Acne vulgaris** (updated 2023).
6. **NICE NG198 — Acne vulgaris management** (2021, reviewed 2023).

---

## 10. Cold Sores (Oral Herpes Simplex) — Good (revisions needed)

### Discrepancies / Outdated Info
- **Famciclovir 1500 mg single dose:** correct (Health Canada label, Spruance trials).
- **Valacyclovir 2 g BID × 1 day:** correct (Spruance 2003).
- **Acyclovir 400 mg TID × 5 days:** acceptable but the **labelled regimen is 400 mg 5×/day × 5 days** (or 200 mg 5×/day) for episodic recurrent herpes labialis. TID is more typical for genital HSV suppression. Revise.
- **Suppressive valacyclovir 500 mg OD:** correct dose; threshold typically ≥6 outbreaks/year + significant impact. Add **acyclovir 400 mg BID** as suppressive alternative.
- **Penciclovir 1% (Denavir):** **Not currently marketed in Canada** (Vectavir discontinued). Listing it is misleading.
- **Acyclovir 5% cream:** modest efficacy; AAD/Cochrane note ~0.5 day benefit. Acceptable.
- **Docosanol q2–3h:** label is "5×/day" — q2–3h is reasonable approximation.
- **Ontario MA scope:** Herpes labialis IS in Ontario pharmacist scope (added 2023). Pharmacists can prescribe oral antivirals. Flag this and provide OCP-recommended algorithm (typically prescribe at prodrome).
- **L-lysine:** Evidence is weak/inconsistent — "may reduce recurrence" is generous; label as low-quality evidence.
- **Pregnancy:** Acyclovir/valacyclovir generally safe in pregnancy — not mentioned.

### Missing Items
- Explicit flag that this **IS in Ontario MA scope**; pharmacist can prescribe oral antivirals.
- Acyclovir 200 or 400 mg 5×/day × 5 days (label dose).
- Valacyclovir 500 mg BID × 3 days (alternative episodic regimen).
- Acyclovir 400 mg BID as suppressive alternative.
- Renal dose adjustments for acyclovir/valacyclovir.
- Pregnancy/lactation safety statement.
- Pharmacist prescribing criteria per OCP MA (age ≥12, prior diagnosis, prodrome/early lesion).
- Counselling: antivirals most effective at prodrome — hours matter.
- HSV-1 vs HSV-2 (most cold sores HSV-1, but HSV-2 increasingly orolabial).

### Recommended References (ONT > CAN > USA > INTL)
1. **OCP Minor Ailments — Cold Sores (Herpes Labialis)** prescribing algorithm.
2. **OPA cold sore MA module**.
3. **RxTx (CTC) — Herpes Simplex** (CPhA).
4. **Health Canada product monographs** (Valtrex, Zovirax, Famvir).
5. **RxFiles antiviral comparison**.
6. **AAD guidance on herpes labialis**; Spruance et al. trials.
7. **NICE CKS — Herpes simplex – oral** (updated 2023).
8. **Cochrane review on topical antivirals for herpes labialis**.

---

## 11. Musculoskeletal Sprains — Good (revisions needed)

### Discrepancies / Outdated Info
- **Ontario MA scope:** Sprains/strains ARE in Ontario MA scope (added 2023) — flag explicitly. Pharmacists can assess and prescribe oral/topical NSAIDs.
- **Ottawa Ankle Rules wording:** "Posterior tip/base of lateral malleolus" — correct rule is bony tenderness at the posterior edge or tip of lateral malleolus (distal 6 cm) and similarly medial. Wording is slightly muddled. Missing **inability to bear weight both immediately AND in ED for 4 steps**. **Ottawa Knee Rules** also not mentioned.
- **POLICE vs PEACE & LOVE:** Current consensus (Dubois & Esculier, **BJSM 2019**) advocates **PEACE & LOVE** (Protection, Elevation, Avoid anti-inflammatories early, Compression, Education / Load, Optimism, Vascularization, Exercise). POLICE is dated; PEACE & LOVE de-emphasizes ice and cautions against early NSAIDs (may impair healing). JSON's strong NSAID-first stance is contested.
- **Ice 15–20 min q1–2h × 48h:** Recent evidence (BJSM, AAOS) — ice gives analgesia but limited healing effect; q1–2h excessive. q2–4h more typical.
- **Ibuprofen 400–600 mg q6–8h × 5–7 days:** OK; OTC max in Canada is 1200 mg/day.
- **Naproxen 500 mg BID:** correct (Rx; OTC = 220 mg).
- **Diclofenac gel:** Voltaren Emulgel 1.16% (QID) vs 2.32% (BID) — distinguish.
- **Acetaminophen:** Max 4 g/day (3 g/day in elderly/hepatic impairment) — not stated.
- **Air stirrup brace:** lace-up braces equivalent and often preferred per AAOS.
- **Grade III referral:** correct.

### Missing Items
- Ontario MA scope statement.
- Ottawa Knee Rules.
- PEACE & LOVE acronym (current evidence-based).
- Caution about NSAIDs in early healing phase.
- NSAID CIs detail (CKD, PUD, T3 pregnancy, anticoagulants, age >65).
- Methocarbamol/cyclobenzaprine for muscle strain (some MA scopes).
- Topical capsaicin / methyl salicylate alternatives.
- Recovery time expectations (Grade I: 1–2 wk; II: 3–6 wk; III: months).
- Functional bracing > immobilization for ankle (AAOS).
- Concussion screening if mechanism involved head.
- DVT consideration in immobilized lower-limb injury.

### Recommended References (ONT > CAN > USA > INTL)
1. **OCP Minor Ailments — Musculoskeletal sprains/strains/tendonitis** prescribing algorithm.
2. **OPA MA modules**.
3. **Ottawa Ankle/Knee Rules** (Stiell, original Canadian work).
4. **Canadian Pain Society** musculoskeletal guidance; **RxTx Musculoskeletal Pain**; **RxFiles NSAID comparison**.
5. **AAOS Ankle Sprain CPGs**; **ACSM** position statements.
6. **Dubois & Esculier, BJSM 2019** (PEACE & LOVE).
7. **NICE CKS — Sprains and strains** (updated 2024).

---

## 12. Nausea & Vomiting — Needs revision

### Discrepancies / Outdated Info
- **Ontario MA scope:** General N&V is **NOT** in Ontario MA prescribing scope. **NVP is also not** in current Ontario MA list (unlike AB, SK). Frame as OTC counselling + triage. Pharmacists can recommend Diclectin only via prescription — **Diclectin is Rx-only in Canada** (not OTC). JSON does not clarify this — important error.
- **Diclectin titration:** "2 tabs at bedtime, can increase to QID" — actual standard is Day 1: 2 tabs qhs; Day 2: add 1 AM (3 tabs/day); Day 3: add 1 mid-afternoon (max **4 tabs/day** = 2 qhs + 1 AM + 1 mid-afternoon). "QID" misleading — max is 4 tabs/day, not 4 doses.
- **Diclectin "30 min before bed on empty stomach":** correct (delayed-release ~4–6h onset).
- **Dimenhydrinate in pregnancy:** Has good safety data; SOGC 2016 includes it in NVP algorithm after pyridoxine-doxylamine. JSON's caution is overstated.
- **Ondansetron in pregnancy:** SOGC/Motherisk: small absolute risk increase for cardiac defects/cleft palate in some studies; generally avoid **first trimester** if alternatives exist; reasonable later.
- **Metoclopramide:** BBW for tardive dyskinesia — limit to ≤12 weeks; dose 10 mg TID-QID. JSON's "5–10 mg q6–8h" is slightly under-dosed; max 30 mg/day correct.
- **Ondansetron 4–8 mg q4–8h:** standard; max IV 16 mg withdrawn. QTc warning correct; add serotonin syndrome risk with serotonergic drugs.
- **BRAT diet:** No longer strongly recommended (AAP/CPS); current advice = early refeeding with normal age-appropriate diet.
- **Pyridoxine (B6) monotherapy:** First step in SOGC NVP algorithm (10–25 mg q6–8h) before adding doxylamine — **missing as standalone**.
- **Cannabis hyperemesis syndrome:** Increasingly relevant; not in DDx.
- **Cyclic vomiting syndrome:** Missing from DDx.
- **DKA, Addisonian crisis, increased ICP:** Should be in red flags more explicitly.

### Missing Items
- Explicit Ontario MA scope statement (not in scope — counsel/refer).
- Pyridoxine 10–25 mg q6–8h as initial NVP step.
- SOGC NVP stepwise algorithm.
- Cannabinoid hyperemesis syndrome in DDx (hot showers relieve).
- Cyclic vomiting syndrome.
- Pediatric dosing & ORS emphasis (Pedialyte) for kids.
- Specific dehydration assessment (capillary refill, skin turgor, tachycardia).
- Drug-induced QTc and ECG considerations for ondansetron.
- Note that BRAT is outdated — recommend early normal diet.
- Hyperemesis gravidarum (IV fluids; thiamine before glucose to prevent Wernicke's).
- Prochlorperazine (Stemetil) and promethazine — common Canadian options not listed.

### Recommended References (ONT > CAN > USA > INTL)
1. **OCP Minor Ailments list** (note exclusion); **OPA practice resources**.
2. **SOGC Clinical Practice Guideline No. 344 — Management of NVP and Hyperemesis Gravidarum** (2016, current).
3. **Motherisk NVP algorithm**.
4. **RxTx — Nausea and Vomiting** (CPhA); **RxFiles Antiemetics**.
5. **ACG Clinical Guideline: Gastroparesis** (2022); **ACOG Practice Bulletin 189 NVP** (aligns with SOGC).
6. **AGA guidance on nausea/vomiting**.
7. **NICE CKS — Nausea/vomiting in pregnancy** (2024); **NICE CKS Antiemetics**.

---

## 13. Insect Bites & Stings — Good (revisions needed)

### Discrepancies / Outdated Info
- **Topical diphenhydramine (Benadryl cream):** Generally **discouraged** in Canadian/Ontario practice — risk of contact sensitization and limited efficacy (RxFiles, DermNet, NICE CKS). Recommend removing or downgrading.
- Typo in note: "do not use systematically AND topically" should be "systemically." Reasoning: unpredictable systemic absorption from cream + sensitization risk.
- **Cetirizine 10 mg OD:** OK; could add bilastine/loratadine/fexofenadine. First-gen (diphenhydramine, hydroxyzine) at bedtime as adjunct for sleep — not currently mentioned.
- **Bee sting removal:** Current guidance (AAFP, NICE CKS) — *speed* matters more than *method*; scrape OR pluck quickly. "Do NOT squeeze" is fine but slightly overstated.
- **Prednisone 20–40 mg × 3–5 days for large local reactions:** Reasonable; most references suggest 40–60 mg × 3–5 days; no taper for short courses.
- **Ontario MA scope:** Insect bites/stings is NOT a designated Ontario MA — general OTC counselling scope. Cross-reference to Tick Bite/Lyme MA (which IS in scope, doxycycline 200 mg single dose).

### Missing Items
- Mosquito-borne illness (West Nile, EEE — relevant Ontario summer).
- **EpiPen counselling** (technique, expiration, two-pen carry, call 911 even after use).
- Hymenoptera venom immunotherapy referral pathway for confirmed systemic reactors.
- Pediatric dosing for cetirizine, hydrocortisone in young children.
- Spider bites (rare in Ontario — black widow/brown recluse not endemic; reassurance).
- Pain management: oral acetaminophen/ibuprofen for sting pain.
- Toxicity threshold for multiple stings (>10/kg child, >50 adult).

### Recommended References (ONT > CAN > USA > INTL)
1. **OCP Minor Ailments list** (note insect bites NOT in MA scope); **Public Health Ontario** tick/Lyme guidance.
2. **RxFiles "Bites & Stings"** chart; **CSACI Anaphylaxis Guidelines 2023**; **AMMI Canada Lyme PEP statement**.
3. **AAAAI/ACAAI Stinging Insect Hypersensitivity Practice Parameter 2017 update**; **CDC Insect Bite/Sting** page.
4. **NICE CKS — Insect bites and stings** (updated 2023); UpToDate.

---

## 14. Uncomplicated UTI (Women) — Good (revisions needed)

### Discrepancies / Outdated Info
- **Ontario MA UTI scope criteria incomplete in key_questions.** Ontario MOH/OCP MA UTI algorithm (effective Jan 1, 2023; updated 2024) requires ALL of: non-pregnant female, **age 16–64**, no fever/flank pain/systemic symptoms, no recurrent UTI (≥2 in 6 months or ≥3 in 12 months), **no antibiotics for UTI in past 3 months**, no catheter, no known structural/functional GU abnormality. JSON missing age <65 cutoff and prior antibiotic exclusion.
- **Nitrofurantoin 100 mg BID × 5 days:** correct (Ontario MA, IDSA 2011, Bugs & Drugs, AMMI).
- **TMP-SMX DS BID × 3 days:** correct. Local E. coli resistance threshold of 20% is correct (IDSA). Many Ontario regions now exceed 20% — advise checking local antibiogram. Last-trimester pregnancy and G6PD cautions missing.
- **Fosfomycin 3 g single dose (Monurol):** correct dose; on ODB via LU code. Slightly lower efficacy than nitrofurantoin per Huttner 2018 — note.
- **Phenazopyridine in Canada:** Available OTC as 95 mg (not 200 mg). Typical OTC dose: **190 mg (2 tabs) TID × max 2 days**. The 200 mg TID is US Pyridium Rx strength.
- **D-mannose 2 g OD:** Mixed evidence; **MERIT trial 2024 (JAMA)** showed no benefit over placebo for recurrence prevention. Downgrade.
- **Cranberry PAC 36 mg/day:** 2023 Cochrane update supports modest benefit for women with recurrent UTI — wording OK.

### Missing Items
- **Fluoroquinolone exclusion** — Ontario MA explicitly excludes cipro/levo (Health Canada/FDA black box; reserved for pyelonephritis/complicated). State explicitly.
- **Beta-lactams** (amox-clav, cephalexin, cefixime) as alternatives when other options CI'd.
- **Pregnancy testing** prior to treatment in women of childbearing age — Ontario MA requirement.
- **Documentation/MD notification** — Ontario MA requirement.
- Vaginal estrogen for postmenopausal recurrent UTI (out of MA scope; refer).
- Self-resolution rate (~25–50%) and shared decision-making around delayed prescribing.
- **eGFR threshold for nitrofurantoin updated** (Health Canada/CPS now ≥30; previously 60). JSON correctly says ≥30.
- Diabetes — not auto-excluded if otherwise uncomplicated.
- STI screening (chlamydia/gonorrhea) when urethritis suspected.

### Recommended References (ONT > CAN > USA > INTL)
1. **Ontario MOH Pharmacist Assessment & Prescribing for Minor Ailments — UTI Algorithm** (OCP, eff. Jan 2023, current 2024).
2. **OPA UTI MA toolkit**; **Public Health Ontario antibiogram**.
3. **Bugs & Drugs** (online, 2024); **RxFiles Cystitis chart** (2023); **AMMI Canada** statements; **Choosing Wisely Canada**.
4. **IDSA/ESCMID 2011 Uncomplicated Cystitis Guidelines** (current for uncomplicated); **IDSA 2024 Complicated UTI Update** (context/exclusion); **AUA/CUA recurrent UTI guideline**.
5. **NICE CKS — UTI (lower) – women** (updated 2024); **EAU Urological Infections 2024**.

---

## 15. Herpes Zoster (Shingles) — Good (revisions needed)

### Discrepancies / Outdated Info
- **Antiviral doses correct:** valacyclovir 1000 mg TID × 7d; famciclovir 500 mg TID × 7d; acyclovir 800 mg 5×/day × 7d (per IDSA, AMMI, RxFiles, NICE CKS).
- **Rationale text error:** Notes say "Valacyclovir preferred (BID absorption…)" — **incorrect**. Valacyclovir is **TID** (not BID) for zoster. Dose field is right; rationale text is wrong (should say "less frequent dosing than acyclovir's 5×/day").
- **72-hour window:** correct, with caveat that treatment beyond 72h still indicated if new vesicles, ophthalmic, disseminated, or immunocompromised — JSON captures this well.
- **Ontario MA scope:** Shingles **added to Ontario MA Oct 1, 2023**. Criteria: immunocompetent adult, rash <72h (or new vesicles), non-ophthalmic, non-otic, non-disseminated, not pregnant. JSON aligns but doesn't explicitly state these as MA inclusions/exclusions.
- **Renal dosing:** Valacyclovir dose-reduce at CrCl <50 (correctly noted as eGFR <50). Specific renal tables missing (e.g., valacyclovir 1000 mg BID at CrCl 30–49; 1000 mg OD at 10–29).
- **Gabapentin 300 mg TID:** May be too high as starting dose in elderly — typical start 100–300 mg HS, titrate. **Pregabalin** (75 mg BID, titrate to 150 mg BID) commonly used in Canadian practice — not mentioned.
- **Amitriptyline 10–25 mg HS:** correct, but caution in elderly (anticholinergic, falls) — not mentioned.
- **Acute gabapentin/amitriptyline reducing PHN:** Evidence is **weak** (Cochrane, NICE) — they treat acute pain but PHN-prevention benefit uncertain. Soften wording.

### Missing Items
- **Corticosteroids** (prednisone) — fallen out of favor (no PHN benefit, increases AEs); mention to deprescribe if asked.
- **Acetaminophen/NSAIDs/opioids** for acute pain — only briefly listed.
- **Lidocaine 5% patch** for established PHN — not mentioned.
- **Shingrix (RZV) update:** NACI now recommends Shingrix for adults **≥50** AND **immunocompromised adults ≥18** (NACI 2022 update). Publicly funded in Ontario for ages **65–70** (UIIP, since 2016). Wait **≥6–12 months** after acute zoster before vaccinating. JSON missing these nuances.
- **Infection control:** contact precautions until crusted (present); add airborne precautions in disseminated/immunocompromised.
- **PHN definition** (pain >90 days post-rash) and risk factors (age, severity, ophthalmic) — partially covered.
- **Pediatric/adolescent shingles:** rare, often milder, antivirals optional — not addressed.

### Recommended References (ONT > CAN > USA > INTL)
1. **Ontario MOH/OCP Minor Ailments — Herpes Zoster algorithm** (Oct 2023).
2. **Public Health Ontario Shingles** fact sheet; **OPA shingles MA toolkit**.
3. **NACI Statement on Recombinant Zoster Vaccine** (updated 2022/2024); **AMMI Canada / CASEM** zoster guidance; **RxFiles "Shingles" chart**; **Bugs & Drugs**.
4. **IDSA 2022 Herpes Zoster guideline** (Cohen et al., CID); **CDC Shingrix recommendations** (ACIP 2022 immunocompromised update).
5. **NICE CKS — Shingles** (updated 2023); **UK Green Book Chapter 28a**.

---

## 16. Pinworms (Enterobiasis) — Needs revision

### Discrepancies / Outdated Info
- **Pyrantel pamoate 11 mg/kg single dose, repeat in 2 weeks** — correct (CPS, Combantrin monograph, CDC). Max **1 g** correct.
- **Mebendazole 100 mg single dose, repeat in 2 weeks** — correct dose. **Important:** Mebendazole (Vermox) was discontinued in Canada around 2012 and has had **intermittent availability** since; as of 2024–2025 **not consistently available**. JSON statement is partially correct but misleading — patients/pharmacists often cannot obtain it. **Pyrantel pamoate (Combantrin) is the practical first-line in Canada.**
- **Albendazole 400 mg single dose, repeat in 2 weeks** — not mentioned; available in Canada via Special Access Programme or compounding; sometimes used when mebendazole unavailable.
- **Ontario MA scope:** Pinworms is **NOT** a designated Ontario MA (as of 2024–2025 OCP list). Pyrantel pamoate is OTC; pharmacist counselling falls under general OTC advice, not MA prescribing. Clarify scope.
- **"Threadworm" listed as DDx** — in UK English, "threadworm" *is* pinworm (Enterobius vermicularis). Not a separate DDx. Replace with "pruritus ani (idiopathic)" or "candidal perianal dermatitis."
- **Safe in children >1 year** — pyrantel pamoate generally considered safe ≥**2 years** per Canadian product monograph (some sources say ≥1 year off-label). Mebendazole ≥2 years per most Canadian sources. Verify age threshold.

### Missing Items
- **Pregnancy/lactation:** Pyrantel preferred (poorly absorbed, likely safe); mebendazole/albendazole avoided in T1.
- **Diagnosis confirmation:** Scotch tape test mentioned but **empirical treatment is standard** in Canada when classic symptoms — clarify.
- **Pediatric weight-based dosing tables** for pyrantel pamoate suspension (50 mg/mL).
- **Environmental decontamination details:** vacuum carpets, damp-dust surfaces, avoid shaking bedding (aerosolizes eggs), keep nails short, discourage thumb-sucking and nail-biting.
- **Asymptomatic household contacts:** treat all simultaneously (present). Daycare/school: not reportable in Ontario; brief childcare exclusion.
- **Re-treatment failure:** poor adherence vs reinfection vs resistance (rare).
- **Adhesive tape ("pinworm paddle") test** is gold-standard diagnostic; stool O&P has poor sensitivity. Clarify.

### Recommended References (ONT > CAN > USA > INTL)
1. **Public Health Ontario "Enterobiasis"** fact sheet; **OCP MA list** (confirm pinworm OUT of scope).
2. **Canadian Paediatric Society — "Pinworm Infection"** Practice Point (current); **CPS Combantrin monograph**; **AMMI Canada** parasitology resources; **RxTx** chapter on parasitic infections.
3. **CDC Parasites — Enterobiasis** (updated 2022); **IDSA pediatric infection** guidance.
4. **NICE CKS — Threadworm** (updated 2023); WHO STH guidance (less applicable).

---

## 17. GERD (Heartburn) — Good (revisions needed)

### Discrepancies / Outdated Info
- **Ontario MA scope:** GERD/heartburn is **NOT** in the Ontario MA program (Phase 1 Jan 2023 + Phase 2 Oct 2023). Pharmacists can perform OTC counselling and Rx adaptations only — cannot independently prescribe a PPI for new GERD under MA. Must be explicit.
- **Famotidine dosing:** 10–20 mg PRN/BID is correct for OTC. Note **ranitidine is permanently withdrawn (NDMA, 2020)** — clarify for patients who still ask.
- **PPI duration:** ACG 2022 recommends **8 weeks** as standard initial trial (JSON's "4–8 weeks" is acceptable but 8 weeks is guideline default then step-down).
- **"On-demand" PPI:** Supported for non-erosive reflux disease only; do not apply to erosive esophagitis. JSON is slightly ambiguous.
- **Age threshold:** ACG 2022 uses **≥60** (not 50) for new-onset dyspepsia/GERD endoscopy referral. Canadian/CAG guidance varies — clarify.
- **Erosive esophagitis as "preferred_when" for first-line:** Requires endoscopic diagnosis — beyond OTC pharmacist scope; should be a referral, not an indication for pharmacist-initiated PPI.

### Missing Items
- Explicit OTC vs prescribing scope statement for Ontario pharmacists.
- Pregnancy considerations (lifestyle + antacids/alginate first; H2RA/PPI if needed — omeprazole and pantoprazole acceptable).
- PPI long-term adverse effects: C. difficile, hypomagnesemia, B12 deficiency, fracture risk, CAP — relevant for step-down counselling.
- H. pylori test-and-treat consideration in dyspepsia overlap, especially <60 without alarms (ACG/CAG).
- Drug interactions: omeprazole–clopidogrel (use pantoprazole), PPI with methotrexate, PPI reducing absorption of ketoconazole/atazanavir/iron.
- Atypical/extra-esophageal GERD: chronic cough, laryngitis, dental erosion (in refer_when but not key_questions).
- Rebound acid hypersecretion on abrupt PPI discontinuation — taper advised.
- OTC omeprazole 20 mg available in Canada (Olex).

### Recommended References (ONT > CAN > USA > INTL)
1. **OCP Minor Ailments scope** document; **OPA Minor Ailments resources**; **RxTx (CPhA) GERD** chapter.
2. **CAG consensus on GERD/dyspepsia**; **RxFiles GERD/PPI Q&A**; **Choosing Wisely Canada — Deprescribing PPIs**.
3. **ACG Clinical Guideline: Diagnosis and Management of GERD** (Katz et al., Am J Gastroenterol 2022).
4. **NICE CG184 / NG12** (dyspepsia and GORD in adults).

---

## 18. Eczema / Contact Dermatitis — Good (revisions needed)

### Discrepancies / Outdated Info
- **Ontario MA scope:** Atopic dermatitis (eczema) is in MA (Phase 2, Oct 2023). However, **allergic contact dermatitis (ACD) is NOT** in Ontario MA. Combining them in one card risks scope creep; note pharmacists cannot prescribe for new-onset ACD requiring patch testing.
- **Betamethasone dipropionate 0.05%:** This is a **potent (Class II–III) TCS** — listing under first-line without scope caveat is risky. Ontario MA TCS prescribing is generally limited to **low- to mid-potency** (hydrocortisone 1–2.5%, desonide 0.05%, betamethasone valerate 0.05–0.1%, mometasone 0.1%). High-potency dipropionate typically warrants physician input.
- **Tacrolimus/pimecrolimus (TCIs):** Prescription products, **NOT within Ontario MA prescribing scope** for pharmacists. Frame as physician-prescribed second-line, not pharmacist-initiated.
- **FDA BBW for TCIs:** Current AAD 2023 guideline conditionally recommends TCIs and acknowledges absent population-level cancer signal, but the boxed warning still exists. Wording should be more measured — "no increased risk" overstates certainty.
- **Bleach baths:** AAD 2023 gives conditional recommendation; "½ cup in full tub" (~0.005%) is accurate. 2×/week frequency reasonable.
- **Dupilumab in red flags:** Misplaced — it's a treatment escalation, not a red flag. Move to refer_when.
- **Erythroderma:** Defined as ≥80–90% BSA — correct. Should specify **ER referral**, not just "specialist."

### Missing Items
- Clear differentiation: atopic vs irritant vs allergic contact (pathophysiology, distribution, treatment differences).
- **Fingertip unit (FTU)** guidance with examples (1 FTU = 2 adult palms).
- **Proactive/maintenance** therapy: TCS 2×/week to previously affected sites — AAD 2023 strong recommendation.
- **Wet wrap therapy** for severe flares.
- **Antihistamines not effective** for itch in atopic dermatitis (AAD 2023); sedating ones may help sleep.
- **Pediatric scope:** Ontario MA permits AD treatment in children — age limit clarification needed.
- **Crisaborole (Eucrisa) 2% ointment** — non-steroidal PDE4 inhibitor, available in Canada.
- **JAK inhibitors** (topical ruxolitinib; oral abrocitinib, upadacitinib) — escalation pathway.
- **Top ACD allergens:** nickel, fragrance, methylisothiazolinone (MI).
- **Patch testing referral** — note pharmacists do not perform.
- **Quantity counselling:** how much TCS to dispense (e.g., 30 g for 2-week trunk flare).

### Recommended References (ONT > CAN > USA > INTL)
1. **OCP Minor Ailments — Atopic Dermatitis** algorithm; **OPA MA toolkit**; **RxTx Atopic Dermatitis** (CPhA).
2. **Canadian Dermatology Association — AD position statements**; **Canadian AD CPG** (Lansang et al., 2019); **RxFiles Eczema/AD comparison chart**.
3. **AAD Guidelines of Care for Atopic Dermatitis — Topical Therapies** (Sidbury et al., JAAD 2023); **AAD Systemic Therapy guideline 2024**.
4. **NICE NG190 / CG57** (atopic eczema); **EuroGuiDerm AD guideline 2022**.

---

## 19. Smoking Cessation — Needs revision

### Discrepancies / Outdated Info
- **Ontario MA scope (CRITICAL):** Smoking cessation is **NOT** in the Ontario MA program. Pharmacists in Ontario CAN prescribe varenicline, bupropion, and NRT, but under a **separate authority — the Ontario Smoking Cessation Prescribing Program** (regulation in effect since 2012, expanded 2021), funded via ODB for eligible patients. The JSON's repeated phrase "pharmacist can prescribe under Ontario minor ailments" is **factually incorrect**. Must be corrected throughout.
- **STOP program:** Not mentioned. The CAMH-led **Smoking Treatment for Ontario Patients (STOP)** program provides free NRT and is a key Ontario referral pathway.
- **Varenicline supply:** Champix withdrawn 2021 (nitrosamine); **generic varenicline returned to Canadian market 2023** — supply restored. Branding as "Champix" may mislead; note generics are the main supply.
- **Varenicline dosing:** Correct (0.5 mg OD ×3d → 0.5 mg BID ×4d → 1 mg BID × 12 weeks). **24-week extension for relapse prevention** not mentioned.
- **Bupropion duration:** 7–12 weeks acute; up to 6 months maintenance — not mentioned.
- **Combination NRT patch dose:** ≥10 cig/day → 21 mg patch; <10 cig/day → 14 mg patch. Heavy smokers (>40/day) may need 2 patches.
- **Pregnancy:** Bupropion and varenicline generally **not recommended** in pregnancy (CAN-ADAPTT, SOGC); behavioural support first, then intermittent NRT (gum/lozenge) preferred. JSON's "discuss risk-benefit" understates recommendation.
- **Fagerström / HSI:** Now typically the **Heaviness of Smoking Index (HSI)** — 2-item shortened version (time to first cigarette + cigarettes/day); full FTND less used clinically.
- **Stages of change:** Transtheoretical model de-emphasized in current guidelines (CAN-ADAPTT favours 5 A's regardless of stage).

### Missing Items
- **5 A's framework** (Ask, Advise, Assess, Assist, Arrange) — foundational.
- **Cytisine (Cravv)** — Health Canada-approved, plant alkaloid; Cochrane 2023 high-certainty evidence; included in updated CAN-ADAPTT guidance.
- **E-cigarettes/vaping:** Cochrane 2023 high-certainty evidence nicotine e-cigarettes increase quit rates vs NRT; Health Canada position + harm reduction framing.
- **Bupropion seizure risk:** dose ceiling 300 mg/day SR; extended CI list (abrupt alcohol/BZD discontinuation, anorexia/bulimia, MAOI within 14 days).
- **Varenicline counselling:** insomnia/vivid dreams — dose 1 mg BID earlier in day.
- **Drug interactions on cessation:** clozapine, olanzapine, theophylline, caffeine, fluvoxamine, R-warfarin — dose reductions ~25–50% over 1 week post-cessation.
- **Nicotine mouth spray** as NRT option (available in Canada).
- **ODB funding:** Covers 12 weeks/year of varenicline, bupropion, NRT under Ontario pharmacist prescribing.
- **Talk Tobacco** — Indigenous-specific Smokers' Helpline service (equity referral).
- **Lung cancer screening eligibility:** Ontario Lung Screening Program (age 55–74, ≥20 pack-years).
- DDx field is empty — could note nicotine withdrawal vs depression vs anxiety overlap.

### Recommended References (ONT > CAN > USA > INTL)
1. **Ontario Pharmacists' Smoking Cessation Prescribing Program** (MOH); **CAMH STOP Program**; **Ontario Smokers' Helpline (Talk Tobacco)**; **OCP Smoking Cessation Practice Tool**; **OPA resources**.
2. **CAN-ADAPTT Canadian Smoking Cessation Clinical Practice Guideline** (2011 + updates); **RxFiles Smoking Cessation chart**; **Health Canada cytisine/varenicline updates**.
3. **U.S. PHS — Treating Tobacco Use and Dependence: 2008 Update**; **USPSTF 2021 tobacco cessation recommendation**; **AHA/ACC 2018 statement**.
4. **Cochrane Tobacco Addiction Group reviews** (2023 — e-cigarettes, NRT, varenicline, cytisine); **NICE NG209 — Tobacco: preventing uptake, promoting quitting** (2021); **WHO MPOWER**.

---

# Appendix — Ontario MA Scope Quick Reference

| Condition | In Ontario MA? | Schedule 4 drugs (examples) | Max duration |
|-----------|---------------|------------------------------|--------------|
| Allergic Rhinitis | Yes (Jan 2023) | INCS (fluticasone, budesonide), 2nd-gen antihistamines | Up to 6 months |
| Oral Thrush | Yes (Jan 2023) | Nystatin suspension (NOT fluconazole) | 14 days |
| Urticaria/Hives | Yes (Oct 2023) | 2nd-gen antihistamines (non-sedating) | 6 weeks |
| Hemorrhoids | Yes (Jan 2023) | Topical HC ± local anesthetic | 7 days |
| Dysmenorrhea | Yes (Jan 2023) | NSAIDs (listed in Schedule 4) — NOT COC/IUS | Per cycle, reassess ×3 |
| Impetigo | Yes (Jan 2023) | Mupirocin, fusidic acid, ozenoxacin (topical only) | 5–7 days |
| Tick Bite/Lyme | Yes (Jan 2023) | Doxycycline 200 mg single dose | Once |
| Conjunctivitis | Yes (Jan 2023) | Tobramycin, erythromycin, fusidic acid eye drops | 5–7 days |
| Acne Vulgaris | **NO** | N/A — OTC counselling only | N/A |
| Cold Sores | Yes (Oct 2023) | Valacyclovir, acyclovir, famciclovir | Episodic or suppressive |
| MSK Sprains | Yes (Oct 2023) | NSAIDs (oral/topical) | Short course |
| Nausea & Vomiting | **NO** | OTC counselling only | N/A |
| Insect Bites/Stings | **NO** | OTC counselling only | N/A |
| Uncomplicated UTI | Yes (Jan 2023) | Nitrofurantoin, TMP-SMX, fosfomycin | 3–5 days |
| Herpes Zoster | Yes (Oct 2023) | Valacyclovir, famciclovir, acyclovir | 7 days |
| Pinworms | **NO** | OTC counselling (pyrantel pamoate OTC) | N/A |
| GERD | **NO** | OTC counselling/adaptation only | N/A |
| Eczema (atopic) | Yes (Oct 2023) | Low-to-mid potency TCS — NOT TCIs | Short course |
| Smoking Cessation | **NO (separate authority)** | Varenicline, bupropion, NRT — via Smoking Cessation Prescribing Program | Per program |

*Source: OCP Schedule 4, O. Reg. 256/24 (May 2025); OCP Minor Ailments Program (Jan 2023, Oct 2023 expansion)*

---
*Audit complete. Review all "Needs revision" conditions before deploying updates.*
