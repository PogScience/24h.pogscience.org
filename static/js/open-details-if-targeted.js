/**
 * <details> elements that are targeted or child of a targeted element
 * will open automatically on page load.
 */

;(() => {
    let initialTarget = document.getElementById(window.location.hash.substring(1))
    if (!initialTarget) return

    if (initialTarget.tagName === "DETAILS") {
        initialTarget.open = true
    }

    initialTarget.querySelectorAll("details").forEach(detailsElement => {
        detailsElement.open = true
    })
})()
