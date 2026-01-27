ffq_prompt.value = `
<GROUND_RULES>
- Use ONLY the information explicitly present in the provided CONTEXT blocks.
- Do NOT invent missing fields. If a required value cannot be confidently derived from context, return null for that value.
- Output MUST be valid JSON only (no markdown, no commentary, no extra keys outside the specified structure).
- Treat all top-level keys (Household IDs and Account IDs) as strings, exactly as they appear in the contexts.
- Perform matching ONLY within the same HouseholdId. Never match a person to a different HouseholdId.
</GROUND_RULES>

<DATA_MODEL_NOTES>
- accounts is grouped by HouseholdId, then by AccountId; each account record includes at least:
  - Primary (string), Secondary (string or empty), AccountType (string), CurrentAccountNumber (number), HouseholdName, etc.
- households is grouped by HouseholdId, then by canonical full-name keys (as written in the client sheet); each person record includes contact type and demographics.
- beneficiaries is grouped by HouseholdId, then by beneficiary name keys; each beneficiary record includes AccountNumber (number) and related fields.
- suitability is grouped by HouseholdId; one record per HouseholdId.
</DATA_MODEL_NOTES>

Accounts (by HouseholdId -> AccountId):
<CONTEXT>
${JSON.stringify(accounts.value)}
</CONTEXT>

Clients / Households (by HouseholdId -> Canonical Person Name):
<CONTEXT>
${JSON.stringify(households.value)}
</CONTEXT>

Beneficiaries (by HouseholdId -> Beneficiary Name):
<CONTEXT>
${JSON.stringify(beneficiaries.value)}
</CONTEXT>

Suitability (by HouseholdId):
<CONTEXT>
${JSON.stringify(suitability.value)}
</CONTEXT>

<TASK>
Build and return one aggregated JSON object that follows this structure:

{
  "<HouseholdId>": {
    "<AccountId>": {
      "registration_type": <string|null>,
      "primary": <client_object|null>,
      "secondary": <client_object|null>,
      "beneficiaries": <array_of_beneficiary_objects|null>,
      "suitability": <suitability_object|null>
    },
    "... more AccountIds ...": { ... }
  },
  "... more HouseholdIds ...": { ... }
}

Where:
- HouseholdIds and AccountIds come from accounts.
- registration_type is derived from accounts[HouseholdId][AccountId].AccountType (use the exact value present).
- primary/secondary are the matched client records from households[HouseholdId] using fuzzy name matching.
- beneficiaries are included ONLY if the registration_type indicates an IRA (or IRA variation).
- suitability is the single suitability record for that HouseholdId (same object repeated per account is acceptable).
</TASK>

<FUZZY_MATCHING_RULES>
Goal: Map an owner name from an account record (accounts.*.*.Primary / accounts.*.*.Secondary) to the correct canonical person key in households[HouseholdId].

For each owner_name_to_match:
1) If owner_name_to_match is empty/blank/NULL-like -> return null (no match).
2) Candidate set: all person keys in households[HouseholdId]. (Never search outside that HouseholdId.)
3) Normalize BOTH the owner_name_to_match and each candidate key:
   - lowercase
   - trim whitespace
   - replace hyphens with spaces
   - remove punctuation: commas, periods, apostrophes
   - collapse multiple spaces to one
   - remove common suffix tokens if present at end: "jr", "sr", "ii", "iii", "iv"
   - keep tokens (split by space)
4) Scoring (pick the single best candidate):
   - Score 1.00 if normalized full strings are identical.
   - Else score 0.95 if token sets are identical (order-insensitive).
   - Else score 0.90 if last-name token matches exactly AND first-name token is an exact match OR a clear prefix match (e.g., "stan" vs "stanley", "mike" vs "michael" ONLY if prefix match supports it).
   - Else score = JaccardSimilarity(token_set_a, token_set_b) = |A∩B| / |A∪B|.
5) Threshold:
   - If best_score < 0.80 -> return null.
6) Tie-breaking:
   - Prefer the candidate with exact last-name match.
   - If still tied/unclear -> return null (do not guess).
7) Output for a matched client:
   - Return the matched client record (households[HouseholdId][MatchedCanonicalName]) and add a top-level field "Name" equal to MatchedCanonicalName.
   - Do not alter the underlying record values; only add "Name".
</FUZZY_MATCHING_RULES>

<BENEFICIARY_RULES>
For each account:
1) Determine IRA-ness from registration_type:
   - Convert registration_type to lowercase.
   - If it contains the substring "ira" (covers variations like "roth ira", "ira traditional", "ira rollover", etc.), treat as IRA.
2) If NOT IRA:
   - beneficiaries = null
3) If IRA:
   - Find beneficiaries ONLY within beneficiaries[HouseholdId].
   - Include every beneficiary record where beneficiary_record.AccountNumber equals the current <AccountId>
     (treat AccountId as numeric or string equivalently when comparing).
   - beneficiaries output is an array (can be empty []).
</BENEFICIARY_RULES>

<SUITABILITY_RULES>
For each account under a HouseholdId:
- suitability = suitability[HouseholdId] if present, else null.
</SUITABILITY_RULES>

<BUILD_STEPS>
1) Initialize result = {}.
2) For each HouseholdId in accounts:
   a) Ensure result[HouseholdId] = {}.
   b) For each AccountId in accounts[HouseholdId]:
      i) account = accounts[HouseholdId][AccountId]
      ii) registration_type = account.AccountType if present else null
      iii) primary_owner_name = account.Primary
           primary = fuzzy_match(primary_owner_name, households[HouseholdId]) using the rules above
      iv) secondary_owner_name = account.Secondary
           secondary = fuzzy_match(secondary_owner_name, households[HouseholdId]) using the rules above
      v) beneficiaries = apply BENEFICIARY_RULES
      vi) suitability_obj = apply SUITABILITY_RULES
      vii) result[HouseholdId][AccountId] = {
           "registration_type": registration_type,
           "primary": primary,
           "secondary": secondary,
           "beneficiaries": beneficiaries,
           "suitability": suitability_obj
         }
3) Return result as JSON only.
</BUILD_STEPS>

<EXAMPLE_OUTPUT_SUBSET>
Example ONLY (subset, not all households/accounts). This example is a correct slice from the provided contexts:

{
  "1": {
    "18986024": {
      "registration_type": "ira traditional",
      "primary": {
        "Name": "Michael Hannah",
        "DOB": "1958-06-04T00:00:00.000Z",
        "SSN": "273-60-9748",
        "Email": "mdhannah22@gmail.com",
        "Gender": "Male",
        "Contact": "Primary",
        "JobTitle": "Marketing Professional",
        "LastName": "Hannah",
        "FirstName": "Michael",
        "HomePhone": "",
        "Dependants": "",
        "LicenseNum": "",
        "MiddleName": "Dean",
        "HomeAddress": { "zip": 44303, "city": "Akron", "state": "OH", "address": "547 Malvern Rd" },
        "MobilePhone": "216-702-7807",
        "EmployerName": "Rockwell Automation",
        "LicenseState": "",
        "HouseholdName": "Hannah, Michael & Laura",
        "MaritalStatus": "Married",
        "MailingAddress": { "zip": "", "city": "", "state": "", "address": "" },
        "EmploymentStatus": "retired",
        "LicenseExpiration": ""
      },
      "secondary": null,
      "beneficiaries": [
        {
          "DOB": "1960-11-28T00:00:00.000Z",
          "SSN": "279-58-2135",
          "Name": "Laura Miller-Hannah",
          "Phone": "330-310-9334",
          "Gender": "Female",
          "Address": "547 Malvern Rd. Akron, OH 44303",
          "Percentage": 100,
          "AccountTitle": "Michael Hannah IRA - Traditional",
          "Relationship": "Spouse",
          "AccountNumber": 18986024,
          "HouseholdName": "Hannah, Michael & Laura",
          "PrimaryContingent": "Primary"
        }
      ],
      "suitability": {
        "TaxRate": "16% - 25%",
        "NetWorth": "$1m - $3m",
        "HouseholdId": "1",
        "TimeHorizon": "More than 10 Years",
        "AnnualIncome": "$100,001 - $250,000",
        "RfgAffiliate": "",
        "AnnualExpense": "$50,001 - $100,000",
        "HouseholdName": "Hannah, Michael & Laura",
        "RiskTolerance": "Conservative",
        "LiquidNetWorth": "$1m - $3m",
        "RoleDesignation": "",
        "AccountObjective": "",
        "SecurityIndustry": "",
        "MilitaryOrPolitician": ""
      }
    },
    "59546783": {
      "registration_type": "ira traditional",
      "primary": {
        "Name": "Laura Hannah",
        "DOB": "1960-11-28T00:00:00.000Z",
        "SSN": "279-58-2135",
        "Email": "lauramikehannah@yahoo.com",
        "Gender": "Female",
        "Contact": "Secondary",
        "JobTitle": "teacher",
        "LastName": "Hannah",
        "FirstName": "Laura",
        "HomePhone": "",
        "Dependants": "",
        "LicenseNum": "",
        "MiddleName": "",
        "HomeAddress": { "zip": 44303, "city": "Akron", "state": "OH", "address": "547 Malvern Rd" },
        "MobilePhone": "330-310-9334",
        "EmployerName": "Portage Lakes Career Center",
        "LicenseState": "",
        "HouseholdName": "Hannah, Michael & Laura",
        "MaritalStatus": "Married",
        "MailingAddress": { "zip": "", "city": "", "state": "", "address": "" },
        "EmploymentStatus": "retired",
        "LicenseExpiration": ""
      },
      "secondary": null,
      "beneficiaries": [
        {
          "DOB": "1958-06-04T00:00:00.000Z",
          "SSN": "273-60-9748",
          "Name": "Michael Hannah",
          "Phone": "216-702-7807",
          "Gender": "Male",
          "Address": "547 Malvern Rd. Akron, OH 44303",
          "Percentage": 100,
          "AccountTitle": "Laura Hannah IRA - Traditional",
          "Relationship": "Spouse",
          "AccountNumber": 59546783,
          "HouseholdName": "Hannah, Michael & Laura",
          "PrimaryContingent": "Primary"
        }
      ],
      "suitability": {
        "TaxRate": "16% - 25%",
        "NetWorth": "$1m - $3m",
        "HouseholdId": "1",
        "TimeHorizon": "More than 10 Years",
        "AnnualIncome": "$100,001 - $250,000",
        "RfgAffiliate": "",
        "AnnualExpense": "$50,001 - $100,000",
        "HouseholdName": "Hannah, Michael & Laura",
        "RiskTolerance": "Conservative",
        "LiquidNetWorth": "$1m - $3m",
        "RoleDesignation": "",
        "AccountObjective": "",
        "SecurityIndustry": "",
        "MilitaryOrPolitician": ""
      }
    }
  }
}
</EXAMPLE_OUTPUT_SUBSET>

<OUTPUT_REQUIREMENTS>
- Return ONLY the final JSON object described above.
- Do not wrap in <ANSWER> tags or any other text.
</OUTPUT_REQUIREMENTS>
`;