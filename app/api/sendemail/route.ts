import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    // ✅ Read request body only once
    const body = await req.json();
    const { to, subject, html } = body;

    if (!to || !subject || !html) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check if SMTP configuration is properly set up
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;
    const smtpUser = process.env.SMTP_USER;
    const smtpPassword = process.env.SMTP_PASSWORD;

    if (!smtpHost || !smtpPort || !smtpUser || !smtpPassword ||
        smtpHost === 'localhost' || smtpUser.includes('test@') || smtpPassword.includes('test')) {
      // Development mode: Log email instead of sending
      console.log('=== DEVELOPMENT MODE - EMAIL LOGGED (not sent) ===');
      console.log('To:', to);
      console.log('Subject:', subject);
      console.log('Body:', html.replace(/<[^>]*>/g, ''));
      console.log('=== EMAIL LOGGED ===');

      return NextResponse.json({
        success: true,
        message: 'Email logged (development mode - not sent)',
        development: true
      });
    }

    const portNumber = Number(smtpPort);
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: portNumber,
      secure: portNumber === 465, // SSL for port 465
      auth: {
        user: smtpUser,
        pass: smtpPassword,
      },
    });

    await transporter.sendMail({
      from: `"Keys Fintech" <${smtpUser}>`,
      to,
      subject,
      html,
    });

    return NextResponse.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json({
      error: 'Failed to send email - check SMTP configuration',
      details: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.message : 'Unknown error') : undefined
    }, { status: 500 });
  }
}
