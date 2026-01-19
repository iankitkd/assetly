import { describe, it, expect, vi, beforeEach } from "vitest";

// prisma mock
import { prismaMock } from "@/__tests__/__mocks__/prisma";

// mock auth
vi.mock("@/auth", () => ({
  auth: vi.fn(),
}));

import { auth } from "@/auth";

import { POST } from "@/app/api/assets/new/route";

// helpers
function mockRequest(body: any) {
  return new Request("http://localhost:3000/api/assets/new", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });
}

beforeEach(() => {
  vi.clearAllMocks();
});

// tests
describe("POST /api/assets/new", () => {
  it("returns 401 if user is not authenticated", async () => {
    (auth as any).mockResolvedValue(null);

    const res = await POST(mockRequest({}));

    expect(res.status).toBe(401);
  });

  it("returns 401 if user is not a SELLER", async () => {
    (auth as any).mockResolvedValue({
      user: { id: "1", role: "USER" },
    });

    const res = await POST(mockRequest({}));

    expect(res.status).toBe(401);
  });

  it("returns 400 for invalid input", async () => {
    (auth as any).mockResolvedValue({
      user: { id: "seller1", role: "SELLER" },
    });

    const res = await POST(
      mockRequest({
        title: "", // invalid
      })
    );

    expect(res.status).toBe(400);
  });

  it("creates asset and returns success for valid SELLER", async () => {
    (auth as any).mockResolvedValue({
      user: { id: "seller1", role: "SELLER" },
    });

    prismaMock.asset.create.mockResolvedValue({} as any);

    const validBody = {
      title: "Premium UI Kit",
      description: "This is a premium UI kit for dashboards",
      price: 99,
      mainCategory: "Design",
      subCategory: "UI",
      previewUrl: "https://example.com/preview.png",
      assetPath: "https://example.com/asset.zip",
    };

    const res = await POST(mockRequest(validBody));
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.success).toBe(true);

    expect(prismaMock.asset.create).toHaveBeenCalledOnce();
    expect(prismaMock.asset.create).toHaveBeenCalledWith({
      data: {
        title: "Premium UI Kit",
        description: "This is a premium UI kit for dashboards",
        price: 99,
        category: "Design",
        subCategory: "UI",
        previewUrl: "https://example.com/preview.png",
        fileUrl: "https://example.com/asset.zip",
        sellerId: "seller1",
      },
    });
  });

  it("returns 500 if prisma throws error", async () => {
    (auth as any).mockResolvedValue({
      user: { id: "seller1", role: "SELLER" },
    });

    prismaMock.asset.create.mockRejectedValue(
      new Error("Database error")
    );

    const res = await POST(
      mockRequest({
        title: "Premium UI Kit",
        description: "This is a premium UI kit for dashboards",
        price: 99,
        mainCategory: "Design",
        subCategory: "UI",
        previewUrl: "https://example.com/preview.png",
        assetPath: "https://example.com/asset.zip",
      })
    );

    expect(res.status).toBe(500);
  });
});
