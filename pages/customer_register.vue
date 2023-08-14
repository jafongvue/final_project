<template>
  <v-app class="color">
    <v-main class="d-flex justify-center align-center">
      <v-stepper v-model="e1" class="elevation-0">
        <v-stepper-header
          style="font-family: Noto Sans Lao"
          class="elevation-0"
        >
          <v-spacer></v-spacer>
          <v-stepper-step :complete="e1 > 1" step="1" @click="e1 = 1">
            ລົງທະບຽນຂອງລູກຄ້າ
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="e1 > 2" step="2" @click="e1 = 2">
            ສະມັກເປັນເຈົ້າຮ້ານ
          </v-stepper-step>
          <v-spacer></v-spacer>
        </v-stepper-header>
        <v-progress-linear color="black" value="100" height="2px">
        </v-progress-linear>
        <v-stepper-items>
          <!-- ____________________Step1__________________ -->
          <v-stepper-content step="1">
            <v-col cols="10" lg="6" md="6" sm="12" class="mx-auto">
              <v-card class="pa-4" elevation="0">
                <div class="d-flex justify-center align-center"></div>
                <div class="d-flex justify-center">
                  <v-card-title
                    style="
                      font-size: 18px;
                      font-weight: bold;
                      color: blueviolet;
                    "
                    >ລົງທະບຽນຂອງລູກຄ້າ</v-card-title
                  >
                </div>
                <v-card-text>
                  <v-row>
                    <v-col cols="12" md="6" sm="12">
                      <v-text-field
                        v-model="customer.fullName"
                        outlined
                        dense
                        type="text"
                        label="ຊື່ແລະນາມສະກຸນ"
                        required
                        color="#9155fd"
                        autofocus
                        @keydown.enter="focusText('tel')"
                        :rules="[(v) => !!v || 'fullName is require']"
                      />
                    </v-col>
                    <v-col cols="12" md="6" sm="12">
                      <v-text-field
                        v-model="customer.tel"
                        outlined
                        dense
                        type="text"
                        label="ເບີໂທ"
                        required
                        color="#9155fd"
                        id="tel"
                        placeholder="020xxxxxxxx"
                        @keypress="number($event)"
                        @keydown.enter="focusText('email')"
                        :rules="[(v) => !!v || 'tel is require']"
                      />
                    </v-col>

                    <v-col cols="12" md="6" sm="12">
                      <v-text-field
                        v-model="customer.email"
                        outlined
                        dense
                        label="ອິວເມລ"
                        required
                        color="#9155fd"
                        id="email"
                        @keydown.enter="focusText('facebook')"
                        :rules="[(v) => !!v || 'facebokk is require']"
                      />
                    </v-col>

                    <v-col cols="12" md="6" sm="12">
                      <v-text-field
                        v-model="customer.village"
                        outlined
                        dense
                        label="ບ້ານ"
                        required
                        color="#9155fd"
                        id="facebook"
                        @keydown.enter="focusText('village')"
                        :rules="[(v) => !!v || 'village is require']"
                      />
                    </v-col>
                    <v-col cols="12" md="6" sm="12">
                      <v-text-field
                        v-model="customer.district"
                        outlined
                        dense
                        label="ເມືອງ"
                        required
                        color="#9155fd"
                        hide-details="auto"
                        id="village"
                        @keydown.enter="focusText('province')"
                        :rules="[(v) => !!v || 'province is require']"
                      />
                    </v-col>

                    <v-col cols="12" md="6" sm="12">
                      <v-text-field
                        v-model="customer.province"
                        outlined
                        dense
                        label="ແຂວງ"
                        required
                        color="#9155fd"
                        id="province"
                        @keydown.enter="focusText('password')"
                        :rules="[(v) => !!v || 'password is require']"
                      />
                    </v-col>
                  </v-row>
                  <v-text-field
                    v-model="customer.password"
                    :type="hidePassword ? 'text' : 'password'"
                    label="ລະຫັດຜ່ານ"
                    outlined
                    dense
                    hide-details="auto"
                    required
                    color="#9155fd"
                    id="password"
                    @keydown.enter="focusText('conPassword')"
                    :rules="[(v) => !!v || 'conPassword is require']"
                  >
                    <template #append>
                      <v-btn
                        icon
                        style="color: #9155fd"
                        @click="hidePassword = !hidePassword"
                      >
                        <v-icon class="pb-2">{{
                          hidePassword ? "mdi-eye" : "mdi-eye-off"
                        }}</v-icon>
                      </v-btn>
                    </template>
                  </v-text-field>
                  <v-text-field
                    class="mt-7"
                    v-model="staffData.confirmPassword"
                    :type="hidePassword ? 'text' : 'password'"
                    label="ຢືນຢັນລະຫັດຜ່ານ"
                    outlined
                    dense
                    hide-details="auto"
                    required
                    color="#9155fd"
                    id="conPassword"
                  >
                    <template #append>
                      <v-btn
                        icon
                        style="color: #9155fd"
                        @click="hidePassword = !hidePassword"
                      >
                        <v-icon class="pb-2">{{
                          hidePassword ? "mdi-eye" : "mdi-eye-off"
                        }}</v-icon>
                      </v-btn>
                    </template>
                  </v-text-field>
                  <div style="color: red">*ລະຫັດຜ່ານໃຊ້ເຂົ້າສູ່ລະບົບ</div>
                </v-card-text>
                <v-card-actions class="justify-center">
                  <v-btn
                    block
                    type="submit"
                    style="font-size: 18px"
                    @click="insertCustomer"
                    color="info"
                  >
                    <v-icon class="ml-4">mdi-pencil-box-multiple</v-icon>
                    <span class="white--text px-8">ສ້າງບັນຊີ</span>
                  </v-btn>
                </v-card-actions>
                <div class="d-flex justify-end">
                  <div class="text">
                    ມີບັນຊີເເລ້ວ ?
                    <v-btn
                      text
                      style="
                        font-size: 16px;
                        font-weight: bold;
                        color: blueviolet;
                        cursor: pointer;
                      "
                      to="/login"
                      >ເຂົ້າສູ່ລະບົບ</v-btn
                    >
                  </div>
                </div>
              </v-card>
            </v-col>
            <!-- _______________2222______________________ -->
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-col cols="10" lg="6" md="6" sm="12" class="mx-auto">
              <v-card class="pa-4" elevation="0">
                <div class="d-flex justify-center align-center"></div>
                <div class="d-flex justify-center">
                  <v-card-title
                    style="
                      font-size: 18px;
                      font-weight: bold;
                      color: blueviolet;
                    "
                    >ສະມັກສະມາຊິກເຈົ້າຂອງຮ້ານ</v-card-title
                  >
                </div>
                <v-card-text>
                  <v-row>
                    <v-col cols="12" md="6" sm="12">
                      <v-text-field
                        v-model="staffData.fullName"
                        outlined
                        dense
                        type="text"
                        label="ຊື່ແລະນາມສະກຸນ"
                        required
                        color="#9155fd"
                        autofocus
                        @keydown.enter="focusText('fullname')"
                        :rules="[(v) => !!v || 'fullName is require']"
                      />
                    </v-col>
                    <v-col cols="12" md="6" sm="12">
                      <v-text-field
                        v-model="staffData.dob"
                        outlined
                        dense
                        type="text"
                        label="ວັນເດີອນປີເກີດ"
                        placeholder="DD/MM/YYYY"
                        required
                        color="#9155fd"
                        id="fullname"
                        @keydown.enter="focusText('gender')"
                        :rules="[(v) => !!v || 'dob is require']"
                      />
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" md="6" sm="12">
                      <v-select
                        v-model="staffData.gender"
                        :items="['ຊາຍ', 'ຍິງ']"
                        outlined
                        dense
                        type="text"
                        label="ເພດ"
                        required
                        color="#9155fd"
                        id="gender"
                        @keydown.enter="focusText('tel')"
                        :rules="[(v) => !!v || 'tel is require']"
                      />
                    </v-col>
                    <v-col cols="12" md="6" sm="12">
                      <v-text-field
                        v-model="staffData.tel"
                        outlined
                        dense
                        label="ເບີໂທລະສັບ"
                        placeholder="020xxxxxxxx"
                        required
                        color="#9155fd"
                        id="tel"
                        @keypress="number($event)"
                        @keydown.enter="focusText('email')"
                        :rules="[(v) => !!v || 'email is require']"
                      />
                    </v-col>

                    <v-col cols="12" md="6" sm="12">
                      <v-text-field
                        v-model="staffData.email"
                        outlined
                        placeholder="abc@gmail.com"
                        dense
                        label="ອິວເມລ"
                        required
                        color="#9155fd"
                        hide-details="auto"
                        id="email"
                        @keydown.enter="focusText('village')"
                        :rules="[(v) => !!v || 'village is require']"
                      />
                    </v-col>

                    <v-col>
                      <v-text-field
                        v-model="staffData.village"
                        outlined
                        dense
                        label="ບ້ານ"
                        required
                        color="#9155fd"
                        id="village"
                        @keydown.enter="focusText('district')"
                        :rules="[(v) => !!v || 'district is require']"
                      />
                    </v-col>
                    <v-col cols="12" md="6" sm="12">
                      <v-text-field
                        v-model="staffData.district"
                        outlined
                        dense
                        label="ເມືອງ"
                        required
                        color="#9155fd"
                        hide-details="auto"
                        id="district"
                        @keydown.enter="focusText('province')"
                        :rules="[(v) => !!v || 'province is require']"
                      />
                    </v-col>

                    <v-col>
                      <v-text-field
                        v-model="staffData.province"
                        outlined
                        dense
                        label="ແຂວງ"
                        required
                        color="#9155fd"
                        id="province"
                        @keydown.enter="focusText('password')"
                        :rules="[(v) => !!v || 'password is require']"
                      />
                    </v-col>
                  </v-row>
                  <v-text-field
                    v-model="staffData.password"
                    :type="hidePassword ? 'text' : 'password'"
                    label="ລະຫັດຜ່ານ"
                    outlined
                    dense
                    hide-details="auto"
                    required
                    color="#9155fd"
                    id="password"
                    @keydown.enter="focusText('conPassword')"
                    :rules="[(v) => !!v || 'conPassword is require']"
                  >
                    <template #append>
                      <v-btn
                        icon
                        style="color: #9155fd"
                        @click="hidePassword = !hidePassword"
                      >
                        <v-icon class="pb-2">{{
                          hidePassword ? "mdi-eye" : "mdi-eye-off"
                        }}</v-icon>
                      </v-btn>
                    </template>
                  </v-text-field>
                  <v-text-field
                    class="mt-7"
                    v-model="staffData.confirmPassword"
                    :type="hidePassword ? 'text' : 'password'"
                    label="ຢືນຢັນລະຫັດຜ່ານ"
                    outlined
                    dense
                    hide-details="auto"
                    required
                    color="#9155fd"
                    id="conPassword"
                  >
                    <template #append>
                      <v-btn
                        icon
                        style="color: #9155fd"
                        @click="hidePassword = !hidePassword"
                      >
                        <v-icon class="pb-2">{{
                          hidePassword ? "mdi-eye" : "mdi-eye-off"
                        }}</v-icon>
                      </v-btn>
                    </template>
                  </v-text-field>
                  <div style="color: red">*ລະຫັດຜ່ານໃຊ້ເຂົ້າສູ່ລະບົບ</div>
                </v-card-text>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      label="ລະຫັດບັດປະຈຳຕົວ"
                      dense
                      outlined
                      id="card_id"
                      v-model="staffData.personal_id"
                      @keypress="number($event)"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <label>ຮູບບັດປະຈຳຕົວ:</label>
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
                    <v-btn
                      class=""
                      elevation="0"
                      color="primary"
                      small
                      @click="upload"
                    >
                      <v-icon>mdi-tray-arrow-up</v-icon>
                      Profile
                    </v-btn>
                  </v-col>
                </v-row>
                <!-- image card_image -->
                <v-divider class="ml-7"></v-divider>
                <div v-if="url.length">
                  <v-img
                    max-height="450"
                    aspect-ratio="1.7"
                    contain
                    :src="url"
                  ></v-img>
                </div>
                <v-card-actions class="justify-center">
                  <v-btn
                    block
                    type="submit"
                    style="font-size: 18px"
                    @click="insertOwner"
                    color="info"
                    :disabled="emty"
                  >
                    <v-icon class="ml-4">mdi-pencil-box-multiple</v-icon>
                    <span class="white--text px-8">ສ້າງບັນຊີ</span>
                  </v-btn>
                </v-card-actions>
                <div class="d-flex justify-end">
                  <div class="text">
                    ມີບັນຊີເເລ້ວ ?
                    <v-btn
                      text
                      style="
                        font-size: 16px;
                        font-weight: bold;
                        color: blueviolet;
                        cursor: pointer;
                      "
                      to="/login"
                      >ເຂົ້າສູ່ລະບົບ</v-btn
                    >
                  </div>
                </div>
              </v-card>
            </v-col>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-main>
  </v-app>
</template>
<script>
export default {
  name: "SignUpPages",
  layout: "session",
  data() {
    return {
      hidePassword: false,
      staffData: {},
      shopData: {
        shop_id: null,
        user_id: null,
      },
      e1: 1,
      customer: {},
      url: [],
      file: null,
      urlImage: "",
      imageRules: [(v) => !!v || "Image is required"],
    };
  },
  computed: {
    emty() {
      if (!this.file) {
        return true;
      }
      return false;
    },
  },
  methods: {
    clear2() {
      this.staffData.fullName = "";
      this.staffData.dob = "";
      this.staffData.gender = "";
      this.staffData.tel = "";
      this.staffData.email = "";
      this.staffData.village = "";
      this.staffData.district = "";
      this.staffData.province = "";
      this.staffData.password = "";
      this.staffData.confirmPassword = "";
      this.staffData.personal_id = "";
      this.file = "";
      this.file = "";
      this.selectedFiles = "";
      this.url = "";
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
    number(evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        alert("Enter Only Number ? (0-9)");
        evt.preventDefault();
      } else {
        return true;
      }
    },
    clear() {
      this.customer.fullName = "";
      this.customer.tel = "";
      this.customer.email = "";
      this.customer.village = "";
      this.customer.district = "";
      this.customer.province = "";
      this.customer.status = "";
      this.customer.password = "";
      this.customer.confirmPassword = "";
    },
    upload() {
      document.getElementById("file").click();
    },
    //insert customer
    async insertCustomer() {
      if (!this.customer.fullName) {
        alert("input name");
        return;
      } else {
        var date = new Date().toJSON().slice(0, 10).replace(/-/g, "");
        var time = new Date()
          .toTimeString()
          .replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1", "")
          .replace(":", "")
          .replace(":", "");
        var cuss_id = "cus" + date.slice(2, date.length) + time;
        const data = {
          cus_id: cuss_id,
          fullName: this.customer.fullName,
          tel: this.customer.tel,
          email: this.customer.email,
          village: this.customer.village,
          district: this.customer.district,
          province: this.customer.province,
          password: this.customer.password,
          // profile:this.customer.profile,
          // fullName:this.customer.fullName,
        };
        this.$store.dispatch("customer/create", data);
        //tl table login
        const form = {
          user_id: "user123",
          cus_id: cuss_id,
          tel: this.customer.tel,
          status: "customer",
          password: this.customer.password,
        };
        await this.$axios.post("/login", form);
        this.clear();
        this.$toast.success("ສຳເລັດ")
      }
    },
    //insert owner
    async insertOwner() {
      if (!this.staffData.fullName) {
        alert("input name");
        return;
      } else {
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
        this.staffData.personal_image = this.urlImage;
        var date = new Date().toJSON().slice(0, 10).replace(/-/g, "");
        var time = new Date()
          .toTimeString()
          .replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1", "")
          .replace(":", "")
          .replace(":", "");
        this.staffData.user_id = "User" + date.slice(2, date.length) + time;
        await this.$axios.post("/user", this.staffData);
        // shop
        this.shopData.shop_id = "User" + date.slice(2, date.length) + time;
        this.shopData.user_id = this.staffData.user_id;
        await this.$axios.post("/shop", this.shopData);
        //tl table login
        const form = {
          user_id: this.staffData.user_id,
          cus_id: "cus123",
          tel: this.staffData.tel,
          status: "user",
          password: this.staffData.password,
        };
        await this.$axios.post("/login", form);
        this.clear2();
        this.$toast.success("ສຳເລັດ")
      }
    },
  },
};
</script>
<style>
* {
  font-family: "Noto Sans Lao";
}
</style>
