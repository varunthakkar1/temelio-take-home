import { EmailMockClient, NonProfit } from "@/app/memory/objects";
import { randomUUID } from "crypto";
import { cookies } from "next/headers";

type RequestBody = { emails: string[]; template: string };

/**
 * @swagger
 * /api/email/send:
 *   post:
 *     description: Send a templated email to a list of given nonprofits
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               emails:
 *                 type: array
 *                 items:
 *                   type: string
 *               template:
 *                 type: string
 *                 example: Sending money to nonprofit { name } at address { address }
 *                 description: Template for email. You can use the variables { name } and { address }
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Email does not exist
 */
export async function POST(request: Request) {
  // Retrieve nonprofit data from memory
  const cookieValue = (await cookies()).get("nonprofits")?.value;
  let nonprofits = [];
  if (cookieValue) {
    nonprofits = JSON.parse(cookieValue);
  }
  const body = (await request.json()) as RequestBody;
  const emailClient = new EmailMockClient();
  const emailsToSend = []

  // Send email for each nonprofit given
  for (const email of body.emails) {
    
    // Find nonprofit
    const nonprofit = nonprofits.find((n: NonProfit) => n.email === email);

    // Check if does not exist
    if (!nonprofit) {
      console.log("Nonprofit with email " + email + " could not be found.");
    } else {
      // replace template variables
      const text = body.template
        .replace("{ name }", nonprofit.name)
        .replace("{ address }", nonprofit.address);

      // "send" email
      console.log("Sending email with text " + text + " to " + email);
      const emailToSend = { text, to: email, id: randomUUID() }
      emailsToSend.push(emailToSend)
    }
  }
  await emailClient.sendEmails(emailsToSend);
  return Response.json({ message: "Success!" }, { status: 200 });
}
