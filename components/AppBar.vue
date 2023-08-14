 <template>
  <v-app-bar
    app
    color="white"
    height="57"
    elevation="1"
    class="hidden-sm-and-down"
  >
    <v-avatar size="35" class="mr-1 ml-2 home" color="red">
      <!-- <v-img :src="require('@/assets/images/billionfashion.png')"></v-img> -->
    </v-avatar>

    <h3 class="homepage">BillionFashionShop</h3>
    <v-spacer></v-spacer>
    <div class="css" v-ripple>ໜ້າຫຼັກ</div>

    <div class="css" v-ripple>ສິນຄ້າ</div>
    <div class="css" v-ripple>ກ່ຽວກັບຮ້ານ</div>
    <div class="css">ແຫຼ່ງໃຫ້ຂໍ້ມູນ</div>
    <div class="css" v-ripple>ຕິດຕໍ່ພວກເຮົາ</div>
    <div class="css">ສະມັກສະມາຊິກ</div>

    <!-- cart -->
    <v-menu offset-y rounded>
      <template #activator="{ on: menu, attrs }">
        <v-badge class="mr-10" color="blue" overlap>
          <v-tooltip bottom>
            <template #activator="{ on: tooltip }">
              <v-icon
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

    <!-- login -->
    <v-tooltip bottom>
      <template #activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on" class="mr-2">
          <v-icon to="/views.BillionFashion/customer_login">mdi-login</v-icon>
        </v-btn>
      </template>
      <span class="tooltip">ເຂົ້າລະບົບ</span>
    </v-tooltip>
  </v-app-bar>
  
</template>
<script>
export default {
  data: () => ({}),
};
</script> 
<style>

.mystyle {
  margin-top: 30px;
  margin-left: 10px;
  margin-right: 20px;
  color: black;
  text-align: left;
  margin-left: 20px;
  font-family: 'Noto Sans Lao';
  font-size: 30px;
}
.css1 {
  margin-top: 120px;
  background: #009933;
  color: aliceblue;
  text-align: center;
  height: 60px;
}
.ic {
  margin-top: 17px;
  margin-left: 15px;
  color: white;
}
#icc {
  margin-top: 20px;
  margin-left: 20px;
}
.ms {
  margin-top: 20px;
  margin-left: 20px;
  color: black;
  text-align: left;
  font-family: 'Noto Sans Lao';
  font-size: 20px;
  font-weight: normal;
}
.ms:active {
  margin-top: 20px;
  margin-left: 20px;
  color: black;
  text-align: left;
  font-family: 'Noto Sans Lao';
  font-size: 20px;
  font-weight: normal;
}
.ms:hover {
  margin-top: 20px;
  cursor: pointer;
  margin-left: 20px;
  color: black;
  text-align: left;
  font-family: 'Noto Sans Lao';
  font-size: 20px;
  font-weight: normal;
  text-decoration: underline;
}
.css {
  color: black;
  margin-left: 20px;
  font-family: 'Noto Sans Lao';
  font-size: 20px;
  text-decoration: none;
}
.css:hover {
  color: #00c853;
  cursor: pointer;
  margin-left: 20px;
  font-family: 'Noto Sans Lao';
  text-decoration: none;
}
#title {
  text-align: center;
  margin-top: 15px;
  margin-left: 20px;
  font-size: 50px;
  font-family: 'Noto Sans Lao';
  font-weight: bold;
}
.shopname {
  font-weight: bold;
  font-size: 50px;
  font-family: 'Noto Sans Lao';
  text-align: center;
}
a:link {
  color: black;
  text-decoration: none;
}
#contact {
  font-size: 25px;
  font-family: 'Noto Sans Lao';
  text-align: left;
  color: black;
  margin-top: 20px;
  margin-left: 20px;
  text-decoration: underline;
}
.tooltip {
  color: white;
  margin-left: 20px;
  font-family: 'Noto Sans Lao';
  font-size: 15px;
  text-decoration: none;
  font-weight: normal;
}
</style>

