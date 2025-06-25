import { cookies } from "next/headers";

export type NonProfit = {
  email: string;
  name: string;
  address: string;
};

export type SentEmail = {
  id: string
  text: string,
  to: string
}

export class EmailMockClient {

  constructor() {}

  sendEmail = async (sentEmail: SentEmail) => {
    // update memory with new email
    let emails: Array<SentEmail> = []
    const cookieValue = (await cookies()).get('emails')?.value
    if (cookieValue) {
      emails = JSON.parse(cookieValue)
    }
    emails.push(sentEmail)
    const cookieStore = await cookies()
    cookieStore.set('emails', JSON.stringify(emails))
    return
  }

  retrieveAll = async () => {
    let emails = []
    const cookieStore = await cookies()
    const cookieValue = cookieStore.get('emails')?.value
    if (cookieValue) {
      emails = JSON.parse(cookieValue)
    }
    return emails
  }
}