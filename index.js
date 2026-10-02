fetch("data.json")
.then((response) => response.json())
.then((data) => {
    function dataInit (lowerLetters) {
        data.forEach((title) => {
                const labels = { daily: "Yesterday", weekly: "Last Week", monthly: "Last Month"};
                const inFrames = [
                    {opacity: 0 }, {opacity: 1},
                ];
                const inOptions = {
                    duration: 150,
                    iterations: 1,
                    fill: 'forwards'
                };
                const outFrames = [
                    {opacity: 1 }, {opacity: 0},
                ];
                const outOptions = {
                    duration: 150,
                    iterations: 1,
                    fill: 'forwards'
                };
                const currentHoursElement = document.querySelector(`.${title.title.toLowerCase().replace("self care", "selfcare")} .current-hours`);
                const animCurrent = currentHoursElement.animate(outFrames, outOptions);
                const previousHoursElement = document.querySelector(`.${title.title.toLowerCase().replace("self care", "selfcare")} .previous-hours time`);
                const animPrevious = previousHoursElement.animate(outFrames, outOptions);

                animCurrent.finished.then(() => {
                    currentHoursElement.animate(inFrames, inOptions);
                    currentHoursElement.textContent = `${title.timeframes[lowerLetters].current}hrs`;
                });
                animPrevious.finished.then(() => {
                    previousHoursElement.animate(inFrames, outOptions);
                    previousHoursElement.textContent = `${labels[lowerLetters]} - ${title.timeframes[lowerLetters].previous}hrs`;
                })
            });
            // Botón del nav activo y activación de los otros botones al hacer click
            document.querySelectorAll("nav button").forEach((button) => {
                button.classList.remove("active");
                if (button.textContent.toLowerCase() === lowerLetters) {
                    button.classList.add("active");
                };
            });
    };
    // Capta el evento (click) en cada botón
    document.querySelectorAll("nav button").forEach((button) => {
        button.addEventListener("click", (event) => {
            const lowerLetters = event.target.textContent.toLowerCase();
            dataInit(lowerLetters);
        });
    });
    dataInit("weekly");
})
.catch((error) => console.error("Error to load JSON file:", error));
