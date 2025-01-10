const page1Btn = document.getElementById('page1Btn');
const page2Btn = document.getElementById('page2Btn');
const page1 = document.getElementById('page1');
const page2 = document.getElementById('page2');
const zakazDetails = document.getElementById('zakazDetails');
const zakazList = document.getElementById('zakazList');
const zakazForm = document.getElementById('zakazForm');
const dialog = document.getElementById('dialog');
const deleteZakazBtn = document.getElementById('deleteZakazBtn');
const confirmDelete = document.getElementById('confirmDelete');
const cancelDelete = document.getElementById('cancelDelete');
const zakazInfo = document.getElementById('zakazInfo');

let zakazlar = JSON.parse(localStorage.getItem('zakazlar')) || [];
let zakazToDelete = null;

page1Btn.addEventListener('click', () => {
    page1.style.display = 'block';
    page2.style.display = 'none';
    zakazDetails.style.display = 'none';
});

page2Btn.addEventListener('click', () => {
    page1.style.display = 'none';
    page2.style.display = 'block';
    zakazDetails.style.display = 'none';
});

zakazForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const date = document.getElementById('dateInput').value;
    const startTime = document.getElementById('startTimeSelect').value;
    const endTime = document.getElementById('endTimeSelect').value;
    const name = document.getElementById('nameInput').value;
    const phone = document.getElementById('phoneInput').value;
    const comment = document.getElementById('commentInput').value;

    zakazlar.push({ date, startTime, endTime, name, phone, comment });
    localStorage.setItem('zakazlar', JSON.stringify(zakazlar));
    updateZakazList();
    page1.style.display = 'block';
    page2.style.display = 'none';
});

function updateZakazList() {
    zakazList.innerHTML = '';
    zakazlar.forEach((zakaz, index) => {
        const zakazItem = document.createElement('div');
        zakazItem.classList.add('zakaz-item');
        zakazItem.innerHTML = `
            <div>
                <ul>
                    <li style = "padding-right: 10px;"><strong></strong> ${zakaz.name}</li>
                    <li style = "padding-right: 10px;"><strong></strong> ${zakaz.phone}</li>
                </ul>
                <ul>
                    <li style = "padding-right: 10px;"><strong></strong> ${zakaz.date}</li>
                    <li style = "padding-right: 10px;"><strong></strong> ${zakaz.startTime} - ${zakaz.endTime}</li>
                </ul>
            </div>
            <button onclick="showZakazDetails(${index})"><img src="./arrow-right.svg" alt=""></button>
        `;
        zakazList.appendChild(zakazItem);
    });
}

function showZakazDetails(index) {
    const zakaz = zakazlar[index];
    zakazInfo.innerHTML = `
        <p class = "inpu2"><strong class = "bosh-oriq">Ism</strong> ${zakaz.name}</p>
        <p class = "inpu3"><strong >Sana - </strong> ${zakaz.date}
        <br />
        <br />
        <strong>Vaqt - </strong> ${zakaz.startTime} - ${zakaz.endTime}</p>
        <p class = "inpu2"><strong class = "bosh-oriq">Telefon</strong> ${zakaz.phone}</p>
        <p class = "inpu2"><strong class = "bosh-oriq">Izoh</strong> ${zakaz.comment || 'Yo‘q'}</p>
    `;
    zakazToDelete = index;
    zakazDetails.style.display = 'block';
    page1.style.display = 'none';
    page2.style.display = 'none';
}


deleteZakazBtn.addEventListener('click', () => {
    dialog.style.display = 'block';
});

confirmDelete.addEventListener('click', () => {
    zakazlar.splice(zakazToDelete, 1);
    localStorage.setItem('zakazlar', JSON.stringify(zakazlar));
    updateZakazList();
    dialog.style.display = 'none';
    zakazDetails.style.display = 'none';
    page1.style.display = 'block';
});

cancelDelete.addEventListener('click', () => {
    dialog.style.display = 'none';
});

updateZakazList();
