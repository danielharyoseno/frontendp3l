<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-12">
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <h4>Update Instruktur</h4>
            <hr />
            <form @submit.prevent="update">
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
                  >Jumlah Keterlambatanr</label
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
import { onMounted, reactive, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
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
    const validation = ref([]);
    const router = useRouter();
    const route = useRoute();

    onMounted(() => {
      axios
        .get(`http://localhost:8000/api/instruktur/${route.params.id}`)
        .then((response) => {
          instruktur.nama_instruktur = response.data.data.nama_instruktur;
          instruktur.notel_instruktur = response.data.data.notel_instruktur;
          instruktur.jmlh_keterlambatan = response.data.data.jmlh_keterlambatan;
          instruktur.email_instruktur = response.data.data.email_instruktur;
          instruktur.password_instruktur =
            response.data.data.password_instruktur;
          instruktur.username_instruktur =
            response.data.data.username_instruktur;
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    });

    function update() {
      let nama_instruktur = instruktur.nama_instruktur;
      let notel_instruktur = instruktur.notel_instruktur;
      let jmlh_keterlambatan = instruktur.jmlh_keterlambatan;
      let email_instruktur = instruktur.email_instruktur;
      let password_instruktur = instruktur.password_instruktur;
      let username_instruktur = instruktur.username_instruktur;
      axios
        .put(`http://localhost:8000/api/instruktur/${route.params.id}`, {
          nama_instruktur: nama_instruktur,
          notel_instruktur: notel_instruktur,
          jmlh_keterlambatan: jmlh_keterlambatan,
          email_instruktur: email_instruktur,
          password_instruktur: password_instruktur,
          username_instruktur: username_instruktur,
        })
        .then(() => {
          router.push({
            name: "instruktur.index",
          });
        })
        .catch((error) => {
          validation.value = error.response.data;
        });
    }
    return {
      instruktur,
      validation,
      router,
      update,
      //getData,
    };
  },
};
</script>
<style></style>
