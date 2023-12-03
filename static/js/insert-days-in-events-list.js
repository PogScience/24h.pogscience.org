import {capitalize} from "./utils/text.js";

/**
 * Inserts titles with dates in events lists.
 * This is inserted using JavaScript, so it follows users’ timezones.
 */

;(() => {
    const now = new Date()
    const headingTemplate = document.getElementById("events-day-heading")

    document.querySelectorAll(".is-events-list").forEach(eventsListElement => {
        const globalEnd = new Date(eventsListElement.dataset.globalEnd)

        /**
         * @type {DateTimeFormatOptions}
         */
        let dateFormatOptions;

        // When the whole event is finished, we display the years to
        // make it clear that the event is now over.
        if (globalEnd > now) {
            dateFormatOptions = {
                weekday: "long",
                day: "numeric",
                month: "long",
            }
        } else {
            dateFormatOptions = {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
            }
        }

        const dateFormat = new Intl.DateTimeFormat('fr', dateFormatOptions)

        let currentDate = undefined

        eventsListElement.querySelectorAll("article[data-datetime]").forEach(eventElement => {
            let date = new Date(eventElement.dataset.datetime)
            if (!currentDate || date.getDay() !== currentDate.getDay()) {
                /*
                    <h2>
                        <time datetime="{{ iso date }}" class="has-auto-timezone is-date">{{ displayable date }}</time>
                    </h2>
                */
                const heading = headingTemplate.content.cloneNode(true)

                const time = heading.querySelector("time")
                time.setAttribute("datetime", date.toISOString())
                time.innerText = capitalize(dateFormat.format(date))

                eventsListElement.insertBefore(heading, eventElement)
            }

            currentDate = date
        })
    })
})()
