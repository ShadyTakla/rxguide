# AUDIT-STATUS.md — RxGuide Catalog Audit Coverage

> **Live status file** — auto-regenerated from `index.html` by `scripts/regenerate_audit_status.js`.
> Re-run after every audit cycle so future agents know exactly what's audited and what remains.

**Last regenerated:** 2026-05-14
**Catalog snapshot:** 2,900 clickable entries (latest commit: `6b4d9ee on 2026-05-14`)

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
| **DRUGS** | 1,546 | 100.0% | 100.0% |
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

**No remaining audit gaps — catalog is 100% clean across all checked dimensions.**

---

## Audit-workflow contract

1. **AGENT MUST READ this file** before starting any audit task. The specific entries listed under each "❌ Remaining" section ARE the next audit work.
2. **AGENT MUST REGENERATE this file** after every audit/fix PR by running `node scripts/regenerate_audit_status.js` (or recreating the script if /tmp is gone — see the script source above for the canonical algorithm).
3. **AGENT MUST COMMIT** the regenerated AUDIT-STATUS.md alongside the fix in the same PR (so main is always self-describing).
4. Items absent from this file are confirmed passing. Do NOT audit items already at 100% unless the user explicitly asks.
5. Reference this file by name in PR descriptions ("see AUDIT-STATUS.md for full context on remaining gaps").

See AGENTS.md §AUDIT-STATUS and CLAUDE.md "Standing workflow" for the full canonical workflow.
