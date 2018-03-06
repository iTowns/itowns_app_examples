/**
 * This file is the entrypoint for webpack
 * See webpack.config.js
 */
import * as itowns from 'itowns';
// THREE is a peer dependency, you can access it directly like so
import { CylinderGeometry, Mesh, MeshBasicMaterial, Vector3 } from 'three';
// these are some layer configuration examples
// Please note that you can only use these layers locally without an api key.
import ortho from 'itowns/examples/layers/JSONLayers/Ortho.json';
import worldDtm from 'itowns/examples/layers/JSONLayers/WORLD_DTM.json';

var positionOnGlobe = { longitude: 2.351323, latitude: 48.856712, altitude: 25000000 };

var viewerDiv = document.getElementById('viewerDiv');
var globeView = new itowns.GlobeView(viewerDiv, positionOnGlobe);

globeView.addLayer(ortho);
globeView.addLayer(worldDtm).then(function () {
    // creation of a THREE mesh (a cylinder)
    var cylinderHeight = 600000;
    var geometry = new CylinderGeometry(0, 100000, cylinderHeight, 8);
    var material = new MeshBasicMaterial({ color: 0xff0000 });
    var mesh = new Mesh(geometry, material);

    // get the position on the globe, from the camera
    var cameraTargetPosition = globeView.controls.getCameraTargetGeoPosition();

    // position of the mesh
    var meshCoord = cameraTargetPosition;
    meshCoord.setAltitude(cameraTargetPosition.altitude() + cylinderHeight * 0.5);

    // position and orientation of the mesh
    mesh.position.copy(meshCoord.as(globeView.referenceCrs).xyz());
    mesh.lookAt(new Vector3(0, 0, 0));
    mesh.rotateX(Math.PI / 2);

    // update coordinate of the mesh
    mesh.updateMatrixWorld();

    // add the mesh to the scene
    globeView.scene.add(mesh);
    globeView.controls.setTilt(60, true);
});
