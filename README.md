[![Coverage Status](https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct07-menu-datamodel-grupo-e/badge.svg?branch=master)](https://coveralls.io/github/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct07-menu-datamodel-grupo-e?branch=master)
[![Tests](https://github.com/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct07-menu-datamodel-grupo-e/actions/workflows/node.js.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct07-menu-datamodel-grupo-e/actions/workflows/node.js.yml)
# [**Ver en Github**](https://github.com/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct07-menu-datamodel-grupo-e)

# Informe Práctica 7
# Modelo de datos de un sistema que permite el diseño de menús

## **Objetivos**
* Desarrollar un modelo de datos con programación orientada a objetos.
* Aprender a utilizar los módulos `Inquierer.js` y `Lowdb`.
* Emplear los *issues* de *Github* en el repositorio para dudas, tareas..
* Incluir la documentación al proyecto mediante *TypeDoc*.
* Adoptar una metodología de desarrollo dirigido por pruebas.
* Utilizar una herramienta de cubrimiento de código en el proyecto, como *Coveralls*.
* Utilizar y comprobar *Github Workflows*. 
* Tratar de respetar los principios SOLID de diseño orientado a objetos.

## **Introducción**
En esta práctica tenemos que desarrollar el modelo de datos que permite el diseño de un sistema de menús, para ello
explicaremos la estructura y la solución adoptada desglosada en varios apartados.

## **[Foods](src/Food/)**
Consideramos un alimento dentro del sistema de menú, disponemos de una clase `BasicFood`, y una serie de subclases
que la extienden, solo modifican el comportamiento de la clase abstracta en la información.
### **BasicFood**
* Los atributos consisten en `name`, nombre del alimento, `origin`, origen o país del alimento, `priceByKg`, precio del alimento en euros,
  y `macronutrients`, objeto de la clase `Ingredient`.
* Los atributos son `protected` para que las clases descendientes puedan acceder a ellos sin tener que recurrir a getters y setters.
* Íbamos a incluir un `ammount` en la clase pero decidimos crear una nueva clase llamada `Ingredient` que se encargue de almacenar un alimento y su cantidad a utilizar, a modo de intermediaria entre los alimentos y el plato.
* Dispone de una serie de Getters para los artibutos `name`, `origin`, `priceByKg` y `Macronutrients` así como sus respectivos setters.
* También dispone de un método que obtiene la información del alimento

#### **Cereal, Fruit, Rich_Protein_Food y Vegetable**
* Las clases `Cereal`,`Fruits`,`Rich_Protein_Foods` y `Vegetable` disponen de los mismos atributos.
* El método `get_info()` es diferente en cada uno de ellos.

## **[Plates](src/Plate/)**
Consideramos que un plato representa a un conjunto de alimentos, y existen distintos tipos de platos, para abordarlos, seguimos la mimsa estructura
que en *Food*, disponemos de una clase abstracta **Basic Plate** y de ella derivan **Starter Plate**, **First Plate**, **Second Plate** y **Dessert**.

### **Basic Plate**
* Dispone de una serie de aributos internos, también protegidos para garantizar el acceso por las subclases, `nutritionalComposition`, que es un
  objeto de la clase `Macronutrients`, `name`, que es simplemente un nombre, y un vector de alimentos, `ingredients`.
* Desde el constructor se hace una llamada a un método privado `CalculateNutritionalComposition`, que como su nombre indica, es el que calcula la
  composición nutricional, es decir, en cada uno de los ingredientes que conforman a un plato en sí.
* Un método de la clase que es importante, es `addIngredient`, que permite añadir un ingrediente a un plato en específico, internamente al atributo
  que conforma el vector de alimentos.
* Dispone de una serie de Getters que acceden a los atributos `name`, `nutritionalComposition` e `ingredients`.
* Como requisitos del sistema de menú, tenemos un método que calcula el grupo de alimento predominante, `getPredominantFoodGroup`, en base a los 
  ingredientes y sus tipos, aprovechándose de el tipo de dato que comentamos anteriormente, también tenemos otro método que calcula el precio, `getPrice`,
  total de los ingredientes.

### **Starter_Plate, First_Plate, Second_Plate y Desser**
* Las clases `Starter_Plate`, `First_Plate`, `Second_Plate` y `Dessert`, disponen de los mismos atributos.
* El método `getType()` es diferente en cada uno de ellos, es el único método abstracto en `BasicPlate()`, y tiene que ser 
  implementado en cada una de las subclases, y para ello se basa en un objeto que reporta el tipo(como string), en la clase `BasicPlate()`.


## **[Menu](src/Menu/)**
La clase `Menu` interactúa directamente con `Plate`, ya que se basa en un conjunto de objetos de ese tipo, representados como un vector.
Cada objeto de la clase `Menu` se identifica con un atributo `name`, y con dicho vector, así como un método que lo obtiene y lo retorna, `getNameofMenu()`

* Dispone de una serie de métodos que obtienen los distintos tipos de plato, y uno más general, `getPlates()`, qe obtiene todos los tipos.
* `getPrice()` obtiene el precio total, del conjunto de platos en cuestión, y también nos encontramos con `getNutritionalComposition()`, que devuelve 
un objeto de tipo `Macronutrients`.
* Como requisito de la práctica se pide que no puede haber más de 4 platos, o tiene que haber por lo menos 3 platos y que sean de cada tipo, `platesAreValid()`
  cumple con ese cometido.
* También contamos con métodos que eliminan un plato, `removePlate()`, y añaden otro, `addPlate()`.
* Por último, necesitamos listar los grupos de alimentos del plato, con `listFoodGroup()`.
## **[Carta](src/Carta/)**
La clase `Carta` es otro de los elementos más importante en el modelo de datos que estamos diseñando, una carta representa a un conjunto de
menús, que bien podrían ser prediseñados por el propio restaurante, o también, sería posible contar con una serie de platos individuales y que el
cliente pudiera elegir entre alguno de ellos y complementarlo con añgún otro plato, formando un menú personalizado.

* La clase `Carta` dispone de tres atributos, un identificador, `nombre`, un conjunto de menús, `menus`, que en sí es un vector, y `singlePlates`, que
  constituye un conjunto de platos individuales, es decir un objeto de la clase `BasicPlate[]`.
* Todos los atributos consideremos que deben ser privados.
* Tenemos tres métodos, `getName()`, `getMenus()` y `getAllPlates()`, que funcionan como *getters* para obtener el nombre, el menú y los platos 
  individuales.
* Como aclaración, `getAllPlates()` añade los platos individuales al menú internamente.

## **[Comanda](src/Command/)**
* **Command**
* **Command_order**

## **[Stock](src/Stock/)**
* **Stock**
* **jsonObjects**

## **[Stock editor](src/StockEditor/)**

## **[Parser](src/Parser/)**

## **[App](src/App/)**





## **Conclusiones**