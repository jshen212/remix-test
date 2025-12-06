import prisma from "./db.server";

// Shop helpers
export async function getShopByDomain(shopDomain: string) {
  // @ts-expect-error - shop model will be available after Prisma schema is updated
  return prisma.shop.findUnique({
    where: { shopDomain },
  });
}

export async function createOrUpdateShop(data: {
  shopDomain: string;
  accessToken?: string;
  active?: boolean;
  plan?: string;
}) {
  // @ts-expect-error - shop model will be available after Prisma schema is updated
  return prisma.shop.upsert({
    where: { shopDomain: data.shopDomain },
    update: {
      accessToken: data.accessToken,
      active: data.active ?? true,
      plan: data.plan,
      // Remove updatedAt - Prisma handles @updatedAt automatically
    },
    create: {
      shopDomain: data.shopDomain,
      accessToken: data.accessToken,
      active: data.active ?? true,
      plan: data.plan,
    },
  });
}

// Dispute helpers
export async function createDispute(data: {
  shopId: string;
  shopifyDisputeId: string;
  orderId?: string;
  orderName?: string;
  customerEmail?: string;
  status?: string;
  reason?: string;
  chargebackReason?: string;
  amount?: number;
  currency?: string;
  evidenceDueBy?: Date;
  evidenceSubmitted?: boolean;
  rawPayload: unknown; // Changed from 'any' to 'unknown' for better type safety
}) {
  // @ts-expect-error - dispute model will be available after Prisma schema is updated
  return prisma.dispute.create({
    data: {
      shopId: data.shopId,
      shopifyDisputeId: data.shopifyDisputeId,
      orderId: data.orderId,
      orderName: data.orderName,
      customerEmail: data.customerEmail,
      status: data.status,
      reason: data.reason,
      chargebackReason: data.chargebackReason,
      amount: data.amount,
      currency: data.currency,
      evidenceDueBy: data.evidenceDueBy,
      evidenceSubmitted: data.evidenceSubmitted ?? false,
      rawPayload: data.rawPayload,
    },
  });
}

export async function getDisputesByShop(shopId: string) {
  // @ts-expect-error - dispute model will be available after Prisma schema is updated
  return prisma.dispute.findMany({
    where: { shopId },
    include: {
      disputeResponses: {
        orderBy: { createdAt: "desc" },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

// DisputeResponse helpers
export async function createDisputeResponse(data: {
  disputeId: string;
  shopId: string;
  draftText: string;
  modelUsed?: string;
  isFinal?: boolean;
}) {
  // @ts-expect-error - disputeResponse model will be available after Prisma schema is updated
  return prisma.disputeResponse.create({
    data: {
      disputeId: data.disputeId,
      shopId: data.shopId,
      draftText: data.draftText,
      modelUsed: data.modelUsed,
      isFinal: data.isFinal ?? false,
    },
  });
}
