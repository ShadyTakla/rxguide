# CLAUDE.md — rxguide Working Preferences

This file captures durable user preferences for AI agents working on rxguide. Read AGENTS.md FIRST for the canonical architecture/schema/citation rules. This file layers user-specific workflow on top.

## Standing workflow

**Audit before merge, then always deploy live to main.** For every content addition or change:

1. Author the new content (drugs, families, conditions, reference tables, etc.) following AGENTS.md schemas and the citation hierarchy (ONT > CAN > USA > International).
2. Run the ten-check pre-merge audit:
   - JS parse passes (`node --check` against extracted `<script>`).
   - Every new drug has DRUGS + PREG_DATA + NAPRA_ODB_DATA + FAMILY_MAP entries, and its family exists in DRUG_FAMILIES. **FAMILY_MAP is the #1 recurring gap** — 82 missing entries across PRs #59 / #90 / #93. Singleton families are explicitly OK if no existing family fits; never leave a drug unmapped (AGENTS.md §21.9).
   - Every new drug's `source:` field includes explicit Canadian-source recognition. If the drug is NOT Health Canada-approved, the source must say so explicitly AND list Canadian alternatives by name + family. Accepted Canadian tokens listed in AGENTS.md §21.10.
   - Every new drug's `interactions:` array is non-empty. For single-dose / gene-therapy / one-time products with no chronic-drug interactions, add a single `severity: "Note"` entry explaining the absence + peri-treatment considerations (AGENTS.md §21.11).
   - Every new REFERENCE_TABLES id is included in the corresponding category's id array in `buildReference()` (no orphans per AGENTS.md §9.3).
   - Every new reference table that mentions a combination drug (e.g. `"Sacubitril/valsartan"`, `"Levodopa/carbidopa"`) includes the **combo key** in `related_drugs` — not just the components (per AGENTS.md §5.4.1 + §21.8; PR #70 fixed the rendering layer so spaced + unspaced slash forms both resolve, but the combo key must be in `related_drugs` for the click target to be the combo card).
   - Every new disease condition has all required schema fields populated and non-empty `signs`, `diagnosis`, `treatment`, `pearls`.
   - Every `treatment[*].agents[]` key resolves to a DRUGS or VACCINES key.
   - All new drug-interaction `severity` values are canonical (Beneficial, Contraindicated, Major, Moderate, Minor, Note).
   - Every new disease card cites at least one Canadian source.
3. If audit passes: open PR, merge to main via GitHub MCP (`mcp__github__merge_pull_request`, method `merge`), confirm live on https://shadytakla.github.io/rxguide/.
4. If audit fails: pause and report the failure; do not merge until resolved.

Do not skip the audit and do not skip the merge — both happen on every change.

## Other persistent rules

### Container hierarchy (per user direction)

- 🛑 **NO NEW TABS without user discussion.** The 9 existing tabs cover all planned scope. Pause and ask before considering a new tab.
- ❌ **NO NEW DISEASE CATEGORIES** on the Diseases home page. The 20 existing categories (Cardiology, Endocrine, GI, Neurology, Psychiatry, Respirology, Renal, Rheumatology, Hematology, Oncology, Dermatology, ENT, Ophthalmology, Urology, Women's Health, Pediatrics, Infectious, Pharmacy Practice, Travel, Toxicology) cover all clinical scope. New conditions go INTO an existing category.
- ❌ **NO NEW REFERENCE TAB CATEGORIES** on the Reference home page. The 9 existing categories cover everything. New reference tables go INTO an existing category by extending its dispatch ID array (`toxIds`, `diIds`, `medSafetyIds`, `allergyIds`, `foodIds`, `geriatricIds`, `renalIds`, `hepaticIds`, `practiceIds`).
- ✅ **Adding new content WITHIN existing categories is fine** — new disease conditions in Cardiology, new reference tables in Toxicology, new drug cards, new drug families, new vaccines, new deprescribing protocols, etc. No special permission needed; just don't duplicate scope of an existing entry (search first, extend if there's overlap, otherwise add).
- See `AGENTS.md` §24 for the full container-hierarchy rules, duplicate-scope check, discovery commands, and worked examples.

### Content quality

- No duplicate disease states. Reuse existing conditions whenever scope overlaps (per user direction). Before adding any new condition, substring-search `DISEASES[*].conditions[*].name` + introduction text to confirm no overlap.
- Drug card and drug family duplication is acceptable when granularity is clinically useful (per user direction).
- Pharmacist scope and Canadian (Ontario-first) context throughout; do not author US-default content.

## Last updated

2026-05-13 — promoted FAMILY_MAP discipline (§21.9), Canadian-source explicit rule (§21.10), and non-empty interactions rule (§21.11) to first-class audit checks; pre-merge audit expanded from 8 to 10 checks. Lessons from PR #59 / #90 / #93 (cumulative 82 missing FAMILY_MAP entries, 7 incomplete source citations, 1 empty interactions array).
2026-05-12 — added combo-drug `related_drugs` rule for reference tables (AGENTS.md §5.4.1 + §6.5 + §21.8; PR #70).
2026-05-12 — clarified container-hierarchy rule (tabs locked, categories closed, in-category additions open).
