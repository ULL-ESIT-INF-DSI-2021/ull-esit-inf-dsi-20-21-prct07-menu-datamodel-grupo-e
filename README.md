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

## **[Plate](src/Plate/)**
* **Ingredient**
* **Basic Plate**
  * **Starter_plate, First_plate, Second_plate, Dessert**


## **[Menu](src/Menu/)**

## **[Carta](src/Carta/)**

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