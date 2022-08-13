    //Add variables
    const btn = document.getElementById('btn');
    const textArea = document.getElementById('textArea');
    let city;
    let summary = document.getElementById('summary');
    let categories =  document.getElementById('categories');


    //Add button event on click
    btn.addEventListener('click', (e) => {
        if (textArea.value == "") {
            e.preventDefault();
            summary.style.color = "red";
            summary.innerHTML = 'You need to add a city in english!';
            categories.innerHTML = "";
        } else {
            city = correctInput(textArea.value);
            summary.innerHTML= ""; 
            summary.style.color = "black";
            categories.innerHTML= "";

            getData();
        }
    });


    //Function for call API Teleport
    async function getData() {
        const response = await fetch(`https://api.teleport.org/api/urban_areas/slug:${city}/scores/`);
        if (response.status !== 404) {
        const text = await response.json();
        const {categories, summary} = text;

        //Open description's city in html page
        const paragr = document.getElementById('summary');
        paragr.insertAdjacentHTML('afterbegin', summary);

        //Open categories & scores in html page
        text.categories.forEach((e,i)=>{
            const elem = document.createElement("div");
            elem.id = `cat${i}`;
            elem.textContent = `${e.name}: ${(e.score_out_of_10).toFixed(2)}`;
            elem.setAttribute("style", `color: ${e.color};`);
            document.getElementById('categories').appendChild(elem);
        });

    } else {
        getError();
    }};


    //Function to adjust input research without empty space or uppercase
    function correctInput(input) {
        input = input.toLowerCase();
        input = input.replace(' ','-');
        return input;
    };


    //Function to manage the error
    function getError(){
        errorMessage = 'This city is not avaiable. Please try again. <br><strong>Write it in English!</strong>';
        summary.style.color = "red";
        summary.innerHTML = errorMessage;
        categories.innerHTML = "";
    }
    
    
