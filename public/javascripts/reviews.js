function searchFunc() {
    var input, filter, ul, li, btn, i, txtValue;
    
    input = document.getElementById("searchVal");
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName("li");

    for (i = 0; i < li.length; i++) {
        btn = li[i].getElementsByTagName("button")[0];
        txtValue = btn.textContent || btn.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}