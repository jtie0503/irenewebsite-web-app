<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer
        class="bg-deep-purple"
        theme="dark"
        permanent
      >
        <v-list color="transparent">
            <v-list-item title="🐶 Emman's Pet Shop"
          subtitle="Admin Panel"   
          ></v-list-item>
          <v-list-item prepend-icon="mdi-dog" title="Dogs" @click="activeTab = 'dog'"></v-list-item>
          <v-list-item prepend-icon="mdi-account-box" title="Orders" @click="activeTab = 'order'"></v-list-item>
         
        </v-list>

        <template v-slot:append>
          <div class="pa-2">
            <v-btn block @click="handleLogout()">
              Logout
            </v-btn>
          </div>
        </template>
      </v-navigation-drawer>
      <v-main style="height: 100vh">


        <!--Dog-->
        <v-row v-if="activeTab === 'dog'" no-gutters class="pa-4">
            <v-col cols="12" class="mb-3">
                <v-row no gutter  align="center">
                    <v-btn
                        class="text-none mr-2"
                        rounded="pill"
                        variant="tonal"
                        size="large"
                        @click="handleDialogAdd()"
                    >
                        Add Dog Information
                    </v-btn>
                </v-row>
            </v-col>

            <v-col cols="12">
                <v-card
                   width="100%"
                    border="thin"
                    rounded="lg"
                    variant="outlined"
                >

                <v-toolbar density="compact" color="grey-lighten-4">
                    <template #prepend>
                        <v-btn>
                            <v-icon>mdi-refresh</v-icon>
                        </v-btn>
                    </template>

                    <template #append>
                        <span class="mr-2 text-caption"> {{pageRange}}  </span>
                        <v-btn icon density="comfortable" :disabled="page === 1"  @click="prevPage()">
                            <v-icon >mdi-chevron-left</v-icon>
                        </v-btn>
                        <v-btn icon density="comfortable"  :disabled="page === pages" @click="nextPage()">
                            <v-icon >mdi-chevron-right</v-icon>
                        </v-btn>
                    </template>
                </v-toolbar>

                <v-data-table
                    :headers="headers"
                    :items="dogs"
                    item-value ="_id"
                    items-per-page="10"
                    hide-default-footer
                    style="max-height: calc(100vh - 200px)"
                   @click:row="(_: any, { item }: any) => handleRowClick(item)"
                >

                </v-data-table>
                </v-card>
            </v-col>
        </v-row>

     
        <!--DOG Dialog-->
        <!--DIALOG ADD-->
       <v-dialog v-model="dialogAdd" max-width="500" persistent>
          <dogForm
           title="Add Dog"
           mode="add"
           @submit:add="submitAdd()"
           @cancel="dialogAdd = false"
          />
        </v-dialog>

        <!--view-->
        <v-dialog v-model="dialogView" max-width="500" persistent>
          <dogForm
             title="Dog Details"
             mode="view"
             @edit="handleEdit()"
             @delete="handleDelete()"
             @close ="dialogView=false"
          />
        </v-dialog>

        <!--edit-->
        <v-dialog v-model="dialogEdit" max-width="500" persistent>
          <dogForm
             title="Edit Details"
             mode="edit"  
             @submit:update="submitEdit()"
             @cancel ="dialogEdit=false"
          />
        </v-dialog>

               <!--delete-->
        <v-dialog v-model="dialogDelete" max-width="500" persistent>
          <v-card>
            <v-card-title>Confirmation Delete</v-card-title>
            <v-card-text>Are you You watr to delete this Dog Detail ?</v-card-text>
              <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn variant="text" @click="dialogDelete = false"> Cancel</v-btn>
            <v-btn variant="flat" color="red" @click="submitDelete()">Delete</v-btn>
          </v-card-actions>
          </v-card>
        </v-dialog>

                    <!--Order-->
        <v-row v-if="activeTab ==='order'" no-gutters class="pa-4">
            <v-col cols="12">
              <v-card
                    width="100%"
                    border="thin"
                    rounded="lg"
                    variant="outlined"
              >
                
              <v-toolbar density="compact" color="grey-lighten-4" >
                 <template #prepend>
                    <v-btn>
                      <v-icon>mdi-refresh</v-icon>
                    </v-btn>
                 </template>
                 <template #append>
                   <span class="mr-2 text-caption">{{ pageRangeOrder }}</span>
                    <v-btn  :disabled="pageOrder === 1" @click="prevPageOrder">
                      <v-icon >mdi-chevron-left</v-icon>
                    </v-btn>
                    <v-btn  :disabled="pageOrder === pagesOrder" @click="nextPageOrder">
                      <v-icon >mdi-chevron-right</v-icon>
                    </v-btn>
                 </template>
              </v-toolbar>

              <v-data-table
                   :headers="orderHeaders"
                   :items="orders"
                   item-value="_id"
                   items-per-page="10"
                   hide-default-footer
                   style="max-height: calc(100vh - 200px)"
                   @click:row="(_: any, { item }: any) => handleRowClickOrder(item)"
              >

              </v-data-table>
              </v-card>
            </v-col>
        </v-row>

         
           <v-dialog v-model="orderDialogView" max-width="500" persistent>
              <orderForm
                title="Order Details"
                mode="view"
                @edit="handleEditOrder()"
                @close="orderDialogView = false"
              />
        </v-dialog>

        <v-dialog v-model="orderDialogEdit" max-width="500" persistent>
              <orderForm
                title="Order Details"
                mode="edit"
                @submit:update="submitEditOrder()"
                @cancel="orderDialogEdit = false"
              />
        </v-dialog>

      </v-main>
    </v-layout>
  </v-card>
</template>
<script setup lang="ts">

definePageMeta({
  middleware:"auth"
})
//Dogs
const activeTab = ref("dog");
const dialogAdd = ref(false);
const dialogView = ref(false);
const dialogEdit = ref(false);
const dialogDelete = ref(false);
const dogs = ref<TDog[]>([]);


const headers = [
 
  { title: "Breed", key: "breed" },
  { title: "Age", key: "age" },
  { title: "Gender", key: "gender" },
  { title: "Price", key: "price" },
  { title: "Status", key: "status" }
]

const pageRange = ref("-- - -- of --");
const page = ref(1);
const pages = ref(1);

const { dogItem, getAll,getById, add, updateById, deleteById } = useDog();

const { data, refresh,status} = await useLazyAsyncData(
    "get-dog", ()=> getAll({page:page.value}), {watch:[page]});




watchEffect(()=>{
    if(data.value){
        dogs.value = data.value.items;
        pageRange.value = data.value.pageRange;
        pages.value = data.value.pages
    }
})

function nextPage() {
  if (page.value < pages.value) {
    page.value += 1;
  }
}

function prevPage() {
  if (page.value > 1) {
    page.value -= 1;
  }
}

function handleDialogAdd(){
    dogItem.value = {  
    breed: "",
    age: "",
    price: 0,
    gender: "",
    color: "",
    description: "",
    photos: [],
    video: "",
    vaccinated: "",
    deworm: "",
    location: "",
    status: "Available",};
    dialogAdd.value = true;
}

async function submitAdd() {
  try {
    await add(dogItem.value)
    await refresh()
    dialogAdd.value = false
  } catch (error) {
    console.error(error)
  }
}

function handleRowClick(item:TDog){

    dogItem.value = { ...item }

    dialogView.value = true
}

function handleEdit(){
    dialogView.value = false;
    dialogEdit.value = true;
}

async function submitEdit(){
  try {
    await updateById(dogItem.value._id!,{
      breed:dogItem.value.breed,
      age:dogItem.value.age,
      price:dogItem.value.price,
      gender:dogItem.value.gender,
      color:dogItem.value.color,
      description:dogItem.value.description,
      photos:dogItem.value.photos,
      video:dogItem.value.video,
      vaccinated:dogItem.value.vaccinated,
      deworm:dogItem.value.deworm,
      location:dogItem.value.location,
      status:dogItem.value.status

    })
    dialogEdit.value= false;
    await refresh()
  } catch (error) {
    console.error("Error :",error);
  }
};

 function handleDelete(){
  dialogView.value = false;
  dialogDelete.value = true;
 }
 async function submitDelete(){
    try {
      await deleteById(dogItem.value._id!)
      dialogDelete.value = false;
      await refresh()
    } catch (error) {
      console.error("Error deleting product:", error);
    }
 }


 //Orders
 
const orderHeaders = [
  { title: "Customer", key: "customerName" },
  { title: "Contact No.", key: "contactNumber" },
  { title: "Delivery Method", key: "deliveryMethod" },
  { title: "Address", key: "address" },
  { title: "Status", key: "status" },
]

 const orderDialogView = ref(false);
 const orderDialogEdit= ref(false);
 const orderDialogDelete = ref(false);
 const orders = ref<TOrder[]>([]);


const pageRangeOrder = ref("-- - -- of --");
const pageOrder = ref(1);
const pagesOrder = ref(1)

const {
    orderItem,
    getAll: getAllOrders,
    updateById: updateOrderById,
    deleteById: deleteOrderById
} = useOrder()

const {
    data: dataOrder,
    status:statusOrder,
    refresh:refreshOrder
} = await useLazyAsyncData(
    "get-order", ()=> getAllOrders(pageOrder.value), {watch:[pageOrder]});

watchEffect(() => {

  if (dataOrder.value) {
    orders.value = dataOrder.value.items;
    pagesOrder.value = dataOrder.value.pages;
    pageRangeOrder.value = dataOrder.value.pageRange;
  }
});

function nextPageOrder() {
  if (pageOrder.value < pagesOrder.value) {
    pageOrder.value += 1;
  }
}

function prevPageOrder() {
  if (pageOrder.value > 1) {
    pageOrder.value -= 1;
  }
}

async function handleRowClickOrder(item:TOrder){
  orderItem.value = { ... item}
   dogItem.value = await getById(item.dogId)
  orderDialogView.value = true;
}

function handleEditOrder(){
    orderDialogView.value = false;
    orderDialogEdit.value = true;
}

 async function submitEditOrder(){
  try {
     await updateOrderById(orderItem.value._id!,{
         status: orderItem.value.status
     })
      orderDialogEdit.value = false
      await refresh()
  } catch (error) {
    
  }
}


//LogOut

async function handleLogout(){
  await $fetch("/api/auth/logOut", {
    method:"DELETE"
});

const token = useCookie("/admin")
token.value = null
await navigateTo("/logIn")
}




</script>