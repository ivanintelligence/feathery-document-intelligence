console.log('----- Document Extraction: Parse QA Answers TMK -----');

const FIELD_CFG_LIST = [
  {
    title: 'Governance and Risk Management',
    Q: 'C_GovernanceRMQ',
    A: 'C_GovernanceRMA',
    store: 'C_GovernanceRM_QA'
  },
  {
    title: 'Asset and Data Management',
    Q: 'C_AssetDMQ',
    A: 'C_AssetDMA',
    store: 'C_AssetDM_QA'
  },
  {
    title: 'Identity and Access Management',
    Q: 'C_IdentityAMQ',
    A: 'C_IdentityAMA',
    store: 'C_IdentityAM_QA'
  },
  {
    title: 'Email Security',
    Q: 'C_EmailQ',
    A: 'C_EmailA',
    store: 'C_Email_QA'
  },
  {
    title: 'Network Security and Monitoring',
    Q: 'C_NetworkSecurityMQ',
    A: 'C_NetworkSecurityMA',
    store: 'C_NetworkSecurityM_QA'
  },
  {
    title: 'Endpoint and Device Security',
    Q: 'C_EndpointDSQ',
    A: 'C_EndpointDSA',
    store: 'C_EndpointDS_QA'
  },
  {
    title: 'Vulnerability and Threat Management',
    Q: 'C_VulnerabilityTMQ',
    A: 'C_VulnerabilityTMA',
    store: 'C_VulnerabilityTM_QA'
  },
  {
    title: 'Incident Response and Recovery',
    Q: 'C_IncidentRRQ',
    A: 'C_IncidentRRA',
    store: 'C_IncidentRR_QA'
  },
  {
    title: 'Third Party and Supply Chain Security',
    Q: 'C_ThirdPartySCSQ',
    A: 'C_ThirdPartySCSA',
    store: 'C_ThirdPartySCS_QA'
  },
  {
    title: 'Other Preventative and Technical Controls',
    Q: 'C_OtherPreventativeTCQ',
    A: 'C_OtherPreventativeTCA',
    store: 'C_OtherPreventativeTC_QA'
  },
  {
    title: 'Domain Administrators',
    Q: 'C_DAQ',
    A: 'C_DAA',
    store: 'C_DA_QA'
  },
  {
    title: 'Multi-factor Authentication',
    Q: 'C_MFAQ',
    A: 'C_MFAA',
    store: 'C_MFA_QA'
  },
  {
    title: 'Microsoft 365 Productivity and Tools',
    Q: 'C_M365Q',
    A: 'C_M365A',
    store: 'C_M365_QA'
  },
  {
    title: 'Security Awareness and Training',
    Q: 'C_SATQ',
    A: 'C_SATA',
    store: 'C_SAT_QA'
  },
  {
    title: 'Application Security',
    Q: 'C_ASQ',
    A: 'C_ASA',
    store: 'C_AS_QA'
  },
  {
    title: 'Loss History Information',
    Q: 'C_LHIQ',
    A: 'C_LHIA',
    store: 'C_LHI_QA'
  },
  {
    title: 'Audit Logs and Records',
    Q: 'C_AuditLRQ',
    A: 'C_AuditLRA',
    store: 'C_AuditLR_QA'
  },
  {
    title: 'Funds Transfer and Payment Authorization Controls',
    Q: 'C_FTPA_Q',
    A: 'C_FTPA_A',
    store: 'C_FTPA_QA'
  },
  {
    title: 'Data Protection',
    Q: 'C_DP_Q',
    A: 'C_DP_A',
    store: 'C_DP_QA'
  }
];

FIELD_CFG_LIST.forEach((cfg) => {
  console.log(cfg);
  const questionList = feathery.fields[cfg.Q].value;
  const answerList = feathery.fields[cfg.A].value;
  const rawText = formatQuestionsAndAnswers(questionList, answerList);

  console.log(rawText);

  // const formattedText = rawText.split('\n').join('\n\t');

  if (rawText) {
    feathery.fields[cfg.store].value = rawText;
  } else {
    feathery.fields[cfg.store].value = '';
  }
});

const personalData = C_NumberOfPrivateOrSensitiveInformation.value;
if (personalData && Array.isArray(personalData)) {
  C_PersonalData_QA.value = personalData.join('\n');
} else if (personalData && typeof personalData === 'string') {
  C_PersonalData_QA.value = personalData;
}

const regionOfOperations = C_RegionOfOperations.value;
if (regionOfOperations && Array.isArray(regionOfOperations)) {
  C_RegionOfOperations_A.value = regionOfOperations.join(', ');
} else if (regionOfOperations && typeof regionOfOperations === 'string') {
  C_RegionOfOperations_A.value = regionOfOperations;
}

// helper function
function formatQuestionsAndAnswers(questions, answers) {
  // Initialize an empty string to store the formatted output
  let result = '';
  if (questions == null) {
    return '';
  }

  // If questions or answers is a string, return the concatenated string
  if (typeof questions === 'string' || typeof answers === 'string') {
    return `Q1: ${questions}\r\nA: ${answers} \r\n\r\n`;
  }

  // Iterate through the questions and answers arrays
  for (let i = 0; i < questions.length; i++) {
    // Handle null values for questions and answers by converting them to empty strings
    let question = questions[i] !== null ? questions[i] : '';
    let answer = answers[i] !== null ? answers[i] : '';

    // Append the formatted question and answer to the result string
    //result += `Q${i + 1}: ${question}\nA: ${answer} \n\n`;
    result += `Q${i + 1}: ${question}\r\nA: ${answer} \r\n\r\n`;
  }

  // Return the formatted result string
  return result.trim(); // Trim to remove the last unnecessary newline
}