import { vi } from "vitest";
import { PrismaClient } from "@/generated/prisma/client";
import { mockDeep, DeepMockProxy } from "vitest-mock-extended";

export const prismaMock: DeepMockProxy<PrismaClient> =
  mockDeep<PrismaClient>();

vi.mock("@/lib/prisma", () => ({
  prisma: prismaMock,
}));
