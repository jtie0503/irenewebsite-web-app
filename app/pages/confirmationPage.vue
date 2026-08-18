<template>
    <v-container class="py-10" style="max-width: 600px;">

        <v-row justify="center">

            <!-- SUCCESS -->
            <v-col cols="12" class="text-center mb-4">

                <v-icon
                    size="72"
                    color="green"
                >
                    mdi-check-circle
                </v-icon>

                <h1 class="text-h5 font-weight-bold mt-3">
                    Reservation Received! 🐶
                </h1>

                <p class="text-grey mt-2">
                    Thank you, {{ data.customerName }}!
                </p>

            </v-col>

            <!-- TRACK MESSAGE -->
            <v-col cols="12">

                <v-alert
                    type="info"
                    color="orange-darken-2"
                    variant="tonal"
                    icon="mdi-information"
                    class="mb-4"
                >
                    <strong>Track Your Reservation</strong>

                    <div class="mt-2">
                        You can check the current status of your
                        reservation anytime through our website
                        using the email address you provided.
                    </div>
                </v-alert>

            </v-col>

            <!-- RESERVATION SUMMARY -->
            <v-col cols="12">

                <v-card
                    rounded="xl"
                    elevation="3"
                    class="pa-5"
                >

                    <div class="text-h6 font-weight-bold mb-3">
                        🐶 Reservation Summary
                    </div>

                    <v-divider class="mb-4" />

                    <div class="mb-3">
                        <div class="text-caption text-grey">
                            Puppy
                        </div>

                        <div class="font-weight-bold">
                            {{ data.dog?.breed }}
                        </div>
                    </div>

                    <div class="mb-3">
                        <div class="text-caption text-grey">
                            Price
                        </div>

                        <div class="font-weight-bold text-orange-darken-2">
                            ₱{{ data.dog?.price }}
                        </div>
                    </div>

                    <div class="mb-3">
                        <div class="text-caption text-grey">
                            Reservation Method
                        </div>

                        <div>
                            {{ data.deliveryMethod }}
                        </div>
                    </div>

                    <div class="mb-3">
                        <div class="text-caption text-grey">
                            Customer Email
                        </div>

                        <div>
                            {{ data.email }}
                        </div>
                    </div>

                    <div>
                        <div class="text-caption text-grey">
                            Current Status
                        </div>

                        <v-chip
                            color="orange"
                            variant="tonal"
                            class="mt-1"
                        >
                            {{ data.status }}
                        </v-chip>
                    </div>

                </v-card>

            </v-col>

            <!-- BUTTONS -->
            <v-col
                cols="12"
                class="text-center mt-5"
            >

                <v-btn
                    block
                    size="large"
                    color="orange-darken-2"
                    rounded="pill"
                    @click="navigateTo('/track')"
                >
                    <v-icon
                        start
                        icon="mdi-magnify"
                    />
                    Track Your Reservation
                </v-btn>

                <v-btn
                    block
                    size="large"
                    variant="outlined"
                    rounded="pill"
                    class="mt-3"
                    @click="navigateTo('/')"
                >
                    <v-icon
                        start
                        icon="mdi-home"
                    />
                    Back to Home
                </v-btn>

            </v-col>

        </v-row>

    </v-container>
</template>

<script setup lang="ts">

const data = useState<any>("confirmationPage")

</script>