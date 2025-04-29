# Installation
`npm i hierarchical-csv-to-json`
# Usage
```
import { HCSVtoJSON } from 'hierarchical-csv-to-json';

const csv = `1,Test
2,heading1,heading2
3,data1,2
1,Test2`;

HCSVtoJSON(csv)["Test"]!.forEach(t => {
  console.log(t);
});
```
