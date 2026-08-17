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
            <v-col cols="12" md="7">

                <h1 class="text-h4 font-weight-bold text-center mb-2">
                    Track Your Reservation
                </h1>

                <p class="text-center text-grey mb-6">
                    Enter the email you used for your reservation.
                </p>

                <v-text-field
                    v-model="email"
                    label="Email Address"
                    type="email"
                    variant="outlined"
                />

                <v-btn
                    block
                    color="orange"
                    @click="searchReservation"
                >
                    Search Reservation
                </v-btn>

            </v-col>
        </v-row>

        <v-row v-if="orders.length" class="mt-8">
            <v-col
                v-for="order in orders"
                :key="order._id"
                cols="12"
            >
                <v-card class="pa-4">

                    <div class="text-h6 font-weight-bold mb-4">
                        Reservation
                    </div>

                    <div class="mb-2">
                        <strong>Customer:</strong>
                        {{ order.customerName }}
                    </div>

                    <div class="mb-2">
                        <strong>Reservation Method:</strong>
                        {{ order.deliveryMethod }}
                    </div>

                    <div class="mb-3">
                        <strong>Status:</strong>
                        {{ order.status }}
                    </div>

                    <v-btn
                        color="orange"
                        @click="router.push(`/track/${order._id}`)"
                    >
                        View Reservation
                    </v-btn>

                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script setup lang="ts">
    const email = ref("")
    const orders = ref<TOrder[]>([])

    const router = useRouter()

    async function searchReservation() {
    const result = await $fetch<{
        items: TOrder[]
    }>("/api/order", {
        method: "GET",
        query: {
            email: email.value
        }
    })

    orders.value = result.items
}
</script>