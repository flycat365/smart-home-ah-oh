<template>
  <div class="device-details">
    <component :is="deviceComponent" :device="selectedDevice" @update-device="updateDevice"></component>
  </div>
</template>

<script>
import AirConditioner from '../components/device-details/AirConditioner.vue';
import LedDetails from '../components/device-details/LedDetails.vue';
import TvDetails from '../components/device-details/TvDetails.vue';

export default {
  components: {
    AirConditioner,
    LedDetails,
    TvDetails
  },
  props: {
    deviceId: {
      type: Number,
      required: true
    }
  },
  computed: {
    selectedDevice() {
      // Get device from parent component's demoDevices
      return this.$parent.demoDevices.find(
        device => device.id === this.deviceId
      );
    },
    deviceComponent() {
      switch (this.selectedDevice.type) {
        case 'aircon':
          return 'AirConditioner';
        case 'light':
          return 'LedDetails';
        case 'tv':
          return 'TvDetails';
        default:
          return null;
      }
    }
  },
  methods: {
    updateDevice(updatedDevice) {
      this.$emit('update-device', updatedDevice);
    }
  }
};
</script>

<style scoped>
.device-details {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 20px;
}
</style>



