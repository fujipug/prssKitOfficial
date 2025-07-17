export default function formatBytes(sizeInBytes: number, decimalPlaces: number = 2): string {
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  if (sizeInBytes === 0) {
    return `0 ${units[0]}`;
  }

  let unitIndex = 0;
  let size = sizeInBytes;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(decimalPlaces)} ${units[unitIndex]}`;
}