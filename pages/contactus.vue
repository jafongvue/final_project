<template>
    <div>
      <v-card col="12" md="4" class="mt-7 mb-15" elevation="0">
        <v-card-text
          style="font-family: Noto Sans Lao; font-weight: bold; font-size: 25px"
          class="text-md-center"
          >***ລູກຄ້າສາມາດຕິດຕໍ່ພວກເຮົາໄດ້ທີ່***</v-card-text
        >
        <div class="ml-7">
          <v-row>
            <v-col>
              <v-row dense>
                <!-- <h1 id="tel">ເບີໂທ:</h1> -->
                <v-icon large color="green darken" id="tel">
                  mdi-phone-forward
                </v-icon>
                <h1 id="tel">+856 2078825277</h1>
              </v-row>
              <v-row dense>
                <!-- <h1 id="tel">Whatsapp:</h1> -->
                <v-icon large color="green light" id="tel">mdi-whatsapp</v-icon>
                <a href="https://wa.me/8562078825277" id="tel">2078825277</a>
              </v-row>
              <v-row dense>
                <!-- <h1 id="tel">Email:</h1> -->
                <v-icon large color="orange darken" id="tel"> mdi-email </v-icon>
                <a href="mailto:jafongvuechongkai2020@gmail.com" id="email"
                  >jafongvuechongkai2020@gmail.com</a
                >
              </v-row>
              <v-row dense class="mb-15">
                <!-- <h1 id="tel">Facebook:</h1> -->
                <v-icon large color="blue  darken" id="tel">
                  mdi-facebook
                </v-icon>
                <a
                  href="https://www.facebook.com/jafongvueck"
                  target="brank"
                  id="email"
                  >J'fongvue CK</a
                >
              </v-row>
            </v-col>
          </v-row>
        </div>
      </v-card>
    </div>
  </template>
  <script>
  export default {
    name: 'App',
    layout: 'billion_client',
    data() {
      return {}
    },
  }
  </script>
  <style>
  .myfont {
    font-size: 25px;
    font-family: 'Noto Sans Lao';
    text-align: left;
    margin-left: 7px;
    margin-top: 15px;
    color: black;
    font-weight: bold;
  }
  #tel {
    font-size: 25px;
    font-family: 'Noto Sans Lao';
    text-align: left;
    color: black;
    margin-top: 30px;
    margin-left: 30px;
  }
  #email {
    font-size: 25px;
    font-family: 'Noto Sans Lao';
    text-align: left;
    color: black;
    margin-top: 30px;
    margin-left: 30px;
    text-decoration: underline;
  }
  </style>