let show = false;
function show_dropdown(e) {
  show = !show;
  if (show == true) {
    document.getElementsByClassName("dropdown-content")[0].style.display =
      "block";
  } else {
    document.getElementsByClassName("dropdown-content")[0].style.display =
      "none";
  }
}


 