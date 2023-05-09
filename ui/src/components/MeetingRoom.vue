<template>
    <div class="shadow-md p-4 mb-8 w-full">
        <div class="px-4 flex flex-row justify-between items-center">
            <h2 class="text-xl font-bold text-gray-700 dark:text-white pr-4">
                {{ room.name }}
            </h2>
            <h2 class="text-xl font-bold text-gray-700 dark:text-white pr-4">
                Capacity: {{ room.capacity }}
            </h2>
        </div>
        <div class="text-base">
            <p class="text-xs pb-4 px-4 text-gray-400 pt-4">
                {{ room.description }}
            </p>
        </div>
        <div>
            <p class="text-xs pb-4 px-4 font-semibold" v-if="room.equipements">
                Equipements:
            </p>
            <div class="text-xs pb-4 px-4 font-semibold" v-if="room.equipements">
            <div class="flex flex-row flex-wrap">
                <div v-for="equipement in room.equipements" :key="equipement[0].name"
                    class="px-2 py-2 text-xs font-medium leading-none text-center text-purple-400 bg-purple-100 rounded-full mr-2">
                    {{ equipement[0].name }}
                </div>
            </div>
            </div>
        </div>
        <div  class="flex flex-row justify-end w-full px-2 mb-4">
            <button @click="reserveRoom(room)" class="py-1 px-8 rounded bg-blue-400 text-white flex items-center">Reserve</button>
        </div>
    </div>
</template>


<script>
import { createReservation } from '../services/ReservationService.js';

export default {
    name: 'MeetingRoom',
    components: {},
    props: {
        room: {
            type: Object,
            default: () => []
        },
        reservation: {
            type: Object,
            default: () => []
        },
        getAvailableRooms: {
            type: Function,
            default: () => {}
        },
        setError: {
            type: Function,
            default: () => {}
        }
    },
    data() {
        return {
        }
    },
    mounted() {
        console.log("this.reservation", this.reservation)
    },
    methods: {
        reserveRoom(room) {
            console.log("this.reservation",{
                ...this.reservation,
                roomId: room.id
            })
           if(this.reservation?.date && this.reservation?.startPeriod && this.reservation?.endPeriod){
            createReservation({
                ...this.reservation,
                roomId: room.id
            }).then((res) => {
                this.getAvailableRooms()
                console.log("res", res)
            }).catch((err) => {
                this.setError(err)
                console.log("err", err)
            })
           }else{
                this.setError("Please select date and period and click on get available rooms button to reserve a room")
           }
        }
    }
};
</script>