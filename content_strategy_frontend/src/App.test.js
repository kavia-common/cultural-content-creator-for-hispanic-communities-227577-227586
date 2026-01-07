import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders preview panel and default topic", () => {
  render(<App />);
  expect(screen.getByText(/Previsualización/i)).toBeInTheDocument();
  expect(
    screen.getByDisplayValue(/Telemedicina para todos/i)
  ).toBeInTheDocument();
});
