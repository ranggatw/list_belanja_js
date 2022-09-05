// catch some element html
let modal = document.getElementById('modal');
let floating_btn = document.getElementById('floating_btn');
let modal_bg = document.getElementById('modal_bg');
let addlist_form = document.getElementById('addlist_form');
let root = document.getElementById('root');
let subtitle = document.getElementById('subtitle');

// Tambah date ke subtitle
subtitle.innerHTML += new Date().toLocaleDateString();

// Data list Balanjaan
let data_list_belanja = [];

// add event listener in floating button
floating_btn.addEventListener('click', () => {
  if (modal.style.display == 'none') {
    showModal();
    return;
  } else {
    hideModal();
    return;
  }
});

// menambahkan event listener ke modal bg
modal_bg.addEventListener('click', () => {
  hideModal();
});

// tambahkan event listener submit ke addlist form
addlist_form.addEventListener('submit', (event) => {
  // stop form dari reload page
  event.preventDefault();

  // ambil valuenya dari tiap tiap field
  let barang = event.target.barang.value;
  let harga = event.target.harga.value;

  // Push data ke data list belanja
  data_list_belanja.push({
    nama_barang: barang,
    harga_barang: harga,
    tanggal: new Date().toLocaleDateString(),
  });

  console.info(data_list_belanja);

  // Clear form
  event.target.barang.value = '';
  event.target.harga.value = '';
  hideModal();
  renderToHtml();
});

// Show
function showModal() {
  modal.style.display = 'flex';
  floating_btn.style.backgroundColor = 'grey';
  floating_btn.style.transform = 'rotate(45deg)';
}

// Hide
function hideModal() {
  modal.style.display = 'none';
  floating_btn.style.backgroundColor = 'orange';
  floating_btn.style.transform = 'rotate(0deg)';
}

// RENDER FUNCTION
function renderToHtml() {
  // Clear element div
  root.innerHTML = '';

  // perulanagan
  data_list_belanja.forEach((el, i) => {
    root.innerHTML += `
      <div class="card">
        <small>${el.tanggal}</small>
        <div>
          ${el.nama_barang} <span>Rp. ${el.harga_barang}</span>
        </div>
        <button onClick="deleteListBelanja(${i})">Selesai</button>
      </div>
    `;
  });
}

// function delete data list belanaja
function deleteListBelanja(index) {
  data_list_belanja.splice(index, 1);
  renderToHtml();
}
