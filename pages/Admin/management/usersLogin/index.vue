<template>
  <div>
    <v-card class="elevation-0">
      <v-row justify="center">
        <h2 class="mt-5 mb-5">ກວດສອບຂໍ້ມູນຜູ້ສະໝັກ</h2>
        <!-- {{ userLogin }} -->
      </v-row>

      <v-data-table
        :headers="headers"
        :items="userLogin"
        :search="search"
        item-key="id"
        sort-by="idx"
      >
        <template #top>
          <v-toolbar flat>
            <v-toolbar-title>ລາຍການຂໍ້ມູນຜູ້ໃຊ້ລະບົບ</v-toolbar-title>
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
          </v-toolbar>
          <v-divider></v-divider>
        </template>
        <template #[`item.idx`]="{ index }">
          <div>
            {{ index + 1 }}
          </div>
        </template>
        <template #[`item.fullName`]="{ item }">
          <div v-if="item.cus_name == null">
            {{ item.user_name }}
          </div>
          <div v-else>
            {{ item.cus_name }}
          </div>
        </template>
        <template #[`item.actions`]="{ item }">
          <v-btn icon @click="delItem(item)">
            <v-icon color="error">mdi-delete</v-icon>
          </v-btn>
          <v-btn icon @click="editAction(item)">
            <v-icon color="primary">mdi-pencil-outline</v-icon>
          </v-btn>
        </template>
        <template #[`item.user_img`]="{ item }">
          <div>
            <v-img
              v-if="!item.user_profile && !item.cus_profile"
              src="/user.png"
              width="100"
              height="100"
            ></v-img>
            <v-img
              v-else-if="item.user_profile && !item.cus_profile"
              :src="item.user_profile"
              width="100"
              height="100"
            ></v-img>
            <v-img
              v-else
              :src="item.cus_profile"
              width="100"
              height="100"
            ></v-img>
          </div>
        </template>
        <template #[`item.active`]="{ item }">
          <div>
            {{ item.active }}
            <v-btn
              icon
              :loading="loading"
              @click="onActive(item)"
              :class="item.active == 'actived' ? 'green--text' : 'orange--text'"
              ><v-icon small>{{
                item.active == "actived"
                  ? "mdi-check"
                  : "mdi-alert-circle-outline"
              }}</v-icon></v-btn
            >
          </div>
        </template>
        <template #[`item.detail`]="{item}">
       <!-- <div v-if="item.user_id"> -->
        <v-hover v-slot="{ hover }"
          ><v-btn
            v-if="item.cus_id=='cus123'"
            @click="showDetails(item)"
            icon
            :color="hover ? 'primary' : ''"
            :elevation="hover ? '2' : '0'"
            ><v-icon>mdi-eye</v-icon></v-btn
          ></v-hover
        >
       <!-- </div> -->
        </template>
      </v-data-table>
      <!-- dialog Show deatils -->
    <v-dialog v-model="dialog" max-width="700">
      <v-card tile>
        <v-row justify="end"
          ><v-hover v-slot="{ hover }"
            ><v-btn
              elevation="0"
              @click="dialog = false"
              :class="hover ? 'red mt-3 mr-3' : 'red--text mt-3 mr-3'"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn></v-hover
          ></v-row
        >
        <v-card-title class="mt-10"
          ><v-row justify="center"
            ><h2 class="mt-5">ຂໍ້ມູນລາຍລະອຽດເຈົ້າຂອງສິນຄ້າ</h2>
          </v-row></v-card-title
        >
        <v-card-text class="mt-5">
          <v-row>
            <v-col cols="12" md="6">
              <h3 class="ml-5 black--text">ຮູບບັດປະຈຳຕົວ</h3>
              <v-img v-if="show_detail"
                :src="show_detail.personal_image"
                contain
                height="200"
              ></v-img>
              <div v-else style="height: 200px;font-weight: bold;align-content: center;">ບໍ່ມີຮູບ</div>
              <v-divider class="mt-3 mb-3"></v-divider>
              <h3 class="ml-5 black--text">BCLOne QRcode</h3>
              <v-img
                v-if="show_detail"
                :src="show_detail.QRcode"
                contain
                height="400"
              ></v-img>
            </v-col>
            <v-col cols="12" md="6">
              <h3 class="ml-5 black--text">ຮູບໂປຣໄຟ</h3>
              <v-img
                v-if="show_detail"
                :src="show_detail.profile"
                contain
                height="200"
              ></v-img>
              <v-divider class="mt-3 mb-3"></v-divider>
              <div v-if="show_detail">
              <div class="d-flex">
                <h3 class="black--text">ລະຫັດ:</h3>
                <p class="ml-1">{{ show_detail.user_id }}</p>
              </div>
              <div class="d-flex">
                <h3 class="black--text">ຊື່ຜູ້ໃຊ້:</h3>
                <p class="ml-1">{{ show_detail.fullName }}</p>
              </div>
              <div class="d-flex">
                <h3 class="black--text">ເພດ:</h3>
                <p class="ml-1">{{ show_detail.gender }}</p>
              </div>
              <div class="d-flex">
                <h3 class="black--text">ວ/ດ/ປ ເກີດ:</h3>
                <p class="ml-1">{{ show_detail.dob }}</p>
              </div>
              <div class="d-flex">
                <h3 class="black--text">ເບີໂທລະສັບ:</h3>
                <p class="ml-1">{{ show_detail.tel }}</p>
              </div>
              <div class="d-flex">
                <h3 class="black--text">ອີເມວ:</h3>
                <p class="ml-1">{{ show_detail.email }}</p>
              </div>
              <div class="d-flex">
                <h3 class="black--text">ບ້ານ:</h3>
                <p class="ml-1">{{ show_detail.village }}</p>
              </div>
              <div class="d-flex">
                <h3 class="black--text">ເມືອງ:</h3>
                <p class="ml-1">{{ show_detail.district }}</p>
              </div>
              <div class="d-flex">
                <h3 class="black--text">ແຂວງ:</h3>
                <p class="ml-1">{{ show_detail.province }}</p>
              </div>
              <div class="d-flex">
                <h3 class="black--text">ລະຫັດບັດປະຈຳຕົວ:</h3>
                <p class="ml-1">{{ show_detail.personal_id }}</p>
              </div>
            </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
      <v-dialog v-model="dialogEdit" max-width="400px">
        <v-card>
          <v-row justify="center">
            <h2 class="mt-5 mb-5">ແກ້ໄຂ້ຂໍ້ມູນ</h2>
          </v-row>
          <v-card-text>
            <v-text-field
              outlined
              dense
              label="ລະຫັດຜ່ານ"
              v-model="editItem.password"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" @click="dialogEdit = fasle">ຍົກເລິກ</v-btn>
            <v-btn color="primary" @click="save">ບັນທຶກ</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

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
  </div>
</template>
<script>
export default {
  layout: "admin",
  data() {
    return {
      dialogEdit: false,
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
          value: "user_img",
        },
        {
          text: "ຊື່ຜູ້ໃຊ້",
          value: "fullName",
        },
        {
          text: "ລະຫັດຜ່ານ",
          value: "password",
        },
        // {
        //   text: "ອີເມລ",
        //   value: "tel",
        // },
        {
          text: "ໃນຖານະ",
          value: "status",
        },
        {
          text: "ສະຖານະ",
          value: "active",
        },
        {
          text: "ລາຍລະອຽດ",
          value: "detail",
        },
        {
          text: "Actions",
          value: "actions",
          align: "right",
        },
      ],
      userLogin: [],
      loading: false,
      show_detail: {},
    };
  },
  mounted() {
    this.getUserLogin();
  },
  methods: {
    async getUserLogin() {
      const res = await this.$axios.$get("/login");
      this.userLogin = res.userLogin;
    },
    async onActive(item) {
      this.loading = true;
      // alert(item.id)
      await this.$axios.put(`/login/${item.id}`,{
        password:item.password
      })
      .then((res) => {
        // this.$toast.success("ຢືນຢັນສຳເລັດ", {
        //   duration: 1000,
        //   position: "top=right",
        //   iconPack: "mdi",
        //   icon: "check",
        //   singleton: true
        // });
        alert("ຢືນຢັນສຳເລັດ")
      }).catch(err=>{
        this.$toast.error("ລົ້ມແຫຼວ", {
          duration: 1000,
          position: "top=right",
          iconPack: "mdi",
          icon: "alert-circle",
          singleton: true
        });
      });


      this.getUserLogin();
      this.loading = false;
    },
    // onEdit(item){
    //   this.$router.push(`/Admin/management/usersLogin/edit/${item.id}`)
    // },

    editAction(list) {
      this.editItem = Object.assign({}, list);
      this.dialogEdit = true;
    },
    async save() {
       await this.$axios.$put(`/login/${this.editItem.id}`, {
        password: this.editItem.password,
      }).then(res=>{
        //  this.$toast.success("ຢືນຢັນສຳເລັດ", {
        //   duration: 1000,
        //   position: "top=right",
        //   iconPack: "mdi",
        //   icon: "check",
        //   singleton: true
        // });
        alert("ຢືນຢັນສຳເລັດ")
      });
      this.dialogEdit = false;
      this.getUserLogin();
    },

    delItem(list) {
      this.deleteItem = list;
    //  alert(this.deleteItem.cus_id)
      this.dialogDelete = true;
    },
    async deleteConfirm() {
      if(this.deleteItem.cus_id=='cus123'){
        await this.$axios.delete(`/user/${this.deleteItem.user_id}`);
      await this.$axios.delete(`/shop/${this.deleteItem.user_id}`);
      } 
      await this.$axios.delete(`/login/${this.deleteItem.id}`);
      this.deleteItem = [];
      this.getUserLogin();
      this.dialogDelete = false;
    },
    async showDetails(item) {
      this.dialog = true;
      const res = await this.$axios.$get(`/user/${item.user_id}`);
      this.show_detail = res.user;
    },
  },
};
</script>
