const adminForm = document.getElementById('formAdmin');
const newsImage = document.getElementById('photo');
let imgURL =
  'https://icon-library.net/images/upload-photo-icon/upload-photo-icon-21.jpg';

adminForm &&
  adminForm.addEventListener('submit', submitAdminForm);
newsLocalStore = [];

const handleFiles = event => {
  const file = event.target.files[0];
  const fileReader = new FileReader();

  fileReader.onload = event => {
    if (!event.target.result) return;

    imgURL = event.target.result;
    imgPlaceHolder.src = imgURL;
  };

  fileReader.readAsDataURL(file);
};

window.addEventListener('online', async () => {
  if (useLocalStorage) {
    if (localStorage.getItem('newsLocalStore')) {
      loadAllFromLocalStorage();
    }
  } else {
    await database.getFromStore('news').then(news => {
      if (news.length) {
        news.forEach(news => {
          postData('news', news);
        });
        database.clearStore('news');
      }
    });
  }
  Swal.fire(
    'Success!',
    'You are online! Comments has been added',
    'success'
  );
});

function loadAllFromLocalStorage() {
  for (let news of JSON.parse(
    localStorage.getItem('newsLocalStore')
  )) {
    postData('news', news);
  }
  localStorage.removeItem('newsLocalStore');
}

async function submitAdminForm() {
  const postContent = document.getElementById('postContent')
    .value;
  const title = document.getElementById('title').value;
  const news = {
    imgURL,
    title,
    postContent
  };
  if (isOnline()) {
    await postData('news', news);
    Swal.fire(
      'Success!',
      'You news has been added',
      'success'
    );
  } else {
    if (useLocalStorage) {
      newsLocalStore.push(JSON.stringify(news));
      localStorage.setItem(
        'newsLocalStore',
        `[${newsLocalStore}]`
      );
    } else {
      database.addToStore('news', {
        ...news,
        id: Date.now()
      });
    }
    Swal.fire(
      'Info!',
      'You are offline! News will be added after connection',
      'info'
    );
  }
  adminForm.reset();
  imgPlaceHolder.src =
    'https://icon-library.net/images/upload-photo-icon/upload-photo-icon-21.jpg';
}

function isOnline() {
  return window.navigator.onLine;
}

newsImage.addEventListener('change', handleFiles);
