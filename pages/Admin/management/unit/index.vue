<template>
  <v-container>
    <v-card class="ma-1 mt-4">
      <v-row justify="center">
        <h2>ຈັດການຂໍ້ມູນຫົວໜ່ວຍ</h2>
      </v-row>

      <v-card-text class="mt-5">
        <v-data-table
          dense
          :headers="headers"
          :search="search"
          :items="unit"
          sort-by="unit"
        >
          <template #top>
            <v-toolbar flat>
              <v-toolbar-title>ຫົວໜ່ວຍສິນຄ້າ</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" max-width="500px" persistent>
                <template #activator="{ on, attrs }">
                  <v-btn
                    style="font-size: 17px; font-weight: bold"
                    dense
                    color="primary"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    class="mt-n5"
                  >
                    <v-icon>mdi-plus</v-icon> ເພີ່ມ
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-text-field
                    append-icon="mdi-magnify"
                    placeholder="ຄົ້ນຫາ"
                    outlined
                    dense
                    v-model="search"
                    class="mt-4"
                  ></v-text-field>
                </template>

                <v-card>
                  <v-toolbar dense color="primary" dark>
                    <v-row justify="center">
                      {{ formTitle }}
                    </v-row>
                  </v-toolbar>
                  <v-card-text>
                    <v-form v-model="valid">
                      <v-row justify="center" class="mt-3">
                        <v-col cols="12" class="mb-n5">
                          <v-text-field
                            dense
                            outlined
                            autofocus
                            v-model="editItem.unitName"
                            label="ຊື່ຫົວໜ່ວຍສິນຄ້າ"
                            required
                            :rules="[
                              (val) => !!val || 'ກະລຸນາປ້ອນຊື່ຫົວໜ່ວຍສິນຄ້າ.',
                            ]"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-card-text>
                  <v-divider></v-divider>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="btn-hover" color="red" @click="close">
                      <v-icon>mdi-close</v-icon>
                      ຍົກເລີກ
                    </v-btn>
                    <v-btn class="btn-hover" color="blue" @click="save">
                      <v-icon>mdi-check</v-icon>
                      ບັນທຶກ
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
            <v-divider></v-divider>
          </template>

          <template #[`item.actions`]="{ item }">
            <v-row no-gutters justify="end">
              <v-tooltip top color="error">
                <template #activator="{ on, attrs }">
                  <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon right color="error" @click="deleteItem(item)"
                      >mdi-trash-can-outline</v-icon
                    >
                  </v-btn>
                </template>
                <span>ລຶບ</span>
              </v-tooltip>
              <v-tooltip top color="primary">
                <template #activator="{ on, attrs }">
                  <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon color="primary" @click="editAction(item)"
                      >mdi-pencil-outline</v-icon
                    >
                  </v-btn>
                </template>
                <span>ແກ້ໄຂ</span>
              </v-tooltip>
            </v-row>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>

    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card rounded>
        <v-row justify="center">
          <div style="font-size: 25px; font-weight: bold" class="mt-4">
            ລຶບຂໍ້ມູນ
          </div>
        </v-row>
        <v-divider class="mt-2 mb-2"></v-divider>
        <v-card-title style="font-size: 22px; font-weight: bold"
          >ທ່ານຕ້ອງການລຶບຂໍ້ມູນຫົວໜ່ວຍສິນຄ້ານີ້ບໍ...?</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="error"
            text
            @click="close"
            style="font-size: 18px; font-weight: bold"
            >ຍົກເລີກ</v-btn
          >
          <v-btn
            color="primary accent-3"
            text
            @click="deleteConfirm"
            style="font-size: 18px; font-weight: bold"
            >ຢຶນຢັນລຶບ</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
export default {
  layout:"admin",
  data(){
    return {
      delItem: {},
      editItem: {},
      editedIndex: -1,
      valid: false,
      dialog: false,
      dialogDelete: false,
      search: '',
      headers: [
        {
          text: 'ລຳດັບ',
          value: 'idx',
        },
        {
          text: 'ຊື່ໜ່ວຍສິນຄ້າ',
          value: 'unitName',
        },
        {
          text: 'Actions',
          value: 'actions',
          align: 'right',
        },
      ],
      // unit: [
      //   {
      //     idx: '1',
      //     unit_name: 'nnnnnn'
      //   }
      // ]
    }
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'ເພີ່ມຂໍ້ມູນ' : 'ແກ້ໄຂຂໍ້ມູນ'
    },
    loading() {
      return this.$store.state.types.loading
    },
    unit() {
      return this.$store.state.units.units
    },
  },
  mounted() {
    this.$store.dispatch('units/units')
  },
  methods: {
    openDialog() {
      this.dialog = true
    },
    close() {
      this.dialog = false
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editItem = Object.assign({}, null)
        this.delItem = Object.assign({}, null)
        this.editedIndex = -1
      })
    },
    editAction(list) {
      this.editedIndex = this.unit.indexOf(list)
      this.editItem = Object.assign({}, list)
      this.dialog = true
    },
    async save() {
      if (this.editedIndex == -1) {
        if (
          this.editItem.unitName === '' ||
          this.editItem.unitName === undefined
        ) {
          return alert('please input some info')
        } else {
          await this.$store.dispatch('units/create', this.editItem)
        }
      } else {
        if (
          this.editItem.unitName === '' ||
          this.editItem.unitName === undefined
        ) {
          return alert('please input some info')
        } else {
          await this.$store.dispatch('units/update', {
            id: this.editItem.unit_id,
            body: this.editItem,
          })
          this.editedIndex = -1
        }
      }
      this.editItem.unitName = ''
      this.dialog = false
    },
    deleteItem(list) {
      // this.editedIndex = this.units.indexOf(list)
      this.delItem = Object.assign({}, list)
      this.dialogDelete = true
    },
    async deleteConfirm() {
      await this.$store.dispatch('units/delete', this.delItem.unit_id)
      this.dialogDelete = false
    },
  }
}
</script>
