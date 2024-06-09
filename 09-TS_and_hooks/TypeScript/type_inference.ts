import { z } from 'zod';
import express, { Express, Request, Response } from "express";

const app: Express = express();

// Define the schema for profile update
const userProfileSchema = z.object({
  name: z.string().min(1, { message: "Name cannot be empty" }),
  email: z.string().email({ message: "Invalid email format" }),
  age: z.number().min(18, { message: "You must be at least 18 years old" }).optional(),
});

// Define the type for the request body
type UpdateBody = z.infer<typeof userProfileSchema>;

app.put("/user", (req: Request<{}, {}, UpdateBody>, res: Response) => {
  const { success, data } = userProfileSchema.safeParse(req.body);

  if (!success) {
    res.status(411).json({});
    return;
  }

  const updateBody: UpdateBody = data; // Assigning type to updateBody

  // update database here
  res.json({
    message: "User updated"
  });
});

app.listen(3000);
