<template>
  <div
    class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
  >
    <h1 class="h2">Dashboard Manager Operasional</h1>
    <div>
      <button
        @click.prevent="printGym(gyms)"
        class="btn btn-md btn-success mb-5"
      >
        Laporan Gym Bulanan
      </button>
      <button
        @click.prevent="printKelas(kelast)"
        class="btn btn-md btn-success mb-5"
      >
        Laporan Kelas Bulanan
      </button>
    </div>
  </div>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-12">
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <router-link
              :to="{ name: 'jadwalumum.create' }"
              class="btn btn-md btn-success mb-5"
              >Tambah Jadwal Umum</router-link
            >
            <table class="table table-striped table-bordered mt- 4">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">Jam Mulai</th>
                  <th scope="col">Hari</th>
                  <th scope="col">Nama Kelas</th>
                  <th scope="col">Nama Instruktur</th>
                  <th scope="col">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(umum, id) in umums" :key="id">
                  <td>{{ umum.jam }}</td>
                  <td>{{ umum.hari }}</td>
                  <td>{{ umum.kelas }}</td>
                  <td>{{ umum.instruktur }}</td>
                  <td class="text-center">
                    <router-link
                      :to="{
                        name: 'jadwalumum.edit',
                        params: { id: umum.id },
                      }"
                      class="btn btn-success"
                    >
                      EDIT</router-link
                    >
                    <div>
                      <button
                        @click.prevent="umumDelete(umum.id)"
                        class="btn btn-danger ml-1"
                      >
                        DELETE
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
</template>
<script>
import axios from "axios";
import { onMounted, ref } from "vue";
export default {
  setup() {
    //reactive state
    let umums = ref([]);
    let kelast = ref([]);
    let instrukturs = ref([]);
    let kelas = ref([]);
    let gyms = ref([]);

    // function totalGym() {
    //   this.totalGym = this.gyms.reduce((total, row) => total + row.count, 0);
    // }
    //mounted
    onMounted(() => {
      //get API from Laravel Backend
      axios
        .get("http://localhost:8000/api/jadwalumum")
        .then((response) => {
          //assign state posts with response data
          umums.value = response.data.data;
        })
        .catch((error) => {
          console.log(error.response.data);
        });

      axios
        .get("http://localhost:8000/api/kelas")
        .then((response) => {
          //assign state posts with response data
          kelast.value = response.data.data;
        })
        .catch((error) => {
          console.log(error.response.data);
        });

      axios
        .get("http://localhost:8000/api/instruktur")
        .then((response) => {
          //assign state posts with response data
          instrukturs.value = response.data.data;
        })
        .catch((error) => {
          console.log(error.response.data);
        });
      axios
        .get("http://localhost:8000/api/laporanKelas")
        .then((response) => {
          kelas.value = response.data.data;
        })
        .catch((error) => {
          console.log(error.response.data);
        });
      axios
        .get("http://localhost:8000/api/laporanGym")
        .then((response) => {
          gyms.value = response.data.data;
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    });

    function umumDelete(id) {
      axios
        .delete(`http://localhost:8000/api/jadwalumum/${id}`)
        .then(() => {
          umums.value.splice(umums.value.indexOf(id), 1);
          location.reload(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    function total() {
      return gyms.value.reduce((total, row) => total + row.count, 0);
    }

    function printGym() {
      var printgym = window.open("", "PRINT", "height=800, width=600");
      printgym.document.write(`<div id="element-to-convert">
             <strong>GoFit</strong>
              <p>Jl. CentralPark No. 10 Yogyakarta</p>
              <p>
                <strong><u>LAPORAN AKTIVITAS GYM Bulanan</u></strong><br>
                <u>Bulan : Mei    Tahun : 2023</u> <br>
              Tanggal cetak : 30 Mei 2023<br>
              <table>
                <thead>
                    <tr>
                        <th>Tanggal</th>
                        <th>Jumlah Member</th>
                    </tr>
                </thead>
                <tbody>
                  ${this.gyms
                    .map(
                      (row) => `
                        <tr>
                            <td>${row.tanggal}</td>
                            <td>${row.count}</td>
                        </tr>
                    `
                    )
                    .join("")}
                      <tr>
                        <td><strong>Total</strong></td>
                        <td>${total()}</td>
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
                width: 400px;
                height: 320px;

                background: #FFFFFF;
                border: 1px solid #000000;
                box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
                border-radius: 9px;
              }

              </style>`);
      printgym.document.close();
      printgym.print();
      setTimeout(() => {
        printgym.close();
      }, 1000);
    }

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

    //return
    return {
      kelast,
      instrukturs,
      umums,
      umumDelete,
      gyms,
      kelas,
      // totalGym,
      printGym,
      printKelas,
    };
  },
};
</script>
<style>
button {
  margin-right: 10px;
  padding: 10px 20px;
  border: 1px solid #ddd;
  color: #333;
  background-color: #fff;
  border-radius: 4px;
  font-size: 14px;
  font-family: "微软雅黑", arail;
  cursor: pointer;
}
</style>
