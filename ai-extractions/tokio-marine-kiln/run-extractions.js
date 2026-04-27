const id1 = '04aee576-70f2-44dd-b41b-c8965a61a3de'; // non-spreadsheet
const id2 = 'e49c5e31-cb4b-4971-bf51-28d38de3bae6'; // spreadsheet

const rawValue = FileUpload.value;

const files = Array.isArray(rawValue)
  ? await Promise.all(rawValue)
  : [await rawValue];

const noSpreadsheet = files.some((file) => {
  const name = file?.name?.toLowerCase() || '';
  const type = file?.type?.toLowerCase() || '';

  const isSpreadsheet =
    name.endsWith('.xls') ||
    name.endsWith('.xlsx') ||
    type.includes('spreadsheetml') ||
    type.includes('excel');

  return !isSpreadsheet;
});

if (noSpreadsheet) {
  const extractionIds = [id1, id2];

  await Promise.all(
    extractionIds.map((extractionId) =>
      feathery.runAIExtraction(extractionId, {
        waitForCompletion: true,
        variantId: undefined,
        pages: undefined
      })
    )
  );
} else {
  await feathery.runAIExtraction(id2, {
    waitForCompletion: true,
    variantId: undefined,
    pages: undefined
  });
}