function retoque() {
    if(!document.getElementById("body-retoque")) return;

    const sliders = document.querySelectorAll(".slider-input")
    sliders.forEach(slider=>{
        slider.addEventListener("input", function(e){
            //@ts-ignore
            const line = e.target.parentNode.children[2]
            //@ts-ignore
            const before = e.target.parentNode.children[1]
            //@ts-ignore
            const value = e.target.value + "%"

            line.style.left = value
            before.style.width = value
        })
        slider.addEventListener("mousedown", function(e){
            //@ts-ignore
            const circle = e.target.parentNode.children[2].children[1]
            circle.classList.add("transparent")

            //@ts-ignore
            const line = e.target.parentNode.children[2].children[0]
            line.classList.add("mousedown")
        })
        slider.addEventListener("mouseup", function(e){
            //@ts-ignore
            const circle = e.target.parentNode.children[2].children[1]
            circle.classList.remove("transparent")

            //@ts-ignore
            const line = e.target.parentNode.children[2].children[0]
            line.classList.remove("mousedown")
        })
    })
}