async function GetRandomData(PutData) {
  try {
    let response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/random.php"
    );
    let data = await response.json();
    console.log("data ===", data.meals[0]);
    PutData(data.meals[0]);
  } catch (error) {
    console.error("Error fetching data : ", error);
  }
}

//
var flag = false;
var button = document.querySelector("#btn-one");
var header = document.querySelector(".header");
var SecandaryDiv = document.querySelector(".secandary-header");
var MainDiv = document.querySelector(".dis-div");
var LastDiv = document.querySelector(".last-div");
var FirstDiv = document.querySelector("#firstDiv-left");
var SecondDiv = document.querySelector(".second-div");
function myfunction() {
  console.log("hahahahahaah");
  header.style.display = "none";
  SecandaryDiv.style.display = "block";
  MainDiv.style.display = "block";
  LastDiv.style.display = "block";
  GetRandomData((data) => {
    const Ingredients = [];
    for (let i = 1; i <= 20; i++) {
      if (data[`strIngredient${i}`]) {
        Ingredients.push(
          `${data[`strIngredient${i}`]} - ${data[`strMeasure${i}`]}`
        );
      } else {
        break;
      }
    }
    var html = ` <div class="div-img">
    <img src=${data.strMealThumb} alt="ahmed"></div>
   ${
     data.strCategory
       ? `<p class="para-one"><strong>Category : </strong>${data.strCategory}</p>`
       : ``
   } 
 ${
   data.strArea
     ? `<p class="para-two"><strong>Area : </strong>${data.strArea}</p>`
     : ``
 }
 ${
   data.strTags
     ? `<p class="para-two"><strong>Tags : </strong>${data.strTags
         .split(",")
         .join(", ")}</p>`
     : ``
 }

<div>
    <h5>Ingredients :</h5>
    <ol>
    ${Ingredients.map((element) => {
      return `<li>${element}</li>`;
    }).join(" ")}
    </ol>
</div>`;
    var html2 = `    <h4>${data.strMeal}</h4>
<p>${data.strInstructions}</p>
`;
    var html3 = `  <div class="video-frame">
           ${
             data.strYoutube
               ? `<iframe width="100%" height="415" src="https://www.youtube.com/embed/${data.strYoutube.slice(
                   -11
                 )}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> `
               : `<h1>No video available</h1>`
           }
</div>`;

    console.log("tell me =", Ingredients);
    // FirstDiv.insertAdjacentHTML("beforeend", html);
    FirstDiv.innerHTML = html;
    SecondDiv.innerHTML = html2;
    LastDiv.innerHTML = html3;
  });
}
