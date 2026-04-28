const id1 = '04aee576-70f2-44dd-b41b-c8965a61a3de'; // non-spreadsheet
const id2 = 'e49c5e31-cb4b-4971-bf51-28d38de3bae6'; // spreadsheet

const value = String(fileType.value || '').toLowerCase();

const hasSpreadsheet =
  value.includes('xls') ||
  value.includes('xlsx') ||
  value.includes('xlsm') ||
  value.includes('csv') ||
  value.includes('spreadsheet') ||
  value.includes('excel');

const extractionIds = hasSpreadsheet ? [id2] : [id1, id2];

await Promise.all(
  extractionIds.map((extractionId) =>
    feathery.runAIExtraction(extractionId, {
      waitForCompletion: true,
      variantId: undefined,
      pages: undefined
    })
  )
);