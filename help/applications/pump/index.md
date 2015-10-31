---
layout: default
mathjax: true
---
# Pump

Power on shaft of a pump can be calculated as
` 	P=(g * rho * h * q)/(3.6 * 10^6 * eta) `

where ` P ` is in ` kW ` , ` g ` is gravity ( ` g = 9.81 m/s^2 ` ), ` rho ` is density of the [pumped fluid](fluidDensity.html) in ` (kg) / m^3 ` , ` eta ` is [efficiency](ratedEfficiency.html) of the pump, and ` h ` is [head](head.html) in ` m `.

Parameters of the pump used in *Drive Constructor*:

* [Type](type.html)
* [Head](head.html)
* [Flow](flow.html)
* [Rated efficiency](ratedEfficiency.html)
* [Rated speed](ratedSpeed.html)
* [Pumped fluid](fluidDensity.html)
* [Starting torque as *T_rated](startingTorque.html)
