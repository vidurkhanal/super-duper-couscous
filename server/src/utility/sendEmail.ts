import MailJet from "node-mailjet";
import { MAILJET_API_KEY, MAILJET_SECRET_KEY } from "../constants";

export async function sendEmail(
  emailToSendTo: string,
  emailTitle: string,
  emailContent: string
) {
  const mailjet = MailJet.apiConnect(MAILJET_API_KEY!, MAILJET_SECRET_KEY!);

  try {
    await mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: "no-reply@kpass12.ninja",
            Name: "KPass Team",
          },
          To: [
            {
              Email: emailToSendTo,
              Name: "Beloved Customer",
            },
          ],
          Subject: emailTitle,
          HTMLPart: emailContent,
        },
      ],
    });
  } catch (err) {
    console.log(err);
  }
}
