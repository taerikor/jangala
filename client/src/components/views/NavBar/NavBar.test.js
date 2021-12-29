import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, fireEvent, screen } from "../../../test-utils";

import NavBar from "./NavBar";

// export const handlers = [
//   rest.get("/api/users/auth", (req, res, ctx) => {
//     return res(ctx.json("John Smith"), ctx.delay(150));
//   }),
// ];

// const server = setupServer(...handlers);
// beforeAll(() => server.listen());
// afterEach(() => server.resetHandlers());
// afterAll(() => server.close());

test("logo link", () => {
  render(<NavBar />);

  const logoLink = screen.getByRole("link", { name: /jangala/i });
  screen.debug(logoLink);
});
