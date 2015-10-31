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

Load curve and [starting torque](startingTorque.html) of the pump depend on the pump's type. There exist numerous [types](type.html) of pumps. 
<br>

[Rated rotational speed of the pump's shaft](ratedSpeed.html) is given for any pump in respective  brochures or catalogues. 
<br>

Pump's power can be calculated from it's parameters [head](head.html) and [flow](flow.html) using also [density of pumped fluid](fluidDensity.html):
` 	P=(g * rho * h * q)/(3.6 * 10^6 * eta) ` ,

where ` P ` is in ` kW ` , ` g ` is gravity ( ` g = 9.81 m/s^2 ` ), ` rho ` is density of the [pumped fluid](fluidDensity.html) in ` (kg) / m^3 ` , ` eta ` is [efficiency](ratedEfficiency.html) of the pump,  ` h ` is [head](head.html) in ` m ` and [flow](flow.html) in ` m^3 / h  ` .

Full list of all parameters used in *Drive Constructor* for pumps:

* [Type](type.html)
* [Head](head.html)
* [Flow](flow.html)
* [Rated efficiency](ratedEfficiency.html)
* [Rated speed](ratedSpeed.html)
* [Pumped fluid](fluidDensity.html)
* [Starting torque as *T_rated](startingTorque.html)
