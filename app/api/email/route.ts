import { EmailMockClient } from "@/app/memory/objects";

/**
 * @swagger
 * /api/email:
 *   get:
 *     description: Retrieves all emails sent to nonprofits
 *     responses:
 *       200:
 *         description: Success
 */
export async function GET() {
  const emailClient = new EmailMockClient();
  const emails = await emailClient.retrieveAll();
  return Response.json({ message: "Success!", emails }, { status: 200 });
}
