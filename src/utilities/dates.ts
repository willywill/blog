const utcLongDateFormatter = new Intl.DateTimeFormat('en-US', {
  timeZone: 'UTC',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

const utcShortDateFormatter = new Intl.DateTimeFormat('en-US', {
  timeZone: 'UTC',
  year: 'numeric',
  month: 'short',
  day: 'numeric',
});

const easternReleaseFormatter = new Intl.DateTimeFormat('en-US', {
  timeZone: 'America/New_York',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
});

export function formatBlogDate(date: Date, variant: 'long' | 'short' = 'long') {
  return variant === 'short'
    ? utcShortDateFormatter.format(date)
    : utcLongDateFormatter.format(date);
}

export function formatEasternRelease(date: Date) {
  return `${easternReleaseFormatter.format(date)} ET`;
}
