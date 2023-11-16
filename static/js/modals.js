/**
 * Modals on <detail> elements with class `has-modal`.
 */

;(() => {
    document.querySelectorAll("details.has-modal").forEach(modal => {
        const closers = modal.querySelectorAll(".modal-background, .modal-close")
        closers.forEach(closer => closer.addEventListener("click", () => {
            modal.removeAttribute("open")
        }))
    })
})()
