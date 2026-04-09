import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
const backendUrl = process.env.BACKEND_URL || "http://localhost:5000";

const buildToken = (user: {
  _id: unknown;
  email: string;
  name?: string;
  avatarUrl?: string;
}) =>
  jwt.sign(
    {
      id: user._id,
      email: user.email,
      name: user.name || "",
      avatarUrl: user.avatarUrl || "",
    },
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" }
  );

const getSafeUser = (user: {
  _id: unknown;
  email: string;
  name?: string;
  avatarUrl?: string;
}) => ({
  id: user._id,
  email: user.email,
  name: user.name || "",
  avatarUrl: user.avatarUrl || "",
});

const formatNameFromEmail = (email: string) =>
  email
    .split("@")[0]
    .split(/[._-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

const redirectWithSession = (res: Response, session: { token: string; user: any }) => {
  const params = new URLSearchParams({
    token: session.token,
    email: session.user.email || "",
    name: session.user.name || "",
    avatarUrl: session.user.avatarUrl || "",
  });

  res.redirect(`${frontendUrl}/auth/callback?${params.toString()}`);
};

const exchangeGoogleCode = async (code: string) => {
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID || "",
      client_secret: process.env.GOOGLE_CLIENT_SECRET || "",
      redirect_uri: `${backendUrl}/api/auth/google/callback`,
      grant_type: "authorization_code",
    }),
  });

  if (!response.ok) {
    throw new Error("Google token exchange failed");
  }

  return response.json();
};

const exchangeGithubCode = async (code: string) => {
  const response = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      code,
      client_id: process.env.GITHUB_CLIENT_ID || "",
      client_secret: process.env.GITHUB_CLIENT_SECRET || "",
      redirect_uri: `${backendUrl}/api/auth/github/callback`,
    }),
  });

  if (!response.ok) {
    throw new Error("GitHub token exchange failed");
  }

  return response.json();
};

const createOAuthUserSession = async ({
  email,
  name,
  provider,
  providerId,
  avatarUrl,
}: {
  email: string;
  name?: string;
  provider: "google" | "github";
  providerId?: string;
  avatarUrl?: string;
}) => {
  const normalizedEmail = email.toLowerCase();

  const user = await User.findOneAndUpdate(
    { email: normalizedEmail },
    {
      $set: {
        email: normalizedEmail,
        name: name || formatNameFromEmail(normalizedEmail),
        avatarUrl: avatarUrl || "",
        provider,
        providerId: providerId || "",
      },
    },
    { new: true, upsert: true }
  );

  const safeUser = getSafeUser(user);
  const token = buildToken(user);

  return { token, user: safeUser };
};

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: "Email and password required" });
      return;
    }

    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) {
      res.status(400).json({ error: "User already exists" });
      return;
    }

    const hashed = await bcrypt.hash(password, 10);

    await User.create({
      email: email.toLowerCase(),
      password: hashed,
      provider: "local",
      name: formatNameFromEmail(email),
    });

    res.status(201).json({ message: "User registered" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: "Email and password required" });
      return;
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user || !user.password) {
      res.status(400).json({ error: "Invalid credentials" });
      return;
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      res.status(400).json({ error: "Invalid credentials" });
      return;
    }

    const token = buildToken(user);

    res.json({
      token,
      user: getSafeUser(user),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const googleAuth = (_req: Request, res: Response) => {
  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    res.status(500).json({ error: "Google OAuth is not configured" });
    return;
  }

  const url = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  url.searchParams.set("client_id", process.env.GOOGLE_CLIENT_ID);
  url.searchParams.set("redirect_uri", `${backendUrl}/api/auth/google/callback`);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", "openid email profile");
  url.searchParams.set("access_type", "offline");
  url.searchParams.set("prompt", "consent");

  res.redirect(url.toString());
};

export const googleCallback = async (req: Request, res: Response) => {
  try {
    const code = req.query.code?.toString();

    if (!code) {
      res.redirect(`${frontendUrl}/login?error=google_auth_failed`);
      return;
    }

    const tokenData = await exchangeGoogleCode(code);

    const profileResponse = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
        },
      }
    );

    if (!profileResponse.ok) {
      throw new Error("Google profile fetch failed");
    }

    const profile = await profileResponse.json();

    const session = await createOAuthUserSession({
      email: profile.email,
      name: profile.name,
      provider: "google",
      providerId: profile.id,
      avatarUrl: profile.picture,
    });

    redirectWithSession(res, session);
  } catch (err) {
    console.error(err);
    res.redirect(`${frontendUrl}/login?error=google_auth_failed`);
  }
};

export const githubAuth = (_req: Request, res: Response) => {
  if (!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET) {
    res.status(500).json({ error: "GitHub OAuth is not configured" });
    return;
  }

  const url = new URL("https://github.com/login/oauth/authorize");
  url.searchParams.set("client_id", process.env.GITHUB_CLIENT_ID);
  url.searchParams.set("redirect_uri", `${backendUrl}/api/auth/github/callback`);
  url.searchParams.set("scope", "read:user user:email");

  res.redirect(url.toString());
};

export const githubCallback = async (req: Request, res: Response) => {
  try {
    const code = req.query.code?.toString();

    if (!code) {
      res.redirect(`${frontendUrl}/login?error=github_auth_failed`);
      return;
    }

    const tokenData = await exchangeGithubCode(code);

    const userResponse = await fetch("https://api.github.com/user", {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${tokenData.access_token}`,
        "User-Agent": "synapse-ai",
      },
    });

    if (!userResponse.ok) {
      throw new Error("GitHub profile fetch failed");
    }

    const githubUser = await userResponse.json();

    let email = githubUser.email as string | null;

    if (!email) {
      const emailResponse = await fetch("https://api.github.com/user/emails", {
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${tokenData.access_token}`,
          "User-Agent": "synapse-ai",
        },
      });

      if (!emailResponse.ok) {
        throw new Error("GitHub email fetch failed");
      }

      const emails = (await emailResponse.json()) as Array<{
        email: string;
        primary: boolean;
        verified: boolean;
      }>;

      email =
        emails.find((entry) => entry.primary && entry.verified)?.email ||
        emails.find((entry) => entry.verified)?.email ||
        emails[0]?.email ||
        null;
    }

    if (!email) {
      throw new Error("GitHub account email not available");
    }

    const session = await createOAuthUserSession({
      email,
      name: githubUser.name || githubUser.login,
      provider: "github",
      providerId: String(githubUser.id),
      avatarUrl: githubUser.avatar_url,
    });

    redirectWithSession(res, session);
  } catch (err) {
    console.error(err);
    res.redirect(`${frontendUrl}/login?error=github_auth_failed`);
  }
};
