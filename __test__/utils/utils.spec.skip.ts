import {
  getDefaultUberList,
  getUberLabel,
  getUberProgressValue,
  getUberProgressColor,
} from '../../src/utils/uber';

describe('utils test', () => {
  it('uber util function test', () => {
    const testUberState = { progress: '2', region: '3', hc: '1' };

    expect(getDefaultUberList().length).toBe(6);

    expect(
      getUberLabel(
        testUberState.progress,
        testUberState.region,
        testUberState.hc
      )
    ).toBe('Asia: HardCore (2/6)');

    expect(getUberProgressValue(testUberState.progress)).toBe(33.33);

    expect(getUberProgressColor(testUberState.progress)).toBe('success');
  });
});
