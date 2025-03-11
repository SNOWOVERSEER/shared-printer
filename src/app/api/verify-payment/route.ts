import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2025-02-24.acacia',
});

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const sessionId = searchParams.get('session_id');

        if (!sessionId) {
            return NextResponse.json(
                { error: { message: 'Missing session_id parameter' } },
                { status: 400 }
            );
        }

        // get Checkout Session
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if (!session) {
            return NextResponse.json(
                { error: { message: 'Invalid session' } },
                { status: 400 }
            );
        }

        // check payment status
        if (session.payment_status !== 'paid') {
            return NextResponse.json(
                { error: { message: 'Payment not completed' } },
                { status: 400 }
            );
        }

        // return order info
        return NextResponse.json({
            success: true,
            orderId: session.client_reference_id,
            customerEmail: session.customer_details?.email,
            amount: session.amount_total ? session.amount_total / 100 : 0,
        });
    } catch (error: any) {
        console.error('Error verifying payment:', error);
        return NextResponse.json(
            { error: { message: error.message } },
            { status: 500 }
        );
    }
}