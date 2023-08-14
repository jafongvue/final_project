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
            :items="history"
            :single-expand="true"
            :expanded.sync="expanded"
            item-key="order_id"
            show-expand
            class="elevation-3"
          >
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
                  clearable
                  outlined
                  dense
                  single-line
                  hide-details
                ></v-text-field>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-divider></v-divider>
            </template>
            <template #[`item.date`]="{ item }">
              <div>
                {{ $moment(item.date).format("YYYY-MM-DD") }}
              </div>
            </template>
            <template #[`item.action`]="{ item }">
              <v-btn icon color="primary" text @click="getHistory_detail(item)">
                <v-icon>mdi-eye</v-icon>
              </v-btn>
            </template>
            <template #[`item.idx`]="{ index }">
              <div>
                {{ index + 1 }}
              </div>
            </template>
          </v-data-table>
          <!-- dialog order history details -->
          <v-dialog v-model="dialog_his_detail" max-width="90%">
            <v-card>
              <v-row
                style="
                  justify-content: end;
                  margin-top: 25px;
                  margin-right: 2px;
                "
                ><v-hover v-slot="{ hover }" open-delay="200">
                  <v-btn
                    class="ma-1"
                    text
                    :elevation="hover ? '10' : '0'"
                    :class="hover ? 'error' : 'error--text'"
                    @click="dialog_his_detail = false"
                    small
                    ><v-icon>mdi-close</v-icon></v-btn
                  >
                </v-hover></v-row
              >
              <v-card-title class="mt-10"
                ><v-row class="justify-center"
                  ><h2>ລາຍລະອຽດ</h2></v-row
                ></v-card-title
              >
              <v-card-text class="mt-5">
                <v-data-table :headers="detailHeader" :items="history_detail">
                  <template #[`item.idx`]="{ index }">
                    <div>
                      {{ index + 1 }}
                    </div>
                  </template>
                  <template #[`item.profile`]="{ item }">
                    <v-img
                      :src="item.profile"
                      width="100"
                      height="100"
                      contain
                    ></v-img>
                  </template>
                  <template #[`item.price`]="{ item }">
                    <div>
                      {{ currency(item.price) }}
                    </div>
                  </template>
                  <template #[`item.price*qty`]="{ item }">
                    <div>
                      {{ currency(parseInt(item.qty) * parseInt(item.price)) }}
                    </div>
                  </template>
                </v-data-table>
              </v-card-text>
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
                  clearable
                  single-line
                  outlined
                  dense
                  hide-details
                ></v-text-field>
                <v-spacer></v-spacer>
              </v-toolbar>
            </template>
            <template #[`item.actions`]="{ item }">
              <v-icon large color="#C51162" @click="editeItem(item)">
                mdi-cart-check
              </v-icon>
            </template>
            <template #[`item.idx`]="{ index }">
              <div>
                {{ index + 1 }}
              </div>
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
                      v-if="QRcode != undefined"
                      :src="QRcode.image"
                      @click="dialogImage = true"
                      width="100"
                      height="100"
                      contain
                    ></v-img
                  ></span>
                </h3>
                <v-img height="50" width="30"></v-img>
                <v-spacer></v-spacer>
                <h3>
                  ລວມເປັນ:
                  <span>
                    {{ String(Sum).replace(/(.)(?=(\d{3})+$)/g, "$1 ") }}</span
                  >
                </h3>
              </v-row>
            </template>
          </v-data-table>
          <!-- dialog image confirm -->
          <v-dialog v-model="dialogImage" max-width="500">
            <v-card>
              <v-img v-if="QRcode != undefined" :src="QRcode.image"></v-img>
            </v-card>
          </v-dialog>
          <v-card-actions>
            <v-row v-if="comment">
              <v-col cols="6" class="font-weight-bold d-flex flex-wrap"
                ><span   class="purple--text">ລາຍລະອຽດປາຍທາງ:</span><v-icon color="error">mdi-map-marker</v-icon> 
                <h4 class="ml-2">
                  {{ comment.cus_content }}
                </h4>
                </v-col
              ></v-row
            >
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
  layout: "shop",
  data() {
    return {
      tabs: 1,
      text: "",
      dialog: false,

      search: "",
      // comment: {
      //   admin_id: "",
      //   receive_content: "",
      //   status: null,
      // },
      newsearch: "",
      dialogDelete: false,
      dialogImage: false,
      dialog_his_detail: false,
      expanded: [],
      newexpanded: [],
      editList: [],
      delByItem: [],
      newOrders: [],
      getOrderId: {},
      history: [],
      history_detail: [],
      QRcode: {},
      comment: {},
      headers: [
        { text: "ລໍາດັບ", value: "idx" },
        {
          text: "ໃບສັ່ງຊື້",
          align: "start",
          value: "order_id",
        },
        { text: "ຜູ້ສັ່ງຊື້", value: "fullName" },
        { text: "ເບີໂທ", value: "tel" },
        { text: "ວັນທີ່ສັ່ງຊື້", value: "date" },
        { text: "ສະຖານະ", value: "detail_status" },
        { text: "ລາຍລະອຽດ", value: "action" },
      ],
      detailHeader: [
        { text: "ລໍາດັບ", value: "idx" },
        {
          text: "ຮູບ",
          sortable: false,
          value: "profile",
        },
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
        { text: "ເບີໂທ", value: "tel" },
        { text: "ວັນທີສັ່ງຊື້", value: "date" },
        { text: "ຮັບສັ່ງຊື້", value: "actions" },
      ],

      recievedetailHeader: [
        { text: "ລໍາດັບ", value: "idx" },
        {
          text: "ຮູບ",
          sortable: false,
          value: "profile",
        },
        { text: "ຊື່ສິນຄ້າ", value: "proName" },
        { text: "ປະເພດ", value: "typeName" },
        { text: "ຫົວໜ່ວຍ", value: "unitName" },
        { text: "ຈໍານວນ", value: "qty" },
        { text: "ລາຄາ(ກິບ)", value: "price" },
        { text: "ລາຄາລວມ(ກິບ)", value: "price*qty" },
        { text: "ລົບອອກ", value: "actions", align: "center", sortable: false },
      ],
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
  },
  mounted() {
    this.getOrderByCustomer();
    this.getHistory();
  },
  methods: {
    async getOrderByCustomer() {
      const res = await this.$axios.$get(
        `/order/getOrderShowToShop/${this.$cookies.get("user_id")}`
      );
      this.newOrders = res.order;
    },

    async editeItem(item) {
      //select order
      const res1 = await this.$axios.$get(`/order/${item.order_id}`);
      //select order detail
      const res = await this.$axios.$get(`/order/getAllOrderDetailToShop`, {
        params: {
          shop_id: item.shop_id,
          order_id: item.order_id,
        },
      });
      // get Payment form Admin send to shop
      const QR = await this.$axios.$get(`/AdminPayment/payment`, {
        params: {
          order_id: item.order_id,
          user_id: item.shop_id,
        },
      });
      const comment = await this.$axios.$get(
        `/comment/commentOrder/${item.order_id}`
      );
      this.comment = comment.comment;
      this.QRcode = QR.payment;
      console.log(JSON.stringify(this.comment));
      // alert(this.QRcode)

      this.getOrderId = res1.order;
      this.editList = res.orderDetail;
      this.tabs = 2;
    },
    async updateOrder() {
      for (let i in this.editList) {
        let el = this.editList[i];
        await this.$axios
          .put(`/order/updateOrderDetail_status/${el.id}`)
          .then((res) => {
            this.$toast.success("ສຳເລັດ", {
              duration: 1000,
              position: "top-right",
              iconPack: "mdi",
              icon: "check",
              singleton: true,
            });
          })
          .catch((err) => {
            this.$toast.error("ສຳເລັດ", {
              duration: 1000,
              position: "top-right",
              iconPack: "mdi",
              icon: "alert-circle",
              singleton: true,
            });
            console.log(err);
          });
      }

      this.getOrderByCustomer();
      this.getHistory();
      this.cancel();
    },
    async getHistory() {
      const res = await this.$axios.$get(
        `/order/getHistoryOrderShowToShop/${this.$cookies.get("user_id")}`
      );
      this.history = res.order;
    },
    async getHistory_detail(item) {
      const res = await this.$axios.$get(`/order/getHistoryOrderDetailToShop`, {
        params: {
          shop_id: item.shop_id,
          order_id: item.order_id,
        },
      });
      this.history_detail = res.orderDetail;
      this.dialog_his_detail = true;
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

      this.dialogDelete = false;
      if (this.editList.length <= 0) {
        this.cancel();
      }
    },
  },
};
</script>
