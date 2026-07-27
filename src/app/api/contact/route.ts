import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import path from 'path';

export async function POST(request: Request) {
    try {
        const { name, email, phone, description } = await request.json();

        if (!email || !email.includes('@')) {
            return NextResponse.json(
                { error: 'A valid email address is required.' },
                { status: 400 }
            );
        }

        if (!description || description.trim().length === 0) {
            return NextResponse.json(
                { error: 'A message or description is required.' },
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

        // Elegant HTML admin email template design page
        const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Contact Submission</title>
            <style>
                body {
                    margin: 0;
                    padding: 0;
                    background-color: #fcfbf7;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
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
                    padding: 30px 20px;
                    text-align: center;
                    border-bottom: 3px solid #d4af37;
                }
                .logo-img {
                    width: 60px;
                    height: 60px;
                    object-fit: contain;
                    margin-bottom: 8px;
                }
                .brand-title {
                    font-family: 'Playfair Display', Georgia, serif;
                    font-size: 22px;
                    color: #ffffff;
                    letter-spacing: 3px;
                    margin: 0;
                    text-transform: uppercase;
                    font-weight: 700;
                }
                .content {
                    padding: 40px 30px;
                    line-height: 1.6;
                    font-size: 15px;
                }
                .section-title {
                    font-family: 'Playfair Display', Georgia, serif;
                    font-size: 18px;
                    color: #1a1a1a;
                    margin-top: 0;
                    margin-bottom: 24px;
                    text-align: left;
                    font-weight: 600;
                    border-bottom: 1px solid #e5dfd5;
                    pb: 8px;
                }
                .data-table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-bottom: 24px;
                }
                .data-table th, .data-table td {
                    padding: 12px;
                    text-align: left;
                    border-bottom: 1px solid #f0ebe1;
                }
                .data-table th {
                    width: 30%;
                    color: #b8923a;
                    font-size: 13px;
                    font-weight: bold;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }
                .data-table td {
                    color: #2d2d2d;
                    font-size: 14px;
                }
                .msg-box {
                    background-color: #faf8f5;
                    border-left: 3px solid #d1a25d;
                    padding: 20px;
                    font-style: italic;
                    margin: 15px 0;
                    font-size: 14px;
                    white-space: pre-wrap;
                }
                .footer {
                    background-color: #1a1a1a;
                    padding: 20px;
                    text-align: center;
                    color: #888888;
                    font-size: 11px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <!-- Header -->
                <div class="header">
                    <img src="cid:logo" alt="Anakh Fashions Logo" class="logo-img" />
                    <h1 class="brand-title">Anakh Fashions</h1>
                </div>
                
                <!-- Content -->
                <div class="content">
                    <h2 class="section-title">New Customer Inquiry Details</h2>
                    
                    <table class="data-table">
                        <tr>
                            <th>Name</th>
                            <td>${name ? name.trim() : 'Not provided'}</td>
                        </tr>
                        <tr>
                            <th>Email</th>
                            <td><a href="mailto:${email}">${email}</a></td>
                        </tr>
                        <tr>
                            <th>Phone</th>
                            <td>${phone ? phone.trim() : 'Not provided'}</td>
                        </tr>
                    </table>

                    <div style="font-weight: bold; font-size: 13px; color: #b8923a; text-transform: uppercase; letter-spacing: 1px;">Message / Inquiry Details:</div>
                    <div class="msg-box">${description.trim()}</div>
                </div>
                
                <!-- Footer -->
                <div class="footer">
                    <p>&copy; ${new Date().getFullYear()} Anakh Fashions Admin Portal. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
        `;

        // Send mail via configured transport to the admin inbox
        await transporter.sendMail({
            from: '"Anakh Fashions Portal" <vrnair.s28@gmail.com>',
            to: 'vrnair.s28@gmail.com', // Admin receiving address
            subject: `Contact Inquiry: ${name ? name.trim() : 'Anonymous'} (${email})`,
            html: htmlContent,
            attachments: [
                {
                    filename: 'logo.png',
                    path: logoPath,
                    cid: 'logo', // References the 'cid:logo' in the inline HTML template
                },
            ],
        });

        return NextResponse.json({ success: true, message: 'Message sent successfully!' });
    } catch (error: any) {
        console.error('Contact API Error:', error);
        return NextResponse.json(
            { error: error?.message || 'Failed to dispatch contact inquiry email.' },
            { status: 500 }
        );
    }
}
