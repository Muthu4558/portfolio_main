// controllers/contactController.js
import ContactMessage from "../models/ContactMessage.js";
import axios from "axios";

const BREVO_API = "https://api.brevo.com/v3/smtp/email";

export const submitContact = async (req, res) => {
  try {
    const { name, email, subject = "", message } = req.body;

    // basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: "name, email and message are required" });
    }

    // Save to DB
    const saved = await ContactMessage.create({ name, email, subject, message });

    // Prepare Brevo email payload
    // We send the email to SENDER_EMAIL (your inbox) and set replyTo as the user's email
    const senderEmail = process.env.SENDER_EMAIL;
    if (!process.env.BREVO_API_KEY || !senderEmail) {
      // still return success for save (so messages aren't lost), but warn client
      return res.status(201).json({ saved, warning: "Email not sent: BREVO_API_KEY or SENDER_EMAIL not configured on server." });
    }

    const emailPayload = {
      sender: { email: senderEmail },
      to: [{ email: senderEmail }], // deliver to your inbox
      replyTo: { email }, // reply-to set to the user's email
      subject: subject || `New contact message from ${name}`,
      htmlContent: `
        <h3>New contact message</h3>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
        <hr />
        <p>${nl2br(escapeHtml(message))}</p>
        <hr />
        <p>— Sent from portfolio</p>
      `,
      textContent: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}\n\n— Sent from portfolio`,
    };

    // Send via Brevo
    await axios.post(BREVO_API, emailPayload, {
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.BREVO_API_KEY,
      },
      timeout: 10000,
    });

    return res.status(201).json({ saved, success: true });
  } catch (err) {
    console.error("submitContact error:", err?.response?.data || err.message || err);
    return res.status(500).json({ error: "Server error sending or saving message" });
  }
};

// small helpers
const escapeHtml = (unsafe) =>
  String(unsafe)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const nl2br = (str) => String(str).replace(/\n/g, "<br/>");
