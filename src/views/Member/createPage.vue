<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-12">
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <h4>TAMBAH MEMBER</h4>
            <hr />
            <form @submit.prevent="store">
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
              <button type="submit" class="btn btn-primary">SIMPAN</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
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
    });
    //state validation
    const validation = ref([]);
    //vue router
    const router = useRouter();
    //method store
    function store() {
      let nama_member = member.nama_member;
      let alamat_member = member.alamat_member;
      let tgl_lahir = member.tgl_lahir;
      let email_member = member.email_member;
      let notel_member = member.notel_member;
      let username_member = member.username_member;
      let password_member = member.password_member;
      axios
        .post("http://localhost:8000/api/member", {
          nama_member: nama_member,
          alamat_member: alamat_member,
          tgl_lahir: tgl_lahir,
          email_member: email_member,
          notel_member: notel_member,
          username_member: username_member,
          password_member: password_member,
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
      store,
    };
  },
};
</script>
<style></style>
