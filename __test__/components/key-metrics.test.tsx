import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import KeyMetrics from "@/components/dashboard/key-metrics";
import { useStore } from "@/lib/store";
import { fetchMetrics } from "@/lib/api";
import { Metrics } from "@/types";

// Mock the store and API
jest.mock("@/lib/store");
jest.mock("@/lib/api");

// Correctly type the mocked useStore
const mockedUseStore = useStore as jest.MockedFunction<typeof useStore>;

const mockMetrics: Metrics = {
  totalUsers: 1000000,
  activeUsers: 750000,
  totalStreams: 5000000,
  revenue: 10000000,
  topArtist: "Taylor Swift",
};

describe("KeyMetrics", () => {
  beforeEach(() => {
    mockedUseStore.mockReturnValue({
      metrics: null,
      setMetrics: jest.fn(),
    } as any); // Use 'as any' to bypass type checking for the mock
    (
      fetchMetrics as jest.MockedFunction<typeof fetchMetrics>
    ).mockResolvedValue(mockMetrics);
  });

  it("renders loading state initially", () => {
    render(<KeyMetrics />);
    expect(screen.getByText("Loading metrics...")).toBeInTheDocument();
  });

  it("renders metrics after loading", async () => {
    render(<KeyMetrics />);

    await waitFor(() => {
      expect(screen.getByText("Total Users")).toBeInTheDocument();
      expect(screen.getByText("1,000,000")).toBeInTheDocument();
      expect(screen.getByText("Active Users")).toBeInTheDocument();
      expect(screen.getByText("750,000")).toBeInTheDocument();
      expect(screen.getByText("Total Streams")).toBeInTheDocument();
      expect(screen.getByText("5,000,000")).toBeInTheDocument();
      expect(screen.getByText("Revenue")).toBeInTheDocument();
      expect(screen.getByText("$10,000,000")).toBeInTheDocument();
      // Add a check for topArtist if it's displayed in the KeyMetrics component
      // expect(screen.getByText('Taylor Swift')).toBeInTheDocument()
    });
  });
});
