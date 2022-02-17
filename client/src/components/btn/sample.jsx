import { BlueBtn } from "./base";
import { GreenBtn } from "./base";
import { StrawBtn } from "./base";
import { YellowBtn } from "./base";
import { OrangeBtn } from "./base";

import { BlueBtn as BigBlueBtn } from "./big";
import { GreenBtn as BigGreenBtn } from "./big";
import { StrawBtn as BigStrawBtn } from "./big";
import { YellowBtn as BigYellowBtn } from "./big";
import { OrangeBtn as BigOrangeBtn } from "./big";

export default function Sample() {
  return (
    <>
      <div className="my-3">
        <BlueBtn>blue ducks</BlueBtn>
      </div>
      <div className="my-3">
        <GreenBtn>green ducks</GreenBtn>
      </div>
      <div className="my-3">
        <StrawBtn>straw ducks</StrawBtn>
      </div>
      <div className="my-3">
        <YellowBtn>yellow ducks</YellowBtn>
      </div>
      <div className="my-3">
        <OrangeBtn>orange ducks</OrangeBtn>
      </div>
      <div className="my-3">
        <BigBlueBtn>big blue ducks</BigBlueBtn>
      </div>
      <div className="my-3">
        <BigGreenBtn>big green ducks</BigGreenBtn>
      </div>
      <div className="my-3">
        <BigStrawBtn>big straw ducks</BigStrawBtn>
      </div>
      <div className="my-3">
        <BigYellowBtn>big yellow ducks</BigYellowBtn>
      </div>
      <div className="my-3">
        <BigOrangeBtn>big orange ducks</BigOrangeBtn>
      </div>
    </>
  );
}
