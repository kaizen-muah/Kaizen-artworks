import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { contactSchema } from '@/lib/validations';

export const dynamic = 'force-dynamic';

// Simple in-memory rate limiting (for edge/serverless, this resets on cold boots, but suffices for basic protection)
const rateLimit = new Map<string, number>();
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('RESEND_API_KEY is missing');
      return NextResponse.json(
        { error: 'Email service configuration error.' },
        { status: 500 }
      );
    }
    const resend = new Resend(apiKey);

    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    
    // Check rate limit
    const lastRequest = rateLimit.get(ip);
    const now = Date.now();
    if (lastRequest && now - lastRequest < RATE_LIMIT_WINDOW_MS) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a minute before trying again.' },
        { status: 429 }
      );
    }
    
    // Update rate limit
    rateLimit.set(ip, now);

    const body = await request.json();
    const validatedData = contactSchema.parse(body);
    
    const { name, email, projectType, budget, deadline, description } = validatedData;

    // Send email to artist
    await resend.emails.send({
      from: 'Kaizen Commissions <onboarding@resend.dev>', // Use verified domain in production
      to: process.env.CONTACT_EMAIL || 'artist@example.com',
      replyTo: email,
      subject: `New Commission Inquiry from ${name} (${projectType})`,
      html: `
        <h2>New Commission Inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Project Type:</strong> ${projectType}</p>
        <p><strong>Budget:</strong> ${budget}</p>
        <p><strong>Deadline:</strong> ${deadline}</p>
        <h3>Project Description:</h3>
        <p>${description.replace(/\n/g, '<br/>')}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { error: 'Failed to submit inquiry.' },
      { status: 500 }
    );
  }
}

