import {ElementsFactory} from './home-scripts/elements.js'


const HTMLElements =  ElementsFactory();

HTMLElements.inputSearch.addEventListener("change", () => {
    console.log("a")
})