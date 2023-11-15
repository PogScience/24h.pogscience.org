import {capitalize} from "./utils/text.js";

/**
 * Inserts titles with dates in events lists.
 * This is inserted using JavaScript, so it follows users’ timezones.
 */

;(() => {
    const dateFormat = new Intl.DateTimeFormat('fr', {
        weekday: "long",
        day: "numeric",
        month: "long",
    })

    const headingTemplate = document.getElementById("events-day-heading")

    document.querySelectorAll(".is-events-list").forEach(eventsListElement => {
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
