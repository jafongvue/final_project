<template>
  <div class="d-flex align-center justify-center">
    <v-card width="500px" >
      <!-- <v-card-title > Login </v-card-title> -->
      <v-row justify="center" class="mt-5">
        <h2 class="mt-5">ເຂົ້າສູ່ລະບົບ</h2>
      </v-row>
      <v-card-text>
        <v-col>
          <v-text-field
            id="tel"
            dense
            append-icon="mdi-phone"
            outlined
            v-model="form.tel"
            placeholder="ເບີໂທ ex:20xxxxxxxx"
            label="ເບີໂທລະສັບ"
            @keypress="number($event)"
          ></v-text-field>
          <v-text-field
            :type="pass ? 'password' : 'text'"
            id="password"
            dense
            outlined
            hide-details="auto"
            v-model="form.password"
            label="ລະຫັດຜ່ານ"
          >
            <template slot="append">
              <v-btn icon @click="pass = !pass">
                <v-icon v-if="pass == false" color="primary">mdi-eye</v-icon>
                <v-icon v-else color="primary">mdi-eye-off</v-icon>
              </v-btn>
            </template>
          </v-text-field>
          <div class="text-center mt-3">
            <v-btn class="primary" @click="onLogin">ເຂົ້າສູ່ລະບົບ</v-btn
            ><br /><br />
            <span>ຍັງບໍ່ມີບັນຊີ?</span>
            <a href="/customer_register">ສ້າງບັນຊີ</a>
          </div>
        </v-col>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
export default {
  name: "myLogin",
  layout: "login",
  data: () => ({
    pass: false,
    form: {},
  }),
  methods: {
    number(evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        alert("ກະລຸນາປ້ອນຕົວເລກ (0-9)");
        evt.preventDefault();
      } else {
        return true;
      }
    },
    async onLogin() {
      if (!this.form.tel) {
        alert("ກະລຸນາປ້ອນເບີໂທຂອງທ່ານ");
        return;
      }
      if (!this.form.password) {
        alert("ກະລຸນາປ້ອນລະຫັດຜ່ານ");
        return;
      }
      await this.$axios
        .post("/login/signIn", this.form)
        .then((res) => {
          //  console.log(res.data.user);
          if (res.data.message == "No have data") {
            // alert("ກະລຸນາລໍຢືນຢັນຕົວຕົນກ່ອນ")
            this.$toast.error("ເບີໂທ ຫຼື ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ", {
              duration: 1000,
              iconPack: "mdi",
              icon: "alert-circle",
              singleton: true,
            });
            return;
          }

          //this.$router.push('/Admin/management/home')
          if (
            res.data.user.status == "Admin" ||
            res.data.user.status == "admin"
          ) {
            this.$cookies.set("token", res.data.token);
            this.$cookies.set("user_id", res.data.user.user_id);
            this.$cookies.set("status", res.data.user.status);
            this.$cookies.set("user_name", res.data.user.user_name);
            this.$cookies.set("user_profile", res.data.user.user_profile);
            this.$router.push("/Admin/management/home");
          } else if (
            res.data.user.status == "User" ||
            res.data.user.status == "user"
          ) {
            this.$cookies.set("token", res.data.token);
            this.$cookies.set("user_id", res.data.user.user_id);
            this.$cookies.set("status", res.data.user.status);
            this.$cookies.set("user_name", res.data.user.user_name);
            this.$cookies.set("user_profile", res.data.user.user_profile);
            this.$router.push("/Shop/product");
          } else {
            this.$cookies.set("token", res.data.token);
            this.$cookies.set("cus_id", res.data.user.cus_id);
            this.$cookies.set("status", res.data.user.status);
            this.$cookies.set("cus_name", res.data.user.cus_name);
            this.$cookies.set("cus_profile", res.data.user.cus_profile);
            this.$router.push("/view.Customer");
          }
        })
        .catch((err) => {
          console.log(err);
          //this.$toast.success()
        });
    },
  },
};
</script>
