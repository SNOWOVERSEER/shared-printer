import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2025-02-24.acacia',
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
            amount,
            orderId,
            customerEmail,
            customerName,
            metadata,
            metadata: {
                fileName,
                paperSize,
                colorMode,
                copies,
                sides
            }
        } = body;

        const productName = `Print Service (${colorMode})`;
        const productDescription = [
            `${fileName}`,
            `${paperSize}`,
            `${sides} sides`,
            `${colorMode}`,
            `${copies} copies`,
        ];



        // create Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'aud',
                        product_data: {
                            name: productName,
                            description: productDescription.join(' | '),
                        },
                        unit_amount: Math.round(amount * 100), // Stripe uses cents as the unit
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
            customer_email: customerEmail,
            client_reference_id: orderId,
            metadata: {
                ...metadata,
                customerName
            },
        });

        return NextResponse.json({ sessionId: session.id, url: session.url });
    } catch (error: any) {
        console.error('Error creating checkout session:', error);
        return NextResponse.json(
            { error: { message: error.message } },
            { status: 500 }
        );
    }
}