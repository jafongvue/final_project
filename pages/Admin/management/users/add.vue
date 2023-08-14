<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" md="11">
        <form @submit.prevent="submit">
          <v-card
            elevation="2"
            style="margin-top: 2px; padding-bottom: 10px"
            class="mt-3"
          >
            <v-row no-gutters class="justify-center">
              <h2 style="margin-top: 30px">ເພີ່ມຂໍ້ມູນຜູ້ໃຊ້</h2>
            </v-row>

            <v-row no-gutters class="ma-5 justify-space-around">
              <v-col cols="12" md="9">
                <v-card class="mr-4 elevation-0">
                  <v-text-field
                    :rules="[(v) => !!v || 'name is require']"
                    :counter="100"
                    label="ຊື່ຜູ້ໃຊ້"
                    required
                    autofocus
                  >
                  </v-text-field>
                  <v-radio-group
                    label="ເພດ"
                    row
                    required
                    :rules="[(v) => !!v || 'gender is require']"
                  >
                    <v-row class="justify-space-around">
                      <v-radio label="ຊາຍ" value="ຊາຍ"></v-radio>
                      <v-radio label="ຍິງ" value="ຍິງ"></v-radio>
                    </v-row>
                  </v-radio-group>
      
                  <v-divider style="margin-top: -12px"></v-divider>
                  <v-text-field
                    :rules="[(v) => !!v || 'dob is require']"
                    :counter="100"
                    label="ວັນ/ເດືອນ/ປີເກີດ"
                    required
                    autofocus
                  >
                  </v-text-field>
                  <v-text-field
                    :rules="[(v) => !!v || 'tel is require']"
                    :counter="100"
                    label="ເບີໂທລະສັບ"
                    required
                    autofocus
                  >
                  </v-text-field>
                  <v-text-field
                    :rules="[(v) => !!v || 'email is require']"
                    :counter="100"
                    label="ອີເມລ"
                    required
                    autofocus
                  >
                  </v-text-field>
                  <v-text-field
                    :rules="[(v) => !!v || 'village is require']"
                    :counter="100"
                    label="ບ້ານ"
                    required
                    autofocus
                  >
                  </v-text-field>
                  <v-text-field
                    :rules="[(v) => !!v || 'district is require']"
                    :counter="100"
                    label="ເມືອງ"
                    required
                    autofocus
                  >
                  </v-text-field>
                  <v-text-field
                    :rules="[(v) => !!v || 'province is require']"
                    :counter="100"
                    label="ແຂວງ"
                    required
                    autofocus
                  >
                  </v-text-field>
                  <v-text-field
                    :rules="[(v) => !!v || 'status is require']"
                    :counter="100"
                    label="ສະຖານະ"
                    required
                    autofocus
                  >
                  </v-text-field>
                 

                  <v-divider style="margin-top: -10px" class></v-divider>
                  <h4 class="mt-5" style="font-size: 17px; font-weight: normal">
                    ເລຶອກຮູບສິນຄ້າ
                  </h4>

                  <input
                    type="file"
                    class="file-upload"
                    multiple
                    ref="file"
                    label="Image input"
                  />
                  <v-carousel

                    show-arrows-on-hover
                    hide-delimiters
                    height="auto"
                    class="grey lighten-3"
                    v-ripple="{ class: `white--text` }"
                  >
                    <v-carousel-item v-for="(img, i) in proImg" :key="i">
                      <v-card class="mx-auto white" width="100%">
                        <v-img
                          aspect-ratio="1.4"
                          height="450"
                          contain
                          transition
                        >
                          <template v-slot>
                            <div>
                              <v-col class="align-end">
                                <v-row class="ma-1 align-end justify-end">
                                  <v-btn class large color="error" icon>
                                    <v-icon large color="error"
                                      >mdi-delete</v-icon
                                    >
                                  </v-btn>
                                </v-row>
                                <v-row class="ma-1 align-end justify-end">
                                  <v-btn class large icon>
                                    <v-icon large color="red"
                                      >mdi-close-box-multiple</v-icon
                                    >
                                  </v-btn>
                                </v-row>
                              </v-col>
                            </div>
                          </template>
                        </v-img>
                      </v-card>
                    </v-carousel-item>
                  </v-carousel>
                </v-card>
              </v-col>
            </v-row>

            <v-divider class></v-divider>
            <v-row class="ma-5">
              <v-btn
                style="font-size: 16px; font-weight: bold;color:white"
                color="red"
                rounded
                class="mt-2"
                to="/Admin/management/users"
              >
                <v-icon left >mdi-arrow-left-circle</v-icon>ກັບສູ່ໜ້າສິນຄ້າ
              </v-btn>
              <v-spacer></v-spacer>

              <v-btn
                style="font-size: 16px; font-weight: bold;color:white"
                color="red accent-4"
                rounded
                class="mt-2 mr-7"
              >
                <v-icon left >mdi-close-circle</v-icon>ຍົກເລິກ
              </v-btn>

              <v-btn
                style="font-size: 16px; font-weight: bold;color:white"
                color="primary"
                rounded
                class="mt-2 mr-5"
              >
                <v-icon  left>mdi-check-circle</v-icon>ບັນທຶກ
              </v-btn>
            </v-row>
          </v-card>
        </form>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  layout: "admin",
 data() {
   return {
      
   }
 },

}
</script>

<style>

</style>
