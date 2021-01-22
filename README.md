# Crónica de lo que hice para entender cómo armar un subgrafo con TheGraph.

Empecé leyendo la documentación que me pasaron:

https://thegraph.com/docs/introduction#what-the-graph-is

y comencé con la Quick Start guide.

instalé ganache, truffle y corrí graph-node y llegué a las siguientes conclusiones:

- truffle: Herramienta para crear contratos inteligentes
- Ganachei-cli: Me crea un sandbox de una red ethereum local para jugar.
- Graph-node: Servicio dockerizado de PostgreSQL, IPFS y graph-node

Me trabé cuando quise correr graph-cli porque me pedía ingresar la address de un contrato que aún no tenía.

Pedí ayuda a Juanma e hice la lectura de:

https://medium.com/protofire-blog/subgraph-development-part-1-understanding-and-aggregating-data-ef0c9a61063d

creé un proyecto de ejemplo en the graph con el flag --from-example y lo deployé acá:
https://thegraph.com/explorer/subgraph/gabrielcamba/hg
 
### En este punto saqué las siguientes conclusiones:

- schema.graphql - es dónde esta el esquema que va a usar
- subgraph.yaml - es el manifiesto. esta la dirección del contrato y entre otras cosas vincula los eventos con el handler.
- /abi/Gravatar.json -> es un esquema de tipos
- /contracts/Gravity.sol -> es el contrato escrito en solidity
- /src/mapping.ts -> es dónde se escriben los handlers de los eventos.

### Empecé a explorar otro contrato

Address: 
https://ww7.etherscan.io/address/0xdd806c4fdad2949a97fda79036cfbb8750181b37#code 

Inferí que es un contrato para votar por diferentes propuestas.

Exploré un poco un subgrafo ya existente:
https://thegraph.com/explorer/subgraph/protofire/humanitydao

### Creación de mi propio subgrafo

A partir de ahí usando graph creé mi propio subgrafo vacío y lo deployé como estaba.
Luego traté de correr el ejemplo que contiene el código en este repo cuyo objetivo es contabilizar la cantidad total de votos.
La idea es que sea lo más simple posible para tener una base sobre la que construir soluciones más complejas.

esta deployado acá: https://thegraph.com/explorer/subgraph/gabrielcamba/subgraphito

En este momento estoy debuggeando este error:
```
Subgraph instance failed to run: Failed to process trigger in block #7728319 (946de2eac7a3274aa3a9e3958ab99e8d9d318ecfd2565758626b3ebf1cede612), transaction f034ec42dde3f251ebafa01c9d6214bd60fb739196ec5a85c3b26ef99aa76e49: Mapping terminated before handling trigger: oneshot canceled, code: SubgraphSyncingFailure, id: QmbnLcRNUMLZyod8meX7yw6bTYNZerfWaXwcotzm1sucLd
```
### Solución del problema anterior

Después de dar varias vueltas en el medio pude solucionarlo con la ayuda de Juanma. El error estaba en hacer un log.critical que rompía y por eso me tiraba el error.

### Qué aprendí La última semana (Update)

- Pude explorar un poco más del contrato y comprender el funcionamiento. Entender por ejemplo que no suma cantidad de votos sino el peso en base al fee.
- Descubrí que los esquemas escritos en plural funcionan pero no se ven reflejadas en el esquema. Y que se auto generan queries en plural en base a los esquemas en singular
- Cómo crear nuevas entidades.
- Los escalares soportados.
- Pude ahondar en cómo se vinculan el graphql schema, el manifiesto subgraph.yaml y el código en el mapping.
- Usar el codegen para que construya el esquema y funcione adecuadamente el autocompletado en el mapping.
- Leer typos al buildear y reconocer la falla.
- Cómo loguear información. Me trabé bastante con un log.critical que me rompía la creación del subgrafo.
- Los nombres de los parámetros estan definidos en el archivo abi.
- Como interactuar con una red de pruebas local usando metamask
- Como vincular metamask con una app
- Como escribir un contrato hello world
- Como deployar un contrato en la red de pruebas usando https://remix.ethereum.org/
- Como hacer una llamada a una funcion con la herramienta.



