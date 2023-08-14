<template>
  <div>
    <v-card>
      <v-card-text>
        <v-col cols="12">
          <v-row class="mt-2">
            <v-col col="12" md="3">
              <v-avatar class="profile" tile size="200">
                <v-img
                  v-if="
                    (shop_info.profile == null || shop_info.profile == '') &&
                    !file
                  "
                  src="/shop.jpg"
                  contain
                ></v-img>
                <v-img
                  v-else-if="
                    (shop_info.profile != null || shop_info.profile != '') &&
                    !file
                  "
                  :src="shop_info.profile"
                  contain
                ></v-img>
                <v-img v-else :src="url" contain></v-img>
              </v-avatar>
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
              <v-btn icon small class="mt-16" @click="upload"
                ><v-icon>mdi-pencil-box-multiple-outline</v-icon></v-btn
              >
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                id="shopName"
                @keydown.enter="focusText('village')"
                label="ຊື່ຮ້ານ"
                dense
                v-model="shop_info.shop_name"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                id="village"
                @keydown.enter="focusText('district')"
                label="ບ້ານ"
                dense
                v-model="shop_info.village"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                id="district"
                @keydown.enter="focusText('province')"
                label="ເມືອງ"
                dense
                v-model="shop_info.district"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                id="province"
                @keydown.enter="focusText('tel')"
                label="ແຂວງ"
                dense
                v-model="shop_info.province"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                id="tel"
                @keydown.enter="focusText('email')"
                label="ເບີໂທ"
                dense
                v-model="shop_info.tel"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                id="email"
                label="ອີເມວ"
                dense
                v-model="shop_info.email"
              ></v-text-field>
            </v-col>
            <v-col col="12" md="6">
              <v-textarea label="ລາຍລະອຽດຮ້ານ" v-model="shop_info.note">
              </v-textarea>
            </v-col>
          </v-row>
          <v-row class="justify-center mt-5">
            <v-btn :loading="loading" color="primary" @click="updateShop_info"
              >ບັນທຶກການ</v-btn
            >
          </v-row>
        </v-col>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
export default {
  layout: "shop",
  data: () => ({
    file: null,
    loading: false,
    url: "",
    urlImage: "",
    imageRules: [(v) => !!v || "Image is required"],
    shop_info: {},
  }),
  watch: {},
  mounted() {
    this.getShop_Info();
  },
  methods: {
    upload() {
      document.getElementById("file").click();
    },
    onFileChange(e) {
      if (e) {
        this.url = URL.createObjectURL(e);
      }
    },
    async getShop_Info() {
      const res = await this.$axios.get(
        `/shop/byUser/${this.$cookies.get("user_id")}`
      );
      this.shop_info = res.data.shop;
    },
    async updateShop_info() {
      this.loading = true;
      if (this.file) {
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
        this.shop_info.profile = this.urlImage;
        await this.$axios.put(
          `/shop/${this.shop_info.shop_id}`,
          this.shop_info
        );
      } else {
        await this.$axios.put(
          `/shop/${this.shop_info.shop_id}`,
          this.shop_info
        );
      }
      this.$toast.success("ສຳເລັດ", {
        duration: 1000,
        position: "top-right",
        iconPack: "mdi",
        icon: "check",
        singleton: true,
      });
      this.getShop_Info();
      this.loading = false;
    },
    focusText(id) {
      const text = document.getElementById(id);
      text.focus();
    },
  },
};
</script>
