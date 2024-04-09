type FormatStyle = 'long' | 'short';

const long = new Intl.DateTimeFormat('pt-BR', {
  weekday: 'long',
});

const short = new Intl.DateTimeFormat('pt-BR', {
  weekday: 'short',
});

export default function useWeekDay(style: FormatStyle, date: Date): string {
  const formatter = style === 'long' ? long : short;
  return formatter.format(date);
}
