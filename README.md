# DataViz Component

The `DataViz` component is a versatile data visualization tool built with React and D3.js. It currently supports bar and pie charts.

## Prerequisites
Before you begin, ensure that you have the following software installed on your machine:

- Node.js (version 14 or higher)
- npm (Node Package Manager)

## Installation steps

1. Clone the Repository: ```git clone [repository-url]```
2. Navigate to the Project Directory: ```cd [project-directory]```
3. Install Dependencies: ```npm install```
4. Start the Development Server: ```npm run dev```

Congratulation, you have successfully installed and launched the app!

---

Now let's start the documentation of our `DataViz` component.

## Props

- `data`: An array of objects representing the data to be visualized. Each object should have a `value` property and a property corresponding to the `label` specified in the `options` prop.

- `options`: An object containing configuration options for the chart. It should have the following properties:
  - `label`: A string representing the property name in the data objects to be used as labels.
  - `color`: A string representing the color to be used for the chart elements.

- `type`: A string representing the type of chart to be drawn. It can be either `"bar"` or `"pie"`.

- `width`: A number representing the width of the chart in pixels.

- `height`: A number representing the height of the chart in pixels.

## Usage

Here's an example of how to use the `DataViz` component:

```jsx
import DataViz from './DataViz';

const data = [
  { name: 'Item 1', value: 10 },
  { name: 'Item 2', value: 20 },
  { name: 'Item 3', value: 30 },
];

const options = {
  label: 'name',
  color: '#ff0000',
};

<DataViz data={data} options={options} type="bar" width={500} height={300} />
```

In this example, a bar chart will be drawn with the names of the items as labels and their values determining the size of the bars. The bars will be colored red.

## Error Handling
If the `options.label` or `options.color` props are not provided, the component will not draw the chart. Make sure to provide these props to ensure the chart is drawn correctly.