const emailVerificationTemplate = {
  subject: "Verificación de email",

  html: `
    <h2> Verificación de email</h2>

    <p>Hola, <strong>{{userName}}</strong>.</p>

    <p>Para completar tu solicitud, por favor verifica tu dirección de email:</p>

    <p>
      <a href="{{verificationUrl}}" 
         style="display:inline-block; padding:12px 20px; background:#e54b3c; color:white; text-decoration:none; border-radius:6px;">
        Verificar email
      </a>
    </p>

    <p>O copia y pega este enlace en tu navegador:</p>

    <pre style="background:#f2f2f2; padding:12px; border-radius:6px;">
{{verificationUrl}}
    </pre>

    <p>
      Si no hiciste esta solicitud, por favor ignora este mensaje.
      ¿Tienes preguntas o necesitas ayuda? 
      <a href="{{supportLink}}">Envíanos un mensaje</a>.
    </p>

    <br/>

    <p>Atentamente,</p>
    <p><em>El equipo de Mentor Gym</em></p>
  `
};