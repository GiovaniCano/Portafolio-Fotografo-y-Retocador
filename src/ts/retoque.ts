function retoque() {
    const imagesIds:any[] = [ // [ imgId, imgIDzoom, imgIDmask, isHorizontal ]
        [9, 0, 9, false], // isabel
        [3, 0, 3, false], // flores
        [2, 1, 1, false], // cel
        [7, 0, 7, true], // labios rojos
        [8, 0, 8, true], // ojos
        [5, 4, 4, false], // modelo 1
        [6, 0, 0, true], // labios azules
        [10, 0, 0, true] // modelo 0
    ]
    const isWebp:boolean = document.documentElement.classList.contains("webp")

    imagesIds.forEach(image=>{
        const imageOBJ = new RetouchPhoto(image[0], image[1], image[2], isWebp, image[3])
        const imageHtml = imageOBJ.makeRPWrapper()

        const contentDiv = document.querySelector("#body-retoque #content")
        contentDiv!.appendChild(imageHtml)
    })
}

/* CLASS */
class RetouchPhoto {
    public imgID:number
    public imgIDzoom:number
    public imgIDmask:number
    public isWebp:boolean
    public bgExt:string
    public isHorizontal:boolean
    public isFullSize:boolean
    constructor(imgID:number, imgIDzoom:number, imgIDmask:number, isWebp:boolean, isHorizontal:boolean, isFullSize:boolean=false) {
        this.imgID = imgID ?? 0
        this.imgIDzoom = imgIDzoom ?? 0
        this.imgIDmask = imgIDmask ?? 0
        this.isWebp = isWebp ?? false
        this.bgExt = isWebp ? "webp" : "jpg"
        this.isHorizontal = isHorizontal ?? false
        this.isFullSize = isFullSize ?? false
    }

    public makeRPWrapper():HTMLDivElement {    
        const rpWrapper = document.createElement("div")
        rpWrapper.classList.add("rp-wrapper")
        if(this.isHorizontal) rpWrapper.classList.add("horizontal")
        rpWrapper.dataset.imgid = this.imgID.toString()
        rpWrapper.dataset.imgidzoom = this.imgIDzoom.toString()
        rpWrapper.dataset.imgidmask = this.imgIDmask.toString()
    
        const rpContent = document.createElement("div")
        rpWrapper.appendChild(rpContent)
        rpContent.classList.add("rp-content")
    
            const picture = document.createElement("picture")
            rpContent.appendChild(picture)
            picture.classList.add("rp-picture")
    
                const source = document.createElement("source")
                picture.appendChild(source)
                source.srcset = `/build/img/retoque/${this.imgID}-a.webp`
    
                const img =document.createElement("img")
                picture.appendChild(img)
                img.src = `/build/img/retoque/${this.imgID}-a.jpg`
                img.loading = "lazy"
                img.oncontextmenu = e=>e.preventDefault()
                img.ondragstart = e=>e.preventDefault()
    
            const rpBefore = document.createElement("div")
            rpContent.appendChild(rpBefore)
            rpBefore.classList.add("rp-before")
            rpBefore.style.backgroundImage = `url(/build/img/retoque/${this.imgID}-b.${this.bgExt})`
    
            const sliderLine = document.createElement("div")
            rpContent.appendChild(sliderLine)
            sliderLine.classList.add("slider-line")
    
                const div1 = document.createElement("div")
                const div2 = document.createElement("div")
                const div3 = document.createElement("div")
                sliderLine.appendChild(div1)
                sliderLine.appendChild(div2)
                sliderLine.appendChild(div3)
                div2.innerHTML = `
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="#ffffff" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M20 15h-8v3.586a1 1 0 0 1 -1.707 .707l-6.586 -6.586a1 1 0 0 1 0 -1.414l6.586 -6.586a1 1 0 0 1 1.707 .707v3.586h8a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1z" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="#ffffff" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M4 9h8v-3.586a1 1 0 0 1 1.707 -.707l6.586 6.586a1 1 0 0 1 0 1.414l-6.586 6.586a1 1 0 0 1 -1.707 -.707v-3.586h-8a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1z" />
                        </svg>
                    `                
    
            const inputSlider = document.createElement("input")
            rpContent.appendChild(inputSlider)
            inputSlider.classList.add("slider-input")
            inputSlider.type = "range"
            inputSlider.min = "0"
            inputSlider.max = "99.5"
            inputSlider.value = "50"
            inputSlider.oninput = e=>this.sliderOnInput(e.target as HTMLInputElement)
            inputSlider.onmousedown = e=>this.sliderOnMouseDown(e.target as HTMLInputElement)
            inputSlider.onmouseup = e=>this.sliderOnMouseUp(e.target as HTMLInputElement)
        //Fin rpContent
    
        const divIcons = document.createElement("div")
        rpWrapper.appendChild(divIcons)
        divIcons.classList.add("image-icons")
            let iconsHtml:string = ""
            if(this.imgIDmask) {
                iconsHtml +=`
                    <svg class="icon-brush" title="Mascara Dodge & Burn" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.9" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M3 21v-4a4 4 0 1 1 4 4h-4" />
                        <path d="M21 3a16 16 0 0 0 -12.8 10.2" />
                        <path d="M21 3a16 16 0 0 1 -10.2 12.8" />
                        <path d="M10.6 9a9 9 0 0 1 4.4 4.4" />
                    </svg>
                `
            }
            if(this.imgIDzoom) {
                iconsHtml +=`
                    <svg class="icon-zoom" title="Zoom" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.9" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <circle cx="10" cy="10" r="7" />
                        <line x1="7" y1="10" x2="13" y2="10" />
                        <line x1="10" y1="7" x2="10" y2="13" />
                        <line x1="21" y1="21" x2="15" y2="15" />
                    </svg>
                `
            }
            if(this.isFullSize) { //minimize
                iconsHtml += `    
                    <svg class="icon-minimize" title="Minimizar Imagen" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <polyline points="5 9 9 9 9 5" />
                        <line x1="3" y1="3" x2="9" y2="9" />
                        <polyline points="5 15 9 15 9 19" />
                        <line x1="3" y1="21" x2="9" y2="15" />
                        <polyline points="19 9 15 9 15 5" />
                        <line x1="15" y1="9" x2="21" y2="3" />
                        <polyline points="19 15 15 15 15 19" />
                        <line x1="15" y1="15" x2="21" y2="21" />
                    </svg>
                `
            } else { //maximize
                iconsHtml += `    
                <svg class="icon-maximize" title="Maximizar Imagen" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.9" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <polyline points="16 4 20 4 20 8" />
                    <line x1="14" y1="10" x2="20" y2="4" />
                    <polyline points="8 20 4 20 4 16" />
                    <line x1="4" y1="20" x2="10" y2="14" />
                    <polyline points="16 20 20 20 20 16" />
                    <line x1="14" y1="14" x2="20" y2="20" />
                    <polyline points="8 4 4 4 4 8" />
                    <line x1="4" y1="4" x2="10" y2="10" />
                </svg>
            `
            }
        divIcons.innerHTML = iconsHtml
        
        const allIcons = divIcons.querySelectorAll("svg")
        allIcons.forEach(icon=>icon.onclick = e=>{
                const target = e.currentTarget as HTMLElement
                const rpWrapper = target.parentNode!.parentNode! as HTMLElement

                let source = rpWrapper.querySelector(".rp-picture source") as HTMLImageElement
                let img = rpWrapper.querySelector(".rp-picture img") as HTMLImageElement
                let divBefore = rpWrapper.querySelector(".rp-before") as HTMLElement
                
            /* Active */
                if(!target.classList.contains("icon-maximize")) {
                    target.classList.toggle("icon-active")
                }
        
                if(target.classList.contains("icon-brush")) {
                    const zoomIcon = target.parentElement!.querySelector(".icon-zoom")
                    if(zoomIcon) zoomIcon.classList.remove("icon-active")
                } else if(target.classList.contains("icon-zoom")) {
                    const maskIcon = target.parentElement!.querySelector(".icon-brush")
                    if(maskIcon) maskIcon.classList.remove("icon-active")
                }
                
            /* Zoom */
                if(target.classList.contains("icon-zoom")) {        
                    let imgToShow:number
                    if(target.classList.contains("icon-active")) {
                        imgToShow = this.imgIDzoom
                    } else {
                        imgToShow = this.imgID
                    }
                    source!.srcset = `/build/img/retoque/${imgToShow}-a.webp`
                    img!.src = `/build/img/retoque/${imgToShow}-a.jpg`
                    divBefore!.style.backgroundImage = `url(/build/img/retoque/${imgToShow}-b.${this.bgExt})`
                }

            /* Brush / mask */
                if(target.classList.contains("icon-brush")) {        
                    let imgToShow:number
                    let imgType:string
                    if(target.classList.contains("icon-active")) {
                        imgToShow = this.imgIDmask
                        imgType = "1" //mask
                    } else {
                        imgToShow = this.imgID
                        imgType = "b"
                    }
                    source!.srcset = `/build/img/retoque/${imgToShow}-a.webp`
                    img!.src = `/build/img/retoque/${imgToShow}-a.jpg`
                    divBefore!.style.backgroundImage = `url(/build/img/retoque/${imgToShow}-${imgType}.${this.bgExt})`
                }

            /* Maximize / Fullsize */
                if(target.classList.contains("icon-maximize")) {
                    this.fullsize()
                }

            /* Minimize / close */
                if(target.classList.contains("icon-minimize")) {
                    document.getElementsByClassName("fullsize-image")[0].remove()
                    document.body.classList.remove("no-scroll")
                }
            }
        )

        return rpWrapper;
    }

    /* Private Methods */

    private fullsize():void {
        document.body.classList.add("no-scroll")

        const body_content = document.querySelector("#body-retoque #content") as HTMLElement
        const divFullSize = document.createElement("div")
        divFullSize.classList.add("fullsize-image")
        divFullSize.onclick = e=>{
            const target = e.target as HTMLElement
            if(target.classList.contains("fullsize-image")) {
                target.remove()
                document.body.classList.remove("no-scroll")
            }
        }

        const fullsizeImageOBJ = new RetouchPhoto(this.imgID, this.imgIDzoom, this.imgIDmask, this.isWebp, this.isHorizontal, true)
        const fullsizeImage = fullsizeImageOBJ.makeRPWrapper()
        divFullSize.appendChild(fullsizeImage)

        body_content.appendChild(divFullSize)

        /* prueba */
        // const divazo = document.createElement("div")
        // divazo.classList.add("divazo")
        // divazo.appendChild(fullsizeImage)
        // divFullSize.appendChild(divazo)
        // body_content.appendChild(divFullSize)
        /* prueba */        
    }

    private sliderOnInput(target:HTMLInputElement):void {
        const line = target.parentNode!.children[2] as HTMLInputElement
        const before = target.parentNode!.children[1] as HTMLInputElement   
        const value = target.value + "%"

        line.style.left = value
        before.style.width = value
    }

    private sliderOnMouseDown(target:HTMLInputElement):void {
        const circle = target.parentNode!.children[2].children[1]
        circle.classList.add("transparent")

        const line = target.parentNode!.children[2].children[0]
        line.classList.add("mousedown")
    }

    private sliderOnMouseUp(target:HTMLInputElement):void {
        const circle = target.parentNode!.children[2].children[1]
        circle.classList.remove("transparent")

        const line = target.parentNode!.children[2].children[0]
        line.classList.remove("mousedown")
    }
}