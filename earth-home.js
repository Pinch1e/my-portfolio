document.addEventListener("DOMContentLoaded", () => {
    const nav = document.querySelector(".navigation");
    const menuButton = document.querySelector(".menu-toggle");

    menuButton?.addEventListener("click", () => {
        nav.classList.toggle("open");
        menuButton.setAttribute(
            "aria-expanded",
            String(nav.classList.contains("open"))
        );
    });

    const globeElement = document.getElementById("globeViz");

    if (typeof Globe !== "function" || !globeElement) {
        globeElement.innerHTML =
            '<p style="color:#8995a5;text-align:center;padding:40px">The globe could not be loaded. Check your internet connection.</p>';
        return;
    }

    const locations = [
        {
            name: "FRANKFURT",
            detail: "50.1109° N · 8.6821° E",
            lat: 50.1109,
            lng: 8.6821,
            size: 0.55
        },
        {
            name: "LAGOS",
            detail: "6.5244° N · 3.3792° E",
            lat: 6.5244,
            lng: 3.3792,
            size: 0.45
        },
        {
            name: "NEW YORK",
            detail: "40.7128° N · 74.0060° W",
            lat: 40.7128,
            lng: -74.0060,
            size: 0.45
        }
    ];

    const connections = [
        {
            startLat: 50.1109, startLng: 8.6821,
            endLat: 6.5244, endLng: 3.3792
        },
        {
            startLat: 50.1109, startLng: 8.6821,
            endLat: 40.7128, endLng: -74.0060
        },
        {
            startLat: 6.5244, startLng: 3.3792,
            endLat: 40.7128, endLng: -74.0060
        }
    ];

    const globe = Globe()(globeElement)
        .globeImageUrl(
            "https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        )
        .bumpImageUrl(
            "https://unpkg.com/three-globe/example/img/earth-topology.png"
        )
        .backgroundColor("rgba(0,0,0,0)")
        .showAtmosphere(true)
        .atmosphereColor("#62d9c4")
        .atmosphereAltitude(0.18)
        .pointsData(locations)
        .pointLat("lat")
        .pointLng("lng")
        .pointAltitude(0.025)
        .pointRadius("size")
        .pointColor(() => "#7ddfc7")
        .pointLabel("name")
        .arcsData(connections)
        .arcStartLat("startLat")
        .arcStartLng("startLng")
        .arcEndLat("endLat")
        .arcEndLng("endLng")
        .arcColor(() => ["rgba(125,223,199,.8)", "rgba(125,223,199,.08)"])
        .arcDashLength(0.35)
        .arcDashGap(0.12)
        .arcDashAnimateTime(3500)
        .arcStroke(0.45)
        .onPointClick((point) => {
            document.getElementById("placeName").textContent = point.name;
            document.getElementById("placeDetail").textContent = point.detail;
            globe.pointOfView(
                { lat: point.lat, lng: point.lng, altitude: 1.8 },
                1200
            );
        });

    globe.pointOfView(
        { lat: 25, lng: 15, altitude: 2.5 },
        0
    );

    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 0.35;
    globe.controls().enableDamping = true;

    const resizeObserver = new ResizeObserver(() => {
        globe.width(globeElement.clientWidth);
        globe.height(globeElement.clientHeight);
    });

    resizeObserver.observe(globeElement);
});
