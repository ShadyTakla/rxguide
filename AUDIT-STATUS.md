# AUDIT-STATUS.md — RxGuide Catalog Audit Coverage

> **Live status file** — auto-regenerated from `index.html` by `scripts/regenerate_audit_status.js`.
> Re-run after every audit cycle so future agents know exactly what's audited and what remains.

**Last regenerated:** 2026-05-14
**Catalog snapshot:** 2,880 clickable entries (latest commit: `dec683c on 2026-05-13`)

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
| **REFERENCE_TABLES** | 100 | 100.0% | 98.0% |
| **DISEASES.conditions** | 582 | 100.0% | 100.0% |

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
| Wired into `buildReference()` dispatch (not orphan) | **100.0%** | `██████████████████` | 100 | 0 |
| `related_drugs` all resolve to DRUGS/VACCINES | **100.0%** | `██████████████████` | 100 | 0 |
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

---

## DISEASES.conditions (582 entries)

| Audit dimension | Coverage | Bar | Audited (clean) | Remaining |
|---|---|---|---|---|
| Required schema (signs/diagnosis/treatment/pearls non-empty) | **100.0%** | `██████████████████` | 582 | 0 |
| Cites Canadian source | **100.0%** | `██████████████████` | 582 | 0 |
| All `treatment.agents` resolve (DRUGS/VACCINES/NON_PHARM_AGENTS) | **100.0%** | `██████████████████` | 582 | 0 |
| §21.13 multi-family compliance | **100.0%** | `██████████████████` | 582 | 0 |

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
| 1 | **454** | DRUG_FAMILIES — full schema authoring (moa_summary, class_effects, members[], pearls, source) |
| 1 | **398** | DRUG_FAMILIES — populate `members[]` for skeletal family cards |

---

## Audit-workflow contract

1. **AGENT MUST READ this file** before starting any audit task. The specific entries listed under each "❌ Remaining" section ARE the next audit work.
2. **AGENT MUST REGENERATE this file** after every audit/fix PR by running `node scripts/regenerate_audit_status.js` (or recreating the script if /tmp is gone — see the script source above for the canonical algorithm).
3. **AGENT MUST COMMIT** the regenerated AUDIT-STATUS.md alongside the fix in the same PR (so main is always self-describing).
4. Items absent from this file are confirmed passing. Do NOT audit items already at 100% unless the user explicitly asks.
5. Reference this file by name in PR descriptions ("see AUDIT-STATUS.md for full context on remaining gaps").

See AGENTS.md §AUDIT-STATUS and CLAUDE.md "Standing workflow" for the full canonical workflow.
