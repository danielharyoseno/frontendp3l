<template>
  <div
    class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
  ></div>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-12">
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <button
              @click="Deaktivasi()"
              class="btn btn-md btn-danger mb-5"
              :disabled="buttonClicked"
            >
              Deaktivasi
            </button>
            <table class="table table-striped table-bordered mt- 4">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">No Member</th>
                  <th scope="col">Nama</th>
                  <th scope="col">Alamat</th>
                  <th scope="col">Tgl Lahir</th>
                  <th scope="col">Email</th>
                  <th scope="col">Nomor Telephone</th>
                  <th scope="col">Username</th>
                  <th scope="col">Saldo Deposit</th>
                  <th scope="col">Masa Berlaku</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(member, id) in members" :key="id">
                  <td>{{ member.no_member }}</td>
                  <td>{{ member.nama_member }}</td>
                  <td>{{ member.alamat_member }}</td>
                  <td>{{ member.tgl_lahir }}</td>
                  <td>{{ member.email_member }}</td>
                  <td>{{ member.notel_member }}</td>
                  <td>{{ member.username_member }}</td>
                  <td>{{ member.saldo_deposit_member }}</td>
                  <td>{{ member.masa_berlaku_member }}</td>
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
    let members = ref([]);
    //mounted
    onMounted(() => {
      //get API from Laravel Backend
      axios
        .get(`http://localhost:8000/api/memberKedaluwarsa`)
        .then((response) => {
          //assign state posts with response data
          members.value = response.data.data;
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    });

    function Deaktivasi() {
      if (!this.buttonClicked) {
        axios
          .get(`http://localhost:8000/api/deaktivasiMember`)
          .then((response) => {
            alert(response.data.message);
            router.push({
              name: "member.index",
            });
          });
      }
    }
    return {
      router,
      members,
      Deaktivasi,
    };
  },
};
</script>
<style></style>
