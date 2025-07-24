import { object, string, z } from "zod";

export const form1023ScheduleEPart1Schema = object({
  input1: z.enum(["Yes", "No"], {
    required_error: "Required",
  }),
  input2: z.enum(
    [
      "Section 4. You are seeking retroactive reinstatement under section 4 of Revenue Procedure 2014-11. By selecting this line, you attest that you meet the specified requirements of section 4, that your failure to file was not intentional, and that you have put in place procedures to file required returns or notices in the future. Do not complete the rest of Schedule E.",
      "Section 5. You are seeking retroactive reinstatement under section 5 of Revenue Procedure 2014-11. By selecting this line, you attest that you meet the specified requirements of section 5, that you have filed required annual returns, that your failure to file was not intentional, and that you have put in place procedures to file required returns or notices in the future.",
      "Section 6. You are seeking retroactive reinstatement under section 6 of Revenue Procedure 2014-11. By selecting this line, you attest that you meet the specified requirements of section 6, that you have filed required annual returns, that your failure to file was not intentional, and that you have put in place procedures to file required returns or notices in the future.",
      "Section 7. You are seeking reinstatement under section 7 of Revenue Procedure 2014-11, effective the date you are filling this application. Do not complete the rest of Schedule E.",
    ],
    {
      required_error: "Required",
    },
  ),
  input3: string({
    required_error: "Required",
    invalid_type_error: "Input must be a string",
  })
    .nonempty({
      message: "Required",
    })
    .max(1000, {
      message: "Input can be at most 1000 characters",
    })
    .trim(),
});

export const form1023ScheduleEStep2Schema = object({
  input1: z.enum(["Yes", "No"], {
    required_error: "Required",
  }),
  input2: string({
    required_error: "Required",
    invalid_type_error: "Input must be a string",
  })
    .nonempty({
      message: "Required",
    })
    .max(1000, {
      message: "Input can be at most 1000 characters",
    })
    .trim(),
});
