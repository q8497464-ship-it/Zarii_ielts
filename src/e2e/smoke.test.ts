import { describe, it, expect } from 'vitest';
import { FULL_MOCK_TESTS, getFullMockById } from '../features/mock/mockData';
import fs from 'fs';
import path from 'path';

describe('End-to-End Smoke Tests: Full Mock Exam System', () => {
  it('loads all 3 full mock exam packages successfully', () => {
    expect(FULL_MOCK_TESTS.length).toBe(3);
    const mock1 = getFullMockById('mock-acad-01');
    expect(mock1).toBeDefined();
    expect(mock1?.testType).toBe('academic');
    expect(mock1?.readingTest.passages.length).toBe(3);
    expect(mock1?.listeningTest.sections.length).toBe(4);
    expect(mock1?.writingTask1).toBeDefined();
    expect(mock1?.writingTask2).toBeDefined();
    expect(mock1?.speakingTopics.length).toBe(3);
  });

  it('verifies official IELTS rounding rules for overall band calculation', () => {
    function computeOverallBand(l: number, r: number, w: number, s: number): number {
      const avg = (l + r + w + s) / 4;
      const decimal = avg - Math.floor(avg);
      if (decimal < 0.25) return Math.floor(avg);
      if (decimal < 0.75) return Math.floor(avg) + 0.5;
      return Math.ceil(avg);
    }

    // 7.125 rounds down to 7.0
    expect(computeOverallBand(7.0, 7.0, 7.0, 7.5)).toBe(7.0);

    // 7.25 rounds up to 7.5
    expect(computeOverallBand(7.0, 7.0, 7.5, 7.5)).toBe(7.5);

    // 7.625 rounds down to 7.5
    expect(computeOverallBand(7.5, 7.5, 7.5, 8.0)).toBe(7.5);

    // 7.75 rounds up to 8.0
    expect(computeOverallBand(7.5, 8.0, 7.5, 8.0)).toBe(8.0);
  });
});

describe('End-to-End Smoke Tests: PWA & Static Assets', () => {
  it('verifies that public/manifest.json exists and contains required PWA metadata', () => {
    const manifestPath = path.resolve(process.cwd(), 'public/manifest.json');
    expect(fs.existsSync(manifestPath)).toBe(true);

    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    expect(manifest.name).toBe('Zarii IELTS Preparation');
    expect(manifest.short_name).toBe('Zarii');
    expect(manifest.start_url).toBe('/');
    expect(manifest.display).toBe('standalone');
    expect(manifest.icons.length).toBeGreaterThanOrEqual(1);
  });

  it('verifies that public/sw.js exists and registers static asset caching', () => {
    const swPath = path.resolve(process.cwd(), 'public/sw.js');
    expect(fs.existsSync(swPath)).toBe(true);

    const swContent = fs.readFileSync(swPath, 'utf8');
    expect(swContent).toContain('addEventListener(\'install\'');
    expect(swContent).toContain('addEventListener(\'fetch\'');
  });

  it('verifies that content/SCHEMA.md and CONTRIBUTING.md exist', () => {
    const schemaPath = path.resolve(process.cwd(), 'content/SCHEMA.md');
    const contribPath = path.resolve(process.cwd(), 'CONTRIBUTING.md');
    expect(fs.existsSync(schemaPath)).toBe(true);
    expect(fs.existsSync(contribPath)).toBe(true);
  });
});
