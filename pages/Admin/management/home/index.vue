<template>
   <div style="background: #333">
    <v-card color="#fafafa" elevation="0">
      <v-row class="">
        <v-col cols="4">
          <v-card
          v-ripple="{ class: `green--text` }"
          elevation="2"
          class="card"
          style="background: linear-gradient(to right, #1b5e20, #8200e6)"
        >
          <div class="d-flex">
            <v-icon color="white" size="40">mdi-home-account</v-icon>
            <v-divider vertical class></v-divider>
            <div class="pa-2 white--text">
              <h3 style="color: #e0f7fa">ເຈົ້າຂອງຮ້ານ</h3>
              <span>{{ user.length }} ຄົນ</span>
            </div>
          </div>
        </v-card>
        </v-col>
        <v-col cols="4" >
          <v-card
          v-ripple="{ class: `green--text` }"
          elevation="2"
          class="card"
          style="
            background: linear-gradient(120deg, hsl(123, 82%, 4%), #2d07ed);
          "
        >
          <div class="d-flex">
            <v-icon color="white" size="40">mdi-account-group</v-icon>
            <v-divider vertical class></v-divider>
            <div class="pa-2 white--text">
              <h3 style="color: #fbe9e7">ຜູ້ໃຊ້ລະບົບທັງໝົດ</h3>
              <span> {{ userLogin.length }} ຄົນ</span>
            </div>
          </div>
        </v-card>
        </v-col>
        <v-col cols="4" >
          <v-card
          v-ripple="{ class: `green--text` }"
          elevation="2"
          class="card"
          style="background: linear-gradient(to right, #025610, #8a037b)"
        >
          <div class="d-flex" to="/usersLogin">
            <v-icon color="white" size="40">mdi-receipt-text-check</v-icon>
            <v-divider vertical class></v-divider>
            <div class="pa-2 white--text">
              <h3>ຮັບການສັ່ງຊື້ທັງໜົດ</h3>
              <span> {{ newOrders.length }} ລາຍການ</span>
            </div>
          </div>
        </v-card>
        </v-col>
      
      </v-row>

      <div>
        <v-row>
          <!-- 1111111111111111111111111111111111111111111111111111 -->
          <v-col cols="12" md="10" class="mt-10 ml-10">
            <v-row no-gutters class="justify-center ma-1">
              <v-hover v-slot="{ hover }" open-delay="200">
                <v-card
                  :elevation="hover ? 20 : 2"
                  :class="{ 'on-hover': hover }"
                  width="100%"
                  height="400"
                >
                  <v-card-title>
                      <v-row class="mx-2 ml-16" justify="center">
                        <p style="font-weight: bold">ສິນຄ້າທີ່ໄດ້ຂາຍດີ</p>
                      </v-row>
                      <v-row class="mx-2" justify="end">
                        <v-btn elevation="0" style="font-weight: bold" to="/Admin/management/report/product">View More</v-btn>
                      </v-row>
                    </v-card-title>
                  <Pie width="100%" height="300" />
                </v-card>
              </v-hover>
            </v-row>
          </v-col>
        </v-row>


      </div>
    </v-card>
  </div>
</template>
<script>
export default {
  layout: "admin",
  data() {
    return {
      newOrders: [],
      user: [],
      userLogin: []
    };
  },
  mounted() {
   this.getOrderByCustomer()
   this.getUser()
   this.getUserLogin()
   
  },

  methods: {
    async getOrderByCustomer(){
      const res=await this.$axios.$get('/order')
      this.newOrders=res.order
    },
    async getUser(){
      const res=await this.$axios.$get('/user')
      this.user=res.user
    },
    async getUserLogin() {
      const res = await this.$axios.$get("/login");
      this.userLogin = res.userLogin;
    },
  }
};
</script>
