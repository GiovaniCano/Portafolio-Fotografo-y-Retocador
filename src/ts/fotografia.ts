function fotografia() {
    if(document.body.id !== "body-fotografia") return;
    
    const principalImages:number[] = [
        1,  // pinkblue H
        38, // Isabel V
        15, // flores H
        12, // labios azules
        37, // modelo1
        20, // sujeto camisa
        30, // splash
        4, // crema
        18, // isabel ojos
        33, // flores V
        6, // galleta
        19, // isabel labios
        17, // isabel cuadro
        36, // modelo2
        // 8, // kisses
        40, // sujeto maquillaje
        41  // sujeo ByN
    ];
    const otherImages:number[] = findOtherImages(42, principalImages)
    const allImages = [...principalImages, ...otherImages]
    consoleRepeatedImages(allImages) // debug

    /* html */
    const imgArray = makeImagesArray(allImages)
    const contentDiv = document.querySelector("#body-fotografia #content")

    loadImageColumns()
    window.onresize = loadImageColumns

    /* img events */
    const imgs = document.getElementsByTagName("img")
    for(let img of imgs){
        img.oncontextmenu = e=>e.preventDefault()
        img.ondragstart = e=>e.preventDefault()
        img.onclick = e=>viewFullSizeImage(e)
    }

    /* [[END]] */

    /*/// functions of indexGallery() ///*/
    function viewFullSizeImage(e:MouseEvent) {
        // @ts-ignore
        const imgID = e.target.dataset.imgid

        const source = document.createElement("source")
        source.srcset = `/build/img/foto/img-${imgID}-b.webp`
        const img = document.createElement("img")
        img.src = `/build/img/foto/img-${imgID}-b.jpg`
        img.oncontextmenu = e=>e.preventDefault()
        img.ondragstart = e=>e.preventDefault()

        const picture = document.createElement("picture")
        picture.appendChild(source)
        picture.appendChild(img)

        const imgContainer = document.createElement("div")
        imgContainer.classList.add("fullsize-image")
        imgContainer.onclick = e=> {
            //@ts-ignore
            e.currentTarget.remove()
            document.body.classList.remove("no-scroll")
        }
        imgContainer.tabIndex = 0
        imgContainer.onkeydown = e=>{if(e.key==="Escape")(<HTMLElement>e.currentTarget).remove()}
        imgContainer.appendChild(picture)

        document.body.classList.add("no-scroll")
        contentDiv!.appendChild(imgContainer)
        imgContainer.focus()
    }

    function loadImageColumns() {
        contentDiv!.innerHTML = ""

        const width = window.innerWidth
        switch (true) {
            // case width >= 1500: //desktop
            //     makeColumns(5)
            //     break;
            case width >= 1025: //laptop
                makeColumns(4)
                break;
            case width >= 481: //tablet
                makeColumns(2)
                break;
            default: //movil
                makeColumns(1)
                break;
        }

        /*/// functions of loadImageColumns() ///*/
        function makeColumns(numberOfColumns:number) {
            /* prepare array of arrays */
            let columns:any[] = []
            for (let i = 0; i < numberOfColumns; i++) {
                columns[i] = []
            }
            fillArray(imgArray)

            /* create HTML */
            columns.forEach(column=>{
                const div = document.createElement("div")
                div.classList.add("index-column")

                column.forEach((picture:any)=>{
                    div.appendChild(picture)
                });

                contentDiv!.appendChild(div)
            })

            /*/// functions of makeColumns() ///*/
            function fillArray(array:any[]) {
                let j = 0
                for(let i = 0; i < array.length; i++) {
                    columns[j].push(array[i])
                    j < columns.length-1 ? j++ : j=0
                }
            }
        }
    }
    function makeImagesArray(imagesNumbers:number[]):HTMLPictureElement[] {
        const array:HTMLPictureElement[] = []
        imagesNumbers.forEach(n=>{
            const source = document.createElement("source")
            source.srcset = `/build/img/foto/img-${n}-m.webp`

            const img = document.createElement("img")
            img.src = `/build/img/foto/img-${n}-m.jpg`
            img.loading = "lazy"            
            img.dataset.imgid = n.toString()

            const picture = document.createElement("picture")
            picture.appendChild(source)
            picture.appendChild(img)

            array.push(picture)            
        })
        return array
    }
} // END photoGallery()

function findOtherImages(numberOfImages:number, currentImages:number[]) {
    const missingImages:number[] = []
    for(let i = 1; i <= numberOfImages; i++) {
        if(!currentImages.includes(i)) missingImages.push(i)
    }
    return missingImages
}

function consoleRepeatedImages(array:number[]) {
    const repeated:number[][] = []
    array.forEach((target, index)=>{
        let r = -1
        array.forEach(n=>{
            if(target===n) r++
        })
        if(r>0) repeated.push([index,target])
    })
    if(repeated.length) {
        console.log("\r")
        console.warn("Hay imagenes repetidas:")
        console.warn("[index, number]:")
        console.warn(repeated)
        console.warn(array)
    }
}