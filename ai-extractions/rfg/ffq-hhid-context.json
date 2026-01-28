{
  "queries": [
    {
      "id": "68bbb90a-a923-41e3-9419-ac661b1ab92b",
      "type": "column_value",
      "details": "",
      "entities": [
        {
          "id": "4c41a8fb-5db0-42ee-840e-900a3ca1845f",
          "entity": "<GROUND_RULES>\n- Use ONLY the information explicitly present in the provided CONTEXT.\n- Output MUST be valid JSON only (no markdown, no commentary).\n- If the HHID row cannot be found, output null.\n- Never output \"N/A\" or placeholders; use null.\n</GROUND_RULES>\n\n<TARGET_HHID>\n{{target_hhid}}\n</TARGET_HHID>\n\n<SUITABILITY_CONTEXT>\n{{suitability}}\n</SUITABILITY_CONTEXT>\n\n<TASK>\nFind the single suitability row where \"Household ID\" exactly equals TARGET_HHID.\nReturn that row as a JSON object with exactly these keys:\n- Household ID\n- Household Name\n- Annual Income\n- Annual Expenses\n- Net Worth\n- Liquid Net Worth\n- Tax Rate\n- Risk Tolerance\n- Time Horizon\n\nIf a value is blank in the context, output null for that field.\nIf multiple rows match (unexpected), return the one that best matches Household Name; if still ambiguous, return null.\n</TASK>\n\n<OUTPUT_JSON_ONLY>\nEither:\n- null\nOR\n- { \"Household ID\": \"...\", \"Household Name\": \"...\", ... }\n</OUTPUT_JSON_ONLY>",
          "save_to": "suitability_hhid",
          "type": "",
          "unique": false,
          "options": [],
          "criteria": "",
          "examples": [],
          "required": false,
          "default_option": "",
          "select_multiple": false
        }
      ],
      "multi_file_name_field": null,
      "run_email_mode": "document_only",
      "toggle_page_question": false,
      "properties": {
        "limit_relevant_pages": null,
        "single_occurrence": false,
        "skip_ai_page_filter": false,
        "page_filter_start": null,
        "page_filter_end": null,
        "group_name": "HHID Suitability",
        "page_filter_query": null,
        "enable_tool_usage": false,
        "tools": {
          "date": false,
          "math": false
        },
        "table_filter": null,
        "sheet_filter": null,
        "page_limit": null,
        "multiple_occurrences": true
      },
      "data_validation_rules": []
    },
    {
      "id": "241ad9e8-2a2b-4902-a826-d095ce44c15b",
      "type": "column_value",
      "details": "",
      "entities": [
        {
          "id": "d5f929e6-4c5e-4c33-9896-235610361271",
          "entity": "<GROUND_RULES>\n- Use ONLY the information explicitly present in the provided CONTEXT.\n- Output MUST be valid JSON only.\n- Never output \"N/A\"; use null.\n- Return an array (possibly empty).\n</GROUND_RULES>\n\n<TARGET_HHID>\n{{target_hhid}}\n</TARGET_HHID>\n\n<CLIENT_CONTEXT>\n{{households}}\n</CLIENT_CONTEXT>\n\n<TASK>\nExtract all client rows where \"Household ID\" exactly equals TARGET_HHID.\nReturn a JSON array of objects.\nEach object must include ALL columns as keys exactly as written:\n- Household ID\n- Household Name\n- Primary/Secondary Contact\n- First Name\n- Middle Name/Initial\n- Last Name\n- Email\n- Mobile Phone\n- Home Phone\n- Gender\n- Date Of Birth\n- SSN\n- Marital Status\n- Home-Street Address\n- Home-City\n- Home-State\n- Home-Zip Code\n- Employment Status\n- Employer Name\n- Job Title\n- Number of Dependents\n- Mailing Address if applicable\n- Mailing City\n- Mailing State\n- Mailing Zip\n- Annual Review list\n- License#\n- Issued\n- Expires\n- Issued State\n\nBlank values must be null.\n</TASK>\n\n<OUTPUT_JSON_ONLY>\n[\n  { ...client row... },\n  ...\n]\n</OUTPUT_JSON_ONLY>",
          "save_to": "clients_hhid",
          "type": "",
          "unique": false,
          "options": [],
          "criteria": "",
          "examples": [],
          "required": false,
          "default_option": "",
          "select_multiple": false
        }
      ],
      "multi_file_name_field": null,
      "run_email_mode": "document_only",
      "toggle_page_question": false,
      "properties": {
        "limit_relevant_pages": null,
        "single_occurrence": false,
        "skip_ai_page_filter": false,
        "page_filter_start": null,
        "page_filter_end": null,
        "group_name": "HHID Clients",
        "page_filter_query": null,
        "enable_tool_usage": false,
        "tools": {
          "web": false,
          "date": false,
          "math": false
        },
        "table_filter": null,
        "sheet_filter": null,
        "page_limit": null,
        "multiple_occurrences": true
      },
      "data_validation_rules": []
    },
    {
      "id": "9a8e4a66-6faf-405a-9231-4d3b047a1aad",
      "type": "column_value",
      "details": "",
      "entities": [
        {
          "id": "b000fba3-d7e1-457c-8a4b-ccbd9ad5c9a8",
          "entity": "<GROUND_RULES>\n- Use ONLY the information explicitly present in the provided CONTEXT.\n- Output MUST be valid JSON only.\n- Never output \"N/A\"; use null.\n- Return an array (possibly empty).\n</GROUND_RULES>\n\n<TARGET_HHID>\n{{target_hhid}}\n</TARGET_HHID>\n\n<ACCOUNTS_CONTEXT>\n{{accounts}}\n</ACCOUNTS_CONTEXT>\n\n<TASK>\nExtract all account rows where \"Household ID\" exactly equals TARGET_HHID.\nReturn a JSON array of objects.\nEach object must include, at minimum, these keys (exact spelling):\n- Household ID\n- Household Name\n- Primary Account Holder\n- Secondary Account Holder\n- Current Account Number\n- Account Type\n\nYou MAY include other columns if present, but the above are required.\nBlank values must be null.\n</TASK>\n\n<OUTPUT_JSON_ONLY>\n[\n  { ...account row... },\n  ...\n]\n</OUTPUT_JSON_ONLY>",
          "save_to": "accounts_hhid",
          "type": "",
          "unique": false,
          "options": [],
          "criteria": "",
          "examples": [],
          "required": false,
          "default_option": "",
          "select_multiple": false
        }
      ],
      "multi_file_name_field": null,
      "run_email_mode": "document_only",
      "toggle_page_question": false,
      "properties": {
        "limit_relevant_pages": null,
        "single_occurrence": false,
        "skip_ai_page_filter": false,
        "page_filter_start": null,
        "page_filter_end": null,
        "group_name": "HHID Accounts",
        "page_filter_query": null,
        "enable_tool_usage": false,
        "tools": {
          "date": false,
          "math": false
        },
        "table_filter": null,
        "sheet_filter": null,
        "page_limit": null,
        "multiple_occurrences": true
      },
      "data_validation_rules": []
    },
    {
      "id": "cee2464e-c2c1-48e6-9f1c-3f537c31f52a",
      "type": "column_value",
      "details": "",
      "entities": [
        {
          "id": "5e1c4ca8-0a9d-460f-b57c-6072bc86f92b",
          "entity": "<GROUND_RULES>\n- Use ONLY the information explicitly present in the provided CONTEXT.\n- Output MUST be valid JSON only.\n- Never output \"N/A\"; use null.\n- Return an array (possibly empty).\n</GROUND_RULES>\n\n<TARGET_HHID>\n{{target_hhid}}\n</TARGET_HHID>\n\n<BENEFICIARY_CONTEXT>\n{{beneficiaries}}\n</BENEFICIARY_CONTEXT>\n\n<TASK>\nExtract all beneficiary rows where \"Household ID\" exactly equals TARGET_HHID.\nReturn a JSON array of objects including ALL columns as keys exactly as written:\n- Household ID\n- Household Name\n- Account Title\n- Account Number\n- Match?\n- Name\n- Relationship\n- Primary/Contingent\n- Gender\n- DOB\n- SSN\n- Address\n- Phone\n- %\n\nBlank values must be null.\n</TASK>\n\n<OUTPUT_JSON_ONLY>\n[\n  { ...beneficiary row... },\n  ...\n]\n</OUTPUT_JSON_ONLY>",
          "save_to": "beneficiaries_hhid",
          "type": "",
          "unique": false,
          "options": [],
          "criteria": "",
          "examples": [],
          "required": false,
          "default_option": "",
          "select_multiple": false
        }
      ],
      "multi_file_name_field": null,
      "run_email_mode": "document_only",
      "toggle_page_question": false,
      "properties": {
        "limit_relevant_pages": null,
        "single_occurrence": false,
        "skip_ai_page_filter": false,
        "page_filter_start": null,
        "page_filter_end": null,
        "group_name": "HHID Beneficiaries",
        "page_filter_query": null,
        "enable_tool_usage": false,
        "tools": {
          "web": false,
          "date": false,
          "math": false
        },
        "table_filter": null,
        "sheet_filter": null,
        "page_limit": null,
        "multiple_occurrences": true
      },
      "data_validation_rules": []
    }
  ],
  "variants": []
}