<template>
  <div
    class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
  ></div>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-12">
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <button @click="ResetInst()" class="btn btn-md btn-danger mb-5">
              Reset Keterlambatan Instruktur
            </button>
            <table class="table table-striped table-bordered mt- 4">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">Nama</th>
                  <th scope="col">No Telephone</th>
                  <th scope="col">Jumlah Keterlambatan</th>
                  <th scope="col">Email</th>
                  <th scope="col">Password</th>
                  <th scope="col">Username</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(instruktur, id) in instrukturs" :key="id">
                  <td>{{ instruktur.nama_instruktur }}</td>
                  <td>{{ instruktur.notel_instruktur }}</td>
                  <td>{{ instruktur.jmlh_keterlambatan }}</td>
                  <td>{{ instruktur.email_instruktur }}</td>
                  <td>{{ instruktur.password_instruktur }}</td>
                  <td>{{ instruktur.username_instruktur }}</td>
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
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
export default {
  data() {
    const router = useRouter();
    //reactive state
    let instrukturs = ref([]);
    //mounted
    onMounted(() => {
      //get API from Laravel Backend
      axios
        .get("http://localhost:8000/api/absenInstruktur")
        .then((response) => {
          //assign state posts with response data
          instrukturs.value = response.data.data;
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    });

    function ResetInst() {
      if (!this.buttonClicked) {
        axios
          .get(`http://localhost:8000/api/resetInstruktur`)
          .then((response) => {
            alert(response.data.message);
            router.push({
              name: "member.index",
            });
          });
      }
    }
    //return
    return {
      instrukturs,
      ResetInst,
      router,
    };
  },
};
</script>
<style></style>
