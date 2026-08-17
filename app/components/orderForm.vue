<template>
    <v-card width="100%">
        <v-toolbar>
            <v-row no-gutters  class="fill-height px-6" align="center">
                 <span class="font-weight-bold text-h5">{{ title }}</span>
            </v-row>
        </v-toolbar>

        <v-card-text style="max-height:100vh;overflow: auto">
            <v-row v-if="mode === 'view'" no-gutters>
                 <v-col cols="12" class="text-h6 font-weight-bold mb-3">
                    Puppy Information :
                </v-col>
                <v-divider class="my-4" />
                 <v-col cols="12" class="mb-2">
                    <strong> Breed: </strong>{{ dogItem.breed }}
                </v-col>
                <v-col cols="6" class="mb-2">
                    <strong>Age: </strong>{{ dogItem.age }}
                </v-col>
                <v-col cols="6" class="mb-2">
                    <strong>Price: </strong>{{ dogItem.price }}
                </v-col>
                <v-col cols="6" class="mb-2">
                    <strong>Gender: </strong>{{  dogItem.gender }}
                </v-col>
                 <v-col cols="6" class="mb-2">
                    <strong>Color: </strong> {{ dogItem.color }}
                </v-col>
                 <v-divider class="my-4" />

                <v-col cols="12" class="text-h6 font-weight-bold mb-3">
                   Customer Information :
                </v-col>
                <v-divider class="my-4" />
                <v-col cols="12" class="mb-2">
                    <strong> Name: </strong>{{ orderItem.customerName }}
                </v-col>
                <v-col cols="12" class="mb-2">
                    <strong> Email: </strong>{{ orderItem.email }}
                </v-col>
                 <v-col cols="12" class="mb-2">
                    <strong> Contact No.: </strong>{{ orderItem.contactNumber }}
                </v-col>
                <v-col cols="12" class="mb-2" v-if="orderItem.deliveryMethod === 'Delivery'">
                    <strong> Address: </strong>{{ orderItem.address }}
                </v-col>
                <v-col cols="12" class="text-h6 font-weight-bold mb-3">
                  <v-strong>Reservation Method :</v-strong>{{ orderItem.deliveryMethod }}
                </v-col>
              
    
               <v-col cols="12" class="mb-2" >
                    <strong> Status: </strong>{{ orderItem.status }}
                </v-col>
           
              
            </v-row>

            <v-row  no-gutters>
                <v-col cols="12" v-if="mode === 'edit'">
                    <v-select
                        v-model="orderItem.status"
                        :items="statusItems"
                        item-title="label"
                        item-value="value"
                        label="Order Status"
                    />
                </v-col>
            </v-row>
        </v-card-text>

          <v-toolbar density="compact">
            <template v-if="mode==='view'"> 
                <v-row no-gutters>
                    <v-col col="6">
                        <v-btn
                            block
                            variant="text"
                            @click="$emit('close')"
                            size="48"
                        >
                            Close
                        </v-btn>
                    </v-col>
                    <v-col cols="6">
                        <v-menu>
                            <template #activator="{ props}">
                                <v-btn
                                     block
                                     variant="flat"
                                     color="black"
                                     v-bind="props"
                                     size="48"
                                >
                                    More Actions
                                </v-btn>
                            </template>
                            <v-list>
                                <v-list-item @click="$emit('edit')">
                                    <v-list-item-title>Edit</v-list-item-title>
                                </v-list-item>
                               
                            </v-list>
                        </v-menu>
                    </v-col>
                </v-row>
            </template>
            <template v-if="mode==='edit'">
                <v-row no-gutters>
                    <v-col cols="6">
                        <v-btn
                            tile
                            block
                            variant="text"
                            class="text-none"
                            size="48"
                            @click="$emit('cancel')"
                        >
                          Cancel
                        </v-btn>
                    </v-col>
                    <v-col cols="6">
                        <v-btn
                            tile
                            block
                            variant="flat"
                            color="black"
                            size="48"
                            @click="$emit('submit:update')"
                        >
                         SAVE
                        </v-btn>
                    </v-col>
                </v-row>
            </template>
          </v-toolbar>
    </v-card>
</template>
<script setup lang="ts">

const props = defineProps({
    title:{
        type: String,
        default: "Order Details"
    },
    mode:{
        type: String,
        default: "add"
    },
});

const emits = defineEmits([
    "edit",
    "submit:update",
    "submit:add",
    "delete",
    "cancel",
    "close"
]);

const { dogItem } = useDog()
const { orderItem } =useOrder()

const statusItems = [
    { label: "Pending Verification", value: "Pending Verification" },
    { label: "Approved", value: "Approved" },
    { label: "Rejected", value: "Rejected" },
    { label: "Reserved", value: "Reserved" },
    { label: "Ready for Pickup", value: "Ready for Pickup" },
    { label: "Out for Delivery", value: "Out for Delivery" },
    { label: "Completed", value: "Completed" }
]

</script>