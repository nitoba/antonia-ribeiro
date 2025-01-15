import nodemailer from 'nodemailer'

export class EmailService {
  private transporter: nodemailer.Transporter

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587, // Use 587 para TLS ou 465 para SSL
      secure: false, // true para 465, false para outras portas
      auth: {
        user: import.meta.env.USER_EMAIL, // Seu e-mail Gmail
        pass: import.meta.env.EMAIL_PASSWORD, // Sua senha ou senha de aplicativo
      },
    })
  }

  public async sendMail(
    to: string,
    subject: string,
    html: string,
    text?: string,
  ): Promise<void> {
    const mailOptions: nodemailer.SendMailOptions = {
      from: `"Antonia Ribeiro - Psicóloga" <${import.meta.env.EMAIL_USER}>`, // Seu e-mail no campo "De"
      to, // Destinatário
      subject, // Assunto
      text, // Texto do e-mail (opcional)
      html, // Conteúdo em HTML
    }

    try {
      const info = await this.transporter.sendMail(mailOptions)
      console.log('E-mail enviado com sucesso:', info.messageId)
    } catch (error) {
      console.error('Erro ao enviar e-mail:', error)
      throw error
    }
  }
}
