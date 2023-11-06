## Run
Visit https://tedw4rd.github.io/CesiumDemo

## Background
This project is a demo of a potential use for Cesium.js.

The government of New Jersey is currently planning a series of offshore wind farms as part of its commitment to renewable energy. The Murphy administration has made significant efforts to generate public support for these projects. One of the major challenges to this has been the idea that offshore wind farms would "hurt" the visual beauty of the NJ coastline, and would generally be an eyesore. This demo could be included as part of a pitch to the Murphy administration to use Cesium's technology in a publicly available "wind farm visualizer". This visualizer could be used by the administration to help communicate to the public exactly what the wind farm might look like, and help dispel some of the myths surrounding its visual impact.

The visualizer currently loads and places windmill models according to the proposed locations available on the NJ government's website. Then, it allows the user to select different locations along the Jersey Shore from which to view the proposed wind farm. It also allows the user to view the farm from one of its substations, and from the proposed "NJ Wind HQ", which would be an educational center/museum just outside of Atlantic City (ed. note: the NJ Wind HQ idea is entirely my own and something I included to demonstrate mesh placement with Cesium Ion).

With additional time, I would have liked to improve the UI and added some explanation text, as if the user was in the museum itself. I would have also added a fly-by mode, where the user could fly around the farm in a helicopter, or maneuvered through the farm in a boat. As part of the "museum" experience, I'd also like to add visual data about the potential environmental impact of the farms, including maps of [NJ fisheries](https://www.arcgis.com/apps/mapviewer/index.html?layers=df7de8c132a749d680ae415b30322fc8) and bird migrations. 

The demo was created in 4 hours on a Saturday morning, with an extra half hour's worth of tweaks the following Monday. Prior to creating this, I hadn't really touched javascript since 2014, just as ES6 was being developed. 

## Resources
 - Windmill model: https://www.turbosquid.com/3d-models/free-blend-mode-windmill-wind-turbine/624358
 - New Jersey Wind HQ model: https://www.turbosquid.com/3d-models/suzhou-museum-entrance-hall-by-im-pei-3d-2107494
 - Offshore Substation A model: https://sketchfab.com/3d-models/offshore-platform-570826bf19a14a28a1b44046ab5931f8
 - turbines.csv dataset adapted from: https://www.boem.gov/sites/default/files/documents/renewable-energy/state-activities/OCW01_COP_Volume%20III_Appendix%20G_20230518.pdf