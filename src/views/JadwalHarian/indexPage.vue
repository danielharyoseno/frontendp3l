<template>
  <div
    class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
  >
    <h1 class="h1">Dashboard Manager Operasional</h1>
    <div>
      <button
        @click.prevent="generateJadwal()"
        class="btn btn-md btn-success mb-5"
      >
        Generate Jadwal Harian
      </button>
    </div>
  </div>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-12">
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <h2 style="text-align: center">Jadwal Harian</h2>
            <table class="table table-striped table-bordered mt- 4">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">Tanggal</th>
                  <th scope="col">Hari</th>
                  <th scope="col">Jam</th>
                  <th scope="col">Nama Kelas</th>
                  <th scope="col">Nama Instruktur</th>
                  <th scope="col">Keterangan</th>
                  <th scope="col">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(harian, id) in harians" :key="id">
                  <td>{{ harian.tgl }}</td>
                  <td>{{ harian.hari }}</td>
                  <td>{{ harian.jam }}</td>
                  <td>{{ harian.nama_kelas }}</td>
                  <td>{{ harian.instruktur }}</td>
                  <td>{{ harian.keterangan }}</td>
                  <td class="text-center">
                    <div>
                      <button
                        @click.prevent="harianUpdate(harian.id)"
                        class="btn btn-danger ml-1"
                      >
                        Update
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
import { useRouter } from "vue-router";
export default {
  setup() {
    //reactive state
    let umums = ref([]);
    let harians = ref([]);
    let instrukturs = ref([]);
    const router = useRouter();
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
        .get("http://localhost:8000/api/jadwalharian")
        .then((response) => {
          //assign state posts with response data
          harians.value = response.data.data;
          router.push({
            name: "jadwalharian.index",
          });
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
    });

    function generateJadwal() {
      axios
        .post("http://localhost:8000/api/jadwalharian")
        .then((response) => {
          alert(response.data.message);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }

    function harianUpdate(id) {
      axios
        .put(`http://localhost:8000/api/jadwalharian/${id}`)
        .then(() => {
          harians.value.splice(harians.value.indexOf(id), 1);
          location.reload(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    //return
    return {
      harians,
      instrukturs,
      umums,
      router,
      generateJadwal,
      harianUpdate,
    };
  },
};
</script>
<style></style>
