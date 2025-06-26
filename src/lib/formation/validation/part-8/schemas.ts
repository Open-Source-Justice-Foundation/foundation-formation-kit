import { object, z } from "zod";

export const form1023Part8EffectiveDateStep1Schema = object({
  input: z.enum(["Yes", "No"], {
    required_error: "Required",
  }),
});
