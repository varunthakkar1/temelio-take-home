import { NonProfit } from "@/app/memory/objects";
import { cookies } from "next/headers";

/**
 * @swagger
 * /api/nonprofit/add:
 *   post:
 *     description: Adds a nonprofit to memory
 *     requestBody:
 *       required: true
 *       content:
 *         application/json: 
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               name:
 *                 type: string
 *               address:
 *                 type: string 
 *     responses:
 *       200:
 *         description: Nonprofit was added successfully
 *       400:
 *         description: Email already in use
 */
export async function POST(request: Request) {
  console.log("Adding nonprofit");

  // Retrieve current nonprofits from storage
  const cookieValue = (await cookies()).get('nonprofits')?.value
  let nonprofits = []
  if (cookieValue) {
    nonprofits = JSON.parse(cookieValue)
  }
  const newNonProfit = await request.json() as NonProfit;

  // Add new nonprofit
  const emailExists = nonprofits?.find((n: NonProfit) => n.email === newNonProfit.email);
  if (emailExists) {
    return Response.json({ error: "Email already in use" }, { status: 400 });
  } else {
    nonprofits.push(newNonProfit);

    // Save to local memory
    (await cookies()).set('nonprofits', JSON.stringify(nonprofits))
    return Response.json({ message: "Success!", email: newNonProfit.email }, { status: 200 });
  }
}
