import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";

const dev: React.FC = ({}) => {
  const [sliderValue, setSliderValue] = useState<number>(16);
  return (
    <>
      <Slider
        aria-label="slider-ex-1"
        value={sliderValue}
        onChange={(e) => setSliderValue(e)}
        min={8}
        max={32}
        colorScheme="purple"
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
      <Input
        type="number"
        value={sliderValue}
        onChange={(e) => setSliderValue(+e.target.value)}
      />
    </>
  );
};
export default dev;
