function retoque() {
    if(!document.getElementById("body-retoque")) return;

    beforeAfterSliders()
    imgNodragnoConMenu()
    iconsFunctions()
}

function iconsFunctions() {
    const icons = document.querySelectorAll(".image-icons svg") as NodeListOf<HTMLElement>
    icons.forEach(icon=>icon.onclick = e=>{
        const target = e.currentTarget as HTMLElement
        const highestParent = target.parentNode!.parentNode! as HTMLElement        
        const imgid:number = Number(highestParent.dataset.imgid)
        const imgidZoom:number = Number(highestParent.dataset.imgidzoom)
        const imgidMask:number = Number(highestParent.dataset.imgidmask)

        let cssBgExt:string = "jpg"
        if(document.documentElement.classList.contains("webp")){
            cssBgExt = "webp"
        }

        /* Active */
        if(!target.classList.contains("icon-maximize")) {
            target.classList.toggle("icon-active")
        }

        if(target.classList.contains("icon-brush")) {
            const zoomIcon = target.parentElement!.querySelector(".icon-zoom")
            zoomIcon!.classList.remove("icon-active")
        } else if(target.classList.contains("icon-zoom")) {
            const maskIcon = target.parentElement!.querySelector(".icon-brush")
            maskIcon!.classList.remove("icon-active")
        }

        /* FullSize */
        if(target.classList.contains("icon-maximize")) {
            console.log("FullSize imagen: " + imgid)
        }

        /* zoom */
        if(target.classList.contains("icon-zoom")) {
            let source = highestParent.querySelector(".rp-picture source") as HTMLImageElement
            let img = highestParent.querySelector(".rp-picture img") as HTMLImageElement
            let divBefore = highestParent.querySelector(".rp-before") as HTMLElement

            let imgToShow:number
            if(target.classList.contains("icon-active")) {
                imgToShow = imgidZoom
            } else {
                imgToShow = imgid
            }
            source!.srcset = `/build/img/retoque/${imgToShow}-a.webp`
            img!.src = `/build/img/retoque/${imgToShow}-a.jpg`
            divBefore!.style.backgroundImage = `url(/build/img/retoque/${imgToShow}-b.${cssBgExt})`
        }

        /* mask */
        if(target.classList.contains("icon-brush")) {
            let source = highestParent.querySelector(".rp-picture source") as HTMLImageElement
            let img = highestParent.querySelector(".rp-picture img") as HTMLImageElement
            let divBefore = highestParent.querySelector(".rp-before") as HTMLElement

            let imgToShow:number
            let imgType:string
            if(target.classList.contains("icon-active")) {
                imgToShow = imgidMask
                imgType = "1" //mask
            } else {
                imgToShow = imgid
                imgType = "b"
            }
            source!.srcset = `/build/img/retoque/${imgToShow}-a.webp`
            img!.src = `/build/img/retoque/${imgToShow}-a.jpg`
            divBefore!.style.backgroundImage = `url(/build/img/retoque/${imgToShow}-${imgType}.${cssBgExt})`
        }
    })
}

function imgNodragnoConMenu() {
    const imgs = document.getElementsByTagName("img")
    for(let img of imgs){
        img.oncontextmenu = e=>e.preventDefault()
        img.ondragstart = e=>e.preventDefault()
    }
}

function beforeAfterSliders() {
    const sliders = document.querySelectorAll(".slider-input")
    sliders.forEach(slider=>{
        slider.addEventListener("input", function(e){
            const target = e.target as HTMLInputElement

            const line = target.parentNode!.children[2] as HTMLInputElement
            const before = target.parentNode!.children[1] as HTMLInputElement   
            const value = target.value + "%"

            line.style.left = value
            before.style.width = value
        })

        slider.addEventListener("mousedown", function(e){
            const target = e.target as HTMLInputElement
            
            const circle = target.parentNode!.children[2].children[1]
            circle.classList.add("transparent")

            const line = target.parentNode!.children[2].children[0]
            line.classList.add("mousedown")
        })
        
        slider.addEventListener("mouseup", function(e){
            const target = e.target as HTMLInputElement
            
            const circle = target.parentNode!.children[2].children[1]
            circle.classList.remove("transparent")

            const line = target.parentNode!.children[2].children[0]
            line.classList.remove("mousedown")
        })
    })
}