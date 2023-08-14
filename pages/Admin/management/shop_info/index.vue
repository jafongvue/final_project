<template>
  <v-card class="elevation-0">
    <v-row justify="center">
      <h2 class="mt-5 mb-5">ຈັດການຂໍ້ມູນຮ້ານ</h2>
    </v-row>

    <v-data-table
      :headers="headers"
      :items="shop"
      :search="search"
      item-key="id"
      sort-by="idx"
    >
    <template #top>
        <v-toolbar flat>
          <v-toolbar-title>ລາຍການຂໍ້ມູນຮ້ານ</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="ຄົ້ນຫາ"
            single-line
            dense
            outlined
            hide-details
          >
          </v-text-field>
          <v-spacer></v-spacer>

          <!-- <v-btn
            depressed
            class="mb-2"
            style="font-size: 17px; font-weight: bold"
            color="primary"
            to="/Admin/management/users/add"
          >
            <v-icon>mdi-plus</v-icon>
            ເພີ່ມຜູ້ໃຊ້
          </v-btn> -->
        </v-toolbar>
        <v-divider></v-divider>
      </template>
      <template #[`item.idx`]="{index}">
        <div>
          {{ index+1 }}
        </div>
      </template>
      <template #[`item.actions`]="{item}">
        <v-btn icon @click="delItem(item)">
          <v-icon color="error">mdi-delete</v-icon>
        </v-btn>
      </template>
      <template #[`item.profile`]="{item}">
        <div>
          <v-img v-if="!item.profile" src="/user.png" width="100" height="100"></v-img>
          <v-img v-else :src="item.profile" width="100" height="100"></v-img>
        </div>
      </template>
    </v-data-table>

    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card rounded>
        <v-row justify="center">
          <div class="mt-4" style="font-size: 25px; font-weight: bold">
            ລຶບຂໍ້ມູນ
          </div>
        </v-row>
        <v-divider class="mt-2 mb-2"></v-divider>
        <v-card-title
          style="font-size: 22px; font-weight: bold; font-family: NotoSansLao"
          >ທ່ານຕ້ອງການລຶບຂໍ້ມູນນີ້ບໍ...?</v-card-title
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
            @click="deleteConfirm"

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
      deleteItem: [],
      editItem: {},
      editedIndex: -1,
      valid: false,
      dialog: false,
      dialogDelete: false,
      search: "",
      headers: [
        {
          text: "ລຳດັບ",
          value: "idx",
        },
        {
          text: "ຮູບ",
          value: "profile",
        },
        {
          text: "ຊື່ຮ້ານ",
          value: "shop_name",
        },
        {
          text: "ເບີໂທລະສັບ",
          value: "tel",
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
        {
          text: "note",
          value: "note",
        },
        {
          text: "Actions",
          value: "actions",
          align: "right",
        },
      ],
      shop: [

      ],
    };
  },
  mounted(){
    this.getShop()
  },
  methods:{
    async getShop(){
      const res=await this.$axios.$get('/shop')
      this.shop=res.user
    },
    delItem(list) {
      this.deleteItem = list
      this.dialogDelete = true
    },
    async deleteConfirm(){
      await this.$axios.delete(`/shop/${this.deleteItem.shop_id}`);
      this.deleteItem=[]
      this.getShop()
      this.dialogDelete=false
    }
  }
};
</script>
