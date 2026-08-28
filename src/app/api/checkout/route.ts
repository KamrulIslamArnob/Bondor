import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

function normalizeAmount(price: number | string): number | null {
  const amount = Math.round(Number(price) * 100);
  if (!Number.isFinite(amount) || amount <= 0) {
    return null;
  }
  return amount;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { items, productId, name, description, price, image, origin } = body || {};

    const reqOrigin = req.headers.get("origin") || req.nextUrl.origin;
    const safeOrigin =
      typeof origin === "string" && origin.startsWith("http")
        ? origin
        : reqOrigin || "http://localhost:3000";

    const currency = process.env.STRIPE_CURRENCY || "usd";
    let lineItems: any[] = [];

    if (Array.isArray(items) && items.length > 0) {
      lineItems = items.map((item: any) => {
        const itemName = item.name || "Item";
        const itemDesc = item.description || "";
        const qty = Number(item.quantity || item.qty || 1);
        const amount = normalizeAmount(item.price);

        if (!Number.isFinite(qty) || qty <= 0 || !amount) {
          throw new Error("Invalid cart item amount.");
        }

        const imageUrl =
          typeof item.image === "string" && item.image.startsWith("http")
            ? item.image
            : undefined;

        return {
          quantity: qty,
          price_data: {
            currency,
            unit_amount: amount,
            product_data: {
              name: itemName,
              description: itemDesc,
              images: imageUrl ? [imageUrl] : [],
            },
          },
        };
      });
    } else {
      if (!name || price == null) {
        return NextResponse.json({ error: "Missing product data for checkout." }, { status: 400 });
      }

      const amount = normalizeAmount(price);
      if (!amount) {
        return NextResponse.json({ error: "Invalid price." }, { status: 400 });
      }

      lineItems = [
        {
          quantity: 1,
          price_data: {
            currency,
            unit_amount: amount,
            product_data: {
              name: name || "Product",
              description: description || "",
              images: image && typeof image === "string" && image.startsWith("http") ? [image] : [],
            },
          },
        },
      ];
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: lineItems,
      success_url: `${safeOrigin}/payment/success`,
      cancel_url: `${safeOrigin}/payment/cancel`,
    });

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    });
  } catch (err: any) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json(
      { error: err?.message || "Failed to create checkout session." },
      { status: 500 }
    );
  }
}
