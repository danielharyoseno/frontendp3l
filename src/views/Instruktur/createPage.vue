<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-12">
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <h4>TAMBAH INSTRUKTUR</h4>
            <hr />
            <form @submit.prevent="store">
              <div class="form-group mb-3">
                <label class="form-label">Nama Instruktur</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="instruktur.nama_instruktur"
                  placeholder="Masukkan nama instruktur"
                />
                <!-- validation -->
                <div
                  v-if="validation.nama_instruktur"
                  class="mt-2 alert alert-danger"
                >
                  {{ validation.nama_instruktur[0] }}
                </div>
              </div>
              <div class="form-group mb-3">
                <label for="content" class="form-label"
                  >Nomor Telephone Instruktur</label
                >
                <input
                  class="form-control"
                  type="number"
                  v-model="instruktur.notel_instruktur"
                  placeholder="Masukkan nomor telephone"
                />
                <!-- validation -->
                <div
                  v-if="validation.jumlah_pegawai"
                  class="mt-2 alert alert-danger"
                >
                  {{ validation.notel_instruktur[0] }}
                </div>
              </div>
              <div class="form-group mb-3">
                <label for="content" class="form-label"
                  >Jumlah Keterlambatan</label
                >
                <input
                  class="form-control"
                  type="number"
                  v-model="instruktur.jmlh_keterlambatan"
                  placeholder="Jumlah Keterlambatan"
                />
                <!-- validation -->
                <div
                  v-if="validation.jmlh_keterlambatan"
                  class="mt-2 alert alert-danger"
                >
                  {{ validation.jmlh_keterlambatan[0] }}
                </div>
              </div>
              <div class="form-group mb-3">
                <label for="content" class="form-label">Email Instruktur</label>
                <input
                  class="form-control"
                  v-model="instruktur.email_instruktur"
                  placeholder="Masukkan email instruktur"
                />
                <!-- validation -->
                <div
                  v-if="validation.email_instruktur"
                  class="mt-2 alert alert-danger"
                >
                  {{ validation.email_instruktur[0] }}
                </div>
              </div>
              <div class="form-group mb-3">
                <label for="content" class="form-label"
                  >Password Instruktur</label
                >
                <input
                  class="form-control"
                  v-model="instruktur.password_instruktur"
                  placeholder="Masukkan password instruktur"
                />
                <!-- validation -->
                <div
                  v-if="validation.password_instruktur"
                  class="mt-2 alert alert-danger"
                >
                  {{ validation.password_instruktur[0] }}
                </div>
              </div>
              <div class="form-group mb-3">
                <label for="content" class="form-label"
                  >Username Instruktur</label
                >
                <input
                  class="form-control"
                  v-model="instruktur.username_instruktur"
                  placeholder="Masukkan username instruktur"
                />
                <!-- validation -->
                <div
                  v-if="validation.username_instruktur"
                  class="mt-2 alert alert-danger"
                >
                  {{ validation.username_instruktur[0] }}
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
    const instruktur = reactive({
      id: "",
      nama_instruktur: "",
      notel_instruktur: "",
      jmlh_keterlambatan: "",
      email_instruktur: "",
      password_instruktur: "",
      username_instruktur: "",
    });
    //state validation
    const validation = ref([]);
    //vue router
    const router = useRouter();
    //method store
    function store() {
      let nama_instruktur = instruktur.nama_instruktur;
      let notel_instruktur = instruktur.notel_instruktur;
      let jmlh_keterlambatan = instruktur.jmlh_keterlambatan;
      let email_instruktur = instruktur.email_instruktur;
      let password_instruktur = instruktur.password_instruktur;
      let username_instruktur = instruktur.username_instruktur;
      axios
        .post("http://localhost:8000/api/instruktur", {
          nama_instruktur: nama_instruktur,
          notel_instruktur: notel_instruktur,
          jmlh_keterlambatan: jmlh_keterlambatan,
          email_instruktur: email_instruktur,
          password_instruktur: password_instruktur,
          username_instruktur: username_instruktur,
        })
        .then(() => {
          //redirect ke post index
          router.push({
            name: "instruktur.index",
          });
        })
        .catch((error) => {
          //assign state validation with error
          validation.value = error.response.data;
        });
    }
    //return
    return {
      instruktur,
      validation,
      router,
      store,
    };
  },
};
</script>
<style></style>
