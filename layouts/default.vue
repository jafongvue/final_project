<template>
  <v-app dark>
    <v-navigation-drawer
      v-if="$vuetify.breakpoint.xs"
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      color="#FFFFFF"
    >
    <div class="ma-2">

      <div class="css  my-5" v-ripple @click="Home">
        <v-icon color="#03A9F4">mdi-home</v-icon> ໜ້າຫຼັກ
      </div>
      <div class="css  my-5" v-ripple @click="Product">
        <v-icon color="#FB8C00">mdi-shopping</v-icon> ສິນຄ້າ
      </div>
      <div class="css  my-5" v-ripple @click="ContactUs">
        <v-icon color="#00E676">mdi-card-account-phone</v-icon> ຕິດຕໍ່ພວກເຮົາ
      </div>
      <div class="css  my-5" v-ripple @click="Customer_register">
        <v-icon color="#03A9F4">mdi-account-group</v-icon> ສະມັກສະມາຊິກ
      </div>

      <div class="css  my-5" v-ripple @click="login">
        <v-icon color="#03A9F4">mdi-login</v-icon> ເຂົ້າສູ່ລະບົບ
      </div>
    </div>
    </v-navigation-drawer>
    <v-app-bar app color="white" fixed height="57" elevation="1">
      <v-app-bar-nav-icon
        v-if="$vuetify.breakpoint.xs"
        @click.stop="drawer = !drawer"
      />
      <!-- logo -->
      <v-avatar size="35" class="mr-1 ml-2 home" color="red">
        <v-img src="Jlogo.png"></v-img>
      </v-avatar>
      <!-- header -->

      <h3 v-if="!$vuetify.breakpoint.xs" class="homepage ml-2">
        ລະບົບຈັດການການຂາຍອອນໄລນ໌
      </h3>
      <h4 v-if="$vuetify.breakpoint.xs">ລະບົບຈັດການການຂາຍອອນໄລນ໌</h4>
      <v-spacer></v-spacer>

      <div v-if="!$vuetify.breakpoint.xs" class="css" v-ripple @click="Home">
        ໜ້າຫຼັກ
      </div>
      <div v-if="!$vuetify.breakpoint.xs" class="css" v-ripple @click="Product">
        ສິນຄ້າ
      </div>
      <div
        v-if="!$vuetify.breakpoint.xs"
        class="css"
        v-ripple
        @click="ContactUs"
      >
        ຕິດຕໍ່ພວກເຮົາ
      </div>
      <div
        v-if="!$vuetify.breakpoint.xs"
        class="css mr-5"
        v-ripple
        @click="Customer_register"
      >
        ສະມັກສະມາຊິກ
      </div>

      <!-- login -->
      <v-tooltip v-if="!$vuetify.breakpoint.xs" bottom>
        <template #activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on" class="mr-2" to="/login">
            <v-icon>mdi-login</v-icon>
          </v-btn>
        </template>
        <span class="tooltip">ເຂົ້າສູ່ລະບົບ</span>
      </v-tooltip>
    </v-app-bar>

    <!-- main -->
    <v-main>
      <nuxt></nuxt>
    </v-main>

    <!-- footer -->
    <layout-button-top />
    <layout-footer />
  </v-app>
</template>

<script>
import buttonTop from "../components/layout/button-top.vue";
export default {
  components: { buttonTop },
  name: "DefaultLayout",
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Vuetify.js",
    };
  },
  methods: {
    Home() {
      this.$router.push("/");
    },
    Product() {
      this.$router.push("/product");
    },
    About() {
      this.$router.push("/about");
    },
    ContactUs() {
      this.$router.push("/contactus");
    },
    Customer_register() {
      this.$router.push("/customer_register");
    },
    openCart() {
      this.$router.push("/customer_order");
    },
    login() {
      this.$router.push("/login");
    },
  },
};
</script>
<style>
@font-face {
  font-size: 1.8rem;
  font-family: "NotoSansLao-Regular";
  src: local("NotoSansLao"),
    url("../assets/fonts/NotoSansLao-Regular.ttf") format("truetype");
}

* {
  font-family: "NotoSansLao-Regular" !important;
}

.main {
  background-color: #e0e5eb;
  color: black;
}
</style>
