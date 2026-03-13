import { json, type RequestHandler } from '@sveltejs/kit';
import crypto from 'crypto';

type CheckoutItem = {
  name: string;
  price: number;
  quantity: number;
};

export const POST: RequestHandler = async ({ request }) => {
  const SENANGPAY_URL = process.env.SENANGPAY_URL ?? 'https://app.senangpay.my/payment/';
  const MERCHANT_ID = process.env.SENANGPAY_MERCHANT_ID;
  const SECRET_KEY = process.env.SENANGPAY_SECRET_KEY;

  if (!MERCHANT_ID || !SECRET_KEY) {
    console.error('SenangPay configuration missing');
    return json({ error: 'Payment configuration error' }, { status: 500 });
  }

  let payload: {
    name: string;
    email: string;
    phone: string;
    items: CheckoutItem[];
  };

  try {
    payload = await request.json();
  } catch {
    return json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { name, email, phone, items } = payload;

  if (!name || !email || !phone || !Array.isArray(items) || items.length === 0) {
    return json({ error: 'Missing or invalid checkout data' }, { status: 400 });
  }

  const detail = items
    .map((i) => `${i.name}_x${i.quantity}`)
    .join(',_');

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const amount = total.toFixed(2);
  const orderId = 'AZH-' + Date.now();

  const toSign = SECRET_KEY + detail + amount + orderId;
  const hash = crypto.createHmac('sha256', SECRET_KEY).update(toSign).digest('hex');

  const fields = {
    detail,
    amount,
    order_id: orderId,
    hash,
    name,
    email,
    phone
  };

  return json(
    {
      url: SENANGPAY_URL + MERCHANT_ID,
      fields
    },
    { status: 200 }
  );
};

