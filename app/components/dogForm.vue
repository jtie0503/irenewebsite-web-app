<template>
    <v-card width="100%">
        <v-toolbar>
            <v-row no-gutters  class="fill-height px-6" align="center">
                <span class="font-weight-bold text-h5">{{ title }}</span>
            </v-row>
        </v-toolbar>

        <v-card-text style="max-height:100vh;overflow: auto">
            <v-row v-if="mode ===  'view'" no-gutters>
                
                <v-col
                    v-for="(photo, index) in dogItem.photos"
                    :key="index"
                    cols="12"
                    class="mb-2"
                >
                    <v-img
                        :src="photo"
                        height="150"
                        cover
                    />
                </v-col>
                <v-col cols="12" class="mb-2" v-if="dogItem.video">
                    <video
                        :src="dogItem.video"
                        controls
                        width="100%"
                    />
                </v-col>
                <v-divider class="my-4" />

                <v-col cols="12" class="text-h6 font-weight-bold mb-3">
                    Basic Information:
                </v-col>
                   
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
                <v-col cols="6" class="mb-2">
                    <strong>Status: </strong>{{ dogItem.status }}
                </v-col>
                <v-divider class="my-4" />

                 <v-col cols="12" >
                    
                    <strong class="text-h6 font-weight-bold mb-3">Description:</strong>
                    {{ dogItem.description }}
                </v-col>

                <v-divider class="my-4" />

                <v-col cols="12" class="text-h6 font-weight-bold mb-3">
                    Other Information :
                </v-col>
                <v-col cols="6" class="mb-2">
                    <strong>Location:</strong> {{ dogItem.location }}
                </v-col>

                <v-col cols="6" class="mb-2">
                    <strong>Vaccinated:</strong> {{ dogItem.vaccinated  }}
                </v-col>

                <v-col cols="6" class="mb-2">
                    <strong>Dewormed:</strong> {{ dogItem.deworm }}
                </v-col>
            </v-row>

            <!--ADD/EDIT-->
            <v-form v-else v-model="isFormValid">
                <v-row no-gutters>
                    <v-col cols="12" class="mb-2">
                        <v-file-input
                           v-model="imageFile"
                            label="Dog image"
                             prepend-icon="mdi-camera" 
                        />
                    </v-col>
                    <v-col cols="12" class="mb-2">
                        <v-file-input
                           v-model="videoFile"
                            label="Dog Video"
                             prepend-icon="mdi-camera" 
                        />
                    </v-col>
                    <v-col cols="12" class="mb-2">
                        <v-text-field
                            v-model="dogItem.breed"
                            label="Breed"
                            :rules="[requiredRule]"
                        />
                    </v-col>
                    <v-col cols="6" class="mb-2">
                        <v-text-field
                            v-model="dogItem.age"
                            label="Age"
                            :rules="[requiredRule]"
                        />
                    </v-col>
                    <v-col cols="6" class="mb-2">
                        <v-select
                        v-model="dogItem.gender"
                        :items="genderItems"
                        item-title="label"
                        item-value="value"
                        label="Gender"
                        :rules="[requiredRule]"
                          />
                    </v-col>
                    <v-col cols="6" class="mb-2">
                        <v-text-field
                            v-model="dogItem.color"
                            label="Color"
                            :rules="[requiredRule]"
                        />
                    </v-col>
                     <v-col cols="6" class="mb-2">
                        <v-text-field
                            v-model="dogItem.price"
                            label="Price"
                            type="number"
                            :rules="[requiredRule]"
                        />
                    </v-col>
                     <v-col cols="6" class="mb-2">
                        <v-text-field
                            v-model="dogItem.description"
                            label="Description"
                            :rules="[requiredRule]"
                        />
                    </v-col>
                    <v-col cols="6" class="mb-2">
                        <v-text-field
                            v-model="dogItem.location"
                            label="Location"
                            :rules="[requiredRule]"
                        />
                    </v-col>
                    <v-col cols="6" class="mb-2">
                        <v-text-field
                            v-model="dogItem.vaccinated"
                            label="Vacinated"
                            :rules="[requiredRule]"
                        />
                    </v-col>
                    <v-col cols="6" class="mb-2">
                        <v-text-field
                            v-model="dogItem.deworm"
                            label="Deworm"
                            :rules="[requiredRule]"
                        />
                    </v-col>
                    <v-col cols="6" class="mb-2">
                        <v-select
                            v-model="dogItem.status"
                            :items="statusItems"
                            item-title="label"
                            item-value="value"
                            label="Status"
                            :rules="[requiredRule]"

                        />
                    </v-col>     
                </v-row>
            </v-form>
        </v-card-text>

        <v-toolbar density="compact">
            <!--VIEW MODE-->
            <template v-if="mode === 'view'">
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
             <template #activator="{ props }">
                    <v-btn
                        block
                        variant="flat"
                        class="text-none"
                        color="black"
                        v-bind="props"
                         size="48"
                    >
                        More Actions
                    </v-btn>
             </template>

                 <v-list>
                    <v-list-item @click="emits('edit')">
                        <v-list-item-title>Edit</v-list-item-title>
                    </v-list-item>

                   <v-list-item @click="emits('delete')">
                        <v-list-item-title>Delete</v-list-item-title>
                    </v-list-item>
                </v-list>
                </v-menu>
                </v-col>
              </v-row> 
            </template>

            <!--ADD MODE BUTTONS-->
            <template v-if ="mode === 'add'">
                <v-col cols="6">
                    <v-btn
                    block
                    variant="text"
                    class="text-none"
                    size="48"
                    @click="emits('cancel')"
                    >
                        Cancel
                    </v-btn>
                </v-col>

                <v-col cols="6">
                    <v-btn
                    block
                    variant="flat"
                    color="black"
                    size="48"
                    :disabled="!isFormValid"
                    @click="emits('submit:add')"
                    >
                        Submit
                    </v-btn>
                </v-col>
            </template>

             <!-- EDIT MODE buttons -->
           <template v-if="mode=== 'edit'">

           <v-row >
            <v-col cols="6">
                <v-btn
                tile
                block
                variant="text"
                class="text-none"
                 size="48"
                 @click="emits('cancel')"
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
                class="text-none"
                :disabled="!isFormValid"
                @click="emits('submit:update')"
                >
                   Save Changes
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
        default: "Dog Form"
    },
    mode:{
        type: String,
        default: "add"
    },
});

const emits = defineEmits([
    "edit",
    "delete",
    "submit:add",
    "submit:update",
    "cancel",
    "close"
]);

const { dogItem } = useDog();

const statusItems = [
    { label: "Available", value: "Available" },
    { label: "Reserved", value: "Reserved" },
    { label: "Sold", value: "Sold" },
]

const genderItems = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
]
const isFormValid = ref(false);
const requiredRule = (v: any) => !!v || "This field is required";

const imageFile = ref<File | null>(null)
const videoFile = ref<File | null>(null)

watch(imageFile, function(file){
    if(!file)return
    console.log(file)

    const reader = new FileReader();
    reader.readAsDataURL(file)

    reader.onload = async function (){

    try{

        const result = await $fetch<{url:string}>("/api/upload",{

            method:"POST",

            body:{
                file: reader.result
            }

        });

       dogItem.value.photos = [result.url]

    }catch(error){

        console.error(error)

    }

}
});

watch(videoFile, function(file){
    if(!file)return;
    console.log(file);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async function (){

    try{

        const result = await $fetch<{url:string}>("/api/upload",{

            method:"POST",

            body:{
                file: reader.result
            }

        });

        dogItem.value.video = result.url

    }catch(error){

        console.error(error)

    }

}
})

</script>