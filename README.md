# Ecosystem Simulator

El ecosistema es el conjunto de especies de un área determinada que interactúan entre ellas y con su ambiente mediante procesos como la depredación, el parasitismo, la competencia y la simbiosis, y con su ambiente al desintegrarse y volver a ser parte del ciclo de energía y de nutrientes. 

La simulación que se realizará dentro de este proyecto estará definido por lo siguiente.
- Habrá dos tipos de organismos cohabitando en una misma area, el objetivo de estos organismos es sobrevivir a base de alimentación y reproducción, cada uno de estos organismos, así como su habitad, contará con diferentes caracteristicas las cuales se definirán adelante. 

- Las caracteristicas de que se puedan modificar estarán marcadas con un *

- Habitad:
	- *Tamaño: 100x100 
	- *Producción alimento: % Porcentaje de las casillas que produce alimento.
	- *Tiempo de restauración: Ticks que se tardará en reabastecer el alimento.
	
- Organismo A: 
	- Caracter: Amigable.
	- Alimentación: Alimento producido en el habitad.
	- *Tiempo sin alimento: Ticks que tarda sin alimento antes de morir.
	- *Apareamiento: Cantidad de alimento que necesita para aparear.
	- *Población Inicial: Número de individuos con los que se inicia la simulación.
	- *Desplazamiento: Número de casillas que se puede mover por tick.


- Organismo B: 
	- Caracter: Hostil.
	- Alimentación: Organismo A.
	- *Tiempo sin alimento: Ticks que tarda sin alimento antes de morir.
	- *Apareamiento: Cantidad de alimento que necesita para aparear.
	- *Población Inicial: Número de individuos con los que se inicia la simulación.
	- *Desplazamiento: Número de casillas que se puede mover por tick.

Esta simulación será guiada por el siguiente conjunto de reglas.
 - El habitad produce alimento para los organismos tipo A, este está delimitado por el procentaje de producción de alimento. Y este se "resurtira" en lis ticks que indiquen el tiempo de restauración.
 - Los organismos de tipo A se alimentan exclusivamente del alimento producido por el habitad.
 - El organismo de tipo B se alimenta unicamente de organismos tipo A.
 - Cuando cualquier organismo haya juntado suficientes stock de alimento podrá producir un nuevo organismo de su mismo tipo.
 - El desplazamiento indica el número de casillas que los organismos se pueden mover por tick.
 - La unica forma de consumir un alimento es si se encuentran en la misma casilla.
 - Una vez consumido el alimento desaparece del habitad.

Dentro del juego como controles generales se podran mostrar y ajustar lo siguiente:
 - Se mostrará la población de ambos individuos.
 - Se mostrará y podrá modificarse los ticks que se desean ver.

## Tecnologías

El proyecto seŕa realizado utilizando [react-three-fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction). EL cual funciona como React render de three.js.

## Referencias

Esta idea se basa en los siguientes proyectos ya existentes

1. [Simulating Natural Selection ](https://youtu.be/0ZGbIKd0XrM).
2. [Simulating an Ecosystem](https://youtu.be/r_It_X7v-1E).