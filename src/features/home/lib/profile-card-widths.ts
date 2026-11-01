export function distributeProfileWidths(equalWidth: number, preferredWidths: readonly number[], minimumWidth: number): number[] {
  const minimum = Math.min(equalWidth, Math.max(0, minimumWidth));
  const surplus = preferredWidths.map(width => Math.max(0, equalWidth - Math.max(minimum, width)));
  const deficits = preferredWidths.map(width => Math.max(0, width - equalWidth));
  const available = surplus.reduce((total, value) => total + value, 0);
  const needed = deficits.reduce((total, value) => total + value, 0);
  const transfer = Math.min(available, needed);
  if (!transfer) return preferredWidths.map(() => equalWidth);
  if (available >= needed) {
    const required = preferredWidths.map(width => Math.max(minimum, width));
    const remaining = equalWidth * required.length - required.reduce((total, width) => total + width, 0);
    return required.map(width => width + remaining / required.length);
  }
  let low = 0;
  let high = Math.max(...surplus);
  for (let iteration = 0; iteration < 48; iteration++) {
    const level = (low + high) / 2;
    const remaining = surplus.reduce((total, value) => total + Math.min(value, level), 0);
    if (remaining < available - transfer) low = level;
    else high = level;
  }
  return preferredWidths.map((_, index) => equalWidth - surplus[index] + Math.min(surplus[index], high) + transfer * deficits[index] / needed);
}

export function roundProfileWidths(widths: readonly number[]): number[] {
  let boundary = 0;
  return widths.map(width => {
    const start = Math.round(boundary);
    boundary += width;
    return Math.round(boundary) - start;
  });
}
