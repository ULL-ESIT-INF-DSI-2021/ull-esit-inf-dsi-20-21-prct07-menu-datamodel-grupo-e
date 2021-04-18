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
En esta práctica desarrollaremos el modelo de datos que permite el diseño de un sistema de menús para un restaurante. Utilizando el lenguaje TypeScript y diversos módulos como `inquirer`, `lowdb`, `clone`, etc... Crearemos una aplicación interactiva que permita gestionar alimentos, platos, menús y cartas de un restaurante.

## **[Foods](src/Food/)**
En este apartado abordaremos las clases y detalles referentes al manejo y presentación de los alimentos dentro de nuestra aplicación.
### **Clase abstracta BasicFood**
Representa un alimento básico, por lo que consta de una clase abstracta que define los atributos y métodos comunes a todos los alimentos:

*  `name`, nombre del alimento, `origin`, origen o país del alimento, `priceByKg`, precio del alimento en euros,
  y `macronutrients`, objeto de la clase `Macronutrients` que representa la composición nutricional de un alimento (lípidos, carbohidratos y proteínas por cada 100g).
* Todos los atributos son `protected` para que las clases descendientes puedan acceder a ellos sin tener que recurrir a getters y setters.
* Íbamos a incluir un `ammount` en la clase pero decidimos crear una nueva clase llamada `Ingredient` que se encargue de almacenar un alimento y su cantidad a utilizar, a modo de intermediaria entre los alimentos y el plato.
* Dispone de una serie de Getters para los atributos `name`, `origin`, `priceByKg` y `Macronutrients` así como sus respectivos setters.
* El método `getFoodGroup` es abstracto y se encarga de indicar el tipo del alimento. Este tipo puede ser cualquiera de los siguientes: 
  *   Carnes, pescados, huevos, tofu, frutos secos, semillas y legumbres.
  *   Verduras y hortalizas.
  *   Leche y derivados.
  *   Cereales.
  *   Frutas.

#### **Cereal, Fruit, Rich_Protein_Food y Vegetable**
* Las clases `Cereal`,`Fruits`,`Rich_Protein_Foods`, `Dairy` y `Vegetable` extienden a `BasicFood`, y representan implementaciones específicas correspondientes a cada uno de los grupos antes mencionados.

## **[Plates](src/Plate/)**
Consideramos que un plato puede ser `Entrante`, `Primer plato`, `Segundo plato` o `Postre`. Por lo que desarrollamos una clase asbtracta `BasicPlate` que será extendida por las clases que representan cada uno de los platos específicos (`Starter_Plate`, `First_Plate`, `Second_Plate` y `Dessert`).

Además, un plato está formado por un vector de objetos de tipo `Ingredient`, cada uno de los cuales tiene como atributos un `BasicFood` y una cantidad en gramos de dicho alimento.

De esta forma, cada ingrediente es responsable de calcular su composición nutricional teniendo en cuenta la composición nutriticonal del alimento que lo compone (por cada 100g) y la cantidad en gramos de dicho alimento, así como su propio precio.

* El método `getType()` es abstracto y devuelve el tipo de plato específico.


## **[Menu](src/Menu/)**
La clase `Menu` interactúa directamente con `Plate`, ya que se basa en un conjunto de objetos de ese tipo, representados como un vector.
Cada objeto de la clase `Menu` se identifica con un atributo `name`, y con dicho vector.

* Dispone de una serie de métodos que obtienen los distintos tipos de plato, y uno más general, `getPlates()`, qe obtiene los platos de todos los tipos en orden de aparición: entrantes, primeros platos, segundos platos y postres.
* `getPrice()` obtiene el precio total del conjunto de platos en cuestión, y también nos encontramos con `getNutritionalComposition()`, que devuelve la composición nutricional, resultado de la suma de las composiciones nutricionales de los ingredientes.
* Como requisito de la práctica se pide que no puede haber más de 4 platos, o tiene que haber por lo menos 3 platos y que sean de cada tipo. El método `platesAreValid()` es el encargado de ello: recibe un vector de platos y devuelve un booleano que verifica la validez del conjunto. Dado que existe la opción de editar un menú desde la consola hemos optado por añadir un booleano al constructor de un menú que indique si deseamos validar los platos que estamos introduciendo en el mismo. De esta forma damos libertad al usuario de editar un menú ya guardado y que al cargarlo de la base de datos sea creado correctamente.
* También contamos con métodos para añadir y eliminar platos:  `addPlate()`, `removePlate()`
* Por último, podemos listar los grupos de alimentos del plato, con `listFoodGroup()`.
## **[Carta](src/Carta/)**
La clase `Carta` consta de un conjunto de `Menús` y un conjunto de platos individuales. Consideramos que el conjunto de platos individuales tiene siempre (como mínimo) todos los platos presentes en los menús de la carta, de modo que un usuario pueda pedir un plato de cualquiera de ellos. Esto lo hacemos mediante la comprobación de que no haya dos platos con igual nombre e igual tipo en el conjunto de platos individuales en el método `addPlate`. Además, cada vez que se añade un menú, se añaden todos sus platos al conjunto de platos individuales.

* La clase `Carta` dispone de tres atributos, un identificador, `nombre`, un conjunto de menús, `menus`, y `singlePlates`, que
  constituye un conjunto de platos individuales.
* Todos los atributos consideremos que deben ser privados.
* Tenemos tres métodos, `getName()`, `getMenus()` y `getPlates()`, que funcionan como *getters* para obtener el nombre, el menú y los platos 
  individuales.

## **[Comanda](src/Command/)**
La clase **Comanda** tiene como función principal almacenar una comanda individual por cada cliente nuevo del restaurante. Para conseguir el funcionamiento requerido se ha definido una subclase adicional:  
* **Command_order**
  Esta clase tiene como objetivo el establecer la cantidad de un plato que que desee el cliente, para ello mediante su constructor se inicializan sus atributos privados `order: BasicPlate` y `quantity: number`, mediante los cuales podremos establecer las cantidades de un determinado plato. Además esta clase cuanta con sus getters para acceder a los atributos nombrados anteriormente desde la clase `command`.  

## **[Stock](src/Stock/)**
Esta clase representa el inventario del restaurante, por lo que interactúa directamente con la base de datos del sistema (implementada con `lowdb`). Cuenta con atributos para almacenar alimentos, platos, menús y cartas además de la base de datos en cuestión `database: lowdb.LowdbSync<StockScheme>` y un `parse: Parser`, que define los métodos que se encargan de transformar los datos de la base de datos (en formato JSON) a objetos de nuestra implementación y viceversa. En el constructor de esta clase se inicializa la base de datos mediante el uso del método `setDatabase(databaseName: string)` el cual hace uso del módulo `lowdb` para inicializar la base de datos en una determinada ruta y cargar y guardar en ella los datos correspondientes a los diversos productos.

Por cada tipo de producto, es decir, Food, Plate, Menu y Carta se han desarrollado los siguientes métodos necesarios para interactuar con la base de datos(Es en este punto donde se ha hecho uso de **Lowdb**): 
  * `loadTipoProducto()` --> Método encargado de cargar desde la base de datos los productos.
  * `getTipoProducto()` --> Getter para obtener lo que hay de ese tipo de producto en el inventario.
  * `searchTipoProductoByname(name: string)` --> Buscar en el inventario un producto por su nombre.
  * `deleteTipoProducto(TipoProductoName: string)` --> Eliminar del inventario (y la base de datos) un determinado producto.
  * `addTipoProducto(newTipoProducto: TipoProducto)` --> Añadir un producto al inventario (y a la base de datos).
  * `storeTipoProducto()` --> Guarda los productos de TipoProducto actuales en la base de datos.

**JsonObjects**  
  Hemos creado un conjunto de alias de tipos que representan la información de cada objeto de nuestras clases en formato JSON, para así poder guardar cada instancia en nuestra base de datos, por ejemplo:
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
Esta clase hace de intermediaria entre el usuario y el inventario, de modo que el usuario pueda editar el inventario de manera cómoda y rápida. Para ello, hace uso pincipalmente del módulo `inquirer`, que ofrece herramientas para gestionar la entrada de datos mediante consolas interactivas. 

Es aquí donde entran en juego las **`Interfaces`** que hemos definido: `FoodsHolder, PlatesHolder, CartasHolder, IngredientsHolder, MenusHolder, Nameable, OriginHolder, PriceByKgHolder`.

Dado que las opciones de edición son similares entre sí, por ejemplo: queremos poder añadir un plato tanto a un Menú como al Stock o Carta, hemos creado las interfaces para definir métodos que se encarguen de aprovechar estas similitudes. 

En el caso de `PlatesHolder`, el método de `StockEditor` `promptNewPlatesFor`, recibe como argumento un objeto que implementa la interfaz `PlatesHolder` y se encarga de mostrar las opciones al usuario para porder crear un nuevo plato y añadirlo al objeto que se le pasa por parámetro. De esta forma, reutilizamos varios de los métodos de la clase y hacemos más fácil el expandir las funcionalidades del código.

## **[Parser](src/Parser/)**
Como se mencionó anteriormente, esta clase define los métodos que se encargan de transformar las instancias de las clases a objetos JSON que puedan ser guardados en la base de datos y viceversa. 

Es importante recalcar que, por defecto, el método `ParseMenu`, que recibe un `JsonMenu` y devuelve un objeto `Menu` a partir de él, tiene la opción de validación de platos desactivada por defecto debido a lo mencionado antes: al editar un menú y guardarlo en la base de datos es posible que el usuario desee guardar un conjunto no válido de platos, pero al cargar de nuevo ese menú lanzaría un error debido a la invalidez del menú editado anteriormente.

## **[App](src/App/)**
Por último se encuentra la clase `App`, esta representa al programa principal.  
Esta clase representa el mas alto nivel de nuestro proyecto, inicializando nuestra base de datos (stock), y dando un método `promptMainMenu()`, el cual mediante el uso de inquirer nos permite seleccionar desde la consola tareas como editar el inventario o generar una comanda. Dicha clase interactúa con el usuario y con las clases `StockEditor` y `CommandMaker`.


## **Prueba Final**

## **Conclusiones**