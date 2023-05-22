<template>
  <main>
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
    >
      <h1 class="h1">Dashboard Kasir</h1>
    </div>
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-12">
          <div class="card border-0 rounded shadow">
            <div class="card-body">
              <h2 style="text-align: center">Booking Gym</h2>
              <table class="table table-striped table-bordered mt- 4">
                <thead class="thead-dark">
                  <tr>
                    <th scope="col">No Booking</th>
                    <th scope="col">Nama</th>
                    <th scope="col">Sesi</th>
                    <th scope="col">Tanggal Booking</th>
                    <th scope="col">Waktu Presensi</th>
                    <th scope="col">Status</th>
                    <th scope="col">Presensi</th>
                    <th scope="col">Cetak Struk</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(gym, id) in BookGyms" :key="id">
                    <td>{{ gym.no_book }}</td>
                    <td>
                      {{ gym.nama }}
                    </td>
                    <td>{{ gym.sesi }}</td>
                    <td>{{ gym.booking }}</td>
                    <td>{{ gym.waktu_presensi }}</td>
                    <td>{{ gym.status }}</td>
                    <td class="text-center">
                      <div>
                        <button
                          @click.prevent="gymUpdate(gym.id)"
                          class="btn btn-danger ml-1"
                        >
                          Presensi
                        </button>
                      </div>
                    </td>
                    <td class="text-center">
                      <div>
                        <button
                          @click.prevent="printCard(gym)"
                          class="btn btn-md btn-success ml-1"
                        >
                          Cetak
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
  </main>
</template>
<script>
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
export default {
  setup() {
    //reactive state
    let BookGyms = ref([]);
    let members = ref([]);

    const router = useRouter();
    //mounted
    onMounted(() => {
      //get API from Laravel Backend
      axios
        .get("http://localhost:8000/api/bookingGym")
        .then((response) => {
          //assign state posts with response data
          BookGyms.value = response.data.data;
        })
        .catch((error) => {
          console.log(error.response.data);
        });

      axios
        .get("http://localhost:8000/api/member")
        .then((response) => {
          //assign state posts with response data
          members.value = response.data.data;
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    });

    function gymUpdate(id) {
      axios
        .put(`http://localhost:8000/api/bookingGym/${id}`)
        .then(() => {
          BookGyms.value.splice(BookGyms.value.indexOf(id), 1);
          //   location.reload(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    function printCard(BookGyms) {
      var printKartu = window.open("", "PRINT", "height=400, width=600");

      printKartu.document.write(`<div id="element-to-convert">
              <strong>GoFit</strong>
              <p>Jl. CentralPark No. 10 Yogyakarta</p>
              <br>
              <strong>STRUK PRESENSI GYM</strong>
              <p>No Struk: ${BookGyms.no_book}<br>
              Tanggal : ${BookGyms.waktu_presensi}<br>
              </p>
              <p>Member: ${BookGyms.no_member} / ${BookGyms.nama}<br>
              Slot Waktu : ${BookGyms.slot}<br>
              </p>
            </div>
            <style>
            #element-to-convert {
              box-sizing: border-box;
              position: center;
              width: 300px;
              height: 2225px;

              background: #FFFFFF;
              border: 1px solid #000000;
              box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
              border-radius: 9px;
            }

            </style>`);
      printKartu.document.close();
      printKartu.print();
      setTimeout(() => {
        printKartu.close();
      }, 1000);
    }

    // function Cetak() {
    //   console.log("cetak struk");
    //   // window.jsPDF = window.jspdf.jsPDF;
    //   let elementPrint = document.querySelector("#printtarget");
    //   elementPrint.style.display = "block";
    //   elementPrint.style.fontSize = "5px";

    //   //Spasi
    //   elementPrint.style.lineHeight = "1.2";
    //   elementPrint.style.margin = "0";
    //   elementPrint.style.padding = "0";

    //   let doc = new jsPDF({
    //     orientation: "l", // orientasi landscape
    //     unit: "mm", // satuan millimeter
    //     format: ["400", "100"], // ukuran kertas A4
    //   });

    //   doc.html(elementPrint, {
    //     callback: function (doc) {
    //       doc.save("struk.pdf");
    //       elementPrint.style.display = "none";
    //     },
    //     x: 10,
    //     y: 10,
    //   });
    //   console.log("akhir dari cetak pdf");
    // }

    //return
    return {
      members,
      BookGyms,
      router,
      printCard,
      gymUpdate,
    };
  },
};
</script>
<style></style>
