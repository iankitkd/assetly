import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddToCartButton from "@/components/asset/AddToCartButton";

describe("AddToCartButton", () => {
  it("calls handler when clicked", async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();

    render(
      <AddToCartButton
        onAdd={onAdd}
        isInCartStatus={false}
      />
    );

    await user.click(
      screen.getByRole("button", { name: /add to cart/i })
    );

    expect(onAdd).toHaveBeenCalledOnce();
  });
});
