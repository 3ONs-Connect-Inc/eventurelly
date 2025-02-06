import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Recaptcha Verification Endpoint
app.post("/api/verify-recaptcha", async (req, res) => {
  const { captchaToken } = req.body;
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!captchaToken) {
    return res.status(400).json({ success: false, message: "Missing captcha token" });
  }

  const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captchaToken}`;

  try {
    const response = await fetch(verificationURL, { method: "POST" });
    const data = await response.json();

    if (!data.success) {
      return res.status(400).json({ success: false, message: "Captcha verification failed" });
    }

    res.json({ success: true, message: "Captcha verified successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error verifying captcha" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});