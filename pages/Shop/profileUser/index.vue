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
              src="/user.png" contain
            ></v-img>
            <v-img
              v-else-if="
                 (userInfo.profile != null ||
                  userInfo.profile != '') &&
                !file
              "
              :src="userInfo.profile" contain
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
          <!-- button edit profile -->
          <v-btn icon small class="mt-16" @click="upload"
            ><v-icon>mdi-pencil-box-multiple-outline</v-icon></v-btn
          >
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field id="fullName" @keydown.enter="focusText('village')" label="ຊື່ ແລະ ນາມສະກຸນ" dense v-model="userInfo.fullName"></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field id="village" @keydown.enter="focusText('district')" label="ບ້ານ" dense v-model="userInfo.village"></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field id="district" @keydown.enter="focusText('province')" label="ເມືອງ" dense v-model="userInfo.district"></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field id="province" @keydown.enter="focusText('tel')" label="ແຂວງ" dense v-model="userInfo.province"></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field id="tel" @keydown.enter="focusText('email')" label="ເບີໂທ" dense v-model="userInfo.tel"></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field id="email" label="ອີເມວ" dense v-model="userInfo.email"></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <h3 class="text-center">ຮູບ QRCode:</h3>
            <v-file-input
            id="QRcode"
            v-model="QRcode"
            :rules="imageRules"
            label="Image"
            class="d-none"
            prepend-icon="mdi-camera"
            @change="onFileChangeQR"
            @click="uploadQR"
          ></v-file-input>
            <v-avatar class="profile mt-2" size="300" tile @click="uploadQR">
            <v-img
              v-if="
                (userInfo.QRcode == null ||
                  userInfo.QRcode == '') &&
                !QRcode
              "
              src="/bclone.png"
              contain
            ></v-img>
            <v-img
              v-else-if="
                (userInfo.QRcode != null ||
                  userInfo.QRcode != '') &&
                !QRcode
              "
              :src="userInfo.QRcode" contain
            ></v-img>
            <v-img v-else-if="QRcode" :src="urlQR" contain></v-img>
          </v-avatar>

          </v-col>
        </v-row>
        <v-row class="justify-center mt-5">
          <v-btn :loading="loading" color="primary" @click="updateUser">ບັນທຶກການແກ້ໄຂ</v-btn>
        </v-row>
      </v-col>
      <v-col cols="12" md="6" lg="6"></v-col>
      <v-col cols="12" md="6" lg="6"></v-col>
    </v-card>
  </div>
</template>
<script>
export default {
  layout: "shop",
  data: () => ({
    file: null,
    QRcode:null,
    loading:false,
    url: "",
    urlQR:'',
    urlImage: "",
    urlQRcode:"",
    imageRules: [(v) => !!v || "Image is required"],
    userInfo:{}
  }),
  watch: {},
  mounted(){
    this.getUserInfo()
  },
  methods: {
    focusText(id){
     const text=document.getElementById(id)
      text.focus()
    },
    upload() {
      document.getElementById("file").click();
    },
    onFileChange(e) {
      if (e) {
        this.url = URL.createObjectURL(e);
      }
    },
    uploadQR() {
      document.getElementById("QRcode").click();
    },
    onFileChangeQR(e) {
      if (e) {
        this.urlQR = URL.createObjectURL(e);
      }
    },
    async getUserInfo(){
      const res=await this.$axios.$get(`/user/${this.$cookies.get('user_id')}`);
   this.userInfo=res.user
    },
    async updateUser(){
      this.loading=true
      //alert(this.userInfo.profile)
      if(this.file && this.QRcode){
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
        // upload QRcode
        const QRcode = this.QRcode;
      const formDataQR = new FormData();
      formDataQR.append("file", QRcode);
      this.urlQRcode = await this.$axios
        .post("/uploads/QRcode", formDataQR)
        .then((response) => {
          return response?.data?.url;
        })
        .catch((error) => {
          this.$toast.success("File upload failed", error);
        });
        // update data user
      const data={
            fullName:this.userInfo.fullName,
            gender:this.userInfo.gender,
            dob:this.userInfo.dob,
            tel:this.userInfo.tel,
            email:this.userInfo.email,
            village:this.userInfo.village,
            district:this.userInfo.district,
            province:this.userInfo.province,
            password:this.userInfo.password,
            status:this.userInfo.status,
            profile:this.urlImage,
            QRcode:this.urlQRcode
        }
      await this.$axios.put(`/user/${this.$cookies.get('user_id')}`,data)
      }
      else if(this.file && !this.QRcode){
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
      const data={
            fullName:this.userInfo.fullName,
            gender:this.userInfo.gender,
            dob:this.userInfo.dob,
            tel:this.userInfo.tel,
            email:this.userInfo.email,
            village:this.userInfo.village,
            district:this.userInfo.district,
            province:this.userInfo.province,
            password:this.userInfo.password,
            status:this.userInfo.status,
            profile:this.urlImage,
            QRcode:this.userInfo.QRcode
        }
      await this.$axios.put(`/user/${this.$cookies.get('user_id')}`,data)
      }
      else if(!this.file && this.QRcode){
        // upload QRcode
        const QRcode = this.QRcode;
      const formDataQR = new FormData();
      formDataQR.append("file", QRcode);
      this.urlQRcode = await this.$axios
        .post("/uploads/QRcode", formDataQR)
        .then((response) => {
          return response?.data?.url;
        })
        .catch((error) => {
          this.$toast.success("File upload failed", error);
        });
        // update data user
      const data={
            fullName:this.userInfo.fullName,
            gender:this.userInfo.gender,
            dob:this.userInfo.dob,
            tel:this.userInfo.tel,
            email:this.userInfo.email,
            village:this.userInfo.village,
            district:this.userInfo.district,
            province:this.userInfo.province,
            password:this.userInfo.password,
            status:this.userInfo.status,
            profile:this.userInfo.profile,
            QRcode:this.urlQRcode
        }
      await this.$axios.put(`/user/${this.$cookies.get('user_id')}`,data)
      }
      else{
        const data={
            fullName:this.userInfo.fullName,
            gender:this.userInfo.gender,
            dob:this.userInfo.dob,
            tel:this.userInfo.tel,
            email:this.userInfo.email,
            village:this.userInfo.village,
            district:this.userInfo.district,
            province:this.userInfo.province,
            password:this.userInfo.password,
            status:this.userInfo.status,
            profile:this.userInfo.profile,
            QRcode:this.userInfo.QRcode
        }
        await this.$axios.put(`/user/${this.$cookies.get('user_id')}`,data)
      }
      await this.$axios.put(`/login/user/${this.$cookies.get('user_id')}`,{
        tel: this.userInfo.tel
      })
      this.$toast.success('ສຳເລັດ',{
        duration:1000,
        position:'top-right',
        iconPack:'mdi',
        icon:'check',
        singleton:true
      })
      this.getUserInfo()
      this.loading=false
    },
  },
};
</script>
