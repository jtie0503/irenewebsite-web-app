<template>
    <v-container>
         <v-btn
            variant="text"
            prepend-icon="mdi-arrow-left"
             to="/"
            >
            Back to Puppies
            </v-btn>
        <v-row justify="center">

            <v-col cols="12" md="8">

            <video
                :src="dogs.video"
                controls
                class="rounded-lg w-100"
                style="max-height:500px; object-fit:cover;"
            ></video>

            </v-col>

            <v-col cols="12" md="8">

            <h1 class="text-h4 font-weight-bold">
                {{ dogs.breed }}
            </h1>

            <v-chip
                class="mt-2"
                :color="
                dogs.status === 'Available'
                    ? 'green'
                    : dogs.status === 'Reserved'
                    ? 'orange'
                    : 'red'
                "
            >
                {{ dogs.status }}
            </v-chip>

            <h2 class="text-h5 text-orange mt-3">
                ₱{{ dogs.price }}
            </h2>

            <p class="mt-2">
                {{ dogs.gender }} • {{ dogs.age }} • {{ dogs.color }}
            </p>

            <v-divider class="my-5" />

            <h3>Description</h3>

            <p class="mt-2">
                {{ dogs.description }}
            </p>

            <v-divider class="my-5" />

            <p><strong>Vaccinated:</strong> {{ dogs.vaccinated }}</p>

            <p><strong>Dewormed:</strong> {{ dogs.deworm }}</p>

            <p><strong>Location:</strong> {{ dogs.location }}</p>

            <v-row no-gutters class="mt-5" align="center">
                <v-col cols="5" class="pr-2">
                    <v-btn
                        block
                        variant="outlined"
                        color="blue"
                        :disabled="dogs.status === 'Reserved' || dogs.status === 'Sold'"
                        :href="`https://m.me/112191883900846?text=${encodeURIComponent(
                            `Hi! I'm interested in the ${dogs.breed} puppy.`
                        )}`"
                        target="_blank"
                        >
                        <v-icon icon="mdi-facebook-messenger" class="mr-1" />
                        Message Seller
                    </v-btn>
                </v-col>    

                 <v-col cols="7" class="pl-2">
                    <v-btn
                    block
                    color="orange-darken-2"
                    :disabled="
                        dogs.status === 'Reserved' || dogs.status === 'Sold'
                    "
                     @click="handleReservationDialogAdd()"
                    >
                    
                    <v-icon icon="mdi-calendar-check" class="mr-2"   />
                    Reserved Now
                    </v-btn>
                </v-col>                 
            </v-row>
            </v-col>
        </v-row>

        <v-dialog v-model="dialogReserved" max-width="500" persistent>
            <reservationDialog
                :dogItem="dogs"
                @submit:confirm="submitReserved()"
                @cancel="dialogReserved = false"
            />
        </v-dialog>

        </v-container>
   
</template>
<script setup lang="ts">

const { getById } = useDog();
const { orderItem, add } = useOrder()

const route = useRoute();
const id = route.params.id

const dogs = await getById(id as string)

const dialogReserved = ref(false)
const confirmationData = useState<any>("confirmationPage")

async function submitReserved(){
try {
    await add({
       ...orderItem.value,
            dogId: dogs._id!
    })
     confirmationData.value = {
            ...orderItem.value,
            dog: dogs
        }
    dialogReserved.value =false
      await navigateTo("/confirmationPage")
    
} catch (error) {
 console.error(error)
}
}

function handleReservationDialogAdd(){
    orderItem.value = {
        dogId: "",
      customerName: "",
      email: "",
      contactNumber: "",
      deliveryMethod: "Pickup",
      address: "",
     status: "Pending Verification"
    }
    dialogReserved.value = true
}


</script>