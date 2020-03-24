window.addEventListener("load", () => {
  updateCommencts();
});
const posts = document.getElementsByClassName("posts")[0];

function updateCommencts() {
  getData("news").then(({ news }) => {
    posts.innerHTML = news.reduce(function(sum, news) {
      return sum + render_news(news);
    }, "");
  });
}
function render_news({ imgURL, title, postContent }) {
  return `<a href="#">
      <div class="img_container"
          style="background-image: url('${imgURL}');">
      </div>
      <div class="post_content">
          <h3>${title}</h3>
          <p>${postContent}</p>
          <button>
              Read more >>>
          </button>
      </div>
  </a>`;
}
