const branch = (labels: string[]) => labels.map(encodeURIComponent).join('/');
const moves: [string[], string[]][] = [
  [['Data Science', 'Mathematics'], ['Data Science', 'Mathematical and Statistical Foundations']],
  [['Mathematics'], ['Data Science', 'Mathematical and Statistical Foundations']],
  [['Data Engineering'], ['Data Management and Engineering']],
  [['Data Management'], ['Data Management and Engineering', 'Data Management']],
];

export function migrateBranchId(id: string): string {
  for (const [from, to] of moves) {
    const prefix = branch(from);
    if (id === prefix || id.startsWith(`${prefix}/`)) {
      return branch(to) + id.slice(prefix.length);
    }
  }
  return id;
}
