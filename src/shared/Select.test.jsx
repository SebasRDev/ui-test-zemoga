import { describe, expect, it, beforeEach, vi } from "vitest";
import { render, screen, fireEvent, act, waitFor } from "@testing-library/react";
import { Select } from "./Select";

const mockLayoutOptions = [
  { value: "list", label: "List" },
  { value: "grid", label: "Grid" },
];

// Simular localStorage
window.localStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
};

describe("Select", () => {
  beforeEach(() => {
    render(<Select selected="list" options={mockLayoutOptions} onChange={() => {}}/>);
  });

  it("should render a select component", () => {
    const { container } = render(<Select selected="list" options={mockLayoutOptions} onChange={() => {}}/>);
    expect(container).toMatchSnapshot();
  });

  it("should show select options", () => {
    const select = screen.getByTestId("test-select");
    fireEvent.click(select);
    const selectOptions = screen.getByTestId("test-select-options");
    expect(selectOptions).toHaveClass("select__options--open");
  });

  it("should change the layout", () => {
    const select = screen.getByTestId("test-select");
    fireEvent.click(select);
    const selectOptions = screen.getAllByRole("select-options");
    fireEvent.click(selectOptions[1]);
    expect(selectOptions[1]).toHaveTextContent("Grid");
  });

  it("should change the layout in localstorage", async() => {
    const select = screen.getByTestId("test-select");
    fireEvent.click(select);
    const selectOptions = screen.getAllByRole("select-options");
    act(() => {
      fireEvent.click(selectOptions[1]);
    })
    waitFor(() => {
      expect(localStorage.setItem).toHaveBeenCalledWith("layout", "grid");
    });
  });
});
