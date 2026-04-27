const id1 = '04aee576-70f2-44dd-b41b-c8965a61a3de'; // non-spreadsheet
const id2 = 'e49c5e31-cb4b-4971-bf51-28d38de3bae6'; // spreadsheet

const file = await FileUpload.value;
const extension = file?.name?.split('.').pop()?.toLowerCase();

if (['xls', 'xlsx'].includes(extension)) {
  await feathery.runAIExtraction(id2, {
    waitForCompletion: true,
    variantId: undefined,
    pages: undefined
  });
} else {
  await feathery.runAIExtraction(id1, {
    waitForCompletion: true,
    variantId: undefined,
    pages: undefined
  });
}