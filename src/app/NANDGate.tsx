import clsx from "clsx";
import Image from "next/image";
import { BitState } from "./types";

interface Props {
  gateNumber: number;
  input0: BitState;
  input1: BitState;
  output: BitState;
  id: string;
}

const isBitOn = (bit: BitState) => bit === BitState.ON;

const NANDGate = ({ gateNumber, input0, input1, output, id }: Props) => (
  <div id={id} className="flex items-center">
    <div
      className={clsx(
        "h-24 w-48 border-black border-2 rounded-r-xl content-center text-center m-auto flex",
        isBitOn(output) && "bg-yellow-200"
      )}
    >
      <div className="flex flex-col items-start justify-center">
        <span>{input0}</span>
        <span>{input1}</span>
      </div>
      <div className="ml-8 flex flex-col items-center">
        Gate {gateNumber}
        <br />
        {isBitOn(output) ? (
          <Image
            height={32}
            width={32}
            src="/light-bulb.png"
            alt="light-bulb"
          />
        ) : (
          <div className="h-16 w-16"></div>
        )}
      </div>
    </div>
    <div className="flex text-2xl">O</div>
  </div>
);

export default NANDGate;
