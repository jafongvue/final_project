<template>
  <v-card>
    <v-row>
      <!-- btn go back -->
      <v-btn
        small
        color="error"
        outlined
        class="ml-7 mt-5"
        prepend-icon="mdi-cloud-upload"
        @click="$router.back()"
        ><v-icon size="20" left light style="color: red"
          >mdi-arrow-left-circle</v-icon
        >
        <span style="font-weight: bold; font-size: 14px">ກັບຄືນ</span>
      </v-btn>
    </v-row>
    <!-- Show productDetail -->
    <h1 id="csss" class="text-md-center mb-10 mt-7">
      ***ສະແດງລາຍລະອຽດທັງໝົດຂອງສິນຄ້າ***
    </h1>
    <v-divider></v-divider>
    <v-row>
      <v-col cols="12" sm="6" md="6" lg="5" class="mt-7 mb-7">
        <v-card class="ml-4">
          <div class="ml-3">
            <v-carousel
              height="500"
              width="500"
              show-arrows
              hide-delimiter-background
            >
              <v-carousel-item v-for="(img, i) in getImage" :key="i">
                <v-card
                  class="mx-auto elevation-0"
                  height="500"
                  width="500"
                  aspect-ratio="1.7"
                  :img="img.url"
                >
                </v-card>
              </v-carousel-item>
            </v-carousel>
            <v-row no-gutters justify="center">
              <div
                class="d-flex flex-nowrap ma-3"
                align="center"
                v-for="(img, i) in getImage"
                :key="i"
              >
                <v-card
                  outlined
                  height="70"
                  width="100"
                  color="#c977ff"
                  v-ripple="{ class: `error--text` }"
                  :img="img.url"
                >
                  <v-icon color="green" size="70">mdi-{{ img.class }}</v-icon>
                </v-card>
              </div>
            </v-row>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="6" lg="5" class="mt-7 mb-7 ml-2">
        <v-row>
          <h2 class="mt-8">ຊື່ສິນຄ້າ:</h2>
          <h1 id="myfont" class="mt-7 ml-3" ref="proname">
            {{ pro.proName }}
          </h1>
        </v-row>
        <v-row>
          <h2 class="mt-8">ປະເພດສິນຄ້າ:</h2>
          <h1 id="myfont" class="mt-7 ml-3">{{ pro.typeName }}</h1>
        </v-row>
        <v-row>
          <h2 class="mt-7">ຫົວໜ່ວຍ:</h2>
          <h1 id="myfont" class="mt-7 ml-3">{{ pro.unitName }}</h1>
        </v-row>
        <v-row>
          <h2 class="mt-7">ຈຳນວນ:</h2>
          <h1 id="myfont" class="mt-7 ml-3">{{ pro.qty }}</h1>
        </v-row>
        <v-row>
          <h2 class="mt-7">ລາຄາ:</h2>
          <h1 id="myfont" class="mt-7 ml-3">{{ currency(pro.price) }} ກີບ</h1>
        </v-row>
        <v-row>
          <h2 class="mt-7">ລາຍລະອຽດ:</h2>
          <h1 id="myfont" class="mt-7 ml-3">{{ pro.details }} </h1>
        </v-row>
        <v-row>
          <h2 class="mt-7">ເພີ່ມຈໍານວນທີ່ຕ້ອງການສັ່ງຊື້:</h2>
          <v-row class="mt-7 ml-7">
            <v-text-field
              class="mr-15 text-center tcenter"
              filled
              dense
              rounded
              prepend-inner-icon="mdi-minus"
              append-icon="mdi-plus"
              v-model="addqty"
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
        </v-row>
        <v-btn
          lable
          class="mt-9 mb-7"
          rounded
          color="orange"
          style="font-family: Noto Sans Lao"
          id="btn-add"
          @click="AddToCart"
        >
          <v-icon color="pink"> mdi-cart-plus </v-icon>
          ເພີ່ມໃສ່ກະຕ່າ</v-btn
        >
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    product: "",
    snackbar: false,
    text: "ທ່ານໄດ້ເພີ່ມສິນຄ້າ",
    timeout: 1000,
    getImage: {},

    addqty: 1,
    keymodel: "",
  }),
  //props: ["id"],
  computed: {
    pro() {
      return this.$store.state.product.product;
    },
  },
  mounted() {
    this.$store.dispatch("product/product", this.$route.params.id);

    this.getImages();
  },
  // watch: {
  //   keymodel(val) {
  //     for (const key in this.product) {
  //       const element = this.product[key];
  //       var imagelist=element.Image
  //     }
  //     for (const key in imagelist) {
  //       const element = imagelist[key];
  //       if (key != val) {
  //         element.class = "";
  //       } else {
  //         element.class = "eye-check-outline";
  //       }
  //     }
  //   },
  // },
  methods: {
    DecrementQty(pro) {
      if (this.addqty <= 1) return;
      this.addqty--;
    },
    IncrementQty(pro) {
      if (this.addqty >= pro.qty) {
        this.addqty = parseInt(pro.qty, 10);
        //alert("ຈຳນວນສູງສຸດແລ້ວ")
        return;
      }
      this.addqty++;
      // console.log(this.addqty);
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
    Product() {
      this.$router.push("/views.Customer/product");
    },
    AddToCart() {
      this.$router.push("/login");
    },
    mykey(i) {
      this.keymodel = i;
    },
    async getImages() {
      const res = await this.$axios.get(`/image/${this.$route.params.id}`);
      this.getImage = res.data.image;
    },
  },
};
</script>
<style>
#txtqty {
  height: 36px;
  border-style: solid;
  width: 80px;
  text-align: center;
  background-color: white;
}
#btn-action:hover {
  color: green;
  cursor: pointer;
  background-color: "#E0E0E0";
}
#btn-add {
  font-size: 20px;
  height: 45px;
}
</style>

<style type="text/css">
.big-img {
  width: 350px;
  height: 400px;
  float: left;
  margin-top: 20px;
  margin-left: 10px;
}
.pic-box {
  width: 500px;
  height: 500px;
}
</style>
<style scoped>
.tcenter >>> input {
  text-align: center;
}
#myfont {
  font-size: 25px;
  font-family: "Noto Sans Lao";
  font-weight: normal;
  color: black;
}
</style>
