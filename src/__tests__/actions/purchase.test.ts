import { describe, it, expect, vi, beforeEach } from "vitest"

// mock auth
vi.mock("@/auth", () => ({
  auth: vi.fn(),
}));

import { finalizePaidOrder } from "@/actions/purchase"

/**
 * Mock Prisma Transaction Client
 * This matches the shape used inside finalizePaidOrder
 */
const tx = {
  order: {
    update: vi.fn(),
  },
  purchase: {
    createMany: vi.fn(),
  },
  asset: {
    updateMany: vi.fn(),
  },
  cartItem: {
    deleteMany: vi.fn(),
  },
}

describe("finalizePaidOrder", () => {
  const orderId = "order_123"
  const userId = "user_456"

  const mockOrder = {
    userId,
    items: [
      { assetId: "asset_1", price: 500 },
      { assetId: "asset_2", price: 300 },
    ],
  }

  beforeEach(() => {
    vi.clearAllMocks()

    tx.order.update.mockResolvedValue(mockOrder)
    tx.purchase.createMany.mockResolvedValue({ count: 2 })
    tx.asset.updateMany.mockResolvedValue({ count: 2 })
    tx.cartItem.deleteMany.mockResolvedValue({ count: 2 })
  })

  it("marks order as PAID and performs all purchase side effects", async () => {
    // Act
    const result = await finalizePaidOrder(tx as any, orderId)

    // Assert: Order status update
    expect(tx.order.update).toHaveBeenCalledWith({
      where: { id: orderId },
      data: { status: "PAID" },
      select: {
        userId: true,
        items: {
          select: {
            assetId: true,
            price: true,
          },
        },
      },
    })

    // Assert: Purchases created
    expect(tx.purchase.createMany).toHaveBeenCalledWith({
      data: [
        { userId, assetId: "asset_1", price: 500 },
        { userId, assetId: "asset_2", price: 300 },
      ],
    })

    // Assert: Asset sales count incremented
    expect(tx.asset.updateMany).toHaveBeenCalledWith({
      where: { id: { in: ["asset_1", "asset_2"] } },
      data: {
        salesCount: { increment: 1 },
      },
    })

    // Assert: Cart cleaned up
    expect(tx.cartItem.deleteMany).toHaveBeenCalledWith({
      where: {
        userId,
        assetId: { in: ["asset_1", "asset_2"] },
      },
    })

    // Assert: Return value
    expect(result).toEqual(mockOrder)
  })
})
