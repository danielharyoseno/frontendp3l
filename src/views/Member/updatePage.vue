<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-12">
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <h4>UPDATE MEMBER</h4>
            <hr />
            <form @submit.prevent="update">
              <div class="form-group mb-3">
                <label class="form-label">NAMA MEMBER</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="member.nama_member"
                  placeholder="Masukkan nama member"
                />
                <!-- validation -->
                <div
                  v-if="validation.nama_member"
                  class="mt-2 alert alert-danger"
                >
                  {{ validation.nama_member[0] }}
                </div>
              </div>

              <div class="form-group mb-3">
                <label class="form-label">ALAMAT MEMBER</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="member.alamat_member"
                  placeholder="Masukkan alamat member"
                />
                <!-- validation -->
                <div
                  v-if="validation.alamat_member"
                  class="mt-2 alert alert-danger"
                >
                  {{ validation.alamat_member[0] }}
                </div>
              </div>

              <div class="form-group mb-3">
                <label class="form-label">TANGGAL LAHIR MEMBER</label>
                <input
                  type="date"
                  class="form-control"
                  datepicker
                  v-model="member.tgl_lahir"
                  placeholder="Masukkan tanggal lahir member"
                />
                <!-- validation -->
                <div
                  v-if="validation.tgl_lahir"
                  class="mt-2 alert alert-danger"
                >
                  {{ validation.tgl_lahir[0] }}
                </div>
              </div>

              <div class="form-group mb-3">
                <label class="form-label">EMAIL MEMBER</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="member.email_member"
                  placeholder="Masukkan email member"
                />
                <!-- validation -->
                <div
                  v-if="validation.email_member"
                  class="mt-2 alert alert-danger"
                >
                  {{ validation.email_member[0] }}
                </div>
              </div>

              <div class="form-group mb-3">
                <label for="content" class="form-label"
                  >Nomor Telephone Member</label
                >
                <input
                  class="form-control"
                  type="number"
                  v-model="member.notel_member"
                  placeholder="Masukkan nomor telephone"
                />
                <!-- validation -->
                <div
                  v-if="validation.jumlah_pegawai"
                  class="mt-2 alert alert-danger"
                >
                  {{ validation.notel_member[0] }}
                </div>
              </div>

              <div class="form-group mb-3">
                <label class="form-label">Usernmae Member</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="member.username_member"
                  placeholder="Masukkan username member"
                />
                <!-- validation -->
                <div
                  v-if="validation.username_member"
                  class="mt-2 alert alert-danger"
                >
                  {{ validation.username_member[0] }}
                </div>
              </div>

              <div class="form-group mb-3">
                <label class="form-label">Password Member</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="member.password_member"
                  placeholder="Masukkan password member"
                />
                <!-- validation -->
                <div
                  v-if="validation.password_member"
                  class="mt-2 alert alert-danger"
                >
                  {{ validation.password_member[0] }}
                </div>
              </div>

              <div class="form-group mb-3">
                <label for="content" class="form-label"
                  >Saldo Deposit Member</label
                >
                <input
                  class="form-control"
                  type="number"
                  v-model="member.saldo_deposit_member"
                  placeholder="Saldo Deposit Member"
                />
                <!-- validation -->
                <div
                  v-if="validation.saldo_deposit_member"
                  class="mt-2 alert alert-danger"
                >
                  {{ validation.saldo_deposit_member[0] }}
                </div>
              </div>

              <div class="form-group mb-3">
                <label for="content" class="form-label"
                  >Masa Berlaku Member</label
                >
                <input
                  class="form-control"
                  type="date"
                  datepicker
                  v-model="member.masa_berlaku_member"
                  placeholder="Masa Berlaku Member"
                />
                <!-- validation -->
                <div
                  v-if="validation.masa_berlaku_member"
                  class="mt-2 alert alert-danger"
                >
                  {{ validation.masa_berlaku_member[0] }}
                </div>
              </div>

              <button type="submit" class="btn btn-primary">SIMPAN</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { onMounted, reactive, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";
export default {
  setup() {
    //state departemen
    const member = reactive({
      id: "",
      no_member: "",
      nama_member: "",
      alamat_member: "",
      tgl_lahir: "",
      email_member: "",
      notel_member: "",
      username_member: "",
      password_member: "",
      saldo_deposit_member: "",
      masa_berlaku_member: "",
    });

    //state validation
    const validation = ref([]);
    const router = useRouter();
    const route = useRoute();

    onMounted(() => {
      axios
        .get(`http://localhost:8000/api/member/${route.params.id}`)
        .then((response) => {
          member.nama_member = response.data.data.nama_member;
          member.alamat_member = response.data.data.alamat_member;
          member.tgl_lahir = response.data.data.tgl_lahir;
          member.email_member = response.data.data.email_member;
          member.notel_member = response.data.data.notel_member;
          member.username_member = response.data.data.username_member;
          member.password_member = response.data.data.password_member;
          member.saldo_deposit_member = response.data.data.saldo_deposit_member;
          member.masa_berlaku_member = response.data.data.masa_berlaku_member;
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    });

    //method update
    function update() {
      let nama_member = member.nama_member;
      let alamat_member = member.alamat_member;
      let tgl_lahir = member.tgl_lahir;
      let email_member = member.email_member;
      let notel_member = member.notel_member;
      let username_member = member.username_member;
      let password_member = member.password_member;
      let saldo_deposit_member = member.saldo_deposit_member;
      let masa_berlaku_member = member.masa_berlaku_member;
      axios
        .put(`http://localhost:8000/api/member/${route.params.id}`, {
          nama_member: nama_member,
          alamat_member: alamat_member,
          tgl_lahir: tgl_lahir,
          email_member: email_member,
          notel_member: notel_member,
          username_member: username_member,
          password_member: password_member,
          saldo_deposit_member: saldo_deposit_member,
          masa_berlaku_member: masa_berlaku_member,
        })
        .then(() => {
          //redirect ke post index
          router.push({
            name: "member.index",
          });
        })
        .catch((error) => {
          //assign state validation with error
          validation.value = error.response.data;
        });
    }
    //return
    return {
      member,
      validation,
      router,
      update,
      route,
    };
  },
};
</script>
<style></style>
