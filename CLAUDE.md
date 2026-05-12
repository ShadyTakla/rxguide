# CLAUDE.md — rxguide Working Preferences

This file captures durable user preferences for AI agents working on rxguide. Read AGENTS.md FIRST for the canonical architecture/schema/citation rules. This file layers user-specific workflow on top.

## Standing workflow

**Audit before merge, then always deploy live to main.** For every content addition or change:

1. Author the new content (drugs, families, conditions, reference tables, etc.) following AGENTS.md schemas and the citation hierarchy (ONT > CAN > USA > International).
2. Run the seven-check pre-merge audit:
   - JS parse passes (`node --check` against extracted `<script>`).
   - Every new drug has DRUGS + PREG_DATA + NAPRA_ODB_DATA + FAMILY_MAP entries, and its family exists in DRUG_FAMILIES.
   - Every new REFERENCE_TABLES id is included in the corresponding category's id array in `buildReference()` (no orphans per AGENTS.md §9.3).
   - Every new disease condition has all required schema fields populated and non-empty `signs`, `diagnosis`, `treatment`, `pearls`.
   - Every `treatment[*].agents[]` key resolves to a DRUGS or VACCINES key.
   - All new drug-interaction `severity` values are canonical (Beneficial, Contraindicated, Major, Moderate, Minor, Note).
   - Every new disease card cites at least one Canadian source.
3. If audit passes: open PR, merge to main via GitHub MCP (`mcp__github__merge_pull_request`, method `merge`), confirm live on https://shadytakla.github.io/rxguide/.
4. If audit fails: pause and report the failure; do not merge until resolved.

Do not skip the audit and do not skip the merge — both happen on every change.

## Other persistent rules

- **REUSE BEFORE CREATE** — Before adding any new tab, disease category, disease condition, reference category, reference table, drug family, minor ailment, deprescribing protocol, jurisprudence topic, or empiric-therapy syndrome: SEARCH the existing structure first. Extend an existing container instead of creating a new one whenever scope overlaps. **See `AGENTS.md` §24 for the full no-new-container rule, discovery commands, decision flowchart, and historical examples.** This is the single most-frequently-broken rule by AI agents — every batch-style PR description should explicitly note: "Checked for existing coverage of [topic]; extending [X] is/is not possible because [Y]."
- No duplicate disease states. Reuse existing conditions whenever scope overlaps (per user direction). Before adding any new condition, verify no existing condition already covers the scope (substring search of `DISEASES[*].conditions[*].name` and the introduction text).
- Drug card and drug family duplication is acceptable when granularity is clinically useful (per user direction).
- Do not add net-new Reference tab categories when an existing category fits — extend `toxIds`, `diIds`, `medSafetyIds`, etc. (per user direction).
- Do not add new tabs (9 cover everything). Do not add new disease categories (20 cover everything). New top-level containers require justification in the PR description.
- Pharmacist scope and Canadian (Ontario-first) context throughout; do not author US-default content.

## Last updated

2026-05-12 — added explicit reuse-before-create rule with cross-reference to AGENTS.md §24.
