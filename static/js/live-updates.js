;(() => {
    function updateLiveEvents() {
        const now = new Date()

        /**
         * @type {HTMLTemplateElement}
         */
        const liveEventTemplate = document.getElementById("live-event-item")
        const overlaysContainer = document.getElementById("live-events")
        const defaultLiveEvent = overlaysContainer.querySelector(".live-event-container.default-live-event")

        /**
         * Events that are live right now
         * Object ID -> HTML element for this event in the events list
         * @type {{string: HTMLElement}}
         */
        const liveNow = {}

        /**
         * Live tags on events
         */
        document.querySelectorAll(".is-events-list").forEach(eventsListElement => {
            const globalStart = new Date(eventsListElement.dataset.globalStart)
            const globalEnd = new Date(eventsListElement.dataset.globalEnd)

            if (globalStart > now) {
                // If the event is not started *at all*, we know that nothing below will be useful as it
                // won't change anything on the page: everything is generated in the pre-event state.
                // So we stop here.
                //
                // Note: we don't stop here if the event is globally finished as we may be called when
                // the event was *just finished*, where we need to clean up old live tags, etc.
                // FIXME We could further optimize that by adding some flag when everything is finished
                //  *and* cleaned up.
                return
            }

            eventsListElement.querySelectorAll("article[data-datetime][data-datetime-end]").forEach(eventElement => {
                const begin = new Date(eventElement.dataset.datetime)
                const end = new Date(eventElement.dataset.datetimeEnd)

                if (begin <= now && end >= now) {
                    liveNow[eventElement.id] = eventElement

                    if (eventElement.querySelector("a.is-live")) return;

                    const liveTemplate = eventElement.querySelector(".event-live-template")
                    const heading = eventElement.querySelector("h3.is-event-title")

                    heading.prepend(liveTemplate.content.cloneNode(true))
                } else {
                    const liveTag = eventElement.querySelector("a.is-live");
                    if (liveTag) {
                        liveTag.remove()
                    }

                    if (end < now) {
                        // If everything is finished, the page is on an “archive” state, used to spotlight
                        // what this event will be or was, with all replays in the latter case, etc.
                        // We don't want to dim everything at this point.
                        if (globalEnd > now) {
                            eventElement.classList.add("is-past")
                        } else {
                            eventElement.classList.remove("is-past")
                        }
                    }
                }
            })
        })

        /**
         * Overlay live event update
         */
        // If nobody is live: we display the default pseudo-event
        if (Object.keys(liveNow).length === 0) {
            overlaysContainer.querySelectorAll(".live-event-container.live-now").forEach(e => e.remove())
            if (defaultLiveEvent) {
                defaultLiveEvent.classList.remove("is-hidden")
                defaultLiveEvent.removeAttribute("aria-hidden")
            }
        } else {
            if (defaultLiveEvent) {
                defaultLiveEvent.classList.add("is-hidden")
                defaultLiveEvent.setAttribute("aria-hidden", "true")
            }

            // We loop over existing displayed live events.
            // If they are in our list, we skip and remove them from our list.
            // If they are *not* in our list, that means they are no longer live: we remove them from the DOM.
            // In the end we'll have a list of live events not already displayed.
            overlaysContainer.querySelectorAll(".live-event-container.live-now").forEach(e => {
                const eventID = e.dataset.id
                if (liveNow[eventID]) {
                    delete liveNow[eventID]
                } else {
                    e.remove()
                }
            })

            // Now we add missing live events. They are guaranteed to be in order: existing live events were added
            // before, so they are after in time (else they would have been added earlier).
            Object.keys(liveNow).forEach(eventID => {
                /**
                 * @type HTMLElement
                 */
                const eventListElem = liveNow[eventID]
                const liveEventFragment = liveEventTemplate.content.firstElementChild.cloneNode(true)

                liveEventFragment.dataset.id = eventID

                /**
                 * @type HTMLImageElement
                 */
                const avatar = liveEventFragment.querySelector(":scope > figure img")
                avatar.src = eventListElem.dataset.avatarLarge
                avatar.alt = eventListElem.dataset.streamHandle

                const content = liveEventFragment.querySelector(":scope > article")
                content.innerHTML = eventListElem.querySelector("summary header").innerHTML
                content.querySelector("a.is-live").remove() // Removes the live tag, as we have our own.
                content.querySelector("p.replay")?.remove() // Removes the replay link (if any), as we don't want to
                                                            // display that here; if there is indeed a replay, the main
                                                            // link would target it anyway. Also, that should not happen.

                /**
                 * @type HTMLAnchorElement
                 */
                const button = liveEventFragment.querySelector(":scope > aside > a.twitch-button")
                button.href = eventListElem.dataset.streamLink
                button.querySelector("span").innerHTML = "Regarder"

                /**
                 * @type HTMLAnchorElement
                 */
                const detailsAnchor = liveEventFragment.querySelector(":scope > aside > a.details-anchor")
                detailsAnchor.href = "#" + eventID

                overlaysContainer.appendChild(liveEventFragment)
            })
        }
    }

    updateLiveEvents()
    setInterval(updateLiveEvents, 60000)
})()
