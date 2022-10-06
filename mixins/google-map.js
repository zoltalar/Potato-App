export default {
  methods: {
    mapsInfoWindow (marker, i) {
      this.map.infoWindow.position = this.mapsMarkerPosition(marker)
      this.map.infoWindow.options.content = '<strong>' + marker.addressable.name + '</strong>'
      if (this.map.index === i) {
        this.map.infoWindow.open = ! this.map.infoWindow.open
      } else {
        this.map.infoWindow.open = true
        this.map.index = i
      }
    },
    mapsMarkerPosition (marker) {
      return {
        lat: marker.latitude,
        lng: marker.longitude
      }
    }
  }
}
