<template>
  <div>
    <v-card cols="12" sm="4" class="elevation-0 mb-7">
      <v-row justify="center" class="mt-3 mb-3">
        <h1 id="myfont">ສັ່ງຊື້ສິນຄ້າ</h1>
      </v-row>
      <v-stepper v-model="e1" class="elevation-0">
        <v-stepper-header
          style="font-family: Noto Sans Lao"
          class="elevation-0"
        >
          <v-spacer></v-spacer>
          <v-stepper-step :complete="e1 > 1" step="1" @click="e1 = 1">
            ຂັ້ນຕອນທີ່ 1
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="e1 > 2" step="2" @click="e1 = 2">
            ຂັ້ນຕອນທີ່ 2
          </v-stepper-step>
          <v-spacer></v-spacer>
        </v-stepper-header>
        <v-progress-linear color="black" value="100" height="2px">
        </v-progress-linear>
        <v-stepper-items>
          <!-- ____________________Step1__________________ -->
          <v-stepper-content step="1">
            <v-simple-table fixed-header>
              <template>
                <thead>
                  <tr id="tbheader">
                    <th class="text-left" width="10%">ລໍາດັບ</th>
                    <th class="text-left" width="12%">ຮູບ</th>
                    <th class="text-left">ຊື່ສິນຄ້າ</th>
                    <th class="text-left">ປະເພດ</th>
                    <th class="text-left">ຫົວໜ່ວຍ</th>
                    <th class="text-center" width="17%">ຈໍານວນ</th>
                    <th class="text-left" width="10%">ລາຄາ</th>
                    <th class="text-left" width="10%">ລວມ</th>
                    <th class="text-left" width="10%">ລຶບ</th>
                  </tr>
                </thead>
                <tbody style="font-family: Noto Sans Lao; font-size: 20px">
                  <tr v-for="(item, index) in ProductCart" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>
                      <v-img
                        :src="item.profile"
                        height="100"
                        width="100"
                      ></v-img>
                    </td>
                    <td>{{ item.proName }}</td>
                    <td>{{ item.typeName }}</td>
                    <td>{{ item.unitName }}</td>
                    <td>
                      <v-text-field
                        width="10px"
                        class="mt-7 text-center tcenter"
                        filled
                        flat
                        dense
                        rounded
                        prepend-inner-icon="mdi-minus"
                        append-icon="mdi-plus"
                        v-model="item.qty"
                        @keypress="isNumber($event, item)"
                        @keyup="CheckNumber(item)"
                      >
                        <template slot="append">
                          <v-btn
                            style="margin-top: -7px; margin-right: -20px"
                            color="green darken-4"
                            icon
                            @click="IncrementQty(item)"
                          >
                            <v-icon large>mdi-plus</v-icon>
                          </v-btn>
                        </template>
                        <template slot="prepend-inner">
                          <v-btn
                            style="margin-top: -7px; margin-left: -20px"
                            color="green darken-4"
                            icon
                            @click="SuttrackQtyInCart(item)"
                          >
                            <v-icon large>mdi-minus</v-icon>
                          </v-btn>
                        </template>
                      </v-text-field>
                    </td>
                    <td>{{ currency(item.price) }} ກີບ</td>
                    <td>{{ currency(parseInt(item.qty * item.price)) }} ກີບ</td>
                    <td>
                      <v-btn
                        icon
                        color="grey darken-4"
                        @click.prevent="deleteItem(item)"
                      >
                        <v-icon large color="error">mdi-delete</v-icon>
                      </v-btn>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
            <v-progress-linear
              color="black"
              value="100"
              height="1px"
            ></v-progress-linear>
            <v-dialog v-model="dialogDel" max-width="500">
              <v-card rounded>
                <v-row justify="center">
                  <div class="mt-4" style="font-size: 25px; font-weight: bold">
                    ລຶບຂໍ້ມູນ
                  </div>
                </v-row>
                <v-divider class="mt-2 mb-2"></v-divider>
                <v-card-title
                  style="
                    font-size: 22px;
                    font-weight: bold;
                    font-family: NotoSansLao;
                  "
                  >ທ່ານຕ້ອງການລຶບສິນຄ້າລາຍການນີ້ບໍ...?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="error"
                    text
                    style="font-size: 18px; font-weight: bold"
                    @click="dialogDel = false"
                    >ຍົກເລິກ</v-btn
                  >
                  <v-btn
                    color="primary accent-3"
                    text
                    style="font-size: 18px; font-weight: bold"
                    @click="deleteConfirm"
                    >ຢຶນຢັນລຶບ</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-col class="mr-7 mt-8">
              <v-row justify="end">
                <h1 id="cssstyle" class="text-right mt-4">ລວມ:</h1>
                <h1 class="text-left mt-4">
                  {{ String(Sum).replace(/(.)(?=(\d{3})+$)/g, "$1 ") }}
                </h1>
                <h1 id="cssstyle" class="text-center mt-4 ml-5">ກີບ</h1>
              </v-row>
            </v-col>

            <v-row>
              <v-row justify="start">
                <v-btn
                  text
                  id="btntext"
                  class="mt-16 ml-15"
                  color="grey darken-4"
                  to="/view.customer/product"
                >
                  <v-icon class="mr-2"> mdi-plus </v-icon>
                  ເລຶອກສິນຄ້າເພີ່ມ
                </v-btn>
              </v-row>
              <v-row justify="end">
                <v-btn
                  id="btntext"
                  @click="cancelAll"
                  class="mt-16 mb-16 mr-10"
                  color="error"
                >
                  ຍົກເລິກທັງໝົດ
                </v-btn>
                <v-btn
                  id="btntext"
                  @click="e1 = 2"
                  class="mt-16 mb-16 mr-10"
                  color="primary"
                >
                  ດໍາເນີນການສັ່ງຊື້
                </v-btn>
              </v-row>
            </v-row>
          </v-stepper-content>
          <!-- ________________Step2___________________ -->
          <v-stepper-content step="2">
            <v-row justify="center">
              <h1 class="ml-9 mt-7 mb-7" id="myfont">*ຊໍາລະເງີນຄ່າສິນຄ້າ</h1>
            </v-row>
            <v-divider></v-divider>
            <v-row>
              <v-col cols="12" sm="6" md="5">
                <h1
                  class="ml-5 mt-8 mb-3"
                  style="
                    font-size: 25px;
                    font-weight: bold;
                    font-family: NotoSansLao;
                  "
                >
                  *ຊໍາລະຜ່ານບັນຊີທະນາຄານການຄ້າຕ່າງປະເທດ
                </h1>
                <v-img
                  class="ml-9"
                  height="120"
                  width="120"
                  src="/bclone.png"
                ></v-img>
                <v-row>
                  <h1 class="ml-7 mt-7" id="myfont">
                    ເລກບັນຊີ: 160-00-12-90152962-005
                  </h1>
                  <h1
                    class="ml-7 mt-7"
                    style="
                      font-size: 25px;
                      font-weight: bold;
                      font-family: NotoSansLao;
                    "
                  >
                    <!-- {{ shop_info.bank_account_no }} -->
                  </h1>
                </v-row>
                <v-row>
                  <h1 class="ml-7 mt-7" id="myfont">ຊື່ບັນຊີ: PONGVUE MR</h1>
                  <h1
                    class="ml-7 mt-7"
                    style="
                      font-size: 25px;
                      font-weight: bold;
                      font-family: NotoSansLao;
                    "
                  >
                    <!-- {{ shop_info.bank_account_name }} -->
                  </h1>
                </v-row>
                <v-row>
                  <h1 class="ml-7 mt-7" id="myfont">ປະເພດບັນຊີ:</h1>
                  <h1
                    class="ml-7 mt-7 mb-7"
                    style="
                      font-size: 25px;
                      font-weight: bold;
                      font-family: NotoSansLao;
                    "
                  >
                    Saving
                  </h1>
                </v-row>
                <h1 class="ml-7" id="myfont">*QR Code</h1>
                <v-img
                  class="ml-9 mb-8"
                  height="300"
                  width="300"
                  :src="require('@/assets/images/houa.png')"
                ></v-img>
              </v-col>
              <v-col cols="12" sm="6" md="5">
                <h1 class="mt-9 mr-7 ml-9" id="myfont">
                  *ຈໍານວນເງີນທີ່ຕ້ອງຊໍາລະ
                </h1>
                <v-row>
                  <v-text-field
                    id="textfield"
                    class="mt-5 ml-12 mr-5"
                    outlined
                    readonly
                    :value="String(Sum).replace(/(.)(?=(\d{3})+$)/g, '$1 ')"
                    style="font-size: 25px; font-weight: bold"
                    dense
                  ></v-text-field>
                  <h1 class="mt-5 mr-5" id="myfont">ກີບ</h1>
                </v-row>
                <v-divider class="ml-7 mt-10 mb-4"></v-divider>
                <h1 class="mr-7 ml-9" id="myfont">ຮູບອ້າງອິງການຈ່າຍເງີນ*</h1>
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
                <!--------------------------- button profile -->
                <v-btn
                  class="mt-2"
                  elevation="0"
                  color="primary"
                  small
                  @click="upload"
                >
                  <v-icon>mdi-tray-arrow-up</v-icon>
                  Profile
                </v-btn>
                <v-divider class="ml-7"></v-divider>
                <v-img
                  :max-height="file ? '450' : '0'"
                  aspect-ratio="1.7"
                  contain
                  :src="url"
                ></v-img>
                <h1 class="mt-9 mr-7 ml-9" id="myfont">ລາຍລະອຽດເພີ່ມເຕີມ*</h1>
                <v-textarea
                  id="textfield"
                  class="mt-5 ml-7"
                  outlined
                  v-model="comment.cus_content"
                  placeholder="Wrtie Some Detail"
                  name="input-7-4"
                ></v-textarea>
              </v-col>
            </v-row>
            <v-row justify="end">
              <v-btn
                id="btntext"
                class="mt-16 mb-16 mr-10"
                color="error"
                @click="e1 = 1"
              >
                ກັບຄືນ
              </v-btn>
              <v-btn
                id="btntext"
                color="green"
                :disabled="emty"
                :loading="loading"
                class="mt-16 mb-16 mr-10"
                @click="submit"
              >
                ຢຶນຢັນ
              </v-btn>
            </v-row>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>

      <v-snackbar color="#004D40" centered v-model="snackbar" :timeout="10000">
        <v-row no-gutters class="mx-2 my-2">
          <v-icon color="#ffffff" size="60">mdi-check-bold</v-icon>
          <p
            style="
              font-size: 2rem;
              font-family: Noto Sans Lao;
              margin-top: 20px;
            "
          >
            ສັ່ງຊື້ສິນຄ້າສໍາເລັດ
          </p>
        </v-row>
        <v-row no-gutters class="mx-2 justify-end">
          <v-btn
            text
            style="font-family: Noto Sans Lao; font-size: 20px"
            @click="snackbar = false"
          >
            <v-icon color="error" left large>mdi-close</v-icon>ປິດ</v-btn
          >
        </v-row>
      </v-snackbar>
    </v-card>
  </div>
</template>
<script>
export default {
  name: "customer_order_buy_cart",
  layout: "login",
  data() {
    return {
      e1: 1,
      url: null,
      QRcode: {},
      loading: false,
      snackbar: false,
      file: null,
      urlImage: "",
      imageRules: [(v) => !!v || "Image is required"],
      dialogDel: false,
      delItem: [],
      proQty: {
        pro_id: "",
        qty: null,
      },
      comment: {
        order_id: null,
        admin_id: "Emp230629231808",
        cus_id: "",
        cus_content: "",
        recieve: "hhh",
      },
    };
  },
  computed: {
    ProductCart() {
      return this.$store.state.orderBuy_cust.ProductCart;
    },
    Sum() {
      var sum = 0;
      for (const key in this.ProductCart) {
        if (Object.hasOwnProperty.call(this.ProductCart, key)) {
          const el = this.ProductCart[key];
          sum += parseInt(el.qty, 10) * parseFloat(el.price, 10);
        }
      }
      return sum;
    },

    SumPay() {
      var sum = 0;
      for (const key in this.ProductCart) {
        if (Object.hasOwnProperty.call(this.ProductCart, key)) {
          const el = this.ProductCart[key];
          sum += parseInt(el.qty, 10) * parseFloat(el.price, 10);
        }
      }
      return sum - (sum * parseFloat(this.percent)) / 100;
    },
    emty(){
      if(!this.file){
        return true
      }
      return false
    }
  },
  mounted() {
    console.log("result", this.ProductCart);
    // this.getQRcode()
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
    SuttrackQtyInCart(product) {
      if (parseInt(product.qty, 10) > 1) {
        const newAddQty = parseInt(product.qty, 10) - 1;
        this.$store.commit("orderBuy_cust/updateAddQty", {
          productId: product.pro_id,
          addQty: newAddQty,
        });
      }
    },
    IncrementQty(product) {
      if (!product.qty || typeof product.qty === "string") {
        this.$store.commit("orderBuy_cust/updateAddQty", {
          productId: product.pro_id,
          addQty: 1,
        });
      } else if (
        parseInt(product.qty, 10) >= parseInt(product.qty_in_data, 10)
      ) {
        this.$store.commit("orderBuy_cust/updateAddQty", {
          productId: product.pro_id,
          addQty: product.qty_in_data,
        });
      } else {
        const newAddQty = parseInt(product.qty, 10) + 1;
        this.$store.commit("orderBuy_cust/updateAddQty", {
          productId: product.pro_id,
          addQty: newAddQty,
        });
      }
    },

    isNumber: function ($event, product) {
      evt = evt ? evt : window.event;
      const charCode = evt.which ? evt.which : evt.keyCode;

      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        evt.preventDefault();
      } else {
        if (parseInt(product.qty, 10) >= parseInt(product.qty_in_data, 10)) {
          product.qty = parseInt(product.qty_in_data, 10);
        }
        if (product.qty == "" && typeof product.qty === "string") {
          product.qty = 0;
        }
        return true;
      }
    },
    CheckNumber(product) {
      if (!product.qty || parseInt(product.qty, 10) < 1) {
        this.$store.commit("orderBuy_cust/updateAddQty", {
          productId: product.pro_id,
          qty: 1,
        });
      } else if (
        parseInt(product.qty, 10) >= parseInt(product.qty_in_data, 10)
      ) {
        this.$store.commit("orderBuy_cust/updateAddQty", {
          productId: product.pro_id,
          addQty: product.qty_in_data,
        });
      }
    },

    // save order from customer
    async submit() {
      this.loading = true;
      if (this.$store.getters["orderBuy_cust/CountOrderQty"] <= 0) {
        alert(JSON.stringify("No Product In Cart"));
        return;
      }
      const file = this.file;
      const formData = new FormData();
      formData.append("file", file);
      this.urlImage = await this.$axios
        .post("/uploads/QRcode", formData)
        .then((response) => {
          return response?.data?.url;
        })
        .catch((error) => {
          this.$toast.success("File upload failed", error);
        });
      var datenow = new Date().toJSON().slice(0, 10).replace(/-/g, "");
      var timenow = new Date()
        .toTimeString()
        .replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1", "")
        .replace(":", "")
        .replace(":", "");
      var order_id = "DOB" + datenow.slice(2, datenow.length) + timenow;

      // console.log(discount+order_id)
      const data = {
        order_id: order_id,
        admin_id: "user23062923",
        cus_id: this.$cookies.get("cus_id"),
        image: this.urlImage,
      };
      this.$store.dispatch("orderBuy_cust/Submit_Order", data);

      for (let key in this.ProductCart) {
        let item = this.ProductCart[key];

        this.$store.dispatch("orderBuy_cust/SubmitToOrderBuyDetail", {
          order_id: order_id,
          shop_id: item.shop_id,
          pro_id: item.pro_id,
          qty: item.qty,
          price: item.price,
        });
      }
      // update qty product
      // alert(JSON.stringify(this,this.ProductCart))
      for (let key in this.ProductCart) {
        let el = this.ProductCart[key];
        this.proQty.pro_id = el.pro_id;
        this.proQty.qty = el.qty;

        await this.$axios
          .put(`/product/updateQty/${this.proQty.pro_id}`, {
            qty: this.proQty.qty,
          })
          // .then((res) => {
          //   this.$toast.success("update qty success");
          // })
          // .catch((err) => {
          //   this.$toast.success("fails..");
          // });
      }
      // // insert payment
      await this.$axios
        .post("/payment", {
          cus_id: this.$cookies.get("cus_id"),
          user_id: "user123",
          order_id: order_id,
          totalSum: this.Sum,
        })
        // .then((res) => {
        //   this.$toast.success("insert success");
        // });
      // comment
      this.comment.cus_id = this.$cookies.get("cus_id");
      this.comment.order_id = order_id;
      await this.$axios.post("/comment", this.comment);
      this.loading = false;
      this.$toast.success("ສັ່ງຊື້ສຳເລັດ");
      this.snackbar = true;
      this.cancelAll();
      // const routeData = this.$router.resolve(
      //   `/Admin/report/bills.customer_order_buy/${data.order_id}`
      // );
      // window.open(routeData.href, "_blank");
      //  this.$router.push(`/views.Admin/report/bills.customer_order_buy`);
    },

    deleteItem(item) {
      this.delItem = item;
      this.dialogDel = true;
      // alert(this.delItem.pro_id)
    },
    deleteConfirm() {
      this.$store.dispatch("orderBuy_cust/deleteItemIdx", this.delItem.pro_id);
      this.dialogDel = false;
      console.log("delete:", this.ProductCart);
      if (this.$store.getters["orderBuy_cust/CountOrderQty"] <= 0) {
        this.$router.push(`/view.customer/product`);
      }
    },
    cancelAll() {
      this.$store.dispatch("orderBuy_cust/CancelAllItem");
      if (this.$store.getters["orderBuy_cust/CountOrderQty"] <= 0) {
        this.$router.push(`/view.customer/product`);
      }
    },
  },
};
</script>

<style>
#cssstyle {
  font-size: 30px;
  font-family: "Noto Sans Lao";
  text-align: left;
  margin-right: 30px;
  margin-top: 7px;
  color: black;
  font-weight: normal;
}
#myfont {
  font-size: 25px;
  font-family: "Noto Sans Lao";
  font-weight: normal;
  color: black;
}
#dialog {
  font-size: 25px;
  font-family: "Noto Sans Lao";
  font-weight: bold;
  align-content: center;
  margin-left: 135px;
  margin-top: 10px;
  color: black;
}
#btntext {
  font-size: 18px;
  font-family: "Noto Sans Lao";
  font-weight: normal;
  color: white;
}
#tbheader {
  height: 10px;
  font-size: 50px;
  font-family: "Noto Sans Lao";
  font-weight: normal;
  color: black;
}
.radio {
  font-size: 40px;
  font-family: "Noto Sans Lao";
  font-weight: normal;
  color: black;
}
</style>
<style scoped>
.tcenter >>> input {
  text-align: center;
}
</style>
