import * as functions from 'firebase-functions';
import fetch from "node-fetch";
import { Request, Response } from "express";

interface RecaptchaResponse {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  "error-codes"?: string[];
}

exports.verifyRecaptcha = functions.https.onRequest(async (req: Request, res: Response): Promise<void> => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  const { captchaToken } = req.body;
  const secretKey: string = functions.config().recaptcha.secret_key; // Store in Firebase config

  if (!captchaToken) {
    res.status(400).json({ success: false, error: "Captcha token missing" });
    return;
  }

  const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captchaToken}`;

  try {
    const response = await fetch(verificationURL, { method: "POST" });
    const data = (await response.json()) as RecaptchaResponse;

    if (!data.success) {
      res.status(400).json({ success: false, error: "Invalid captcha" });
      return;
    }

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: "Verification failed" });
  }
});
