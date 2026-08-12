export function todayLabel(): string {
  const d = new Date();
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function maskReference(ref: string): string {
  const digits = ref.replace(/\D/g, '');
  if (digits.length >= 4) {
    return `•••• •••• ${digits.slice(-4)}`;
  }
  return ref.trim().length > 0 ? ref : '•••• ••••';
}

export function greetingForTime(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}
