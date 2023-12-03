/**
 * <details> elements that are targeted or direct child of a targeted element
 * will open automatically on page load or anchor change.
 */

;(() => {

    /**
     * Opens <details> elements that are targeted or direct children of targeted elements.
     */
    function openDetailsFromHash() {
        let hash = window.location.hash.substring(1)
        if (!hash) return

        let target = document.getElementById(window.location.hash.substring(1))
        if (!target) return

        if (target.tagName === "DETAILS") {
            target.open = true
        }

        target.querySelectorAll(":scope > details").forEach(detailsElement => {
            detailsElement.open = true
        })
    }

    window.addEventListener("hashchange", openDetailsFromHash)

    openDetailsFromHash()
})()
