<template>
  <div>
    <v-row no-gutters class="justify-center">
      <h1>ລາຍງານຂໍ້ມູນລູກຄ້າ</h1>
    </v-row>
    <v-row no-gutters class="ml-7">
      <v-col cols="mx-2" md="3">
        <v-card class="mx-2" height="237" elevation="2">
          <v-row no-gutters class="justify-center">
            <div>
              <v-icon size="120" color="#4FC3F7">mdi-account</v-icon>
              <div class="pa-2">
                <h3>ລູກຄ້າທັງໜົດ</h3>
                <span>{{ user.length }} ຄົນ</span>
              </div>
            </div>
          </v-row>
          <v-row no-gutters class="mr-2 mt-2">
            <v-spacer></v-spacer>
            <v-btn class color="primary" @click="printReport">
              <v-icon dark left >mdi-printer</v-icon>print
            </v-btn>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row no-gutters class="justify-center">
      <v-card class="ma-2 ml-9" width="100%">
        <v-row no-gutters class="justify-center">
          <h3>ຂໍ້ມູນລູກຄ້າທັງໝົດ</h3>

        </v-row>
        <v-data-table
          :headers="headers"
          :items="user"
          hide-default-footer
        >
        <template #[`item.idx`]="{index}">
          <div>{{ index + 1 }}</div>
        </template>
        <template #[`item.profile`]="{item}">
        <div>
          <v-img v-if="!item.profile" src="/user.png" width="100" height="100"></v-img>
          <v-img v-else :src="item.profile" width="100" height="100"></v-img>
        </div>
      </template>
        </v-data-table>
      </v-card>
    </v-row>
  </div>
</template>

<script>
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
pdfMake.vfs = pdfFonts.pdfMake.vfs
export default {
    layout: "admin",
    data() {
        return {
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
        }
    },
    mounted() {
      this.getUser()
    },
    methods: {
        async getUser(){
      const res=await this.$axios.$get('/customer')
      this.user=res.customer
      // console.log('show', this.user)
    },
    // printReport() {
    //   const routeData = this.$router.resolve(
    //     `/Admin/management/report/customers/bills`
    //   )
    //   window.open(routeData.href, '_blank')
    // },
    printReport(callback) {
      const table = document.querySelector('.v-data-table__wrapper table')
      const clonedTable = table.cloneNode(true)
      const headers = clonedTable.querySelectorAll('thead th')
      const actionsIndex = Array.from(headers).findIndex(
        (header) => header.textContent.trim() === 'Actions'
      )
      if (actionsIndex !== -1) {
        headers[actionsIndex].remove()
        const rows = clonedTable.querySelectorAll('tbody tr')
        rows.forEach((row) => row.children[actionsIndex].remove())
      }

      const printWindow = window.open('', '', 'height=500,width=800')
      // printWindow.document.write('<html><head><title>ລາຍງານການຂາຍໜ້າຮ້ານ</title>')
      printWindow.document.write(`
    <style>
        *{
          font-family: phetsarath ot;
        }
      table {
        border-collapse: collapse;
        margin: 0 auto;
        width: 100%;
      }
      td, th {
        border: 1px solid black;
        padding: 0.5rem;
      }
      .logo {
        width: 80px;
        height: auto;
        margin-right: 10px;
      }
      .shop-info {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
      }
      .shop-details {
        margin-top: 10px;
      }
      .bill-date {
        margin-bottom: 10px;
      }
      .total-price {
        font-weight: bold;
        margin-bottom: 10px;
      }
    </style>
  `)
      printWindow.document.write('</head><body >')

      // Add bill date
      printWindow.document.write(
        `<h2 style='text-align:center'>ລາຍງານຂໍ້ມູນລູກຄ້າ</h2>`
      )
      

      // Add table
      printWindow.document.write(clonedTable.outerHTML)

      printWindow.document.write('</body></html>')
      printWindow.document.close()
      printWindow.print()

      // Clear the value after printing is complete
      setTimeout(() => {
        this.value = ''
      }, 1000) // Wait for 1 second before clearing the value

      if (typeof callback === 'function') {
        callback()
      }
    },
    }
}
</script>

<style>

</style>