<template>
    <v-app>
        <v-main>
            <v-row  no-gutters class="fill-height pa-8" justify="center" align-content="center">
                <v-col cols="12" lg="3" md="4" sm="6">
                    <v-form v-model="isValid"  @submit.prevent="handleLogin">
                        <v-row no-gutters>

                             <v-col cols="12" class="text-center mb-6">
                                <h1 class="text-h4 font-weight-bold">🐶 Emman's Pet Shop</h1>
                                <p class="text-grey">Admin Panel</p>
                            </v-col>

                            <v-col cols="12" class="mb-2">
                                <v-text-field
                                    label="Email"
                                    variant="outlined"
                                     type="password"
                                     :rules="[requiredRule]"
                                    v-model="email"
                                />
                            </v-col>

                             <v-col cols="12" class="mb-2">
                                <v-text-field
                                    label="Password"
                                    variant="outlined"
                                     :rules="[requiredRule]"
                                    v-model="password"
                                />
                            </v-col>

                              <v-col cols="12" class="text-center text-red mb-2" v-if="message">
                                {{ message }}
                             </v-col>

                             <v-col cols="12">
                                <v-btn
                                    block
                                    type="submit"
                                    color="amber-darken-2"
                                    variant="flat"
                                    size="large"
                                    :disabled="!isValid"
                                    :loading="loading"
                                >
                                    LogIn
                                </v-btn>
                             </v-col>
                        </v-row>
                    </v-form>
                </v-col>
            </v-row>
        </v-main>
    </v-app>
</template>
<script setup lang="ts">

const email = ref()
const password = ref()
const message = ref()
const isValid = ref(false);
const loading = ref(false);

const requiredRule = (v: any) => !!v || "This field is required";

async function handleLogin(){
    loading.value = true;
    message.value = ""

    try {
        const result = await $fetch("/api/auth/logIn",{
            method:"POST",
            body: { email: email.value, password:password.value}
        });

        const token = useCookie("adminToken");
        token.value = (result as any).token;
        await navigateTo("/admin")
    } catch (error) {
        message.value = "Invalid Email or Password"
    }finally{
        loading.value= false
    }
}

</script>