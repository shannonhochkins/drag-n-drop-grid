import * as React from "react";
import { StoryObj, Meta } from "@storybook/react";
import {
  GridContext,
  GridDropZone,
  GridContextProvider,
  swap,
  move
} from "../src";

import { GridItem } from "../src/GridItem";

interface AppState {
  [key: string]: Array<{
    name: string;
    id: number;
  }>;
}

function Template({ single = false, outside = true }: { single?: boolean, outside?: boolean }) {
  const [mounted, setMounted] = React.useState(false);
  const [items, setItems] = React.useState<AppState>({
    left: [
      { id: 1, name: "ben" },
      { id: 2, name: "joe" },
      { id: 3, name: "jason" },
      { id: 4, name: "chris" },
      { id: 5, name: "heather" },
      { id: 6, name: "Richard" }
    ],
    right: [
      { id: 7, name: "george" },
      { id: 8, name: "rupert" },
      { id: 9, name: "alice" },
      { id: 10, name: "katherine" },
      { id: 11, name: "pam" },
      { id: 12, name: "katie" }
    ],
    dock: [{ id: 13, name: "Whatever" }]
  });

  React.useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 500);
  }, []);

  return (
    <GridContextProvider onChange={(
      sourceId,
      sourceIndex,
      targetIndex,
      targetId
    ) => {
      if (targetId) {
        const result = move(
          items[sourceId],
          items[targetId],
          sourceIndex,
          targetIndex
        );
        return setItems({
          ...items,
          [sourceId]: result[0],
          [targetId]: result[1]
        });
      }
  
      const result = swap(items[sourceId], sourceIndex, targetIndex);
      return setItems({
        ...items,
        [sourceId]: result
      });
    }}>
      <div
        style={{
          display: "flex",
          touchAction: "none"
        }}
      >
        <div
          style={{
            transform: mounted ? `translateX(100px)` : `translateX(0)`,
            transition: "transform 0.25s ease",
            display: "flex",
          }}
        >
          <GridDropZone
            style={{
              flex: "0 0 auto",
              height: "400px",
              width: "400px",
              border: "1px solid #bbb",
              borderRadius: "1rem",
              marginRight: "10px",
              touchAction: "none"
            }}
            id="left"
            boxesPerRow={4}
            rowHeight={70}
          >
            {items.left.map(item => (
              <GridItem key={item.name}>
                <div
                  style={{
                    padding: "10px",
                    width: "100%",
                    height: "100%",
                    boxSizing: "border-box"
                  }}
                >
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      boxSizing: "border-box",
                      background: "#08e",
                      display: "flex",
                      justifyContent: "center",
                      color: "white",
                      fontFamily: "helvetica",
                      alignItems: "center",
                      borderRadius: "50%"
                    }}
                  >
                    {item.name[0].toUpperCase()}
                  </div>
                </div>
              </GridItem>
            ))}
          </GridDropZone>

          {!single && (
            <GridDropZone
              style={{
                flex: "0 0 auto",
                height: "400px",

                width: "400px",
                border: "1px solid #bbb",
                borderRadius: "1rem",
                marginLeft: "10px",
                touchAction: "none"
              }}
              id="right"
              boxesPerRow={4}
              rowHeight={70}
            >
              {items.right.map(item => (
                <GridItem key={item.name}>
                  {(Component, props: object) => (
                    <Component {...props}>
                      <div
                        style={{
                          padding: "10px",
                          width: "100%",
                          height: "100%",
                          boxSizing: "border-box"
                        }}
                      >
                        <div
                          style={{
                            width: "50px",
                            height: "50px",
                            boxSizing: "border-box",
                            background: "#08e",
                            display: "flex",
                            justifyContent: "center",
                            color: "white",
                            fontFamily: "helvetica",
                            alignItems: "center",
                            borderRadius: "50%"
                          }}
                        >
                          {item.name[0].toUpperCase()}
                          <div onClick={() => {
                            alert('a');
                          }} style={{
                            fontSize: 10
                          }}>CLICK</div>
                        </div>
                      </div>
                    </Component>
                  )}
                </GridItem>
              ))}
            </GridDropZone>
          )}
        </div>
      </div>

      {outside && <GridDropZone
        style={{
          flex: "0 0 auto",
          height: "200px", 
          width: "100%",
          marginTop: 20,
          border: "1px solid #ddd",
          borderRadius: "1rem",
          marginRight: "10px",
          touchAction: "none"
        }}
        id="dock"
        boxesPerRow={4}
        rowHeight={70}
      >
        {items.dock.map(item => (
          <GridItem key={item.name}>
            <div
              style={{
                padding: "10px",
                width: "100%",
                height: "100%",
                boxSizing: "border-box"
              }}
            >
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  boxSizing: "border-box",
                  background: "#08e",
                  display: "flex",
                  justifyContent: "center",
                  color: "white",
                  fontFamily: "helvetica",
                  alignItems: "center",
                  borderRadius: "50%"
                }}
              >
                {item.name[0].toUpperCase()}
              </div>
            </div>
          </GridItem>
        ))}
      </GridDropZone>}
    </GridContextProvider>
  );
}

export default {
  title: 'Examples',
  component: Template, // Use the main component as the default export's component
} as Meta;

export type Story = StoryObj<typeof Template>;

export const DragBetween = Template.bind({});

export const Single = () => {
  return <div>
    <Template single />
  </div>
}


export const SupportsParentsTransforming = () => (
  <div>
    <TransformExample />
  </div>
);

export const ReadmeExampleStory = () => <ReadmeExample />;

function TransformExample() {
  const [transform, setTransform] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setTransform(true);
    }, 2000);
  }, []);

  return (
    <div
      style={{
        transform: transform ? "translateX(30%)" : "translateX(0)",
        transition: "transform 0.25s ease"
      }}
    >
      <Template  />
    </div>
  );
}

function ReadmeExample() {
  const [items, setItems] = React.useState([1, 2, 3, 4]); // supply your own state

  // target id will only be set if dragging from one dropzone to another.
  return (
    <GridContextProvider onChange={(
      sourceId,
      sourceIndex,
      targetIndex,
      targetId
    ) => {
      const nextState = swap(items, sourceIndex, targetIndex);
      setItems(nextState);
    }}>
      <GridDropZone
        id="items"
        boxesPerRow={4}
        rowHeight={100}
        style={{ height: "400px" }}
      >
        {items.map((item: number) => (
          <GridItem key={item}>
            <div
              style={{
                width: "100%",
                height: "100%"
              }}
            >
              {item}
            </div>
          </GridItem>
        ))}
      </GridDropZone>
    </GridContextProvider>
  );
}


function DisabledExample() {
  const [items, setItems] = React.useState([1, 2, 3, 4]); // supply your own state

  // target id will only be set if dragging from one dropzone to another.
  function onChange(
    sourceId: any,
    sourceIndex: any,
    targetIndex: any,
    targetId: any
  ) {
    const nextState = swap(items, sourceIndex, targetIndex);
    setItems(nextState);
  }

  return (
    <GridContextProvider onChange={onChange}>
      <GridDropZone
        id="items"
        boxesPerRow={4}
        rowHeight={100}
        style={{ height: "400px" }}
      >
        {items.map((item: any) => (
          //only disable 2
          <GridItem key={item} disabled={item === 2}>
            <div
              style={{
                width: "100%",
                height: "100%",
              }}
            >
              {item}
              {item === 2 ? "(Disabled)" : ""}
            </div>
          </GridItem>
        ))}
      </GridDropZone>
    </GridContextProvider>
  );
}

export const DisabledGridItem = () => <DisabledExample />;