import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  render,
  screen,
  act,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import { Card } from "./Card";

const mockData = {
  name: "Kanye West",
  description:
    "Born in Atlanta and raised in Chicago, West was first known as a producer for Roc-A-Fella Records in the early 2000s, producing singles for several mainstream artists.",
  category: "entertainment",
  picture: "kanye.webp",
  lastUpdated: "2024-02-20T23:08:57.892Z",
  votes: {
    positive: 23,
    negative: 36,
  },
};

describe("Card component", () => {
  let handleUpdateMock;
  beforeEach(() => {
    handleUpdateMock = vi.fn();
    render(<Card celebrity={mockData} handleUpdate={handleUpdateMock}/>);
  });
  it("should match the snapshot", () => {
    const { container } = render(<Card celebrity={mockData} />);
    expect(container).toMatchSnapshot();
  });
  it("should render the celebrity name", () => {
    expect(screen.getByText(mockData.name)).toBeInTheDocument();
  });
  it("should render the celebrity description", () => {
    expect(screen.getByText(mockData.description)).toBeInTheDocument();
  });
  it("should render the celebrity category", () => {
    expect(screen.getByText(mockData.category)).toBeInTheDocument();
  });
  it("should render the celebrity picture", () => {
    expect(screen.getByAltText(mockData.name)).toBeInTheDocument();
  });
  it("should have disabled botom when no thumb is selected", () => {
    const button = screen.getByText("Vote Now");
    expect(button).toBeDisabled();
  });
  it("should show active thumb up on click", () => {
    const thumbUp = screen.getByTestId("thumb-up-action");
    const thumbDown = screen.getByTestId("thumb-down-action");
    const voteButton = screen.getByText("Vote Now");
    fireEvent.click(thumbUp);
    expect(thumbUp).toHaveClass("thumb--active");
    expect(thumbDown).not.toHaveClass("thumb--active");
    expect(voteButton).toBeEnabled();
  });
  it("should show active thumb down on click", () => {
    const thumbUp = screen.getByTestId("thumb-up-action");
    const thumbDown = screen.getByTestId("thumb-down-action");
    const voteButton = screen.getByText("Vote Now");
    fireEvent.click(thumbDown);
    expect(thumbDown).toHaveClass("thumb--active");
    expect(thumbUp).not.toHaveClass("thumb--active");
    expect(voteButton).toBeEnabled();
  });
  it("should show Thank you for voting! when vote button is clicked", async () => {
    const thumbUp = screen.getByTestId("thumb-up-action");
    const voteButton = screen.getByText("Vote Now");
    act(() => {
      fireEvent.click(thumbUp);
    });
    fireEvent.click(voteButton);
    await waitFor(() => {
      expect(screen.getByText("Thank you for voting!")).toBeInTheDocument();
      expect(screen.getByText("Vote Again")).toBeInTheDocument();
    });
  });
  it("should reset thumbs and vote button when vote again is clicked", async () => {
    const thumbUp = screen.getByTestId("thumb-up-action");
    const voteButton = screen.getByText("Vote Now");
    act(() => {
      fireEvent.click(thumbUp);
    });
    fireEvent.click(voteButton);
    const voteAgainButton = screen.getByText("Vote Again");
    fireEvent.click(voteAgainButton);
    await waitFor(() => {
      expect(screen.getByText("Vote Now")).toBeInTheDocument();
      expect(screen.getByTestId("thumb-up-action")).not.toHaveClass(
        "thumb--active"
      );
      expect(screen.getByTestId("thumb-down-action")).not.toHaveClass(
        "thumb--active"
      );
    });
  });
  it("should updtate positive votes when vote now is clicked", async () => {
    const thumbUp = screen.getByTestId("thumb-up-action");
    const voteButton = screen.getByText("Vote Now");
    const initialPositiveVotes = mockData.votes.positive;
    act(() => {
      fireEvent.click(thumbUp);
    });
    fireEvent.click(voteButton);
    await waitFor(() => {
      const updatedPositiveVotes = initialPositiveVotes + 1;
      const updatedCelebrity = {
        ...mockData,
        votes: { 
          ...mockData.votes,
          positive: updatedPositiveVotes 
        },
      };
      console.log(handleUpdateMock)
      expect(handleUpdateMock).toHaveBeenCalledWith(updatedCelebrity);
    });
  });
});
