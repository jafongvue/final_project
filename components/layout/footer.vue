<template>
    <v-footer class="my-n5 py-n5" color="#eeeeee" elevation="1">
      <v-row class="mt-n7 pb-2" justify="space-around">
        <v-col cols="12" sm="4">
          <h1 class="mystyle">ສິນຄ້າ</h1>
          <v-row>
            <v-icon large class="ic">mdi-chevron-right</v-icon>
            <h1 class="ms">ສິນຄ້າໃໝ່</h1>
          </v-row>
          <v-row>
            <v-icon large class="ic">mdi-chevron-right</v-icon>
            <h1 class="ms">ສິນຄ້າຍອດນິຍົມ</h1>
          </v-row>
        </v-col>
        <v-col cols="12" sm="4">
          <h1 class="mystyle">ກ່ຽວກັບພວກເຮົາ</h1>
          <v-row>
            <v-icon large class="ic">mdi-chevron-right</v-icon>
            <h1 class="ms">ແຫຼ່ງໃຫ້ຂໍ້ມູນເພີ່ມເຕີມ</h1>
          </v-row>
          <!-- <v-row>
            <v-icon large class="ic">mdi-chevron-right</v-icon>
            <a
              class="ms"
              href="https://www.google.com/maps/place/%E0%BA%95%E0%BA%B0%E0%BA%AB%E0%BA%BC%E0%BA%B2%E0%BA%94+%E0%BA%AB%E0%BA%BB%E0%BA%A7%E0%BA%82%E0%BA%BB%E0%BA%A7+(Hua+Khua+Market)/@17.975495,102.650165,16z/data=!4m5!3m4!1s0x0:0x95a541852ab6540!8m2!3d17.9754946!4d102.6501647?hl=en"
              target="brank"
              style="font-family: NotoSansLao; color: black"
              >ທີ່ຕັ້ງຂອງຮ້ານ</a
            >
          </v-row> -->
        </v-col>
        <v-col>
          <h1 class="mystyle">ຕິດຕໍ່ພວກເຮົາ</h1>
          <v-row dense>
            <v-icon color="black" id="icc">mdi-phone-forward</v-icon>
            <h3 class="mt-4 ml-2">+856 20 78 825 277</h3>
          </v-row>
          <v-row dense>
            <v-icon color="black" id="icc">mdi-whatsapp</v-icon>
            <h3 class="mt-4 ml-2">+856 20 78 825 277</h3>
          </v-row>
          <v-row dense>
            <v-icon color="black" id="icc">mdi-email</v-icon>
            <a href="mailto:chueyangxaiblong@gmail.com"
            target="_blank"
            style="font-size: 20px; color: black;"
            class="mt-5 ml-2"
              >jafongvue@gmail.com</a
            >
          </v-row>
          <v-row dense>
            <v-icon color="black" id="icc">mdi-facebook</v-icon>
            <a
              href="https://www.facebook.com/jafongvuechongkai/"
              target="brank"
              style="font-size: 20px; color: black;"
              class="mt-5 ml-2"
              >J'fongVue CK</a
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
    </v-footer>
</template>