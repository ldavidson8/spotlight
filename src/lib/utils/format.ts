export function formatDate(dateString: string | null): string {
	if (!dateString) return 'Unknown';
	return new Intl.DateTimeFormat('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	}).format(new Date(dateString));
}

export function formatYear(dateString: string | null): string {
	if (!dateString) return '';
	return new Date(dateString).getFullYear().toString();
}

export function formatCurrency(amount: number): string {
	if (!amount) return 'N/A';
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		maximumFractionDigits: 0
	}).format(amount);
}

export function formatRuntime(minutes: number): string {
	const h = Math.floor(minutes / 60);
	const m = minutes % 60;
	return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

export function formatVoteAverage(vote: number): string {
	return (Math.round(vote * 10) / 10).toFixed(1);
}
