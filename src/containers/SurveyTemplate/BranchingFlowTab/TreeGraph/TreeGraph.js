import { Tree } from "react-tree-graph";
import { AnimatedTree } from "react-tree-graph";
import "react-tree-graph/dist/style.css";
import "./TreeGraph.css";

const CustomLabel = () => {
  return (
    <>
      {/* <rect
        width="120"
        height="180"
        stroke="red"
        stroke-width="3px"
        fill="white"
      />
      <text x='10' dominant-baseline="middle" text-anchor="middle">
        TEXT
      </text> */}
      <rect fill="green" x="0" y="0" width="200" height="50">
        <text
          x="25"
          y="25"
          fill="red"
          text-anchor="middle"
          alignment-baseline="central"
        >
          Christmas Time!
        </text>
      </rect>
    </>
  );
};

const x = () => (
  <div className="custom-container">
    <AnimatedTree
      height={400}
      // Setting a labelProp allows multiple nodes to have the same label
      // allows labels to be JSX. They must return valid SVG elements
      labelProp="label"
      // pathFunc={function noRefCheck(){}}
      width={600}
      //   nodeRadius={15}
      //   margins={{ top: 20, bottom: 10, left: 20, right: 200 }}
      data={{
        // children: [
        //   {
        //     label: <CustomLabel />,
        //     name: "Child 1",
        //     children: [
        //       {
        //         label: <CustomLabel />,
        //         name: "Child 1-1",
        //       },
        //     ],
        //   },
        //   {
        //     label: (
        //       <>
        //         <rect height="18" width="32" />
        //         <text>2</text>
        //       </>
        //     ),
        //     name: "Child 2",
        //   },

        //   {
        //     label: (
        //       <>
        //         <rect height="18" width="32" />
        //         <text>3</text>
        //       </>
        //     ),
        //     name: "Child 3",
        //   },
        //   {
        //     label: (
        //       <>
        //         <rect height="18" width="32" />
        //         <text>4</text>
        //       </>
        //     ),
        //     name: "Child 4",
        //   },
        // ],
        label: "parent", //start point [question has isStart]
        name: "Parent",
        children: [
          {
            name: "Black",
            label: "Black",
            pathProps: "orange",
            children: [],
          },
          {
            name: "Blue",
            label: <CustomLabel />,
            // textProps: {x: -25, y: 25}, only if label string text
            children: [
              {
                label: "Aquamarine",
                name: "Aquamarine",
                children: [],
              },
              {
                label: "Cyan",
                name: "Cyan",
                children: [],
              },
              {
                label: "Navy",
                name: "Navy",
                children: [],
              },
              {
                label: "Turquoise",
                name: "Turquoise",
                children: [],
              },
            ],
          },
          {
            label: "Green",
            name: "Green",
            children: [],
          },
          {
            label: "Purple",
            name: "Purple",
            children: [
              {
                name: "Indigo",
                children: [],
              },
              {
                label: "Violet",
                name: "Violet",
                children: [],
              },
            ],
          },
          {
            label: "Red",
            name: "Red",
            children: [
              {
                label: "Crimson",
                name: "Crimson",
                children: [],
              },
              {
                label: "Maroon",
                name: "Maroon",
                children: [],
              },
              {
                label: "Scarlet",
                name: "Scarlet",
                children: [],
              },
            ],
          },
          {
            name: "White",
            label: "White",
            children: [{
                label: "Yellow",
                name: "Yellow",
                children: [],
              }],
          },
          {
            label: "Yellow",
            name: "Yellow",
            children: [],
          },
        ],
      }}
    />
  </div>
);

export default x;
