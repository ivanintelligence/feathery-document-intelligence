// console.log('----- Document Extraction: Parse QA Answers -----');

const FIELD_CFG_LIST = [
  // Eligibility Language Q&A
  {
    title: 'Eligibility Language Q&A',
    Q: 'AP_LTDEligibilityLanguageQ',
    A: 'AP_LTDEligibilityLanguageA',
    store: 'AP_LTDEligibilityLanguageQA'
  },
  // Termination Provision Q&A
  {
    title: 'Termination Provision Q&A',
    Q: 'AP_LTDTerminationProvisionQ',
    A: 'AP_LTDTerminationProvisionA',
    store: 'AP_LTDTerminationProvisionQA'
  },
  // Definition of Partial Disability Q&A
  {
    title: 'Definition of Partial Disability Q&A',
    Q: 'AP_LTDPartialDisabilityDefinitionQ',
    A: 'AP_LTDPartialDisabilityDefinitionA',
    store: 'AP_LTDPartialDisabilityDefinitionQA'
  },
  // Definition of Disability Q&A
  {
    title: 'Definition of Disability Q&A',
    Q: 'AP_LTDDisabilityDefinitionQ',
    A: 'AP_LTDDisabilityDefinitionA',
    store: 'AP_LTDDisabilityDefinitionQA'
  },
  // Exclusion Limitation Q&A
  {
    title: 'Exclusion Limitation Q&A',
    Q: 'AP_LTDExclusionLimitationQ',
    A: 'AP_LTDExclusionLimitationA',
    store: 'AP_LTDExclusionLimitationQA'
  }
];

let msg = '';

FIELD_CFG_LIST.forEach((cfg) => {
  const questionList = feathery.fields[cfg.Q].value;
  const answerList = feathery.fields[cfg.A].value;
  const rawText = formatQuestionsAndAnswers(questionList, answerList);

  const formattedText = rawText.split('\n').join('\n\t');

  if (rawText) {
    feathery.fields[cfg.store].value = rawText;
    msg += `------- ${cfg.title} -------\n \t${formattedText}\n\n`;
  } else {
    feathery.fields[cfg.store].value = '';
    msg += `${cfg.title}\n -- NOT FOUND --\n\n`;
  }
});

feathery.fields['aggregate-data-qa'].value = msg;

// const extractionId = "e700d95e-c446-4b00-ab1a-ef5a775ccd58"
// const extractionId = "b0a28cd7-5025-4786-bb6e-f79c12226074" // revert
// const extractionId = "a7c66d9e-0bc4-4a93-9ba2-b332fe61d43b"

// // Javascript rule code
// await feathery.runAIExtraction(extractionId, {
//   waitForCompletion: true,
//   variantId: undefined,
//   pages: undefined
// })

// helper function
function formatQuestionsAndAnswers(questions, answers) {
  // Initialize an empty string to store the formatted output
  let result = '';
  if (questions == null) {
    return '';
  }

  // If questions or answers is a string, return the concatenated string
  if (typeof questions === 'string' || typeof answers === 'string') {
    return `${questions}: ${answers}`;
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