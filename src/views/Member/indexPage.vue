<template>
  <div
    class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
  >
    <h1 class="h2">Dashboard Kasir</h1>
    <div>
      <div
        class="btn-group"
        role="group"
        aria-label="Basic radio toggle button group"
      >
        <input
          @click="Deaktivasi()"
          :disabled="buttonClicked"
          type="radio"
          class="btn-check"
          name="btnradio"
          id="btnradio1"
          autocomplete="off"
          checked
        />
        <label class="btn btn-outline-primary" for="btnradio1"
          >Deaktivasi Member</label
        >

        <input
          @click="ResetInst()"
          :disabled="button1Clicked"
          type="radio"
          class="btn-check"
          name="btnradio"
          id="btnradio2"
          autocomplete="off"
        />
        <label class="btn btn-outline-primary" for="btnradio2"
          >Reset Instruktur</label
        >
      </div>
    </div>
  </div>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-12">
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <router-link
              :to="{ name: 'member.create' }"
              class="btn btn-md btn-success mb-5"
              >Tambah Member</router-link
            >
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
                  <th scope="col">Status Membership</th>
                  <th scope="col">Aksi</th>
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
                  <td>{{ member.status_membership }}</td>
                  <td class="text-center">
                    <router-link
                      :to="{
                        name: 'member.edit',
                        params: { id: member.id },
                      }"
                      class="btn btn-success"
                    >
                      EDIT</router-link
                    >
                    <div>
                      <button
                        @click.prevent="memberDelete(member.id)"
                        class="btn btn-danger ml-1"
                      >
                        DELETE
                      </button>
                    </div>
                  </td>
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
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
export default {
  data() {
    //reactive state
    let members = ref([]);
    const router = useRouter();
    //mounted
    onMounted(() => {
      //get API from Laravel Backend
      axios
        .get("http://localhost:8000/api/member")
        .then((response) => {
          //assign state posts with response data
          members.value = response.data.data;
        })
        .catch((error) => {
          console.log(error.response.data);
        });

      //member

      const clickMember = localStorage.getItem("buttonClicked");
      if (clickMember) {
        this.buttonClicked = JSON.parse(clickMember);
      }

      //instruktur

      const clickInstruktur = localStorage.getItem("button1Clicked");
      if (clickInstruktur) {
        this.button1Clicked = JSON.parse(clickInstruktur);
      }
    });

    function memberDelete(id) {
      axios
        .delete(`http://localhost:8000/api/member/${id}`)
        .then(() => {
          members.value.splice(members.value.indexOf(id), 1);
          location.reload(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    function Deaktivasi() {
      if (!this.buttonClicked) {
        router.push({
          name: "member.expired",
        });
        this.buttonClicked = false; //false / true
        localStorage.setItem(
          "buttonClicked",
          JSON.stringify(this.buttonClicked)
        );
      }
    }
    function ResetInst() {
      if (!this.button1Clicked) {
        axios
          .get(`http://localhost:8000/api/resetInstruktur`)
          .then((response) => {
            alert(response.data.message);
            router.push({
              name: "member.index",
            });
          });
        this.button1Clicked = true; //false / true
        localStorage.setItem(
          "button1Clicked",
          JSON.stringify(this.button1Clicked)
        );
      }
    }
    return {
      router,
      members,
      memberDelete,
      Deaktivasi,
      ResetInst,
      buttonClicked: false,
      button1Clicked: false,
    };
  },
};
</script>
<style></style>
