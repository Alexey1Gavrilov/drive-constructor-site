---
layout: default
mathjax: true
---
# Pump

To select proper drive train for a pump we need to know four parameters:

* Required rated torque on shaft of the pump
* [Starting torque of the pump](startingTorque.html)
* [Rated rotational speed of the pump's shaft](ratedSpeed.html)
* Load curve of the pump
<br>

There exist numerous [types](type.html) of pumps. For us pump types defines first of load characteristics and [starting torque as *T_rated](startingTorque.html). We also require such pump parameters as [head](head.html) and [flow](flow.html).
<br>
Power on shaft of a pump can be calculated as
` 	P=(g * rho * h * q)/(3.6 * 10^6 * eta) ` ,

where ` P ` is in ` kW ` , ` g ` is gravity ( ` g = 9.81 m/s^2 ` ), ` rho ` is density of the [pumped fluid](fluidDensity.html) in ` (kg) / m^3 ` , ` eta ` is [efficiency](ratedEfficiency.html) of the pump,  ` h ` is [head](head.html) in ` m ` and [flow](flow.html) in ` m^3 / h  ` .

Full list of parameters of the pump used in *Drive Constructor*:

* [Type](type.html)
* [Head](head.html)
* [Flow](flow.html)
* [Rated efficiency](ratedEfficiency.html)
* [Rated speed](ratedSpeed.html)
* [Pumped fluid](fluidDensity.html)
* [Starting torque as *T_rated](startingTorque.html)
