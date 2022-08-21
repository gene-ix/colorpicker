window.onload = () => {

    let Ul = () => {
        let element = document.createElement(`ul`);
        return element;
    };

    let Li = (height, childs) => {
        let element = document.createElement(`li`);
        element.style.height = `${height}px`;
        childs.forEach(child => {
            element.appendChild(child);
        });
        return element;
    };

    let Label = (color, fortarget) => {
        let element = document.createElement(`label`);
        element.style.backgroundColor = color;
        element.setAttribute(`for`, fortarget);
        element.setAttribute(`onclick`, `SetColorValue(this)`);
        return element;
    };

    let Radio = (name, id) => {
        let element = document.createElement(`input`);
        element.setAttribute(`type`, `radio`);
        element.setAttribute(`name`, name);
        element.setAttribute(`id`, id);
        return element;
    };

    let target = document.querySelectorAll(`.colorpicker`);

    target.forEach((div, index) => {

        let lightnessStep = Number(div.getAttribute(`data-lightnessStep`) || 6);
        let hueStep = Number(div.getAttribute(`data-hueStep`) || 12);
        let height = div.clientWidth / hueStep;

        for (let i = 0; i < lightnessStep; i++) {
            let ul = Ul();
            div.appendChild(ul);
            let lightness = 100 - ((i + 1) * 100 / lightnessStep);

            for (let j = 0; j < hueStep; j++) {
                let hue = 360 * j / hueStep;
                let darkness = 100 * j / (hueStep - 1);
                let color = (i < lightnessStep - 1) ? `hsl(${hue}, 100%, ${lightness}%)` : `hsl(0, 0%, ${darkness}%)`;

                let radio = Radio(`colorpicker${index}`, `${index}-${i}-${j}`)
                let label = Label(color, `${index}-${i}-${j}`);
                let li = Li(height, [radio, label]);
                ul.appendChild(li);
            }
        }
    });
};

function SetColorValue(element) {
    let targetInputId = element.closest(`.colorpicker`).getAttribute(`data-targetInputId`);
    let targetInput = document.querySelector(`#${targetInputId}`);
    targetInput.value = element.style.backgroundColor;
}