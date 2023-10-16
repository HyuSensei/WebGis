var centerCoordinates = ol.proj.fromLonLat([105.7621, 21.0268]);
var zoomLevel = 15;

var mapView = new ol.View({
  center: centerCoordinates,
  zoom: zoomLevel,
});

var map = new ol.Map({
  target: "map",
  view: mapView,
});

var osmTitle = new ol.layer.Tile({
  title: "Open Street Map",
  visible: true,
  source: new ol.source.OSM(),
});

map.addLayer(osmTitle);

var totalMap = new ol.layer.Tile({
  title: "Xung quanh Đại Học Điện Lực",
  source: new ol.source.TileWMS({
    url: "http://localhost:8080/geoserver/Bus_Stop/wms",
    params: { LAYERS: "Bus_Stop:roads", TILED: true },
    serverType: "geoserver",
    visible: true,
  }),
});
map.addLayer(totalMap);

var busStop = new ol.layer.Tile({
  title: "Trạm xe bus xung quanh Đại Học Điện Lực",
  source: new ol.source.TileWMS({
    url: "http://localhost:8080/geoserver/Bus_Stop/wms",
    params: { LAYERS: "	Bus_Stop:bus_stop", TILED: true },
    serverType: "geoserver",
    visible: true,
  }),
});
map.addLayer(busStop);

var pointMap = new ol.layer.Tile({
  title: "Điểm xung quanh Đại Học Điện Lực",
  source: new ol.source.TileWMS({
    url: "http://localhost:8080/geoserver/Bus_Stop/wms",
    params: { LAYERS: "	Bus_Stop:points", TILED: true },
    serverType: "geoserver",
    visible: true,
  }),
});
map.addLayer(pointMap);

var layerSwitcher = new ol.control.LayerSwitcher({
  activationMode: "click",
  startActive: false,
  groupSelectStyle: "children",
});
map.addControl(layerSwitcher);

$(document).ready(function () {
  $("#search-input").on("input", function () {
    var searchValue = $(this).val();
    if (searchValue.trim() !== "") {
      console.log(searchValue);
      $.ajax({
        url: "./handle/live_search.php",
        method: "GET",
        data: { name: searchValue },
        success: function (response) {
          console.log("Res: ", response);
          displaySearchResults(response);
        },
        error: function (error) {
          console.error("Lỗi khi gửi yêu cầu tìm kiếm:", error);
        },
      });
    }
  });

  // var projection = new ol.proj.Projection({
  //   code: "EPSG: 3405",
  //   units: "m",
  //   axisOrientation: "neu",
  // });

  function displaySearchResults(results) {
    var searchResultsElement = $("#search-results");
    searchResultsElement.empty();
    if (results.length > 0) {
      var searchResults = JSON.parse(results);
      console.log("Data", searchResults);
      searchResults.forEach(function (result) {
        var resultItem = $("<div>").text(result.name);
        var viewButton = $("<button>").text("Xem ngay");
        resultItem.css({
          "margin-top": "20px",
          "margin-bottom": "20px",
          "margin-left": "10px",
        });
        viewButton.css({
          "margin-left": "20px",
        });
        viewButton.addClass("btn btn-success");
        viewButton.click(function () {
          var centerCoordinates = ol.proj.fromLonLat([
            result.longitude,
            result.latitude,
          ]);
          mapView.animate({
            center: centerCoordinates,
            duration: 2000,
            zoom: 20,
          });
        });
        resultItem.append(viewButton);
        searchResultsElement.append(resultItem);
        searchResultsElement.append(resultItem);
      });
    } else {
      var noResultsMessage = $("<div>").text("Không tìm thấy kết quả");
      searchResultsElement.append(noResultsMessage);
    }
  }
});

document
  .getElementById("clear-input-button")
  .addEventListener("click", function () {
    document.getElementById("search-input").value = "";
  });
