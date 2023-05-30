<template>
  <main>
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
    >
      <h1 class="h1">Dashboard MO</h1>
    </div>
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-12">
          <div class="card border-0 rounded shadow">
            <div class="card-body">
              <h2 style="text-align: center">Laporan Kelas Bulanan</h2>
              <table class="table table-striped table-bordered mt- 4">
                <thead class="thead-dark">
                  <tr>
                    <th scope="col">Laporan</th>
                    <th scope="col">Cetak Laporan</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Laporan Kelas Bulanan</td>
                    <td class="text-center">
                      <div>
                        <button
                          @click.prevent="printKelas()"
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
    let kelas = ref([]);

    const router = useRouter();
    //mounted
    onMounted(() => {
      //get API from Laravel Backend
      axios
        .get("http://localhost:8000/api/laporanKelas")
        .then((response) => {
          kelas.value = response.data.data;
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    });

    function printKelas() {
      var printkelas = window.open("", "PRINT", "height=800, width=600");
      printkelas.document.write(`<div id="element-to-convert">
             <strong>GoFit</strong>
              <p>Jl. CentralPark No. 10 Yogyakarta</p>
              <p>
                <strong><u>LAPORAN AKTIVITAS KELAS Bulanan</u></strong><br>
                <u>Bulan : Mei    Tahun : 2023</u> <br>
              Tanggal cetak : 30 Mei 2023<br>
              <table>
                <thead>
                    <tr>
                        <th>Kelas</th>
                        <th>Instruktur</th>
                        <th>Jumlah Peserta</th>
                        <th>Jumlah Libur</th>
                    </tr>
                </thead>
                <tbody>
                    ${this.kelas
                      .map(
                        (row) => `
                        <tr>
                            <td>${row.kelas}</td>
                            <td>${row.instruktur}</td>
                            <td>${row.jumlah_peserta_kelas}</td>
                            <td>${row.jumlah_libur}</td>
                        </tr>
                    `
                      )
                      .join("")}
                </tr>
                </tbody>
              </table>
              </div>
              <style>
              table {
            border-collapse: collapse;
            width: 100%;
        }
        
        th, td {
            border: 1px solid black;
            padding: 8px;
            text-align: left;
        }
        
        th {
            background-color: #f2f2f2;
        }
              #element-to-convert {
                box-sizing: border-box;
                position: center;
                width: 620px;
                height: 320px;

                background: #FFFFFF;
                border: 1px solid #000000;
                box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
                border-radius: 9px;
              }

              </style>`);
      printkelas.document.close();
      printkelas.print();
      setTimeout(() => {
        printkelas.close();
      }, 1000);
    }
    return {
      kelas,
      router,
      printKelas,
    };
  },
};
</script>
<style></style>
