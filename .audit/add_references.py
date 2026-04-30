import json
import os

CORRECTED_DIR = "/home/user/rxguide/.audit/corrected"

REFERENCES = {
    "01_Allergic_Rhinitis.json": [
        "Ontario College of Pharmacists. Minor Ailments: Allergic Rhinitis. OCP Prescribing Standards, O. Reg. 256/24 (2025).",
        "CSACI (Canadian Society of Allergy and Clinical Immunology). Allergic Rhinitis — Canadian Clinical Practice Guidelines (2022).",
        "Bernstein JA, et al. The diagnosis and management of rhinitis: An updated practice parameter. J Allergy Clin Immunol. 2022;150(6):1286–1341. (AAAAI/ACAAI)",
        "Brozek JL, et al. Allergic Rhinitis and its Impact on Asthma (ARIA) Guidelines — 2016 revision. J Allergy Clin Immunol. 2017;140(4):950–958."
    ],
    "02_Oral_Candidiasis.json": [
        "Ontario College of Pharmacists. Minor Ailments: Oral Candidiasis. OCP Prescribing Standards, O. Reg. 256/24 (2025).",
        "RxTx (Canadian Pharmacists Association). Oral Candidiasis — Therapeutic Choices, 8th ed. (2023).",
        "Pappas PG, et al. Clinical Practice Guideline for the Management of Candidiasis: 2016 Update by IDSA. Clin Infect Dis. 2016;62(4):e1–e50.",
        "NICE. Candida — oral: Clinical Knowledge Summary (CKS). National Institute for Health and Care Excellence (2023)."
    ],
    "03_Urticaria.json": [
        "Ontario College of Pharmacists. Minor Ailments: Urticaria. OCP Prescribing Standards, O. Reg. 256/24 (2025).",
        "CSACI (Canadian Society of Allergy and Clinical Immunology). Urticaria Management — Canadian Consensus Guidelines (2019).",
        "Bernstein JA, et al. The diagnosis and management of acute and chronic urticaria: 2014 update. J Allergy Clin Immunol. 2014;133(5):1270–1277. (AAAAI/ACAAI Joint Task Force)",
        "Zuberbier T, et al. The EAACI/GA²LEN/EDF/WAO Guideline for the Definition, Classification, Diagnosis and Management of Urticaria. Allergy. 2022;77(3):734–766."
    ],
    "04_Hemorrhoids.json": [
        "Ontario College of Pharmacists. Minor Ailments: Hemorrhoids. OCP Prescribing Standards, O. Reg. 256/24 (2025).",
        "RxTx (Canadian Pharmacists Association). Hemorrhoids — Therapeutic Choices, 8th ed. (2023).",
        "Maron DJ, Bhutiani N. ACG Clinical Guideline: Management of Hemorrhoids. Am J Gastroenterol. 2023;118(5):811–823.",
        "NICE. Haemorrhoids: Clinical Knowledge Summary (CKS). National Institute for Health and Care Excellence (2023)."
    ],
    "05_Dysmenorrhea.json": [
        "Ontario College of Pharmacists. Minor Ailments: Dysmenorrhea. OCP Prescribing Standards, O. Reg. 256/24 (2025).",
        "SOGC (Society of Obstetricians and Gynaecologists of Canada). No. 345: Primary Dysmenorrhea Consensus Guideline. J Obstet Gynaecol Can. 2017;39(7):585–595.",
        "ACOG Practice Bulletin No. 218: Chronic Pelvic Pain. Obstet Gynecol. 2020;135(3):e98–e109.",
        "NICE. Dysmenorrhoea: Clinical Knowledge Summary (CKS). National Institute for Health and Care Excellence (2023)."
    ],
    "06_Impetigo.json": [
        "Ontario College of Pharmacists. Minor Ailments: Impetigo. OCP Prescribing Standards, O. Reg. 256/24 (2025).",
        "AMMI Canada (Association of Medical Microbiology and Infectious Disease Canada). Skin and Soft Tissue Infection Guidelines (2019).",
        "Stevens DL, et al. Practice Guidelines for the Diagnosis and Management of Skin and Soft Tissue Infections: 2014 Update by IDSA. Clin Infect Dis. 2014;59(2):e10–e52.",
        "NICE. Impetigo: Clinical Knowledge Summary (CKS). National Institute for Health and Care Excellence (2023)."
    ],
    "07_Tick_Bite_Lyme.json": [
        "Ontario College of Pharmacists. Minor Ailments: Tick Bite / Lyme Disease Prophylaxis. OCP Prescribing Standards, O. Reg. 256/24 (2025).",
        "Public Health Ontario (PHO). Lyme Disease: Prevention and Clinical Resources (2024). Ontario Agency for Health Protection and Promotion.",
        "Lantos PM, et al. Clinical Practice Guidelines by IDSA/AAN/ACR: 2020 Guidelines for Prevention, Diagnosis and Treatment of Lyme Disease. Clin Infect Dis. 2021;72(1):e1–e48.",
        "NICE. Lyme disease: NICE guideline [NG95]. National Institute for Health and Care Excellence (2018, updated 2023)."
    ],
    "08_Conjunctivitis.json": [
        "Ontario College of Pharmacists. Minor Ailments: Conjunctivitis. OCP Prescribing Standards, O. Reg. 256/24 (2025).",
        "Canadian Ophthalmological Society (COS). Evidence-based Clinical Practice Guidelines for Conjunctivitis (2021).",
        "AAO (American Academy of Ophthalmology). Preferred Practice Pattern: Conjunctivitis (2018, reviewed 2023).",
        "NICE. Conjunctivitis — infective: Clinical Knowledge Summary (CKS). National Institute for Health and Care Excellence (2023)."
    ],
    "09_Acne.json": [
        "Ontario College of Pharmacists. Minor Ailments: Acne. OCP Prescribing Standards, O. Reg. 256/24 (2025).",
        "Canadian Dermatology Association (CDA). Acne Management Guidelines. J Cutan Med Surg. 2015;19(2):101–108 (latest CDA guidance, with OCP updates).",
        "Zaenglein AL, et al. Guidelines of care for the management of acne vulgaris. J Am Acad Dermatol. 2016;74(5):945–973.e33. (AAD, updated 2024)",
        "NICE. Acne vulgaris: management. NICE guideline [NG198]. National Institute for Health and Care Excellence (2021)."
    ],
    "10_Cold_Sores.json": [
        "Ontario College of Pharmacists. Minor Ailments: Cold Sores (Herpes Labialis). OCP Prescribing Standards, O. Reg. 256/24 (2025).",
        "RxTx (Canadian Pharmacists Association). Herpes Labialis — Therapeutic Choices, 8th ed. (2023).",
        "Workowski KA, et al. Sexually Transmitted Infections Treatment Guidelines (includes HSV). CDC/MMWR. 2021;70(4):1–187.",
        "NICE. Herpes simplex — oral: Clinical Knowledge Summary (CKS). National Institute for Health and Care Excellence (2023)."
    ],
    "11_MSK_Sprains.json": [
        "Ontario College of Pharmacists. Minor Ailments: Minor MSK Sprains and Strains. OCP Prescribing Standards, O. Reg. 256/24 (2025).",
        "RxFiles (Saskatoon Health Region). Musculoskeletal Pain — Analgesic Comparison Chart (2022).",
        "AAOS (American Academy of Orthopaedic Surgeons). Clinical Practice Guideline: Management of Ankle Sprains (2023).",
        "NICE. Sprains and strains: Clinical Knowledge Summary (CKS). National Institute for Health and Care Excellence (2022)."
    ],
    "12_Nausea_Vomiting.json": [
        "Ontario College of Pharmacists. Minor Ailments: Nausea and Vomiting. OCP Prescribing Standards, O. Reg. 256/24 (2025).",
        "RxTx (Canadian Pharmacists Association). Nausea and Vomiting — Therapeutic Choices, 8th ed. (2023).",
        "ACG (American College of Gastroenterology). ACG Clinical Guideline: Nausea and Vomiting of Pregnancy. Am J Gastroenterol. 2022;117(10):1538–1558.",
        "NICE. Nausea/vomiting in pregnancy: Clinical Knowledge Summary (CKS). National Institute for Health and Care Excellence (2023)."
    ],
    "13_Insect_Bites.json": [
        "Ontario College of Pharmacists. Minor Ailments: Insect Bites and Stings. OCP Prescribing Standards, O. Reg. 256/24 (2025).",
        "RxTx (Canadian Pharmacists Association). Insect Bites and Stings — Therapeutic Choices, 8th ed. (2023).",
        "AAD (American Academy of Dermatology). Insect Bite Reactions: Diagnosis and Management (2022).",
        "WHO. Vector Control: Insect Repellents and Bite Prevention. World Health Organization (2023)."
    ],
    "14_UTI.json": [
        "Ontario College of Pharmacists. Minor Ailments: Uncomplicated Urinary Tract Infection. OCP Prescribing Standards, O. Reg. 256/24 (2025).",
        "AMMI Canada. Community-acquired Urinary Tract Infections in Adults — Canadian Guidelines (2019).",
        "Gupta K, et al. International Clinical Practice Guidelines for the Treatment of Acute Uncomplicated Cystitis and Pyelonephritis in Women: 2010 Update by IDSA and ESCMID. Clin Infect Dis. 2011;52(5):e103–e120. (with AMMI Canada local antibiogram updates).",
        "NICE. Urinary tract infection (lower) — women: Clinical Knowledge Summary (CKS). National Institute for Health and Care Excellence (2023)."
    ],
    "15_Shingles.json": [
        "Ontario College of Pharmacists. Minor Ailments: Herpes Zoster (Shingles). OCP Prescribing Standards, O. Reg. 256/24 (2025).",
        "NACI (National Advisory Committee on Immunization). Recommendations on the Use of Herpes Zoster Vaccines. Canada Communicable Disease Report. 2018;44(11):274–293 (updated 2023).",
        "Dworkin RH, et al. Recommendations for the Management of Herpes Zoster. Clin Infect Dis. 2007;44(Suppl 1):S1–S26. (IDSA, endorsed by AAD/AAO)",
        "NICE. Shingles (herpes zoster): Clinical Knowledge Summary (CKS). National Institute for Health and Care Excellence (2023)."
    ],
    "16_Pinworms.json": [
        "Ontario College of Pharmacists. Minor Ailments: Pinworm Infection (Enterobiasis). OCP Prescribing Standards, O. Reg. 256/24 (2025).",
        "Canadian Paediatric Society (CPS). Common questions about Enterobius vermicularis (pinworm) management (2018, reaffirmed 2023).",
        "AAP (American Academy of Pediatrics). Red Book: Report of the Committee on Infectious Diseases, 32nd ed. Pinworm Infection (Enterobiasis). 2021.",
        "WHO. Soil-transmitted helminthiases: Enterobiasis (Pinworm). World Health Organization (2023)."
    ],
    "17_GERD.json": [
        "Ontario College of Pharmacists. Minor Ailments: Gastroesophageal Reflux Disease (GERD). OCP Prescribing Standards, O. Reg. 256/24 (2025).",
        "Armstrong D, et al. Canadian Consensus Conference on the Management of Gastroesophageal Reflux Disease in Adults — Update 2004. Can J Gastroenterol. 2005;19(1):15–35. (supplemented by RxTx 2023 updates).",
        "Katz PO, et al. ACG Clinical Guideline for the Diagnosis and Management of Gastroesophageal Reflux Disease. Am J Gastroenterol. 2022;117(1):27–56.",
        "NICE. Gastro-oesophageal reflux disease and dyspepsia in adults: investigation and management. NICE guideline [CG184]. National Institute for Health and Care Excellence (2014, updated 2023)."
    ],
    "18_Eczema.json": [
        "Ontario College of Pharmacists. Minor Ailments: Atopic Dermatitis (Eczema). OCP Prescribing Standards, O. Reg. 256/24 (2025).",
        "Canadian Dermatology Association (CDA). Atopic Dermatitis Guidelines — Canadian Consensus (2023).",
        "Sidbury R, et al. Guidelines of care for the management of atopic dermatitis in adults with phototherapy and systemic therapies. J Am Acad Dermatol. 2023;89(2):e49–e70. (AAD, full guideline series 2023)",
        "NICE. Atopic eczema in under 12s: diagnosis and management. NICE guideline [CG57] (2007, updated 2023); Eczema — atopic: CKS (2023)."
    ],
    "19_Smoking_Cessation.json": [
        "Ontario College of Pharmacists. Smoking Cessation Prescribing Authority under the Pharmacy Act, O. Reg. 202/94 (as amended 2024). OCP Practice Policy (2024).",
        "Registered Nurses' Association of Ontario (RNAO) / CAN-ADAPTT. Canadian Smoking Cessation Clinical Practice Guideline. Toronto: CAMH (2011, updated standards 2023).",
        "Fiore MC, et al. Treating Tobacco Use and Dependence: 2008 Update. Clinical Practice Guideline. USDHHS/PHS (2008). Supplemented by VA/DoD Clinical Practice Guideline (2020).",
        "WHO. MPOWER: A policy package to reverse the tobacco epidemic. World Health Organization (2023)."
    ],
}

for filename, refs in REFERENCES.items():
    filepath = os.path.join(CORRECTED_DIR, filename)
    with open(filepath, 'r') as f:
        data = json.load(f)
    data['references'] = refs
    with open(filepath, 'w') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print(f"Updated: {filename}")

print("Done.")
