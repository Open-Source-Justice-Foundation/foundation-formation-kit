import { array, object, string } from "zod";

import { UPLOAD_CHECKLIST_ITEMS_REQUIRED_ERR_MSG } from "../../constants/upload-checklist/constants";

export const form1023UploadChecklistSchema = object({
  uploadChecklistItems: array(string()).refine(
    (value) => value.some((item) => item),
    {
      message: UPLOAD_CHECKLIST_ITEMS_REQUIRED_ERR_MSG,
    },
  ),
});
