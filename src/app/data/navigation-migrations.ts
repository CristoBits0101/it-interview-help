const branch = (labels: string[]) => labels.map(encodeURIComponent).join('/');
const moves: [string[], string[]][] = [
  [['Data Management', 'Database Management'], ['Data', 'Data Engineering', 'Database Management']],
  [['Data Management', 'Data Engineering'], ['Data', 'Data Engineering']],
  [['Software Development'], ['Software Engineering', 'Software Development']],
  [['Mathematical and Statistical Foundations'], ['Data', 'Data Science', 'Mathematical and Statistical Foundations']],
  [['Data', 'Data Science', 'Data Analytics'], ['Data', 'Data Analytics']],
  [['Data Science', 'Data Analytics'], ['Data', 'Data Analytics']],
  [['Data Science', 'Mathematics'], ['Data', 'Data Science', 'Mathematical and Statistical Foundations']],
  [['Mathematics'], ['Data', 'Data Science', 'Mathematical and Statistical Foundations']],
  [['Data Management and Engineering', 'Data Management'], ['Data', 'Data Engineering', 'Database Management']],
  [['Data Management and Engineering', 'Data Engineering'], ['Data', 'Data Engineering', 'Data Integration']],
  [['Data Management and Engineering'], ['Data', 'Data Engineering']],
  [['Data Engineering', 'Data Management'], ['Data', 'Data Engineering', 'Database Management']],
  [['Data Engineering', 'Data Engineering'], ['Data', 'Data Engineering', 'Data Integration']],
  [['Data Management'], ['Data', 'Data Engineering', 'Database Management']],
  [['Data Engineering'], ['Data', 'Data Engineering']],
  [['Data Science'], ['Data', 'Data Science']],
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
