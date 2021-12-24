function home() {
    if(document.body.id !== "index-body") return;
    
    const totalVimages = 21
    const totalHimages = 21
    
    const imgVarray = shuffleArray(makeImagesArray("v", totalVimages))
    const imgHarray = shuffleArray(makeImagesArray("hc", totalHimages))

    /* create and update gallery */
    const gallery = document.getElementById("index-gallery")
    loadImageColumns()
    window.onresize = loadImageColumns

    /* swap images */
    setTimeout(() => {
        setInterval( ()=>imageSwapper(), getRandomNumber(950, 2050) )
    }, 900);

    /* [[END]] */

    /*/// functions of indexGallery() ///*/
    function loadImageColumns() {
        gallery!.innerHTML = ""

        const width = window.innerWidth
        switch (true) {
            case width >= 1500: //desktop
                makeColumns(7)
                break;
            case width >= 1025: //laptop
                makeColumns(6)
                break;
            case width >= 481: //tablet
                makeColumns(4)
                break;
            default: //movil
                makeColumns(3)
                break;
        }

        /*/// functions of loadImageColumns() ///*/
        function makeColumns(numberOfColumns:number) {
            /* prepare array of arrays */
            let columns:any[] = []
            for (let i = 0; i < numberOfColumns; i++) {
                columns[i] = []
            }

            /* filling arrays */
            fillArrays(imgVarray)
            fillArrays(imgHarray, true)

            /* shuffle again */
            columns = shuffleArray(columns)
            columns.forEach((column, index)=>{
                columns[index] = shuffleArray(column)
            })

            /* create HTML */
            columns.forEach(column=>{
                const div = document.createElement("div")
                div.classList.add("index-column")

                column.forEach((picture:any)=>{
                    div.appendChild(picture)
                });

                //@ts-ignore
                gallery.appendChild(div)
            })

            /*/// functions of makeColumns() ///*/
            function fillArrays(array:any[], reverse = false) {
                if(reverse) { //max to 0 (<--)
                    let j = columns.length-1
                    for(let i = 0; i < array.length; i++) {
                        columns[j].push(array[i])
                        j > 0 ? j-- : j=columns.length-1
                    }
                } else { //0 to max (-->)
                    let j = 0
                    for(let i = 0; i < array.length; i++) {
                        columns[j].push(array[i])
                        j < columns.length-1 ? j++ : j=0
                    }
                }
            }
        }
    }
    function makeImagesArray(folder:string, times:number) {
        const array = []
        for(let i = 1; i <= times; i++) {
            const source = document.createElement("source")
            source.srcset = `/build/img/foto/${folder}/img-${i}.webp`

            const img = document.createElement("img")
            img.src = `/build/img/foto/${folder}/img-${i}.jpg`
            img.loading = "lazy"

            const picture = document.createElement("picture")
            picture.classList.add(folder)
            picture.appendChild(source)
            picture.appendChild(img)

            array.push(picture)            
        }
        return array
    }
}

function imageSwapper() {
    const columns = document.getElementsByClassName("index-column")

    const col1:number = Math.floor(Math.random()*columns.length)
    let col2:number = Math.floor(Math.random()*columns.length)
    while(col1 === col2) {
        col2 = Math.floor(Math.random()*columns.length)
    }

    const col1HTML:HTMLCollection = columns[col1].children
    const col2HTML:HTMLCollection = columns[col2].children

    let col1_picV:number = pickRandomPicture(col1HTML, "v")
    let col1_picH:number = pickRandomPicture(col1HTML, "hc")
    let col2_picV:number = pickRandomPicture(col2HTML, "v")
    let col2_picH:number = pickRandomPicture(col2HTML, "hc")

        // console.group(col1)
        //     console.log(col1_picV)
        //     console.log(col1_picH)
        // console.groupEnd()
        // console.group(col2)
        //     console.log(col2_picV)
        //     console.log(col2_picH)
        // console.groupEnd()

    /* h2 after v1 */
    /* v1 before h2(inheritor) if(error): v1 after h2(-1) */
    /* error: on 1st move col2 will have 1 element less, so if you try to .before() the last element, it gonna be undefined, the solution is to .after() the last element -1 */
    columns[col1].children[col1_picV].after(columns[col2].children[col2_picH])
    try {
        columns[col2].children[col2_picH].before(columns[col1].children[col1_picV])
    } catch (error) {
        columns[col2].children[col2_picH-1].after(columns[col1].children[col1_picV])
    }
    /* v2 after h1 */
    /* h1 before v2(inherited) if(error): h1 after v2(-1) */
    /* error explained right above */
    columns[col1].children[col1_picH].after(columns[col2].children[col2_picV])
    try {
        columns[col2].children[col2_picV].before(columns[col1].children[col1_picH])
    } catch (error) {
        columns[col2].children[col2_picV-1].after(columns[col1].children[col1_picH])
    }
    
    /* [[functions of imageSwapper()]] */
    function pickRandomPicture(column:HTMLCollection, className:string):number {
        let picture = Math.floor(Math.random()*column.length)
        while(!column[picture].classList.contains(className)) {
            picture = Math.floor(Math.random()*column.length)
        }
        return picture
    }
}