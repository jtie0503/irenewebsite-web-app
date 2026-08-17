<template>
  <v-app>
   <v-app-bar height="120" color="#EEE9FF">
      <!--For Mobile-->
      <v-app-bar-nav-icon
        v-if="smAndDown"
        @click="drawer= !drawer"
      />

      <v-app-bar-title>
        <img src="/emmanlogo.png.png" alt="logo" height="120"/>
      </v-app-bar-title>

      <template v-if="mdAndUp"  >
          <v-btn variant="text"  @click="scrollTo('home')">Home</v-btn>
          <v-btn variant="text" @click="scrollTo('dog')">Dogs</v-btn>
          <v-btn variant="text" @click="scrollTo('about')">About</v-btn>
          <v-btn variant="text" @click="scrollTo('contact')">Contact Us</v-btn>
          <v-btn variant="text" @click="router.push('/track')">
            Track Your Reservation
          </v-btn>
      </template>
   </v-app-bar>
    
    <!--mobile-->
  <v-navigation-drawer v-model="drawer" temporary >
        <v-list >
            <v-list-item title="Home" @click="scrollTo('home'); drawer = false" />
            <v-list-item title="Dogs" @click="scrollTo('dog'); drawer = false" />
            <v-list-item title="About" @click="scrollTo('about'); drawer = false" />
            <v-list-item title="Contact Us" @click="scrollTo('contact'); drawer = false" />
            <v-list-item
              title="Track Your Reservation"
              @click="router.push('/track'); drawer = false"
            />
        </v-list>
    </v-navigation-drawer>

     <v-main>
        <v-img
          src="/emman-bg.png.png"
          id="home"
          cover
          :height="mdAndUp ? 650 : 280"        
        >
         
              <v-row 
                class="fill-height"
                 :justify="mdAndUp ? 'start' : 'center'"
                align="center"
                >
                <v-col
                cols="12"
                md="5"
                lg="4"
                 :class="mdAndUp ? 'text-left pl-md-16' : 'text-left pl-4 pr-10'"
                    >
                 <h1
                   :class="mdAndUp
                  ? 'text-h3 font-weight-bold text-white'
                  : 'text-h5 font-weight-bold text-white'"
                   mb-4
                       > 
                         Healthy & Happy Puppies</h1>
                    <p
                        :class="mdAndUp
                        ? 'text-body-1 text-white mt-4'
                        : 'text-body-2 text-white mt-3 pr-8'"
                      >
                    Browse our healthy and adorable puppies, ready to become part of your family.
                    </p>
                  <v-row no-gutters>
                    <v-col cols="6">
                      <v-btn
                        color="orange-darken-2"
                        rounded="xl"
                        class="mt-4"
                        :width="mdAndUp ? 280 : 200"
                         @click="scrollTo('dog')"
                      >
                      <strong class="text-white">View Puppies</strong>
                    </v-btn>
                    </v-col>
                   
                  </v-row>
                </v-col>        
              </v-row>
        </v-img>

        <!--Dog-->
        <v-container id="dog">
          <!--Section-->
          
            <v-row justify="center" align="center" class="mb-2">    
              <v-col cols="12" class="text-center">
                <h2 class="text-h5 text-md-h4 font-weight-bold">Our Puppies</h2>
                <p class="text-grey">Meet our lovable puppies waiting to become part of your family.</p>
              </v-col>
            </v-row>

            <v-divider class="mb-6" />
          
            <v-row justify="center">
              
                <v-col
                  v-for="dog in dogs"
                  :key="dog._id"
                  cols="12"
                  sm="6"
                  md="4"
                  lg="3"
                  class="d-flex justify-center"
                >
           
                  <v-card rounded="xl" elevation="2" class="pa-4">
                      
                       <!-- Status Badge -->
                     <v-chip
                      :color="
                        dog.status ==='Available'
                        ? 'green'
                        :dog.status === 'Reserved'
                        ?'orange':'red'
                      "
                      size="default"
                      rounded="pill"
                      variant="flat"
                      class="text-white"
                       style="top: -10px; left: -10px;"
                       :style="
                            dog.status === 'Sold' ? 'opacity:0.5': ''
                       "
                    >
                     {{ dog.status }}
                    </v-chip>
                      <v-img
                        :src="dog.photos[0]"
                        height="200"
                        cover
                        class="rounded-lg mx-auto "
                        align="center"
                        justify="center
                        "
                      ></v-img>

                      
                  <v-card-title 
                    class="text-h6 font-weight-bold mt-2 text-center"
                    style="white-space: normal; word-break: break-word; min-height: 48px;"
                  >
                    {{ dog.breed }}
                  </v-card-title>

                  <v-card-subtitle 
                    class="pa-0 mb-2 text-caption text-grey text-center"
                   >
                    {{ dog.gender }}  •  {{ dog.age }}
                  </v-card-subtitle>

                    <p class="text-h6 font-weight-bold text-amber-darken-2 mb-3 text-center">
                      ₱{{ dog.price }}
                    </p>

                    <v-btn
                      block
                      variant="flat"
                      color="orange"
                     @click="viewDetails(dog._id!)">
                    
                      View Details
                    </v-btn>

                    </v-card>
             
                    
            </v-col>
          </v-row>
       

        </v-container>

        <!--About-->
        <v-container id="about">
          <v-row no-gutters>

          </v-row>
        </v-container>
    </v-main>
  </v-app>
</template>
<script setup lang="ts">

function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) {
        const offset = 120; // navbar height mo
        const top = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
    }
}
const { smAndDown, mdAndUp } = useDisplay();
const drawer = ref(false);
const dogs = ref<TDog[]>([]);
const { getAll } = useDog()

const {  data} = await useLazyAsyncData("customer-dog", function(){
  return getAll({
    limit:100
  })
})

watchEffect(() => {
  console.log("data", data.value)

  if (data.value) {
    console.log("items", data.value.items)

    dogs.value = data.value.items

    console.log("dogs", dogs.value)
  }
})

const router =useRouter()

function viewDetails(id:string){
  router.push(`/dog/${id}`)
}
  
</script>