// ----- # run extractions in parallel

const extractionIds = [
  '04aee576-70f2-44dd-b41b-c8965a61a3de', // (2a) Cyber Documents
  'e49c5e31-cb4b-4971-bf51-28d38de3bae6' // (2b) Spreadsheet: Cyber Documents
];

// start all extractions
await Promise.all(
  extractionIds.map((extractionId) =>
    feathery.runAIExtraction(extractionId, {
      waitForCompletion: true,
      variantId: undefined,
      pages: undefined
    })
  )
);