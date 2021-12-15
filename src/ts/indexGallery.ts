function indexGallery() {
    const totalVimages = 21
    const totalHimages = 21
    const totalImages = totalVimages+totalHimages
    
    const imgVarray = shuffleArray(makeImagesArray("v", totalVimages))
    const imgHarray = shuffleArray(makeImagesArray("hc", totalHimages))

    const gallery = document.getElementById("index-gallery")
    loadImageColumns()

    /*/// functions of indexGallery() ///*/
    function loadImageColumns() {
        //@ts-ignore
        gallery.innerHTML = ""

        // const width = window.outerWidth
        const width = window.innerWidth //debug?
        switch (true) {
            case width > 0:                
                makeColumns(7)
                break;        
            default:
                break;
        }

        /*/// functions of loadImageColumns() ///*/
        function makeColumns(numberOfColumns:number) {
            /* prepare array of arrays */
            const columns:any[] = []
            for (let i = 0; i < numberOfColumns; i++) {
                columns[i] = []
            }

            /* filling arrays */
            const vPerColumn = Math.ceil(totalVimages/numberOfColumns)
            const hPerColumn = Math.ceil(totalHimages/numberOfColumns)
            let v = 0, h = 0
            for (let i = 0; i < numberOfColumns; i++) {
                for (let j = 1; j <= vPerColumn; j++) { // v                    
                    columns[i].push(imgVarray[v])
                    v++
                }
            }
            for (let i = numberOfColumns-1; i >= 0; i--) {
                for (let j = 1; j <= hPerColumn; j++) { // h                  
                    columns[i].push(imgHarray[h])
                    h++
                }
            }

            columns.forEach((column, index)=>{
                columns[index] = shuffleArray(column)
            })
            columns.forEach(column=>{
                const div = document.createElement("div")
                div.classList.add("index-column")

                column.forEach((picture:any)=>{
                    div.appendChild(picture)
                });

                //@ts-ignore
                gallery.appendChild(div)
            })
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

            const picture = document.createElement("picture")
            picture.appendChild(source)
            picture.appendChild(img)

            array.push(picture)            
        }
        return array
    }
}