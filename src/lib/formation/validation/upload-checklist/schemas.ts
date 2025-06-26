import { array, object, string } from "zod";

import { SELECT_UPLOAD_CHECKLIST_ITEM_REQUIRED_ERR_MSG } from "../../constants/upload-checklist/constants";

export const form1023UploadChecklistSchema = object({
  selectUploadChecklistItem: array(string()).refine(
    (value) => value.some((item) => item),
    {
      message: SELECT_UPLOAD_CHECKLIST_ITEM_REQUIRED_ERR_MSG,
    },
  ),
});
