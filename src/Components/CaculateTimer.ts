export default function CaculateTimer(count: number): Array<number | string> {
  const hours: number = Math.floor(count / 3600);
  const min: number = Math.floor((count - (hours * 3600)) / 60);
  const seconds: number = count - (hours * 3600) - (min * 60);

  const hoursFormat = hours < 10 ? `0${hours}` : `${hours}`;
  const minFormat = min < 10 ? `0${min}` : `${min}`;
  const secondsFormat = seconds < 10 ? `0${seconds}` : `${seconds}`;

  return [hoursFormat, minFormat, secondsFormat];
}
