<template>
  <div>
    <v-hover v-slot="{ hover }" open-delay="200">
      <v-card
        :elevation="hover ? 15 : 5"
        :class="{ 'on-hover': hover }"
        min-height="600"
        max-height="600"
      >
        <v-img :src="pro.profile" height="300" @click="ViewDetail(pro)"></v-img>

        <v-snackbar
          v-model="snackbar"
          :timeout="timeout"
          style="font-family: Noto Sans Lao"
        >
          {{ text }} {{ "ລາຍການເຂົ້າໃນກະຕ່າແລ້ວ" }}
          <template v-slot:action="{ attrs }">
            <v-btn
              style="font-family: Noto Sans Lao"
              width="150"
              color="blue"
              text
              v-bind="attrs"
              @click="snackbar = false"
            >
              ເບີ່ງສິນຄ້າໃນກະຕ່າ
            </v-btn>
          </template>
        </v-snackbar>

        <v-card-actions class="white justify-center">
          <v-col>
            <p id="detail" class="text-subtitle-2" v-if="pro.details">
              <i>{{ pro.details }}</i>
            </p>
            <h4 id="name">ຊື່ສິນຄ້າ: {{ pro.proName }}</h4>
            <!-- <h1 id="name">ເບີ້/ຂະໜາດ: {{ pro.typeName}}</h1> -->
            <h4 id="name">ລາຄາ: {{ currency(pro.price) }} ກີບ</h4>
            <h4 id="name">ຈຳນວນ: {{ pro.qty }}</h4>
            <v-row align="center" justify="space-around">
              <v-text-field
                class="mt-10 ml-15 mr-15 text-center tcenter"
                filled
                dense
                rounded
                v-model="addqty"
                prepend-inner-icon="mdi-minus"
                append-icon="mdi-plus"
                @keypress="isNumber($event)"
                @keyup="CheckNumber(pro)"
              >
                <template slot="append">
                  <v-btn
                    style="margin-top: -7px; margin-right: -20px"
                    color="green darken-4"
                    icon
                  >
                    <v-icon large @click="IncrementQty(pro)">mdi-plus</v-icon>
                  </v-btn>
                </template>
                <template slot="prepend-inner">
                  <v-btn
                    style="margin-top: -7px; margin-left: -20px"
                    color="green darken-4"
                    icon
                  >
                    <v-icon large @click="DecrementQty(pro)">mdi-minus</v-icon>
                  </v-btn>
                </template>
              </v-text-field>
            </v-row>
            <v-row justify="end">
              <v-row justify="start">
                <v-btn
                  rounded
                  color="#ffffff"
                  id="btnAdd"
                  class="mt-3 ml-4"
                  @click="ViewDetail(pro)"
                >
                  <v-icon color="primary"> mdi-eye-settings </v-icon>
                </v-btn>
              </v-row>
              <v-btn
                rounded
                color="orange"
                id="btnAdd"
                justify-space-around
                @click="AddToCart"
              >
                <v-icon color="pink"> mdi-cart-plus </v-icon>
                ເພີ່ມໃສ່ກະຕ່າ
              </v-btn>
            </v-row>
          </v-col>
        </v-card-actions>
      </v-card>
    </v-hover>
  </div>
</template>
<script>
export default {
  data: () => ({
    text: "ທ່ານໄດ້ເພີ່ມສິນຄ້າ",
    addqty: 1,
    snackbar: false,
    timeout: 1000,
  }),
  props: {
    pro: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    ViewDetail(pro) {
      // alert(pro)
      this.$router.push(`/productDetail/${pro.pro_id}`);
    },

    AddToCart() {
      this.$router.push("/login");
    },

    isNumber: function ($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if (keyCode < 48 || keyCode > 57) {
        // 46 is dot
        $event.preventDefault();
      }
    },
    CheckNumber(pro) {
      if (
        (typeof this.addqty == "string" && this.addqty == "") ||
        this.addqty == null ||
        this.addqty < 1
      ) {
        // console.log(typeof this.addqty);
        var n = 1;
        this.addqty = parseInt(n);
        // console.log(this.addqty);
      }
      this.addqty = parseInt(this.addqty, 10);
    },
    DecrementQty(pro) {
      if (this.addqty <= 1) return;
      this.addqty--;
    },
    IncrementQty(pro) {
      if (this.addqty >= pro.qty) {
        this.addqty = pro.qty;
        return;
      }
      this.addqty++;
      console.log(this.addqty);
    },
  },
};
</script>
<style scoped>
.tcenter >>> input {
  text-align: center;
}
#detail {
  /* height: 46px; */
  /* font-weight: 400; */
  line-height: 23px;
  word-break: break-word;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
</style>
