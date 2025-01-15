type PaymentRequestTemplate = {
  costumerName: string
  appointmentDate: string
  paymentLink: string
}

export function paymentRequestTemplateEmail({
  costumerName,
  paymentLink,
  appointmentDate,
}: PaymentRequestTemplate) {
  const formattedDate = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(appointmentDate))

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Confirmação de Pagamento</title>

    <!-- CSS -->
    <style>
      body {
        font-family: Arial, sans-serif;
        font-size: 16px;
        line-height: 1.5;
        margin: auto 0;
      }
    </style>
  </head>
  <body style="margin: 0 auto; padding: 0; height: 100vh">
    <div
      style="
        border-radius: 6px;
        border: 1px solid #cccccc;
        margin: 0 auto;
        max-width: 600px;
      "
    >
      <table
        align="center"
        border="0"
        cellpadding="0"
        cellspacing="0"
        width="600"
        style="border-collapse: collapse; border-radius: 8px; overflow: hidden"
      >
        <tr>
          <td>
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              width="600"
              style="border-collapse: collapse"
            >
              <!-- Header section -->
              <tr>
                <td
                  align="center"
                  style="
                    padding: 40px 0 30px 0;
                    background-color: #ffffff;
                    border-bottom: 1px solid #cccccc;
                  "
                >
                  <div
                    style="
                      width: 60px;
                      height: 60px;
                      background-color: #fff;
                      border-radius: 50%;
                      display: inline-block;
                      text-align: center;
                      position: relative;
                      border: 1px solid #cccccc;
                    "
                  >
                    <img
                      style="
                        width: 60%;
                        height: 60%;
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                      "
                      src="https://cdn-icons-png.flaticon.com/512/4827/4827568.png"
                      alt="Ícone de confirmação"
                    />
                  </div>
                  <h1
                    style="
                      font-family: Arial, sans-serif;
                      color: #111827;
                      margin: 20px 0;
                    "
                  >
                    ✨ Confirme sua Sessão e Reserve Este Momento para Você
                  </h1>
                </td>
              </tr>

              <!-- Content section -->
              <tr>
                <td style="padding: 40px 30px">
                  <table
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    width="100%"
                    style="border-collapse: collapse"
                  >
                    <tr>
                      <td
                        style="
                          font-family: Arial, sans-serif;
                          font-size: 16px;
                          line-height: 24px;
                          padding: 0 0 20px 0;
                        "
                      >
                        <p style="margin: 0">Olá <strong>${costumerName}!</strong> 👋</p>
                        <p style="margin: 15px 0">
                          Parabéns por priorizar seu bem-estar emocional. Para
                          garantir sua consulta com a psicóloga
                          <strong>Antonia Ribeiro</strong>, basta realizar o
                          pagamento clicando no botão abaixo. Estamos aqui para
                          te ajudar a viver com mais equilíbrio e clareza.
                        </p>
                      </td>
                    </tr>

                    <!-- Session Details -->
                    <tr>
                      <td
                        style="
                          padding: 20px 0;
                          border-top: 1px solid #eeeeee;
                          border-bottom: 1px solid #eeeeee;
                        "
                      >
                        <table
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                        >
                          <tr>
                            <td
                              style="
                                font-family: Arial, sans-serif;
                                font-size: 15px;
                                line-height: 22px;
                                color: #666666;
                                width: 120px;
                              "
                            >
                              <strong>Data e Horário:</strong>
                            </td>
                            <td
                              style="
                                font-family: Arial, sans-serif;
                                font-size: 15px;
                                line-height: 22px;
                              "
                            >
                              ${formattedDate}
                            </td>
                          </tr>
                          <tr>
                            <td
                              style="
                                font-family: Arial, sans-serif;
                                font-size: 15px;
                                line-height: 22px;
                                color: #666666;
                                padding-top: 10px;
                              "
                            >
                              <strong>Local:</strong>
                            </td>
                            <td
                              style="
                                font-family: Arial, sans-serif;
                                font-size: 15px;
                                line-height: 22px;
                                padding-top: 10px;
                              "
                            >
                              Google Meet (link será enviado após confirmação)
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>

                    <!-- Payment Button -->
                    <tr>
                      <td align="center" style="padding: 30px 0">
                        <table border="0" cellpadding="0" cellspacing="0">
                          <tr>
                            <td
                              align="center"
                              style="border-radius: 4px"
                              bgcolor="#111827"
                            >
                              <a
                                href="${paymentLink}"
                                target="_blank"
                                style="
                                  font-size: 16px;
                                  font-family: Arial, sans-serif;
                                  color: #ffffff;
                                  text-decoration: none;
                                  padding: 15px 30px;
                                  border-radius: 4px;
                                  display: inline-block;
                                  font-weight: bold;
                                "
                              >
                                Realizar Pagamento e Confirmar Consulta
                              </a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>

                    <tr>
                      <td
                        style="
                          font-family: Arial, sans-serif;
                          font-size: 14px;
                          line-height: 20px;
                          color: #666666;
                        "
                      >
                        <p style="margin: 0">
                          Assim que o pagamento for confirmado, você receberá
                          todos os detalhes da sua sessão no seu e-mail.
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Footer section -->
              <tr>
                <td style="padding: 30px; background-color: #f8f9fa">
                  <table
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    width="100%"
                    style="border-collapse: collapse"
                  >
                    <tr>
                      <td
                        style="
                          font-family: Arial, sans-serif;
                          font-size: 13px;
                          line-height: 20px;
                          color: #666666;
                          text-align: center;
                        "
                      >
                        <p style="margin: 0">
                          Caso precise de ajuda ou tenha dúvidas, é só responder
                          este e-mail ou entrar em contato pelo
                          <a
                            href="https://dub.sh/contato"
                            target="_blank"
                            rel="noopener noreferrer"
                            style="text-decoration: none; color: #111827"
                          >
                            <strong>WhatsApp</strong>.
                          </a>
                        </p>
                        <p style="margin: 5px 0">
                          Estamos ao seu lado em cada passo dessa jornada. 💙
                        </p>
                        <p style="margin: 5px 0">
                          © 2025 Antonia Ribeiro - Psicóloga | Bem-estar em
                          primeiro lugar.
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
  </body>
</html>
`
}
