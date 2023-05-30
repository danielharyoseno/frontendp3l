<template>
  <main>
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
    >
      <h1 class="h1">Dashboard Kasir</h1>
    </div>
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-12">
          <div class="card border-0 rounded shadow">
            <div class="card-body">
              <h2 style="text-align: center">Presensi Kelas</h2>
              <table class="table table-striped table-bordered mt- 4">
                <thead class="thead-dark">
                  <tr>
                    <th scope="col">No Booking</th>
                    <th scope="col">Nama</th>
                    <th scope="col">Kelas</th>
                    <th scope="col">Instruktur</th>
                    <th scope="col">Tanggal Kelas</th>
                    <th scope="col">Jam Mulai Kelas</th>
                    <th scope="col">Waktu Presensi</th>
                    <th scope="col">Status</th>
                    <th scope="col">Cetak Struk</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(kelas, id) in bookKelas" :key="id">
                    <td>{{ kelas.no_book }}</td>
                    <td>
                      {{ kelas.nama }}
                    </td>
                    <td>{{ kelas.nama_kelas }}</td>
                    <td>{{ kelas.nama_instruktur }}</td>
                    <td>{{ kelas.tgl_reserve }}</td>
                    <td>{{ kelas.jam_kelas }}</td>
                    <td>{{ kelas.waktu_presensi }}</td>
                    <td>{{ kelas.status }}</td>
                    <td class="text-center">
                      <div>
                        <button
                          @click.prevent="printCard(kelas)"
                          class="btn btn-md btn-success ml-1"
                        >
                          Cetak
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
export default {
  setup() {
    //reactive state
    let bookKelas = ref([]);
    const router = useRouter();
    //mounted
    onMounted(() => {
      //get API from Laravel Backend
      axios
        .get("http://localhost:8000/api/bookingKelas")
        .then((response) => {
          //assign state posts with response data
          bookKelas.value = response.data.data;
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    });

    function printCard(bookKelas) {
      var printKartu = window.open("", "PRINT", "height=400, width=600");
      if (bookKelas.tipe == "Paket") {
        printKartu.document.write(`<div id="element-to-convert">
                <strong>GoFit</strong>
                <p>Jl. CentralPark No. 10 Yogyakarta</p>
                <br>
                <strong>STRUK PRESENSI KELAS PAKET</strong>
                <p>No Struk: ${bookKelas.no_book}<br>
                Tanggal : ${bookKelas.waktu_presensi}<br>
                </p>
                <p>Member : ${bookKelas.no_member} / ${bookKelas.nama}<br>
                Kelas : ${bookKelas.nama_kelas}<br>
                Instruktur : ${bookKelas.nama_instruktur}<br>
                Sisa Deposit : ${bookKelas.sisa_deposit}x<br>
                Berlaku Sampai : ${bookKelas.expired}<br>
                </p>
              </div>
              <style>
              #element-to-convert {
                box-sizing: border-box;
                position: center;
                width: 300px;
                height: 280px;

                background: #FFFFFF;
                border: 1px solid #000000;
                box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
                border-radius: 9px;
              }

              </style>`);
        printKartu.document.close();
        printKartu.print();
        setTimeout(() => {
          printKartu.close();
        }, 1000);
      } else {
        printKartu.document.write(`<div id="element-to-convert">
                <strong>GoFit</strong>
                <p>Jl. CentralPark No. 10 Yogyakarta</p>
                <br>
                <strong>STRUK PRESENSI KELAS PAKET</strong>
                <p>No Struk: ${bookKelas.no_book}<br>
                Tanggal : ${bookKelas.waktu_presensi}<br>
                </p>
                <p>Member : ${bookKelas.no_member} / ${bookKelas.nama}<br>
                Kelas : ${bookKelas.nama_kelas}<br>
                Instruktur : ${bookKelas.nama_instruktur}<br>
                Tarif : Rp${bookKelas.tarif}<br>
                Sisa Deposit : Rp${bookKelas.saldo}<br>
                </p>
              </div>
              <style>
              #element-to-convert {
                box-sizing: border-box;
                position: center;
                width: 300px;
                height: 280px;

                background: #FFFFFF;
                border: 1px solid #000000;
                box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
                border-radius: 9px;
              }

              </style>`);
        printKartu.document.close();
        printKartu.print();
        setTimeout(() => {
          printKartu.close();
        }, 1000);
      }
    }
    

    //return
    return {
      bookKelas,
      router,
      printCard,
    };
  },
};
</script>
<style></style>
