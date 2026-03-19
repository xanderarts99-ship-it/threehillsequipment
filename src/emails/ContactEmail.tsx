import * as React from "react";
import { ContactFormData } from "@/lib/contact.schema";

interface ContactEmailProps {
  data: ContactFormData;
}

export function ContactEmail({ data }: ContactEmailProps) {
  const goldColor = "#C5A02F";
  const darkBg = "#111111";
  const cardBg = "#1a1a1a";
  const mutedText = "#888888";

  const Field = ({
    label,
    value,
  }: {
    label: string;
    value: string | number;
  }) => (
    <tr>
      <td
        style={{
          padding: "12px 16px",
          borderBottom: "1px solid #2a2a2a",
          color: mutedText,
          fontSize: "12px",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          whiteSpace: "nowrap",
          width: "180px",
          verticalAlign: "top",
        }}
      >
        {label}
      </td>
      <td
        style={{
          padding: "12px 16px",
          borderBottom: "1px solid #2a2a2a",
          color: "#ffffff",
          fontSize: "14px",
          verticalAlign: "top",
        }}
      >
        {value}
      </td>
    </tr>
  );

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>New Machine Enquiry – Three Hills Equipment</title>
      </head>
      <body
        style={{
          backgroundColor: darkBg,
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
          margin: 0,
          padding: "40px 16px",
        }}
      >
        {/* Container */}
        <table
          width="100%"
          cellPadding={0}
          cellSpacing={0}
          style={{ maxWidth: "600px", margin: "0 auto" }}
        >
          <tbody>
            {/* Header */}
            <tr>
              <td
                style={{
                  backgroundColor: cardBg,
                  borderTop: `4px solid ${goldColor}`,
                  padding: "32px",
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    color: goldColor,
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    margin: "0 0 8px",
                  }}
                >
                  New Inquiry Received
                </p>
                <h1
                  style={{
                    color: "#ffffff",
                    fontSize: "26px",
                    fontWeight: 900,
                    letterSpacing: "-0.03em",
                    margin: 0,
                  }}
                >
                  THREE{" "}
                  <span style={{ color: goldColor }}>HILLS</span>
                </h1>
                <p
                  style={{
                    color: mutedText,
                    fontSize: "12px",
                    margin: "8px 0 0",
                  }}
                >
                  Equipment Enquiry
                </p>
              </td>
            </tr>

            {/* Body */}
            <tr>
              <td style={{ padding: "24px 0" }}>
                <p
                  style={{
                    color: "#ffffff",
                    fontSize: "14px",
                    margin: "0 0 20px",
                    lineHeight: 1.6,
                  }}
                >
                  A new machine enquiry has been submitted through the Three
                  Hills Equipment website. Here are the details:
                </p>

                {/* Details Table */}
                <table
                  width="100%"
                  cellPadding={0}
                  cellSpacing={0}
                  style={{
                    backgroundColor: cardBg,
                    borderRadius: "4px",
                    border: "1px solid #2a2a2a",
                    overflow: "hidden",
                  }}
                >
                  <tbody>
                    <Field label="Machine Type" value={data.machineType} />
                    <Field label="Number of Units" value={data.numberOfUnits} />
                    <Field label="Make / Brand" value={data.make} />
                    <Field label="Condition" value={data.condition} />
                    <Field label="Location" value={data.location} />
                    <Field label="Price Range" value={data.priceRange} />
                  </tbody>
                </table>

                {/* Description */}
                <table
                  width="100%"
                  cellPadding={0}
                  cellSpacing={0}
                  style={{
                    backgroundColor: cardBg,
                    borderRadius: "4px",
                    border: "1px solid #2a2a2a",
                    marginTop: "16px",
                    overflow: "hidden",
                  }}
                >
                  <tbody>
                    <tr>
                      <td
                        style={{
                          padding: "12px 16px",
                          borderBottom: "1px solid #2a2a2a",
                          color: mutedText,
                          fontSize: "12px",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                        }}
                      >
                        Detailed Description
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "16px",
                          color: "#ffffff",
                          fontSize: "14px",
                          lineHeight: 1.7,
                          whiteSpace: "pre-wrap",
                        }}
                      >
                        {data.description}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>

            {/* CTA */}
            <tr>
              <td
                style={{
                  textAlign: "center",
                  paddingBottom: "32px",
                }}
              >
                <p style={{ color: mutedText, fontSize: "12px", margin: 0 }}>
                  Reply to this email or use the reply-to address to respond
                  directly to the enquiry.
                </p>
              </td>
            </tr>

            {/* Footer */}
            <tr>
              <td
                style={{
                  borderTop: "1px solid #2a2a2a",
                  paddingTop: "24px",
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    color: "#333333",
                    fontSize: "11px",
                    margin: 0,
                  }}
                >
                  © {new Date().getFullYear()} Three Hills Equipment · Lagos,
                  Nigeria
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </body>
    </html>
  );
}
