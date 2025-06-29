import { NonProfit } from "@/app/memory/objects";
import { cookies } from "next/headers";

type RequestBody = { email: string; template: string };

/**
 * @swagger
 * /api/email/preview:
 *   post:
 *     description: Previews a templated email to a given nonprofit. Will NOT send the email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
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
  const cookieValue = (await cookies()).get("nonprofits")?.value;
  let nonprofits = [];
  if (cookieValue) {
    nonprofits = JSON.parse(cookieValue);
  }
  const body = (await request.json()) as RequestBody;
  const nonprofit = nonprofits.find((n: NonProfit) => n.email === body.email);
  if (!nonprofit) {
    return Response.json({ error: "Email does not exist" }, { status: 400 });
  } else {
    // Returns what email will look like but does not send email
    const filledInTemplate = body.template
      .replace("{ name }", nonprofit.name)
      .replace("{ address }", nonprofit.address);
    return Response.json(
      { message: "Success!", email: filledInTemplate },
      { status: 200 }
    );
  }
}
