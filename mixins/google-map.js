export default {
  methods: {
    mapsMarkerPosition (marker) {
      return {
        lat: marker.latitude,
        lng: marker.longitude
      }
    }
  }
}
