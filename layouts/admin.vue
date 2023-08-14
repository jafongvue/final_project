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
      <!-- <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>mdi-minus</v-icon>
      </v-btn> -->
      <!-- style="font-weight:bold; font-size: 20px; color: blue;" -->
      <div>Admin</div>
      <v-spacer />

      <!-- menu -->
      <v-menu offset-y>
        <template #activator="{ on, menu, attrs }">
          <v-chip
            to="/Admin/management/recieve_buy"
            class="py-2 mx-5"
            outlined
            v-bind="attrs"
            v-on="on"
            icon
          >
            <v-tooltip bottom color="orange accent-3">
              <template #activator="{ on: tooltip }">
                <v-icon color="black" v-on="{ ...tooltip, ...menu }"
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
      <v-avatar @click="dialog = !dialog">
        <v-img
          v-if="
            form.profile== null ||
            form.profile == ''
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
          :src="form.profile"
        >
        </v-img>
      </v-avatar>
      <!-- edit Admin profile -->
      <v-dialog v-model="dialog" max-width="500">
        <v-card>

          <v-card-title><v-row>
           <v-spacer></v-spacer>
           <v-hover v-slot="{hover}">
            <v-btn small :class="hover?'red':'red--text'" elevation="0" @click="dialog=false"><v-icon>mdi-close</v-icon></v-btn>
           </v-hover>
          </v-row></v-card-title>
          <v-card-subtitle class="mt-3"> <p class="text-center black--text">ໂປຣໄຟ</p></v-card-subtitle>
          <v-card-text>
            <v-row class="justify-center mt-2 mb-5">
            <v-avatar class="profile" size="100">
              <v-img
                v-if="(form.profile == null || form.profile == '') && !file"
                src="/user.png"
                contain
              ></v-img>
              <v-img
                v-else-if="
                  (form.profile != null || form.profile != '') && !file
                "
                :src="form.profile"
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
            <!-- button edit profile -->
            <v-btn icon small class="mt-16" @click="upload"
              ><v-icon>mdi-pencil-box-multiple-outline</v-icon></v-btn
            >
          </v-row>
            <v-text-field
              outlined
              dense
              label="ຊື່"
              v-model="form.fullName"
            ></v-text-field>
            <v-text-field
              outlined
              dense
              label="ເບີໂທ"
              v-model="form.tel"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-hover v-slot="{ hover }">
              <v-btn :loading="loading" :class="hover ? 'primary' : 'primary--text'" elevation="0" @click="UpdateProfile"
                ><v-icon  small left
                  >mdi-content-save</v-icon
                >
                ບັນທຶກ</v-btn
              >
            </v-hover>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
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
  name: "admin",
  middleware: ["auth"],
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      dialog: false,
      loading:false,
      form:{},
      file: null,
      url: "",
      urlImage: "",
      imageRules: [(v) => !!v || "Image is required"],
      newOrders: [],
      items: [
        {
          icon: "mdi-home",
          title: "ໜ້າຫຼັກ",
          to: "/Admin/management/home",
        },
        {
          icon: "mdi-shape",
          title: "ປະເພດສິນຄ້າ",
          to: "/Admin/management/type",
        },
        {
          icon: "mdi-unity",
          title: "ຫົວໜ່ວຍສິນຄ້າ",
          to: "/Admin/management/unit",
        },
        {
          icon: "mdi-basket-check",
          title: "ຮັບການສັ່ງຊື້ສິນຄ້າ",
          to: "/Admin/management/recieve_buy",
        },
        {
          icon: "mdi-account-multiple",
          title: "ຂໍ້ມູນເຈົ້າຂອງຮ້ານ",
          to: "/Admin/management/users",
        },
        {
          icon: "mdi-account-group",
          title: "ກວດສອບຂໍ້ມູນຜູ້ໃຊ້ລະບົບ",
          to: "/Admin/management/usersLogin",
        },
        {
          icon: "mdi-store-edit",
          title: "ຂໍ້ມູນຮ້ານ",
          to: "/Admin/management/shop_info",
        },
        {
          icon: "mdi-receipt-text-check",
          title: "ລາຍງານ",
          children: [
            {
              icon: "mdi-receipt-text-check",
              title: "ລາຍງານສິນຄ້າທີ່ນິຍົມສັ່ງຊື້",
              to: "/Admin/management/report/product",
            },
            {
              icon: "mdi-receipt-text-check",
              title: "ລາຍງານຂໍ້ມູນຮັບການສັ່ງຊື້",
              to: "/Admin/management/report/recive_order",
            },
            {
              icon: "mdi-receipt-text-check",
              title: "ລາຍງານຂໍ້ມູນເຈົ້າຂອງຮ້ານ",
              to: "/Admin/management/report/users",
            },
            {
              icon: "mdi-receipt-text-check",
              title: "ລາຍງານຂໍ້ມູນລູກຄ້າ",
              to: "/Admin/management/report/customers",
            },
            {
              icon: "mdi-receipt-text-check",
              title: "ລາຍງານຂໍ້ມູນຜູ້ໃຊ້ລະບົບ",
              to: "/Admin/management/report/usersLogin",
            },
          ],
        },
      ],
    };
  },
  mounted() {
    this.getOrderByCustomer();
    this.getAdmin()
  },
  methods: {
    logout() {
      this.$router.push("/login");
    },
    async getOrderByCustomer() {
      const res = await this.$axios.$get("/order");
      this.newOrders = res.order;
    },
    upload() {
      document.getElementById("file").click();
    },
    onFileChange(e) {
      if (e) {
        this.url = URL.createObjectURL(e);
      }
    },
    async getAdmin(){
      const res=await this.$axios.$get(`/user/${this.$cookies.get('user_id')}`)
      this.form=res.user
    },
    async UpdateProfile(){
      this.loading=true
      if(this.file){
        const formData = new FormData();
      formData.append("file", this.file);
      this.urlImage = await this.$axios
        .post("/uploads/product", formData)
        .then((response) => {
          return response?.data?.url;
        })
        .catch((error) => {
          this.$toast.error("File upload failed",error);
        });
        this.form.profile=this.urlImage
      }
      await this.$axios.$put(`/user/${this.$cookies.get('user_id')}`,this.form)
      this.$toast.success("ແກ້ໄຂສຳເລັດ");
      this.file=null;
      this.getAdmin()
      this.loading=false
    }
  },
};
</script>
s
