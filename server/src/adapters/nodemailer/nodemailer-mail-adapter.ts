import nodemailer from "nodemailer";
import { MailAdapter, SendMailData } from "./../mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "c210204f5793b2",
    pass: "b7b51140299c58",
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ body, subject }: SendMailData) {
    await transport.sendMail({
      from: "Equipe Feedget <oi@feedget.com>",
      to: "José Ricardo <jrmp.dev@gmail.com>",
      subject: subject,
      html: body,
    });
  }
}
