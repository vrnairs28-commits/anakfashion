import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import path from 'path';

export async function POST(request: Request) {
    try {
        const { email } = await request.json();

        if (!email || !email.includes('@')) {
            return NextResponse.json(
                { error: 'Please provide a valid email address.' },
                { status: 400 }
            );
        }

        // Setup Nodemailer transporter with Gmail app password
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'vrnair.s28@gmail.com',
                pass: 'ybpk hofw yrxs askx',
            },
        });

        // Set logo image path for CID attachment
        const logoPath = path.join(process.cwd(), 'public/logo.png');

        // Elegant HTML welcome email template design
        const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to the Anakh Club</title>
            <style>
                body {
                    margin: 0;
                    padding: 0;
                    background-color: #fcfbf7;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                    -webkit-font-smoothing: antialiased;
                    color: #2d2d2d;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #ffffff;
                    border: 1px solid #e5dfd5;
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.03);
                }
                .header {
                    background-color: #1a1a1a;
                    padding: 40px 20px;
                    text-align: center;
                    border-bottom: 3px solid #d4af37;
                }
                .logo-img {
                    width: 70px;
                    height: 70px;
                    object-fit: contain;
                    margin-bottom: 12px;
                }
                .brand-title {
                    font-family: 'Playfair Display', Georgia, serif;
                    font-size: 26px;
                    color: #ffffff;
                    letter-spacing: 4px;
                    margin: 0;
                    text-transform: uppercase;
                    font-weight: 700;
                }
                .brand-subtitle {
                    font-size: 10px;
                    color: #d4af37;
                    letter-spacing: 6px;
                    margin: 4px 0 0 0;
                    text-transform: uppercase;
                }
                .content {
                    padding: 40px 30px;
                    line-height: 1.7;
                    font-size: 15px;
                }
                .welcome-title {
                    font-family: 'Playfair Display', Georgia, serif;
                    font-size: 22px;
                    color: #1a1a1a;
                    margin-top: 0;
                    margin-bottom: 20px;
                    text-align: center;
                    font-weight: 600;
                }
                .divider {
                    height: 1px;
                    background-color: #e5dfd5;
                    margin: 30px 0;
                }
                .cta-block {
                    background-color: #faf8f5;
                    border: 1px dashed #d1a25d;
                    border-radius: 8px;
                    padding: 24px;
                    text-align: center;
                    margin: 30px 0;
                }
                .cta-text {
                    font-size: 14px;
                    color: #555555;
                    margin-bottom: 16px;
                    margin-top: 0;
                }
                .button {
                    display: inline-block;
                    background-color: #25d366;
                    color: #ffffff !important;
                    text-decoration: none;
                    padding: 12px 28px;
                    border-radius: 30px;
                    font-weight: bold;
                    font-size: 14px;
                    letter-spacing: 1px;
                    box-shadow: 0 4px 10px rgba(37, 211, 102, 0.2);
                    transition: transform 0.2s;
                }
                .info-grid {
                    display: table;
                    width: 100%;
                    margin-top: 20px;
                }
                .info-row {
                    display: table-row;
                }
                .info-cell {
                    display: table-cell;
                    width: 50%;
                    padding: 10px;
                    vertical-align: top;
                }
                .info-card {
                    background-color: #fdfdfd;
                    border: 1px solid #f0ebe1;
                    padding: 16px;
                    border-radius: 8px;
                    height: 100%;
                }
                .info-card-title {
                    color: #b8923a;
                    font-size: 13px;
                    font-weight: 700;
                    text-transform: uppercase;
                    margin-top: 0;
                    margin-bottom: 8px;
                    letter-spacing: 1px;
                }
                .info-card-desc {
                    margin: 0;
                    font-size: 13px;
                    color: #666;
                }
                .footer {
                    background-color: #1a1a1a;
                    padding: 30px;
                    text-align: center;
                    color: #888888;
                    font-size: 12px;
                }
                .footer-text {
                    margin: 0 0 16px 0;
                }
                .social-links a {
                    color: #d4af37 !important;
                    text-decoration: none;
                    margin: 0 12px;
                    font-weight: 600;
                    font-size: 13px;
                }
                .footer-copyright {
                    margin-top: 20px;
                    font-size: 11px;
                    color: #555555;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <!-- Header Component -->
                <div class="header">
                    <img src="cid:logo" alt="Anakh Fashions Logo" class="logo-img" />
                    <h1 class="brand-title">Anakh</h1>
                    <p class="brand-subtitle">Fashions</p>
                </div>
                
                <!-- Main Content Body -->
                <div class="content">
                    <h2 class="welcome-title">Welcome to the Club</h2>
                    <p>Thank you for subscribing to **Anakh Fashions**. You are now part of our exclusive inner circle, gaining access to vintage Indian weaves, bespoke tailoring services, and premium styling suggestions.</p>
                    
                    <p>Expect curated selections of our latest collections, early bird VIP launch access, and limited-edition design insights sent straight to your inbox.</p>
                    
                    <!-- VIP benefits cards Grid layout -->
                    <div class="info-grid">
                        <div class="info-row">
                            <div class="info-cell">
                                <div class="info-card">
                                    <h4 class="info-card-title">Early Access</h4>
                                    <p class="info-card-desc">Be the first to browse and acquire new saree drops and seasonal collection launches.</p>
                                </div>
                            </div>
                            <div class="info-cell">
                                <div class="info-card">
                                    <h4 class="info-card-title">Tailor Consult</h4>
                                    <p class="info-card-desc">Recieve personal assistance on custom fits, blouse modifications, and sizing guides.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="divider"></div>
                    
                    <!-- WhatsApp Call-to-action Block -->
                    <div class="cta-block">
                        <h3 style="margin-top:0; margin-bottom:8px; font-family: 'Playfair Display', Georgia, serif; color:#1a1a1a;">Join Our WhatsApp Community</h3>
                        <p class="cta-text">Enter our active community group to chat directly with styling professionals, get real-time drop feeds, and exclusive offers.</p>
                        <a href="https://chat.whatsapp.com/KBmmvFDvVVl4rr809cVGkP?s=cl&p=a&ilr=2&amv=0" target="_blank" class="button">JOIN WHATSAPP GROUP</a>
                    </div>
                </div>
                
                <!-- Footer Info and Social Links -->
                <div class="footer">
                    <p class="footer-text">Follow us on social media for daily luxury inspiration, behind-the-scenes craft stories, and styling guides:</p>
                    <div class="social-links">
                        <a href="https://instagram.com/anakhfashion9" target="_blank">INSTAGRAM</a>
                        <a href="https://m.facebook.com/?next=https%3A%2F%2Fm.facebook.com%2F1194564637063618%3Fwtsid%3Drdr_0GMDAdaALc724eHQD%23" target="_blank">FACEBOOK</a>
                    </div>
                    <p class="footer-copyright">&copy; ${new Date().getFullYear()} Anakh Fashions. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
        `;

        // Send mail via configured transport
        await transporter.sendMail({
            from: '"Anakh Fashions" <vrnair.s28@gmail.com>',
            to: email,
            subject: 'Welcome to the Anakh Club | Anakh Fashions',
            html: htmlContent,
            attachments: [
                {
                    filename: 'logo.png',
                    path: logoPath,
                    cid: 'logo', // References the 'cid:logo' in the inline HTML template
                },
            ],
        });

        return NextResponse.json({ success: true, message: 'Welcome email sent successfully!' });
    } catch (error: any) {
        console.error('Subscription API Error:', error);
        return NextResponse.json(
            { error: error?.message || 'Failed to dispatch subscription welcome email.' },
            { status: 550 }
        );
    }
}
