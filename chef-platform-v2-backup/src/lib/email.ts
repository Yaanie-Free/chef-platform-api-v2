// src/lib/email.ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = 'ChefConnect <noreply@chefconnect.co.za>';

/**
 * Send booking confirmation email to customer
 */
export async function sendBookingConfirmation(
  to: string,
  bookingData: {
    bookingId: string;
    customerName: string;
    chefName: string;
    service: string;
    date: string;
    time: string;
    location: string;
    amount: number;
  }
) {
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: '✅ Booking Confirmed - ChefConnect',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #FF6B35 0%, #F7931E 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
              .booking-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
              .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
              .detail-label { font-weight: bold; color: #666; }
              .button { display: inline-block; background: #FF6B35; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
              .footer { text-align: center; color: #666; margin-top: 30px; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🎉 Booking Confirmed!</h1>
              </div>
              <div class="content">
                <p>Hi ${bookingData.customerName},</p>
                <p>Great news! Your booking with <strong>${bookingData.chefName}</strong> has been confirmed.</p>
                
                <div class="booking-details">
                  <h3 style="margin-top: 0;">Booking Details</h3>
                  <div class="detail-row">
                    <span class="detail-label">Booking ID:</span>
                    <span>${bookingData.bookingId}</span>
                  </div>
                  <div class="detail-row">
                    <span class="detail-label">Chef:</span>
                    <span>${bookingData.chefName}</span>
                  </div>
                  <div class="detail-row">
                    <span class="detail-label">Service:</span>
                    <span>${bookingData.service}</span>
                  </div>
                  <div class="detail-row">
                    <span class="detail-label">Date:</span>
                    <span>${bookingData.date}</span>
                  </div>
                  <div class="detail-row">
                    <span class="detail-label">Time:</span>
                    <span>${bookingData.time}</span>
                  </div>
                  <div class="detail-row">
                    <span class="detail-label">Location:</span>
                    <span>${bookingData.location}</span>
                  </div>
                  <div class="detail-row">
                    <span class="detail-label">Amount Paid:</span>
                    <span><strong>R${bookingData.amount.toLocaleString()}</strong></span>
                  </div>
                </div>

                <h4>What's Next?</h4>
                <ul>
                  <li>Your chef will contact you 24 hours before the event</li>
                  <li>You can message your chef anytime through your dashboard</li>
                  <li>We'll send you a reminder the day before</li>
                </ul>

                <center>
                  <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" class="button">View Dashboard</a>
                </center>

                <div class="footer">
                  <p>Need help? Contact us at support@chefconnect.co.za</p>
                  <p>© 2024 ChefConnect. All rights reserved.</p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    return { success: true, error: null };
  } catch (error: any) {
    console.error('Email error:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Send welcome email to new user
 */
export async function sendWelcomeEmail(to: string, name: string, userType: 'customer' | 'chef') {
  try {
    const content = userType === 'customer' 
      ? {
          title: `Welcome to ChefConnect, ${name}!`,
          message: `We're thrilled to have you join our community. Start exploring talented chefs and book your first culinary experience today.`,
          cta: 'Browse Chefs',
          link: `${process.env.NEXT_PUBLIC_APP_URL}/discover`
        }
      : {
          title: `Welcome, Chef ${name}!`,
          message: `Thank you for joining ChefConnect. Complete your profile to start receiving booking requests from customers.`,
          cta: 'Complete Profile',
          link: `${process.env.NEXT_PUBLIC_APP_URL}/profile`
        };

    await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: `${content.title} 🎉`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #FF6B35 0%, #F7931E 100%); color: white; padding: 40px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f9f9f9; padding: 30px; text-align: center; border-radius: 0 0 10px 10px; }
              .button { display: inline-block; background: #FF6B35; color: white; padding: 15px 40px; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: bold; }
              .footer { text-align: center; color: #666; margin-top: 30px; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>${content.title}</h1>
              </div>
              <div class="content">
                <p style="font-size: 16px;">${content.message}</p>
                <a href="${content.link}" class="button">${content.cta}</a>
                <p style="color: #666; margin-top: 30px;">Need help getting started? Contact our support team anytime.</p>
                <div class="footer">
                  <p>© 2024 ChefConnect. All rights reserved.</p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    return { success: true, error: null };
  } catch (error: any) {
    console.error('Welcome email error:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Send booking reminder (24 hours before event)
 */
export async function sendBookingReminder(
  to: string,
  bookingData: {
    customerName: string;
    chefName: string;
    date: string;
    time: string;
    location: string;
  }
) {
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: `⏰ Reminder: Your booking is tomorrow!`,
      html: `
        <!DOCTYPE html>
        <html>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2>Hi ${bookingData.customerName},</h2>
              <p>This is a friendly reminder that your booking with <strong>${bookingData.chefName}</strong> is tomorrow!</p>
              
              <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong>Date:</strong> ${bookingData.date}</p>
                <p><strong>Time:</strong> ${bookingData.time}</p>
                <p><strong>Location:</strong> ${bookingData.location}</p>
              </div>

              <p>Your chef will arrive on time with all necessary ingredients and equipment.</p>
              <p>If you need to make any changes, please contact us as soon as possible.</p>
              
              <p style="color: #666; margin-top: 30px; font-size: 12px;">
                © 2024 ChefConnect. All rights reserved.
              </p>
            </div>
          </body>
        </html>
      `,
    });

    return { success: true, error: null };
  } catch (error: any) {
    console.error('Reminder email error:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Send password reset email
 */
export async function sendPasswordResetEmail(to: string, resetLink: string) {
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: 'Reset Your Password - ChefConnect',
      html: `
        <!DOCTYPE html>
        <html>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2>Reset Your Password</h2>
              <p>You requested to reset your password. Click the button below to create a new password:</p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${resetLink}" style="display: inline-block; background: #FF6B35; color: white; padding: 15px 40px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                  Reset Password
                </a>
              </div>

              <p>This link will expire in 1 hour.</p>
              <p>If you didn't request this, you can safely ignore this email.</p>
              
              <p style="color: #666; margin-top: 30px; font-size: 12px;">
                © 2024 ChefConnect. All rights reserved.
              </p>
            </div>
          </body>
        </html>
      `,
    });

    return { success: true, error: null };
  } catch (error: any) {
    console.error('Password reset email error:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Send notification to chef about new booking
 */
export async function sendChefBookingNotification(
  to: string,
  bookingData: {
    chefName: string;
    customerName: string;
    service: string;
    date: string;
    time: string;
    amount: number;
  }
) {
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: '🎊 New Booking Request!',
      html: `
        <!DOCTYPE html>
        <html>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2>Hi Chef ${bookingData.chefName},</h2>
              <p>Great news! You have a new booking request from <strong>${bookingData.customerName}</strong>.</p>
              
              <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong>Service:</strong> ${bookingData.service}</p>
                <p><strong>Date:</strong> ${bookingData.date}</p>
                <p><strong>Time:</strong> ${bookingData.time}</p>
                <p><strong>Amount:</strong> R${bookingData.amount.toLocaleString()}</p>
              </div>

              <div style="text-align: center; margin: 30px 0;">
                <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" style="display: inline-block; background: #FF6B35; color: white; padding: 15px 40px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                  View Booking
                </a>
              </div>

              <p>Please respond to the customer within 24 hours to confirm availability.</p>
              
              <p style="color: #666; margin-top: 30px; font-size: 12px;">
                © 2024 ChefConnect. All rights reserved.
              </p>
            </div>
          </body>
        </html>
      `,
    });

    return { success: true, error: null };
  } catch (error: any) {
    console.error('Chef notification email error:', error);
    return { success: false, error: error.message };
  }
}
