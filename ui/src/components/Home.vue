<template>
  <div id="app" class="App">
    <Header></Header>
    <div class="flex flex-col items-center w-full my-16" v-if="rooms?.length > 0 && !isLoading">
      <div class="flex flex-row justify-between lg:w-2/3 md:w-full sm:w-full mx-8 ">
        <div>
          <label for="date">Meeting Date:</label>
          <datetime format="YYYY-MM-DD" v-model='date' width="100px"></datetime>
        </div>
        <div class="flex flex-row justify-between">
          <div class="flex flex-col">
            <label for="startPeriod">Start Period:</label>
            <datetime format="h:i" v-model='startPeriod'></datetime>
          </div>

          <div class="flex flex-col ml-8">
            <label for="endPeriod">End Period:</label>
            <datetime format="h:i" v-model='endPeriod'></datetime>
          </div>
        </div>

      </div>

      <div class="flex flex-row justify-between lg:w-2/3 md:w-full sm:w-full py-8">
        <div class="flex flex-col">
          <div class="flex flex-col">
            <label for="equipement">Equipement:</label>
            <dropdown :options="equipementList" :selected="equipement" v-on:updateOption="onSelectEquipement"
              :placeholder="'Select an Equipement'" :closeOnOutsideClick="true">
            </dropdown>
          </div>
          <!--print equipements-->
          <div class="flex flex-row flex-wrap ml-2">
            <div v-for="eq in equipements" :key="eq"
              class="px-2 py-2 text-xs font-medium leading-none text-center text-purple-400 bg-purple-100 rounded-full mr-2">
              <span class="pl-2">
                {{ eq }}
              </span>
              <button @click="removeEquipement(eq)"
                class="px-2 py-2 text-xs font-medium leading-none text-center text-purple-400 bg-purple-100 rounded-full mr-2">
                X
              </button>
            </div>
          </div>
        </div>

        <div class="flex flex-col">
          <label for="capacity">Capacity:</label>
          <dropdown class="" :options="capacityList" :selected="capacity" v-on:updateOption="onSelectCapacity"
            :placeholder="'Select a Capacity'" :closeOnOutsideClick="true">
          </dropdown>
        </div>

      </div>

      <div class="flex flex-row justify-end lg:w-2/3 md:w-full sm:w-full py-8">
        <button @click="getAvailableRooms()"
          class="py-2 px-8 rounded shadow-md flex items-center text-sm text-purple-400">Get Available Rooms</button>
      </div>
      <div class="flex flex-row justify-start lg:w-2/3 md:w-full sm:w-full ">
         <p class="text-red-400 text-md mt-4 mb-8"> {{ error }}</p>
        </div>



      <div v-for="room in rooms" :key="room._id" class="lg:w-2/3 md:w-full sm:w-full mx-8">
        <MeetingRoom :room="{
          id: room._id,
          name: room.name,
          description: room.description,
          capacity: room.capacity,
          equipements: room.equipements,
        }" :reservation="{
  date: date,
  startPeriod: toSeconds(startPeriod) || undefined,
  endPeriod: toSeconds(endPeriod) || undefined,
}" :getAvailableRooms="getAvailableRooms" :setError="setError" />
      </div>

    </div>
  </div>
</template>

<script>


import Header from './Header.vue'
import { getAvailableRooms } from '../services/RoomService'
import MeetingRoom from './MeetingRoom.vue'
import datetime from 'vuejs-datetimepicker';
import dropdown from 'vue-dropdowns';
import { capacityList, equipmentList } from '../datas/index'


export default {
  name: 'App',
  components: {
    Header,
    MeetingRoom,
    datetime,
    dropdown
  },
  data() {
    return {
      tasks: [],
      settings: false,
      rooms: [],
      isLoading: false,
      date: null,
      startPeriod: null,
      endPeriod: null,
      capacity: capacityList[0],
      capacityList: capacityList,
      equipementList: equipmentList,
      equipement: equipmentList[0],
      equipements: [],
      error: null
    }
  },
  methods: {
    toSeconds(timeStr) {
      if (timeStr) {
        const [hours, minutes] = `${timeStr}`.split(':').map(Number);
        return hours * 3600 + minutes * 60;
      } else {
        return null;
      }

    },
    getAvailableRooms() {
      console.log(`date: ${this.date} startPeriod: ${this.startPeriod} endPeriod: ${this.endPeriod} ${this.toSeconds(this.endPeriod)} capacity: ${this.capacity} equipements: ${this.equipements}`)
      this.isLoading = true;
      this.error = null;
      getAvailableRooms({
        date: this.date,
        startPeriod: this.toSeconds(this.startPeriod),
        endPeriod: this.toSeconds(this.endPeriod),
        capacity: Number(this.capacity.name),
        equipements: this.equipements
      }).then(response => {
        this.isLoading = false;
        this.rooms = response.rooms || [];
      })
    },
    init() {
      this.isLoading = true;
      getAvailableRooms({}).then(response => {
        this.isLoading = false;
        this.rooms = response.rooms || [];
      })
    },
    onSelectCapacity(payload) {
      this.capacity = payload;
    },
    onSelectEquipement(payload) {
      this.equipement = payload;
      this.equipements.push(payload.name);
    },
    removeEquipement(payload) {
      this.equipements = this.equipements.filter(equipement => equipement !== payload);
    },
    setError(payload) {
      this.error = payload;
    }
  },
  mounted() {
    this.init();
  }
}
</script>

<style>
@import '../assets/styles/global.css';
</style>
