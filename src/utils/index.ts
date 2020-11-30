export function param2Obj(url: string) {
  const search = url.split('?')[1];
  if (!search) {
    return {};
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
  );
}

export function fixNum(num: number): string {
  return num > 9 ? '' + num : '0' + num;
}

export function formatTime(time: Date) {
  if (time instanceof Date) {
    const year = time.getFullYear();
    const month = time.getMonth() + 1;
    const date = time.getDate();
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    return (
      [year, fixNum(month), fixNum(date)].join('/') +
      ' ' +
      [fixNum(hours), fixNum(minutes), fixNum(seconds)].join(':')
    );
  }
  return '';
}
