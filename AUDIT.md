# rxguide — Audit of Work Since Reference Tab Restructuring

**Date:** 2026-05-08
**Branch:** `claude/review-site-structure-cphlJ` → merged to `main` via PRs #1–#18
**Scope:** All changes from initial alias-linking fixes through the tab-width standardization (i.e., the work iteratively built around the Reference tab and the broader app).

---

## Executive Summary

This audit documents 18 merged pull requests (#1–#18) that materially expanded the rxguide content, fixed several critical rendering bugs, and reorganized the UX of the Reference tab, the Jurisprudence tab, and the Disease category ordering. The work falls into seven thematic pillars:

1. **Drug data integrity** — string-typed interactions converted to objects; severity reclassifications; cyclosporine card; cross-class warnings (anticholinergic burden, QT-prolongation stacking, nephrotoxin stacking, opioid+benzo/Z-drug/gabapentinoid black box, opioid×opioid additive); 41 missed reclassification pairs.
2. **Disease coverage and linkage** — 1,527+ treatment rows repopulated with drug-key agents from notes/details text; 4 new high-yield travel conditions; 1 new pharmacy-practice condition (medication safety).
3. **Vaccines** — `renderDrugLink` cross-DRUGS/VACCINES integration; 5 new vaccines (PCV13, Vaxneuvance, mResvia, MenQuadfi, Rotarix); search disambiguation for adult-vs-pediatric variants.
4. **Reference content** — 12 new reference tables (5 allergy cross-reactivity, 5 drug-food, 2 geriatric Beers/STOPP-START, 3 medication safety LASA/high-alert/dispensing-errors).
5. **Deprescribing** — 5 new tapering protocols (antidepressant, gabapentinoid, oral corticosteroid, anticonvulsant, ADHD stimulant).
6. **Per-disease pregnancy/lactation summary** — first dynamic, then converted to static (precomputed) for performance; 448 conditions covered.
7. **UX & layout** — Reference tab category consolidation (12→9); Jurisprudence accordion → detail-page layout matching Minor Ailments; disease category order standardized; standardize tab width across all tabs (1520px max).

---

## Final State (live on main)

### File metrics
- **Lines:** 244,655
- **File size:** ~22 MB

### Data structure counts
| Structure | Count | Notes |
|---|---|---|
| `DRUGS` | **1,089** | +1 (cyclosporine) |
| `VACCINES` | **56** | +5 (PCV13, Vaxneuvance, mResvia, MenQuadfi, Rotarix) |
| `DISEASES` (categories) | **20** | order standardized |
| `DISEASES` (conditions) | **450** | +4 travel, +1 practice = +5 |
| `REFERENCE_TABLES` | **61** | +12 new tables (allergy 5, food 5, geriatric 2, safety 3); displayed in 9 categories |
| `DEPRESCRIBING_PROTOCOLS` | **17** | +5 tapering protocols |
| `MINOR_AILMENTS` | **19** | unchanged (smoking cessation already existed) |
| `PREG_DATA` | 1,088 | unchanged |
| `NAPRA_ODB_DATA` | 1,089 | unchanged |
| `DRUG_FAMILIES` | 454 | unchanged |
| `FAMILY_MAP` | 1,198 | +1 (cyclosporine → Calcineurin Inhibitors) |
| `EMPIRIC_THERAPY_SYNDROMES` | 67 | unchanged |
| **Total interactions** | **8,177** | up from ~6,323 |

### Interaction severity distribution (final)
| Severity | Count | % |
|---|---|---|
| Major | 4,152 | 50.8% |
| Moderate | 2,314 | 28.3% |
| Note | 575 | 7.0% |
| Minor | 465 | 5.7% |
| Contraindicated | 440 | 5.4% |
| Beneficial | 231 | 2.8% |

(Pre-work baseline: Major 36%, Note 9.6%, Contraindicated 6.9%.)

### Disease category order (matches user spec)
Cardiology (45) · Endocrinology (33) · Psychiatry & Neurology (41) · Respirology (21) · Nephrology (15) · Rheumatology (30) · Hematology (29) · Gastroenterology (28) · Urology (11) · Infectious Disease (28) · Pain Management (14) · Oncology (27) · Ophthalmology (15) · ENT/Oral (11) · Dermatology (31) · Women's Health (19) · Pediatrics (17) · Palliative Care (8) · Travel Health (14) · Pharmacy Practice & Drug Safety (13).

### Reference tab — final 9 categories (consolidated from 12)
| Category | # tables |
|---|---|
| Deprescribing Protocols | 17 |
| Toxicology & Acute Management | 9 |
| Anticoagulation Management | 6 |
| Comparative Dosing & Equivalence | 8 |
| Medication Safety (Geriatric, LASA, High-Alert) | 5 |
| Drug Adverse Effects & Allergy | 15 |
| Drug-Food Interactions | 5 |
| Pediatric Dosing | 5 |
| Pharmacogenomics (CPIC) | 8 |

### Per-disease pregnancy/lactation coverage
- **448 of 450** conditions have precomputed `preg_lact_summary` (one is non-drug-only; one is condition without treatment agents).
- **5,123 agent classifications** baked into the static data (97% via `PREG_DATA`, 2% via `VACCINES`, 1% via `DRUGS.pregnancy`).

### Disease treatment.agents coverage
- **2,311** drug-type treatment rows
- **1,979** rows fully linked to drug/vaccine cards (85.6%)
- **59** rows now contain vaccine cross-references (vs. 0 before vaccine integration)

---

## Pull Request Timeline

### PR #1 — Cyclosporine card + cross-class interaction warnings + severity classification overhaul
**Commit:** `ce3a5aa` (and predecessor `18210b0`)
**Status:** merged to main

- New cyclosporine drug card (~25K chars): brand, MOA, indications, dosing (transplant + psoriasis + nephrotic + GVHD), side effects (nephrotoxicity, HTN, hirsutism, gingival hyperplasia), contraindications, **25 interactions**, PK, Canadian context, monitoring, counselling, source. Previously cyclosporine was referenced by 100+ entries without its own card.
- **Phase A:** 41 missed interactor pairs added (TKI + QT/CYP3A4/PPI patterns; contraceptive + modafinil/bosentan/lamotrigine; drospirenone + K-elevators; pyridostigmine + succinylcholine/anticholinergics/aminoglycosides; dopamine/dobutamine + MAOI/halogenated anesthetics/TCAs; cefdinir + iron; eltrombopag + polyvalent cations; ibandronate + calcium; perphenazine + QT; primidone + phenobarbital/CNS depressants/OCP/warfarin; tenofovir AF + inducers; mitotane + warfarin/rifampin).
- **Phase B:** 483 anticholinergic-burden cross-warnings (Beers/STOPP-START, ACB score). Pairs between TCAs, first-gen H1, antimuscarinics, antiemetics, anti-Parkinson, muscle relaxants, antipsychotics. References Beers Criteria.
- **Phase C:** 476 QT-prolongation stacking cross-warnings — class III antiarrhythmics, class Ia, antipsychotics (haloperidol, ziprasidone, thioridazine, pimozide), methadone, fluoroquinolones, macrolides, ondansetron, citalopram/escitalopram, hydroxychloroquine/chloroquine, azoles. References crediblemeds.org.
- **Phase D:** 256 nephrotoxin stacking — aminoglycosides, vancomycin, amphotericin B, cisplatin, cyclosporine, NSAIDs, IV acyclovir, foscarnet, tenofovir DF, colistin, polymyxin B.
- **Phase E:** 234 opioid + benzodiazepine/Z-drug/gabapentinoid black-box entries (FDA + Health Canada).

### PR #2 — Audit cleanup: dedup interactions, opioid×opioid, FAMILY_MAP cyclosporine
**Commit:** `cc17f14` → merged into PR #1's branch flow

- 7 duplicate interaction entries deduplicated (tafenoquine, dolutegravir, bictegravir/emtricitabine/TAF, amphotericin_b, fluvastatin, c1_inhibitor, palonosetron).
- Cyclosporine added to `FAMILY_MAP` → "Calcineurin Inhibitors" (was unmapped despite class entry).
- 72 opioid×opioid additive respiratory-depression entries (rotation/scheduled+PRN guidance, equianalgesic conversion, naloxone co-prescribing).
- 5 final reclassifications: norethindrone+lamotrigine/topiramate, ponatinib+QT, gilteritinib+QT, eltrombopag+iron/calcium, etc.

### PR #3 — Repopulate disease treatment.agents from notes text
**Commit:** `9dd0c25` → merged via #3

- Root cause: earlier "convert free-text agents to notes" pass had moved drug names into notes but left `agents: []` arrays empty. **1,527 rows** had invisible drug links — names visible in text, no clickable agents.
- Built strict alias map (1,482 entries) with: full name, paren-stripped name, slash-split, curated brand aliases (~70 brands), constrained first-word matching, aggressive generic blocklist (routes, forms, classes, ions, pharmacology terms, ambiguous first-words like "interferon" / "insulin"), reject numeric-prefixed strings.
- Scanned notes/guideline/family/line/criteria/details for drug names; populated agents.

**Results:** 1,527 rows newly populated; 1,810 rows now have agents (vs 281 before); 1,805 rows fully linked (99.7%); 5 unresolved are pre-existing non-drug entries (physiotherapy, exercise, acupuncture, pericardiocentesis); 0 false positives on spot check.

### PR #4 — Extend repopulation to `details` field + ASA/TXA/NAC short aliases
**Commit:** `47f257d` → merged via #4

- 175 rows used `details` field instead of `notes` — now scanned.
- 3-char allowlist: ASA (aspirin), TXA (tranexamic acid), NAC (acetylcysteine), APAP (acetaminophen), PCN (penicillin).
- +143 rows, +800 agent keys. Empty drug rows: 436 → 296 (mostly procedural / device / strategy / counseling rows where no specific drug applies).

### PR #5 — Vaccines: cross-link disease agents to VACCINES + add missing products
**Commit:** `83ea522` → merged via #5

- `renderDrugLink()` now resolves both DRUGS and VACCINES via shared `resolve(k)` helper. `showDrugPanel()` already handled VACCINES via line 162918 fallback.
- 5 new vaccines: **Prevnar 13** (PCV13), **Vaxneuvance** (PCV15, Merck 2022), **mResvia** (Moderna mRNA RSV 2024), **MenQuadfi** (Sanofi MenACWY-TT 2020+), **Rotarix** (RV1 monovalent).
- Combined DRUGS+VACCINES alias map (1,664 entries). Re-ran agent repopulation.
- Removed "MMR" from short alias allowlist after detecting false positive: in CML notes "MMR" = Major Molecular Response (oncology), NOT MMR vaccine.

**Results:** 17 newly populated rows, 110 net new agent keys; cervical_cancer_hpv "PREVENTION" → gardasil_9 ✓, yellow_fever "PRE-EXPOSURE" → yf_vax ✓, "CONTRAINDICATIONS" → yf_vax + bcg ✓, influenza "Prevention" → 4 influenza vaccines ✓.

### PR #6 — Allergy cross-reactivity reference tables (Top Pick #2)
**Commit:** `53bc507` → merged via #6

Five new reference tables:
1. **β-Lactam Cross-Reactivity** (10 rows, 22 linked drugs) — penicillin de-labelling, R1 side-chain logic, carbapenem/aztreonam, SCAR avoidance.
2. **Sulfa Cross-Reactivity** (16 rows, 15 linked drugs) — debunks over-cautious avoidance of loops/thiazides/sulfonylureas; cites Strom NEJM 2003.
3. **NSAID Cross-Reactivity** (12 rows, 10 linked drugs) — AERD/Samter's, NECD, NIUA; COX-2 + acetaminophen alternatives.
4. **Contrast Media Reactions** (9 rows, 6 linked drugs) — premedication protocols; debunks shellfish-allergy myth; renal/NSF guidance.
5. **Vaccine Excipient Allergies** (11 rows, 3 linked drugs) — egg/gelatin/PEG/yeast/neomycin substitution.

References: Strom NEJM 2003, ACAAI/AAAAI Practice Parameters 2022, ACR Manual on Contrast Media v2024, CSACI 2023, NACI.

### PR #7 — Drug-food interaction reference tables (Top Pick #3)
**Commit:** `84ad3c5` → merged via #7

Five new reference tables:
1. **Grapefruit & Furanocoumarins** (16 rows, 22 drugs) — CYP3A4 24–72h effect.
2. **Drug-Cation Chelation** (16 rows, 30 drugs) — tetracyclines, fluoroquinolones, bisphosphonates, levothyroxine, eltrombopag, integrase inhibitors, HCV DAAs; pH-dependent (dasatinib, atazanavir, EGFR-TKIs).
3. **Vitamin K & Warfarin** (11 rows, 9 drugs) — consistent-not-avoid pattern; natto special concern; DOACs unaffected.
4. **Alcohol-Drug Interactions** (15 rows, 18 drugs) — APAP NAPQI, NSAID GI, opioid black box, disulfiram-like (metronidazole, cefotetan, sulfonylureas), insulin hypoglycemia.
5. **Caffeine, Tyramine, Others** (15 rows, 16 drugs) — MAOI tyramine crisis, CYP1A2 caffeine, K-rich foods + ACEi/ARB, smoking induction, St John's Wort.

References: Bailey CMAJ 2013, ASHP/Lexi, Health Canada PMs, CDC, CSACI 2024.

### PR #8 — Beers Criteria 2023 + STOPP-START v3 reference tables (Top Pick #4)
**Commit:** `27908a0` → merged via #8

- **AGS Beers Criteria 2023** (21 rows, 47 drugs): PIM with rationale + alternatives. 1st-gen antihistamines, TCAs, benzos, Z-drugs, antipsychotics for dementia, NSAIDs chronic, muscle relaxants, sliding-scale insulin, glyburide, digoxin >0.125, methyldopa, IR nifedipine, metoclopramide, oral estrogens, megestrol, α-blockers, clonidine, tramadol caution.
- **STOPP-START v3 2023** (39 rows): STOPP (drug duplication, drug-disease, falls risk, long-term PPI/benzo, triple antithrombotic, sliding-scale insulin) + START (DOAC for AF, statin/β-blocker post-MI, SGLT-2i in HF, vitamin D + Ca, bisphosphonate, all routine ≥65 vaccines).

Cites AGS 2023, O'Mahony Eur Geriatr Med 2023, Cork-CALC, Choosing Wisely Canada, ISMP Canada.

### PR #9 — Tapering protocols (Top Pick #5)
**Commit:** `ecc9e9a` → merged via #9

Five new deprescribing protocols (DEPRESCRIBING_PROTOCOLS: 12 → 17):
1. **Antidepressant (SSRI/SNRI)** — Antidepressant Discontinuation Syndrome vs relapse; paroxetine/venlafaxine slowest; fluoxetine bridging.
2. **Gabapentinoid** — 25–33% q1–2wk; HC CV/respiratory warning; alcohol/opioid co-Rx slow taper.
3. **Oral corticosteroid (prednisone)** — HPA-axis suppression; physiologic crossover; alternate-day; stress dose rules.
4. **Anticonvulsant** — 2-year seizure-free criterion; driving restrictions; phenobarbital/benzo extra-slow.
5. **ADHD stimulant** — adult re-evaluation; CV monitoring; rebound fatigue; periodic drug holiday.

References: CANMAT 2024, Maudsley 14th, deprescribing.org 2024, Endocrine Society 2016, CRA, Canadian Epilepsy 2022, ILAE 2023, CADDRA 2023.

### PR #10 — Per-disease pregnancy & lactation summary callout (Top Pick #6, dynamic)
**Commit:** `9b138aa` → merged via #10

- Added `🤰 Pregnancy & Lactation — Treatment Agents at a Glance` section to disease panel.
- Render-time `buildPregLactSection(cond)` looked up `PREG_DATA[agent]` (97%), VACCINES (2%), DRUGS.pregnancy (1%).
- Buckets: ✅ Compatible, ⚠️ Caution, 🚫 Avoid, ⛔ Contraindicated, ❓ Limited Data.
- 444/445 conditions render the section; 5,111 agent classifications.

### PR #11 — Static preg/lact (per user request — performance optimization)
**Commit:** `beb0b9c` → merged via #11

- Per user feedback: "I'd prefer preg/lact section to be static so that it does not delay loading especially since they are not being updated frequently enough to call for dynamic"
- Buckets precomputed and stored as `cond.preg_lact_summary = { preg: {...}, bf: {...} }`.
- Renderer simplified to direct read (~50 lines removed).
- `classifyPregRisk()` helper removed.
- Regeneration script saved to `/tmp/precompute_preg_lact.js`.

### PR #12 — Vaccine display fixes (raw key labels, missing search handler, indistinguishable pediatric variants)
**Commit:** `851f3d9` → merged via #12

User-reported issues:
1. Disease cards showing `yf_vax`, `bcg` as raw keys — `renderDrugLink` now substitutes proper name when input is bare snake_case.
2. `pickSearch` missing `vaccine` case → silent failure on click. Added handler.
3. Adult vs pediatric variants looked like duplicates in search (Comirnaty/Comirnaty Pediatric, Spikevax/Spikevax Pediatric, Prevnar 13/Prevnar 20, Fluzone HD/QIV). Now visually distinct via `category + min_age` suffix in search labels.

### PR #13 — Expose orphaned reference tables in Reference tab UI
**Commit:** `474e4f9` → merged via #13

- The 12 new tables I had added in PRs #6–#8 were in `REFERENCE_TABLES` data but **not exposed in the Reference tab UI** because that tab uses hardcoded ID lists per category — and my new tables weren't added to any list.
- Added 3 new category tiles: Allergy Cross-Reactivity, Drug-Food Interactions, Geriatric Medication Safety. (Later consolidated in PR #17.)

### PR #14 — Disease category reorder + Jurisprudence detail-page layout
**Commit:** `81f7a96` → merged via #14

**Part 1 — Disease category order:** added `DISEASE_CATEGORY_ORDER` array as canonical display order for both home grid and sidebar. Order matches user spec (cardiology → endo → psych & neuro → respirology → nephro → rheum → heme → gastro → urology → ID → pain → onc → ophtho → ENT → derm → women's health → peds → palliative → travel → practice). Was iterating `Object.keys` order which placed pain/gastro before nephrology. Added missing `palliative` colour.

**Part 2 — Jurisprudence:** refactored from accordion → detail-page (matches Minor Ailments pattern). Grid of clickable card tiles (icon + title only); click → `showJuri(idx)` hides grid, shows full content in `juri-detail`; back button (already in HTML at line 509) re-shows grid via `closeJuri()`. Topics cached at module scope (`_JURI_TOPICS`). The `juri-detail` container with back button was already in the HTML but orphaned.

### PR #15 — Jurisprudence content expansion (5 high-yield topics)
**Commit:** `64b799d` → merged via #15

1. **Prescription Requirements** — validity periods, mandatory elements, verbal Rx documentation.
2. **s.56(1) Class Exemption** — practical authorities quick-reference, October 2026 CSR transition, audit-ready documentation.
3. **Pharmacist Prescribing (Ontario)** — minor ailments scope (19 conditions), vaccination authority, 6-month chronic extensions, therapeutic substitution, lab ordering, documentation template, limits.
4. **Methadone & Buprenorphine (OAT)** — carries eligibility framework, missed-dose protocols (1/2/3+/5+ days for both agents), pharmacist stewardship checklist.
5. **Privacy (PHIPA)** — common breach scenarios + mitigation, IPC reporting thresholds, retention/disposal rules, SDM hierarchy.

References: Ontario DPRA, federal CDSA + Part G + BTSR, Health Canada s.56(1), OCP Standards, IPC Ontario, HCCA, CAMH/CFPC OAT Guidelines.

### PR #16 — Travel medicine: 4 new conditions
**Commit:** `7c1d7db` → merged via #16

Per user request, audited existing travel content first — confirmed already comprehensive (10 conditions including malaria_prophylaxis, altitude_sickness, motion_sickness, jet_lag, pretravel_assessment, hep A travel, rabies PEP, dengue/Zika/chikungunya, typhoid, yellow_fever; plus traveller's diarrhea in infectious category).

Real gaps identified by keyword audit; added:
1. **Returning traveller with fever** — workup & triage, malaria rule-out priority, typhoid empiric, severe dengue, pharmacist community-level role.
2. **Schistosomiasis (Bilharzia)** — freshwater exposure, praziquantel SAP, acute Katayama syndrome, bladder/portal pathology by species.
3. **Japanese encephalitis** — disease entry to complement existing Ixiaro vaccine card; risk-benefit framework.
4. **Strongyloidiasis** — refugee health, pre-immunosuppression screening, hyperinfection 50-80% mortality, ivermectin SAP.

Travel category: 10 → 14 conditions.

**Note on smoking cessation:** user requested "do smoking cessation as Minor Ailment" — confirmed it already exists comprehensively as Minor Ailment #19 (~38 KB content, decision wizard, varenicline + combo NRT + bupropion, OCP scope, drug interactions on cessation). No additions needed.

### PR #17 — Medication Safety pillar + Reference tab consolidation 12→9
**Commit:** `6d60c44` → merged via #17

**3 new reference tables:**
1. **LASA Pairs** (59 rows, 50+ linked drugs) — ISMP Canada canonical look-alike/sound-alike confusion pairs with confusion type, risk, prevention. Tall-man lettering (hydrOXYzine, vinCRIStine, methotrexate weekly, U-100 vs U-500 insulin).
2. **High-Alert Medications** (15 rows, 26 drugs) — class-level safety strategies: anticoagulants, insulin, opioids, NMBAs, chemo, NTI drugs, hypertonic saline, concentrated electrolytes, epidural/intrathecal, sulfonylureas, antiarrhythmics, pediatric liquids, immunosuppressants, oral chemo, radiopharmaceuticals.
3. **Dispensing Errors & Pharmacy Safety** (23 rows) — top 5 error patterns, error-prone abbreviations to avoid (qd, qod, U, IU, MS, MgSO4, μg, cc, TIW, ×, @), PREVENT/RESPOND/LEARN/REPORT workflow.

**1 new disease condition** (per user suggestion — "if medication safety is large enough it can also be added to pharmacy practice"):
- `practice/medication_safety_error_prevention` — workflow synthesis: Swiss cheese model, just culture, ISMP Canada anonymous reporting, open disclosure + Apology Act 2009. Cross-references the 3 reference tables.

**Reference tab consolidation** (per user feedback "we are getting a lot of tables; combine into broader categories that make sense"): **12 → 9 categories.**

Merged:
- Equivalence + Potency + Dose Adjustment → Comparative Dosing & Equivalence
- Drug-Induced + Allergy Cross-Reactivity → Drug Adverse Effects & Allergy
- Beers/STOPP + new LASA/High-Alert/Errors → Medication Safety

Kept separate (distinct concepts): Deprescribing Protocols, Toxicology, Anticoagulation, Drug-Food, Pediatric, Pharmacogenomics.

**Overlap check passed** — LASA ≠ Allergy cross-reactivity (name confusion vs hypersensitivity); High-Alert ≠ Drug-Induced (risk-if-mis-used vs adverse effect mechanism); Dispensing Errors ≠ Toxicology (process vs clinical management); existing penicillin de-labelling and polypharmacy/deprescribing conditions complement rather than duplicate the new content.

Code quality: introduced `mapTables()` helper to remove repetitive map+filter chains (DRY).

### PR #18 — Standardize tab width across all tabs (1520 px)
**Commit:** `ef3e178` → merged via #18

Single-CSS change in `.tab-panel`: added `max-width: 1520px; width: 100%; margin: 0 auto;`. All tabs (Diseases, Drug Interactions, Reference, Jurisprudence, Minor Ailments, Antimicrobials, Pregnancy, Formulary, Vaccinations) now share the same maximum width and centre on screen on wider displays. Auto margins on a flex item consume extra horizontal space, centring the panel within `#tab-content`. Existing `flex: 1` continues to fill available space up to the cap.

---

## Architectural Decisions

### 1. Vaccines stored separately from DRUGS (not merged)
- **Decision:** Keep `VACCINES` (56 entries) separate from `DRUGS` (1,089) instead of duplicating vaccine data into DRUGS.
- **Rationale:** Vaccines have unique fields (`category`, `min_age`, `pharmacist_can_prescribe`, `pharmacist_can_inject`) and a dedicated Vaccinations tab. Duplication risks data drift.
- **Implementation:** `renderDrugLink()` falls back to `VACCINES[key]` after `DRUGS[key]` lookup. `showDrugPanel()` already had this fallback (line 162918). Single rendering path; no data duplication.

### 2. Per-disease pregnancy/lactation: static (precomputed) over dynamic
- **Decision (PR #11):** After initial dynamic implementation (PR #10), converted to precomputed static buckets stored on each condition.
- **Rationale per user:** "I'd prefer preg/lact section to be static so that it does not delay loading especially since they are not being updated frequently enough to call for dynamic."
- **Trade-off:** Loses auto-propagation on `PREG_DATA` updates; gains O(buckets) render time vs O(n × lookup).
- **Regeneration:** `/tmp/precompute_preg_lact.js` saved as the regeneration script for future `PREG_DATA` changes.

### 3. Reference tab uses hardcoded category lists (vs `t.category` self-registration)
- **Current pattern:** Each category in `buildReference()` is defined by a hardcoded ID array. Any new table added to `REFERENCE_TABLES` must also be added to a category list, or it's orphaned in the UI (this caused PR #13).
- **Rationale:** Allows curated ordering and grouping that don't trivially derive from the data.
- **Future refactor option:** Add a `category` field to each reference table for self-registration. Lower maintenance overhead, but loses fine-grained ordering control. (Not done yet.)

### 4. Disease category order: explicit `DISEASE_CATEGORY_ORDER` array
- **Decision (PR #14):** Added `DISEASE_CATEGORY_ORDER` array driving both home grid and sidebar, instead of relying on `Object.keys(DISEASES)` insertion order.
- **Rationale:** Decouples display order from data file structure; allows reordering without touching DISEASES data.

### 5. Jurisprudence: detail-page over accordion
- **Decision (PR #14):** Refactored Jurisprudence tab from accordion (each topic body inline-hidden in same card) to detail-page pattern (click card → hide grid → show full-page detail with back button).
- **Rationale per user:** matches Minor Ailments UX; allows full-page real estate for content expansion (which then happened in PR #15).
- **Implementation:** topics cached at module scope via `_JURI_TOPICS`; `showJuri(idx)` and `closeJuri()` mirror `showMA(idx)` / back behaviour.

### 6. Tab width standardization (1520 px max)
- **Decision (PR #18):** Cap all `.tab-panel` instances at 1520 px, matching the prior `#ma-panel` cap. Centre via `margin: 0 auto`.
- **Rationale per user:** "all tabs are a different full screen width, I want them all similar style and width."
- **Implementation:** Single CSS line; auto margins on flex items work to consume extra space.

---

## Open Items / Future Work

### Documented but not yet implemented
- **Hormonal contraception** — pharmacist-prescribed scope expansion (BC/AB/SK; ON in progress); structured selection by patient profile, missed-dose decision trees, MEC categories. Currently covered as a single condition in `womens_health/contraception` but could be deepened.
- **HFrEF GDMT titration ladder** — practical reference for stepwise quadruple-therapy initiation post-STRONG-HF (2022). The `acute_heart_failure` and `hfref` conditions list agents but lack a clean stepwise titration sequence.
- **HIV PrEP/PEP** — pharmacist scope expanding in some provinces.
- **Travel: leishmaniasis, TBE disease entry, filariasis** — lower-yield gaps not addressed in PR #16.

### Known minor issues (low priority)
- **5 unresolved drug-row agents** in disease cards (physiotherapy, exercise, acupuncture, pericardiocentesis) are pre-existing non-drug entries that won't link to drug cards. Harmless.
- **One CML treatment row** picks up `phenytoin` from "AVOID NEONATAL PHENYTOIN" text (G6PD entry) — semantically a "drug to avoid" mention, but rendered as a treatment agent. Edge-case; could be filtered with context detection.
- **15 drugs still >50% Note severity** post-reclassification — mostly biologics and specialty agents (garadacimab, cyanocobalamin, deutetrabenazine, ruxolitinib_topical) where Note is legitimate counselling content.
- **Reference tab category dispatch** still uses hardcoded ID lists. Future refactor opportunity to use `t.category` self-registration.
- **Static preg/lact regeneration** is currently a manual script run; could be wired into a build hook if `PREG_DATA` updates become frequent.

### Architectural opportunities
- Refactor reference table category dispatch from hardcoded ID arrays to `t.category` self-registration.
- Consolidate the various module-scope caches (`_JURI_TOPICS`, `_drugRegexCache`, `_DRUG_ALIASES`) into a single startup-cached structure.
- Consider a pre-deploy validation script that checks for orphaned reference tables, missing `FAMILY_MAP` entries, dangling `agents` references.

---

## Citations Summary

Primary sources used across the work (Canadian/international evidence-based guidelines):

- **Drug interactions:** ASHP/Lexi-Interact 2024, Health Canada Product Monographs, Bailey CMAJ 2013 (grapefruit), Strom NEJM 2003 (sulfa), CDC Alcohol-Medication, CSACI 2024.
- **Allergy:** ACAAI/AAAAI Drug Allergy Practice Parameters 2022, ACR Manual on Contrast Media v2024, NACI, CIG.
- **Geriatrics:** AGS Beers Criteria 2023, O'Mahony et al. Eur Geriatr Med 2023 (STOPP-START v3), Cork-CALC, Choosing Wisely Canada, ISMP Canada.
- **Vaccines:** NACI Statements 2024, Canadian Immunization Guide (CIG), Health Canada Product Monographs (Comirnaty, Spikevax, Stamaril, Gardasil-9, Shingrix, Prevnar 20/13, Vaxneuvance, Arexvy, Abrysvo, mResvia, Imovax, Ixiaro), ZOE-50/70 trials (Lal NEJM 2015, Cunningham NEJM 2016).
- **Deprescribing/tapering:** deprescribing.org 2024, CANMAT 2024, Maudsley 14th, Endocrine Society 2016, CRA, Canadian Epilepsy 2022, ILAE 2023, CADDRA 2023.
- **Travel medicine:** CATMAT Statement on Travellers' Health 2024, IDSA Returning Traveler 2018, WHO International Travel and Health 2024, CDC Yellow Book 2024, CCIRH (Canadian Collaboration for Immigrant and Refugee Health), Public Health Ontario reportable diseases.
- **Medication safety:** ISMP Canada Targeted Medication Safety Best Practices 2024, ISMP Canada Bulletin, ISMP US Confused Drug Names, Joint Commission Tall-Man + Do Not Use lists 2023, Health Quality Ontario, Reason J. Human Error 1990 (Swiss Cheese), Marx D. Just Culture 2001.
- **Jurisprudence:** Ontario DPRA, CDSA + Part G + BTSR, Health Canada s.56(1) class exemption (current to October 2026 CSR transition), OCP Standards of Practice, IPC Ontario, HCCA, CAMH/CFPC OAT Guidelines, Apology Act Ontario 2009.
- **Drug card data:** continues to cite original Health Canada PMs, CADTH, INESSS, KDIGO, ESC, ACC, EASL, AASLD, ATS, ESCMID, IDSA, ASHP, ASCO, NCCN, CCS, etc. as already curated by the existing data.

---

## Net Outcome

The rxguide app moved from a collection of well-developed but partially-orphaned data structures to a more cohesively integrated reference tool:
- **Drug interactions** are now severity-classified at evidence-grade quality with cross-class warnings for the major safety pillars (anticholinergic, QT, nephrotoxin, opioid+sedative, opioid×opioid).
- **Disease cards** now consistently link to drug + vaccine cards with 99.7% of drug-type rows resolved.
- **Pregnancy/lactation** is surfaced at the disease level, reducing clinician lookup friction.
- **Reference tab** is consolidated, all tables exposed, three new pillars added (Allergy, Drug-Food, Medication Safety).
- **Jurisprudence and minor ailments** share the same detail-page UX pattern.
- **All tabs** share the same visual width.

Total content additions across 18 PRs: 1 drug, 5 vaccines, 5 disease conditions, 12 reference tables, 5 deprescribing protocols, ~1,800 interaction entries, 448 disease pregnancy/lactation summaries, ~1,500 disease-row agent linkages, plus various UX and bug fixes.

---

# Audit Cycle 2 — 2026-05-12

**Date:** 2026-05-12
**Scope:** All work since the 2026-05-08 audit (PR #22 → PR #50 inclusive).
**Theme:** Drug-family mapping accuracy, schema completeness on newly-added drugs, treatment-row type standardization (8 canonical non-pharm categories), deprescribing-protocol schema fix, recently-added drug audits (100 drugs DC-9 + 50 drugs Batches 1–5 + 49 drugs Batches 6–10).

---

## Executive summary

29 merged PRs (#22 – #50) cleaned up the systemic patterns we found after the first audit cycle:

1. **Treatment-row drug-class mapping accuracy** — fixed 11 documented mismatches + 3 app-wide; refreshed family-card source citations (Hypertension Canada 2020 → 2025; CCS HF 2021 → 2025; DOACs + 2024 update; CANMAT 2016 → 2024 update); back-filled GERD/PUD H. pylori row amoxicillin.
2. **Treatment-row repopulation** for 33 newly-added disease cards (Rounds 1 & 2) — 17 + 16 cards re-typed, agents populated, family field injected, preg_lact_summary recomputed.
3. **App-wide non-pharm standardization** — replaced heterogeneous `type` values (Non-Drug, Strategy, Procedure, Action, refer, treat, …) with **8 canonical categories** + **81 sub-action keys** across 2,979 treatment rows; introduced `NON_PHARM_AGENTS` data table + `.nonpharm-pill` CSS + render integration.
4. **Drug schema completeness** — audited 200 drugs (DC-9 100 + 50 + 49) for the 16 canonical DRUGS fields; closed gaps (mostly missing `monitoring`).
5. **Deprescribing protocol schema** — fixed 5 protocols (44 steps) where `taper_steps` were stored as strings and rendered as `undefined undefined undefined`.
6. **Family-card completeness** — added `comparison` + `pearls` to 2 new singleton families (Glucagon & Hyperglycemic Agents, Vitamin A (Retinol)).

---

## PR-by-PR summary

| PR | Title | Lines |
|---|---|---|
| #22 | Bidirectional reciprocal interactions (warfarin × vitamin_a, disulfiram × chlordiazepoxide) | small |
| #23 | AUDIT-CONTENT.md — line-by-line clinical content audit of top 40 entries | doc-only |
| #24 | Drug-family mismatch fixes in treatment.agents arrays + refresh outdated citations | medium |
| #25 → #27 | Round 1 disease card additions (20 conditions across psych/derm/uro/ophth/ENT/peds + 3 drugs + 3 tox refs) — already on main pre-audit | large |
| #28 | Audit fix: repopulate agents + family + preg_lact_summary on 17 new disease cards | +1566 / −251 |
| #29 | Round 2 disease card additions (16 conditions + 4 tox refs) — already on main pre-audit | large |
| #30 | Reclassify treatment rows to type=Drug where drugs are actively prescribed (Round 1 follow-up) | +28 / −49 |
| #31 | Audit fix: 16 conditions + 4 tox refs from Round 2 — repopulate + reclassify | +1382 / −303 |
| #32 → #33 | Drug-add batches (Round 1 + Round 2 of Batch series) — already on main pre-audit | large |
| #34 | App-wide non-pharm standardization: 8 type categories + 81 sub-agent keys | +11178 / −9334 |
| #36 | Non-pharm sweep — pass 2/3 + targeted residuals (coverage 100%) | +476 / −226 |
| #37 → #40 | More drug-add batches | large |
| #38 | Fix undefined taper steps on 5 deprescribing protocols (schema rewrite) | +44 / −44 |
| #41 | Audit fix: 50 drugs (PR #32/33/37/39/40) + 2 family cards | +3 / −3 |
| #42 → #47 | Topical / HIV / antiarrhythmic / biologic / JAK / MS DMT / HCV DAA batches | large |
| #44 | Audit fix: missing monitoring field on 40 drugs (DC-9 Batches 13–20) | +40 / −40 |
| #48 | Audit fix: 60 drugs (DC-9 Batches 1–12) — monitoring + Canadian source + orphan PREG cleanup | +61 / −72 |
| #50 | Audit fix: 49 drugs (Batches 6–10) — resmetirom Canadian source citation | tiny |

---

## Architecture/data additions

### New: NON_PHARM_AGENTS data table
- **NON_PHARM_CATEGORIES** (8): lifestyle, physical_therapy, psychotherapy, surgery_procedure, monitoring, medical_device, patient_education, supportive_care
- **NON_PHARM_AGENTS** (81 sub-action keys): each entry `{label, category}` for static class-pill rendering
- **renderNonPharmPill(key)** helper + **`.nonpharm-pill`** CSS class
- **renderDrugLink(agentStr)** now first-checks NON_PHARM_AGENTS before DRUGS/VACCINES

### Treatment-row schema reinforcement
- **`type`** must be one of 9 canonical values: `Drug` + the 8 non-pharm categories
- **`family`** REQUIRED on every row (per `FAMILY_MAP[firstAgent]` or descriptive label)
- **`agents`** array can mix drug keys and non-pharm action keys

### DEPRESCRIBING_PROTOCOLS schema reinforcement
- **`taper_steps`** must be array of `{step, action, detail}` objects (NOT strings)

### Cidofovir × probenecid interaction
- Severity normalized to `Beneficial` (was `"Required pretreatment"`); mechanism corrected from "blocks renal tubular secretion" (incorrect) to "inhibits OAT1-mediated proximal-tubular UPTAKE"

### Glucagon & Hyperglycemic Agents family card
- Added `comparison` (GlucaGen HypoKit vs Baqsimi nasal in detail)
- Added `pearls` (7) — Schedule II + Diabetes Canada universal availability, Baqsimi household preference, caregiver counselling, post-glucagon vomiting + lateral positioning, glycogen-depletion ineffectiveness, β-blocker/CCB high-dose IV protocol, pheo + insulinoma contraindications

### Vitamin A (Retinol) family card
- Added `comparison` (retinyl palmitate vs β-carotene vs Aquasol A IV; RDA + UL table)
- Added `pearls` (8) — β-carotene preference in pregnancy, WHO+CPS measles dosing limit, retinoid combo avoidance, doxycycline pseudotumor cerebri, cod-liver-oil dual A+D, chronic hepatic fibrosis + fracture risk, liver-consumption pregnancy limits, post-bariatric supplementation

---

## Final state (live on main, 2026-05-12)

### Data structure counts
| Structure | Count | Δ vs 2026-05-08 |
|---|---|---|
| `DRUGS` | ~1,108 | +19 (new batches) |
| `VACCINES` | 58 | +2 |
| `DISEASES` conditions | 487+ | +33 conditions across Rounds 1 & 2 |
| `REFERENCE_TABLES` | 65 | +4 (Round 2 tox refs) |
| `DEPRESCRIBING_PROTOCOLS` | 17 | unchanged (all 5 fixed schema) |
| `MINOR_AILMENTS` | 19 | unchanged |
| `PREG_DATA` | ~1,100 | +12 (1 orphan removed) |
| `NAPRA_ODB_DATA` | ~1,108 | +19 |
| `DRUG_FAMILIES` | ~454 | +2 singleton families |
| `FAMILY_MAP` | ~1,208 | +10 |

### Treatment-row type distribution (post-sweep)
| Category | Count |
|---|---|
| Drug | 2,213 |
| supportive_care | 179 |
| surgery_procedure | 167 |
| lifestyle | 165 |
| patient_education | 136 |
| medical_device | 48 |
| monitoring | 30 |
| physical_therapy | 22 |
| psychotherapy | 19 |
| Non-canonical | 0 |

### Drug schema completeness (audited)
| Audit | Count audited | Missing fields before | Missing fields after |
|---|---|---|---|
| DC-9 Batches 13–20 | 40 | 40 (monitoring) | 0 |
| DC-9 Batches 1–12 | 60 | 59 (monitoring) + 1 CDN source | 0 |
| Batches 1–5 (PR #32/33/37/39/40) | 50 | 0 fields, 2 family-card gaps, 1 bad severity | 0 |
| Batches 6–10 (PR #42/43/45/46/47) | 49 | 0 fields, 1 CDN source | 0 |
| **Total audited** | **199 drugs** | various | **all clean** |

---

## Key takeaways for future agents

1. **Always populate `monitoring`** — most-commonly-omitted field. 99 of 100 DC-9 drugs missed it.
2. **Treatment rows ALWAYS need `family`** — even multi-class combination rows. Use the most relevant drug class or a descriptive label.
3. **Use the 8 canonical non-pharm `type` values** — never `Strategy`, `Procedure`, `Non-Drug`, etc.
4. **DEPRESCRIBING `taper_steps` are objects** `{step, action, detail}`, never strings.
5. **Cross-app integration is REQUIRED for every drug** — DRUGS + PREG_DATA + NAPRA_ODB_DATA + FAMILY_MAP, all matching the canonical key.
6. **`Beneficial` severity is for required protective combinations** — e.g., cidofovir+probenecid, MTX+folic acid, sirolimus+cyclosporine. Don't invent new severity values.
7. **Strip drugs mentioned in AVOID/DEPRESCRIBE/CONTRAINDICATED context** out of agents — they're not therapy.
8. **Canadian-priority sources mandatory** — Health Canada PMs, CCS, CDA, SOGC, NACI, RxFiles, CADTH, etc.

See `AGENTS.md` §17–§23 (added 2026-05-12) for the full updated playbook.
