DR_Lprompt5.value=`<GROUND_RULES>
Use ONLY explicit text in the provided context. No assumptions.
Use ONLY these flag values: Present or Not found.
If a topic is Present, include 1 verbatim supporting snippet.
If Not found, output Language: Null.
Do NOT rewrite the snippet; copy verbatim only.

TRUNCATION RULE:
- If the best supporting language is longer than ~25 words, truncate it and end with "..."
- If not truncated, do not add "..."

FIELD RULES:
- Pre-Existing Condition: also output Timeframe: <3/12, 3/6/12, etc. / Null> based ONLY on explicit numbers in the snippet/context.
- Mental Health / Substance Use Disorder: also output Limit: <# months / Null> if a months limitation is explicitly stated.
- Self-Reported Symptoms: also output Limit: <# months / Null> if a months limitation is explicitly stated.
</GROUND_RULES>

Exclusions & Limitations Q&A:
<CONTEXT>
${DR_LExclusionLimitationQA.value}
</CONTEXT>

<QUESTIONS>
Produce the Exclusions & Limitations checklist in the required format. <Answer>
</QUESTIONS>

<OUTPUT_FORMAT>
A) EXCLUSIONS & LIMITATIONS SECTION
- FLAG: <Present/Not found>
- LANGUAGE: "<snippet/Null>"

B) KEY EXCLUSIONS
1) PRE-EXISTING CONDITION
- FLAG: <Present/Not found>
- TIMEFRAME: <timeframe/Null>
- LANGUAGE: "<snippet/Null>"

2) MENTAL HEALTH / SUBSTANCE USE DISORDER
- FLAG: <Present/Not found>
- LIMIT: <# months/Null>
- LANGUAGE: "<snippet/Null>"

3) SELF-REPORTED SYMPTOMS
- FLAG: <Present/Not found>
- LIMIT: <# months/Null>
- LANGUAGE: "<snippet/Null>"

4) SELF-INFLICTED INJURY
- FLAG: <Present/Not found>
- LANGUAGE: "<snippet/Null>"

5) ON-THE-JOB / WORK-RELATED INJURY
- FLAG: <Present/Not found>
- LANGUAGE: "<snippet/Null>"
</OUTPUT_FORMAT>

<EXAMPLES>
A) EXCLUSIONS & LIMITATIONS SECTION
- FLAG: Present
- LANGUAGE: "EXCLUSIONS AND LIMITATIONS: Benefits will not be paid for..."

B) KEY EXCLUSIONS
1) PRE-EXISTING CONDITION
- FLAG: Present
- TIMEFRAME: 3/12
- LANGUAGE: "Pre-Existing Condition Limitation: ... 3 months ... 12 months..."

2) MENTAL HEALTH / SUBSTANCE USE DISORDER
- FLAG: Present
- LIMIT: 24 months
- LANGUAGE: "Mental Health/Substance Use Disorders: Benefits limited to 24 months..."

3) SELF-REPORTED SYMPTOMS
- FLAG: Not found
- LIMIT: Null
- LANGUAGE: Null

4) SELF-INFLICTED INJURY
- FLAG: Present
- LANGUAGE: "No benefits for intentionally self-inflicted injury..."

5) ON-THE-JOB / WORK-RELATED INJURY
- FLAG: Not found
- LANGUAGE: Null
</EXAMPLES>`