import { DurationPipe } from './duration.pipe';

describe('DurationPipe', () => {
  const pipe = new DurationPipe();

  it('transforms 90 minutes to "1h 30m"', () => {
    expect(pipe.transform(90)).toBe('1h 30m');
  });

  it('transforms 45 minutes to "45m"', () => {
    expect(pipe.transform(45)).toBe('45m');
  });

  it('handles 0 minutes', () => {
    expect(pipe.transform(0)).toBe('0m');
  });
});