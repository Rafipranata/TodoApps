      // Mengambil referensi ke elemen-elemen yang akan digunakan
      const nameInput = document.getElementById('dilakukan');
      const dateInput = document.getElementById('date');
      const addButton = document.getElementById('add-button');
      const todoList = document.getElementById('todo-list');
      const completedList = document.getElementById('completed-list');
      const resetButton = document.getElementById('reset-button');
      const searchInput = document.getElementById('search-input');
      
      // Mendefinisikan event listener untuk tombol "Tambah Data"
      addButton.addEventListener('click', function () {
          // Mengambil nilai input nama dan tanggal
          const name = nameInput.value;
          const date = dateInput.value;
      
          // Membuat objek data
          const data = {
              name: name,
              date: date
          };
      
          // Menambahkan data ke dalam localStorage
          addDataToLocalStorage(data);
      
          // Menampilkan data yang telah disimpan
          displayDataFromLocalStorage();
      });
      
      // Mendefinisikan event listener untuk tombol "Reset Data"
      resetButton.addEventListener('click', function () {
          // Menghapus data dari localStorage
          localStorage.removeItem('todoData');
          localStorage.removeItem('completedData');
      
          // Menghapus data yang ditampilkan dalam tabel
          todoList.innerText = '';
          completedList.innerText = '';
      });
      
      // Mendefinisikan event listener untuk input pencarian
      searchInput.addEventListener('input', function () {
          // Memperbarui tampilan data sesuai dengan nilai pencarian
          displayDataFromLocalStorage();
      });
      
      // Fungsi untuk menambahkan data ke dalam localStorage
      function addDataToLocalStorage(data) {
          // Mengambil data yang sudah ada dari localStorage
          const todoData = JSON.parse(localStorage.getItem('todoData')) || [];
          const completedData = JSON.parse(localStorage.getItem('completedData')) || [];
      
          // Menambahkan data baru ke dalam array yang sesuai
          todoData.push(data);
      
          // Menyimpan data yang sudah diperbarui kembali ke localStorage
          localStorage.setItem('todoData', JSON.stringify(todoData));
          localStorage.setItem('completedData', JSON.stringify(completedData));
      }
      
      // Fungsi untuk menampilkan data yang telah disimpan
      function displayDataFromLocalStorage() {
          // Menghapus semua elemen dalam todoList dan completedList
          todoList.innerHTML = '';
          completedList.innerHTML = '';
      
          // Mengambil data dari localStorage
          const todoData = JSON.parse(localStorage.getItem('todoData')) || [];
          const completedData = JSON.parse(localStorage.getItem('completedData')) || [];
      
          // Mengambil nilai pencarian
          const searchValue = searchInput.value.toLowerCase();
      
          // Mengatur flag untuk menandai apakah ada data yang sesuai dengan pencarian
          let isDataFound = false;
      
          // Menampilkan data dalam card untuk "Yang harus dilakukan"
          todoData.forEach(function (data, index) {
              // Memeriksa apakah nama atau tanggal cocok dengan nilai pencarian
              const nameMatch = data.name.toLowerCase().includes(searchValue);
              const dateMatch = data.date.toLowerCase().includes(searchValue);
      
              if (nameMatch || dateMatch) {
                  isDataFound = true;
      
                  const card = document.createElement('div');
                  card.className = 'card';
                  card.innerHTML = `
                      <div class="card-body">
                          <h5 class="card-title">${data.name}</h5>
                          <p class="card-text">${data.date}</p>
                          <button class="btn btn-success" onclick="markAsCompleted(${index})">Sudah Dilakukan</button>
                          <button class="btn btn-danger" onclick="deleteItem(${index})">Hapus</button>
                      </div>
                  `;
                  todoList.appendChild(card);
              }
          });
      
          // Menampilkan data dalam card untuk "Yang sudah dilakukan"
          completedData.forEach(function (data, index) {
              // Memeriksa apakah nama atau tanggal cocok dengan nilai pencarian
              const nameMatch = data.name.toLowerCase().includes(searchValue);
              const dateMatch = data.date.toLowerCase().includes(searchValue);
      
              if (nameMatch || dateMatch) {
                  isDataFound = true;
      
                  const card = document.createElement('div');
                  card.className = 'card';
                  card.innerHTML = `
                      <div class="card-body">
                          <h5 class="card-title">${data.name}</h5>
                          <p class="card-text">${data.date}</p>
                          <button class="btn btn-danger" onclick="deleteItem(${index}, true)">Hapus</button>
                      </div>
                  `;
                  completedList.appendChild(card);
              }
          });
      
          // Menampilkan pesan jika tidak ada data yang sesuai dengan pencarian
          if (!isDataFound) {
              const noDataCard = document.createElement('div');
              noDataCard.className = 'card';
              noDataCard.innerHTML = '<div class="card-body"><p class="card-text">Yang kamu cari tidak ada</p></div>';
              todoList.appendChild(noDataCard);
              completedList.appendChild(noDataCard.cloneNode(true));
          }
      }
      
      // Fungsi untuk memindahkan item dari "Yang harus dilakukan" ke "Yang sudah dilakukan"
      function markAsCompleted(index) {
          // Mengambil data dari localStorage
          const todoData = JSON.parse(localStorage.getItem('todoData')) || [];
          const completedData = JSON.parse(localStorage.getItem('completedData')) || [];
      
          // Mengambil item yang akan dipindahkan
          const item = todoData[index];
      
          // Menghapus item dari "Yang harus dilakukan"
          todoData.splice(index, 1);
      
          // Menambahkan item ke "Yang sudah dilakukan"
          completedData.push(item);
      
          // Menyimpan data yang sudah diperbarui kembali ke localStorage
          localStorage.setItem('todoData', JSON.stringify(todoData));
          localStorage.setItem('completedData', JSON.stringify(completedData));
      
          // Menampilkan data yang telah disimpan
          displayDataFromLocalStorage();
      }
      
      // Fungsi untuk menghapus item dari "Yang harus dilakukan" atau "Yang sudah dilakukan"
      function deleteItem(index, isCompleted) {
          // Mengambil data dari localStorage
          const todoData = JSON.parse(localStorage.getItem('todoData')) || [];
          const completedData = JSON.parse(localStorage.getItem('completedData')) || [];
      
          // Menghapus item dari array yang sesuai
          if (isCompleted) {
              completedData.splice(index, 1);
          } else {
              todoData.splice(index, 1);
          }
      
          // Menyimpan data yang sudah diperbarui kembali ke localStorage
          localStorage.setItem('todoData', JSON.stringify(todoData));
          localStorage.setItem('completedData', JSON.stringify(completedData));
      
          // Menampilkan data yang telah disimpan
          displayDataFromLocalStorage();
      }
      
      // Menampilkan data yang telah disimpan saat halaman pertama kali dimuat
      displayDataFromLocalStorage();