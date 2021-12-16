function getRandomNumber(min:number, max:number):number {
    return Math.floor(Math.random() * (max - min) + min)
}

function shuffleArray(array:any[]) {
    let newArray = [...array];
    let currentIndex = newArray.length;
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
        // Pick a remaining element...
        const randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        // And swap it with the current element.
        [newArray[currentIndex], newArray[randomIndex]] = [newArray[randomIndex], newArray[currentIndex]];
    }
    return newArray;
}

function cl(foo:any) {
    console.log(foo)
}