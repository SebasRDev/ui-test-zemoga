import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { calculateDiferenceDates, calculatePercentage } from './utils';

describe("tests calculateDiferenceDates", ()=>{
  beforeEach(()=>{
    vi.useFakeTimers();
  })

  afterEach(()=>{
    vi.useRealTimers();
  })

  it("should return 18 days ago", ()=>{
    const date = new Date("2024-03-09T23:56:57.892Z")
    vi.setSystemTime(date)
    const dateString = "2024-02-20T23:08:57.892Z";
    const result = calculateDiferenceDates(dateString);
    expect(result).toBe("18 days ago");
  })
  it("should return 1 month ago", ()=>{
    const date = new Date("2024-03-09T23:56:57.892Z")
    vi.setSystemTime(date)
    const dateString = "2024-02-02T23:10:19.134Z";
    const result = calculateDiferenceDates(dateString);
    expect(result).toBe("1 month ago");
  })
  it("should return 3 years ago", ()=>{
    const date = new Date("2024-03-09T23:56:57.892Z")
    vi.setSystemTime(date)
    const dateString = "2020-12-10T23:41:07.120Z";
    const result = calculateDiferenceDates(dateString);
    expect(result).toBe("3 years ago");
  })
})

describe("tests calculatePercentage", ()=>{
  it("should return 39.0% positive and 61.0% negative", ()=>{
    const result = calculatePercentage(23, 36);
    expect(result).toEqual({
      positive: "39.0%",
      negative: "61.0%"
    });
  })
  it("should return 50.0% positive and 50.0% negative", ()=>{
    const result = calculatePercentage(50, 50);
    expect(result).toEqual({
      positive: "50.0%",
      negative: "50.0%"
    });
  })
  it("should return 100.0% positive and 0.0% negative", ()=>{
    const result = calculatePercentage(100, 0);
    expect(result).toEqual({
      positive: "100.0%",
      negative: "0.0%"
    });
  })
  it("should return 0.0% positive and 100.0% negative", ()=>{
    const result = calculatePercentage(0, 100);
    expect(result).toEqual({
      positive: "0.0%",
      negative: "100.0%"
    });
  })
  it("should return 56.3% positive and 43.7% negative", ()=>{
    const result = calculatePercentage(418, 324);
    expect(result).toEqual({
      positive: "56.3%",
      negative: "43.7%"
    });
  })
})