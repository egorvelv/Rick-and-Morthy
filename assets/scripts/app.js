const charactersList = document.getElementById('charactersList');
let pageCount = 1
let publishedChars;

showCards(true);

function showCards(isNewSearch) {
    if (isNewSearch) {
        pageCount = 1;
    }

    axios.get('https://rickandmortyapi.com/api/character' + getSearchParams())
        .then(response => {

        if (isNewSearch) {
            publishedChars = cardsPrepare(response.data.results);
        } else {
            publishedChars += cardsPrepare(response.data.results);
        }

        console.log(response.data.info)
        charactersList.innerHTML = publishedChars

        document.getElementById('currentChars').innerText = charactersList.children.length;
        document.getElementById('totalChars').innerText = response.data.info.count;

        if (charactersList.children.length === response.data.info.count) {
            document.getElementById('showMoreButton').classList.add('-none');
        }

       })



        .catch(err => {
            console.error(err);
        })
}

function cardsPrepare(array) {
    let result = ``;

    array.forEach((character) => {
        result += `<div class="col-sm-6">
        <div class="card mb-3 card__characters" style=" 
            background-color: #2e2e2e; 
            color: white;">
            <div class="row g-0">
                <div class="col-md-4">
                    <img style=" max-width:170px" 
                      src="${character.image}" alt="...">
                    </div>
                    <div class="col-md-8">
                      <div class="card-body">
                        <h5 class="card-title">${character.name}</h5>
                        <div class="d-flex justify-content-start align-items-center">
                            <div id="js-status" class="card__status${checkStatus(character.status)}" style="margin-right: 5px;"></div>
                            <p class="card-text ">${character.status} - ${character.gender}</p>
                        </div>
                            <h6 class="text-secondary mb-0">Последняя локация</h6>
                            <p class="mb-0">${character.location.name}</p>
                            <h6 class="text-secondary mb-0">Первое появление</h6>
                            <p class="mb-0"></p>
                        <p class="card-text"><small class="text-muted"></small></p>
                      </div>
                    </div>
                  </div>
                </div>
                </div>`
    })

    return result

}

function checkStatus(param) {
    if (param == 'Dead') { 
        return '-dead'
    } else if (param == 'Alive') {
        return '-alive'
    } else if (param == 'unknown'){
        return '-unknown'
    }
}

function getSearchParams() {
    const searchName = document.querySelector('#searchName').value;
    const searchStatus = document.querySelector('#searchStatus').value;
    const searchGender = document.querySelector('#searchGender').value;

    if (!searchName && !searchStatus && !searchGender) {
        const result = `?page=${pageCount}`;
        pageCount++;

        return result;
    }

    let result = '/?'

    if (searchName) {
        result += `name=${searchName}&`;
    }

    if (searchStatus) {
        result += `status=${searchStatus}&`;
    }

    if (searchGender) {
        result += `gender=${searchGender}&`;
    }

    result += `page=${pageCount}`;
    pageCount ++;

    return result;
}