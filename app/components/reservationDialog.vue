<template>
    <v-card width="100%" max-height="90vh" class="d-flex flex-column">

        <v-toolbar>
            <v-row no-gutters  class="fill-height px-6" align="center"> 
                <span class="font-weight-bold text-h5">Reserved Puppy</span>
            </v-row>
        </v-toolbar>

        <v-card-text style="max-height:100vh;overflow: auto">
            <v-row no-gutters>
               <v-col>
                    <v-img
                       
                        :src="dogItem.photos[0]"
                        height="250"
                        width="500"
                        cover
                    />
                </v-col>
                <v-col cols="12">
                   <v-strong cols="12" class="text-h6 font-weight-bold mb-3">{{ dogItem.breed }}</v-strong>
                </v-col>
                <v-col cols="12">
                   <v-strong cols="12" class="text-h6 font-weight-bold mb-3">{{ dogItem.gender }} • {{ dogItem.age }}</v-strong>
                </v-col>
                <v-col cols="12">
                   <v-strong cols="12" class="text-h6 font-weight-bold mb-3"> ₱ {{ dogItem.price }}</v-strong>
                </v-col>

                <v-divider class="my-4" />

                 <v-col cols="12" class="text-h6 font-weight-bold mb-3">
                    Customer Information :
                </v-col>

                <v-form v-model="isFormValid">

                    <v-row>
                        <v-col cols="12">
                            <v-text-field
                                placeholder="Full Name"
                                v-model="orderItem.customerName"
                                :rules="[requiredRule]"
                                density="compact"
                            />
                        </v-col>

                        <v-col cols="12">
                            <v-text-field
                                placeholder="Email"
                                v-model="orderItem.email"
                                type="email"
                                :rules="[requiredRule]"
                                density="compact"
                            />
                        </v-col>

                        <v-col cols="12">
                            <v-text-field
                                placeholder="Contact No."
                                v-model="orderItem.contactNumber"
                                :rules="[requiredRule]"
                                density="compact"
                            />
                        </v-col>
                        <v-col cols="12"  v-if="orderItem.deliveryMethod === 'Delivery'">
                            <v-text-field
                                placeholder="Address"
                                v-model="orderItem.address"
                                :rules="[requiredRule]"
                                density="compact"
                            />
                        </v-col>

                        <v-col cols="12">
                            <v-divider />
                        </v-col>

                        <v-col cols="12">
                            <v-select
                                v-model="orderItem.deliveryMethod"
                                :items="reservationMethod"
                                label="Reservation Method:"
                                item-title="label"
                                item-value="value"
                                :rules="[requiredRule]"
                                density="compact"
                            />
                        </v-col>


                        <!-- PICKUP -->
                        <v-col
                            v-if="orderItem.deliveryMethod === 'Pickup'"
                            cols="12"
                        >
                            <strong>
                                Pick up Address:
                                MERCURY DRUG PARANAQUE SUCAT INTERCHANGE
                            </strong>
                        </v-col>


                        <!-- DELIVERY -->
                        <v-col
                            v-if="orderItem.deliveryMethod === 'Delivery'"
                            cols="12"
                        >

                            <v-img
                                src="/Qrcode.png"
                                alt="qrCode"
                                width="250"
                                height="200"
                                cover
                            />
                             <v-divider class="my-4" />

                          

                        </v-col>

                    </v-row>

                </v-form>

            </v-row>

        
        </v-card-text>

        <v-toolbar density="compact">
    
                <v-row>
                    <v-col cols="6">
                        <v-btn
                            tile
                            block
                            variant="text"
                            class="text-none"
                            size="48"
                            @click="emits('cancel')"
                        >
                            cancel
                        </v-btn>
                    </v-col>
                    <v-col cols="6">
                        <v-btn
                            tile
                            block
                            variant="flat"
                            class="text-none"
                            color="black"
                            size="48"
                            @click="emits('submit:confirm')"
                            :disabled="!isFormValid"
                        >
                            Confirm
                        </v-btn>
                    </v-col>
                </v-row>
          
        </v-toolbar>
    </v-card>
</template>
<script setup lang="ts">


const props = defineProps<{
    dogItem: TDog
}>()
const { orderItem } = useOrder()
const isFormValid = ref(false);
const requiredRule = (v: any) => !!v || "This field is required";

const reservationMethod = [
    {label:"Pick-Up", value:"Pickup"},
    {label:"Delivery", value:"Delivery"},
]

const emits = defineEmits([
    "cancel",
    "submit:confirm"
])




</script>