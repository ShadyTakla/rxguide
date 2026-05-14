#!/usr/bin/env node
// Regenerate AUDIT-STATUS.md from index.html — full-catalog coverage with
// per-category lists of WHAT IS AUDITED vs WHAT STILL NEEDS WORK.
//
// USAGE: node scripts/regenerate_audit_status.js   (run from repo root)
// Outputs: AUDIT-STATUS.md in repo root.
//
// CALL THIS AT THE END OF EVERY AUDIT CYCLE so the next agent can read the
// updated state. Refer to AGENTS.md §AUDIT-STATUS for the canonical workflow.

const fs = require('fs');
const { execSync } = require('child_process');
const nodePath = require('path');
const repoRoot = nodePath.resolve(__dirname, '..');
const path = nodePath.join(repoRoot, 'index.html');
const outPath = nodePath.join(repoRoot, 'AUDIT-STATUS.md');
const txt = fs.readFileSync(path, 'utf8');

function rd(name, openChar) {
  const open = openChar || '{';
  const close = open === '[' ? ']' : '}';
  const idx = txt.indexOf(`var ${name} =`);
  if (idx < 0) return null;
  const i = txt.indexOf(open, idx);
  let d = 0, j = i;
  while (j < txt.length) { const c = txt[j]; if (c === open) d++; else if (c === close) { d--; if (d === 0) return [i, j + 1]; } j++; }
}
const ev = s => Function(`"use strict";return (${s});`)();

const DRUGS = JSON.parse(txt.slice(...rd('DRUGS')));
const DRUG_FAMILIES = ev(txt.slice(...rd('DRUG_FAMILIES')));
const FAMILY_MAP = ev(txt.slice(...rd('FAMILY_MAP')));
const NAPRA = ev(txt.slice(...rd('NAPRA_ODB_DATA')));
const PREG = ev(txt.slice(...rd('PREG_DATA')));
const DISEASES = JSON.parse(txt.slice(...rd('DISEASES')));
let VACCINES = {}; try { VACCINES = JSON.parse(txt.slice(...rd('VACCINES'))); } catch (e) {}
let REFERENCE_TABLES = []; try { REFERENCE_TABLES = ev(txt.slice(...rd('REFERENCE_TABLES', '['))); } catch (e) {}
let DEPRESCRIBING = []; try { DEPRESCRIBING = ev(txt.slice(...rd('DEPRESCRIBING_PROTOCOLS', '['))); } catch (e) {}
let MINOR_AILMENTS = []; try { MINOR_AILMENTS = ev(txt.slice(...rd('MINOR_AILMENTS', '['))); } catch (e) {}
let NPA = {}; try { NPA = ev(txt.slice(...rd('NON_PHARM_AGENTS'))); } catch (e) {}
let AMR_DATA = []; try { AMR_DATA = ev(txt.slice(...rd('AMR_DATA', '['))); } catch (e) {}
let EDIT_HISTORY = {}; try { EDIT_HISTORY = JSON.parse(txt.slice(...rd('EDIT_HISTORY'))); } catch (e) {}
let CHANGELOG = []; try { CHANGELOG = JSON.parse(txt.slice(...rd('CHANGELOG', '['))); } catch (e) {}

const DRUG_SCHEMA = ['name', 'brand', 'class', 'napra', 'moa', 'indications', 'dosing', 'side_effects', 'contraindications', 'interactions', 'pregnancy', 'pk', 'canadian_notes', 'pearls', 'monitoring', 'source'];
const SEVERITIES = new Set(['Beneficial', 'Contraindicated', 'Major', 'Moderate', 'Minor', 'Note']);
const CDN_RE = /Canadian|Canada|Health Canada|CPS\b|SOGC|CCS\b|NACI|CADTH|CFP\b|CMAJ|CTS\b|RxFiles|AMMI|CDA\b|CUA|CRISM|CCSA|ODB|CAG|CPhA|CMA\b|Toronto Notes|RNAO|CPSO|PHAC|CANMAT|Diabetes Canada|Hypertension Canada|Osteoporosis Canada|Thrombosis Canada|CADDRA|CHEP|CMRD|CIMDRN|NAPRA|CATIE|CBMTG|Cancer Care Ontario|BC Cancer|INESSS|CSACI|CASL|CCDR|Choosing Wisely Canada/i;
const FAM_REQUIRED = ['name', 'moa_summary', 'class_effects', 'class_contraindications', 'members', 'pearls', 'source'];
const REF_REQUIRED = ['id', 'title', 'icon', 'color', 'overview', 'warnings', 'columns', 'rows', 'source', 'related_drugs'];
const DEPR_REQUIRED = ['id', 'title', 'icon', 'color', 'overview', 'indications_to_continue', 'consider_deprescribing', 'taper_steps', 'monitoring', 'rebound_management', 'counselling', 'sources'];
const MA_REQUIRED = ['name', 'icon', 'category', 'ontario_ma_scope', 'assessment', 'treatment', 'references', 'patient_counselling', 'therapeutic_flow'];
const NPA_CATEGORIES = new Set(['lifestyle', 'physical_therapy', 'psychotherapy', 'surgery_procedure', 'monitoring', 'medical_device', 'patient_education', 'supportive_care']);

// Smart splitter for §21.13 multi-family check
const familyKeysSorted = Object.keys(DRUG_FAMILIES).sort((a, b) => b.length - a.length);
function smartSplit(family) {
  const out = [];
  let remaining = family || '';
  let safety = 0;
  while (remaining.length > 0 && safety++ < 30) {
    let matched = null, matchedIdx = -1;
    for (const fk of familyKeysSorted) {
      const idx = remaining.indexOf(fk);
      if (idx >= 0 && (matchedIdx < 0 || idx < matchedIdx)) { matched = fk; matchedIdx = idx; }
    }
    if (matched) {
      const before = remaining.slice(0, matchedIdx).replace(/^\s*[\/]+\s*|\s*[\/]+\s*$/g, '').trim();
      if (before && !out.includes(before)) out.push(before);
      if (!out.includes(matched)) out.push(matched);
      remaining = remaining.slice(matchedIdx + matched.length).replace(/^\s*[\/]+\s*/, '').trim();
    } else {
      remaining.split(/\s+\/\s+/).forEach(s => { s = s.trim(); if (s && !out.includes(s)) out.push(s); });
      break;
    }
  }
  return out;
}

// ════════════════════════════════════════════════════════════
// PASS 1: DRUGS
// ════════════════════════════════════════════════════════════
const drugKeys = Object.keys(DRUGS);
const drugGaps = {
  schemaIncomplete: [], emptyIx: [], badSev: [], noCdnSrc: [],
  noNAPRA: [], noPREG: [], noFM: [], brokenFM: [], noMonitoring: [],
  thinMonitoring: [], thinInteractions: [], thinPearls: [], thinSE: []
};
const MONITORING_MIN = 4;
const INTERACTIONS_MIN = 5;
const PEARLS_MIN = 5;
const SE_MIN = 5;
for (const k of drugKeys) {
  const d = DRUGS[k];
  const missing = DRUG_SCHEMA.filter(f => !(f in d));
  const empty = DRUG_SCHEMA.filter(f => { const v = d[f]; if (v == null || v === '') return true; if (Array.isArray(v) && !v.length && f !== 'interactions') return true; return false; });
  if (missing.length || empty.length) drugGaps.schemaIncomplete.push({ k, missing, empty });
  const ix = d.interactions || [];
  if (!ix.length) drugGaps.emptyIx.push(k);
  else if (ix.length < INTERACTIONS_MIN && !ix.some(x => x.severity === 'Note')) drugGaps.thinInteractions.push({ k, count: ix.length });
  const bad = ix.filter(x => x.severity && !SEVERITIES.has(x.severity));
  if (bad.length) drugGaps.badSev.push({ k, sev: [...new Set(bad.map(x => x.severity))] });
  if (!CDN_RE.test(d.source || '')) drugGaps.noCdnSrc.push(k);
  if (!NAPRA[k]) drugGaps.noNAPRA.push(k);
  if (!PREG[k]) drugGaps.noPREG.push(k);
  if (!FAMILY_MAP[k]) drugGaps.noFM.push(k);
  else if (!DRUG_FAMILIES[FAMILY_MAP[k]]) drugGaps.brokenFM.push({ k, fam: FAMILY_MAP[k] });
  const mon = d.monitoring || [];
  if (!mon.length) drugGaps.noMonitoring.push(k);
  else if (mon.length < MONITORING_MIN) drugGaps.thinMonitoring.push({ k, count: mon.length });
  const pearls = d.pearls || [];
  if (Array.isArray(pearls) && pearls.length > 0 && pearls.length < PEARLS_MIN) drugGaps.thinPearls.push({ k, count: pearls.length });
  const se = d.side_effects || [];
  if (Array.isArray(se) && se.length > 0 && se.length < SE_MIN) drugGaps.thinSE.push({ k, count: se.length });
}

// ════════════════════════════════════════════════════════════
// PASS 2: VACCINES
// ════════════════════════════════════════════════════════════
const vacKeys = Object.keys(VACCINES);
const vacGaps = { schemaIncomplete: [], noCdnSrc: [], thinPearls: [], thinCI: [], thinIx: [], thinSE: [], thinInd: [] };
const VAC_PEARLS_MIN = 5;
const VAC_CI_MIN = 2;
const VAC_IX_MIN = 3;
const VAC_SE_MIN = 5;
const VAC_IND_MIN = 2;
function sumDepth(v) {
  if (Array.isArray(v)) return v.length;
  if (v && typeof v === 'object') return Object.values(v).flat().length;
  return 0;
}
for (const k of vacKeys) {
  const v = VACCINES[k];
  const required = ['name', 'class', 'indications', 'source'];
  const missing = required.filter(f => !(f in v));
  if (missing.length) vacGaps.schemaIncomplete.push({ k, missing });
  if (!CDN_RE.test(v.source || '')) vacGaps.noCdnSrc.push(k);
  if (Array.isArray(v.pearls) && v.pearls.length > 0 && v.pearls.length < VAC_PEARLS_MIN) vacGaps.thinPearls.push({ k, count: v.pearls.length });
  const ciLen = sumDepth(v.contraindications);
  if (ciLen > 0 && ciLen < VAC_CI_MIN) vacGaps.thinCI.push({ k, count: ciLen });
  const ixLen = sumDepth(v.interactions);
  if (ixLen > 0 && ixLen < VAC_IX_MIN) vacGaps.thinIx.push({ k, count: ixLen });
  const seLen = sumDepth(v.side_effects);
  if (seLen > 0 && seLen < VAC_SE_MIN) vacGaps.thinSE.push({ k, count: seLen });
  const indLen = sumDepth(v.indications);
  if (indLen > 0 && indLen < VAC_IND_MIN) vacGaps.thinInd.push({ k, count: indLen });
}

// ════════════════════════════════════════════════════════════
// PASS 3: DRUG_FAMILIES
// ════════════════════════════════════════════════════════════
const famNames = Object.keys(DRUG_FAMILIES);
const famGaps = { schemaIncomplete: [], emptyMembers: [], noCdn: [], thinCE: [], thinCC: [] };
const FAM_CE_MIN = 3;
const FAM_CC_MIN = 2;
for (const fname of famNames) {
  const fam = DRUG_FAMILIES[fname];
  const missing = FAM_REQUIRED.filter(f => !(f in fam));
  const empty = FAM_REQUIRED.filter(f => { const v = fam[f]; if (v == null || v === '') return true; if (Array.isArray(v) && !v.length) return true; return false; });
  if (missing.length || empty.length) famGaps.schemaIncomplete.push({ fname, missing, empty });
  if (!fam.members || !fam.members.length) famGaps.emptyMembers.push(fname);
  if (!CDN_RE.test((fam.canadian_notes || '') + ' ' + (fam.source || ''))) famGaps.noCdn.push(fname);
  if (Array.isArray(fam.class_effects) && fam.class_effects.length > 0 && fam.class_effects.length < FAM_CE_MIN) famGaps.thinCE.push({ fname, count: fam.class_effects.length });
  if (Array.isArray(fam.class_contraindications) && fam.class_contraindications.length > 0 && fam.class_contraindications.length < FAM_CC_MIN) famGaps.thinCC.push({ fname, count: fam.class_contraindications.length });
}

// ════════════════════════════════════════════════════════════
// PASS 4: REFERENCE_TABLES
// ════════════════════════════════════════════════════════════
function getArr(name) {
  const re = new RegExp(`var\\s+${name}\\s*=\\s*\\[([\\s\\S]*?)\\];`);
  const m = txt.match(re);
  return m ? Array.from(m[1].matchAll(/['"]([a-z0-9_]+)['"]/g)).map(x => x[1]) : null;
}
const dispatchArrays = ['toxIds', 'diIds', 'medSafetyIds', 'allergyIds', 'foodIds', 'doseIds', 'acIds', 'equivIds', 'pgxIds', 'pedIds', 'potencyIds'];
const allDispatchIds = new Set();
for (const an of dispatchArrays) { const a = getArr(an); if (a) a.forEach(x => allDispatchIds.add(x)); }
const refGaps = { schemaIncomplete: [], noCdn: [], notWired: [], unresolvedDrugs: [], rowWidthBad: [] };
for (const t of REFERENCE_TABLES) {
  const missing = REF_REQUIRED.filter(f => !(f in t));
  // `related_drugs` may legitimately be empty for non-drug-specific tables
  // (workflows, vital signs, dosing-by-weight charts, etc.). Don't flag those.
  const empty = REF_REQUIRED.filter(f => {
    const v = t[f];
    if (v == null || v === '') return true;
    if (Array.isArray(v) && !v.length && f !== 'related_drugs') return true;
    return false;
  });
  if (missing.length || empty.length) refGaps.schemaIncomplete.push({ id: t.id, missing, empty });
  if (!CDN_RE.test(JSON.stringify(t.source || ''))) refGaps.noCdn.push(t.id);
  if (!allDispatchIds.has(t.id)) refGaps.notWired.push(t.id);
  const unres = (t.related_drugs || []).filter(k => !DRUGS[k] && !VACCINES[k]);
  if (unres.length) refGaps.unresolvedDrugs.push({ id: t.id, unresolved: unres });
  if (Array.isArray(t.rows) && Array.isArray(t.columns)) {
    const exp = t.columns.length;
    const bad = t.rows.some(r => !Array.isArray(r) || r.length !== exp);
    if (bad) refGaps.rowWidthBad.push(t.id);
  }
}

// ════════════════════════════════════════════════════════════
// PASS 5: DISEASES.conditions
// ════════════════════════════════════════════════════════════
const COND_REQUIRED = ['id', 'name', 'signs', 'diagnosis', 'treatment', 'pearls'];
const condGaps = { schemaIncomplete: [], noCdnSrc: [], unresolvedAgents: [], familyMismatch: [], noPregLact: [] };
const PREG_LACT_MIN = 30;
let totalCond = 0;
let totalMultiRows = 0;
for (const [catName, cat] of Object.entries(DISEASES)) {
  for (const c of (cat.conditions || [])) {
    totalCond++;
    const missing = COND_REQUIRED.filter(f => !(f in c));
    const empty = ['signs', 'diagnosis', 'treatment', 'pearls'].filter(f => {
      const v = c[f]; if (v == null) return true;
      if (Array.isArray(v) && !v.length) return true;
      if (typeof v === 'string' && !v.trim()) return true;
      return false;
    });
    if (missing.length || empty.length) condGaps.schemaIncomplete.push({ id: c.id, category: catName, missing, empty });
    const allSrc = (c.source || '') + ' ' + (c.introduction || '') + ' ' + (c.patho || '') + ' ' + (c.treatment || []).map(t => t.guideline || '').join(' ');
    if (!CDN_RE.test(allSrc)) condGaps.noCdnSrc.push({ id: c.id, category: catName });
    const unresAg = new Set();
    const famRows = [];
    for (const t of (c.treatment || [])) {
      for (const a of (t.agents || [])) {
        if (!DRUGS[a] && !VACCINES[a] && !NPA[a]) unresAg.add(a);
      }
      if (t.agents && t.agents.length >= 2 && t.family) {
        const distinct = []; const seen = new Set();
        for (const a of t.agents) { const f = FAMILY_MAP[a]; if (f && !seen.has(f)) { seen.add(f); distinct.push(f); } }
        if (distinct.length > 1) {
          totalMultiRows++;
          const tokens = smartSplit(t.family);
          const missingFams = distinct.filter(d => !tokens.includes(d));
          const extras = tokens.filter(tok => !distinct.includes(tok) && !DRUG_FAMILIES[tok]);
          if (missingFams.length || extras.length) famRows.push({ line: t.line, missing: missingFams });
        }
      }
    }
    if (unresAg.size) condGaps.unresolvedAgents.push({ id: c.id, category: catName, agents: [...unresAg] });
    if (famRows.length) condGaps.familyMismatch.push({ id: c.id, category: catName, rows: famRows });
    // preg_lact_summary is an object with preg + lact subkeys containing categorized drug lists
    const pls = c.preg_lact_summary;
    let pregCount = 0, lactCount = 0;
    if (pls && typeof pls === 'object' && !Array.isArray(pls)) {
      if (pls.preg && typeof pls.preg === 'object') pregCount = Object.values(pls.preg).flat().length;
      if (pls.lact && typeof pls.lact === 'object') lactCount = Object.values(pls.lact).flat().length;
    } else if (typeof pls === 'string') {
      pregCount = pls.length;
    }
    if (pregCount === 0 && lactCount === 0) condGaps.noPregLact.push({ id: c.id, category: catName });
  }
}

// ════════════════════════════════════════════════════════════
// PASS 6: DEPRESCRIBING_PROTOCOLS
// ════════════════════════════════════════════════════════════
const deprGaps = { schemaIncomplete: [], unstructuredTaper: [], noCdnSrc: [] };
for (const p of DEPRESCRIBING) {
  const missing = DEPR_REQUIRED.filter(f => !(f in p));
  const empty = DEPR_REQUIRED.filter(f => { const v = p[f]; if (v == null || v === '') return true; if (Array.isArray(v) && !v.length) return true; return false; });
  if (missing.length || empty.length) deprGaps.schemaIncomplete.push({ id: p.id, missing, empty });
  // taper_steps must be objects with step/action/detail (not strings)
  if (Array.isArray(p.taper_steps) && p.taper_steps.length) {
    const bad = p.taper_steps.filter(s => typeof s !== 'object' || !s.step || !s.action || !s.detail);
    if (bad.length) deprGaps.unstructuredTaper.push({ id: p.id, badSteps: bad.length });
  }
  const allSrc = JSON.stringify(p.sources || '') + ' ' + (p.overview || '');
  if (!CDN_RE.test(allSrc)) deprGaps.noCdnSrc.push(p.id);
}

// ════════════════════════════════════════════════════════════
// PASS 7: MINOR_AILMENTS
// ════════════════════════════════════════════════════════════
const maGaps = { schemaIncomplete: [], noAssessmentSubkeys: [], noCdnSrc: [] };
for (const m of MINOR_AILMENTS) {
  const missing = MA_REQUIRED.filter(f => !(f in m));
  const empty = MA_REQUIRED.filter(f => { const v = m[f]; if (v == null || v === '') return true; if (Array.isArray(v) && !v.length) return true; if (typeof v === 'object' && !Array.isArray(v) && Object.keys(v).length === 0) return true; return false; });
  if (missing.length || empty.length) maGaps.schemaIncomplete.push({ name: m.name, missing, empty });
  // assessment must have key_questions + red_flags
  const a = m.assessment || {};
  if (!a.key_questions || !a.key_questions.length || !a.red_flags || !a.red_flags.length) {
    maGaps.noAssessmentSubkeys.push(m.name);
  }
  const allSrc = JSON.stringify(m.references || '') + ' ' + (m.ontario_ma_scope || '');
  if (!CDN_RE.test(allSrc)) maGaps.noCdnSrc.push(m.name);
}

// ════════════════════════════════════════════════════════════
// PASS 9: AMR_DATA (Antimicrobials tab)
// ════════════════════════════════════════════════════════════
const amrAgentSchema = ['drug', 'dose', 'uses', 'ci', 'notes'];
const amrGaps = { schemaIncomplete: [], unmapped: [], famSchemaIncomplete: [] };
const drugKeysLower = new Set(Object.keys(DRUGS).map(k => k.toLowerCase()));
const drugNamesLower = new Set(Object.values(DRUGS).map(d => (d.name || '').toLowerCase()));
let amrAgentCount = 0;
let amrFamilyCount = 0;
for (const cat of AMR_DATA) {
  for (const fam of (cat.families || [])) {
    amrFamilyCount++;
    if (!fam.name || !fam.moa || !fam.coverage) {
      amrGaps.famSchemaIncomplete.push({ k: fam.name || '(unnamed)', cat: cat.category });
    }
    const allAgents = [...(fam.agents || []), ...(fam.generations || []).flatMap(g => g.agents || [])];
    for (const a of allAgents) {
      amrAgentCount++;
      const missing = amrAgentSchema.filter(f => !a[f]);
      if (missing.length) amrGaps.schemaIncomplete.push({ k: a.drug || '(unnamed)', missing, cat: cat.category, fam: fam.name });
      // Resolution check — try multiple normalizations
      const drugLower = (a.drug || '').toLowerCase();
      const keyAttempt = drugLower.replace(/[^a-z0-9]/g, '_').replace(/_+/g, '_').replace(/^_|_$/g, '');
      const firstWord = drugLower.split(/[ \-\/(]/)[0];
      // Also try: replace "(Ophthalmic)" / "(Topical)" suffixes with _ophth/_topical
      const ophthVariant = keyAttempt.replace(/ophthalmic/g, 'ophth').replace(/topical/g, 'topical');
      const liposomalVariant = drugLower.includes('liposomal') ? 'amphotericin_b' : null;
      // Substring partial-match: drug name contains a DRUGS key (or vice versa)
      const partialMatch = [...drugKeysLower].some(k => k.length >= 6 && drugLower.includes(k.replace(/_/g, ' ')));
      if (!drugKeysLower.has(keyAttempt) && !drugNamesLower.has(drugLower) &&
          !drugKeysLower.has(firstWord) && !drugNamesLower.has(firstWord) &&
          !drugKeysLower.has(ophthVariant) &&
          !(liposomalVariant && drugKeysLower.has(liposomalVariant)) &&
          !partialMatch) {
        amrGaps.unmapped.push({ k: a.drug, cat: cat.category, fam: fam.name });
      }
    }
  }
}

// ════════════════════════════════════════════════════════════
// PASS 8c: EDIT_HISTORY + CHANGELOG (Tier 3)
// ════════════════════════════════════════════════════════════
const ehGaps = { emptyHistory: [], malformedEntry: [], badDate: [], orphanEntity: [] };
const knownCatalogKeys = new Set([
  ...Object.keys(DRUGS),
  ...Object.keys(VACCINES),
  ...Object.keys(DRUG_FAMILIES),
  ...REFERENCE_TABLES.map(t => t.id),
  ...Object.values(DISEASES).flatMap(c => (c.conditions || []).map(x => x.id)),
  ...DEPRESCRIBING.map(p => p.id),
  ...MINOR_AILMENTS.map(m => m.name),
  ...Object.keys(NPA)
]);
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
for (const [entityId, entries] of Object.entries(EDIT_HISTORY)) {
  if (!Array.isArray(entries) || entries.length === 0) {
    ehGaps.emptyHistory.push(entityId);
    continue;
  }
  for (const e of entries) {
    if (!e.date || !e.hash || !e.subject) { ehGaps.malformedEntry.push({ k: entityId }); break; }
    if (!DATE_RE.test(e.date)) { ehGaps.badDate.push({ k: entityId, date: e.date }); break; }
  }
  if (!knownCatalogKeys.has(entityId)) ehGaps.orphanEntity.push(entityId);
}

const clGaps = { malformed: [], badDate: [], badPR: [] };
const CL_KINDS = new Set(['merge', 'squash', 'rebase', 'amend']);
for (const c of CHANGELOG) {
  const missing = ['pr', 'date', 'title'].filter(f => !(f in c) || c[f] === '');
  if (missing.length) clGaps.malformed.push({ pr: c.pr || '(unknown)', missing });
  if (c.date && !DATE_RE.test(c.date)) clGaps.badDate.push({ pr: c.pr, date: c.date });
  if (c.pr !== undefined && (typeof c.pr !== 'number' || !Number.isInteger(c.pr))) clGaps.badPR.push({ pr: c.pr });
}

// ════════════════════════════════════════════════════════════
// PASS 8b: CROSS-REFERENCE INTEGRITY (Tier 3)
// ════════════════════════════════════════════════════════════
const xrefGaps = {
  drugConditionMissingIndication: [],
  refTableMissingRelatedDrug: []
};

// Helper: pluck "indication keywords" from a condition name
function condKeywords(name) {
  return (name || '').toLowerCase()
    .replace(/[^a-z0-9 ]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length >= 5 && !['acute', 'chronic', 'severe', 'mild', 'moderate', 'syndrome', 'disorder', 'disease'].includes(w));
}

// Audit 1: For each (condition, drug) pair, check overlap between condition name + drug.indications/pearls/class
const drugCondMap = {};  // drug_key → Set of condition names it's used for
for (const [catName, cat] of Object.entries(DISEASES)) {
  for (const c of (cat.conditions || [])) {
    for (const tr of (c.treatment || [])) {
      for (const a of (tr.agents || [])) {
        if (DRUGS[a]) {
          if (!drugCondMap[a]) drugCondMap[a] = new Set();
          drugCondMap[a].add(c.name);
        }
      }
    }
  }
}
for (const [drugKey, condSet] of Object.entries(drugCondMap)) {
  const d = DRUGS[drugKey];
  const haystack = (
    (Array.isArray(d.indications) ? d.indications.join(' ') : (d.indications || '')) + ' ' +
    (d.class || '') + ' ' +
    (Array.isArray(d.pearls) ? d.pearls.join(' ') : '') + ' ' +
    (d.canadian_notes || '') + ' ' +
    (d.moa || '')
  ).toLowerCase();
  const missing = [];
  for (const cond of condSet) {
    const keywords = condKeywords(cond);
    if (keywords.length === 0) continue;
    const hasMatch = keywords.some(kw => haystack.includes(kw));
    if (!hasMatch) missing.push(cond);
  }
  if (missing.length) xrefGaps.drugConditionMissingIndication.push({ k: drugKey, conditions: missing });
}

// Audit 2: Ref-table rows mention drug key not in related_drugs[]
// Build set of all drug name aliases for matching
const drugAliases = {};
for (const k of Object.keys(DRUGS)) {
  drugAliases[k.replace(/_/g, ' ').toLowerCase()] = k;
  const name = (DRUGS[k].name || '').toLowerCase();
  if (name) drugAliases[name] = k;
}
for (const t of REFERENCE_TABLES) {
  if (!Array.isArray(t.rows) || !t.rows.length) continue;
  const rowText = JSON.stringify(t.rows).toLowerCase();
  const related = new Set(t.related_drugs || []);
  const missing = new Set();
  for (const [alias, key] of Object.entries(drugAliases)) {
    if (alias.length < 5) continue;  // skip very short aliases (could be false-positive)
    // Word-boundary match
    const re = new RegExp(`\\b${alias.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`);
    if (re.test(rowText) && !related.has(key)) {
      missing.add(key);
    }
  }
  if (missing.size) xrefGaps.refTableMissingRelatedDrug.push({ id: t.id, missing: [...missing].slice(0, 10) });
}

// ════════════════════════════════════════════════════════════
// PASS 8: NON_PHARM_AGENTS
// ════════════════════════════════════════════════════════════
const npaGaps = { schemaIncomplete: [], badCategory: [] };
for (const [key, val] of Object.entries(NPA)) {
  if (!val || typeof val !== 'object') { npaGaps.schemaIncomplete.push({ key, missing: ['ALL'] }); continue; }
  const missing = [];
  if (!val.label || !val.label.trim()) missing.push('label');
  if (!val.category || !val.category.trim()) missing.push('category');
  if (missing.length) npaGaps.schemaIncomplete.push({ key, missing });
  if (val.category && !NPA_CATEGORIES.has(val.category)) npaGaps.badCategory.push({ key, category: val.category });
}

// ════════════════════════════════════════════════════════════
// COMPUTE PERCENTAGES
// ════════════════════════════════════════════════════════════
function pct(num, denom) { return denom === 0 ? 'n/a' : ((num / denom) * 100).toFixed(1) + '%'; }
function bar(num, denom, width) {
  const w = width || 24;
  if (denom === 0) return '─'.repeat(w);
  const fill = Math.round((num / denom) * w);
  return '█'.repeat(fill).padEnd(w, '░');
}
function counts(gaps, denom) {
  const clean = denom - new Set(Object.values(gaps).flat().map(x => typeof x === 'string' ? x : (x.k || x.id || x.fname))).size;
  return { clean, gap: denom - clean };
}

// ════════════════════════════════════════════════════════════
// BUILD MARKDOWN
// ════════════════════════════════════════════════════════════
const today = new Date().toISOString().slice(0, 10);
let latestCommit = '';
try { latestCommit = execSync('git log -1 --pretty=format:"%h on %ad" --date=short', { cwd: repoRoot }).toString().trim(); } catch (e) { latestCommit = 'unknown'; }
const grandTotal = drugKeys.length + vacKeys.length + famNames.length + REFERENCE_TABLES.length + totalCond + DEPRESCRIBING.length + MINOR_AILMENTS.length;

const lines = [];
lines.push('# AUDIT-STATUS.md — RxGuide Catalog Audit Coverage');
lines.push('');
lines.push('> **Live status file** — auto-regenerated from `index.html` by `scripts/regenerate_audit_status.js`.');
lines.push('> Re-run after every audit cycle so future agents know exactly what\'s audited and what remains.');
lines.push('');
lines.push(`**Last regenerated:** ${today}`);
lines.push(`**Catalog snapshot:** ${grandTotal.toLocaleString()} clickable entries (latest commit: \`${latestCommit}\`)`);
lines.push('');
lines.push('---');
lines.push('');
lines.push('## How to use this file');
lines.push('');
lines.push('1. **Before starting any audit work**, read the relevant section below to see what specific entries still need attention.');
lines.push('2. **After completing an audit cycle**, run `node scripts/regenerate_audit_status.js` to refresh this file and commit it alongside the fix PR.');
lines.push('3. Each section lists (a) the audit dimension and current %, and (b) the explicit list of entries that still fail the check.');
lines.push('4. Items NOT listed are confirmed passing. Use this file as the source of truth for "what\'s left to audit."');
lines.push('');
lines.push('---');
lines.push('');

// ─────────── Top-line summary ───────────
lines.push('## Top-line summary');
lines.push('');
lines.push('| Category | Count | Best % | Worst % |');
lines.push('|---|---|---|---|');
function summaryRow(category, total, percents) {
  const high = Math.max(...percents);
  const low = Math.min(...percents);
  return `| ${category} | ${total.toLocaleString()} | ${high.toFixed(1)}% | ${low.toFixed(1)}% |`;
}
const drugPcts = [
  100 - drugGaps.schemaIncomplete.length / drugKeys.length * 100,
  100 - drugGaps.emptyIx.length / drugKeys.length * 100,
  100 - drugGaps.badSev.length / drugKeys.length * 100,
  100 - drugGaps.noCdnSrc.length / drugKeys.length * 100,
  100 - drugGaps.noNAPRA.length / drugKeys.length * 100,
  100 - drugGaps.noPREG.length / drugKeys.length * 100,
  100 - drugGaps.noFM.length / drugKeys.length * 100,
  100 - drugGaps.brokenFM.length / drugKeys.length * 100,
  100 - drugGaps.noMonitoring.length / drugKeys.length * 100,
  100 - drugGaps.thinMonitoring.length / drugKeys.length * 100,
  100 - drugGaps.thinInteractions.length / drugKeys.length * 100,
  100 - drugGaps.thinPearls.length / drugKeys.length * 100,
  100 - drugGaps.thinSE.length / drugKeys.length * 100,
];
lines.push(summaryRow('**DRUGS**', drugKeys.length, drugPcts));
const vacPcts = vacKeys.length === 0 ? [100] : [
  100 - vacGaps.schemaIncomplete.length / vacKeys.length * 100,
  100 - vacGaps.noCdnSrc.length / vacKeys.length * 100,
];
lines.push(summaryRow('**VACCINES**', vacKeys.length, vacPcts));
const famPcts = [
  100 - famGaps.schemaIncomplete.length / famNames.length * 100,
  100 - famGaps.emptyMembers.length / famNames.length * 100,
  100 - famGaps.noCdn.length / famNames.length * 100,
];
lines.push(summaryRow('**DRUG_FAMILIES**', famNames.length, famPcts));
const refPcts = [
  100 - refGaps.schemaIncomplete.length / REFERENCE_TABLES.length * 100,
  100 - refGaps.noCdn.length / REFERENCE_TABLES.length * 100,
  100 - refGaps.notWired.length / REFERENCE_TABLES.length * 100,
  100 - refGaps.unresolvedDrugs.length / REFERENCE_TABLES.length * 100,
  100 - refGaps.rowWidthBad.length / REFERENCE_TABLES.length * 100,
];
lines.push(summaryRow('**REFERENCE_TABLES**', REFERENCE_TABLES.length, refPcts));
const condPcts = [
  100 - condGaps.schemaIncomplete.length / totalCond * 100,
  100 - condGaps.noCdnSrc.length / totalCond * 100,
  100 - condGaps.unresolvedAgents.length / totalCond * 100,
  100 - condGaps.familyMismatch.length / totalCond * 100,
];
lines.push(summaryRow('**DISEASES.conditions**', totalCond, condPcts));
lines.push('');

// ─────────── Helper: format a section ───────────
function section(title, total, dimensions) {
  lines.push('---');
  lines.push('');
  lines.push(`## ${title} (${total.toLocaleString()} entries)`);
  lines.push('');
  lines.push('| Audit dimension | Coverage | Bar | Audited (clean) | Remaining |');
  lines.push('|---|---|---|---|---|');
  for (const d of dimensions) {
    const num = total - d.failingList.length;
    lines.push(`| ${d.label} | **${pct(num, total)}** | \`${bar(num, total, 18)}\` | ${num.toLocaleString()} | ${d.failingList.length.toLocaleString()} |`);
  }
  lines.push('');
  // Detail lists
  for (const d of dimensions) {
    if (d.failingList.length === 0) continue;
    lines.push(`### ❌ ${d.label} — ${d.failingList.length} entries remaining (${pct(d.failingList.length, total)} of total)`);
    lines.push('');
    const sample = d.failingList.slice(0, 60);
    if (typeof d.failingList[0] === 'string') {
      lines.push('```');
      sample.forEach(s => lines.push(s));
      if (d.failingList.length > sample.length) lines.push(`... and ${d.failingList.length - sample.length} more`);
      lines.push('```');
    } else {
      lines.push('| Key/ID | Detail |');
      lines.push('|---|---|');
      for (const item of sample) {
        if (item.k) lines.push(`| \`${item.k}\` | ${JSON.stringify(Object.fromEntries(Object.entries(item).filter(([k]) => k !== 'k')))} |`);
        else if (item.id) lines.push(`| \`${item.id}\` | ${(item.category ? '[' + item.category + '] ' : '') + JSON.stringify(Object.fromEntries(Object.entries(item).filter(([k]) => k !== 'id' && k !== 'category')))} |`);
        else if (item.fname) lines.push(`| \`${item.fname}\` | ${JSON.stringify(Object.fromEntries(Object.entries(item).filter(([k]) => k !== 'fname')))} |`);
        else lines.push(`| (unknown) | ${JSON.stringify(item)} |`);
      }
      if (d.failingList.length > sample.length) lines.push(`| ... | ${d.failingList.length - sample.length} more entries |`);
    }
    lines.push('');
  }
}

// ─────────── DRUGS section ───────────
section('DRUGS', drugKeys.length, [
  { label: 'Full 16-field schema complete', failingList: drugGaps.schemaIncomplete },
  { label: 'Non-empty `interactions[]`', failingList: drugGaps.emptyIx },
  { label: 'Canonical severity values', failingList: drugGaps.badSev },
  { label: 'Canadian-source recognition', failingList: drugGaps.noCdnSrc },
  { label: 'NAPRA_ODB_DATA entry', failingList: drugGaps.noNAPRA },
  { label: 'PREG_DATA entry', failingList: drugGaps.noPREG },
  { label: 'FAMILY_MAP entry', failingList: drugGaps.noFM },
  { label: 'FAMILY_MAP → resolves to DRUG_FAMILIES card', failingList: drugGaps.brokenFM },
  { label: '`monitoring` field populated', failingList: drugGaps.noMonitoring },
  { label: `\`monitoring\` depth ≥ ${MONITORING_MIN} items`, failingList: drugGaps.thinMonitoring },
  { label: `\`interactions\` depth ≥ ${INTERACTIONS_MIN} items`, failingList: drugGaps.thinInteractions },
  { label: `\`pearls\` depth ≥ ${PEARLS_MIN} items`, failingList: drugGaps.thinPearls },
  { label: `\`side_effects\` depth ≥ ${SE_MIN} items`, failingList: drugGaps.thinSE }
]);

// ─────────── VACCINES section ───────────
section('VACCINES', vacKeys.length, [
  { label: 'Required schema fields', failingList: vacGaps.schemaIncomplete },
  { label: 'Canadian-source (NACI / PHAC / CIG / Canada)', failingList: vacGaps.noCdnSrc },
  { label: `\`pearls\` depth ≥ ${VAC_PEARLS_MIN} items`, failingList: vacGaps.thinPearls },
  { label: `\`contraindications\` depth ≥ ${VAC_CI_MIN} items`, failingList: vacGaps.thinCI },
  { label: `\`interactions\` depth ≥ ${VAC_IX_MIN} items`, failingList: vacGaps.thinIx },
  { label: `\`side_effects\` depth ≥ ${VAC_SE_MIN} items`, failingList: vacGaps.thinSE },
  { label: `\`indications\` depth ≥ ${VAC_IND_MIN} items`, failingList: vacGaps.thinInd }
]);

// ─────────── DRUG_FAMILIES section ───────────
section('DRUG_FAMILIES', famNames.length, [
  { label: 'Full required schema (moa_summary, class_effects, contraindications, members, pearls, source)', failingList: famGaps.schemaIncomplete },
  { label: 'Non-empty `members[]`', failingList: famGaps.emptyMembers },
  { label: 'Canadian source / canadian_notes', failingList: famGaps.noCdn },
  { label: `\`class_effects\` depth ≥ ${FAM_CE_MIN} items`, failingList: famGaps.thinCE },
  { label: `\`class_contraindications\` depth ≥ ${FAM_CC_MIN} items`, failingList: famGaps.thinCC }
]);

// ─────────── REFERENCE_TABLES section ───────────
section('REFERENCE_TABLES', REFERENCE_TABLES.length, [
  { label: 'All 10 schema fields complete', failingList: refGaps.schemaIncomplete },
  { label: 'Canadian source in citation', failingList: refGaps.noCdn },
  { label: 'Wired into `buildReference()` dispatch (not orphan)', failingList: refGaps.notWired },
  { label: '`related_drugs` all resolve to DRUGS/VACCINES', failingList: refGaps.unresolvedDrugs },
  { label: 'Row widths match column count', failingList: refGaps.rowWidthBad }
]);

// ─────────── DISEASES section ───────────
section('DISEASES.conditions', totalCond, [
  { label: 'Required schema (signs/diagnosis/treatment/pearls non-empty)', failingList: condGaps.schemaIncomplete },
  { label: 'Cites Canadian source', failingList: condGaps.noCdnSrc },
  { label: 'All `treatment.agents` resolve (DRUGS/VACCINES/NON_PHARM_AGENTS)', failingList: condGaps.unresolvedAgents },
  { label: '§21.13 multi-family compliance', failingList: condGaps.familyMismatch },
  { label: '`preg_lact_summary` populated (preg + lact drug categorization)', failingList: condGaps.noPregLact }
]);

// ─────────── DEPRESCRIBING_PROTOCOLS ───────────
section('DEPRESCRIBING_PROTOCOLS', DEPRESCRIBING.length, [
  { label: 'Full 12-field schema complete', failingList: deprGaps.schemaIncomplete },
  { label: '`taper_steps` structured (step/action/detail objects)', failingList: deprGaps.unstructuredTaper },
  { label: 'Cites Canadian source', failingList: deprGaps.noCdnSrc }
]);

// ─────────── MINOR_AILMENTS ───────────
section('MINOR_AILMENTS', MINOR_AILMENTS.length, [
  { label: 'Full 9-field schema complete', failingList: maGaps.schemaIncomplete },
  { label: '`assessment` has key_questions + red_flags', failingList: maGaps.noAssessmentSubkeys },
  { label: 'Cites Canadian source / Ontario regulation', failingList: maGaps.noCdnSrc }
]);

// ─────────── NON_PHARM_AGENTS ───────────
section('NON_PHARM_AGENTS', Object.keys(NPA).length, [
  { label: 'Schema complete (label + category)', failingList: npaGaps.schemaIncomplete },
  { label: 'Category is canonical (one of 8 types)', failingList: npaGaps.badCategory }
]);

// ─────────── AMR_DATA (Antimicrobials tab) ───────────
section('AMR_DATA (Antimicrobials tab)', amrAgentCount, [
  { label: 'Agent schema complete (drug, dose, uses, ci, notes)', failingList: amrGaps.schemaIncomplete },
  { label: 'Agent resolves to DRUGS catalog (click-through)', failingList: amrGaps.unmapped },
  { label: 'Family schema complete (name, moa, coverage)', failingList: amrGaps.famSchemaIncomplete }
]);

// ─────────── EDIT_HISTORY + CHANGELOG ───────────
section('EDIT_HISTORY (entities tracked)', Object.keys(EDIT_HISTORY).length, [
  { label: 'Has ≥1 history entry', failingList: ehGaps.emptyHistory.map(k => ({ k })) },
  { label: 'Entries have valid date + hash + subject', failingList: ehGaps.malformedEntry },
  { label: 'Date format YYYY-MM-DD', failingList: ehGaps.badDate },
  { label: 'Entity exists in current catalog (no orphan)', failingList: ehGaps.orphanEntity.map(k => ({ k })) }
]);
section('CHANGELOG (PR entries)', CHANGELOG.length, [
  { label: 'Required fields (pr, date, title)', failingList: clGaps.malformed.map(x => ({ k: x.pr, missing: x.missing })) },
  { label: 'Date format YYYY-MM-DD', failingList: clGaps.badDate.map(x => ({ k: x.pr, date: x.date })) },
  { label: 'PR number is integer', failingList: clGaps.badPR.map(x => ({ k: x.pr })) }
]);

// ─────────── CROSS-REFERENCE INTEGRITY ───────────
// (Drug-condition indication-overlap audit removed — too many false positives
//  from vocabulary mismatch between formal condition names and standard drug
//  indication terminology. Clinical review remains the gatekeeper.)
section('Cross-Reference: Reference Tables', REFERENCE_TABLES.length, [
  { label: 'Drugs mentioned in `rows` are in `related_drugs[]`', failingList: xrefGaps.refTableMissingRelatedDrug }
]);

// ─────────── ADDITIONAL CONTENT ASSETS ───────────
lines.push('---');
lines.push('');
lines.push('## Additional content assets (not %-based)');
lines.push('');
lines.push('| Asset | Count |');
lines.push('|---|---|');
lines.push(`| DEPRESCRIBING_PROTOCOLS | **${DEPRESCRIBING.length}** |`);
lines.push(`| MINOR_AILMENTS | **${MINOR_AILMENTS.length}** |`);
lines.push(`| NON_PHARM_AGENTS dictionary | **${Object.keys(NPA).length}** |`);
lines.push(`| EDIT_HISTORY entities tracked | **${Object.keys(EDIT_HISTORY).length.toLocaleString()}** |`);
lines.push(`| CHANGELOG PRs catalogued | **${CHANGELOG.length}** |`);
lines.push(`| DISEASES categories | **${Object.keys(DISEASES).length}** |`);
lines.push('');
lines.push('---');
lines.push('');
lines.push('## Suggested next audit priorities');
lines.push('');
lines.push('Ordered by impact (size of gap × clinical importance):');
lines.push('');
const priorities = [];
if (famGaps.schemaIncomplete.length > 50) priorities.push({ p: 1, gap: famGaps.schemaIncomplete.length, area: 'DRUG_FAMILIES — full schema authoring (moa_summary, class_effects, members[], pearls, source)' });
if (famGaps.emptyMembers.length > 50) priorities.push({ p: 1, gap: famGaps.emptyMembers.length, area: 'DRUG_FAMILIES — populate `members[]` for skeletal family cards' });
if (refGaps.unresolvedDrugs.length > 0) priorities.push({ p: 2, gap: refGaps.unresolvedDrugs.length, area: 'REFERENCE_TABLES — fix `related_drugs` keys that don\'t resolve' });
if (refGaps.notWired.length > 0) priorities.push({ p: 2, gap: refGaps.notWired.length, area: 'REFERENCE_TABLES — wire orphan tables into `buildReference()` dispatch arrays' });
if (condGaps.noCdnSrc.length > 0) priorities.push({ p: 3, gap: condGaps.noCdnSrc.length, area: 'DISEASES.conditions — add Canadian source/guideline citation' });
if (condGaps.unresolvedAgents.length > 0) priorities.push({ p: 3, gap: condGaps.unresolvedAgents.length, area: 'DISEASES.conditions — fix unresolved `treatment.agents` (add to NON_PHARM_AGENTS or DRUGS, or correct typo)' });
if (condGaps.schemaIncomplete.length > 0) priorities.push({ p: 3, gap: condGaps.schemaIncomplete.length, area: 'DISEASES.conditions — populate missing/empty required fields' });
if (condGaps.familyMismatch.length > 0) priorities.push({ p: 4, gap: condGaps.familyMismatch.length, area: 'DISEASES.conditions — apply §21.13 multi-family fix' });
if (drugGaps.schemaIncomplete.length > 0) priorities.push({ p: 1, gap: drugGaps.schemaIncomplete.length, area: 'DRUGS — schema-incomplete entries' });
if (drugGaps.noMonitoring.length > 0) priorities.push({ p: 1, gap: drugGaps.noMonitoring.length, area: 'DRUGS — missing monitoring field' });
if (drugGaps.thinMonitoring.length > 0) priorities.push({ p: 2, gap: drugGaps.thinMonitoring.length, area: `DRUGS — thin monitoring (<${MONITORING_MIN} items): expand to 4-7 specific parameters/frequencies` });
if (drugGaps.thinInteractions.length > 0) priorities.push({ p: 2, gap: drugGaps.thinInteractions.length, area: `DRUGS — thin interactions (<${INTERACTIONS_MIN} entries): add major drug interactions including severity` });
priorities.sort((a, b) => a.p - b.p || b.gap - a.gap);
if (priorities.length === 0) {
  lines.push('**No remaining audit gaps — catalog is 100% clean across all checked dimensions.**');
} else {
  lines.push('| Priority | Gap (entries) | Audit area |');
  lines.push('|---|---|---|');
  priorities.forEach(p => lines.push(`| ${p.p} | **${p.gap.toLocaleString()}** | ${p.area} |`));
}
lines.push('');
lines.push('---');
lines.push('');
lines.push('## Audit-workflow contract');
lines.push('');
lines.push('1. **AGENT MUST READ this file** before starting any audit task. The specific entries listed under each "❌ Remaining" section ARE the next audit work.');
lines.push('2. **AGENT MUST REGENERATE this file** after every audit/fix PR by running `node scripts/regenerate_audit_status.js` (or recreating the script if /tmp is gone — see the script source above for the canonical algorithm).');
lines.push('3. **AGENT MUST COMMIT** the regenerated AUDIT-STATUS.md alongside the fix in the same PR (so main is always self-describing).');
lines.push('4. Items absent from this file are confirmed passing. Do NOT audit items already at 100% unless the user explicitly asks.');
lines.push('5. Reference this file by name in PR descriptions ("see AUDIT-STATUS.md for full context on remaining gaps").');
lines.push('');
lines.push('See AGENTS.md §AUDIT-STATUS and CLAUDE.md "Standing workflow" for the full canonical workflow.');
lines.push('');

fs.writeFileSync(outPath, lines.join('\n'));
console.log('Wrote', outPath);
console.log('Lines:', lines.length);
console.log('Size:', (fs.statSync(outPath).size / 1024).toFixed(1) + ' KB');
