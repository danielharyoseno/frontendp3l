<template>
  <div
    class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
  >
    <h1 class="h2">Dashboard Admin</h1>
  </div>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-12">
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <table class="table table-striped table-bordered mt- 4">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">Nama Instruktur</th>
                  <th scope="col">Nama Pengganti</th>
                  <th scope="col">Kelas</th>
                  <th scope="col">Hari</th>
                  <th scope="col">Tanggal Pengajuan</th>
                  <th scope="col">Tanggal Ijin</th>
                  <th scope="col">Jam Ijin</th>
                  <th scope="col">Keterangan</th>
                  <th scope="col">Status</th>
                  <th scope="col">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(ijin, id) in ijins" :key="id">
                  <td>{{ ijin.id_instruktur }}</td>
                  <td>{{ ijin.id_instruktur_pengganti }}</td>
                  <td>{{ ijin.id_jadwal_harian }}</td>
                  <td>{{ ijin.hari }}</td>
                  <td>{{ ijin.pengajuan_ijin }}</td>
                  <td>{{ ijin.tanggal_ijin }}</td>
                  <td>{{ ijin.sesi_ijin }}</td>
                  <td>{{ ijin.keterangan_ijin }}</td>
                  <td>{{ ijin.status }}</td>
                  <td>{{ instruktur.username_instruktur }}</td>
                  <td class="text-center"></td>
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
    let ijins = ref([]);
    //mounted
    onMounted(() => {
      //get API from Laravel Backend
      axios
        .get("http://localhost:8000/api/ijinInstruktur")
        .then((response) => {
          //assign state posts with response data
          ijins.value = response.data.data;
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    });

    //return
    return {
      ijins,
    };
  },
};
</script>
<style></style>
