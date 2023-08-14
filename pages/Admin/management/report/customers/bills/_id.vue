<template>
  <v-app class="font">
    <v-card class="ma-2 elevation-0">
      <v-row>
        <div class="d-flex mt-9">
          <v-avatar size="100" color="#fafafafa" class="pa-2">
            <!-- <v-img :src="require('@/assets/images/billionfashion.png')" /> -->
          </v-avatar>
        </div>
        <v-col cols="9">
          <v-row no-gutters class="justify-center mt-3">
            <p style="font-size: 2rem; text-decoration: bold">
              ລາຍງານຂໍ້ມູນລູກຄ້າ
            </p>
          </v-row>
        </v-col>
      </v-row>

      <v-row no-gutters class>
       
        <v-col cols="12" class="align-end align-content-end">
          <v-row class="justify-end">
            <v-card class="mr-5 elevation-0">
              <p>ວັນທີ່: {{ new Date().toLocaleDateString() }}</p>
              <p>
                ເວລາ:
                {{
                  new Date().getHours() +
                  ":" +
                  new Date().getMinutes() +
                  ":" +
                  new Date().getSeconds()
                }}
              </p>
            </v-card>
          </v-row>
        </v-col>
      </v-row>

      <v-row no-gutters class>
        <v-progress-linear value="100" height="1"></v-progress-linear>
      </v-row>
      <!-- _________________datatable___________________________ -->
      <v-row no-gutters class>
        <v-card width="100%" class="mt-2 elevation-0" height="100%">
          <v-data-table
            :headers="headers"
            :items="user"
            :search="search"
            item-key="id"
            sort-by="idx"
            class="elevation-0"
            items-per-page="100000"
            hide-default-footer
          >
            <template #[`item.idx`]="{ index }">
              <div>{{ index + 1 }}</div>
            </template>
            <template #[`item.user_img`]="{ item }">
              <div>
                <v-img
                  v-if="!item.profile"
                  src="/user.png"
                  width="100"
                  height="100"
                ></v-img>
                <v-img
                  v-else
                  :src="item.profile"
                  width="100"
                  height="100"
                ></v-img>
              </div>
            </template>
          </v-data-table>
          <v-divider class></v-divider>
        </v-card>
      </v-row>
      <v-progress-linear value="100" height="1"></v-progress-linear>
    </v-card>
  </v-app>
</template>
  <script>
export default {
  layout: "login",
  data() {
    return {
      headers: [
        {
          text: "ລຳດັບ",
          value: "idx",
        },
        {
          text: "ຮູບ",
          value: "user_img",
        },
        {
          text: "ຊື່ຜູ້ໃຊ້",
          value: "fullName",
        },
        {
          text: "ເບີໂທລະສັບ",
          value: "tel",
        },
        {
          text: "ອີເມລ",
          value: "email",
        },
        {
          text: "ບ້ານ",
          value: "village",
        },
        {
          text: "ເມືອງ",
          value: "district",
        },
        {
          text: "ແຂວງ",
          value: "province",
        },
      ],
      user: [],
    };
  },
  computed: {},
  mounted() {
    this.getUser();
  },
  methods: {
    async getUser() {
      const res = await this.$axios.$get("/customer");
      this.user = res.customer;
    },
  },
};
</script>