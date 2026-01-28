fuzzy_match_prompt.value = `
<GROUND_RULES>
- Use ONLY the information explicitly present in the provided CONTEXT blocks.
- Output MUST be valid JSON only (no markdown, no commentary).
- Never output "N/A" or placeholders; use null.
- Perform matching ONLY within the same Household ID (TARGET_HHID). Never match across households.
- Do NOT invent missing fields. Do NOT "edit" values.
- CRITICAL: If a match is found, you MUST output the matched client row EXACTLY as it appears in CLIENTS_HHID_CONTEXT (including Last Name, hyphenation, capitalization, and all fields). Do NOT replace the client row's name with the source name from the accounts sheet.
</GROUND_RULES>

<TARGET_HHID>
${JSON.stringify(target_hhid.value)}
</TARGET_HHID>

<ACCOUNTS_HHID_CONTEXT>
${JSON.stringify(accounts_hhid.value)}
</ACCOUNTS_HHID_CONTEXT>

<CLIENTS_HHID_CONTEXT>
${JSON.stringify(clients_hhid.value)}
</CLIENTS_HHID_CONTEXT>

<NORMALIZATION_GUIDE>
Use normalization ONLY to compare strings for matching. Never output normalized strings.
Normalize a name string by:
- lowercasing
- trimming leading/trailing spaces
- collapsing multiple spaces to one
- removing punctuation (.,'")
- converting hyphens to spaces (so "Miller-Hannah" -> "miller hannah")
- removing middle name/initial tokens if present (single-letter tokens or common middle names)
</NORMALIZATION_GUIDE>

<MATCHING_OBJECTIVE>
For each account row, resolve the Primary Account Holder and Secondary Account Holder names to the correct client row(s) within the same HHID.
If the holder name differs from the matched client row name (e.g., "Laura Hannah" vs "Laura Miller-Hannah"), you MUST use the client row name (canonical) in the output by returning the client row exactly.
</MATCHING_OBJECTIVE>

<MATCHING_RULES>
For each holder (Primary/Secondary) in an account row:

Step 0 — Candidate Pool (HHID gate)
- Candidates are ONLY client rows where "Household ID" == TARGET_HHID.

Step 1 — Exact Match (strongest)
- Match if BOTH:
  - normalized(holder_first) == normalized(client.First Name)
  - normalized(holder_last)  == normalized(client.Last Name)
If a match is found, select it immediately.

Step 2 — Full-name containment match (handles hyphenated/compound last names)
- Build:
  - holder_full_norm = normalize(full holder name string)
  - client_full_norm = normalize(client.First Name + " " + client.Last Name)
- Match if:
  - client first name matches exactly (normalized), AND
  - (client_full_norm contains holder_full_norm) OR (holder_full_norm contains client first name and at least one token from client last name)
This step is intended to match cases like:
  - "Laura Hannah" -> "Laura Miller-Hannah"
  - "Michael Hannah" -> "Michael Dean Hannah" (middle ignored)
If multiple matches, go to tie-breakers.

Step 3 — Initial / Middle-name tolerant match
- Match if:
  - normalized(holder_first) == normalized(client.First Name), AND
  - normalized(holder_last) matches ANY token within normalized(client.Last Name)
  (Example: holder_last "Hannah" matches token in "Miller Hannah")
If multiple matches, go to tie-breakers.

Step 4 — Nickname match (limited, only if needed)
- Allowed nickname pairs:
  Stan~Stanley, Mike~Michael, Tony~Anthony, Liz~Elizabeth
- Apply nickname mapping ONLY to the first name for comparison.

Tie-breakers (in order, stop at first that resolves)
1) Prefer the match where the LAST NAME match strength is highest:
   - exact normalized last name match > token match within compound last name > partial overlap
2) Prefer match where Email equals (case-insensitive) IF the holder name appears in the Email local-part (before "@") or context suggests it belongs to that person.
3) Prefer match where DOB matches if available.
4) If still tied/ambiguous, return null for that holder (do NOT guess).
</MATCHING_RULES>

<TASK>
Return a JSON object keyed by Account ID (Current Account Number as a string).
For each account key, output:
- registration_type: EXACT string from the account row's "Account Type" (do not lowercase or reformat)
- primary_source_name: EXACT string from the account row's "Primary Account Holder" (or null)
- secondary_source_name: EXACT string from the account row's "Secondary Account Holder" (or null)
- primary: the FULL matched client row object EXACTLY as written in CLIENTS_HHID_CONTEXT, or null
- secondary: the FULL matched client row object EXACTLY as written in CLIENTS_HHID_CONTEXT, or null

Important:
- The client row object MUST be copied verbatim (values and formatting) from CLIENTS_HHID_CONTEXT.
- Do not alter Last Name (e.g., do not change "Miller-Hannah" to "Hannah").
- If a field is blank in the client context, output null.
</TASK>

<OUTPUT_JSON_ONLY>
{
  "<AccountId>": {
    "registration_type": "<Account Type>",
    "primary_source_name": "<Primary Account Holder>",
    "secondary_source_name": "<Secondary Account Holder or null>",
    "primary": { ...FULL client row... } ,
    "secondary": { ...FULL client row... } 
  }
}
</OUTPUT_JSON_ONLY>
`;