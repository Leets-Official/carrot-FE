import React, { useEffect } from "react";

const { kakao } = window;

const MapContainer = ({ location }) => {
  useEffect(() => {
    // kakao.maps가 로드되지 않은 경우 예외 처리
    if (!kakao) {
      console.error("Kakao Maps API is not loaded properly.");
      return;
    }
    const container = document.getElementById("myMap");
    const options = {
      center: new kakao.maps.LatLng(35.12, 129.1),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);
    const geocoder = new kakao.maps.services.Geocoder();

    // 주소로 좌표 검색
    geocoder.addressSearch(location, function (result, status) {
      // 검색 성공
      if (status === kakao.maps.services.Status.OK) {
        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        // 위치 마커 표시
        var marker = new kakao.maps.Marker({
          map: map,
          position: coords,
        });
        marker.setMap(map);

        // 지도 중심을 결과값으로 받은 위치로 이동
        map.setCenter(coords);
      }
    });
  }, []);

  return (
    <div
      id="myMap"
      style={{
        width: "100%",
        height: "200px",
      }}
    ></div>
  );
};

export default MapContainer;
