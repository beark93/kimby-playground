const regions = [
  { value: '1', text: 'America' },
  { value: '2', text: 'Europe' },
  { value: '3', text: 'Asia' },
];

const hcs = [
  { value: '1', text: 'HardCore' },
  { value: '2', text: 'SoftCore' },
];

const defaultUberList = [
  { progress: '0', region: '1', ladder: '0', hc: '1' },
  { progress: '0', region: '1', ladder: '0', hc: '2' },
  { progress: '0', region: '2', ladder: '0', hc: '1' },
  { progress: '0', region: '2', ladder: '0', hc: '2' },
  { progress: '0', region: '3', ladder: '0', hc: '1' },
  { progress: '0', region: '3', ladder: '0', hc: '2' },
];

export type UberType = {
  progress: string;
  region: string;
  ladder: string;
  hc: string;
};

export function getDefaultUberList() {
  return defaultUberList;
}

export function getUberLabel(progress: string, region: string, hc: string) {
  const regionText = regions.find((it) => it.value === region)?.text;
  const hcText = hcs.find((it) => it.value === hc)?.text;
  return `${regionText}: ${hcText} (${progress}/6)`;
}

export function getUberProgressValue(progress: string) {
  return parseInt(((parseInt(progress) / 6) * 100).toFixed(2));
}

export function getUberProgressColor(progress: string) {
  const percent = getUberProgressValue(progress);
  return percent < 30
    ? 'primary'
    : percent < 50
    ? 'success'
    : percent < 70
    ? 'secondary'
    : 'error';
}
