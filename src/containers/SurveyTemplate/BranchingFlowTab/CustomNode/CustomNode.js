import React, { memo } from "react";
import { Handle } from "reactflow";
import "./CustomNode.scss";

export default memo(({ data, isConnectable, id }) => {
  console.log(data);
  return (
    <>
      {/* each node could have more than handler [edge outing point] */}
      <Handle
        type="source"
        position="right" //handler position
        style={{ background: "#555" }}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      />
      <Handle
        type="target"
        position="left" //handler position
        style={{ background: "#555" }}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      />

      {/* <Handle
        type="target"
        position="right" //handler position
        style={{ background: "#555" }}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      /> */}

      {/* <Handle
        type="target"
        position="bottom" //handler position
        style={{ background: "#555" }}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      /> */}

      <Handle
        type="source"
        position="bottom"
        style={{ background: "#555" }}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      />

      {/**************************   node content ************************/}
      {data.renderNodeContent()}
      {console.log(data?.isStart)}
      {/*************** any source will has edge from its right side connected with  target************/}

      {/*       
      <Handle
        type="source"
        position="right"
        id="a"
        style={{ top: 10, background: '#555' }}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position="right"
        id="b"
        style={{ bottom: 10, top: 'auto', background: '#555' }}
        isConnectable={isConnectable}
      /> */}
      {/* <Handle
        type="source"
        // position={data?.isStart ? "bottom" : "right"}
        position={"right"}
        id="a"
        style={{ background: "#555" }}
        isConnectable={isConnectable}
      />

      <Handle
        type="target"
        position="left"
        id="b"
        style={{ left: 10, background: "#555" }}
        isConnectable={isConnectable}
      />  */}
      {/*  <Handle
        type="source"
        position="right"
        id="c"
        style={{ bottom: 10, top: "auto", background: "#555" }}
        isConnectable={isConnectable}
      /> */}

      {/* <Handle
        type="source"
        position="right"
        style={{ background: "#555" }}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position="left"
        style={{ background: "#555" }}
        isConnectable={isConnectable}
      />*/}
      {/* <Handle
        type="source"
        position="bottom"
        style={{ background: "#555" }}
        isConnectable={isConnectable}
      /> */}
    </>
  );
});
