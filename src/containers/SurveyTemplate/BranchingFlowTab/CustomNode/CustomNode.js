import React, { memo } from "react";
import { Handle } from "reactflow";
import "./CustomNode.scss";

export default memo(({ data, isConnectable, id }) => {
  return (
    <>
      {[...new Array(data.sourceHandlersNum)]?.map((source, index) => (
        <Handle
          key={`source-handle-${index}`}
          type="source"
          position="right"
          id={`source-handle-${index}`}
          style={{ top: 3 * (index + 1), background: "#555" }}
          isConnectable={isConnectable}
        />
      ))}

      {/**************************   node content ************************/}
      {data.renderNodeContent()}
      {[...new Array(data.targetHandlersNum)]?.map((source, index) => (
        <Handle
          key={`target-handle-${index}`}
          type="target"
          position="left"
          id={`target-handle-${index}`} //same id passed to edge object
          style={{ top: 3 * (index + 1), background: "#555" }}
          isConnectable={isConnectable}
        />
      ))}
    </>
  );
});
