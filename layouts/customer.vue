<template>
  <v-app dark>
    <!-- <v-navigation-drawer
      v-if="$vuetify.breakpoint.xs"
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      color="#FFFFFF"
    >
      <div class="ma-2">

        <div class="css my-5" v-ripple @click="Home">
          <v-icon color="#03A9F4">mdi-home</v-icon> ໜ້າຫຼັກ
        </div>
        
        <div class="css my-5" v-ripple @click="Product">
          <v-icon color="#FB8C00">mdi-shopping</v-icon> ແນະນຳສິນຄ້າ
        </div>

        <div class="css my-5" v-ripple @click="ContactUs">
          <v-icon color="#00E676">mdi-card-account-phone</v-icon> ສິນຄ້າຍອດນິຍົມ
        </div>

        <div class="css my-5" v-ripple @click="login">
          <v-icon color="#03A9F4">mdi-login</v-icon> ໂປໄຟຣ໌
        </div>

      </div>
    </v-navigation-drawer> -->
    
    <!-- app_bar -->
    <v-app-bar app color="white" height="57" elevation="1">
      <v-avatar size="35" class="mr-1 ml-2 home" color="red">
        <v-img src="/Jlogo.png"></v-img>
      </v-avatar>
      <h3 class="homepage ml-2">ລະບົບຈັດການການຂາຍອອນໄລນ໌</h3>

      <v-spacer></v-spacer>

      <div class="css" v-ripple @click="Home">ໜ້າຫຼັກ</div>
      <div class="css" v-ripple @click="Product">ສິນຄ້າ</div>
      <div class="css" v-ripple @click="Recommend">ສິນຄ້າແນະນໍາ</div>
      <div class="css" v-ripple @click="TopSaleProduct">ສິນຄ້າທີ່ນິຍົມ</div>
      <!-- <div class="css" v-ripple @click="About">ກ່ຽວກັບຮ້ານ</div> -->

      <!-- bell -->
      <v-menu offset-y rounded>
        <template #activator="{ on: menu, attrs }">
          <v-badge
            class="mr-10"
            :content="notification"
            :value="notification"
            color="error"
            overlap
          >
            <v-tooltip bottom>
              <template #activator="{ on: tooltip }">
                <v-icon
                  large
                  v-bind="attrs"
                  class="ml-10"
                  v-on="{ ...tooltip, ...menu }"
                  @click="See_Notifications"
                >
                  mdi-bell
                </v-icon>
              </template>
              <span class="tooltip">ແຈ້ງເຕືອນ</span>
            </v-tooltip>
          </v-badge>
        </template>
        <v-card width="400" class="scroll_list">
          <h1 class="cus_name mt-5 mb-3 ml-5">ແຈ້ງເຕືອນ</h1>
          <v-divider></v-divider>
          <v-list three-line v-for="(item, i) in Notification_Items" :key="i">
            <template>
              <v-card class="elevation-0" @click="Selected_Notifications(item)">
                <v-subheader v-if="item.header"></v-subheader>
                <v-list-item v-else>
                  <v-list-item-avatar color="green">
                    <v-img :src="item.avatar"></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title
                      v-html="item.title"
                      style="
                        font-family: Noto Sans Lao;
                        font-size: 17px;
                        font-weight: bold;
                      "
                    ></v-list-item-title>
                    <v-list-item-subtitle
                      style="
                        font-family: Noto Sans Lao;
                        font-size: 17px;
                        color: #004d40;
                      "
                      v-html="item.subtitle"
                    ></v-list-item-subtitle>
                    <v-list-item-subtitle
                      style="
                        font-family: Noto Sans Lao;
                        font-size: 15px;
                        color: #c51162;
                      "
                      v-html="item.ago_text"
                      class="mt-4"
                    ></v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </template>
          </v-list>
        </v-card>
      </v-menu>
      <!-- cart -->

      <v-menu offset-y rounded>
        <template #activator="{ on: menu, attrs }">
          <v-badge
            class="mr-10"
            color="blue"
            overlap
            :content="messages"
            :value="messages"
          >
            <v-tooltip bottom>
              <template #activator="{ on: tooltip }">
                <v-icon
                  @click="openCart"
                  large
                  v-bind="attrs"
                  v-on="{ ...tooltip, ...menu }"
                  class="ml-10"
                  >mdi-cart-variant</v-icon
                >
              </template>
              <span class="tooltip">ກະຕ່າສິນຄ້າ</span>
            </v-tooltip>
          </v-badge>
        </template>

        <v-list>
          <v-list-item link>
            <v-list-item-title class="mr-5">
              <v-badge color="error" overlap>
                <v-icon>mdi-cart</v-icon>
              </v-badge>
              ລາຍການສັ່ງຊື້
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <!-- profile -->
      <v-menu offset-y rounded>
        <template v-slot:activator="{ on: menu, attrs }">
          <v-avatar v-bind="attrs" v-on="{ ...menu }" color="red">
            <v-img
              v-if="
                $cookies.get('cus_profile') == null ||
                $cookies.get('cus_profile') == ''
              "
              height="50"
              width="50"
              src="/user.png"
            >
            </v-img>
            <v-img
              v-else
              height="50"
              width="50"
              :src="$cookies.get('cus_profile')"
            >
            </v-img>
          </v-avatar>
        </template>

        <v-list>
          <v-row justify="start">
            <v-avatar class="ml-8 mt-8" @click="dialog = true">
              <v-img
                v-if="
                  $cookies.get('cus_profile') == null ||
                  $cookies.get('cus_profile') == ''
                "
                height="50"
                width="50"
                src="/user.png"
              >
              </v-img>
              <v-img
                v-else
                height="50"
                width="50"
                :src="$cookies.get('cus_profile')"
              >
              </v-img>
            </v-avatar>
          </v-row>

          <div class="profile primary--text mt-5 mb-4 ml-4">
            <a href="/view.customer/customer" class="mt-10 mb-4"
              >ຈັດການຂໍ້ມູນສ່ວນຕົວ</a
            >
          </div>
          <v-divider></v-divider>
          <v-list-item link class="mt-4" to="/view.customer/order_buy_history">
            <v-list-item-title
              class="mr-5"
              style="font-family: Noto Sans Lao"
              to="/view.customer/order_buy_history"
            >
              <v-icon large color="primary"> mdi-history</v-icon>
              ປະຫັວດການສັ່ງຊື້</v-list-item-title
            >
          </v-list-item>
          <v-list-item link>
            <v-list-item-title
              style="font-family: Noto Sans Lao"
              @click="confirmLogOut"
            >
              <v-icon large to="/login" color="error">
                mdi-logout-variant</v-icon
              >
              ອອກລະບົບ</v-list-item-title
            >
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <!-- main -->
    <v-main>
      <nuxt></nuxt>
    </v-main>

    <!-- footer -->
    <layout-button-top />
    <layout-footer />
    <!-- <v-footer color="#eeeeee" elevation="1">
      <v-row justify="space-around">
        <v-col cols="12" sm="6">
          <h1 class="mystyle text-center">ກ່ຽວກັບພວກເຮົາ</h1>
          <v-row justify="center">
            <v-icon large class="ic">mdi-chevron-right</v-icon>
            <h1 class="ms">ແຫຼ່ງໃຫ້ຂໍ້ມູນເພີ່ມເຕີມ</h1>
          </v-row>
        </v-col>
        <v-col cols="12" md="6" align-self="right">
          <h1 class="mystyle text-center">ຕິດຕໍ່ພວກເຮົາ</h1>
          <v-row dense justify="center">
            <v-icon class="ml-10 mt-3" large color="black" id="tel">mdi-phone</v-icon>
            <h2 class="ml-2 mt-3">02078825277</h2>
          </v-row>
          <v-row dense justify="center">
            <v-icon class="ml-3" large color="black" id="icc">mdi-email</v-icon>
            <a href="mailto:jafongvuechongkai2020g@gmail.com" id="contact"
              >jafongvue@gmail.com</a
            >
          </v-row>
          <v-row dense justify="center">
            <v-icon class="ml-10 mt-3" large color="black" id="tel">mdi-facebook</v-icon>
            <a
              href="https://www.facebook.com/2078825277"
              target="brank"
              id="contact"
              >Online Sales</a
            >
          </v-row>
        </v-col>
        <v-col
          color="#FF9800"
          class="text-center"
          cols="12"
          style="font-family: NotoSansLao; color: black; font-size: 25px"
        >
          <strong>Year </strong>{{ new Date().getFullYear() }} —
          <strong>Online Sales</strong>
        </v-col>
      </v-row>
    </v-footer> -->
  </v-app>
</template>

<script>
export default {
  name: "customer",
  middleware: ["auth"],
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Vuetify.js",
      icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
      notification: 0,
      snackbar: false,
      show: false,
      dialog: false,
      Cus_Name: "",
      Profile_Img: "",
      Notification_Items: {
        header: "",
        // idx: null,
        avatar: "",
        order_id: "",
        title: "",
        subtitle: "",
        ago_text: "",
      },
      form: {
        status: null,
      },
    };
  },
  computed: {
    messages() {
      return this.$store.getters["orderBuy_cust/messages"];
    },
  },
  mounted() {
    this.GetNotifications_Data();
    this.Count_Notification_Items();
  },
  methods: {
    Home() {
      this.$router.push("/view.customer");
    },
    Product() {
      this.$router.push("/view.customer/product");
    },
    About() {
      this.$router.push("/view.customer/about");
    },
    Recommend() {
      this.$router.push("/view.customer/recommendProduct");
    },
    TopSaleProduct() {
      this.$router.push("/view.customer/topSaleProduct");
    },
    Customer_register() {
      this.$router.push("/customer_register");
    },
    openCart() {
      if (this.$store.getters["orderBuy_cust/CountOrderQty"] == 0) {
        this.snackbar = true;
        return;
      }
      this.$router.push("/view.customer/customer_order");
    },
    confirmLogOut() {
      this.$cookies.remove("token");
      this.$store.commit("orderBuy_cust/Delete_All_OrderCut_Item");
      this.$router.push("/login");
    },
    async GetNotifications_Data() {
      var items = [];
      var dString = "";
      var cus_id = this.$cookies.get("cus_id");
      var notice_list = await this.$axios.get(`/comment/commentCus/${cus_id}`);
      //alert(JSON.stringify(notice_list.data.comment));
      for (const key in notice_list.data.comment) {
        const element = notice_list.data.comment[key];
        // alert(JSON.stringify(element));
        dString =
          this.$moment(String(element.date)).format("YYYY-MM-DD") +
          " " +
          element.time;
        // alert(JSON.stringify(dString))
        var d1 = new Date(dString);
        var d2 = new Date();
        var t2 = d2.getTime();
        var t1 = d1.getTime();
        var d1Y = d1.getFullYear();
        var d2Y = d2.getFullYear();
        var d1M = d1.getMonth();
        var d2M = d2.getMonth();

        var time_obj = {};
        time_obj.year = d2.getFullYear() - d1.getFullYear();
        var weeks = parseInt((t2 - t1) / (24 * 3600 * 1000 * 7));
        //  time_obj.week = parseInt((t2 - t1) / (24 * 3600 * 1000 * 7));
        if (weeks >= 1 && weeks <= 4) {
          time_obj.week = parseInt((t2 - t1) / (24 * 3600 * 1000 * 7));
        } else if (weeks > 4) {
          time_obj.month = d2M + 12 * d2Y - (d1M + 12 * d1Y);
        } else if (weeks < 1) {
          time_obj.week = parseInt((t2 - t1) / (24 * 3600 * 1000 * 7));
          time_obj.day = parseInt((t2 - t1) / (24 * 3600 * 1000));
          time_obj.hour = parseInt((t2 - t1) / (3600 * 1000));
          time_obj.minute = parseInt((t2 - t1) / (60 * 1000));
          time_obj.second = parseInt((t2 - t1) / 1000);
        }

        for (const obj_key in time_obj) {
          if (time_obj[obj_key] == 0) {
            delete time_obj[obj_key];
          }
        }
        var ago_text = "just now";

        if (typeof Object.keys(time_obj)[0] != "undefined") {
          var time_key = Object.keys(time_obj)[0];
          var time_val = time_obj[Object.keys(time_obj)[0]];
          time_key += time_val > 1 ? "s" : "";
          ago_text = time_val + " " + time_key + " ago";
        }

        this.List = {
          avatar: element.image,
          order_id: element.order_id,
          title: element.admin_id,
          subtitle: element.fullName + " " + element.recieve,
          ago_text: ago_text,
        };
        items.push(this.List);
      }
      this.Notification_Items = items;
      console.log("hghg", this.Notification_Items);
      // ('hghg',this.Notification_Items);
      // alert(JSON.stringify(this.Notification_Items));
    },

    async Count_Notification_Items() {
      var cus_id = this.$cookies.get("cus_id");
      // alert(JSON.stringify(cus_id))
      var count_item = await this.$axios.get(
        `/comment/getcount-item/${cus_id}`
      );

      for (const key in count_item.data) {
        const element = count_item.data[key];
        this.notification = element.item;
      }
    },

    async See_Notifications() {
      //this.GetNotifications_Data()
      if (this.notification <= 0) {
        return;
      }
      var cus_id = this.$cookies.get("cus_id");
      this.form.status = 2;
      await this.$axios.put(`/comment/see_notification/${cus_id}`, {
        status: this.form.status,
      });
      this.notification = 0;
    },
    Selected_Notifications(item) {
      const routeData = this.$router.resolve(
        `/Admin/report/bills.customer_order_buy/${item.order_id}`
      );
      window.open(routeData.href, "_blank");
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
