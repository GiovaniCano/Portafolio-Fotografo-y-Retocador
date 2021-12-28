function headerMenu() {
    const menuIcon = document.getElementById("header-menu")
    if(!menuIcon) return;

    menuIcon.onclick = ()=>{
        const menu = document.getElementById("header-nav")
        menu!.classList.toggle("hidden")
    }
}