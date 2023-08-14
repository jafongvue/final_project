<template>
  <v-card class="elevation-0">
    <v-row justify="center">
      <h2 class="mt-5 mb-5">ຈັດການຂໍ້ມູນສິນຄ້າ</h2>
    </v-row>

    <v-data-table
      :headers="headers"
      :items="product"
      :search="search"
      item-key="id"
      sort-by="idx"
    >
    <template #top>
        <v-toolbar flat>
          <v-toolbar-title>ລາຍການຂໍ້ມູນສິນຄ້າ</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="ຄົ້ນຫາຂໍ້ມູນສິນຄ້າ"
            single-line
            clearable
            dense
            outlined
            hide-details
          >
          </v-text-field>
          <v-spacer></v-spacer>

          <v-btn
            depressed
            class="mb-2"
            style="font-size: 17px; font-weight: bold"
            color="primary"
            to="/Shop/product/add"
          >
            <v-icon>mdi-plus</v-icon>
            ເພີ່ມສິນຄ້າ
          </v-btn>
        </v-toolbar>
        <v-divider></v-divider>
      </template>
      <template #[`item.idx`]="{index}">
        <div>
          {{ index+1 }}
        </div>
      </template>
      <template #[`item.profile`]="{item}">
        <div>
          <v-img :src="item.profile" width="100" height="100" contain></v-img>
        </div>
      </template>
      <template #[`item.actions`]="{item}">
        <v-btn icon>
          <v-icon color="error" @click="DeleteItemById(item)">mdi-delete</v-icon>
        </v-btn>
        <v-btn icon @click="onEdit(item)">
          <v-icon color="primary">mdi-pencil</v-icon>
        </v-btn>
      </template>
    </v-data-table>
    <!-- dialog delete -->
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
  layout: "shop",
  data() {
    return {
      search: '',
      dialogDelete: false,
      deleteItem: [],
      headers: [
        {
          text: 'ລໍາດັບ',
          value: 'idx',
          // class: 'primary white--text',
          width: '8%',
        },
        {
          text: 'ຮູບ',
          align: 'center',
          sortable: false,
          value: 'profile',
        },
        { text: 'ຊື່ສິນຄ້າ', value: 'proName' },
        { text: 'ປະເພດ', value: 'typeName' },
        { text: 'ຫົວໜ່ວຍ', value: 'unitName' },

        { text: 'ຈໍານວນ', value: 'qty' },
        { text: 'ລາຄານໍາເຂົ້າ', value: 'priceIn' },
        { text: 'ລາຄາ(ກິບ)', value: 'price' },
        { text: 'ລາຍລະອຽດ', value: 'details' },
        { text: '', value: 'actions',width:'10%'},
      ],
      product:[],
    }
  },
  computed:{},
  mounted(){
    this.getProducts()
  },
  methods:{
    async getProducts(){
    const res=await this.$axios.$get(`/product/byUser/${this.$cookies.get('user_id')}`)
    this.product=res.product
    },
    onEdit(item){
      this.$router.push(`/Shop/product/edit/${item.pro_id}`)
    },
    DeleteItemById(item){
      this.dialogDelete=true;
      this.deleteItem=item
    },
    async deleteConfirm(){
      await this.$axios.delete(`/product/${this.deleteItem.pro_id}`);
      this.deleteItem=[]
      this.getProducts()
      this.dialogDelete=false
    }
  }
};
</script>
