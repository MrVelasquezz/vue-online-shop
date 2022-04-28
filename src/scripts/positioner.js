const positioner = () => {
        const main = document.getElementsByClassName('main')[0]
        const coords = main.getBoundingClientRect()
        if (window[0].outerWidth <= 480) {
            return coords.left + coords.width - 130;
        } else {
            return coords.left + coords.width - 170;
        }
    }

export { positioner }