// Utility to format duration string (e.g. "1d", "7d", "30d", "lifetime")
// into a human-readable label based on the current language.
// The admin panel only needs to store the duration string (e.g. "7d")
// and this function generates the label for display.

type TranslateFn = (key: string) => string;

export function formatDuration(duration: string, t: TranslateFn): string {
    if (duration === "lifetime") {
        return t("dur.lifetime");
    }

    const match = duration.match(/^(\d+)d$/);
    if (!match) return duration;

    const days = parseInt(match[1], 10);

    if (days === 1) return `1 ${t("dur.day_1")}`;
    if (days === 7) return `1 ${t("dur.week")}`;
    if (days === 30) return `1 ${t("dur.month")}`;
    if (days === 90) return `3 ${t("dur.month")}`;
    if (days === 180) return `6 ${t("dur.month")}`;
    if (days === 365) return `1 ${t("dur.lifetime") === "Навсегда" ? "Год" : "Year"}`;

    // For other day counts, use proper Russian pluralization
    if (days >= 2 && days <= 4) return `${days} ${t("dur.day_few")}`;
    if (days >= 5 && days <= 20) return `${days} ${t("dur.day_many")}`;

    const lastDigit = days % 10;
    const lastTwoDigits = days % 100;
    if (lastDigit === 1 && lastTwoDigits !== 11) return `${days} ${t("dur.day_1")}`;
    if (lastDigit >= 2 && lastDigit <= 4 && (lastTwoDigits < 12 || lastTwoDigits > 14)) return `${days} ${t("dur.day_few")}`;
    return `${days} ${t("dur.day_many")}`;
}
