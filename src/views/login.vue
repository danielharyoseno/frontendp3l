<!-- <template>
  <section class="vh-100 gradient-custom">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
          <div class="card text-black" style="border-radius: 1rem">
            <div class="card-body p-5 text-center">
              <div class="mb-md-5 mt-md-4 pb-5">
                <h2 class="fw-bold mb-2 text-uppercase">Login</h2>
                <p class="text-black-50 mb-5">
                  Masukan Username Dan Password Anda !!
                </p>

                <div class="form-outline form-white mb-4">
                  <label class="form-label" for="username">Username</label>
                  <input
                    type="text"
                    id="Username"
                    class="form-control form-control-lg"
                    v-model="user.username"
                  />
                </div>
                <div class="form-outline form-white mb-4">
                  <label class="form-label" for="username">id</label>
                  <input
                    type="int"
                    id="id"
                    class="form-control form-control-lg"
                    v-model="user.id"
                  />
                </div>

                <div class="form-outline form-white mb-4">
                  <label class="form-label" for="Password">Password</label>
                  <input
                    type="text"
                    id="Password"
                    class="form-control form-control-lg"
                    v-model="user.password"
                  />
                </div>
                <button class="btn btn-primary btn-lg px-5" @click="login()">
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";
import { response } from "express";
export default {
  name: "loginPage",
  setup() {
    let user = ref([]);
    const router = useRouter();
    const route = useRoute();

    onMounted(() => {
      //get API from Laravel Backend
      axios
        .get("http://localhost:8000/api/user")
        .then((response) => {
          //assign state posts with response data
          user.value = response.data.data;
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    });

    function login() {
      localStorage.setItem("username", response.data.data.username);
      let username = localStorage.getItem("username");
      if (username == "kasir") {
        router.push({
          name: "member.dashboardkasir",
        });
      } else if (username == "manager") {
        router.push({
          name: "jadwalumum.dashboardmo",
        });
      } else if (username == "admin") {
        router.push({
          name: "instruktur.dashboardadmin",
        });
      }
      // axios
      // .get(`http://localhost:8000/api/user/${route.params.id}`)
      // .then((res) => {
      //   if (id == "10") {
      //     router.push({
      //       name: "member.dashboardkasir",
      //     });
      //   } else if (id == "9") {
      //     router.push({
      //       name: "jadwalumum.dashboardmo",
      //     });
      //   } else if (id == "7") {
      //     router.push({
      //       name: "instruktur.dashboardadmin",
      //     });
      //   }
      // })
      // .catch((err) => {
      //   this.errors = err.response.data.errors || {};
      // });
    }

    return {
      user,
      router,
      login,
      route,
    };
  },
};
</script>
<style>
.gradient-custom {
  background: #00416a;

  background: -webkit-linear-gradient(
    to right,
    rgba(0, 65, 106),
    rgba(106, 147, 203)
  );

  background: linear-gradient(to right, rgba(0, 65, 106), rgba(106, 147, 203));
}
</style> -->
