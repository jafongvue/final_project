<template>
  <v-card class="elevation-1">
    <v-row justify="center">
      <h2 class="mt-7 mb-5">ຮັບການສັ່ງຊື້ສິນຄ້າຈາກລູກຄ້າ</h2>
    </v-row>
    <v-divider></v-divider>
    <v-tabs
      class="pa-1"
      v-model="tabs"
      centered
      grow
      slider-color="#9C27B0"
      slider-size="3"
      color="#9C27B0"
      background-color="transparent"
    >
      <v-tab
        class="pt-5"
        background-color="transparent"
        v-for="n in 3"
        :key="n"
      >
        <h2 v-if="n == 1">ປະຫວັດການຮັບສັ່ງຊື້ສິນຄ້າ</h2>
        <v-badge v-if="n == 2" color="error" :content="newOrders.length">
          <h2>ລາຍການສັ່ງຊື້ສິນຄ້າໃໝ່</h2>
        </v-badge>
        <h2 v-if="n == 3">ຮັບສັ່ງຊື້ສິນຄ້າ</h2>
      </v-tab>
    </v-tabs>
    <v-divider></v-divider>
    <v-tabs-items v-model="tabs">
      <v-tab-item>
        <v-card flat>
          <v-data-table
            :search="search"
            :headers="headers"
            :items="items"
            item-key="order_id"
            class="elevation-3"
          >
            <template #[`item.detail`]="{ item }">
              <v-btn icon color="primary" @click="getHistoryDetail(item)"
                ><v-icon>mdi-eye</v-icon></v-btn
              >
            </template>
            <template #[`item.idx`]="{ index }">
              <div>
                {{ index + 1 }}
              </div>
            </template>
            <template #[`item.date`]="{ item }">
              <div>
                {{ $moment(item.date).format("DD-MM-YYYY") }}
              </div>
            </template>

            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title
                  >ຂໍ້ມູນປະຫວັດການຮັບສັ່ງຊື້ສິນຄ້າ</v-toolbar-title
                >
                <v-divider class="mx-4" inset vertical></v-divider
                ><v-spacer></v-spacer>
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="ຄົ້ນຫາຂໍ້ມູນ"
                  outlined
                  dense
                  single-line
                  hide-details
                ></v-text-field>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-divider></v-divider>
            </template>
          </v-data-table>

          <!-- dialog Detail old -->
          <v-dialog v-model="dialogDetailHeader" max-width="900px">
            <v-card>
              <v-data-table
                :headers="detailHeader"
                :items="getitems"
                hide-default-footer
                class="elevation-0 my-2"
                style="background: #fafafaff"
                item-key="index"
              >
                <template #[`item.idx`]="{ index }">
                  <div>
                    {{ index + 1 }}
                  </div>
                </template>
                <template #[`item.profile`]="{ item }">
                  <v-img :src="item.profile" height="100" width="100" contain>
                  </v-img>
                </template>
                <template #[`item.price`]="{ item }">
                  <div>
                    {{ currency(item.price) }}
                  </div>
                </template>
                <template #[`item.price*qty`]="{ item }">
                  <div>
                    {{ currency(parseInt(item.price) * parseInt(item.qty)) }}
                  </div>
                </template>
              </v-data-table>
              <v-row justify="center">
                <div mr-16>ເງິນລວມ: {{ currency(SumPriceHistory) }}</div>
              </v-row>
            </v-card>
          </v-dialog>
        </v-card>
      </v-tab-item>
      <!-- _______________________________________________________________-2-___________________________________ -->

      <v-tab-item>
        <v-card flat>
          <v-data-table
            :search="newsearch"
            :headers="newHeaders"
            :items="newOrders"
            :single-expand="true"
            :expanded.sync="newexpanded"
            item-key="idx"
            show-expand
            class="elevation-3"
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>ລາຍການສັ່ງຊື້ສິນຄ້າ</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider
                ><v-spacer></v-spacer>
                <v-text-field
                  v-model="newsearch"
                  append-icon="mdi-magnify"
                  label="ຄົ້ນຫາຂໍ້ມູນ"
                  single-line
                  outlined
                  dense
                  hide-details
                ></v-text-field>
                <v-spacer></v-spacer>
              </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon large color="#C51162" @click="editeItem(item)">
                mdi-cart-check
              </v-icon>
            </template>
            <template #[`item.idx`]="{ index }">
              <div>
                {{ index + 1 }}
              </div>
            </template>
            <template #[`item.date`]="{ item }">
              <div>{{ $moment(item.date).format("DD-MM-YYYY") }}</div>
            </template>
          </v-data-table>
        </v-card>
      </v-tab-item>
      <!-- _______________________________________________________-333-_______________________________________ -->
      <v-tab-item>
        <v-card class="elevation-0">
          <v-row no-gutters class="ma-3 ml-1">
            <v-col cols="12" md="4" class="align-center">
              <v-card width="100%" height="52" flat class="ma-1 pa-3">
                <h4>
                  ໃບບີນ: <span>{{ getOrderId.order_id }}</span>
                </h4>
              </v-card>
            </v-col>
            <v-col cols="12" md="4" class="align-center">
              <v-card width="100%" height="52" flat class="ma-1 pa-3">
                <h4>
                  ຜູ້ສັ່ງຊື້:<span> {{ getOrderId.fullName }}</span>
                </h4>
              </v-card>
            </v-col>
            <v-col cols="12" md="4" class="align-center">
              <v-card width="100%" height="52" flat class="ma-1 pa-3">
                <h4>
                  ເບີໂທ:<span> {{ getOrderId.tel }}</span>
                </h4>
              </v-card>
            </v-col>
          </v-row>
          <v-data-table
            :headers="recievedetailHeader"
            :items="editList"
            hide-default-footer
            class="elevation-2 mx-2"
          >
            <template v-slot:item="{ item, index }">
              <tr v-ripple="{ class: `white--text` }">
                <td>{{ index + 1 }}</td>
                <td>
                  <v-img
                    :src="item.profile"
                    width="100"
                    height="100"
                    contain
                  ></v-img>
                </td>
                <td>{{ item.shop_name }}</td>
                <td>{{ item.proName }}</td>
                <td>{{ item.typeName }}</td>
                <td>{{ item.unitName }}</td>
                <td>{{ item.qty }}</td>
                <td>
                  {{ String(item.price).replace(/(.)(?=(\d{3})+$)/g, "$1 ") }}
                </td>
                <td>
                  {{
                    String(item.qty * item.price).replace(
                      /(.)(?=(\d{3})+$)/g,
                      "$1 "
                    )
                  }}
                </td>
                <td>
                  <v-row no-gutters class="justify-center">
                    <v-icon
                      class="mr-2"
                      color="error"
                      @click="deleteByItem(item)"
                    >
                      mdi-delete
                    </v-icon>
                  </v-row>
                </td>
              </tr>
            </template>
            <template v-slot:footer>
              <v-row class="ma-5" align="center" justify="center">
                <v-spacer></v-spacer>
                <v-spacer></v-spacer>
                <h3>
                  ຮູບຢືນຢັນການຈ່າຍ:
                  <span
                    ><v-img
                      :src="getOrderId.image"
                      @click="dialogImage = true"
                      width="100"
                      height="100"
                      contain
                    ></v-img
                  ></span>
                </h3>
                <v-img height="50" width="30"></v-img>
                <v-spacer></v-spacer>
                <!-- getMoney of shop -->
                <v-row justify="center">
                  <v-col>
                    <!-- <template v-for="(item, i) in getAllMoney"> -->
                    <v-row v-for="(item, i) in getAllMoney" :key="i">
                      <div class="d-flex">
                        <p class="black--text">ຊື່ຮ້ານ:</p>
                        <p class="ml-2">
                          <v-chip
                            small
                            class="primary--text"
                            @click="getQRcode(item)"
                            >{{ item.shop_name }}</v-chip
                          >
                        </p>

                        <p class="black--text ml-4">ລວມເງິນ:</p>
                        <p class="ml-2" style="color: blue">
                          {{ currency(item.sumMoney) }} ກີບ
                        </p>
                      </div>
                    </v-row>
                    <!-- </template> -->
                  </v-col>
                </v-row>

                <h3>
                  ລວມເປັນ:
                  <span style="color: blue"> {{ currency(Sum) }} ກີບ</span>
                </h3>
              </v-row>
            </template>
          </v-data-table>
          <!-- dialog send money to owner product -->
          <v-dialog v-model="dialogPay" max-width="700">
            <v-card>
              <v-card-text class="mt-10">
                <v-row>
                  <v-col cols="12" md="6">
                    <h1>QR code</h1>
                    <v-img :src="QRcode.QRcode" contain></v-img>
                  </v-col>
                  <v-col cols="12" md="6">
                    <h1 class="mb-5">ລາຄາລວມ:</h1>
                    <v-text-field
                      outlined
                      dense
                      readonly
                      :value="currency(price)"
                    ></v-text-field>
                    <h1 class="mr-7 ml-9 mt-3 mb-3" id="myfont">
                      ຮູບອ້າງອິງການຈ່າຍເງີນ*
                    </h1>
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
                      class="mt-2"
                      elevation="0"
                      color="primary"
                      small
                      @click="upload"
                    >
                      <v-icon>mdi-tray-arrow-up</v-icon>
                      ຮູບ
                    </v-btn>
                    <v-divider class="ml-7"></v-divider>
                    <v-img
                      max-height="450"
                      aspect-ratio="1.7"
                      contain
                      :src="url"
                    ></v-img>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-hover v-slot="{ hover }" open-delay="200">
                  <v-btn
                    :elevation="hover ? '10' : '0'"
                    :class="hover ? 'primary' : 'primary--text'"
                    :disabled="emty"
                    @click="insertImage"
                    :loading="loading"
                    ><v-icon left >mdi-content-save</v-icon> ຢືນຢັນ</v-btn
                  >
                </v-hover>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- dialog image confirm -->
          <v-dialog v-model="dialogImage" max-width="500">
            <v-card>
              <v-img :src="getOrderId.image"></v-img>
            </v-card>
          </v-dialog>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              style="font-size: 20px; font-weight: bold"
              color="red"
              rounded
              class="mb-5 mr-3"
              @click="cancel"
            >
              <v-icon left large> mdi-close-circle </v-icon>
              ຍົກເລິກ
            </v-btn>
            <v-btn
              style="font-size: 20px; font-weight: bold"
              color="#1DE9B6"
              rounded
              class="mb-5 mr-5"
              @click="updateOrder"
            >
              <v-icon left large> mdi-check-circle </v-icon>
              ຢຶນຢັນຮັບສັ່ງຊື້
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
    <!-- dialog deleteByItem -->
    <v-dialog v-model="dialogDelete" max-width="700px">
      <v-card rounded>
        <v-row justify="center">
          <div class="mt-4" style="font-size: 25px; font-weight: bold">
            ລຶບຂໍ້ມູນ
          </div>
        </v-row>
        <v-divider class="mt-2 mb-2"></v-divider>
        <v-card-title
          style="font-size: 22px; font-weight: bold; font-family: NotoSansLao"
          >ທ່ານຕ້ອງການລຶບສິນຄ້າລາຍການນີ້ບໍ...?</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="error"
            text
            style="font-size: 18px; font-weight: bold"
            @click="dialogDelete = false"
            >ຍົກເລິກ</v-btn
          >
          <v-btn
            color="primary accent-3"
            text
            style="font-size: 18px; font-weight: bold"
            @click="deleteByItemConfirm"
            >ຢຶນຢັນລຶບ</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>
<script>
export default {
  layout: "admin",
  data() {
    return {
      loading: false,
      dialogDetailHeader: false,
      tabs: 1,
      text: "",
      dialog: false,
      dialogPay: false,
      price: "",

      search: "",
      comment: {
        admin_id: "",
        receive_content: "",
        status: null,
      },
      newsearch: "",
      dialogDelete: false,
      dialogImage: false,
      file: "",
      url: "",
      urlQRcode: "",
      imageRules: [(v) => !!v || "Image is required"],
      expanded: [],
      newexpanded: [],
      editList: [],
      delByItem: [],
      newOrders: [],
      getOrderId: {},
      getAllMoney: {},
      QRcode: {},
      headers: [
        { text: "ລໍາດັບ", value: "idx" },
        {
          text: "ໃບສັ່ງຊື້",
          align: "start",
          value: "order_id",
        },
        { text: "ຜູ້ສັ່ງຊື້", value: "fullName" },
        { text: "ເບີ້ໂທ", value: "tel" },
        { text: "ວັນທີ່ສັ່ງຊື້", value: "date" },
        { text: "ສະຖານະ", value: "status" },
        { text: "ລາຍລະອຽດ", value: "detail" },
      ],
      detailHeader: [
        { text: "ລໍາດັບ", value: "idx" },
        {
          text: "ຮູບ",
          sortable: false,
          value: "profile",
        },
        { text: "ຊື່ຮ້ານ", value: "shop_name" },
        { text: "ຊື່ສິນຄ້າ", value: "proName" },
        { text: "ປະເພດ", value: "typeName" },
        { text: "ຫົວໜ່ວຍ", value: "unitName" },
        { text: "ຈໍານວນ", value: "qty" },
        { text: "ລາຄາ(ກິບ)", value: "price" },
        { text: "ລາຄາລວມ(ກິບ)", value: "price*qty" },
      ],
      newHeaders: [
        { text: "ລໍາດັບ", value: "idx" },
        { text: "ຜູ້ສັ່ງຊື້", value: "fullName" },
        { text: "ເບີ້ໂທ", value: "tel" },
        { text: "ວັນທີ່ສັ່ງຊື້", value: "date" },
        { text: "ຮັບສັ່ງຊື້", value: "actions" },
      ],

      recievedetailHeader: [
        { text: "ລໍາດັບ", value: "idx" },
        {
          text: "ຮູບ",
          sortable: false,
          value: "profile",
        },
        { text: "ຊື່ຮ້ານ", value: "shop_name" },
        { text: "ຊື່ສິນຄ້າ", value: "proName" },
        { text: "ປະເພດ", value: "typeName" },
        { text: "ຫົວໜ່ວຍ", value: "unitName" },
        { text: "ຈໍານວນ", value: "qty" },
        { text: "ລາຄາ(ກິບ)", value: "price" },
        { text: "ລາຄາລວມ(ກິບ)", value: "price*qty" },
        { text: "ລົບອອກ", value: "actions", align: "center", sortable: false },
      ],
      items: [
        {
          idx: "1",
          order_id: "000122",
          emp_name: "chue",
          full_name: "vang",
          customer_tel: "0204444444",
        },
      ],
      getitems: [],
    };
  },
  computed: {
    Sum() {
      var sum = 0;
      for (let key in this.editList) {
        let el = this.editList[key];
        sum = sum + parseInt(el.qty) * parseInt(el.price);
      }
      return sum;
    },
    SumPriceHistory() {
      var sum = 0;
      for (let key in this.getitems) {
        let el = this.getitems[key];
        sum = sum + parseInt(el.qty) * parseInt(el.price);
      }
      return sum;
    },
    emty() {
      if (!this.file) {
        return true;
      }
      return false;
    },
  },
  mounted() {
    this.getOrderByCustomer();
    this.getHistory();
  },
  methods: {
    onFileChange(e) {
      if (e) {
        this.url = URL.createObjectURL(e);
      }
    },
    upload() {
      document.getElementById("file").click();
    },
    async getOrderByCustomer() {
      const res = await this.$axios.$get("/order");
      this.newOrders = res.order;
    },
    async editeItem(item) {
      //select order
      const res1 = await this.$axios.$get(`/order/${item.order_id}`);
      //select order detail
      const res = await this.$axios.$get(`/order/detail/${item.order_id}`);
      // select Money by shop
      const allMoneyByShop = await this.$axios.$get(
        `/order/getMoney/${item.order_id}`
      );

      this.getAllMoney = allMoneyByShop.order;
      this.getOrderId = res1.order;
      this.editList = res.order;
      this.tabs = 2;
    },
    // confirm
    async updateOrder() {
      const date = new Date().toJSON().slice(0, 10);
      await this.$axios
        .put(`/order/${this.getOrderId.order_id}`, {
          admin_id: this.$cookies.get("user_id"),
          update_date: date,
          status: "confirm",
        })
        .then((res) => {
          this.$toast.success("ບັນທຶກສຳເລັດ", {
            duration: 1000,
            position: "top-right",
            iconPack: "mdi",
            icon: "check",
            singleton: true,
          });
        })
        .catch((err) => {
          this.$toast.error("ລົ້ມແຫຼວ", {
            duration: 1000,
            position: "top-right",
            iconPack: "mdi",
            icon: "close",
            singleton: true,
          });
        });
      // update receive_content totable comment
      this.comment.admin_id = this.$cookies.get("user_id");
      this.comment.receive_content =
        "ເຮົາໄດ້ຮັບລາຍການສັ່ງຊື້ຂອງທ່ານແລ້ວ ກະລຸນາລໍຖ້າເຮົາຕິດຕໍ່ຫາ....";
      this.comment.status = 1;
      await this.$axios.put(
        `/comment/${this.getOrderId.order_id}`,
        this.comment
      );
      this.getOrderByCustomer();
      this.cancel();
    },
    // get history
    async getHistory() {
      const res = await this.$axios.$get("/order/allOrder");
      this.items = res.order;
    },
    // get history detail
    async getHistoryDetail(item) {
      const res = await this.$axios.$get(`/order/detail/${item.order_id}`);
      this.getitems = res.order;
      this.dialogDetailHeader = true;
    },
    // get QRcode of Shop
    async getQRcode(obj) {
      const res = await this.$axios.$get(`/user/${obj.shop_id}`);
      this.QRcode = res.user;
      this.price = obj.sumMoney;
      this.dialogPay = true;
    },
    // save sent Qr image to shop
    async insertImage() {
      this.loading = true
      const QRcode = this.file;
      const formDataQR = new FormData();
      formDataQR.append("file", QRcode);
      this.urlQRcode = await this.$axios
        .post("/uploads/QRcode", formDataQR)
        .then((response) => {
          return response?.data?.url;
        })
        .catch((error) => {
          this.$toast.success("File upload failed", {
            duration: 1000,
            position: "top-right",
            iconPack: "mdi",
            icon: "alert-circle",
            singleton: true,
          });
        });
      const data = {
        Admin_id: this.$cookies.get("user_id"),
        user_id: this.QRcode.user_id,
        order_id: this.getOrderId.order_id,
        totalSum: this.price,
        image: this.urlQRcode,
      };
      await this.$axios
        .post("/AdminPayment", data)
        .then((res) => {
          this.$toast.success("ບັນທຶກສຳເລັດ", {
            duration: 1000,
            position: "top=right",
            iconPack: "mdi",
            icon: "check",
            singleton: true,
          });
        })
        .catch((err) => {
          console.log(err);
          this.$toast.error("ລົ້ມແຫຼວ", {
            duration: 1000,
            position: "top-right",
            iconPack: "mdi",
            icon: "alert-circle",
            singleton: true,
          });
        });
        this.loading = false
        

    },
    cancel() {
      this.tabs = 1;
      this.getOrderId = {};
      this.editList = [];
    },
    deleteByItem(item) {
      this.dialogDelete = true;
      this.delByItem = item;
      //console.log(this.delByItem.id);
    },
    async deleteByItemConfirm() {
      this.editList.splice(this.delByItem.indexOf, 1);
      //alert(this.editList.length)
      // await this.$axios.delete(`/cus_order/detail/byId/${this.delByItem.id}`)

      // //update
      // this.proQty.pro_id = this.delByItem.pro_id
      // this.proQty.qty = this.delByItem.qty
      // await this.$axios.put(
      //   `/product/UpdateQtyIm/${this.proQty.pro_id}`,
      //   this.proQty
      // )
      this.dialogDelete = false;
      if (this.editList.length <= 0) {
        this.cancel();
      }
    },
  },
};
</script>
