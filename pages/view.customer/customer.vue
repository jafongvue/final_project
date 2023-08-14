<template>
  <div>
    <v-card>
      <v-col cols="12">
        <v-row class="justify-center mt-2">
          <v-avatar class="profile" size="100">
            <v-img
              v-if="
                (userInfo.profile == null ||
                userInfo.profile == '') &&
                !file
              "
              src="/user.png"
            ></v-img>
            <v-img
              v-else-if="
                (userInfo.profile != null || userInfo.profile != '') && !file
              "
              :src="userInfo.profile"
            ></v-img>
            <v-img v-else :src="url"></v-img>
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
          <!-- button edit profile -->
          <v-btn icon small class="mt-16" @click="upload"
            ><v-icon>mdi-pencil-box-multiple-outline</v-icon></v-btn
          >
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              label="ຊື່ ແລະ ນາມສະກຸນ"
              dense
              v-model="userInfo.fullName"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              label="ບ້ານ"
              dense
              v-model="userInfo.village"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              label="ເມືອງ"
              dense
              v-model="userInfo.district"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              label="ແຂວງ"
              dense
              v-model="userInfo.province"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              label="ເບີໂທ"
              dense
              v-model="userInfo.tel"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              label="ອີເມວ"
              dense
              v-model="userInfo.email"
            ></v-text-field>
          </v-col>

        </v-row>
        <v-row class="justify-center mt-5">
          <v-btn color="primary" @click="updateUser">ບັນທຶກການແກ້ໄຂ</v-btn>
        </v-row>
      </v-col>
      <v-col cols="12" md="6" lg="6"></v-col>
      <v-col cols="12" md="6" lg="6"></v-col>
    </v-card>
  </div>
</template>
<script>
export default {
  layout: "customer",
  data: () => ({
    file: null,
    url: "",
    urlImage: "",
    imageRules: [(v) => !!v || "Image is required"],
    userInfo: {},
  }),
  watch: {},
  mounted() {
    this.getUserInfo();
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

    async getUserInfo() {
      const res = await this.$axios.$get(
        `/customer/${this.$cookies.get("cus_id")}`
      );
      this.userInfo = res.customer;
    },
    async updateUser() {
      //alert(this.userInfo.profile)
      if (this.file) {
        // upload profile user
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

        // update data user
        const data = {
          fullName: this.userInfo.fullName,
          gender: this.userInfo.gender,
          dob: this.userInfo.dob,
          tel: this.userInfo.tel,
          email: this.userInfo.email,
          village: this.userInfo.village,
          district: this.userInfo.district,
          province: this.userInfo.province,
          password: this.userInfo.password,
          profile: this.urlImage,
        };
        await this.$axios.put(`/customer/${this.$cookies.get("cus_id")}`, data);
      } else {
        const data = {
          fullName: this.userInfo.fullName,
          gender: this.userInfo.gender,
          dob: this.userInfo.dob,
          tel: this.userInfo.tel,
          email: this.userInfo.email,
          village: this.userInfo.village,
          district: this.userInfo.district,
          province: this.userInfo.province,
          password: this.userInfo.password,
          profile: this.userInfo.profile,
        };
        await this.$axios.put(`/customer/${this.$cookies.get("cus_id")}`, data);
      }
      await this.$axios.put(`/login/customer/${this.$cookies.get("cus_id")}`, {
        tel: this.userInfo.tel,
      });
      this.$toast.success("ແກ້ໄຂສຳເລັດ")
      this.file=null;
      this.getUserInfo();
    },
  },
};
</script>
