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

  it("renders metrics after loading", async () => {
    render(<KeyMetrics />);

    // Wait for the metrics to be loaded and rendered
    await waitFor(() => {
      expect(screen.getByText("Total Users")).toBeInTheDocument();
    });

    // Check if all metrics are rendered correctly
    expect(screen.getByText("1,000,000")).toBeInTheDocument();
    expect(screen.getByText("Active Users")).toBeInTheDocument();
    expect(screen.getByText("750,000")).toBeInTheDocument();
    expect(screen.getByText("Total Streams")).toBeInTheDocument();
    expect(screen.getByText("5,000,000")).toBeInTheDocument();
    expect(screen.getByText("Revenue")).toBeInTheDocument();
    expect(screen.getByText("$10,000,000")).toBeInTheDocument();

    // Check for the trend indicators
    expect(screen.getByText("+0.54")).toBeInTheDocument();
    expect(screen.getByText("+7.68")).toBeInTheDocument();
    expect(screen.getByText("+6.03")).toBeInTheDocument();
    expect(screen.getByText("+0.14")).toBeInTheDocument();
  });

  it("renders correctly when metrics are null", () => {
    mockedUseStore.mockReturnValue({
      metrics: null,
      setMetrics: jest.fn(),
    } as any);

    render(<KeyMetrics />);

    // Check if all metric titles are rendered
    expect(screen.getByText("Total Users")).toBeInTheDocument();
    expect(screen.getByText("Active Users")).toBeInTheDocument();
    expect(screen.getByText("Total Streams")).toBeInTheDocument();
    expect(screen.getByText("Revenue")).toBeInTheDocument();

    // Check if trend indicators are still present
    expect(screen.getByText("+0.54")).toBeInTheDocument();
    expect(screen.getByText("+7.68")).toBeInTheDocument();
    expect(screen.getByText("+6.03")).toBeInTheDocument();
    expect(screen.getByText("+0.14")).toBeInTheDocument();
  });
});
