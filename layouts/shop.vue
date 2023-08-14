<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      color="#e0e0e0"
    >
      <v-list>
        <div v-for="(item, i) in items" :key="i">
          <v-list-group v-if="!item.to">
            <template v-slot:prependIcon>
              <v-icon>{{ item.icon }}</v-icon>
            </template>
            <template #activator>
              <v-list-item-title class="mx-n2">
                {{ item.title }}
              </v-list-item-title>
            </template>
            <v-list-item
              v-for="(subItem, subI) in item.children"
              :key="subI"
              exact
              :to="subItem.to"
              link
              class="mx-2"
            >
              <v-list-item-action>
                <v-icon>{{ subItem.icon }}</v-icon>
              </v-list-item-action>

              <v-list-item-title class="mx-n4">
                {{ subItem.title }}
              </v-list-item-title>
            </v-list-item>
          </v-list-group>

          <v-list-item v-else :to="item.to" router exact color="primary">
            <v-list-item-action class="mr-5">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="mx-1">{{
                item.title
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? "right" : "left"}` }}</v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <div>ເຈົ້າຂອງຮ້ານ</div>
      <!-- <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>mdi-minus</v-icon>
      </v-btn> -->
      <v-spacer />

        <!-- menu -->
        <v-menu offset-y>
        <template #activator="{ on, menu, attrs }">
          <v-chip to="/Shop/recieve_buy" class="py-2 mx-5" outlined v-bind="attrs" v-on="on" icon>
            <v-tooltip bottom color="orange accent-3">
              <template #activator="{ on: tooltip }">
                <v-icon  color="black" v-on="{ ...tooltip, ...menu }"
                  >mdi-bell</v-icon
                >
              </template>
              <span class="tooltip">ແຈ້ງເຕືອນ</span>
            </v-tooltip>
            {{ newOrders.length }}
          </v-chip>

        </template>
      </v-menu>

      <!-- avatar -->
      <v-avatar @click="profile">
        <v-img
          v-if="
            $cookies.get('user_profile') == null ||
            $cookies.get('user_profile') == ''
          "
          src="/user.png"
          alt="John"
        />
        <v-img v-else :src="$cookies.get('user_profile')" alt="chia"/>
      </v-avatar>
      <!-- logout -->
      <v-btn icon @click="logout" color="red">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "DefaultLayout",
  middleware: ["auth"],
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant:false,
      items: [
        {
          icon: "mdi-bitbucket",
          title: "ສິນຄ້າ",
          to: "/Shop/product",
        },
        // {
        //   icon: "mdi-shape",
        //   title: "ປະເພດສິນຄ້າ",
        //   to: "/Shop/type",
        // },
        // {
        //   icon: "mdi-unity",
        //   title: "ຫົວໜ່ວຍສິນຄ້າ",
        //   to: "/Shop/unit",
        // },
        {
          icon: "mdi-account",
          title: "ໂປຣໄຟລ",
          to: "/Shop/profileUser",
        },
        {
          icon: "mdi-store",
          title: "ຂໍ້ມູນຮ້ານ",
          to: "/Shop/shop_info",
        },
        {
          icon: "mdi-basket-check",
          title: "ຮັບສັ່ງຊື້ສິນຄ້າ",
          to: "/Shop/recieve_buy",
        },
        {
          icon: "mdi-receipt-text-check",
          title: "ລາຍງານ",
          children: [
            {
              icon: "mdi-receipt-text-check",
              title: "ລາຍງານສິນຄ້າທີ່ຂາຍດີ",
              to: "/Shop/report/product",
            },
            {
              icon: "mdi-receipt-text-check",
              title: "ລາຍງານການສັ່ງຊື້",
              to: "/Shop/report/order",
            },
          ],
        },
      ],
      newOrders:[]
    };
  },
  computed: {
    // image(){
    //   var profile=null;
    //   profile=this.localStorage.getItem('user_profile')
    //   return profile
    // }
  },
  mounted(){
    this.getOrderByCustomer()
  },
  methods: {
    logout() {
      this.$router.push("/login");
    },
    profile() {
      if (this.$cookies.get("user_id") == null || this.$cookies.get("user_id") == "") {
        this.logout();
        return;
      }
      this.$router.push("/Shop/profileUser");
    },
    async getOrderByCustomer() {
      const res = await this.$axios.$get(
        `/order/getOrderShowToShop/${this.$cookies.get("user_id")}`
      );
      this.newOrders = res.order;
    },
  },
};
</script>
