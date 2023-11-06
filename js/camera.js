class CameraInputHandler {

    constructor(viewer) {
        this.viewer = viewer;
        this.scene = viewer.scene;
        this.camera = viewer.camera;
        this.canvas = viewer.canvas;
        this.handler = new Cesium.ScreenSpaceEventHandler(this.canvas);

        this.startMousePosition;
        this.mousePosition;
        this.flags = {
            looking: false,
            moveForward: false,
            moveBackward: false,
            moveUp: false,
            moveDown: false,
            moveLeft: false,
            moveRight: false,
        };
    }

    setUp() {
        this.scene.screenSpaceCameraController.enableRotate = false;
        this.scene.screenSpaceCameraController.enableTranslate = false;
        this.scene.screenSpaceCameraController.enableZoom = false;
        this.scene.screenSpaceCameraController.enableTilt = false;
        this.scene.screenSpaceCameraController.enableLook = false;

        let canvas = this.viewer.canvas;

        canvas.setAttribute("tabindex", "0"); // needed to put focus on the canvas
        canvas.onclick = function () {
            canvas.focus();
        };
        this.handler.setInputAction((movement) => this.onMouseDown(movement), Cesium.ScreenSpaceEventType.LEFT_DOWN);
        this.handler.setInputAction((movement) => this.onMouseMove(movement), Cesium.ScreenSpaceEventType.MOUSE_MOVE);
        this.handler.setInputAction((movement) => this.onMouseUp(movement), Cesium.ScreenSpaceEventType.LEFT_UP);
        document.addEventListener(
            "keydown",
            (e) => this.onKeyDown(e),
            false
        );
        document.addEventListener(
            "keyup",
            (e) => this.onKeyUp(e),
            false
        );
    }

    onKeyUp(e) {
        const flagName = this.getFlagForKeyCode(e.keyCode);
        if (typeof flagName !== "undefined") {
            this.flags[flagName] = true;
        }
    }

    onKeyDown(e) {
        const flagName = this.getFlagForKeyCode(e.keyCode);
        if (typeof flagName !== "undefined") {
            this.flags[flagName] = true;
        }
    }

    onMouseUp() {
        this.flags.looking = false;
    }

    onMouseMove(movement) {
        this.mousePosition = movement.endPosition;
    }

    onMouseDown(movement) {
        this.flags.looking = true;
        this.mousePosition = this.startMousePosition = Cesium.Cartesian3.clone(
            movement.position
        );
    }

    firstPersonFixedCamera(clock) {
        let camera = this.camera;
        let flags = this.flags;
        if (this.flags.looking) {
            const width = this.canvas.clientWidth;
            const height = this.canvas.clientHeight;

            // Coordinate (0.0, 0.0) will be where the mouse was clicked.
            const x = (this.mousePosition.x - this.startMousePosition.x) / width;
            const y = -(this.mousePosition.y - this.startMousePosition.y) / height;

            const lookFactor = 0.05;
            this.camera.look(this.camera.position, x * lookFactor);
            this.camera.lookUp(y * lookFactor);
        }
    }

    enableFirstPersonFixedCamera() {
        this.viewer.clock.onTick.addEventListener(this.firstPersonFixedCamera, this);
    }
    disableFirstPersonFixedCamera() {
        this.viewer.clock.onTick.addEventListener(this.firstPersonFixedCamera, this);
    }

    getFlagForKeyCode(keyCode) {
        switch (keyCode) {
            case "W".charCodeAt(0):
                return "moveForward";
            case "S".charCodeAt(0):
                return "moveBackward";
            case "Q".charCodeAt(0):
                return "moveUp";
            case "E".charCodeAt(0):
                return "moveDown";
            case "D".charCodeAt(0):
                return "moveRight";
            case "A".charCodeAt(0):
                return "moveLeft";
            default:
                return undefined;
        }
    }
}
