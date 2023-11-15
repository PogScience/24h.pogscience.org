export function capitalize(s) {
    return s[0].toUpperCase() + s.slice(1);
}

export function displayOffset(offset) {
    offset = -offset / 60
    return "UTC" + (offset > 0 ? "+" : "-") + Math.abs(offset)
}
