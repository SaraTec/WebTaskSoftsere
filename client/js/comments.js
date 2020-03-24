const responceForm = document.getElementById('formRespons');
responceForm &&
  responceForm.addEventListener(
    'submit',
    submitResponsForm
  );
const list_comments = document.getElementsByClassName(
  'list_comments'
)[0];

/*  postData("comments", {
  responce_description: "TEXTTEXTTEXT",
  userName: "GROB",
  actual_date: "23.03.2020, 12:48"
}); */
function isOnline() {
  return window.navigator.onLine;
}
let comments = [];
async function submitResponsForm() {
  const responce_description = document.getElementById(
    'responce_description'
  ).value;
  const date = new Date();
  const month = date.getMonth();
  // відформатована поточна дата
  const actual_date = `${date.getDate()}.${
    month < 10 ? `0${month + 1}` : month + 1
  }.${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()}`;
  const userName = document.getElementById('userName')
    .value;
  const comment = {
    responce_description,
    userName,
    actual_date
  };
  comments.push(JSON.stringify(comment));
  if (isOnline()) {
    await postData('comments', comment);
    updateCommencts();
  } else {
    if (useLocalStorage) {
      localStorage.setItem('comments', `[${comments}]`);
    } else {
      database.addToStore('comments', {
        ...comment,
        id: Date.now()
      });
    }
    Swal.fire(
      'Info!',
      'You are offline! Comments will be added after connection',
      'info'
    );
  }
  responceForm.reset();
}

window.addEventListener('load', () => {
  updateCommencts();
});

function updateCommencts() {
  getData('comments').then(({ comments }) => {
    list_comments.innerHTML = comments.reduce(function(
      sum,
      comment
    ) {
      return sum + render_response(comment);
    },
    '');
  });
}

function loadAllFromLocalStorage() {
  for (let comment of JSON.parse(
    localStorage.getItem('comments')
  )) {
    postData('comments', comment);
    //updateCommencts();
  }
  localStorage.removeItem('comments');
}

function render_response({
  responce_description,
  userName,
  actual_date
}) {
  return `<div class="comment">
          <div class="comment-text">
              <p>${responce_description}</p>
          </div>
          <div class="comment-discription">
              <div class="comment-data">
                  <p>${actual_date}</p>
              </div>
              <div class="comment-sender-name">
                  <p>${userName}</p>
              </div>
          </div>
      </div>`;
}

window.addEventListener('online', async () => {
  if (useLocalStorage) {
    if (localStorage.getItem('comments')) {
      loadAllFromLocalStorage();
    }
  } else {
    // indexedDB
    await database.getFromStore('comments').then(comments => {
      if (comments.length) {
        comments.forEach(comment => {
          postData('comments', comment);
        });
        database.clearStore('comments');
      }
    });
  }
  Swal.fire(
    'Success!',
    'You are online! Comments has been added',
    'success'
  );
  updateCommencts()
});
