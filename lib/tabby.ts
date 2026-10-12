export type TabbySession = { approved: boolean; checkoutUrl?: string; mock: boolean; message: string; adapter: "mock" | "production-todo" };

// TODO: Replace the development adapter with Tabby's production API integration,
// including signature verification on the callback/webhook before launch.
export async function createTabbySession(input: { amount: number; orderId?: string }): Promise<TabbySession> {
  if (process.env.TABBY_MOCK_APPROVED === "true" || process.env.NODE_ENV !== "production") {
    return { approved: true, mock: true, adapter: "mock", message: `Development approval for ${input.orderId ?? "checkout"}` };
  }
  if (!process.env.TABBY_API_KEY) {
    return { approved: false, mock: false, adapter: "production-todo", message: "Tabby is not configured" };
  }
  return { approved: false, mock: false, adapter: "production-todo", message: "Tabby production adapter TODO: configure API integration before launch" };
}
