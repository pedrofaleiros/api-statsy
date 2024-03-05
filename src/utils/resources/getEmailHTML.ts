export function getEmailHTML(name: string, code: string): string {
    return `
<!DOCTYPE html>
<html lang="en">
    <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Confirmação de Email</title>
    <style>
        body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 20px;
        background-color: #f4f4f4;
        color: #333;
        }
        .container {
        max-width: 600px;
        margin: auto;
        background: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
        color: #0066cc;
        font-size: 24px;
        }
        p {
        font-size: 16px;
        }
        .code {
        font-size: 20px;
        font-weight: bold;
        color: #0066cc;
        background-color: #eef9ff;
        padding: 10px;
        border: 1px dashed #0066cc;
        display: inline-block;
        margin-top: 20px;
        }
    </style>
    </head>
    <body>
    <div class="container">
        <h1>Confirmação de Email</h1>
        <p>Olá, ${name}</p>
        <p>
        Obrigado por se registrar. Por favor, use o código abaixo para confirmar
        seu endereço de e-mail.
        </p>
        <div class="code">${code}</div>
        <p>
        Este código é válido por 30 minutos. Não compartilhe este código com
        ninguém.
        </p>
        <p>Atenciosamente,</p>
        <p>Statsy</p>
    </div>
    </body>
</html>
`
}