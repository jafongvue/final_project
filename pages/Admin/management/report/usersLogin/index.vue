<template>
  <div>
    <v-row no-gutters class="justify-center">
      <h1>ລາຍງານຂໍ້ມູນຜ້ໃຊ້ລະບົບ</h1>
    </v-row>

    <v-row no-gutters class="ml-7">
      <v-col cols="mx-2" md="3">
        <v-card class="mx-2" height="237" elevation="2">
          <v-row no-gutters class="justify-center">
            <div>
              <v-icon size="120" color="#4FC3F7">mdi-account</v-icon>
              <div class="pa-2">
                <h3>ຜູ້ໃຊ້ລະບົບທັງໜົດ</h3>
                <span> {{ userLogin.length }} ຄົນ</span>
              </div>
            </div>
          </v-row>
          <v-row no-gutters class="mr-2 mt-2">
            <v-spacer></v-spacer>
            <v-btn class color="primary" @click="printReport" >
              <v-icon dark left >mdi-printer</v-icon>print
            </v-btn>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <v-row no-gutters class="justify-center">
      <v-card class="ma-2 ml-9" width="100%">
        <v-row no-gutters class="justify-center">
          <h3>ຂໍ້ມູນຜູ້ໃຊ້ລະບົບທັງໝົດ</h3>

        </v-row>
        <v-data-table
          :headers="headers"
          :items="userLogin"
          hide-default-footer
        >
        <template #[`item.idx`]="{index}">
          <div>{{ index + 1 }}</div>
        </template>

        <template #[`item.user_img`]="{ item }">
          <div>
            <v-img
              v-if="!item.user_profile && !item.cus_profile"
              src="/user.png"
              width="100"
              height="100"
            ></v-img>
            <v-img
              v-else-if="item.user_profile && !item.cus_profile"
              :src="item.user_profile"
              width="100"
              height="100"
            ></v-img>
            <v-img
              v-else
              :src="item.cus_profile"
              width="100"
              height="100"
            ></v-img>
          </div>
        </template>
          <template #[`item.fullName`]="{ item }">
          <div v-if="item.cus_name == null">
            {{ item.user_name }}
          </div>
          <div v-else>
            {{ item.cus_name }}
          </div>
        </template>
        </v-data-table>
      </v-card>
    </v-row>
  </div>
</template>

<script>
export default {
  layout: "admin",
  data() {
    return {
      headers: [
        {
          text: "ລຳດັບ",
          value: "idx",
        },
        {
          text: "ຮູບ",
          value: "user_img",
        },
        {
          text: "ຊື່ຜູ້ໃຊ້",
          value: "fullName",
        },
        {
          text: "ລະຫັດຜ່ານ",
          value: "password",
        },
        // {
        //   text: "ອີເມລ",
        //   value: "email",
        // },
        {
          text: "ໃນຖານະ",
          value: "status",
        },
        {
          text: "ສະຖານະ",
          value: "active"
        },
      ],
      userLogin: [],
    }
  },
  mounted(){
   this.getUserLogin()
  },
  methods: {
    async getUserLogin() {
      const res = await this.$axios.$get("/login");
      this.userLogin = res.userLogin;
    },
    printReport() {
      const routeData = this.$router.resolve(
        `/Admin/management/report/usersLogin/bills`
      )
      window.open(routeData.href, '_blank')
    },
  }

}
</script>

<style>

</style>
