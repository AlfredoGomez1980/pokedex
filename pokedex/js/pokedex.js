//paso 1: seleccionar donde queremos pintar la lista

const cards = document.getElementById("pokedex");
const searchBtn = document.getElementById("searchBtn");

//paso 2: hacer la llamada a la api

const fetchUser = () => {
    const promises = [];
  
    for (let i = 1; i <= 150; i++) {
      const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
      promises.push(fetch(url).then((res) => res.json()));
    }
  
    Promise.all(promises).then((results) => {
      console.log(results);
      const user = results.map((result) => ({
        name: result.name,
        image: result.sprites['front_default'],
        type: result.types.map((type) => type.type.name).join(', '),
        id: result.id,
        weight: result.weight,
        height: result.height,
      }));
      displayUser(user);
    });
};
  
  //paso 3: crear los elementos en el DOM
  
const displayUser = (user) => {
  console.log(user);
  
  const myUser = user
    .map(
      (newUser) =>
        `
          <li>
            <h2>${newUser.name}</h2>
            <img src="${newUser.image}">
            <p>${newUser.type}</p>
            <p>${newUser.id}</p>            
            <p>${newUser.weight}</p>
            <p>${newUser.height}</p>
          </li>
      `
      )
      .join("");
    cards.innerHTML = myUser;
};
  
fetchUser();

//paso 4: funcion para buscar pokemon por nombre

const fetchUserByName = () => {
  const promises = [];
  const searchName = document.getElementById("pokemon").value;

  const url = `https://pokeapi.co/api/v2/pokemon/${searchName}`;
  promises.push(fetch(url).then((res) => res.json()));
  

  Promise.all(promises).then((results) => {
    console.log(results);
    const user = results.map((result) => ({
      name: result.name,
      image: result.sprites['front_default'],
      type: result.types.map((type) => type.type.name).join(', '),
      id: result.id,
      weight: result.weight,
      height: result.height,
    }));
    displayUser(user);
  });
};

//paso 5: definicion del evento click de busqueda

searchBtn.addEventListener("click", fetchUserByName);




