document.onreadystatechange = function() {
  if (document.readyState === "complete") {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var data = JSON.parse(xhr.responseText);
          console.log(data);
          for (var blogPost in data) {
            var postDiv = document.createElement("div");
            var postText = document.createElement("p");
            var thumbnail = document.createElement("img");
            var postContainer = document.getElementsByClassName(
              "post-container"
            )[0];

            thumbnail.src = "./img/logo2.png";
            thumbnail.className = "thumbnail";
            postText.innerHTML = data[blogPost];
            postDiv.className = "post";

            postDiv.appendChild(thumbnail);
            postDiv.appendChild(postText);
            postContainer.appendChild(postDiv);
          }
        } else {
          console.error(xhr.responseText);
        }
      }
    };

    // const filePath = fs.readFile(__dirname + "../src/posts.json");
    console.log("right before get");
    xhr.open("GET", "posts.json", true);
    xhr.send();
  }
};
