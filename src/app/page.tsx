"use client";
import clsx from "clsx";
import { useEffect, useState } from "react";
import Xarrow from "react-xarrows";

import { BitState } from "./types";
import NANDGate from "./NANDGate";

export default function Home() {
  const [inputState, setInputState] = useState<BitState>(BitState.OFF);
  const [saveState, setSaveState] = useState<BitState>(BitState.OFF);

  const [gateOutput, setGateOutput] = useState({
    gate0: BitState.OFF,
    gate1: BitState.OFF,
    gate2: BitState.OFF,
    gate3: BitState.OFF,
  });

  useEffect(() => {
    const newGate0 = !(inputState === BitState.ON && saveState === BitState.ON)
      ? BitState.ON
      : BitState.OFF;
    const newGate1 = !(newGate0 === BitState.ON && saveState === BitState.ON)
      ? BitState.ON
      : BitState.OFF;
    const newGate2 = !(
      newGate0 === BitState.ON && gateOutput.gate3 === BitState.ON
    )
      ? BitState.ON
      : BitState.OFF;
    const newGate3 = !(newGate2 === BitState.ON && newGate1 === BitState.ON)
      ? BitState.ON
      : BitState.OFF;

    setGateOutput({
      gate0: newGate0,
      gate1: newGate1,
      gate2: newGate2,
      gate3: newGate3,
    });
  }, [inputState, saveState, gateOutput.gate3]);

  return (
    <main className="h-screen w-screen text-black bg-white">
      <div className="flex h-full justify-between p-12 ">
        <div className="flex flex-col h-96 items-stretch justify-between">
          <button
            id="input_button"
            className="bg-red-500 border-2 border-black p-2 w-36 h-12"
            onClick={() =>
              setInputState(
                inputState === BitState.ON ? BitState.OFF : BitState.ON
              )
            }
          >
            Input {inputState}
          </button>
          <button
            id="save_button"
            className="bg-red-500 border-2 border-black p-2 w-36 h-12"
            onClick={() =>
              setSaveState(
                saveState === BitState.ON ? BitState.OFF : BitState.ON
              )
            }
          >
            Save {saveState}
          </button>
        </div>
        <div>
          <NANDGate
            id="gate_0"
            gateNumber={0}
            input0={inputState} // Set input
            input1={saveState} // Enable input
            output={gateOutput.gate0}
            setOutput={() =>
              setGateOutput({
                ...gateOutput,
                gate0: !(
                  inputState === BitState.ON && saveState === BitState.ON
                )
                  ? BitState.ON
                  : BitState.OFF,
              })
            }
          />
        </div>
        <div className="flex items-end">
          <NANDGate
            id="gate_1"
            gateNumber={1}
            input0={gateOutput.gate0}
            input1={saveState} // Enable input
            output={gateOutput.gate1}
            setOutput={() =>
              setGateOutput({
                ...gateOutput,
                gate1: !(
                  gateOutput.gate0 === BitState.ON && saveState === BitState.ON
                )
                  ? BitState.ON
                  : BitState.OFF,
              })
            }
          />
        </div>

        <div className="flex items-end">
          <NANDGate
            id="gate_3"
            gateNumber={3}
            input0={gateOutput.gate2}
            input1={gateOutput.gate1}
            output={gateOutput.gate3}
            setOutput={() =>
              setGateOutput({
                ...gateOutput,
                gate3: !(
                  gateOutput.gate2 === BitState.ON &&
                  gateOutput.gate1 === BitState.ON
                )
                  ? BitState.ON
                  : BitState.OFF,
              })
            }
          />
        </div>
        <div>
          <NANDGate
            id="gate_2"
            gateNumber={2}
            input0={gateOutput.gate0}
            input1={gateOutput.gate3}
            output={gateOutput.gate2}
            setOutput={() =>
              setGateOutput({
                ...gateOutput,
                gate2: !(
                  gateOutput.gate0 === BitState.ON &&
                  gateOutput.gate3 === BitState.ON
                )
                  ? BitState.ON
                  : BitState.OFF,
              })
            }
          />
        </div>
        <div
          id="output"
          className={clsx(
            "h-12 w-24 rounded-md text-center  items-center",
            gateOutput.gate2 === BitState.ON && "bg-yellow-200"
          )}
        >
          Output: {gateOutput.gate2}
        </div>
        <Xarrow
          start="gate_0"
          end="gate_1"
          path="smooth"
          startAnchor={{ position: "right", offset: { y: 0 } }}
          endAnchor={{ position: "left", offset: { y: -10 } }}
          showHead={false}
        />

        <Xarrow
          start="save_button"
          end="gate_0"
          path="smooth"
          startAnchor={{ position: "right", offset: { y: 10 } }}
          endAnchor={{ position: "left", offset: { y: 10 } }}
          showHead={false}
        />

        <Xarrow
          start="save_button"
          end="gate_1"
          path="smooth"
          startAnchor={{ position: "right", offset: { y: 10 } }}
          endAnchor={{ position: "left", offset: { y: 10 } }}
          showHead={false}
        />

        <Xarrow
          start="input_button"
          end="gate_0"
          path="smooth"
          startAnchor={{ position: "right", offset: { y: -10 } }}
          endAnchor={{ position: "left", offset: { y: -10 } }}
          showHead={false}
        />

        <Xarrow
          start="gate_0"
          end="gate_2"
          startAnchor={{ position: "right", offset: { y: 0 } }}
          endAnchor={{ position: "left", offset: { y: -10 } }}
          showHead={false}
        />

        <Xarrow
          start="gate_1"
          end="gate_3"
          startAnchor={{ position: "right", offset: { y: 0 } }}
          endAnchor={{ position: "left", offset: { y: 10 } }}
          showHead={false}
        />

        <Xarrow
          start="gate_3"
          end="gate_2"
          startAnchor={{ position: "right", offset: { y: 0 } }}
          endAnchor={{ position: "left", offset: { y: 10 } }}
          showHead={false}
        />

        <Xarrow
          start="gate_2"
          end="gate_3"
          curveness={-0.5}
          startAnchor={{ position: "right", offset: { y: 0 } }}
          endAnchor={{ position: "left", offset: { y: -10 } }}
          showHead={false}
        />

        <Xarrow
          start="gate_2"
          end="output"
          startAnchor={{ position: "right", offset: { y: 0 } }}
          endAnchor={{ position: "left", offset: { y: 0 } }}
          showHead={false}
        />
      </div>
    </main>
  );
}
