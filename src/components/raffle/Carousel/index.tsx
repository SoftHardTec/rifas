import { Carousel } from "@mantine/carousel";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";

export default function ImageCarousel() {
  const autoplay = useRef(Autoplay({ delay: 2000, stopOnInteraction: false }));
  return (
    <Carousel
      withIndicators
      h="100%"
      plugins={[autoplay.current]}
      onMouseEnter={autoplay.current.stop} // Detiene el autoplay al pasar el mouse
      onMouseLeave={autoplay.current.reset} // Reanuda el autoplay al quitar el mouse
    >
      <Carousel.Slide>1</Carousel.Slide>
      <Carousel.Slide>2</Carousel.Slide>
      <Carousel.Slide>3</Carousel.Slide>
    </Carousel>
  );
}
