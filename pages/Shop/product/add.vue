<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" md="11">
        <form @submit.prevent="submit">
          <v-card
            elevation="2"
            style="margin-top: 2px; padding-bottom: 10px"
            class="mt-3"
          >
            <v-row no-gutters class="justify-center">
              <h2 style="margin-top: 30px">ເພີ່ມຂໍ້ມູນສິນຄ້າ</h2>
            </v-row>

            <v-row no-gutters class="ma-5 justify-space-around">
              <v-col cols="12" md="9">
                <v-card class="mr-4 elevation-0">
                  <v-text-field
                    v-model="products.proName"
                    :rules="[(v) => !!v || 'name is require']"
                    :counter="100"
                    label="ຊື່ສິນຄ້າ"
                    required
                    autofocus
                  >
                  </v-text-field>
                  <v-autocomplete
                    v-model="products.type_id"
                    :items="types"
                    item-text="typeName"
                    item-value="type_id"
                    :rules="[(v) => !!v || 'category is require']"
                    label="ປະເພດສິນຄ້າ"
                    allow-overflow
                    required
                  ></v-autocomplete>
                  <v-autocomplete
                    v-model="products.unit_id"
                    :items="units"
                    item-text="unitName"
                    item-value="unit_id"
                    :rules="[(v) => !!v || 'unit is require']"
                    label="ຫົວໜ່ວຍສິນຄ້າ"
                    allow-overflow
                    required
                  ></v-autocomplete>
                  <v-text-field
                    v-model="products.qty"
                    :rules="[(v) => !!v || 'qty is require']"
                    label="ຈໍານວນສິນຄ້າ"
                    required
                    @keydown.enter="focusText('priceIn')"
                    @keypress="inputQty($event)"
                    @keyup="zeroQty"
                  ></v-text-field>
                  <v-text-field
                    v-model="products.priceIn"
                    :rules="[(v) => !!v || 'price is require']"
                    label="ລາຄາສິນຄ້ານຳເຂົ້າ"
                    required
                    @keydown.enter="focusText('price')"
                    @keypress="inputPrice($event)"
                    id="priceIn"
                  ></v-text-field>
                  <v-text-field
                    v-model="products.price"
                    :rules="[(v) => !!v || 'price is require']"
                    label="ລາຄາສິນຄ້າຂາຍ"
                    required
                    @keydown.enter="focusText('details')"
                    @keypress="inputPrice($event)"
                    id="price"
                  ></v-text-field>
                  <v-text-field
                    v-model="products.details"
                    :rules="[(v) => !!v || 'price is require']"
                    label="ລາຍລະອຽດ"
                    required
                    id="details"
                  ></v-text-field>

                  <v-divider style="margin-top: -10px" class></v-divider>
                  <v-file-input
                    id="file"
                    v-model="file"
                    :rules="imageRules"
                    label="Image"
                    class="d-none"
                    prepend-icon="mdi-camera"
                    @change="onFileChange"
                    @click="upload"
                  ></v-file-input>
                  <!--------------------------- buttom profile -->
                  <v-btn class="mt-2" color="primary" small @click="upload">
                    <v-icon>mdi-tray-arrow-up</v-icon>
                    Profile
                  </v-btn>
                  <v-img :src="url" height="100" width="100"></v-img>
                  <v-divider style="margin-top: -10px" class></v-divider>
                  <h4 class="mt-5" style="font-size: 17px; font-weight: normal">
                    ເລຶອກຮູບສິນຄ້າ
                  </h4>
                  <v-file-input
                    v-model="selectedFiles"
                    accept="image/*"
                    label="ເລືອກຮູບ Banners"
                    multiple
                    filled
                    show-size
                    prepend-icon="mdi-camera"
                  >
                  </v-file-input>
                  <v-col cols="12" class="mb-5 mt-n5 d-flex flex-wrap">
                    <div
                      v-for="(item, index) in selectedFiles"
                      :key="index"
                      class="mx-1 red"
                    >
                      <v-img :src="getFileUrl(item)" width="100" height="100">
                        <template v-slot>
                          <div>
                            <v-row class="align-end justify-end">
                              <v-btn large icon @click="RemoveOne(index)">
                                <v-icon small color="red">mdi-close-box</v-icon>
                              </v-btn>
                            </v-row>
                          </div>
                        </template>
                      </v-img>
                    </div>
                  </v-col>
                </v-card>
              </v-col>
            </v-row>

            <v-divider class></v-divider>
            <v-row class="ma-5">
              <v-btn
                style="font-size: 16px; font-weight: bold; color: white"
                color="red"
                rounded
                class="mt-2"
                to="/Shop/product"
              >
                <v-icon left @click="$router.back()"
                  >mdi-arrow-left-circle</v-icon
                >ກັບສູ່ໜ້າສິນຄ້າ
              </v-btn>
              <v-spacer></v-spacer>

              <v-btn
                style="font-size: 16px; font-weight: bold; color: white"
                color="red accent-4"
                rounded
                class="mt-2 mr-7"
                @click="clear"
              >
                <v-icon left>mdi-close-circle</v-icon>ຍົກເລິກ
              </v-btn>

              <v-btn
                style="font-size: 16px; font-weight: bold; color: white"
                color="primary"
                rounded
                class="mt-2 mr-5"
                :loading="loading"
                @click="insert"
                :disabled="emty"
              >
                <v-icon left>mdi-check-circle</v-icon>ບັນທຶກ
              </v-btn>
            </v-row>
          </v-card>
        </form>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  layout: "shop",
  data() {
    return {
      products: {
        shop_id: null,
        qty: 1,
      },
      file: null,
      loading: false,
      selectedFiles: null,
      url: null,
      pro_id: "",
      urlImage: "",
      imageRules: [(v) => !!v || "Image is required"],
    };
  },
  computed: {
    emty() {
      if (
        !this.products.proName ||
        !this.products.type_id ||
        !this.products.unit_id ||
        !this.products.priceIn ||
        !this.products.price ||
        !this.file
      ) {
        return true;
      }
      return false;
    },
    units() {
      return this.$store.state.units.units;
    },
    types() {
      return this.$store.state.types.types;
    },
  },
  mounted() {
    this.$store.dispatch("units/units");
    this.$store.dispatch("types/types");
  },
  methods: {
    RemoveOne(index) {
      this.selectedFiles.splice(index, 1);
    },
    focusText(id) {
      const text = document.getElementById(id);
      text.focus();
    },
    onFileChange(e) {
      if (e) {
        this.url = URL.createObjectURL(e);
      }
    },
    upload() {
      document.getElementById("file").click();
    },
    getFileUrl(file) {
      return URL.createObjectURL(file);
    },
    async insert() {
      this.loading = true;
      if (
        !this.$cookies.get("user_id") ||
        this.$cookies.get("user_id") == "" ||
        this.$cookies.get("user_id") == null
      ) {
        this.$router.push("/login");
        return;
      }

        const file = this.file;
        const formData = new FormData();
        formData.append("file", file);
        this.urlImage = await this.$axios
          .post("/uploads/product", formData)
          .then((response) => {
            return response?.data?.url;
          })
          .catch((error) => {
            this.$toast.success("File upload failed", error);
          });
        this.products.profile = this.urlImage;

      var date = new Date().toJSON().slice(0, 10).replace(/-/g, "");
      var time = new Date()
        .toTimeString()
        .replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1", "")
        .replace(":", "")
        .replace(":", "");
      this.products.pro_id = "pro" + date.slice(2, date.length) + time;
      this.products.shop_id = this.$cookies.get("user_id");

      await this.$axios.post("/product", this.products).then((res) => {
        // return res?.data?.pro?.pro_id;
      });

      if (this.selectedFiles) {
        const formDatas = new FormData();
        for (const file of this.selectedFiles) {
          formDatas.append("files", file);
        }
        const config = {
          onUploadProgress: function (progressEvent) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            this.getPercentage = percentCompleted;
          },
        };
        // if(this.pro_id.length<0) return
        const res = await this.$axios.post(
          "/uploads/multiple",
          formDatas,
          config
        );
        await res.data.files.map((image) => {
          const imageUrl = image.url;
          //const name = image.originalName
          return this.$axios.post(`/image`, {
            pro_id: this.products.pro_id,
            url: imageUrl,
          });
        });
      }
      this.$toast.success("ເພີ່ມສີນຄ້າສຳເລັດ")
      this.clear();
      this.loading = false;
    },
    clear() {
      this.products = {
        shop_id: null,
        qty: 1,
      };
      this.file = "";
      this.selectedFiles = "";
      this.url = "";
    },

    zeroQty() {
      if (
        parseInt(this.products.qty, 10) < 1 ||
        (typeof this.products.qty == "string" && this.products.qty == "") ||
        this.products.qty == undefined
      ) {
        this.products.qty = 1;
        return;
      }
    },
    inputQty(evt) {
      evt = evt ? evt : window.event;
      let charCode = evt.which ? evt.which : evt.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        evt.preventDefault();
      } else {
        if (
          (typeof this.products.qty === "string" && this.products.qty === "") ||
          this.products.qty == undefined
        ) {
          this.products.qty = 1;
        } else {
          this.products.qty = parseInt(this.products.qty);
          console.log(this.products.qty);
        }
        return true;
      }
    },
    inputPrice(evt) {
      evt = evt ? evt : window.event;
      let charCode = evt.which ? evt.which : evt.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        evt.preventDefault();
      }
    },
    // Add(){
    //   if(typeof this.form.qty=='string'|| this.form.qty=='NaN'){
    //     this.form.qty=1
    //     return
    //   }
    //   this.form.qty=parseInt(this.form.qty,10)+1
    //   console.log(this.form.qty);
    // },
    // Minus(){
    //   if(parseInt(this.form.qty,10)<=1) return
    //   this.form.qty=parseInt(this.form.qty,10)-1
    // },
  },
};
</script>

<style scoped>
.tcenter >>> input {
  text-align: center;
}
</style>
