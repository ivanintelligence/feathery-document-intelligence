{
  "queries": [
    {
      "id": "3d08add6-424b-4bbf-933a-bc17ce87d39c",
      "type": "column_value",
      "details": "",
      "entities": [
        {
          "id": "cf68917f-1863-400f-89d7-ff609de1a7db",
          "entity": "<GROUND_RULES>\n- Use ONLY the information explicitly present in the provided CONTEXT blocks.\n- Output MUST be valid JSON only.\n- Never output \"N/A\"; use null.\n- Perform matching ONLY within the same Household ID (TARGET_HHID).\n- Do NOT invent missing fields.\n</GROUND_RULES>\n\n<TARGET_HHID>\n{{target_hhid}}\n</TARGET_HHID>\n\n<ACCOUNTS_HHID_CONTEXT>\n{{accounts_hhid}}\n</ACCOUNTS_HHID_CONTEXT>\n\n<CLIENTS_HHID_CONTEXT>\n{{clients_hhid}}\n</CLIENTS_HHID_CONTEXT>\n\n<MATCHING_RULES>\nFor each account row:\n1) Read Primary Account Holder and Secondary Account Holder (may be null).\n2) Match each holder to exactly one client row within CLIENTS_HHID_CONTEXT using this priority:\n   a) Exact match on \"First Name\" + \"Last Name\" (case-insensitive).\n   b) Normalized match:\n      - lowercase\n      - remove punctuation\n      - treat hyphens as spaces\n      - ignore middle name/initial\n      - collapse extra spaces\n   c) Common-short-name match (limited): Stan~Stanley, Mike~Michael, Tony~Anthony, Liz~Elizabeth.\n3) If multiple candidates tie, choose the one with:\n   - exact last name match, then\n   - matching Email (if available), then\n   - matching DOB (if available).\n4) If still ambiguous or no confident match, set that owner to null.\n5) If the account holder field is null/blank, output null for that owner.\n</MATCHING_RULES>\n\n<TASK>\nReturn a JSON object keyed by Account ID (Current Account Number as string).\nEach account must include:\n- registration_type (from Account Type)\n- primary (the FULL matched client row object or null)\n- secondary (the FULL matched client row object or null)\nAlso include these source fields for traceability:\n- primary_source_name (string from account row or null)\n- secondary_source_name (string from account row or null)\n</TASK>\n\n<OUTPUT_JSON_ONLY>\n{\n  \"18986024\": {\n    \"registration_type\": \"...\",\n    \"primary_source_name\": \"...\",\n    \"secondary_source_name\": null,\n    \"primary\": { ...full client row... } ,\n    \"secondary\": null\n  },\n  ...\n}\n</OUTPUT_JSON_ONLY>",
          "save_to": "accounts_with_owners",
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
        "group_name": "Account Owner Fuzzy Match",
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