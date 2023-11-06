class ObjectManager {
    constructor(viewer) {
        this.viewer = viewer;
        this.scene = viewer.scene;
        this.camera = viewer.camera;
        this.canvas = viewer.canvas;
    }

    async loadObjects() {
        const buildingTileset = await Cesium.createOsmBuildingsAsync();
        this.viewer.scene.primitives.add(buildingTileset);
        this.viewer.scene.primitives.add(await Cesium.Cesium3DTileset.fromIonAssetId(2341024));
        this.viewer.scene.primitives.add(await Cesium.Cesium3DTileset.fromIonAssetId(2341103));

        this.arrayCenterLat = 0;
        this.arrayCenterLon = 0;
        let self = this;
        let results = await new Promise(function (resolve, reject) {
            Papa.parse("assets/turbines.csv", {
                download: true,
                header: true,
                dynamicTyping: true,
                complete: resolve
            });
        })
        let data = results.data;
        for (let i = 0; i < data.length; i++) {
            let turbine = data[i];
            let lat = turbine.LatDeg + turbine.LatMin/60 + turbine.LatSec/3600;
            let long = -(turbine.LonDeg + turbine.LonMin/60 + turbine.LonSec/3600);
            self.arrayCenterLat += lat;
            self.arrayCenterLon += long;
            self.viewer.entities.add({
                name: turbine.ID,
                position: Cesium.Cartesian3.fromDegrees(long, lat, -turbine.Depth),
                model: {
                    uri: "assets/Turbine.glb",
                    scale: 276
                },
            });
        }
        self.arrayCenterLat /= data.length;
        self.arrayCenterLon /= data.length;

        this.viewer.clock.onTick.addEventListener(function (clock) {
            let sunrise = 84600;
            let sunset = 36000;
            let time = clock.currentTime.secondsOfDay;
            if (time > sunrise+3600 || time < sunset-3600) {// black sky between 6AM and 8PM
                self.scene.skyAtmosphere.brightnessShift = 0;
            }
            else if (time > sunset && time < sunrise) { // black sky between 7AM and 7PM
                self.scene.skyAtmosphere.brightnessShift = -1;
            }
            else if (time > sunrise && time < sunrise+3600) { // sunset 36000
                let t = (time - sunrise) / 3600;
                self.scene.skyAtmosphere.brightnessShift = -1 + t;
            }
            else if (time > sunset-3600 && time < sunset) { // sunrise 82840
                let t = (time - (sunset-3600)) / 3600;
                self.scene.skyAtmosphere.brightnessShift = -t;
            }
        });
    }

    calculateViewHeadingFrom(lat, lon) {
        let dLat = this.arrayCenterLat- lat;
        let dLon = this.arrayCenterLon- lon ;
        return Math.atan2(dLon, dLat);
    }
}