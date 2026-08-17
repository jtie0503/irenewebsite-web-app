<template>
    <v-container class="py-10">
        
        <v-btn
            variant="text"
            prepend-icon="mdi-arrow-left"
             to="/"
            >
            Back to Home
        </v-btn>
        <v-row justify="center">
        <v-col cols="12" md="8" lg="7">

            <v-card
            elevation="4"
            rounded="xl"
            class="pa-6"
            >

            <!-- Header -->
            <div class="text-center mb-6">
                <h1 class="text-h5 font-weight-bold">
                Reservation Details
                </h1>

                <p class="text-body-2 text-grey mt-1">
                Your puppy reservation information
                </p>
            </div>

            <!-- Puppy Information -->
            <div class="mb-6">

                <div class="d-flex align-center mb-4">
                <v-icon
                    icon="mdi-dog"
                    color="orange-darken-2"
                    class="mr-2"
                />

                <span class="text-h6 font-weight-bold">
                    Puppy Information
                </span>
                </div>

                <v-row>
                <v-col cols="12">
                    <strong>Breed:</strong>
                    {{ dogs.breed }}
                </v-col>

                <v-col cols="6">
                    <strong>Age:</strong>
                    {{ dogs.age }}
                </v-col>

                <v-col cols="6">
                    <strong>Price:</strong>
                    ₱{{ dogs.price }}
                </v-col>

                <v-col cols="6">
                    <strong>Gender:</strong>
                    {{ dogs.gender }}
                </v-col>

                <v-col cols="6">
                    <strong>Color:</strong>
                    {{ dogs.color }}
                </v-col>
                </v-row>

            </div>

            <v-divider class="mb-6" />

            <!-- Customer Information -->
            <div class="mb-6">

                <div class="d-flex align-center mb-4">
                <v-icon
                    icon="mdi-account"
                    color="orange-darken-2"
                    class="mr-2"
                />

                <span class="text-h6 font-weight-bold">
                    Customer Information
                </span>
                </div>

                <v-row>
                <v-col cols="12">
                    <strong>Name:</strong>
                    {{ order.customerName }}
                </v-col>

                <v-col cols="12">
                    <strong>Reservation Method:</strong>
                    {{ order.deliveryMethod }}
                </v-col>

                <v-col
                    cols="12"
                    v-if="order.deliveryMethod === 'Delivery'"
                >
                    <strong>Address:</strong>
                    {{ order.address }}
                </v-col>
                </v-row>

            </div>

            <v-divider class="mb-6" />

            <!-- Status -->
            <div class="text-center">

                <div class="text-h6 font-weight-bold mb-3">
                Reservation Status
                </div>

                <v-chip
                size="large"
                rounded="pill"
                :color="
                    order.status === 'Completed'
                    ? 'green'
                    : order.status === 'Rejected'
                    ? 'red'
                    : order.status === 'Pending Verification'
                    ? 'orange'
                    : 'blue'
                "
                variant="flat"
                class="font-weight-bold"
                >
                {{ order.status }}
                </v-chip>

            </div>

            </v-card>

        </v-col>
        </v-row>

    </v-container>
</template>
<script setup lang="ts">

const route = useRoute()
const id = route.params.id

const { getById } = useOrder()
const { getById: dogId } = useDog()


const order = await getById(id as string)
console.log("ORDER:", order)

const dogs = await dogId(order.dogId)
console.log("DOG:", dogs)
</script>

