let newsBox = document.getElementById('newsBox');
let spinner = document.getElementById('spinner');
let newsCateogry = ['national', 'business', 'sports', 'world', 'politics', 'technology', 'startup', 'entertainment', 'miscellaneous', 'hatke', 'science', 'automobile'];
// Create XML Object
const xhr = new XMLHttpRequest();

function sendCategory(index) {
    getNews(newsCateogry[index])
}
getNews("all");

function getNews(newsCateogryName) {
    xhr.open('GET', `https://inshorts.deta.dev/news?category=${newsCateogryName}`, true);

    
    xhr.getResponseHeader('Content-type', 'application/json');

    xhr.onload = function () {
        // status code 200 is For "OK"
        if (this.status === 200) {
            let json = JSON.parse(this.responseText);
            let data = json.data;  // Get data Oblect
            // console.log(data);
            let newsHTML = "";

            function showSpinner() {
                spinner.style.visibility = 'hidden';
                newsBox.style.visibility = 'visible';
            }

            xhr.onprogress = showSpinner();

            //Applying Loop on data to get inner elements
            for (key in data) {

                let news = `
                <div class="newsCard card">
                            <img src="${data[key].imageUrl}"
                                class="img ard-img-top img-thumbnail" alt="Image">
                            <h2 class="card-header">${data[key].title}</h2>
                            <div class="card-body">
                                <h5 class="card-title">Author: ${data[key].author}</h5>
                                <p class="card-text">${data[key].content}</p>
                                <a target="_blank" href="${data[key].readMoreUrl}" class="btn btn-primary">Read more..</a>
                                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Comment
</button>
<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Add a comment</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Send</button>
      </div>
    </div>
  </div>
</div>
                            </div>
                            </div>
                           <div class="text-center card-footer text-muted">${data[key].date}</div>
                 </div>`;
                newsHTML += news;
            }
            // Manuplating DOM
            newsBox.innerHTML = newsHTML;
        }
        else {
            console.log("Some Error Occured");
        }
    }

    xhr.send();  // This is important to run whole code

}
