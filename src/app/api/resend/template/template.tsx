import * as React from "react";

interface EmailTemplateProps {
  name: string;
  tickets: string;
  ticketCount: number;
  cardId: string;
  // El amount y currency no se estaban usando en el template original,
  // pero los dejo por si los necesitas en el futuro.
  amount: number;
  currency: string;
}

export default function TicketEmail({
  name,
  tickets,
  ticketCount,
  cardId,
  amount,
}: EmailTemplateProps) {
  const ticketNumbersArray = tickets ? tickets.split(", ") : [];
  const previewText = `¡Felicidades ${name}, ya estás participando en la rifa!`;
  const baseUrl = process.env.VERCEL_URL
    ? `https://juegacnnosotros.com`
    : "http://localhost:3000";

  return (
    <html lang="es">
      <head>
        {/* El preview es un texto corto que aparece en la bandeja de entrada después del asunto */}
        <div style={previewStyles}>{previewText}</div>
      </head>
      <body style={main}>
        <table
          align="center"
          width="100%"
          cellPadding="0"
          cellSpacing="0"
          role="presentation"
        >
          <tbody>
            <tr>
              <td>
                <table
                  style={container}
                  align="center"
                  width="580"
                  cellPadding="0"
                  cellSpacing="0"
                  role="presentation"
                >
                  <tbody>
                    <tr>
                      <td style={box}>
                        {/* Encabezado con Logo */}
                        <div style={{ textAlign: "center", padding: "20px 0" }}>
                          <img
                            src={`${baseUrl}/logo.png`}
                            width="120"
                            height="50"
                            alt="JuegaConNosotros"
                          />
                        </div>

                        {/* Título Principal */}
                        <h1 style={heading}>
                          ¡Felicidades, ya estás participando!
                        </h1>

                        {/* Imagen del Flyer */}
                        <img
                          src={`${baseUrl}/flyer.jpg`}
                          width="100%"
                          alt="Flyer de la Rifa"
                          style={{ borderRadius: "8px", display: "block" }}
                        />

                        {/* Sección de Información */}
                        <div style={infoSection}>
                          <p style={paragraph}>Hola {name},</p>
                          <p style={paragraph}>
                            Tu pago ha sido confirmado y tus boletos han sido
                            asignados. ¡Mucha suerte!
                          </p>
                          <p style={paragraph}>
                            <b>Nombre:</b> {name}
                            <br />
                            <b>Cédula:</b> {cardId}
                          </p>
                        </div>

                        {/* Sección de Boletos */}
                        <div style={ticketsSection}>
                          <h2 style={subheading}>Tus Boletos Comprados</h2>
                          <table
                            align="center"
                            cellPadding="0"
                            cellSpacing="0"
                            role="presentation"
                          >
                            <tbody>
                              <tr>
                                {ticketNumbersArray.map((ticketNumber) => (
                                  <td
                                    key={ticketNumber}
                                    style={{ padding: "4px" }}
                                  >
                                    <div style={ticketBadge}>
                                      {ticketNumber}
                                    </div>
                                  </td>
                                ))}
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        {/* Sección de Alerta */}
                        <div style={alertSection}>
                          <p style={alertText}>
                            Guarda este comprobante. Te contactaremos el día del
                            sorteo si eres uno de los afortunados.
                          </p>
                        </div>

                        {/* Pie de página */}
                        <p style={footer}>
                          Sorteo realizado por JuegacnNosotros.
                          <br />© 2025 SoftHard Tecnology. Todos los derechos
                          reservados.
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </body>
    </html>
  );
}

// --- Estilos en línea ---
// Estos son objetos de CSS-in-JS que se aplicarán directamente a las etiquetas.

const previewStyles = {
  display: "none",
  fontSize: "1px",
  color: "#333333",
  lineHeight: "1px",
  maxHeight: "0px",
  maxWidth: "0px",
  opacity: 0,
  overflow: "hidden",
};

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
  maxWidth: "580px",
};

const box = {
  padding: "48px",
};

const heading = {
  color: "#1a1a1a",
  fontSize: "28px",
  fontWeight: "bold",
  textAlign: "center" as const,
  margin: "30px 0 30px 0",
};

const subheading = {
  color: "#333",
  fontSize: "20px",
  fontWeight: "bold",
  textAlign: "center" as const,
  margin: "24px 0 16px 0",
};

const paragraph = {
  color: "#525f7f",
  fontSize: "16px",
  lineHeight: "24px",
};

const infoSection = {
  padding: "16px 0",
};

const ticketsSection = {
  textAlign: "center" as const,
};

const ticketBadge = {
  backgroundColor: "#e6f7ff",
  border: "1px solid #91d5ff",
  borderRadius: "8px",
  color: "#096dd9",
  padding: "8px 12px",
  fontSize: "18px",
  fontWeight: "bold",
  display: "inline-block",
};

const alertSection = {
  backgroundColor: "#fffbe6",
  border: "1px solid #ffe58f",
  borderRadius: "8px",
  padding: "1px 16px", // Padding vertical de 1px para que el <p> interno controle el espacio
  margin: "24px 0",
};

const alertText = {
  color: "#874d00",
  fontSize: "14px",
  lineHeight: "20px",
  margin: "16px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
  textAlign: "center" as const,
  marginTop: "20px",
};
