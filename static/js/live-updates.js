;(() => {
    function updateLiveEvents() {
        document.querySelectorAll(".is-events-list").forEach(eventsListElement => {
            eventsListElement.querySelectorAll("article[data-datetime][data-datetime-end]").forEach(eventElement => {
                const begin = new Date(eventElement.dataset.datetime)
                const end = new Date(eventElement.dataset.datetimeEnd)
                const now = new Date()

                if (begin < now && end > now) {
                    if (eventElement.querySelector("a.is-live")) return;

                    const liveTemplate = eventElement.querySelector(".event-live-template")
                    const heading = eventElement.querySelector("h3.is-event-title")

                    heading.prepend(liveTemplate.content.cloneNode(true))
                } else {
                    const liveTag = eventElement.querySelector("a.is-live");
                    if (liveTag) {
                        liveTag.remove()
                    }

                    if (begin < now) {
                        eventElement.classList.add("is-past")
                    }
                }
            })
        })
    }

    updateLiveEvents()
    setInterval(updateLiveEvents, 60000)
})()
