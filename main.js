
const trackerBox = document.querySelector("#initiative-list")

function initiativeHtmlMaker()
{
    let html = 
    `<thead>
        <tr>
            <th></th>
            <th>Name</th>
            <th>HP</th>
        </tr>
    </thead>
    <tbody>`;
    const allItems = Object.entries(localStorage).sort((a, b) => {
    const ca = JSON.parse(a[1]);
    const cb = JSON.parse(b[1]);
    return cb.roll - ca.roll});
    allItems.slice().forEach(([key, value]) => {
        const character = JSON.parse(value)
        html += `<tr>
        <td class="health-buttons"><button class="damage-button ${character.name}">Damage</button>
        <button class="heal-button ${character.name}" >Heal</button></td>
        <td>${character.name}</td>
        <td>${character.hp}</td>
        <td><button class="delete-button ${character.name}" >Delete</button></td>
        </tr>`
    })
    html += `</tbody>`;
    return html;
}
function submitHandler()
{
    const name = document.querySelector("#char-name").value;
    const hp = document.querySelector("#char-hp").value;
    const roll = document.querySelector("#dex-roll").value;
    const character = {name, hp, roll};

    if(name != ""){
        localStorage.setItem(name, JSON.stringify(character));
    }

    trackerBox.innerHTML = initiativeHtmlMaker();
    clearInputs();
}
function clearInputs()
{
    document.querySelector("#char-name").value = "";
    document.querySelector("#char-hp").value = "";
    document.querySelector("#dex-roll").value = "";

}
function deleteAll()
{
    document.querySelector("#character-creation");
    localStorage.clear();
    clearInputs();
    submitHandler();
}
function buttonHandler(event)
{
    if (event.target.classList.contains("damage-button") || event.target.classList.contains("heal-button"))
    {
        hpHandler(event);
    } else if (event.target.classList.contains("delete-button"))
    {
        deleteHandler(event)
    }
}
function deleteHandler(event)
{
    const allItems = Object.entries(localStorage);
    allItems.slice().reverse().forEach(([key, value]) => {
        const character = JSON.parse(value)
        if(event.target.classList.contains(character.name))
        {
            localStorage.removeItem(character.name);
            trackerBox.innerHTML = initiativeHtmlMaker();
        }
    })
}
function hpHandler(event)
{
    let isDamage = true;
    if(event.target.classList.contains("damage-button")){
        isDamage = true;
    } else if(event.target.classList.contains("heal-button")){
        isDamage = false;
    }
    
    let damage = document.querySelector("#damage-input").value;
    
    if (!isDamage){damage *= -1;} // Inverts for healing

    const allItems = Object.entries(localStorage);
    allItems.slice().reverse().forEach(([key, value]) => {
        const character = JSON.parse(value);

        if(event.target.classList.contains(character.name))
        {
            character.hp -= damage;
            localStorage.setItem(character.name, JSON.stringify(character));
            
            trackerBox.innerHTML = initiativeHtmlMaker();
        }
    })
}
document.querySelector("#submit-button").addEventListener("click", submitHandler);
document.querySelector("#reset-button").addEventListener("click", deleteAll);
trackerBox.addEventListener("click", buttonHandler);

trackerBox.innerHTML = initiativeHtmlMaker();





// Discord Bot

async function loadMessages() {
    const res = await fetch("http://localhost:3000/messages");
    const data = await res.json();

    const container = document.getElementById("chat");

    console.log(data)
    container.innerHTML = data.map(msg =>
    `<p><strong>${msg.user}:</strong> ${msg.content}</p>`
    ).join("");
}

setInterval(loadMessages, 2000);