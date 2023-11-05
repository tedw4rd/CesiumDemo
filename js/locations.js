class LocationManager {
    constructor(viewer) {
        this.viewer = viewer;
        this.scene = viewer.scene;
        this.camera = viewer.camera;
    }

    moveToHQ() {
        this.moveCameraTo(39.3741921782, -74.4038501158, -30.4427651257);
    }

    moveToWildwood() {
        this.moveCameraTo(38.98660243659862, -74.80413677420844, 0);
    }

    moveToStrathmere() {
        this.moveCameraTo(39.191560792143804, -74.65890747631624, 0);

    }

    moveToBarnegat() {
        this.moveCameraTo(39.76492045394645, -74.10630449111352, 52);

    }

    moveToRehoboth() {
        this.moveCameraTo(38.71561169267683, -75.07532487480769, 0);

    }

    moveToCapeMay() {
        this.moveCameraTo(38.93378596026879, -74.96051150922675, 48);

    }

    moveToOceanCasino() {
        this.moveCameraTo(39.36195067665054, -74.41442295170312, 219);
    }

    moveToSteelPier() {
        this.moveCameraTo(39.35630988848063, -74.41836932414267, 0);
    }


    moveCameraTo(lat, lon, height) {
        let heading = this.viewer.objectManager.calculateViewHeadingFrom(lat, lon);

        this.viewer.camera.setView({
            destination: Cesium.Cartesian3.fromDegrees(lon, lat, height, this.scene.globe.ellipsoid),

            orientation: {
                heading: heading,
                pitch: 0,
                roll: 0.0,
            },
        });
    }
}