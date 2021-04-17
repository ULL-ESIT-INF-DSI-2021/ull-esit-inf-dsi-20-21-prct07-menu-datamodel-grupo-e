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
* Dispone de una serie de Getters para los atributos `name`, `origin`, `priceByKg` y `Macronutrients` así como sus respectivos setters.
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
cliente pudiera elegir entre alguno de ellos y complementarlo con algún otro plato, formando un menú personalizado.

* La clase `Carta` dispone de tres atributos, un identificador, `nombre`, un conjunto de menús, `menus`, que en sí es un vector, y `singlePlates`, que
  constituye un conjunto de platos individuales, es decir un objeto de la clase `BasicPlate[]`.
* Todos los atributos consideremos que deben ser privados.
* Tenemos tres métodos, `getName()`, `getMenus()` y `getAllPlates()`, que funcionan como *getters* para obtener el nombre, el menú y los platos 
  individuales.
* Como aclaración, `getAllPlates()` añade los platos individuales al menú internamente.

## **[Comanda](src/Command/)**
La clase **comanda** tiene como función principal almacenar una comanda individual por cada cliente nuevo del restaurante. Para conseguir el funcionamiento requerido se ha definido una clase dos clases:  
* **Command_order**
  Esta clase `command_order` tiene como objetivo el establecer la cantidad de un plato un un menu que desee el cliente, para ello mediante su constructor se inicializan sus atributos privados `order: BasicPlate | menu` y `quantity: number`, mediante los cuales podremos establecer las cantidades de un determinado plato o de un menu. Además esta clase cuanta con sus getters para acceder a los atributos nombrados anteriormente desde la clase `command`.  
* **Command**
  Esta clase `command` es la encargada de gestionar un conjunto de comandas individuales, para ello su constructor inicializa un `private orders: commandorders[]` en donde se almacenará cada una de las comandas individuales.  
  Además de disponer de los getters para obtener los platos de cada comanda o los menús, también dispone de un método para agregar una nueva comanda `addOrders(newOrder: command_order)`.

## **[Stock](src/Stock/)**
Esta clase es la encargada de interactuar con la base de datos, representando de esta manera el stock de productos del que dispondrá nuestro restaurante. Para su desarrollo se ha creado una clase `stock`, esta cuenta con un atributo para almacenar comida, platos, menús y cartas además de una base de datos `database: lowdb.LowdbSync<StockScheme>` y un `parse: Parser`. Mediante el constructor de esta clase se inicializa la base de datos mediante el uso de un método auxiliar `setDatabase(databaseName: string)` el cual hace uso del módulo lowdb para inicializar la base de datos con un determinado nombre y cargar en ella los datos correspondientes a los diversos productos.

Por cada tipo de producto, es decir, Food, Plate, Menu y Carta se han desarrollado los siguientes métodos necesarios para interactuar con la base de datos(Es en este punto donde se ha hecho uso de **Lowdb**): 
  * `loadTipoProducto()` --> Método encargado de cargar en la base de datos los productos.
  * `getTipoProducto()` --> Getter para obtener lo que hay de ese tipo de producto en la base de datos.
  * `searchTipoProductoByname(name: string)` --> Buscar un producto en la base de datos por su nombre.
  * `deleteTipoProducto(TipoProductoName: string)` --> Eliminar de la base de datos un determinado producto.
  * `addTipoProducto(newTipoProducto: TipoProducto)` --> Añadir un producto.
  * `storeTipoProducto()`

**JsonObjects**  
  Fichero que almacena los diversos tipos de datos de tipo JSON que será capaz de almacenar la base de datos. Un tipo de objeto sería el siguiente: 
  ```typescript
  export type JsonFood = {
    name: string,
    origin: string,
    price :number,
    macronutrients :Macronutrients,
    type :FoodGroup
  };
  ```

## **[Stock editor](src/StockEditor/)**
Esta clase `stockEditor` será la encargada de modificar la base de datos del stock del restaurante mediante el uso del módulo `inquirer`.  
Para ello se ha desarrollado dicha clase, la cual mediante su constructor recibe un stock (en nuestro caso del del restaurante), y define un método principal `promtMainMenu()` el cual mediante inquirer nos permitirá seleccionar desde la terminar opciones como añadir alimentos, quitar alimento, etc. Es este punto cuando se selecciona una de las opciones cuando se hace uso de otros métodos de tipo prompt desarrollados en esta clase para añadir alimentos, por ejemplo para llevar a cabo la acción anterior se invocaría desde el promptMainMenu() el método `promptAddFood` el cual nos solicita cada uno de los datos necesarios para añadir una comida a la base de datos, de esta manera se definen los prompt necesarios para cada uno de los productos que almacenará la base de datos.  

Destacar que esta clase nos facilita mucho la tarea de administrar la base de datos, permitiendonos añadir o eliminar cualquier tipo de producto desde la misma terminal sin necesidad de modificar a mano el ficharero de tipo `json`.  

## **[Parser](src/Parser/)**

## **[App](src/App/)**
Por último se encuentra la clase `App`, esta representa al programa principal.  
Esta clase representa el mas alto nivel de nuestro proyecto, inicializando nuestra base de datos (stock), y dando un método `promptMainMenu()`, el cual mediante el uso de inquirer nos permite seleccionar desde la consola tareas como editar el inventario o general una comanda.


## **Prueba Final**

## **Conclusiones**