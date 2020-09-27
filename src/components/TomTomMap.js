import React, { Component, useCallback, useRef } from "react";
import config from "../config";

/**
 * This hook notifies when a map is loaded
 *
 * @export
 * @param {mapLoadedCallback} The callback that handles the event.
 * @returns {Array} [ref, setRef]
 */
export function useMapJustMounted(callback) {
  const ref = useRef(null);
  const mounted = useRef(false);
  const setRef = useCallback(
    node => {
      if (node !== null && !mounted.current) {
        callback(node);
      }
      mounted.current = true;
      // Save a reference to the node
      ref.current = node;
    },
    [callback]
  );
  return [ref, setRef];
}

/**
 * Represents a geographical point with a certain latitude and longitude.
 * @typedef {Object} LatLng
 * @property {number} lat - Latitude in degrees
 * @property {number} lon - Longitude in degrees
 */
class TomTomMap extends Component {
  componentDidMount() {
    this.markers = [];
    // Setting TomTom keys
    this.tomtom = window.tomtom;
    this.tomtom.key(config.tomTomKey);
    //Creating the map
    this.map = this.tomtom
      .map("map", {
        source: "raster",
        basePath: "https://api.tomtom.com/maps-sdk-js/4.47.6/examples/sdk"
      })
      .setView([28.6626206,-106.0861584], 14);
  }

  centerMap = (latLon, zoom) => {
    const { lat, lon } = latLon;
    this.map.setView([lat, lon], zoom);
  };

  getMarker = title => {
    this.markers.find(m => m.options.title === title);
  };

  /**
   *
   * @param {Object} options - Icon instance options to use for rendering the marker.
   * @param {Array} options.iconSize - [width, heigt]
   * @param {Array} options.iconAnchor - [width, heigt]
   * @param {string} options.iconUrl - (required) The URL to the icon image (absolute or relative to your script path).
   * @memberof TomTomMap
   */
  createIconInstance = options => {
    return this.tomtom.L.icon(options);
  };

  /**
   * Add a marker to the map
   * @param {Object} coords - The coordinates of the marker
   * @param {number} coords.lat - Latitude
   * @param {number} coords.lon - Longitude
   * @param {Object} markerOptions Marker options
   * @param {string} markerOptions.title Text for the browser tooltip that appear on marker hover (no tooltip by default).
   * @param {string} markerOptions.content The content to add to the Marker PopUp
   * @param {boolean} markerOptions.draggable [markerOptions.draggable=false] Whether the marker is draggable with mouse/touch or not.
   * @param {boolean} markerOptions.icon Icon instance to use for rendering the marker.
   * @returns {Object} The created marker object.
   * @memberof TomTomMap
   */
  addMarker = (coords, markerOptions) => {
    const { title, content } = markerOptions;

    const foundMarker = this.markers.findIndex(m => m.options.title === title);

    if (foundMarker > -1) {
      this.markers[foundMarker].setLatLng([coords.lat, coords.lon]);
      return this.markers[foundMarker];
    } else {
      const marker = this.tomtom.L.marker(
        [coords.lat, coords.lon],
        markerOptions
      ).addTo(this.map);
      if (title || content) {
        let contentString = `
        <div class="map-info">
          <h4>${title || ""}</h4>
          <p>${content || ""}</p>
        </div>
      `;
        marker.bindPopup(contentString).addTo(this.map);
      }
      this.markers.push(marker);
      return marker;
    }
  };

  /**
   * Sets a map view that contains the given geographical bounds with the maximum zoom level possible.
   *
   * @memberof TomTomMap
   * @param {LatLng[]} bounds
   */
  fitBounds = bounds => {
    this.map.fitBounds(bounds);
  };

  route = (coordinates, color = "#1890ff") => {
    this.tomtom
      .routing({
        traffic: false
      })
      .locations(coordinates)
      .go()
      .then(routeJson => {
        var route = this.tomtom.L.geoJson(routeJson, {
          onEachFeature: this.routeMarkers,
          style: { color, opacity: 0.9 }
        }).addTo(this.map);
        this.map.fitBounds(route.getBounds(), { padding: [5, 5] });
      });
  };

  render() {
    return <div id="map" style={{ height: 200, width: "100%" }}></div>;
  }
}

export default TomTomMap;