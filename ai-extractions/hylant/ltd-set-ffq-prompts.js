AP_LTDprompt5.value=`<GROUND_RULES>
Use ONLY explicit text in the provided context. No assumptions.
Use ONLY these status values: Present or Not found.
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
${AP_LTDExclusionLimitationQA.value}
</CONTEXT>

<QUESTIONS>
Produce the Exclusions & Limitations checklist in the required format. <Answer>
</QUESTIONS>

<OUTPUT_FORMAT>
Exclusions & Limitations Section: <Present/Not found>
Language: "<snippet/Null>"

Pre-Existing Condition: <Present/Not found>
Timeframe: <timeframe/Null>
Language: "<snippet/Null>"

Mental Health / Substance Use Disorder: <Present/Not found>
Limit: <# months/Null>
Language: "<snippet/Null>"

Self-Reported Symptoms: <Present/Not found>
Limit: <# months/Null>
Language: "<snippet/Null>"

Self-Inflicted Injury: <Present/Not found>
Language: "<snippet/Null>"

On-the-Job / Work-Related Injury: <Present/Not found>
Language: "<snippet/Null>"
</OUTPUT_FORMAT>

<EXAMPLES>
Exclusions & Limitations Section: Present
Language: "EXCLUSIONS AND LIMITATIONS: Benefits will not be paid for..."

Pre-Existing Condition: Present
Timeframe: 3/12
Language: "Pre-Existing Condition Limitation: ... 3 months ... 12 months..."

Mental Health / Substance Use Disorder: Present
Limit: 24 months
Language: "Mental Health/Substance Use Disorders: Benefits limited to 24 months..."

Self-Reported Symptoms: Not found
Limit: Null
Language: Null

Self-Inflicted Injury: Present
Language: "No benefits for intentionally self-inflicted injury..."

On-the-Job / Work-Related Injury: Not found
Language: Null
</EXAMPLES>`