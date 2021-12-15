function indexGallery() {
    const totalVimages = 21
    const totalHimages = 21
    
    const imgVarray = shuffleArray(makeImagesArray("v", totalVimages))
    const imgHarray = shuffleArray(makeImagesArray("hc", totalHimages))

    const gallery = document.getElementById("index-gallery")
    loadImageColumns()
    window.onresize = loadImageColumns

    /*/// functions of indexGallery() ///*/
    function loadImageColumns() {
        //@ts-ignore
        gallery.innerHTML = ""

        // const width = window.outerWidth
        const width = window.innerWidth //debug?
        switch (true) {
            case width >= 1500: //desktop
                makeColumns(7)
                break;
            case width >= 1024: //laptop
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
            source.srcset = `/build/img/foto/${folder}/img-${i}.webp
            `
            const img = document.createElement("img")
            img.src = `/build/img/foto/${folder}/img-${i}.jpg`
            img.loading = "lazy"

            const picture = document.createElement("picture")
            picture.appendChild(source)
            picture.appendChild(img)

            array.push(picture)            
        }
        return array
    }
}