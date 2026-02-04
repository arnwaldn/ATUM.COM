import { NextRequest, NextResponse } from 'next/server';
import { contactSchema } from '@/lib/validations';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the request body
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { name, email, company, projectType, budget, message } = result.data;

    // In production, you would use Resend or another email service here
    // For now, we'll log the submission and return success

    console.log('=== New Contact Form Submission ===');
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Company:', company || 'Not provided');
    console.log('Project Type:', projectType);
    console.log('Budget:', budget || 'Not provided');
    console.log('Message:', message);
    console.log('=====================================');

    // Uncomment and configure when you have Resend API key
    /*
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Send notification email to ATUM
    await resend.emails.send({
      from: 'ATUM Contact <noreply@atum.dev>',
      to: 'contact@atum.dev',
      subject: `Nouveau message de ${name} - ${projectType}`,
      html: `
        <h2>Nouveau message de contact</h2>
        <p><strong>Nom:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Entreprise:</strong> ${company || 'Non renseigné'}</p>
        <p><strong>Type de projet:</strong> ${projectType}</p>
        <p><strong>Budget:</strong> ${budget || 'Non renseigné'}</p>
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    // Send confirmation email to the user
    await resend.emails.send({
      from: 'ATUM <noreply@atum.dev>',
      to: email,
      subject: 'Merci pour votre message - ATUM',
      html: `
        <h2>Merci pour votre message, ${name}!</h2>
        <p>Nous avons bien reçu votre demande et nous vous répondrons dans les plus brefs délais.</p>
        <p>À très bientôt,</p>
        <p><strong>L'équipe ATUM</strong></p>
      `,
    });
    */

    return NextResponse.json(
      {
        success: true,
        message: 'Message sent successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}
